// Cuadros del Tema 12 (Ley 50/1997, del Gobierno) rehechos con la forma del temario escaneado («TEMA 12 - GOBIERNO Y ADMINISTRACION-2026-08-08.pdf», leído como imagen el 13/11/2026).
// Págs. del PDF: 10 (art. 17 y art. 18), 12 (Gobierno en funciones), 7-8 (art. 24), 12 (arts. 27 y 28). Amarillo y · naranja d · verde a · azul p · lila c · subrayado rojo k. «man» = nota a boli.
// Se anclan por nº de artículo: el cuadro va antes de la primera ficha del Exprés con número ≥ al suyo (en este tema no hay fichas de los arts. 18, 20, 21 ni 24).
const { colorea, y, d, a, p, c, k, esq, fl, caja, man } = require('./repaso-cuadros-lib.js');
const BD = 'border:1px solid rgba(60,70,80,.35)';
const lab = (t, bg = '#d3e8d6') => `<div style="background:${bg};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;${BD};color:#1f2a33"><div>${t}</div></div>`;
const cel = t => `<div style="padding:6px 9px;${BD};line-height:1.5">${t}</div>`;
const grid = (w, filas) => `<div style="display:grid;grid-template-columns:${w} 1fr">${filas.join('')}</div>`;
const lis = (...x) => x.map(t => `• ${t}`).join('<br>');
const out = [];
const add = (art, html) => out.push({ art, rango: [1, 9999], antes: /^$/, html });

// ───────── ART. 17: NORMAS APLICABLES AL FUNCIONAMIENTO DEL GOBIERNO (pág. 10, recuadro) ─────────
add(17.5, esq('ART. 17 · EL GOBIERNO SE RIGE, EN SU ORGANIZACIÓN Y FUNCIONAMIENTO, POR LA PRESENTE LEY Y POR:', '', grid('34px', [
  lab('a)'), cel(`Los ${y('Reales Decretos del Presidente del Gobierno')} sobre la ${y('composición y organización del Gobierno')}, así como de sus ${y('órganos de colaboración y apoyo')}.`),
  lab('b)'), cel(`Las ${y('disposiciones organizativas internas')}, de funcionamiento y actuación emanadas del ${a('Presidente del Gobierno')} o del ${a('Consejo de Ministros')}.`)])));

// ───────── ART. 18: FUNCIONAMIENTO DEL CONSEJO DE MINISTROS (pág. 10: árbol con 4 ramas) ─────────
add(18, esq('ART. 18 · DEL FUNCIONAMIENTO DEL CONSEJO DE MINISTROS', '', [
  caja(`${a('CONSEJO DE MINISTROS')}`, 'cen'), fl,
  grid('34px', [
    lab('1.'), cel(`El ${a('Presidente del Gobierno')} ${d('convoca y preside')} las reuniones, actuando como ${a('Secretario')} el ${a('Ministro de la Presidencia')}.`),
    lab('2.'), cel(`Las reuniones podrán tener carácter ${y('decisorio o deliberante')}.`),
    lab('3.'), cel(`El ${y('orden del día')} de las reuniones se fijará por el ${a('Presidente del Gobierno')}.`),
    lab('4.'), cel(`De las sesiones se levantará ${y('acta')} en la que figurarán, ${k('exclusivamente')}, las circunstancias relativas al ${y('tiempo y lugar')} de su celebración, la ${y('relación de asistentes')}, los ${y('acuerdos adoptados')} y los ${y('informes presentados')}.`)])].join('')));

// ───────── ART. 21: DEL GOBIERNO EN FUNCIONES (pág. 12: árbol) ─────────
add(21, esq('DEL GOBIERNO EN FUNCIONES (ART. 21)', '', grid('190px', [
  lab(`${a('El Gobierno')} ${d('cesa')}:`), cel(lis(`${p('Tras la celebración de elecciones generales')}.`, `En los casos de ${y('pérdida de confianza parlamentaria')} previstos en la Constitución.`, `Por ${y('dimisión o fallecimiento')} de su Presidente.`)),
  lab(`El Gobierno cesante`), cel(`${d('Continúa en funciones')} hasta la ${y('toma de posesión del nuevo Gobierno')}, con las limitaciones establecidas en esta Ley.`),
  lab(`El ${a('Gobierno en funciones')}`), cel(`${d('Facilitará')} el normal desarrollo del proceso de formación del nuevo Gobierno y el traspaso de poderes al mismo y ${d('limitará su gestión al despacho ordinario')} de los asuntos públicos, ${k('absteniéndose')} de adoptar, salvo casos de ${y('urgencia debidamente acreditados')} o por razones de ${y('interés general')} cuya acreditación expresa así lo justifique, cualesquiera otras medidas.`),
  lab(`El ${a('Presidente del Gobierno')} en funciones ${k('no podrá')} ejercer las siguientes facultades:`, '#f3d5c2'), cel(lis(`${d('Proponer al Rey')} la ${y('disolución')} de alguna de las Cámaras, o de las Cortes Generales.`, `${d('Plantear')} la ${y('cuestión de confianza')}.`, `${d('Proponer al Rey')} la convocatoria de un ${y('referéndum consultivo')}.`)),
  lab(`El ${a('Gobierno en funciones')} ${k('no podrá')} ejercer las siguientes facultades:`, '#f3d5c2'), cel(lis(`${d('Aprobar')} el ${y('Proyecto de Ley de Presupuestos Generales del Estado')}.`, `${d('Presentar')} ${y('proyectos de ley')} al Congreso de los Diputados o, en su caso, al Senado.`))])));

