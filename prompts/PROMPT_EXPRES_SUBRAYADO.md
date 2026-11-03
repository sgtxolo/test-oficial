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

---

# FLUJO ACTUALIZADO (31/10/2026, hecho en el Tema 11): pasar un tema del Exprés al «Exprés subrayado»

Úsalo cuando el tema ya está terminado en Esquemas (preguntas, esquema, marcas y Exprés `expres/tN.js`). Objetivo del usuario: un **temario normal pero resumido**, que se estudie bloque por bloque y se imprima (un temario de ~300 páginas → ~70-100), con **sus propios subrayados** (capturas del PDF escaneado). Cobertura: **todas las preguntas del tema deben poder abrir su artículo** en el subrayado (o, si no está allí, en Esquemas).

## Reglas del usuario (obligatorias)
1. **El recorte debe ser igual que el Exprés**: las mismas frases/apartados/letras, con «(…)» entre tramos. No vale recortar por apartados enteros si el Exprés corta dentro de un apartado.
2. **Artículos «ESQ»** (círculo a mano con «ESQ»/«Esq» junto al título): el texto del artículo NO está subrayado porque el usuario lo tiene en un esquema (cuadro). En el subrayado se **quita el texto y se deja solo el cuadro** de la foto (que sí está subrayado). Si el cuadro está en la foto de otro artículo vecino (p. ej. «121 y 122»), se pone ahí y los otros quedan ocultos («está en el esquema»). Detectarlos con hojas de contacto de la franja del título (no con automatismos).
3. **Páginas tachadas con X o «MOD»/modificado, o con una raya en diagonal / «derogado» / «no está»**: no se añaden; se busca la actualización más adelante en el PDF. Los artículos con raya no entran (lista `tachado`).
4. **No bajar la letra**: la escala de impresión se deja al usuario (opción «Tamaño de las fotos»: Grande/Media/Pequeña; **Media ≈ tamaño del temario oficial**). Objetivo: acercarse a las páginas del Exprés, pasarse unas pocas es aceptable. Imprimir seguido, sin huecos en blanco, sin cortar renglones.
5. **Botón por artículo** «Artículo entero / Ver Exprés» (ya hecho en la app) y botón «➕ Añadir a mi subrayado» (suma apartados/trozos que el Exprés no lleva).
6. No hace falta pedirle capturas al usuario para los cuadros: se leen de las fotos. Si algo no se ve claro, avisarle.
7. Responder siempre en español; verificar en el navegador y **no dar nada por terminado sin decir qué no se ha probado** (impresión real, móvil).

## Pasos
1. **Base**: seguir «Pasos para un tema nuevo» de arriba (config, `expres-subrayado-recortes.py`, `datos.js`, integrar scripts en `expres-subrayado.html`, `esquemas.html` (TEMAS), `service-worker.js`, subir CACHE). Esto da recortes por apartados numerados.
2. **Auditoría de apartados** (rápida): comparar los apartados numerados del Exprés con los del recorte (script de la sesión: `aud2.js`; lógica = números `N.` al inicio de los `<p>` del Exprés vs `ap` del índice). Corregir los que no coinciden.
3. **Piezas que se ven enteras y el Exprés solo lleva una parte** (el caso grande: ~50 % de las piezas sin recorte en el T11): calcular cobertura de palabras Exprés/foto (script `sinrec.py`, umbral < 60 %) y revisar a ojo cada una.
4. **Revisión a ojo**: generar imágenes comprimidas con coordenadas originales (`ov2.py`/`stack.py`: quitan blancos y rotulan la `y` real), leer el Exprés del artículo (`dump.js`) y escribir los rangos en píxeles en `expres-subrayado/tN-img-recorte.json` (`{"a-77":{"ap":[2],"rangos":[[0,45],[135,288]],"nombre":"opcional"}}`). Incluir siempre la cabecera del artículo. Las fotos a veces traen artículos vecinos o cuadros; no incluirlos.
5. **Aplicar**: `py prompts/herramientas/expres-subrayado-aplicar.py N id,id,…` (genera `<id>-r.jpg` con franja «(…)»; **ajusta los cortes a los huecos entre renglones** para no cortar líneas). Luego `expres-subrayado-datos.js`, `expres-subrayado-bloques.py` (→ `tN-bloques.json` + `bloques-tN.js` para «Añadir a mi subrayado»), `expres-subrayado-cortes.py` (→ `cortes-tN.js`: tiras de impresión entre renglones) y `revision-tN.js` (`todos`, `hechos`, `esq`, `tachado`).
6. **ESQ y tachados**: añadir ids a `revision-tN.js` (`esq`: ocultos; `tachado`: no entran) y poner el recorte del cuadro con `rangos` + `nombre` («… Artículos 121 y 122 (esquema)»).
7. **Cobertura de preguntas**: `node prompts/herramientas/expres-subrayado-sinboton.js N` (lista las que no abren el subrayado y qué citan). Para preámbulos y disposiciones adicionales/transitorias/finales que citan las preguntas: añadir piezas (marcadas `extra` = fuera del Exprés, no se imprimen por defecto) recortadas del PDF, y ampliar `piezaSubrayado()` en `test-oficial-conocimiento.html` si hace falta reconocer la cita. Comprobar también que la pregunta tiene sitio en Esquemas (`window.MAPA_PREG`): **no siempre lo tiene**.
8. **Verificar**: cargar la página, 0 imágenes rotas, tarjetas = piezas del Exprés, sin errores de consola, sintaxis de los `.js` (`node --check`), botón por artículo, «Añadir a mi subrayado», vista previa de impresión. Pedir al usuario una **impresión real** y las páginas que salen (en el T11: 105 págs con «Grande»; calibrado en `estPag`).
9. **Cerrar**: subir CACHE, commit + push, actualizar la memoria del tema, y decir honestamente qué no se probó.

