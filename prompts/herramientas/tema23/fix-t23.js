// Tema 23 · correcciones de las preguntas OFICIALES (23-1…23-132) contra el temario oficial limpio (prompts/temario-limpio/tema23/oficial.txt)
//  · EDITS: correcciones de fondo hechas a mano por id ({c: nueva correcta (0-3), o: {i: 'texto'}, p: ['desde','hasta'] | 'enunciado nuevo'}).
//  · La cita en rojo se busca automáticamente: el segmento LITERAL del oficial que más se parece a la respuesta (y al enunciado); siempre es literal por construcción.
//  · Las de confianza baja se listan (--bajas) para revisarlas a mano. Idempotente.
// Uso: node prompts/herramientas/tema23/fix-t23.js --dry | node prompts/herramientas/tema23/fix-t23.js [--bajas]
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const OF = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema23', 'oficial.txt'), 'utf8').replace(/\r/g, '').replace(/=====PAG \d+ ?=====/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]+/g, ' ');
const STOP = new Set('para como esta este esos esas sera seran podra podran deberan debera entre sobre desde hasta cuando donde segun cada todo todos toda todas otro otra otros otras puede pueden tendra tendran haya haber siendo tiene tienen sido seran ley seguridad privada servicios servicio'.split(' '));
const toks = t => [...new Set(norm(t).split(/\s+/).filter(w => (w.length >= 4 || /^\d+$/.test(w)) && !STOP.has(w)))];
const NORMA = 'Ley 5/2014, de 4 de abril, de Seguridad Privada';
const L = 'ABCD';
// ---- segmentos del oficial: artículo + frase/apartado
const SEG = []; {
  const re = /Art[ií]culo (\d+)\.(?=\s)/g; const marcas = []; let m; while ((m = re.exec(OF))) marcas.push([m.index, 'Art. ' + m[1]]);
  const re2 = /Disposici[oó]n (adicional|transitoria|derogatoria|final) (primera|segunda|tercera|cuarta|quinta|única)\./g; while ((m = re2.exec(OF))) marcas.push([m.index, 'Disposición ' + m[1] + ' ' + m[2]]);
  marcas.sort((a, b) => a[0] - b[0]);
  const partes = OF.split(/(?<=[.:;])\s+(?=(?:\d+\.|[a-zñ]\)|[A-ZÁÉÍÓÚÑ«]))/);
  let pos = 0;
  for (const p of partes) { const i = OF.indexOf(p, pos); if (i < 0) continue; pos = i + p.length; let art = ''; for (const mk of marcas) { if (mk[0] <= i) art = mk[1]; else break; } if (p.length >= 25) SEG.push({ t: p.trim(), art, tk: toks(p) }); }
}
const mejor = (textos) => {
  const q = toks(textos.join(' ')); if (!q.length) return null; const qs = new Set(q); let best = null;
  for (const s of SEG) { let c = 0; for (const w of s.tk) if (qs.has(w)) c++; if (!c) continue; const sc = c / Math.sqrt(s.tk.length + 3) / Math.sqrt(q.length); if (!best || sc > best.sc) best = { s, sc, c }; }
  return best;
};
// ---- correcciones de fondo a mano
const EDITS = {
  '23-5': { o: { 2: 'Previo el otorgamiento de las correspondientes licencias, se desarrollarán con armas de fuego los servicios de seguridad privada que se determinen por ley.' } },
  '23-9': { c: 3, o: { 1: 'Es infracción leve, en general, el incumplimiento de los trámites, condiciones o formalidades establecidos por esta ley, siempre que no constituya infracción grave o muy grave.' } },
  '23-13': { o: { 1: 'La retirada y reposición de fondos en cajeros automáticos, así como la prestación de servicios de vigilancia y protección de los mismos durante las citadas operaciones, o en las de reparación de averías.' } },
  '23-34': { o: { 1: 'Las situaciones en que ello viniera exigido por razones humanitarias.' } },
  '23-35': { c: 0, o: { 0: 'Sólo mediante requerimiento judicial o solicitud policial relacionada con el ejercicio de sus funciones en el curso de una investigación criminal o de un procedimiento sancionador.' } },
  '23-41': { c: 3 },
  '23-43': { c: 1 },
  '23-58': { o: { 2: 'Los de vigilancia y protección de buques mercantes y buques pesqueros que naveguen bajo bandera española en aguas en las que exista grave riesgo para la seguridad de las personas o de los bienes.' } },
  '23-59': { o: { 2: 'Injerencia mínima y proporcionalidad.' } },
  '23-65': { c: 3 },
  '23-66': { o: { 3: 'La planificación, consultoría y asistencia en materia de actuaciones de seguridad privada, que consistirán en la elaboración de estudios e informes de seguridad, análisis de riesgos y planes de seguridad referidos a la protección frente a los riesgos humanos, así como en asesorar sobre la prestación de los servicios de seguridad.' } },
  '23-67': { o: { 0: 'No podrá ser inferior a quince días hábiles ni superior a dos meses.' } },
  '23-72': { o: { 2: 'Reglamentariamente se establecerán las condiciones y requisitos para la subcontratación de servicios de seguridad privada.', 3: 'Los directores de seguridad de las empresas de seguridad privada y de las entidades obligadas a disponer de esta figura, conforme a lo dispuesto en el artículo 36, desempeñarán sus funciones integrados en las plantillas de dichas empresas.' } },
  '23-82': { c: 3 },
  '23-84': { o: { 2: 'Los escoltas privados podrán realizar identificaciones, restricciones de la circulación o detenciones en todo caso.', 3: 'La prestación de estos servicios sólo podrá realizarse previa comunicación al Ministerio del Interior, conforme se disponga por orden ministerial.' } },
  '23-91': { c: 0, p: ['los siguientes requisitos generales:', 'los siguientes requisitos generales. Señale la INCORRECTA:'] },
  '23-97': { o: { 3: 'Las de comprobación y control del estado y funcionamiento de calderas, bienes e instalaciones en general, en cualquier clase de inmuebles, para garantizar su conservación y funcionamiento.' } },
  '23-102': { o: { 1: 'Haber obtenido previamente la habilitación como vigilante de seguridad.', 3: 'Una habilitación adicional o la ya adquirida.', 0: 'Haber obtenido previamente la declaración responsable como vigilante de seguridad.' } },
  '23-106': { o: { 2: 'Los guardas rurales y sus especialidades de guardas de caza y guardapescas marítimos.' } },
  '23-124': { o: { 3: 'La comprobación de que los sistemas de seguridad privada instalados y las empresas de seguridad privada contratadas, cumplen con las exigencias de homologación de los organismos competentes.' } },
};
// citas puestas a mano donde la búsqueda automática da confianza baja: [artículo, cita literal]
const CITAS = {
  '23-16': ['Art. 64', 'los órganos competentes tendrán en cuenta la gravedad y trascendencia del hecho, el posible perjuicio para el interés público, la situación de riesgo creada o mantenida para personas o bienes, la reincidencia, la intencionalidad'],
  '23-17': ['Art. 52.1.d', 'De seguridad organizativa, dirigidas a evitar o poner término a cualquier tipo de amenaza, peligro o ataque deliberado, mediante la disposición, programación o planificación de cometidos, funciones o tareas formalizadas o ejecutadas por personas'],
  '23-33': ['Art. 61.3', 'Por la comisión de infracciones leves: a) Apercibimiento. b) Multa de 300 a 3.000 euros'],
  '23-41': ['Art. 38.6', 'prestando sus servicios directamente a los titulares de bienes y derechos que les puedan contratar, conforme a lo que se establezca reglamentariamente, cuando se trate de servicios de vigilancia y protección de explotaciones agrícolas, fincas de caza, en cuanto a los distintos aspectos del régimen cinegético, y zonas marítimas protegidas con fines pesqueros'],
  '23-49': ['Art. 69.3', 'Iniciado el procedimiento sancionador, el órgano que haya ordenado su incoación podrá adoptar las medidas cautelares necesarias para garantizar su adecuada instrucción'],
  '23-65': ['Art. 49.1', 'un único informe en el que reflejarán el número de registro asignado al servicio, los datos de la persona que encarga y contrata el servicio, el objeto de la contratación, los medios, los resultados, los detectives intervinientes y las actuaciones realizadas'],
  '23-69': ['Art. 2.3', 'Servicios de seguridad privada: las acciones llevadas a cabo por los prestadores de servicios de seguridad privada para materializar las actividades de seguridad privada'],
  '23-127': ['Art. 2.3', 'Servicios de seguridad privada: las acciones llevadas a cabo por los prestadores de servicios de seguridad privada para materializar las actividades de seguridad privada'],
  '23-92': ['Art. 28.5', 'Acreditar los conocimientos, formación y aptitudes equivalentes a los exigidos en España para el ejercicio de las profesiones relacionadas con la seguridad privada'],
  '23-93': ['Art. 2.6', 'Prestadores de servicios de seguridad privada: las empresas de seguridad privada, los despachos de detectives y el personal habilitado para el ejercicio de funciones de seguridad privada'],
  '23-95': ['Art. 36.1.b', 'La identificación, análisis y evaluación de situaciones de riesgo que puedan afectar a la vida e integridad de las personas y al patrimonio'],
  '23-108': ['Art. 11.1', 'el personal de seguridad privada, las empresas de seguridad privada y los despachos de detectives privados, así como delegaciones y sucursales, los centros de formación del personal de seguridad privada y las centrales receptoras de alarma de uso propio'],
  '23-121': ['Art. 31', 'Se considerarán agresiones y desobediencias a agentes de la autoridad las que se cometan contra el personal de seguridad privada, debidamente identificado, cuando desarrolle actividades de seguridad privada en cooperación y bajo el mando de las Fuerzas y Cuerpos de Seguridad'],
};
for (const k in CITAS) if (!nz(OF).includes(nz(CITAS[k][1]))) console.log('⚠ CITA MANUAL NO LITERAL', k);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const BS = String.fromCharCode(92);
const limpia = s => String(s).replace(/\s*\*\s*$/, '').trim();
const dry = process.argv.includes('--dry');
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const bajas = [];
for (let k = 1; k <= 132; k++) {
  const id = '23-' + k, key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, e2 = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e2) e2 = false; else if (c === BS) e2 = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1)); const ed = EDITS[id] || {};
  q.opciones = q.opciones.map(limpia);
  if (ed.p) q.pregunta = Array.isArray(ed.p) ? q.pregunta.replace(ed.p[0], ed.p[1]) : ed.p;
  if (ed.o) for (const kk in ed.o) q.opciones[+kk] = ed.o[kk];
  if (ed.c !== undefined) q.correcta = ed.c;
  const ok = q.opciones[q.correcta];
  const stem = q.pregunta.replace(/^Ley 5\/2014[^.]*\.\s*/, '');
  const gen = /^(todas|ninguna|a y b|las opciones)/i.test(ok) || ok.length < 28;
  const b = mejor(gen ? [stem, ok] : [ok]);
  if ((!b || b.sc < 0.35) && !CITAS[id]) bajas.push(id + ' ' + (b ? b.sc.toFixed(2) : '–') + ' · ' + ok.slice(0, 60));
  const cita = CITAS[id] ? CITAS[id][1] : (b ? b.s.t : null), art = CITAS[id] ? CITAS[id][0] : (b ? b.s.art : '');
  const inc = /incorrecta/i.test(q.pregunta);
  q.explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${esc(ok.replace(/\.$/, ''))}</mark></span><span class="ref-norma">${art ? art + ' · ' : ''}${NORMA}</span>${cita ? `<span class="ref-concepto">"${esc(cita)}"</span>` : ''}${inc ? 'Es la opción incorrecta: altera el texto de la ley.' : ''}`;
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
if (process.argv.includes('--bajas') || dry) console.log('Confianza baja:\n  ' + bajas.join('\n  '));
if (!dry) fs.writeFileSync(FILE, s);
console.log((dry ? '[dry] ' : '') + 'corregidas', n, 'de 132 · confianza baja', bajas.length);
