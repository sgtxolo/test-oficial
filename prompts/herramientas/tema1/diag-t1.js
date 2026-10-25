// Diagnóstico T1: dónde sitúa el mapa las preguntas que el Exprés no enlaza, ahora y en HEAD. Uso: node prompts/herramientas/tema1/diag-t1.js id1 id2 ...
const fs = require('fs'), cp = require('child_process');
const get = s => JSON.parse(s.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const now = fs.readFileSync('esquemas.html', 'utf8'); const old = cp.execSync('git show HEAD:esquemas.html', { maxBuffer: 1e9 }).toString();
const fichas = s => { const a = s.indexOf('const T1 = {};'), b = s.indexOf('/* T1_RECUERDA'); return [...s.slice(a, b).matchAll(/^  \+ articuloResp\("((?:[^"\\]|\\.)*)"/gm)].map(m => m[1]); };
const Mn = get(now), Mo = get(old), Fn = fichas(now), Fo = fichas(old);
for (const id of process.argv.slice(2)) { const n = Mn[id], o = Mo[id]; const k = s => +String(s).split('-')[1];
  console.log(id, '| HEAD', o, o ? Fo[k(o)].slice(0, 45) : '', '| AHORA', n, n ? Fn[k(n)].slice(0, 45) : ''); }
