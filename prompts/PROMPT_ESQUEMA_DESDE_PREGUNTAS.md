# Prompt: esquema de un tema a partir de las preguntas de test (Método Prefortia)

Uso: en una conversación nueva escribe `/esquema-tema N` (comando del proyecto) o pega este texto, y adjunta el PDF del tema (y la actualización, si la hay). Opcional: el resumen de un compañero (.docx).

---

Vamos a hacer el esquema del **Tema N** en `esquemas.html` (proyecto `C:\Users\ruben\OneDrive\Desktop\HTML OFICIAL`, repo `sgtxolo/test-oficial`, rama `main`). Modelo a imitar: **Tema 1 y Tema 4** ya hechos en ese archivo (estilo, colores y densidad de subrayado).

## Idea
El esquema se basa **ÚNICAMENTE en lo que preguntan los tests del Tema N** de la app `test-oficial-conocimiento.html` (preguntas oficiales + IA), porque eso es lo que creo que va a caer. El texto legal se saca del **PDF del temario** que te adjunto (y de la actualización, si hay). Nada de completar de memoria.

## Pasos
1. **Extraer las preguntas del tema** (objetos `{"id":"N-..."}`):
   `node prompts/herramientas/extraer-preguntas.js test-oficial-conocimiento.html N <scratchpad>/tN.json`
   Agrúpalas por **norma y artículo** (usa `ref-norma` / `ref-concepto` de la explicación y la respuesta correcta). Para ver preguntas concretas: `node prompts/herramientas/show.js <tN.json> N-12 N-40`.
2. **Extraer el texto del PDF**: `pdftotext -enc UTF-8 -layout "<pdf>" <scratchpad>/tema.txt` (también el de la actualización). Mira el índice: qué normas entran en el tema y qué añade la actualización.
3. **Si el tema YA tiene esquema** en `esquemas.html` (p. ej. Tema 1, 2, 7, 8, 9): no lo borres. Compara lo que preguntan los tests con lo que ya hay: añade los artículos/apartados que falten (en su sitio, por orden), completa los que se queden cortos y avísame de lo que sobre (artículos del esquema sin ninguna pregunta) en vez de quitarlo por tu cuenta.
4. **Construir el esquema**:
   - **Un artículo = una ficha.** Si varias preguntas tocan el mismo artículo/apartado, se juntan; **nunca duplicar**.
   - Solo los apartados/datos que preguntan los tests, con el **texto literal del PDF** (no resúmenes inventados).
   - Orden: el del índice del temario (N.1, N.2…), con `bloqueTitulo()` por norma y por título/capítulo.
   - Sello `EX` (tercer argumento `true`) en los artículos más preguntados o con preguntas oficiales.
   - `trampa()` justo debajo del artículo al que corresponde (cifras que se confunden, versiones antiguas, «no» vs «sí»…).
   **Cajas de trampas/trucos (más currado, no solo una lista de cifras):** usa `trampa(titulo, html)` con títulos variados y útiles: «Cifras que se confunden», «Trampa de examen», «Ojo a la redacción», «Truco para recordarlo» (regla mnemotécnica corta basada SOLO en el texto, p. ej. «2 meses para resolver, 1 mes para recurrir»), «Ten en cuenta», «Cuidado: no es lo mismo…» (hábiles/naturales, órgano que propone ≠ órgano que resuelve, «podrá» ≠ «deberá», excepciones). Para «Cifras que se confunden» el formato es EXACTO: `trampa("Cifras que se confunden", "<em>¿de qué es esta cifra?</em><strong>cifra correcta</strong> — no cifra falsa 1 · no cifra falsa 2 · no cifra falsa 3")`. La cifra va con SU unidad («2 meses», «10 días hábiles», «50.000 euros») y **corta** (no repetir toda la frase en cada opción; el contexto va en el `<em>`). Las falsas son las que aparecen como distractores o se confunden con la correcta (2 meses ≠ 3 ni 4). La app la dibuja como tarjeta (⏱ Plazo / 💶 Cuantía) con la correcta en grande y las falsas tachadas. Pon una por cada cifra o plazo importante del artículo y, además, 1-2 de «Truco» o «Ten en cuenta» por tema.
   - Si un artículo remite a otro («conforme al art. 6.7»), explicar entre paréntesis de qué trata.
   - Un único `recuerda([...])` al **final** con los plazos, mayorías y órganos clave del tema.
   - Si hay **resumen de un compañero**, leerlo (`unzip` del .docx → `word/document.xml`) y añadir lo que falte en su artículo.
   - Normas preguntadas que **no estén en el temario**: en un bloque «ANEXO» al final, con aviso de que no se han podido cotejar con el PDF.
   - Código en `esquemas.html`: objeto `TN = {}` con un bloque por norma (`/* TN_XXX */ TN.xxx = bloqueTitulo(...) + articulo(...) ...`) y al final `/* TN_RECUERDA + ensamblaje */` que hace `esquemas[N-1].titulo = ...; esquemas[N-1].html = leyenda() + ... + recuerda([...])`, colocado **justo antes de `render();`**.
