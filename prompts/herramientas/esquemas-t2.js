// Esquemas visuales del Tema 2 (arts. de la Ley 19/2003, 10/2010, Palermo y Protocolos): se ponen debajo de su ficha en el esquema
// normal (los inserta visuales-t2.js) y el ⚡ Exprés (expres-t2.js, automático) los reutiliza como cuadros de cada ficha.
// Era el Exprés REDACTADO del Tema 2 (hasta el 14/10/2026); ahora solo exporta sus esquemas con pon().
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
  `a) ${Rq('naturaleza y entidad', ['2-22', '2-ia-78'])} de la infracción`,
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

// ======================= 2.2 CONVENIO N.º 196 DEL CONSEJO DE EUROPA (fichas k=10..24) =======================
H += bloque('2.2 — CONVENIO N.º 196 DEL CONSEJO DE EUROPA PARA LA PREVENCIÓN DEL TERRORISMO · Varsovia, 16 de mayo de 2005');

H += pon('Artículos 1 y 2 — Terminología', arbol('Arts. 1 y 2 — «Delito terrorista» y objetivo', `Convenio n.º 196 (Varsovia, 16-5-2005, en ${Rq('francés e inglés', ['2-ia-110'])}, ambos auténticos)`, [
  `<b>«Delito terrorista»:</b> ${Rq('cualquiera de los delitos incluidos en el ámbito de aplicación y definidos en uno de los tratados enumerados en el anexo', ['2-ia-9'])}`,
  `Un Estado (o la CE) que no sea parte en un tratado del anexo puede declarar, ${Rq('al depositar su instrumento de ratificación', ['2-ia-107'])}, que ese tratado no figura en el anexo; la declaración queda sin efecto cuando el tratado entre en vigor para esa Parte`,
  `<b>Objetivo (art. 2):</b> ${Rq('mejorar los esfuerzos de las Partes para la prevención del terrorismo y de sus efectos negativos', ['2-ia-101'])} sobre los derechos humanos, en particular el ${Rq('derecho a la vida', ['2-ia-106'])}, con medidas nacionales y de cooperación internacional`]));

H += pon('Artículos 3 y 4 — Políticas', arbol('⭐ EX · Arts. 3 y 4 — Políticas nacionales de prevención', 'Cada Parte, para prevenir los delitos terroristas y sus efectos:', [
  `Respetando los derechos humanos del ${Rq('Convenio Europeo de Derechos Humanos, el Pacto Internacional de Derechos Civiles y Políticos y otras obligaciones de derecho internacional', ['2-17'])}`,
  `<b>3.1</b> Medidas en la ${Rq('formación de las autoridades encargadas del cumplimiento de la ley y otros órganos, educación, cultura, información, medios de comunicación y sensibilización del público', ['2-86', '2-ia-111'])}`,
  `<b>3.2</b> Cooperación entre autoridades nacionales: a) ${Rq('intercambio de información', ['2-ia-345'])} · b) refuerzo de la protección física de personas y bienes · c) mejora de los planes de formación y coordinación para situaciones de crisis`,
  `<b>3.3</b> Tolerancia: ${Rq('diálogo interreligioso y transcultural', ['2-ia-102'])}, con ONG y sociedad civil`,
  '<b>3.4</b> Sensibilizar al público sobre la existencia, causas, gravedad y amenaza de los delitos terroristas',
  '<b>Art. 4</b> Asistencia y apoyo mutuos: intercambio de información y buenas prácticas, formación y esfuerzos conjuntos preventivos']))
  + trampa('El art. 3 NO menciona la «ciberseguridad activa contra ataques estatales» ni crear un «cuerpo policial conjunto de intervención».');

// Arts. 5, 6 y 7 (EX): los tres delitos, literal
H += literal(12, [0, 1, 2]);

H += pon('Artículos 8 y 9 — Irrelevancia', arbol('Arts. 8 y 9 — Irrelevancia del resultado y delitos accesorios', `Arts. 5 a 7: ${Rq('no es necesario que el delito terrorista se haya cometido efectivamente', ['2-ia-13'])} (art. 8)`, [
  'Tipificar también (9.1): a) la participación como cómplice',
  `b) ${Rq('la organización de la comisión de los delitos de los arts. 5 a 7 o la orden de cometerlos por otras personas', ['2-ia-113'])}`,
  'c) la contribución deliberada a su comisión por un grupo con objetivo común (para facilitar su actividad o sabiendo su intención)',
  `<b>Tentativa (9.2):</b> solo de los arts. ${Rq('6 y 7 (reclutamiento y adiestramiento)', ['2-ia-105'])}`]))
  + trampa('La tentativa de PROVOCACIÓN PÚBLICA (art. 5) NO tiene que tipificarse: el art. 9.2 solo cita los arts. 6 y 7.');

H += cols('⭐ EX · Arts. 10 y 11 — Personas jurídicas y penas', [
  { t: 'PERSONAS JURÍDICAS (art. 10)', l: [
    'Responden si participan en los delitos de los arts. 5 a 7 y 9',
    `Responsabilidad ${Rq('penal, civil o administrativa', ['2-ia-14', '2-20', '2-89'])}`,
    'Sin perjuicio de la responsabilidad penal de las personas físicas',
    `Sanciones (11.3) efectivas, proporcionadas y disuasorias, penales o no, ${Rq('incluidas las sanciones pecuniarias', ['2-ia-136'])}`] },
  { t: 'PENAS (art. 11)', l: [
    `Para los delitos de los arts. 5 a 7 y 9: penas ${Rq('efectivas, proporcionadas y disuasorias', ['2-32', '2-ia-15'])}`,
    `Condena firme anterior en un Estado extranjero: ${Rq('podrá tenerse en cuenta en la determinación de la pena', ['2-ia-128'])}, si lo permite el derecho interno`] }]);

H += pon('Artículos 12 y 13 — Condiciones', arbol('Arts. 12 y 13 — Salvaguardias y víctimas', 'Al tipificar y aplicar estos delitos', [
  `Respetar los derechos humanos, en particular ${Rq('la libertad de expresión, la libertad de asociación y la libertad de religión', ['2-ia-109'])} · principio de proporcionalidad · sin arbitrariedad ni trato discriminatorio o racista`,
  `<b>Art. 13:</b> proteger y apoyar a las ${Rq('víctimas de acciones terroristas cometidas en su propio territorio', ['2-ia-103'])}: ayuda económica e indemnización a ellas y a sus familiares próximos`]));

H += pon('Artículos 14 y 15 — Competencia', cols('Arts. 14 y 15 — Competencia', [
  { t: 'OBLIGATORIA (14.1)', l: [
    `a) delito ${Rq('cometido en su territorio', ['2-ia-112'])}`,
    `b) ${Rq('a bordo de un buque con su pabellón', ['2-ia-112'])} o de una aeronave matriculada en esa Parte`,
    'c) cometido por uno de sus nacionales'] },
  { t: 'FACULTATIVA (14.2)', l: [
    'a) su finalidad o resultado es un delito en su territorio o contra uno de sus nacionales',
    `b) contra una instalación pública suya fuera de su territorio, ${Rq('incluidos los locales diplomáticos y consulares', ['2-ia-142'])}`] },
  { t: 'CONFLICTO Y DETENIDO', l: [
    `Varias Partes competentes (14.5): ${Rq('se pondrán de acuerdo para determinar cuál está en mejores condiciones', ['2-ia-114'])}`,
    `Detenido (15.3): comunicarse sin demora con el representante de su Estado · ${Rq('recibir su visita', ['2-ia-115'])} · ser informado de esos derechos · se puede invitar al Comité Internacional de la Cruz Roja (15.5)`] }]));

H += pon('Artículos 16 y 17 — No aplicabilidad', arbol('Arts. 16 a 19 — Ámbito, cooperación y extradición', 'Cooperación penal entre las Partes', [
  `<b>Art. 16 — NO se aplica</b> si el delito ${Rq('se comete dentro de un único Estado, el presunto autor es nacional de ese Estado y está en su territorio, y ningún otro Estado tiene razones', ['2-ia-116'])} para ser competente (sí se aplican los arts. 17 y 20 a 22)`,
  `<b>Art. 17</b> — La asistencia más amplia posible; sin tratado, ${Rq('de conformidad con su legislación interna', ['2-ia-117'])}`,
  `<b>Art. 18 — Extraditar o juzgar:</b> si no extradita, ${Rq('somete el asunto sin dilación excesiva a sus autoridades para la acción penal', ['2-ia-119'])} · basta la entrega condicional del nacional ${Rq('a condición de que le sea entregado para cumplir la pena impuesta', ['2-ia-139'])}`,
  '<b>Art. 19</b> — Los delitos de los arts. 5 a 7 y 9 son de pleno derecho casos de extradición; el Convenio puede servir de base jurídica']));

