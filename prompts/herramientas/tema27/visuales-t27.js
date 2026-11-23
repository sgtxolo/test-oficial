// Unión de visuales-t27a/b.js con el formato [norma, localizador, html] que lee expres-subrayado-datos.js.
// Al ejecutarlo directamente escribe expres-subrayado/t27-cuadros-map.json {localizador: pieza} (a ONU · b Resolución 690 · c Código Europeo · d RD 176/2022 · e Código de Conducta · f OG 10/2024).
const A = require('./visuales-t27a.js'), B = require('./visuales-t27b.js');
const V = A.concat(B).map(([ley, loc, h]) => [String(ley), loc, h]);
module.exports = V;
function pieza(ley, loc) {
  const L = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f' }[ley]; let m;
  if (/^Pre[áa]mbulo/.test(loc)) return L + '-pre';
  if ((m = loc.match(/^Principio (\d+)/))) return L + '-' + m[1];
  if ((m = loc.match(/^Punto ([ABC])\.(\d+)/))) return L + '-' + ((m[1] === 'A' ? 0 : m[1] === 'B' ? 100 : 200) + +m[2]);
  if ((m = loc.match(/^(?:Punto|Art[íi]culo) (\d+)/))) return L + '-' + m[1];
  if (/^Dec[áa]logo/.test(loc)) return 'e-fin';
  return null;
}
if (require.main === module) {
  const fs = require('fs'); const M = {};
  for (const [n, loc] of V) { const p = pieza(n, loc); if (p) M[loc] = p; else console.log('SIN PIEZA', n, loc); }
  fs.writeFileSync('expres-subrayado/t27-cuadros-map.json', JSON.stringify(M, null, 1)); console.log(Object.keys(M).length, 'localizadores');
}
