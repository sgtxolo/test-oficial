// 20 preguntas OFICIALES del Tema 1 (LO 18/2003) de la academia, sacadas del vídeo del 26/11/2026 (test «GCVOF_20261126»).
// El vídeo no marca la respuesta: está resuelta con el texto literal del temario. Quedan como 1-479 … 1-498.
// Inserta en test-oficial-conocimiento.html y enlaza con Esquemas (mapa) y temario subrayado. Idempotente.
// Uso (desde la carpeta del proyecto): node prompts/herramientas/oficiales-seras-t1.js
const fs = require('fs');
const BS = String.fromCharCode(92);
const NORMA = 'Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional';
const P = 'Ley Orgánica de Cooperación con la Corte Penal Internacional. ';
const Q = [];
// [apartado del enunciado + pregunta, opciones, correcta, lila (localizador), literal, explicación, párrafo del esquema, pieza del subrayado]
const q = (...a) => Q.push(a);

q('De la detención. Cuando fuera detenida una persona, en cumplimiento de una orden de la Corte Penal Internacional de detención provisional o de detención y entrega, la autoridad que practicare la detención, ¿cómo procederá?:', [
  'Comunicará la detención inmediatamente al Ministerio de Justicia y al Juez Central de Instrucción de la Audiencia Nacional, debiendo ser puesta la persona detenida a disposición del Juez Central de Instrucción sin demora y, en todo caso, dentro del plazo de setenta y dos horas siguientes a la detención.',
  'Comunicará la detención en el plazo máximo de setenta y dos horas al Ministerio de Justicia y al Juez Central de Instrucción de la Audiencia Nacional, debiendo ser puesta la persona detenida a disposición del Juez Central de Instrucción sin demora y, en todo caso, dentro del plazo de setenta y dos horas siguientes a la detención.',
  'Comunicará la detención inmediatamente al Ministerio de Justicia y al Juez Central de Instrucción de la Audiencia Nacional, debiendo ser puesta la persona detenida a disposición del Juez Central de Instrucción sin demora y, en todo caso, dentro del plazo de veinticuatro horas siguientes a la detención.',
  'Comunicará la detención, dentro del plazo de setenta y dos horas, al Ministerio de Justicia y al Juez Central de Instrucción de la Audiencia Nacional, debiendo ser puesta la persona detenida a disposición del Juez Central de Instrucción inmediatamente.'
], 0, 'Art. 11.1',
'Cuando fuere detenida una persona, en cumplimiento de una orden de la Corte de detención provisional o de detención y entrega, la autoridad que practicare la detención lo comunicará inmediatamente al Ministerio de Justicia y al Juez Central de Instrucción de la Audiencia Nacional, debiendo ser puesta dicha persona a disposición del Juez Central de Instrucción sin demora y, en todo caso, dentro del plazo de setenta y dos horas siguientes a la detención.',
'Dos tiempos distintos: la comunicación es <b>inmediata</b> y la puesta a disposición es sin demora y, como máximo, en <b>72 horas</b>. Las falsas ponen plazo a la comunicación o cambian las 72 horas por 24 o por «inmediatamente».', '46-0', 'l-11');

q('De la libertad provisional. Si el detenido solicitara, en la comparecencia prevista en la ley objeto de la pregunta, su libertad provisional, ¿cómo procederá el Juez Central de Instrucción?:', [
  'Acordará remitir la solicitud de libertad provisional a la Corte Penal Internacional, a través de la Sala de lo Penal de la Audiencia Nacional, con indicación del plazo para recibir sus recomendaciones que no será inferior a quince días.',
  'Acordará remitir la solicitud de libertad provisional a la Corte Penal Internacional, a través del Ministerio de Justicia, con indicación del plazo para recibir sus recomendaciones que no será inferior a veinte días.',
  'Acordará remitir la solicitud de libertad provisional a la Corte Penal Internacional, a través de la Sala de lo Penal de la Audiencia Nacional, con indicación del plazo para recibir sus recomendaciones que no será inferior a diez días.',
  'Acordará remitir la solicitud de libertad provisional a la Corte Penal Internacional, a través de la Sala de lo Penal de la Audiencia Nacional, con indicación del plazo para recibir sus recomendaciones que no será inferior a veinte días.'
], 1, 'Art. 12.1',
'Si el detenido solicitara, en la comparecencia prevista en el artículo anterior, su libertad provisional, el Juez Central de Instrucción acordará remitir dicha solicitud a la Corte, a través del Ministerio de Justicia, con indicación del plazo para recibir sus recomendaciones, que no será inferior a veinte días.',
'El canal con la Corte es siempre el <b>Ministerio de Justicia</b>, nunca la Sala de lo Penal, y el plazo mínimo son <b>veinte días</b>.', '47-0', 'l-12');

