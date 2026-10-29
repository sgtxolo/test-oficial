// Construye expres-subrayado/tN-config.json a partir del Exprés del tema y de tN-instrumentos.json (+ tN-manual.json, tN-extra.json).
// Uso: node prompts/herramientas/expres-subrayado-config.js 1
// tN-instrumentos.json: [{id, nombre, paginas:[a,b], inicio:"regex del bloque/ficha que abre el texto", cit:"regex del nombre en «art. N de …»", pre:"id del preámbulo"}]
// tN-extra.json: {"e":[3,4], ...}  artículos que el Exprés no lleva pero que citan las preguntas (se ven solo al llegar desde una pregunta)
const fs = require('fs'); const T = process.argv[2];
const inst = JSON.parse(fs.readFileSync(`expres-subrayado/t${T}-instrumentos.json`, 'utf8'));
global.window = {}; require('../../expres/t' + T + '.js'); const h = window.EXPRES_T[T].html;
const cfg = { leyes: inst.filter(i => i.paginas).map(i => ({ id: i.id, nombre: i.nombre, paginas: i.paginas, arts: [] })), manual: [], paginas: [] };
const ley = id => cfg.leyes.find(l => l.id === id);
let cur = null;
const piezas = [...h.matchAll(/class="(bloque-titulo|ex-fh)">(.*?)<\/div>/g)].map(m => [m[1], m[2].replace(/<[^>]+>/g, '')]);
function numeros(t) {
  const s = t.replace(/^Art[íi]culos?\s+/i, '').split(/\s+—\s+/)[0];
  const out = new Set();
  for (const m of s.matchAll(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi)) for (let n = +m[1]; n <= +m[2]; n++) out.add(n);
  for (const m of s.replace(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi, '').matchAll(/\d+/g)) out.add(+m[0]);
  return [...out];
}
let ixCur = -1;
for (const [tipo, t] of piezas) {
  if (/^ANEXO/.test(t)) break;
  const k = inst.findIndex((i, ix) => ix > ixCur && i.inicio && new RegExp(i.inicio).test(t));
  if (k >= 0) { ixCur = k; cur = inst[k].id; }
  if (!cur || !ley(cur) || tipo !== 'ex-fh' || !/^Art[íi]culos?\s+\d/i.test(t)) continue;
  for (const n of numeros(t)) if (!ley(cur).arts.includes(n)) ley(cur).arts.push(n);
}
const ex = `expres-subrayado/t${T}-extra.json`;
if (fs.existsSync(ex)) { const e = JSON.parse(fs.readFileSync(ex, 'utf8')); for (const [id, ns] of Object.entries(e)) if (ley(id)) for (const n of ns) if (!ley(id).arts.includes(n)) ley(id).arts.push(n); }
cfg.leyes.forEach(l => l.arts.sort((a, b) => a - b));
const man = `expres-subrayado/t${T}-manual.json`;   // recortes a mano (artículos que el OCR no encuentra, preámbulos, protocolos, páginas enteras)
if (fs.existsSync(man)) { const m = JSON.parse(fs.readFileSync(man, 'utf8')); cfg.manual = m.manual || []; cfg.paginas = m.paginas || []; }
fs.writeFileSync(`expres-subrayado/t${T}-config.json`, JSON.stringify(cfg));
cfg.leyes.forEach(l => console.log(l.id, l.nombre, l.paginas.join('-'), l.arts.length, 'arts'));
const apa = `expres-subrayado/t${T}-apartados.json`;   // apartados que lleva el Exprés (node expres-subrayado-apartados.js N > …); se añaden al config ya escrito
if (fs.existsSync(apa)) { cfg.apartados = JSON.parse(fs.readFileSync(apa, 'utf8')); fs.writeFileSync(`expres-subrayado/t${T}-config.json`, JSON.stringify(cfg)); }