H += flujo('⭐ EX · Art. 20 — Exclusión de la cláusula de excepción política', [
  `Los delitos de los arts. 5 a 7 y 9 NO se consideran ${Rq('delito político, conexo a un delito político o inspirado por móviles políticos', ['2-ia-118'])} a efectos de extradición o asistencia judicial (20.1)`,
  { et: 'RESERVA', t: `Al firmar o depositar el instrumento puede reservarse no aplicar el 20.1 a la extradición; la aplica ${Rq('caso por caso, mediante decisión debidamente motivada', ['2-ia-129'])} (20.2)` },
  { et: 'VALIDEZ', t: `${Rq('3 años', ['2-ia-16'])} desde la entrada en vigor para esa Parte, ${Rq('renovables por períodos de igual duración', ['2-ia-16'])} (20.5)` },
  { et: '12 MESES ANTES', t: `el Secretario General del Consejo de Europa informa ${Rq('a la Parte de que se trate', ['2-ia-108'])}` },
  { et: '3 MESES ANTES', t: 'la Parte notifica si la MANTIENE, MODIFICA o RETIRA' },
  { c: 'no', et: 'SIN NOTIFICACIÓN', t: `el Secretario General le informa de que queda ${Rq('prorrogada automáticamente por 6 meses', ['2-ia-130'])}; si sigue sin notificar → la reserva queda SIN EFECTO` },
  { et: 'RETIRADA', t: `total o parcial, por declaración ${Rq('al Secretario General del Consejo de Europa, con efecto en la fecha de su recepción', ['2-15', '2-85'])} (20.3)` },
  { et: 'SI NO EXTRADITA', t: `somete el asunto a sus autoridades (20.7); sin decisión en plazo razonable, ${Rq('la Parte requirente informa al Secretario General, que lo somete a la Consulta entre las Partes', ['2-ia-138'])} → dictamen al ${Rq('Comité de Ministros', ['2-ia-138'])} (20.8)` }]);

H += pon('Artículos 21 y 22 — Cláusula', arbol('Arts. 21 y 22 — Cláusula de discriminación e información espontánea', 'NO obliga a extraditar ni a la asistencia judicial (art. 21) si:', [
  'Se persigue a la persona por su raza, religión, nacionalidad, origen étnico u opiniones políticas',
  'Corre riesgo de tortura o de penas o tratos inhumanos o degradantes',
  `Riesgo de pena de muerte o, ${Rq('cuando la ley de la Parte requerida no permita la pena privativa de libertad a perpetuidad', ['2-ia-131'])}, de ${Rq('perpetua sin posibilidad de remisión', ['2-ia-131'])}; salvo que deba extraditar y la requirente dé ${Rq('garantías consideradas suficientes', ['2-ia-131'])}`,
  `<b>Art. 22 — Información espontánea:</b> ${Rq('sin necesidad de previa solicitud', ['2-ia-120'])}; quien la da puede poner condiciones y quien la recibe debe respetarlas · reserva: ${Rq('no someterse a las condiciones', ['2-ia-134'])} ${Rq('salvo que se le notifique antes la naturaleza de la información y acepte recibirla', ['2-ia-134'])}`]));

H += pon('Artículos 23, 24 y 25', cuadro('Arts. 23 a 26 y 31 — Firma, vigor, adhesión, efectos y denuncia', ['', 'DATO'], [
  ['<b>Firma (23)</b>', 'Estados miembros del Consejo de Europa, la Comunidad Europea y Estados no miembros que participaron en su elaboración'],
  ['<b>Depósito</b>', Rq('En poder del Secretario General del Consejo de Europa', ['2-ia-104'])],
  ['<b>Entrada en vigor</b>', `${Rq('1.er día del mes siguiente a 3 meses desde que 6 Signatarios (al menos 4 del Consejo de Europa)', ['2-ia-121'])} hayan dado su consentimiento`],
  ['<b>Adhesión (24)</b>', `El Comité de Ministros invita a Estados no miembros que no participaron, previa consulta y ${Rq('consentimiento unánime', ['2-ia-122'])} de las Partes (mayoría del art. 20.d del Estatuto + unanimidad de sus representantes)`],
  ['<b>Territorios (25)</b>', 'Se puede ampliar a otros territorios: vigor el 1.er día del mes siguiente a 3 meses'],
  ['<b>Efectos (26)</b>', `Completa el ${Rq('Convenio europeo de extradición (1957), el de asistencia judicial en materia penal (1959) y el de represión del terrorismo (1977)', ['2-ia-140'])} y sus Protocolos · entre miembros de la UE: ${Rq('normas de la Comunidad y de la UE si rigen el tema concreto', ['2-ia-137'])} · fuerzas armadas en conflicto armado: ${Rq('se rigen por el derecho internacional humanitario, no por el Convenio', ['2-ia-123'])}`],
  ['<b>Denuncia (31)</b>', `En cualquier momento, notificándolo al Secretario General; efecto ${Rq('el 1.er día del mes siguiente a 3 meses desde su recepción', ['2-ia-127'])}`]]));

H += cols('⭐ EX · Arts. 27 y 28 — Enmiendas', [
  { t: 'AL CONVENIO (art. 27)', l: [
    `Proponen: ${Rq('cualquiera de las Partes, el Comité de Ministros o la Consulta entre las Partes', ['2-ia-124'])}`,
    'El Secretario General del Consejo de Europa las comunica a las Partes',
    'Las de una Parte o del Comité de Ministros → dictamen de la Consulta entre las Partes → el Comité de Ministros puede aprobarla',
    `Vigor: ${Rq('el trigésimo día siguiente a que TODAS las Partes comuniquen su aceptación', ['2-ia-135'])} al Secretario General`] },
  { t: 'AL ANEXO (art. 28)', l: [
    `Proponen: ${Rq('cualquiera de las Partes o el Comité de Ministros', ['2-13', '2-83'])} (NO la Consulta)`,
    `Solo ${Rq('tratados universales de la ONU, específicos del terrorismo internacional y vigentes', ['2-ia-132'])}`,
    'Aprueba el Comité de Ministros (mayoría del art. 20.d del Estatuto); vigor al año de transmitirse a las Partes',
    `Si ${Rq('un tercio de las Partes', ['2-ia-133'])} objeta → no entra en vigor; si menos → vigor para las que no objetaron`] }])
  + trampa('Al ANEXO no puede proponer enmiendas la Consulta entre las Partes (al Convenio, sí).');

H += arbol('Arts. 29 y 30 — Controversias y Consulta entre las Partes', 'Solución y seguimiento', [
  `<b>Controversias (29):</b> negociación u otro medio pacífico, incluido un ${Rq('tribunal de arbitraje', ['2-ia-125'])} (decisiones vinculantes) ${Rq('o el Tribunal Internacional de Justicia', ['2-ia-125'])}, de común acuerdo`,
  '<b>Consulta entre las Partes (30):</b> periódica · a) mejorar la aplicación · b) opinar sobre negativas de extradición del 20.8 · c) proponer enmiendas · d) opinar sobre enmiendas · e) cualquier cuestión de aplicación',
  `La convoca el ${Rq('Secretario General del Consejo de Europa cuando lo considere necesario y, en todo caso, si lo pide la mayoría de las Partes o el Comité de Ministros', ['2-ia-126'])}`]);

// ======================= 2.3 LEY 10/2010 (fichas k=25..48) =======================
H += bloque('2.3 — LEY 10/2010, DE 28 DE ABRIL, DE PREVENCIÓN DEL BLANQUEO DE CAPITALES Y DE LA FINANCIACIÓN DEL TERRORISMO (actualizada a 30/09/2026)');

H += pon('Nueva actualización del 30/09/2026', arbol('🆕 Novedad 30/09/2026 — Real Decreto-ley 25/2026, de 29 de septiembre', 'De «moneda virtual» a CRIPTOACTIVOS', [
  `<b>Modifica:</b> art. 1 (apdos. 5, 6 y 7) · art. 2, ${Rq('letra z)', ['2-ia-322'])} · art. 13 · art. 45.4, ${Rq('letra l)', ['2-ia-335'])} · art. 52.5`,
  '<b>Definiciones nuevas:</b> criptoactivo (1.5), proveedor de servicios de criptoactivos (1.6) y dirección autoalojada (1.7) → ver el art. 1',
  '<b>Nuevo sujeto obligado:</b> letra z) proveedores de servicios de criptoactivos · «entidades financieras» = letras a) a i) y z)']));

