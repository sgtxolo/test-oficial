// Cuadros visuales del Tema 6 (LO 4/2000 de extranjería y Ley 12/2009 de asilo).
// No hay escaneo del temario subrayado en esta sesión: son cuadros PROPIOS (árboles, columnas, flujos y tablas de plazos) con el
// TEXTO LITERAL del temario oficial (prompts/temario-limpio/tema6) y el subrayado por el método del usuario: lo que el examen pregunta
// en amarillo (Y), verbos de acción en naranja (D), órganos en verde (G, también por reglas-color.js), plazos y cifras en azul (P),
// coletillas «no / salvo / únicamente / en todo caso» con subrayado rojo (K), futuros en lila (automático).
// Cuando se disponga del temario subrayado escaneado, los cuadros que él tenga se recrean encima de estos (mismas claves).
// Se insertan en T6.lo / T6.l12 de esquemas.html tras su artículo (clave = «Artículo N — Rúbrica», única en el tema).
// También los usa expres-t6.js (module.exports = V).
// Uso: node prompts/herramientas/tema6/visuales-t6.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS6-->)
const fs = require('fs');
const L = require('../visuales-lib.js');
const { P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const V = []; const v = (tras, html) => V.push([tras, html]);

// ═════════ 6.1 · LEY ORGÁNICA 4/2000 ═════════
v('Artículo 2 — Exclusión del ámbito de la ley', arbol('Art. 2 · Quedan excluidos del ámbito de aplicación de la ley', `Quedan ${Y('excluidos')}`, [
  `a) Los ${Y('agentes diplomáticos y los funcionarios consulares')} acreditados en España, así como los demás miembros de las misiones diplomáticas permanentes o especiales y de las oficinas consulares y sus familiares que, en virtud de las normas del Derecho internacional, estén exentos de las obligaciones relativas a su ${Y('inscripción como extranjeros y a la obtención de la autorización de residencia')}.`,
  `b) Los ${Y('representantes, delegados y demás miembros de las Misiones permanentes o de las Delegaciones')} ante los Organismos intergubernamentales con sede en España o en Conferencias internacionales que se celebren en España, así como sus familiares.`,
  `c) Los ${Y('funcionarios destinados en Organizaciones internacionales o intergubernamentales')} con sede en España, así como sus familiares, a quienes los Tratados en los que sea parte España eximan de las obligaciones mencionadas en el párrafo a) de este artículo.`]));
v('Artículo 2 bis — La política inmigratoria', arbol('Art. 2 bis · Principios de la política inmigratoria (todas las Administraciones Públicas)', `Corresponde al ${G('Gobierno')} la definición, planificación, regulación y desarrollo de la política de inmigración, ${K('sin perjuicio')} de las competencias de las ${G('Comunidades Autónomas')} y ${G('Entidades Locales')}`, [
  'a) la coordinación con las políticas definidas por la Unión Europea;',
  `b) la ordenación de los flujos migratorios laborales, de acuerdo con las necesidades de la ${Y('situación nacional del empleo')};`,
  `c) la integración social de los inmigrantes mediante ${Y('políticas transversales')} dirigidas a toda la ciudadanía;`,
  'd) la igualdad efectiva entre mujeres y hombres;',
  'e) la efectividad del principio de no discriminación y, consecuentemente, el reconocimiento de iguales derechos y obligaciones para todos aquellos que vivan o trabajen legalmente en España, en los términos previstos en la Ley;',
  'f) la garantía del ejercicio de los derechos que la Constitución, los tratados internacionales y las leyes reconocen a todas las personas;',
  'g) la lucha contra la inmigración irregular y la persecución del tráfico ilícito de personas;',
  'h) la persecución de la trata de seres humanos;',
  'i) la igualdad de trato en las condiciones laborales y de Seguridad Social;',
  `j) la promoción del diálogo y la colaboración con los países de origen y tránsito de inmigración, mediante ${Y('acuerdos marco')} dirigidos a ordenar de manera efectiva los flujos migratorios, así como a fomentar y coordinar las iniciativas de cooperación al desarrollo y codesarrollo.`,
  `3. El ${G('Estado')} garantizará el ${Y('principio de solidaridad')}, consagrado en la Constitución, atendiendo a las especiales circunstancias de aquellos territorios en los que los flujos migratorios tengan una especial incidencia.`]));
v('Artículo 4 — Derecho a la documentación', plazos('Art. 4 · Tarjeta de identidad de extranjero', [
  [P('> 6 meses'), `Todos los extranjeros a los que se haya expedido un visado o una autorización para permanecer en España por un período ${Y('superior a seis meses')}, obtendrán la tarjeta de identidad de extranjero.`],
  [P('1 mes'), `Deberán solicitarla ${Y('personalmente')} en el plazo de ${P('un mes')} desde su entrada en España o desde que se conceda la autorización, respectivamente.`],
  [K('Excepción'), `Estarán ${K('exceptuados')} de dicha obligación los titulares de un ${Y('visado de residencia y trabajo de temporada')}.`],
  [P('≤ 6 meses'), `${Y('Reglamentariamente')} se desarrollarán los supuestos en que se podrá obtener dicha tarjeta cuando se haya concedido una autorización para permanecer en España por un periodo no superior a seis meses.`]]));
v('Artículo 17 — Familiares reagrupables', arbol('Art. 17 · Familiares reagrupables por el extranjero residente', 'El extranjero residente tiene derecho a reagrupar con él en España a:', [
  `a) El ${Y('cónyuge')} del residente, siempre que no se encuentre separado de hecho o de derecho, y que el matrimonio no se haya celebrado en fraude de ley. ${K('En ningún caso')} podrá reagruparse a ${Y('más de un cónyuge')} aunque la ley personal del extranjero admita esta modalidad matrimonial.`,
  `b) Los ${Y('hijos')} del residente y del cónyuge, incluidos los adoptados, siempre que sean ${P('menores de dieciocho años')} o personas con discapacidad que no sean objetivamente capaces de proveer a sus propias necesidades debido a su estado de salud.`,
  `c) Los ${P('menores de dieciocho años')} y los mayores de esa edad que no sean objetivamente capaces de proveer a sus propias necesidades, debido a su estado de salud, cuando el residente extranjero sea su ${Y('representante legal')}.`,
  `d) Los ${Y('ascendientes en primer grado')} del reagrupante y de su cónyuge cuando estén a su cargo, sean ${P('mayores de sesenta y cinco años')} y existan razones que justifiquen la necesidad de autorizar su residencia en España. ${K('Excepcionalmente')}, cuando concurran ${Y('razones de carácter humanitario')}, podrá reagruparse al ascendiente menor de sesenta y cinco años.`,
  `4. La persona que mantenga con el extranjero residente una ${Y('relación de afectividad análoga a la conyugal')} se equiparará al cónyuge. ${K('En todo caso')}, las situaciones de matrimonio y de análoga relación de afectividad se considerarán ${Y('incompatibles')} entre sí.`]));
v('Artículo 23 — Actos discriminatorios', arbol('Art. 23.2 · En cualquier caso, constituyen actos de discriminación', `Discriminación: acto que, directa o indirectamente, conlleve una distinción, exclusión, restricción o preferencia contra un extranjero basada en la ${Y('raza, el color, la ascendencia o el origen nacional o étnico, las convicciones y prácticas religiosas')}`, [
  `a) Los efectuados por la ${G('autoridad')} o funcionario público o personal encargado de un servicio público, que en el ejercicio de sus funciones, ${Y('por acción u omisión')}, realice cualquier acto discriminatorio prohibido por la ley.`,
  `b) Todos los que impongan condiciones más gravosas que a los españoles, o que impliquen ${Y('resistencia a facilitar')} a un extranjero ${Y('bienes o servicios ofrecidos al público')}.`,
  `c) Todos los que impongan ${Y('ilegítimamente')} condiciones más gravosas que a los españoles o restrinjan o limiten el acceso al trabajo, a la vivienda, a la educación, a la formación profesional y a los servicios sociales y socioasistenciales, al extranjero que se encuentre ${Y('regularmente')} en España.`,
  `d) Todos los que impidan, a través de acciones u omisiones, el ejercicio de una ${Y('actividad económica emprendida legítimamente')} por un extranjero residente legalmente en España.`,
  `e) Constituye ${Y('discriminación indirecta')} todo tratamiento derivado de la adopción de criterios que perjudiquen a los trabajadores por su condición de extranjeros o por pertenecer a una determinada raza, religión, etnia o nacionalidad.`]));
v('Artículo 25 bis — Tipos de visado', tabla('Art. 25 bis · Clases de visado', ['Visado', 'Habilita para…'], [
  { l: 'a) Tránsito', c: 'o', h: [{ t: `Transitar por la zona de tránsito internacional de un aeropuerto español o atravesar el territorio español. ${K('No')} será exigible en casos de tránsito a efectos de ${Y('repatriación o alejamiento por vía aérea')} solicitado por un Estado miembro de la UE o por un tercer estado con acuerdo con España.` }] },
  { l: 'b) Estancia', c: 'v', h: [{ p: P('3 meses / semestre'), c: 'o', t: 'Una estancia ininterrumpida o estancias sucesivas por un período o suma de períodos cuya duración total no exceda de tres meses por semestre a partir de la fecha de la primera entrada.' }] },
  { l: 'c) Residencia', c: 'c', h: [{ t: `Residir ${K('sin')} ejercer actividad laboral o profesional.` }] },
  { l: 'd) Residencia y trabajo', c: 'o', h: [{ p: P('máx. 3 meses'), c: 'v', t: `Entrada y estancia por un período máximo de tres meses y comienzo, en ese plazo, de la actividad; en este tiempo deberá producirse el ${Y('alta en la Seguridad Social')}, que dotará de eficacia a la autorización.` }] },
  { l: 'e) Residencia y trabajo de temporada', c: 'v', h: [{ p: P('9 meses / 12'), c: 'n', t: `Trabajar ${Y('por cuenta ajena')} hasta nueve meses en un período de doce meses consecutivos.` }] },
  { l: 'f) Estudios', c: 'c', h: [{ t: `Permanecer en España para cursos, estudios, trabajos de investigación o formación, intercambio de alumnos, prácticas no laborales o servicios de voluntariado, ${K('no remunerados laboralmente')}.` }] },
  { l: 'g) Investigación', c: 'o', h: [{ t: `Permanecer en España para realizar proyectos de investigación en el marco de un ${Y('convenio de acogida')} firmado con un organismo de investigación.` }] }]));
v('Artículo 28 — De la salida de España', arbol('Art. 28.3 · La salida será obligatoria en los siguientes supuestos', `Salidas ${Y('libres')}, excepto en los casos previstos en el Código Penal y en la Ley; ${K('excepcionalmente')}, el ${G('Ministro del Interior')} podrá prohibir la salida por razones de ${Y('seguridad nacional o de salud pública')} (expedientes ${K('siempre')} de carácter individual)`, [
  `a) Expulsión del territorio español por ${Y('orden judicial')}, en los casos previstos en el ${Y('Código Penal')}.`,
  `b) Expulsión o devolución acordadas por ${Y('resolución administrativa')} en los casos previstos en la presente Ley.`,
  `c) ${Y('Denegación administrativa')} de las solicitudes formuladas por el extranjero para continuar permaneciendo en territorio español, o falta de autorización para encontrarse en España.`,
  `d) Cumplimiento del plazo en el que un ${Y('trabajador')} extranjero se hubiera comprometido a regresar a su país de origen en el marco de un programa de ${Y('retorno voluntario')}.`]));
v('Artículo 30 — Situación de estancia', plazos('Art. 30 · Situación de estancia', [
  [P('≤ 90 días'), `Estancia es la permanencia en territorio español por un período de tiempo ${Y('no superior a 90 días')}, ${K('sin perjuicio')} del régimen de estudios, intercambio de alumnos, prácticas no laborales o voluntariado.`],
  [P('Después'), `Transcurrido dicho tiempo, será preciso obtener o una ${Y('prórroga de estancia')} o una ${Y('autorización de residencia')}.`],
  [P('3 meses / 6'), `Entrada ${Y('con visado')} de duración inferior a tres meses: se podrá prorrogar la estancia, que ${K('en ningún caso')} podrá ser superior a tres meses, en un período de seis meses.`],
  [P('> 3 meses'), `Entrada ${Y('sin visado')}: cuando concurran ${Y('circunstancias excepcionales')} que lo justifiquen, podrá autorizarse la estancia más allá de tres meses.`]]));
v('Artículo 31 — Situación de residencia temporal', plazos('Art. 31 · Residencia temporal', [
  [P('> 90 días y < 5 años'), `La residencia temporal es la situación que autoriza a permanecer en España por un período superior a 90 días e inferior a cinco años. Las autorizaciones de duración inferior a cinco años podrán ${Y('renovarse, a petición del interesado')}.`],
  [Y('Sin trabajo'), `Se concederá a los extranjeros que dispongan de ${Y('medios suficientes para sí y, en su caso, para los de su familia')}.`],
  [Y('Arraigo'), `Por situación de arraigo, razones humanitarias, de colaboración con la Justicia u otras circunstancias excepcionales: ${K('no será exigible el visado')}.`],
  [Y('Requisito'), `Carecer de ${Y('antecedentes penales')} en España o en los países anteriores de residencia, por delitos existentes en el ordenamiento español, y no figurar como rechazable en el espacio territorial de países con convenio.`],
  [Y('Obligación'), `Poner en conocimiento de las autoridades competentes los cambios de ${Y('nacionalidad, estado civil y domicilio')}.`],
  [Y('Renovación'), `Se valorará: a) los antecedentes penales (indultos, remisión condicional o suspensión de la pena); b) el incumplimiento de obligaciones tributarias y de seguridad social; y especialmente el ${Y('esfuerzo de integración')} (informe positivo de la ${G('Comunidad Autónoma')}).`]]));
v('Artículo 32 — Residencia de larga duración', arbol('Art. 32 · Residencia de larga duración', `Autoriza a residir y trabajar en España ${Y('indefinidamente')}, en las mismas condiciones que los españoles; derecho tras ${P('cinco años')} de residencia temporal ${Y('continuada')}. Extinción:`, [
  'a) Cuando la autorización se haya obtenido de manera fraudulenta.',
  'b) Cuando se dicte una orden de expulsión en los casos previstos en la Ley.',
  `c) Cuando se produzca la ausencia del territorio de la Unión Europea durante ${P('12 meses consecutivos')}.`,
  'd) Cuando se adquiera la residencia de larga duración en otro Estado miembro.',
  'e) Cuando, obtenida la autorización por la persona a quien otro Estado miembro reconoció protección internacional, las autoridades de dicho Estado hubieran resuelto el cese o la revocación de la citada protección.',
  `6. Recuperación mediante ${Y('procedimiento simplificado')}, sobre todo para quienes hayan residido en otro Estado miembro para la realización de estudios.`]));
v('Artículo 38 — Autorización de residencia y trabajo por cuenta ajena', arbol('Art. 38.6 · La autorización de residencia y trabajo se renovará a su expiración', `Concesión inicial: se tendrá en cuenta la ${Y('situación nacional de empleo')} (Catálogo de Ocupaciones de Difícil Cobertura, previa consulta de la ${G('Comisión Laboral Tripartita de Inmigración')}); limitada a un determinado ${Y('territorio y ocupación')}`, [
  'a) Cuando persista o se renueve el contrato de trabajo que motivó su concesión inicial, o cuando se cuente con un nuevo contrato.',
  `b) Cuando por la autoridad competente, conforme a la normativa de la Seguridad Social, se hubiera otorgado una ${Y('prestación contributiva por desempleo')}.`,
  `c) Cuando el extranjero sea beneficiario de una ${Y('prestación económica asistencial de carácter público')} destinada a lograr su inserción social o laboral.`,
  `d) Cuando concurran otras circunstancias previstas reglamentariamente, en particular, los supuestos de extinción del contrato de trabajo o suspensión de la relación laboral como consecuencia de ser ${Y('víctima de violencia de género')}.`,
  `7. A partir de la primera concesión, las autorizaciones se concederán ${K('sin limitación alguna')} de ámbito geográfico u ocupación.`]));
v('Artículo 40 — Supuestos específicos de exención de la situación nacional de empleo', arbol('Art. 40.1 · No se tendrá en cuenta la situación nacional de empleo cuando el contrato vaya dirigido a', 'Exención de la situación nacional de empleo', [
  `a) Familiares reagrupados en edad laboral, cónyuge o hijo de extranjero residente con autorización renovada, e hijo de español nacionalizado o de ciudadanos de la UE / EEE que lleven ${P('como mínimo, un año')} residiendo legalmente.`,
  'b) Los titulares de una autorización previa de trabajo que pretendan su renovación.',
  'c) Los trabajadores necesarios para el montaje por renovación de una instalación o equipos productivos.',
  `d) Los que hubieran gozado de la condición de refugiados, durante ${P('el año siguiente')} a la cesación de la aplicación de la Convención de Ginebra.`,
  `e) Los reconocidos como apátridas y los que hubieran perdido la condición de apátridas ${P('el año siguiente')} a la terminación de dicho estatuto.`,
  'f) Los extranjeros que tengan a su cargo ascendientes o descendientes de nacionalidad española.',
  `g) Los extranjeros ${Y('nacidos y residentes')} en España.`,
  `h) Los hijos o nietos de español ${Y('de origen')}.`,
  'i) Los menores extranjeros en edad laboral con autorización de residencia tutelados por la entidad de protección de menores, una vez acreditada la imposibilidad de retorno.',
  'j) Los que obtengan la autorización por circunstancias excepcionales y, en todo caso, las víctimas de violencia de género o de trata de seres humanos.',
  `k) Los titulares de autorizaciones de trabajo de temporada durante ${P('dos años naturales')} que hayan retornado a su país.`,
  'l) Los que hayan renunciado a su autorización de residencia y trabajo en virtud de un programa de retorno voluntario.',
  '2. Tampoco: puestos de confianza y directivos; profesionales altamente cualificados; trabajadores en plantilla de una empresa o grupo en otro país; artistas de reconocido prestigio.']));
v('Artículo 41 — Excepciones a la autorización de trabajo', arbol('Art. 41 · No será necesaria la obtención de autorización de trabajo para', `${K('No')} necesitan autorización de trabajo`, [
  'a) Técnicos y científicos extranjeros, invitados o contratados por el Estado, las comunidades autónomas, los entes locales o los organismos de investigación promovidos o participados mayoritariamente por éstos.',
  `b) Los profesores extranjeros invitados o contratados por una ${Y('universidad española')}.`,
  'c) Personal directivo y profesorado de instituciones culturales y docentes dependientes de otros Estados, o privadas, de acreditado prestigio, en tanto limiten su actividad a la ejecución de tales programas.',
  'd) Funcionarios civiles o militares de Administraciones estatales extranjeras que vengan a desarrollar actividades en virtud de acuerdos de cooperación con la Administración española.',
  `e) Corresponsales de medios de comunicación social extranjeros, ${Y('debidamente acreditados')}.`,
  `f) Miembros de misiones científicas internacionales, ${Y('autorizados por el Estado')}.`,
  `g) Artistas que vengan a realizar actuaciones concretas que ${K('no')} supongan una actividad continuada.`,
  `h) Ministros, religiosos o representantes de iglesias y confesiones ${Y('inscritas')}, en tanto limiten su actividad a funciones ${Y('estrictamente religiosas')}.`,
  `i) Miembros de los órganos de representación de ${Y('sindicatos')} homologados internacionalmente, limitados a funciones estrictamente sindicales.`,
  'j) Menores extranjeros en edad laboral tutelados, para actividades que favorezcan su integración social.']));
v('Artículo 48 — Cuantía de las tasas', arbol('Art. 48.3 · Elementos y criterios esenciales de cuantificación (solo modificables por norma del mismo rango)', `Importe por ${Y('Orden ministerial')}; las normas que lo fijen irán acompañadas de una ${Y('memoria económico-financiera')}`, [
  'a) Visado: gastos administrativos de tramitación, limitación de efectos del visado de tránsito aeroportuario, duración de la estancia, número de entradas, carácter de la residencia y, en su caso, expedición en frontera.',
  'b) Prórroga de estancia: la duración de la prórroga.',
  'c) Autorizaciones de residencia: duración, carácter definitivo o temporal y, dentro de estas, primera o ulteriores concesiones o renovaciones.',
  'd) Autorizaciones de trabajo: duración, extensión y ámbito, carácter y modalidades de la relación por cuenta ajena y, en su caso, importe del salario pactado.',
  'e) Tarjetas de identidad de extranjeros: duración de la autorización y primera o ulteriores concesiones o renovaciones; en todo caso, carácter individual o colectivo.',
  `4. Visados: se adecuarán al ${Y('derecho comunitario')} y se acomodarán al ${Y('principio de reciprocidad')}.`]));
v('Artículo 52 — Infracciones leves', arbol('Art. 52 · Infracciones LEVES (multa de hasta 500 euros)', `Son infracciones ${Y('leves')}`, [
  'a) La omisión o el retraso en la comunicación de los cambios de nacionalidad, de estado civil o de domicilio, y de otras circunstancias determinantes de su situación laboral.',
  `b) El retraso, ${P('hasta tres meses')}, en la solicitud de renovación de las autorizaciones una vez hayan caducado.`,
  `c) Encontrarse trabajando sin haber solicitado autorización para trabajar ${Y('por cuenta propia')}, cuando se cuente con autorización de residencia temporal.`,
  'd) Encontrarse trabajando en una ocupación, sector de actividad o ámbito geográfico no contemplado por la autorización de la que se es titular.',
  'e) La contratación de trabajadores cuya autorización no les habilita para esa ocupación o ámbito geográfico (una infracción por cada trabajador).',
  'f) La ausencia de comunicación, por las entidades de atención a menores extranjeros no acompañados, de la localización de estos menores.']));
v('Artículo 53 — Infracciones graves', arbol('Art. 53 · Infracciones GRAVES (multa de 501 hasta 10.000 euros)', `Son infracciones ${Y('graves')}`, [
  `1.a) Encontrarse ${Y('irregularmente')} en territorio español (sin prórroga de estancia, sin autorización de residencia o con ella caducada ${P('más de tres meses')} sin haber solicitado la renovación).`,
  `1.b) Encontrarse trabajando sin autorización de trabajo, cuando ${K('no')} cuente con autorización de residencia válida.`,
  '1.c) Ocultación dolosa o falsedad grave en la comunicación de cambios de nacionalidad, estado civil o domicilio, o en el alta en el padrón, siempre que no constituyan delito.',
  '1.d) El incumplimiento de las medidas impuestas por razón de seguridad pública, de presentación periódica o de alejamiento de fronteras o núcleos de población.',
  `1.e) La comisión de una ${Y('tercera infracción leve')}, si en ${P('un año')} hubiera sido sancionado por dos faltas leves de la misma naturaleza.`,
  '1.f) La participación en actividades contrarias al orden público previstas como graves en la LO de Protección de la Seguridad Ciudadana.',
  '1.g) Las salidas del territorio por puestos no habilitados, sin exhibir la documentación o contraviniendo las prohibiciones.',
  '1.h) Incumplir la obligación de solicitar la tarjeta de identidad de extranjero.',
  '2.a) No dar de alta en la Seguridad Social al trabajador cuya autorización se solicitó, o no registrar el contrato (exento el empresario que comunique razones sobrevenidas).',
  '2.b) Contraer matrimonio, simular relación afectiva o constituirse en representante legal de un menor con ánimo de lucro o para obtener indebidamente un derecho de residencia.',
  '2.c) Promover la permanencia irregular de un extranjero cuya entrada legal contó con una invitación expresa del infractor y continúe a su cargo.',
  `2.d) Consentir la inscripción en el Padrón en una vivienda que no sea el domicilio real del extranjero (${Y('una infracción por cada persona')}).`]));
v('Artículo 54 — Infracciones muy graves', arbol('Art. 54 · Infracciones MUY GRAVES (multa desde 10.001 hasta 100.000 euros)', `Son infracciones ${Y('muy graves')}`, [
  '1.a) Participar en actividades contrarias a la seguridad nacional o que puedan perjudicar las relaciones de España con otros países, o actividades contrarias al orden público previstas como muy graves.',
  `1.b) Inducir, promover, favorecer o facilitar ${Y('con ánimo de lucro')} la inmigración clandestina, siempre que el hecho ${K('no')} constituya delito.`,
  '1.c) La realización de conductas de discriminación por motivos raciales, étnicos, nacionales o religiosos, siempre que no constituya delito.',
  `1.d) La contratación de trabajadores extranjeros ${K('sin')} haber obtenido con carácter previo la autorización de residencia y trabajo (una infracción por cada trabajador).`,
  `1.e) Realizar, ${Y('con ánimo de lucro')}, la infracción de consentir la inscripción indebida en el Padrón.`,
  '1.f) Simular la relación laboral con un extranjero, con ánimo de lucro o para obtener indebidamente derechos.',
  `1.g) La comisión de una ${Y('tercera infracción grave')}, si en ${P('un año')} hubiera sido sancionado por dos faltas graves de la misma naturaleza.`,
  '2.a) El incumplimiento de las obligaciones de los transportistas de remitir información.',
  '2.b) El transporte de extranjeros sin comprobar la validez y vigencia de pasaportes, títulos de viaje o documentos de identidad y, en su caso, del visado.',
  '2.c) El incumplimiento de la obligación de los transportistas de hacerse cargo sin pérdida de tiempo del extranjero no autorizado a entrar.',
  `3. ${K('No')} es infracción transportar a la frontera a quien, habiendo presentado sin demora su solicitud de protección internacional, la vea ${Y('admitida a trámite')}.`]));
v('Artículo 55 — Sanciones', tabla('Art. 55 · Sanciones, órganos y criterios', ['Concepto', 'Regla'], [
  { l: 'Cuantías (55.1)', c: 'o', h: [
    { p: P('hasta 500 €'), c: 'o', t: 'Infracciones leves.' },
    { p: P('501 – 10.000 €'), c: 'v', t: 'Infracciones graves (en el 53.2.a, además, el empresario sufraga los costes del viaje).' },
    { p: P('10.001 – 100.000 €'), c: 'n', t: 'Infracciones muy graves.' },
    { p: P('5.000 – 10.000 € / viajero'), c: 'n', t: `Transporte sin comprobar documentación: por cada viajero o un mínimo de ${P('750.000 euros')} a tanto alzado.` },
    { p: P('10.001 – 100.000 € / viaje'), c: 'n', t: 'Falta de comunicación de datos de pasajeros: por cada viaje realizado.' }] },
  { l: 'Órganos (55.2)', c: 'v', h: [
    { t: `Regla general: ${G('Subdelegado del Gobierno')} o ${G('Delegado del Gobierno')} en las Comunidades Autónomas uniprovinciales.` },
    { t: `Infracciones laborales: se inician por acta de la ${G('Inspección de Trabajo y Seguridad Social')}.` },
    { t: `Seguridad nacional (54.1.a): ${G('Secretario de Estado de Seguridad')}.` }] },
  { l: 'Graduación y cuantía (55.3-4)', c: 'c', h: [
    { t: `Graduación: criterios de ${Y('proporcionalidad')}, grado de culpabilidad, daño o riesgo y su trascendencia.` },
    { t: `Cuantía: especialmente la ${Y('capacidad económica del infractor')}.` }] },
  { l: 'Otras medidas (55.5-7)', c: 'o', h: [
    { t: 'Decomiso de vehículos, embarcaciones, aeronaves y bienes en la inmigración clandestina (salvo de un tercero no responsable).' },
    { p: P('6 meses – 5 años'), c: 'v', t: 'Clausura del establecimiento o local en la contratación sin autorización.' },
    { t: `Responsabilidad ${Y('solidaria')} de contratistas y subcontratistas que conocieran la contratación sin autorización (salvo diligencia debida).` }] }]));
v('Artículo 56 — Prescripción de las infracciones y de las sanciones', cols('Art. 56 · Prescripción', [
  { t: 'INFRACCIONES', l: [`Muy graves: ${P('3 años')}`, `Graves: ${P('2 años')}`, `Leves: ${P('6 meses')}`] },
  { t: 'SANCIONES', l: [`Muy graves: ${P('5 años')}`, `Graves: ${P('2 años')}`, `Leves: ${P('1 año')}`] },
  { t: 'EXPULSIÓN', l: [`La prescripción ${K('no')} empezará a contar hasta que haya transcurrido el período de prohibición de entrada fijado en la resolución, con un máximo de ${P('diez años')}.`] }]));
v('Artículo 57 — Expulsión del territorio', arbol('Art. 57.5 · La expulsión no podrá imponerse (salvo 54.1.a o reincidencia en un año) a', `Expulsión ${K('en lugar')} de la multa (${K('nunca')} conjuntamente) por infracciones muy graves o graves del 53.1 a), b), c), d) y f); también por condena por delito doloso con pena ${P('superior a un año')}`, [
  `a) Los nacidos en España que hayan residido legalmente en los últimos ${P('cinco años')}.`,
  'b) Los residentes de larga duración (antes de expulsarlos se tendrán en cuenta el tiempo de residencia, los vínculos, la edad, las consecuencias para él y su familia y los vínculos con el país de destino).',
  'c) Los que hayan sido españoles de origen y hubieran perdido la nacionalidad española.',
  'd) Los beneficiarios de prestación por incapacidad permanente por accidente de trabajo o enfermedad profesional ocurridos en España, de prestación contributiva por desempleo o de prestación asistencial de inserción.',
  `Ni al cónyuge que haya residido legalmente ${P('más de dos años')}, ni a sus ascendientes e hijos a cargo.`,
  `6. ${K('No')} podrá ejecutarse si conculca el principio de ${Y('no devolución')} o afecta a mujeres embarazadas con riesgo para la gestación o la salud de la madre.`,
  `7. Procesado por delito con pena inferior a seis años: el Juez autoriza la expulsión en plazo ${P('no superior a tres días')}, previa audiencia del ${G('Ministerio Fiscal')}.`]));
v('Artículo 58 — Efectos de la expulsión y devolución', plazos('Art. 58 · Prohibición de entrada y devolución', [
  [P('≤ 5 años'), `La expulsión llevará consigo la prohibición de entrada; su vigencia ${K('no excederá')} de cinco años.`],
  [P('≤ 10 años'), `${K('Excepcionalmente')}, amenaza grave para el orden público, la seguridad pública, la seguridad nacional o la salud pública.`],
  [Y('Sin expediente'), 'Devolución: a) los que, habiendo sido expulsados, contravengan la prohibición de entrada; b) los que pretendan entrar ilegalmente en el país.'],
  [Y('Asilo'), `Si se formaliza una solicitud de protección internacional, ${K('no')} podrá devolverse hasta que se haya decidido su inadmisión a trámite; tampoco a mujeres embarazadas con riesgo.`],
  [P('72 horas'), `Si la devolución no se pudiera ejecutar en este plazo, se solicitará de la ${G('autoridad judicial')} el internamiento.`],
  [P('≤ 3 años'), 'Devolución por pretender entrar ilegalmente: prohibición de entrada por un plazo máximo de tres años (en el caso a), se reinicia el cómputo de la expulsión quebrantada).']]));
v('Artículo 61 — Medidas cautelares', arbol('Art. 61 · Medidas cautelares (las adopta el instructor desde la incoación)', `Procedimiento sancionador en el que pueda proponerse la ${Y('expulsión')}`, [
  'a) Presentación periódica ante las autoridades competentes.',
  'b) Residencia obligatoria en determinado lugar.',
  'c) Retirada del pasaporte o documento acreditativo de su nacionalidad, previa entrega al interesado del resguardo acreditativo de tal medida.',
  `d) Detención cautelar, por la autoridad gubernativa o sus agentes, por un período máximo de ${P('72 horas')} previas a la solicitud de internamiento.`,
  `e) Internamiento preventivo, previa ${Y('autorización judicial')} en los centros de internamiento.`,
  `f) Cualquier otra medida cautelar que el ${G('juez')} estime adecuada y suficiente.`,
  '2. Transportistas que no se hagan cargo del extranjero: suspensión de actividades, fianzas, avales o inmovilización del medio de transporte.']));
v('Artículo 62 — Ingreso en centros de internamiento', flujo('Art. 62 · Internamiento', [
  { et: 'Solicitud', t: `El ${G('instructor')} solicita al ${G('Juez de Instrucción')} competente el ingreso, en expedientes por 54.1.a) y b), 53.1.a), d) y f) y 57.2.` },
  { et: 'Auto', t: `El Juez, previa audiencia del ${Y('interesado')} y del ${G('Ministerio Fiscal')}, resuelve por auto motivado (proporcionalidad, riesgo de incomparecencia, actuaciones para evitar la expulsión, condenas previas; enfermedad grave).` },
  { et: P('máx. 60 días'), t: `Tiempo imprescindible; ${K('sin')} que pueda acordarse un nuevo internamiento por cualquiera de las causas previstas en un mismo expediente.` },
  { et: 'Libertad', t: 'Si dejan de cumplirse las condiciones, la autoridad administrativa lo pone inmediatamente en libertad y lo comunica al Juez.' },
  { et: K('Menores'), t: 'No podrá acordarse el ingreso de menores; los no acompañados se ponen a disposición de las entidades de protección de menores.' },
  { et: 'Comunicación', t: `Incoación, detención, internamiento y resolución final se comunican al ${G('Ministerio de Asuntos Exteriores')} y a la embajada o consulado.` },
  { et: 'Juez', t: 'Autoriza: Juez de Instrucción del lugar de la detención. Controla la estancia: Juez de Instrucción del lugar donde esté el centro (sin ulterior recurso).' }]));
v('Artículo 63 — Procedimiento preferente', flujo('Art. 63 · Procedimiento preferente de expulsión', [
  { et: 'Supuestos', t: `53.1.d), 53.1.f), 54.1.a), 54.1.b) y 57.2; y estancia irregular con riesgo de incomparecencia, evitación de la expulsión o riesgo para el orden público o la seguridad (${K('sin')} período de salida voluntaria).` },
  { et: 'Garantías', t: 'Asistencia letrada (de oficio, en su caso) e intérprete, gratuitos si carece de medios.' },
  { et: P('48 horas'), t: 'Alegaciones tras el traslado del acuerdo de iniciación motivado y por escrito.' },
  { et: P('3 días'), t: 'Prueba, si se estima; si no hay alegaciones ni prueba, el acuerdo de iniciación vale como propuesta de resolución.' },
  { et: 'Ejecución', t: `De forma ${Y('inmediata')}.` }]));
v('Artículo 64 — Ejecución de la expulsión', arbol('Art. 64.2 · Garantías durante la prórroga, aplazamiento o suspensión de la expulsión', `Expirado el plazo voluntario: detención y conducción; si no se ejecuta en ${P('72 horas')}, internamiento (máx. del art. 62)`, [
  'a) El mantenimiento de la unidad familiar con los miembros que se hallen en territorio español.',
  'b) La prestación de atención sanitaria de urgencia y tratamiento básico de enfermedades.',
  'c) El acceso para los menores, en función de la duración de su estancia, al sistema de enseñanza básica.',
  'd) Las necesidades especiales de personas vulnerables.',
  `3. Costes: a cargo del ${Y('empleador')} sancionado por 53.2.a) o 54.1.d); en el resto, del extranjero si tuviere medios.`,
  `5. Se ${Y('suspende')} la ejecución si se formaliza una petición de protección internacional, hasta su inadmisión o resolución.`]));
v('Artículo 66 — Obligaciones de los transportistas', plazos('Art. 66 · Obligaciones de los transportistas', [
  [Y('Embarque'), 'Rutas de fuera del Espacio Schengen, cuando lo determinen las autoridades: remitir al finalizar el embarque la información de los pasajeros.'],
  [P('24 horas'), 'Las autoridades borran los datos tras la entrada y en un plazo de veinticuatro horas desde su comunicación (los transportistas, en el mismo plazo).'],
  [P('48 horas'), 'Billetes de vuelta no utilizados: información en un plazo no superior a 48 horas desde la fecha de caducidad del billete.'],
  [Y('Además'), 'Comprobar la validez y vigencia de la documentación y el visado; hacerse cargo inmediatamente del extranjero inadmitido o devuelto; transportarlo al Estado de procedencia, al que expidió el documento o a otro que garantice su admisión.'],
  [Y('Ceuta y Melilla'), 'Se aplica también al transporte aéreo o marítimo desde Ceuta o Melilla al resto del territorio español.']]));
v('Artículo 35 ter — Modelo de gestión de contingencias migratorias extraordinarias para la', plazos('Art. 35 ter.2 · Criterios de ubicación de menores no acompañados (sin acuerdo unánime)', [
  [P('50 %'), 'Población de las comunidades o ciudades autónomas de acogida (Estadística continua de población).'],
  [P('13 %'), 'Renta disponible bruta per cápita de los hogares.'],
  [P('15 %'), 'En razón inversa a la Tasa de paro (EPA del último cuatrimestre).'],
  [P('6 %'), 'Esfuerzo en atención a menores no acompañados (promedio de los últimos seis meses; ratio por cada 100.000 habitantes).'],
  [P('10 %'), 'En razón inversa al dimensionamiento estructural de plazas de acogida (una plaza por cada 2.500 habitantes).'],
  [P('2 %'), 'Ciudad fronteriza: ponderación negativa del -100 % a la Ciudad de Melilla.'],
  [P('2 %'), 'Insularidad: ponderación negativa del -100 % a Islas Baleares.'],
  [P('2 %'), 'Dispersión de la población.']]));
v('Artículo 35 quáter — Plan de respuesta solidaria ante la situación de contingencia migratoria', plazos('Arts. 35 bis y 35 quáter · Contingencia migratoria extraordinaria: plazos', [
  [P('× 3'), 'Se declara cuando la ocupación del sistema de protección exceda tres veces su capacidad ordinaria.'],
  [P('5 días naturales'), 'Plazo máximo para aprobar la declaración desde la comunicación de la comunidad o ciudad autónoma afectada.'],
  [P('24 horas'), 'Inscripción en el Registro de Menores Extranjeros No Acompañados desde la reseña.'],
  [P('15 días naturales'), 'Traslado a la comunidad de destino y resolución de ubicación y traslado, desde la inscripción en el Registro (oídos el menor y la comunidad de destino, con conocimiento del Ministerio Fiscal).']]));
v('Artículo 62 ter — Deberes de los extranjeros internados', arbol('Art. 62 ter · Deberes de los extranjeros internados', 'El extranjero sometido a internamiento estará obligado:', [
  `a) A permanecer en el centro a disposición del ${G('Juez de Instrucción')} que hubiere autorizado su ingreso.`,
  'b) A observar las normas por las que se rige el centro y cumplir las instrucciones de la dirección y de los funcionarios, así como las relativas a su propio aseo e higiene y la limpieza del centro.',
  'c) A mantener una actividad cívica correcta y de respeto con los funcionarios, empleados, visitantes y otros internados.',
  'd) A conservar el buen estado de las instalaciones materiales, mobiliario y demás efectos del centro.',
  `e) A someterse a ${Y('reconocimiento médico')} a la entrada y salida del centro, y cuando lo disponga el ${G('director')} por razones de salud colectiva.`]));
v('Artículo 63 bis — Procedimiento ordinario', plazos('Art. 63 bis · Procedimiento ordinario de expulsión', [
  [Y('Supuestos'), 'Los distintos de los del procedimiento preferente.'],
  [P('7 – 30 días'), `Plazo de ${Y('cumplimiento voluntario')} desde la notificación; prorrogable por un tiempo prudencial (duración de la estancia, niños escolarizados, vínculos familiares y sociales).`],
  [K('Sin internamiento'), `Pueden adoptarse medidas cautelares del art. 61, ${K('excepto')} el internamiento.`]]));
v('Disposición adicional primera — Plazo máximo para resolución de expedientes', plazos('D.A. 1.ª · Plazos máximos y silencio', [
  [P('3 meses'), `Plazo general para notificar las solicitudes de autorizaciones; silencio ${Y('desestimatorio')}.`],
  [P('15 días naturales'), 'Visados de tránsito o estancia (normativa comunitaria).'],
  [P('3 meses'), `Prórroga de residencia, renovación del trabajo y residencia de larga duración: silencio ${Y('positivo')}.`],
  [P('1 mes'), `Modificación de la limitación territorial o de ocupación de las autorizaciones iniciales: silencio ${Y('positivo')}.`]]));
v('Disposición adicional cuarta —', arbol('D.A. 4.ª · Inadmisión a trámite de las solicitudes', 'La autoridad competente para resolver inadmitirá a trámite:', [
  'a) Falta de legitimación del solicitante, o insuficiente acreditación de la representación.',
  'b) Presentación de la solicitud fuera del plazo legalmente establecido.',
  'c) Reiteración de una solicitud ya denegada, siempre que las circunstancias no hayan variado.',
  'd) Procedimiento sancionador en el que pueda proponerse la expulsión u orden de expulsión, salvo revocada o en los supuestos protegidos.',
  `e) Cuando el solicitante tenga prohibida su entrada en ${Y('España')}.`,
  'f) Solicitudes manifiestamente carentes de fundamento.',
  'g) Extranjeros en situación irregular, salvo arraigo o circunstancias excepcionales.',
  'h) Solicitud no realizada personalmente cuando sea exigido por ley.',
  `2. Visados de tránsito o estancia: fuera de los ${P('tres meses')} anteriores al viaje; modelo distinto del oficial; documento de viaje sin ${P('tres meses')} de validez tras la salida, sin dos páginas en blanco o expedido hace más de ${P('diez años')}; sin fotografía; sin datos biométricos; sin abonar la tasa.`]));

// ═════════ 6.2 · LEY 12/2009 ═════════
v('Artículo 6 — Actos de persecución', arbol('Art. 6.2 · Formas que pueden revestir los actos de persecución (entre otras)', `Actos ${Y('suficientemente graves')} por su naturaleza o carácter reiterado, o ${Y('acumulación')} suficientemente grave de varias medidas`, [
  'a) actos de violencia física o psíquica, incluidos los actos de violencia sexual;',
  'b) medidas legislativas, administrativas, policiales o judiciales que sean discriminatorias en sí mismas o que se apliquen de manera discriminatoria;',
  'c) procesamientos o penas que sean desproporcionados o discriminatorios;',
  'd) denegación de tutela judicial de la que se deriven penas desproporcionadas o discriminatorias;',
  'e) procesamientos o penas por la negativa a prestar servicio militar en un conflicto en el que el cumplimiento de dicho servicio conllevaría delitos o actos comprendidos en las cláusulas de exclusión;',
  'f) actos de naturaleza sexual que afecten a adultos o a niños.']));
v('Artículo 7 — Motivos de persecución', arbol('Art. 7 · Motivos de persecución', `Será ${Y('indiferente')} que posea realmente la característica, a condición de que el agente de persecución ${Y('se la atribuya')}`, [
  `a) Raza: en particular, el ${Y('color, el origen o la pertenencia a un determinado grupo étnico')}.`,
  `b) Religión: creencias ${Y('teístas, no teístas y ateas')}, la participación o la abstención en cultos formales en privado o en público.`,
  'c) Nacionalidad: no se limita a poseer o no la ciudadanía; incluye la identidad cultural, étnica o lingüística, los orígenes geográficos o políticos comunes o la relación con la población de otro Estado.',
  `d) Opiniones políticas: ideas o creencias sobre los agentes de persecución, ${Y('independientemente')} de que se haya obrado de acuerdo con ellas.`,
  'e) Grupo social determinado: característica innata o antecedentes comunes que no pueden cambiarse, e identidad diferenciada; incluye orientación sexual o identidad sexual, y, o, edad, y la persecución por motivos de género.']));
v('Artículo 8 — Causas de exclusión', cols('Arts. 8, 9, 11 y 12 · Exclusión y denegación (asilo / protección subsidiaria)', [
  { t: 'EXCLUSIÓN DEL REFUGIADO (art. 8)', l: ['Protección o asistencia de un órgano de las Naciones Unidas distinto del ACNUR (si cesa sin solución: «ipso facto» derecho al asilo).', 'Derechos y obligaciones inherentes a la nacionalidad del país de residencia.', 'Delitos contra la paz, de guerra o contra la humanidad.', 'Delito grave fuera del país de refugio antes de ser admitidas como refugiadas.', 'Actos contrarios a las finalidades y principios de las Naciones Unidas.', 'También a quienes inciten o participen.'] },
  { t: 'EXCLUSIÓN DE LA SUBSIDIARIA (art. 11)', l: ['Delitos contra la paz, de guerra o contra la humanidad.', 'Delito grave fuera del país de protección.', 'Actos contrarios a las finalidades y principios de las Naciones Unidas.', `${Y('Peligro para la seguridad interior o exterior de España o para el orden público.')}`] },
  { t: 'DENEGACIÓN (arts. 9 y 12)', l: ['Personas que constituyan, por razones fundadas, un peligro para la seguridad de España.', 'Personas que, habiendo sido objeto de una condena firme por delito grave, constituyan una amenaza para la comunidad.'] }]));
v('Artículo 10 — Daños graves', arbol('Art. 10 · Daños graves que dan lugar a la protección subsidiaria', `Protección ${Y('subsidiaria')}: riesgo real de sufrir`, [
  'a) la condena a pena de muerte o el riesgo de su ejecución material;',
  'b) la tortura y los tratos inhumanos o degradantes en el país de origen del solicitante;',
  `c) las amenazas ${Y('graves')} contra la vida o la integridad de los civiles motivadas por una violencia indiscriminada en situaciones de conflicto ${Y('internacional o interno')}.`]));
v('Artículo 13 — Agentes de persecución o causantes de daños graves', cols('Arts. 13 y 14 · Agentes de persecución y de protección', [
  { t: 'AGENTES DE PERSECUCIÓN (art. 13)', l: ['a) el Estado;', 'b) los partidos u organizaciones que controlen el Estado o una parte considerable de su territorio;', `c) ${Y('agentes no estatales')}, cuando los anteriores, incluidas las organizaciones internacionales, no puedan o no quieran proporcionar protección efectiva.`] },
  { t: 'AGENTES DE PROTECCIÓN (art. 14)', l: ['a) el Estado, o', 'b) los partidos u organizaciones, incluidas las organizaciones internacionales, que controlen el Estado o una parte considerable de su territorio.', `Existe protección si adoptan medidas razonables y efectivas y el solicitante tiene ${Y('acceso efectivo')} a ella.`] }]));
v('Artículo 17 — Presentación de la solicitud', plazos('Art. 17 · Presentación de la solicitud', [
  [Y('Forma'), 'Comparecencia personal o, en caso de imposibilidad física o legal, persona que lo represente (ratificación al desaparecer el impedimento).'],
  [P('1 mes'), 'Sin demora y en todo caso en el plazo máximo de un mes desde la entrada en territorio español o desde los acontecimientos que justifiquen el temor.'],
  [K('Entrada ilegal'), `${K('No')} podrá ser sancionada si la realiza quien reúne los requisitos para ser beneficiario.`],
  [Y('Información'), 'Procedimiento; derechos y obligaciones; posibilidad de contactar con el ACNUR y ONG; consecuencias del incumplimiento; derechos y prestaciones sociales.'],
  [Y('Entrevista'), `Personal y ${Y('siempre individualmente')}; excepcionalmente, presencia de otros familiares si es imprescindible.`]]));
v('Artículo 18 — Derechos y obligaciones de los solicitantes', cols('Art. 18 · Derechos y obligaciones del solicitante', [
  { t: 'DERECHOS', l: ['a) ser documentado como solicitante;', 'b) asistencia jurídica gratuita e intérprete;', 'c) que se comunique su solicitud al ACNUR;', 'd) suspensión de cualquier proceso de devolución, expulsión o extradición;', 'e) conocer el contenido del expediente en cualquier momento;', 'f) atención sanitaria;', 'g) prestaciones sociales específicas.'] },
  { t: 'OBLIGACIONES', l: ['a) cooperar con las autoridades españolas;', 'b) presentar, lo antes posible, los elementos que fundamenten su solicitud;', 'c) impresiones dactilares, fotografías y, en su caso, grabación (previa información);', 'd) informar sobre su domicilio y sus cambios;', `e) informar o comparecer ante la ${G('autoridad competente')} cuando se le requiera.`] }]));
v('Artículo 20 — No admisión de solicitudes presentadas dentro del territorio español', arbol('Art. 20 · No admisión a trámite (Ministro del Interior, a propuesta de la OAR)', `Notificación en ${P('un mes')} desde la presentación; si no, ${Y('admisión a trámite')} y permanencia provisional`, [
  'Falta de competencia: a) Reglamento (CE) 343/2003; b) Convenios Internacionales (el Estado responsable debe aceptarlo explícitamente, con garantías).',
  'Falta de requisitos: c) reconocido como refugiado con protección efectiva en un tercer Estado;',
  'd) procedente de un tercer país seguro (readmisión y vínculos razonables);',
  'e) reiteración de una solicitud denegada o nueva solicitud con otros datos, sin nuevas circunstancias relevantes;',
  'f) nacional de un Estado miembro de la Unión Europea.',
  `3. Si se constatan después de la admisión: causa de ${Y('denegación')}.`]));
v('Artículo 21 — Solicitudes presentadas en puestos fronterizos', plazos('Art. 21 · Solicitudes en frontera', [
  [P('4 días'), 'Inadmisión o denegación por el Ministro del Interior, notificada en el plazo máximo de cuatro días desde la presentación.'],
  [P('10 días'), 'Ampliación por resolución del Ministro cuando, por causas de exclusión o denegación, el ACNUR lo solicite de manera razonada.'],
  [P('2 días'), 'Petición de reexamen desde la notificación (suspende los efectos).'],
  [P('2 días'), 'Resolución del reexamen por el Ministro del Interior desde su presentación.'],
  [Y('Silencio'), `Tramitación por el ${Y('procedimiento ordinario')} y autorización de entrada y permanencia provisional.`]]));
v('Artículo 24 — Procedimiento ordinario', flujo('Arts. 23 y 24 · Procedimiento ordinario de protección internacional', [
  { et: 'Instrucción', t: `${G('Oficina de Asilo y Refugio')} (dependiente del Ministerio del Interior).` },
  { et: 'Propuesta', t: `${G('Comisión Interministerial de Asilo y Refugio')} (un representante de los departamentos con competencia en política exterior e interior, justicia, inmigración, acogida e igualdad; asiste el representante del ACNUR).` },
  { et: 'Resolución', t: `${G('Ministro del Interior')}: concede o deniega el asilo o la protección subsidiaria.` },
  { et: P('6 meses'), t: `Sin notificación desde la presentación: podrá entenderse ${Y('desestimada')}, sin perjuicio de la obligación de resolver.` }]));
v('Artículo 25 — Tramitación de urgencia', arbol('Art. 25 · Tramitación de urgencia (Ministerio del Interior, de oficio o a petición)', `Plazos del procedimiento ordinario ${Y('reducidos a la mitad')}; se informa a la CIAR`, [
  'a) que parezcan manifiestamente fundadas;',
  'b) solicitantes con necesidades específicas, especialmente menores no acompañados;',
  'c) que planteen exclusivamente cuestiones ajenas a los requisitos;',
  'd) solicitante procedente de un país de origen considerado seguro;',
  `e) presentada, sin motivo justificado, transcurrido el plazo de ${P('un mes')};`,
  'f) solicitante incurso en supuestos de exclusión o denegación.',
  '2. Solicitudes en un Centro de Internamiento: régimen de frontera y, si se admiten, urgencia.']));
v('Artículo 33 — Reducción o retirada de las condiciones de acogida', arbol('Art. 33 · Reducción o retirada de los servicios de acogida', 'El Ministerio competente podrá reducirlos o retirarlos:', [
  'a) abandono del lugar de residencia asignado sin informar o sin permiso;',
  'b) acceso a recursos económicos u ocultación de los mismos, beneficiándose indebidamente;',
  'c) resolución de la solicitud notificada (salvo continuidad de programas por circunstancias especiales);',
  `d) vulneración de derechos de otros residentes o del personal, o dificultar ${Y('gravemente')} la convivencia;`,
  'e) finalización del periodo del programa o prestación autorizado.',
  '3. El sistema de faltas y sanciones lo establece reglamentariamente el Ministerio competente.']));
v('Artículo 35 — Intervención en la tramitación de protección internacional', plazos('Arts. 34 y 35 · Intervención del ACNUR', [
  [Y('Comunicación'), 'Se le comunican las solicitudes; puede informarse, asistir a las audiencias, presentar informes y acceder a los solicitantes (también en frontera, CIE o centros penitenciarios).'],
  [Y('CIAR'), 'Su representante en España es convocado a las sesiones de la Comisión Interministerial.'],
  [Y('Frontera'), 'Informado inmediatamente; puede entrevistarse con los solicitantes; audiencia antes de resolver.'],
  [P('10 días'), 'Urgencia y admisiones a trámite con propuesta desfavorable de la OAR: plazo para que informe.']]));
v('Artículo 36 — Efectos de la concesión del derecho de asilo o de protección subsidiaria', arbol('Art. 36 · Efectos de la concesión (en todo caso)', 'Concesión del asilo o de la protección subsidiaria', [
  'a) protección contra la devolución;', 'b) información sobre derechos y obligaciones en una lengua comprensible;',
  `c) autorización de residencia y trabajo ${Y('permanente')};`, 'd) documentos de identidad y viaje (refugiados; subsidiaria, cuando sea necesario);',
  `e) acceso a los servicios ${Y('públicos')} de empleo;`, 'f) educación, sanidad, vivienda, servicios sociales, víctimas de violencia de género, seguridad social e integración, en las mismas condiciones que los españoles;',
  'g) formación continua u ocupacional, prácticas y reconocimiento de títulos;', 'h) libertad de circulación;', 'i) programas de integración;', 'j) programas de ayuda al retorno voluntario;', 'k) mantenimiento de la unidad familiar.']));
v('Artículo 40 — Extensión familiar del derecho de asilo o de la protección subsidiaria', arbol('Art. 40 · Extensión familiar (tramita la OAR, estudia la CIAR, resuelve el Ministro del Interior)', 'Restablecimiento de la unidad familiar por extensión', [
  `a) Ascendientes en primer grado que acrediten la ${Y('dependencia')} y descendientes en primer grado ${Y('menores de edad')} (excepto distinta nacionalidad; pruebas científicas si hay dudas).`,
  'b) Cónyuge o persona ligada por análoga relación, salvo divorcio, separación legal o de hecho, distinta nacionalidad o estatuto por razón de género con persecución por el cónyuge o conviviente.',
  `c) Otro adulto responsable del beneficiario cuando éste sea un ${Y('menor no casado')}.`,
  'd) Otros miembros de la familia con dependencia y convivencia previa en el país de origen.',
  `4. ${K('En ningún caso')} a personas incursas en causas de exclusión o denegación.`]));
v('Artículo 42 — Cese del estatuto de refugiado', cols('Arts. 42 y 43 · Cese', [
  { t: 'CESE DEL REFUGIADO (art. 42)', l: ['a) expresamente así lo soliciten;', 'b) acogida de nuevo, voluntariamente, a la protección del país de su nacionalidad;', 'c) habiendo perdido su nacionalidad, la hayan recobrado voluntariamente;', 'd) nueva nacionalidad con protección de ese país;', 'e) establecidos de nuevo, voluntariamente, en el país que abandonaron;', 'f) abandono de España y residencia en otro país;', 'g) desaparición de las circunstancias (cambio significativo y no temporal);', `h) ${Y('no teniendo nacionalidad')}, pueden regresar a su anterior residencia habitual.`] },
  { t: 'CESE DE LA SUBSIDIARIA (art. 43)', l: ['a) se solicite expresamente;', 'b) abandono de España y residencia en otro país;', 'c) las circunstancias dejen de existir o cambien de tal forma que ya no sea necesaria.', `En ambos: el cese ${K('no impedirá')} continuar residiendo conforme a la normativa de extranjería.`] }]));
v('Artículo 43 — Cese de la protección subsidiaria', plazos('Art. 43 · Cese de la protección subsidiaria (supuestos)', [
  ['a)', 'se solicite expresamente por la persona beneficiaria;'],
  ['b)', 'la persona beneficiaria haya abandonado el territorio español y fijado su residencia en otro país;'],
  ['c)', 'las circunstancias que condujeron a su concesión dejen de existir o cambien de tal forma que dicha protección ya no sea necesaria.']]));
v('Artículo 44 — Revocación', arbol('Art. 44 · Revocación del estatuto de refugiado o de protección subsidiaria', `Conlleva la aplicación de la normativa de extranjería y, en su caso, el expediente de expulsión; ${K('nunca')} envío a un país con peligro para la vida o la libertad`, [
  'a) concurra alguno de los supuestos de exclusión previstos en los artículos 8, 9, 11 y 12;',
  `b) haya ${Y('tergiversado u omitido hechos')}, incluido el uso de documentos falsos, decisivos para la concesión;`,
  'c) constituya un peligro para la seguridad de España o, condenada por delito grave, una amenaza para la comunidad.']));
v('Artículo 45 — Procedimientos para el cese y la revocación', flujo('Art. 45 · Procedimiento de cese y revocación', [
  { et: 'Inicio', t: `${G('Oficina de Asilo y Refugio')}, de oficio o a instancia de parte (puede archivar si no son fundadas las causas).` },
  { et: 'Garantías', t: 'Información por escrito, trámite de audiencia, información precisa y actualizada (ACNUR) y no obtenerla de los responsables de la persecución.' },
  { et: 'CIAR', t: `${G('Comisión Interministerial')}: archiva o eleva propuesta.` },
  { et: 'Resolución', t: `${G('Ministro del Interior')}.` },
  { et: P('6 meses'), t: 'Plazo para notificar; si no, caducidad y archivo de oficio.' },
  { et: 'Recursos', t: `Fin de la vía administrativa: reposición potestativa ante el Ministro del Interior y contencioso-administrativo (${K('no')} alzada).` }]));

module.exports = V;
if (require.main !== module) return;   // al importarlo desde expres-t6.js solo se exportan los cuadros
// ───────── inserción en T6.lo / T6.l12 de esquemas.html ─────────
const F = 'esquemas.html';
const s = fs.readFileSync(F, 'utf8').split('\n');
const ks = ['/* T6_LO */ T6.lo = "', '/* T6_L12 */ T6.l12 = "'].map(p => s.findIndex(l => l.startsWith(p)));
if (ks.some(k => k < 0)) throw new Error('no se encuentran T6.lo / T6.l12');
const esc = h => JSON.stringify(h).slice(1, -1);
ks.forEach(k => { s[k] = s[k].replace(/<!--VIS6-->[\s\S]*?<!--\/VIS6-->/g, ''); });
let n = 0; const pos = { [ks[0]]: [], [ks[1]]: [] };
V.forEach(([tras, html]) => {
  let hecho = false;
  for (const k of ks) {
    const l = s[k];
    const heads = [...l.matchAll(/articulo-head[^>]*>(.*?)<\/div>/g)].map(m => [m.index, m[1].replace(/<[^>]+>/g, '').replace(/\\"/g, '"')]);
    const hh = heads.find(h => h[1].startsWith(tras)); if (!hh) continue;
    const sig = [l.indexOf('<div class=\\"articulo\\">', hh[0]), l.indexOf('<div class=\\"bloque-titulo\\">', hh[0]), l.length - 1].filter(x => x > 0).sort((a, b) => a - b)[0];
    pos[k].push([sig, `<!--VIS6-->${esc(html)}<!--/VIS6-->`]); hecho = true; n++; break;
  }
  if (!hecho) console.error('SIN FICHA:', tras);
});
ks.forEach(k => { let l = s[k]; pos[k].sort((a, b) => b[0] - a[0]).forEach(([p, h]) => { l = l.slice(0, p) + h + l.slice(p); }); s[k] = l; });
fs.writeFileSync(F, s.join('\n'));
console.log('cuadros insertados:', n, 'de', V.length);
