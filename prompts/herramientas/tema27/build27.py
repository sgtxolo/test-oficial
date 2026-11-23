import pymupdf, re, json, sys
S_FICHAS = 'C:/Users/ruben/AppData/Local/Temp/claude/862629c8fa7a8dfe/85ae8105-2a96-410f-9de8-fab1475846f3/scratchpad/fichas27.json'
sys.stdout.reconfigure(encoding='utf-8')
PDF = "C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/TEMA 27 DEONTOLOGIA PROFESIONAL-2026-08-08.pdf"
OUT = "C:/Users/ruben/Desktop/HTML OFICIAL/expres-subrayado/"
d = pymupdf.open(PDF)
H = d[0].rect.height; TOP = 62; BOT = 772

def lines(pn):
    res = []
    for bl in d[pn].get_text('dict')['blocks']:
        if bl.get('type') != 0: continue
        for ln in bl['lines']:
            res.append((ln['bbox'][1], ln['bbox'][0], ''.join(s['text'] for s in ln['spans']).strip()))
    return sorted(res)

def last_text_y(pn):
    ys = [b[3] for b in d[pn].get_text('blocks') if b[3] < 770 and b[1] > 55 and len(b[4].strip()) > 3]
    return max(ys)

def seq_num(a, b, start, last, xmax, rx=None, gap=True):
    """a,b = paginas 1-based; devuelve {n:(pn0,y)} con numeros secuenciales al comienzo de linea"""
    out = {}; esp = start
    for pn in range(a - 1, b):
        for y, x, t in lines(pn):
            if x > xmax or y < 55 or y > 770: continue
            t2 = re.sub(r'^(?:R\d+|B\d+|\W{1,3})\s*', '', t) if not rx else t
            m = re.match(rx, t) if rx else re.match(r'^(\d{1,2})\s*[.,]?(?=\s|$|[A-Za-zÁ-ú(])', t2)
            if not m: continue
            n = int(m.group(1))
            if n == esp: out[n] = (pn, y); esp += 1
            elif gap and n == esp + 1 and esp not in out and n <= last: out[n] = (pn, y); esp = n + 1
            if esp > last: return out
    return out

def seg(start, end):
    """(pn,y) -> (pn,y): lista de [pn, f0, f1]"""
    (p0, y0), (p1, y1) = start, end; res = []
    for pn in range(p0, p1 + 1):
        a = max(y0 - 3, TOP) if pn == p0 else TOP
        b = (y1 - 3) if pn == p1 else BOT
        if pn == p1 and pn != p0 and b - a < 14: continue
        if b - a < 8: continue
        res.append([pn, round(a / H, 4), round(b / H, 4)])
    return res

pieces = []   # (id, nombre, segs, extra dict)
def add(pid, nombre, start, end, **kw):
    pieces.append(dict(id=pid, nombre=nombre, piezas=seg(start, end), **kw))

def run(markers, titles, fin, ids_names):
    """markers: lista (id,nombre,(pn,y)) ordenada; titles: posiciones que cortan; fin: posicion final"""
    pts = sorted([(m[2], 'p', m) for m in markers] + [(t, 't', None) for t in titles], key=lambda z: z[0])
    for i, (pos, k, m) in enumerate(pts):
        if k != 'p': continue
        end = pts[i + 1][0] if i + 1 < len(pts) else fin
        add(m[0], m[1], pos, end, **(m[3] if len(m) > 3 else {}))

report = {}
# ---------------- ONU ----------------
onu = seq_num(9, 14, 1, 26, 135); onu[6] = (8, 600); report['onu'] = [n for n in range(1, 27) if n not in onu]
OT = re.compile(r'DISPOSICIONES (GENERALES|ESPECIALES)|ACTUACI.N EN CASO|VIGILANCIA DE PERSONAS|CALIFICACIONES, CAPAC|PROCEDIMIENTOS DE PRESENTACI|REUNIONES IL.CITAS|DE PRESENTACI.N DE', re.I)
ot = []
for pn in range(8, 14):
    for y, x, t in lines(pn):
        if OT.search(t) and x < 260 and 60 < y < 770 and t.upper() == t.upper() and sum(c.isupper() for c in t) > 8: ot.append((pn, y))
