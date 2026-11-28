# Vídeos con preguntas tipo test → aplicaciones de estudio

**Este es el único prompt para vídeos.** El usuario solo adjunta el vídeo (uno o varios) y pega esto, sin indicar tipo ni tema:

```
Lee y sigue entera la guía C:\Users\ruben\Desktop\HTML OFICIAL\prompts\PROMPT_VIDEOS_TEST.md con los vídeos que adjunto. Hazlo todo de principio a fin sin preguntarme.
```

Responde siempre en español. Carpeta de trabajo real: `C:\Users\ruben\Desktop\HTML OFICIAL` (no la copia de OneDrive). Los vídeos se hacen de uno en uno, de principio a fin, sin preguntar entre pasos. Que un vídeo esté en una carpeta llamada «ya en la aplicación» no significa que esté metido: comprobarlo en la app.

**Marca « OK» (usuario, 28/11/2026)**: cuando un vídeo esté terminado (preguntas subidas y comprobadas), **renombrar el archivo añadiendo « OK» al final, antes de la extensión** (`Nombre del vídeo OK.mp4`), sin sobrescribir nada. Así el usuario sabe cuáles ya ha entregado. No se marca un vídeo a medias. Si un vídeo adjunto ya termina en « OK», avisarlo antes de repetir el trabajo.

## REGLA PRINCIPAL: lo marcado en el vídeo NO es la respuesta (usuario, 28/11/2026)

El usuario, para pasar rápido, **marca opciones al azar**. Esas marcas son erróneas y **se ignoran siempre**: casillas de la plantilla de respuestas (X, cuadrados rellenos, círculos), opción seleccionada, botones «Estoy seguro / Dudo entre…», puntuaciones, «NO APTO», páginas de revisión y la posición del cursor. Tampoco se usan para deshacer una duda ni como pista.

La respuesta de **cada** pregunta se obtiene comprobando las cuatro opciones contra el enunciado:

- **Conocimientos**: con el texto literal del temario del usuario, contrastando las fuentes que haya: temario oficial, temario subrayado y esquema. Si ninguna opción coincide con el temario, es dudosa. En «señale la INCORRECTA», localizar también las tres verdaderas; en «todas / ninguna / A y B», comprobar cada opción.
- **Inglés**: por la regla gramatical, descartando las otras tres una a una.
- **Psicotécnicos**: resolviendo el ejercicio (cálculo o comparación de figuras) y confirmando que solo una opción cumple.

Antes de subir, hacer una **segunda pasada** independiente sobre todas: enunciado (¿pide la correcta o la incorrecta?), respuesta guardada y justificación deben cuadrar. **Las dudosas no se suben** (usuario, 28/11/2026): si la respuesta no se puede demostrar, si otra opción también podría valer, si las opciones están mal redactadas o si la cita en rojo no la prueba, la pregunta se deja fuera (los tres tipos) y se lista al final con el motivo.

