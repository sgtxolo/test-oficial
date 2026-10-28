// Cuadros visuales del Tema 17: recrean los cuadros de tu temario subrayado (PDF 08-08-2026) con su TEXTO LITERAL y tus marcas.
//   p5 art. 1 · p6 competencias · p10 medidas · p11 dos períodos · p13/17 art. 10.1 · p15 art. 10.2 (RESUMEN) · p20 prescripción · p23 plazos de detención
//   p25 sobreseimiento · p26 unidad de expediente · p31-32 medidas cautelares · p34 responsabilidad civil · p36-38 PLAZOS · p42 RD: modo de llevar a cabo la detención
// Se insertan en los bloques T17_* de esquemas.html tras la ficha que contiene el texto localizador. Los usa también expres/t17.js (module.exports = V).
// Uso: node prompts/herramientas/tema17/visuales-t17.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS17-->)
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const U = x => `<u class="m-lapiz">${x}</u>`;
const CA = x => `<span class="m-caja">${x}</span>`;
const O = x => `<span class="m-circulo">${x}</span>`;
const AC = x => `<mark class="m-accion">${x}</mark>`;
const B = x => `<mark class="m-plazo">${x}</mark>`;
const AS = '<span class="m-ast"></span>';
const pie = t => `<p class="nota-manuscrita" style="font-style:italic;opacity:.85;margin:6px 4px 0">✎ ${t}</p>`;
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);

// ───────── p5 · art. 1 ─────────
v('lo', 'Esta Ley se aplicará para exigir la responsabilidad de las personas mayores de catorce años', arbol('L.O. 5/2000, de 12 de enero · Aplicable en (cuadro del temario · art. 1)', `${D('Exigir')} ${Y('responsabilidad penal')} ${P('PARA')} personas ${P('mayores de 14 años y menores de 18 años')} ${P('POR')} comisión de hechos tipificados como ${Y('delitos o faltas')} en: ${Y('Código Penal')}, o ${Y('Leyes penales especiales')}`, [
  { t: `Estas personas ${D('gozarán')} de ${Y('todos los derechos reconocidos')} en:`, sub: [
    `${Y('Constitución Española')}`,
    `${Y('Ordenamiento jurídico')}, particularmente en: ${G('L.O. 1/1996')} de Protección Jurídica del Menor`,
    `${Y('Convención sobre los Derechos del Niño de 1989')}`,
    `Todas aquellas ${Y('normas sobre protección de menores')} contenidas en los ${Y('Tratados válidamente celebrados por España')}`] },
]));

// ───────── p6 · art. 2 competencias ─────────
v('lo', 'serán competentes para conocer de los hechos cometidos por las personas mencionadas en el artículo 1', tabla('COMPETENCIAS · JUECES DE MENORES (cuadro del temario · art. 2)', ['Competencia', 'Contenido'], [
  { l: 'JUECES DE MENORES', c: 'o', h: [
    { t: `${D('Conocer')} de los hechos tipificados como delitos cometidos por los ${P('mayores de 14 años y menores de 18 años')}.` },
    { t: `${D('Hacer ejecutar')} las sentencias, ${K('sin perjuicio')} de las facultades atribuidas por esta Ley a las ${G('Comunidades Autónomas')} respecto a la ${Y('protección y reforma de menores')}.` },
    { t: `${D('Resolver')} sobre las ${Y('responsabilidades civiles')} derivadas de los hechos cometidos por las personas a las que resulta aplicable la presente Ley.` },
    { t: `La competencia corresponde al ${G('Juez de Menores')} del ${Y('lugar donde se haya cometido el hecho delictivo')} (${K('sin perjuicio')} de lo establecido en el art. 20.3 de esta Ley).` }] },
  { l: `${K('SALVO')}: JUZGADO CENTRAL DE MENORES DE LA AUDIENCIA NACIONAL`, c: 'v', h: [
    { t: `Los delitos previstos en los arts. ${P('571 a 580')} CP (${Y('delitos de terrorismo')}).` },
    { t: `Delitos cometidos por ${Y('menores en el extranjero')} cuando conforme al art. 23 de la LO 6/1985 y Tratados Internacionales corresponda su conocimiento a la ${Y('jurisdicción española')}.` }] },
]));

