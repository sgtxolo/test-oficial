# Auditoría de las tres aplicaciones

Generado por `prompts/herramientas/auditoria-apps.js` (solo lectura).

## Fallos graves
- Ninguno

## Avisos
- 2 archivos de datos no están en APP_SHELL: expres/q10.js, esquemas-datos/t18.js
- Opciones repetidas dentro de la pregunta 23-125
- Opciones repetidas dentro de la pregunta 23-129
- 87 explicaciones con restos de importación («TEST n», «He analizado…»)
- 289 preguntas repetidas (mismo enunciado y misma respuesta) dentro de un mismo tema
- 1995 preguntas sin norma en lila (ref-norma) en la explicación (ver tabla por tema)
- 224 preguntas IA cuya respuesta correcta es la opción más larga (regla del examinador: no debe serlo)
- esquemas-datos/mapa-preguntas.js enlaza 19 preguntas que ya no existen: 4-ia-553, 4-ia-554, 4-ia-555, 4-ia-556, 4-ia-557, 4-ia-558, 4-ia-559, 4-ia-560…
- MARCAS_PREG (test) enlaza 10 preguntas que ya no existen: 4-ia-553, 4-ia-554, 4-ia-555, 4-ia-556, 4-ia-557, 4-ia-562, 4-ia-568, 4-ia-569…
- expres/t4.js enlaza 19 preguntas que ya no existen: 4-ia-553, 4-ia-554, 4-ia-555, 4-ia-556, 4-ia-557, 4-ia-558, 4-ia-559, 4-ia-560…

## Datos
- Sintaxis comprobada: 54 scripts inline y 152 archivos .js
- Caché del service worker: oposicion-cache-v441 · 174 archivos en APP_SHELL
- Preguntas IA leídas de los bloques «seed»: 9325
- Test de conocimientos: 16336 preguntas en 27 temas

## Por tema
| Tema | Preguntas | Oficiales | IA | Sin norma lila | Sin literal | Restos importación | Repetidas | % en mapa esquema | Exprés | Subrayado (piezas) | Preguntas enlazadas al subrayado |
|---|---|---|---|---|---|---|---|---|---|---|---|
| T1 | 1119 | 312 | 807 | 4 | 11 | 0 | 4 | 100% | sí | 229 | 210 |
| T2 | 1061 | 197 | 864 | 0 | 40 | 0 | 13 | 100% | sí | 182 | 161 |
| T3 | 729 | 367 | 362 | 0 | 0 | 0 | 34 | 100% | sí | 153 | 152 |
| T4 | 1637 | 467 | 1170 | 77 | 117 | 0 | 12 | 100% | sí | — | — |
| T5 | 1378 | 281 | 1097 | 0 | 6 | 7 | 8 | 100% | sí | 78 | 0 |
| T6 | 806 | 472 | 334 | 0 | 2 | 0 | 71 | 100% | sí | 119 | 113 |
| T7 | 316 | 152 | 164 | 0 | 0 | 2 | 4 | 98% | sí | 57 | 35 |
| T8 | 738 | 308 | 430 | 15 | 147 | 1 | 7 | 100% | sí | 95 | 93 |
| T9 | 422 | 292 | 130 | 68 | 218 | 4 | 2 | 98% | sí | 41 | 35 |
| T10 | 910 | 397 | 513 | 8 | 214 | 6 | 68 | 100% | sí | 183 | 182 |
| T11 | 1427 | 197 | 1230 | 19 | 85 | 6 | 5 | 93% | sí | 353 | 298 |
| T12 | 289 | 173 | 116 | 0 | 0 | 0 | 3 | 100% | sí | 31 | 27 |
| T13 | 492 | 338 | 154 | 22 | 230 | 0 | 16 | 100% | sí | 47 | 46 |
| T14 | 445 | 250 | 195 | 34 | 181 | 2 | 8 | 100% | sí | 76 | 73 |
| T15 | 1013 | 258 | 755 | 75 | 134 | 5 | 4 | 100% | sí | 86 | 75 |
| T16 | 322 | 140 | 182 | 0 | 11 | 0 | 4 | 100% | sí | 54 | 36 |
| T17 | 632 | 280 | 352 | 105 | 163 | 6 | 6 | 100% | sí | 64 | 61 |
| T18 | 664 | 294 | 370 | 132 | 169 | 5 | 7 | 97% | sí | 114 | 114 |
| T19 | 275 | 275 | 0 | 59 | 275 | 0 | 4 | 0% | — | — | — |
| T20 | 217 | 217 | 0 | 186 | 217 | 9 | 0 | 0% | — | — | — |
| T21 | 248 | 248 | 0 | 247 | 248 | 12 | 0 | 0% | — | — | — |
| T22 | 203 | 203 | 0 | 116 | 203 | 4 | 0 | 0% | — | — | — |
| T23 | 182 | 132 | 50 | 123 | 182 | 0 | 1 | 0% | — | — | — |
| T24 | 208 | 208 | 0 | 208 | 208 | 5 | 0 | 0% | — | — | — |
| T25 | 177 | 127 | 50 | 113 | 177 | 1 | 7 | 0% | — | — | — |
| T26 | 209 | 209 | 0 | 167 | 209 | 6 | 1 | 0% | — | — | — |
| T27 | 217 | 217 | 0 | 217 | 217 | 6 | 0 | 0% | — | — | — |