q('Objetivo y fuentes jurídicas. ¿Con qué carácter se aplicarán a la presente Ley las normas orgánicas y procesales de aplicación general?:', [
  'Con carácter supletorio.', 'Con carácter excluyente.', 'Con carácter complementario.', 'Con carácter exclusivo.'
], 0, 'Art. 1',
'Con carácter supletorio a esta ley se aplicarán las normas orgánicas y procesales de aplicación general.',
'Supletorio: solo entran en lo que esta ley no regula. No la excluyen ni se aplican en exclusiva.', '36-1', 'l-1');

q('De la orden de comparecencia de un imputado ante la Corte. Cuando, en lugar de una solicitud de detención, la Corte hubiera dictado una orden de comparecencia:', [
  'Todas las opciones son incorrectas.',
  'El Ministerio Fiscal remitirá la solicitud de la Corte al juez de instrucción del domicilio o residencia de la persona buscada.',
  'El Juez Central de Instrucción remitirá la solicitud de la Corte al juez de instrucción del domicilio o residencia de la persona buscada.',
  'El Fiscal General del Estado remitirá la solicitud de la Corte al Juez Central de Instrucción.'
], 0, 'Art. 14',
'Cuando, en lugar de una solicitud de detención, la Corte hubiere dictado una orden de comparecencia, el Ministerio de Justicia remitirá la solicitud de la Corte al juez de instrucción del domicilio o residencia de la persona buscada, el cual citará a ésta personalmente',
'Quien remite es el <b>Ministerio de Justicia</b>, y lo hace al juez de instrucción del domicilio o residencia. Ninguna de las otras tres opciones lo nombra, por eso todas son incorrectas.', '49-0', 'l-14');

q('De la ejecución de las penas en España. Por el __________ se transmitirán las oportunas informaciones al __________ para la realización del traslado, debiendo comunicarse por las autoridades penitenciarias al juez de vigilancia penitenciaria competente la llegada del recluso, en un plazo de __________:', [
  'Ministerio del Interior / Ministerio de Justicia / veinticuatro horas.',
  'Ministerio de Justicia / Ministerio del Interior / veinticuatro horas.',
  'Ministerio de Justicia / Ministerio del Interior / setenta y dos horas.',
  'Ministerio del Interior / Ministerio de Justicia / setenta y dos horas.'
], 1, 'Art. 22.1',
'Por el Ministerio de Justicia se transmitirán las oportunas informaciones al Ministerio del Interior para la realización del traslado, debiendo comunicarse por las autoridades penitenciarias al juez de vigilancia penitenciaria competente la llegada del recluso, en un plazo de veinticuatro horas.',
'<b>Justicia</b> informa a <b>Interior</b> (que hace el traslado) y la llegada se comunica en <b>24 horas</b>.', '57-1', 'l-22');

q('De las personas sujetas a la jurisdicción de la Corte. Señale la opción CORRECTA:', [
  'Las personas en tránsito en España para comparecer ante la Corte Penal Internacional gozarán de inmunidad.',
  'Todas las opciones son correctas.',
  'Cuando hubieren de comparecer ante la Corte Penal Internacional agentes españoles en calidad de perito o testigo, el Ministerio del Interior, en coordinación, en su caso, con otros Ministerios o Administraciones de que dependan, solicitará de la Corte su protección.',
  'Cuando hubieren de comparecer ante la Corte Penal Internacional funcionarios españoles en calidad de perito o testigo, el Ministerio del Interior, en coordinación, en su caso, con otros Ministerios o Administraciones de que dependan, solicitará de la Corte su protección.'
], 0, 'Art. 21.3',
'Las personas en tránsito en España para comparecer ante la Corte gozarán de inmunidad.',
'Las dos opciones de agentes y funcionarios fallan porque la protección la pide el <b>Ministerio de Justicia</b>, no el del Interior (apartado 4).', '56-4', 'l-21');