// ───────── p10 · art. 7 medidas ─────────
v('lo', 'Las medidas que pueden imponer los Jueces de Menores, ordenadas según la restricción de derechos', arbol('MEDIDAS QUE PUEDEN IMPONER LOS JUECES DE MENORES (cuadro del temario · art. 7.1, de mayor a menor restricción de derechos)', `${G('Jueces de Menores')}: ${D('medidas')} ordenadas según la restricción de derechos que suponen`, [
  `${Y('INTERNAMIENTO EN RÉGIMEN CERRADO')}`, `${Y('INTERNAMIENTO EN RÉGIMEN SEMIABIERTO')}`, `${Y('INTERNAMIENTO EN RÉGIMEN ABIERTO')}`,
  `${Y('INTERNAMIENTO TERAPÉUTICO')} EN RÉGIMEN CERRADO, SEMIABIERTO O ABIERTO`, `${Y('TRATAMIENTO AMBULATORIO')} ${AS}`, `${Y('ASISTENCIA A UN CENTRO DE DÍA')}`,
  `${Y('PERMANENCIA DE FIN DE SEMANA')}`, `${Y('LIBERTAD VIGILADA')}`, `${Y('LA PROHIBICIÓN DE APROXIMARSE O COMUNICARSE CON LA VÍCTIMA')} O CON AQUELLOS DE SUS FAMILIARES U OTRAS PERSONAS QUE DETERMINE EL JUEZ`,
  `${Y('CONVIVENCIA CON OTRA PERSONA, FAMILIA O GRUPO EDUCATIVO')}`, `${Y('PRESTACIONES EN BENEFICIO DE LA COMUNIDAD')}`, `${Y('REALIZACIÓN DE TAREAS SOCIO-EDUCATIVAS')}`, `${Y('AMONESTACIÓN')} ${O('EX')}`,
  `${Y('PRIVACIÓN DEL PERMISO DE CONDUCIR')} CICLOMOTORES Y VEHÍCULOS A MOTOR, O DEL DERECHO A OBTENERLO, O DE LAS LICENCIAS ADMINISTRATIVAS PARA CAZA O PARA USO DE CUALQUIER TIPO DE ARMAS`, `${Y('INHABILITACIÓN ABSOLUTA')}`,
]));
// ───────── p11 · art. 7.2 ─────────
v('lo', 'Las medidas que pueden imponer los Jueces de Menores, ordenadas según la restricción de derechos', cols('MEDIDAS DE INTERNAMIENTO (cuadro del temario · art. 7.2)', [
  { t: 'PRIMER PERIODO', l: [`${D('En el centro')} correspondiente.`] },
  { t: 'SEGUNDO PERIODO', l: [`${D('En régimen de libertad vigilada')}, en la modalidad ${Y('elegida por el Juez')}.`] },
], false));

// ───────── p13/p17 · art. 10.1 ─────────
v('lo', 'Cuando se trate de los hechos previstos en el apartado 2 del artículo anterior', cols('REGLAS ESPECIALES DE APLICACIÓN Y DURACIÓN DE LAS MEDIDAS (cuadro del temario · art. 10.1)', [
  { t: 'A) Si al tiempo de cometer los hechos el menor tuviere 14 ó 15 años', l: [
    `La medida ${D('podrá alcanzar')} ${P('tres años')} de duración.`, `Si se trata de ${Y('prestaciones en beneficio de la comunidad')}, dicho máximo será de ${P('ciento cincuenta horas')}, y`, `de ${P('doce fines de semana')} si la medida impuesta fuere la de ${Y('permanencia de fin de semana')}.`] },
  { t: 'B) Si al tiempo de cometer los hechos el menor tuviere 16 ó 17 años', l: [
    `La duración máxima de la medida será de ${P('seis años')}; o, en sus respectivos casos, de:`, `${P('doscientas horas')} de ${Y('prestaciones en beneficio de la comunidad')}`, `o permanencia de ${P('dieciséis fines de semana')}.`] },
], false) + `<div class="vis-nota" style="margin:6px 4px">En este supuesto, cuando el hecho revista ${K('extrema gravedad')}, el ${G('Juez')} ${D('deberá imponer')} una medida de ${Y('internamiento en régimen cerrado')} de ${P('uno a seis años')}, ${Y('complementada sucesivamente')} con otra medida de ${Y('libertad vigilada')} con asistencia educativa ${P('hasta un máximo de cinco años')}. ${K('Sólo')} podrá hacerse uso de lo dispuesto en los arts. 13 (${Y('modificación')}) y 51.1 (${Y('sustitución')}) ${P('una vez transcurrido el primer año')} de cumplimiento efectivo de la medida de internamiento. Se entenderán ${K('siempre')} supuestos de extrema gravedad aquellos en los que se apreciara ${Y('reincidencia')}.</div>` + pie('Notas tuyas: +1 año · +50 h · +4 fines de semana al pasar de 14-15 a 16-17 · 16 + 5 años en extrema gravedad.'));

