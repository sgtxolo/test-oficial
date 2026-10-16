// Esquemas visuales del Tema 2 (Terrorismo y delincuencia transnacional): recrean los cuadros y esquemas que trae el temario
// (hubs de residentes / no residentes, tablas de prescripción, reservas del Convenio de Varsovia, enmiendas, diagrama del art. 48,
// graduación de sanciones, delito transnacional, finalidad del Protocolo de trata) + dos cuadros propios (sanciones de las dos leyes).
// El contenido sale del texto del temario (los cuadros del PDF son texto); los círculos y notas a mano del usuario se trasladan como énfasis.
// Uso: node prompts/herramientas/visuales-t2.js
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos } = L;
const { Rq, cuadro } = require('./expres-lib.js')(2);   // Rq: respuesta enlazada a sus preguntas · cuadro: tabla del Exprés
const V = []; const v = (despues, html) => V.push([despues, html]);

// ---------- 2.1 LEY 19/2003: esquemas generados por esquemas-t2.js (los mismos del ⚡ Exprés, con tu subrayado y enlazados a las preguntas) ----------
require('./esquemas-t2.js').visuales().forEach(([cab, html]) => v(cab, html));

// ---------- 2.2 CONVENIO DE VARSOVIA ----------
v('Artículos 5, 6 y 7 — Provocación pública', arbol('Arts. 5, 6 y 7: los tres delitos del Convenio (cuadro del temario)', `Cada Parte ${D('adoptará medidas')} para ${D('tipificar como delito')}, conforme a su derecho interno, cuando se cometa ${R('ilegal e intencionadamente')}`, [
  `${R('Provocación pública')} (art. 5): la ${R('DIFUSIÓN')} o cualquier otra forma de puesta a disposición del público de mensajes con la intención de incitar a cometer delitos terroristas, preconice o no directamente su comisión, si ${R('crea peligro')} de que se cometan`,
  `${R('Reclutamiento')} (art. 6): ${R('incitar a otra persona')} a cometer o participar en delitos terroristas, o a unirse a una asociación o grupo para contribuir a ello`,
  `${R('Adiestramiento')} (art. 7): ${R('dar instrucciones')} para fabricar o usar explosivos, armas de fuego u otras armas o sustancias nocivas o peligrosas, o para otros métodos y técnicas, sabiendo que la formación sirve a esos fines`,
  `Irrelevancia del resultado (art. 8): ${K('no es necesario')} que el delito terrorista se haya cometido efectivamente`]));

v('Artículos 10 y 11 — Responsabilidad', arbol('Responsabilidad y sanciones (arts. 10 y 11 · cuadros del temario)', `${D('Personas jurídicas')} que participen en los delitos de los arts. 5 a 7 y 9`, [
  `Responsabilidad ${R('penal, civil o administrativa')} (sin perjuicio de los principios jurídicos de la Parte)`,
  `${K('Sin perjuicio')} de la responsabilidad penal de las personas físicas que hayan cometido los delitos`,
  `Penas aplicables a los delitos (arts. 5 a 7 y 9): ${R('EFECTIVAS')}, ${R('PROPORCIONADAS')} y ${R('DISUASORIAS')}`,
  `Personas jurídicas: sanciones efectivas, proporcionadas y disuasorias, ${R('penales o no penales, incluidas las pecuniarias')}`,
  'Una condena firme anterior dictada en un Estado extranjero podrá tenerse en cuenta en la determinación de la pena']));

v('Artículo 20 — Exclusión de la cláusula', flujo('Reserva de no aplicar la cláusula de excepción política (art. 20 · cuadro del temario)', [
  { et: '1', t: `Validez ${P('TRES AÑOS')} desde la entrada en vigor del Convenio para la Parte · ${R('renovable por períodos de igual duración')}` },
  { et: '2', t: `${P('12 MESES')} antes de la expiración: el ${R('Secretario General del Consejo de Europa')} informa a la Parte` },
  { et: '3', t: `${P('3 MESES')} antes: la Parte ${R('notifica su intención')} de ${D('MANTENER')} · ${D('MODIFICAR')} · ${D('RETIRAR')} (si mantiene, da explicaciones)` },
  { et: '4', t: `A falta de notificación: el Secretario General informa de que queda ${R('prorrogada automáticamente por 6 MESES')}` },
  { et: '5', t: `Si sigue sin notificar pasado ese período: la reserva queda ${R('SIN EFECTO')}` }]));

