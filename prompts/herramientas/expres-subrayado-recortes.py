# Recorta del PDF subrayado del usuario los articulos que lleva el Expres de un tema.
# Uso: python expres-subrayado-recortes.py <pdf> <salida_dir> <config.json>
# config: {"leyes":[{"nombre","paginas":[a,b],"arts":[n,...]}],"manual":[{"id","nombre","piezas":[[pag,f0,f1]]}],"paginas":[{"id","nombre","pag"}]}
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
res = []
for ley in cfg['leyes']:
    a, b = ley['paginas']; H = []
    for pn in range(a, b + 1):
        for w in d[pn].get_text('words'):
            if w[4].startswith('ART') and w[4].isupper() or re.match(r'^ART.CULO$', w[4]):
                if w[4] == w[4].upper():
                    sig = [x for x in d[pn].get_text('words') if abs(x[1] - w[1]) < 4 and x[0] > w[0]]
                    sig.sort(key=lambda x: x[0])
                    if sig and re.match(r'^\d+$', re.sub(r'\D', '', sig[0][4]) or 'x'):
                        n = int(re.sub(r'\D', '', sig[0][4]))
                        H.append((n, pn, w[1]))
    # monotono
    H2 = []; ult = None
    for h in H:
        if ult is None or (h[0] >= ult and h[0] - ult <= 12): H2.append(h); ult = h[0]
    print(ley['nombre'], [h[0] for h in H2])
    for n in ley['arts']:
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is None: print('  FALTA art', n); continue
        _, pn, y = H2[k]; fin = H2[k + 1] if k + 1 < len(H2) else None
        ims = []; p = d[pn]; top = p.rect.height * .09; bot = p.rect.height * .93
        if fin and fin[1] == pn: ims.append(img(p, y - 5, fin[2] - 4))
        else:
            ims.append(img(p, y - 5, bot))
            q = pn + 1
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
