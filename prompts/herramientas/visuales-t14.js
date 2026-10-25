// Esquemas visuales del Tema 14 (LO 3/1981 y Reglamento del Defensor del Pueblo). Uso: node prompts/herramientas/visuales-t14.js
// Incluye los cuadros del temario subrayado del usuario (págs. 5 y 7, 21 y 22, 23 y las fichas «Recuerda» R1-R15) y esquemas propios.
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const V = []; const v = (despues, html) => V.push([despues, html]);
const hoja = (t, p, c) => ({ p: p || '', c, t });   // hoja sin chapa (p vacío) o con ella

// ---------------------------------------------------------------- Cuadro resumen del temario (págs. 5 y 7)
v('Artículo 1 — Carácter', tabla('Defensor del Pueblo: cuadro resumen del temario', ['Apartado', 'Contenido'], [
  { l: 'CONCEPTO', h: [hoja(`${D('Alto comisionado')} de las ${R('Cortes Generales')} designado por éstas para la defensa de los derechos contenidos en el ${D('Título I')} a cuyo efecto podrá ${D('supervisar la actividad de la Administración')} dando cuenta a las Cortes`)] },
  { l: 'MANDATO', h: [hoja(`Elegido por las Cortes Generales por un periodo de ${R('cinco años')}`)] },
  { l: 'ELECCIÓN Y NOMBRAMIENTO', h: [
    hoja(`Una vez propuesto, el candidato o candidatos al Pleno de las Cámaras por acuerdo de ${P('mayoría simple')} de la ${D('Comisión Mixta Congreso-Senado')}`),
    hoja(`Se convocará en término ${K('no inferior')} a ${R('diez días')} al ${D('Pleno del Congreso')} para que proceda a la votación y será designado el que obtenga ${P('mayoría de 3/5')} de los miembros del Congreso y, posteriormente, en el plazo máximo de ${R('20 días')}, fuese ratificado por ${P('3/5 del Senado')}`),
    hoja(`Si no se logra: sucesivas propuestas de la Comisión durante ${P('un mes')}, para lo cual hará falta ${P('3/5 del Congreso')} y ${P('mayoría absoluta del Senado')}`)] },
  { l: 'CESE', h: [hoja('Por renuncia'), hoja('Por expiración del plazo de su nombramiento'), hoja('Por muerte o por incapacidad sobrevenida'), hoja(`Por actuar con ${D('notoria negligencia')} en el cumplimiento de las obligaciones y deberes del cargo`), hoja(`Por haber sido condenado, mediante ${D('sentencia firme')}, por ${D('delito doloso')}`)] },
  { l: 'PRERROGATIVAS', h: [hoja(`${K('No')} está sujeto a ${D('mandato imperativo')}`), hoja(`${D('Inviolabilidad')} por las opiniones que formule o los actos que realice en el ejercicio de sus funciones`), hoja(`Solo podrá ser ${D('detenido en caso de flagrante delito')} mientras permanezca en el ejercicio de sus funciones (su inculpación, prisión, procesamiento y juicio corresponde ${K('exclusivamente')} a la ${R('Sala de lo Penal del Tribunal Supremo')})`)] },
  { l: 'CARACTERÍSTICAS', h: [hoja(`Actuaciones iniciadas de ${D('oficio')} o a ${D('instancia de parte')}`), hoja(`${D('Actuación gratuita')} (no siendo necesario ni abogado ni procurador)`), hoja(`Es una de las ${D('instituciones de garantía')} que integra el sistema de protección de derechos`)] },
  { l: 'INCOMPATIBILIDADES', h: [hoja('Mandato representativo'), hoja(`Cargo político o ${D('propaganda política')}`), hoja('Servicio activo en la Administración Pública'), hoja(`${D('Afiliación')} a partido político, sindicación y dirección del partido político, asociación y fundación`), hoja('Carrera judicial y fiscal'), hoja('Actividad laboral, profesional, liberal y mercantil')] },
  { l: 'FUNCIONES PRINCIPALES', h: [hoja(`${D('Protección')} de derechos y deberes fundamentales`), hoja(`${D('Supervisión')}, de oficio o a instancia de parte, de todas las administraciones públicas`)] },
  { l: 'ADJUNTOS', h: [hoja(`${P('2 adjuntos')} (propuestos por el Defensor del Pueblo)`), hoja(`${D('Auxilio')} al Defensor del Pueblo`)] },
  { l: 'INFORMES', h: [hoja(`${D('Anual')}: ante las Cortes Generales cuando se hallen reunidas en periodo ordinario de sesiones`), hoja(`${D('Extraordinario')}: dirigido a las ${R('Diputaciones Permanentes')} si las Cortes no se encontraran reunidas, cuando la gravedad o urgencia de los hechos lo aconsejen`)] }]));

