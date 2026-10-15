// Esquemas visuales del Tema 5 (SIS, VIS, Código de visados, Rgto. 977/2011, Eurodac y Orden AEC/240/2011).
// Uso: node prompts/herramientas/visuales-t5.js   (inserta los cuadros debajo de las fichas del esquema normal)
// Todo el contenido sale de los artículos subrayados (citas literales de las preguntas del tema).
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const V = []; const v = (despues, html) => V.push([despues, html]);

// ───────────── SIS ─────────────
v('Artículo 4 — Arquitectura técnica y funcionamiento del SIS', arbol('Arquitectura técnica del SIS (art. 4)', `${D('SIS')}`, [
  { t: `${R('SIS Central')}`, sub: [`${R('CS-SIS')}: unidad de apoyo técnico (base de datos del SIS + copia de seguridad)`, `${R('NI-SIS')}: interfaz nacional uniforme`] },
  `${R('N.SIS')}: un sistema nacional en cada Estado miembro`,
  `Infraestructura de comunicación entre la ${D('CS-SIS')} y la ${D('NI-SIS')}`]));

// ───────────── VIS ─────────────
v('Artículo 23 — Período de conservación de los datos almacenados', tabla('Conservación de los expedientes del VIS (art. 23): 5 años máximo', ['Supuesto', 'El período de cinco años empieza…'], [
  { l: 'Se ha expedido un visado o permiso', c: 'o', h: [{ p: 'EXPIRACIÓN', c: 'v', t: `en la fecha de ${R('expiración del visado, del visado de larga duración o del permiso de residencia')}` }] },
  { l: 'Se ha prorrogado o renovado', c: 'o', h: [{ p: 'NUEVA EXPIRACIÓN', c: 'v', t: `en la ${R('nueva fecha de expiración')}` }] },
  { l: 'Se ha denegado, retirado o anulado', c: 'o', h: [{ p: 'DECISIÓN', c: 'v', t: `en la fecha de ${R('la decisión de la autoridad responsable')}` }] },
  { l: 'Solicitud retirada y archivada', c: 'o', h: [{ p: 'CREACIÓN', c: 'v', t: `en la fecha de ${R('creación del expediente de solicitud en el VIS')}` }] },
  { l: 'Al expirar el período', c: 'o', h: [{ p: 'AUTOMÁTICO', c: 'n', t: `el VIS ${R('suprime automáticamente')} el expediente y los vínculos` }] }]));
v('Artículo 26 — Gestión operativa', cols('Gestión operativa: ¿quién ejecuta el presupuesto y los contratos? (VIS art. 26 ≠ Eurodac art. 4)', [
  { t: 'VIS (art. 26.2)', l: [`${R('eu-LISA')}: supervisión · seguridad · coordinación con el proveedor`, `${R('eu-LISA')}: ejecución del presupuesto · adquisición y renovación · cuestiones contractuales`, `Funcionamiento ${P('24 horas, 7 días a la semana')}`] },
  { t: 'Eurodac (art. 4.3-4.4)', l: [`${R('eu-LISA')}: supervisión · seguridad · coordinación con el proveedor`, `${R('La Comisión')}: el resto de funciones de la infraestructura (presupuesto, adquisición y renovación, contratos)`, `Funcionamiento ${P('24 horas, 7 días a la semana')}`] }]));
v('Artículo 32 — Seguridad de los datos', arbol('Medidas de seguridad de cada Estado miembro (art. 32.2)', `${D('Plan de seguridad')}: ${R('controles')}`, [
  'a) protección física (planes de emergencia para infraestructuras críticas) · b) entrada a la instalación',
  'c) soportes de datos · d) almacenamiento · e) introducción de datos',
  'f) acceso a los datos · g) perfiles del personal · h) comunicación',
  `i) registro de datos · j) transporte (criptografiado) · j bis) recuperación tras interrupción · j ter) fiabilidad · k) ${R('control interno')}`]));
