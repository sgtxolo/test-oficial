// Librería de las preguntas IA del Tema 10 (estilo examen oficial, media-alta/difícil, ≈5 por página ajustado al subrayado). La usan preguntas-t2-bNN.js.
// run({bloque, Q}) — Q: preguntas {k, a, r, e, o, t, p, d?, c?}:
//   k = norma (tue | tfue), a = «art. X.Y» (solo para la explicación), r = rúbrica del artículo (como en el oficial),
//   e = enunciado SIN número de artículo (texto casi literal o frase a completar), o = 4 opciones (la correcta va PRIMERA; la librería la recoloca),
//   t = cita literal del temario oficial, p = por qué fallan las otras, d = 'media' (por defecto) | 'dificil'.
// ids: 10-ia-(10001 + 150·(bloque−1)) … (hasta 100 por bloque). La primera ejecución BORRA TODAS las IA antiguas del tema (ids < 10000),
// quita sus bloques semilla y deja la purga de localStorage («purga IA tema 10») al final de los bloques nuevos.
// Uso: node prompts/herramientas/preguntas-t2-bNN.js --json <salida.json>   (genera y verifica las citas; no toca la app)
//      node prompts/herramientas/preguntas-t2-bNN.js                         (inserta en test-oficial-conocimiento.html)
// Después de insertar: node prompts/herramientas/mapa-preguntas.js && node prompts/herramientas/marcas-preguntas.js
const fs = require('fs');
const F = 'test-oficial-conocimiento.html', L = 'ABCD', BS = String.fromCharCode(92);
const TEXTO = 'prompts/temario-limpio/tema10/cc.txt';
const NORMAS = {
  cc: ['Código Civil', 'Código Civil', 'De las Personas'] };
