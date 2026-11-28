# Vídeos con preguntas tipo test → aplicaciones de estudio

**Este es el único prompt para vídeos.** El usuario solo adjunta el vídeo (uno o varios) y pega esto, sin indicar tipo ni tema:

```
Lee y sigue entera la guía C:\Users\ruben\Desktop\HTML OFICIAL\prompts\PROMPT_VIDEOS_TEST.md con los vídeos que adjunto. Hazlo todo de principio a fin sin preguntarme.
```

Responde siempre en español. Carpeta de trabajo real: `C:\Users\ruben\Desktop\HTML OFICIAL` (no la copia de OneDrive). Los vídeos se hacen de uno en uno, de principio a fin, sin preguntar entre pasos. Que un vídeo esté en una carpeta llamada «ya en la aplicación» no significa que esté metido: comprobarlo en la app.

## REGLA PRINCIPAL: lo marcado en el vídeo NO es la respuesta (usuario, 28/11/2026)

El usuario, para pasar rápido, **marca opciones al azar**. Esas marcas son erróneas y **se ignoran siempre**: casillas de la plantilla de respuestas (X, cuadrados rellenos, círculos), opción seleccionada, botones «Estoy seguro / Dudo entre…», puntuaciones, «NO APTO», páginas de revisión y la posición del cursor. Tampoco se usan para deshacer una duda ni como pista.

La respuesta de **cada** pregunta se obtiene comprobando las cuatro opciones contra el enunciado:

- **Conocimientos**: con el texto literal del temario del usuario. En «señale la INCORRECTA», localizar también las tres verdaderas; en «todas / ninguna / A y B», comprobar cada opción.
- **Inglés**: por la regla gramatical, descartando las otras tres una a una.
- **Psicotécnicos**: resolviendo el ejercicio (cálculo o comparación de figuras) y confirmando que solo una opción cumple.

Antes de subir, hacer una **segunda pasada** independiente sobre todas: enunciado (¿pide la correcta o la incorrecta?), respuesta guardada y justificación deben cuadrar. **Las dudosas no se suben** (usuario, 28/11/2026): si la respuesta no se puede demostrar, si otra opción también podría valer, si las opciones están mal redactadas o si la cita en rojo no la prueba, la pregunta se deja fuera (los tres tipos) y se lista al final con el motivo.

Única excepción: si el usuario dice expresamente que ese vídeo muestra la corrección oficial. Aun así, contrastarla con el temario.

## 0. Qué tipo de pregunta es (se decide pregunta a pregunta)

| Tipo | Destino |
|---|---|
| CONOCIMIENTOS | banco **oficial** del tema en `test-oficial-conocimiento.html` |
| INGLÉS | `test-oficial-ingles.html`, tema de gramática que toque |
| PSICOTÉCNICOS | `test-oficial-ingles.html`, tema 42 «Psicotécnicos» |

El tipo lo deduce Claude. Si un vídeo mezcla tipos, o se adjuntan varios de tipos distintos, cada pregunta va a su destino y se avisa claramente (al empezar y en el resumen) de qué tipos ha traído cada vídeo.

**Temas distintos (regla del usuario, 26/11/2026)**: los vídeos pueden ser de cualquier tema, y uno mismo puede mezclar varios. Analizar **cada pregunta** (título del test, enunciado, norma citada y respuesta) y ponerla en el tema que le corresponde, comprobándolo contra el temario del usuario; no dar por hecho que es el Tema 1 ni que todo el vídeo es del mismo tema. La numeración de la academia (p. ej. «Tema 1.1») puede no coincidir con la suya: manda su temario. Cada tema lleva sus propios ids, enlaces y script. En inglés, igual con el tema de gramática; en psicotécnicos, todo al 42. Si una pregunta no encaja en ningún tema de su temario, no meterla a la fuerza: listarla al final.

## 1. Sacar las preguntas (los tres tipos)

