// Librería de las preguntas IA del Tema 3 (estilo examen oficial, 5 por página). La usan preguntas-t3-bNN.js.
// run({bloque, Q}) — Q: preguntas {k, a, r, e, o, c?, t, p}:
//   k = norma (tue | tfue), a = «art. X.Y» (para la cita), r = «Artículo X. Rúbrica», e = enunciado,
//   o = 4 opciones (si no hay c, la correcta va PRIMERO y la librería la recoloca para equilibrar A/B/C/D),
//   t = cita literal del temario oficial, p = por qué fallan las otras.
// ids: 3-ia-(1001 + 50·(bloque−1)) …  ·  La primera ejecución BORRA TODAS las IA antiguas del tema (ids < 1000),
// quita sus bloques semilla y deja la purga de localStorage («purga IA tema 3») al final de los bloques nuevos.
// Uso: node preguntas-t3-bNN.js --json <salida.json>   (genera y verifica las citas; no toca la app)
//      node preguntas-t3-bNN.js                         (inserta en test-oficial-conocimiento.html)
const fs = require('fs'), path = require('path');
const F = 'test-oficial-conocimiento.html', L = 'ABCD', BS = String.fromCharCode(92);
const NORMAS = {
  tue: ['Tratado de la Unión Europea', 'el TUE'],
  tfue: ['Tratado de Funcionamiento de la Unión Europea', 'el TFUE'] };
const PREF = {};
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
exports.run = function ({ bloque, Q, texto = 'prompts/temario-limpio/tema3/oficial-paginas.txt', arg = process.argv.slice(2) }) {
  const ini = 1001 + 50 * (bloque - 1);
  const uso = [0, 0, 0, 0]; Q.forEach(q => { if (q.c !== null && q.c !== undefined) uso[q.c]++; });
  const ia = Q.map((q, i) => {
    if (!NORMAS[q.k]) throw new Error('norma desconocida ' + q.k + ' en ' + i);
    if (!q.o || q.o.length !== 4) throw new Error('la pregunta ' + i + ' no tiene 4 opciones');
    let ops = q.o.slice(), c = q.c;
    if (c === null || c === undefined) { const ok = ops.shift(); c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++; }
    const [nom, corta] = NORMAS[q.k];
    const ref = `${q.a} de ${corta}`;
    const explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ops[c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${ref}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>. ${esc(q.p)} <em style="color:var(--texto-gris)">(Pregunta generada por IA)</em>`;
    return { id: '3-ia-' + (ini + i), pregunta: `${PREF[q.k] || nom}. ${q.r}. ${q.e}`, opciones: ops, correcta: c, dificultad: 'media', explicacion, apartado: nom };
  });
  if (ia.length > 50) throw new Error('más de 50 preguntas en el bloque');
  // verificación de citas contra el texto oficial extraído (PyMuPDF)
  const of = texto && fs.existsSync(texto) ? nrm(fs.readFileSync(texto, 'utf8')) : null;
  const malas = [], dup = new Set(), sinOk = [];
  Q.forEach((q, i) => {
    if (of && !of.includes(nrm(q.t))) malas.push(ia[i].id + ' · ' + q.t.slice(0, 90));
    const op = ia[i].opciones.map(nrm); if (new Set(op).size < 4) dup.add(ia[i].id);
    const ok = nrm(ia[i].opciones[ia[i].correcta].replace(/\.$/, ''));
    if (!/incorrecta|todas|correctas|incorrectas|ninguna/i.test(q.e + ia[i].opciones.join(' ')) && of && !nrm(q.t).includes(ok)) sinOk.push(ia[i].id + ' · ' + ia[i].opciones[ia[i].correcta].slice(0, 70));
  });
  if (arg[0] === '--json') {
    fs.writeFileSync(arg[1], JSON.stringify(ia, null, 1));
    console.log(ia.length, 'preguntas · letras', JSON.stringify(uso), '· ids', ia[0].id, '→', ia[ia.length - 1].id);
    if (!of) console.log('(sin texto oficial para verificar citas)');
    if (malas.length) console.log('✗ CITAS QUE NO ESTÁN LITERALES EN EL OFICIAL:\n  ' + malas.join('\n  '));
    if (dup.size) console.log('✗ opciones repetidas en', [...dup].join(', '));
    if (sinOk.length) console.log('· (revisar) la correcta no aparece literal en la cita:\n  ' + sinOk.join('\n  '));
    if (!malas.length && !dup.size) console.log('✓ citas literales verificadas');
    return;
  }
  if (malas.length || dup.size) throw new Error('hay citas no literales u opciones repetidas: ejecuta con --json');
  let s = fs.readFileSync(F, 'utf8');
  const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
  const PURGA = '(function(){/* purga IA tema 3 */const S=window.__seedIdsIA||{};const P=(state.preguntasIA||{})[3];if(!P)return;const n=P.length;state.preguntasIA[3]=P.filter(q=>!(q&&/^3-ia-\\d+$/.test(q.id)&&!S[q.id]));state.preguntasIA[3].length!==n&&saveState()})();';
  // 1) borrar TODAS las IA antiguas (ids < 1000) y sus bloques semilla; dejar la purga en su sitio
  let borradas = 0;
  if (!s.includes('/* purga IA tema 3 */')) {
    const m = ';syncSeedIA(3,seed)})();'; const primero = s.indexOf(m); if (primero < 0) throw new Error('no hay bloques semilla del tema 3');
    const anc = s.lastIndexOf('(function(){const seed=[', primero);
    let pos = 0;
    while ((pos = s.indexOf('{"id":"3-ia-', pos)) >= 0) {
      const num = +s.slice(pos + 12, s.indexOf('"', pos + 12)); const r = rango('3-ia-' + num);
      if (!r || num >= 1000) { pos = r ? r[1] : pos + 1; continue; }
      let [a, b] = r; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); borradas++; pos = a;
    }
    s = s.replace(/\(function\(\)\{const seed=\[\];syncSeedIA\(3,seed\)\}\)\(\);/g, '');
    s = s.slice(0, anc) + PURGA + s.slice(anc);
  }
  // 2) insertar el bloque nuevo justo antes de la purga (o sustituirlo si ya estaba)
  const blk = '(function(){const seed=' + JSON.stringify(ia) + ';syncSeedIA(3,seed)})();';
  const yaIni = s.indexOf('{"id":"' + ia[0].id + '"');
  if (yaIni >= 0) { const a = s.lastIndexOf('(function(){const seed=[', yaIni); const b = s.indexOf(';syncSeedIA(3,seed)})();', yaIni) + ';syncSeedIA(3,seed)})();'.length; s = s.slice(0, a) + blk + s.slice(b); }
  else { const p = s.indexOf('(function(){/* purga IA tema 3 */'); s = s.slice(0, p) + blk + s.slice(p); }
  fs.writeFileSync(F, s);
  console.log('IA antiguas borradas', borradas, '· bloque', bloque, '· IA nuevas', ia.length, '(' + ia[0].id + ' → ' + ia[ia.length - 1].id + ')');
};