// ---------------------------------------------------------------- Elección (flujo propio)
v('Artículo 2 — Elección', flujo('Elección del Defensor del Pueblo (art. 2)', [
  { et: '1', t: `La ${D('Comisión Mixta Congreso-Senado')} se reúne cuando lo acuerden conjuntamente los Presidentes del Congreso y del Senado y, en todo caso, para proponer al candidato o candidatos. Sus acuerdos: ${P('mayoría simple')}` },
  { et: '2', t: `Propuesto el candidato, se convoca al ${D('Pleno del Congreso')} en término ${K('no inferior')} a ${R('diez días')}` },
  { et: '3', t: `Es designado quien obtenga ${P('3/5 de los miembros del Congreso')} y, en un plazo máximo de ${R('veinte días')}, sea ratificado por la ${P('misma mayoría del Senado')}` },
  { bif: [{ et: 'Si se logra', c: 'si', t: `Nombramiento acreditado por la firma conjunta de los Presidentes del Congreso y del Senado y publicado en el BOE; juramento o promesa ante las Mesas de ambas Cámaras (art. 4)` }, { et: 'Si no se logra', c: 'no', t: `Nueva sesión de la Comisión y, en el plazo máximo de ${P('un mes')}, nuevas propuestas: basta ${P('3/5 en el Congreso')} y ${P('mayoría absoluta del Senado')}` }] }]));

// ---------------------------------------------------------------- Cese y vacante (árbol propio)
v('Artículo 5 — Cese', arbol('Cese y vacante del Defensor del Pueblo (art. 5)', `${D('Cese')}`, [
  { t: 'Causas de cese:', sub: ['renuncia', 'expiración del plazo de su nombramiento', 'muerte o incapacidad sobrevenida', `${D('notoria negligencia')} en el cumplimiento de los deberes del cargo`, `${D('sentencia firme')} por ${D('delito doloso')}`] },
  { t: 'La vacante se declara:', sub: [`por el ${R('Presidente del Congreso')}: muerte, renuncia y expiración del plazo`, `en los demás casos: mayoría de ${R('3/5 de los componentes de cada Cámara')}, mediante debate y previa audiencia del interesado`] },
  `Nuevo nombramiento: procedimiento en plazo ${K('no superior')} a ${P('un mes')}`,
  `Mientras tanto, desempeñan sus funciones interinamente, en su propio orden, los ${R('Adjuntos')}`]));

// ---------------------------------------------------------------- Quejas (flujo propio)
v('Artículo 18 — Investigación', flujo('Tramitación de las quejas (arts. 15 a 18)', [
  { et: '15', t: `Queja firmada por el interesado (nombre, apellidos y domicilio), escrito razonado en papel común, ${R('plazo máximo de un año')} desde que tuvo conocimiento de los hechos. Actuaciones ${D('gratuitas')}: sin Letrado ni Procurador. De toda queja se ${D('acusa recibo')}` },
  { et: '17', t: `El Defensor ${D('registra, acusa recibo, tramita o rechaza')}. Rechazo en ${D('escrito motivado')} (puede informar de las vías oportunas). ${K('Anónimas')}: se rechazan; mala fe, carencia de fundamento, inexistencia de pretensión o perjuicio a tercero: puede rechazarlas. Decisiones ${K('no susceptibles de recurso')}` },
  { et: '17.2', t: `Si hay ${D('resolución judicial pendiente')}: no examen individual (se suspende si luego hay demanda o recurso), pero sí investigación de los problemas generales` },
  { et: '18', t: `Admitida: investigación ${R('sumaria e informal')}; se da cuenta al organismo para que su Jefe remita informe escrito en el plazo máximo de ${R('quince días')} (ampliable)` },
  { et: '18.2', t: `La negativa o negligencia en el envío del informe puede ser considerada ${D('hostil y entorpecedora')}: se hace pública de inmediato y se destaca en el informe anual o especial` }]));

