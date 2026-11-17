// Unión de visuales-t25a.js (págs. 5-67) y visuales-t25b.js (Europol) con el formato [norma, localizador, html] que lee expres-subrayado-datos.js.
const A = require('./visuales-t25a.js'), B = require('./visuales-t25b.js');
const V = A.map(([ley, loc, h]) => [ley, loc, h]).concat(B.map(([n, loc, h]) => [4, loc, h]));
module.exports = V;
if (require.main === module) {
  const fs = require('fs'); const M = {};
  const L = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e' };
  for (const [ley, loc] of V) { const n = (loc.match(/^Art[íi]culo (\d+)/) || [])[1]; if (n) M[loc] = L[ley] + '-' + n; }
  fs.writeFileSync('expres-subrayado/t25-cuadros-map.json', JSON.stringify(M, null, 1)); console.log(Object.keys(M).length, 'cuadros asignados');
}
