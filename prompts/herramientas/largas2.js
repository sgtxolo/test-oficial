// Para cada pregunta en que la correcta es la más larga, muestra la falsa más larga (para alargarla). Uso: node largas2.js <json>
const qs = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));
for (const q of qs) { const c = q.opciones[q.correcta].length; const f = q.opciones.filter((_, i) => i !== q.correcta).sort((a, b) => b.length - a.length)[0];
  if (c > f.length) console.log(q.id, c - f.length, '|', f); }
