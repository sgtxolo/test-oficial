# Lectura por OCR y citas del temario (tanda del 28/11/2026, temas 1 y 3)

Registro de los scripts usados con 14 vídeos. **Llevan rutas, rangos de líneas del temario y apaños de ese lote**: copiarlos a la carpeta temporal de la sesión y adaptarlos.

Orden: ffmpeg → `../../ocr-windows.ps1` (salida `v/vNN.json`) → `parse.js vNN` → `rev.js r1 vNN …` → `ver.js r1` (deja `r1-fix.json`) → `inc.js r1.json` + `frames.js` / `busca.js` → respuestas en un `dN.js` (ejemplo `d1.js`) → `build.js dN` → `voc.js lote-dN.json` → `link.js lote-dN.json` (desde la carpeta del proyecto) → `../../oficiales-seras-28-11.js` → `commit.sh`.

- `temario.js`: `NORMAS` son rangos de líneas de `temario.txt` por norma; para otro tema hay que añadirlos.
- `link.js`: apartados del Esquema clave fijados por artículo para T1 y T3.
- `rend.py`: pinta páginas del PDF subrayado con regla de alturas para recortar piezas.
- Final: `paso2.js`, `dup.js`, `dup2.js`, `dup3.js`, `mapok.js`.
