// Tema 2 · bloque 63 · Ley 10/2010 art. 31, parecida a la de ✱ → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t2a-b63.js --json privado/tmp/b63.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 2 privado/tmp/b63.json
const k = "l10";
const Q = [
{k: "l10", a: "art. 31.2", r: "Sucursales y filiales en terceros países", e: "Cuando el derecho del tercer país no permita la aplicación de medidas equivalentes a las establecidas por el derecho de la Unión Europea, los sujetos obligados adoptarán respecto de sus sucursales y filiales con participación mayoritaria:",
 o: ["medidas adicionales para hacer frente eficazmente al riesgo de blanqueo de capitales o de financiación del terrorismo.","el cierre de dichas sucursales y filiales en el plazo de seis meses.","la comunicación inmediata al Ministerio Fiscal de todas sus operaciones.","la retirada de su autorización administrativa para operar."],
 t: "medidas adicionales para hacer frente eficazmente al riesgo de blanqueo de capitales o de financiación del terrorismo", p: "Se adoptan medidas adicionales frente al riesgo de blanqueo o financiación del terrorismo."},
];
require('./preguntas-t2-lib.js').run({ bloque: 63, Q });
