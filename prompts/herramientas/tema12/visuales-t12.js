// Cuadros visuales del Tema 12 (Ley 50/1997, del Gobierno), con TEXTO LITERAL de la ley (temario oficial) y subrayado:
//  · Cuadros del temario subrayado de Prefortia: «Consejo de Ministros» (art. 18, PDF p. 18) con las MARCAS REALES del usuario
//    (amarillo, naranja, verde, lila, subrayado rojo, cajas y círculo, leídas a mano de la imagen) y «Del Gobierno en funciones»
//    (art. 21, PDF p. 20; sin marcas suyas → su método: negrita/concepto → amarillo, verbos → naranja, órganos → verde).
//  · Cuadros propios (sin-esquema.js 12): árboles, columnas y flujos con frases literales completas y el mismo método.
// Se insertan en T12.ley50 de esquemas.html tras su artículo (idempotente, marcados con <!--VIS12-->). También los usa expres-t12.js.
// Uso: node prompts/herramientas/tema12/visuales-t12.js
const fs = require('fs'), path = require('path');
const L = require('../visuales-lib.js');
const { D, Y, K, arbol, flujo, cols, tabla } = L;
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const Li = x => `<mark class="m-accion">${x}</mark>`;            // lila (futuros / «podrá»)
const P = x => `<mark class="m-plazo">${x}</mark>`;
const CA = x => `<span class="m-caja">${x}</span>`;              // cuadrado azul
const OA = x => `<span class="m-circulo az">${x}</span>`;        // círculo azul
const KD = x => K(D(x));
const pie = (html, txt) => html.replace(/<\/div>$/, `<div class="vis-flujo"><div class="vis-paso">${txt}</div></div></div>`);
const V = []; const v = (tras, html) => V.push([tras, html]);

// ───────── Exposición de motivos: los tres principios ─────────
v('Exposición de motivos', arbol('Tres principios configuran el funcionamiento del Gobierno', `${Y('Tres principios')} de funcionamiento del ${G('Gobierno')}`, [
  `${Y('El principio de dirección presidencial')}, que ${D('otorga')} al ${G('Presidente del Gobierno')} la competencia para determinar las directrices políticas que deberá seguir el Gobierno y cada uno de los Departamentos.`,
  `${Y('La colegialidad y consecuente responsabilidad solidaria')} de sus miembros.`,
  `${Y('El principio departamental')} que ${D('otorga')} al titular de cada Departamento una amplia autonomía y responsabilidad en el ámbito de su respectiva gestión.`]));

// ───────── Art. 2: funciones del Presidente ─────────
v('Artículo 2', arbol('En todo caso, corresponde al Presidente del Gobierno (art. 2.2)', G('Presidente del Gobierno'), [
  { t: `Dirección política:`, sub: [`a) ${D('Representar')} al Gobierno.`, `b) ${D('Establecer')} el programa político del Gobierno y ${D('determinar')} las directrices de la política interior y exterior y velar por su cumplimiento.`, `f) ${D('Dirigir')} la política de defensa y ejercer respecto de las Fuerzas Armadas las funciones previstas en la legislación reguladora de la defensa nacional y de la organización militar.`, `m) ${D('Impartir')} instrucciones a los demás miembros del Gobierno.`] },
  { t: `Ante el ${G('Rey')} y las ${G('Cortes')}:`, sub: [`c) ${D('Proponer')} al Rey, ${Y('previa deliberación del Consejo de Ministros')}, la disolución del Congreso, del Senado o de las Cortes Generales.`, `d) ${D('Plantear')} ante el ${G('Congreso de los Diputados')}, ${Y('previa deliberación del Consejo de Ministros')}, la cuestión de confianza.`, `e) ${D('Proponer')} al Rey la convocatoria de un referéndum consultivo, ${Y('previa autorización del Congreso de los Diputados')}.`, `h) ${D('Refrendar')}, ${K('en su caso')}, los actos del Rey y someterle, para su sanción, las leyes y demás normas con rango de ley.`, `k) ${D('Proponer')} al Rey el nombramiento y separación de los Vicepresidentes y de los Ministros.`] },
  { t: `Organización y conflictos:`, sub: [`g) ${D('Convocar, presidir y fijar')} el orden del día de las reuniones del ${G('Consejo de Ministros')}.`, `i) ${D('Interponer')} el recurso de inconstitucionalidad.`, `j) ${D('Crear, modificar y suprimir')}, ${Y('por Real Decreto')}, los Departamentos Ministeriales, así como las Secretarías de Estado. Asimismo, le corresponde la aprobación de la estructura orgánica de la Presidencia del Gobierno.`, `l) ${D('Resolver')} los conflictos de atribuciones que puedan surgir entre los diferentes Ministerios.`] }]));

