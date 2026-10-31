# Detecta artículos «ESQ» (el usuario no subrayó su texto porque los tiene en un esquema): texto SIN subrayador + cuadro-esquema debajo.
# Uso: py expres-subrayado-esq.py <tema>   -> imprime id, % de píxeles de subrayador en el texto, altura del texto y del cuadro
import sys, json
import numpy as np
from PIL import Image
T = sys.argv[1]; B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; D = B + f'expres-subrayado/img/t{T}'
ind = json.load(open(D + '/indice.json', encoding='utf-8')); out = []
for e in ind:
    a = np.asarray(Image.open(f"{D}/{e['img']}").convert('RGB')).astype(int); H, W, _ = a.shape
    mx = a.max(axis=2); mn = a.min(axis=2); media = a.mean(axis=2)
    gris = ((mx - mn) < 16) & (media >= 175) & (media <= 238); fil = gris.mean(axis=1) > 0.22; corte = None; i = 70
    while i < H:
        if fil[i]:
            j = i
            while j < H and fil[j]: j += 1
            if j - i >= 18: corte = i; break
            i = j
        i += 1
    hi = ((mx - mn) > 70) & (mx > 150)          # color vivo (amarillo, naranja, verde, azul, morado)
    t = hi[:corte or H]; pct = 100 * t.mean()
    out.append((e['id'], round(pct, 2), corte or H, (H - corte) if corte else 0))
bajos = [o for o in out if o[1] < 0.35 and o[3] > 150]
print(len(out), 'artículos;', len(bajos), 'candidatos ESQ (texto sin subrayar y con cuadro debajo)')
for o in bajos: print(o)
print('--- piezas con cuadro (p.cu) y % subrayador en su texto (ordenadas) ---')
import subprocess
cu = json.loads(subprocess.run(['node', '-e', "global.window={};require('" + B + "expres-subrayado/datos-t" + T + ".js');process.stdout.write(JSON.stringify(window.EXSUB[" + T + "].piezas.filter(p=>p.cu).map(p=>p.id)))"], capture_output=True, text=True).stdout)
print(' '.join(f"{o[0]}:{o[1]}" for o in sorted(out, key=lambda o: o[1]) if o[0] in cu))
