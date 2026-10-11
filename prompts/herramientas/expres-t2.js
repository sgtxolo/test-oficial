// ⚡ EXPRÉS del Tema 2 (Terrorismo y delincuencia transnacional). Resumen de 1 hora: fichas literales + esquemas.
// Texto sacado del articulado verificado del esquema completo (no se inventa nada); cada respuesta enlaza a sus preguntas.
// Uso: node prompts/herramientas/expres-t2.js
const X = require('./expres-lib.js')(2);
const { Rq, P, D, K, literal, arbol, cols, flujo, cuadro, bloque, trampa } = X;
let H = '';
// pon(cabecera de la ficha del esquema completo, esquema): lo añade al Exprés y lo guarda para ponerlo también
// debajo de esa ficha en el esquema completo (lo inserta visuales-t2.js)
const VIS = []; const pon = (cab, vis) => { VIS.push([cab, vis]); return vis; };

// ======================= 2.1 LEY 19/2003 (fichas k=0..9) =======================
H += bloque('2.1 — LEY 19/2003, DE 4 DE JULIO · Movimientos de capitales y transacciones económicas con el exterior');

// Art. 1 — corto: literal
H += literal(0, [0, 1]);

// Art. 2 — residentes / no residentes (EX): cuadro espejo
H += pon('Artículo 2 — Definiciones', cols('⭐ EX · Art. 2 — ¿Residente o no residente? (cuadro espejo)', [
  { t: 'RESIDENTES', l: [
    'Personas físicas que residan habitualmente en España',
    `${Rq('Diplomáticos ESPAÑOLES acreditados en el extranjero', ['2-62', '2-ia-66', '2-ia-100'])} y personal español de embajadas, consulados u organizaciones internacionales en el extranjero`,
    `${Rq('Personas jurídicas con domicilio social en España', ['2-ia-2'])}`,
    'Sucursales y establecimientos permanentes en territorio ESPAÑOL de residentes en el extranjero',
    'Otros que se determinen reglamentariamente en casos análogos'] },
  { t: 'NO RESIDENTES', l: [
    'Personas físicas con residencia habitual en territorio extranjero',
    `${Rq('Diplomáticos EXTRANJEROS acreditados ante el Gobierno español', ['2-11', '2-82'])} y personal extranjero de embajadas, consulados u organizaciones internacionales en España`,
    `${Rq('Personas jurídicas con domicilio social en el extranjero', ['2-11', '2-82'])}`,
    `${Rq('Sucursales y establecimientos permanentes en el EXTRANJERO de residentes en España', ['2-11', '2-82'])}`,
    'Otros que se determinen reglamentariamente en casos análogos'] }], K('espejo')))
  + `<div class="ex-linea"><b>Residencia habitual (art. 2.2):</b> lo establecido en la ${Rq('normativa fiscal con las adaptaciones que reglamentariamente se determinen', ['2-ia-52'])} · la condición se acredita en la forma que se establezca reglamentariamente.</div>`;

// Art. 3 — obligación de información (EX): árbol
H += pon('Artículo 3 — Obligaciones', arbol('⭐ EX · Art. 3 — Obligación de declarar', `Los actos, negocios, transacciones y operaciones con el exterior se ${D('DECLARAN')}, a efectos de información administrativa y estadística`, [
  `<b>¿Quién?</b> ${Rq('los sujetos obligados', ['2-ia-53'])}: las personas físicas o jurídicas, residentes o no residentes en España, que realicen las operaciones`,
  `<b>¿A quién?</b> ${Rq('al Ministerio de Economía y al Banco de España', ['2-29', '2-ia-3', '2-ia-67'])}, en la forma y plazos que se establezcan, los datos que se les requieran`,
  `<b>Además:</b> las entidades de crédito, empresas de servicios de inversión y otros intermediarios financieros remiten a esos mismos dos órganos la información de las transacciones de sus clientes`]));

