# REVISIÓN FINAL de un tema

Se pasa **tema a tema, cuando el tema ya está hecho** (preguntas, esquema, marcas, Exprés y Exprés subrayado). No crea nada nuevo: **comprueba, corrige lo que esté mal y deja un informe**. Idioma: español siempre.

Uso: «Revisión final del Tema N». Carpeta de trabajo real: `Escritorio\HTML OFICIAL` (no la copia de OneDrive). Antes de empezar lee `CLAUDE.md` y los prompts que citan los pasos (`prompts/`).

## Reglas de oro (no se negocian)
- **Oficiales: se corrigen, nunca se borran** (salvo que sean imposibles de salvar; entonces se retiran y se dice cuáles y por qué). Las IA sí se pueden rehacer o quitar.
- **Preguntas EX/EXOF que yo redacte → banco IA**, nunca al oficial. EXOF y sello EXAMEN → oficial; `*` y EX → IA importante.
- **Nada de inventar**: todo dato (plazos, órganos, cifras, artículos) se verifica contra el texto literal del temario/BOE del tema (`prompts/temario-limpio`, PDF escaneado de 08-08-2026 como fuente de referencia). Si el limpio y el escaneado difieren, manda el escaneado.
- **No tocar el texto con marcas** del Exprés ni el subrayado del usuario (solo se enlazan colores/datos, no se reescribe).
- Un tema cada vez. Cada cambio: commit + push a `origin/main`. Al final subir `CACHE` del service worker (`node prompts/herramientas/bump-cache.js`).
- Si algo es una decisión mía (quitar una oficial, cambiar un criterio), **preguntar antes**; si es un arreglo mecánico, hacerlo y anotarlo.

## 1. Test de conocimientos (`test-oficial-conocimiento.html`)
1. **Auditoría de oficiales** (`prompts/herramientas/auditoria-oficiales.js`): enunciado, 4 opciones, correcta marcada, explicación y artículo coherentes con el texto vigente. Normas derogadas o modificadas → corregir a lo vigente y anotar.
2. **Una sola correcta**, sin dos opciones válidas ni «todas las anteriores» mal puesto; preguntas «señale la incorrecta» bien planteadas.
3. **IA** (`prompts/PROMPT_PREGUNTAS_EXAMINADOR.md`): 5 por página, estilo oficial largo, la correcta **no es la más larga**, **sin nº de artículo en el enunciado**, cita en rojo en la explicación, sin preguntas fáciles, huecos `____` visibles, opciones barajadas.
4. **Duplicadas**: mismas preguntas repetidas entre oficiales, entre IA, o IA que copia una oficial → fusionar o variar (nunca borrar la oficial).
5. **Cobertura**: todo artículo/apartado/cifra del tema tiene al menos una pregunta; los muy preguntados («cae mucho») tienen suficientes y variadas. Pero **sin exagerar**: un artículo con 40 preguntas sospecha de mala asignación (ver 3.3).
6. Ids: no cambiar ni reordenar los existentes (en el test de inglés son posicionales `Q<índice>`).
7. **Formato de la explicación en TODAS las preguntas del tema (oficiales e IA) — pauta del usuario 03/11/2026.** Cuando el banco esté completo, reescribe/corrige cada explicación con el orden fijo: ✅/❌ → «Respuesta correcta: X · respuesta» → **lila** «Art. N.apartado · Norma» (nunca solo el nombre del tema) → **rojo** con el literal EXACTO del temario oficial → **explicación propia de la IA de 3–4 líneas** (por qué es esa y por qué fallan las otras, para que sirva de repaso) → origen. Detalle en la sección «FORMATO DE LA EXPLICACIÓN — REGLA FIJA» de `prompts/PROMPT_PREGUNTAS_EXAMINADOR.md`. Pasos: (a) `node prompts/herramientas/citas-preguntas.js` y `citas-temario.js` rellenan lila/rojo cuando se puede (`documentacion/CITAS-PREGUNTAS.md`); (b) lo que quede sin cita, a mano contra `ACTUALIZACIONESTEMARIO COMPLETO PDF 2026` y apuntado en `documentacion/CITAS-PENDIENTES-*.md` si no aparece; (c) si el literal contradice la respuesta marcada, **no la cambies sin avisar**: anótala; (d) escribe la explicación de 3–4 líneas donde falte o sea solo la respuesta repetida. Criterio de cierre: 0 preguntas sin lila con artículo, sin rojo y sin explicación propia (salvo las anotadas como imposibles).
8. IA: la correcta no es la opción más larga; opciones que remiten a letras («A y B son correctas») no se barajan o se redactan de nuevo.
9. Probar en el navegador: carga el tema, contesta, modo repaso, filtros, contadores, sin errores en consola.

