// Vuelca el OCR de páginas del PDF subrayado con las palabras pintadas entre ⟦ ⟧ (por líneas). Uso: node ocr-subrayado.js <subrayado.json> <pags a-b,c,…> <salida.txt>
const fs = require('fs'); const [j, r, out] = process.argv.slice(2);
const pags = new Set(r.split(',').flatMap(x => { const [a, b] = x.split('-').map(Number); return Array.from({ length: (b || a) - a + 1 }, (_, i) => a + i); }));
let o = '';
for (const p of JSON.parse(fs.readFileSync(j, 'utf8'))) { if (!pags.has(p.pagina)) continue; o += `\n=====ESC ${p.pagina}=====\n`;
  const ws = p.palabras.map(w => ({ t: w[0], c: !!(w[1] || w[4]), x: w[3][0], y: (w[3][1] + w[3][3]) / 2 })).sort((a, b) => a.y - b.y || a.x - b.x);
  const lines = []; for (const w of ws) { const l = lines[lines.length - 1]; if (l && Math.abs(l.y - w.y) < 4) l.w.push(w); else lines.push({ y: w.y, w: [w] }); }
  for (const l of lines) { l.w.sort((a, b) => a.x - b.x); let s = '', open = false; for (const w of l.w) { if (w.c && !open) { s += '⟦'; open = true; } if (!w.c && open) { s = s.trimEnd() + '⟧ '; open = false; } s += w.t + ' '; } if (open) s = s.trimEnd() + '⟧'; o += s.trim() + '\n'; } }
fs.writeFileSync(out, o);