// ───────── Arts. 3 y 4: Vicepresidentes y Ministros ─────────
v('Artículo 4', cols('Vicepresidentes y Ministros (arts. 3 y 4)', [
  { t: 'Vicepresidentes (art. 3)', l: [`Al Vicepresidente o Vicepresidentes, ${K('cuando existan')}, les corresponderá el ejercicio de las funciones que les ${D('encomiende')} el ${G('Presidente')}.`, `El Vicepresidente que asuma la titularidad de un Departamento Ministerial, ostentará, ${Y('además')}, la condición de ${G('Ministro')}.`] },
  { t: 'Ministros (art. 4.1)', l: [`a) ${D('Desarrollar')} la acción del Gobierno en el ámbito de su Departamento, de conformidad con los acuerdos adoptados en ${G('Consejo de Ministros')} o con las directrices del ${G('Presidente del Gobierno')}.`, `b) ${D('Ejercer')} la ${Y('potestad reglamentaria')} en las materias propias de su Departamento.`, `c) ${D('Ejercer')} cuantas otras competencias les atribuyan las leyes, las normas de organización y funcionamiento del Gobierno y cualesquiera otras disposiciones.`, `d) ${D('Refrendar')}, ${K('en su caso')}, los actos del Rey en materia de su competencia.`] },
  { t: 'Ministros sin cartera (art. 4.2)', l: [`Además de los Ministros titulares de un Departamento, ${Li('podrán existir')} ${Y('Ministros sin cartera')}, a los que se les atribuirá la responsabilidad de determinadas funciones gubernamentales.`, `${Y('Por Real Decreto')} se determinará el ámbito de sus competencias, la estructura administrativa, así como los medios materiales y personales que queden adscritos al mismo.`] }]));

// ───────── Art. 5: Consejo de Ministros ─────────
v('Artículo 5', arbol('Al Consejo de Ministros, como órgano colegiado del Gobierno, le corresponde (art. 5)', G('Consejo de Ministros'), [
  { t: 'Normas:', sub: [`a) ${D('Aprobar')} los proyectos de ley y su remisión al Congreso de los Diputados o, en su caso, al Senado.`, `b) ${D('Aprobar')} el ${Y('Proyecto')} de Ley de Presupuestos Generales del Estado.`, `c) ${D('Aprobar')} los Reales Decretos-leyes y los Reales Decretos Legislativos.`, `h) ${D('Aprobar')} los reglamentos para el desarrollo y la ejecución de las leyes, ${Y('previo dictamen del Consejo de Estado')}, así como las demás disposiciones reglamentarias que procedan.`] },
  { t: 'Tratados y estados excepcionales:', sub: [`d) ${D('Acordar')} la negociación y firma de Tratados internacionales, así como su aplicación provisional.`, `e) ${D('Remitir')} los Tratados internacionales a las Cortes Generales.`, `f) ${D('Declarar')} los estados de alarma y de excepción y ${D('proponer')} al ${G('Congreso de los Diputados')} la declaración del estado de sitio.`] },
  { t: 'Administración y Hacienda:', sub: [`g) ${D('Disponer')} la emisión de Deuda Pública o contraer crédito, ${K('cuando haya sido autorizado por una Ley')}.`, `i) ${D('Crear, modificar y suprimir')} los órganos directivos de los Departamentos Ministeriales.`, `j) ${D('Adoptar')} programas, planes y directrices vinculantes para todos los órganos de la Administración General del Estado.`] },
  `Las deliberaciones del Consejo de Ministros serán ${Y('secretas')}.`]));