// ───────── p15 · art. 10.2 RESUMEN (NUEVO) · colores leídos a 140 ppp: rosa = cabeceras, naranja = 14-15 y «1 a 5 / hasta 3», verde = 16-17 y «1 a 8 / hasta 5», lila = «Sólo podrá hacerse», amarillo = «13, 40 y 51.1…», cian = «la mitad» ─────────
v('lo', 'Cuando el hecho sea constitutivo de alguno de los delitos tipificados en los artículos 138', tabla('RESUMEN · art. 10.2 (cuadro del temario, versión «NUEVO»)', ['Si al tiempo de cometer los hechos…', 'Medida'], [
  { l: `${D('Menor tuviere 14 o 15 años de edad')}`, c: 'o', h: [{ p: 'De 1 a 5 años', c: 'n', t: `${D('Medida de INTERNAMIENTO EN RÉGIMEN CERRADO')}: ${D('De 1 a 5 años')}` }, { p: 'Hasta 3 años', c: 'v', t: `${D('LIBERTAD VIGILADA')}: ${D('Hasta 3 años')}` }] },
  { l: `${G('Menor tuviere 16 o 17 años de edad')}`, c: 'o', h: [{ p: 'De 1 a 8 años', c: 'n', t: `${D('Medida de INTERNAMIENTO EN RÉGIMEN CERRADO')}: ${G('De 1 a 8 años')}` }, { p: 'Hasta 5 años', c: 'v', t: `${D('LIBERTAD VIGILADA')}: ${G('Hasta 5 años (con asistencia educativa)')}` }] },
  { l: 'FACULTADES', c: 'c', h: [{ t: `${AC('Sólo podrá hacerse')} uso de las facultades de ${B('modificación, suspensión o sustitución')} de la medida impuesta a las que se refieren los artículos ${Y('13, 40 y 51.1')} de esta Ley Orgánica, ${Y('cuando haya transcurrido')} al menos, ${P('la mitad')} de la duración de la medida de internamiento impuesta.` }] },
  { l: 'NUEVO', c: 'v', h: [{ t: `Cuando el delito cometido lo sea de los tipificados en los artículos 178 a 183 del Código Penal, las medidas previstas en los ${Y('dos apartados')} anteriores ${AC('deberán acompañarse')} de una ${D('medida de educación sexual y educación para la igualdad')}.` }] },
]) + pie('«Nuevo» (nota tuya a bolígrafo). Resumen: 138 (homicidio), 139 (asesinato), 179 (violación), 180 (agravados) y 571 a 580 (terrorismo), o cualquier otro delito con pena de prisión igual o superior a quince años.'));