v('Artículo 33 — Responsabilidad', cols('Responsabilidad e indemnización (art. 33)', [
  { t: 'Quién indemniza', l: [`Daño por operación ilegal o acto incompatible de un ${R('Estado miembro')}: indemniza ${R('ese Estado')}`, `Acto de una institución, órgano u organismo de la Unión: indemniza ${R('la institución, órgano u organismo')}`, 'Exención total o parcial si demuestra que no es responsable del hecho'] },
  { t: 'Reclamación', l: [`Contra un Estado: ${R('Derecho nacional del Estado demandado')}`, `Contra la Unión: ${R('condiciones de los Tratados')}`, `Daño al VIS: responde el Estado, ${K('salvo que')} eu-LISA u otro Estado no adoptara medidas`] }]));
v('Artículo 34 — Conservación de registros', plazos('Registros del VIS (art. 34)', [
  ['1 año', `Los registros se suprimen ${R('transcurrido un año desde la expiración del período de retención')} del art. 23 (salvo procedimientos de supervisión en curso)`],
  ['Solo para', `Supervisar la ${R('admisibilidad del tratamiento')} y garantizar la ${R('seguridad de los datos')}`]]));
v('Artículo 45 quater — Acceso a los datos para su verificación por los transportistas', flujo('Verificación por los transportistas (art. 45 quater)', [
  { et: '1', t: `${R('Compañías aéreas, transportistas marítimos y transportistas internacionales de grupos en autocar')} consultan el VIS` },
  { et: '2', t: `Consulta a través de la ${R('pasarela para los transportistas')} ${P('antes del embarque')} de los pasajeros` },
  { et: '3', t: `Respuesta ${R('«OK / NO OK»')} (no es una decisión de autorización o denegación de la entrada)` },
  { et: '4', t: `Base de datos ${R('separada, solo de lectura')}, actualizada ${P('diariamente')}; ${D('eu-LISA')} responsable de su seguridad` },
  { et: '5', t: `Autocares: verificación ${K('facultativa')} los primeros ${P('18 meses')} · registros conservados ${P('2 años')}` }]));
v('Artículo 48 bis — Ejercicio de la delegación', plazos('Actos delegados del VIS (art. 48 bis)', [
  ['5 años', 'Delegación a la Comisión desde el 2 de agosto de 2021, prorrogable tácitamente'],
  ['9 meses', 'Informe de la Comisión sobre la delegación (antes de acabar los 5 años)'],
  ['3 meses', 'Oposición del Parlamento o del Consejo a la prórroga (antes del final de cada período)'],
  ['2 meses +2', 'Plazo de objeciones a un acto delegado, prorrogable dos meses a iniciativa del Parlamento o del Consejo']]));
v('Artículo 50 — Supervisión y evaluación', plazos('Informes y evaluación del VIS (art. 50)', [
  ['2 años', 'Informe de eu-LISA sobre el funcionamiento técnico (cada dos años)'],
  ['1 año', 'Informes anuales de cada Estado miembro y Europol sobre el acceso con fines policiales'],
  ['3 + 4 años', 'Evaluación global de la Comisión: a los tres años de la entrada en funcionamiento y después cada cuatro']]));

// ───────────── Código de visados ─────────────
v('Artículo 9 — Modalidades prácticas para la presentación de una solicitud', plazos('Cuándo se presenta la solicitud de visado (art. 9)', [
  ['6 meses', 'Antes del inicio del viaje, como máximo (marinos: 9 meses)'],
  ['15 días naturales', 'Antes del inicio del viaje, como norma · urgencia justificada: menos de quince días hábiles'],
  ['2 semanas', 'Plazo en que tiene lugar la cita, por regla general'],
  ['PSV de la UE', 'La solicitud se presenta a través de la Plataforma de solicitud de visados de la UE (excepciones: humanitarias, casos justificados o de fuerza mayor, Jefes de Estado, etc.)']]));
v('Artículo 12 — Documento de viaje', plazos('Documento de viaje (art. 12)', [
  ['3 meses', 'Validez mínima tras la fecha prevista de salida (en varias visitas, tras la última salida)'],
  ['10 años', 'El documento debe haberse expedido en los diez años anteriores'],
  ['En persona', 'Solo si es la primera solicitud con ese documento o si hay que dar los biométricos']]));
