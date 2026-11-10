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
// ---- editor de colores (seleccionar texto -> barra de colores; se guarda en el navegador) ----
const EDITOR_CSS = `
.ed-top{border:1px dashed #9ab;border-radius:8px;padding:6px 10px;font-size:12px;margin:0 0 10px;color:var(--gris)}
.ed-top button{font:inherit;border:1px solid var(--linea);background:transparent;color:inherit;border-radius:99px;padding:2px 10px;margin-left:6px;cursor:pointer}
#ed-st{margin-left:8px;color:#15803d}
#ed-bar{position:absolute;z-index:99;display:flex;gap:4px;background:#222;border-radius:10px;padding:5px;box-shadow:0 3px 14px rgba(0,0,0,.35)}
.ed-b{width:30px;height:30px;border:2px solid transparent;border-radius:8px;font:700 14px/1 sans-serif;cursor:pointer;color:#222}
.ed-y{background:#f7e79a}.ed-d{background:#f7c9a8}.ed-a{background:#bfe3c4}.ed-p{background:#a9d3ea}.ed-c{background:#c9b7e0}.ed-k{background:#fff;color:#222}.ed-k u{text-decoration-color:#dc2626;text-decoration-thickness:2px}.ed-x{background:#444;color:#fff}
.vis-wrap mark.d{background:#f7c9a8;color:#3a2213;padding:1px 3px;border-radius:3px}.vis-wrap mark.a{background:#bfe3c4;color:#173a1e;padding:1px 3px;border-radius:3px}.vis-wrap mark.p{background:#a9d3ea;color:#0f2c3d;padding:1px 3px;border-radius:3px}.vis-wrap mark.c{background:#c9b7e0;color:#2c1c40;padding:1px 3px;border-radius:3px}.vis-wrap mark.y{background:#f7e79a;color:#463a04;padding:1px 3px;border-radius:3px}.vis-wrap mark.k{background:transparent;color:inherit;font-weight:600;text-decoration:underline solid #dc2626;text-decoration-thickness:2px;text-underline-offset:2px;padding:0}
@media print{.ed-top,#ed-bar{display:none!important}}
`;
style = style.replace('</style>', EDITOR_CSS + '</style>');
const ED_TOP = '<div class="ed-top">✏️ <b>Editar colores:</b> selecciona un texto (o toca una palabra ya coloreada) y elige el color · se guarda en este navegador <button id="ed-undo" type="button">↩ Deshacer</button><button id="ed-reset" type="button">Restaurar original</button><span id="ed-st"></span></div>';
const crypto = require('crypto'); const VER = crypto.createHash('md5').update(body).digest('hex').slice(0, 8);   // mismo contenido = mismos cambios guardados
const EDITOR_JS = fs.readFileSync(R + 'prompts/herramientas/repaso-editor.js', 'utf8');
const cab = hib.slice(hib.indexOf('<h1>'), hib.indexOf('<div class="vis-wrap"'));
const cabLimpia = cab.slice(0, cab.indexOf('<h2>'));
const out = hib.slice(0, hib.indexOf('<style>')) + style + hib.slice(hib.indexOf('</style>') + 8, hib.indexOf('<h1>')) + cabLimpia + ED_TOP + '<div id="rc" data-id="t2" data-ver="' + VER + '">' +
  body + '</div>\n<p class="pie">Borrador: texto como base (palabra por palabra, código Prefortia) y 6 esquemas de la app de Esquemas donde ayudan (comparativas y tablas).</p>\n</div><script>' + EDITOR_JS + '</script><script>if(location.hash==="#imprimir"){window.addEventListener("load",function(){setTimeout(function(){window.print()},300)})}</script>\n</body></html>';
fs.writeFileSync(R + 'repaso-t2-borrador.html', out);
console.log('ok', out.length, 'letra', FS + 'pt');
