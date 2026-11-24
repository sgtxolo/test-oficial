// Tema 1 · bloque 25 · Convenio Europeo de Derechos Humanos (arts. 46-57), parecidas a las de ✱ → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t1r-b25.js --json privado/tmp/b25.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 1 privado/tmp/b25.json
const k = "cedh";
const Q = [
{k, a: "art. 46.3", r: "Fuerza obligatoria y ejecución de las sentencias", e: "Cuando el Comité de Ministros considere que la supervisión de la ejecución de una sentencia definitiva resulta obstaculizada por un problema de interpretación de dicha sentencia, podrá:",
 o: ["remitir el asunto al Tribunal con objeto de que éste se pronuncie sobre dicho problema de interpretación.","revisar la sentencia por mayoría de dos tercios de sus miembros.","devolver el asunto a la Sala que dictó la sentencia.","solicitar un dictamen a la Asamblea Parlamentaria."],
 t: "podrá remitir el asunto al Tribunal con objeto de que éste se pronuncie sobre dicho problema de interpretación", p: "El Comité puede remitir al Tribunal el problema de interpretación."},
{k, a: "art. 46.3", r: "Fuerza obligatoria y ejecución de las sentencias", e: "La decisión del Comité de Ministros de remitir al Tribunal un problema de interpretación de una sentencia se tomará por mayoría de:",
 o: ["dos tercios de los votos de los representantes que tengan derecho a formar parte del Comité.","tres cuartos de los votos de los representantes que tengan derecho a formar parte del Comité.","la mayoría absoluta de los Estados miembros del Consejo de Europa.","unanimidad de los miembros del Comité."],
 t: "se tomará por mayoría de dos tercios de los votos de los representantes que tengan derecho a formar parte del Comité", p: "La remisión exige dos tercios de los votos de los representantes con derecho a formar parte del Comité.", d: 'dificil'},
{k, a: "art. 47.1", r: "Opiniones consultivas", e: "El Tribunal Europeo de Derechos Humanos podrá emitir opiniones consultivas acerca de cuestiones jurídicas relativas a la interpretación del Convenio y de sus Protocolos a solicitud del:",
 o: ["Comité de Ministros.","Secretario General del Consejo de Europa.","Presidente de la Asamblea Parlamentaria.","Estado que lo considere necesario."],
 t: "El Tribunal podrá emitir opiniones consultivas, a solicitud del Comité de Ministros", p: "Las opiniones consultivas las solicita el Comité de Ministros."},
{k, a: "art. 57.1", r: "Reservas", e: "Todo Estado podrá formular una reserva a propósito de una disposición particular del Convenio en el momento de:",
 o: ["la firma del Convenio o del depósito de su instrumento de ratificación.","la entrada en vigor del Convenio para ese Estado.","su primera comparecencia ante el Tribunal.","la presentación de una demanda en su contra."],
 t: "en el momento de la firma del presente Convenio o del depósito de su instrumento de ratificación, una reserva", p: "Las reservas se formulan al firmar o al depositar el instrumento de ratificación."},
{k, a: "art. 57.2", r: "Reservas", e: "Toda reserva formulada de conformidad con el Convenio irá acompañada de:",
 o: ["una breve exposición de la ley de que se trate.","un dictamen del Comité de Ministros.","la autorización del Parlamento nacional.","una declaración de duración limitada."],
 t: "irá acompañada de una breve exposición de la ley de que se trate", p: "La reserva va acompañada de una breve exposición de la ley de que se trate."},
];
require('./preguntas-t1r-lib.js').run({ bloque: 25, Q });
