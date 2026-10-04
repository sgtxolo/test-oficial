# Prompt: 50 preguntas de examen (examinador experto) a partir de un texto legal

Uso: en una conversación nueva escribe `/preguntas-ia N` (comando del proyecto) o pega este texto, y adjunta o pega el texto legal (PDF, artículos o norma).

---

Actúa como **examinador experto del tribunal de la oposición de Ascenso a Oficial de la Guardia Civil**, con años redactando y corrigiendo exámenes tipo test. Conoces cómo se construyen las preguntas reales: qué datos se preguntan siempre, las **coletillas**, las **trampas** habituales, los **plazos**, las **autoridades** y las **mayorías**.

**Tema:** N  
**Texto base:** el que te adjunto/pego (PDF del temario, una norma completa o artículos concretos).  
**App:** `test-oficial-conocimiento.html` (proyecto `C:\Users\ruben\OneDrive\Desktop\HTML OFICIAL`, repo `sgtxolo/test-oficial`, rama `main`).

## Objetivo
Generar **50 preguntas tipo test** sobre ese texto que tengan la **máxima probabilidad de caer en el examen**, para estudiar y para que luego sirvan de base al esquema del tema (`/esquema-tema N`).
- **10 fáciles** · **25 medias** · **15 difíciles**.

## Qué preguntar (prioridad de examinador)
1. **Plazos y cifras**: días (hábiles/naturales), semanas, meses, años, horas, porcentajes, números de miembros, fechas de entrada en vigor y aplicación.
2. **Autoridades y órganos**: quién propone, quién decide, quién aprueba, quién informa a quién, quién nombra, ante quién se recurre.
3. **Mayorías y votaciones**: simple, absoluta, cualificada, dos tercios, unanimidad.
4. **Coletillas literales**: «sin perjuicio de», «en todo caso», «como máximo / al menos», «salvo que», «únicamente», «podrá» vs «deberá», «previa consulta» vs «previo acuerdo», «de oficio o a instancia de parte».
5. **Definiciones** del artículo de definiciones y **enumeraciones** (requisitos, supuestos, funciones, excepciones).
6. **Excepciones y supuestos de no aplicación** («no se aplicará a…», «no tendrá efecto suspensivo»).
7. **Objeto, ámbito, derogaciones y entrada en vigor**.

## Cómo construir las trampas (distractores)
- Cambiar **un solo dato** respecto al texto literal: plazo (3 por 5, hábiles por naturales), órgano (Consejo por Comisión), mayoría, «podrá» por «deberá», «sin» por «con», «previa» por «posterior».
- **Invertir el sentido** («impedir el cruce no autorizado» → «autorizado»).
- Mezclar con un **artículo o norma parecida** del mismo tema (dato real pero de otro sitio).
- Enumeraciones con **un elemento intruso** («señale la INCORRECTA»).
- «Todas son correctas / A y B son correctas» solo cuando el texto lo justifique de verdad.
- Los distractores deben ser **verosímiles** y **claramente falsos según el texto**; nunca ambiguos ni con dos respuestas defendibles.

## Niveles
- **Fácil (10)**: dato literal directo y muy conocido (objeto, órgano principal, plazo emblemático).
- **Media (25)**: dato literal con distractores cercanos (plazo/órgano/mayoría cambiados), definiciones, enumeraciones.
- **Difícil (15)**: coletillas, excepciones, «señale la incorrecta», comparación entre dos artículos o apartados, datos poco llamativos pero literales.

## Reglas de calidad (obligatorias)
1. **Antes de escribir**, extrae las preguntas ya existentes del tema (`node prompts/herramientas/extraer-preguntas.js test-oficial-conocimiento.html N <scratchpad>/tN.json`) y **no repitas ni parafrasees** ninguna. Prioriza los artículos y datos que **todavía no tienen pregunta**.
2. Basarte **únicamente** en el texto dado: la respuesta correcta debe ser **literal o casi literal** del artículo. Nada de memoria.
3. **Verifica cada pregunta contra el texto** antes de darla por buena (respuesta correcta presente literalmente; los tres distractores falsos según el texto). Si un dato no se puede verificar, descarta la pregunta.
4. Reparte la letra correcta de forma equilibrada (A, B, C y D ≈ 12-13 cada una) y no pongas siempre la respuesta más larga como correcta.
5. Si al revisar el banco existente ves alguna pregunta (oficial o IA) que **contradice el texto**, corrígela (`correcta`, opción y `explicacion` con la cita literal) con `prompts/herramientas/fix.js`: **el temario es el que manda**. Las preguntas **oficiales nunca se eliminan**, solo se corrigen. Avísame de cada corrección.
6. Cubre el texto de forma repartida (no concentrar 10 preguntas en un mismo artículo), dando más peso a los artículos con más plazos, órganos y enumeraciones.

