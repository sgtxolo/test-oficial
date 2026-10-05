// Une los <mark> contiguos del mismo color separados solo por espacios (más cómodo para estudiar).
// Uso: node prompts/herramientas/unir-subrayados.js   (no toca m-resp, la respuesta clave)
const fs = require('fs');
let s = fs.readFileSync('esquemas.html', 'utf8');
const re = /<\/mark>([ \t]+)<mark class=([^m]{0,2})(m-(?:destacable|autoridad|plazo|accion|personalizado))\2>/g;
let total = 0, n;
do { n = 0; s = s.replace(re, (m, sp, q, c, off, str) => {
  // solo si el <mark> que se cierra es de la misma clase
  const pre = str.lastIndexOf('<mark class=', off);
  const cls = str.slice(pre, off).match(/m-[a-z]+/);
  if (!cls || cls[0] !== c) return m;
  n++; return sp; }); total += n; } while (n);
fs.writeFileSync('esquemas.html', s);
console.log('uniones:', total);
