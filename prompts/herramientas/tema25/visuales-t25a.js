require('../esq-virtual.js');
// Cuadros visuales del Tema 25 (parte a): recrean los cuadros/esquemas/organigramas de tu PDF subrayado
// (TEMA 25 COOPERACION Y COORDINACION POLICIAL-2026-08-08.pdf, págs. 5-67 del PDF, 1-based) con su texto literal.
//   Ley 1 (LO 2/1986): pág. 8 (art. 5), 10 (art. 6), 12 (arts. 9-10), 15 (arts. 11-12), 16 (art. 14), 27 (arts. 48-49), 28 (art. 50)
//   Ley 3 (RD 1087/2010): pág. 49 (art. 3), 55 (art. 19)
//   Ley 5 (INTERPOL): pág. 58 (art. 5), 60 (art. 15), 62 (art. 27)
// COLORES: TODOS estos cuadros vienen IMPRESOS en tu PDF (sin tu fosforito; solo tienen negrita/subrayado de imprenta y alguna nota a boli),
//   así que van con el MÉTODO: órganos y autoridades → verde (G); plazos, cifras → azul (P); «no / salvo / solamente / siempre que» → rojo subrayado (K);
//   conceptos clave → amarillo/naranja (Y/D). Las notas a boli van como pie «✎».
// LOCALIZADOR: v(ley, loc, html)
//   ley: 1 = LO 2/1986 · 2 = Ley 31/2010 · 3 = RD 1087/2010 · 5 = Estatuto INTERPOL (4 = Europol, no tiene cuadros aquí)
//   loc: cabecera de la ficha del esquema del T25 tras la que se inserta el cuadro (empieza por «Artículo N · …»; se busca con includes sobre la cabecera).
// Uso: lo consume el montador de visuales (module.exports = V = [[ley, loc, html], …]).
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const pie = t => `<div class="vis-pie" style="font-size:.86em;opacity:.85;margin-top:6px">✎ ${t}</div>`;
const V = []; const v = (ley, loc, html) => V.push([ley, loc, html]);
const F1 = 'Fuerzas y Cuerpos de Seguridad', F3 = 'Juntas Locales de Seguridad', F5 = 'INTERPOL';

