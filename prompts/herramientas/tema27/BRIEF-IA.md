# Brief para redactar un bloque de preguntas IA del Tema 27 (Deontología profesional)

Carpeta de trabajo: `C:\Users\ruben\Desktop\HTML OFICIAL` (NO la copia de OneDrive). Todo en español. NO toques `test-oficial-conocimiento.html`, ni `esquemas.html`, ni hagas git: solo creas tu archivo `prompts/herramientas/preguntas-t27r-bNN.js` y lo compruebas con `--json`.

## Fuentes (solo lectura)
- `prompts/temario-limpio/tema27/mio-subrayado.txt`: texto de MI PDF subrayado por páginas (`=====PAG n =====`, n = página de MI PDF, 1-based). Lo subrayado a mano va entre `« »` (OCR con erratas; sirve para saber QUÉ he subrayado, no para copiar texto). `mio-ocr.txt` = mismo OCR sin marcas.
- `prompts/temario-limpio/tema27/oficial.txt`: texto OFICIAL limpio (páginas distintas a las de mi PDF). De aquí sale TODO el texto de pregunta, opciones y la cita literal. Para localizar un pasaje subrayado, busca unas palabras en oficial.txt con Grep.
- Normas del tema (claves `k`), páginas de MI PDF y páginas equivalentes en oficial.txt:
  - `onu` = Principios básicos sobre el empleo de la fuerza y de armas de fuego (ONU, La Habana 1990): mi PDF págs. 7-14 · oficial.txt págs. 2-8.
  - `pol` = Resolución 690 de 1979 del Consejo de Europa, Declaración sobre la Policía: mi PDF págs. 15-18 · oficial.txt págs. 9-12.
  - `cee` = Recomendación Rec. (2001) 10, Código Europeo de Ética de la Policía: mi PDF págs. 19-24 · oficial.txt págs. 13-19.
  - `rd` = Real Decreto 176/2022, Código de Conducta del personal de la Guardia Civil (preámbulo, artículos 1-?, Decálogo del anexo): mi PDF págs. 25-50 · oficial.txt págs. 20-33. (Mi PDF es edición «Serás»: trae además «Esquemas de refuerzo», «Anotaciones del alumno» y epígrafes propios; eso NO es texto legal y NO se pregunta. Págs. de mi PDF 25-32 casi sin subrayado: 2-3 preguntas por página con texto legal; págs. 25, 28-30, 32, 48 y 50 son portada/índice/esquemas/anotaciones en blanco: 0-2.)
  - `og` = Orden General 10/2024, Sistema de Integridad de la Guardia Civil (SINTEGC): mi PDF págs. 51-67 · texto limpio en oficial.txt págs. 38-54 (viene del PDF de actualización del 13-05-2025; la pág. 38 del oficial.txt empieza en el título 27.5).
  - Págs. de mi PDF 1-6 (portada, nota, índice) y 68-72 (hoja final y fichas R1-R14): no se preguntan en estos bloques.
- Para localizar cada página de mi PDF en oficial.txt usa el texto subrayado de `mio-subrayado.txt` y Grep en oficial.txt (palabras sueltas, sin cruzar saltos de línea con guion).
- Ejemplo completo de bloque ya hecho (copia su forma EXACTA, incluidas las 2 últimas líneas `exports.Q`/`require.main`): `prompts/herramientas/preguntas-t26r-b05.js` (Tema 26). Librería con todas las reglas de formato: `prompts/herramientas/preguntas-t27r-lib.js` (léela entera; las claves k válidas son onu, pol, cee, rd, og). Cambia en la última línea `t26r`→`t27r` y el nº de bloque, y `Z('lo11')`→ tus claves.
- Banco OFICIAL ya existente del tema (no repetir ni parafrasear): `prompts/temario-limpio/tema27/preguntas-actuales.json` (oficiales ids `27-N`; busca por palabras clave del pasaje).

## Cuántas preguntas
5 por página de MI PDF del rango que te toque. Página con texto legal pero SIN subrayado (0 marcas « »): 3; página en blanco, portada, índice, esquema de refuerzo sin texto legal, anotaciones del alumno: 0-2. Más subrayado en la página ⇒ puedes pasar de 5 sobre lo subrayado. Cada página con contenido debe quedar cubierta. Reparte en todo el bloque (no concentres en un artículo). Un bloque de 10 págs. ≈ 45-55 preguntas.

