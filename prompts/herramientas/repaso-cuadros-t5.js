// Cuadros del Tema 5 rehechos con la forma del temario (recuadros impresos dentro de los artículos del resumen, págs. 7-42 del PDF
// «TEMA 5  BASE DE DATOS-08-08-2026.pdf», leídos como imagen el 12/11/2026) y con tu fosforito. Los usa repaso-hibrido.js (cuadros propios).
// Amarillo y · naranja/rosa d · verde a · azul p · lila c · subrayado rojo k. «man» = nota a boli. Revisadas todas las págs. 7-42 salvo 25 y 27 (texto sin recuadros a la vista).
const { y, d, a, p, c, k, esq, fl, caja, man } = require('./repaso-cuadros-lib.js');
const COL = { o: '#f3d5c2', v: '#d3e8d6', c: '#e3dbf0', n: '#dfe9f5', y: '#f6ecb8' };
const lab = (t, col = 'y') => `<div style="background:${COL[col]};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;border:1px solid rgba(60,70,80,.35);color:#1f2a33"><span style="text-align:center;overflow-wrap:anywhere;font-size:.88em;min-width:0">${t}</span></div>`;
const cel = t => `<div style="padding:6px 9px;border:1px solid rgba(60,70,80,.35);line-height:1.5">${t}</div>`;
const fila = (l, t, col) => `<div style="display:grid;grid-template-columns:170px 1fr;margin:0 0 -1px">${lab(l, col)}${cel(t)}</div>`;
const lis = (...x) => x.map(t => `• ${t}`).join('<br>');
const abc = (...x) => x.map(([l, t]) => `<div style="margin:2px 0"><b>${l})</b> ${t}</div>`).join('');
const cols = (...x) => `<div class="g2s" style="align-items:start;grid-template-columns:repeat(${x.length},1fr)">${x.map(([h, t]) => `<div class="caja"><div style="font-weight:800;margin:0 0 4px">${h}</div>${t}</div>`).join('')}</div>`;
const ex = '<span class="ex">EX</span>';

const out = [];
const add = (antes, html) => out.push({ antes, html });

// ───────── SIS (Reglamento 2018/1861) ─────────
add(/^Artículo 1 — Finalidad general del SIS/, esq('ART. 1 · FINALIDAD GENERAL DEL SIS', '', fila('SISTEMA DE INFORMACIÓN SCHENGEN (SIS) · FINALIDAD', lis(
  'Garantizar un alto nivel de seguridad en el espacio de libertad, seguridad y justicia de la Unión, inclusión del mantenimiento de la seguridad y el orden públicos.',
  'La salvaguardia de la seguridad en el territorio de los Estados miembros.',
  'Garantizar la aplicación de las disposiciones del TFUE relativas a la circulación de personas en sus territorios, con la ayuda de la información transmitida a través de este sistema.'), 'y')));
add(/^Artículo 4 — Arquitectura técnica y funcionamiento del SIS/, esq('ART. 4 · EL SIS SE COMPONDRÁ DE', '', [
  fila(y('UN SISTEMA CENTRAL') + '<br>(SIS CENTRAL)', 'Compuesto por:<br>' + lis(`Una ${d('unidad de apoyo técnico (CS-SIS)')} que contendrá una ${y('base de datos')} y que ${k('incluirá')} una copia de seguridad de la CS-SIS.`, `Una ${d('interfaz nacional uniforme (NI-SIS)')}.`)),
  fila(y('UN SISTEMA NACIONAL (N.SIS) EN CADA ESTADO MIEMBRO'), `Compuesto por los ${a('sistemas de datos nacionales')} que se comunican con el SIS Central, y que ${k('incluirá')} al menos un N.SIS de respaldo nacional o compartido.`),
  fila(y('UNA INFRAESTRUCTURA DE COMUNICACIÓN') + ' ENTRE LA CS-SIS, LA COPIA DE SEGURIDAD DE LA CS-SIS Y LA NI-SIS (=Infraestructura de Comunicación)', `Que proporcione una ${y('red virtual codificada')} dedicada a los datos del SIS y al intercambio de datos entre las ${a('oficinas SIRENE')}.`),
  fila(y('UNA INFRAESTRUCTURA DE COMUNICACIÓN SEGURA'), `ENTRE LA CS-SIS Y LAS INFRAESTRUCTURAS CENTRALES DEL ${y('PEB')}, EL ${y('SCB')} COMPARTIDO Y EL ${y('DIM')}.`)].join('')));