5. **Si adjunto MI temario subrayado (escaneo con mis subrayados)**: el texto y los datos salen SOLO del temario oficial; del mío solo se leen los **colores** (`subrayado-pdf.py` → `aplicar-subrayado-pdf.js` → reglas de color → `unir-subrayados.js`, como en los temas 1, 12 y 13). Si los textos se contradicen manda el oficial y me avisas. Mi subrayado manda sobre el 70 %: en ese caso no fuerces el porcentaje. Además, **recrea como esquemas visuales todos los cuadros, tablas y esquemas que traiga mi temario subrayado** (componentes de `visuales-lib.js`, incluida `tabla`; ver el detalle en `PROMPT_PREGUNTAS_EXAMINADOR.md`) y añade los visuales propios que ayuden a estudiar. **Marcas de examen a mano (obligatorio):** recorre todas las páginas del temario subrayado y localiza cada círculo de bolígrafo con «EX» o «EXOF» (examen / examen oficial) y cada sello «PREGUNTA EXAMEN 2020»; **todo artículo con una de esas marcas tiene que estar en el esquema** aunque ninguna pregunta del test lo toque (ver «Marcas de examen que yo pongo a mano» en `PROMPT_PREGUNTAS_EXAMINADOR.md`: herramienta `anadir-ex-t11.js`, y para cada marca sin pregunta oficial redacta una con `preguntas-ex-t11.js`). El resto de este punto es para cuando NO hay temario subrayado.
5 bis. **Subrayado Método Prefortia ≈ 70 %** (como los temas 1, 4 y 5: casi cada palabra con contenido coloreada; solo quedan en plano artículos, preposiciones, conjunciones y nexos). **Es un requisito medible**: al terminar ejecuta `node prompts/herramientas/densidad.js N`; debe dar **≥ 70 % de los caracteres** subrayados (temas 1, 4 y 5: 68-73 %). Si da menos, subraya más antes de seguir. Un esquema con poco color (20-30 %) o pintado casi todo de naranja se considera mal hecho. **Los colores se reparten como en los temas 1, 2 y 3 (no pintes todo de naranja/salmón)**: naranja SOLO para los conceptos jurídicos clave (≈ 5-12 % de las palabras); amarillo para calificativos y matices (≈ 10-20 %); verde para órganos, autoridades y personas con cargo; morado/lila para las verbos de acción; azul para plazos y cifras; rojo subrayado para no/salvo/podrá/deberá…; y la respuesta de cada pregunta resaltada como en los otros temas. Pinta a mano por categorías (puedes apoyarte en un script, pero el resultado se revisa a ojo comparándolo con el tema 1, 4 y 5). `densidad.js` también imprime el reparto por colores y avisa si hay demasiado naranja.
   - `m-autoridad` **verde**: órganos, autoridades, Estados, Agencia, Comisión, director ejecutivo…
   - `m-plazo` **azul**: plazos, fechas, cifras, porcentajes, «anualmente», «24/7»…
   - `m-accion` **morado**: verbos de acción (notificará, decide, suprime, vincula…).
   - `m-destacable` **naranja**: conceptos jurídicos y sustantivos clave.
   - `m-personalizado` **amarillo**: calificativos y matices (efectiva, motivada, técnicamente imposible…).
   - `<u class="m-clave">` **rojo subrayado, sin fondo**: no, salvo, únicamente, cuando, si, podrá, deberá, al menos, a más tardar, cualquier… (cerrar siempre con `</u>`, nunca con `</mark>`).
   - Poco amarillo: cada palabra con su color por categoría (verbos → morado, órganos → verde, cifras y plazos → azul, conceptos y sustantivos → naranja); el amarillo solo para matices.
   - Tras redactar, pasar el densificador, **medir con `densidad.js`** y **revisar visualmente**:
     `node prompts/herramientas/densify.js esquemas.html N` (solo colorea texto que aún esté en plano; añadir a sus listas los términos propios del tema si hace falta).
5 bis. **ESQUEMAS VISUALES OBLIGATORIOS debajo de los artículos (pauta del usuario, 11/10/2026: «no me hagas solo texto, texto y texto»).** El texto literal se queda SIEMPRE; debajo de cada ficha que tenga alguno de estos contenidos va su esquema (con `visuales-lib.js` / `expres-lib.js`):
   | Si el artículo tiene… | Esquema |
   |---|---|
   | Lista (requisitos, supuestos, sectores, a) b) c)…) | `arbol`: caja central + ramas |
   | Órganos / competencias (quién propone, quién decide, quién instruye) | `cuadro`: tabla de competencias |
   | Plazos o cifras | `cuadro` / `plazos`: tabla de plazos |
   | Procedimiento o pasos | `flujo` con flechas |
   | Dos cosas parecidas (residentes/no residentes, previsible/imprevisible) | `cols` comparativas («espejo») |
   | Clasificaciones (muy graves / graves / leves) | `cols` |
   - Cada caja lleva la **idea completa** (no frases cortadas) y el texto sale del articulado verificado.
   - **Colores = los del esquema completo del usuario**: no se colorea a mano; `expres-lib.js` copia el subrayado de las fichas del tema (cada expresión con el color que el usuario le dio). Las respuestas con `Rq(texto, [ids])` → enlazadas a sus preguntas.
   - Comprobar con `node prompts/herramientas/sin-esquema.js N` que **no queda ninguna ficha de esos tipos sin esquema**.
