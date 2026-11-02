// Tema 5: una «R» en un círculo delante del enunciado de las preguntas del resumen (solo las del Tema 5 que no están apartadas). Idempotente.
const fs = require('fs'); const f = __dirname + '/../../../test-oficial-conocimiento.html'; let s = fs.readFileSync(f, 'utf8');
if (s.includes('r-resumen')) { console.log('ya estaba'); process.exit(0); }
const A = '<div class="q-text">${a.pregunta}</div>';
if (!s.includes(A)) throw new Error('no encuentro el enunciado');
s = s.replace(A, () => '<div class="q-text">${/^5-/.test(a.id||"")&&!(window.FUERA_RESUMEN&&window.FUERA_RESUMEN[a.id])?\'<span class="r-resumen" title="Pregunta de tu resumen subrayado">R</span>\':""}${a.pregunta}</div>');
const C = '.q-text{';
s = s.replace(C, () => '.r-resumen{display:inline-flex;align-items:center;justify-content:center;width:1.25em;height:1.25em;margin-right:.45em;border:2px solid currentColor;border-radius:50%;font-size:.7em;font-weight:800;vertical-align:.12em;color:#1d6b4f}\n' + C);
fs.writeFileSync(f, s); console.log('ok');
