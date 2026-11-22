# PROMPT — ESQUEMA CLAVE de un tema (método del Tema 20) — para pegar en otra conversación

Eres Claude Code trabajando para mí. Responde SIEMPRE en español. Carpeta de trabajo REAL: `C:\Users\ruben\Desktop\HTML OFICIAL` (NO la copia de OneDrive). Lee antes `CLAUDE.md` y las memorias `esquema-clave-criterio-10-11`, `esquema-clave-t20-metodo`, `expres-subrayado-reglas-fijas` y `preferencia-subrayado-sobre-oficial`. Tras cada cambio: `node --check`, subir `CACHE_NAME` en `service-worker.js`, commit y push a `origin/main` (añade los archivos UNO A UNO: hay un archivo basura `nul` en la raíz que rompe `git add -A`). **Antes de editar, comprueba con `list_sessions` que no haya otra conversación tocando los mismos archivos** (ya hubo choques).

## ⭐ MÉTODO NUEVO (vigente desde el 21-22/11/2026; hecho en T4, T1, T2 y T3) — usa ESTE
Sustituye al método de abajo salvo que yo pida expresamente «cuadros fieles del temario» (método del T20). Modelos aprobados por mí, que debes LEER ENTEROS antes de empezar: `repaso-t4-esquema-clave-nuevo.html` (el aprobado) y `repaso-t1-/t2-/t3-esquema-clave-nuevo.html` (mismo formato en otros temas). **Copia de ellos CSS, leyenda, colores, botones, audio y scripts; no los reinventes.**

### Qué se entrega
- `repaso-tN-esquema-clave-nuevo.html` en la raíz (el nombre DEBE seguir ese patrón: `clave-extras.js` saca el nº de tema de `repaso-t(\d+)-`). Se conecta en `expres-subrayado/clave-fijos.js` (`EXSUBCLAVE_REPASO[N]`) y en `service-worker.js` (la página, `clave-tests/tN-todo.js` y `clave-tests/tN-esq.js` + subir `CACHE_NAME` en +1). Los borradores antiguos (`repaso-tN-borrador.html`) se quedan en la carpeta; no se borran.
- **Tamaño: entre 10 y 15 páginas IMPRESAS con las trampas y las preguntas y respuestas CERRADAS** (esas dos partes no cuentan). Antes eran 8-10 págs; el límite nuevo lo fijé yo.

### Formato del contenido («para estudiar en media hora y hacer test seguido»)
- Una `<h2>` por norma o bloque (máximo 7: los colores por sección se asignan por ORDEN de los h2 y a partir del 8.º se repiten), `<h3>` por apartado con `<span class="art">arts. N</span>` y las insignias `<span class="ex">EXOF</span>` / `<span class="as">✱</span>` si ese artículo las lleva en mi temario.
- **Listas cortas de datos** (una línea por dato) y **cuadros SOLO donde se comparan o encadenan plazos, categorías, mayorías o sanciones.** Los artículos con **EXOF o sello de examen van ENTEROS en datos**; también ✱ con mucho subrayado mío, fichas R, cuadros del temario, artículos con pregunta OFICIAL (las de IA, id con «-ia-», no cuentan) y sus vecinos inmediatos si tienen subrayado o marca. **La marca EX está contaminada (casi todo la tiene): no la uses como señal.** Reparte las páginas según el peso de cada norma en preguntas oficiales.
- **VERACIDAD: cada dato sale del texto literal de mi temario (`expres/tN.js`: fichas con EXOF/EX/✱/R y «🎯 n preguntas»; cargar con node: `global.window={}` + `eval` + `window.EXPRES_T[N].html`, troceado por `<div class="ex-ficha">`) o de la norma. NO inventes cifras ni plazos.** Si un artículo está recortado en el Exprés, recoge solo lo que aparece y anota lo que dejaste fuera. Si mi subrayado y la copia limpia/oficial difieren, manda mi subrayado.
- **Trampas** (confusiones típicas de plazos, cifras, mayorías y competencias): van al final en `<div class="tr" id="trampas">` OCULTO tras el botón `#btnT` («⚠ Ver las trampas del tema N»). No cuentan para las páginas.

