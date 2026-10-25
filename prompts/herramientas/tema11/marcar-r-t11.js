// Enlaza las fichas RECUERDA R1-R55 del T11 (recuerda-t11.js) con su PÁRRAFO del esquema: <p data-r="R7">. Busca el párrafo cuyo texto contiene la respuesta (o el que más palabras comparte con pregunta+respuesta).
// Uso: node prompts/herramientas/tema11/marcar-r-t11.js [--dry]   (idempotente)
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html'); const DRY = process.argv.includes('--dry');
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('const T11 = {};'), b = s.indexOf('/* T11_RECUERDA'); const seg = s.slice(a, b);
const src = fs.readFileSync(path.join(__dirname, '..', 'recuerda-t11.js'), 'utf8');
const R = []; for (const m of src.matchAll(/\['(R\d+)', '((?:[^'\\]|\\.)*)', '((?:[^'\\]|\\.)*)'\]/g)) R.push({ r: m[1], q: m[2], a: m[3] });
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
const stop = new Set('de la el en los las del y a que se por con un una al lo su sus o para es no'.split(' '));
const P = []; const rx = /<p( [^>]*)?>(.*?)<\/p>/g; let m; while ((m = rx.exec(seg))) P.push({ i: a + m.index, at: m[1] || '', t: nz(m[2]) });
const res = [];
for (const q of R) {
  const an = nz(q.a), pal = new Set((nz(q.q) + ' ' + an).split(' ').filter(w => w.length > 3 && !stop.has(w)));
  let best = null, bs = -1;
  for (const p of P) { if (p.t.length < 15 || /^r\d+ /.test(p.t) || /^parrafo anulado/.test(p.t)) continue; let sc = 0; if (an.length > 12 && p.t.includes(an.slice(0, Math.min(60, an.length)))) sc += 100;
    const w = new Set(p.t.split(' ')); let c = 0; for (const x of pal) if (w.has(x)) c++; sc += 40 * c / pal.size; if (sc > bs) { bs = sc; best = p; } }
  res.push({ r: q.r, p: best, sc: bs });
}
res.sort((x, y) => y.p.i - x.p.i);
let n = 0;
for (const e of res) {
  console.log(e.r, e.sc.toFixed(0), e.p.t.slice(0, 90));
  if (e.sc < 25) continue;
  const toma = e.p.at.match(/ data-r=\\"([^\\"]*)\\"/); const r0 = toma ? toma[1].split(',') : []; if (r0.includes(e.r)) continue;
  const at = e.p.at.replace(/ data-r=\\"[^\\"]*\\"/, '') + ' data-r=\\"' + [...r0, e.r].join(',') + '\\"';
  s = s.slice(0, e.p.i) + '<p' + at + '>' + s.slice(e.p.i + 2 + e.p.at.length + 1); n++;
}
console.log('R enlazadas:', n, 'de', R.length);
if (!DRY) fs.writeFileSync(F, s);
