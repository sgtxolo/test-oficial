// Amarillo (m-personalizado): une dos marcas amarillas separadas solo por palabras de enlace (de, con, el, a lo...).
// Uso: node prompts/herramientas/unir-amarillo.js   (ejecutar despues de unir-subrayados.js)
const fs = require('fs');
let s = fs.readFileSync('esquemas.html', 'utf8');
const sw = 'de|del|la|el|los|las|lo|al|con|y|e|o|u|a|en|por|para|que|se|su|sus|un|una|ni|sin|su|como|entre|sobre|ante|este|esta|dicho|dicha';
const re = new RegExp('</mark>((?: +(?:' + sw + ')){1,4} +)<mark class=([^m]{0,2})m-personalizado[^>]*>', 'gi');
let total = 0, n;
do { n = 0; s = s.replace(re, (m, gap, q, off, str) => {
  const pre = str.lastIndexOf('<mark class=', off);
  if (!/m-personalizado/.test(str.slice(pre, pre + 40))) return m;
  n++; return gap; }); total += n; } while (n);
fs.writeFileSync('esquemas.html', s);
console.log('uniones amarillo:', total);
