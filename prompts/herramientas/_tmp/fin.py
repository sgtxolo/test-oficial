import json,re
D=json.load(open('prompts/herramientas/_tmp/dec1.json'))
D.update({
 'b-148':{'ap':[1,2],'rangos':[[0,612]]},
 't-8':{'ap':[3],'rangos':[[0,38],[152,518],[632,792],[1072,1126]]},
 't-26':{'ap':[1,2,3],'rangos':[[0,1522]]},
 't-36':{'ap':[3],'rangos':[[0,38],[165,447],[555,610],[655,745]]},
})
p='expres-subrayado/t11-img-recorte.json'; d=json.loads(open(p,encoding='utf-8').read()); d.update(D)
d.update({k:v for k,v in json.loads(open(p,encoding='utf-8').read()).items() if k in ('d-20','d-27','d-33','d-34')})
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'))) for k,v in d.items())+'\n}\n')
print(len(D),'aplicados', ','.join(D))
open('prompts/herramientas/_tmp/ids.txt','w').write(','.join(D))
