// Tema 5 · preguntas OFICIALES (estilo academia) para los apartados con marca suya (sello EXAMEN/EXOF y fichas R) que no tenían
// pregunta oficial (tema5/cobertura-marcas-t5.js, 17/10/2026). Ids 5-315… insertados tras 5-314. Cita literal verificada contra
// los textos del tema (oficial + consolidados de su temario para VIS y Código de visados). Idempotente.
// Uso: node prompts/herramientas/tema5/preguntas-of-marcas-t5.js [--check]
const fs = require('fs'), path = require('path');
const F = 'test-oficial-conocimiento.html', BS = String.fromCharCode(92), L = 'ABCD';
const DIR = path.join(__dirname, '..', '..', 'temario-limpio', 'tema5');
const TXT = ['oficial-paginas.txt', 'consolidado.txt', 'transcrito.txt', 'escaneado-paginas.txt'].map(f => path.join(DIR, f));
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const SIS = ['Reglamento (UE) 2018/1861, de 28 de noviembre de 2018, relativo al establecimiento, funcionamiento y utilización del Sistema de Información de Schengen (SIS) en el ámbito de las inspecciones fronterizas', 'Reglamento (UE) 2018/1861', 'Reglamento (UE) 2018/1861 (Sistema de Información de Schengen - SIS)'];
const VIS = ['Reglamento (CE) n.º 767/2008, de 9 de julio de 2008, sobre el Sistema de Información de Visados (VIS)', 'Reglamento (CE) n.º 767/2008 (VIS)', 'General / Bases de Datos Europeas'];
const CV = ['Reglamento (CE) n.º 810/2009, de 13 de julio de 2009, por el que se establece un Código comunitario sobre visados (Código de visados)', 'Código de visados', 'General / Bases de Datos Europeas'];
const EUR = ['Reglamento (UE) 2024/1358, de 14 de mayo de 2024, sobre la creación del sistema «Eurodac» para la comparación de datos biométricos', 'Reglamento (UE) 2024/1358', 'Reglamento (UE) 2024/1358 (Sistema EURODAC)'];
const Q = [
 { n: SIS, marca: 'R2', a: 'art. 4.7', r: 'Arquitectura técnica y funcionamiento del SIS', e: 'La CS-SIS asegurará una disponibilidad:', c: 2,
   o: ['Permanente durante el horario laboral de las oficinas Sirene.', 'Continuada salvo en los períodos de mantenimiento programado.', 'Ininterrumpida.', 'De veinticuatro horas los días laborables.'],
   t: 'La CS-SIS asegurará una disponibilidad ininterrumpida.', p: 'El reglamento no admite excepciones: la disponibilidad de la CS-SIS es ininterrumpida.' },
 { n: SIS, marca: 'R3', a: 'art. 8.4', r: 'Intercambio de información complementaria', e: 'Las oficinas Sirene llevarán a cabo sus cometidos de manera rápida y eficiente, en particular respondiendo a las solicitudes de información complementaria lo antes posible, y como máximo:', c: 0,
   o: ['Doce horas después de su recepción.', 'Veinticuatro horas después de su recepción.', 'Seis horas después de su recepción.', 'Cuarenta y ocho horas después de su recepción.'],
   t: 'respondiendo a las solicitudes de información complementaria lo antes posible, y como máximo doce horas después de su recepción.', p: '' },
 { n: SIS, marca: 'R4', a: 'art. 15.1', r: 'Gestión operativa', e: 'eu-LISA se asegurará, en cooperación con los Estados miembros, de que en el SIS Central se utilice en todo momento la mejor tecnología disponible, con sujeción a:', c: 3,
   o: ['La autorización previa del Supervisor Europeo de Protección de Datos.', 'Un informe favorable del Consejo de Administración de eu-LISA.', 'Las disponibilidades presupuestarias de cada Estado miembro.', 'Un análisis de costes y beneficios.'],
   t: 'eu-LISA se asegurará, en cooperación con los Estados miembros, de que en el SIS Central se utilice en todo momento la mejor tecnología disponible, con sujeción a un análisis de costes y beneficios.', p: '' },
 { n: SIS, marca: 'R5', a: 'art. 17.4', r: 'Confidencialidad – eu-LISA', e: 'No se encomendará a empresas u organizaciones privadas:', c: 1,
   o: ['El mantenimiento evolutivo de la infraestructura de comunicación.', 'La gestión operativa de la CS-SIS.', 'La formación del personal de las oficinas Sirene.', 'Las campañas de información del SIS.'],
   t: 'No se encomendará a empresas u organizaciones privadas la gestión operativa de la CS-SIS.', p: '' },
 { n: SIS, marca: 'R8', a: 'art. 50', r: 'Transferencia de datos personales a terceros', e: 'Los datos tratados en el SIS y la correspondiente información complementaria intercambiada con arreglo al presente Reglamento:', c: 2,
   o: ['Solo se transmitirán a terceros países con el consentimiento del Estado miembro emisor.', 'Podrán ponerse a disposición de organizaciones internacionales previa autorización de eu-LISA.', 'No se transmitirán ni se pondrán a disposición de terceros países ni de organizaciones internacionales.', 'Solo se transmitirán a Interpol cuando así lo autorice la oficina Sirene.'],
   t: 'Los datos tratados en el SIS y la correspondiente información complementaria intercambiada con arreglo al presente Reglamento no se transmitirán ni se pondrán a disposición de terceros países ni de organizaciones internacionales.', p: '' },
 { n: SIS, marca: 'EXAMEN · R9', a: 'art. 56.1', r: 'Supervisión de eu-LISA', e: 'Será responsable de supervisar el tratamiento de datos personales por parte de eu-LISA y de asegurarse de que se lleve a cabo conforme al presente Reglamento:', c: 0,
   o: ['El Supervisor Europeo de Protección de Datos.', 'El Comité Europeo de Protección de Datos.', 'Las autoridades de control de los Estados miembros.', 'La Comisión, asistida por el Consejo de Administración de eu-LISA.'],
   t: 'El Supervisor Europeo de Protección de Datos será responsable de supervisar el tratamiento de datos personales por parte de eu-LISA y de asegurarse de que se lleve a cabo conforme al presente Reglamento.', p: '' },
 { n: VIS, marca: 'R13', a: 'art. 25.2', r: 'Supresión anticipada de datos', e: 'Cada Estado miembro informará al Estado miembro responsable de que el solicitante ha adquirido su nacionalidad:', c: 3,
   o: ['En el plazo de un mes desde la adquisición de la nacionalidad.', 'En el plazo de tres días hábiles, a través de eu-LISA.', 'Cuando el Estado miembro responsable lo solicite expresamente.', 'Sin demora.'],
   t: 'Cada Estado miembro informará sin demora al Estado miembro responsable de que el solicitante ha adquirido su nacionalidad.', p: 'Texto consolidado de tu temario (el RECUERDA impreso dice «inmediatamente», versión antigua).' },
 { n: VIS, marca: 'R14', a: 'art. 26.2', r: 'Gestión operativa', e: 'La Autoridad de Gestión (hoy eu-LISA) será asimismo responsable de las siguientes funciones relacionadas con la infraestructura de comunicación entre el VIS central y las interfaces nacionales. Señale la INCORRECTA:', c: 1,
   o: ['Supervisión.', 'Ejecución del presupuesto.', 'Seguridad.', 'Coordinación de las relaciones entre los Estados miembros y el proveedor.'],
   t: 'La Autoridad de Gestión será asimismo responsable de las siguientes funciones relacionadas con la infraestructura de comunicación entre el VIS central y las interfaces nacionales: a) supervisión; b) seguridad; c) coordinación de las relaciones entre los Estados miembros y el proveedor.', p: 'La ejecución del presupuesto corresponde a la Comisión (apartado 3).' },
 { n: VIS, marca: 'R16', a: 'art. 31.3', r: 'Transmisión de datos a terceros países u organizaciones internacionales', e: 'Estas transmisiones de datos personales a terceros países u organizaciones internacionales no afectarán a:', c: 2,
   o: ['Las competencias de las autoridades centrales de visados de los Estados miembros.', 'Los acuerdos de readmisión celebrados por la Unión con terceros países.', 'Los derechos de los refugiados y de las personas que solicitan una protección a nivel internacional.', 'Las obligaciones de los transportistas respecto de los pasajeros sin visado.'],
   t: 'Estas transmisiones de datos personales a terceros países u organizaciones internacionales no afectarán a los derechos de los refugiados y de las personas que solicitan una protección a nivel internacional', p: '' },
 { n: VIS, marca: 'R18', a: 'art. 42.2', r: 'Supervisión por parte del Supervisor Europeo de Protección de Datos', e: 'El Supervisor Europeo de Protección de Datos garantizará que se lleve a cabo una auditoría de las actividades de tratamiento de datos personales de eu-LISA con arreglo a las normas internacionales de auditoría aplicables. Se enviará un informe de la auditoría:', c: 0,
   o: ['Al Parlamento Europeo, al Consejo, a eu-LISA, a la Comisión y a las autoridades de control.', 'Al Parlamento Europeo, al Consejo y a la Comisión, exclusivamente.', 'A la Comisión, a eu-LISA y al Comité Europeo de Protección de Datos.', 'Al Consejo, a la Comisión y a las autoridades centrales de visados.'],
   t: 'El Supervisor Europeo de Protección de Datos garantizará que se lleve a cabo una auditoría de las actividades de tratamiento de datos personales de eu-LISA con arreglo a las normas internacionales de auditoría aplicables. Se enviará un informe de la auditoría al Parlamento Europeo, al Consejo, a eu-LISA, a la Comisión y a las autoridades de control.', p: '' },
 { n: CV, marca: 'R24', a: 'art. 16.2', r: 'Tasas de visado', e: 'Las tasas de visado para los niños de entre seis y doce años serán de:', c: 1,
   o: ['35 EUR.', '45 EUR.', '60 EUR.', '40 EUR.'],
   t: '2. Las tasas de visado para los niños de entre seis y doce años serán de 45 EUR.', p: 'El RECUERDA impreso dice 40 EUR (versión antigua); el texto consolidado vigente dice 45 EUR.' },
 { n: CV, marca: 'R25', a: 'art. 29.2', r: 'Colocación de la etiqueta de visado', e: 'No se sellarán:', c: 3,
   o: ['Los pasaportes de los menores de doce años ni los de sus acompañantes.', 'Los documentos de viaje que contengan un visado de tránsito aeroportuario.', 'Los pasaportes de los titulares de un permiso de residencia válido.', 'Los pasaportes diplomáticos, oficiales o de servicio ni los pasaportes especiales.'],
   t: 'No se sellarán los pasaportes diplomáticos, oficiales o de servicio ni los pasaportes especiales.', p: '' },
 { n: CV, marca: 'R27', a: 'art. 30', r: 'Derechos derivados de un visado expedido', e: 'La mera posesión de un visado uniforme o de un visado de validez territorial limitada:', c: 0,
   o: ['No conferirá un derecho de entrada automático.', 'Conferirá un derecho de entrada en todo el espacio Schengen.', 'Conferirá un derecho de entrada sin control en la frontera exterior.', 'No conferirá derecho de entrada salvo en el Estado miembro expedidor.'],
   t: 'La mera posesión de un visado uniforme o de un visado de validez territorial limitada no conferirá un derecho de entrada automático.', p: '' },
 { n: EUR, marca: 'R32', a: 'art. 15.1', r: 'Recopilación y transmisión de los datos biométricos', e: 'Los Estados miembros tomarán, de conformidad con el artículo 13, apartado 2, los datos biométricos de cada solicitante de protección internacional de al menos:', c: 2,
   o: ['Catorce años de edad.', 'Doce años de edad.', 'Seis años de edad.', 'Dieciocho años de edad.'],
   t: 'Los Estados miembros tomarán, de conformidad con el artículo 13, apartado 2, los datos biométricos de cada solicitante de protección internacional de al menos seis años de edad', p: 'El RECUERDA impreso (Rgto. 603/2013, derogado) hablaba de «mayor de catorce años»; el Rgto. 2024/1358 lo baja a seis.' },
 { n: EUR, marca: 'R33', a: 'art. 37.5', r: 'Transmisión', e: 'La Agencia eu-LISA establecerá los procedimientos técnicos necesarios que deberán aplicar los Estados miembros para garantizar que Eurodac reciba:', c: 1,
   o: ['Datos cifrados de extremo a extremo.', 'Datos inequívocos.', 'Datos completos en el plazo de 72 horas.', 'Datos verificados por la autoridad verificadora.'],
   t: 'La Agencia eu-LISA establecerá los procedimientos técnicos necesarios que deberán aplicar los Estados miembros para garantizar que Eurodac reciba datos inequívocos.', p: '' },
];
const of = nrm(TXT.filter(f => fs.existsSync(f)).map(f => fs.readFileSync(f, 'utf8')).join(' '));
const malas = Q.filter(q => !of.includes(nrm(q.t))).map(q => q.marca + ' ' + q.a);
if (malas.length) { console.log('✗ citas no literales:', malas.join(', ')); process.exit(1); }
const objs = Q.map((q, i) => ({ id: '5-' + (315 + i), pregunta: `${q.n[0]}. ${q.r}. ${q.e}`, opciones: q.o, correcta: q.c,
  explicacion: `<span class="ex-resp">Respuesta correcta: <b>${L[q.c]}</b> · <mark class="ex-key">${esc(q.o[q.c].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${q.a} del ${q.n[1]}</span> dispone: <span class="ref-concepto">"${esc(q.t)}"</span>.${q.p ? ' ' + esc(q.p) : ''} <em style="color:var(--texto-gris)">(Pregunta del apartado marcado ${q.marca} en tu temario)</em>`,
  apartado: q.n[2] }));
const larga = objs.filter(o => { const l = o.opciones.map(x => x.length); return l[o.correcta] === Math.max(...l); }).length;
console.log('✓', objs.length, 'citas literales · letras', [0, 1, 2, 3].map(c => objs.filter(o => o.correcta === c).length).join('/'), '· correcta la más larga:', larga);
if (process.argv.includes('--check')) process.exit(0);
let s = fs.readFileSync(F, 'utf8');
const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
let prev = '5-314', n = 0;
for (const o of objs) { const r = rango(o.id); if (r) s = s.slice(0, r[0]) + JSON.stringify(o) + s.slice(r[1]); else { const p = rango(prev); s = s.slice(0, p[1]) + ',' + JSON.stringify(o) + s.slice(p[1]); n++; } prev = o.id; }
fs.writeFileSync(F, s); console.log('insertadas', n, '· actualizadas', objs.length - n);
