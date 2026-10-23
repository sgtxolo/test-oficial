# Handoff — Esquemas de Estudio (Oposición Oficial Guardia Civil)

## Qué es esto
`esquemas.html` es una app de estudio de una sola página (sin build, todo inline) que genera esquemas rápidos de repaso para los 27 temas del programa de "Materias Profesionales" de la oposición a Oficial de la Guardia Civil, en el estilo visual **Método Prefortia** que el usuario usa en sus PDFs.

Repo: `sgtxolo/test-oficial` (GitHub), rama `main`. Cada cambio se commitea y pushea inmediatamente (no se deja nada sin subir).

## Estado actual
- **Tema 7** (Derechos y deberes fundamentales / TC y LO 1/1982): **completo y cerrado**, con bloque "Recuerda" final.
- **Tema 8** (Poder Judicial, LOPJ 6/1985): **completo y cerrado**, con bloque "Recuerda" final (R1–R22).
- **Temas 1-6 y 9-27**: pendientes, solo aparecen como "Pendiente de rellenar" en el índice.

## Cómo se construye cada tema (flujo de trabajo con el usuario)
1. El usuario dicta oralmente (transcripción de voz, a veces con errores/ruido) los artículos y puntos concretos que quiere en el esquema de un tema, indicando cuáles son "examen oficial" (sello EX) y a veces trampas/trucos.
2. A veces también pasa el PDF/Word con el texto legal oficial (BOE) del tema y/o un resumen ya hecho por un compañero, para comparar y no dejarse nada.
3. Hay que **transcribir el texto legal real** (no resumir de más) de cada artículo dictado, aplicando el marcado de colores denso (ver estilo abajo).
4. Al final del tema, el usuario pasa un bloque "Recuerda" (resumen R1, R2, R3...) que se añade tal cual con la función `recuerda([...])` al final del `html` del tema.
5. Tras cada edición: verificar sintaxis JS (ver comando abajo), comprobar visualmente en el navegador si hace falta, y **commitear y pushear siempre**.

## Estilo visual (código de colores) — MUY IMPORTANTE, ya está en memoria pero se resume aquí
Ver memoria: `esquemas-estilo-prefortia.md` (en `~/.claude/projects/.../memory/`). Reglas clave:
- Subrayado **exhaustivo**: casi cada sustantivo/verbo/plazo/órgano con contenido debe llevar un `<mark>` o `<u>`, no solo 1-2 palabras sueltas por párrafo. Fue corregido varias veces por quedarse "poco colorido".
- Clases CSS de marcado: `m-destacable` (naranja), `m-autoridad` (verde), `m-plazo` (azul), `m-accion` (morado), `m-personalizado` (amarillo), y `<u class="m-clave">` (subrayado rojo, sin fondo) para conectores lógicos ("no", "salvo", "cuando", "excepto"...).
- Los artículos que son "examen oficial" llevan el segundo argumento `true` en `articulo(cabecera, html, true)` → aparece un sello redondo "EX".
- Las cajas de **"Trampa de examen"** (`trampa(titulo, texto)`) van pegadas justo debajo del artículo al que corresponden, nunca agrupadas al final.
- El bloque **"Recuerda"** (`recuerda([...])`) es distinto: va SIEMPRE en un único bloque al final del tema, con los puntos que el usuario dicta aparte al cerrar el tema.
- Cuando un artículo referencia a otro artículo distinto (p. ej. "conforme al art. 6.7"), añadir entre paréntesis una breve explicación de qué trata ese artículo.
- El usuario añadirá más trampas de las que yo proponga por iniciativa propia — no asumir que las mías son suficientes.

## Estructura técnica del archivo
- Un único `<script>` con un array `esquemas` (uno por tema, `esquemas[0]` = Tema 1 ... `esquemas[26]` = Tema 27).
- Cada tema completo se construye en una IIFE `(function(){ const tN = esquemas[N-1]; tN.titulo = "..."; tN.html = leyenda() + bloqueTitulo(...) + articulo(...) + trampa(...) + ... + recuerda([...]); })();` — el Tema 7 y el Tema 8 son buenos ejemplos a seguir/copiar como plantilla para los próximos temas.
- Helpers ya definidos: `leyenda()`, `bloqueTitulo(texto)`, `articulo(cabecera, htmlInterior, esExamen)`, `trampa(titulo, texto)`, `recuerda(arrayDeStrings)`.
- Hay un botón "⬇️ PDF" que imprime solo el esquema activo con los mismos colores (`@media print` con `print-color-adjust: exact`).
- Modo claro/oscuro con toggle, guardado en `localStorage`.

