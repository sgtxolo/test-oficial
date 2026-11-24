// Tema 2 · bloque 70 · T2 sustituciones → banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t2a-b70.js --json privado/tmp/b70.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 2 privado/tmp/b70.json
const k = "var";
const Q = [
{k: "l19", a: "art. 12.2.b", r: "Procedimiento sancionador", e: "La imposición de sanciones por infracciones muy graves corresponderá al Consejo de Ministros, a propuesta del titular del:",
 o: ["Ministerio de Asuntos Económicos y Transformación Digital.","Ministerio de Hacienda.","Ministerio de Industria, Comercio y Turismo.","Ministerio del Interior."],
 t: "corresponderá al Consejo de Ministros, a propuesta del titular del Ministerio de Asuntos Económicos y Transformación Digital", p: "Las infracciones muy graves las impone el Consejo de Ministros a propuesta del Ministerio de Asuntos Económicos y Transformación Digital."},
{k: "var", a: "cláusula final", r: "Cláusula final", e: "El Convenio fue hecho en Varsovia el 16 de mayo de 2005, en francés y en inglés, en un solo ejemplar que será depositado en:",
 o: ["los archivos del Consejo de Europa.","los archivos de las Naciones Unidas.","poder del Gobierno de Polonia.","los archivos del Tribunal Europeo de Derechos Humanos."],
 t: "en un solo ejemplar que será depositado en los archivos del Consejo de Europa", p: "El ejemplar único se deposita en los archivos del Consejo de Europa."},
{k: "l10", a: "art. 18.1", r: "Comunicación por indicio", e: "Los sujetos obligados comunicarán, por iniciativa propia, al Servicio Ejecutivo de la Comisión cualquier hecho u operación, incluso:",
 o: ["la mera tentativa.","la operación ya ejecutada únicamente.","la sospecha sin indicio alguno.","la operación inferior a 10.000 euros."],
 t: "cualquier hecho u operación, incluso la mera tentativa", p: "La comunicación alcanza incluso a la mera tentativa."},
{k: "l10", a: "art. 46.1", r: "Servicio Ejecutivo de la Comisión", e: "El Servicio Ejecutivo de la Comisión remitirá el informe de inteligencia financiera, si apreciara la existencia de indicios o certeza de blanqueo de capitales, al:",
 o: ["Ministerio Fiscal o a los órganos judiciales, policiales o administrativos competentes.","Banco de España y a la Comisión Europea.","Consejo General del Poder Judicial.","Comité Permanente de la Comisión."],
 t: "el correspondiente informe de inteligencia financiera al Ministerio Fiscal o a los órganos judiciales, policiales o administrativos competentes", p: "El informe se remite al Ministerio Fiscal o a los órganos judiciales, policiales o administrativos competentes."},
{k: "l10", a: "art. 51.1", r: "Infracciones graves", e: "Constituye infracción grave la resistencia u obstrucción a la labor inspectora cuando:",
 o: ["no haya mediado requerimiento del personal actuante expreso y por escrito.","haya mediado requerimiento del Comité Permanente.","se haya impuesto sanción firme por la misma conducta en los últimos cinco años.","haya mediado voluntad deliberada de obstruir."],
 t: "no haya mediado requerimiento del personal actuante expreso y por escrito", p: "Es grave si no medió requerimiento expreso y por escrito del personal actuante.", d: 'dificil'},
{k: "pal", a: "art. 2.d", r: "Definiciones", e: "Por «embargo preventivo» o «incautación» se entenderá:",
 o: ["la prohibición temporal de transferir, convertir, enajenar o mover bienes, o la custodia o el control temporales de bienes por mandamiento de un tribunal u otra autoridad competente.","la transferencia definitiva de bienes al Estado.","la investigación patrimonial de los miembros del grupo.","la devolución de bienes a sus legítimos propietarios."],
 t: "la prohibición temporal de transferir, convertir, enajenar o mover bienes", p: "Es la prohibición o custodia temporal de bienes por mandamiento de autoridad competente.", d: 'dificil'},
{k: "pal", a: "art. 20.1", r: "Técnicas especiales de investigación", e: "Cada Estado Parte adoptará las medidas necesarias para permitir el adecuado recurso a la entrega vigilada y, cuando lo considere apropiado, la utilización de otras técnicas especiales de investigación, como:",
 o: ["la vigilancia electrónica o de otra índole y las operaciones encubiertas.","la interceptación de comunicaciones sin autorización judicial.","los registros domiciliarios nocturnos.","la infiltración de agentes sin límite temporal."],
 t: "como la vigilancia electrónica o de otra índole y las operaciones encubiertas", p: "Se citan la vigilancia electrónica o de otra índole y las operaciones encubiertas."},
{k: "trata", a: "art. 11.1", r: "Medidas fronterizas", e: "Los Estados Parte reforzarán, en la medida de lo posible, los controles fronterizos que sean necesarios para prevenir y detectar la trata de personas, sin perjuicio de:",
 o: ["los compromisos internacionales relativos a la libre circulación de personas.","los acuerdos bilaterales de readmisión.","la soberanía de cada Estado sobre sus fronteras.","las decisiones de la Conferencia de las Partes."],
 t: "Sin perjuicio de los compromisos internacionales relativos a la libre circulación de personas", p: "Se refuerzan los controles sin perjuicio de los compromisos sobre libre circulación de personas."},
];
require('./preguntas-t2-lib.js').run({ bloque: 70, Q });
