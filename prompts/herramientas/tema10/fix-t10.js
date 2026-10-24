// Tema 10 · correcciones de las preguntas OFICIALES verificadas contra el temario (Código Civil, extracto 2026)
// Auditoría 24/10/2026. Uso: node prompts/herramientas/tema10/fix-t10.js  (idempotente; comprueba que cada cita es literal)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const TD = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema10');
const clean = f => fs.readFileSync(path.join(TD, f), 'utf8').replace(/=====PAG \d+=====/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const CC = clean('cc.txt');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const CCN = nz(CC);
const lab = cita => {
  const i = CC.indexOf(cita);
  if (i < 0) return null;
  const m = [...CC.slice(0, i + 1).matchAll(/Artículo (\d+)\./g)].pop();
  return m ? `art. ${m[1]} del Código Civil` : 'Código Civil';
};
const BS = String.fromCharCode(92), L = 'ABCD';
const ex = (q, art, cita, extra) => {
  const em = (q.explicacion.match(/<em style[^>]*>.*?<\/em>\s*$/) || [''])[0];
  return `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>${extra ? extra + ' ' : ''}Según el <span class="ref-norma">${art}</span>: <span class="ref-concepto">"${cita}"</span> (verificado con el texto del temario oficial).${em ? ' ' + em : ''}`;
};
const O = (q, k, t) => { q.opciones[k] = t; };
const OPTAR = 'Tienen derecho a optar por la nacionalidad española: a) Las personas que estén o hayan estado sujetas a la patria potestad de un español. b) Aquellas cuyo padre o madre hubiera sido originariamente español y nacido en España. c) Las que se hallen comprendidas en el segundo apartado de los artículos 17 y 19';
const OPTAR_O = ['Las personas que estén o hayan estado sujetas a la patria potestad de un español.', 'Aquellas cuyo padre o madre hubiera sido originariamente español y nacido en España.', 'Las que se hallen comprendidas en el segundo apartado de los artículos 17 y 19.'];
const T228 = 'A informar a la autoridad judicial anualmente sobre la situación del menor y a rendirle cuenta anual de su administración';
const VEC5 = 'La vecindad civil se adquiere: 1.° Por residencia continuada durante dos años, siempre que el interesado manifieste ser esa su voluntad. 2.° Por residencia continuada de diez años, sin declaración en contrario durante este plazo';
const A88 = 'La acción de divorcio se extingue por la muerte de cualquiera de los cónyuges y por su reconciliación, que deberá ser expresa cuando se produzca después de interpuesta la demanda';
const A84 = 'pero ambos cónyuges separadamente deberán ponerlo en conocimiento del Juez que entienda o haya entendido en el litigio';
const A46 = 'No pueden contraer matrimonio: 1.° Los menores de edad no emancipados. 2.° Los que estén ligados con vínculo matrimonial';
const A76 = 'Caduca la acción y se convalida el matrimonio si los cónyuges hubieran vivido juntos durante un año después de desvanecido el error o de haber cesado la fuerza o la causa del miedo';
// cada entrada: [id, fn(q) → [cita, nota opcional] | null (solo limpieza de texto)]
const F = [
  ['10-6', q => { q.pregunta = q.pregunta.replace(/:\d+$/, ':'); OPTAR_O.forEach((t, k) => O(q, k, t)); q.correcta = 3; return [OPTAR, 'Las tres opciones son literales.']; }],
  ['10-24', q => { OPTAR_O.forEach((t, k) => O(q, k, t)); q.correcta = 3; return [OPTAR, 'Las tres opciones son literales.']; }],
  ['10-202', q => { q.pregunta = q.pregunta.replace(/:\d+$/, ':'); OPTAR_O.forEach((t, k) => O(q, k, t)); q.correcta = 3; return [OPTAR, 'Las tres opciones son literales.']; }],
  ['10-9', q => [T228, 'El informe es a la autoridad judicial, no al ministerio fiscal.']],
  ['10-31', q => { q.correcta = 2; return [T228, 'El informe es a la autoridad judicial, no al ministerio fiscal; oír al menor sí es un deber (6.º).']; }],
  ['10-210', q => { q.correcta = 2; return [T228, 'El informe es a la autoridad judicial, no al ministerio fiscal; oír al menor sí es un deber (6.º).']; }],
  ['10-97', q => [T228, 'La cuenta es anual, no mensual.']],
  ['10-42', q => { q.correcta = 0; return ['y las de las fundaciones por las reglas de su institución, debidamente aprobadas por disposición administrativa, cuando este requisito fuere necesario', 'Se aprueban por disposición administrativa, no por ley, real decreto ni orden ministerial.']; }],
  ['10-64', q => { O(q, 3, 'La vecindad civil se adquiere por residencia continuada de dos años, sin declaración en contrario durante este plazo.'); q.correcta = 3; return [VEC5, 'Sin declaración en contrario son diez años; los dos años exigen manifestar la voluntad.']; }],
  ['10-17', q => [VEC5, 'Los diez años no exigen manifestar la voluntad; los dos años sí.']],
  ['10-43', q => { q.correcta = 2; return [A46, 'Solo se prohíbe a los menores de edad NO emancipados.']; }],
  ['10-103', q => { O(q, 1, 'No pueden contraer matrimonio entre sí los colaterales por consanguinidad hasta el segundo grado.'); q.correcta = 1; return ['Tampoco pueden contraer matrimonio entre sí: 1. Los parientes en línea recta por consanguinidad o adopción. 2. Los colaterales por consanguinidad hasta el tercer grado', 'El impedimento llega hasta el tercer grado, no el segundo.']; }],
  ['10-50', q => { O(q, 1, 'Si la causa de nulidad fuere la falta de edad, mientras el contrayente sea menor sólo podrá ejercitar la acción cualquiera de sus padres, tutores o guardadores y, en todo caso, el Ministerio Fiscal.'); O(q, 3, 'En los casos de error, coacción o miedo grave, la acción de nulidad caduca y no convalida el matrimonio si los cónyuges hubieran vivido juntos durante un año después de desvanecido el error o de haber cesado la fuerza o la causa del miedo.'); q.correcta = 3; return [A76, 'La acción caduca y SE CONVALIDA el matrimonio (no «no convalida»).']; }],
  ['10-83', q => { O(q, 0, 'Podrán celebrar el matrimonio del que se halle en peligro de muerte el Capitán o Comandante respecto de los matrimonios que se celebren a bordo de nave o aeronave.'); O(q, 3, 'Cuando el peligro de muerte derive de enfermedad o estado físico de alguno de los contrayentes, se requerirá para la celebración del matrimonio dictamen médico sobre su capacidad para la prestación del consentimiento y la gravedad de la situación, salvo imposibilidad acreditada.'); q.correcta = 1; return ['El matrimonio en peligro de muerte no requerirá para su celebración la previa tramitación del acta o expediente matrimonial, pero sí la presencia, en su celebración, de dos testigos mayores de edad', 'No requiere la previa tramitación del acta o expediente.']; }],
  ['10-91', q => { q.correcta = 3; return ['Los funcionarios diplomáticos o consulares, en ejercicio de las funciones notariales que tienen atribuidas, no podrán autorizar la escritura pública de divorcio', 'Los funcionarios diplomáticos o consulares NO pueden autorizar la escritura de divorcio.']; }],
  ['10-67', q => { O(q, 1, 'Por el transcurso de un año desde la separación de hecho de los cónyuges.'); O(q, 3, 'A y C son correctas.'); q.correcta = 3; return [A88, 'La declaración de fallecimiento disuelve el matrimonio (art. 85), pero no figura como causa de extinción de la acción de divorcio.']; }],
  ['10-288', q => { O(q, 1, 'Por el transcurso de un año desde la separación de hecho de los cónyuges.'); O(q, 3, 'A y C son correctas.'); q.correcta = 3; return [A88, 'La declaración de fallecimiento disuelve el matrimonio (art. 85), pero no figura como causa de extinción de la acción de divorcio.']; }],
  ['10-122', q => { O(q, 2, 'El que se contraiga sin la intervención del Alcalde o Concejal, letrado o letrada de la Administración de Justicia, notario o notaria, o personal funcionario ante quien deba celebrarse, o sin la de los testigos.'); return ['El que se contraiga sin la intervención del Alcalde o Concejal, letrado o letrada de la Administración de Justicia, notario o notaria, o personal funcionario ante quien deba celebrarse, o sin la de los testigos', 'El matrimonio en peligro de muerte no figura entre las causas de nulidad.']; }],
  ['10-123', q => [A84, 'Son los cónyuges SEPARADAMENTE, no conjuntamente.']],
  ['10-233', q => [A84, 'Son los cónyuges SEPARADAMENTE, no conjuntamente.']],
  ['10-227', q => { O(q, 1, 'Los padres no podrán renunciar a los derechos de que los hijos sean titulares, ni tampoco enajenar o gravar sus bienes inmuebles, establecimientos mercantiles o industriales, objetos preciosos y valores mobiliarios salvo el derecho de suscripción preferente de acciones, sino por causa justificada de utilidad o necesidad y previa autorización del Juez del domicilio, con audiencia del Ministerio Fiscal.'); O(q, 3, 'Al término de la patria potestad podrán los hijos exigir a los padres la rendición de cuentas de la administración que ejercieron sobre sus bienes hasta entonces. La acción para exigir el cumplimiento de esta obligación prescribirá a los tres años.'); q.correcta = 2; return ['Pertenecen siempre al hijo no emancipado los frutos de sus bienes, así como todo lo que adquiera con su trabajo o industria. No obstante, los padres podrán destinar los del menor que viva con ambos o con uno sólo de ellos, en la parte que le corresponda, al levantamiento de las cargas familiares', 'No pertenecen al hijo «todos» los rendimientos (hay excepciones y los padres pueden destinarlos a las cargas familiares). La acción de rendición de cuentas prescribe a los tres años (art. 168).']; }],
  ['10-238', q => { O(q, 0, 'Marroquíes.'); q.correcta = 0; return ['Serán suficientes cinco años para los que hayan obtenido la condición de refugiado y dos años cuando se trate de nacionales de origen de países iberoamericanos, Andorra, Filipinas, Guinea Ecuatorial o Portugal o de sefardíes', 'Los marroquíes no figuran entre los supuestos de dos años.']; }],
  ['10-115', q => { q.pregunta = q.pregunta.replace(/contrayente\d+\./, 'contrayente.'); return ['El poder se extinguirá por la revocación del poderdante, por la renuncia del apoderado o por la muerte de cualquiera de ellos', 'Renuncia del apoderado y revocación del poderdante (no al revés).']; }],
  ['10-156', q => { q.pregunta = q.pregunta.replace(/contrayente\d+\./, 'contrayente.'); return ['El poder se extinguirá por la revocación del poderdante, por la renuncia del apoderado o por la muerte de cualquiera de ellos', 'Renuncia del apoderado y revocación del poderdante (no al revés).']; }],
  ['10-248', q => { O(q, 3, q.opciones[3].replace(/establecid\d+os/, 'establecidos')); return null; }],
  ['10-286', q => { O(q, 1, q.opciones[1].replace(/desamparo\d+\./, 'desamparo.')); return null; }],
];
// ---------- aplicación ----------
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const malas = [];
const aplica = (id, fn) => {
  const key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); return; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1));
  const r = fn(q);
  if (r) {
    const [cita, extra] = r;
    if (!CCN.includes(nz(cita))) { malas.push(id); return; }
    q.explicacion = ex(q, lab(cita) || 'Código Civil', cita, extra);
  }
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
};
for (const [id, fn] of F) aplica(id, fn);
// limpieza: prefijo «Tema 10 - Derecho Civil) » en los enunciados oficiales
for (const m of [...s.matchAll(/\{"id":"(10-\d+)","pregunta":"Tema 10 - Derecho Civil\) /g)]) aplica(m[1], q => { q.pregunta = q.pregunta.replace(/^Tema 10 - Derecho Civil\)\s*/, ''); return null; });
if (malas.length) console.log('✗ CITA NO LITERAL (no se aplica):', malas.join(', '));
fs.writeFileSync(FILE, s); console.log('corregidas', n, 'de', F.length);
