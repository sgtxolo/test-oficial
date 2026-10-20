// Librería de las preguntas IA del Tema 1 (estilo examen oficial, media-alta/difícil, ≈5 por página ajustado al subrayado). La usan preguntas-t2-bNN.js.
// run({bloque, Q}) — Q: preguntas {k, a, r, e, o, t, p, d?, c?}:
//   k = norma (lo | carta | cde | cedh | er | ac), a = «art. X.Y» (solo para la explicación), r = rúbrica del artículo (como en el oficial),
//   e = enunciado SIN número de artículo (texto casi literal o frase a completar), o = 4 opciones (la correcta va PRIMERA; la librería la recoloca),
//   t = cita literal del temario oficial, p = por qué fallan las otras, d = 'media' (por defecto) | 'dificil'.
// ids: 1-ia-(3001 + 100·(bloque−1)) … (hasta 100 por bloque). La primera ejecución BORRA TODAS las IA antiguas del tema (ids < 3000),
// quita sus bloques semilla y deja la purga de localStorage («purga IA tema 1») al final de los bloques nuevos.
// Uso: node prompts/herramientas/preguntas-t2-bNN.js --json <salida.json>   (genera y verifica las citas; no toca la app)
//      node prompts/herramientas/preguntas-t2-bNN.js                         (inserta en test-oficial-conocimiento.html)
// Después de insertar: node prompts/herramientas/mapa-preguntas.js && node prompts/herramientas/marcas-preguntas.js
const fs = require('fs');
const F = 'test-oficial-conocimiento.html', L = 'ABCD', BS = String.fromCharCode(92);
const TEXTO = 'prompts/temario-limpio/tema1/oficial-paginas.txt';
const NORMAS = {
  lo: ['Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional', 'la Ley Orgánica 18/2003', 'Ley Orgánica 18/2003, de Cooperación con la Corte Penal Internacional'],
  carta: ['Carta de los Derechos Fundamentales de la Unión Europea', 'la Carta de los Derechos Fundamentales de la Unión Europea', 'Carta de los Derechos Fundamentales de la Unión Europea'],
  cde: ['Estatuto del Consejo de Europa, hecho en Londres el 5 de mayo de 1949', 'el Estatuto del Consejo de Europa', 'Estatuto del Consejo de Europa'],
  cedh: ['Convenio para la Protección de los Derechos Humanos y de las Libertades Fundamentales (Convenio Europeo de Derechos Humanos)', 'el Convenio Europeo de Derechos Humanos', 'Convenio Europeo de Derechos Humanos'],
  p1: ['Protocolo adicional al Convenio para la Protección de los Derechos Humanos y de las Libertades Fundamentales (París, 20 de marzo de 1952)', 'el Protocolo adicional al Convenio Europeo de Derechos Humanos', 'Protocolo adicional al Convenio Europeo de Derechos Humanos'],
  p4: ['Protocolo n.º 4 al Convenio para la Protección de los Derechos Humanos y de las Libertades Fundamentales (Estrasburgo, 16 de septiembre de 1963)', 'el Protocolo n.º 4 al Convenio Europeo de Derechos Humanos', 'Protocolo n.º 4 al Convenio Europeo de Derechos Humanos'],
  p6: ['Protocolo n.º 6 al Convenio para la Protección de los Derechos Humanos y de las Libertades Fundamentales, relativo a la abolición de la pena de muerte (Estrasburgo, 28 de abril de 1983)', 'el Protocolo n.º 6 al Convenio Europeo de Derechos Humanos', 'Protocolo n.º 6 al Convenio Europeo de Derechos Humanos'],
  p7: ['Protocolo n.º 7 al Convenio para la Protección de los Derechos Humanos y de las Libertades Fundamentales (Estrasburgo, 22 de noviembre de 1984)', 'el Protocolo n.º 7 al Convenio Europeo de Derechos Humanos', 'Protocolo n.º 7 al Convenio Europeo de Derechos Humanos'],
  p12: ['Protocolo n.º 12 al Convenio para la Protección de los Derechos Humanos y de las Libertades Fundamentales (Roma, 4 de noviembre de 2000)', 'el Protocolo n.º 12 al Convenio Europeo de Derechos Humanos', 'Protocolo n.º 12 al Convenio Europeo de Derechos Humanos'],
  p13: ['Protocolo n.º 13 al Convenio para la Protección de los Derechos Humanos y de las Libertades Fundamentales, relativo a la abolición de la pena de muerte en todas las circunstancias (Vilna, 3 de mayo de 2002)', 'el Protocolo n.º 13 al Convenio Europeo de Derechos Humanos', 'Protocolo n.º 13 al Convenio Europeo de Derechos Humanos'],
  er: ['Estatuto de Roma de la Corte Penal Internacional, hecho en Roma el 17 de julio de 1998', 'el Estatuto de Roma', 'Estatuto de Roma de la Corte Penal Internacional'],
  ac: ['Acuerdo sobre Privilegios e Inmunidades de la Corte Penal Internacional', 'el Acuerdo sobre Privilegios e Inmunidades de la Corte Penal Internacional', 'Acuerdo sobre Privilegios e Inmunidades de la Corte Penal Internacional'] };