v('Artículo 13 — Identificadores biométricos', cols('Identificadores biométricos (art. 13)', [
  { t: 'Qué y cuándo', l: [`${R('Imagen facial en vivo')} + ${R('diez impresiones dactilares planas y digitales')}`, `Comparecencia personal en la primera solicitud y al menos cada ${P('59 meses')}`, 'Los toma personal cualificado y autorizado (o del proveedor externo bajo supervisión)'] },
  { t: 'Menores y exenciones', l: [`Menores: personal formado, ${R('acompañados por familiar adulto o tutor')}, ${K('sin')} fuerza`, `Exentos de huellas: ${P('menores de 6 años')} y ${P('mayores de 75')}; imposibilidad física`, 'Si la imposibilidad es temporal: en la siguiente solicitud'] }]));
v('Artículo 16 — Tasas de visado', tabla('Tasas de visado (art. 16)', ['Caso', 'Importe / trato'], [
  { l: 'Tasa general', c: 'o', h: [{ p: '90 EUR', c: 'v', t: 'Adultos' }, { p: '45 EUR', c: 'v', t: 'Niños de 6 a 12 años' }, { p: '135 / 180 EUR', c: 'v', t: `Si el ${R('Consejo')} adopta una decisión de ejecución (no a menores de 12)` }] },
  { l: 'EXENTOS (art. 16.4)', c: 'o', h: [{ p: 'GRATIS', c: 'n', t: 'Menores de 6 años · estudiantes y profesores acompañantes · investigadores · representantes de organizaciones sin ánimo de lucro de hasta 25 años' }] },
  { l: 'PUEDE EXIMIRSE (art. 16.5)', c: 'o', h: [{ p: 'PODRÁ', c: 'c', t: 'Niños de 6 a 18 años · titulares de pasaportes diplomáticos y de servicio · personas de hasta 25 años en eventos de organizaciones sin ánimo de lucro' }] }]));
v('Artículo 23 — Decisión sobre la solicitud', plazos('Plazo para decidir (art. 23)', [
  ['15 días naturales', 'Desde la presentación de una solicitud admisible'],
  ['45 días naturales', 'Máximo, en casos concretos (examen más detallado)']]));
v('Artículo 24 — Expedición de un visado uniforme', tabla('Visados para entradas múltiples (art. 24.2)', ['Si en los años anteriores obtuvo y utilizó…', 'Validez'], [
  { l: 'Tres visados en los dos años anteriores', c: 'o', h: [{ p: '1 año', c: 'v', t: 'Visado de entradas múltiples' }] },
  { l: 'Un visado múltiple de 1 año en los dos años anteriores', c: 'o', h: [{ p: '2 años', c: 'v', t: 'Visado de entradas múltiples' }] },
  { l: 'Un visado múltiple de 2 años en los tres años anteriores', c: 'o', h: [{ p: '5 años', c: 'v', t: 'Visado de entradas múltiples (máximo del Código)' }] }]));
v('Artículo 33 — Prórroga', cols('Prórroga de un visado (art. 33)', [
  { t: 'Razones humanitarias o de fuerza mayor', l: [`${R('Se prorroga')}`, `${R('Gratuita')}`] },
  { t: 'Razones personales graves', l: [`${R('Podrá prorrogarse')}`, `Tasa de ${P('30 EUR')}`] }]));
v('Artículo 34 — Anulación y retirada', cols('Anulación ≠ retirada (art. 34)', [
  { t: 'ANULACIÓN', l: [`Al expedirse ${K('no')} se cumplían las condiciones (p. ej. obtenido de forma fraudulenta)`, 'En principio, el Estado que lo expidió; puede anular otro Estado informándole'] },
  { t: 'RETIRADA', l: ['Han dejado de cumplirse las condiciones necesarias', `También a ${R('petición del titular')}`, `Recurso: ${R('contra el Estado que decidió, según su Derecho nacional')} (no hay recurso si es a petición propia)`] }]));