// ---------------------------------------------------------------- Cuadro del temario (págs. 21 y 22) + fichas R1-R9, tras el art. 37
v('Artículo 37 — Dotación económica', tabla('Defensor del Pueblo: concepto, elección, cese, competencias y procedimiento (cuadro del temario)', ['Apartado', 'Contenido'], [
  { l: 'CONCEPTO', h: [hoja(`(${D('art. 54 CE')}) El Defensor del Pueblo es el ${D('alto comisionado de las Cortes Generales')} designado por éstas para la defensa de los derechos comprendidos en el ${D('Título I')} de la Constitución, a cuyo efecto podrá supervisar la actividad de la Administración, dando cuenta a las Cortes Generales. Ejercerá las funciones que le encomienda la Constitución y la presente Ley`)] },
  { l: 'CARACTERÍSTICAS', h: [hoja(`Depende ${D('única y exclusivamente')} de las Cortes Generales`), hoja(`Tiene como misión la ${D('vigilancia y la defensa del Título I')} de la Constitución`), hoja('Supervisa la actividad de la Administración')] },
  { l: 'ELECCIÓN', h: [
    hoja(`Será elegido por las Cortes Generales por un periodo de ${R('5 años')}`),
    hoja(`Lo designan las Cortes → ${D('Comisión Mixta Congreso-Senado')} → por ${P('mayoría simple')} → proposición del candidato ${K('no inferior')} a ${R('10 días')} al ${D('Pleno del Congreso')}`),
    hoja(`Votación favorable de las ${P('3/5 partes')} del Congreso y, posteriormente (plazo de ${R('20 días')}), la misma mayoría de votos del Senado`),
    hoja(`Cualquier ${D('español mayor de edad')} en pleno disfrute de sus derechos ${D('civiles y políticos')}`),
    hoja(`Nombramiento por la firma conjunta de los Presidentes del Congreso y del Senado; se publicará en el BOE`),
    hoja(`Juramento o promesa ante las ${R('Mesas de ambas Cámaras')}`),
    hoja(`Puede delegar funciones en un ${D('Adjunto Primero')} y un ${D('Adjunto Segundo')}`)] },
  { l: 'PRERROGATIVAS', h: [hoja(`Gozará de ${D('inviolabilidad')}`), hoja(`En caso de ${D('flagrante delito')} → inculpación, prisión, procesamiento y juicio: ${R('Sala de lo Penal del Tribunal Supremo')}`), hoja('Aplicable también a los Adjuntos')] },
  { l: 'INCOMPATIBILIDADES', h: [hoja(`Incompatible con todo ${D('mandato representativo')}`), hoja(`Debe cesar dentro de los ${R('10 días siguientes')} a su nombramiento y antes de tomar posesión en toda situación de incompatibilidad; si fuese sobrevenida en el cargo, se entiende ${D('renuncia')}`)] },
  { l: 'CAUSAS DE CESE', h: [
    hoja('Por renuncia · por expiración del plazo de su nombramiento · por muerte o por incapacidad sobrevenida'),
    hoja(`Por actuar con ${D('notoria negligencia')} en el cumplimiento de las obligaciones y deberes del cargo · por haber sido condenado, mediante ${D('sentencia firme')}, por ${D('delito doloso')}`),
    hoja(`Se declarará por el ${R('Presidente del Congreso')} en los casos de muerte, renuncia y expiración del plazo del mandato; en los demás casos, por mayoría de ${R('3/5')} de los componentes de cada Cámara, mediante debate y previa audiencia del interesado`),
    hoja(`Vacante el cargo se iniciará el procedimiento para el nombramiento de nuevo Defensor en plazo ${K('no superior')} a ${P('un mes')}`),
    hoja(`En los casos de muerte, cese o incapacidad temporal o definitiva y mientras las Cortes no designen a otro, desempeñarán sus funciones, interinamente y en su propio orden, los ${D('Adjuntos')}`)] },
  { l: 'COMPETENCIAS', h: [hoja(`De ${D('oficio')} o a ${D('instancia de parte')}`), hoja(`Quejas sobre el funcionamiento de la ${D('Administración de Justicia')}: las dirige al ${D('Ministerio Fiscal')} para que investigue y adopte las medidas oportunas, o da traslado al ${D('Consejo General del Poder Judicial')} según el tipo de reclamación, sin perjuicio de la referencia en su informe general a las Cortes`)] },
  { l: 'PROCEDIMIENTO', h: [
    hoja(`Queja → cualquier persona → presentación por escrito → plazo de ${R('1 año')}`),
    hoja(`Investigación de la actuación administrativa → ${R('15 días')} para que emita informe, plazo ampliable`),
    hoja(`Efectos: podrá interponer los recursos de ${D('inconstitucionalidad y de amparo')} y formular advertencia, recomendación o sugerencia al funcionario responsable`),
    hoja(`Informe a las Cortes Generales de la gestión realizada; en caso de gravedad o urgencia, ${D('informe extraordinario')} a las ${R('Diputaciones Permanentes')}. Ambos informes serán publicados`)] }]));

