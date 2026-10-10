// Tema 1 · Bloque 1 (págs. 1-10 del temario oficial: Exposición de motivos y LO 18/2003, arts. 1-22)
// 50 preguntas IA (1-ia-229 → 1-ia-278) + preguntas OFICIALES para los apartados con marca EX/EXOF sin pregunta oficial.
// Texto literal del temario oficial (2025-09-09-TEMA 1 COMPLETO.pdf). Uso:
//   node prompts/herramientas/preguntas-t1-bloque1.js --json <salida.json>   (solo genera, para medir el sesgo)
//   node prompts/herramientas/preguntas-t1-bloque1.js                        (inserta en test-oficial-conocimiento.html; idempotente)
const fs = require('fs');
const F = 'test-oficial-conocimiento.html';
const AP = 'Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional';
const L = 'ABCD';
// Cada pregunta: [ref, enunciado, opciones, correcta|null, cita, porque, dificultad]
//  - correcta = null → opciones[0] es la correcta y el script la coloca en la letra menos usada.
//  - correcta = n    → opciones ya en su orden final (combinadas «A y B…» o «señale la INCORRECTA» con posición fija).
const Q = [
// ── Exposición de motivos ──
['Exposición de motivos', 'España ratificó el Estatuto de la Corte Penal Internacional por instrumento de:',
 ['19 de octubre de 2000.', '25 de octubre de 2000.', '4 de octubre de 2000.', '17 de diciembre de 2000.'], null,
 'España ratificó, por instrumento de 19 de octubre de 2000 (depositado el 25 de octubre), el Estatuto de la Corte Penal Internacional adoptado en Roma el 17 de julio de 1998',
 'El 25 de octubre es la fecha del depósito, el 4 de octubre la de la LO 6/2000 que autorizó la ratificación y el 17 de diciembre de 2000 no aparece en el texto.', 'media'],
['Exposición de motivos', 'Conforme a lo dispuesto en su artículo 126, el Estatuto de la Corte Penal Internacional entró en vigor el:',
 ['25 de octubre de 2000.', '17 de julio de 1998.', '1 de julio de 2002.', 'Ninguna de las anteriores es correcta.'], 2,
 'Dicho Estatuto entró en vigor, conforme a lo dispuesto en su artículo 126, el 1 de julio de 2002',
 '17 de julio de 1998 es la adopción del Estatuto en Roma y 25 de octubre de 2000 el depósito del instrumento español; como C es correcta, D es falsa.', 'facil'],
['Exposición de motivos', 'La autorización para que España ratificase el Estatuto de la Corte Penal Internacional se concedió por:',
 ['La Ley Orgánica 6/2000, de 4 de octubre.', 'La Ley Orgánica 15/1994, de 1 de junio.', 'La Ley Orgánica 4/1998, de 1 de julio.', 'La Ley Orgánica 18/2003, de 10 de diciembre.'], null,
 'En virtud de la autorización concedida por la Ley Orgánica 6/2000, de 4 de octubre, España ratificó [...] el Estatuto',
 'Las LO 15/1994 y 4/1998 regulan la cooperación con los Tribunales para la ex-Yugoslavia y Ruanda; la LO 18/2003 es la propia ley de cooperación.', 'facil'],
['Exposición de motivos', 'La estructura de la Ley Orgánica 18/2003 es comparable a la que se siguió en la Ley Orgánica 15/1994, de 1 de junio, para la cooperación con el Tribunal Internacional para:',
 ['La ex-Yugoslavia.', 'La República de Ruanda.', 'Sierra Leona y Liberia.', 'Camboya.'], null,
 'comparable a la que se siguió en la Ley Orgánica 15/1994, de 1 de junio, para la cooperación con el Tribunal Internacional para el enjuiciamiento de los presuntos responsables de violaciones graves del derecho internacional humanitario cometidas en el territorio de la ex-Yugoslavia, y en la Ley Orgánica 4/1998, de 1 de julio, para la cooperación con el Tribunal Internacional para Ruanda',
 'Ruanda corresponde a la LO 4/1998; Sierra Leona, Liberia y Camboya no se citan.', 'media'],
['Exposición de motivos', 'Según la exposición de motivos, la entrega a la Corte de una persona reclamada por la misma resulta imprescindible porque:',
 ['El Estatuto no permite dictar sentencias en rebeldía.', 'La Corte carece de establecimientos penitenciarios propios.', 'El Estatuto exige la presencia del Fiscal en el juicio oral.', 'Las reglas de procedimiento prohíben la videoconferencia.'], null,
 'Un elemento significativo de esta ley es la entrega a la Corte de una persona reclamada por la misma, que resulta imprescindible, pues el Estatuto no permite dictar sentencias en rebeldía',
 'Ninguno de los otros motivos aparece en la exposición de motivos.', 'facil'],
['Exposición de motivos', 'Cuando la causa se halla en un estadio inicial y el Fiscal de la Corte reclama la competencia, el Gobierno tiene el deber de recurrir ante:',
 ['La Sala de Cuestiones Preliminares.', 'La Sala de Apelaciones.', 'La Sala de Primera Instancia.', 'La Presidencia de la Corte Penal Internacional.'], null,
 'Cuando la causa se halla en un estadio inicial, en el momento procesal en que el Fiscal de la Corte reclama la competencia, el Gobierno tiene el deber de recurrir ante la Sala de Cuestiones Preliminares, pero cuando ésta ya se ha pronunciado sosteniendo la competencia de la Corte, el Gobierno tiene la facultad de apreciar soberanamente si se aquieta a esta decisión o interpone recurso ante la Sala de Apelaciones',
 'Ante la Sala de Apelaciones el Gobierno no tiene un deber sino una facultad; las otras dos no se mencionan.', 'media'],
['Exposición de motivos', 'Señale la respuesta INCORRECTA según la exposición de motivos:',
 ['El aspecto más significativo es la obligatoriedad de decretar la prisión provisional, siendo excepción la libertad provisional.', 'Se mantienen las fases gubernativas del modelo de la Ley de Extradición Pasiva de 1985.', 'Ni siquiera la existencia de cosa juzgada puede impedir la entrega, sin perjuicio de la valoración de la Corte.', 'La competencia para la entrega se residencia en el Juez Central de Instrucción de la Audiencia Nacional.'], 1,
 'A diferencia del modelo que inspira la Ley de Extradición Pasiva de 1985, la intervención del Poder Ejecutivo es reducida, judicializándose todo el sistema y eliminándose las llamadas fases gubernativas',
 'Las fases gubernativas se eliminan, no se mantienen; A, C y D reproducen la exposición de motivos.', 'media'],
['Exposición de motivos', 'Según la exposición de motivos, contra la decisión del Juez Central de Instrucción sobre la entrega cabe recurso de apelación ante la Sala de lo Penal, con motivos tasados, tal y como está previsto en el artículo de la Ley de Enjuiciamiento Criminal número:',
 ['790.', '766.', '779.', '847.'], null,
 'con un recurso de apelación ante la Sala de lo Penal, con motivos tasados, tal y como está previsto en el artículo 790 de la Ley de Enjuiciamiento Criminal, en el procedimiento abreviado',
 'El art. 766 LECrim es el que rige la apelación sobre la situación personal (art. 17.1 de la ley), no la de la entrega.', 'media'],
// ── Arts. 4-6 ──
['art. 4.d)', 'El Ministerio de Defensa y el Ministerio del Interior son autoridades competentes para la aplicación de esta ley:',
 ['Cuando el acto de cooperación afecte a sus competencias.', 'En todo caso, cuando intervinieran factores de política exterior.', 'Únicamente en los supuestos de entrega temporal a la Corte.', 'Cuando lo acuerde el Consejo de Ministros a propuesta conjunta.'], null,
 'd) El Ministerio de Defensa y el Ministerio del Interior, cuando el acto de cooperación afecte a sus competencias',
 'B es la coletilla del Ministerio de Asuntos Exteriores (art. 4.c); C y D no aparecen en el artículo.', 'facil'],
['art. 4', 'Según el artículo 4, son autoridades competentes para la aplicación de esta ley:',
 ['El Ministerio Fiscal.', 'Los órganos judiciales militares y, en particular, el Tribunal Militar Central.', 'El Consejo General del Poder Judicial.', 'A y B son correctas.'], 3,
 'f) Los órganos judiciales militares y, en particular, el Tribunal Militar Central. g) El Ministerio Fiscal',
 'El Consejo General del Poder Judicial no figura en la lista del art. 4, por lo que solo A y B son correctas.', 'facil'],
['art. 5.1', 'Cuando el procedimiento ante la Corte afecte a materias propias de algún departamento ministerial:',
 ['Se oirá a éste antes de impartir las instrucciones.', 'Será éste quien imparta las instrucciones al Abogado del Estado.', 'Se le informará una vez concluido el procedimiento ante la Corte.', 'Asumirá la representación y defensa en juicio de España.'], null,
 'En los supuestos en que el procedimiento afecte a materias propias de algún departamento ministerial, se oirá a éste antes de impartir las citadas instrucciones',
 'Las instrucciones las imparten conjuntamente Justicia y Asuntos Exteriores, y la representación corresponde a los Abogados del Estado.', 'media'],
['art. 5.2', 'El Gobierno podrá acordar que una persona especialmente designada al efecto actúe como agente de España en un determinado procedimiento ante los órganos de la Corte:',
 ['Por motivos excepcionales y oído el Abogado General del Estado.', 'En todo caso y previo informe del Consejo de Estado.', 'Por motivos de urgencia y oído el Fiscal General del Estado.', 'Por motivos excepcionales y previo acuerdo de las Cortes.'], null,
 'El Gobierno, por motivos excepcionales y oído el Abogado General del Estado, podrá acordar que una persona, especialmente designada al efecto, actúe como agente de España',
 'Ni el Consejo de Estado, ni el Fiscal General, ni las Cortes intervienen; los motivos han de ser excepcionales.', 'media'],
['art. 6.1', 'El Ministerio de Justicia es el único órgano de relación entre la Corte y los órganos judiciales y el Ministerio Fiscal, sin perjuicio de las competencias del:',
 ['Ministerio de Asuntos Exteriores.', 'Ministerio del Interior.', 'Ministerio de Defensa.', 'Consejo General del Poder Judicial.'], null,
 'El Ministerio de Justicia es el único ÓRGANO DE RELACIÓN entre la Corte, por un lado, y los órganos judiciales y Ministerio Fiscal, por otro, sin perjuicio de las competencias del Ministerio de Asuntos Exteriores',
 'Interior y Defensa solo informan cuando la consulta afecta a su ámbito (art. 6.2).', 'facil'],
['art. 6.2', 'Como órgano de consulta con la Corte en los casos previstos en el Estatuto, el Ministerio de Justicia deberá:',
 ['Informar previamente de cada consulta al Ministerio de Asuntos Exteriores.', 'Informar posteriormente de cada consulta al Ministerio de Asuntos Exteriores.', 'Recabar previamente la autorización del Consejo de Ministros.', 'Informar previamente de cada consulta al Ministerio del Interior.'], null,
 'El Ministerio de Justicia es también el ÓRGANO DE CONSULTA con la Corte en los casos previstos en el Estatuto, debiendo informar previamente de cada consulta al Ministerio de Asuntos Exteriores',
 'La información es previa (no posterior) y a Exteriores; a Interior o Defensa solo se les recaba informe si la materia les afecta.', 'media'],
// ── Art. 7 ──
['art. 7.1', 'La decisión del Gobierno de presentar la denuncia de una situación ante el Fiscal de la Corte se adopta mediante Acuerdo del Consejo de Ministros a propuesta:',
 ['Conjunta del Ministro de Asuntos Exteriores y del Ministro de Justicia.', 'Del Ministro de Justicia, oído el Fiscal General del Estado.', 'Conjunta del Ministro de Justicia y del Ministro del Interior.', 'Del Ministro de Asuntos Exteriores, previo informe del Consejo de Estado.'], null,
 'Corresponde exclusivamente al Gobierno, mediante Acuerdo del Consejo de Ministros, a propuesta conjunta del Ministro de Asuntos Exteriores y del Ministro de Justicia, decidir la presentación de la denuncia de una situación ante el Fiscal de la Corte',
 'La propuesta es siempre conjunta de Exteriores y Justicia; no intervienen Interior, el Fiscal General ni el Consejo de Estado.', 'facil'],
['art. 7.2', 'Los órganos que reciban una denuncia o querella por hechos sucedidos en otros Estados, de competencia de la Corte, se abstendrán de todo procedimiento, sin perjuicio de adoptar, si fuera necesario:',
 ['Las primeras diligencias urgentes para las que pudieran tener competencia.', 'Las medidas cautelares que solicite el denunciante o querellante.', 'La detención provisional de los presuntos autores de los hechos.', 'Las diligencias de investigación que acuerde el Ministerio Fiscal.'], null,
 'limitándose a informar al denunciante, querellante o solicitante de la posibilidad de acudir directamente al Fiscal de la Corte [...] sin perjuicio de adoptar, si fuera necesario, las primeras diligencias urgentes para las que pudieran tener competencia',
 'El precepto solo salva las primeras diligencias urgentes.', 'media'],
['art. 7.2', 'Señale la respuesta INCORRECTA. Para que el órgano judicial o fiscal español se abstenga de todo procedimiento conforme al artículo 7.2, se exige que:',
 ['Los hechos hayan sucedido en otros Estados.', 'Los presuntos autores no sean nacionales españoles.', 'Para su enjuiciamiento pudiera ser competente la Corte.', 'Las víctimas no tengan la nacionalidad española.'], 3,
 'en relación con hechos sucedidos en otros Estados, cuyos presuntos autores no sean nacionales españoles y para cuyo enjuiciamiento pudiera ser competente la Corte, dichos órganos se abstendrán de todo procedimiento',
 'La nacionalidad de las víctimas no es requisito; los otros tres sí lo son.', 'media'],
['art. 7.2', 'En las mismas circunstancias del artículo 7.2 (hechos en otros Estados, autores no españoles y posible competencia de la Corte), los órganos judiciales y el Ministerio Fiscal:',
 ['Podrán proceder de oficio con autorización del Ministerio de Justicia.', 'Deberán proceder de oficio cuando los hechos revistan especial gravedad.', 'Procederán de oficio solo si la Corte lo autoriza expresamente.', 'A y B son incorrectas.'], 3,
 'En iguales circunstancias, los órganos judiciales y el Ministerio Fiscal se abstendrán de proceder de oficio',
 'Se abstienen de proceder de oficio, sin excepciones: A y B son falsas (y C también), así que la correcta es D.', 'media'],
['art. 7.3', 'Si el Fiscal de la Corte no acordara la apertura de la investigación o la Corte acordara la inadmisibilidad del asunto, la denuncia, querella o solicitud:',
 ['Podrá ser presentada nuevamente ante los órganos correspondientes.', 'Deberá archivarse definitivamente por el órgano que la recibió.', 'Solo podrá reproducirse ante la Sala de Apelaciones de la Corte.', 'Será remitida de oficio por el Ministerio de Justicia al Supremo.'], null,
 'No obstante, si el Fiscal de la Corte no acordara la apertura de la investigación o la Corte acordara la inadmisibilidad del asunto, la denuncia, querella o solicitud podrá ser presentada nuevamente ante los órganos correspondientes',
 'El art. 7.3 reabre la vía española; no hay archivo definitivo ni remisión al Supremo.', 'facil'],
// ── Art. 8 ──
['art. 8.1', 'Recibida en el Ministerio de Justicia la notificación del Fiscal de la Corte de inicio de una investigación (art. 18.1 del Estatuto), dicho Ministerio solicitará información urgente sobre la existencia de actuaciones penales en España a:',
 ['El Fiscal General del Estado.', 'El Juez Central de Instrucción.', 'El Consejo General del Poder Judicial.', 'El Presidente de la Audiencia Nacional.'], null,
 'dicho departamento ministerial solicitará del Fiscal General del Estado información urgente sobre la existencia de actuaciones penales que se sigan o se hayan seguido en relación con los hechos objeto de la investigación',
 'La información se pide siempre al Fiscal General del Estado.', 'facil'],
['art. 8.1', 'El procedimiento del artículo 8.1 se activa cuando la investigación del Fiscal de la Corte se refiere a hechos cuyo conocimiento podría corresponder a la jurisdicción española:',
 ['Por haber acaecido en territorio español u ostentar sus presuntos responsables la nacionalidad española.', 'Por ser españolas las víctimas o por residir habitualmente en España los presuntos responsables de los hechos.', 'Por encontrarse en territorio español los presuntos responsables o los efectos del delito investigado.', 'Por haberse presentado ya denuncia o querella ante el Ministerio Fiscal o un juzgado español.'], null,
 'de tratarse de hechos cuyo conocimiento podría corresponder a la jurisdicción española por haber acaecido en territorio español u ostentar sus presuntos responsables la nacionalidad española',
 'Solo cuentan la territorialidad y la nacionalidad española de los presuntos responsables.', 'media'],
['art. 8', 'Señale la respuesta INCORRECTA sobre el requerimiento de inhibición al Fiscal de la Corte:',
 ['El Ministerio de Justicia pide información urgente al Fiscal General del Estado.', 'La propuesta al Consejo de Ministros la eleva en exclusiva el Ministro de Justicia.', 'La propuesta no puede rebasar los veinte días desde la notificación del Fiscal de la Corte.', 'Aprobado el Acuerdo, el Ministerio de Justicia formula la petición de inhibición.'], 1,
 'los Ministros de Justicia y de Asuntos Exteriores, en plazo que no podrá rebasar los veinte días desde la recepción de la notificación del Fiscal de la Corte, elevarán propuesta conjunta al Consejo de Ministros',
 'La propuesta es conjunta de los Ministros de Justicia y de Asuntos Exteriores, no exclusiva de Justicia.', 'media'],
['art. 8.2', 'El plazo de veinte días para elevar la propuesta conjunta al Consejo de Ministros sobre sostener la competencia española se computa desde:',
 ['La recepción de la notificación del Fiscal de la Corte.', 'La recepción de la información del Fiscal General del Estado.', 'El inicio de la investigación por las autoridades españolas.', 'La aprobación del Acuerdo por el Consejo de Ministros.'], null,
 'en plazo que no podrá rebasar los veinte días desde la recepción de la notificación del Fiscal de la Corte, elevarán propuesta conjunta al Consejo de Ministros',
 'El dies a quo es la recepción de la notificación del Fiscal de la Corte, no la del informe del Fiscal General.', 'media'],
['art. 8.4', 'La información que el Ministerio de Justicia transmita al Fiscal de la Corte sobre el estado de los procedimientos penales seguidos en España se transmitirá:',
 ['Con los límites de utilización que estableciere el órgano judicial que autorizare la información.', 'Con los límites que fije el Ministerio de Asuntos Exteriores por razones de política exterior.', 'Sin límite alguno de utilización, dado el carácter urgente de la petición de información.', 'Con los límites de utilización que estableciere el Fiscal General del Estado en su informe.'], null,
 'La información se transmitirá con los límites de utilización que estableciere el órgano judicial que autorizare la información',
 'Los límites los fija el órgano judicial que autoriza la información.', 'media'],
// ── Art. 9 ──
['art. 9.1', 'Señale la respuesta INCORRECTA. El Gobierno puede acordar la impugnación de la competencia de la Corte o de la admisibilidad de la causa cuando los tribunales españoles:',
 ['Hayan conocido del asunto y haya recaído sentencia.', 'Hayan decretado el sobreseimiento libre de la causa.', 'Hayan decretado el sobreseimiento provisional de la causa.', 'Estén conociendo del asunto.'], 2,
 'cuando los tribunales españoles hayan conocido del asunto y haya recaído sentencia, o se haya decretado el sobreseimiento libre de la causa o estén conociendo del asunto',
 'El precepto habla de sobreseimiento LIBRE, no provisional.', 'media'],
// ── Art. 11 ──
['art. 11.2', 'En la comparecencia ante el Juez Central de Instrucción, tras verificar la identidad del detenido, el contenido de la orden y las circunstancias del artículo 59.2 del Estatuto, el juez informará al detenido:',
 ['Del contenido de la orden de detención y de su derecho a solicitar la libertad provisional.', 'De su derecho a no declarar y a designar abogado de oficio para el proceso que se sigue ante la Corte.', 'Del plazo máximo de entrega a la Corte y de su derecho a recurrir en apelación el auto.', 'De su derecho a consentir la entrega y de que el consentimiento es siempre revocable.'], null,
 'informará al detenido del contenido de la orden de detención y de su derecho a solicitar la libertad provisional',
 'El precepto solo menciona el contenido de la orden y el derecho a solicitar la libertad provisional (y el consentimiento, cuando se da, es irrevocable: art. 13.4).', 'media'],
// ── Art. 12 ──
['art. 12.1', 'Si el detenido solicita la libertad provisional en la comparecencia, el Juez Central de Instrucción remitirá la solicitud a la Corte y, en la misma resolución, acordará:',
 ['La prisión provisional del detenido por el tiempo estrictamente necesario.', 'La libertad provisional con las medidas cautelares adecuadas.', 'La prisión provisional por un plazo máximo de ciento ochenta días.', 'La libertad provisional bajo fianza hasta recibir las recomendaciones.'], null,
 'En la misma resolución el Juez Central de Instrucción acordará la prisión provisional del detenido por el tiempo estrictamente necesario para recibir las recomendaciones de la Corte sobre dicha solicitud y hasta que se resuelva sobre ésta',
 'Los 180 días son el máximo de las medidas cautelares del art. 12.3, no de esta prisión provisional.', 'media'],
['art. 12.2', 'Recibidas las recomendaciones de la Corte, el Juez Central de Instrucción podrá acordar la libertad provisional del detenido cuando existan:',
 ['Circunstancias urgentes y excepcionales que lo justifiquen.', 'Razones humanitarias apreciadas por el Ministerio Fiscal.', 'Circunstancias graves y extraordinarias que lo aconsejen.', 'Recomendaciones favorables y vinculantes de la Corte.'], null,
 'podrá acordar la libertad provisional del detenido cuando existan circunstancias urgentes y excepcionales que lo justifiquen',
 'La coletilla literal es «urgentes y excepcionales»; las recomendaciones de la Corte se valoran pero no vinculan.', 'media'],
['art. 12.3', 'Si la Corte no remite en plazo la documentación para la entrega, el Juez Central de Instrucción podrá acordar la libertad provisional y medidas cautelares por un tiempo máximo de ciento ochenta días, sin perjuicio de:',
 ['Volver a decretar la prisión una vez recibida la documentación de la Corte.', 'Prorrogarlas por otros ciento ochenta días más a petición expresa de la Corte.', 'Que la Sala de Cuestiones Preliminares acuerde su revocación.', 'Remitir las actuaciones a la Sala de lo Penal de la Audiencia Nacional.'], null,
 'el Juez Central de Instrucción podrá acordar la libertad provisional y las medidas cautelares adecuadas, que se mantendrán por un tiempo máximo de ciento ochenta días, sin perjuicio de volver a decretar la prisión una vez recibida la documentación de la Corte',
 'La única salvedad es volver a decretar la prisión al recibir la documentación.', 'media'],
['art. 12.4', 'Cuando se acordare la libertad provisional del detenido, se informará:',
 ['A la Sala de Cuestiones Preliminares y, posteriormente, cuantas veces ésta lo solicite.', 'A la Sala de Apelaciones y, posteriormente, cada seis meses mientras dure la medida.', 'Al Fiscal de la Corte y, posteriormente, cada tres meses mientras dure la medida.', 'A la Presidencia de la Corte, únicamente en el momento de acordarse la libertad.'], null,
 'Cuando se acordare la libertad provisional, se informará a la Sala de Cuestiones Preliminares y, posteriormente, cuantas veces ésta lo solicite',
 'No hay periodicidad fija: se informa cuantas veces lo pida la Sala de Cuestiones Preliminares.', 'facil'],
// ── Art. 13 ──
['art. 13.4', 'En la comparecencia se informará al detenido de que el consentimiento a la entrega, una vez dado, es:',
 ['Irrevocable.', 'Revocable hasta la firmeza del auto de entrega.', 'Revocable dentro de los quince días siguientes.', 'Revocable solo con autorización de la Corte.'], null,
 'En la misma comparecencia se informará al detenido de que el consentimiento, una vez dado, es irrevocable',
 'Los quince días del art. 13.3 son para consentir tras haberse opuesto, no para revocar.', 'facil'],
['art. 13.2', 'Dictado el auto de entrega simplificada, el Juez Central de Instrucción remitirá urgentemente copia del auto:',
 ['Al Ministerio de Justicia, que informará de inmediato a la Corte.', 'Al Ministerio del Interior, que realizará el traslado sin más trámite.', 'A la Sala de lo Penal de la Audiencia Nacional, para su confirmación.', 'Al Fiscal General del Estado, que lo comunicará al Fiscal de la Corte.'], null,
 'El Juez Central de Instrucción remitirá urgentemente copia del auto al Ministerio de Justicia, que informará de inmediato a la Corte y solicitará indicaciones de ésta, en orden a la realización del traslado',
 'Interior interviene después, cuando Justicia le transmite las instrucciones de la Corte.', 'facil'],
['art. 13', 'Sobre la entrega simplificada a la Corte:',
 ['El consentimiento se interroga en la comparecencia regulada en el artículo 11.', 'Quien se hubiere opuesto podrá consentir dentro de los quince días siguientes.', 'Se admite siempre un consentimiento parcial respecto de cualquier hecho.', 'A y B son correctas.'], 3,
 'En la comparecencia regulada en el artículo 11 de esta ley se interrogará a la persona reclamada acerca de si consiente en su entrega [...] Fuera de este caso, no se admitirá un consentimiento parcial. [...] podrá dar su consentimiento dentro de los quince días siguientes',
 'El consentimiento parcial no se admite fuera del caso previsto, así que C es falsa y la correcta es D.', 'media'],
// ── Art. 14 ──
['art. 14', 'En el caso de una orden de comparecencia de la Corte, el juez de instrucción del domicilio o residencia de la persona buscada, tras citarla y adoptar las medidas de aseguramiento, remitirá las diligencias practicadas:',
 ['Al Ministerio de Justicia, que las transmitirá a la Corte.', 'Al Juez Central de Instrucción, que las elevará a la Corte.', 'Directamente a la Secretaría de la Corte Penal Internacional.', 'Al Ministerio de Asuntos Exteriores, que las transmitirá a la Corte.'], null,
 'remitiendo las diligencias practicadas al Ministerio de Justicia, que las transmitirá a la Corte',
 'El canal es siempre el Ministerio de Justicia.', 'facil'],
// ── Art. 15 ──
['art. 15.1', 'A la audiencia sobre la entrega a la Corte, que se celebra en el plazo máximo de diez días, podrá asistir e intervenir:',
 ['Un delegado del Fiscal de la Corte.', 'Un representante del Ministerio de Justicia.', 'Un magistrado de la Sala de Cuestiones Preliminares.', 'Un Abogado del Estado en representación de España.'], null,
 'A dicha audiencia podrá asistir e intervenir un delegado del Fiscal de la Corte',
 'El precepto solo prevé la asistencia de un delegado del Fiscal de la Corte (además de las partes citadas).', 'facil'],
['art. 15.1', 'En la audiencia sobre la entrega no se admitirán otras alegaciones o pruebas que las relativas a:',
 ['La concurrencia o no de los requisitos del artículo 91.2 o 3 del Estatuto.', 'La inocencia de la persona reclamada respecto de los hechos imputados.', 'La prescripción de los hechos conforme a la legislación penal española.', 'La nacionalidad española de la persona reclamada por la Corte.'], null,
 'No se admitirán otras alegaciones o pruebas que las relativas a la concurrencia o no de los requisitos establecidos en los apartados 2 o 3 del artículo 91 del Estatuto, sin perjuicio de lo dispuesto en el apartado siguiente',
 'Las alegaciones están tasadas: requisitos del art. 91.2 o 3 (y, por el apartado 2, la cosa juzgada).', 'media'],
['art. 15.2', 'Alegada la excepción de cosa juzgada, si de las consultas del Ministerio de Justicia con la Corte resultare que la causa ha sido declarada admisible por ésta:',
 ['El Juzgado Central de Instrucción denegará la entrega por cosa juzgada.', 'El Juzgado Central de Instrucción elevará la causa a la Sala de lo Penal.', 'El Juzgado Central de Instrucción alzará la suspensión.', 'Todas las respuestas anteriores son correctas.'], 2,
 'Si de tales consultas resultare que la causa ha sido declarada admisible por la Corte, el Juzgado Central de Instrucción alzará la suspensión',
 'Declarada admisible por la Corte, se alza la suspensión y sigue el procedimiento de entrega.', 'media'],
['art. 15.4', 'Si en el auto que resuelve sobre la petición de entrega se denegare ésta:',
 ['Podrá mantenerse la prisión provisional hasta la firmeza de dicha resolución.', 'Se pondrá inmediatamente en libertad a la persona, aunque no sea firme.', 'Podrá mantenerse la prisión provisional un máximo de ciento ochenta días.', 'El Ministerio Fiscal deberá recurrirlo en el plazo de tres días.'], null,
 'Si en el citado auto se denegare la entrega, podrá mantenerse la situación de prisión provisional hasta la firmeza de dicha resolución',
 'La libertad urgente se produce una vez firme la denegación (art. 15.6).', 'media'],
['art. 15', 'Señale la respuesta INCORRECTA sobre la entrega a la Corte:',
 ['La audiencia tendrá lugar en el plazo máximo de diez días.', 'Concluida la vista, se resolverá por auto en el plazo de tres días.', 'Si es estimatoria, una vez firme, se notificará de inmediato al Ministerio de Justicia.', 'Si es denegatoria y firme, el reclamado seguirá en prisión hasta que lo autorice la Corte.'], 3,
 'Si la resolución fuere denegatoria de la entrega, una vez firme, se pondrá urgentemente en libertad a la persona detenida y se comunicará al Ministerio de Justicia, que a su vez lo hará a la Corte',
 'Firme la denegación, se pone urgentemente en libertad al detenido; no se espera autorización de la Corte.', 'media'],
// ── Art. 16 ──
['art. 16.1', 'El régimen de solicitudes concurrentes del artículo 16 se aplica cuando con la solicitud de entrega de la Corte concurre una solicitud de extradición de un Estado:',
 ['Sea o no parte en el Estatuto.', 'Solo si es parte en el Estatuto.', 'Solo si existe tratado con España.', 'Solo si es Estado miembro de la UE.'], null,
 'Cuando concurriere con la solicitud de entrega de la Corte una solicitud de extradición de un Estado, sea o no parte en el Estatuto, o una orden europea de detención y entrega',
 'El precepto lo aplica al Estado requirente «sea o no parte» y también a la orden europea de detención y entrega.', 'facil'],
['art. 16', 'Señale la respuesta INCORRECTA sobre las solicitudes concurrentes:',
 ['Ambos procedimientos se tramitan conjuntamente en el Juzgado Central de Instrucción.', 'Cuando no existiere tratado, se dará preferencia a la solicitud del Estado requirente.', 'El Juez Central de Instrucción se abstendrá de decidir sobre la entrega.', 'Resuelve la Sala de lo Penal de la Audiencia Nacional.'], 1,
 'Cuando no existiere tratado, se dará preferencia a la solicitud de la Corte',
 'Sin tratado, la preferencia es para la Corte, no para el Estado requirente.', 'facil'],
// ── Art. 17 ──
['art. 17.1', 'El recurso de apelación contra las resoluciones del Juez Central de Instrucción relativas a la situación personal del reclamado se sustanciará conforme a lo previsto en el artículo de la Ley de Enjuiciamiento Criminal número:',
 ['766.', '790.', '779.', '803.'], null,
 'cabe recurso de apelación ante la Sala de lo Penal de la Audiencia Nacional, que se sustanciará conforme a lo previsto en el artículo 766 de la Ley de Enjuiciamiento Criminal y se resolverá por auto en el plazo de cinco días',
 'El art. 790 LECrim es el de la apelación contra el auto que resuelve sobre la entrega (art. 17.2).', 'media'],
['art. 17.2', 'En el escrito de formalización del recurso de apelación contra el auto que resuelve sobre la entrega solo podrán formularse alegaciones relativas a:',
 ['El quebrantamiento de las normas y garantías procesales en el expediente.', 'La concurrencia de los requisitos de los artículos 89.2 y 91.2 o 3 del Estatuto.', 'La valoración de la prueba sobre la culpabilidad del reclamado.', 'A y B son correctas.'], 3,
 'no se podrán formular otras alegaciones que las relativas a quebrantamiento de las normas y garantías procesales en el expediente y las relativas a la concurrencia de los requisitos establecidos en los artículos 89.2 y 91.2 o 3, según los casos, del Estatuto',
 'La culpabilidad no puede discutirse en este recurso: solo A y B.', 'media'],
// ── Arts. 19-22 ──
['art. 19.1', 'Si la Corte pide autorización a España para proceder por una conducta anterior a la entrega y no acompaña un acta con las observaciones de la persona entregada:',
 ['El Ministerio de Justicia pedirá a la Corte que le sea transmitida.', 'El órgano judicial denegará sin más la autorización solicitada.', 'El Juez Central de Instrucción oirá directamente a la persona entregada.', 'Se entenderá concedida la autorización si no se resuelve en diez días.'], null,
 'Si a la solicitud de la Corte no se acompañare un acta en la que se contengan las observaciones de la persona entregada, el Ministerio de Justicia pedirá a la Corte que le sea transmitida y una vez recibida se remitirá al órgano judicial competente',
 'La falta del acta no lleva a denegar ni a conceder: Justicia la pide a la Corte.', 'media'],
['art. 20.1', 'Recibida una solicitud de cooperación de la Corte (art. 93 del Estatuto), el Ministerio de Justicia acusará recibo e informará a la Corte acerca de:',
 ['El órgano interno al que se haya transmitido la solicitud.', 'El plazo en que se dará cumplimiento a la solicitud.', 'Los motivos por los que no puede prestarse la asistencia.', 'El coste estimado de la ejecución de la solicitud.'], null,
 'El Ministerio de Justicia acusará recibo e informará a la Corte acerca del órgano interno al que se haya transmitido la solicitud',
 'Exponer los motivos por los que no puede prestarse la asistencia es objeto de las consultas del art. 20.4.', 'media'],
['art. 20.4', 'Señale la respuesta INCORRECTA. El objeto de las consultas del Ministerio de Justicia con la Corte por dificultades en el cumplimiento de una solicitud será:',
 ['Exponer a la Corte la razón fundada por la que no puede prestarse la asistencia.', 'Considerar la posibilidad de atenderla de otra manera o con otras condiciones.', 'Estudiar la modificación o retirada de la solicitud de la Corte.', 'Imponer a la Corte las condiciones de ejecución fijadas por España.'], 3,
 'El objeto de las consultas será exponer a la Corte la razón fundada por la que no puede prestarse la asistencia solicitada, considerar la posibilidad de atenderla de otra manera o con arreglo a otras condiciones, estudiar su modificación o retirada, así como asegurar la protección de informaciones de carácter confidencial o restringido',
 'Las consultas buscan acuerdo; no se trata de imponer condiciones a la Corte.', 'facil'],
['art. 21.1', 'Señale la respuesta INCORRECTA sobre las personas citadas como peritos o testigos:',
 ['Citadas ante tribunales españoles por comisión rogatoria de la Corte, tienen las mismas obligaciones que en una causa española.', 'Si la comparecencia es en la sede de la Corte, tendrá carácter voluntario.', 'Los gastos de la comparecencia en la sede de la Corte se anticipan por el Ministerio de Justicia.', 'Para trasladar a un condenado por la Corte que cumple condena en España se necesita su consentimiento.'], 3,
 'No será necesario el consentimiento cuando se tratare de un condenado por la Corte que se encontrare cumpliendo condena en España, en cuyo caso se efectuará el traslado temporal',
 'Para el condenado por la Corte que cumple condena en España NO es necesario el consentimiento.', 'media'],
['art. 21.3', 'Las personas en tránsito en España para comparecer ante la Corte:',
 ['Gozarán de inmunidad.', 'Necesitarán autorización del Ministerio del Interior.', 'Quedarán a disposición del Juez Central de Instrucción.', 'Deberán ser custodiadas por la Policía Judicial.'], null,
 'Las personas en tránsito en España para comparecer ante la Corte gozarán de inmunidad',
 'El precepto solo establece su inmunidad.', 'facil'],
['art. 21.5', 'El Ministerio de Justicia, en coordinación con el Ministerio del Interior y, en su caso, otras Administraciones, podrá convenir con el Secretario de la Corte:',
 ['La acogida temporal de víctimas traumatizadas o de testigos en peligro por su testimonio.', 'La entrega temporal de los condenados que cumplen condena en establecimientos españoles.', 'El traslado a la sede de la Corte de testigos detenidos sin necesidad de su consentimiento.', 'La ejecución en España de las multas y órdenes de decomiso impuestas por la Corte.'], null,
 'podrá convenir con el Secretario de la Corte la acogida temporal de víctimas traumatizadas o de testigos que pudieran correr peligro por su testimonio',
 'El convenio con el Secretario se refiere a la acogida temporal de víctimas y testigos.', 'media'],
['art. 22', 'Señale la respuesta INCORRECTA sobre la ejecución de las penas en España:',
 ['La llegada del recluso se comunica al juez de vigilancia penitenciaria en veinticuatro horas.', 'Si la Corte designa otro Estado para seguir la ejecución, Justicia formulará observaciones.', 'Si el condenado se evade, Justicia informará con urgencia al Secretario de la Corte.', 'Para ejecutar una multa o decomiso, Justicia remite la documentación al Abogado del Estado.'], 3,
 'Cuando la petición de ejecución de la Corte se refiriese a una multa u orden de decomiso, el Ministerio de Justicia transmitirá la documentación pertinente al Fiscal General del Estado para que inste la ejecución ante el órgano judicial competente',
 'Multas y decomisos: la documentación va al Fiscal General del Estado, no al Abogado del Estado.', 'media'],
];

