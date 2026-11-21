/* Esquema clave NUEVO (repaso-tN-esquema-clave-nuevo.html) → qué preguntas del test de la app de conocimientos están en ese esquema.
   Para cada pregunta de clave-tests/tN-todo.js mira si lo que dice la RESPUESTA CORRECTA y su ENUNCIADO aparece en el texto del esquema
   (palabras significativas, sin acentos): respuesta >= 70 % y enunciado >= 40 %. Es una aproximación por palabras, no un enlace artículo a artículo.
   Texto del esquema = desde el primer <h2> hasta el botón «Ver las preguntas y respuestas» (no cuenta el bloque de preguntas rápidas ni las trampas).
   Escribe clave-tests/tN-esq.js con window.CLAVE_ESQ[N] = [ids]. Lo lee clave-extras.js cuando la página trae window.CLAVE_ALCANCE_TEMA = true.
   Uso: node prompts/herramientas/clave-esquema-nuevo.js 4        (varios: node ... 1 2 3 4) */
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const A = 0.7, S = 0.4;
const norm = t => t.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set('para como esta este esos esas sobre entre desde hasta cuando donde segun sera seran podra podran todos todas cada otro otra otros otras estado estados miembro miembros reglamento articulo parte partes'.split(' '));
const words = t => [...new Set(norm(t).split(' ').filter(w => w.length >= 4 && !STOP.has(w)))];
for (const N of process.argv.slice(2).map(Number).filter(Boolean)) {
  const f = R + 'repaso-t' + N + '-esquema-clave-nuevo.html';
  if (!fs.existsSync(f)) { console.log('T' + N + ': no existe ' + f); continue; }
  const h = fs.readFileSync(f, 'utf8');
  const a = h.indexOf('<h2>'), b = h.indexOf('<button id="btnQ"');
  const set = new Set(words(h.slice(a, b > a ? b : undefined)));
  global.window = {}; eval(fs.readFileSync(R + 'clave-tests/t' + N + '-todo.js', 'utf8'));
  const uniq = new Map(); (window.CLAVE_TODO[N] || []).forEach(g => g.q.forEach(q => uniq.set(q.i, q)));
  const ids = [];
  uniq.forEach(q => {
    const wa = words(q.o[q.c] || ''), wq = words(q.p); if (!wa.length) return;
    const sa = wa.filter(x => set.has(x)).length / wa.length, sq = wq.length ? wq.filter(x => set.has(x)).length / wq.length : 0;
    if (sa >= A && sq >= S) ids.push(q.i);
  });
  fs.writeFileSync(R + 'clave-tests/t' + N + '-esq.js', '/* generado por prompts/herramientas/clave-esquema-nuevo.js; no editar a mano */\n(window.CLAVE_ESQ=window.CLAVE_ESQ||{})[' + N + ']=' + JSON.stringify(ids) + ';\n');
  const of = ids.filter(i => !/-ia-/.test(i)).length;
  console.log('T' + N + ': ' + ids.length + ' preguntas del test están en el esquema clave (' + of + ' oficiales, ' + (ids.length - of) + ' de IA) de ' + uniq.size + ' del tema');
}
