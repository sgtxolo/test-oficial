// Esquemas visuales del Tema 11 (Derecho Administrativo): recrean los cuadros del temario de Prefortia (págs. 3 y 6-19 del escaneado)
// y añaden esquemas propios con datos del texto oficial. Uso: node prompts/herramientas/visuales-t11.js
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const V = []; const v = (despues, html) => V.push([despues, html]);
const A = x => `<b>${x}</b>`; // cita del artículo, como las etiquetas verdes del cuadro

// ───────── Ley 39/2015 · art. 96 · tramitación simplificada (cuadro de la pág. 3) ─────────
v('Artículo 96 — Tramitación simplificada', tabla('Tramitación simplificada del procedimiento administrativo común (art. 96 · cuadro del temario)', ['Concepto', 'Contenido'], [
  { l: 'Motivos', c: 'o', h: [{ t: 'Razones de interés público.' }, { t: 'Falta de complejidad.' }, { t: `En cualquier momento antes de la resolución, el órgano competente para su tramitación ${P('puede acordar continuar con tramitación ordinaria')}.` }] },
  { l: 'Las Administraciones públicas podrán acordar la tramitación simplificada', c: 'v', h: [
    { l: 'De oficio', c: 'v', h: [{ t: `${K('Deberá')} notificarlo al interesado.` }, { t: `Si algún interesado manifiesta su ${K('oposición expresa')}, la Administración continuará con la tramitación ordinaria.` }] },
    { l: 'A solicitud del interesado', c: 'v', h: [{ p: '5 días', c: 'c', t: 'Si no se aprecian las razones previas: desestimación no recurrible, en el plazo de 5 días.' }] }] },
  { l: 'Plazo máximo de duración', c: 'c', h: [{ p: '30 días', c: 'c', t: `desde el siguiente a la notificación del acuerdo. ${K('Salvo')} que reste menos para su tramitación ordinaria.` }] },
  { l: 'Trámites únicos', c: 'o', h: [
    { t: 'a) Inicio. b) Subsanación de la solicitud, en su caso. c) Alegaciones al inicio (5 días). d) Audiencia (si la resolución es desfavorable). e) Informe del servicio jurídico (si es preceptivo). f) Informe del Consejo General del Poder Judicial (si es preceptivo).' },
    { l: 'g) Dictamen del Consejo de Estado u órgano consultivo equivalente de la Comunidad Autónoma (si es preceptivo)', c: 'o', h: [
      { t: `Desde que se solicite el Dictamen hasta que éste sea emitido: ${P('suspensión automática del plazo para resolver')}.` },
      { p: '15 días', c: 'c', t: 'El órgano competente solicitará la emisión del Dictamen en un plazo tal que permita cumplir el plazo de resolución del procedimiento. El Dictamen podrá ser emitido en el plazo de 15 días si así lo solicita el órgano competente.' }] },
    { t: 'h) Resolución.' },
    { t: `Si se realizan más trámites de los expuestos, el procedimiento ${K('debe')} ser tramitado de manera ${P('ordinaria')}.` }] }]));

// ───────── Ley 39/2015 · recursos administrativos (pág. 19) ─────────
v('Artículo 125 — Objeto y plazos', cols('Plazos de los recursos administrativos (cuadro del temario)', [
  { t: 'Recurso de ALZADA', l: [`Interposición: ${P('1 mes')} (expreso)`, `Resolución: ${P('3 meses')}`] },
  { t: 'Potestativo de REPOSICIÓN', l: [`Interposición: ${P('1 mes')} (expreso)`, `Resolución: ${P('1 mes')}`] },
  { t: 'Extraordinario de REVISIÓN', l: [`Interposición: ${P('4 años')} (si es por 125.1.a, error de hecho) · ${P('3 meses')} para el resto de casos`, `Resolución: ${P('3 meses')}`] }]));

// ───────── Ley 39/2015 · plazos (págs. 14-18) ─────────
v('Artículo 125 — Objeto y plazos', plazos('Plazos de 3, 5 y 7 días (Ley 39/2015 · cuadro del temario)', [
  ['3 días', `Segundo intento de notificación en papel. ${A('Art. 42.2')}`],
  ['5 días', `Ampliación del plazo de subsanación por no reunir los requisitos en la presentación de la solicitud (cuando los documentos requeridos presenten dificultades especiales). ${A('Art. 68.2')}`],
  ['5 días', `Desestimación por parte del órgano competente de la tramitación simplificada del procedimiento. ${A('Art. 96.3')}`],
  ['7 días', `Alegaciones tras realización de actuaciones complementarias. ${A('Art. 87')}`],
  ['5 días', `Procedimiento: alegaciones dentro de la tramitación simplificada. ${A('Art. 96.6')}`]]));
v('Artículo 125 — Objeto y plazos', plazos('Plazos de 10 días (Ley 39/2015 · cuadro del temario)', [
  ['10 días', `Subsanación de la representación. ${A('Art. 5.6')}`],
  ['10 días', `Informe vinculante de la secretaría de estado de seguridad (sistemas de identificación y firma). ${A('Art. 9.2.c y 10.2.c')}`],
  ['10 días', `Comunicación del plazo máximo de resolución del procedimiento y notificación de actos. ${A('Art. 21.4')}`],
  ['10 días', `Remisión de informes preceptivos ya elaborados por un órgano administrativo distinto al que tramita el procedimiento. ${A('Art. 28')}`],
  ['10 días', `Notificación de actos y resoluciones desde que se dictan. ${A('Art. 40.2')}`],
  ['10 días', `Rechazo de la notificación electrónica porque no se ha accedido a su contenido (días naturales). ${A('Art. 43.2')}`],
  ['10 días', `Plazo para aportar alegaciones en un procedimiento de responsabilidad patrimonial de oficio. ${A('Art. 65.2')}`],
  ['10 días', `Subsanación de la solicitud de iniciación de un procedimiento por parte de interesado. ${A('Art. 68.1')}`],
  ['10 días', `Cumplimentación de trámites por parte de los interesados (salvo que la norma fije uno distinto). ${A('Art. 73.1 y 73.2')}`],
  ['10 días', `Remisión de informes. ${A('Art. 80.2 y 81.1')}`],
  ['10 días', `Remisión de propuesta en responsabilidad patrimonial. ${A('Art. 81.2')}`],
  ['10 días', `Instar la continuación del procedimiento por terceros interesados tras desistimiento o renuncia. ${A('Art. 94.4')}`],
  ['10 días', `Si el recurso de alzada se ha presentado ante el órgano que dictó el acto impugnado, este debe trasladarlo al competente (superior jerárquico) en el plazo de 10 días. ${A('Art. 121.2')}`]]));