ot += [(10, 278), (11, 238)]; report['onu_titulos'] = ot
run([('a-%d' % n, 'Principios básicos ONU · Principio %d' % n, onu[n]) for n in sorted(onu)], ot, (13, BOT), None)
add('a-pre', 'Principios básicos ONU · Preámbulo', (6, 70 + 5), (8, 93), expres=1)
# ---------------- POL ----------------
add('b-pre', 'Declaración sobre la Policía · Preámbulo', (14, 90 + 5), (14, BOT), ficha='^Preámbulo · Declaración sobre la Policía', expres=1)
A = {1: (15, 215), 2: (15, 264.1), 3: (15, 300.2), 4: (15, 347.9), 5: (15, 396.7), 6: (15, 445.2), 7: (15, 493.6), 8: (15, 528.8), 9: (15, 578.3), 10: (15, 612.5), 11: (15, 649.2), 12: (15, 684.7), 13: (16, 100.5), 14: (16, 136.1), 15: (16, 209.6), 16: (16, 258.1)}
A[1] = (15, 95)   # incluye «ANEXO. DECLARACIÓN… A) ÉTICA»
B = {1: (16, 353.1), 2: (16, 389.1), 3: (16, 412.4), 4: (16, 472.6), 5: (16, 509.2), 6: (16, 556.2), 7: (16, 605.5), 8: (17, 96.2), 9: (17, 132.7), 10: (17, 193)}
C = {1: (17, 311.2), 2: (17, 388.8), 3: (17, 421.3), 4: (17, 458.6), 5: (17, 553.2), 6: (17, 640.1), 7: (17, 702.6)}
mk = [('b-%d' % n, 'Declaración sobre la Policía · Punto A.%d' % n, A[n]) for n in A] + [('b-%d' % (100 + n), 'Declaración sobre la Policía · Punto B.%d' % n, B[n]) for n in B] + [('b-%d' % (200 + n), 'Declaración sobre la Policía · Punto C.%d' % n, C[n]) for n in C]
run(mk, [(16, 327), (17, 262)], (17, BOT), None)
# ---------------- CEE ----------------
cee = seq_num(19, 24, 1, 66, 135)
for n, (p, y) in {6: (20, 181), 11: (20, 482), 14: (20, 643), 26: (21, 645), 37: (22, 587), 40: (22, 708), 49: (23, 517)}.items(): cee[n] = (p - 1, y)
report['cee'] = [n for n in range(1, 67) if n not in cee]
CT = re.compile(r'^(?:[IVX]{1,4}\.|[A-D]\))\s*[A-Za-zÁ-ú]')
ct = []
for pn in range(18, 24):
    for y, x, t in lines(pn):
        if x < 112 and 60 < y < 770 and CT.match(t) and len(t) < 90 and t[:2] != 'a)': ct.append((pn, y, t[:40]))
ct += [(20, 354, 'B'), (23, 93, '2.Det')]; report['cee_titulos'] = ct
add('c-pre', 'Código Europeo de Ética de la Policía · Preámbulo', (18, 90), (18, 400), ficha='^Preámbulo · Código Europeo', expres=1)
run([('c-%d' % n, 'Código Europeo de Ética de la Policía · Punto %d' % n, cee[n]) for n in sorted(cee)], [(p, y) for p, y, t in ct] + [(18, 403)], (23, BOT), None)
# ---------------- RD ----------------
ay = [y for y, x, t in lines(30) if t.startswith('Anotaciones')]; add('d-pre', 'Real Decreto 176/2022 · Preámbulo', (26, 60), (30, ay[0] if ay else last_text_y(30) + 8), expres=1)
AR = re.compile(r'^\W{0,4}(?:A|L|m)?\S{0,4}[tT]\S{0,3}[cC]\S?[uU][lL][oO]\s*(\d{1,2})\b', re.I)
def arts(a, b, start, last, xmax=140):
    out = {}; esp = start
    for pn in range(a - 1, b):
        for y, x, t in lines(pn):
            if x > xmax or y < 55 or y > 770: continue
            m = re.match(r'^\W{0,4}\S{0,6}?\s?(?:art|rt|t)\S{0,3}c\S?u?lo\s*(\d{1,2})\b', t, re.I)
            if not m: continue
            n = int(m.group(1))
            if n == esp: out[n] = (pn, y); esp += 1
            elif n == esp + 1 and esp not in out and n <= last: out[n] = (pn, y); esp = n + 1
            if esp > last: return out
    return out
