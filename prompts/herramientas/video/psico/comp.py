import numpy as np, pickle
from PIL import Image, ImageFilter, ImageDraw
Q=list(range(57,70))+list(range(77,84))+[93]
def label(free):
    H,W=free.shape; lab=np.zeros((H,W),np.int32); n=0; out=[]
    runs=[]; par=[]
    def fd(a):
        while par[a]!=a: par[a]=par[par[a]]; a=par[a]
        return a
    prev=[]
    for y in range(H):
        d=np.diff(np.concatenate([[0],free[y].astype(np.int8),[0]])); s=np.nonzero(d==1)[0]; e=np.nonzero(d==-1)[0]
        cur=[]; j=0
        for a,b in zip(s,e):
            i=len(par); par.append(i); runs.append((y,a,b)); cur.append(i)
            while j<len(prev) and runs[prev[j]][2]<=a: j+=1
            k=j
            while k<len(prev) and runs[prev[k]][1]<b:
                ra,rb=fd(i),fd(prev[k])
                if ra!=rb: par[ra]=rb
                k+=1
        prev=cur
    g={}
    for i,(y,a,b) in enumerate(runs): g.setdefault(fd(i),[]).append((y,a,b))
    return list(g.values())
def disco(m,r):
    o=np.zeros_like(m); p=np.pad(m,r)
    H,W=m.shape
    for dy in range(-r,r+1):
        for dx in range(-r,r+1):
            if dx*dx+dy*dy<=r*r+1: o|=p[r+dy:r+dy+H, r+dx:r+dx+W]
    return o
res={}
for q in Q:
    im=Image.open(f'ps/q{q}.jpg').convert('L').crop((320,52,995,365)); im=im.resize((im.width*3,im.height*3),Image.BICUBIC)
    a=np.array(im); line=disco(a<150,5)
    free=~line
    comps=[]
    for rr in label(free):
        area=sum(b-x for y,x,b in rr)
        if area<2500 or area>250000: continue
        ys=[r[0] for r in rr]; x0=min(r[1] for r in rr); x1=max(r[2] for r in rr); y0,y1=min(ys),max(ys)+1
        if x1-x0>1200: continue
        m=np.zeros((y1-y0,x1-x0),bool); vals=[]
        for y,s,e in rr: m[y-y0,s-x0:e-x0]=True; vals.append(a[y,s:e])
        comps.append(dict(m=m,box=(x0,y0,x1,y1),area=area,gray=float(np.median(np.concatenate(vals)))))
    comps.sort(key=lambda c:(c['box'][0],c['box'][1]))
    res[q]=comps
    o=im.convert('RGB'); d=ImageDraw.Draw(o)
    for i,c in enumerate(comps):
        x0,y0,x1,y1=c['box']; col=(255,0,0) if c['gray']<235 else (0,0,255)
        yy,xx=np.nonzero(c['m']); cx,cy=x0+xx.mean(),y0+yy.mean()
        d.text((cx-14,cy-18),str(i),fill=col,font_size=36)
    o.resize((1350,round(o.height*1350/o.width))).save(f'cm{q}.png')
    print(q,len(comps))
pickle.dump(res,open('comps.pkl','wb'))
ims=[]
for q in Q:
    i=Image.open(f'cm{q}.png').convert('RGB'); ImageDraw.Draw(i).text((8,8),str(q),fill=(0,150,0),font_size=44); ims.append(i)
for s in range(0,len(ims),3):
    g=ims[s:s+3]; o=Image.new('RGB',(1350,sum(i.height for i in g)),'black'); y=0
    for i in g: o.paste(i,(0,y)); y+=i.height+4
    o.save(f'cs{s//3}.png')