v('Artículo 125 — Objeto y plazos', plazos('Plazos de 15 días (Ley 39/2015 · cuadro del temario)', [
  ['15 días', `Expedición de la certificación del silencio administrativo. ${A('Art. 24.4')}`],
  ['15 días', `Solicitud por parte del interesado a la administración de la expedición de copias auténticas de documentos válidamente emitidos. ${A('Art. 27.4')}`],
  ['15 días', `Confirmación / modificación / levantamiento de medidas provisionales en caso de urgencia inaplazable. ${A('Art. 82.2')}`],
  ['15 días', `Plazo máximo de realización de las actuaciones complementarias. ${A('Art. 87')}`],
  ['15 días', `Plazo para formular alegaciones y aportar pruebas por cuestiones conexas que no han sido tenidas en cuenta por los interesados. ${A('Art. 88')}`],
  ['15 días', `Alegaciones por considerar la infracción o sanción de mayor gravedad que la determinada en la propuesta de resolución (procedimiento de carácter sancionador). ${A('Art. 90.2')}`],
  ['15 días', `Emisión de dictámenes en la tramitación simplificada. ${A('Art. 96.6')}`]]));
v('Artículo 125 — Objeto y plazos', plazos('Plazos de 20 días, 30 días, 1 mes, 2 meses y 3 meses (Ley 39/2015 · cuadro del temario)', [
  ['20 días', `Plazo mínimo de alegación tras la apertura de un período de información pública. ${A('Art. 83.2')}`],
  ['30 días', `Salvo que reste menos para su tramitación ordinaria, la resolución de la tramitación simplificada del procedimiento deberá ser resuelta en 30 días. ${A('Art. 96.6')}`],
  ['1 mes', `La ejecución de la suspensión de un acto impugnado se considera suspendida si transcurrido un mes desde la solicitud de suspensión la administración no se pronuncia (se entiende que el silencio es positivo). ${A('Art. 117.3')}`],
  ['2 meses', `Impugnar vía jurisdiccional sistemas de identificación y de firma. ${A('Art. 9.2.c y 10.2.c')}`],
  ['2 meses', `Dictamen preceptivo del Consejo de Estado en procedimiento de responsabilidad patrimonial por igual o superior a 50.000 euros. ${A('Art. 81.2')}`],
  ['2 meses', `Informe preceptivo del Consejo General del Poder Judicial en procedimiento de responsabilidad patrimonial por un funcionamiento anormal de la administración de justicia. ${A('Art. 81.3')}`],
  ['3 meses', `Plazo máximo de resolución si no se fija plazo en la norma. ${A('Art. 21.3')}`],
  ['3 meses', `La suspensión máxima de un procedimiento por petición de informes preceptivos. ${A('Art. 22.1')}`],
  ['3 meses', `Caducidad de los procedimientos iniciados a solicitud de interesado. ${A('Art. 95.1')}`]]));
v('Artículo 125 — Objeto y plazos', plazos('Plazos de 6 meses y de 1, 4 y 5 años (Ley 39/2015 · cuadro del temario)', [
  ['6 meses', `Plazo máximo de resolución fijado en la norma. ${A('Art. 21.2')}`],
  ['6 meses', `Si en un procedimiento de responsabilidad patrimonial la administración no se pronuncia de forma expresa en el plazo de 6 meses desde que se inició el procedimiento, se considera contraria a la indemnización (silencio negativo). ${A('Art. 91.3')}`],
  ['6 meses', `Procedimiento de revisión iniciado de oficio: el transcurso del plazo de 6 meses sin resolución expresa por parte de la administración produce caducidad. ${A('Art. 106.5')}`],
  ['6 meses', `Desestimación en la revisión de actos nulos iniciados a solicitud de interesado. ${A('Art. 106.5')}`],
  ['6 meses', `Transcurso del plazo de 6 meses sin que la administración declare la lesividad: produce la caducidad del procedimiento. ${A('Art. 107.3')}`],
  ['1 año', `Prescripción del derecho de reclamación en un procedimiento de responsabilidad patrimonial. ${A('Art. 67.1')}`],
  ['4 años', `Límite en la aplicación de la declaración de lesividad. ${A('Art. 107.2')}`],
  ['5 años', `Límite máximo del poder de representación (renovable por otros 5 años de forma indefinida). ${A('Art. 6.6')}`],
  ['10-30 días', `Período de prueba de (10-30 días) + un extraordinario de (1-10 días). ${A('Art. 77.2')}`],
  ['10-15 días', `Trámite de audiencia (10-15 días). ${A('Art. 82')}`],
  ['10-15 días', `Plazo (10-15 días) para tener en cuenta hechos nuevos o documentos no recogidos en el expediente originario (recurso). ${A('Art. 118.1')}`]]));