## Herramientas (prompts/herramientas/)
`expres-subrayado-recortes.py` · `-config.js` · `-datos.js` · `-apartados.js` · `-aplicar.py` · `-bloques.py` · `-cortes.py` · `-esq.py` (orientativo) · `-auditoria.py` · `-sinboton.js`. Los scripts de revisión visual están en `prompts/herramientas/subrayado-revision/` (ver su LEEME.md).

---

# ⚙ MODO AUTOMÁTICO PARA UN TEMA NUEVO (pauta del usuario, 2/11/2026; hecho en el Tema 18, plantilla `prompts/herramientas/tema18/`)
Si el usuario solo escribe «Tema N» (con estos prompts adjuntos), **lo hago TODO seguido, sin preguntarle nada entre pasos ni esperar un «sí, sigue»**: al acabar un paso empiezo el siguiente. Solo paro si falta un archivo que no encuentro en ningún sitio o si hay que borrar preguntas (clase 4 de «sin sitio»: aviso con la lista de ids). Las dudas de criterio las resuelvo con estas reglas y las anoto en el informe final (qué no he podido probar: navegador/móvil, impresión).

## Orden de trabajo y reglas que ya están decididas
1. **Preguntas IA**: 5 por página de MI PDF, por bloques de ~50 (`preguntas-tNr-bNN.js` + `preguntas-tNr-lib.js` + `cierre-bloque-tNr.sh`, plantilla T18). Enunciado sin nº de artículo/apartado; cita literal en UNA sola página del oficial (los marcadores `=====PAG n =====` no se filtran); la correcta nunca la más larga. Commit + push por bloque.
2. **Auditoría de las oficiales** (`auditoria-oficiales.js N` + revisión a mano de TODAS las «todas / A y B / ninguna / señale la INCORRECTA»), correcciones en `temaN/fix-tN.js` (plantilla `tema18/fix-t18.js`: por id, cita literal comprobada, idempotente). Se corrigen, no se borran; lo no verificable va con su id al informe.
3. **Extra de mi PDF**: comparar páginas de mi PDF vs oficial (cobertura de n-gramas por página del OCR + mirar como imagen las páginas sin OCR). Lo extra suele ser: fichas **R1…Rn** (se guardan en `temaN/r-temario-tN.js` con artículo y cita literal; son preguntas OFICIALES, se hacen en la fase 2) y cuadros. Páginas en blanco se ignoran; copias tachadas con aspa/X no se usan (usar la copia limpia posterior).
4. **Esquema literal** (`temaN/esquema-tN.js`, inserta tras el bloque del tema anterior; texto en `esquemas-datos/tN.js`): una ficha por artículo, títulos/capítulos como `bloque-titulo`, RECUERDA con las R. Marcas en `temaN/marcas-tN.js` (claves `art|tok`, `art|tok@n`, `art|#n`, `art|~texto`).
5. **Subrayado real**: `subrayado-pdf.py` → `aplicar-subrayado-pdf.js ... "TN_X:págs"` → `lila-no-se-verbo.js` → `unir-subrayados.js`. ⚠ Los dos últimos tocan TODOS los temas: antes del commit **revertir lo ajeno** (`git show HEAD:esquemas.html > esquemas.html`, `git checkout -- expres/tX.js` de otros temas). Si se reconstruye el esquema, reaplicar subrayado + lila + unir.
6. **Marcas a mano**: leer TODAS las páginas como imagen (parejas de páginas a 82 dpi; recortar a 190 dpi los círculos dudosos). EX / EXOF / EXAMEN / ✱ → `data-ex`; pines R → `data-r`; los círculos «ESQ» y el «R» a mano NO son marcas de examen. Anotar la lectura en `temaN/marcas-lectura.md` (incluye la lista de cuadros del temario).
7. **Cuadros** (`temaN/visuales-tN.js`, plantilla `tema18/visuales-t18.js`): recrear TODOS los cuadros del temario con texto literal; colores por método si el PDF solo trae color impreso (avisarlo); se insertan tras el artículo con `<!--VISNN-->`; `module.exports = V` para el Exprés.
8. Después: fase 2 de las marcas y R (`cobertura-marcas.js N`, `preguntas-marcas-lib.js`; EXOF/EX/EXAMEN/✱/R → oficiales), huecos `(…)`, cajas de trampas, mapa (en segundo plano), Exprés (`expres/tN.js`, todos los cuadros sustituyendo a su artículo), preguntas rápidas, y por último **este flujo de Exprés subrayado** (arriba).
9. Cada paso: `node --check`/scripts de la app sin errores, `bump-cache.js`, commit + push a `main`, actualizar la memoria del tema. En el chat solo un resumen corto al final de cada paso (sin pedir permiso para el siguiente).

