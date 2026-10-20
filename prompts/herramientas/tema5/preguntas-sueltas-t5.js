// Tema 5 · fase 2: apartado marcado sin pregunta (VIS art. 22 novodecies.4, R35). 20/10/2026.
const N = ['Reglamento (CE) n.º 767/2008 sobre el Sistema de Información de Visados (VIS), en su versión consolidada', 'Reglamento VIS', 'Del Sistema de Información de Visados'];
require('../preguntas-marcas-lib.js')({ T: 5, fuentes: ['tema5/transcrito.txt'], desdeOf: 330, desdeIA: 2103, Q: [
  { n: N, a: 'art. 22 novodecies.4', r: 'Acceso al VIS para consultar datos: búsqueda', e: 'La imagen facial a que se refiere el apartado 3, letra e), no será:', c: 2,
    o: ['Un criterio de búsqueda admisible cuando no puedan utilizarse las impresiones dactilares.', 'Un dato al que dé acceso la consulta del VIS en caso de respuesta positiva.', 'El único criterio de búsqueda.', 'Un criterio de búsqueda en las consultas efectuadas por las autoridades designadas.'],
    t: '4. La imagen facial a que se refiere el apartado 3, letra e), no será el único criterio de búsqueda.', p: '' },
] });
