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
Hechos: **T4** (modelo; 13 págs; 704 preguntas del esquema, 195 oficiales; 347 rápidas), **T1** (13 págs; 529, 123 oficiales; 325 rápidas), **T2** (14 págs; 511, 87 oficiales; 985 rápidas), **T3** (en curso al escribir esto). Pendiente: el resto de temas, de uno en uno, y la capa de colores se aprobó solo sobre el T4 (vista en captura, no en la app). Las dudas de contenido de cada tema están en el informe de su commit.

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
