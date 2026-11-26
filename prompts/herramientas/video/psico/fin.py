import numpy as np, glob, os
from PIL import Image, ImageDraw, ImageChops
def lineas(g, axis, m):
    d = g < 170
    if axis == 1: d = d.T
    out = []
    for i, l in enumerate(d):
        best = cur = 0
        for v in l:
            cur = cur + 1 if v else 0; best = max(best, cur)
        if best >= m: out.append(i)
    return out
def trim(im):
    a = np.array(im.convert('L')) < 235; ys, xs = np.nonzero(a)
    return im.crop((max(0, xs.min() - 12), max(0, ys.min() - 10), min(im.width, xs.max() + 13), min(im.height, ys.max() + 11)))
rot = set(range(1, 11)) | set(range(70, 77))
for n in range(1, 96):
    im = Image.open(f'ps/q{n}.jpg').convert('RGB')
    if n == 19: im.paste(im.crop((492, 151, 512, 176)), (742, 151))
    g = np.array(im.convert('L')); d = ImageDraw.Draw(im)
    rows = lineas(g, 0, 400); top, bot = rows[0], rows[-1]
    cols = lineas(g[top:bot + 1], 1, int((bot - top) * 0.85)); R = cols[-1]
    d.rectangle((R + 4, top - 4, im.width, im.height), fill='white')
    if n not in rot and bot + 4 < im.height - 1: d.rectangle((0, bot + 4, im.width, im.height), fill='white')
    elif bot + 4 < im.height - 1:
        d.rectangle((0, bot + 4, cols[0] - 30, im.height), fill='white')
    print(n, top, bot, cols[0], R, end='; ')
    trim(im).save(f'fin/{n}.jpg', quality=90)
def firma(p):
    im = Image.open(p).convert('L'); a = np.array(im) < 200
    h = a.shape[0]; skip = int(h * 0.0)
    im = trim(im.convert('RGB')).convert('L').resize((192, 64), Image.BILINEAR)
    v = np.array(im).astype(float).ravel(); v -= v.mean(); return v / (np.linalg.norm(v) + 1e-9)
base = 'C:/Users/ruben/Desktop/HTML OFICIAL/psicotecnicos/'
ex = [p for p in glob.glob(base + 'ps-*.jpg') if not p.endswith('-e.jpg')]
E = np.stack([firma(p) for p in ex]); N = np.stack([firma(f'fin/{n}.jpg') for n in range(1, 96)])
S = N @ E.T; M = N @ N.T
print()
print('existentes', len(ex))
for i in range(95):
    j = int(S[i].argmax())
    if S[i, j] > 0.9: print('vs banco', i + 1, os.path.basename(ex[j]), round(float(S[i, j]), 3))
for i in range(95):
    for k in range(i + 1, 95):
        if M[i, k] > 0.97: print('dentro', i + 1, k + 1, round(float(M[i, k]), 3))