const APART = a => (/^art. [1-7]/.test(a) ? 'Título Preliminar: Normas Jurídicas, su Aplicación y Eficacia' : 'De las Personas');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
exports.run = function ({ bloque, Q, arg = process.argv.slice(2) }) {
  const ini = 10001 + 150 * (bloque - 1);
  if (Q.length > 150) throw new Error('más de 150 preguntas en el bloque');
  const uso = [0, 0, 0, 0]; Q.forEach(q => { if (q.c !== null && q.c !== undefined) uso[q.c]++; });
  // la correcta nunca la más larga: si lo es (con la correcta en o[0]), se alarga la incorrecta más larga con una coletilla verosímil
  const COLA = [', en los términos que establezca el propio Reglamento', ', salvo que el Estado miembro afectado disponga otra cosa', ', conforme al procedimiento que se establezca reglamentariamente', ', sin perjuicio de lo dispuesto en el Derecho nacional'];
  let ci = 0;
  Q.forEach(q => { if (!q.o || q.o.length !== 4 || (q.c !== null && q.c !== undefined)) return; let g = 0;
    while (g++ < 3 && q.o[0].length >= Math.max(...q.o.slice(1).map(x => x.length))) { const j = [1, 2, 3].sort((x, y) => q.o[y].length - q.o[x].length)[0]; q.o[j] = q.o[j].replace(/[.]$/, '') + COLA[ci++ % COLA.length] + '.'; } });
  const ia = Q.map((q, i) => {
    if (!NORMAS[q.k]) throw new Error('norma desconocida ' + q.k + ' en ' + i);
    if (!q.o || q.o.length !== 4) throw new Error('la pregunta ' + i + ' no tiene 4 opciones');
    if (/art[íi]culo\s*\d|art\.\s*\d|apartado\s*\d/i.test(q.e)) throw new Error('el enunciado de la pregunta ' + i + ' cita nº de artículo/apartado: ' + q.e.slice(0, 80));
    let ops = q.o.slice(), c = q.c;
    if (c === null || c === undefined) { const ok = ops.shift(); c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++; }
    const [nom, corta, pref] = NORMAS[q.k];
    const ref = `${q.a} de ${corta}`;
    const explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ops[c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${ref}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>. ${esc(q.p || "")} <em style="color:var(--texto-gris)">(Pregunta generada por IA)</em>`;
    return { id: '10-ia-' + (ini + i), pregunta: `${nom}. ${q.r ? q.r + '. ' : ''}${q.e}`, opciones: ops, correcta: c, dificultad: q.d === 'dificil' ? 'dificil' : 'media', explicacion, apartado: q.ap || APART(q.a) };
  });
  // verificación de citas contra el texto oficial extraído (pdftotext)
  const of = fs.existsSync(TEXTO) ? nrm(fs.readFileSync(TEXTO, 'utf8') + (fs.existsSync(TEXTO.replace('oficial-paginas', 'upd0330')) ? fs.readFileSync(TEXTO.replace('oficial-paginas', 'upd0330'), 'utf8') : '') + (fs.existsSync(TEXTO.replace('oficial-paginas', 'upd0930')) ? fs.readFileSync(TEXTO.replace('oficial-paginas', 'upd0930'), 'utf8') : '')) : null;
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
  let s = fs.readFileSync(F, 'utf8');
  const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
  const PURGA = '(function(){/* purga IA tema 10 */const S=window.__seedIdsIA||{};const P=(state.preguntasIA||{})[10];if(!P)return;const n=P.length;state.preguntasIA[10]=P.filter(q=>!(q&&/^10-ia-\\d+$/.test(q.id)&&!S[q.id]));state.preguntasIA[10].length!==n&&saveState()})();';
  // 1) borrar TODAS las IA antiguas y sus bloques semilla; dejar la purga en su sitio
  let borradas = 0;
  const hayViejas = [...s.matchAll(/\{"id":"10-ia-(\d+)"/g)].some(m => +m[1] < 10000), sinPurga = !s.includes('/* purga IA tema 10 */');
  if (hayViejas || sinPurga) {
    const m = ';syncSeedIA(10,seed)})();'; const primero = s.indexOf(m); let anc = primero < 0 ? s.indexOf('(function(){/* purga IA tema 7 */') : s.lastIndexOf('(function(){const seed=[', primero); if (anc < 0) throw new Error('sin ancla para la purga');
    let pos = 0;
    while ((pos = s.indexOf('{"id":"10-ia-', pos)) >= 0) {
      const num = +s.slice(pos + 13, s.indexOf('"', pos + 13)); const r = rango('10-ia-' + num);
      if (!r || num >= 10000) { pos = r ? r[1] : pos + 1; continue; }
      let [a, b] = r; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); borradas++; pos = a;
    }
    s = s.replace(/\(function\(\)\{const seed=\[\];syncSeedIA\(3,seed\)\}\)\(\);/g, '');
    if (primero < 0) anc = s.indexOf('(function(){/* purga IA tema 7 */'); if (sinPurga) s = s.slice(0, anc) + PURGA + s.slice(anc);
  }
  // 2) insertar el bloque nuevo justo antes de la purga (o sustituirlo si ya estaba)
  const blk = '(function(){const seed=' + JSON.stringify(ia) + ';syncSeedIA(10,seed)})();';
  const yaIni = s.indexOf('{"id":"' + ia[0].id + '"');
  if (yaIni >= 0) { const a = s.lastIndexOf('(function(){const seed=[', yaIni); const b = s.indexOf(';syncSeedIA(10,seed)})();', yaIni) + ';syncSeedIA(10,seed)})();'.length; s = s.slice(0, a) + blk + s.slice(b); }
  else { const p = s.indexOf('(function(){/* purga IA tema 10 */'); s = s.slice(0, p) + blk + s.slice(p); }
  fs.writeFileSync(F, s);
  console.log('IA antiguas borradas', borradas, '· bloque', bloque, '· IA nuevas', ia.length, '(' + ia[0].id + ' → ' + ia[ia.length - 1].id + ')');
};
