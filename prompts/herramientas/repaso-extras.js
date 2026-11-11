// Añade al FINAL de un Esquema clave ya hecho (repaso-tN-borrador.html) las dos partes que NO cuentan para las 10-12 págs:
//   1) fichas R (RECUERDA del temario) y 2) preguntas rápidas por artículo (pregunta → respuesta, hasta 3 por artículo, oficiales primero).
// Uso: node prompts/herramientas/repaso-extras.js N      (idempotente: sustituye el bloque <!--EXTRAS-->…<!--/EXTRAS--> anterior)
// R: si el tema tiene la lista de «RECUERDA» en esquemas.html (recuerda([...])) se usa esa lista completa; si no, los <p data-r> del Exprés.
const fs = require('fs');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const N = +process.argv[2]; if (!N) { console.log('Uso: node prompts/herramientas/repaso-extras.js N'); process.exit(1); }
global.window = {}; eval(fs.readFileSync(R + 'expres/t' + N + '.js', 'utf8')); const H = window.EXPRES_T[N].html;
const plano = h => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const cierra = (s, from) => { let d = 0; const r = /<div[ >]|<\/div>/g; r.lastIndex = from; let x; while ((x = r.exec(s))) { d += x[0] === '</div>' ? -1 : 1; if (d === 0) return r.lastIndex; } return s.length; };
const fichas = []; { const re = /<div class="ex-ficha">/g; let m; while ((m = re.exec(H))) { const blk = H.slice(m.index, cierra(H, m.index)); const hd = blk.match(/<div class="ex-fh">([\s\S]*?)<\/div><div class="ex-fb">/); if (hd) fichas.push({ hd: hd[1], body: blk.slice(blk.indexOf('<div class="ex-fb">') + 19) }); } }
const esRec = f => /^RECUERDA del temario/.test(plano(f.hd));
const limpia = b => b.replace(/<span class="ex-plg"[^>]*><span class="ex-plg-t">([\s\S]*?)<\/span><\/span>/g, '$1').replace(/<mark class="m-resp[^"]*"[^>]*>🎯[^<]*<\/mark>/g, '')
  .replace(/<mark class="m-resp[^"]*"[^>]*>([\s\S]*?)<\/mark>/g, '$1').replace(/<\/?(?:p|div|span|mark|u|i)\b[^>]*>/g, '').replace(/\s+/g, ' ');