// ───────── art. 5 · PRINCIPIOS BÁSICOS DE ACTUACIÓN 1-6 (pág. 8 del PDF) ─────────
v(1, `Artículo 5 · ${F1}`, tabla('PRINCIPIOS BÁSICOS DE ACTUACIÓN · 6 bloques (cuadro del temario · pág. 8 · art. 5)', ['Principio', 'Texto de la ley'], [
  { l: `${KD('1 · ADECUACIÓN AL ORDENAMIENTO JURÍDICO')}`, c: 'o', h: [
    { t: `Ejercer su función con ${KY('absoluto respeto a la Constitución y al resto del Ordenamiento Jurídico')}.` },
    { t: `Actuar en el cumplimiento de sus funciones, con ${KY('absoluta neutralidad política e imparcialidad')} y, en consecuencia, ${K('sin')} discriminación alguna por razón de raza, religión u opinión.` },
    { t: `Actuar con ${KY('integridad y dignidad')}. En particular debe abstenerse en todo acto de ${D('corrupción')} y oponerse a él resueltamente.` },
    { t: `Sujetarse en su actuación profesional, a los ${KY('principios de jerarquía y subordinación')}. ${K('En ningún caso')}, la obediencia debida podrá amparar órdenes que entrañen la ejecución de actos que manifiestamente constituyen delito o sean contrarios a la Constitución o a las Leyes.` },
    { t: `${KY('Colaborar con la Administración de Justicia y auxiliarla')} en los términos establecidos en la Ley.` },
  ] },
  { l: `${KD('2 · RELACIONES CON LA COMUNIDAD')}`, c: 'v', h: [
    { t: `${KY('Impedir')}, en el ejercicio de su actuación profesional, ${KY('cualquier práctica abusiva, arbitraria o discriminatoria')} que entrañe violencia física o moral.` },
    { t: `Observar ${KY('en todo momento un trato correcto y esmerado')} en sus relaciones con los ciudadanos, a quienes procuraran auxiliar y proteger, ${KY('siempre que las circunstancias lo aconsejen o fueren requeridos para ello.')} En todas sus intervenciones, proporcionaran información cumplida, y tan amplia como sea posible, sobre las causas y finalidad de las mismas.` },
    { t: `En el ejercicio de sus funciones ${D('deberán actuar con la decisión necesaria, sin demora')} cuando de ello dependa evitar un ${D('daño grave, inmediato e irreparable')}; rigiéndose al hacerlo por los ${D('principios de congruencia, oportunidad y proporcionalidad')} en la utilización de los medio a su alcance.` },
    { t: `${KD('Solamente')} deberán utilizar las armas en las situaciones en que exista un riesgo ${D('racionalmente grave')} para su vida, su integridad física o las de terceras personas, o en aquellas circunstancias que puedan suponer un ${D('grave')} riesgo para la seguridad ciudadana y de conformidad con los principios a que se refiere el apartado anterior.` },
  ] },
  { l: `${KD('3 · TRATAMIENTO DE DETENIDOS')}`, c: 'c', h: [
    { t: `Los miembros de las Fuerzas y Cuerpos de Seguridad ${KY('deberán identificarse debidamente')} como tales en el momento de efectuar una detención.` },
    { t: `${KY('Velarán por la vida e integridad física')} de las personas a quienes detuvieren o que se encuentren bajo su custodia y respetarán el honor y la dignidad de las personas.` },
    { t: `Darán cumplimiento y observarán con la debida diligencia los ${KY('trámites, plazos y requisitos exigidos por el Ordenamiento Jurídico')}, cuando se proceda a la detención de una persona.` },
  ] },
  { l: `${KD('4 · DEDICACIÓN PROFESIONAL')}`, c: 'a', h: [
    { t: `Deberán llevar a cabo sus ${KY('funciones con total dedicación')}, debiendo intervenir siempre, en cualquier tiempo y lugar, ${KY('se hallen o no de servicio')}, en defensa de la Ley y de la seguridad ciudadana.` },
  ] },
  { l: `${KD('5 · SECRETO PROFESIONAL')}`, c: 'o', h: [
    { t: `Deberán guardar ${KY('riguroso secreto')} respecto a todas las informaciones que conozcan ${KY('por razón o con ocasión del desempeño de sus funciones')}. ${K('No')} estarán obligados a revelar las fuentes de información ${K('salvo')} que el ejercicio de sus funciones o las disposiciones de la Ley les impongan actuar de otra manera.` },
  ] },
  { l: `${KD('6 · RESPONSABILIDAD')}`, c: 'v', h: [
    { t: `Son responsables ${D('personal y directamente')} por los actos que en su actuación profesional llevaren a cabo, infringiendo o vulnerando las normas legales, así como las reglamentarias que rijan su profesión y los principios enunciados anteriormente, ${K('sin perjuicio')} de la responsabilidad patrimonial que pueda corresponder a las ${G('Administraciones Publicas')} por las mismas.` },
  ] },
]));

// ───────── art. 6 · PRINCIPIOS: promoción / provisión (pág. 10 del PDF; las cajas R3 y R4 de la pág. 9 son estas mismas listas) ─────────
v(1, `Artículo 6 · ${F1}`, cols('PRINCIPIOS (cuadro del temario · pág. 10 · art. 6.1 y 6.6 · cajas R3 y R4 de la pág. 9)', [
  { t: KD('PROMOCIÓN PROFESIONAL, SOCIAL Y HUMANA'), l: [`${Y('OBJETIVIDAD')}`, `${Y('IGUALDAD DE OPORTUNIDADES')}`, `${Y('MÉRITO')}`, `${Y('CAPACIDAD')}`] },
  { t: KD('PROVISIÓN DE PUESTOS DE SERVICIO'), l: [`${Y('MÉRITO')}`, `${Y('CAPACIDAD')}`, `${Y('ANTIGÜEDAD')}`] },
]));

