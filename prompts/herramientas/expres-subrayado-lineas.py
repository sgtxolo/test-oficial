# Recorta cada artículo a las FRASES exactas que lleva el Exprés (con sus (…)), no a apartados enteros.
# Uso: py expres-subrayado-lineas.py <pdf> <tema> [id,id,…]    (sin ids: todas las piezas con recorte «-r»)
# Alinea (difflib) el texto del Exprés con el OCR del PDF subrayado, saca las líneas de la foto que cubren cada frase
# y reescribe «<id>-r.jpg» (con una franja «(…)» entre tramos). Guarda expres-subrayado/t<N>-lineas.json con los tramos
# (píxeles de «<id>.jpg») y los que han salido dudosos, y actualiza indice.json.
import sys, re, json, subprocess, html, math
from difflib import SequenceMatcher
import pymupdf
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, '.')
pdf, T = sys.argv[1], sys.argv[2]; solo = set(sys.argv[3].split(',')) if len(sys.argv) > 3 else None
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT = B + f'expres-subrayado/img/t{T}'
cfg = json.load(open(B + f'expres-subrayado/t{T}-config.json', encoding='utf-8'))
inst = json.load(open(B + f'expres-subrayado/t{T}-instrumentos.json', encoding='utf-8'))
indice = json.load(open(OUT + '/indice.json', encoding='utf-8'))
d = pymupdf.open(pdf); DPI = 130; K = DPI / 72
js = subprocess.run(['node', '-e', f"global.window={{}};require('{B}expres/t{T}.js');process.stdout.write(JSON.stringify(window.EXPRES_T[{T}].html))"], capture_output=True, text=True, encoding='utf-8').stdout
H = json.loads(js)

def norm(s): return re.sub(r'[^a-z0-9]', '', s.lower().translate(str.maketrans('áéíóúüñ', 'aeiouun')))
def numeros(t):
    s = re.sub(r'^Art[íi]culos?\s+', '', t, flags=re.I).split('—')[0]; out = set()
    for m in re.finditer(r'(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)', s, re.I): out |= set(range(int(m[1]), int(m[2]) + 1))
    for m in re.finditer(r'\d+', re.sub(r'(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)', '', s, flags=re.I)): out.add(int(m[0]))
    return sorted(out)