// ───────── Ley 39/2015 · plazos de la Ley 50/1997 del Gobierno (pág. 11) ─────────
v('Artículo 133 — Participación de los ciudadanos', plazos('Plazos de la Ley 50/1997, del Gobierno (cuadro del temario)', [
  ['2 enero o 1 julio', `Las disposiciones de entrada en vigor de leyes o reglamentos cuya aprobación o propuesta corresponda al Gobierno y que impongan obligaciones, preverán el comienzo de su vigencia el 2 de enero o 1 de julio siguientes a su aprobación. ${A('Art. 23')}`],
  ['15 días o 7 días', `Plazo mínimo de audiencia e información pública en el proceso de elaboración de normas, cuando la norma afecte a derechos e intereses legítimos, será de 15 días hábiles, pudiendo ser reducido a 7 días hábiles. ${A('Art. 26.6')}`],
  ['7 días', `Trámite de audiencia pública e información pública del 26.6 en la tramitación de urgencia de iniciativas normativas en el ámbito AGE, será de 7 días. ${A('Art. 27.2.b')}`],
  ['10 días o 1 mes', `Emisión de informes preceptivos para el procedimiento de elaboración de normas: plazo de 10 días, o 1 mes si se solicita a una administración dotada de especial independencia o autonomía. ${A('Art. 26.5')}`],
  ['+15 días naturales', `En los procedimientos de elaboración de normas, el tiempo de consulta mínimo establecido para emitir una opinión nunca será inferior a 15 días naturales. ${A('Art. 26.1')}`],
  ['Antes 30 abril', `El Gobierno aprobará anualmente un plan normativo, elevado por el ministro de la Presidencia al Consejo de Ministros para su aprobación antes del 30 de abril. ${A('Art. 25')}`]]));

// ───────── Ley 40/2015 · plazos (págs. 6-9) ─────────
const F40 = 'Artículo 155 — Transmisiones de datos';
v(F40, plazos('Plazos de 2, 3, 5 y 7 días (Ley 40/2015 · cuadro del temario)', [
  ['Mínimo 2 días', `Los miembros de un órgano colegiado deberán recibir la convocatoria conteniendo el orden del día, así como la información sobre sus temas, con una antelación mínima de 2 días. ${A('Art. 19.3.a')}`],
  ['2 días', `Los miembros de un órgano colegiado podrán formular voto particular por escrito, al discrepar del acuerdo mayoritario, en el plazo de 2 días. ${A('Art. 19.5')}`],
  ['3 días', `Si el recusado niega la causa de recusación, el superior resolverá en el plazo de 3 días. ${A('Art. 24.4')}`],
  ['5 días', `Plazo de propuesta de resolución y de resolución en procedimiento de responsabilidad patrimonial. ${A('Art. 36.4')}`],
  ['5 días', `Los convenios son eficaces una vez sean inscritos, en el plazo de 5 días desde su formalización. ${A('Art. 48.8')}`],
  ['7 días', `El informe del servicio jurídico así como cualquier otro informe con carácter preceptivo, en la suscripción de convenios de la Administración General del Estado será emitido en el plazo de 7 días. ${A('Art. 50.2.a y b')}`],
  ['7 días', `La autorización previa para la firma, modificación, prórroga y resolución de convenios en la Administración General del Estado deberá ser emitida en el plazo de 7 días desde su solicitud. ${A('Art. 50.2.c')}`]]));
v(F40, plazos('Plazos de 10 y 15 días (Ley 40/2015 · cuadro del temario)', [
  ['10 días', `Plazo de audiencia en un procedimiento de responsabilidad patrimonial. ${A('Art. 36.4.c')}`],
  ['10 días', `Los convenios son publicados, en el plazo de 10 días desde su formalización. ${A('Art. 48.8')}`],
  ['10 días', `Plazo de la administración pública cedente de datos, para oponerse al uso de dichos datos por parte de otra administración. ${A('Art. 155.3')}`],
  ['15 días', `En procedimientos de responsabilidad patrimonial en concurrencia entre varias administraciones, estas tienen 15 días para exponer lo que estimen oportuno. ${A('Art. 33.4')}`],
  ['15 días', `Plazo de alegaciones en procedimiento de responsabilidad patrimonial. ${A('Art. 36.4.a')}`],
  ['15 días', `Plazo de práctica de pruebas en procedimiento de responsabilidad patrimonial. ${A('Art. 36.4.b')}`]]));
v(F40, plazos('Plazos de 1 mes, 3 meses y 1 año (Ley 40/2015 · cuadro del temario)', [
  ['1 mes', `La reintegración o abono del dinero por alguna/s de las partes del convenio tras la liquidación deberá ejecutarse en el plazo de 1 mes (mismo plazo de 1 mes con abono de lo debido más recargo si no se cumple el plazo inicial). ${A('Art. 52.2')}`],
  ['1 mes', `Procedimiento paralizado más de 1 mes por causa no imputable al interesado: el plazo de prescripción que se encontraba paralizado comienza a correr de nuevo. ${A('Art. 30')}`],
  ['3 meses', `Un convenio cuyos compromisos económicos superen los 600.000 euros deberá remitirse electrónicamente al Tribunal de Cuentas, durante los 3 meses siguientes a su suscripción. ${A('Art. 53')}`],
  ['1 año', `Para apreciar reincidencia tiene que ser por comisión en el término de 1 año. ${A('Art. 29.2.d')}`],
  ['1 año', `Una de las funciones del Delegado del Gobierno es elevar al Gobierno un informe anual sobre el funcionamiento de los servicios públicos estatales en el ámbito de la comunidad autónoma. ${A('Art. 73.1.b')}`],
  ['1 año', `Corresponde al Ministro que presida la Conferencia Sectorial acordar al menos una vez al año la convocatoria de las reuniones. ${A('Art. 149')}`]]));
