// Tema 18 · marcas a mano de MI PDF subrayado (EXOF / EX / EXAMEN / ✱ → ex; fichas R → r), leídas como imagen el 2/11/2026 (ver marcas-lectura.md).
// Clave: 'art|token' (token = «1.», «e)», «2.ª»…: todas las apariciones) · 'art|token@n' (n-ésima aparición del token en el artículo) · 'art|#n' (n-ésimo párrafo) · 'art|~texto' (párrafo que empieza así).
// ✱ se escribe '*' (como en los demás temas). Los círculos «ESQ» (esquema) y «R» a mano NO son marcas de examen y no se ponen.
const M = {};
const ex = (k, ...m) => { (M[k] = M[k] || {}).ex = [...((M[k] || {}).ex || []), ...m]; };
const r = (k, n) => { (M[k] = M[k] || {}).r = [...((M[k] || {}).r || []), 'R' + n]; };

// ---- fichas R (pines grises de mi PDF) → párrafo del apartado
r('2|2.', 1); r('7|#1', 2); r('12|#1', 3); r('14|1.', 4); r('14|2.', 5); r('14|3.', 6); r('15|#1', 7);
r('17|1.', 8); r('17|2.', 9); r('17|3.', 10); r('18|1.', 11); r('18|#2', 12); r('18|#4', 13); r('24|1.', 14);
r('28|#1', 15); r('28|#2', 16); r('35|#1', 17); r('37|1.', 18); r('50|3.', 19); r('50|4.', 20); r('53|1.', 21);
r('62|#1', 22); r('63|#1', 23); r('108|2.', 24); r('127 octies|1.', 25); r('130|~No extingue la responsabilidad', 26);
r('131|3.', 27); r('131|~Tampoco prescribirán', 28); r('135|2.', 29);

// ---- Título preliminar y Título I
ex('4|2.', '*'); ex('6|2.', '*'); ex('8|#1', 'EXOF'); ex('11|a)', 'EX'); ex('13|4.', 'EXAMEN'); ex('14|3.', 'EXAMEN');
ex('20|2.º', 'EX'); ex('21|2.ª', 'EX'); ex('21|6.ª', '*'); ex('22|1.ª', 'EX');
// ---- Título II
ex('29|#1', '*'); ex('30|1.', '*'); ex('31 quater|b)', '*'); ex('31 quinquies|1.', '*');
// ---- Título III · penas
ex('33|#1', 'EXAMEN');
for (const k of ['f)@1', 'g)@1', 'k)@1', 'd)@2', 'e)@2', 'f)@2', 'g)@2', 'h)@2', 'i)@2', 'j)@2', 'k)@2', 'l)@1', 'c)@4', 'd)@4', 'g)@4']) ex('33|' + k, '*');
ex('33|#48', '*');
ex('34|2.', 'EX'); ex('35|#1', 'EX', '*'); ex('36|2.', 'EXOF'); ex('40|1.', 'EXAMEN'); ex('50|1.', 'EXAMEN'); ex('55|#1', '*');
ex('66|3.ª', '*'); ex('66|4.ª', '*', 'EXOF'); ex('66|5.ª', '*'); ex('69|#1', 'EXOF');
ex('70|4.º', '*'); ex('70|5.º', '*'); ex('71|2.', 'EX', '*'); ex('73|#1', '*'); ex('74|1.', '*'); ex('74|3.', '*');
ex('76|c)', 'EX'); ex('78|2.', 'EX'); ex('79|#1', 'EX');
// ---- Título IV · medidas de seguridad
ex('96|2.', 'EX'); ex('105|#1', 'EXOF'); ex('105|1.', 'EXOF'); ex('105|2.', 'EXOF'); ex('106|e)', '*'); ex('106|f)', '*');
ex('108|#1', 'EXOF'); ex('108|2.', 'EX');
// ---- Título V · responsabilidad civil
ex('110|#1', 'EXOF'); ex('111|1.', '*'); ex('111|2.', '*'); ex('116|2.', 'EXAMEN'); ex('118|4.ª', '*'); ex('120|#1', 'EXAMEN');
// ---- Título VI · consecuencias accesorias
ex('127 bis|d)', '*'); ex('127 sexies|1.º', '*');
// ---- Título VII · extinción
ex('130|#1', 'EXOF'); ex('130|5.º', 'EXAMEN'); ex('131|1.', 'EXAMEN', 'EXOF'); ex('132|1.', 'EXAMEN'); ex('132|2.ª', '*');
ex('133|1.', 'EXAMEN', 'EX'); ex('135|2.', 'EXAMEN'); ex('135|1.', 'EX'); ex('136|1.', 'EXOF');
module.exports = M;
