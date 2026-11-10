// Tema 21 · marcas leídas a mano de MI PDF (págs. entre paréntesis). Claves  ley:artículo|token  (ley 1 Habeas, 2 LO 2/1989, 3 LO 19/1994, 4 LO 3/2003, 5 LO 10/2007, 6 Ext 4/1985, 7 L 11/2003, 8 L 25/2007, 9 L 23/2014, 10 L 4/2015)
// Círculo manuscrito = EXOF; ✱ = '*'; sello = EXAMEN; pines = R. Las «R» azules sueltas y notas rojas no cuentan.
const M = {}; const ex = (k, ...m) => { (M[k] = M[k] || {}).ex = [...((M[k] || {}).ex || []), ...m]; }; const rr = (k, ...m) => { (M[k] = M[k] || {}).r = [...((M[k] || {}).r || []), ...m]; };
// LO 2/1989 (pp. 5-7)
rr('2:200|#1', 'R1'); ex('2:203|#1', '*'); ex('2:205|#1', 'EXOF', '*'); ex('2:210|#1', '*'); ex('2:211|#1', '*');
// Habeas Corpus (pp. 11-14)
ex('1:wsegundo|#1', 'EXOF'); rr('1:wsegundo|~En el ámbito de la Jurisdicción Militar', 'R3'); ex('1:wtercero|#1', '*'); ex('1:wtercero|a)', 'EXOF'); rr('1:wcuarto|#1', 'R4');
ex('1:wquinto|#1', 'EXOF'); rr('1:wsexto|#1', 'R5'); ex('1:wséptimo|~En el plazo de veinticuatro horas', 'EXOF');
// LO 3/2003 (p. 15) y LO 10/2007 (pp. 19-22)
ex("4:wúnico|1.", "EXOF"); rr("4:wúnico|1.", "R6");
ex("5:1|#1", "*"); rr("5:2|#2", "R7"); ex("5:3|#1", "*"); ex("5:7|#1", "*");
rr("5:8|#2", "R8"); ex("5:8|#2", "EXOF"); ex("5:9|#1", "EXOF"); ex("5:9|4.", "EXOF");
// LO 19/1994 (pp. 27-28)
rr("3:1|1.", "R9"); ex("3:1|2.", "*"); ex("3:3|2.", "*"); ex("3:4|1.", "EXOF"); rr("3:4|2.", "R10"); ex("3:4|2.", "EXOF"); ex("3:4|3.", "*"); rr("3:4|~En tal caso, el plazo", "R11");
rr("3:4|5.", "R12");
// Ley 4/1985 (pp. 31-)  (clave w+ordinal en palabras)
ex("6:wsegundo|#1", "EXOF", "*");
ex("6:wquinto|1.º","*"); ex("6:wquinto|2.º","*"); rr("6:wsexto|~La resolución del Tribunal declarando","R13"); ex("6:wsexto|~La resolución del Tribunal declarando","*");
ex("6:wséptimo|1.","EXOF"); ex("6:woctavo|1.","*"); ex("6:woctavo|2.","*"); ex("6:wnoveno|1.","EXAMEN"); rr("6:wnoveno|1.","R14"); ex("6:wnoveno|2.","EXOF");
// Ley 11/2003 (pp. 41-43)
ex("7:1|#1","*"); ex("7:2|#1","EXOF"); ex("7:3|#1","EXOF"); ex("7:4|#1","EXOF"); rr("7:4|2.","R15"); ex("7:4|2.","EXOF","*"); ex("7:8|#1","EXOF","*"); ex("7:11|#1","EXOF");
// Ley 25/2007 (pp. 52-53)
rr("8:4|2.","R16"); ex("8:4|2.","*"); ex("8:4|3.","*"); ex("8:5|#1","EXAMEN","EXOF"); ex("8:6|#1","EXOF"); rr("8:7|2.","R17"); ex("8:7|~Si no se establece otro plazo","EXOF");
ex("8:9|#1","EXOF","*"); ex("8:10|~La no conservación reiterada","*");
// Ley 23/2014 (pp. 67-70 …)
ex("9:1|#1","EXOF"); ex("9:2|#1","EXOF"); ex("9:5|#1","EXOF"); ex("9:6|#1","*","EXOF"); rr("9:6|2.","R18"); rr("9:6|3.","R19");
ex("9:7|~El testimonio de la resolución","*"); ex("9:12|#1","*");
ex("9:13|4.","EXOF"); ex("9:16|#1","EXOF");
ex("9:24|3.","*"); ex("9:24|4.","*"); rr("9:24|4.","R20"); ex("9:26|#1","EXOF"); ex("9:27|1.","*"); ex("9:32|#1","*");
ex("9:32|5.","*"); ex("9:33|#1","EXOF"); ex("9:33|2.","*"); ex("9:35|#1","*"); ex("9:35|1.","EXOF"); ex("9:35|2.","EXOF"); rr("9:35|2.","R21");
ex("9:37|#1","EXOF","*"); ex("9:37|a)","EXOF"); ex("9:37|b)","EXOF"); ex("9:39|#1","*");
ex("9:46|#1","EXOF"); ex("9:47|#1","EXOF","*"); ex("9:48|#1","EXOF","*"); ex("9:50|3.","*"); ex("9:51|1.","EXAMEN","EXOF"); ex("9:51|4.","EXOF"); ex("9:51|5.","EXOF");
ex("9:51|7.","*"); ex("9:54|#1","EXOF"); rr("9:54|1.","R22"); ex("9:57|2.","*"); ex("9:60|1.","*");
ex("9:60|f)","*"); ex("9:64|#1","*"); ex("9:64|2.","EXOF");
ex("9:71|#1","*"); rr("9:74|1.","R23"); ex("9:75|#1","*"); ex("9:76|#1","EXOF"); ex("9:78|#1","EXOF");
ex("9:83|#1","*"); ex("9:85|#1","*"); ex("9:86|2.","EXOF","*"); ex("9:91|#1","*"); ex("9:92|#1","*"); ex("9:92|c)","*"); ex("9:92|d)","*");
ex("9:93|c)","*"); ex("9:95|#1","EXOF"); ex("9:96|1.","EXOF"); rr("9:98|2.","R24"); ex("9:99|#1","*");
ex("9:105|#1","*"); ex("9:106|#1","*");
ex("9:116|#1","*"); ex("9:119|#1","*"); ex("9:120|#1","*");
ex("9:124|#1","*"); ex("9:125|#1","*"); ex("9:127|1.","*"); ex("9:132|#1","*");
rr("9:134|~Si el imputado o condenado","R25"); ex("9:137|#1","*"); ex("9:137|1.","EXOF"); ex("9:142|e)","*");
ex("9:143|#1","EXOF"); ex("9:144|#1","*");
ex("9:156|#1","*"); ex("9:158|#1","EXAMEN"); ex("9:159|2.","*"); ex("9:160|~En el certificado se señalará","*"); ex("9:162|2.","*");
ex("9:164|#1","*"); rr("9:164|2.","R26"); ex("9:169|#1","*"); ex("9:170|#1","*"); ex("9:171|#1","*"); ex("9:171|c)","*"); ex("9:172|1.","*"); ex("9:172|3.","*");
ex("9:173|1.","*"); ex("9:173|3.","*"); ex("9:176|2.","*"); ex("9:177|3.","*");
ex("9:182|d)","*"); ex("9:183|2.","*"); ex("9:184|1.","*"); rr("9:186|~Se considerarán válidos","R27"); ex("9:186|2.","*"); ex("9:186|4.","*"); ex("9:187|3.","EXOF");
ex("9:202|2.","*"); ex("9:206|d)","*");
rr("9:214|3.","R28");
// Ley 4/2015 (pp. 171-)
rr("10:5|2.","R30"); rr("10:8|1.","R31"); ex("10:9|#1","EXAMEN");
rr("10:10|#2","R32"); ex("10:10|#2","EXAMEN","EXOF");
rr("10:23|3.","R33");
rr("10:26|3.","R34"); ex("10:28|#1","EXAMEN"); rr("10:30|1.","R35");
module.exports = M;
