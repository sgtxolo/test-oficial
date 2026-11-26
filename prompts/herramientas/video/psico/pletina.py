import json, numpy as np
from PIL import Image
Q = [11,12,13,14,15,16,17,18,19,20,21,22,36,37,38,39,40,41,42,43,44,45,46,47,84,85,86,87,88,94,95]
exec(open('giros.py', encoding='utf-8').read().split('def norm')[0].split('def runs')[0] if False else '')
def runs(m, axis, minlen):
    out = []
    n = m.shape[0] if axis == 0 else m.shape[1]
    for i in range(n):
        line = m[i, :] if axis == 0 else m[:, i]
        best = cur = 0
        for v in line:
            cur = cur + 1 if v else 0
            best = max(best, cur)
        if best >= minlen: out.append(i)
    return out
S = 13.36
OX = {'P': 41.4, 'A': 173.7, 'B': 298.7, 'C': 423.4, 'D': 548.4}
def disco(g, x, y, r):
    xs = np.arange(int(x - r) - 1, int(x + r) + 2); ys = np.arange(int(y - r) - 1, int(y + r) + 2)
    X, Y = np.meshgrid(xs, ys); m = (X - x) ** 2 + (Y - y) ** 2 <= r * r
    return g[Y[m], X[m]].mean()
VEC = [(1, 0), (0, 1), (1, 1), (1, -1)]
def anillo(g, x, y):
    return np.median([g[int(round(y + 4.0 * np.sin(t))), int(round(x + 4.0 * np.cos(t)))] for t in np.arange(0, 6.28, 0.39)])
def hueco(g, x, y):
    best = -999
    for ax in (-1, 0, 1):
        for ay in (-1, 0, 1):
            best = max(best, disco(g, x + ax, y + ay, 1.5) - anillo(g, x + ax, y + ay))
    return best
def lee(g, x0, y0, placa):
    dots = set(); links = set(); vals = []
    for i in range(6):
        for j in range(6):
            x, y = x0 + i * S, y0 + j * S
            if placa:
                if hueco(g, x, y) > 55: dots.add((i, j))
            elif disco(g, x, y, 3.0) < 135: dots.add((i, j))
    for (i, j) in dots:
        for dx, dy in VEC:
            k = (i + dx, j + dy)
            if k not in dots: continue
            xm, ym = x0 + (i + dx / 2) * S, y0 + (j + dy / 2) * S
            if all(disco(g, x0 + (i + dx * t) * S, y0 + (j + dy * t) * S, 1.3) < 140 for t in (0.38, 0.5, 0.62)): links.add(frozenset([(i, j), k]))
    return dots, links
def calibra(g, L, T, key, placa):
    best = None
    for dy in np.arange(-7, 7.1, 0.5):
        for dx in np.arange(-5, 5.1, 0.5):
            x0, y0 = L + OX[key] + dx, T + 64.5 + dy
            if placa: sc = sum(max(0, disco(g, x0 + i * S, y0 + j * S, 1.5) - anillo(g, x0 + i * S, y0 + j * S) - 30) for i in range(6) for j in range(6))
            else: sc = sum(max(0, 160 - disco(g, x0 + i * S, y0 + j * S, 5.0)) for i in range(6) for j in range(6))
            sc -= 0.5 * (abs(dx) + abs(dy))
            if best is None or sc > best[0]: best = (sc, x0, y0)
    return best[1], best[2]
res = {}
for n in Q:
    g = np.array(Image.open(f'ps/q{n}.jpg').convert('L')).astype(float)
    rows = runs(g < 160, 0, 400); top, bot = rows[0], rows[-1]
    cols = runs(g[top:bot + 1, :] < 160, 1, int((bot - top) * 0.85)); L = cols[0]
    dat = {}
    for k in 'PABCD':
        x0, y0 = calibra(g, L, top, k, k == 'P')
        dat[k] = lee(g, x0, y0, k == 'P') + ((round(x0 - L - OX[k], 1), round(y0 - top - 64, 1)),)
    PD, PL = dat['P'][0], dat['P'][1]
    tr = {'id': lambda x,y:(x,y), 'r90': lambda x,y:(5-y,x), 'r180': lambda x,y:(5-x,5-y), 'r270': lambda x,y:(y,5-x),
          'mh': lambda x,y:(5-x,y), 'mv': lambda x,y:(x,5-y), 't': lambda x,y:(y,x), 'at': lambda x,y:(5-y,5-x)}
    todo = []
    for nom, f in tr.items():
        for k in 'ABCD':
            D, Ln = dat[k][0], dat[k][1]
            md = {f(*p) for p in D}; ml = {frozenset(f(*p) for p in l) for l in Ln}
            todo.append((len(md - PD) + len(ml - PL), k, nom))
    todo.sort()
    res[n] = {'holes': len(PD), 'top': todo[:5], 'P': sorted(PD), 'PL': [sorted(l) for l in PL], 'op': {k: [sorted(dat[k][0]), [sorted(l) for l in dat[k][1]]] for k in 'ABCD'}}
    print(n, len(PD), todo[:5])
json.dump(res, open('sol-plet.json', 'w'))
