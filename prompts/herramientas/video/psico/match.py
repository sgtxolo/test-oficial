import numpy as np, pickle, itertools, json
from PIL import Image, ImageFilter
C=pickle.load(open('comps.pkl','rb'))
def canon(m, ang=0):
    im=Image.fromarray((m*255).astype(np.uint8))
    k=np.sqrt(14000/m.sum()); im=im.resize((max(1,round(im.width*k)),max(1,round(im.height*k))),Image.BILINEAR)
    if ang: im=im.rotate(ang,resample=Image.BILINEAR,expand=True)
    a=np.array(im)>127; ys,xs=np.nonzero(a); o=np.zeros((320,320),bool)
    o[np.clip(ys-int(round(ys.mean()))+160,0,319), np.clip(xs-int(round(xs.mean()))+160,0,319)]=True
    return o
def iou(a,b):
    return (a&b).sum()/(a|b).sum()
RP, RT = 11, 8
def crece(m, r):
    p=np.pad(m, r+2); H,W=p.shape; q=np.pad(p,r); o=np.zeros_like(p)
    for dy in range(-r,r+1):
        for dx in range(-r,r+1):
            if dx*dx+dy*dy<=r*r+1: o|=q[r+dy:r+dy+H, r+dx:r+dx+W]
    return o
def best(t,m):
    t=crece(t,RT); m=crece(m,RP); T=canon(t); sc=[(iou(T,canon(m,a)),a) for a in range(0,360,3)]
    s,a=max(sc)
    out=(s,a)
    for a2 in range(a-3,a+4):
        B=canon(m,a2)
        for dx in (-3,-1,0,1,3):
            for dy in (-3,-1,0,1,3):
                v=iou(T,np.roll(np.roll(B,dx,1),dy,0))
                if v>out[0]: out=(v,a2%360)
    return out
def solve(q, targets, opts, rt=None):
    global RT
    if rt is not None: RT=rt
    c=C[q]; M={}
    for p in sorted({i for o in opts for i in o}):
        for t in targets: M[t,p]=best(c[t]['m'],c[p]['m'])[0]
    res=[]
    for o in opts:
        if len(o)==len(targets): sc=max((np.mean([M[t,p] for t,p in zip(targets,perm)]),min(M[t,p] for t,p in zip(targets,perm))) for perm in itertools.permutations(o))
        else: v=max(M[t,p] for t in targets for p in o); sc=(v,v)
        res.append(sc)
    order=np.argsort([-r[0] for r in res])
    print(q,'->','ABCD'[order[0]],' '.join(f'{"ABCD"[i]}:{r[0]:.3f}/{r[1]:.3f}' for i,r in enumerate(res)),'margen',round(res[order[0]][0]-res[order[1]][0],3),flush=True)

def estira(m,f):
    return np.array(Image.fromarray((m*255).astype(np.uint8)).resize((m.shape[1],max(1,round(m.shape[0]*f))),Image.BILINEAR))>127
def prep(q,i,f,r):
    return estira(crece(C[q][i]['m'],r),f)
def best2(T,m):
    sc=[(iou(T,canon(m,a)),a) for a in range(0,360,3)]
    top=sorted(sc,reverse=True)[:3]; out=top[0]
    for s,a in top:
        for a2 in range(a-2,a+3):
            B=canon(m,a2)
            for dx in (-4,-2,-1,0,1,2,4):
                for dy in (-4,-2,-1,0,1,2,4):
                    v=iou(T,np.roll(np.roll(B,dx,1),dy,0))
                    if v>out[0]: out=(v,a2%360)
    return out
def solve2(q, targets, opts, f=1.0, quiet=False):
    M={}
    for t in targets:
        T=canon(prep(q,t,f,9))
        for p in sorted({i for o in opts for i in o}): M[t,p]=best2(T,prep(q,p,f,11))[0]
    res=[]
    for o in opts:
        if len(o)==len(targets): sc=max((np.mean([M[t,p] for t,p in zip(targets,perm)]),min(M[t,p] for t,p in zip(targets,perm))) for perm in itertools.permutations(o))
        else: v=max(M[t,p] for t in targets for p in o); sc=(v,v)
        res.append(sc)
    order=np.argsort([-r[0] for r in res])
    print(q,'f',f,'->','ABCD'[order[0]],' '.join(f'{"ABCD"[i]}:{r[0]:.3f}/{r[1]:.3f}' for i,r in enumerate(res)),'margen',round(res[order[0]][0]-res[order[1]][0],3),flush=True)

PZ = {57:([1,3],[[4,5],[6,7],[8,9],[10,11]]),58:([0,4],[[10,12],[15,13],[11,9],[14,16]]),59:([0,1],[[4,5],[7,6],[9,8],[11,10]]),
60:([0,4],[[7,9],[11,13],[10,8],[12,14]]),62:([1],[[3],[4],[5],[6]]),63:([1,2],[[3,5],[6,7],[8,10],[11,12]]),64:([0],[[3],[4],[5],[6]]),
65:([3,6],[[9,11],[13,16],[10,12],[14,15]]),66:([0,5],[[7,9],[10,13],[6,8],[11,12]]),68:([0,3],[[7,8],[9,10],[11,12],[13,14]]),
69:([3,5],[[7,10],[14,11],[8,9],[12,13]]),77:([0,2],[[4,5],[6,7],[9,8],[11,10]]),80:([3,6],[[10,12],[13,15],[9,11],[14,16]]),
81:([0,3],[[10,12],[13,15],[9,11],[14,16]]),82:([3,6],[[9,11],[13,15],[10,12],[14,16]]),83:([1,6],[[9,10],[12,11],[14,13],[15,16]]),
93:([0,6],[[9,12],[13,15],[10,11],[14,16]])}
