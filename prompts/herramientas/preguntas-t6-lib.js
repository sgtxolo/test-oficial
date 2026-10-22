// Librería de las preguntas IA del Tema 6 (estilo examen oficial, media-alta/difícil, 5 por página del temario oficial). La usan preguntas-t6-bNN.js.
// run({bloque, Q}) — Q: preguntas {k, a, r, e, o, t, p, d?, c?}:
//   k = norma (lo4 | l12), a = «art. X.Y» (solo para la explicación), r = rúbrica del artículo (como en el oficial),
//   e = enunciado SIN número de artículo (texto casi literal o frase a completar), o = 4 opciones (la correcta va PRIMERA; la librería la recoloca),
//   t = cita literal del temario oficial, p = por qué fallan las otras, d = 'media' (por defecto) | 'dificil'.
// ids: 6-ia-(1001 + 100·(bloque−1)) … (hasta 100 por bloque). La primera ejecución BORRA TODAS las IA antiguas del tema (ids < 1000),
// quita sus bloques semilla y deja la purga de localStorage («purga IA tema 6») tras los bloques nuevos.
// Uso: node prompts/herramientas/preguntas-t6-bNN.js --json <salida.json>   (genera y verifica las citas; no toca la app)
//      node prompts/herramientas/preguntas-t6-bNN.js                         (inserta en test-oficial-conocimiento.html)
// Después de insertar: node prompts/herramientas/mapa-preguntas.js && node prompts/herramientas/marcas-preguntas.js
const fs = require('fs');
const F = 'test-oficial-conocimiento.html', L = 'ABCD', BS = String.fromCharCode(92);
const TEXTO = 'prompts/temario-limpio/tema6/lo4.txt';
const NORMAS = {
  lo4: ['Ley Orgánica 4/2000, de 11 de enero, sobre derechos y libertades de los extranjeros en España y su integración social', 'la LO 4/2000', 'Ley Orgánica 4/2000, de 11 de enero, sobre derechos y libertades de los extranjeros en España y su integración social'],
  l12: ['Ley 12/2009, de 30 de octubre, reguladora del derecho de asilo y de la protección subsidiaria', 'la Ley 12/2009', 'Ley 12/2009, de 30 de octubre, reguladora del derecho de asilo y de la protección subsidiaria'] };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
