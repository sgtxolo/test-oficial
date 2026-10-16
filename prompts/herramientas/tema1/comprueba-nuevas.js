// Comprobación estructural de las preguntas nuevas del Tema 1 (lotes 1-5): 4 opciones distintas, correcta 0-3, corrección con respuesta y cita en rojo.
const fs = require('fs'), path = require('path');
const s = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'test-oficial-conocimiento.html'), 'utf8');
const nuevas = [...s.matchAll(/\{"id":"(1-(?:ia-)?\d+)","pregunta":/g)].map(m => m[1]).filter(i => /^1-\d+$/.test(i) ? +i.slice(2) >= 168 : +i.split('-')[2] >= 1785);
let ok = 0; const mal = [];
for (const id of nuevas) {
  const i = s.indexOf('{"id":"' + id + '"'); let d = 0, inS = false, e = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === '\\') e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  try { const q = JSON.parse(s.slice(i, j + 1)); if (q.opciones.length === 4 && new Set(q.opciones).size === 4 && q.correcta >= 0 && q.correcta < 4 && /ex-resp/.test(q.explicacion) && /ref-concepto/.test(q.explicacion) && q.apartado) ok++; else mal.push(id); } catch (err) { mal.push(id); }
}
console.log('nuevas', nuevas.length, 'válidas', ok, 'malas', mal.join(' ') || '—');
