// Tema 7 · ¿qué párrafos con marca suya (data-ex / data-r) no tienen ninguna pregunta OFICIAL situada en ellos (mapa-preguntas)?
// Uso: node prompts/herramientas/tema7/cobertura-marcas-t7.js
const fs = require('fs'), path = require('path');
const X = require('../expres-lib.js')(7);
const h = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'esquemas.html'), 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const en = {}; for (const [id, v] of Object.entries(MAPA)) { const m = v.match(/^7-(\d+)-(\d+)/); if (m) (en[m[1] + '-' + m[2]] = en[m[1] + '-' + m[2]] || []).push(id); }
let sin = 0, con = 0;
X.fichas.forEach((f, k) => f.ps.forEach((p, j) => {
  const ex = (p.at.match(/data-ex=\\?"([^"\\]*)/) || [])[1], r = (p.at.match(/data-r=\\?"([^"\\]*)/) || [])[1];
  if (!ex && !r) return;
  const ids = en[k + '-' + j] || []; const of = ids.filter(i => !/-ia-/.test(i));
  if (of.length) con++; else sin++;
  console.log((of.length ? '  ' : '✗ ') + `${k}-${j} [${[ex, r].filter(Boolean).join(' ')}] of:${of.length} ia:${ids.length - of.length} · ${limpia(f.cab).slice(0, 38)} · ${limpia(p.h).slice(0, 70)}`);
}));
console.log(`párrafos con marca: ${con + sin} · con pregunta oficial: ${con} · sin ella: ${sin}`);
