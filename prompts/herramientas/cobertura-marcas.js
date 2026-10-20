// Párrafos con marca suya (data-ex / data-r) SIN pregunta oficial que los cubra (situada por el mapa o con su respuesta correcta
// dentro del párrafo). Escribe %TEMP%/faltaN.json para redactar la fase 2. Uso: node prompts/herramientas/cobertura-marcas.js N
const fs = require('fs'), path = require('path');
const T = +process.argv[2];
const RAIZ = path.join(__dirname, '..', '..');
const X = require('./expres-lib.js')(T);
const h = fs.readFileSync(path.join(RAIZ, 'esquemas.html'), 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const app = fs.readFileSync(path.join(RAIZ, 'test-oficial-conocimiento.html'), 'utf8');
const n = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/<[^>]+>/g, '').replace(/[^a-z0-9ñ]/g, '');
const BS = String.fromCharCode(92);
function objetos(re) {
  const Q = [];
  for (const m of app.matchAll(re)) {
    let i = m.index, d = 0, s = false, e = false, j = i;
    for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; }
      if (c === '"') s = true; else if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } }
    Q.push(JSON.parse(app.slice(i, j + 1)));
  }
  return Q;
}
const Q = objetos(new RegExp('\\{"id":"' + T + '-\\d+","pregunta":', 'g'));
const IA = objetos(new RegExp('\\{"id":"' + T + '-ia-\\d+","pregunta":', 'g'));
const en = {};
for (const [id, v] of Object.entries(MAPA)) { const m = v.match(new RegExp('^' + T + '-(\\d+)-(\\d+)')); if (m && !/-ia-/.test(id)) (en[m[1] + '-' + m[2]] = en[m[1] + '-' + m[2]] || []).push(id); }
const lim = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const out = [];
X.fichas.forEach((f, k) => {
  if (/RECUERDA/.test(f.cab)) return;
  f.ps.forEach((p, j) => {
    const ex = (p.at.match(/data-ex=\\?"([^"\\]*)/) || [])[1], r = (p.at.match(/data-r=\\?"([^"\\]*)/) || [])[1];
    if (!ex && !r) return;
    const pn = n(p.h);
    let cub = (en[k + '-' + j] || []).length > 0;
    const cubre = q => { const a = n(q.opciones[q.correcta]); if (a.length >= 14 && pn.includes(a.slice(0, 60))) return true;
      // o la cita literal de su explicación (ref-concepto) cae dentro de este párrafo o lo contiene
      const c = ((q.explicacion || '').match(/ref-concepto">"([^<]*)/) || [])[1]; const cn = c ? n(c) : '';
      return cn.length >= 20 && (pn.includes(cn.slice(0, 50)) || cn.includes(pn.slice(0, 50))); };
    if (!cub) cub = Q.some(cubre);
    // solo EX → basta con que la cubra una IA
    if (!cub && ex === 'EX' && !r) cub = IA.some(cubre);
    if (!cub) out.push({ k, j, marca: [ex, r].filter(Boolean).join(' '), cab: lim(f.cab), t: lim(p.h) });
  });
});
fs.writeFileSync(path.join(process.env.TEMP, 'falta' + T + '.json'), JSON.stringify(out, null, 1));
const ofIds = Q.map(q => +q.id.split('-')[1]), iaIds = IA.map(q => +q.id.split('-').pop());
console.log(`T${T}: sin pregunta: ${out.length} · solo EX (→ IA): ${out.filter(o => o.marca === 'EX').length} · último oficial ${T}-${Math.max(...ofIds)} (${Q.length}) · última IA ${iaIds.length ? T + '-ia-' + Math.max(...iaIds) : 'ninguna'} (${IA.length})`);
