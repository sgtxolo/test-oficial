// Añade a un lote los enlaces: par (párrafo del esquema), pz (pieza subrayado), sec (apartado Esquema clave).
// Uso (cwd = proyecto): node link.js lote-d1.json
const fs = require('fs'), path = require('path');
const P = process.cwd() + '/prompts/herramientas/';
require(P + 'esq-virtual.js');
const src = fs.readFileSync(P + 'mapa-preguntas.js', 'utf8');
const cuerpo = src.slice(src.indexOf('const ESQ ='), src.indexOf('// ---------- 6. Ejecutar'));
const F = new Function('fs', 'require', '__dirname', cuerpo + ';return {cargarEsquemas,unidades,norm,puntuar};')(fs, require, P);
const file = path.join(__dirname, process.argv[2]);
const L = require(file);
const MAYOR = { 1: { LOCPI: '1.1', CDF: '1.2', ECE: '1.3', CEDH: '1.4', P1: '1.4', P4: '1.4', P6: '1.4', P7: '1.4', P12: '1.4', P13: '1.4', ER: '1.5', APIC: '1.6' }, 3: { TUE: '3.1', TFUE: '3.2' } };
const lee = f => { const w = {}; new Function('window', fs.readFileSync(f, 'utf8'))(w); return w; };
const E = F.cargarEsquemas();
const cache = {};
function tema(t) {
  if (cache[t]) return cache[t];
  const us = F.unidades(E[t - 1], t);
  // norma de cada ficha (por el título mayor «N.M —»)
  const h = E[t - 1].html; const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo">/g; let m, k = -1, M = ''; const may = {};
  while ((m = re.exec(h))) { if (m[1] !== undefined) { const x = m[1].replace(/<[^>]+>/g, '').match(/^\s*(\d+\.\d+)/); if (x) M = x[1]; } else may[++k] = M; }
  us.forEach(u => u.mayor = may[+u.pid.split('-')[1]]);
  const w = lee('expres-subrayado/datos-t' + t + '.js').EXSUB[t];
  const sec = lee('clave-tests/t' + t + '-sec.js').CLAVE_SEC[t];
  return cache[t] = { us, sub: w, sec };
}
const falta = { par: [], pz: [], sec: [] };
for (const q of L) {
  const T = tema(q.t), r = q.refs[0];
  const clave = { lete: 0 };
  const num = r.art.toLowerCase();
  const fake = { pregunta: q.pregunta, opciones: q.opciones, correcta: q.correcta, explicacion: 'art. ' + r.art, apartado: q.apartado };
  let cand = T.us.filter(u => u.mayor === MAYOR[q.t][r.n] && (num === 'pre' ? /preambulo/.test(u.cab) : (u.arts.has(num) || u.T.startsWith(' art ' + num + ' '))));
  const lead = cand.filter(u => u.T.startsWith(' art ' + num + ' ')); if (lead.length === 1 && r.ap === null && q.refs.length === 1) cand = lead;
  if (/^P\d/.test(r.n)) { const n = r.n.slice(1); const c2 = cand.filter(u => new RegExp('protocolo[^0-9]*' + (n === '1' ? 'adicional' : n)).test(u.cab + ' ' + u.T) || (n === '1' && /adicional/.test(u.cab))); if (c2.length) cand = c2; }
  else if (r.n === 'CEDH') cand = cand.filter(u => !/protocolo/.test(u.cab));
  let best = null, bs = -1, bm = null;
  for (const u of cand) { const s = F.puntuar(fake, u); if (s.s > bs) { bs = s.s; best = u; bm = s; } }
  if (best) { q.par = best.pid.slice(String(q.t).length + 1) + (bm.mark >= 0 ? '-' + bm.mark : ''); q.parT = best.T.trim().slice(0, 90); q.fR = +bm.fT.toFixed(2); } else falta.par.push(q.i + ' ' + r.n + ' ' + r.art);
  // pieza del subrayado
  const ids = new Set(T.sub.piezas.map(p => p.id));
  let pz = q.letra + '-' + (num === 'pre' ? 'pre' : num.replace(/\s+/g, ''));
  if (!ids.has(pz)) {
    const alt = T.sub.piezas.filter(p => p.id.startsWith(q.letra + '-')).find(p => { const m = p.id.match(/^.-(\d+)[-_a](\d+)$/); return m && +num >= +m[1] && +num <= +m[2]; });
    if (alt) pz = alt.id; else { falta.pz.push(q.i + ' ' + pz); pz = null; }
  }
  const S1 = { ER: [[10, 1], [16, 2], [21, 3], [57, 4], [61, 5], [999, 6]], LOCPI: [[6, 9], [10, 10], [19, 11], [999, 12]], CDF: [[19, 16], [38, 17], [999, 18]], ECE: [[12, 21], [21, 22], [35, 23], [999, 24]], CEDH: [[18, 27], [27, 28], [999, 29]], APIC: [[8, 33], [12, 34], [23, 35], [31, 36], [999, 37]] };
  const S3 = { TUE: [[3, 1], [5, 2], [7, 3], [12, 4], [13, 7], [15, 8], [16, 9], [17, 10], [20, 11], [22, 14], [41, 15], [46, 16]], TFUE: [[48, 19], [62, 20], [66, 21], [77, 24], [80, 25], [86, 26], [89, 27], [234, 30], [243, 31], [250, 32], [257, 36], [269, 37], [281, 38], [307, 33]] };
  const fijo = q.t === 3 ? S3[r.n].find(x => parseInt(num) <= x[0])[1] : /^P[0-9]/.test(r.n) ? 30 : num === 'pre' ? 15 : S1[r.n].find(x => parseInt(num) <= x[0])[1];
  q.pz = pz; if (fijo !== null) q.sec = fijo;
  // apartado del Esquema clave: el de las preguntas que ya apuntan a la misma pieza o artículo
  if (pz && fijo === null) {
    const mismas = Object.entries(T.sub.preg).filter(([, p]) => p === pz).map(([id]) => id);
    const cnt = T.sec.map(a => a ? a.filter(x => mismas.includes(x)).length : 0);
    const mx = Math.max(...cnt); if (mx > 0) q.sec = cnt.indexOf(mx); else falta.sec.push(q.i + ' ' + pz);
  }
}
fs.writeFileSync(file, JSON.stringify(L, null, 1));
console.log('sin esquema', falta.par.length, falta.par.join(' | ')); console.log('sin pieza', falta.pz.length, falta.pz.join(' | ')); console.log('sin sec', falta.sec.length, falta.sec.join(' | '));
console.log('flojas', L.filter(q => q.par && q.fR < 0.6).map(q => q.i + ':' + q.par + ' ' + q.fR).join(' | '));
