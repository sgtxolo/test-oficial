// Tema 10 · fase 2 de las marcas (24/10/2026): preguntas OFICIALES para los 107 párrafos con marca suya (EXOF / EX / ✱ / R) sin pregunta oficial
// (cobertura-marcas.js 10 → falta10.json). Ids 10-292… (oficiales); cita literal comprobada contra cc.txt; correcta nunca la más larga; letras rotadas.
// Uso: node prompts/herramientas/tema10/preguntas-marcas-t10.js [--check]
const CC = ['Código Civil', 'Código Civil', 'De las Personas'];
const TP = ['Código Civil', 'Código Civil', 'Título Preliminar: Normas Jurídicas, su Aplicación y Eficacia'];
const Q = []; let i = 0;
// q(norma, art, rúbrica, enunciado, [correcta, f1, f2, f3], cita, explicación) → letra correcta rotada A/B/C/D
const q = (n, a, r, e, o, t, p) => { const c = i++ % 4, ops = o.slice(1); ops.splice(c, 0, o[0]); Q.push({ n, ia: false, a, r, e, o: ops, c, t, p }); };

// ── Título Preliminar ──
q(TP, 'art. 1.1', 'Fuentes del derecho', 'Las fuentes del ordenamiento jurídico español, según el Código, son la ley, la costumbre y:',
  ['los principios generales del derecho.', 'la jurisprudencia del Tribunal Supremo.', 'los tratados internacionales publicados.', 'la doctrina de los Tribunales.'],
  'Las fuentes del ordenamiento jurídico español son la ley, la costumbre y los principios generales del derecho', 'La jurisprudencia solo complementa el ordenamiento.');
q(TP, 'art. 2.2', 'Eficacia de las leyes', 'Por la simple derogación de una ley:',
  ['no recobran vigencia las que ésta hubiere derogado.', 'recobran vigencia las que ésta hubiere derogado.', 'recobran vigencia las que ésta hubiere derogado, si la nueva ley lo permite.', 'quedan en suspenso las que ésta hubiere derogado.'],
  'Por la simple derogación de una ley no recobran vigencia las que ésta hubiere derogado', 'No hay reviviscencia de las leyes derogadas.');
q(TP, 'art. 4.3', 'Aplicación de las normas', 'Las disposiciones del Código Civil se aplicarán como supletorias:',
  ['en las materias regidas por otras leyes.', 'en las materias regidas por los reglamentos.', 'en defecto de la costumbre local.', 'en las materias de derecho foral exclusivamente.'],
  'Las disposiciones de este Código se aplicarán como supletorias en las materias regidas por otras leyes', 'Son supletorias en las materias regidas por otras leyes.');
q(TP, 'art. 6.1', 'Eficacia de las normas', 'La ignorancia de las leyes no excusa de su cumplimiento. El error de derecho producirá únicamente:',
  ['aquellos efectos que las leyes determinen.', 'los efectos que decida la autoridad judicial.', 'efectos atenuantes cuando sea invencible.', 'los efectos que las partes pacten.'],
  'El error de derecho producirá únicamente aquellos efectos que las leyes determinen', 'Solo los efectos que las leyes determinen.');
q(TP, 'art. 6.3', 'Eficacia de las normas', 'Los actos contrarios a las normas imperativas y a las prohibitivas son nulos de pleno derecho, salvo que:',
  ['en ellas se establezca un efecto distinto para el caso de contravención.', 'la autoridad judicial los convalide.', 'se hayan realizado de buena fe.', 'no hayan perjudicado a terceros.'],
  'Los actos contrarios a las normas imperativas y a las prohibitivas son nulos de pleno derecho, salvo que en ellas se establezca un efecto distinto para el caso de contravención', 'La excepción es que la norma establezca otro efecto.');
q(TP, 'art. 13.2', 'Ámbito de aplicación de los regímenes civiles', 'Con pleno respeto a los derechos especiales o forales de las provincias o territorios en que están vigentes, regirá el Código Civil:',
  ['como derecho supletorio, en defecto del que lo sea en cada una de aquéllas según sus normas especiales.', 'como derecho preferente sobre el derecho foral.', 'como derecho común, aunque exista norma foral.', 'como derecho supletorio, aunque la norma foral prevea otro derecho supletorio.'],
  'regirá el Código Civil como derecho supletorio, en defecto del que lo sea en cada una de aquéllas según sus normas especiales', 'Supletorio en defecto del que lo sea en cada territorio.');
q(CC, 'art. 14.3', 'Vecindad civil', 'Si al nacer el hijo, o al ser adoptado, los padres tuvieren distinta vecindad civil, el hijo tendrá la que corresponda a aquél de los dos respecto del cual la filiación haya sido determinada antes; en su defecto, tendrá la del lugar del nacimiento y, en último término:',
  ['la vecindad de derecho común.', 'la vecindad de la madre.', 'la vecindad del lugar de residencia.', 'la vecindad de derecho foral.'],
  'en su defecto, tendrá la del lugar del nacimiento y, en último término, la vecindad de derecho común', 'En último término, la vecindad de derecho común.');
q(CC, 'art. 15.1', 'Vecindad civil de los extranjeros', 'El extranjero que adquiera la nacionalidad española deberá optar, al inscribir la adquisición de la nacionalidad, por una de las siguientes vecindades. Señale la INCORRECTA:',
  ['La del lugar de su primera entrada en España.', 'La correspondiente al lugar de residencia.', 'La del lugar del nacimiento.', 'La última vecindad de cualquiera de sus progenitores o adoptantes.'],
  'a) La correspondiente al lugar de residencia. b) La del lugar del nacimiento. c) La última vecindad de cualquiera de sus progenitores o adoptantes. d) La del cónyuge', 'La del lugar de primera entrada no figura entre las opciones.');
q(CC, 'art. 15.1.d)', 'Vecindad civil de los extranjeros', 'Entre las vecindades por las que debe optar el extranjero que adquiera la nacionalidad española figura, además de la del lugar de residencia, la del lugar de nacimiento y la última vecindad de cualquiera de sus progenitores o adoptantes:',
  ['la del cónyuge.', 'la del lugar de celebración del matrimonio.', 'la de derecho común.', 'la del último domicilio.'],
  'd) La del cónyuge', 'La cuarta opción es la vecindad del cónyuge.');
q(CC, 'art. 16.1', 'Conflictos de leyes', 'Los conflictos de leyes que puedan surgir por la coexistencia de distintas legislaciones civiles en el territorio nacional se resolverán según las normas contenidas en el capítulo IV con las siguientes particularidades:',
  ['será ley personal la determinada por la vecindad civil.', 'será ley personal la determinada por la nacionalidad.', 'será ley personal la del lugar de residencia habitual.', 'será ley personal la del lugar de celebración del acto.'],
  'Será ley personal la determinada por la vecindad civil', 'La ley personal es la determinada por la vecindad civil.');
q(CC, 'art. 18', 'Consolidación de la nacionalidad', 'La posesión y utilización continuada de la nacionalidad española durante diez años, con buena fe y basada en un título inscrito en el Registro Civil, es causa de consolidación de la nacionalidad:',
  ['aunque se anule el título que la originó.', 'siempre que no se anule el título que la originó.', 'salvo que se anule el título que la originó.', 'una vez firme la resolución que declare su validez.'],
  'es causa de consolidación de la nacionalidad, aunque se anule el título que la originó', 'Consolida aunque se anule el título.');
q(CC, 'art. 20.1', 'Opción a la nacionalidad', 'Tienen derecho a optar por la nacionalidad española las personas que estén o hayan estado sujetas a la patria potestad de un español, aquellas cuyo padre o madre hubiera sido originariamente español y nacido en España y:',
  ['las que se hallen comprendidas en el segundo apartado de los artículos 17 y 19.', 'las nacidas en España de padres extranjeros residentes.', 'las que lleven diez años de residencia legal.', 'las que hayan sido adoptadas por un español mayor de edad.'],
  'c) Las que se hallen comprendidas en el segundo apartado de los artículos 17 y 19', 'La tercera categoría remite a los artículos 17.2 y 19.2.');
q(CC, 'art. 20.2', 'Opción a la nacionalidad', 'La declaración de opción por la nacionalidad española se formulará por el representante legal del optante menor de catorce años; por el propio interesado, asistido por su representante legal, cuando aquél sea:',
  ['mayor de catorce años.', 'mayor de dieciséis años.', 'mayor de doce años.', 'mayor de dieciocho años.'],
  'Por el propio interesado, asistido por su representante legal, cuando aquél sea mayor de catorce años', 'Mayor de catorce años, asistido por su representante.');
