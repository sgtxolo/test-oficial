// Genera expres-subrayado/datos-tN.js: lista de recortes + mapa pregunta -> recorte (desde las marcas data-q del Exprés).
// Uso: node prompts/herramientas/expres-subrayado-datos.js 7 "Tema 7 · Derechos y deberes fundamentales"
const fs = require('fs'); const T = process.argv[2], titulo = process.argv[3];
const dir = `expres-subrayado/img/t${T}/`; const ix = JSON.parse(fs.readFileSync(dir + 'indice.json', 'utf8'));
const o = r => { const [l, n] = r.id.split('-'); return (l === 'a' ? 0 : l === 'c' ? 1 : 2) * 1000 + (+n || 0); };
ix.sort((x, y) => o(x) - o(y));
global.window = {}; require('../../expres/t' + T + '.js'); const h = window.EXPRES_T[T].html;
const ids = new Set(ix.map(p => p.id)), preg = {}; let ley = 0, prev = 0;
for (const f of h.split('<div class="ex-ficha">').slice(1)) {
  const t = ((f.match(/ex-fh">(.*?)<\/div>/) || [])[1] || '').replace(/<[^>]+>/g, '');
  const a = t.match(/^Artículo (\d+)/); if (!a) continue;
  const n = +a[1]; if (n < prev) ley++; prev = n;
  const pid = (ley ? 'c-' : 'a-') + n; if (!ids.has(pid)) continue;
  for (const m of f.matchAll(/data-q="([^"]+)"/g)) m[1].split(/[ ,;|]+/).forEach(q => { if (!preg[q]) preg[q] = pid; });
}
fs.writeFileSync(`expres-subrayado/datos-t${T}.js`, `(window.EXSUB=window.EXSUB||{})[${T}]=` + JSON.stringify({ titulo, dir, piezas: ix, preg }) + ';');
console.log(ix.length, 'recortes,', Object.keys(preg).length, 'preguntas enlazadas');