q('Solicitudes concurrentes. Cuando concurriere con la solicitud de entrega de la Corte Penal Internacional una solicitud de extradición de un Estado, sea o no parte en el Estatuto de la Corte Penal Internacional, o una orden europea de detención y entrega, se notificará este hecho a la Corte y al Estado requirente y se tramitarán conjuntamente ambos procedimientos en el Juzgado Central de Instrucción que estuviere conociendo de la solicitud de entrega. Respecto a la decisión sobre la entrega en el caso reseñado, señale la opción CORRECTA:', [
  'El Juez Central de Instrucción decidirá sobre la entrega, elevando ambos procesos a la Sala de lo Penal de la Audiencia Nacional, que resolverá de acuerdo con el Estatuto de la Corte Penal Internacional y, en su caso, de acuerdo con el tratado que existiera con el Estado requirente. Cuando no existiera tratado, se dará preferencia a la solicitud a la Corte Penal Internacional.',
  'El Juez Central de Instrucción se abstendrá de decidir sobre la entrega, elevando ambos procesos a la Sala de lo Penal de la Audiencia Nacional, que resolverá de acuerdo con el Estatuto de la Corte Penal Internacional y, en su caso, de acuerdo con el tratado que existiera con el Estado requirente. Cuando no existiera tratado, se dará preferencia a la solicitud a la Corte Penal Internacional.',
  'La Sala de lo Penal de la Audiencia Nacional se abstendrá de decidir sobre la entrega, elevando ambos procesos al Pleno de la Sala de lo Penal de la Audiencia Nacional, que resolverá de acuerdo con el Estatuto de la Corte Penal Internacional y, en su caso, de acuerdo con el tratado que existiera con el Estado requirente. Cuando no existiera tratado, se dará preferencia a la solicitud a la Corte Penal Internacional.',
  'El Juez Central de Instrucción se abstendrá de decidir sobre la entrega, elevando ambos procesos a la Sala de lo Penal de la Audiencia Nacional, que resolverá de acuerdo con el Estatuto de la Corte Penal Internacional y, en su caso, de acuerdo con el tratado que existiera con el Estado requirente. Cuando no existiera el Estatuto de la Corte Penal Internacional, se dará preferencia al tratado.'
], 1, 'Art. 16.2',
'El Juez Central de Instrucción se abstendrá de decidir sobre la entrega, elevando ambos procesos a la Sala de lo Penal de la Audiencia Nacional, que resolverá de acuerdo con el Estatuto y, en su caso, de acuerdo con el tratado que existiere con el Estado requirente. Cuando no existiere tratado, se dará preferencia a la solicitud de la Corte.',
'El juez <b>no decide</b> (se abstiene), resuelve la <b>Sala de lo Penal</b> (no su Pleno) y sin tratado manda la solicitud de la <b>Corte</b>.', '51-1', 'l-16');

q('De la intervención de España en calidad de «amicus curiae». Si España recibiere una invitación de la Corte para participar en un proceso en calidad de «amicus curiae»:', [
  'El Ministerio de Asuntos Exteriores consultará con el Ministerio del Interior para determinar la conveniencia u oportunidad de participar España en un proceso en calidad de «amicus curiae», y, en su caso, fijar los términos de dicha participación.',
  'El Ministerio del Interior consultará con el Ministerio de Asuntos Exteriores para determinar la conveniencia u oportunidad de participar España en un proceso en calidad de «amicus curiae», y, en su caso, fijar los términos de dicha participación.',
  'El Ministerio de Justicia consultará con el Ministerio de Asuntos Exteriores para determinar la conveniencia u oportunidad de participar España en un proceso en calidad de «amicus curiae», y, en su caso, fijar los términos de dicha participación.',
  'El Ministerio del Interior consultará con el Ministerio de Justicia para determinar la conveniencia u oportunidad de participar España en un proceso en calidad de «amicus curiae», y, en su caso, fijar los términos de dicha participación.'
], 2, 'Art. 24',
'Si España recibiere una invitación de la Corte para participar en un proceso en calidad de «amicus curiae», el Ministerio de Justicia consultará con el Ministerio de Asuntos Exteriores para determinar la conveniencia u oportunidad de hacerlo y, en su caso, fijar los términos de dicha participación.',
'Consulta <b>Justicia</b> a <b>Exteriores</b>. Interior no interviene en este artículo.', '59-0', 'l-24');

