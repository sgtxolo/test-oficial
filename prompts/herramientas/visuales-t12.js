// Esquemas visuales del Tema 12 (Ley 50/1997 del Gobierno). Uso: node prompts/herramientas/visuales-t12.js
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos } = L;
const V = []; const v = (despues, html) => V.push([despues, html]);

v('Exposición de motivos', arbol('Tres principios de funcionamiento del Gobierno', `${D('Principios')} del Gobierno`, [
  `${R('Principio de dirección presidencial')}: el Presidente determina las directrices políticas del Gobierno y de cada Departamento`,
  `${R('Colegialidad y consecuente responsabilidad solidaria')} de sus miembros`,
  `${R('Principio departamental')}: el titular de cada Departamento tiene amplia autonomía y responsabilidad en su gestión`,
  'Secretarios de Estado: órganos de colaboración muy cualificados del Gobierno, pero no miembros']));
v('Artículo 1 — Del Gobierno', arbol('El Gobierno (art. 1)', `${D('Gobierno')}`, [
  { t: `${R('Dirige')}:`, sub: [`${R('política interior y exterior')}`, `${R('Administración civil y militar')}`, `${R('defensa del Estado')}`] },
  `${R('Ejerce la función ejecutiva y la potestad reglamentaria')} de acuerdo con la Constitución y las leyes`,
  { t: 'Se compone de:', sub: [`${R('Presidente')}`, `${R('Vicepresidente o Vicepresidentes')}, en su caso`, `${R('Ministros')}`] },
  { t: 'Se reúnen en:', sub: [`${R('Consejo de Ministros')}`, `${R('Comisiones Delegadas del Gobierno')}`] }]));
v('Artículo 2 — Del Presidente', arbol('Funciones del Presidente del Gobierno (art. 2.2)', `${D('Presidente del Gobierno')}`, [
  { t: `${K('Proponer')} al Rey:`, sub: [`disolución del Congreso, del Senado o de las Cortes Generales, ${R('previa deliberación del Consejo de Ministros')}`, `convocatoria de un referéndum consultivo, ${R('previa autorización del Congreso de los Diputados')}`, `${R('nombramiento y separación de los Vicepresidentes y de los Ministros')}`] },
  `Plantear ${R('ante el Congreso de los Diputados')} la cuestión de confianza, previa deliberación del Consejo de Ministros`,
  { t: 'Dirección:', sub: [`${R('Representar al Gobierno')}`, `${R('Establecer el programa político y determinar las directrices de la política interior y exterior y velar por su cumplimiento')}`, `${R('Dirigir la política de defensa')}`, 'Impartir instrucciones a los demás miembros'] },
  { t: 'Consejo de Ministros:', sub: [`${R('Convocar, presidir y fijar el orden del día')}`, 'Refrendar los actos del Rey y someterle las leyes para su sanción'] },
  { t: 'Organización y control:', sub: [`${R('Crear, modificar y suprimir, por Real Decreto, los Departamentos Ministeriales y las Secretarías de Estado')}`, `${R('Resolver los conflictos de atribuciones')} entre Ministerios`, `Interponer el ${R('recurso de inconstitucionalidad')}`] }]));
v('Artículo 4 — De los Ministros', cols('Vicepresidentes y Ministros (arts. 3 y 4)',
  [{ t: 'Vicepresidentes (art. 3)', l: [`Ejercen las funciones que les ${R('encomiende el Presidente')}`, `Si asumen un Departamento: ${R('además, la condición de Ministro')}`] },
   { t: 'Ministros (art. 4)', l: [`${R('Desarrollar la acción del Gobierno')} en su Departamento, conforme a ${R('los acuerdos del Consejo de Ministros o las directrices del Presidente')}`, `Ejercer la ${R('potestad reglamentaria')} en las materias de su Departamento`, `Refrendar ${R('en su caso')} los actos del Rey`, `Ministros sin cartera: ${R('por Real Decreto')} se determina su ámbito, estructura y medios`] }], null));