**Nada por interpretación (usuario, 28/11/2026: «elimínalas, ya que hay dudas»)**: si para decidir la respuesta hay que **interpretar, deducir o elegir la «más razonable»**, es dudosa y **no se sube**, aunque se tenga una opinión clara. No vale subirla y avisar después. Ejemplos reales eliminados: deducir que un caso es domicilio y por eso no cabe el registro; dar por buena «todas» porque ninguna parece excluida; encajar «el parte no exige calificación jurídica»; una opción que dice «muy grave» cuando el temario dice «grave»; una «incorrecta» que solo se distingue porque **omite una palabra o condición** («jamás», «pacífica»). Antes de cerrar, repasar la lista de respuestas que habría que advertir en el resumen: **si hay que advertirla, sacarla** (`oficiales-seras-28-11-quitar.js`, sin renumerar).

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
- **Casos que han salido dudosos** (no subir): dos opciones correctas; «todas son correctas» con una falsa; «señale la incorrecta» o «cuál NO» donde las cuatro son válidas; enunciado sin «señale» donde valen varias; opción cortada en origen; la única diferencia es que una opción **omite una palabra o condición** (desde el 28/11/2026 ya no se sube); ninguna opción reproduce bien el artículo.
- **Repetidas (regla del usuario, 26/11/2026)**: si el **enunciado es el mismo** que el de una pregunta que ya está en la app (o que otra del mismo vídeo), **no se pone**, aunque cambien las opciones o la respuesta. Las que solo **se parecen** (otra redacción) **sí entran**. «Mismo enunciado» = mismo texto ignorando tildes, mayúsculas, signos, espacios y el prefijo con el nombre de la ley. Única excepción: enunciados genéricos («De los recursos. Señale la opción CORRECTA/INCORRECTA», o en inglés y psicotécnicos «Choose the correct option», «Pregunta psicotécnica»), donde la pregunta está en las opciones o en la imagen: ahí es repetida si además las opciones (o la imagen) son las mismas. El **título de sección** que antepone la academia («Disposiciones comunes.», «Tribunal Europeo de Derechos Humanos.», «De la cooperación internacional…») tampoco cuenta: si la pregunta de detrás es la misma, es repetida (también «principio» / «principio/s», «solo» / «sólo»). Comparar con **todo** el banco, no solo con el tema detectado, **antes de insertar y otra vez al final** (`video/ocr-temario/dup.js`, `dup2.js`, `dup3.js`); las propias que resulten repetidas se retiran con `oficiales-seras-28-11-quitar.js`, sin renumerar. Al copiar el script modelo, cambiar su criterio (compara enunciado + respuesta). Las preguntas que ya estaban no se borran.
- **Botón «Oficial»**: lo añadido tiene que salir al elegir origen **Oficial** al montar el test. Conocimientos: dentro de `QUESTIONS[tema]` (id `T-N`; nunca en el banco IA ni Forma, sin `-ia-`/`-forma-` en el id). Inglés y psicotécnicos: **sin** `ia:true` ni `sim`. Comprobarlo en el navegador (`preguntasOficialesDe(t)` / `preguntasOficialesDeEN(t)` y el contador del botón).
- Informar al final: preguntas vistas, añadidas por tema y **por vídeo**, repetidas, dudosas, sin tema y no legibles.

### Método de lectura que funcionó (14 vídeos, 28/11/2026)

Scripts en `prompts/herramientas/video/ocr-temario/` (ver su `LEEME.md`).

1. Fotogramas con `mpdecimate`: móvil 1290x2796 a **4 fps** quitando la barra superior (`crop=1290:2400:0:200`); pantalla 1440p a 3 fps (`crop=2560:1240:0:100`); pantalla 1080p a 3 fps.
2. OCR de Windows también en los de móvil (se leen muy bien). En **1080p ampliar ×1,5 antes** (`crop=1920:950:0:130,scale=iw*1.5:ih*1.5:flags=lanczos`): sin ampliar se pierden palabras cortas («su», «a»).
3. `parse.js`: descarta la columna lateral («Sin responder aún», navegación), agrupa apariciones y vota el texto. `rev.js`: quita repetidas contra el banco y entre vídeos.
4. `fix.js`: corrige confusiones del OCR con el vocabulario del temario (IOS→los, o/a, 0→o, EI→El). Revisar a ojo lo que quede.
5. **Las preguntas partidas en dos pantallas no las junta el programa**: `inc.js` lista las capturas incompletas sin pareja («FALTA»); leer esos fotogramas (mosaico de 6 con ffmpeg `tile`) o su OCR (`frames.js`, `busca.js`) y transcribirlas a mano. Revisar también los enunciados que empiezan con «serás Tiempo restante» y las líneas de hueco.
6. Comprobar con el fotograma toda opción donde una errata pueda cambiar el sentido.

## 2. CONOCIMIENTOS

