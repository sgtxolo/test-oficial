// Mete en datos-t4.js las piezas del subrayado recortadas del PDF el 28/11/2026 (oficiales-seras-t4-piezas.json). Idempotente.
const fs = require('fs');
const B = JSON.parse(fs.readFileSync('prompts/herramientas/oficiales-seras-t4-piezas.json', 'utf8'));
const IND = JSON.parse(fs.readFileSync('expres-subrayado/img/t4/indice.json', 'utf8'));
const DS = 'expres-subrayado/datos-t4.js';
let s = fs.readFileSync(DS, 'utf8');
const w = {}; new Function('window', s)(w); const P = w.EXSUB[4].piezas; const preg = w.EXSUB[4].preg;
const tras = { 'a-anexo4': 'a-45', 'a-anexo6': 'a-anexo4', 'a-anexo7': 'a-anexo6', 'b-pre': 'a-anexo7', 'b-80': 'b-79', 'c-pre': 'b-124', 'f-10': 'f-8', 'f-22': 'f-21', 'f-anexo2': 'f-41', 'f-anexo3': 'f-anexo2' };
for (const b of B) {
  if (P.some(p => p.id === b.id)) continue;
  const wh = IND.find(e => e.id === b.id).wh;
  const q1 = Object.keys(preg).find(k => preg[k] === b.id);
  const n = { id: b.id, nombre: b.nombre, img: b.id + '.jpg', wh, m: {}, q1 };
  const a = s.indexOf('{"id":"' + tras[b.id] + '"'); if (a < 0) throw new Error('sin ancla ' + tras[b.id]);
  let d = 0, str = false, e = false, j = a;
  for (; j < s.length; j++) { const c = s[j]; if (str) { if (e) e = false; else if (c === String.fromCharCode(92)) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}' && !--d) break; }
  s = s.slice(0, j + 1) + ',' + JSON.stringify(n) + s.slice(j + 1);
  P.push(n);
}
fs.writeFileSync(DS, s);
console.log('piezas', B.length, 'total', P.length);
