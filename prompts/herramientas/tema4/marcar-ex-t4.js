// Pone en el esquema del Tema 4 las marcas a mano del temario subrayado (situa-marcas-t4.js) en el PÁRRAFO exacto:
//   <p data-ex="EXOF,*">  →  EXOF = sello «PREGUNTA EXAMEN» · EX = círculo EX · * = asterisco (pregunta de la academia)
// y quita el sello EX automático por ficha (articuloResp(..., true)). Idempotente. Uso: node prompts/herramientas/tema4/marcar-ex-t4.js [--dry]
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const { marcas: res } = require('./situa-marcas-t4.js');
const X = require('../expres-lib.js')(4);
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('const T4 = {};'), b = s.indexOf('/* T4_RECUERDA + ensamblaje */');
let seg = s.slice(a, b);
const TIPO = { EXAMEN: 'EXOF', EXOF: 'EXOF', EX: 'EX', '*': '*' };
const ORD = { EXOF: 0, EX: 1, '*': 2 };
const porSitio = {};
res.forEach(r => (porSitio[`${r.k}-${r.j}`] = porSitio[`${r.k}-${r.j}`] || new Set()).add(TIPO[r.tipo]));
let puestos = 0; const fallos = [];
for (const [si, tipos] of Object.entries(porSitio)) {
  const [k, j] = si.split('-').map(Number); const p = X.fichas[k].ps[j];
  let raw = null;
  for (const n of [70, 200, 600, 5000]) { const r = JSON.stringify('<p' + p.at + '>' + p.h.slice(0, n)).slice(1, -1); if (seg.split(r).length === 2) { raw = r; break; } }
  if (!raw) { fallos.push(si); continue; }
  const i = seg.indexOf(raw); const fin = seg.indexOf('>', i);
  const tag = seg.slice(i, fin); const prev = (tag.match(/ data-ex=\\"([^"\\]*)\\"/) || [])[1];
  const val = [...new Set([...(prev ? prev.split(',') : []), ...tipos])].sort((x, y) => (ORD[x] ?? 3) - (ORD[y] ?? 3)).join(',');
  if (prev === val) continue;
  const nuevo = prev !== undefined ? tag.replace(/ data-ex=\\"[^"\\]*\\"/, ` data-ex=\\"${val}\\"`) : tag + ` data-ex=\\"${val}\\"`;
  seg = seg.slice(0, i) + nuevo + seg.slice(fin); puestos++;
}
const antes = (seg.match(/", true\)/g) || []).length;
seg = seg.replace(/", true\)/g, '", false)');
console.log(`párrafos marcados: ${puestos} · no localizados: ${fallos.length} ${fallos.join(' ')} · sellos EX automáticos por ficha quitados: ${antes}`);
if (!process.argv.includes('--dry')) fs.writeFileSync(F, s.slice(0, a) + seg + s.slice(b));
