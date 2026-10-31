# Auditoría: ¿el recorte «-r» de cada artículo lleva lo mismo que el Exprés?
# Uso: py expres-subrayado-auditoria.py <pdf> <tema>
# Para cada pieza compara las palabras del texto OCR del PDF dentro de las franjas del recorte con las palabras del Exprés de ese artículo:
#   falta  = % de palabras del Exprés que no están en el recorte (algo que debería estar y no sale)
#   sobra  = palabras «con sentido» (del vocabulario del Exprés del tema) que salen en el recorte y el Exprés de ese artículo no tiene
# El OCR de las zonas con anotaciones es malo: sirve para ordenar y revisar a ojo, no como prueba. Escribe expres-subrayado/t<N>-auditoria.json.
import sys, re, json, subprocess, html
import pymupdf
pdf, T = sys.argv[1], sys.argv[2]
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT = B + f'expres-subrayado/img/t{T}'
cfg = json.load(open(B + f'expres-subrayado/t{T}-config.json', encoding='utf-8'))
inst = json.load(open(B + f'expres-subrayado/t{T}-instrumentos.json', encoding='utf-8'))
indice = {e['id']: e for e in json.load(open(OUT + '/indice.json', encoding='utf-8'))}
bloq = json.load(open(B + f'expres-subrayado/t{T}-bloques.json', encoding='utf-8'))
d = pymupdf.open(pdf); DPI = 130; K = DPI / 72
H = json.loads(subprocess.run(['node', '-e', f"global.window={{}};require('{B}expres/t{T}.js');process.stdout.write(JSON.stringify(window.EXPRES_T[{T}].html))"], capture_output=True, text=True, encoding='utf-8').stdout)
def norm(w): return re.sub(r'[^a-z0-9]', '', w.lower().translate(str.maketrans('áéíóúüñ', 'aeiouun')))
def palabras(t): return [norm(w) for w in re.split(r'\s+', t) if len(norm(w)) >= 5]
def numeros(t):
    s = re.sub(r'^Art[íi]culos?\s+', '', t, flags=re.I).split('—')[0]; out = set()
    for m in re.finditer(r'(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)', s, re.I): out |= set(range(int(m[1]), int(m[2]) + 1))
    for m in re.finditer(r'\d+', re.sub(r'(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)', '', s, flags=re.I)): out.add(int(m[0]))
    return sorted(out)
exp = {}; vocab = set(); cur = None; ix = -1
for f in re.split(r'(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)', H):
    t = re.sub(r'<[^>]+>', '', (re.search(r'(?:ex-fh|bloque-titulo)">(.*?)</div>', f) or [None, ''])[1])
    if re.match(r'^ANEXO', t): break
    k = next((j for j, i in enumerate(inst) if j > ix and i.get('inicio') and re.search(i['inicio'], t)), None)
    if k is not None: ix = k; cur = inst[k]['id']
    ps = re.findall(r'<p\b[^>]*>(.*?)</p>', f, flags=re.S); tx = ' '.join(html.unescape(re.sub(r'<[^>]+>', ' ', re.sub(r'<span class="ex-sello[^>]*>.*?</span>', ' ', p, flags=re.S))) for p in ps)
    vocab |= set(palabras(tx))
    if f.startswith('<div class="ex-ficha') and cur and re.match(r'^Art[íi]culos?\s+\d', t) and len(numeros(t)) == 1:
        exp.setdefault(f'{cur}-{numeros(t)[0]}', set()).update(palabras(tx))
src = open(B + 'prompts/herramientas/expres-subrayado-recortes.py', encoding='utf-8').read()
ns = {'d': d, 're': re, 'pymupdf': pymupdf, 'DPI': DPI, 'K': K}
for fn in ('es_art', 'encabezados', 'segmentos'):
    m = re.search(r'^def ' + fn + r'\(.*?(?=^def |^res = )', src, flags=re.S | re.M); exec(m.group(0), ns)
res = {}
for ley in cfg['leyes']:
    a, b = ley['paginas']; H2 = ns['encabezados'](a, b)
    for n in ley['arts']:
        pid = f"{ley['id']}-{n}"; e = indice.get(pid)
        if not e or not e.get('imgr') or pid not in exp or pid not in bloq: continue
        k = next((i for i, h in enumerate(H2) if h[0] == n), None)
        if k is None: continue
        segs = ns['segmentos'](H2, k, b); offs = []; o = 0
        for pn, y0, y1 in segs: offs.append(o); o += int(round((y1 - y0) * K))
        dentro = set(); fuera = set()
        keep = [(x[0], x[1]) for x in bloq[pid] if x[3]]
        for si, (pn, y0, y1) in enumerate(segs):
            for w in d[pn].get_text('words'):
                cy = (w[1] + w[3]) / 2
                if not (y0 <= cy <= y1): continue
                py = offs[si] + (cy - y0) * K; nw = norm(w[4])
                if len(nw) < 5: continue
                (dentro if any(a_ - 2 <= py <= b_ + 2 for a_, b_ in keep) else fuera).add(nw)
        E = exp[pid]; falta = [w for w in E if w not in dentro]
        sobra = [w for w in dentro if w in vocab and w not in E]
        res[pid] = {'exp': len(E), 'falta': round(100 * len(falta) / max(1, len(E))), 'sobra': len(sobra), 'ej_sobra': sorted(sobra)[:6], 'ej_falta': sorted(falta)[:6]}
json.dump(res, open(B + f'expres-subrayado/t{T}-auditoria.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
mal = sorted(((v['falta'] + 3 * v['sobra'], k) for k, v in res.items()), reverse=True)
print(len(res), 'piezas auditadas;', sum(1 for v in res.values() if v['falta'] <= 25 and v['sobra'] <= 2), 'sin avisos (falta<=25 %, sobra<=2)')
for sc, k in mal[:40]: print(k, res[k])