v('Artículo 37 — Dotación económica', tabla('RECUERDA del temario (R1 a R9): Ley Orgánica del Defensor del Pueblo', ['Ficha', 'Pregunta → respuesta'], [
  { l: 'LO del Defensor del Pueblo', h: [
    hoja(`El Defensor del Pueblo es el alto comisionado de las Cortes Generales designado por éstas para la defensa de los derechos comprendidos en el: → ${R('Título I de la Constitución')}, a cuyo efecto podrá supervisar la actividad de la Administración, dando cuenta a las Cortes Generales`, 'R1', 'o'),
    hoja(`El Defensor del Pueblo será elegido por: → las ${R('Cortes Generales')} para un periodo de ${R('cinco años')}, y se dirigirá a las mismas a través de los Presidentes del Congreso y del Senado, respectivamente`, 'R2', 'o'),
    hoja(`Podrá ser elegido Defensor del Pueblo cualquier español mayor de edad que se encuentre en el pleno disfrute de sus derechos: → ${R('civiles y políticos')}`, 'R3', 'o'),
    hoja(`El Defensor del Pueblo deberá cesar en toda situación de incompatibilidad que pudiere afectarle, entendiéndose en caso contrario que no acepta el nombramiento: → ${R('dentro de los diez días siguientes a su nombramiento y antes de tomar posesión')}`, 'R4', 'o'),
    hoja(`La actividad del Defensor del Pueblo no se verá interrumpida en los casos en que las Cortes Generales: → ${R('no se encuentren reunidas, hubieren sido disueltas o hubiere expirado su mandato')}`, 'R5', 'o'),
    hoja(`Toda queja se presentará firmada por el interesado, con indicación de su nombre, apellidos y domicilio, en escrito razonado en papel común y en el plazo máximo de: → ${R('un año')}, contado a partir del momento en que tuviera conocimiento de los hechos objeto de la misma`, 'R6', 'o'),
    hoja(`Todos los poderes públicos están obligados a auxiliar al Defensor del Pueblo en sus investigaciones e inspecciones: → ${R('con carácter preferente y urgente')}`, 'R7', 'o'),
    hoja(`Cuando las actuaciones practicadas revelen que la queja ha sido originada presumiblemente por el abuso, arbitrariedad, discriminación, error, negligencia u omisión de un funcionario, el Defensor del Pueblo podrá: → ${R('dirigirse al afectado haciéndole constar su criterio al respecto')}`, 'R8', 'o'),
    hoja(`El Defensor del Pueblo está legitimado para interponer los recursos de inconstitucionalidad y de amparo, de acuerdo con lo dispuesto en: → ${R('la Constitución y en la Ley Orgánica del Tribunal Constitucional')}`, 'R9', 'o')] }]));

// ---------------------------------------------------------------- Plazos de la Ley (resumen)
v('Disposición final única', plazos('Plazos de la LO 3/1981 (resumen)', [
  ['5 años', `Mandato del Defensor del Pueblo (art. 2.1) · ${R('a los cinco años de entrada en vigor')} puede proponer modificaciones de la Ley (disposición transitoria)`],
  ['≥ 10 días', `Convocatoria del Pleno del Congreso tras la propuesta (art. 2.4) · plazo para responder el afectado: ${K('nunca inferior')} a diez días, prorrogable por la mitad (art. 20.2)`],
  ['20 días', 'Plazo máximo para la ratificación por 3/5 del Senado (art. 2.4)'],
  ['1 mes', `Nuevas propuestas si no se alcanzan las mayorías (art. 2.5) · inicio del procedimiento tras la vacante, ${K('no superior')} a un mes (art. 5.3) · respuesta escrita a las recomendaciones, ${K('no superior')} a un mes (art. 30.1)`],
  ['10 días', 'Cesar en la incompatibilidad desde el nombramiento y antes de tomar posesión (art. 7.2)'],
  ['1 año', 'Plazo máximo para presentar la queja desde que se tuvo conocimiento de los hechos (art. 15.1)'],
  ['15 días', 'Informe escrito del organismo al que se da cuenta de la queja, ampliable (art. 18.1)']]));

