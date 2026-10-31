# Herramientas de revisión del Exprés subrayado (sesión del Tema 11, 31/10/2026)
Se ejecutan desde la raíz del proyecto (`Escritorio\HTML OFICIAL`). Las imágenes de revisión se escriben en la carpeta de la variable de entorno `SCRATCH` (por defecto `%LOCALAPPDATA%\Temp`).
- `texto-expres.js id id…` — texto del Exprés de esos artículos (con (…)).
- `comprimir-vista.py id…` — foto del artículo sin blancos y con la `y` original rotulada (para leer los rangos).
- `apilar-vistas.py 2300 id,id…` — apila varias vistas en una imagen.
- `hoja-titulos.py` / `hoja-miniaturas.py` — hojas de contacto (detectar «ESQ», rayas, X).
- `auditar-apartados.js`, `cobertura-sin-recorte.py` — auditorías (apartados; piezas enteras con Exprés parcial).
- `aplicar-rangos.py '{"a-77":{"ap":[2],"rangos":[[0,45],[135,288]]}}'` — escribe los rangos en `tN-img-recorte.json` y marca revisados; luego `reconstruir.sh`.
- `preguntas-sin-sitio-en-esquemas.js` — preguntas que no tienen sitio en esquemas.html.
Nota: algunos scripts tienen el tema (11) y rutas escritas dentro: cambiarlos para otro tema.

## Flujo semiautomático (Temas 1 y 7, 31/10/2026) — todas las herramientas aceptan `TEMA=N` (por defecto 11)
1. `TEMA=N node texto-pieza.js [--json] id…` — texto del Exprés de cada pieza, también en fichas de varios artículos y piezas a mano con `"ficha"` (regex del título de su ficha, en `tN-manual.json`), sin lo omitido con (…).
2. `TEMA=N py propuesta-lineas.py todas` — alinea (difflib) cada tramo del Exprés con el OCR de la foto y propone los rangos línea a línea; deja la cabecera y los títulos intermedios; si no encuentra una frase, no la quita (rellena el hueco). Dibuja `SCRATCH/prop-<id>.png` (verde = se queda, rojo = fuera) para revisar a ojo; `lado-a-lado.py hoja id,id,…` las junta.
3. `TEMA=N py aplicar-propuesta.py N '{"id":{"ap":[..],"rangos":[[..]]},"otro":null}'` — pasa a `tN-img-recorte.json` las propuestas con < 85 % de la altura (más las correcciones a mano; `null` = entero), calcula `ap` y escribe `revision-tN.js`.
4. `TEMA=N bash reconstruir.sh` — aplica recortes, datos, bloques, cortes y da las páginas.
5. `cobertura-todas.py` — cobertura de palabras Exprés/foto de todas las piezas sin recorte.
