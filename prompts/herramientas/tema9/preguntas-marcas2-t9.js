// Tema 9 · fase 2 bis (21/10/2026): EX también es OFICIAL (pauta del usuario). La 13.1.b se hizo como IA; aquí va como oficial 9-292.
// Uso: node prompts/herramientas/tema9/preguntas-marcas2-t9.js [--check]
const LOorg = ['Ley Orgánica 5/2005, de 17 de noviembre, de la Defensa Nacional', 'LO 5/2005', 'De la Organización'];
require('../preguntas-marcas-lib.js')({ T: 9, fuentes: ['tema9/lo5.txt', 'tema9/ddn2020.txt'], desdeOf: 292, desdeIA: 1, Q: [
  { n: LOorg, a: 'art. 13.1.b)', r: 'El Ejército de Tierra, la Armada y el Ejército del Aire', e: 'En el ámbito de la Fuerza, establecida como el conjunto de medios humanos y materiales que se agrupan y organizan con el cometido principal de prepararse para la realización de operaciones militares:', c: 2,
    o: ['Se llevará a cabo el adiestramiento y se realizarán, en tiempo de conflicto, las misiones específicas temporales que se le asignen.', 'Se llevará a cabo la dirección, gestión, administración y control de los recursos humanos, materiales y financieros.',
      'Se realizarán, en tiempo de paz, las misiones específicas permanentes que se le asignen.', 'Se llevarán a cabo las actividades del apoyo logístico que posibilitan la vida y funcionamiento de las unidades.'],
    t: 'En su ámbito, se llevará a cabo el adiestramiento, la preparación y la evaluación de sus unidades y se realizarán, en tiempo de paz, las misiones específicas permanentes que se le asignen.', p: 'Dirección, gestión y apoyo logístico corresponden al Apoyo a la Fuerza, no a la Fuerza.' },
] });
