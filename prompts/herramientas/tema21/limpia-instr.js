// Quita las marcas de color que aplicar-subrayado-pdf/lila/unir dejan en T21.instr (la Instrucción no tiene subrayado de mi PDF alineado).
// Uso: node prompts/herramientas/tema21/limpia-instr.js   (idempotente)
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas-datos', 't21.js');
const L = fs.readFileSync(F, 'utf8').split('\n');
let n = 0;
for (let i = 0; i < L.length; i++) {
  if (!L[i].includes('["T21.instr"]=')) continue;
  const a = (L[i].match(/<mark/g) || []).length;
  L[i] = L[i].replace(/<mark class=\\"[^"\\]*\\"[^>]*>/g, '').replace(/<\/mark>/g, '');
  n = a;
}
fs.writeFileSync(F, L.join('\n'));
console.log('marcas quitadas de T21.instr:', n);