### Estilo de color (aprobado el 22/11/2026, tipo «esquema subrayado»)
Letra NEGRA con el color como FONDO (sin raya inferior: la raya quitaba legibilidad), con estas etiquetas al escribir:
- `<b class="n">` **azul**: plazos, tiempos y cifras · `<b class="v">` **verde**: autoridades y órganos · `<b class="o">` **naranja**: conceptos · `<b class="p">` **lila**: verbos y acciones.
- `<mark>` = **lo que más cae** → se ve en **letra roja** (antes era subrayado naranja/amarillo; no lo cambies).
- **Recuadro rojo** (lo pone el script solo, NO a mano): límites y negaciones (solo, no, sí, sin, único, salvo, excepto, nunca, máx., mín., al menos…). **Verbos en lila** (podrá, puede, debe, decide, emite…) y **tiempos en azul**: también automáticos.
- Más un color de cabecera/tabla por norma. Todo esto va en los bloques `COLORES-INICIO…FIN` y `COLORES2-INICIO…FIN` (CSS) y en el bloque JS `COLORES` del T4; son reversibles (borrar los bloques). Leyenda `<div class="leyenda">` como la del T4.

### Elementos obligatorios (copiar del T4)
1. **Barra de audio 🔊** propia (voz del navegador) con el arreglo anti-descuadre (variable `gen`), clic en un punto para saltar, título en h2 con letra oscura al leerlo, y `limpia()` que ignora «OF» y convierte «→» en pausa.
2. **Bloque de iframe** (`repasoListo`, `repasoAlto`, `claveVista`) para que el botón ⭐ de `expres-subrayado.html` lo muestre sin cortar y la barra de audio siga la pantalla.
3. **Preguntas y respuestas rápidas**: `<div id="rqbox">` plegado tras `#btnQ`, con `.rq-wrap`. Copiarlo del `repaso-tN-borrador.html` antiguo si lo trae; si no, construirlo desde `expres/qN.js` (`EXPRES_Q[N]`: id→[pregunta, respuesta, banderas; 1=oficial]) agrupando por artículo con la tabla `preg` de `expres-subrayado/datos-tN.js`. Poner el nº real en el botón y en `.rq-sub`.
4. **Test «🧠 Hazme las preguntas del esquema clave»**: antes de `</body>`, `<script>window.CLAVE_SOLO_QUIZ=true;window.CLAVE_ALCANCE_TEMA=true;</script><script src="clave-extras.js" defer></script>`. NO se modifica `clave-extras.js` (ya lo trae): oculta los botones «Escuchar» de clave-extras (el esquema usa su propia barra), tiene el **desplegable de alcance «Solo el esquema clave (lo que he estudiado)» / «Todo el tema (app de conocimientos)»** y, **al pulsar «Empezar» (tipo test, sin voz) abre la aplicación de conocimientos con esas preguntas** (`test-oficial-conocimiento.html#repasar=ids&v=…`) para que cuenten mis estadísticas y falladas. «Por voz (modo coche)» y las preguntas rápidas se hacen dentro del esquema.
5. **Datos del test**: `node prompts/herramientas/clave-esquema-nuevo.js N` genera `clave-tests/tN-esq.js` (preguntas de `clave-tests/tN-todo.js` cuya respuesta correcta aparece ≥70 % y cuyo enunciado ≥40 % en el texto del esquema). Es una APROXIMACIÓN por palabras, no un enlace artículo a artículo: dilo siempre así. Hay que regenerarlo si cambia el esquema.

