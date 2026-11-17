#!/bin/sh
# Reconstruye el esquema del Tema 25 (literal + marcas) y le reaplica TU subrayado real (OCR de mi PDF), el lila y la unión de marcas.
# Uso: sh prompts/herramientas/tema25/reconstruir-t25.sh prompts/temario-limpio/tema25   (necesita subrayado.json, no versionado)
set -e
J="$1/subrayado.json"
node prompts/herramientas/tema25/esquema-t25.js
node prompts/herramientas/aplicar-subrayado-pdf.js "$J" esquemas.html "/* T25_BEGIN */" "/* T25_END */" "T25_LOE:5-36,T25_L31:37-45,T25_RD:47-55,T25_INT:57-67,T25_EUR:69-133" 2>&1 | tail -3
node prompts/herramientas/lila-no-se-verbo.js | tail -1
node prompts/herramientas/unir-subrayados.js
node prompts/herramientas/tema25/limpia-cab.js
for v in a b; do if [ -f prompts/herramientas/tema25/visuales-t25$v.js ]; then node prompts/herramientas/tema25/visuales-t25$v.js; fi; done
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23; do git checkout -- expres/t$n.js 2>/dev/null || true; git checkout -- esquemas-datos/t$n.js 2>/dev/null || true; done
git status --short | head