// ---- R ----
let lineasR = [];
if (fichas.some(esRec)) {   // T20: las R ya vienen en pregunta → respuesta
  fichas.filter(esRec).forEach(f => (f.body.match(/<p data-r="R\d+"[\s\S]*?<\/p>/g) || []).forEach(p => {
    const n = p.match(/data-r="(R\d+)"/)[1]; const t = p.replace(/<span class="ex-plg"[^>]*><span class="ex-plg-t">([\s\S]*?)<\/span><\/span>/g, '$1').replace(/<span class="ex-sello[^"]*">R\d+<\/span> <b>R\d+<\/b> · /, '');
    const [q, a] = t.replace(/<\/?p[^>]*>/g, '').split(/<b>→<\/b>/); lineasR.push([+n.slice(1), plano(q), plano(a || '')]);
  }));
} else {
  let lista = null;
  try { require('./esq-virtual.js'); const s = fs.readFileSync(R + 'esquemas.html', 'utf8'); const i = s.indexOf('/* T' + N + '_RECUERDA'); if (i > 0) { const a = s.indexOf('recuerda([', i) + 10, b = s.indexOf('])', a); lista = eval('[' + s.slice(a, b) + ']'); } } catch (e) {}
  if (lista && lista.filter(x => /^R[0-9]+/.test(plano(x))).length >= 5) lista.forEach(x => plano(x).split(/\s+(?=R[0-9]+\s)/).forEach(y => { const m = y.match(/^R([0-9]+)\s*(.*)$/); if (m) lineasR.push([+m[1], '', m[2]]); }));
  else { const seen = new Set(); fichas.forEach(f => [...f.body.matchAll(/<p data-r="R(\d+)"[^>]*>([\s\S]*?)<\/p>/g)].forEach(m => { if (seen.has(m[1])) return; seen.add(m[1]); lineasR.push([+m[1], '', limpia(m[2]).replace(/^R\d+\s*/, '')]); })); }
}
lineasR.sort((a, b) => a[0] - b[0]);
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let extra = '<!--EXTRAS-->';
if (lineasR.length) {
  extra += '<div class="rr-wrap"><h2>RECUERDA del temario · fichas R (' + (lineasR.some(l => l[1]) ? 'pregunta → respuesta' : 'tal como vienen en tu temario') + ')</h2>';
  lineasR.forEach(([n, q, a]) => { extra += q ? '<div class="rline"><span class="b r">R' + n + '</span> ' + esc(q) + ' <b class="fl">→</b> <span class="rans">[ ' + esc(a) + ' ]</span></div>' : '<div class="rline"><span class="b r">R' + n + '</span> <span class="rans">' + esc(a) + '</span></div>'; });
  extra += '</div>';
}
// ---- preguntas rápidas ----
let nQ = 0; let QQ = null; try { eval(fs.readFileSync(R + 'expres/q' + N + '.js', 'utf8')); QQ = window.EXPRES_Q[N]; } catch (e) {}
if (QQ) {
  const nrm = x => String(x || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const MALA = /\b(?:son (?:correctas|incorrectas|falsas|verdaderas)|es (?:correcta|incorrecta)|anteriores|ninguna de (?:ellas|las)|todas (?:ellas|las)|ambas)\b|^(?:[a-d]\)?|[a-d] y [a-d]|[a-d], [a-d] y [a-d])$/i;
  const escoger = (qs, n) => { const v = new Set(); return qs.filter(([, q]) => !(q[2] & 2) && nrm(q[0]) !== nrm(q[1]) && nrm(q[1]).length > 1 && !MALA.test(q[1]) && !/^se[ñn]ale\b/i.test(q[0]) && q[0].length > 12)
    .sort((a, b) => (b[1][2] & 1) - (a[1][2] & 1) || a[1][0].length - b[1][0].length).filter(([, q]) => { const k = nrm(q[1]).slice(0, 40), kq = nrm(q[0]).slice(0, 60); if (v.has(k) || v.has(kq)) return false; v.add(k); v.add(kq); return true; }).slice(0, n); };
  let arts = '';
  fichas.filter(f => !esRec(f)).forEach(f => {
    const ids = [...new Set([...f.body.matchAll(/data-q="([^"]+)"/g)].flatMap(m => m[1].split(',')).filter(Boolean))];
    const qs = escoger(ids.map(id => [id, QQ[id]]).filter(x => x[1]), 3); if (!qs.length) return;
    arts += '<div class="rq-art"><div class="rq-a">' + esc(plano(f.hd).replace(/ (EXOF|EX|✱|R\d+)\b/g, '').trim()) + '</div><ol>' + qs.map(([, q]) => { nQ++; return '<li><span class="rq-q">' + (q[2] & 1 ? '<span class="rq-of">OF</span>' : '') + esc(q[0]) + '</span> <span class="rq-r">' + esc(q[1]) + '</span></li>'; }).join('') + '</ol></div>';
  });
  extra += '<div class="rq-wrap"><div class="rq-h">✔ RECUERDA — preguntas rápidas del tema</div><div class="rq-sub">' + nQ + ' preguntas cortas con su respuesta, sacadas de las preguntas de test de cada artículo (<span class="rq-of">OF</span> = oficial).</div><div class="rq-cols">' + arts + '</div></div>';
}
extra += '<!--/EXTRAS-->';
// ---- insertar en el repaso ----
const F = R + 'repaso-t' + N + '-borrador.html'; let s = fs.readFileSync(F, 'utf8');
s = s.replace(/<!--EXTRAS-->[\s\S]*?<!--\/EXTRAS-->/, '');
if (!s.includes('.rq-wrap')) { const css = fs.readFileSync(R + 'repaso-t20-borrador.html', 'utf8').match(/@media print\{\.rq-cols[\s\S]*?(?=<\/style>)/)[0]; s = s.replace('</style>', css + '</style>'); }
const i = s.indexOf('</div>\n<p class="pie">'); if (i < 0) throw new Error('no encuentro el final del repaso');
s = s.slice(0, i) + extra + s.slice(i);
fs.writeFileSync(F, s);
console.log('tema', N, '| R', lineasR.length, '| preguntas rápidas', nQ);
