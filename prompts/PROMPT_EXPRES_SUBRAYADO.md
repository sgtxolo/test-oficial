# PROMPT · Exprés subrayado (expres-subrayado.html)

Esta guía resume todo lo hecho con la app «Exprés subrayado» (Temas 1 y 7 terminados) para repetirlo en otro tema (por ejemplo el Tema 11) sin volver a descubrirlo.

## Qué es la app
`expres-subrayado.html` enseña, artículo a artículo, **recortes de la captura del PDF subrayado a mano por el usuario** (la copia escaneada de su temario, con OCR), en el mismo orden y con los mismos artículos que el Exprés de `esquemas.html`. Se le suman:
- los **cuadros de esquema** de Esquemas (`visuales-tN.js`),
- las **marcas** EXOF / EX / ✱ / R de cada artículo (misma regla que Esquemas),
- el botón **«Ver en mi temario subrayado»** en la app de test y **«📑 Mi subrayado»** en cada ficha del Exprés de Esquemas (enlaces en los dos sentidos),
- **impresión híbrida** (por artículo: mi subrayado recortado / entero, Exprés, Exprés con (…) abiertos, esquema),
- marcas propias, panel de estudio, sincronizar (GitHub), etc.

URL publicada: https://sgtxolo.github.io/test-oficial/expres-subrayado.html

## Reglas de trabajo (del usuario)
- Responde SIEMPRE en español. Sé honesto: di qué has probado de verdad y qué no (móvil, impresora…).
- Trabaja en **C:\Users\ruben\Desktop\HTML OFICIAL** (no en la copia de OneDrive). Cada cambio: commit y `git push` a origin (main). Subir la versión de caché con `node prompts/herramientas/bump-cache.js`.
- Si el cambio es grande o ambiguo, **cuéntale el plan antes de hacerlo** («dímelo antes de hacer nada»).
- Verifica en el navegador (preview `esq`, puerto 8777, sirve la carpeta de Escritorio). Al probar: desregistra el service worker y borra cachés, fronta la pestaña y fija un viewport (`resize_window`); las capturas reducen la ventana, así que mide con JS además de mirar.
- NUNCA imprimas ni copies el token de GitHub (está en `sincronizacion esquemas con dispositivos.txt`, ignorado por git). No lo leas con `cat`.

## Trampas de herramientas (ya nos pasaron)
- En Bash, `node -e '...'` y los heredocs **pierden las barras invertidas** (`\d`, `\s`, `\\`): escribe los scripts con la herramienta Write (o Edit) y ejecútalos. Para `Edit`, hay que `Read` antes el archivo.
- Un comentario `// …` pegado en medio de una línea de JS se come el resto de la línea.
- `rm` sobre carpetas con comodín está bloqueado: no hace falta, los scripts sobrescriben.
- Los `<span>` dentro de los cuadros reciben estilo de «globo» (`.vis-sub span`): las marcas de texto usan un elemento propio `<pm-m>`.
- El OCR estropea «ARTÍCULO» (`�T�CULO`, `LRT�CULO`, `mcULO`…) y a veces el número («1.» por «13.»).

## Archivos y herramientas
- Datos por tema (en `expres-subrayado/`): `tN-instrumentos.json` (normas: `id`, `nombre`, `paginas:[a,b]`, `inicio` regex del bloque/ficha del Exprés donde empieza, `cit` regex del nombre en «art. N de …», `pre` id del preámbulo, `pre_re`, `ley_re`, `proto`), `tN-manual.json` (recortes a mano: `piezas:[[pag,f0,f1]]`, `expres:1` si la pieza va en el Exprés, `recorte` y `ap` para versión recortada), `tN-extra.json` (artículos que el Exprés no lleva pero que citan las preguntas → se ven solo desde una pregunta), `tN-cuadros-map.json` (cuadros que no se asignan solos), `tN-apartados.json` (apartados que lleva el Exprés), `tN-config.json` (se genera).
- Salida: `img/tN/*.jpg` + `indice.json`, `datos-tN.js` (piezas, preg, cit, cob), `cuadros-tN.js`.
- Scripts (`prompts/herramientas/`): `expres-subrayado-config.js N` → config; `expres-subrayado-recortes.py <pdf> expres-subrayado/img/tN expres-subrayado/tN-config.json` (Python: `C:\Users\ruben\AppData\Local\Python\bin\python.exe`, con PyMuPDF y PIL); `expres-subrayado-datos.js N "Tema N · Título"`; `expres-subrayado-apartados.js N`; `expres-subrayado-css.js` (extrae CSS de esquemas.html a `esquema.css`, `exprestyle.css`, `fuente.css`).
- PDFs subrayados del usuario: `C:\Users\ruben\Desktop\OFICIAL 2026-27\TEMARIO ESCANEADO 2026-27\TEMA N …-08-08-2026.pdf` (el Tema 11 tiene 326 págs: LO 3/2018 ≈ págs 20-105, Ley 39/2015 ≈ 106-199, Ley 40/2015 ≈ 200-265, Ley 19/2013 ≈ 266-319, fichas RECUERDA ≈ 320-324; índice 0-based).