q('Disposición adicional tercera. De los órganos jurisdiccionales militares. Señale la opción INCORRECTA:', [
  'Las referencias que la ley objeto de la pregunta hace al Juzgado Central de Instrucción deben entenderse hechas, cuando la cooperación sea de la competencia de la jurisdicción militar, al Juzgado Togado Militar.',
  'Las referencias que la ley objeto de la pregunta hace a la Sala de lo Penal de la Audiencia Nacional deben entenderse hechas, cuando la cooperación sea de la competencia de la jurisdicción militar, al Tribunal Militar Central.',
  'Las referencias que la ley objeto de la pregunta hace al juzgado de vigilancia penitenciaria deben entenderse hechas, cuando la cooperación sea de la competencia de la jurisdicción militar, al Juez Togado Militar de Vigilancia Penitenciaria.',
  'Las referencias que la ley objeto de la pregunta hace al Ministerio Fiscal deben entenderse hechas, cuando la cooperación sea de la competencia de la jurisdicción militar, al Fiscal Jurídico Militar.'
], 0, 'Disposición adicional tercera.1',
'Las referencias que esta ley hace al Juzgado Central de Instrucción y a la Sala de lo Penal de la Audiencia Nacional deben entenderse hechas, cuando la cooperación sea de la competencia de la jurisdicción militar, al Juzgado Togado Militar Central Decano y al Tribunal Militar Central, respectivamente. En los mismos casos, las referencias que la ley hace al Ministerio Fiscal y al juzgado de vigilancia penitenciaria deben entenderse hechas al Fiscal Jurídico Militar y al Juez Togado Militar de Vigilancia Penitenciaria.',
'La incorrecta recorta el nombre: no es un Juzgado Togado Militar cualquiera, sino el <b>Juzgado Togado Militar Central Decano</b>. Las otras tres equivalencias son literales.', '61-2', 'l-fin');

q('De los recursos. Señale la opción CORRECTA:', [
  'Contra el auto del Juez Central de Instrucción en el que se resuelve sobre la entrega cabe recurso de apelación ante la Sala de lo Penal de la Audiencia Nacional.',
  'Contra las resoluciones del Juez Central de Instrucción relativas a la situación personal del reclamado cabe recurso de apelación ante el Pleno de la Sala de lo Penal de la Audiencia Nacional.',
  'Contra las resoluciones del Juez Central de Instrucción relativas a la situación personal del reclamado cabe recurso de súplica ante la Sala de lo Penal de la Audiencia Nacional.',
  'Contra el auto del Juez Central de Instrucción en el que se resuelve sobre la entrega cabe recurso de apelación ante el Pleno de la Sala de lo Penal de la Audiencia Nacional.'
], 0, 'Art. 17.2',
'Contra el auto del Juez Central de Instrucción en el que se resuelve sobre la entrega cabe recurso de apelación ante la Sala de lo Penal de la Audiencia Nacional',
'Tanto en la entrega como en la situación personal el recurso es de <b>apelación</b> ante la <b>Sala de lo Penal</b>: ni Pleno ni súplica.', '52-1', 'l-17');

q('De la solicitud para iniciar una investigación por el Fiscal de la Corte. ¿A quién corresponderá decidir la presentación de la denuncia de una situación ante el Fiscal de la Corte Penal Internacional?:', [
  'Exclusivamente al Gobierno, mediante Acuerdo del Consejo de Ministros, a propuesta conjunta del Ministro de Asuntos Exteriores y del Ministro de Justicia.',
  'Al Ministro de Justicia, exclusivamente a iniciativa del Ministro de Asuntos Exteriores.',
  'Exclusivamente al Gobierno, mediante Acuerdo del Consejo de Ministros, a propuesta conjunta del Ministro de Asuntos Exteriores y del Ministro del Interior.',
  'Exclusivamente al Gobierno, mediante Acuerdo del Consejo de Ministros, a propuesta conjunta del Ministro de Justicia y del Ministro del Interior.'
], 0, 'Art. 7.1',
'Corresponde exclusivamente al Gobierno, mediante Acuerdo del Consejo de Ministros, a propuesta conjunta del Ministro de Asuntos Exteriores y del Ministro de Justicia, decidir la presentación de la denuncia de una situación ante el Fiscal de la Corte',
'Propuesta conjunta de <b>Exteriores y Justicia</b>: las falsas meten a Interior o dejan la decisión a un solo ministro.', '42-0', 'l-7');