// ───────── arts. 9-10 · ORGANIGRAMA de las Fuerzas y Cuerpos de Seguridad del Estado (pág. 12 del PDF) ─────────
v(1, `Artículo 10 · ${F1}`, flujo('DE LAS FUERZAS Y CUERPOS DE SEGURIDAD DEL ESTADO · organigrama (cuadro del temario · pág. 12 · arts. 9-10)', [
  { et: '1º', c: 'o', t: `${G('MINISTRO DE INTERIOR')}` },
  { t: `Le corresponde:` },
  { bif: [
    { c: 'v', t: `${Y('Administración general de la seguridad ciudadana')}` },
    { c: 'o', t: `${KD('MANDO SUPERIOR')} de las Fuerzas y Cuerpos de Seguridad del Estado` },
    { c: 'c', t: `Responsabilidad de las relaciones de ${Y('colaboración y auxilio')} con las ${G('Autoridades policiales de otros países')} (conforme a lo establecido en Tratados y Acuerdos Internacionales)` },
  ] },
  { t: `${KY('Dicho mando será ejercido')} en los términos establecidos en esta Ley por el:` },
  { et: '2º', c: 'o', t: `${G('DIRECTOR DE LA SEGURIDAD DEL ESTADO')}<br>• Bajo la ${D('inmediata autoridad del Ministro del Interior')}<br>• Del Director de la Seguridad del Estado, dependen directamente:<br>&nbsp;&nbsp;◦ ${G('Dirección General de la Guardia Civil')}<br>&nbsp;&nbsp;◦ ${G('Dirección General de la Policía')}<br>• A través de las Direcciones Generales ${D('coordinará la actuación')} de las Fuerzas y Cuerpos de Seguridad del Estado` },
  { t: `${KY('En cada provincia:')}` },
  { et: '3º', c: 'v', t: `${G('GOBERNADOR CIVIL')}<br>• Ejercerá el ${KD('MANDO DIRECTO')} de las Fuerzas y Cuerpos de Seguridad del Estado<br>• Estará ${KY('sujeto a las directrices')} del:<br>&nbsp;&nbsp;◦ ${G('Ministro del Interior')}, y<br>&nbsp;&nbsp;◦ ${G('Director de la Seguridad del Estado')}<br>• ${K('Sin perjuicio')} de la ${D('dependencia funcional')} de las ${D('Unidades de Policía Judicial')}, respecto de los ${G('Jueces, de los Tribunales y del Ministerio Fiscal')}, en sus funciones de averiguación del delito y descubrimiento y aseguramiento del delincuente.` },
]));

