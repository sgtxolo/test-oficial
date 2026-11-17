// Tema 25 · marcas de MI PDF (17/11/2026). Claves  ley:artículo|token  (ley 1 = LO 2/1986, arts. «w1…w54» · 2 = Ley 31/2010 · 3 = RD 1087/2010 · 4 = Europol · 5 = INTERPOL).
// Sello «EXAMEN 2020» = 'EXAMEN' (localizados con el texto nativo del PDF y el OCR: LO art. 5.1, RD art. 6, RD art. 14.2 «EXAM», INTERPOL art. 7).
// Pines R1…R30 = fichas RECUERDA (págs. 135-139): colocados en el apartado cuyo texto responde la ficha (los pines no se leyeron uno a uno en las 129 págs.; algunos por contenido).
const M = {}; const ex = (k, ...m) => { (M[k] = M[k] || {}).ex = [...((M[k] || {}).ex || []), ...m]; }; const rr = (k, ...m) => { (M[k] = M[k] || {}).r = [...((M[k] || {}).r || []), ...m]; };
rr('1:w1|1.', 'R1'); rr('1:w3|#1', 'R2'); rr('1:w6|1.', 'R3'); rr('1:w6|4.', 'R4'); rr('1:w7|1.', 'R5'); rr('1:w10|1.', 'R6'); rr('1:w13|1.', 'R7'); rr('1:w29|2.', 'R8'); rr('1:w31|1.', 'R9'); rr('1:w48|1.', 'R10');
rr('2:4|1.', 'R11'); rr('2:8|1.', 'R12'); rr('2:11|2.', 'R13');
rr('3:3|1.', 'R14'); rr('3:5|4.', 'R15'); rr('3:9|1.', 'R16'); rr('3:10|1.', 'R17'); rr('3:15|#1', 'R18');
rr('4:4|5.', 'R19'); rr('4:10|1.', 'R20'); rr('4:14|3.', 'R21'); rr('4:16|4.', 'R22'); rr('4:31|1.', 'R23'); rr('4:41|3.', 'R24'); rr('4:49|2.', 'R25');
rr('5:5|#1', 'R26'); rr('5:10|#1', 'R27'); rr('5:20|#1', 'R28'); rr('5:28|#1', 'R29'); rr('5:42|#1', 'R30');
ex('1:w5|1.', 'EXAMEN'); ex('3:6|#1', 'EXAMEN'); ex('3:14|2.', 'EXAMEN'); ex('5:7|#1', 'EXAMEN');
module.exports = M;
