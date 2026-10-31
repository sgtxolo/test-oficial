import sys, json
from PIL import Image, ImageDraw, ImageFont
S='C:/Users/ruben/AppData/Local/Temp/claude/C--Users-ruben-OneDrive-Desktop-HTML-OFICIAL/2c8417e5-4301-4978-b560-ccdcf0af995d/scratchpad/'
f=ImageFont.truetype('arial.ttf',16); prop=json.load(open('prompts/herramientas/_tmp/propuesta-t11.json'))
for pid in sys.argv[1:]:
    im=Image.open(f'expres-subrayado/img/t11/{pid}.jpg').convert('RGBA'); ov=Image.new('RGBA',im.size,(0,0,0,0)); d=ImageDraw.Draw(ov)
    for y0,y1 in (prop.get(pid) or {}).get('rangos',[]): d.rectangle([0,y0,14,y1],fill=(0,170,0,255))
    im=Image.alpha_composite(im,ov).convert('RGB'); d=ImageDraw.Draw(im)
    for y in range(0,im.height,20):
        big=y%100==0; d.line([(16,y),(im.width if big else 40,y)],fill=(255,0,0) if big else (0,0,255),width=1)
        if big: d.text((18,y+1),str(y),fill=(255,0,0),font=f)
    im.save(S+pid+'-o.png')
