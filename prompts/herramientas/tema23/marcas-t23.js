// Tema 23 · marcas leídas a mano de MI PDF (16/11/2026; leídas como imagen las págs. 12-75, 60 ppp). Claves  ley:artículo|token   (ley 1 = Ley 5/2014)
// Sello «PREGUNTA EXAMEN (2020)» = 'EXAMEN' · asterisco/«x» roja = '*' · pines = R1…R14 (RECUERDA, págs. 77-79). No hay círculos «EX»/«EXOF» en este tema.
const M = {}; const ex = (k, ...m) => { (M[k] = M[k] || {}).ex = [...((M[k] || {}).ex || []), ...m]; }; const rr = (k, ...m) => { (M[k] = M[k] || {}).r = [...((M[k] || {}).r || []), ...m]; };
// pines R (cada uno en su apartado)
rr('1:3|3.', 'R1'); rr('1:7|2.', 'R2'); rr('1:9|1.', 'R3'); rr('1:14|1.', 'R4'); rr('1:16|2.', 'R5'); rr('1:18|1.', 'R6'); rr('1:20|1.', 'R7');
rr('1:27|3.', 'R8'); rr('1:29|7.', 'R9'); rr('1:39|1.', 'R10'); rr('1:42|5.', 'R11'); rr('1:54|4.', 'R12'); rr('1:70|2.', 'R13'); rr('1:72|2.', 'R14');
// sellos «EXAMEN 2020»
ex('1:6|1.', 'EXAMEN'); ex('1:18|1.', 'EXAMEN'); ex('1:29|b)@1', 'EXAMEN'); ex('1:57|#1', 'EXAMEN'); ex('1:66|1.', 'EXAMEN'); ex('1:72|1.', 'EXAMEN');
// asteriscos rojos (art. 2: definiciones 2.ª a 5.ª)
ex('1:2|2.', '*'); ex('1:2|3.', '*'); ex('1:2|4.', '*'); ex('1:2|5.', '*');
module.exports = M;
