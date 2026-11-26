# Vídeos de pantalla (aula virtual) → preguntas

Ejecutar en una carpeta de trabajo (copiar allí estos scripts).
1. Fotogramas: `ffmpeg -i video -vf "fps=10,crop=1600:990:0:40,mpdecimate=hi=768:lo=320:frac=0.05" -vsync 0 f/vNN/p%05d.png`
2. OCR: `../ocr-windows.ps1 f/vNN vNN.json`
3. `node parse.js vNN` → `bash hi.sh vNN` (re-OCR ampliado) → `node final2.js vNN` → `node rep2.js vNN` (únicas y repetidas: u-vNN.json, r-vNN.txt)
4. Respuestas en un módulo r-*.js (ver build.js) → `node build.js r-xxx` → añadir a `oficiales-seras-tT.json`
5. `node prompts/herramientas/oficiales-seras.js T` y `oficiales-seras-mapa.js T`
