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
Al cerrar un tema, pasarlo a `expres-subrayado.html` (recortes de las fotos del PDF subrayado del usuario iguales al Exprés, ESQ solo con esquema, páginas tachadas/MOD/raya fuera, impresión continua). Guía completa: sección «FLUJO ACTUALIZADO (31/10/2026)» en `prompts/PROMPT_EXPRES_SUBRAYADO.md`; reglas del usuario en la memoria (`subrayado-reglas-esq-y-mod`). Estado: T1, T2, T3, T6, T7, T10, T13, T16, T8, T9, T11, T12 y T14 hechos (T11 el más completo).

## esquemas.html partido en archivos (1/11/2026)
- Los textos largos de las leyes (T6, T8, T9, T10, T12, T15, T16, T17) y las tablas huecos/mapa viven en `esquemas-datos/*.js`; `esquemas.html` solo lleva referencias. Para editarlos usa las herramientas de `prompts/herramientas` (todas hacen `require` de `esq-virtual.js`, que muestra y guarda `esquemas.html` completo y lo vuelve a separar). Una herramienta nueva que toque `esquemas.html` debe empezar con `require(".../prompts/herramientas/esq-virtual.js")`. Un tema nuevo con texto largo crea su `esquemas-datos/tN.js` solo; añádelo también a `APP_SHELL` del service worker.

## FORMATO DE LA EXPLICACIÓN — REGLA FIJA (pauta del usuario, 03/11/2026; sustituye a cualquier formato anterior)
Vale para TODA pregunta de test de conocimientos, oficial o IA, y para las que se añadan en los temas que quedan por hacer. El recuadro se ve siempre con este orden y nada más:
1. ✅ Correcto / ❌ Incorrecto (lo pone la app).
2. «Respuesta correcta: X · <respuesta>» (`ex-resp` + `<mark class="ex-key">`).
3. **Lila** (`<span class="ref-norma">`): **«Art. 15.1 · Ley Orgánica 5/2000, de 12 de enero…»**, es decir, localizador exacto (Art. N.apartado, Punto 9.1.5, Disposición adicional X, letra) + nombre de la norma. **Nunca** solo el nombre del apartado o del tema («Responsabilidad Penal de los Menores»).
4. **Rojo** (`<span class="ref-concepto">`): el **literal del temario oficial** de la respuesta correcta (no de la pregunta, no del PDF subrayado). Sin «dispone:», «Según el…», «El art.…» ni «(verificado con el temario oficial)».
5. Texto normal: **explicación breve de la IA** (por qué es esa y por qué fallan las otras) para que la pregunta sirva también de repaso.
6. Origen: «(Pregunta de test oficial)», «(Pregunta de examen oficial)» o «(Pregunta generada por IA)» (la app lo añade sola).
Plantilla: `"explicacion":"<span class=\"ex-resp\">Respuesta correcta: <b>A</b> · <mark class=\"ex-key\">respuesta</mark></span><span class=\"ref-norma\">Art. X.Y · <norma></span><span class=\"ref-concepto\">\"literal\"</span>Explicación breve."`
Reglas de banco que acompañan a esta:
- **Sin repetidas:** no crear una pregunta con el mismo enunciado y la misma respuesta que otra del tema (el test además descarta las repetidas al montarse; si hay oficial e IA iguales, queda la oficial).
- **IA: la correcta NO puede ser la opción más larga** (alarga o acorta las falsas hasta igualar longitudes).
- Sin restos de importación («TEST n», «He analizado las imágenes…»).
- La app ordena y limpia lo que ya existe (`normalizarExplicacion` en test-oficial-conocimiento.html) y completa artículo y literal con `esquemas-datos/citas-preguntas.js` (generado desde el esquema por `prompts/herramientas/citas-preguntas.js`, ver documentacion/CITAS-PREGUNTAS.md). Aun así, **al crear preguntas nuevas escribe ya la explicación completa en este formato**; lo que el esquema no pueda dar (T19–T27 y preguntas sin sitio en el esquema) se completa a mano contra el temario oficial. Tras cambios en un esquema o en el mapa, regenera `citas-preguntas.js`.