H += pon('Artículo 1 — Objeto, definiciones', arbol('⭐ EX · Art. 1 — Blanqueo de capitales y financiación del terrorismo', `Objeto: ${Rq('protección de la integridad del sistema financiero y de otros sectores de actividad económica', ['2-ia-143'])}, mediante obligaciones de prevención del blanqueo de capitales y de la financiación del terrorismo`, [
  `<b>Blanqueo (1.2):</b> a) ${Rq('conversión o transferencia de bienes, a sabiendas de que proceden de una actividad delictiva', ['2-ia-17', '2-45'])}, ${Rq('con el propósito de ocultar o encubrir su origen ilícito o ayudar a eludir las consecuencias jurídicas', ['2-ia-17'])} · b) ${Rq('ocultación o encubrimiento de su naturaleza, origen, localización, disposición, movimiento o propiedad real', ['2-45'])} · c) adquisición, posesión o utilización, a sabiendas, en el momento de la recepción · d) participación, asociación, ${Rq('tentativas', ['2-ia-167'])} y ayudar, instigar o aconsejar. Hay blanqueo aunque lo haga quien cometió la actividad delictiva y aunque ésta se desarrollara en el territorio de otro Estado`,
  `<b>Bienes procedentes de una actividad delictiva:</b> ${Rq('todo tipo de activos cuya adquisición o posesión tenga su origen en un delito, tanto materiales como inmateriales', ['2-ia-144'])}, muebles o inmuebles, tangibles o intangibles, y documentos o instrumentos jurídicos; con inclusión de la cuota defraudada en los delitos contra la Hacienda Pública`,
  `<b>Financiación del terrorismo (1.3):</b> ${Rq('suministro, depósito, distribución o recogida de fondos o bienes, por cualquier medio', ['2-ia-18'])}, de forma directa o indirecta, ${Rq('con la intención o con el conocimiento de que serán utilizados', ['2-ia-18'])}, íntegramente o en parte, para delitos de terrorismo del Código Penal; también si se hizo en el territorio de otro Estado`,
  `<b>Países terceros equivalentes (1.4):</b> ${Rq('Se considerarán países terceros equivalentes', ['2-126'])} los que, por establecer requisitos equivalentes, determine la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias, a propuesta de su Secretaría; la calificación se entiende ${Rq('sin efecto retroactivo', ['2-23'])}; lista actualizada en la web de la ${Rq('Secretaría General del Tesoro y Financiación Internacional', ['2-9', '2-80'])}`,
  `<b>🆕 ${Rq('Criptoactivo', ['2-ia-150'])} (1.5):</b> ${Rq('representación digital de un valor o de un derecho que puede transferirse y almacenarse electrónicamente', ['2-ia-320'])}, ${Rq('mediante la tecnología de registro distribuido o una tecnología similar', ['2-ia-325'])}; art. 3.1, punto 5, del ${Rq('Reglamento (UE) 2023/1114, de 31 de mayo de 2023', ['2-ia-327'])} (MiCA); excepto ${Rq('las categorías del art. 2, apartados 2, 3 y 4, de ese Reglamento o lo que cumpla los requisitos para ser considerado fondos', ['2-ia-344'])}`,
  `<b>🆕 Proveedor de servicios de criptoactivos (1.6):</b> ${Rq('persona jurídica u otra empresa que presta profesionalmente servicios de criptoactivos a clientes y está autorizada a prestarlos', ['2-ia-326'])} (Reglamento 2023/1114, art. 3.1, ${Rq('puntos 15 y 16', ['2-ia-338'])}); excepto ${Rq('el asesoramiento sobre criptoactivos del art. 3, apartado 1, punto 16, letra h)', ['2-ia-340'])}`,
  `<b>🆕 Dirección autoalojada (1.7):</b> definida en el ${Rq('art. 3, punto 20', ['2-ia-339'])} del ${Rq('Reglamento (UE) 2023/1113, de 31 de mayo de 2023', ['2-ia-321'])}, que modifica la ${Rq('Directiva (UE) 2015/849', ['2-ia-328'])}`]));

H += pon('Artículo 2 — Sujetos obligados', arbol('⭐ EX · Art. 2 — Sujetos obligados', 'Se aplica a… (art. 2.1)', [
  '<b>Financieros:</b> a) entidades de crédito · b) aseguradoras del ramo de vida · c) empresas de servicios de inversión · h) entidades de dinero electrónico y de pago · i) cambio de moneda · 🆕 z) proveedores de servicios de criptoactivos → «entidades financieras» = a) a i) y z)',
  `<b>Profesionales:</b> m) Los auditores de cuentas, ${Rq('así como los contables externos y asesores fiscales', ['2-ia-146'])} · n) ${Rq('los notarios y los registradores de la propiedad, mercantiles y de bienes muebles', ['2-ia-19'])} · ñ) abogados, procuradores y otros independientes cuando participen en operaciones por cuenta de clientes`,
  '<b>Bienes y juego:</b> l) promotores e intermediarios inmobiliarios (y arrendamientos de ≥ 120.000 €/año o ≥ 10.000 €/mes) · p) casinos de juego · q) joyas, piedras o metales preciosos · r) objetos de arte o antigüedades (también en puertos francos) · u) loterías y juegos de azar',
  '<b>Otros:</b> j) servicios postales (giros y transferencias) · v) personas físicas que muevan medios de pago (art. 34) · w) comercio profesional de bienes (art. 38) · x) fundaciones y asociaciones (art. 39) · y) gestores de sistemas de pago']))
  + trampa(`NO son sujetos obligados ${Rq('los centros docentes y las universidades', ['2-16'])}.`);

H += pon('Artículos 3 y 4 — Identificación', arbol('Arts. 3 y 4 — Identificación del cliente y del titular real', 'Identificar a quien quiera establecer relaciones de negocio u operar', [
  `Comprobar su identidad ${Rq('mediante documentos fehacientes', ['2-ia-151'])}, antes de la relación`,
  `<b>Prohibido:</b> ${Rq('cuentas, libretas, cajas de seguridad, activos o instrumentos numerados, cifrados, anónimos o con nombres ficticios', ['2-ia-20'])}`,
  `<b>Titular real (4.2):</b> a) la persona física por cuya cuenta se opera · b) quien posea o controle ${Rq('más del 25 %', ['2-ia-21'])} del capital o de los derechos de voto · c) fideicomisos (trust): ${Rq('TODOS: fideicomitente, fiduciario, protector, beneficiarios y cualquier otra persona física con el control último', ['2-64', '2-ia-181'])}`]));

H += pon('Artículo 14 — Personas', cuadro('Arts. 12 a 14 — Diligencia debida: datos clave', ['', 'DATO'], [
  ['<b>No presencial (12)</b>', `Firma electrónica cualificada: sin copia del documento; si no, copia en ${Rq('un mes', ['2-ia-168'])}`],
  ['<b>PRP (14)</b>', `No incluye ${Rq('empleados públicos de niveles intermedios o inferiores', ['2-ia-26'])} · allegado: ${Rq('persona física de la que sea notorio que tiene relaciones empresariales estrechas', ['2-ia-163'])} con la PRP · al cesar: medidas ${Rq('2 años', ['2-ia-182'])} más`]]));

H += pon('Artículo 13 — Corresponsalía', cols('⭐ EX · 🆕 Art. 13 — Corresponsalía transfronteriza', [
  { t: 'QUÉ ES (13.1)', l: [
    'Servicios bancarios de un banco corresponsal a otro banco cliente',
    `🆕 Incluye las relaciones ${Rq('entre entidades de crédito, entre entidades financieras y entre ambas', ['2-ia-329'])} (también de pago) para valores, transferencias de fondos y ${Rq('operaciones o transferencias de criptoactivos', ['2-ia-329'])}`] },
  { t: 'TERCEROS PAÍSES (13.2) · entidades financieras', l: [
    'a) información sobre la entidad cliente, su reputación y supervisión',
    'b) evaluar sus controles contra el blanqueo',
    `c) ${Rq('autorización de la dirección antes de establecer nuevas relaciones', ['2-ia-162', '2-ia-341'])}`,
    'd) documentar las responsabilidades · e) seguimiento reforzado y permanente',
    `🆕 f) ${Rq('cuentas de transferencias de pago en otras plazas', ['2-ia-346'])}: que la cliente identifique y aplique la diligencia a los clientes con acceso directo y pueda dar sus datos`] },
  { t: '🆕 CRIPTOACTIVOS (13.2 bis)', l: [
    `Corresponsalía ${Rq('con una entidad cliente no establecida en la UE que preste servicios equivalentes', ['2-ia-334'])}`,
    `Los proveedores ${Rq('comprueban que está autorizada o registrada', ['2-ia-330'])}`,
    `Actualizan la diligencia ${Rq('periódicamente o cuando surjan nuevos riesgos', ['2-ia-331'])}`,
    `Usan esa información ${Rq('para fijar, según el riesgo, medidas que mitiguen los riesgos', ['2-ia-332'])}`] },
  { t: 'PROHIBIDO Y DEBER', l: [
    `13.3 Entidades financieras: nada con ${Rq('bancos pantalla', ['2-ia-25', '2-ia-343'])} (sin presencia física con verdadera gestión y dirección y no filial de un grupo regulado)`,
    `13.4 Entidades financieras y proveedores de criptoactivos: ${Rq('nada que, directamente o por subcuenta, permita operar a los clientes de la entidad representada', ['2-ia-333', '2-ia-343'])}`,
    `13.5 Si la terminan por blanqueo: ${Rq('documentan y registran su decisión', ['2-ia-323'])}`] }]));

H += pon('Artículos 17 y 18 — Examen', flujo('Arts. 17, 18 y 22 a 25 — Examen especial, comunicación y conservación', [
  { et: 'ART. 17', t: `Examen especial de ${Rq('cualquier hecho u operación, sea cual sea su cuantía, que pueda estar relacionado con el blanqueo o la financiación del terrorismo', ['2-ia-153'])} (complejo, inusual, sin propósito económico o lícito aparente, simulación o fraude); resultado por escrito` },
  { et: 'ART. 18', t: 'Comunicación POR INICIATIVA PROPIA al Servicio Ejecutivo de la Comisión si hay indicio o certeza, incluso de la mera tentativa · si la empresa no informa al empleado del curso dado a su aviso interno, este puede comunicarlo directamente' },
  { bif: [
    { c: 'si', et: 'ART. 23', t: `Comunicar de ${Rq('buena fe', ['2-ia-183'])} ${Rq('no viola las restricciones de divulgación ni genera ningún tipo de responsabilidad', ['2-ia-183'])}` },
    { c: 'no', et: 'ART. 24', t: `NO revelar al cliente ni a terceros que se ha comunicado · excepción: ${Rq('entre sujetos obligados del mismo grupo', ['2-ia-158'])}` }] },
  { et: 'ART. 22', t: `Abogados: ${Rq('no sujetos a los arts. 7.3, 18 y 21', ['2-ia-172'])} por la información obtenida al determinar la posición jurídica del cliente o ${Rq('defenderlo en procesos judiciales', ['2-ia-172'])}; secreto profesional` },
  { c: 'si', et: 'ART. 25 ⭐', t: `Conservar la documentación ${Rq('10 años', ['2-68', '2-ia-145'])} y luego eliminarla · a los ${Rq('5 años', ['2-ia-159'])} del fin de la relación, solo accesible por los ${Rq('órganos de control interno', ['2-ia-159'])}` }]));

