// Exporta, para cada artículo del Exprés de un tema, qué apartados (1., 2., 3.…) lleva el Exprés.
// Uso: node prompts/herramientas/expres-subrayado-apartados.js 7 > expres-subrayado/t7-apartados.json
// Salida: {"a-1":[1,2], "a-5":[], ...}   ([] = el artículo no tiene apartados numerados en el Exprés → se recorta entero)
const fs = require('fs'); const T = process.argv[2];
const inst = JSON.parse(fs.readFileSync(`expres-subrayado/t${T}-instrumentos.json`, 'utf8'));
global.window = {}; require('../../expres/t' + T + '.js'); const h = window.EXPRES_T[T].html;
function numeros(t) {
  const s = t.replace(/^Art[íi]culos?\s+/i, '').split(/\s+—\s+/)[0]; const out = new Set();
  for (const m of s.matchAll(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi)) for (let n = +m[1]; n <= +m[2]; n++) out.add(n);
  for (const m of s.replace(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi, '').matchAll(/\d+/g)) out.add(+m[0]);
  return [...out];
}
const res = {}; let cur = null, ixCur = -1;
for (const f of h.split(/(?=<div class="bloque-titulo">|<div class="ex-ficha(?: ex-of)?">)/)) {
  const t = ((f.match(/(?:ex-fh|bloque-titulo)">(.*?)<\/div>/) || [])[1] || '').replace(/<[^>]+>/g, '');
  if (/^ANEXO/.test(t)) break;
  const k = inst.findIndex((i, j) => j > ixCur && i.inicio && new RegExp(i.inicio).test(t)); if (k >= 0) { ixCur = k; cur = inst[k].id; }
  if (!/^<div class="ex-ficha(?: ex-of)?">/.test(f) || !cur || !/^Art[íi]culos?\s+\d/i.test(t)) continue;
  const ns = numeros(t); const ap = [...new Set([...f.matchAll(/<b>(\d+)\.<\/b>/g)].map(m => +m[1]))].sort((a, b) => a - b);
  for (const n of ns) res[cur + '-' + n] = ns.length === 1 ? ap : [];   // fichas de varios artículos: sin recorte por apartados
}
console.log(JSON.stringify(res));
