// Tema 15 · lote 2 de la auditoría de oficiales (26/10/2026): opciones con texto alterado, respuestas mal marcadas, normas derogadas.
module.exports = ({ O }) => {
  const LO = 'Ley Orgánica 1/2004, de 28 de diciembre, de Medidas de Protección Integral contra la Violencia de Género. ';
  const I = 'Instrucción 1/2025, de la Secretaría de Estado de Seguridad (Protocolo VioGén-2). ';
  const N = 'Norma Técnica de Funcionamiento NTF-2/2025 de la Guardia Civil, procedimiento de actuación de las Unidades en materia de violencia de género. ';
  const set = (q, pregunta, ops, c) => { if (pregunta) q.pregunta = pregunta; q.opciones = ops; q.correcta = c; };
  const PLAN_A = 'Que introduzca en el escenario social las nuevas escalas de valores basadas en el respeto de los derechos y libertades fundamentales y de la igualdad entre hombres y mujeres, así como en el ejercicio de la tolerancia y de la libertad dentro de los principios democráticos de convivencia, todo ello desde la perspectiva de las relaciones de género.';
  const PLAN_B = 'Dirigido tanto a hombres como a mujeres, desde un trabajo comunitario e intercultural, incluyendo el ámbito de las tecnologías de la información y el digital.';
  const PLAN_C = 'Que contemple un amplio programa de formación complementaria y de reciclaje de los profesionales que intervienen en estas situaciones.';
  const PLAN_D = 'Controlado por una Comisión de amplia participación, que se creará en un plazo máximo de un mes, en la que se ha de asegurar la presencia de las víctimas y su entorno, las instituciones, los profesionales y de personas de reconocido prestigio social relacionado con el tratamiento de estos temas';
  const CITA_PLAN = 'd) Controlado por una Comisión de amplia participación, que se creará en un plazo máximo de un mes';
  return [
    ['15-21', q => { set(q, LO + 'Principios rectores. A través de esta Ley se articula un conjunto integral de medidas encaminadas a alcanzar determinados fines, entre los que se encuentra fortalecer las medidas de sensibilización ciudadana y de prevención, dotando a los poderes públicos de instrumentos eficaces en el ámbito (señale la INCORRECTA):', ['Educativo.', 'Servicios sociales.', 'Sanitario.', 'Policial/militar.'], 3);
      return ['a) Fortalecer las medidas de sensibilización ciudadana de prevención, dotando a los poderes públicos de instrumentos eficaces en el ámbito educativo, servicios sociales, sanitario, publicitario y mediático', 'El ámbito «policial/militar» no figura.']; }],
    ['15-36', q => { set(q, N + 'Puntos de Atención Especializada (PAEs), cometidos del PAE comarcal. Se consideran casos complejos los siguientes (señale la opción INCORRECTA):', [
        'Aquéllos en los que la víctima y/o el autor sean componentes de las Fuerzas y Cuerpos de Seguridad o de Fuerzas Armadas.',
        'Aquéllos en los que estén implicados los hijos menores convivientes, o las víctimas sean menores de edad, presenten discapacidad intelectual, trastorno psiquiátrico, o cualquier otra circunstancia que las haga especialmente vulnerables.',
        'Aquéllos en los que el autor presente discapacidad intelectual, trastorno psiquiátrico o cualquier otra circunstancia que haga conveniente la intervención de estos especialistas.',
        'Aquéllos en los que se han producido lesiones graves a la víctima, así como tentativas de homicidio.'], 3);
      return ['Aquéllos en los que la víctima y/o el autor sean componentes de las Fuerzas y Cuerpos de Seguridad o de Fuerzas Armadas', 'La D define los casos «graves», no los complejos.', 'img']; }],
    ['15-47', q => { O(q, 0, PLAN_A); O(q, 1, PLAN_B); O(q, 2, PLAN_C); q.correcta = 3;
      return [CITA_PLAN, 'El plazo es de un mes, no de seis.']; }],
    ['15-181', q => { set(q, LO + 'Medidas de sensibilización, prevención y detección. Planes de sensibilización. Se pondrá en marcha un Plan Estatal de Sensibilización y Prevención de la Violencia de Género que (señale la INCORRECTA):', [
        'Esté dirigido contra los hombres y no contra las mujeres, desde un trabajo comunitario e intercultural.', PLAN_C, PLAN_A, PLAN_D + '.'], 0);
      return [PLAN_B.replace(/\.$/, ''), 'Debe dirigirse tanto a hombres como a mujeres.']; }],
    ['15-244', q => { O(q, 1, 'Por esta Ley se establecen medidas de protección integral cuya finalidad es prevenir, sancionar y erradicar esta violencia y prestar asistencia a las mujeres, a sus hijos menores y a los menores sujetos a su tutela, o guarda y custodia, víctimas de esta violencia.');
      O(q, 3, 'La violencia de género a que se refiere esta Ley también comprende la violencia que con el objetivo de causar perjuicio o daño a las mujeres se ejerza sobre sus familiares o allegados menores de edad por parte de las personas indicadas en el apartado primero.'); q.correcta = 2;
      return ['La violencia de género a que se refiere esta Ley también comprende la violencia que con el objetivo de causar perjuicio o daño a las mujeres se ejerza sobre sus familiares o allegados menores de edad por parte de las personas indicadas en el apartado primero', 'La Ley sí comprende esa violencia (la C afirma lo contrario).']; }],
    ['15-251', q => { q.correcta = 2; return ['que deberán implicar a las administraciones sanitarias, la Administración de Justicia, las Fuerzas y Cuerpos de Seguridad y los servicios sociales y organismos de igualdad', 'Se implica a las administraciones sanitarias, no a las educativas.']; }],
    ['15-266', q => { O(q, 3, 'La Educación Primaria contribuirá a desarrollar en el alumnado su capacidad para adquirir habilidades en la resolución pacífica de conflictos y para comprender y respetar la igualdad entre sexos.'); q.correcta = 2;
      return ['4. La Educación Secundaria Obligatoria contribuirá a desarrollar en el alumnado la capacidad para relacionarse con los demás de forma pacífica y para conocer, valorar y respetar la igualdad de oportunidades de hombres y mujeres', 'La «madurez personal, social y moral» corresponde al Bachillerato y la Formación Profesional.']; }],
    ['15-64', q => { O(q, 3, 'Multidisciplinariedad profesional.'); q.correcta = 1;
      return ['responderá a los principios de atención permanente, actuación urgente, especialización de prestaciones y multidisciplinariedad profesional', '«Disminución asistida» no es un principio.']; }],
    ['15-74', q => { set(q, I + 'Estimación inicial de la situación de riesgo (VPR) y gestión del Caso. Señale la opción INCORRECTA:', [
        'Una vez practicada la valoración por medio del Formulario VPR del Caso concreto, el Sistema VioGén-2 asignará automáticamente uno de los siguientes niveles de riesgo: Bajo, Medio, Alto o Extremo.',
        'La Unidad de asignación del Caso se responsabilizará de mantener la información de este debidamente actualizada en el Sistema.',
        'Las medidas se adaptarán a las circunstancias concretas del Caso, de tal manera que sean de aplicación personalizada e individual, y se comunicarán de forma clara a la víctima.',
        'El resultado de la valoración proporcionado por el Sistema VioGén-2 no podrá ser modificado en ningún caso por el personal policial.'], 3);
      return ['El resultado de la valoración proporcionado por el Sistema VioGén-2 podrá ser modificado al alza al final de cada valoración completa', 'Sí puede modificarse al alza.']; }],
    ['15-76', q => { set(q, N + 'Unidades de Seguridad Ciudadana (Puestos). Señale la opción INCORRECTA:', [
        'Proporcionar la primera respuesta, adoptando las medidas necesarias para prestar auxilio a la víctima y garantizar su seguridad.',
        'Hacerse cargo de las actuaciones en los casos no graves (recogida de la denuncia y Valoración Policial del Riesgo), siempre que no se haga cargo el Equipo VIOGEN.',
        'Hacerse cargo de la protección de la víctima, de las actuaciones que procedan con el agresor, así como de vigilar la ejecución de las Medidas Judiciales, en su caso.',
        'Hacerse cargo de las actuaciones en los casos graves.'], 3);
      return ['Hacerse cargo de las actuaciones en los casos no graves', 'Los casos graves los asumen los PAEs, no los Puestos.', 'img']; }],
    ['15-79', q => { q.pregunta = N + 'Formación y actualización de los procedimientos. A nivel nacional, ¿con qué periodicidad convocará la UTPJ las reuniones de coordinación necesarias, con asistencia de Emumes de los PAEs provinciales y comarcales que se determinen, para actualización de los procedimientos técnico-operativos?'; q.opciones = ['Al menos una vez al mes.', 'Al menos una vez cada seis meses.', 'Al menos una vez cada tres meses.', 'Al menos una vez al año.']; q.correcta = 3;
      return ['A nivel nacional, la UTPJ convocará las reuniones de coordinación necesarias, al menos una al año', null, 'img']; }],
    ['15-101', q => { set(q, 'Protocolo de actuación del sistema de seguimiento por medios telemáticos de las prohibiciones de aproximación en materia de violencia de género y violencia sexual. ¿Cuáles de las siguientes se consideran funcionalidades comunes de las unidades RSPT_01?', [
        'Geolocalización GNSS (A-GPS, BeiDou, Galileo, GLONASS, GPS).', 'Bluetooth 2.0.', 'LBS (Location-Based Services) en base a las señales recibidas de Wi-Fi y redes móvil.', 'Las respuestas A y C son correctas.'], 3);
      return ['Geolocalización GNSS (A-GPS, BeiDou, Galileo, GLONASS, GPS) ð· Bluetooth 5.0 ð· LBS (Location-Based Services) en base a las señales recibidas de Wi-Fi y redes móvil', 'El Bluetooth es 5.0.', 'img']; }],
    ['15-159', q => { set(q, null, [
        'Cada set de dispositivos electrónicos permite que un dispositivo de una víctima pueda sincronizarse con dispositivos de varias personas investigadas, encausadas o condenadas; y viceversa.',
        'La distancia de alejamiento aconsejable para que el sistema sea más eficaz debe ser, al menos, de 500 metros.',
        'Las zonas de exclusión fijas ofrecen mayor protección y causan menor victimización secundaria derivada del sistema de alertas y alarmas que las zonas de exclusión móviles.',
        'Todas son correctas.'], 3);
      return ['Cada set de dispositivos electrónicos permite que un dispositivo de una víctima pueda sincronizarse con dispositivos de varias personas investigadas, encausadas o condenadas; y viceversa, permite que un dispositivo de una persona investigada, encausada o condenada, pueda sincronizarse con dispositivos de varias víctimas', 'Las tres son cuestiones de la tecnología que el Protocolo recoge.', 'img']; }],
    ['15-165', q => { q.pregunta = N + 'Jefaturas de Zona. Realizar el seguimiento de la casuística en su territorio y velar por el cumplimiento de la normativa y protocolos de actuación es un cometido de:'; q.correcta = 2;
      return ['Realizar el seguimiento de la casuística en su territorio y velar por el cumplimiento de la normativa y protocolos de actuación', 'Las Comandancias supervisan la actuación de las Unidades subordinadas; el seguimiento en su territorio y el cumplimiento de la normativa es de las Jefaturas de Zona.', 'img']; }],
    ['15-68', q => { q.pregunta = N + 'Jefaturas de Comandancia. ¿Cuál de los siguientes cometidos NO desarrollarán las Jefaturas de Comandancia?'; q.correcta = 0;
      return ['Realizar el seguimiento de la casuística en las demarcaciones y supervisar la actuación de las Unidades subordinadas, impartiendo las instrucciones oportunas que garanticen la correcta aplicación de los protocolos establecidos', 'La opción A es cometido de las Jefaturas de Zona.', 'img']; }],
    ['15-187', q => { q.correcta = 0; return ['La intervención experta, proactiva y rigurosa del personal de FFCCS interviniente es imprescindible durante los procedimientos del Protocolo Cero', null]; }],
    ['15-233', q => { O(q, 3, 'Ninguna de las anteriores es correcta.'); q.correcta = 0;
      return ['adoptará las medidas que procedan para asegurar un tratamiento de la mujer conforme con los principios y valores constitucionales', 'Los principios de la B y la C no son los que cita la Ley.']; }],
    ['15-237', q => { q.correcta = 2; return ['las FFCCSSE favorecerán el conocimiento de este Protocolo a los Cuerpos de Policía Local de su demarcación', null]; }],
    ['15-59', q => { q.pregunta = I + 'Anexo II, medidas de protección en función del nivel de riesgo. ¿En qué nivel de riesgo viene reflejada específicamente la siguiente medida de protección: «si procede, efectuar traslado de la víctima para su ingreso en un centro de acogida»?'; q.correcta = 2;
      return ['MEDIO PARA LA VÍCTIMA: - Entrevista personal con la víctima. - Si procede, efectuar traslado de la víctima para su ingreso en un centro de acogida', 'Figura en el nivel Medio, para la víctima.']; }],
    ['15-55', q => { set(q, LO + 'Principios rectores. A través de esta Ley se articula un conjunto integral de medidas encaminadas a alcanzar los siguientes fines:', [
        'Reforzar hasta la consecución de los mínimos exigidos por los objetivos de la ley los servicios sociales de información, de atención, de emergencia, de apoyo y de recuperación integral, así como establecer un sistema para la más eficaz coordinación de los servicios ya existentes a nivel municipal y autonómico.',
        'Promover la colaboración y participación de las entidades, asociaciones y organizaciones que desde la sociedad civil actúan contra la violencia de género.',
        'Consagrar derechos de las mujeres víctimas de violencia de género, exigibles ante las Administraciones Públicas, y así asegurar un acceso rápido, transparente y eficaz a los servicios establecidos al efecto.',
        'Todas son correctas.'], 3);
      return ['c) Reforzar hasta la consecución de los mínimos exigidos por los objetivos de la ley los servicios sociales de información, de atención, de emergencia, de apoyo y de recuperación integral, así como establecer un sistema para la más eficaz coordinación de los servicios ya existentes a nivel municipal y autonómico', null]; }],
    ['15-89', q => { O(q, 0, 'Sistema interno de intercambio de información.'); O(q, 1, 'Sistema interno de interconexión de información.'); O(q, 2, 'Sistema corporativo de intercambio de información.'); O(q, 3, 'Sistema ágil de intercambio de información.'); q.correcta = 3;
      return ['mediante el establecimiento de un sistema ágil de intercambio de información', null, 'img']; }],
    ['15-102', q => { set(q, null, ['Valorar la necesidad de detención del presunto autor.', 'Incrementar el nivel de riesgo en el Sistema VIOGEN y esperar nueva resolución judicial.', 'La inmediata detención del infractor.', 'Todas son incorrectas.'], 2);
      return ['se produce un incremento objetivo de la situación de riesgo para la víctima, por lo que se procederá a la inmediata detención del infractor', null, 'img']; }],
    ['15-115', q => { set(q, null, ['El imputado, que deberá asistir con letrado por él elegido o designado de oficio.', 'El Ministerio Fiscal.', 'La víctima o su representante legal.', 'Todos son correctos.'], 3);
      return ['A esta comparecencia serán citadas las siguientes personas: el imputado, que deberá asistir con letrado por él elegido o designado de oficio, el Ministerio Fiscal', null, 'img']; }],
  ];
};