H += pon('Artículos 34 y 35', cuadro('Arts. 34 y 35 — Declaración e intervención de medios de pago', ['', 'DATO'], [
  ['<b>Declaración previa (34.1)</b>', `Personas físicas: salida o entrada en territorio nacional de medios de pago por importe igual o superior a 10.000 euros · movimientos por territorio nacional por importe igual o superior a ${Rq('100.000 euros', ['2-ia-148'])}`],
  ['<b>Envíos sin portador (34.2)</b>', 'Importe igual o superior a 10.000 euros: declaración dentro del plazo de 30 días anteriores al movimiento no acompañado'],
  ['<b>Intervención (35.2)</b>', `Procede ${Rq('la intervención provisional de la totalidad de los medios de pago, salvo el mínimo de supervivencia', ['2-ia-161'])}, por funcionarios aduaneros o policiales, si: a) no se presenta la declaración previa preceptiva · c) variación por exceso o defecto del importe declarado respecto del real en más de ${Rq('un 10 por ciento o de 3.000 euros', ['2-103'])}`]]));

H += pon('Artículos 38 y 39', cuadro('Arts. 38 y 39 — Comercio de bienes, fundaciones y asociaciones', ['', 'DATO'], [
  ['<b>Comercio profesional de bienes (38)</b>', `Sujetos a los arts. 3, 17, 18, 19, 21, 24 y 25 en las transacciones en que los ${Rq('cobros o pagos se efectúen por personas físicas no residentes con los medios de pago del art. 34.2 y por importe superior a 10.000 euros', ['2-104', '2-ia-189'])}`],
  ['<b>Fundaciones y asociaciones (39)</b>', `${Rq('El Protectorado y el Patronato, así como el personal con responsabilidades en la gestión de las fundaciones', ['2-ia-354'])}, ${Rq('velarán para que no se usen para el blanqueo de capitales ni para canalizar fondos a grupos u organizaciones terroristas', ['2-ia-154'])} · igual para las asociaciones`]]));

H += pon('Artículo 43', arbol('⭐ EX · Art. 43 — Fichero de Titularidades Financieras', 'Entidades de crédito, de dinero electrónico y de pago declaran al SEPBLAC la apertura o cancelación de cuentas y el alquiler de cajas de seguridad', [
  `Fichero: ${Rq('Fichero de Titularidades Financieras', ['2-2', '2-73'])}, de titularidad pública`,
  `Responsable: ${Rq('Secretaría de Estado de Economía y Apoyo a la Empresa', ['2-ia-147'])} · encargado del tratamiento: ${Rq('el Servicio Ejecutivo de la Comisión', ['2-36'])}, que fija sus características técnicas y aprueba instrucciones`,
  `Acceso (investigación de blanqueo o financiación del terrorismo): ${Rq('órganos jurisdiccionales, Ministerio Fiscal', ['2-ia-187'])} y Fiscalía Europea · ${Rq('FCSE y Policías Autonómicas para delitos graves', ['2-ia-187'])} · ${Rq('CNI', ['2-ia-187'])} · AEAT · petición motivada; registro de accesos 5 años`]))
  + `<div class="ex-linea"><b>Registro de Titularidades Reales (disp. adicional):</b> central y único, ${Rq('en el Ministerio de Justicia', ['2-37'])}, que lo gestiona.</div>`;

H += pon('Artículo 44 —', arbol('⭐ EX · Arts. 44 a 49 — Organización institucional', 'COMISIÓN DE PREVENCIÓN DEL BLANQUEO DE CAPITALES E INFRACCIONES MONETARIAS: impulsa y coordina la ejecución de la ley', [
  `Depende de la ${Rq('Secretaría de Estado de Economía', ['2-51'])} · ${Rq('la preside el Secretario de Estado de Economía', ['2-ia-166'])} · Pleno o Comité Permanente (lo preside el DG del Tesoro y Política Financiera) · asistencia personal e indelegable`,
  `<b>Funciones:</b> nombra y cesa al Director del Servicio Ejecutivo y aprueba su presupuesto (previa consulta al Banco de España) · aprueba, ${Rq('a propuesta del Servicio Ejecutivo', ['2-ia-184'])}, el ${Rq('Plan Anual de Inspección', ['2-ia-184'])} (reservado)`,
  '<b>Secretaría de la Comisión:</b> instruye los procedimientos sancionadores',
  `<b>Servicio Ejecutivo (SEPBLAC):</b> ${Rq('ejerce de Unidad de Inteligencia Financiera', ['2-55'])} · auxilia a jueces, Fiscal y Policía Judicial · recibe y analiza las comunicaciones (arts. 18 y 20) · supervisa e inspecciona · 🆕 ${Rq('l) informa sobre las medidas de control interno en la autorización de proveedores de criptoactivos', ['2-ia-324', '2-ia-335'])}`,
  `<b>Informes de inteligencia financiera (46):</b> SEPBLAC independiente y autónomo · ${Rq('sin valor probatorio; no se incorporan directamente a diligencias judiciales o administrativas', ['2-ia-185'])}`,
  `<b>Secreto (49):</b> quien trabaje o haya trabajado para la Comisión ${Rq('mantiene el debido secreto', ['2-30'])}, incluso tras cesar, salvo permiso expreso de la Comisión`]));

H += pon('Artículos 52 y 55', cols(`⭐ EX · Arts. 50 a 52 — Infracciones: muy graves, graves y leves`, [
  { t: 'MUY GRAVES (51)', l: [
    `No comunicar por indicio (art. 18) ${Rq('cuando un empleado lo puso de manifiesto internamente', ['2-ia-174'])}`,
    'No colaborar pese a requerimiento escrito de la Comisión · revelar la comunicación (art. 24)',
    `Resistencia u obstrucción a la inspección ${Rq('con requerimiento expreso y por escrito', ['2-ia-180'])}`,
    'Voluntad deliberadamente rebelde al cumplimiento',
    `${Rq('Una grave si en los 5 años anteriores hubo sanción firme por el mismo tipo', ['2-ia-178'])}`] },
  { t: 'GRAVES (52)', l: [
    `No comunicar por indicio ${Rq('cuando no sea muy grave', ['2-ia-149'])}`,
    `No ${Rq('mantener la confidencialidad de quien comunicó a control interno', ['2-ia-165'])}`,
    'Resistencia u obstrucción a la inspección SIN requerimiento escrito',
    `🆕 52.5: ${Rq('incumplir el art. 29 del Reglamento (UE) 2023/1113', ['2-ia-336', '2-ia-342'])} y sus ${Rq('arts. 4 a 24 y 26', ['2-ia-337'])} (proveedores de servicios de pago y de criptoactivos)`] }])
  + `<div class="ex-linea">Las infracciones se clasifican en ${Rq('muy graves, graves y leves', ['2-52'])} (art. 50) · <b>sociedades disueltas (art. 55):</b> ${Rq('los antiguos socios responden solidariamente hasta lo recibido como cuota de liquidación', ['2-ia-171'])}.</div>`);

H += cuadro('⭐ EX · Arts. 56 a 58 — Sanciones', ['', 'MUY GRAVES', 'GRAVES', 'LEVES'], [
  ['<b>Multa al sujeto obligado</b>', `mín. ${Rq('150.000 €', ['2-ia-155'])} · máx. la mayor: 10 % del volumen de negocios, duplo de la operación, ${Rq('quíntuplo de los beneficios', ['2-ia-179'])} o 10.000.000 €`, 'mín. 60.000 € · máx. la mayor: 10 % del volumen, tanto + 50 %, triple de los beneficios o 5.000.000 €', Rq('hasta 60.000 €', ['2-12', '2-49'])],
  ['<b>Además</b>', 'amonestación pública · suspensión temporal o revocación de la autorización', Rq('amonestación pública o privada · suspensión temporal', ['2-39']), 'amonestación privada'],
  ['<b>Cargos de administración o dirección</b>', 'multa de 60.000 a 10.000.000 € · separación con inhabilitación hasta 10 años · amonestación pública', Rq('multa de 3.000 a 5.000.000 € · amonestación · separación con inhabilitación hasta 5 años', ['2-ia-169']), '—']]);

