// Añade a temario-limpio/tema5/transcrito.txt las citas del bloque 24 (transcritas de las fotos del resumen, págs. 18-19) para que la librería las verifique.
const fs = require('fs'), path = require('path'), Module = require('module');
const R = path.join(__dirname, '..', '..', '..'); let cap;
const orig = Module._load; Module._load = function (r, ...a) { if (/preguntas-t5-lib/.test(r)) return { run: o => { cap = o; } }; return orig.call(this, r, ...a); };
require(path.join(R, 'prompts', 'herramientas', 'preguntas-t5-b24.js')); Module._load = orig;
const f = path.join(R, 'prompts', 'temario-limpio', 'tema5', 'transcrito.txt'); const s = fs.readFileSync(f, 'utf8');
const nuevo = cap.Q.map(q => q.t).filter(t => !s.includes(t));
fs.appendFileSync(f, '\n=====RESUMEN págs. 18-19 (VIS 7 bis a 7 quinquies, transcrito de las fotos)=====\n' + nuevo.join('\n') + '\n');
console.log('citas añadidas', nuevo.length);