v(F40, plazos('Plazos de 2, 4 y 5 años y prescripción (Ley 40/2015 · cuadro del temario)', [
  ['2 años', `Causas de abstención y recusación: haberle prestado en los 2 últimos años servicios profesionales de cualquier tipo y en cualquier circunstancia o lugar. ${A('Art. 23')}`],
  ['4 años', `Los convenios tendrán una duración determinada, que no podrá exceder de 4 años, salvo que una norma prevea un plazo superior. ${A('Art. 49')}`],
  ['4 años', `La prórroga de los convenios podrá ser de otro plazo de hasta 4 años. ${A('Art. 49')}`],
  ['5 años', `Reclamación patrimonial por daños derivados de una ley inconstitucional o contraria a derecho a la Unión Europea (puedes reclamar los 5 años anteriores a fecha de publicación de sentencia). ${A('Art. 34')}`],
  ['3 años', `Prescripción de las INFRACCIONES muy graves. ${A('Art. 30')}`],
  ['2 años', `Prescripción de las INFRACCIONES graves. ${A('Art. 30')}`],
  ['6 meses', `Prescripción de las INFRACCIONES leves. ${A('Art. 30')}`],
  ['3 años', `Prescripción de las SANCIONES muy graves. ${A('Art. 30')}`],
  ['2 años', `Prescripción de las SANCIONES graves. ${A('Art. 30')}`],
  ['1 año', `Prescripción de las SANCIONES leves. ${A('Art. 30')}`]]));

// ───────── Esquemas propios (datos de las fichas RECUERDA y del texto oficial) ─────────
v('Artículo 24 — Silencio administrativo', flujo('Silencio administrativo: qué efectos tiene (art. 24 Ley 39/2015)', [
  { et: '24', t: `Si la Administración no resuelve y notifica en plazo (${P('el fijado por la norma reguladora; máximo seis meses')}, salvo ley o Derecho de la UE), actúa el ${D('silencio administrativo')}` },
  { bif: [
    { c: 'si', et: 'Estimatorio', t: `La estimación por silencio tiene a todos los efectos ${R('la consideración de acto administrativo finalizador del procedimiento')}` },
    { c: 'no', et: 'Desestimatorio', t: `La desestimación por silencio tiene los solos efectos de ${R('permitir a los interesados la interposición del recurso administrativo o contencioso-administrativo que resulte procedente')}` }] }]));
v('Artículo 13 — Órganos de prevención', arbol('Órganos de prevención de riesgos laborales en la Guardia Civil (arts. 13 a 15 RD 179/2005)', `${D('Órganos de prevención')} en la Dirección General de la Guardia Civil (art. 13.2)`, [
  'a) Servicio de Prevención', 'b) Sección de Prevención de Zona', 'c) Oficina de Prevención de Comandancia', 'd) Otras unidades',
  { t: 'Órgano de asesoramiento (art. 14):', sub: ['el Consejo de la Guardia Civil analiza y valora las propuestas del principio de participación (art. 8)'] },
  { t: 'Inspección y control (art. 15):', sub: ['interno: cada órgano de prevención controla a los órganos que de él dependen', 'externo: la Inspección de Personal y Servicios de Seguridad de la Secretaría de Estado de Seguridad (el Servicio de Prevención le remite copia de la memoria anual)'] }]));


// ───────── Cuadros y esquemas del temario subrayado (tomos 11.2 y 11.3), recreados · añadidos 07/10/2026 ─────────
v('Artículo 1 — Objeto de la Ley', flujo('Objeto de la Ley 39/2015 (art. 1 · cuadro del temario)', [
  { et: 'Regula', t: `${D('El procedimiento administrativo común')} a todas las Administraciones Públicas (incluyendo el sancionador y el de reclamación de responsabilidad) · ${D('los requisitos de validez y eficacia')} de los actos administrativos · ${D('los principios')} de la iniciativa legislativa y de la potestad reglamentaria` },
  { bif: [
    { c: 'si', et: 'Mediante LEY', t: `Cuando resulte ${P('eficaz, proporcionado, necesario y motivado')}: podrán incluirse ${R('trámites adicionales o distintos')} a los de esta Ley` },
    { c: 'no', et: 'Mediante REGLAMENTO', t: `Podrán establecerse ${R('especialidades')} referidas a: órganos competentes · plazos propios por razón de la materia · formas de iniciación y terminación · publicación e informes a recabar` }] }]));
v('Artículo 5 — Representación', tabla('Representación en el procedimiento administrativo (art. 5 · cuadro del temario)', ['Concepto', 'Contenido'], [
  { l: 'Actuación', c: 'o', h: [{ t: `Por medio de representante: ${D('interesados con capacidad de obrar')}.` }, { t: `En representación de otras personas: personas físicas con capacidad de obrar y personas jurídicas ${K('siempre que')} ello esté previsto en sus Estatutos.` }] },
  { l: 'Acreditación', c: 'v', h: [
    { t: `Debe acreditarse la representación para: formular solicitudes, presentar declaraciones responsables o comunicaciones, interponer recursos, desistir de acciones y renunciar a derechos. Para los actos y gestiones de mero trámite ${P('se presumirá')} la representación.` },
    { l: 'Apoderamiento APUD ACTA (se entiende acreditada mediante)', c: 'v', h: [{ t: 'Comparecencia personal.' }, { t: 'Comparecencia electrónica en la correspondiente sede electrónica.' }, { t: 'Inscripción en el registro electrónico de apoderamientos de la Administración competente.' }] }] },
  { l: 'Falta o insuficiente acreditación', c: 'c', h: [
    { t: `${K('No impide')} que se tenga por realizado el acto de que se trate, ${K('siempre que')} se aporte la acreditación o se subsane el defecto.` },
    { p: '10 días', c: 'c', t: 'Plazo para subsanar que debe conceder el órgano administrativo (o un plazo superior cuando las circunstancias del caso así lo requieran). Art. 5.6' }] }]));
v('Artículo 15 — Lengua de los procedimientos', cols('Lengua de los procedimientos (art. 15 · cuadro del temario)', [
  { t: 'Administración General del Estado', l: [`Lengua: ${D('CASTELLANO')}.`, `No obstante, los interesados que se dirijan a órganos de la AGE ${P('con sede en el territorio de una Comunidad Autónoma')} podrán utilizar también la ${D('lengua cooficial')} de esa Comunidad: el procedimiento se tramita en la lengua elegida por el interesado.`, `Varios interesados y discrepancia: se tramita en ${D('castellano')}; los documentos o testimonios que requieran los interesados se expedirán en la lengua elegida por ellos.`] },
  { t: 'Administraciones de las CCAA y Entidades Locales', l: [`Se ajusta a ${D('lo previsto en la legislación autonómica')} correspondiente.`, `La Administración instructora deberá ${R('traducir al castellano')} los documentos que: deban surtir efecto fuera del territorio de la Comunidad, estén dirigidos a interesados que lo soliciten, o deban surtir efectos en el territorio de otra Comunidad con lengua cooficial distinta.`, `En ese último caso ${K('no será precisa')} su traducción.`] }]));