// Arts. 4 y 5 — quién prohíbe o limita (EX): columnas
H += pon('Artículos 4 y 5 — Cláusulas', cols('⭐ EX · Arts. 4 y 5 — ¿Quién prohíbe o limita movimientos de capitales?', [
  { t: 'SALVAGUARDIA (art. 4.1-4.2)', l: [
    `Terceros países respecto de los que ${Rq('el Consejo de la Unión Europea', ['2-5', '2-76', '2-ia-54'])} haya adoptado medidas de salvaguardia (art. 59 TCE)`,
    `→ se entiende ${D('prohibida o limitada')} en los términos de las normas comunitarias`,
    'El Gobierno (acuerdo del Consejo de Ministros) fija las especificaciones ulteriores, incluido el procedimiento de autorización si procede'] },
  { t: 'ORGANISMOS INTERNACIONALES distintos de la CE (art. 4.3)', l: [
    `${Rq('El Gobierno, mediante acuerdo del Consejo de Ministros, a propuesta del Ministro de Economía', ['2-10', '2-69', '2-81', '2-ia-4', '2-ia-68'])}`,
    'podrá prohibir o limitar respecto de un Estado, territorio o centro extraterritorial, o grupo de Estados',
    'aplicando medidas de organismos internacionales de los que España sea miembro'] },
  { t: 'MEDIDAS EXCEPCIONALES (art. 5)', l: [
    `5.1: terceros países con medidas del Consejo de la UE según el ${Rq('art. 57.2 del Tratado Constitutivo de la Comunidad Europea', ['2-ia-69'])} · 5.2: medidas urgentes del art. 60.1`,
    `5.4: medidas ${D('UNILATERALES')} contra un tercer país (art. 60.2 TCE): el Gobierno (Consejo de Ministros, a propuesta del Ministro de Economía), mientras no haya medidas del 60.1, ${Rq('por razones políticas graves y por motivos de urgencia', ['2-ia-55'])}`] }]));

// Arts. 6 y 7 — autorización, silencio y suspensión: flujo
H += pon('Artículo 7 — Suspensión del régimen', flujo('Arts. 6 y 7 — Autorización y suspensión de la liberalización', [
  `Operaciones afectadas por las medidas de los ${Rq('arts. 4 y 5', ['2-ia-56'])} → podrán realizarse, si así se dispone expresamente, con ${D('autorización administrativa PREVIA')} (art. 6.1)`,
  { c: 'no', et: 'SILENCIO', t: `Vence el plazo máximo sin resolución expresa → la operación ${Rq('NO es autorizada', ['2-ia-70', '2-ia-97'])} y la solicitud se entiende ${Rq('DESESTIMADA', ['2-ia-70', '2-ia-97'])} (art. 6.2)` },
  { et: 'ART. 7', t: `El ${D('GOBIERNO')} puede SUSPENDER el régimen de liberalización si afecta, aunque sea de modo ocasional, al ${Rq('ejercicio de poder público', ['2-ia-57'])}, a la ${Rq('defensa nacional', ['2-ia-57'])} o al ${Rq('orden público, seguridad pública y salud pública', ['2-ia-57'])} → las operaciones posteriores necesitan la autorización del art. 6` }]));

