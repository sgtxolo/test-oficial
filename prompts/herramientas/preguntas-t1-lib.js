// Librería común para las preguntas IA del Tema 1 (estilo examen oficial). La usan preguntas-t1-<norma>.js.
// run({AP, N, ini, Q, OF, CITAS, normaCorta, borrar}) — Q: preguntas IA {a,r,e,o,c,t,p}; OF: oficiales nuevas {id,after,a,r,e,o,c,t,p}.
// Borra TODAS las IA antiguas del tema 1 cuyo `apartado` sea AP (salvo las de id >= 1000), inserta las nuevas como bloque semilla
// y añade citas literales a oficiales que no las tenían (CITAS: id → [art, cita]).
const fs = require('fs');
const F = 'test-oficial-conocimiento.html', L = 'ABCD', BS = String.fromCharCode(92);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
exports.run = function ({ AP, pref, ini, Q, OF = [], CITAS = {}, corta, arg = process.argv.slice(2) }) {
  pref = pref || AP;
  const norma = (a, n) => n || `${a} de ${corta}`;
  const expl = (letra, ok, a, t, p, ia, n) => `<span class="ex-resp">Respuesta correcta: <b>${letra}</b> · <mark class="ex-key">${esc(ok.replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${norma(a, n)}</span> dispone: <span class="ref-concepto">"${esc(t)}"</span>. ${esc(p)}${ia ? ' <em style="color:var(--texto-gris)">(Pregunta generada por IA)</em>' : ''}`;
  const uso = [0, 0, 0, 0]; Q.forEach(q => { if (q.c !== null && q.c !== undefined) uso[q.c]++; });
  const ia = Q.map((q, i) => {
    let ops = q.o.slice(), c = q.c;
    if (c === null || c === undefined) { const ok = ops.shift(); c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++; }
    return { id: '1-ia-' + (ini + i), pregunta: `${pref}. ${q.r}. ${q.e}`, opciones: ops, correcta: c, dificultad: 'media', explicacion: expl(L[c], ops[c], q.a, q.t, q.p, true, q.n), apartado: AP };
  });
  const of = OF.map(q => ({ id: q.id, pregunta: `${pref}. ${q.r}. ${q.e}`, opciones: q.o, correcta: q.c, explicacion: expl(L[q.c], q.o[q.c], q.a, q.t, q.p, false, q.n), apartado: AP, _after: q.after }));
  if (arg[0] === '--json') { fs.writeFileSync(arg[1], JSON.stringify(ia, null, 1)); fs.writeFileSync(arg[1].replace(/\.json$/, '-of.json'), JSON.stringify(of, null, 1)); console.log(ia.length, 'IA +', of.length, 'oficiales · letras', JSON.stringify(uso)); return; }
  let s = fs.readFileSync(F, 'utf8');
  const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
  // oficiales
  for (const o of of) { const after = o._after; delete o._after; const r = rango(o.id); if (r) s = s.slice(0, r[0]) + JSON.stringify(o) + s.slice(r[1]); else { const p = rango(after); if (!p) throw new Error('no existe ' + after); s = s.slice(0, p[1]) + ',' + JSON.stringify(o) + s.slice(p[1]); } }
  for (const [id, [a, t]] of Object.entries(CITAS)) { const r = rango(id); if (!r) { console.log('CITA: no existe', id); continue; } const q = JSON.parse(s.slice(r[0], r[1])); if (/ref-concepto/.test(q.explicacion)) continue; const cab = q.explicacion.match(/^<span class="ex-resp">[\s\S]*?<\/span>/)[0]; q.explicacion = `${cab}El <span class="ref-norma">${a} de ${corta}</span> dispone: <span class="ref-concepto">"${esc(t)}"</span>.`; s = s.slice(0, r[0]) + JSON.stringify(q) + s.slice(r[1]); }
  // IA antiguas de esta norma
  let borradas = 0, pos = 0;
  while ((pos = s.indexOf('{"id":"1-ia-', pos)) >= 0) {
    const num = +s.slice(pos + 12, s.indexOf('"', pos + 12)); const id = '1-ia-' + num; const r = rango(id);
    if (!r) { pos++; continue; }
    if (num >= 1000) { pos = r[1]; continue; }
    let q; try { q = JSON.parse(s.slice(r[0], r[1])); } catch (e) { pos = r[1]; continue; }
    if (q.apartado !== AP) { pos = r[1]; continue; }
    let [a, b] = r; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); borradas++; pos = a;
  }
  s = s.replace(/\(function\(\)\{const seed=\[\];syncSeedIA\(1,seed\)\}\)\(\);/g, '');
  if (!s.includes(`"id":"1-ia-${ini}"`)) {
    const m = '];syncSeedIA(1,seed)})();'; let k = -1, p = -1;
    while ((k = s.indexOf(m, k + 1)) >= 0) { const i0 = s.lastIndexOf('(function(){const seed=[', k); if (s.slice(i0, k).includes('"id":"1-ia-')) p = k + m.length; }
    if (p < 0) throw new Error('bloque semilla del tema 1 no encontrado');
    s = s.slice(0, p) + '(function(){const seed=' + JSON.stringify(ia) + ';syncSeedIA(1,seed)})();' + s.slice(p);
  }
  fs.writeFileSync(F, s);
  console.log('IA antiguas borradas', borradas, '· IA nuevas', ia.length, '· oficiales', of.length, '· citas', Object.keys(CITAS).length);
};
