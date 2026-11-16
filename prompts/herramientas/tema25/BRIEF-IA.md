# Brief para redactar un bloque de preguntas IA del Tema 25 (Coordinación y Cooperación Policial)

Carpeta de trabajo: `C:\Users\ruben\Desktop\HTML OFICIAL` (NO la copia de OneDrive). Todo en español. NO toques `test-oficial-conocimiento.html`, ni `esquemas.html`, ni hagas git: solo creas tu archivo `prompts/herramientas/preguntas-t25r-bNN.js` y lo compruebas con `--json`.

## Fuentes (solo lectura)
- `prompts/temario-limpio/tema25/mio-subrayado.txt`: texto OCR de MI PDF subrayado por páginas (`=====PAG n =====`, n = página del PDF, 1-based). Lo subrayado a mano va entre `⟦ ⟧` (OCR con erratas; sirve para saber QUÉ he subrayado, no para copiar texto). `mio-ocr.txt` = mismo texto sin marcas.
- `prompts/temario-limpio/tema25/oficial.txt`: texto OFICIAL limpio (páginas distintas a las de mi PDF). De aquí sale TODO el texto de pregunta, opciones y la cita literal. Para localizar un pasaje subrayado, busca unas palabras en oficial.txt (grep con Grep).
- Normas del tema (claves `k`): `loe` = LO 2/1986 de Fuerzas y Cuerpos de Seguridad (mi PDF págs. 5-36); `l31` = Ley 31/2010 simplificación del intercambio de información e inteligencia (págs. 37-45); `rd` = Real Decreto 1087/2010 Reglamento de las Juntas Locales de Seguridad (págs. 47-55); `int` = Estatuto de INTERPOL (págs. 57-67); `eur` = Reglamento (UE) 2016/794 Europol (págs. 69-133). Revisa el título de cada página por si un bloque cruza dos normas.
- Ejemplo completo de bloque ya hecho (copia su forma EXACTA, incluidas las 2 últimas líneas `exports.Q`/`require.main`): `prompts/herramientas/preguntas-t23r-b05.js` (Tema 23). Librería con todas las reglas de formato: `prompts/herramientas/preguntas-t25r-lib.js` (léela entera). Cambia `t23r`→`t25r`, `Z('ser')`→ tus claves, y el nº de bloque.
- Banco ya existente del tema: `C:\Users\ruben\AppData\Local\Temp\claude\aee7e4dec056c413\9f88ce08-da0c-472e-8322-fca14cbd388f\scratchpad\t25.json` (preguntas oficiales ids `25-N`; léelo para NO repetir ni parafrasear ninguna: busca por palabras clave del pasaje).

## Cuántas preguntas
5 por página de MI PDF del rango que te toque (rango de páginas = el del bloque). Página con texto legal pero SIN subrayado (0 marcas ⟦ ⟧): 3; página en blanco, portada o índice: 0. Más subrayado en la página ⇒ puedes pasar de 5 sobre lo subrayado. Cada página debe quedar cubierta. Reparte en todo el bloque (no concentres en un artículo). Tu bloque de 10 págs. ≈ 45-55 preguntas.

## Estilo (como el examen oficial; reglas del usuario, obligatorias)
- Nada de preguntas fáciles: dificultad 'media' (media-alta) o 'dificil'. La dificultad la ponen las opciones casi iguales, coletillas, plazos, órganos, excepciones, «señale la INCORRECTA».
- Enunciado `e`: frase casi literal del artículo que termina en `:` o con hueco `__________` (completar el hueco: muchas); SIN número de artículo ni de apartado (la lib lanza error). La norma y la rúbrica se añaden solas (campos `k` y `r` = rúbrica del artículo, p.ej. «Principios básicos de actuación»). Prohibido preguntar números de artículo o remisiones.
- Opciones `o` (4): largas y MUY parecidas; solo cambia una palabra o dato (podrá/deberá, plazo, órgano, mayoría, «y»/«o», únicamente...). La CORRECTA VA LA PRIMERA (la lib la reubica y reparte las letras). **La correcta nunca la más larga** (que ninguna correcta sea >15 % más larga que las otras; la lib añade colas, pero escribe las opciones equilibradas). Evita «todas/ninguna/A y B» salvo imprescindible.
- Formatos orientativos por 50: ≈20 directas largas, ≈12 completar hueco, ≈12 «señale la INCORRECTA» (las 4 opciones = párrafos literales del artículo y a uno se le cambia un dato), ≈6 combinadas solo si el texto lo justifica.
- 70 % de las preguntas deben salir de lo SUBRAYADO (⟦ ⟧): plazos, cifras, autoridades, coletillas, excepciones, enumeraciones. Alrededor de las marcas EXAMEN/EX del margen (si el OCR las muestra) pregunta el dato vecino.
- Cita `t`: fragmento LITERAL del texto OFICIAL (oficial.txt), en UNA sola página de oficial.txt (sin cruzar `=====PAG n =====`), que contenga la respuesta correcta; `a` = «art. X.Y» solo para la explicación; `p` = una frase de por qué fallan las otras. Verificación: la lib comprueba que la cita es literal en oficial.txt (ignora mayúsculas, acentos, signos y saltos de línea con guion).
- Los disposiciones y artículos que mi PDF trae distintos al oficial: manda mi PDF (usa `v:'img'` en esa pregunta; si la cita sale solo de mi OCR).
- Dificultad 'dificil' en ~25 %.

## Trampas de herramientas (ya nos pasaron)
- En Bash `node -e '...'` y los heredocs pierden las barras invertidas (`\d`, `\s`). Escribe scripts con la herramienta Write, no en línea.
- El OCR estropea palabras subrayadas: nunca copies de mio-*; busca el texto en oficial.txt.
- Comprobación obligatoria hasta ver `✓ citas verificadas`, sin `✗`: `node prompts/herramientas/preguntas-t25r-bNN.js --json "<ruta scratchpad>\bNN.json"` (ejecútalo desde la carpeta de trabajo; usa tu ruta de scratchpad). Mira también la línea «correcta >15 % más larga ... (máx. 35)».
- Deja el archivo final en `prompts/herramientas/preguntas-t25r-bNN.js` con la cabecera de comentario como el del T23 (`// Tema 25 · bloque N · págs. a-b de mi PDF ... · 25-ia-XXXX…`).

Al terminar responde SOLO con: nº de preguntas, nº por página (resumen), líneas de aviso de la comprobación (debe estar limpia) y cualquier duda de contenido (p. ej. páginas ilegibles).
