// Pone data-r="R1,R2" en el párrafo del articulado del Tema 3 donde está el apartado de cada ficha RECUERDA (r-articulado-t3.js).
// La app (esquema) lo enseña como sello «R n». Idempotente. Uso: node prompts/herramientas/tema3/marcar-r-t3.js
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const X = require('../expres-lib.js')(3);
const { r, falta } = require('./r-articulado-t3.js')(X);
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('/* T3_TUE */'), b = s.indexOf('/* T3_RECUERDA');
let seg = s.slice(a, b), n = 0; const fallos = [...falta];
for (const [kj, rs] of Object.entries(r)) {
  const [k, j] = kj.split('-').map(Number); const p = X.fichas[k].ps[j];
  let raw = null;
  for (const L of [70, 200, 600, 5000]) { const t = JSON.stringify('<p' + p.at + '>' + p.h.slice(0, L)).slice(1, -1); if (seg.split(t).length === 2) { raw = t; break; } }
  if (!raw) { fallos.push(kj); continue; }
  const i = seg.indexOf(raw), fin = seg.indexOf('>', i), tag = seg.slice(i, fin);
  const prev = (tag.match(/ data-r=\\"([^"\\]*)\\"/) || [])[1];
  const val = [...new Set([...(prev ? prev.split(',') : []), ...rs])].sort((x, y) => +x.slice(1) - +y.slice(1)).join(',');
  const nuevo = prev !== undefined ? tag.replace(/ data-r=\\"[^"\\]*\\"/, ` data-r=\\"${val}\\"`) : tag + ` data-r=\\"${val}\\"`;
  seg = seg.slice(0, i) + nuevo + seg.slice(fin); n++;
}
fs.writeFileSync(F, s.slice(0, a) + seg + s.slice(b));
console.log('párrafos con R:', n, fallos.length ? '· no localizados: ' + fallos.join(' ') : '');
