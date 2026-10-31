# Aplica recortes a mano (píxeles de «<id>.jpg») guardados en expres-subrayado/t<N>-img-recorte.json.
# Uso: py expres-subrayado-aplicar.py <tema> id,id,…   Crea «<id>-r.jpg» (franja «(…)» entre tramos no contiguos) y actualiza indice.json.
import sys, json
from PIL import Image, ImageDraw, ImageFont
T = sys.argv[1]; ids = sys.argv[2].split(',')
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT = B + f'expres-subrayado/img/t{T}'
rec = json.load(open(B + f'expres-subrayado/t{T}-img-recorte.json', encoding='utf-8'))
ind = json.load(open(OUT + '/indice.json', encoding='utf-8'))
try: F = ImageFont.truetype('arial.ttf', 20)
except Exception: F = ImageFont.load_default()
for pid in ids:
    r = rec[pid]; e = next(x for x in ind if x['id'] == pid); full = Image.open(f"{OUT}/{e['img']}").convert('RGB'); ps = []; ant = None
    for y0, y1 in sorted(r['rangos']):
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
