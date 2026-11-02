# Igual que subrayado-pdf.py (colores de fosforito, trazo rojo, cajas y círculos por palabra) pero con OCR de Windows sobre la página
# «limpia» (los fosforitos se pintan de blanco para que el motor lea también las palabras subrayadas). Sin instalar nada.
# Uso: py subrayado-pdf-winocr.py <pdf> <salida.json> <pag_inicio> <pag_fin> [desplazamiento_de_pagina]
#   Páginas 1-based. El json tiene el mismo formato que subrayado-pdf.py: [{pagina, palabras:[texto, color, fraccion, bbox_pt, rojo, forma]}]
import sys, os, json, subprocess, tempfile, shutil
import numpy as np, pymupdf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util
spec = importlib.util.spec_from_file_location('sp', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'subrayado-pdf.py'))
sp = importlib.util.module_from_spec(spec); spec.loader.exec_module(sp)
DPI = 200; K = DPI / 72

def main(pdf, out, a, b, off=0):
    d = pymupdf.open(pdf); tmp = tempfile.mkdtemp(prefix='ocrwin_')
    try:
        pix = {}
        for pn in range(a - 1, b):
            pm = d[pn].get_pixmap(dpi=DPI)
            im = np.frombuffer(pm.samples, np.uint8).reshape(pm.h, pm.w, pm.n)[:, :, :3].astype(float) / 255
            h, s, v = sp.hsv(im)
            # canal «valor» (máximo de R, G, B): el fosforito (de cualquier color) queda casi blanco y la tinta oscura, negra
            g1 = np.clip((v - 0.30) / 0.45, 0, 1); lim = np.stack([g1, g1, g1], axis=2)
            from PIL import Image
            Image.fromarray((lim * 255).astype(np.uint8)).save(os.path.join(tmp, 'p%03d.png' % (pn + 1)))
            pix[pn + 1] = (im, h, s, v)
        js = os.path.join(tmp, 'ocr.json')
        ps1 = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ocr-windows.ps1')
        subprocess.run(['powershell', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ps1, tmp, js], check=True)
        ocr = json.load(open(js, encoding='utf-8-sig'))
        res = []
        for pn in range(a, b + 1):
            im, h, s, v = pix[pn]; C = sp.clases(h, s, v)
            r, g, bl = im[..., 0], im[..., 1], im[..., 2]
            rojo = (r > .6) & (g < .32) & (bl < .32)
            azul = (im.max(2) < .70) & (bl > r + .09) & (bl > g + .09)
            H, W = C.shape; pal = []
            for w in ocr.get('%03d' % pn, []) or []:
                t = w['t']; X0 = max(0, int(w['x'])); X1 = min(W, int(w['x'] + w['w']) + 1); Y0 = int(w['y']); Y1 = int(w['y'] + w['h']) + 1
                al = max(1, Y1 - Y0); col = None; fr = 0.0
                ya, yb = Y0 + int(al * .25), Y0 + int(al * .85)
                if X1 > X0 and yb > ya:
                    sc = C[ya:yb, X0:X1]; tinta = v[ya:yb, X0:X1] < .45
                    tot = max(1, sc.size - int(tinta.sum()))
                    cnt = np.bincount(sc[sc >= 0].ravel(), minlength=7)
                    if cnt.sum():
                        i = int(cnt.argmax()); fr = cnt[i] / tot
                        if fr >= .30: col = sp.NOM[i]
                def cob(mask, y_a, y_b):
                    y_a, y_b = max(0, y_a), min(H, y_b)
                    if X1 <= X0 or y_b <= y_a: return 0
                    return float(mask[y_a:y_b, X0:X1].any(0).mean())
                ru = cob(rojo, Y1 - int(al * .30), Y1 + int(al * .40)) > .55
                caja = cob(azul, Y0 - int(al * .30), Y0 + int(al * .20)) > .5 and cob(azul, Y1 - int(al * .20), Y1 + int(al * .30)) > .5
                circ = (not caja) and cob(rojo, Y0 - int(al * .30), Y0 + int(al * .20)) > .35 and cob(rojo, Y1 - int(al * .20), Y1 + int(al * .30)) > .35
                forma = 'caja' if caja else ('circulo' if circ else None)
                if circ: ru = False
                pal.append([t, col, round(float(fr), 2), [round(w['x'] / K, 1), round(w['y'] / K, 1), round((w['x'] + w['w']) / K, 1), round((w['y'] + w['h']) / K, 1)], bool(ru), forma])
            res.append({'pagina': pn + off, 'palabras': pal})
            print('pag', pn + off, len(pal), file=sys.stderr)
        json.dump(res, open(out, 'w', encoding='utf8'), ensure_ascii=False)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

if __name__ == '__main__':
    x = sys.argv
    main(x[1], x[2], int(x[3]), int(x[4]), int(x[5]) if len(x) > 5 else 0)
