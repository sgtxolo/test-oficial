// Lista las preguntas de un json en que la correcta es la más larga (para retocar distractores).
// Uso: node prompts/herramientas/largas.js <preguntas.json>
const qs = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));
for (const q of qs) { const L = q.opciones.map(o => o.length), c = L[q.correcta], mx = Math.max(...L.filter((_, i) => i !== q.correcta));
  if (c > mx) console.log(q.id, 'correcta', c, 'vs máx falsa', mx, '·', q.opciones[q.correcta].slice(0, 70)); }
