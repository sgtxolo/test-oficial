// ⚡ EXPRÉS del Tema 12 (Ley 50/1997, del Gobierno). Formato LITERAL + CUADROS (reglas del 14/10/2026), máx. 25 págs: por artículo, O el literal O el cuadro
// (nunca los dos; el cuadro solo si recoge la respuesta de ≥ 80 % de las preguntas del artículo). Tema corto → SIN recorte (párrafos
// literales enteros con pregunta); fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t12.js
const X = require('./expres-lib.js')(12);
const V = require('./visuales-t12.js');

Object.assign(X.opciones, { recorte: false });   // tema corto: párrafos literales enteros
const H = X.automatico(V, {}, { uno: 0.8 });

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (visuales-t12.js)
if (require.main === module) X.publica(H, [
  { nombre: 'Título I (Gobierno y órganos)', k0: 0, k1: 10 }, { nombre: 'Título II (estatuto)', k0: 11, k1: 16 },
  { nombre: 'Títulos III y IV (funcionamiento y en funciones)', k0: 17, k1: 20 },
  { nombre: 'Título V (iniciativa legislativa y potestad reglamentaria)', k0: 21, k1: 26 }, { nombre: 'Título VI (control)', k0: 27, k1: 28 }]);
