// Re-subraya el esquema de un tema con los colores REALES del temario escaneado.
// Uso: node aplicar-subrayado-pdf.js <subrayado.json> <esquemas.html> <marca_inicio> <marca_fin> <rangos> [--dry]
//   rangos = "T1_ROMA:4-36,T1_LO:37-50,..."  (marca /* T1_xxx */ de cada norma : páginas del PDF que ocupa)
// El json sale de: py subrayado-pdf.py <pdf> <subrayado.json>
// Alineado: por norma, todas las fichas en orden contra el OCR de sus páginas (semi-global, monótono,
// tolera huecos «(…)» y OCR roto). Las palabras que el OCR rompe (las subrayadas) se rellenan repartiendo
// los tokens del OCR entre dos anclas: aunque estén rotos conservan su color y su caja.
const fs = require('fs');
const [,, jsonF, htmlF, desde, hasta, rangosArg] = process.argv;
const dry = process.argv.includes('--dry');
const pages = JSON.parse(fs.readFileSync(jsonF, 'utf8'));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const rangos = Object.fromEntries((rangosArg || '').split(',').filter(Boolean).map(r => { const [k, v] = r.split(':'); const [a, b] = v.split('-').map(Number); return [k, [a, b]]; }));
const idsT = new Map(); const toks = [];
let cntAll = 0; const cntT = [];
function tokId(n) { if (!idsT.has(n)) { idsT.set(n, toks.length); toks.push(n); cntT.push(0); } return idsT.get(n); }
const GA = [];
for (const p of pages) {
  const nc = p.palabras.filter(w => w[1]).length;
  if (p.palabras.length > 100 && nc / p.palabras.length < 0.04) continue; // páginas sin subrayar (anexo de preguntas)
  for (const w of p.palabras) {
    const n = norm(w[0]); if (!n) continue;
    const id = tokId(n); cntT[id]++; cntAll++;
    GA.push({ n, id, col: w[1], ru: w[4], forma: w[5], pag: p.pagina });
  }
}
const idf = id => Math.max(0.05, Math.min(1, Math.log(cntAll / (1 + cntT[id])) / Math.log(cntAll)));
function lev(a, b) {
  const m = a.length, n = b.length; let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j-1] + 1, prev[j-1] + (a[i-1] === b[j-1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
const cacheS = new Map();
function tablaTok(t) {
  if (cacheS.has(t)) return cacheS.get(t);
  const arr = new Float32Array(toks.length).fill(-0.9);
  const ex = idsT.get(t);
  if (t.length >= 4) for (let k = 0; k < toks.length; k++) {
    const u = toks[k]; if (u.length < 4 || Math.abs(u.length - t.length) > 3) continue;
    if (u[0] !== t[0] && u.slice(-3) !== t.slice(-3) && u.slice(0, 2) !== t.slice(0, 2)) continue;
    const r = 1 - lev(t, u) / Math.max(t.length, u.length);
    if (r >= 0.6) arr[k] = 0.8 + 1.4 * r * (ex === k ? 1 : 0.6);
  }
  if (ex != null) arr[ex] = 1 + 2 * idf(ex);
  cacheS.set(t, arr); return arr;
}
// P: tokens ('…' = hueco corto, '|' = cambio de ficha); G: palabras OCR de la norma
function alinea(P, G) {
  const n = P.length, m = G.length;
  const tabs = P.map(t => (t === '…' || t === '|') ? null : tablaTok(t));
  const SK_P = -0.7, SK_G = -0.15;
  const jmp = new Map();
  let prev = new Float32Array(m + 1);
  const B = Array.from({ length: n + 1 }, () => new Int8Array(m + 1));
  for (let i = 1; i <= n; i++) {
    const cur = new Float32Array(m + 1); cur[0] = prev[0] + SK_P; B[i][0] = 1;
    const t = P[i - 1];
    if (t === '…' || t === '|') {
      const W = t === '…' ? 500 : 1e9; const J = new Int32Array(m + 1); const dq = [];
      for (let j = 0; j <= m; j++) { while (dq.length && prev[dq[dq.length - 1]] <= prev[j]) dq.pop(); dq.push(j); while (dq[0] < j - W) dq.shift(); cur[j] = prev[dq[0]] - 0.3; J[j] = dq[0]; B[i][j] = 3; }
      jmp.set(i, J); prev = cur; continue;
    }
    const tb = tabs[i - 1];
    for (let j = 1; j <= m; j++) {
      const d = prev[j-1] + tb[G[j - 1].id];
      const u = prev[j] + SK_P;
      const l = cur[j-1] + SK_G;
      let v = d, b = 0; if (u > v) { v = u; b = 1; } if (l > v) { v = l; b = 2; }
      cur[j] = v; B[i][j] = b;
    }
    prev = cur;
  }
  let bj = 0, bv = -1e9; for (let j = 0; j <= m; j++) if (prev[j] > bv) { bv = prev[j]; bj = j; }
  const res = new Array(n).fill(-1);
  let i = n, j = bj;
  while (i > 0 && j > 0) {
    const b = B[i][j];
    if (b === 3) { j = jmp.get(i)[j]; i--; }
    else if (b === 0) { if (tabs[i-1][G[j - 1].id] > 0) res[i-1] = j - 1; i--; j--; }
    else if (b === 1) i--; else j--;
  }
  return res;
}
const CLS = { amarillo: 'm-personalizado', naranja: 'm-destacable', rosa: 'm-destacable', verde: 'm-autoridad', cian: 'm-plazo', azul: 'm-plazo', lila: 'm-accion' };
function parsea(html) {
  html = html.replace(/<span class="m-(?:caja|circulo)">([\s\S]*?)<\/span>/g, '$1');
  const piezas = [];
  const re = /<(\/?)(mark|u)\b([^>]*)>|<[^>]+>|\s+|[^<\s]+/g; let m; const pila = [];
  while ((m = re.exec(html))) {
    const s = m[0];
    if (m[2]) { if (m[1]) pila.pop(); else pila.push(/m-resp/.test(m[3])); continue; }
    if (s[0] === '<') piezas.push({ t: 'tag', s });
    else if (/^\s+$/.test(s)) piezas.push({ t: 'ws', s });
    else piezas.push({ t: 'w', s, resp: pila.includes(true), n: /^\(…\)[.,;:]*$/.test(s) ? '…' : norm(s.replace(/&[a-z]+;/g, '')) });
  }
  return piezas;
}
function pinta(piezas, G) {
  const real = piezas.filter(p => p.t === 'w' && p.n && p.n !== '…');
  for (let k = 0; k < real.length; k++) {
    if (real[k].g >= 0) continue;
    let a = k - 1; while (a >= 0 && real[a].g < 0) a--;
    let b = k + 1; while (b < real.length && real[b].g < 0) b++;
    if (a >= 0 && b < real.length) {
      const c = b - a - 1, sp = real[b].g - real[a].g - 1;
      if (sp >= 1 && sp <= 3 * c + 10) real[k].gi = real[a].g + 1 + Math.min(sp - 1, Math.floor((k - a - 1) * sp / c));
    } else if (a >= 0 && k - a <= 6) real[k].gi = real[a].g + (k - a);
    else if (b < real.length && b - k <= 6) real[k].gi = real[b].g - (b - k);
  }
  for (const p of real) { const g = p.g >= 0 ? p.g : p.gi; if (g != null && G[g]) { const w = G[g]; p.col = w.col; p.ru = w.ru; p.forma = w.forma; } }
  const estilo = p => p.resp ? 'R' : (p.col || p.ru || p.forma) ? `${p.col || ''}|${p.ru ? 1 : 0}|${p.forma || ''}` : '';
  let out = '', i = 0;
  while (i < piezas.length) {
    const p = piezas[i];
    if (p.t !== 'w' || !estilo(p)) { out += p.s; i++; continue; }
    const e = estilo(p); let j = i, buf = '';
    while (j < piezas.length) {
      if (piezas[j].t === 'w' && estilo(piezas[j]) === e) { buf += piezas[j].s; j++; continue; }
      if (piezas[j].t === 'ws') { let k = j; while (k < piezas.length && piezas[k].t === 'ws') k++; if (k < piezas.length && piezas[k].t === 'w' && estilo(piezas[k]) === e) { buf += piezas[j].s; j++; continue; } }
      break;
    }
    if (e === 'R') out += `<mark class="m-resp">${buf}</mark>`;
    else {
      let x = buf;
      if (p.ru) x = `<u class="m-clave">${x}</u>`;
      if (p.col) x = `<mark class="${CLS[p.col]}">${x}</mark>`;
      if (p.forma) x = `<span class="m-${p.forma}">${x}</span>`;
      out += x;
    }
    i = j;
  }
  return out;
}
const src = fs.readFileSync(htmlF, 'utf8');
const a = src.indexOf(desde), b = src.indexOf(hasta, a);
if (a < 0 || b < 0) { console.error('marcas no encontradas'); process.exit(1); }
const bloque = src.slice(a, b);
const fichas = [];
const reLit = /"((?:[^"\\\n]|\\.)*)"/g; let mm;
while ((mm = reLit.exec(bloque))) {
  if (mm[1].length < 40 || !/<p>/.test(mm[1])) continue;
  const mk = bloque.lastIndexOf('/* T', mm.index); const mkn = /^\/\* (\w+) \*\//.exec(bloque.slice(mk, mk + 40));
  const ia = bloque.lastIndexOf('articuloResp("', mm.index);
  const cab = ia >= 0 ? (/^articuloResp\("((?:[^"\\\n]|\\.)*)"/.exec(bloque.slice(ia)) || ['', ''])[1] : '';
  fichas.push({ ini: mm.index, fin: mm.index + mm[0].length, lit: mm[0], norma: mkn ? mkn[1] : '?', cab, html: new Function('return "' + mm[1] + '"')() });
}
const porNorma = {};
for (const f of fichas) (porNorma[f.norma] = porNorma[f.norma] || []).push(f);
let total = 0, ok = 0, mal = 0;
for (const [nm, fl] of Object.entries(porNorma)) {
  const rg = rangos[nm];
  if (!rg) { console.error('norma sin rango, se deja igual:', nm, fl.length, 'fichas'); continue; }
  const G = GA.filter(g => g.pag >= rg[0] && g.pag <= rg[1]);
  const P = []; const marca = [];
  fl.forEach((f, fi) => {
    f.piezas = parsea(f.html);
    if (fi) { P.push('|'); marca.push(null); }
    for (const p of f.piezas) if (p.t === 'w' && p.n) { P.push(p.n); marca.push(p); }
  });
  console.error(nm, 'fichas', fl.length, 'tokens', P.length, 'OCR', G.length);
  const al = alinea(P, G);
  marca.forEach((p, k) => { if (p) p.g = al[k]; });
  for (const f of fl) {
    const sg = f.piezas.filter(p => p.t === 'w' && p.n && p.n !== '…');
    const q = sg.filter(p => p.g >= 0).length / Math.max(1, sg.length);
    total += sg.length; ok += sg.filter(p => p.g >= 0).length;
    const pgs = [...new Set(sg.filter(p => p.g >= 0).map(p => G[p.g].pag))];
    if (process.env.DBG) console.error((100 * q).toFixed(0).padStart(4), 'p' + pgs[0] + '-' + pgs[pgs.length - 1], f.cab.slice(0, 55));
    if (q < 0.3) mal++;
    f.nuevo = q < 0.3 ? null : JSON.stringify(pinta(f.piezas, G));
  }
}
console.error(`fichas: ${fichas.length}  poco fiables(<30 %): ${mal}  palabras: ${total}  alineadas: ${ok} (${(100 * ok / total).toFixed(1)} %)`);
// fichas poco fiables: se restauran del esquema original (variable ORIG = ruta del html antes de re-subrayar)
if (process.env.ORIG) {
  const o = fs.readFileSync(process.env.ORIG, 'utf8'); const oa = o.indexOf(desde), ob = o.indexOf(hasta, oa);
  const ol = []; const ob_ = o.slice(oa, ob); let m2; const re2 = /"((?:[^"\\\n]|\\.)*)"/g;
  while ((m2 = re2.exec(ob_))) if (m2[1].length >= 40 && /<p>/.test(m2[1])) ol.push(m2[0]);
  if (ol.length === fichas.length) fichas.forEach((f, i) => { if (f.nuevo == null && f.norma in rangos) f.nuevo = ol[i]; });
  else console.error('ORIG no coincide en nº de fichas', ol.length, fichas.length);
}
if (!dry) {
  let out = '', pos = 0;
  for (const f of fichas) { if (!f.nuevo) continue; out += bloque.slice(pos, f.ini) + f.nuevo; pos = f.fin; }
  out += bloque.slice(pos);
  fs.writeFileSync(htmlF, src.slice(0, a) + out + src.slice(b));
}
