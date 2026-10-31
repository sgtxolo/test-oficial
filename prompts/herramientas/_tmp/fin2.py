import json,re
D={
 'd-65':{'ap':[2,5],'rangos':[[0,40],[115,205],[675,825]]},
 'd-84':{'ap':[1,2],'rangos':[[0,285]]},
 'a-39':{'ap':[1,3],'rangos':[[0,40],[42,98],[172,232],[318,368]]},
 'a-73':{'ap':[1,3],'rangos':[[0,40],[42,118],[212,308]]},
 'a-109':{'ap':[1,2],'rangos':[[0,345]]},
 'a-126':{'ap':[1,2,3],'rangos':[[0,345]]},
 'a-122':{'ap':[2,3],'rangos':[[0,38],[132,206],[225,295],[312,360]]},
 'b-38':{'ap':[1,2,3,4,5,6],'rangos':[[0,885]]},
 'b-59':{'ap':[1,2,3],'rangos':[[0,300]]},
 'b-145':{'ap':[1,2,3,4],'rangos':[[0,416]]},
 't-17':{'ap':[3,4],'rangos':[[0,38],[398,570]]},
}
p='expres-subrayado/t11-img-recorte.json'; d=json.loads(open(p,encoding='utf-8').read()); d.update(D)
d['d-48']['ap']=[2,5,6]
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'))) for k,v in d.items())+'\n}\n')
open('prompts/herramientas/_tmp/ids.txt','w').write(','.join(list(D)+['d-48']))
rp='expres-subrayado/revision-t11.js'; s=open(rp,encoding='utf-8').read()
t=json.loads(re.search(r'"todos": ?(\[[^\]]*\])',s).group(1)); t=t+[k for k in D if k not in t]
s=re.sub(r'"todos": ?\[[^\]]*\]','"todos": '+json.dumps(t),s); s=re.sub(r'"hechos": ?\[[^\]]*\]','"hechos": '+json.dumps(t),s); open(rp,'w',encoding='utf-8').write(s); print(len(t))
