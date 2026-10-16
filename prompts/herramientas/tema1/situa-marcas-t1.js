// Sitúa cada marca de marcas-t1.txt (temario subrayado del usuario) en su PÁRRAFO del esquema del Tema 1 (por norma + artículo + apartado + letra)
// y las fichas R1-R33 (pins numerados) en su apartado. Uso: node prompts/herramientas/tema1/situa-marcas-t1.js [--json]
const fs = require('fs'), path = require('path');
const X = require('../expres-lib.js')(1);
const h = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'esquemas.html'), 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
// rangos de fichas de cada norma: se calculan por la primera ficha de cada una (cambian al añadir fichas)
const cabDe = k => limpia(X.fichas[k].cab);
const primera = re => X.fichas.findIndex((f, k) => re.test(cabDe(k)));
const INI = [['ER', /^Artículos 5 y 6 — Crímenes/], ['LO', /^Exposición de motivos/], ['CARTA', /^Datos y estructura de la Carta/], ['COE', /^Preámbulo del Estatuto del Consejo|^Artículo 1 — Finalidad/],
  ['CEDH', /^Artículos 2, 4 y 5 — Vida/], ['ACUERDO', /^Artículos 1, 2, 4, 5, 6 y 7 — Términos/], ['HIST', /^Antecedentes y declaraciones/]].map(([n, re]) => [n, primera(re)]);
const RANGO = Object.fromEntries(INI.slice(0, 6).map(([n, a], i) => [n, [a, INI[i + 1][1] - 1]]));
const normaDe = d => /^ER\b/.test(d) ? 'ER' : /^LO 18/.test(d) ? 'LO' : /^Carta/.test(d) ? 'CARTA' : /^Estatuto CdE/.test(d) ? 'COE' : /^(CEDH|Prot)/.test(d) ? 'CEDH' : /^Acuerdo/.test(d) ? 'ACUERDO' : null;
const ROM = /^(?:[ivx]{1,5})\)/i;
// párrafos con norma, artículo, apartado y letra
const P = [];
X.fichas.forEach((f, k) => {
  const n = Object.keys(RANGO).find(x => k >= RANGO[x][0] && k <= RANGO[x][1]) || 'HIST';
  const cab1 = limpia(f.cab).match(/^Art[ií]culo ([0-9]+(?: bis| ter)?) —/);   // ficha de UN artículo: los párrafos no repiten «Art. n.»
  let art = cab1 ? cab1[1] : '', ap = '', letra = '';
  f.ps.forEach((p, j) => {
    const t = limpia(p.h); let m;
    if ((m = t.match(/^Art\. (\d+(?: bis| ter)?)\.\s*(?:(\d+)\.)?/))) { art = m[1]; ap = m[2] || ''; letra = ''; }
    else if ((m = t.match(/^(\d+)\.\s/))) { ap = m[1]; letra = ''; }
    else if ((m = t.match(/^([a-z])\)\s/))) letra = m[1];
    const rom = (t.match(/^([ivx]{1,5})\)/i) || [])[1] || '';
    const ids = Object.entries(MAPA).filter(([, s]) => s === `1-${k}-${j}` || s.startsWith(`1-${k}-${j}-`)).map(([id]) => id);
    P.push({ k, j, n, art, ap, letra: /^[a-z]\)/.test(t) ? t[0] : '', ctx: letra, rom, t, ids });
  });
});
const tipoDe = m => /PREGUNTA EXAMEN/.test(m) ? 'EXAMEN' : /EXOF|EXO\b/.test(m) ? 'EXOF' : /\bEX\b|EX°|EX\?/.test(m) ? 'EX' : /\*/.test(m) ? '*' : 'otra';
const lee = f => fs.readFileSync(path.join(__dirname, f), 'utf8').split('\n').filter(l => l && !l.startsWith('#'));
// override manual: 'pg|desc' → 'cabecera de la ficha (inicio)#j' (varios separados por «;»); no por índice, que cambia al añadir fichas
const dePos = x => { const [c, j] = x.split('#'); const k = X.fichas.findIndex((f, i) => cabDe(i).startsWith(c)); return P.find(p => p.k === k && p.j === +j); };
const OVR = fs.existsSync(path.join(__dirname, 'ovr-t1.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'ovr-t1.json'), 'utf8')) : {};
function busca(desc) {
  const n = normaDe(desc); if (!n) return [];
  const am = desc.match(/art (\d+(?: bis| ter)?)(?:\.(\d+))?(?:\s+y\s+\d+\.?\d*)?\s*(?:([a-z])\))?/);
  if (!am) return [];
  const art = am[1], ap = am[2] || '', letra = am[3] || '', rom = (desc.match(/\)\s+([ivx]{1,5})\b/i) || [])[1] || '';
  const [a, b] = RANGO[n]; let C = P.filter(p => p.k >= a && p.k <= b && p.art === art);
  if (!C.length) return [];
  if (ap) { const c = C.filter(p => p.ap === ap); if (c.length) C = c; }
  if (letra) { const c = C.filter(p => p.letra === letra || p.ctx === letra && !p.letra); const c2 = C.filter(p => p.letra === letra); if (c2.length) C = c2; else if (c.length) C = c; }
  if (rom) { const c = C.filter(p => p.rom.toLowerCase() === rom.toLowerCase()); if (c.length) C = c; }
  return [C[0]];
}
const marcas = lee('marcas-t1.txt').map(l => { const [pg, imp, desc, marca, nota] = l.split('|').map(s => s.trim()); const tipo = tipoDe(marca);
  const o = OVR[pg + '|' + desc]; const ps = o ? o.split(';').map(dePos).filter(Boolean) : busca(desc);
  const ids = [...new Set(ps.flatMap(p => p.ids))];
  return { pg: +pg, desc, marca, tipo, sitios: ps.map(p => `${p.k}-${p.j}`), of: ids.filter(i => !/-ia-/.test(i)), ia: ids.filter(i => /-ia-/.test(i)) }; }).filter(m => m.tipo !== 'otra');
