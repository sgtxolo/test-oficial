// Limpieza de las citas tras la revisión una a una (parr2.json -> parr3.json)
const fs = require('fs'); const P = require('./parr2.json');
const D = 'C:/Users/ruben/Desktop/HTML OFICIAL/prompts/temario-limpio/';
const leer = f => fs.readFileSync(D + f, 'utf8').split(/\r?\n/);
const g = id => P.find(o => o.id === id);
const pon = (ids, cita) => ids.forEach(i => g(i).cita = cita.slice());
const corta = (t, marca) => { const i = t.indexOf(marca); return i < 0 ? t : t.slice(0, i).trim(); };
// ---- Tema 2
pon(['2-292'], g('2-286').cita);
for (const id of ['2-341', '2-343']) g(id).cita = g(id).cita.map(p => corta(p, 'PRESCRIPCIÓN DE LAS INFRACCIONES MUY GRAVES'));
g('2-355').cita = g('2-355').cita.map(p => corta(p, 'EL DELITO SERÁ DE CARÁCTER TRANSNACIONAL SI:'));
g('2-358').cita = g('2-358').cita.map(p => { const m = 'para lograr esos fines.'; const i = p.indexOf(m); return i < 0 ? p : p.slice(0, i + m.length); });
// ---- Tema 5: Código de visados (texto del escaneado vigente, sin los defectos del OCR)
const V51 = ['1. El Estado miembro competente para examinar y decidir sobre una solicitud de visado uniforme será:', 'a) el Estado miembro cuyo territorio sea el único destino de la visita o visitas;', 'b) si la visita incluye más de un destino, o si se van a realizar varias visitas diferentes durante un período de dos meses, el Estado miembro cuyo territorio sea, por la duración de la estancia, contabilizada en días, o por su finalidad, el destino principal de la visita o visitas, o', 'c) si no puede determinarse un destino principal, el Estado miembro cuya frontera exterior se proponga cruzar el solicitante para entrar en el territorio de los Estados miembros.'];
pon(['5-467', '5-475'], V51);
pon(['5-423'], ['2. El Estado miembro competente para examinar y decidir sobre una solicitud de visado uniforme con fines de tránsito será:', 'a) en caso de tránsito a través de un único Estado miembro, el Estado miembro de que se trate, o', 'b) en caso de tránsito a través de varios Estados miembros, el Estado miembro cuya frontera exterior se proponga cruzar el solicitante para iniciar el tránsito.']);
g('5-424').cita[0] = '1. Los Estados miembros tomarán identificadores biométricos del solicitante, que comprenderán una imagen facial y diez impresiones dactilares del solicitante, de conformidad con las garantías establecidas en el Convenio del Consejo de Europa para la Protección de los Derechos Humanos y de las Libertades Fundamentales, en la Carta de los Derechos Fundamentales de la Unión Europea y en la Convención de las Naciones Unidas sobre los Derechos del Niño.';
pon(['5-428', '5-439'], ['1. El período de validez de un visado y la duración de la estancia autorizada se decidirán sobre la base del examen realizado de conformidad con el artículo 21. Un visado podrá expedirse para una, dos o múltiples entradas. El período de validez no será superior a cinco años. Sin perjuicio de lo dispuesto en el artículo 12, apartado 1, letra a), el período de validez del visado para una única entrada incluirá un «período de gracia» de quince días naturales. Los Estados miembros podrán decidir no conceder dicho período de gracia por razones de orden público o por motivos ligados a las relaciones internacionales de cualquiera de los Estados miembros.']);
for (const id of ['5-432', '5-471']) g(id).cita = g(id).cita.map(p => corta(p, 'Solicitantes que quedan exentos'));
g('5-436').cita = g('5-436').cita.slice(0, 2).map(p => corta(p, 'Expedición;'));
pon(['5-442', '5-472'], ['1. Los nacionales de los terceros países incluidos en la lista que figura en el anexo IV deberán estar en posesión de un visado de tránsito aeroportuario para pasar por las zonas internacionales de tránsito de los aeropuertos situados en el territorio de los Estados miembros.', 'ANEXO IV. Lista común de terceros países que figura en el anexo I del Reglamento (CE) n.º 539/2001, cuyos nacionales han de estar en posesión de un visado de tránsito aeroportuario para pasar por la zona internacional de tránsito de los aeropuertos situados en el territorio de los Estados miembros:', 'Afganistán, Bangladesh, República Democrática del Congo, Eritrea, Etiopía, Ghana, Irán, Iraq, Nigeria, Pakistán, Somalia y Sri Lanka.']);
pon(['5-452'], ['A efectos del presente Reglamento se aplicarán las siguientes definiciones:', '11) «intermediario comercial»: gestoría privada, empresa de transporte o agencia de viaje (operador turístico o minorista del sector turístico).']);
pon(['5-469'], ['A efectos del presente Reglamento se aplicarán las siguientes definiciones:', '4) «visado de validez territorial limitada»: el visado válido para el territorio de uno o más Estados miembros, pero no todos;']);
const V242 = ['2. Siempre que el solicitante cumpla las condiciones de entrada que figuran en el artículo 6, apartado 1, letras a), c), d) y e), del Código de fronteras Schengen, los visados para entradas múltiples de larga duración se expedirán con los siguientes períodos de validez:', 'a) por un período de validez de un año, siempre que el solicitante haya obtenido y utilizado legalmente tres visados en los dos años anteriores;', 'b) por un período de validez de dos años, siempre que el solicitante haya obtenido y utilizado legalmente un visado para entradas múltiples con una validez de un año en los dos años anteriores;', 'c) por un período de validez de cinco años, siempre que el solicitante haya obtenido y utilizado legalmente un visado para entradas múltiples con una validez de dos años en los tres años anteriores.', 'Los visados de tránsito aeroportuario y los visados con una validez territorial limitada que se expidan de conformidad con el artículo 25, apartado 1, no se tendrán en cuenta para la expedición de visados para entradas múltiples.'];
pon(['5-453', '5-461'], V242);
g('5-466').cita = g('5-466').cita.map(p => corta(p, 'El examen de la solicitud se basará sobre todo en...'));
pon(['5-470'], ['1. El impreso de solicitud se presentará y se firmará electrónicamente. En los casos contemplados en el artículo 9, apartado 1 ter, los solicitantes podrán presentar un impreso de solicitud cumplimentado manualmente o por vía electrónica y firmado manualmente.', 'Las personas incluidas en el documento de viaje del solicitante presentarán un impreso de solicitud por separado. Los menores presentarán un impreso de solicitud firmado por una persona que ejerza sobre ellos, de modo temporal o permanente, la patria potestad o la tutela legal del menor.', '1 quater. Cada solicitante presentará un impreso de solicitud debidamente cumplimentado, junto con una declaración de la autenticidad, exhaustividad, exactitud y fiabilidad de la información presentada y una declaración sobre la veracidad y fiabilidad de las declaraciones efectuadas. Cada solicitante indicará también que ha comprendido las condiciones de entrada a que se refiere el artículo 6 del Código de fronteras Schengen y que se le puede pedir que facilite los documentos justificativos necesarios en cada entrada.']);
g('5-470').loc = 'Art. 11.1 y 1 quater';
pon(['5-473'], ['1. Corresponderá a los consulados examinar las solicitudes y decidir al respecto.']);
g('5-477').cita = g('5-477').cita.map(p => corta(p, 'Validez visita.'));
g('5-480').cita = g('5-480').cita.map(p => corta(p, 'T5. 3'));
g('5-438').cita.splice(1, 0, '4. Únicamente los consulados o las autoridades centrales examinarán las solicitudes, realizarán las entrevistas que procedan y adoptarán la decisión sobre las solicitudes.');
g('5-451').loc = 'Art. 1.4';
// ---- Eurodac
pon(['5-504'], ['2. El tratamiento de datos personales efectuado por Europol con arreglo al presente Reglamento se llevará a cabo de conformidad con el Reglamento (UE) 2016/794 y estará supervisado por el Supervisor Europeo de Protección de Datos.']);
g('5-504').loc = 'Art. 44.2';
g('5-486').cita.push('4. La Comisión será responsable de todas las funciones relacionadas con la Infraestructura de Comunicación distintas de las mencionadas en el apartado 3, en particular:', 'a) ejecución del presupuesto;', 'b) adquisición y renovación;', 'c) cuestiones contractuales.');
// ---- Tema 11
g('11-239').cita = g('11-239').cita.slice(0, 1);
// ---- Tema 18
g('18-353').cita = ['1. Por un tiempo no superior a cinco años:', 'a) Libertad vigilada.', 'b) Custodia familiar. El sometido a esta medida quedará sujeto al cuidado y vigilancia del familiar que se designe y que acepte la custodia, quien la ejercerá en relación con el Juez de Vigilancia Penitenciaria y sin menoscabo de las actividades escolares o laborales del custodiado.'].concat(g('18-353').cita.slice(0, 4));
{ // se toma el apartado 1 tal como viene en el temario
  const L = leer('tema18/oficial.txt'); const i = L.findIndex(l => /^\s{0,3}Artículo 105\./.test(l)); const j = L.findIndex((l, k) => k > i && /^\s*2\. Por un tiempo/.test(l));
  const ps = []; for (const l of L.slice(i + 1, j)) { if (!l.trim() || /^=====|BOE-|^\s*\d+\s*$/.test(l)) continue; if (/^ {3,}\S/.test(l) || !ps.length) ps.push(l.trim()); else ps[ps.length - 1] += ' ' + l.trim(); }
  const k = ps.findIndex(p => /^1\. Por un tiempo no superior/.test(p)); if (k < 0) throw new Error('105.1');
  g('18-353').cita = ps.slice(k).concat(g('18-353').cita.filter(p => !/^1\. Por un tiempo|^a\) Libertad vigilada\.$|^b\) Custodia/.test(p)).slice(0, 4));
}
// ---- limpieza general
const R = [
  [/ ?T5\. ?3 \| EP04 \| Vl\.O/g, ''], [/poster-ormente/g, 'posteriormente'], [/identifícadores/g, 'identificadores'], [/los cuerdos/g, 'los acuerdos'], [/natu les antes/g, 'naturales antes'],
  [/cubrirtodoelj'eríodo de estanda~o tránsito/g, 'cubrir todo el período de estancia o tránsito'], [/Estados m'iembros-,/g, 'Estados miembros,'],
  [/consonan R23 cia/g, 'consonancia'], [/ ?TEMARIO DE ASCENSO A OFICIAL/g, ''], [/ ?(É )?TOMO ?[i1I]( I)?(?![\w])/g, ''], [/ ?\b000\d{3}\b/g, ''], [/ ?BASES DE DATOS EUROPEAS/g, ''],
  [/\bR\d{1,2}\b ?/g, ''], [/ ?II\.TRÁFICO ILÍCITO DE MIGRANTES POR MAR\./g, ''], [/^EL SERVICIO EJECUTIVO\. /, ''], [/^O AUTORIZACIONES DE EXPORTACIÓN, IMPORTACIÓN Y TRÁNSITO\. /, ''], [/LAS SANCIONES SE GRADUARÁN ATENDIENDO A: /, ''],
  [/\bAlos\b/g, 'A los'], [/\bAfin\b/g, 'A fin'], [/\bApartir\b/g, 'A partir'], [/\bcorneta\b/g, 'cometa'],
  [/yjustificodos/g, 'y justificados'], [/quejustifican/g, 'que justifican'], [/s¡ la/g, 'si la'], [/\btos motivos/g, 'los motivos'], [/por ios /g, 'por los '], [/adidónales/g, 'adicionales'], [/¡guales/g, 'iguales'], [/artfculo/g, 'artículo'], [/Presentar una fotografía/g, 'presentar una fotografía'], [/\btas normas/g, 'las normas'], [/subsistencía/g, 'subsistencia'], [/benefíciarios/g, 'beneficiarios'], [/\btas solicitudes/g, 'las solicitudes'], [/de la DE\b/g, 'de la UE'], [/\bai solicitante/g, 'al solicitante'], [/efectuare! tránsito/g, 'efectuar el tránsito'], [/cubrirtodoelj'eríodo de estanda~o tránsito/g, 'cubrir todo el período de estancia o tránsito'], [/Estados m'iembros-,/g, 'Estados miembros,'], [/servidos externos/g, 'servicios externos'], [/Título III?\. Procedimientos[^.]*$/g, ''], [/ Título$/, ''], [/\(CE\) no (?=\d)/g, '(CE) n.º '], [/título Vde/g, 'título V de'], [/capítulo Vdel/g, 'capítulo V del'], [/DO Lde/g, 'DO L de'],
  [/^(Definiciones|Finalidad general del SIS|Sistemas nacionales|Sanciones|Campañas de información del SIS|Información en caso de no ejecución de una descripción|Transferencia de datos personales a terceros|Consulta previa a la concesión o prórroga de un permiso de residencia o un visado para estancia de larga duración|Consulta en caso de respuesta positiva relativa a un nacional de un tercer país titular de un permiso de residencia válido o un visado para estancia de larga duración válido) (?=[A-ZÁÉÍÓÚ])/, ''],
  [/ ?aplicación de las penas\)$/, ''],
];
const SOBRA = /^(ELI: ?http\S+.*|\d{1,2}\/69.*|DO ?L ?de.*|Campañas de información del SIS|Finalidad general del SIS|DISPOSICIONES FINALES|De (la|las|los) [^.:;]*|De las penas, sus clases y efectos|T5\. ?3.*)$/;
for (const o of P) {
  o.cita = o.cita.map(p => { for (const [a, b] of R) p = p.replace(a, b); return p.replace(/ ?ELI: http\S+( \d+\/69)?( DO L ?de ?[\d.]+)?/g, '').replace(/\s{2,}/g, ' ').trim(); }).filter(p => p && !SOBRA.test(p));
  if (!o.cita.length) throw new Error('sin cita ' + o.id);
}
fs.writeFileSync(__dirname + '/parr3.json', JSON.stringify(P));
// avisos: restos de OCR o diagramas
for (const o of P) for (const p of o.cita) { const m = p.match(/[\^_§~{}|¦=]|\w'\w|\?\?|[a-záéíóú][¿¡!]|prefortia|TOMO|Serás|\.\.\.|[a-z]\.[A-Z][a-z]/); if (m) { console.log(o.id, '«' + p.slice(Math.max(0, m.index - 60), m.index + 60) + '»'); break; } }