exports.run = function ({ bloque, Q, arg = process.argv.slice(2) }) {
  const ini = 1001 + 100 * (bloque - 1);
  if (Q.length > 100) throw new Error('más de 100 preguntas en el bloque');
  const uso = [0, 0, 0, 0]; Q.forEach(q => { if (q.c !== null && q.c !== undefined) uso[q.c]++; });
  // la correcta nunca la más larga: se mide y se avisa (no se añaden coletillas automáticas: delatan la opción falsa)
  const COLA = [', en los términos que se establezcan reglamentariamente', ', salvo que el órgano competente acuerde otra cosa de forma motivada', ', conforme al procedimiento que reglamentariamente se establezca', ', sin perjuicio de lo que establezcan los tratados internacionales'];
  let ci = 0;
  const ia = Q.map((q, i) => {
    if (!NORMAS[q.k]) throw new Error('norma desconocida ' + q.k + ' en ' + i);
    if (!q.o || q.o.length !== 4) throw new Error('la pregunta ' + i + ' no tiene 4 opciones');
    if (/art[íi]culo\s*\d|art\.\s*\d|apartado\s*\d/i.test(q.e)) throw new Error('el enunciado de la pregunta ' + i + ' cita nº de artículo/apartado: ' + q.e.slice(0, 80));
    let ops = q.o.slice(), c = q.c;
    if (c === null || c === undefined) { const ok = ops.shift(); c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++; }
    const [nom, corta, pref] = NORMAS[q.k];
    const ref = `${q.a} de ${corta}`;
    const explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ops[c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${ref}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>. ${esc(q.p || "")} <em style="color:var(--texto-gris)">(Pregunta generada por IA)</em>`;
    return { id: '6-ia-' + (ini + i), pregunta: `${nom}. ${q.r ? q.r + '. ' : ''}${q.e}`, opciones: ops, correcta: c, dificultad: q.d === 'dificil' ? 'dificil' : 'media', explicacion, apartado: pref };
  });
  // verificación de citas contra el texto oficial extraído (pdftotext)
  const of = fs.existsSync(TEXTO) ? nrm(fs.readFileSync(TEXTO, 'utf8') + ' ' + fs.readFileSync('prompts/temario-limpio/tema6/l12.txt', 'utf8')) : null;
  const malas = [], dup = new Set(), sinOk = [];
  let may = 0;
  Q.forEach((q, i) => {
    if (of && !of.includes(nrm(q.t))) malas.push(ia[i].id + ' · ' + q.t.slice(0, 90));
    const op = ia[i].opciones.map(nrm); if (new Set(op).size < 4) dup.add(ia[i].id);
    const ok = nrm(ia[i].opciones[ia[i].correcta].replace(/\.$/, ''));
    if (!/incorrecta|todas|correctas|incorrectas|ninguna/i.test(q.e + ia[i].opciones.join(' ')) && of && !nrm(q.t).includes(ok)) sinOk.push(ia[i].id + ' · ' + ia[i].opciones[ia[i].correcta].slice(0, 70));
    const len = ia[i].opciones.map(x => x.length), mx = Math.max(...len);
    const otras = len.filter((x, j) => j !== ia[i].correcta); if (len[ia[i].correcta] > Math.max(...otras) * 1.15) may++;
  });
  if (arg[0] === '--json') {
    fs.writeFileSync(arg[1], JSON.stringify(ia, null, 1));
    console.log(ia.length, 'preguntas · letras', JSON.stringify(uso), '· ids', ia[0].id, '→', ia[ia.length - 1].id, '· correcta >15 % más larga que cualquier otra en', Math.round(100 * may / ia.length) + ' % (máx. 35)');
    if (!of) console.log('(sin texto oficial para verificar citas)');
    if (malas.length) console.log('✗ CITAS QUE NO ESTÁN LITERALES EN EL OFICIAL:\n  ' + malas.join('\n  '));
    if (dup.size) console.log('✗ opciones repetidas en', [...dup].join(', '));
    if (sinOk.length) console.log('· (revisar) la correcta no aparece literal en la cita:\n  ' + sinOk.join('\n  '));
    if (may / ia.length > 0.35) console.log('✗ SESGO: la correcta es la más larga en demasiadas preguntas');
    if (!malas.length && !dup.size) console.log('✓ citas literales verificadas');
    return;
  }
  if (malas.length || dup.size) throw new Error('hay citas no literales u opciones repetidas: ejecuta con --json');
  // IA retiradas por no tener sitio en el esquema (apartados que el esquema omite): tema6/mapa-fijo-gen.js las lista
  const QUITADAS = new Set(JSON.parse(fs.readFileSync('prompts/herramientas/tema6/ia-quitadas-t6.json', 'utf8')));
  for (let i = ia.length - 1; i >= 0; i--) if (QUITADAS.has(ia[i].id)) ia.splice(i, 1);
  let s = fs.readFileSync(F, 'utf8');
  const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
  const PURGA = '(function(){/* purga IA tema 6 */const S=window.__seedIdsIA||{};const P=(state.preguntasIA||{})[6];if(!P)return;const n=P.length;state.preguntasIA[6]=P.filter(q=>!(q&&/^6-ia-\\d+$/.test(q.id)&&!S[q.id]));state.preguntasIA[6].length!==n&&saveState()})();';
  const FIN = ';syncSeedIA(6,seed)})();';
  // 1) borrar TODAS las IA antiguas (ids < 1000) y sus bloques semilla; dejar la purga donde estaba el primero
  let borradas = 0;
  if (!s.includes('/* purga IA tema 6 */')) {
    const primero = s.indexOf(FIN); if (primero < 0) throw new Error('sin bloques semilla del tema 6');
    const anc = s.lastIndexOf('(function(){const seed=[', primero);
    let pos = 0;
    while ((pos = s.indexOf('{"id":"6-ia-', pos)) >= 0) {
      const num = +s.slice(pos + 12, s.indexOf('"', pos + 12)); const r = rango('6-ia-' + num);
      if (!r || num >= 1000) { pos = r ? r[1] : pos + 1; continue; }
      let [a, b] = r; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); borradas++; pos = a;
    }
    s = s.replace(/\(function\(\)\{const seed=\[\];syncSeedIA\(6,seed\)\}\)\(\);/g, '');
    s = s.slice(0, anc) + PURGA + s.slice(anc);
  }
  // 2) insertar el bloque nuevo justo antes de la purga (o sustituirlo si ya estaba)
  const blk = '(function(){const seed=' + JSON.stringify(ia) + FIN;
  const yaIni = s.indexOf('{"id":"' + ia[0].id + '"');
  if (yaIni >= 0) { const a = s.lastIndexOf('(function(){const seed=[', yaIni); const b = s.indexOf(FIN, yaIni) + FIN.length; s = s.slice(0, a) + blk + s.slice(b); }
  else { const p = s.indexOf('(function(){/* purga IA tema 6 */'); s = s.slice(0, p) + blk + s.slice(p); }
  fs.writeFileSync(F, s);
  console.log('IA antiguas borradas', borradas, '· bloque', bloque, '· IA nuevas', ia.length, '(' + ia[0].id + ' → ' + ia[ia.length - 1].id + ')');
};
