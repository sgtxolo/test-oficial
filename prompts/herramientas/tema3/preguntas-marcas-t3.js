// Tema 3 · preguntas nuevas para las marcas del temario subrayado (marcas-t3.tsv) que no tenían pregunta (pauta 15/10/2026):
//   · OFICIALES 3-392…: apartados con círculo EXOF / sello PREGUNTA EXAMEN sin oficial + fichas RECUERDA sin oficial (R10, R14, R21, R23, R26);
//   · IA 3-ia-1276…: apartados con asterisco (✱) sin ninguna pregunta (banco IA, importantes).
// Cita literal comprobada contra prompts/temario-limpio/tema3/oficial-paginas.txt (el OFICIAL, nunca mi PDF subrayado).
// Uso: node prompts/herramientas/tema3/preguntas-marcas-t3.js [--json salida.json]   (sin argumento inserta en test-oficial-conocimiento.html)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html'), BS = String.fromCharCode(92), L = 'ABCD';
const NOM = { tue: ['Tratado de la Unión Europea', 'del TUE'], tfue: ['Tratado de Funcionamiento de la Unión Europea', 'del TFUE'] };
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const q = (k, a, m, r, e, o, cita, p) => ({ k, a, m, r, e, o, cita, p });
const PES = 'Política exterior y de seguridad común', INS = 'Disposiciones institucionales', LIB = 'Espacio de libertad, seguridad y justicia';
// ---------- OFICIALES (EXOF / EXAMEN / R sin oficial) ----------
const OF = [
q('tue', 'art. 5.2', 'EXOF', 'Principios que delimitan las competencias de la Unión', 'En virtud del principio de atribución, la Unión actúa dentro de los límites de las competencias que le atribuyen los Estados miembros en los Tratados para lograr los objetivos que éstos determinan. Toda competencia no atribuida a la Unión en los Tratados corresponde a:',
  ['Los Estados miembros.', 'La Unión, con carácter subsidiario.', 'Las instituciones de la Unión, por delegación.', 'Los Estados miembros, previa autorización del Consejo.'],
  'Toda competencia no atribuida a la Unión en los Tratados corresponde a los Estados miembros', 'Lo no atribuido a la Unión queda en manos de los Estados miembros.'),
q('tue', 'art. 5.4', 'EXOF', 'Principios que delimitan las competencias de la Unión', 'En virtud del principio de proporcionalidad, el contenido y la forma de la acción de la Unión no excederán de lo necesario para alcanzar:',
  ['Los objetivos de los Tratados.', 'Los objetivos de los Estados miembros.', 'Las competencias que les atribuyen los Estados miembros.', 'Los fines que fije la Comisión.'],
  'el contenido y la forma de la acción de la Unión no excederán de lo necesario para alcanzar los objetivos de los Tratados', 'Proporcionalidad: la acción de la Unión no va más allá de lo necesario para los objetivos de los Tratados.'),
q('tue', 'art. 10.3', 'EXOF', 'Principios democráticos', 'Todo ciudadano tiene derecho a participar en la vida democrática de la Unión. Las decisiones serán tomadas de la forma:',
  ['Más abierta y próxima posible a los ciudadanos.', 'Más transparente y próxima posible a los ciudadanos.', 'Más abierta y directa posible para los ciudadanos.', 'Más amplia y próxima posible a los Estados miembros.'],
  'Las decisiones serán tomadas de la forma más abierta y próxima posible a los ciudadanos', 'Se repite la fórmula del primer artículo: «abierta y próxima a los ciudadanos».'),
q('tue', 'art. 16.6', 'EXOF', 'El Consejo', 'El Consejo de Asuntos Generales velará por la coherencia de los trabajos de las diferentes formaciones del Consejo. Preparará las reuniones del Consejo Europeo y garantizará su actuación subsiguiente, en contacto con:',
  ['El Presidente del Consejo Europeo y la Comisión.', 'El Alto Representante y la Comisión.', 'El Presidente del Parlamento Europeo y el Alto Representante.', 'El Presidente del Consejo Europeo y el Parlamento Europeo.'],
  'en contacto con el Presidente del Consejo Europeo y la Comisión', 'El Consejo de Asuntos Generales prepara las reuniones del Consejo Europeo.'),
q('tue', 'R10 · art. 19.1', 'R10', 'Tribunal de Justicia de la Unión Europea', 'El Tribunal de Justicia de la Unión Europea comprenderá:',
  ['El Tribunal de Justicia, el Tribunal General y los tribunales especializados.', 'El Tribunal de Justicia, el Tribunal General y el Tribunal de Cuentas.', 'El Tribunal de Justicia y el Tribunal General, exclusivamente.', 'El Tribunal de Justicia, el Tribunal de Primera Instancia y los tribunales especializados.'],
  'comprenderá el Tribunal de Justicia, el Tribunal General y los tribunales especializados', 'Ficha RECUERDA R10.'),
q('tue', 'art. 19.3', 'EXOF', 'Tribunal de Justicia de la Unión Europea', 'El Tribunal de Justicia de la Unión Europea se pronunciará, de conformidad con los Tratados, con carácter prejudicial, a petición de los órganos jurisdiccionales nacionales, sobre:',
  ['La interpretación del Derecho de la Unión o sobre la validez de los actos adoptados por las instituciones.', 'La interpretación del Derecho nacional o sobre la validez de los actos adoptados por las instituciones.', 'La interpretación de los Tratados, exclusivamente, sin que pueda examinar la validez de los actos.', 'La validez de los actos adoptados por los Estados miembros y por las instituciones de la Unión.'],
  'con carácter prejudicial, a petición de los órganos jurisdiccionales nacionales, sobre la interpretación del Derecho de la Unión o sobre la validez de los actos adoptados por las instituciones', 'La cuestión prejudicial versa sobre interpretación del Derecho de la Unión y validez de los actos de las instituciones.'),
q('tue', 'art. 21.2.d', 'EXOF', 'Principios y objetivos de la acción exterior', 'La Unión definirá y ejecutará políticas comunes y acciones y se esforzará por lograr un alto grado de cooperación en todos los ámbitos de las relaciones internacionales con el fin de apoyar el desarrollo sostenible en los planos económico, social y medioambiental de los países en desarrollo, con el objetivo fundamental de:',
  ['Erradicar la pobreza.', 'Reducir la deuda exterior.', 'Garantizar la ayuda humanitaria.', 'Fomentar su integración en la economía mundial.'],
  'con el objetivo fundamental de erradicar la pobreza', 'Objetivo fundamental del apoyo al desarrollo sostenible: erradicar la pobreza.'),
q('tue', 'art. 21.2.e', 'EXOF', 'Principios y objetivos de la acción exterior', 'La Unión definirá y ejecutará políticas comunes y acciones con el fin de fomentar la integración de todos los países en la economía mundial, entre otras cosas mediante:',
  ['La supresión progresiva de los obstáculos al comercio internacional.', 'La supresión inmediata de los obstáculos al comercio internacional.', 'La creación de zonas de libre comercio con terceros países.', 'La armonización de las políticas arancelarias de los Estados miembros.'],
  'fomentar la integración de todos los países en la economía mundial, entre otras cosas mediante la supresión progresiva de los obstáculos al comercio internacional', 'Integración en la economía mundial mediante la supresión progresiva de obstáculos al comercio.'),
q('tue', 'art. 31.2', 'EXOF', PES + '. Disposiciones comunes', 'Como excepción a la regla general de la unanimidad en la política exterior y de seguridad común, el Consejo adoptará por mayoría cualificada la designación de:',
  ['Un representante especial.', 'Un Alto Representante adjunto.', 'Un Vicepresidente de la Comisión.', 'Un representante permanente ante el Comité Político y de Seguridad.'],
  'la designación de un representante especial de conformidad con el artículo', 'El representante especial se designa por mayoría cualificada.'),
q('tue', 'R14 · art. 46.5', 'R14', PES + '. Cooperación estructurada permanente', 'Si un Estado miembro participante decide abandonar la cooperación estructurada permanente, notificará su decisión al Consejo, que:',
  ['Tomará nota de que ha finalizado la participación de ese Estado miembro.', 'Votará por unanimidad su salida de la cooperación.', 'Informará al Parlamento Europeo para que la apruebe.', 'Pedirá a la Comisión un dictamen sobre su salida.'],
  'notificará su decisión al Consejo, que tomará nota de que ha finalizado la participación de ese Estado miembro', 'Ficha RECUERDA R14.'),
q('tfue', 'art. 67.1', 'EXOF', LIB + '. Disposiciones generales', 'La Unión constituye un espacio de libertad, seguridad y justicia dentro del respeto de:',
  ['Los derechos fundamentales y de los distintos sistemas y tradiciones jurídicos de los Estados miembros.', 'Los derechos humanos y de los distintos sistemas y tradiciones jurídicos de los Estados miembros.', 'Los derechos fundamentales y de las distintas tradiciones constitucionales de los Estados miembros.', 'Los derechos fundamentales y del sistema jurídico común de los Estados miembros.'],
  'dentro del respeto de los derechos fundamentales y de los distintos sistemas y tradiciones jurídicos de los Estados miembros', 'La fórmula completa incluye derechos fundamentales y sistemas y tradiciones jurídicos de los Estados.'),
q('tfue', 'art. 67.3', 'EXOF', LIB + '. Disposiciones generales', 'La Unión se esforzará por garantizar un nivel elevado de seguridad mediante medidas de prevención de la delincuencia, el racismo y la xenofobia y de lucha en contra de ellos, medidas de coordinación y cooperación entre autoridades policiales y judiciales y otras autoridades competentes, así como mediante el reconocimiento mutuo de las resoluciones judiciales en materia penal y, si es necesario, mediante:',
  ['La aproximación de las legislaciones penales.', 'La armonización de los procedimientos penales.', 'La unificación de los códigos penales.', 'La creación de un espacio judicial común.'],
  'si es necesario, mediante la aproximación de las legislaciones penales', 'La aproximación de legislaciones penales solo «si es necesario».'),
q('tfue', 'art. 77.1.a', 'EXOF', LIB + '. Controles en las fronteras', 'La Unión desarrollará una política que tendrá por objetivo garantizar la ausencia total de controles de las personas, sea cual sea su nacionalidad, cuando crucen:',
  ['Las fronteras interiores.', 'Las fronteras exteriores.', 'Las fronteras de los Estados que apliquen el acervo de Schengen.', 'Las fronteras de cualquier Estado miembro.'],
  'garantizar la ausencia total de controles de las personas, sea cual sea su nacionalidad, cuando crucen las fronteras interiores', 'Ausencia total de controles en las fronteras interiores.'),
q('tfue', 'art. 77.1.c', 'EXOF', LIB + '. Controles en las fronteras', 'La Unión desarrollará una política que tendrá por objetivo instaurar progresivamente un sistema integrado de gestión de:',
  ['Las fronteras exteriores.', 'Las fronteras interiores.', 'Los flujos migratorios.', 'Los controles policiales.'],
  'instaurar progresivamente un sistema integrado de gestión de las fronteras exteriores', 'Sistema integrado de gestión de las fronteras exteriores.'),
q('tfue', 'art. 238.3', 'EXOF', INS + '. El Consejo', 'Cuando no todos los miembros del Consejo participen en la votación, la mayoría cualificada se definirá como un mínimo del 55 % de los miembros del Consejo que represente a Estados miembros participantes que reúnan como mínimo el 65 % de la población de dichos Estados. Una minoría de bloqueo estará compuesta al menos por el número mínimo de miembros del Consejo que represente:',
  ['Más del 35 % de la población de los Estados miembros participantes, más un miembro.', 'Más del 45 % de la población de los Estados miembros participantes, más un miembro.', 'Más del 35 % de la población de la Unión, más dos miembros.', 'Más del 35 % de los Estados miembros participantes, más un miembro.'],
  'que represente más del 35 % de la población de los Estados miembros participantes, más un miembro', 'La minoría de bloqueo se calcula sobre la población de los Estados participantes.'),
q('tfue', 'R21 · art. 223.2', 'R21', INS + '. Parlamento Europeo', 'El Parlamento Europeo establecerá mediante reglamentos adoptados por propia iniciativa, con arreglo a un procedimiento legislativo especial, el estatuto y las condiciones generales de ejercicio de las funciones de sus miembros:',
  ['Previo dictamen de la Comisión y con la aprobación del Consejo.', 'Previo dictamen del Consejo y con la aprobación de la Comisión.', 'Previo dictamen de la Comisión y con la aprobación del Consejo Europeo.', 'Previa consulta al Tribunal de Justicia y con la aprobación del Consejo.'],
  'el estatuto y las condiciones generales de ejercicio de las funciones de sus miembros, previo dictamen de la Comisión y con la aprobación del Consejo', 'Ficha RECUERDA R21.'),
q('tfue', 'R23 · art. 237', 'R23', INS + '. El Consejo', 'El Consejo se reunirá por convocatoria de su Presidente, a iniciativa de éste:',
  ['De uno de sus miembros o de la Comisión.', 'Del Consejo Europeo o de la Comisión.', 'Del Parlamento Europeo o de la Comisión.', 'De la mayoría de sus miembros o del Alto Representante.'],
  'El Consejo se reunirá por convocatoria de su Presidente, a iniciativa de éste, de uno de sus miembros o de la Comisión', 'Ficha RECUERDA R23.'),
q('tfue', 'R26 · art. 267', 'R26', INS + '. Tribunal de Justicia de la Unión Europea', 'El Tribunal de Justicia de la Unión Europea será competente para pronunciarse, con carácter prejudicial:',
  ['Sobre la interpretación de los Tratados y sobre la validez e interpretación de los actos adoptados por las instituciones, órganos u organismos de la Unión.', 'Sobre la interpretación de los Tratados y sobre la validez de los actos adoptados por las instituciones de los Estados miembros.', 'Sobre la interpretación de los Tratados, exclusivamente, y no sobre los actos de los organismos de la Unión.', 'Sobre la validez e interpretación del Derecho nacional y de los actos de las instituciones de la Unión.'],
  'con carácter prejudicial: a) sobre la interpretación de los Tratados; b) sobre la validez e interpretación de los actos adoptados por las instituciones, órganos u organismos de la Unión', 'Ficha RECUERDA R26 (y círculo EXOF del temario).'),
];
// ---------- IA (asteriscos sin ninguna pregunta) ----------
const IA = [
q('tue', 'art. 12', '*', 'Parlamentos nacionales', 'Los Parlamentos nacionales contribuirán activamente al buen funcionamiento de la Unión. En el marco del espacio de libertad, seguridad y justicia, participarán en los mecanismos de evaluación de la aplicación de las políticas de la Unión en dicho espacio y estarán asociados al control político de Europol y a la evaluación de las actividades de:',
  ['Eurojust.', 'Frontex.', 'La Fiscalía Europea.', 'La Agencia Europea de Defensa.'],
  'estarán asociados al control político de Europol y a la evaluación de las actividades de Eurojust', 'Parlamentos nacionales: control político de Europol y evaluación de Eurojust.'),
q('tue', 'art. 16.7', '*', 'El Consejo', 'Un Comité de Representantes Permanentes de los Gobiernos de los Estados miembros (COREPER) se encargará de:',
  ['Preparar los trabajos del Consejo.', 'Ejecutar las decisiones del Consejo Europeo.', 'Preparar los trabajos del Consejo Europeo.', 'Coordinar los trabajos de la Comisión.'],
  'se encargará de preparar los trabajos del Consejo', 'El COREPER prepara los trabajos del Consejo.'),
q('tue', 'art. 17.6', '*', 'La Comisión', 'El Presidente de la Comisión determinará la organización interna de la Comisión velando por la coherencia, eficacia y colegialidad de su actuación y nombrará Vicepresidentes:',
  ['Distintos del Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad, de entre los miembros de la Comisión.', 'Incluido el Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad, de entre los miembros de la Comisión.', 'Distintos del Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad, previa aprobación del Parlamento Europeo.', 'Distintos del Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad, a propuesta del Consejo Europeo.'],
  'nombrará Vicepresidentes, distintos del Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad, de entre los miembros de la Comisión', 'Los Vicepresidentes los nombra el Presidente de la Comisión, de entre los miembros, sin contar al Alto Representante.'),
q('tue', 'art. 25', '*', PES + '. Disposiciones comunes', 'La Unión dirigirá la política exterior y de seguridad común adoptando decisiones por las que se establezcan las acciones que va a realizar la Unión, las posiciones que va a adoptar la Unión y:',
  ['Las modalidades de ejecución de las decisiones relativas a las acciones y a las posiciones.', 'Los plazos de ejecución de las decisiones relativas a las acciones y a las posiciones.', 'Los órganos responsables de las decisiones relativas a las acciones y a las posiciones.', 'La financiación de las decisiones relativas a las acciones y a las posiciones.'],
  'las modalidades de ejecución de las decisiones contempladas en los incisos i) y ii)', 'Tres tipos de decisiones: acciones, posiciones y modalidades de ejecución.'),
q('tue', 'art. 27.1', '*', PES + '. Disposiciones comunes', 'El Alto Representante, que presidirá el Consejo de Asuntos Exteriores, contribuirá con sus propuestas a elaborar la política exterior y de seguridad común y se encargará de ejecutar las decisiones adoptadas por:',
  ['El Consejo Europeo y el Consejo.', 'El Consejo y la Comisión.', 'El Consejo Europeo y el Parlamento Europeo.', 'El Consejo Europeo, el Consejo y la Comisión.'],
  'se encargará de ejecutar las decisiones adoptadas por el Consejo Europeo y el Consejo', 'Ejecuta las decisiones del Consejo Europeo y del Consejo.'),
q('tue', 'art. 34.1', '*', PES + '. Disposiciones comunes', 'Los Estados miembros coordinarán su acción en las organizaciones internacionales y con ocasión de las conferencias internacionales, y defenderán en esos foros las posiciones de la Unión. Organizará dicha coordinación:',
  ['El Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad.', 'La Comisión.', 'El Consejo de Asuntos Exteriores.', 'El Presidente del Consejo Europeo.'],
  'El Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad organizará dicha coordinación', 'La coordinación en foros internacionales corresponde al Alto Representante.'),
q('tue', 'art. 41.3', '*', PES + '. Financiación', 'Los preparativos de las misiones que no se imputen al presupuesto de la Unión se financiarán mediante un fondo inicial constituido por contribuciones de los Estados miembros. Las decisiones que establezcan las modalidades de constitución, de gestión y de control financiero del fondo las adoptará el Consejo, a propuesta del Alto Representante:',
  ['Por mayoría cualificada.', 'Por unanimidad.', 'Por mayoría simple.', 'Por mayoría cualificada, previa aprobación del Parlamento Europeo.'],
  'El Consejo adoptará por mayoría cualificada, a propuesta del Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad, las decisiones que establezcan', 'Mayoría cualificada y propuesta del Alto Representante.'),
q('tfue', 'art. 45.3', '*', 'Libre circulación de personas, servicios y capitales. Trabajadores', 'Sin perjuicio de las limitaciones justificadas por razones de orden público, seguridad y salud públicas, la libre circulación de los trabajadores implicará el derecho de permanecer en el territorio de un Estado miembro después de haber ejercido en él un empleo, en las condiciones previstas en los reglamentos establecidos por:',
  ['La Comisión.', 'El Consejo.', 'El Parlamento Europeo y el Consejo.', 'Cada Estado miembro.'],
  'en las condiciones previstas en los reglamentos establecidos por la Comisión', 'Esos reglamentos los establece la Comisión.'),
q('tfue', 'art. 82.1', '*', LIB + '. Cooperación judicial en materia penal', 'En materia de cooperación judicial penal, el Parlamento Europeo y el Consejo adoptarán medidas tendentes a prevenir y resolver los conflictos de jurisdicción entre los Estados miembros con arreglo:',
  ['Al procedimiento legislativo ordinario.', 'Al procedimiento legislativo especial.', 'A un procedimiento de decisión por unanimidad del Consejo.', 'Al procedimiento de cooperación reforzada.'],
  'El Parlamento Europeo y el Consejo adoptarán, con arreglo al procedimiento legislativo ordinario, medidas tendentes a', 'Procedimiento legislativo ordinario.'),
q('tfue', 'art. 224', '*', INS + '. Parlamento Europeo', 'El Parlamento Europeo y el Consejo, con arreglo al procedimiento legislativo ordinario, establecerán mediante reglamentos el estatuto de los:',
  ['Partidos políticos a escala europea.', 'Grupos políticos del Parlamento Europeo.', 'Diputados al Parlamento Europeo.', 'Partidos políticos nacionales de los Estados miembros.'],
  'establecerán mediante reglamentos el estatuto de los partidos políticos a escala europea', 'Estatuto de los partidos políticos europeos: reglamentos por procedimiento ordinario.'),
q('tfue', 'art. 236', '*', INS + '. Consejo Europeo', 'El Consejo Europeo adoptará por mayoría cualificada una decisión relativa a la presidencia de las formaciones del Consejo, con excepción de la de:',
  ['Asuntos Exteriores.', 'Asuntos Generales.', 'Asuntos Económicos y Financieros.', 'Justicia y Asuntos de Interior.'],
  'una decisión relativa a la presidencia de las formaciones del Consejo, con excepción de la de Asuntos Exteriores', 'La presidencia de Asuntos Exteriores es la excepción (la ejerce el Alto Representante).'),
q('tfue', 'art. 238.1', '*', INS + '. El Consejo', 'Cuando deba adoptar un acuerdo por mayoría simple, el Consejo se pronunciará por:',
  ['Mayoría de los miembros que lo componen.', 'Mayoría de los miembros presentes o representados.', 'Mayoría de los votos emitidos.', 'Mayoría de los Estados miembros que represente a la mayoría de la población.'],
  'Cuando deba adoptar un acuerdo por mayoría simple, el Consejo se pronunciará por mayoría de los miembros que lo componen', 'Mayoría simple = mayoría de los miembros que lo componen.'),
q('tfue', 'art. 244', '*', INS + '. La Comisión', 'Los miembros de la Comisión serán elegidos mediante un sistema de rotación establecido por unanimidad por:',
  ['El Consejo Europeo.', 'El Consejo.', 'El Parlamento Europeo.', 'El Presidente de la Comisión.'],
  'serán elegidos mediante un sistema de rotación establecido por unanimidad por el Consejo Europeo', 'El sistema de rotación lo fija el Consejo Europeo por unanimidad.'),
q('tfue', 'art. 245', '*', INS + '. La Comisión', 'Los miembros de la Comisión no podrán, mientras dure su mandato, ejercer ninguna otra actividad profesional:',
  ['Retribuida o no.', 'Retribuida, salvo la docente.', 'Retribuida, salvo autorización del Colegio de Comisarios.', 'Distinta de la docente o investigadora.'],
  'ejercer ninguna otra actividad profesional, retribuida o no', 'La incompatibilidad alcanza a cualquier actividad profesional, retribuida o no.'),
q('tfue', 'art. 302.1', '*', INS + '. Comité Económico y Social', 'Los miembros del Comité Económico y Social serán nombrados para un período de:',
  ['Cinco años, y su mandato será renovable.', 'Cinco años, sin posibilidad de renovación.', 'Dos años y medio, y su mandato será renovable.', 'Seis años, y su mandato será renovable.'],
  'Los miembros del Comité serán nombrados para un período de cinco años', 'Cinco años, renovable.'),
];
// ---------- generación ----------
const gen = (Q, idf, extra) => { const uso = [0, 0, 0, 0];
  return Q.map((x, i) => {
    const ops = x.o.slice(), ok = ops.shift(); const c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++;
    const marca = /^R\d/.test(x.m) ? `ficha RECUERDA ${x.m} del temario` : x.m === '*' ? 'asterisco del temario: pregunta de la academia' : 'círculo EXOF / sello PREGUNTA EXAMEN del temario';
    const art = x.a.replace(/^R\d+ · /, '');
    const expl = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ok.replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${art} ${NOM[x.k][1]}</span> dispone: <span class="ref-concepto">"${esc(x.cita)}"</span>. ${esc(x.p)} <em style="color:var(--texto-gris)">(${extra ? 'Pregunta generada por IA · ' : ''}${marca})</em>`;
    return Object.assign({ id: idf(i), pregunta: `${NOM[x.k][0]}. ${x.r}. ${x.e}`, opciones: ops, correcta: c }, extra ? { dificultad: 'media' } : {}, { explicacion: expl, apartado: NOM[x.k][0] }); }); };
const outOF = gen(OF, i => '3-' + (392 + i), false), outIA = gen(IA, i => '3-ia-' + (1276 + i), true);
const TXT = nrm(fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema3', 'oficial-paginas.txt'), 'utf8').replace(/\r\n?/g, '\n'));
const malas = [...OF, ...IA].filter(x => !TXT.includes(nrm(x.cita))).map(x => x.a);
const dup = [...outOF, ...outIA].filter(x => new Set(x.opciones.map(nrm)).size < 4).map(x => x.id);
const larga = [...outOF, ...outIA].filter(x => { const l = x.opciones.map(o => o.length); return l[x.correcta] === Math.max(...l) && l.filter(v => v === l[x.correcta]).length === 1; }).map(x => x.id);
console.log(outOF.length, 'oficiales +', outIA.length, 'IA', malas.length ? '✗ citas no literales: ' + malas.join(', ') : '✓ citas literales', dup.length ? '✗ opciones repetidas ' + dup : '', `· correcta la más larga en ${larga.length}/${outOF.length + outIA.length} (${larga.join(' ')})`);
if (process.argv[2] === '--json') { fs.writeFileSync(process.argv[3], JSON.stringify({ of: outOF, ia: outIA }, null, 1)); process.exit(0); }
if (malas.length || dup.length) process.exit(1);
let s = fs.readFileSync(FILE, 'utf8');
const fin = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) throw new Error('no está ' + id); let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return j + 1; };
if (s.includes('{"id":"3-392"')) { console.log('ya insertadas'); process.exit(0); }
let j = fin('3-391'); s = s.slice(0, j) + ',' + outOF.map(x => JSON.stringify(x)).join(',') + s.slice(j);
j = fin('3-ia-1275'); s = s.slice(0, j) + ',\n' + outIA.map(x => JSON.stringify(x)).join(',\n') + s.slice(j);
fs.writeFileSync(FILE, s); console.log('insertadas', outOF.length, 'oficiales (3-392…3-' + (391 + outOF.length) + ') y', outIA.length, 'IA (3-ia-1276…3-ia-' + (1275 + outIA.length) + ')');