add(/^Artículo 6 — Sistemas nacionales/, esq('ART. 6 · SISTEMAS NACIONALES', '', fila(`${a('LOS ESTADOS MIEMBROS')}<br>${d('SERÁN RESPONSABLES')}`, lis(
  `De la ${d('creación, el funcionamiento, el mantenimiento')} y el ulterior desarrollo de su ${y('N.SIS')} y de conectarlo a la ${y('NI-SIS')}.`,
  `De ${d('garantizar')} la ${p('disponibilidad ininterrumpida')} de los datos del SIS para los usuarios finales.`,
  `De ${d('transmitir')} sus descripciones a través de su ${y('N.SIS')}.`), 'y')));
add(/^Artículo 15 — Gestión operativa/, esq('ART. 15 (1 al 3) · GESTIÓN OPERATIVA · EU-LISA', '', [
  fila(a('EU-LISA'), `${y('Responsable de la gestión operativa del SIS Central')}: ${a('Eu-LISA')} se asegurará, en cooperación con los ${a('Estados miembros')}, de que en el SIS Central se utilice en todo momento la ${y('mejor tecnología disponible')}, con sujeción a un ${p('análisis de costes y beneficios')}.`, 'v'),
  fila(`${d('Responsable')} asimismo de las siguientes funciones relacionadas con la ${y('infraestructura de comunicación')}:`, lis(y('supervisión'), y('seguridad'), `${y('coordinación de las relaciones')} entre los Estados miembros y el ${k('proveedor')}`, y('ejecución del presupuesto'), y('adquisición y renovación'), `cuestiones ${k('contractuales')}`), 'o'),
  fila(`${d('Responsable')} asimismo de las siguientes funciones relacionadas con las ${a('oficinas Sirene')} y la comunicación entre ellas:`, lis(y('coordinación, gestión y apoyo de las actividades de prueba'), `${y('mantenimiento y actualización')} de las especificaciones técnicas relativas al intercambio de información complementaria entre las oficinas Sirene y la infraestructura de comunicación; y`, `gestión del impacto de los cambios ${k('técnicos')} cuando afecten al SIS y al intercambio de información entre las oficinas Sirene.`), 'o')].join('')));
add(/^Artículo 39 — Plazo de revisión de las descripciones/, esq('ART. 37 · EVALUACIÓN DE LA UTILIZACIÓN DEL SIS POR EUROPOL Y LA AGENCIA EUROPEA DE LA GUARDIA DE FRONTERAS Y COSTAS', '', cols(
  [a('LA COMISIÓN'), `${d('Llevará a cabo')} ${p('al menos cada cinco años')} una evaluación del funcionamiento y la utilización del SIS por parte de Europol y de los equipos. ${man('5 años')}`],
  [`${a('EUROPOL')} Y LA ${a('AGENCIA EUROPEA DE LA GUARDIA DE FRONTERAS Y COSTAS')}`, `${d('Garantizarán')} un seguimiento ${k('adecuado')} de las ${y('conclusiones y recomendaciones')} derivadas de la evaluación.`],
  [`${a('PARLAMENTO EUROPEO')} Y ${a('CONSEJO')}`, `Se les enviará ${k('un informe')} sobre los ${y('resultados de la evaluación')} y las consiguientes ${y('medidas')}.`])));

// ───────── VIS (Reglamento 767/2008) ─────────
add(/^Artículo 5 — Categorías de datos/, esq('ART. 5 · CATEGORÍAS DE DATOS (VIS)', '', `${caja(`En el VIS ${k('solo')} se registrarán las categorías de datos siguientes:`)}${cols(
  ['', abc(['a', y('datos alfanuméricos')], ['b', y('imágenes faciales')])],
  ['', abc(['c', y('las impresiones dactilares')], ['c bis', `${y('las copias escaneadas')} de la página de datos personales del documento de viaje`])],
  ['', abc(['d', y('los vínculos con otras solicitudes')])])}`));