// ───────── Art. 6: Comisiones Delegadas ─────────
v('Artículo 6', cols('Comisiones Delegadas del Gobierno (art. 6)', [
  { t: 'Creación (6.1 y 6.2)', l: [`La creación, modificación y supresión será acordada por el ${G('Consejo de Ministros')} ${Y('mediante Real Decreto')}, a propuesta del ${G('Presidente del Gobierno')}.`, `El Real Decreto deberá especificar, ${K('en todo caso')}: el miembro que asume la presidencia; los miembros y, en su caso, Secretarios de Estado que la integran; las funciones; el miembro al que corresponde la Secretaría; el régimen interno de funcionamiento y en particular el de convocatorias y suplencias.`] },
  { t: 'Funciones (6.4)', l: [`a) ${D('Examinar')} las cuestiones de ${Y('carácter general')} que tengan relación con varios de los Departamentos Ministeriales que integren la Comisión.`, `b) ${D('Estudiar')} aquellos asuntos que, afectando a varios Ministerios, ${Y('requieran')} la elaboración de una propuesta conjunta previa a su resolución por el Consejo de Ministros.`, `c) ${D('Resolver')} los asuntos que, afectando a más de un Ministerio, ${K('no requieran')} ser elevados al Consejo de Ministros.`, `d) ${D('Ejercer')} cualquier otra atribución que les confiera el ordenamiento jurídico o que les delegue el Consejo de Ministros.`] },
  { t: 'Reuniones (6.3 y 6.5)', l: [`${Li('Podrán ser convocados')} los titulares de aquellos otros órganos superiores y directivos de la Administración General del Estado que se estime conveniente.`, `Las deliberaciones serán ${Y('secretas')}.`] }]));

// ───────── Art. 9: Secretariado del Gobierno ─────────
v('Artículo 9', cols('Secretariado del Gobierno (art. 9)', [
  { t: 'Como órgano de APOYO del Consejo de Ministros, Comisiones Delegadas y Comisión General (9.1)', l: [`a) La asistencia al ${G('Ministro-Secretario')} del Consejo de Ministros.`, `b) La remisión de las convocatorias a los diferentes miembros de los órganos colegiados.`, `c) La ${Y('colaboración')} con las Secretarías Técnicas de las Comisiones Delegadas del Gobierno.`, `d) El ${Y('archivo y custodia')} de las convocatorias, órdenes del día y actas de las reuniones.`, `e) ${D('Velar')} por el cumplimiento de los principios de buena regulación aplicables a las iniciativas normativas y contribuir a la mejora de la calidad técnica de las disposiciones aprobadas por el Gobierno.`, `f) ${D('Velar')} por la correcta y fiel publicación de las disposiciones y normas emanadas del Gobierno que deban insertarse en el "Boletín Oficial del Estado".`] },
  { t: 'Como órgano de ASISTENCIA al Ministro de la Presidencia (9.2)', l: [`a) Los trámites relativos a la sanción y promulgación real de las leyes aprobadas por las Cortes Generales y la expedición de los Reales Decretos.`, `b) La tramitación de los actos y disposiciones del Rey cuyo refrendo corresponde al ${G('Presidente del Gobierno')}.`, `c) La tramitación de los actos y disposiciones que el ordenamiento jurídico atribuye a la competencia del ${G('Presidente del Gobierno')}.`, `Se integra en la estructura orgánica del ${G('Ministerio de la Presidencia')}. El ${G('Director del Secretariado del Gobierno')} ejercerá la ${Y('secretaría adjunta')} de la Comisión General.`] }]));

// ───────── Art. 18: cuadro del temario (PDF p. 18) con TUS marcas ─────────
v('Artículo 18', arbol('Consejo de Ministros (cuadro del temario · art. 18)', G('CONSEJO DE MINISTROS'), [
  `1. ${Y('El')} ${G('Presidente del Gobierno')} ${KD('convoca y preside las reuniones')}, ${CA('actuando como')} ${CA(Y('Secretario'))} ${Y('el Ministro de la Presidencia')}.`,
  `2. ${Y('Las reuniones')} ${Li('podrán tener carácter')} ${D('decisorio')} ${OA('o')} ${D('deliberante')}.`,
  `3. ${CA(Y('El orden del día'))} ${Y('de las reuniones')} ${Li('se fijará')} por el ${G('Presidente del Gobierno')}.`,
  `4. ${Y('De las sesiones se levantará acta')} en la que figurarán, ${CA(Y('exclusivamente'))}, las circunstancias relativas al ${D('tiempo y lugar')} de su celebración, la ${D('relación de asistentes')}, los ${D('acuerdos adoptados')} y los ${KD('informes presentados')}.`]));

