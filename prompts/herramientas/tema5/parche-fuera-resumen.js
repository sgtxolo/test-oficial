// Parche único (idempotente): el test no saca las preguntas de window.FUERA_RESUMEN (esquemas-datos/fuera-resumen-t5.js).
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');
const T = path.join(ROOT, 'test-oficial-conocimiento.html');
let s = fs.readFileSync(T, 'utf8');
const A = 'function preguntasOficialesDe(e){return QUESTIONS[e]||[]}function preguntasIADe(e){return state.preguntasIA&&state.preguntasIA[e]||[]}';
const B = 'function preguntasOficialesDe(e){return(QUESTIONS[e]||[]).filter(q=>!(window.FUERA_RESUMEN&&window.FUERA_RESUMEN[q.id]))}function preguntasIADe(e){return(state.preguntasIA&&state.preguntasIA[e]||[]).filter(q=>!(window.FUERA_RESUMEN&&q&&window.FUERA_RESUMEN[q.id]))}';
if (s.includes(B)) console.log('funciones ya parcheadas');
else if (!s.includes(A)) throw new Error('no encuentro las funciones del test');
else { s = s.replace(A, () => B); console.log('funciones parcheadas'); }
const tag = '<script src="esquemas-datos/fuera-resumen-t5.js"></script>';
if (!s.includes(tag)) { s = s.replace('<script src="expres-subrayado/datos-t7.js"></script>', () => tag + '\n<script src="expres-subrayado/datos-t7.js"></script>'); console.log('script añadido'); }
fs.writeFileSync(T, s);
const SW = path.join(ROOT, 'service-worker.js'); let w = fs.readFileSync(SW, 'utf8');
if (!w.includes('esquemas-datos/fuera-resumen-t5.js')) { w = w.replace('  "./expres-subrayado/datos-t6.js",', () => '  "./esquemas-datos/fuera-resumen-t5.js",\n  "./expres-subrayado/datos-t6.js",'); fs.writeFileSync(SW, w); console.log('service worker: archivo añadido'); }
