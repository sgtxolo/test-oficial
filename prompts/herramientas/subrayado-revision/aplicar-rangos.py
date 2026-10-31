# uso: py apply.py '{"id":{"ap":[],"rangos":[[..]]}}'
import os as _os
T=_os.environ.get('TEMA','11')
import json,re,sys
D=json.loads(sys.argv[1])
p=f'expres-subrayado/t{T}-img-recorte.json'; d=json.loads(open(p,encoding='utf-8').read()); d.update(D)
open(p,'w',encoding='utf-8').write('{\n'+',\n'.join('"%s":%s'%(k,json.dumps(v,separators=(',',':'),ensure_ascii=False)) for k,v in d.items())+'\n}\n')
open('prompts/herramientas/subrayado-revision/ids.txt','w').write(','.join(D))
rp=f'expres-subrayado/revision-t{T}.js'; s=open(rp,encoding='utf-8').read()
t=json.loads(re.search(r'"todos": ?(\[[^\]]*\])',s).group(1)); t=t+[k for k in D if k not in t]
s=re.sub(r'"todos": ?\[[^\]]*\]','"todos": '+json.dumps(t),s); s=re.sub(r'"hechos": ?\[[^\]]*\]','"hechos": '+json.dumps(t),s); open(rp,'w',encoding='utf-8').write(s)
