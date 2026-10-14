// ⚡ EXPRÉS del Tema 14 (Defensor del Pueblo, ROF…). Formato LITERAL + CUADROS (reglas del 14/10/2026), máx. 25 págs: por artículo, O el literal O el cuadro
// (nunca los dos; el cuadro solo si recoge la respuesta de ≥ 80 % de las preguntas del artículo). Tema corto → SIN recorte (párrafos
// literales enteros con pregunta); fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t14.js
const X = require('./expres-lib.js')(14);
const V = require('./visuales-t14.js');

// Preguntas que el mapa no sitúa, puestas a mano en su artículo (k = n.º de ficha del esquema)
const EXTRAS = {
  32: ['14-ia-43'],            // LO 3/1981, art. 33 — contenido del informe anual
  39: ['14-20'],               // Reglamento (ROF), art. 1 — pregunta general sobre el Reglamento
  55: ['14-157'],              // ROF, art. 17 — sesiones de la Junta de Coordinación y Régimen Interior
  75: ['14-92', '14-108'],     // ROF, art. 37 — sanciones (suspensión hasta 6 meses = falta grave)
};
Object.assign(X.opciones, { recorte: false });   // tema corto: párrafos literales enteros
const H = X.automatico(V, EXTRAS, { uno: 0.8 });

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (visuales-t14.js)
if (require.main === module) X.publica(H, [{ nombre: 'Tema 14', k0: 0, k1: 999 }]);
