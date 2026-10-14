// ⚡ EXPRÉS del Tema 4 (Schengen, Frontex, Prüm, SIS…). Formato LITERAL (reglas del 14/10/2026), máx. 25 págs:
//   · por artículo, O el literal O el cuadro; literal recortado (`ventana`); lo demás en un (…) desplegable;
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t4.js
const X = require('./expres-lib.js')(4);
let V = []; try { V = require('./visuales-t4.js'); } catch (e) {}
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 2, antes: 2, umbral: 35, sinRespPliega: true });

const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: 0.8 });
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: 0.8 }) + S.html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 4', k0: 0, k1: 999 }]);