### Cómo se comprueba (siempre, y se dice lo que no se pudo)
- **Páginas impresas**: Chrome headless `--print-to-pdf` y tomar el **MAYOR** de los «/Count N» del PDF (**el primero NO es el total**: ya me equivoqué así y di cifras bajas).
- **Test**: `--dump-dom --allow-file-access-from-files --virtual-time-budget=7000` y mirar `.cq-quiz`: «Preguntas tipo test (N)», «Solo oficiales (M test)», «Preguntas rápidas (K)»; no debe salir «Escuchar el esquema clave».
- **Captura** (`--screenshot --window-size=980,1500`) y mirarla con Read: colores, tablas.
- Cada `<script>` compila con `new Function`; **0 caracteres de control** en el HTML.
- **TRAMPA TÉCNICA FIJA**: al escribir JS/regex con barras invertidas (`\b`, `\s`, `\d`) por heredoc, `node -e` o `sed`, las barras se pierden o se convierten en caracteres de control (ya rompió el audio). Escribe los fragmentos con la herramienta Write en un archivo temporal y reemplaza con un script que lo lea, o usa `String.fromCharCode(92)`.
- No se puede probar dentro de la app, ni el audio con voz real, ni el paso al test, ni la impresión en papel o en el móvil: **dilo en el informe**.

### Reglas de trabajo
- Un solo agente/subagente a la vez; un tema cada vez, en orden. Commit y push SOLO de tus archivos (`git add` con rutas concretas; hay archivos sin seguimiento ajenos y un `nul` en la raíz). Mensajes en español acabando con `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- Informe final en 6 líneas: páginas reales (cerrado), reparto por bloques, nº de preguntas del esquema (total y oficiales), nº de preguntas rápidas, datos dudosos o no verificados, y lo que no pudiste comprobar.

### Estado del método nuevo (22/11/2026)
Hechos: **T4** (modelo; 13 págs; 704 preguntas del esquema, 195 oficiales; 347 rápidas), **T1** (13 págs; 529, 123 oficiales; 325 rápidas), **T2** (14 págs; 511, 87 oficiales; 985 rápidas), **T3** (12 págs; 384 preguntas, 185 oficiales; 215 rápidas). **T5** (22/11/2026; 12 págs; 631 preguntas del esquema, 125 oficiales; 321 rápidas; narrado en 3 partes; h2 numerados 5.1, 5.2, 5.3, 5.5 con H2G [0,1,2,3]; el bloque COLORES del script lleva el mapa de h2 a color PROPIO de cada tema: hay que cambiarlo al copiar de otro tema). **T6** (22/11/2026; 12 págs; 470 preguntas del esquema de 735 del tema, 294 oficiales; 244 rápidas; narrado en 2 partes ≈5.500 y ≈4.900 palabras, hecho con el script `build-audio` de la sesión: esquema + trampas + preguntas oficiales, sin nada de memoria; h2 numerados 6.1 y 6.2 con H2G [0,1], STARTS[6] = [null, /(arts. 1 a 5)/]; 93 artículos desplegables; el generador `clave-mejoras-datos.js` ahora reconoce quáter, quinquies, sexies, octies… y las cabeceras de ficha con marcas SOLO desde el T6, para que T1-T5 salgan idénticos). **T7** (22/11/2026; 10 págs reales; 225 preguntas del esquema de 314 del tema, 100 oficiales de 150; 94 rápidas; narrado en UNA parte ≈6.500 palabras generado con script desde el esquema + trampas + oficiales (palabras totales < 5.400×2, así que P=1), con títulos numerados «7.1 …»/«7.2 …» y las referencias a la Constitución dichas como «precepto N» para que el esquema no salte a un artículo de la ley; h2 7.1 (LO 2/1979) y 7.2 (LO 1/1982) con H2G [0,1] y STARTS[7] = [null, /PREÁMBULO/]; `clave-tests/t7-todo.js` se REHIZO como unión de todas las preguntas (antes solo traía 153 de 314); solo 35 artículos desplegables porque arts. 4, 9, 10, 14, 33, 43, 51, 58… están en el Exprés como cuadros dentro de otra ficha y no tienen cabecera «Artículo N»; las referencias a la Constitución van escritas «artículo» entero, nunca «art.», para que no se vuelvan desplegables). Pendiente: el resto de temas, de uno en uno, y la capa de colores se aprobó solo sobre el T4 (vista en captura, no en la app). Las dudas de contenido de cada tema están en el informe de su commit.
Ojo en `clave-fijos.js`: puede haber DOS entradas con la misma clave en `EXSUBCLAVE_REPASO` (la de abajo pisa a la de arriba); al conectar un tema, busca y comenta la antigua (pasó con el T3).

## 🧩 MEJORAS COMUNES (23/11/2026; hechas en T1-T4) — OBLIGATORIAS en todo tema nuevo (T5, T6, T7, T8…)
Todo esto lo aporta `clave-mejoras.js` (un solo script común) + datos por tema. Un agente nuevo debe poder repetir el resultado sin tocar el código común, salvo la línea `PARTES`, las constantes `STARTS`/`H2G` del generador y la lista `[1,2,3,4]` del botón ⭐ del test.

### 1) Estructura de la página del tema (de ella dependen los generadores)
- `<h2>` por norma (máx. 7, numerados «N.M …» con M = orden de la norma dentro del tema; `H2G` y `STARTS` usan ese número), `<h3>` por bloque con `<span class="art">arts. X-Y</span>` (las citas «art. 13» / «arts. 5-9» del texto se vuelven desplegables).
- `<button id="btnQ">` (preguntas rápidas, `#rqbox` justo después), `<button id="btnT">` + `<div class="tr" id="trampas">`, barra `#aud`, y los bloques `COLORES-INICIO…FIN` / `COLORES2-INICIO…FIN`. **Todo lo que está antes de `#btnQ` es «el esquema»**: de ahí sacan texto los generadores.
- Al final, **en este orden**: `<script>window.CLAVE_SOLO_QUIZ=true;window.CLAVE_ALCANCE_TEMA=true;</script><script src="clave-extras.js" defer></script><script src="clave-mejoras.js" defer></script>`. Sin la tercera etiqueta no hay ninguna de las mejoras.

