// Unión de visuales-t26a/b/c.js con el formato [norma, localizador, html] que lee expres-subrayado-datos.js.
// Al ejecutarlo directamente escribe expres-subrayado/t26-cuadros-map.json {localizador: pieza} (a LO 11 · b LO 12 · c Ley 29 · d Orden · e acoso laboral · f acoso sexual · g violencia).
const A = require('./visuales-t26a.js'), B = require('./visuales-t26b.js'), C = require('./visuales-t26c.js');
const V = A.map(([ley, loc, h]) => [ley, loc, h]).concat(B.map(([loc, h]) => ['c', loc, h])).concat(C.map(([k, loc, h]) => [k, loc, h]));
module.exports = V;
const ORD = { PRIMERO: 1, SEGUNDO: 2, TERCERO: 3, CUARTO: 4, QUINTO: 5, SEXTO: 6, 'SÉPTIMO': 7, OCTAVO: 8, NOVENO: 9, 'DÉCIMO': 10, 'UNDÉCIMO': 11, 'DUODÉCIMO': 12, DECIMOTERCERO: 13, DECIMOCUARTO: 14, VIGESIMOCUARTO: 24 };
function pieza(norma, loc) {
  const L = { 11: 'a', 12: 'b', c: 'c', ord: 'd', res1: 'e', res2: 'f', res3: 'g' }[norma];
  let m = loc.match(/^Art[íi]culo (\d+)/);
  if (m) return L + '-' + m[1];
  if (/^Disposici[óo]n/.test(loc)) return L + '-fin';
  m = loc.match(/^([A-ZÁÉÍÓÚ]+)[.\s]/);
  if (m && ORD[m[1]]) { const n = ORD[m[1]]; return L + '-' + n; }
  return null;
}
if (require.main === module) {
  const fs = require('fs'); const M = {};
  for (const [n, loc] of V) { const p = pieza(n, loc); if (p) M[loc] = p; else console.log('SIN PIEZA', n, loc); }
  fs.writeFileSync('expres-subrayado/t26-cuadros-map.json', JSON.stringify(M, null, 1)); console.log(Object.keys(M).length, 'localizadores asignados;', V.length, 'cuadros');
}