// ---------------------------------------------------------------- Reglamento
v('Artículo 7 — Tratamiento', arbol('Órganos de la Institución según el Reglamento', `${D('Defensor del Pueblo')}`, [
  { t: 'Adjuntos (Primero y Segundo)', sub: [`${R('Adjunto Primero')}: coordina los servicios y el despacho ordinario con el Secretario General`, 'El Adjunto delegado preside el Consejo Asesor del MNP'] },
  `${R('Junta de Coordinación y Régimen Interior')}: Defensor, Adjuntos y Secretario general (voz y sin voto)`,
  { t: `${R('Consejo Asesor')} del Mecanismo Nacional de Prevención de la Tortura`, sub: ['Adjuntos (natos) + máximo 10 Vocales', 'Preside el Adjunto delegado'] },
  { t: 'Secretario General', sub: ['Servicio de Régimen Económico (3 Secciones)', 'Servicio de Régimen Interior, Estudios, Documentación y Publicaciones: Registro General y Oficina de Información', 'Sección de Archivo: bajo su directa responsabilidad'] },
  `${D('Gabinete Técnico')} (dirigido por uno de los Asesores): Secretaría particular, estudios e informes, protocolo · Gabinete de Prensa e Información`]));

v('Artículo 22 — Funciones del Consejo Asesor', tabla('Consejo Asesor del Mecanismo Nacional de Prevención de la Tortura (cuadro del temario)', ['Apartado', 'Contenido'], [
  { l: 'NATURALEZA', h: [hoja(`${D('Órgano de cooperación técnica y jurídica')} del Mecanismo Nacional de Prevención`)] },
  { l: 'FORMACIÓN', h: [hoja(`Integrado por los ${D('Adjuntos')} del Defensor del Pueblo (miembros natos) y un ${R('máximo de 10 Vocales')} (mayores de edad, en pleno disfrute de sus derechos civiles y políticos, con reconocida trayectoria en defensa de los Derechos Humanos)`)] },
  { l: 'PRESIDENCIA', h: [hoja(`${D('Adjunto')} en quien delegue el Defensor del Pueblo las funciones del mecanismo; en caso de ausencia o vacante lo sustituye el otro Adjunto`)] },
  { l: 'DESIGNACIÓN DE LOS VOCALES', c: 'v', h: [
    hoja(`${P('1')} Consejo General de la Abogacía (Abogado)`, '', ''),
    hoja(`${P('1')} Organización Médica Colegial (Médico)`),
    hoja(`${P('1')} Consejo General de Colegios Oficiales de Psicólogos de España (Psicólogo)`),
    hoja(`${R('Hasta 2')} a propuesta conjunta de los organismos con convenios de colaboración con el Defensor para las funciones del MNP, si así está previsto (${K('no más de un representante por entidad')})`),
    hoja(`${P('5')} elegidos de entre las candidaturas, a título personal o en representación de organizaciones de la sociedad civil, presentadas al Defensor del Pueblo`),
    hoja(`Designados por el Defensor del Pueblo por ${R('4 años')} y renovados por ${R('mitades cada 2')}; también pone fin a sus funciones · ${D('Convocatoria pública')} (candidaturas en 15 días naturales) · ${K('No')} perciben retribuciones, salvo indemnizaciones por razón del servicio`)] },
  { l: 'REUNIONES', h: [hoja(`${R('Al menos dos veces al año')}`), hoja('Pueden asistir miembros del personal del Defensor, representantes de organismos internacionales de Derechos Humanos u otras personas convocadas por indicación del Presidente')] }]));

