# Propone recortes (rangos en píxeles de «<id>.jpg») para artículos que hoy se ven ENTEROS pero el Exprés solo lleva una parte.
# Método: una línea de la foto se queda si comparte al menos un par de palabras seguidas (bigrama) con el texto del Exprés de ese artículo.
# Uso: py expres-subrayado-propuesta.py <tema> id,id,…  >  salida en prompts/herramientas/_tmp/propuesta-t<N>.json  (no toca el repo)
import sys, re, json, subprocess, html
import pymupdf
T = sys.argv[1]; ids = sys.argv[2].split(',')
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT = B + f'expres-subrayado/img/t{T}'
cfg = json.load(open(B + f'expres-subrayado/t{T}-config.json', encoding='utf-8')); inst = json.load(open(B + f'expres-subrayado/t{T}-instrumentos.json', encoding='utf-8'))
ind = {e['id']: e for e in json.load(open(OUT + '/indice.json', encoding='utf-8'))}
d = pymupdf.open('C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/TEMA 11 DERECHO ADEMINISTRATIVO-08-08-2026.pdf'); DPI = 130; K = DPI / 72
H = json.loads(subprocess.run(['node', '-e', "global.window={};require('" + B + "expres/t" + T + ".js');process.stdout.write(JSON.stringify(window.EXPRES_T[" + T + "].html))"], capture_output=True, text=True, encoding='utf-8').stdout)
def norm(w): return re.sub(r'[^a-z0-9]', '', w.lower().translate(str.maketrans('áéíóúüñ', 'aeiouun')))
def numeros(t):
    s = re.sub(r'^Art[íi]culos?\s+', '', t, flags=re.I).split('—')[0]; o = set()
    for m in re.finditer(r'(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)', s, re.I): o |= set(range(int(m[1]), int(m[2]) + 1))
    for m in re.finditer(r'\d+', re.sub(r'(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)', '', s, flags=re.I)): o.add(int(m[0]))
    return sorted(o)
exp = {}; nums_ = {}; cur = None; ix = -1
for f in re.split(r'(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)', H):
    t = re.sub(r'<[^>]+>', '', (re.search(r'(?:ex-fh|bloque-titulo)">(.*?)</div>', f) or [None, ''])[1])
    if re.match(r'^ANEXO', t): break
    k = next((j for j, i in enumerate(inst) if j > ix and i.get('inicio') and re.search(i['inicio'], t)), None)
    if k is not None: ix = k; cur = inst[k]['id']
    if f.startswith('<div class="ex-ficha') and cur and re.match(r'^Art[íi]culos?\s+\d', t) and len(numeros(t)) == 1:
        pid = f'{cur}-{numeros(t)[0]}'
        for x in re.finditer(r'<p\b[^>]*>(.*?)</p>', f, flags=re.S):
            s = html.unescape(re.sub(r'<[^>]+>', ' ', re.sub(r'<span class="ex-sello[^>]*>.*?</span>', ' ', x[1], flags=re.S)))
            ws = [norm(w) for w in s.split() if norm(w)]; exp.setdefault(pid, set()).update(zip(ws, ws[1:]))
            m = re.match(r'\s*(?:\(…\)\s*)?(\d+)\.\s', s)
            if m: nums_.setdefault(pid, set()).add(int(m[1]))
src = open(B + 'prompts/herramientas/expres-subrayado-recortes.py', encoding='utf-8').read(); ns = {'d': d, 're': re, 'pymupdf': pymupdf, 'DPI': DPI, 'K': K}
for fn in ('es_art', 'encabezados', 'segmentos'):
    m = re.search(r'^def ' + fn + r'\(.*?(?=^def |^res = )', src, flags=re.S | re.M); exec(m.group(0), ns)
out = {}; info = []
for ley in cfg['leyes']:
    a, b = ley['paginas']; H2 = ns['encabezados'](a, b)
    for n in ley['arts']:
        pid = f"{ley['id']}-{n}"
        if pid not in ids or pid not in exp: continue
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is None: continue
        segs = ns['segmentos'](H2, k, b); L = []; off = 0
        for pn, y0, y1 in segs:
            Ws = [w for w in d[pn].get_text('words') if y0 <= (w[1] + w[3]) / 2 <= y1]; Ws.sort(key=lambda w: (w[1] + w[3]) / 2); grp = []; gs = []
            for w in Ws:
                if grp and abs((w[1] + w[3]) / 2 - (grp[-1][1] + grp[-1][3]) / 2) > 4: gs.append(grp); grp = []
                grp.append(w)
            if grp: gs.append(grp)
            for g in gs:
                g.sort(key=lambda w: w[0]); L.append((off + (min(w[1] for w in g) - y0) * K, off + (max(w[3] for w in g) - y0) * K, [norm(w[4]) for w in g if norm(w[4])], ''.join(w[4] for w in g)))
            off += int(round((y1 - y0) * K))
        tot = ind[pid]['wh'][1]
        keep = []
        for (ya, yb, ws, raw) in L:
            bg = set(zip(ws, ws[1:])); keep.append(len(bg & exp[pid]) >= 1)
        # huecos de una línea entre líneas que se quedan: se rellenan (el OCR falla justo en las anotadas)
        for i in range(1, len(keep) - 1):
            if not keep[i] and keep[i - 1] and keep[i + 1]: keep[i] = True
        # cabecera: primera línea (y la segunda si el título ocupa dos, en mayúsculas)
        if L:
            keep[0] = True
            if len(L) > 1:
                up = sum(1 for c in L[1][3] if c.isupper()); le = sum(1 for c in L[1][3] if c.isalpha())
                if le and up / le > 0.6: keep[1] = True
        runs = []
        for i, kp in enumerate(keep):
            if kp:
                y0_, y1_ = max(0, int(L[i][0]) - 4), min(tot, int(L[i][1]) + 4)
                if runs and y0_ - runs[-1][1] <= 14: runs[-1][1] = max(runs[-1][1], y1_)
                else: runs.append([y0_, y1_])
        kept = sum(y1_ - y0_ for y0_, y1_ in runs); frac = kept / max(1, tot)
        out[pid] = {'ap': sorted(nums_.get(pid, [])), 'rangos': runs}; info.append((pid, round(frac * 100), len(runs)))
json.dump(out, open(B + f'prompts/herramientas/_tmp/propuesta-t{T}.json', 'w'))
print(' '.join(f'{p}:{f}%/{r}t' for p, f, r in info))
