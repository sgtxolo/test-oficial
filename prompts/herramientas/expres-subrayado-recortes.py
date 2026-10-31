# Recorta del PDF subrayado del usuario los articulos que lleva el Expres de un tema.
# Uso: python expres-subrayado-recortes.py <pdf> <salida_dir> <config.json>
# config: {"leyes":[{"id","nombre","paginas":[a,b],"arts":[n,...]}],
#          "manual":[{"id","nombre","piezas":[[pag,f0,f1]], "recorte":[[pag,f0,f1]]}],   (f0,f1 = fraccion de la altura de la pagina)
#          "paginas":[{"id","nombre","pag"}],
#          "apartados": {"a-34":[2], ...}}      apartados (1., 2., …) que lleva el Expres; si falta, el articulo va entero
# De cada articulo se guarda la imagen entera («<id>.jpg») y, si el Expres solo lleva algunos apartados, la recortada («<id>-r.jpg»).
# Los encabezados «ARTICULO N» se detectan por el OCR (en mayusculas, aunque salga «�T�CULO»); «15 bis» y «15 ter» quedan dentro del 15.
import sys, re, json, pymupdf
from PIL import Image
pdf, out, cfg = sys.argv[1], sys.argv[2], json.load(open(sys.argv[3], encoding='utf-8'))
APART = cfg.get('apartados', {})
d = pymupdf.open(pdf); DPI = 130; K = DPI / 72
def img(p, y0, y1):
    r = p.rect; pm = p.get_pixmap(dpi=DPI, clip=pymupdf.Rect(r.x0, y0, r.x1, y1))
    return Image.frombytes('RGB', (pm.w, pm.h), pm.samples)
def pila(ims):
    w = max(i.width for i in ims); h = sum(i.height for i in ims)
    o = Image.new('RGB', (w, h), 'white'); y = 0
    for i in ims: o.paste(i, (0, y)); y += i.height
    return o
def guarda(nombre_f, ims):
    pila(ims).save(f'{out}/{nombre_f}.jpg', quality=78, optimize=True)
def es_art(t):
    # encabezado «ARTICULO» aunque el OCR lo estropee («�T�CULO», «LRT�CULO», «mcULO»…); el «artículo» de un texto corrido va en minúsculas
    return len(t) <= 14 and re.search(r'(CULO|cULO)[^A-Za-z]*$', t) is not None
def encabezados(a, b):
    H = []
    for pn in range(a, b + 1):
        W = d[pn].get_text('words')
        for w in W:
            if es_art(w[4]):
                if any(es_art(x[4]) and abs(x[1] - w[1]) < 4 and x[0] < w[0] - 2 for x in W): continue   # «(ANTIGUO ARTÍCULO 190 TCE)»: el segundo «ARTÍCULO» de la línea no es cabecera
                sig =sorted([x for x in W if abs(x[1] - w[1]) < 4 and x[0] > w[0]], key=lambda x: x[0])
                if sig:
                    m = re.match(r'^(\d+)', re.sub(r'^\W+', '', sig[0][4]))
                    if m: H.append((int(m.group(1)), pn, w[1]))
    H2 = []; ult = None
    for k, h in enumerate(H):
        if ult is not None and h[0] == ult: continue          # «15 bis», «15 ter»: dentro del 15
        if ult is not None and h[0] > ult + 5 and sum(1 for x in H[k + 1:k + 40] if ult < x[0] < h[0]) >= 3: continue   # (p. ej. «3» leído como «23»)
        if ult is not None and h[0] > ult + 30 and any(ult < x[0] < h[0] for x in H[k + 1:]): continue   # número suelto de una cita («ARTÍCULO 294» dentro del texto): detrás vienen otros más bajos y seguidos
        if ult is None or h[0] > ult: H2.append(h); ult = h[0]; continue
        sig = next((x for x in H[k + 1:] if x[0] > ult), None)   # número mal leído (p. ej. «1.» en vez de «13.»): se deduce por el hueco
        if sig and sig[0] - ult >= 2: H2.append((ult + 1, h[1], h[2])); ult += 1
    return H2
def segmentos(H2, k, b):
    _, pn, y = H2[k]; fin = H2[k + 1] if k + 1 < len(H2) else None
    p = d[pn]; segs = []
    if fin and fin[1] == pn: return [(pn, y - 5, fin[2] - 4)]
    segs.append((pn, y - 5, p.rect.height * .93)); q = pn + 1
    while q <= b:
        pq = d[q]; tq = pq.rect.height * .09
        if fin and fin[1] == q:
            if fin[2] - 4 > tq + 20: segs.append((q, tq, fin[2] - 4))
            break
        segs.append((q, tq, pq.rect.height * .93)); q += 1
    return segs
def marcadores(segs):
    """Posiciones (indice de segmento, y) de los apartados «1.», «2.», «3.»… en orden consecutivo."""
    res = []; esperado = 1
    for si, (pn, y0, y1) in enumerate(segs):
        W = d[pn].get_text('words'); W.sort(key=lambda w: (round(w[1] / 3), w[0]))
        for w in W:
            cy = (w[1] + w[3]) / 2
            if not (y0 + (12 if si == 0 else 0) <= cy <= y1): continue
            t_ = re.sub(r'^[^0-9A-Za-z]+', '', w[4])
            if not (t_.startswith(f'{esperado}.') or (t_ == str(esperado) and len(w[4]) <= 3)): continue
            izq = [x for x in W if abs(x[1] - w[1]) < 4 and x[2] < w[0] - 2 and x[0] > 40]
            if izq: continue                                  # no es el comienzo de línea
            res.append((si, w[1])); esperado += 1
    return res
