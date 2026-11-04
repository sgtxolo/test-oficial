// Quita restos de importación (dígitos de nota al pie pegados dentro de palabras o al final de frase) y erratas claras
// del banco de test-oficial-conocimiento.html. Cada sustitución es un texto exacto y se informa de cuántas veces se aplicó.
// Uso: node prompts/herramientas/limpia-erratas-banco.js <lista.json> [--aplicar]
//   lista.json = [["texto exacto antes","texto exacto después"], ...]   (sin --aplicar solo cuenta)
const fs = require('fs');
const [,, LISTA, ...flags] = process.argv;
const FILE = require('path').join(__dirname, '..', '..', 'test-oficial-conocimiento.html');
let s = fs.readFileSync(FILE, 'utf8');
let tot = 0, falta = 0;
for (const [a, b] of JSON.parse(fs.readFileSync(LISTA, 'utf8'))) {
  const n = s.split(a).length - 1;
  if (!n) { falta++; console.log('NO ENCONTRADO:', a); continue; }
  tot += n; if (flags.includes('--aplicar')) s = s.split(a).join(b);
}
if (flags.includes('--aplicar')) fs.writeFileSync(FILE, s);
console.log((flags.includes('--aplicar') ? 'aplicadas ' : 'se aplicarían ') + tot + ' sustituciones; no encontradas: ' + falta);
