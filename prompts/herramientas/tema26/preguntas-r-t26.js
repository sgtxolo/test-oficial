// Tema 26 · preguntas OFICIALES de las fichas R (R1…R62) sin pregunta oficial equivalente (ids 26-210…). Todas al banco OFICIAL.
// Las R ya cubiertas por una oficial existente (campo ex de r-temario-t26.js) NO se duplican: R1,3,4,6,8,10,24,29,32,33,39,58,61,62.
// Cita literal comprobada contra tema26/oficial.txt (R59-R60: protocolos-fuente.txt); la correcta nunca la más larga.
// Uso: node prompts/herramientas/tema26/preguntas-r-t26.js [--check]   (--check = solo valida, no toca test-oficial-conocimiento.html)
const N = {
  lo11: ['Ley Orgánica 11/2007, de 22 de octubre, reguladora de los derechos y deberes de los miembros de la Guardia Civil', 'Ley Orgánica 11/2007, reguladora de los derechos y deberes de los miembros de la Guardia Civil', 'Ley Orgánica 11/2007, de 22 de octubre, reguladora de los derechos y deberes de los miembros de la Guardia'],
  lo12: ['Ley Orgánica 12/2007, de 22 de octubre, del régimen disciplinario de la Guardia Civil', 'Ley Orgánica 12/2007, del régimen disciplinario de la Guardia Civil', 'Ley Orgánica 12/2007, de 22 de octubre, del régimen disciplinario de la Guardia Civil'],
  l29: ['Ley 29/2014, de 28 de noviembre, de Régimen del Personal de la Guardia Civil', 'Ley 29/2014, de Régimen del Personal de la Guardia Civil', 'Ley 29/2014, de 28 de noviembre, de Régimen del Personal de la Guardia Civil'],
  ord: ['Orden PRE/1983/2012, de 14 de septiembre, por la que se declaran de aplicación a la Guardia Civil diversas normas del ordenamiento militar sobre mando, disciplina y régimen interior', 'Orden PRE/1983/2012, normas militares aplicables a la Guardia Civil', 'Orden PRE/1983/2012, de 14 de septiembre, por la que se declaran de aplicación a la Guardia Civil diversas'],
  acl: ['Resolución de 22 de julio de 2019, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación frente al acoso laboral en la Guardia Civil', 'Protocolo de actuación frente al acoso laboral en la Guardia Civil', 'General / Estatuto de la Guardia Civil'],
};
const R = []; let k = 0;
const q = (n, a, r, e, ok, mal, t) => { const pos = (k++ * 3 + 1) % 4; const o = mal.slice(); o.splice(pos, 0, ok); R.push({ n: N[n], ia: false, a, r, e, o, c: pos, t, p: '' }); };
// ---------- LO 11/2007 ----------
q('lo11', 'art. 14', 'Acceso al Defensor del Pueblo', 'Los Guardias Civiles podrán dirigirse al Defensor del Pueblo, de acuerdo con lo previsto en la legislación reguladora del Defensor del Pueblo:',
  'Directa e individualmente.',
  ['A través de su asociación profesional representativa y por escrito.', 'Previa autorización del Director General de la Guardia Civil, en cada caso.', 'Por conducto reglamentario y a través de su jefe de unidad.'],
  'Los Guardias Civiles podrán dirigirse directa e individualmente al Defensor del Pueblo, de acuerdo con lo previsto en la legislación reguladora del Defensor del Pueblo.');
q('lo11', 'art. 35', 'Retribuciones', 'Los miembros de la Guardia Civil tendrán derecho a una remuneración acorde con:',
  'Su empleo, destino y puesto de trabajo que desempeñen.',
  ['Su antigüedad en el Cuerpo y la escala a la que pertenezcan en todo caso.', 'Su empleo y destino exclusivamente, con independencia del puesto de trabajo.', 'Su escala y titulación académica, así como los servicios prestados en el Cuerpo.'],
  'Los miembros de la Guardia Civil tendrán derecho a una remuneración acorde con su empleo, destino y puesto de trabajo que desempeñen');
q('lo11', 'art. 43', 'Asociaciones representativas', 'Serán consideradas asociaciones profesionales representativas las que hubieran obtenido en las elecciones al Consejo de Guardia Civil:',
  'Al menos, un representante o, en dos de las Escalas, el diez por ciento de los votos emitidos en cada una de ellas.',
  ['Al menos, dos representantes o, en una de las Escalas, el diez por ciento de los votos emitidos en ella.', 'Al menos, un representante o, en las tres Escalas, el cinco por ciento de los votos emitidos en cada una de ellas.', 'Al menos, tres representantes o, en dos de las Escalas, el veinte por ciento de los votos emitidos en cada una de ellas.'],
  'Serán consideradas asociaciones profesionales representativas las que hubieran obtenido en las elecciones al Consejo de Guardia Civil, al menos, un representante o, en dos de las Escalas, el diez por ciento de los votos emitidos en cada una de ellas.');