def textos(cuerpo):
    """Párrafos del artículo (sin sellos ni cajas de «Lo clave»): lista de textos con (…) como separador."""
    ps = re.findall(r'<p\b[^>]*>(.*?)</p>', cuerpo, flags=re.S)
    out = []
    for p in ps:
        p = re.sub(r'<span class="ex-sello[^>]*>.*?</span>', ' ', p, flags=re.S)
        out.append(re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', p))).strip())
    return ' '.join(out)
exp = {}; cur = None; ix = -1
for f in re.split(r'(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)', H):
    t = re.sub(r'<[^>]+>', '', (re.search(r'(?:ex-fh|bloque-titulo)">(.*?)</div>', f) or [None, ''])[1])
    if re.match(r'^ANEXO', t): break
    k = next((j for j, i in enumerate(inst) if j > ix and i.get('inicio') and re.search(i['inicio'], t)), None)
    if k is not None: ix = k; cur = inst[k]['id']
    if not f.startswith('<div class="ex-ficha') or not cur or not re.match(r'^Art[íi]culos?\s+\d', t): continue
    ns = numeros(t)
    if len(ns) == 1: exp.setdefault(f'{cur}-{ns[0]}', []).append(textos(f))

# --- localizar el artículo en el PDF (misma lógica que expres-subrayado-recortes.py) ---
src = open(B + 'prompts/herramientas/expres-subrayado-recortes.py', encoding='utf-8').read()
ns_ = {'d': d, 're': re, 'pymupdf': pymupdf, 'DPI': DPI, 'K': K}
for fn in ('es_art', 'encabezados', 'segmentos'):
    m = re.search(r'^def ' + fn + r'\(.*?(?=^def |^res = )', src, flags=re.S | re.M); exec(m.group(0), ns_)
def img(p, y0, y1):
    r = p.rect; pm = p.get_pixmap(dpi=DPI, clip=pymupdf.Rect(r.x0, y0, r.x1, y1)); return Image.frombytes('RGB', (pm.w, pm.h), pm.samples)

try: FONT = ImageFont.truetype('arial.ttf', 20)
except Exception: FONT = ImageFont.load_default()
res = {}; log = []
for ley in cfg['leyes']:
    a, b = ley['paginas']; H2 = ns_['encabezados'](a, b)
    for n in ley['arts']:
        pid = f"{ley['id']}-{n}"; ent = next((e for e in indice if e['id'] == pid), None)
        if not ent or not ent.get('imgr') or pid not in exp or (solo and pid not in solo): continue
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is None: continue
        segs = ns_['segmentos'](H2, k, b)
        full = []; off = 0; lineas = []                      # lineas: (y0,y1) en px de la imagen entera + texto
        for pn, y0, y1 in segs:
            im = img(d[pn], y0, y1); full.append(im)
            W = [w for w in d[pn].get_text('words') if y0 <= (w[1] + w[3]) / 2 <= y1]; W.sort(key=lambda w: (w[1] + w[3]) / 2)
            grp = []
            for w in W:
                if grp and abs((w[1] + w[3]) / 2 - (grp[-1][1] + grp[-1][3]) / 2) > 4: lineas.append(grp); grp = []
                grp.append(w)
            if grp: lineas.append(grp)
            lineas[-1:] = lineas[-1:]
            for g in lineas[len(lineas) - sum(1 for _ in [0]):][:0]: pass
            off += im.height
        # reconstruir con offsets por línea
        L = []; off = 0; idx = 0
        for si, (pn, y0, y1) in enumerate(segs):
            Ws = [w for w in d[pn].get_text('words') if y0 <= (w[1] + w[3]) / 2 <= y1]; Ws.sort(key=lambda w: (w[1] + w[3]) / 2); grp = []; gs = []
            for w in Ws:
                if grp and abs((w[1] + w[3]) / 2 - (grp[-1][1] + grp[-1][3]) / 2) > 4: gs.append(grp); grp = []
                grp.append(w)
            if grp: gs.append(grp)
            for g in gs:
                g.sort(key=lambda w: w[0]); L.append((off + (min(w[1] for w in g) - y0) * K, off + (max(w[3] for w in g) - y0) * K, ''.join(norm(w[4]) for w in g)))
            off += full[si].height
        H_total = off
        stream = ''; lin_de = []
        for i, (_, _, t_) in enumerate(L): stream += t_; lin_de += [i] * len(t_)
        # texto del Exprés: tramos entre (…)
        txt = ' '.join(exp[pid]); trozos = [s.strip() for s in txt.split('(…)')]; A = ''; marcas = []
        for s in trozos:
            ns_s = norm(s)
            if len(ns_s) < 4: continue
            marcas.append((len(A), len(A) + len(ns_s))); A += ns_s
        if not A or not stream: log.append(f'{pid}: sin texto'); continue
        sm = SequenceMatcher(None, A, stream, autojunk=False); mapa = {}
        for bl in sm.get_matching_blocks():
            if bl.size >= 8:
                for j in range(bl.size): mapa[bl.a + j] = bl.b + j
        runs = []; dud = []
        for (s0, e0) in marcas:
            cs = [i for i in range(s0, e0) if i in mapa]
            if len(cs) < max(6, 0.25 * (e0 - s0)): dud.append(s0); continue
            ps_ = [mapa[i] for i in cs]; ancho = 1.7 * (e0 - s0) + 120; mejor = (0, 0, 0); j = 0   # ventana más densa: ignora coincidencias sueltas lejanas
            for i_ in range(len(ps_)):
                while ps_[i_] - ps_[j] > ancho: j += 1
                if i_ - j + 1 > mejor[0]: mejor = (i_ - j + 1, j, i_)
            l0 = lin_de[ps_[mejor[1]]]; l1 = lin_de[ps_[mejor[2]]]
            runs.append([l0, l1])
        if not runs: log.append(f'{pid}: DUDOSO, se deja el recorte por apartados'); continue
        # fundir tramos que se tocan o se solapan
        runs.sort(); m_ = [runs[0]]
        for r in runs[1:]:
            if r[0] <= m_[-1][1] + 1: m_[-1][1] = max(m_[-1][1], r[1])
            else: m_.append(r)
        py = [[max(0, int(L[a_][0]) - 3), min(H_total, int(L[b_][1]) + 3)] for a_, b_ in m_]
        W_ = max(i.width for i in full); big = Image.new('RGB', (W_, H_total), 'white'); y = 0
        for im in full: big.paste(im, (0, y)); y += im.height
        trozos_im = []
        for q, (y0_, y1_) in enumerate(py):
            if q:
                g = Image.new('RGB', (W_, 30), 'white'); ImageDraw.Draw(g).text((W_ // 2 - 14, 4), '(…)', fill=(110, 116, 126), font=FONT); trozos_im.append(g)
            trozos_im.append(big.crop((0, y0_, W_, y1_)))
        if py[0][0] > 40:                                   # que se vea qué artículo es: el encabezado va siempre
            c = [L[0][0], L[0][1]]; cab = big.crop((0, max(0, int(L[0][0]) - 3), W_, int(L[0][1]) + 3))
            if py[0][0] > L[0][1] + 6: trozos_im.insert(0, cab)
        o = Image.new('RGB', (W_, sum(t.height for t in trozos_im)), 'white'); y = 0
        for t in trozos_im: o.paste(t, (0, y)); y += t.height
        o.save(f"{OUT}/{pid}-r.jpg", quality=78, optimize=True)
        ent['whr'] = list(o.size); res[pid] = {'runs': py, 'dud': len(dud), 'H': H_total}
        log.append(f'{pid}: {len(py)} tramos, {len(dud)} dudosos, {o.height}px de {H_total}')
json.dump(indice, open(OUT + '/indice.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
old = {}
try: old = json.load(open(B + f'expres-subrayado/t{T}-lineas.json', encoding='utf-8'))
except Exception: pass
old.update(res); json.dump(old, open(B + f'expres-subrayado/t{T}-lineas.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('\n'.join(log))