v('Artículo 20 — Exclusión de la cláusula', arbol('Art. 20 — Apartados 1, 2, 3, 5, 7 y 8 (la reserva de no aplicar la cláusula · cuadro del temario)', `${D('Cláusula de excepción política')}: ninguno de los delitos de los arts. 5 a 7 y 9 se considerará, a efectos de la extradición o la asistencia judicial, ${R('delito político, conexo a un delito político o inspirado por móviles políticos')}`, [
  `<b>Reserva (20.2):</b> cualquier Estado, o la Comunidad Europea, puede declarar al firmar o al depositar su instrumento que se reserva el derecho de no aplicar el apartado 1 a la extradición · ${R('aplicará la reserva caso por caso, sobre la base de una decisión debidamente motivada')}`,
  `<b>Retirada (20.3):</b> en cualquier momento posterior, total o parcialmente, ${R('mediante declaración dirigida al Secretario General del Consejo de Europa, que entrará en vigor en la fecha de su recepción')}`,
  `<b>Validez (20.5):</b> ${P('tres años')} desde el primer día de la entrada en vigor del Convenio para la Parte, ${R('pudiendo renovarse por períodos de igual duración')}`,
  `<b>Expiración (20.6):</b> el Secretario General informa a la Parte (${P('12 meses')} antes); ${R('a la Parte de que se trate')} le corresponde notificar su intención (${P('3 meses')} antes); si no lo hace, queda prorrogada automáticamente por ${P('seis meses')}`,
  `<b>Si no concede la extradición (20.7):</b> somete el asunto, sin excepción alguna y sin demora injustificada, a sus autoridades competentes para que se inicien actuaciones penales`,
  `<b>Sin decisión judicial en un plazo razonable (20.8):</b> ${R('la Parte requirente informa al Secretario General, quien somete la cuestión a la Consulta entre las Partes')} (art. 30), que emite un dictamen y lo somete al Comité de Ministros para que adopte una declaración`]));

v('Artículos 27 y 28 — Enmiendas', flujo('Enmiendas al Convenio (art. 27 · cuadro del temario)', [
  { et: 'Propone', t: `${R('Cualquiera de las Partes')} · ${R('el Comité de Ministros del Consejo de Europa')} · ${R('la Consulta entre las Partes')}` },
  { et: 'Comunica', t: 'Toda enmienda propuesta se comunica a las Partes por el Secretario General del Consejo de Europa' },
  { et: 'Dictamen', t: 'La propuesta de una Parte o del Comité de Ministros se traslada a la Consulta entre las Partes, que somete su dictamen al Comité de Ministros' },
  { et: 'Aprueba', t: `El ${R('Comité de Ministros')} podrá aprobar la enmienda` },
  { et: 'Acepta', t: 'El texto aprobado se transmite a las Partes para su aceptación' },
  { et: 'Vigor', t: `Entra en vigor el ${P('TRIGÉSIMO DÍA')} siguiente a la fecha en que ${R('todas las Partes')} hayan comunicado su aceptación al Secretario General`, c: 'ok' }]));

v('Artículos 27 y 28 — Enmiendas', arbol('Revisión del anexo (art. 28)', `${D('Anexo')}: lista de tratados universales contra el terrorismo`, [
  `Proponen: ${R('cualquiera de las Partes o el Comité de Ministros')} · solo afectan a tratados ${R('universales de las Naciones Unidas, referidos específicamente al terrorismo internacional y vigentes')}`,
  `El Comité de Ministros puede aprobarla por la mayoría del art. 20.d) del Estatuto del Consejo de Europa · entra en vigor tras ${P('un año')} desde su transmisión a las Partes`,
  `${R('Un tercio de las Partes')} notifica una objeción: ${K('no entra en vigor')}`,
  `${K('Menos de un tercio')}: entra en vigor respecto a las Partes que no hayan formulado objeción`]));

v('Artículos 29, 30 y 31 — Solución', arbol('Consulta entre las Partes (art. 30 · cuadro del temario)', `${D('Las Partes se consultarán periódicamente')} con el fin de:`, [
  'a) Efectuar propuestas para facilitar o mejorar la utilización y la aplicación efectivas del Convenio (problemas y efectos de las declaraciones)',
  'b) Formular su opinión sobre la conformidad de una negativa de extradición sometida en virtud del art. 20.8',
  'c) Efectuar propuestas de enmiendas (art. 27) · d) opinar sobre cualquier propuesta de enmienda (art. 27.3)',
  'e) Opinar sobre cualquier cuestión relativa a la aplicación del Convenio e intercambiar información sobre avances jurídicos, políticos o técnicos',
  `Convocada por el ${R('Secretario General del Consejo de Europa')} cada vez que lo considere necesario y, en todo caso, si lo solicita ${R('la mayoría de las Partes o el Comité de Ministros')} · las Partes están asistidas por el Secretario General`]));

