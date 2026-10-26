// Tema 15 · preguntas oficiales sobre normas DEROGADAS (NTF 12/2022, Instrucción 4/2019, NTF 1/2019) reescritas a la norma vigente
// (Instrucción 1/2025 SES y NTF-2/2025 GC), pauta del usuario 26/10/2026. Devuelve entradas [id, fn(q) → [cita, nota, modo]].
// modo 'img' = cita leída en la imagen de MI PDF (la NTF-2/2025 solo la trae mi PDF y su OCR es ilegible en esos párrafos).
module.exports = ({ O }) => {
  const I = 'Instrucción 1/2025, de la Secretaría de Estado de Seguridad (Protocolo para la valoración y gestión policial del nivel de riesgo, VioGén-2). ';
  const N = 'Norma Técnica de Funcionamiento NTF-2/2025 de la Guardia Civil, procedimiento de actuación de las Unidades en materia de violencia de género. ';
  const set = (q, pregunta, ops, c) => { q.pregunta = pregunta; q.opciones = ops; q.correcta = c; };
  const MAX = 'Siempre que se tenga conocimiento de un delito de violencia de género, la actividad policial se dirigirá a investigar los hechos y elaborar el correspondiente atestado, así como a obtener la información necesaria para el correcto cumplimiento de lo requerido en este Protocolo, especialmente en lo referido al conocimiento sobre';
  const ANEXO_PSP = 'Prepara una habitación segura en casa, preferiblemente con cerradura y un teléfono, y enséñales a refugiarse allí ante un episodio violento';
  return [
    // ---------- NTF 12/2022 → NTF-2/2025 / Instrucción 1/2025 ----------
    ['15-18', q => { set(q, I + 'Alta de un Caso en el Sistema VioGén-2. Durante el proceso de recepción de la denuncia de un posible delito de violencia de género, preferiblemente tras la identificación de la víctima o víctimas y del agresor, la consulta al Sistema VioGén-2 para determinar si constan en algún Caso previo:', [
        'Será facultativa y se realizará solo si la víctima presenta denuncia formal.',
        'Será preceptiva y permitirá determinar si constan, de forma conjunta o separada, en algún Caso previo.',
        'Será facultativa y se realizará únicamente cuando exista orden de protección.',
        'Será preceptiva, pero solo respecto del agresor y no de la víctima.'], 1);
      return ['será preceptiva la consulta al Sistema VioGén-2 para determinar si constan, de forma conjunta o separada, en algún Caso previo', null]; }],
    ['15-20', q => { set(q, N + 'Equipos VIOGEN. ¿A quién le corresponde establecer y mantener canales de comunicación directos con colectivos o grupos de interés en relación con la violencia de género dentro de su ámbito territorial de responsabilidad?', [
        'A las Unidades de Seguridad Ciudadana (Puestos).', 'A los Equipos VIOGEN.', 'A las Unidades de Investigación de las Comandancias.', 'A las Unidades Orgánicas de Policía Judicial (UOPJ).'], 1);
      return ['Establecerán y mantendrán canales de comunicación directos con colectivos o grupos de interés en relación con la violencia de género dentro de su ámbito territorial de responsabilidad', null, 'img']; }],
    ['15-30', q => { set(q, N + 'Secuencia genérica de actuaciones en un hecho relativo a violencia de género. Señale la opción INCORRECTA:', [
        'Recoger la manifestación de los agentes policiales que hayan intervenido en auxilio de la víctima.',
        'Realizar la identificación, localización y toma de manifestación de otras posibles víctimas, concretando la composición del núcleo familiar. En el caso de que existan hijos menores de edad, es innecesario determinar si han sido víctimas de violencia o si han presenciado la violencia ejercida sobre la madre.',
        'Realizar la localización, identificación y declaración de los testigos sobre los hechos investigados y posibles episodios anteriores.',
        'Incluir en diligencias los antecedentes del agresor y de la víctima.'], 1);
      return ['Realizar la identificación, localización y toma de manifestación de otras posibles víctimas, concretando la composición del núcleo familiar', 'En el caso de hijos menores es necesario determinar si han sido víctimas o han presenciado la violencia sobre la madre.', 'img']; }],
    ['15-32', q => { set(q, N + 'Equipos VIOGEN. ¿Quién asesorará y supervisará las actuaciones realizadas por el resto de componentes de Seguridad Ciudadana en materia de violencia de género, ampliando en caso necesario las diligencias oportunas?', [
        'Las Unidades de Investigación de las Comandancias.', 'Los Jefes Orgánicos de Policía Judicial (JOPJ).', 'Las Unidades de Seguridad Ciudadana (del Puesto).', 'Los Equipos VIOGEN.'], 3);
      return ['Asesorarán y supervisarán las actuaciones realizadas por el resto de componentes de Seguridad Ciudadana en esta materia, ampliando en caso necesario las diligencias oportunas', null, 'img']; }],
    ['15-34', q => { q.pregunta = N + 'Procedimiento de actuación. Se procederá a la retirada cautelar de armas del agresor e incautación de instrumentos peligrosos que tenga en su poder, dejando constancia por diligencia en el atestado, quedando a disposición de la Autoridad Judicial:'; q.correcta = 3;
      return ['quedando a disposición de la Autoridad Judicial, en la Intervención de Armas y Explosivos correspondiente', null, 'img']; }],
    ['15-44', q => { set(q, I + 'Estimación inicial de la situación de riesgo (VPR). Señale la opción INCORRECTA:', [
        'La primera valoración policial del riesgo será realizada por el personal policial que instruya las diligencias y se ocupe de las primeras investigaciones.',
        'El Formulario VPR lo cumplimentará directamente el personal policial actuante, nunca la víctima ni otros implicados, y sólo cuando se recoja información suficiente y contrastada de todas las fuentes disponibles sobre el supuesto concreto.',
        'Para esta primera evaluación, tras el Alta de Caso, las personas evaluadoras utilizarán el Formulario de Valoración Policial del Riesgo (VPR).',
        'El Formulario VPR lo cumplimentará la víctima, asistida por el personal policial actuante, cuando se recoja información suficiente sobre el supuesto concreto.'], 3);
      return ['El Formulario VPR lo cumplimentará directamente el personal policial actuante, nunca la víctima ni otros implicados', 'La víctima nunca cumplimenta el formulario.']; }],
    ['15-52', q => { set(q, I + 'Alta de un Caso en el Sistema VioGén-2. Si en el proceso de Alta de los datos de la víctima y del autor, ambos estuvieran previamente en el Sistema en el contexto de un mismo Caso (víctima y agresor coinciden), se procederá:', [
        'A la actualización de éste.', 'Al cierre del Caso anterior y al Alta de uno nuevo.', 'Al Alta de un Caso nuevo.', 'Todas son correctas.'], 0);
      return ['Si en el proceso de Alta de los datos de la víctima y del autor, ambos estuvieran previamente en el Sistema en el contexto de un mismo Caso (víctima y agresor coinciden), se procederá a la actualización de éste', null]; }],
    ['15-56', q => { q.pregunta = I + 'Anexo II, medidas de protección en función del nivel de riesgo. ¿En qué nivel de riesgo viene reflejada específicamente la siguiente medida: "comprobación periódica del cumplimiento por el autor de las medidas judiciales de protección impuestas"?'; q.correcta = 0;
      return ['Comprobación periódica del cumplimiento por el autor de las medidas judiciales de protección impuestas', 'Figura en el nivel Medio, dentro de las medidas «para el autor» (de tipo operativo).']; }],
    ['15-57', q => { set(q, I + 'Situación de los Casos en el Sistema VioGén-2. Los Casos pueden encontrarse en alguna de estas situaciones:', [
        '«Inactivos», aquellos sometidos a control policial directo.',
        '«Activos», aquellos bajo seguimiento y control policial directo, siendo de aplicación las medidas policiales de protección correspondientes al nivel de riesgo y Plan de Seguridad Personalizado.',
        'A y B son correctas.', 'Todas son incorrectas.'], 1);
      return ['CASOS ACTIVOS: Aquellos bajo seguimiento y control policial directo, siendo de aplicación las medidas policiales de protección correspondientes al nivel de riesgo y Plan de Seguridad Personalizado', 'Los Casos Inactivos son los que ya no precisan control policial directo.']; }],
    ['15-116', q => { set(q, I + 'Anexo II, medidas de protección en función del nivel de riesgo. La medida «entrevista personal con la víctima» corresponde, entre las medidas para la víctima, al nivel de riesgo:', [
        'Bajo.', 'Medio.', 'Alto.', 'Extremo.'], 1);
      return ['MEDIO PARA LA VÍCTIMA: - Entrevista personal con la víctima', null]; }],
    ['15-118', q => { set(q, N + 'Cometidos del PAE provincial (Área de Personas-Sección de Investigación). Asumirá las funciones de PAE comarcal cuando:', [
        'Se produzca un cese de las acciones graves (atestado o investigación).',
        'Así se establezca por necesidades derivadas de la ausencia de personal.',
        'Se presenten en los hechos dificultades o den lugar a repercusión social que dificulten su atención por los Equipos territoriales.',
        'Todas son correctas.'], 1);
      return ['Asumir las funciones de PAE comarcal cuando así se establezca por necesidades derivadas de la ausencia de personal', null, 'img']; }],
    ['15-121', q => { q.pregunta = 'Ley Orgánica 1/2004, de 28 de diciembre, de Medidas de Protección Integral contra la Violencia de Género. Derechos laborales y de Seguridad Social. Si se trata de una trabajadora por cuenta propia, en el caso de cese en su actividad para hacer efectiva su protección o su derecho a la asistencia social integral, se le suspenderá su obligación de cotizar durante un período de ___________, que le será considerado como de cotización efectiva a efectos de las prestaciones de Seguridad Social.'; q.correcta = 1;
      return ['durante un período de seis meses, que le será considerado como de cotización efectiva', null, 'img']; }],
    ['15-156', q => { O(q, 0, 'Los servicios sanitarios.'); q.pregunta = 'Ley Orgánica 1/2004, de 28 de diciembre, de Medidas de Protección Integral contra la Violencia de Género. Derecho a la asistencia social integral. Estos servicios actuarán coordinadamente y en colaboración con (señale la INCORRECTA):'; q.correcta = 3;
      return ['Estos servicios actuarán coordinadamente y en colaboración con los Cuerpos de Seguridad, los Juzgados de Violencia sobre la Mujer, los servicios sanitarios y las instituciones encargadas de prestar asistencia jurídica a las víctimas del ámbito geográfico correspondiente', 'Los «servicios normativos» no existen en la lista.']; }],
    ['15-183', q => { q.pregunta = N + 'Puntos de Atención Especializada (PAEs). La composición y despliegue de los PAEs será la que en cada momento se establezca por:'; q.correcta = 1;
      return ['La composición y despliegue de los PAEs será la que en cada momento se establezca por la Jefatura de Policía Judicial (JPJ)', null, 'img']; }],
    ['15-186', q => { set(q, I + 'Proceso de gestión de la seguridad y Plan de Seguridad Personalizado (PSP). Con ocasión de la ______ realizada por el personal policial especializado, o antes si dicho personal lo considera más adecuado, se acordará con la víctima un Plan de Seguridad Personalizado.', [
        'primera VPR', 'primera VPER', 'segunda VPR', 'segunda VPER'], 1);
      return ['Con ocasión de la primera VPER realizada por el personal policial especializado, o antes si dicho personal lo considera más adecuado, se acordará con la víctima un Plan de Seguridad', null]; }],
    ['15-189', q => { q.pregunta = N + 'Organización del servicio y cometidos. Señale la INCORRECTA.'; q.correcta = 1;
      return ['Este ámbito delictivo afecta al conjunto de Unidades, tanto a las que realizan cometidos de seguridad ciudadana como a las dedicadas a la investigación criminal', 'No afecta «sólo» a las unidades de seguridad ciudadana.', 'img']; }],
    ['15-191', q => { O(q, 2, 'En caso de lesiones, siempre que no lo haya hecho el médico forense, se realizará con el consentimiento previo de la víctima un reportaje fotográfico y/o videográfico que refleje las heridas y cualquiera otros signos físicos que presente.'); q.pregunta = N + 'Inicio rápido de la investigación y recogida de pruebas. Señale la INCORRECTA.'; q.correcta = 1;
      return ['Se realizará la inspección ocular solicitando, si es preciso, el apoyo de Unidades de Investigación y se utilizarán los medios técnicos convenientes que permitan a la Autoridad Judicial una mayor inmediatez en la apreciación de los hechos', 'La inspección ocular se «realiza», no se «finaliza».', 'img']; }],
    ['15-198', q => { q.pregunta = N + 'El Protocolo de actuación ante situaciones de violencia sobre la mujer que afecten a personal de la Guardia Civil, en vigor desde el 6 de julio de 2021, establece medidas dirigidas a:'; q.correcta = 3;
      return ['el Protocolo de actuación ante situaciones de violencia sobre la mujer que afecten a personal de la Guardia Civil, en vigor desde el 6 de julio de 2021, establece medidas dirigidas a prevenir, detectar y erradicar posibles situaciones de violencia sobre la mujer en la Guardia Civil, fijar las actuaciones efectivas en caso de que se produzcan y facilitar la protección, asistencia y recuperación de la víctima', null, 'img']; }],
    ['15-221', q => { q.pregunta = I + 'Reglas de inactivación excepcional de Casos. Con independencia del nivel de riesgo, un Caso se podrá inactivar por un período de tiempo variable cuando concurra alguna circunstancia que imposibilite o haga innecesaria la protección de una víctima y/o impida de forma efectiva una nueva agresión, tal como la no localización de la víctima durante, al menos, ______ desde el último contacto con ésta, a pesar de realizar las oportunas gestiones para averiguar su paradero.';
      q.opciones = ['Un mes.', 'Quince días.', 'Tres meses.', 'Diez días.']; q.correcta = 2;
      return ['No localización de la víctima durante, al menos, tres meses desde el último contacto con ésta, a pesar de realizar las oportunas gestiones para averiguar su paradero', 'Con la Instrucción 1/2025 el plazo mínimo es de tres meses (no dos).']; }],
    ['15-222', q => { q.pregunta = I + 'Gestión de los Casos en el Sistema VioGén-2. Señale la INCORRECTA:'; q.correcta = 0;
      return ['Cuando se produzca un homicidio o tentativa de homicidio en el marco de un caso de violencia de género, la unidad central especializada correspondiente incorporará al Sistema VioGén-2, tan pronto como sea posible, el Informe relativo al Caso con toda la información recopilada y analizada', 'En los casos de homicidio no son las Unidades Territoriales y de Policía Judicial las que dan de alta el Caso: lo hace la unidad central especializada / Administración Central del Sistema.']; }],
    ['15-224', q => { set(q, I + 'Protocolo Cero. Siempre que se tenga conocimiento de un delito de violencia de género, la actividad policial se dirigirá a investigar los hechos y elaborar el atestado, especialmente en lo referido al conocimiento sobre:', [
        'Los factores referidos a la violencia sufrida por la víctima, únicamente en el episodio actual.',
        'Las circunstancias personales, familiares, sociales, económicas y laborales de la víctima.',
        'Solo las relaciones actuales mantenidas por la víctima con el agresor.',
        'La retirada de denuncias, reanudación de la convivencia y/o desistimiento o renuncia del agresor a su defensa jurídica.'], 1);
      return ['g. Las circunstancias personales, familiares, sociales, económicas y laborales de la víctima', null]; }],
    ['15-228', q => { q.pregunta = N + '¿Desde qué año está en vigor el Plan de Acción de la Guardia Civil contra la Violencia sobre la Mujer?'; q.opciones = ['Desde 2020.', 'Desde 2021.', 'Desde 2016.', 'Desde 2018.']; q.correcta = 0;
      return ['Plan de Acción de la Guardia Civil contra la Violencia sobre la Mujer, en vigor desde el 23 de noviembre de 2020', null, 'img']; }],
    ['15-232', q => { q.pregunta = N + 'Procedimiento de actuación. En caso de negativa del agresor a entregar las armas, se comunicará inmediatamente:'; q.opciones = ['A la Intervención de Armas y Explosivos.', 'A la Autoridad Judicial.', 'Al Ministerio Fiscal.', 'A la Jefatura de la Comandancia.']; q.correcta = 1;
      return ['En caso de negativa a entregar las armas, se comunicará inmediatamente a la Autoridad Judicial', null, 'img']; }],
    ['15-238', q => { q.pregunta = N + 'Evaluar las necesidades especiales de protección de la víctima. ¿Quién tiene la obligación de realizar una evaluación y resolución provisional sobre las necesidades de protección de las víctimas y establecer las medidas de protección que deben ser adoptadas para evitar a la víctima perjuicios relevantes que pudieran derivarse del proceso?'; q.correcta = 1;
      return ['Los agentes de la Guardia Civil que actúen en la fase inicial de una investigación tienen obligación de realizar una evaluación y resolución provisional sobre las necesidades de protección de las víctimas', null, 'img']; }],
    ['15-239', q => { q.pregunta = I + 'Gestión de los Casos y niveles de riesgo. Señale la INCORRECTA.'; q.correcta = 1;
      return ['en este Protocolo desaparece el Nivel de riesgo No Apreciado, por lo que los Casos se distribuyen en cuatro niveles de riesgo (Bajo, Medio, Alto y Extremo)', 'Ya no existe el nivel «no apreciado».']; }],
    ['15-241', q => { q.pregunta = N + 'Formación y actualización de los procedimientos. Cada Comandancia organizará, al menos, ______ jornadas de formación al año, dirigidas al personal de Seguridad Ciudadana, en las que se abordarán específicamente los Procedimientos de actuación en materia de violencia de género y sus actualizaciones.'; q.opciones = ['Una', 'Dos', 'Tres', 'Seis']; q.correcta = 1;
      return ['cada Comandancia organizará, al menos, dos jornadas de formación al año', null, 'img']; }],
    ['15-174', q => { q.pregunta = N + 'Formación y actualización de los procedimientos. ¿Cuántas jornadas de formación al año, como mínimo, organizará cada Comandancia, dirigidas al personal de Seguridad Ciudadana, para abordar los Procedimientos de actuación en materia de violencia de género y sus actualizaciones?'; q.opciones = ['Una.', 'Dos.', 'Tres.', 'Cuatro.']; q.correcta = 1;
      return ['cada Comandancia organizará, al menos, dos jornadas de formación al año', null, 'img']; }],
    ['15-264', q => { q.pregunta = N + 'Los Equipos VIOGEN son unidades ______ especializadas en Violencia de Género, creadas a nivel territorial, con una dedicación exclusiva para el seguimiento analítico de los casos de violencia de género.'; q.opciones = ['orgánicas', 'funcionales', 'auxiliares', 'centrales']; q.correcta = 1;
      return ['Estos Equipos son unidades funcionales especializadas en Violencia de Género, creadas a nivel territorial, con una dedicación exclusiva para el seguimiento analítico de los casos de violencia de género', null, 'img']; }],
    ['15-267', q => { q.pregunta = I + 'Estimación inicial de la situación de riesgo. Tras cumplimentar la VPR pertinente, se solicitará a Fiscalía mediante Oficio que valore la idoneidad de instar la adjudicación de un Dispositivo Telemático de Control (DTC), incluyendo la Diligencia automatizada, cuando el Sistema arroje un nivel de riesgo:'; q.correcta = 1;
      return ['si tras cumplimentar la VPR pertinente, el Sistema arroja un nivel de riesgo desde MEDIO con Especial Relevancia, a ALTO o EXTREMO', null, 'img']; }],
    ['15-169', q => { set(q, I + 'Protocolo Cero. Siempre que se tenga conocimiento de un delito de violencia de género, la actividad policial se dirigirá a investigar los hechos y elaborar el atestado, especialmente en lo referido al conocimiento sobre (señale la INCORRECTA):', [
        'La relación víctima-agresor, actual o pasada.',
        'Los antecedentes de todo tipo sobre el autor, especialmente si se trata de agresores persistentes.',
        'Las circunstancias personales, familiares, sociales, económicas y laborales de la víctima.',
        'Los antecedentes de la víctima, con exclusión de los del agresor, que consten en bases de datos policiales.'], 3);
      return ['c. La relación víctima-agresor, actual o pasada. d. Antecedentes sobre la posible victimización de la denunciante sufrida por otros autores en el pasado. e. Los antecedentes de todo tipo sobre el autor, especialmente si se trata de agresores persistentes. f. Los antecedentes y circunstancias de todo tipo referidas al entorno del agresor. g. Las circunstancias personales, familiares, sociales, económicas y laborales de la víctima', null]; }],
    ['15-176', q => { set(q, I + 'Protocolo Cero. Siempre que se tenga conocimiento de un delito de violencia de género, la actividad policial se dirigirá a investigar los hechos y elaborar el atestado, especialmente en lo referido al conocimiento sobre, entre otros, aspectos que NO son:', [
        'La relación víctima-agresor, actual o pasada.',
        'La retirada de las denuncias, reanudación de la convivencia y/o desistimiento o renuncia de la víctima a su protección.',
        'Las circunstancias personales, familiares, sociales, económicas y laborales de la víctima.',
        'Las preferencias políticas y religiosas de la víctima y del agresor.'], 3);
      return ['g. Las circunstancias personales, familiares, sociales, económicas y laborales de la víctima. h. La retirada de las denuncias, reanudación de la convivencia y/o desistimiento o renuncia de la víctima a su protección', null]; }],
    ['15-270', q => { set(q, I + 'Protocolo Cero. Siempre que se tenga conocimiento de un delito de violencia de género, la actividad policial se dirigirá a investigar los hechos y elaborar el atestado, especialmente en lo referido al conocimiento sobre:', [
        'La relación víctima-agresor, actual o pasada.',
        'Los antecedentes de todo tipo sobre el autor, especialmente si se trata de agresores persistentes.',
        'Los antecedentes y circunstancias de todo tipo referidas al entorno del agresor.',
        'Todas son correctas.'], 3);
      return ['c. La relación víctima-agresor, actual o pasada. d. Antecedentes sobre la posible victimización de la denunciante sufrida por otros autores en el pasado. e. Los antecedentes de todo tipo sobre el autor, especialmente si se trata de agresores persistentes. f. Los antecedentes y circunstancias de todo tipo referidas al entorno del agresor', null]; }],
    // ---------- Instrucción 4/2019 → Instrucción 1/2025 ----------
    ['15-27', q => { q.pregunta = I + 'Estimación inicial de la situación de riesgo. Una vez practicada la valoración por medio del Formulario VPR del Caso concreto, ¿quién asignará automáticamente uno de los niveles de riesgo (Bajo, Medio, Alto o Extremo)?'; q.opciones = ['EGO.', 'El agente actuante.', 'El Sistema VioGén-2.', 'El superior jerárquico de los agentes policiales que instruyan las diligencias y se ocupen de las primeras investigaciones.']; q.correcta = 2;
      return ['asignará automáticamente uno de los siguientes niveles de riesgo', null]; }],
    ['15-29', q => { q.pregunta = I + 'Reactivación de Casos. Si una víctima registrada en el Sistema VioGén-2 en situación de Caso Inactivo presenta una nueva denuncia contra el mismo autor, o se constata el quebrantamiento de una Medida o Pena acordada por la Autoridad Judicial, el Caso se Reactivará cumplimentándose una nueva:'; q.opciones = ['VPR.', 'VPRC.', 'VPER-M.', 'VPER-B.']; q.correcta = 0;
      return ['el Caso se Reactivará cumplimentándose una nueva VPR, e informando a la Autoridad Judicial y Fiscal de todas las actuaciones practicadas', null]; }],
    ['15-41', q => { q.pregunta = I + 'Reactivación de Casos. Si una víctima registrada en el Sistema VioGén-2 en situación de Caso Inactivo presenta una nueva denuncia contra el mismo autor:'; q.opciones = ['El Caso se Reactivará cumplimentándose una nueva VPR.', 'Procederá una VPER-R, sin reactivar el Caso.', 'Procederá una VPER-C, sin reactivar el Caso.', 'El Caso permanecerá inactivo hasta nueva resolución judicial.']; q.correcta = 0;
      return ['el Caso se Reactivará cumplimentándose una nueva VPR, e informando a la Autoridad Judicial y Fiscal de todas las actuaciones practicadas', 'Ya no existe la modalidad «VPER-C» ni el plazo de seis meses.']; }],
    ['15-78', q => { q.pregunta = I + 'Estimación inicial de la situación de riesgo. La primera valoración policial del riesgo será realizada por:'; q.correcta = 0;
      return ['La primera valoración policial del riesgo será realizada por el personal policial que instruya las diligencias y se ocupe de las primeras investigaciones', null]; }],
    ['15-92', q => { q.pregunta = I + 'Estimación inicial de la situación de riesgo. De las siguientes opciones marque la afirmación correcta:'; q.correcta = 2;
      return ['La primera valoración policial del riesgo será realizada por el personal policial que instruya las diligencias y se ocupe de las primeras investigaciones', 'En la primera evaluación se utiliza el formulario VPR (no «VFR»).']; }],
    ['15-125', q => { set(q, I + 'Proceso de gestión de la seguridad y Plan de Seguridad Personalizado. Señale la INCORRECTA:', [
        'Solo en los casos de riesgo Extremo se adoptarán medidas policiales para la protección y seguridad de las víctimas, que serán de aplicación obligatoria e inmediata.',
        'Si tras la primera actuación judicial se acordara alguna medida de alejamiento/orden de protección, esta será comunicada expresamente tanto a la víctima como al autor.',
        'La comunicación policial incluirá la explicación concreta de la medida acordada, el alcance y las consecuencias de su quebrantamiento.',
        'Con ocasión de la primera VPER realizada por el personal policial especializado, o antes si dicho personal lo considera más adecuado, se acordará con la víctima un Plan de Seguridad Personalizado.'], 0);
      return ['Cada uno de los niveles de riesgo llevará aparejado medidas policiales para la protección y seguridad de las víctimas que serán de aplicación obligatoria e inmediata', 'Todos los niveles de riesgo llevan medidas de aplicación obligatoria e inmediata.']; }],
    ['15-131', q => { set(q, 'Plan de Seguridad Personalizado (Anexo III de la Instrucción 1/2025). Medidas de protección a menores hasta 11 años, plan de seguridad. Indique la INCORRECTA:', [
        'Prepara una habitación segura en casa, preferiblemente con cerradura y un teléfono, y enséñales a refugiarse allí ante un episodio violento.',
        'Enséñales a pulsar la señal de emergencia (AlertCops) desde los dispositivos a su alcance.',
        'Acuerda con el menor y las personas de confianza una palabra clave de seguridad (o gesto), por ejemplo «rojo».',
        'Enseña a los menores a no pedir ayuda a las personas de vuestro Círculo de Fortaleza ni a llamar a los servicios de emergencia.'], 3);
      return [ANEXO_PSP, 'Los menores deben aprender a pedir ayuda y a llamar a emergencias.']; }],
    ['15-133', q => { q.pregunta = I + 'Estimación inicial de la situación de riesgo. Para esta primera evaluación, tras el Alta de Caso, las personas evaluadoras utilizarán:'; q.correcta = 1;
      return ['Para esta primera evaluación, tras el Alta de Caso, las personas evaluadoras utilizarán el Formulario de Valoración Policial del Riesgo (VPR)', null]; }],
    ['15-139', q => { q.pregunta = I + 'Evolución del nivel de riesgo. El seguimiento de la evolución de los Casos para evaluar periódicamente el nivel de riesgo se realizará con el Formulario:'; q.opciones = ['VPR Básico.', 'VPER (Valoración Policial de la Evolución del Riesgo).', 'VPR-H.', 'Todos son correctos.']; q.correcta = 1;
      return ['Formulario VPER (Valoración Policial de la Evolución del Riesgo): Herramienta semiactuarial utilizada en el Sistema VioGén-2 para evaluar periódicamente el nivel de riesgo durante el seguimiento de un Caso', null]; }],
    // ---------- NTF 1/2019 → Instrucción 1/2025 ----------
    ['15-87', q => { q.pregunta = I + 'Anexo II, medidas de protección en función del nivel de riesgo. La medida «vigilancia ocasional y aleatoria de la víctima en domicilio, lugar de trabajo y centros escolares de los menores en horarios de entrada y salida» corresponde al nivel de riesgo:'; q.opciones = ['Alto.', 'Extremo.', 'Bajo.', 'Medio.']; q.correcta = 3;
      return ['MEDIO PARA LA VÍCTIMA: - Entrevista personal con la víctima. - Si procede, efectuar traslado de la víctima para su ingreso en un centro de acogida. - Vigilancia ocasional y aleatoria de la víctima en domicilio, lugar de trabajo y centros escolares de los menores en horarios de entrada y salida', null]; }],
    ['15-100', q => { set(q, I + 'Anexo II, medidas de protección en función del nivel de riesgo. ¿Cuál de las siguientes medidas NO corresponde al nivel de riesgo Medio?', [
        'Control intensivo de los movimientos del autor hasta que este deje de ser una amenaza inminente para la seguridad de la víctima.',
        'Comprobación periódica del cumplimiento por el autor de las medidas judiciales de protección impuestas.',
        'Vigilancia ocasional y aleatoria de la víctima en domicilio, lugar de trabajo y centros escolares de los menores en horarios de entrada y salida.',
        'Comunicación/entrevista con el autor durante permisos penitenciarios y/o excarcelaciones para informarle de que su Caso se encuentra sometido a control/protección policial.'], 0);
      return ['PARA EL AUTOR: - Control intensivo de los movimientos del autor hasta que este deje de ser una amenaza inminente para la seguridad de la víctima', 'Es una medida del nivel Extremo.']; }],
  ];
};
