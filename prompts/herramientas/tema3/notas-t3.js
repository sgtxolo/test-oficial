// Pone en el esquema del Tema 3 las NOTAS MANUSCRITAS del usuario (columna «nota» de marcas-t3.tsv) al final del párrafo exacto,
// como <span class="m-nota"> («nota roja» → m-nota ro). Pauta del 21/10/2026: se transcriben también sus notas importantes. Idempotente.
// Uso: node prompts/herramientas/tema3/notas-t3.js [--dry]
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const { res, parrafo } = require('./situa-marcas-t3.js');
const X = require('../expres-lib.js')(3);
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('/* T3_TUE */'), b = s.indexOf('/* T3_RECUERDA');
let seg = s.slice(a, b);
seg = seg.replace(/ ?<span class=\\"m-nota[^>]*data-n3=\\"1\\">[^<]*<\/span>/g, '');   // limpia lo anterior
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const porSitio = {};
for (const r of res) {
  const notas = [];
  for (const seg1 of (r.nota || '').split(';')) {
    const m = seg1.match(/^\s*notas?\s*(manuscrita|azul|roja)?\s*(.*)$/i); if (!m) continue;
    for (const q of m[2].matchAll(/«([^»]+)»/g)) notas.push({ t: q[1].trim(), ro: /roja/i.test(m[1] || '') });
  }
  if (!notas.length || !r.sitio) continue;
  (porSitio[r.sitio] = porSitio[r.sitio] || []).push(...notas);
}
// notas extra leídas página a página (norma · art · apartado · nota [· roja])
const EX = path.join(__dirname, "notas-extra-t3.tsv");
const extra = fs.existsSync(EX) ? fs.readFileSync(EX, "utf8").split(String.fromCharCode(10)).filter(l => l.trim() && !l.startsWith("#")) : [];
for (const l of extra) { const [n, art, ap, nota, color] = l.split(String.fromCharCode(9)); const st = parrafo({ n, art, ap: +ap }); if (!st) { console.log("sin sitio", l); continue; } (porSitio[st.k + "-" + st.j] = porSitio[st.k + "-" + st.j] || []).push({ t: nota.trim(), ro: /roja/i.test(color || "") }); }
let puestas = 0; const fallos = [];
for (const [si, notas] of Object.entries(porSitio)) {
  const [k, j] = si.split('-').map(Number); const p = X.fichas[k].ps[j];
  let raw = null;
  for (const n of [70, 200, 600, 5000]) { const r = JSON.stringify('<p' + p.at + '>' + p.h.slice(0, n)).slice(1, -1); if (seg.split(r).length === 2) { raw = r; break; } }
  if (!raw) { fallos.push(si); continue; }
  const i = seg.indexOf(raw); const fin = seg.indexOf('</p>', i); if (fin < 0) { fallos.push(si); continue; }
  const uniq = []; for (const n of notas) if (!uniq.some(u => u.t === n.t)) uniq.push(n);
  const html = uniq.map(n => `<span class=\\"m-nota${n.ro ? ' ro' : ''}\\" data-n3=\\"1\\">✎ ${esc(n.t)}</span>`).join(' ');
  seg = seg.slice(0, fin) + ' ' + html + seg.slice(fin); puestas++;
}
console.log(`notas puestas en ${puestas} párrafos · no localizados: ${fallos.length} ${fallos.join(' ')}`);
if (!process.argv.includes('--dry')) fs.writeFileSync(F, s.slice(0, a) + seg + s.slice(b));
