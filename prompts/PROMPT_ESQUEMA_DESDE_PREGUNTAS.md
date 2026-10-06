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
   - Si un artículo remite a otro («conforme al art. 6.7»), explicar entre paréntesis de qué trata.
   - Un único `recuerda([...])` al **final** con los plazos, mayorías y órganos clave del tema.
   - Si hay **resumen de un compañero**, leerlo (`unzip` del .docx → `word/document.xml`) y añadir lo que falte en su artículo.
   - Normas preguntadas que **no estén en el temario**: en un bloque «ANEXO» al final, con aviso de que no se han podido cotejar con el PDF.
   - Código en `esquemas.html`: objeto `TN = {}` con un bloque por norma (`/* TN_XXX */ TN.xxx = bloqueTitulo(...) + articulo(...) ...`) y al final `/* TN_RECUERDA + ensamblaje */` que hace `esquemas[N-1].titulo = ...; esquemas[N-1].html = leyenda() + ... + recuerda([...])`, colocado **justo antes de `render();`**.
5. **Si adjunto MI temario subrayado (escaneo con mis subrayados)**: el texto y los datos salen SOLO del temario oficial; del mío solo se leen los **colores** (`subrayado-pdf.py` → `aplicar-subrayado-pdf.js` → reglas de color → `unir-subrayados.js`, como en los temas 1, 12 y 13). Si los textos se contradicen manda el oficial y me avisas. Mi subrayado manda sobre el 70 %: en ese caso no fuerces el porcentaje. Además, **recrea como esquemas visuales todos los cuadros, tablas y esquemas que traiga mi temario subrayado** (componentes de `visuales-lib.js`, incluida `tabla`; ver el detalle en `PROMPT_PREGUNTAS_EXAMINADOR.md`) y añade los visuales propios que ayuden a estudiar. El resto de este punto es para cuando NO hay temario subrayado.
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
6. **Corregir las preguntas que contradigan el temario**, a la vez que se hace el esquema: respuesta mal marcada, cifra de una versión antigua, ninguna opción correcta… Verificar **siempre en el PDF** y corregir en `test-oficial-conocimiento.html` (`correcta`, texto de la opción si hace falta y `explicacion` citando el artículo literal) con la plantilla `prompts/herramientas/fix.js`. Si algo no se puede verificar en el PDF, no tocarlo y avisarme. **Esto vale también para las preguntas OFICIALES: el temario es el que manda, así que se corrigen si lo contradicen; pero NUNCA se elimina ninguna pregunta oficial.**
7. **Comprobaciones**: balance `<mark>`/`</mark>` y `<u>`/`</u>`; sintaxis de los `<script>` (`new Function` con Node); abrir `esquemas.html` en el navegador, tema N, sin errores de consola, captura de pantalla; móvil incluido.
7 bis. **Regenerar el mapa pregunta ↔ esquema y la cobertura** (enlaza cada respuesta marcada con sus preguntas: dorado = oficial, rojo = IA, EX en el párrafo exacto, colores por artículo y botón «📘 Ver en el esquema» del test):
   `node prompts/herramientas/mapa-preguntas.js` y `node prompts/herramientas/cobertura.js` (añadir antes el PDF de texto del tema a su lista PDFS) (con `--ver N` lista las asignaciones del tema N para revisarlas). Repetirlo también cuando se añadan o corrijan preguntas.
8. **Commit y push** a `origin/main` de cada cambio (esquema y preguntas por separado), sin esperar a que lo pida.
9. **Informe final corto**: nº de preguntas usadas, normas cubiertas, preguntas corregidas (id → cambio y artículo), normas fuera del temario, cosas no verificables y estimación de páginas/tiempo de estudio.
