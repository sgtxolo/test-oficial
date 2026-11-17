// Tema 25 · ancla a mano las preguntas «sin sitio» del mapa (clase 2/3): busca el párrafo del esquema (todas las fichas, en orden de esquemas[24].html) más parecido a enunciado + respuesta correcta.
// Escribe tema25/mapa-fijo-t25.json {id: 'k-j'} y lista el candidato para revisarlo a ojo. Uso: node prompts/herramientas/tema25/gen-mapa-fijo.js [--ver]
require('../esq-virtual.js');
const fs = require('fs'), path = require('path');
const h = fs.readFileSync('esquemas.html', 'utf8');
const lit = k => { const i = h.indexOf('/* T25_' + k + ' */'); const e = h.indexOf('\n', i); const ln = h.slice(i, e); return JSON.parse(ln.slice(ln.indexOf('= "') + 2, ln.length - 1)); };
const html = ['LOE', 'L31', 'RD', 'EUR', 'INT'].map(lit).join('');
const strip = t => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const fichas = [...html.matchAll(/<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>)/g)].map(m => ({ cab: strip((m[1].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''), ps: [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => strip(x[1])) }));
const STOP = new Set('para como esta este esos esas sera seran podra podran deberan debera entre sobre desde hasta cuando donde segun cada todo todos toda todas otro otra otros otras puede pueden tendra tendran haya haber siendo tiene tienen sido ley'.split(' '));
const toks = t => [...new Set(t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]+/g, ' ').split(/\s+/).filter(w => (w.length >= 4 || /^\d+$/.test(w)) && !STOP.has(w)))];
const app = fs.readFileSync('test-oficial-conocimiento.html', 'utf8');
const MAPA = JSON.parse(fs.readFileSync('esquemas-datos/mapa-preguntas.js', 'utf8').match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const BS = String.fromCharCode(92);
const obj = id => { const i = app.indexOf('{"id":"' + id + '"'); let d = 0, s = false, e = false, j = i; for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } } return JSON.parse(app.slice(i, j + 1)); };
const ids = [...new Set([...app.matchAll(/\{"id":"(25-(?:ia-)?\d+)","pregunta"/g)].map(m => m[1]))].filter(id => !MAPA[id]);
const prev = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'mapa-fijo-t25.json'), 'utf8')); } catch (e) { return {}; } })();
const out = {};
for (const id of ids) {
  const q = obj(id); const base = toks(q.pregunta + ' ' + q.opciones[q.correcta]); const qs = new Set(base); let best = null;
  fichas.forEach((f, k) => f.ps.forEach((p, j) => { const pt = toks(p); let c = 0; for (const w of pt) if (qs.has(w)) c++; const sc = c / Math.sqrt(pt.length + 3) / Math.sqrt(base.length); if (!best || sc > best.sc) best = { k, j, sc, cab: f.cab, p }; }));
  out[id] = best.k + '-' + best.j;
  console.log(id, best.sc.toFixed(2), '→', best.cab.replace(/ · .*/, ''), '|', best.p.slice(0, 90));
}
fs.writeFileSync(path.join(__dirname, 'mapa-fijo-t25.json'), JSON.stringify(Object.assign(prev, out), null, 1));
