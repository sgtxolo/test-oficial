// Tema 3 · bloque 70 · T3 sustituciones → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t3a-b70.js --json privado/tmp/b70.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 3 privado/tmp/b70.json
const k = "tue";
const Q = [
{k: "tue", a: "art. 42.2", r: "Política común de seguridad y defensa", e: "Cuando el Consejo Europeo decida por unanimidad que la política común de defensa conduzca a una defensa común, recomendará a los Estados miembros que adopten una decisión en este sentido de conformidad con:",
 o: ["sus respectivas normas constitucionales.","el Derecho de la Unión.","los acuerdos de la OTAN.","las decisiones del Consejo."],
 t: "de conformidad con sus respectivas normas constitucionales", p: "La decisión se adopta conforme a las normas constitucionales de cada Estado."},
{k: "tue", a: "art. 42.3", r: "Política común de seguridad y defensa", e: "Los Estados miembros pondrán a disposición de la Unión, a efectos de la aplicación de la política común de seguridad y defensa, capacidades civiles y militares para contribuir a los objetivos definidos por:",
 o: ["el Consejo.","el Consejo Europeo.","el Alto Representante.","la Agencia Europea de Defensa."],
 t: "para contribuir a los objetivos definidos por el Consejo", p: "Los objetivos los define el Consejo."},
{k: "tfue", a: "art. 71", r: "Espacio de libertad, seguridad y justicia", e: "Con objeto de garantizar el fomento y la intensificación de la cooperación operativa en materia de seguridad interior, se creará un comité permanente en:",
 o: ["el Consejo.","la Comisión.","el Parlamento Europeo.","el Consejo Europeo."],
 t: "Se creará un comité permanente en el Consejo", p: "El comité permanente se crea en el Consejo."},
{k: "tfue", a: "art. 226", r: "El Parlamento Europeo", e: "A petición de la cuarta parte de los miembros que lo componen, el Parlamento Europeo podrá constituir:",
 o: ["una comisión temporal de investigación.","una comisión permanente de control.","una comisión de conciliación.","un comité de expertos."],
 t: "podrá constituir una comisión temporal de investigación", p: "Puede constituir una comisión temporal de investigación."},
{k: "tfue", a: "art. 259", r: "El Tribunal de Justicia de la Unión Europea", e: "Antes de que un Estado miembro interponga un recurso por incumplimiento contra otro, la Comisión emitirá un dictamen motivado una vez que los Estados interesados hayan tenido la posibilidad de formular sus observaciones:",
 o: ["por escrito y oralmente en procedimiento contradictorio.","únicamente por escrito.","ante el Consejo en sesión pública.","ante el Tribunal de Justicia."],
 t: "formular sus observaciones por escrito y oralmente en procedimiento contradictorio", p: "Se oyen las observaciones por escrito y oralmente en procedimiento contradictorio."},
];
require('./preguntas-t3r-lib.js').run({ bloque: 70, Q });
