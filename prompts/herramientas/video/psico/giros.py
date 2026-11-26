import json, numpy as np
from PIL import Image
ops = {1:'VV A90 VV A45',2:'HV VV C45',3:'C45 C90 VV A90',4:'HV C45 A90 VV',5:'A90 C45 C90',6:'A90 HV A45 VV',7:'C45 A90 C45',8:'VV C90 VV A90',9:'HV A90 VV HV',10:'VV A45 HV C45',
       70:'C45 VV A90 HV',71:'HV C90 VV C90',72:'VV A90 VV A45',73:'VV C90 HV A45',74:'C90 HV C45 VV',75:'HV A45 HV',76:'C90 HV A45 VV'}
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
def norm(mask):
    ys, xs = np.nonzero(mask)
    if len(ys) == 0: return np.zeros((160, 160), bool)
    c = Image.fromarray((mask[ys.min():ys.max()+1, xs.min():xs.max()+1] * 255).astype(np.uint8))
    k = 150 / max(c.size)
    c = c.resize((max(1, round(c.width*k)), max(1, round(c.height*k))), Image.BILINEAR)
    o = Image.new('L', (160, 160), 0); o.paste(c, ((160-c.width)//2, (160-c.height)//2))
    return np.array(o) > 110
def aplica(im, op):
    if op == 'HV': return im.transpose(Image.FLIP_LEFT_RIGHT)
    if op == 'VV': return im.transpose(Image.FLIP_TOP_BOTTOM)
    a = {'C90': -90, 'A90': 90, 'C45': -45, 'A45': 45}[op]
    return im.rotate(a, resample=Image.BICUBIC, expand=True, fillcolor=0)
res = {}
for n, s in ops.items():
    g = np.array(Image.open(f'ps/q{n}.jpg').convert('L')); m = g < 110
    rows = runs(g < 160, 0, 250)
    top, bot = rows[0], rows[-1]
    sub = m[top:bot+1, :]
    cols = runs(g[top:bot+1, :] < 160, 1, int((bot-top)*0.85))
    xs = []
    for c in cols:
        if not xs or c - xs[-1] > 6: xs.append(c)
    L, D, R = xs[0], xs[1], xs[-1]
    ref = m[top+6:bot-5, L+6:D-5]
    h = bot - top
    zona = m[top+int(h*0.22):bot-5, D+6:R-5]
    w = zona.shape[1] / 4
    opts = [zona[:, int(i*w):int((i+1)*w)] for i in range(4)]
    ys, xx = np.nonzero(ref)
    im = Image.fromarray((ref[ys.min():ys.max()+1, xx.min():xx.max()+1]*255).astype(np.uint8))
    im = im.resize((im.width*5, im.height*5), Image.BICUBIC)
    for op in s.split(): im = aplica(im, op)
    t = norm(np.array(im) > 128)
    sc = []
    for o in opts:
        b = norm(o); best = 0
        for dy in (-3, -1, 0, 1, 3):
            for dx in (-3, -1, 0, 1, 3):
                r = np.roll(np.roll(b, dy, 0), dx, 1)
                best = max(best, (t & r).sum() / max(1, (t | r).sum()))
        sc.append(round(float(best), 3))
    i = int(np.argmax(sc)); s2 = sorted(sc)[-2]
    res[n] = 'ABCD'[i]
    print(n, 'ABCD'[i], sc, 'margen', round(sc[i]-s2, 3))
    prev = Image.new('L', (160*5+40, 160), 128)
    prev.paste(Image.fromarray((t*255).astype(np.uint8)), (0, 0))
    for j, o in enumerate(opts): prev.paste(Image.fromarray((norm(o)*255).astype(np.uint8)), (200+j*165, 0))
    prev.save(f'g{n}.png')
json.dump(res, open('sol-giros.json', 'w'))
