// Muestra preguntas del test por id: node prompts/herramientas/ver-preguntas.js 1-201 1-202 ...
const fs = require('fs'); const s = fs.readFileSync(__dirname + '/../../test-oficial-conocimiento.html', 'utf8'); const BS = String.fromCharCode(92);
for (const id of process.argv.slice(2)) {
  const i = s.indexOf('{"id":"' + id + '"'); if (i < 0) { console.log(id, 'no está'); continue; }
  let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1)); console.log('##', id, q.pregunta, '\n  ', q.opciones.map((o, k) => 'ABCD'[k] + (k === q.correcta ? '*' : '') + ') ' + o).join(' | '));
}
