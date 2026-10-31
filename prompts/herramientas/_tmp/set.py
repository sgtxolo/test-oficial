import json,sys
p='expres-subrayado/t11-img-recorte.json'; t=open(p,encoding='utf-8').read().strip()
# formato original: un objeto por línea; se reescribe igual
d=json.loads(t)
d.update({
 'd-20':{'ap':[1],'rangos':[[0,42],[45,126],[130,172],[172,242],[448,528]]},
 'd-27':{'ap':[2],'rangos':[[0,62],[155,238],[240,296],[385,492]]},
 'd-33':{'ap':[2],'rangos':[[0,45],[158,332]]},
 'd-34':{'ap':[3],'rangos':[[0,45],[138,166],[252,326],[332,382],[445,1182],[1278,1390]]},
})
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'))) for k,v in d.items())+'\n}\n')
