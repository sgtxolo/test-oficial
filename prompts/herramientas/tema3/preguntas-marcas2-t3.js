// Tema 3 · fase 2 bis (21/10/2026): al quitar las preguntas sin sitio en el mapa, el art. 302.1 TFUE (✱, R28) se quedó sin oficial.
// Uso: node prompts/herramientas/tema3/preguntas-marcas2-t3.js [--check]
const TFUE = ['Tratado de Funcionamiento de la Unión Europea', 'TFUE', 'Tratado de Funcionamiento de la Unión Europea (TFUE)'];
require('../preguntas-marcas-lib.js')({ T: 3, fuentes: ['tema3/oficial-paginas.txt'], desdeOf: 411, desdeIA: 1, Q: [
  { n: TFUE, a: 'art. 302.1', r: 'Comité Económico y Social', e: 'Los miembros del Comité Económico y Social serán nombrados para un período de cinco años. El mandato de los miembros del Comité será:', c: 0,
    o: ['Renovable.', 'No renovable.', 'Renovable una sola vez.', 'Renovable por períodos de dos años y medio.'],
    t: 'El mandato de los miembros del Comité será renovable', p: 'El Consejo adopta la lista de miembros de conformidad con las propuestas presentadas por cada Estado miembro.' },
] });
