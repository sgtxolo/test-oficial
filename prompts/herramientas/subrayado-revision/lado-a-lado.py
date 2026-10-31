import sys
from PIL import Image
S='C:/Users/ruben/AppData/Local/Temp/claude/C--Users-ruben-OneDrive-Desktop-HTML-OFICIAL/1e928743-3e8c-465f-97e3-db14b36ce543/scratchpad/'
ims=[Image.open(S+f'prop-{k}.png') for k in sys.argv[2].split(',')]
W=sum(i.width for i in ims)+10*len(ims); H=max(i.height for i in ims); o=Image.new('RGB',(W,H),'gray'); x=0
for i in ims: o.paste(i,(x,0)); x+=i.width+10
o.save(S+sys.argv[1]+'.png'); print(o.size)