def recorte_apartados(segs, mk, quiere):
    """Imágenes: el encabezado del artículo + los apartados pedidos."""
    ims = []; fin = (len(segs) - 1, segs[-1][2])
    def trozo(a, b):                                          # de la posición a=(si,y) a b=(si,y)
        out_ = []
        for si in range(a[0], b[0] + 1):
            pn, y0, y1 = segs[si]; ya = a[1] if si == a[0] else y0; yb = b[1] if si == b[0] else y1
            if yb - ya > 4: out_.append(img(d[pn], ya, yb))
        return out_
    ims += trozo((0, segs[0][1]), (mk[0][0], mk[0][1] - 2))        # encabezado
    for n in quiere:
        a = mk[n - 1]; b = (mk[n][0], mk[n][1] - 2) if n < len(mk) else fin
        ims += trozo((a[0], a[1] - 2), b)
    return ims
res = []; avisos = []
for ley in cfg['leyes']:
    a, b = ley['paginas']; H2 = encabezados(a, b)
    print(ley['nombre'], [h[0] for h in H2])
    for n in ley['arts']:
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is None: print('  FALTA art', n); continue
        pid = f"{ley['id']}-{n}"; segs = segmentos(H2, k, b)
        guarda(pid, [img(d[pn], y0, y1) for pn, y0, y1 in segs])
        ent = {'id': pid, 'nombre': f"{ley['nombre']} · Artículo {n}", 'img': f'{pid}.jpg'}
        quiere = APART.get(pid) or []
        if quiere:
            mk = marcadores(segs)
            if len(mk) >= max(quiere) and len(mk) >= 2 and set(quiere) != set(range(1, len(mk) + 1)):
                guarda(pid + '-r', recorte_apartados(segs, mk, quiere)); ent['imgr'] = f'{pid}-r.jpg'; ent['ap'] = quiere
            elif len(mk) < max(quiere): avisos.append(f'{pid}: el OCR solo encuentra {len(mk)} apartados y el Exprés usa {quiere}; se deja entero')
        res.append(ent)
for m in cfg.get('manual', []):
    res[:] = [e for e in res if e['id'] != m['id']]      # un recorte a mano sustituye al detectado
    guarda(m['id'], [img(d[p], d[p].rect.height * f0, d[p].rect.height * f1) for p, f0, f1 in m['piezas']])
    ent = {'id': m['id'], 'nombre': m['nombre'], 'img': f"{m['id']}.jpg"}
    if m.get('recorte'):
        guarda(m['id'] + '-r', [img(d[p], d[p].rect.height * f0, d[p].rect.height * f1) for p, f0, f1 in m['recorte']])
        ent['imgr'] = f"{m['id']}-r.jpg"; ent['ap'] = m.get('ap', [])
    res.append(ent)
for m in cfg.get('paginas', []):
    guarda(m['id'], [img(d[m['pag']], 0, d[m['pag']].rect.height)])
    res.append({'id': m['id'], 'nombre': m['nombre'], 'img': f"{m['id']}.jpg"})
# «cola»: {"id": y} recorta por abajo la imagen entera (títulos de capítulo, pie de página o el siguiente artículo que se cuelan al final)
for pid, y in cfg.get('cola', {}).items():
    ent = next((e for e in res if e['id'] == pid), None)
    if not ent: continue
    f = Image.open(f"{out}/{ent['img']}").convert('RGB'); f.crop((0, 0, f.width, min(y, f.height))).save(f"{out}/{ent['img']}", quality=78, optimize=True)
# recortes a mano sobre la imagen entera ya generada: {"id":{"ap":[..],"rangos":[[y0,y1],..]}} (píxeles de «<id>.jpg»)
for pid, r in cfg.get('img_recorte', {}).items():
    ent = next((e for e in res if e['id'] == pid), None)
    if not ent: continue
    full = Image.open(f"{out}/{ent['img']}").convert('RGB')
    pila([full.crop((0, y0, full.width, min(y1, full.height))) for y0, y1 in r['rangos']]).save(f"{out}/{pid}-r.jpg", quality=78, optimize=True)
    ent['imgr'] = f'{pid}-r.jpg'; ent['ap'] = r['ap']
for ent in res:                                            # tamaño de cada imagen: el visor reserva el hueco antes de cargarla (así el salto desde una pregunta cae justo)
    ent['wh'] = list(Image.open(f"{out}/{ent['img']}").size)
    if ent.get('imgr'): ent['whr'] = list(Image.open(f"{out}/{ent['imgr']}").size)
json.dump(res, open(f'{out}/indice.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for av in avisos: print('AVISO', av)
print(len(res), 'recortes,', sum(1 for r in res if r.get('imgr')), 'con versión recortada por apartados')
