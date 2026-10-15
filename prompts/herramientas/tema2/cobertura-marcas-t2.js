// Cruza las marcas a mano del temario subrayado del Tema 2 (marcas-t2.txt: pág | impresa | norma art X.Y (texto) | marca | nota)
// con las preguntas del test (oficiales e IA) por norma + artículo (+ apartado). Uso: node cobertura-marcas-t2.js [--todo]
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const Q = Object.fromEntries(require('../preguntas-articulo.js').preguntas(2).map(x => [x.id, { id: x.id, p: x.pregunta, o: x.opciones, c: x.correcta, e: x.explicacion || '' }]));
const NORMAS = { 'Ley 19/2003': /19\/2003/, 'Convenio 196': /Convenio[^.]{0,80}(196|Varsovia|prevención del terrorismo|Consejo de Europa)|Convenio 196|Varsovia/i, 'Ley 10/2010': /10\/2010/, 'Palermo': /Convención[^.]{0,80}(Delincuencia Organizada|Palermo)|Palermo/i, 'Trata': /trata de personas/i, 'Migrantes': /migrantes/i, 'Armas': /armas de fuego/i };
const normaDe = q => { const txt = q.p + ' ' + (q.e.match(/ref-norma">([^<]*)/) || [, ''])[1]; const hits = Object.entries(NORMAS).filter(([, r]) => r.test(txt)).map(([n]) => n);
  if (hits.includes('Trata') || hits.includes('Migrantes') || hits.includes('Armas')) return hits.find(h => ['Trata', 'Migrantes', 'Armas'].includes(h)); return hits[0]; };
const artsDe = q => { const s = q.p.slice(0, 160) + ' ' + (q.e.match(/ref-norma">([^<]*)/) || [, ''])[1]; return [...s.matchAll(/(?:art(?:ículo)?s?\.?|DA|disposición adicional)\s*(\d+(?:\s*(?:bis|ter))?)(?:\.(\d+))?/gi)].map(m => ({ a: m[1].replace(/\s+/g, ' ').toLowerCase(), ap: m[2] || '' })); };
const idx = Object.values(Q).map(q => ({ ...q, n: normaDe(q), arts: artsDe(q) }));
const marcas = fs.readFileSync(path.join(__dirname, 'marcas-t2.txt'), 'utf8').split('\n').filter(l => l && !l.startsWith('#')).map(l => { const [pg, imp, desc, marca, nota] = l.split('|').map(s => s.trim());
  const n = Object.keys(NORMAS).find(k => desc.startsWith(k)); const am = desc.match(/art (\d+(?: bis| ter)?)(?:\.(\d+))?/); const da = desc.match(/DA (\d)/);
  const tipo = /PREGUNTA EXAMEN/.test(marca) ? 'EXAMEN' : /EXOF|EXO\b/.test(marca) ? 'EXOF' : /\bEX\b|EX°|EX\?/.test(marca) ? 'EX' : /\*/.test(marca) ? '*' : 'otra';
  return { pg: +pg, desc, marca, nota, n, a: am ? am[1] : da ? 'da' + da[1] : '', ap: am ? am[2] || '' : '', tipo }; });
const res = marcas.filter(m => m.tipo !== 'otra').map(m => { const qs = idx.filter(q => q.n === m.n && q.arts.some(x => x.a === m.a && (!m.ap || !x.ap || x.ap === m.ap)));
  return { ...m, of: qs.filter(q => !/-ia-/.test(q.id)).map(q => q.id), ia: qs.filter(q => /-ia-/.test(q.id)).map(q => q.id) }; });
module.exports = { res, Q, idx };
if (require.main === module) {
  const todo = process.argv.includes('--todo');
  for (const r of res) if (todo || !r.of.length) console.log(`${r.tipo.padEnd(6)} p${r.pg} ${r.desc.slice(0, 95)} → of:[${r.of.join(',')}] ia:${r.ia.length}`);
  const sin = idx.filter(q => !q.n || !q.arts.length).map(q => q.id); console.log('preguntas sin norma/artículo detectado:', sin.length, sin.slice(0, 30).join(' '));
}