q('lo11', 'art. 52', 'Consejo de la Guardia Civil', 'El Consejo de la Guardia Civil como órgano colegiado se crea bajo la presidencia del:',
  'Ministro del Interior, o persona en quien delegue.',
  ['Ministro de Defensa, o persona en quien delegue, con carácter permanente.', 'Director General de la Guardia Civil, o persona en quien delegue, siempre.', 'Secretario de Estado de Seguridad, o el Director Adjunto Operativo en su defecto.'],
  'Bajo la presidencia del Ministro del Interior, o persona en quien delegue, se crea el Consejo de la Guardia Civil como órgano colegiado');
q('lo11', 'art. 56.8', 'Elección a miembros del Consejo', 'La duración del mandato de los representantes en el Consejo de la Guardia Civil será de:',
  'Cuatro años, pudiendo ser reelegidos en sucesivos procesos electorales.',
  ['Tres años, sin que puedan ser reelegidos en sucesivos procesos electorales.', 'Cinco años, pudiendo ser reelegidos una sola vez en sucesivos procesos electorales.', 'Seis años, sin posibilidad de reelección durante los dos procesos electorales siguientes.'],
  'La duración del mandato de los representantes será de cuatro años, pudiendo ser reelegidos en sucesivos procesos electorales.');
// ---------- LO 12/2007 ----------
q('lo12', 'art. 6', 'Clases de faltas', 'Las faltas podrán ser:',
  'Muy graves, graves y leves.',
  ['Muy graves, graves, leves y levísimas, según su trascendencia para el servicio.', 'Graves, leves y de mera irregularidad, según la sanción que corresponda a cada una.', 'Muy graves y leves únicamente, según afecten o no al funcionamiento de la Institución.'],
  'Las faltas podrán ser muy graves, graves y leves.');
q('lo12', 'art. 10', 'Finalidad de las sanciones', 'Las sanciones disciplinarias tienen por finalidad la corrección de comportamientos:',
  'Perjudiciales para el servicio o para los ciudadanos, o lesivos para el funcionamiento de la Institución.',
  ['Contrarios a la Constitución y al ordenamiento jurídico, o lesivos para la imagen de la Institución.', 'Perjudiciales para el servicio o para los compañeros, o lesivos para el prestigio del Cuerpo ante la sociedad.', 'Que supongan un incumplimiento de las órdenes recibidas, con independencia de su repercusión.'],
  'Las sanciones disciplinarias tienen por finalidad la corrección de comportamientos perjudiciales para el servicio o para los ciudadanos, o lesivos para el funcionamiento de la Institución.');
q('lo12', 'art. 19', 'Criterios de graduación de las sanciones', 'Las sanciones que se impongan en ejercicio de la potestad sancionadora atribuida por esta Ley guardarán proporción con:',
  'La gravedad y circunstancias de las conductas que las motiven.',
  ['La antigüedad del infractor en el Cuerpo y las circunstancias personales y familiares de este.', 'El perjuicio causado al servicio y la repercusión de los hechos en los medios de comunicación.', 'El empleo del infractor y las funciones de mando que tenga encomendadas en su destino.'],
  'guardarán proporción con la gravedad y circunstancias de las conductas que las motiven');
q('lo12', 'art. 21.1', 'Prescripción de las faltas', 'Las faltas muy graves prescribirán a los tres años; las graves y las leves, respectivamente, a los:',
  'Dos años y a los seis meses.',
  ['Cuatro años y a los dos años, respectivamente, desde su comisión.', 'Un año y a los tres meses, respectivamente, desde que se tuvo conocimiento.', 'Tres años y a los seis meses, respectivamente, desde que fuese firme la resolución.'],
  'Las faltas muy graves prescribirán a los tres años, las graves a los dos años y las leves a los seis meses.');
q('lo12', 'art. 22.1', 'Prescripción de las sanciones', 'Las sanciones impuestas por faltas muy graves prescribirán a los tres años; las impuestas por faltas graves y por faltas leves, respectivamente, a los:',
  'Dos años y al año.',
  ['Cuatro años y a los dos años, respectivamente, desde su imposición.', 'Dos años y a los seis meses, respectivamente, desde que se dictó la resolución.', 'Tres años y al año, respectivamente, desde la comisión de la falta que las motivó.'],
  'Las sanciones impuestas por faltas muy graves prescribirán a los tres años, las impuestas por faltas graves a los dos años y las impuestas por falta leve al año.');