H += pon('Artículos 60 y 61', cuadro('⭐ EX · Arts. 60 a 63 — Prescripción y procedimiento', ['', 'MUY GRAVES', 'GRAVES', 'LEVES'], [
  ['<b>Prescriben las infracciones</b>', P('5 años'), P('5 años'), P('2 años')],
  ['<b>Prescriben las sanciones</b>', P('3 años'), Rq('2 años', ['2-ia-177']), P('1 año')],
  ['<b>Imponen la sanción</b>', `${Rq('Consejo de Ministros', ['2-ia-175'])} (propone el Ministro de Economía)`, 'Ministro de Economía', 'DG del Tesoro y Política Financiera']])
  + `<div class="ex-linea">Cómputo: desde la comisión; en diligencia debida, ${Rq('desde la terminación de la relación de negocios', ['2-ia-176'])} · incoa el Comité Permanente (propone la Secretaría) · ${Rq('instruye la Secretaría de la Comisión', ['2-ia-170'])} · resolver en ${Rq('un año', ['2-21', '2-ia-164'])} desde la notificación de la incoación (+6 meses de ampliación) · si el Fiscal no ve delito, ${Rq('lo comunica a la Secretaría para seguir el procedimiento sancionador', ['2-ia-188'])} (62) · el canal de comunicación de infracciones lo aprueba por orden el ${Rq('Ministro de Economía y Empresa', ['2-26'])} (63)</div>`)
  + trampa('Prescripción Ley 10/2010: infracciones 5-5-2 y sanciones 3-2-1 (no confundir con la Ley 19/2003: 5-3-1 y 5-4-3).');

// ======================= 2.4 CONVENCIÓN DE PALERMO (fichas k=49..61) =======================
H += bloque('2.4 — CONVENCIÓN DE LAS NACIONES UNIDAS CONTRA LA DELINCUENCIA ORGANIZADA TRANSNACIONAL (PALERMO) · Nueva York, 15-11-2000');

H += pon('Artículos 1 y 2 — Finalidad y definiciones', arbol('⭐ EX · Arts. 1 y 2 — Finalidad y definiciones', `Finalidad: ${Rq('promover la cooperación para prevenir y combatir más eficazmente la delincuencia organizada transnacional', ['2-ia-190'])}`, [
  `<b>Grupo delictivo organizado:</b> grupo estructurado de ${Rq('tres o más personas, que exista durante cierto tiempo y actúe concertadamente', ['2-ia-27'])} para cometer delitos graves o de la Convención ${Rq('para obtener, directa o indirectamente, un beneficio económico u otro de orden material', ['2-ia-27'])}`,
  `<b>Delito grave:</b> privación de libertad máxima de ${Rq('al menos 4 años o pena más grave', ['2-ia-28'])}`,
  '<b>Grupo estructurado:</b> no formado fortuitamente para cometer inmediatamente un delito',
  `<b>Bienes:</b> ${Rq('activos de cualquier tipo, corporales o incorporales, muebles o inmuebles, tangibles o intangibles', ['2-ia-199'])} y sus documentos`,
  '<b>Producto del delito:</b> bienes derivados u obtenidos, directa o indirectamente, de un delito',
  `<b>Embargo preventivo / incautación:</b> ${Rq('prohibición TEMPORAL de transferir, convertir, enajenar o mover bienes, o su custodia o control temporales, por mandamiento de un tribunal u otra autoridad competente', ['2-65'])}`,
  `<b>Decomiso:</b> ${Rq('privación con carácter DEFINITIVO de bienes por decisión de un tribunal', ['2-ia-191'])} u otra autoridad competente`,
  '<b>Delito determinante:</b> aquel cuyo producto puede ser objeto del delito de blanqueo (art. 6)',
  `<b>${Rq('Entrega vigilada', ['2-ia-194'])}:</b> dejar que remesas ilícitas o sospechosas salgan, atraviesen o entren en el territorio, con conocimiento y bajo supervisión de las autoridades, para investigar e identificar a los implicados`]))
  + trampa('Embargo preventivo o incautación = TEMPORAL; decomiso = DEFINITIVO.');

H += arbol('Arts. 3 y 4 — Ámbito de aplicación y soberanía', 'Se aplica a los delitos de los arts. 5, 6, 8 y 23 y a los delitos graves, si son TRANSNACIONALES y hay un GRUPO DELICTIVO ORGANIZADO', [
  '<b>Transnacional (3.2):</b> a) se comete en más de un Estado',
  `b) en uno solo, pero ${Rq('una parte sustancial de su preparación, planificación, dirección o control se realiza en otro', ['2-ia-200'])}`,
  'c) en uno solo, pero con un grupo delictivo organizado que actúa en más de un Estado',
  `d) en uno solo, pero ${Rq('con efectos sustanciales en otro Estado', ['2-ia-29'])}`,
  `<b>Art. 4:</b> igualdad soberana, integridad territorial y ${Rq('no intervención en los asuntos internos', ['2-ia-192'])} (${Rq('protección de la soberanía', ['2-ia-192'])}); ningún Estado ejerce en otro funciones reservadas a sus autoridades`]);

H += pon('Artículo 5 — Penalización de la participación', arbol('Art. 5 — Participación en un grupo delictivo organizado', `Tipificar, ${Rq('cuando se cometan intencionalmente', ['2-ia-193'])}:`, [
  `a.i) ${Rq('el acuerdo con una o más personas de cometer un delito grave con un propósito relacionado con un beneficio económico u otro de orden material', ['2-ia-30'])}`,
  'a.ii) participar activamente, a sabiendas de la finalidad y actividad delictiva del grupo, en sus actividades ilícitas',
  'b) organizar, dirigir, ayudar, incitar, facilitar o asesorar la comisión de un delito grave con participación del grupo',
  `El conocimiento, la intención o el acuerdo ${Rq('pueden inferirse de circunstancias fácticas objetivas', ['2-ia-201'])} (5.2)`,
  `Si su derecho exige un acto para llevar adelante el acuerdo: ${Rq('lo notifican al Secretario General de la ONU al firmar o depositar el instrumento', ['2-ia-219'])} (5.3)`]));

H += pon('Artículos 8, 10 y 11', cuadro('Arts. 6 a 11 — Blanqueo, corrupción, personas jurídicas y proceso', ['', 'DATO'], [
  ['<b>Blanqueo (6)</b>', `${Rq('Conversión o transferencia de bienes, a sabiendas de que son producto del delito, para ocultar o disimular su origen ilícito', ['2-ia-31'])} o ayudar a eludir las consecuencias · ocultación de su naturaleza, origen, ubicación…`],
  ['<b>Delito determinante cometido fuera (6.2.c)</b>', `Vale ${Rq('si es delito en el Estado donde se cometió y lo sería también en el que aplica el artículo', ['2-ia-202'])} (doble incriminación) · copia de sus leyes al SG de la ONU · puede excluirse a quien cometió el delito determinante (${Rq('autoblanqueo', ['2-ia-220'])})`],
  ['<b>Medidas contra el blanqueo (7)</b>', `Régimen de reglamentación y supervisión de bancos e instituciones no bancarias · considerar ${Rq('una dependencia de inteligencia financiera: centro nacional de recopilación, análisis y difusión', ['2-ia-32'])} · guía: ${Rq('iniciativas de organizaciones regionales, interregionales y multilaterales', ['2-ia-203'])}`],
  ['<b>Corrupción (8)</b>', `Tipificar ${Rq('la promesa, ofrecimiento o concesión a un funcionario público de un beneficio indebido para que actúe o se abstenga', ['2-ia-33'])} y su solicitud o aceptación · funcionario extranjero o internacional: solo ${Rq('«considerará la posibilidad»', ['2-ia-198'])}`],
  ['<b>Personas jurídicas (10)</b>', `Responsabilidad ${Rq('penal, civil o administrativa', ['2-ia-34'])} · ${Rq('sin perjuicio de la responsabilidad penal de las personas naturales', ['2-ia-195'])} · sanciones eficaces, proporcionadas y disuasivas, incluidas monetarias`],
  ['<b>Proceso (11)</b>', `Libertad en espera de juicio: ${Rq('garantizar la comparecencia del acusado', ['2-ia-204'])} · ${Rq('plazo de prescripción prolongado', ['2-ia-196'])} (y mayor si elude la justicia)`]]));

H += pon('Artículo 15 — Jurisdicción', cuadro('⭐ EX · Arts. 12 a 15 — Decomiso y jurisdicción', ['', 'DATO'], [
  ['<b>Mezclado con bienes lícitos (12.4)</b>', `Decomiso ${Rq('hasta el valor estimado del producto entremezclado', ['2-ia-205'])}`],
  ['<b>Documentos bancarios (12.6)</b>', `Los tribunales pueden ordenar su presentación o incautación; ${Rq('no cabe ampararse en el secreto bancario', ['2-ia-35'])}`],
  ['<b>Cooperación para el decomiso (13)</b>', `Copia de sus leyes ${Rq('al Secretario General de las Naciones Unidas', ['2-3', '2-74'])} · si exigen tratado, la Convención es ${Rq('base de derecho necesaria y suficiente', ['2-ia-206'])}`],
  ['<b>Disposición de los bienes (14)</b>', Rq('Consideración prioritaria a devolverlos al Estado requirente para indemnizar a las víctimas o devolverlos a sus propietarios legítimos', ['2-ia-207'])],
  ['<b>Jurisdicción OBLIGATORIA (15.1)</b>', `Delitos de los arts. 5, 6, 8 y 23 ${Rq('en su territorio o a bordo de un buque de su pabellón', ['2-ia-208'])} o aeronave registrada según sus leyes`],
  ['<b>Jurisdicción FACULTATIVA (15.2)</b>', `${Rq('Contra uno de sus nacionales · cometido por un nacional o por un apátrida con residencia habitual en su territorio', ['2-67'])} · fuera, con miras a un delito grave dentro`],
  ['<b>No extradita a su nacional (15.3)</b>', `Debe establecer su jurisdicción si no lo extradita ${Rq('por el solo hecho de ser nacional suyo', ['2-ia-221'])}`]]));

