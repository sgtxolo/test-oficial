// Genera expres-subrayado/datos-tN.js: lista de recortes + mapa pregunta -> recorte (desde las marcas data-q del Exprés) + reglas de cita.
// Uso: node prompts/herramientas/expres-subrayado-datos.js 7 "Tema 7 · Derechos y deberes fundamentales"
const fs = require('fs'); const T = process.argv[2], titulo = process.argv[3];
const dir = `expres-subrayado/img/t${T}/`; const ix = JSON.parse(fs.readFileSync(dir + 'indice.json', 'utf8'));
const inst = JSON.parse(fs.readFileSync(`expres-subrayado/t${T}-instrumentos.json`, 'utf8'));
const manP = `expres-subrayado/t${T}-manual.json`; const man = fs.existsSync(manP) ? JSON.parse(fs.readFileSync(manP, 'utf8')) : { manual: [] };
const manEx = new Set((man.manual || []).filter(m => m.expres).map(m => m.id));
const orden = id => {
  const [l, n] = id.split('-'); const i = inst.findIndex(x => x.id === l);
  const r = n === 'datos' ? -2 : n === 'pre' ? -1 : n === 'ad' ? 0 : n === 'fin' ? 1e6 : (+n || 0);
  return (i < 0 ? 99 : i) * 1e7 + r;
};
ix.sort((x, y) => orden(x.id) - orden(y.id));
function numeros(t) {
  const s = t.replace(/^Art[íi]culos?\s+/i, '').split(/\s+—\s+/)[0]; const out = new Set();
  for (const m of s.matchAll(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi)) for (let n = +m[1]; n <= +m[2]; n++) out.add(n);
  for (const m of s.replace(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi, '').matchAll(/\d+/g)) out.add(+m[0]);
  return [...out];
}
global.window = {}; require('../../expres/t' + T + '.js'); const h = window.EXPRES_T[T].html;
const ids = new Set(ix.map(p => p.id)), preg = {}, enEx = new Set(); let cur = null, ixCur = -1;
const trozos = h.split(/(?=<div class="bloque-titulo">|<div class="ex-ficha">)/);
for (const f of trozos) {
  const t = ((f.match(/(?:ex-fh|bloque-titulo)">(.*?)<\/div>/) || [])[1] || '').replace(/<[^>]+>/g, '');
  if (/^ANEXO/.test(t)) break;
  const k = inst.findIndex((i, j) => j > ixCur && i.inicio && new RegExp(i.inicio).test(t)); if (k >= 0) { ixCur = k; cur = inst[k].id; }
  if (!f.startsWith('<div class="ex-ficha">') || !cur || !/^Art[íi]culos?\s+\d/i.test(t)) continue;
  const piezas = numeros(t).map(n => cur + '-' + n).filter(p => ids.has(p)); piezas.forEach(p => enEx.add(p));
  if (!piezas.length) continue;
  for (const m of f.matchAll(/data-q="([^"]+)"/g)) m[1].split(/[ ,;|]+/).forEach(q => { if (!preg[q]) preg[q] = piezas[0]; });
}
ix.forEach(p => { if (!enEx.has(p.id) && !manEx.has(p.id) && !/^r-/.test(p.id)) p.extra = 1; });   // fuera del Exprés: solo se ve al llegar desde una pregunta
const cit = inst.map(i => ({ p: i.id, re: i.cit, pre: i.pre || null, pre_re: i.pre_re || null, proto: i.proto ? 1 : 0 }));
fs.writeFileSync(`expres-subrayado/datos-t${T}.js`, `(window.EXSUB=window.EXSUB||{})[${T}]=` + JSON.stringify({ titulo, dir, piezas: ix, preg, cit }) + ';');
console.log(ix.length, 'recortes (' + ix.filter(p => p.extra).length + ' fuera del Exprés),', Object.keys(preg).length, 'preguntas enlazadas');
