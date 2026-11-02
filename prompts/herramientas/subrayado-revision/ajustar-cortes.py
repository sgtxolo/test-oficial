# Ajusta los cortes de tN-img-recorte.json para que no partan una línea de texto por la mitad (medias líneas al borde de cada recorte).
# Uso: TEMA=3 py ajustar-cortes.py [id,id,…]   (sin ids = todas las piezas con recorte)  -> reescribe el JSON y lista lo que movió
# Un corte que cae sobre tinta se lleva al hueco entre líneas: el hueco más cercano (máx. 18 px); si hay empate, la línea partida queda fuera.
import os, sys, json
import numpy as np
from PIL import Image
T = os.environ.get('TEMA', '11'); B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
P = B + f'expres-subrayado/t{T}-img-recorte.json'
R = json.load(open(P, encoding='utf-8'))
solo = set(sys.argv[1].split(',')) if len(sys.argv) > 1 else None
X0, X1, MAXD = 200, 940, 18
cambios = 0
for pid, v in R.items():
    if solo and pid not in solo: continue
    f = B + f'expres-subrayado/img/t{T}/{pid}.jpg'
    if not os.path.exists(f): continue
    a = np.asarray(Image.open(f).convert('RGB')).astype(int).max(axis=2); H = a.shape[0]   # tinta negra del texto (el bolígrafo rojo/azul y los rotuladores no cuentan)
    tinta = ((a[:, X0:X1] < 120).sum(axis=1) >= 3)
    def hueco(y): return not tinta[max(0, y - 1):y + 2].any()
    def ajusta(y, inicio):
        y = max(0, min(H, y))
        if y <= 0 or y >= H or hueco(y): return y
        for d in range(1, MAXD + 1):
            fuera = y + d if inicio else y - d; dentro = y - d if inicio else y + d     # fuera = deja fuera la línea partida; dentro = la incluye entera
            if 0 <= fuera <= H and hueco(fuera): return fuera
            if 0 <= dentro <= H and hueco(dentro): return dentro
        return y
    nuevo = []
    for r in v['rangos']:
        a0, b0 = ajusta(r[0], True), ajusta(r[1], False)
        if (a0, b0) != tuple(r): cambios += 1; print(pid, r, '->', [a0, b0])
        if b0 - a0 >= 12: nuevo.append([a0, b0])
    m = []
    for r in nuevo:
        if m and r[0] <= m[-1][1] + 1: m[-1][1] = max(m[-1][1], r[1])
        else: m.append(r)
    v['rangos'] = m
open(P, 'w', encoding='utf-8').write('{\n' + ',\n'.join('"%s":%s' % (k, json.dumps(v, separators=(',', ':'), ensure_ascii=False)) for k, v in R.items()) + '\n}\n')
print(cambios, 'cortes movidos')
