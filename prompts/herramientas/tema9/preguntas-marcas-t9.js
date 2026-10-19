// Tema 9 · fase 2 de las marcas (19/10/2026): apartados con marca suya sin pregunta oficial (cobertura-marcas.js 9).
// Uso: node prompts/herramientas/tema9/preguntas-marcas-t9.js [--check]
const LO = ['Ley Orgánica 5/2005, de 17 de noviembre, de la Defensa Nacional', 'LO 5/2005', 'De las Atribuciones de los Poderes del Estado'];
const LOorg = [LO[0], LO[1], 'De la Organización'];
const DDN = ['Directiva de Defensa Nacional 2020, de 11 de junio de 2020', 'Directiva de Defensa Nacional 2020', 'De la Política de Defensa'];
require('../preguntas-marcas-lib.js')({ T: 9, fuentes: ['tema9/lo5.txt', 'tema9/ddn2020.txt'], desdeOf: 286, desdeIA: 1, Q: [
  { n: LO, a: 'art. 8.5.c)', r: 'Consejo de Defensa Nacional', e: 'El Consejo de Defensa Nacional en pleno tendrá, entre otros miembros, la siguiente composición:', c: 2,
    o: ['Los Ministros de Defensa, del Interior, de Justicia y de Asuntos Exteriores y de Cooperación.', 'Los Ministros de Defensa, del Interior y de Asuntos Exteriores y de Cooperación, únicamente.',
      'Los Ministros de Defensa, del Interior, de Asuntos Exteriores y de Cooperación y de Economía y Hacienda.', 'Los Ministros de Defensa, de Hacienda, de Asuntos Exteriores y de Cooperación y de Industria, Comercio y Turismo.'],
    t: 'c) Los Ministros de Defensa, del Interior, de Asuntos Exteriores y de Cooperación y de Economía y Hacienda.', p: 'El Ministro de Economía y Hacienda está en el Pleno pero NO en el Consejo Ejecutivo.' },
  { n: LO, a: 'art. 8.7', r: 'Consejo de Defensa Nacional', e: 'En función de la naturaleza de los asuntos que se traten, el resto de los miembros del Gobierno:', c: 3,
    o: ['Podrán ser convocados únicamente al Pleno del Consejo, nunca al Consejo Ejecutivo.', 'Deberán ser convocados siempre tanto al Pleno como al Consejo Ejecutivo.',
      'Podrán ser convocados únicamente al Consejo Ejecutivo, a propuesta del Ministro de Defensa.', 'Podrán ser convocados tanto al Pleno como al Consejo Ejecutivo.'],
    t: '7. Podrán ser convocados, en función de la naturaleza de los asuntos que se traten, tanto al Pleno como al Consejo Ejecutivo, el resto de los miembros del Gobierno.' },
  { n: LO, a: 'art. 8.8', r: 'Consejo de Defensa Nacional', e: 'Las autoridades o cargos de las Comunidades Autónomas y de las Ciudades con Estatuto de Autonomía, en relación con el Consejo de Defensa Nacional:', c: 0,
    o: ['Deberán ser convocados cuando se estime oportuno.', 'Podrán ser convocados únicamente en tiempo de conflicto armado.', 'Deberán ser convocados a todas las reuniones del Pleno.', 'No podrán ser convocados en ningún caso, al ser un órgano estatal.'],
    t: 'Las autoridades o cargos de las Comunidades Autónomas y de las Ciudades con Estatuto de Autonomía deberán ser convocados cuando se estime oportuno.', p: 'Ojo al verbo: las autoridades autonómicas «deberán» ser convocadas; las de la AGE, las locales y las personas relevantes «podrán» serlo.' },
  { n: LOorg, a: 'art. 12.3', r: 'El Estado Mayor de la Defensa', e: 'En particular, le corresponde al Jefe de Estado Mayor de la Defensa, entre otras funciones:', c: 1,
    o: ['Determinar y ejecutar la política militar, así como dirigir la Administración militar.', 'Asegurar la eficacia operativa de las Fuerzas Armadas y elaborar y definir la estrategia militar.',
      'Formular la Directiva de Defensa Nacional y ordenar las misiones de las Fuerzas Armadas.', 'Dirigir la política de defensa y la gestión de las situaciones de crisis que afecten a la defensa.'],
    t: 'c) Asegurar la eficacia operativa de las Fuerzas Armadas. A tal fin, podrá supervisar la preparación de las unidades de la fuerza y evaluar su disponibilidad operativa.', p: 'La política militar es del Ministro de Defensa; la Directiva de Defensa Nacional y las misiones, del Presidente del Gobierno.' },
  { n: LOorg, ia: true, a: 'art. 13.1.b)', r: 'El Ejército de Tierra, la Armada y el Ejército del Aire', e: 'En el ámbito de la Fuerza, establecida como el conjunto de medios humanos y materiales que se agrupan y organizan con el cometido principal de prepararse para la realización de operaciones militares:', c: 2,
    o: ['Se llevará a cabo el adiestramiento y se realizarán, en tiempo de conflicto, las misiones específicas temporales que se le asignen.', 'Se llevará a cabo la dirección, gestión, administración y control de los recursos humanos, materiales y financieros.',
      'Se realizarán, en tiempo de paz, las misiones específicas permanentes que se le asignen.', 'Se llevarán a cabo las actividades del apoyo logístico que posibilitan la vida y funcionamiento de las unidades.'],
    t: 'En su ámbito, se llevará a cabo el adiestramiento, la preparación y la evaluación de sus unidades y se realizarán, en tiempo de paz, las misiones específicas permanentes que se le asignen.', p: 'Dirección, gestión y apoyo logístico corresponden al Apoyo a la Fuerza, no a la Fuerza.' },
  { n: LOorg, a: 'art. 13.3.e)', r: 'El Ejército de Tierra, la Armada y el Ejército del Aire', e: 'En particular, les corresponde a los Jefes de Estado Mayor del Ejército de Tierra, de la Armada y del Ejército del Aire:', c: 0,
    o: ['Velar por los intereses generales del personal militar bajo su mando.', 'Elaborar y definir la estrategia militar de su respectivo Ejército y de las Fuerzas Armadas.',
      'Ejercer el mando de la estructura operativa de las Fuerzas Armadas y su conducción estratégica.', 'Establecer las normas de acción conjunta de las Fuerzas Armadas en el ámbito multinacional.'],
    t: 'e) Velar por los intereses generales del personal militar bajo su mando, tutelando en particular el régimen de derechos y libertades derivado de la norma constitucional y de su desarrollo legal.', p: 'Estrategia militar, mando de la estructura operativa y normas de acción conjunta son funciones del JEMAD (art. 12.3).' },
  { n: DDN, a: 'apartado de Líneas generales y objetivos, letra l)', r: 'Líneas generales y objetivos de la política de defensa', e: 'La excelencia tecnológica requiere de una adecuada inversión económica, que permita potenciar tres actividades clave:', c: 3,
    o: ['La industria de Defensa, la ciberdefensa y la inteligencia artificial.', 'La cooperación industrial, la Cooperación Estructurada Permanente y la formación.',
      'La captación de talento, el uso dual y tractor de las tecnologías de defensa y la generación de empleo cualificado.', 'La investigación, desarrollo e innovación; la captación de talento; y la formación.'],
    t: 'La excelencia tecnológica requiere de una adecuada inversión económica, que permita potenciar tres actividades clave: la investigación, desarrollo e innovación; la captación de talento; y la formación.' },
] });
