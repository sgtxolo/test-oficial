// Uso: node prompts/herramientas/tema15/buscar.js "frase" [ancho]   → contexto en el temario oficial limpio y en el OCR de mi PDF
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', '..', 'temario-limpio', 'tema15');
const plano = f => fs.readFileSync(path.join(D, f), 'utf8').replace(/=====PAG \d+=====|\[\[pag \d+\]\]/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const W = +process.argv[3] || 350;
for (const f of ['oficial.txt', 'mio-ocr.txt']) {
  const t = plano(f), n = nz(t), k = nz(process.argv[2]);
  let i = n.indexOf(k), c = 0;
  while (i >= 0 && c < 3) { console.log(`[${f}] …${t.slice(Math.max(0, i - 80), i + W)}…\n`); i = n.indexOf(k, i + 1); c++; }
  if (c === 0) console.log(`[${f}] (sin resultados)\n`);
}
