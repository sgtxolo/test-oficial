// Tema 5 · lo que entra en el RESUMEN subrayado del usuario (PDF «TEMA 5- BASE DE DATOS PARTE 1», págs. 7-37; las demás páginas son el
// temario entero y NO se estudian). Lista leída a ojo de las fotos el 2/11/2026. '*' = artículo entero; si no, apartados que lleva el resumen.
// Páginas del PDF: SIS 7-14 (la 14 trae 52-57 tachados por duplicado: valen la 13 y, de la 14, solo 58-59), VIS 15-35, Código de visados 28-37
// (la 17 trae arriba art. 5 y 6.1-2 bis tachados; la 36 trae el art. 37 tachado y se repite limpio en la 37), actualización de 2024 en págs. 5-6.
// El «5.5 Eurodac» del resumen (Rgto. 603/2013, págs. 36-42) está DEROGADO: lo sustituye el Rgto. (UE) 2024/1358, que se hace aparte desde el art. 1.
module.exports = {
  sis: { 1: '*', 2: [1, 2], 4: [1, 2, 5, 7], 5: [1, 2], 6: '*', 7: [1, 2], 8: [1, 3], 11: [1], 12: [1, 4, 5, 6], 15: [1, 2, 3], 17: [1, 4], 19: '*',
    21: [1], 23: [1, 2, 3], 24: [1, 2], 25: [2], 31: '*', 32: [2], 35: [1, 3, 4, 6], 36: [8], 37: '*', 39: [1, 2, 3, 7], 40: [1], 41: [2, 3, 8], 42: [1],
    44: [1, 3, 5, 6], 45: [1, 2, 5, 6], 46: [1, 3], 47: [1], 49: [1, 2], 50: '*', 52: [2], 54: [1], 55: [2], 56: [1, 2], 57: [3, 4], 58: [1], 59: '*' },
  vis: { 1: '*', 2: [1], '2 bis': [1, 3, 6, 7], 5: [1], 6: [1, '2 bis', '2 quinquies', '2 sexies', '2 septies', 3], 7: [1, 3],
    '7 bis': [1, 2, 3], '7 ter': [1, 2, 4, 5], '7 quater': [1], '7 quinquies': [1, 2, 4, 6, 7, 8, 9, 10], 8: [1], '9 bis': [1], '9 ter': [2],
    '9 quater': [1, 2], '9 quinquies': [1, 2, 3], '9 sexies': [1, 2, 4, 5], '9 septies': [1], '9 octies': [1, 3], '9 duodecies': [1, 3, 4, 5, 6],
    '9 terdecies': [3, 4, 5], 14: [2], 20: [1], 21: [1], '22 terdecies': [1, 2, 3, 4, 5], '22 quaterdecies': [1, 2], '22 quindecies': [2],
    '22 vicies': [1, 2, 4], 23: [1, 3], 24: [1, 2, 3], 25: [1, 2], 26: [1, 2, 3, 6, 7, 11, 12, 14], '27 bis': '*', 28: [1, 2, 3], 29: [1], 30: [1],
    31: [1, 3], 32: [1], '32 bis': [1, 2, 3, 5, 6], 33: [2], 34: [1, 2, 4], 35: '*', 36: '*', 38: [1, 2], 40: [1], 41: [2, 3], 42: [1, 2], 43: [1, 2, 3, 4] },
  cv: { 1: [1, 2], 2: '*', 3: [1, 2, 3, 5], 4: [1, '1 bis'], 5: [1, 2, 3], 6: [1], 9: [1, '1 bis', '1 ter', 2, 3], 12: [1, 2, 3, 5, 6],
    13: [1, 2, 6, '6 bis', 7], 15: [1, 2, 3, 7], 16: [1, 2, '2 bis', 4, 5, 6, 7, 8], 22: [1, 2, 3], 23: [1, 2], 24: [1, 2, '2 bis'], '25 bis': [2],
    26: [1, 2, 3], '26 bis': '*', 28: '*', 29: [1], 30: '*', 32: [1], '32 bis': [1, 3, 4, 10], 33: [1, 2, 6, 8], 34: [1, 2, 3, 7], 35: [1, 2, 3, 8], 37: [1, 3] },
};