q('lo12', 'art. 23.1', 'Atribución de la potestad disciplinaria', 'Corresponde la potestad disciplinaria, en los términos establecidos en esta Ley:',
  'A las autoridades y mandos de los Ministerios de Defensa y del Interior.',
  ['Exclusivamente a las autoridades del Ministerio del Interior y a los mandos del Cuerpo.', 'A las autoridades y mandos de los Ministerios de Defensa y del Interior, previo informe del Consejo de la Guardia Civil.', 'Al Director General de la Policía y de la Guardia Civil y a los oficiales generales con mando.'],
  'Corresponde la potestad disciplinaria a las autoridades y mandos de los Ministerios de Defensa y del Interior, en los términos establecidos en esta Ley.');
q('lo12', 'art. 27', 'Competencias del Ministro de Defensa', 'Para la imposición de la sanción de separación del servicio será competente:',
  'El Ministro de Defensa a propuesta del Ministro del Interior.',
  ['El Ministro del Interior a propuesta del Ministro de Defensa, en todo caso.', 'El Director General de la Policía y de la Guardia Civil a propuesta del Consejo Asesor de Personal.', 'El Consejo de Ministros a propuesta conjunta de los Ministros de Defensa y del Interior.'],
  'Para la imposición de la sanción de separación del servicio será competente el Ministro de Defensa a propuesta del Ministro del Interior');
q('lo12', 'art. 28', 'Competencias del Director General de la Policía y de la Guardia Civil', 'Podrá imponer todas las sanciones, excepto la de separación del servicio:',
  'El Director General de la Policía y de la Guardia Civil.',
  ['El Ministro del Interior, a propuesta del Director General de la Policía y de la Guardia Civil.', 'El Director Adjunto Operativo de la Guardia Civil, previo informe del Consejo Asesor de Personal.', 'El Secretario de Estado de Seguridad, salvo las que correspondan a los oficiales generales.'],
  'El Director General de la Policía y de la Guardia Civil podrá imponer todas las sanciones, excepto la de separación del servicio.');
q('lo12', 'art. 41', 'Denuncia', 'No se tomará en consideración para dar inicio un procedimiento disciplinario:',
  'La denuncia anónima.',
  ['La denuncia formulada por un compañero de la misma unidad que el denunciado.', 'La denuncia formulada por escrito y sin firma de la autoridad que la reciba.', 'La denuncia presentada por un ciudadano ajeno al Cuerpo de la Guardia Civil.'],
  'No se tomará en consideración la denuncia anónima para dar inicio un procedimiento disciplinario.');
q('lo12', 'art. 43.1', 'Cómputo de los plazos', 'Cuando los plazos establecidos en materia de procedimiento y de recursos se señalen por días se entiende que éstos son:',
  'Hábiles, excluyéndose del cómputo los domingos y los declarados festivos.',
  ['Hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos.', 'Naturales, computándose todos los días, incluidos los domingos y los declarados festivos.', 'Hábiles, excluyéndose del cómputo únicamente los declarados festivos en el lugar de destino.'],
  'cuando los plazos establecidos en materia de procedimiento y de recursos se señalen por días se entiende que éstos son hábiles, excluyéndose del cómputo los domingos y los declarados festivos.');
q('lo12', 'art. 46.4', 'Disposiciones comunes en materia de prueba', 'Las pruebas que se practiquen durante la tramitación del expediente se llevarán a cabo, en todo caso, respetando:',
  'El principio de inmediatez y el derecho del interesado de asistir a las mismas.',
  ['El principio de contradicción y el derecho del interesado a proponer peritos de su elección.', 'El principio de publicidad y el derecho del interesado a que asista su asociación profesional.', 'El principio de oportunidad y el derecho del interesado a no declarar contra sí mismo.'],
  'Las pruebas que se practiquen durante la tramitación del expediente, se llevarán a cabo, en todo caso, respetando el principio de inmediatez y el derecho del interesado de asistir a las mismas.');
q('lo12', 'art. 55', 'Plazos de instrucción', 'El procedimiento respetará los plazos establecidos, sin que la instrucción del expediente pueda exceder de:',
  'Seis meses.',
  ['Tres meses, prorrogables por otros tres.', 'Nueve meses, salvo que se declare su urgencia.', 'Un año, contado desde la notificación del acuerdo de incoación.'],
  'sin que la instrucción del expediente pueda exceder de seis meses.');