## Estilo (como el examen oficial; reglas del usuario, obligatorias)
- Nada de preguntas fáciles: dificultad 'media' (media-alta) o 'dificil'. La dificultad la ponen las opciones casi iguales, coletillas, plazos, órganos, excepciones, «señale la INCORRECTA». 'dificil' en ~25 %.
- Enunciado `e`: frase casi literal del artículo que termina en `:` o con hueco `__________` (completar el hueco: muchas); SIN número de artículo ni de apartado ni de principio/«punto n» (la lib lanza error con «artículo N», «art. N», «apartado N»; evita también «principio 9», «punto 12»). La norma y la rúbrica se añaden solas (campos `k` y `r` = rúbrica del artículo/principio, p. ej. «Código de Conducta» o «Disposiciones generales»; para Principios ONU / Resolución 690 / Código Europeo usa el epígrafe: «Empleo de armas de fuego», «Detención / Privación de libertad», «Ética de la policía»…). Prohibido preguntar números de artículo, de principio o remisiones. Prohibido preguntar penas.
- Opciones `o` (4): largas y MUY parecidas; solo cambia una palabra o dato (podrá/deberá, plazo, órgano, «y»/«o», únicamente…). La CORRECTA VA LA PRIMERA (la lib la reubica y reparte las letras). **La correcta nunca la más larga** (ninguna correcta >15 % más larga que las otras). Evita «todas/ninguna/A y B» salvo imprescindible.
- Formatos orientativos por 50: ≈20 directas largas, ≈12 completar hueco, ≈12 «señale la INCORRECTA» (las 4 opciones = párrafos literales y a uno se le cambia un dato), ≈6 combinadas solo si el texto lo justifica.
- 70 % de las preguntas deben salir de lo SUBRAYADO (« »): plazos, cifras, autoridades, coletillas, excepciones, enumeraciones. Alrededor de las marcas EXAMEN/EX/EXOF del margen pregunta el dato vecino. Lo sin subrayar casi no se pregunta.
- Cita `t`: fragmento LITERAL del texto OFICIAL (oficial.txt), en UNA sola página de oficial.txt (sin cruzar `=====PAG n =====`), que contenga la respuesta correcta; `a` = «art. X.Y»/«principio 9»/«punto 12» solo para la explicación; `p` = una frase de por qué fallan las otras. La lib comprueba que la cita es literal (ignora mayúsculas, acentos, signos y saltos de línea con guion).
- Las citas literales de oficial.txt a veces traen guiones de fin de línea («em- plearán»): la lib los ignora, pero cuida de copiar el texto tal cual para que cuadre.
- Si mi PDF difiere del oficial, manda mi PDF: marca esa pregunta `v:'img'` si la cita está solo en mi OCR (cobertura ≥ 50 %), o `v:'man'` si la has leído en la imagen (render con `py -I -c "import pymupdf; d=pymupdf.open(r'C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/TEMA 27 DEONTOLOGIA PROFESIONAL-2026-08-08.pdf'); d[N-1].get_pixmap(dpi=100).save(r'<ruta scratchpad>/pN.png')"`, N = nº de página de mi PDF, y mírala con Read). Python: `C:\Users\ruben\AppData\Local\Python\bin\python.exe` (usa `-I`).

## Trampas de herramientas (ya nos pasaron)
- En Bash `node -e '...'` y los heredocs pierden las barras invertidas (`\d`, `\s`). Escribe scripts con la herramienta Write, no en línea.
- El OCR estropea palabras subrayadas: nunca copies de mio-*; busca el texto en oficial.txt.
- Comprobación obligatoria hasta ver `✓ citas verificadas`, sin `✗`: `node prompts/herramientas/preguntas-t27r-bNN.js --json "<ruta scratchpad>/bNN.json"` (desde la carpeta de trabajo). Mira también la línea «correcta >15 % más larga ... (máx. 35)».
- Deja el archivo final en `prompts/herramientas/preguntas-t27r-bNN.js` con la cabecera de comentario como la del T26 (`// Tema 27 · bloque N · págs. a-b de mi PDF ... · 27-ia-XXXX…`).

Al terminar responde SOLO con: nº de preguntas, nº por página (resumen), líneas de aviso de la comprobación (debe estar limpia) y cualquier duda de contenido (diferencias mi PDF/oficial, páginas ilegibles).
