# Compara lo que lleva cada recorte (líneas del OCR dentro de los rangos de tN-img-recorte.json) con el texto del Exprés de la pieza.
# Uso: TEMA=3 py auditar-recortes.py [umbral_recall=0.85] [umbral_precision=0.7]  -> lista las piezas con poca cobertura (falta Exprés) o con sobras (hay texto que el Exprés no lleva)
import os, re, sys, json
T = os.environ.get('TEMA', '11'); B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
src = open(B + 'prompts/herramientas/subrayado-revision/propuesta-lineas.py', encoding='utf-8').read()
ns = {'__name__': 'aud', '__file__': B + 'prompts/herramientas/subrayado-revision/propuesta-lineas.py'}
sys.argv = ['x']; os.environ['TEMA'] = T
exec(src[:src.index('def propone(')], ns)
R = json.load(open(B + f'expres-subrayado/t{T}-img-recorte.json', encoding='utf-8'))
rc_min = float(sys.argv[1]) if len(sys.argv) > 1 else .85
def pal(s): return [w for w in (ns['norm'](x) for x in re.split(r'\W+', s.lower())) if len(w) >= 4]
res = []
for pid, v in R.items():
    if pid not in ns['EX'] or pid not in ns['segs']: continue
    ex = ' '.join(re.sub(r'🎯.*?preguntas?(?: más de este artículo)?', ' ', p).replace('(…)', ' ') for p in ns['EX'][pid])
    E = pal(ex); L = ns['lineas'](pid)
    kept = [l for l in L if any(a <= (l[0] + l[1]) / 2 <= b for a, b in v['rangos'])]
    K = pal(' '.join(l[2] for l in kept)); allw = pal(' '.join(l[2] for l in L))
    if not E or not K: continue
    from collections import Counter
    ce, ck, ca = Counter(E), Counter(K), Counter(allw)
    rec = sum(min(ce[w], ck[w]) for w in ce) / max(1, sum(min(ce[w], ca[w]) for w in ce))   # del Exprés que el OCR sí ve, cuánto queda dentro del recorte
    pre = sum(min(ck[w], ce[w]) for w in ck) / len(K)
    res.append((rec, pre, pid, round(sum(v['rangos'][i][1] - v['rangos'][i][0] for i in range(len(v['rangos']))))))
for rec, pre, pid, h in sorted(res):
    if rec < rc_min or pre < .5: print(f'{pid}: recall {rec:.2f} precisión {pre:.2f} alto {h}')
print(len(res), 'piezas comprobadas')
