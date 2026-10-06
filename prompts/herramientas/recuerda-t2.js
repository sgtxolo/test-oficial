// Inserta en el esquema del Tema 2 las 39 fichas «RECUERDA» (R1 a R39) del temario de Prefortia (pregunta → respuesta),
// transcritas de las páginas finales del temario escaneado. Uso: node prompts/herramientas/recuerda-t2.js
const fs = require('fs');
const G = [
 ['Ley 19/2003 — R1 a R4', 'Ley 19/2003', [
  ['R1', 'Podrá prohibir o limitar la realización de determinados movimientos de capitales y sus correspondientes operaciones de cobro o pago:', 'el Gobierno, mediante acuerdo del Consejo de Ministros, a propuesta del Ministro de Economía.'],
  ['R2', 'Cuando la infracción consista en la presentación fuera de plazo de las declaraciones por los sujetos obligados, sin actuación o requerimiento previo de la Administración, se impondrán las siguientes sanciones:', 'si no han transcurrido más de seis meses, hasta 300 euros, sin que pueda ser inferior a 150 euros. Si han transcurrido más de seis meses, hasta 600 euros, sin que pueda ser inferior a 300 euros.'],
  ['R3', 'Las infracciones prescribirán:', 'las muy graves a los cinco años; las graves, a los tres años, y las leves, al año.'],
  ['R4', 'Las sanciones que se impongan, en virtud de resolución firme, conforme a esta ley prescribirán:', 'a los cinco años, las muy graves; a los cuatro años, las graves, y a los tres años, las leves.']]],
 ['Convenio de Varsovia — R5 a R9', 'Convenio para la prevención del terrorismo', [
  ['R5', 'Difusión o cualquier otra forma de puesta a disposición del público de mensajes con la intención de incitar a cometer delitos terroristas, cuando ese comportamiento, ya preconice directamente o no la comisión de delitos terroristas, cree peligro de que se puedan cometer uno o varios delitos:', 'provocación pública para cometer delitos terroristas.'],
  ['R6', 'Sin perjuicio de los principios jurídicos de la Parte, la responsabilidad de las personas jurídicas podrá ser:', 'penal, civil o administrativa.'],
  ['R7', 'Ninguna disposición del presente Convenio se interpretará en el sentido de que implique una obligación de extraditar si la persona objeto de la demanda de extradición:', 'corre el riesgo de quedar expuesta a la tortura o a penas o tratos inhumanos o degradantes.'],
  ['R8', 'Podrán proponerse enmiendas al presente Convenio por:', 'cualquiera de las Partes, por el Comité de Ministros del Consejo de Europa o por la Consulta entre las Partes.'],
  ['R9', 'Toda Parte podrá denunciar el presente Convenio mediante notificación enviada al Secretario General del Consejo de Europa:', 'en cualquier momento.']]],
 ['Ley 10/2010 — R10 a R22', 'Ley de prevención del blanqueo de capitales', [
  ['R10', 'Aquellos Estados, territorios o jurisdicciones que, por establecer requisitos equivalentes a los de la legislación española, se determinen por la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias, a propuesta de su Secretaría:', 'se considerarán países terceros equivalentes.'],
  ['R11', 'La prestación de servicios bancarios de un banco en calidad de corresponsal a otro banco como cliente, incluidas, entre otras, la prestación de cuentas corrientes u otras cuentas de pasivo y servicios conexos, como gestión de efectivo, transferencias internacionales de fondos, compensación de cheques, y servicios de cambio de divisas:', 'relación de corresponsalía.'],
  ['R12', 'Los sujetos obligados comunicarán cualquier hecho u operación, incluso la mera tentativa, respecto al que, tras el examen especial, exista indicio o certeza de que está relacionado con el blanqueo de capitales o la financiación del terrorismo:', 'por iniciativa propia, al Servicio Ejecutivo de la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias.'],
  ['R13', 'Los sujetos obligados conservarán la documentación en que se formalice el cumplimiento de las obligaciones establecidas en la presente ley, procediendo tras el mismo a su eliminación:', 'durante un período de diez años.'],
  ['R14', 'Los sujetos obligados designarán como representante ante el Servicio Ejecutivo de la Comisión a:', 'una persona residente en España que ejerza cargo de administración o dirección de la sociedad.'],
  ['R15', 'Podrá acordarse la constitución de órganos centralizados de prevención de las profesiones colegiadas sujetas a la presente Ley:', 'mediante orden del Ministro Economía y Empresa.'],
  ['R16', 'Sin perjuicio del efecto directo de los reglamentos comunitarios, podrá acordar la aplicación de contramedidas financieras respecto de países terceros que supongan riesgos más elevados de blanqueo de capitales, financiación del terrorismo o financiación de la proliferación de armas de destrucción masiva:', 'el Consejo de Ministros, a propuesta del Ministro de Economía y Competitividad.'],
  ['R17', 'El impulso y coordinación de la ejecución de la presente Ley corresponderá a:', 'la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias, dependiente de la Secretaría de Estado de Economía.'],
  ['R18', 'Los órganos judiciales, de oficio o a instancia del Ministerio Fiscal, remitirán testimonio a la Secretaría de la Comisión cuando:', 'en el curso del proceso aprecien indicios de incumplimiento de la presente ley que no sean constitutivos de delito.'],
  ['R19', 'Las infracciones administrativas previstas en esta Ley se clasificarán en:', 'muy graves, graves y leves.'],
  ['R20', 'Por la comisión de infracciones leves se podrán imponer las siguientes sanciones:', 'amonestación privada o multa por importe de hasta 60.000 euros.'],
  ['R21', 'Las infracciones muy graves y graves prescribirán:', 'a los cinco años, y las leves a los dos años, contados desde la fecha en que la infracción hubiera sido cometida.'],
  ['R22', 'La ejecución de las resoluciones sancionadoras firmes en vía administrativa corresponderá a:', 'la Secretaría de la Comisión.']]],
 ['Convención de Palermo — R23 a R30', 'Convención de las Naciones Unidas contra la Delincuencia Organizada Transnacional', [
  ['R23', 'Los Estados Parte cumplirán sus obligaciones con arreglo a la presente Convención en consonancia con los principios de:', 'igualdad soberana e integridad territorial de los Estados, así como de no intervención en los asuntos internos de otros Estados.'],
  ['R24', 'Los Estados Parte se esforzarán por establecer y promover la cooperación entre las autoridades judiciales, de cumplimiento de la ley y de reglamentación financiera a fin de combatir el blanqueo de dinero a escala:', 'mundial, regional, subregional y bilateral.'],
  ['R25', 'Los Estados Parte podrán considerar la posibilidad de celebrar acuerdos o arreglos bilaterales o multilaterales sobre el traslado a su territorio de toda persona que haya sido condenada a:', 'pena de prisión o a otra pena de privación de libertad por algún delito comprendido en la presente Convención a fin de que complete allí su condena.'],
  ['R26', 'Los Estados Parte no podrán denegar una solicitud de asistencia judicial recíproca únicamente porque se considera que el delito también entraña:', 'asuntos fiscales.'],
  ['R27', 'Cada Estado Parte establecerá procedimientos adecuados que permitan a las víctimas de los delitos comprendidos en la presente Convención obtener:', 'indemnización y restitución.'],
  ['R28', 'Los Estados Parte procurarán evaluar periódicamente los instrumentos jurídicos y las prácticas administrativas pertinentes vigentes a fin de detectar si existe el peligro de que sean utilizados indebidamente por:', 'grupos delictivos organizados.'],
  ['R29', 'El Secretario General de las Naciones Unidas prestará los servicios de secretaría necesarios a:', 'la Conferencia de las Partes en la Convención.'],
  ['R30', 'Los Estados Parte podrán denunciar la presente Convención mediante notificación escrita al Secretario General de las Naciones Unidas. La denuncia surtirá efecto:', 'un año después de la fecha en que el Secretario General haya recibido la notificación.']]],
 ['Protocolo contra la trata de personas — R31 a R35', 'Protocolo para prevenir, reprimir y sancionar la trata de personas', [
  ['R31', 'Cuando proceda y en la medida que lo permita su derecho interno, cada Estado Parte protegerá la privacidad y la identidad de las víctimas de la trata de personas, en particular, entre otras cosas, previendo:', 'la confidencialidad de las actuaciones judiciales relativas a dicha trata.'],
  ['R32', 'Sin perjuicio de los compromisos internacionales relativos a la libre circulación de personas, los Estados Parte reforzarán, en la medida de lo posible, los controles fronterizos que sean necesarios para:', 'prevenir y detectar la trata de personas.'],
  ['R33', 'Nada de lo dispuesto en el presente Protocolo afectará a los derechos, obligaciones y responsabilidades de los Estados y las personas con arreglo al derecho internacional, incluidos el derecho internacional humanitario y la normativa internacional de derechos humanos y, en particular, cuando sean aplicables, la Convención sobre el Estatuto de los Refugiados de 1951 y su Protocolo de 1967, así como el principio:', 'de non-refoulement consagrado en dichos instrumentos.'],
  ['R34', 'Si se han agotado todas las posibilidades de lograr un consenso y no se ha llegado a un acuerdo, la aprobación de la enmienda exigirá, en última instancia:', 'una mayoría de dos tercios de los Estados Parte en el presente Protocolo presentes y votantes en la sesión de la Conferencia de las Partes.'],
  ['R35', 'El original del presente Protocolo, cuyos textos en árabe, chino, español, francés, inglés y ruso son igualmente auténticos, se depositará en poder:', 'del Secretario General de las Naciones Unidas.']]],
 ['Protocolo contra el tráfico ilícito de migrantes — R36 y R37', 'Protocolo contra el tráfico ilícito de migrantes por tierra, mar y aire', [
  ['R36', 'Los Estados Parte cooperarán en la mayor medida posible para prevenir y reprimir el tráfico ilícito de migrantes por mar, de conformidad con:', 'el derecho internacional del mar.'],
  ['R37', 'Todo Estado Parte que tenga motivos razonables para sospechar que un buque está involucrado en el tráfico ilícito de migrantes por mar y no posee nacionalidad o se hace pasar por un buque sin nacionalidad podrá:', 'visitar y registrar el buque.']]],
 ['Protocolo contra el tráfico ilícito de armas de fuego — R38 y R39', 'Protocolo contra la fabricación y el tráfico ilícitos de armas de fuego', [
  ['R38', 'Cada Estado Parte, para la transferencia de armas de fuego, sus piezas y componentes y municiones:', 'establecerá o mantendrá un sistema eficaz de licencias o autorizaciones de exportación e importación, así como de medidas aplicables al tránsito internacional.'],
  ['R39', 'Con miras a prevenir y combatir la fabricación y el tráfico ilícitos de armas de fuego, sus piezas y componentes y municiones, los Estados Parte que aún no lo hayan hecho considerarán la posibilidad de establecer:', 'un sistema de reglamentación de las actividades de las personas dedicadas al corretaje.']]],
];
const esc = h => JSON.stringify(h);
const bloques = G.map(([cab, norma, items]) => {
  const html = items.map(([r, q, a]) => `<p><b>${r}</b> · <i>${norma}.</i> ${q} <b>→</b> <mark class="m-resp">${a}</mark></p>`).join('');
  return `  + articuloResp(${esc('RECUERDA del temario · ' + cab)}, [], ${esc(html)})`;
});
const code = '/* T2_REC */ T2.rec = bloqueTitulo("RECUERDA DEL TEMARIO — fichas R1 a R39 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario")\n' + bloques.join('\n') + ';\n';
let s = fs.readFileSync('esquemas.html', 'utf8');
s = s.replace(/\/\* T2_REC \*\/ T2\.rec = [\s\S]*?;\n(?=\/\* T2_RECUERDA)/, '');
s = s.replace('/* T2_RECUERDA + ensamblaje */', code + '/* T2_RECUERDA + ensamblaje */');
if (!s.includes('+ T2.armas + T2.rec')) s = s.replace('+ T2.armas\n', '+ T2.armas + T2.rec\n');
fs.writeFileSync('esquemas.html', s);
console.log('fichas RECUERDA:', G.reduce((n, g) => n + g[2].length, 0), s.includes('T2.armas + T2.rec') ? 'ensamblado' : 'NO ensamblado');
