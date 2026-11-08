// Tema 20 · marcas a mano de MI PDF, parte D (págs. 121-150), leídas como imagen el 8/11/2026. Detalle en marcas-lectura-D.md.
// Clave: 'art|token' · 'art|token@n' · 'art|#n' · 'art|~texto'. ✱ se escribe '*'.
const M = {};
const ex = (k, ...m) => { (M[k] = M[k] || {}).ex = [...((M[k] || {}).ex || []), ...m]; };
const rr = (k, ...m) => { (M[k] = M[k] || {}).r = [...((M[k] || {}).r || []), ...m]; };

// pág. 122 · 588 septies c: sello EXAMEN + pin R36
ex('588 septies c|#1', 'EXAMEN'); rr('588 septies c|#1', 'R36');
// pág. 125 · 757: pin R37 (viñeta del único párrafo)
rr('757|#1', 'R37');
// pág. 127 · 764: ✱ azul junto a la cabecera (dudosa: apartado 1.)
ex('764|1.', '*');
// pág. 128 · 766: sello EXAMEN + pin R38 + «Ex» morado en 1 y en 2
ex('766|1.', 'EXAMEN', 'EX'); rr('766|1.', 'R38'); ex('766|2.', 'EX');
// pág. 131 · 772.2: ✱ azul
ex('772|2.', '*');
// pág. 133 · 795.1: «Ex» morado (+ «E» roja con flecha en la cabecera del art. 795)
ex('795|1.', 'EX');
// pág. 134 · 796.1: «Ex» morado
ex('796|1.', 'EX');
// pág. 137 · 797 bis.1: ✱ azul; 798.2: «E» roja con flecha
ex('797 bis|1.', '*'); ex('798|2.', 'EX');
// pág. 140 · 963.1: «E» roja con flecha; 963.2: ✱ azul
ex('963|1.', 'EX'); ex('963|2.', '*');
// pág. 141 · 965.1 (regla 1.ª, plazo no superior a siete días): «Ex» morado; 967 (2.º párrafo, «Con Abogado»): «Ex» morado
ex('965|1.ª', 'EX'); ex('967|~Sin perjuicio de lo dispuesto en el párrafo anterior', 'EX');
// pág. 142 · 968: «Ex» morado bajo «siete siguientes»
ex('968|#1', 'EX');
// pág. 143 · 976.1: «Ex» morado
ex('976|1.', 'EX');
module.exports = M;