// ───────── p20 · art. 15 PRESCRIPCIÓN · colores leídos a 140 ppp: naranja = cabeceras «HECHOS DELICTIVOS / MEDIDAS», cian = fila de plazos, amarillo = conceptos, rojo subrayado = «superior» / «igual o superior» ─────────
v('lo', 'Los hechos delictivos cometidos por los menores prescriben', plazos('PRESCRIPCIÓN (cuadro del temario · art. 15)', [
  ['HECHOS DELICTIVOS', `${P('Con arreglo a las normas contenidas en el CP')}: Homicidio (138 CP) · Asesinato (139 CP) · Agresiones sexuales (179, 180 CP) · Terrorismo (571 a 580 CP) · ${Y('Cualquier otro sancionado en el Código Penal o en las leyes penales especiales con pena de prisión')} ${K('igual o superior')} ${Y('a quince años')}. ${O('EXAMEN')}`],
  ['5 años', `${Y('Delito grave')} sancionado en el Código Penal con ${Y('pena')} ${K('superior')} ${Y('a diez años')}.`],
  ['3 años', `${Y('Cualquier otro delito grave')}.`], ['1 año', `${Y('Delito menos grave')}.`], ['3 meses', `Cuando se trate de ${Y('una falta')}.`],
  ['MEDIDAS · 3 años', `${Y('Duración')} ${K('superior')} ${Y('a los dos años')}.`], ['MEDIDAS · 2 años', `${Y('Las restantes medidas')}.`],
  ['MEDIDAS · 1 año', `${Y('Amonestación')}. Las ${Y('prestaciones en beneficio de la comunidad')}. La ${Y('permanencia de fin de semana')}.`],
]));

// ───────── p23 · art. 17.4 y 17.5 plazos de detención ─────────
v('lo', 'Las autoridades y funcionarios que intervengan en la detención de un menor deberán practicarla', flujo('PLAZOS DETENCIÓN MENOR (cuadro del temario · arts. 17.4 y 17.5)', [
  { t: `La detención de un menor por ${G('funcionarios de la policía')}:` },
  { t: `${K('NO')} podrá durar más tiempo del ${Y('estrictamente necesario')} para la realización de las averiguaciones tendentes al ${Y('esclarecimiento de los hechos')}.`, et: 'Para' },
  { t: `Y en todo caso, dentro del ${P('plazo máximo de 24 horas')}, el menor detenido deberá ser puesto:` },
  { bif: [{ t: `${Y('En libertad')}` }, { t: `${Y('A disposición del')} ${G('Ministerio Fiscal')}` }] },
  { t: `Éste habrá de resolver, dentro de las ${P('48 horas')} a partir de la detención, sobre: ${D('Puesta en libertad')} del menor · ${D('Desistimiento')} · ${D('Incoación del expediente')}: poniendo al menor a disposición del ${G('Juez de Menores')} competente e ${D('instando')} del Juez de Menores las oportunas ${Y('medidas cautelares')}.` },
]));

// ───────── p25 · art. 19 sobreseimiento ─────────
v('lo', 'También podrá el Ministerio Fiscal desistir de la continuación del expediente', flujo('SOBRESEIMIENTO DEL EXPEDIENTE (cuadro del temario · art. 19)', [
  { t: `${G('Ministerio Fiscal')} ${D('podrá desistir')} de la ${Y('continuación del expediente')} atendiendo:` },
  { bif: [
    { t: `A la ${Y('gravedad y circunstancias')} de los hechos y del menor, de modo particular a la ${K('falta de violencia o intimidación graves')} en la comisión de los hechos.` },
    { t: `A la circunstancia de que además el menor se haya: ${Y('Conciliado con la víctima')}, o · haya asumido el compromiso de ${Y('reparar el daño')}, o · haya comprometido a ${Y('cumplir la actividad educativa')} propuesta por el equipo técnico en su informe.` },
    { t: `Cuando el hecho imputado al menor constituya ${Y('delito menos grave o falta')}.` }] },
  { t: `Se entenderá por: ${Y('CONCILIACIÓN')}: cuando el menor ${D('reconozca el daño causado')} y ${D('se disculpe')} ante la víctima, y ésta ${D('acepte sus disculpas')} · ${Y('REPARACIÓN')}: compromiso asumido por el menor con la víctima o perjudicado de realizar determinadas ${Y('acciones en beneficio de aquéllos o de la comunidad')}, seguido de su realización efectiva.` },
  { t: `Cuando el menor ${K('no cumpla')} la reparación o actividad educativa acordada: el ${G('Ministerio Fiscal')} ${D('continuará la tramitación')} del expediente.` },
  { t: `Producida la conciliación o reparación, el ${G('Ministerio Fiscal')}: ${D('dará por concluida la instrucción')} y ${D('solicitará del Juez el sobreseimiento y archivo')} de las actuaciones, con remisión de lo actuado.` },
]));

