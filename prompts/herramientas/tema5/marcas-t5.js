// Tema 5 · marcas a mano del temario escaneado (08-08-2026), leídas página a página como imagen el 17/10/2026.
//   data-ex="EXOF,EX,*" en el PÁRRAFO exacto: EXOF = sello «PREGUNTA EXAMEN» (págs. escaneadas 55, 58, 93, 193, 233, 294) ·
//   EX = círculo rosa «EX» del Eurodac (págs. 324-358) · * = asterisco ✱ rojo.
//   data-r="R5" en el párrafo del apartado de cada ficha RECUERDA R1-R36 (el bloque T5.rec ya existe).
// Idempotente. Uso: node prompts/herramientas/tema5/marcas-t5.js [--dry]
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const X = require('../expres-lib.js')(5);
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
// [ficha, párrafo, tipo]  (índices de expres-lib a 17/10/2026: fichas del esquema normal del Tema 5)
const MARCAS = [
  // sellos «PREGUNTA EXAMEN» → EXOF
  [1, 0, 'EXOF'],      // SIS art. 1 (p. 55)
  [4, 0, 'EXOF'],      // SIS art. 4.1 (p. 58)
  [55, 0, 'EXOF'],     // SIS art. 56.1 (p. 93)
  [122, 0, 'EXOF'],    // VIS art. 27 (p. 193)
  [155, 2, 'EXOF'],    // Código de visados art. 2.3 «visado uniforme» (p. 233)
  [247, 0, 'EXOF'],    // Orden AEC/240/2011 art. 4 (p. 294)
  // círculos EX del Eurodac
  [191, 4, 'EX'], [191, 5, 'EX'], [191, 8, 'EX'], [191, 9, 'EX'],           // art. 2: k), l), p), q)
  [192, 0, 'EX'],                                                            // art. 3.1.b)
  [193, 0, 'EX'], [193, 6, 'EX'], [193, 7, 'EX'],                            // art. 4.1, 4.3, 4.4
  [196, 0, 'EX'],                                                            // art. 7.1
  [201, 1, 'EX'], [201, 4, 'EX'],                                            // art. 15.1 (incumplimiento) y 15.2
  [203, 5, 'EX'],                                                            // art. 18.5
  [209, 4, 'EX'],                                                            // art. 24.10
  [211, 2, 'EX'],                                                            // art. 26.3
  [214, 2, 'EX'], [214, 3, 'EX'], [214, 4, 'EX'],                            // art. 29.2, 29.3, 29.4
  [218, 5, 'EX'],                                                            // art. 33.3
  [220, 0, 'EX'],                                                            // art. 35.1
  [226, 0, 'EX'],                                                            // art. 41.1
];
// asterisco ✱ rojo junto al art. 4.1.d) del SIS: el párrafo que contiene «PEB»
const ast = [];
X.fichas[4].ps.forEach((p, j) => { if (/PEB/.test(limpia(p.h))) ast.push([4, j, '*']); });
MARCAS.push(...ast);
// R1-R36 → párrafo del articulado (propuesto por rmatch.js y revisado a mano)
const RS = { R1: [4, 0], R2: [4, 7], R3: [8, 3], R4: [15, 0], R5: [17, 1], R6: [35, 0], R7: [43, 1], R8: [49, 0], R9: [55, 0],
  R10: [70, 0], R11: [84, 3], R12: [118, 4], R13: [120, 1], R14: [121, 1], R15: [122, 0], R16: [127, 6], R17: [133, 1], R18: [140, 1],
  R19: [154, 0], R20: [157, 0], R21: [164, 3], R22: [165, 3], R23: [166, 0], R24: [166, 1], R25: [175, 0], R26: [169, 0], R27: [176, 0], R28: [184, 0],
  R29: [192, 0], R30: [192, 4], R31: [194, 0], R32: [201, 0], R33: [222, 2], R34: [109, 1], R35: [115, 4], R36: [247, 6] };
if (require.main !== module) { module.exports = { RS }; return; }   // expres-t5.js usa RS para llevar las preguntas de las fichas R a su párrafo
const fallos = [];
MARCAS.forEach(([k, j]) => { if (!X.fichas[k] || !X.fichas[k].ps[j]) fallos.push(k + '-' + j); });
Object.entries(RS).forEach(([r, [k, j]]) => { if (!X.fichas[k] || !X.fichas[k].ps[j]) fallos.push(r); });
console.log('marcas', MARCAS.length, '· R', Object.keys(RS).length, '· inexistentes:', fallos.join(' ') || 'ninguna');
if (process.argv.includes('--dry')) {
  MARCAS.forEach(([k, j, t]) => console.log(t, k + '-' + j, limpia(X.fichas[k].cab).slice(0, 36), '|', limpia(X.fichas[k].ps[j].h).slice(0, 70)));
  Object.entries(RS).forEach(([r, [k, j]]) => console.log(r, k + '-' + j, limpia(X.fichas[k].cab).slice(0, 36), '|', limpia(X.fichas[k].ps[j].h).slice(0, 60)));
  process.exit(0);
}
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('const T5 = {};'), b = s.indexOf('/* T5_RECUERDA + ensamblaje */');
let seg = s.slice(a, b);
const ORD = { EXOF: 0, EX: 1, '*': 2 };
const poner = (k, j, attr, vals, ord) => {
  const p = X.fichas[k].ps[j]; let ini = -1;
  for (const n of [70, 200, 600, 5000]) { const r = JSON.stringify('>' + p.h.slice(0, n)).slice(1, -1); if (seg.split(r).length === 2) { ini = seg.indexOf(r); break; } }
  if (ini < 0) return false;
  const i = seg.lastIndexOf('<p', ini), fin = ini, tag = seg.slice(i, fin);
  const re = new RegExp(' ' + attr + '=\\\\"([^"\\\\]*)\\\\"'); const prev = (tag.match(re) || [])[1];
  const val = [...new Set([...(prev ? prev.split(',') : []), ...vals])].sort(ord).join(',');
  if (prev === val) return true;
  const nuevo = prev !== undefined ? tag.replace(re, ` ${attr}=\\"${val}\\"`) : tag + ` ${attr}=\\"${val}\\"`;
  seg = seg.slice(0, i) + nuevo + seg.slice(fin); return true;
};
const por = {}; MARCAS.forEach(([k, j, t]) => (por[k + '-' + j] = por[k + '-' + j] || new Set()).add(t));
let ok = 0; const mal = [];
for (const [kj, tipos] of Object.entries(por)) { const [k, j] = kj.split('-').map(Number); (poner(k, j, 'data-ex', [...tipos], (x, y) => ORD[x] - ORD[y]) ? ok++ : mal.push(kj)); }
const porR = {}; Object.entries(RS).forEach(([r, [k, j]]) => (porR[k + '-' + j] = porR[k + '-' + j] || []).push(r));
let okR = 0; for (const [kj, ids] of Object.entries(porR)) { const [k, j] = kj.split('-').map(Number); (poner(k, j, 'data-r', ids, (x, y) => +x.slice(1) - +y.slice(1)) ? okR++ : mal.push('R' + kj)); }
const antes = (seg.match(/", true\)/g) || []).length; seg = seg.replace(/", true\)/g, '", false)');
console.log(`párrafos con data-ex: ${ok} · con data-r: ${okR} · no localizados en el HTML: ${mal.join(' ') || 'ninguno'} · sellos EX automáticos por ficha quitados: ${antes}`);
s = s.slice(0, a) + seg + s.slice(b);
fs.writeFileSync(F, s);