// ---------- 2.3 LEY 10/2010 ----------
v('Artículos 7, 9 y 11 — Aplicación de la diligencia', cuadro('⭐ EX · Arts. 7, 9 y 11 — Diligencia debida: cuándo no se aplica, casinos y juego, simplificada y reforzada', ['', 'DATO'], [
  ['<b>No se pueden aplicar las medidas (7.3)</b>', `No establecerán relaciones de negocio ni ejecutarán operaciones; si se aprecia la imposibilidad en el curso de la relación: ${Rq('poner fin a la relación de negocios y realizar el examen especial', ['2-ia-156'])} (art. 17)`],
  ['<b>Casinos (7.5)</b>', `Identifican y comprueban mediante documentos fehacientes la identidad de ${Rq('cuantas personas pretendan acceder al establecimiento', ['2-100'])} · ${Rq('Cuando realicen transacciones por valor igual o superior a', ['2-ia-157'])} ${Rq('2.000 euros', ['2-101', '2-ia-157'])}: resto de medidas de diligencia debida`],
  ['<b>Juego electrónico y presencial (7.6)</b>', `Electrónico: identifican a cuantas personas pretendan participar (en los términos previstos ${Rq('reglamentariamente', ['2-102'])}) · desde ${P('2.000 euros')} en una operación o en varias que parezca que están relacionadas (cobro de ganancias o apuestas): resto de medidas · presencial: medidas desde ${P('2.000 euros')}`],
  ['<b>Umbral cuantitativo (7.7)</b>', 'Reglamentariamente podrá autorizarse no aplicar todas o algunas medidas de diligencia debida o de conservación de documentos en operaciones ocasionales que no excedan de un umbral cuantitativo, singular o acumulado por periodos temporales'],
  ['<b>Tarjetas prepago anónimas de fuera de España (7.8)</b>', `Las entidades financieras adquirentes solo aceptan pagos si ${Rq('cumplan con los umbrales y requisitos establecidos en el artículo 12 de la Directiva (UE) 2015/849', ['2-ia-22'])}`],
  ['<b>Simplificada (9)</b>', `Podrán aplicarse respecto de ${Rq('clientes, productos u operaciones que comporten un riesgo reducido de blanqueo de capitales o de financiación del terrorismo', ['2-ia-23'])}`],
  ['<b>Reforzada (11.2)</b>', `En todo caso: ${Rq('la banca privada y las operaciones de envío de dinero y de cambio de moneda extranjera que superen los umbrales reglamentarios', ['2-ia-24'])} (los establecidos ${Rq('reglamentariamente', ['2-102'])})`]]));

v('Artículos 7, 9 y 11 — Aplicación de la diligencia', arbol('Recurso a terceros para la diligencia debida (art. 8 · cuadro del temario)', `Los sujetos obligados ${D('podrán recurrir')} a:`, [
  'Terceros sometidos a la presente Ley · organizaciones o federaciones de estos sujetos',
  'Terceros sometidos a la legislación de prevención de otros Estados miembros o países terceros · organizaciones o federaciones de estas entidades',
  `Exige la previa conclusión de un ${R('ACUERDO ESCRITO')} entre el sujeto obligado y el tercero, formalizando sus obligaciones`,
  `${K('Siempre que')} su cumplimiento sea objeto de ${R('supervisión por las autoridades competentes')}`,
  `Los terceros ponen a ${P('inmediata disposición')} la información y remiten copia de la documentación a instancias del sujeto obligado`]));