## 2. Esquemas (`esquemas.html`)
1. **Texto literal del articulado con la respuesta marcada**, no resúmenes que cambien el sentido (`esquemas-articulado-literal-con-respuesta`). Cada ficha cita su artículo y norma correctos.
2. **Marcas**: EXOF, EX, ✱, R1-Rn bien puestas y sin huérfanas (`prompts/herramientas/cobertura-marcas.js`, `cobertura.js`). Cada R (RECUERDA) enlaza a sus preguntas; las «sin sitio» = 0 (regla de 4 clases).
3. **Subrayado ≈ 70 %** medible (`densidad.js`), palabras contiguas del mismo color en un solo `<mark>` (`unir-subrayados.js`), colores según el subrayado del usuario.
4. **Huecos `(…)` desplegables** con el texto literal; abrir/cerrar funciona; el PDF imprime los `(…)`.
5. **Cuadros visuales** (`visuales-tN.js`): todos llevan datos exactos, caben en pantalla de móvil, tienen su artículo; ninguno sin sitio.
6. **Exprés** (`expres/tN.js`): páginas dentro del presupuesto (100 págs → 20-25, 150 → 30-35, 200 → 35, >200 → 35-40), formato tipo art. 18, oficiales y R enteros con vecinos, **todos los cuadros incluidos**, preguntas rápidas en forma pregunta→respuesta (`rapidas-reescritas`).
7. **Enlaces pregunta ↔ esquema**: cada pregunta oficial abre su ficha (`esquemas.html#q=<id>`); `mapa-preguntas.js` y `huecos.js` regenerados y sin ids que no existan.
8. Probar: cargar el tema bajo demanda, modo coche, PDF, botón «Art. completo», buscador, sincronización; consola limpia.

## 3. Exprés subrayado (`expres-subrayado.html`, `prompts/PROMPT_EXPRES_SUBRAYADO.md`)
1. **Todo artículo citado por una pregunta tiene pieza** (en el Exprés o «fuera del Exprés»). `expres-subrayado-sinboton.js` → preguntas sin botón; solo se admiten las de teoría general sin artículo. Si falta un artículo → `tN-extra.json` (y recorte manual en `tN-manual.json` si el OCR no lo encuentra) → `config.js` → `recortes.py` → `datos.js`.
   - ⚠ **`recortes.py` sobrescribe los `-r.jpg`**: los recortes finos (`tr`, `cortes`, `cola`, `img_recorte`) se pierden. Si se ejecuta, restaurar los `-r.jpg` y `indice.json` de git y añadir solo las piezas nuevas.
2. **Preguntas bien asignadas** (`expres-subrayado-reasignar.js N`): una pregunta enlazada a «Artículo N» cuya explicación cita otro artículo se pasa a ese. Revisar a mano las que citan varios. Mirar en cada pieza el **recuento**: >25 preguntas en un artículo es señal de mezcla (ej.: el art. 30 de la LO 4/2000 tenía 44 por llevarse las de los arts. 31 y 32). Casos a mano: `tN-preg-mover.json` (fuerza pieza) y `tN-preg-fijas.json` (no tocar).
3. **Dos normas con el mismo nº de artículo** (LO 4/2000 art. 40 y Ley 12/2009 art. 40, etc.): comprobar que cada pregunta va a la norma correcta.
4. **Páginas con X o MOD** no se añaden: usar la actualización posterior. Artículos ESQ solo esquema. Recorte = Exprés.
5. **Marcas por párrafo** (EXOF/EX/✱/R), cuadros del esquema en cada artículo, insignias de probabilidad cargadas (`datos-tN.js` en el test), «Ojo de tribunal» (podrá/deberá) donde toca.
6. **Imágenes**: nítidas, sin cortes a mitad de línea, sin títulos colados al final, orden de piezas correcto, peso razonable; impresión: páginas aproximadas al presupuesto del tema.
7. Probar: abrir 5-6 artículos al azar (uno muy preguntado, uno recortado, uno extra), botones Practicar / En Esquemas / Oficiales / Artículo-Solo esquema-Ambos / Quitar trozos / Añadir a mi subrayado; el contador de «Oficiales» coincide con las preguntas realmente de ese artículo.

## 4. Coherencia entre las 3 apps
- Mismo nº de preguntas por tema en test, esquema y subrayado (oficiales e IA por separado; retiradas anotadas).
- Una pregunta cambiada en el test se ve igual en Esquemas y Exprés (regenerar `q<N>.js`, rápidas, mapa, huecos).
- Los artículos y cifras del esquema, del Exprés, del subrayado y de las preguntas **dicen lo mismo**; si el BOE cambió algo, está cambiado en los cuatro sitios.
- Sincronización con dispositivos y copia de seguridad: no se pierde progreso al actualizar (`sincronizacion esquemas con dispositivos.txt`).

## 5. Cierre
1. Ejecutar todas las herramientas de cobertura/auditoría del tema y dejar los contadores a 0: marcas sin sitio, preguntas sin botón, ids rotos, duplicadas, oficiales sin revisar.
2. `bump-cache.js`, commit con mensaje claro y push.
3. Actualizar la memoria del tema (`temaN-progreso`) con: fecha, qué se corrigió, qué se retiró, qué queda pendiente.
4. **Informe final al usuario** (corto, en español): lo corregido (nº), lo retirado y por qué, lo que necesita su decisión, y lo que **no** se ha podido verificar. No decir «perfecto» si algo queda sin comprobar.

## Qué NO hacer
- No rehacer lo que ya está bien ni «mejorar» estilos no pedidos.
- No regenerar entero un `datos-tN.js` antiguo sin comparar antes con git (puede perder cientos de enlaces).
- No cambiar ids de preguntas ni borrar oficiales sin preguntar.
- No dejar cambios sin commit/push.