// ───────── arts. 11-12 · FUNCIONES: comunes / CNP / Guardia Civil (pág. 15 del PDF) ─────────
v(1, `Artículo 12 · ${F1}`, cols('FUNCIONES · comunes y reparto CNP / Guardia Civil (cuadro del temario · pág. 15 · arts. 11-12)', [
  { t: `Las ${G('FUERZAS Y CUERPOS DE SEGURIDAD DEL ESTADO')} tienen como misión ${D('proteger el libre ejercicio de los derechos y libertades y garantizar la seguridad ciudadana')} mediante el desempeño de las siguientes funciones:`, l: [
    `${KY('Velar')} por el cumplimiento de las Leyes y disposiciones generales, ${D('ejecutando las órdenes')} que reciban de las ${G('Autoridades')}, en el ámbito de sus respectivas competencias.`,
    `${KY('Auxiliar y proteger')} a las personas y asegurar la conservación y custodia de los bienes que se encuentren en situación de ${D('peligro')} por cualquier causa.`,
    `${KY('Vigilar y proteger')} los edificios e instalaciones ${KY('públicos')} que lo requieran.`,
    `${KY('Velar')} por la protección y seguridad de ${KY('altas personalidades')}.`,
    `${KY('Mantener y restablecer')}, en su caso, el orden y la seguridad ciudadana.`,
    `${KY('Prevenir')} la comisión de actos delictivos.`,
    `${KY('Investigar')} los delitos para ${D('descubrir y detener')} a los presuntos culpables, asegurar los instrumentos, efectos y pruebas del delito, poniéndolos a disposición del ${G('Juez o Tribunal competente')} y elaborar los informes técnicos y periciales procedentes.`,
    `${KY('Captar, recibir y analizar')} cuantos datos tengan interés para el orden y la seguridad pública, y ${D('estudiar, planificar y ejecutar')} los métodos y técnicas de prevención de la delincuencia.`,
    `${KY('Colaborar')} con los servicios de ${KY('protección civil')} en los casos de grave riesgo, catástrofe, o calamidad pública, en los términos que se establezcan en la legislación de protección civil.`,
    `Corresponde al ${G('Cuerpo Nacional de Policía')} ejercitar dichas funciones en las ${D('capitales de provincia')} y en los términos municipales y núcleos urbanos que el ${G('Gobierno')} determine.`,
    `La ${G('Guardia Civil')} las ejercerá en el ${D('resto del territorio nacional y su mar territorial')}.`,
  ] },
  { t: `Serán ejercidas por el ${G('CUERPO NACIONAL DE POLICÍA')}:`, l: [
    `La ${KY('expedición')} del documento nacional de identidad y de los pasaportes.`,
    `El ${KY('control de entrada y salida')} del territorio nacional de españoles y extranjeros.`,
    `Las previstas en la legislación sobre ${KY('extranjería, refugio y asilo, expulsión, extradición, emigración e inmigración')}.`,
    `La vigilancia e inspección del cumplimiento de la normativa en materia de ${KY('juego')}.`,
    `La investigación y persecución de los delitos relacionados con la ${KY('droga')}.`,
    `${KY('Colaborar y prestar auxilio a las policías de otros países')}, conforme a lo establecido en los Tratados o Acuerdos Internacionales sobre las Leyes, bajo la superior dirección del ${G('Ministro del Interior')}.`,
    `El ${KY('control de las entidades y servicios privados de seguridad, vigilancia e investigación, de su personal, medios y actuaciones')}.`,
    `Aquellas otras que le atribuye la legislación vigente.`,
  ] },
  { t: `Serán ejercidas por la ${G('GUARDIA CIVIL')}:`, l: [
    `Las derivadas de la legislación vigente sobre ${KY('armas y explosivos')}.`,
    `El ${KY('resguardo fiscal')} del Estado y las actuaciones encaminadas a evitar y perseguir el ${D('contrabando')}.`,
    `La ${KY('vigilancia del tráfico, tránsito y transporte')} en las vías públicas ${KY('interurbanas')}.`,
    `La ${KY('custodia')} de vías de comunicación ${KY('terrestre, costas, fronteras, puertos, aeropuertos y centros e instalaciones')} que por su interés lo requieran.`,
    `Velar por el cumplimiento de las disposiciones que tiendan a la ${KY('conservación de la naturaleza y medio ambiente, de los recursos hidráulicos')}, así como de la riqueza cinegética, piscícola, forestal y de cualquier otra índole relacionada con la naturaleza.`,
    `La ${KY('conducción interurbana')} de presos y detenidos.`,
    `Aquellas otras que le atribuye la legislación vigente.`,
  ] },
]));

