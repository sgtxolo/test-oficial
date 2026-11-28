// (Vale para los lotes d* y e*; los temas sin clave-tests/tN-sec.js se saltan.)
// Retira preguntas de los lotes del 28/11 (repetidas detectadas en la segunda pasada) sin renumerar las demás.
// Uso: node prompts/herramientas/oficiales-seras-28-11-quitar.js 3-510 1-694 ...
const fs = require('fs');
const ids = process.argv.slice(2); const BS = String.fromCharCode(92);
const F = 'test-oficial-conocimiento.html'; let h = fs.readFileSync(F, 'utf8');
for (const id of ids) {
  const i = h.indexOf('{"id":"' + id + '"'); if (i < 0) continue;
  let d = 0, str = false, e = false, j = i;
  for (; j < h.length; j++) { const c = h[j]; if (str) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}' && !--d) break; }
  if (h[i - 1] === ',') h = h.slice(0, i - 1) + h.slice(j + 1); else h = h.slice(0, i) + h.slice(h[j + 1] === ',' ? j + 2 : j + 1);
}
fs.writeFileSync(F, h);
const lee = f => { const w = {}; new Function('window', fs.readFileSync(f, 'utf8'))(w); return w; };
for (const t of [...new Set(ids.map(i => +i.split('-')[0]))]) {
  const re = new RegExp('"(' + ids.join('|') + ')":"[^"]*",?', 'g');
  for (const f of ['esquemas-datos/mapa-preguntas.js', `expres-subrayado/datos-t${t}.js`].filter(f => fs.existsSync(f))) fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(re, ''));
  for (const f of [`prompts/herramientas/tema${t}/mapa-fijo-t${t}.json`, `expres-subrayado/t${t}-preg-extra.json`].filter(f => fs.existsSync(f))) { const o = JSON.parse(fs.readFileSync(f, 'utf8')); ids.forEach(i => delete o[i]); fs.writeFileSync(f, JSON.stringify(o, null, 1)); }
  for (const [f, k] of [[`clave-tests/t${t}-esq.js`, 'CLAVE_ESQ'], [`clave-tests/t${t}-sec.js`, 'CLAVE_SEC']].filter(x => fs.existsSync(x[0]))) {
    const v = lee(f)[k][t].filter(x => !ids.includes(x)).map(x => Array.isArray(x) ? x.filter(y => !ids.includes(y)) : x);
    const x = fs.readFileSync(f, 'utf8'), p = x.indexOf(`[${t}]=`) + `[${t}]=`.length; fs.writeFileSync(f, x.slice(0, p) + JSON.stringify(v) + ';' + String.fromCharCode(10));
  }
}
const fuera = [];
for (const f of fs.readdirSync('prompts/herramientas').filter(f => /^oficiales-seras-28-11-(d\d|e\d+)\.json$/.test(f))) {
  const p = 'prompts/herramientas/' + f; const L = JSON.parse(fs.readFileSync(p, 'utf8'));
  fuera.push(...L.filter(q => ids.includes(q.id))); fs.writeFileSync(p, JSON.stringify(L.filter(q => !ids.includes(q.id)), null, 1));
}
const R = 'prompts/herramientas/video/retiradas-28-11-tarde.json';
const ya = fs.existsSync(R) ? JSON.parse(fs.readFileSync(R, 'utf8')) : [];
fs.writeFileSync(R, JSON.stringify(ya.concat(fuera), null, 1));
console.log('retiradas', fuera.length);
