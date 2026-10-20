// Tema 7 · fase 2: apartados marcados sin pregunta oficial (LOTC art. 10 c/d/f ✱; LO 1/1982 art. 7 EXOF). 20/10/2026.
const LT = ['Ley Orgánica 2/1979, de 3 de octubre, del Tribunal Constitucional', 'LOTC', 'Ley Orgánica 2/1979, de 3 de octubre, del Tribunal Constitucional'];
const LH = ['Ley Orgánica 1/1982, de 5 de mayo, de protección civil del derecho al honor, a la intimidad personal y familiar y a la propia imagen', 'LO 1/1982', 'De la protección civil del honor, de la intimidad y de la propia imagen'];
require('../preguntas-marcas-lib.js')({ T: 7, fuentes: ['tema7/lotc.txt', 'tema7/lo1982.txt'], desdeOf: 152, desdeIA: 1101, Q: [
  { n: LT, a: 'art. 10.1.c)', r: 'Competencias del Tribunal en Pleno', e: 'El Tribunal en Pleno conoce de las cuestiones de constitucionalidad que reserve para sí; las demás:', c: 3,
    o: ['Deberán elevarse al Tribunal Supremo para su resolución definitiva.', 'Se resolverán por la Sección que designe el Presidente en cada caso.', 'Podrán deferirse a las Salas a propuesta del Fiscal General del Estado.', 'Deberán deferirse a las Salas según un turno objetivo.'],
    t: 'c) De las cuestiones de constitucionalidad que reserve para sí; las demás deberán deferirse a las Salas según un turno objetivo.', p: '' },
  { n: LT, a: 'art. 10.1.d)', r: 'Competencias del Tribunal en Pleno', e: 'El Tribunal en Pleno conoce de los conflictos constitucionales de competencia:', c: 0,
    o: ['Entre el Estado y las Comunidades Autónomas o de los de éstas entre sí.', 'Entre los órganos constitucionales del Estado y las Comunidades Autónomas.', 'Entre el Estado y las Entidades locales o de éstas entre sí.', 'Entre las Comunidades Autónomas y los órganos del Poder Judicial.'],
    t: 'd) De los conflictos constitucionales de competencia entre el Estado y las Comunidades Autónomas o de los de éstas entre sí.', p: '' },
  { n: LT, a: 'art. 10.1.f)', r: 'Competencias del Tribunal en Pleno', e: 'El Tribunal en Pleno conoce de los conflictos:', c: 1,
    o: ['De competencia entre las Entidades locales y las Comunidades Autónomas.', 'En defensa de la autonomía local.', 'Entre las Salas del propio Tribunal Constitucional.', 'De jurisdicción entre el Tribunal Supremo y los Tribunales Superiores de Justicia.'],
    t: 'f) De los conflictos en defensa de la autonomía local.', p: '' },
  { n: LH, a: 'art. 7 (apartados 1 y 2)', r: 'Intromisiones ilegítimas', e: 'Tendrán la consideración de intromisiones ilegítimas en el ámbito de protección delimitado por el artículo segundo de esta Ley, entre otras:', c: 2,
    o: ['La publicación de la imagen de una persona en actos públicos o en lugares abiertos al público.', 'La captación de la imagen de una persona que ejerza un cargo público durante un acto público.', 'El emplazamiento en cualquier lugar de aparatos de escucha, de filmación, de dispositivos ópticos o de cualquier otro medio apto para grabar o reproducir la vida íntima de las personas.', 'La utilización de la caricatura de una persona de notoriedad pública conforme al uso social.'],
    t: 'Tendrán la consideración de intromisiones ilegítimas en el ámbito de protección delimitado por el artículo segundo de esta Ley: 1. El emplazamiento en cualquier lugar de aparatos de escucha, de filmación, de dispositivos ópticos o de cualquier otro medio apto para grabar o reproducir la vida íntima de las personas.', p: '' },
] });
