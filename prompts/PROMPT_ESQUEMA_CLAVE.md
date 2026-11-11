# PROMPT — ESQUEMA CLAVE («repaso» de ~10 págs) — para pegar en otra conversación

Eres Claude Code trabajando para mí. Responde SIEMPRE en español. Carpeta de trabajo REAL: `C:\Users\ruben\Desktop\HTML OFICIAL` (NO la copia de OneDrive). Lee primero `CLAUDE.md` y estas memorias: `esquema-clave-criterio-10-11`, `expres-subrayado-reglas-fijas`, `subrayado-reglas-esq-y-mod`, `preferencia-subrayado-sobre-oficial`. Cada cambio: subir `CACHE` en `service-worker.js`, `node --check`, commit y push a `origin/main`.

## Qué es el «Esquema clave»
Es el botón ⭐ de `expres-subrayado.html`. Para cada tema es un **repaso corto (~10 páginas A4 REALES)** con lo que casi seguro cae en el examen. Ya NO es una simple selección automática de artículos recortados: es un resumen hecho a mano, con mi código de colores, que se abre dentro de la app (iframe) con botones «Abrir aparte» e «Imprimir».

Referencia ya hecha (el Tema 2, 10/11/2026): `repaso-t2-borrador.html` (+ `repaso-t2-solo-texto.html` y `repaso-t2-hibrido-v1.html` como versiones guardadas). Se engancha a la app en `expres-subrayado/clave-fijos.js`:
`window.EXSUBCLAVE_REPASO = { 2: "repaso-t2-borrador.html" }` → para otro tema añade `N: "repaso-tN-borrador.html"`.

## Criterio de qué entra (lo fijé yo el 10/11/2026)
1. Artículos con pregunta **OFICIAL** enlazada (las de IA NO cuentan) y sus vecinos (el artículo anterior y el posterior: si un año preguntan otra parte, repiten o van al contiguo). Más peso cuanto más subrayado tengo.
2. Marcas de la academia en mi temario: **EXOF** (círculo azul a boli) y **sello «PREGUNTA EXAMEN»** → el artículo entra **ENTERO** (el examen puede preguntar otro apartado). Los ✱ y EX son de IA: entran si caben. Fichas **R** (R1…Rn: suelen ser pregunta) y los **cuadros/esquemas** de mi temario subrayado (también suelen ser pregunta).
3. Mi subrayado (densidad) y mis anotaciones a boli en los márgenes.
4. Texto LITERAL del tema (nunca parafrasear la ley). Mi subrayado manda sobre la copia limpia.
5. Extensión: 10 págs reales. El tope 8-10 págs no se aplica si las marcas EXOF/EXAMEN obligan a más; en ese caso dilo y propón recortes.

## Cómo se construye (método del T2)
- **Texto base** a una columna, 12 pt, coloreado **palabra por palabra** con `prompts/herramientas/repaso-colorear-palabras.js` (`colorea(html)`); las listas de léxico están dentro: ajusta las listas, no el HTML a mano. Versión por reglas más simple: `repaso-colorear.js`.
- **Esquemas** de `esquemas.html` (los `VIS_Tn`) solo donde aportan (cuadros comparativos, plazos, sanciones). Extrae su CSS EXCLUYENDO las reglas `@media` (aplastan las tablas `ex-tab`). Versión móvil y oscura: `vis-movil.css` / `vis-dark.css` (en `%TEMP%\vis` en el T2; si no están, extráelas de `esquemas.html`).
- **Montaje**: `prompts/herramientas/repaso-hibrido-t2.js` es la plantilla (copiarla a `repaso-hibrido-tN.js` y cambiar entradas, títulos de bloque y orden). Incrusta el editor `repaso-editor.js`.
- **Código de colores**: amarillo = contenido general · naranja = conceptos/categorías · verde = órganos/autoridades · azul = plazos, cifras, mayorías · morado = acciones · subrayado rojo = palabras clave (no, salvo, podrá, deberá…).
- **Editor** (incrustado): seleccionas texto o tocas una marca → barra de 6 colores + quitar, deshacer, restaurar, botón AA (mayúsculas); guarda en `localStorage` (`repaso-edit:tN`; si cambia el contenido guarda copia en `:anterior`, así que AVISA antes de regenerar un repaso que yo ya haya retocado).
- **Móvil/tema**: por defecto CLARO, obedece el botón 🌙 de la app (postMessage `repasoTema/repasoListo`); letra 15 px (17 px si ancho ≤ 700) con A−/A+ (`repaso-fs`); el marco crece entero por postMessage (sin barra de desplazamiento propia).

## Reglas de verificación
- **Medir las páginas con Chrome headless `--print-to-pdf`**, NUNCA con estimaciones en pantalla (se quedan cortas un 25-35 %).
- Comprobar a ojo (captura) al menos un bloque de texto y un esquema; comprobar claro/oscuro y móvil.
- Si algo no se pudo verificar (impresión real, móvil), dilo claramente.

## Pendiente de decidir con el usuario (no asumir)
- Qué temas van después del que se esté haciendo; la lista de artículos concreta si hay duda sobre EX frente a EXOF (las marcas EX/EXOF de los datos mezclan sello, círculo y automático: repasarlas tema a tema como se hizo en T2 con `tema2/marcas-situadas-t2.json`).

## Tu tarea ahora
Haz el Esquema clave del **Tema __ (indicar)** siguiendo todo lo anterior: 1) enumera qué entra y por qué (oficiales + vecinos, EXOF/sello, R, cuadros), 2) créalo con la plantilla, 3) mídelo en PDF real, 4) engánchalo en `clave-fijos.js`, 5) sube la caché, commit y push, y 6) dime qué quedó sin verificar.