v('Artículo 5 — Del Consejo de Ministros', arbol('Funciones del Consejo de Ministros (art. 5)', `${D('Consejo de Ministros')}: órgano colegiado del Gobierno`, [
  { t: 'Normas:', sub: ['Aprobar los proyectos de ley y remitirlos al Congreso o al Senado', `${R('Proyecto de Ley de Presupuestos Generales del Estado')}`, `${R('Reales Decretos-leyes y Reales Decretos Legislativos')}`, `Reglamentos de desarrollo de las leyes, ${R('previo dictamen del Consejo de Estado')}`] },
  { t: 'Tratados:', sub: [`${R('Acordar la negociación y firma de Tratados internacionales, así como su aplicación provisional')}`, `Remitirlos a las Cortes (${R('artículos 94 y 96.2')} de la Constitución)`] },
  `${R('Declarar los estados de alarma y de excepción')} · proponer al Congreso el estado de sitio`,
  `Deuda Pública o crédito, ${R('cuando haya sido autorizado por una Ley')}`,
  `${R('Crear, modificar y suprimir los órganos directivos')} de los Departamentos · programas y directrices vinculantes para la AGE`,
  `Asisten, si son convocados: ${R('Secretarios de Estado y excepcionalmente otros altos cargos')} · deliberaciones ${R('secretas')}`]));
v('Artículo 6 — De las Comisiones Delegadas', arbol('Comisiones Delegadas del Gobierno (art. 6)', `${D('Comisiones Delegadas')}`, [
  `Creación, modificación y supresión: ${R('Consejo de Ministros mediante Real Decreto')}, ${R('a propuesta del Presidente del Gobierno')}`,
  { t: `El ${R('Real Decreto de creación')} especifica:`, sub: [`a) ${R('el miembro del Gobierno que asume la presidencia')}`, `b) ${R('los miembros del Gobierno y, en su caso, Secretarios de Estado que la integran')}`, `c) ${R('las funciones que se atribuyen')}`, 'd) quién ejerce la Secretaría', 'e) régimen interno'] },
  { t: 'Corresponde a las Comisiones:', sub: [`a) ${R('Examinar las cuestiones de carácter general')} de varios Departamentos`, `b) ${R('Estudiar')} asuntos que ${R('requieran la elaboración de una propuesta conjunta')} previa al Consejo de Ministros`, `c) ${R('Resolver')} los asuntos de más de un Ministerio que ${R('no requieran ser elevados al Consejo de Ministros')}`] },
  `Pueden convocarse ${R('titulares de otros órganos superiores y directivos de la AGE')} · deliberaciones ${R('secretas')}`]));
v('Artículo 7 — De los Secretarios de Estado', arbol('Secretarios de Estado (art. 7)', `${D('Secretario de Estado')}`, [
  `${R('Órganos superiores')} de la AGE, ${R('directamente responsables de la ejecución de la acción del Gobierno en un sector de actividad específica')}`,
  `Actúan ${R('bajo la dirección del titular del Departamento')}; si están en la Presidencia, ${R('bajo la dirección del Presidente')}`,
  `Competencias: ${R('Ley de Organización y Funcionamiento de la AGE')}`, 'No son miembros del Gobierno']));
v('Artículo 8 — De la Comisión General', arbol('Comisión General de Secretarios de Estado y Subsecretarios (art. 8)', `${D('Comisión General')}`, [
  `Integrada por ${R('los titulares de las Secretarías de Estado y por los Subsecretarios de los distintos Departamentos')} · asiste el ${R('Abogado General del Estado')}`,
  `Presidencia: ${R('un Vicepresidente del Gobierno o, en su defecto, el Ministro de la Presidencia')} · ausencia: ${R('el Ministro que corresponda según el orden de precedencia')}`,
  `Secretaría: ${R('Subsecretario de la Presidencia')} (ausencia: Director del Secretariado del Gobierno)`,
  `Deliberaciones ${R('reservadas')} · ${R('en ningún caso')} adopta decisiones por delegación del Gobierno`,
  { t: 'Corresponde:', sub: [`${R('Examen de todos los asuntos que vayan a someterse a aprobación del Consejo de Ministros')} (salvo nombramientos, ceses y ascensos de oficiales generales)`, `${R('Análisis o discusión de asuntos que afecten a varios Ministerios y sean sometidos por su presidente')}`] },
  `Sesiones a distancia: miembros ${R('en territorio español y con identidad acreditada')}`]));
