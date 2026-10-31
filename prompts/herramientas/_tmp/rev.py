import json,re
todos="d-20 d-27 d-33 d-34 d-48 d-49 d-72 d-78 a-2 a-4 a-9 a-12 a-14 a-24 a-40 a-70 a-90 a-100 a-115 a-117 b-3 b-20 b-21 b-23 b-66 b-148 t-8 t-26 t-36".split()
rec=json.load(open('expres-subrayado/t11-img-recorte.json',encoding='utf-8'))
hechos=[x for x in todos if x in ('d-20','d-27','d-33','d-34')]
open('expres-subrayado/revision-t11.js','w',encoding='utf-8').write('// Recortes del Exprés que se revisan a mano (el Exprés corta dentro de un apartado): todos = los que hay que revisar, hechos = ya revisados.\n(window.EXSUB_REV=window.EXSUB_REV||{})[11]=%s;\n'%json.dumps({'todos':todos,'hechos':hechos}))
p='expres-subrayado.html'; s=open(p,encoding='utf-8',newline='').read()
a='<script src="expres-subrayado/bloques-t11.js"></script>'
if 'revision-t11.js' not in s: s=s.replace(a,a+'\n<script src="expres-subrayado/revision-t11.js"></script>')
a="      + (p.extra ? '<span class=\"tag extra\">fuera del Exprés</span>' : '')"
b=a+"\n      + (((window.EXSUB_REV || {})[t] || {}).todos || []).includes(p.id) && p.imgr ? (((window.EXSUB_REV[t].hechos || []).includes(p.id)) ? '<span class=\"tag revok\" title=\"El recorte coincide con lo que lleva el Exprés\">✓ Recorte revisado</span>' : '<span class=\"tag revpend\" title=\"Este recorte todavía no se ha ajustado a las frases exactas del Exprés\">⏳ Falta revisar el recorte</span>') : ''"
assert a in s; s=s.replace(a,b,1)
a='.cmpb{width:100%'
b='.tag.revok{background:#e1f2e7;color:#1f6b45;border:1px solid #57a683}.tag.revpend{background:#fff1dc;color:#9a5a10;border:1px solid #d9a35a}\n'+a
assert a in s; s=s.replace(a,b,1); open(p,'w',encoding='utf-8',newline='').write(s); print('ok')
