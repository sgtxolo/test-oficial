# Lee los subrayados a mano del PDF escaneado del temario (OCR con cajas por palabra):
# para cada palabra devuelve [texto, color_fosforito, fraccion, bbox, trazo_rojo, caja_azul].
# Uso: py subrayado-pdf.py <pdf> <salida.json> [pag_inicio pag_fin]
import sys, json
import numpy as np, pymupdf
DPI = 150
K = DPI / 72
NOM = ['rosa', 'naranja', 'amarillo', 'verde', 'cian', 'azul', 'lila']
def hsv(im):
    mx = im.max(2); mn = im.min(2); dl = mx - mn
    s = np.where(mx > 0, dl / np.maximum(mx, 1e-6), 0)
    r, g, b = im[..., 0], im[..., 1], im[..., 2]
    h = np.zeros_like(mx); m = dl > 1e-6
    rc = m & (mx == r); gc = m & (mx == g) & ~rc; bc = m & ~rc & ~gc
    h[rc] = (60 * ((g - b)[rc] / dl[rc])) % 360
    h[gc] = 60 * ((b - r)[gc] / dl[gc]) + 120
    h[bc] = 60 * ((r - g)[bc] / dl[bc]) + 240
    return h, s, mx
def clases(h, s, v):
    c = np.full(h.shape, -1, np.int8)
    ok = (s >= 0.13) & (v >= 0.55)
    def put(i, cond): c[ok & cond & (c < 0)] = i
    put(0, (h < 14) | (h >= 335))          # rosa / rojo claro
    put(1, h < 38); put(2, h < 75); put(3, h < 165); put(4, h < 205); put(5, h < 255); put(6, h < 335)
    return c
def procesa(pdf, out, a=None, b=None):
    d = pymupdf.open(pdf); res = []
    for pn in range(a or 0, b or len(d)):
        p = d[pn]; pm = p.get_pixmap(dpi=DPI)
        im = np.frombuffer(pm.samples, np.uint8).reshape(pm.h, pm.w, pm.n)[:, :, :3].astype(float) / 255
        h, s, v = hsv(im); C = clases(h, s, v)
        r, g, bl = im[..., 0], im[..., 1], im[..., 2]
        rojo = (r > .6) & (g < .32) & (bl < .32)
        azul = (im.max(2) < .70) & (bl > r + .09) & (bl > g + .09)
        pal = []
        for w in p.get_text('words'):
            x0, y0, x1, y1, t = w[:5]
            X0, X1 = max(0, int(x0 * K)), min(pm.w, int(x1 * K) + 1); Y0, Y1 = int(y0 * K), int(y1 * K) + 1
            al = max(1, Y1 - Y0); col = None; fr = 0.0
            ya, yb = Y0 + int(al * .25), Y0 + int(al * .85)
            if X1 > X0 and yb > ya:
                sc = C[ya:yb, X0:X1]; tinta = v[ya:yb, X0:X1] < .45
                tot = max(1, sc.size - int(tinta.sum()))
                cnt = np.bincount(sc[sc >= 0].ravel(), minlength=7)
                if cnt.sum():
                    i = int(cnt.argmax()); fr = cnt[i] / tot
                    if fr >= .30: col = NOM[i]
            def cob(mask, y_a, y_b):
                y_a, y_b = max(0, y_a), min(pm.h, y_b)
                if X1 <= X0 or y_b <= y_a: return 0
                return float(mask[y_a:y_b, X0:X1].any(0).mean())
            ru = cob(rojo, Y1 - int(al * .30), Y1 + int(al * .40)) > .55
            caja = cob(azul, Y0 - int(al * .30), Y0 + int(al * .20)) > .5 and cob(azul, Y1 - int(al * .20), Y1 + int(al * .30)) > .5
            circ = (not caja) and cob(rojo, Y0 - int(al * .30), Y0 + int(al * .20)) > .35 and cob(rojo, Y1 - int(al * .20), Y1 + int(al * .30)) > .35
            forma = 'caja' if caja else ('circulo' if circ else None)
            if circ: ru = False
            pal.append([t, col, round(float(fr), 2), [round(x0, 1), round(y0, 1), round(x1, 1), round(y1, 1)], bool(ru), forma])
        res.append({'pagina': pn + 1, 'palabras': pal})
        print('pag', pn + 1, file=sys.stderr)
    json.dump(res, open(out, 'w', encoding='utf8'), ensure_ascii=False)
if __name__ == '__main__':
    a = sys.argv
    procesa(a[1], a[2], int(a[3]) - 1 if len(a) > 3 else None, int(a[4]) if len(a) > 4 else None)
