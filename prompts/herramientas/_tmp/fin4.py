import json,re
D={
 'r-4':{'ap':[1,2],'rangos':[[0,275],[1405,1508],[2898,2984]]},
 'r-8':{'ap':[],'rangos':[[0,118]]},
 'a-41':{'ap':[],'rangos':[[0,62],[398,510],[640,718],[738,805],[995,1045]]},
 'd-73':{'ap':[],'rangos':[[0,128],[1950,2150]]},
 'a-21':{'ap':[],'rangos':[[0,38],[390,452],[1045,1215]]},
}
p='expres-subrayado/t11-img-recorte.json'; d=json.loads(open(p,encoding='utf-8').read()); d.update(D)
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'))) for k,v in d.items())+'\n}\n')
open('prompts/herramientas/_tmp/ids.txt','w').write(','.join(D))
rp='expres-subrayado/revision-t11.js'; s=open(rp,encoding='utf-8').read()
t=json.loads(re.search(r'"todos": ?(\[[^\]]*\])',s).group(1)); t=t+[k for k in D if k not in t]
s=re.sub(r'"todos": ?\[[^\]]*\]','"todos": '+json.dumps(t),s); s=re.sub(r'"hechos": ?\[[^\]]*\]','"hechos": '+json.dumps(t),s); open(rp,'w',encoding='utf-8').write(s); print(len(t))
