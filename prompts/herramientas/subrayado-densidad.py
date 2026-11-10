"""Mide cuánto subrayado (fosforito/rotulador) lleva cada pieza del Exprés subrayado.
Uso (desde la carpeta del proyecto):  py prompts/herramientas/subrayado-densidad.py
Para cada pieza de expres-subrayado/datos-tN.js mira su imagen completa y calcula
  d = píxeles de color / (píxeles de color + píxeles de tinta negra)
y lo pasa a una escala 0-1 DENTRO de cada tema (percentil), porque la calidad del escaneo cambia de un tema a otro.
Escribe expres-subrayado/dens.js  ->  window.EXSUBU = {tema: {idPieza: [subrayado, boli_margen]}} (0..1)  (lo usa el Esquema clave).
Volver a ejecutar si se regeneran las imágenes o los datos."""
import glob, json, os, re, sys
import numpy as np
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SUB = os.path.join(RAIZ, 'expres-subrayado')


def lee_datos(ruta):
    s = open(ruta, encoding='utf8').read()
    return json.loads(s[s.index('={') + 1:s.rstrip().rstrip(';').rindex('}') + 1])


def densidad(ruta):
    im = Image.open(ruta).convert('RGB')
    if im.width > 540:
        im = im.resize((540, max(1, round(im.height * 540 / im.width))))
    a = np.asarray(im, dtype=np.float32) / 255.0
    mx, mn = a.max(2), a.min(2)
    sat = (mx - mn) / np.maximum(mx, 1e-6)
    color = ((sat > 0.25) & (mx > 0.6)).sum()
    tinta = (mx < 0.45).sum()
    # boli a mano en los márgenes (azul/rojo, más oscuro que el fosforito): columnas del 16 % de cada lado
    w = a.shape[1]; k = max(1, int(w * 0.16))
    mar = np.concatenate([a[:, :k].reshape(-1, 3), a[:, w - k:].reshape(-1, 3)])
    mxm, mnm = mar.max(1), mar.min(1)
    satm = (mxm - mnm) / np.maximum(mxm, 1e-6)
    boli = ((satm > 0.35) & (mxm < 0.85) & (mxm > 0.2)).sum() / float(len(mar))
    return float(color) / float(color + tinta + 1), float(boli)


res = {}
for f in sorted(glob.glob(os.path.join(SUB, 'datos-t*.js')), key=lambda x: int(re.search(r't(\d+)\.js', x).group(1))):
    n = int(re.search(r't(\d+)\.js', f).group(1))
    D = lee_datos(f)
    crudo = {}; boli = {}
    for p in D['piezas']:
        r = os.path.join(SUB, 'img', 't%d' % n, p['img'])
        if os.path.exists(r):
            try:
                crudo[p['id']], boli[p['id']] = densidad(r)
            except Exception as e:
                print('  fallo', r, e)
    if not crudo:
        continue
    orden = sorted(crudo.values())
    k = len(orden)
    ob = sorted(boli.values())
    pc = lambda lista, d: round(sum(1 for v in lista if v < d) / max(1, len(lista) - 1), 3)
    # [subrayado 0-1, boli en márgenes 0-1] (percentil dentro del tema)
    res[n] = {i: [pc(orden, d), pc(ob, boli[i])] for i, d in crudo.items()}
    print('T%d: %d piezas, densidad cruda mediana %.3f' % (n, k, orden[k // 2]))
open(os.path.join(SUB, 'dens.js'), 'w', encoding='utf8').write('window.EXSUBU=' + json.dumps(res, separators=(',', ':')) + ';\n')
print('escrito expres-subrayado/dens.js')
