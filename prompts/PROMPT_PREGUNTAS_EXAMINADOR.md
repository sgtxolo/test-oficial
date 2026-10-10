# Prompt: preguntas de examen (examinador experto), 50 por cada 10 páginas del temario

Uso: en una conversación nueva escribe `/preguntas-ia N` (comando del proyecto) o pega este texto, y adjunta o pega el texto legal (PDF, artículos o norma).

---

Actúa como **examinador experto del tribunal de la oposición de Ascenso a Oficial de la Guardia Civil**, con años redactando y corrigiendo exámenes tipo test. Conoces cómo se construyen las preguntas reales: qué datos se preguntan siempre, las **coletillas**, las **trampas** habituales, los **plazos**, las **autoridades** y las **mayorías**.

**Tema:** N  
**Texto base:** el que te adjunto/pego (PDF del temario, una norma completa o artículos concretos).  
**App:** `test-oficial-conocimiento.html` (proyecto `C:\Users\ruben\OneDrive\Desktop\HTML OFICIAL`, repo `sgtxolo/test-oficial`, rama `main`).

## Dos fuentes: temario oficial + MI temario subrayado (si lo adjunto)
Puedo darte **dos documentos del mismo tema**, y cada uno vale para una cosa distinta:
1. **Temario OFICIAL** (PDF limpio o el escaneado oficial de `OFICIAL 2026-27\TEMARIO ESCANEADO 2026-27\`): es **la única fuente del texto y de los datos**. De aquí salen las preguntas, el texto literal de las fichas y todas las verificaciones.
2. **Mi temario SUBRAYADO** (escaneo con mis subrayados a mano): **solo te fijas en el subrayado** (colores del fosforito, trazo rojo, cuadros y círculos). **Nunca copies texto de este documento ni lo uses para verificar un dato**: puede tener erratas, versiones antiguas o fallos de OCR. Si el texto de los dos documentos se contradice, **gana siempre el oficial** y me avisas de la discrepancia.
   - Úsalo para (a) **decidir de qué se pregunta en cada bloque de 10 páginas: lo que yo tengo subrayado es lo más importante** y (b) **recrear mi subrayado exacto en el esquema** (ver «Después de las preguntas»).
   - **Cómo se priorizan las preguntas con mi subrayado (obligatorio):**
     1. Antes de redactar, lee mi subrayado (`py prompts/herramientas/subrayado-pdf.py "<pdf subrayado>" <scratchpad>/subrayado.json`) y **localízalo en el texto del temario OFICIAL**: para cada artículo y apartado calcula cuánto subrayado lleva y qué palabras/datos concretos están marcados (fosforitos de plazo, autoridad, acción, cifras, trazo rojo, cuadros y círculos). Un círculo o cuadro a mano = dato que yo considero clave.
     2. En cada bloque de 10 páginas, **al menos 35 de las 50 preguntas** (≈ 70 %) salen de lo que yo tengo subrayado, con prioridad a lo que tiene más marcas (datos rodeados, trazo rojo en «no / salvo / únicamente»). Las otras 15 cubren lo importante que no he subrayado. Si el bloque tiene poco subrayado, completas tú con los datos más examinables.
     2 bis. Las trampas se construyen con las **coletillas, plazos y órganos que yo he marcado** (es lo que más me interesa que sepa distinguir).
     3. **El texto de cada pregunta, de la respuesta correcta y de la cita de la explicación sale SIEMPRE del temario oficial, nunca de mi PDF subrayado.** De mi PDF solo sabes *qué* he marcado, no *qué dice*. Si una palabra subrayada no se puede localizar con seguridad en el oficial (OCR dudoso), no la uses como base: pregunta por ese artículo con el texto oficial o descártala y dímelo.
     4. Verifica cada pregunta contra el oficial como siempre. Si mi subrayado apunta a un dato que el oficial dice distinto (errata o versión antigua mía), **la pregunta sigue el oficial** y me lo señalas en el informe.
     5. Al final entrégame una tabla: artículo → nº de preguntas → «% subrayado mío» de ese artículo, para ver que el peso va donde yo subrayé.
   - **Comparar los dos PDF y atender a las páginas que solo tiene el mío (pauta del usuario, 10/10/2026):** al empezar, compara mi PDF subrayado con el oficial (nº de páginas y contenido por norma). Mi subrayado suele ser **la edición más reciente** (p. ej. Tema 1: el mío es de 08-08-2026 y el oficial de 09-09-2025). **Si mi PDF tiene páginas o apartados que el oficial no trae** (actualizaciones, protocolos, reservas y declaraciones, fechas de entrada en vigor, informes explicativos…), esas páginas **también cuentan: se hacen preguntas IA de ellas (5 por página)**, con la cita tomada de mi PDF (renderizando la página como imagen si el OCR es dudoso) y diciéndome en la explicación y en el informe que «no figura en el temario oficial». Si el texto de una página común difiere (actualización), manda el mío para esa página y me avisas de la diferencia. En el informe lista qué páginas son solo mías y cuántas preguntas salieron de ellas.
   - Si no te adjunto el segundo documento, el esquema se subraya con el método Prefortia habitual (≈ 70 %, por categorías).

## Marcas de examen que yo pongo a mano: EX, EXOF y EXAMEN 2020 (OBLIGATORIO, se hace todo sin que te lo pida)
Con este prompt y los dos temarios (el oficial y el mío subrayado) **tienes que hacerlo todo de principio a fin**: las preguntas IA (50 por cada 10 páginas), el esquema con mi subrayado, los cuadros y todo lo de esta sección. No me preguntes cada paso.

En mi temario subrayado marco a mano lo que ha caído o caerá en examen:
- **Círculo a bolígrafo (normalmente azul) con «EX»** (a veces «Ex», «EX*», «ESQ»): examen. Va en el margen, junto al apartado concreto.
- **Círculo a bolígrafo con «EXOF»** (a veces en minúscula, «exof»): **examen oficial**, lo más importante.
- **Sello impreso «PREGUNTA EXAMEN 2020»** en el borde izquierdo (a veces con un icono «B» y un número): salió en el examen oficial de 2020.
- Un círculo con R (resumen), un ✱ rojo o una flecha señalan importancia, pero **no** son EX.

Qué haces con cada marca (todo, y en este orden):
1. **Localízalas todas.** Recorre **todas las páginas** del PDF subrayado una a una (renderiza cada página con PyMuPDF a 90-100 dpi y míralas; no te fíes del OCR de `subrayado-pdf.py`, que no ve los círculos de bolígrafo). Haz una lista: norma → artículo → apartado → tipo de marca (EX / EXOF / EXAMEN 2020) → página. Anota también cada **cuadro, tabla o esquema** del temario.
2. **Cada artículo con marca tiene que estar en el esquema** (`esquemas.html`), aunque ninguna pregunta del test lo toque. Compara tu lista con los artículos del esquema y **añade los que falten** con texto literal del temario oficial y mi subrayado, con el círculo EX en su párrafo: `node prompts/herramientas/anadir-ex-t11.js <subrayado.json>` es la plantilla (ajusta su lista NUEVOS, las normas y los rangos de páginas al tema N). Mantén el orden del temario.
3. **Cada apartado marcado debe tener pregunta OFICIAL en el test de conocimientos** (`test-oficial-conocimiento.html`, banco oficial, ids `N-<número siguiente>`, **no** `N-ia-`). Para cada artículo marcado cuenta con `extraer-preguntas.js` cuántas preguntas **oficiales** lo tratan (busca «art. X»/«artículo X» en enunciado y explicación, dentro de la norma). **Si no hay ninguna, redacta tú una pregunta como si fuera de examen real** (enunciado «<Norma>. <Materia>. …», 4 opciones, una sola correcta, distractores verosímiles cambiando un dato: plazo, órgano, mayoría, «podrá»/«deberá», «sin»/«con»; también «señale la INCORRECTA» cuando encaje), con **cita literal del temario oficial** en la explicación, y la añades al banco oficial detrás de la última pregunta oficial del tema. Plantilla: `prompts/herramientas/preguntas-ex-t11.js` (tema 11: 64 preguntas, ids 11-174 a 11-237). Prioriza EXOF y EXAMEN 2020, luego EX. Reparte la letra correcta de forma equilibrada. Si ya hay pregunta oficial de ese artículo, no la dupliques.
4. **Los cuadros, tablas y esquemas** del temario subrayado también son preguntas de examen: recréalos **todos** con `visuales-lib.js` (ver paso 6 de «Después de las preguntas»); la plantilla es `prompts/herramientas/visuales-t11.js`. Los cuadros que llevan círculo EX son prioritarios.
5. Después: sintaxis de los `<script>`, `mapa-preguntas.js` y `cobertura.js`, subir el `CACHE_NAME` de `service-worker.js`, commit y push.
6. **Informe final** con: nº de marcas EX / EXOF / EXAMEN encontradas, cuántas ya tenían pregunta oficial, cuántas preguntas oficiales nuevas has redactado (por tipo de marca), artículos añadidos al esquema, cuadros recreados, y lo que no hayas podido leer o verificar.

## Objetivo: 50 preguntas por cada 10 páginas del temario (cambio del 10/10/2026)
**Se hacen 50 preguntas IA por cada bloque de 10 páginas** del temario que te doy (= 5 preguntas por página): 10 páginas → 50 preguntas, 100 páginas → 500, 47 páginas → 235. El último bloque, si tiene menos de 10 páginas, lleva 5 por página. Cuenta las páginas del PDF del tema (solo las del tema si el PDF trae varios) y dime al principio cuántos bloques y cuántas preguntas en total salen.
- Trabaja **bloque a bloque** (págs. 1-10, 11-20…): redacta, verifica, mide el sesgo de longitud e inserta las 50 de cada bloque antes de pasar al siguiente (con commit y push por bloque), para no perder trabajo si el tema es largo.

**Cómo trabaja el examinador en cada bloque:**
1. Lee las 10 páginas enteras como lo haría el tribunal preparando el examen.
2. Elige **los puntos de esas páginas que un examinador real preguntaría**: los datos más «examinables» (plazos, órganos, mayorías, definiciones, enumeraciones, coletillas, excepciones). Lo que yo tengo subrayado o marcado con EX/EXOF/EXAMEN 2020 va primero.
3. Cada pregunta, **limpia y profesional**, como las del examen oficial: cuatro opciones, una sola correcta indiscutible.
4. Reparte las 50 por todo el bloque (no concentrar muchas en un mismo artículo), con más peso en los artículos con más plazos, órganos y enumeraciones.

## ESTILO OBLIGATORIO: como las preguntas OFICIALES del examen (pautas del usuario, 10/10/2026)
Antes de redactar, **lee 20-30 preguntas oficiales del banco** (`extraer-preguntas.js`, ids sin `-ia-`) y copia su forma. Lo que el usuario ha pedido expresamente:
1. **Enunciados LARGOS, como los oficiales**, no frases cortitas. Forma oficial: `«<Norma con su nombre completo>. <Rúbrica o materia del artículo>. <enunciado que reproduce casi literal el artículo hasta el dato que se pregunta>:»`. Ej.: «Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional. De la libertad provisional. Si el detenido solicitara, en la comparecencia prevista en el artículo anterior, su libertad provisional, el Juez Central de Instrucción acordará remitir dicha solicitud a la Corte, a través del Ministerio de Justicia, con indicación del plazo para recibir sus recomendaciones, que:». Alguna corta puede haber, pero **casi todas largas**.
2. **Opciones LARGAS y MUY PARECIDAS entre sí**: las cuatro reproducen la frase del artículo y **solo cambia una palabra o un dato** (podrá / deberá, únicamente / exclusivamente / en todo caso, previa / posterior, con / sin, Ministerio de Justicia / de Asuntos Exteriores, veinte / diez días, hábiles / naturales, primordial / subsidiaria…). Así hay que conocer la palabra exacta y no se adivina.
3. **La más larga NO debe ser la verdadera.** En examen oficial difícil es raro que la larga sea la buena: la correcta será la más corta o de longitud media en la mayoría; como mucho la más larga en ~1 de cada 4. Se mide con `sesgo-longitud.js` y si no cumple se reescribe.
4. **Completar el hueco** (muchas): el enunciado es el párrafo literal con `__________` en el dato y las opciones son las palabras que lo rellenan («…serán aprobadas por una mayoría __________ de los miembros de la Asamblea de los Estados Partes.»).
5. **«Señale la INCORRECTA»** (muchas): las cuatro opciones son **párrafos o apartados literales del artículo** y en uno se ha cambiado una pequeña cosa (una palabra, un plazo, un órgano); esa es la incorrecta.
6. **PROHIBIDO preguntar números de artículos o remisiones** («¿conforme a qué artículo del Estatuto…?», «¿qué artículo de la LECrim…?», «art. 91.2 o 3»): en el examen no se pregunta eso. Se pregunta el contenido (plazo, órgano, coletilla, requisito), nunca a qué precepto remite.
7. Dificultad de examen real: dato literal y relevante, sin rebuscar detalles marginales; la dificultad la ponen las opciones casi iguales.

**Formatos en cada bloque de 50 (orientativo):** ≈ 20 directas largas (enunciado casi literal + 4 finales parecidos) · ≈ 12 de completar el hueco · ≈ 12 de «señale la INCORRECTA» con párrafos literales · ≈ 6 combinadas («A y B son correctas», «A y B son incorrectas», «todas son correctas»), unas veces correctas y otras distractor y solo cuando el texto lo justifique.

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

## Preguntas IA antiguas del tema
Si las preguntas IA que ya había en el tema son **muy sencillas, están mal redactadas, preguntan números de artículo o la correcta es casi siempre la más larga**, se **eliminan todas** y se rehacen con este prompt (5 por página). Al borrarlas del HTML, añade la purga de `localStorage` para que desaparezcan también del móvil (bloque `purga IA tema N` tras su bloque semilla).

## Reglas de calidad (obligatorias)
1. **Antes de escribir**, extrae las preguntas ya existentes del tema (`node prompts/herramientas/extraer-preguntas.js test-oficial-conocimiento.html N <scratchpad>/tN.json`) y **no repitas ni parafrasees** ninguna. Prioriza los artículos y datos que **todavía no tienen pregunta**.
2. Basarte **únicamente** en el texto dado: la respuesta correcta debe ser **literal o casi literal** del artículo. Nada de memoria.
3. **Verifica cada pregunta contra el texto** antes de darla por buena (respuesta correcta presente literalmente; los tres distractores falsos según el texto). Si un dato no se puede verificar, descarta la pregunta.
4. Reparte la letra correcta de forma equilibrada (A, B, C y D ≈ 25 % cada una) y no pongas siempre la respuesta más larga como correcta.
5. Si al revisar el banco existente ves alguna pregunta (oficial o IA) que **contradice el texto**, corrígela (`correcta`, opción y `explicacion` con la cita literal) con `prompts/herramientas/fix.js`: **el temario es el que manda**. Avísame de cada corrección. **Excepción autorizada (06/10/2026):** si una pregunta (oficial o IA) es **dudosa de verdad o está corrupta de verdad** y no puedes dejarla bien con seguridad contra el temario oficial (opciones que pertenecen a otra pregunta, enunciado cortado o ilegible, ninguna opción correcta posible, dos opciones igual de defendibles, dato que no aparece en el temario oficial), **ELIMÍNALA** con `node prompts/herramientas/borrar-preguntas.js test-oficial-conocimiento.html <ids>` y dime cuáles y por qué; no dejes preguntas que me creen dudas. Lo que sí se puede arreglar (respuesta mal marcada, cifra antigua) se corrige, no se elimina.
6. 50 preguntas por bloque de 10 páginas, repartidas por todo el bloque (no concentrar 10 preguntas en un mismo artículo).
7. **Estilo examen oficial (obligatorio, el usuario detectó que la más larga era siempre la correcta):** las 4 opciones deben tener **longitud y estructura parecidas** (±20 %); la correcta no puede ser la más larga en más de ~30 % de las preguntas, y en muchas debe ser **la más corta o de longitud media**. Alarga los distractores con detalles verosímiles (órgano, plazo, matiz) o acorta la correcta. Varía el formato como en los exámenes reales: enunciado largo de supuesto con opciones breves, «señale la INCORRECTA», «¿cuál de las siguientes afirmaciones es correcta?», combinaciones («solo a y c»), completar el hueco, plazos/órganos/mayorías. No solo preguntas cortas y fáciles: piensa como un examinador de oposiciones y mide en cada pregunta la longitud de las 4 opciones antes de darla por buena.

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
- **Corrección SIEMPRE con este formato (lo pidió el usuario, 10/10/2026), en IA y en oficiales:** respuesta correcta resaltada → artículo en morado (`ref-norma`) → **texto literal del articulado en rojo** (`ref-concepto`, copiado del temario oficial) → explicación propia de la IA en texto normal («Por qué fallan las otras: …»). Si al revisar un tema ves preguntas (oficiales o IA) cuya corrección no lleva la cita literal en rojo, **complétala con la cita del temario oficial** (con `fix.js`); si el dato no está en el temario oficial (p. ej. historia general), déjala y avísame.
- El **enunciado empieza con la norma y la rúbrica del artículo**, como las oficiales (ver «Estilo obligatorio»).
- `id`: continuar la numeración `N-ia-` desde el número más alto que ya exista en el tema.
- `apartado`: reutilizar exactamente el nombre que ya tengan las preguntas de esa norma; si es una norma nueva, uno claro con número y título corto.

## Inserción en la app
- Añadirlas como **bloque semilla de preguntas IA**, copiando la estructura de los bloques existentes:
  `(function(){const seed=[...];syncSeedIA(N,seed)})();` (plantilla: `prompts/herramientas/preguntas-t1-bloque1.js`)
  colocado junto a los demás bloques semilla. **No** tocar el banco oficial.
- Comprobar: JSON válido, ids nuevos sin duplicados (50 por bloque de 10 páginas), sintaxis de todos los `<script>` correcta (`new Function` con Node).
- **Commit y push** a `origin/main` sin esperar a que lo pida (mensaje tipo «Tema N: 50 preguntas IA nuevas (págs. X-Y; <norma>)»).

## Después de las preguntas: el esquema del tema (obligatorio)
Cuando las preguntas estén insertadas, comprobadas y subidas, **haz sin que te lo pida el esquema del tema N** en `esquemas.html` siguiendo al pie de la letra `prompts/PROMPT_ESQUEMA_DESDE_PREGUNTAS.md` (se basa en TODAS las preguntas del tema, oficiales + IA, y en el texto legal que te he dado).
- **El esquema se basa al 100 % en MI PDF subrayado, sin fotos (pauta del usuario, 10/10/2026):** hay temarios de 100, 200 o 300 páginas y no se pueden mandar fotos. Lee directamente el PDF escaneado (colores con `subrayado-pdf.py` y, para las marcas a bolígrafo, cada página renderizada como imagen con PyMuPDF), compáralo con el texto del temario oficial y reproduce en el esquema **todo** lo que tengo: los colores del fosforito y **también los cuadrados, círculos, flechas, asteriscos y subrayados a lápiz/bolígrafo**, en las mismas palabras. El texto sigue siendo el del oficial; de mi PDF solo se copian colores y marcas.
- **Si te di MI temario subrayado: recrea mi subrayado** (en vez del subrayado automático por categorías), con las herramientas que ya usamos en los temas 1, 12 y 13:
  1. Lee el subrayado del PDF escaneado: `py prompts/herramientas/subrayado-pdf.py "<pdf subrayado>" <scratchpad>/subrayado.json` (pasa solo las páginas del tema si el PDF trae varios).
  2. Primero construye el esquema con el **texto literal del temario OFICIAL** (fichas por artículo, sin colorear aún lo que no se pueda emparejar).
  3. Alinea y aplica: `node prompts/herramientas/aplicar-subrayado-pdf.js <subrayado.json> esquemas.html <marca_inicio> <marca_fin> "<TN_NORMA:págs,…>" --dry` primero (revisa cuántas palabras se emparejan) y luego sin `--dry`. Solo se copian los **colores**; el texto sigue siendo el oficial. Las palabras que no se puedan emparejar con seguridad se dejan sin color y me las listas (no inventes).
  4. Reglas de color encima del subrayado (ya incluidas en el script): futuros en lila, órganos y autoridades en verde. Después `node prompts/herramientas/unir-subrayados.js`.
  5. Revisa a ojo 3-4 fichas contra mi PDF (captura de pantalla de cada una) y repórtame las diferencias. **No fuerces el 70 %**: mi subrayado manda; mide con `densidad.js` solo para informarme del porcentaje que tengo yo.
  6. **Recrea TODOS los esquemas, cuadros y tablas que traiga mi temario subrayado** (como el cuadro de plazos de los arts. 45 y 46 LJCA del Tema 13): recorre las páginas del PDF, localiza cada cuadro, tabla, árbol, flujo o comparativa que haya (suelen ser imágenes con cajas de colores) y reconstrúyelo como esquema visual en `esquemas.html`, colocado tras la ficha del artículo al que corresponde. Usa los componentes de `prompts/herramientas/visuales-lib.js` (`tabla` para cuadros jerárquicos objeto → plazo, `arbol`, `flujo`, `cols`, `plazos`) en un script `visuales-tN.js` y `L.inserta(N, V)`. Reglas: el contenido sale de lo que dice el cuadro **contrastado con el texto del temario oficial** (si el cuadro contradice al oficial, gana el oficial y me lo dices); respeta la estructura y los colores de mi cuadro (rosa = objeto, naranja/verde/cian = subapartados, cian/verde/naranja = plazos); las marcas a mano mías (círculos, cuadros, flechas, «EX», anotaciones) se trasladan como énfasis (`K()` para no/salvo, `P()` para plazos) y las anotaciones manuscritas se mencionan en tu informe. Si una página es una foto o el OCR no la lee bien, léela como imagen. **Esto va además de** los esquemas visuales propios que tú puedas añadir (árboles, flujos, comparaciones y plazos de los artículos con más contenido): son muy visuales y me ayudan a estudiar, así que haz también esos.
  7. Lo que yo no subrayé pero tiene pregunta en los tests sí queda marcado como respuesta (`m-resp`), que es independiente de mi subrayado.
- **Si NO te di mi temario subrayado: Subrayado Método Prefortia ≈ 70 %, bien repartido, como en los temas 1, 2 y 3 (y 4, 5)** — NO pintes todo de naranja/salmón: casi todas las palabras con contenido van coloreadas con su color de la leyenda (verde = autoridades, azul = plazos y cifras, morado = acciones, naranja = conceptos, amarillo = matices, naranja solo para conceptos clave (≈ 5-12 %), rojo subrayado = no/salvo/podrá/deberá…). Solo quedan en plano artículos, preposiciones, conjunciones y nexos.
- **(Solo en el caso sin mi subrayado)** **Mídelo y no des el esquema por terminado hasta llegar al 70 %**: `node prompts/herramientas/densidad.js N` (cuenta qué porcentaje de los caracteres del tema va en `<mark>`/`<u>`; objetivo ≥ 70 %). Si queda por debajo, subraya más y vuelve a medir.
- Después regenera el mapa pregunta ↔ esquema, la cobertura y los «(…)» desplegables (`mapa-preguntas.js`, `cobertura.js`, `huecos.js`), comprueba el tema en el navegador y haz commit y push.

## Al terminar, dime
- Normas y artículos cubiertos, y cuántas preguntas por artículo.
- Reparto por dificultad y por letra correcta.
- Las 5-10 **trampas** más peligrosas que has detectado en el texto (para añadirlas luego al esquema).
- Artículos que siguen sin ninguna pregunta en la app.
- El esquema del tema: nº de fichas, % de subrayado medido con `densidad.js`, preguntas corregidas y estimación de tiempo de estudio.
- Por cada bloque de páginas: nº de preguntas, artículos que cubren y reparto de formatos (directa / incorrecta / combinada).
- Si usaste mi temario subrayado: cuántas preguntas caen en fragmentos que yo tengo subrayado, la tabla artículo → preguntas → % subrayado mío, lista de los cuadros/esquemas del temario que has recreado (página → ficha donde quedó) y cuáles propios has añadido, además de palabras emparejadas / sin emparejar, discrepancias entre el texto del temario oficial y el mío (erratas, versiones distintas) y fichas revisadas a ojo contra mi PDF.


## Cajas de trampas y trucos del esquema (obligatorio, formato nuevo)
Al hacer el esquema, las cajas de ayuda **no son una lista de cifras sueltas**: cada cifra o plazo importante lleva su tarjeta «Cifras que se confunden» con el formato exacto `trampa("Cifras que se confunden", "<em>¿de qué es?</em><strong>2 meses</strong> — no 1 mes · no 3 meses · no 4 meses")` (cifra corta con su unidad, sin repetir la frase entera; hábiles/naturales cuando importe). Además, cajas variadas: «Trampa de examen», «Ojo a la redacción», «Truco para recordarlo» (regla mnemotécnica corta basada solo en el texto) y «Ten en cuenta». Detalle en `prompts/PROMPT_ESQUEMA_DESDE_PREGUNTAS.md`.

## RECUERDA y fichas R: siempre coloridos (obligatorio)
Los bloques «RECUERDA — Resumen conceptual y puntos clave de examen» y las fichas «RECUERDA del temario · R1 a Rn (pregunta → respuesta)» **no pueden quedar en texto plano**. La app los colorea sola al abrir el tema (`script-colorido` en `esquemas.html`), siempre que se escriban así:
- **RECUERDA**: un `<li>` por bloque temático, con el título en `<strong>` seguido de «:» (p. ej. `<strong>Ley 39/2015 · plazos y silencio</strong>: …`) y los datos separados por « · » (espacio, punto medio, espacio). Cada dato corto y concreto; las cifras con su unidad («3 meses», «10 días hábiles», «50.000 euros») y, si es clave, en `<strong>`. La app pinta cada bloque con su color, cada dato en su pastilla, las cifras/plazos en azul, los órganos en verde, los verbos de acción (podrá/deberá/salvo) en morado y los matices (hábiles, naturales, mitad, mayoría absoluta…) en amarillo.
- **Fichas R**: cada párrafo con el formato exacto `<b>R12</b> · <i>Norma.</i> Enunciado… → <mark class="m-resp">respuesta</mark>` (el nombre de la norma termina en punto, la flecha « → » separa pregunta y respuesta). La app dibuja el número R como etiqueta, la norma en cursiva de color, la flecha y la respuesta destacada, con un color por norma.
- No cambies este formato ni metas texto largo corrido: la vista rápida depende de él.

## PROHIBIDO: que la correcta sea la más larga (comprobación obligatoria con script)
Fallo detectado (08/10/2026): en las preguntas IA ya hechas la correcta era la **más larga en el 54-71 % de los casos** (tema 11: 54 %, tema 5: 57 %, tema 2: 71 %), así que se acertaba sin saber nada. **No se repite.**
1. Al redactar, **primero escribe los 3 distractores con el mismo nivel de detalle que la correcta** (misma estructura, mismas incisos, misma longitud ±15 %) y solo después fija cuál es la correcta. Los distractores se alargan con **detalle verosímil pero falso** (un órgano, una condición, un plazo cambiado), no con relleno.
2. En **al menos 1 de cada 3 preguntas la correcta es la más corta o de longitud media**; reparte también la letra (A/B/C/D ≈ 25 % cada una).
3. Formato de examen real: enunciados largos de supuesto con opciones breves, «señale la INCORRECTA» (aquí la correcta —la falsa— suele ser la que rompe el patrón), combinaciones («solo a y c»), completar el hueco. Mira cómo plantean las academias las oficiales y haz lo mismo, no solo preguntas cortas y fáciles.
4. **Antes de insertar**, guarda las preguntas en un JSON y ejecuta `node prompts/herramientas/sesgo-longitud.js <ese.json>`. **Si dice «NO CUMPLE» (correcta más larga en > 35 %, o correcta > 115 % de la media de las falsas) reescribe opciones y vuelve a medir hasta que cumpla.** No insertes preguntas que no pasen la comprobación. Dime el resultado de la medición en tu informe.

## Cuadros del temario: reproducir TODO el subrayado del usuario (colores, cuadrados, círculos, flechas)
Cuando el usuario dé una foto/PDF de un cuadro de su temario subrayado a mano, el cuadro del esquema (`prompts/herramientas/visuales-tNN.js`) debe copiar **todas** sus marcas, no solo los colores: naranja/amarillo/verde/azul por categoría, subrayado a lápiz, y también **cuadrados, círculos, flechas y asteriscos**. Ayudas (en `visuales-t11.js`): `CA(x)` cuadrado azul, `CR(x)` cuadrado rojo, `OA(x)` círculo azul, `O(x)` círculo rojo, `F` flecha ➜ (sin texto, se dibuja por CSS), `AS` asterisco rojo ✱, `U(x)` subrayado a lápiz, `G(x)` verde de órganos, `D(x)` naranja, `Y(x)` amarillo. Mantén el texto literal del temario oficial; las marcas solo envuelven palabras.
