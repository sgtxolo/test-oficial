// Añade al final de las fichas del esquema del T4 los párrafos literales que faltaban (vídeos 28/11/2026). Idempotente.
// Es oficiales-seras-28-11-parrafos.js; en el T4 las fichas empiezan en «T4.html =».
const fs = require('fs');
let src = fs.readFileSync(__dirname + '/oficiales-seras-28-11-parrafos.js', 'utf8');
const a = "lineas.findIndex(l => l.startsWith('/* T' + o.t + '_'))";
if (!src.includes(a)) throw new Error('cambió el modelo');
src = src.replace(a, "lineas.findIndex(l => l.startsWith('T' + o.t + '.html = '))");
new Function('require', 'process', 'console', src)(require, process, console);
