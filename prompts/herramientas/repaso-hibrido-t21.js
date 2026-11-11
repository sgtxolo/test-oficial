// Monta repaso-t21-borrador.html (Esquema clave del Tema 21) a partir de las fichas del Exprés (expres/t21.js), que ya llevan el subrayado del usuario.
// Criterio: marcas EXOF, fichas R, preguntas oficiales enlazadas (+ ✱); por presupuesto de caracteres. Plantilla de cabecera/estilo/editor: repaso-t2-borrador.html.
// Uso: node prompts/herramientas/repaso-hibrido-t21.js [presupuestoCaracteres]   (por defecto 42000)
const fs = require('fs'), crypto = require('crypto');
const { fichas } = require('./repaso-parse-t21.js');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const PRES = +(process.argv[2] || 42000), LARGA = 2800;
const F = fichas();

// --- limpieza del cuerpo de una ficha del Exprés → HTML de repaso (clases y, d, a, p, c, k) ---
const esOf = ids => ids.split(',').some(q => !/ia/.test(q));
function limpia(b) {
  b = b.replace(/<span class="ex-plg"[^>]*><span class="ex-plg-t">([\s\S]*?)<\/span><\/span>/g, '$1');          // huecos (…) abiertos
  b = b.replace(/<mark class="m-resp[^"]*"[^>]*>🎯[^<]*<\/mark>/g, '');                                       // «🎯 N preguntas»
  for (let i = 0; i < 3; i++) b = b.replace(/<mark class="m-resp[^"]*"[^>]*>([\s\S]*?)<\/mark>/g, '$1');      // marcas de pregunta IA
  b = b.replace(/<u class="m-clave">([\s\S]*?)<\/u>/g, '<mark class="k">$1</mark>')
    .replace(/class="m-personalizado"/g, 'class="y"').replace(/class="m-destacable"/g, 'class="d"').replace(/class="m-autoridad"/g, 'class="a"')
    .replace(/class="m-plazo"/g, 'class="p"').replace(/class="m-accion"/g, 'class="c"').replace(/<mark class="m-(circulo|caja)[^"]*">([\s\S]*?)<\/mark>/g, '$2')
    .replace(/<span class="ex-sello ex-sello-r">(R\d+)<\/span>/g, '<span class="b r">$1</span>')
    .replace(/<span class="ex-sello">EXOF<\/span>/g, '<span class="b of">EXOF</span>').replace(/<span class="ex-sello">✱<\/span>/g, '<span class="b ex">✱</span>')
    .replace(/ data-(ex|r)="[^"]*"/g, '').replace(/ style="[^"]*"/g, ' style="margin-left:14px"').replace(/<div class="ex-linea">/g, '<div class="lin">');
  return b.replace(/  +/g, ' ');
}
// en fichas largas solo quedan los párrafos con pregunta oficial, EXOF o R
function recorta(f) {
  if (f.len <= LARGA) return { html: f.body, recortada: false };
  const ps = f.body.match(/<(p|div)\b[^>]*>[\s\S]*?<\/\1>/g) || [f.body];
  const k = ps.filter(p => /data-ex=|data-r=/.test(p) || [...p.matchAll(/data-q="([^"]+)"[^>]*>🎯/g)].some(m => esOf(m[1])));
  return { html: (k.length ? k : ps.slice(0, 2)).join(''), recortada: k.length < ps.length };
}
const txt = h => h.replace(/<[^>]+>/g, '').length;
const score = f => f.exof * 5 + f.r.length * 3 + Math.min(f.of, 4) * 1.5 + (f.ast ? 1 : 0);
const cand = F.map((f, i) => { const rc = recorta(f); return Object.assign({ i, score: score(f) }, f, { rc: rc.html, recortada: rc.recortada, vis: txt(rc.html) }); }).filter(f => f.of > 0 || f.exof || f.r.length);
let usado = 0; const sel = new Set();
cand.slice().sort((a, b) => b.score / Math.sqrt(b.vis + 200) - a.score / Math.sqrt(a.vis + 200)).forEach(f => { if (usado + f.vis <= PRES) { sel.add(f.i); usado += f.vis; } });
let body = '', ley = '', nFich = 0;
cand.filter(f => sel.has(f.i)).forEach(f => {
  if (f.ley !== ley) { ley = f.ley; body += '<h2>' + ley + '</h2>'; }
  nFich++;
  body += '<div class="art' + (f.exof ? ' of' : '') + '"><h3>' + f.hd.replace(/<mark[^>]*>|<\/mark>|<u[^>]*>|<\/u>/g, '') + '</h3>' + limpia(f.rc) + (f.recortada ? '<p class="rec">(…) solo los apartados con pregunta, EXOF o ficha R</p>' : '') + '</div>\n';
  body = body.replace(/<span class="ex-sello ex-sello-r">(R\d+)<\/span>/g, '<span class="b r">$1</span>').replace(/<span class="ex-sello">EXOF<\/span>/g, '<span class="b of">EXOF</span>').replace(/<span class="ex-sello">✱<\/span>/g, '<span class="b ex">✱</span>');
});
body = body.replace(/<div class="art([^"]*)"><h3>([^<]*)<\/h3>/g, (m, c, h) => m);   // (sin cambios)

// --- plantilla: se toma de repaso-t2-borrador.html (estilo, editor, tema claro/oscuro, móvil) ---
const T2 = fs.readFileSync(R + 'repaso-t2-borrador.html', 'utf8');
const iH1 = T2.indexOf('<h1>'), iRc = T2.indexOf('<div id="rc"'), iPie = T2.indexOf('</div>\n<p class="pie">');
let head = T2.slice(0, iH1).replace(/<title>[^<]*<\/title>/, '<title>Esquema clave Tema 21</title>')
  .replace('</style>', '.lin{margin:2px 0}.rec{color:var(--gris);font-size:.85em;margin:2px 0}.art li{margin:0}</style>');
const ed = T2.slice(T2.indexOf('<div class="ed-top">'), iRc);
const cab = '<h1>Tema 21 · Derecho Procesal Penal (II) — esquema clave</h1>\n<p class="sub">Construido con tus marcas <span class="b of">EXOF</span>, las fichas <span class="b r">R</span>, las preguntas OFICIALES enlazadas y tu subrayado · texto literal de cada norma (en las fichas largas solo los apartados con pregunta)</p>\n<div class="leyenda cod"><span><mark class="d">Palabras destacables</mark></span><span><mark class="a">Autoridades y órganos</mark></span><span><mark class="p">Plazos, cifras y mayorías</mark></span><span><mark class="c">Acciones</mark></span><span><mark class="y">Contenido general (personalizado)</mark></span><span><mark class="k">palabras clave: no, podrá, deberá…</mark></span></div>\n\n';
const VER = crypto.createHash('md5').update(body).digest('hex').slice(0, 8);
const pie = T2.slice(iPie).replace(/<p class="pie">[\s\S]*?<\/p>/, '<p class="pie">Esquema clave del Tema 21: marcas EXOF, fichas R y preguntas oficiales, con tu subrayado.</p>');
const out = head + cab + ed + '<div id="rc" data-id="t21" data-ver="' + VER + '">' + body + pie;
fs.writeFileSync(R + 'repaso-t21-borrador.html', out);
console.log('fichas', nFich, 'de', cand.length, 'candidatas; caracteres', usado, 'archivo', out.length);