## Pasos para un tema nuevo (N)
1. **Estudiar el Exprés** (`expres/tN.js`): bloques `bloque-titulo` y fichas `ex-fh` («Artículos 11, 12 y 13 — …»), normas que lo componen. Y el PDF: en qué páginas empieza cada norma (OCR de la primera página).
2. Crear `tN-instrumentos.json`. Ejecutar `config.js`, luego `recortes.py`. El script detecta los encabezados «ARTÍCULO N» en mayúsculas aunque salgan rotos, ignora «15 bis/ter» (quedan dentro del 15) y deduce números mal leídos por el hueco.
3. Mirar las líneas `FALTA art X`. Para cada una, ver la página (render a 55 dpi en una hoja de contactos) y añadir el recorte a mano en `tN-manual.json` con fracciones de la altura. Revisar a ojo una muestra y los recortes muy bajos o muy altos.
4. Preámbulos, exposición de motivos, disposiciones y protocolos: piezas manuales con `"expres":1`.
5. `datos.js`: calcula marcas EXOF/EX/✱/R **por párrafo** (EX = pregunta oficial sin «-ia-» en el párrafo y no EXOF), reparte fichas de varios artículos **por «Art. N»** (cada pieza lleva solo lo suyo), enlaza preguntas, extrae cuadros de `esquemas.html` usando `visuales-tN.js` y calcula la cobertura. Los cuadros sin sitio van a `tN-cuadros-map.json`.
6. **Cobertura de preguntas**: simular `window.piezaSubrayado` (en `test-oficial-conocimiento.html`) sobre las preguntas del tema y listar las que no llevan botón y qué artículo citan; añadir esos artículos a `tN-extra.json` y repetir pasos 2-5. Las de teoría general (sin artículo) no tienen recorte.
7. **Apartados (recorte)**: el Exprés a veces lleva solo algunos apartados de un artículo. `apartados.js` los lista; `recortes.py` recorta automáticamente cuando el OCR encuentra «1.», «2.»…, y si no, se hace a mano con `img_recorte` (píxeles de la imagen entera) o `recorte` en el manual. **Pendiente en el Tema 1** (hoy sin ninguna versión recortada).
8. **Integrar**: en `expres-subrayado.html` añadir `<script src="expres-subrayado/datos-tN.js">`, `cuadros-tN.js` y `expres/tN.js`; en `test-oficial-conocimiento.html` el `datos-tN.js`; en `esquemas.html` el array `TEMAS` del snippet `script-subrayado`; en `service-worker.js` la lista de caché (`datos`, `cuadros`) y subir versión. `ACTUALIZAR-ESTUDIO-OFFLINE.bat` ya copia `expres-subrayado.html`, su carpeta y `expres\t*.js`.
9. Probar: tarjeta de un artículo, botón desde la app de test (hash `#q=<id>&p=<pieza>&ap=<n>`), enlace desde Esquemas, esquema y marcas en un cuadro, panel de impresión y su vista previa, y comprobar que no hay errores en consola.
10. Commit y push; dar al usuario la URL publicada y resumir qué quedó sin probar.

## Decisiones de diseño que no hay que cambiar
- Versión Exprés = mismos artículos y apartados que el Exprés de Esquemas; «Artículo entero» y «Esquema» como botones; los artículos fuera del Exprés solo se ven al llegar desde una pregunta (etiqueta «fuera del Exprés»).
- Al llegar desde una pregunta que cita un apartado que el recorte no lleva, se abre el artículo entero.
- Impresión: 4 versiones por artículo (recortado, entero, Exprés, Exprés con (…) abiertos en gris) + esquema; letra del Exprés 12 px por defecto (Source Sans 3 incluida en `fuente.css`) para casar con el tamaño de la captura; opción de grises; el Exprés sale **por artículo** aunque la ficha sea de varios.
- Móvil: tarjetas compactas (botones solo con icono, el texto va en `<span class="lb">`) y **modo lectura a pantalla completa** (botón ⛶ de cada artículo o tocar la captura): pestañas Subrayado (captura sin márgenes en blanco, con zoom y tus marcas) / Exprés (texto grande como en Esquemas, A−/A+, (…) abiertos) / Esquema; se cambia de artículo con ← → o deslizando. Solo se toca `expres-subrayado.html`: Esquemas y el test se dejan como están.
- Sincronizar usa la misma configuración de GitHub que Esquemas/test (`oficialGhCfg`) y su propio archivo `backups/expres-subrayado.json`, con mezcla de tres vías.

## Pendiente / ideas
- Recorte por apartados del Tema 1; Tema 11 y siguientes (hacerlos uno a uno).
- Revisar a ojo todos los recortes de cada tema (solo se ha muestreado).
- El PDF del Tema 1 no trae el texto del Protocolo n.º 4 (solo el Adicional y una lista de Estados): sus preguntas no llevan botón.
- Probar en móvil: táctil, selección de texto en cuadros, zoom, impresión.