H += pon('Artículo 18 — Asistencia', cols('⭐ EX · Arts. 16 y 18 — Extradición y asistencia judicial recíproca', [
  { t: 'EXTRADICIÓN (16)', l: [
    `No extradita a su nacional → ${Rq('somete el caso sin demora injustificada a sus autoridades para enjuiciarlo', ['2-ia-36'])}, previa solicitud`,
    `Denegada para cumplir condena por ser nacional → considerar ${Rq('hacer cumplir la condena (o lo que reste) conforme al derecho del requirente', ['2-ia-222'])}`,
    'No obliga si se persigue por sexo, raza, religión, nacionalidad, origen étnico u opiniones políticas',
    `${Rq('No se deniega solo porque haya cuestiones tributarias', ['2-ia-209'])}`,
    `${Rq('Antes de denegar, consulta al Estado requirente', ['2-78', '2-ia-210'])}`,
    `${Rq('Procurarán acuerdos bilaterales y multilaterales', ['2-7'])}`] },
  { t: 'ASISTENCIA JUDICIAL (18)', l: [
    `Información exculpatoria: se puede revelar, ${Rq('notificándolo antes al Estado transmisor', ['2-ia-224'])}`,
    `${Rq('No se invoca el secreto bancario', ['2-70'])} para denegarla (ni se deniega solo por asuntos fiscales); toda denegación, motivada`,
    `Cada Estado designa una ${Rq('autoridad central', ['2-ia-225'])} y la notifica al SG de la ONU`,
    `La solicitud contiene: ${Rq('autoridad que la hace, objeto, resumen de hechos, asistencia pedida, identidad y ubicación de las personas, finalidad', ['2-14', '2-84'])}`,
    `${Rq('Puede diferirse si perturba investigaciones o procesos en curso', ['2-ia-223'])}`,
    `Salvoconducto del testigo: ${Rq('no puede ser enjuiciado ni detenido por hechos anteriores a su salida', ['2-ia-211'])}; cesa a los ${Rq('15 días consecutivos', ['2-ia-212'])} desde que pudo irse`,
    `Gastos ordinarios: ${Rq('el Estado requerido, salvo acuerdo', ['2-ia-233'])}`] }]));

H += pon('Artículos 19 y 20', arbol('Arts. 17 a 37 — Investigación, protección y otras disposiciones', 'Cooperación y protección', [
  '<b>Traslado de condenados (17):</b> acuerdos para que el condenado a pena privativa de libertad la complete en su país',
  `<b>Investigaciones conjuntas (19):</b> órganos mixtos por acuerdo; si no hay, ${Rq('acuerdos caso por caso', ['2-ia-213'])}`,
  `<b>Técnicas especiales (20):</b> entrega vigilada, ${Rq('vigilancia electrónica y operaciones encubiertas', ['2-ia-214'])}`,
  `<b>Testigos (24):</b> protección frente a represalias, también ${Rq('a familiares y personas cercanas', ['2-ia-215'])}, y a las víctimas que declaren`,
  `<b>Víctimas (25):</b> ${Rq('indemnización y restitución', ['2-ia-216'])}`,
  `<b>Colaboradores (26):</b> ${Rq('mitigación de la pena por cooperación sustancial', ['2-ia-217'])} o inmunidad`,
  `<b>Prevención (31.6):</b> al SG de la ONU, ${Rq('el nombre y dirección de la autoridad que puede ayudar a otros Estados a prevenir', ['2-ia-218'])}`,
  `<b>Controversias (35):</b> negociación → arbitraje → si en 6 meses no hay acuerdo, ${Rq('Corte Internacional de Justicia', ['2-ia-232'])} · cabe reserva, que se retira notificándolo al SG`,
  `<b>Protocolos (37):</b> ${Rq('para ser parte en un protocolo hay que serlo en la Convención', ['2-ia-309'])}`]));

H += pon('Artículos 36, 38', cuadro('⭐ EX · Arts. 36 a 41 — Firma, vigor, enmienda, denuncia y depositario', ['', 'DATO'], [
  ['<b>Firma (36)</b>', 'Abierta a todos los Estados del 12 al 15 de diciembre de 2000 en Palermo (Italia) y después en la Sede de las Naciones Unidas en Nueva York hasta el 12 de diciembre de 2002'],
  ['<b>Vigor (38)</b>', `Entra en vigor el nonagésimo día después de la fecha en que se haya depositado el ${Rq('cuadragésimo instrumento', ['2-ia-226'])} (cuarenta instrumentos) de ratificación, aceptación, aprobación o adhesión · para cada Estado que ratifique después: ${Rq('el trigésimo día después de la fecha de depósito de su instrumento', ['2-ia-227'])}`],
  ['<b>Enmiendas (39)</b>', `Cuando hayan transcurrido cinco años desde la entrada en vigor, por escrito al Secretario General · primero consenso; si se agotan las posibilidades, ${Rq('mayoría de dos tercios de los Estados Parte presentes y votantes', ['2-ia-228'])} · entra en vigor respecto de un Estado ${Rq('a los noventa días después de que este deposite su instrumento de ratificación, aceptación o aprobación de la enmienda', ['2-ia-229'])}`],
  ['<b>Denuncia (40)</b>', `Surte efecto un año después de la fecha en que el Secretario General haya recibido la notificación · ${Rq('la denuncia de la Convención entrañará la denuncia de sus protocolos', ['2-ia-230'])}`],
  ['<b>Depositario e idiomas (41)</b>', `${Rq('El Secretario General de las Naciones Unidas', ['2-ia-197'])} · textos en ${Rq('árabe, chino, español, francés, inglés y ruso', ['2-ia-231', '2-ia-110'])}, igualmente auténticos`]]));

// ======================= 2.5 PROTOCOLO DE TRATA (fichas k=62..70) =======================
H += bloque('2.5 — PROTOCOLO PARA PREVENIR, REPRIMIR Y SANCIONAR LA TRATA DE PERSONAS, ESPECIALMENTE MUJERES Y NIÑOS');

H += arbol('Arts. 1 y 2 — Relación con la Convención y fines', `Protocolo de trata (Nueva York, 15-11-2000 · en vigor para España el ${Rq('25-12-2003', ['2-ia-246'])})`, [
  `${Rq('Complementa la Convención de Palermo', ['2-ia-234'])} y ${Rq('se interpreta juntamente con ella', ['2-ia-247'])}`,
  `La Convención se aplica ${Rq('mutatis mutandis, salvo que el Protocolo disponga otra cosa', ['2-ia-268'])}`,
  `Los delitos del art. 5 ${Rq('se consideran delitos de la Convención', ['2-ia-276'])}`,
  `<b>Fines (2):</b> a) prevenir y combatir la trata, con ${Rq('especial atención a las mujeres y los niños', ['2-ia-262'])} · b) ${Rq('proteger y ayudar a las víctimas, respetando sus derechos humanos', ['2-ia-235'])} · c) cooperación entre Estados`]);

H += pon('Artículos 3 y 4 — Definiciones y ámbito', flujo('Art. 3 — Trata = ACCIÓN + MEDIO + FIN de explotación', [
  { et: 'ACCIÓN', t: Rq('captación, transporte, traslado, acogida o recepción de personas', ['2-ia-236']) },
  { et: 'MEDIO', t: 'amenaza, fuerza u otra coacción, rapto, fraude, engaño, abuso de poder o de una situación de vulnerabilidad, pagos o beneficios' },
  { et: 'FIN', t: `explotación, como mínimo: ${Rq('prostitución ajena u otra explotación sexual, trabajos o servicios forzados, esclavitud o prácticas análogas, servidumbre o extracción de órganos', ['2-ia-248'])}` },
  { bif: [
    { c: 'no', et: 'CONSENTIMIENTO', t: `${Rq('no se tiene en cuenta', ['2-ia-239'])} si se usó alguno de esos medios` },
    { c: 'si', et: 'NIÑO', t: `(${Rq('menor de 18 años', ['2-ia-237'])}): es trata ${Rq('aunque no se use ningún medio', ['2-ia-240'])}` }] }]));

H += pon('Artículos 3 y 4 — Definiciones y ámbito', arbol('Arts. 4 y 5 — Ámbito y penalización', 'El Protocolo se aplica a…', [
  `${Rq('Delitos transnacionales con participación de un grupo delictivo organizado', ['2-ia-249'])} y a la protección de sus víctimas (art. 4)`,
  `<b>Art. 5:</b> tipificar las conductas del art. 3 ${Rq('cuando se cometan intencionalmente', ['2-ia-238'])} · también ${Rq('la tentativa', ['2-ia-37'])} (según su ordenamiento), la complicidad y organizar o dirigir a otros`]));

