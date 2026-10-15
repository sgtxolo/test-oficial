// Sitúa cada marca de marcas-t2.txt en su ficha/párrafo del esquema del Tema 2 (por norma + artículo + apartado)
// y lista las preguntas (oficiales / IA) que el mapa pone en ese párrafo. Uso: node situa-marcas-t2.js [--sin] [--json]
const fs = require('fs'), path = require('path');
const X = require('../expres-lib.js')(2);
const h = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'esquemas.html'), 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const NORMA = t => /CAPÍTULO I\. RÉGIMEN GENERAL|CAPÍTULO II\. RÉGIMEN SANCIONADOR/.test(t) ? 'Ley 19/2003' : /2\.2/.test(t) ? 'Convenio 196' : /2\.3|^CAPÍTULO/.test(t) ? 'Ley 10/2010' : /2\.4/.test(t) ? 'Palermo' : /2\.5/.test(t) ? 'Trata' : /2\.6/.test(t) ? 'Migrantes' : /2\.7/.test(t) ? 'Armas' : 'RECUERDA';
// párrafos con su norma, artículo y apartado
const P = [];
X.fichas.forEach((f, k) => { const n = NORMA(X.fichaBloque[k] || ''); const cab = limpia(f.cab);
  const arts = [...cab.matchAll(/\d+(?: bis| ter)?/g)].map(m => m[0]); const da = /Disposición adicional/i.test(cab);
  let art = arts.length === 1 ? arts[0] : arts[0] || '';
  f.ps.forEach((p, j) => { const t = limpia(p.h); const ma = t.match(/^Art\. (\d+(?: bis| ter)?)\./); if (ma) art = ma[1];
    const ap = (t.replace(/^Art\. [^.]+\.\s*/, '').match(/^(\d+)\./) || [])[1] || '';
    const ids = Object.entries(MAPA).filter(([, s]) => s === `2-${k}-${j}` || s.startsWith(`2-${k}-${j}-`)).map(([id]) => id);
    P.push({ k, j, n, art: da ? 'da' : art, ap, cab, t, ids }); }); });
// arrastra el apartado a los párrafos que no lo indican (continuación del anterior)
for (let i = 1; i < P.length; i++) if (!P[i].ap && P[i].k === P[i - 1].k && P[i].art === P[i - 1].art) P[i].ap = P[i - 1].ap;
const marcas = fs.readFileSync(path.join(__dirname, 'marcas-t2.txt'), 'utf8').split('\n').filter(l => l && !l.startsWith('#')).map(l => { const [pg, imp, desc, marca, nota] = l.split('|').map(s => s.trim());
  const n = ['Ley 19/2003', 'Convenio 196', 'Ley 10/2010', 'Palermo', 'Trata', 'Migrantes', 'Armas'].find(x => desc.startsWith(x));
  const am = desc.match(/art (\d+(?: bis| ter)?)(?:\.(\d+))?/); const da = /\bDA\b/.test(desc);
  const tipo = /PREGUNTA EXAMEN/.test(marca) ? 'EXAMEN' : /EXOF|EXO\b/.test(marca) ? 'EXOF' : /\bEX\b|EX°|EX\?/.test(marca) ? 'EX' : /\*/.test(marca) ? '*' : 'otra';
  return { pg: +pg, desc, marca, n, art: da ? 'da' : am ? am[1] : '', ap: am ? am[2] || '' : '', tipo }; }).filter(m => m.tipo !== 'otra');
const res = marcas.map(m => { let ps = P.filter(p => p.n === m.n && p.art === m.art); const conAp = m.ap ? ps.filter(p => p.ap === m.ap) : ps; if (conAp.length) ps = conAp;
  const ids = [...new Set(ps.flatMap(p => p.ids))]; return { ...m, sitios: ps.map(p => `${p.k}-${p.j}`), of: ids.filter(i => !/-ia-/.test(i)), ia: ids.filter(i => /-ia-/.test(i)) }; });
module.exports = { res, P };
if (require.main === module) {
  if (process.argv.includes('--json')) { fs.writeFileSync(path.join(__dirname, 'marcas-situadas-t2.json'), JSON.stringify(res, null, 1)); }
  const sin = process.argv.includes('--sin');
  res.forEach(r => { if (sin && r.sitios.length && (r.tipo === '*' || r.tipo === 'EX' ? r.of.length + r.ia.length : r.of.length)) return;
    console.log(`${r.tipo.padEnd(6)} p${r.pg} ${r.desc.slice(0, 80)} | sitios ${r.sitios.slice(0, 4).join(',') || '—'} | of ${r.of.join(',')} | ia ${r.ia.length}`); });
  const c = t => res.filter(r => r.tipo === t); console.log('\nresumen:', ['EXAMEN', 'EXOF', 'EX', '*'].map(t => `${t} ${c(t).length} (sin sitio ${c(t).filter(r => !r.sitios.length).length}, sin oficial ${c(t).filter(r => !r.of.length).length}, sin ninguna ${c(t).filter(r => !r.of.length && !r.ia.length).length})`).join(' · '));
}
