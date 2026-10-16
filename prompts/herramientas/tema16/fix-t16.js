// Tema 16 — revisión del banco OFICIAL (la batería de la academia) contra el temario oficial (LO 3/2007 + RD 247/2024).
// Cada pregunta se corrige o se reconstruye (cuando el texto estaba corrupto por el OCR) y su explicación pasa al formato
// «respuesta → artículo en morado → cita LITERAL en rojo → por qué fallan las otras». Las citas salen de texto-t16.js (literales).
// Uso: node fix-t16.js test-oficial-conocimiento.html
const fs = require('fs');
const { lit, art } = require('./texto-t16.js');
const FILE = process.argv[2];
let s = fs.readFileSync(FILE, 'utf8');
const BS = String.fromCharCode(92), L = 'ABCD';
const LO = 'Ley Orgánica 3/2007';
const P = 'Ley Orgánica 3/2007, de 22 de marzo, para la igualdad efectiva de mujeres y hombres. ';
const PR = 'Real Decreto 247/2024, de 8 de marzo, por el que se aprueba el Protocolo de actuación frente al acoso sexual y al acoso por razón de sexo en el ámbito de la Administración General del Estado y de sus organismos públicos. ';
const c = (n, ini, fin) => lit(art(n), ini, fin);       // cita literal dentro del artículo n de la LO 3/2007
const r = (ini, fin) => lit(null, ini, fin);               // cita literal en el RD 247/2024 (protocolo)
const ex = (q, label, cita, extra) => `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>El <span class="ref-norma">${label}</span> dispone: <span class="ref-concepto">"${cita}"</span>${extra ? '. ' + extra : ''}`;
const ART = (n, ap) => `art. ${n} de la ${LO}`;
// ---- citas reutilizadas ----
const A64 = c(64, 'El Gobierno aprobará, al inicio de cada legislatura', 'dependientes de ella.');
const A64E = c(64, 'y su cumplimiento será evaluado anualmente por el Consejo de Ministros.');
const A64N = c(64, 'El Plan será objeto de negociación, y en su caso acuerdo, con la representación legal de los empleados públicos', 'en la Administración Pública');
const A60 = c(60, 'se reservará al menos un 40% de las plazas', 'requisitos establecidos.');
const A10 = c(10, 'Los actos y las cláusulas de los negocios jurídicos', 'conductas discriminatorias.');
const A3 = c(3, 'El principio de igualdad de trato entre mujeres y hombres supone', 'el estado civil.');
const A51 = c(51, 'Las Administraciones públicas, en el ámbito de sus respectivas competencias', 'ámbitos de actuación.');
const A18 = c(18, 'En los términos que reglamentariamente se determinen', 'Cortes Generales.');
const A63 = c(63, 'Todos los Departamentos Ministeriales y Organismos Públicos remitirán, al menos anualmente', 'retribuciones promediadas de su personal.');
const A14_5 = c(14, '5. La adopción de las medidas necesarias para la erradicación', 'acoso por razón de sexo.');
const A6_1 = c(6, '1. Se considera discriminación directa por razón de sexo', 'situación comparable.');
const A6_2 = c(6, '2. Se considera discriminación indirecta por razón de sexo', 'necesarios y adecuados.');
const A7_1 = c(7, '1. Sin perjuicio de lo establecido en el Código Penal', 'degradante u ofensivo.');
const A7_2 = c(7, '2. Constituye acoso por razón de sexo', 'degradante u ofensivo.');
const A58 = c(58, 'podrá concederse licencia por riesgo durante el embarazo', 'legislación específica.');
const A12_3 = c(12, '3. La persona acosada será la única legitimada', 'acoso por razón de sexo.');
const A13_1 = c(13, 'De acuerdo con las Leyes procesales', 'su proporcionalidad.');
const A12_2 = c(12, '2. La capacidad y legitimación para intervenir', 'de estos procesos.');
const A21_1 = c(21, 'La Administración General del Estado y las Administraciones de las Comunidades Autónomas cooperarán', 'con esta finalidad.');
const A68 = c(68, 'Las normas referidas al personal al servicio de las administraciones públicas', 'su normativa específica.');
const A66 = c(66, 'Las normas referidas al personal al servicio de las administraciones públicas', 'su normativa específica.');
const A67 = c(67, 'Las normas reguladoras de las Fuerzas y Cuerpos de Seguridad del Estado promoverán', 'situaciones administrativas.');
const A65 = c(65, 'Las normas sobre personal de las Fuerzas Armadas procurarán', 'situaciones administrativas.');
const A5_1 = c(5, 'El principio de igualdad de trato y de oportunidades entre mujeres y hombres, aplicable', 'concedidas por las mismas.');
const RD_OIT = r('La OIT define violencia contra la mujer', 'en la vida privada».');
const RD_ONU = r('De acuerdo con las Naciones Unidas', 'contra las mujeres.');
const RD_CE = r('El convenio define la «violencia contra las mujeres»', 'vida pública o privada.');
const RD_COM = r('La comunicación, a través de los canales establecidos, podrá ser presentada por:', 'acoso por razón de sexo.');
const RD_INF = r('El informe deberá incluir, como mínimo, la información siguiente:', '– Conclusiones.');
const RD_FOR = r('La Dirección General de la Función Pública, con la colaboración del Instituto de las Mujeres', 'asesoría confidencial en la AGE».');
const A14_8 = c(14, '8. El establecimiento de medidas que aseguren la conciliación', 'atención a la familia.');
const A14_10 = c(14, '10. El fomento de la efectividad del principio de igualdad', 'relaciones entre particulares.');
const A14_7 = c(14, '7. La protección de la maternidad', 'parto y lactancia.');
const A14_6 = c(14, '6. La consideración de las singulares dificultades', 'medidas de acción positiva.');
const A14_4 = c(14, '4. La participación equilibrada', 'toma de decisiones.');