Modelo vigente: `prompts/herramientas/oficiales-seras-28-11.js` + un lote `oficiales-seras-28-11-dN.json` (cada pregunta: `t, v, pregunta, opciones, correcta, lila, rojo, exp, apartado, par, pz, sec`). Asigna los ids, salta repetidas y pone mapa de esquema, subrayado y Esquema clave; se puede volver a pasar. Auxiliares: `-parrafos.js` (párrafo que falta en el esquema), `-quitar.js`, `-piezas.js` (piezas nuevas del subrayado). Copiarlos cambiando la fecha; no escribir otros desde cero. En `video/ocr-temario/`: `temario.js` (artículo limpio del temario), `build.js` (monta el lote desde las respuestas, ejemplo `d1.js`), `link.js` (calcula esquema, pieza y apartado clave).

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
  - Quitar también recuadros-resumen, notas al pie, marcas «R8» y números de nota pegados a una palabra, que el texto del temario mezcla dentro del artículo.
  - Si el artículo es muy largo, citar el apartado o la letra completa que prueba la respuesta (con su frase introductoria), no el artículo de varias páginas.
  - Revisar de cada cita el principio, el final y la longitud (una de 5 caracteres o de miles es un corte mal hecho).
  - Antes de subir: `node prompts/herramientas/comprobar-citas.js N` en «OK» y revisar que cada cita en rojo empieza y acaba donde empieza y acaba el párrafo en el temario.
- **Los tres enlaces son obligatorios en el 100 % de las preguntas del tema** (usuario, 28/11/2026: «vincula todas las preguntas con el esquema clave, con el subrayado y con el esquema»), no solo en las nuevas. Comprobar con `node prompts/herramientas/comprobar-enlaces.js N`: debe dar 0 en «sin esquema», «sin subrayado» y «sin esquema clave». Lo que falte se completa en la misma tarea.
  - **Esquema**: párrafo exacto en `prompts/herramientas/temaN/mapa-fijo-tN.json` y `esquemas-datos/mapa-preguntas.js` (sin regenerar entero). **Ninguna pregunta se queda sin enlace**: si el párrafo no está en el esquema, se añade literal desde el temario (modelo `prompts/herramientas/oficiales-seras-parrafos.js`) sin descolocar los enlaces existentes. Antes de decir que un texto no está, buscarlo también repartido en varios párrafos.
  - **Subrayado**: `expres-subrayado/tN-preg-extra.json` y `datos-tN.js`. Si falta el artículo, recortarlo del PDF con `expres-subrayado-anadir-piezas.py` (usar `/c/Users/ruben/bin/py`), revisar la imagen y añadir la pieza a `datos-tN.js`. Páginas tachadas o MOD no se usan. Los protocolos usan su propia pieza (en T1: `q-ad`, `q-7`, `q-13`), no el número de artículo. Si no está en el PDF subrayado, decirlo.
    La pieza se asigna **por la ficha o artículo de cada pregunta**, nunca «por mayoría» ni por número de artículo a secas (en protocolos y preámbulos manda a la norma equivocada). Las preguntas de preámbulos y disposiciones suelen quedarse sin pieza: revisarlas.
  - **Esquema clave**: ver el apartado siguiente.
- **Si el tema no tiene esquema clave nuevo (`repaso-tN-esquema-clave-nuevo.html`), o solo un borrador, se hace** (con `prompts/PROMPT_ESQUEMA_CLAVE.md`) **y se enlazan todas sus preguntas.** No basta con decir que no existe.
- Si falta el esquema o el subrayado de una norma y no se puede crear desde su temario, decirlo.

### Esquema clave con TODAS las preguntas enlazadas (método del T26, 28/11/2026)

Los generadores genéricos solo enlazan las preguntas cuyas palabras salen en el esquema; para enlazar todas:

