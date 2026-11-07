// Convierte el JSON de subrayado-pdf.py en texto por página con lo subrayado entre «…».
// Uso: node prompts/herramientas/tema19/subrayado-a-texto.js <sub.json> <salida.txt>
const fs = require('fs');
const d = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let out = '', tot = 0, sub = 0;
for (const p of d) {
  out += `\n=====PAG ${p.pagina} =====\n`;
  let abierto = false, linea = '';
  for (const [w, color, frac] of p.palabras) {
    const s = !!color && frac >= 0.5;
    tot++; if (s) sub++;
    if (s && !abierto) { linea += '«'; abierto = true; }
    if (!s && abierto) { linea = linea.replace(/ $/, '') + '» '; abierto = false; }
    linea += w + ' ';
  }
  if (abierto) linea = linea.replace(/ $/, '') + '»';
  out += linea.trim() + '\n';
}
fs.writeFileSync(process.argv[3], out);
console.log('palabras', tot, 'subrayadas', sub, Math.round(100 * sub / tot) + ' %');