v('Artículo 38 — Procedimiento sancionador', cols('Faltas disciplinarias del personal (arts. 36 a 38)', [
  { t: 'Falta LEVE', l: [`Prescribe a los ${R('dos meses')}`, `Sanción: ${R('apercibimiento')} o suspensión de empleo y remuneración de ${R('uno a diez días')}`, `La impone el ${D('superior jerárquico')}; ${K('no')} hay expediente, pero se oye al presunto infractor`] },
  { t: 'Falta GRAVE', l: [`Prescribe a los ${R('seis meses')}`, `Sanción: suspensión de empleo y remuneración de ${R('hasta seis meses')}`, `Expediente: pliego de cargos, prueba y propuesta de resolución; incoación e imposición por el ${D('Secretario general')} (suspensión y separación: solo el Defensor)`] },
  { t: 'Falta MUY GRAVE', l: [`Prescribe al ${R('año')}`, `Sanción: suspensión de empleo y remuneración o separación del servicio de ${R('seis meses a seis años')}`, `Mismo expediente que la grave; las sanciones de ${D('suspensión y separación')} solo las impone el ${D('Defensor del Pueblo')}`] }]));

v('Artículo 42 — Contratación', tabla('RECUERDA del temario (R10 a R15): Reglamento del Defensor del Pueblo', ['Ficha', 'Pregunta → respuesta'], [
  { l: 'Reglamento del Defensor del Pueblo', h: [
    hoja(`Para el ejercicio de sus funciones, el Defensor del Pueblo estará asistido por: → ${R('una Junta de Coordinación y Régimen Interior')}`, 'R10', 'o'),
    hoja(`El Adjunto en el que el Defensor del Pueblo delegue las funciones del Mecanismo Nacional de Prevención asumirá la presidencia de: → ${R('su Consejo asesor')}`, 'R11', 'o'),
    hoja(`El Consejo Asesor estará integrado por: → ${R('los Adjuntos del Defensor del Pueblo, como miembros natos, además de por un máximo de 10 Vocales')}`, 'R12', 'o'),
    hoja(`Dependiendo del Servicio de Régimen Interior, Estudio, Documentación y Publicaciones, existirá: → ${R('un Registro General y una Oficina de Información')}`, 'R13', 'o'),
    hoja(`Los Asesores prestarán al Defensor del Pueblo y a los Adjuntos: → ${R('la cooperación técnico-jurídica necesaria para el cumplimiento de sus funciones')}`, 'R14', 'o'),
    hoja(`El presupuesto de la Institución del Defensor del Pueblo se integrará en: → ${R('la sección presupuestaria del presupuesto de las Cortes Generales como un servicio más del mismo')}`, 'R15', 'o')] }]));

v('Artículo 42 — Contratación', plazos('Plazos del Reglamento (resumen)', [
  ['15 días', 'Propuesta de nombramiento de Adjuntos tras la elección (art. 13.2)'],
  ['10 días', 'Los Adjuntos deben cesar en toda incompatibilidad desde su nombramiento y antes de tomar posesión (art. 15.1)'],
  ['4 años', `Vocales del Consejo Asesor, renovados ${R('por mitades cada dos')} (art. 20.1) · candidaturas: ${R('15 días naturales')} desde la convocatoria (art. 20.2)`],
  ['2 veces / año', 'Reuniones mínimas del Consejo Asesor (art. 21.1) · máximo 10 Vocales (art. 19.2)'],
  ['2 meses · 6 meses · 1 año', 'Prescripción de las faltas leves · graves · muy graves, y mismos plazos para las sanciones (art. 36.3)'],
  ['6 meses a 6 años', 'Sanción de las faltas muy graves (art. 37.1.c) · graves: hasta 6 meses · leves: 1 a 10 días']]));

// ---------------------------------------------------------------- Esquemas de las listas y plazos del Reglamento (25/10/2026: sin-esquema.js 14 = 0)
v('Artículo 8 — Competencias del Defensor del Pueblo', arbol('Competencias del Defensor del Pueblo (art. 8) · además de las básicas de la Ley Orgánica', `${D('Defensor del Pueblo')}`, [
  { t: 'Representación y relaciones', sub: [`${R('Representar')} a la Institución`, `${R('Proponer a los Adjuntos')} (conformidad previa de la Comisión Mixta Congreso-Senado para nombramiento y cese)`, 'Relación directa con las Cortes Generales (Presidente del Congreso; ambas Cámaras: sus Presidentes)', 'Relación directa con el Presidente y Vicepresidentes del Gobierno, Ministros y Secretarios de Estado, Delegados del Gobierno en las CCAA', 'Relación directa con el Tribunal Constitucional y el CGPJ (a través de sus Presidentes) y con el Fiscal General del Estado', 'Relación directa con los Presidentes de los Consejos Ejecutivos de las CCAA y con los órganos similares al Defensor'] },
  { t: 'Mecanismo Nacional de Prevención y Junta', sub: [`${D('Designar')} al Presidente del Consejo Asesor, de entre sus Adjuntos, y a los Vocales`, `${D('Convocar y fijar el orden del día')} de la Junta de Coordinación y Régimen Interior y dirigir sus deliberaciones`] },
  { t: 'Personal y presupuesto', sub: ['Establecer la plantilla y proceder al nombramiento y cese del Secretario General y del personal', `${D('Aprobar')} el proyecto de presupuesto (de acuerdo con las directrices de las Mesas del Congreso y del Senado) y acordar su remisión al Presidente del Congreso`, `${D('Fijar')} las directrices para la ejecución del presupuesto`, `${R('Ejercer la potestad disciplinaria')}`, 'Aprobar las bases de selección de personal y de contratación de obras y suministros (arts. 31 y 42)', 'Aprobar las instrucciones de orden interno y supervisar el funcionamiento de la Institución'] }]));