v('Artículo 9 — Del Secretariado', arbol('Secretariado del Gobierno (art. 9)', `${R('Órgano de apoyo')}`, [
  { t: `De: ${R('Consejo de Ministros')}, ${R('Comisiones Delegadas')} y ${R('Comisión General de Secretarios de Estado y Subsecretarios')}`, sub: [`a) ${R('asistencia al Ministro-Secretario del Consejo de Ministros')}`, `b) ${R('remisión de las convocatorias')}`, `c) ${R('colaboración con las Secretarías Técnicas de las Comisiones Delegadas')}`, `d) ${R('archivo y custodia de las convocatorias, órdenes del día y actas')}`, `e) ${R('velar por el cumplimiento de los principios de buena regulación')}`, `f) ${R('velar por la correcta y fiel publicación')} en el BOE`] },
  { t: `Asistencia al Ministro de la Presidencia:`, sub: [`${R('sanción y promulgación real de las leyes')}`, `${R('actos del Rey cuyo refrendo corresponde al Presidente')}`] },
  `Se integra en ${R('la estructura orgánica del Ministerio de la Presidencia')} · su ${R('Director')} ejerce la ${R('secretaría adjunta')} de la Comisión General`]));
v('Artículo 10 — De los Gabinetes', arbol('Gabinetes (art. 10)', `${R('Órganos de apoyo político y técnico')}`, [
  'De: Presidente, Vicepresidentes, Ministros y Secretarios de Estado',
  `Tareas de confianza y asesoramiento especial · ${K('sin')} adoptar actos que correspondan a la AGE · los directores pueden dictar ${R('actos administrativos propios de la jefatura de la unidad que dirigen')}`,
  `Apoyo en: ${R('desarrollo de su labor política')}, ${R('tareas de carácter parlamentario')}, ${R('relaciones con las instituciones y la organización administrativa')}`,
  `Gabinete de la Presidencia: ${R('Real Decreto del Presidente')} (${R('estructura y funciones')})`,
  `Nivel de los Directores: ${R('se determine reglamentariamente')} · retribuciones: ${R('Consejo de Ministros')}`]));
v('Artículo 12 — Del nombramiento y cese', arbol('Acceso, nombramiento y cese (arts. 11 y 12)', `${D('Miembros del Gobierno')}`, [
  { t: 'Requisitos (art. 11):', sub: [`${R('español')}`, `${R('mayor de edad')}`, `${R('disfrutar de los derechos de sufragio activo y pasivo')}`, `${R('no estar inhabilitado para ejercer empleo o cargo público por sentencia judicial firme')}`] },
  `Presidente: ${R('en los términos previstos en la Constitución')}`,
  `Vicepresidentes y Ministros: nombrados y separados ${R('por el Rey, a propuesta del Presidente del Gobierno')}`,
  `Presencia equilibrada de mujeres y hombres: mínimo ${R('cuarenta por ciento')} de cada sexo`,
  `Cese de Ministros sin cartera: ${R('extinción de dichos órganos')} · estatuto de los ex Presidentes: ${R('Real Decreto')}`]));
v('Artículo 13 — De la suplencia', flujo('Suplencia (art. 13)', [
  { et: 'Presidente', t: `Vacante, ausencia o enfermedad: ${R('los Vicepresidentes, de acuerdo con el orden de prelación')}` },
  { et: 'Defecto', t: 'En defecto de ellos: los Ministros, según el orden de precedencia de los Departamentos' },
  { et: 'Ministros', t: `${R('Real Decreto del Presidente del Gobierno')}, recayendo ${R('en otro miembro del Gobierno')} · expresa ${R('la causa y el carácter de la suplencia')}` },
  { et: `${K('No')} es ausencia`, t: `${R('La interrupción transitoria de la asistencia a la reunión de un órgano colegiado')} → ejerce ${R('la siguiente autoridad en rango presente')}` }]));
v('Artículo 16 — Del nombramiento y cese de los Directores', arbol('Quién nombra a quién', `${D('Nombramientos')}`, [
  `Secretarios de Estado: ${R('Real Decreto del Consejo de Ministros')}, ${R('a propuesta del Presidente o del miembro del Gobierno a cuyo Departamento pertenezcan')}`,
  `Directores de Gabinete del Presidente, Vicepresidentes y Ministros: ${R('Real Decreto aprobado en Consejo de Ministros')}`,
  `Directores de Gabinete de los Secretarios de Estado: ${R('Orden Ministerial, previo conocimiento del Consejo de Ministros')}`,
  `Los Directores de Gabinete ${R('cesan automáticamente cuando cese el titular')}; con el Gobierno en funciones, ${R('continúan hasta la formación del nuevo Gobierno')}`,
  `Funcionarios en Gabinetes: ${R('servicios especiales')} (o servicio activo si optan) · incompatibilidades: ${R('régimen de los altos cargos')}`,
  `Miembros del Gobierno: solo funciones representativas ${R('propias del mandato parlamentario')} (art. 14)`]));
