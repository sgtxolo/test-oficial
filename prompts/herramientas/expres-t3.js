// ⚡ EXPRÉS del Tema 3 (Tratados de la UE: TUE y TFUE). Formato LITERAL + CUADROS (reglas del 14/10/2026), máx. 25 págs:
//   · por artículo, O el literal O el cuadro (nunca los dos; cuadro solo si recoge la respuesta de ≥ 80 % de sus preguntas);
//   · literal recortado (`ventana`, generoso: arranque de 12 palabras y respuesta con 8 de contexto); lo demás en un (…) desplegable;
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t3.js
const X = require('./expres-lib.js')(3);
const V = require('./visuales-t3.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 12, antes: 8, umbral: 200, sinRespPliega: true });

// 1.ª pasada → qué preguntas quedan sueltas; 2.ª: las que tienen artículo seguro van a su ficha (EXTRAS) y las demás a un grupo final
const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: 0.8 });
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: 0.8 }) + S.html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (visuales-t3.js)
if (require.main === module) X.publica(H, [{ nombre: 'Tema 3', k0: 0, k1: 999 }]);