v('Artículo 32 — Denegación de un visado', arbol('Se denegará el visado si el solicitante… (art. 32)', `${D('Denegación')}`, [
  'Presenta un documento de viaje falso o falsificado',
  'No justifica la finalidad y condiciones de la estancia o del tránsito aeroportuario',
  `No acredita medios de subsistencia suficientes o no puede obtenerlos legalmente`,
  `Ya ha permanecido ${P('tres meses durante el semestre en curso')} con visado uniforme o de validez territorial limitada`,
  `Descripción en el ${R('SIS')} a efectos de denegación de entrada · sin seguro médico de viaje adecuado, si ha lugar`,
  'Dudas razonables sobre la autenticidad de los documentos, la veracidad de lo declarado o su intención de abandonar el territorio']));
v('Artículo 5 — Estado miembro competente', arbol('¿Qué Estado examina la solicitud de visado uniforme? (art. 5)', `${D('Estado competente')}`, [
  `Un solo destino: ${R('ese Estado')}`,
  `Varios destinos / visitas en dos meses: el de ${R('destino principal (duración en días o finalidad)')}`,
  `Sin destino principal: el de la ${R('frontera exterior de entrada')}`,
  `Tránsito: único Estado, o ${R('frontera exterior por la que se inicia')}; tránsito aeroportuario: ${R('primer aeropuerto')}`]));

// ───────────── Rgto. 977/2011 ─────────────
v('Artículo 1 — Menciones', cols('Menciones en la etiqueta de visado (Rgto. 977/2011)', [
  { t: '«VIS»', l: [`Están registrados ${R('todos')} los datos del art. 5.1 del Reglamento VIS`] },
  { t: '«VIS 0»', l: [`Registrados los datos de las letras a) y b) pero ${R('no las impresiones dactilares')} (no obligatorias aún en la región)`] }]));

// ───────────── Eurodac ─────────────
v('Artículo 29 — Conservación de datos', tabla('Conservación en Eurodac (art. 29) · transmisión (arts. 15-26)', ['Categoría', 'Transmisión · Conservación'], [
  { l: 'Solicitantes de protección internacional (arts. 15 y 17)', c: 'o', h: [{ p: '72 h · 10 años', c: 'v', t: 'Desde el registro de la solicitud · desde la transmisión de los datos biométricos' }] },
  { l: 'Admisión (art. 18)', c: 'o', h: [{ p: '5 años', c: 'v', t: 'Concesión de protección o estatuto humanitario (18.2.a)' }, { p: '3 años', c: 'v', t: 'Admisión rechazada o procedimiento interrumpido (18.2.b y c)' }, { p: 'NO se registran', c: 'n', t: 'Los datos biométricos del art. 18.1' }] },
  { l: 'Reasentamiento nacional (art. 20)', c: 'o', h: [{ p: '72 h · 5 años', c: 'v', t: 'Desde la concesión de protección · desde la transmisión' }] },
  { l: 'Cruce irregular (art. 22)', c: 'o', h: [{ p: '72 h · 5 años', c: 'v', t: 'Desde la aprehensión' }] },
  { l: 'Situación irregular (art. 23)', c: 'o', h: [{ p: '72 h · 5 años', c: 'v', t: 'Desde que se detecta la situación irregular' }] },
  { l: 'Desembarcados tras búsqueda y salvamento (art. 24)', c: 'o', h: [{ p: '72 h · 5 años', c: 'v', t: 'Desde el desembarque' }] },
  { l: 'Protección temporal (art. 26)', c: 'o', h: [{ p: '10 días · 1 año', c: 'v', t: 'Desde el registro · desde la entrada en vigor de la decisión del Consejo (se prorroga cada año)' }] },
  { l: 'Al vencer el período', c: 'o', h: [{ p: 'AUTOMÁTICO', c: 'n', t: 'Los datos se suprimen automáticamente (art. 29.10)' }] }]));
v('Artículo 15 — Recopilación y transmisión de los datos biométricos', plazos('Reglas comunes de toma y transmisión (arts. 13-26)', [
  ['6 años', 'Edad mínima para tomar los datos biométricos'],
  ['72 horas', 'Plazo ordinario de transmisión a Eurodac (protección temporal: 10 días)'],
  ['+48 horas', 'Ampliación por problemas técnicos graves'],
  ['48 horas', 'Tras repetir las huellas con calidad adecuada · tras cesar las razones de salud pública'],
  ['No exime', 'El incumplimiento del plazo no exime de tomar y transmitir los datos']]));
