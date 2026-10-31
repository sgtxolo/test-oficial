import sys, json, subprocess
from PIL import Image, ImageDraw, ImageFont
S='C:/Users/ruben/AppData/Local/Temp/claude/C--Users-ruben-OneDrive-Desktop-HTML-OFICIAL/2c8417e5-4301-4978-b560-ccdcf0af995d/scratchpad/'
ids=sys.argv[2].split(','); maxh=int(sys.argv[1]); subprocess.run(['py','prompts/herramientas/_tmp/ov2.py']+ids,capture_output=True)
f=ImageFont.truetype('arial.ttf',20); groups=[]; cur=[]; h=0
for k in ids:
    im=Image.open(S+k+'-c.png'); 
    if cur and h+im.height+30>maxh: groups.append(cur); cur=[]; h=0
    cur.append((k,im)); h+=im.height+30
if cur: groups.append(cur)
for gi,g in enumerate(groups):
    W=max(i.width for _,i in g); H=sum(i.height+30 for _,i in g); o=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(o); y=0
    for k,i in g:
        d.rectangle([0,y,W,y+28],fill=(200,230,255)); d.text((6,y+3),'#### '+k,fill=(0,0,150),font=f); o.paste(i,(0,y+30)); y+=i.height+30
    o.save(S+f'grp{gi}.png'); print(gi,[k for k,_ in g],o.size)