### 2) Qué hace `clave-mejoras.js` (no se edita por tema, salvo `PARTES`)
- **🖨 Imprimir solo el esquema**: oculta trampas, rápidas, test, audio y botones.
- **🎯 Oficiales / Todas** junto a cada título `h2/h3`: abre `test-oficial-conocimiento.html` con las preguntas de esa parte (datos `clave-tests/tN-sec.js`, `CLAVE_SEC[N]`). Aproximación por palabras (respuesta ≥70 %, enunciado ≥30 % del bloque); las oficiales van antes que las de IA (`-ia-` en el id).
- **Subrayado amarillo** = importante pero menos que lo caído en examen (`clave-tests/tN-amar.js`, `CLAVE_AMAR[N]`): regla de trigramas = tríos de palabras (sin acentos, ≥2 significativas) del esquema que salen en la respuesta correcta de preguntas de IA y NO en las oficiales. También junta marcas contiguas del mismo color.
- **Artículos citados desplegables**: al pulsar «art. N» se abre debajo la redacción del Exprés con el subrayado del usuario (`clave-arts/tN.js` = índice por norma y `clave-arts/tN-f.js` = fichas; se cargan bajo demanda). Otro clic lo cierra.
- **🎧 Narrador**: botones «Narrado parte p de P (≈30 min)». Nº de partes por tema en la línea `var PARTES = ({ 1: 3, 2: 2, 3: 3, 4: 2 })[NT] || 1`: **añadir ahí el tema nuevo** (p. ej. `5: 2`). Claves de los datos: `CLAVE_AUDIO['N']` (parte 1) y `CLAVE_AUDIO['N-2']`, `['N-3']`… Con 1 parte sale un solo botón «Modo coche narrado». El panel del narrador conserva la barra `#aud` original del esquema.
- **Móvil**: letra grande solo en vertical (mira la ventana PADRE si está en iframe: `parent.innerHeight>=innerWidth`; en horizontal no se agranda), `text-size-adjust:100%` y tablas con scroll horizontal.
- Abre el apartado concreto si la URL lleva `#q=ID` (lo usa el botón ⭐ del test de conocimientos).

