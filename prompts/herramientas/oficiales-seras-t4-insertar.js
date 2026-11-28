// Inserta el lote del T4 (vídeos 28/11/2026) con el modelo oficiales-seras-28-11.js.
// Diferencia: en los enunciados «…señale la opción (in)correcta» sin pregunta, solo es repetida si además coinciden las opciones.
const fs = require('fs');
let src = fs.readFileSync(__dirname + '/oficiales-seras-28-11.js', 'utf8');
const a = "(!generico(q.pregunta) || x.o === o)";
if (!src.includes(a)) throw new Error('cambió el modelo');
src = src.replace(a, "(!(generico(q.pregunta) || (!/¿/.test(q.pregunta) && /(señale|indique|marque)[^.]{0,40}(in)?correcta/i.test(q.pregunta))) || x.o === o)").replace("require('./esq-virtual.js');", "require(process.cwd() + '/prompts/herramientas/esq-virtual.js');");
new Function('require', 'process', 'console', src)(require, process, console);
