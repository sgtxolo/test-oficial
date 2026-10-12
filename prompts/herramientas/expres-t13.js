// ⚡ EXPRÉS del Tema 13 (Ley 29/1998, LJCA). Caso MIXTO: automático (párrafos literales con pregunta + cuadros de
// visuales-t13.js) salvo en los 8 artículos más largos, cuyo literal se sustituye por los esquemas condensados de
// esquemas-t13-nuevos.js (que visuales-t13.js ya incluye en V), para quedar en 17-20 págs.
// Uso: node prompts/herramientas/expres-t13.js
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

const H = X.automatico(V, EXTRAS, { fichas: CONDENSADAS, conCuadro: true });

module.exports = { visuales: () => [] };   // los cuadros (también los nuevos) los inserta visuales-t13.js
if (require.main === module) X.publica(H, [{ nombre: 'Tema 13', k0: 0, k1: 999 }]);
