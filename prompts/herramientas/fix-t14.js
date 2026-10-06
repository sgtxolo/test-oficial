// Correcciones del Tema 14 (Defensor del Pueblo) verificadas contra el texto oficial (LO 3/1981 y Reglamento del Defensor del Pueblo).
// Uso: node prompts/herramientas/fix-t14.js test-oficial-conocimiento.html
// Solo cambia la respuesta correcta (y la explicación con la cita literal); no elimina ninguna pregunta.
const fs = require('fs');
const FILE = process.argv[2];
let s = fs.readFileSync(FILE, 'utf8');
const BS = String.fromCharCode(92), L = 'ABCD';
const LO = 'LO 3/1981', RG = 'Reglamento del Defensor del Pueblo';
const ex = (q, art, cita, extra) => `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>${extra ? extra + ' ' : ''}Según el <span class="ref-norma">${art}</span>: <span class="ref-concepto">"${cita}"</span> (verificado con el texto oficial).`;
// [id, índice correcto, norma, artículo, cita literal, nota opcional, opciones nuevas opcionales]
const F = [
 [8, 3, LO, 'art. 2.1', 'y se dirigirá a las mismas a través de los Presidentes del Congreso y del senado, respectivamente', 'No solo el del Congreso: la Ley cita a ambos Presidentes (B y C juntas).'],
 [9, 3, LO, 'art. 22.3', 'lo pondrá en conocimiento de la Comisión Mixta Congreso-Senado a que se refiere el artículo 2.° de esta Ley', 'Ninguna de las tres primeras opciones es la Comisión Mixta.'],
 [15, 0, LO, 'art. 2.4', 'se convocará en término no inferior a diez días al Pleno del Congreso para que proceda a su elección'],
 [17, 0, LO, 'art. 18.1', 'promoverá la oportuna investigación sumaria e informal para el esclarecimiento de los supuestos de la misma'],
 [18, 0, RG, 'art. 19.1', 'El Consejo Asesor es un órgano de cooperación técnica y jurídica del Mecanismo Nacional de Prevención'],
 [24, 1, RG, 'art. 12.3', 'El Adjunto en el que el Defensor del Pueblo delegue las funciones del Mecanismo Nacional de Prevención asumirá la presidencia de su Consejo asesor'],
 [65, 1, RG, 'art. 12.3', 'El Adjunto en el que el Defensor del Pueblo delegue las funciones del Mecanismo Nacional de Prevención asumirá la presidencia de su Consejo asesor'],
 [26, 3, RG, 'art. 26.1', 'Dependiendo del Servicio de Régimen Interior, Estudio, Documentación y Publicaciones, existirá un Registro General y una Oficina de Información', 'Depende de ese Servicio, no directamente del Secretario General.'],
 [67, 3, RG, 'art. 26.1', 'Dependiendo del Servicio de Régimen Interior, Estudio, Documentación y Publicaciones, existirá un Registro General y una Oficina de Información', 'Depende de ese Servicio, no directamente del Secretario General.'],
 [35, 1, RG, 'art. 36.3', 'Las faltas leves prescribirán a los dos meses; las graves, a los seis meses, y las muy graves, al año'],
 [86, 1, RG, 'art. 36.3', 'Las faltas leves prescribirán a los dos meses; las graves, a los seis meses, y las muy graves, al año'],
 [45, 3, RG, 'art. 32', 'El personal al servicio de la Institución del Defensor del Pueblo estará compuesto por los Asesores-responsables de área, Asesores-técnicos, administrativos, auxiliares y subalternos', 'Las tres opciones nombradas figuran en la lista, por eso no hay ninguna incorrecta.'],
 [47, 0, RG, 'art. 41', 'La ordenación del Pago corresponde al Defensor del Pueblo'],
 [50, 3, RG, 'art. 19.5.e)', 'Cinco Vocales elegidos de entre las candidaturas que, a título personal o en representación de organizaciones o asociaciones representativas de la sociedad civil, se presenten al Defensor del Pueblo', 'Son cinco, no tres, seis ni cuatro.'],
 [52, 1, RG, 'art. 11.3', 'El Defensor del Pueblo elaborará informes específicos sobre su actividad como Mecanismo Nacional de Prevención'],
 [53, 2, RG, 'art. 23.1.d)', 'Preparar y elevar a la Junta de Coordinación y Régimen Interior el anteproyecto de Presupuesto', 'El anteproyecto se eleva a la Junta, no al Consejo Asesor; «dirigir los servicios de la Secretaría General» sí es competencia suya (art. 23.1.b).'],
 [61, 0, LO, 'art. 6.3', 'correspondiendo la decisión sobre su inculpación, prisión, procesamiento y juicio exclusivamente a la Sala de lo Penal del Tribunal Supremo'],
 [63, 1, LO, 'art. 7.3', 'Si la incompatibilidad fuere sobrevenida una vez posesionado del cargo, se entenderá que renuncia al mismo en la fecha en que aquélla se hubiere producido', 'La fecha relevante es la de producción de la incompatibilidad, no la de su declaración.'],
 [68, 2, RG, 'art. 25', 'El Servicio de Régimen Económico se estructurará en las siguientes unidades: a) Sección de Asuntos Económicos y Contabilidad. b) Sección de Habilitación. c) Sección de Personal y Asuntos Generales'],
 [69, 0, RG, 'art. 26.2', 'Bajo la directa responsabilidad del Secretario general, se constituirá la Sección de Archivo'],
 [73, 3, RG, 'art. 23.2', 'En caso de vacante, ausencia o enfermedad, el Secretario General será sustituido interinamente por el Director que designe el Defensor del Pueblo, oída la Junta de Coordinación y Régimen Interior'],
 [74, 0, LO, 'art. 20', 'el Defensor del Pueblo dará cuenta de la misma al afectado y a su inmediato superior u Organismo de quien aquél dependiera', 'B es falsa (el plazo «en ningún caso será inferior a diez días») y C también (la información tiene carácter «reservada», no secreta).'],
 [76, 2, RG, 'art. 19.4', 'Los Vocales serán designados entre personas mayores de edad, que se encuentren en el pleno disfrute de sus derechos civiles y políticos, con reconocida trayectoria en la defensa de los Derechos Humanos o en los ámbitos relacionados con el tratamiento a personas privadas de libertad por cualquier causa', 'La «competencia jurídica» no es un requisito.'],
 [82, 1, LO, 'art. 20.1', 'Cuando la queja a investigar afectare a la conducta de las personas al servicio de la Administración, en relación con la función que desempeñan'],
 [87, 0, RG, 'art. 39.1', 'El presupuesto de la Institución del Defensor del Pueblo se integrará en la sección presupuestaria del presupuesto de las Cortes Generales como un servicio más del mismo', 'La contabilidad e intervención son las de las Cortes Generales (art. 39.2) y el Interventor es el de las Cortes (art. 39.3).'],
 [92, 1, RG, 'art. 37.1.b)', 'Por faltas graves, suspensión de empleo y remuneración de hasta seis meses de duración'],
 [108, 1, RG, 'art. 37.1.b)', 'Por faltas graves, suspensión de empleo y remuneración de hasta seis meses de duración'],
 [94, 2, LO, 'art. 9.2', 'Las atribuciones del Defensor del Pueblo se extienden a la actividad de los ministros, autoridades administrativas, funcionarios y cualquier persona que actúe al servicio de las Administraciones públicas', 'Los «miembros de organizaciones profesionales» no figuran en la lista.'],
 [102, 2, LO, 'art. 35.2', 'En los casos de funcionarios provenientes de la Administración Pública se les reservará la plaza y destino que ocupasen con anterioridad a su adscripción a la oficina del Defensor del Pueblo', 'La opción C es la incorrecta («trastorno»); la D es literal del art. 36.'],
 [111, 2, LO, 'art. 35.2', 'En los casos de funcionarios provenientes de la Administración Pública se les reservará la plaza y destino que ocupasen con anterioridad a su adscripción a la oficina del Defensor del Pueblo', 'La opción C es la incorrecta («trastorno»); la D es literal del art. 36.'],
 [114, 1, LO, 'art. 18.1', 'con el fin de que por su Jefe en el plazo máximo de quince días, se remita informe escrito', null, ['Diez días.', 'Quince días.', 'Veinte días.', 'Treinta días.']],
 [142, 0, RG, 'art. 14', 'Los Adjuntos tomarán posesión de su cargo ante los Presidentes de ambas Cámaras y el Defensor del Pueblo', 'No es ante la Comisión Mixta.'],
 [144, 3, LO, 'art. 19.1', 'Todos los poderes públicos están obligados a auxiliar, con carácter preferente y urgente, al Defensor del Pueblo en sus investigaciones e inspecciones', 'El texto dice «preferente y urgente»; ninguna opción lo reproduce (A dice «perentorio»).'],
 [147, 0, LO, 'art. 14', 'El Defensor del Pueblo velará por el respeto de los derechos proclamados en el título primero de la Constitución en el ámbito de la Administración Militar, sin que ella pueda entrañar una interferencia en el mando de la Defensa Nacional'],
 [150, 3, LO, 'art. 20.3', 'Los funcionarios que se negaren a ello podrán ser requeridos por aquél para que manifiesten por escrito las razones que justifiquen tal decisión', 'La opción D es la incorrecta: dice «realmente» en lugar de «por escrito».'],
 [161, 3, LO, 'art. 30.2', 'Si formuladas sus recomendaciones dentro de un plazo razonable no se produce una medida adecuada en tal sentido por la autoridad administrativa afectada'],
 [166, 2, RG, 'art. 8.e)', 'Mantener relación directa con el Tribunal Constitucional y con el Consejo General del Poder Judicial, igualmente a través de sus Presidentes', 'La relación directa es con el Consejo General del Poder Judicial, no con el Ministerio de Justicia.'],
 [168, 0, LO, 'art. 19.2', 'En la fase de comprobación e investigación de una queja o en expediente iniciado de oficio, el Defensor del Pueblo su Adjunto, o la persona en quien él delegue, podrán personarse en cualquier centro de la Administración pública'],
 [169, 2, RG, 'art. 29.3', 'De cuantas actuaciones acuerde practicar en relación con la Administración de Justicia y del resultado de las mismas dará cuenta a las Cortes Generales en sus informes periódicos o en el Informe Anual'],
 [171, 1, RG, 'art. 13.1', 'Los Adjuntos serán propuestos por el Defensor del Pueblo a través del Presidente del Congreso, a efectos de que la Comisión mixta Congreso-Senado encargada de relacionarse con el Defensor del Pueblo otorgue su conformidad previa al nombramiento'],
 [172, 2, RG, 'art. 15.2', 'Si la incompatibilidad se produjera después de haber tomado posesión del cargo, se entenderá que renuncian al mismo en la fecha en que aquélla se hubiere producido'],
 [173, 0, LO, 'art. 35.1', 'Las personas que se encuentren al servicio del Defensor del Pueblo, y mientras permanezcan en el mismo, se considerarán como persona al servicio de las Cortes'],
 [174, 1, LO, 'art. 13', 'Cuando el Defensor del Pueblo reciba quejas referidas al funcionamiento de la Administración de Justicia, deberá dirigirlas al Ministerio Fiscal para que éste investigue su realidad y adopte las medidas oportunas con arreglo a la ley, o bien dé traslado de las mismas al Consejo General del Poder Judicial'],
 [177, 3, LO, 'art. 22.3', 'lo pondrá en conocimiento de la Comisión Mixta Congreso-Senado a que se refiere el artículo 2.° de esta Ley'],
 [180, 1, LO, 'art. 25.1', 'lo pondrá de inmediato en conocimiento del Fiscal General del Estado'],
 [190, 3, RG, 'art. 10.2', 'Corresponde al Gabinete Técnico organizar y dirigir la Secretaría particular del Defensor del Pueblo, realizar los estudios e informes que se le encomienden y ejercer las funciones de protocolo', 'Dirigir las investigaciones no figura entre sus funciones; organizar la Secretaría particular sí.'],
 [196, 3, RG, 'disposición final', 'Este Reglamento se publicará en el «Boletín Oficial del Congreso», en el «Boletín Oficial del Senado» y en el «Boletín Oficial del Estado»'],
 [202, 3, LO, 'art. 30.2', 'el Defensor del Pueblo podrá poner en conocimiento del Ministro del Departamento afectado, o sobre la máxima autoridad de la Administración afectada, los antecedentes del asunto y las recomendaciones presentadas'],
 [203, 0, RG, 'art. 10.1', 'El Defensor del Pueblo podrá estar asistido por un Gabinete Técnico, bajo la dirección de uno de los Asesores que designará y cesará libremente'],
 [209, 2, RG, 'art. 22.c)', 'Evacuar los informes que el Defensor del Pueblo le solicite sobre la normativa de relevancia para la situación de las personas privadas de libertad', 'La opción C cambia «la situación de las personas privadas de libertad» por «los lugares donde se puedan encontrar»; la D es literal (art. 22.e).'],
 [218, 2, LO, 'art. 20.2', 'en el plazo que se le haya fijado, que en ningún caso será inferior a diez días, pudiendo ser prorrogado, a instancia de parte, por la mitad del concedido'],
 [31, 2, RG, 'art. 6', 'El nombramiento del Defensor del Pueblo o de los Adjuntos, si fueran funcionarios públicos, implicará su pase a la situación de excedencia especial o equivalente en la Carrera o Cuerpo de procedencia', 'La opción C es la incorrecta («con destino en el Cuerpo»); la D es literal del art. 4.'],
 [48, 2, RG, 'art. 6', 'El nombramiento del Defensor del Pueblo o de los Adjuntos, si fueran funcionarios públicos, implicará su pase a la situación de excedencia especial o equivalente en la Carrera o Cuerpo de procedencia', 'La opción C es la incorrecta («con destino en el Cuerpo»); la D es literal del art. 4.'],
 [77, 2, RG, 'art. 6', 'El nombramiento del Defensor del Pueblo o de los Adjuntos, si fueran funcionarios públicos, implicará su pase a la situación de excedencia especial o equivalente en la Carrera o Cuerpo de procedencia', 'La opción C es la incorrecta («con destino en el Cuerpo»); la D es literal del art. 4.'],
 [46, 3, RG, 'art. 8', 'Además de las competencias básicas establecidas en la Ley Orgánica, corresponde al Defensor del Pueblo: a) Representar a la Institución. b) Proponer a los Adjuntos, a efecto de que la Comisión Mixta Congreso-Senado de relaciones con el Defensor del Pueblo otorgue su conformidad previa al nombramiento y cese de los mismos. c) Mantener relación directa con las Cortes Generales a través del Presidente del Congreso de los Diputados', 'Las tres opciones son competencias del art. 8, por eso la respuesta es «Todas son correctas».'],
];
let n = 0;
for (const [num, idx, norma, art, cita, nota, ops] of F) {
  const id = '14-' + num;
  const key = '{"id":"' + id + '"';
  const i = s.indexOf(key); if (i < 0) { console.log('NOT FOUND', id); continue; }
  if (s.indexOf(key, i + 1) >= 0) console.log('WARN dup', id);
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break } }
  const q = JSON.parse(s.slice(i, j + 1));
  if (ops) q.opciones = ops;
  q.correcta = idx;
  const a = art.replace(/^art\. /, ''), lab = /^\d/.test(a) ? 'art. ' + a : a;
  q.explicacion = ex(q, lab + (norma === LO ? ' de la LO 3/1981, del Defensor del Pueblo' : ' del Reglamento de Organización y Funcionamiento del Defensor del Pueblo'), cita, nota);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
fs.writeFileSync(FILE, s); console.log('corregidas', n);
