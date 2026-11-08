// Tema 20 · marcas a mano de MI PDF (EXOF / EX / EXAMEN / ✱ → ex; fichas R → r), leídas como imagen el 9/11/2026.
// Unión de marcas-parte-A (págs. 3-40), B (41-80), C (81-120) y D (121-150). Detalle y dudas en marcas-lectura-A..D.md.
// Clave: 'art|token' · 'art|token@n' · 'art|#n' · 'art|~texto'. ✱ se escribe '*'.
const M = {};
for (const p of ['A', 'B', 'C', 'D']) {
  const X = require('./marcas-parte-' + p + '.js');
  for (const k of Object.keys(X)) {
    const d = (M[k] = M[k] || {});
    for (const t of ['ex', 'r']) for (const v of (X[k][t] || [])) { d[t] = d[t] || []; if (!d[t].includes(v)) d[t].push(v); }
  }
}
module.exports = M;
