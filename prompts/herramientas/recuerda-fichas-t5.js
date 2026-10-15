// Fichas «RECUERDA del temario · R1 a R36» del Tema 5 (págs. 375-380 del PDF subrayado del usuario) + cajas de trampas.
// Se escribe el bloque /* T5_REC */ justo antes de /* T5_RECUERDA. Uso: node prompts/herramientas/recuerda-fichas-t5.js
// Correcciones a mano del usuario en su PDF: R14 y R18 → eu-LISA · R16 → no devolución · R21 → imagen facial.
// Versiones antiguas (se avisa dentro de la ficha): R23/R24 (tasas 80/40 → 90/45), R29-R33 (Eurodac 603/2013, derogado por el 2024/1358).
const fs = require('fs'); const F = 'esquemas.html'; let h = fs.readFileSync(F, 'utf8');
const r = (n, norma, enun, resp, nota) => `<p><b>R${n}</b> · <i>${norma}.</i> ${enun} → <mark class="m-resp">${resp}</mark>${nota ? ' <em>' + nota + '</em>' : ''}</p>`;
const SIS = 'Reglamento (UE) 2018/1861 (SIS)', VIS = 'Reglamento VIS', CV = 'Código de visados (Rgto. 810/2009)', EUR = 'Eurodac (Rgto. 603/2013, derogado)', DEC = 'Decisión 2008/633/JAI (acceso al VIS)', AEC = 'Orden AEC/240/2011';
const grupos = [
  ['Reglamento (UE) 2018/1861 (SIS) — R1 a R9', [
    r(1, SIS, 'El SIS se compondrá de:', 'un sistema central (SIS Central), un sistema nacional (N.SIS) en cada Estado miembro y una infraestructura de comunicación entre la CS-SIS, la copia de seguridad de la CS-SIS y la NI-SIS'),
    r(2, SIS, 'La CS-SIS asegurará una disponibilidad:', 'ininterrumpida'),
    r(3, SIS, 'Las oficinas Sirene llevarán a cabo sus cometidos de manera rápida y eficiente, en particular respondiendo a las solicitudes de información complementaria lo antes posible y, como máximo:', 'doce horas después de su recepción'),
    r(4, SIS, 'Eu-LISA se asegurará, en cooperación con los Estados miembros, de que en el SIS Central se utilice en todo momento la mejor tecnología disponible, con sujeción a:', 'un análisis de costes y beneficios'),
    r(5, SIS, 'La gestión operativa de la CS-SIS no se encomendará a:', 'empresas u organizaciones privadas'),
    r(6, SIS, 'Europol tendrá derecho, cuando sea necesario para cumplir su mandato, a:', 'acceder a los datos del SIS y a consultarlos'),
    r(7, SIS, 'Será el único autorizado para modificar, completar, rectificar, actualizar o suprimir los datos que haya introducido en el SIS:', 'el Estado miembro emisor'),
    r(8, SIS, 'Los datos tratados en el SIS y la correspondiente información complementaria intercambiada con arreglo al presente Reglamento:', 'no se transmitirán ni se pondrán a disposición de terceros países ni de organizaciones internacionales'),
    r(9, SIS, 'Será responsable de supervisar el tratamiento de datos personales por parte de eu-LISA y de asegurarse de que se lleve a cabo conforme al presente Reglamento:', 'el Supervisor Europeo de Protección de Datos')]],
  ['Reglamento VIS — R10 a R18', [
    r(10, VIS, 'Toda autoridad competente autorizada para acceder al VIS de conformidad con el presente Reglamento garantizará que la utilización del VIS es:', 'necesaria, apropiada y proporcionada para cumplir los cometidos de las autoridades competentes'),
    r(11, VIS, 'En el expediente de solicitud también se indicarán los motivos de prórroga del visado, que podrán ser uno o varios de los siguientes:', 'fuerza mayor; motivos humanitarios; razones personales graves', '(el texto consolidado del art. 14.2 añade «razones profesionales graves»: son cuatro motivos)'),
    r(12, VIS, 'Cada expediente de solicitud se almacenará en el VIS durante:', 'cinco años como máximo, sin perjuicio de la supresión a que se refieren los artículos 24 y 25 y de los registros a que se refiere el artículo 34'),
    r(13, VIS, 'Cada Estado miembro informará al Estado o Estados miembros responsables de que el solicitante ha adquirido su nacionalidad:', 'inmediatamente'),
    r(14, VIS, 'La Autoridad de Gestión (hoy eu-LISA) será asimismo responsable de las siguientes funciones relacionadas con la infraestructura de comunicación entre el VIS central y las interfaces nacionales:', 'supervisión; seguridad; coordinación de las relaciones entre los Estados miembros y el proveedor'),
    r(15, VIS, 'El VIS central principal, encargado de la supervisión técnica y de la administración, estará situado en Estrasburgo (Francia), y habrá una copia de seguridad del VIS central capaz de realizar todas las funciones del VIS central en caso de fallo del sistema, en:', 'Sankt Johann im Pongau (Austria)'),
    r(16, VIS, 'Estas transmisiones de datos personales a terceros países u organizaciones internacionales no afectarán a los derechos de los refugiados y de las personas que solicitan una protección a nivel internacional, en particular en relación con el principio de:', 'no devolución', '(corrección a mano del usuario: el impreso decía «no expulsión»; art. 31.3)'),
    r(17, VIS, 'Los Estados miembros adoptarán las medidas necesarias para garantizar que todo abuso de los datos registrados en el VIS sea objeto de sanciones, incluidas las administrativas y penales de conformidad con el Derecho nacional, que serán:', 'efectivas, proporcionadas y disuasorias'),
    r(18, VIS, 'El Supervisor Europeo de Protección de Datos velará por que se lleve a cabo una auditoría de las actividades de tratamiento de datos personales de eu-LISA conforme a normas internacionales de auditoría, al menos:', 'cada cuatro años', '(el art. 42.2 consolidado habla de «normas internacionales de auditoría aplicables»; el período de cuatro años es el del RECUERDA)')]],
  ['Código de visados (Rgto. 810/2009) — R19 a R28', [
    r(19, CV, 'El presente Reglamento establece los procedimientos y las condiciones para la expedición de visados para las estancias previstas en el territorio de los Estados miembros no superiores a:', 'noventa días en cualquier período de 180 días'),
    r(20, CV, 'Corresponderá examinar las solicitudes y decidir al respecto:', 'a los consulados'),
    r(21, CV, 'En el momento de la presentación de la primera solicitud, el solicitante deberá presentarse personalmente. En ese momento se tomarán del solicitante los siguientes identificadores biométricos:', 'una imagen facial tomada en el momento de la solicitud, y sus diez impresiones dactilares, tomadas planas y recogidas digitalmente', '(corrección a mano del usuario: «imagen facial» en lugar de «fotografía escaneada»)'),
    r(22, CV, 'Seguro médico de viaje. La cobertura mínima será de:', '30.000 EUR'),
    r(23, CV, 'El solicitante abonará unas tasas de visado de:', '90 EUR', '(⚠ el RECUERDA impreso dice 80 EUR: versión antigua; art. 16.1 consolidado y Rgto. Delegado 2024/1415: 90 EUR)'),
    r(24, CV, 'Los niños mayores de seis años y menores de doce años pagarán una tasa de visado de:', '45 EUR', '(⚠ el RECUERDA impreso dice 40 EUR: versión antigua; art. 16.2 consolidado: 45 EUR)'),
    r(25, CV, 'No se sellarán los pasaportes:', 'diplomáticos, oficiales o de servicio ni los pasaportes especiales'),
    r(26, CV, 'Un visado podrá expedirse para una, dos o múltiples entradas. El período de validez no será superior a:', 'cinco años'),
    r(27, CV, 'La mera posesión de un visado uniforme o de un visado de validez territorial limitada no conferirá un derecho de:', 'entrada automático'),
    r(28, CV, 'El examen de las solicitudes, las entrevistas que procedan, la decisión sobre las solicitudes y la impresión y fijación de las etiquetas de visado serán competencia:', 'exclusiva del consulado')]],
  ['Eurodac (Rgto. 603/2013, derogado por el 2024/1358) — R29 a R33', [
    r(29, EUR, 'EURODAC constará de:', 'una base central informatizada de datos dactiloscópicos (Sistema Central) y una infraestructura de comunicación entre el Sistema Central y los Estados miembros que proveerá una red virtual cifrada dedicada a los datos de EURODAC (Infraestructura de Comunicación)', '(⚠ versión derogada; el art. 3 del Rgto. 2024/1358 añade la Unidad Central, el sistema de continuidad operativa y el RCDI)'),
    r(30, EUR, 'Cada Estado miembro dispondrá de:', 'un único Punto de Acceso Nacional', '(sigue igual en el art. 3.4 del Rgto. 2024/1358)'),
    r(31, EUR, 'Los Estados miembros designarán a las autoridades que estarán autorizadas a solicitar comparaciones con los datos de Eurodac. Entre las autoridades designadas no se incluirán:', 'las agencias o unidades cuya única competencia sea la inteligencia en relación con la seguridad nacional', '(⚠ versión derogada)'),
    r(32, EUR, 'Los Estados miembros tomarán sin demora las impresiones dactilares de los dedos del solicitante de protección internacional mayor de catorce años y las transmitirán:', 'cuanto antes, y a más tardar en las setenta y dos horas siguientes a la presentación de una solicitud de protección internacional al Sistema Central junto con los datos', '(⚠ versión derogada: el Rgto. 2024/1358, art. 15, fija la edad en SEIS años y 72 horas desde el registro de la solicitud)'),
    r(33, EUR, 'La Agencia establecerá los procedimientos técnicos necesarios que deberán aplicar los Estados miembros para garantizar que el Sistema Central reciba:', 'datos inequívocos', '(art. 37.5 del Rgto. 2024/1358)')]],
  ['Decisión 2008/633/JAI (acceso al VIS) — R34 y R35', [
    r(34, DEC, 'Cada Estado miembro dispondrá de una lista nacional de las unidades encargadas dependientes de las autoridades designadas que estarán autorizadas a acceder directamente al VIS a través:', 'del (de los) punto(s) central(es) de acceso'),
    r(35, DEC, 'El tratamiento de la información obtenida por Europol tras su acceso al VIS estará supeditado al consentimiento del Estado miembro que haya introducido los datos en el VIS. Dicho consentimiento se obtendrá a través de:', 'la unidad nacional de Europol de dicho Estado miembro')]],
  ['Orden AEC/240/2011 — R36', [
    r(36, AEC, 'Se crea la Autoridad Nacional del VIS, cuya titularidad recaerá en:', 'el Director General de Asuntos Consulares y Migratorios, estando su ubicación en la sede de la Dirección General de Asuntos Consulares y Migratorios')]]
];
const linea = (t, ps) => `  + articuloResp(${JSON.stringify('RECUERDA del temario · ' + t)}, [], ${JSON.stringify(ps.join(''))})`;
const bloque = '/* T5_REC */ T5.rec = bloqueTitulo("5.7 — RECUERDA DEL TEMARIO (págs. 375-380 de tu temario: pregunta → respuesta, R1 a R36)")\n' + grupos.map(([t, ps]) => linea(t, ps)).join('\n') + ';\n';
const a = h.indexOf('/* T5_REC */'), b = h.indexOf('/* T5_RECUERDA');
if (b < 0) { console.error('marca /* T5_RECUERDA no encontrada'); process.exit(1); }
h = h.slice(0, a >= 0 && a < b ? a : b) + bloque + h.slice(b);
fs.writeFileSync(F, h); console.log('fichas R escritas: 36 preguntas en', grupos.length, 'fichas');
