// Tema 20 · fase 2 de las marcas (9/11/2026): apartados con marca suya (EXOF / EXAMEN / EX / ✱ / R) sin pregunta oficial (cobertura-marcas.js 20).
// Todas al banco OFICIAL (20-218…). Los grupos p1, p2, p3 los redactaron tres lotes en paralelo. Cita literal comprobada contra tema20/oficial.txt.
// Formato de explicación NUEVO (lila «Art. N · norma» + rojo con la cita). Uso: node prompts/herramientas/tema20/preguntas-marcas-t20.js [--check]
const N0 = 'Ley de Enjuiciamiento Criminal', N1 = 'Real Decreto de 14 de septiembre de 1882, por el que se aprueba la Ley de Enjuiciamiento Criminal';
const R = []; let k = 0;
const q = (ap, a, r, e, ok, mal, t) => { const pos = (k++ * 3 + 1) % 4; const o = mal.slice(); o.splice(pos, 0, ok); R.push({ n: [N0, N1, ap || 'General / Derecho Procesal Penal'], ia: false, a, r, e, o, c: pos, t, p: '' }); };
for (const f of ['p1', 'p2', 'p3']) { try { require('./preguntas-marcas-t20-' + f + '.js')(q); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; } }
require('../preguntas-marcas-lib.js')({ T: 20, fuentes: ['tema20/oficial.txt'], desdeOf: 218, desdeIA: 2455, fmt: 'nuevo', Q: R });
