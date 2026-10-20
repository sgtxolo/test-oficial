// Tema 6 · fase 2 de las marcas (20/10/2026): apartados con marca suya sin pregunta oficial (cobertura-marcas.js 6).
// EXOF / ✱ / R → banco oficial (6-336…); solo EX → banco IA (6-ia-319…). Cita literal comprobada contra tema6/lo4.txt y l12.txt.
// Uso: node prompts/herramientas/tema6/preguntas-marcas-t6.js [--check]
const R = []; let k = 0;
// la correcta rota de posición (A/B/C/D)
const q = (n, a, r, e, ok, mal, t, ia, p) => { const pos = (k++ * 3 + (ia ? 1 : 0)) % 4; const o = mal.slice(); o.splice(pos, 0, ok); R.push({ n, ia: !!ia, a, r, e, o, c: pos, t, p }); };
['a', 'b', 'c'].forEach(x => require('./preguntas-marcas-t6' + x + '.js')(q));
require('../preguntas-marcas-lib.js')({ T: 6, fuentes: ['tema6/lo4.txt', 'tema6/l12.txt'], desdeOf: 336, desdeIA: 319, Q: R });
