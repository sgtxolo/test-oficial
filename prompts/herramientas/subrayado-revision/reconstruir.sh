cd "C:/Users/ruben/Desktop/HTML OFICIAL"
# Uso: TEMA=1 bash prompts/herramientas/subrayado-revision/reconstruir.sh   (por defecto el 11)
T=${TEMA:-11}
case $T in
 2) TIT="Tema 2 · Terrorismo internacional"; PDF="TEMA 2 TERRORISMO INTERNACIONA-08-08-2026-.pdf";;
 6) TIT="Tema 6 · Extranjería"; PDF="TEMA 6 EXTRANJERIA -08-08-2026.pdf";;
 10) TIT="Tema 10 · Derecho civil"; PDF="TEMA 10 DERECHO CIVIL-08-08-2026.pdf";;
 13) TIT="Tema 13 · Jurisdicción contencioso-administrativa"; PDF="TEMA 13 JURISDICCION CONTENCIOSO ADMINISTRATIVA-2026-08-08 .pdf";;
 16) TIT="Tema 16 · Igualdad entre mujeres y hombres"; PDF="TEMA 16 IGUALDAD MUJERES Y HOMBRES-2026-08-08.pdf";;
 17) TIT="Tema 17 · Responsabilidad penal de los menores"; PDF="TEMA 17 MENORES-2026-08-08.pdf";;
 18) TIT="Tema 18 · Derecho penal, parte general"; PDF="TEMA 18 DERECHO PENAL PARTE GENERAL-2026-08-08.pdf";;
 20) TIT="Tema 20 · Derecho procesal penal (I)"; PDF="TEMA 20 DERECHO PROCESAL (I)-2026-08-08.pdf";;
 19) TIT="Tema 19 · Derecho penal, parte especial"; PDF="TEMA 19 DERECHO PENAL PARTE ESPECIAL-2026-08-08.pdf";;
 15) TIT="Tema 15 · Protección integral contra la violencia de género"; PDF="TEMA 15 VIOGEN-2026-08-08.pdf";;
 1) TIT="Tema 1 · Derechos humanos"; PDF="TEMA 1 DERECHOS HUMANOS-08-08-2026.pdf";;
 7) TIT="Tema 7 · Constitución Española"; PDF="TEMA 7 CONTITUCION ESPAÑOLA-08-08-2026.pdf";;
 14) TIT="Tema 14 · El Defensor del Pueblo"; PDF="TEMA 14 DEFENSOR DEL PUEBLO-2026-08-08.pdf";;
 3) TIT="Tema 3 · Tratados de la Unión Europea"; PDF="TEMA 3 TRATADOS DE LA UNION EUROPEA-08-08-2026.pdf";;
 8) TIT="Tema 8 · Poder Judicial"; PDF="TEMA 8 PODER  JUDICIAL-08-08-2026.pdf";;
 9) TIT="Tema 9 · Defensa Nacional"; PDF="TEMA 9 DERECHO CIVIL-08-08-2026.pdf";;
 12) TIT="Tema 12 · Gobierno y Administración"; PDF="TEMA 12 - GOBIERNO Y ADMINISTRACION-2026-08-08.pdf";;
 11) TIT="Tema 11 · Derecho administrativo"; PDF="TEMA 11 DERECHO ADEMINISTRATIVO-08-08-2026.pdf";;
esac
IDS=$(node -e "process.stdout.write(Object.keys(JSON.parse(require('fs').readFileSync('expres-subrayado/t$T-img-recorte.json','utf8'))).join(','))")
py prompts/herramientas/expres-subrayado-aplicar.py $T "$IDS" >/dev/null && node prompts/herramientas/expres-subrayado-datos.js $T "$TIT" >/dev/null && py prompts/herramientas/expres-subrayado-bloques.py "C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/$PDF" $T >/dev/null
node -e "const fs=require('fs');fs.writeFileSync('expres-subrayado/bloques-t$T.js','(window.EXSUB_B=window.EXSUB_B||{})[$T]='+fs.readFileSync('expres-subrayado/t$T-bloques.json','utf8')+';\n')"
py prompts/herramientas/expres-subrayado-cortes.py $T >/dev/null
for f in datos revision bloques cortes; do node --check expres-subrayado/$f-t$T.js || echo FALLO $f; done
node -e "global.window={};require('./expres-subrayado/datos-t$T.js');const D=window.EXSUB[$T];const rev=require('fs').readFileSync('expres-subrayado/revision-t$T.js','utf8');const esq=JSON.parse(rev.match(/\"esq\": (\[[^\]]*\])/)[1]);let r=0;for(const p of D.piezas){if(p.extra||esq.includes(p.id))continue;r+=p.imgr?p.whr[1]:p.wh[1]}console.log('páginas ≈',(r/1527).toFixed(1))"
