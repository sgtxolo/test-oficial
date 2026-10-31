# Quita de tN-img-recorte.json los últimos rangos cuyo texto (OCR) es solo MAYÚSCULAS (títulos de capítulo/sección del artículo siguiente que se cuelan al final).
# Uso: TEMA=3 py quitar-titulos-finales.py   (luego reconstruir.sh)
import os, re, sys, json
T = os.environ.get('TEMA', '11'); B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
src = open(B + 'prompts/herramientas/subrayado-revision/propuesta-lineas.py', encoding='utf-8').read()
ns = {'__name__': 'aud', '__file__': B + 'prompts/herramientas/subrayado-revision/propuesta-lineas.py'}
sys.argv = ['x']; os.environ['TEMA'] = T
exec(src[:src.index('def propone(')], ns)
rp = B + f'expres-subrayado/t{T}-img-recorte.json'; R = json.load(open(rp, encoding='utf-8'))
def mayus(s):
    l = re.sub(r'[^A-Za-zÁÉÍÓÚÑáéíóúñ]', '', s)
    return len(l) >= 4 and sum(c.islower() for c in l) / len(l) < .15
for pid, v in R.items():
    if pid not in ns['segs']: continue
    L = ns['lineas'](pid); rg = v['rangos']; cambio = False
    while len(rg) > 1:
        a, b = rg[-1]; ls = [l for l in L if a <= (l[0] + l[1]) / 2 <= b]
        if ls and all(mayus(l[2]) for l in ls): rg.pop(); cambio = True
        else: break
    if cambio: print('título final quitado:', pid, rg[-1])
json.dump(R, open(rp, 'w', encoding='utf-8'), ensure_ascii=False)
open(rp, 'w', encoding='utf-8').write('{\n' + ',\n'.join('"%s":%s' % (k, json.dumps(x, separators=(',', ':'), ensure_ascii=False)) for k, x in R.items()) + '\n}\n')
