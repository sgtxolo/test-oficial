// Fuerza en el progreso guardado (localStorage) las correcciones y eliminaciones de preguntas IA del Tema 2,
// porque syncSeedIA no actualiza las IA que llevan "dificultad" ni borra las retiradas del seed.
// Uso: node prompts/herramientas/sync-t2-ia.js test-oficial-conocimiento.html  (inserta un bloque tras el último syncSeedIA(2,seed))
const fs = require('fs');
const FILE = process.argv[2];
let s = fs.readFileSync(FILE, 'utf8');
const MARK = 'syncSeedIA(2,seed)})();';
if (s.includes('/*T2-FIX-IA*/')) { console.log('ya insertado'); process.exit(0); }
const BS = String.fromCharCode(92);
function get(id) {
  const key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) throw new Error('no ' + id);
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break } }
  return JSON.parse(s.slice(i, j + 1));
}
const upd = ['2-ia-73', '2-ia-265'].map(get).map(q => ({ id: q.id, pregunta: q.pregunta, opciones: q.opciones, correcta: q.correcta, explicacion: q.explicacion }));
const rm = ['2-ia-86', '2-ia-87', '2-ia-88', '2-ia-89', '2-ia-141'];
const block = '/*T2-FIX-IA*/(function(){const upd=' + JSON.stringify(upd) + ',rm=' + JSON.stringify(rm) + ';state.preguntasIA=state.preguntasIA||{};let ch=0;Object.keys(state.preguntasIA).forEach(k=>{const a=state.preguntasIA[k]||[];const n=a.filter(q=>!rm.includes(q.id));if(n.length!==a.length)ch++;n.forEach(q=>{const u=upd.find(x=>x.id===q.id);if(u&&JSON.stringify(q.opciones)!==JSON.stringify(u.opciones)){Object.assign(q,u);ch++}});state.preguntasIA[k]=n});ch>0&&saveState()})();';
const i = s.lastIndexOf(MARK); if (i < 0) throw new Error('marca no encontrada');
s = s.slice(0, i + MARK.length) + block + s.slice(i + MARK.length);
fs.writeFileSync(FILE, s); console.log('bloque insertado');