// Fuerzas-trampa: Gobierno aprueba el Plan; el Consejo de Ministros lo evalúa
const NOTA_PLAN = 'Ojo: el Plan lo APRUEBA «el Gobierno» (art. 64) y su cumplimiento lo EVALÚA «el Consejo de Ministros».';
const OPT_PLAN = ['Las Cortes Generales.', 'El Gobierno.', 'El Presidente del Gobierno.', 'El Ministro de Asuntos Sociales e Igualdad.'];

// F = [id, etiqueta del artículo, cita literal, nota opcional, función que modifica la pregunta (opcional)]
const F = [
  ['16-1', ART('21.1'), A21_1],
  ['16-2', ART('64'), A64, NOTA_PLAN, q => { q.opciones = OPT_PLAN.slice(); q.correcta = 1; }],
  ['16-3', ART('60.2'), A60],
  ['16-4', ART('64'), A64E, 'El Plan lo aprueba el Gobierno, pero su cumplimiento lo evalúa el Consejo de Ministros, anualmente.', q => { q.correcta = 2; }],
  ['16-5', ART('51'), A51, 'Las tres opciones (conciliación, presencia equilibrada y discriminación retributiva) son literales del artículo, por eso «todas son correctas».'],
  ['16-6', ART('64'), A64N],
  ['16-7', ART('19'), c(19, 'Los proyectos de disposiciones de carácter general', 'impacto por razón de género.')],
  ['16-9', ART('51'), c(51, 'g) Evaluar periódicamente la efectividad', 'ámbitos de actuación.'), 'El artículo dice «periódicamente», no «eventualmente».'],
  ['16-10', ART('10'), A10, null, q => { q.pregunta = P + 'Consecuencias jurídicas de las conductas discriminatorias. Esta Ley establece que los actos que constituyan o causen discriminación por razón de sexo se considerarán nulos y sin efecto, y darán lugar, en su caso, a un sistema ______________ que prevenga la realización de conductas discriminatorias.'; q.opciones = ['Ejemplar y defensivo de castigos y recompensas.', 'Eficaz y disuasorio de sanciones.', 'De penalizaciones y recompensas.', 'De protección y reparación integral.']; q.correcta = 1; }],
  ['16-11', ART('22'), c(22, 'las corporaciones locales podrán establecer Planes Municipales de organización del tiempo de la ciudad.')],
  ['16-12', ART('3'), A3, 'Las opciones A y B reproducen cada una parte del artículo, por eso «a) y b) son correctas».', q => { q.correcta = 3; }],
  ['16-13', ART('10'), A10],
  ['16-14', ART('9'), c(9, 'También se considerará discriminación por razón de sexo cualquier trato adverso', 'igualdad de trato entre mujeres y hombres.'), 'La lista legal incluye también la «demanda» (queja, reclamación, denuncia, demanda o recurso).', q => { q.opciones[2] = 'Queja, reclamación, denuncia, demanda o recurso.'; q.correcta = 2; }],
  ['16-15', ART('1.1'), c(1, 'Las mujeres y los hombres son iguales en dignidad humana, e iguales en derechos y deberes.')],
  ['16-16', ART('12.3'), A12_3],
  ['16-17', ART('60.2'), A60],
  ['16-18', ART('63'), A63],
  ['16-19', ART('7.4'), c(7, '4. El condicionamiento de un derecho o de una expectativa de derecho', 'discriminación por razón de sexo.'), 'La opción A atribuye al acoso por razón de sexo la definición del acoso sexual, y la C hace lo contrario; solo B es literal.', q => { q.correcta = 1; }],
  ['16-20', ART('7.1'), A7_1],
  ['16-21', ART('59'), c(59, 'cuando el periodo de vacaciones coincida con una incapacidad temporal derivada del embarazo', 'al que correspondan.')],
  ['16-22', ART('4'), c(4, 'La igualdad de trato y de oportunidades entre mujeres y hombres es un principio informador', 'normas jurídicas.')],
  ['16-25', ART('10'), A10, 'Las tres afirmaciones (nulidad, reparaciones o indemnizaciones y sistema de sanciones) son literales del artículo, así que «todas son correctas».', q => { q.correcta = 3; }],
  ['16-27', ART('7.2'), A7_2],
  ['16-29', ART('60.2'), A60],
  ['16-31', ART('14.7'), A14_6 + ' … ' + A14_7, 'Son dos las alteraciones del enunciado: «madres viudas» (es «mujeres viudas») y la «paternidad» en lugar de la «maternidad». Se deja solo la D como incorrecta.', q => { q.opciones[1] = q.opciones[1].replace('las madres viudas', 'las mujeres viudas').replace('mujeres de colectivos de especial vulnerabilidad como las que pertenecen', 'mujeres de colectivos de especial vulnerabilidad como son las que pertenecen'); }],
  ['16-33', ART('18'), A18],
  ['16-36', ART('18'), A18],
  ['16-39', ART('58'), A58],
  ['16-41', ART('3'), A3],
  ['16-42', ART('67'), A67],
  ['16-43', ART('13.1'), A13_1],
  ['16-44', ART('11.1'), c(11, 'los Poderes Públicos adoptarán medidas específicas en favor de las mujeres', 'respecto de los hombres.'), 'Las personas privadas «podrán» adoptarlas (art. 11.2); los Poderes Públicos «adoptarán».'],
  ['16-45', ART('15'), c(15, 'El principio de igualdad de trato y oportunidades entre mujeres y hombres informará, con carácter transversal', 'Poderes Públicos.')],
  ['16-46', ART('68'), A68, 'La fórmula es «conciliación de la vida personal, familiar y profesional» (no «laboral»).', q => { q.correcta = 0; }],
  ['16-47', ART('64'), A64, NOTA_PLAN, q => { q.correcta = 0; }],
  ['16-48', ART('16'), c(16, 'Los Poderes Públicos procurarán atender al principio de presencia equilibrada', 'les correspondan.')],
  ['16-49', ART('18'), A18],
  ['16-50', ART('1.1'), c(1, 'alcanzar una sociedad más democrática, más justa y más solidaria.')],
  ['16-52', ART('60.2'), A60],
  ['16-53', ART('13.1'), A13_1],
  ['16-67', ART('10'), A10, 'Las tres afirmaciones (nulidad, reparaciones o indemnizaciones y sistema de sanciones) son literales del artículo, así que «todas son correctas».', q => { q.correcta = 3; }],
  ['16-68', ART('18'), A18],
  ['16-69', ART('7.2'), A7_2],
  ['16-70', ART('60.2'), A60],
  ['16-71', ART('14.7'), A14_6 + ' … ' + A14_7, 'Son dos las alteraciones del enunciado: «madres viudas» (es «mujeres viudas») y la «paternidad» en lugar de la «maternidad». Se deja solo la D como incorrecta.', q => { q.opciones[1] = q.opciones[1].replace('las madres viudas', 'las mujeres viudas').replace('mujeres de colectivos de especial vulnerabilidad como las que pertenecen', 'mujeres de colectivos de especial vulnerabilidad como son las que pertenecen'); }],
  // ---- reconstruidas (el texto original estaba corrupto por el OCR) ----
  ['16-73', ART('6.1'), A6_1, null, q => { q.pregunta = P + 'Se considera discriminación directa por razón de sexo:'; q.opciones = ['Cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o produzca el efecto de atentar contra la dignidad de una persona, en particular cuando se crea un entorno intimidatorio, degradante u ofensivo.', 'La situación en que una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular con respecto a personas del otro.', 'La situación en que se encuentra una persona que sea, haya sido o pudiera ser tratada, en atención a su sexo, de manera menos favorable que otra en situación comparable.', 'Toda orden de discriminar, únicamente de forma directa, por razón de sexo.']; q.correcta = 2; }],
  ['16-74', ART('56'), c(56, 'la normativa aplicable a los mismos establecerá un régimen de excedencias', 'personal, familiar y laboral.'), null, q => { q.pregunta = P + 'Sin perjuicio de las mejoras que pudieran derivarse de acuerdos suscritos entre la Administración General del Estado o los organismos públicos vinculados o dependientes de ella con los representantes del personal al servicio de la Administración Pública, la normativa aplicable a los mismos establecerá:'; q.opciones = ['Únicamente un régimen de permisos retribuidos con el fin de proteger la maternidad.', 'Un registro de excedencias y de permisos por maternidad en cada departamento ministerial.', 'Un régimen de excedencias, reducciones de jornada, permisos u otros beneficios con el fin de proteger la maternidad y facilitar la conciliación de la vida personal, familiar y laboral.', 'Todas son incorrectas.']; q.correcta = 2; }],
  ['16-77', ART('14.10'), A14_10, null, q => { q.pregunta = P + 'A los fines de esta Ley, serán criterios generales de actuación de los Poderes Públicos, entre otras: señale la correcta.'; q.opciones = ['La implantación de un lenguaje no sexista únicamente en el ámbito educativo y su fomento en las relaciones laborales.', 'La participación equilibrada de mujeres y hombres únicamente en las candidaturas electorales.', 'El fomento de la efectividad del principio de igualdad entre mujeres y hombres en las relaciones entre particulares.', 'El fomento de instrumentos de colaboración entre las distintas Administraciones públicas, excluidos los agentes sociales y las asociaciones de mujeres.']; q.correcta = 2; }],
  ['16-80', ART('5'), A5_1, null, q => { q.pregunta = P + 'El principio de igualdad de trato y de oportunidades entre mujeres y hombres, aplicable en el ámbito del empleo privado y en el del empleo público, se garantizará, en los términos previstos en la normativa aplicable:'; q.opciones = ['En el acceso al empleo, incluso al trabajo por cuenta propia.', 'En la formación profesional, en la promoción profesional y en las condiciones de trabajo, incluidas las retributivas y las de despido.', 'En la afiliación y participación en las organizaciones sindicales y empresariales, o en cualquier organización cuyos miembros ejerzan una profesión concreta, incluidas las prestaciones concedidas por las mismas.', 'Todas son correctas.']; q.correcta = 3; }],
  ['16-82', ART('65'), A65, null, q => { q.pregunta = P + 'Las normas sobre personal de las Fuerzas Armadas procurarán la efectividad del principio de igualdad entre mujeres y hombres, en especial en lo que se refiere al régimen de: señale la INCORRECTA.'; q.opciones = ['Acceso.', 'Retribuciones.', 'Destinos.', 'Situaciones administrativas.']; q.correcta = 1; }],
  ['16-84', ART('63'), A63, null, q => { q.pregunta = P + 'Todos los Departamentos Ministeriales y Organismos Públicos remitirán, al menos anualmente, información relativa a la aplicación efectiva en cada uno de ellos del principio de igualdad entre mujeres y hombres, con especificación, mediante la desagregación por sexo de los datos, de la distribución de su plantilla, grupo de titulación, nivel de complemento de destino y retribuciones promediadas de su personal, a:'; q.opciones = ['Los Ministerios de Igualdad y de Hacienda.', 'El Ministerio de Trabajo y Asuntos Sociales y la Presidencia del Gobierno.', 'Los Ministerios de Administraciones Públicas y del Interior.', 'Los Ministerios de Trabajo y Asuntos Sociales y de Administraciones Públicas.']; q.correcta = 3; }],
  ['16-85', ART('60.1'), c(60, '1. Con el objeto de actualizar los conocimientos', 'personas con discapacidad.'), null, q => { q.pregunta = P + 'Con el objeto de actualizar los conocimientos de los empleados y empleadas públicas, se otorgará preferencia, ______________, en la adjudicación de plazas para participar en los cursos de formación a quienes se hayan incorporado al servicio activo procedentes del permiso de maternidad o paternidad, o hayan reingresado desde la situación de excedencia por razones de guarda legal y atención a personas mayores dependientes o personas con discapacidad.'; q.opciones = ['Durante seis meses.', 'Durante un año.', 'Durante dos años.', 'Durante tres años.']; q.correcta = 1; }],
  ['16-86', ART('7.1'), A7_1, null, q => { q.pregunta = P + 'Sin perjuicio de lo establecido en el Código Penal, a los efectos de esta Ley, cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o produzca el efecto de atentar contra la dignidad de una persona, en particular cuando se crea un entorno intimidatorio, degradante u ofensivo, constituye:'; q.opciones = ['Acoso por razón de sexo.', 'Acoso sexual.', 'Discriminación indirecta por razón de sexo.', 'Discriminación por embarazo o maternidad.']; q.correcta = 1; }],
  ['16-88', ART('7.2'), A7_2, null, q => { q.pregunta = P + 'El principio de igualdad y la tutela contra la discriminación. ¿Cómo se denomina cualquier comportamiento realizado en función del sexo de una persona, con el propósito o el efecto de atentar contra su dignidad y de crear un entorno intimidatorio, degradante u ofensivo?'; q.opciones = ['Acoso sexual.', 'Acoso por razón de sexo.', 'Discriminación directa por razón de sexo.', 'Discriminación indirecta por razón de sexo.']; q.correcta = 1; }],
  ['16-89', ART('67'), A67, null, q => { q.pregunta = P + 'Las normas reguladoras de las Fuerzas y Cuerpos de Seguridad del Estado promoverán la igualdad efectiva entre mujeres y hombres, impidiendo cualquier situación de discriminación profesional, especialmente, en el sistema de: señale la INCORRECTA.'; q.opciones = ['Ascensos.', 'Retribuciones.', 'Formación.', 'Situaciones administrativas.']; q.correcta = 1; }],
  ['16-95', ART('12.2'), A12_2, null, q => { q.pregunta = P + 'La capacidad y legitimación para intervenir en los procesos civiles, sociales y contencioso-administrativos que versen sobre la defensa del derecho de igualdad entre mujeres y hombres corresponden:'; q.opciones = ['Exclusivamente al Ministerio Fiscal.', 'A las organizaciones sindicales y asociaciones de mujeres.', 'A las personas físicas y jurídicas con interés legítimo, determinadas en las Leyes reguladoras de estos procesos.', 'Solo a las personas físicas con interés legítimo.']; q.correcta = 2; }],
  ['16-96', ART('51'), A51, null, q => { q.pregunta = P + 'El principio de igualdad en el empleo público. Criterios de actuación de las Administraciones públicas. Las Administraciones públicas, en el ámbito de sus respectivas competencias y en aplicación del principio de igualdad entre mujeres y hombres, deberán, entre otras:'; q.opciones = ['Remover los obstáculos que impliquen la pervivencia de cualquier tipo de discriminación con el fin de ofrecer condiciones de igualdad efectiva entre mujeres y hombres en el acceso al empleo público y en el desarrollo de la carrera profesional.', 'Facilitar la conciliación de la vida personal, familiar y laboral, sin menoscabo de la promoción profesional.', 'Fomentar la formación en igualdad, tanto en el acceso al empleo público como a lo largo de la carrera profesional.', 'Todas son correctas.']; q.correcta = 3; }],
  ['16-97', 'apartado 4.2 del ' + 'Real Decreto 247/2024 (Protocolo)', RD_COM, null, q => { q.pregunta = PR + 'Inicio de las actuaciones. Las actuaciones previstas en este protocolo se inician por la remisión de una comunicación (verbal o escrita) a la unidad receptora. La comunicación, a través de los canales establecidos, podrá ser presentada por: señale la INCORRECTA.'; q.opciones = ['La persona presuntamente acosada (víctima) y/o por su representante legal.', 'La representación de las empleadas y empleados públicos en el ámbito en donde aquellos presten sus servicios.', 'Cualquier empleada y empleado público que tuviera conocimiento de situaciones que pudieran ser constitutivas de acoso sexual y/o de acoso por razón de sexo.', 'Únicamente la persona presuntamente acosada (víctima).']; q.correcta = 3; }],
  ['16-98', 'apartado 4.3 del Real Decreto 247/2024 (Protocolo)', RD_INF, null, q => { q.pregunta = PR + 'Procedimiento de desarrollo de las actuaciones. Conclusiones e informe. Al finalizar la investigación, la asesoría confidencial emitirá un informe de valoración, con las conclusiones y propuestas que se deriven de la misma. El informe deberá incluir, como mínimo, la información siguiente: señale la INCORRECTA.'; q.opciones = ['Circunstancias agravantes observadas.', 'Identificar a la/las persona/as supuestamente acosada/as y acosadora/as.', 'El historial profesional completo de la persona acosadora.', 'Relación nominal de las personas que hayan participado en la investigación y en la elaboración del informe.']; q.correcta = 2; }],
  ['16-100', ART('10'), A10, null, q => { q.pregunta = P + 'Consecuencias jurídicas de las conductas discriminatorias. Los actos y las cláusulas de los negocios jurídicos que constituyan o causen discriminación por razón de sexo darán lugar a responsabilidad a través de un sistema de reparaciones o indemnizaciones que sean: señale la INCORRECTA.'; q.opciones = ['Reales.', 'Efectivas.', 'Proporcionadas al perjuicio sufrido.', 'Simbólicas.']; q.correcta = 3; }],
  ['16-101', 'Anexo I (apartado 4. Formación) del Real Decreto 247/2024 (Protocolo)', RD_FOR, null, q => { q.pregunta = PR + 'Asesoría confidencial. Formación. ¿Quién diseñará los contenidos formativos del curso de «asesoría confidencial en la AGE»?'; q.opciones = ['La Dirección General de la Función Pública, con la colaboración del Instituto de las Mujeres.', 'El Instituto de las Mujeres, con la colaboración de la Dirección General de la Función Pública.', 'El Ministerio de Igualdad.', 'La Comisión Técnica de Igualdad.']; q.correcta = 0; }],
  ['16-102', ART('13.1'), A13_1, null, q => { q.pregunta = P + 'Prueba. De acuerdo con ______________, en aquellos procedimientos en los que las alegaciones de la parte actora se fundamenten en actuaciones discriminatorias, por razón de sexo, corresponderá a la persona demandada probar la ausencia de discriminación en las medidas adoptadas y su proporcionalidad.'; q.opciones = ['la Ley Orgánica del Poder Judicial', 'la Constitución', 'las Leyes procesales', 'los convenios colectivos']; q.correcta = 2; }],
  ['16-108', ART('10'), A10, null, q => { q.pregunta = P + 'Los actos y las cláusulas de los negocios jurídicos que constituyan o causen discriminación por razón de sexo se considerarán ______________, y darán lugar a responsabilidad a través de un sistema de reparaciones o indemnizaciones que sean reales, efectivas y proporcionadas al perjuicio sufrido, así como, en su caso, a través de un sistema eficaz y disuasorio de sanciones que prevenga la realización de conductas discriminatorias.'; q.opciones = ['anulables y con efectos limitados', 'nulos y sin efecto', 'ineficaces y rescindibles', 'inexistentes y sin responsabilidad']; q.correcta = 1; }],
  ['16-109', ART('3'), A3, null, q => { q.pregunta = P + 'El principio de igualdad de trato entre mujeres y hombres supone la ausencia de toda discriminación, directa o indirecta, por razón de sexo, y, especialmente, las derivadas de: señale la INCORRECTA.'; q.opciones = ['La condición laboral.', 'La maternidad.', 'La asunción de obligaciones familiares.', 'El estado civil.']; q.correcta = 0; }],
  ['16-110', ART('7.2'), A7_2, null, q => { q.opciones = ['Discriminación directa por razón de sexo.', 'Acoso sexual.', 'Discriminación indirecta por razón de sexo.', 'Acoso por razón de sexo.']; q.correcta = 3; }],
  ['16-111', ART('14.8'), A14_8, null, q => { q.pregunta = P + 'A los fines de esta Ley, serán criterios generales de actuación de los Poderes Públicos: señale la INCORRECTA.'; q.opciones = ['El compromiso con la efectividad del derecho constitucional de igualdad entre mujeres y hombres.', 'La participación equilibrada de mujeres y hombres en las candidaturas electorales y en la toma de decisiones.', 'La implantación de un lenguaje no sexista en el ámbito administrativo y su fomento en la totalidad de las relaciones sociales, culturales y artísticas.', 'El establecimiento de medidas que aseguren la conciliación del trabajo y de la vida personal y familiar de las mujeres y los hombres, sin incluir el fomento de la corresponsabilidad en las labores domésticas y en la atención a la familia.']; q.correcta = 3; }],
  ['16-112', ART('12.2'), A12_2],
  ['16-113', ART('3'), A3, 'La opción B sustituye «la asunción de obligaciones familiares» por «la ausencia de obligaciones familiares».', q => { q.pregunta = P + 'El principio de igualdad y la tutela contra la discriminación. Señale la INCORRECTA:'; q.opciones = ['La igualdad de trato y de oportunidades entre mujeres y hombres es un principio informador del ordenamiento jurídico y, como tal, se integrará y observará en la interpretación y aplicación de las normas jurídicas.', 'El principio de igualdad de trato entre mujeres y hombres supone la ausencia de toda discriminación, directa o indirecta, por razón de sexo, y, especialmente, las derivadas de la maternidad, la ausencia de obligaciones familiares y el estado civil.', 'El principio de igualdad de trato y de oportunidades entre mujeres y hombres, aplicable en el ámbito del empleo privado y en el del empleo público, se garantizará, en los términos previstos en la normativa aplicable, en el acceso al empleo, incluso al trabajo por cuenta propia, en la formación profesional, en la promoción profesional, en las condiciones de trabajo, incluidas las retributivas y las de despido, y en la afiliación y participación en las organizaciones sindicales y empresariales, o en cualquier organización cuyos miembros ejerzan una profesión concreta, incluidas las prestaciones concedidas por las mismas.', 'No constituirá discriminación en el acceso al empleo, incluida la formación necesaria, una diferencia de trato basada en una característica relacionada con el sexo cuando, debido a la naturaleza de las actividades profesionales concretas o al contexto en el que se lleven a cabo, dicha característica constituya un requisito profesional esencial y determinante, siempre y cuando el objetivo sea legítimo y el requisito proporcionado.']; q.correcta = 1; }],
  ['16-114', ART('55'), c(55, 'La aprobación de convocatorias de pruebas selectivas', 'por razón de sexo.')],
  ['16-115', 'apartado I (Introducción) del Real Decreto 247/2024 (Protocolo)', RD_CE],
  ['16-116', ART('21.2'), c(21, '2. Las Entidades Locales integrarán el derecho de igualdad', 'Administraciones públicas.'), 'La AGE y las Comunidades Autónomas «cooperarán» (art. 21.1); son las Entidades Locales las que «integrarán el derecho de igualdad en el ejercicio de sus competencias y colaborarán».', q => { q.correcta = 2; }],
  ['16-117', 'apartado I (Introducción) del Real Decreto 247/2024 (Protocolo)', RD_OIT, 'La definición de violencia contra la mujer es de la OIT; la ONU se cita después para explicar el origen estructural de esa violencia.', q => { q.correcta = 2; }],
  ['16-118', ART('18'), A18],
  ['16-119', ART('10'), A10],
  ['16-120', ART('21.1'), A21_1, 'Las Entidades Locales no «cooperan»: integran el derecho de igualdad y colaboran con el resto de Administraciones (art. 21.2).', q => { q.correcta = 2; }],
  ['16-121', ART('63'), A63],
  ['16-122', ART('63'), A63],
  ['16-123', ART('66'), A66, 'La formación no está en la lista de materias del artículo: igualdad, protección integral contra la violencia de género y la violencia sexual, y conciliación.', q => { q.correcta = 1; }],
  ['16-124', ART('18'), A18],
  ['16-125', ART('6.2'), A6_2, null, q => { q.opciones[2] = 'Cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o produzca el efecto de atentar contra la dignidad de una persona, en particular cuando se crea un entorno intimidatorio, degradante u ofensivo.'; }],
  ['16-126', ART('58'), A58, null, q => { q.opciones = ['Vacaciones por riesgo durante el embarazo.', 'Permiso urgente por riesgo durante el embarazo.', 'Permiso de lactancia.', 'Licencia por riesgo durante el embarazo.']; q.correcta = 3; }],
  ['16-127', ART('18'), A18],
  ['16-128', ART('6.1'), A6_1, null, q => { q.opciones = ['Acoso por razón de sexo.', 'Discriminación directa por razón de sexo.', 'Acoso sexual.', 'Discriminación indirecta por razón de sexo.']; q.correcta = 1; }],
  ['16-129', ART('10'), A10, 'Los tres adjetivos del artículo son «reales, efectivas y proporcionadas»: todas las opciones son correctas.', q => { q.opciones[0] = 'Reales.'; q.correcta = 3; }],
  ['16-130', ART('4'), c(4, 'La igualdad de trato y de oportunidades entre mujeres y hombres es un principio informador', 'normas jurídicas.'), null, q => { q.opciones[0] = 'Principio informador.'; q.correcta = 0; }],
  ['16-131', ART('12.3'), A12_3, 'Es la única legitimada en ambos tipos de litigios, no solo en uno.', q => { q.correcta = 2; }],
  ['16-132', ART('6.2'), A6_2],
  ['16-133', ART('22'), c(22, 'las corporaciones locales podrán establecer Planes Municipales de organización del tiempo de la ciudad.')],
  ['16-134', ART('58'), A58, 'El artículo habla de «licencia por riesgo durante el embarazo», no de excedencia ni de permiso.', q => { q.correcta = 3; }],
  ['16-135', ART('14.5'), A14_5, null, q => { q.opciones = ['El Gobierno.', 'La Administración General del Estado.', 'Los Poderes Públicos.', 'Los Ministerios.']; q.correcta = 2; }],
  ['16-136', ART('51'), c(51, 'b) Facilitar la conciliación de la vida personal, familiar y laboral', 'promoción profesional.')],
  ['16-137', 'apartado I (Introducción) del Real Decreto 247/2024 (Protocolo)', RD_ONU, null, q => { q.opciones = ['Las Naciones Unidas.', 'El Consejo de Europa.', 'El Parlamento Europeo.', 'La Organización Internacional del Trabajo.']; q.correcta = 0; }],
  ['16-138', ART('64'), A64, NOTA_PLAN, q => { q.opciones = OPT_PLAN.slice(); q.correcta = 1; }],
  ['16-139', ART('60.2'), A60],
  ['16-140', ART('12.3'), A12_3, 'Es la única legitimada en ambos tipos de litigios, no solo en uno.', q => { q.correcta = 2; }],
  ['16-141', ART('6.2'), A6_2],
  ['16-142', ART('22'), c(22, 'las corporaciones locales podrán establecer Planes Municipales de organización del tiempo de la ciudad.')],
  ['16-143', ART('64'), A64N, null, q => { q.correcta = 3; }],
  ['16-144', ART('19'), c(19, 'Los proyectos de disposiciones de carácter general', 'impacto por razón de género.')],
  ['16-145', ART('68'), A68, null, q => { q.pregunta = P + 'Las normas referidas al personal al servicio de las administraciones públicas en materia de igualdad, prevención de la violencia de género y la violencia sexual, y la conciliación de la vida personal, familiar y profesional serán de aplicación, adaptándose, en su caso, a las peculiaridades de las funciones que tienen encomendadas, en los términos establecidos por su normativa específica:'; q.opciones = ['En las Fuerzas y Cuerpos de Seguridad.', 'En la empresa privada.', 'En las instituciones culturales y educativas, públicas y privadas.', 'Todas son incorrectas.']; q.correcta = 0; }],
  ['16-146', ART('51'), c(51, 'g) Evaluar periódicamente la efectividad', 'ámbitos de actuación.'), 'El artículo dice «periódicamente», no «eventualmente».'],
  ['16-147', ART('10'), A10],
  ['16-148', ART('14.10'), A14_10, 'El fomento de la efectividad del principio de igualdad en las relaciones entre particulares SÍ es criterio del art. 14.10; la opción D lo restringe a las relaciones laborales y es la falsa.', q => { q.opciones[3] = 'El fomento de la efectividad del principio de igualdad entre mujeres y hombres únicamente en las relaciones laborales.'; }],
  ['16-149', ART('3'), A3],
  ['16-150', ART('64'), A64E, NOTA_PLAN],
  ['16-151', ART('64'), c(64, 'El Plan establecerá los objetivos a alcanzar', 'para su consecución.'), 'Solo la opción B reproduce el contenido legal del Plan; A y C añaden objetivos que el artículo no menciona.', q => { q.correcta = 1; }],
  ['16-152', ART('8'), c(8, 'Constituye discriminación directa por razón de sexo todo trato desfavorable a las mujeres', 'la maternidad.')],
  ['16-153', 'apartado I (Introducción) del Real Decreto 247/2024 (Protocolo)', RD_ONU, null, q => { q.opciones = ['Las Naciones Unidas.', 'El Consejo de Europa.', 'El Parlamento Europeo.', 'La Organización Internacional del Trabajo.']; q.correcta = 0; }],
  ['16-154', ART('51'), c(51, 'b) Facilitar la conciliación de la vida personal, familiar y laboral', 'promoción profesional.')],
  ['16-155', ART('58'), A58, 'El artículo habla de «licencia por riesgo durante el embarazo», no de excedencia ni de permiso.', q => { q.correcta = 3; }],
  ['16-156', ART('14.5'), A14_5, null, q => { q.opciones = ['El Gobierno.', 'La Administración General del Estado.', 'Los Poderes Públicos.', 'Los Ministerios.']; q.correcta = 2; }],
  ['16-157', ART('10'), A10, 'Los tres adjetivos del artículo son «reales, efectivas y proporcionadas»: todas las opciones son correctas.', q => { q.opciones[0] = 'Reales.'; q.correcta = 3; }]
];
// ---- aplicar ----
function objeto(id) {
  const key = '{"id":"' + id + '"';
  const i = s.indexOf(key);
  if (i < 0) return null;
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const ch = s[j];
    if (inS) { if (esc) esc = false; else if (ch === BS) esc = true; else if (ch === '"') inS = false; continue; }
    if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } }
  return [i, j + 1];
}
let n = 0;
for (const [id, label, cita, extra, fn] of F) {
  const pos = objeto(id);
  if (!pos) { console.log('NO ENCONTRADA', id); continue; }
  const q = JSON.parse(s.slice(pos[0], pos[1]));
  if (fn) fn(q);
  q.explicacion = ex(q, label, cita, extra);
  s = s.slice(0, pos[0]) + JSON.stringify(q) + s.slice(pos[1]); n++;
}
fs.writeFileSync(FILE, s);
console.log('corregidas/reconstruidas', n, 'de', F.length);
