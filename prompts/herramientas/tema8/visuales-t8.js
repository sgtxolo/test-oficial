// Cuadros visuales del Tema 8 (LOPJ 6/1985): recrean los cuadros del temario subrayado de Prefortia («TEMA 8 PODER JUDICIAL-08-08-2026.pdf»)
// con el TEXTO LITERAL del cuadro y las MARCAS REALES del usuario: amarillo (concepto) Y, naranja/rosa (verbo/acción) D, azul (plazo/cifra) P,
// subrayado rojo K, subrayado a lápiz U, cuadrado azul CA, círculo O y asterisco AS. El verde (órganos) y el lila (futuros) los pone reglas-color.js.
// Se insertan en T8.lopj de esquemas.html tras el artículo que ilustran y los usa también expres-t8.js (module.exports = V).
// Uso: node prompts/herramientas/tema8/visuales-t8.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS8-->)
const fs = require('fs');
const L = require('../visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const U = x => `<u class="m-lapiz">${x}</u>`;
const CA = x => `<span class="m-caja">${x}</span>`;
const O = x => `<span class="m-circulo">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const KY = x => K(Y(x));
const KD = x => K(D(x));
const pie = (html, txt) => html.replace(/<\/div>$/, `<div class="vis-flujo"><div class="vis-paso">${txt}</div></div></div>`);
const lista = items => items.map(x => '• ' + x).join('<br>');
const V = []; const v = (tras, html) => V.push([tras, html]);

// ───────── Tribunal Supremo · Sala de lo Penal (PDF p. 31 = impresa 21; arts. 57 y 58) ─────────
v('Artículo 58', tabla('Tribunal Supremo · Sala 2.ª, de lo Penal: conocimiento (cuadro del temario · art. 57)', ['Órgano', 'Conocimiento'], [
  { l: `<b>TRIBUNAL SUPREMO</b> (Sala 2.ª, Sala de lo penal)`, c: 'o', h: [
    { t: `${K('RECURSOS')}: ${lista(['Casación', 'Revisión', 'Otros extraordinarios que determine la ley.'])}` },
    { t: `De la ${KD('INSTRUCCIÓN Y ENJUICIAMIENTO')} de las causas ${K('contra')}:<br>` + lista([`Presidente del ${Y('Gobierno')}`, `Presidentes del ${Y('Congreso y del Senado')}`, `Presidente del ${Y('Tribunal Supremo')} y del ${Y('Consejo General')} del Poder Judicial`, `Presidente del ${Y('Tribunal Constitucional')}`, Y('Miembros del Gobierno'), Y('Diputados y Senadores'), `${Y('Vocales')} del Consejo General del Poder Judicial`, `Magistrados del ${Y('Tribunal Constitucional')} y del Tribunal Supremo`, `Presidentes de la ${Y('Audiencia Nacional')} y de cualquiera de sus Salas y de los Tribunales Superiores de Justicia`, Y('Fiscal General del Estado'), Y('Fiscales de Sala del Tribunal Supremo'), Y('Fiscal europeo'), `Presidente y Consejeros del ${Y('Tribunal de Cuentas')}`, `Presidente y Consejeros del ${Y('Consejo de Estado')}`, Y('Defensor del Pueblo'), `Así como de las causas que en su caso, ${Y('determinen los Estatutos')} de Autonomía.`]) },
    { t: `De la ${KD('INSTRUCCIÓN Y ENJUICIAMIENTO')} de las causas ${K('contra')}:<br>` + lista([`Magistrados de la ${Y('Audiencia Nacional')} o`, `de un ${Y('Tribunal Superior de Justicia')}.`, Y('Fiscales europeos delegados.')]) },
    { t: `De los ${KD('DEMÁS ASUNTOS')} que le atribuya esta Ley.` },
    { t: `De los ${KD('PROCEDIMIENTOS DE DECOMISO AUTÓNOMO')} por los delitos para cuyo conocimiento ${U('sean competentes')}.` }] }]));

// ───────── Sala y Sección especiales del Tribunal Supremo (PDF p. 33 = impresa 23; art. 61) ─────────
v('Artículo 61', pie(cols('Tribunal Supremo · Sala del art. 61.1 y Sección del art. 61.3 (esquema del temario)', [
  { t: 'SALA · Formada por', l: [U('Presidente del Tribunal Supremo'), U('Presidentes de Sala'), U('Magistrado más antiguo'), U('Magistrado más moderno'),
    `<b>Conocerá de:</b>`,
    `1. ${KD('Recurso de REVISIÓN')} contra ${U('sentencias')} dictadas ${Y('en única instancia')} por la Sala de lo Contencioso-Administrativo del Tribunal Supremo.`,
    `2. Incidentes de ${KD('RECUSACIÓN')} del: Presidente del Tribunal Supremo; ${U('Presidentes de Sala')}; ${CA('Más de dos')} Magistrados de una Sala <i>(los afectados por la recusación serán sustituidos por quienes corresponda)</i>.`,
    `3. ${KD('DEMANDAS de responsabilidad civil')} contra: Presidentes de Sala, o ${U('Todos o la mayor')} parte de los Magistrados de una Sala por ${U('hechos realizados')} en el ejercicio de su cargo.`,
    `4. ${KD('INSTRUCCIÓN Y ENJUICIAMIENTO')} de las causas contra: Presidentes de Sala, o Magistrados de una Sala cuando sean juzgados ${CA('todos o la mayor parte')} de los que la constituyen.`,
    `5. ${KD('Conocimiento')} de las pretensiones de declaración de ${KY('ERROR JUDICIAL')} ${CA('cuando')} éste se impute a una ${CA('Sala del Tribunal Supremo')}.`,
    `6. Procesos de ${KD('DECLARACIÓN DE ILEGALIDAD')} y consecuente disolución de los ${Y('partidos políticos')} <i>(conforme L.O. 6/2002)</i>.`] },
  { t: 'SECCIÓN · Formada por', l: [U('Presidente del Tribunal Supremo'), U('Presidente de la Sala de lo Contencioso-Administrativo'), `${U('5 Magistrados de la Sala de lo Contencioso-Administrativo')}: 2 más antiguos y 3 más modernos.`,
    `<b>Conocerá de:</b>`,
    `${KD('RECURSO de CASACIÓN para la UNIFICACIÓN DE DOCTRINA')} cuando la ${Y('contradicción')} se produzca ${Y('entre sentencias')} dictadas en única instancia por ${Y('Secciones distintas')} de la Sala de lo Contencioso-Administrativo.`] }]),
  `${AS} <i>Notas tuyas a mano:</i> «2 presidentes + 2 Magistrados» (Sala) · «2 presidentes + 5 Magistrados» (Sección).`));

// ───────── Audiencia Nacional · Sala de lo Penal (PDF p. 37 = impresa 29; art. 65) ─────────
v('Artículo 65', tabla('Audiencia Nacional · Sala de lo Penal: conocimiento (cuadro del temario · art. 65)', ['Órgano', 'Conocimiento'], [
  { l: `<b>AUDIENCIA NACIONAL</b> (Sala de lo Penal)`, c: 'o', h: [
    { t: `1.º Del ${KD('ENJUICIAMIENTO')}, salvo que corresponda en primera instancia a la Sección de lo Penal del Tribunal Central de Instancia, de las causas por los siguientes delitos:` },
    { t: lista([`Delitos contra el titular de la Corona, su Consorte, su Sucesor o Sucesora, altos organismos de la Nación y forma de Gobierno.`, `Falsificación de moneda y fabricación de tarjetas de crédito y débito falsas y cheques de viajero falsos o cualquier otro instrumento de pago distinto del efectivo, siempre que sean cometidos por organizaciones o grupos criminales.`, `Defraudaciones y maquinaciones para alterar el precio de las cosas que produzcan o puedan producir grave repercusión en la seguridad del tráfico mercantil, en la economía nacional o perjuicio patrimonial en una generalidad de personas en el territorio de más de una Audiencia.`, `Tráfico de drogas o estupefacientes, fraudes alimentarios y de sustancias farmacéuticas o medicinales, siempre que sean cometidos por bandas o grupos organizados y produzcan efectos en lugares pertenecientes a distintas Audiencias.`, `Delitos cometidos fuera del territorio nacional, cuando conforme a las leyes o a los tratados corresponda su enjuiciamiento a los Tribunales españoles.`, `Delitos atribuidos a la Fiscalía Europea en los artículos 22 y 25 del Reglamento (UE) 2017/1939 del Consejo, de 12 de octubre de 2017, cuando aquella hubiera decidido ejercer su competencia.`, `Delitos de contrabando de material de defensa, de otros materiales y de productos y tecnología de doble uso.`]) },
    { t: `En todo caso, la Sala de lo penal de la Audiencia Nacional extenderá su competencia al conocimiento de los ${KD('delitos conexos')} con todos los anteriormente reseñados.` }] }]));

// ───────── Audiencias Provinciales · orden penal (PDF p. 49 = impresa 37; art. 82; EX) ─────────
v('Artículo 82', tabla('Audiencias Provinciales · conocimiento en el orden penal (cuadro del temario · art. 82 · EX)', ['Órgano', 'Conocimiento (en el orden penal)'], [
  { l: `<b>AUDIENCIAS PROVINCIALES</b> ${O('Ex')}`, c: 'v', h: [
    { t: `De las causas por ${KD('delito')}, ${CA('a excepción')} de los que la ${Y('ley atribuye')} al conocimiento de las ${KD('Secciones de lo Penal de los Tribunales de Instancia o de otros Tribunales')} previstos en esta ley.` },
    { t: `${K('RECURSOS')}: ${lista([`contra las ${D('resoluciones')} dictadas por las ${KD('Secciones de Instrucción y de lo Penal de los Tribunales de Instancia de la provincia')}.`, `contra las ${D('resoluciones')} en ${Y('materia penal')} dictadas por las ${KD('Secciones de Violencia sobre la Mujer y por las Secciones de Violencia contra la Infancia y la Adolescencia')}.  <i>(pág. 36)</i>`, `contra las ${D('resoluciones')} de las ${KD('Secciones de Menores')} de los Tribunales de Instancia con sede en la provincia y de las ${Y('cuestiones de competencia')} entre los mismos.`, `contra las ${D('resoluciones')} de las ${KD('Secciones de Vigilancia Penitenciaria')} de los Tribunales de Instancia ${CA('cuando')} la competencia ${O('no')} corresponda a la Sala de lo Penal de la Audiencia Nacional.`])}` },
    { t: `De los ${KD('procedimientos de decomiso autónomo')} por los ${Y('delitos')} para cuyo conocimiento sean competentes.` },
    { t: `De las ${KD('cuestiones de competencia')} en ${Y('materia penal')} que se susciten entre los jueces, las juezas, los magistrados y las magistradas de un ${CA('mismo o distinto')} Tribunal de Instancia de la provincia.` },
    { t: `De las ${KD('recusaciones')} de sus magistrados y magistradas, ${CA('cuando')} la competencia ${O('no')} esté atribuida a la ${Y('Sala especial')} existente a ${Y('estos efectos')} en los Tribunales Superiores de Justicia.` }] }]));

// ───────── Sección de lo Mercantil · materias (PDF p. 63 = impresa 44; art. 87) ─────────
v('Artículo 87', tabla('Artículo 87 LOPJ · SECCIÓN DE LO MERCANTIL · MATERIAS (cuadro del temario)', ['Materia', 'Contenido'], [
  { l: 'a) Cuestiones de competencia del orden jurisdiccional civil en materia de:', c: 'o', h: [
    { t: lista([KY('propiedad intelectual e industrial;'), KY('competencia desleal y publicidad;'), `${KY('sociedades mercantiles, sociedades cooperativas, agrupaciones de interés económico;')}`, `${KD('transporte terrestre, nacional o internacional;')}`, `${KD('derecho marítimo y derecho aéreo.')}`]) },
    { t: `${K('EXCEPCIÓN')}: pretensiones basadas exclusivamente en Reglamentos (CE) / (UE) sobre ${D('pasajeros aéreos; viajeros de ferrocarril; viajeros de autobús y autocar; y pasajeros que viajan por mar y por vías navegables.')}` }] },
  { l: 'b) Acciones relativas a:', c: 'v', h: [
    { t: lista([`${Y('aplicación de arts. 101 y 102 TFUE y arts. 1 y 2 Ley de Defensa de la Competencia.')}`, `${Y('pretensiones de resarcimiento del perjuicio ocasionado por la infracción del Derecho de la competencia.')}`]) }] },
  { l: 'c) Recursos directos contra:', c: 'c', h: [
    { t: `las ${KD('calificaciones negativas de registradores/as mercantiles')} ${CA('o, en su caso,')} contra ${U('resoluciones expresas o presuntas')} de la ${Y('Dirección General de Seguridad Jurídica y Fe Pública')} relativas a esas calificaciones.` }] },
  { l: `${KD('Reconocimiento y ejecución de sentencias y demás resoluciones judiciales extranjeras')}`, c: 'o', h: [
    { t: `cuando éstas versen sobre cualquiera de las materias a que se refiere este artículo, ${O('salvo')} que, según los tratados y otras normas internacionales, el ${Y('conocimiento')} de esa materia corresponda a ${Y('otro órgano judicial')}.` }] }]));

// ───────── Sección de lo Mercantil · jurisdicción exclusiva y excluyente (PDF p. 65 = impresa 45; art. 87.7; EX) ─────────
v('Artículo 87', tabla('Artículo 87 LOPJ · JURISDICCIÓN EXCLUSIVA Y EXCLUYENTE en materia de concurso de acreedores/as (cuadro del temario · EX)', ['Supuesto', 'Contenido'], [
  { l: `${KD('a) En todo caso:')}`, c: 'o', h: [
    { t: `1.ª ${KY('Acciones civiles con trascendencia patrimonial')} contra la PC, excepto las de procesos civiles sobre capacidad, filiación, matrimonio y menores.` },
    { t: `2.ª ${KY('Ejecuciones relativas a créditos concursales o contra la masa')} sobre los bienes y derechos de la ${CA('PC integrados')} ${O('o')} que se integren en masa activa.` },
    { t: `3.ª ${KY('Determinación del carácter necesario de un bien o derecho')} para la continuidad de la actividad profesional o empresarial de la ${CA('PD')}.` },
    { t: `4.ª ${KY('Declaración de la existencia de sucesión de empresa')} a efectos laborales y de seguridad social en casos de transmisión de unidad o de unidades productivas y determinación de los límites de esa declaración.` },
    { t: `5.ª ${KY('Medidas cautelares que afecten o pudieran afectar a los bienes y derechos de la PC integrados o que se integren en la masa activa')}, excepto las de procesos civiles sobre provisión de medidas de apoyo y otros relativos a personas con discapacidad, filiación, matrimonio y menores.` },
    { t: `6.ª ${Y('Demás materias')} establecidas en la legislación concursal.` }] },
  { l: `${KD('b) Cuando el deudor o la deudora sea persona natural:')}`, c: 'v', h: [
    { t: `1.ª Materias que en el procedimiento concursal debe adoptar en relación con la ${KY('asistencia jurídica gratuita')}.` },
    { t: `2.ª ${KY('Disolución y liquidación de la sociedad o comunidad conyugal')} de la PC.` }] },
  { l: `${KD('c) Cuando el deudor sea persona jurídica:')}`, c: 'c', h: [
    { t: `1.ª ${KY('Acciones de reclamación de deudas sociales')} que se ejerciten contra los socios de la SC que sean subsidiariamente responsables, y acciones para exigir a los socios de la SC el desembolso de las aportaciones sociales diferidas o el cumplimiento de las prestaciones accesorias.` },
    { t: `2.ª ${KY('Acciones de responsabilidad civil')} contra: administradores/as, liquidadores/as, de derecho o de hecho; ${U('persona natural designada para el ejercicio permanente de las funciones propias del cargo de administrador persona jurídica')}; personas, cualquiera que sea su denominación, que tengan atribuidas facultades de la más alta dirección de la sociedad cuando no exista delegación permanente, por los daños y perjuicios causados, antes o después de la declaración judicial de concurso, a la PJC. <b>EN TODO CASO, EXCLUIDA:</b> revisión de las acciones de responsabilidad que ejerzan las Administraciones Públicas en el ejercicio de su autotutela.` },
    { t: `3.ª ${KY('Acciones de responsabilidad contra auditores/as')} por los daños y perjuicios causados, antes o después de la declaración judicial de concurso, a la PJC.` }] },
  { l: `${KD('d) Acciones sociales con carácter colectivo que tengan por objeto:')}`, c: 'o', h: [
    { t: lista([Y('modificación sustancial de las condiciones de trabajo'), Y('traslado'), Y('despido'), 'suspensión de contratos', Y('reducción de jornada por causas económicas, técnicas, organizativas o de producción')]) + `<br>+ Las que versen sobre suspensión o extinción de contratos de alta dirección.` }] },
  { l: `${KD('JURISDICCIÓN EXTENDIDA · e)')}`, c: 'v', h: [
    { t: `Todas las ${KY('cuestiones prejudiciales civiles')}, las administrativas y las sociales ${CA('directamente')} relacionadas con el concurso o cuya resolución sea necesaria para la adecuada tramitación del procedimiento concursal (la decisión sobre estas cuestiones ${KD('NO surtirá efecto fuera del concurso de acreedores')} en que se produzca).` }] }]));

// ───────── Sección de lo Mercantil · competencia exclusiva (PDF p. 67 = impresa 46; art. 87.9-10) ─────────
v('Artículo 87', pie(cols('Artículo 87 LOPJ · COMPETENCIA EXCLUSIVA de la Sección de lo Mercantil (cuadro del temario)', [
  { t: 'Comisión de Propiedad Intelectual', l: [`${CA('En primera instancia')} de los ${KD('recursos contra las resoluciones dictadas por la Sección Primera de la Comisión de Propiedad Intelectual')} para resolver las cuestiones litigiosas sobre el acuerdo previsto en el art. 129 bis.3 Ley de Propiedad Intelectual.`, `Podrán, en todo caso:`, `- ${Y('pronunciarse sobre el fondo de la controversia')}`, `- ${Y('suspender cautelarmente la ejecución de la resolución')} dictada por la Sección Primera mientras se resuelve el procedimiento en sede judicial.`] },
  { t: 'Tribunal de Marca de la Unión Europea', l: [`${KD('Tribunal de Marca de la Unión Europea')} (Sección de lo Mercantil del Tribunal de Instancia de Alicante): conocerá en ${Y('primera instancia')} con jurisdicción en todo el territorio nacional de aquellas acciones que se ejerciten al amparo de:`, `- Reglamento (UE) sobre la ${Y('marca de la Unión Europea')}`, `- Reglamento (CE) sobre los ${Y('dibujos y modelos comunitarios')}`, `+ ${D('También conocerá')} de demandas civiles: con acciones acumuladas relativas a ${CA('marcas')} de la Unión Europea y a marcas nacionales o internacionales idénticas o similares; con cualquier ${Y('otra conexión')} entre las acciones ejercitadas si al menos una de ellas estuviera basada en un registro o solicitud de marca de la Unión.`] }]),
  `<i>Abreviaturas:</i> ${D('PC, PD')}: persona concursada, persona deudora · ${D('SC, PJC')}: sociedad concursada, persona jurídica concursada. ${AS} <i>Nota tuya:</i> círculo «EX» junto al Tribunal de Marca.`));

// ───────── Secciones de Instrucción o Secciones Únicas (PDF p. 71 = impresa 48; art. 88; EX) ─────────
v('Artículo 88', pie(cols('Artículo 88 LOPJ · SECCIONES DE INSTRUCCIÓN O SECCIONES ÚNICAS (cuadro del temario · EX)', [
  { t: '(1) Conocerán en el orden penal', l: [`a) ${KD('Instrucción')} de las causas por delito cuyo enjuiciamiento corresponda a las Audiencias Provinciales y a las Secciones de lo Penal de los Tribunales de Instancia. ${K('EXCEPTO')}: instrucción de las que sean competencia de las ${Y('SEVIMU')} o de la ${Y('SEVIA')}.`, `b) ${KD('Dictar sentencia de conformidad')} con la acusación en los casos establecidos por la ley y en los procesos por aceptación de decreto.`, `c) ${KD('Conocimiento y fallo')} de los juicios por delito ${CA('leve')}. ${K('SALVO')}: competencia de los jueces y juezas de paz o de las SEVIMU o de la SEVIA.`, `d) ${KD('Procedimientos de habeas corpus')}.`, `e) ${KD('Recursos')} contra las resoluciones dictadas por los jueces y juezas de paz del partido y de las cuestiones de competencia entre estos.`, `f) ${KD('Adopción de la orden de protección')} a las víctimas de violencia sobre la mujer, infancia y adolescencia en funciones de guardia, siempre que ${CA('no pueda')} ser adoptada por el juez/jueza de la SEVIMU o Sección correspondiente.`, `g) ${KD('Emisión y ejecución de instrumentos de reconocimiento mutuo')} de resoluciones penales en la UE que les atribuya la ley.`, `h) ${KD('Procedimientos de decomiso autónomo')} por delitos para cuyo conocimiento sean competentes.`] },
  { t: '(2) Asimismo, conocerán de', l: [`- ${Y('autorización del internamiento de extranjeros')} en los centros de internamiento`, `- ${Y('control de la estancia de éstos')} en los mismos y en las salas de inadmisión de fronteras`, `- ${Y('peticiones y quejas')} que planteen los internos en cuanto afecten a sus derechos fundamentales`, `<b>(3) Podrán ser tramitados por el juez o jueza inicialmente competente:</b>`, `- procedimientos de ${D('revisión de medidas por modificación de circunstancias')}.`] }]),
  `<i>Abreviaturas:</i> ${Y('SEVIMU')}: Sección de Violencia sobre la Mujer · ${Y('SEVIA')}: Sección de Violencia contra la Infancia y la Adolescencia. ${AS} <i>Notas tuyas:</i> círculo «EX» y «Tribunal de Instancia».`));

// ───────── Sección de Violencia contra la Infancia y la Adolescencia (PDF p. 79 = impresa 52; art. 89 bis; EX) ─────────
v('Artículo 89 bis', pie(cols('Artículo 89 bis LOPJ · SECCIÓN DE VIOLENCIA CONTRA LA INFANCIA Y LA ADOLESCENCIA (cuadro del temario · EX)', [
  { t: '(5) Conocerán en el orden penal', l: [`De la ${KD('instrucción')} de los procesos para exigir responsabilidad penal por los delitos recogidos en los Títulos del Código Penal, ${KY('cometidos contra o cuya víctima sea niño/a o adolescente')}, relativos a:`, `a) ${Y('Homicidio, aborto, lesiones o lesiones al feto')}`, `b) Delitos: - contra la ${Y('libertad')} · - de ${Y('torturas y contra la integridad moral')} · - contra la ${Y('intimidad, el derecho a la propia imagen y la inviolabilidad del domicilio')} · - contra la ${Y('libertad e indemnidad sexual')} · - contra el ${Y('honor')} · - contra las ${Y('relaciones familiares')} o - cualquier otro cometido con violencia o intimidación`, `c) Delito de ${Y('trata de seres humanos')} del artículo 177 bis del Código Penal`, `d) Delito de ${Y('quebrantamiento')} del artículo 468 del Código Penal`] },
  { t: 'Serán igualmente competentes para', l: [`a) ${KD('Adopción de medidas cautelares')} que aseguren la protección de las ${Y('víctimas menores de edad')}, sin perjuicio de las competencias atribuidas al juez de guardia`, `b) ${KD('Conocimiento y fallo de delitos leves')} que les atribuya la ley cuando la víctima ${CA('sea')} niño/a o adolescente`, `c) ${KD('Dictar sentencia de conformidad')} con la acusación en los casos establecidos por la ley`, `d) ${KD('Emisión y ejecución de instrumentos de reconocimiento mutuo')} de resoluciones penales en la Unión Europea que les atribuya la ley`, `<b>(7)</b> En caso de que los hechos objeto de instrucción por la SEVIA también pudieran ser conocidos por la SEVIMU, la competencia le corresponderá ${K('en todo caso a la última')}.`] }]),
  `<i>Abreviaturas:</i> ${Y('SEVIA')}: Sección de Violencia contra la Infancia y la Adolescencia · ${Y('SEVIMU')}: Sección de Violencia sobre la Mujer. ${AS} <i>Nota tuya:</i> círculo «EX».`));

// ───────── Jueces de Paz (PDF p. 89 = impresa 49; arts. 99 y 100) ─────────
v('Artículo 100', pie(arbol('JUZGADOS DE PAZ (esquema del temario · art. 100)', `${Y('JUZGADOS DE PAZ')}`, [
  `<b>EN ORDEN CIVIL</b> · ${KD('Conocerán')} de la ${Y('sustanciación en primera instancia, fallo y ejecución')} de los procesos que la ley determine. · ${D('Cumplirán')} las demás funciones que la ley les atribuya.`,
  `<b>EN ORDEN PENAL</b> · ${KD('Conocerán en primera instancia')}, de los procesos por ${KY('faltas')} (delitos leves) que les atribuya la ley. · ${D('Podrán intervenir')}, igualmente, en ${Y('actuaciones penales de prevención, o por delegación')}. · ${CA('Otras')} que señalen las leyes.`]),
  `${AS} <i>Notas tuyas a mano:</i> «Tribunal de Instancia» · «Menores y Paz: solo uno».`));

// ───────── Abogados y Procuradores · funciones (PDF p. 101 = impresa 68; arts. 542 y 543; EX) ─────────
v('Artículo 543', cols('FUNCIONES · ABOGADO y PROCURADOR (cuadro del temario · arts. 542 y 543 · EX)', [
  { t: 'ABOGADO', l: [`${KD('Licenciado en Derecho')} que ejerza profesionalmente: ${U('Dirección y defensa')} de las partes en toda clase de procesos, o ${U('Asesoramiento y consejo jurídico')}.`, `En su ${KD('actuación ante los juzgados y tribunales')}, son: ${Y('Libres e independientes')} · Se sujetarán al ${Y('principio de buena fe')} · Gozarán de los ${Y('derechos inherentes a la dignidad')} de su función · Amparados por los juzgados y tribunales en su ${Y('libertad de expresión y defensa')}.`, `Deberán ${KD('guardar secreto')} de todos los hechos o noticias que conozcan por razón de su actuación profesional: ${U('No pudiendo ser obligados a declarar')} sobre los mismos.`] },
  { t: 'PROCURADOR', l: [`${KD('Representación de las partes')} en todo tipo de procesos, ${O('salvo')} cuando la ley autorice otra cosa.`, `${KD('Podrá realizar')}: actos de ${Y('comunicación a las partes')} del proceso · actos de ${Y('cooperación, auxilio y colaboración')} con la Administración de Justicia · ${Y('Por delegación del juez/a o tribunal, actuaciones materiales propias del proceso de ejecución')}. ${U('En todo caso, excluirán')}: ejecuciones hipotecarias de vivienda habitual · ejecuciones derivadas de procesos en materia de familia · ejecuciones de desahucio por impago de rentas o cantidades debidas en viviendas habituales · lanzamientos de ocupantes de finca con posterioridad a la subasta de la misma si esta es vivienda habitual.`, `Deberán ${KD('guardar secreto')} de todos los hechos o noticias que conozcan por razón de su actuación profesional: ${U('No pudiendo ser obligados a declarar')} sobre los mismos.`, `Podrán ${KD('ser sustituidos')} por: ${Y('Otro procurador')} · ${Y('Oficial habilitado')} (para los actos y en la forma que se determine reglamentariamente).`] }]));

module.exports = V;
if (require.main !== module) return;   // al importarlo desde expres-t8.js solo se exportan los cuadros
// ───────── inserción en T8.lopj de esquemas.html ─────────
const F = 'esquemas.html';
const s = fs.readFileSync(F, 'utf8').split('\n');
const k = s.findIndex(l => l.startsWith('/* T8_LOPJ */ T8.lopj = "'));
if (k < 0) throw new Error('no se encuentra T8.lopj');
let l = s[k];
l = l.replace(/<!--VIS8-->[\s\S]*?<!--\/VIS8-->/g, '');
const esc = h => JSON.stringify(h).slice(1, -1);
const pos = [];
V.forEach(([tras, html], i) => {
  const heads = [...l.matchAll(/articulo-head[^>]*>(.*?)<\/div>/g)].map(m => [m.index, m[1].replace(/<[^>]+>/g, '').trim()]);
  const hh = heads.find(h => h[1] === tras); if (!hh) throw new Error('no encuentro ' + tras);
  const ini = hh[0];
  const sig = [l.indexOf('<div class=\\"articulo\\">', ini), l.indexOf('<div class=\\"bloque-titulo\\">', ini)].filter(x => x > 0).sort((a, b) => a - b)[0];
  pos.push([sig, `<!--VIS8-->${esc(html)}<!--/VIS8-->`, i]);
});
pos.sort((a, b) => b[0] - a[0]).forEach(([p, h]) => { l = l.slice(0, p) + h + l.slice(p); });
s[k] = l;
fs.writeFileSync(F, s.join('\n'));
console.log('cuadros insertados:', V.length);
