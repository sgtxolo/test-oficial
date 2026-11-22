// Tema 27 · fase 2 de las marcas: preguntas OFICIALES (ids 27-223…) para los párrafos con EX / EXOF sin pregunta (cobertura-marcas.js 27).
// R10 (punto B.10) ya la cubre la oficial 27-79 (falso positivo del detector: la redacción del temario trae «medida disciplinario»).
const COD = ['Real Decreto 176/2022, de 4 de marzo, por el que se aprueba el Código de Conducta del personal de la Guardia Civil', 'Real Decreto 176/2022, Código de Conducta del personal de la Guardia Civil', 'Real Decreto 176/2022, de 4 de marzo, por el que se aprueba el Código de Conducta del Personal de la Guardia Civil'];
const OG = ['Orden General número 10/2024, de 31 de octubre, por la que se regula el Sistema de Integridad de la Guardia Civil', 'Orden General 10/2024, Sistema de Integridad de la Guardia Civil (SINTEGC)', 'Orden General número 10/2024, por la que se regula el Sistema de Integridad de la Guardia Civil'];
const R = [
  { n: COD, ia: false, a: 'art. 12', r: 'Igualdad y no discriminación', e: 'Actuarán siempre guiados por el principio de igualdad y no discriminación por razón de nacimiento, raza, sexo, orientación sexual, religión o creencia, convicción política, discapacidad física o psíquica, edad, lengua o cualquier otra:',
    o: ['Condición o circunstancia personal o social.', 'Condición o circunstancia económica o laboral, en el ejercicio del servicio.', 'Situación administrativa o de destino que ocupen en la institución.', 'Característica personal o profesional apreciada por el mando competente.'], c: 0,
    t: 'edad, lengua o cualquier otra condición o circunstancia personal o social', p: 'La cláusula final es «cualquier otra condición o circunstancia personal o social».' },
  { n: OG, ia: false, a: 'art. 9.6', r: 'Buzón de ética institucional', e: 'Se acusará recibo de la solicitud efectuada al Buzón de ética institucional en un plazo máximo de:',
    o: ['7 días hábiles desde su recepción.', '5 días hábiles desde su recepción.', '10 días naturales desde su recepción.', '15 días hábiles desde su recepción.'], c: 0,
    t: 'Se acusará recibo de la solicitud efectuada en un plazo máximo de 7 días hábiles desde su recepción', p: 'El acuse de recibo es en 7 días hábiles; la contestación, en 1 mes.' },
  { n: OG, ia: false, a: 'art. 9.6', r: 'Buzón de ética institucional', e: 'Si el Observatorio eleva al COMGECET propuesta de respuesta sobre consultas de complejidad añadida, el plazo para la contestación se ampliará en:',
    o: ['10 días hábiles.', '15 días hábiles.', '10 días naturales.', 'Un mes más.'], c: 0,
    t: 'el plazo para la contestación se ampliará en 10 días hábiles', p: 'La ampliación es de 10 días hábiles.' },
  { n: OG, ia: false, a: 'art. 12.5', r: 'Comité interno de gestión de medidas antifraude', e: 'La persona que ejerza la Presidencia del Comité interno será la que represente a la Dirección General de la Guardia Civil en el Comité de Gestión del Plan de Medidas Antifraude del:',
    o: ['Ministerio del Interior.', 'Ministerio de Defensa.', 'Ministerio de Hacienda.', 'Ministerio de la Presidencia.'], c: 0,
    t: 'en el Comité de Gestión del Plan de Medidas Antifraude del Ministerio del Interior', p: 'Es el Comité de Gestión del Plan de Medidas Antifraude del Ministerio del Interior.' },
];
[2, 0, 3, 1].forEach((p, i) => { const q = R[i], ok = q.o.splice(0, 1)[0]; q.o.splice(p, 0, ok); q.c = p; });
require('../preguntas-marcas-lib.js')({ T: 27, fmt: 'nuevo', fuentes: ['tema27/oficial.txt'], desdeOf: 223, desdeIA: 1, Q: R });
