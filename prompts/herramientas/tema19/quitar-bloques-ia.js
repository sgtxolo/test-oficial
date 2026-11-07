// Quita de test-oficial-conocimiento.html los bloques seed de IA del Tema 19 cuyo primer id es 19-ia-<n>.
// Uso: node prompts/herramientas/tema19/quitar-bloques-ia.js 1001 1101 1201 ...
const fs = require('fs');
const F = 'test-oficial-conocimiento.html';
let s = fs.readFileSync(F, 'utf8');
const FIN = ';syncSeedIA(19,seed)})();';
for (const n of process.argv.slice(2)) {
  const i = s.indexOf('{"id":"19-ia-' + n + '"');
  if (i < 0) { console.log(n, 'no está'); continue; }
  const a = s.lastIndexOf('(function(){const seed=[', i), b = s.indexOf(FIN, i) + FIN.length;
  if (a < 0 || b < FIN.length) throw new Error('bloque mal formado ' + n);
  s = s.slice(0, a) + s.slice(b);
  console.log(n, 'quitado,', b - a, 'caracteres');
}
fs.writeFileSync(F, s);
