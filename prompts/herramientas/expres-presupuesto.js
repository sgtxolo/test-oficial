// Ajusta el Exprés de un tema al tope de páginas (pauta 16/10/2026: cortos 25, largos 30-35 como máximo).
// Prueba, de más a menos completo, estas configuraciones y se queda con la primera que cabe (si ninguna, la última).
// Uso: node prompts/herramientas/expres-presupuesto.js <N> <máx. págs>      (corre expres-tN.js varias veces; la última deja esquemas.html listo)
const { spawnSync } = require('child_process');
const [N, MAX] = [process.argv[2], +process.argv[3]];
const NIV = [   // [VEC_MAX, HUECO_MAX, UNO, ENTERO_MAX]
  [1e5, 1, 0.8, 1e5], [300, 1, 0.8, 1e5], [300, 1, 0.6, 1e5], [0, 1, 0.5, 1e5], [0, 1, 0.3, 1e5], [0, 1, 0.3, 1e5],
  [0, 1, 0.3, 1500], [0, 1, 0.3, 800], [0, 1, 0.3, 0], [0, 1, 0.1, 0]];
let ult = null;
for (const [i, [VEC_MAX, HUECO_MAX, UNO, ENTERO_MAX]] of NIV.entries()) {
  const r = spawnSync('node', [`prompts/herramientas/expres-t${N}.js`], { encoding: 'utf8', env: { ...process.env, VEC_MAX, HUECO_MAX, UNO, ENTERO_MAX } });
  const out = (r.stdout || '') + (r.stderr || ''), m = out.match(/≈ ([\d.]+) págs/); const pags = m ? +m[1] : NaN; ult = { i, pags, VEC_MAX, HUECO_MAX, UNO, ENTERO_MAX };
  console.log(`nivel ${i}: VEC_MAX=${VEC_MAX} HUECO_MAX=${HUECO_MAX} UNO=${UNO} ENTERO_MAX=${ENTERO_MAX} → ${pags} págs`);
  if (pags <= MAX) { console.log(`ELEGIDO nivel ${i}: ${pags} págs (tope ${MAX})`); console.log(out.split('\n').filter(l => /PREGUNTAS DEL TEMA/.test(l)).join('\n')); process.exit(0); }
}
console.log(`NINGÚN nivel cabe en ${MAX}: queda el último (${ult.pags} págs)`);