// ───────── Art. 20: delegación y avocación ─────────
v('Artículo 20', cols('Delegación y avocación de competencias (art. 20)', [
  { t: 'Pueden delegar (20.1 y 20.2)', l: [`a) El ${G('Presidente del Gobierno')} en favor del Vicepresidente o Vicepresidentes y de los Ministros.`, `b) Los ${G('Ministros')} en favor de los Secretarios de Estado y de los Subsecretarios dependientes de ellos, de los Delegados del Gobierno en las Comunidades Autónomas y de los demás órganos directivos del Ministerio.`, `Asimismo, son delegables ${Y('a propuesta del Presidente del Gobierno')} las ${Y('funciones administrativas')} del Consejo de Ministros en las Comisiones Delegadas del Gobierno.`] },
  { t: `${K('No')} son en ningún caso delegables (20.3)`, l: [`a) Las atribuidas ${Y('directamente')} por la Constitución.`, `b) Las relativas al nombramiento y separación de los altos cargos atribuidas al ${G('Consejo de Ministros')}.`, `c) Las atribuidas a los órganos colegiados del Gobierno, con la excepción prevista en el apartado 2.`, `d) Las atribuidas por una ley que prohíba ${Y('expresamente')} la delegación.`] },
  { t: 'Avocación (20.4)', l: [`El ${G('Consejo de Ministros')} ${Li('podrá avocar')} para sí, a propuesta del ${G('Presidente del Gobierno')}, el conocimiento de un asunto cuya decisión corresponda a las ${G('Comisiones Delegadas del Gobierno')}.`, `Se realizará mediante ${Y('acuerdo motivado')} al efecto. Contra el acuerdo de avocación ${K('no cabrá recurso')}, aunque podrá impugnarse en el que, en su caso, se interponga contra la decisión adoptada.`] }]));

// ───────── Art. 21: cuadro del temario (PDF p. 20) «Del Gobierno en funciones» ─────────
v('Artículo 21', arbol('Del Gobierno en funciones (cuadro del temario · art. 21)', G('DEL GOBIERNO EN FUNCIONES'), [
  { t: `${Y('El Gobierno cesa')}:`, sub: [`Tras la celebración de ${Y('elecciones generales')}.`, `En los casos de ${Y('pérdida de confianza parlamentaria')} previstos en la Constitución.`, `Por ${Y('dimisión o fallecimiento')} de su ${G('Presidente')}.`] },
  `El Gobierno cesante ${D('continúa en funciones')} hasta la ${Y('toma de posesión del nuevo Gobierno')}, con las limitaciones establecidas en esta Ley.`,
  `El Gobierno en funciones ${D('facilitará')} el normal desarrollo del proceso de formación del nuevo Gobierno y el traspaso de poderes al mismo y ${D('limitará')} su gestión al ${Y('despacho ordinario de los asuntos públicos')}, absteniéndose de adoptar, ${K('salvo')} casos de urgencia debidamente acreditados o por razones de interés general cuya acreditación expresa así lo justifique, cualesquiera otras medidas.`,
  { t: `El ${G('Presidente del Gobierno')} en funciones ${K('no podrá')} ejercer las siguientes facultades:`, sub: [`${D('Proponer')} al Rey la disolución de alguna de las Cámaras, o de las Cortes Generales.`, `${D('Plantear')} la cuestión de confianza.`, `${D('Proponer')} al Rey la convocatoria de un referéndum consultivo.`] },
  { t: `El ${G('Gobierno')} en funciones ${K('no podrá')} ejercer las siguientes facultades:`, sub: [`${D('Aprobar')} el Proyecto de Ley de Presupuestos Generales del Estado.`, `${D('Presentar')} proyectos de ley al Congreso de los Diputados o, en su caso, al Senado.`] }]));

