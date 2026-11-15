// Tema 22 · marcas leídas a mano de MI PDF (15/11/2026; leídas como imagen las págs. 5-60). Claves  ley:artículo|token
//   ley 1 = LO 9/1983 (arts. «w1…w11» = primero…once) · 2 = LO 7/2021 · 3 = LO 4/2015.
// Sello «PREGUNTA EXAMEN (2020)» = 'EXAMEN' · asterisco/«x» roja = '*' · pines = R. No hay círculos «EX»/«EXOF» en este tema.
// R3 y R5 (videocámaras: Comisión del TSJ y «un mes») son del régimen anterior (LO 4/1997): NO coinciden con la LO 7/2021 vigente (art. 18.3: tres meses) y NO llevan pin en el temario; se dejan fuera del esquema y de las preguntas (ver r-temario-t22.js).
const M = {}; const ex = (k, ...m) => { (M[k] = M[k] || {}).ex = [...((M[k] || {}).ex || []), ...m]; }; const rr = (k, ...m) => { (M[k] = M[k] || {}).r = [...((M[k] || {}).r || []), ...m]; };
// LO 9/1983 (pp. 5-9)
rr('1:w1|2.', 'R1'); rr('1:w6|#1', 'R2'); ex('1:w11|#1', 'EXAMEN');
// LO 7/2021: R4 en su artículo (el temario no lo marca con pin, solo lo trae en RECUERDA)
rr('2:16|1.', 'R4');
// LO 4/2015
rr('3:4|1.', 'R6'); rr('3:5|1.', 'R7'); rr('3:6|~La Administración General del Estado', 'R8'); rr('3:9|1.', 'R9'); rr('3:12|1.', 'R10');
rr('3:15|2.', 'R11'); ex('3:16|1.', 'EXAMEN'); rr('3:20|4.', 'R12'); ex('3:21|~Las autoridades competentes podrán acordar', 'EXAMEN');
ex('3:25|1.', '*'); rr('3:28|2.', 'R13'); rr('3:31|3.', 'R14');
ex('3:33|2.', 'EXAMEN'); rr('3:34|~Las infracciones tipificadas', 'R15'); ex('3:36|1.', 'EXAMEN');
ex('3:36|9.', '*'); ex('3:36|12.', '*'); ex('3:36|13.', '*');
ex('3:37|1.', '*'); ex('3:37|2.', '*'); ex('3:37|5.', '*'); ex('3:37|6.', '*'); ex('3:37|7.', '*'); ex('3:37|9.', '*'); ex('3:37|11.', '*'); ex('3:37|12.', '*'); ex('3:37|17.', '*');
rr('3:38|1.', 'R16'); ex('3:38|1.', 'EXAMEN'); rr('3:39|1.', 'R17'); rr('3:40|1.', 'R18'); ex('3:42|1.', 'EXAMEN');
ex('3:48|1.', 'EXAMEN'); rr('3:48|3.', 'R19'); rr('3:53|3.', 'R20'); rr('3:54|2.', 'R21');
module.exports = M;
