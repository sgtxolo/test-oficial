#!/bin/sh
# Reconstruye el esquema del Tema 26 (literal) y le reaplica TU subrayado real (OCR de mi PDF), el lila y la unión de marcas.
# Uso: sh prompts/herramientas/tema26/reconstruir-t26.sh prompts/temario-limpio/tema26   (necesita subrayado.json, no versionado)
set -e
node prompts/herramientas/tema26/filtra-subrayado-t26.js "$1"
J="$1/subrayado-filtrado.json"
node prompts/herramientas/tema26/esquema-t26.js
node prompts/herramientas/aplicar-subrayado-pdf.js "$J" esquemas.html "/* T26_BEGIN */" "/* T26_END */" "T26_LO11:7-30,T26_LO12:31-72,T26_L29:73-154,T26_ORD:155-160,T26_RES1:161-180,T26_RES2:181-204,T26_RES3:205-220" 2>&1 | tail -3
node prompts/herramientas/lila-no-se-verbo.js | tail -1
node prompts/herramientas/unir-subrayados.js
node prompts/herramientas/tema26/limpia-cab.js
for v in a b; do if [ -f prompts/herramientas/tema26/visuales-t26$v.js ]; then node prompts/herramientas/tema26/visuales-t26$v.js; fi; done
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 27; do git checkout -- expres/t$n.js 2>/dev/null || true; git checkout -- esquemas-datos/t$n.js 2>/dev/null || true; done
git status --short | head
