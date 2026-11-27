// Pone en las 342 preguntas la cita con el apartado completo y corrige erratas de transcripción. Uso (carpeta del proyecto): node aplica.js
const fs = require('fs');
const P = require('./parr3.json');
const BS = String.fromCharCode(92);
const F = 'test-oficial-conocimiento.html';
let s = fs.readFileSync(F, 'utf8');
const antes = s;
const fin = i => { let d = 0, str = false, e = false; for (let j = i; j < s.length; j++) { const c = s[j]; if (str) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}') { if (!--d) return j + 1; } } throw new Error('sin fin'); };
// erratas de lectura del vídeo: [id, antes, después]
const ERR = [
  ...['2-320', '2-321', '2-322', '2-323', '2-324', '2-361', '2-362'].map(i => [i, 'trófico', 'tráfico']),
  ['2-334', 'conforme Ie haya', 'conforme le haya'], ['2-346', 'artículo I del', 'artículo 1 del'], ['2-352', 'lo.000.000', '10.000.000'],
  ['5-398', 'por Otro Estado', 'por otro Estado'], ['11-257', 'por Otros que supongan POCO', 'por otros que supongan poco'],
];
const D = {}; for (const t of [2, 5, 11, 18]) D[t] = JSON.parse(fs.readFileSync(`prompts/herramientas/oficiales-seras-t${t}.json`, 'utf8'));
const plano = t => String(t).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
let n = 0, erratas = 0;
for (const o of P) {
  const i = s.indexOf('{"id":"' + o.id + '","pregunta"'); if (i < 0) throw new Error('no está ' + o.id);
  const j = fin(i); const crudo = s.slice(i, j); const q = JSON.parse(crudo);
  if (JSON.stringify(q) !== crudo) throw new Error('formato distinto en ' + o.id);
  const d = D[o.t].find(d => plano(d.en) === plano(q.pregunta) && plano(d.op.join('')) === plano(q.opciones.join('')));
  if (!d) throw new Error('sin ficha json ' + o.id);
  const correcta = q.correcta;
  for (const [id, a, b] of ERR) if (id === o.id) {
    let hubo = false; const c = x => { if (x.includes(a)) { hubo = true; return x.split(a).join(b); } return x; };
    q.pregunta = c(q.pregunta); q.opciones = q.opciones.map(c); d.en = c(d.en); d.op = d.op.map(c); q.explicacion = c(q.explicacion);
    if (!hubo) throw new Error('errata no hallada ' + id + ' ' + a); erratas++;
  }
  const m = q.explicacion.match(/^(<span class="ex-resp">[\s\S]*?<\/span>)<span class="ref-norma">([\s\S]*?)<\/span><span class="ref-concepto">[\s\S]*?<\/span>([\s\S]*)$/);
  if (!m) throw new Error('explicación sin formato ' + o.id);
  const norma = o.loc + ' · ' + o.norma;
  const cita = o.cita.join(' ').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  q.explicacion = m[1] + `<span class="ref-norma">${norma}</span><span class="ref-concepto">"${cita}"</span>` + m[3];
  if (q.correcta !== correcta) throw new Error('cambia la respuesta');
  d.loc = o.loc; d.cita = o.cita;
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j); n++;
}
fs.writeFileSync(F, s);
for (const t of [2, 5, 11, 18]) { const f = `prompts/herramientas/oficiales-seras-t${t}.json`; const raw = fs.readFileSync(f, 'utf8'); const ind = (raw.match(/^\[\r?\n( +)/) || [])[1]; fs.writeFileSync(f, JSON.stringify(D[t], null, ind ? ind.length : 0) + (raw.endsWith('\n') ? '\n' : '')); }
console.log('preguntas actualizadas', n, 'erratas', erratas, 'tamaño', antes.length, '→', s.length);