v('Artículo 12 — Competencias de los Adjuntos', arbol('Competencias de los Adjuntos (art. 12.1)', `${D('Adjuntos')} del Defensor del Pueblo`, [
  `${R('Ejercitar')} las funciones del Defensor en los casos de ${R('delegación y sustitución')} previstos en la Ley Orgánica`,
  `${R('Dirigir la tramitación, comprobación e investigación')} de las quejas y de las actuaciones de oficio (admisión a trámite o rechazo y resoluciones)`,
  `${D('Colaborar')} con el Defensor en las relaciones con las Cortes Generales y la Comisión Mixta y en la coordinación con los órganos similares de las CCAA`,
  `${D('Colaborar')} con el Defensor en el ejercicio de sus funciones como Mecanismo Nacional de Prevención`,
  `${D('Preparar y proponer')} el borrador del informe anual y de los demás informes que deban elevarse a las Cortes Generales y al Subcomité para la Prevención de la Tortura`,
  'Asumir las restantes funciones que se les encomienden en las leyes y disposiciones reglamentarias']));

v('Artículo 16 — Cese de los Adjuntos', arbol('Causas de cese de los Adjuntos (art. 16.1)', `${D('Los Adjuntos cesarán')} por`, [
  `${R('Renuncia')}`, `${R('Expiración del plazo')} de su nombramiento`, `${R('Muerte')} o ${R('incapacidad sobrevenida')}`,
  `${R('Notoria negligencia')} en el cumplimiento de sus obligaciones y deberes (propuesta razonada del Defensor, aprobada por la Comisión Mixta Congreso-Senado con el mismo procedimiento y mayoría que para otorgar la conformidad previa, con audiencia del interesado)`,
  `Haber sido ${R('condenado')}, mediante sentencia firme, por ${R('delito doloso')}`,
  `El cese se publica en el ${D('BOE')} y en los diarios de sesiones de ambas Cámaras (art. 16.2)`]));

v('Artículo 18 — Competencias de la Junta', arbol('Competencias de la Junta de Coordinación y Régimen Interior (art. 18.1)', `${D('Junta de Coordinación y Régimen Interior')}`, [
  { t: 'Informa', sub: ['Plantilla y nombramiento y cese del personal (a)', 'Candidaturas a Vocales del Consejo Asesor del MNP (i)', 'Proyecto de reforma del Reglamento (j)', `Asuntos de elaboración del proyecto de presupuesto, su ejecución y su liquidación, antes de remitirlo a las Cortes (c)`] },
  { t: 'Conoce', sub: ['Posible interposición de recursos de amparo e inconstitucionalidad (b)', 'Proyectos de informes que deban elevarse a las Cortes y al Subcomité (g)', 'Nombramiento y cese del Secretario General (h)'] },
  { t: 'Delibera, asiste y coopera', sub: ['Propuestas de obras, servicios y suministros (d)', 'Asiste al Defensor en sus competencias de personal y económico-financieras (e)', 'Coopera con el Defensor en la coordinación de las distintas áreas (f)', 'Asesora al Defensor sobre las cuestiones que someta a su consideración (k)'] },
  `Sesiones (18.2): pueden asistir, debidamente convocados, ${R('los responsables de área')} y otras personas que el Defensor considere oportunas · el orden del día se comunica a todos los componentes (18.3)`]));

