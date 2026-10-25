// Pone en el esquema del Tema 14 las marcas a mano de marcas-t14.txt en su PÁRRAFO:  <p data-ex="EXOF,EX,*" data-r="R7">
// (mismo criterio que tema4/marcar-ex-t4.js y tema2/marcar-r-t2.js). Idempotente. Uso: node prompts/herramientas/tema14/marcar-t14.js [--dry]
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const DRY = process.argv.includes('--dry');
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('const T14 = {};'), b = s.indexOf('/* T14_RECUERDA + ensamblaje */');
if (a < 0 || b < 0) throw new Error('sin región T14');
const lineas = fs.readFileSync(path.join(__dirname, 'marcas-t14.txt'), 'utf8').split('\n').filter(l => /^\d+\.\d+:/.test(l));
const marcas = {};   // k → j → {ex:Set, r:Set}
for (const l of lineas) { const [kj, resto] = l.split(':'); const [k, j] = kj.split('.').map(Number); const m = marcas[k] = marcas[k] || {}; const e = m[j] = m[j] || { ex: new Set(), r: new Set() };
  for (const t of resto.trim().split(/\s+/)) { if (/^R\d+$/.test(t)) e.r.add(t); else if (/^(EXOF|EX|\*)$/.test(t)) e.ex.add(t); } }
// líneas de fichas del T14
const seg = s.slice(a, b); const L = seg.split('\n'); let k = -1, n = 0; const faltan = [];
const orden = ['EXOF', 'EX', '*'];
for (let i = 0; i < L.length; i++) {
  if (!/^  \+ articuloResp\("/.test(L[i])) continue; k++; const m = marcas[k]; if (!m) continue;
  let linea = L[i]; const ps = []; const rx = /<p( [^>]*)?>/g; let mm; while ((mm = rx.exec(linea))) ps.push({ i: mm.index, len: mm[0].length, at: mm[1] || '' });
  // de atrás adelante para no descolocar índices
  for (const j of Object.keys(m).map(Number).sort((x, y) => y - x)) {
    const p = ps[j]; if (!p) { faltan.push(k + '.' + j); continue; }
    let at = p.at; const e = m[j];
    const toma = nombre => { const r = new RegExp(' ' + nombre + '=\\\\"([^\\\\"]*)\\\\"'); const q = at.match(r); return q ? q[1].split(',').filter(Boolean) : []; };
    const ex0 = toma('data-ex'), r0 = toma('data-r');
    const ex1 = [...new Set([...ex0, ...e.ex])].sort((x, y) => orden.indexOf(x) - orden.indexOf(y)); const r1 = [...new Set([...r0, ...e.r])];
    at = at.replace(/ data-ex=\\"[^\\"]*\\"/, '').replace(/ data-r=\\"[^\\"]*\\"/, '');
    if (ex1.length) at += ` data-ex=\\"${ex1.join(',')}\\"`; if (r1.length) at += ` data-r=\\"${r1.join(',')}\\"`;
    if (at !== p.at) { n++; linea = linea.slice(0, p.i) + '<p' + at + '>' + linea.slice(p.i + p.len); }
  }
  L[i] = linea;
}
console.log('párrafos con marca nueva/cambiada:', n, '· sin párrafo:', faltan.join(' ') || '—');
if (!DRY) { s = s.slice(0, a) + L.join('\n') + s.slice(b); fs.writeFileSync(F, s); }
