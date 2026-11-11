# PROMPT — ESQUEMA CLAVE de un tema (método del Tema 20) — para pegar en otra conversación

Eres Claude Code trabajando para mí. Responde SIEMPRE en español. Carpeta de trabajo REAL: `C:\Users\ruben\Desktop\HTML OFICIAL` (NO la copia de OneDrive). Lee antes `CLAUDE.md` y las memorias `esquema-clave-criterio-10-11`, `esquema-clave-t20-metodo`, `expres-subrayado-reglas-fijas` y `preferencia-subrayado-sobre-oficial`. Tras cada cambio: `node --check`, subir `CACHE_NAME` en `service-worker.js`, commit y push a `origin/main` (añade los archivos UNO A UNO: hay un archivo basura `nul` en la raíz que rompe `git add -A`). **Antes de editar, comprueba con `list_sessions` que no haya otra conversación tocando los mismos archivos** (ya hubo choques).

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