const COLA = [', en los términos que establezca la propia norma', ', salvo que se disponga otra cosa en la normativa aplicable', ', conforme al procedimiento que se establezca reglamentariamente', ', sin perjuicio de lo dispuesto en otras disposiciones'];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
exports.run = function ({ bloque, Q, arg = process.argv.slice(2) }) {
  const ini = 3001 + 100 * (bloque - 1);
  if (Q.length > 100) throw new Error('más de 100 preguntas en el bloque');
  const uso = [0, 0, 0, 0]; Q.forEach(q => { if (q.c !== null && q.c !== undefined) uso[q.c]++; });
  const ia = Q.map((q, i) => {
    if (!NORMAS[q.k]) throw new Error('norma desconocida ' + q.k + ' en ' + i);
    if (!q.o || q.o.length !== 4) throw new Error('la pregunta ' + i + ' no tiene 4 opciones');
    if (/art[íi]culo\s*\d|art\.\s*\d|apartado\s*\d/i.test(q.e)) throw new Error('el enunciado de la pregunta ' + i + ' cita nº de artículo/apartado: ' + q.e.slice(0, 80));
    let ops = q.o.slice(), c = q.c;
    if (c === null || c === undefined) { const ok = ops.shift(); c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++; }
    const [nom, corta, pref] = NORMAS[q.k];
    const ref = `${q.a} de ${corta}`;
    const explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ops[c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${ref}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>. ${esc(q.p)} <em style="color:var(--texto-gris)">(Pregunta generada por IA)</em>`;
    // la correcta nunca la más larga: se alarga la incorrecta más larga con una coletilla verosímil
    for (let g = 0; g < 3 && ops[c].length >= Math.max(...ops.filter((x, j) => j !== c).map(x => x.length)); g++) { const j = [0, 1, 2, 3].filter(x => x !== c).sort((x, y) => ops[y].length - ops[x].length)[0]; ops[j] = ops[j].replace(/[.]$/, '') + COLA[(i + g) % COLA.length] + '.'; }
    return { id: '1-ia-' + (ini + i), pregunta: `${nom}. ${q.r ? q.r + '. ' : ''}${q.e}`, opciones: ops, correcta: c, dificultad: q.d === 'dificil' ? 'dificil' : 'media', explicacion, apartado: pref };
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
  const PURGA = '(function(){/* purga IA tema 1 */const S=window.__seedIdsIA||{};const P=(state.preguntasIA||{})[1];if(!P)return;const n=P.length;state.preguntasIA[1]=P.filter(q=>!(q&&/^1-ia-\\d+$/.test(q.id)&&!S[q.id]));state.preguntasIA[1].length!==n&&saveState()})();';
  // 1) borrar TODAS las IA antiguas (ids < 1000) y sus bloques semilla; dejar la purga en su sitio
  let borradas = 0;
  if (!s.includes('/* purga IA tema 1 */')) {
    const m = ';syncSeedIA(1,seed)})();'; const primero = s.indexOf(m); if (primero < 0) throw new Error('no hay bloques semilla del tema 1');
    const anc = s.lastIndexOf('(function(){const seed=[', primero);
    let pos = 0;
    while ((pos = s.indexOf('{"id":"1-ia-', pos)) >= 0) {
      const num = +s.slice(pos + 12, s.indexOf('"', pos + 12)); const r = rango('1-ia-' + num);
      if (!r || num >= 3000) { pos = r ? r[1] : pos + 1; continue; }
      let [a, b] = r; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); borradas++; pos = a;
    }
    s = s.replace(/\(function\(\)\{const seed=\[\];syncSeedIA\(2,seed\)\}\)\(\);/g, '');
    s = s.slice(0, anc) + PURGA + s.slice(anc);
  }
  // 2) insertar el bloque nuevo justo antes de la purga (o sustituirlo si ya estaba)
  const blk = '(function(){const seed=' + JSON.stringify(ia) + ';syncSeedIA(1,seed)})();';
  const yaIni = s.indexOf('{"id":"' + ia[0].id + '"');
  if (yaIni >= 0) { const a = s.lastIndexOf('(function(){const seed=[', yaIni); const b = s.indexOf(';syncSeedIA(1,seed)})();', yaIni) + ';syncSeedIA(1,seed)})();'.length; s = s.slice(0, a) + blk + s.slice(b); }
  else { const p = s.indexOf('(function(){/* purga IA tema 1 */'); s = s.slice(0, p) + blk + s.slice(p); }
  fs.writeFileSync(F, s);
  console.log('IA antiguas borradas', borradas, '· bloque', bloque, '· IA nuevas', ia.length, '(' + ia[0].id + ' → ' + ia[ia.length - 1].id + ')');
};
