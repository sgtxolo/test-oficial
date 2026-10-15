// Sustituye en test-oficial-conocimiento.html las preguntas (por id) por las de un JSON generado con --json.
// Uso: node prompts/herramientas/tema2/reemplaza-preguntas.js <preguntas.json>
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'test-oficial-conocimiento.html'), BS = String.fromCharCode(92);
let s = fs.readFileSync(F, 'utf8'); const out = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let n = 0;
for (const q of out) {
  const i = s.indexOf(`{"id":"${q.id}"`); if (i < 0) throw new Error('no está ' + q.id);
  let d = 0, inS = false, e = false, j = i;
  for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } }
  const nuevo = JSON.stringify(q); if (s.slice(i, j + 1) !== nuevo) { s = s.slice(0, i) + nuevo + s.slice(j + 1); n++; }
}
fs.writeFileSync(F, s); console.log('reemplazadas', n);
