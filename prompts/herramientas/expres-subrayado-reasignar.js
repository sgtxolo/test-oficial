// Revisa en un datos-tN.js ya generado qué preguntas están enlazadas a un artículo que NO es el que cita su explicación, y las pasa a ese artículo.
// (Esquemas agrupa por texto de respuesta —«tres meses», «seis meses»— y deja en «Artículo 30» preguntas de otros artículos.)
// Una pregunta se mueve solo si su explicación cita UN único artículo de una norma del tema que tenga pieza y ese artículo no es el actual.
// Uso: node prompts/herramientas/expres-subrayado-reasignar.js N          (solo informa)
//      node prompts/herramientas/expres-subrayado-reasignar.js N --aplicar (reescribe expres-subrayado/datos-tN.js: solo `preg` y `q1`)
// Opcional: expres-subrayado/tN-preg-fijas.json [id,…] (no se tocan) y tN-preg-mover.json {id: pieza} (se fuerzan).
// expres-subrayado-datos.js hace lo mismo al regenerar; este script sirve para temas cuyo datos-tN.js no conviene regenerar entero.
const fs = require('fs'); const T = process.argv[2], aplicar = process.argv.includes('--aplicar');
const ruta = `expres-subrayado/datos-t${T}.js`, src = fs.readFileSync(ruta, 'utf8'), pre = src.slice(0, src.indexOf(']={') + 2);
const D = JSON.parse(src.slice(pre.length).replace(/;\s*$/, ''));
if (pre + JSON.stringify(D) + ';' !== src.replace(/\s+$/, '')) { console.log('T' + T, 'el fichero no tiene el formato esperado; no se toca'); process.exit(1); }
const inst = JSON.parse(fs.readFileSync(`expres-subrayado/t${T}-instrumentos.json`, 'utf8')), ids = new Set(D.piezas.map(p => p.id));
const leer = (f, def) => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : def;
const fijas = new Set(leer(`expres-subrayado/t${T}-preg-fijas.json`, [])), mover = leer(`expres-subrayado/t${T}-preg-mover.json`, {});
const th = fs.readFileSync('test-oficial-conocimiento.html', 'utf8'), expl = {};
for (const mm of th.matchAll(new RegExp('\\{"id":"(' + T + '-[^"]+)","pregunta":"(?:[^"\\\\]|\\\\.)*","opciones"[\\s\\S]{0,3000}?"explicacion":"((?:[^"\\\\]|\\\\.)*)"', 'g'))) expl[mm[1]] = mm[2].replace(/<[^>]+>/g, ' ');
const leyes = inst.filter(i => i.paginas), otras = /Constituci|\bCE\b|C[óo]digo|Tratado|Reglamento|Real Decreto|LECrim|Directiva|Convenio|Carta/;
const mov = {}; let varias = 0;
for (const q of Object.keys(D.preg)) {
  if (fijas.has(q) || !expl[q] || !/^[a-z]+-\d+$/.test(D.preg[q])) continue;
  const cand = new Set();
  for (const x of expl[q].matchAll(/\bart(?:ículo|\.|s\.)\s*(\d+)(?:\.\d+)?([^.;]{0,70})/gi)) {
    let ley = leyes.find(i => i.cit && new RegExp(i.cit, 'i').test(x[2])); if (!ley && leyes.length === 1 && !otras.test(x[2])) ley = leyes[0];
    if (ley && ids.has(ley.id + '-' + x[1])) cand.add(ley.id + '-' + x[1]);
  }
  if (cand.has(D.preg[q]) || !cand.size) continue;
  if (cand.size === 1) mov[q] = [...cand][0]; else varias++;
}
for (const [q, p] of Object.entries(mover)) if (ids.has(p) && D.preg[q] !== p) mov[q] = p;
const por = {}; for (const [q, p] of Object.entries(mov)) { const k = D.preg[q] + '→' + p; por[k] = (por[k] || 0) + 1; }
console.log('T' + T, Object.keys(mov).length, 'preguntas a mover de', Object.keys(D.preg).length, '(' + varias + ' citan varios artículos y se dejan)');
console.log('   ', Object.entries(por).sort((a, b) => b[1] - a[1]).map(([k, n]) => k + ' ' + n).join(', ').slice(0, 900));
if (process.argv.includes('--muestra')) Object.keys(mov).filter((_, i, a) => i % Math.max(1, Math.floor(a.length / 8)) === 0).forEach(q => console.log('   ·', D.preg[q], '→', mov[q], q, '|', expl[q] ? expl[q].replace(/\s+/g, ' ').slice(0, 170) : ''));
if (aplicar && Object.keys(mov).length) {
  for (const [q, p] of Object.entries(mov)) D.preg[q] = p;
  const primera = {}; for (const q in D.preg) if (!primera[D.preg[q]]) primera[D.preg[q]] = q;
  D.piezas.forEach(p => { if (primera[p.id]) p.q1 = primera[p.id]; else delete p.q1; });
  fs.writeFileSync(ruta, pre + JSON.stringify(D) + ';'); console.log('   aplicado');
}