## Lecciones del Tema 18 (3/11/2026) — hacerlas SIEMPRE al cerrar un tema
1. **Orden exacto para los recortes por apartados**: `expres-subrayado-apartados.js N > expres-subrayado/tN-apartados.json` → `expres-subrayado-config.js N` → `expres-subrayado-recortes.py …` → `expres-subrayado-datos.js N "Tema N · Título"`. Si no existe `tN-apartados.json` salen **0** recortes por apartados (así quedó T18 la primera vez: 112 artículos enteros).
2. Tras `recortes.py`, mirar los `AVISO aX: el OCR solo encuentra…`: esos artículos se quedan enteros → recortarlos a mano en `tN-manual.json` (`recorte`/`ap` o `img_recorte`) y revisar a ojo 2-3 recortes.
3. **Preguntas sin botón = 0** (`expres-subrayado-sinboton.js N todo`): artículos que citan las preguntas y el Exprés no lleva (p. ej. arts. 7 y 12 del T18) → añadirlos a `tN-extra.json` (`{"a":[7,12]}`) y repetir la cadena; preguntas «todas son correctas» o sin cita → `tN-preg-extra.json` `{id: pieza}` a mano (p. ej. 18-11→a-20). Objetivo: n/n.
4. **Preguntas rápidas a mano** (obligatorio en cada tema): `node prompts/herramientas/rapidas-mostradas.js N salida.json` lista solo las que el Exprés muestra (≤3 por ficha); reescribirlas como ¿Pregunta? → respuesta corta en `prompts/herramientas/rapidas-reescritas/tN-a.json`, luego `node prompts/herramientas/preguntas-rapidas.js N`. T18: 226 hechas.
5. Antes de cerrar: subir caché (`CACHE_NAME` en `service-worker.js`), commit + push, y dejar en el informe lo que NO se ha podido comprobar (cuadros contra el PDF, colores, móvil, impresión).
6. **Cajas de trampas (T18, 3/11/2026)**: se añaden en `temaN/visuales-tN.js` como `v('cp', localizador, C(...)/T(...))` DESPUÉS de los cuadros (helpers `T` y `C` = «Cifras que se confunden», «Ojo a la redacción»); 14 en T18, todas con cifras/redacción literal del oficial verificada con grep. Hay que (a) añadir sus cabeceras al array `CAB` de `expres-tN.js` en el mismo orden, (b) crear `expres-subrayado/tN-cuadros-map.json` {localizador: 'a-N'} para que `datos.js` las asigne a su artículo, (c) regenerar visuales → expres → preguntas-rapidas → datos.
7. **Colores de cuadros**: comparar con la página del PDF; si el cuadro impreso trae tu fosforito (T18: art. 14, conspiración/proposición/provocación, legítima defensa, art. 96) copiarlo (D naranja, P azul/turquesa, G verde, Y amarillo); si es un cuadro impreso sin subrayado (tentativa, art. 33, arts. 97-98, permisos), el color es por método y se dice.
8. **Revisión de textos oficiales contra el temario vigente**: al escribir trampas/rápidas salieron 2 oficiales desfasadas (18-67 duración de la privación de conducir; 18-87 cancelación a los 50 años, no 20) → corregidas en `fix-tN.js`. Contrastar siempre cifras con `oficial.txt`.
9. **Móvil**: en `expres-subrayado.html` la barra `#top .fila` desbordaba a 375 px (scrollWidth 476); arreglado con `flex-wrap:wrap`. Comprobar `document.documentElement.scrollWidth <= innerWidth` en esquemas y subrayado.

## ⚠ REGLA FIJA DEL USUARIO (3/11/2026) — no se le vuelve a pedir
El Exprés sale de las **preguntas de conocimientos**; el Exprés subrayado sale **del Exprés**, recortado por apartados/letras (nunca el temario entero). Si el Exprés lleva solo una letra (p. ej. la C) y el recorte queda cortado: artículo entero, o recorte + botón «➕ Añadir a mi subrayado» (`tN-bloques.json` NO puede quedar vacío). Un tema no está cerrado si casi todos sus artículos siguen enteros (T18 3/11: solo 21 de 112 recortados, bloques `{}`).
