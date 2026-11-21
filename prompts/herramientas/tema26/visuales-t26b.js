require('../esq-virtual.js');
// Cuadros visuales del Tema 26 (parte b): recrean los cuadros/esquemas/tablas de tu PDF subrayado
// (TEMA 26 ESTATUTO GC-2026-08-08.pdf, págs. 73-154 del PDF, 1-based: Ley 29/2014, de Régimen del Personal) con su texto literal.
//   Págs.: 84 (art. 9), 87 (art. 15), 88 (arts. 16 y 17), 89 (art. 17), 90 (art. 18), 96 (art. 29), 101 (arts. 39-40), 103 (art. 44), 104 (art. 45),
//   105 (art. 48), 108 (arts. 53-54), 109 (art. 55), 110 (arts. 52-58), 111 (arts. 59-61), 112 (arts. 62-63), 113 (arts. 64-65), 115 (art. 68), 116 (art. 69),
//   118 (art. 73), 121 (art. 80), 122 (art. 83), 124 (art. 87), 125 (art. 90), 131 (art. 93), 133 (arts. 87-93), 134 (art. 90), 135 (art. 94),
//   136 (art. 95; en la lista del JSON figuraba como pág. 137), 138 (art. 99), 148 (DT 7.ª) + notas a boli de págs. 80, 82-83, 85-86, 91, 99-100, 104, 115, 119, 126 y 153.
// COLORES: leídos de TU PDF (fosforito dentro del cuadro: amarillo Y, naranja/salmón D, verde G, azul-turquesa P, subrayado rojo K, círculo O, ✱) en
//   págs. 87, 88 (listas ESCALAS/CATEGORÍAS), 89, 90, 103, 105, 108, 109, 111, 112, 113 (solo «Concurso-oposición/Cabo»), 118 (parcial), 124, 125, 131, 135 (recuadro a-d), 136 y 148;
//   el RESTO de cuadros vienen IMPRESOS sin tu fosforito (págs. 84, 96, 101, 104, 110, 113, 115, 116, 121, 122, 133, 134, 135 (diagrama), 138) y van con el MÉTODO:
//   órganos y autoridades → verde (G); plazos, cifras → azul (P); «no / salvo / únicamente» → rojo subrayado (K); conceptos clave → amarillo/naranja (Y/D).
//   El subrayado impreso en negro de los cuadros (pág. 84, 104, 115) se trata como imprenta (naranja D). Las notas a boli van como «✎». El lila («determinará…») lo pone el script lila.
// LOCALIZADOR: v(loc, html): loc = cabecera de la ficha del esquema tras la que se inserta (empieza por «Artículo N · …»).
const { R, P, D, Y, K, X, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const O = x => `<span class="m-circulo">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const nota = t => `<span class="m-nota ro">${t}</span>`;
const pie = t => `<div class="vis-pie" style="font-size:.86em;opacity:.85;margin-top:6px">✎ ${t}</div>`;
const V = []; const v = (loc, html) => V.push([loc, html]);
const L = 'Régimen del personal';
const A = n => `Artículo ${n} · ${L}`;
const B = 'border:1px solid rgba(128,128,128,.5);padding:5px 8px';
const grid = (titulo, ico, cab, filas) => `<div class="vis"><div class="vis-t"><i>${ico}</i>${titulo}</div><div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.88rem;line-height:1.4">${cab ? `<thead><tr>${cab.map(c => `<th style="${B};background:rgba(128,128,128,.22);text-align:left">${X(c)}</th>`).join('')}</tr></thead>` : ''}<tbody>${filas.map(f => `<tr>${f.map(c => c === '' ? `<td style="${B};background:rgba(128,128,128,.12)"></td>` : `<td style="${B};vertical-align:top">${X(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
const notas = (tit, ...ps) => `<div class="vis"><div class="vis-t"><i>✎</i>NOTAS A BOLI · ${tit}</div>${ps.map(pie).join('')}</div>`;

// ───────── art. 9 · cuadro impreso Ministro de Defensa / Ministro de Interior / Conjuntamente (pág. 84, impreso sin fosforito) ─────────
v(A(9), cols('MINISTRO DE DEFENSA · MINISTRO DE INTERIOR · CONJUNTAMENTE (cuadro impreso · sello EXAMEN · pág. 84 · art. 9 · R28-R30)', [
  { t: G('MINISTRO DE DEFENSA'), l: [`▸ Ejercicio de la ${D('función directiva')}.`, `▸ ${Y('Ascensos')} y ${Y('situaciones administrativas')}.`] },
  { t: G('MINISTRO DE INTERIOR'), l: [`▸ Dirección de la ${D('política de personal')}:`, `• ${Y('Destinos')} y ${Y('retribuciones')}`] },
  { t: `${KD('CONJUNTAMENTE')}`, l: [`▸ Competencias ${D('directivas')}:`, `• ${Y('Selección, formación')} y ${Y('perfeccionamiento')}`] },
]));

// ───────── art. 15 · acción directiva / gestión / ejecutiva + apoyo al mando (pág. 87) ─────────
v(A(15), cols('ACCIÓN DIRECTIVA · GESTIÓN · EJECUTIVA (recuadro del apdo. 2 · pág. 87 · art. 15.2 · R32)', [
  { t: `La ${KD('ACCIÓN DIRECTIVA')} se ejerce ${Y('mediante:')}`, l: [`la ${KY('definición de objetivos')}${O('y')}`, `la ${KY('determinación de los medios')} para conseguirlos, estableciendo los ${KY('planes')} correspondientes${O('y')} ${KY('controlando su ejecución')}.`] },
  { t: `Mediante ${KD('ACCIONES DE GESTIÓN:')}`, l: [`se ${KY('aplican los medios')} puestos a disposición ${Y('para alcanzar los objetivos de la forma más eficiente')}.`] },
  { t: `Por medio de ${KD('ACCIONES EJECUTIVAS:')}`, l: [`se ${KY('ponen en práctica los planes')} establecidos actuando en ${KY('cumplimiento de órdenes concretas')} ${O('o')} ${KY('siguiendo procedimientos preestablecidos')}.`] },
]) + pie(`En el apdo. 1, a boli: «Las de mando, acciones de gestión y ejecutivas» (junto a «las de MANDO», tachado). Flechas a mano desde «definición de objetivos y» hacia «gestión» y desde «planes» hacia «ejecutivas». Margen: ${nota('C.O.S.')} (cargo, destino o servicio).`)
  + cols('APOYO AL MANDO (esquema con llave · pág. 87 · art. 15.3)', [
    { t: `La ${KD('ACCIÓN DE MANDO')} ${Y('es una acción directiva')} que se refiere al ${KY('ejercicio de la autoridad')}${O('y')} a la ${KY('asunción de la consiguiente responsabilidad')}${O('y')} corresponde al guardia civil en razón de su ${Y('cargo, destino o servicio')}. Para el ejercicio de la acción de mando se podrá contar con la ${Y('colaboración')} de los ${KY('subordinados')} en tareas de:`, l: [Y('- información,'), Y('- planeamiento,'), Y('- asesoramiento,'), Y('- coordinación y control,'), `➜ Que constituyen el ${KY('apoyo al mando')}.`] },
  ]) + pie(`A boli: ${nota('IPACC')} (información, planeamiento, asesoramiento, coordinación y control) con flecha hacia abajo.`));

// ───────── art. 16 · ESCALAS (pág. 88) ─────────
v(A(16), cols('ESCALAS (recuadro R33 · pág. 88 · art. 16.2)', [
  { t: KD('ESCALAS'), l: [Y('• OFICIALES'), Y('• SUBOFICIALES'), Y('• CABOS Y GUARDIAS')] },
]) + pie(`En el apdo. 2, círculo rojo en «${nota('por ley')}» con flecha a mano hacia el recuadro.`));

// ───────── art. 17 · CATEGORÍAS (pág. 88) ─────────
v(A(17), cols('CATEGORÍAS (recuadro R34 · pág. 88 · art. 17)', [
  { t: KD('CATEGORÍAS'), l: [Y('• OFICIALES GENERALES'), Y('• OFICIALES'), Y('• SUBOFICIALES'), Y('• CABOS Y GUARDIAS')] },
]));

// ───────── art. 17 · esquema CATEGORÍAS con funciones (pág. 89) ─────────
v(A(17), cols('CATEGORÍAS · funciones de cada una (esquema con llaves · pág. 89 · art. 17)', [
  { t: KD('OFICIALES GENERALES'), l: [`Ejercen la ${KD('acción de mando')} en la estructura orgánica de la Guardia Civil${O('y')} la ${KY('<b>alta dirección y gestión</b>')} de los ${KY('recursos')} humanos, materiales y financieros. ${KY('Accederán')} a esta categoría los oficiales que hayan ${KY('acreditado')} en su trayectoria profesional de modo ${Y('<b>sobresaliente</b>')} su ${KY('competencia y capacidad de liderazgo')}.`] },
  { t: KD('OFICIALES') + ` ${nota('Ma Co I G')}`, l: [`Desarrollan ${KY('<b>acciones directivas</b>')}, especialmente de ${KY('mando, coordinación')}, ${KY('inspección y gestión')} de los ${KY('servicios')}${O('y')} de los recursos humanos, materiales y financieros. ${KY('<b>Se caracterizan</b>')} por su ${KY('nivel de formación')}${O('y')} por su ${KY('liderazgo, iniciativa, capacidad')} para asumir ${KY('responsabilidades y decisión para resolver')}.`] },
  { t: KD('SUBOFICIALES'), l: [`Constituyen el ${KD('<b>eslabón fundamental</b>')} de la estructura orgánica de la Guardia Civil. Desarrollan ${KY('<b>acciones ejecutivas</b>')}${O('y')} las ${KY('directivas que les correspondan a su nivel')}, ejerciendo el mando y la iniciativa adecuados al mismo, ${KY('impulsando el cumplimiento de las órdenes e instrucciones recibidas')}${O('y')} efectuando el ${KY('control y la supervisión')} de las tareas encomendadas en la realización de las funciones recogidas en el artículo 15. Por su ${Y('<b>cualificación, capacidades</b>')}${O('y')} ${Y('<b>experiencia</b>')} serán ${KY('<b>estrechos colaboradores de los oficiales</b>')}${O('y')} ${Y('<b>líderes</b>')} para sus ${KY('subordinados')}, con los que mantendrán un ${KY('permanente contacto')}.`] },
  { t: KD('CABOS Y GUARDIAS'), l: [`Constituyen el ${KD('<b>elemento primordial</b>')} de la estructura orgánica de la Guardia Civil. Realizarán ${KY('tareas')} de acuerdo con los ${KY('procedimientos de actuación')}${O('y')} de ${KY('servicio')} establecidos${O('y')} de su ${KY('<b>profesionalidad, iniciativa y preparación depende en gran medida la eficacia</b>')} de la Guardia Civil.`] },
]));

// ───────── art. 18.3 · lista de empleos por categoría (pág. 90) ─────────
v(A(18), cols('EMPLEOS DEL CUERPO POR CATEGORÍAS (lista · R35 · pág. 90 · art. 18.3)', [
  { t: `${KD('Categoría de oficiales generales')}`, l: [Y('– Teniente General.'), Y('– General de División.'), Y('– General de Brigada.')] },
  { t: `${KD('Categoría de oficiales')}`, l: [Y('– Coronel.'), Y('– Teniente Coronel.'), Y('– Comandante.'), Y('– Capitán.'), Y('– Teniente.')] },
  { t: `${KD('Categoría de suboficiales')}`, l: [Y('– Suboficial Mayor.'), Y('– Subteniente.'), Y('– Brigada.'), Y('– Sargento Primero.'), Y('– Sargento.')] },
  { t: `${KD('Categoría de cabos y guardias')}`, l: [Y('– Cabo Mayor.'), Y('– Cabo Primero.'), Y('– Cabo.'), Y('– Guardia Civil.')] },
]));

// ───────── art. 29 · tabla titulaciones (pág. 96, impresa sin fosforito) ─────────
v(A(29), cols('TITULACIONES EQUIVALENTES DE LA ENSEÑANZA DE FORMACIÓN (tabla impresa · pág. 96 · art. 29)', [
  { t: KD('CABOS Y GUARDIAS'), l: [`${Y('Formación profesional')} ${P('grado medio')}`, `${Y('Técnico')} Formación Profesional`] },
  { t: KD('SUBOFICIALES'), l: [`${Y('Formación Profesional')} ${P('grado superior')}`, `${Y('Técnico Superior')} Formación Profesional`] },
  { t: KD('OFICIALES'), l: [`${Y('Grado')} Universitario`] },
]));

// ───────── arts. 39-40 · quién crea los centros docentes (pág. 101, impreso sin fosforito) ─────────
v(A(39), grid('CENTROS DOCENTES: QUIÉN LOS CREA (cuadro impreso · pág. 101 · arts. 39-40)', '▦', ['CENTROS', 'CREADOS POR'], [
  [KD('CENTROS DOCENTES DE FORMACIÓN'), `${Y('Creados por el')} ${G('GOBIERNO')}.`],
  [KD('CENTROS DE PERFECCIONAMIENTO Y CENTROS DE ALTOS ESTUDIOS PROFESIONALES'), `Se crearán por el ${G('MINISTRO DE DEFENSA')} o por el ${G('MINISTRO DEL INTERIOR')}, según la naturaleza de la materia, teniendo en cuenta el ${Y('informe del otro Ministerio')}.`],
]));

// ───────── art. 44 · finalidades de los planes de estudios (pág. 103) ─────────
v(A(44), cols('FINALIDADES DE LOS PLANES DE ESTUDIOS (recuadro a-e · pág. 103 · art. 44)', [
  { t: `Los planes de estudios correspondientes a la enseñanza de formación se ajustarán a las siguientes ${D('finalidades:')}`, l: [
    `a) ${KY('Conocer y asumir')} los ${KY('principios y valores constitucionales')}, contemplando la ${Y('pluralidad cultural')} de España, y el respeto a la ${Y('igualdad de derechos fundamentales')}${O('y')} ${Y('libertades públicas')} ${O('y')}, en particular, el principio de ${Y('igualdad de trato')}${O('y')} ${K('no')} ${Y('discriminación')} por razón de sexo, origen racial o étnico, religión o ideología, orientación o identidad sexual, edad, discapacidad, o cualquier otra condición o circunstancia personal o social${O('y')} el ${Y('principio de igualdad de oportunidades entre mujeres y hombres')}.`,
    `b) ${KY('Promover los valores y código de conducta')} de la Guardia Civil.`,
    `c) ${KY('Garantizar la formación integral')}${O('y')} el ${KY('pleno desarrollo de la personalidad')}.`,
    `d) ${KY('Proporcionar la formación requerida')} para el ejercicio profesional en cada ${Y('escala')}.`,
    `e) ${Y('Facilitar')}, en su caso, la ${KY('obtención de títulos')} del Sistema Educativo Español.`] },
]) + pie(`Encima del título del art. 44, a boli: «${nota('Ver art 28 y 42')}».`));

// ───────── art. 45 · esquema APROBACIÓN DE LOS PLANES DE ESTUDIOS (pág. 104, impreso) ─────────
v(A(45), cols('APROBACIÓN DE LOS PLANES DE ESTUDIOS (esquema impreso · pág. 104 · art. 45)', [
  { t: `${KD('Determinación de directrices generales')}`, l: [
    `${D('Propuesta conjunta')} del: • ${G('Ministro de Defensa')} + • ${G('Ministro del Interior')}`,
    `${D('Previo informe favorable')} del: • ${G('Ministerio de Educación, Cultura y Deporte')}`,
    `↓ ${G('CONSEJO DE MINISTROS')}: ${D('Determinará las directrices generales de los planes de estudios')} que deban cursarse para permitir la ${Y('<b>obtención de las equivalencias</b>')} a los títulos de ${Y('<b>técnico y técnico Superior</b>')}`] },
  { t: `${KD('Aprobación de planes de estudios')}`, l: [
    `Corresponde ${Y('<b>conjuntamente</b>')} a los ${G('ministros de DEFENSA y del INTERIOR')}: ${D('Aprobación de los planes de estudios')} de las enseñanzas de`,
    `• ${Y('Formación para el acceso a las escalas de:')} ○ Suboficiales, ○ Cabos y Guardias`,
    `• ${Y('Formación militar, de cuerpo de seguridad y técnica')} de la de oficiales`,
    `${D('Determinarán las titulaciones de Grado')} que hayan de cursarse en la enseñanza de la Guardia Civil para el acceso a la escala de oficiales, teniendo en cuenta: • La ${Y('definición de capacidades')} y • El ${Y('diseño de perfiles')} para el ejercicio profesional.`] },
]) + flujo('APROBACIÓN DE PLANES DE ESTUDIOS PARA OBTENER TÍTULOS OFICIALES UNIVERSITARIOS (pág. 104 · art. 45)', [
  { t: `Aprobación de ${D('planes de estudios')} para obtener ${D('títulos oficiales universitarios')}` },
  { t: `Se aprobarán e implantarán conforme a la ${Y('normativa específica')} del ${KD('SISTEMA UNIVERSITARIO ESPAÑOL')}` },
]));

// ───────── art. 48.1 · motivos de pérdida de la condición de alumno (pág. 105) ─────────
v(A(48), cols('MOTIVOS DE BAJA DE UN ALUMNO (recuadro a-h · pág. 105 · art. 48.1)', [
  { t: `Se podrá acordar la ${Y('baja de un alumno')} de la enseñanza de formación por los siguientes ${Y('motivos:')}`, l: [
    `a) A ${KY('petición propia')}. En este caso, ${G('el Ministro del Interior')} determinará los supuestos en los que se deba ${D('resarcir')} económicamente al Estado y establecerá las cantidades, teniendo en cuenta el ${Y('coste de la formación')} recibida en la estructura docente de la Guardia Civil,${O('o')} en su caso, en la de las Fuerzas Armadas, siempre que ésta ${P('sea superior a dos años')}.`,
    `b) Por ${Y('insuficiencia de las')} ${KY('condiciones psicofísicas')} que para los alumnos se hayan establecido.`,
    `c) Por ${O('no')} ${KY('superar')}, dentro de los ${Y('plazos fijados')}, las ${KY('pruebas y materias')} previstas en los ${Y('planes de estudios')} correspondientes.`,
    `${AS} d) Por ${KY('carencia de las cualidades profesionales')} en relación a los principios, valores y código de conducta a los que se refiere el artículo 44, párrafos a) y b), acreditadas con la ${Y('obtención')}, en ${O('dos')} ocasiones, de una ${D('calificación negativa')} en las evaluaciones periódicas que a este efecto se realicen, de acuerdo con el procedimiento que ${Y('se establezca')} en las normas de ${Y('régimen interior')} de los centros docentes de formación.`,
    `e) Por imposición de ${KY('sanción disciplinaria')} por ${Y('<b>falta grave o muy grave</b>')} de acuerdo con lo dispuesto en la ${KY('Ley Orgánica 12/2007, de 22 de octubre')}.`,
    `f) Por ${KY('sentencia')} condenatoria por ${KY('delito')} ${Y('<b>doloso</b>')}, teniendo en consideración el ${Y('tipo de delito')}${O('y')} la pena impuesta, ${Y('<b>previa tramitación de un expediente administrativo</b>')} con audiencia del interesado.`,
    `g) Por ${KY('pérdida de la nacionalidad')} española.`,
    `h) Por ${KY('incumplimiento')}, en contra de lo ${Y('declarado')} por el interesado${O('o')} ${Y('pérdida')} después de la declaración, de las ${KY('condiciones')} que establece el ${Y('artículo 33')} para optar a la convocatoria para el ingreso en el correspondiente centro docente de formación.`] },
]) + pie(`Notas a boli junto al recuadro: ${nota('✱')} junto a d); flechas rojas hacia a) («sea superior a dos años») y hacia d).`));

// ───────── arts. 53-54 · historial profesional (pág. 108) ─────────
v(A(53), cols('HISTORIAL PROFESIONAL: DOCUMENTOS (recuadro R42 · pág. 108 · art. 53.1)', [
  { t: `Las ${Y('vicisitudes profesionales')} del guardia civil quedarán reflejadas en su ${Y('historial profesional individual')}, de ${KY('uso confidencial')}, que constará de los siguientes documentos:`, l: [
    `a) ${KY('Hoja de servicios')}.`, `b) ${KY('Colección de informes personales')}.`, `c) ${KY('Expediente académico')}.`, `d) ${KY('Expediente de aptitud psicofísica')}.`] },
]));
v(A(54), cols('CONTENIDO DE LA HOJA DE SERVICIOS (recuadro con signos a boli · pág. 108 · art. 54.1)', [
  { t: `La hoja de servicios es el ${Y('documento')} ${D('<b>objetivo</b>')}, en soporte ${D('informático')}, en el que se exponen los ${KY('hechos y circunstancias')} de cada guardia civil desde su incorporación al Cuerpo. ${Y('Incluye:')}`, l: [
    `• los ${KY('ascensos')}. ${nota('+')}`, `• ${KY('destinos')}, ${nota('+')}`, `• la descripción de los ${KY('hechos notables')} y ${KY('actos meritorios')}, ${nota('+')}`,
    `• las ${KY('recompensas y felicitaciones')} personales o colectivas, ${nota('+')}`, `• las ${KY('situaciones administrativas')}, ${nota('~')}`,
    `• así como los ${KY('delitos o faltas')}${O('y')} ${nota('−')}`, `• las ${KY('penas o sanciones')} correspondientes que${O('no')} hayan sido ${KY('canceladas')}. ${nota('−')}`] },
]));

// ───────── art. 55.1 · cualidades del informe personal (pág. 109) ─────────
v(A(55), cols('INFORME PERSONAL DE CALIFICACIÓN: QUÉ PERMITE APRECIAR (recuadro · pág. 109 · art. 55.1)', [
  { t: `El informe personal de calificación (${D('IPECGUCI')}) es la valoración ${D('<b>objetiva e imparcial</b>')} de unos conceptos predeterminados que permitan ${Y('apreciar:')}`, l: [
    Y('• las cualidades,'), Y('• méritos,'), Y('• aptitudes,'), `${Y('• competencia')}${O('y')}`, Y('• el desempeño profesional de los guardias civiles.')] },
]) + pie(`A boli junto al recuadro: ${nota('Me gusta AC/DC')} (méritos, aptitudes, competencia, desempeño, cualidades).`));

// ───────── arts. 52-58 · esquema resumen carrera / historial / hoja / informes / expedientes (pág. 110, impreso) ─────────
v(A(57), cols('CARRERA PROFESIONAL · HISTORIAL · HOJA DE SERVICIOS (esquema resumen impreso 1/2 · pág. 110 · arts. 52-58)', [
  { t: KD('CARRERA PROFESIONAL'), l: [`La ${D('carrera profesional')} en el Cuerpo de la Guardia Civil queda definida por`, `• el ${Y('ascenso')} a los sucesivos empleos,`, `• la ocupación de diferentes ${Y('destinos')} y`, `• la progresiva ${Y('capacitación')} para asumir puestos de mayor responsabilidad,`, `combinando ${Y('formación y experiencia profesional')} en el desempeño de los cometidos del Cuerpo y en el ejercicio de las facultades de su escala.`] },
  { t: KD('HISTORIAL PROFESIONAL'), l: [`Las ${D('<b>vicisitudes profesionales</b>')} del guardia civil quedarán reflejadas en su historial profesional ${D('<b>individual</b>')}, de uso ${D('<b>confidencial</b>')}, que constará de los siguientes documentos:`, `a) Hoja de servicios.`, `b) Colección de informes personales.`, `c) Expediente académico.`, `d) Expediente de aptitud psicofísica.`] },
  { t: KD('HOJA DE SERVICIOS'), l: [`La hoja de servicios es el ${D('<b>documento objetivo</b>')}, en soporte informático, en el que se exponen`, `• los hechos y`, `• circunstancias de cada guardia civil desde su incorporación al Cuerpo.`, `<u>Incluye:</u>`, `• los ascensos,`, `• destinos,`, `• la descripción de los hechos notables y`, `• actos meritorios,`, `• las recompensas y felicitaciones personales o colectivas,`, `• las situaciones administrativas,`, `• así como los delitos o faltas y las penas o sanciones correspondientes que ${K('no')} hayan sido canceladas.`] },
]) + cols('INFORMES · EXPEDIENTES (esquema resumen impreso 2/2 · pág. 110 · arts. 55-57)', [
  { t: KD('EXPEDIENTE ACADÉMICO'), l: [`En el expediente académico constarán:`, `• las calificaciones académicas,`, `• certificaciones y`, `• acreditaciones de los títulos obtenidos y`, `• estudios realizados en el sistema de enseñanza de la Guardia Civil,`, `• los títulos o estudios del Sistema Educativo Español,`, `• los declarados equivalentes u homologados por el Ministerio de Educación, Cultura y Deporte y`, `• aquellos títulos o certificados de estudios profesionales expedidos por los órganos competentes de las Administraciones Públicas.`] },
  { t: KD('INFORMES PERSONALES'), l: [`El informe personal de calificación es la valoración ${D('<b>objetiva e imparcial</b>')} de unos conceptos predeterminados que permitan apreciar:`, `• las cualidades,`, `• méritos,`, `• aptitudes,`, `• competencia y`, `• el desempeño profesional de los guardias civiles.`] },
  { t: KD('EXPEDIENTE DE APTITUD PSICOFÍSICA'), l: [`En el expediente de aptitud psicofísica figurarán los resultados de los ${D('<b>reconocimientos médicos</b>')} y de las ${D('<b>pruebas psicológicas y físicas</b>')} que se realicen, con el contenido y periodicidad que se establezca reglamentariamente según el ${D('<b>empleo, escala, edad y circunstancias personales</b>')}. Estos reconocimientos y pruebas se podrán realizar en cualquier momento a iniciativa fundamentada`, `• del propio interesado o`, `• del jefe de su unidad, centro u organismo, que será documentada por escrito y encabezará el correspondiente expediente.`, `También figurarán todos aquellos que se realicen con objeto de determinar si existe insuficiencia de condiciones psicofísicas, a los efectos establecidos en la presente Ley.`] },
]));

// ───────── art. 59 · finalidad de las evaluaciones (pág. 111) ─────────
v(A(59), cols('FINALIDAD DE LAS EVALUACIONES (recuadro a-d · pág. 111 · art. 59)', [
  { t: `Los guardias civiles ${KY('serán evaluados')} ${Y('para determinar:')}`, l: [
    `a) La ${D('<b>aptitud</b>')} para el ${KY('ascenso')} al empleo superior.`, `b) La ${KY('selección')} de un número limitado de ${KY('asistentes a los cursos')} en que así se establezca.`,
    `c) La ${KY('insuficiencia')} de ${Y('<b>facultades profesionales</b>')}.`, `d) La ${KY('insuficiencia')} de ${Y('<b>condiciones</b>')} psicofísicas.`] },
]) + pie(`A boli: ${nota('ISA')} (Insuficiencia, Selección, Aptitud).`));

// ───────── art. 60 · documentación de las evaluaciones (pág. 111) ─────────
v(A(60), cols('DOCUMENTACIÓN CONSIDERADA EN CADA EVALUACIÓN (recuadro a-d · pág. 111 · art. 60)', [
  { t: `En cada evaluación se analizarán ... ${Y('considerando la siguiente documentación:')}`, l: [
    `a) El ${KY('<b>historial profesional</b>')}${O('6')}.`, `b) La ${KY('información complementaria')} aportada por el interesado a ${Y('iniciativa propia')} sobre su actuación profesional, que fuera de ${Y('interés')} y pudiera ${O('no')} estar reflejada en su historial profesional.`,
    `c) Las ${KY('certificaciones')} a que se refiere la Ley Orgánica 12/2007, de 22 de octubre.`, `d) Cualquier ${KY('otro informe complementario')} que estime oportuno el ${Y('órgano de evaluación')}.`] },
]) + pie(`Nota al pie 6 (subrayada en amarillo): «${nota('IMPORTANTE: No la hoja de servicios')}».`));

// ───────── art. 61.1 · órganos de evaluación (pág. 111) ─────────
v(A(61), cols('ÓRGANOS DE EVALUACIÓN (recuadro R45 · pág. 111 · art. 61.1)', [
  { t: `Las ${Y('evaluaciones')} que se definen en esta Ley ${Y('serán realizadas')}, de acuerdo con lo previsto en ella, por:`, l: [`• ${G('<b>el Consejo Superior de la Guardia Civil</b>')}${O('o')}`, `• por ${G('<b>las Juntas de Evaluación</b>')} que se constituyan.`] },
]));

// ───────── art. 62.2 · principios del ascenso (pág. 112) ─────────
v(A(62), cols('PRINCIPIOS DEL ASCENSO (recuadro R46 · pág. 112 · art. 62.2)', [
  { t: `Los ascensos se producirán al ${Y('empleo inmediato superior')}, ${Y('<b>con ocasión de vacante</b>')} ... y de acuerdo con los ${Y('principios de:')}`, l: [Y('• OBJETIVIDAD'), Y('• IGUALDAD DE OPORTUNIDADES'), Y('• MÉRITO'), Y('• CAPACIDAD')] },
]) + pie(`A boli: ${nota('Me CaIGO')} (Mérito, Capacidad, Igualdad, Objetividad). En el apdo. 1: ${nota('Planificación recursos humanos = Objetivo')}.`));

// ───────── art. 63.1 · sistemas de ascenso (pág. 112) ─────────
v(A(63), cols('SISTEMAS DE ASCENSO (recuadro R47 · pág. 112 · art. 63.1)', [
  { t: `Los ${D('sistemas de ascenso')} son los siguientes:`, l: [`a) ${Y('Antigüedad.')}`, `b) Concurso-oposición.`, `c) ${Y('Clasificación.')}`, `d) ${Y('Elección.')}`] },
]));

// ───────── art. 64 · SISTEMAS DE ASCENSO por empleos (pág. 113) ─────────
v(A(64), cols('SISTEMAS DE ASCENSO POR EMPLEOS (esquema con llaves · pág. 113 · arts. 64-65)', [
  { t: KD('ANTIGÜEDAD'), l: [`➜ ${Y('Capitán')}`, `➜ ${Y('Sargento primero')}`, `➜ ${Y('Cabo primero')}`] },
  { t: `<mark class="m-destacable">CONCURSO-OPOSICIÓN</mark>`, l: [`➜ <mark class="m-destacable">Cabo</mark> ${AS}`] },
  { t: KD('CLASIFICACIÓN'), l: [`➜ ${Y('Teniente Coronel')}`, `➜ ${Y('Comandante')}`, `➜ ${Y('Subteniente')}`, `➜ ${Y('Brigada')}`] },
  { t: KD('ELECCIÓN'), l: [`➜ ${G('Oficiales Generales')}`, `➜ ${G('Coronel')}`, `➜ ${G('Suboficial mayor')}`, `➜ ${G('Cabo mayor')}`] },
]) + pie(`Tuyo en el cuadro impreso: el salmón sobre «CONCURSO-OPOSICIÓN» y «Cabo», el ✱ rojo y la raya salmón a la derecha; el resto de colores va por método. A boli bajo el esquema: ${nota('✱ Sgto y Tte: Promoción')}. En el título del art. 65: «Ver punto 4».`));

// ───────── art. 68 · Junta -> Consejo Superior -> Director General (pág. 115, impreso) ─────────
v(A(68), flujo('EVALUACIÓN POR CLASIFICACIÓN: JUNTA → CONSEJO SUPERIOR → DIRECTOR GENERAL (esquema impreso · pág. 115 · art. 68)', [
  { t: `${G('JUNTA DE EVALUACIÓN')} (${D('Realiza la evaluación')})` },
  { t: `${G('CONSEJO SUPERIOR GC')} (${D('Informa')})` },
  { t: `${G('DIRECTOR GENERAL GC')}: - Hace su ${D('propia valoración')} - ${D('Declara la aptitud o no aptitud')} - ${D('Aprueba su orden de clasificación')}` },
]) + pie(`Nota al pie 7 (impresa): «IMPORTANTE diferenciar que en el ascenso por clasificación se tienen que reunir las condiciones ${P('ANTES DEL CICLO DE ASCENSOS')} y en el ascenso por elección ${P('DURANTE EL CICLO DE ASCENSOS')}».`)
  + pie(`A boli (art. 67.2): ${nota('La única evaluación que hace el C. Superior')} · junto al art. 68: ${nota('Clasificación y Antigüedad DGGC')}.`));

// ───────── art. 69 · Junta -> Director General (pág. 116, impreso) ─────────
v(A(69), flujo('EVALUACIÓN POR ANTIGÜEDAD: JUNTA → DIRECTOR GENERAL (esquema impreso · pág. 116 · art. 69)', [
  { t: `${G('JUNTA DE EVALUACIÓN')} (${D('Realiza la evaluación')})` },
  { t: `${G('DIRECTOR GENERAL DE LA GC')}: ${D('Declara la aptitud o no aptitud')} de los evaluados` },
]));

// ───────── art. 73 · CONCESIÓN DE LOS ASCENSOS (pág. 118, tu fosforito parcial) ─────────
v(A(73), cols('CONCESIÓN DE LOS ASCENSOS (cuadro de 3 columnas · pág. 118 · art. 73)', [
  { t: G('CONSEJO DE MINISTROS'), l: [
    `Los ${Y('ascensos')} a los empleos de la categoría de ${Y('oficiales generales')} se concederán por:`,
    `➜ <mark class="m-destacable">real decreto</mark> acordado en ${G('Consejo de Ministros')}`,
    `• ${Y('<b>a propuesta</b>')} del ${G('Ministro de Defensa')} ${Y('quien para efectuarla')} - ${Y('<b>oirá</b>')} al ${G('Ministro del Interior')}`,
    `En los ascensos al empleo de General de Brigada, además ${nota('Consejo Superior')}`,
    `➜ ${Y('se valorarán las evaluaciones')} reguladas en el artículo 67, y`, `➜ ${Y('se tendrá en cuenta la idoneidad')} para ocupar los cargos o puestos vacantes a los que deban acceder los ascendidos.`] },
  { t: G('MINISTRO DE DEFENSA'), l: [
    `${Y('La concesión del ascenso')} al empleo de: ${nota('Elección')}`, `➜ ${Y('Coronel')}`, `➜ ${Y('Suboficial mayor y')}`, `➜ ${Y('Cabo mayor')}`,
    `Es competencia del:`, `• ${G('Ministro de Defensa, a propuesta del')}`, `- ${G('Director General de la Guardia Civil')}, ${G('de acuerdo con lo previsto en el artículo 67')}`] },
  { t: G('DIRECTOR GENERAL G.C.'), l: [`${Y('Los ascensos')} por los sistemas de:`, `• ${Y('clasificación')}`, `• ${Y('antigüedad y')}`, `• ${Y('concurso-oposición')}`, `serán concedidos por:`, `➜ ${G('el Director General de la Guardia Civil.')}`] },
]));

// ───────── art. 80 · Secretario de Estado de Seguridad / Director General (pág. 121, impreso) ─────────
v(A(80), cols('ASIGNACIÓN DE DESTINOS DE LIBRE DESIGNACIÓN (cuadro impreso · R49 · pág. 121 · art. 80)', [
  { t: G('SECRETARIO DE ESTADO DE SEGURIDAD'), l: [`• La asignación de los destinos de ${D('libre designación')} que correspondan a puestos de ${Y('mando o dirección')} que determine el ${G('Ministro del Interior')}.`] },
  { t: G('DIRECTOR GENERAL DE LA GC'), l: [`• ${Y('El resto.')}`] },
]) + pie(`A boli junto al apdo. 2: ${nota('El único del S.E.S.')}`));

// ───────── art. 83 · REVOCACIÓN DE DESTINOS (pág. 122, impreso) ─────────
v(A(83), cols('REVOCACIÓN DE DESTINOS (cuadro impreso · pág. 122 · art. 83)', [
  { t: KD('LIBRE DESIGNACIÓN'), l: [`• ${Y('Libremente')} por las ${G('autoridades competentes para su asignación')}.`] },
  { t: KD('CONCURSO DE MÉRITOS/ANTIGÜEDAD'), l: [`• ${G('Director General de la Guardia Civil')}, ${Y('expediente y audiencia')}.`] },
]));

// ───────── art. 87.1 · situaciones administrativas (pág. 124) ─────────
v(A(87), cols('SITUACIONES ADMINISTRATIVAS (recuadro R50 · pág. 124 · art. 87.1)', [
  { t: `Los guardias civiles ${Y('se hallarán en alguna')} de las siguientes ${D('<b>situaciones administrativas:</b>')}`, l: [
    `a) ${Y('Servicio activo.')}`, `b) ${Y('Servicios especiales.')}`, `c) ${Y('Excedencia.')}`, `d) ${Y('Suspensión de empleo.')}`, `e) ${Y('Suspensión de funciones.')}`, `f) ${Y('Reserva.')}`] },
]) + pie(`A boli junto al título del capítulo VI: «${nota('Esquema al final')}».`));

// ───────── art. 90.1 · modalidades de excedencia (pág. 125) ─────────
v(A(90), cols('MODALIDADES DE EXCEDENCIA (recuadro a-g · pág. 125 · art. 90.1)', [
  { t: `Los guardias civiles ${Y('podrán pasar')} a la situación de excedencia en las siguientes ${Y('modalidades:')}`, l: [
    `a) Excedencia ${Y('por prestación de servicios en el sector público')}.`, `b) Excedencia ${Y('<b>voluntaria</b>')} por ${KY('interés particular')}.`, `c) Excedencia ${Y('<b>voluntaria</b>')} por ${KY('agrupación familiar')}.`,
    `d) Excedencia ${Y('por cuidado de familiares')}.`, `e) Excedencia ${Y('por razón de violencia de género')}.`, `f) ${Y('Ingreso por acceso directo como alumno de los centros de formación')}.`, `g) Excedencia basada en la ${Y('consideración de víctima de terrorismo')}.`] },
]));

// ───────── art. 93.1 · causas de pase a reserva (pág. 131) ─────────
v(A(93), cols('CAUSAS DE PASE A RESERVA (recuadro a-d · pág. 131 · art. 93.1)', [
  { t: `Los guardias civiles ${Y('pasarán')} a la situación de reserva por las ${Y('siguientes causas:')}`, l: [
    `a) Los ${KY('oficiales generales')} pasarán a reserva al cumplir ${P('<b>cuatro años</b>')} en el empleo de ${G('<b>General de Brigada</b>')}${O('o')} ${P('<b>siete</b>')} entre los empleos de ${G('<b>General de Brigada y General de División</b>')}, ${O('o')} ${P('<b>diez</b>')} entre los anteriores${O('y')} el de ${G('<b>Teniente General</b>')}.`,
    `${AS} El ${G('<b>Teniente General, Director Adjunto Operativo</b>')} de la Guardia Civil, permanecerá en la situación de ${Y('<b>activo</b>')} ${P('mientras ostente dicho cargo')}, pasando, ${P('en el momento de su cese')}, a la situación de ${KY('<b>reserva o a retiro</b>')}, según proceda de acuerdo con lo dispuesto en la presente Ley.`,
    `Por ${Y('decisión del')} ${G('<b>Gobierno</b>')}, los oficiales generales también podrán pasar a la situación de reserva mediante ${D('<b>real decreto</b>')} acordado en ${G('Consejo de Ministros')}, ${Y('a propuesta del')} ${G('Ministro de Defensa')}, previo informe del ${G('Ministro del Interior')}.`,
    `b) Los miembros de la categoría de ${D('oficiales')} pasarán a reserva ${P('al cumplir la edad de sesenta y un años')}.`,
    `c) Los miembros de la categoría de ${D('suboficiales')} pasarán a reserva ${P('al cumplir la edad de cincuenta y ocho años')}.`,
    `d) Los miembros de la categoría de ${D('cabos y guardias')} pasarán a reserva ${P('al cumplir cincuenta y ocho años')}.`] },
]) + pie(`A boli: ${nota('+3 +3')} (4 + 3 + 3) sobre a) · «${nota('GOBIERNO: 1 Aprobar R.D. devengando de plantillas · Informar a las Cortes · 2: Creación Centros docentes de Formación')}» en el margen izquierdo.`));

// ───────── arts. 87-93 · esquema SITUACIONES ADMINISTRATIVAS (pág. 133, impreso) ─────────
v(A(93), tabla('SITUACIONES ADMINISTRATIVAS (esquema impreso · pág. 133 · arts. 87-93)', ['Situación', 'Contenido'], [
  { l: KD('SERVICIO ACTIVO'), c: 'o', h: [{ t: `Si ocupan alguno de los destinos a que se refieren los artículos 75 y 76 y ${K('no')} se encuentran en otra de las situaciones administrativas.` }, { t: `Pendientes de asignación de destino por haber cesado en el que tuvieran o por proceder de otra situación administrativa y cuando ingresen como alumnos en los centros docentes de formación, si ${K('no')} les correspondiera el pase a otra.` }] },
  { l: KD('SERVICIOS ESPECIALES'), c: 'v', h: [{ t: `${Y('Computable')} tiempo de servicios, trienios y derechos Seguridad Social.` }, { t: `Percibirán retribuciones del puesto o cargo que desempeñen y ${K('no')} como guardias civiles, sin perjuicio del derecho a percibir los trienios reconocidos.` }, { t: `${Y('Podrán ascender')} si cumplen requisitos.` }, { t: `${K('No')} sujetos al régimen general de derechos y obligaciones de los miembros del Cuerpo y R. Disciplinario, leyes penales militares cuando sean de aplicación y a la disciplinaria del Instituto.` }] },
  { l: KD('EXCEDENCIAS'), c: 'c', h: [{ t: `✱ ESQUEMA (a continuación - pág. siguiente -).` }] },
  { l: KD('SUSPENSIÓN DE EMPLEO'), c: 'o', h: [{ t: `${K('NO')} computable tiempo de servicios, trienios y derechos S.S.` }, { t: `Derecho a percibir el ${P('75 %')} de las retribuciones básicas, prestaciones familiares y pensiones de mutilación y recompensas.` }] },
  { l: KD('SUSPENSIÓN DE FUNCIONES'), c: 'v', h: [{ t: `El ${G('M. Defensa')} podrá acordar la suspensión de funciones y ${G('M. Interior')} si lleva consigo el cese en el destino.` }, { t: `Período máximo permanencia suspensión funciones es ${P('seis meses')} o la duración de la prisión preventiva.` }, { t: `${K('NO')} computable tiempo servicios, trienios y derechos S.S.` }, { t: `Derecho a percibir el ${P('100 %')} de las retribuciones básicas, prestaciones familiares y pensiones de mutilación y recompensas, salvo en el supuesto de paralización del expediente por causa.` }] },
  { l: KD('RESERVA'), c: 'c', h: [{ t: `General de Brigada: al cumplir ${P('4 años')} en el empleo.` }, { t: `Llevar ${P('7 años')} entre G. Brigada y G. División.` }, { t: `Llevar ${P('10 años')} entre G. Brigada, G. División y Tte General.` }, { t: `Categoría oficiales al cumplir ${P('sesenta y un años')}.` }, { t: `Categoría suboficiales al cumplir de ${P('cincuenta y ocho años')}.` }, { t: `Categoría cabos y guardias al cumplir ${P('cincuenta y ocho años')}.` }] },
]));

// ───────── art. 90 · esquema EXCEDENCIAS (MODALIDADES) (pág. 134, impreso) ─────────
v(A(90), tabla('EXCEDENCIAS (MODALIDADES) (esquema impreso · pág. 134 · art. 90)', ['Modalidad', 'Contenido'], [
  { l: KD('PRESTACIÓN SERVICIOS SECTOR PÚBLICO'), c: 'o', h: [{ t: `${K('No')} sujetos al régimen general de derechos y obligaciones de los miembros del Cuerpo y R. Disciplinario.` }, { t: `Podrá ascender durante los ${P('dos primeros años')}.` }, { t: `${K('NO')} devengará retribuciones, ni computable tiempo de servicios, trienios y derechos Seguridad Social.` }] },
  { l: KD('VOLUNTARIA POR INTERÉS PARTICULAR'), c: 'v', h: [{ t: `Tiempo mínimo ${P('2 años')} (no se puede volver antes).` }, { t: `${K('No')} sujetos al régimen general de derechos y obligaciones de los miembros del Cuerpo y R. Disciplinario pero podrán ascender durante los ${P('dos primeros años')}.` }, { t: `${K('NO')} devengará retribuciones, ni computable tiempo de servicios, trienios y derechos Seguridad Social.` }] },
  { l: KD('VOLUNTARIA AGRUPACIÓN FAMILIAR'), c: 'c', h: [{ t: `Tiempo mínimo de ${P('2 años')} (no se puede volver antes).` }, { t: `${K('No')} sujetos al régimen general de derechos y obligaciones de los miembros del Cuerpo y R. Disciplinario pero podrán ascender durante los ${P('dos primeros años')}.` }, { t: `${K('NO')} devengará retribuciones, ni computable tiempo de servicios, trienios y derechos Seguridad Social.` }] },
  { l: KD('CUIDADO DE FAMILIARES'), c: 'o', h: [{ t: `Hasta ${P('segundo grado')} inclusive consanguinidad o afinidad.` }, { t: `${K('No')} superior a ${P('3 años')}, a contar, si se trata del cuidado de hijos o de acogimiento, desde la fecha del nacimiento o de la resolución judicial o administrativa.` }, { t: `${K('No')} sujetos al régimen general de derechos y obligaciones de los miembros del Cuerpo y R. Disciplinario pero podrá ascender siempre que tenga cumplidas las condiciones de ascenso establecidas en esta Ley (no dice plazo).` }, { t: `${K('No')} devengarán retribuciones pero será computable a efectos de trienios y de determinación de los derechos de la Seguridad Social que correspondan, y durante el ${P('primer año')} de cada período de excedencia, como tiempo de servicios.` }, { t: `Reserva puesto de trabajo durante los ${P('2 primeros años')}.` }] },
  { l: KD('VIOLENCIA DE GÉNERO'), c: 'v', h: [{ t: `${P('6 primeros meses')} computables a efectos de tiempo de servicios, trienios, derechos Seguridad Social y reserva puesto de trabajo. (Prórrogas de ${P('3 meses')} hasta un máximo de ${P('18 meses')}).` }, { t: `${P('2 primeros meses')} derecho a percibir las retribuciones.` }, { t: `Podrá ascender durante los ${P('3 primeros años')}.` }] },
  { l: KD('ACCESO DIRECTO ALUMNO DE LOS CENTROS DE FORMACIÓN'), c: 'c', h: [{ t: `Podrá ascender durante los ${P('dos primeros años')}.` }, { t: `${K('No')} devengará retribuciones, sí computable tiempo de servicios, trienios y derechos de la Seguridad Social.` }] },
  { l: KD('VÍCTIMA DE TERRORISMO'), c: 'o', h: [{ t: `Previo reconocimiento ${G('M. Interior')} o sentencia judicial firme.` }, { t: `Mismas condiciones establecidas para el sujeto víctima de violencia de género.` }] },
]));

// ───────── art. 94 · causas de pase a retiro (pág. 135, tu fosforito) + esquema PASE A RETIRO (impreso) ─────────
v(A(94), cols('CAUSAS DE PASE A RETIRO (recuadro a-d · pág. 135 · art. 94.1)', [
  { t: `La relación de servicios profesionales con el Cuerpo de la Guardia Civil ${Y('cesa')} en virtud de retiro, que se declarará ${KY('<b>de oficio</b>')}${O('o')}, ${KY('<b>a instancia de parte</b>')}, en los siguientes supuestos:`, l: [
    `a) ${P('Al cumplir la edad de')} ${P('<b>sesenta y cinco años</b>')}, ${Y('siempre que se cumplan los requisitos')} exigidos para ello.`, `b) Con ${KY('<b>carácter voluntario</b>')}.`,
    `c) Por insuficiencia de ${KY('<b>condiciones psicofísicas</b>')} que implique ${KY('incapacidad permanente')} para el ejercicio de las funciones propias del Cuerpo.`, `d) Por insuficiencia de ${KY('<b>facultades profesionales</b>')}.`] },
]) + flujo('PASE A RETIRO (esquema impreso · pág. 135 · art. 94)', [
  { t: `${KD('PASE A RETIRO')}: Se declarará: • ${Y('De oficio')}, o en su caso, • ${Y('A instancia de parte')} en los siguientes supuestos:` },
  { bif: [
    { t: `Al cumplir la edad de ${P('65 años')}. Siempre que se cumplan los requisitos exigidos para ello` },
    { t: `Con ${Y('carácter voluntario')}` },
    { t: `Por insuficiencia de ${Y('condiciones psicofísicas')} que implique incapacidad para el ejercicio de las funciones propias del Cuerpo` },
    { t: `Quienes ingresen en los centros docentes militares de ${Y('formación')}, podrán pasar a retiro por: ${D('Incapacidad permanente')} para el ejercicio de funciones específicas del Cuerpo como consecuencia del desempeño de las actividades propias de la enseñanza` },
    { t: `Por insuficiencia de ${Y('facultades profesionales')}` }] },
  { t: `El pase a la situación de retiro por estos supuestos, se efectuará:` },
  { t: `En las condiciones y términos previstos en la legislación de: • ${G('Clases pasivas del Estado')}, o, en su caso, • En el ${G('Régimen General de la Seguridad Social')}. Según determine la normativa vigente en la materia` },
]));

// ───────── art. 95.1 · causas de pérdida de la condición de guardia civil (pág. 136) ─────────
v(A(95), cols('PÉRDIDA DE LA CONDICIÓN DE GUARDIA CIVIL (recuadro a-d · pág. 136 · art. 95.1; el JSON de lectura la daba como pág. 137)', [
  { t: `La condición de guardia civil se perderá por alguna de las ${D('causas')} siguientes:`, l: [
    `a) En virtud de ${KD('renuncia')}, con los requisitos que se establecen en el artículo siguiente.`, `b) ${Y('Pérdida de la')} ${KY('nacionalidad')} española.`,
    `c) ${KY('Pena principal o accesoria')} de ${Y('pérdida de empleo')}, de ${Y('inhabilitación absoluta')} ${O('o')} de ${Y('inhabilitación especial para empleo o cargo público')} cuando hubiere adquirido ${Y('firmeza')}.`, `d) ${KY('Sanción disciplinaria')} de ${KY('<b>separación del servicio</b>')}.`] },
]));

// ───────── art. 99 · esquema EVALUACIONES INSUFICIENCIA DE FACULTADES PROFESIONALES (pág. 138, impreso) ─────────
v(A(99), flujo('EVALUACIONES PARA DETERMINAR SI EXISTE INSUFICIENCIA DE FACULTADES PROFESIONALES (esquema impreso · pág. 138 · art. 99)', [
  { t: `${KD('INICIACIÓN')}: EL ${G('DIRECTOR GENERAL')} ${D('ordenará la iniciación del expediente')}: • Para determinar si existe ${Y('<b>insuficiencia de facultades profesionales</b>')} a efectos de: ◦ Determinar la ${Y('limitación para ocupar determinados destinos')}, o ◦ El ${Y('pase a retiro')} Como consecuencia de la declaración definitiva de ${KY('no aptitud para el ascenso')} • Como consecuencia de los ${Y('<b>informes personales</b>')} a los que se refiere el artículo 55` },
  { t: `${KD('CONSTITUCIÓN JUNTA DE EVALUACIÓN ESPECÍFICA')}: ${G('Junta de evaluación')} realiza unas ${D('conclusiones')}` },
  { t: `Son elevadas al: ${G('DIRECTOR GENERAL')}` },
  { bif: [
    { t: `Quien, previo informe del: ${G('Consejo Superior')} de la Guardia Civil` },
    { t: `${G('Consejo de la Guardia Civil')} (cuando el expediente afecte a un miembro de este Consejo)` }] },
  { t: `Presentará: Al ${G('MINISTRO DE DEFENSA')} la ${D('propuesta de resolución')} que proceda` },
]) + pie(`A boli en el apdo. 1: ${nota('IPECGUCI')} · bajo el art. 98: «${nota('Los 2 silencios administrativos de esta Ley → Negativos · Los 2 de derechos → Positivos')}».`));

// ───────── DT 7.ª · fórmula de proporcionalidad (pág. 148) ─────────
v('Disposición transitoria séptima · ' + L, cols('CRITERIOS DE PROPORCIONALIDAD · FÓRMULA (pág. 148 · DT 7.ª)', [
  { t: `${KY('<b>C= (P-0,5)/N</b>')} en la que:`, l: [
    `${Y('<b>C=</b> Coeficiente para la ordenación.')}`,
    `${Y('<b>P=</b> Número de orden que el interesado ocupa en el colectivo de procedencia')} de su escala constituido por los del ${Y('mismo empleo')} o los del ${Y('mismo empleo y antigüedad')}, según corresponda.`,
    `${Y('<b>N=</b> Número de')} ${KY('componentes del colectivo anterior')}.`,
    `A continuación, ${Y('se ordenará')} a los de las distintas procedencias ${Y('tomando los coeficientes de menor a mayor')}, resolviéndose ${Y('en caso de igualdad a favor del de mayor edad')}.`] },
]));

// ───────── NOTAS A BOLI (págs. 80, 82-83, 85-86, 91, 99, 100, 104, 115, 119, 126, 153) ─────────
v(A(3), notas('Título preliminar (pág. 80 · arts. 1-3)', `Asteriscos rojos (✱) en los arts. 1, 2 y 3.1 y numeración a boli (1, 2, ?) en el art. 3.2-3.3. Nota al pie 1 (subrayada en amarillo): «${nota('NO de perfeccionamiento, etc.')}» · art. 3.4: ${nota('orden de escalafón')}.`));
v(A(7), notas('arts. 7.1.7 y 7.1.11 (págs. 82-83)', `Art. 7.1.7: ${nota('Co Co')} · art. 7.1.11: ${nota('PRE-DE / PRE-OE')} (mnemotecnia) · nota al pie: ${nota('No aparece la Funcional')}. (Tomado de la lectura de marcas, sin releer la imagen.)`));
v(A(12), notas('arts. 12-14 (págs. 85-86)', `Art. 12 g): ${nota('Baja por Sanción Disciplinaria – Subsec. Defensa')} (con flecha desde la nota al pie 4) · art. 13: ${nota('Solo Defensa')} (tachado) · art. 14: ${nota('es órgano asesor y consultivo')}.`));
v(A(20), notas('arts. 19-20 (pág. 91)', `Arts. 19/20: ${nota('ascenso no inmediato superior')} · honorífico: ${nota('Ministros / Consejo de Ministros')}. (Tomado de la lectura de marcas, sin releer la imagen.)`));
v(A(36), notas('art. 36 (pág. 99)', `Margen: ${nota('≥ 55 %')} · ${nota('≤ 30 %')} · ${nota('Del mín 55 %')} · «${nota('Suboficiales – 2 años · Cabos 1.º – 4 años · Cabos y GC – 7 años y Cabo Mayor 0 años')}».`));
v(A(39), notas('arts. 38-39 (pág. 100)', `Art. 38.1: ${nota('Curso – Perfiles – Escala')} · art. 39.2: ${nota('Y pág 87, solo vale 3 veces')} (con flecha y ✱) · art. 39.3: ${nota('Normas Régimen Interior: Director General GC')}.`));
v(A(74), notas('art. 74 (pág. 119)', `Art. 74: ${nota('Temporal / Definitivo, 3 veces')}. (Tomado de la lectura de marcas, sin releer la imagen.)`));
v(A(90), notas('art. 90.2-90.3 (pág. 126)', `Exc. por prestación de servicios en el sector público: ${nota('Tiempo de servicio: no superior 8 años')} · ${nota('Podrá ascender: durante 2 años')} · ${nota('No computable: trienios, servicios, ni S. Social')} · ${nota('No retribuciones')}.`, `Exc. voluntaria por interés particular: ${nota('Preaviso: igual que funcionarios y siempre que no esté sujeto a procedimiento disciplinario')} · ${nota('Tiempo de servicio: no superior 12 años')} · ${nota('Mínimo 2 años')} (transcurridos, puede solicitar) · ${nota('No evaluado ascenso')} · ${nota('Podrá ascender: 2 años')} · ${nota('No retribuciones ni computa: tiempo servicio, trienios, S.S.')}. (Lectura parcial: parte de la letra a boli es ilegible.)`));
v('Disposición final segunda · ' + L, notas('DF 2.ª (pág. 153)', `DF 2.ª: ${nota('Mín 40 %, Máx 50 %')}. (Tomado de la lectura de marcas, sin releer la imagen.)`));

module.exports = V;
if (require.main === module) {
  const fs = require('fs'), path = require('path'), LL = require('../literal-lib.js');
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const key = 'T26_L29';
  let h = LL.get(s, key).html.replace(/<!--VIS26B-->[\s\S]*?<!--\/VIS26B-->/g, '');
  const ins = [];
  for (const [loc, vis] of V) {
    const k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; const hd = (h.slice(a, b).match(/articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''; if (norm(hd) === k || norm(hd).startsWith(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', loc.slice(0, 60)); continue; }
    ins.push([i, ins.length, vis]);
  }
  ins.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  for (const [i, , vis] of ins) h = h.slice(0, i) + '<!--VIS26B-->' + vis + '<!--/VIS26B-->' + h.slice(i);
  s = LL.put(s, key, h);
  fs.writeFileSync(F, s);
  console.log(`Tema 26 (B): cuadros ${V.length}, colocados ${ins.length}`);
}