// ───────── art. 14 · COMPETENCIAS Ministro de Interior y de Defensa en la Guardia Civil (pág. 16 del PDF) ─────────
v(1, `Artículo 14 · ${F1}`, cols('COMPETENCIAS ATRIBUIDAS AL MINISTRO DE INTERIOR Y DEFENSA EN LA GUARDIA CIVIL (cuadro del temario · pág. 16 · art. 14)', [
  { t: G('MINISTRO DE INTERIOR'), l: [
    `Dispondrá todo lo concerniente a: ${D('servicios de la Guardia Civil relacionados con la seguridad ciudadana')} y demás competencias atribuidas por esta Ley.`,
    `Así como a: ${KY('retribuciones')} · ${KY('destinos')} · ${KY('acuartelamientos')} y ${KY('material')}`,
  ] },
  { t: G('MINISTRO DE DEFENSA'), l: [
    `Dispondrá lo concerniente: al régimen de ${KY('ascensos')} y ${KY('situaciones del personal')},`,
    `así como a las ${KD('misiones de carácter militar')} que se encomienden a la Guardia Civil, ejerciendo, respecto al ${D('voluntariado especial')} para la prestación del servicio militar en la misma las competencias que normativamente le correspondan.`,
  ] },
]) + cols('CONJUNTAMENTE (cuadro del temario · pág. 16 · art. 14.2)', [
  { t: `${G('Los Ministros de Defensa e Interior')} dispondrán todo lo referente a la:`, l: [`${KY('selección')}`, `${KY('perfeccionamiento')}`, `${KY('armamento')} y`, `${KY('despliegue territorial')}`] },
  { t: `Y ${KD('propondrán al Gobierno')}:`, l: [`el ${KY('nombramiento del titular de la Dirección General de la Guardia Civil')},`, `así como la ${KY('normativa reguladora del voluntariado especial')} para la prestación del servicio militar en la misma.`] },
]) + pie('Nota a boli del temario: junto a «selección,» has escrito «formación» (letra a boli, poco legible; en la ley el art. 14.2 dice «selección, formación, perfeccionamiento…»).'));

// ───────── art. 48 · CONSEJO DE POLÍTICA DE SEGURIDAD: composición y competencias (pág. 27 del PDF) ─────────
v(1, `Artículo 48 · ${F1}`, cols('CONSEJO DE POLÍTICA DE SEGURIDAD · composición y competencias (cuadro del temario · pág. 27 · art. 48)', [
  { t: G('CONSEJO DE POLÍTICA DE SEGURIDAD'), l: [
    `Para ${D('garantizar la coordinación')} entre las políticas de seguridad pública del Estado y de las Comunidades Autónomas se crea el ${G('CONSEJO DE POLÍTICA DE SEGURIDAD')}, que estará ${KD('presidido')} por el ${G('Ministro del Interior')} e ${KD('integrado')} por:`,
    `- los ${G('Consejeros de Interior o Gobernación de las Comunidades Autónomas')} y`,
    `- por un ${D('número igual de representantes del Estado')} designados por el ${G('Gobierno de la Nación')}.`,
  ] },
  { t: `${G('COMPETENCIAS DEL CONSEJO DE POLÍTICA DE SEGURIDAD')}`, l: [
    `${KY('Aprobar')} los ${D('planes de coordinación')} en materia de seguridad y de infraestructura policial.`,
    `${KY('Informar')} las ${D('plantillas')} de los Cuerpos de Policía de las Comunidades Autónomas y sus modificaciones. El Consejo podrá establecer el ${D('número máximo')} de los efectivos de las plantillas.`,
    `${KY('Aprobar')} ${D('directivas y recomendaciones')} de carácter ${D('general')}`,
    `${KY('Informar')} las ${D('disposiciones')} que dicten las Comunidades Autónomas, en relación con sus ${D('propios')} Cuerpos de Policía, así como la ${D('creación')} de éstos`,
    `${KY('Informar')} los ${D('convenios de cooperación')}, en materia de seguridad, entre el Estado y las Comunidades Autónomas.`,
    `Las demás que le atribuya la legislación vigente.`,
  ] },
]));

