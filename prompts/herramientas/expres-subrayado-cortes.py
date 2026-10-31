# Puntos de corte seguros (entre líneas de texto) de cada imagen, para imprimir sin cortar renglones y sin dejar blancos.
# Uso: py expres-subrayado-cortes.py <tema>   ->  expres-subrayado/cortes-t<N>.js   {"a-77":[y,…],"a-77-r":[y,…]}  (píxeles de la imagen)
import sys, json, os
import numpy as np
from PIL import Image
T = sys.argv[1]; B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; D = B + f'expres-subrayado/img/t{T}'
OBJ, MIN, MAX = 330, 190, 470
res = {}
for f in sorted(os.listdir(D)):
    if not f.endswith('.jpg'): continue
    a = np.asarray(Image.open(f'{D}/{f}').convert('L')).astype(int); H = a.shape[0]
    ink = (a < 232).mean(axis=1); cortes = []; y = 0
    while H - y > MAX:
        lo, hi = y + MIN, min(H - 30, y + MAX); seg = ink[lo:hi]
        # fila (o tramo) más limpia; en empate, la más cercana al objetivo
        m = seg.min(); cand = np.where(seg <= m + 0.004)[0] + lo
        c = int(cand[np.argmin(np.abs(cand - (y + OBJ)))]); cortes.append(c); y = c
    res[f[:-4]] = cortes
s = '(window.EXSUB_X=window.EXSUB_X||{})[%s]=%s;\n' % (T, json.dumps(res, separators=(',', ':')))
open(B + f'expres-subrayado/cortes-t{T}.js', 'w', encoding='utf-8').write(s); print(len(res), 'imágenes,', len(s) // 1024, 'KB')
