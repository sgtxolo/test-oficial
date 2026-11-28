// Revisión: quita parciales y repetidas (banco y entre vídeos) y vuelca lo nuevo para leerlo.
// Uso: node rev.js salida v01 v02 …   (usa v/<id>-q.json). Escribe salida.json y salida.txt
const fs = require('fs'), path = require('path');
const BQ = require('./banco.js')();
const D = path.join(__dirname, 'v');
const [sal, ...vids] = process.argv.slice(2);
const plano = t => String(t).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '').replace(/10/g, 'lo').replace(/0/g, 'o');
const lev = (a, b) => { if (a === b) return 0; const m = a.length, n = b.length; if (Math.abs(m - n) > Math.max(m, n) * 0.2) return Math.max(m, n); let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; };
const sim = (a, b) => 1 - lev(a, b) / Math.max(a.length, b.length, 1);
const PREF = /^(del? )?(la |el )?(ley orgánica|convenio|estatuto|carta|acuerdo|tratado|versión consolidada|protocolo)[^.¿?:]*(\.|:)\s*/i;
const sinPref = t => { let s = String(t).trim(), a; do { a = s; const r = s.replace(PREF, ''); if (r.length > 8) s = r; } while (s !== a); return s; };
const generico = t => { const r = sinPref(t); return r.length < 150 && /^([^.¿?]{0,100}[.,:]\s*){0,2}(se[ñn]ale|indique|marque) (la )?(opci[oó]ne?s? |respuesta |afirmaci[oó]n )?(que )?(no es |es )?(in)?correcta\W*$/i.test(r); };
const banco = Object.values(BQ).flat().map(q => ({ id: q.id, p: plano(sinPref(q.pregunta)), full: plano(q.pregunta), op: q.opciones.map(plano), raw: q }));
const mismasOps = (a, b) => a.filter(o => o && b.some(x => sim(o, x) > 0.93)).length >= Math.min(3, a.filter(Boolean).length) && a.filter(Boolean).length > 0;
function repetida(q, lista) {
  const p = plano(sinPref(q.en)), full = plano(q.en), ops = q.op.map(o => o ? plano(o) : '');
  const gen = generico(q.en);
  return lista.find(b => { const igual = b.p === p || b.full === full || (p.length > 25 && (sim(b.p, p) > 0.965 || sim(b.full, full) > 0.975)); if (!igual) return false;
    // con diferencia de «correcta/incorrecta» o de cifras, no son el mismo enunciado
    if (/incorrect/.test(p) !== /incorrect/.test(b.p)) return false;
    if (b.p !== p && b.full !== full && (p.match(/\d+/g) || []).join() !== (b.p.match(/\d+/g) || []).join()) return false;
    return gen ? mismasOps(ops, b.op) : true; });
}
const nuevas = [], rep = [], inc = [];
for (const v of vids) {
  const Q = JSON.parse(fs.readFileSync(path.join(D, v + '-q.json'), 'utf8'));
  const full = Q.filter(q => q.en && q.en.length > 15 && q.op.every(Boolean));
  for (const q of full) {
    const b = repetida(q, banco); if (b) { rep.push({ v, f: q.f, en: q.en, de: b.id }); continue; }
    const n = repetida(q, nuevas.map(x => ({ id: x.v + ':' + x.f, p: plano(sinPref(x.en)), full: plano(x.en), op: x.op.map(plano) })));
    if (n) { rep.push({ v, f: q.f, en: q.en, de: n.id }); continue; }
    nuevas.push(q);
  }
  for (const q of Q.filter(q => !full.includes(q))) {
    const ya = full.concat(nuevas).some(r => { const o = q.op.map((x, n) => [x, r.op[n]]).filter(a => a[0]); return o.length && o.every(([a, b]) => sim(plano(a), plano(b)) > 0.8 || plano(b).startsWith(plano(a))); });
    if (!ya) inc.push({ v, f: q.f, en: q.en || q.enp, op: q.op });
  }
}
fs.writeFileSync(sal + '.json', JSON.stringify({ nuevas, rep, inc }, null, 1));
let t = '';
nuevas.forEach((q, i) => { t += `\n#${i} ${q.v}:${q.f}\n${q.en}\n` + q.op.map((o, n) => 'ABCD'[n] + ') ' + o).join('\n') + '\n'; });
t += '\n===== INCOMPLETAS sin pareja\n' + inc.map(q => `${q.v}:${q.f} ${q.en} || ${q.op.map(o => o || '∅').join(' | ')}`).join('\n');
fs.writeFileSync(sal + '.txt', t);
console.log('nuevas', nuevas.length, 'repetidas', rep.length, 'incompletas', inc.length, 'chars', t.length);
for (const v of vids) console.log(v, 'n', nuevas.filter(x => x.v === v).length, 'rep', rep.filter(x => x.v === v).length);
