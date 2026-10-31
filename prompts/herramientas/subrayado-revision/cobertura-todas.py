# Cobertura de palabras Exprés / foto en TODAS las piezas sin recorte (también fichas de varios artículos y piezas a mano).
# Uso: TEMA=1 py cobertura-todas.py [umbral=0.6]   -> lista de piezas por debajo del umbral (candidatas a recorte a mano)
import os, sys, re, json, subprocess, pymupdf
T = os.environ.get('TEMA', '11'); U = float(sys.argv[1]) if len(sys.argv) > 1 else 0.6
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
PDF = {'1': 'TEMA 1 DERECHOS HUMANOS-08-08-2026.pdf', '3': 'TEMA 3 TRATADOS DE LA UNION EUROPEA-08-08-2026.pdf', '9': 'TEMA 9 DERECHO CIVIL-08-08-2026.pdf', '12': 'TEMA 12 - GOBIERNO Y ADMINISTRACION-2026-08-08.pdf', '7': 'TEMA 7 CONTITUCION ESPAÑOLA-08-08-2026.pdf', '11': 'TEMA 11 DERECHO ADEMINISTRATIVO-08-08-2026.pdf'}
d = pymupdf.open('C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/' + PDF[T]); DPI = 130; K = DPI / 72
cfg = json.load(open(B + f'expres-subrayado/t{T}-config.json', encoding='utf-8'))
ind = {e['id']: e for e in json.load(open(B + f'expres-subrayado/img/t{T}/indice.json', encoding='utf-8'))}
EX = json.loads(subprocess.run(['node', 'prompts/herramientas/subrayado-revision/texto-pieza.js', '--json'], capture_output=True, text=True, encoding='utf-8', env={**os.environ, 'TEMA': T}, cwd=B).stdout)
src = open(B + 'prompts/herramientas/expres-subrayado-recortes.py', encoding='utf-8').read(); ns = {'d': d, 're': re, 'pymupdf': pymupdf, 'DPI': DPI, 'K': K}
for fn in ('es_art', 'encabezados', 'segmentos', 'marcadores'):
    m = re.search(r'^def ' + fn + r'\(.*?(?=^def |^res = )', src, flags=re.S | re.M); exec(m.group(0), ns)
def norm(w): return re.sub(r'[^a-z0-9]', '', w.lower().translate(str.maketrans('áéíóúüñ', 'aeiouun')))
segs = {}
for ley in cfg['leyes']:
    a, b = ley['paginas']; H2 = ns['encabezados'](a, b)
    for n in ley['arts']:
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is not None: segs[f"{ley['id']}-{n}"] = ns['segmentos'](H2, k, b)
for m in cfg.get('manual', []):
    segs[m['id']] = [(p, d[p].rect.height * f0, d[p].rect.height * f1) for p, f0, f1 in m['piezas']]
res = []
for pid, e in ind.items():
    if e.get('imgr') or pid not in EX or pid not in segs: continue
    ex = set(norm(w) for p in EX[pid] for w in re.split(r'\s+', p) if len(norm(w)) >= 5)
    ph = set()
    for pn, y0, y1 in segs[pid]:
        for w in d[pn].get_text('words'):
            if y0 <= (w[1] + w[3]) / 2 <= y1 and len(norm(w[4])) >= 5: ph.add(norm(w[4]))
    if len(ph) >= 12: res.append((len(ex & ph) / len(ph), pid, e['wh'][1]))
res.sort(); low = [r for r in res if r[0] < U]
print(len(res), 'piezas sin recorte comprobadas;', len(low), f'con cobertura < {round(U*100)} %; altura total', sum(r[2] for r in low))
print(' '.join(f'{p}({round(c*100)}%,{h})' for c, p, h in low))
open(B + 'prompts/herramientas/subrayado-revision/sinrec_low.txt', 'w').write(','.join(p for _, p, _ in low))
