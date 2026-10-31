import os as _os
T=_os.environ.get('TEMA','11')
import sys, re, json, subprocess, html, pymupdf
B='C:/Users/ruben/Desktop/HTML OFICIAL/'; OUT=B+'expres-subrayado/img/t'+T
cfg=json.load(open(B+'expres-subrayado/t'+T+'-config.json',encoding='utf-8')); inst=json.load(open(B+'expres-subrayado/t'+T+'-instrumentos.json',encoding='utf-8'))
ind={e['id']:e for e in json.load(open(OUT+'/indice.json',encoding='utf-8'))}
d=PDF={'1':'TEMA 1 DERECHOS HUMANOS-08-08-2026.pdf','14':'TEMA 14 DEFENSOR DEL PUEBLO-2026-08-08.pdf','3':'TEMA 3 TRATADOS DE LA UNION EUROPEA-08-08-2026.pdf','8':'TEMA 8 PODER  JUDICIAL-08-08-2026.pdf','9':'TEMA 9 DERECHO CIVIL-08-08-2026.pdf','12':'TEMA 12 - GOBIERNO Y ADMINISTRACION-2026-08-08.pdf','7':'TEMA 7 CONTITUCION ESPAÑOLA-08-08-2026.pdf','11':'TEMA 11 DERECHO ADEMINISTRATIVO-08-08-2026.pdf'}
d=pymupdf.open('C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/'+PDF[T]); DPI=130; K=DPI/72
H=json.loads(subprocess.run(['node','-e',"global.window={};require('"+B+"expres/t"+T+".js');process.stdout.write(JSON.stringify(window.EXPRES_T["+T+"].html))"],capture_output=True,text=True,encoding='utf-8').stdout)
def numeros(t):
    s=re.sub(r'^Art[íi]culos?\s+','',t,flags=re.I).split('—')[0]; o=set()
    for m in re.finditer(r'(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)',s,re.I): o|=set(range(int(m[1]),int(m[2])+1))
    for m in re.finditer(r'\d+',re.sub(r'(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)','',s,flags=re.I)): o.add(int(m[0]))
    return sorted(o)
exp={}; cur=None; ix=-1
for f in re.split(r'(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)',H):
    t=re.sub(r'<[^>]+>','',(re.search(r'(?:ex-fh|bloque-titulo)">(.*?)</div>',f) or [None,''])[1])
    if re.match(r'^ANEXO',t): break
    k=next((j for j,i in enumerate(inst) if j>ix and i.get('inicio') and re.search(i['inicio'],t)),None)
    if k is not None: ix=k; cur=inst[k]['id']
    if f.startswith('<div class="ex-ficha') and cur and re.match(r'^Art[íi]culos?\s+\d',t) and len(numeros(t))==1:
        nums=set()
        for x in re.finditer(r'<p\b[^>]*>(.*?)</p>',f,flags=re.S):
            s=re.sub(r'<[^>]+>','',re.sub(r'<span class="ex-sello[^>]*>.*?</span>','',x[1])).strip(); s=re.sub(r'^\(…\)\s*','',s); m=re.match(r'(\d+)\.\s',s)
            if m: nums.add(int(m[1]))
        exp.setdefault(f'{cur}-{numeros(t)[0]}',set()).update(nums)
src=open(B+'prompts/herramientas/expres-subrayado-recortes.py',encoding='utf-8').read(); ns={'d':d,'re':re,'pymupdf':pymupdf,'DPI':DPI,'K':K}
for fn in ('es_art','encabezados','segmentos','marcadores'):
    m=re.search(r'^def '+fn+r'\(.*?(?=^def |^res = )',src,flags=re.S|re.M); exec(m.group(0),ns)
bad=[]; tot=0
for ley in cfg['leyes']:
    a,b=ley['paginas']; H2=ns['encabezados'](a,b)
    for n in ley['arts']:
        pid=f"{ley['id']}-{n}"; e=ind.get(pid)
        if not e or e.get('imgr') or pid not in exp: continue
        k=next((i for i,h in enumerate(H2) if h[0]==n),None)
        if k is None: continue
        mk=ns['marcadores'](ns['segmentos'](H2,k,b)); tot+=1
        if len(mk)>len(exp[pid]) and len(mk)>=2: bad.append(f"{pid} foto:{len(mk)} apartados, Exprés:{sorted(exp[pid])}")
print(tot,'artículos sin recorte comprobados;',len(bad),'donde la foto tiene más apartados que el Exprés'); print('\n'.join(bad))
# --- cobertura por palabras: Exprés / foto, en los artículos sin recorte ---
def norm(w): return re.sub(r'[^a-z0-9]','',w.lower().translate(str.maketrans('áéíóúüñ','aeiouun')))
txt={}
cur=None; ix=-1
for f in re.split(r'(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)',H):
    t=re.sub(r'<[^>]+>','',(re.search(r'(?:ex-fh|bloque-titulo)">(.*?)</div>',f) or [None,''])[1])
    if re.match(r'^ANEXO',t): break
    k=next((j for j,i in enumerate(inst) if j>ix and i.get('inicio') and re.search(i['inicio'],t)),None)
    if k is not None: ix=k; cur=inst[k]['id']
    if f.startswith('<div class="ex-ficha') and cur and re.match(r'^Art[íi]culos?\s+\d',t) and len(numeros(t))==1:
        w=set()
        for x in re.finditer(r'<p\b[^>]*>(.*?)</p>',f,flags=re.S):
            for q in re.split(r'\s+',html.unescape(re.sub(r'<[^>]+>',' ',re.sub(r'<span class="ex-sello[^>]*>.*?</span>',' ',x[1])))):
                if len(norm(q))>=5: w.add(norm(q))
        txt.setdefault(f'{cur}-{numeros(t)[0]}',set()).update(w)
res=[]
for ley in cfg['leyes']:
    a,b=ley['paginas']; H2=ns['encabezados'](a,b)
    for n in ley['arts']:
        pid=f"{ley['id']}-{n}"; e=ind.get(pid)
        if not e or e.get('imgr') or pid not in txt: continue
        k=next((i for i,h in enumerate(H2) if h[0]==n),None)
        if k is None: continue
        segs=ns['segmentos'](H2,k,b); ph=set()
        for pn,y0,y1 in segs:
            for w in d[pn].get_text('words'):
                if y0<=(w[1]+w[3])/2<=y1 and len(norm(w[4]))>=5: ph.add(norm(w[4]))
        if len(ph)>=12: res.append((len(txt[pid]&ph)/len(ph), pid, len(txt[pid]), len(ph)))
res.sort(); print('\ncobertura Exprés/foto < 60 %:'); 
low=[r for r in res if r[0]<0.6]; print(len(low),'de',len(res)); print(' '.join(f"{p}({round(c*100)}%)" for c,p,_,_ in low))
open(B+'prompts/herramientas/subrayado-revision/sinrec_low.txt','w').write(','.join(p for _,p,_,_ in low))