v('Artículo 17 — De las normas aplicables', arbol('Normas del funcionamiento del Gobierno (art. 17)', `${R('Presente Ley')} y por…`, [
  `a) ${R('Reales Decretos del Presidente del Gobierno sobre la composición y organización del Gobierno y de sus órganos de colaboración y apoyo')}`,
  `b) ${R('Disposiciones organizativas internas, de funcionamiento y actuación emanadas del Presidente del Gobierno o del Consejo de Ministros')}`]));
v('Artículos 18 y 19', flujo('Funcionamiento del Consejo de Ministros (arts. 18 y 19)', [
  { et: '1', t: `El Presidente ${R('convoca y preside')}; actúa como Secretario ${R('el Ministro de la Presidencia')}` },
  { et: '2', t: `Reuniones de carácter ${R('decisorio o deliberante')}` },
  { et: '3', t: 'El orden del día lo fija el Presidente del Gobierno' },
  { et: '4', t: `Acta con ${K('exclusivamente')}: ${R('tiempo y lugar de su celebración')}, ${R('relación de asistentes')}, ${R('acuerdos adoptados')} e ${R('informes presentados')}` },
  { et: '19', t: `Comisiones Delegadas y Comisión General: ${R('lo dispuesto en el artículo 18')} sobre actas` }]));
v('Artículo 20 — Delegación y avocación', cols('Delegación y avocación (art. 20)',
  [{ t: 'Pueden delegar', l: [`El Presidente → ${R('Vicepresidentes y Ministros')}`, `Los Ministros → ${R('Secretarios de Estado y Subsecretarios')}, ${R('Delegados del Gobierno en las CC. AA.')} y ${R('demás órganos directivos del Ministerio')}`, `${R('A propuesta del Presidente')}: ${R('funciones administrativas del Consejo de Ministros')} → Comisiones Delegadas`] },
   { t: `${K('NO')} son delegables`, l: [`Las atribuidas ${R('directamente por la Constitución')}`, `${R('Nombramiento y separación de altos cargos atribuidas al Consejo de Ministros')}`, `Las de ${R('órganos colegiados del Gobierno')} (salvo la excepción del apartado 2)`, `Si una ${R('ley prohíbe expresamente la delegación')}`] },
   { t: 'Avocación', l: [`${R('Consejo de Ministros')}, ${R('a propuesta del Presidente')}, avoca un asunto de las Comisiones Delegadas`, 'Acuerdo motivado con mención expresa', `Contra el acuerdo ${R('no cabrá recurso, aunque podrá impugnarse en el que se interponga contra la decisión adoptada')}`] }], null));
v('Artículo 21 — Del Gobierno en funciones', arbol('Gobierno en funciones (art. 21)', `${D('Gobierno en funciones')}`, [
  { t: `El Gobierno ${K('cesa')}:`, sub: [`${R('tras la celebración de elecciones generales')}`, `${R('pérdida de confianza parlamentaria previstos en la Constitución')}`, `${R('dimisión o fallecimiento de su Presidente')}`] },
  `Continúa en funciones ${R('hasta la toma de posesión del nuevo Gobierno')}`,
  `Limita su gestión al ${R('despacho ordinario de los asuntos públicos')}, salvo ${R('casos de urgencia debidamente acreditados o por razones de interés general cuya acreditación expresa así lo justifique')}`,
  { t: `El ${K('Presidente')} en funciones ${K('no')} podrá:`, sub: [`a) ${R('Proponer al Rey la disolución de alguna de las Cámaras o de las Cortes Generales')}`, `b) ${R('Plantear la cuestión de confianza')}`, `c) ${R('Proponer al Rey la convocatoria de un referéndum consultivo')}`] },
  { t: `El ${K('Gobierno')} en funciones ${K('no')} podrá:`, sub: [`a) ${R('Aprobar el Proyecto de Ley de Presupuestos Generales del Estado')}`, `b) ${R('Presentar proyectos de ley al Congreso o al Senado')}`] },
  `${R('Delegaciones legislativas')} de las Cortes: ${R('quedarán en suspenso')} mientras esté en funciones tras elecciones generales`]));