q(CC, 'art. 20.3', 'Opción a la nacionalidad', 'El ejercicio del derecho de opción previsto para aquellas personas cuyo padre o madre hubiera sido originariamente español y nacido en España:',
  ['no estará sujeto a límite alguno de edad.', 'caducará a los veinte años de edad.', 'caducará a los dieciocho años de edad.', 'caducará a los dos años de la emancipación.'],
  'el ejercicio del derecho de opción previsto en el apartado 1.b) de este artículo no estará sujeto a límite alguno de edad', 'Sin límite de edad.');
q(CC, 'art. 22.2.c)', 'Nacionalidad por residencia', 'Bastará el tiempo de residencia de un año para el que haya estado sujeto legalmente a la tutela, curatela con facultades de representación plena, guarda o acogimiento de un ciudadano o institución españoles durante:',
  ['dos años consecutivos.', 'tres años consecutivos.', 'un año consecutivo.', 'cinco años consecutivos.'],
  'El que haya estado sujeto legalmente a la tutela, curatela con facultades de representación plena, guarda o acogimiento de un ciudadano o institución españoles durante dos años consecutivos', 'Dos años consecutivos.');
q(CC, 'art. 22.3', 'Nacionalidad por residencia', 'En todos los casos de nacionalidad por residencia, la residencia habrá de ser:',
  ['legal, continuada e inmediatamente anterior a la petición.', 'legal y continuada, aunque no sea inmediatamente anterior a la petición.', 'continuada e inmediatamente anterior, aunque no sea legal.', 'legal e inmediatamente anterior, sin exigir continuidad.'],
  'En todos los casos, la residencia habrá de ser legal, continuada e inmediatamente anterior a la petición', 'Legal, continuada e inmediatamente anterior.');
q(CC, 'art. 22.4', 'Nacionalidad por residencia', 'El interesado en la nacionalidad por residencia deberá justificar, en el expediente regulado por la legislación del Registro Civil:',
  ['buena conducta cívica y suficiente grado de integración en la sociedad española.', 'buena conducta cívica y dominio de la lengua castellana.', 'suficiente grado de integración y medios económicos propios.', 'ausencia de antecedentes penales y arraigo familiar.'],
  'El interesado deberá justificar, en el expediente regulado por la legislación del Registro Civil, buena conducta cívica y suficiente grado de integración en la sociedad española', 'Buena conducta cívica e integración.');
q(CC, 'art. 23', 'Requisitos comunes de validez', 'Son requisitos comunes para la validez de la adquisición de la nacionalidad española por opción, carta de naturaleza o residencia, entre otros:',
  ['que la adquisición se inscriba en el Registro Civil español.', 'que se publique la concesión en el «Boletín Oficial del Estado».', 'que el interesado acredite medios económicos suficientes.', 'que el Ministerio Fiscal informe favorablemente.'],
  'c) Que la adquisición se inscriba en el Registro Civil español', 'Debe inscribirse en el Registro Civil español.');
q(CC, 'art. 24.4', 'Pérdida de la nacionalidad', 'No se pierde la nacionalidad española, en virtud de lo dispuesto en el artículo sobre pérdida de la nacionalidad:',
  ['si España se hallare en guerra.', 'si el interesado reside en un país iberoamericano.', 'si el interesado declara su voluntad de conservarla.', 'si el interesado es menor de edad.'],
  'No se pierde la nacionalidad española, en virtud de lo dispuesto en este precepto, si España se hallare en guerra', 'La excepción es que España se halle en guerra.');
q(CC, 'art. 25.1', 'Pérdida de la nacionalidad', 'Los españoles que no lo sean de origen perderán la nacionalidad cuando durante un período de tres años utilicen exclusivamente:',
  ['la nacionalidad a la que hubieran declarado renunciar al adquirir la nacionalidad española.', 'el pasaporte de su país de origen.', 'la lengua de su país de origen.', 'la residencia en su país de origen.'],
  'Cuando durante un período de tres años utilicen exclusivamente la nacionalidad a la que hubieran declarado renunciar al adquirir la nacionalidad española', 'Tres años utilizando exclusivamente la nacionalidad renunciada.');
q(CC, 'art. 26.1', 'Recuperación de la nacionalidad', 'Quien haya perdido la nacionalidad española podrá recuperarla cumpliendo los siguientes requisitos, entre otros:',
  ['declarar ante el encargado del Registro Civil su voluntad de recuperar la nacionalidad española.', 'obtener autorización del Consejo de Ministros.', 'acreditar diez años de residencia legal.', 'renunciar a la otra nacionalidad ante notario.'],
  'b) Declarar ante el encargado del Registro Civil su voluntad de recuperar la nacionalidad española', 'Declaración de voluntad ante el encargado del Registro Civil.');

// ── Libro I · personas ──
q(CC, 'art. 30', 'Personalidad', 'La personalidad se adquiere en el momento del nacimiento con vida, una vez producido:',
  ['el entero desprendimiento del seno materno.', 'el corte del cordón umbilical.', 'el transcurso de veinticuatro horas de vida.', 'la inscripción del nacimiento en el Registro Civil.'],
  'La personalidad se adquiere en el momento del nacimiento con vida, una vez producido el entero desprendimiento del seno materno', 'Se exige el entero desprendimiento del seno materno.');
q(CC, 'art. 31', 'Personalidad', 'La prioridad del nacimiento, en el caso de partos dobles, da al primer nacido:',
  ['los derechos que la ley reconozca al primogénito.', 'la preferencia en la patria potestad.', 'los derechos del hijo mayor del padre.', 'la representación del segundo nacido.'],
  'La prioridad del nacimiento, en el caso de partos dobles, da al primer nacido los derechos que la ley reconozca al primogénito', 'Los derechos del primogénito.');
q(CC, 'art. 32', 'Extinción de la personalidad', 'La personalidad civil se extingue:',
  ['por la muerte de las personas.', 'por la muerte o la declaración de fallecimiento.', 'por la muerte o la declaración de ausencia.', 'por la muerte o la incapacitación.'],
  'La personalidad civil se extingue por la muerte de las personas', 'Solo por la muerte.');
q(CC, 'art. 35', 'Personas jurídicas', 'Son personas jurídicas las asociaciones de interés particular, sean civiles, mercantiles o industriales, a las que la ley conceda personalidad propia, independiente de la de cada uno de los asociados, y:',
  ['las corporaciones, asociaciones y fundaciones de interés público reconocidas por la ley.', 'las comunidades de bienes reconocidas por la ley.', 'las corporaciones y fundaciones de interés particular.', 'las asociaciones de hecho inscritas en el Registro Civil.'],
  'Las corporaciones, asociaciones y fundaciones de interés público reconocidas por la ley', 'Corporaciones, asociaciones y fundaciones de interés público.');
q(CC, 'art. 38', 'Personas jurídicas', 'Las personas jurídicas pueden adquirir y poseer bienes de todas clases, así como contraer obligaciones y ejercitar acciones civiles o criminales:',
  ['conforme a las leyes y reglas de su constitución.', 'conforme a lo que decida su órgano de gobierno.', 'previa autorización de la autoridad administrativa.', 'conforme a sus estatutos aprobados judicialmente.'],
  'conforme a las leyes y reglas de su constitución', 'Conforme a las leyes y reglas de su constitución.');
q(CC, 'art. 43', 'Promesa de matrimonio', 'El incumplimiento sin causa de la promesa cierta de matrimonio hecha por persona mayor de edad o por menor emancipado sólo producirá la obligación de resarcir a la otra parte:',
  ['de los gastos hechos y las obligaciones contraídas en consideración al matrimonio prometido.', 'de los daños y perjuicios morales y patrimoniales.', 'de los gastos hechos, incrementados con el interés legal.', 'de las obligaciones contraídas, pero no de los gastos.'],
  'sólo producirá la obligación de resarcir a la otra parte de los gastos hechos y las obligaciones contraídas en consideración al matrimonio prometido', 'Gastos y obligaciones.');
q(CC, 'art. 48', 'Dispensa de impedimentos', 'El Juez podrá dispensar, con justa causa y a instancia de parte, mediante resolución previa dictada en expediente de jurisdicción voluntaria, los impedimentos de:',
  ['muerte dolosa del cónyuge y de parentesco de grado tercero entre colaterales.', 'ligamen y de parentesco en línea recta.', 'edad y de parentesco de grado segundo entre colaterales.', 'muerte dolosa del cónyuge y de parentesco por adopción.'],
  'los impedimentos de muerte dolosa del cónyuge o persona con la que hubiera estado unida por análoga relación de afectividad a la conyugal y de parentesco de grado tercero entre colaterales', 'Solo dos impedimentos son dispensables.');