// ───────── Art. 24: forma y jerarquía ─────────
v('Artículo 24', tabla('Forma de las decisiones del Gobierno y jerarquía de los reglamentos (art. 24)', ['Forma', 'Qué decisiones'], [
  { l: 'Reales Decretos Legislativos y Reales Decretos-leyes', c: 'o', h: [{ t: 'Las decisiones que aprueban, respectivamente, las normas previstas en los artículos 82 y 86 de la Constitución.' }] },
  { l: `Reales Decretos del ${G('Presidente del Gobierno')}`, c: 'v', h: [{ t: `Las disposiciones y actos cuya adopción venga atribuida al ${G('Presidente')}.` }] },
  { l: `Reales Decretos acordados en ${G('Consejo de Ministros')}`, c: 'c', h: [{ t: 'Las decisiones que aprueben normas reglamentarias de la competencia de éste y las resoluciones que deban adoptar dicha forma jurídica.' }] },
  { l: `Acuerdos del ${G('Consejo de Ministros')}`, c: 'o', h: [{ t: `Las decisiones de dicho órgano colegiado que ${K('no')} deban adoptar la forma de Real Decreto.` }] },
  { l: `Acuerdos adoptados en ${G('Comisiones Delegadas del Gobierno')}`, c: 'v', h: [{ t: `Las disposiciones y resoluciones de tales órganos colegiados. Revestirán la forma de ${Y('Orden del Ministro competente o del Ministro de la Presidencia')}, cuando la competencia corresponda a distintos Ministros.` }] },
  { l: 'Órdenes Ministeriales', c: 'c', h: [{ t: `Las disposiciones y resoluciones de los Ministros. Cuando afecte a varios Departamentos revestirá la forma de ${Y('Orden del Ministro de la Presidencia')}, dictada a propuesta de los Ministros interesados.` }] },
  { l: 'Jerarquía de los reglamentos (24.2)', c: 'o', h: [{ t: `1.º Disposiciones aprobadas por ${Y('Real Decreto del Presidente del Gobierno o acordado en el Consejo de Ministros')}.` }, { t: `2.º Disposiciones aprobadas por ${Y('Orden Ministerial')}.` }] }]));

// ───────── Art. 26: procedimiento de elaboración ─────────
v('Artículo 26', flujo('Procedimiento de elaboración de normas con rango de ley y reglamentos (art. 26)', [
  { et: '1', t: `Su redacción estará precedida de cuantos estudios y consultas se estimen convenientes para ${Y('garantizar el acierto y la legalidad')} de la norma.` },
  { et: '2', t: `${Y('Consulta pública')}, a través del portal web del departamento competente, con carácter previo a la elaboración del texto: tiempo suficiente, que ${K('en ningún caso')} será inferior a ${P('quince días naturales')}.` },
  { et: '3', t: `El ${G('centro directivo competente')} elaborará con carácter preceptivo una ${Y('Memoria del Análisis de Impacto Normativo')}.` },
  { et: '4', t: `Anteproyecto de ley o proyecto de real decreto legislativo: el titular o titulares de los Departamentos proponentes lo elevarán, previo sometimiento a la ${G('Comisión General de Secretarios de Estado y Subsecretarios')}, al ${G('Consejo de Ministros')}, a fin de que éste decida sobre los ulteriores trámites.` },
  { et: '5', t: `Informes preceptivos: en un plazo de ${P('diez días')}, o de ${P('un mes')} cuando el informe se solicite a otra Administración o a un órgano u Organismo dotado de especial independencia o autonomía. ${K('En todo caso')}, informe de la ${G('Secretaría General Técnica')} del Ministerio o Ministerios proponentes.` },
  { et: '6', t: `Audiencia e información públicas cuando la norma afecte a los derechos e intereses legítimos de las personas: plazo mínimo de ${P('15 días hábiles')}, que podrá ser reducido hasta un mínimo de ${P('siete días hábiles')}.` },
  { et: '7', t: `Se recabará el dictamen del ${G('Consejo de Estado')} u órgano consultivo equivalente cuando fuera preceptivo o se considere conveniente.` },
  { et: '8', t: `Cumplidos los trámites anteriores, la propuesta se someterá a la ${G('Comisión General de Secretarios de Estado y Subsecretarios')} y se elevará al ${G('Consejo de Ministros')} para su aprobación.` }]));

// ───────── Art. 27: tramitación urgente ─────────
v('Artículo 27', cols('Tramitación urgente de iniciativas normativas (art. 27)', [
  { t: `La acuerda el ${G('Consejo de Ministros')}, a propuesta del titular del departamento (27.1)`, l: [`a) Cuando fuere necesario para que la norma entre en vigor en el plazo exigido para la transposición de ${Y('directivas comunitarias')} o el establecido en otras leyes o normas de Derecho de la Unión Europea.`, `b) Cuando concurran otras ${Y('circunstancias extraordinarias')} que, ${K('no')} habiendo podido preverse con anterioridad, exijan la aprobación urgente de la norma.`] },
  { t: 'La tramitación por vía de urgencia implicará (27.2)', l: [`a) Los plazos previstos ${D('se reducirán')} a la ${P('mitad')} de su duración.`, `b) ${K('No')} será preciso el trámite de consulta pública; audiencia o información pública con un plazo de realización de ${P('siete días')}.`, `c) La falta de emisión de un dictamen o informe preceptivo en plazo ${K('no')} impedirá la continuación del procedimiento.`] }]));

