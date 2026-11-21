require('../esq-virtual.js');
// Cuadros visuales del Tema 26 (parte a): recrean los cuadros/esquemas/tablas de tu PDF subrayado
// (TEMA 26 ESTATUTO GC-2026-08-08.pdf, págs. 7-72 del PDF, 1-based: LO 11/2007 y LO 12/2007) con su texto literal.
//   Ley 11 (LO 11/2007, derechos y deberes): pág. 13 (art. 16), 15 (art. 27 ×2), 18 (art. 37), 23 (art. 52), 25 (antes del art. 56),
//        26 (art. 57) + notas a boli de la pág. 20 (arts. 43-47)
//   Ley 12 (LO 12/2007, régimen disciplinario): pág. 44 (art. 11), 46 (arts. 12-17), 48 (art. 20), 49 (arts. 21 y 22), 51 (art. 25),
//        57 (art. 46), 59 (art. 51), 62 (art. 61), 65 (art. 71), 66 (art. 72), 68 (arts. 74-78) + notas a boli de págs. 36-37 (art. 7), 53 (arts. 31-37), 54 (art. 38)
// COLORES: leídos de TU PDF (fosforito dentro del cuadro: amarillo Y, naranja/salmón D, verde G, azul-turquesa P, subrayado rojo K, círculo O, ✱) en
//   pág. 13, 15, 48, 49, 51, 57, 59, 62 y 66; el RESTO de cuadros vienen IMPRESOS sin tu fosforito (págs. 18, 23, 25, 26, 44, 46, 65, 68) y van con el MÉTODO:
//   órganos y autoridades → verde (G); plazos, cifras → azul (P); «no / salvo / únicamente» → rojo subrayado (K); conceptos clave → amarillo/naranja (Y/D).
//   Lo subrayado en negro de las fichas impresas (pág. 46) se trata como imprenta (naranja D). Las notas a boli van como «✎».
// LOCALIZADOR: v(ley, loc, html): ley 11 = LO 11/2007 · 12 = LO 12/2007; loc = cabecera de la ficha del esquema tras la que se inserta (empieza por «Artículo N · …»).
// Uso: lo consume el montador (module.exports = V = [[ley, loc, html], …]).
const { R, P, D, Y, K, X, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const KY = x => K(Y(x)), KD = x => K(D(x));
const O = x => `<span class="m-circulo">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const nota = t => `<span class="m-nota ro">${t}</span>`;
const pie = t => `<div class="vis-pie" style="font-size:.86em;opacity:.85;margin-top:6px">✎ ${t}</div>`;
const V = []; const v = (ley, loc, html) => V.push([ley, loc, html]);
const L1 = 'Derechos y deberes', L2 = 'Régimen disciplinario';
const B = 'border:1px solid rgba(128,128,128,.5);padding:5px 8px';
// tabla de rejilla (cuadros de varias columnas con celdas vacías, como los de tu temario)
const grid = (titulo, ico, cab, filas) => `<div class="vis"><div class="vis-t"><i>${ico}</i>${titulo}</div><div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.88rem;line-height:1.4">${cab ? `<thead><tr>${cab.map(c => `<th style="${B};background:rgba(128,128,128,.22);text-align:left">${X(c)}</th>`).join('')}</tr></thead>` : ''}<tbody>${filas.map(f => `<tr>${f.map(c => c === '' ? `<td style="${B};background:rgba(128,128,128,.12)"></td>` : `<td style="${B};vertical-align:top">${X(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;

// ───────── LO 11/2007 · art. 16 · R3 (pág. 13) ─────────
v(11, `Artículo 16 · ${L1}`, cols('JERARQUÍA, DISCIPLINA Y SUBORDINACIÓN (cuadro R3 · pág. 13 · art. 16)', [
  { t: `${Y('deberán')} ${Y('adecuar su')} ${Y('<b>actuación profesional</b>')} a los ${Y('<b>principios</b>')} de:`, l: [`${Y('JERARQUÍA,')}`, `${Y('DISCIPLINA')} y`, `${Y('SUBORDINACIÓN')}`] },
]));

// ───────── LO 11/2007 · art. 27 · R4 (pág. 15): dos cuadros ─────────
v(11, `Artículo 27 · ${L1}`, cols('CARRERA PROFESIONAL (cuadro R4 · pág. 15 · art. 27)', [
  { t: `Los Guardias Civiles tienen ${KY('derecho')} al ${Y('desarrollo')} de su carrera profesional, ${KY('especialmente')} al ${Y('<b>régimen de:</b>')}`, l: [Y('ascensos,'), Y('destinos,'), `${Y('condecoraciones')}${O('y')}`, Y('recompensas,')] },
]));
v(11, `Artículo 27 · ${L1}`, cols('PRINCIPIOS DE LA CARRERA PROFESIONAL (cuadro R4 · pág. 15 · art. 27)', [
  { t: `${Y('De acuerdo con los')} ${D('principios')} ${Y('de:')}`, l: [Y('igualdad,'), Y('mérito,'), `${Y('capacidad')}${O('y')}`, `➜ ${Y('De conformidad con las normas que la regulen.')}`] },
]));

// ───────── LO 11/2007 · art. 37 · RÉGIMEN ECONÓMICO (pág. 18, sello EXAMEN) ─────────
v(11, `Artículo 37 · ${L1}`, cols('RÉGIMEN ECONÓMICO DE LAS ASOCIACIONES (cuadro del temario · sello EXAMEN · pág. 18 · art. 37)', [
  { t: `${KD('RÉGIMEN ECONÓMICO')}`, l: [
    `Podrán ${D('financiarse')} a través de las ${Y('cuotas de sus afiliados')}`,
    `${K('No')} ${Y('donaciones privadas')}`,
    `${Y('Subvenciones públicas')} con cargo a los ${G('Presupuestos Generales del Estado')}`,
    `Régimen económico sometido a los ${D('principios')} de: ${Y('TRANSPARENCIA')} · ${Y('PUBLICIDAD')}`,
  ] },
]));

// ───────── LO 11/2007 · art. 52 · CONSEJO (pág. 23, R9) ─────────
v(11, `Artículo 52 · ${L1}`, tabla('CONSEJO DE LA GUARDIA CIVIL (cuadro del temario · pág. 23 · art. 52 · R9)', ['Concepto', 'Contenido'], [
  { l: `${KD('PRESIDENCIA')}`, c: 'o', h: [{ t: `${G('Ministro del Interior')} o persona en quien delegue` }] },
  { l: `${KD('COMPOSICIÓN')}`, c: 'v', h: [{ t: `${D('Órgano colegiado')}, con la participación de ${Y('representantes')} de miembros de la GC y ${G('Ministerio de Interior')} y de ${G('Defensa')}` }] },
  { l: `${KD('FIN')}`, c: 'c', h: [{ t: `${D('Mejorar')} las condiciones profesionales de sus integrantes` }, { t: `${D('Mejorar')} el funcionamiento del Instituto` }] },
]));

// ───────── LO 11/2007 · SESIONES DEL CONSEJO (pág. 25, antes del art. 56) ─────────
v(11, `Artículo 55 · ${L1}`, cols('SESIONES DEL CONSEJO (esquema con llave · pág. 25 · antes del art. 56)', [
  { t: KD('ORDINARIAS'), l: [`Para el ${Y('despacho de asuntos')} de su competencia`, `Al menos ${P('una vez cada 3 meses')}`] },
  { t: KD('EXTRAORDINARIAS') + ` ${nota('del Presidente')}`, l: [`A ${Y('iniciativa propia')} o`, `A solicitud de ${P('1/3 parte')} de los ${G('vocales')}`] },
]) + pie('A boli, junto a «EXTRAORDINARIAS»: «del Presidente».'));

// ───────── LO 11/2007 · art. 57 · DERECHOS DE LOS MIEMBROS DEL CONSEJO (pág. 26) ─────────
v(11, `Artículo 57 · ${L1}`, flujo('DERECHOS DE LOS MIEMBROS DEL CONSEJO DE LA GUARDIA CIVIL (diagrama de 4 cajas con flechas · pág. 26 · art. 57)', [
  { et: '1 →', t: `${Y('Libre circulación')} por las dependencias de su unidad electoral` },
  { et: '2 ↓', t: `${Y('Libre distribución de publicaciones')} profesionales o asociativas` },
  { et: '3 ←', t: `${Y('Acumulación')} en un miembro candidatura de ${P('créditos de tiempo, horas mensuales')} y permisos, previa comunicación ${G('DGGC')}` },
  { et: '4', t: `${K('No')} ${Y('discriminación')} en su promoción profesional en razón de su representación` },
]) + pie(`<b>Ver:</b> Art. 38 y 42 – Derechos Asoc. Profesionales · Art. 44 – Derechos Asoc. Profesionales Representativas · Art. 54 – Funciones del Consejo G.C.`) + pie(`<b>Representantes y Vocales:</b> Art. 45 – Derechos Representantes de Asoc. Representativas · Art. 47 – Derechos de los Vocales del Consejo G.C.`));

// ───────── LO 11/2007 · notas a boli arts. 43-47 (págs. 20-21) ─────────
v(11, `Artículo 47 · ${L1}`, `<div class="vis"><div class="vis-t"><i>✎</i>NOTAS A BOLI · asociaciones representativas y no representativas (págs. 20-21 · arts. 43-47)</div>` +
  pie(`Art. 43 (R7): ${nota('1 Rpte o 2 Escalas')} · ${nota('10 % votos')} · ${nota('Ver Art. 38')} (junto al art. 44) · ${nota('Ver Art. 8 y 47')} (junto al art. 45).`) +
  pie(`${nota('Art. 8 GC · Comunica')} · ${nota('Art. 45 Asoc. Rep. · Comunicación')} · ${nota('Art. 47 Asoc. No Rep. · Solicitud · Mín. 72 h · Silencio positivo')}.`) +
  pie(`Junto al art. 47: «(Asoc. No Representativas)» y, bajo el art. 46: «No pone "Representativas"». Pág. 21 (arts. 47.2-49): ${nota('Silencio positivo')} · ${nota('Representantes a partir del día siguiente a la inscripción')} · ${nota('Asociados')} · ${nota('Funcionamiento')}.`) + `</div>`);

// ───────── LO 12/2007 · notas a boli art. 7 (págs. 36-37) ─────────
v(12, `Artículo 7 · ${L2}`, `<div class="vis"><div class="vis-t"><i>✎</i>NOTAS A BOLI · faltas muy graves (págs. 36-37 · art. 7)</div>` +
  pie(`Apdo. 1: ${nota('G.1')} · Apdos. 2, 3 y 3 bis: ${nota('Siempre M.G. salvo 21 bis G')} · Apdo. 4: ${nota('Siempre M.G.')} · Apdo. 6: ${nota('Es único')}.`) +
  pie(`Apdo. 7: ${nota('Grave 2 – Abuso de autoridad')} · Apdo. 8: ${nota('Siempre M.G.')} · Apdo. 9: ${nota('Único')} · Apdo. 11: ${nota('Sitio = Delito Militar')} · Apdo. 12: ${nota('+ Leve 2 y 4')} · Apdo. 14: ${nota('Único')}.`) +
  pie(`Apdo. 15: ${nota('6.6 Grave desconsideración · L1, 15 y 18')} · Apdos. 16-17: ${nota('L5 Indiscreción · G25 Info. Conc. Oficial · G8 Violación secreto profesional')} · Apdo. 19: ${nota('Siempre M.G.')} · Apdos. 19-21: ${nota('Videocámaras M.G. · G')} · ${nota('G19 – Conservar grabaciones lícitamente efectuadas fuera de los casos permitidos')}.`) + `</div>`);

// ───────── LO 12/2007 · art. 11 · SANCIONES (pág. 44, tic rojo) ─────────
v(12, `Artículo 11 · ${L2}`, grid('SANCIONES DISCIPLINARIAS (tabla de 3 columnas · pág. 44 · arts. 11-12 · <span style="color:#d1332a">✓</span> tic rojo)', '▦', ['POR FALTAS MUY GRAVES', 'POR FALTAS GRAVES', 'POR FALTAS LEVES'], [
  [`➜ ${KD('Separación del servicio')}`, '', ''],
  [`➜ ${D('Suspensión de empleo')}<br>Desde ${P('3 meses y 1 día')} hasta un máximo de ${P('6 años')}<br><br>➜ ${D('Pérdida de puestos en el escalafón')}<br>(${K('No')} podrá ser superior a ${P('1/5')} ni inferior a ${P('1/10')}, del número de los componentes de su empleo)`, `➜ ${D('Suspensión de empleo')}<br>De ${P('1 mes a 3 meses')}.`, ''],
  ['', `➜ ${D('Pérdida de')} ${P('5 a 20 días')} ${D('de haberes')}.<br>- Con suspensión de funciones (máximo ${P('3 meses')}).`, `➜ ${D('Pérdida de')} ${P('1 a 4 días')} ${D('de haberes')}.<br>- Con suspensión de funciones (máximo ${P('3 meses')}).`],
  ['', `➜ ${D('Pérdida de destino')}.`, ''],
  ['', '', `➜ ${D('Reprensión')}`],
]));

// ───────── LO 12/2007 · arts. 12-17 · SEIS FICHAS (pág. 46) ─────────
v(12, `Artículo 17 · ${L2}`, cols('SEIS FICHAS RESUMEN DE LAS SANCIONES (1/2 · pág. 46 · arts. 12-14)', [
  { t: KD('SEPARACIÓN DEL SERVICIO'), l: [`La separación del servicio ${D('supondrá')} para el sancionado la ${D('pérdida de la condición de militar de carrera')} de la Guardia Civil`, `▸ ${D('perdiendo')} los derechos profesionales adquiridos ${K('excepto')} los ${Y('derechos pasivos')} que hubiese consolidado.`] },
  { t: KD('SUSPENSIÓN DE EMPLEO'), l: [
    `1. La sanción de suspensión de empleo implicará el ${D('pase a la situación administrativa del mismo nombre')} con los efectos económicos inherentes a dicha situación y ${Y('privará al interesado de todas las funciones propias')} de éste por el período que se determine.`,
    `2. También producirá el efecto de ${Y('quedar inmovilizado')} el infractor en su ${Y('puesto y empleo')} que ocupe, y el tiempo transcurrido ${KD('no será de abono para el servicio')}.`,
    `3. Concluida la suspensión, ${Y('finalizará')} la inmovilización en el empleo y la pérdida de puestos será ${Y('definitiva')}.`,
    `4. Cuando la sanción de suspensión de empleo tenga una duración ${P('superior a seis meses')}, ${D('determinará el cese en el destino')} que venía ocupando el infractor, así como la imposibilidad de obtener otro, durante un período de ${P('dos años')}, en la ${D('misma Unidad o especialidad')} que determine la resolución sancionadora.`] },
  { t: KD('PÉRDIDA DE PUESTOS EN EL ESCALAFÓN'), l: [`La pérdida de puestos en el escalafón supondrá para el sancionado el ${Y('retraso en el orden de escalafonamiento')}, ${D('dentro de su empleo')}, del número de puestos que se determine en la resolución del expediente que, ${KY('en ningún caso')}, podrá ser ${P('superior a un quinto')} ni ${P('inferior a un décimo')}, del número de los componentes de su empleo.`] },
]) + cols('SEIS FICHAS RESUMEN DE LAS SANCIONES (2/2 · pág. 46 · arts. 15-17)', [
  { t: KD('PÉRDIDA DE DESTINO'), l: [`La sanción de pérdida de destino supone el ${Y('cese')} en el que viniera ocupando el infractor quien, durante ${P('dos años')}, ${K('no')} podrá solicitar otro en la ${D('misma Unidad o especialidad')} que determine, de manera ${Y('motivada')} y atendiendo a la relación directa con la infracción cometida, la resolución sancionadora.`] },
  { t: KD('PÉRDIDA DE HABERES CON SUSPENSIÓN DE FUNCIONES'), l: [`La pérdida de haberes con suspensión de funciones supone la ${Y('pérdida de las retribuciones')} correspondientes a los días objeto de sanción y la ${Y('suspensión de funciones')} correspondientes a los días de su duración.`] },
  { t: KD('REPRENSIÓN'), l: [`1. La reprensión es la ${Y('reprobación expresa')} que, ${D('por escrito')}, dirige al subordinado la autoridad competente para imponerla.`, `2. ${KD('No constituye sanción disciplinaria')} la advertencia o amonestación verbal que, para el mejor cumplimiento de las obligaciones y servicios, pueda hacer el superior al subordinado en el ejercicio del mando.`] },
]));

// ───────── LO 12/2007 · art. 20.1 (pág. 48) ─────────
v(12, `Artículo 20 · ${L2}`, cols('CAUSAS DE EXTINCIÓN DE LA RESPONSABILIDAD DISCIPLINARIA (recuadro · pág. 48 · art. 20.1)', [
  { t: `La responsabilidad disciplinaria ${Y('se extingue por:')}`, l: [`${Y('el')} ${KY('cumplimiento')} de la sanción,`, `por la ${KY('prescripción')} de la ${Y('falta')} o de la ${Y('sanción')}${O('y')}`, `por el ${KY('fallecimiento')} del interesado`] },
]) + pie(`Art. 20.2: ${nota('MG + 4 años = Reapertura')} (falta muy grave + no hayan transcurrido cuatro años = reapertura del procedimiento).`));

// ───────── LO 12/2007 · art. 21 · R15 (pág. 49) ─────────
v(12, `Artículo 21 · ${L2}`, cols('PRESCRIPCIÓN DE LAS FALTAS (cuadro R15 · pág. 49 · art. 21)', [
  { t: KD('LEVES'), l: [P('6 meses')] }, { t: KD('GRAVES'), l: [P('2 años')] }, { t: KD('MUY GRAVES'), l: [P('3 años')] },
]));
// ───────── LO 12/2007 · art. 22 · R16 (pág. 49) ─────────
v(12, `Artículo 22 · ${L2}`, cols('PRESCRIPCIÓN DE LAS SANCIONES (cuadro R16 · pág. 49 · art. 22)', [
  { t: KD('LEVES'), l: [P('1 año')] }, { t: KD('GRAVES'), l: [P('2 años')] }, { t: KD('MUY GRAVES'), l: [P('3 años')] },
]));

// ───────── LO 12/2007 · art. 25 · AUTORIDADES Y MANDOS / COMPETENCIA SANCIONADORA (pág. 51) ─────────
v(12, `Artículo 25 · ${L2}`, grid('AUTORIDADES Y MANDOS vs COMPETENCIA SANCIONADORA (tabla de 2 columnas · pág. 51 · arts. 25-26)', '▦', ['AUTORIDADES Y MANDOS', 'COMPETENCIA SANCIONADORA'], [
  [`➜ ${G('Ministro de Defensa')}, ${Y('a propuesta del Ministro del Interior.')}`, `• ${D('Separación del Servicio')}.`],
  [`➜ ${G('Director General de la Policía y de la Guardia Civil')}.`, `• ${D('Pérdida de destino')} y ${Y('todas las sanciones, excepto la de separación del servicio')}`],
  [`➜ ${G('Oficiales Generales')} con mando sobre Unidad, Centro u Organismo de la Guardia Civil.`, `• Sanciones por ${Y('faltas graves y leves, excepto la pérdida de destino.')}`],
  [`➜ ${G('Oficiales Jefes de Zona')}, de Servicio, Organismo, Jefatura o Dirección de Centro Docente de Formación, ${G('Comandancia, Sector')}, Grupo de Reserva y Seguridad, Jefes de Estudio de Centros Docentes de Formación y los de Unidad, Centro u Organismo de categoría similar`, `• ${Y('Todas las sanciones por faltas leves.')}`],
  [`➜ ${G('Oficiales Jefes de Compañía')}, Subsector de Tráfico, Unidad Orgánica de Policía Judicial, o Unidad de categoría similar.`, `• Pérdida de hasta ${P('2 días de haberes.')}<br>• ${Y('Reprensión.')}`],
  [`➜ ${G('Oficiales Comandantes de Puesto')}, Jefes de Destacamento de Tráfico, Grupo de Investigación o Unidad de Categoría similar.`, `• Pérdida de ${P('1 día de haberes.')}<br>• ${Y('Reprensión.')}`],
  [`➜ ${G('Suboficiales Comandantes de Puesto')}, Jefes de Destacamento de Tráfico, Grupo de Investigación o Unidad de Categoría similar.`, `• ${D('Reprensión.')}`],
]));

// ───────── LO 12/2007 · notas a boli arts. 31-37 (pág. 53) ─────────
v(12, `Artículo 37 · ${L2}`, `<div class="vis"><div class="vis-t"><i>✎</i>NOTAS A BOLI · resumen de competencias (pág. 53 · arts. 31-37)</div>` +
  pie(`${nota('34 – Vocales o suplente Consejo G.C. – DGGC')}`) + pie(`${nota('35 – Extranjero – L y G – DAO y DGGC')}`) + pie(`${nota('33 – Sin destino – DAO o Ofi. General Domicilio')}`) + pie(`${nota('31 – Baja Centro por Sanción Disciplinaria – Subsec. Defensa')}`) + `</div>`);

// ───────── LO 12/2007 · notas a boli art. 38 (pág. 54, sello EXAMEN 2020) ─────────
v(12, `Artículo 38 · ${L2}`, `<div class="vis"><div class="vis-t"><i>✎</i>NOTAS A BOLI · principios y derechos del procedimiento (pág. 54 · art. 38 · sello EXAMEN 2020)</div>` +
  pie(`Principios: ${nota('13')} · mnemotecnia ${nota('PP · CCC · IIII · TREL')} (legalidad, impulso de oficio / imparcialidad, celeridad, eficacia… / publicidad, contradicción, irretroactividad, tipicidad / responsabilidad, proporcionalidad, individualización, culpabilidad) · ✱ en eficacia, responsabilidad y culpabilidad.`) +
  pie(`Derechos: ${nota('PIDA')} (Presunción de inocencia, Información, Defensa, Audiencia).`) + `</div>`);

// ───────── LO 12/2007 · art. 46.4 · R22 (pág. 57) ─────────
v(12, `Artículo 46 · ${L2}`, cols('PRINCIPIO DE INMEDIATEZ Y DERECHO A ASISTIR (recuadro R22 · pág. 57 · art. 46.4)', [
  { t: `${AS} Las ${Y('pruebas')} que se practiquen durante la tramitación del expediente, ${Y('se llevarán a cabo')}, ${Y('en todo caso')}, ${Y('respetando:')}`, l: [`el ${D('PRINCIPIO DE INMEDIATEZ')}`, `el ${KY('DERECHO')} ${Y('DEL INTERESADO DE')} ${D('ASISTIR A LAS MISMAS.')}`] },
]));

// ───────── LO 12/2007 · art. 51 · FALTAS LEVES: 2 meses, 5 días (pág. 59) ─────────
v(12, `Artículo 51 · ${L2}`, flujo('PROCEDIMIENTO POR FALTAS LEVES (esquema · pág. 59 · art. 51)', [
  { t: `${KD('PROCEDIMIENTO POR FALTAS LEVES')}: ${Y('PLAZO DE')} ${P('2 MESES')} ${Y('PARA TRAMITACIÓN DESDE EL ACUERDO DE INICIO')}` },
  { t: `${D('ACUERDO DE INICIO NOTIFICADO AL INTERESADO')} (Con designación de instructor en su caso)` },
  { t: `${P('5 DÍAS')} PARA PROPONER PRUEBAS EN UN ESCRITO DE OPOSICIÓN` },
  { t: `De ${K('no')} presentarse el interesado, el expediente se ${D('resolverá sin más trámite')}` },
  { t: `La ${G('autoridad competente')} deberá ${D('juzgar su competencia')} (en materia de prueba)` },
  { t: `El interesado dispone de ${P('5 días')} para presentar ${D('alegaciones')}` },
  { t: `Tras el acuerdo de ${D('"Vista"')} del procedimiento` },
]) + pie(`${nota('Ver 55')} (nota a boli en el apdos. 5-6 del art. 50).`));

// ───────── LO 12/2007 · art. 61 · R24 (pág. 62) ─────────
v(12, `Artículo 61 · ${L2}`, flujo('REDUCCIÓN DE PLAZOS (esquema con llave · R24 · pág. 62 · art. 61)', [
  { t: `${Y('Por razones de urgencia')}… ${G('el órgano que acordó la incoación')} podrá disponer que los ${P('plazos de tramitación')} del expediente se reduzcan a la ${P('mitad')} del tiempo previsto, ${KY('salvo:')}` },
  { bif: [{ t: `los de ${Y('contestación al pliego de cargos')}${O('y')}` }, { t: `de ${Y('alegaciones a la propuesta de resolución.')}` }] },
  { t: `${P('AMBOS 10 DÍAS.')}` },
]));

// ───────── LO 12/2007 · art. 71 · R25 (pág. 65, sello EXAMEN) ─────────
v(12, `Artículo 71 · ${L2}`, cols('CANCELACIÓN DE FALTAS (cuadro R25 · pág. 65 · art. 71 · sello EXAMEN)', [
  { t: KD('LEVES'), l: [P('6 meses')] }, { t: KD('GRAVES'), l: [P('2 años')] }, { t: KD('MUY GRAVES'), l: [P('4 años')] },
]));

// ───────── LO 12/2007 · art. 72 · TIEMPOS (pág. 66, sello EXAMEN 2020) ─────────
v(12, `Artículo 72 · ${L2}`, grid('TIEMPOS RELACIONADOS CON LAS FALTAS DISCIPLINARIAS (tabla · pág. 66 · art. 72 · sello EXAMEN 2020)', '▦', ['', `FALTAS ${D('LEVES')}`, `FALTAS ${D('GRAVES')}`, `FALTAS MUY ${D('GRAVES')}`, `COMIENZO PLAZOS, ${P('desde:')}`], [
  [`PRESCRIPCIÓN ${D('FALTAS')}`, P('6 MESES'), P('2 AÑOS'), P('3 AÑOS'), P('COMISIÓN/ SENTENCIA FIRME O ARCHIVO EJECUTORIA PENAL')],
  [`PRESCRIPCIÓN ${D('SANCIONES')}`, P('1 AÑO'), P('2 AÑOS'), P('3 AÑOS'), P('NOTIFICACIÓN')],
  [`${D('CANCELACIÓN')} SANCIONES`, P('6 MESES'), P('2 AÑOS'), P('4 AÑOS'), P('CUMPLIMIENTO')],
  [`INSTRUCCIÓN ${D('PROCEDIMIENTOS')}`, P('2 MESES'), P('6 MESES'), P('6 MESES'), P('ACUERDO INICIO')],
]));

// ───────── LO 12/2007 · arts. 74-78 · RECURSOS (pág. 68) ─────────
v(12, `Artículo 78 · ${L2}`, grid('RECURSO DE ALZADA y RECURSO POTESTATIVO DE REPOSICIÓN (diagrama · pág. 68 · arts. 74-78)', '▦', ['ANTE:', 'CONTRA:'], [
  [`<b>RECURSO DE ALZADA</b> · ${D('Plazo')} para interponer: ${P('<u>1 MES</u>')} desde el día siguiente al de la notificación de la resolución. <i>Se podrá interponer</i>`, ''],
  [`➜ ${G('Ministro de Defensa')}`, `• ${Y('Resoluciones sancionadoras acordadas por el')} ${G('Director General de la Policía y de la Guardia Civil')}<br>• Resolución de ${Y('baja en Centro Docente de Formación')}`],
  [`➜ ${G('Director General de la Policía y de la Guardia Civil')}`, `Resoluciones sancionadoras adoptadas por los ${G('Oficiales Generales')}, cualquiera que fuere su jerarquía`],
  [`➜ • ${G('Generales Jefes de Unidad')}<br>• ${G('Centro')}, u<br>• ${G('Organismo')} del que directamente dependan`, `Resoluciones sancionadoras dictadas por las ${G('autoridades y mandos subordinados')} a los mismos a los que la presente Ley atribuya competencia sancionadora ${D('<u>por falta leve</u>')}`],
  [`<b>RECURSO POTESTATIVO DE REPOSICIÓN</b> · ${D('Plazo')} para interponer: ${P('<u>1 MES</u>')}. <i>Se podrá interponer</i> ${KD('CONTRA:')}`, `➜ Resoluciones del ${G('Ministro de Defensa')}`],
]) + flujo('VÍA JURISDICCIONAL (diagrama · pág. 68 · arts. 77-78)', [
  { t: `Las ${Y('resoluciones adoptadas en los recursos de alzada y de reposición')} pondrán ${D('fin a la vía disciplinaria')} y contra ellas podrá interponerse:` },
  { t: `${KD('RECURSO CONTENCIOSO-DISCIPLINARIO MILITAR ORDINARIO')}` },
  { t: `${KD('RECURSO CONTENCIOSO-DISCIPLINARIO MILITAR PREFERENTE Y SUMARIO')}: podrá interponerse contra ➜ resoluciones de las ${G('autoridades y mandos')} a los que la presente Ley atribuye competencia sancionadora, en los términos que se establece en la ${Y('legislación procesal militar')}` },
]) + pie(`${nota('Subsec. Defensa')} (nota a boli junto al art. 74.3, baja en Centro Docente de Formación → alzada ante el Ministro de Defensa).`));

module.exports = V;
if (require.main === module) {
  const fs = require('fs'), path = require('path'), L = require('../literal-lib.js');
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const CLAVE = { 11: 'T26_LO11', 12: 'T26_LO12' };
  let colocados = 0; const por = {};
  for (const k of Object.values(CLAVE)) por[k] = L.get(s, k).html.replace(/<!--VIS26A-->[\s\S]*?<!--\/VIS26A-->/g, '');
  const ins = {};
  for (const [ley, loc, vis] of V) {
    const key = CLAVE[ley], h = por[key], k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; const hd = (h.slice(a, b).match(/articulo-head">([\s\S]*?)<\/div>/) || [])[1] || ''; if (norm(hd) === k || norm(hd).startsWith(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', ley, loc.slice(0, 60)); continue; }
    (ins[key] = ins[key] || []).push([i, vis]);
  }
  for (const key of Object.keys(ins)) {
    let h = por[key]; const orden = ins[key].map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS26A-->' + vis + '<!--/VIS26A-->' + h.slice(i); colocados++; }
    s = L.put(s, key, h);
  }
  for (const key of Object.keys(por)) if (!ins[key]) s = L.put(s, key, por[key]);
  fs.writeFileSync(F, s);
  console.log(`Tema 26 (A): cuadros ${V.length}, colocados ${colocados}`);
}
