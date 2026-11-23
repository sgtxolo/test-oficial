/* Letra AZUL = respuesta de pregunta OFICIAL. Genera clave-tests/tN-of.js (CLAVE_OF[N]) con los tríos de palabras (sin acentos, >=2 significativas)
   del esquema que salen en la respuesta correcta de alguna pregunta OFICIAL (id sin «-ia-») de clave-tests/tN-todo.js.
   Los pinta clave-mejoras.js (función azul). Uso: node prompts/herramientas/clave-of-datos.js 1 2 3 ...   (sin argumentos: todos los repaso-tN-esquema-clave-nuevo.html) */
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const src = fs.readFileSync(path.join(__dirname, 'clave-mejoras-datos.js'), 'utf8').split('\n');
const norm = eval(src.find(l => /^const norm = /.test(l)).replace(/^const norm = /, '').replace(/;\s*$/, ''));
const STOP = eval(src.find(l => /^const STOP = /.test(l)).replace(/^const STOP = /, '').replace(/;\s*$/, ''));
let nums = process.argv.slice(2).map(Number).filter(Boolean);
if (!nums.length) nums = fs.readdirSync(R).map(f => (f.match(/^repaso-t(\d+)-esquema-clave-nuevo\.html$/) || [])[1]).filter(Boolean).map(Number).sort((a, b) => a - b);
const triG = ws => { const o = []; for (let i = 0; i + 2 < ws.length; i++) o.push(ws.slice(i, i + 3)); return o; };
const sig = w => w.length >= 4 && !STOP.has(w);
for (const N of nums) {
  const f = R + 'repaso-t' + N + '-esquema-clave-nuevo.html';
  const h = fs.readFileSync(f, 'utf8'), bq = h.indexOf('<button id="btnQ"');
  const main = h.slice(h.indexOf('<h2'), bq > 0 ? bq : undefined);
  const esq = new Set(triG(norm(main).split(' ')).map(x => x.join(' ')));
  global.window = {}; eval(fs.readFileSync(R + 'clave-tests/t' + N + '-todo.js', 'utf8'));
  const of = new Set(); const uniq = new Map();
  (window.CLAVE_TODO[N] || []).forEach(g => g.q.forEach(q => uniq.set(q.i, q)));
  uniq.forEach(q => { if (/-ia-/.test(q.i)) return; triG(norm(q.o[q.c] || '').split(' ')).forEach(x => { if (x.filter(sig).length < 2) return; const k = x.join(' '); if (esq.has(k)) of.add(k); }); });
  fs.writeFileSync(R + 'clave-tests/t' + N + '-of.js', '/* generado por prompts/herramientas/clave-of-datos.js; no editar a mano */\n(window.CLAVE_OF=window.CLAVE_OF||{})[' + N + ']=' + JSON.stringify([...of]) + ';\n');
  console.log('T' + N + ': ' + of.size + ' tríos oficiales en el esquema');
}
