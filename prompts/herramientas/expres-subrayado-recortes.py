# Recorta del PDF subrayado del usuario los articulos que lleva el Expres de un tema.
# Uso: python expres-subrayado-recortes.py <pdf> <salida_dir> <config.json>
# config: {"leyes":[{"id","nombre","paginas":[a,b],"arts":[n,...]}],
#          "manual":[{"id","nombre","piezas":[[pag,f0,f1]]}],      (f0,f1 = fraccion de la altura de la pagina)
#          "paginas":[{"id","nombre","pag"}]}
# Los encabezados «ARTICULO N» se detectan por el OCR (en mayusculas, aunque salga «�T�CULO»); «15 bis» y «15 ter» quedan dentro del 15.
import sys, re, json, pymupdf
from PIL import Image
pdf, out, cfg = sys.argv[1], sys.argv[2], json.load(open(sys.argv[3], encoding='utf-8'))
d = pymupdf.open(pdf); DPI = 130; K = DPI / 72
def img(p, y0, y1):
    r = p.rect; pm = p.get_pixmap(dpi=DPI, clip=pymupdf.Rect(r.x0, y0, r.x1, y1))
    return Image.frombytes('RGB', (pm.w, pm.h), pm.samples)
def pila(ims):
    w = max(i.width for i in ims); h = sum(i.height for i in ims)
    o = Image.new('RGB', (w, h), 'white'); y = 0
    for i in ims: o.paste(i, (0, y)); y += i.height
    return o
def guarda(id, ims, nombre, res):
    f = f'{id}.jpg'; pila(ims).save(f'{out}/{f}', quality=78, optimize=True)
    res.append({'id': id, 'nombre': nombre, 'img': f})
def es_art(t):
    # encabezado «ARTICULO» aunque el OCR lo estropee («�T�CULO», «LRT�CULO», «mcULO»…); el «artículo» de un texto corrido va en minúsculas
    return len(t) <= 14 and re.search(r'(CULO|cULO)[^A-Za-z]*$', t) is not None
def encabezados(a, b):
    H = []
    for pn in range(a, b + 1):
        W = d[pn].get_text('words')
        for w in W:
            if es_art(w[4]):
                sig = sorted([x for x in W if abs(x[1] - w[1]) < 4 and x[0] > w[0]], key=lambda x: x[0])
                if sig:
                    m = re.match(r'^(\d+)', re.sub(r'^\W+', '', sig[0][4]))
                    if m: H.append((int(m.group(1)), pn, w[1]))
    H2 = []; ult = None
    for k, h in enumerate(H):
        if ult is not None and h[0] == ult: continue          # «15 bis», «15 ter»: dentro del 15
        if ult is None or h[0] > ult: H2.append(h); ult = h[0]; continue
        sig = next((x for x in H[k + 1:] if x[0] > ult), None)   # número mal leído (p. ej. «1.» en vez de «13.»): se deduce por el hueco
        if sig and sig[0] - ult >= 2: H2.append((ult + 1, h[1], h[2])); ult += 1
    return H2
res = []
for ley in cfg['leyes']:
    a, b = ley['paginas']; H2 = encabezados(a, b)
    print(ley['nombre'], [h[0] for h in H2])
    for n in ley['arts']:
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is None: print('  FALTA art', n); continue
        _, pn, y = H2[k]; fin = H2[k + 1] if k + 1 < len(H2) else None
        ims = []; p = d[pn]; bot = p.rect.height * .93
        if fin and fin[1] == pn: ims.append(img(p, y - 5, fin[2] - 4))
        else:
            ims.append(img(p, y - 5, bot)); q = pn + 1
            while q <= b:
                pq = d[q]; tq = pq.rect.height * .09
                if fin and fin[1] == q:
                    if fin[2] - 4 > tq + 20: ims.append(img(pq, tq, fin[2] - 4))
                    break
                ims.append(img(pq, tq, pq.rect.height * .93)); q += 1
        guarda(f"{ley['id']}-{n}", ims, f"{ley['nombre']} · Artículo {n}", res)
for m in cfg.get('manual', []):
    guarda(m['id'], [img(d[p], d[p].rect.height * f0, d[p].rect.height * f1) for p, f0, f1 in m['piezas']], m['nombre'], res)
for m in cfg.get('paginas', []):
    guarda(m['id'], [img(d[m['pag']], 0, d[m['pag']].rect.height)], m['nombre'], res)
json.dump(res, open(f'{out}/indice.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(res), 'recortes')