// ───────── ART. 24: FORMA DE LAS DECISIONES DEL GOBIERNO Y JERARQUÍA DE LOS REGLAMENTOS (págs. 21-22) ─────────
add(25, esq('ART. 24 · FORMA DE LAS DECISIONES DEL GOBIERNO Y JERARQUÍA DE LOS REGLAMENTOS', 'Las decisiones del Gobierno de la Nación y de sus miembros revisten las formas siguientes', [
  grid('220px', [
    lab(`${d('Reales Decretos Legislativos')} y ${d('Reales Decretos-leyes')}`), cel(`Las decisiones que aprueban, respectivamente, las normas previstas en los ${p('artículos 82 y 86')} de la Constitución.`),
    lab(`${d('Reales Decretos del Presidente del Gobierno')}`), cel(`Las disposiciones y actos cuya adopción venga atribuida al ${a('Presidente')}.`),
    lab(`${d('Reales Decretos acordados en Consejo de Ministros')}`), cel(`Las decisiones que aprueben normas reglamentarias de la competencia de éste y las resoluciones que deban adoptar dicha forma jurídica.`),
    lab(`${d('Acuerdos del Consejo de Ministros')}`), cel(`Las decisiones de dicho órgano colegiado que ${k('no')} deban adoptar la forma de Real Decreto.`),
    lab(`${d('Acuerdos adoptados en Comisiones Delegadas del Gobierno')}`), cel(`Las disposiciones y resoluciones de tales órganos colegiados. Revestirán la forma de ${y('Orden del Ministro competente')} o del ${a('Ministro de la Presidencia')}, cuando la competencia corresponda a distintos Ministros.`),
    lab(`${d('Órdenes Ministeriales')}`), cel(`Las disposiciones y resoluciones de los ${a('Ministros')}. Cuando afecte a varios Departamentos revestirá la forma de Orden del ${a('Ministro de la Presidencia')}, dictada a propuesta de los Ministros interesados.`)]),
  `<div style="margin-top:8px;font-weight:800">LOS REGLAMENTOS SE ORDENARÁN SEGÚN LA SIGUIENTE JERARQUÍA:</div>`,
  caja(`${p('1.º')} Disposiciones aprobadas por ${y('Real Decreto del Presidente del Gobierno')} o acordado en el ${a('Consejo de Ministros')}.<br>${p('2.º')} Disposiciones aprobadas por ${y('Orden Ministerial')}.`)].join('')));

// ───────── ART. 27: TRAMITACIÓN URGENTE (pág. 12, dos recuadros) ─────────
add(28, esq('ART. 27 · TRAMITACIÓN URGENTE DE INICIATIVAS NORMATIVAS EN EL ÁMBITO DE LA AGE', '', [
  caja(`${y('1.')} El ${a('Consejo de Ministros')}, a propuesta del titular del departamento al que corresponda la iniciativa normativa, ${d('podrá acordar')} la ${y('tramitación urgente')} de anteproyectos de ley, reales decretos legislativos o reales decretos, en alguno de los siguientes casos:<br>${p('a)')} Cuando fuere necesario para que la norma entre en vigor en el ${y('plazo exigido')} para la ${y('transposición de directivas comunitarias')} o el establecido en otras leyes o normas de Derecho de la Unión Europea.<br>${p('b)')} Cuando concurran otras ${y('circunstancias extraordinarias')} que, ${k('no')} habiendo podido preverse con anterioridad, exijan la aprobación urgente de la norma.`),
  `<div style="margin:4px 0">La ${y('Memoria del Análisis de Impacto Normativo')} que acompañe al proyecto ${d('mencionará')} la existencia del acuerdo de tramitación urgente, así como las circunstancias que lo sirven de fundamento.</div>`,
  caja(`${y('2.')} La tramitación por vía de urgencia ${d('implicará')} que:<br>${p('a)')} Los ${y('plazos previstos')} para la realización de los trámites del procedimiento de elaboración, establecidos en ésta o en otra norma, se ${d('reducirán a la mitad')} de su duración.<br>${p('b)')} ${k('No')} será preciso el trámite de ${y('consulta pública')} previsto en el artículo 26.2, sin perjuicio de la realización de los trámites de audiencia pública o información pública sobre el texto a los que se refiere el artículo 26.6, cuyo plazo de realización será de ${p('siete días')}.<br>${p('c)')} La falta de emisión de un dictamen o informe ${y('preceptivo')} en plazo ${k('no impedirá')} la continuación del procedimiento, sin perjuicio de su eventual incorporación y consideración cuando se reciba.`)].join('')));

module.exports = { soloPropios: true, cuadros: out.map(o => ({ ...o, html: colorea(o.html) })) };
if (require.main === module) console.log(out.length + ' cuadros');
