// ⚡ EXPRÉS del Tema 12 (Ley 50/1997, del Gobierno). Tema corto (≈ 12,7 págs de articulado, 9 con preguntas) y con
// 25 cuadros ya hechos en visuales-t12.js → Exprés AUTOMÁTICO: párrafos literales ENTEROS con pregunta + esos cuadros.
// Uso: node prompts/herramientas/expres-t12.js
const X = require('./expres-lib.js')(12);
const V = require('./visuales-t12.js');

const H = X.automatico(V);

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (visuales-t12.js)
if (require.main === module) X.publica(H, [
  { nombre: 'Título I (Gobierno y órganos)', k0: 0, k1: 10 }, { nombre: 'Título II (estatuto)', k0: 11, k1: 16 },
  { nombre: 'Títulos III y IV (funcionamiento y en funciones)', k0: 17, k1: 20 },
  { nombre: 'Título V (iniciativa legislativa y potestad reglamentaria)', k0: 21, k1: 26 }, { nombre: 'Título VI (control)', k0: 27, k1: 28 }]);