v('Artículos 22 y 23', cols('Iniciativa y entrada en vigor (arts. 22 y 23)',
  [{ t: 'Art. 22', l: [`El ${R('Gobierno')} ejerce la iniciativa y la potestad reglamentaria según el ${R('Título VI de la Ley 39/2015')}`] },
   { t: 'Art. 23 · normas con nuevas obligaciones económicas o profesionales', l: [`Entrada en vigor: ${R('2 de enero o 1 de julio')} siguientes a su aprobación`, `${K('No')} se aplica a ${R('reales decretos-leyes')}, ni a ${R('transposición de directivas europeas')} u ${R('otras razones justificadas')} (acreditado en la Memoria)`] }], null));
v('Artículo 24 — Forma y jerarquía', flujo('Formas de las decisiones y jerarquía de los reglamentos (art. 24)', [
  { et: 'a', t: `${R('Reales Decretos Legislativos y Reales Decretos-leyes')} (arts. 82 y 86 de la Constitución)` },
  { et: 'b', t: `${R('Reales Decretos del Presidente del Gobierno')}` },
  { et: 'c', t: `${R('Reales Decretos acordados en Consejo de Ministros')}` },
  { et: 'd', t: `${R('Acuerdos del Consejo de Ministros')}: lo que no deba adoptar forma de Real Decreto` },
  { et: 'e', t: `${R('Acuerdos adoptados en Comisiones Delegadas')}: forma de Orden del Ministro competente o del Ministro de la Presidencia` },
  { et: 'f', t: `${R('Órdenes Ministeriales')}; si afectan a varios Departamentos: ${R('Orden del Ministro de la Presidencia')}, a propuesta de los Ministros interesados` },
  { et: '1.º', c: 'si', t: `${R('Reglamentos aprobados por Real Decreto del Presidente o acordado en el Consejo de Ministros')}` },
  { et: '2.º', c: 'si', t: `${R('Reglamentos aprobados por Orden Ministerial')}` }]));
v('Artículo 26 — Procedimiento', flujo('Elaboración de normas con rango de ley y reglamentos (art. 26)', [
  { et: '1', t: `Estudios y consultas previos para ${R('garantizar')} el acierto y la legalidad` },
  { et: '2', t: `Consulta pública previa en el portal web: plazo ${K('nunca inferior')} a ${R('quince días naturales')} · ${R('problemas, necesidad y oportunidad, objetivos y alternativas')}` },
  { et: '3', t: `${D('Memoria del Análisis de Impacto Normativo (MAIN)')}, preceptiva` },
  { et: '4', t: `Informes preceptivos: ${R('diez días, o un mes si lo solicita otra Administración o un órgano con especial independencia')}; urgentes: ${R('no superior a la mitad')} · siempre la ${R('Secretaría General Técnica')}` },
  { et: '5', t: `Hacienda y Función Pública (organización, personal, procedimientos): ${R('15 días')} sin objeción → aprobación concedida · ${R('Política Territorial')} si afecta a competencias Estado-CC. AA.` },
  { et: '6', t: `Audiencia e información públicas: ${R('15 días hábiles')}, reducible a ${R('siete días hábiles')}; solo se omite por ${R('graves razones de interés público')}` },
  { et: '7', t: 'Dictamen del Consejo de Estado, si es preceptivo o se considera conveniente' },
  { et: '8', t: 'Comisión General de Secretarios de Estado y Subsecretarios → Consejo de Ministros' }]));
v('Artículo 26 — Procedimiento', arbol('Contenido de la MAIN (art. 26.3)', `${D('Memoria del Análisis de Impacto Normativo')}`, [
  `a) ${R('Oportunidad de la propuesta y alternativas de regulación estudiadas')}`, `b) ${R('Contenido y análisis jurídico (Derecho nacional y de la UE) y listado de las normas que quedarán derogadas')}`,
  `c) ${R('Adecuación de la norma al orden de distribución de competencias')}`, `d) Impacto económico y presupuestario, con ${R('test Pyme de acuerdo con la práctica de la Comisión Europea')}`,
  `e) ${R('Identificación de las cargas administrativas')}`, `f) ${R('Impacto por razón de género')} · g) resumen de aportaciones · h) cambio climático: ${R('mitigación y adaptación')}`,
  `Se conservan en el expediente, en formato electrónico: ${R('la MAIN, los informes y dictámenes y los estudios y consultas')}`]));
