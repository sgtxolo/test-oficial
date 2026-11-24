// Tema 1 · bloque 14 · preguntas de CONTENIDO del párrafo con asterisco ✱ del Estatuto de Roma (art. 53.3.b) · IA estilo examen (1-ia-4301…)
// Regla del usuario (24/11/2026): si el ✱ está al principio de un párrafo, no se pregunta «qué párrafo», sino lo importante de ese párrafo (2-3 preguntas).
// Uso: node prompts/herramientas/preguntas-t1r-b14.js [--json <salida.json>]
const k = 'er';
const Q = [
{k, a: 'art. 53.3', r: 'Inicio de una investigación. Control de la Sala', e: 'La Sala de Cuestiones Preliminares podrá, de oficio, revisar una decisión del fiscal de no proceder a la investigación cuando dicha decisión se base únicamente en:',
 o: ['el interés de la justicia.', 'la falta de fundamento razonable.', 'la inadmisibilidad de la causa.', 'la falta de competencia de la Corte.'],
 t: 'podrá, de oficio, revisar una decisión del fiscal de no proceder a la investigación si dicha decisión se basare únicamente en el párrafo 1.c), o el párrafo 2.c)',
 p: 'Los párrafos 1.c) y 2.c) del artículo 53 se refieren al interés de la justicia: solo en ese caso la Sala actúa de oficio.', d: 'dificil'},
{k, a: 'art. 53.3', r: 'Inicio de una investigación. Control de la Sala', e: 'Cuando la Sala de Cuestiones Preliminares revisa de oficio la decisión del fiscal de no proceder a la investigación, esa decisión del fiscal únicamente surtirá efecto si es:',
 o: ['confirmada por la Sala de Cuestiones Preliminares.', 'comunicada a la Presidencia de la Corte.', 'ratificada por el Consejo de Seguridad.', 'notificada al Estado que haya remitido el asunto.'],
 t: 'la decisión del fiscal únicamente surtirá efecto si es confirmada por la Sala de Cuestiones Preliminares',
 p: 'Sin la confirmación de la Sala, la decisión de no investigar por razones de interés de la justicia no produce efecto.'},
{k, a: 'art. 53.3', r: 'Inicio de una investigación. Control de la Sala', e: 'A petición del Estado que haya remitido el asunto o del Consejo de Seguridad, la Sala de Cuestiones Preliminares podrá examinar la decisión del fiscal de no proceder a la investigación y pedir al fiscal que:',
 o: ['reconsidere esa decisión.', 'inicie de inmediato la investigación.', 'archive definitivamente el asunto.', 'someta la decisión a la Asamblea de los Estados Partes.'],
 t: 'pedir al fiscal que reconsidere esa decisión',
 p: 'La Sala puede pedir al fiscal que reconsidere su decisión; la facultad de revisarla de oficio es distinta y solo vale para el interés de la justicia.'},
];
require('./preguntas-t1r-lib.js').run({ bloque: 14, Q });
