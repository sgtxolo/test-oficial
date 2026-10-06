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

L.inserta(11, V);
