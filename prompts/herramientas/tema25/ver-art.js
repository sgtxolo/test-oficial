// Muestra los párrafos de una ficha del esquema T25 para colocar marcas. Uso: node ver-art.js <T25.loe|l31|rd|eur|int> "Artículo 13"
const fs = require('fs'); const s = fs.readFileSync('esquemas-datos/t25.js', 'utf8');
const [k, nom] = process.argv.slice(2);
const i = s.indexOf('["T25.' + k + '"]='); let j = s.indexOf('(window.ESQ_TXT', i + 5); const t = JSON.parse(s.slice(s.indexOf('="', i) + 1, (j < 0 ? s.length : j)).replace(/;\s*$/, ''));
const heads = t.split('<div class="articulo">');
for (const h of heads) { const m = h.match(/articulo-head">([^<]*)</); if (!m || !m[1].startsWith(nom + ' ')) continue; console.log('##', m[1]); for (const p of h.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) console.log('  ', p[1].replace(/<[^>]+>/g, '').slice(0, 110)); }