q('De los órganos de relación y consulta con la Corte. Señale la opción CORRECTA:', [
  'La Audiencia Nacional es el único órgano de relación entre la Corte Penal Internacional, por un lado, y los órganos judiciales y Ministerio Fiscal, por otro, sin perjuicio de las competencias del Ministerio de Asuntos Exteriores.',
  'La Audiencia Nacional es el órgano de consulta con la Corte Penal Internacional en los casos previstos en el Estatuto de la Corte Penal Internacional, debiendo informar previamente de cada consulta al Ministerio de Asuntos Exteriores.',
  'Cuando la consulta realizada a la Corte Penal Internacional por el órgano de consulta, incluya a juicio del Ministerio de Asuntos Exteriores, aspectos de política exterior, será éste el competente, en coordinación con el Ministerio de Justicia y, en su caso, con otros ministerios concernidos.',
  'En el supuesto de que la consulta realizada a la Corte Penal Internacional por el órgano de consulta, afecte a materias propias del ámbito de competencia de los Ministerios del Interior o Defensa, recabará la autorización previa de estos departamentos.'
], 2, 'Art. 6.2',
'Cuando la consulta incluya, a juicio del Ministerio de Asuntos Exteriores, aspectos de política exterior, será éste el competente, en coordinación con el Ministerio de Justicia y, en su caso, con otros ministerios concernidos.',
'El órgano de relación y de consulta es el <b>Ministerio de Justicia</b>, no la Audiencia Nacional; y a Interior o Defensa se les pide <b>informe</b>, no autorización.', '41-3', 'l-6');

q('De las autoridades competentes. ¿Quiénes NO son autoridades competentes para la aplicación de la ley objeto de la pregunta?:', [
  'Los órganos judiciales militares y, en particular, el Tribunal Militar Central.',
  'Los órganos judiciales de la jurisdicción ordinaria y, en particular, el Tribunal Supremo.',
  'El Ministerio de Defensa y el Ministerio del Interior, cuando el acto de cooperación afecte a sus competencias.',
  'El Gobierno.'
], 1, 'Art. 4, letra e)',
'e) Los órganos judiciales de la jurisdicción ordinaria y, en particular, la Audiencia Nacional.',
'En la jurisdicción ordinaria la ley destaca a la <b>Audiencia Nacional</b>, no al Tribunal Supremo. El Gobierno, Defensa e Interior y los órganos militares sí figuran en la lista.', '39-5', 'l-4');

q('De la impugnación de la competencia de la Corte o de la admisibilidad de la causa. Respecto a la impugnación de la competencia de la Corte Penal Internacional, señale la opción CORRECTA:', [
  'La impugnación de la competencia de la Corte Penal Internacional se formalizará a la mayor brevedad posible, antes del inicio del juicio en la Corte.',
  'La impugnación de la competencia de la Corte Penal Internacional se formalizará excepcionalmente en un momento posterior al inicio del juicio en la Corte, fundándose en este caso en el solo motivo de haberse producido ya cosa juzgada en España.',
  'La impugnación de la competencia de la Corte Penal Internacional se formalizará excepcionalmente en el momento de la iniciación del juicio en la Corte.',
  'Todas las opciones son correctas.'
], 3, 'Art. 9.2',
'Tal impugnación se formalizará a la mayor brevedad posible, antes del inicio del juicio en la Corte y, excepcionalmente, en el momento de su iniciación o en un momento posterior, fundándose en este último caso en el solo motivo de haberse producido ya cosa juzgada en España.',
'El apartado recoge los tres momentos: regla general <b>antes del juicio</b> y, excepcionalmente, al iniciarse o después (esto último solo por <b>cosa juzgada</b>).', '44-1', 'l-9');

