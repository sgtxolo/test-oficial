// ⚡ EXPRÉS del Tema 11 (1.427 preguntas, 319 fichas). Formato LITERAL + CUADROS (reglas del 14/10/2026), máx. 25 págs:
//   · por artículo, O el literal O el cuadro (nunca los dos; cuadro solo si recoge la respuesta de ≥ 80 % de sus preguntas);
//   · tema muy largo → literal recortado (`ventana`) y, además, `soloOficial`: se ven las frases con pregunta OFICIAL y, en los
//     artículos EX, también las de IA; las frases que solo tienen preguntas IA quedan en un (…) que se despliega con su texto literal
//     y sus respuestas siguen marcadas y enlazadas (doble clic → pregunta);
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t11.js
const X = require('./expres-lib.js')(11);
const V = require('./visuales-t11.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 3, antes: 2, umbral: 45, sinRespPliega: true, soloOficial: true, iaEnEX: true });

// 1.ª pasada → qué preguntas quedan sueltas; 2.ª: las que tienen artículo seguro van a su ficha (EXTRAS) y las demás a un grupo final
const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: 0.8 });
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: 0.8 }) + X.asignaSueltas(H0).html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (visuales-t11.js)
if (require.main === module) X.publica(H, [{ nombre: 'Tema 11', k0: 0, k1: 999 }]);
