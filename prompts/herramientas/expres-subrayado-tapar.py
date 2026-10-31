# Zonas de fosforito de cada foto, para el modo «Tapar mi subrayado» de expres-subrayado.html.
# Uso: py expres-subrayado-tapar.py <tema> [foto …]  ->  expres-subrayado/tapa-t<N>.js  {"a-77":[[x,y,w,h,"#rrggbb"],…]}  (píxeles de la imagen)
# Con nombres de foto (sin .jpg) solo procesa esas y guarda una prueba con las cajas pintadas en _tmp/tapa-<foto>.png.
# Cómo: 1) renglones de texto por la tinta oscura de cada fila; 2) dentro de cada renglón, las columnas con bastante color claro
# (fosforito: claro y con color, ni blanco ni tinta); 3) se unen los huecos cortos. Una caja por tramo subrayado y renglón.
# El bolígrafo (subrayados rojos, círculos, estrellas) es fino: en la altura del renglón ocupa poco y no llega al umbral.
import sys, json, os
import numpy as np
from PIL import Image, ImageDraw
T = sys.argv[1]; B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; D = B + f'expres-subrayado/img/t{T}'
COL_MIN, HUECO, ANCHO_MIN, MEDIA_MIN = .3, 9, 16, .38

def mascara(rgb):
    mx = rgb.max(axis=2).astype(int); mn = rgb.min(axis=2).astype(int)
    sat = (mx - mn) / np.maximum(mx, 1)
    return (sat > .14) & (mx > 160) & (mn > 35)

def renglones(rgb):
    g = rgb.mean(axis=2); tinta = (g < 110).sum(axis=1); H = len(tinta)
    on = tinta > max(3, rgb.shape[1] * .004); bandas = []; y = 0
    while y < H:
        if not on[y]: y += 1; continue
        y0 = y
        while y < H and (on[y] or (y + 3 < H and on[y + 1:y + 4].any())): y += 1
        if y - y0 >= 8: bandas.append([y0, y])
    # bloques de varias líneas pegadas (el bolígrafo o el fosforito unen los renglones): se parten por donde hay menos tinta
    hs = [b - a for a, b in bandas if 16 <= b - a <= 44]; med = float(np.median(hs)) if hs else 28.
    lisa = np.convolve(tinta, np.ones(3) / 3, mode='same'); out = []
    for a, b in bandas:
        k = int(round((b - a) / med))
        if k < 2: out.append([a, b]); continue
        cortes = [a]
        for i in range(1, k):
            obj = a + (b - a) * i / k; lo, hi = int(obj - med * .35), int(obj + med * .35)
            cortes.append(lo + int(np.argmin(lisa[lo:hi])))
        cortes.append(b)
        out += [[cortes[i], cortes[i + 1]] for i in range(k)]
    return out

def cajas(rgb):
    m = mascara(rgb); H, W = m.shape; out = []
    for a, b in renglones(rgb):
        a2, b2 = max(0, a - 4), min(H, b + 4); fr = m[a2:b2].mean(axis=0); xs = np.flatnonzero(fr >= COL_MIN)
        if not len(xs): continue
        tramos = []; ini = prev = xs[0]
        for x in xs[1:]:
            if x - prev > HUECO: tramos.append([ini, prev]); ini = x
            prev = x
        tramos.append([ini, prev])
        for x0, x1 in tramos:
            if x1 - x0 + 1 < ANCHO_MIN or fr[x0:x1 + 1].mean() < MEDIA_MIN: continue
            zona = rgb[a2:b2, x0:x1 + 1]; mz = m[a2:b2, x0:x1 + 1]
            col = zona[mz].mean(axis=0) if mz.any() else np.array([240, 220, 90])
            out.append([int(x0) - 2, int(a2), int(x1 - x0) + 5, int(b2 - a2), '#%02x%02x%02x' % tuple(int(v) for v in col)])
    return out

solo = sys.argv[2:]; res = {}
for f in sorted(os.listdir(D)):
    if not f.endswith('.jpg') or (solo and f[:-4] not in solo): continue
    im = Image.open(f'{D}/{f}').convert('RGB'); bs = cajas(np.asarray(im)); res[f[:-4]] = bs
    if solo:
        os.makedirs(B + 'prompts/herramientas/_tmp', exist_ok=True); dr = ImageDraw.Draw(im)
        for x, y, w, h, col in bs: dr.rectangle([x, y, x + w, y + h], outline=(0, 0, 255), width=2)
        im.save(B + f'prompts/herramientas/_tmp/tapa-{f[:-4]}.png'); print(f, len(bs), 'cajas')
if not solo:
    s = '(window.EXSUB_TAPA=window.EXSUB_TAPA||{})[%s]=%s;\n' % (T, json.dumps(res, separators=(',', ':')))
    open(B + f'expres-subrayado/tapa-t{T}.js', 'w', encoding='utf-8').write(s)
    print(len(res), 'imágenes,', sum(len(v) for v in res.values()), 'cajas,', len(s) // 1024, 'KB')
