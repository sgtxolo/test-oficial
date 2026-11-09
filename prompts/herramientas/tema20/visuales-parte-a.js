// Cuadros del Tema 20 (LECrim) · PARTE A · págs. 3-27 de MI PDF (08-08-2026).
// Págs. 9-20: recuadros de los arts. 10, 14.5, 15, 17.2, 18.1, 19 y 20 (con mi fosforito real donde la pág. lo trae; art. 10 = pág. limpia, colores por método).
// Págs. 21-27: «Plazos de las cuestiones de competencia (arts. 27-43)» impresos sin fosforito -> colores por método (concepto/negrita amarillo, verbos naranja, órganos verde automático, plazos azul, no/salvo rojo).
// Clave de color: Y amarillo · D naranja · G verde · P azul/plazos · K subrayado rojo · caja = recuadro azul manuscrito · circ = círculo rojo manuscrito.
module.exports = function (v, H) {
  const { R, P, D, Y, K, G, arbol, flujo, cols, plazos, tabla } = H;
  const KY = x => K(Y(x)), KD = x => K(D(x));
  const caja = x => `<span class="m-caja">${x}</span>`, circ = x => `<span class="m-circulo">${x}</span>`;

  // ───────── p9 · art. 10 · JURISDICCIÓN ORDINARIA (pág. limpia, sin fosforito: colores por método) ─────────
  v('lecrim', 'casos reservados por las leyes al Senado', flujo('JURISDICCIÓN ORDINARIA (cuadro del temario · pág. 9 · art. 10)', [
    { et: 'JURISDICCIÓN ORDINARIA', c: 'o', t: `${D('Conocimiento de las causas y juicios criminales')}.` },
    { et: 'EXCEPCIONES', c: 'c', t: `Casos reservados por las leyes: ${K('al Senado')}, a los Tribunales de Guerra y Marina, a las Autoridades administrativas o de policía.` },
  ]));

  // ───────── p13 · art. 14.5 · JUZGADOS DE VIOLENCIA SOBRE LA MUJER (recuadro; texto oficial vigente, mi fosforito en las palabras que coinciden) ─────────
  v('lecrim', 'en caso de que los hechos objeto de instruccion por la seccion de violencia contra la infancia', flujo('VIOLENCIA SOBRE LA MUJER · COMPETENCIAS (cuadro del temario · pág. 13 · art. 14.5)', [
    { et: 'Art. 14.5', c: 'o', t: `${G('Las Secciones de los Tribunales de Instancia con competencia en materia de violencia sobre la mujer')} ${Y('conocerán')}:` },
    { et: 'a)', c: 'v', t: `De la ${KY('instrucción')} de los procesos para exigir responsabilidad penal por los ${KY('delitos')} recogidos en los títulos del Código Penal relativos a ${Y('homicidio, aborto, lesiones, lesiones al feto,')} delitos contra la libertad, delitos contra la integridad moral, contra la libertad e indemnidad sexual, contra la intimidad y el derecho a la propia imagen, contra el honor o cualquier otro delito cometido con violencia o intimidación, ${KY('siempre que')} se hubiesen cometido ${Y('contra')} ${KY('quien sea o haya sido')} ${Y('su esposa, o mujer que esté o haya estado ligada al autor por análoga relación de afectividad, aun sin convivencia,')} ${KY('así como')} de los cometidos sobre los ${KY('descendientes, propios o de la esposa o conviviente,')} o sobre los ${KY('menores o personas con discapacidad')} que con él ${KY('convivan')} o que se hallen ${Y('sujetos a la potestad,')} tutela, curatela, acogimiento o guarda de hecho ${KY('de la esposa o conviviente,')} ${KY('cuando también')} se haya producido un acto de ${KY('violencia de género')}.` },
    { et: 'b)', c: 'v', t: `De la ${KY('instrucción')} de los procesos para exigir responsabilidad penal por cualquier ${Y('delito')} contra las ${KY('relaciones familiares')}, cuando ${Y('la víctima')} sea alguna de las personas señaladas en ${Y('la letra anterior')}.` },
    { et: 'c)', c: 'v', t: `De la ${KY('adopción')} de las correspondientes ${KY('órdenes de protección')} a las víctimas, ${KY('sin perjuicio')} de las competencias atribuidas al ${G('juez o jueza de guardia')}.` },
    { et: 'd)', c: 'v', t: `${KY('Del conocimiento y fallo')} de los delitos leves que les atribuya la ley, cuando la víctima sea alguna de las personas señaladas como tales en la letra a).` },
    { et: 'e)', c: 'c', t: `${D('Dictar sentencia de conformidad')} con la acusación en los casos establecidos por la ley.` },
    { et: 'f)', c: 'c', t: `De la ${D('emisión y la ejecución de los instrumentos de reconocimiento mutuo')} de resoluciones penales en la Unión Europea que les atribuya la ley.` },
    { et: 'g)', c: 'c', t: `De la ${D('instrucción')} de los procesos para exigir responsabilidad penal por el ${D('delito de quebrantamiento')} previsto y penado en el artículo 468 del Código Penal cuando la persona ofendida por el delito cuya condena, medida cautelar o medida de seguridad se haya quebrantado sea o haya sido su esposa, o mujer que esté o haya estado ligada al autor por una análoga relación de afectividad aun sin convivencia, así como los descendientes, propios o de la esposa o conviviente, o sobre los menores o personas con discapacidad con medidas de apoyo que con él convivan o que se hallen sujetos a la potestad, tutela, curatela, acogimiento o guarda de hecho de la esposa o conviviente, así como cuando la persona ofendida lo sea por alguno de los delitos señaladas en la letra h) de este apartado.` },
    { et: 'h)', c: 'c', t: `De la ${D('instrucción')} de los procesos para exigir responsabilidad penal por los ${D('delitos contra la libertad sexual')} previstos en el título VIII del libro II del Código Penal, por los delitos de ${D('mutilación genital femenina, matrimonio forzado, acoso con connotación sexual y la trata con fines de explotación sexual')}, cuando la persona ofendida por el delito sea mujer.` },
  ]));

  // ───────── p14 · art. 15 · COMPETENCIA SI NO CONSTA EL LUGAR ─────────
  v('lecrim', 'cualquiera que hubiese tenido noticia del delito', cols('LUGAR DEL DELITO DESCONOCIDO (cuadro del temario · pág. 14 · art. 15)', [
    { t: `Cuando ${KY('no conste el lugar')} en que se haya ${Y('cometido')} una falta o delito, ${Y('serán Jueces')} y Tribunales ${Y('competentes')} en su caso para conocer de la causa o juicio, por este orden`, l: [
      `1.º ${Y('El del término')} municipal, ${Y('partido o circunscripción')} en que se hayan ${KY('descubierto pruebas materiales')} del delito.`,
      `2.º ${Y('El del término')} municipal, ${Y('partido o circunscripción,')} en que el presunto ${KY('reo')} ${KY('haya sido aprehendido')}.`,
      `3.º ${Y('El de la')} ${KY('residencia del reo')} presunto.`,
      `4.º ${Y('Cualquiera')} que hubiese tenido ${KY('noticia del delito')}.`] },
  ]));

  // ───────── p15 · art. 17.2 · DELITOS CONEXOS ─────────
  v('lecrim', 'a los efectos de la atribucion de jurisdiccion y de la distribucion de la competencia', cols('DELITOS CONEXOS (cuadro del temario · pág. 15 · art. 17.2)', [
    { t: `A los efectos de la atribución de jurisdicción y de la distribución de la competencia ${D('se consideran delitos conexos')}`, l: [
      `1.º Los ${KY('cometidos')} por ${KY('dos o más')} personas ${KD('reunidas')}.`,
      `2.º Los cometidos por ${KY('dos o más')} personas en ${KY('distintos')} lugares o ${KY('tiempos')} si hubiera precedido ${KY('concierto')} para ello.`,
      `3.º Los cometidos ${Y('como')} ${KY('medio')} para ${KY('perpetrar')} otros o ${KY('facilitar')} su ${KY('ejecución')}.`,
      `4.º Los cometidos ${Y('para')} ${KY('procurar la impunidad')} de otros delitos.`,
      `5.º Los delitos de ${KY('favorecimiento real y personal y el blanqueo de capitales')} ${KY('respecto')} al ${KY('delito antecedente')}.`,
      `6.º Los cometidos por ${KY('diversas')} personas cuando se ocasionen ${KY('lesiones o daños recíprocos')}.`] },
  ]));

  // ───────── p15 · art. 18.1 · DELITOS CONEXOS: ORDEN DE LOS TRIBUNALES (cuadro con flechas; sello EXAMEN) ─────────
  v('lecrim', 'el que primero comenzare la causa en el caso de que a los delitos este senalada igual pena', flujo('FUERO EN DELITOS CONEXOS · POR SU ORDEN (cuadro del temario · pág. 15 · art. 18.1 · sello EXAMEN)', [
    { et: '1.º', c: 'o', t: `${Y('El del')} ${KY('territorio')} ${Y('en que se haya')} ${KY('cometido')} el delito a que esté señalada ${KY('pena mayor')}.` },
    { et: '2.º', c: 'v', t: `${Y('El que')} ${KY('primero comenzare')} la causa en el caso de que a los delitos esté señalada ${KY('igual pena')}.` },
    { et: '3.º', c: 'c', t: `${Y('El que la')} ${KY('Audiencia de lo criminal')} ${circ('o')} el ${KY('Tribunal Supremo')} en sus casos respectivos ${KY('designen')}, ${caja('cuando')} las causas hubieren ${KY('empezado al mismo tiempo')}, ${circ('o')} ${circ('no')} ${KY('conste')} cuál comenzó primero.` },
  ]));

  // ───────── p16 · art. 19 · QUIÉN PUEDE PROMOVER Y SOSTENER COMPETENCIA ─────────
  v('lecrim', 'podran promover y sostener competencia', cols('PROMOVER Y SOSTENER COMPETENCIA (cuadro del temario · pág. 16 · art. 19)', [
    { t: `Podrán ${KY('promover')} ${circ('y')} ${KY('sostener')} ${D('competencia')}`, l: [
      `1.º Los ${G('Jueces municipales')} ${caja(Y('en cualquier estado del juicio'))} y las partes ${caja('desde')} ${Y('la citación hasta el acto de la comparecencia')}.`,
      `2.º Los ${G('Jueces de instrucción')} ${caja('durante')} el ${KY('sumario')}.`,
      `3.º Las ${G('Audiencias de lo criminal')} ${caja('durante')} la ${KY('sustanciación del juicio')}.`,
      `4.º El ${G('Ministerio Fiscal')} ${caja(KY('en cualquier estado'))} de la causa.`,
      `5.º El ${G('acusador particular,')} ${caja(KY('antes'))} de formular su primera petición ${caja('después')} de ${Y('personado')} en la causa.`,
      `6.º El ${G('procesado y la parte civil,')} ${circ('ya')} figure como actora, ${circ('ya')} aparezca como responsable, ${P(K('dentro de los tres días siguientes'))} ${P('al en que se les comunique la causa para calificación')}.`] },
  ]));

  // ───────── p16 · art. 20 · SUPERIORES JERÁRQUICOS ─────────
  v('lecrim', 'son superiores jerarquicos para resolver', cols('SUPERIORES JERÁRQUICOS PARA RESOLVER (cuadro del temario · pág. 16 · art. 20)', [
    { t: `Son ${D('superiores jerárquicos')} para ${Y('resolver')} sobre las ${Y('cuestiones de competencia,')} en la forma que determinarán los artículos siguientes`, l: [
      `1.º De los ${G('Jueces municipales')} del ${K('mismo')} partido, el de ${G('instrucción')}.`,
      `2.º De los ${G('Jueces de instrucción')} de una ${K('misma')} circunscripción, la ${G('Audiencia de lo')} ${K(G('criminal'))}.`,
      `3.º De las ${G('Audiencias de lo')} ${K(G('criminal'))} del ${K('mismo')} territorio, la ${G('Audiencia')} ${K(G('territorial'))} ${G('en pleno')}.`,
      `4.º De las ${G('Audiencias territoriales,')} ${circ('o')} ${Y('cuando la competencia sea')} ${caja('entre')} una ${G('Audiencia de lo')} ${K(G('criminal'))} ${circ('y')} la ${G('Sala de lo')} ${K(G('criminal'))} de una territorial, el ${G('Tribunal Supremo')}.`] },
  ]));

  // ───────── p21 · art. 26 · QUIÉN PROMUEVE Y CÓMO (impreso: colores por método) ─────────
  v('lecrim', 'el uso de uno de estos medios excluye absolutamente', tabla('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 26 (cuadro del temario · pág. 21)', ['ART. 26', ''], [
    { l: 'ART. 26', c: 'o', h: [
      { p: '¿Quiénes pueden promover las competencias?', c: 'o', t: `El ${G('Ministerio Fiscal')} y las ${Y('partes')}.` },
      { p: '¿Cómo lo pueden hacer?', c: 'o', t: `A través de ${Y('inhibitoria')} o ${Y('declinatoria')} (${K('o una u otra')}).` },
      { p: 'INHIBITORIA', c: 'v', t: `Se propone ${D('ante el')} ${G('Juez o Tribunal')} que el Ministerio Fiscal o las partes estiman ${D('competente')}, para que este Juez o Tribunal acepte su propia competencia y reclame las actuaciones al ${G('Juez o Tribunal')} que está conociendo de dichas actuaciones en la actualidad.` },
      { p: 'DECLINATORIA', c: 'c', t: `Se propone ${D('ante el')} ${G('Juez o Tribunal')} que el Ministerio Fiscal o las partes estiman ${D('incompetente')}.` }] },
  ]));

  // ───────── p22 · art. 27 ─────────
  v('lecrim', 'el juez municipal ante quien se proponga la inhibitoria', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 27 (cuadro del temario · pág. 22)', [
    { et: 'ART. 27', c: 'o', t: `Proposición de ${Y('INHIBITORIA')} ante el ${G('Juez Municipal')} que se estime competente.` },
    { et: 'RESOLUCIÓN', c: 'v', t: `${Y('RESOLUCIÓN')} -oyendo al Ministerio Fiscal si no ha propuesto la inhibitoria- (${P('EN TÉRMINO DE 2.º DÍA')}):` },
    { bif: [
      { et: 'PROCEDE', c: 'v', t: `${D('PROCEDE')} el requerimiento de inhibición.` },
      { et: 'NO PROCEDE', c: 'c', t: `${K('NO PROCEDE')} el requerimiento de inhibición (auto denegatorio).` }] },
  ]));

  // ───────── p22 · art. 28 ─────────
  v('lecrim', 'si el juez municipal estimare que procede el requerimiento', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 28 (cuadro del temario · pág. 22)', [
    { et: 'ART. 28', c: 'o', t: `${G('Juez Municipal')}: ${D('PROCEDE')} el requerimiento de inhibición → ${D('auto por medio de oficio')} (${P('24 HORAS')}).` },
  ]));

  // ───────── p23 · art. 29 ─────────
  v('lecrim', 'juez municipal requerido de inhibicion', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 29 (cuadro del temario · pág. 23)', [
    { et: 'ART. 29', c: 'o', t: `${G('Juez municipal requerido')} (oyendo al Fiscal) ${D('RESOLVERÁ')} (${P('EN TÉRMINO DE 2.º DÍA')}):` },
    { bif: [
      { et: 'Desiste', c: 'v', t: `${D('DESISTE DE CONOCER')}: remisión de las diligencias practicadas al ${G('Juez requirente')} (${P('24 HORAS SIGUIENTES')}).` },
      { et: 'Mantiene', c: 'c', t: `${KD('MANTIENE SU COMPETENCIA')}: comunicación al ${G('Juez requirente')} (${P('24 HORAS SIGUIENTES')}).` }] },
  ]));

  // ───────── p23 · art. 30 ─────────
  v('lecrim', 'recibidos los autos por el juez requirente', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 30 (cuadro del temario · pág. 23)', [
    { et: 'ART. 30', c: 'o', t: `Tras recibir los autos, ${G('Juez requirente')}: ${D('DECLARARÁ')} (${P('24 HORAS')}):` },
    { bif: [
      { et: 'Insiste', c: 'v', t: `${D('INSISTE EN LA COMPETENCIA')}: lo participará (${P('EN EL MISMO DÍA')}) al ${G('Juez requerido')} para que este remita las diligencias al ${G('Juez o Tribunal')} que deba resolver la competencia (según el art. 20) (${P('24 HORAS SIGUIENTES')}).` },
      { et: 'Se aparta', c: 'c', t: `${KD('SE APARTA DE LA COMPETENCIA')}: lo participará (${P('EN EL MISMO DÍA')}) al ${G('Juez requerido')} ${K('para que este pueda seguir conociendo')}.` }] },
  ]));

  // ───────── p23 · art. 31 ─────────
  v('lecrim', 'recibidas las diligencias en el juzgado o tribunal llamado', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 31 (cuadro del temario · pág. 23)', [
    { et: 'ART. 31', c: 'o', t: `Recibidas las diligencias en el ${G('Juzgado o Tribunal llamado a resolver')} (y oído el Fiscal: ${P('POR TÉRMINO DE 2.º DÍA')}) → ${Y('DECISIÓN SOBRE LA COMPETENCIA')} (${P('3 DÍAS SIGUIENTES EN QUE EL MINISTERIO FISCAL EVACUE EL TRASLADO')}).` },
  ]));

  // ───────── p24 · art. 32 ─────────
  v('lecrim', 'cuando se proponga declinatoria ante un juez municipal', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 32 (cuadro del temario · pág. 24)', [
    { et: 'ART. 32', c: 'o', t: `Proposición de ${Y('DECLINATORIA')} ante el ${G('Juez Municipal')}.` },
    { et: 'RESOLUCIÓN', c: 'v', t: `${Y('RESOLUCIÓN')} -oyendo previamente al Fiscal- (${P('EN TÉRMINO DE 2.º DÍA')}):` },
    { bif: [
      { et: 'PROCEDE', c: 'v', t: `${D('PROCEDE')} acordar la inhibición.` },
      { et: 'NO PROCEDE', c: 'c', t: `${K('NO PROCEDE')} acordar la inhibición.` }] },
  ]));

  // ───────── p24 · art. 34 ─────────
  v('lecrim', 'el secretario del tribunal ante quien se proponga la inhibitoria', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 34 (cuadro del temario · pág. 24)', [
    { et: 'ART. 34', c: 'o', t: `${G('Secretario del Tribunal')} ante quien se proponga la inhibitoria.` },
    { et: 'TRASLADO', c: 'v', t: `${Y('TRASLADO')} (${P('TÉRMINO DE 1 O 2 DÍAS, SEGÚN EL VOLUMEN DE LA CAUSA')}): al ${G('Ministerio Fiscal')} (si no ha propuesto la inhibitoria); a las demás partes que figuren en la causa de que pudiera estar conociendo el ${G('Tribunal')} instado para hacer el requerimiento de inhibición.` },
    { et: 'Tribunal', c: 'c', t: `${G('Tribunal')} (en su vista): ${D('MANDARÁ O DECLARARÁ')} (${P('2 DÍAS SIGUIENTES')}):` },
    { bif: [
      { et: 'Librar', c: 'v', t: `${D('LIBRAR OFICIO INHIBITORIO')}.` },
      { et: 'No ha lugar', c: 'c', t: `${KD('NO HABER LUGAR A LIBRAR OFICIO INHIBITORIO')}.` }] },
  ]));

  // ───────── p24 · art. 36 ─────────
  v('lecrim', 'con el oficio de inhibicion se acompanara testimonio', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 36 (cuadro del temario · pág. 24)', [
    { et: 'ART. 36', c: 'o', t: `${G('Tribunal instado')} para hacer el requerimiento de inhibición: ${D('EXTENDERÁ Y REMITIRÁ')} (${P('PLAZO IMPRORROGABLE DE 1 A 3 DÍAS, SEGÚN EL VOLUMEN DE LA CAUSA')}): ${Y('Testimonio')}.` },
  ]));

  // ───────── p25 · art. 37 ─────────
  v('lecrim', 'el secretario del tribunal requerido acusara inmediatamente recibo', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 37 (cuadro del temario · pág. 25)', [
    { et: 'ART. 37', c: 'o', t: `${G('Secretario del Tribunal requerido')}: ${D('ACUSARÁ')} ${P('INMEDIATAMENTE')} recibo; ${Y('TRASLADO')} (${P('24 HORAS')}): al Ministerio Fiscal; al acusador particular (si lo hubiere); a los referidos en los artículos 118 y 520 que se hubieren personado; a los que figuren como parte civil.` },
    { et: 'Tribunal requerido', c: 'v', t: `${G('Tribunal requerido')}: ${D('DICTARÁ')}:` },
    { bif: [
      { et: 'Inhibiéndose', c: 'v', t: `${D('AUTO INHIBIÉNDOSE')}.` },
      { et: 'No ha lugar', c: 'c', t: `${KD('AUTO DECLARANDO QUE NO HA LUGAR A INHIBIRSE')}.` }] },
  ]));

  // ───────── p25 · art. 38 ─────────
  v('lecrim', 'consentido o ejecutoriado el auto en que el tribunal se hubiese inhibido', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 38 (cuadro del temario · pág. 25)', [
    { et: 'ART. 38', c: 'o', t: `${Y('Consentido o ejecutoriado el AUTO')} en que el ${G('Tribunal')} ${D('SE HUBIESE INHIBIDO')}.` },
    { et: 'Secretario judicial', c: 'v', t: `${G('Secretario judicial')}: ${D('REMITIRÁ')} la causa (${P('3 DÍAS')}) → ${G('Tribunal que propuso la inhibitoria')}.` },
  ]));

  // ───────── p26 · art. 39 ─────────
  v('lecrim', 'si se denegare la inhibicion se comunicara el auto', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 39 (cuadro del temario · pág. 26)', [
    { et: 'ART. 39', c: 'o', t: `${KD('DENEGACIÓN DE LA INHIBICIÓN')}.` },
    { et: 'Comunicación', c: 'v', t: `${D('SE COMUNICARÁ')} el auto → ${G('Tribunal requirente')}, con ${Y('testimonio')} de lo expuesto por el Ministerio Fiscal y las partes y de lo que se crea conducente → ${Y('EXPEDICIÓN Y REMISIÓN')}: ${P('3 DÍAS')}.` },
    { et: 'Oficio de remisión', c: 'c', t: `Oficio de remisión: ${D('EXIGIRÁ')} que el ${G('Tribunal requirente')} ${Y('CONTESTE')} ${P('INMEDIATAMENTE')}:` },
    { bif: [
      { et: 'No insiste', c: 'v', t: `${D('SI NO INSISTE EN LA INHIBICIÓN')} (para continuar actuando el ${G('Tribunal requerido')}).` },
      { et: 'Insiste', c: 'c', t: `${KD('SI INSISTE EN LA INHIBICIÓN')}, el ${G('Tribunal requerido')} ${K('REMITA LA CAUSA A QUIEN CORRESPONDA PARA QUE DECIDA LA COMPETENCIA')}.` }] },
  ]));

  // ───────── p26 · art. 40 ─────────
  v('lecrim', 'recibido el oficio que expresa el art anterior', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 40 (cuadro del temario · pág. 26)', [
    { et: 'ART. 40', c: 'o', t: `Recibido el oficio de remisión, el ${G('Tribunal que hubiere propuesto la inhibitoria')}: ${D('DICTARÁ')} auto (${P('EN TÉRMINO DE 2.º DÍA')}).` },
  ]));

  // ───────── p27 · art. 41 ─────────
  v('lecrim', 'auto en que el tribunal desista de la inhibitoria', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 41 (cuadro del temario · pág. 27)', [
    { et: 'ART. 41', c: 'o', t: `${Y('Consentido o ejecutoriado el AUTO')} en que el ${G('Tribunal')} ${D('DESISTA DE LA INHIBITORIA')}: ${D('LO COMUNICARÁ')} (${P('EN EL TÉRMINO DE 24 HORAS')}).` },
    { et: 'Destinatario', c: 'v', t: `${G('Tribunal requerido de inhibición')} (remitiéndole todo lo actuado).` },
  ]));

  // ───────── p27 · art. 42 ─────────
  v('lecrim', 'si el tribunal requirente mantiene su competencia', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 42 (cuadro del temario · pág. 27)', [
    { et: 'ART. 42', c: 'o', t: `Si el ${G('Tribunal requirente')} ${KD('MANTIENE SU COMPETENCIA')}: ${D('LO COMUNICARÁ')} (${P('EN EL TÉRMINO DE 24 HORAS')}).` },
    { et: 'Destinatario', c: 'v', t: `${G('Tribunal requerido de inhibición')} (remitirá la causa al ${G('Tribunal a quien corresponda la resolución')}).` },
  ]));

  // ───────── p27 · art. 43 ─────────
  v('lecrim', 'las competencias se decidiran por el tribunal', flujo('PLAZOS DE LAS CUESTIONES DE COMPETENCIA · ART. 43 (cuadro del temario · pág. 27)', [
    { et: 'ART. 43', c: 'o', t: `${Y('DECISIÓN DE LAS COMPETENCIAS')}.` },
    { et: 'Dictamen', c: 'v', t: `Emisión de ${Y('DICTAMEN')} del ${G('MINISTERIO FISCAL')} (${P('EN EL TÉRMINO DE 2.º DÍA')}).` },
    { et: 'Tribunal', c: 'v', t: `${G('Tribunal a quien corresponda la resolución de la competencia')}.` },
    { et: 'Decisión', c: 'c', t: `${Y('DECISIÓN')} (${P('3 DÍAS SIGUIENTES EN QUE EL MINISTERIO FISCAL EMITIERA DICTAMEN')}).` },
  ]));
};
