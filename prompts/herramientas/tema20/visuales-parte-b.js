// Cuadros del Tema 20 (LECrim) · págs. 29-80 de MI PDF · parte B. Texto literal del cuadro; fosforito real copiado en págs. 32-34 y en los recuadros subrayados (100-106, 123, 261, 277-281, 282 bis, 283, 284); págs. 29-31, 47, 59, 62 y art. 260 son impresos sin fosforito (colores por método).
module.exports = function (v, H) {
  const { R, P, D, Y, K, G, arbol, flujo, cols, plazos, tabla } = H;
  const A = x => `<mark class="m-accion">${x}</mark>`;
  const C = x => `<span class="m-circulo">${x}</span>`;
  const B = x => `<span class="m-caja">${x}</span>`;
  const T = 'cuadro del temario';
  const YK = x => Y(K(x));

  // p29 · arts. 19-21 · COMPETENCIAS (impreso, colores por método)
  v('lecrim', 'cuya urgencia o necesidad fueren manifiestas', cols(`COMPETENCIAS (${T} · arts. 19 a 21)`, [
    { t: 'Para promover/sostener (ART. 19)', l: [
      `POR ÓRGANO JUDICIAL · 1.º ${G('Los Jueces municipales')} en cualquier estado del juicio, y las partes ${P('desde la citación hasta el acto de la comparecencia')}.`,
      `POR ÓRGANO JUDICIAL · 2.º ${G('Los Jueces de instrucción')} durante el ${D('sumario')}.`,
      `POR ÓRGANO JUDICIAL · 3.º ${G('Las Audiencias de lo criminal')} durante la sustanciación del ${D('juicio')}.`,
      `POR LAS PARTES · 4.º ${G('El Ministerio Fiscal')} en cualquier estado de la causa.`,
      `POR LAS PARTES · 5.º ${D('El acusador particular')} antes de formular su primera petición después de personado en la causa.`,
      `POR LAS PARTES · 6.º ${D('El procesado y la parte civil')}, ya figure como actora, ya aparezca como responsable, ${P('dentro de los tres días siguientes')} al en que se les comunique la causa para calificación.`] },
    { t: 'Para resolver: superiores jerárquicos (ART. 20)', l: [
      `1.º De los Jueces municipales del mismo partido, ${G('el de instrucción')}.`,
      `2.º De los Jueces de instrucción de una misma circunscripción, ${G('la Audiencia de lo criminal')}.`,
      `3.º De las Audiencias de lo criminal del mismo territorio, ${G('la Audiencia territorial en pleno')}.`,
      `4.º De las Audiencias territoriales, o cuando la competencia sea entre una Audiencia de lo criminal y la Sala de lo criminal de una territorial, ${G('el Tribunal Supremo')}.`] },
    { t: 'Notas (* y ** · art. 21)', l: [
      `* Cuando cualquiera de los Jueces o Tribunales mencionados en los números 1.º, 2.º y 3.º ${K('no')} tengan superior inmediato común, decidirá la competencia el que lo sea en el orden jerárquico, y, a falta de éste, ${G('el Tribunal Supremo')}.`,
      `** Caso especial: el ${G('TRIBUNAL SUPREMO')} (ART. 21): ${K('no podrá')} formar ni promover competencias y ningún Juez, Tribunal o parte podrá promoverlas contra él. Cuando algún Juez o Tribunal viniere entendiendo en asunto cuyo conocimiento estuviere reservado al Tribunal Supremo, ordenará éste a aquél, de oficio, a excitación del Ministerio Fiscal o a solicitud de parte, que se abstenga de todo procedimiento y remita los antecedentes en el término de ${P('2.º día')}, para su vista, resolver. Podrá, sin embargo, autorizar, en la misma orden y entre tanto que resuelve la competencia, la continuación de aquellas diligencias cuya urgencia o necesidad fueren manifiestas. Contra decisión del Tribunal Supremo ${K('no se da recurso alguno')}.`] },
  ]));

  // p30 · arts. 22-24 · CONFLICTO POSITIVO (impreso)
  v('lecrim', 'previos los informes que estime necesarios', flujo(`CONFLICTO POSITIVO DE COMPETENCIA · aspectos generales y fase de sumario (${T} · arts. 22 y 23)`, [
    { bif: [
      { et: 'Jueces de instrucción', c: 'o', t: `${D('2 o más jueces de instrucción')} se reputan competentes → ${D('primera comunicación sin acuerdo')} sobre competencia → ${D('dan cuenta con remisión de testimonio')} al ${G('superior jerárquico')}.` },
      { et: 'Ministerio Fiscal o partes', c: 'v', t: `${G('Ministerio Fiscal')} o cualquier parte entienden que el juez no tiene competencia → ${D('podrán reclamar')} ante el ${G('Tribunal superior')} a quien corresponda → ${D('previos los informes que estime necesarios')}.` } ] },
    { et: '(Mientras) práctica de diligencias', c: 'c', t: `Práctica diligencias: ${D('necesarias para comprobar el delito')} · ${D('de reconocida urgencia')}.` },
    { et: 'DECISIÓN', c: 'o', t: `${D('DECISIÓN DE PLANO')} POR EL ${G('SUPERIOR JERÁRQUICO')} ${K('SIN ULTERIOR RECURSO')}.` },
    { et: 'Plazo', c: 'v', t: `En plazo de ${P('2 días')} a contar desde aquél en que reciba la orden del superior para que deje de conocer. El ${G('Secretario judicial del Juzgado de Instrucción')} que deje de actuar remitirá las diligencias practicadas y los objetos recogidos al declarado competente. Terminado el sumario, toda cuestión de competencia que se promueva ${D('suspenderá los procedimientos')} hasta la decisión de ella (ART. 24).` },
  ]));

  // p31 · art. 25 · PROMOVIDA POR ÓRGANO JUDICIAL (impreso)
  v('lecrim', 'observándose en este caso lo dispuesto en el último párrafo del artículo 12', cols(`COMPETENCIA PROMOVIDA POR ÓRGANO JUDICIAL (${T} · art. 25)`, [
    { t: 'POSITIVA', l: [
      `El ${G('Juez o Tribunal')} que se considere competente ${D('deberá promover la competencia')} (CUESTIÓN).`,
      `Entretanto no recaiga decisión judicial firme resolviendo definitivamente la cuestión promovida o aceptando la competencia.`,
      `Dirimida la cuestión o aceptada la competencia por resolución firme → el ${G('Secretario judicial')} ${D('remitirá los autos originales y las piezas de convicción')} al Juez que resulte competente.`] },
    { t: 'NEGATIVA', l: [
      `Acordará la ${D('INHIBICIÓN')} a favor del Juez o Tribunal competente cuando considere que el conocimiento de la causa no le corresponde incluso ${K('sin reclamación')} de los interesados ni del Ministerio Fiscal.`,
      `El ${G('Juez de instrucción')} inhibido ${D('seguirá practicando todas las diligencias necesarias')} para comprobar el delito, averiguar e identificar a los posibles culpables y proteger a los ofendidos o perjudicados por el mismo.`,
      `Resolución que inicialmente acuerde la inhibición o ${D('AUTO DE INHIBICIÓN')} (expresará diligencias realizadas y se acompañará únicamente testimonio de las actuaciones).`,
      `RECURSOS AL AUTO DE INHIBICIÓN dictado por: ${G('Jueces municipales o de instrucción')} → ${P('APELACIÓN')} · ${G('Audiencias')} → ${P('CASACIÓN')}.`] },
  ]));

  // p32 · art. 26 · PROMOVIDA POR LAS PARTES (fosforito real)
  v('lecrim', 'La declinatoria ante el Juez o Tribunal que se repute incompetente', flujo(`COMPETENCIA PROMOVIDA POR LAS PARTES (${T} · art. 26 · pág. 32)`, [
    { et: 'Ante el juez o tribunal que se repute…', c: 'c', t: `Ante el ${G('Juez o tribunal')} que se repute… El Ministerio Fiscal y las partes promoverán las competencias por: [Se excluyen absolutamente durante la sustanciación de la competencia y una vez que ésta se halle terminada].` },
    { bif: [
      { et: 'INCOMPETENTE', c: 'o', t: `${D('DECLINATORIA')} (ARTS. 32 y ss.). Cuando se proponga declinatoria ante un ${G('Juez municipal')} ${A('resolverá')} ${P('en término de segundo día')} ${P('oyendo previamente')} al Fiscal sobre si procede o no acordar la inhibición. ${Y('PROCEDE')} (Se ${D('cede la competencia')}) · ${Y('NO PROCEDE')}: ${D('AUTO DENEGATORIO DE INHIBICIÓN')} ** [${Y('Apelable')} en ambos efectos para ${Y('ante')} el Juez de instrucción respectivo] [${D('Contra la resolución del Juzgado')} procederá el recurso de ${D('casación')}]. ${Y('Las declinatorias se sustanciarán como artículos de previo pronunciamiento.')} (ARTS. 666 y ss.).` },
      { et: 'COMPETENTE', c: 'v', t: `${D('INHIBITORIA')} (ARTS. 27 y ss.). El Juez municipal requerido de inhibición oyendo al Fiscal cuando éste no la hubiera propuesto. ${P('Resolverá en término de segundo día')}. ${Y('Desiste')} de conocer → ${D('PROCEDE EL REQUERIMIENTO')} · ${D('Mantiene')} su competencia → ${D('NO PROCEDE: AUTO DENEGATORIO**')}.` } ] },
    { et: 'Requerimiento', c: 'o', t: `Lo mandará practicar ${Y('X OFICIO')} en el cual consignará los fundamentos de su ${Y('AUTO*')} y se remitirán ${G('al juez')} requirente las diligencias practicadas ${P('dentro de 24 H')} precisamente.` },
    { et: 'Juez requirente', c: 'v', t: `Recibidos los autos por el Juez requirente. ${A('Declarará')}, ${B('sin más trámites')}, y ${P('dentro de 24 H')} se: ${D('Insiste en la competencia')} · ${D('Se aparta de ella*')}. ${A('Lo participará')} ${P('en el mismo día')} al juez requerido para: ${Y('El Juez requerido siga conociendo')} (X) · ${P('En 24 H siguientes')} ${Y('remisión de diligencias por ambos')} al órgano que debe resolver.` },
    { et: 'Resuelve', c: 'c', t: `Recibidas las diligencias en el ${G('Juzgado o Tribunal')} llamado a resolver la competencia. ${G('Oído el Fiscal')} por término de ${P('segundo día')} ${A('DECIDIRÁ')} dentro de los ${P('tres siguientes')} al en que el Ministerio Fiscal evacue el traslado. · Contra ${D('lo resuelto')} por el Juzgado o Audiencia procederá el recurso de ${D('casación')}. · Contra la ${D('resolución')} del Supremo ${K('no se da recurso alguno')}.` },
    { et: 'Notas', c: 'v', t: `* ESTOS AUTOS serán apelables para ante el respectivo Juez de instrucción. ** ESTOS AUTOS serán apelables en ambos efectos para ante el Juez de instrucción respectivo.` },
  ]));

  // p33 · arts. 33-37 · INHIBITORIA: INICIACIÓN (fosforito real)
  v('lecrim', 'dictará auto inhibiéndose o declarando que no ha lugar a hacerlo', flujo(`PROCEDIMIENTO DE UNA INHIBITORIA ante los Tribunales de lo criminal · INICIACIÓN (${T} · arts. 33 y ss. · pág. 33)`, [
    { et: 'INICIACIÓN', c: 'o', t: `• ${A('Se propondrá')} en ${D('escrito')} con ${D('firma de Letrado')}. • En el ${Y('escrito')} ${Y('expresará')} el que la proponga que ${Y('NO ha empleado la declinatoria')} (si resultase lo contrario, será condenado en costas, aunque se decida en su favor la competencia o aunque la abandone en lo sucesivo).` },
    { et: 'Traslado', c: 'v', t: `El ${G('Secretario del Tribunal')} ante quien ${Y('se proponga la inhibitoria')} dará ${D('TRASLADO')} por ${P('término de uno o dos días')} (según el volumen de la causa): • al ${G('Ministerio Fiscal')}, cuando éste ${Y('no la haya propuesto')}. • a las ${G('demás partes')} que ${Y('figuren en la causa')} de que pudiera a la vez estar conociendo el Tribunal a quien se haya instado.` },
    { et: 'Requerimiento', c: 'c', t: `Para que haga ${Y('el requerimiento y, en su vista')}: el ${G('Tribunal')} ${A('mandará')}, dentro de los ${P('dos días siguientes')}: ${D('LIBRAR OFICIO INHIBITORIO')} · ${D('DECLARAR NO HABER LUGAR A ELLO')} (contra el auto en que ${Y('se deniegue el requerimiento de inhibición')} sólo habrá lugar al ${D('recurso de casación')}).` },
    { et: 'Con el oficio', c: 'o', t: `Con el ${D('oficio de inhibición')} ${Y('se acompañará')}, se ${A('extenderá y remitirá')} ${D('TESTIMONIO')}: - En el ${P('plazo improrrogable de 1 a 3 días')}, según volumen de la causa. - Del ${Y('escrito')} en que se haya pedido. - De lo ${Y('expuesto por Ministerio Fiscal/partes')}, ${B('en su caso')}. - Del ${Y('auto que se haya dictado')}. - De lo demás que el ${G('Tribunal')} ${Y('estime conducente')} a fundar su competencia.` },
    { et: 'Secretario del Tribunal requerido', c: 'v', t: `El ${G('Secretario del Tribunal requerido')}: - ${A('acusará')} ${P('inmediatamente')} ${Y('recibo')}. - Dará ${D('TRASLADO')} en ${P('plazo de 24 H MAX')} a cada uno: ${G('Ministerio Fiscal')} · ${G('Acusador particular')} · ${G('Procesados/detenidos')} ${B('personados')} · ${G('Parte Civil')}. Tras lo cual: Continúa.` },
  ]));

  // p34 · arts. 37-43 · INHIBITORIA: AUTO Y RESOLUCIÓN (fosforito real)
  v('lecrim', 'Contra los pronunciados por el Tribunal Supremo no se da recurso alguno', cols(`PROCEDIMIENTO DE UNA INHIBITORIA · AUTO Y RESOLUCIÓN (${T} · arts. 33 y ss. · pág. 34)`, [
    { t: 'El Tribunal dictará AUTO · DE INHIBICIÓN (solo recurrible en casación)', l: [
      `${G('El Tribunal')} ${A('dictará')} AUTO. ${D('DE INHIBICIÓN')} (solo recurrible en casación).`,
      `Consentido o ejecutoriado ${Y('el auto')}: el ${G('Secretario judicial')}, respecto al Tribunal que hubiera propuesto la inhibitoria: - ${A('La remitirá')} la causa, ${P('plazo de 3 días')}. - Con ${Y('emplazamiento a las partes')}. - ${A('Pondrá a su disposición')}: a los procesados, las pruebas materiales del delito y los bienes embargados.`] },
    { t: 'DECLARANDO QUE NO HA LUGAR · AUTO DENEGATORIO DE INHIBICIÓN', l: [
      `${D('DECLARANDO QUE NO HA LUGAR')} · ${D('AUTO DENEGATORIO DE INHIBICIÓN')}.`,
      `Se ${A('comunicará')} ${Y('el auto')} al ${G('Tribunal requirente')}. Con testimonio remitido ${P('dentro de 3 días')}: - de lo ${Y('expuesto')} por el ${G('Ministerio Fiscal y por las partes')}. - de ${Y('todo lo demás')} que se crea conducente; mediante ${B('OFICIO')} ${D('DE REMISIÓN')} ${Y('donde se exigirá')} que el ${G('Tribunal requirente')} ${Y('conteste inmediatamente')} para: ${Y('Continuar actuando')} si no insiste en la inhibición · Que ${A('remita')} la causa a quien corresponda decidir la competencia.`,
      `${Y('Recibido este oficio')} el ${G('Tribunal que propone la inhibitoria')} sin más trámites ${A('dictará')} ${P('AUTO en término de 2.º día')}: ${D('DESISTIENDO DE LA INHIBICIÓN*')} · ${D('MANTENIENDO SU COMPETENCIA')}. Al (órgano judicial) requerido de inhibición:`,
      `DESISTIENDO: ${Y('Consentido o ejecutoriado esto')}: 1) Se lo ${A('comunicará')} ${P('en término de 24 H')}. 2) ${A('Le remitirá')} ${Y('todo lo actuado')} para su unión a la causa.`,
      `MANTENIENDO: Lo ${A('comunicará')} en el ${P('término de 24 H')}. ${Y('Para remisión de la causa por ambos a quién corresponda la resolución')}. + ${G('Dictamen del Ministerio Fiscal')} en ${P('término del 2.º día')}.`,
      `${D('RESOLUCIÓN')} dentro de los ${P('3 días siguientes')}. ${D('RECURSOS')}: ${B('Cuando procede de')}: ${G('Audiencias territoriales')}: ${D('CASACIÓN')} · ${G('Tribunal Supremo')}: ${D('no cabe')}. Cabe ${D('CONDENA EN COSTAS')} a las ${Y('partes por notoria temeridad')}. * Solo recurrible en casación.`] },
  ]));

  // art. 100 (p35)
  v('lecrim', 'la reparación del daño y la indemnización de perjuicios causados por el hecho punible', cols(`ARTÍCULO 100 (recuadro del temario · pág. 35)`, [{ t: 'De todo delito o falta:', l: [
    `• ${A('nace')} ${Y('acción penal')} para el ${Y('castigo')} del culpable ${C('y')}.`,
    `• ${A('puede nacer')} ${B('también')} ${Y('acción civil')} para la ${Y('restitución')} de la cosa, la ${Y('reparación')} del daño ${C('y')} la ${Y('indemnización')} de perjuicios causados por el hecho punible.`] }]));

  // art. 102 (p36)
  v('lecrim', 'bajo su guarda legal', cols(`ARTÍCULO 102 (recuadro del temario · pág. 36)`, [{ t: `Sin embargo de lo dispuesto en el artículo anterior, ${YK('no podrán ejercitar la acción penal')}:`, l: [
    `1.º El que ${YK('no goce')} de la plenitud de los ${Y('derechos')} ${YK('civiles')}.`,
    `2.º El que hubiere sido ${Y('condenado')} ${C(YK('dos'))} ${Y('veces')} por sentencia ${YK('firme')} como reo del ${Y('delito de')} ${YK('denuncia o querella calumniosas.')}`,
    `3.º El ${YK('Juez o Magistrado.')}`] }]));

  // art. 103 (p36)
  v('lecrim', 'por los unos contra las personas de los otros', cols(`ARTÍCULO 103 (recuadro del temario · pág. 36)`, [{ t: `${YK('Tampoco podrán')} ejercitar acciones penales ${YK('entre sí:')}`, l: [
    `1.º Los ${YK('cónyuges')}, ${YK('a no ser')} por delito o falta cometidos por el ${Y('uno contra')} la persona del ${Y('otro')} ${C('o')} la de sus hijos ${C('y')} por el delito de ${YK('bigamia.')}`,
    `2.º Los ${YK('ascendientes, descendientes y hermanos')} por naturaleza, por la adopción ${C('o')} por afinidad, ${YK('a no ser')} por delito o falta ${Y('cometidos por')} los ${Y('unos contra')} las personas de los ${Y('otros.')}`] }]));

  // art. 106 (p39)
  v('lecrim', 'y las civiles, cualquiera que sea el delito o falta de que procedan', cols(`ARTÍCULO 106 (recuadro del temario · pág. 39)`, [{ t: `La acción penal por delito o falta ${Y('que dé lugar al procedimiento')} ${YK('de oficio')}:`, l: [
    `• ${C(YK('no'))} ${YK('se extingue')} por la ${YK('renuncia')} de la persona ofendida.`,
    `Pero ${YK('se extinguen')} por esta causa:`,
    `• las que nacen de ${Y('delito o falta que')} ${B('no puedan')} ser perseguidos ${B('sino')} a ${YK('instancia de parte')}, ${C('y')} ${YK('las civiles')}, ${B('cualquiera que sea el delito o falta')} de que procedan.`] }]));

  // p47 · ACCIÓN PENAL / ACCIÓN CIVIL (impreso, método)
  v('lecrim', 'los artículos 106, 107, 110 y párrafo segundo del 112', cols(`ACCIÓN PENAL · ACCIÓN CIVIL (${T} · art. 117 · pág. 47)`, [
    { t: 'ACCIÓN PENAL', l: [`${D('NACE')}: de todo delito`, `${D('FINALIDAD')}: ${Y('castigar al culpable')}`, `${D('ES')}: ${Y('pública')}`, `${D('LA EJERCITA')}: cualquier ${G('español')} con carácter general (con excepciones)`, `${D('SE EXTINGUE')}: con la ${Y('muerte del culpable')} o por ${Y('renuncia')} en caso de los ${Y('delitos perseguibles a instancia de parte')}.`] },
    { t: 'ACCIÓN CIVIL', l: [`${D('PUEDE NACER')}: de todo delito`, `${D('FINALIDAD')}: - Para la ${Y('RESTITUCIÓN')} de la cosa - Para ${Y('REPARAR')} el daño - Para ${Y('INDEMNIZAR')} perjuicios causados`, `${D('ES')}: ${Y('pública')}`, `${D('LA EJERCITA')}: cualquier ${G('español')} con carácter general (con excepciones)`, `${D('SE EXTINGUE')}: con la ${Y('renuncia expresa')} de todos los perjudicados u ofendidos`] },
  ]));

  // art. 123 (p51)
  v('lecrim', 'se documentarán por escrito', cols(`ARTÍCULO 123.1 · derechos a traducción (recuadro del temario · pág. 51)`, [{ t: 'Los imputados o acusados que no hablen o entiendan el castellano o la lengua oficial en la que se desarrolle la actuación tendrán los siguientes derechos:', l: [
    `a) Derecho a ${YK('ser asistidos por un intérprete')} que utilice una lengua que comprenda ${Y('durante todas las actuaciones')} en que sea ${YK('necesaria su presencia')}, incluyendo el interrogatorio policial o por el Ministerio Fiscal y todas las vistas judiciales.`,
    `b) Derecho a ${YK('servirse de intérprete')} en las ${Y('conversaciones')} que mantenga ${Y('con su Abogado')} y que tengan ${Y('relación directa')} con su posterior interrogatorio o ${Y('toma de declaración')}, o que resulten necesarias para la presentación de un ${Y('recurso')} ${C('o')} para ${Y('otras solicitudes')} procesales.`,
    `c) Derecho a la ${YK('interpretación de todas las actuaciones del juicio oral.')}`,
    `d) Derecho a la ${YK('traducción escrita')} de los ${Y('documentos')} que resulten ${YK('esenciales')} para garantizar el ejercicio del ${Y('derecho a la defensa')}. Deberán ser traducidos, ${D(K('en todo caso'))}, ${D('las resoluciones que acuerden la')} ${D(K('prisión'))} ${D('del imputado, el escrito de')} ${D(K('acusación'))} ${C('y')} ${D('la sentencia.')}`,
    `e) Derecho a ${YK('presentar una solicitud motivada')} para que se ${YK('considere esencial un documento.')}`] }]));

  // art. 260 (p56, impreso)
  v('lecrim', 'ni a los que no gozaren del pleno uso de su razón', cols(`ARTÍCULO 260 (recuadro del temario · pág. 56 · sin fosforito: colores por método)`, [{ t: 'La obligación establecida en el artículo anterior no comprende:', l: [`• a los ${G('impúberes')} ni`, `• a los que ${K('no')} gozaren del pleno uso de su ${D('razón')}.`] }]));

  // art. 261 (p56)
  v('lecrim', 'de trata de seres humanos y la víctima del delito sea una persona menor de edad', cols(`ARTÍCULO 261 (recuadro del temario · pág. 56)`, [{ t: `${Y('Tampoco')} estarán ${Y('obligados a denunciar')}:`, l: [
    `1.º Quien sea ${YK('cónyuge')} del delincuente ${C(YK('no'))} ${Y('separado')} legalmente ${C('o')} de hecho ${C('o')} ${Y('la persona que conviva con él en análoga relación de afectividad.')}`,
    `2.º Quienes sean ${YK('ascendientes y descendientes')} del delincuente ${C('y')} ${Y('sus parientes')} ${YK('colaterales')} ${D('hasta el segundo grado inclusive.')}`] }]));

  // p59 · FORMA DE LA DENUNCIA (impreso, método)
  v('lecrim', 'se procederá o mandará proceder inmediatamente por el Juez o funcionario', flujo(`FORMA DE LA DENUNCIA (${T} · arts. 265-269 · pág. 59)`, [
    { et: 'La denuncia podrá presentarse', c: 'c', t: `• ${D('Personalmente')} o • Por medio de ${D('mandatario con poder especial')}. De las siguientes formas:` },
    { bif: [
      { et: 'POR ESCRITO', c: 'o', t: `1.º Deberá estar ${D('firmada')} por: • ${D('Denunciador')}, o • Si el denunciador no pudiere, ${D('por otra persona a su ruego')}. 2.º La ${G('autoridad o funcionario')} que la recibiere: • ${A('Rubricará y sellará')} todas las hojas • En ${D('presencia')} del que presente la denuncia. Quien presenta la denuncia podrá también ${D('rubricarla por sí')} o por medio de otra persona a su ruego.` },
      { et: 'VERBALMENTE', c: 'v', t: `1.º Cuando la denuncia sea verbal se ${D('extenderá un acta')} por la ${G('autoridad o funcionario')} que la recibiere. 2.º Denuncia adopta forma de ${D('declaración')} donde se expresarán: • Cuantas ${Y('noticias tenga el denunciante')} relativas al hecho denunciado, y • ${Y('Circunstancias del hecho')} denunciado. 3.º Se ${D('firmará')} por: • ${G('Autoridad o funcionario')} que recibe y redacta la denuncia, y • ${D('Denunciante')}, u otra persona a ruego de éste.` } ] },
    { et: 'Identidad', c: 'o', t: `El ${G('Juez, Tribunal, autoridad o funcionario')} que recibieren una denuncia (verbal o escrita) harán constar la ${D('identidad')} de la persona del ${D('denunciador')}, por: • ${D('Cédula personal')}, o • Por otros medios que reputen suficientes. Si el ${D('denunciador lo exigiere')}, le darán un ${D('resguardo')} de haber formalizado la denuncia.` },
    { et: 'Formalizada la denuncia', c: 'v', t: `${D('Formalizada la denuncia')}, se procederá o mandará proceder ${P('inmediatamente')} por el ${G('Juez o funcionario')} a quien se hiciese a la comprobación del hecho denunciado, ${K('salvo')} que: • El hecho ${K('no')} revista carácter de ${D('delito')}, o • Denuncia fuere ${D('manifiestamente falsa')}.` },
  ]));

  // art. 277 (p61)
  v('lecrim', 'cuando el Procurador no tuviese poder especial para formular la querella', cols(`ARTÍCULO 277 · LA QUERELLA (recuadros del temario · pág. 61)`, [
    { t: 'La querella:', l: [
      `• ${Y('se')} ${D(K('PRESENTARÁ'))} siempre por medio de ${D('Procurador')} ${YK('con poder bastante')} ${C('y')}`,
      `• ${D(K('SUSCRITA'))} por ${D('Letrado.')}`] },
    { t: 'Se extenderá en papel de oficio, y en ella se expresará:', l: [
      `1.º El Juez o Tribunal ${YK('ante quien se presente.')}`,
      `2.º ${Y('El nombre, apellidos y')} ${YK('vecindad')} ${Y('del')} ${YK('querellante.')}`,
      `3.º El nombre, apellidos y ${K('vecindad')} del ${YK('querellado.')} ${Y('En el caso de ignorarse')} estas circunstancias, se deberá hacer la designación del querellado ${Y('por las señas que mejor pudieran darle a conocer.')}`,
      `4.º ${Y('La')} ${YK('relación circunstanciada')} ${Y('del hecho')}, como expresión del ${Y('lugar, año, mes, día y hora')} en que se ejecute, si se supieren.`,
      `5.º Expresión de las ${YK('diligencias que se deberán practicar')} para la ${Y('comprobación')} del hecho.`,
      `6.º ${Y('La')} ${YK('petición')} de que se ${Y('admita')} la querella, ${Y('se practiquen las diligencias indicadas')} en el número anterior, se proceda a la ${Y('detención')} y ${Y('prisión')} del presunto culpable ${Y('o')} a exigirle la ${Y('fianza de libertad provisional')}, ${C('y')} se acuerde el ${Y('embargo')} de sus bienes en la cantidad necesaria en los casos en que así proceda.`,
      `7.º La ${YK('firma del querellante')} ${C('o')} la de otra ${Y('persona a su ruego')} si no supiere o no pudiere firmar, cuando el Procurador no tuviere poder especial para formular la querella.`] },
  ]));

  // art. 278 (p61)
  v('lecrim', 'hasta que se acredite el cumplimiento de lo dispuesto en el párrafo anterior', cols(`ARTÍCULO 278 (recuadro del temario · pág. 61)`, [{ t: 'Querella por delito de los que solamente pueden perseguirse a instancia de parte', l: [
    `Si la querella tuviere ${B('por objeto')} algún ${Y('delito')} de los que ${D('solamente pueden perseguirse a instancia de parte')}, ${B(K('excepto'))} el de ${B('violación o rapto')}, acompañará también la ${D('certificación')} que acredite ${Y('haberse celebrado o intentado el')} ${D('acto de conciliación')} entre ${Y('querellante y querellado.')}`] }]));

  // art. 281 (p62)
  v('lecrim', 'o por el principio de reciprocidad', cols(`ARTÍCULO 281 (recuadro del temario · pág. 62) · exentos de fianza`, [{ t: 'Quedan exentos de cumplir lo dispuesto en el artículo anterior:', l: [
    `1.º El ${YK('ofendido')} ${C('y')} sus ${YK('herederos')} o ${YK('representantes legales.')}`,
    `2.º En los delitos de ${YK('asesinato')} o de ${YK('homicidio')}, el ${YK('cónyuge')} del difunto o persona vinculada a él por una análoga relación de afectividad, los ${YK('ascendientes y descendientes')} ${C('y')} sus parientes colaterales ${YK('hasta el segundo grado')} inclusive, ${YK('los herederos')} de la víctima ${C('y')} ${YK('los padres, madres e hijos del')} delincuente.`,
    `3.º Las ${YK('asociaciones de víctimas')} ${C('y')} las ${YK('personas jurídicas')} a las que la ${Y('ley reconoce legitimación')} para ${YK('defender')} los derechos de las ${YK('víctimas')} siempre que el ejercicio de la acción penal hubiera sido expresamente ${Y('autorizado por la propia víctima.')}`] }]));

  // p62 · DIFERENCIAS DENUNCIA / QUERELLA (impreso, método)
  v('lecrim', 'o por el principio de reciprocidad', cols(`DIFERENCIAS ENTRE DENUNCIA Y QUERELLA (${T} · arts. 259-281 · pág. 62)`, [
    { t: 'DENUNCIA', l: [`Puede formularse ante ${D('cualquier')} ${G('Autoridad judicial, funcionario, Ministerio Fiscal o policía')}.`, `Es un ${D('deber')}, una obligación impuesta por el Estado.`, `Puede formularse ${D('oralmente')}, por escrito o mediante mandatario con poder especial.`, `${K('No')} exige constitución de ${D('fianza')}.`, `Implica una participación de conocimiento.`, `El denunciante ${K('no viene obligado')} a probar los hechos.`, `La denuncia, una vez presentada, ${K('no requiere')} ningún otro acto del denunciante.`, `El denunciante ${K('no tiene')} la consideración de ${D('parte')} en el proceso.`] },
    { t: 'QUERELLA', l: [`Sólo cabe interponerla ante el ${G('órgano jurisdiccional competente')}.`, `Es un ${D('derecho')}.`, `Se debe formular siempre por ${D('escrito')}.`, `Requiere constitución de ${D('fianza')} como presupuesto para ser admitida.`, `Constituye una ${D('declaración de voluntad')}.`, `El querellante ${D('viene obligado')} a probar los hechos.`, `${D('Exige actos posteriores')} del querellante que, de no llevarlos a cabo, suponen el abandono del procedimiento.`, `El querellante ${D('es parte')} en el proceso.`] },
  ]));

  // art. 282 bis.4 (p64)
  v('lecrim', 'aun cuando se desarrollen en el interior de un domicilio', cols(`ARTÍCULO 282 BIS.4 · DELINCUENCIA ORGANIZADA (recuadro del temario · pág. 64)`, [{ t: 'Delitos siguientes:', l: [
    `a) Delitos de ${YK('obtención, tráfico ilícito de órganos')} ${Y('humanos y trasplante')} de los mismos, previstos en el artículo 156 bis del Código Penal.`,
    `b) Delito de ${YK('secuestro')} de personas previsto en los artículos 164 a 166 del Código Penal.`,
    `c) Delito de ${YK('trata')} ${Y('de seres humanos')} previsto en el artículo 177 bis del Código Penal.`,
    `d) Delitos relativos a la ${YK('prostitución')} previstos en los artículos 187 a 189 del Código Penal.`,
    `e) Delitos contra el ${YK('patrimonio y contra el orden socioeconómico')} previstos en los artículos 237, 243, 244, 248 y 301 del Código Penal.`,
    `f) Delitos relativos a la ${YK('propiedad intelectual e industrial')} previstos en los artículos 270 a 277 del Código Penal.`,
    `g) Delitos contra los ${YK('derechos de los trabajadores')} previstos en los artículos 312 y 313 del Código Penal.`,
    `h) Delitos contra los ${YK('derechos de los ciudadanos extranjeros')} previstos en el artículo 318 bis del Código Penal.`,
    `i) Delitos de ${YK('tráfico de especies de flora o fauna amenazada')} previstos en los artículos 332 y 334 del Código Penal.`,
    `j) Delito de ${YK('tráfico de material nuclear y radiactivo')} previsto en el artículo 345 del Código Penal.`,
    `k) Delitos ${YK('contra la salud pública')} previstos en los artículos 368 a 373 del Código Penal.`,
    `l) Delitos de ${YK('falsificación de moneda')}, previsto en el artículo 386 del Código Penal, y de ${YK('falsificación de tarjetas de crédito o débito o cheques de viaje')}, previsto en el artículo 399 bis del Código Penal.`,
    `m) Delito de ${YK('tráfico y depósito de armas, municiones o explosivos')} previsto en los artículos 566 a 568 del Código Penal.`,
    `n) Delitos de ${YK('terrorismo')} previstos en los artículos 572 a 578 del Código Penal.`,
    `o) Delitos contra el ${YK('patrimonio histórico')} previstos en el artículo 2.1.e de la Ley Orgánica 12/1995, de 12 de diciembre, de represión del contrabando.`] }]));

  // art. 283 (p65)
  v('lecrim', 'encargado de la investigación técnica de los accidentes', cols(`ARTÍCULO 283 (recuadro del temario · pág. 65)`, [{ t: `${Y('Constituirán')} la ${G('Policía Judicial')} ${C('y')} serán ${D('auxiliares')} de ${G('los Jueces y Tribunales')} competentes en materia penal ${C('y')} del ${G('Ministerio Fiscal')}, quedando ${D('obligados')} a seguir las instrucciones que de aquellas autoridades reciban a efectos de la ${Y('investigación de los delitos y persecución de los delincuentes')}:`, l: [
    `1.º Las ${YK('autoridades administrativas')} ${B('encargadas')} de la ${YK('seguridad pública')} ${C('y')} de la ${YK('persecución')} de todos los ${Y('delitos')} o de algunos especiales.`,
    `2.º Los ${G(K('empleados o subalternos'))} de la ${YK('policía de seguridad')}, ${B('cualquiera que sea su denominación')}.`,
    `3.º Los ${G(K('Alcaldes, Tenientes de Alcalde'))} ${C('y')} ${G(K('Alcaldes de barrio.'))}`,
    `4.º Los ${G(K('Jefes, Oficiales e individuos'))} de la ${YK('Guardia Civil')} ${C('o')} ${B('de cualquier otra fuerza destinada a la')} ${YK('persecución de malhechores.')}`,
    `5.º Los ${G(K('Serenos, Celadores'))} ${C('y')} cualesquiera otros ${G(K('Agentes municipales'))} de policía ${YK('urbana o rural.')}`,
    `6.º Los ${G(K('Guardas de montes, campos y sembrados, jurados'))} o confirmados por la Administración.`,
    `7.º Los funcionarios del ${G(K('Cuerpo'))} ${B('especial')} ${G(K('de Prisiones.'))}`,
    `8.º Los ${G(K('Agentes judiciales y los subalternos'))} de los Tribunales y Juzgados.`,
    `9.º El personal dependiente de la ${G(K('Jefatura Central de Tráfico'))}, encargado de la ${YK('investigación técnica de los accidentes.')}`] }]));

  // art. 284.2 (p66)
  v('lecrim', 'de conformidad con lo dispuesto en el párrafo tercero del artículo 334', cols(`ARTÍCULO 284.2 · circunstancias (recuadro del temario · pág. 66)`, [{ t: 'No obstante, cuando no exista autor conocido del delito la Policía Judicial conservará el atestado a disposición del Ministerio Fiscal y de la autoridad judicial, sin enviárselo, salvo que concurra alguna de las siguientes circunstancias:', l: [
    `a) Que se trate de ${Y('delitos')} contra la ${YK('vida')}, contra la ${YK('integridad física')}, contra la ${YK('libertad e indemnidad sexuales')} ${C('o')} de delitos relacionados con la ${YK('corrupción')}:`,
    `b) Que se ${Y('practique')} cualquier ${Y('diligencia')} después de transcurridas ${YK('setenta y dos horas')} desde la ${YK('apertura')} del atestado ${C('y')} éstas ${Y('hayan tenido algún resultado')} ${C('o')}`,
    `c) Que el ${G(K('Ministerio Fiscal'))} ${C('o')} la ${YK('autoridad judicial')} soliciten la ${YK('remisión.')}`] }]));
};
