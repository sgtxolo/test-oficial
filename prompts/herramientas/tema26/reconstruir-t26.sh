#!/bin/sh
# Reconstruye el esquema del Tema 26 (literal) y le reaplica TU subrayado real (OCR de mi PDF), el lila y la unión de marcas.
# Uso: sh prompts/herramientas/tema26/reconstruir-t26.sh prompts/temario-limpio/tema26   (necesita subrayado.json, no versionado)
# Pendiente: las 3 Resoluciones (págs. 161-220 de mi PDF) aún no están en el esquema; al añadirlas, sumar sus claves (T26_RES1…) al rango.
set -e
J="$1/subrayado.json"
node prompts/herramientas/tema26/esquema-t26.js
node prompts/herramientas/aplicar-subrayado-pdf.js "$J" esquemas.html "/* T26_BEGIN */" "/* T26_END */" "T26_LO11:7-30,T26_LO12:31-72,T26_L29:73-154,T26_ORD:155-160" 2>&1 | tail -3
node prompts/herramientas/lila-no-se-verbo.js | tail -1
node prompts/herramientas/unir-subrayados.js
node prompts/herramientas/tema26/limpia-cab.js
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 27; do git checkout -- expres/t$n.js 2>/dev/null || true; git checkout -- esquemas-datos/t$n.js 2>/dev/null || true; done
git status --short | head