add(/^Artículo 24 — Modificación de datos/, esq('ART. 23.1 · PERÍODO DE CONSERVACIÓN DE LOS DATOS ALMACENADOS (VIS)', '', `${caja(`Cada ${d('expediente de solicitud')} se almacenará en el VIS durante ${p('cinco años como máximo')}. Dicho período ${d('comenzará')}:`)}${cols(
  ['', abc(['a', `en la fecha de ${y('expiración del visado')}, del visado para estancia de larga duración o del permiso de residencia, ${d('cuando se haya expedido un visado')}, un visado para estancia de larga duración o un permiso de residencia;`], ['b', `en la nueva fecha de expiración del visado, del visado para estancia de larga duración o del permiso de residencia, cuando se haya ${d('prorrogado o renovado')} un visado, un visado para estancia de larga duración o un permiso de residencia;`])],
  ['', abc(['c', `en la fecha de ${y('creación del expediente')} de solicitud en el VIS, cuando se haya retirado y archivado la solicitud;`], ['d', `en la fecha de la ${y('decisión de la autoridad responsable')} cuando se haya denegado, retirado o anulado un visado, un visado para estancia de larga duración o un permiso de residencia, según proceda.`])])}`));
add(/^Artículo 27 bis — Interoperabilidad/, esq('ART. 26.2 · GESTIÓN OPERATIVA (VIS)', '', `${caja(`${d('Incumbirán')} a ${a('eu-LISA')} las siguientes ${d('funciones')} relacionadas con la infraestructura de comunicación entre el VIS central y las INU:`)}${cols(
  ['', abc(['a', y('la supervisión;')], ['b', y('la seguridad;')], ['c', `la coordinación de las relaciones entre los ${a('Estados miembros')} y el ${y('proveedor;')}`])],
  ['', abc(['d', `las funciones relativas a la ${y('ejecución del presupuesto;')}`], ['e', y('la adquisición y renovación;')], ['f', `las cuestiones ${y('contractuales.')}`])])}${fl}${caja(`Art. 26.7 · Garantizará, en particular, que la delegación ${k('no afecte negativamente')} a ningún ${y('mecanismo de control efectivo')} previsto en el ${d('Derecho comunitario')}, ya corresponda este:<br>• al ${a('Tribunal de Justicia')}; • al ${a('Tribunal de Cuentas')} o • al ${a('Supervisor Europeo de Protección de Datos')}.`)}`));

// ───────── Código de visados (Reglamento 810/2009) ─────────
add(/^Artículo 13 — Identificadores biométricos/, esq('ART. 13.7 · EXENTOS DE FACILITAR SUS IMPRESIONES DACTILARES (CÓDIGO DE VISADOS)', '', `${caja(`Los siguientes solicitantes ${d('quedarán exentos')} de la obligación de facilitar sus impresiones dactilares: ${ex}`)}${cols(
  ['', abc(['a', `${d('menores de seis años')} y personas ${d('mayores de setenta y cinco años')};`], ['b', `personas cuyas impresiones resulte ${y('físicamente imposible tomar')}.`])],
  ['', abc(['c', `${y('Jefes de Estado o de Gobierno')} y miembros del Gobierno nacional, con los cónyuges que les acompañen, y miembros de su delegación oficial cuando estén ${y('invitados oficialmente')} por los Gobiernos de los Estados miembros o por organizaciones internacionales;`], ['d', `${y('soberanos y otros miembros eminentes de una familia real')}, cuando estén invitados oficialmente por los Gobiernos de los Estados miembros o por organizaciones internacionales;`], ['e', `personas que deban comparecer como ${y('testigos')} ante un órgano jurisdiccional internacional en el territorio de los Estados miembros cuya comparecencia en persona para presentar una solicitud les pondría en una ${y('situación de peligro grave')}.`])])}`));
