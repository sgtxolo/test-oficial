import sys, pymupdf
from PIL import Image, ImageDraw
d = pymupdf.open('C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/TEMA 1 DERECHOS HUMANOS-08-08-2026.pdf')
ps = [int(x) for x in sys.argv[2:]]; ims = []
for p in ps:
    pm = d[p].get_pixmap(dpi=60); im = Image.frombytes('RGB', (pm.w, pm.h), pm.samples); g = ImageDraw.Draw(im)
    for y in range(100, 801, 100):
        yy = y * 60 / 72; g.line([(0, yy), (14, yy)], fill=(255, 0, 0)); g.text((16, yy - 5), str(y), fill=(255, 0, 0))
    g.text((200, 3), 'p' + str(p), fill=(255, 0, 0)); g.rectangle([0, 0, im.width - 1, im.height - 1], outline=(255, 0, 0)); ims.append(im)
W, H = ims[0].size; cols = 5; rows = (len(ims) + 4) // 5; o = Image.new('RGB', (W * cols, H * rows), 'white')
for i, im in enumerate(ims): o.paste(im, ((i % 5) * W, (i // 5) * H))
o.save(sys.argv[1])
