// Cuadros del Tema 20 (LECrim), págs. 81-150 del PDF subrayado. Págs. 83 y 95 (copias del T19) y RECUERDA (145-150) ignoradas.
// Fosforito REAL copiado: págs. 88 (art. 500), 99 (547), 101 (554), 107 (579), 119 (manuscritos), 124 (ámbito).
// Colores POR MÉTODO (cuadro impreso sin fosforito): págs. 82, 87, 92, 104, 105, 123, 128, 129.
module.exports = function (v, H) {
  const { R, P, D, Y, K, G, arbol, flujo, cols, plazos, tabla } = H;

  // ───── p82 · art. 384 · RECURSOS CONTRA AUTOS DE PROCESAMIENTO (método) ─────
  v('lecrim', 'utilizar los mismos recursos de reforma y apelación otorgados a los procesados directamente', cols('RECURSOS CONTRA AUTOS DE PROCESAMIENTO (cuadro del temario · pág. 82 · art. 384)', [
    { t: 'Contra autos que dicten los Jueces de Instrucción DECRETANDO el procesamiento', l: [
      `1.º ${D('Recurso de reforma')}: dentro de los ${P('3 días')} siguientes de haber sido notificada la resolución.`,
      `Y contra el auto denegando la reforma → 2.º ${D('Recurso de apelación')}: dentro de los ${P('5 días')} siguientes de haber sido notificada la resolución denegando el recurso.`,
      `También se pueden presentar los recursos de forma conjunta del siguiente modo: ${D('Recurso de reforma')}: dentro de los ${P('3 días')} siguientes de haber sido notificada la resolución + ${D('Recurso de apelación')} (de forma ${Y('subsidiaria')}).`] },
    { t: 'Contra autos que dicten los Jueces de Instrucción DENEGANDO el procesamiento', l: [
      `${Y('Solo podrá recurrir quien haya solicitado el procesamiento')}.`,
      `1.º ${D('Recurso de reforma')}: dentro de los ${P('3 días')} siguientes de haber sido notificada la resolución.`,
      `Y contra el auto denegando la reforma →`,
      `2.º ${K('NO CABE RECURSO DE APELACIÓN')} ni ningún otro recurso.`,
      `*Pero podrá ${D('reproducirse ante la Audiencia')} correspondiente la petición de procesamiento formulada por la parte a quien le haya sido denegada*.`] },
  ]));

  // ───── p87 · arts. 490, 492, 496, 497 · LA DETENCIÓN: SUPUESTOS Y PLAZOS (método) ─────
  v('lecrim', 'respecto de la persona cuya detención hubiere él mismo acordado', flujo('LA DETENCIÓN: SUPUESTOS Y PLAZOS (cuadro del temario · pág. 87 · arts. 490, 492, 496 y 497)', [
    { et: 'Norma del art. 497 (Norma General) · art. 490 · Cualquiera', c: 'o', t: `Aplicable a los siguientes casos del artículo 490: 1.º Al que ${D('intentare cometer un delito')}, ${Y('en el momento')} de ir a cometerlo. 2.º Al delincuente, «${Y('in fraganti')}». 6.º Al que se ${D('fugare')} estando detenido o preso por causa pendiente. 7.º Al ${Y('procesado o condenado')} que estuviere en ${Y('rebeldía')}.` },
    { et: 'Y a los siguientes casos del artículo 492 · Autoridad o agente de P.J.', c: 'v', t: `2.º Al que estuviere ${Y('procesado')} por delito que tenga señalada en el Código pena ${Y('superior')} a la de prisión correccional. 3.º Al ${Y('procesado')} por delito a que esté señalada pena ${Y('inferior')}, si sus antecedentes o las circunstancias del hecho hicieren presumir que ${K('no comparecerá')} cuando fuere llamado por la Autoridad judicial. 4.º Al que estuviere en el caso del número anterior, aunque todavía no se hallare procesado, con tal de que concurran las dos circunstancias siguientes: 1.ª Que la Autoridad o agente tenga motivos ${Y('racionalmente bastantes')} para creer en la existencia de un hecho que presente los caracteres de ${Y('delito')}. 2.ª Que los tenga también ${Y('bastantes')} para creer que la persona a quien intente detener ${Y('tuvo participación')} en él.` },
    { et: 'Momento de la detención → art. 496', c: 'c', t: `${P('24 horas')} siguientes → ${G('Puesta a disposición judicial')}.` },
    { et: 'Puesta a disposición judicial → art. 497', c: 'c', t: `${P('72 horas')} siguientes → Libertad / Prisión preventiva.` },
    { et: 'Total', c: 'v', t: `${P('24 + 72 = 96 horas')} (plazos máximos).` },
  ]));

  // ───── p88 · art. 500 · NORMA DEL ART. 500 (fosforito real) ─────
  v('lecrim', 'inmediatamente sea remitido al establecimiento o lugar donde debiere cumplir su condena', flujo('NORMA DEL ART. 500 (cuadro del temario · pág. 88)', [
    { et: 'Norma del art. 500', c: 'o', t: `Aplicable a los siguientes casos del artículo 490: 3.º Al que se ${Y('fugare del establecimiento')} penal en que se halle extinguiendo ${Y('condena')}. 4.º Al que se ${Y('fugare de la cárcel')} en que estuviere ${Y('esperando su traslación')} al establecimiento penal o lugar en que ${Y('deba cumplir la condena')} que se le hubiese impuesto por sentencia firme. 5.º Al que se ${Y('fugare al ser conducido')} al establecimiento o lugar mencionado en el número anterior. 7.º Al ${Y('procesado o condenado')} que estuviere ${Y('en rebeldía')}.` },
    { et: G('Juez'), c: 'v', t: `Momento de la detención → ENTREGA ${P('INMEDIATA')} → ${Y('Lugar de cumplimiento de la condena')}.` },
  ]));

  // ───── p92 · art. 520 bis · NORMA DEL ARTÍCULO 520 bis (método) ─────
  v('lecrim', 'requerir información y conocer personalmente o mediante delegación en el Juez de Instrucción', flujo('NORMA DEL ARTÍCULO 520 bis (cuadro del temario · pág. 92)', [
    { et: 'Norma del artículo 520 bis', c: 'o', t: `Aplicable a toda persona detenida como ${Y('presunto partícipe')} de alguno de los delitos a que se refiere el artículo 384 bis: (persona integrada o relacionada con ${G('bandas armadas')} o individuos ${G('terroristas o rebeldes')}).` },
    { et: 'Momento de la detención', c: 'c', t: `${P('72 horas')} siguientes. Dentro de ellas: ${P('48 horas')} = límite para ${D('solicitar la prórroga')} de la detención.` },
    { et: 'Inicio del plazo de posible prórroga', c: 'c', t: `${P('48 horas')} siguientes.` },
    { et: 'Puesto a disposición judicial', c: 'v', t: `${P('72 horas')} siguientes → Libertad / Prisión preventiva.` },
  ]));

  // ───── p99 · art. 547 · EDIFICIOS O LUGARES PÚBLICOS (fosforito real) ─────
  v('lecrim', 'Los buques del Estado', cols('SE REPUTARÁN EDIFICIOS O LUGARES PÚBLICOS (cuadro del temario · pág. 99 · art. 547)', [
    { t: 'Se reputarán edificios o lugares públicos para la observancia de lo dispuesto en este capítulo', l: [
      `1.º Los que estuvieren destinados a cualquier ${Y('servicio oficial, militar o civil del Estado')}, de la provincia o del Municipio, ${K('aunque habiten allí los encargados de dicho servicio')} o los de la conservación y custodia del edificio o lugar.`,
      `2.º Los que estuvieren destinados a cualquier establecimiento de ${Y('reunión o recreo')}, ${K('fueren o no lícitos')}.`,
      `3.º Cualesquiera otros edificios o lugares ${Y('cerrados')} que ${K('no constituyeren domicilio de un particular')} con arreglo a lo dispuesto en el artículo 554.`,
      `4.º ${Y('Los buques del Estado')}.`] },
  ]));

  // ───── p101 · art. 554 · SE REPUTARÁ COMO DOMICILIO (fosforito real) ─────
  v('lecrim', 'conocimiento de terceros', arbol('SE REPUTARÁ COMO DOMICILIO (cuadro del temario · pág. 101 · art. 554)', `Se reputará como ${Y('domicilio')}`, [
    `1.º Los ${Y('Palacios Reales')}, ${K('estén o no habitados por el Monarca')} al tiempo de la entrada o registro.`,
    `2.º El ${Y('edificio o lugar cerrado')}, o la parte de él destinada principalmente a la ${Y('habitación')} de cualquier español o extranjero residente en España y de su familia.`,
    `3.º Los ${Y('buques nacionales mercantes')}.`,
    `4.º Tratándose de ${Y('personas jurídicas')} imputadas, el espacio físico que constituya el ${Y('centro de dirección')} de las mismas, ya se trate de su domicilio social o de un establecimiento dependiente, ${K('o')} aquellos otros lugares en que se ${Y('custodien documentos')} u otros soportes de su vida diaria que quedan ${Y('reservados al conocimiento de terceros')}.`,
  ]));

  // ───── p104 · art. 569 · PRÁCTICA DEL REGISTRO (método) ─────
  v('lecrim', 'se expedirá una certificación del acta a la parte interesada si la reclamare', flujo('PRÁCTICA DEL REGISTRO · Art. 569 LECr (cuadro del temario · pág. 104)', [
    { et: 'Se realizará en presencia de', c: 'o', t: `1.º ${Y('Interesado')}, o de la persona que legítimamente le represente. Si no fuere habido, o no quisiere concurrir ni nombrar representante → 2.º Un individuo de su ${Y('familia mayor de edad')}. Si no lo hubiere → 3.º ${Y('Dos testigos')}, vecinos del mismo pueblo.` },
    { et: 'Resistencia', c: 'v', t: `La ${D('resistencia')} de alguna de estas personas producirá ${Y('responsabilidad penal')} por el delito de ${Y('desobediencia grave a la Autoridad')} (sin perjuicio de que la diligencia de registro se practique).` },
    { et: 'SIEMPRE', c: 'c', t: `${G('Secretario del Juzgado o Tribunal')} que hubiere autorizado el registro, o del ${G('Secretario del servicio de guardia')} que le sustituya.` },
    { et: 'Quién levantará', c: 'c', t: `${D('Acta')} del resultado, de la diligencia y de sus incidencias. En caso de necesidad: el Secretario Judicial podrá ser sustituido conforme a la ${G('Ley Orgánica del Poder Judicial')}.` },
  ]));

  // ───── p105 · arts. 548-562 · LUGAR / NOTIFICACIÓN / PERSONA A NOTIFICAR (método) ─────
  v('lecrim', 'observando las formalidades prescritas en la Constitución del Estado y en las leyes', tabla('LUGAR · NOTIFICACIÓN · PERSONA A NOTIFICAR (cuadro del temario · pág. 105 · arts. 548-562)', ['LUGAR → NOTIFICACIÓN', 'PERSONA A NOTIFICAR'], [
    { l: 'PALACIO DE LOS CUERPOS COLEGISLADORES (Sedes del Congreso o del Senado) → Se solicita AUTORIZACIÓN', c: 'o', h: [{ p: 'art. 548', c: 'o', t: `El juez necesitará ${Y('autorización del Presidente de la Cámara')} respectiva.` }] },
    { l: 'TEMPLOS Y DEMÁS LUGARES RELIGIOSOS → RECADO DE ATENCIÓN', c: 'v', h: [{ p: 'art. 549', c: 'v', t: `Bastará pasar ${Y('recado de atención')} a las personas a cuyo cargo estuvieren.` }] },
    { l: 'PALACIO EN EL QUE SE HALLE RESIDIENDO EL MONARCA → REAL LICENCIA', c: 'o', h: [{ p: 'art. 555', c: 'o', t: `El juez solicitará ${Y('Real Licencia')} por conducto del ${G('Mayordomo Mayor de Su Majestad')} (hoy Jefe de la Casa Real).` }] },
    { l: 'SITIOS REALES EN LOS QUE NO HAYA ESTADO EL MONARCA → LICENCIA', c: 'v', h: [{ p: 'art. 556', c: 'v', t: `Será necesaria ${Y('Licencia del Jefe o empleado del servicio de S.M.')} que tuviere a su cargo la custodia del edificio o la del que haga sus veces cuando se solicite, si estuviere ausente.` }] },
    { l: 'DOMICILIOS Y OFICINAS DE REPRESENTANTES EXTRANJEROS ACREDITADOS EN ESPAÑA (EMBAJADAS) → VENIA (atento oficio)', c: 'o', h: [{ p: 'arts. 559-560', c: 'o', t: `El juez les pedirá su ${Y('venia')}, por medio de ${D('atento oficio')}, en el que les rogará que contesten en el término de ${P('doce horas')}. ${D('Si transcurriere')} este término sin haberlo hecho, o si ${D('denegare la venia')}, el Juez lo comunicará inmediatamente al ${G('Ministro de Gracia y Justicia (hoy Ministerio de Justicia)')} empleando para ello el telégrafo, si lo hubiere. Entretanto que el Ministro no le comunique su resolución, se abstendrá de entrar y registrar en el edificio; pero adoptará las ${D('medidas de vigilancia')} a que se refiere el artículo 567.` }] },
    { l: 'DOMICILIOS Y OFICINAS DE CÓNSULES EXTRANJEROS (CONSULADOS) → RECADO DE ATENCIÓN', c: 'v', h: [{ p: 'art. 562', c: 'v', t: `Se podrá entrar en las ${Y('habitaciones de los Cónsules extranjeros')} y sus ${Y('oficinas')} pasándoles previamente ${Y('recado de atención')} y observando las formalidades prescritas en la Constitución del Estado y en las leyes.` }] },
    { l: 'BUQUES EXTRANJEROS DE GUERRA → AUTORIZACIÓN', c: 'o', h: [{ p: 'art. 561', c: 'o', t: `La falta de ${Y('autorización del Comandante')} se suplirá por la del ${G('Embajador o Ministro de la nación')} a que pertenezcan.` }] },
  ]));

  // ───── p107 · art. 579 · 579.1 delitos y 579.4 sin autorización judicial (fosforito real) ─────
  v('lecrim', 'no sean usualmente utilizados para contener correspondencia individual', cols('ART. 579 · DELITOS (579.1) Y SUPUESTOS SIN AUTORIZACIÓN JUDICIAL (579.4) (cuadro del temario · pág. 107)', [
    { t: '579.1 · La investigación tenga por objeto alguno de los siguientes delitos', l: [
      `1.º ${Y('Delitos dolosos')} castigados con pena con ${K('límite máximo, al menos, tres años')} de prisión.`,
      `2.º Delitos cometidos en el seno de un ${Y('grupo u organización criminal')}.`,
      `3.º Delitos de ${Y('terrorismo')}.`] },
    { t: '579.4 · No se requerirá autorización judicial en los siguientes casos', l: [
      `a) ${Y('Envíos postales')} que, por sus propias características externas, ${K('no sean usualmente utilizados')} para contener correspondencia individual sino para servir al transporte y tráfico de ${Y('mercancías')} ${K('o')} en cuyo exterior se haga ${Y('constar su contenido')}.`,
      `b) Aquellas otras formas de envío de la correspondencia bajo el ${Y('formato legal de comunicación abierta')}, en las que resulte obligatoria una declaración externa de contenido o que incorporen la indicación expresa de que se autoriza su inspección.`,
      `c) Cuando la ${Y('inspección')} se lleve a cabo de acuerdo con la ${Y('normativa aduanera')} o proceda con arreglo a las ${Y('normas postales')} que regulan una determinada clase de envío.`] },
  ]));

  // ───── p119 · art. 588 quinquies c · DURACIÓN DE LA MEDIDA (manuscrito con rotulador) ─────
  v('lecrim', 'para evitar su utilización indebida', cols('DURACIÓN DE LA MEDIDA (cuadro manuscrito del temario · pág. 119 · arts. 588 ter g, 579.2, 588 quinquies c, 588 septies)', [
    { t: '1 · TELEFÓNICAS Y TELEMÁTICAS', l: [`${Y('Será')} ${P('de 3 meses')}.`, `${P('Prorrogable por periodos de')} ${Y('igual duración')}.`, `${P('Máximo 18 meses')}.`] },
    { t: '2 · CORRESPONDENCIA ESCRITA', l: [`${K('Hasta')} ${P('3 meses')}.`, `${P('Prorrogable por')} ${Y('iguales o inferiores periodos')}.`, `${P('Máximo 18 meses')}.`] },
    { t: '3 · MEDIOS DE SEGUIMIENTO Y LOCALIZACIÓN', l: [`${Y('Máximo')} ${P('de 3 meses')}.`, `${Y('EXCEPCIONALMENTE')}:`, `${P('Prórrogas por')} ${Y('el mismo o inferior plazo')}.`, `${P('Máximo 18 meses')}.`] },
    { t: '4 · REGISTRO REMOTO DE EQUIPOS INFORMÁTICOS', l: [`${Y('Máximo')} ${P('de 1 mes')}.`, `${P('Prorrogable por')} ${Y('iguales periodos')}.`, `${Y('Máximo')} ${P('3 meses')}.`] },
  ]));

  // ───── p119 · art. 588 octies · ORDEN DE CONSERVACIÓN DE DATOS (manuscrito con rotulador) ─────
  v('lecrim', 'responsabilidad descrita en el apartado 3 del artículo 588 ter e', flujo('ORDEN DE CONSERVACIÓN DE DATOS (cuadro manuscrito del temario · pág. 119 · art. 588 octies)', [
    { et: 'M. Fiscal o P.J.', c: 'o', t: `${G('M. Fiscal o P.J.')}: ${Y('podrá requerir a cualquiera la conservación y protección')}.` },
    { et: 'Máximo', c: 'c', t: `${P('Máximo de 90 días')}.` },
    { et: 'Prorrogable', c: 'v', t: `${Y('Prorrogable 1 vez hasta')}: ${Y('Juez autorice cesión')} o ${P('cumplan 180 días')}.` },
  ]));

  // ───── p123 · art. 588 bis e · DURACIÓN MEDIDAS TECNOLÓGICAS (método) ─────
  v('lecrim', 'finalizada ésta, cesará a todos los efectos', flujo('DURACIÓN MEDIDAS TECNOLÓGICAS (cuadro del temario · pág. 123 · arts. 588 bis e y siguientes)', [
    { et: 'REGLA GENERAL · Art. 588 bis e', c: 'o', t: `1. Las medidas tendrán la duración que: ${D('se especifique para cada una de ellas')}, y ${K('no podrán exceder')} del ${Y('tiempo imprescindible')} para el esclarecimiento de los hechos. 2. La medida podrá ser ${D('prorrogada')}: mediante ${Y('auto motivado')}, por el ${G('Juez competente')}; de oficio o previa petición razonada del solicitante; siempre que ${Y('subsistan las causas')} que la motivaron. 3. Transcurrido el plazo por el que resultó concedida la medida: sin haberse acordado su prórroga, o finalizada la prórroga → ${K('cesará a todos los efectos')}.` },
    { et: 'Interceptación de las comunicaciones telefónicas y telemáticas', c: 'v', t: `${Y('Duración máxima')}: ${P('3 meses')} (desde fecha de autorización judicial). ${D('Prórroga')}: por periodos sucesivos de ${Y('igual duración')} (3 meses) hasta el plazo máximo de ${P('18 meses')}.` },
    { et: 'Utilización de dispositivos técnicos de captación de la imagen, de seguimiento y de localización', c: 'v', t: `${Y('Duración máxima')}: ${P('3 meses')} (desde fecha de autorización judicial). ${D('Prórroga')}: sucesivas, por el ${Y('mismo o inferior plazo')} hasta un máximo de ${P('18 meses')} (${D('Excepcionalmente')}, el juez podrá acordar la prórroga, si así estuviera justificado a la vista de los resultados obtenidos con la medida).` },
    { et: 'Registros remotos sobre equipos informáticos', c: 'c', t: `${Y('Duración máxima')}: ${P('1 mes')}. ${D('Prórroga')}: ${Y('iguales periodos')} (1 mes) hasta un máximo de ${P('3 meses')}.` },
  ]));

  // ───── p124 · art. 757 · ÁMBITO DE APLICACIÓN (fosforito real) ─────
  v('lecrim', 'cualquiera que sea su cuantía o duración', flujo('ÁMBITO DE APLICACIÓN (cuadro del temario · pág. 124 · art. 757)', [
    { et: 'SE APLICA para enjuiciar DELITOS castigados con', c: 'o', t: `${Y('Pena privativa de libertad igual o inferior a 9 años')}.` },
    { c: 'v', t: `Cualesquiera ${Y('otras penas')} de distinta naturaleza bien sean: ${Y('Únicas')}, ${Y('Conjuntas')}, ${Y('Alternativas')} → ${Y('Cualquiera que sea su cuantía o duración')}.` },
  ]));

  // ───── p128 · art. 766 · autos del Juez de Instrucción/Penal: reforma y apelación (método) ─────
  v('lecrim', 'la vista dentro de los diez siguientes a la recepción de la causa en dicha Audiencia', cols('PROCEDIMIENTO ABREVIADO: RECURSOS CONTRA AUTOS (cuadro del temario · pág. 128 · art. 766.1-2)', [
    { t: 'En el procedimiento abreviado, contra los…', l: [`Autos del ${G('Juez de Instrucción')}.`, `Autos del ${G('Juez de lo Penal')}.`, `Que ${K('no estén exceptuados de recurso')}.`, `${D('Podrán ejercitarse')}: ${Y('RECURSO DE REFORMA')} y ${Y('RECURSO DE APELACIÓN')}.`] },
    { t: 'Efectos y reglas', l: [`${K('No suspenderán')} el curso del procedimiento (salvo que lo disponga la ley).`, `Recurso de apelación se podrá interponer: ${Y('subsidiariamente')} o ${Y('por separado')}.`, `${K('En ningún caso')} será necesario interponer previamente el de reforma para presentar la apelación (recurso de reforma es potestativo).`] },
  ]));

  // ───── p129 · art. 766.3-5 · PROCEDIMIENTOS RECURSO DE APELACIÓN (método) ─────
  v('lecrim', 'la vista dentro de los diez siguientes a la recepción de la causa en dicha Audiencia', cols('PROCEDIMIENTOS RECURSO DE APELACIÓN (cuadro del temario · pág. 129 · art. 766.3, 4 y 5)', [
    { t: 'Cuando se interponga POR SEPARADO', l: [
      `1.º ${D('Presentación')} de apelación: dentro de los ${P('5 días')} siguientes a la notificación del auto recurrido, o auto resolutorio del recurso de reforma. Mediante ${Y('escrito')} donde se expondrán motivos del recurso, se señalarán los particulares que hayan de testimoniarse y se acompañarán documentos justificativos de las peticiones.`,
      `2.º ${D('Admitido')} a trámite el recurso por el ${G('Juez')}: ${G('Secretario Judicial')} dará traslado a las demás partes personadas, que podrán, por un plazo de ${P('5 días')}: formular alegaciones por escrito; señalar otros particulares que deban ser testimoniados; presentar documentos justificativos de sus pretensiones. Finalizado el plazo en los ${P('2 días')} siguientes, se ${D('remitirá testimonio')} de los particulares señalados a la ${G('Audiencia respectiva')}.`] },
    { t: 'Cuando se interponga SUBSIDIARIAMENTE con el de reforma', l: [
      `${Y('Recurso de reforma')} resulta ${Y('total o parcialmente desestimado')}.`,
      `1.º ${G('Secretario Judicial')} dará traslado al recurrente para que, en un plazo de ${P('5 días')}: formule alegaciones, y pueda presentar documentos justificativos de sus peticiones.`,
      `2.º Se dará traslado a las demás partes personadas.`] },
    { t: 'Cuando se interponga CONTRA AUTOS QUE ACUERDEN', l: [
      `Auto que acuerde ${Y('prisión provisional')} de alguno de los investigados o encausados: ${D('Se podrá solicitar')}, en el escrito de interposición, ${Y('la celebración de vista')}; la vista la acordará la ${G('Audiencia respectiva')}.`,
      `Auto que acuerde ${Y('otras medidas cautelares')}: la Audiencia ${D('podrá acordar')} la celebración de una vista; Audiencia debe estimarlo conveniente.`,
      `El ${G('Secretario Judicial')} señalará la vista, en el respectivo supuesto, dentro de los ${P('10 días')} siguientes a la recepción de la causa en dicha Audiencia.`,
      `3.º ${D('RESOLUCIÓN')} por la ${G('Audiencia respectiva')}: dentro de los ${P('5 días')} siguientes. ${K('Excepcionalmente')}, la Audiencia podrá reclamar las actuaciones para su consulta (siempre que con ello no se obstaculice la tramitación de aquéllas), debiendo devolverse las actuaciones al Juez en el plazo máximo de ${P('3 días')}.`] },
  ]));
};
