// Tema 3 · auditoría de oficiales (21/10/2026, auditoria-oficiales.js 3): 28 avisos revisados a mano contra el temario; todos eran falsos
// positivos de «señale la INCORRECTA» salvo dos erratas de redacción, que se corrigen aquí (idempotente).
// Uso: node prompts/herramientas/tema3/fix-auditoria-t3.js
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '..', '..', '..', 'test-oficial-conocimiento.html'), BS = String.fromCharCode(92);
let s = fs.readFileSync(FILE, 'utf8'), n = 0;
const F = [['3-139', q => { q.opciones[1] = q.opciones[1].replace('Conciiso', 'Conciso'); }], ['3-270', q => { q.opciones[0] = 'De uno de sus miembros.'; }]];
for (const [id, fn] of F) {
  const i = s.indexOf('{"id":"' + id + '"'); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, e = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1)); const antes = JSON.stringify(q); fn(q);
  if (JSON.stringify(q) !== antes) { s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++; }
}
fs.writeFileSync(FILE, s); console.log('corregidas', n);
