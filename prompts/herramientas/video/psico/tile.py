exec(open('match.py',encoding='utf-8').read())
import sys
from concurrent.futures import ProcessPoolExecutor
SPEC={61:(1,None,[[5,7],[10,12],[6,8],[9,11]]),67:(3,8,[[9],[12],[10],[11]]),78:(3,None,[[9,10],[12,14],[8,11],[13,15]]),79:(3,None,[[8,10],[13,15],[9,11],[12,14]])}
K=0.5
def red(m,f=1.0,s=1.0):
    im=Image.fromarray((m*255).astype(np.uint8))
    return np.array(im.resize((max(1,round(im.width*s)),max(1,round(im.height*f*s))),Image.BILINEAR))>127
def rot(m,a):
    r=np.array(Image.fromarray((m*255).astype(np.uint8)).rotate(a,resample=Image.BILINEAR,expand=True))>127
    ys,xs=np.nonzero(r); return r[ys.min():ys.max()+1, xs.min():xs.max()+1]
def places(T,p,top=3):
    H,W=T.shape; h,w=p.shape; S=(H+h,W+w)
    c=np.fft.irfft2(np.fft.rfft2(T.astype(float),S)*np.fft.rfft2(p[::-1,::-1].astype(float),S),S)
    i=np.argmax(c); y,x=np.unravel_index(i,c.shape); return c[y,x]/p.sum(), y-h+1, x-w+1
def pon(shape,p,y,x):
    o=np.zeros(shape,bool); H,W=shape; h,w=p.shape
    y0,x0=max(0,y),max(0,x); y1,x1=min(H,y+h),min(W,x+w)
    o[y0:y1,x0:x1]=p[y0-y:y1-y,x0-x:x1-x]; return o
def cand(T,p,n):
    l=[]
    for a in range(0,360,2):
        r=rot(p,a); s,y,x=places(T,r); l.append((s,a,y,x))
    l.sort(reverse=True)
    out=[]
    for c in l:
        if all(min(abs(c[1]-d[1]),360-abs(c[1]-d[1]))>10 for d in out): out.append(c)
        if len(out)==n: break
    return out
def refine(T,p,a,y,x,otros):
    best=None
    for da in (-1,0,1):
        r=rot(p,a+da)
        for dy in range(-3,4):
            for dx in range(-3,4):
                m=pon(T.shape,r,y+dy,x+dx); v=(m&T).sum()-(m&~T).sum()
                if best is None or v>best[0]: best=(v,m)
    return best[1]
def juntar(T,p1,p2):
    top=(0,None)
    for first,second in ((p1,p2),(p2,p1)):
        for s,a,y,x in cand(T,first,30):
            m1=refine(T,first,a,y,x,None); R=T&~m1
            for s2,a2,y2,x2 in cand(R,second,5):
                m2=refine(R,second,a2,y2,x2,None); U=m1|m2
                v=((U&T).sum()-(m1&m2).sum())/(U|T).sum()
                if v>top[0]: top=(v,m1,m2)
    return top
def uno(job):
    q,oi,f=job; t,given,opts=SPEC[q]
    T=crece(C[q][t]['m'],9); T=red(np.pad(T,12),f,K)
    ids=([given] if given is not None else [])+opts[oi]
    ps=[red(np.pad(crece(C[q][i]['m'],11),4),f,1.0) for i in ids]
    sc=np.sqrt(T.sum()/sum(p.sum() for p in ps))
    res=(0,)
    for adj in (0.98,1.0,1.02):
        qs=[red(p,1.0,sc*adj) for p in ps]
        r=juntar(T,qs[0],qs[1])
        if r[0]>res[0]: res=r
    rgb=np.zeros(T.shape+(3,),np.uint8); m1,m2=res[1],res[2]
    rgb[T]=(255,0,0); rgb[m1]=(255,255,255); rgb[m2]=(150,150,150); rgb[m1&m2]=(0,255,0); rgb[(m1|m2)&~T]=(0,0,255)
    Image.fromarray(rgb).save(f't{q}_{oi}_{f}.png')
    return q,oi,f,res[0]
FS=(0.74,0.8,0.87,0.94,1.0,1.07)
if __name__=='__main__':
    jobs=[(q,o,f) for q in map(int,sys.argv[1:]) for o in range(4) for f in FS]
    with ProcessPoolExecutor(8) as ex:
        out=list(ex.map(uno,jobs))
    for q in map(int,sys.argv[1:]):
        for f in FS:
            r=[v for a,o,g,v in out if a==q and g==f]; print(q,f,'->','ABCD'[int(np.argmax(r))],' '.join(f'{"ABCD"[i]}:{v:.3f}' for i,v in enumerate(r)))