q(CC, 'art. 49', 'Forma del matrimonio', 'Cualquier español podrá contraer matrimonio dentro o fuera de España:',
  ['en la forma regulada en el Código Civil o en la forma religiosa legalmente prevista.', 'solo en la forma regulada en el Código Civil.', 'en la forma civil dentro de España y en la religiosa fuera de ella.', 'en la forma civil y, con autorización judicial, en la religiosa.'],
  'Cualquier español podrá contraer matrimonio dentro o fuera de España: 1.º En la forma regulada en este Código. 2.º En la forma religiosa legalmente prevista', 'Forma civil o religiosa legalmente prevista.');
q(CC, 'art. 51.2', 'Competencia para celebrar el matrimonio', 'Será competente para celebrar el matrimonio, entre otros:',
  ['el Alcalde del municipio donde se celebre el matrimonio o concejal en quien éste delegue.', 'el Juez de Paz del municipio donde se celebre.', 'el Juez de Primera Instancia del lugar de celebración.', 'el Encargado del Registro Civil Central.'],
  '1.º El Alcalde del municipio donde se celebre el matrimonio o concejal en quien éste delegue', 'El Alcalde o concejal delegado.');
q(CC, 'art. 53', 'Validez del matrimonio', 'La validez del matrimonio no quedará afectada por la incompetencia o falta de nombramiento del Alcalde, Concejal, letrado de la Administración de Justicia, notario o personal funcionario ante quien se celebre, siempre que:',
  ['al menos uno de los cónyuges hubiera procedido de buena fe y aquellos ejercieran sus funciones públicamente.', 'ambos cónyuges hubieran procedido de buena fe y aquellos ejercieran sus funciones de oficio.', 'al menos uno de los cónyuges hubiera procedido de buena fe y haya mediado dispensa.', 'al menos uno de los cónyuges lo ratifique ante el Encargado del Registro Civil.'],
  'siempre que al menos uno de los cónyuges hubiera procedido de buena fe y aquellos ejercieran sus funciones públicamente', 'Buena fe de al menos uno y funciones ejercidas públicamente.');
q(CC, 'art. 60.2', 'Matrimonio religioso', 'Se reconocen efectos civiles al matrimonio celebrado en la forma religiosa prevista por las iglesias, confesiones, comunidades religiosas o federaciones de las mismas que, inscritas en el Registro de Entidades Religiosas, hayan obtenido:',
  ['el reconocimiento de notorio arraigo en España.', 'la autorización del Ministerio de Justicia.', 'la declaración de utilidad pública.', 'la homologación del Registro Civil Central.'],
  'que, inscritas en el Registro de Entidades Religiosas, hayan obtenido el reconocimiento de notorio arraigo en España', 'Notorio arraigo en España.');
q(CC, 'art. 63', 'Inscripción del matrimonio religioso', 'Se denegará la práctica del asiento de la inscripción del matrimonio celebrado en forma religiosa cuando:',
  ['de los documentos presentados o de los asientos del Registro conste que el matrimonio no reúne los requisitos que para su validez se exigen.', 'la certificación de la iglesia no esté traducida.', 'el matrimonio se haya celebrado fuera de España.', 'no se haya tramitado acta previa de capacidad.'],
  'Se denegará la práctica del asiento cuando de los documentos presentados o de los asientos del Registro conste que el matrimonio no reúne los requisitos que para su validez se exigen en este Título', 'Si consta que no reúne los requisitos de validez.');
q(CC, 'art. 68', 'Derechos y deberes de los cónyuges', 'Los cónyuges están obligados a vivir juntos, guardarse fidelidad y socorrerse mutuamente. Deberán, además:',
  ['compartir las responsabilidades domésticas y el cuidado y atención de ascendientes y descendientes y otras personas dependientes a su cargo.', 'contribuir a las cargas del matrimonio en proporción a sus ingresos.', 'compartir la administración de sus bienes privativos.', 'respetar el domicilio fijado por el Juez.'],
  'Deberán, además, compartir las responsabilidades domésticas y el cuidado y atención de ascendientes y descendientes y otras personas dependientes a su cargo', 'Responsabilidades domésticas y cuidado de dependientes.');
q(CC, 'art. 70', 'Domicilio conyugal', 'Los cónyuges fijarán de común acuerdo el domicilio conyugal y, en caso de discrepancia:',
  ['resolverá el Juez, teniendo en cuenta el interés de la familia.', 'resolverá el Juez, teniendo en cuenta el interés del cónyuge con menos ingresos.', 'se estará al domicilio del esposo.', 'resolverá el Encargado del Registro Civil.'],
  'Los cónyuges fijarán de común acuerdo el domicilio conyugal y, en caso de discrepancia, resolverá el Juez, teniendo en cuenta el interés de la familia', 'Resuelve el Juez atendiendo al interés de la familia.');
q(CC, 'art. 75', 'Nulidad: acción por falta de edad', 'Si la causa de nulidad fuere la falta de edad, al llegar a la mayoría de edad sólo podrá ejercitar la acción el contrayente menor, salvo que los cónyuges hubieren vivido juntos:',
  ['durante un año después de alcanzada aquélla.', 'durante dos años después de alcanzada aquélla.', 'durante seis meses después de alcanzada aquélla.', 'durante tres años después de alcanzada aquélla.'],
  'Al llegar a la mayoría de edad sólo podrá ejercitar la acción el contrayente menor, salvo que los cónyuges hubieren vivido juntos durante un año después de alcanzada aquélla', 'Un año de convivencia.');
q(CC, 'art. 85', 'Disolución del matrimonio', 'El matrimonio se disuelve, sea cual fuere la forma y el tiempo de su celebración, por:',
  ['la muerte o la declaración de fallecimiento de uno de los cónyuges y por el divorcio.', 'la muerte de uno de los cónyuges, la separación y el divorcio.', 'la muerte o la declaración de ausencia de uno de los cónyuges y por el divorcio.', 'la muerte de uno de los cónyuges y la nulidad.'],
  'El matrimonio se disuelve, sea cual fuere la forma y el tiempo de su celebración, por la muerte o la declaración de fallecimiento de uno de los cónyuges y por el divorcio', 'Muerte, declaración de fallecimiento y divorcio.');
q(CC, 'art. 90.1', 'Convenio regulador', 'El convenio regulador a que se refieren los artículos que regulan la separación y el divorcio deberá contener, al menos y siempre que fueran aplicables, los siguientes extremos. Señale la INCORRECTA:',
  ['La designación del administrador de los bienes de los hijos.', 'El cuidado de los hijos sujetos a la patria potestad de ambos.', 'La atribución del uso de la vivienda y ajuar familiar.', 'La liquidación, cuando proceda, del régimen económico del matrimonio.'],
  'El cuidado de los hijos sujetos a la patria potestad de ambos (…) La atribución del uso de la vivienda y ajuar familiar (…) La liquidación, cuando proceda, del régimen económico del matrimonio', 'El administrador de los bienes de los hijos no es contenido del convenio.');
q(CC, 'art. 90.1.a)', 'Convenio regulador', 'El convenio regulador deberá contener, entre otros extremos, el cuidado de los hijos sujetos a la patria potestad de ambos, el ejercicio de ésta y, en su caso:',
  ['el régimen de comunicación y estancia de los hijos con el progenitor que no viva habitualmente con ellos.', 'el régimen de visitas de los hermanos del cónyuge.', 'la pensión alimenticia de los abuelos.', 'el reparto de los gastos de educación por mitades.'],
  'a) El cuidado de los hijos sujetos a la patria potestad de ambos, el ejercicio de ésta y, en su caso, el régimen de comunicación y estancia de los hijos con el progenitor que no viva habitualmente con ellos', 'Régimen de comunicación y estancia con el otro progenitor.');
q(CC, 'art. 90.1.e)', 'Convenio regulador', 'Entre los extremos que ha de contener el convenio regulador figura la liquidación, cuando proceda:',
  ['del régimen económico del matrimonio.', 'de la vivienda familiar.', 'de las deudas de los hijos.', 'de la pensión compensatoria.'],
  'e) La liquidación, cuando proceda, del régimen económico del matrimonio', 'La liquidación del régimen económico matrimonial.');
