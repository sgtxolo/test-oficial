# Vídeos con preguntas tipo test → aplicaciones de estudio

Guía para cuando el usuario pasa un vídeo (grabación de móvil o de pantalla) con preguntas tipo test. Responde siempre en español.
Carpeta de trabajo real: `C:\Users\ruben\Desktop\HTML OFICIAL` (no la copia de OneDrive). Un solo vídeo cada vez, de principio a fin, sin preguntar entre pasos.

## 0. Qué tipo de vídeo es

| Tipo | Destino |
|---|---|
| CONOCIMIENTOS | banco **oficial** del tema en `test-oficial-conocimiento.html` |
| INGLÉS | `test-oficial-ingles.html`, tema de gramática que toque |
| PSICOTÉCNICOS | `test-oficial-ingles.html`, tema 42 «Psicotécnicos» |

Si el usuario no dice el tipo, se deduce del vídeo. Si un vídeo mezcla tipos, cada pregunta va a su destino.

## 1. Sacar las preguntas (los tres tipos)

- ffmpeg: `C:\Users\ruben\AppData\Local\DVDVideoSoft\lib\ffmpeg.exe`.
- Primero 1 fotograma por segundo en hojas de contacto para entender el vídeo (cuántos tests, cuántas preguntas por test, temas).
- Pantalla (1440p): 3 fps, recortar la zona de preguntas y pasar `prompts/herramientas/ocr-windows.ps1`; agrupar apariciones repetidas y votar el texto. Móvil (baja resolución o scroll rápido): 4-8 fps y leer a ojo.
- **Contar**: preguntas leídas = preguntas de cada test (número de la plantilla). Si falta alguna, volver a esos fotogramas. Ninguna opción cortada ni línea de hueco (`__________`) perdida; el OCR se come esas líneas y confunde «lo»/«10», «El»/«EI».
- Transcripción **literal**: enunciado y 4 opciones en el orden del vídeo. No corregir ni mejorar el texto de la academia; si está mal redactado, decirlo en la explicación.
- Si el vídeo marca la respuesta (fila verde), se usa y se comprueba. Si no la marca, la resuelve Claude. Si hay duda real, decirlo al final con el número de pregunta.
- **Repetidas**: no meter una pregunta con el mismo enunciado y la misma respuesta que otra ya existente o del mismo vídeo. Si cambia el enunciado o la respuesta, entra.
- Informar al final: preguntas vistas, añadidas, repetidas, dudosas y no legibles.

## 2. CONOCIMIENTOS

Modelo ya hecho: `prompts/herramientas/oficiales-seras-t1b.js` + `oficiales-seras-t1b.json` (copiarlo y adaptarlo; no escribir otro desde cero).

- La respuesta sale del temario del usuario: esquema de `esquemas.html` (y `esquemas-datos/tN.js`), temario subrayado `expres-subrayado/` y `prompts/temario-limpio/temaN/`. PDF escaneado: `C:\Users\ruben\Desktop\OFICIAL 2026-27\TEMARIO ESCANEADO 2026-27\`. Nunca de memoria.
- Banco oficial del tema, ids `T-N` a continuación del último; `apartado` = nombre de la norma. Detectar el tema y la norma de cada pregunta.
- Explicación, formato fijo:
  `<span class="ex-resp">Respuesta correcta: <b>B</b> · <mark class="ex-key">respuesta</mark></span><span class="ref-norma">Art. X.Y · Nombre de la norma</span><span class="ref-concepto">"literal del temario"</span>Explicación breve de por qué es esa y por qué fallan las otras.`
  (lila = artículo, rojo = párrafo literal, sin letras de opciones en el texto de la explicación porque la app baraja; el origen lo añade la app).
- Los tres enlaces deben funcionar:
  - **Esquema**: párrafo exacto en `prompts/herramientas/temaN/mapa-fijo-tN.json` y `esquemas-datos/mapa-preguntas.js` (sin regenerar entero).
  - **Subrayado**: `expres-subrayado/tN-preg-extra.json` y `datos-tN.js`. Si falta el artículo, recortarlo del PDF con `expres-subrayado-anadir-piezas.py` (usar `/c/Users/ruben/bin/py`), revisar la imagen y añadir la pieza a `datos-tN.js`. Páginas tachadas o MOD no se usan.
  - **Esquema clave** (si el tema lo tiene): `clave-tests.js N`, `clave-mejoras-datos.js N`, `clave-esquema-nuevo.js N`, `clave-of-datos.js N` y después volver a pasar los scripts de inserción del tema (también los anteriores).
- Si un tema no tiene alguno de los tres, decirlo.
- `mapa-preguntas.js` tiene cambios antiguos sin commitear: commitear solo las entradas nuevas (ver el final de la sesión del 26/11: `git show HEAD:...` + `git hash-object` + `git update-index`). No subir esos cambios ajenos ni los archivos sin seguimiento que ya hubiera.

## 3. INGLÉS

- Añadir al **final** de `prompts/herramientas/psico/ingles-forma-banco.json`: `{"qid":"FM###","t":<tema de gramática>,"stem":"…___…","opts":["…","…","…","…"],"a":0,"fb":"…"}` (qid siguiente; sin `img` si va transcrita; `t:43` solo si no encaja en ningún tema).
- Enunciado con el hueco `___` visible. Exactamente una respuesta defendible; si el original admite dos, avisar.
- `fb` en español: «Respuesta correcta: <b>B</b>.» + traducción de la frase, regla gramatical y por qué fallan las otras.
- Insertar con `node prompts/herramientas/psico-insertar.js`.
- **Los ids de inglés son posicionales** (`Q<índice>`): nunca borrar ni reordenar. Antes y después de insertar, comprobar que ninguna pregunta existente cambia de qid; si cambiara, no subir y resolverlo.

## 4. PSICOTÉCNICOS

- Cada pregunta va como imagen: recorte limpio con enunciado y opciones, sin marcas ni colores que delaten la respuesta, en `psicotecnicos/ps-NNN.jpg` (número siguiente). Si es solo texto, transcribirlo en `stem` además de la imagen no es necesario; la imagen manda.
- Añadir al final de `prompts/herramientas/psico/psico-banco.json`: `{"qid":"PSI###","stem":"Pregunta psicotécnica","a":0,"img":"ps-NNN.jpg","ex":null,"fb":"…"}`.
- Resolver cada una paso a paso y **verificar** el resultado (cálculo con node cuando se pueda). `fb`: «Respuesta correcta: <b>C</b>.» + el razonamiento corto (patrón, operación o regla). Si no se puede resolver con seguridad, no inventar: dejarla fuera y listarla.
- Insertar con `node prompts/herramientas/psico-insertar.js` (misma comprobación de qids que en inglés).

## 5. Verificar y subir

1. Sintaxis de los `<script>` del HTML y de los `.js` tocados.
2. Navegador (`preview_start` «estudio-node»): borrar service worker y cachés antes de probar; comprobar todas las nuevas por script (explicación, imagen, enlaces) y abrir a ojo un ejemplo de cada enlace.
3. `node prompts/herramientas/bump-cache.js`, commit solo de lo propio y push a `origin main`.
4. Resumen final corto: dónde han quedado (ids), cuántas, repetidas, dudosas y qué no se ha probado.