- Modelo: `prompts/herramientas/tema26/clave-t26.js`. Un `<h3 data-k>` por ficha del esquema (la ficha de cada pregunta sale de `mapa-preguntas.js`). Se imprime el texto del Exprés subrayado y las oficiales que ese texto no recoge; el dato del resto va en desplegables solo de pantalla (`details`, entre `<!--PANT-->` y `<!--/PANT-->`, que no se imprimen ni se narran). `clave-mejoras.js` abre el desplegable y marca la línea al llegar con `#q=ID`.
- Orden de la cadena: `clave-tests.js N` → `temaN/clave-tN.js` → `clave-armar.js N` → `clave-mejoras-datos.js N` → `temaN/clave-tN.js enlaces` → `clave-of-datos.js N` → `clave-narrar.js N`; la primera vez además `clave-conectar.js N P` y subir el `?v=` de `clave-mejoras.js` en esa página.
- **Al añadir o quitar preguntas de un tema hecho así (hoy el T26), usar esa cadena.** No pasar `clave-esquema-nuevo.js` después: borra `CLAVE_LINK` (la lista de todas las enlazadas). Al insertar vídeos después, comprobar que el insertador no haya reescrito `tN-sec.js` o `tN-esq.js`.
- Antes de generar, unir `clave-tests/tN.js` y `tN-todo.js` (lo hace `clave-t26.js`): `-todo` solo trae «el resto» y se quedaban preguntas sin enlace (106 en el T26).
- Para otro tema, copiar el script cambiando las normas (`clave-contenido/tN-auto.json`), la ficha donde empieza cada una y `STARTS[N]` en `clave-mejoras-datos.js`. Máximo 8 `<h2>` contando comparativas.
- `clave-conectar.js` añade el tema a la lista del botón ⭐ del test; comprobar que está.
- Decir en el resumen las páginas reales y que el esquema generado automáticamente no se ha revisado línea a línea.
- `mapa-preguntas.js` tiene cambios antiguos sin commitear: commitear solo las entradas nuevas (`video/ocr-temario/commit.sh`: parte de `git show HEAD:...`, añade las nuevas, quita las retiradas y usa `git hash-object` + `git update-index`). No subir esos cambios ajenos ni los archivos sin seguimiento que ya hubiera.
- Con muchos vídeos, ir **por lotes** (una norma cada vez), insertando y commiteando cada lote para no perder trabajo.

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

1. **Segunda pasada**: releer cada respuesta contra su cita y pasar `video/ocr-temario/paso2.js` (marca incoherencias entre la opción elegida y la cita); revisar a ojo todo lo marcado. Si la segunda pasada ha sido solo automática, decirlo.
2. **Cobertura**: comparar cada test con su numeración para confirmar que no falta ninguna. Si no se ha hecho, decirlo claramente en el resumen.
3. Repetidas otra vez (`dup.js`, `dup2.js`, `dup3.js`).
4. Sintaxis de los `<script>` del HTML y de los `.js` tocados.
5. Enlaces: ninguno roto (`mapok.js`) y ninguno ausente en todo el tema (`comprobar-enlaces.js N`).
6. Navegador (`preview_start` «estudio-node»): borrar service worker y cachés antes de probar (si no, carga datos antiguos y parece que el enlace falla); comprobar todas las nuevas por script (origen Oficial, explicación, imagen, enlaces) y abrir a ojo un ejemplo de cada enlace. En el esquema clave, abrir con `#q=ID` y ver que llega a su línea.
7. `node prompts/herramientas/bump-cache.js`, commit solo de lo propio y push a `origin main`.
8. **Renombrar cada vídeo terminado añadiendo « OK»** (regla del principio).
9. Resumen final corto: tabla por vídeo (tipo y cuántas añadidas), ids, repetidas, tabla de **no subidas** con norma, pregunta y motivo, qué segunda pasada se ha hecho y qué no se ha probado.

## 6. Trampas ya sufridas en este equipo

- Un comando largo con `<<EOF` se corta: los scripts largos se escriben con la herramienta de escribir archivos.
- La consola se come barras invertidas al sustituir texto (`\b`, `\s`, `\d`): usar `String.fromCharCode(92)` o editar el archivo directamente.
- Python: `/c/Users/ruben/bin/py -I`.
