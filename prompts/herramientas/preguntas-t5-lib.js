// Librería de las preguntas IA del Tema 5 (estilo examen oficial, 5 por página CON SUBRAYADO del usuario). La usan preguntas-t5-bNN.js.
// run({bloque, Q}) — Q: preguntas {k, a, r, e, o, c?, t, p}:
//   k = norma (sis | vis | cv | r977 | eur | aec), a = «art. X.Y» (para la cita), r = «Artículo X. Rúbrica», e = enunciado,
//   o = 4 opciones (si no hay c, la correcta va PRIMERO y la librería la recoloca para equilibrar A/B/C/D),
//   t = cita literal del temario oficial, p = por qué fallan las otras.
// ids: 5-ia-(1001 + 50·(bloque−1)) …  ·  La primera ejecución BORRA TODAS las IA antiguas del tema (ids < 1000),
// quita sus bloques semilla y deja la purga de localStorage («purga IA tema 5») al final de los bloques nuevos.
// Uso: node preguntas-t3-bNN.js --json <salida.json>   (genera y verifica las citas; no toca la app)
//      node preguntas-t3-bNN.js                         (inserta en test-oficial-conocimiento.html)
const fs = require('fs'), path = require('path');
const F = 'test-oficial-conocimiento.html', L = 'ABCD', BS = String.fromCharCode(92);
const NORMAS = {
  sis: ['Reglamento (UE) 2018/1861, de 28 de noviembre de 2018, relativo al establecimiento, funcionamiento y utilización del Sistema de Información de Schengen (SIS) en el ámbito de las inspecciones fronterizas', 'el Reglamento (UE) 2018/1861', 'Reglamento (UE) 2018/1861 (SIS – inspecciones fronterizas)'],
  vis: ['Reglamento (CE) n.º 767/2008, de 9 de julio de 2008, sobre el Sistema de Información de Visados (VIS) y el intercambio de datos sobre visados para estancias de corta duración, visados para estancias de larga duración y permisos de residencia (Reglamento VIS)', 'el Reglamento VIS (texto consolidado)', 'Reglamento (CE) n.º 767/2008 (Reglamento VIS)'],
  cv: ['Reglamento (CE) n.º 810/2009, de 13 de julio de 2009, por el que se establece un Código comunitario sobre visados (Código de visados)', 'el Código de visados (texto consolidado)', 'Reglamento (CE) n.º 810/2009 (Código de visados)'],
  r977: ['Reglamento (UE) n.º 977/2011 de la Comisión, de 3 de octubre de 2011, que modifica el Reglamento (CE) n.º 810/2009 (Código de visados)', 'el Reglamento (UE) n.º 977/2011', 'Reglamento (UE) n.º 977/2011 (modifica el Código de visados)'],
  eur: ['Reglamento (UE) 2024/1358, de 14 de mayo de 2024, sobre la creación del sistema «Eurodac» para la comparación de datos biométricos', 'el Reglamento (UE) 2024/1358', 'Reglamento (UE) 2024/1358 (Sistema EURODAC)'],
  aec: ['Orden AEC/240/2011, de 4 de enero, por la que se crea el fichero de datos de carácter personal del Sistema de Información de Visados y la Autoridad Nacional del Sistema de Información de Visados', 'la Orden AEC/240/2011', 'Orden AEC/240/2011, por la que se crea el fichero de datos de carácter personal del Sistema de información de'] };