q('lo12', 'art. 71.1', 'Cancelación', 'Las anotaciones de las sanciones, excepto la de separación del servicio, serán canceladas de oficio una vez transcurridos los plazos siguientes: cuatro años para las faltas muy graves; para las graves y las leves, respectivamente:',
  'Dos años y seis meses.',
  ['Tres años y un año, respectivamente, desde que se impuso la sanción.', 'Dos años y un año, respectivamente, desde que se cometió la falta.', 'Un año y tres meses, respectivamente, desde que se notificó la sanción.'],
  'a) Cuatro años, cuando se trate de sanciones por faltas muy graves. b) Dos años, cuando se trate de sanciones por faltas graves. c) Seis meses, cuando se trate de sanciones por faltas leves.');
// ---------- Ley 29/2014 ----------
q('l29', 'art. 3.2', 'Guardias civiles', 'La condición de guardia civil se adquiere al obtener el primer empleo:',
  'Conferido por el Rey y refrendado por el Ministro de Defensa, e incorporarse a la escala correspondiente del Cuerpo.',
  ['Conferido por el Rey y refrendado por el Ministro del Interior, e incorporarse a la escala correspondiente del Cuerpo.', 'Conferido por el Ministro de Defensa y refrendado por el Director General de la Guardia Civil, e incorporarse a su destino.', 'Conferido y refrendado por el Rey, e incorporarse a la escala correspondiente del Cuerpo tras jurar o prometer lealtad.'],
  'La condición de guardia civil se adquiere al obtener el primer empleo, conferido por el Rey y refrendado por el Ministro de Defensa, e incorporarse a la escala correspondiente del Cuerpo.');
q('l29', 'art. 7.1.2', 'Reglas de comportamiento del guardia civil', 'El guardia civil pondrá todo su empeño en preservar la seguridad y el bienestar de los ciudadanos, sin discriminación alguna, actuando siempre con:',
  'Dignidad, prudencia y honradez.',
  ['Honor, lealtad y espíritu de sacrificio, con arreglo a la Cartilla fundacional.', 'Legalidad, proporcionalidad y neutralidad política, en todo momento.', 'Dignidad, prudencia y discreción, también fuera del servicio.'],
  'actuando siempre con dignidad, prudencia y honradez.');
q('l29', 'art. 9.a)', 'De los Ministros de Defensa y del Interior', 'Corresponde el ejercicio de la función directiva en lo concerniente al régimen de ascensos y situaciones administrativas del personal:',
  'Al Ministro de Defensa.',
  ['Al Ministro del Interior, previo informe del Consejo de la Guardia Civil.', 'Conjuntamente a los Ministros de Defensa y del Interior, en todo caso.', 'Al Director General de la Guardia Civil, por delegación del Ministro del Interior.'],
  'Corresponde al Ministro de Defensa el ejercicio de la función directiva en lo concerniente al régimen de ascensos y situaciones administrativas del personal.');
q('l29', 'art. 9.c)', 'De los Ministros de Defensa y del Interior', 'Ejercerán sus competencias directivas en todo lo relacionado con la selección, la formación y el perfeccionamiento:',
  'Conjuntamente los Ministros de Defensa y del Interior.',
  ['El Ministro de Defensa, previo informe favorable del Ministro del Interior.', 'El Ministro del Interior, a propuesta del Director General de la Guardia Civil.', 'El Secretario de Estado de Seguridad y el Director General de la Guardia Civil, conjuntamente.'],
  'Conjuntamente ejercerán sus competencias directivas en todo lo relacionado con la selección, la formación y el perfeccionamiento.');
q('l29', 'art. 14', 'Consejo de la Guardia Civil', 'El Consejo de la Guardia Civil es el órgano colegiado en el que participan:',
  'Representantes de los miembros del Cuerpo de la Guardia Civil y de los Ministerios de Defensa y del Interior.',
  ['Representantes de las asociaciones profesionales y de los Ministerios de Defensa y del Interior exclusivamente.', 'Representantes de los miembros del Cuerpo de la Guardia Civil y de las Comunidades Autónomas con competencias en seguridad.', 'Los oficiales generales del Cuerpo y representantes de los Ministerios de Defensa, del Interior y de Hacienda.'],
  'El Consejo de la Guardia Civil es el órgano colegiado en el que participan representantes de los miembros del Cuerpo de la Guardia Civil y de los Ministerios de Defensa y del Interior');
q('l29', 'art. 17.1', 'Categorías', 'Los miembros de la escala de oficiales se agrupan en las categorías de:',
  'Oficiales generales y de oficiales.',
  ['Oficiales generales, de oficiales superiores y de oficiales subalternos.', 'Oficiales generales, oficiales y suboficiales mayores, según su empleo.', 'Oficiales, de capitanes y de tenientes, en función de su antigüedad.'],
  'Los miembros de la escala de oficiales se agrupan en las categorías de oficiales generales y de oficiales.');
