// Mide el volumen de subrayado (Método Prefortia) de un tema en esquemas.html.
// Uso (desde la carpeta del proyecto):  node prompts/herramientas/densidad.js 6
// Cuenta, dentro de los párrafos del tema (región «const TN = {}» … «/* TN_RECUERDA»), qué parte del texto va en
// <mark> o <u>. Objetivo del proyecto: ≥ 70 % de los CARACTERES (los temas 1, 4 y 5 están en 68-73 %).
const fs = require('fs');
const N = process.argv[2];
if (!N) { console.log('Uso: node prompts/herramientas/densidad.js N'); process.exit(1); }
const s = fs.readFileSync('esquemas.html', 'utf8');
const a = s.indexOf('const T' + N + ' = {}'), b = s.indexOf('/* T' + N + '_RECUERDA');
if (a < 0 || b < 0) { console.log('No encuentro el bloque del tema ' + N); process.exit(1); }
const r = s.slice(a, b).replace(/\\"/g, '"');
let col = 0, tot = 0, colc = 0, totc = 0;
for (const m of r.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
  for (const seg of m[1].split(/(<mark[^>]*>[\s\S]*?<\/mark>|<u[^>]*>[\s\S]*?<\/u>)/)) {
    const pl = seg.replace(/<[^>]+>/g, ' ');
    const w = (pl.match(/[\p{L}\p{N}]+/gu) || []).length;
    tot += w; totc += pl.length;
    if (/^<(mark|u)/.test(seg)) { col += w; colc += pl.length; }
  }
}
console.log(`Tema ${N}: ${(100 * colc / totc).toFixed(1)} % de los caracteres y ${(100 * col / tot).toFixed(1)} % de las palabras subrayadas (${col}/${tot} palabras)`);
console.log(100 * colc / totc >= 70 ? 'OK: alcanza el 70 %' : 'AVISO: por debajo del 70 %, hay que subrayar más');