const PREF = {};
const COLA = [', en los términos que establezca el propio Reglamento', ', salvo que el Estado miembro afectado disponga otra cosa', ', conforme al procedimiento que se establezca reglamentariamente', ', sin perjuicio de lo dispuesto en el Derecho nacional'];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
exports.run = function ({ bloque, Q, texto = ['prompts/temario-limpio/tema5/oficial-paginas.txt', 'prompts/temario-limpio/tema5/escaneado-paginas.txt', 'prompts/temario-limpio/tema5/consolidado.txt', 'prompts/temario-limpio/tema5/transcrito.txt'], arg = process.argv.slice(2) }) {
  const ini = 1001 + 50 * (bloque - 1);
  const uso = [0, 0, 0, 0]; Q.forEach(q => { if (q.c !== null && q.c !== undefined) uso[q.c]++; });
  const ia = Q.map((q, i) => {
    if (!NORMAS[q.k]) throw new Error('norma desconocida ' + q.k + ' en ' + i);
    if (!q.o || q.o.length !== 4) throw new Error('la pregunta ' + i + ' no tiene 4 opciones');
    let ops = q.o.slice(), c = q.c;
    if (c === null || c === undefined) { const ok = ops.shift(); c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++; }
    // la correcta nunca la más larga: se alarga la incorrecta más larga con una coletilla verosímil
    for (let g = 0; g < 3 && ops[c].length >= Math.max(...ops.filter((x, j) => j !== c).map(x => x.length)); g++) { const j = [0, 1, 2, 3].filter(x => x !== c).sort((x, y) => ops[y].length - ops[x].length)[0]; ops[j] = ops[j].replace(/[.]$/, '') + COLA[(i + g) % COLA.length] + '.'; }
    const [nom, corta, apt] = NORMAS[q.k];
    const ref = `${q.a} ${corta.startsWith("el ") ? "del " + corta.slice(3) : "de " + corta}`;
    const explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ops[c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${ref}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>. ${esc(q.p)} <em style="color:var(--texto-gris)">(Pregunta generada por IA)</em>`;
    if (/art[íi]culos*d|art.s*d|apartados*d/i.test(q.e)) console.log('✗ ART en enunciado', '5-ia-' + (ini + i), q.e.slice(0, 90));
    return { id: '5-ia-' + (ini + i), pregunta: `${PREF[q.k] || nom}. ${q.r}. ${q.e}`, opciones: ops, correcta: c, dificultad: 'media', explicacion, apartado: apt };
  });
  if (ia.length > 50) throw new Error('más de 50 preguntas en el bloque');
  ia.forEach((x, i) => { if (Q[i].x) x.explicacion = x.explicacion.replace(' <em style', ' <em>(' + esc(Q[i].x) + ')</em> <em style'); });
  // verificación de citas contra el texto oficial extraído (PyMuPDF)
  const of = nrm(texto.filter(f => fs.existsSync(f)).map(f => fs.readFileSync(f, 'utf8')).join(' '));
  const OCRW = texto.filter(f => fs.existsSync(f)).map(f => fs.readFileSync(f, 'utf8')).join(' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').match(/[a-z0-9ñ]+/g);
  const IDX = new Map(); OCRW.forEach((w, i) => { if (w.length >= 5) { if (!IDX.has(w)) IDX.set(w, []); IDX.get(w).push(i); } });
  const aprox = t => { const W = t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').match(/[a-z0-9ñ]+/g) || []; const larg = W.filter(w => w.length >= 5); const cand = new Map(); for (const w of larg) for (const p of (IDX.get(w) || []).slice(0, 400)) { const k = Math.floor(p / 40); cand.set(k, (cand.get(k) || 0) + 1); } let best = 0; for (const [k] of [...cand].sort((a, b) => b[1] - a[1]).slice(0, 15)) { const win = new Set(OCRW.slice(Math.max(0, k * 40 - W.length - 40), k * 40 + W.length + 80)); const ok = W.filter(w => win.has(w)).length / Math.max(1, W.length); if (ok > best) best = ok; } return best; };
  const malas = [], dup = new Set(), sinOk = [], aproxs = [];
  Q.forEach((q, i) => {
    if (of && !of.includes(nrm(q.t))) { const a = aprox(q.t); if (a < 0.85) malas.push(ia[i].id + ' · (' + Math.round(100 * a) + ' %) ' + q.t.slice(0, 90)); else aproxs.push(ia[i].id + ' ' + Math.round(100 * a) + ' %'); }
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
    if (aproxs.length) console.log('≈ citas verificadas por aproximación (OCR de tu PDF):', aproxs.join(', '));
    if (!malas.length && !dup.size) console.log('✓ citas literales verificadas');
    return;
  }
  if (malas.length || dup.size) throw new Error('hay citas no literales u opciones repetidas: ejecuta con --json');
  let s = fs.readFileSync(F, 'utf8');
  const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
  const PURGA = '(function(){/* purga IA tema 5 */const S=window.__seedIdsIA||{};const P=(state.preguntasIA||{})[5];if(!P)return;const n=P.length;state.preguntasIA[5]=P.filter(q=>!(q&&/^5-ia-\\d+$/.test(q.id)&&!S[q.id]));state.preguntasIA[5].length!==n&&saveState()})();';
  // 1) borrar TODAS las IA antiguas (ids < 1000) y sus bloques semilla; dejar la purga en su sitio
  let borradas = 0;
  if (!s.includes('/* purga IA tema 5 */')) {
    const m = ';syncSeedIA(5,seed)})();'; const primero = s.indexOf(m); if (primero < 0) throw new Error('no hay bloques semilla del tema 5');
    const anc = s.lastIndexOf('(function(){const seed=[', primero);
    let pos = 0;
    while ((pos = s.indexOf('{"id":"5-ia-', pos)) >= 0) {
      const num = +s.slice(pos + 12, s.indexOf('"', pos + 12)); const r = rango('5-ia-' + num);
      if (!r || num >= 1000) { pos = r ? r[1] : pos + 1; continue; }
      let [a, b] = r; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); borradas++; pos = a;
    }
    s = s.replace(/\(function\(\)\{const seed=\[\];syncSeedIA\(5,seed\)\}\)\(\);/g, '');
    s = s.slice(0, anc) + PURGA + s.slice(anc);
  }
  // 2) insertar el bloque nuevo justo antes de la purga (o sustituirlo si ya estaba)
  const blk = '(function(){const seed=' + JSON.stringify(ia) + ';syncSeedIA(5,seed)})();';
  const yaIni = s.indexOf('{"id":"' + ia[0].id + '"');
  if (yaIni >= 0) { const a = s.lastIndexOf('(function(){const seed=[', yaIni); const b = s.indexOf(';syncSeedIA(5,seed)})();', yaIni) + ';syncSeedIA(5,seed)})();'.length; s = s.slice(0, a) + blk + s.slice(b); }
  else { const p = s.indexOf('(function(){/* purga IA tema 5 */'); s = s.slice(0, p) + blk + s.slice(p); }
  fs.writeFileSync(F, s);
  console.log('IA antiguas borradas', borradas, '· bloque', bloque, '· IA nuevas', ia.length, '(' + ia[0].id + ' → ' + ia[ia.length - 1].id + ')');
};
