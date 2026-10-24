// Tema 8 · fase 2 de las marcas (24/10/2026): los EX y el ✱ sin pregunta OFICIAL (pauta: EX/EXOF/✱/R → siempre oficial; una IA no los cubre).
// Se reutilizan las 13 preguntas EX redactadas el 20/10 (antes IA 8-ia-51…) como oficiales 8-295… y se añade la del ✱ del art. 100.2.
// Uso: node prompts/herramientas/tema8/preguntas-marcas2-t8.js [--check]   (después: mapa-preguntas.js, marcas-preguntas.js, cobertura-marcas.js 8)
const N = ['Ley Orgánica 6/1985, de 1 de julio, del Poder Judicial', 'LOPJ', 'Del Poder Judicial'];
const R = require('./marcas-viejas-t8.js').filter(x => x.ia).map(x => Object.assign({}, x, { ia: false }));
R.push({ n: N, ia: false, a: 'art. 100.2', r: 'Competencias de los Jueces de Paz', e: 'En el orden penal, los Juzgados de Paz conocerán en primera instancia de los procesos por delito leve que les atribuya la ley y podrán intervenir, igualmente:',
  o: ['En actuaciones penales de prevención, o por delegación, y en aquellas otras que señalen las leyes.', 'En la instrucción de delitos menos graves, por delegación del Ministerio Fiscal, y en las que señalen los reglamentos.', 'En actuaciones penales de prevención, pero nunca por delegación de otro órgano judicial.', 'En la ejecución de las sentencias penales firmes del partido judicial en que ejerzan su jurisdicción.'], c: 0,
  t: 'Podrán intervenir, igualmente, en actuaciones penales de prevención, o por delegación, y en aquellas otras que señalen las leyes.', p: 'Prevención, delegación y las que señalen las leyes.' });
require('../preguntas-marcas-lib.js')({ T: 8, fuentes: ['tema8/lopj.txt'], desdeOf: 295, desdeIA: 1000, Q: R });
