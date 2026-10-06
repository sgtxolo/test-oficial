// Re-subraya el esquema de un tema con los colores REALES del temario escaneado.
// Uso: node aplicar-subrayado-pdf.js <subrayado.json> <esquemas.html> <marca_inicio> <marca_fin> [--dry]
//  (procesa lo que hay entre las dos marcas, p. ej. "const T1 = {};" y "/* T1_RECUERDA")
// El json sale de: py subrayado-pdf.py <pdf> <subrayado.json>
const fs = require('fs');
const [,, jsonF, htmlF, desde, hasta] = process.argv;
const dry = process.argv.includes('--dry');
const pages = JSON.parse(fs.readFileSync(jsonF, 'utf8'));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const G = [];
for (const p of pages) for (const w of p.palabras) {
  const n = norm(w[0]); if (!n) continue;
  G.push({ n, t: w[0], col: w[1], ru: w[4], forma: w[5], pag: p.pagina });
}
const tri = new Map();
const key = (a, b, c) => a + '|' + b + '|' + c;
for (let i = 0; i + 2 < G.length; i++) { const k = key(G[i].n, G[i+1].n, G[i+2].n); (tri.get(k) || tri.set(k, []).get(k)).push(i); }
const bi = new Map();
for (let i = 0; i + 1 < G.length; i++) { const k = G[i].n + '|' + G[i+1].n; (bi.get(k) || bi.set(k, []).get(k)).push(i); }
function sim(a, b) {
  if (a === b) return 1;
  if (a.length < 4 || b.length < 4) return 0;
  const m = a.length, n = b.length; if (Math.abs(m - n) > 3) return 0;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j-1] + 1, prev[j-1] + (a[i-1] === b[j-1] ? 0 : 1)); prev = cur; }
  const r = 1 - prev[n] / Math.max(m, n); return r >= 0.6 ? r : 0;
}
// alinea una lista de tokens normalizados con el flujo G; devuelve, por token, índice en G o -1
function alinea(P, minPos) {
  const res = new Array(P.length).fill(-1);
  const votes = new Map();
  const add = (o) => votes.set(o, (votes.get(o) || 0) + 1);
  for (let i = 0; i + 2 < P.length; i++) for (const pos of (tri.get(key(P[i], P[i+1], P[i+2])) || [])) if (pos >= minPos) add(pos - i);
  if (!votes.size) for (let i = 0; i + 1 < P.length; i++) for (const pos of (bi.get(P[i] + '|' + P[i+1]) || [])) if (pos >= minPos) add(pos - i);
  if (!votes.size) return res;
  let best = null, bs = 0;
  for (const [o] of votes) { let s = 0; for (let d = -4; d <= 4; d++) s += votes.get(o + d) || 0; if (s > bs || (s === bs && o < best)) { bs = s; best = o; } }
  const lo = Math.max(minPos, best - 12), hi = Math.min(G.length, best + Math.ceil(P.length * 1.8) + 40);
  const n = P.length, m = hi - lo;
  const S = Array.from({ length: n + 1 }, () => new Float32Array(m + 1));
  const B = Array.from({ length: n + 1 }, () => new Int8Array(m + 1));
  const SK_G = -0.25, SK_P = -0.7;
  for (let i = 1; i <= n; i++) { S[i][0] = i * SK_P; B[i][0] = 1; }
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
    const sc = sim(P[i-1], G[lo + j - 1].n);
    const diag = S[i-1][j-1] + (sc ? 1 + 2 * sc : -1);
    const up = S[i-1][j] + SK_P;
    const left = S[i][j-1] + SK_G;
    let v = diag, b = 0; if (up > v) { v = up; b = 1; } if (left > v) { v = left; b = 2; }
    S[i][j] = v; B[i][j] = b;
  }
  let bj = 0, bv = -1e9; for (let j = 0; j <= m; j++) if (S[n][j] > bv) { bv = S[n][j]; bj = j; }
  let i = n, j = bj;
  while (i > 0 && j > 0) {
    const b = B[i][j];
    if (b === 0) { if (sim(P[i-1], G[lo + j - 1].n)) res[i-1] = lo + j - 1; i--; j--; }
    else if (b === 1) i--; else j--;
  }
  return res;
}
const CLS = { amarillo: 'm-personalizado', naranja: 'm-destacable', rosa: 'm-destacable', verde: 'm-autoridad', cian: 'm-plazo', azul: 'm-plazo', lila: 'm-accion' };
function procesa(html, ctx) {
  const piezas = [];
  const re = /<(\/?)(mark|u)\b([^>]*)>|<[^>]+>|\s+|[^<\s]+/g; let m; const pila = [];
  while ((m = re.exec(html))) {
    const s = m[0];
    if (m[2]) { if (m[1]) pila.pop(); else pila.push(/m-resp/.test(m[3])); continue; }
    if (s[0] === '<') piezas.push({ t: 'tag', s });
    else if (/^\s+$/.test(s)) piezas.push({ t: 'ws', s });
    else piezas.push({ t: 'w', s, resp: pila.includes(true), n: norm(s.replace(/&[a-z]+;/g, '')) });
  }
  let seg = []; const segs = [];
  for (const p of piezas) {
    if (p.t === 'w' && /^\(…\)$|^\(\.\.\.\)$/.test(p.s)) { if (seg.length) segs.push(seg); seg = []; continue; }
    if (p.t === 'w' && p.n) seg.push(p);
  }
  if (seg.length) segs.push(seg);
  for (const sg of segs) {
    const al = alinea(sg.map(p => p.n), ctx.pos);
    sg.forEach((p, k) => { p.g = al[k]; });
    const okk = sg.filter(p => p.g >= 0);
    if (okk.length) ctx.pos = Math.max(ctx.pos, okk[okk.length - 1].g - 5);
    ctx.total += sg.length; ctx.ok += okk.length;
    for (let k = 0; k < sg.length; k++) {
      if (sg[k].g >= 0) continue;
      let a = k - 1; while (a >= 0 && sg[a].g < 0) a--;
      let b = k + 1; while (b < sg.length && sg[b].g < 0) b++;
      if (a >= 0 && b < sg.length && sg[b].g - sg[a].g <= (b - a) + 3 && sg[b].g > sg[a].g) {
        sg[k].gi = sg[a].g + Math.round((sg[b].g - sg[a].g) * (k - a) / (b - a));
      }
    }
    for (const p of sg) { const g = p.g >= 0 ? p.g : p.gi; if (g != null) { const w = G[g]; p.col = w.col; p.ru = w.ru; p.forma = w.forma; } }
  }
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
const ctx = { pos: 0, total: 0, ok: 0 };
let n = 0;
const nuevo = src.slice(a, b).replace(/"((?:[^"\\\n]|\\.)*)"/g, (lit, cuerpo) => {
  if (cuerpo.length < 40 || !/<p>/.test(cuerpo)) return lit;
  const html = new Function('return "' + cuerpo + '"')();
  n++;
  ctx.pos = 0; const t0 = ctx.total, o0 = ctx.ok; const r = procesa(html, ctx); if (process.env.DBG) console.error(((ctx.ok - o0) / Math.max(1, ctx.total - t0) * 100).toFixed(0).padStart(3), html.replace(/<[^>]+>/g, "").slice(0, 70)); return JSON.stringify(r);
});
console.error(`cadenas: ${n}  palabras: ${ctx.total}  alineadas: ${ctx.ok} (${(100 * ctx.ok / ctx.total).toFixed(1)} %)`);
if (!dry) fs.writeFileSync(htmlF, src.slice(0, a) + nuevo + src.slice(b));
