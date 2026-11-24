// Tema 1 · bloque 27 · Estatuto de Roma, ✱ restantes (arts. 9-99), parecidas a las oficiales → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t1r-b27.js --json privado/tmp/b27.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 1 privado/tmp/b27.json
const k = "er";
const Q = [
{k, a: "art. 9.2", r: "Elementos de los Crímenes", e: "Podrán proponer enmiendas a los Elementos de los Crímenes, entre otros:",
 o: ["cualquier Estado Parte, los magistrados por mayoría absoluta y el fiscal.","únicamente los Estados Partes y el fiscal.","los magistrados por unanimidad y el Secretario.","el Consejo de Seguridad y cualquier Estado Parte."],
 t: "a) Cualquier Estado Parte; b) Los magistrados, por mayoría absoluta; c) El fiscal", p: "Proponen enmiendas cualquier Estado Parte, los magistrados por mayoría absoluta y el fiscal.", d: 'dificil'},
{k, a: "art. 17.1.b", r: "Cuestiones de admisibilidad", e: "La Corte resolverá la inadmisibilidad de un asunto cuando haya sido objeto de investigación por un Estado que tenga jurisdicción sobre él y éste haya decidido no incoar acción penal contra la persona de que se trate, salvo que la decisión haya obedecido a que:",
 o: ["no esté dispuesto a llevar a cabo el enjuiciamiento o no pueda realmente hacerlo.","la persona haya sido ya enjuiciada por la Corte.","el asunto no revista gravedad suficiente.","la causa esté pendiente ante otro Estado."],
 t: "salvo que la decisión haya obedecido a que no esté dispuesto a llevar a cabo el enjuiciamiento o no pueda realmente hacerlo", p: "La inadmisibilidad no procede si el Estado no está dispuesto a enjuiciar o no puede hacerlo realmente.", d: 'dificil'},
{k, a: "art. 18.1", r: "Decisiones preliminares relativas a la admisibilidad", e: "El fiscal notificará el inicio de la investigación a todos los Estados Partes y a los Estados que normalmente ejercerían la jurisdicción sobre los crímenes. En la notificación podrá limitar el alcance de la información proporcionada cuando lo considere necesario a fin de:",
 o: ["proteger personas, impedir la destrucción de pruebas o impedir la fuga de personas.","proteger la reputación de los Estados implicados.","salvaguardar los secretos oficiales de los Estados Partes.","evitar la intervención del Consejo de Seguridad."],
 t: "a fin de proteger personas, impedir la destrucción de pruebas o impedir la fuga de personas", p: "Puede limitar la información para proteger personas, impedir la destrucción de pruebas o la fuga.", d: 'dificil'},
{k, a: "art. 56.3.a", r: "Oportunidad única de proceder a una investigación", e: "Cuando la Sala de Cuestiones Preliminares considere que el fiscal no ha solicitado medidas que, a su juicio, sean esenciales para la defensa en juicio, le consultará:",
 o: ["si se justificaba no haberlas solicitado.","si desea retirar los cargos.","si necesita más tiempo para investigar.","si desiste de la acción penal."],
 t: "le consultará si se justificaba no haberlas solicitado", p: "La Sala consulta al fiscal si se justificaba no haber solicitado las medidas."},
{k, a: "art. 58.7", r: "Orden de detención o de comparecencia", e: "La Sala de Cuestiones Preliminares dictará una orden de comparecencia, en lugar de una orden de detención, si está convencida de que hay motivo razonable para creer que la persona ha cometido el crimen que se le imputa y de que bastará con una orden de comparecencia para:",
 o: ["asegurar que comparezca efectivamente.","impedir su fuga.","garantizar la ejecución de la pena.","proteger a las víctimas y a los testigos."],
 t: "que bastará con una orden de comparecencia para asegurar que comparezca efectivamente", p: "Basta la orden de comparecencia si asegura que la persona comparezca efectivamente."},
{k, a: "art. 58.7", r: "Orden de detención o de comparecencia", e: "La Sala de Cuestiones Preliminares dictará la orden de comparecencia con o sin las condiciones limitativas de la libertad, distintas de la detención, que prevea:",
 o: ["el derecho interno.","el Reglamento de la Corte.","las Reglas de Procedimiento y Prueba.","el propio Estatuto."],
 t: "que prevea el derecho interno, una orden para que la persona comparezca", p: "Las condiciones limitativas de la libertad son las que prevea el derecho interno."},
{k, a: "art. 59.4", r: "Procedimiento de detención en el Estado de detención", e: "Al decidir sobre la libertad provisional del detenido, la autoridad competente del Estado de detención no podrá examinar:",
 o: ["si la orden de detención fue dictada conforme a derecho.","si existen circunstancias urgentes y excepcionales.","si existen las salvaguardias necesarias para entregar a la persona a la Corte.","la gravedad de los presuntos crímenes."],
 t: "no podrá examinar si la orden de detención fue dictada conforme a derecho", p: "No puede examinar si la orden de detención fue dictada conforme a derecho.", d: 'dificil'},
{k, a: "art. 99.4.a", r: "Cumplimiento de las solicitudes de asistencia", e: "Cuando el Estado Parte requerido fuere un Estado en cuyo territorio se hubiera cometido presuntamente el crimen y hubiere habido una decisión de admisibilidad, el fiscal podrá ejecutar directamente la solicitud:",
 o: ["tras celebrar todas las consultas posibles con el Estado Parte requerido.","sin necesidad de consultar al Estado Parte requerido.","previa autorización de la Sala de Cuestiones Preliminares.","tras notificarlo a la Asamblea de los Estados Partes."],
 t: "el fiscal podrá ejecutar directamente la solicitud tras celebrar todas las consultas posibles con el Estado Parte requerido", p: "Puede ejecutarla directamente tras celebrar todas las consultas posibles con el Estado.", d: 'dificil'},
];
require('./preguntas-t1r-lib.js').run({ bloque: 27, Q });