## Cómo verificar cambios antes de subir
Como el archivo es JS embebido en HTML, tras cada edición hay que comprobar que no se rompió la sintaxis:
```bash
cd "C:\Users\ruben\OneDrive\Desktop\HTML OFICIAL"
node -e "
const fs = require('fs');
const html = fs.readFileSync('esquemas.html','utf8');
const m = html.match(/<script>([\s\S]*)<\/script>/);
fs.writeFileSync('check.js', m[1]);
"
node --check check.js && echo SYNTAX_OK
rm check.js
```
Ha habido más de un incidente de duplicado de bloques o `` `) `` sobrantes al hacer ediciones grandes con Node en vez de con el Edit tool normal — revisar con cuidado tras insertar bloques largos.

## Siguiente paso
Seguir con el **Tema 9 (Defensa Nacional)** o el tema que el usuario indique, repitiendo el mismo flujo: pedir/leer texto legal + dictado de artículos + trampas + recuerda final.

## Recordatorio de memoria del proyecto (pinned)
Cualquier cambio en este repo se commitea y pushea a `origin/main` inmediatamente, porque la PWA se sirve desde la versión desplegada en GitHub al móvil del usuario vía service worker (ver memoria `auto-commit-push-on-change.md`).

## Cambios del 22/10/2026 (esquemas.html) — leer antes de tocar marcas, Exprés o sincronización
- **Posiciones de las marcas** (subrayado de colores `script-cats` y marcas `script-marcas`): se guardan como posiciones de texto.
  Desde ahora NO cuenta el texto de la interfaz (`window.ESQ_UI`: botones, `.rep-ficha`, `.cobertura`, `.estado-resumen`,
  `.ex-clave`, `.ex-rq`, `[data-ui]`…). Todo lo que la app inserte dentro de un esquema tiene que ser `<button>` o llevar
  `data-ui` (o una de esas clases); si no, las marcas de detrás se corren. Las buckets nuevas llevan `v:2`; las antiguas se
  recolocan una sola vez con `esqMigrar` (`script-marcas-lib`). Los espacios entre bloques SÍ cuentan: para volver a montar
  un tema usar `esqRemontar`, que lo deja idéntico.
- **Cuadros/círculos alrededor de texto** (▭A ◯A y los del menú de subrayado): son marcas de texto `k:'bx'|'ov'` y se dibujan
  un recuadro por renglón (`cajas` en `script-marcas`). Los cuadrados antiguos de una línea se convierten solos.
- **Exprés ↔ esquema completo**: todo cambio va a una cola (`esquemas-espejo-v1` y `esquemas-espejo-pm-v1`) y se copia al
  sincronizar (`espejoSincronizar`) o al montar el otro esquema (`espejoAplicar`). Poner un subrayado quita lo que hubiera
  debajo («un solo subrayado»: `limpiar` en cats y en pm).
- **Sincronización** (`script-sync-marcas`): ya no sube a cada cambio. Botón «☁ Sincronizar · N», sola cada 10 min si hay
  cambios y al salir de la app. Al abrir solo baja; lo bajado se aplica con `esqAplicarRemoto` (sin `location.reload`).
  Campo nuevo por tema: `p` = apartados añadidos al Exprés con «⚡+» (`esquemas-expres-extra`).
- **Exprés**: «📌 Lo clave» bajo cada artículo y «✔ RECUERDA — preguntas rápidas» al final (`script-mejoras-2210`). Usan
  `expres/qN.js`, generado con `node prompts/herramientas/preguntas-rapidas.js` → **volver a ejecutarlo cada vez que se
  regenere un `expres/tN.js` o se añadan preguntas al test**.
- Repaso espaciado: siempre a los 20 días.
