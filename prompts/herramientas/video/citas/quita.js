// Retira las preguntas dudosas indicadas por el usuario el 28/11/2026. Uso (carpeta del proyecto): node quita.js
const fs = require('fs'), cp = require('child_process');
const IDS = ['5-389', '5-416', '5-393', '5-438', '5-489', '2-286', '2-358', '18-312', '18-345', '18-365'];
const BS = String.fromCharCode(92), NL = String.fromCharCode(10);
const F = 'test-oficial-conocimiento.html';
let s = fs.readFileSync(F, 'utf8');
const fin = i => { let d = 0, str = false, e = false; for (let j = i; j < s.length; j++) { const c = s[j]; if (str) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}') { if (!--d) return j + 1; } } throw new Error('sin fin'); };
const plano = t => String(t).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
const clave = (p, o) => plano(p) + '|' + plano(o.join(''));
const fuera = [], claves = new Set();
for (const id of IDS) {
  const i = s.indexOf('{"id":"' + id + '","pregunta"'); if (i < 0) throw new Error('no está ' + id);
  if (s.indexOf('{"id":"' + id + '","pregunta"', i + 1) >= 0) throw new Error('repetida ' + id);
  const j = fin(i); const q = JSON.parse(s.slice(i, j)); fuera.push(q); claves.add(clave(q.pregunta, q.opciones));
  if (s[j] === ',') s = s.slice(0, i) + s.slice(j + 1); else if (s[i - 1] === ',') s = s.slice(0, i - 1) + s.slice(j); else throw new Error('sin coma ' + id);
}
fs.writeFileSync(F, s);
fs.writeFileSync('prompts/herramientas/video/retiradas-28-11.json', JSON.stringify(fuera, null, 1) + NL);
const escribe = (f, t) => fs.writeFileSync(f, t);
const sinPares = t => IDS.reduce((x, id) => x.replace(new RegExp('"' + id + '":"[^"]*",', 'g'), '').replace(new RegExp(',"' + id + '":"[^"]*"(?=})', 'g'), ''), t);
for (const t of [2, 5, 18]) {
  const J = `prompts/herramientas/oficiales-seras-t${t}.json`; const raw = fs.readFileSync(J, 'utf8'); const D = JSON.parse(raw);
  const ind = (raw.match(/^\[\r?\n( +)/) || [])[1];
  const D2 = D.filter(d => !claves.has(clave(d.en, d.op)));
  console.log('T' + t, 'fichas', D.length, '→', D2.length);
  escribe(J, JSON.stringify(D2, null, ind ? ind.length : 0) + (raw.endsWith(NL) ? NL : ''));
  for (const f of [`prompts/herramientas/tema${t}/mapa-fijo-t${t}.json`, `expres-subrayado/t${t}-preg-extra.json`]) { const m = JSON.parse(fs.readFileSync(f, 'utf8')); IDS.forEach(i => delete m[i]); escribe(f, JSON.stringify(m, null, 1)); }
  const ds = `expres-subrayado/datos-t${t}.js`; escribe(ds, sinPares(fs.readFileSync(ds, 'utf8')));
  for (const [f, n] of [[`clave-tests/t${t}-esq.js`, 'CLAVE_ESQ'], [`clave-tests/t${t}-sec.js`, 'CLAVE_SEC']]) {
    const w = {}; const txt = fs.readFileSync(f, 'utf8'); new Function('window', txt)(w); const v = w[n][t];
    const q = a => Array.isArray(a) ? a.filter(x => !IDS.includes(x)).map(x => Array.isArray(x) ? q(x) : x) : a;
    const i = txt.indexOf(`[${t}]=`) + `[${t}]=`.length; escribe(f, txt.slice(0, i) + JSON.stringify(q(v)) + ';' + NL);
  }
}
const MP = 'esquemas-datos/mapa-preguntas.js';
escribe(MP, sinPares(fs.readFileSync(MP, 'utf8')));
const head = cp.execSync('git show HEAD:' + MP, { maxBuffer: 1e8 }).toString();
escribe(__dirname + '/mapa-head-nuevo.js', sinPares(head));
console.log('retiradas', fuera.length);
