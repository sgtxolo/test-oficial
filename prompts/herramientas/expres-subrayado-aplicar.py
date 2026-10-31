# Aplica recortes a mano (píxeles de «<id>.jpg») guardados en expres-subrayado/t<N>-img-recorte.json.
# Uso: py expres-subrayado-aplicar.py <tema> id,id,…   Crea «<id>-r.jpg» (franja «(…)» entre tramos no contiguos) y actualiza indice.json.
import sys, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont
T = sys.argv[1]; ids = sys.argv[2].split(',')
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT = B + f'expres-subrayado/img/t{T}'
rec = json.load(open(B + f'expres-subrayado/t{T}-img-recorte.json', encoding='utf-8'))
ind = json.load(open(OUT + '/indice.json', encoding='utf-8'))
try: F = ImageFont.truetype('arial.ttf', 20)
except Exception: F = ImageFont.load_default()
for pid in ids:
    r = rec[pid]; e = next(x for x in ind if x['id'] == pid); full = Image.open(f"{OUT}/{e['img']}").convert('RGB'); ps = []; ant = None
    # los cortes se ajustan a los huecos entre renglones: nunca queda una línea cortada por la mitad ni una frase que empieza a medias
    g = np.asarray(full.convert('L')).astype(int); tinta = (g < 190).mean(axis=1) > 0.003; H_ = full.height   # tinta = letra oscura (el subrayador claro no cuenta)
    def hueco(y, fin, lim=40):
        # si el corte cae dentro de una línea de texto: se queda con la línea si al menos el 35 % de ella ya estaba dentro del recorte; si no, se queda sin ella
        # (si no hay hueco claro entre renglones —notas a mano, flechas— se deja el corte como está)
        if y <= 2 or y >= H_ - 2 or not tinta[y]: return y
        a = y
        while a > 0 and tinta[a - 1] and y - a < lim: a -= 1
        b = y
        while b < H_ - 1 and tinta[b + 1] and b - y < lim: b += 1
        if y - a >= lim or b - y >= lim or b - a > 34: return y
        dentro = ((y - a) if fin else (b - y)) / max(1, b - a)
        if fin: return min(H_, b + 1) if dentro >= .35 else a
        return a if dentro >= .35 else min(H_, b + 1)
    rg = []
    for y0, y1 in sorted(r['rangos']):
        y0 = hueco(y0, False); y1 = hueco(min(y1, H_), True) if y1 < H_ - 2 else H_
        if rg and y0 <= rg[-1][1] + 2: rg[-1][1] = max(rg[-1][1], y1)
        else: rg.append([y0, y1])
    for y0, y1 in rg:
        y1 = min(y1, full.height)
        if ant is not None and y0 - ant > 8:
            g = Image.new('RGB', (full.width, 30), 'white'); ImageDraw.Draw(g).text((full.width // 2 - 14, 4), '(…)', fill=(110, 116, 126), font=F); ps.append(g)
        ps.append(full.crop((0, y0, full.width, y1))); ant = y1
    o = Image.new('RGB', (full.width, sum(p.height for p in ps)), 'white'); y = 0
    for p in ps: o.paste(p, (0, y)); y += p.height
    o.save(f"{OUT}/{pid}-r.jpg", quality=78, optimize=True); e['imgr'] = f'{pid}-r.jpg'; e['ap'] = r['ap']; e['whr'] = list(o.size)
    if r.get('nombre'): e['nombre'] = r['nombre']
    print(pid, o.size)
json.dump(ind, open(OUT + '/indice.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