- ffmpeg: `C:\Users\ruben\AppData\Local\DVDVideoSoft\lib\ffmpeg.exe`.
- Primero 1 fotograma por segundo en hojas de contacto para entender el vídeo (cuántos tests, cuántas preguntas por test, temas).
- Pantalla (1440p): 3 fps, recortar la zona de preguntas y pasar `prompts/herramientas/ocr-windows.ps1`; agrupar apariciones repetidas y votar el texto. Móvil (baja resolución o scroll rápido): 4-8 fps y leer a ojo.
- **Contar**: preguntas leídas = preguntas de cada test (número de la plantilla). Si falta alguna, volver a esos fotogramas. Ninguna opción cortada ni línea de hueco (`__________`) perdida; el OCR se come esas líneas y confunde «lo»/«10», «El»/«EI».
- Transcripción **literal**: enunciado y 4 opciones en el orden del vídeo. No corregir ni mejorar el texto de la academia; si está mal redactado, decirlo en la explicación.
- La respuesta la resuelve siempre Claude (ver la regla principal); las marcas del vídeo no se transcriben ni se miran. Si hay duda real, no subirla y decirlo al final con el número de pregunta.
- **Repetidas (regla del usuario, 26/11/2026)**: si el **enunciado es el mismo** que el de una pregunta que ya está en la app (o que otra del mismo vídeo), **no se pone**, aunque cambien las opciones o la respuesta. Las que solo **se parecen** (otra redacción) **sí entran**. «Mismo enunciado» = mismo texto ignorando tildes, mayúsculas, signos, espacios y el prefijo con el nombre de la ley. Única excepción: enunciados genéricos («De los recursos. Señale la opción CORRECTA/INCORRECTA», o en inglés y psicotécnicos «Choose the correct option», «Pregunta psicotécnica»), donde la pregunta está en las opciones o en la imagen: ahí es repetida si además las opciones (o la imagen) son las mismas. Comparar con **todo** el banco, no solo con el tema detectado. Al copiar el script modelo, cambiar su criterio (compara enunciado + respuesta). Las preguntas que ya estaban no se borran.
- **Botón «Oficial»**: lo añadido tiene que salir al elegir origen **Oficial** al montar el test. Conocimientos: dentro de `QUESTIONS[tema]` (id `T-N`; nunca en el banco IA ni Forma, sin `-ia-`/`-forma-` en el id). Inglés y psicotécnicos: **sin** `ia:true` ni `sim`. Comprobarlo en el navegador (`preguntasOficialesDe(t)` / `preguntasOficialesDeEN(t)` y el contador del botón).
- Informar al final: preguntas vistas, añadidas por tema, repetidas (cuáles), dudosas, sin tema y no legibles.

## 2. CONOCIMIENTOS

Modelo ya hecho: `prompts/herramientas/oficiales-seras-t1b.js` + `oficiales-seras-t1b.json` (copiarlo y adaptarlo; no escribir otro desde cero).

- La respuesta sale del temario del usuario: esquema de `esquemas.html` (y `esquemas-datos/tN.js`), temario subrayado `expres-subrayado/` y `prompts/temario-limpio/temaN/`. PDF escaneado: `C:\Users\ruben\Desktop\OFICIAL 2026-27\TEMARIO ESCANEADO 2026-27\`. Nunca de memoria.
- Banco oficial del tema, ids `T-N` a continuación del último; `apartado` = nombre de la norma. Detectar el tema y la norma de cada pregunta.
- Explicación, formato fijo y **siempre en este orden** (usuario, 28/11/2026):
  1. **Respuesta correcta**, resaltada.
  2. **En lila**, el artículo y la norma.
  3. **En rojo**, el **párrafo completo** del temario donde está la respuesta.
  4. **Explicación breve de la IA**, en texto normal: por qué es esa y por qué fallan las otras.

  `<span class="ex-resp">Respuesta correcta: <b>B</b> · <mark class="ex-key">respuesta</mark></span><span class="ref-norma">Art. X.Y · Nombre de la norma</span><span class="ref-concepto">"párrafo completo y literal del temario"</span>Explicación breve.`
  (sin letras de opciones en la explicación porque la app baraja; el origen lo añade la app).
- **Qué es «párrafo completo»** (nunca solo el trozo que responde, ni una frase recortada, ni «(…)»):
  - El apartado o párrafo entero, desde su primera palabra hasta su punto final, con todas sus frases.
  - Si la respuesta es una letra o un número de una lista, la frase que introduce la lista y la lista entera de ese apartado.
  - Si las opciones salen de varios párrafos («señale la INCORRECTA», «todas son correctas»), todos esos párrafos enteros.
  - Copiado del temario del usuario, limpiando solo los defectos del escaneado (palabras partidas, cabeceras y pies de página). Si el párrafo cruza de página, unirlo entero.
  - Antes de subir: `node prompts/herramientas/comprobar-citas.js N` en «OK» y revisar que cada cita en rojo empieza y acaba donde empieza y acaba el párrafo en el temario.
- Los tres enlaces deben funcionar:
  - **Esquema**: párrafo exacto en `prompts/herramientas/temaN/mapa-fijo-tN.json` y `esquemas-datos/mapa-preguntas.js` (sin regenerar entero). **Ninguna pregunta se queda sin enlace**: si el párrafo no está en el esquema, se añade literal desde el temario (modelo `prompts/herramientas/oficiales-seras-parrafos.js`) sin descolocar los enlaces existentes. Antes de decir que un texto no está, buscarlo también repartido en varios párrafos.
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
4. Resumen final corto: tipos que traía cada vídeo, dónde han quedado (ids), cuántas, repetidas, dudosas, que la segunda pasada de respuestas se ha hecho y qué no se ha probado.
