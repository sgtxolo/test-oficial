# Tema 15 · Exprés subrayado: pregunta → pieza. Cada párrafo del esquema (donde Esquemas sitúa la pregunta) se localiza en el PDF del usuario por
# coincidencia de tramos de 4 palabras con su OCR; la pieza es la LO (a-N, por la cabecera «Artículo N») o la ventana (f<fx>/q…) que contiene esa posición.
# Uso: node tema15/volcar-parrafos-t15.js && py prompts/herramientas/tema15/preg-extra-t15.py  -> expres-subrayado/t15-preg-extra.json
import json, os, re, unicodedata, pymupdf, collections
PDF = r'C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/TEMA 15 VIOGEN-2026-08-08.pdf'
R = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
d = pymupdf.open(PDF)
def nz(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9 ]', ' ', s).split()
datos = json.load(open(os.environ['TEMP'] + '/par15.json', encoding='utf-8')); par, q = datos['par'], datos['q']
man = json.load(open(R + 'expres-subrayado/t15-manual.json', encoding='utf-8'))['manual']
cfg = json.load(open(R + 'expres-subrayado/t15-config.json', encoding='utf-8'))
ids = {p['id'] for p in json.load(open(R + 'expres-subrayado/img/t15/indice.json', encoding='utf-8'))}
# OCR por página: líneas con y y palabras; índice de tramos de 4 palabras
pag = {}; idx = collections.defaultdict(set)
for p in range(4, 168):
    P = d[p]; H = P.rect.height; L = []
    for b in P.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            t = ''.join(s['text'] for s in l['spans']).strip()
            if t: L.append((l['bbox'][1] / H, nz(t)))
    L.sort(); pag[p] = L
    ws = [w for _, x in L for w in x]
    for i in range(len(ws) - 3): idx[' '.join(ws[i:i + 4])].add(p)
def localiza(txt):
    ws = nz(txt)[:60]; c = collections.Counter()
    for i in range(len(ws) - 3):
        for p in idx.get(' '.join(ws[i:i + 4]), ()): c[p] += 1
    if not c: return None
    p, n = c.most_common(1)[0]
    if n < 2: return None
    first = set(ws[:6]); best = (0, 0.0)
    for y, x in pag[p]:
        s = len(first & set(x))
        if s > best[0]: best = (s, y)
    return p, best[1]
def pieza(p, y):
    for m in man:
        for pg, a, b in m['piezas']:
            if pg == p and a - 0.01 <= y <= b + 0.01: return m['id']
    # sin ventana que la contenga: la pieza (no LO) cuya ventana queda más cerca de la página
    best = (99, None)
    for m in man:
        if m['id'][0] == 'a' or m['id'][0] == 'q': continue
        for pg, a, b in m['piezas']:
            dd = abs(pg - p) + (0 if pg != p else 0)
            if dd < best[0] or (dd == best[0] and pg <= p): best = (dd, m['id'])
    return best[1] if best[0] <= 3 else None
out = {}; fallo = 0
for qid, pid in q.items():
    u = par.get(pid)
    if not u: continue
    m = re.match(r'^articulo (\d+)', u['cab'])
    if m and ('a-' + m.group(1)) in ids and not re.match(r'^articulo (28 bis|28 ter)', u['cab']): out[qid] = 'a-' + m.group(1); continue
    if m and re.match(r'^articulo 28 (bis|ter)', u['cab']) and 'a-28' in ids: out[qid] = 'a-28'; continue
    r = localiza(u['t'])
    if not r: fallo += 1; continue
    z = pieza(*r)
    if z and z in ids: out[qid] = z
    else: fallo += 1
json.dump(out, open(R + 'expres-subrayado/t15-preg-extra.json', 'w', encoding='utf-8'))
print(len(out), 'preguntas ancladas;', fallo, 'sin localizar')