q(CC, 'art. 90.2', 'Convenio regulador', 'Los acuerdos de los cónyuges adoptados para regular las consecuencias de la nulidad, separación y divorcio presentados ante el órgano judicial serán aprobados por el juez salvo si son:',
  ['dañosos para los hijos o gravemente perjudiciales para uno de los cónyuges.', 'contrarios al orden público o gravemente perjudiciales para los hijos.', 'perjudiciales para los hijos o para cualquiera de los cónyuges.', 'dañosos para los hijos o contrarios a la moral.'],
  'serán aprobados por el juez salvo si son dañosos para los hijos o gravemente perjudiciales para uno de los cónyuges', 'Dañosos para los hijos o gravemente perjudiciales para un cónyuge.');
q(CC, 'art. 94', 'Régimen de visitas', 'No procederá en ningún caso el establecimiento de un régimen de visitas respecto del progenitor en situación de prisión, provisional o por sentencia firme, acordada en procedimiento penal por:',
  ['los delitos de atentar contra la vida, la integridad física, la libertad, la integridad moral o la libertad e indemnidad sexual del otro cónyuge o sus hijos.', 'cualquier delito castigado con pena superior a un año.', 'los delitos contra el patrimonio del otro cónyuge.', 'los delitos de impago de alimentos.'],
  'No procederá en ningún caso el establecimiento de un régimen de visitas respecto del progenitor en situación de prisión, provisional o por sentencia firme, acordada en procedimiento penal por los delitos previstos en el párrafo anterior', 'Solo por los delitos del párrafo anterior.');
q(CC, 'art. 97', 'Compensación por desequilibrio', 'El cónyuge al que la separación o el divorcio produzca un desequilibrio económico en relación con la posición del otro, que implique un empeoramiento en su situación anterior en el matrimonio, tendrá derecho a una compensación que podrá consistir en:',
  ['una pensión temporal o por tiempo indefinido, o en una prestación única, según se determine en el convenio regulador o en la sentencia.', 'una pensión por tiempo indefinido, exclusivamente.', 'una pensión temporal que no podrá exceder de cinco años.', 'una renta vitalicia o el usufructo de bienes.'],
  'tendrá derecho a una compensación que podrá consistir en una pensión temporal o por tiempo indefinido, o en una prestación única, según se determine en el convenio regulador o en la sentencia', 'Pensión temporal, indefinida o prestación única.');
q(CC, 'art. 102', 'Efectos de la admisión de la demanda', 'Admitida la demanda de nulidad, separación o divorcio, cualquiera de las partes podrá instar la oportuna anotación:',
  ['en el Registro Civil y, en su caso, en los de la Propiedad y Mercantil.', 'en el Registro de la Propiedad exclusivamente.', 'en el Registro Civil y en el Registro Mercantil, exclusivamente.', 'en el Registro Civil, previa autorización judicial.'],
  'cualquiera de las partes podrá instar la oportuna anotación en el Registro Civil y, en su caso, en los de la Propiedad y Mercantil', 'Registro Civil y, en su caso, Propiedad y Mercantil.');
q(CC, 'art. 103', 'Medidas provisionales', 'Admitida la demanda, el Juez, a falta de acuerdo de ambos cónyuges aprobado judicialmente, adoptará las medidas provisionales:',
  ['con audiencia de éstos.', 'con audiencia de los hijos.', 'con informe del Ministerio Fiscal.', 'con audiencia de los hijos y de los abuelos.'],
  'Admitida la demanda, el Juez, a falta de acuerdo de ambos cónyuges aprobado judicialmente, adoptará, con audiencia de éstos, las medidas siguientes', 'Con audiencia de los cónyuges.');
q(CC, 'art. 104', 'Medidas previas', 'El cónyuge que se proponga demandar la nulidad, separación o divorcio de su matrimonio puede solicitar los efectos y medidas provisionales. Estos efectos y medidas sólo subsistirán si, dentro de los treinta días siguientes a contar desde que fueron inicialmente adoptados:',
  ['se presenta la demanda ante el Juez o Tribunal competente.', 'se inscriben en el Registro Civil.', 'se notifican a los hijos mayores de doce años.', 'se ratifican ante el letrado de la Administración de Justicia.'],
  'Estos efectos y medidas sólo subsistirán si, dentro de los treinta días siguientes a contar desde que fueron inicialmente adoptados, se presenta la demanda ante el Juez o Tribunal competente', 'Hay que presentar la demanda en treinta días.');
q(CC, 'art. 107.2', 'Ley aplicable', 'La separación y el divorcio legal se regirán por:',
  ['las normas de la Unión Europea o españolas de Derecho internacional privado.', 'la ley aplicable a la celebración del matrimonio.', 'la ley personal de ambos cónyuges.', 'la ley del lugar de celebración del matrimonio.'],
  'La separación y el divorcio legal se regirán por las normas de la Unión Europea o españolas de Derecho internacional privado', 'Normas de la UE o españolas de DIPr.');
q(CC, 'art. 109', 'Apellidos', 'Si la filiación está determinada por ambas líneas, los progenitores de común acuerdo podrán decidir el orden de transmisión de su respectivo primer apellido, antes de la inscripción registral. Si no se ejercita esta opción:',
  ['regirá lo dispuesto en la ley.', 'decidirá el Encargado del Registro Civil.', 'se aplicará el orden alfabético de apellidos.', 'prevalecerá el apellido paterno.'],
  'Si no se ejercita esta opción, regirá lo dispuesto en la ley', 'Rige lo dispuesto en la ley.');
q(CC, 'art. 110', 'Deberes de los progenitores', 'Aunque no ostenten la patria potestad, ambos progenitores están obligados a:',
  ['velar por los hijos menores y a prestarles alimentos.', 'representar a los hijos menores y administrar sus bienes.', 'prestar alimentos a los hijos, pero no velar por ellos.', 'velar por los hijos menores, salvo que hayan sido privados de la patria potestad.'],
  'Aunque no ostenten la patria potestad, ambos progenitores están obligados a velar por los hijos menores y a prestarles alimentos', 'Velar por los hijos y prestarles alimentos.');
q(CC, 'art. 111', 'Exclusión de la patria potestad', 'Aun excluido el progenitor de la patria potestad y demás funciones tuitivas, quedarán siempre a salvo:',
  ['las obligaciones de velar por los hijos y prestarles alimentos.', 'los derechos hereditarios del progenitor.', 'las funciones tuitivas respecto de los hijos.', 'el derecho de visitas.'],
  'Quedarán siempre a salvo las obligaciones de velar por los hijos y prestarles alimentos', 'Subsisten las obligaciones de velar y de alimentos.');
q(CC, 'art. 142', 'Alimentos', 'Se entiende por alimentos todo lo que es indispensable para:',
  ['el sustento, habitación, vestido y asistencia médica.', 'el sustento, habitación, vestido y educación.', 'el sustento, vestido, transporte y asistencia médica.', 'el sustento, habitación, vestido y ocio.'],
  'Se entiende por alimentos todo lo que es indispensable para el sustento, habitación, vestido y asistencia médica', 'Sustento, habitación, vestido y asistencia médica.');
q(CC, 'art. 143', 'Obligados a dar alimentos', 'Están obligados recíprocamente a darse alimentos en toda la extensión que señala el Código:',
  ['los cónyuges y los ascendientes y descendientes.', 'los cónyuges, los ascendientes, los descendientes y los hermanos.', 'los cónyuges y los descendientes, exclusivamente.', 'los ascendientes y descendientes y los hermanos.'],
  'Están obligados recíprocamente a darse alimentos en toda la extensión que señala el artículo precedente: 1.° Los cónyuges. 2.° Los ascendientes y descendientes', 'Cónyuges, ascendientes y descendientes.');
q(CC, 'art. 143', 'Obligados a dar alimentos', 'Los hermanos sólo se deben los auxilios necesarios para la vida, cuando los necesiten por cualquier causa que no sea imputable al alimentista, y se extenderán en su caso a:',
  ['los que precisen para su educación.', 'los que precisen para su vivienda.', 'los que precisen para su asistencia sanitaria.', 'los que precisen para su formación profesional.'],
  'se extenderán en su caso a los que precisen para su educación', 'Se extienden a la educación.');
q(CC, 'art. 144', 'Orden de reclamación', 'La reclamación de alimentos cuando proceda y sean dos o más los obligados a prestarlos se hará por el orden siguiente:',
  ['al cónyuge, a los descendientes de grado más próximo, a los ascendientes también de grado más próximo y a los hermanos.', 'a los descendientes, al cónyuge, a los ascendientes y a los hermanos.', 'al cónyuge, a los ascendientes, a los descendientes y a los hermanos.', 'a los ascendientes, a los descendientes, al cónyuge y a los hermanos.'],
  '1.° Al cónyuge. 2.° A los descendientes de grado más próximo. 3.° A los ascendientes, también de grado más próximo. 4.° A los hermanos', 'Cónyuge, descendientes, ascendientes y hermanos.');