q('l29', 'art. 18.1', 'Empleos del Cuerpo de la Guardia Civil', 'Dentro de cada categoría, los guardias civiles están ordenados por:',
  'Empleos y dentro de éstos por antigüedad.',
  ['Antigüedad y dentro de ésta por empleos, según el escalafón de cada categoría.', 'Escalas y dentro de éstas por méritos, según el último proceso de evaluación.', 'Empleos y dentro de éstos por orden alfabético y fecha de ingreso en el Cuerpo.'],
  'Dentro de cada categoría, los guardias civiles están ordenados por empleos, criterio esencial en la organización jerarquizada de la Guardia Civil, y dentro de éstos por antigüedad.');
q('l29', 'art. 25.2', 'Plantilla de efectivos', 'Fijará, con vigencia para períodos de cuatro años cada uno, la plantilla reglamentaria para los distintos empleos y escalas:',
  'El Consejo de Ministros, a propuesta conjunta de los Ministros de Defensa y del Interior.',
  ['El Ministro del Interior, a propuesta conjunta del Director General de la Guardia Civil y del Consejo de la Guardia Civil.', 'El Ministro de Defensa, a propuesta del Ministro del Interior y previo informe de las Cortes Generales.', 'El Gobierno, a propuesta del Ministro de Hacienda y del Director General de la Guardia Civil.'],
  'El Consejo de Ministros, a propuesta conjunta de los Ministros de Defensa y del Interior, fijará, con vigencia para períodos de cuatro años cada uno, la plantilla reglamentaria para los distintos empleos y escalas');
q('l29', 'art. 32.1', 'Modalidades de acceso a la enseñanza de formación de la Guardia Civil', 'Los españoles tienen derecho al acceso a la enseñanza de formación de la Guardia Civil en los términos regulados en este capítulo, de acuerdo con los principios constitucionales de:',
  'Igualdad, mérito y capacidad, y con los establecidos en el artículo 55 de la Ley 7/2007, de 12 de abril.',
  ['Igualdad, mérito y publicidad, y con los establecidos en el artículo 103 de la Constitución Española.', 'Igualdad, capacidad y antigüedad, y con los establecidos en el artículo 14 de la Ley 7/2007, de 12 de abril.', 'Legalidad, mérito y capacidad, y con los establecidos en el artículo 55 de la Ley 40/2015, de 1 de octubre.'],
  'de acuerdo con los principios constitucionales de igualdad, mérito y capacidad, y con los establecidos en el artículo 55 de la Ley 7/2007, de 12 de abril.');
q('l29', 'art. 32.2', 'Modalidades de acceso a la enseñanza de formación de la Guardia Civil', 'A la enseñanza de formación de la Guardia Civil se podrá acceder, de acuerdo con lo regulado en este capítulo, por los siguientes sistemas:',
  'Por acceso directo y por promoción profesional.',
  ['Por acceso directo y por promoción interna, mediante concurso de méritos.', 'Por acceso libre y por cambio de escala, mediante concurso-oposición.', 'Por acceso directo, por promoción profesional y por cambio de escala.'],
  'se podrá acceder, de acuerdo con lo regulado en este capítulo, por los siguientes sistemas: a) Por acceso directo. b) Por promoción profesional.');
q('l29', 'art. 42.4', 'Régimen interior de los centros docentes', 'Las normas generales de régimen interior de los centros docentes de la Guardia Civil serán aprobadas por:',
  'El Director General de la Guardia Civil.',
  ['El Ministro del Interior, a propuesta del Director General de la Guardia Civil.', 'Los Ministros de Defensa y del Interior, conjuntamente y mediante orden ministerial.', 'El Director de cada centro docente, previo informe del Consejo de la Guardia Civil.'],
  'Las normas generales de régimen interior de los centros docentes de la Guardia Civil serán aprobadas por el Director General de la Guardia Civil.');
q('l29', 'art. 51.3', 'Profesorado', 'Fijarán los requisitos generales del profesorado de los centros de la estructura docente de la Guardia Civil y las condiciones de su ejercicio:',
  'Conjuntamente los Ministros de Defensa y del Interior.',
  ['El Director General de la Guardia Civil, previo informe del Ministro del Interior.', 'El Ministro de Educación y el Ministro del Interior, a propuesta del Consejo de la Guardia Civil.', 'El Ministro del Interior, oído el Director General de la Guardia Civil y el Consejo de Defensa.'],
  'Los Ministros de Defensa y del Interior fijarán conjuntamente los requisitos generales del profesorado de los centros de la estructura docente de la Guardia Civil y las condiciones de su ejercicio.');
