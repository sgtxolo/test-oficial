#!/bin/bash
# commit.sh "mensaje"  — commitea lo propio; de mapa-preguntas.js solo las entradas de los lotes del 28/11
set -e
cd "/c/Users/ruben/Desktop/HTML OFICIAL"
S="$(dirname "$0")"
node -e "
const fs=require('fs'),cp=require('child_process');
const ids=new Set();for(const f of fs.readdirSync('prompts/herramientas').filter(f=>/^oficiales-seras-28-11-.*\.json$/.test(f))){for(const q of JSON.parse(fs.readFileSync('prompts/herramientas/'+f,'utf8'))){if(q.id)ids.add(q.id);(q.ids||[]).forEach(i=>ids.add(i))}}
const MP='esquemas-datos/mapa-preguntas.js';
const work=fs.readFileSync(MP,'utf8');let head=cp.execSync('git show HEAD:'+MP,{maxBuffer:1e8}).toString();
let add='';for(const id of ids){const m=work.match(new RegExp('\"'+id+'\":\"[^\"]*\",?'));if(m&&!head.includes('\"'+id+'\":\"'))add+=m[0].replace(/,?$/,',')}
for(const q of JSON.parse(fs.readFileSync('prompts/herramientas/video/retiradas-28-11-tarde.json','utf8')))head=head.replace(new RegExp('\"'+q.id+'\":\"[^\"]*\",?'),'');head=head.replace('window.MAPA_PREG={',()=>'window.MAPA_PREG={'+add);fs.writeFileSync(process.argv[1],head);console.log('entradas nuevas en mapa',add.split(',').length-1)
" "$(cygpath -w "$S/mapa-commit.js")"
git add clave-tests/t1-esq.js clave-tests/t1-sec.js clave-tests/t3-esq.js clave-tests/t3-sec.js esquemas.html expres-subrayado/datos-t1.js expres-subrayado/datos-t3.js expres-subrayado/t1-preg-extra.json prompts/herramientas/tema1/mapa-fijo-t1.json prompts/herramientas/tema3/mapa-fijo-t3.json test-oficial-conocimiento.html prompts/herramientas/oficiales-seras-28-11* 2>/dev/null || true
[ -f expres-subrayado/t3-preg-extra.json ] && git add expres-subrayado/t3-preg-extra.json
for f in service-worker.js expres-subrayado.html; do git diff --quiet -- $f || git add $f; done
git add expres-subrayado/img/t1 expres-subrayado/img/t3 2>/dev/null || true
H=$(git hash-object -w --path=esquemas-datos/mapa-preguntas.js "$(cygpath -w "$S/mapa-commit.js")")
git update-index --cacheinfo 100644,$H,esquemas-datos/mapa-preguntas.js
git commit -q -m "$1

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git status --short
git log --oneline | head -1
