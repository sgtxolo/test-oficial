# -*- coding: utf-8 -*-
import json, sys, re
sp = sys.argv[1]
F = 'test-oficial-conocimiento.html'
raw = open(F, 'rb').read()
bom = raw.startswith(b'\xef\xbb\xbf')
s = raw.decode('utf-8-sig')
seed = json.load(open(sp + '/ia14.json', encoding='utf-8'))
assert len(seed) == 50 and len({q['id'] for q in seed}) == 50
if '"id":"14-ia-1"' in s:
    sys.exit('ya insertado')
bloque = '(function(){const seed=' + json.dumps(seed, ensure_ascii=False, separators=(',', ':')) + ';syncSeedIA(14,seed)})();'
ancla = 'syncSeedIA(13,seed)})();'
i = s.index(ancla) + len(ancla)
assert s.count(ancla) == 1
s = s[:i] + bloque + s[i:]
open(F, 'wb').write((b'\xef\xbb\xbf' if bom else b'') + s.encode('utf-8'))
print('insertado, bytes +', len(bloque.encode('utf-8')))
