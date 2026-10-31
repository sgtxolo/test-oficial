import json, sys, os
T = sys.argv[1]; S = os.environ['SCRATCH']; over = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
P = json.load(open(S + f'propuesta-t{T}.json', encoding='utf-8'))
rp = B + f'expres-subrayado/t{T}-img-recorte.json'
R = json.load(open(rp, encoding='utf-8')) if os.path.exists(rp) else {}
for k, v in P.items():
    if v['pct'] < 0.85 and len(v['rangos']) and k not in R: R[k] = {'ap': [], 'rangos': v['rangos']}
R.update(over)
for k in [k for k, v in R.items() if v is None]: R.pop(k)   # null = el artículo va entero
open(rp, 'w', encoding='utf-8').write('{\n' + ',\n'.join('"%s":%s' % (k, json.dumps(v, separators=(',', ':'), ensure_ascii=False)) for k, v in R.items()) + '\n}\n')
open(B + 'prompts/herramientas/subrayado-revision/ids.txt', 'w').write(','.join(R))
rev = B + f'expres-subrayado/revision-t{T}.js'
if os.path.exists(rev):
    s = open(rev, encoding='utf-8').read(); js = json.loads(s[s.index('=', s.index(']')) + 1:].rstrip().rstrip(';'))
else: js = {'todos': [], 'esq': [], 'tachado': [], 'fuera': [], 'hechos': []}
js['todos'] = list(R); js['hechos'] = list(R)
open(rev, 'w', encoding='utf-8').write('// Recortes del Exprés que se revisan a mano (el Exprés corta dentro de un apartado): todos = los que hay que revisar, hechos = ya revisados.\n(window.EXSUB_REV=window.EXSUB_REV||{})[%s]=%s;\n' % (T, json.dumps(js, ensure_ascii=False)))
print(len(R), 'recortes')
# apartados (1., 2.…) que lleva el Exprés de cada recorte: para saber si una pregunta que cita «apartado N» cabe en el recorte
import subprocess, re
EX = json.loads(subprocess.run(['node', 'prompts/herramientas/subrayado-revision/texto-pieza.js', '--json'], capture_output=True, text=True, encoding='utf-8', env={**os.environ, 'TEMA': T}, cwd=B).stdout)
for k, v in R.items():
    if v.get('ap'): continue
    ns_ = set()
    for p in EX.get(k, []):
        p = re.sub(r'\b(?:Art|art|P)\.\s*\d+(?:\s*bis)?\.', ' ', p)
        for m in re.finditer(r'(?:^|\s)(\d{1,2})\.\s+(?:\(…\)\s*)?[A-ZÁÉÍÓÚÑa-z(«]', p):
            if int(m.group(1)) <= 30: ns_.add(int(m.group(1)))
    v['ap'] = sorted(ns_)
open(rp, 'w', encoding='utf-8').write('{\n' + ',\n'.join('"%s":%s' % (k, json.dumps(v, separators=(',', ':'), ensure_ascii=False)) for k, v in R.items()) + '\n}\n')
print('apartados puestos')
