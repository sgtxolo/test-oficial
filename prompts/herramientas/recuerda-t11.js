// Inserta en el esquema del Tema 11 las 55 fichas «RECUERDA» (R1 a R55) del temario de Prefortia (pregunta → respuesta),
// transcritas de las páginas 317-325 del temario escaneado. Uso: node prompts/herramientas/recuerda-t11.js
const fs = require('fs');
const G = [
 ['LO 3/2018 — R1 a R11', 'LO de protección de datos personales', [
  ['R1', 'El tratamiento de los datos personales de un menor de edad únicamente podrá fundarse en su consentimiento cuando sea mayor:', 'de catorce años.'],
  ['R2', 'La prueba del cumplimiento del deber de responder a la solicitud de ejercicio de sus derechos formulado por el afectado recaerá sobre:', 'el responsable.'],
  ['R3', 'El derecho de acceso se entenderá otorgado si el responsable del tratamiento facilitara al afectado un sistema de acceso:', 'remoto, directo y seguro a los datos personales que garantice, de modo permanente, el acceso a su totalidad.'],
  ['R4', 'Las personas físicas o jurídicas, públicas o privadas, podrán llevar a cabo el tratamiento de imágenes a través de sistemas de cámaras o videocámaras con la finalidad de preservar la seguridad de:', 'las personas y bienes, así como de sus instalaciones.'],
  ['R5', 'Determinará si, cuando finalice la prestación de los servicios del encargado, los datos personales deben ser destruidos, devueltos al responsable o entregados, en su caso, a un nuevo encargado:', 'responsable del tratamiento.'],
  ['R6', 'Podrá conservar, debidamente bloqueados, los datos en tanto pudieran derivarse responsabilidades de su relación con el responsable del tratamiento:', 'encargado del tratamiento.'],
  ['R7', 'Los códigos de conducta serán aprobados por:', 'la Agencia Española de Protección de Datos o, en su caso, por la autoridad autonómica de protección de datos competente.'],
  ['R8', 'La Agencia Española de Protección de Datos tendrá la condición de representante común de las autoridades de protección de datos del Reino de España en:', 'el Comité Europeo de Protección de Datos.'],
  ['R9', 'La Agencia Española de Protección de Datos inadmitirá las reclamaciones presentadas cuando:', 'no versen sobre cuestiones de protección de datos personales, carezcan manifiestamente de fundamento, sean abusivas o no aporten indicios racionales de la existencia de una infracción.'],
  ['R10', 'El plazo de prescripción de las sanciones comenzará a contarse desde:', 'el día siguiente a aquel en que sea ejecutable la resolución por la que se impone la sanción o haya transcurrido el plazo para recurrirla.'],
  ['R11', 'Todos tienen derecho a acceder a Internet independientemente de su condición:', 'personal, social, económica o geográfica.']]],
 ['Ley 39/2015 — R12 a R35', 'Ley del Procedimiento Administrativo Común', [
  ['R12', 'Cuando resulte eficaz, proporcionado y necesario para la consecución de los fines propios del procedimiento, y de manera motivada podrán incluirse trámites adicionales o distintos a los contemplados en esta Ley:', 'solo mediante ley.'],
  ['R13', 'La falta o insuficiente acreditación de la representación no impedirá que se tenga por realizado el acto de que se trate, siempre que se aporte aquélla o se subsane el defecto dentro del plazo de:', 'diez días que deberá conceder al efecto el órgano administrativo, o de un plazo superior cuando las circunstancias del caso así lo requieran.'],
  ['R14', 'Los poderes inscritos en el registro tendrán una validez determinada máxima de:', 'cinco años a contar desde la fecha de inscripción.'],
  ['R15', 'Las Administraciones Públicas sólo requerirán a los interesados el uso obligatorio de firma para:', 'formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones, renunciar a derechos.'],
  ['R16', 'La comparecencia de las personas ante las oficinas públicas, ya sea presencialmente o por medios electrónicos, sólo será obligatoria:', 'cuando así esté previsto en una norma con rango de ley.'],
  ['R17', 'El plazo máximo en el que debe notificarse la resolución expresa será:', 'el fijado por la norma reguladora del correspondiente procedimiento.'],
  ['R18', 'Obligación de resolver. Este plazo no podrá exceder de seis meses salvo:', 'que una norma con rango de Ley establezca uno mayor o así venga previsto en el Derecho de la Unión Europea.'],
  ['R19', 'La estimación por silencio administrativo tiene a todos los efectos:', 'la consideración de acto administrativo finalizador del procedimiento.'],
  ['R20', 'La desestimación por silencio administrativo tiene los solos efectos de:', 'permitir a los interesados la interposición del recurso administrativo o contencioso-administrativo que resulte procedente.'],
  ['R21', 'En los supuestos en los que el procedimiento se hubiera paralizado por causa imputable al interesado:', 'se interrumpirá el cómputo del plazo para resolver y notificar la resolución.'],
  ['R22', 'Siempre que por Ley o en el Derecho de la Unión Europea no se exprese otro cómputo, cuando los plazos se señalen por días, se entiende que éstos son:', 'hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos.'],
  ['R23', 'Los actos de las Administraciones Públicas sujetos al Derecho Administrativo:', 'se presumirán válidos y producirán efectos desde la fecha en que se dicten, salvo que en ellos se disponga otra cosa.'],
  ['R24', 'Toda notificación deberá ser cursada dentro del plazo de:', 'diez días a partir de la fecha en que el acto haya sido dictado.'],
  ['R25', 'Los procedimientos podrán iniciarse:', 'de oficio o a solicitud del interesado.'],
  ['R26', 'El procedimiento sometido al principio de celeridad, se impulsará de oficio en todos sus trámites y a través de medios electrónicos, respetando los principios:', 'de transparencia y publicidad.'],
  ['R27', 'Cuando la Administración no tenga por ciertos los hechos alegados por los interesados o la naturaleza del procedimiento lo exija, el instructor del mismo acordará la apertura de un período de prueba por un plazo:', 'no superior a treinta días ni inferior a diez, a fin de que puedan practicarse cuantas juzgue pertinentes.'],
  ['R28', 'Salvo disposición expresa en contrario, los informes serán:', 'facultativos y no vinculantes.'],
  ['R29', 'Los interesados podrán alegar y presentar los documentos y justificaciones que estimen pertinentes:', 'en un plazo no inferior a diez días ni superior a quince.'],
  ['R30', 'En los procedimientos iniciados a solicitud del interesado, cuando se produzca su paralización por causa imputable al mismo, la Administración le advertirá que, transcurridos tres meses, se producirá:', 'la caducidad del procedimiento.'],
  ['R31', 'Límites de la revisión. Las facultades de revisión establecidas en este Capítulo, no podrán ser ejercidas cuando por prescripción de acciones, por el tiempo transcurrido o por otras circunstancias, su ejercicio resulte contrario a:', 'la equidad, a la buena fe, al derecho de los particulares o a las leyes.'],
  ['R32', 'Las resoluciones y actos a que se refiere el artículo 112.1, cuando no pongan fin a la vía administrativa, podrán ser recurridos:', 'en alzada ante el órgano superior jerárquico del que los dictó.'],
  ['R33', 'Los actos administrativos que pongan fin a la vía administrativa podrán ser recurridos:', 'potestativamente en reposición ante el mismo órgano que los hubiera dictado o ser impugnados directamente ante el orden jurisdiccional contencioso-administrativo.'],
  ['R34', 'Transcurrido el plazo de tres meses desde la interposición del recurso extraordinario de revisión sin haberse dictado y notificado la resolución, se entenderá:', 'desestimado, quedando expedita la vía jurisdiccional contencioso-administrativa.'],
  ['R35', 'En el ejercicio de la iniciativa legislativa y la potestad reglamentaria, las Administraciones Públicas actuarán de acuerdo con los principios de:', 'necesidad, eficacia, proporcionalidad, seguridad jurídica, transparencia, y eficiencia.']]],
 ['Ley 40/2015 — R36 a R48', 'Ley de Régimen Jurídico del Sector Público', [
  ['R36', 'Las Administraciones Públicas sirven con objetividad los intereses generales y actúan de acuerdo con los principios de:', 'eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la Constitución, a la Ley y al Derecho.'],
  ['R37', 'Los órganos administrativos podrán dirigir las actividades de sus órganos jerárquicamente dependientes mediante:', 'instrucciones y órdenes de servicio.'],
  ['R38', 'No suponen alteración de la titularidad de la competencia, aunque sí de los elementos determinantes de su ejercicio que en cada caso se prevén:', 'la delegación de competencias, las encomiendas de gestión, la delegación de firma y la suplencia.'],
  ['R39', 'De los órganos colegiados en la Administración General del Estado. Los miembros que discrepen del acuerdo mayoritario podrán formular voto particular por escrito en el plazo de:', 'dos días, que se incorporará al texto aprobado.'],
  ['R40', 'Principios de la responsabilidad. En todo caso, el daño alegado habrá de ser:', 'efectivo, evaluable económicamente e individualizado con relación a una persona o grupo de personas.'],
  ['R41', 'Cada Administración Pública determinará las condiciones e instrumentos de creación de las sedes electrónicas, con sujeción a los principios de:', 'transparencia, publicidad, responsabilidad, calidad, seguridad, disponibilidad, accesibilidad, neutralidad e interoperabilidad.'],
  ['R42', 'La organización de la Administración General del Estado responde a los principios de:', 'división funcional en Departamentos ministeriales y de gestión territorial integrada en Delegaciones del Gobierno en las Comunidades Autónomas, salvo las excepciones previstas por esta Ley.'],
  ['R43', 'Son directamente responsables de la ejecución de la acción del Gobierno en un sector de actividad específica:', 'los Secretarios de Estado.'],
  ['R44', 'Las Delegaciones del Gobierno están adscritas orgánicamente:', 'al Ministerio de Hacienda y Administraciones Públicas.'],
  ['R45', 'Los Delegados del Gobierno serán nombrados y separados por:', 'Real Decreto del Consejo de Ministros, a propuesta del Presidente del Gobierno.'],
  ['R46', 'La formalización de relaciones de cooperación requerirá:', 'la aceptación expresa de las partes, formulada en acuerdos de órganos de cooperación o en convenios.'],
  ['R47', 'Las Conferencias Sectoriales pueden ejercer funciones:', 'consultivas, decisorias o de coordinación orientadas a alcanzar acuerdos sobre materias comunes.'],
  ['R48', 'Las decisiones adoptadas por las Comisiones Bilaterales de Cooperación revestirán la forma de:', 'acuerdos y serán de obligado cumplimiento, cuando así se prevea expresamente, para las dos Administraciones que lo suscriban y en ese caso serán exigibles conforme a lo establecido en la Ley 29/1998, de 13 de julio.']]],
 ['Ley 19/2013 — R49 a R53', 'Ley de transparencia', [
  ['R49', 'La información sujeta a las obligaciones de transparencia será publicada en las correspondientes sedes electrónicas o páginas web y de una manera clara, estructurada y entendible para los interesados y, preferiblemente:', 'en formatos reutilizables.'],
  ['R50', 'La aplicación de los límites será justificada y proporcionada a su objeto y finalidad de protección y atenderá a las circunstancias del caso concreto, especialmente a la concurrencia de:', 'un interés público o privado superior que justifique el acceso.'],
  ['R51', 'Si la información solicitada pudiera afectar a derechos o intereses de terceros debidamente identificados, se les concederá un plazo de:', 'quince días para que puedan realizar las alegaciones que estimen oportunas.'],
  ['R52', 'Frente a toda resolución expresa o presunta en materia de acceso podrá interponerse una reclamación ante:', 'el Consejo de Transparencia y Buen Gobierno, con carácter potestativo y previo a su impugnación en vía contencioso-administrativa.'],
  ['R53', 'El Consejo de Transparencia y Buen Gobierno tiene:', 'personalidad jurídica propia y plena capacidad de obrar.']]],
 ['RD 179/2005 — R54 y R55', 'RD sobre prevención de riesgos laborales en la G.C.', [
  ['R54', 'Garantizará una adecuada vigilancia de la salud de sus miembros en función de los riesgos profesionales a los que estén expuestos:', 'la Dirección General de la Guardia Civil.'],
  ['R55', 'En la Dirección General de la Guardia Civil se constituirán los siguientes órganos de prevención:', 'Servicio de Prevención; Sección de Prevención de Zona; Oficina de Prevención de Comandancia; Otras unidades.']]],
];
const esc = h => JSON.stringify(h);
const bloques = G.map(([cab, norma, items]) => {
  const html = items.map(([r, q, a]) => `<p><b>${r}</b> · <i>${norma}.</i> ${q} <b>→</b> <mark class="m-resp">${a}</mark></p>`).join('');
  return `  + articuloResp(${esc('RECUERDA del temario · ' + cab)}, [], ${esc(html)})`;
});
const code = '/* T11_REC */ T11.rec = bloqueTitulo("RECUERDA DEL TEMARIO — fichas R1 a R55 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario")\n' + bloques.join('\n') + ';\n';
let s = fs.readFileSync('esquemas.html', 'utf8');
s = s.replace(/\/\* T11_REC \*\/ T11\.rec = [\s\S]*?;\n(?=\/\* T11_RECUERDA)/, '');
s = s.replace('/* T11_RECUERDA + ensamblaje */', code + '/* T11_RECUERDA + ensamblaje */');
if (!s.includes('+ T11.rd + T11.rec')) s = s.replace('+ T11.rd\n', '+ T11.rd + T11.rec\n');
fs.writeFileSync('esquemas.html', s);
console.log('fichas RECUERDA:', G.reduce((n, g) => n + g[2].length, 0), s.includes('T11.rd + T11.rec') ? 'ensamblado' : 'NO ensamblado');
