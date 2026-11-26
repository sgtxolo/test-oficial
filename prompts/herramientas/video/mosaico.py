# py mosaico.py v03 : un recorte por número de pregunta, en mosaicos de 10 (2x5) para leer a ojo
import json, re, sys
from PIL import Image
v = sys.argv[1]
j = json.load(open(v + '.json', encoding='utf-8-sig'))
best = {}
for k in sorted(j):
    w = j[k] or []
    if isinstance(w, dict): w = [w]
    for i, o in enumerate(w):
        if re.match(r'(?i)^(PREGUNTA|n[úu]mero)$', o['t']) and o['x'] < 120:
            nx = [p for p in w if abs(p['y'] - o['y']) < 14 and o['x'] < p['x'] < o['x'] + 160 and p['t'].isdigit()]
            if not nx: continue
            n = int(nx[0]['t']); y = o['y']
            if 90 < y < 640:
                # se prefiere el fotograma con el botón "Seleccione" visible y la pregunta quieta (el último)
                best[n] = (k, y)
nums = sorted(best); print('numeros', len(nums), 'faltan', [i for i in range(1, max(nums) + 1) if i not in best])
for b in range(0, len(nums), 10):
    o = Image.new('RGB', (1640, 1230), 'red')
    for i, n in enumerate(nums[b:b + 10]):
        k, y = best[n]
        im = Image.open(f'f/{v}/p{k}.png').crop((20, int(y) - 22, 1100, int(y) + 298)).resize((810, 240), Image.LANCZOS)
        o.paste(im, ((i % 2) * 825, (i // 2) * 247))
    o.save(f'm-{v}-{b // 10:02d}.jpg', quality=88)
print((len(nums) + 9) // 10)
