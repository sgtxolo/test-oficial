# -*- coding: utf-8 -*-
import re, sys, importlib.util, json
sp = sys.argv[1]
t = open(sp + '/of14.txt', encoding='utf-8').read()
n = lambda s: re.sub(r'\s+', ' ', s).strip().lower()
T = n(t)
src = open(sp + '/gen14.py', encoding='utf-8').read()
# extrae las citas ejecutando el módulo con un destino ficticio
spec = importlib.util.spec_from_file_location('g', sp + '/gen14.py')
sys.argv = ['x', sp + '/_tmp.json']
g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g)
mal = 0
for i, q in enumerate(g.Q):
    cita = q[6]
    if n(cita) not in T:
        mal += 1
        print('NO LITERAL', i + 1, q[1], '->', cita[:110])
print('citas no literales:', mal, 'de', len(g.Q))