q('De la ejecución de las penas en España. Señale la opción CORRECTA:', [
  'En caso de evasión del condenado, el Ministerio de Justicia informará con urgencia al Secretario de la Corte Penal Internacional de tal circunstancia y consultará con ella acerca de si España solicita su extradición al Estado en que se encuentra o si la Corte insta su entrega a dicho Estado.',
  'Los jueces de vigilancia penitenciaria y el Ministerio del Interior prestarán el máximo apoyo a Magistrados y funcionarios de la Corte Penal Internacional que se personaren en España para supervisar la ejecución de las penas.',
  'Cuando se celebre una vista en la Sala de Apelaciones acerca de una posible reducción de la pena de quien estuviere cumpliendo condena en España, corresponderá al Ministerio de Justicia determinar la conveniencia de la intervención procesal y los términos en que deba producirse.',
  'Todas las opciones son correctas.'
], 3, 'Art. 22 (apartados 3, 5 y 6)',
'3. Los jueces de vigilancia penitenciaria y el Ministerio del Interior prestarán el máximo apoyo a Magistrados y funcionarios de la Corte que se personaren en España para supervisar la ejecución de las penas. 5. Cuando se celebre una vista en la Sala de Apelaciones acerca de una posible reducción de la pena de quien estuviere cumpliendo condena en España, corresponderá al Ministerio de Justicia determinar la conveniencia de la intervención procesal y los términos en que deba producirse. 6. En caso de evasión del condenado, el Ministerio de Justicia informará con urgencia al Secretario de la Corte de tal circunstancia y consultará con ella acerca de si España solicita su extradición al Estado en que se encuentre o si la Corte insta su entrega a dicho Estado.',
'Las tres primeras opciones copian, cada una, un apartado distinto del mismo artículo (evasión, apoyo en la supervisión y vista de reducción de pena), así que son todas correctas.', '57-4', 'l-22');

q('De la representación y defensa procesal. ¿A quién corresponderá la representación y defensa en juicio en España ante los órganos de la Corte Penal Internacional y de acuerdo con qué instrucciones?:', [
  'Corresponderá a los Abogados ordinarios y de acuerdo con las instrucciones impartidas por el Colegio de Abogados respectivo.',
  'Corresponderá a los Abogados del Estado integrados en la Abogacía General del Estado y de acuerdo con las instrucciones impartidas conjuntamente, en cada caso, por el Ministerio de Justicia y el Ministerio del Interior.',
  'Corresponderá a los Abogados del Estado integrados en la Abogacía General del Estado y de acuerdo con las instrucciones impartidas conjuntamente, en cada caso, por el Ministerio de Justicia y el Ministerio de Asuntos Exteriores.',
  'Corresponderá a los Abogados del Estado integrados en la Abogacía General del Estado y de acuerdo con las instrucciones impartidas por el Ministerio de Justicia.'
], 2, 'Art. 5.1',
'La representación y defensa en juicio de España ante los órganos de la Corte corresponderá a los Abogados del Estado integrados en la Abogacía General del Estado y de acuerdo con las instrucciones impartidas conjuntamente, en cada caso, por el Ministerio de Justicia y el Ministerio de Asuntos Exteriores.',
'Abogados del Estado con instrucciones <b>conjuntas de Justicia y Exteriores</b>: ni Interior ni Justicia en solitario.', '40-0', 'l-5');

q('Del requerimiento de inhibición al Fiscal de la Corte. Recibida en el Ministerio de Justicia notificación del Fiscal de la Corte de inicio de una investigación, de tratarse de hechos cuyo conocimiento podría corresponder a la jurisdicción española por haber acaecido en territorio español u ostentar sus presuntos responsables la nacionalidad española, dicho departamento ministerial solicitará __________ información urgente sobre la existencia de actuaciones penales que se sigan o se hayan seguido en relación con los hechos objeto de la investigación, así como sobre si tienen competencia los tribunales españoles:', [
  'De la autoridad judicial competente conforme a lo establecido en el Estatuto de la Corte Penal Internacional.',
  'Del Fiscal General del Estado.',
  'Del Ministerio Fiscal.',
  'De la Fiscalía correspondiente al último domicilio conocido del presunto responsable de los hechos.'
], 1, 'Art. 8.1',
'dicho departamento ministerial solicitará del Fiscal General del Estado información urgente sobre la existencia de actuaciones penales que se sigan o se hayan seguido en relación con los hechos objeto de la investigación, así como sobre si tienen competencia los tribunales españoles.',
'Justicia pide la información urgente al <b>Fiscal General del Estado</b>, no al Ministerio Fiscal en general ni a un órgano judicial.', '43-0', 'l-8');