add(/^Artículo 22 — Consulta previa a las autoridades centrales/, esq('ART. 16 · TASAS DE VISADO (CÓDIGO DE VISADOS)', '', `${caja(`4. ${d('Quedarán exentos')} del pago de las tasas de visado los solicitantes que pertenezcan a alguna de las siguientes categorías: ${man('EXENTOS')}`)}${cols(
  ['', abc(['a', `${d('niños menores de seis años')};`], ['b', `${y('estudiantes')} de los distintos ciclos, incluido el postgrado, que efectúen estancias con fines educativos o de formación, y ${y('profesores acompañantes')};`])],
  ['', abc(['c', `${y('investigadores')}, que se desplacen con fines de investigación científica o que participen en conferencias o seminarios científicos;`], ['d', `${y('representantes de organizaciones')} sin ánimo de lucro ${p('de veinticinco años o menos')} y que vayan a participar en seminarios, conferencias o acontecimientos deportivos, culturales o educativos, organizados por organizaciones sin ánimo de lucro.`])])}${fl}${caja(`5. ${d('Podrá eximirse')} del pago de las tasas de visado a: ${man('PODRÁ EXIMIRSE')}`)}${cols(
  ['', abc(['a', `los ${d('niños mayores de seis años y menores de 18 años')};`], ['b', `los titulares de ${y('pasaportes diplomáticos y de servicio')};`])],
  ['', abc(['c', `las personas que vayan a participar en seminarios, conferencias o acontecimientos deportivos, culturales o educativos, organizados por organizaciones sin ánimo de lucro, de edad ${p('igual o inferior a veinticinco años')}. ${man('≤ 25 años')}`])])}`));
add(/^Artículo 25 bis — Cooperación en materia de readmisión/, esq('ART. 24.2 · VISADOS PARA ENTRADAS MÚLTIPLES DE LARGA DURACIÓN', '', `${caja(`Siempre que el solicitante cumpla las condiciones de entrada del artículo 6.1 a), c), d) y e) del Código de fronteras Schengen, los visados para entradas múltiples de larga duración se ${d('expedirán')} con los siguientes períodos de validez: ${ex}`)}${cols(
  [p('a) UN AÑO'), `por un período de validez de ${p('un año')}, siempre que el solicitante haya obtenido y utilizado legalmente ${y('tres visados')} en los ${p('dos años')} anteriores. ${man('3V 2A')}`],
  [p('b) DOS AÑOS'), `por un período de validez de ${p('dos años')}, siempre que el solicitante haya obtenido y utilizado legalmente ${y('un visado para entradas múltiples con una validez de un año')} en los ${p('dos años')} anteriores. ${man('1A 2A')}`],
  [p('c) CINCO AÑOS'), `por un período de validez de ${p('cinco años')}, siempre que el solicitante haya obtenido y utilizado legalmente ${y('un visado para entradas múltiples con una validez de dos años')} en los ${p('tres años')} anteriores. ${man('2A 3A')}`])}`));

// ───────── Eurodac ─────────
add(/^Artículo 3 — Arquitectura del sistema y principios básicos/, esq('ART. 3.1 · EURODAC CONSTARÁ DE', '', cols(
  [`a) ${y('UNA BASE CENTRAL INFORMATIZADA DE DATOS DACTILOSCÓPICOS')} (Sistema Central) compuesta por:`, `i) una ${y('Unidad Central')},<br>ii) un ${y('Plan y un Sistema de Continuidad Operativa')};`],
  [`b) ${y('UNA INFRAESTRUCTURA DE COMUNICACIÓN')}`, `entre el Sistema Central y los Estados miembros que proveerá una ${y('red virtual cifrada')} dedicada a los datos de Eurodac (Infraestructura de Comunicación). ${ex}`])));
add(/^Artículo 5 — Autoridades designadas por los Estados miembros/, esq('ART. 4 (2 y 3) · GESTIÓN OPERATIVA · EURODAC', '', `${caja(`${d('SERÁ RESPONSABLE DE LAS SIGUIENTES FUNCIONES RELACIONADAS CON LA INFRAESTRUCTURA DE COMUNICACIÓN')} ${ex}`, 'cen')}${cols(
  [a('LA AGENCIA'), lis(y('Supervisión'), y('Seguridad'), `${y('Coordinación de las relaciones')} entre Estados miembros y el proveedor`)],
  [a('LA COMISIÓN'), lis(y('Ejecución del presupuesto'), y('Adquisición y renovación'), y('Cuestiones contractuales'))])}`));
add(/^Artículo 7 — Autoridad designada de Europol/, esq('ART. 7 · EUROPOL', '', cols(
  [`${y('UNIDAD ESPECIALIZADA')} ${ex}`, `• ${d('Actúa')} como su ${a('autoridad verificadora')}.`],
  [y('UNIDAD OPERATIVA'), `• Está ${d('autorizada')} a ${y('solicitar comparaciones')}.`])));
