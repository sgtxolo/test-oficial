# Prompt para generar esquemas en esquemas.html (Método Prefortia)

Usa este prompt tal cual (o pégalo en una nueva conversación) para que Claude siga haciendo los esquemas exactamente como en los Temas 1, 7 y 8 ya hechos.

---

Vamos a seguir rellenando `esquemas.html` (proyecto en `C:\Users\ruben\OneDrive\Desktop\HTML OFICIAL`, repo `sgtxolo/test-oficial`, rama `main`). Es una app de una sola página con esquemas rápidos de repaso para los 27 temas del programa de la oposición a Oficial de la Guardia Civil, en el estilo visual **Método Prefortia**.

## Reglas de estilo — LO MÁS IMPORTANTE, NO SALTARSE NINGUNA PALABRA

El subrayado de colores debe ser **EXHAUSTIVO**, no puntual. Esto ha sido corregido varias veces porque quedaba "poco colorido": no basta con marcar una o dos palabras sueltas por párrafo. Hay que **repasar cada frase completa** y colorear **cada palabra o expresión con carga informativa** (sujetos, verbos, plazos, órganos, conceptos, matices). Solo deben quedar en texto plano los nexos y palabras de relleno sin contenido (preposiciones sueltas, artículos, conjunciones como "y", "que", "de", etc.).

Ejemplo de referencia (nivel de densidad exigido, art. 39 del Estatuto del Consejo de Europa):
> El `<mark autoridad>Secretario General</mark>` `<mark accion>notificará</mark>` `<mark plazo>anualmente</mark>` la contribución de cada `<mark autoridad>Miembro</mark>`; `<mark accion>se abonarán</mark>` al `<mark autoridad>Secretario General</mark>` en plazo máximo de `<mark plazo>seis meses</mark>`.

Antes de dar por terminado un artículo, revisa mentalmente: "¿he coloreado ya todo lo que tiene contenido en esta frase, o solo el plazo/la palabra más obvia?". Si la respuesta es "solo lo obvio", hay que volver a pasar por la frase.

### Código de colores (clases CSS ya definidas en el archivo)
- `<mark class="m-destacable">` (naranja): palabras y conceptos destacables en general (materias, instituciones abstractas, tipos de acto, requisitos, conceptos jurídicos).
- `<mark class="m-autoridad">` (verde): autoridades, cargos públicos, órganos y entidades (Ministerio de Justicia, Consejo de Ministros, Fiscal, Sala de tal, Estado Parte, etc.).
- `<mark class="m-plazo">` (azul): plazos, fechas, números de días/meses/años, cantidades (24 horas, 20 días, 7 instrumentos, dos tercios...).
- `<mark class="m-accion">` (morado — OJO: en el estilo original de Prefortia es rosa, pero aquí se cambió a morado por petición expresa del usuario, mantenerlo): verbos de acción relevantes (notificará, resolverá, acordará, se abonarán, entrará en vigor, remitirá...).
- `<mark class="m-personalizado">` (amarillo): texto que se considera especialmente interesante destacar aunque no encaje limpiamente en las otras categorías (matices, salvedades, detalles específicos).
- `<u class="m-clave">` (subrayado rojo, SIN fondo de color, y con `</u>` — nunca cerrarlo con `</mark>` porque rompe todo el subrayado del resto del documento): conectores lógicos clave: "no", "salvo", "excepto", "únicamente", "siempre que", "cuando", "antes/después", "no obstante"...

### Estructura de cada esquema (usar los helpers ya definidos en el `<script>`)
- `leyenda()` — leyenda de colores, una sola vez al principio del tema.
- `bloqueTitulo("texto")` — para títulos de ley, título, capítulo o parte dentro del tema.
- `articulo("Artículo X — Título breve", \`<p>...</p>\`, esExamen)` — un bloque por artículo o grupo de apartados de un mismo artículo. El texto interior debe ser una **transcripción casi literal** del artículo (no un resumen breve), con el marcado de colores denso descrito arriba. El tercer argumento (`true`) es opcional: lo pone el usuario cuando dicta que ese artículo es "examen oficial" — añade un sello "EX".
- `trampa("Trampa de examen" [o título propio], "texto")` — va pegada **justo debajo** del artículo al que corresponde. Nunca agrupar las trampas al final. El usuario suele dictar más trampas de las que yo proponga por iniciativa propia: dejar hueco para añadir las suyas.
- `recuerda([...])` — un **único bloque al final de todo el tema** (no por subtema ni por artículo), con las frases "R1, R2..." que el usuario dicta al cerrar el tema. Si el tema tiene varios subtemas (ej. Tema 1: 1.1 a 1.6), se puede prefijar cada frase con "(1.x)" para saber de qué bloque viene, pero sigue siendo un solo `recuerda([...])` al final.
- Cuando un artículo referencia a otro artículo distinto (p. ej. "conforme al art. 6.7"), añadir entre paréntesis una breve explicación de qué trata ese artículo referenciado.

### Errores técnicos a vigilar (ya han pasado y rompen la página entera)
1. **Nunca** cerrar un `<u class="m-clave">` con `</mark>` (ni al revés). Comprobar balance tras cada edición grande:
   ```bash
   node -e "
   const fs=require('fs');
   const s=fs.readFileSync('esquemas.html','utf8');
   console.log('mark', (s.match(/<mark /g)||[]).length, (s.match(/<\/mark>/g)||[]).length);
   console.log('u', (s.match(/<u /g)||[]).length, (s.match(/<\/u>/g)||[]).length);
   "
   ```
   Los dos números de cada línea deben coincidir.
2. Verificar que el JS embebido no tiene errores de sintaxis tras cada edición:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('esquemas.html','utf8');
   const m = html.match(/<script>([\s\S]*)<\/script>/);
   fs.writeFileSync('check.js', m[1]);
   "
   node --check check.js && echo SYNTAX_OK
   rm check.js
   ```
3. Para inserciones grandes (un tema entero o medio tema), es más fiable escribir un script de Node que localice el punto de inserción por texto y reescriba el bloque, que usar el Edit tool trozo a trozo — así se evitan duplicados o `` `) `` sobrantes.
4. Tras cualquier cambio: **commit y push inmediato** a `origin/main` (la PWA se sirve al móvil del usuario desde la versión desplegada en GitHub).

### Flujo de trabajo con el usuario
1. El usuario dicta (a veces por voz, con transcripción imperfecta) los artículos y puntos concretos de un tema/subtema, indicando cuáles son "examen oficial" y a veces trampas.
2. A veces pasa el PDF/Word con el texto legal oficial y/o un esquema ya elaborado por él o un compañero — en ese caso, usar **solo** ese contenido ya dado (no ir a buscar ni completar con el temario oficial completo salvo que él lo pida expresamente).
3. Aplicar el marcado de colores denso a cada artículo dictado.
4. Verificar balance de etiquetas y sintaxis (ver arriba), comprobar visualmente si hace falta, y subir a GitHub.
5. Al cerrar el tema, añadir el bloque `recuerda([...])` final con lo que el usuario dicte.

Ahora dime qué tema/subtema toca y los artículos que quieres incluir.