// ───────── p26 · art. 20 unidad de expediente ─────────
v('lo', 'El Ministerio Fiscal incoará un procedimiento por cada hecho delictivo', flujo('UNIDAD DE EXPEDIENTE (cuadro del temario · art. 20)', [
  { t: `${G('Ministerio Fiscal')} ${D('incoará')}: ${Y('un procedimiento')} por ${Y('cada hecho delictivo')} · ${K('Salvo')}: ${Y('hechos delictivos conexos')}.` },
  { bif: [
    { t: `${Y('Todos los procedimientos')} tramitados a un mismo menor: se ${D('archivarán')} en el ${Y('expediente personal')} que del mismo se haya abierto en la ${G('Fiscalía')}.` },
    { t: `${Y('Todas las diligencias')} tramitadas a un mismo menor: se ${D('archivarán')} en el expediente personal abierto en el ${G('Juzgado de Menores')} respectivo.` }] },
  { t: `Cuando los delitos atribuidos al menor hubieran sido cometidos ${Y('en diferentes territorios')}: la determinación del ${G('órgano judicial competente')} para el enjuiciamiento de todos ellos en unidad de expediente (y de las ${G('entidades públicas')} competentes para la ejecución de las medidas) será el del ${P('LUGAR DEL DOMICILIO DEL MENOR')}.` },
  { t: `Y, ${K('subsidiariamente')}: los criterios del art. 18 LECr · el del ${Y('territorio en que se haya cometido el delito')} a que esté señalada la ${Y('pena mayor')} · el que ${Y('primero comenzara la causa')} si a los delitos está señalada igual pena · el que la ${G('Audiencia de lo criminal')} o el ${G('Tribunal Supremo')} designen, cuando las causas hubieren empezado al mismo tiempo o no conste cuál comenzó primero.` },
  { t: `Procedimiento de la competencia de la ${G('AUDIENCIA NACIONAL')}: ${K('no podrán')} ser objeto de ${Y('acumulación')} con otros procedimientos instruidos en el ámbito de la jurisdicción de menores, ${K('sean o no los mismos los sujetos imputados')}.` },
]));

// ───────── p31 · art. 28 medidas cautelares ─────────
v('lo', 'podrá mantenerse hasta que recaiga sentencia firme', arbol('MEDIDAS CAUTELARES (cuadro del temario · art. 28.1)', `${Y('MEDIDAS CAUTELARES')}`, [
  { t: `${P('SOLICITUD')}`, sub: [`${Y('De oficio')}: por ${G('Ministerio Fiscal')}, o`, `${Y('Instancia de parte')}: por quien haya ejercitado la ${Y('acción penal')}`] },
  { t: `${P('SUPUESTOS')} · cuando existan:`, sub: [`${Y('Indicios racionales')} de la comisión de un ${Y('delito')} y`, `${Y('Riesgo de eludir u obstruir la acción de la justicia')} por parte del menor, o`, `De ${Y('atentar contra los bienes jurídicos de la víctima')}`] },
  { t: `${P('COMPETENCIA')} · podrá solicitar del ${G('JUEZ DE MENORES')}, ${K('en cualquier momento')}, para:`, sub: [`${Y('Custodia y defensa')} del menor expedientado, o`, `Debida ${Y('protección de la víctima')}`, `Resolviendo cuando se haya oído: al ${G('letrado del menor')} · al ${G('equipo técnico')} · y ${G('representación de la entidad pública de protección o reforma de menores')}`, `Tomando en especial consideración el ${Y('interés del menor')}`] },
  { t: `${P('MEDIDAS')} · podrán consistir en:`, sub: [`${Y('Internamiento en centro')} en el régimen adecuado`, `${Y('Libertad vigilada')} ${AS}`, `${Y('Prohibición de aproximarse o comunicarse')} con la víctima con aquellos de sus familiares u otras personas que determine el Juez`, `${Y('Convivencia con otra persona, familia o grupo educativo')}`, `La medida cautelar adoptada ${D('podrá mantenerse')} hasta que recaiga ${P('sentencia firme')}`] },
]));

