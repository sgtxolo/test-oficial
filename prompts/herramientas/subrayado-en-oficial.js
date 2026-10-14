// Marca sobre el texto del temario OFICIAL qué palabras tiene subrayadas el usuario en su PDF escaneado.
// Uso: node subrayado-en-oficial.js <subrayado.json> <oficial-paginas.txt> <pags_oficial a-b> <pags_escaneado a-b[,c-d…]> <salida.txt> [--excluir 113,114,…]
//   oficial-paginas.txt: texto del oficial con separadores «=====PAG n=====» (PyMuPDF).
// Salida: el texto oficial página a página, con las palabras subrayadas entre ⟦ ⟧ (⟦…⟧r = trazo rojo) y, por párrafo,
//   el % de palabras subrayadas («[S 45%]»). Alineado monótono por anclas (trigramas únicos) + interpolación entre anclas,
//   así que también colorea las palabras que el OCR rompe al estar pintadas con fosforito.
const fs = require('fs');
const [,, jsonF, ofF, rOf, rSc, outF] = process.argv;
const ex = new Set(((process.argv.indexOf('--excluir') > 0 && process.argv[process.argv.indexOf('--excluir') + 1]) || '').split(',').filter(Boolean).map(Number));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const rango = r => r.split(',').flatMap(x => { const [a, b] = x.split('-').map(Number); return Array.from({ length: (b || a) - a + 1 }, (_, i) => a + i); });
const pOf = new Set(rango(rOf)), pSc = new Set(rango(rSc).filter(p => !ex.has(p)));
// oficial
const txt = fs.readFileSync(ofF, 'utf8').replace(/\r/g, '');
const partes = txt.split(/=====PAG (\d+)=====\n?/);
const O = []; // {s, n, pag, lin}
const lineas = [];
for (let i = 1; i < partes.length; i += 2) {
  const pag = +partes[i]; if (!pOf.has(pag)) continue;
  for (const l of partes[i + 1].split('\n')) {
    const li = lineas.length; lineas.push({ pag, s: l, w: [] });
    for (const w of l.split(/\s+/).filter(Boolean)) { const n = norm(w); const o = { s: w, n, pag, li }; lineas[li].w.push(o); if (n) O.push(o); }
  }
}
// escaneado
const G = [];
for (const p of JSON.parse(fs.readFileSync(jsonF, 'utf8'))) if (pSc.has(p.pagina)) for (const w of p.palabras) { const n = norm(w[0]); if (n) G.push({ n, col: w[1], ru: w[4], forma: w[5], pag: p.pagina }); }
// anclas: trigramas únicos en ambos
const tri = (A, i) => A[i].n + '|' + A[i + 1].n + '|' + A[i + 2].n;
const cnt = (A) => { const m = new Map(); for (let i = 0; i + 2 < A.length; i++) { const k = tri(A, i); m.set(k, m.has(k) ? -1 : i); } return m; };
const cO = cnt(O), cG = cnt(G);
const pares = [];
for (const [k, i] of cO) if (i >= 0 && cG.has(k) && cG.get(k) >= 0) pares.push([i, cG.get(k)]);
pares.sort((a, b) => a[0] - b[0]);
// LIS por la posición en G
const tails = [], prev = new Array(pares.length).fill(-1), tIdx = [];
pares.forEach((p, k) => { let lo = 0, hi = tails.length; while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < p[1]) lo = m + 1; else hi = m; } tails[lo] = p[1]; tIdx[lo] = k; prev[k] = lo ? tIdx[lo - 1] : -1; });
const cad = []; for (let k = tIdx[tails.length - 1]; k >= 0; k = prev[k]) cad.unshift(pares[k]);
const map = new Array(O.length).fill(-1);
for (const [i, j] of cad) for (let d = 0; d < 3; d++) map[i + d] = j + d;
// interpolación entre anclas (solo si los huecos son razonables)
let a = -1;
for (let i = 0; i <= O.length; i++) {
  if (i < O.length && map[i] < 0) continue;
  if (a >= 0 && i < O.length && i - a > 1) {
    const ga = map[a], gb = map[i], c = i - a - 1, sp = gb - ga - 1;
    if (sp >= 0 && sp <= 3 * c + 12 && c <= 3 * sp + 12) for (let k = 1; k <= c; k++) map[a + k] = sp ? ga + 1 + Math.min(sp - 1, Math.floor((k - 1) * sp / c)) : -2;
  }
  a = i;
}
for (let i = 0; i < O.length; i++) { const g = map[i] >= 0 ? G[map[i]] : null; O[i].col = g && g.col; O[i].ru = g && g.ru; O[i].forma = g && g.forma; O[i].al = !!g; O[i].sc = g && g.pag; }
// salida por páginas y párrafos (párrafo = bloque de líneas hasta línea que acaba en . ; : o línea vacía)
let out = '', tot = 0, sub = 0, alin = 0, pagAct = 0, par = [];
const flush = () => {
  if (!par.length) return;
  const ws = par.flatMap(l => l.w).filter(w => w.n);
  const ns = ws.filter(w => w.col || w.ru).length;
  const pct = ws.length ? Math.round(100 * ns / ws.length) : 0;
  let s = '';
  for (const l of par) {
    let open = false;
    for (const w of l.w) { const m = !!(w.col || w.ru); if (m && !open) { s += '⟦'; open = true; } if (!m && open) { s = s.replace(/ $/, '') + '⟧ '; open = false; } s += w.s + ' '; }
    if (open) s = s.replace(/ $/, '') + '⟧ ';
    s = s.replace(/-\s$/, '') ;
    if (!/-$/.test(l.s.trim())) s += '\n';
  }
  const scp = [...new Set(ws.filter(w => w.sc).map(w => w.sc))];
  out += `[S ${String(pct).padStart(3)}%${scp.length ? ' esc ' + scp[0] + (scp.length > 1 ? '-' + scp[scp.length - 1] : '') : ''}] ` + s.replace(/\n+$/, '') + '\n';
  par = [];
};
for (const l of lineas) {
  if (l.pag !== pagAct) { flush(); out += `\n=====PAG ${l.pag}=====\n`; pagAct = l.pag; }
  if (!l.s.trim()) { flush(); continue; }
  par.push(l); for (const w of l.w) if (w.n) { tot++; if (w.col || w.ru) sub++; if (w.al) alin++; }
  if (/[.;:]\s*$/.test(l.s)) flush();
}
flush();
fs.writeFileSync(outF, out);
console.log(`palabras oficiales ${tot} · alineadas ${(100 * alin / tot).toFixed(1)} % · subrayadas ${(100 * sub / tot).toFixed(1)} % · anclas ${cad.length}`);
