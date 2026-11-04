# Citas del T20 (LECrim) revisadas — 04/11/2026

Revisión manual de las 54 preguntas de `prompts/herramientas/_citas/sin-cita-t20.json` contra el texto consolidado de la LECrim (`prompts/herramientas/_citas/t20.txt`, temario oficial limpio). Citas en `esquemas-datos/citas-manual-t20.js`; explicaciones reescritas en formato fijo. No se ha tocado `service-worker.js` ni otros temas. Sustituye a `CITAS-PENDIENTES-T20.md` (todo lo allí listado queda resuelto).

Resultado: **51 corregidas** (respuesta, enunciado u opciones, todas con cita añadida) y **3 eliminadas** (ver abajo). No quedó ninguna dudosa sin resolver.

## Corregidas (el temario manda)

| id | Artículo | Cambio |
|---|---|---|
| 20-1 | Art. 19.2.º | respuesta D → C |
| 20-21 | Art. 501 | opciones B,C reescritas |
| 20-22 | Art. 588 bis a.1 | opciones B reescritas |
| 20-23 | Art. 574.2 | respuesta C → D |
| 20-27 | Art. 278 | respuesta D → A |
| 20-29 | Art. 490.1.º y 6.º | opciones B,C reescritas |
| 20-31 | Art. 109 bis.1 | respuesta A → C; opciones C reescritas |
| 20-33 | Art. 283 (Tercero) | respuesta C → A; opciones A reescritas |
| 20-41 | Art. 588 ter g | respuesta B → D |
| 20-44 | Art. 490.5.º | respuesta B → C |
| 20-45 | Art. 554.1.º | respuesta D → A; opciones C reescritas |
| 20-49 | Art. 526 | enunciado corregido |
| 20-50 | Art. 588 bis a.3 | respuesta A → B; opciones B reescritas |
| 20-57 | Art. 280 | respuesta D → B; opciones B reescritas |
| 20-71 | Art. 31 | respuesta D → C |
| 20-75 | Art. 17.3 | respuesta D → B |
| 20-76 | Art. 259 y 260 | respuesta C → D |
| 20-78 | Art. 8 | respuesta C → A |
| 20-82 | Art. 963.2 | opciones B reescritas |
| 20-84 | Art. 547.1.º, 2.º y 4.º | opciones B,C reescritas |
| 20-88 | Art. 282 bis.4 | respuesta C → A; enunciado corregido |
| 20-89 | Art. 367 quáter.1 | opciones B,C reescritas |
| 20-92 | Art. 766.1 | respuesta D → A |
| 20-93 | Art. 15.4.º | respuesta A → D |
| 20-94 | Art. 588 bis b.2 | opciones A reescritas |
| 20-98 | Art. 968 | respuesta A → D |
| 20-102 | Art. 770.1.ª | respuesta C → B |
| 20-108 | Art. 29 | respuesta D → B |
| 20-111 | Art. 102 | respuesta D → C |
| 20-130 | Art. 19.2.º a 4.º | respuesta C → D; opciones A reescritas |
| 20-131 | Art. 261.2.º | respuesta B → D; opciones B,C,D reescritas |
| 20-132 | Art. 21 | respuesta D → A; opciones B,C,D reescritas |
| 20-133 | Art. 35 | opciones A,B,C,D reescritas |
| 20-185 | Art. 35 | respuesta C → B |
| 20-134 | Art. 588 septies a.1 | respuesta D → B; opciones D reescritas |
| 20-138 | Art. 367 sexies.3 | respuesta C → D; opciones B,D reescritas |
| 20-141 | Art. 798.2.2.º | respuesta D → C; opciones A,B,C,D reescritas |
| 20-143 | Art. 520.1 | enunciado corregido; opciones A,B,C,D reescritas |
| 20-149 | Art. 102 | opciones A,B,C reescritas |
| 20-153 | Art. 764.4 | opciones A,B,C,D reescritas |
| 20-154 | Art. 490.2.º a 4.º | opciones A,B,C reescritas |
| 20-155 | Art. 283 (Séptimo) | respuesta D → C; enunciado corregido; opciones B,D reescritas |
| 20-158 | Art. 588 bis a.1 | opciones B,C,D reescritas |
| 20-163 | Art. 13 | opciones A,B,C,D reescritas |
| 20-172 | Art. 335 | respuesta C → A |
| 20-173 | Art. 298 | respuesta A → C |
| 20-181 | Art. 279 | respuesta B → C |
| 20-184 | Art. 345 | respuesta A → B |
| 20-190 | Art. 588 bis a.2 | respuesta B → A |
| 20-210 | Art. 367 quáter.1.c) | enunciado corregido; opciones A,D reescritas |
| 20-211 | Art. 588 quater b.2 | opciones A reescritas |

Notas de criterio:
- Cuando las opciones estaban ilegibles (importación defectuosa: 20-133, 20-141, 20-143, 20-149, 20-153, 20-154, 20-158, 20-163, 20-132, 20-130) se reconstruyeron con el literal del artículo; las opciones falsas nuevas son distractores sencillos que el artículo desmiente.
- 20-22 / 20-158: «secreto judicial» no es principio rector (Art. 588 bis a.1); en 20-22 la opción B pasa a «Especialidad» y en 20-158 «Secreto judicial» queda como la incorrecta.
- 20-21: «gobernador particular/social» no existe en el art. 501; se sustituyó por querellante particular y procesado (la respuesta «todas» se mantiene).
- 20-93: el art. 15 empieza por pruebas materiales (1.º) y aprehensión (2.º); solo la opción D («4.º Cualquiera que hubiese tenido noticia del delito») es literal.
- 20-49: el enunciado decía «donde no existan la Audiencia»; el Presidente y el Magistrado acuden donde sí existe, así que se cambió a «donde exista».
- 20-88: el art. 282 bis.4 habla de «tres o más personas» y «delincuencia organizada»; se corrigió el enunciado y la respuesta pasa a A.

## Eliminadas (no están en el temario ni en ninguna fuente)

Autorizado por el usuario en `PROMPT_CITAS_REVISION.md`. Se buscaron «terroris», «Audiencia Nacional», «recus», «apertura del juicio oral», «calificación jurídica provisional» en el texto del T20 sin hallar apoyo. Eliminadas con `prompts/herramientas/borrar-preguntas.js`.

| id | Enunciado | Opciones | Motivo |
|---|---|---|---|
| 20-18 | El procedimiento para delitos de terrorismo se caracteriza por… | A competencia exclusiva de la Audiencia Nacional (marcada); B prisión provisional hasta cuatro años; C intervención judicial inmediata de todos los actos; D todas | La competencia de la Audiencia Nacional (LOPJ) no está en el temario del T20; los otros extremos tampoco figuran. |
| 20-19 | El auto de apertura del juicio oral debe contener… | A calificación jurídica provisional; B relación de pruebas propuestas y admitidas; C citación para la vista oral; D todas (marcada) | El contenido del auto de apertura (art. 783) no está en el extracto del T20; lo planteado no coincide con el artículo. |
| 20-20 | La recusación de un juez por causa de parentesco se podrá interponer… | A en cualquier estado del proceso (marcada); B solo antes de la audiencia; C dentro de cinco días; D solo durante la instrucción | La recusación no está en el temario del T20. Además la explicación llevaba restos de importación («TEST 2…»). |
