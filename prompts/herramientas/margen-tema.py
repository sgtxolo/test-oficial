# Prepara y genera los datos del botón «Margen» de UN tema: OCR de todas las imágenes del Exprés subrayado (varios procesos a la vez)
# y después margen-datos.js (expres-subrayado/margen-tN.js + esquemas-datos/lila-tN.js).
# Uso: py -I prompts/herramientas/margen-tema.py <tema> [procesos=4]
import sys, os, json, subprocess, shutil, tempfile
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image
T = sys.argv[1]; SH = int(sys.argv[2]) if len(sys.argv) > 2 else 4
B = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))).replace('\\', '/') + '/'
d = open(B + f'expres-subrayado/datos-t{T}.js', encoding='utf-8').read()
j = json.loads(d[d.index('={') + 1:d.rindex('};') + 1])
files = []
for p in j['piezas']:
    for k in ('img', 'imgr'):
        if p.get(k) and os.path.exists(B + j['dir'] + p[k]): files.append([p['id'], k, p[k]])
tmp = os.path.join(tempfile.gettempdir(), f'margen-t{T}'); shutil.rmtree(tmp, ignore_errors=True)
for s in range(SH): os.makedirs(f'{tmp}/s{s}')
for i, (pid, k, f) in enumerate(files, 1):
    Image.open(B + j['dir'] + f).convert('RGB').save(f'{tmp}/s{(i - 1) % SH}/p{i:04d}.png')
json.dump(files, open(f'{tmp}/files.json', 'w'))
ps = []
for s in range(SH):
    if os.listdir(f'{tmp}/s{s}'):
        ps.append(subprocess.Popen(['powershell', '-NoProfile', '-File', B + 'prompts/herramientas/ocr-windows.ps1', f'{tmp}/s{s}', f'{tmp}/o{s}.json'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
for p in ps: p.wait()
ocr = {}
for s in range(SH):
    f = f'{tmp}/o{s}.json'
    if os.path.exists(f): ocr.update(json.loads(open(f, encoding='utf-8-sig').read()))
json.dump(ocr, open(f'{tmp}/ocr.json', 'w'))
print(f'T{T}: {len(files)} imágenes, {len(ocr)} con OCR')
r = subprocess.run(['node', B + 'prompts/herramientas/margen-datos.js', T, f'{tmp}/ocr.json', f'{tmp}/files.json'], capture_output=True, text=True, encoding='utf-8')
print(r.stdout.strip(), r.stderr.strip()[-400:])
for s in range(SH): shutil.rmtree(f'{tmp}/s{s}', ignore_errors=True)
