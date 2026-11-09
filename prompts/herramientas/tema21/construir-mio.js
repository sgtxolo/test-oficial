// Une las tandas del OCR del PDF subrayado (sub_*.json de subrayado-pdf-winocr.py) y genera, en prompts/temario-limpio/tema21/:
//   mio-ocr.txt (texto por páginas, sin marcas) · mio-subrayado.txt (con ⟦ ⟧ alrededor de lo subrayado: fosforito o trazo rojo) y subrayado.json (todo junto, ignorado por git si es grande).
// Uso: node prompts/herramientas/tema21/construir-mio.js <carpeta con sub_*.json>
const fs = require('fs'), path = require('path');
const dir = process.argv[2];
const R = path.join(__dirname, '..', '..', '..');
let pags = [];
for (const f of fs.readdirSync(dir).filter(f => /^sub_\d+\.json$/.test(f))) pags.push(...JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
pags.sort((a, b) => a.pagina - b.pagina);
let ocr = '', sub = '';
for (const p of pags) {
  const ws = p.palabras.map(w => ({ t: w[0], c: !!(w[1] || w[4]), x: w[3][0], y: (w[3][1] + w[3][3]) / 2 })).sort((a, b) => a.y - b.y || a.x - b.x);
  const lines = []; for (const w of ws) { const l = lines[lines.length - 1]; if (l && Math.abs(l.y - w.y) < 4) l.w.push(w); else lines.push({ y: w.y, w: [w] }); }
  ocr += `=====PAG ${p.pagina} =====\n`; sub += `=====PAG ${p.pagina} =====\n`;
  for (const l of lines) {
    l.w.sort((a, b) => a.x - b.x);
    ocr += l.w.map(w => w.t).join(' ') + '\n';
    let s = '', open = false;
    for (const w of l.w) { if (w.c && !open) { s += '⟦'; open = true; } if (!w.c && open) { s = s.trimEnd() + '⟧ '; open = false; } s += w.t + ' '; }
    if (open) s = s.trimEnd() + '⟧';
    sub += s.trim() + '\n';
  }
  ocr += '\n'; sub += '\n';
}
const out = path.join(R, 'prompts', 'temario-limpio', 'tema21');
fs.writeFileSync(path.join(out, 'mio-ocr.txt'), ocr); fs.writeFileSync(path.join(out, 'mio-subrayado.txt'), sub);
fs.writeFileSync(path.join(dir, 'subrayado.json'), JSON.stringify(pags));
console.log('páginas', pags.length, 'ocr', ocr.length, 'subrayado', sub.length, '· palabras subrayadas', pags.reduce((a, p) => a + p.palabras.filter(w => w[1] || w[4]).length, 0));