### 3) Generador de datos: `node prompts/herramientas/clave-mejoras-datos.js N`
Crea `clave-arts/tN.js`, `clave-arts/tN-f.js`, `clave-tests/tN-sec.js` y `clave-tests/tN-amar.js` (necesita antes `repaso-tN-esquema-clave-nuevo.html`, `expres/tN.js` y `clave-tests/tN-todo.js`). **Para un tema nuevo hay que añadir su configuración dentro del propio script:**
- `STARTS[N]` = array de regex del título de bloque del Exprés (`<div class="bloque-titulo">`) donde EMPIEZA cada norma (la primera es `null`; p. ej. T4: `[null,/^4\.2 /,/^4\.3 /,…]`). Un grupo = una norma.
- `H2G[N]` (solo si hace falta) = grupo de cada `<h2>` cuando no sea «M-1» (p. ej. T3: `[0,0,0,1,1,1,1]`).
- Revisa la salida: «artículos desplegables N · bloques con preguntas a/b · amarillo K tríos». Si un artículo citado no está en el Exprés, simplemente no se despliega. Regenerar si cambia el esquema.

### 4) `clave-tests/tN-todo.js` y `tN-esq.js` (los necesita también el test de conocimientos)
- `tN-todo.js` (`CLAVE_TODO[N]`) = todas las preguntas del tema (oficiales + IA); ya existe para T1-T26 en `clave-tests/`. Si no existe, se genera con `node prompts/herramientas/clave-tests.js` (mira su cabecera).
- `tN-esq.js` (`CLAVE_ESQ[N]` = ids) = `node prompts/herramientas/clave-esquema-nuevo.js N` (respuesta ≥70 % y enunciado ≥40 % en el esquema).
- **Botón «⭐ Ver en el esquema clave»** en la explicación de cada pregunta de `test-oficial-conocimiento.html` (dentro de `window.explicBoxHTML`): carga `clave-tests/tN-esq.js` bajo demanda y, si el id está en `CLAVE_ESQ[N]`, enlaza a `repaso-tN-esquema-clave-nuevo.html#q=ID`. **Hoy está limitado a `[1, 2, 3, 4].includes(+t)`: al cerrar un tema nuevo AÑADE su número a esa lista.**

### 5) Narrado (`clave-audio/tN.js`, `tN-2.js`…)
- Formato: `(window.CLAVE_AUDIO=window.CLAVE_AUDIO||{})[N]={"titulo":"Tema N · Esquema clave narrado, parte 1 de P","secciones":[{"t":"Introducción","p":["párrafo 1","párrafo 2"]},{"t":"Nombre de norma","p":[…]}]};` y la parte 2 con clave string `["N-2"]`. Un fichero por parte.
- **≈30 min por parte = ≈5.000-5.800 palabras.** P = palabras totales / 5.400; **partes equilibradas**, repartidas por normas completas. Cada parte abre con «Bienvenido…» y qué se verá; la última se despide.
- Texto hablado: números en letra («2016 barra 399»), sin símbolos ni «→», frases cortas.
- **REGLA ESTRICTA: solo datos que estén en el esquema, en el Exprés (`expres/tN.js`) o en las preguntas del tema. NADA de memoria ni de conocimiento general.** Si dudas de un dato, no lo cuentes.
- Debe incluir las **trampas** del tema, **plazos, cifras, mayorías y autoridades**, y **preguntas de examen** («esto ha caído en examen…», de las oficiales/EXOF) con su respuesta.
- Después actualiza `PARTES` y haz `node --check` de cada fichero.
- **El esquema sigue a la voz (automático, lo hace `clave-mejoras.js`; no hay que tocar nada por tema):** al narrar, el esquema se desplaza y resalta en amarillo (`.cl-leyendo`) la línea del artículo nombrado. **No abre el desplegable del artículo** (lo abre el usuario al pulsar la cita `art. N`). Para que funcione al escribir el narrado:
  - Cada sección del narrado empieza con el número del apartado del esquema en el título (`"t":"2.3 Diligencia debida…"`), que debe coincidir con el `<h2>` «2.3 · …». Sin número, esa sección no se sincroniza.
  - Nombra los artículos en letra y tras la palabra «artículo/artículos» («artículo treinta y cinco», «artículos cuatro y cinco», «artículos 5 a 9», «artículo veintiséis ter»). Las citas del esquema deben ir como `art. N` / `arts. N-M` (las convierte en desplegables `clave-arts/tN.js`).
  - Panel en móvil: una sola línea + botones; oculta la barra «Escuchar». Muestra «· vNNN» al final de la línea: sirve para saber qué versión corre.
  - En la app el esquema va en iframe: el scroll lo hace `expres-subrayado.html` (mensaje `claveScroll`). Al cambiar `clave-mejoras.js`, subir el `?v=` de su `<script>` en las páginas `repaso-tN-esquema-clave-nuevo.html` y la CACHE del service worker (los `.js` se sirven de caché y se refrescan en segundo plano).

