// Tema 3 · bloque 71 · T3 ✱ restantes → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t3a-b71.js --json privado/tmp/b71.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 3 privado/tmp/b71.json
const k = "tfue";
const Q = [
{k: "tfue", a: "art. 232", r: "El Parlamento Europeo", e: "El Parlamento Europeo establecerá su propio reglamento interno por:",
 o: ["mayoría de los miembros que lo componen.","mayoría de dos tercios de los miembros que lo componen.","mayoría absoluta de los votos emitidos.","mayoría cualificada."],
 t: "establecerá su propio reglamento interno por mayoría de los miembros que lo componen", p: "El reglamento interno se aprueba por mayoría de los miembros que lo componen."},
{k: "tfue", a: "art. 233", r: "El Parlamento Europeo", e: "El Parlamento Europeo procederá a la discusión, en sesión pública, del informe general anual que le presentará:",
 o: ["la Comisión.","el Consejo.","el Consejo Europeo.","el Tribunal de Cuentas."],
 t: "del informe general anual que le presentará la Comisión", p: "El informe general anual lo presenta la Comisión."},
{k: "tfue", a: "art. 249.2", r: "La Comisión", e: "La Comisión publicará todos los años, al menos un mes antes de la apertura del período de sesiones del Parlamento Europeo, un informe general sobre:",
 o: ["las actividades de la Unión.","la ejecución del presupuesto.","el estado de la Unión.","la aplicación del Derecho de la Unión."],
 t: "un informe general sobre las actividades de la Unión", p: "Publica un informe general sobre las actividades de la Unión."},
{k: "tfue", a: "art. 275", r: "El Tribunal de Justicia de la Unión Europea", e: "El Tribunal de Justicia de la Unión Europea no será competente para pronunciarse sobre las disposiciones relativas a:",
 o: ["la política exterior y de seguridad común ni sobre los actos adoptados sobre la base de éstas.","la política comercial común.","la cooperación policial.","la ciudadanía de la Unión."],
 t: "no será competente para pronunciarse sobre las disposiciones relativas a la política exterior y de seguridad común ni sobre los actos adoptados sobre la base de éstas", p: "No es competente sobre la PESC ni sobre los actos adoptados en su base."},
];
require('./preguntas-t3r-lib.js').run({ bloque: 71, Q });
