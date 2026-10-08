// Aplica fotos-t7-datos.js sobre el esquema del Tema 7 de esquemas.html (sustituye solo el HTML de cada artículo)
const fs = require('fs');
const { buildArticle, norm } = require('./fotos-lib.js');
const DATA = require('./fotos-t7-datos.js');
const FILE = 'esquemas.html';
const BS = String.fromCharCode(92);
let lines = fs.readFileSync(FILE, 'utf8').split('\n');





// separa los argumentos de articuloResp( ... ) respetando cadenas
function parseCall(line) {
  const k = line.indexOf('articuloResp(');
  let i = k + 'articuloResp('.length; const args = []; let depth = 0, start = i, q = null;
  for (; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === BS) { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === '[' || c === '(') depth++;
    else if (c === ']') depth--;
    else if (c === ')') { if (depth === 0) { args.push(line.slice(start, i)); return { pre: line.slice(0, k), args, post: line.slice(i + 1) }; } depth--; }
    else if (c === ',' && depth === 0) { args.push(line.slice(start, i)); start = i + 1; }
  }
  throw new Error('llamada sin cerrar');
}
const bounds = () => ({ s: lines.findIndex(l => l.startsWith('const T7 = {};')), l: lines.findIndex(l => l.includes('/* T7_LO82 */')), e: lines.findIndex(l => l.startsWith('/* T7_RECUERDA')) });
const unq = s => JSON.parse(s.trim());
const mk = n => new RegExp('articuloResp[(]"Artículo ' + n + '[  ]—');
const find = (n, a, b) => { const re = mk(n); for (let i = a; i < b; i++) if (re.test(lines[i])) return i; return -1; };
const report = [];
for (const key of Object.keys(DATA)) {
  const [grp, num] = key.split(':'); const B = bounds(); const a = grp === 'lotc' ? B.s : B.l, b = grp === 'lotc' ? B.l : B.e;
  const idx = find(num, a, b);
  const d = DATA[key];
  if (idx < 0) { // artículo que falta: se crea tras el anterior de la lista
    const keys = Object.keys(DATA).filter(k => k.startsWith(grp + ':')); const prev = keys[keys.indexOf(key) - 1];
    const pidx = find(prev.split(':')[1], a, b);
    const { html } = buildArticle(d.dsl, []);
    lines.splice(pidx + 1, 0, '  + articuloResp("Artículo ' + num + ' — Derogado", [], ' + JSON.stringify(html) + (d.ex ? ', true' : '') + ')');
    report.push(key + ': artículo CREADO'); continue;
  }
  const call = parseCall(lines[idx]);
  const oldHtml = unq(call.args[2]);
  const oldResp = [...oldHtml.matchAll(/<mark class="m-resp">([\s\S]*?)<\/mark>/g)].map(m => m[1].replace(/<[^>]+>/g, '')).map(r => (d.respMap && d.respMap[r]) || r);
  const { html, unmatched, text } = buildArticle(d.dsl, oldResp);
  const oldPs = [...oldHtml.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  const nt = norm(text);
  const uncovered = oldPs.filter(p => { const w = p.replace(/^(Uno|Dos|Tres|Cuatro|Cinco|Seis)\.\s*/, '').split(' ').slice(0, 6).map(norm).join(''); return w.length > 6 && !nt.includes(w); });
  let fin = html;
  for (const k of (d.keep || [])) { // párrafos del esquema anterior que las fotos no traen: se conservan tal cual
    const m = [...oldHtml.matchAll(/<p>[\s\S]*?<\/p>/g)].map(x => x[0]).find(x => x.replace(/<[^>]+>/g, '').startsWith(k.starts));
    if (!m) throw new Error('keep no encontrado ' + key + ' ' + k.starts);
    fin = k.pos === 'first' ? m + fin : fin + m;
  }
  call.args[2] = ' ' + JSON.stringify(fin);
  if (d.ex && call.args.length < 4) call.args.push(' true');
  lines[idx] = call.pre + 'articuloResp(' + call.args.join(',') + ')' + call.post;
  report.push(key + ': ok' + (unmatched.length ? ' | m-resp SIN ENCAJAR: ' + JSON.stringify(unmatched) : '') + (uncovered.length ? ' | PÁRRAFOS VIEJOS NO CUBIERTOS: ' + JSON.stringify(uncovered.map(p => p.slice(0, 70))) : ''));
}
fs.writeFileSync(FILE, lines.join('\n'));
console.log(report.join('\n'));