H += pon('Artículo 8 — Repatriación', cols('⭐ EX · Arts. 6 a 8 — Víctimas: protección, permanencia y repatriación', [
  { t: 'PROTECCIÓN Y ASISTENCIA (6)', l: [
    `Privacidad e identidad: ${Rq('confidencialidad de las actuaciones judiciales', ['2-ia-38'])}`,
    `Sus opiniones se examinan en el proceso penal ${Rq('sin menoscabo de los derechos de la defensa', ['2-ia-250'])}`,
    `Recuperación física, psicológica y social (considerará): ${Rq('a) alojamiento adecuado · b) asesoramiento e información en un idioma que entiendan · c) asistencia médica, psicológica y material · d) empleo, educación y capacitación', ['2-31', '2-ia-241'])}`,
    `Tener en cuenta ${Rq('la edad, el sexo y las necesidades especiales', ['2-ia-264'])} (sobre todo de los niños) · su seguridad física`,
    `Posibilidad de ${Rq('obtener indemnización por los daños sufridos', ['2-ia-261'])} (velará)`] },
  { t: 'ESTADO RECEPTOR (7)', l: [
    `Considerará ${Rq('permitirles permanecer en su territorio, temporal o permanentemente', ['2-ia-251'])}`,
    `Con debida consideración a ${Rq('factores humanitarios y personales', ['2-ia-252'])}`] },
  { t: 'REPATRIACIÓN (8)', l: [
    `El Estado de nacionalidad o residencia permanente ${Rq('la facilita y acepta sin demora indebida o injustificada, teniendo en cuenta su seguridad', ['2-ia-39'])}`,
    `${Rq('Preferentemente voluntaria', ['2-ia-253'])}`,
    `A solicitud del receptor, ${Rq('el Estado requerido verifica', ['2-ia-243'])} si es nacional o residente`,
    `Sin documentación: el Estado de nacionalidad ${Rq('expide, previa solicitud del receptor, los documentos de viaje', ['2-ia-271'])}`] }]));

H += pon('Artículos 11, 12 y 13', cuadro('Arts. 9 a 13 — Prevención, información y fronteras', ['', 'DATO'], [
  ['<b>Prevención (9)</b>', `${Rq('Mitigar la pobreza, el subdesarrollo y la falta de oportunidades equitativas', ['2-ia-40'])} que hacen vulnerables a mujeres y niños · ${Rq('medidas educativas, sociales y culturales para desalentar la demanda', ['2-ia-260'])}`],
  ['<b>Capacitación (10.2)</b>', `A los funcionarios: ${Rq('métodos para prevenir la trata, enjuiciar a los traficantes y proteger los derechos de las víctimas', ['2-ia-255'])}`],
  ['<b>Información (10.3)</b>', Rq('El receptor cumple las restricciones de uso que pida quien la facilita', ['2-ia-272'])],
  ['<b>Fronteras (11)</b>', `Reforzar ${Rq('los controles fronterizos necesarios', ['2-ia-242'])} · prevenir el uso de ${Rq('medios de transporte de transportistas comerciales', ['2-ia-41'])} · el transportista ${Rq('se cerciora de que todos los pasajeros llevan los documentos de viaje', ['2-ia-254'])} · se puede ${Rq('denegar la entrada o revocar visados', ['2-ia-256'])} a los implicados`],
  ['<b>Documentos (12 y 13)</b>', `Calidad para ${Rq('que no se usen indebidamente ni se falsifiquen', ['2-ia-244'])} · a petición de otro Estado, verificar su validez ${Rq('conforme a su derecho interno', ['2-ia-277'])} y ${Rq('en un plazo razonable', ['2-ia-257'])}`]]));

H += pon('Artículos 14 y 15 — Cláusula de salvaguardia', cuadro('⭐ EX · Arts. 14 a 20 — Salvaguardia, controversias y cláusulas finales', ['', 'DATO'], [
  ['<b>Salvaguardia (14)</b>', `Respeta el derecho internacional, la Convención de Refugiados (1951/1967) y el principio de ${Rq('non-refoulement', ['2-ia-245'])} (no devolución)`],
  ['<b>Controversias (15)</b>', `${Rq('Negociación', ['2-ia-258'])} → arbitraje → a los 6 meses sin acuerdo, ${Rq('Corte Internacional de Justicia', ['2-ia-259'])} · reservas: Laos (${Rq('consentimiento de todas las partes', ['2-ia-273'])}), ${Rq('Túnez', ['2-ia-274'])} (consentimiento previo), Ecuador y Lituania`],
  ['<b>Firma (16)</b>', `Palermo 12-15/12/2000; Nueva York ${Rq('hasta el 12-12-2002', ['2-ia-265'])} · organizaciones regionales: ${Rq('si al menos uno de sus Estados lo ha firmado', ['2-ia-266'])}`],
  ['<b>Vigor (17)</b>', `Día 90 tras el 40.º instrumento, ${Rq('nunca antes que la Convención', ['2-ia-267'])} · España: 25-12-2003`],
  ['<b>Enmiendas (18)</b>', `${Rq('A los 5 años de su vigor', ['2-ia-269'])}, por escrito al ${Rq('Secretario General de la ONU', ['2-19', '2-88'])} · consenso o 2/3 de presentes y votantes · organizaciones regionales: ${Rq('tantos votos como Estados miembros Partes', ['2-ia-270'])} · vigor: 90 días tras ratificarla`],
  ['<b>Denuncia (19)</b>', `${Rq('Efecto al año de recibirla el SG', ['2-ia-263'])} · una organización regional ${Rq('deja de ser Parte cuando la denuncien todos sus Estados', ['2-ia-275'])}`],
  ['<b>Depositario (20)</b>', Rq('Secretario General de las Naciones Unidas', ['2-71'])]]));

// ======================= 2.6 PROTOCOLO DE MIGRANTES (fichas k=71..77) =======================
H += bloque('2.6 — PROTOCOLO CONTRA EL TRÁFICO ILÍCITO DE MIGRANTES POR TIERRA, MAR Y AIRE');

H += pon('Artículos 1 a 5', arbol('Arts. 1 a 6 — Tráfico ilícito de migrantes', 'Complementa la Convención de Palermo · propósito: prevenir y combatir el tráfico y cooperar, protegiendo los derechos de los migrantes', [
  `<b>Tráfico ilícito (3.a):</b> facilitar la entrada ilegal de una persona en un Estado del que no es nacional ni residente permanente, ${Rq('para obtener, directa o indirectamente, un beneficio financiero u otro de orden material', ['2-ia-42'])}`,
  `<b>Entrada ilegal:</b> ${Rq('paso de fronteras sin cumplir los requisitos para entrar legalmente en el Estado receptor', ['2-ia-278'])}`,
  `<b>Documento falso:</b> i) elaborado de forma espuria o alterado · ii) ${Rq('expedido u obtenido indebidamente mediante declaración falsa, corrupción o coacción', ['2-ia-286'])} · iii) usado por quien no es su titular`,
  `<b>Buque:</b> ${Rq('cualquier embarcación, incluidas las sin desplazamiento y los hidroaviones', ['2-ia-281'])}, salvo buques de guerra`,
  `<b>Ámbito (4):</b> ${Rq('delitos transnacionales con participación de un grupo delictivo organizado', ['2-ia-283'])} · sus delitos ${Rq('se consideran delitos de la Convención', ['2-ia-310'])}`,
  `<b>Migrantes (5):</b> ${Rq('no son enjuiciados penalmente por haber sido objeto del tráfico', ['2-ia-43'])}`,
  `<b>Delitos (6):</b> tráfico; crear, facilitar, suministrar o poseer documentos falsos para posibilitarlo; habilitar la permanencia ilegal (intencionalmente y con ánimo de beneficio) · agravante: ${Rq('poner o poder poner en peligro la vida o la seguridad de los migrantes', ['2-ia-44'])} o trato inhumano o degradante`]))
  + trampa('Tráfico de migrantes ≠ trata: en el tráfico hay ánimo de BENEFICIO y entrada ilegal, y el migrante NO es perseguido (art. 5); en la trata el fin es la EXPLOTACIÓN.');

H += pon('Artículos 7 y 8', flujo('⭐ EX · Arts. 7 a 9 — Tráfico de migrantes por MAR', [
  { et: 'SOSPECHA', t: 'Buque con pabellón o matrícula de otro Estado Parte involucrado en el tráfico (cooperación conforme al derecho internacional del mar)' },
  { et: '8.2', t: Rq('Lo notifica al Estado del pabellón, le pide que confirme la matrícula y, si la confirma, autorización para adoptar medidas', ['2-18', '2-87', '2-ia-45']) },
  { et: 'AUTORIZA', t: `El Estado del pabellón puede autorizar a: ${Rq('a) visitar el buque · b) registrarlo · c) si hay pruebas, adoptar medidas sobre el buque, las personas y la carga', ['2-18', '2-87'])}` },
  { et: '8.3', t: `${Rq('Informa con prontitud al Estado del pabellón', ['2-ia-288'])} de los resultados` },
  { c: 'no', et: '8.5', t: `Sin autorización expresa no se adoptan otras medidas, salvo ${Rq('para eliminar un peligro inminente para la vida', ['2-ia-291'])} o por acuerdos` },
  { bif: [
    { et: '8.6', t: `Autoridades para las solicitudes: se comunican ${Rq('por conducto del SG a los demás Estados Parte en el mes siguiente', ['2-ia-299'])}` },
    { et: '8.7', t: `Buque SIN nacionalidad (o que se hace pasar por tal): ${Rq('puede visitarlo y registrarlo', ['2-ia-284'])}` }] },
  { c: 'si', et: 'ART. 9', t: `Al actuar: ${Rq('seguridad y trato humano de las personas a bordo', ['2-28', '2-ia-305'])} · no poner en peligro el buque ni su carga · no perjudicar intereses comerciales o jurídicos · medidas ecológicamente razonables · sin menoscabo de ${Rq('los derechos de los Estados ribereños ni la competencia del Estado del pabellón en cuestiones administrativas, técnicas y sociales', ['2-4', '2-75'])} · si no estaban fundadas, ${Rq('el buque será indemnizado por todo perjuicio o daño', ['2-ia-46'])} · las ejecutan ${Rq('buques de guerra, aeronaves militares u otros identificables al servicio de un gobierno', ['2-ia-317'])}` }]));

