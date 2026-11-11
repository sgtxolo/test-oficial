// Esquema clave especial por tema.
// EXSUBCLAVE_REPASO[tema] = "archivo.html": el botón ⭐ Esquema clave de ese tema muestra ese repaso (resumen hecho a mano, ~10 págs) en lugar de la selección automática de artículos.
window.EXSUBCLAVE_REPASO = {
  2: "repaso-t2-borrador.html",   // 10/11/2026: repaso del Tema 2 (EXOF + sello EXAMEN + sanciones, código de colores Prefortia)
  3: "repaso-t3-borrador.html",   // 11/11/2026: repaso del Tema 3 (TUE/TFUE; 11 págs)
  20: "repaso-t20-borrador.html",   // 11/11/2026: Esquema clave T20 con cuadros del temario rehechos (11 cuadros + 5 fichas; 12 págs)
  21: "repaso-t21-borrador.html"   // 11/11/2026: repaso del Tema 21 (EXOF, R, oficiales y subrayado del Exprés; 10 págs reales)
};
// EXSUBCLAVE[tema] = {"id-pieza": "f"} fuerza artículos en la selección automática ('f' = entero, 'e' = recortado); EXSUBCLAVE_SOLO[tema] = true => solo esos.
window.EXSUBCLAVE = {};
window.EXSUBCLAVE_SOLO = {};
