// Librería de las preguntas IA del Tema 26 (Estatuto del Personal de la Guardia Civil: LO 11/2007, LO 12/2007, Ley 29/2014, Orden PRE/1983/2012, protocolos de acoso y violencia; sobre lo subrayado en mi PDF). Normas k: lo11, lo12, l29, ord, acl, acs, vg.
// 5 por página de MI PDF subrayado, bloques de 10 páginas). La usan preguntas-t25r-bNN.js. Fuente del subrayado: prompts/temario-limpio/tema26/mio-subrayado.txt (texto entre «…»). Lo sin subrayar no se pregunta.
// run({bloque, Q}) — Q: {k, a, r, e, o, t, p, d?, c?, v?}:
//   k = norma (clave de NORMAS), a = «art. X.Y»/apartado (solo para la explicación), r = rúbrica, e = enunciado SIN número de artículo/apartado,
//   o = 4 opciones (la correcta va PRIMERA; la librería la recoloca), t = cita literal, p = por qué fallan las otras, d = 'media' | 'dificil',
//   v = 'img' si la cita sale de una norma que solo trae mi PDF (NTF-2/2025, Resolución 2005, Acuerdo CGPJ…; se verifica de forma aproximada contra su OCR).
// ids: 26-ia-(1001 + 100·(bloque−1)) …
// Uso: node prompts/herramientas/preguntas-t25r-bNN.js --json <salida.json>   (genera y verifica; no toca la app)
//      node prompts/herramientas/preguntas-t25r-bNN.js                         (inserta en test-oficial-conocimiento.html)
const fs = require('fs');
const F = 'test-oficial-conocimiento.html', L = 'ABCD', BS = String.fromCharCode(92);
const TD = 'prompts/temario-limpio/tema26/';
const NORMAS = {
  lo11: ['Ley Orgánica 11/2007, de 22 de octubre, reguladora de los derechos y deberes de los miembros de la Guardia Civil', 'Ley Orgánica 11/2007, reguladora de los derechos y deberes de los miembros de la Guardia Civil', 'Ley Orgánica 11/2007, de Derechos y Deberes de los miembros de la Guardia Civil'],
  lo12: ['Ley Orgánica 12/2007, de 22 de octubre, del régimen disciplinario de la Guardia Civil', 'Ley Orgánica 12/2007, del régimen disciplinario de la Guardia Civil', 'Ley Orgánica 12/2007, del Régimen Disciplinario de la Guardia Civil'],
  l29: ['Ley 29/2014, de 28 de noviembre, de Régimen del Personal de la Guardia Civil', 'Ley 29/2014, de Régimen del Personal de la Guardia Civil', 'Ley 29/2014, de Régimen del Personal de la Guardia Civil'],
  ord: ['Orden PRE/1983/2012, de 14 de septiembre, por la que se declaran de aplicación a la Guardia Civil diversas normas del ordenamiento militar sobre mando, disciplina y régimen interior', 'Orden PRE/1983/2012, normas militares aplicables a la Guardia Civil', 'Orden PRE/1983/2012, de aplicación a la Guardia Civil de normas militares sobre mando, disciplina y régimen interior'],
  acl: ['Resolución de 22 de julio de 2019, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación frente al acoso laboral en la Guardia Civil', 'Protocolo de actuación frente al acoso laboral en la Guardia Civil', 'Protocolo de actuación frente al acoso laboral en la Guardia Civil'],
  acs: ['Resolución de 22 de julio de 2019, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación frente al acoso sexual y al acoso por razón de sexo, identidad u orientación sexual en la Guardia Civil', 'Protocolo de actuación frente al acoso sexual y por razón de sexo en la Guardia Civil', 'Protocolo de actuación frente al acoso sexual y por razón de sexo en la Guardia Civil'],
  vg: ['Resolución de 6 de julio de 2021, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación ante situaciones de violencia sobre la mujer que afecten a personal de la Guardia Civil', 'Protocolo de actuación ante situaciones de violencia sobre la mujer que afecten a personal de la Guardia Civil', 'Protocolo de actuación ante situaciones de violencia sobre la mujer en la Guardia Civil'],
};
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.replace(/=====PAG \d+ ?=====|\[\[pag \d+\]\]/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
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
    return { id: '26-ia-' + (ini + i), pregunta: `${nom}. ${q.r ? q.r + '. ' : ''}${q.e}`, opciones: ops, correcta: c, dificultad: q.d === 'dificil' ? 'dificil' : 'media', explicacion, apartado: q.ap || apartado };
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
  const PURGA = '(function(){/* purga IA tema 26 */const S=window.__seedIdsIA||{};const P=(state.preguntasIA||{})[26];if(!P)return;const n=P.length;state.preguntasIA[26]=P.filter(q=>!(q&&/^26-ia-\\d+$/.test(q.id)&&!S[q.id]));state.preguntasIA[26].length!==n&&saveState()})();';
  if (!s.includes('/* purga IA tema 26 */')) { const a = s.indexOf('(function(){/* purga IA tema 25 */'); if (a < 0) throw new Error('sin ancla para la purga'); s = s.slice(0, a) + PURGA + s.slice(a); }
  const blk = '(function(){const seed=' + JSON.stringify(ia) + ';syncSeedIA(26,seed)})();';
  const yaIni = s.indexOf('{"id":"' + ia[0].id + '"');
  if (yaIni >= 0) { const a = s.lastIndexOf('(function(){const seed=[', yaIni); const b = s.indexOf(';syncSeedIA(26,seed)})();', yaIni) + ';syncSeedIA(26,seed)})();'.length; s = s.slice(0, a) + blk + s.slice(b); }
  else { const p = s.indexOf('(function(){/* purga IA tema 26 */'); s = s.slice(0, p) + blk + s.slice(p); }
  fs.writeFileSync(F, s);
  console.log('bloque', bloque, '· IA nuevas', ia.length, '(' + ia[0].id + ' → ' + ia[ia.length - 1].id + ')');
};
