# Proyecto: Estudio Oposición Oficial Guardia Civil (3 apps vinculadas)

Idioma: responde SIEMPRE en español. Carpeta de trabajo real: `Escritorio\HTML OFICIAL` (NO la copia de OneDrive). Cada cambio se commitea y pushea a `origin` (repo `sgtxolo/test-oficial`, rama `main`).

## Las 3 apps (HTML de una sola página, sin build, PWA offline)
1. **esquemas.html** — Esquemas de estudio de los temas de Materias Profesionales (estilo visual "Método Prefortia": subrayado denso por colores, artículos literales, sellos EX/EXOF, cajas "Trampa", bloque "Recuerda" R1…Rn, modo Exprés, modo coche, PDF con huecos (…)). Se monta cada tema bajo demanda. Exprés en `expres/tN.js`.
2. **test-oficial-conocimiento.html** — Test de conocimientos por tema: preguntas OFICIALES de examen (se corrigen, nunca se borran) + preguntas IA (estilo examen oficial, 5 por página, barajadas).
3. **test-oficial-ingles.html** — Test de inglés; ids de pregunta posicionales (Q<índice>): nunca borrar ni reordenar, corregir en sitio; objetivo 200 preguntas por tema (`ia:true`).

## Por qué van juntas
- Las preguntas del test alimentan los esquemas (marcas EX/EXOF/✱/R salen de las preguntas oficiales); los esquemas se construyen "desde las preguntas".
- Comparten `service-worker.js` (versión CACHE; subirla en cada cambio), manifests, iconos, fuentes y scripts de `prompts/herramientas`.
- Un solo repo = un solo commit/push, una sola caché offline.

## Reglas clave
- Preguntas EX/EXOF que redacto → banco IA, nunca al oficial. EXOF y sello EXAMEN → oficial; * y EX → IA importante.
- Verificar siempre contra el texto legal/temario (el temario escaneado 08-08-2026 es la fuente autorizada).
- Un tema cada vez, hasta dejarlo como T1 y T2 (referencia). Auditar oficiales en cada tema.
- Tras editar: comprobar sintaxis JS, subir CACHE del service worker, commit + push.

## Dónde mirar
- `documentacion/HANDOFF.md` y `PENDIENTE-*.md`: estado y flujo de trabajo.
- `prompts/`: prompts de esquemas, preguntas IA, examinador, fotos del temario.
- `prompts/herramientas/`: scripts (auditoría, subrayado, añadir/borrar preguntas…).
- Memoria de Claude (`.claude/.../memory`): estado por tema (T1…T16) y reglas detalladas.

## Estilo Prefortia (esquemas)
- Subrayado denso (≥70 % de caracteres): `m-destacable` naranja, `m-autoridad` verde, `m-plazo` azul, `m-accion` morado, `m-personalizado` amarillo, `<u class="m-clave">` rojo para conectores (no, salvo, cuando, excepto).
- Texto del artículo LITERAL; colores copiados del temario subrayado del usuario. Unir palabras contiguas del mismo color en un solo `<mark>`.
- `articulo(cabecera, html, true)` = sello EX. `trampa(titulo, texto)` pegada bajo su artículo. `recuerda([...])` = bloque único al final del tema (R1…Rn). Si un artículo cita otro, añadir entre paréntesis de qué trata.
- Huecos (…) desplegables con texto literal.

## Preguntas IA (leer `prompts/PROMPT_PREGUNTAS_EXAMINADOR.md` antes de generarlas)
- 5 por página, estilo oficial largo, la correcta NO es la más larga, sin número de artículo en el enunciado, cita en rojo, sin fáciles, barajar siempre.
- Las de hueco necesitan hueco visible.
- Oficiales: corregir, nunca borrar. Inglés: ids posicionales Q<índice>.

## Flujo por tema (referencia: T1 y T2)
1. Auditar y corregir oficiales. 2. Rehacer/ampliar IA. 3. Esquema con subrayado del usuario y cuadros. 4. Marcas EXOF/EX/✱/R. 5. Exprés (`expres/tN.js`, ~35-50 págs según extensión). 6. Cerrar: verificar, subir CACHE, commit + push.
- Estado por tema: ver memoria y `documentacion/PENDIENTE-*.md`. Terminados con calidad T1/T2: T1, T2, T3, T5, T7, T9, T12 (otros parciales).

## Cuándo leer cada prompt
- Esquemas: `prompts/PROMPT_ESQUEMAS.md`; desde preguntas: `PROMPT_ESQUEMA_DESDE_PREGUNTAS.md`; fotos del temario: `PROMPT_FOTOS_TEMARIO.md`; IA: `PROMPT_PREGUNTAS_EXAMINADOR.md` y `PROMPT PREGUNTAS IA.txt`.

## Verificación
- Sintaxis JS: `node --check` sobre los `.js` (y el `<script>` extraído de los HTML).
- Subir `CACHE` en `service-worker.js` en cada cambio visible.

## Paso 7 del flujo por tema: Exprés subrayado
Al cerrar un tema, pasarlo a `expres-subrayado.html` (recortes de las fotos del PDF subrayado del usuario iguales al Exprés, ESQ solo con esquema, páginas tachadas/MOD/raya fuera, impresión continua). Guía completa: sección «FLUJO ACTUALIZADO (31/10/2026)» en `prompts/PROMPT_EXPRES_SUBRAYADO.md`; reglas del usuario en la memoria (`subrayado-reglas-esq-y-mod`). Estado: T1, T7, T11 y T12 hechos (T11 el más completo).