5 ter. **ESQUEMA ⚡ EXPRÉS del tema (obligatorio, a la vez que el esquema completo).** Resumen de 1 hora para los dos últimos meses: **17-20 págs A4** (3-4 min/pág).
   - Script `prompts/herramientas/expres-tN.js`, con `expres-lib.js`. **Prohibido recortar frases con «…»** (el usuario lo rechazó). Dos casos (detalle en `PROMPT_PREGUNTAS_EXAMINADOR.md`, «Esquemas visuales y ⚡ Exprés»):
     - **Tema corto** (párrafos con pregunta + cuadros ≤ 20 págs): **automático**, `X.publica(X.automatico(require('./visuales-tN.js')), bloques)` — plantilla `expres-t12.js`; `visuales-tN.js` exporta `V` (`module.exports = V; if (require.main === module) L.inserta(N, V);`).
     - **Tema largo**: **redactado**, plantilla `expres-t2.js`: **fichas literales** (`literal(k,[párrafos])`, párrafos ENTEROS con su subrayado; para lo EX y lo más preguntado) + **esquemas visuales** (los de 5 bis) + trampas.
   - Objetivo: la línea «PREGUNTAS DEL TEMA EN LA APP CON ENLACE EN EL EXPRÉS» de `publica()` al **100 %**.
   - Cada esquema del Exprés se registra con `pon('cabecera de la ficha', esquema)` y **se adjunta también debajo de esa ficha en el esquema normal**: `visuales-tN.js` hace `require('./expres-tN.js').visuales().forEach(([c, h]) => v(c, h))` (mismo esquema en los dos sitios, sin duplicar trabajo).
   - Ejecutar `node prompts/herramientas/expres-tN.js` (escribe el Exprés y da cobertura y págs) y `node prompts/herramientas/visuales-tN.js` (adjunta los esquemas al esquema normal). Objetivo: **≥ 90 % de las preguntas del tema enlazadas en el Exprés** dentro de 17-20 págs; si se pasa, más esquemas y menos literal; si sobra, más literal.
   - Se ve con el botón **⚡ Exprés** (⋯ Menú). La barra dorada muestra págs, minutos y preguntas enlazadas por bloque.
6. **Corregir las preguntas que contradigan el temario**, a la vez que se hace el esquema: respuesta mal marcada, cifra de una versión antigua, ninguna opción correcta… Verificar **siempre en el PDF** y corregir en `test-oficial-conocimiento.html` (`correcta`, texto de la opción si hace falta y `explicacion` citando el artículo literal) con la plantilla `prompts/herramientas/fix.js`. Si algo no se puede verificar en el PDF, no tocarlo y avisarme. **Esto vale también para las preguntas OFICIALES: el temario es el que manda, así que se corrigen si lo contradicen; pero Si una pregunta (oficial o IA) es dudosa de verdad o está corrupta de verdad y no se puede dejar bien con seguridad contra el temario oficial, se ELIMINA (autorizado el 06/10/2026) con `borrar-preguntas.js` y se me avisa de cuáles y por qué; lo que se pueda arreglar (respuesta mal marcada, cifra antigua) se corrige.**
7. **Comprobaciones**: balance `<mark>`/`</mark>` y `<u>`/`</u>`; sintaxis de los `<script>` (`new Function` con Node); abrir `esquemas.html` en el navegador, tema N, sin errores de consola, captura de pantalla; móvil incluido.
7 bis. **Regenerar el mapa pregunta ↔ esquema y la cobertura** (enlaza cada respuesta marcada con sus preguntas: dorado = oficial, rojo = IA, EX en el párrafo exacto, colores por artículo y botón «📘 Ver en el esquema» del test):
   `node prompts/herramientas/mapa-preguntas.js` y `node prompts/herramientas/cobertura.js` (añadir antes el PDF de texto del tema a su lista PDFS) (con `--ver N` lista las asignaciones del tema N para revisarlas). Repetirlo también cuando se añadan o corrijan preguntas.
8. **Commit y push** a `origin/main` de cada cambio (esquema y preguntas por separado), sin esperar a que lo pida.
9. **Informe final corto**: Exprés (págs, minutos, % de preguntas enlazadas por bloque), nº de esquemas visuales añadidos y salida de `sin-esquema.js`, nº de preguntas usadas, normas cubiertas, preguntas corregidas (id → cambio y artículo), normas fuera del temario, cosas no verificables y estimación de páginas/tiempo de estudio.
