// Tema 20 · correcciones de las preguntas OFICIALES verificadas contra el temario oficial (LECrim, extracto del T20)
// Auditoría 9/11/2026 (auditoria-oficiales.js 20 + revisión a mano): opciones con el OCR destrozado, «incorrecta» invertida, cifras erróneas.
// Uso: node prompts/herramientas/tema20/fix-t20.js   (aplica sobre test-oficial-conocimiento.html; idempotente: reescribe la explicación)
// Formato de explicación NUEVO (lila «Art. N · norma» + rojo literal + explicación breve).
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const OF = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema20', 'oficial.txt'), 'utf8').replace(/\r/g, '').replace(/=====PAG \d+ ?=====/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const OFN = nz(OF);
const NORMA = 'Ley de Enjuiciamiento Criminal';
const lab = cita => {
  const a = nz(cita).slice(0, 60); const j = OFN.indexOf(a); if (j < 0) return null;
  const re = /Artículo (\d+(?: (?:bis|ter|quater|quinquies|sexies|septies|octies))?(?: [a-z])?)\./g; let m, last = null;
  while ((m = re.exec(OF))) { const antes = nz(OF.slice(0, m.index)).length; if (antes <= j) last = m[1]; else break; }
  return last;
};
const L = 'ABCD';
const ex = (q, cita, extra) => {
  const art = lab(cita);
  return `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span><span class="ref-norma">${art ? 'Art. ' + art + ' · ' : ''}${NORMA}</span><span class="ref-concepto">"${cita}"</span>${extra || ''}`;
};
const O = (q, k, t) => { q.opciones[k] = t; };

