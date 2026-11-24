// Tema 1 · bloque 16 · preguntas PARECIDAS a las oficiales de los párrafos con ✱ (Roma: lesa humanidad, guerra, agresión) → van al banco OFICIAL
// Uso: node prompts/herramientas/preguntas-t1r-b16.js --json privado/tmp/b16.json  y luego  node prompts/herramientas/anade-oficiales-ast.js 1 privado/tmp/b16.json
const k = 'er';
const Q = [
{k, a: 'art. 7.1.d', r: 'Crímenes de lesa humanidad', e: 'A los efectos del Estatuto, se entenderá por «crimen de lesa humanidad» cualquiera de los actos siguientes cuando se cometa como parte de un ataque generalizado o sistemático contra una población civil y con conocimiento de dicho ataque. Señale cuál de los siguientes actos figura expresamente entre ellos:',
 o: ['La deportación o traslado forzoso de población.', 'El reclutamiento o alistamiento de niños menores de quince años.', 'Dirigir intencionalmente ataques contra la población civil.', 'La destrucción o apropiación de bienes no justificada por necesidades militares.'],
 t: 'd) Deportación o traslado forzoso de población',
 p: 'La deportación o traslado forzoso de población es un acto de lesa humanidad; los otros tres son crímenes de guerra.'},
{k, a: 'art. 7.1.h', r: 'Crímenes de lesa humanidad. Persecución', e: 'La persecución de un grupo o colectividad con identidad propia fundada en motivos políticos, raciales, nacionales, étnicos, culturales, religiosos, de género u otros motivos universalmente reconocidos como inaceptables con arreglo al derecho internacional constituye crimen de lesa humanidad cuando se comete:',
 o: ['en conexión con cualquier acto mencionado en el presente párrafo o con cualquier crimen de la competencia de la Corte.', 'únicamente en conexión con un crimen de guerra o con el crimen de genocidio.', 'exclusivamente en tiempo de conflicto armado, internacional o interno.', 'siempre que medie una declaración previa del Consejo de Seguridad.'],
 t: 'en conexión con cualquier acto mencionado en el presente párrafo o con cualquier crimen de la competencia de la Corte', d: 'dificil',
 p: 'La persecución es lesa humanidad si se conecta con cualquier acto del párrafo o con cualquier crimen de la competencia de la Corte.'},
{k, a: 'art. 7.2.e', r: 'Crímenes de lesa humanidad. Definiciones (tortura)', e: 'Por «tortura» se entenderá causar intencionalmente dolor o sufrimientos graves, ya sean físicos o mentales, a una persona que el acusado tenga bajo su custodia o control. No se entenderá por tortura el dolor o los sufrimientos que se deriven únicamente de:',
 o: ['sanciones lícitas o que sean consecuencia normal o fortuita de ellas.', 'medidas disciplinarias impuestas por la autoridad competente.', 'órdenes legítimas de un superior jerárquico.', 'actos realizados en cumplimiento de un deber legal.'],
 t: 'no se entenderá por tortura el dolor o los sufrimientos que se deriven únicamente de sanciones lícitas o que sean consecuencia normal o fortuita de ellas',
 p: 'Quedan fuera de la tortura el dolor o sufrimiento derivados únicamente de sanciones lícitas o consecuencia normal o fortuita de ellas.'},
{k, a: 'art. 8.2.b', r: 'Crímenes de guerra', e: 'A los efectos del Estatuto, se entiende por «crímenes de guerra» las otras violaciones graves de las leyes y usos aplicables en los conflictos armados internacionales dentro del marco establecido de:',
 o: ['derecho internacional.', 'derecho internacional humanitario consuetudinario.', 'los Convenios de Ginebra de 12 de agosto de 1949.', 'la Carta de las Naciones Unidas.'],
 t: 'dentro del marco establecido de derecho internacional',
 p: 'La letra b) habla de conflictos armados internacionales dentro del marco establecido de derecho internacional.'},
{k, a: 'art. 8 bis.2', r: 'Crimen de agresión', e: 'A los efectos del crimen de agresión, por «acto de agresión» se entenderá el uso de la fuerza armada por un Estado contra:',
 o: ['la soberanía, la integridad territorial o la independencia política de otro Estado, o en cualquier otra forma incompatible con la Carta de las Naciones Unidas.', 'la población civil de otro Estado, con el fin de provocar su desplazamiento forzoso o su sometimiento político.', 'los bienes y recursos de otro Estado, cuando no medie declaración previa del Consejo de Seguridad.', 'las fuerzas armadas de otro Estado, sin que medie declaración formal de guerra por la Asamblea General.'],
 t: 'el uso de la fuerza armada por un Estado contra la soberanía, la integridad territorial o la independencia política de otro Estado, o en cualquier otra forma incompatible con la Carta de las Naciones Unidas', d: 'dificil',
 p: 'El acto de agresión es el uso de la fuerza armada contra la soberanía, integridad territorial o independencia política de otro Estado, o de forma incompatible con la Carta.'},
{k, a: 'art. 15 bis.3', r: 'Ejercicio de la competencia respecto del crimen de agresión', e: 'La Corte ejercerá su competencia respecto del crimen de agresión a condición de que se adopte una decisión después del 1 de enero de 2017 por la misma mayoría de Estados Partes que se requiere para la aprobación de una enmienda al Estatuto, es decir, una mayoría de:',
 o: ['dos tercios.', 'tres cuartos.', 'tres quintos.', 'la mayoría absoluta.'],
 t: 'por la misma mayoría de Estados Partes que se requiere para la aprobación de una enmienda al Estatuto (mayoría de 2/3)',
 p: 'La decisión requiere la misma mayoría que una enmienda al Estatuto: dos tercios.'},
{k, a: 'art. 15 bis.4', r: 'Ejercicio de la competencia respecto del crimen de agresión', e: 'Un Estado Parte puede declarar que no acepta la competencia de la Corte sobre el crimen de agresión mediante declaración depositada en poder del Secretario. La retirada de esa declaración podrá efectuarse en cualquier momento y será considerada por el Estado Parte en un plazo de:',
 o: ['tres años.', 'un año.', 'cinco años.', 'seis meses.'],
 t: 'La retirada de esa declaración podrá efectuarse en cualquier momento y será considerada por el Estado Parte en un plazo de tres años',
 p: 'La retirada puede hacerse en cualquier momento y el Estado Parte la considerará en un plazo de tres años.'},
];
require('./preguntas-t1r-lib.js').run({ bloque: 16, Q });
