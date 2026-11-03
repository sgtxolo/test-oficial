# REVISIÓN MANUAL DE CITAS (lila con artículo + rojo con literal) — pauta del usuario, 03/11/2026

Cada pregunta del test de conocimientos debe mostrar: ✅/❌ → «Respuesta correcta» → **lila** «Art. N.apartado · Norma» → **rojo** literal EXACTO del temario → explicación breve. Ver «FORMATO DE LA EXPLICACIÓN — REGLA FIJA» en `prompts/PROMPT_PREGUNTAS_EXAMINADOR.md` y `documentacion/CITAS-PREGUNTAS.md`.

## Qué revisar
`prompts/herramientas/_citas/sin-cita-tN.json` lista, por tema, las preguntas a las que aún les falta artículo (`sinArticulo`) o literal (`sinLiteral`). **Revisa TODAS, una a una y a mano. Ningún filtro automático las descarta.**

## Fuentes (en este orden)
1. Temario oficial limpio: `C:\Users\ruben\Desktop\OFICIAL 2026-27\ACTUALIZACIONES\TEMARIO COMPLETO PDF 2026\` (PDF por tema; textos ya extraídos de T15–T27 en `prompts/herramientas/_citas/tN.txt`; de T1–T19 también en `prompts/temario-limpio/temaN/`; para otros: `pdftotext -enc UTF-8 -layout`).
2. Temario escaneado/subrayado del usuario: `C:\Users\ruben\Desktop\OFICIAL 2026-27\TEMARIO ESCANEADO 2026-27\` (tiene capa OCR; las palabras salen pegadas, busca sin espacios). Solo para confirmar contenido, nunca para copiar literales con errores de OCR.
3. Para T1–T18: el esquema (`esquemas.html`, `esquemas-datos/`) ya tiene el texto literal del articulado.

## Decisiones (autorizadas por el usuario)
- **Está en el temario y coincide con la respuesta:** añade la cita (lila + rojo).
- **Está en el temario pero lo contradice:** el temario manda. **Corrige la pregunta** (la respuesta correcta, las opciones o el enunciado y su explicación) para que sea cierta según el temario, y añade la cita. Anota cada corrección (id, antes → después) en `documentacion/CITAS-CORREGIDAS-<tema>.md`. Si dudas entre dos lecturas del temario, no corrijas: anótala en el archivo de pendientes.
- **No está en el temario oficial, ni en el subrayado, ni en el esquema, tras buscarla de verdad (varias palabras clave, sinónimos, la norma correcta):** **elimínala del banco.** El usuario lo autoriza expresamente para estas. Anota cada id eliminado con su enunciado y por qué en `documentacion/CITAS-ELIMINADAS-<tema>.md` (para poder recuperarla). Hazlo con `prompts/herramientas/borrar-preguntas.js` (si son IA o oficiales). Después quita sus ids de las listas que las referencian (Exprés `expres/tN.js`, `esquemas-datos/mapa-preguntas.js` — regenera con `prompts/herramientas/mapa-preguntas.js` —, `MARCAS_PREG`, `citas-*.js`) y mira que `node prompts/herramientas/auditoria-apps.js` no avise de enlaces colgando.
- Nunca inventes un artículo ni un literal. Copia el literal exacto (arregla guiones de fin de línea; sin cortar palabras).
- Una pregunta con respuesta tipo «A y B son correctas» / «todas»: la cita debe respaldar lo que hace correcta esa opción; no las barajes.

## Dónde escribir
`esquemas-datos/citas-manual-tN.js` con `window.CITAS_PREG=Object.assign(window.CITAS_PREG||{},{"id":["Art. 51.3","literal exacto","Norma"],…});` (ya existe para T15–T27; créalo para T1–T14 y añade su `<script src>` junto a los demás `citas-manual-*` en `test-oficial-conocimiento.html` y la entrada en `APP_SHELL` de `service-worker.js`; coordina con otras sesiones: solo añade tus líneas). Si la corrección de una pregunta cambia texto/opciones/respuesta, edítala en su sitio en `test-oficial-conocimiento.html` (solo esos ids).

## Cierre
Todas las preguntas del tema quedan con cita, corregidas, o eliminadas (con nota). Sintaxis JS válida, `node prompts/herramientas/bump-cache.js`, `node prompts/herramientas/auditoria-apps.js` sin fallos graves, y commit solo de tus archivos (`git add` explícito, `git pull --rebase` antes de `git push origin main`; otros trabajan a la vez). Español. No toques `tema19/` (archivos ajenos).
