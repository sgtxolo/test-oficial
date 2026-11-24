// Tema 2 · bloque 71 · T2 ✱ restante → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t2a-b71.js --json privado/tmp/b71.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 2 privado/tmp/b71.json
const k = "l10";
const Q = [
{k: "l10", a: "art. 44.1", r: "Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias", e: "La Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias, a la que corresponde el impulso y coordinación de la ejecución de la ley, depende de:",
 o: ["la Secretaría de Estado de Economía.","la Dirección General del Tesoro y Política Financiera.","el Banco de España.","el Ministerio del Interior."],
 t: "dependiente de la Secretaría de Estado de Economía", p: "La Comisión depende de la Secretaría de Estado de Economía."},
];
require('./preguntas-t2-lib.js').run({ bloque: 71, Q });
