# Numera las líneas de texto de la foto de una pieza (por la tinta negra de la propia imagen, sin depender del OCR) para elegir recortes sin medir píxeles.
# Uso: TEMA=6 py lineas-img.py id [y0 y1]         -> SCRATCH/ln-<T>-<id>[-<y0>].png con cada línea numerada (la lista también sale por pantalla: n y0-y1)
#      TEMA=6 py lineas-img.py id sel "0-2,5,8-9"  -> escribe en tN-img-recorte.json los rangos de esas líneas (cabecera = línea 0 si la pides; `ap` se deja como estaba)
import os, sys, json
import numpy as np
from PIL import Image, ImageDraw
T = os.environ.get('TEMA', '11'); B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; S = os.environ.get('SCRATCH', 'C:/Users/ruben/AppData/Local/Temp/')
pid = sys.argv[1]
im = Image.open(B + f'expres-subrayado/img/t{T}/{pid}.jpg').convert('RGB'); a = np.asarray(im).astype(int).max(axis=2); H = a.shape[0]
X0, X1 = 150, 960
tinta = (a[:, X0:X1] < 110).sum(axis=1) >= 6
L = []; y = 0
while y < H:
    if tinta[y]:
        j = y
        while j < H and (tinta[j] or (j + 1 < H and tinta[j + 1])): j += 1
        if j - y >= 8: L.append([y, j])
        y = j
    else: y += 1
if len(sys.argv) > 3 and sys.argv[2] == 'sel':
    p = B + f'expres-subrayado/t{T}-img-recorte.json'; R = json.load(open(p, encoding='utf-8'))
    rg = []
    for t in sys.argv[3].split(','):
        x, _, z = t.partition('-'); x = int(x); z = int(z) if z else x
        rg.append([max(0, L[x][0] - 3), min(H, L[z][1] + 3)])
    m = []
    for r in rg:
        if m and r[0] <= m[-1][1] + 6: m[-1][1] = max(m[-1][1], r[1])
        else: m.append(r)
    R.setdefault(pid, {'ap': [], 'rangos': []})['rangos'] = m
    open(p, 'w', encoding='utf-8').write('{\n' + ',\n'.join('"%s":%s' % (k, json.dumps(v, separators=(',', ':'), ensure_ascii=False)) for k, v in R.items()) + '\n}\n')
    rp = B + f'expres-subrayado/revision-t{T}.js'; s = open(rp, encoding='utf-8').read()
    import re
    t_ = json.loads(re.search(r'"todos": ?(\[[^\]]*\])', s).group(1))
    if pid not in t_: t_.append(pid)
    s = re.sub(r'"todos": ?\[[^\]]*\]', '"todos": ' + json.dumps(t_), s); s = re.sub(r'"hechos": ?\[[^\]]*\]', '"hechos": ' + json.dumps(t_), s); open(rp, 'w', encoding='utf-8').write(s)
    print(pid, m); sys.exit()
y0 = int(sys.argv[2]) if len(sys.argv) > 2 else 0; y1 = int(sys.argv[3]) if len(sys.argv) > 3 else H
c = im.crop((0, y0, im.width, min(H, y1))); d = ImageDraw.Draw(c)
for n, (p, q) in enumerate(L):
    if q < y0 or p > y1: continue
    d.rectangle([X0 - 12, p - y0, X0 - 6, q - y0], fill=(255, 0, 0)); d.text((X0 - 44, p - y0 - 1), str(n), fill=(255, 0, 0))
c.save(S + f'ln-{T}-{pid}-{y0}.png'); print(len(L), 'líneas;', ' '.join(f'{n}:{p}-{q}' for n, (p, q) in enumerate(L) if q >= y0 and p <= y1))
