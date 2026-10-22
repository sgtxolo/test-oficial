// Tema 6 · fase 2 de las marcas, parte E (22/10/2026): apartados con círculo EX que seguían sin pregunta oficial (cobertura-marcas.js 6).
// EX → banco OFICIAL (pauta 21/10/2026: una IA ya no cubre un EX) · ids 6-466… · cita literal comprobada contra tema6/lo4.txt y l12.txt.
// Uso: node prompts/herramientas/tema6/preguntas-marcas-t6e.js [--check]
const LO = ['Ley Orgánica 4/2000, de 11 de enero, sobre derechos y libertades de los extranjeros en España y su integración social', 'LO 4/2000', 'De la Ley de Extranjería'];
const AS = ['Ley 12/2009, de 30 de octubre, reguladora del derecho de asilo y de la protección subsidiaria', 'Ley 12/2009', 'De la Ley de Asilo'];
const Q = [
{n: LO, ia: false, a: 'art. 36.3', r: 'Autorización de residencia y trabajo', e: 'Cuando el extranjero se propusiera trabajar por cuenta propia o ajena, ejerciendo una profesión para la que se exija una titulación especial, la concesión de la autorización se condicionará:',
 o: ['a la tenencia y, en su caso, homologación del título correspondiente y, si las leyes así lo exigiesen, a la colegiación.', 'a la homologación previa del título correspondiente por el Ministerio competente y, en todo caso, a la colegiación del interesado.', 'a la tenencia del título correspondiente, sin que pueda exigirse su homologación ni la colegiación hasta la primera renovación.', 'a la tenencia del título correspondiente y a la acreditación de experiencia profesional mínima de un año en el país de origen.'],
 t: '3. Cuando el extranjero se propusiera trabajar por cuenta propia o ajena, ejerciendo una profesión para la que se exija una titulación especial, la concesión de la autorización se condicionará a la tenencia y, en su caso, homologación del título correspondiente y, si las leyes así lo exigiesen, a la colegiación',
 p: 'Título (y homologación, en su caso) y colegiación solo si las leyes lo exigen.'},
{n: LO, ia: false, a: 'art. 44.2.c)', r: 'Hecho imponible', e: 'Constituye el hecho imponible de las tasas, en particular, la tramitación de autorizaciones de trabajo, salvo que se trate de autorizaciones para un período inferior a __________.',
 o: ['seis meses.', 'tres meses de duración.', 'noventa días naturales.', 'un año natural completo.'],
 t: 'c) La tramitación de autorizaciones de trabajo, salvo que se trate de autorizaciones para un período inferior a seis meses',
 p: 'Las autorizaciones de trabajo inferiores a seis meses no generan la tasa.'},
{n: LO, ia: false, a: 'art. 61.1', r: 'Medidas cautelares', e: 'Desde el momento en que se incoe un procedimiento sancionador en el que pueda proponerse la expulsión, a fin de asegurar la resolución final que pudiera recaer, podrá adoptar alguna de las medidas cautelares previstas en la ley:',
 o: ['el Delegado o Subdelegado del Gobierno de la provincia.', 'el instructor.', 'el Juez de instrucción del lugar de la detención.', 'el Ministerio Fiscal, de oficio o a instancia de parte.'], c: 1,
 t: '1. Desde el momento en que se incoe un procedimiento sancionador en el que pueda proponerse la expulsión, el instructor, a fin de asegurar la resolución final que pudiera recaer, podrá adoptar alguna de las siguientes medidas cautelares',
 p: 'Las medidas cautelares las adopta el instructor.'},
{n: LO, ia: false, a: 'art. 64.2', r: 'Ejecución de la expulsión', e: 'Tanto en los supuestos de prórroga del plazo de cumplimiento voluntario como de aplazamiento o suspensión de la ejecución de la expulsión, lo que se acreditará __________, se tendrá en cuenta la garantía para el extranjero afectado de determinados extremos.',
 o: ['mediante diligencia extendida en el pasaporte del interesado', 'en documento debidamente notificado al interesado', 'en resolución motivada publicada en el boletín oficial', 'mediante comparecencia personal ante la autoridad gubernativa'], c: 1,
 t: '2. Tanto en los supuestos de prórroga del plazo de cumplimiento voluntario como de aplazamiento o suspensión de la ejecución de la expulsión, lo que se acreditará en documento debidamente notificado al interesado, se tendrá en cuenta la garantía para el extranjero afectado de',
 p: 'Se acredita en documento debidamente notificado al interesado.'},
{n: AS, ia: false, a: 'art. 13', r: 'Agentes de persecución o causantes de daños graves', e: 'En relación con los agentes de persecución o causantes de daños graves, señale la correcta:',
 o: ['Podrán ser, entre otros, el Estado.', 'Podrán ser únicamente el Estado y los partidos u organizaciones que lo controlen.', 'Solo podrán ser agentes no estatales cuando así lo reconozca el país de origen.', 'Serán exclusivamente los enumerados en la ley, sin que quepa admitir ningún otro.'], c: 0,
 t: 'Los agentes de persecución o causantes de daños graves podrán ser, entre otros: a) el Estado',
 p: 'La enumeración es abierta («entre otros») y empieza por el Estado.'},
{n: AS, ia: false, a: 'art. 25.4', r: 'Tramitación de urgencia', e: 'A la tramitación de urgencia le será de aplicación lo dispuesto para el procedimiento ordinario, salvo en materia de plazos, que:',
 o: ['se verán reducidos a la tercera parte.', 'serán los mismos que en el procedimiento ordinario.', 'se ampliarán al doble en las solicitudes de frontera.', 'se verán reducidos a la mitad.'], c: 3,
 t: '4. Será de aplicación al presente procedimiento lo dispuesto en el artículo 24 de la Ley, salvo en materia de plazos que se verán reducidos a la mitad',
 p: 'Urgencia = plazos del ordinario reducidos a la mitad.'},
{n: AS, ia: false, a: 'art. 42.1.a)', r: 'Cese del estatuto de refugiado', e: 'Quienes expresamente así lo soliciten:',
 o: ['verán revocado su estatuto por resolución motivada del Ministerio del Interior.', 'cesarán en la protección subsidiaria, pero conservarán la condición de refugiado.', 'cesarán en la condición de refugiados.', 'perderán además, en todo caso, el derecho a seguir residiendo en España.'], c: 2,
 t: '1. Cesarán en la condición de refugiados quienes: a) expresamente así lo soliciten',
 p: 'La solicitud expresa del interesado es causa de cese (no de revocación).'},
];
// la correcta rota de posición cuando no se fija (A/B/C/D)
Q.forEach((q, i) => { if (q.c === undefined) { const ok = q.o.shift(); q.c = (i * 3) % 4; q.o.splice(q.c, 0, ok); } });
require('../preguntas-marcas-lib.js')({ T: 6, fuentes: ['tema6/lo4.txt', 'tema6/l12.txt'], desdeOf: 466, desdeIA: 1, Q });
