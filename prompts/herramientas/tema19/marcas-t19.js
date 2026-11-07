// Tema 19 · marcas a mano de MI PDF (EXOF / EX / EXAMEN / ✱ → ex; fichas R → r). LECTURA PARCIAL: solo págs. 5-42 (arts. 138-249), leídas como imagen el 8/11/2026.
// Las págs. 43-190 NO están leídas todavía. Clave: 'art|token' · 'art|token@n' · 'art|#n' · 'art|~texto'. ✱ se escribe '*'.
// Ojo: los pines «R36, R37, R39…» y los números en círculo de esas págs. son de otro temario (T18): NO son fichas R de este tema.
const M = {};
const ex = (k, ...m) => { (M[k] = M[k] || {}).ex = [...((M[k] || {}).ex || []), ...m]; };
ex('143 bis|#1', '*');
ex('147|4.', 'EX');
ex('172|1.', 'EX');
ex('177 bis|1.', 'EXOF');
ex('177 bis|b)', 'EX');
ex('178|1.', 'EX');
ex('182|1.', 'EXAMEN', 'EXOF');
ex('187|1.', '*');
ex('189|6.', '*');
ex('191|#1', '*');
ex('223|#1', 'EX');
ex('225|#1', '*');
ex('227|1.', 'EX');
module.exports = M;
