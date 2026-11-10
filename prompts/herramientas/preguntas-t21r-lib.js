// Librería de las preguntas IA del Tema 21 (Derecho Procesal Penal II, normas complementarias; sobre lo subrayado en mi PDF; estilo examen oficial, media-alta/difícil,
// 5 por página de MI PDF subrayado, bloques de 10 páginas). La usan preguntas-t21r-bNN.js. Fuente del subrayado: prompts/temario-limpio/tema21/mio-subrayado.txt (texto entre «…»). Lo sin subrayar no se pregunta.
// run({bloque, Q}) — Q: {k, a, r, e, o, t, p, d?, c?, v?}:
//   k = norma (clave de NORMAS), a = «art. X.Y»/apartado (solo para la explicación), r = rúbrica, e = enunciado SIN número de artículo/apartado,
//   o = 4 opciones (la correcta va PRIMERA; la librería la recoloca), t = cita literal, p = por qué fallan las otras, d = 'media' | 'dificil',
//   v = 'img' si la cita sale de una norma que solo trae mi PDF (NTF-2/2025, Resolución 2005, Acuerdo CGPJ…; se verifica de forma aproximada contra su OCR).
// ids: 21-ia-(1001 + 100·(bloque−1)) …
// Uso: node prompts/herramientas/preguntas-t21r-bNN.js --json <salida.json>   (genera y verifica; no toca la app)
//      node prompts/herramientas/preguntas-t21r-bNN.js                         (inserta en test-oficial-conocimiento.html)
const fs = require('fs');
const F = 'test-oficial-conocimiento.html', L = 'ABCD', BS = String.fromCharCode(92);
const TD = 'prompts/temario-limpio/tema21/';
const NORMAS = {
  habeas: ['Ley Orgánica 6/1984, de 24 de mayo, reguladora del procedimiento de Habeas Corpus', 'LO 6/1984 Habeas Corpus', 'Ley Orgánica 6/1984, de 24 de mayo, reguladora del procedimiento de Habeas Corpus'],
  militar: ['Ley Orgánica 2/1989, de 13 de abril, Procesal Militar', 'LO 2/1989 Procesal Militar', 'Ley Orgánica 2/1989, de 13 de abril, Procesal Militar'],
  testigos: ['Ley Orgánica 19/1994, de 23 de diciembre, de Protección a Testigos y Peritos en Causas Criminales', 'LO 19/1994 Testigos y Peritos', 'Ley Orgánica 19/1994, de 23 de diciembre, de Protección a Testigos y Peritos en Causas Criminales'],
  lo3_2003: ['Ley Orgánica 3/2003, de 21 de mayo, complementaria de la Ley reguladora de los equipos conjuntos de investigación penal', 'LO 3/2003', 'Ley Orgánica 3/2003, de 21 de mayo, complementaria de la Ley reguladora de los equipos conjuntos de investigación penal'],
  adn: ['Ley Orgánica 10/2007, de 8 de octubre, reguladora de la base de datos policial sobre identificadores obtenidos a partir del ADN', 'LO 10/2007 ADN', 'Ley Orgánica 10/2007, de 8 de octubre, reguladora de la base de datos policial sobre identificadores obtenidos a partir del ADN'],
  extradicion: ['Ley 4/1985, de 21 de marzo, de Extradición Pasiva', 'Ley 4/1985 Extradición pasiva', 'Ley 4/1985, de 21 de marzo, de Extradición Pasiva'],
  eci: ['Ley 11/2003, de 21 de mayo, reguladora de los equipos conjuntos de investigación penal en el ámbito de la Unión Europea', 'Ley 11/2003 Equipos conjuntos', 'Ley 11/2003, de 21 de mayo, reguladora de los equipos conjuntos de investigación penal en el ámbito de la Unión Europea'],
  datos: ['Ley 25/2007, de 18 de octubre, de conservación de datos relativos a las comunicaciones electrónicas y a las redes públicas de comunicaciones', 'Ley 25/2007 Conservación de datos', 'Ley 25/2007, de 18 de octubre, de conservación de datos relativos a las comunicaciones electrónicas y a las redes públicas de comunicaciones'],
  reconocimiento: ['Ley 23/2014, de 20 de noviembre, de reconocimiento mutuo de resoluciones penales en la Unión Europea', 'Ley 23/2014 Reconocimiento mutuo', 'Ley 23/2014, de 20 de noviembre, de reconocimiento mutuo de resoluciones penales en la Unión Europea'],
  victima: ['Ley 4/2015, de 27 de abril, del Estatuto de la víctima del delito', 'Ley 4/2015 Estatuto de la víctima', 'Ley 4/2015, de 27 de abril, del Estatuto de la víctima del delito'],
  viena61: ['Convenio de Viena de 18 de abril de 1961, sobre Relaciones Diplomáticas', 'Convenio de Viena 1961', 'Convenio de Viena de 18 de abril de 1961, sobre Relaciones Diplomáticas'],
  viena63: ['Convenio de Viena de 24 de abril de 1963, sobre Relaciones Consulares', 'Convenio de Viena 1963', 'Convenio de Viena de 24 de abril de 1963, sobre Relaciones Consulares'],
  instruccion: ['Instrucción 1/2024, de la Secretaría de Estado de Seguridad, Procedimiento Integral de la Detención Policial', 'Instrucción 1/2024 SES', 'Instrucción 1/2024, de la Secretaría de Estado de Seguridad, Procedimiento Integral de la Detención Policial'],
  otra: ['Normas complementarias del Derecho Procesal Penal', 'Derecho Procesal Penal (II)', 'Derecho Procesal Penal (II)'],
};
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.replace(/=====PAG \d+=====|\[\[pag \d+\]\]/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
// cobertura aproximada (shingles de 9 caracteres) de una cita en el OCR de mi PDF
const cobertura = (cita, ocr) => { const c = nrm(cita); if (c.length < 20) return 1; let ok = 0, n = 0; for (let i = 0; i + 9 <= c.length; i += 3) { n++; if (ocr.includes(c.slice(i, i + 9))) ok++; } return ok / n; };
exports.run = function ({ bloque, Q, arg = process.argv.slice(2) }) {
  const ini = 1001 + 100 * (bloque - 1);
  if (Q.length > 100) throw new Error('más de 100 preguntas en el bloque');
  const uso = [0, 0, 0, 0]; Q.forEach(q => { if (q.c !== null && q.c !== undefined) uso[q.c]++; });
  const COLA = [', en los términos que se determinen reglamentariamente', ', salvo que la autoridad judicial disponga otra cosa', ', previo informe de la unidad policial competente', ', sin perjuicio de lo previsto en la normativa vigente'];
  let ci = 0;
  Q.forEach(q => { if (!q.o || q.o.length !== 4 || (q.c !== null && q.c !== undefined)) return; let g = 0;
    while (g++ < 3 && q.o[0].length >= Math.max(...q.o.slice(1).map(x => x.length))) { const j = [1, 2, 3].sort((x, y) => q.o[y].length - q.o[x].length)[0]; q.o[j] = q.o[j].replace(/[.]$/, '') + COLA[ci++ % COLA.length] + '.'; } });
  const ia = Q.map((q, i) => {
    if (!NORMAS[q.k]) throw new Error('norma desconocida ' + q.k + ' en ' + i);
    if (!q.o || q.o.length !== 4) throw new Error('la pregunta ' + i + ' no tiene 4 opciones');
    if (/art[íi]culo\s*\d|art\.\s*\d|apartado\s*\d/i.test(q.e)) throw new Error('el enunciado de la pregunta ' + i + ' cita nº de artículo/apartado: ' + q.e.slice(0, 80));
    let ops = q.o.slice(), c = q.c;
    if (c === null || c === undefined) { const ok = ops.shift(); c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++; }
    const [nom, corta, apartado] = NORMAS[q.k];
    const explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ops[c].replace(/\.$/, ''))}</mark></span><span class="ref-norma">${String(q.a).replace(/^art(?:[ií]culo|.)s*/i,"Art. ").replace(/^./,c=>c.toUpperCase())} · ${nom}</span><span class="ref-concepto">"${esc(q.t)}"</span>${esc(q.p || "")}`;
    return { id: '21-ia-' + (ini + i), pregunta: `${nom}. ${q.r ? q.r + '. ' : ''}${q.e}`, opciones: ops, correcta: c, dificultad: q.d === 'dificil' ? 'dificil' : 'media', explicacion, apartado: q.ap || apartado };
  });
  // verificación de citas: literal en el temario oficial limpio o, si viene de mi PDF (v:'img'), cobertura aproximada del OCR
  const of = nrm(fs.readFileSync(TD + 'oficial.txt', 'utf8')), ocr = nrm(fs.readFileSync(TD + 'mio-ocr.txt', 'utf8'));
  const malas = [], dup = new Set(), sinOk = [], aprox = [];
  let may = 0;
  Q.forEach((q, i) => {
    const lit = of.includes(nrm(q.t));
    if (!lit && q.v === 'man') aprox.push(ia[i].id + ' (leída en la imagen)'); else if (!lit) { const cv = cobertura(q.t, ocr); if (q.v === 'img' && cv >= 0.5) aprox.push(ia[i].id + ' ' + Math.round(cv * 100) + '%'); else malas.push(ia[i].id + ' · ' + q.t.slice(0, 90) + (q.v === 'img' ? ' (cobertura OCR ' + Math.round(cv * 100) + '%)' : '')); }
    const op = ia[i].opciones.map(nrm); if (new Set(op).size < 4) dup.add(ia[i].id);
    const ok = nrm(ia[i].opciones[ia[i].correcta].replace(/\.$/, ''));
    if (!/incorrecta|todas|correctas|incorrectas|ninguna/i.test(q.e + ia[i].opciones.join(' ')) && !nrm(q.t).includes(ok)) sinOk.push(ia[i].id + ' · ' + ia[i].opciones[ia[i].correcta].slice(0, 70));
    const len = ia[i].opciones.map(x => x.length); const otras = len.filter((x, j) => j !== ia[i].correcta); if (len[ia[i].correcta] > Math.max(...otras) * 1.15) may++;
  });
  if (arg[0] === '--json') {
    fs.writeFileSync(arg[1], JSON.stringify(ia, null, 1));
    console.log(ia.length, 'preguntas · letras', JSON.stringify(uso), '· ids', ia[0].id, '→', ia[ia.length - 1].id, '· correcta >15 % más larga que cualquier otra en', Math.round(100 * may / ia.length) + ' % (máx. 35)');
    if (aprox.length) console.log('· citas de MI PDF verificadas de forma aproximada (OCR):', aprox.join(', '));
    if (malas.length) console.log('✗ CITAS QUE NO ESTÁN LITERALES:\n  ' + malas.join('\n  '));
    if (dup.size) console.log('✗ opciones repetidas en', [...dup].join(', '));
    if (sinOk.length) console.log('· (revisar) la correcta no aparece literal en la cita:\n  ' + sinOk.join('\n  '));
    if (may / ia.length > 0.35) console.log('✗ SESGO: la correcta es la más larga en demasiadas preguntas');
    if (!malas.length && !dup.size) console.log('✓ citas verificadas');
    return;
  }
  if (malas.length || dup.size) throw new Error('hay citas no literales u opciones repetidas: ejecuta con --json');
  let s = fs.readFileSync(F, 'utf8');
  const PURGA = '(function(){/* purga IA tema 21 */const S=window.__seedIdsIA||{};const P=(state.preguntasIA||{})[21];if(!P)return;const n=P.length;state.preguntasIA[21]=P.filter(q=>!(q&&/^21-ia-\\d+$/.test(q.id)&&!S[q.id]));state.preguntasIA[21].length!==n&&saveState()})();';
  if (!s.includes('/* purga IA tema 21 */')) { const a = s.indexOf('(function(){/* purga IA tema 20 */'); if (a < 0) throw new Error('sin ancla para la purga'); s = s.slice(0, a) + PURGA + s.slice(a); }
  const blk = '(function(){const seed=' + JSON.stringify(ia) + ';syncSeedIA(21,seed)})();';
  const yaIni = s.indexOf('{"id":"' + ia[0].id + '"');
  if (yaIni >= 0) { const a = s.lastIndexOf('(function(){const seed=[', yaIni); const b = s.indexOf(';syncSeedIA(21,seed)})();', yaIni) + ';syncSeedIA(21,seed)})();'.length; s = s.slice(0, a) + blk + s.slice(b); }
  else { const p = s.indexOf('(function(){/* purga IA tema 21 */'); s = s.slice(0, p) + blk + s.slice(p); }
  fs.writeFileSync(F, s);
  console.log('bloque', bloque, '· IA nuevas', ia.length, '(' + ia[0].id + ' → ' + ia[ia.length - 1].id + ')');
};
