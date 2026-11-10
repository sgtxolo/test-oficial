// Monta repaso-t2-borrador.html: texto como base (página completa, una columna) + esquemas de la app de Esquemas solo donde ayudan.
// Entradas: repaso-t2-solo-texto.html (bloques de texto), repaso-t2-hibrido-v1.html (bloques 56-60 coloreados a mano + CSS de esquemas),
//           %TEMP%/vis/vis-t2.json (esquemas VIS_T2 extraídos de esquemas.html).
// Uso: node prompts/herramientas/repaso-hibrido-t2.js [tamañoLetraPt]   (por defecto 11)
const fs = require('fs');
const { colorea } = require('./repaso-colorear-palabras.js');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const FS = process.argv[2] || '11';
const V = JSON.parse(fs.readFileSync(process.env.TEMP + '/vis/vis-t2.json', 'utf8'));
const solo = fs.readFileSync(R + 'repaso-t2-solo-texto.html', 'utf8');
const hib = fs.readFileSync(R + 'repaso-t2-hibrido-v1.html', 'utf8');

const bloques = [];   // bloques de texto en orden (índice = el del listado de h3)
const re = /<h2>([\s\S]*?)<\/h2>|<div class="art[^"]*"><h3>[\s\S]*?<\/div>\n?/g; let m;
while ((m = re.exec(solo))) { if (m[1]) bloques.push({h2: m[1]}); else bloques.push({art: m[0].trim()}); }
// numeración del listado de títulos: cuenta los <h2> y los bloques por igual (1 = primer h2, 2 = primer bloque…)
const porNum = {}; bloques.forEach((b, i) => { if (b.art) porNum[i + 1] = b.art; });
const A = n => { if (!porNum[n]) throw new Error('no hay bloque ' + n); return porNum[n]; };
// bloques 56-60 coloreados a mano (del híbrido v1)
const hand = {};
[['56', 'Art. 56'], ['57', 'Art. 57'], ['58', 'Art. 58'], ['59', 'Art. 59.1'], ['60', 'Art. 60']].forEach(([k, t]) => {
  const r2 = new RegExp('<div class="art[^"]*"><h3>' + t.replace('.', '\\.') + '[\\s\\S]*?</div>\\n?'); const mm = r2.exec(hib); if (!mm) throw new Error('falta ' + t); hand[k] = mm[0].trim();
});
const vis = k => '<div class="vis-wrap" data-v="' + k + '">' + V[k] + '</div>';
const h2 = t => '<h2>' + t + '</h2>';
const T = n => colorea(A(n));   // texto coloreado palabra por palabra

let body = '';
body += h2('1 · Ley 19/2003 · Movimientos de capitales y transacciones económicas con el exterior');
body += T(2) + T(9) + T(3) + vis('v5') + T(6) + vis('v7') + vis('v8');
body += h2('2 · Convenio del Consejo de Europa para la prevención del terrorismo (Varsovia 2005)');
body += T(11) + T(12) + T(13) + vis('v13') + T(15) + T(16) + T(17) + T(18);
body += h2('3 · Ley 10/2010 · Prevención del blanqueo de capitales y de la financiación del terrorismo');
body += T(23) + T(35) + T(24) + T(36) + T(37) + T(25) + T(38) + T(26) + T(27) + T(28) + T(39) + T(29) + vis('v28') + hand['56'] + hand['57'] + hand['58'] + hand['59'] + hand['60'];
body += h2('4 · Convención de Palermo');
body += vis('v34');
body += h2('5 · Protocolos de Palermo (trata, migrantes y armas de fuego)');
body += T(56) + T(53) + T(54) + T(55);

let style = hib.match(/<style>[\s\S]*?<\/style>/)[0];
style = style.replace(/\.cols\{[^}]*\}/, '.cols{}')
  .replace(/@media print\{@page\{size:A4;margin:[^}]*\}body\{font-size:[^;]*;line-height:[^}]*\}/, '@media print{@page{size:A4;margin:12mm 12mm}body{font-size:' + FS + 'pt;line-height:1.3}');
style = style.replace(/\.hoja\{max-width:1100px/, '.hoja{max-width:900px');
style = style.replace('</style>', '.art{break-inside:avoid;margin:0 0 9px}.art h3{font-size:1.02em}.art li{margin:0 0 2px}.art p{margin:3px 0}@media print{.vis-wrap{zoom:.86}.art{margin:0 0 7px}h2{margin:10px 0 6px}}\n</style>');
const cab = hib.slice(hib.indexOf('<h1>'), hib.indexOf('<div class="vis-wrap"'));
const cabLimpia = cab.slice(0, cab.indexOf('<h2>'));
const out = hib.slice(0, hib.indexOf('<style>')) + style + hib.slice(hib.indexOf('</style>') + 8, hib.indexOf('<h1>')) + cabLimpia +
  body + '\n<p class="pie">Borrador: texto como base (palabra por palabra, código Prefortia) y 6 esquemas de la app de Esquemas donde ayudan (comparativas y tablas).</p>\n</div><script>if(location.hash==="#imprimir"){window.addEventListener("load",function(){setTimeout(function(){window.print()},300)})}</script>\n</body></html>';
fs.writeFileSync(R + 'repaso-t2-borrador.html', out);
console.log('ok', out.length, 'letra', FS + 'pt');
