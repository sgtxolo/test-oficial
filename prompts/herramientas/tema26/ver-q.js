// Muestra una pregunta T26 completa y sus 4 mejores párrafos candidatos del esquema. Uso: node prompts/herramientas/tema26/ver-q.js id [id…]
const fs = require('fs'), vm = require('vm');
const win = {}; vm.runInNewContext(fs.readFileSync('esquemas-datos/t26.js', 'utf8'), { window: win });
const html = ['lo11', 'lo12', 'l29', 'ord', 'res1', 'res2', 'res3'].map(k => win.ESQ_TXT['T26.' + k]).join('');
const strip = t => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const fichas = [...html.matchAll(/<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>)/g)].map(m => ({ cab: strip((m[1].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''), ps: [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => strip(x[1])) }));
const STOP = new Set('para como esta este esos esas sera seran podra podran deberan debera entre sobre desde hasta cuando donde segun cada todo todos toda todas otro otra otros otras puede pueden tendra tendran haya haber siendo tiene tienen sido ley'.split(' '));
const toks = t => [...new Set(t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]+/g, ' ').split(/\s+/).filter(w => (w.length >= 4 || /^\d+$/.test(w)) && !STOP.has(w)))];
const app = fs.readFileSync('test-oficial-conocimiento.html', 'utf8'); const BS = String.fromCharCode(92);
const obj = id => { const i = app.indexOf('{"id":"' + id + '"'); let d = 0, s = false, e = false, j = i; for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } } return JSON.parse(app.slice(i, j + 1)); };
for (const id of process.argv.slice(2)) {
  const q = obj(id); console.log('=====', id, '\nP:', q.pregunta, '\nOPC:', q.opciones.map((o, i) => (i === q.correcta ? '*' : '') + i + ') ' + o).join('\n    ')); console.log('EXPL:', String(q.explicacion || '').replace(/<[^>]+>/g, '').slice(0, 400));
  const qs = new Set(toks(q.pregunta + ' ' + q.opciones[q.correcta])), base = qs.size; const L = [];
  fichas.forEach((f, k) => f.ps.forEach((p, j) => { const pt = toks(p); let c = 0; for (const w of pt) if (qs.has(w)) c++; L.push({ k, j, sc: c / Math.sqrt(pt.length + 3) / Math.sqrt(base), cab: f.cab, p }); }));
  L.sort((a, b) => b.sc - a.sc).slice(0, 4).forEach(x => console.log('  ->', x.k + '-' + x.j, x.sc.toFixed(2), x.cab.slice(0, 40), '|', x.p.slice(0, 200)));
}