q('De la celebración del juicio y otras actuaciones procesales en España. Si la Corte Penal Internacional propusiere la celebración del juicio u otras actuaciones procesales en España, el Ministerio de Justicia comunicará a la Corte la decisión al respecto. ¿A quién tendrá que consultar previamente el Ministerio de Justicia para tomar la decisión reseñada en el presente enunciado?:', [
  'Al Ministerio de Asuntos Exteriores, al Ministerio del Interior y al Ministerio de Defensa.',
  'Al Ministerio del Interior, exclusivamente.',
  'Al Ministerio de Asuntos Exteriores, al Ministerio del Interior y a otras autoridades competentes.',
  'Al Ministerio de Asuntos Exteriores y al Ministerio de Defensa.'
], 2, 'Art. 25',
'Si la Corte propusiere la celebración del juicio u otras actuaciones procesales en España, el Ministerio de Justicia, previa consulta con los Ministerios de Asuntos Exteriores y del Interior y otras autoridades competentes, comunicará a la Corte la decisión al respecto.',
'Consulta previa a <b>Exteriores, Interior y otras autoridades competentes</b>. Defensa no se nombra.', '60-0', 'l-25');

q('De la cooperación activa. ¿Quiénes podrán dirigir, por conducto del Ministerio de Justicia, solicitudes de cooperación a la Corte que se consideren necesarias en el marco de un proceso que se siguiere en España y en los casos y condiciones que establece el Estatuto de Roma de la Corte Penal Internacional?:', [
  'Únicamente los órganos judiciales.',
  'Los órganos judiciales y el Ministerio Fiscal.',
  'Los órganos judiciales e INTERPOL.',
  'Únicamente el Ministerio Fiscal.'
], 1, 'Art. 3',
'Los órganos judiciales y el Ministerio Fiscal podrán dirigir, por conducto del Ministerio de Justicia, solicitudes de cooperación a la Corte que se consideren necesarias en el marco de un proceso que se siguiere en España y en los casos y condiciones que establece el artículo 93.10 del Estatuto.',
'La cooperación activa la pueden pedir <b>los dos</b>: órganos judiciales y Ministerio Fiscal, siempre a través de Justicia.', '38-0', 'l-3');

q('De la entrega a la Corte. Concluida la vista, el Juzgado Central de Instrucción resolverá sobre la petición de entrega por medio de auto. Respecto al auto y a la resolución dictada por el Juzgado Central de Instrucción, señale la opción CORRECTA:', [
  'Si la resolución fuera denegatoria de la entrega, una vez firme, se pondrá urgentemente en libertad a la persona detenida y se comunicará al Ministerio de Justicia, que a su vez lo hará a la Corte.',
  'Si en el auto se denegara la entrega, no podrá mantenerse la situación de prisión provisional hasta la firmeza de dicha resolución.',
  'Si la resolución fuera estimatoria, una vez firme, se notificará de inmediato a la Audiencia Nacional y por ésta se dará traslado seguidamente a la Corte.',
  'El auto será dictado en el plazo de cinco días, concluida la vista.'
], 0, 'Art. 15.6',
'Si la resolución fuere denegatoria de la entrega, una vez firme, se pondrá urgentemente en libertad a la persona detenida y se comunicará al Ministerio de Justicia, que a su vez lo hará a la Corte.',
'Las otras cambian un dato de los apartados 3 a 5: el auto es en <b>tres días</b>, si se deniega <b>podrá</b> mantenerse la prisión hasta la firmeza y la estimatoria se notifica al <b>Ministerio de Justicia</b>.', '50-5', 'l-15');

if (Q.length !== 20) throw new Error('faltan preguntas: ' + Q.length);
const L = 'ABCD';
const nuevas = Q.map(([en, op, c, loc, lit, exp], i) => ({
  id: '1-' + (479 + i), pregunta: P + en, opciones: op, correcta: c,
  explicacion: `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${op[c].replace(/\.$/, '')}</mark></span><span class="ref-norma">${loc} · ${NORMA}</span><span class="ref-concepto">"${lit}"</span>${exp}`,
  apartado: NORMA
}));

