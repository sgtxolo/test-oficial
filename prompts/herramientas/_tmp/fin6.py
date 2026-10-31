import json,re
D={
 'a-96':{'ap':[6],'rangos':[[0,62],[738,1560]]},
 't-28':{'ap':[],'rangos':[[0,70],[1135,1198],[1680,1767]]},
 'b-32':{'ap':[1,3],'rangos':[[0,38],[52,155],[352,455]]},
 'a-53':{'ap':[],'rangos':[[0,62],[1178,1285]]},
 'a-40':{'ap':[],'rangos':[[905,1305]],'nombre':'Ley 39/2015 · Artículo 40 (esquema)'},
 'a-64':{'ap':[],'rangos':[[880,1572]],'nombre':'Ley 39/2015 · Artículo 64 (esquema)'},
 'b-21':{'ap':[],'rangos':[[415,880]],'nombre':'Ley 40/2015 · Artículo 21 (esquema)'},
}
p='expres-subrayado/t11-img-recorte.json'; d=json.loads(open(p,encoding='utf-8').read()); d.update(D)
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'),ensure_ascii=False)) for k,v in d.items())+'\n}\n')
open('prompts/herramientas/_tmp/ids.txt','w').write(','.join(D))
rp='expres-subrayado/revision-t11.js'; s=open(rp,encoding='utf-8').read()
t=json.loads(re.search(r'"todos": ?(\[[^\]]*\])',s).group(1)); t=t+[k for k in D if k not in t]
e=json.loads(re.search(r'"esq": ?(\[[^\]]*\])',s).group(1)); e=e+[k for k in ['a-100'] if k not in e]
s=re.sub(r'"todos": ?\[[^\]]*\]','"todos": '+json.dumps(t),s); s=re.sub(r'"hechos": ?\[[^\]]*\]','"hechos": '+json.dumps(t),s); s=re.sub(r'"esq": ?\[[^\]]*\]','"esq": '+json.dumps(e),s); open(rp,'w',encoding='utf-8').write(s); print(len(t),e)
