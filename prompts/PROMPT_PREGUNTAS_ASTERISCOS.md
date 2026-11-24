# PROMPT · Preguntas oficiales parecidas para los ✱ del temario (para una conversación nueva)

Copia todo lo de abajo en una conversación nueva de Claude Code abierta en `C:\Users\ruben\Desktop\HTML OFICIAL` (carpeta real; NO la copia de OneDrive). Cambia el número de tema al final.

---

## Contexto
Proyecto de estudio de la oposición a la Guardia Civil. El usuario marcó con un asterisco ✱ (a mano, en rojo, a la izquierda del apartado) cada punto de su temario subrayado donde **cayó una pregunta oficial de examen**. Por tanto, **en cada ✱ hay siempre una pregunta oficial** en el banco del test (`test-oficial-conocimiento.html`).

## Qué quiero que hagas, tema a tema (sin preguntarme entre tandas)
Para **cada ✱ del tema** escribe una pregunta **parecida** a la oficial que ya existe en ese ✱ (si por algún motivo no hubiera ninguna, la haces nueva). Misma calidad, misma dificultad y mismo estilo de examen oficial. Las nuevas **van al banco OFICIAL** del tema (ids `T-N` siguientes, con marca ✱ y la nota «(asterisco ✱ del temario)»), **no** al banco IA.

Reglas de contenido:
1. La pregunta va sobre **el mismo apartado/inciso donde está el ✱** (el ✱ cae casi siempre al inicio de un apartado o inciso, no de un artículo entero). No la hagas sobre otro apartado del mismo artículo.
2. **Nunca** preguntes «¿qué párrafo/apartado?» ni cites número de artículo o apartado en el enunciado.
3. Pregunta por lo importante del apartado: plazos, cifras, órganos, mayorías, listas, «salvo/únicamente», quién propone/decide. Usa lo subrayado de la foto del usuario (naranja, verde, el verbo lila, azul = plazos) como guía de qué es lo importante.
4. Enunciado: estilo oficial largo pero con tope. Objetivo 250-350 caracteres, máximo 450. Título de la norma abreviado.
5. 4 opciones; la correcta **no** es la más larga; distractores verosímiles (pueden salir de la oficial).
6. La **cita** de la explicación debe ser **literal** del texto oficial; la herramienta la verifica.
7. Explicación en el formato fijo del proyecto (Respuesta correcta / lila «Art. N.apartado · Norma» / rojo con la cita) — lo genera la librería.

## Cómo trabajar (herramientas ya hechas en `prompts/herramientas/`)
Orden por tema N:
1. **Inventario**: `node prompts/herramientas/asteriscos-estado.js N --ver` (lista los ✱ del Exprés `expres/tN.js` y si tienen oficial enlazada).
2. **Leer cada ✱ con su pregunta oficial**: usa un script tipo `prompts/herramientas/ast-auxiliares/dump.js` (si no existe, escríbelo: recorre `<p data-ex="*">` de `expres/tN.js`, empareja con las oficiales vía `esquemas-datos/lila-tN.js` y muestra texto del ✱ + oficial) o `node prompts/herramientas/ver-preguntas.js id1 id2…`.
3. **Posición del ✱ en la foto** (opcional, afinar): los datos de margen (`expres-subrayado/margen-tN.js`) NO traen la posición del asterisco. El ✱ rojo (≈RGB 240,95,110) en el margen izquierdo de `expres-subrayado/img/tN/*.jpg` se detecta con PIL (`py`, Python 3.14 con PIL y numpy): buscar blobs rojos con x < inicio del texto; funcionó bien en T1, poco fiable en T2/T3. Si hay duda, abre la imagen con Read y míralo.
4. **Escribir las preguntas** en un JSON por bloques de ~25-40 filas: `[ "art. X.Y", "rúbrica", "enunciado sin nº de artículo", ["correcta","falsa1","falsa2","falsa3"], "cita literal", "por qué", dificil(0/1), "clave de norma" ]`. La clave de norma sale de `NORMAS` en `preguntas-tNr-lib.js` / `preguntas-tN-lib.js` (si la norma no está, añádela).
5. **Generar el bloque**: `node prompts/herramientas/ast-auxiliares/mk.js <bloque≥60> <norma por defecto> datos.json "título" N` (crea `prompts/herramientas/preguntas-tNa-bBLOQUE.js`; si falta `mk.js`, créalo según el ejemplo de T1-T4 o escribe el bloque a mano con el formato de `preguntas-t1r-b14.js`).
6. **Verificar citas**: `node prompts/herramientas/preguntas-tNa-bBLOQUE.js --json salida.json`. Arregla toda línea «✗ CITAS QUE NO ESTÁN LITERALES» (el aviso «la correcta no aparece literal» solo es informativo).
7. **Comprobar números de artículo** con una herramienta tipo `prompts/herramientas/ast-auxiliares/artof.js` (busca la cita en `prompts/temario-limpio/temaN/oficial-paginas.txt` o `temario.txt` y da el artículo anterior más cercano). No te fíes de tu memoria: en la LO 18/2003 y otras me equivoqué.
8. **Insertar como oficiales**: `node prompts/herramientas/anade-oficiales-ast.js N salida1.json salida2.json …` (asigna ids, quita la etiqueta IA, marca ✱ en `MARCAS_PREG`).
9. **Auditar** que cada pregunta nueva cae en la zona del ✱ (script `prompts/herramientas/ast-auxiliares/audit.js`: compara la posición de tu cita con la de la oficial; reescribe las «lejos» con `prompts/herramientas/reemplaza-preguntas.js`).
10. `node prompts/herramientas/clave-tests.js`, comprobar sintaxis de los `<script>` de `test-oficial-conocimiento.html`, **subir `CACHE_NAME` en `service-worker.js`**, `git add` + commit + `git push origin main`. (Hay otro proceso que también hace commits: no toques lo que no sea tuyo.)

## Lo que NO debes hacer
- No borres ni cambies preguntas oficiales existentes (solo añade las nuevas; `reemplaza-preguntas.js` es solo para las tuyas).
- No uses `\b` escrito en comandos de shell (se convierte en retroceso 0x08 y rompe regex): usa `String.fromCharCode(92)` o la herramienta Edit/Write.
- No lances el mapa pregunta→esquema (`prompts/herramientas/mapa-preguntas.js`) tema a tema: es muy lento (procesa todos los temas). Se lanza **una sola vez al final**, con todo ya insertado.
- Subagentes: de uno en uno, nunca varios a la vez.
- Responde siempre en español.

## Estado (24/11/2026)
Hecho: T1 (1-317…1-478), T2 (2-220…2-285), T3 (3-412…3-509), T4 (4-471…4-745). Siguiente: **T5**, luego T6, T7… en orden. Para los ✱ sin pregunta oficial enlazada de los datos (aparecen como «NINGUNA»), el usuario dice que en su temario sí hay oficial: escribe igualmente la pregunta sobre ese apartado.
Pendiente global al terminar todos los temas: relanzar `mapa-preguntas.js` y subir el resultado (enlaza cada pregunta con su párrafo del esquema, lila y corchetes).

## Tarea ahora
Haz el **Tema N** completo siguiendo todo lo anterior, sin preguntarme entre tandas, y al terminar dime en español cuántas preguntas añadiste, qué avisos quedaron y qué ✱ no pudiste cubrir.
