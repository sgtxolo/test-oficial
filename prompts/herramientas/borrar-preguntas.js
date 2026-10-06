// Elimina preguntas dudosas o corruptas del banco de test-oficial-conocimiento.html (solo cuando el usuario lo ha autorizado).
// Uso: node prompts/herramientas/borrar-preguntas.js test-oficial-conocimiento.html 14-5 14-80 ...
// Después: node prompts/herramientas/mapa-preguntas.js  (regenera el mapa pregunta ↔ esquema)
const fs = require('fs');
const [,, FILE, ...ids] = process.argv;
let s = fs.readFileSync(FILE, 'utf8');
const BS = String.fromCharCode(92);
let n = 0;
for (const id of ids) {
  const key = '{"id":"' + id + '"';
  const i = s.indexOf(key);
  if (i < 0) { console.log('NO ENCONTRADA', id); continue; }
  if (s.indexOf(key, i + 1) >= 0) { console.log('DUPLICADA (no se toca)', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  let a = i, b = j + 1;
  if (s[b] === ',') b++; else if (s[a - 1] === ',') a--;   // quitar la coma contigua
  s = s.slice(0, a) + s.slice(b); n++;
}
fs.writeFileSync(FILE, s);
console.log('eliminadas', n, 'de', ids.length);