v('Artículo 22 — Suspensión del plazo máximo para resolver', flujo('Plazo máximo para resolver y notificar (art. 21 · cuadro del temario)', [
  { et: 'Art. 21', t: `El plazo máximo para notificar resolución expresa es el fijado por la ${D('norma reguladora')} del procedimiento` },
  { bif: [
    { c: 'no', et: 'Si la norma no fija plazo', t: `El plazo es de ${P('3 meses')}` },
    { c: 'si', et: 'Tope', t: `El plazo ${K('no podrá exceder')} de ${P('6 meses')}, ${K('salvo')} norma con rango de ley o Derecho de la Unión Europea` }] }]));
v('Artículo 30 — Cómputo de plazos', tabla('Cómputo de plazos (art. 30 · cuadro del temario)', ['Plazo señalado', 'Cómo se cuenta'], [
  { l: `Por HORAS ${K('(salvo')} que ley o Derecho de la UE dispongan otro cómputo)`, c: 'c', h: [
    { t: `Se entiende que son ${P('hábiles')}: todas las horas del día que formen parte de un día hábil.` },
    { t: `Se cuentan de ${P('hora en hora')} y de ${P('minuto en minuto')}, desde la hora y minuto en que tenga lugar la notificación o publicación del acto.` },
    { p: '24 horas', c: 'c', t: `${K('No podrán')} tener una duración superior a veinticuatro horas, en cuyo caso se expresarán en días.` }] },
  { l: `Por DÍAS ${K('(salvo')} que ley o Derecho de la UE dispongan otro cómputo)`, c: 'v', h: [
    { t: `Se entiende que son ${P('hábiles')}. Se ${K('excluyen')} los sábados, los domingos y los declarados festivos.` },
    { t: `Cuando se señalen por ${D('días naturales')} por ley o Derecho de la UE, se hará constar esta circunstancia en las notificaciones.` },
    { t: `Se cuentan a partir del ${P('día siguiente')} a la notificación o publicación, o desde el siguiente a aquel en que se produzca la estimación o desestimación por silencio administrativo.` }] },
  { l: 'Por MESES o AÑOS', c: 'o', h: [
    { t: `Se computan a partir del día siguiente a la notificación o publicación (o al de la estimación/desestimación por silencio).` },
    { t: `El plazo concluye el ${P('mismo día')} en el mes o año de vencimiento. ${K('Si no')} hubiera día equivalente, expira el ${P('último día del mes')}.` },
    { t: `Cuando el último día sea ${D('inhábil')}, se entiende prorrogado al primer día hábil siguiente.` },
    { t: `Día hábil en el municipio o CA del interesado e inhábil en la sede del órgano administrativo (o a la inversa): se considerará ${D('inhábil en todo caso')}.` }] }]));
v('Artículo 33 — Tramitación de urgencia', flujo('Tramitación de urgencia (art. 33 · cuadro del temario)', [
  { et: '33.1', t: `Cuando razones de ${D('interés público')} lo aconsejen, se podrá acordar ${R('de oficio o a petición del interesado')} la tramitación de urgencia` },
  { et: 'Efecto', t: `Se ${R('reducirán a la mitad')} los plazos establecidos para el procedimiento ordinario, ${K('salvo')} los relativos a la presentación de ${D('solicitudes')} y ${D('recursos')}` },
  { et: '33.2', c: 'no', t: `${K('No cabrá recurso alguno')} contra el acuerdo que declare la aplicación de la tramitación de urgencia, sin perjuicio del procedente contra la resolución que ponga fin al procedimiento` }]));
v('Artículo 40 — Notificación', tabla('Notificación (art. 40 · cuadro del temario)', ['Concepto', 'Contenido'], [
  { l: 'Competencia', c: 'o', h: [{ t: `El ${D('órgano que dicte')} las resoluciones y actos administrativos los notificará a los interesados cuyos derechos e intereses sean afectados por aquellos.` }] },
  { l: 'Plazo', c: 'c', h: [{ p: '10 días', c: 'c', t: 'a partir de la fecha en que el acto haya sido dictado.' }] },
  { l: 'Contenido (DEBE contener)', c: 'v', h: [{ t: `${D('Texto íntegro')} de la resolución, indicando si pone fin o no a la vía administrativa.` }, { t: `${D('Recursos que procedan')}, en su caso: en vía administrativa o judicial, órgano ante el que hubieran de presentarse y plazos para interponerlos.` }] }]));
v('Artículo 45 — Publicación', tabla('Publicación (art. 45 · cuadro del temario)', ['Concepto', 'Contenido'], [
  { l: 'Cuándo', c: 'o', h: [{ t: `Lo establezcan las normas reguladoras de cada procedimiento.` }, { t: `Lo aconsejen razones de ${D('interés público')} apreciadas por el órgano competente.` }] },
  { l: 'Objeto (surte los efectos de la notificación cuando)', c: 'v', h: [{ t: 'El acto tenga por destinatario una pluralidad indeterminada de personas.' }, { t: 'La Administración estime que la notificación a un solo interesado es insuficiente para garantizar la notificación a todos.' }, { t: `Se trate de actos integrantes de un ${D('procedimiento selectivo o de concurrencia competitiva')}.` }] },
  { l: 'Contenido', c: 'c', h: [{ t: `Texto íntegro de la resolución (indicando si pone fin o no a la vía administrativa) y recursos que procedan.` }] },
  { l: 'Lugar', c: 'o', h: [{ t: `En el ${D('diario oficial')} que corresponda según cuál sea la Administración de la que proceda el acto a notificar.` }] }]));
