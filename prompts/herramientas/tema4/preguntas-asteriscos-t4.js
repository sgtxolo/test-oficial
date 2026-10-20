// Tema 4 · fase 2: preguntas OFICIALES (4-245…) para los apartados con ✱ que no tenían pregunta oficial (20/10/2026).
// Uso: node prompts/herramientas/tema4/preguntas-asteriscos-t4.js [--check]
const R = []; let k = 0;
// la correcta rota de posición (A/B/C/D)
const q = (n, a, r, e, ok, mal, t, ia, p) => { const pos = (k++ * 3) % 4; const o = mal.slice(); o.splice(pos, 0, ok); R.push({ n, ia: !!ia, a, r, e, o, c: pos, t, p }); };
['a', 'b', 'c'].forEach(x => require('./preguntas-asteriscos-t4' + x + '.js')(q));
require('../preguntas-marcas-lib.js')({ T: 4, fuentes: ['tema4/temario.txt'], desdeOf: 245, desdeIA: 572, Q: R });