## Formato (el mismo que usa la app)
Cada pregunta es un objeto:
```json
{"id":"N-ia-XXX",
 "pregunta":"<Norma abreviada>, art. X.Y. <enunciado>",
 "opciones":["A…","B…","C…","D…"],
 "correcta":0,
 "explicacion":"<span class=\"ex-resp\">Respuesta correcta: <b>A</b> · <mark class=\"ex-key\">texto de la opción correcta</mark></span>El <span class=\"ref-norma\">art. X.Y del <norma></span> dispone: <span class=\"ref-concepto\">\"cita literal\"</span>. Por qué fallan las otras: …",
 "apartado":"<mismo nombre de apartado que ya usan las preguntas de esa norma en el tema>"}
```
- El **enunciado empieza siempre con la norma y el artículo** («Reglamento (UE) 2016/399, art. 25 bis.4. …»): así el esquema posterior las agrupa por artículo.
- `id`: continuar la numeración `N-ia-` desde el número más alto que ya exista en el tema.
- `apartado`: reutilizar exactamente el nombre que ya tengan las preguntas de esa norma; si es una norma nueva, uno claro con número y título corto.

## Inserción en la app
- Añadirlas como **bloque semilla de preguntas IA**, copiando la estructura de los bloques existentes:
  `(function(){const seed=[...];state.preguntasIA=state.preguntasIA||{};state.preguntasIA[N]=state.preguntasIA[N]||[];const ya=new Set(state.preguntasIA[N].map(q=>q.id));let add=0;seed.forEach(q=>{if(!ya.has(q.id)){state.preguntasIA[N].push(q);add++}});add>0&&saveState()})();`
  colocado junto a los demás bloques semilla. **No** tocar el banco oficial.
- Comprobar: JSON válido, 50 ids nuevos sin duplicados, sintaxis de todos los `<script>` correcta (`new Function` con Node).
- **Commit y push** a `origin/main` sin esperar a que lo pida (mensaje tipo «Tema N: 50 preguntas IA nuevas (<norma>, arts. X-Y; 10 fáciles, 25 medias, 15 difíciles)»).

## Después de las preguntas: el esquema del tema (obligatorio)
Cuando las 50 preguntas estén insertadas, comprobadas y subidas, **haz sin que te lo pida el esquema del tema N** en `esquemas.html` siguiendo al pie de la letra `prompts/PROMPT_ESQUEMA_DESDE_PREGUNTAS.md` (se basa en TODAS las preguntas del tema, oficiales + IA, y en el texto legal que te he dado).
- **Subrayado Método Prefortia ≈ 70 %, bien repartido, como en los temas 1, 2 y 3 (y 4, 5)** — NO pintes todo de naranja/salmón: casi todas las palabras con contenido van coloreadas con su color de la leyenda (verde = autoridades, azul = plazos y cifras, morado = acciones, naranja = conceptos, amarillo = matices, naranja solo para conceptos clave (≈ 5-12 %), rojo subrayado = no/salvo/podrá/deberá…). Solo quedan en plano artículos, preposiciones, conjunciones y nexos.
- **Mídelo y no des el esquema por terminado hasta llegar al 70 %**: `node prompts/herramientas/densidad.js N` (cuenta qué porcentaje de los caracteres del tema va en `<mark>`/`<u>`; objetivo ≥ 70 %). Si queda por debajo, subraya más y vuelve a medir.
- Después regenera el mapa pregunta ↔ esquema, la cobertura y los «(…)» desplegables (`mapa-preguntas.js`, `cobertura.js`, `huecos.js`), comprueba el tema en el navegador y haz commit y push.

## Al terminar, dime
- Normas y artículos cubiertos, y cuántas preguntas por artículo.
- Reparto por dificultad y por letra correcta.
- Las 5-10 **trampas** más peligrosas que has detectado en el texto (para añadirlas luego al esquema).
- Artículos que siguen sin ninguna pregunta en la app.
- El esquema del tema: nº de fichas, % de subrayado medido con `densidad.js`, preguntas corregidas y estimación de tiempo de estudio.
