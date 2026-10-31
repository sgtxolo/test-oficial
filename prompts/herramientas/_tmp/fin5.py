import json,re
D={
 'a-122':{'ap':[],'rangos':[[655,1845]],'nombre':'Ley 39/2015 · Artículos 121 y 122 (esquema)'},
 'a-124':{'ap':[],'rangos':[[305,905]],'nombre':'Ley 39/2015 · Artículos 123 y 124 (esquema)'},
 'a-126':{'ap':[],'rangos':[[570,1795]],'nombre':'Ley 39/2015 · Artículos 125 y 126 (esquema)'},
}
p='expres-subrayado/t11-img-recorte.json'; d=json.loads(open(p,encoding='utf-8').read()); d.update(D)
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'),ensure_ascii=False)) for k,v in d.items())+'\n}\n')
open('prompts/herramientas/_tmp/ids.txt','w').write(','.join(D))
rp='expres-subrayado/revision-t11.js'; s=open(rp,encoding='utf-8').read()
if '"esq"' not in s: s=s.replace('"hechos":','"esq": ["a-121", "a-123", "a-125"], "hechos":',1)
open(rp,'w',encoding='utf-8').write(s)
ap='prompts/herramientas/expres-subrayado-aplicar.py'; t=open(ap,encoding='utf-8').read()
if "r.get('nombre')" not in t: t=t.replace("e['whr'] = list(o.size);","e['whr'] = list(o.size)\n    if r.get('nombre'): e['nombre'] = r['nombre']\n   ",1); open(ap,'w',encoding='utf-8').write(t)
