# Propone recortes (rangos en píxeles de «<id>.jpg») igual que el Exprés, línea a línea, para cualquier pieza (también fichas de
# varios artículos y piezas a mano). Una línea del OCR se queda si comparte bastantes pares de palabras seguidas con el texto
# del Exprés de la pieza (sin lo omitido con «(…)»). Siempre se queda la cabecera del artículo.
# Uso: TEMA=1 py propuesta-lineas.py id,id,… | todas   -> SCRATCH/propuesta-t<N>.json  {"id":{"ap":[],"rangos":[[y0,y1],…],"pct":0.4}}
#      además dibuja SCRATCH/prop-<id>.png (foto reducida: lo que sale en verde a la izquierda, lo quitado tapado en rojo claro)
import os, sys, re, json, subprocess, pymupdf
from difflib import SequenceMatcher
from PIL import Image, ImageDraw, ImageFont
T = os.environ.get('TEMA', '11'); S = os.environ.get('SCRATCH', 'C:/Users/ruben/AppData/Local/Temp/')
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
PDF = {'1': 'TEMA 1 DERECHOS HUMANOS-08-08-2026.pdf', '14': 'TEMA 14 DEFENSOR DEL PUEBLO-2026-08-08.pdf', '3': 'TEMA 3 TRATADOS DE LA UNION EUROPEA-08-08-2026.pdf', '9': 'TEMA 9 DERECHO CIVIL-08-08-2026.pdf', '12': 'TEMA 12 - GOBIERNO Y ADMINISTRACION-2026-08-08.pdf', '7': 'TEMA 7 CONTITUCION ESPAÑOLA-08-08-2026.pdf', '11': 'TEMA 11 DERECHO ADEMINISTRATIVO-08-08-2026.pdf'}
d = pymupdf.open('C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/' + PDF[T]); DPI = 130; K = DPI / 72
cfg = json.load(open(B + f'expres-subrayado/t{T}-config.json', encoding='utf-8'))
ind = {e['id']: e for e in json.load(open(B + f'expres-subrayado/img/t{T}/indice.json', encoding='utf-8'))}
EX = json.loads(subprocess.run(['node', 'prompts/herramientas/subrayado-revision/texto-pieza.js', '--json'], capture_output=True, text=True, encoding='utf-8', env={**os.environ, 'TEMA': T}, cwd=B).stdout)
src = open(B + 'prompts/herramientas/expres-subrayado-recortes.py', encoding='utf-8').read(); ns = {'d': d, 're': re, 'pymupdf': pymupdf, 'DPI': DPI, 'K': K}
for fn in ('es_art', 'encabezados', 'segmentos'):
    m = re.search(r'^def ' + fn + r'\(.*?(?=^def |^res = )', src, flags=re.S | re.M); exec(m.group(0), ns)
ZON = json.load(open(B + f'expres-subrayado/t{T}-zonas.json', encoding='utf-8')) if os.path.exists(B + f'expres-subrayado/t{T}-zonas.json') else {}
COLA = json.load(open(B + f'expres-subrayado/t{T}-cola.json', encoding='utf-8')) if os.path.exists(B + f'expres-subrayado/t{T}-cola.json') else {}
segs = {}
for ley in cfg['leyes']:
    a, b = ley['paginas']; H2 = ns['encabezados'](a, b)
    for n in ley['arts']:
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is not None: segs[f"{ley['id']}-{n}"] = ns['segmentos'](H2, k, b)
for m in cfg.get('manual', []): segs[m['id']] = [(p, d[p].rect.height * f0, d[p].rect.height * f1) for p, f0, f1 in m['piezas']]
def norm(w): return re.sub(r'[^a-z0-9]', '', w.lower().translate(str.maketrans('áéíóúüñ', 'aeiouun')))
def toks(s): return [x for x in (norm(w) for w in re.split(r'[\s/—–-]+', s)) if x]
def lineas(pid):
    """Líneas del OCR de la pieza con su posición (px de la imagen entera)."""
    out = []; off = 0
    for pn, y0, y1 in segs[pid]:
        L = {}
        for w in d[pn].get_text('words'):
            cy = (w[1] + w[3]) / 2
            if y0 <= cy <= y1: L.setdefault((w[5], w[6]), []).append(w)
        for ws in L.values():
            ws.sort(key=lambda w: w[0]); out.append([off + (min(w[1] for w in ws) - y0) * K, off + (max(w[3] for w in ws) - y0) * K, ' '.join(w[4] for w in ws)])
        off += round((y1 - y0) * K)
    out.sort()
    zon = ZON.get(pid, []); cola = COLA.get(pid)   # zonas (cuadros impresos, tN-zonas.json) y cola (títulos al final, tN-cola.json): el OCR de ahí no cuenta
    return [l for l in out if not any(a <= (l[0] + l[1]) / 2 <= b for a, b in zon) and not (cola and l[0] >= cola - 4)]
