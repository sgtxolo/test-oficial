import json, subprocess
from PIL import Image, ImageDraw, ImageFont
S='C:/Users/ruben/AppData/Local/Temp/claude/C--Users-ruben-OneDrive-Desktop-HTML-OFICIAL/2c8417e5-4301-4978-b560-ccdcf0af995d/scratchpad/'
ids=json.loads(subprocess.run(['node','-e',"global.window={};require('./expres-subrayado/datos-t11.js');process.stdout.write(JSON.stringify(window.EXSUB[11].piezas.filter(p=>!p.extra).map(p=>p.id)))"],capture_output=True,text=True).stdout)
f=ImageFont.truetype('arial.ttf',13); TW,TH=230,200; cols=6; per=36; n=0
for s in range(0,len(ids),per):
    chunk=ids[s:s+per]; rows=(len(chunk)+cols-1)//cols; sh=Image.new('RGB',(cols*TW,rows*(TH+14)),'white'); d=ImageDraw.Draw(sh)
    for i,k in enumerate(chunk):
        im=Image.open(f'expres-subrayado/img/t11/{k}.jpg').convert('RGB'); im=im.crop((0,0,im.width,min(im.height,int(im.width*TH/TW)))); im=im.resize((TW-6,TH))
        x=(i%cols)*TW; y=(i//cols)*(TH+14); d.rectangle([x,y,x+TW,y+13],fill=(255,235,235)); d.text((x+3,y),k,fill=(180,0,0),font=f); sh.paste(im,(x+3,y+14))
    sh.save(S+f'mini{n}.png'); print(n,len(chunk),chunk[0],chunk[-1]); n+=1
