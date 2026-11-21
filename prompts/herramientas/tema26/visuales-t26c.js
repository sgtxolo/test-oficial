require('../esq-virtual.js');
// Cuadros visuales del Tema 26 (parte c): recrean los cuadros/esquemas de tu PDF subrayado
// (TEMA 26 ESTATUTO GC-2026-08-08.pdf, págs. 155-220 del PDF, 1-based: Orden PRE/1983/2012 y las tres Resoluciones: acoso laboral, acoso sexual, violencia sobre la mujer).
//   Págs.: 163 (Primero.1, objetivos generales), 164 (Primero.2, objetivos específicos), 167 (Quinto 5.1.b, formación continua),
//          194 y 195 (Noveno acoso sexual: publicación, responsable de la comunicación y vías de difusión), 209 (mapa del protocolo de violencia sobre la mujer),
//          212 (medidas preventivas), 214 (derechos de movilidad), 215 (jornada y horario), 220 (información, registro, seguimiento y control)
//          + notas a boli de págs. 156-157 (Orden PRE/1983/2012), 164 (Segundo acoso laboral) y 182 (Tercero.4 acoso sexual).
//   NO se recrean los formularios/anexos en blanco (págs. 176, 178, 180 · 196-198, 199-201, 202): no son cuadros de estudio.
//   NO se usan las notas a boli de págs. 170 y 193 (páginas de la versión ANTIGUA sustituida) ni las de 173, 189, 190, 192 (tachadas/MOD): vale la versión vigente.
// COLORES: leídos de TU PDF (fosforito dentro del cuadro: amarillo Y, naranja/salmón D, verde G, azul-turquesa P, subrayado rojo K, círculo O, cuadrado azul CA) en
//   págs. 163, 214, 215 y 220; el RESTO de cuadros vienen IMPRESOS sin tu fosforito (págs. 164, 167, 194, 195, 209, 212) y van con el MÉTODO:
//   órganos y autoridades → verde (G); plazos, cifras → azul (P); «no / salvo / únicamente» → rojo subrayado (K); conceptos clave (negrita impresa) → naranja (D)/amarillo (Y).
//   El lila («podrá», «se realizará»…) lo pone el script lila. Las notas a boli van como «✎».
// LOCALIZADOR: v(clave, loc, html): clave = ord | res1 | res2 | res3; loc = cabecera de la ficha del esquema tras la que se inserta.
const { R, P, D, Y, K, X, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const O = x => `<span class="m-circulo">${x}</span>`;
const CA = x => `<span class="m-caja">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const nota = t => `<span class="m-nota ro">${t}</span>`;
const pie = t => `<div class="vis-pie" style="font-size:.86em;opacity:.85;margin-top:6px">✎ ${t}</div>`;
const caja = t => `<div class="vis-pie" style="border:1px solid rgba(128,128,128,.5);border-radius:6px;padding:6px 10px;margin-top:8px">${t}</div>`;
const notas = (tit, ...ps) => `<div class="vis"><div class="vis-t"><i>✎</i>NOTAS A BOLI · ${tit}</div>${ps.map(pie).join('')}</div>`;
const V = []; const v = (clave, loc, html) => V.push([clave, loc, html]);
const S1 = 'Protocolo acoso laboral', S2 = 'Protocolo acoso sexual', S3 = 'Protocolo violencia sobre la mujer', SO = 'Orden PRE/1983/2012';

// ───────── ORD · notas a boli (págs. 156-157) ─────────
v('ord', `Artículo 1 · ${SO}`, notas('art. 1 (pág. 156)', `Art. 1.3 (Libro de Organización): ${nota('Ver 3.2')} (con flecha) y ${nota('≠')} (con flecha hacia «Libro de Organización»).`));
v('ord', `Artículo 3 · ${SO}`, notas('art. 3 (pág. 157)', `Art. 3.1: ${nota('P.P. Principal = Patria')} (entrada principal · lema «Todo por la Patria») · ${nota('Destacado = Divino ⇒ D.D.')} (lugar destacado · Cartilla Fundacional / honor como principal divisa).`, `Art. 3.2: ${nota('≠')} (con flecha hacia «Libro de Normas de Régimen Interior»).`));
v('ord', `Artículo 4 · ${SO}`, notas('art. 4 (pág. 157)', `Margen inferior: ${nota('Todo Tierra · Buques = Armada · Supletoria única M.D.')} (con flecha hacia «Ministerio de Defensa» del apdo. 2).`));

// ───────── RES1 · Primero.1 · OBJETIVOS GENERALES (pág. 163, con tu fosforito) ─────────
v('res1', `PRIMERO. Objetivos · ${S1}`, cols('OBJETIVOS GENERALES (esquema con llave · pág. 163 · Primero.1)', [
  { t: D('OBJETIVOS GENERALES'), l: [
    `${Y('Establecer las')} ${KD('medidas')} ${Y('adecuadas')} dirigidas a ${KY('evitar')} las posibles ${Y('situaciones de estos tipos de acoso')} en la Guardia Civil.`,
    `${Y('Fijar las')} ${KD('reglas')} ${Y('para')} ${KY('actuar de forma efectiva')} ante el ${KY('conocimiento')} de ${Y('que se ha')} ${KY('producido')} ${Y('una conducta de este tipo en el entorno profesional')} de los guardias civiles, garantizando su ${Y('seguridad jurídica.')}`,
    `${Y('Facilitar la')} ${KD('protección, asistencia y recuperación')} ${Y('de')} la persona sometida a acoso una vez ${Y('acreditados los hechos.')}`,
  ] },
]));

// ───────── RES1 · Primero.2 · OBJETIVOS ESPECÍFICOS (pág. 164, impreso sin fosforito) ─────────
v('res1', `PRIMERO. Objetivos · ${S1}`, cols('OBJETIVOS ESPECÍFICOS (esquema con llave · cuadro impreso · pág. 164 · Primero.2)', [
  { t: D('OBJETIVOS ESPECÍFICOS'), l: [
    `${D('Informar y potenciar')} a través del Protocolo la difusión del ${D('rechazo institucional')} a todo comportamiento que pueda constituir ${D('acoso laboral')} en el entorno profesional.`,
    `${D('Formar y sensibilizar')} al conjunto del personal de la Guardia Civil en ${D('materia de acoso laboral,')} dando pautas para identificar estos ${D('comportamientos y evitar')} que se originen en el ámbito profesional.`,
    `Disponer de la ${D('organización específica y de las medidas necesarias')} para atender y ${D('resolver los casos')} que se produzcan.`,
    `${D('Actuar')} para mantener la ${D('seguridad, tanto física como jurídica, integridad, dignidad de las personas afectadas,')} así como la aplicación de las medidas que en cada caso procedan para la ${D('protección y asistencia a las presuntas víctimas y testigos,')} incluidas las ${D('cautelares')} que resulten oportunas.`,
    `Configurar ${D('medidas de registro,')} así como realizar un ${D('seguimiento de las actuaciones')} llevadas a cabo al amparo del Protocolo a fin de albergar el conocimiento necesario que permita su adecuada ${D('evaluación y mejora.')}`,
  ] },
]));

// ───────── RES1 · Segundo · notas a boli (pág. 164) ─────────
v('res1', `SEGUNDO. Ámbito de aplicación subjetivo · ${S1}`, notas('Segundo (pág. 164)', `Apdo. 1 (llave): ${nota('2GC')}.`, `Apdo. 2 (llave): ${nota('1GC y otro Funcionario o FFAA')}.`));

// ───────── RES1 · Quinto 5.1.b · ACCIONES DE FORMACIÓN CONTINUA (pág. 167, impreso) ─────────
v('res1', `QUINTO · 5.1 Prevención primaria · ${S1}`, flujo('ACCIONES DE FORMACIÓN CONTINUA (flujo · cuadro impreso · pág. 167 · Quinto 5.1.b)', [
  { t: `${D('ACCIONES DE FORMACIÓN CONTINUA')}`, c: '' },
  { bif: [{ t: D('MANDOS INTERMEDIOS') }, { t: D('MANDOS SUPERIORES') }] },
  { t: `${D('Seminarios, cursos o talleres')} sobre ${D('habilidades directivas.')}` },
  { t: D('OBJETIVO') },
  { t: `${D('ESTRATEGIAS QUE PERMITAN:')}<br>➜ Mejorar la calidad del clima organizacional.<br>➜ Identificar factores que puedan generar reclamaciones por acoso y canalizar adecuadamente las posibles quejas en esa materia.<br>➜ Fomentar la responsabilidad y la competencia de los mandos a la hora de abordar los conflictos.<br>➜ Promover la sensibilización, información y prevención en materia de actos explícitamente hostiles y ofensivos dirigidos de manera repetida contra cualquier componente del Cuerpo en su lugar de trabajo.` },
]));

// ───────── RES2 · Tercero.4 · nota a boli (pág. 182) ─────────
v('res2', `TERCERO. Ámbito de aplicación objetivo. Definiciones · ${S2}`, notas('Tercero.4 (pág. 182)', `Al pie del apdo. 4 (infracción disciplinaria muy grave): ${nota('GC y delito Acoso Sexual o abuso autoridad art. 48 Código Penal Militar')}. (Lectura parcial: la primera palabra a boli («6C»/«GC») es dudosa.)`));

// ───────── RES2 · Noveno · PUBLICACIÓN DEL PROTOCOLO / RESPONSABLE / VÍAS (págs. 194-195, impresos) ─────────
v('res2', `NOVENO. Difusión · ${S2}`, arbol('PUBLICACIÓN DEL PROTOCOLO (esquema · cuadro impreso · pág. 194 · Noveno)', D('PUBLICACIÓN DEL PROTOCOLO'), [
  `${D('INTRANET')} DE LA GUARDIA CIVIL`, `${D('BOLETÍN OFICIAL')} DE LA GUARDIA CIVIL`,
]) + caja(`${AS} Y comunicado a todas las unidades del Cuerpo a fin de que sea conocido ${D('por todos los miembros')} de la Institución.`));
v('res2', `NOVENO. Difusión · ${S2}`, arbol('RESPONSABLE DE LA COMUNICACIÓN EFECTIVA (esquema · cuadro impreso · pág. 194 · Noveno)', D('RESPONSABLE DE LA COMUNICACIÓN EFECTIVA'), [
  G('DIRECCIÓN GENERAL DE LA GUARDIA CIVIL'), `Los ${D('principios y valores')} en los que se sustenta el protocolo y las conductas que ${K('no')} se admitirán en la organización.`,
]) + caja(`${AS} Subrayando el compromiso de la Institución de ${D('eliminar')} cualquier situación de acoso sexual o por razón de sexo y fomentar un clima en el que dichos comportamientos no puedan producirse.`));
v('res2', `NOVENO. Difusión · ${S2}`, arbol('VÍAS DE DIFUSIÓN (esquema · cuadro impreso · pág. 195 · Noveno)', D('VÍAS DE DIFUSIÓN'), [
  `${D('INFORMACIÓN:')} una vez publicado y en vigor se distribuirá a través de los ${Y('canales habituales')} de transmisión de la información corporativa y se entregará dentro de los ${Y('planes de acogida')} al personal de nuevo ingreso.`,
  `${D('FORMACIÓN Y CONCIENCIACIÓN:')} por personal experto en materia de género del ${G('Área de Mujeres e Igualdad de la Guardia Civil')} se promoverá lo necesario para que puedan llevarse a cabo actividades formativas y de concienciación acerca de la prevención y lucha contra el acoso sexual y por razón de sexo, dirigidas tanto al personal que desempeña funciones de mando como al conjunto de los integrantes del Cuerpo.`,
]));

// ───────── RES3 · Segundo-Tercero · MAPA DEL PROTOCOLO (pág. 209, impreso) ─────────
v('res3', `TERCERO. Ámbito de aplicación objetivo · ${S3}`, arbol('PROTOCOLO DE ACTUACIÓN ANTE SITUACIONES DE VIOLENCIA SOBRE LA MUJER · OBJETIVOS Y ÁMBITOS (mapa · cuadro impreso · pág. 209 · Segundo-Tercero)',
  D('PROTOCOLO DE ACTUACIÓN ANTE SITUACIONES DE VIOLENCIA SOBRE LA MUJER QUE AFECTEN A PERSONAL DE LA GUARDIA CIVIL'), [
  { t: D('OBJETIVOS'), sub: ['Generales', 'Específicos'] },
  { t: D('ÁMBITO DE APLICACIÓN SUBJETIVO'), sub: [
    `Aplicación en las situaciones en que ${D('una guardia civil sea víctima de violencia')}, de cualquier naturaleza, derivada de manifestaciones de ${D('discriminación, desigualdad y dominio de hombres sobre mujeres por el hecho de serlo.')}`,
    `Se orientará especialmente a los casos de violencia de género y a las conductas que puedan quebrantar la ${D('libertad e indemnidad sexual.')}`,
    `${D('Personal de la Guardia Civil')} que permanezca sujeto al régimen general de derechos y deberes de los miembros del Cuerpo y a la leyes penales y disciplinarias.`,
  ] },
  { t: D('ÁMBITO DE APLICACIÓN OBJETIVO'), sub: [
    `${D('Violencia de género:')} acto de violencia física, sexual o psicológica que ejercen los hombres sobre las mujeres que hayan sido sus cónyuges o de quienes estén o hayan estado ligados a ellas por relaciones similares de afectividad (parejas o exparejas), aun sin convivencia, y con independencia del lugar o ámbito en que se produzcan.`,
    `${D('Violencia de género')} comprende también la que con el objetivo de causar perjuicio o daño a las mujeres se ejerza sobre sus familiares o allegados menores de edad por parte de las personas indicadas.`,
    `${D('Violencia sobre la mujer:')} conductas que puedan quebrantar su libertad e indemnidad sexual, en especial las agresiones y los abusos.`,
  ] },
]));

// ───────── RES3 · Séptimo · MEDIDAS PREVENTIVAS (pág. 212, impreso) ─────────
v('res3', `SÉPTIMO. Medidas preventivas · ${S3}`, arbol('MEDIDAS PREVENTIVAS (esquema · cuadro impreso · pág. 212 · Séptimo)',
  `${D('MEDIDAS PREVENTIVAS')}: para el cumplimiento de los objetivos generales y específicos del protocolo, con base en la concepción preventiva de las sucesivas etapas en que puede gestarse o producirse la violencia.`, [
  { t: D('Prevención primaria'), sub: [`${Y('Evitar')} que ocurran episodios violentos de esta naturaleza, controlando los elementos de riesgo o las circunstancias bajo las que se producen.`] },
  { t: D('Prevención secundaria'), sub: [`${Y('Afrontar')} las situaciones de violencia que puedan estar produciéndose y atenuar su extensión, progresión e impacto.`] },
  { t: D('Prevención terciaria'), sub: [`${Y('Minimizar')} las consecuencias derivadas de la violencia ejercida, así como recuperar a las personas afectadas y normalizar la situación.`] },
]));

// ───────── RES3 · Duodécimo · DERECHOS DE MOVILIDAD (pág. 214, con tu fosforito) ─────────
v('res3', `DUODÉCIMO. Derechos de movilidad · ${S3}`, cols('DERECHOS DE MOVILIDAD (esquema con llave · pág. 214 · Duodécimo)', [
  { t: `La guardia civil víctima de violencia sobre la mujer que se vea ${D('obligada a cesar en su destino para hacer efectiva su protección o su derecho a la asistencia social integral,')} tendrá derecho a ocupar ${D('otro destino')} siempre ${CA('que')} cumpla las ${D('siguientes características:')}`, l: [
    `${Y('Nuevo destino se encontrará')} ${D('vacante.')}`,
    `Podrá ser asignado cualquiera de los de provisión por ${D('antigüedad,')} o bien aquellos de ${D('concurso de méritos')} o de ${D('libre designación')} cuyo componente singular del complemento específico ${O('no')} ${Y('sea superior al del puesto que ocupa.')}`,
    `Podrá ser solicitado por la ${D('afectada en cualquier momento,')} debiendo acompañar a la solicitud la acreditación de su situación.`,
    `La afectada deberá ${D('reunir los requisitos necesarios')} para ocupar el nuevo destino.`,
  ] },
  { t: `Se podrán asignar destinos y puestos de trabajo ${D('sin publicación previa')} de la vacante correspondiente a quienes tengan la ${D('consideración de víctimas')} de ${Y('violencia sobre la mujer.')}`, l: [
    `➜ ${Y('Procedimiento de asignación')} ${D('extraordinaria')}`,
    `${Y('Carácter de forzoso, y asignación')} ${O(Y('no publicada,'))} ${Y('siendo notificada')} directamente al personal interesado.`,
  ] },
]));

// ───────── RES3 · Decimocuarto · JORNADA Y HORARIO (pág. 215, con tu fosforito) ─────────
v('res3', `DECIMOCUARTO. Derechos en materia de jornada y horario de servicio · ${S3}`, flujo('DERECHOS EN MATERIA DE JORNADA Y HORARIO DE TRABAJO (flujo · pág. 215 · Decimocuarto)', [
  `Las guardias civiles víctimas de violencia sobre la mujer podrán solicitar`,
  D('Reordenación de su jornada y horario de servicio'),
  `Fin de hacer efectiva su ${Y('protección o su derecho de asistencia integral,')} ${CA('con independencia')} ${Y('del régimen de prestación de servicio.')}`,
  { bif: [
    `${CA('Directamente')} ${G('al Jefe de unidad')} ➜ ${D('Tramitación')}`,
    `${G('Jefe de Comandancia o unidad similar')} ➜ ${D('Resolución')}`,
  ] },
]) + pie(`Junto a las dos ramas, a boli en azul y rodeado: ${nota('(EX)')}.`));

// ───────── RES3 · Vigesimocuarto · INFORMACIÓN, REGISTRO, SEGUIMIENTO Y CONTROL (pág. 220, con tu fosforito) ─────────
v('res3', `VIGESIMOCUARTO. Información, registro, seguimiento y control · ${S3}`, cols('INFORMACIÓN, REGISTRO, SEGUIMIENTO Y CONTROL (esquema · pág. 220 · Vigesimocuarto)', [
  { t: G('Las jefaturas o entidades funcionales responsables de personal y apoyo de Comandancia o nivel similar'), l: [
    `Proporcionarán ${D('información')} (en caso de cambio de destino o puesto de trabajo) ${Y('a modo de expediente, de medidas y actuaciones adoptadas sobre el personal de la GC, a fin de asegurar su conocimiento.')}`,
    `➜ ${G('A la nueva unidad')}`,
  ] },
  { t: G('Unidad Técnica de Policía Judicial'), l: [
    `Realizará un ${D('seguimiento estadístico, penal y disciplinario')} de los ${Y('casos')} en los que ${D('concurran circunstancias')} susceptibles de incardinarse en el presente protocolo.`,
  ] },
  { t: G('Área de Igualdad y Diversidad'), l: [
    `${D('Información')} puesta ${P('periódicamente')} en su conocimiento y efectuará análisis y estudios dirigidos a ${Y('profundizar')} en ${D('los aspectos organizativos')} que puedan ${Y('tener interés de cara a promover la igualdad real y efectiva')} en el seno del Cuerpo y ${Y('a desterrar cualquier forma de discriminación.')}`,
    `${P('Al menos una vez al año')} elaborará un informe que será incluido en el ${Y('orden del día')} ${Y('de la correspondiente convocatoria')} de la ➜ ${G('Comisión de Igualdad y Diversidad del Consejo')}`,
  ] },
]));

module.exports = V;
if (require.main === module) {
  const fs = require('fs'), path = require('path'), LL = require('../literal-lib.js');
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const CLAVE = { ord: 'T26_ORD', res1: 'T26_RES1', res2: 'T26_RES2', res3: 'T26_RES3' };
  const por = {}; let colocados = 0;
  for (const k of Object.values(CLAVE)) por[k] = LL.get(s, k).html.replace(/<!--VIS26C-->[\s\S]*?<!--\/VIS26C-->/g, '');
  const ins = {};
  for (const [c, loc, vis] of V) {
    const key = CLAVE[c], h = por[key], k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; const hd = (h.slice(a, b).match(/articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''; if (norm(hd) === k || norm(hd).startsWith(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', c, loc.slice(0, 60)); continue; }
    (ins[key] = ins[key] || []).push([i, vis]);
  }
  for (const key of Object.keys(ins)) {
    let h = por[key]; const orden = ins[key].map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS26C-->' + vis + '<!--/VIS26C-->' + h.slice(i); colocados++; }
    s = LL.put(s, key, h);
  }
  for (const key of Object.keys(por)) if (!ins[key]) s = LL.put(s, key, por[key]);
  fs.writeFileSync(F, s);
  console.log(`Tema 26 (C): cuadros ${V.length}, colocados ${colocados}`);
}
