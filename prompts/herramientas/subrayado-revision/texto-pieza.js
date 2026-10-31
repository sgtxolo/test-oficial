// Texto del Exprés de cada pieza del subrayado (también en fichas de varios artículos: solo los párrafos «Art. N» de la pieza).
// Lo omitido con (…) (span .ex-plg) se quita. Uso: TEMA=1 node texto-pieza.js [--json] [id id…]
const T = process.env.TEMA || '11'; const fs = require('fs');
global.window = {}; require('../../../expres/t' + T + '.js'); require('../../../expres-subrayado/datos-t' + T + '.js');
const h = window.EXPRES_T[T].html, D = window.EXSUB[T], fichas = h.split(/<div class="ex-ficha(?: ex-of)?">/);
function ficha(fx) {
  const s = fichas[fx + 1]; if (s === undefined) return ''; let d = 1, m; const re = /<div\b|<\/div>/g;
  while ((m = re.exec(s))) { if (m[0] === '</div>') { d--; if (!d) return s.slice(0, m.index); } else d++; }
  return s;
}
function quitaPlg(s) {   // quita <span class="ex-plg"…>…</span> con anidamiento
  let o = '', i = 0;
  while (true) {
    const k = s.indexOf('<span class="ex-plg"', i); if (k < 0) return o + s.slice(i);
    o += s.slice(i, k) + ' (…) '; let d = 0, j = k; const re = /<span\b|<\/span>/g; re.lastIndex = k; let m;
    while ((m = re.exec(s))) { if (m[0] === '</span>') { d--; if (!d) { j = m.index + 7; break; } } else d++; }
    i = j;
  }
}
const hdr = f => ((f.match(/class="ex-fh">(.*?)<\/div>/) || [])[1] || '').replace(/<[^>]+>/g, '');
function nums(t) {
  const s = t.replace(/\s*(?:EXOF|EX|✱|R\d+)(?![\wÁ-ú])/g, '').replace(/^Art[íi]culos?\s+/i, '').split(/\s+—\s+/)[0], o = new Set();
  for (const m of s.matchAll(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi)) for (let k = +m[1]; k <= +m[2]; k++) o.add(k);
  for (const m of s.replace(/(\d+)\s*(?:bis|ter|quater)?\s+a\s+(\d+)/gi, '').matchAll(/\d+/g)) o.add(+m[0]);
  return [...o];
}
const txt = x => quitaPlg(x).replace(/<span class="ex-sello[^>]*>.*?<\/span>/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const out = {};
for (const p of D.piezas) {
  if (p.fx === undefined) continue; const n = +p.id.split('-')[1], pre = p.id.split('-')[0];
  // también las fichas vecinas del mismo bloque que nombran el artículo (p. ej. «Artículos 7 y 8» y «Artículo 8 bis y artículo 9» para la pieza 8)
  const fxs = [p.fx];
  for (let k = p.fx - 8; k <= p.fx + 8; k++) if (k !== p.fx && k >= 0 && (D.piezas.some(q => q.fx === k && q.id.split('-')[0] === pre) || !D.piezas.some(q => q.fx === k)) && nums(hdr(ficha(k))).includes(n)) fxs.push(k);   // también «61 bis», «61 ter»… (sin pieza propia: van a la del 61)
  let todo = [];
  for (const k of fxs.sort((a, b) => a - b)) {
    const f = ficha(k), hd = hdr(f);
    let ps = [...f.matchAll(/<p\b[^>]*>(.*?)<\/p>/gs)].map(x => x[1]);
    if (/^Art[íi]culos?\s+\d/i.test(hd) && nums(hd).length >= 2) {
      let art = null; const arts = new Set(), tag = ps.map(pp => { const m = pp.match(/^\s*(?:<span[^>]*>[^<]*<\/span>\s*)*<b>Art\.\s*(\d+)/); if (m) art = +m[1]; if (art !== null) arts.add(art); return art; });
      if (arts.has(n)) ps = ps.filter((_, i) => tag[i] === n || (tag[i] === null && k === p.fx && arts.size < 2));
      else if (k !== p.fx) ps = [];
      else (out._sinpropio = out._sinpropio || []).push(p.id);   // la ficha no tiene párrafos «Art. N» de esta pieza: no se sabe qué lleva
    }
    todo = todo.concat(ps);
  }
  out[p.id] = todo.map(txt).filter(Boolean);
}
const want = process.argv.slice(2).filter(a => a !== '--json');
if (process.argv.includes('--json')) process.stdout.write(JSON.stringify(out));
else for (const id of want) { console.log('== ' + id); for (const p of out[id] || []) console.log(' P: ' + p.split('(…)').map(s => s.trim()).filter(Boolean).map(s => s.length > 120 ? s.slice(0, 60) + ' … ' + s.slice(-50) : s).join('  (…)  ')); }