v('Artículos 26 ter, 27 y 28', cuadro('Arts. 26 ter, 27 y 28 — Representante, órganos centralizados de prevención y examen externo (cuadro del temario)', ['', 'DATO'], [
  ['<b>Representante ante el Servicio Ejecutivo (26 ter)</b>', `Los sujetos obligados designan a ${Rq('una persona residente en España que ejerza cargo de administración o dirección de la sociedad', ['2-129'])} · empresarios o profesionales individuales: ${Rq('el titular de la actividad', ['2-ia-152'])} · en los grupos con varios sujetos obligados el representante es único y ejerce cargo en la sociedad dominante del grupo`],
  ['<b>Órganos centralizados de prevención (27)</b>', `${R('Mediante orden del Ministro de Economía y Empresa')} podrá acordarse su constitución para las profesiones colegiadas · función: ${Rq('intensificar y canalizar la colaboración', ['2-ia-173'])} (INTENSIFICACIÓN y CANALIZACIÓN)${''} de las profesiones colegiadas con las autoridades judiciales, policiales y administrativas · ${K('sin perjuicio')} de la responsabilidad directa de los profesionales · examinan las operaciones del art. 17 y las comunican al Servicio Ejecutivo cuando concurran las circunstancias del art. 18 · su representante es el de los profesionales incorporados (art. 26 ter)`],
  ['<b>Examen externo (28)</b>', `Las medidas y órganos de control interno son objeto de examen anual por ${Rq('un experto externo', ['2-ia-160'])} · el informe se eleva en el plazo máximo de ${P('tres meses')} desde su emisión al Consejo de Administración · no puede encomendarse a quien ${Rq('haya prestado o preste cualquier otra clase de servicios retribuidos durante los tres años anteriores o posteriores a la emisión del informe', ['2-ia-186'])}`]]));

v('Artículos 45 y 46 — Órganos de apoyo', flujo('Régimen de colaboración (art. 48 · cuadro del temario)', [
  { et: 'Autoridad o funcionario', t: `que descubra hechos que puedan constituir ${R('INDICIO')} o ${R('PRUEBA')} de blanqueo o de financiación del terrorismo → ${R('deberán informar al SERVICIO EJECUTIVO de la Comisión')}` },
  { et: 'Supervisores', t: `Banco de España · CNMV · Dirección General de Seguros y Fondos de Pensiones · Dirección General de los Registros y del Notariado · ICAC · colegios profesionales · órganos estatales o autonómicos competentes → ${R('informarán razonadamente')} a la ${R('SECRETARÍA DE LA COMISIÓN')} cuando aprecien posibles infracciones de las obligaciones establecidas` },
  { et: 'Órganos judiciales', t: `${R('De oficio o a instancia del MINISTERIO FISCAL')} → ${R('remiten TESTIMONIO')} a la Secretaría de la Comisión cuando aprecien indicios de incumplimiento de la presente ley` }]));

v('Artículos 56, 57 y 58 — Sanciones', cuadro('⭐ EX · Arts. 56 a 58 — Sanciones de la Ley 10/2010: muy graves, graves y leves (cuadro propio)', ['', 'MUY GRAVES (56)', 'GRAVES (57)', 'LEVES (58)'], [
  ['<b>Multa al sujeto obligado</b>', `importe mínimo de ${Rq('150.000 euros', ['2-ia-155'])}; máximo: la mayor de ${P('el 10 por ciento del volumen de negocios anual total')}, ${P('el duplo')} del contenido económico de la operación, ${Rq('el quíntuplo del importe de los beneficios derivados de la infracción', ['2-ia-179'])} o ${P('10.000.000 euros')}`, `importe mínimo de ${P('60.000 euros')}; máximo: la mayor de el 10 por ciento del volumen de negocios, el tanto del contenido económico más un 50 por ciento, el triple del importe de los beneficios o ${P('5.000.000 euros')}`, `${Rq('Multa por importe de hasta 60.000 euros', ['2-12', '2-49', '2-135'])}`],
  ['<b>Además</b>', 'amonestación pública · suspensión temporal o revocación de la autorización (entidades autorizadas)', `${Rq('amonestación pública o privada · suspensión temporal de la autorización', ['2-39'])}`, `${Rq('Amonestación privada', ['2-135'])}`],
  ['<b>Cargos de administración o dirección</b>', `multa entre ${P('60.000 y 10.000.000 euros')} · separación del cargo con inhabilitación por un plazo máximo de ${P('diez años')} · amonestación pública`, `multa de mínimo ${P('3.000 euros')} y máximo de hasta ${P('5.000.000 euros')} · amonestación pública o privada · separación con inhabilitación por un plazo máximo de ${P('cinco años')} (también el experto externo)`, '—'],
  ['<b>Declaración del art. 34</b>', '—', `multa de mínimo ${P('600 euros')} y hasta el 50 por ciento del valor de los medios de pago empleados`, '—']]));

