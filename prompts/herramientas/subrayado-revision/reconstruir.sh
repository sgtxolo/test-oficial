cd "C:/Users/ruben/Desktop/HTML OFICIAL"
py prompts/herramientas/expres-subrayado-aplicar.py 11 "$(cat prompts/herramientas/subrayado-revision/ids.txt)" >/dev/null && node prompts/herramientas/expres-subrayado-datos.js 11 "Tema 11 · Derecho administrativo" >/dev/null && py prompts/herramientas/expres-subrayado-bloques.py "C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/TEMA 11 DERECHO ADEMINISTRATIVO-08-08-2026.pdf" 11 >/dev/null
node -e "const fs=require('fs');fs.writeFileSync('expres-subrayado/bloques-t11.js','(window.EXSUB_B=window.EXSUB_B||{})[11]='+fs.readFileSync('expres-subrayado/t11-bloques.json','utf8')+';\n')"
py prompts/herramientas/expres-subrayado-cortes.py 11 >/dev/null
for f in datos revision bloques cortes; do node --check expres-subrayado/$f-t11.js || echo FALLO $f; done
node -e "global.window={};require('./expres-subrayado/datos-t11.js');const D=window.EXSUB[11];const rev=require('fs').readFileSync('expres-subrayado/revision-t11.js','utf8');const esq=JSON.parse(rev.match(/\"esq\": (\[[^\]]*\])/)[1]);let r=0;for(const p of D.piezas){if(p.extra||esq.includes(p.id))continue;r+=p.imgr?p.whr[1]:p.wh[1]}console.log('páginas ≈',(r/1527).toFixed(1))"