// ───────── p32 · art. 28.2-3 medida cautelar de internamiento ─────────
v('lo', 'podrá mantenerse hasta que recaiga sentencia firme', cols('MEDIDA CAUTELAR DE INTERNAMIENTO DEL MENOR (cuadro del temario · art. 28.2 y 28.3)', [
  { t: 'ADOPCIÓN · se atenderá a:', l: [`${Y('Gravedad')} de los hechos`, `${Y('Circunstancias personales y sociales')} del menor`, `Existencia de un ${Y('peligro cierto de fuga')}, y`, `${K('Especialmente')}, el que el menor hubiera cometido o no con ${Y('anterioridad otros hechos graves de la misma naturaleza')}`] },
  { t: 'PROCEDIMIENTO', l: [`${P('1º Solicitud')}: a instancia del ${G('Ministerio Fiscal')} o de la ${G('acusación particular')}`, `${P('2º Celebración de comparecencia')} a la que asistirán: Ministerio Fiscal y acusación particular · letrado del menor · demás partes personadas · representante del equipo técnico · representante de la entidad pública de protección o reforma de menores`, `${P('3º Proposición de pruebas')}: Ministerio Fiscal y las partes personadas podrán proponer los medios de prueba que puedan practicarse en el acto, o dentro de las ${P('24 horas')} siguientes`, `${P('4º Resolución')}: resolverá el ${G('JUEZ DE MENORES')}`] },
  { t: 'DURACIÓN', l: [`${P('TIEMPO MÁXIMO: 6 MESES')}`, `Que podrá ${D('prorrogarse')}. Requisitos: a instancia del ${G('Ministerio Fiscal')} · previa audiencia del ${G('letrado del menor')} · mediante ${Y('auto motivado')}`, `${P('DURACIÓN PRÓRROGA: 3 MESES COMO MÁXIMO')}`] },
], false));

// ───────── p34 · art. 61 responsabilidad civil · colores leídos a 140 ppp: naranja = «acción para exigir», «responsabilidad civil», RENUNCIE / EJERCITE / SE RESERVE y SALVO; lila = «ejercitará por»; verde = MINISTERIO FISCAL y «Ante el orden jurisdiccional civil»; cian = «Plazo: 1 mes»; amarillo = «Conforme», «Código Civil», «Ley de Enjuiciamiento Civil» ─────────
v('lo', 'La acción para exigir la responsabilidad civil en el procedimiento regulado en esta Ley', tabla('RESPONSABILIDAD CIVIL: REGLAS GENERALES (cuadro del temario · art. 61 · nota tuya: «Art. 61 del 1 al 3»)', ['Regla', 'Contenido'], [
  { l: '1. ACCIÓN', c: 'o', h: [
    { t: `La ${D('acción para exigir')} la ${D('responsabilidad civil')} en el procedimiento regulado en esta Ley ${AC('se ejercitará por')}: ${G('MINISTERIO FISCAL')} · ${D('SALVO')} que:` },
    { p: 'RENUNCIE', c: 'n', t: `El perjudicado ${D('RENUNCIE')} a ejercitar la acción.` },
    { p: 'EJERCITE', c: 'v', t: `El perjudicado ${D('EJERCITE')} la acción por sí mismo en un: ${B('Plazo: 1 mes')} (desde que se le notifique la apertura de la pieza separada de responsabilidad civil).` },
    { p: 'SE RESERVE', c: 'c', t: `El perjudicado ${D('se RESERVE')} la acción para ejercitarla: ${G('Ante el orden jurisdiccional civil')} · ${Y('Conforme')} a los preceptos del: ${Y('Código Civil')}, y ${Y('Ley de Enjuiciamiento Civil')}.` }] },
  { l: '2. TRAMITACIÓN', c: 'v', h: [{ t: `Una pieza separada de responsabilidad civil por cada uno de los hechos imputados.` }] },
  { l: '3. RESPONSABLES', c: 'c', h: [
    { t: `Cuando el responsable de los hechos cometidos sea un menor de 18 años, responderán solidariamente con él, por este orden: 1. Padres · 2. Tutores · 3. Acogedores · 4. Guardadores legales o de hecho.` },
    { t: `Cuando éstos no hubieren favorecido la conducta del menor con dolo o negligencia grave, su responsabilidad podrá ser moderada por el Juez.` }] },
]));