// ───────── Art. 28: informe anual de evaluación ─────────
v('Artículo 28', arbol('Informe anual de evaluación (art. 28)', `Informe anual · lo aprueba el ${G('Consejo de Ministros')}, a propuesta del ${G('Ministerio de la Presidencia')}, ${P('antes del 30 de abril de cada año')}`, [
  `Refleja el grado de cumplimiento del Plan Anual Normativo del año anterior, las iniciativas adoptadas que no estaban inicialmente incluidas en el citado Plan, así como las incluidas en anteriores informes de evaluación con objetivos plurianuales que hayan producido al menos parte de sus efectos en el año que se evalúa.`,
  { t: `La evaluación deberá comprender, ${K('en todo caso')}:`, sub: [`a) La ${Y('eficacia')} de la norma, entendiendo por tal la medida en que ha conseguido los fines pretendidos con su aprobación.`, `b) La ${Y('eficiencia')} de la norma, identificando las cargas administrativas que podrían no haber sido necesarias.`, `c) La ${Y('sostenibilidad')} de la disposición.`] },
  `El informe ${Li('podrá contener')} recomendaciones específicas de modificación y, en su caso, derogación de las normas evaluadas, cuando así lo aconsejase el resultado del análisis.`]));

// ───────── Disposición derogatoria única ─────────
v('Disposición derogatoria única', arbol('Quedan derogadas, en concreto (disposición derogatoria única)', 'Derogaciones', [
  'a) Los artículos que conforme a la disposición derogatoria 2.a) de la Ley de Organización y Funcionamiento de la Administración General del Estado continuaban vigentes de la Ley de Régimen Jurídico de la Administración del Estado, texto refundido aprobado por Decreto de 26 de julio de 1957.',
  'b) Los artículos que conforme a la disposición derogatoria 2.b) de la Ley de Organización y Funcionamiento de la Administración General del Estado continuaban vigentes de la Ley 10/1983, de 16 de agosto, de Organización de la Administración Central del Estado.',
  'c) Los artículos 48 a 53 de la Ley de Conflictos Jurisdiccionales, de 17 de julio de 1948.',
  'd) Los artículos 129 a 132 de la Ley de Procedimiento Administrativo, de 17 de julio de 1958.',
  'e) Se suprimen las menciones a los Directores de los Gabinetes de los Secretarios de Estado contenidas en el artículo 1.g) de la Ley 12/1995, de 11 de mayo.']));

module.exports = V;
if (require.main !== module) return;   // al importarlo desde expres-t12.js solo se exportan los cuadros
// ───────── inserción en T12.ley50 de esquemas.html ─────────
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const s = fs.readFileSync(F, 'utf8').split('\n');
const k = s.findIndex(l => l.startsWith('/* T12_LEY50 */ T12.ley50 = "'));
if (k < 0) throw new Error('no se encuentra T12.ley50');
let l = s[k].replace(/<!--VIS12-->[\s\S]*?<!--\/VIS12-->/g, '');
const esc = h => JSON.stringify(h).slice(1, -1);
const pos = [];
V.forEach(([tras, html]) => {
  const heads = [...l.matchAll(/articulo-head[^>]*>(.*?)<\/div>/g)].map(m => [m.index, m[1].replace(/<[^>]+>/g, '')]);
  const hh = heads.find(h => h[1] === tras || h[1].startsWith(tras + ' —')); if (!hh) throw new Error('no encuentro ' + tras);
  const sig = [l.indexOf('<div class=\\"articulo\\">', hh[0]), l.indexOf('<div class=\\"bloque-titulo\\">', hh[0])].filter(x => x > 0).sort((a, b) => a - b)[0];
  pos.push([sig > 0 ? sig : l.length - 2, `<!--VIS12-->${esc(html)}<!--/VIS12-->`]);
});
pos.sort((a, b) => b[0] - a[0]).forEach(([p, h]) => { l = l.slice(0, p) + h + l.slice(p); });
s[k] = l;
fs.writeFileSync(F, s.join('\n'));
console.log('cuadros insertados:', V.length);
