// Tema 20 · marcas a mano de MI PDF (EXOF / EX / EXAMEN / ✱ → ex; fichas R → r). Se rellena al leer las páginas (marcas-lectura-t20.md).
// Clave: 'art|token' · 'art|token@n' · 'art|#n' · 'art|~texto'. ✱ se escribe '*'.
const M = {};
const ex = (k, ...m) => { (M[k] = M[k] || {}).ex = [...((M[k] || {}).ex || []), ...m]; };
const rr = (k, ...m) => { (M[k] = M[k] || {}).r = [...((M[k] || {}).r || []), ...m]; };
module.exports = M;
