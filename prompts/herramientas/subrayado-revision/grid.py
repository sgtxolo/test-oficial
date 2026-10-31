import os
import sys, json
from PIL import Image, ImageDraw, ImageFont
S=os.environ.get('SCRATCH','C:/Users/ruben/AppData/Local/Temp/')
f=ImageFont.truetype('arial.ttf',16)
for pid in sys.argv[1:]:
    im=Image.open(f'expres-subrayado/img/t11/{pid}.jpg').convert('RGB'); d=ImageDraw.Draw(im)
    for y in range(0,im.height,20):
        big=y%100==0; d.line([(0,y),(im.width if big else 26,y)],fill=(255,0,0) if big else (0,0,255),width=1)
        if big: d.text((2,y+1),str(y),fill=(255,0,0),font=f)
    im.save(S+pid+'-g.png')
    print(pid, im.size)