// ───────── art. 49 · COMITÉ DE EXPERTOS (pág. 27 del PDF) ─────────
v(1, `Artículo 49 · ${F1}`, cols('COMITÉ DE EXPERTOS · composición y funciones (cuadro del temario · pág. 27 · art. 49)', [
  { t: KD('COMPOSICIÓN'), l: [
    `Integrado por ${P('ocho')} representantes:`,
    `${P('cuatro')} del ${G('Estado')} y`,
    `${P('cuatro')} de las ${G('Comunidades Autónomas')}, designados estos últimos ${P('anualmente')} por los miembros del ${G('Consejo de Política de Seguridad')} que representen a las Comunidades Autónomas.`,
  ] },
  { t: KD('FUNCIONES'), l: [
    `${KY('Asesorar técnicamente')} al ${G('CONSEJO DE POLÍTICA DE SEGURIDAD')} y ${KY('preparar los asuntos')} que posteriormente vayan a ser debatidos en el Pleno del mismo`,
    `${KD('FUNCIONES CON CARÁCTER ESPECÍFICO')}:`,
    `${KY('Elaborar y proponer')} fórmulas de coordinación.`,
    `${KY('Preparar')} acuerdos de cooperación.`,
    `${KY('Proponer')} programas de formación y perfeccionamiento de las Policías.`,
    `${KY('Elaborar')} planes de actuación conjunta.`,
  ] },
]));

// ───────── art. 50 · ÓRGANOS DE COORDINACIÓN ENTRE LAS FFCCSE Y LAS CCAA (pág. 28 del PDF) ─────────
v(1, `Artículo 50 · ${F1}`, arbol('ÓRGANOS DE COORDINACIÓN ENTRE LAS FFCCSE Y LAS CCAA (cuadro del temario · pág. 28 · arts. 48-50)', `${KD('ÓRGANOS DE COORDINACIÓN ENTRE LAS FFCCSE Y LAS CCAA')}`, [
  { t: `${G('CONSEJO DE POLÍTICA DE SEGURIDAD')}`, sub: [] },
  { t: `${G('COMITÉ DE EXPERTOS')}`, sub: [] },
  { t: `${G('JUNTAS DE SEGURIDAD')}`, sub: [] },
]) + pie('En tu esquema una flecha doble une Consejo de Política de Seguridad con Comité de Expertos, y otra flecha lleva a las Juntas de Seguridad.'));

// ───────── RD 1087/2010 · art. 3 · ÓRGANOS DE COORDINACIÓN ENTRE LAS FFCCSE Y LOS MUNICIPIOS (pág. 49 del PDF) ─────────
v(3, `Artículo 3 · ${F3}`, arbol('ÓRGANOS DE COORDINACIÓN ENTRE LAS FFCCSE Y LOS MUNICIPIOS (cuadro del temario · pág. 49 · art. 3)', `${KD('ÓRGANOS DE COORDINACIÓN ENTRE LAS FFCCSE Y LOS MUNICIPIOS')}`, [
  { t: `${G('JUNTAS LOCALES DE SEGURIDAD')}`, sub: [`(En ${D('municipios o agrupaciones de municipios')} que tengan ${D('Cuerpo de Policía propio')}).`] },
  { t: `${G('COMISIÓN LOCAL DE SEGURIDAD')}`, sub: [`(Donde ${K('no')} exista ${D('Cuerpo de Policía Local')}).`] },
]) + pie('En tu esquema una flecha doble une las dos cajas (Junta Local de Seguridad ↔ Comisión Local de Seguridad).'));

