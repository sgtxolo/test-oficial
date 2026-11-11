# PROMPT — ESQUEMA CLAVE (resumen de ~10 págs) de un tema — para pegar en otra conversación

Eres Claude Code trabajando para mí. Responde SIEMPRE en español. Carpeta de trabajo REAL: `C:\Users\ruben\Desktop\HTML OFICIAL` (NO la copia de OneDrive). Lee antes `CLAUDE.md` y las memorias `esquema-clave-criterio-10-11`, `esquema-clave-t21-repaso`, `expres-subrayado-reglas-fijas` y `preferencia-subrayado-sobre-oficial`. Tras cada cambio: `node --check`, subir `CACHE_NAME` en `service-worker.js`, commit y push a `origin/main` (añade los archivos uno a uno: hay un archivo basura `nul` en la raíz que rompe `git add -A`). **Comprueba con `list_sessions` que no haya otra conversación editando los mismos archivos** (ya hubo un choque en el T21).

## Qué es
El botón ⭐ **Esquema clave** de `expres-subrayado.html` abre, para un tema, un **resumen estudiable de ~10 páginas A4 reales** con lo que casi seguro cae. Si por el contenido pasa a **11 o 12 págs, está bien** (mejor cubrir que dejar fuera); no pasar de 12 sin avisar. Es un HTML por tema, `repaso-tN-borrador.html` (el T2, el T3 y el T21 ya están hechos), enganchado en `expres-subrayado/clave-fijos.js`: `window.EXSUBCLAVE_REPASO = { N: "repaso-tN-borrador.html" }`, y añadido a `APP_SHELL` de `service-worker.js`.

## Criterio de qué entra (fijado por mí el 10/11/2026)
1. Artículos con pregunta **OFICIAL** enlazada (las de IA no cuentan) y sus vecinos; más peso cuanto más subrayado tengo.
2. **EXOF** (círculo azul a boli) y sello «PREGUNTA EXAMEN»: el artículo entra entero si cabe. ✱ y EX son de IA: entran si sobra sitio.
3. Fichas **R** (R1…Rn) y los **cuadros/esquemas** de mi temario subrayado: suelen ser pregunta. Los cuadros entran SIEMPRE.
4. Mi subrayado y mis notas a boli. Texto LITERAL de la norma; mi subrayado manda sobre la copia limpia.
5. Ojo: las marcas EXOF de los datos de muchos temas son automáticas, no mis círculos a boli. Si hay duda, dilo; no inventes marcas.

## Formato obligatorio (lo que me gusta; el antiguo «texto apelotonado» NO)
- **Esquemas, no solo texto.** Cada ley/bloque abre con sus cuadros (flujos de procedimiento, plazos, comparativas, árboles) de `visuales-tN` / Exprés, y si faltan, crea nuevos con `prompts/herramientas/visuales-lib.js` (`flujo`, `plazos`, `cols`, `arbol`) usando SOLO el texto literal de los artículos. Ejemplos: `prompts/herramientas/repaso-esquemas-t21.js`.
- **Aireado:** cada artículo en su **tarjeta** (borde azul si es EXOF), interlineado ~1,8, un párrafo por apartado, títulos de ley bien separados.
- **Marcas contiguas del mismo color unidas** en un solo subrayado.
- Código de colores Prefortia: amarillo contenido general · naranja conceptos · verde órganos · azul plazos/cifras · morado acciones · subrayado rojo palabras clave (no, salvo, podrá, deberá…).
- Editor de colores incrustado (selecciona texto → 6 colores), modo claro por defecto, A−/A+, y móvil (se hereda de la plantilla `repaso-t2-borrador.html`).
- En fichas largas, solo los apartados con pregunta oficial, EXOF o R, indicándolo con «(…)».

## Cómo se construye (herramientas)
1. **Generador estándar:** `node prompts/herramientas/repaso-hibrido.js N [presupuestoCaracteres] [pesoCuadro]` lee `expres/tN.js` (fichas con tu subrayado y cuadros, en orden del Exprés; los `bloque-titulo` pasan a ser títulos) y escribe `repaso-tN-borrador.html`. El presupuesto lo fija las páginas: ejemplo T3 → 32000 = 11 págs (12 cuadros pesan 1500 c. cada uno). Ajusta hasta 10-12 págs.
   - Algunos Exprés no traen título de ley en sus bloques (T21): ahí se usa un generador propio (`repaso-hibrido-t21.js`, leyes por posición) o se añaden los títulos.
2. **Esquemas nuevos** por tema: módulo `prompts/herramientas/repaso-esquemas-tN.js` que devuelve `{ 'título de la ley': [html,…] }` (modelo: T21).
3. **Aplicar el formato aireado a un repaso hecho a mano** (como el T2): `node prompts/herramientas/repaso-formato-aireado.js repaso-tN-borrador.html` (cambia `data-ver` ⇒ se pierden los colores que yo haya retocado en el navegador: avísame antes).
4. **Medir las páginas SIEMPRE con Chrome headless** (`chrome.exe --headless=new --no-pdf-header-footer --print-to-pdf=… file:///…`) y contar `/Type /Page`; nunca por estimación en pantalla. Mira también una captura (`--screenshot`) de varios bloques.
5. Engancha en `clave-fijos.js` y `service-worker.js` (APP_SHELL), sube la caché, commit y push.

## Qué debes decirme al terminar
Páginas reales, nº de fichas y de cuadros, qué quedó fuera por presupuesto (leyes/artículos), si las marcas EXOF son mías o automáticas, y lo que no pudiste verificar (impresión real, móvil). Si algo del Exprés está roto (p. ej. un cuadro con texto «true» en lugar de ⇄), arréglalo en el repaso y avísame.

## Tu tarea ahora
Haz el Esquema clave del **Tema __ (indicar)** con todo lo anterior.
