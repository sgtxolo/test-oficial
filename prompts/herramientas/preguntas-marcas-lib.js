// Fase 2 de las marcas (19/10/2026): preguntas para los apartados con marca suya (EXOF / ✱ / R → banco OFICIAL; EX → banco IA)
// que no tenían pregunta oficial (cobertura-marcas.js). Comprueba que la cita es LITERAL del temario limpio del tema y que la
// correcta NO es la opción más larga; inserta tras la última oficial (N-…) o la última IA (N-ia-…). Idempotente (reescribe por id).
// Uso desde un script de tema: require('../preguntas-marcas-lib.js')({ T: 9, fuentes: ['tema9/lo5.txt', …], desdeOf: 286, desdeIA: 1, Q: [...] })
//   cada pregunta: { n: [norma larga, norma corta, apartado de la app], ia: true|false, a: 'art. 8.5.c)', r: 'Rúbrica', e: 'Enunciado…:',
//                    o: [4 opciones], c: índice correcta, t: 'cita literal', p: 'explicación breve (opcional)' }
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..'), F = path.join(RAIZ, 'test-oficial-conocimiento.html');
const BS = String.fromCharCode(92), L = 'ABCD';
const nrm = s => s.replace(/=====PAG \d+=====/g, '').replace(/[­-]\s*\n\s*/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
module.exports = function (C) {
  const fuente = nrm(C.fuentes.map(f => fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', f), 'utf8')).join('\n'));
  // la correcta nunca la más larga: si lo es, se alarga la incorrecta MÁS larga con una coletilla verosímil (solo en opciones incorrectas)
  const COLA = C.cola || [', sin perjuicio de lo que establezcan los tratados internacionales', ', en los términos que determine la ley orgánica correspondiente', ', salvo que el órgano competente acuerde otra cosa de forma motivada', ', conforme al procedimiento que reglamentariamente se establezca'];
  let ci = 0;
  C.Q.forEach(q => { const long = i => q.o[i].length; let guard = 0;
    while (guard++ < 3 && q.o[q.c].length >= Math.max(...q.o.filter((_, i) => i !== q.c).map(x => x.length))) {
      const idx = q.o.map((x, i) => i).filter(i => i !== q.c).sort((x, y) => long(y) - long(x))[0];
      q.o[idx] = q.o[idx].replace(/[.]$/, '') + COLA[ci++ % COLA.length] + '.'; } });
  // la cita se limpia (sin numeración de apartado ni artículo delante) y se valida por tramos: cada tramo entre «(…)» debe aparecer literal
  const limpiaCita = t => t.replace(/^\s*(?:\d+(?:\.\d+)*\.\s*|\d+\)\s+|[a-z]\)\s+)/i, '').trim();
  C.Q.forEach(q => { q.t = limpiaCita(q.t); });
  const citaOk = t => t.split('(…)').map(nrm).filter(x => x.length >= 12).every(x => fuente.includes(x)) && nrm(t).length >= 12;
  const malas = C.Q.filter(q => !citaOk(q.t)).map(q => q.a);
  const largas = C.Q.filter(q => q.o[q.c].length >= Math.max(...q.o.filter((_, i) => i !== q.c).map(x => x.length))).map(q => q.a);
  const mal4 = C.Q.filter(q => q.o.length !== 4 || new Set(q.o).size !== 4).map(q => q.a);
  if (malas.length || largas.length || mal4.length) {
    if (malas.length) console.log('✗ citas no literales:', malas.join(' | '));
    if (largas.length) console.log('✗ la correcta es la más larga:', largas.join(' | '));
    if (mal4.length) console.log('✗ opciones repetidas o no son 4:', mal4.join(' | '));
    process.exit(1);
  }
  let nOf = C.desdeOf, nIA = C.desdeIA;
  const objs = C.Q.map(q => ({ id: q.ia ? `${C.T}-ia-${nIA++}` : `${C.T}-${nOf++}`, pregunta: `${q.n[0]}. ${q.r}. ${q.e}`, opciones: q.o, correcta: q.c,
    explicacion: `<span class="ex-resp">Respuesta correcta: <b>${L[q.c]}</b> · <mark class="ex-key">${esc(q.o[q.c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${q.a} de la ${q.n[1]}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>${q.p ? ' ' + esc(q.p) : ''}`,
    apartado: q.n[2] }));
  const reparto = [0, 1, 2, 3].map(c => objs.filter(o => o.correcta === c).length).join('/');
  console.log(`✓ ${objs.length} preguntas (${objs.filter(o => !/-ia-/.test(o.id)).length} oficiales, ${objs.filter(o => /-ia-/.test(o.id)).length} IA) · citas literales · correcta nunca la más larga · letras A/B/C/D ${reparto}`);
  if (process.argv.includes('--check')) return objs;
  let s = fs.readFileSync(F, 'utf8');
  const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i;
    for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; }
      if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (!d) break; } }
    return [i, j + 1]; };
  let n = 0;
  for (const tipo of ['of', 'ia']) {
    let prev = tipo === 'of' ? `${C.T}-${C.desdeOf - 1}` : (C.desdeIA > 1 ? `${C.T}-ia-${C.desdeIA - 1}` : `${C.T}-${C.desdeOf - 1}`);
    for (const o of objs.filter(x => /-ia-/.test(x.id) === (tipo === 'ia'))) {
      const r = rango(o.id);
      if (r) s = s.slice(0, r[0]) + JSON.stringify(o) + s.slice(r[1]);
      else { const p = rango(prev); if (!p) throw new Error('no encuentro ' + prev); s = s.slice(0, p[1]) + ',' + JSON.stringify(o) + s.slice(p[1]); n++; }
      prev = o.id;
    }
  }
  fs.writeFileSync(F, s); console.log('insertadas', n, '· actualizadas', objs.length - n);
  return objs;
};
