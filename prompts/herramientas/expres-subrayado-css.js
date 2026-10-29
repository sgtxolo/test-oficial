// Extrae de esquemas.html los estilos de las fichas del Exprés (.ex-*, .bloque-titulo) y de los cuadros (.vis*, .m-*)
// para que expres-subrayado.html los pinte igual. Uso: node prompts/herramientas/expres-subrayado-css.js
const fs = require('fs'); const h = fs.readFileSync('esquemas.html', 'utf8');
const css = [...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).filter(s => !/base64/.test(s.slice(0, 3000)) || s.length < 200000).join('\n').replace(/url\(data:[^)]{200,}\)/g, 'url(…)');
function reglas(c) { const out = []; let i = 0; while (i < c.length) { const a = c.indexOf('{', i); if (a < 0) break; let d = 1, j = a + 1; while (j < c.length && d > 0) { if (c[j] === '{') d++; else if (c[j] === '}') d--; j++; } out.push([c.slice(i, a).trim(), c.slice(a, j)]); i = j; } return out; }
const R = reglas(css);
// cuadros y colores de marcado
const cuadros = R.filter(([s, b]) => (s.startsWith('@media') ? /\.(vis|m-)/.test(b) : /\.(vis|m-|r-ia|ro\b)/.test(s)));
// fichas del Exprés (sin las reglas de marcado, que ya van en esquema.css)
const ficha = R.filter(([s]) => !s.startsWith('@') && /\.ex-(ficha|fh|fb|p\b|of|ast|r\b|sello|linea|plg)|\.head-sellos|\.bloque-titulo/.test(s) && !/^(mark|span|u)\./.test(s));
fs.writeFileSync('expres-subrayado/esquema.css', cuadros.map(([s, b]) => s + b).join('\n'));
fs.writeFileSync('expres-subrayado/exprestyle.css', ficha.map(([s, b]) => s + b).join('\n'));
console.log('cuadros', cuadros.length, 'reglas · fichas', ficha.length, 'reglas');
