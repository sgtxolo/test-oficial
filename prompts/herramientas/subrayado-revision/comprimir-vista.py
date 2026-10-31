import os
import sys, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont
S=os.environ.get('SCRATCH','C:/Users/ruben/AppData/Local/Temp/')
f=ImageFont.truetype('arial.ttf',17)
for pid in sys.argv[1:]:
    im=Image.open(f'expres-subrayado/img/t11/{pid}.jpg').convert('RGB'); a=np.asarray(im.convert('L')).astype(int)
    blank=(a<235).mean(axis=1)<0.003; segs=[]; y=0; H=im.height
    while y<H:
        if blank[y]:
            j=y
            while j<H and blank[j]: j+=1
            if j-y>=40: y=j; continue
            segs.append((y,j)); y=j; continue
        j=y
        while j<H and not (blank[j] and j+40<=H and blank[j:j+40].all()): j+=1
        segs.append((y,j)); y=j
    # fusionar
    m=[]; 
    for s in segs:
        if m and s[0]<=m[-1][1]: m[-1]=(m[-1][0],s[1])
        else: m.append(s)
    tot=sum(b-a_ for a_,b in m)+len(m)*16; out=Image.new('RGB',(im.width,tot),(255,255,255)); d=ImageDraw.Draw(out); yy=0
    for a_,b in m:
        out.paste(im.crop((0,a_,im.width,b)),(0,yy+16)); d.rectangle([0,yy,im.width,yy+15],fill=(255,230,230)); d.text((4,yy-1),f'y={a_}',fill=(200,0,0),font=f)
        for t in range((a_//50+1)*50,b,50):
            d.line([(0,yy+16+t-a_),(36,yy+16+t-a_)],fill=(255,0,0),width=1); d.text((38,yy+16+t-a_-8),str(t),fill=(255,0,0),font=f)
        yy+=b-a_+16
    out=out.resize((int(out.width*0.85),int(out.height*0.85))); out.save(S+pid+'-c.png'); print(pid,out.size)
