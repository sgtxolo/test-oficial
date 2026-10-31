# Escribe tN-cola.json: recorta por abajo cada imagen entera justo después de su última línea de texto normal (con minúsculas), para quitar los títulos de capítulo, pies y hojas en blanco que se cuelan al final.
# Uso: TEMA=14 py cola-auto.py   (luego config.js + recortes.py + propuesta-lineas.py)   No pisa las entradas que ya existan en el archivo.
import os, re, sys, json
T = os.environ.get('TEMA', '11'); B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
src = open(B + 'prompts/herramientas/subrayado-revision/propuesta-lineas.py', encoding='utf-8').read()
ns = {'__name__': 'aud', '__file__': B + 'prompts/herramientas/subrayado-revision/propuesta-lineas.py'}
sys.argv = ['x']; os.environ['TEMA'] = T
exec(src[:src.index('def propone(')], ns)
cp = B + f'expres-subrayado/t{T}-cola.json'; C = json.load(open(cp, encoding='utf-8')) if os.path.exists(cp) else {}
def normal(s):
    l = re.sub(r'[^A-Za-zÁÉÍÓÚÑáéíóúñ]', '', s)
    return len(l) >= 8 and sum(c.islower() for c in l) / len(l) >= .25
n = 0
for pid in ns['segs']:
    if pid in C: continue
    H = ns['ind'][pid]['wh'][1]; L = [l for l in ns['lineas'](pid) if normal(l[2])]
    if not L: continue
    fin = max(l[1] for l in L) + 24
    cola_ = [l for l in ns['lineas'](pid) if l[0] >= fin - 24]   # lo que quedaría fuera: si lleva palabras del Exprés, no se corta
    ex = set(w for w in (ns['norm'](x) for x in re.split(r'W+', ' '.join(ns['EX'].get(pid, [])).lower())) if len(w) >= 5)
    fuera = set(w for w in (ns['norm'](x) for x in re.split(r'W+', ' '.join(l[2] for l in cola_).lower())) if len(w) >= 5)
    if fin < H - 40 and len(ex & fuera) < 3: C[pid] = round(fin); n += 1
    elif fin < H - 40: print('no se corta', pid, sorted(ex & fuera)[:5])
open(cp, 'w', encoding='utf-8').write(json.dumps(C, ensure_ascii=False) + '\n'); print(n, 'colas nuevas')
