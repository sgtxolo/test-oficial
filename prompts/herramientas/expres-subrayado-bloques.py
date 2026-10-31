# Posición (píxeles de «<id>.jpg») de la cabecera y de cada apartado (1., 2., 3.…) de los artículos con recorte «-r».
# Sirve para el botón «➕ Añadir a mi subrayado» (sumar al recorte un apartado que el Exprés no lleva).
# Uso: py expres-subrayado-bloques.py <pdf> <tema>     -> expres-subrayado/t<N>-bloques.json   {"a-77":[[0,120],[120,300],...]}
#   el primer par es la cabecera; el par k (k>=1) es el apartado k.
import sys, re, json, pymupdf
from PIL import Image
pdf, T = sys.argv[1], sys.argv[2]
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT = B + f'expres-subrayado/img/t{T}'
cfg = json.load(open(B + f'expres-subrayado/t{T}-config.json', encoding='utf-8'))
indice = {e['id']: e for e in json.load(open(OUT + '/indice.json', encoding='utf-8'))}
d = pymupdf.open(pdf); DPI = 130; K = DPI / 72
src = open(B + 'prompts/herramientas/expres-subrayado-recortes.py', encoding='utf-8').read()
ns = {'d': d, 're': re, 'pymupdf': pymupdf, 'DPI': DPI, 'K': K}
for fn in ('es_art', 'encabezados', 'segmentos', 'marcadores'):
    m = re.search(r'^def ' + fn + r'\(.*?(?=^def |^res = )', src, flags=re.S | re.M); exec(m.group(0), ns)
res = {}; avisos = []
for ley in cfg['leyes']:
    a, b = ley['paginas']; H2 = ns['encabezados'](a, b)
    for n in ley['arts']:
        pid = f"{ley['id']}-{n}"; ent = indice.get(pid)
        if not ent or not ent.get('imgr'): continue
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is None: continue
        segs = ns['segmentos'](H2, k, b); mk = ns['marcadores'](segs)
        if len(mk) < 2 or len(mk) < max(ent.get('ap') or [0]): avisos.append(f'{pid}: OCR halla {len(mk)} apartados, el Exprés usa {ent.get("ap")}'); continue
        offs = []; o = 0
        for pn, y0, y1 in segs:
            offs.append(o); o += int(round((y1 - y0) * K))
        tot = ent['wh'][1]
        px = lambda si, y: min(tot, max(0, offs[si] + int(round((y - segs[si][1]) * K))))
        cortes = [px(si, y) - 3 for si, y in mk]
        bl = [[0, max(0, cortes[0])]] + [[cortes[i], cortes[i + 1] if i + 1 < len(cortes) else tot] for i in range(len(cortes))]
        res[pid] = bl
# Formato final: {id: [[y0,y1,"etiqueta",lleva_el_Expres(0/1)], ...]} cubriendo toda la imagen entera.
fin = {}
for pid, bl in res.items():
    ap = indice[pid].get('ap') or []
    fin[pid] = [[bl[0][0], bl[0][1], 'Cabecera', 1]] + [[y0, y1, 'Apartado %d' % i, 1 if i in ap else 0] for i, (y0, y1) in enumerate(bl[1:], 1)]
try: rec = json.load(open(B + f'expres-subrayado/t{T}-img-recorte.json', encoding='utf-8'))
except Exception: rec = {}
for pid, r in rec.items():                                   # recortes hechos a mano en píxeles: lo que sobra entre ellos son los «trozos omitidos»
    if pid not in indice or not indice[pid].get("imgr"): continue
    tot = indice[pid]['wh'][1]; out = []; y = 0; g = 0
    for y0, y1 in sorted(r['rangos']):
        y1 = min(y1, tot)
        if y0 - y > 12: g += 1; out.append([y, y0, 'Trozo omitido %d' % g, 0])
        out.append([y0, y1, 'Lleva el Exprés', 1]); y = y1
    if tot - y > 12: g += 1; out.append([y, tot, 'Trozo omitido %d' % g, 0])
    fin[pid] = out
res = fin
json.dump(res, open(B + f'expres-subrayado/t{T}-bloques.json', 'w', encoding='utf-8'), separators=(',', ':'))
print(len(res), 'artículos con bloques'); print('\n'.join(avisos[:40]))