q('l29', 'art. 53.1', 'Historial profesional', 'Las vicisitudes profesionales del guardia civil quedarán reflejadas en su historial profesional individual, de uso confidencial, que constará de los siguientes documentos:',
  'Hoja de servicios, colección de informes personales, expediente académico y expediente de aptitud psicofísica.',
  ['Hoja de servicios, colección de informes personales, expediente académico y expediente disciplinario.', 'Hoja de servicios, hoja de destinos, expediente académico y expediente de aptitud psicofísica, entre otros.', 'Hoja de servicios, colección de informes de mando, expediente de recompensas y expediente sanitario.'],
  'quedarán reflejadas en su historial profesional individual, de uso confidencial, que constará de los siguientes documentos: a) Hoja de servicios. b) Colección de informes personales. c) Expediente académico. d) Expediente de aptitud psicofísica.');
q('l29', 'art. 53.3', 'Historial profesional', 'Establecerán las características de los documentos que componen el historial profesional y dictarán las normas para su elaboración, custodia y utilización, asegurando su confidencialidad:',
  'Conjuntamente los Ministros de Defensa y del Interior.',
  ['El Director General de la Guardia Civil, a propuesta de la Jefatura de Personal.', 'El Ministro del Interior, previo informe de la Agencia Española de Protección de Datos.', 'El Ministro de Defensa, a propuesta del Director General de la Guardia Civil.'],
  'establecerán conjuntamente las características de los documentos que componen el historial profesional y dictarán las normas para su elaboración, custodia y utilización, asegurando su confidencialidad.');
q('l29', 'art. 55.2', 'Informes personales', 'Determinarán el sistema general de los informes personales de calificación, los procedimientos de realización y de alegaciones, la periodicidad y el nivel jerárquico de los que deben realizarlos:',
  'Conjuntamente los Ministros de Defensa y del Interior, a propuesta del Director General de la Guardia Civil.',
  ['El Director General de la Guardia Civil, a propuesta conjunta de los Ministros de Defensa y del Interior.', 'El Consejo Superior de la Guardia Civil, a propuesta de la Jefatura de Personal y previo informe del Ministro del Interior.', 'El Ministro del Interior, a propuesta del Director General de la Guardia Civil y oído el Consejo de la Guardia Civil.'],
  'Los Ministros de Defensa y del Interior, a propuesta del Director General de la Guardia Civil, determinarán conjuntamente el sistema general de los informes personales de calificación, los procedimientos de realización y de alegaciones de que dispondrán los guardias civiles, la periodicidad, y el nivel jerárquico de los que deben realizarlos');
q('l29', 'art. 61.1', 'Órganos de evaluación', 'Las evaluaciones que se definen en esta Ley serán realizadas, de acuerdo con lo previsto en ella, por:',
  'El Consejo Superior de la Guardia Civil o por las Juntas de Evaluación que se constituyan.',
  ['El Consejo de la Guardia Civil o por las Juntas de Personal que se constituyan en cada destino.', 'La Jefatura de Personal o por las Juntas de Evaluación que designe el Director General.', 'El Consejo Superior de la Guardia Civil, y únicamente por las Juntas de Evaluación en los ascensos por elección.'],
  'Las evaluaciones que se definen en esta Ley serán realizadas, de acuerdo con lo previsto en ella, por el Consejo Superior de la Guardia Civil o por las Juntas de Evaluación que se constituyan.');
q('l29', 'art. 62.2', 'Normas generales', 'Los ascensos de los guardias civiles se producirán al empleo inmediato superior, con ocasión de vacante en la escala correspondiente, siempre que se reúnan las condiciones establecidas en esta Ley y de acuerdo con los principios de:',
  'Objetividad, igualdad de oportunidades, mérito y capacidad.',
  ['Objetividad, igualdad de oportunidades, mérito y antigüedad en el empleo.', 'Legalidad, publicidad, igualdad de oportunidades, mérito y capacidad.', 'Objetividad, transparencia, jerarquía, disciplina y subordinación.'],
  'siempre que se reúnan las condiciones establecidas en esta Ley y de acuerdo con los principios de objetividad, igualdad de oportunidades, mérito y capacidad');
q('l29', 'art. 63.1', 'Sistemas de ascenso', 'Los sistemas de ascenso son los siguientes:',
  'Antigüedad, concurso-oposición, clasificación y elección.',
  ['Antigüedad, concurso de méritos, clasificación y libre designación, según el empleo.', 'Antigüedad, oposición, clasificación, elección y cambio de escala, según el caso.', 'Concurso-oposición, clasificación, elección y libre designación, según el empleo.'],
  'Los sistemas de ascenso son los siguientes: a) Antigüedad. b) Concurso-oposición. c) Clasificación. d) Elección.');