### 6) Lista de comprobación final (antes del commit)
1. `service-worker.js`: añadir a `APP_SHELL` `repaso-tN-esquema-clave-nuevo.html`, `clave-tests/tN-todo.js`, `tN-esq.js`, `tN-sec.js`, `tN-amar.js`, `clave-arts/tN.js`, `tN-f.js`, `clave-audio/tN.js` (+ `tN-2.js`…) y **subir `CACHE_NAME` en +1**.
2. `expres-subrayado/clave-fijos.js`: entrada `N: "repaso-tN-esquema-clave-nuevo.html"` (comenta la antigua: la de abajo pisa a la de arriba).
3. `PARTES` en `clave-mejoras.js`, `STARTS/H2G` en el generador y el `[1,2,3,4]` del botón ⭐ en `test-oficial-conocimiento.html`.
4. `node --check` de todos los `.js` nuevos; cada `<script>` del HTML con `new Function`; 0 caracteres de control.
5. **Pruebas con Chrome sin pantalla** (`--headless=new --dump-dom --allow-file-access-from-files --virtual-time-budget=7000`): salen los botones 🎯 y 🎧, hay subrayado amarillo, y al simular clic en una cita se abre el artículo; PDF con `--print-to-pdf` (mayor «/Count»); captura a 980 px y otra en ventana estrecha vertical.
6. **Commit y push SOLO de tus archivos**, uno a uno con `git add ruta`. NUNCA `boceto-marcas-laterales.html`, `esquemas-datos/citas-temario2.js`, `nul` ni `prompts/temario-limpio/`. Mensaje en español acabando con `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
7. Informe: di lo que no pudiste probar (audio con voz real, impresión en papel, móvil real, dentro de la app).

---

## MÉTODO ANTERIOR (cuadros fieles del temario, T20) — solo si lo pido
## Qué es
El botón ⭐ **Esquema clave** de `expres-subrayado.html` abre, para un tema, un HTML `repaso-tN-borrador.html` enganchado en `expres-subrayado/clave-fijos.js` (`window.EXSUBCLAVE_REPASO = { N: "repaso-tN-borrador.html" }`) y añadido a `APP_SHELL` de `service-worker.js`. Tiene TRES partes:

1. **RESUMEN (10-12 págs A4 reales como máximo)** = *tus cuadros del temario rehechos con su forma* + unas pocas fichas de artículos sueltos. Es lo único que cuenta para el límite.
2. **Fichas R (R1…Rn)** al final, en **pregunta → respuesta** (respuesta azul en negrita entre corchetes, insignia R en círculo). NO cuenta para las págs.
3. **Preguntas rápidas por artículo** al final (hasta 3 por artículo, oficiales primero, sello OF, respuesta en azul). NO cuenta para las págs.

## Criterio de qué entra en el RESUMEN (lo fijé yo)
- Los **cuadros/esquemas** del temario subrayado (flujos, árboles, tablas de plazos, comparativas, recuadros «Norma del art. X») entran SIEMPRE, **rehechos con la misma forma que en mi temario** (ramas, cajas, flechas, líneas de tiempo, ✖, notas a boli) y con mi fosforito. NO los conviertas en listas verticales ni en texto plano: eso no me sirve. Si un cuadro es demasiado complejo para rehacerlo fiel, pon mi propia foto recortada de la página.
- Después, fichas de artículos sueltos por puntuación: pregunta OFICIAL enlazada (las de IA no cuentan) + EXOF + fichas R (+ ✱), con peso por subrayado; texto LITERAL con mis colores.
- Si con los cuadros ya llegas a 12 págs, quedan pocas fichas: es lo esperado.

## Cómo se hace (pasos y herramientas)
1. **Localizar los cuadros.** El PDF escaneado del tema está en `C:\Users\ruben\Desktop\OFICIAL 2026-27\TEMARIO ESCANEADO 2026-27\TEMA N …-08-08-2026.pdf` (el nº de página del PDF = el que sale en los datos, p. ej. «pág. 87»). Los cuadros conocidos salen de `expres-subrayado/cuadros-tN.js` y `tN-cuadros-map.json` (son versiones antiguas en lista vertical: sirven solo para saber DÓNDE están). Renderiza páginas con PyMuPDF: `py -I -c "import pymupdf; d=pymupdf.open(r'RUTA.pdf'); d[N-1].get_pixmap(dpi=85).save(r'salida.png')"` (sin Python normal: usa `py`). Mira cada página con Read.
2. **Elegir** qué cuadros entran (todos los del tema salvo los que sean puro texto de artículo) y transcribirlos fielmente (texto literal; revisa cifras y plazos dos veces).
3. **Escribir `prompts/herramientas/repaso-cuadros-tN.js`** (plantilla: `repaso-cuadros-t20.js`) exportando `{ cuadros: [{ antes: RegExp, html }], soloPropios: true }`. `antes` = cabecera de la ficha del Exprés ANTES de la cual va el cuadro (usa `(?!\d)` para no confundir 27 con 270). Helpers del módulo: `esq`, `caja`, `bif` (ramas), `fl` (flecha), `tabla2`, `lineaTiempo`, y los colores `y d a p c k`. Cuidado al editar con `sed`/`node -e`: se cuelan caracteres de control (`\b`); escribe los scripts con Write, no en línea.
4. **Generar el resumen**: `node prompts/herramientas/repaso-hibrido.js N PRESUPUESTO 0` (presupuesto en caracteres de fichas; sube/baja hasta que el PDF mida 10-12 págs). Si existe `repaso-cuadros-tN.js` sustituye a los cuadros del Exprés.
5. **Medir las páginas SIEMPRE con Chrome headless** (no con estimaciones): `chrome.exe --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf=x.pdf file:///…/repaso-tN-borrador.html` y contar `/Type /Page`. Para medir solo el resumen ejecuta con `SIN_EXTRA=1`.
6. **Añadir R y preguntas rápidas** (no cuentan): `repaso-hibrido.js` ya las añade; en un repaso ya hecho a mano usa `node prompts/herramientas/repaso-extras.js N` (idempotente). Las **R deben ir en pregunta → respuesta** (como en `prompts/herramientas/tema20/r-temario-t20.js`): si el tema solo las tiene como enunciado suelto, REESCRÍBELAS en pregunta → respuesta con el texto literal antes de darlo por cerrado. Las preguntas rápidas salen solas de `expres/qN.js` (regenerar con `preguntas-rapidas.js` si cambió el Exprés).
7. **Enganchar** en `clave-fijos.js` y `service-worker.js` (APP_SHELL + subir caché), mirar capturas del PDF (un cuadro, una ficha, R y rápidas), commit y push.

## Cosas que NO debes dar por hechas
No he probado nunca impresión en papel ni móvil real. Los colores de fosforito de los cuadros son aproximados. Dime qué cuadros dejaste fuera y qué no pudiste verificar.

## Estado
Hecho con este método completo: **Tema 20**. Los **temas 2, 3 y 21** tienen el resumen anterior (sin cuadros fieles) + R y rápidas añadidas con `repaso-extras.js`; falta rehacer sus cuadros con la forma del temario y pasar sus R a pregunta → respuesta.

## Tu tarea ahora
Haz el Esquema clave del **Tema __ (indicar)** siguiendo todo lo anterior y, al acabar, resume en 5 líneas: págs del resumen, nº de cuadros, nº de fichas, nº de R y de preguntas rápidas, y lo que quedó sin verificar.
