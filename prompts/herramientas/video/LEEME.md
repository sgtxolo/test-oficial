# Vídeos de pantalla (aula virtual) → preguntas

Ejecutar en una carpeta de trabajo (copiar allí estos scripts; ajustar rutas).
1. Fotogramas: ffmpeg -i video -vf "fps=10,crop=1600:990:0:40,mpdecimate=hi=768:lo=320:frac=0.05" -vsync 0 f/vNN/p%05d.png
2. OCR: ../ocr-windows.ps1 f/vNN vNN.json
3. node parse.js vNN -> bash hi.sh vNN (re-OCR ampliado) -> node final2.js vNN -> node rep2.js vNN (únicas y repetidas: u-vNN.json, r-vNN.txt)
4. node hueco.js vNN: el OCR se come las líneas "______" y corta el enunciado; comprobar el fotograma.
5. Inglés o textos cortos: py mosaico.py vNN y leer los mosaicos a ojo (el OCR pierde opciones cortas).
6. Respuestas en un módulo r-*.js (ver build.js) -> node build.js r-xxx -> añadir a oficiales-seras-tT.json
7. node prompts/herramientas/oficiales-seras.js T y oficiales-seras-mapa.js T

## Psicotécnicos resueltos por ordenador (`psico/`, 26/11/2026)

Scripts usados en el vídeo de 95 preguntas. Son el registro del método: llevan dentro los números de pregunta y se ejecutan en una carpeta con los recortes en `ps/q{n}.jpg` (copiarlos y adaptarlos).

- `codigos.js`: claves con signos; prueba todas las cifras y exige una sola opción posible.
- `giros.py`: aplica las órdenes (volteos y giros) a la figura y compara con A–D.
- `pletina.py`: lee orificios y piezas en la rejilla 6×6; la correcta no tiene ningún punto fuera con alguno de los 4 giros (sin espejo).
- `comp.py` + `match.py`: puzles; separa huecos y piezas y compara formas (la correcta pasa de 0,93). Piezas con cuellos finos: separar con radio 2 en vez de 5. Algunas figuras salen achatadas: probar el estirado vertical.
- `tile.py`: huecos de dos celdas sin línea divisoria (encaja las dos piezas dentro del hueco).
- `fin.py` (imagen limpia y repetidas), `psico-fb.js` (explicaciones), `psico-add.js` (banco).

## Citas con el apartado completo (`citas/`, 28/11/2026)

Orden usado: `parr.js` (saca del temario el apartado entero de cada pregunta) → `ov.js` → `dump.js` (hojas para revisar a mano cada pregunta contra su cita) → `ov2.js` (arreglos tras la revisión) → `aplica.js`. Llevan ids y arreglos de ese lote: sirven de modelo. El texto escaneado del código de visados sale con defectos de OCR: transcribir desde la imagen del PDF.
