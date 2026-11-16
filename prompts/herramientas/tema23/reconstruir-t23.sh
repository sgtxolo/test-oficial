#!/bin/sh
# Reconstruye el esquema del Tema 23 (literal + marcas) y le reaplica TU subrayado real (OCR de mi PDF), el lila y la unión de marcas.
# lila-no-se-verbo.js y unir-subrayados.js tocan todos los temas: se revierte lo ajeno (git checkout) al terminar.
# Uso: sh prompts/herramientas/tema23/reconstruir-t23.sh <carpeta con subrayado.json>
set -e
J="$1/subrayado.json"
node prompts/herramientas/tema23/esquema-t23.js
node prompts/herramientas/aplicar-subrayado-pdf.js "$J" esquemas.html "/* T23_BEGIN */" "/* T23_END */" "T23_LSP:5-75" 2>&1 | tail -2
node prompts/herramientas/lila-no-se-verbo.js | tail -1
node prompts/herramientas/unir-subrayados.js
node prompts/herramientas/tema23/limpia-cab.js
if [ -f prompts/herramientas/tema23/visuales-t23.js ]; then node prompts/herramientas/tema23/visuales-t23.js; fi
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22; do git checkout -- expres/t$n.js 2>/dev/null || true; git checkout -- esquemas-datos/t$n.js 2>/dev/null || true; done
git status --short | head
