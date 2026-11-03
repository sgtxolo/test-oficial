# Citas de las preguntas (lila + rojo) sacadas del esquema

`esquemas-datos/citas-preguntas.js` define `window.CITAS_PREG = { idPregunta: [localizador, literal, nombreNorma] }`.
Solo incluye las preguntas enlazadas a un párrafo del esquema (MAPA_PREG) cuya explicación original **no** traía artículo o literal.
`normalizarExplicacion` (test-oficial-conocimiento.html) lo usa para pintar: lila «Art. 15.1 · Norma», rojo «literal del temario».

## Regenerar
1. Servir la carpeta (`npx http-server`) y abrir esquemas.html en el navegador.
2. En la consola: `prepararTodos()` y recorrer `window.MAPA_PREG` (formato «tema-k-j[-m]»: k = nº de .articulo del tema, j = párrafo, m = marca) sacando por pregunta `{id, head, ley, sec, p, mark}` (cabecera del artículo, título de la norma, texto del párrafo, texto marcado). Guardarlo como JSONL.
3. `node prompts/herramientas/citas-preguntas.js <archivo.jsonl>`.
4. Subir CACHE en service-worker.js.

Se descartan las preguntas cuyo párrafo no comparte al menos 2 palabras clave con la pregunta y su respuesta (evita enlaces dudosos).