// fichas R: pins numerados «Rn (pin)» de marcas-t1.txt → párrafo
const RS = {};
lee('marcas-t1.txt').forEach(l => { const [pg, imp, desc, marca, nota] = l.split('|').map(s => s.trim()); const m = (marca + ' ' + (nota || '')).match(/\bR(\d+)\s*\(pin\)/g) || []; m.forEach(x => {
  const num = x.match(/R(\d+)/)[1]; const o = OVR['R' + num]; const ps = o ? [P.find(p => p.k + '-' + p.j === o)] : busca(desc); if (ps[0]) RS['R' + num] = `${ps[0].k}-${ps[0].j}`; else RS['R' + num] = null; }); });
const r = {}; Object.entries(RS).forEach(([R, kj]) => { if (kj) (r[kj] = r[kj] || []).push(R); });
module.exports = { marcas, P, RS, r };
if (require.main === module) {
  if (process.argv.includes('--json')) fs.writeFileSync(path.join(__dirname, 'marcas-situadas-t1.json'), JSON.stringify({ marcas, RS }, null, 1));
  marcas.forEach(m => console.log(`${m.tipo.padEnd(6)} p${m.pg} ${m.desc.slice(0, 55).padEnd(55)} | ${m.sitios.join(',') || '—SIN SITIO—'} | of ${m.of.length} ia ${m.ia.length}`));
  const c = t => marcas.filter(x => x.tipo === t); console.log('\nresumen:', ['EXAMEN', 'EXOF', 'EX', '*'].map(t => `${t} ${c(t).length} (sin sitio ${c(t).filter(x => !x.sitios.length).length}, sin oficial ${c(t).filter(x => !x.of.length).length})`).join(' · '));
  console.log('R:', Object.entries(RS).map(([R, kj]) => R + '→' + (kj || '—')).join(' '));
}
