#!/bin/sh
# Reconstruye el esquema del Tema 22 (literal + marcas) y le reaplica TU subrayado real (OCR de mi PDF), el lila y la unión de marcas.
# lila-no-se-verbo.js y unir-subrayados.js tocan todos los temas: se revierte lo ajeno (git checkout) al terminar.
# Uso: sh prompts/herramientas/tema22/reconstruir-t22.sh <carpeta con subrayado.json>
set -e
J="$1/subrayado.json"
node prompts/herramientas/tema22/esquema-t22.js
node prompts/herramientas/aplicar-subrayado-pdf.js "$J" esquemas.html "/* T22_BEGIN */" "/* T22_END */" "T22_RE:5-9,T22_DP:11-18,T22_CP:17-56" 2>&1 | tail -2
node prompts/herramientas/lila-no-se-verbo.js | tail -1
node prompts/herramientas/unir-subrayados.js
git checkout -- expres/t1.js expres/t2.js expres/t3.js expres/t4.js expres/t5.js expres/t6.js expres/t7.js expres/t8.js expres/t9.js expres/t10.js expres/t11.js expres/t12.js expres/t13.js expres/t14.js expres/t15.js expres/t16.js expres/t17.js expres/t18.js expres/t19.js expres/t20.js expres/t21.js 2>/dev/null || true
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21; do git checkout -- esquemas-datos/t$n.js 2>/dev/null || true; done
git status --short | head
