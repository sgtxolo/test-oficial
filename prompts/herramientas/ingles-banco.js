// Herramienta del banco de test-oficial-ingles.html (sin navegador). Las preguntas viven en 3 literales JSON:
//   B = const QUESTIONS=[...]            referencia  B:<índice>          (ids posicionales Q<índice>: NO borrar ni reordenar)
//   G = const GENERAL_TESTS={"nombre":[...]}  referencia  G:<nombre>|<i>
//   E = const EXTRA_TESTS={"nombre":[...]}    referencia  E:<nombre>|<i>
// Campos: t (tema), q (enunciado con ___), opts, a (índice correcto), fb (explicación), tr (traducción), dif (facil|media|dificil), ia
//
//   node prompts/herramientas/ingles-banco.js listar <criterio> [desde] [hasta]
//        criterio: sinTr | sinDif | pocasOpc | fbCorta   → imprime ref, campos útiles
//   node prompts/herramientas/ingles-banco.js aplicar <edits.json> [--aplicar]
//        edits.json = [["B:123", {"tr":"…","dif":"media","opts":[…],"fb":"…"}], ...]   (solo los campos a cambiar)
//        Sin --aplicar solo valida. Reglas: al ampliar opts hay que AÑADIR al final (a no cambia); nunca cambiar a/q.
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '..', '..', 'test-oficial-ingles.html');
let s = fs.readFileSync(FILE, 'utf8');
const MARCA = { QUESTIONS: 'const QUESTIONS=', GENERAL_TESTS: 'const GENERAL_TESTS=', EXTRA_TESTS: ',EXTRA_TESTS=' };
function span(name) {
  const i = s.indexOf(MARCA[name]); if (i < 0) throw new Error('no encuentro ' + name);
  const a = i + MARCA[name].length; let d = 0, inS = false, esc = false, j = a;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inS = false; continue; }
    if (c === '"') inS = true; else if (c === '[' || c === '{') d++; else if (c === ']' || c === '}') { d--; if (d === 0) break; } }
  return [a, j + 1];
}
const NAMES = { B: 'QUESTIONS', G: 'GENERAL_TESTS', E: 'EXTRA_TESTS' };
const data = {}; for (const k of 'BGE') { const [a, b] = span(NAMES[k]); const raw = s.slice(a, b); data[k] = JSON.parse(raw); data[k + 'raw'] = raw; }
function* todas() {
  for (let i = 0; i < data.B.length; i++) yield ['B:' + i, data.B[i]];
  for (const k of 'GE') for (const n of Object.keys(data[k])) yield* data[k][n].map((q, i) => [k + ':' + n + '|' + i, q]);
}
function get(ref) { const [k, r] = [ref[0], ref.slice(2)]; if (k === 'B') return data.B[+r]; const p = r.lastIndexOf('|'); return (data[k][r.slice(0, p)] || [])[+r.slice(p + 1)]; }
const [,, CMD, X, Y, Z] = process.argv;
if (CMD === 'listar') {
  const f = { sinTr: q => !q.tr, sinDif: q => !q.dif, pocasOpc: q => q.opts.length < 4, fbCorta: q => !q.fb || String(q.fb).trim().length < 12 }[X];
  if (!f) { console.log('criterio: sinTr | sinDif | pocasOpc | fbCorta'); process.exit(1); }
  const lista = [...todas()].filter(([r, q]) => f(q)); const A = +(Y || 0), B = +(Z || 1e9);
  console.log(X + ': ' + lista.length + ' en total'); lista.slice(A, B).forEach(([r, q], i) => console.log('[' + (A + i) + '] ' + r + ' t' + q.t + ' | ' + q.q + ' | ' + q.opts.map((o, j) => (j === q.a ? '*' : '') + o).join(' / ') + ' | fb=' + JSON.stringify(q.fb) + (q.tr ? ' | tr=' + q.tr : '')));
} else if (CMD === 'aplicar') {
  let ok = 0, mal = 0; const tocados = new Set();
  for (const [ref, c] of JSON.parse(fs.readFileSync(X, 'utf8'))) {
    const q = get(ref); if (!q) { mal++; console.log('NO EXISTE', ref); continue; }
    if ('a' in c || 'q' in c) { mal++; console.log('NO SE PUEDE CAMBIAR a/q', ref); continue; }
    if (c.opts) { const o = q.opts; if (c.opts.length < o.length || o.some((x, i) => x !== c.opts[i])) { mal++; console.log('opts: solo se puede AÑADIR al final', ref); continue; }
      if (new Set(c.opts.map(x => String(x).trim().toLowerCase())).size < c.opts.length) { mal++; console.log('opts repetidas', ref); continue; } }
    if (c.dif && !['facil', 'media', 'dificil'].includes(c.dif)) { mal++; console.log('dif inválida', ref); continue; }
    Object.assign(q, c); tocados.add(ref[0]); ok++;
  }
  if (process.argv.includes('--aplicar')) { // sustituir de atrás hacia delante para no mover posiciones
    const sp = {}; for (const k of 'BGE') sp[k] = span(NAMES[k]);
    for (const k of ['E', 'G', 'B'].filter(k => tocados.has(k))) { const [a, b] = sp[k]; s = s.slice(0, a) + JSON.stringify(data[k]) + s.slice(b); }
    fs.writeFileSync(FILE, s);
  }
  console.log((process.argv.includes('--aplicar') ? 'aplicadas ' : 'se aplicarían ') + ok + '; con problema: ' + mal);
} else console.log('uso: listar <criterio> [desde] [hasta] | aplicar <edits.json> [--aplicar]');
