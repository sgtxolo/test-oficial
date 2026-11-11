// Esquemas (flujos, plazos y comparativas) del Esquema clave del Tema 21, con el texto literal de cada ley.
// Los 3 cuadros de la Ley 4/2015 son los del Exprés (expres/t21.js). Devuelve { 'nombre de la ley': [html, ...] }.
const fs = require('fs');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const L = require('./visuales-lib.js');
const { P, D, K, flujo, cols, plazos } = L;

const ESQ = {
  'LO 6/1984 · Habeas Corpus': [flujo('HABEAS CORPUS · TRAMITACIÓN (arts. 3 a 9)', [
    { t: `${D('Solicitud')} de la persona privada de libertad · la autoridad que la custodia debe ponerla ${P('inmediatamente')} en conocimiento del ${D('Juez competente')} (art. 5)` },
    { t: `El Juez examina los requisitos y da traslado al ${D('Ministerio Fiscal')} · ${D('auto')} de incoación o denegación por improcedente ${K('(sin recurso alguno)')} (art. 6)` },
    { t: `Auto de incoación: ordena que se ponga de manifiesto a la persona ${P('sin pretexto ni demora')} o se constituye donde esté (art. 7)` },
    { t: `Oye a la persona, a su Abogado, al Fiscal y a la autoridad que ordenó o practicó la detención (art. 7)` },
    { t: `Temeridad o mala fe: ${D('costas')} al solicitante; si no, de oficio · testimonio de los delitos que pudieran cometerse (art. 9)` }])],
  'Ley 4/1985 · Extradición pasiva': [flujo('EXTRADICIÓN PASIVA · PROCEDIMIENTO (arts. 8 a 19)', [
    { t: `Detención preventiva en caso de urgencia: el reclamado se pone a disposición del ${D('Juzgado Central de Instrucción')} de guardia en plazo ${P('no superior a 24 horas')} (art. 8)` },
    { t: `El Gobierno acuerda la continuación en vía judicial: el detenido se pone a disposición judicial en las ${P('24 horas')} siguientes (art. 11)` },
    { t: `Comparecencia con Abogado e intérprete y siempre con el ${D('Fiscal')}: si no consiente, se eleva lo actuado a la ${D('Sala de lo Penal de la Audiencia Nacional')} (art. 12)` },
    { t: `El Tribunal resuelve por auto motivado en ${P('3 días improrrogables')} desde la vista · solo cabe recurso de ${D('súplica')} ante el Pleno de la Sala (art. 15)` },
    { t: `Si es procedente: testimonio al ${D('Ministerio de Justicia')} y el ${D('Gobierno')} decide la entrega (art. 18) · la hace un agente español con lugar y fecha notificados (art. 19)` }])],
  'Ley 25/2007 · Conservación de datos': [plazos('CONSERVACIÓN Y CESIÓN DE DATOS (arts. 5 a 7)', [
    ['12 meses', `${D('Conservación')} de los datos, desde la fecha de la comunicación (art. 5.1)`],
    ['6 m – 2 años', `Por vía reglamentaria el plazo se puede reducir (mínimo ${P('seis meses')}) o ampliar (máximo ${P('dos años')}) (art. 5.1)`],
    ['Autorización judicial', `Los datos solo se ceden para los fines de la ley y ${K('previa autorización judicial')}, en formato electrónico y a los agentes facultados (art. 6)`],
    ['7 días naturales', `Plazo de la cesión si la resolución judicial no fija otro (art. 7.3)`]])],
  'LO 10/2007 · Base de datos policial de ADN': [cols('ADN · CANCELACIÓN DE LOS IDENTIFICADORES (art. 9)', [
    { t: D('Condenatoria firme o absolutoria por falta de imputabilidad o culpabilidad'), l: [`Cancelación al cumplirse el ${P('tiempo de cancelación de antecedentes penales')}`, `Salvo resolución judicial en contrario`] },
    { t: D('Sobreseimiento libre o absolutoria por otras causas'), l: [`Cancelación ${K('en todo caso')} una vez firme la resolución`] },
    { t: D('Sospechosos no imputados'), l: [`Cancelación al transcurrir el tiempo de ${P('prescripción del delito')}`] }])],
  'Ley 23/2014 · Reconocimiento mutuo de resoluciones penales': [
    plazos('ORDEN EUROPEA DE DETENCIÓN Y ENTREGA · PLAZOS (art. 54)', [
      ['Urgente', `Se tramita y ejecuta ${P('con carácter de urgencia')}`],
      ['10 días', `Si la persona ${D('consiente')} la entrega: resolución en los diez días siguientes a la audiencia`],
      ['60 días', `Sin consentimiento: plazo máximo para adoptar resolución firme, desde la detención`],
      ['+30 días', `Prórroga por razones justificadas, comunicándolo a la autoridad judicial de emisión`]]),
    cols('PENA O MEDIDA PRIVATIVA DE LIBERTAD · AUTORIDADES EN ESPAÑA (arts. 64 y 86)', [
      { t: D('Transmite'), l: [`Jueces de ${D('Vigilancia Penitenciaria')} (Jueces de Menores si es una medida de menores)`, `Si no se inició el cumplimiento: el tribunal que dictó la sentencia en primera instancia`] },
      { t: D('Reconoce y ejecuta'), l: [`${D('Juez Central de lo Penal')}: reconoce y acuerda la ejecución`, `${D('Juez Central de Vigilancia Penitenciaria')}: procedimiento de ejecución y libertad condicional`] }])],
};
// cuadros de la Ley 4/2015 (los del temario, ya en el Exprés)
global.window = {}; eval(fs.readFileSync(R + 'expres/t21.js', 'utf8'));
const h = window.EXPRES_T[21].html;
ESQ['Ley 4/2015 · Estatuto de la víctima'] = [...h.matchAll(/<div class="vis[ "][\s\S]*?(?=<div class="ex-ficha"|<div class="bloque-titulo"|$)/g)].map(m => m[0]);
module.exports = ESQ;