q(CC, 'art. 144', 'Orden de reclamación', 'En la reclamación de alimentos, después del cónyuge y de los descendientes de grado más próximo se reclamará:',
  ['a los ascendientes, también de grado más próximo.', 'a los hermanos.', 'a los ascendientes de cualquier grado.', 'a los parientes colaterales.'],
  '3.º A los ascendientes, también de grado más próximo', 'En tercer lugar, los ascendientes de grado más próximo.');
q(CC, 'art. 148', 'Exigibilidad de los alimentos', 'La obligación de dar alimentos será exigible desde que los necesitare, para subsistir, la persona que tenga derecho a percibirlos, pero no se abonarán sino:',
  ['desde la fecha en que se interponga la demanda.', 'desde la fecha en que se dicte sentencia.', 'desde que el obligado sea requerido de pago.', 'desde que la persona tenga derecho a percibirlos.'],
  'La obligación de dar alimentos será exigible desde que los necesitare, para subsistir, la persona que tenga derecho a percibirlos, pero no se abonarán sino desde la fecha en que se interponga la demanda', 'Desde la interposición de la demanda.');
q(CC, 'art. 150', 'Cese de la obligación de alimentos', 'La obligación de suministrar alimentos cesa con la muerte del obligado:',
  ['aunque los prestase en cumplimiento de una sentencia firme.', 'salvo que los prestase en cumplimiento de una sentencia firme.', 'salvo que existan herederos forzosos.', 'transcurridos seis meses desde su fallecimiento.'],
  'La obligación de suministrar alimentos cesa con la muerte del obligado, aunque los prestase en cumplimiento de una sentencia firme', 'Cesa aunque exista sentencia firme.');
q(CC, 'art. 151', 'Alimentos: irrenunciabilidad', 'No es renunciable ni transmisible a un tercero el derecho a los alimentos. Tampoco pueden compensarse:',
  ['con lo que el alimentista deba al que ha de prestarlos.', 'con las pensiones atrasadas.', 'con los gastos que el obligado haya anticipado.', 'con lo que el obligado deba a un tercero.'],
  'Tampoco pueden compensarse con lo que el alimentista deba al que ha de prestarlos', 'No se compensan con lo que el alimentista deba al obligado.');
q(CC, 'art. 152.2', 'Cese de la obligación de alimentos', 'Cesará la obligación de dar alimentos cuando la fortuna del obligado a darlos se hubiere reducido:',
  ['hasta el punto de no poder satisfacerlos sin desatender sus propias necesidades y las de su familia.', 'por debajo del salario mínimo interprofesional.', 'en más de la mitad de su valor.', 'hasta el punto de no poder constituir garantías.'],
  'Cuando la fortuna del obligado a darlos se hubiere reducido hasta el punto de no poder satisfacerlos sin desatender sus propias necesidades y las de su familia', 'Hasta no poder satisfacerlos sin desatender sus necesidades y las de su familia.');
q(CC, 'art. 154', 'Patria potestad', 'Los hijos e hijas no emancipados están:',
  ['bajo la patria potestad de los progenitores.', 'bajo la tutela de los progenitores.', 'bajo la guarda de los progenitores, sin patria potestad.', 'bajo la representación legal del Ministerio Fiscal.'],
  'Los hijos e hijas no emancipados están bajo la patria potestad de los progenitores', 'Bajo la patria potestad de los progenitores.');
q(CC, 'art. 154.3.º', 'Patria potestad', 'La patria potestad comprende decidir el lugar de residencia habitual de la persona menor de edad, que solo podrá ser modificado:',
  ['con el consentimiento de ambos progenitores o, en su defecto, por autorización judicial.', 'con el consentimiento del progenitor que ejerza la guarda.', 'con autorización del Ministerio Fiscal.', 'con el consentimiento del menor mayor de doce años.'],
  'Decidir el lugar de residencia habitual de la persona menor de edad, que solo podrá ser modificado con el consentimiento de ambos progenitores o, en su defecto, por autorización judicial', 'Consentimiento de ambos o autorización judicial.');
q(CC, 'art. 156', 'Ejercicio de la patria potestad', 'La patria potestad se ejercerá conjuntamente por ambos progenitores o por uno solo con el consentimiento expreso o tácito del otro. Serán válidos los actos que realice uno de ellos conforme al uso social y a las circunstancias o en situaciones de:',
  ['urgente necesidad.', 'riesgo para el menor.', 'ausencia del otro progenitor.', 'conflicto de intereses.'],
  'Serán válidos los actos que realice uno de ellos conforme al uso social y a las circunstancias o en situaciones de urgente necesidad', 'Urgente necesidad.');
q(CC, 'art. 156', 'Ejercicio de la patria potestad', 'Dictada una sentencia condenatoria y mientras no se extinga la responsabilidad penal o iniciado un procedimiento penal contra uno de los progenitores por atentar contra la vida, la integridad física, la libertad, la integridad moral o la libertad e indemnidad sexual de los hijos o hijas comunes menores de edad, o por atentar contra el otro progenitor, bastará el consentimiento de este para:',
  ['la atención y asistencia psicológica de los hijos e hijas menores de edad, debiendo el primero ser informado previamente.', 'la atención y asistencia médica urgente de los hijos, sin informar al primero.', 'cualquier decisión sobre la educación de los hijos menores.', 'el cambio de residencia de los hijos, previa información al Fiscal.'],
  'bastará el consentimiento de este para la atención y asistencia psicológica de los hijos e hijas menores de edad, debiendo el primero ser informado previamente', 'Solo para la asistencia psicológica, informando al otro.');
q(CC, 'art. 159', 'Guarda de los hijos', 'Si los padres viven separados y no decidieren de común acuerdo, el Juez decidirá, siempre en beneficio de los hijos, al cuidado de qué progenitor quedarán los hijos menores de edad. El Juez oirá, antes de tomar esta medida, a los hijos que tuvieran suficiente juicio y, en todo caso, a los que fueran mayores de:',
  ['doce años.', 'catorce años.', 'dieciséis años.', 'diez años.'],
  'El Juez oirá, antes de tomar esta medida, a los hijos que tuvieran suficiente juicio y, en todo caso, a los que fueran mayores de doce años', 'Mayores de doce años.');
q(CC, 'art. 162', 'Representación legal de los hijos', 'Los padres que ostenten la patria potestad tienen la representación legal de:',
  ['sus hijos menores no emancipados.', 'sus hijos menores de dieciséis años.', 'sus hijos menores, aunque estén emancipados.', 'sus hijos, mientras convivan con ellos.'],
  'Los padres que ostenten la patria potestad tienen la representación legal de sus hijos menores no emancipados', 'Hijos menores no emancipados.');
q(CC, 'art. 162.1.º', 'Representación legal de los hijos', 'Se exceptúan de la representación legal de los padres los actos relativos a los derechos de la personalidad que el hijo, de acuerdo con su madurez:',
  ['pueda ejercitar por sí mismo.', 'pueda ejercitar con asistencia del Fiscal.', 'pueda ejercitar con autorización judicial.', 'pueda ejercitar a partir de los dieciséis años.'],
  '1.º Los actos relativos a los derechos de la personalidad que el hijo, de acuerdo con su madurez, pueda ejercitar por sí mismo', 'Los que el hijo pueda ejercitar por sí mismo.');
q(CC, 'art. 163', 'Conflicto de intereses', 'Siempre que en algún asunto los progenitores tengan un interés opuesto al de sus hijos no emancipados, se nombrará a éstos:',
  ['un defensor que los represente en juicio y fuera de él.', 'un tutor ordinario que los represente en juicio.', 'un defensor que los represente solo en juicio.', 'un administrador judicial de sus bienes.'],
  'se nombrará a éstos un defensor que los represente en juicio y fuera de él', 'Un defensor que los represente en juicio y fuera de él.');
q(CC, 'art. 164', 'Administración de los bienes de los hijos', 'Los padres administrarán los bienes de los hijos con la misma diligencia que los suyos propios, cumpliendo las obligaciones generales de todo administrador y las especiales establecidas en:',
  ['la Ley Hipotecaria.', 'la Ley de Enjuiciamiento Civil.', 'la Ley del Notariado.', 'la Ley del Registro Civil.'],
  'cumpliendo las obligaciones generales de todo administrador y las especiales establecidas en la Ley Hipotecaria', 'La Ley Hipotecaria.');
