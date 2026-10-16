// Sitúa cada marca de marcas-t3.tsv (norma · art · apartado · tipo) en su ficha/párrafo del esquema del Tema 3 y lista
// las preguntas (oficiales / IA) que el mapa pone en ese párrafo. Uso: node situa-marcas-t3.js [--sin] [--json]
const fs = require('fs'), path = require('path');
const X = require('../expres-lib.js')(3);
const h = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'esquemas.html'), 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const k0 = X.fichas.findIndex(f => /TFUE/.test(limpia(f.cab)));   // primera ficha del TFUE
const k1 = X.fichas.findIndex(f => /Artículo 300 TFUE/.test(limpia(f.cab)));
const kR = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
const fin = kR > 0 ? kR : X.fichas.length;
function fichasDe(norma, art) {
  const out = [];
  X.fichas.forEach((f, k) => { if (k >= fin) return; const c = limpia(f.cab).split(' — ')[0].replace(/ ·.*/, '');
    const tfue = k >= k0;
    if ((norma === 'TFUE') !== tfue) return;
    const n = +art;
    const m = c.match(/Art[íi]culos? (\d+)(?: (?:a|y) (\d+))?/);
    if (!m) return; const a = +m[1], b = m[2] ? +m[2] : a;
    if (/ y /.test(c) ? (n === a || n === b) : (n >= a && n <= b)) out.push(k); });
  return out;
}
const marcas = fs.readFileSync(path.join(__dirname, 'marcas-t3.tsv'), 'utf8').split('\n').filter(l => l && !l.startsWith('#')).map(l => {
  const [n, art, ap, tipo, pg, nota] = l.split('\t');
  return { n, art, ap: +ap, tipo: tipo.replace('EX?', 'EX'), pg: +pg, nota: nota || '' }; });
const tipoN = t => t === 'EXAMEN' ? 'EXOF' : t;
function parrafo(m) {
  for (const k of fichasDe(m.n, m.art)) {
    const f = X.fichas[k]; const multi = limpia(f.cab).split(' — ')[0].match(/Art[íi]culos/);
    const ps = f.ps.map((p, j) => ({ j, t: limpia(p.h) }));
    const re = ap => new RegExp('^' + (ap) + '\.');
    let c;
    if (m.ap > 0) c = multi ? ps.find(p => p.t.startsWith(m.art + '.' + m.ap + '.')) || ps.find(p => p.t.startsWith(m.art + '.') && m.ap === 1) : ps.find(p => p.t.startsWith(m.ap + '.'));
    if (!c) c = multi ? ps.find(p => p.t.startsWith(m.art + '.')) : ps[0];
    if (c) return { k, j: c.j };
  }
  return null;
}
const res = marcas.map(m => { const s = parrafo(m); const ids = s ? Object.entries(MAPA).filter(([, v]) => v === `3-${s.k}-${s.j}` || v.startsWith(`3-${s.k}-${s.j}-`)).map(([id]) => id) : [];
  return { ...m, t: tipoN(m.tipo), sitio: s && `${s.k}-${s.j}`, of: ids.filter(i => !/-ia-/.test(i)), ia: ids.filter(i => /-ia-/.test(i)) }; });
module.exports = { res, marcas, fichasDe };
if (require.main === module) {
  if (process.argv.includes('--json')) fs.writeFileSync(path.join(__dirname, 'marcas-situadas-t3.json'), JSON.stringify(res, null, 1));
  const sin = process.argv.includes('--sin');
  res.forEach(r => { if (sin && r.sitio && (r.t === 'EXOF' ? r.of.length : r.of.length + r.ia.length)) return;
    console.log(`${r.t.padEnd(5)} ${r.n} ${r.art}.${r.ap} p${r.pg} | sitio ${r.sitio || '—'} | of ${r.of.join(',')} | ia ${r.ia.length}`); });
  const c = t => res.filter(r => r.t === t);
  console.log('\nresumen:', ['EXOF', 'EX', '*'].map(t => `${t} ${c(t).length} (sin sitio ${c(t).filter(r => !r.sitio).length}, sin oficial ${c(t).filter(r => !r.of.length).length}, sin ninguna ${c(t).filter(r => !r.of.length && !r.ia.length).length})`).join(' · '));
}