// ───────── p36-38 · PLAZOS del temario ─────────
v('lo', 'Los trámites para la exigencia de la responsabilidad civil aludida en los artículos anteriores', plazos('PLAZOS · LO 5/2000 (págs. 36 a 38 del temario)', [
  ['36 horas', `${Y('Permanencia de fin de semana')}: máximo de ${P('36 horas')} entre la tarde o noche del viernes y la noche del domingo (art. 7.1.g).`],
  ['10 años / 6 años', `${Y('Pluralidad de infracciones')}: internamiento cerrado, ${P('10 años')} para los mayores de dieciséis años y ${P('6 años')} para los menores de esa edad, sin perjuicio de la libertad vigilada complementaria (art. 11.2).`],
  ['24 horas', `${Y('Detención de los menores')}: plazo máximo de ${P('24 horas')}: puesto en libertad o a disposición del Ministerio Fiscal; art. 520 bis LECr, competencia del Juez de Menores (art. 17.4).`],
  ['48 horas', `${Y('Detención de los menores')}: el ${G('Ministerio Fiscal')} resolverá dentro de las ${P('48 horas')} a partir de la detención sobre libertad, desistimiento o incoación del expediente (art. 17.5).`],
  ['3 días', `${Y('Incoación del expediente')}: el Fiscal requerirá al menor y a sus representantes legales para que designen letrado en el plazo de ${P('3 días')}; si no, se nombrará de oficio del turno de especialistas (art. 22.2).`],
  ['24 horas', `${Y('Actuación instructora del Ministerio Fiscal')}: vista del expediente al letrado del menor, en un plazo ${K('no superior')} a ${P('24 horas')}, tantas veces como aquel lo solicite (art. 23.2).`],
  ['10 días + 1 mes', `${Y('Informe del equipo técnico')}: plazo máximo de ${P('10 días')}, prorrogable por un período no superior a ${P('1 mes')} en casos de gran complejidad (art. 27.1).`],
  ['24 horas', `${Y('Reglas generales (medidas cautelares)')}: pruebas en el acto o dentro de las ${P('24 horas')} siguientes (art. 28.2).`],
  ['6 meses / 3 meses', `${Y('Medida cautelar de internamiento')}: ${P('6 meses')}, prorrogable por otros ${P('3 meses')} como máximo (art. 28.3).`],
  ['1 mes', `${Y('Responsabilidad civil')}: el perjudicado la ejercita por sí mismo en el plazo de ${P('1 mes')} desde que se le notifique la apertura de la pieza separada (art. 61.1).`],
]));