// 1) banco de preguntas
const F = 'test-oficial-conocimiento.html';
let s = fs.readFileSync(F, 'utf8');
const fin = i => { let d = 0, inS = false, e = false; for (let j = i; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return j + 1; } } };
let ancla = '1-478';
const pendientes = nuevas.filter(n => !s.includes('{"id":"' + n.id + '"'));
nuevas.forEach(n => {
  const i = s.indexOf('{"id":"' + n.id + '"');
  if (i >= 0) s = s.slice(0, i) + JSON.stringify(n) + s.slice(fin(i));
  else { const a = s.indexOf('{"id":"' + ancla + '"'); if (a < 0) throw new Error('sin ancla ' + ancla); const e = fin(a); s = s.slice(0, e) + ',' + JSON.stringify(n) + s.slice(e); }
  ancla = n.id;
});
fs.writeFileSync(F, s);

// 2) Esquemas: párrafo exacto (mapa fijo para futuras regeneraciones + mapa ya generado, sin tocar el resto)
const MF = 'prompts/herramientas/tema1/mapa-fijo-t1.json';
const mf = JSON.parse(fs.readFileSync(MF, 'utf8'));
Q.forEach((x, i) => { mf['1-' + (479 + i)] = x[6]; });
fs.writeFileSync(MF, JSON.stringify(mf, null, 1));
const MP = 'esquemas-datos/mapa-preguntas.js';
let mp = fs.readFileSync(MP, 'utf8');
const add = Q.map((x, i) => [String(479 + i), x[6]]).filter(([n]) => !mp.includes('"1-' + n + '":')).map(([n, p]) => `"1-${n}":"1-${p}",`).join('');
mp = mp.replace('window.MAPA_PREG={', 'window.MAPA_PREG={' + add);
fs.writeFileSync(MP, mp);

// 3) temario subrayado
const PE = 'expres-subrayado/t1-preg-extra.json';
const pe = JSON.parse(fs.readFileSync(PE, 'utf8'));
Q.forEach((x, i) => { pe['1-' + (479 + i)] = x[7]; });
fs.writeFileSync(PE, JSON.stringify(pe, null, 1));
const DS = 'expres-subrayado/datos-t1.js';
let ds = fs.readFileSync(DS, 'utf8');
const k = ds.indexOf('"preg":{'); if (k < 0) throw new Error('datos-t1 sin preg');
const addS = Q.map((x, i) => [String(479 + i), x[7]]).filter(([n]) => !ds.includes('"1-' + n + '":')).map(([n, p]) => `"1-${n}":"${p}",`).join('');
ds = ds.slice(0, k + 8) + addS + ds.slice(k + 8);
fs.writeFileSync(DS, ds);
// 4) Esquema clave: cada pregunta a su apartado (repetir si se regeneran clave-tests/t1-*.js; índices = n.º de <h2>/<h3> del esquema)
const porArt = [11, 11, 9, 11, 12, 12, 11, 12, 12, 11, 10, 9, 9, 10, 12, 9, 10, 12, 9, 11];   // 1-479 … 1-498
const lee = f => { const w = {}; new Function('window', fs.readFileSync(f, 'utf8'))(w); return w; };
const FE = 'clave-tests/t1-esq.js', FS = 'clave-tests/t1-sec.js';
const esq = lee(FE).CLAVE_ESQ[1], sec = lee(FS).CLAVE_SEC[1];
nuevas.forEach((n, i) => { if (!esq.includes(n.id)) esq.push(n.id); sec.forEach((a, j) => { if (a) sec[j] = a.filter(x => x !== n.id); }); sec[porArt[i]].push(n.id); });
const pon = (f, v) => { const t = fs.readFileSync(f, 'utf8'), k = t.indexOf('[1]=') + 4; fs.writeFileSync(f, t.slice(0, k) + JSON.stringify(v) + ';' + String.fromCharCode(10)); };
pon(FE, esq); pon(FS, sec);
console.log('preguntas', nuevas.length, '(nuevas', pendientes.length + ')', nuevas[0].id, '→', nuevas[19].id);