v('Artículo 23 — Competencias del Secretario General', arbol('Competencias del Secretario General (art. 23.1)', `${D('Secretario General')}`, [
  `${R('Gobierno y régimen disciplinario')} de todo el personal (salvo lo atribuido al Defensor, los Adjuntos o la Junta)`,
  `${D('Dirigir')} los servicios dependientes de la Secretaría General`,
  `${D('Preparar y presentar')} a la Junta las propuestas de selección de los Asesores y demás personal`,
  `${D('Preparar y elevar')} a la Junta el ${R('anteproyecto de presupuesto')}`,
  `${D('Administrar')} los créditos para gastos del Presupuesto del Defensor del Pueblo`,
  `${D('Redactar')} las actas y notificar los acuerdos de la Junta`,
  `${D('Convocar')}, por indicación del Presidente, el Consejo Asesor del MNP y levantar acta de sus reuniones`,
  `En caso de vacante, ausencia o enfermedad: sustituido interinamente por el ${R('Director que designe el Defensor')}, oída la Junta (23.2)`]));

v('Artículo 25 — Servicio de Régimen Económico', arbol('Servicio de Régimen Económico (art. 25)', `${D('Servicio de Régimen Económico')}: tres unidades`, [
  `${R('Sección de Asuntos Económicos y Contabilidad')}`, `${R('Sección de Habilitación')}`, `${R('Sección de Personal y Asuntos Generales')}`]));

v('Artículo 19 — Consejo Asesor del MNP', arbol('Composición del Consejo Asesor del MNP (art. 19)', `${D('Consejo Asesor')}: órgano de ${R('cooperación técnica y jurídica')} del Mecanismo Nacional de Prevención`, [
  `${R('Los Adjuntos')} del Defensor del Pueblo, como ${R('miembros natos')}`, `Además, un ${R('máximo de 10 Vocales')} (mayores de edad, en pleno disfrute de sus derechos civiles y políticos, con reconocida trayectoria en la defensa de los Derechos Humanos)`,
  { t: 'Designación de los Vocales (19.5)', sub: ['Un Vocal a propuesta del Consejo General de la Abogacía de España', 'Un Vocal a propuesta de la Organización Médica Colegial', 'Un Vocal a propuesta del Consejo General de Colegios Oficiales de Psicólogos de España', `${R('Hasta dos')} Vocales a propuesta conjunta de los organismos con convenios de colaboración con el Defensor (no más de un representante por entidad)`, `${R('Cinco')} Vocales elegidos de entre las candidaturas presentadas al Defensor del Pueblo (a título personal o en representación de la sociedad civil)`] },
  `El Adjunto en el que el Defensor delegue las funciones del MNP ${D('asume la presidencia')} (sustituido por el otro Adjunto en caso de ausencia o vacante) · actúa como secretario el ${D('Secretario General')}`]));

v('Artículo 20 — Designación de los Vocales', plazos('Plazos del Consejo Asesor (art. 20)', [
  ['4 años', `Mandato de los Vocales, ${R('renovados por mitades cada dos')}`],
  ['15 días naturales', `Para presentar candidaturas desde la publicación de la convocatoria pública`],
  ['Hasta la designación', 'Los Vocales cesantes continúan ejerciendo sus funciones hasta que se designe a los nuevos']]));

v('Artículo 36 — Faltas y prescripción', plazos('Prescripción de las faltas y de las sanciones (art. 36)', [
  ['2 meses', `${R('Faltas leves')}`], ['6 meses', `${R('Faltas graves')}`], ['1 año', `${R('Faltas muy graves')}`],
  ['Cómputo', 'Las faltas, desde que se cometieron; las sanciones, desde el día en que adquirió firmeza la resolución o se quebrantó su cumplimiento']]));

v('Artículo 37 — Sanciones', plazos('Sanciones por faltas del personal (art. 37.1)', [
  ['1 a 10 días', `${R('Falta leve')}: apercibimiento o suspensión de empleo y remuneración`],
  ['Hasta 6 meses', `${R('Falta grave')}: suspensión de empleo y remuneración`],
  ['6 meses a 6 años', `${R('Falta muy grave')}: suspensión de empleo y remuneración o separación del servicio`]]));

// Exportado para el ⚡ Exprés (expres-t14.js); ejecutado directamente, inserta los cuadros en el esquema normal
module.exports = V;
if (require.main === module) L.inserta(14, V);