// ───────── p42 · RD art. 3 modo de llevar a cabo la detención ─────────
v('rd', 'Las autoridades y funcionarios que intervengan en la detención de un menor deberán practicarla en la forma que menos le perjudique', tabla('MODO DE LLEVAR A CABO LA DETENCIÓN DEL MENOR (cuadro del temario · RD 1774/2004, art. 3)', ['Fase', 'Contenido'], [
  { l: '1. DETENCIÓN', c: 'o', h: [
    { t: `${G('Autoridades y funcionarios')} que intervengan en la detención: deberán practicarla de la forma que ${Y('menos perjudique')} al menor · obligados a ${D('informar al menor')}, en un lenguaje ${Y('claro y comprensible')} y de forma ${P('inmediata')}, de: hechos que se le imputan · razones de su detención · derechos que le asisten (especialmente los reconocidos en el art. 520 LECr).` },
    { t: `${D('Garantizando')} el respeto de tales derechos · deberán ${D('notificar inmediatamente')} el hecho de la detención y lugar de custodia a: ${G('representantes legales')} del menor, y ${G('Ministerio Fiscal')}. Si el menor detenido fuera ${Y('extranjero')}: se notificará a las ${G('autoridades consulares')} cuando el menor tuviera su ${Y('residencia habitual fuera de España')}, o así lo solicitaran el propio menor o sus representantes legales.` }] },
  { l: '2. DECLARACIÓN', c: 'v', h: [{ t: `La declaración del detenido se llevará a cabo en presencia de: su ${G('letrado')} ${D('y')} aquellos que ejerzan la ${Y('patria potestad, tutela o guarda')} del menor, ${K('salvo')} que las circunstancias aconsejen lo contrario · en su defecto: ${G('Ministerio Fiscal')}, representado por un ${Y('fiscal distinto del instructor')} del expediente.` }] },
  { l: '3. CUSTODIA', c: 'c', h: [{ t: `Corresponde a las ${G('FUERZAS Y CUERPOS DE SEGURIDAD')} hasta que el ${G('fiscal')} resuelva, en el menor espacio de tiempo posible y en todo caso dentro de las ${P('48 horas')} siguientes a la detención, sobre: ${Y('libertad del menor')} · ${Y('desistimiento del expediente')} · ${Y('incoación del expediente')}, con puesta a disposición del juez.` }] },
  { l: '4. GARANTÍAS', c: 'o', h: [{ t: `Durante la detención debe garantizarse que todo menor disponga de: ${Y('alimentación')} · ${Y('vestimenta')} · y ${Y('condiciones de intimidad, seguridad y sanidad adecuadas')}.` }] },
  { l: '5. LIBRO REGISTRO', c: 'v', h: [
    { t: `En los establecimientos de detención deberá llevarse un ${Y('libro registro')}, de carácter ${Y('confidencial')}, que ${K('al menos')} deberá contar con: a) ${Y('identidad')} del menor · b) ${Y('detención')}, motivos y, en su caso, autoridad que la ordenó · c) día y hora del ${Y('ingreso, traslado o libertad')} · d) persona o personas que ${Y('custodian')} al menor · e) detalle de la ${Y('notificación')} a los padres o representantes legales y al Ministerio Fiscal · f) circunstancias ${Y('psicofísicas')} del menor · g) constatación de que se le ha ${Y('informado')} de las circunstancias de la detención y de sus ${Y('derechos')}.` },
    { t: `Los datos estarán ${K('exclusivamente')} a disposición del ${G('Ministerio Fiscal')} y de la ${G('autoridad judicial competente')}. Este libro registro será ${P('único')} para todo lo concerniente a la detención del menor, y ${K('no se consignará ninguno de sus datos en ningún otro libro')} de la dependencia.` }] },
]));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const BLOQ = { lo: 'T17_LO', rd: 'T17_RD', ins: 'T17_INS' };
  const porNorma = {}; V.forEach(([n, loc, h]) => (porNorma[n] = porNorma[n] || []).push([loc, h]));
  let colocados = 0;
  for (const [n, lista] of Object.entries(porNorma)) {
    let h = L.get(s, BLOQ[n]).html.replace(/<!--VIS17-->[\s\S]*?<!--\/VIS17-->/g, '');
    const insertos = []; // para respetar el orden de varios cuadros tras la misma ficha
    for (const [loc, vis] of lista) {
      const k = norm(loc); let i = -1, pos = 0;
      for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
      if (i < 0) { console.error('SIN COLOCAR:', n, loc); continue; }
      insertos.push([i, vis]);
    }
    // varios cuadros en la misma posición: se insertan en el orden en que aparecen en V; de atrás hacia delante
    const orden = insertos.map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS17-->' + vis + '<!--/VIS17-->' + h.slice(i); colocados++; }
    s = L.put(s, BLOQ[n], h);
  }
  fs.writeFileSync(F, s);
  console.log(`Tema 17: cuadros ${V.length}, colocados ${colocados}`);
}