rd = arts(33, 34, 1, 6); rd[1] = (32, 161); report['rd'] = [n for n in range(1, 7) if n not in rd]
dpos = None
for pn in (32, 33):
    for y, x, t in lines(pn):
        if re.match(r'^2\.2\.?\s*Disposiciones', t): dpos = (pn, y)
report['rd_disp'] = dpos
run([('d-%d' % n, 'Real Decreto 176/2022 · Artículo %d' % n, rd[n]) for n in sorted(rd)], [dpos] if dpos else [], dpos or (33, BOT), None)
if dpos: add('d-fin', 'Real Decreto 176/2022 · Disposiciones adicional, derogatoria y finales', dpos, (33, last_text_y(33) + 8), ficha='^Disposición final tercera · Real Decreto', expres=1)
# ---------------- COD ----------------
cod = arts(35, 47, 1, 50); cod[9] = (35, 235); cod[36] = (42, 401); report['cod'] = [n for n in range(1, 51) if n not in cod]
add('e-pre', 'Código de Conducta · Título I, Capítulo I (introducción)', (34, 60), (cod[1][0], cod[1][1] - 0), expres=1) if 1 in cod else None
run([('e-%d' % n, 'Código de Conducta · Artículo %d' % n, cod[n]) for n in sorted(cod)], [], (46, last_text_y(46) + 8), None)
add('e-fin', 'Código de Conducta · Anexo. Decálogo', (48, 60), (48, BOT), expres=1)
# ---------------- OG ----------------
og = arts(52, 65, 1, 17); og[3] = (52, 383); og[7] = (54, 507); report['og'] = [n for n in range(1, 18) if n not in og]
fpos = None
for pn in (64, 65):
    for y, x, t in lines(pn):
        if re.search(r'DISPOSICIONES ADICIONALES', t) and fpos is None: fpos = (pn, y)
report['og_fin'] = fpos
if 1 in og: add('f-pre', 'OG 10/2024 · Preámbulo', (50, 62), og[1], expres=1)
fe = {9: '^Artículo 9 · OG 10/2024', 12: '^Artículo 12 · OG 10/2024'}
run([('f-%d' % n, 'OG 10/2024 · Artículo %d' % n, og[n], ({'ficha': fe[n], 'expres': 1} if n in fe else {})) for n in sorted(og)], [fpos] if fpos else [], fpos or (65, BOT), None)
if fpos: add('f-fin', 'OG 10/2024 · Disposiciones adicionales, transitoria, derogatoria y finales', fpos, (66, last_text_y(66) + 8))
# R1-R14 (p. 69-71)
for pn in (68, 69, 70):
    pass
add('r-rec', 'Fichas R1-R14 del temario', (68, 60), (70, BOT)) if False else None

man = {'manual': pieces}
json.dump(man, open(OUT + 't27-manual.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(json.dumps(report, ensure_ascii=False))
print(len(pieces), 'piezas')
# ---- fichas del Exprés para Principios y Puntos ----
FI = json.load(open(S_FICHAS, encoding='utf-8'))
for p in pieces:
    if p['id'] in FI and 'ficha' not in p: p['ficha'] = FI[p['id']]; p['expres'] = 1
json.dump({'manual': pieces}, open(OUT + 't27-manual.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(sum(1 for p in pieces if p.get('ficha')), 'con ficha')
