// Tema 5 · propone, para cada ficha R1-R36, el párrafo del articulado (ficha k, párrafo j) que más se le parece.
// Uso: node prompts/herramientas/tema5/rmatch.js
const X = require('../expres-lib.js')(5);
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'recuerda-fichas-t5.js'), 'utf8');
const re = /^\s*r\((\d+), (\w+), '((?:[^'\\]|\\.)*)', '((?:[^'\\]|\\.)*)'/gm;
const rs = [...src.matchAll(re)].map(m => ({ n: +m[1], norma: m[2], enun: m[3].replace(/\\'/g, "'"), resp: m[4].replace(/\\'/g, "'") }));
const nrm = s => String(s).replace(/<[^>]+>/g, ' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, ' ').trim();
const VAC = new Set('de la el los las del al y e o u en que se a un una con su sus por para como lo le les sin mas este esta presente reglamento estados estado miembros miembro'.split(' '));
const tok = s => new Set(nrm(s).split(' ').filter(w => w.length > 3 && !VAC.has(w)));
const RANGO = { SIS: [0, 62], VIS: [63, 152], CV: [153, 186], EUR: [189, 244], DEC: [63, 152], AEC: [245, 249] };
const out = [];
for (const r of rs) {
  const [a, b] = RANGO[r.norma]; const t = tok(r.enun + ' ' + r.resp); let best = null;
  X.fichas.forEach((f, k) => { if (k < a || k > b) return; f.ps.forEach((p, j) => { const pt = tok(p.h); const c = [...t].filter(w => pt.has(w)).length; const sc = c / Math.max(4, Math.min(t.size, 14)); if (!best || sc > best.sc) best = { k, j, sc, t: nrm(p.h).slice(0, 90) }; }); });
  out.push({ n: r.n, ...best, cab: String(X.fichas[best.k].cab || '').replace(/<[^>]+>/g, '').slice(0, 40) });
}
console.log('R leídas:', rs.length);
out.forEach(o => console.log(`R${o.n} -> ${o.k}-${o.j} (${o.sc.toFixed(2)}) ${o.cab} | ${o.t}`));