H += pon('Artículos 15, 16 y 18', cuadro('Arts. 10 a 25 — Cooperación, protección y cláusulas finales', ['', 'DATO'], [
  ['<b>Información (10)</b>', `Entre Estados con fronteras comunes o en las rutas: ${Rq('lugares de embarque y destino, rutas, transportistas y medios de transporte', ['2-ia-304'])} · ${Rq('identidad y métodos de los grupos', ['2-ia-304'])}`],
  ['<b>Fronteras (11)</b>', `Controles reforzados, ${Rq('sin perjuicio de la libre circulación de personas', ['2-ia-307'])} · los transportistas comprueban los documentos · ${Rq('denegar la entrada o revocar visados a los implicados', ['2-ia-312'])}`],
  ['<b>Capacitación (14)</b>', `${Rq('Seguridad y calidad de los documentos de viaje', ['2-ia-295'])}, detección de falsificaciones, ${Rq('trato humano de los migrantes', ['2-ia-295'])}`],
  ['<b>Prevención (15)</b>', `Combatir las causas socioeconómicas: ${Rq('la pobreza y el subdesarrollo', ['2-ia-301'])}`],
  ['<b>Protección (16)</b>', 'Derecho a la vida y a no sufrir tortura · necesidades especiales de mujeres y niños'],
  ['<b>Repatriación (18)</b>', `Sin demora indebida, ${Rq('de manera ordenada y con su seguridad y dignidad', ['2-ia-297'])}`],
  ['<b>Salvaguardia (19)</b>', `Respeta el ${Rq('derecho internacional humanitario y los derechos humanos', ['2-ia-316'])}, la Convención de Refugiados y el non-refoulement`],
  ['<b>Controversias (20)</b>', `Negociación → arbitraje → CIJ a los 6 meses · se puede ${Rq('declarar que no se está vinculado por el arbitraje y la CIJ', ['2-ia-319'])} y retirar esa reserva notificándolo al ${Rq('SG de la ONU', ['2-63'])}`],
  ['<b>Enmiendas y depositario (23 y 25)</b>', `Enmienda en vigor ${Rq('90 días tras ratificarla', ['2-ia-311'])} · depositario: ${Rq('Secretario General de las Naciones Unidas', ['2-ia-289'])}`]]));

// ======================= 2.7 PROTOCOLO DE ARMAS DE FUEGO (fichas k=78..83) =======================
H += bloque('2.7 — PROTOCOLO CONTRA LA FABRICACIÓN Y EL TRÁFICO ILÍCITOS DE ARMAS DE FUEGO, SUS PIEZAS Y COMPONENTES Y MUNICIONES');

H += pon('Artículos 1 a 4', arbol('⭐ EX · Arts. 1 a 4 — Armas de fuego: finalidad y definiciones', `Protocolo de armas (Nueva York, 31-5-2001) · finalidad: ${Rq('promover, facilitar y reforzar la cooperación para prevenir, combatir y erradicar la fabricación y el tráfico ilícitos', ['2-ia-279'])}`, [
  `<b>Arma de fuego:</b> arma portátil con cañón que lanza (o puede transformarse para lanzar) un balín, bala o proyectil por un explosivo; excluidas las antiguas y sus réplicas, pero ${Rq('nunca las fabricadas después de 1899', ['2-ia-47', '2-ia-280'])}`,
  `<b>Piezas y componentes:</b> ${Rq('elementos concebidos para el arma e indispensables: cañón, caja o cajón, cerrojo o tambor, cierre o bloqueo del cierre y silenciadores', ['2-25'])}`,
  `<b>Municiones:</b> ${Rq('el cartucho completo o sus componentes (vainas, cebos, carga propulsora, balas o proyectiles), si están sujetos a autorización', ['2-ia-290'])}`,
  `<b>Fabricación ilícita:</b> con piezas traficadas, ${Rq('sin licencia o autorización, o sin marcar las armas al fabricarlas', ['2-ia-296'])}`,
  '<b>Tráfico ilícito:</b> importar, exportar, adquirir, vender, entregar o trasladar si algún Estado interesado no lo autoriza o sin marcar',
  `<b>Localización:</b> ${Rq('rastreo sistemático desde el fabricante al comprador', ['2-ia-292'])}`,
  `<b>Ámbito (4):</b> transnacional + grupo organizado; ${Rq('no se aplica a transacciones o transferencias estatales que perjudiquen la seguridad nacional', ['2-ia-287'])}`]));

H += pon('Artículos 7, 8 y 9', cuadro('⭐ EX · Arts. 5 a 11 — Delitos, registros, marcación y licencias', ['', 'DATO'], [
  ['<b>Delitos (5)</b>', `Fabricación ilícita · tráfico ilícito · ${Rq('falsificar, obliterar, suprimir o alterar las marcas (art. 8)', ['2-ia-48'])} · también ${Rq('la tentativa', ['2-ia-306'])} y la complicidad, y organizar, dirigir, ayudar…`],
  ['<b>Decomiso (6)</b>', Rq('Incautación y destrucción, salvo otra disposición autorizada oficialmente', ['2-ia-300'])],
  ['<b>Registros (7)</b>', `Información para localizarlas durante ${Rq('no menos de 10 años', ['2-24', '2-ia-50'])}`],
  ['<b>Marcación al fabricar (8.1.a)</b>', `${Rq('Nombre del fabricante, país o lugar de fabricación y número de serie', ['2-ia-49', '2-ia-282'])} · o ${Rq('símbolos geométricos sencillos con código numérico o alfanumérico', ['2-ia-313'])}`],
  ['<b>Importadas (8.1.b)</b>', 'Marca del país de importación y, si es posible, del año'],
  ['<b>Del Estado a uso civil (8.1.c)</b>', Rq('Marca que identifique al país que realiza la transferencia', ['2-ia-293'])],
  ['<b>Desactivación (9)</b>', Rq('Piezas esenciales permanentemente inservibles, sin poder retirarse, sustituirse o modificarse', ['2-ia-303'])],
  ['<b>Licencias (10)</b>', `Antes de exportar: ${Rq('licencias del Estado importador', ['2-ia-294'])} y no oposición escrita de los de tránsito · contenido mínimo: ${Rq('lugar y fecha de emisión, expiración, países de exportación, importación y tránsito, destinatario final', ['2-ia-298'])}, descripción y cantidad`],
  ['<b>Seguridad (11)</b>', `${Rq('Seguridad de las armas en su fabricación, importación, exportación y tránsito', ['2-ia-318'])} y controles más eficaces`]]));

H += pon('Artículos 16 a 18', cuadro('Arts. 12 a 18 — Cooperación, corredores y cláusulas finales', ['', 'DATO'], [
  ['<b>Información (12.5)</b>', `${Rq('Confidencialidad y restricciones de uso cuando lo pida quien la facilita', ['2-ia-314'])}, incluida la comercial`],
  ['<b>Enlace (13)</b>', Rq('Un órgano nacional o punto de contacto central', ['2-ia-285'])],
  ['<b>Corredores (15)</b>', `${Rq('Considerarán establecer un sistema de reglamentación del corretaje', ['2-ia-302'])} (registro, licencias)`],
  ['<b>Controversias (16)</b>', `${Rq('Negociación', ['2-66'])} → arbitraje → a los 6 meses, ${Rq('Corte Internacional de Justicia', ['2-ia-308'])}`],
  ['<b>Firma y vigor (17 y 18)</b>', `Nueva York, desde el día 30 tras su aprobación hasta el 12-12-2002 · vigor: ${Rq('día 90 tras el 40.º instrumento, nunca antes que la Convención', ['2-ia-315'])} · depositario: SG de la ONU`]]))
  + trampa('Cláusulas finales: Convenio 196 = 3 meses tras 6 signatarios (4 del Consejo de Europa), depositario el SG del Consejo de Europa · Palermo y sus Protocolos = día 90 tras el 40.º instrumento (los Protocolos nunca antes que la Convención), depositario el SG de la ONU · controversias: negociación → arbitraje → 6 meses → CIJ (Convenio 196: arbitraje o TIJ de común acuerdo).');

module.exports = { visuales: () => VIS.map(([c, v]) => [c, X.final(v)]) };