q('l29', 'art. 75.2', 'Provisión de destinos', 'Los destinos del personal del Cuerpo de la Guardia Civil se proveerán conforme a los principios de:',
  'Mérito, capacidad y antigüedad.',
  ['Mérito, capacidad y disponibilidad, atendiendo a las necesidades del servicio.', 'Igualdad, mérito, capacidad y publicidad, atendiendo a la plantilla reglamentaria.', 'Objetividad, antigüedad y libre designación, atendiendo a los intereses del Cuerpo.'],
  'Los destinos del personal del Cuerpo de la Guardia Civil se proveerán conforme a los principios de mérito, capacidad y antigüedad.');
q('l29', 'art. 80.2', 'Asignación de destinos', 'La asignación de los destinos de libre designación que correspondan a puestos de mando o dirección que determine el Ministro del Interior serán competencia:',
  'Del Secretario de Estado de Seguridad.',
  ['Del Director General de la Guardia Civil, previo informe del Consejo Superior.', 'Del Ministro de Defensa, a propuesta del Ministro del Interior en cada caso.', 'Del Director Adjunto Operativo, con carácter exclusivo y por delegación.'],
  'La asignación de los destinos de libre designación que correspondan a puestos de mando o dirección que determine el Ministro del Interior serán competencia del Secretario de Estado de Seguridad.');
q('l29', 'art. 87.1', 'Situaciones administrativas', 'Los guardias civiles se hallarán en alguna de las siguientes situaciones administrativas:',
  'Servicio activo, servicios especiales, excedencia, suspensión de empleo, suspensión de funciones o reserva.',
  ['Servicio activo, servicios especiales, excedencia voluntaria, suspensión de empleo, suspensión de funciones o retiro.', 'Servicio activo, servicios especiales, excedencia, suspensión de empleo, pase a la reserva o disponibilidad.', 'Servicio activo, comisión de servicio, excedencia, suspensión de empleo, suspensión de funciones o reserva.'],
  'Los guardias civiles se hallarán en alguna de las siguientes situaciones administrativas: a) Servicio activo. b) Servicios especiales. c) Excedencia. d) Suspensión de empleo. e) Suspensión de funciones. f) Reserva.');
q('l29', 'art. 96.4', 'Renuncia a la condición de guardia civil', 'El procedimiento de formalización de la renuncia deberá instruirse y resolverse en:',
  'El plazo máximo de dos meses.',
  ['El plazo máximo de tres meses, transcurrido el cual se entenderá denegada.', 'El plazo máximo de un mes, transcurrido el cual se entenderá concedida.', 'El plazo máximo de seis meses, prorrogable por causas justificadas.'],
  'El procedimiento de formalización de la renuncia deberá instruirse y resolverse en el plazo máximo de dos meses.');
q('l29', 'art. 102.1', 'Principios generales', 'Las prestaciones asistenciales de protección social de los guardias civiles, incluida la asistencia sanitaria, estarán cubiertas por:',
  'El Régimen Especial de la Seguridad Social de las Fuerzas Armadas.',
  ['El Régimen General de la Seguridad Social, con carácter exclusivo para todo el personal.', 'El Régimen de Clases Pasivas del Estado, a través de la Mutualidad General de Funcionarios.', 'El Sistema Nacional de Salud, mediante un convenio con las Comunidades Autónomas.'],
  'Las prestaciones asistenciales de protección social de los guardias civiles, incluida la asistencia sanitaria, estarán cubiertas por el Régimen Especial de la Seguridad Social de las Fuerzas Armadas.');
q('l29', 'art. 104', 'Acción social', 'Dentro del marco de protección social existirá en la Guardia Civil un sistema de acción social, en el que se desarrollarán actuaciones para promover:',
  'El bienestar social, la formación, la salud, la cultura, el ocio y el deporte del personal del Cuerpo, incluidos los retirados, y sus familias.',
  ['El bienestar social, la vivienda, la salud, la cultura y el deporte del personal en activo del Cuerpo y sus familias.', 'La formación, la salud, la cultura y el ocio del personal del Cuerpo, excluidos los retirados, y sus familias.', 'El bienestar social, la salud, el ocio y el deporte del personal del Cuerpo, incluidos los retirados.'],
  'un sistema de acción social, en el que se desarrollarán actuaciones para promover el bienestar social, la formación, la salud, la cultura, el ocio y el deporte del personal del Cuerpo, incluidos los retirados, y sus familias.');
q('l29', 'art. 105.4', 'Sistema retributivo', 'Si se determina que la baja se ha producido en acto de servicio o como consecuencia del mismo, se tendrá derecho a percibir de las retribuciones básicas y de los complementos de destino y específico que se viniesen percibiendo:',
  'El 100 por cien.',
  ['El 75 por cien, durante el primer año de baja.', 'El 90 por cien, hasta el alta médica.', 'El 80 por cien, sin límite de duración.'],
  'Si se determina que la baja se ha producido en acto de servicio o como consecuencia del mismo, se tendrá derecho a percibir el 100 por cien de las retribuciones básicas y de los complementos de destino y específico que se viniesen percibiendo.');
