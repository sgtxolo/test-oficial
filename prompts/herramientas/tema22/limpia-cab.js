require('../esq-virtual.js');
// Quita los <mark> que el alineado del subrayado deja en los TÍTULOS de las fichas (los nombres de norma coinciden con la cabecera impresa de cada página).
const fs = require('fs'), L = require('../literal-lib.js');
let s = fs.readFileSync('esquemas.html', 'utf8'), n = 0;
for (const k of ['T22_RE', 'T22_DP', 'T22_CP']) {
  let h = L.get(s, k).html;
  const h2 = h.replace(/<div class="articulo-head">([\s\S]*?)<\/div>/g, (m, t) => { const u = t.replace(/<\/?mark[^>]*>/g, ''); if (u !== t) n++; return '<div class="articulo-head">' + u + '</div>'; });
  s = L.put(s, k, h2);
}
fs.writeFileSync('esquemas.html', s);
console.log('cabeceras limpiadas:', n);
