// ⚡ EXPRÉS del Tema 13 (Ley 29/1998, LJCA). Formato LITERAL + CUADROS (reglas del 14/10/2026), máx. 25 págs: por artículo, O el literal O el cuadro
// (nunca los dos; el cuadro solo si recoge la respuesta de ≥ 80 % de las preguntas del artículo). Tema corto → SIN recorte (párrafos
// literales enteros con pregunta); fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t13.js
// Los 13 artículos más largos (CONDENSADAS) salen como su esquema condensado de esquemas-t13-nuevos.js (V ya lo incluye con 'condensa').
const X = require('./expres-lib.js')(13);
const V = require('./visuales-t13.js');

// fichas (k) cuyo literal NO va en el Exprés porque las condensa un esquema propio:
// arts. 2, 8, 11, 19, 48, 74, 103, 104, 105, 109, 110, 116 y 122
const CONDENSADAS = new Set([1, 7, 10, 14, 29, 37, 41, 42, 43, 47, 48, 54, 60]);
// preguntas que el mapa no sitúa, puestas a mano en su artículo (k = n.º de ficha)
const EXTRAS = {
  0: ['13-117'],      // art. 1.3 — pretensiones sobre personal, administración y gestión patrimonial de órganos constitucionales
  4: ['13-ia-1'],     // art. 5.1 — la jurisdicción es improrrogable
  12: ['13-133'],     // art. 13 — criterios de distribución de competencia
  16: ['13-204'],     // art. 21 — parte demandada si se alega la ilegalidad de una disposición general
  21: ['13-126'],     // art. 28 — recursos contra actos confirmatorios de actos consentidos: inadmisibles
  31: ['13-ia-58'],   // art. 68.1 — fallos de la sentencia (no existe el «sobreseimiento»)
  32: ['13-215'],     // art. 69 — inadmisibilidad
  62: ['13-ia-41'],   // art. 122 ter.7 — cuestión prejudicial de validez ante el TJUE
};

Object.assign(X.opciones, { recorte: false });   // cabe sin recorte: párrafos literales enteros
const H = X.automatico(V, EXTRAS, { fichas: CONDENSADAS, uno: 0.8 });

module.exports = { visuales: () => [] };   // los cuadros (también los nuevos) los inserta visuales-t13.js
if (require.main === module) X.publica(H, [{ nombre: 'Tema 13', k0: 0, k1: 999 }]);
