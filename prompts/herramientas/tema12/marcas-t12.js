// Tema 12 (Ley 50/1997, del Gobierno) · marcas a mano del temario escaneado 08-08-2026 (marcas-t12.txt) + fichas RECUERDA R1-R10 (págs. 31-32 del PDF).
// Uso: node prompts/herramientas/tema12/marcas-t12.js [--dry]
require('../marcas-lib.js')({
  T: 12,
  normas: { L50: { txt: 'tema12/ley50.txt', bloque: 'T12_LEY50', nombre: 'Ley del Gobierno', tituloEnLinea: true } },
  marcas: 'tema12/marcas-t12.txt',
  RS: [
    ['R1', 'L50', 'El Gobierno se compone:', 'del Presidente, del Vicepresidente o Vicepresidentes, en su caso, y de los Ministros.', 'El Gobierno se compone del Presidente'],
    ['R2', 'L50', 'El Vicepresidente que asuma la titularidad de un Departamento Ministerial ostentará además:', 'la condición de Ministro.', 'El Vicepresidente que asuma la titularidad'],
    ['R3', 'L50', 'La creación, modificación y supresión de las Comisiones Delegadas del Gobierno será acordada por:', 'el Consejo de Ministros mediante Real Decreto, a propuesta del Presidente del Gobierno.', 'La creación, modificación y supresión de las Comisiones Delegadas'],
    ['R4', 'L50', 'La Comisión General de Secretarios de Estado y Subsecretarios estará integrada por:', 'los titulares de las Secretarías de Estado y por los Subsecretarios de los distintos Departamentos Ministeriales.', 'estará integrada por los titulares de las Secretarías de Estado'],
    ['R5', 'L50', 'Las deliberaciones de la Comisión General de Secretarios de Estado y Subsecretarios serán:', 'reservadas.', 'Subsecretarios serán reservadas'],
    ['R6', 'L50', 'Los Gabinetes son órganos de apoyo político y técnico del:', 'Presidente del Gobierno, de los Vicepresidentes, de los Ministros y de los Secretarios de Estado.', 'Los Gabinetes son órganos de apoyo político'],
    ['R7', 'L50', 'El Gobierno aprobará anualmente un Plan Normativo que contendrá las iniciativas legislativas o reglamentarias que vayan a ser elevadas para su aprobación:', 'en el año siguiente.', 'El Gobierno aprobará anualmente un Plan Normativo'],
    ['R8', 'L50', 'Salvo que normativamente se establezca otra cosa, los informes preceptivos se emitirán en un plazo de:', 'diez días, o de un mes cuando el informe se solicite a otra Administración o a un órgano u Organismo dotado de especial independencia o autonomía.', 'Salvo que normativamente se establezca otra cosa'],
    ['R9', 'L50', 'El Consejo de Ministros, a propuesta del Ministerio de la Presidencia, aprobará el informe anual de evaluación del Plan Anual Normativo:', 'antes del 30 de abril de cada año.', 'aprobará, antes del 30 de abril de cada año, un informe anual'],
    ['R10', 'L50', 'Todos los actos y omisiones del Gobierno están sometidos:', 'al control político de las Cortes Generales.', 'Todos los actos y omisiones del Gobierno'],
  ],
  recTitulo: 'RECUERDA DEL TEMARIO — fichas R1 a R10 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario',
  grupos: [['Ley 50/1997, del Gobierno — R1 a R10', () => true]],
  ensamblaje: ['    + T12.ley50\n', '    + T12.ley50 + T12.rec\n'],
});
