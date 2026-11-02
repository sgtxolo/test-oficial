// Segundo renderizador de preguntas del test (variable q): también lleva la R del resumen del Tema 5. Idempotente.
const fs = require('fs'); const f = __dirname + '/../../../test-oficial-conocimiento.html'; let s = fs.readFileSync(f, 'utf8');
const A = '<div class="q-text">${q.pregunta}</div>';
const n = s.split(A).length - 1; if (!n) { console.log('nada que parchear'); process.exit(0); }
s = s.split(A).join('<div class="q-text">${/^5-/.test(q.id||"")&&!(window.FUERA_RESUMEN&&window.FUERA_RESUMEN[q.id])?\'<span class="r-resumen" title="Pregunta de tu resumen subrayado">R</span>\':""}${q.pregunta}</div>');
fs.writeFileSync(f, s); console.log('parcheados', n);