v('Artículo 47 — Nulidad de pleno derecho', cols('Nulidad y anulabilidad (arts. 47 y 48 · «MUY IMPORTANTE» en el temario)', [
  { t: 'NULIDAD DE PLENO DERECHO (actos)', l: [`Lesionen derechos y libertades susceptibles de amparo constitucional.`, `Dictados por órgano ${R('manifiestamente incompetente')} por razón de la materia o del territorio.`, `Tengan un contenido imposible.`, `Sean constitutivos de infracción penal o se dicten como consecuencia de ésta.`, `Dictados prescindiendo total y absolutamente del procedimiento legalmente establecido o de las normas esenciales de formación de la voluntad de los órganos colegiados.`, `Actos expresos o presuntos contrarios al ordenamiento por los que se adquieren facultades o derechos ${K('cuando')} se carezca de los requisitos esenciales.`, `Cualquier otro que se establezca expresamente en una disposición con rango de ley.`] },
  { t: 'NULIDAD DE PLENO DERECHO (disposiciones)', l: [`Vulneren la Constitución, las leyes u otras disposiciones administrativas de rango superior.`, `Las que regulen materias reservadas a la Ley.`, `Las que establezcan la retroactividad de disposiciones sancionadoras ${K('no')} favorables o restrictivas de derechos individuales.`] },
  { t: 'ANULABILIDAD', l: [`Actos que incurran en cualquier infracción del ordenamiento jurídico, incluso la ${R('desviación de poder')}.`, `El defecto de forma determina la anulabilidad ${K('solo')} cuando el acto carezca de los requisitos formales indispensables para alcanzar su fin o dé lugar a indefensión de los interesados.`, `Actuaciones fuera del tiempo establecido: anulabilidad ${K('solo')} si así lo impone la naturaleza del término o plazo.`] }]));
v('Artículo 52 — Convalidación', cols('Subsanación de actos viciados: conversión, conservación y convalidación (arts. 50-52 · cuadro del temario)', [
  { t: 'Conversión (art. 50)', l: [`Los actos nulos o anulables que contengan los elementos constitutivos de otro distinto producirán los efectos de éste.`] },
  { t: 'Conservación (art. 51)', l: [`El órgano que declare la nulidad o anule actuaciones dispondrá siempre la ${D('conservación')} de actos y trámites cuyo contenido se hubiera mantenido igual de no haberse cometido la infracción.`] },
  { t: 'Convalidación (art. 52)', l: [`La Administración podrá convalidar los actos anulables, subsanando los vicios de que adolezcan.`, `El acto de convalidación producirá efectos desde su fecha, ${K('salvo')} retroactividad cuando proceda (art. 39.3).`] }]));
v('Artículo 64 — Acuerdo de iniciación en los procedimientos de naturaleza sancionadora', arbol('Acuerdo de iniciación en los procedimientos sancionadores (art. 64 · cuadro del temario)', `${D('Acuerdo de iniciación')} del procedimiento sancionador`, [
  { t: 'Se COMUNICARÁ al instructor y, cuando las normas así lo prevean, al denunciante', sub: ['Instructor del procedimiento, trasladándole cuantas actuaciones existan', 'Denunciante (cuando las normas reguladoras así lo prevean)'] },
  { t: 'Se NOTIFICARÁ a los interesados (en todo caso, al inculpado)', sub: [] },
  { t: 'Deberá contener, al menos:', sub: ['Identificación de la persona o personas presuntamente responsables', 'Hechos que motivan la incoación, su posible calificación y sanciones', 'Identificación del instructor y, en su caso, Secretario', 'Órgano competente para la resolución y norma que le atribuya la competencia', 'Medidas de carácter provisional acordadas', 'Indicación del derecho a formular alegaciones y a la audiencia, y de los plazos', 'Si no hay alegaciones en plazo, el acuerdo podrá considerarse propuesta de resolución cuando contenga un pronunciamiento preciso sobre la responsabilidad imputada'] },
  { t: 'Excepcionalmente: si no hay elementos suficientes para la calificación inicial, podrá hacerse en una fase posterior mediante un Pliego de cargos, que deberá notificarse a los interesados', sub: [] }]));
v('Artículo 100 — Medios de ejecución forzosa', arbol('Medios de ejecución forzosa (arts. 100 a 104 · cuadro del temario)', `${D('Ejecución forzosa')}: respetando el principio de ${R('proporcionalidad')}; si hay varios medios admisibles se elegirá el ${K('menos restrictivo')} de la libertad individual; si hay que entrar en el domicilio: consentimiento del titular o autorización judicial`, [
  { t: 'Apremio sobre el patrimonio (art. 101)', sub: ['Cuando hubiera de satisfacerse cantidad líquida', 'No podrá imponerse una obligación pecuniaria no establecida con arreglo a una norma de rango legal'] },
  { t: 'Ejecución subsidiaria (art. 102)', sub: ['Actos que no sean personalísimos: los realiza la Administración, por sí o a través de las personas que determine, a costa del obligado', 'Importe de gastos, daños y perjuicios: se exige conforme al apremio; puede liquidarse provisionalmente y antes de la ejecución'] },
  { t: 'Multa coercitiva (art. 103)', sub: ['Actos personalísimos en que no proceda la compulsión directa, o en que la Administración no la estime conveniente, o cuya ejecución pueda encargarse a otra persona', 'Es independiente de las sanciones y compatible con ellas'] },
  { t: 'Compulsión sobre las personas (art. 104)', sub: ['Actos que impongan una obligación personalísima de no hacer o soportar, cuando la ley lo autorice y con respeto a la dignidad y derechos de la Constitución', 'Si son obligaciones personalísimas de hacer y no se realizan: el obligado resarcirá los daños y perjuicios'] }]));