q(CC, 'art. 164.3', 'Administración de los bienes de los hijos', 'Se exceptúan de la administración paterna los bienes que el hijo mayor de dieciséis años hubiera adquirido con su trabajo o industria. Los actos de administración ordinaria serán realizados por el hijo, que necesitará:',
  ['el consentimiento de los padres para los que excedan de ella.', 'la autorización judicial para los que excedan de ella.', 'la asistencia del Ministerio Fiscal en todo caso.', 'el consentimiento de ambos progenitores y del Juez.'],
  'Los que el hijo mayor de dieciséis años hubiera adquirido con su trabajo o industria. Los actos de administración ordinaria serán realizados por el hijo, que necesitará el consentimiento de los padres para los que excedan de ella', 'Consentimiento de los padres para lo que exceda de la administración ordinaria.');
q(CC, 'art. 166', 'Disposición de bienes de los hijos', 'No será necesaria autorización judicial para disponer de bienes del hijo si el menor hubiese cumplido dieciséis años y consintiere en documento público, ni para la enajenación de valores mobiliarios siempre que:',
  ['su importe se reinvierta en bienes o valores seguros.', 'su valor no exceda del límite fijado por el Juez.', 'el hijo sea mayor de doce años.', 'se cuente con informe del Ministerio Fiscal.'],
  'ni para la enajenación de valores mobiliarios siempre que su importe se reinvierta en bienes o valores seguros', 'El importe debe reinvertirse en bienes o valores seguros.');
q(CC, 'art. 169', 'Extinción de la patria potestad', 'La patria potestad se acaba por la muerte o la declaración de fallecimiento de los padres o del hijo, por la emancipación y:',
  ['por la adopción del hijo.', 'por contraer matrimonio el hijo.', 'por cumplir el hijo los dieciséis años.', 'por la privación judicial.'],
  'La patria potestad se acaba: 1.° Por la muerte o la declaración de fallecimiento de los padres o del hijo. 2.° Por la emancipación. 3.° Por la adopción del hijo', 'Por la adopción del hijo.');
q(CC, 'art. 172 ter.2', 'Guarda: interés del menor', 'En la guarda se buscará siempre el interés del menor y se priorizará, cuando no sea contrario a ese interés, su reintegración en la propia familia y que la guarda de los hermanos se confíe a una misma institución o persona para que permanezcan unidos. La situación del menor en relación con su familia de origen será revisada:',
  ['al menos cada seis meses.', 'al menos cada año.', 'al menos cada tres meses.', 'al menos cada dos años.'],
  'La situación del menor en relación con su familia de origen, tanto en lo que se refiere a su guarda como al régimen de visitas y otras formas de comunicación, será revisada, al menos cada seis meses', 'Al menos cada seis meses.');
q(CC, 'art. 173.4', 'Cese del acogimiento familiar', 'El acogimiento familiar del menor cesará por resolución judicial, por resolución de la Entidad Pública, por la muerte o declaración de fallecimiento del acogedor o acogedores del menor y:',
  ['por la mayoría de edad del menor.', 'por el cumplimiento de los dieciséis años del menor.', 'por la solicitud de los progenitores.', 'por el transcurso de dos años.'],
  'd) Por la mayoría de edad del menor', 'Por la mayoría de edad del menor.');
q(CC, 'art. 173 bis.2', 'Modalidades de acogimiento', 'El acogimiento familiar podrá adoptar las siguientes modalidades atendiendo a su duración y objetivos:',
  ['acogimiento familiar de urgencia, temporal y permanente.', 'acogimiento familiar de urgencia, preadoptivo y permanente.', 'acogimiento familiar temporal, permanente y residencial.', 'acogimiento familiar de urgencia, especializado y permanente.'],
  'El acogimiento familiar podrá adoptar las siguientes modalidades atendiendo a su duración y objetivos (…) Acogimiento familiar de urgencia (…) Acogimiento familiar temporal (…) Acogimiento familiar permanente', 'Urgencia, temporal y permanente.');
q(CC, 'art. 173 bis.2.b)', 'Modalidades de acogimiento', 'El acogimiento familiar temporal tendrá una duración máxima de:',
  ['dos años, salvo que el interés superior del menor aconseje la prórroga.', 'seis meses, salvo prórroga.', 'un año, sin posibilidad de prórroga.', 'tres años, prorrogables por otros dos.'],
  'Este acogimiento tendrá una duración máxima de dos años, salvo que el interés superior del menor aconseje la prórroga de la medida', 'Dos años, prorrogables por el interés superior del menor.');
q(CC, 'art. 175.3', 'Adopción: prohibiciones', 'No puede adoptarse:',
  ['a un descendiente, a un pariente en segundo grado de la línea colateral por consanguinidad o afinidad y a un pupilo por su tutor hasta que haya sido aprobada definitivamente la cuenta general justificada de la tutela.', 'a un descendiente, a un pariente en tercer grado de la línea colateral y a un pupilo por su tutor en todo caso.', 'a un ascendiente, a un pariente en segundo grado de la línea colateral y a un pupilo por su tutor.', 'a un descendiente y a un pariente en segundo grado, pero sí a un pupilo por su tutor.'],
  'No puede adoptarse: 1.º A un descendiente. 2.º A un pariente en segundo grado de la línea colateral por consanguinidad o afinidad. 3.º A un pupilo por su tutor hasta que haya sido aprobada definitivamente la cuenta general justificada de la tutela', 'Descendiente, pariente colateral de segundo grado y pupilo por su tutor hasta la aprobación de cuentas.');
q(CC, 'art. 176.3', 'Adopción: idoneidad', 'Se entiende por idoneidad la capacidad, aptitud y motivación adecuadas para ejercer la responsabilidad parental, atendiendo a las necesidades de los menores a adoptar, y para asumir:',
  ['las peculiaridades, consecuencias y responsabilidades que conlleva la adopción.', 'las obligaciones económicas que conlleva la adopción.', 'los deberes de tutela que impone la ley.', 'las funciones de guarda con fines de adopción.'],
  'y para asumir las peculiaridades, consecuencias y responsabilidades que conlleva la adopción', 'Peculiaridades, consecuencias y responsabilidades de la adopción.');
q(CC, 'art. 177.1', 'Consentimiento en la adopción', 'Habrán de consentir la adopción, en presencia del Juez:',
  ['el adoptante o adoptantes y el adoptando mayor de doce años.', 'el adoptante o adoptantes y el adoptando mayor de catorce años.', 'el adoptante o adoptantes y los progenitores del adoptando.', 'los progenitores del adoptando y el adoptando mayor de doce años.'],
  'Habrán de consentir la adopción, en presencia del Juez, el adoptante o adoptantes y el adoptando mayor de doce años', 'Adoptantes y adoptando mayor de doce años.');
q(CC, 'art. 177.2', 'Asentimiento en la adopción', 'El asentimiento de la madre a la adopción no podrá prestarse:',
  ['hasta que hayan transcurrido seis semanas desde el parto.', 'hasta que hayan transcurrido treinta días desde el parto.', 'hasta que hayan transcurrido dos meses desde el parto.', 'antes del alta hospitalaria.'],
  'El asentimiento de la madre no podrá prestarse hasta que hayan transcurrido seis semanas desde el parto', 'Seis semanas desde el parto.');
q(CC, 'art. 177.3', 'Audiencia en la adopción', 'En la adopción deberán ser oídos por el Juez los progenitores que no hayan sido privados de la patria potestad, cuando su asentimiento no fuera necesario; el tutor y, en su caso, la familia acogedora, y el guardador o guardadores; y:',
  ['el adoptando menor de doce años de acuerdo con su edad y madurez.', 'el adoptando mayor de dieciséis años.', 'los hermanos del adoptando.', 'el Ministerio Fiscal.'],
  '3.º El adoptando menor de doce años de acuerdo con su edad y madurez', 'El adoptando menor de doce años, según su edad y madurez.');
q(CC, 'art. 180.1', 'Extinción de la adopción', 'La adopción es:',
  ['irrevocable.', 'revocable por el Juez a petición del adoptado.', 'revocable por acuerdo del adoptante y del adoptado.', 'irrevocable salvo petición del Ministerio Fiscal.'],
  'La adopción es irrevocable', 'Es irrevocable.');