v('Artículo 38 — Ejecución de la comparación y transmisión del resultado', plazos('Comparación y resultado (art. 38)', [
  ['24 horas', 'Plazo para tramitar cada solicitud, por orden de recepción'],
  ['1 hora', 'Comparación particularmente urgente (si el Derecho nacional lo exige)'],
  ['3 días laborables', 'Comunicar el error cuando la identificación final no corresponde al resultado']]));
v('Artículo 33 — Condiciones de acceso a Eurodac por parte de las autoridades designadas', arbol('Acceso de las autoridades designadas (art. 33)', `${D('Solicitud electrónica motivada')} (${R('todas')} las condiciones)`, [
  `a) comprobación previa en las ${R('bases de datos nacionales')} y en los ${R('sistemas dactilares de los demás Estados')} (Decisión 2008/615/JAI)`,
  'b) comparación necesaria para prevenir, detectar o investigar delitos de terrorismo u otros delitos graves (interés superior de seguridad pública)',
  'c) necesaria en un caso concreto para personas concretas',
  'd) motivos razonables de que la comparación contribuirá sustancialmente a la prevención, detección o investigación']));
v('Artículo 45 — Supervisión a cargo del Supervisor Europeo de Protección de Datos', plazos('Auditorías y reuniones de control (arts. 45 y 46)', [
  ['3 años', 'Auditoría del SEPD sobre eu-LISA (al menos cada tres años)'],
  ['1 año', 'Auditoría nacional del tratamiento a efectos de aplicación de la ley (anual, organismo independiente)'],
  ['2 veces/año', 'Reuniones de las autoridades de control y el SEPD en el Comité Europeo de Protección de Datos'],
  ['2 años', 'Informe conjunto del Comité Europeo de Protección de Datos']]));
v('Artículo 57 — Informes, seguimiento y evaluación', plazos('Informes y evaluación de Eurodac (arts. 57 y 58)', [
  ['12-6-2027', 'Estudio de eu-LISA sobre el reconocimiento facial'],
  ['12-6-2028', 'Evaluación de la Comisión sobre el sistema de protección temporal (art. 58)'],
  ['12-6-2029 + 4 años', 'Evaluación global de la Comisión: a más tardar el 12-6-2029 y después cada cuatro años'],
  ['30 de junio', 'Informes bienales de Estados y Europol a la Comisión (del año siguiente)']]));
v('Artículo 63 — Entrada en vigor y aplicabilidad', plazos('Fechas clave del Reglamento Eurodac (arts. 61-63)', [
  ['20 días', 'Entrada en vigor tras su publicación en el DOUE'],
  ['12-6-2026', 'Aplicable desde esta fecha · deroga el Rgto. 603/2013'],
  ['12-6-2029', 'El art. 26 (protección temporal) se aplica desde esta fecha'],
  ['12-9-2024', 'Notificación de autoridades designadas y verificadoras a la Comisión'],
  ['12-12-2024', 'Se acuerda el documento de control de las interfaces']]));

// ───────────── Orden AEC/240/2011 ─────────────
v('Artículo 4 — Creación de la Autoridad Nacional del VIS', arbol('Autoridad Nacional del VIS (Orden AEC/240/2011, art. 4)', `${D('Autoridad Nacional del VIS')}: titular ${R('Director General de Asuntos Consulares y Migratorios')}`, [
  `a) designación previa (y posterior autorización) de las ${R('Autoridades Competentes')} con acceso al VIS`,
  `b) determinación de las ${R('Autoridades Designadas')} (Decisión 2008/633/JAI): prevención, detección e investigación de terrorismo y delitos graves`,
  'c) designación de los puntos centrales de acceso · d) verificación de la conexión con el Interfaz Nacional (en el Ministerio de Asuntos Exteriores y de Cooperación; base central en Estrasburgo)',
  `e) supervisión del VIS, ${K('salvo')} la protección de datos (${R('Agencia de Protección de Datos')})`]));

require('./visuales-t5-extra.js')(v, L);
require('./visuales-t5-trampas.js')(v);

module.exports = V;
if (require.main === module) L.inserta(5, V);
