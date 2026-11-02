# Eurodac 2024/1358 en el PDF PARTE 2 (págs. 98-149 = articulado): elige las páginas subrayadas por el usuario y enlaza cada pregunta con la página que contiene su cita.
# Uso: py -I piezas-eurodac.py <PARTE2.pdf> <subrayado-parte2.json> <preguntas_eur.json> <salida.json>
import sys, json, re, unicodedata, pymupdf
pdf, sub, qj, out = sys.argv[1:5]
d = pymupdf.open(pdf); S = {p['pagina']: p['palabras'] for p in json.load(open(sub, encoding='utf8'))}
Q = json.load(open(qj, encoding='utf8'))
def norm(t): return re.findall(r'[a-z0-9]+', unicodedata.normalize('NFD', t.lower()).encode('ascii', 'ignore').decode())
PG = {}
for n in range(98, 150):
    w = S.get(n, []); c = sum(1 for x in w if x[1] or x[4]) / max(1, len(w))
    PG[n] = {'col': c, 'pal': set(norm(d[n - 1].get_text()) + [norm(x[0])[0] for x in w if norm(x[0])]), 'qs': []}
for q in Q:
    qw = [x for x in norm(q['t']) if len(x) > 3]
    if len(qw) < 4: continue
    best = max(PG, key=lambda n: sum(1 for x in qw if x in PG[n]['pal']) / len(qw))
    sc = sum(1 for x in qw if x in PG[best]['pal']) / len(qw)
    if sc >= 0.6: PG[best]['qs'].append(q['id'])
piezas = []
for n in sorted(PG):
    if PG[n]['col'] >= 0.08 or PG[n]['qs']:
        piezas.append(['e-%d' % n, 'eur', n, [0.03, 1], [], PG[n]['qs']])
json.dump(piezas, open(out, 'w', encoding='utf8'))
print(len(piezas), 'páginas;', sum(len(p[5]) for p in piezas), 'preguntas enlazadas de', len(Q))