def propone(pid):
    tramos = []
    for p in EX[pid]:
        p = re.sub(r'🎯.*?preguntas?(?: más de este artículo)?', ' ', p)
        tramos += [''.join(toks(t)) for t in p.split('(…)')]
    tramos = [t for t in tramos if len(t) >= 4]
    L = lineas(pid); H = ind[pid]['wh'][1]
    stream = ''; lin_de = []
    for i, (_, _, s) in enumerate(L): t = ''.join(toks(s)); stream += t; lin_de += [i] * len(t)
    keep = [y0 < 28 for y0, _, _ in L]; pos = 0; dud = []
    def busca(t, ini):
        reg = stream[ini:]
        if len(t) < 14:
            j = reg.find(t)
            return None if j < 0 else (ini + j, ini + j + len(t) - 1)
        sm = SequenceMatcher(None, t, reg, autojunk=False); ps_ = []
        for bl in sm.get_matching_blocks():
            if bl.size >= 6: ps_ += [ini + bl.b + j for j in range(bl.size)]
        if len(ps_) < max(6, .3 * len(t)): return None
        ancho = 1.7 * len(t) + 60; mejor = (0, 0, 0); j = 0
        for i_ in range(len(ps_)):
            while ps_[i_] - ps_[j] > ancho: j += 1
            if i_ - j + 1 > mejor[0]: mejor = (i_ - j + 1, j, i_)
        if mejor[0] < max(6, .45 * len(t)): return None
        return ps_[mejor[1]], ps_[mejor[2]]
    hall = []
    for t in tramos:
        t = re.sub(r'^art\d+(?:bis|ter)?', '', t)   # «Art. 6.» ya va en la cabecera
        if len(t) < 4: continue
        r = busca(t, max(0, pos - 200)) or busca(t, 0)
        if not r: dud.append(t[:40]); hall.append(None); continue
        l0, l1 = lin_de[r[0]], lin_de[r[1]]; hall.append((l0, l1))
        for i in range(l0, l1 + 1): keep[i] = True
        pos = r[0]
    # una frase que el OCR no encuentra (renglones con notas a mano) no se quita: se deja todo el hueco entre la frase anterior y la siguiente
    # (y, si es de las primeras, desde la cabecera); las del final no, porque suelen ser del artículo vecino de la ficha
    prev = 0 if hall and hall[0] is None else None
    for i, x in enumerate(hall):
        if x is not None:
            if prev is not None and i > 0 and hall[i - 1] is None:
                for j in range(prev, x[0] + 1): keep[j] = True
            prev = x[1]
    tail = 0
    for x in reversed(hall):
        if x is not None: break
        tail += 1
    if tail: dud.append('FINAL:%d' % tail)
    if hall and all(x is None for x in hall): keep = [True] * len(L)   # no se encuentra nada: el artículo se deja entero
    elif 0 < tail <= 2:                                                 # las últimas frases no se encuentran: hasta el final
        last = next(x for x in reversed(hall) if x is not None)[1]
        for j in range(last, len(L)): keep[j] = True
    # títulos intermedios («ARTÍCULO 3. …», «DISPOSICIÓN ADICIONAL SEGUNDA» y su rótulo): se quedan si algo de su parte se queda
    cab = [i for i, (_, _, s) in enumerate(L) if re.match(r'^\W*(ART.{0,3}CULO|[A-Z�]{1,3}T.?CULO|DISPOSICI.N|PROTOCOLO)\b', s)]
    for n_, i in enumerate(cab):
        j = cab[n_ + 1] if n_ + 1 < len(cab) else len(L)
        if any(keep[i + 1:j]):
            keep[i] = True
            if i + 1 < j and L[i + 1][0] - L[i][1] < 25 and L[i + 1][2].upper() == L[i + 1][2]: keep[i + 1] = True   # rótulo en mayúsculas debajo
    rg = []
    for (y0, y1, s), k in zip(L, keep):
        if not k: continue
        a, b = max(0, int(y0) - 4), min(H, int(y1) + 4)
        if rg and a - rg[-1][1] < 14: rg[-1][1] = max(rg[-1][1], b)
        else: rg.append([a, b])
    if rg and not re.search(r'-\d+$', pid) and len(rg) > 1 and rg[0][1] < 60: rg = rg[1:]   # pieza de páginas enteras: fuera la cabecera de página
    elif rg: rg[0][0] = 0
    alto = sum(b - a for a, b in rg)
    return {'ap': [], 'rangos': rg, 'pct': round(alto / H, 2), 'dud': dud}, L, keep
def dibuja(pid, r, L, keep):
    im = Image.open(B + f'expres-subrayado/img/t{T}/{pid}.jpg').convert('RGB'); ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); dr = ImageDraw.Draw(ov)
    y = 0
    for a, b in r['rangos'] + [[im.height, im.height]]:
        if a > y: dr.rectangle([0, y, im.width, a], fill=(255, 120, 120, 110))
        y = b
    for a, b in r['rangos']: dr.rectangle([0, a, 14, b], fill=(0, 170, 0, 255))
    f = ImageFont.truetype('arial.ttf', 22)
    for yy in range(0, im.height, 100): dr.text((im.width - 60, yy), str(yy), fill=(0, 0, 255, 255), font=f)
    im = Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB'); sc = .55
    im.resize((int(im.width * sc), int(im.height * sc))).save(S + f'prop-{pid}.png')
SINP = set(EX.get('_sinpropio', []))
ids = sys.argv[1].split(',') if sys.argv[1] != 'todas' else [k for k in ind if k in EX and k in segs]
res = {}
for pid in ids:
    if pid not in segs or pid not in EX: print('sin datos', pid); continue
    if pid in SINP: print('(ficha sin «Art. N» propio, se usa entera)', pid)
    r, L, keep = propone(pid); res[pid] = r; dibuja(pid, r, L, keep)
json.dump(res, open(S + f'propuesta-t{T}.json', 'w', encoding='utf-8'))
for k, r in sorted(res.items(), key=lambda x: x[1]['pct']): print(k, r['pct'], ind[k]['wh'][1], len(r['dud']), r['rangos'] if len(sys.argv) > 2 else '')