v('Artículo 59 — Graduación de las sanciones', arbol('Graduación de las sanciones (art. 59 · cuadro del temario)', `${D('Las sanciones se graduarán atendiendo a')}:`, [
  'a) La cuantía de las operaciones afectadas por el incumplimiento',
  'b) Los beneficios obtenidos como consecuencia de las omisiones o actos constitutivos de la infracción',
  `c) La circunstancia de haber procedido o no a la ${R('subsanación')} de la infracción por propia iniciativa`,
  `d) Las sanciones firmes en vía administrativa por infracciones de distinto tipo impuestas al sujeto obligado ${P('en los últimos cinco años')}`,
  'e) El grado de responsabilidad o intencionalidad · f) La gravedad y duración de la infracción',
  'g) Las pérdidas para terceros causadas por el incumplimiento · h) La capacidad económica del inculpado, cuando la sanción sea de multa']));

// ---------- 2.4 PALERMO ----------
v('Artículos 3 y 4 — Ámbito de aplicación', flujo('El delito será de carácter transnacional si (art. 3.2 · cuadro del temario)', [
  { et: 'a', t: `Se comete en ${R('más de un Estado')}` },
  { et: 'b', t: `Se comete dentro de un solo Estado pero ${R('una parte sustancial de su preparación, planificación, dirección o control')} se realiza en otro Estado` },
  { et: 'c', t: `Se comete dentro de un solo Estado pero entraña la participación de un ${R('grupo delictivo organizado que realiza actividades delictivas en más de un Estado')}` },
  { et: 'd', t: `Se comete en un solo Estado pero tiene ${R('efectos sustanciales en otro Estado')}` }]));

// ---------- 2.5 TRATA ----------
v('Artículos 1 y 2 — Relación con la Convención', arbol('Finalidad del Protocolo (art. 2 · cuadro del temario)', `${D('Finalidad del Protocolo')}: los fines son`, [
  `${R('Prevenir y combatir la trata de personas')}, prestando especial atención a ${R('las mujeres y los niños')}`,
  `${R('Proteger y ayudar a las víctimas')} de dicha trata, respetando plenamente sus derechos humanos`,
  `${R('Promover la cooperación')} entre los Estados Parte para lograr esos fines`]));

v('Artículos 16 a 20 — Firma, entrada en vigor', cuadro('⭐ EX · Arts. 16 a 20 — Protocolo de trata: firma, vigor, enmienda, denuncia y depositario (cuadro del temario)', ['', 'DATO'], [
  ['<b>Firma (16)</b>', `Abierto a todos los Estados del 12 al 15 de diciembre de 2000 en Palermo (Italia) y después en la Sede de las Naciones Unidas en Nueva York ${Rq('hasta el 12 de diciembre de 2002', ['2-ia-265', '2-ia-361'])} · también a las organizaciones regionales de integración económica ${Rq('siempre que al menos uno de sus Estados miembros haya firmado el Protocolo', ['2-ia-266'])}`],
  ['<b>Vigor (17)</b>', `El nonagésimo día después de que se haya depositado el ${Rq('cuadragésimo instrumento', ['2-ia-267'])} de ratificación, ${Rq('a condición de que no entre en vigor antes de la entrada en vigor de la Convención', ['2-ia-267'])}`],
  ['<b>Enmiendas (18)</b>', `${Rq('Cuando hayan transcurrido cinco años desde la entrada en vigor del Protocolo', ['2-ia-269'])}, los Estados Parte pueden proponer enmiendas por escrito al ${Rq('Secretario General de las Naciones Unidas', ['2-19', '2-88'])}, que las comunica a los Estados Parte y a la Conferencia de las Partes · mayoría de dos tercios de los Estados Parte presentes y votantes · las organizaciones regionales de integración económica ${Rq('votan con un número de votos igual al número de sus Estados miembros que sean Partes en el Protocolo', ['2-ia-270'])} · entra en vigor respecto de un Estado Parte noventa días después`],
  ['<b>Denuncia (19)</b>', `${Rq('Surte efecto un año después de la fecha en que el Secretario General reciba la notificación', ['2-ia-263'])} · las organizaciones regionales dejan de ser Partes ${Rq('cuando lo hayan denunciado todos sus Estados miembros', ['2-ia-275'])}`],
  ['<b>Depositario (20)</b>', `${Rq('El Secretario General de las Naciones Unidas', ['2-71', '2-150'])} es el depositario del Protocolo`],
  ['<b>España</b>', `${Rq('El 25 de diciembre de 2003', ['2-ia-246'])}: entrada en vigor general y para España (art. 17)`]]));

module.exports = V;
if (require.main === module) L.inserta(2, V);
