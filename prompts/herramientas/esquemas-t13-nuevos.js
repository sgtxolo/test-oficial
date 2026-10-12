// Esquemas NUEVOS del Tema 13 (LJCA): condensan los artículos más largos para que el ⚡ Exprés quepa en 17-20 págs.
// Van al esquema normal (los añade visuales-t13.js al final de su V) y al Exprés (expres-t13.js omite el literal de esas fichas).
// Texto sacado del articulado verificado del esquema; cada respuesta enlazada a sus preguntas.
module.exports = () => {
  const X = require('./expres-lib.js')(13);
  const { Rq, K, arbol, flujo, cuadro, trampa } = X;
  const N = [];
  const pon = (cab, html) => N.push([cab, html]);

  pon('Artículo 2 — Cuestiones', arbol('⭐ EX · Art. 2 — Otras cuestiones de las que conoce el orden contencioso', 'También conoce de…', [
    `a) protección de los derechos fundamentales, elementos reglados e indemnizaciones de ${Rq('los actos del Gobierno o de los Consejos de Gobierno de las CCAA', ['13-66', '13-297'])}, sea cual sea su naturaleza`,
    `b) ${Rq('los contratos administrativos y los actos de preparación y adjudicación de los demás contratos sujetos a la legislación de contratación de las AAPP', ['13-12'])}`,
    `c) ${Rq('los actos y disposiciones de las Corporaciones de Derecho público adoptados en ejercicio de funciones públicas', ['13-116', '13-311'])}`,
    `d) ${Rq('los actos de control o fiscalización de la Administración concedente sobre los concesionarios que ejerzan potestades administrativas, y los de los concesionarios recurribles directamente según la legislación sectorial', ['13-ia-109'])}`,
    `e) la responsabilidad patrimonial de las AAPP, sea cual sea la actividad o relación; ${Rq('no se las puede demandar por ello ante los órdenes civil o social', ['13-ia-101'])}, aunque concurran particulares o haya seguro`,
    'f) las demás materias que le atribuya expresamente una ley']));

  pon('Artículo 8 — Juzgados de lo', cuadro('⭐ EX · Art. 8 — Juzgados de lo Contencioso-administrativo (y lo que es de los Juzgados CENTRALES, art. 9)', ['', 'CONOCEN'], [
    ['<b>Entidades locales (8.1)</b>', `Actos de las entidades locales y sus entes dependientes, ${Rq('excluido el planeamiento urbanístico', ['13-ia-51'])}`],
    ['<b>CCAA (8.2), salvo actos del Consejo de Gobierno</b>', `${Rq('a) personal, salvo nacimiento o extinción de la relación de servicio de funcionarios de carrera', ['13-93', '13-182', '13-322', '13-37'])} · ${Rq('b) sanciones: multas de hasta 60.000 € y ceses o privación de derechos de hasta 6 meses', ['13-115', '13-239', '13-336', '13-ia-53'])} · ${Rq('c) responsabilidad patrimonial de hasta 30.050 €', ['13-178', '13-319'])}`],
    ['<b>Periférica del Estado y CCAA (8.3)</b>', `Actos de entes sin competencia en todo el territorio nacional · ${K('salvo')} cuantía de más de 60.000 € o materias de ${Rq('dominio público, obras públicas del Estado, expropiación forzosa y propiedades especiales', ['13-ia-86'])}`],
    ['<b>Extranjería (8.4)</b>', Rq('Todas las resoluciones de extranjería de la Administración periférica del Estado o de las CCAA', ['13-10', '13-216'])],
    ['<b>Electoral (8.5)</b>', `Actos de las ${Rq('Juntas Electorales de Zona', ['13-ia-102'])} y proclamación de candidaturas y candidatos`],
    ['<b>Autorizaciones (8.6)</b>', `${Rq('Entrada en domicilios para la ejecución forzosa de actos de la Administración', ['13-62', '13-148', '13-293', '13-317'])} (salvo protección de menores) · ${Rq('medidas sanitarias urgentes que limiten derechos fundamentales de particulares identificados', ['13-38'])} · ${Rq('entrada e inspección acordada por la CNMC', ['13-77', '13-231'])} · ${Rq('entrada acordada por la Administración Tributaria', ['13-ia-63'])}`],
    ['<b>≠ Juzgados CENTRALES (art. 9)</b>', `${Rq('Inadmisión de peticiones de asilo político (1.ª instancia)', ['13-78', '13-183', '13-323', '13-14'])} · ${Rq('disposiciones generales y actos de organismos y entidades estatales con competencia en todo el territorio', ['13-92', '13-118'])} · ${Rq('resoluciones del Comité Español de Disciplina Deportiva', ['13-259'])} · personal de Ministros y Secretarios de Estado (con excepciones) · responsabilidad patrimonial de Ministros y SE de hasta 30.050 €`]]));

  pon('Artículo 11 — Sala de la Audiencia', arbol('⭐ EX · Art. 11 — Sala de lo Contencioso de la AUDIENCIA NACIONAL', 'En única instancia (11.1):', [
    `a) ${Rq('disposiciones generales y actos de los Ministros y Secretarios de Estado', ['13-125', '13-155'])} (aunque haya informe o acuerdo del Consejo de Ministros) y su personal si es nacimiento o extinción de funcionarios de carrera · ${Rq('órganos centrales de Defensa: ascensos, orden y antigüedad en el escalafón y destinos', ['13-ia-76', '13-131'])}`,
    `b) actos de Ministros y Secretarios de Estado que ${Rq('rectifiquen en vía de recurso, fiscalización o tutela', ['13-ia-114'])} los de órganos con competencia en todo el territorio`,
    `c) ${Rq('convenios entre Administraciones públicas no atribuidos a los TSJ', ['13-41', '13-202'])}`,
    `e) actos de la ${Rq('Comisión de Vigilancia de Actividades de Financiación del Terrorismo', ['13-132'])} y prórroga de sus medidas`,
    `f) ${Rq('resoluciones del Tribunal Administrativo Central de Recursos Contractuales', ['13-157'])} (salvo el art. 10.1.k)`,
    'g) actos del Banco de España, la CNMV y el FROB (Ley 11/2015, de recuperación y resolución de entidades de crédito)',
    `h) ${Rq('recursos de la CNMC en defensa de la unidad de mercado', ['13-ia-65'])}`,
    `<b>11.2</b> ${Rq('apelaciones contra autos y sentencias de los Juzgados Centrales', ['13-329'])} y recursos de queja · <b>11.3</b> revisión de sentencias firmes de los Juzgados Centrales · <b>11.5</b> ${Rq('autorización del art. 122 ter pedida por la Agencia Española de Protección de Datos', ['13-167', '13-ia-44'])}`])
    + trampa(`NO es de la Audiencia Nacional: ${Rq('los actos y disposiciones del Consejo General del Poder Judicial', ['13-102'])} · de Defensa NO entran las retribuciones · la AEPD es el art. 122 TER (no 127 ter).`));

  pon('Artículo 19 — Legitimación', arbol('⭐ EX · Art. 19 — Legitimación', 'Están legitimados…', [
    'a) quienes tengan un derecho o interés legítimo',
    `b) ${Rq('corporaciones, asociaciones, sindicatos y grupos del art. 18 afectados o habilitados para defender derechos e intereses legítimos colectivos', ['13-ia-116'])}`,
    `c) ${Rq('la Administración del Estado, con derecho o interés legítimo, contra actos de las CCAA y sus organismos, de las entidades locales y de otras entidades no sometidas a su fiscalización', ['13-153'])}`,
    `d) ${Rq('la Administración de las CCAA, contra lo que afecte a su autonomía, del Estado, de otras Administraciones u organismos y de las entidades locales', ['13-128'])}`,
    `e) ${Rq('las Entidades locales territoriales, contra lo que afecte a su autonomía, del Estado, de las CCAA, de sus organismos y de otras entidades locales', ['13-ia-82'])}`,
    `f) ${Rq('el Ministerio Fiscal, para intervenir en los procesos que determine la Ley', ['13-75'])}`,
    `h) ${Rq('cualquier ciudadano, en ejercicio de la acción popular', ['13-165'])}, en los casos previstos por las leyes`,
    `i) igualdad de trato: además de los afectados (con su autorización), la Autoridad Independiente para la Igualdad de Trato, partidos, sindicatos, asociaciones de autónomos, de consumidores y de derechos humanos · intereses difusos: esas entidades · acoso sexual y discriminatorio: ${Rq('SOLO la persona acosada', ['13-100', '13-150'])}`,
    `j) LGTBI: además de los afectados (con autorización expresa), partidos, sindicatos, organizaciones empresariales, asociaciones de autónomos, ${Rq('de personas consumidoras y usuarias', ['13-261'])} y de defensa de las personas LGTBI · acoso por orientación o identidad sexual: ${Rq('SOLO la persona acosada', ['13-189', '13-349'])}`,
    `k) ${Rq('los sindicatos, en nombre e interés del personal funcionario y estatutario afiliado que lo autorice, recayendo en ellos los efectos', ['13-ia-32'])}`,
    `19.3 acciones de los vecinos en nombre de las entidades locales: ${Rq('legislación de régimen local', ['13-ia-103'])} · 19.4 contra decisiones de recursos especiales de contratación: AAPP y particulares, ${Rq('sin declaración de lesividad', ['13-135'])} · 19.5 resoluciones del Tribunal Administrativo del Deporte en dopaje: ${Rq('todas las personas del art. 40.4 de la LO de protección de la salud del deportista', ['13-ia-117'])}`]));

  pon('Artículo 48 —', flujo('⭐ EX · Art. 48 — Reclamación y remisión del expediente', [
    { et: '48.1', t: `El LAJ requiere el expediente al ${Rq('órgano autor del acto o disposición, o al que se impute la inactividad o vía de hecho', ['13-ia-124'])}, y le ordena los emplazamientos` },
    { et: '48.3', t: `Remisión en el plazo improrrogable de ${Rq('20 días', ['13-50', '13-72', '13-146', '13-301'])}, ${Rq('desde que la comunicación entra en el registro general del órgano requerido', ['13-99', '13-305'])}` },
    { et: '48.4', t: `${Rq('Completo, en soporte electrónico, foliado, autentificado y con índice autentificado', ['13-168'])} · identificando ${Rq('al órgano responsable del cumplimiento de la resolución judicial', ['13-ia-66'])} · si lo piden varios tribunales: copias electrónicas` },
    { et: '48.5', t: `Recurso iniciado por demanda: expediente de elaboración, a las partes ${Rq('5 días', ['13-54', '13-286'])} para alegaciones` },
    { et: '48.6', t: `Se excluyen, por resolución motivada, ${Rq('los documentos clasificados como secreto oficial', ['13-237', '13-334', '13-ia-55'])}` },
    { c: 'no', et: '48.7', t: `No llega completo: se reitera; si no se envía en 10 días → ${Rq('multa coercitiva de 300 a 1.200 €', ['13-51', '13-ia-93'])} a la autoridad o empleado responsable, ${Rq('reiterada cada 20 días', ['13-28', '13-248', '13-280', '13-344'])}` },
    { et: '48.8-10', t: `Contra el auto de multa: ${Rq('recurso de reposición', ['13-ia-52'])} · impagadas: ${Rq('vía judicial de apremio', ['13-233'])} · tras 3 multas: ${Rq('los hechos al Ministerio Fiscal, sin dejar de imponer multas', ['13-ia-48'])}` },
    { et: '48.11', t: `Remisión electrónica con ${Rq('sistemas de interoperabilidad', ['13-ia-67'])}, integrada en la gestión procesal` }]));

  pon('Artículo 74 —', flujo('⭐ EX · Art. 74 — Desistimiento', [
    { et: '74.1', t: `El recurrente puede ${Rq('desistir', ['13-268', '13-350'])} ${Rq('en cualquier momento anterior a la sentencia', ['13-65', '13-114', '13-296', '13-310'])}` },
    { et: '74.2', t: `Si desiste el representante: ${Rq('que lo ratifique el recurrente o esté autorizado', ['13-ia-17'])} · si desiste la Administración: testimonio del acuerdo del órgano competente` },
    { et: '74.3', t: `El LAJ da traslado a las demás partes (y al Fiscal en la acción popular) por ${Rq('5 días', ['13-ia-14'])}; si no se oponen → decreto de terminación y archivo` },
    { et: '74.5-6', t: `Varios recurrentes: ${Rq('continúa para los que no desistan', ['13-ia-5'])} · ${Rq('NO implica necesariamente la condena en costas', ['13-96', '13-186', '13-325', '13-ia-126'])}` },
    { et: '74.7', t: `Desistió porque la Administración reconoció sus pretensiones y luego las revoca: puede pedir que siga; alegaciones en ${Rq('10 días', ['13-85'])}` },
    { et: '74.8', t: `Desistida la apelación o casación: ${Rq('decreto, archivo y devolución de las actuaciones', ['13-ia-18'])}` }]));

  pon('Artículo 105 —', arbol('⭐ EX · Art. 105 — Imposibilidad de ejecución', Rq('No puede suspenderse el cumplimiento ni declararse la inejecución del fallo', ['13-269', '13-ia-60']), [
    `Imposibilidad material o legal: el órgano obligado lo comunica al juez ${Rq('a través del representante procesal de la Administración', ['13-ia-127'])}, en el plazo del art. 104.2 → el juez, oídas las partes, decide y fija la indemnización si procede`,
    `Causas para expropiar los derechos reconocidos en sentencia firme (105.3): ${Rq('peligro cierto de alteración grave del libre ejercicio de derechos y libertades · temor fundado de guerra · quebranto de la integridad del territorio nacional', ['13-23', '13-113', '13-275', '13-309'])}`,
    `Las declara ${Rq('el Gobierno de la Nación; o el Consejo de Gobierno de la CA si es el peligro para los derechos y el acto es de su Administración o de sus entidades locales', ['13-ia-36'])}, en los ${Rq('2 meses siguientes a la comunicación de la sentencia', ['13-ia-20'])}`]));

  pon('Artículo 110 —', cuadro('⭐ EX · Arts. 103, 104, 109 y 110 — Ejecución de sentencias', ['', 'DATO'], [
    ['<b>Quién ejecuta (103.1)</b>', `${Rq('Exclusivamente los juzgados y tribunales de este orden', ['13-228'])}; la ejerce ${Rq('el que conoció del asunto en primera o única instancia', ['13-ia-3', '13-ia-9'])}`],
    ['<b>Obligados (103.2 y 3)</b>', `Las partes, ${Rq('en la forma y términos que consigne la sentencia', ['13-ia-108'])} · ${Rq('todas las personas y entidades públicas y privadas', ['13-101'])} deben colaborar`],
    ['<b>Actos para eludirla (103.4 y 5)</b>', `${Rq('Nulos de pleno derecho', ['13-9', '13-20', '13-272'])}; los declara, a instancia de parte, ${Rq('el órgano al que corresponda la ejecución', ['13-112'])}, ${Rq('por los trámites del art. 109.2 y 3', ['13-ia-135'])}`],
    ['<b>Comunicación (104.1)</b>', `Firme la sentencia, el LAJ la comunica en ${Rq('10 días', ['13-91', '13-207', '13-208', '13-209', '13-333'])} al órgano responsable de su cumplimiento`],
    ['<b>Ejecución forzosa (104.2 y 3)</b>', `Pasados ${Rq('2 meses', ['13-3', '13-238', '13-335'])} desde la comunicación (o el plazo fijado en la sentencia), cualquier parte o afectado puede instarla · la sentencia puede ${Rq('fijar un plazo inferior si los 2 meses la hacen ineficaz o causan grave perjuicio', ['13-ia-19'])}`],
    ['<b>Incidente de ejecución (109)</b>', `Lo promueven ${Rq('la Administración, las demás partes y los afectados por el fallo', ['13-195', '13-267'])}, mientras no conste la total ejecución y sin contrariar el fallo (${Rq('nunca para modificar su contenido', ['13-ia-91'])}): a) órgano responsable · b) plazo máximo · c) ${Rq('medios y procedimiento a seguir', ['13-342', '13-246'])} · alegaciones en plazo común ${Rq('no superior a 20 días', ['13-21', '13-260', '13-273'])} · auto en ${Rq('10 días', ['13-ia-140'])}`],
    ['<b>Extensión de efectos (110)</b>', `Solo en ${Rq('materia tributaria, de personal y de unidad de mercado', ['13-190', '13-251', '13-255', '13-347'])}, para situaciones jurídicas individualizadas: a) idéntica situación · b) mismo juez competente por territorio · c) pedirla en ${Rq('1 año desde la última notificación a las partes', ['13-ia-98'])} · se pide ${Rq('directamente al órgano que dictó la resolución', ['13-ia-133'])} · el LAJ pide antecedentes e informe ${Rq('en los 20 días siguientes', ['13-ia-38'])}; alegaciones 5 días; auto · se desestima si hay cosa juzgada, doctrina contraria a la jurisprudencia del TS o de los TSJ (art. 99) o resolución consentida y firme · si hay revisión o casación en interés de ley pendiente: ${Rq('queda en suspenso', ['13-ia-89'])} · recursos: ${Rq('reglas generales del art. 80', ['13-ia-134'])}`]]));

  pon('Artículo 122 —', arbol('⭐ EX · Art. 122 — Prohibición o modificación de reuniones', 'Promotores que no aceptan la prohibición o la modificación (LO reguladora del Derecho de Reunión)', [
    `Recurso ${Rq('dentro de las 48 horas siguientes a la notificación', ['13-149', '13-206', '13-266'])}; copia registrada a la autoridad gubernativa, que remite enseguida el expediente`,
    `El LAJ, en el plazo improrrogable de ${Rq('4 días', ['13-210', '13-229', '13-264', '13-ia-100'])}, convoca a la Administración, al Ministerio Fiscal y a los recurrentes a una audiencia contradictoria; el tribunal ${Rq('resuelve sin ulterior recurso', ['13-ia-100'])}`,
    `La decisión ${Rq('solo puede mantener o revocar la prohibición o las modificaciones', ['13-ia-28'])}`]));

  pon('Artículo 116 —', flujo('⭐ EX · Art. 116 — Reclamación del expediente (derechos fundamentales)', [
    { et: '116.1', t: `El LAJ lo requiere ${Rq('el mismo día de la presentación o el siguiente', ['13-243', '13-351'])}, con carácter urgente → remisión en ${Rq('5 días', ['13-ia-74'])} desde el requerimiento, en soporte electrónico, con el apercibimiento del art. 48` },
    { et: '116.2', t: `Al remitirlo, la Administración emplaza a los interesados para comparecer como demandados en ${Rq('5 días', ['13-ia-68'])}` },
    { et: '116.3', t: `La Administración y los demandados pueden pedir ${Rq('la inadmisión del recurso y la comparecencia del art. 117.2', ['13-ia-75'])}` },
    { c: 'no', et: '116.4', t: `La falta de envío ${Rq('no suspende el curso de los autos', ['13-ia-27'])}` },
    { et: '116.5', t: `Si llega tarde: a las partes por ${Rq('48 horas', ['13-ia-39'])} para alegaciones, sin alterar el procedimiento` }]));

  return N.map(([c, h]) => [c, X.final(h)]);
};
