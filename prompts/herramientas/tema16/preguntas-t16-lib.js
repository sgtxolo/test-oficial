// Librería de las preguntas IA del Tema 16 (estilo examen oficial, 5 por página del temario oficial). La usan preguntas-t16-bNN.js.
// run({bloque, Q}) — Q: preguntas {k, a, r, e, o, c?, t, p}:
//   k = norma (lo | rd), a = «art. X.Y» / «apartado 2.3» (para la cita), r = rúbrica del artículo o apartado, e = enunciado,
//   o = 4 opciones (si no hay c, la correcta va PRIMERO y la librería la recoloca para equilibrar A/B/C/D),
//   t = cita literal del temario oficial (se comprueba contra prompts/temario-limpio/tema16/oficial.txt), p = por qué fallan las otras.
// ids: 16-ia-(1001 + 50·(bloque−1)) …
// Uso: node preguntas-t16-bNN.js --json <salida.json>   (genera y verifica las citas; no toca la app)
//      node preguntas-t16-bNN.js                         (inserta el bloque en test-oficial-conocimiento.html tras el último bloque semilla)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const F = path.join(RAIZ, 'test-oficial-conocimiento.html'), L = 'ABCD', BS = String.fromCharCode(92);
const { T } = require('./texto-t16.js');
const NORMAS = {
  lo: ['Ley Orgánica 3/2007, de 22 de marzo, para la igualdad efectiva de mujeres y hombres', 'la Ley Orgánica 3/2007', 'Ley Orgánica 3/2007, de 22 de marzo, para la igualdad efectiva de mujeres y hombres'],
  rd: ['Real Decreto 247/2024, de 8 de marzo, por el que se aprueba el Protocolo de actuación frente al acoso sexual y al acoso por razón de sexo en el ámbito de la Administración General del Estado y de sus organismos públicos', 'el Real Decreto 247/2024 (Protocolo)', 'Real Decreto 247/2024, de 8 de marzo, por el que se aprueba el Protocolo de actuación frente al acoso sexual']
};
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const OF = nrm(T);
exports.run = function ({ bloque, Q, arg = process.argv.slice(2) }) {
  const ini = 1001 + 50 * (bloque - 1);
  const uso = [0, 0, 0, 0]; Q.forEach(q => { if (q.c !== null && q.c !== undefined) uso[q.c]++; });
  const ia = Q.map((q, i) => {
    if (!NORMAS[q.k]) throw new Error('norma desconocida ' + q.k + ' en ' + i);
    if (!q.o || q.o.length !== 4) throw new Error('la pregunta ' + i + ' no tiene 4 opciones');
    let ops = q.o.slice(), c = q.c;
    if (c === null || c === undefined) { const ok = ops.shift(); c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++; }
    const [nom, corta, apt] = NORMAS[q.k];
    const ref = `${q.a} ${corta.startsWith('el ') ? 'del ' + corta.slice(3) : 'de ' + corta}`;
    const explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ops[c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${esc(ref)}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>. ${esc(q.p)} <em style="color:var(--texto-gris)">(Pregunta generada por IA)</em>`;
    return { id: '16-ia-' + (ini + i), pregunta: `${nom}. ${q.r}. ${q.e}`, opciones: ops, correcta: c, dificultad: 'media', explicacion, apartado: apt };
  });
  if (ia.length > 50) throw new Error('más de 50 preguntas en el bloque');
  const malas = [], dup = new Set(), sinOk = [], num = [];
  Q.forEach((q, i) => {
    if (!OF.includes(nrm(q.t))) malas.push(ia[i].id + ' · ' + q.t.slice(0, 90));
    const op = ia[i].opciones.map(nrm); if (new Set(op).size < 4) dup.add(ia[i].id);
    const ok = nrm(ia[i].opciones[ia[i].correcta].replace(/\.$/, ''));
    if (!/incorrecta|todas|correctas|incorrectas|ninguna|solo|únicamente|ambas|son/i.test(q.e + ia[i].opciones.join(' ')) && !nrm(q.t).includes(ok)) sinOk.push(ia[i].id + ' · ' + ia[i].opciones[ia[i].correcta].slice(0, 70));
    if (/(¿|\b)(qu[eé] art[ií]culo|en qu[eé] art[ií]culo|conforme a qu[eé])/i.test(q.e)) num.push(ia[i].id);
  });
  if (arg[0] === '--json') {
    fs.writeFileSync(arg[1], JSON.stringify(ia, null, 1));
    console.log(ia.length, 'preguntas · letras', JSON.stringify(uso), '· ids', ia[0].id, '→', ia[ia.length - 1].id);
    if (malas.length) console.log('✗ CITAS QUE NO ESTÁN LITERALES EN EL OFICIAL:\n  ' + malas.join('\n  '));
    if (dup.size) console.log('✗ opciones repetidas en', [...dup].join(', '));
    if (num.length) console.log('✗ preguntan por número de artículo:', num.join(', '));
    if (sinOk.length) console.log('· (revisar) la correcta no aparece literal en la cita:\n  ' + sinOk.join('\n  '));
    if (!malas.length && !dup.size) console.log('✓ citas literales verificadas');
    return;
  }
  if (malas.length || dup.size || num.length) throw new Error('hay citas no literales, opciones repetidas o preguntas de nº de artículo: ejecuta con --json');
  let s = fs.readFileSync(F, 'utf8');
  const blk = '(function(){const seed=' + JSON.stringify(ia) + ';syncSeedIA(16,seed)})();';
  const yaIni = s.indexOf('{"id":"' + ia[0].id + '"');
  if (yaIni >= 0) { const a = s.lastIndexOf('(function(){const seed=[', yaIni); const b = s.indexOf(';syncSeedIA(16,seed)})();', yaIni) + ';syncSeedIA(16,seed)})();'.length; s = s.slice(0, a) + blk + s.slice(b); }
  else {
    const m = /;syncSeedIA\(\d+,seed\)\}\)\(\);/g; let last = null, mm; while ((mm = m.exec(s))) last = mm;
    if (!last) throw new Error('no hay bloques semilla');
    const p = last.index + last[0].length; s = s.slice(0, p) + blk + s.slice(p);
  }
  fs.writeFileSync(F, s);
  console.log('bloque', bloque, '· IA nuevas', ia.length, '(' + ia[0].id + ' → ' + ia[ia.length - 1].id + ')');
};
