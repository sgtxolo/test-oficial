// Cuadros visuales del Tema 15: recrean los cuadros de tu temario subrayado (PDF 08-08-2026) con su TEXTO LITERAL y tus marcas.
//   p20 Delegación del Gobierno · p35 Comunicaciones de los órganos judiciales · p60 Niveles de riesgo (plazos VPER) · p70 Casos que incrementan la gravedad
//   p75 Pautas para entrevistarse con las víctimas · p76-78 Anexo II Medidas por nivel de riesgo · p105 Protocolo Cero (dos acciones) · p112 Tres efectos básicos
// Se insertan en los bloques T15_* de esquemas.html tras la ficha que contiene el texto localizador. Los usa también expres/t15.js (module.exports = V).
// Uso: node prompts/herramientas/tema15/visuales-t15.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS15-->)
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const U = x => `<u class="m-lapiz">${x}</u>`;
const CA = x => `<span class="m-caja">${x}</span>`;
const O = x => `<span class="m-circulo">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);

// ───────── p20 · art. 29 LO 1/2004 ─────────
v('lo', 'Delegación del Gobierno contra la Violencia de Género, adscrita al', tabla('Delegación del Gobierno contra la Violencia de Género (cuadro del temario · art. 29 LO 1/2004)', ['Elemento', 'Contenido'], [
  { l: 'Delegación del Gobierno contra la Violencia de Género', c: 'o', h: [{ t: `${D('Adscrita')} al ${G('Ministerio de Igualdad')} o al ${G('departamento con competencias en la materia')}.` }] },
  { l: 'FUNCIONES', c: 'v', h: [
    { t: `${D('Formulará')} las ${Y('políticas públicas')} en relación con la violencia de género a desarrollar por el ${G('Gobierno')}.` },
    { t: `${D('Elaborará')} la ${CA('Macroencuesta de Violencia contra las Mujeres')}.` },
    { t: `${D('Coordinará e impulsará')} cuantas acciones se realicen en dicha materia, trabajando en ${Y('colaboración y coordinación')} con las administraciones con competencia en la materia.` }] },
  { l: 'LA PERSONA TITULAR', c: 'c', h: [{ t: `Estará ${D('legitimada')} ante los ${G('órganos jurisdiccionales')} para ${D('intervenir en defensa de los derechos y de los intereses tutelados')} en esta ley en colaboración y coordinación con las administraciones con competencias en la materia.` }] },
  { l: 'RANGO Y FUNCIONES CONCRETAS', c: 'o', h: [{ t: `Se determinarán el ${Y('rango')} y las ${Y('funciones')} concretas de la persona titular de la Delegación del Gobierno contra la Violencia de Género: ${P('REGLAMENTARIAMENTE')}.` }] },
]));

// ───────── p35 · Resolución 28/06/2005 · III.D ─────────
v('rs', 'procederá a su inclusión, sin dilación, en la Base de Datos de Señalamientos Nacionales', cols('Comunicaciones de los órganos judiciales a las Fuerzas y Cuerpos de Seguridad (cuadro del temario · Resolución 28/06/2005, III.D)', [
  { t: 'Resoluciones judiciales', l: [
    `${D('Resoluciones que decreten una orden de protección, medidas cautelares u otras medidas de protección o de seguridad')} a las víctimas, así como: ${Y('levantamiento')} y ${Y('modificación')} de medidas.`,
    `Dictadas durante: ${P('fase de INSTRUCCIÓN')} · ${P('fase intermedia en procesos por delito')} · se mantengan en la ${P('sentencia')}, durante la tramitación de los eventuales recursos.`,
    `Se garantiza el cumplimiento por los órganos judiciales de: ${D('remitir a la Policía Judicial la nota impresa de la condena y de las medidas cautelares, órdenes de protección dictadas y medidas de protección y seguridad')}.`] },
  { t: 'Informes', l: [
    `Facilita el examen individualizado de la situación de riesgo en la que se encuentra la víctima, que se refieren a circunstancias ${Y('personales, psicológicas, sociales o de otro tipo')} de la víctima, del imputado o de su núcleo familiar.`,
    `${D('Podrá encomendar')} al ${G('Equipo Forense')} la elaboración de un informe sobre la concurrencia de indicadores de riesgo.`,
    `${D('Valorará la posible emisión')} de informes por parte de: trabajadores sociales y psicólogos de las ${G('Oficinas de Atención a la Víctima')} · ${G('Equipos Psicosociales')} · otros organismos al servicio de la Administración de Justicia.`] },
  { t: 'Otros antecedentes', l: [
    `Poner en conocimiento de: ${D('otros procesos penales')} incoados contra el mismo autor, cualquiera que sea la fase procesal en que se encuentren o aunque hayan finalizado.`,
    `${D('Incorporará informaciones')} obrantes en Registros establecidos de conformidad con la ${P('Instrucción 3/2003 del CGPJ')}, sobre normas de reparto penales y registro informático de violencia doméstica.`] },
  { t: 'Otras comunicaciones', l: [
    `Se mantendrá informados a las Fuerzas y Cuerpos de Seguridad y al ${G('Ministerio Fiscal')} de: ${D('incidencias')} de que tenga conocimiento y que puedan afectar a la seguridad de la víctima.`,
    `La ${D('efectiva notificación al inculpado')} de la resolución en que se acuerde la orden de protección o la medida de alejamiento.`] },
  { t: 'Destino de las comunicaciones', l: [
    `Son remitidas a las FFCCSS ${G('territorialmente competentes')} o, en su caso, a los ${G('puntos de recepción centralizada')} designados en cada territorio.`,
    `La Unidad policial que reciba la comunicación dará traslado, ${K('sin dilación')}, a la ${G('Unidad correspondiente de las FFCCSS competente en materia de violencia doméstica')}.`,
    `Se pondrán en marcha los mecanismos de ${D('coordinación entre las distintas FFCCSE')}.`,
    `La unidad policial que reciba comunicación la incluye, ${K('sin dilación')}, en la ${CA('Base de Datos de Señalamientos Nacionales (BDSN)')}.`] },
], false));

// ───────── p60 · Instr 1/2025, 6.1 ─────────
v('i125', 'antes de los sesenta días cuando existan medidas', plazos('Niveles de riesgo y plazo de la siguiente VPER (cuadro del temario · Instrucción 1/2025, 6.1)', [
  ['EXTREMO', `${P('antes de las 72 horas')}`],
  ['ALTO', `${P('antes de los 7 días')}`],
  ['MEDIO', `${P('antes de los 30 días')}`],
  ['BAJO', `${P('antes de los 60 días')} ${O('cuando existan medidas o penas judiciales en vigor')} · ${P('antes de los 90 días')} ${O('cuando NO existan estas medidas')}`],
]));

// ───────── p70 · Instr 1/2025, 8.E ─────────
v('i125', 'Representan el nivel máximo de amenaza', cols('Casos que, por sus características, incrementan significativamente su nivel de gravedad (cuadro del temario · Instrucción 1/2025, 8.E)', [
  { t: 'MULTIRREINCIDENCIA', l: [`${D('Multirreincidencia')}.`] },
  { t: 'VIOLENCIA GRAVE O MUY GRAVE', l: [`${D('Violencia grave o muy grave')}: casos en los que la violencia ejercida ha sido de ${Y('extrema severidad')}, atentando gravemente a la integridad de la víctima.`] },
  { t: 'TENTATIVAS DE HOMICIDIO', l: [`${D('Tentativas de homicidio')}: representan el ${D('nivel máximo de amenaza')}, reflejando una clara intención de acabar con la vida de la víctima.`] },
], false));

// ───────── p75 · Instr 1/2025, Anexo I ─────────
v('i125', 'PAUTAS BÁSICAS PARA ENTREVISTARSE CON LAS VÍCTIMAS', tabla('Pautas básicas para entrevistarse con las víctimas (cuadro del temario · Instrucción 1/2025, Anexo I)', ['Fase', 'Pautas'], [
  { l: 'CONSIDERACIONES INICIALES', c: 'o', h: [
    { t: `${D('Enfoque personalizado')}: dentro de lo posible, la entrevista debe realizarla ${Y('persona del mismo sexo')} (Ley 4/2015), pudiendo estar acompañada de persona de su elección y ser informada de su derecho a la ${Y('asistencia jurídica gratuita')}, incluso antes de la denuncia.` },
    { t: `${D('Espacio adecuado')}: lugar reservado que permita a la víctima expresarse libremente, respetando su intimidad.` },
    { t: `${D('Tiempo flexible')}: en la medida de lo posible, ${K('no debe haber un límite de tiempo')} para la entrevista.` }] },
  { l: 'INICIO', c: 'v', h: [
    { t: `${D('Presentación inicial')}: saludar a la víctima, identificarse y acordar el trato mutuo.` },
    { t: `${D('Romper el hielo')}: comenzar temas neutros para generar un clima de confianza.` },
    { t: `${D('Dinámica de la entrevista')}: antes de comenzar, explicar el proceso de la entrevista y la intervención en general, para reducir su incertidumbre.` },
    { t: `${D('Generar actitud positiva')}: trasladar a la víctima que su bienestar y protección es lo más importante.` }] },
  { l: 'DURANTE TODA LA ENTREVISTA', c: 'c', h: [
    { t: `${D('Comunicación empática')} · ${D('Atención plena')}: escuchar sin interrumpir; ${K('no se deben emitir juicios ni valoraciones')}.` },
    { t: `${D('Escucha activa')} · ${D('Comunicación no verbal')} · ${D('Respetar los silencios')}.` },
    { t: `${D('Realizar preguntas abiertas')}: en todo momento se debe promover el relato fluido; evitar respuestas de «sí» o «no».` }] },
  { l: 'CIERRE Y DESPEDIDA', c: 'o', h: [
    { t: `${D('Resumen de la entrevista')} · ${D('Recursos')}: no debe cerrarse la intervención sin dejar claro a la víctima los recursos que tiene a su disposición.` },
    { t: `${D('Despedida')}: momento crucial; informar claramente de los ${Y('próximos pasos a seguir')} en el procedimiento.` }] },
]));

// ───────── p76-78 · Instr 1/2025, Anexo II ─────────
v('i125', 'MEDIDAS POLICIALES DE PROTECCIÓN PARA CADA NIVEL DE RIESGO', tabla('Medidas policiales de protección para cada nivel de riesgo (cuadro del temario · Instrucción 1/2025, Anexo II)', ['Nivel de riesgo', 'Medidas de protección'], [
  { l: 'BAJO', c: 'v', h: [
    { t: `${D('Para la víctima')}: las mismas, de tipo orientativo, informativo y asistencial que para cualquier otro ciudadano · teléfono de contacto permanente (${P('24 horas')}) · números de emergencia ${P('112, 091, 062, 016, 092')} · teleasistencia móvil y ${CA('AlertCops')} · derivación a oficinas de atención a víctimas · recomendaciones de autoprotección y ciberseguridad · contactos personales o telefónicos (discretos, vehículos sin distintivos, personal sin uniforme, ${K('salvo')} imposibilidad).` },
    { t: `${D('Para el denunciado')}: informar de que debe estar disponible o localizado; si tuviera licencia de armas, requerir su entrega voluntaria.` },
    { t: `${D('Existencia de medidas judiciales')}: comunicar al autor que está sometido a control/protección policial · acompañamiento del autor al domicilio de la víctima para retirar sus efectos · revisar la información penitenciaria en VioGén-2.` }] },
  { l: 'MEDIO', c: 'c', h: [
    { t: `${D('Para la víctima')}: entrevista personal · si procede, traslado a un ${G('centro de acogida')} · ${D('vigilancia ocasional y aleatoria')} en domicilio, trabajo y centros escolares de los menores · acompañamiento en actuaciones judiciales, asistenciales o administrativas · recomendar el bloqueo de perfiles.` },
    { t: `${D('Para el autor')}: comprobación periódica del cumplimiento de las medidas judiciales · comunicación/entrevista durante permisos penitenciarios y/o excarcelaciones.` },
    { t: `${D('Especial Relevancia')}: solicitar a ${G('Fiscalía')} el seguimiento obligatorio del autor mediante ${CA('dispositivo telemático de control')}.` }] },
  { l: 'ALTO', c: 'o', h: [
    { t: `${D('Para la víctima')}: si no se ha localizado al autor, hablar sobre la posibilidad de ser trasladada a casa de un familiar o a un centro de acogida · recomendar eliminar los perfiles actuales de redes sociales y cambiar de número de teléfono, que compartirá solo con su ${CA('Círculo de Fortaleza')}.` },
    { t: `${D('Para el autor')}: entrevista ocasional · ${D('vigilancia aleatoria y frecuente')} · solicitar a ${G('Fiscalía')} el seguimiento obligatorio mediante dispositivo telemático de control.` }] },
  { l: 'EXTREMO', c: 'o', h: [
    { t: `${D('Para la víctima')}: ${D('protección permanente')} hasta que el autor deje de ser una amenaza inminente · ${D('vigilancia en centros escolares')} de los hijos a la hora de entrada y salida · aconsejar la creación de una nueva identidad digital.` },
    { t: `${D('Para el autor')}: ${D('control intensivo')} de sus movimientos hasta que deje de ser una amenaza inminente.` }] },
  { l: 'MENORES', c: 'v', h: [
    { t: `Solicitar información a la víctima sobre la situación de los menores (custodia, domicilio, centros educativos) · pedir información a ${G('Servicios Sociales')} · acompañamiento a los puntos de encuentro · indagar sobre posible maltrato · ${D('comunicarlo a la Autoridad Judicial y Fiscal')} · contactos frecuentes con el ${G('personal policial tutor')}.` }] },
]));

// ───────── p105 · Protocolo Cero ─────────
v('pc', 'RECUERDE QUE EL PROTOCOLO CERO PRESTA ESPECIAL ATENCIÓN', flujo('El Protocolo Cero presta especial atención a dos acciones interconectadas (cuadro del temario · Instrucción 5/2021, Anexo)', [
  { t: `${D('LA INTERVENCIÓN EN EL LUGAR DE LOS HECHOS')}`, et: 'Acción 1' },
  { t: `${D('LA ACTUACIÓN POSTERIOR EN DEPENDENCIAS POLICIALES')}`, et: 'Acción 2' },
]));

// ───────── p112 · Protocolo seguimiento telemático ─────────
v('pul', 'busca tres efectos básicos', flujo('Tres efectos básicos del Sistema (cuadro del temario · Protocolo de seguimiento telemático, 1)', [
  { t: `${D('Hacer efectivo el derecho de la víctima a su seguridad')}.`, et: '1' },
  { t: `${D('Documentar el posible quebrantamiento')} de la medida o pena de prohibición de aproximación, así como en el contexto de la libertad vigilada, o como norma de conducta o condición de la suspensión de la ejecución de las penas privativas de libertad.`, et: '2' },
  { t: `${D('Disuadir')} al investigado/encausado/condenado del incumplimiento de las prohibiciones impuestas judicialmente.`, et: '3' },
]));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  const BLOQ = { lo: 'T15_LO', rs: 'T15_RS', i125: 'T15_I125', pc: 'T15_PC', pul: 'T15_PUL', ntf: 'T15_NTF', i1218: 'T15_I1218' };
  const porNorma = {}; V.forEach(([n, loc, h]) => (porNorma[n] = porNorma[n] || []).push([loc, h]));
  let colocados = 0;
  for (const [n, lista] of Object.entries(porNorma)) {
    let h = L.get(s, BLOQ[n]).html.replace(/<!--VIS15-->[\s\S]*?<!--\/VIS15-->/g, '');
    for (const [loc, vis] of lista) {
      const k = norm(loc); let i = -1, pos = 0;
      for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
      if (i < 0) { console.error('SIN COLOCAR:', n, loc); continue; }
      h = h.slice(0, i) + '<!--VIS15-->' + vis + '<!--/VIS15-->' + h.slice(i); colocados++;
    }
    s = L.put(s, BLOQ[n], h);
  }
  fs.writeFileSync(F, s);
  console.log(`Tema 15: cuadros ${V.length}, colocados ${colocados}`);
}