v('Artículo 27 — Tramitación urgente', cols('Tramitación ordinaria frente a urgente (arts. 26 y 27)',
  [{ t: 'Ordinaria', l: ['Consulta pública: al menos 15 días naturales', 'Audiencia pública: 15 días hábiles (mínimo 7)', 'Informes: 10 días / 1 mes', 'Falta de informe preceptivo: procedimiento sujeto a él'] },
   { t: 'Urgente (art. 27)', l: [`Lo acuerda el ${R('Consejo de Ministros')}, a propuesta del titular del departamento, para ${R('anteproyectos de ley, reales decretos legislativos y reales decretos')}`, `Casos: ${R('transposición de directivas comunitarias')} u otras circunstancias extraordinarias imprevisibles`, `Plazos reducidos ${R('a la mitad de su duración')}`, `${K('No')} hace falta consulta pública · audiencia de ${R('siete días')}`, 'La falta de informe en plazo no impide continuar'] }], '⇄'));
v('Artículo 28 — Informe anual', arbol('Evaluación normativa (arts. 25 y 28)', `${D('Plan Anual Normativo')}`, [
  `Lo aprueba el Gobierno cada año: iniciativas del ${R('año siguiente')} · coordinado por el ${R('Ministerio de la Presidencia')}, que lo eleva ${R('antes del 30 de abril')}`,
  `Iniciativa fuera del Plan: se justifica en la ${R('Memoria del Análisis de Impacto Normativo')}`,
  `Informe anual: ${R('Consejo de Ministros')}, a propuesta del ${R('Ministerio de la Presidencia')}, ${R('antes del 30 de abril de cada año')}`,
  { t: 'La evaluación comprende:', sub: [`a) ${R('Eficacia')}`, `b) ${R('Eficiencia')}`, `c) ${R('Sostenibilidad')}`] }]));
v('Artículo 28 — Informe anual', plazos('Plazos del Tema 12', [
  ['30 abril', 'Plan Anual Normativo (art. 25) e informe anual de evaluación (art. 28)'], ['2 ene / 1 jul', 'Entrada en vigor de normas con nuevas obligaciones económicas o profesionales (art. 23)'],
  ['15 días naturales', `${K('Nunca inferior')}: consulta pública previa (art. 26.2)`], ['10 días / 1 mes', 'Informes preceptivos; 1 mes si los emite otra Administración u órgano independiente (art. 26.5)'],
  ['½ plazo', 'Informes urgentes: no superior a la mitad (art. 26.5)'], ['15 días', 'Aprobación previa de Hacienda y Función Pública: sin objeción se entiende concedida'],
  ['15 días hábiles', 'Audiencia e información públicas (art. 26.6)'], ['7 días hábiles', 'Mínimo de audiencia por razones motivadas o tramitación urgente'],
  ['40 %', 'Presencia mínima de cada sexo en Vicepresidencias y Ministerios (art. 12.2 bis)']]));
v('Artículo 29 — Del control', arbol('Control de los actos del Gobierno (art. 29)', `${D('Control del Gobierno')}`, [
  `${R('Sujeto a la Constitución y al resto del ordenamiento jurídico en toda su actuación')}`,
  `Control político: ${R('Cortes Generales')}`, `Actos, inactividad y vía de hecho: ${R('jurisdicción contencioso-administrativa')}`, `${R('Impugnable ante el Tribunal Constitucional')}`]));
v('Disposiciones adicionales', arbol('Disposiciones adicionales', `${D('Disposiciones adicionales')}`, [
  `DA 1.ª · ${R('Presidentes del Gobierno')}: derecho a usar el título y a honores y precedencias`,
  `DA 2.ª · ${R('Consejo de Estado')}: ${R('supremo órgano consultivo del Gobierno')}`,
  `DA 3.ª · sesiones a distancia: lo decide ${R('motivadamente')} el ${R('Presidente del Gobierno')} · válidas: ${R('audioconferencias y videoconferencias')}`]));

L.inserta(12, V);
