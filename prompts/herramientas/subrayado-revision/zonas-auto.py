# Busca los cuadros impresos tipo «ÓRGANO | CONOCIMIENTO» (cabecera verde/gris del PDF) en cada pieza y los apunta en tN-zonas.json para que la propuesta línea a línea los ignore.
# Uso: TEMA=8 py zonas-auto.py   (no pisa entradas ya existentes)
import os, re, sys, json
T = os.environ.get('TEMA', '11'); B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
src = open(B + 'prompts/herramientas/subrayado-revision/propuesta-lineas.py', encoding='utf-8').read()
ns = {'__name__': 'aud', '__file__': B + 'prompts/herramientas/subrayado-revision/propuesta-lineas.py'}
sys.argv = ['x']; os.environ['TEMA'] = T
exec(src[:src.index('def propone(')], ns)
zp = B + f'expres-subrayado/t{T}-zonas.json'; Z = json.load(open(zp, encoding='utf-8')) if os.path.exists(zp) else {}
ns['ZON'].clear(); ns['COLA'].clear()
def norm(s): return re.sub(r'[^A-Z]', '', s.upper().replace('Ó', 'O'))
for pid in ns['segs']:
    if pid in Z: continue
    L = ns['lineas'](pid); H = ns['ind'][pid]['wh'][1]; zs = []
    for i, l in enumerate(L):
        if norm(l[2]) in ('ORGANO', 'ORGANOCONOCIMIENTO', 'CONOCIMIENTO') or re.match(r'^\W*[ÓO]RGANO\W+CONOCIMIENTO', l[2].upper()):
            fin = H
            for l2 in L[i + 1:]:
                if re.match(r'^\W*(NUEVO\s*)?ART.{0,3}CULO\s*\d', l2[2].upper()) or 'DERECHOS RESERVADOS' in l2[2].upper(): fin = l2[0] - 4; break
            zs.append([round(l[0] - 6), round(fin)])
    if zs: Z[pid] = zs; print(pid, zs)
open(zp, 'w', encoding='utf-8').write(json.dumps(Z, ensure_ascii=False) + '\n')