// ───────── RD 1087/2010 · art. 19 · ÓRGANOS RELACIONADOS CON LAS JUNTAS LOCALES DE SEGURIDAD (pág. 55 del PDF) ─────────
v(3, `Artículo 19 · ${F3}`, arbol('ÓRGANOS RELACIONADOS CON LAS JUNTAS LOCALES DE SEGURIDAD (cuadro del temario · pág. 55 · arts. 12-19)', `${KD('ÓRGANOS RELACIONADOS CON LAS JUNTAS LOCALES DE SEGURIDAD')}`, [
  { t: `${KD('COMISIONES TÉCNICAS')}`, sub: [`(Órgano de asesoramiento)`] },
  { t: `${KD('CONSEJOS LOCALES DE SEGURIDAD')}`, sub: [`(Órgano de participación ciudadana)`] },
  { t: `${KD('COMISIONES DE COORDINACIÓN POLICIAL')}`, sub: [] },
  { t: `${KD('JUNTAS DE SEGURIDAD DE DISTRITO')}`, sub: [] },
]) + pie('Notas a boli del temario: bajo «Comisiones de coordinación policial» has escrito «(Jefes Policiales)»; y debajo del cuadro: «Comisiones Locales de Seguridad: sin P. Lo.» (sin Policía Local).'));

// ───────── INTERPOL · art. 5 · ORGANIGRAMA (pág. 58 del PDF) ─────────
v(5, `Artículo 5 · ${F5}`, arbol('INTERPOL · organigrama (cuadro del temario · pág. 58 · art. 5)', `${KD('INTERPOL')}`, [
  { t: `${G('ASAMBLEA GENERAL')}`, sub: [] },
  { t: `${G('COMITÉ EJECUTIVO')}`, sub: [] },
  { t: `${G('SECRETARÍA GENERAL')}`, sub: [] },
  { t: `${G('OFICINAS CENTRALES NACIONALES')}`, sub: [] },
  { t: `${G('ASESORES')}`, sub: [] },
]));

// ───────── INTERPOL · art. 15 · COMITÉ EJECUTIVO: composición (pág. 60 del PDF) ─────────
v(5, `Artículo 15 · ${F5}`, arbol('COMITÉ EJECUTIVO · composición (cuadro del temario · pág. 60 · art. 15)', `${G('COMITÉ EJECUTIVO')} · ${KD('COMPOSICIÓN')}: ${P('Trece')} miembros:`, [
  { t: `el ${G('Presidente de la Organización')}`, sub: [] },
  { t: `${P('tres')} ${G('Vicepresidentes')}`, sub: [] },
  { t: `${P('nueve')} ${G('Vocales')}`, sub: [] },
]));

// ───────── INTERPOL · art. 27 · SECRETARÍA GENERAL: composición (pág. 62 del PDF) ─────────
v(5, `Artículo 27 · ${F5}`, arbol('SECRETARÍA GENERAL · composición (cuadro del temario · pág. 62 · art. 27)', `${G('SECRETARÍA GENERAL')} · ${KD('COMPOSICIÓN')}:`, [
  { t: `${G('Secretario General')}.`, sub: [] },
  { t: `${D('Personal técnico y administrativo')}.`, sub: [] },
]));

module.exports = V;
if (require.main === module) {
  const fs = require('fs'), path = require('path'), L = require('../literal-lib.js');
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const CLAVE = { 1: 'T25_LOE', 2: 'T25_L31', 3: 'T25_RD', 4: 'T25_EUR', 5: 'T25_INT' };
  let colocados = 0; const por = {};
  for (const k of Object.values(CLAVE)) por[k] = L.get(s, k).html.replace(/<!--VIS25A-->[\s\S]*?<!--\/VIS25A-->/g, '');
  const ins = {};
  for (const [ley, loc, vis] of V) {
    const key = CLAVE[ley], h = por[key], k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; const hd = (h.slice(a, b).match(/articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''; if (norm(hd) === k || norm(hd).startsWith(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', ley, loc.slice(0, 60)); continue; }
    (ins[key] = ins[key] || []).push([i, vis]);
  }
  for (const key of Object.keys(ins)) {
    let h = por[key]; const orden = ins[key].map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS25A-->' + vis + '<!--/VIS25A-->' + h.slice(i); colocados++; }
    s = L.put(s, key, h);
  }
  for (const key of Object.keys(por)) if (!ins[key]) s = L.put(s, key, por[key]);
  fs.writeFileSync(F, s);
  console.log(`Tema 25 (A): cuadros ${V.length}, colocados ${colocados}`);
}
