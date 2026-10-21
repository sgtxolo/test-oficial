// Tema 9 · correcciones de las preguntas OFICIALES verificadas contra el temario oficial (LO 5/2005 + Directiva de Defensa Nacional 2020)
// Auditoría 21/10/2026: plazos («seis meses» → un año), opciones con texto alterado, respuestas «incorrecta» invertidas, «todas correctas» con una falsa…
// Uso: node prompts/herramientas/tema9/fix-t9.js            (aplica sobre test-oficial-conocimiento.html; idempotente)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const TD = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema9');
const clean = f => fs.readFileSync(path.join(TD, f), 'utf8').replace(/=====PAG \d+=====/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const LO = clean('lo5.txt'), DD = clean('ddn2020.txt');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const LON = nz(LO), DDN = nz(DD);
// etiqueta del apartado donde está la cita (artículo de la LO 5/2005 o apartado de la Directiva)
const lab = cita => {
  let i = LO.indexOf(cita);
  if (i >= 0) { const m = [...LO.slice(0, i).matchAll(/Artículo (\d+)\./g)].pop(); return m ? `art. ${m[1]} de la LO 5/2005` : 'LO 5/2005'; }
  i = DD.indexOf(cita);
  if (i >= 0) { const m = [...DD.slice(0, i).matchAll(/Apartado (\d+)\./g)].pop(); return m ? `apartado ${m[1]} de la Directiva de Defensa Nacional 2020` : 'Directiva de Defensa Nacional 2020'; }
  return null;
};
const BS = String.fromCharCode(92), L = 'ABCD';
const ex = (q, art, cita, extra) => {
  const em = (q.explicacion.match(/<em style[^>]*>.*?<\/em>\s*$/) || [''])[0];
  return `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>${extra ? extra + ' ' : ''}Según el <span class="ref-norma">${art}</span>: <span class="ref-concepto">"${cita}"</span> (verificado con el texto del temario oficial).${em ? ' ' + em : ''}`;
};
const O = (q, k, t) => { q.opciones[k] = t; };
const UNANO = 'El Gobierno informará periódicamente, en un plazo en ningún caso superior a un año, al Congreso de los Diputados sobre el desarrollo de las operaciones de las Fuerzas Armadas en el exterior';
const CONS = 'Se consolidarán los mecanismos de cooperación interministerial y con el resto de las administraciones públicas, persiguiendo la coherencia, eficacia y racionalidad en el uso de los recursos públicos';
const GRUP = 'las Fuerzas Armadas prestarán especial atención a la protección de grupos vulnerables, especialmente mujeres y niños';
const PLENO = 'El Consejo de Defensa Nacional en pleno tendrá la siguiente composición: a) El Presidente del Gobierno, que lo presidirá. b) Los Vicepresidentes del Gobierno. c) Los Ministros de Defensa, del Interior, de Asuntos Exteriores y de Cooperación y de Economía y Hacienda. d) El Jefe de Estado Mayor de la Defensa. e) Los Jefes de Estado Mayor del Ejército de Tierra, de la Armada y del Ejército del Aire. f) El Secretario de Estado Director del Centro Nacional de Inteligencia. g) El Director del Gabinete de la Presidencia del Gobierno';
const FINAL = 'a) Los fines de la política';
// cada entrada: [id, fn(q) → [cita, nota opcional]] (la etiqueta del apartado se calcula sola)
const F = [
  ['9-6', q => { O(q, 0, 'Recursos apropiados, tanto humanos y materiales como económicos.'); O(q, 1, 'La plena integración de la mujer.'); O(q, 2, 'La capacidad para atraer talento en un mundo dominado por la tecnología.'); O(q, 3, 'Todas son correctas.'); q.correcta = 3;
    return ['Mantener este modelo y seguir contribuyendo con eficacia a la seguridad requiere recursos apropiados, tanto humanos y materiales como económicos. La plena integración de la mujer, así como la capacidad para atraer talento en un mundo dominado por la tecnología, son otros de los requisitos necesarios', 'Los tres son requisitos expresos de la Directiva.']; }],
  ['9-11', q => { O(q, 3, 'B y C son correctas.'); q.correcta = 3;
    return ['La práctica del multilateralismo y de la acción concertada con socios y aliados serán los principales métodos de gestión de nuestra defensa en el exterior', 'La «restricción» no figura entre los métodos.']; }],
  ['9-13', q => { O(q, 1, 'Militarmente a la seguridad y defensa de España y de sus aliados, en el marco de las organizaciones internacionales de las que España forma parte, así como al mantenimiento de la paz, la estabilidad y la ayuda humanitaria.'); q.correcta = 1;
    return ['Las Fuerzas Armadas contribuyen militarmente a la seguridad y defensa de España y de sus aliados, en el marco de las organizaciones internacionales de las que España forma parte, así como al mantenimiento de la paz, la estabilidad y la ayuda humanitaria', 'La ayuda es humanitaria, no «comunitaria».']; }],
  ['9-15', q => { O(q, 0, 'Periódicamente, en un plazo en ningún caso superior a un año.'); O(q, 1, 'Periódicamente, en un plazo en ningún caso superior a seis meses.'); q.correcta = 0; return [UNANO, 'El plazo máximo es de un año (no seis meses).']; }],
  ['9-39', q => { O(q, 0, 'En un plazo en ningún caso superior a seis meses.'); O(q, 1, 'En un plazo en ningún caso superior a un año.'); q.correcta = 1; return [UNANO, 'El plazo máximo es de un año.']; }],
  ['9-92', q => { q.correcta = q.opciones.findIndex(o => /^Un año/.test(o)); return [UNANO, 'El plazo máximo es de un año.']; }],
  ['9-142', q => { q.correcta = q.opciones.findIndex(o => /^Un año/.test(o)); return [UNANO, 'El plazo máximo es de un año.']; }],
  ['9-23', q => { q.correcta = 0; return ['El Consejo Ejecutivo tendrá la siguiente composición: a) El Presidente del Gobierno, que lo presidirá. b) Los Ministros de Defensa, del Interior y de Asuntos Exteriores y de Cooperación. c) El Jefe de Estado Mayor de la Defensa. d) El Secretario de Estado Director del Centro Nacional de Inteligencia. e) El Director del Gabinete de la Presidencia del Gobierno', 'Los Jefes de Estado Mayor de los Ejércitos están en el Pleno, no en el Consejo Ejecutivo.']; }],
  ['9-24', q => { O(q, 1, 'Garantizar la Defensa Nacional constituye por ello una obligación de todo gobierno.'); O(q, 2, 'La Defensa de España se fundamenta, por un lado, en las capacidades y fortalezas propias como aportación a una Seguridad Nacional que se concibe como un todo integrador y, por otro, en la práctica de un multilateralismo eficaz donde nuestros intereses y valores se vean mejor defendidos y promovidos.'); q.correcta = 3;
    return ['Garantizar la Defensa Nacional constituye por ello una obligación de todo gobierno', 'Las tres afirmaciones son literales de la Introducción.']; }],
  ['9-26', q => { O(q, 3, 'Asesorar al Jefe de Estado Mayor de la Defensa en el empleo de las unidades de su Ejército, así como en la elaboración y formulación de los aspectos específicos de sus respectivas capacidades.');
    return ['Asesorar al Jefe de Estado Mayor de la Defensa en el empleo de las unidades de su Ejército, así como en la elaboración y formulación de los aspectos específicos de sus respectivas capacidades', 'La opción B es del Presidente del Gobierno y del Ministro de Defensa, no de los Jefes de Estado Mayor.']; }],
  ['9-30', q => { q.correcta = 2; return ['La organización de las Fuerzas Armadas deberá posibilitar el cumplimiento de las misiones que se le encomienden en el marco específico, conjunto y combinado', '«Especializado» no es uno de los tres marcos.']; }],
  ['9-38', q => { O(q, 2, 'El ejercicio del resto de sus competencias.'); q.correcta = 3;
    return ['Se organizará de forma que permita la definición y el desarrollo de la estrategia militar, el planeamiento y conducción de las operaciones militares y el ejercicio del resto de sus competencias', null]; }],
  ['9-50', q => { O(q, 3, 'Todas son incorrectas.'); q.correcta = 0; return ['Corresponde al Ministro de Defensa, además de las competencias que le asignan las leyes reguladoras del Gobierno y de la Administración General del Estado, el desarrollo y la ejecución de la política de defensa', 'La B es del Presidente del Gobierno (art. 6.3.c) y la C del Jefe de Estado Mayor de la Defensa (art. 12.3.c).']; }],
  ['9-52', q => { q.correcta = 3; return ['Otorgar las autorizaciones previas para prestar el consentimiento del Estado a obligarse por medio de los tratados y convenios internacionales', 'Las autorizaciones previas las otorgan las Cortes Generales, no el Gobierno.']; }],
  ['9-281', q => { q.correcta = 3; return ['En particular, al Congreso de los Diputados le corresponde autorizar, con carácter previo, la participación de las Fuerzas Armadas en misiones fuera del territorio nacional', 'La autorización previa corresponde al Congreso, no al Gobierno (al que corresponde acordar la participación, art. 5).']; }],
  ['9-54', q => { O(q, 1, CONS + '.'); return [GRUP, null]; }],
  ['9-148', q => { O(q, 0, CONS + '.'); return [GRUP, null]; }],
  ['9-57', q => { q.correcta = 0; return ['La Alianza Atlántica es un vínculo fundamental para la colaboración en la defensa de los intereses de paz y seguridad compartidos a ambos lados del Atlántico', 'Es «fundamental», no «prioritario».']; }],
  ['9-58', q => { O(q, 3, 'Todas son incorrectas.'); q.correcta = 0; return ['El desarrollo de estas directrices precisará de la financiación que resulte necesaria', 'Solo se menciona la financiación (y no el desarrollo tecnológico ni más recursos humanos).']; }],
  ['9-152', q => { O(q, 3, 'Todas son incorrectas.'); q.correcta = 0; return ['El desarrollo de estas directrices precisará de la financiación que resulte necesaria', 'Solo se menciona la financiación (y no el desarrollo tecnológico ni más recursos humanos).']; }],
  ['9-62', q => { O(q, 0, 'Eficacia y economía de medios.'); O(q, 1, 'Eficacia, economía y eficiencia de medios.'); O(q, 2, 'Economía y eficiencia.'); O(q, 3, 'Ninguna es correcta.'); q.correcta = 0;
    return ['Para alcanzar el funcionamiento de ambas estructuras con criterios de eficacia y economía de medios, se unificarán los servicios cuyos cometidos no deban ser exclusivos de un Ejército y se organizarán de manera centralizada la logística común y la adquisición de recursos', null]; }],
  ['9-157', q => { O(q, 0, 'Eficacia y economía de medios.'); O(q, 1, 'Eficacia, economía y eficiencia de medios.'); O(q, 2, 'Economía y eficiencia.'); O(q, 3, 'Ninguna es correcta.'); q.correcta = 0;
    return ['Para alcanzar el funcionamiento de ambas estructuras con criterios de eficacia y economía de medios, se unificarán los servicios cuyos cometidos no deban ser exclusivos de un Ejército y se organizarán de manera centralizada la logística común y la adquisición de recursos', null]; }],
  ['9-68', q => { O(q, 1, 'Contribución gradual y proporcionada.'); q.correcta = 1;
    return ['la incorporación adicional de ciudadanos a la Defensa se apoyará en el principio de contribución gradual y proporcionada a la situación de amenaza que sea necesario afrontar', null]; }],
  ['9-72', q => { q.correcta = 0; return ['podrán limitarse los derechos sobre los bienes propiedad de nacionales y extranjeros situados en ellas, de acuerdo con lo que se determine por ley', 'Solo se limitan los derechos sobre los bienes; no se menciona la libertad de movimiento.']; }],
  ['9-74', q => { O(q, 0, 'Orgánica.'); return ['Las Fuerzas Armadas se organizan en dos estructuras: una orgánica, para la preparación de la fuerza, y otra operativa, para su empleo en las misiones que se le asignen', null]; }],
  ['9-75', q => { O(q, 3, 'El Apoyo a la Fuerza.'); return ['El Ejército de Tierra, la Armada y el Ejército del Aire componen la estructura orgánica de las Fuerzas Armadas', 'Cada Ejército se compone del Cuartel General, la Fuerza y el Apoyo a la Fuerza; el Mando de Operaciones es del Estado Mayor de la Defensa.']; }],
  ['9-80', q => { q.correcta = 1; return ['a quienes impartirá directrices para orientar la preparación de la Fuerza', 'Imparte «directrices», no «órdenes».']; }],
  ['9-85', q => { q.correcta = 0; return ['Asistir al Presidente del Gobierno en la dirección estratégica de las operaciones militares', 'Es función específica del Ministro de Defensa; el Jefe de Estado Mayor de la Defensa auxilia al Presidente y al Ministro (art. 12.3.a).']; }],
  ['9-97', q => { O(q, 1, 'Las consecuencias de la crisis económica de 2008 han redefinido solo el papel de las organizaciones internacionales, sin afectar a las relaciones económicas entre estados.'); O(q, 3, 'El acceso seguro a las redes y la protección de los datos privados, y en general el ciberespacio, es un elemento clave de la seguridad del siglo XXI.'); q.correcta = 3;
    return ['El acceso seguro a las redes y la protección de los datos privados, y en general el ciberespacio, es un elemento clave de la seguridad del siglo XXI', null]; }],
  ['9-98', q => { O(q, 0, 'Los retos de seguridad proceden ahora tanto de actores estatales, entre los que existe una intensa competición estratégica, como no estatales.'); q.correcta = 0;
    return ['Los retos de seguridad proceden ahora tanto de actores estatales, entre los que existe una intensa competición estratégica, como no estatales (terrorismo y crimen organizado)', null]; }],
  ['9-116', q => { O(q, 3, 'El Ministro de Justicia.'); q.correcta = 3; return [PLENO, 'El Ministro de Justicia no forma parte del Pleno.']; }],
  ['9-199', q => { O(q, 2, 'El Ministro de Justicia.'); q.correcta = 2; return [PLENO, 'El Ministro de Justicia no forma parte del Pleno.']; }],
  ['9-122', q => { O(q, 1, 'Garantizar la adecuada preparación de la Fuerza de su respectivo Ejército para su puesta a disposición de la estructura operativa de las Fuerzas Armadas.'); q.correcta = 3;
    return ['Garantizar la adecuada preparación de la Fuerza de su respectivo Ejército para su puesta a disposición de la estructura operativa de las Fuerzas Armadas', 'Las tres son funciones de los Jefes de Estado Mayor de los Ejércitos (art. 13.3).']; }],
  ['9-123', q => { q.correcta = 0; return ['Determinar la aplicación de los objetivos y las líneas básicas de actuación de las Fuerzas Armadas, tanto en el ámbito nacional como en el de la participación en las organizaciones internacionales de las que España forma parte', 'La opción A cambia «líneas básicas» por «modos de actuación».']; }],
  ['9-128', q => { O(q, 0, 'Las capacidades y fortalezas propias como aportación a una Seguridad Nacional que se concibe como un todo integrador.'); O(q, 3, 'A y C son correctas.'); q.correcta = 3;
    return ['La Defensa de España se fundamenta, por un lado, en las capacidades y fortalezas propias como aportación a una Seguridad Nacional que se concibe como un todo integrador y, por otro, en la práctica de un multilateralismo eficaz donde nuestros intereses y valores se vean mejor defendidos y promovidos', null]; }],
  ['9-131', q => { O(q, 3, 'Dirige, como miembro del Gobierno, la Administración militar y desarrolla las directrices y disposiciones reglamentarias que adopte el Consejo de Ministros.');
    return ['Asimismo y de forma específica le corresponde: a) Asistir al Presidente del Gobierno en la dirección estratégica de las operaciones militares. b) Dirigir la actuación de las Fuerzas Armadas bajo la autoridad del Presidente del Gobierno. c) Determinar y ejecutar la política militar. d) Dirigir, como miembro del Gobierno, la Administración militar y desarrollar las directrices y disposiciones reglamentarias que adopte el Consejo de Ministros', 'Ordenar las misiones de las Fuerzas Armadas es del Presidente del Gobierno (art. 6.3.d).']; }],
  ['9-139', q => { O(q, 1, 'El Consejo de Defensa Nacional en pleno informará al Rey, a propuesta del Presidente del Gobierno. Cuando el Rey asista a las reuniones del Consejo, lo presidirá.');
    return ['Para el ejercicio de sus funciones, el Consejo contará con la Comisión Interministerial de Defensa, adscrita al Ministerio de Defensa, como órgano de trabajo permanente', 'La Comisión es órgano de trabajo permanente, no temporal.']; }],
  ['9-163', q => { q.correcta = 0; return ['Para ordenar operaciones en el exterior que no estén directamente relacionadas con la defensa de España o del interés nacional, el Gobierno realizará una consulta previa y recabará la autorización del Congreso de los Diputados', null]; }],
  ['9-165', q => { O(q, 0, 'El primer objetivo de la Defensa es proteger al conjunto de la sociedad española, su Constitución, y los valores, principios e instituciones que ésta consagra para el pleno ejercicio de los derechos y libertades de toda la ciudadanía.'); O(q, 2, 'Para la consecución de ambos objetivos es necesario garantizar la credibilidad de la Defensa Nacional, base de la disuasión y condición indispensable para una contribución e integración multilateral eficaz.'); q.correcta = 3;
    return ['Para la consecución de ambos objetivos es necesario garantizar la credibilidad de la Defensa Nacional, base de la disuasión y condición indispensable para una contribución e integración multilateral eficaz', null]; }],
  ['9-178', q => { O(q, 0, 'El primer objetivo de la Defensa es proteger al conjunto de la sociedad española, su Constitución, y los valores, principios e instituciones que ésta consagra para el pleno ejercicio de los derechos y libertades de toda la ciudadanía.'); q.correcta = 3;
    return ['Para la consecución de ambos objetivos es necesario garantizar la credibilidad de la Defensa Nacional, base de la disuasión y condición indispensable para una contribución e integración multilateral eficaz', null]; }],
  ['9-166', q => { O(q, 1, 'Se limitan al territorio nacional.'); q.correcta = 1; return ['Las amenazas y los desafíos a la seguridad que afrontamos tienen un carácter complejo y transnacional, y deben ser abordados globalmente', null]; }],
  ['9-169', q => { O(q, 1, 'Definir y aprobar los grandes objetivos y planteamientos estratégicos, así como formular las directivas para las negociaciones exteriores que afecten a la política de defensa.'); q.correcta = 3;
    return ['Definir y aprobar los grandes objetivos y planteamientos estratégicos, así como formular las directivas para las negociaciones exteriores que afecten a la política de defensa', null]; }],
  ['9-171', q => { O(q, 3, 'En Pleno y como Consejo Ejecutivo.'); q.correcta = 3; return ['A iniciativa del Presidente del Gobierno, podrá funcionar en pleno y como consejo ejecutivo', null]; }],
  ['9-176', q => { q.correcta = 0; return ['un esfuerzo suplementario al menos un 50% superior por un periodo máximo de un año', null]; }],
  ['9-185', q => { q.pregunta = 'Ley Orgánica 5/2005, de 17 de noviembre, de la Defensa Nacional. La estructura orgánica posibilitará la generación de la estructura operativa y se establecerá mediante criterios de:'; q.correcta = 1;
    return ['La estructura orgánica posibilitará la generación de la estructura operativa. Se establecerá mediante criterios de funcionalidad', null]; }],
  ['9-192', q => { O(q, 3, 'El Gobierno, mediante Real Decreto.'); q.correcta = 3; return ['El Gobierno, mediante Real Decreto, regulará las misiones de carácter militar', null]; }],
  ['9-202', q => { q.pregunta = 'En las misiones en el exterior que, de acuerdo con compromisos internacionales, requieran una respuesta rápida o inmediata a determinadas situaciones, los trámites de consulta previa y autorización se realizarán mediante procedimientos de urgencia que permitan cumplir con dichos compromisos. En estos supuestos, cuando por razones de máxima urgencia no fuera posible realizar la consulta previa, el Gobierno someterá al Congreso de los Diputados la decisión que haya adoptado para la ratificación, en su caso:';
    q.opciones = ['Lo antes posible.', 'En el plazo máximo de diez días.', 'En el plazo máximo de quince días.', 'En el plazo máximo de veinte días.']; q.correcta = 0;
    return ['cuando por razones de máxima urgencia no fuera posible realizar la consulta previa, el Gobierno someterá al Congreso de los Diputados lo antes posible la decisión que haya adoptado para la ratificación, en su caso', 'La Ley no fija un plazo en días.']; }],
  ['9-208', q => { O(q, 0, 'Un Cuartel General.'); O(q, 1, 'Un Mando de Operaciones subordinado.'); O(q, 2, 'A y B son correctas.'); O(q, 3, 'Todas son incorrectas.'); q.correcta = 2;
    return ['El Jefe de Estado Mayor de la Defensa ejercerá el mando del Estado Mayor de la Defensa, en cuya organización contará con un Cuartel General y un Mando de Operaciones subordinado', null]; }],
  ['9-218', q => { O(q, 1, 'La Comisión Interministerial de Defensa.'); return ['Para el ejercicio de sus funciones, el Consejo contará con la Comisión Interministerial de Defensa, adscrita al Ministerio de Defensa, como órgano de trabajo permanente', null]; }],
  ['9-226', q => { q.correcta = 3; return ['g) Por delegación del Ministro de Defensa, podrá ejercer la representación militar nacional ante las organizaciones internacionales de Seguridad y Defensa', 'La delegación es del Ministro de Defensa, no del Presidente del Gobierno.']; }],
  ['9-228', q => { q.correcta = 2; return ['Corresponde al Presidente del Gobierno la dirección de la política de defensa y la determinación de sus objetivos, la gestión de las situaciones de crisis que afecten a la defensa y la dirección estratégica de las operaciones militares en caso de uso de la fuerza', 'Determinar la política de defensa y asegurar su ejecución corresponde al Gobierno (art. 5).']; }],
  ['9-229', q => { O(q, 2, 'Al Sahel Occidental.'); q.correcta = 1; return ['con especial atención al entorno europeo cercano, al Mediterráneo, al Sahel Occidental y al Océano Atlántico', 'El «flanco Occidental» no figura en la lista.']; }],
  ['9-230', q => { O(q, 0, 'El Cuartel General.'); return ['Cada uno de ellos está compuesto por: a) El Cuartel General', 'La Guardia Civil no forma parte de los Ejércitos; cada uno se compone del Cuartel General, la Fuerza y el Apoyo a la Fuerza.']; }],
  ['9-231', q => { O(q, 0, 'Contribuir a la preservación de la paz y seguridad internacionales, en el marco de los compromisos contraídos por el Reino de España.'); return ['Asimismo, tiene por objetivo contribuir a la preservación de la paz y seguridad internacionales, en el marco de los compromisos contraídos por el Reino de España', null]; }],
  ['9-284', q => { O(q, 3, 'El Apoyo a la Fuerza.'); return ['El Apoyo a la Fuerza, entendido como el conjunto de órganos responsables de la dirección, gestión, administración y control de los recursos humanos, materiales y financieros', null]; }],
  ['9-64', q => { O(q, 3, 'Ordenar las misiones de las Fuerzas Armadas.'); return ['Corresponde al Gobierno determinar la política de defensa y asegurar su ejecución, así como dirigir la Administración militar y acordar la participación de las Fuerzas Armadas en misiones fuera del territorio nacional', 'Acordar la participación en misiones fuera del territorio nacional es del Gobierno (art. 5), no del Presidente.']; }],
  ['9-159', q => { O(q, 3, 'Ordenar las misiones de las Fuerzas Armadas.'); return ['Corresponde al Gobierno determinar la política de defensa y asegurar su ejecución, así como dirigir la Administración militar y acordar la participación de las Fuerzas Armadas en misiones fuera del territorio nacional', 'Acordar la participación en misiones fuera del territorio nacional es del Gobierno (art. 5), no del Presidente.']; }],
  ['9-250', q => { q.correcta = 1; return [CONS + ' que garantizan el Sistema de Seguridad Nacional', null]; }],
];
// ---------- aplicación ----------
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const malas = [];
for (const [id, fn] of F) {
  const key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1));
  const [cita, extra] = fn(q);
  const okLO = LON.includes(nz(cita)), okDD = DDN.includes(nz(cita));
  if (!okLO && !okDD) { malas.push(id); continue; }
  const art = lab(cita) || 'temario oficial';
  q.explicacion = ex(q, art, cita, extra);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
if (malas.length) { console.log('✗ CITA NO LITERAL (no se aplica):', malas.join(', ')); }
fs.writeFileSync(FILE, s); console.log('corregidas', n, 'de', F.length);
