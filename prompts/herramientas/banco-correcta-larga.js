// Lista las preguntas IA de un tema cuya respuesta correcta es la opción MÁS LARGA (regla de CLAUDE.md: no puede serlo).
// Uso: node prompts/herramientas/banco-correcta-larga.js <tema> [desde] [hasta]
//   Orden estable (el del banco). Muestra: índice, enunciado, opciones con longitud (* = correcta) y el literal.
// Requiere Playwright (preinstalado): NODE_PATH=$(npm root -g)
// Para corregir: escribe un JSON [[id, "opción antes", "opción después"], ...] y aplícalo con
//   node prompts/herramientas/reemplaza-opcion-pregunta.js lista.json [--aplicar]
const { chromium } = require('playwright');
const path = require('path');
const [,, T, A = '0', B = '9999'] = process.argv;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.route('**/cdnjs.cloudflare.com/**', r => r.abort());
  await p.goto('file://' + path.join(__dirname, '..', '..', 'test-oficial-conocimiento.html'), { waitUntil: 'load', timeout: 120000 });
  await p.waitForTimeout(1500);
  const out = await p.evaluate(t => { const o = []; todasPreguntasDe(t).forEach(q => { if (!/-ia-/.test(q.id)) return;
    const L = q.opciones.map(x => String(x).replace(/<[^>]+>/g, '').length);
    if (L[q.correcta] === Math.max(...L) && L.filter(x => x === L[q.correcta]).length === 1)
      o.push({ id: q.id, p: String(q.pregunta).replace(/<[^>]+>/g, ''), o: q.opciones, c: q.correcta, e: q.explicacion }); });
    return o; }, +T);
  console.log('Tema', T, '— preguntas con la correcta más larga:', out.length);
  out.slice(+A, +B).forEach((q, i) => {
    const lit = ((q.e.match(/ref-concepto\\?">([\s\S]*?)<\/span>/) || [])[1] || '').slice(0, 200);
    console.log('\n[' + (+A + i) + '] ' + q.id + '  ' + q.p);
    q.o.forEach((o, j) => console.log('   ' + (j === q.c ? '*' : ' ') + 'ABCD'[j] + '(' + o.length + ') ' + o));
    console.log('   LITERAL: ' + lit);
  });
  await b.close();
})();
