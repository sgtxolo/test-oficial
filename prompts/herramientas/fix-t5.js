// Tema 5 · revisión de las preguntas OFICIALES contra el temario (16/10/2026).
// Uso: node prompts/herramientas/fix-t5.js [--dry]
//  1) corrige las oficiales con fallos (respuesta mal marcada, opción con dato erróneo, dos opciones defendibles)
//  2) pone en las oficiales sin cita la corrección con formato: respuesta · artículo en morado · cita literal en rojo · explicación
//     La cita se toma del temario: oficial (SIS, Eurodac, 977/2011, Orden AEC), consolidado del esquema (VIS y Código de
//     visados reformados) o, si no hay otra, del OCR del temario subrayado del usuario. Las que ya tenían cita roja no se tocan.
const fs = require('fs');
const FILE = 'test-oficial-conocimiento.html', BS = String.fromCharCode(92), L = 'ABCD', D = 'prompts/temario-limpio/tema5/';
const dry = process.argv.includes('--dry');
const NOM = { sis: 'Reglamento (UE) 2018/1861', vis: 'Reglamento (CE) n.º 767/2008 (VIS)', cv: 'Reglamento (CE) n.º 810/2009 (Código de visados)', eur: 'Reglamento (UE) 2024/1358 (Eurodac)', aec: 'Orden AEC/240/2011', r977: 'Reglamento (UE) n.º 977/2011' };
const RANGO = { sis: [1, 42], vis: [43, 64], cv: [65, 154], r977: [123, 124], eur: [155, 223], aec: [224, 233] };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
// corpus
const pag = {}; fs.readFileSync(D + 'oficial-paginas.txt', 'utf8').replace(/\r/g, '').replace(/\n[ \t]*Art[ií]culo \d+[^\n]{0,20}\n[^\n.]{0,120}\n/g, '\n. \n').replace(/\n[ \t]*(CAP[IÍ]TULO|T[IÍ]TULO|SECCI[OÓ]N)[^\n]*\n([A-ZÁÉÍÓÚÑ ,]{4,}\n)?/g, '\n. \n').split(/=====PAG (\d+)=====\n?/).slice(1).forEach((v, i, a) => { if (i % 2 === 0) pag[+v] = a[i + 1]; });
const plano = t => t.replace(/­\s*/g, '').replace(/(\w)-\n(\w)/g, '$1$2').replace(/\s+/g, ' ');
const OFI = k => { const [a, b] = RANGO[k]; let t = ''; for (let p = a; p <= b; p++) t += ' ' + (pag[p] || ''); return plano(t); };
const CONSB = {};
{ let k = null; for (const l of fs.readFileSync(D + 'consolidado.txt', 'utf8').replace(/\r/g, '').split('\n')) {
  const m = l.match(/^#### 5\.(\d)/); if (m) { k = ['', 'sis', 'vis', 'cv', 'r977', 'eur', 'aec'][+m[1]]; continue; }
  if (/^#/.test(l)) { if (k) CONSB[k] = (CONSB[k] || '') + '\n. \n'; continue; }
  if (k) CONSB[k] = (CONSB[k] || '') + l + '\n'; }
  for (const x in CONSB) CONSB[x] = plano(CONSB[x]); }
const CONS = k => CONSB[k] || '';
const ESCA = plano(fs.readFileSync(D + 'escaneado-paginas.txt', 'utf8').replace(/=====PAG \d+=====/g, ' '));
const fuentes = k => (k === 'vis' || k === 'cv') ? [CONS(k), k === 'cv' ? plano([...Array(30)].map((_, i) => pag[125 + i] || '').join(' ')) : '', OFI(k), ESCA] : [OFI(k), CONS(k), ESCA];
function frase(t, i, len) {
  let a = i; while (a > 0 && !/[.;:]\s$/.test(t.slice(a - 2, a)) && !/(^|\s)(\d+\.|[a-z]\)|\(\d+\))\s$/.test(t.slice(Math.max(0, a - 6), a)) && i - a < 600) a--;
  let b = i + len; while (b < t.length && !/[.;]/.test(t[b]) && b - i < 600) b++;
  let s = t.slice(a, b).trim();
  // fuera los «(…)» del esquema: solo el trozo que contiene la coincidencia
  if (s.includes('(…)')) { const off = i - a; let ini = 0; for (const p of s.split('(…)')) { if (off >= ini && off < ini + p.length + 3) { s = p; break; } ini += p.length + 3; } }
  s = s.replace(/^[\s,.;:)\]]+|[\s,;:(\[]+$/g, '').replace(/^(\d+\.|\d+\)|[a-z]\)|\(\d+\))\s+/, '').replace(/^Definiciones\s+(\d+\)\s+)?/, '').replace(/^\. /, '');
  if (s.length > 600) { const o = Math.max(0, (i - a) - 250); s = s.slice(o, o + 600); if (o > 0) s = s.replace(/^\S*\s/, ''); s = s.replace(/\s\S*$/, ''); }
  return s;
}
function cita(k, anc) {
  const re = new RegExp(anc, 'i');
  for (const t of fuentes(k)) { if (!t) continue; const m = re.exec(t); if (m) return { t: frase(t, m.index, m[0].length), ocr: t === ESCA }; }
  return null;
}
// id → [norma, artículo, ancla (regex) | null, cita manual]
const C = {
  '5-1': ['sis', '39.2', 'revisará la necesidad de conservar una descripción en el SIS'], '5-15': 0, '5-46': 0, '5-65': 0, '5-103': 0, '5-139': 0, '5-263': 0,
  '5-2': ['sis', '40', 'haya sido revocada o anulada por la autoridad'],
  '5-3': ['cv', '9.1', 'no se presentarán más de seis meses antes'], '5-259': 0,
  '5-4': ['cv', '9.2', 'La cita tendrá lugar, por regla general'], '5-48': 0, '5-67': 0,
  '5-5': ['cv', '23.1', 'se tomará en el plazo de 15 días naturales'],
  '5-6': ['cv', '1.1', 'no superiores a noventa días en cualquier período de 180 días'], '5-56': 0, '5-69': 0, '5-88': 0,
  '5-7': ['vis', '1', 'Establece las condiciones y los procedimientos de intercambio de datos'],
  '5-8': ['vis', '6.1', 'estará reservado exclusivamente al personal debidamente autorizado'],
  '5-9': ['vis', '14.2', 'motivos de prórroga del visado'], '5-293': 0,
  '5-10': ['vis', '23.1', 'durante cinco años como máximo'],
  '5-11': ['aec', '2', 'bajo la dependencia directa de la Subsecretaría'], '5-54': 0, '5-89': 0, '5-158': 0, '5-302': 0, '5-111': 0,
  '5-12': ['sis', '51.2', 'El Reglamento \\(UE\\) 2016/679 será aplicable al tratamiento de datos personales realizado en el marco'],
  '5-13': ['sis', '59', 'toda utilización indebida de los datos del SIS'],
  '5-14': ['sis', 'cons. 43', 'deben supervisar la legalidad del tratamiento de datos personales por los Estados miembros'],
  '5-16': ['sis', '39.5', 'Las descripciones se suprimirán automáticamente una vez'],
  '5-19': ['sis', '35.5', 'no conectar las partes del SIS a las que acceda'],
  '5-20': ['sis', '37.1', 'al menos cada cinco años una evaluación'],
  '5-21': ['vis', '19.1', 'Únicamente a efectos de comprobar la identidad del titular del visado'], '5-60': 0,
  '5-25': ['sis', '41.3', 'solo podrán conservarse durante 48 horas'],
  '5-26': ['eur', '15.2', 'cuando no sea posible tomar los datos biométricos de un solicitante'], '5-313': 0,
  '5-27': ['cv', '2.4', '«visado de validez territorial limitada»'], '5-275': 0,
  '5-33': ['vis', '2', 'mejorar la aplicación de la política común de visados, la cooperación consular'], '5-72': 0, '5-170': 0, '5-264': 0,
  '5-34': ['cv', '24.2', 'por un período de validez de cinco años'], '5-73': 0,
  '5-35': ['vis', '9', 'introducirá en el expediente de solicitud los datos siguientes'],
  '5-36': ['sis', '18', 'el historial de la descripción, la fecha y hora de la actividad'],
  '5-37': ['cv', '39.2', 'respetará plenamente la dignidad humana'], '5-95': 0, '5-296': 0,
  '5-38': ['eur', '48.3', 'informarán a eu-LISA de los incidentes de seguridad'], '5-292': 0,
  '5-40': ['cv', '5.1', 'si no puede determinarse un destino principal'],
  '5-41': ['eur', '4.4', 'será responsable de todas las funciones relacionadas con la Infraestructura de Comunicación distintas'], '5-201': 0, '5-289': 0, '5-309': 0,
  '5-42': ['cv', '8', 'notificará a la Comisión los acuerdos de representación'],
  '5-43': ['sis', '7.2', 'denominada «oficina Sirene»'],
  '5-45': ['aec', '4', 'Determinación de las Autoridades Designadas'],
  '5-47': ['sis', '12.1', 'queden registrados en su N.SIS'], '5-294': 0,
  '5-52': ['cv', '27.2', 'en la sección de «observaciones»'], '5-215': 0, '5-284': 0,
  '5-53': ['vis', '8.4', 'creará un expediente de solicitud para cada solicitante'], '5-116': 0,
  '5-55': ['sis', '58.3', 'se regirán por el Derecho nacional de dicho Estado miembro'],
  '5-62': ['sis', '10.1', 'un plan de continuidad de las actividades'],
  '5-64': ['eur', '55', 'sufragará los costes de creación y de funcionamiento de Eurodac'],
  '5-74': ['aec', '4', 'Verificación de la correcta conexión'], '5-234': 0,
  '5-75': ['sis', '14.3', 'cursos de formación comunes'],
  '5-79': ['cv', '15.3', 'La cobertura mínima será de 30 000'],
  '5-80': ['eur', '4.1', 'responsable de la gestión operativa de Eurodac'], '5-311': 0,
  '5-81': ['sis', '35.4', 'estará sujeto al consentimiento del Estado miembro emisor'],
  '5-82': ['sis', '39.5', 'con una antelación de cuatro meses'],
  '5-83': ['sis', '2.1', 'establece las condiciones y los procedimientos para la introducción en el SIS'],
  '5-84': ['cv', '11', 'El impreso estará disponible, como mínimo, en las lenguas'],
  '5-85': ['cv', '3.5', 'estarán exentas del requisito de posesión del visado de tránsito aeroportuario'],
  '5-86': ['eur', '46.2', 'anualmente una auditoría del tratamiento de datos personales'],
  '5-87': ['cv', '4.1', 'Corresponderá a los consulados examinar'],
  '5-91': ['vis', '15.2', 'efectuar búsquedas con uno o más datos'], '5-156': 0,
  '5-93': ['sis', '4.1', 'El SIS se compondrá de'], '5-163': 0, '5-301': 0,
  '5-94': ['vis', '28.4', 'serán responsables: a\\) del desarrollo'], '5-225': 0, '5-260': 0,
  '5-97': ['vis', '4.9', '«verificación», el proceso'], '5-133': 0, '5-121': 0,
  '5-98': ['sis', '48.4', 'cuando exista una necesidad operativa'], '5-134': 0, '5-213': 0, '5-307': 0,
  '5-102': ['vis', '12.1', 'información sobre la situación del expediente, con la indicación de que se ha denegado el visado|que se ha denegado el visado'], '5-138': 0,
  '5-104': ['sis', '55.2', 'auditoría de las operaciones de tratamiento de datos en los N.SIS'],
  '5-105': ['eur', '4.3', 'será responsable de las siguientes funciones relacionadas con la Infraestructura de Comunicación'],
  '5-106': ['eur', '41.4', 'un plazo de un año desde el vencimiento'],
  '5-107': ['vis', '45', 'los aspectos técnicos que tengan incidencia en la protección de los datos personales'],
  '5-108': ['vis', '26', 'mantener el VIS en funcionamiento durante las 24 horas|mantener el sistema en funcionamiento durante las 24 horas'],
  '5-110': ['cv', '34.1', 'El visado se anulará si se pone de manifiesto'], '5-146': 0,
  '5-113': ['eur', '2.1.k', '«Punto de Acceso Nacional»'], '5-310': 0,
  '5-117': ['sis', '3.15', '«imagen facial»: las imágenes digitales'],
  '5-118': ['eur', '41.3', 'tres días laborables'],
  '5-119': ['sis', '5.1', 'Los costes de funcionamiento, mantenimiento y ulterior desarrollo del SIS Central'],
  '5-120': ['cv', '22.1', 'Por motivos de amenaza para el orden público, la seguridad interior'],
  '5-122': ['vis', '36', 'serán efectivas, proporcionadas y disuasorias'],
  '5-124': ['sis', '56.2', 'Al menos cada cuatro años, el Supervisor Europeo'],
  '5-125': ['eur', '48.2', 'proteger los datos físicamente, entre otras cosas mediante la elaboración de planes de emergencia'],
  '5-126': ['sis', '39.7', 'quince días naturales desde la recepción'],
  '5-127': ['cv', '2.12', '«marino»'], '5-210': 0,
  '5-129': ['vis', '30.1', 'solo cuando sea necesario y en casos concretos'], '5-232': 0,
  '5-130': ['cv', '45', 'inspecciones aleatorias regulares'],
  '5-131': ['cv', '13.2', 'sus diez impresiones dactilares, tomadas planas'],
  '5-132': ['sis', '48.5', 'a fin de establecer y desarrollar las normas técnicas necesarias para la conexión'],
  '5-154': ['vis', '22 bis', 'en el caso de menores, nombre y apellidos del titular de la patria potestad'],
  '5-155': ['eur', '52.1', 'tendrá derecho a indemnización por parte del Estado miembro responsable'], '5-314': 0,
  '5-157': ['eur', '5.1', 'Las autoridades designadas serán autoridades de los Estados miembros responsables'], '5-291': 0,
  '5-160': ['eur', '22.1', 'Cada Estado miembro tomará sin demora'],
  '5-161': ['sis', '3.2', '«información complementaria»: información que no forma parte'], '5-283': 0, '5-299': 0,
  '5-164': ['cv', '5.2', 'en caso de tránsito a través de varios Estados miembros'],
  '5-166': ['aec', '4', 'Supervisión del VIS de acuerdo con los artículos 35'], '5-195': 0, '5-303': 0,
  '5-167': ['vis', '36', 'todo abuso de los datos registrados en el VIS'],
  '5-169': ['vis', '27', null, 'El VIS central principal, encargado de la supervisión técnica y de la administración, estará situado en Estrasburgo (Francia), y habrá una copia de seguridad del VIS central, capaz de realizar todas las funciones del VIS central en caso de fallo del sistema, en Sankt Johann im Pongau (Austria)'], '5-305': 0,
  '5-175': ['eur', '17.1', 'se registrarán exclusivamente los datos siguientes'],
  '5-176': ['cv', '16.6', 'En determinados casos, el importe de las tasas de visado podrá reducirse'], '5-230': 0,
  '5-177': ['vis', '33.2', 'Si el incumplimiento por un Estado miembro de las obligaciones'],
  '5-178': ['eur', '45.2', 'se asegurará de que, al menos cada tres años'], '5-308': 0, '5-304': ['eur', '45.2', 'El informe de las auditorías se enviará'],
  '5-179': ['vis', '2 bis.1', null, 'El VIS se basará en una arquitectura centralizada y consistirá en: a) el registro común de datos de identidad (RCDI) establecido por el artículo 17, apartado 1, del Reglamento (UE) 2019/817; b) un sistema de información central (el «sistema central del VIS»); c) interfaces nacionales uniformes (INU) en cada Estado miembro'],
  '5-180': ['aec', '4', 'cuya titularidad recaerá en el Director General'], '5-197': 0,
  '5-181': ['cv', '12', 'haberse expedido en los diez años anteriores|expedido en los diez años anteriores'], '5-198': 0, '5-218': 0, '5-249': 0, '5-288': 0,
  '5-183': ['vis', '5.1', 'En el VIS solo se registrarán las categorías de datos'],
  '5-184': ['sis', '10.1', 'impedir que los soportes de datos puedan ser leídos'],
  '5-186': ['eur', '48.2.n', 'detectar automáticamente en el plazo de 24 horas'], '5-312': 0,
  '5-187': ['vis', '4.8', '«Estado miembro responsable», el Estado miembro que ha introducido'], '5-281': 0,
  '5-188': ['vis', '9 duodecies.6', 'adoptará su reglamento interno en su primera reunión'],
  '5-189': ['cv', '33.5', 'notificarán a la Comisión quiénes son las autoridades competentes para realizar la prórroga'], '5-247': 0,
  '5-196': ['sis', '57.4', 'enviará anualmente al Parlamento Europeo, al Consejo y a la Comisión un informe conjunto'],
  '5-199': ['vis', '9 terdecies', 'Se reunirá cuando sea necesario y al menos dos veces al año'], '5-238': 0,
  '5-204': ['sis', '35.1', 'Europol también podrá intercambiar y solicitar información complementaria'],
  '5-207': ['cv', '57.1', null, 'La Comisión presentará una evaluación global de la aplicación del presente Reglamento transcurridos dos años desde que todas sus disposiciones sean aplicables'],
  '5-208': ['vis', '7.1', 'garantizará que la utilización del VIS es necesaria, apropiada y proporcionada'], '5-243': 0,
  '5-209': ['cv', '24.1', 'El período de validez no será superior a cinco años'],
  '5-211': ['aec', '4', 'Designación de los puntos centrales'],
  '5-212': ['sis', '60.3', 'estadísticas diarias, mensuales y anuales'],
  '5-214': ['sis', '16', 'La Comisión informará de inmediato al Parlamento Europeo y al Consejo sobre los incidentes graves'],
  '5-217': ['eur', '59', 'contrario a la finalidad de Eurodac'], '5-306': 0,
  '5-224': ['vis', '9 duodecies.2', 'consultará al Consejo de Detección del VIS'],
  '5-236': ['sis', 'cons. 1', 'acervo de Schengen integrado en el marco de la Unión Europea'],
  '5-239': ['sis', 'cons. 5', 'consista en dos instrumentos separados'],
  '5-240': ['sis', '3.11', '«Estado miembro de ejecución»'],
  '5-241': ['sis', 'cons. 6', 'Es necesario especificar los objetivos del SIS'],
  '5-244': ['cv', '2.3', '«visado uniforme»: el visado válido para todo el territorio'],
  '5-253': ['vis', '22 terdecies.2', null, 'Cada Estado miembro dispondrá de una lista de sus autoridades designadas y la comunicará a la Comisión y a eu-LISA'],
  '5-254': ['sis', '1', 'El SIS tiene por finalidad garantizar un alto nivel de seguridad'],
  '5-255': ['sis', '44.1', 'será el único autorizado para modificar, completar'], '5-270': 0,
  '5-261': ['vis', '4.11', '«datos alfanuméricos», los datos representados'],
  '5-269': ['sis', '24.1', 'introducirán una descripción para la denegación de entrada y estancia cuando'], '5-279': 0,
  '5-271': ['vis', '23.1', 'en la fecha de expiración del visado'],
  '5-274': ['cv', '12', 'dos páginas en blanco'], '5-282': ['cv', '12', 'al menos hasta tres meses después de la fecha prevista de salida'],
  '5-280': ['vis', '27', null, 'El VIS central principal, encargado de la supervisión técnica y de la administración, estará situado en Estrasburgo (Francia), y habrá una copia de seguridad del VIS central, capaz de realizar todas las funciones del VIS central en caso de fallo del sistema, en Sankt Johann im Pongau (Austria)'],
  '5-286': ['sis', '34.1', 'Las autoridades nacionales competentes responsables de la identificación de los nacionales de terceros países tendrán acceso'],
  '5-287': ['sis', '35.1', 'tendrá derecho, cuando sea necesario para cumplir su mandato, a acceder a los datos del SIS'],
  '5-290': ['eur', '48.2', 'incluido un plan de seguridad de los datos'],
  '5-295': ['vis', '4.6', '«miembros del grupo», los solicitantes obligados'],
  '5-297': ['cv', '2.11', '«intermediario comercial»: gestoría privada'],
  '5-298': ['cv', '9.2', 'Se podrá exigir a los solicitantes que obtengan una cita'],
  '5-300': ['eur', '38.2', 'Toda solicitud se tramitará en un plazo de 24 horas'],
};
// los «0» reutilizan la entrada anterior con cita (mismo artículo)
let ult = null; for (const k of Object.keys(C)) { if (C[k] === 0) C[k] = ult; else ult = C[k]; }
// sin fuente localizable en el temario: se dejan como están y se avisa
const SIN_FUENTE = ['5-68', '5-112', '5-148', '5-192', '5-231', '5-193', '5-206'];
// correcciones de contenido: c = nueva correcta · op = {índice: texto} · txt = [buscar, reemplazar] en enunciado y opciones · preg = enunciado nuevo · p = explicación propia
const FIX = {
  '5-34': { op: { 1: 'Por un período de validez de dos años, siempre que el solicitante haya obtenido y utilizado legalmente un visado para entradas múltiples con una validez de seis meses en los dos años anteriores.' }, p: 'En el texto, el visado de dos años exige haber utilizado un visado para entradas múltiples con validez de UN AÑO (no seis meses) en los dos años anteriores, y el de un año, tres visados en los dos años anteriores (no «un año y medio»).' },
  '5-73': { op: { 1: 'Por un período de validez de dos años, siempre que el solicitante haya obtenido y utilizado legalmente un visado para entradas múltiples con una validez de seis meses en los dos años anteriores.' }, p: 'En el texto, el visado de dos años exige haber utilizado un visado para entradas múltiples con validez de UN AÑO (no seis meses) en los dos años anteriores, y el de un año, tres visados en los dos años anteriores (no «un año y medio»).' },
  '5-35': { op: { 3: 'Profesión y lugar de trabajo del cónyuge del solicitante.' }, p: 'El número de expediente, la autoridad ante la que se presentó la solicitud y el motivo del viaje (y también el Estado miembro de primera entrada) figuran entre los datos del expediente; la profesión del cónyuge, no.' },
  '5-36': { preg: 'Reglamento (UE) 2018/1861, relativo al establecimiento, funcionamiento y utilización del Sistema de Información de Schengen (SIS) en el ámbito de las inspecciones fronterizas. Registros a nivel central. Los registros contendrán, entre otros contenidos:', apartado: 'Reglamento (UE) 2018/1861 (Sistema de Información de Schengen - SIS)', p: 'Los registros del art. 18 contienen el historial de la descripción, la fecha y hora de la actividad de tratamiento y una referencia a los datos tratados, entre otros. (Antes esta pregunta se atribuía por error al Reglamento 977/2011.)' },
  '5-45': { txt: ['2008/615/JAI', '2008/633/JAI'] }, '5-74': { txt: ['2008/615/JAI', '2008/633/JAI'] },
  '5-97': { txt: ['control por comparación de muestras', 'el proceso de comparación de series de datos para establecer la validez de una identidad declarada (control por comparación de dos muestras)'], op: { 2: 'Verificación.' }, p: '«Verificación» = comparación de DOS muestras (validez de una identidad declarada); «identificación» = comparación de VARIAS muestras de una base de datos.' },
  '5-133': { txt: ['control por comparación de muestras', 'el proceso de comparación de series de datos para establecer la validez de una identidad declarada (control por comparación de dos muestras)'], op: { 2: 'Verificación.' }, p: '«Verificación» = comparación de DOS muestras (validez de una identidad declarada); «identificación» = comparación de VARIAS muestras de una base de datos.' },
  '5-170': { op: { 2: 'Mejorar las consultas entre las autoridades centrales de visados.' }, p: 'El VIS tiene por objetivo mejorar la aplicación de la política común de visados, la cooperación consular y las consultas entre las autoridades centrales de visados; no habla de cooperación empresarial.' },
  '5-179': { c: 2, p: 'La arquitectura incluye el registro común de datos de IDENTIDAD (RCDI), no «de datos dactiloscópicos», y un sistema de INFORMACIÓN central, no «de infraestructura»: solo la C reproduce bien el texto.' },
  '5-217': { op: { 0: 'Efectivas.' } }, '5-306': { op: { 0: 'Efectivas.' } },
  '5-239': { c: 1, p: 'La base jurídica del SIS son dos instrumentos SEPARADOS (Reglamentos 2018/1861 y 2018/1862), lo que NO afecta al principio de que el SIS constituye un único sistema de información.' },
  '5-280': { c: 2, op: { 3: 'Sankt Johann im Pongau (Austria).' }, p: 'El sistema central del VIS está en Estrasburgo (Francia); la copia de reserva, en Sankt Johann im Pongau (Austria). La sede de eu-LISA está en Tallin.' },
  '5-286': { op: { 2: 'La Agencia de la Unión Europea para la Cooperación Policial (Europol).' }, p: 'Tienen acceso las autoridades nacionales del art. 34, Europol (art. 35) y los equipos de la Agencia Europea de la Guardia de Fronteras y Costas (art. 36). Eurojust no figura en el Reglamento 2018/1861.' },
  '5-287': { op: { 0: 'La Agencia Europea de la Guardia de Fronteras y Costas.', 1: 'Europol (Agencia de la Unión Europea para la Cooperación Policial).' }, p: 'En el Reglamento 2018/1861 las agencias con acceso al SIS son Europol (art. 35) y la Agencia Europea de la Guardia de Fronteras y Costas (art. 36); eu-LISA gestiona el sistema pero no figura entre ellas, ni tampoco Eurojust.' },
  '5-108': { op: { 0: 'Las tareas necesarias para mantener el VIS en funcionamiento únicamente durante el horario de apertura de los consulados.', 1: 'Todas las tareas necesarias para mantener el VIS en funcionamiento durante las 24 horas del día, siete días a la semana, incluido el trabajo de mantenimiento y de desarrollo técnico necesario para un nivel satisfactorio de calidad operativa.', 2: 'La expedición de los visados en nombre de los Estados miembros que no dispongan de consulado.' }, p: 'La gestión operativa es mantener el VIS en funcionamiento 24 horas al día, 7 días a la semana, incluido el mantenimiento y el desarrollo técnico; no se limita al horario de los consulados ni incluye expedir visados.' },
};
let s = fs.readFileSync(FILE, 'utf8');
const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
const sinCita = [], ocr = [], corr = [], hechas = [];
const ids = [...new Set([...Object.keys(C), ...Object.keys(FIX)])];
for (const id of ids) {
  const r = rango(id); if (!r) { console.log('NO ENCONTRADA', id); continue; }
  const q = JSON.parse(s.slice(r[0], r[1]));
  const f = FIX[id] || {};
  const yaCita = /class="ref-concepto"/.test(q.explicacion);
  const limpia = t => t.replace(/([A-Za-zÁÉÍÓÚáéíóúñÑ])\d(?=[A-Za-zÁÉÍÓÚáéíóúñÑ])/g, '$1').replace(/([a-záéíóúñ])\d(?=[ ,:;?.)])/g, '$1');
  q.pregunta = limpia(q.pregunta); q.opciones = q.opciones.map(limpia);
  if (f.preg) q.pregunta = f.preg;
  if (f.apartado) q.apartado = f.apartado;
  if (f.txt) { q.pregunta = q.pregunta.split(f.txt[0]).join(f.txt[1]); q.opciones = q.opciones.map(o => o.split(f.txt[0]).join(f.txt[1])); }
  if (f.op) for (const [i, t] of Object.entries(f.op)) q.opciones[+i] = t;
  if (f.c !== undefined) q.correcta = f.c;
  if (Object.keys(f).length) corr.push(id);
  const resp = `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${esc(q.opciones[q.correcta].replace(/\.$/, ''))}</mark></span>`;
  // cuerpo propio anterior (sin cabecera, sin «La opción correcta es…» y sin la cita roja vieja)
  let cuerpo = q.explicacion.replace(/^<span class="ex-resp">[\s\S]*?<\/span>/, '');
  if (yaCita) cuerpo = cuerpo.replace(/^[\s\S]*?<span class="ref-concepto">[\s\S]*?<\/span>\.?\s*/, '');
  cuerpo = cuerpo.replace(/^\s*La (opción|respuesta) correcta es la [A-D]\.?\s*/i, '').trim();
  if (f.c !== undefined || f.op) cuerpo = f.p || '';
  else if (f.p) cuerpo = f.p + (cuerpo ? ' ' + cuerpo : '');
  const e = C[id];
  if (yaCita && !Object.keys(f).length) continue;                       // ya revisada en su día: se conserva
  if (yaCita && !e) { q.explicacion = q.explicacion.replace(/^<span class="ex-resp">[\s\S]*?<\/span>/, resp); if (f.p) q.explicacion += ' ' + esc(f.p); }
  else if (!e) { sinCita.push(id); q.explicacion = resp + (cuerpo ? ' ' + cuerpo : ''); }
  else {
    const [k, art, anc, man] = e;
    const c = man ? { t: man, ocr: !nrm(fuentes(k).slice(0, 3).join(' ')).includes(nrm(man)) } : cita(k, anc);
    if (!c || c.t.length < 20) { sinCita.push(id + ' (ancla no hallada)'); q.explicacion = resp + (cuerpo ? ' ' + cuerpo : ''); }
    else {
      if (c.ocr) ocr.push(id);
      const lab = /^cons\. /.test(art) ? 'considerando ' + art.slice(6) : 'art. ' + art;
      q.explicacion = `${resp}El <span class="ref-norma">${lab} del ${NOM[k]}</span> dispone: <span class="ref-concepto">"${esc(c.t.replace(/[.;:,]$/, ''))}"</span>.${c.ocr ? ' <em>(texto tomado de tu temario subrayado: el temario oficial en PDF trae la versión anterior)</em>' : ''}${cuerpo ? ' ' + cuerpo : ''}`;
      hechas.push(id);
    }
  }
  s = s.slice(0, r[0]) + JSON.stringify(q) + s.slice(r[1]);
}
if (!dry) fs.writeFileSync(FILE, s);
if (process.argv.includes('--ver')) for (const id of hechas) { const r = rango(id); const q = JSON.parse(s.slice(r[0], r[1])); console.log('\n' + id + ' ' + q.opciones[q.correcta].slice(0, 70) + '\n   ' + q.explicacion.replace(/<[^>]+>/g, '')); }
console.log('con cita nueva', hechas.length, '· corregidas', corr.length, '(' + corr.join(', ') + ')', '· cita del OCR de su PDF', ocr.length, ocr.join(', '), '· sin cita:', sinCita.join(', ') || 'ninguna', dry ? '· (--dry: no se escribe)' : '');