// Art. 7 bis — inversiones extranjeras directas: árbol
H += pon('Artículo 7 bis', arbol('Art. 7 bis — Inversiones extranjeras directas (IED) en España', `Se ${D('SUSPENDE la liberalización')} de las IED → necesitan ${D('AUTORIZACIÓN previa')}`, [
  `<b>¿Qué es IED?</b> pasar a tener una participación ${Rq('igual o superior al 10 %', ['2-ia-5', '2-ia-58'])} del capital social de una sociedad española, o adquirir su control (art. 7 Ley 15/2007, de Defensa de la Competencia)`,
  `<b>¿Por quién?</b> a) residentes de países ${K('fuera')} de la UE y de la AELC · b) residentes de la UE/AELC cuya titularidad real sea de fuera: poseen o controlan ${P('más del 25 %')} del capital o de los derechos de voto`,
  `<b>Sectores (7 bis.2):</b> a) infraestructuras críticas (${Rq('Ley 8/2011', ['2-ia-59'])}) · b) tecnologías críticas y de doble uso: telecomunicaciones, ${Rq('inteligencia artificial, robótica, semiconductores, ciberseguridad', ['2-ia-60'])}, aeroespacial, defensa, energía, cuántica, nuclear, nanotecnologías, ${Rq('biotecnologías', ['2-ia-60'])} · c) insumos fundamentales (energía, seguridad alimentaria) · d) ${Rq('acceso a información sensible', ['2-ia-71'])} (datos personales, LO 3/2018) · e) medios de comunicación (lo audiovisual, por la ${Rq('Ley 7/2010, General de la Comunicación Audiovisual', ['2-ia-72'])})`,
  `<b>Por el inversor (7 bis.3):</b> a) controlado por el gobierno de un tercer país (criterios del ${Rq('art. 7.2 de la Ley de Defensa de la Competencia', ['2-ia-61'])}) · b) ya ha actuado en sectores de seguridad, orden o salud pública de otro Estado miembro · c) riesgo grave de actividades delictivas o ilegales`,
  `<b>Otros sectores (7 bis.4):</b> el Gobierno puede suspender también, por el procedimiento del art. 7`,
  `<b>Sin autorización (7 bis.5):</b> ${Rq('carecen de validez y efectos jurídicos', ['2-ia-73', '2-ia-95'])}, en tanto no se legalicen`,
  `<b>7 bis.6:</b> el Gobierno fija reglamentariamente las ${Rq('categorías de operación e importes', ['2-ia-96'])} por debajo de los que quedan exentas · normas de ejecución: ${Rq('Ministra de Industria, Comercio y Turismo', ['2-ia-84'])}`]));

// Arts. 8 y 9 — infracciones y sanciones (EX): columnas M/G/L
H += pon('Artículos 9 y 10 — Sanciones', cols('⭐ EX · Arts. 8 y 9 — Infracciones y sanciones', [
  { t: 'MUY GRAVES', l: [
    'Operaciones PROHIBIDAS por las medidas de los arts. 4 y 5',
    'Sin solicitar autorización cuando es preceptiva (arts. 6, 7 y 7 bis), antes de concederse o incumpliendo sus condiciones',
    `Falta de veracidad en las solicitudes de autorización, si es ${Rq('especialmente relevante', ['2-ia-6'])}`,
    `<b>Sanción (simultánea):</b> multa ${Rq('hasta el TANTO del contenido económico, mínimo 30.000 €', ['2-ia-7', '2-ia-90'])} + ${Rq('amonestación pública o privada', ['2-ia-63', '2-ia-90'])}`] },
  { t: 'GRAVES', l: [
    `${Rq('Falta de declaración de operaciones de MÁS DE 6.000.000 €', ['2-1', '2-72', '2-ia-62', '2-ia-74'])}`,
    'Falta de veracidad, omisión o inexactitud en declaraciones de más de 6.000.000 €',
    'Incumplir requerimientos hechos de modo expreso y por escrito',
    `<b>Sanción:</b> multa ${Rq('hasta la MITAD', ['2-ia-75'])}, mínimo ${P('6.000 €')} + amonestación pública o privada`] },
  { t: 'LEVES', l: [
    'Declaraciones FUERA DE PLAZO',
    `Falta de declaración (o datos inexactos) de operaciones que ${K('no superen')} 6.000.000 €`,
    `<b>Sanción:</b> multa ${Rq('hasta UN CUARTO, mínimo 3.000 €', ['2-ia-76', '2-ia-98'])} + ${Rq('amonestación PRIVADA', ['2-ia-98'])}`,
    `Fuera de plazo SIN requerimiento previo (9.5): ${P('≤ 6 meses: 150-300 €')} · ${P('> 6 meses: 300-')}${Rq('600 €', ['2-ia-77'])}`] }]))
  + trampa('NO declarar una operación de más de 6.000.000 € es GRAVE, no muy grave. Muy graves = operaciones prohibidas, sin autorización o falsedad «especialmente relevante».');

