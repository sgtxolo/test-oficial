// Artículos que el Esquema clave incluye SIEMPRE (los pide el usuario) y cómo se ven: 'f' = artículo ENTERO (regla del usuario: con EXOF o sello EXAMEN va entero, porque el examen puede preguntar otro apartado), 'e' = Exprés recortado.
// EXSUBCLAVE_SOLO[tema] = true  → en ese tema el Esquema clave son SOLO estos artículos (sin rellenar con otros ni usar el tope de páginas).
// Añadir más temas: window.EXSUBCLAVE[tema] = {"id-pieza": "f"}
window.EXSUBCLAVE_SOLO = {2: true};
window.EXSUBCLAVE = {
  // TEMA 2 (10/11/2026): solo las marcas de examen del usuario — EXOF (círculo azul a boli) y sello «PREGUNTA EXAMEN» (registro prompts/herramientas/tema2/marcas-situadas-t2.json) + c-56 y c-57 pedidos aparte; todos ENTEROS
  2: {
    "a-3": "f",   // Ley 19/2003 · Artículo 3 · EXOF
    "a-7": "f",   // Ley 19/2003 · Artículo 7 · EXOF
    "a-8": "f",   // Ley 19/2003 · Artículo 8 · EXOF
    "a-10": "f",   // Ley 19/2003 · Artículo 10 · EXOF
    "b-3": "f",   // Convenio CoE 196 · Artículo 3 · EXAMEN
    "b-5": "f",   // Convenio CoE 196 · Artículo 5 · EXAMEN
    "b-18": "f",   // Convenio CoE 196 · Artículo 18 · EXOF
    "b-23": "f",   // Convenio CoE 196 · Artículo 23 · EXOF
    "b-24": "f",   // Convenio CoE 196 · Artículo 24 · EXOF
    "b-25": "f",   // Convenio CoE 196 · Artículo 25 · EXOF
    "b-27": "f",   // Convenio CoE 196 · Artículo 27 · EXOF
    "c-2": "f",   // Ley 10/2010 · Artículo 2 · EXOF
    "c-7": "f",   // Ley 10/2010 · Artículo 7 · EXAMEN+EXOF
    "c-25": "f",   // Ley 10/2010 · Artículo 25 · EXOF
    "c-35": "f",   // Ley 10/2010 · Artículo 35 · EXOF
    "c-38": "f",   // Ley 10/2010 · Artículo 38 · EXOF
    "c-43": "f",   // Ley 10/2010 · Artículo 43 · EXOF+EXAMEN
    "c-45": "f",   // Ley 10/2010 · Artículo 45 · EXAMEN+EXOF
    "c-56": "f",   // Ley 10/2010 · Artículo 56 · pedido
    "c-57": "f",   // Ley 10/2010 · Artículo 57 · pedido
    "c-59": "f",   // Ley 10/2010 · Artículo 59 · EXOF
    "c-60": "f",   // Ley 10/2010 · Artículo 60 · EXOF
    "d-16": "f",   // Convención de Palermo · Artículo 16 · EXOF
    "d-18": "f",   // Convención de Palermo · Artículo 18 · EXAMEN+EXOF
    "e-6": "f",   // Protocolo de trata · Artículo 6 · EXOF
    "f-3": "f",   // Protocolo de tráfico de migrantes · Artículo 3 · EXOF
    "g-2": "f",   // Protocolo de armas de fuego · Artículo 2 · EXOF
    "g-3": "f",   // Protocolo de armas de fuego · Artículo 3 · EXAMEN
    "g-7": "f"    // Protocolo de armas de fuego · Artículo 7 · EXOF
  }
};