// Preguntas OFICIALES nuevas: apartados marcados por el usuario (EX/EXOF) sin pregunta oficial en el banco.
const OF = [
['art. 6.1 (EX)', 'Órganos de relación y consulta con la Corte. El único órgano de relación entre la Corte, por un lado, y los órganos judiciales y el Ministerio Fiscal, por otro, es:',
 ['El Ministerio de Justicia.', 'El Ministerio de Asuntos Exteriores.', 'El Consejo de Ministros.', 'La Audiencia Nacional.'],
 'El Ministerio de Justicia es el único ÓRGANO DE RELACIÓN entre la Corte, por un lado, y los órganos judiciales y Ministerio Fiscal, por otro, sin perjuicio de las competencias del Ministerio de Asuntos Exteriores'],
['art. 6.2 (EX)', 'Órganos de relación y consulta con la Corte. Cuando la consulta con la Corte incluya, a juicio del Ministerio de Asuntos Exteriores, aspectos de política exterior:',
 ['Será competente el Ministerio de Asuntos Exteriores, en coordinación con el Ministerio de Justicia.', 'Será competente el Ministerio de Justicia, previo informe del Ministerio de Asuntos Exteriores.', 'Decidirá el Consejo de Ministros a propuesta conjunta de los dos Ministerios afectados.', 'Será competente el Ministerio de Justicia, en coordinación con el Ministerio del Interior.'],
 'Cuando la consulta incluya, a juicio del Ministerio de Asuntos Exteriores, aspectos de política exterior, será éste el competente, en coordinación con el Ministerio de Justicia y, en su caso, con otros ministerios concernidos'],
['art. 12.3 (EXOF)', 'Libertad provisional. Si en el plazo establecido en las reglas de procedimiento y prueba la Corte no hubiera remitido la documentación para la entrega, el Juez Central de Instrucción podrá acordar la libertad provisional y las medidas cautelares adecuadas, que se mantendrán por un tiempo máximo de:',
 ['Ciento ochenta días.', 'Doscientos cuarenta días.', 'Noventa días naturales.', 'Sesenta días hábiles.'],
 'el Juez Central de Instrucción podrá acordar la libertad provisional y las medidas cautelares adecuadas, que se mantendrán por un tiempo máximo de ciento ochenta días, sin perjuicio de volver a decretar la prisión una vez recibida la documentación de la Corte'],
['art. 14 (EXOF)', 'Orden de comparecencia de un imputado ante la Corte. Cuando, en lugar de una solicitud de detención, la Corte hubiere dictado una orden de comparecencia, el Ministerio de Justicia remitirá la solicitud:',
 ['Al juez de instrucción del domicilio o residencia de la persona buscada.', 'Al Juez Central de Instrucción de la Audiencia Nacional que esté de guardia.', 'A la Sala de lo Penal de la Audiencia Nacional para su ejecución.', 'Al Fiscal General del Estado para que inste la comparecencia.'],
 'Cuando, en lugar de una solicitud de detención, la Corte hubiere dictado una orden de comparecencia, el Ministerio de Justicia remitirá la solicitud de la Corte al juez de instrucción del domicilio o residencia de la persona buscada'],
];

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const uso = { 0: 0, 1: 0, 2: 0, 3: 0 };
Q.forEach(q => { if (q[3] !== null) uso[q[3]]++; });
const ia = Q.map((q, i) => {
  let [ref, enun, ops, cor, cita, porque, dif] = q;
  ops = ops.slice();
  if (cor === null) {
    const ok = ops.shift();
    cor = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0];
    ops.splice(cor, 0, ok); uso[cor]++;
  }
  const letra = L[cor], txt = ops[cor].replace(/\.$/, '');
  const norma = ref === 'Exposición de motivos' ? 'exposición de motivos de la Ley Orgánica 18/2003' : `${ref} de la Ley Orgánica 18/2003`;
  return {
    id: '1-ia-' + (229 + i),
    pregunta: `Ley Orgánica 18/2003, ${ref === 'Exposición de motivos' ? 'exposición de motivos' : ref}. ${enun}`,
    opciones: ops, correcta: cor, dificultad: dif,
    explicacion: `<span class="ex-resp">Respuesta correcta: <b>${letra}</b> · <mark class="ex-key">${esc(txt)}</mark></span>La <span class="ref-norma">${norma}</span> dispone: <span class="ref-concepto">"${esc(cita)}"</span>. Por qué fallan las otras: ${esc(porque)} <em style="color:var(--texto-gris)">(Pregunta generada por IA · Dificultad: ${dif === 'facil' ? 'Fácil' : 'Media'})</em>`,
    apartado: AP };
});
const of = OF.map((q, i) => {
  const [ref, enun, ops0, cita] = q;
  const pos = [2, 0, 3, 1][i % 4], ops = ops0.slice(1); ops.splice(pos, 0, ops0[0]);
  const art = ref.replace(/ \(.*\)/, '');
  return {
    id: '1-' + (127 + i),
    pregunta: `Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional. ${enun}`,
    opciones: ops, correcta: pos,
    explicacion: `<span class="ex-resp">Respuesta correcta: <b>${L[pos]}</b> · <mark class="ex-key">${esc(ops0[0].replace(/\.$/, ''))}</mark></span> El <span class="ref-norma">${art} de la Ley Orgánica 18/2003</span> dispone: <span class="ref-concepto">"${esc(cita)}"</span>. Las demás opciones no se ajustan al texto del precepto.`,
    apartado: AP };
});