q(CC, 'art. 180.5', 'Derecho a conocer los orígenes', 'Las Entidades Públicas asegurarán la conservación de la información relativa a los orígenes del menor, la identidad de sus progenitores y la historia médica del menor y de su familia, y se conservarán:',
  ['durante al menos cincuenta años con posterioridad al momento en que la adopción se haya hecho definitiva.', 'durante al menos treinta años desde que la adopción se constituya.', 'durante al menos veinte años desde que el adoptado cumpla la mayoría de edad.', 'indefinidamente.'],
  'se conservarán durante al menos cincuenta años con posterioridad al momento en que la adopción se haya hecho definitiva', 'Al menos cincuenta años desde que la adopción es definitiva.');

// ── Tutela y medidas de apoyo ──
q(CC, 'art. 199', 'Tutela: supuestos', 'Quedan sujetos a tutela los menores no emancipados en situación de desamparo y:',
  ['los menores no emancipados no sujetos a patria potestad.', 'los menores emancipados no sujetos a patria potestad.', 'los mayores con discapacidad que precisen apoyo.', 'los menores emancipados en situación de desamparo.'],
  'Quedan sujetos a tutela: 1.º Los menores no emancipados en situación de desamparo. 2.º Los menores no emancipados no sujetos a patria potestad', 'Menores no emancipados en desamparo o no sujetos a patria potestad.');
q(CC, 'art. 205', 'Tutela: administrador de bienes', 'El que disponga de bienes a título gratuito en favor de un menor podrá establecer las reglas de administración y disposición de los mismos y designar la persona o personas que hayan de ejercitarlas. Las funciones no conferidas al administrador corresponden:',
  ['al tutor.', 'al Ministerio Fiscal.', 'a la autoridad judicial.', 'al propio menor.'],
  'Las funciones no conferidas al administrador corresponden al tutor', 'Al tutor.');
q(CC, 'art. 213', 'Tutela: orden de preferencia', 'Para el nombramiento de tutor se preferirá, en primer lugar:',
  ['a la persona o personas designadas por los progenitores en testamento o documento público notarial.', 'al ascendiente o hermano que designe la autoridad judicial.', 'al pariente más próximo del menor.', 'a la persona que designe el Ministerio Fiscal.'],
  'Para el nombramiento de tutor se preferirá: 1.º A la persona o personas designadas por los progenitores en testamento o documento público notarial', 'En primer lugar, los designados por los progenitores.');
q(CC, 'art. 215', 'Tutela: hermanos', 'Si hubiere que designar tutor para varios hermanos:',
  ['se procurará que el nombramiento recaiga en una misma persona.', 'se nombrará un tutor para cada hermano.', 'se nombrará tutor al hermano mayor.', 'se nombrará a la Entidad Pública como tutora de todos.'],
  'Si hubiere que designar tutor para varios hermanos, se procurará que el nombramiento recaiga en una misma persona', 'Se procura una misma persona.');
q(CC, 'art. 220', 'Tutela: pluralidad de tutores', 'Si los tutores tuvieren sus facultades atribuidas conjuntamente y hubiere incompatibilidad u oposición de intereses en alguno de ellos para un acto o contrato:',
  ['podrá este ser realizado por el otro tutor o, de ser varios, por los demás en forma conjunta.', 'se nombrará un defensor judicial en todo caso.', 'se suspenderá el acto hasta que cese la incompatibilidad.', 'lo realizará el Ministerio Fiscal.'],
  'hubiere incompatibilidad u oposición de intereses en alguno de ellos para un acto o contrato, podrá este ser realizado por el otro tutor o, de ser varios, por los demás en forma conjunta', 'Lo realiza el otro tutor o los demás conjuntamente.');
q(CC, 'art. 223', 'Tutela: remoción', 'Las causas y procedimientos de remoción y excusa de la tutela serán los mismos que los establecidos para:',
  ['la curatela.', 'la guarda de hecho.', 'el defensor judicial.', 'el acogimiento.'],
  'Las causas y procedimientos de remoción y excusa de la tutela serán los mismos que los establecidos para la curatela', 'Los de la curatela.');
q(CC, 'art. 228', 'Tutela: obligaciones del tutor', 'El tutor está obligado a velar por el tutelado y, en particular:',
  ['a oír al menor antes de adoptar decisiones que le afecten.', 'a representarlo en todos los actos.', 'a administrar su patrimonio sin rendir cuentas.', 'a informar anualmente al Ministerio Fiscal.'],
  '6.º A oír al menor antes de adoptar decisiones que le afecten', 'Debe oír al menor antes de decidir.');
q(CC, 'art. 231', 'Tutela: extinción', 'La tutela se extingue, entre otras causas:',
  ['por la mayoría de edad, emancipación o concesión del beneficio de la mayoría de edad al menor.', 'por la mayoría de edad, pero no por la emancipación.', 'por la muerte del tutor.', 'por la declaración de ausencia del menor.'],
  'La tutela se extingue: 1.º Por la mayoría de edad, emancipación o concesión del beneficio de la mayoría de edad al menor', 'Por mayoría de edad, emancipación o beneficio de la mayoría de edad.');
q(CC, 'art. 235', 'Defensor judicial del menor', 'Se nombrará un defensor judicial del menor, entre otros casos:',
  ['cuando en algún asunto exista conflicto de intereses entre los menores y sus representantes legales, salvo en los casos en que la ley prevea otra forma de salvarlo.', 'cuando el menor cumpla los doce años y lo solicite.', 'cuando los progenitores se opongan a la guarda.', 'cuando el menor carezca de bienes.'],
  'Se nombrará un defensor judicial del menor en los casos siguientes: 1.º Cuando en algún asunto exista conflicto de intereses entre los menores y sus representantes legales, salvo en los casos en que la ley prevea otra forma de salvarlo', 'Conflicto de intereses con sus representantes legales.');
q(CC, 'art. 239', 'Emancipación', 'La emancipación tiene lugar:',
  ['por la mayor edad, por concesión de los que ejerzan la patria potestad y por concesión judicial.', 'por la mayor edad, por matrimonio y por concesión judicial.', 'por la mayor edad y por concesión de los que ejerzan la patria potestad.', 'por la mayor edad, por concesión del Ministerio Fiscal y por concesión judicial.'],
  'La emancipación tiene lugar: 1.º Por la mayor edad. 2.º Por concesión de los que ejerzan la patria potestad. 3.º Por concesión judicial', 'Mayoría de edad, concesión de los padres y concesión judicial.');
q(CC, 'art. 242', 'Emancipación', 'Concedida la emancipación:',
  ['no podrá ser revocada.', 'podrá ser revocada por los progenitores.', 'podrá ser revocada por el Juez.', 'podrá ser revocada en el plazo de un año.'],
  'Concedida la emancipación no podrá ser revocada', 'No podrá revocarse.');
q(CC, 'art. 243', 'Emancipación tácita', 'Se reputará para todos los efectos como emancipado al hijo mayor de dieciséis años que, con el consentimiento de los progenitores, viviere independientemente de estos. Los progenitores:',
  ['podrán revocar este consentimiento.', 'no podrán revocar este consentimiento.', 'podrán revocarlo previa autorización judicial.', 'podrán revocarlo en el plazo de seis meses.'],
  'Se reputará para todos los efectos como emancipado al hijo mayor de dieciséis años que, con el consentimiento de los progenitores, viviere independientemente de estos. Los progenitores podrán revocar este consentimiento', 'El consentimiento es revocable.');
q(CC, 'art. 249', 'Medidas de apoyo', 'Las medidas de apoyo a las personas mayores de edad o menores emancipadas que las precisen para el adecuado ejercicio de su capacidad jurídica tendrán por finalidad permitir:',
  ['el desarrollo pleno de su personalidad y su desenvolvimiento jurídico en condiciones de igualdad.', 'la protección de su patrimonio y su representación legal.', 'el ejercicio de su capacidad por medio de un representante.', 'la sustitución de su voluntad cuando no pueda expresarla.'],
  'tendrán por finalidad permitir el desarrollo pleno de su personalidad y su desenvolvimiento jurídico en condiciones de igualdad', 'Desarrollo pleno de la personalidad en condiciones de igualdad.');
q(CC, 'art. 250', 'Medidas de apoyo: clases', 'Las medidas de apoyo para el ejercicio de la capacidad jurídica de las personas que lo precisen son, además de las de naturaleza voluntaria:',
  ['la guarda de hecho, la curatela y el defensor judicial.', 'la tutela, la curatela y el defensor judicial.', 'la guarda de hecho, la tutela y la curatela.', 'la patria potestad prorrogada, la curatela y el defensor judicial.'],
  'son, además de las de naturaleza voluntaria, la guarda de hecho, la curatela y el defensor judicial', 'Guarda de hecho, curatela y defensor judicial.');
