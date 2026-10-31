# Quita de las imágenes ENTERAS («<id>.jpg») lo que no es el texto del artículo: el cuadro-esquema del temario, el título de la
# sección siguiente y los blancos del final. Se corta por abajo (las posiciones de arriba no cambian, así que los recortes «-r» y
# los bloques siguen valiendo). Corte = primera banda gris de ancho completo (cuadros y «TÍTULO / CAPÍTULO»).
# Uso: py expres-subrayado-recortar-sobrantes.py <tema> [--aplicar]      (sin --aplicar solo informa)
import sys, json, os
import numpy as np
from PIL import Image
T = sys.argv[1]; aplicar = '--aplicar' in sys.argv
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT = B + f'expres-subrayado/img/t{T}'
ind = json.load(open(OUT + '/indice.json', encoding='utf-8'))
try: bl = json.load(open(B + f'expres-subrayado/t{T}-bloques.json', encoding='utf-8'))
except Exception: bl = {}
tot0 = tot1 = 0; avisos = []; cambios = 0
for e in ind:
    p = f"{OUT}/{e['img']}"; im = Image.open(p).convert('RGB'); a = np.asarray(im).astype(int); H, W, _ = a.shape
    mx = a.max(axis=2); mn = a.min(axis=2); media = a.mean(axis=2)
    gris = ((mx - mn) < 16) & (media >= 175) & (media <= 238)
    fil = gris.mean(axis=1) > 0.22
    corte = H; i = 70
    while i < H:                                   # bandas grises de ≥ 20 filas
        if fil[i]:
            j = i
            while j < H and fil[j]: j += 1
            if j - i >= 18: corte = i; break
            i = j
        i += 1
    # el corte no puede quedar por encima de lo que lleva el recorte -r
    fin_rec = max([x[1] for x in bl.get(e['id'], []) if x[3]] or [0])
    if corte < fin_rec: avisos.append(f"{e['id']}: banda gris en {corte} pero el recorte llega a {fin_rec}; no se corta"); corte = H
    # blancos finales: última fila con tinta (no casi blanca) + margen
    tinta = (media < 225).mean(axis=1) > 0.004
    ys = np.where(tinta[:corte])[0]; fin = min(corte, (int(ys.max()) + 14) if len(ys) else corte)
    fin = max(fin, fin_rec)
    tot0 += H; tot1 += fin
    if fin < H - 20:
        cambios += 1
        if aplicar:
            im.crop((0, 0, W, fin)).save(p, quality=80, optimize=True); e['wh'] = [W, fin]
if aplicar: json.dump(ind, open(OUT + '/indice.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'{cambios} imágenes recortadas; altura total {tot0} -> {tot1} px ({tot0/1527:.0f} -> {tot1/1527:.0f} páginas de entero)')
print('\n'.join(avisos))
