// Pasa las oficiales 15-201…15-220 (LO 3/2007 y RD 247/2024, contenido del Tema 16) al banco del Tema 16 con ids 16-158…16-177.
// Pauta del usuario 26/10/2026: mismo contenido, sin borrar nada. Idempotente.
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '..', '..', '..', 'test-oficial-conocimiento.html');
let s = fs.readFileSync(FILE, 'utf8');
const BS = String.fromCharCode(92);
const span = id => {                       // [inicio, fin) del objeto {"id":"..."...}
  const i = s.indexOf('{"id":"' + id + '"'); if (i < 0) return null;
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  return [i, j + 1];
};
const objs = [];
for (let k = 201; k <= 220; k++) {
  const sp = span('15-' + k); if (!sp) { console.log('ya movida o no existe 15-' + k); continue; }
  objs.push([k, s.slice(sp[0], sp[1])]);
}
if (!objs.length) { console.log('nada que mover'); process.exit(0); }
// 1) quitar de T15
for (const [k] of objs) {
  const sp = span('15-' + k); let a = sp[0], b = sp[1];
  if (s[b] === ',') b++; else if (s[a - 1] === ',') a--;
  s = s.slice(0, a) + s.slice(b);
}
// 2) añadir al final de las oficiales de T16 (tras 16-157)
let last = 157; while (span('16-' + (last + 1))) last++;
const sp = span('16-' + last); let at = sp[1];
const add = objs.map(([k, o], n) => ',' + o.replace('{"id":"15-' + k + '"', '{"id":"16-' + (last + 1 + n) + '"')).join('');
s = s.slice(0, at) + add + s.slice(at);
fs.writeFileSync(FILE, s);
console.log('movidas', objs.length, '→ 16-' + (last + 1) + '…16-' + (last + objs.length));
