# Brief: auditoría de las preguntas OFICIALES del Tema 27 (ids 27-1 … 27-218, ver `prompts/temario-limpio/tema27/preguntas-actuales.json`; NO las `27-ia-*`)

Carpeta de trabajo: `C:\Users\ruben\Desktop\HTML OFICIAL`. Todo en español. NO edites `test-oficial-conocimiento.html` ni hagas git: tu salida es UN archivo JSON `prompts/herramientas/tema27/fix-edits/<tu-letra>.json` que luego aplica `prompts/herramientas/tema27/fix-t27.js` (léelo: explica el formato).

Fuente de verdad: `prompts/temario-limpio/tema27/oficial.txt` (marcadores `=====PAG n =====`; págs. 2-8 Principios ONU `onu`, 9-12 Resolución 690/1979 `pol`, 13-19 Código Europeo de Ética `cee`, 20-33 RD 176/2022 y Código de Conducta `rd`, 38-54 Orden General 10/2024 `og`). Mi PDF (`mio-ocr.txt`) solo para desempatar; si difiere del oficial manda mi PDF y lo dices.
Lista avisos automáticos: `node prompts/herramientas/auditoria-oficiales.js 27` (muchos son falsos positivos: una «INCORRECTA» cuya opción marcada aparece literal en el texto porque es un valor real del que la pregunta pide «el que NO…»; revisa cada una leyendo la pregunta).

## Qué hacer (obligatorio para TODAS las de tu rango)
Lee cada pregunta y contrástala con el oficial (Grep en oficial.txt; las citas deben ser LITERALES):
1. ¿La opción marcada es la correcta según el texto? ¿Las otras tres son falsas de verdad (una sola defendible)?
2. Revisa a fondo «Todas son correctas», «A y B…», «Ninguna…» y las «señale la INCORRECTA» (suelen venir invertidas o con dos falsas), y plazos, cifras, autoridades. Preguntas con «(Opción c no visible en la imagen)» u opciones corruptas: reescríbelas para que sean correctas sobre el mismo pasaje (mismo id).
3. Si está mal: corrige (`c` = nueva correcta 0-3, `o` = {índice: texto nuevo}, `p` = enunciado nuevo o [desde, hasta]). NUNCA borres; si está corrupta, reescríbela con el mismo id.
4. La explicación se regenera sola con la cita en rojo. Si el automático falla (mira `node prompts/herramientas/tema27/fix-t27.js --dry --bajas`, solo tus ids), pon `cita: ["Principio 9"|"Punto 12"|"Art. 5", "texto LITERAL del oficial en UNA página"]`. Si la norma deducida es errónea pon `"k":"onu|pol|cee|rd|og"`.
5. `nota`: frase corta opcional tras la cita.
6. Lo que NO puedas verificar NO lo cambies: lístalo con su id.
Formato del JSON: `{ "27-6": {"c":3,"o":{"1":"…"},"p":"…","cita":["Art. 12","…"],"nota":"…","k":"rd"}, … }` (solo las que cambian o necesitan cita manual). Comprueba que `node prompts/herramientas/tema27/fix-t27.js --dry` no muestra «⚠ CITA MANUAL NO LITERAL» de tus ids.
Trampas: en Bash `node -e` y heredocs pierden las barras invertidas; escribe archivos con la herramienta Write.
Responde SOLO con: nº revisadas, nº corregidas de fondo (ids), ids no verificables y por qué, diferencias con mi PDF.
