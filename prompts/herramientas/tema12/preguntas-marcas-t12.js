// Tema 12 · fase 2 de las marcas (21/10/2026): apartados con marca suya (EXOF / EX / ✱ / R) sin pregunta oficial (cobertura-marcas.js 12).
// EXOF, EX, ✱ y R → banco OFICIAL (12-172…). Ancladas a su párrafo en tema12/mapa-fijo-t12.json.
// Uso: node prompts/herramientas/tema12/preguntas-marcas-t12.js [--check]
const N = a => ['Ley 50/1997, de 27 de noviembre, del Gobierno', 'Ley 50/1997, del Gobierno', a];
const FUN = N('Del Gobierno: Composición y Funcionamiento'), INI = N('De la Iniciativa Legislativa y la Potestad Reglamentaria'), CON = N('Del Control de los Actos del Gobierno');
require('../preguntas-marcas-lib.js')({ T: 12, fuentes: ['tema12/ley50.txt'], desdeOf: 172, desdeIA: 9000, Q: [
  { n: FUN, a: 'art. 20.3.d)', r: 'Delegación y avocación de competencias', e: 'No son en ningún caso delegables las siguientes competencias: las atribuidas por una ley que prohíba __________ la delegación:', c: 0,
    o: ['expresamente', 'tácitamente', 'de forma implícita', 'con carácter general'],
    t: 'No son en ningún caso delegables las siguientes competencias: (…) Las atribuidas por una ley que prohíba expresamente la delegación.', p: 'Solo la prohibición EXPRESA de una ley impide la delegación.' },
  { n: INI, a: 'art. 25.1', r: 'Plan Anual Normativo', e: 'El Gobierno aprobará anualmente un Plan Normativo que contendrá las iniciativas legislativas o reglamentarias que vayan a ser elevadas para su aprobación:', c: 1,
    o: ['en el año en curso.', 'en el año siguiente.', 'en los dos años siguientes.', 'durante la legislatura.'],
    t: 'El Gobierno aprobará anualmente un Plan Normativo que contendrá las iniciativas legislativas o reglamentarias que vayan a ser elevadas para su aprobación en el año siguiente.', p: 'Ficha R7 del temario.' },
  { n: INI, a: 'art. 26', r: 'Procedimiento de elaboración de normas con rango de Ley y reglamentos', e: 'Se ajustará al procedimiento de elaboración de normas con rango de ley y reglamentos la elaboración de:', c: 2,
    o: ['los anteproyectos de ley, de los reales decretos-leyes y de las normas reglamentarias.', 'los proyectos de ley, de los proyectos de real decreto-ley y de las órdenes ministeriales.', 'los anteproyectos de ley, de los proyectos de real decreto legislativo y de normas reglamentarias.', 'los anteproyectos de ley orgánica y de las normas reglamentarias del Consejo de Ministros.'],
    t: 'La elaboración de los anteproyectos de ley, de los proyectos de real decreto legislativo y de normas reglamentarias se ajustará al siguiente procedimiento:', p: 'Los decretos-leyes quedan fuera del procedimiento (salvo la memoria abreviada).' },
  { n: INI, a: 'art. 26.2.b)', r: 'Procedimiento de elaboración de normas con rango de Ley y reglamentos', e: 'Podrá prescindirse del trámite de consulta pública cuando concurran razones __________ que lo justifiquen:', c: 3,
    o: ['urgentes de interés general', 'extraordinarias de necesidad', 'graves de seguridad nacional', 'graves de interés público'],
    t: 'Cuando concurran razones graves de interés público que lo justifiquen.', p: 'Razones GRAVES de interés PÚBLICO.' },
  { n: INI, a: 'art. 26.5', r: 'Procedimiento de elaboración de normas con rango de Ley y reglamentos', e: 'Salvo que normativamente se establezca otra cosa, los informes preceptivos se emitirán en un plazo de:', c: 0,
    o: ['diez días, o de un mes cuando el informe se solicite a otra Administración o a un órgano dotado de especial independencia.', 'quince días, o de un mes cuando el informe se solicite a otra Administración o a un órgano dotado de especial independencia.', 'diez días, o de dos meses cuando el informe se solicite a otra Administración o a un órgano dotado de especial independencia.', 'un mes, o de dos meses cuando el informe se solicite a otra Administración o a un órgano dotado de especial independencia.'],
    t: 'Salvo que normativamente se establezca otra cosa, los informes preceptivos se emitirán en un plazo de diez días, o de un mes cuando el informe se solicite a otra Administración o a un órgano u Organismo dotado de especial independencia o autonomía.', p: 'Ficha R8 del temario: diez días / un mes.' },
  { n: INI, a: 'art. 27.2.b)', r: 'Tramitación urgente de iniciativas normativas en el ámbito de la Administración General del Estado', e: 'La tramitación por vía de urgencia implicará que no será preciso el trámite de consulta pública, sin perjuicio de la realización de los trámites de audiencia pública o de información pública sobre el texto, cuyo plazo de realización será de:', c: 1,
    o: ['quince días hábiles.', 'siete días.', 'diez días hábiles.', 'quince días naturales.'],
    t: 'No será preciso el trámite de consulta pública previsto en el artículo 26.2, sin perjuicio de la realización de los trámites de audiencia pública o de información pública sobre el texto a los que se refiere el artículo 26.6, cuyo plazo de realización será de siete días.', p: 'En vía de urgencia, siete días.' },
  { n: CON, a: 'art. 29.1', r: 'Del control de los actos del Gobierno', e: 'El Gobierno está sujeto en toda su actuación:', c: 2,
    o: ['a la Constitución y a las leyes aprobadas por las Cortes Generales.', 'a la Constitución y al control político del Congreso de los Diputados.', 'a la Constitución y al resto del ordenamiento jurídico.', 'a las leyes y a los reglamentos de la Administración General del Estado.'],
    t: 'El Gobierno está sujeto a la Constitución y al resto del ordenamiento jurídico en toda su actuación.', p: 'Constitución y resto del ordenamiento jurídico.' },
] });