// Art. 10 — graduación: árbol
H += pon('Artículos 9 y 10 — Sanciones', arbol('Art. 10 — Graduación de las sanciones', 'Para fijar la sanción se consideran:', [
  `a) ${Rq('naturaleza y entidad', ['2-22'])} de la infracción`,
  `b) ${Rq('grado de responsabilidad e intencionalidad', ['2-22', '2-ia-94'])} del interesado`,
  `c) ${Rq('tiempo entre la comisión y el intento de subsanación por iniciativa propia', ['2-22', '2-ia-94'])}`,
  `d) ${Rq('capacidad económica', ['2-22'])} del interesado`,
  `e) ${Rq('conducta anterior', ['2-22'])}: sanciones firmes de los ${P('últimos 5 años')}`]))
  + trampa('NO es criterio «el tiempo transcurrido hasta que la Administración la descubre»: cuenta el tiempo hasta el intento de SUBSANACIÓN por iniciativa propia.');

// Art. 11 — prescripción (EX): tabla
H += pon('Artículos 11 y 12 — Prescripción', cuadro('⭐ EX · Art. 11 — Prescripción', ['', 'MUY GRAVES', 'GRAVES', 'LEVES'], [
  ['<b>Infracciones</b><br><small>desde que se ' + Rq('cometió', ['2-ia-91']) + '</small>', P('5 años'), Rq('3 años', ['2-ia-64']), P('1 año')],
  ['<b>Sanciones</b><br><small>resolución firme</small>', P('5 años'), Rq('4 años', ['2-ia-8', '2-ia-79']), P('3 años')]]));

// Art. 12 — competencias (EX): tabla general / inversiones extranjeras
H += pon('Artículos 11 y 12 — Prescripción', cuadro('⭐ EX · Art. 12 — ¿Quién incoa y quién sanciona?', ['', 'EN GENERAL', 'INVERSIONES EXTRANJERAS DIRECTAS'], [
  ['<b>Incoa e instruye</b>', Rq('Secretaría de la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias', ['2-ia-80', '2-ia-92']), `${Rq('Salvo IED', ['2-ia-85', '2-ia-99'])}: el órgano que designe el titular de la DG de Comercio Internacional e Inversiones`],
  ['<b>Muy graves</b>', `${Rq('Consejo de Ministros', ['2-ia-81'])}, a propuesta del Ministerio de Asuntos Económicos y Transformación Digital`, `Consejo de Ministros, a propuesta del ${Rq('Ministerio de Industria, Comercio y Turismo', ['2-ia-81'])}`],
  ['<b>Graves</b>', 'Ministerio de Asuntos Económicos y Transformación Digital (propone la Secretaría de Estado de Economía)', `${Rq('Ministerio de Industria, Comercio y Turismo', ['2-ia-82', '2-ia-93'])} (propone la Secretaría de Estado de Comercio)`],
  ['<b>Leves</b>', 'DG del Tesoro y Política Financiera (propone el instructor)', Rq('DG de Comercio Internacional e Inversiones', ['2-ia-83'])],
  ['<b>Plazo para resolver</b>', `${Rq('UN AÑO desde el acuerdo de incoación', ['2-ia-65'])}`, 'ídem']]));

module.exports = { visuales: () => VIS.map(([c, v]) => [c, X.final(v)]) };
if (require.main === module) X.publica(H, [{ nombre: '2.1 Ley 19/2003', k0: 0, k1: 9 }]);
