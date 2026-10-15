// Cuadros adicionales del Tema 5 (fichas con listas, plazos o procedimientos). Lo carga visuales-t5.js.
module.exports = (v, L) => {
  const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;

  v('Considerandos 1, 5, 6', plazos('Considerandos del SIS: lo que se pregunta', [
    ['Anual', 'Intercambios de personal entre oficinas Sirene, con periodicidad anual como mínimo'],
    ['Periódica', 'Formación de usuarios finales y personal Sirene (seguridad, protección y calidad de los datos)'],
    ['eu-LISA', 'Gestión operativa de los componentes centrales · herramienta central de supervisión de la calidad de los datos · formación a organismos nacionales'],
    ['Sin datos personales', 'Las estadísticas del repositorio central no deben contener datos personales']]));
  v('Artículo 3 — Definiciones', arbol('Definiciones clave del SIS (art. 3)', `${D('Definiciones')}`, [
    `${R('Descripción')}: conjunto de datos introducidos en el SIS que permiten identificar a una persona para adoptar una medida específica`,
    `${R('Información complementaria')}: no forma parte de la descripción pero se intercambia por las oficinas Sirene · ${R('datos adicionales')}: almacenados en el SIS y a disposición inmediata de las autoridades`,
    { t: `${R('Coincidencia')} = tres pasos`, sub: ['a) el usuario final consulta el SIS', 'b) la consulta arroja una descripción introducida por otro Estado miembro', 'c) los datos de la descripción coinciden con los de la consulta'] },
    `${R('Respuesta positiva')}: coincidencia ${R('confirmada')} (por el usuario final o por la autoridad, si es biométrica) ${K('y')} que requiere adoptar medidas`,
    'Usuario final: personal de una autoridad competente autorizado para consultar la CS-SIS, el N.SIS o una copia técnica · imagen facial: imagen digital con calidad suficiente para el sistema de correspondencias biométricas']));
  v('Artículo 12 — Registros nacionales', plazos('Registros nacionales del SIS (art. 12)', [
    ['3 años', `Los registros se suprimen en ${R('tres años desde su creación')} · los del historial de descripciones, tres años desde la supresión de la descripción`],
    ['Más tiempo', 'Si son necesarios para procedimientos de control ya en curso'],
    ['Fines', 'Controlar la legalidad de la consulta y del tratamiento, control interno y correcto funcionamiento del N.SIS · muestran el tipo de datos utilizados, no los datos reales']]));
  v('Artículo 15 — Gestión operativa', arbol('Gestión operativa del SIS Central (art. 15)', `${D('eu-LISA')}`, [
    `Mejor tecnología disponible, ${R('con sujeción a un análisis de costes y beneficios')}`,
    'Funciones de la infraestructura de comunicación · coordinación, gestión y apoyo de las actividades de prueba',
    `Mecanismo de ${R('controles de calidad de los datos')}: informes regulares a los Estados miembros · la Comisión informa periódicamente al Parlamento y al Consejo`,
    `Funcionamiento ${P('ininterrumpido: 24 horas, 7 días a la semana')}`]));
  v('Artículo 20 — Categorías de datos', arbol('Datos de las descripciones sobre personas (art. 20.2)', `${D('Solo estos datos')}`, [
    'a) apellidos · b) nombres · c) nombres y apellidos de nacimiento · d) usados con anterioridad y alias · e) rasgos físicos particulares, objetivos e inalterables',
    `${R('Fotocopia, a ser posible en color, de los documentos de identificación')}`,
    { t: 'j) indicación de si la persona…', sub: ['va armada', 'es violenta', 'está fugada o se ha evadido', 'presenta un riesgo de suicidio', 'es una amenaza para la salud pública'] },
    'q) indicación de si la decisión de denegación de entrada y estancia se basa en una condena anterior, etc.']));
  v('Artículo 30 — Consulta en caso de respuesta positiva', flujo('Respuesta positiva sobre titular de permiso de residencia o visado de larga duración (art. 30)', [
    { et: 'a', t: `El Estado miembro de ${R('ejecución')} informa de la situación al Estado miembro ${R('emisor')}` },
    { et: 'b', t: `El Estado miembro emisor inicia el procedimiento del ${R('artículo 29')}` },
    { et: 'c', t: 'El Estado miembro emisor comunica al de ejecución el resultado tras las consultas' }]));
  v('Artículo 39 — Plazo de revisión de las descripciones', plazos('Revisión y supresión de descripciones (art. 39)', [
    ['3 años', `El Estado emisor revisa la necesidad de conservar la descripción en un plazo máximo de tres años · ${R('5 años')} si la decisión nacional tiene validez superior a tres`],
    ['4 meses', 'La CS-SIS avisa automáticamente de la supresión programada, con cuatro meses de antelación'],
    ['15 días naturales', 'Plazo de la autoridad para indicar que la descripción se ha suprimido o se suprimirá, o justificar su conservación'],
    ['Automática', 'Las descripciones se suprimen al expirar el plazo de revisión, salvo que se comunique la prórroga a la CS-SIS']]));
  v('Artículo 41 — Tratamiento de los datos del SIS', plazos('Tratamiento y copias técnicas (art. 41)', [
    ['48 horas', `Copias técnicas que dan lugar a bases de datos fuera de línea: ${R('máximo 48 horas')}`],
    ['24 horas', 'Excepción: copias para emergencias si es imposible acceder a la red durante más de 24 horas'],
    ['Autorización', 'Para copiar datos introducidos por otro Estado: autorización previa del Estado emisor'],
    ['Anual', 'eu-LISA garantiza la publicación anual de la lista de autoridades en el Diario Oficial de la Unión Europea']]));

  v('Artículo 2 — Objetivo', arbol('Objetivos del VIS (art. 2)', `${D('VIS')}: mejorar la política común de visados, la cooperación consular y las consultas`, [
    'a) facilitar el procedimiento de solicitud de visados · b) impedir el incumplimiento de los criterios para determinar el Estado responsable · c) facilitar la lucha contra el fraude',
    'd) facilitar los controles en los pasos fronterizos exteriores y en el territorio',
    'e) asistir en la identificación y el retorno de quien no cumpla o haya dejado de cumplir las condiciones de entrada, estancia o residencia',
    `h-i) contribuir a la prevención, detección e investigación de delitos de ${R('terrorismo u otros delitos graves')}`,
    'k) apoyar los objetivos del SIS (denegación de entrada, detención a efectos de entrega o extradición, desaparecidos o personas vulnerables)']));
  v('Artículo 2 bis — Arquitectura', arbol('Arquitectura del VIS (art. 2 bis)', `${D('VIS')}: arquitectura ${R('centralizada')}`, [
    `a) ${R('RCDI')}: registro común de datos de identidad (art. 17.1 del Rgto. 2019/817)`,
    `b) ${R('sistema central del VIS')}`,
    `c) ${R('interfaces nacionales uniformes (INU)')} en cada Estado miembro, con especificaciones técnicas comunes e idénticas`]));
  v('Artículo 6 — Acceso para introducir', arbol('Titulares de un permiso de residencia durante 10 años o más (art. 6)', `${D('Período ininterrumpido igual o superior a diez años')}`, [
    `Autoridades designadas y Europol: ${K('sin acceso')} a esos datos (art. 6.2 sexies)`,
    `Equipos de la Guardia Europea de Fronteras y Costas (salvo equipos de gestión de fronteras): ${K('sin acceso')} (art. 6.2 septies)`,
    'Controles en el territorio de los Estados miembros: acceso limitado (art. 6.2 ter) · autoridades de asilo: régimen propio (art. 6.2 quinquies)',
    `Menores: datos dactiloscópicos e imágenes faciales solo para consultar el VIS y, si hay respuesta positiva, para ${R('verificar la identidad del menor')}`]));
  v('Artículo 9 undecies', arbol('Indicadores de riesgo específicos (art. 9 undecies)', `${D('Unidad central del SEIAV')} los introduce en el VIS`, [
    'Se basan en estadísticas del SES (tasas anormales de sobrepasar la estancia) y en información del Centro Europeo para la Prevención y el Control de las Enfermedades',
    'Criterios: grupo de edad, sexo, nacionalidad · país y ciudad de residencia · Estado miembro de la primera entrada',
    `${K('En ningún caso')} se basarán exclusivamente en el sexo o la edad`,
    `La Comisión especifica los riesgos mediante acto de ejecución, previa consulta al ${R('Consejo de Detección del VIS')}`]));
  v('Artículo 14 — Datos que se añadirán tras la prórroga', arbol('Prórroga del visado: datos y motivos (art. 14)', `${D('Datos tras la prórroga')}`, [
    'b) autoridad que prorrogó el visado, incluida su ubicación · f) período de prórroga de la estancia autorizada · g) si cambia la validez territorial, el territorio en el que puede viajar',
    { t: 'Motivos de prórroga (uno o varios):', sub: ['a) fuerza mayor', 'b) motivos humanitarios', 'c) razones profesionales graves', 'd) razones personales graves'] }]));
  v('Artículo 15 — Utilización del VIS para el examen', arbol('Búsquedas de la autoridad de visados (art. 15)', `${D('Examen de la solicitud')}`, [
    'a) si el solicitante ha sido objeto de una decisión de expedir, denegar, anular, retirar o prorrogar un visado · b) lo mismo para visados de larga duración y permisos de residencia',
    'Búsqueda con uno o más datos: número de expediente, datos de la persona, apellidos y dirección de quien invita, números de etiqueta y fecha de expedición…',
    `${R('La imagen facial no será el único criterio de búsqueda')}`,
    'Acceso a los expedientes vinculados y búsquedas en el SES directamente desde el VIS']));

  v('Artículo 2 — Definiciones', arbol('Definiciones del Código de visados (art. 2)', `${D('Visados y sujetos')}`, [
    `${R('Visado uniforme')}: válido para todo el territorio de los Estados miembros · ${R('visado de validez territorial limitada')}: uno o más Estados, pero no todos`,
    `${R('Visado de tránsito aeroportuario')}: zonas internacionales de tránsito de uno o varios aeropuertos · etiqueta de visado: modelo uniforme (Rgto. 1683/95)`,
    'Documento de viaje reconocido: por uno o varios Estados miembros para cruzar la frontera y colocar un visado',
    `${R('Consulado')}: misión diplomática u oficina consular con autorización para expedir visados, dirigida por un funcionario consular de carrera (Convención de Viena, 24-4-1963)`,
    'Intermediario comercial: gestoría privada, empresa de transporte o agencia de viaje · marino: quien trabaja a bordo de un buque de navegación marítima o aguas interiores internacionales']));
  v('Artículo 3 — Nacionales de terceros países', cols('Visado de tránsito aeroportuario: quién lo necesita y quién queda exento (art. 3)', [
    { t: 'Lo exigen', l: [`Los nacionales de los terceros países del ${R('anexo IV')}`, `Casos urgentes de afluencia masiva de inmigrantes ilegales: un Estado puede exigirlo (notifica a la Comisión ${P('antes de su entrada en vigor')})`, `Revisión ${P('anual')} para trasladarlos al anexo IV`] },
    { t: 'Exentos (art. 3.5)', l: ['Titulares de visado uniforme válido, visado nacional de larga duración o permiso de residencia de un Estado miembro', 'Permisos de Andorra, Canadá, Japón, San Marino o EE. UU. (readmisión incondicional) y de los territorios de ultramar de los Países Bajos', `Titulares de ${R('pasaportes diplomáticos')} · familiares de ciudadanos de la Unión · tripulaciones (Convenio de Chicago)`] }]));
  v('Artículo 25 bis — Cooperación en materia de readmisión', flujo('Evaluación de la cooperación en readmisión (art. 25 bis)', [
    { et: '1', t: `La ${R('Comisión')} evalúa ${P('al menos una vez al año')} la cooperación de los terceros países` },
    { et: '2', t: 'Se basa en datos fiables de los Estados miembros y de las instituciones, órganos y organismos de la Unión' },
    { et: '3', t: `Remite su evaluación al ${R('Consejo')}, al menos una vez al año` }]));
  v('Artículo 26 — Expedición de un visado de tránsito aeroportuario', plazos('Visado de tránsito aeroportuario (art. 26)', [
    ['15 días', 'Período de gracia adicional'],
    ['6 meses', 'Validez máxima de los visados de tránsito aeroportuario múltiple'],
    ['Zonas', 'Válido para pasar por las zonas internacionales de tránsito de los aeropuertos situados en el territorio de los Estados miembros']]));

  v('Artículo 4 — Gestión operativa', arbol('Gestión operativa de Eurodac (art. 4)', `${D('eu-LISA')}`, [
    `Gestión operativa de Eurodac · funcionamiento ${P('24 horas, 7 días a la semana')} · plan y sistema de continuidad operativa`,
    `Mejor tecnología y técnicas más seguras, ${R('con análisis de costes-beneficios')}`,
    'Ensayos con datos personales reales: diagnóstico y reparación de defectos, o ensayo de nuevas tecnologías',
    `Infraestructura de comunicación: eu-LISA (supervisión, seguridad, coordinación con el proveedor) · ${R('la Comisión')} (resto: presupuesto, adquisición y renovación, contratos)`]));
  v('Artículo 14 — Disposiciones específicas aplicables a los menores', arbol('Menores en Eurodac (art. 14)', `${D('Menores')}`, [
    `Menores de ${P('seis años')}: toma a cargo de ${R('funcionarios formados específicamente')} · si hay duda sobre la edad: se considera ${R('menor de seis años')}`,
    'Acompañado de un adulto de su familia; si no está acompañado: representante o persona formada, independiente y sin recibir órdenes del funcionario',
    `${K('Ninguna fuerza')} contra menores · coerción proporcionada solo ${R('como último recurso')} y si lo permite el Derecho`,
    'Si se niega y hay riesgo para su protección: remisión a las autoridades de protección de la infancia o a los mecanismos de derivación']));
  v('Artículo 20 — Recopilación', plazos('Reasentamiento nacional (art. 20)', [
    ['6 años', 'Edad mínima de las personas admitidas'],
    ['72 horas', 'Transmisión tras conceder protección internacional o estatuto humanitario'],
    ['48 horas', 'Tras cesar las razones de salud pública · ampliación por problemas técnicos graves'],
    ['No exime', 'El incumplimiento del plazo no exime de tomar y transmitir los datos']]));
  v('Artículo 22 — Recopilación', plazos('Cruce irregular de fronteras exteriores (art. 22)', [
    ['72 horas', `Transmisión desde la ${R('fecha de aprehensión')}`],
    ['Custodia > 72 h', 'Los datos se transmiten antes de la terminación de la custodia, confinamiento o internamiento'],
    ['+48 horas', 'Ampliación por problemas técnicos graves · 48 h tras repetir las huellas'],
    ['Retorno', 'Al salir de la Unión se actualiza el conjunto de datos con la fecha de expulsión o salida']]));
  v('Artículo 23 — Recopilado', plazos('Situación irregular (art. 23)', [
    ['72 horas', `Transmisión desde que ${R('se detecta la situación irregular')} en el territorio`],
    ['6 años', 'Edad mínima'],
    ['Retorno', 'Se actualiza el conjunto de datos con la fecha de expulsión o salida']]));
  v('Artículo 26 — Recopilación', plazos('Beneficiarios de protección temporal (art. 26)', [
    ['10 días', `Transmisión desde el registro como beneficiario (${R('no 72 horas')})`],
    ['48 horas', 'Tras cesar las razones de salud · ampliación por problemas técnicos graves (máx. 48 h)'],
    ['1 año', 'Conservación desde la entrada en vigor de la decisión de ejecución del Consejo, prorrogable cada año']]));
  v('Anexo I — Fichero VIS-Nacional', arbol('Fichero VIS-Nacional (anexo I)', `${D('VIS-Nacional')}`, [
    `Finalidad: soporte para la gestión (tramitación y resolución) de solicitudes de ${R('visado de corta duración')} · tratamiento ${R('mixto')} (automatizado y no automatizado)`,
    'Datos del solicitante, de su viaje y, si lo hay, de la persona que invita o sufraga los gastos de mantenimiento',
    `Cesiones: base central del VIS (Estrasburgo), aplicación informática común (DA 5.ª LO 4/2000), ${R('Cuerpo Nacional de Policía, Guardia Civil y Centro Nacional de Inteligencia')}`,
    'Responsable: Dirección General de Asuntos Consulares y Migratorios (por delegación de la Subsecretaría) · derechos ante la Oficina Consular, o la Dirección General de la Policía y de la Guardia Civil si el visado se expidió en frontera',
    `Medidas de seguridad de nivel ${R('medio')}`]));
};
