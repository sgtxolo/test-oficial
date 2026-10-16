// Tema 7 · preguntas OFICIALES (estilo academia) para los apartados con marca suya (EXAMEN/EXOF, ✱, R) que no tenían pregunta oficial
// (cobertura-marcas-t7.js, 17/10/2026). Ids 7-141… insertados tras 7-140. Cita literal del temario oficial verificada. Idempotente.
// Uso: node prompts/herramientas/tema7/preguntas-of-marcas-t7.js [--check]
const fs = require('fs'), path = require('path');
const F = 'test-oficial-conocimiento.html', BS = String.fromCharCode(92), L = 'ABCD';
const TXT = path.join(__dirname, '..', '..', 'temario-limpio', 'tema7', 'oficial-paginas.txt');
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const LT = ['Ley Orgánica 2/1979, de 3 de octubre, del Tribunal Constitucional', 'LOTC', 'Ley Orgánica 2/1979, de 3 de octubre, del Tribunal Constitucional'];
const LH = ['Ley Orgánica 1/1982, de 5 de mayo, de protección civil del derecho al honor, a la intimidad personal y familiar y a la propia imagen', 'LO 1/1982', 'Ley Orgánica 1/1982, de 5 de mayo, de protección civil del derecho al honor, a la intimidad personal y a la'];
const Q = [
 { n: LT, marca: '✱', a: 'art. 2.1.b)', r: 'Del Tribunal Constitucional, su organización y atribuciones', e: 'El Tribunal Constitucional conocerá en los casos y en la forma que esta Ley determina:', c: 1,
   o: ['Del recurso de amparo por violación de cualesquiera derechos reconocidos en el Título I de la Constitución.', 'Del recurso de amparo por violación de los derechos y libertades públicos relacionados en el artículo 53.2 de la Constitución.', 'Del recurso de amparo contra las sentencias firmes dictadas por el Tribunal Supremo en cualquier orden jurisdiccional.', 'Del recurso de amparo por violación de los principios rectores de la política social y económica.'],
   t: 'b) Del recurso de amparo por violación de los derechos y libertades públicos relacionados en el artículo cincuenta y tres, dos, de la Constitución.', p: 'Solo son amparables los derechos y libertades del art. 53.2 CE (arts. 14 a 29 y la objeción de conciencia del 30), no todo el Título I.' },
 { n: LT, marca: '✱', a: 'art. 4.2', r: 'Del Tribunal Constitucional, su organización y atribuciones', e: 'Las resoluciones del Tribunal Constitucional:', c: 3,
   o: ['Podrán ser enjuiciadas por el Tribunal Supremo cuando afecten a la legalidad ordinaria.', 'Podrán ser revisadas por el Pleno del Consejo General del Poder Judicial.', 'Solo podrán ser enjuiciadas por el Tribunal Europeo de Derechos Humanos.', 'No podrán ser enjuiciadas por ningún órgano jurisdiccional del Estado.'],
   t: 'Las resoluciones del Tribunal Constitucional no podrán ser enjuiciadas por ningún órgano jurisdiccional del Estado.', p: '' },
 { n: LT, marca: '✱', a: 'art. 10.1.n)', r: 'Del Tribunal Constitucional, su organización y atribuciones', e: 'El Tribunal en Pleno conoce de cualquier otro asunto que sea competencia del Tribunal pero recabe para sí el Pleno, a propuesta de:', c: 0,
   o: ['El Presidente o de tres Magistrados.', 'El Presidente o de dos Magistrados.', 'El Vicepresidente o de tres Magistrados.', 'La mayoría absoluta de los Magistrados.'],
   t: 'n) De cualquier otro asunto que sea competencia del Tribunal pero recabe para sí el Pleno, a propuesta del Presidente o de tres Magistrados', p: '' },
 { n: LT, marca: 'EXOF', a: 'art. 43.1', r: 'Del recurso de amparo constitucional', e: 'Las violaciones de los derechos y libertades originadas por disposiciones, actos jurídicos, omisiones o simple vía de hecho del Gobierno o de sus autoridades o funcionarios, o de los órganos ejecutivos colegiados de las comunidades autónomas o de sus autoridades o funcionarios o agentes, podrán dar lugar al recurso de amparo:', c: 2,
   o: ['En el plazo de tres meses desde que sean firmes.', 'Directamente, sin necesidad de agotar la vía judicial.', 'Una vez que se haya agotado la vía judicial procedente.', 'Una vez agotada la vía administrativa previa.'],
   t: 'podrán dar lugar al recurso de amparo una vez que se haya agotado la vía judicial procedente', p: '' },
 { n: LT, marca: 'R5', a: 'art. 43.2', r: 'Del recurso de amparo constitucional', e: 'En las violaciones originadas por el Gobierno o sus autoridades o funcionarios, el plazo para interponer el recurso de amparo constitucional será el de los:', c: 1,
   o: ['Treinta días siguientes a la notificación de la resolución recaída en el previo proceso judicial.', 'Veinte días siguientes a la notificación de la resolución recaída en el previo proceso judicial.', 'Veinte días siguientes a la fecha de la resolución recaída en el previo proceso judicial.', 'Tres meses siguientes a la notificación de la resolución recaída en el previo proceso judicial.'],
   t: 'El plazo para interponer el recurso de amparo constitucional será el de los veinte días siguientes a la notificación de la resolución recaída en el previo proceso judicial.', p: '20 días (Gobierno) · 30 días (órganos judiciales) · 3 meses (actos sin valor de Ley de las Cortes y Asambleas).' },
 { n: LT, marca: '✱', a: 'art. 43.3', r: 'Del recurso de amparo constitucional', e: 'En el recurso de amparo frente a violaciones originadas por el Gobierno o sus autoridades, el recurso sólo podrá fundarse en la infracción:', c: 3,
   o: ['Por cualquier acto administrativo de los preceptos legales que desarrollan los derechos fundamentales.', 'Por una resolución no firme de los preceptos constitucionales que reconocen los derechos o libertades susceptibles de amparo.', 'De los Tratados internacionales sobre derechos humanos ratificados por España.', 'Por una resolución firme de los preceptos constitucionales que reconocen los derechos o libertades susceptibles de amparo.'],
   t: 'El recurso sólo podrá fundarse en la infracción por una resolución firme de los preceptos constitucionales que reconocen los derechos o libertades susceptibles de amparo.', p: '' },
 { n: LT, marca: '✱', a: 'art. 46.1.a)', r: 'Del recurso de amparo constitucional', e: 'En los casos de decisiones o actos sin valor de Ley emanados de las Cortes o de las Asambleas legislativas de las Comunidades Autónomas, están legitimados para interponer el recurso de amparo constitucional:', c: 0,
   o: ['La persona directamente afectada, el Defensor del Pueblo y el Ministerio Fiscal.', 'Quienes hayan sido parte en el proceso judicial correspondiente, el Defensor del Pueblo y el Ministerio Fiscal.', 'La persona directamente afectada y el Ministerio Fiscal.', 'Cincuenta Diputados o cincuenta Senadores.'],
   t: 'a) En los casos de los artículos cuarenta y dos y cuarenta y cinco, la persona directamente afectada, el Defensor del Pueblo y el Ministerio Fiscal.', p: '' },
 { n: LT, marca: '✱', a: 'art. 50.2', r: 'Del recurso de amparo constitucional', e: 'Cuando la admisión a trámite del recurso de amparo, aun habiendo obtenido la mayoría, no alcance la unanimidad:', c: 2,
   o: ['La Sección acordará la inadmisión mediante providencia.', 'La Sección elevará la decisión al Pleno para su resolución.', 'La Sección trasladará la decisión a la Sala respectiva para su resolución.', 'Se entenderá admitido a trámite el recurso.'],
   t: 'Cuando la admisión a trámite, aun habiendo obtenido la mayoría, no alcance la unanimidad, la Sección trasladará la decisión a la Sala respectiva para su resolución.', p: '' },
 { n: LT, marca: 'EXOF · R7', a: 'art. 53', r: 'Del recurso de amparo constitucional', e: 'La Sala o, en su caso, la Sección, al conocer del fondo del asunto, pronunciará en su sentencia alguno de estos fallos:', c: 1,
   o: ['Estimación o desestimación del amparo.', 'Otorgamiento de amparo o denegación de amparo.', 'Admisión o inadmisión del amparo.', 'Nulidad o confirmación del acto impugnado.'],
   t: 'La Sala o, en su caso, la Sección, al conocer del fondo del asunto, pronunciará en su sentencia alguno de estos fallos: a) Otorgamiento de amparo. b) Denegación de amparo.', p: '' },
 { n: LH, marca: '✱', a: 'art. 7.2', r: 'De la protección civil del honor, de la intimidad y de la propia imagen', e: 'Tendrán la consideración de intromisiones ilegítimas en el ámbito de protección delimitado por el artículo 2 de esta Ley: la utilización de aparatos de escucha, dispositivos ópticos, o de cualquier otro medio para el conocimiento de la vida íntima de las personas o de manifestaciones o cartas privadas:', c: 3,
   o: ['Destinadas a quien haga uso de tales medios, así como su grabación, registro o reproducción.', 'No destinadas a quien haga uso de tales medios, salvo su grabación o registro.', 'Únicamente cuando se produzca su difusión pública.', 'No destinadas a quien haga uso de tales medios, así como su grabación, registro o reproducción.'],
   t: '2. La utilización de aparatos de escucha, dispositivos ópticos, o de cualquier otro medio para el conocimiento de la vida íntima de las personas o de manifestaciones o cartas privadas no destinadas a quien haga uso de tales medios, así como su grabación, registro o reproducción.', p: '' },
 { n: LH, marca: 'R13', a: 'art. 9.3', r: 'De la protección civil del honor, de la intimidad y de la propia imagen', e: 'Se presumirá siempre que se acredite la intromisión ilegítima:', c: 0,
   o: ['La existencia de perjuicio.', 'La mala fe del causante.', 'La existencia de daño patrimonial.', 'La culpa del medio de difusión.'],
   t: 'La existencia de perjuicio se presumirá siempre que se acredite la intromisión ilegítima.', p: '' },
];
const of = fs.existsSync(TXT) ? nrm(fs.readFileSync(TXT, 'utf8')) : null;
const malas = Q.filter(q => !of.includes(nrm(q.t))).map(q => q.a);
if (malas.length) { console.log('✗ citas no literales:', malas.join(', ')); process.exit(1); }
const objs = Q.map((q, i) => ({ id: '7-' + (141 + i), pregunta: `${q.n[0]}. ${q.r}. ${q.e}`, opciones: q.o, correcta: q.c,
  explicacion: `<span class="ex-resp">Respuesta correcta: <b>${L[q.c]}</b> · <mark class="ex-key">${esc(q.o[q.c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${q.a} de la ${q.n[1]}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>.${q.p ? ' ' + esc(q.p) : ''} <em style="color:var(--texto-gris)">(Pregunta del apartado marcado ${q.marca} en tu temario)</em>`,
  apartado: q.n[2] }));
console.log('✓', objs.length, 'citas literales · letras', [0, 1, 2, 3].map(c => objs.filter(o => o.correcta === c).length).join('/'));
if (process.argv.includes('--check')) process.exit(0);
let s = fs.readFileSync(F, 'utf8');
const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
let prev = '7-140', n = 0;
for (const o of objs) { const r = rango(o.id); if (r) s = s.slice(0, r[0]) + JSON.stringify(o) + s.slice(r[1]); else { const p = rango(prev); s = s.slice(0, p[1]) + ',' + JSON.stringify(o) + s.slice(p[1]); n++; } prev = o.id; }
fs.writeFileSync(F, s); console.log('insertadas', n, '· actualizadas', objs.length - n);