add(/^Artículo 52 — Responsabilidad/, esq('ART. 23 (del resumen) · RESPONSABILIDAD EN CUANTO AL TRATAMIENTO DE LOS DATOS (EURODAC)', '', `${caja(`El ${a('Estado miembro de origen')} ${d('responderá')}:`)}${cols(
  ['', abc(['a', `de la ${y('legalidad de la toma de las impresiones dactilares')};`], ['b', `de la ${y('legalidad de la transmisión')} al Sistema Central de los datos dactiloscópicos, así como de los demás datos;`], ['c', `de la ${y('exactitud y actualidad de los datos')} cuando se transmitan al Sistema Central;`])],
  ['', abc(['d', `sin perjuicio de las responsabilidades de la Agencia, de la ${y('legalidad del registro, conservación, rectificación y supresión')} de los datos en el Sistema Central;`], ['e', `de la ${y('legalidad del tratamiento de los resultados de la comparación')} de los datos dactiloscópicos transmitidos por el Sistema Central.`])])}`));

add(/^Artículo 5 — Estado miembro competente para examinar/, esq('ART. 5 · ESTADO MIEMBRO COMPETENTE PARA EXAMINAR Y DECIDIR SOBRE UNA SOLICITUD (CÓDIGO DE VISADOS)', '', `${caja(`1. El ${a('Estado miembro')} competente para ${d('examinar')} y ${d('decidir')} sobre una solicitud de ${d('visado uniforme')} será: ${ex}`)}${cols(
  ['', abc(['a', `el Estado miembro cuyo territorio sea el ${y('único destino de la visita o visitas')};`], ['b', `${y('SI LA VISITA INCLUYE MÁS DE UN DESTINO')}, o si se van a realizar varias visitas ${y('diferentes')} durante un ${p('período de dos meses')}, el Estado miembro cuyo territorio sea, por la duración de la estancia, (…)`])],
  ['', abc(['c', `${y('SI NO PUEDE DETERMINARSE UN DESTINO PRINCIPAL')}, el Estado miembro cuya ${y('frontera exterior')} se proponga cruzar el solicitante para entrar en el territorio de los Estados miembros.`])])}${fl}${caja(`2. El ${a('Estado miembro')} competente para ${d('examinar')} y ${d('decidir')} sobre una solicitud de ${d('VISADO UNIFORME CON FINES DE TRÁNSITO')} será:`)}${cols(
  ['', abc(['a', `en caso de tránsito a través de un ${k('único Estado miembro')}, el Estado miembro de que se trate; o`])],
  ['', abc(['b', `en caso de tránsito a través de ${k('varios Estados miembros')}, el Estado miembro cuya ${y('frontera exterior')} se proponga cruzar el solicitante para iniciar el tránsito.`])])}${fl}${caja(`3. El ${a('Estado miembro')} competente para ${d('examinar')} y ${d('decidir')} sobre una solicitud de ${d('VISADO DE TRÁNSITO AEROPORTUARIO')} será: ${ex}`)}${cols(
  ['', abc(['a', `en caso de un ${k('único tránsito aeroportuario')}, el Estado miembro en cuyo territorio esté situado el aeropuerto de tránsito; o`])],
  ['', abc(['b', `en caso de un ${k('tránsito aeroportuario doble o múltiple')}, el Estado miembro en cuyo territorio esté situado el ${y('primer aeropuerto de tránsito')}.`])])}`));
add(/^Artículo 35 — Visados solicitados en la frontera exterior/, esq('ART. 35.1 · VISADOS SOLICITADOS EN LA FRONTERA EXTERIOR (CÓDIGO DE VISADOS)', '', `${caja(`${d('En casos excepcionales')}, se podrá expedir un ${d('visado en un paso fronterizo')}, siempre que se cumplan las ${d('condiciones siguientes')}: ${ex}`)}${cols(
  ['', abc(['a', `el solicitante ${d('cumple las condiciones')} establecidas en el Código de fronteras Schengen;`])],
  ['', abc(['b', `el solicitante ${k('no')} ha podido solicitar un visado con antelación y presenta, si se le solicita, ${y('documentos justificativos')} que demuestren la existencia de ${y('razones imprevisibles e imperiosas')} para la entrada, y;`])],
  ['', abc(['c', `se considera ${d('garantizado el retorno')} del solicitante a su país de origen o de residencia, o su tránsito por países que ${k('no')} sean Estados miembros que apliquen plenamente el acervo de Schengen.`])])}`));

module.exports = { soloPropios: true, cuadros: out };
