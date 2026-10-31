import json,re
D={
 'a-27':{'ap':[],'rangos':[[1715,2160]],'nombre':'Ley 39/2015 · Artículo 27 (esquema)'},
 'a-30':{'ap':[],'rangos':[[1140,2205]],'nombre':'Ley 39/2015 · Artículo 30 (esquema)'},
 'a-41':{'ap':[],'rangos':[[2120,2835]],'nombre':'Ley 39/2015 · Artículo 41 (esquema)'},
 'a-45':{'ap':[],'rangos':[[855,1275]],'nombre':'Ley 39/2015 · Artículo 45 (esquema)'},
 'a-48':{'ap':[],'rangos':[[430,1200]],'nombre':'Ley 39/2015 · Artículos 47 y 48 (esquema)'},
 'a-52':{'ap':[],'rangos':[[318,865]],'nombre':'Ley 39/2015 · Artículos 50 a 52 (esquema)'},
 'a-104':{'ap':[],'rangos':[[770,1425]],'nombre':'Ley 39/2015 · Artículos 100 a 104 (esquema)'},
}
p='expres-subrayado/t11-img-recorte.json'; d=json.loads(open(p,encoding='utf-8').read()); d.update(D)
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'),ensure_ascii=False)) for k,v in d.items())+'\n}\n')
open('prompts/herramientas/_tmp/ids.txt','w').write(','.join(D))
rp='expres-subrayado/revision-t11.js'; s=open(rp,encoding='utf-8').read()
t=json.loads(re.search(r'"todos": ?(\[[^\]]*\])',s).group(1)); t=t+[k for k in D if k not in t]
e=json.loads(re.search(r'"esq": ?(\[[^\]]*\])',s).group(1)); e=e+[k for k in ['a-101','a-102','a-103'] if k not in e]
s=re.sub(r'"todos": ?\[[^\]]*\]','"todos": '+json.dumps(t),s); s=re.sub(r'"hechos": ?\[[^\]]*\]','"hechos": '+json.dumps(t),s); s=re.sub(r'"esq": ?\[[^\]]*\]','"esq": '+json.dumps(e),s); open(rp,'w',encoding='utf-8').write(s); print(len(t),e)
