# Añade al Exprés subrayado piezas «fuera del Exprés» sacadas de un PDF por bloques de páginas (preámbulo, disposiciones…).
# Uso: py expres-subrayado-anadir-piezas.py <pdf> <tema> <bloques.json>
# bloques.json: [{"id":"d-da","nombre":"LO 3/2018 · Disposiciones adicionales","ini":[pagina,y_pt],"fin":[pagina,y_pt]}, ...]  (páginas 0-based; y en puntos del PDF)
# Crea expres-subrayado/img/t<N>/<id>.jpg y lo añade a indice.json; luego ejecutar expres-subrayado-datos.js.
import sys, json
import pymupdf
from PIL import Image
pdf, T, bj = sys.argv[1], sys.argv[2], sys.argv[3]
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT = B + f'expres-subrayado/img/t{T}'
d = pymupdf.open(pdf); DPI = 130
ind = json.load(open(OUT + '/indice.json', encoding='utf-8'))
def img(p, y0, y1):
    r = p.rect; pm = p.get_pixmap(dpi=DPI, clip=pymupdf.Rect(r.x0, y0, r.x1, y1)); return Image.frombytes('RGB', (pm.w, pm.h), pm.samples)
for b in json.load(open(bj, encoding='utf-8')):
    (p0, y0), (p1, y1) = b['ini'], b['fin']; ims = []
    for pn in range(p0, p1 + 1):
        H = d[pn].rect.height; a = y0 if pn == p0 else H * .09; z = y1 if pn == p1 else H * .93
        if z - a > 8: ims.append(img(d[pn], a, z))
    W = max(i.width for i in ims); h = sum(i.height for i in ims); o = Image.new('RGB', (W, h), 'white'); y = 0
    for i in ims: o.paste(i, (0, y)); y += i.height
    o.save(f"{OUT}/{b['id']}.jpg", quality=78, optimize=True)
    ind[:] = [e for e in ind if e['id'] != b['id']] + [{'id': b['id'], 'nombre': b['nombre'], 'img': b['id'] + '.jpg', 'wh': list(o.size)}]
    print(b['id'], o.size)
json.dump(ind, open(OUT + '/indice.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
