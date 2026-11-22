require('../esq-virtual.js');
// Cuadros visuales del Tema 27 (parte b): recrean los cuadros/esquemas de tu PDF subrayado
// (TEMA 27 DEONTOLOGIA PROFESIONAL-2026-08-08.pdf, págs. 28-63 del PDF, 1-based: Real Decreto 176/2022 (preámbulo), Código de Conducta y OG 10/2024) con su texto literal.
//   Ley 4 (RD 176/2022, preámbulo): págs. 28 (Real Orden 1845), 29 (art. 5 LO 2/86 / 6 y 7.1 Ley 29/2014 / Título III LO 11/07; art. 7.2), 30 (estructura del Código)
//   Ley 5 (Código de Conducta): págs. 35-47 (valores, principios institucionales, arts. 14, 15, 17, 24, 26, 28, 31, 39, 41, 42, 46, 50)
//   Ley 6 (OG 10/2024): págs. 53 (objeto y ámbito), 54 (SINTEGC), 57 (Sistema interno de información), 60 (Observatorio de Conducta Ética; en tu lista figuraba la 59), 63 (Grupo de trabajo del PLAEP)
// COLORES: leídos de TU PDF (fosforito amarillo Y, salmón/rosa D, verde G, lila/turquesa P, subrayado rojo K, círculos O) en los cuadros de las págs. 36, 38 (arts. 14 y 15), 39, 40, 41, 44 (art. 41), 45, 46, 47 y OG 53, 57, 60, 63;
//   el RESTO viene IMPRESO sin tu fosforito (págs. 28, 29, 30, 35, 37, 42, 44 —art. 39—, 54) y va con el MÉTODO: órganos → verde, plazos/cifras → azul,
//   «no / salvo / únicamente» → rojo subrayado, conceptos clave → amarillo/naranja.
// LOCALIZADOR: v(ley, loc, html): ley 4=rd 5=cod 6=og; loc = cabecera de la ficha del esquema tras la que se inserta.
const { R, P, D, Y, K, X, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const O = x => `<span class="m-circulo">${x}</span>`;
const V = []; const v = (ley, loc, html) => V.push([ley, loc, html]);
const S4 = 'Real Decreto 176/2022', S5 = 'Código de Conducta', S6 = 'OG 10/2024';

// ───────── RD 176/2022 · preámbulo ─────────
// pág. 28: Real Orden 1845 (impreso)
v(4, `Preámbulo · ${S4}`, arbol('ANTECEDENTE: REAL ORDEN DE 1845 (esquema de refuerzo impreso, sin fosforito · pág. 28)', D('Antecedente · Real Orden de 20 de diciembre de 1845'), [
  { t: D('La Cartilla del Guardia Civil'), sub: [
    `${Y('Considerada:')} ${Y('documento único')} en la función pública española · ${Y('obra clásica')} de la deontología profesional`,
    `${Y('Basada en:')} ${D('Moralidad')} · ${D('Honradez')} · ${D('Rectitud')}`,
  ] },
  `El Código de Conducta ${KY('NO deja sin efecto')} ni su ${Y('vigencia')} ni sus ${Y('principios')}`,
  `${KY('SÍ')} los ${Y('incorpora')} a su contenido de forma ${Y('actualizada y adaptada')}`,
]));
// pág. 29: normas de las que parte el Código (impreso)
v(4, `Preámbulo · ${S4}`, cols('NORMAS Y SU CONTENIDO (esquema de refuerzo impreso, sin fosforito · pág. 29)', [
  { t: `${G('Artículo quinto de la L.O. 2/86')}, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad.`, l: [`➜ ${Y('Principios básicos de actuación')}`] },
  { t: `${G('Artículo 6 y 7.1 de la Ley 29/2014')}, de 28 de noviembre, de Régimen del Personal de la GC`, l: [`➜ ${D('Código de conducta')}`, `➜ ${Y('Reglas de comportamiento')} del GC`] },
  { t: `${G('Título III de la L.O. 11/07')}, de 22 de octubre, reguladora de los derechos y deberes de los miembros de la GC`, l: [`➜ De los ${Y('deberes')} de los miembros de la GC`] },
]));
// pág. 29: art. 7.2 Ley 29/2014 (impreso)
v(4, `Preámbulo · ${S4}`, arbol('ARTÍCULO 7.2 DE LA LEY 29/2014 (esquema de refuerzo impreso, sin fosforito · pág. 29)', D('Artículo 7.2 de la Ley 29/2014'), [
  { t: `${Y('Mandato de desarrollo reglamentario')} de las reglas esenciales de comportamiento, teniendo en cuenta:`, sub: [
    `${G('RD 96/2009')}, de 6 de febrero, por el que se aprueban las ${Y('RROOFFAA')}`,
    `${Y('Código de conducta de los empleados públicos')}: ${G('RDL 5/2015')}, de 30 de octubre, Ley del EBEP.`,
  ] },
]));
// pág. 30: estructura del Código (impreso)
v(4, `Preámbulo · ${S4}`, arbol('ESTRUCTURA DEL CÓDIGO DE CONDUCTA (esquema de refuerzo impreso, sin fosforito · pág. 30)', D('Código de conducta personal GC'), [
  { t: `${D('Título I.')} Valores fundamentales y principios institucionales`, sub: [`${Y('Capítulo I.')} Valores fundamentales`, `${Y('Capítulo II.')} Principios institucionales`] },
  { t: `${D('Título II.')} Normas de comportamiento`, sub: [`${Y('Capítulo I.')} Normas generales de comportamiento`, `${Y('Capítulo II.')} Normas de conducta durante la prestación del servicio`] },
]));

// ───────── Código de Conducta ─────────
// pág. 35: valores fundamentales (impreso)
v(5, `Artículo 1 · ${S5}`, arbol('VALORES FUNDAMENTALES (esquema impreso, sin fosforito · pág. 35)', `${D('Valores fundamentales')} · ${Y('Se deben interiorizar por todos los miembros de la GC')}`, [
  D('Honor'), D('Integridad'), D('Lealtad'), D('Valor'), D('Sentido de la justicia'), D('Imparcialidad y neutralidad'), D('Responsabilidad'), D('Dignidad'), D('Espíritu de sacrificio'),
]));
// pág. 36: tabla resumen valores (con tu fosforito)
v(5, `Artículo 9 · ${S5}`, tabla('VALORES FUNDAMENTALES (tabla resumen · pág. 36)', ['Valor', 'Definición'], [
  { p: 'Honor', c: 'o', t: Y('Principal divisa. Seña de identidad y guía.') },
  { p: 'Integridad', c: 'o', t: Y('Rectitud y honradez.') },
  { p: 'Lealtad', c: 'o', t: Y('Compromiso personal de fidelidad, respeto y sinceridad.') },
  { p: 'Valor', c: 'o', t: Y('Voluntad de acometer.') },
  { p: 'Sentido de la justicia', c: 'o', t: Y('Objetividad, ecuanimidad, comprensión. No arbitrariedad. No discriminación.') },
  { p: 'Imparcialidad y neutralidad', c: 'o', t: Y('No prejuicio. No trato discriminatorio.') },
  { p: 'Responsabilidad', c: 'o', t: Y('Personal y directa. Consecuencias.') },
  { p: 'Dignidad', c: 'o', t: Y('Sentido de la transcendencia de su función. Responsabilidad, seriedad y respeto.') },
  { p: 'Espíritu de sacrificio', c: 'o', t: Y('Disposición permanente. Abnegación.') },
]));
// pág. 37: principios institucionales (impreso)
v(5, `Artículo 9 · ${S5}`, arbol('PRINCIPIOS INSTITUCIONALES (esquema impreso, sin fosforito · pág. 37)', `${D('Principios institucionales')} · ${Y('Conforman el marco ético de referencia e inspiran el funcionamiento de la GC como organización')}`, [
  'Defensa de la Constitución.', 'Respeto de los derechos fundamentales y libertades públicas.', 'Igualdad y no discriminación.', 'Neutralidad ideológica y política.', 'Jerarquía.', 'Disciplina.', 'Subordinación.', 'Respeto y consideración a la pluralidad cultural de España.', 'Formación y competencia profesional.', 'Cooperación.', 'Prestigio.', 'Espíritu benemérito.', 'Espíritu de cuerpo y compañerismo.', 'Respeto por la historia y tradiciones del Cuerpo.',
]));
// pág. 38: art. 14 jerarquía
v(5, `Artículo 14 · ${S5}`, arbol('JERARQUÍA (esquema · pág. 38 · art. 14)', `${D('Jerarquía')} · Define situación entre componentes en lo concerniente a`, [Y('Mando'), Y('Subordinación'), Y('Responsabilidad')]));
// pág. 38: art. 15 disciplina
v(5, `Artículo 15 · ${S5}`, arbol('DISCIPLINA (esquema · pág. 38 · art. 15)', D('Disciplina'), [
  { t: `${D('Factor cohesión')} ➜ ${Y('Obliga a')}`, sub: [Y('Mandar con responsabilidad'), Y('Obedecer lo mandado')] },
  `${D('Expresión colectiva')} ➜ ${G('Acatamiento a la CE')}`,
  `${D('Manifestación individual')} ➜ ${P('Cumplimiento de órdenes')}`,
]));
// pág. 39: art. 17
v(5, `Artículo 17 · ${S5}`, arbol('RESPETO Y CONSIDERACIÓN A LA PLURALIDAD CULTURAL DE ESPAÑA (esquema · pág. 39 · art. 17)', D('Respeto y consideración a la pluralidad cultural de España'), [
  { t: Y('Respeto y consideración'), sub: [`hacia la ${Y('Historia')}, los ${Y('Símbolos')} y las ${Y('Instituciones')}`, `del ${Y('Estado')}, de las ${Y('CCAA')} y de las ${G('Entidades Locales')}`] },
]));
// pág. 40: tabla resumen principios institucionales
v(5, `Artículo 23 · ${S5}`, tabla('PRINCIPIOS INSTITUCIONALES (tabla resumen · pág. 40)', ['Principio', 'Definición'], [
  { p: 'Jerarquía', c: 'o', t: Y('Situación mando, subordinación y responsabilidad.') },
  { p: 'Disciplina', c: 'o', t: Y('Factor de cohesión.') },
  { p: 'Subordinación', c: 'o', t: Y('Obedecer. Abstención de obedecer.') },
  { p: 'Cooperación', c: 'o', t: Y('Bien común. Intereses generales.') },
  { p: 'Prestigio', c: 'o', t: Y('Actuación ejemplar y modélica.') },
  { p: 'Espíritu benemérito', c: 'o', t: Y('Auxilio. De servicio o no.') },
  { p: 'Espíritu de cuerpo', c: 'o', t: Y('Honor y orgullo. Profundo sentido de pertenencia a GC.') },
  { p: 'Compañerismo', c: 'o', t: Y('Respeto, lealtad, confianza y cooperación.') },
  { p: 'Personal retirado', c: 'o', t: Y('Respeto, reconocimiento y consideración.') },
  { p: 'Respeto por la historia', c: 'o', t: Y('Rica herencia de valor, entrega y espíritu benemérito. Deber de gratitud y estímulo.') },
]));
// pág. 40: art. 24
v(5, `Artículo 24 · ${S5}`, arbol('DISPONIBILIDAD PERMANENTE (esquema · pág. 40 · art. 24)', D('Disponibilidad permanente'), [Y('Total dedicación, espíritu de servicio y afán de superación'), Y('Actuando con iniciativa y decisión')]));
// pág. 41: art. 26
v(5, `Artículo 26 · ${S5}`, arbol('EMPLEO DE LOS MEDIOS (esquema · pág. 41 · art. 26)', `${P('Empleo de los medios')} · ${D('principios')}`, [Y('Efectividad'), Y('Eficacia'), Y('Eficiencia'), Y('Racionalidad'), Y('Prudencia')]));
// pág. 42: art. 28 (impreso)
v(5, `Artículo 28 · ${S5}`, arbol('USO DEL UNIFORME (esquema de refuerzo del artículo 28, impreso sin fosforito · pág. 42)', D('Uniforme'), [
  { t: Y('El uniforme deberá ser vestido con'), sub: [Y('Orgullo'), Y('Corrección'), Y('Limpieza')] },
  { t: `${Y('El adecuado uso de las prendas')} ➜ ${D('Contribuye a')}`, sub: [Y('La consideración pública'), `Proyectar imagen de: ${Y('Respeto')} · ${Y('Dignidad')} · ${Y('Confianza')} · ${Y('Seguridad')}`] },
]));
// pág. 42: art. 31 (impreso)
v(5, `Artículo 31 · ${S5}`, arbol('SALUDO MILITAR (esquema impreso, sin fosforito · pág. 42 · art. 31)', `${D('Saludo militar')} · expresión de`, [Y('Cortesía mutua'), Y('Disciplina'), Y('Unión')]));
// pág. 44: art. 39 (impreso)
v(5, `Artículo 39 · ${S5}`, arbol('IDENTIFICACIÓN (esquema de refuerzo del artículo 39, impreso sin fosforito · pág. 44)', `${D('Identificación')} · Es una ${Y('obligación')}`, [
  Y('Al desempeñar sus funciones'),
  { t: Y('A requerimiento'), sub: [G('Autoridades'), G('Ciudadanía')] },
]));
// pág. 44: art. 41 autoridad
v(5, `Artículo 41 · ${S5}`, arbol('LA AUTORIDAD EN EL EJERCICIO DEL MANDO (esquema · pág. 44 · art. 41)', `${D('La autoridad en el ejercicio del mando')} · ${D('Implica')}`, [Y('El derecho y el deber de tomar decisiones'), Y('Dar órdenes y hacerlas cumplir'), Y('Mantener la disciplina'), Y('Administrar los recursos asignados')]));
// pág. 44: art. 41 el mando
v(5, `Artículo 41 · ${S5}`, arbol('EL MANDO (esquema · pág. 44 · art. 41)', `${D('El mando')} · ${D('Se ejercerá')}`, [Y('Con respeto a la dignidad personal'), Y('Con firmeza y determinación'), Y('Sin atribuirse ni invadir competencias ajenas')]));
// pág. 45: art. 42 líderes
v(5, `Artículo 42 · ${S5}`, arbol('LOS LÍDERES (esquema · pág. 45 · art. 42)', D('Los líderes'), [Y('Deben influir de forma positiva'), Y('Crear un entorno favorable y de cohesión'), Y('Motivar a su equipo'), Y('Tratar de obtener reconocimiento y aprecio'), Y('Contribuir a la buena imagen del Cuerpo')]));
// pág. 45: art. 42 liderazgo ejemplar
v(5, `Artículo 42 · ${S5}`, arbol('LIDERAZGO EJEMPLAR (esquema · pág. 45 · art. 42)', D('Liderazgo ejemplar'), [D('Prestigio personal'), D('Dedicación profesional'), D('Preparación'), D('Iniciativa'), D('Capacidad de decisión'), D('Preocupación permanente por su personal')]));
// pág. 46: art. 46
v(5, `Artículo 46 · ${S5}`, arbol('INVESTIGACIONES (esquema · pág. 46 · art. 46)', D('Investigaciones'), [Y('Rigurosas'), Y('Exhaustivas'), Y('Imparciales'), Y('Sujetas principio legalidad'), Y('Sujetas control judicial'), Y('Evitar injerencia arbitraria en la vida privada de las personas'), Y('Velar por la reputación de las personas')]));
// pág. 47: art. 50
v(5, `Artículo 50 · ${S5}`, arbol('LAS FUNCIONES (esquema · pág. 47 · art. 50)', `${D('Las funciones')} · ${Y('Técnicas')} · ${Y('Administrativas')} · ${Y('Logísticas')} · ${Y('Financieras')} · ${Y('Están basadas en')}`, [Y('Objetividad'), Y('Imparcialidad'), Y('Eficacia'), Y('Eficiencia')]));

// ───────── OG 10/2024 ─────────
// pág. 53: objeto y ámbito
v(6, `Artículo 2 · ${S6}`, cols('OG 10/2024, POR LA QUE SE REGULA EL SINTEGC (cuadro · pág. 53 · objeto y ámbito de aplicación)', [
  { t: D('OBJETO'), l: [
    `${D('Regular el SINTEGC,')} el cual:`,
    `${P('Promoverá')} las ${Y('conductas')} éticas en la Guardia Civil, de acuerdo con los ${Y('valores y principios')} de la Institución, que contribuyan a acrecentar su prestigio y a la excelencia en la actuación profesional de sus miembros, ${Y('proporcionando')} un ${Y('servicio de calidad')} a la sociedad, sus ciudadanos e instituciones.`,
    `${P('Prevendrá, detectará')} y, ${K('en su caso,')} ${P('perseguirá')} las ${Y('conductas contrarias')} a la ${Y('legalidad.')}`,
  ] },
  { t: D('ÁMBITO DE APLICACIÓN'), l: [
    `${G('Personal de la Guardia Civil')} (en ${Y('cualquier')} situación administrativa en que se encuentre sujeto a ${Y('derechos y obligaciones')}).`,
    `${G('Alumnado')} de los centros docentes de ${Y('formación')} para ingreso en las ${Y('diferentes escalas.')}`,
    `${G('Personal de las Fuerzas Armadas')} (desempeñe su actividad en puestos de trabajo de las unidades, centros y órganos de la Guardia Civil) y el ${G('personal civil funcionario, laboral y eventual')} que preste sus servicios en la ${G('Guardia Civil')} (actuaciones afecten a la ${Y('gestión de los recursos')} de la Institución o pueda comprometer su imagen).`,
  ] },
  { t: G('Cualquier otra persona'), l: [
    `que teniendo o habiendo tenido algún tipo de ${Y('relación laboral contractual directa o indirectamente')} con la Guardia Civil, proporcione información relativa a una ${Y('infracción penal')} o ${Y('administrativa grave o muy grave,')} obtenida en el ámbito de la ${Y('citada relación.')}`,
    `${KY('Únicamente')} en relación con las ${G('disposiciones relacionadas')} con el ${Y('funcionamiento')} del Sistema Interno de Información (art. 8).`,
  ] },
]));
// pág. 54: SINTEGC (impreso)
v(6, `Artículo 4 · ${S6}`, tabla('SINTEGC (cuadro impreso, sin fosforito en el cuadro · pág. 54)', ['Apartado', 'Contenido'], [
  { l: 'DEFINICIÓN', c: 'o', h: [{ t: `${Y('Conjunto interrelacionado')} de ${Y('elementos organizativos, políticas, normas, procesos y procedimientos')} que se relacionan entre sí de forma ordenada y tienen por ${Y('finalidad fomentar comportamientos éticos')} basados en valores y principios orientados al ${Y('interés general y el bien común,')} así como para ${Y('prevenir, detectar')} y, ${K('en su caso,')} ${Y('perseguir las conductas contrarias a la legalidad.')}` }] },
  { l: 'ELEMENTOS', c: 'o', h: [
    { t: `${Y('Elementos normativos y sus desarrollos,')} destacando el Código de Conducta del personal de la Guardia Civil, aprobado por ${G('Real Decreto 176/2022')}, de 4 de marzo.` },
    { t: `${Y('Plan de Acción de Ética Profesional')} y las normas de siguiente nivel que del mismo se deriven.` },
    { t: Y('Modelo de análisis, evaluación y seguimiento.') },
    { t: Y('Sistema interno de información.') },
    { t: Y('Buzón de ética institucional.') },
    { t: Y('Elementos organizativos de gestión y control.') },
  ] },
  { l: 'CONTRIBUYEN A SU FINALIDAD', c: 'o', h: [
    { t: G('Comité de Gestión de Conducta Ética de la Guardia Civil (COMGECET).') },
    { t: G('Observatorio de Conducta Ética de la Guardia Civil.') },
    { t: G('Comité interno de gestión de medidas antifraude de la Guardia Civil.') },
    { t: G('El Servicio de Asuntos Internos.') },
    { t: G('Grupo de trabajo permanente de seguimiento del Plan de Acción de ética profesional.') },
  ] },
  { t: `Para llevar a cabo una ${Y('adecuada gestión y control del SINTEGC,')} así como para ${Y('sistematizar su evaluación y seguimiento.')}` },
]));
// pág. 57: sistema interno de información
v(6, `Artículo 8 · ${S6}`, tabla('SISTEMA INTERNO DE INFORMACIÓN (cuadro · pág. 57)', ['Apartado', 'Contenido'], [
  { l: 'FINALIDAD PRINCIPAL', c: 'o', h: [
    { t: `${P('Proporcionar')} ${Y('protección adecuada frente a represalias')} que puedan sufrir las ${Y('personas informantes')} sobre alguna de las ${Y('acciones u omisiones.')}` },
    { t: `Esta protección se extiende a las ${G('personas de las asociaciones profesionales')} ${O('cuando')} asesoren, apoyen y asistan a su personal asociado en este ámbito.` },
  ] },
  { l: '¿QUÉ SE PUEDE INFORMAR?', c: 'o', h: [
    { t: `${Y('Cauce para informar')} sobre presuntas ${Y('acciones u omisiones')} obtenidas en ${Y('contexto laboral o profesional')} con la ${G('Guardia Civil')} por parte de: ${G('Guardias civiles.')} · ${G('Personas que trabajen en el sector público o privado.')}` },
    { t: `Presuntas acciones u omisiones que ${Y('puedan constituir infracciones de Derecho de la UE')} siempre que entren dentro del ${Y('ámbito de aplicación de los actos de la UE')} enumerados en el anexo de la Directiva (UE) 2019/1937, independientemente de cómo se califiquen en el ordenamiento jurídico interno; que ${Y('afecten a los intereses financieros de la UE o incidan en el mercado interior.')}` },
    { t: `Presuntas acciones u omisiones que ${Y('puedan ser constitutivas de infracción penal o administrativa grave o muy grave')} (en ${K('todo caso')} las que impliquen ${K('quebranto económico')} para la ${G('Hacienda Pública')} y para la ${G('Seguridad Social')}).` },
    { t: `* Se entenderán incluidas las referidas a infracciones penales o administrativas graves o muy graves del derecho laboral en materia de seguridad y salud en el trabajo, sin perjuicio de lo dispuesto en el Real Decreto 696/2022, de 23 de agosto.` },
  ] },
  { l: 'ACCESO', c: 'o', h: [{ t: `${D('Canal interno de información')} ➜ Accesible desde el apartado correspondiente de la web: ${Y('guardiacivil.es')}` }] },
  { l: 'DISEÑO Y GARANTÍAS', c: 'o', h: [
    { t: D('Diseñado, establecido y gestionado de forma segura') },
    { t: `Confidencialidad de la ${Y('identidad del informante,')}` },
    { t: `Confidencialidad de terceros ${Y('mencionados,')}` },
    { t: `Confidencialidad de las ${Y('actuaciones realizadas durante la gestión de la tramitación,')}` },
    { t: `${Y('Protección de datos,')} impidiendo el acceso a personal no autorizado.` },
    { t: `La ${Y('identidad del informante')} ${D('solo podrá comunicarse')} a: ${G('Autoridad judicial,')} ${G('Ministerio Fiscal,')} ${G('Autoridad administrativa competente,')} ${KY('y únicamente')} en el marco de una ${K('investigación penal, disciplinaria o sancionadora.')}` },
  ] },
  { l: 'REGULACIÓN DEL FUNCIONAMIENTO', c: 'o', h: [{ t: D('Instrucción de mi Autoridad') }] },
]));
// pág. 60 (en tu lista, 59): Observatorio
v(6, `Artículo 11 · ${S6}`, cols('OBSERVATORIO DE CONDUCTA ÉTICA (cuadro · pág. 60 · art. 11)', [
  { t: D('Principal herramienta'), l: [
    `para centralizar las ${D('labores de:')}`,
    `✔ ${Y('Seguimiento')}`, `✔ ${Y('impulso')}`, `✔ ${Y('Evaluación')}`,
    `de la ${G('aplicación del Código de Conducta en la Guardia Civil.')}`,
  ] },
  { t: D('Principal órgano de asesoramiento técnico, asistencia y apoyo del COMGECET.'), l: [
    `Tiene ${Y('dependencia funcional')} del COMGECET.`,
    `Ejerce ${Y('funciones asignadas')} por el COMGECET, dentro de su ámbito de actuación.`,
  ] },
  { t: D('Compuesto por:'), l: [
    `1. Una ${G('persona que ejerza la Dirección.')}`, `2. Una ${G('Unidad de Análisis.')}`, `3. Una ${G('Oficina de Apoyo.')}`,
  ] },
  { t: `El Observatorio con la ${Y('información y el apoyo')} que precise para el desempeño de sus funciones de:`, l: [
    G('Jefaturas.'), G('Servicios.'), `Demás unidades de la ${G('DGGC.')}`, G('Asociaciones profesionales de guardias civiles.'),
  ] },
]));
// pág. 63: grupo de trabajo PLAEP
v(6, `Artículo 14 · ${S6}`, tabla('GRUPO DE TRABAJO PERMANENTE DE SEGUIMIENTO DEL PLAEP (cuadro · pág. 63 · art. 14)', ['Apartado', 'Contenido'], [
  { l: P('Se constituye'), c: 'o', h: [
    { t: `un ${G('órgano permanente de trabajo')} para: ${D('Elaboración.')} · ${D('Seguimiento.')} · ${D('Actualización.')} del Plan de Acción Ética Profesional ${G('(PLAEP).')}` },
  ] },
  { l: P('Integrado por'), c: 'o', h: [
    { t: `Representantes de la ${G('DGGC.')}` },
    { t: `Representantes de ${G('asociaciones profesionales')} con representación en el ${G('Consejo de la Guardia Civil.')}` },
  ] },
  { l: G('Presidencia'), c: 'o', h: [{ t: `La persona que la dirija será la que ${G('ejerza la Dirección del Observatorio de Conducta Ética.')}` }] },
  { l: G('Secretaría'), c: 'o', h: [{ t: `La ejerce un ${O('oficial')} ${Y('designado por la persona que ejerza la Presidencia.')}` }] },
  { l: 'Miembros del grupo (además de Presidencia y Secretaría)', c: 'o', h: [
    { t: `${G('Personas representantes de:')} ${Y('El Gabinete Técnico.')} · ${Y('La Dirección Adjunta Operativa.')} · ${Y('El Mando de Personal.')} · ${Y('El Mando de Apoyo.')} · ${Y('La Asesoría Jurídica.')} · Cada una de las ${G('asociaciones profesionales')} con representación en el Consejo de la Guardia Civil.` },
  ] },
  { l: P('Se informarán en el grupo'), c: 'o', h: [
    { t: `Propuestas de ${D('revisión y actualización')} de la normativa del SINTEGC.` },
    { t: `${D('Desarrollo de aspectos concretos')} del PLAEP.` },
    { t: `${D('Consultas')} planteadas a través del ${D('Buzón de Ética Institucional.')}` },
  ] },
  { l: P('Sobre las consultas'), c: 'o', h: [
    { t: `El ${G('Observatorio')} las ${Y('remitirá')} a los miembros del grupo de trabajo en representación de cada una de las ${G('asociaciones profesionales')} con representación en el Consejo de la Guardia Civil. Tienen ${P('10 días hábiles')} para:` },
    { t: `Informar sobre si debe elevarse al ${G('COMGECET.')}` },
    { t: D('Proponer una respuesta.') },
    { t: D('Cualquier circunstancia de interés.') },
  ] },
  { t: `${P('Reuniones con carácter semestral')} al objeto de ser informado del ${Y('desarrollo de las actuaciones')} del ${G('SINTEGC.')}` },
]));

module.exports = V;
if (require.main === module) {
  const fs = require('fs'), path = require('path'), L = require('../literal-lib.js');
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const CLAVE = { 4: 'T27_RD', 5: 'T27_COD', 6: 'T27_OG' };
  let colocados = 0; const por = {};
  for (const k of Object.values(CLAVE)) por[k] = L.get(s, k).html.replace(/<!--VIS27B-->[\s\S]*?<!--\/VIS27B-->/g, '');
  const ins = {};
  for (const [ley, loc, vis] of V) {
    const key = CLAVE[ley], h = por[key], k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; const hd = (h.slice(a, b).match(/articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''; if (norm(hd) === k) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', ley, loc.slice(0, 60)); continue; }
    (ins[key] = ins[key] || []).push([i, vis]);
  }
  for (const key of Object.keys(ins)) {
    let h = por[key]; const orden = ins[key].map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS27B-->' + vis + '<!--/VIS27B-->' + h.slice(i); colocados++; }
    s = L.put(s, key, h);
  }
  for (const key of Object.keys(por)) if (!ins[key]) s = L.put(s, key, por[key]);
  fs.writeFileSync(F, s);
  console.log(`Tema 27 (B): cuadros ${V.length}, colocados ${colocados}`);
}
