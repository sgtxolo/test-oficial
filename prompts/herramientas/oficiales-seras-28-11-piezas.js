// Mete en datos-t1.js las piezas del subrayado recortadas del PDF el 28/11/2026 (oficiales-seras-28-11-piezas.json,
// recortadas con expres-subrayado-anadir-piezas.py) y enlaza sus preguntas. Idempotente.
const fs = require('fs');
const H = 'prompts/herramientas/';
const B = JSON.parse(fs.readFileSync(H + 'oficiales-seras-28-11-piezas.json', 'utf8'));
const IND = JSON.parse(fs.readFileSync('expres-subrayado/img/t1/indice.json', 'utf8'));
const DS = 'expres-subrayado/datos-t1.js';
let s = fs.readFileSync(DS, 'utf8');
const w = {}; new Function('window', s)(w); const P = w.EXSUB[1].piezas;
const tras = { 'k-21': 'k-20', 'k-31': 'k-29', 'k-45': 'k-44', 'n-20': 'n-18', 'n-21': 'n-20', 'n-24': 'n-23', 'h-8': 'h-7', 'h-24': 'h-23', 'h-37': 'h-36', 'h-40': 'h-39', 'e-8bis': 'e-8', 'e-15bis': 'e-15', 'p-21': 'p-20' };
// preguntas -> pieza (por norma y artículo de la primera cita)
const MAPA = { 'CDF 21': 'k-21', 'CDF 31': 'k-31', 'CDF 45': 'k-45', 'ECE 20': 'n-20', 'ECE 21': 'n-21', 'ECE 24': 'n-24', 'CEDH 8': 'h-8', 'CEDH 24': 'h-24', 'CEDH 37': 'h-37', 'CEDH 40': 'h-40', 'ER 8 bis': 'e-8bis', 'ER 15 bis': 'e-15bis', 'APIC 21': 'p-21', 'P1 1': 'q-ad', 'P13 1': 'q-13', 'P7 3': 'q-7' };
const q1 = {};
for (let i = 1; i <= 4; i++) {
  const f = H + `oficiales-seras-28-11-d${i}.json`; const L = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const q of L) { const pz = MAPA[q.refs[0].n + ' ' + q.refs[0].art]; if (pz && !q.pz) q.pz = pz; if (pz && q.pz === pz && !q1[pz]) q1[pz] = q.id; }
  fs.writeFileSync(f, JSON.stringify(L, null, 1));
}
for (const b of B) {
  if (P.some(p => p.id === b.id)) continue;
  const wh = IND.find(e => e.id === b.id).wh;
  const n = { id: b.id, nombre: b.nombre, img: b.id + '.jpg', wh, m: {}, fx: b.ini[0], q1: q1[b.id] };
  const a = s.indexOf('{"id":"' + tras[b.id] + '"'); if (a < 0) throw new Error('sin ancla ' + tras[b.id]);
  let d = 0, str = false, e = false, j = a;
  for (; j < s.length; j++) { const c = s[j]; if (str) { if (e) e = false; else if (c === String.fromCharCode(92)) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}' && !--d) break; }
  s = s.slice(0, j + 1) + ',' + JSON.stringify(n) + s.slice(j + 1);
  P.push(n);
}
fs.writeFileSync(DS, s);
console.log('piezas', B.length);