v('Artículo 111 — Competencia para la revisión de oficio', arbol('Competencia para la revisión de oficio de disposiciones y actos nulos y anulables en la AGE (art. 111 · cuadro del temario)', `${D('Ámbito estatal')}: competentes para la revisión de oficio`, [
  { t: 'Consejo de Ministros', sub: ['Sus propios actos y disposiciones', 'Los actos y disposiciones dictados por los Ministros'] },
  { t: 'Administración General del Estado', sub: ['Ministros: actos y disposiciones de los Secretarios de Estado y de los dictados por órganos directivos de su Departamento no dependientes de una Secretaría de Estado', 'Secretarios de Estado: actos y disposiciones dictados por órganos directivos de ellos dependientes'] },
  { t: 'Organismos públicos y entidades de derecho público vinculados o dependientes de la AGE', sub: ['Los órganos a los que estén adscritos: actos y disposiciones dictados por el máximo órgano rector de éstos', 'Los máximos órganos rectores: actos y disposiciones dictados por los órganos de ellos dependientes'] }]));
v('Artículo 121 — Objeto', tabla('Recurso de alzada (arts. 121 y 122 · cuadro del temario)', ['Concepto', 'Contenido'], [
  { l: 'Objeto', c: 'o', h: [{ t: `Resoluciones y actos de trámite que determinen la imposibilidad de continuar el procedimiento, produzcan indefensión o perjuicio irreparable a derechos e intereses legítimos, ${K('siempre que')} no pongan fin a la vía administrativa.` }] },
  { l: 'Órgano ante el que ha de recurrirse', c: 'v', h: [{ t: `Ante el ${D('superior jerárquico')} del que dictó el acto.` }] },
  { l: 'Plazo', c: 'c', h: [{ p: '1 mes', c: 'c', t: 'si el acto fuera expreso.' }, { t: `Si no fuera expreso: para el solicitante y otros posibles interesados, a partir del ${P('día siguiente')} a aquel en que se produzcan los efectos del silencio administrativo (no tiene tope máximo de un mes). Transcurridos dichos plazos sin recurso, la resolución será ${D('firme')}.` }] },
  { l: 'Motivos', c: 'o', h: [{ t: `Nulidad o anulabilidad. Los vicios y defectos que hagan anulable el acto ${K('no podrán')} ser alegados por los causantes de los mismos.` }] },
  { l: 'Interposición', c: 'v', h: [{ p: '10 días', c: 'c', t: 'Si se interpone ante el órgano que dictó el acto, éste debe remitirlo al competente para resolver con su informe y una copia completa y ordenada del expediente.' }] },
  { l: 'Desestimación por silencio', c: 'c', h: [{ p: '3 meses', c: 'c', t: 'Plazo máximo para dictar y notificar la resolución; transcurrido sin resolución, desestimado (salvo doble silencio administrativo, que tiene efectos estimatorios).' }, { t: `Contra la resolución de un recurso de alzada ${K('no cabrá')} ningún otro recurso administrativo, ${K('salvo')} el recurso extraordinario de revisión.` }] }]));
v('Artículo 123 — Objeto y naturaleza', tabla('Recurso potestativo de reposición (arts. 123 y 124 · cuadro del temario)', ['Concepto', 'Contenido'], [
  { l: 'Objeto', c: 'o', h: [{ t: `Actos administrativos que pongan fin a la vía administrativa, ${K('excepto')} contra los que resuelvan un recurso de alzada.` }] },
  { l: 'Órgano ante el que ha de recurrirse', c: 'v', h: [{ t: `Ante el ${D('mismo órgano')} que dictó el acto que se impugna.` }, { t: `Es ${D('potestativo')}: puede optarse por interponerlo o impugnar directamente ante la jurisdicción contencioso-administrativa.` }, { t: `Si se hace uso de él, ${K('no podrá')} interponerse recurso contencioso-administrativo hasta que sea resuelto expresamente o se haya producido su desestimación presunta.` }] },
  { l: 'Plazos', c: 'c', h: [{ p: '1 mes', c: 'c', t: 'si el acto fuera expreso. Transcurrido dicho plazo, únicamente podrá interponerse recurso contencioso-administrativo (sin perjuicio del extraordinario de revisión).' }, { t: `Si no fuera expreso: en cualquier momento a partir del día siguiente a aquel en que se produzca el acto presunto.` }, { p: '1 mes', c: 'c', t: 'Plazo máximo para dictar y notificar la resolución.' }, { t: `Contra la resolución de un recurso de reposición ${K('no podrá')} interponerse de nuevo dicho recurso.` }] }]));
v('Artículo 126 — Resolución', tabla('Recurso extraordinario de revisión (arts. 125 y 126 · cuadro del temario)', ['Concepto', 'Contenido'], [
  { l: 'Objeto', c: 'o', h: [{ t: `Contra los ${D('actos firmes')} en vía administrativa.` }] },
  { l: 'Órgano ante el que ha de interponerse', c: 'v', h: [{ t: `Ante el órgano administrativo que los dictó, que también será el competente para su resolución.` }] },
  { l: 'Circunstancias que deben concurrir', c: 'o', h: [
    { t: `a) Error de hecho que resulte de los propios documentos incorporados al expediente.` },
    { t: `b) Aparezcan documentos de valor esencial para la resolución, posteriores, que evidencien el error de la resolución recurrida.` },
    { t: `c) Haya influido esencialmente en la resolución documentos o testimonios declarados falsos por sentencia judicial firme.` },
    { t: `d) La resolución se hubiese dictado como consecuencia de prevaricación, cohecho, violencia, maquinación fraudulenta u otra conducta punible, declarada por sentencia judicial firme.` }] },
  { l: 'Plazos de interposición', c: 'c', h: [{ p: '4 años', c: 'c', t: 'Causa de la letra a (error de hecho): desde la fecha de la notificación de la resolución impugnada.' }, { p: '3 meses', c: 'c', t: 'Resto de casos: a contar desde el conocimiento de los documentos o desde que la sentencia judicial quedó firme.' }] },
  { l: 'Inadmisión', c: 'v', h: [{ t: `El órgano competente podrá acordar motivadamente la inadmisión a trámite, sin necesidad de recabar dictamen del Consejo de Estado u órgano consultivo, cuando: no se funde en alguna de las causas previstas, o se hubiesen desestimado en cuanto al fondo otros recursos sustancialmente iguales.` }] },
  { l: 'Resolución y silencio', c: 'c', h: [{ p: '3 meses', c: 'c', t: 'Plazo para la instrucción, resolución y notificación; transcurrido sin haberse dictado y notificado resolución, se entenderá desestimado, quedando expedita la vía contencioso-administrativa.' }] }]));

