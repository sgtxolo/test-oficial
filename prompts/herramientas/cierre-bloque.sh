#!/bin/sh
# Uso: sh prompts/herramientas/cierre-bloque.sh <bNN> "<mensaje>"  -> inserta el bloque, comprueba scripts, commit y push
set -e
node prompts/herramientas/preguntas-t3-$1.js
node -e "const s=require('fs').readFileSync('test-oficial-conocimiento.html','utf8');const re=/<script[^>]*>([\s\S]*?)<\/script>/g;let m,n=0,bad=0;while(m=re.exec(s)){n++;try{new Function(m[1])}catch(e){bad++;console.log('ERR script',n,e.message)}}console.log('scripts',n,'errores',bad);process.exit(bad?1:0)"
git add test-oficial-conocimiento.html prompts/herramientas/preguntas-t3-$1.js
git commit -q -m "$2

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git push -q origin main
git log --oneline -1
