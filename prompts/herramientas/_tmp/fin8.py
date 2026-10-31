import json,re
D={
 't-29':{'ap':[],'rangos':[[0,45],[525,578],[632,748],[752,808],[848,1218],[1285,1417]]},
 'a-83':{'ap':[],'rangos':[[0,42],[163,235]]},
 'r-2':{'ap':[],'rangos':[[575,1215]],'nombre':'RD 179/2005 · Artículo 2 (esquema)'},
 'a-22':{'ap':[],'rangos':[[0,40],[430,552]]},
}
p='expres-subrayado/t11-img-recorte.json'; d=json.loads(open(p,encoding='utf-8').read()); d.update(D)
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'),ensure_ascii=False)) for k,v in d.items())+'\n}\n')
open('prompts/herramientas/_tmp/ids.txt','w').write(','.join(D))
rp='expres-subrayado/revision-t11.js'; s=open(rp,encoding='utf-8').read()
t=json.loads(re.search(r'"todos": ?(\[[^\]]*\])',s).group(1)); t=t+[k for k in D if k not in t]
s=re.sub(r'"todos": ?\[[^\]]*\]','"todos": '+json.dumps(t),s); s=re.sub(r'"hechos": ?\[[^\]]*\]','"hechos": '+json.dumps(t),s); open(rp,'w',encoding='utf-8').write(s); print(len(t))