// ───────── Ley 40/2015 · órganos (cuadros del temario) ─────────
v('Artículo 13 — Suplencia', tabla('Suplencia (art. 13 · cuadro del temario)', ['Concepto', 'Contenido'], [
  { l: 'Concepto', c: 'o', h: [{ t: `En la forma que disponga cada Administración Pública, los titulares de los órganos administrativos podrán ser ${D('suplidos temporalmente')}.` }, { t: `${K('No implicará')} alteración de la competencia; para su validez ${K('no será necesaria')} su publicación.` }, { t: `Si no se designa suplente, la competencia se ejercerá por quien designe el ${D('órgano administrativo inmediato superior')} de quien dependa.` }] },
  { l: 'Supuestos', c: 'v', h: [{ t: `${P('Vacante, ausencia, enfermedad')}, así como en los casos en que haya sido declarada su ${P('abstención o recusación')}.` }] },
  { l: 'Designación (en el ámbito de la AGE)', c: 'c', h: [{ t: `En los reales decretos de estructura orgánica básica de los Departamentos Ministeriales o en los estatutos de sus Organismos públicos y Entidades vinculados o dependientes.` }, { t: `Por el órgano competente para el nombramiento del titular, bien en el propio acto de nombramiento, bien en otro posterior cuando se produzca el supuesto que dé lugar a la suplencia.` }] }]));
v('Artículo 19 — Régimen de los órganos colegiados', flujo('Funciones del Secretario del órgano colegiado (tras el art. 19 · cuadro del temario)', [
  { et: 'Corresponde', t: `Asistir a las reuniones con voz pero ${K('sin voto')} (con voz y voto si la Secretaría la ostenta un miembro del mismo) · efectuar la convocatoria de las sesiones por orden del Presidente, así como las citaciones a los miembros` },
  { et: 'Además', t: `Recibir los actos de comunicación de los miembros con el órgano · preparar el despacho de los asuntos, redactar y autorizar las actas · ${R('expedir certificaciones')} de las consultas, dictámenes y acuerdos aprobados · cuantas otras funciones sean inherentes a su condición` }]));
v('Artículo 21 — Clasificación y composición de los órganos colegiados', cols('Órganos colegiados de la Administración General del Estado (art. 21 · cuadro del temario)', [
  { t: 'Interministeriales', l: [`Sus miembros proceden de ${D('diferentes Ministerios')}.`] },
  { t: 'Ministeriales', l: [`Sus componentes proceden de los órganos de ${D('un solo Ministerio')}.`] },
  { t: 'Composición', l: [`Podrá haber representantes de otras Administraciones Públicas cuando: éstas lo acepten ${P('voluntariamente')}, un convenio así lo establezca o una norma aplicable lo determine.`, `Podrán participar organizaciones representativas de intereses sociales y otros miembros designados por su experiencia o conocimientos.`] }]));
v('Artículo 24 — Recusación', cols('Abstención y recusación (arts. 23 y 24 · cuadro del temario)', [
  { t: 'ABSTENCIÓN (art. 23): motivos', l: [`Tener ${D('interés personal')} en el asunto o en otro en cuya resolución pudiera influir; ser administrador de sociedad o entidad interesada, o tener cuestión litigiosa pendiente con algún interesado.`, `Vínculo matrimonial o situación de hecho asimilable y parentesco de consanguinidad dentro del ${P('cuarto grado')} o de afinidad dentro del ${P('segundo')} con cualquiera de los interesados, administradores, asesores, representantes legales o mandatarios.`, `${D('Amistad íntima')} o enemistad manifiesta con alguna de las personas mencionadas.`, `Haber intervenido como ${D('perito o testigo')} en el procedimiento.`, `Tener ${D('relación de servicio')} con persona interesada directamente en el asunto, o haberle prestado en los ${P('dos últimos años')} servicios profesionales de cualquier tipo.`] },
  { t: 'RECUSACIÓN (art. 24)', l: [`Podrá promoverse en cualquier momento de la tramitación del procedimiento.`, `Se planteará ${D('por escrito')} expresando la causa.`, `En el ${P('día siguiente')} el recusado manifestará a su inmediato superior si se da o no la causa; si se da, acordará su sustitución acto seguido.`, `Si el recusado niega la causa, el superior resolverá en el plazo de ${P('3 días')}, previos los informes y comprobaciones oportunas.`, `Contra las resoluciones adoptadas ${K('no cabrá recurso')}, sin perjuicio de alegar la recusación al interponer el recurso contra el acto que ponga fin al procedimiento.`] }]));
v('Artículo 55 — Estructura de la Administración General del Estado', arbol('La Administración General del Estado comprende (art. 55 · cuadro del temario)', `${D('Administración General del Estado')}: organización por principios de ${P('división funcional')} en Departamentos ministeriales y de ${P('gestión territorial')} en Delegaciones del Gobierno (salvo excepciones)`, [
  'Organización central: integra los Ministerios y los servicios comunes (funcional → Ministerios)',
  'Organización territorial: Delegaciones y Subdelegaciones del Gobierno (territorial → Delegaciones en las CCAA)',
  'Administración General del Estado en el exterior: Misiones diplomáticas, etc.']));

L.inserta(11, V);