q('l29', 'art. 106.1', 'Recursos', 'Contra los actos y resoluciones que se adopten en ejercicio de las competencias atribuidas en esta Ley, los guardias civiles podrán interponer:',
  'Recurso de alzada.',
  ['Recurso extraordinario de revisión, ante el Director General de la Guardia Civil.', 'Recurso potestativo de reposición, en todo caso, ante el órgano que dictó el acto.', 'Recurso contencioso-disciplinario militar, con carácter previo a la vía administrativa.'],
  'Contra los actos y resoluciones que se adopten en ejercicio de las competencias atribuidas en esta Ley, los guardias civiles podrán interponer recurso de alzada');
q('l29', 'art. 106.1', 'Recursos', 'Cuando se trate de actos y resoluciones adoptados por el Consejo de Ministros y por los Ministros de Defensa y del Interior, contra los que cabrá interponer:',
  'Recurso potestativo de reposición, previo a la vía contencioso-administrativa.',
  ['Recurso de alzada, ante el Presidente del Gobierno, previo a la vía contencioso-administrativa.', 'Recurso extraordinario de revisión, ante el órgano que dictó el acto, en el plazo de un mes.', 'Recurso contencioso-administrativo directo, sin que quepa recurso administrativo alguno.'],
  'excepto cuando se trate de actos y resoluciones adoptados por el Consejo de Ministros y por los Ministros de Defensa y del Interior, contra los que cabrá interponer recurso potestativo de reposición, previo a la vía contencioso-administrativa');
// ---------- Orden PRE/1983/2012 ----------
q('ord', 'art. 1.1', 'La acción de mando', 'La acción de mando en la Guardia Civil se refiere al ejercicio de la autoridad, con la consiguiente responsabilidad, que corresponde a todo guardia civil en razón de su:',
  'Cargo, destino o servicio.',
  ['Empleo, antigüedad o escala, según el caso y por delegación del superior.', 'Empleo, cargo o destino, con independencia del servicio que desempeñe.', 'Categoría, escala o especialidad, y siempre con carácter permanente.'],
  'la acción de mando en la Guardia Civil se refiere al ejercicio de la autoridad, con la consiguiente responsabilidad, que corresponde a todo guardia civil en razón de su cargo, destino o servicio.');
// ---------- Protocolo acoso laboral ----------
q('acl', 'apartado tercero.1', 'Ámbito de aplicación objetivo. Definiciones', 'Constituye acoso laboral la exposición a conductas de violencia psicológica intensa, dirigidas de forma reiterada y prolongada en el tiempo hacia una o más personas, por parte de otra u otras que actúan frente a aquéllas desde una posición de poder:',
  'No necesariamente jerárquica sino en términos psicológicos, con el propósito o el efecto de crear un entorno hostil o humillante que perturbe la vida profesional de la víctima.',
  ['Necesariamente jerárquica y de superioridad en el empleo, con el propósito de crear un entorno hostil o humillante que perturbe la vida profesional de la víctima.', 'No necesariamente jerárquica sino en términos físicos, con el propósito o el efecto de crear un entorno intimidatorio, degradante u ofensivo.', 'Exclusivamente jerárquica, con el único propósito de crear un entorno hostil o humillante que perturbe la vida personal de la víctima y de su familia.'],
  'por parte de otra u otras que actúan frente a aquéllas desde una posición de poder —no necesariamente jerárquica sino en términos psicológicos—, con el propósito o el efecto de crear un entorno hostil o humillante que perturbe la vida profesional de la víctima.');
q('acl', 'apartado tercero.1', 'Ámbito de aplicación objetivo. Definiciones', 'Se entiende por período prolongado en el tiempo aquel hostigamiento intenso o extremo que tenga una duración de:',
  'Al menos seis meses.',
  ['Al menos tres meses, interpretados siempre de forma estricta.', 'Al menos un año, interpretado de forma flexible según el caso.', 'Más de dos años, de forma ininterrumpida y documentada.'],
  'Se entiende por periodo prolongado en el tiempo aquel hostigamiento intenso o extremo que tenga una duración de al menos seis meses.');
require('../preguntas-marcas-lib.js')({ T: 26, fmt: 'nuevo', fuentes: ['tema26/oficial.txt', '../herramientas/tema26/protocolos-fuente.txt'], desdeOf: 210, desdeIA: 1, Q: R });