const a = process.argv.slice(2);
if (a[0] === '--json') { fs.writeFileSync(a[1], JSON.stringify(ia, null, 1)); fs.writeFileSync(a[1].replace(/\.json$/, '-of.json'), JSON.stringify(of, null, 1)); console.log(ia.length, 'IA +', of.length, 'oficiales · letras IA', JSON.stringify(uso)); process.exit(0); }

let s = fs.readFileSync(F, 'utf8');
const finObj = i0 => { let d = 0, inS = false, e = false, j = i0; for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === '\\') e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } } return j; };
// 1) oficiales tras 1-126
const ofN = of.filter(o => !s.includes(`{"id":"${o.id}"`));
if (ofN.length) { const i0 = s.indexOf('{"id":"1-126"'); if (i0 < 0) throw new Error('1-126 no encontrado'); const j = finObj(i0); s = s.slice(0, j + 1) + ofN.map(o => ',' + JSON.stringify(o)).join('') + s.slice(j + 1); }
// 2) bloque semilla IA tras el bloque del tema 1
const iaN = ia.filter(o => !s.includes(`{"id":"${o.id}"`));
if (iaN.length) { const k = s.indexOf(']', s.indexOf('"apartado"', s.indexOf('{"id":"1-ia-228"'))); const m = '];syncSeedIA(1,seed)})();'; if (s.slice(k, k + m.length) !== m) throw new Error('fin del bloque del tema 1 no encontrado'); const p = k + m.length; s = s.slice(0, p) + '(function(){const seed=' + JSON.stringify(iaN) + ';syncSeedIA(1,seed)})();' + s.slice(p); }
fs.writeFileSync(F, s);
console.log('oficiales añadidas', ofN.length, '· IA añadidas', iaN.length);
