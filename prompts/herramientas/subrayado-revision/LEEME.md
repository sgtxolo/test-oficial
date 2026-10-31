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
