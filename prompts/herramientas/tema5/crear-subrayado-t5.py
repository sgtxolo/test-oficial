# Recorta las páginas del resumen del T5 (PDF PARTE 1) a expres-subrayado/img/t5/<id>.jpg (1075 px de ancho, sin márgenes en blanco) y escribe piezas.json
# Uso: py -I crear-subrayado-t5.py <pdf> <carpeta_img> <piezas.json de node>
import sys, json, os
import numpy as np, pymupdf
from PIL import Image
pdf, out, pj = sys.argv[1], sys.argv[2], sys.argv[3]; salida = sys.argv[4] if len(sys.argv) > 4 else 'piezas.json'
os.makedirs(out, exist_ok=True)
P = json.load(open(pj, encoding='utf8')); d = pymupdf.open(pdf); res = []
for pid, norma, pag, (y0, y1), arts, *resto in P:
    pm = d[pag - 1].get_pixmap(dpi=200)
    im = Image.frombytes('RGB', (pm.w, pm.h), pm.samples)
    a = np.asarray(im).astype(int)
    H = a.shape[0]; ya, yb = int(H * y0), int(H * y1)
    sub = a[ya:yb]
    ink = (sub.min(2) < 200).sum(1) > 6                      # filas con algo de tinta o color
    col = ((sub.max(2) - sub.min(2)) > 40).any(1) | (sub.min(2) < 120).any(1)
    filas = np.where(col)[0]
    if len(filas): ya, yb = ya + max(0, filas[0] - 8), ya + min(len(sub), filas[-1] + 10)
    # recorta también columnas en blanco (márgenes) a izquierda y derecha
    colx = np.where(((a[ya:yb].max(2) - a[ya:yb].min(2)) > 40).any(0) | (a[ya:yb].min(2) < 120).any(0))[0]
    x0, x1 = max(0, colx[0] - 10), min(a.shape[1], colx[-1] + 10)
    c = im.crop((x0, ya, x1, yb)); w = 1075; h = round(c.height * w / c.width)
    c.resize((w, h), Image.LANCZOS).save(os.path.join(out, pid + '.jpg'), quality=82)
    res.append({'id': pid, 'norma': norma, 'pag': pag, 'wh': [w, h], 'arts': arts, 'qs': resto[0] if resto else []})
json.dump(res, open(os.path.join(out, salida), 'w', encoding='utf8'))
print(len(res), 'piezas')