const F = [
  ['20-1', q => { q.correcta = 2; return ['2.º Los Jueces de instrucción durante el sumario.', 'Los Jueces de instrucción pueden promover competencia solo durante el sumario, no «en cualquier estado de la causa»; las Audiencias de lo criminal sí pueden durante la sustanciación del juicio.']; }],
  ['20-24', q => { O(q, 1, 'Si fuera impúber, está exento de la obligación de denunciarlo.'); O(q, 2, 'Está exento de la obligación quien no gozare del pleno uso de su razón.'); return ['La obligación establecida en el artículo anterior no comprende a los impúberes ni a los que no gozaren del pleno uso de su razón.', 'Las tres opciones reproducen el art. 259 y el art. 260.']; }],
  ['20-94', q => { O(q, 0, 'La identidad de la víctima y de todos sus familiares.'); return ['La descripción del hecho objeto de investigación y la identidad del investigado o de cualquier otro afectado por la medida, siempre que tales datos resulten conocidos.', 'La forma de ejecución de la medida, la extensión, el sujeto obligado y la descripción del hecho sí figuran en la petición; la identidad de la víctima y de sus familiares no.']; }],
  ['20-111', q => { q.correcta = 2; return ['Los comprendidos en los números 2.º y 3.º podrán ejercitar también la acción penal por el delito o falta cometidos contra las personas o bienes de los que estuviesen bajo su guarda legal.', 'Quien no goza de la plenitud de los derechos civiles (n.º 1) NO puede ejercitarla por los delitos contra las personas o bienes de quienes están bajo su guarda legal: eso solo vale para los n.º 2 y 3.']; }],
  ['20-121', q => { q.correcta = 1; return ['Los cónyuges, a no ser por delito o falta cometidos por el uno contra la persona del otro o la de sus hijos, y por el delito de bigamia.', 'La opción B convierte en prohibición lo que la ley permite como excepción: los cónyuges sí pueden ejercitar la acción penal por el delito cometido por uno contra el otro o sus hijos y por bigamia.']; }],
  ['20-131', q => {
    O(q, 0, 'Los parientes colaterales del delincuente hasta el tercer grado inclusive.');
    O(q, 1, 'Los ascendientes y descendientes del delincuente y sus parientes colaterales hasta el segundo grado inclusive.');
    O(q, 2, 'Los abogados y procuradores respecto de las instrucciones o explicaciones que recibieren de sus superiores.');
    O(q, 3, 'Los eclesiásticos que hubieran conocido el delito por cualquier medio ajeno a su ministerio.'); q.correcta = 1;
    return ['Quienes sean ascendientes y descendientes del delincuente y sus parientes colaterales hasta el segundo grado inclusive.', 'El grado es el segundo, no el tercero; abogados y procuradores se protegen respecto de sus clientes, no de sus superiores.']; }],
  ['20-132', q => {
    O(q, 0, 'El Tribunal Supremo no podrá formar ni promover competencias, y ningún Juez, Tribunal o parte podrá promoverlas contra él.');
    O(q, 1, 'Cuando algún Juez o Tribunal viniere entendiendo en asunto cuyo conocimiento estuviere reservado al Tribunal Supremo, ordenará éste a aquél, de oficio, a excitación del Ministerio Fiscal o a solicitud de parte, que se abstenga de todo procedimiento y remita los antecedentes en el término de segundo día.');
    O(q, 2, 'El Tribunal Supremo podrá, sin embargo, autorizar, en la misma orden y entre tanto que resuelve la competencia, la continuación de aquellas diligencias cuya urgencia o necesidad fueren manifiestas.');
    O(q, 3, 'Contra la decisión del Tribunal Supremo cabe recurso de reposición.'); q.correcta = 3;
    return ['Contra la decisión del Tribunal Supremo no se da recurso alguno.', null]; }],
  ['20-143', q => { q.opciones = ['Cuarenta y ocho horas.', 'Veinticuatro horas.', 'Treinta y seis horas.', 'Setenta y dos horas.']; q.correcta = 3; return ['Dentro de los plazos establecidos en la presente Ley, y, en todo caso, en el plazo máximo de setenta y dos horas, el detenido deberá ser puesto en libertad o a disposición de la autoridad judicial.', 'El plazo máximo de la detención preventiva es de setenta y dos horas, no de treinta y seis.']; }],
  ['20-147', q => {
    O(q, 0, 'Los que estuvieren destinados a cualquier servicio oficial, militar o civil del Estado, de la Provincia o del Municipio, aunque habiten allí los encargados de dicho servicio o los de la conservación y custodia del edificio o lugar.');
    O(q, 1, 'Los que estuvieren destinados a cualquier establecimiento de reunión o recreo, fueren o no lícitos.');
    O(q, 2, 'Los buques del Estado.'); O(q, 3, 'Los buques nacionales mercantes.');
    return ['Los buques del Estado.', 'Los buques nacionales mercantes se reputan domicilio (art. 554), no edificio o lugar público.']; }],
  ['20-215', q => {
    O(q, 1, 'Los que estuvieren destinados a cualquier servicio oficial, militar o civil del Estado, de la Provincia o del Municipio, aunque habiten allí los encargados de dicho servicio o los de la conservación y custodia del edificio o lugar.');
    O(q, 2, 'Los que estuvieren destinados a cualquier establecimiento de reunión o recreo, fueren o no lícitos.');
    return ['Los que estuvieren destinados a cualquier establecimiento de reunión o recreo, fueren o no lícitos.', 'Los buques nacionales mercantes son domicilio (art. 554), no edificio público.']; }],
  ['20-149', q => {
    O(q, 0, 'El que no goce de la plenitud de los derechos civiles.');
    O(q, 1, 'El que hubiera sido condenado dos veces por sentencia firme como reo del delito de denuncia o querella calumniosas.');
    O(q, 2, 'El Juez o Magistrado.');
    return ['Sin embargo de lo dispuesto en el artículo anterior, no podrán ejercitar la acción penal: 1.º El que no goce de la plenitud de los derechos civiles. 2.º El que hubiera sido condenado dos veces por sentencia firme como reo del delito de denuncia o querella calumniosas. 3.º El Juez o Magistrado.', 'Los extranjeros no figuran entre quienes tienen vedada la acción penal en este precepto.']; }],
  ['20-154', q => {
    O(q, 0, 'Al que se fugare de la cárcel en que estuviere esperando su traslación al establecimiento penal o lugar en que deba cumplir la condena que se le hubiese impuesto por sentencia firme.');
    O(q, 1, 'Al delincuente in fraganti.');
    O(q, 2, 'Al que se fugare del establecimiento penal en que se halle extinguiendo condena.');
    return ['Al que se fugare de la cárcel en que estuviere esperando su traslación al establecimiento penal o lugar en que deba cumplir la condena que se le hubiese impuesto por sentencia firme.', null]; }],
  ['20-156', q => {
    O(q, 0, 'Cuando haya mandamiento de libertad contra ellas.');
    O(q, 1, 'Cuando sean sorprendidas en flagrante delito.');
    O(q, 2, 'Cuando un delincuente, inmediatamente perseguido por los Agentes de la autoridad, se oculte o refugie en alguna casa.');
    O(q, 3, 'En casos de excepcional o urgente necesidad, cuando se trate de presuntos responsables de las acciones terroristas, cualquiera que fuese el lugar o domicilio donde se ocultasen o refugiasen.');
    q.correcta = 0;
    return ['Los Agentes de policía podrán asimismo proceder de propia autoridad a la inmediata detención de las personas cuando haya mandamiento de prisión contra ellas', 'La causa legal es el mandamiento de prisión, no de libertad.']; }],
  ['20-157', q => {
    O(q, 0, 'Mandamiento de prisión contra ellas.');
    O(q, 1, 'Cuando sean sorprendidas en flagrante delito.');
    O(q, 2, 'Cuando un delincuente, inmediatamente perseguido por los Agentes de la autoridad, se oculte o refugie en alguna casa.');
    O(q, 3, 'Todas son correctas.'); q.correcta = 3;
    return ['Los Agentes de policía podrán asimismo proceder de propia autoridad a la inmediata detención de las personas cuando haya mandamiento de prisión contra ellas, cuando sean sorprendidas en flagrante delito, cuando un delincuente, inmediatamente perseguido por los Agentes de la autoridad, se oculte o refugie en alguna casa', null]; }],
  ['20-56', q => {
    O(q, 1, 'Cuando sean sorprendidas en flagrante delito.');
    return ['Los Agentes de policía podrán asimismo proceder de propia autoridad a la inmediata detención de las personas cuando haya mandamiento de prisión contra ellas, cuando sean sorprendidas en flagrante delito, cuando un delincuente, inmediatamente perseguido por los Agentes de la autoridad, se oculte o refugie en alguna casa', null]; }],
  ['20-212', q => {
    O(q, 0, 'Cuando haya mandamiento de libertad contra ellas.');
    O(q, 2, 'En casos de excepcional o urgente necesidad, cuando se trate de presuntos responsables de las acciones terroristas, cualquiera que fuese el lugar o domicilio donde se ocultasen o refugiasen.');
    O(q, 3, 'Cuando un delincuente, inmediatamente perseguido por los Agentes de la autoridad, se oculte o refugie en alguna casa.'); q.correcta = 0;
    return ['Los Agentes de policía podrán asimismo proceder de propia autoridad a la inmediata detención de las personas cuando haya mandamiento de prisión contra ellas', 'La causa legal es el mandamiento de prisión, no de libertad.']; }],
  ['20-158', q => {
    O(q, 0, 'Especialidad.'); O(q, 1, 'Idoneidad.'); O(q, 2, 'Publicidad.'); O(q, 3, 'Proporcionalidad.'); q.correcta = 2;
    return ['Durante la instrucción de las causas se podrá acordar alguna de las medidas de investigación reguladas en el presente capítulo siempre que medie autorización judicial dictada con plena sujeción a los principios de especialidad, idoneidad, excepcionalidad, necesidad y proporcionalidad', null]; }],
  ['20-163', q => {
    O(q, 0, 'La de consignar las pruebas del delito que puedan desaparecer.');
    O(q, 1, 'La de recoger y poner en custodia cuanto conduzca a su comprobación y a la identificación del delincuente.');
    O(q, 2, 'La de detener, en su caso, a los presuntos responsables del delito.');
    O(q, 3, 'La de proteger a los ofendidos o perjudicados por el mismo, a sus familiares o a otras personas, sin que puedan acordarse a tal efecto las medidas cautelares a las que se refiere el artículo 544 bis.');
    return ['la de proteger a los ofendidos o perjudicados por el mismo, a sus familiares o a otras personas, o evitar la reiteración delictiva, pudiendo acordarse a tal efecto las medidas cautelares a las que se refiere el artículo 544 bis', 'Sí pueden acordarse las medidas cautelares del art. 544 bis (opción D falsa).']; }],
  ['20-164', q => { q.correcta = 0; return ['La información que vaya obteniendo el agente encubierto deberá ser puesta a la mayor brevedad posible en conocimiento de quien autorizó la investigación.', 'No existe el plazo de 24 horas: la ley dice «a la mayor brevedad posible».']; }],
  ['20-199', q => {
    O(q, 1, 'Los Jefes de las Unidades Orgánicas de Policía Judicial, centrales o de ámbito comercial.');
    O(q, 3, 'Los mandos superiores de los Jefes de las Unidades Orgánicas de Policía Judicial, centrales o de ámbito provincial.');
    return ['Los Jefes de las Unidades Orgánicas de Policía Judicial, centrales o de ámbito provincial, y sus mandos superiores', 'El ámbito es provincial (o central), no «comercial».']; }],
  ['20-211', q => { O(q, 0, 'Delitos dolosos castigados con pena con límite máximo de, al menos, tres años de prisión.'); return ['Delitos dolosos castigados con pena con límite máximo de, al menos, tres años de prisión.', 'El umbral es de tres años (no dos). La opción D es un requisito (previsión de datos esenciales), no un delito, y por eso es la que no encaja en la lista de delitos.']; }],
  ['20-35', q => { O(q, 2, 'Se reputarán edificios o lugares públicos los que estuvieren destinados a cualquier establecimiento de reunión o recreo, fueren o no lícitos.'); return ['El Juez necesitará para la entrada y registro en el Palacio de cualquiera de los Cuerpos Colegisladores la autorización del Presidente respectivo.', 'La opción A es incorrecta: la entrada en domicilio sin consentimiento es posible con resolución judicial o en los casos legales.']; }],
];
// ---------- aplicación ----------
const BS = String.fromCharCode(92);
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const malas = [];
for (const [id, fn] of F) {
  const key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1));
  const [cita, extra] = fn(q);
  if (!OFN.includes(nz(cita))) { malas.push(id); continue; }
  q.explicacion = ex(q, cita, extra);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
if (malas.length) console.log('✗ CITA NO LITERAL (no se aplica):', malas.join(', '));
fs.writeFileSync(FILE, s); console.log('corregidas', n, 'de', F.length);