q(CC, 'art. 250', 'Medidas de apoyo: clases', 'La curatela es una medida formal de apoyo que se aplicará a quienes precisen el apoyo:',
  ['de modo continuado.', 'de modo ocasional.', 'de modo urgente.', 'de modo transitorio.'],
  'La curatela es una medida formal de apoyo que se aplicará a quienes precisen el apoyo de modo continuado', 'De modo continuado.');
q(CC, 'art. 251', 'Medidas de apoyo: prohibiciones', 'Se prohíbe a quien desempeñe alguna medida de apoyo:',
  ['recibir liberalidades de la persona que precisa el apoyo o de sus causahabientes, mientras que no se haya aprobado definitivamente su gestión, salvo regalos de costumbre o bienes de escaso valor.', 'recibir cualquier liberalidad de la persona que precisa el apoyo, sin excepción.', 'recibir regalos de costumbre de la persona que precisa el apoyo.', 'adquirir por título gratuito bienes de la persona que precisa el apoyo.'],
  'Recibir liberalidades de la persona que precisa el apoyo o de sus causahabientes, mientras que no se haya aprobado definitivamente su gestión, salvo que se trate de regalos de costumbre o bienes de escaso valor', 'Salvo regalos de costumbre o bienes de escaso valor.');
q(CC, 'art. 259', 'Poderes preventivos', 'Cuando el poder contenga cláusula de subsistencia para el caso de que el poderdante precise apoyo o se conceda solo para ese supuesto y, en ambos casos, comprenda todos los negocios del otorgante, el apoderado, sobrevenida la situación de necesidad de apoyo, quedará sujeto:',
  ['a las reglas aplicables a la curatela en todo aquello no previsto en el poder, salvo que el poderdante haya determinado otra cosa.', 'a las reglas de la tutela en todo aquello no previsto en el poder.', 'a las reglas de la guarda de hecho.', 'a las instrucciones del Ministerio Fiscal.'],
  'quedará sujeto a las reglas aplicables a la curatela en todo aquello no previsto en el poder, salvo que el poderdante haya determinado otra cosa', 'A las reglas de la curatela.');
q(CC, 'art. 264', 'Guarda de hecho', 'Cuando, excepcionalmente, se requiera la actuación representativa del guardador de hecho, este habrá de obtener la autorización para realizarla a través del correspondiente expediente de jurisdicción voluntaria, en el que se oirá:',
  ['a la persona con discapacidad.', 'al Ministerio Fiscal, exclusivamente.', 'a los familiares de la persona con discapacidad.', 'a la entidad pública competente.'],
  'este habrá de obtener la autorización para realizarla a través del correspondiente expediente de jurisdicción voluntaria, en el que se oirá a la persona con discapacidad', 'Se oye a la persona con discapacidad.');
q(CC, 'art. 267', 'Guarda de hecho: extinción', 'La guarda de hecho se extingue cuando la persona a quien se preste apoyo solicite que este se organice de otro modo, cuando desaparezcan las causas que la motivaron y:',
  ['cuando el guardador desista de su actuación, poniéndolo previamente en conocimiento de la entidad pública competente.', 'cuando transcurran dos años desde su constitución.', 'cuando el guardador cumpla sesenta y cinco años.', 'cuando lo solicite cualquier familiar.'],
  '3.º Cuando el guardador desista de su actuación, en cuyo caso deberá ponerlo previamente en conocimiento de la entidad pública que en el respectivo territorio tenga encomendada las funciones de promoción de la autonomía y asistencia a las personas con discapacidad', 'Desistimiento del guardador, previa comunicación a la entidad pública.');
q(CC, 'art. 269', 'Curatela: constitución', 'En ningún caso podrá incluir la resolución judicial por la que se constituye la curatela:',
  ['la mera privación de derechos.', 'la designación del curador.', 'las medidas de control.', 'la fijación de los actos representativos.'],
  'En ningún caso podrá incluir la resolución judicial la mera privación de derechos', 'La mera privación de derechos.');
q(CC, 'art. 275.2', 'Curatela: inhabilidad', 'No podrán ser curadores:',
  ['quienes hayan sido excluidos por la persona que precise apoyo, quienes estuvieran privados o suspendidos de la patria potestad o de los derechos de guarda y protección, y quienes hubieren sido legalmente removidos de una tutela, curatela o guarda anterior.', 'quienes sean menores de treinta años, quienes hayan sido removidos de una tutela anterior y quienes hayan prestado servicios a la persona que precise apoyo.', 'quienes tengan conflicto de intereses con la persona que precise apoyo, quienes hayan sido condenados por cualquier delito y quienes hayan sido administradores de su patrimonio.', 'quienes hayan sido condenados por cualquier delito, quienes hayan sido excluidos por la persona que precise apoyo y quienes sean parientes de ella en cuarto grado.'],
  'No podrán ser curadores: 1.º Quienes hayan sido excluidos por la persona que precise apoyo. 2.º Quienes por resolución judicial estuvieran privados o suspendidos en el ejercicio de la patria potestad o, total o parcialmente, de los derechos de guarda y protección. 3.º Quienes hubieren sido legalmente removidos de una tutela, curatela o guarda anterior', 'Excluidos, privados de la patria potestad y removidos.');
q(CC, 'art. 277', 'Curatela: pluralidad de curadores', 'Se puede proponer el nombramiento de más de un curador si la voluntad y necesidades de la persona que precisa el apoyo lo justifican. En particular, podrán separarse como cargos distintos:',
  ['los de curador de la persona y curador de los bienes.', 'los de curador y defensor judicial.', 'los de curador y guardador de hecho.', 'los de curador y tutor.'],
  'En particular, podrán separarse como cargos distintos los de curador de la persona y curador de los bienes', 'Curador de la persona y curador de los bienes.');
q(CC, 'art. 278', 'Curatela: remoción', 'Serán removidos de la curatela los que, después del nombramiento, incurran en una causa legal de inhabilidad, o se conduzcan mal en su desempeño por incumplimiento de los deberes propios del cargo, por notoria ineptitud de su ejercicio o cuando, en su caso, surgieran:',
  ['problemas de convivencia graves y continuados con la persona a la que prestan apoyo.', 'diferencias de criterio con el Ministerio Fiscal.', 'problemas económicos del curador.', 'discrepancias con los familiares de la persona.'],
  'o cuando, en su caso, surgieran problemas de convivencia graves y continuados con la persona a la que prestan apoyo', 'Problemas de convivencia graves y continuados.');
q(CC, 'art. 279', 'Curatela: excusa', 'Será excusable el desempeño de la curatela si resulta excesivamente gravoso o entraña grave dificultad para la persona nombrada para el ejercicio del cargo. También podrá excusarse el curador de continuar ejerciendo la curatela cuando:',
  ['durante su desempeño le sobrevengan los motivos de excusa.', 'cumpla sesenta y cinco años.', 'lo solicite la persona con discapacidad.', 'transcurran seis años de ejercicio.'],
  'También podrá excusarse el curador de continuar ejerciendo la curatela cuando durante su desempeño le sobrevengan los motivos de excusa', 'Cuando sobrevengan motivos de excusa.');
q(CC, 'art. 285', 'Curatela: inventario', 'El curador con facultades representativas estará obligado a hacer inventario del patrimonio de la persona en cuyo favor se ha establecido el apoyo dentro del plazo de:',
  ['sesenta días, a contar desde aquel en que hubiese tomado posesión de su cargo.', 'treinta días, a contar desde su nombramiento.', 'noventa días, a contar desde su nombramiento.', 'sesenta días, a contar desde su aceptación.'],
  'estará obligado a hacer inventario del patrimonio de la persona en cuyo favor se ha establecido el apoyo dentro del plazo de sesenta días, a contar desde aquel en que hubiese tomado posesión de su cargo', 'Sesenta días desde la toma de posesión.');
// ── cuatro cabeceras que quedaban (tutela, apoyos…) ──
require('../preguntas-marcas-lib.js')({ T: 10, fuentes: ['tema10/cc.txt'], desdeOf: 292, desdeIA: 1, Q,
  cola: [', salvo que la autoridad judicial disponga otra cosa', ', sin perjuicio de lo dispuesto en la legislación especial', ', previa audiencia del Ministerio Fiscal', ', conforme a lo establecido en el propio Código'] });
