// Pone las marcas EXOF / EX / ✱ / R a las piezas del T5 en expres-subrayado/datos-t5.js (campo «m»), sacadas del Exprés de esquemas (expres/t5.js).
// Cada pieza del T5 es una página del resumen con una lista de artículos en su nombre («… · pág. 11 · Arts. 35, 36, 37, 39, 40»); la marca de la pieza es la unión de las de esos artículos en su norma.
// Las páginas de Eurodac no traen la lista de artículos y quedan sin marcas (solo cuentan sus preguntas oficiales).
// Uso: node prompts/herramientas/tema5/marcas-subrayado-t5.js        (volver a ejecutarlo si se regenera datos-t5.js o expres/t5.js)
const fs = require('fs');
const B = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
global.window = {}; require(B + 'expres/t5.js');
const h = window.EXPRES_T[5].html;
const NORMA = [[/^5\.1\b/, 's'], [/^5\.2\b/, 'v'], [/^5\.3\b/, 'c'], [/^5\.5\b/, 'e']];
const clave = s => s.toLowerCase().replace(/\s+/g, ' ').trim();
const sufijos = '(?:bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies|terdecies|quaterdecies|quindecies|sexdecies|septdecies|octodecies|novodecies|vicies)';
const arts = {};   // 's|35' → {exof, ex, ast, r:Set}
let norma = null;
for (const f of h.split(/(?=<div class="bloque-titulo">|<div class="ex-ficha)/)) {
  const t = ((f.match(/(?:ex-fh|bloque-titulo)">(.*?)<\/div>/) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (/^<div class="bloque-titulo/.test(f)) { const n = NORMA.find(x => x[0].test(t)); if (n) norma = n[1]; continue; }
  if (!norma || !/^Art[íi]culos?\s+\d/i.test(t)) continue;
  const lista = t.split(/\s+—\s+/)[0].replace(/\s*(?:EXOF|EX|✱|R\d+)(?![\wÁ-ú])/g, '').replace(/^Art[íi]culos?\s+/i, '');
  const nums = new Set();
  for (const m of lista.matchAll(new RegExp('(\\d+)(?:\\s+(' + sufijos + '))?', 'gi'))) nums.add(clave(m[1] + (m[2] ? ' ' + m[2] : '')));
  for (const m of lista.matchAll(/(\d+)\s+a\s+(\d+)/gi)) for (let n = +m[1]; n <= +m[2]; n++) nums.add(String(n));
  const mk = { exof: 0, ex: 0, ast: 0, r: new Set() };
  if (/\bEXOF\b/.test(t)) mk.exof = 1; if (/✱/.test(t)) mk.ast = 1; if (/(?:^|\s)EX(?![\wÁ-ú])/.test(t.replace('EXOF', ''))) mk.ex = 1;
  for (const m of t.matchAll(/\bR(\d+)\b/g)) mk.r.add(+m[1]);
  for (const pm of f.matchAll(/<p((?:\s[^>]*)?)>([\s\S]*?)<\/p>/g)) {
    const at = pm[1], mx = ((at.match(/data-ex="([^"]*)"/) || [])[1] || '').split(',').filter(Boolean);
    const ofic = [...pm[2].matchAll(/data-q="([^"]+)"/g)].flatMap(x => x[1].split(/[ ,;|]+/)).some(q => q && !/-ia-/.test(q));
    if (mx.includes('EXOF')) mk.exof = 1; else if (mx.includes('EX') || mx.includes('1') || ofic) mk.ex = 1;
    if (mx.includes('*')) mk.ast = 1;
    ((at.match(/data-r="([^"]*)"/) || [])[1] || '').split(',').forEach(r => { const n = +(r.match(/\d+/) || [0])[0]; if (n) mk.r.add(n); });
  }
  for (const n of nums) { const k = norma + '|' + n; const a = arts[k] = arts[k] || { exof: 0, ex: 0, ast: 0, r: new Set() }; a.exof |= mk.exof; a.ex |= mk.ex; a.ast |= mk.ast; mk.r.forEach(x => a.r.add(x)); }
}
const EUR = fs.existsSync(B + 'expres-subrayado/t5-eurodac-paginas.json') ? JSON.parse(fs.readFileSync(B + 'expres-subrayado/t5-eurodac-paginas.json', 'utf8')) : {};
const fd = B + 'expres-subrayado/datos-t5.js';
let src = fs.readFileSync(fd, 'utf8');
const ini = src.indexOf('={') + 1, fin = src.lastIndexOf('};') + 1;
const J = JSON.parse(src.slice(ini, fin));
// Preguntas de Eurodac que citan un artículo y no tenían pieza: se enlazan a la página de Eurodac donde empieza ese artículo (según t5-eurodac-paginas.json).
const PREG_EXTRA = { '5-64': 'e-147', '5-ia-2051': 'e-147', '5-ia-2054': 'e-147', '5-ia-1865': 'e-99', '5-ia-1900': 'e-99', '5-ia-1922': 'e-116', '5-ia-1951': 'e-118', '5-ia-2022': 'e-134', '5-ia-2102': 'e-134' };
let nuevas = 0; for (const [q, pz] of Object.entries(PREG_EXTRA)) if (!J.preg[q] && J.piezas.some(p => p.id === pz)) { J.preg[q] = pz; nuevas++; }
let con = 0, sin = [];
for (const p of J.piezas) {
  let tr = p.nombre.match(/·\s*Arts?\.\s*(.+)$/i); delete p.m;
  if (!tr) {   // Eurodac: la lista de artículos de cada página sale de expres-subrayado/t5-eurodac-paginas.json (prompts/herramientas/tema5/eurodac-paginas-t5.py)
    const pg = (p.nombre.match(/pág\.\s*(\d+) de la parte 2/) || [])[1], lst = EUR[pg];
    if (!lst) { sin.push(p.id); continue; }
    tr = [null, lst.join(', ')];
  }
  const mk = { exof: 0, ex: 0, ast: 0, r: new Set() };
  for (const x of tr[1].split(/\s*,\s*/)) { const a = arts[p.id[0] + '|' + clave(x)]; if (!a) continue; mk.exof |= a.exof; mk.ex |= a.ex; mk.ast |= a.ast; a.r.forEach(r => mk.r.add(r)); }
  const m = {}; if (mk.exof) m.exof = 1; if (mk.ex) m.ex = 1; if (mk.ast) m.ast = 1; if (mk.r.size) m.r = [...mk.r].sort((a, b) => a - b);
  if (Object.keys(m).length) { p.m = m; con++; }
}
fs.writeFileSync(fd, src.slice(0, ini) + JSON.stringify(J) + src.slice(fin));
console.log('piezas', J.piezas.length, '· con marcas', con, '· sin lista de artículos (Eurodac)', sin.length);
