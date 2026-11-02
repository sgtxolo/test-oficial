// Aplica el bloque 25 (datos-b25.js): 1) transcribe las citas a transcrito.txt, 2) inserta las preguntas IA (5-ia-2201…), 3) añade los párrafos al esquema
// (en la ficha del artículo si existe; si no, ficha nueva en su sitio), con la respuesta en rojo. Uso: node prompts/herramientas/tema5/aplicar-b25.js [--solo-esquema]
const fs = require('fs'), path = require('path'), Module = require('module');
require('../esq-virtual.js');
const R = path.join(__dirname, '..', '..', '..'); process.chdir(R);
const D = require('./datos-b25.js');
const SUF = ['', 'bis', 'ter', 'quater', 'quinquies', 'sexies', 'septies', 'octies', 'nonies', 'decies', 'undecies', 'duodecies', 'terdecies', 'quaterdecies', 'quindecies', 'sexdecies', 'septdecies', 'octodecies', 'novodecies', 'vicies', 'unvicies'];
const clave = cab => { const m = /^Artículo\s+(\d+)(?:\s+([a-z]+))?/.exec(cab); return m ? +m[1] * 100 + Math.max(0, SUF.indexOf(m[2] || '')) : null; };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// ---- 1 y 2: transcripción + preguntas ----
if (!process.argv.includes('--solo-esquema')) {
  const f = 'prompts/temario-limpio/tema5/transcrito.txt'; const s = fs.readFileSync(f, 'utf8');
  const nuevos = D.map(d => d.texto).filter(t => !s.includes(t));
  if (nuevos.length) fs.appendFileSync(f, '\n=====RESUMEN (apartados sin pregunta, transcritos de las fotos de las págs. 7-37)=====\n' + nuevos.join('\n') + '\n');
  const Q = D.map(d => ({ k: d.k, r: d.cab.replace(/^Artículo\s+\d+(?:\s+[a-z]+)?\s+—\s+/, ''), a: 'art. ' + clave(d.cab) / 100 | 0 ? '' : '', e: d.e, o: d.o, t: d.texto, p: d.p }));
  Q.forEach((q, i) => { const m = /^Artículo\s+(\d+(?:\s+[a-z]+)?)/.exec(D[i].cab); q.a = 'art. ' + m[1] + (D[i].ap ? '.' + D[i].ap : ''); });
  const orig = Module._load; let cap; Module._load = function (r, ...a) { if (/preguntas-t5-lib/.test(r)) return { run: o => { cap = o; } }; return orig.call(this, r, ...a); };
  Module._load = orig; const lib = require(path.join(R, 'prompts', 'herramientas', 'preguntas-t5-lib.js'));
  lib.run({ bloque: 25, Q, arg: [] });
}
// ---- 3: esquema ----
let h = fs.readFileSync('esquemas.html', 'utf8');
const NORMA = { sis: 'T5_SIS', vis: 'T5_VIS', cv: 'T5_CV' };
let add = 0, nuevas = 0;
for (const d of D) {
  const mk = h.indexOf('/* ' + NORMA[d.k] + ' */'); const fin = h.indexOf('\n/* T5_', mk + 10);
  let reg = h.slice(mk, fin); const key = clave(d.cab);
  const marca = d.texto.includes(d.r) ? d.texto.replace(d.r, '\u0001') : null;
  let ph = esc(d.texto); if (marca) ph = esc(marca).replace('\u0001', `<mark class="m-resp">${esc(d.r)}</mark>`);
  const par = `<p data-res=\\"1\\">${d.ap ? `<b>${d.ap}</b> ` : ''}${ph.replace(/"/g, '\\"')}</p>`;
  const re = /\n  \+ articuloResp\("((?:[^"\\]|\\.)*)", (\[.*?\]), "((?:[^"\\]|\\.)*)"(, true|, false)?\)/g; let m, hecho = false, sig = null;
  while ((m = re.exec(reg))) { const k2 = clave(JSON.parse('"' + m[1] + '"'));
    if (k2 === key) { if (m[3].includes(par)) { hecho = true; break; } const nuevo = `\n  + articuloResp("${m[1]}", ${m[2]}, "${m[3]}${par}"${m[4] || ''})`; reg = reg.slice(0, m.index) + nuevo + reg.slice(m.index + m[0].length); hecho = true; add++; break; }
    if (sig === null && k2 !== null && k2 > key) sig = m; }
  if (!hecho) { const lin = `\n  + articuloResp(${JSON.stringify(d.cab)}, ${JSON.stringify([d.r])}, "${par}", false)`;
    if (sig) reg = reg.slice(0, sig.index) + lin + reg.slice(sig.index); else { const t = reg.replace(/;\s*$/, ''); reg = t + lin + ';'; }
    nuevas++; }
  h = h.slice(0, mk) + reg + h.slice(fin);
}
fs.writeFileSync('esquemas.html', h); console.log('párrafos añadidos a fichas existentes', add, '· fichas nuevas', nuevas);
