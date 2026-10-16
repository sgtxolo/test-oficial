// Tema 7 · revisión del banco OFICIAL (16/10/2026): limpia restos de OCR (números de nota pegados a las palabras),
// corrige las preguntas que contradecían el temario, elimina las dudosas y pone a TODAS la corrección con
// artículo en morado + cita literal en rojo (verificada contra el texto oficial del PDF).
// Uso: node prompts/herramientas/tema7/fix-oficiales-t7.js --check   (solo verifica las citas)
//      node prompts/herramientas/tema7/fix-oficiales-t7.js           (aplica al HTML)
const fs = require('fs'), path = require('path');
const F = 'test-oficial-conocimiento.html', BS = String.fromCharCode(92), L = 'ABCD';
const TXT = path.join(__dirname, '..', '..', 'temario-limpio', 'tema7', 'oficial-paginas.txt');
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const LT = 'LOTC', LH = 'LO 1/1982';
// ---------- citas literales (id → [ref, cita, extra]) ----------
const C = {
  // Artículos de la LOTC
  a1_1: ['art. 1.1', 'El Tribunal Constitucional, como intérprete supremo de la Constitución, es independiente de los demás órganos constitucionales y está sometido sólo a la Constitución y a la presente Ley Orgánica.'],
  a4_1: ['art. 4.1', 'En ningún caso se podrá promover cuestión de jurisdicción o competencia al Tribunal Constitucional. El Tribunal Constitucional delimitará el ámbito de su jurisdicción y adoptará cuantas medidas sean necesarias para preservarla, incluyendo la declaración de nulidad de aquellos actos o resoluciones que la menoscaben; asimismo podrá apreciar de oficio o a instancia de parte su competencia o incompetencia.'],
  a5: ['art. 5', 'El Tribunal Constitucional está integrado por doce miembros, con el título de Magistrados del Tribunal Constitucional.'],
  a6_1: ['art. 6.1', 'El Tribunal Constitucional actúa en Pleno, en Sala o en Sección.'],
  a6_2: ['art. 6.2', 'Lo preside el Presidente del Tribunal y, en su defecto, el Vicepresidente y, a falta de ambos, el Magistrado más antiguo en el cargo y, en caso de igual antigüedad, el de mayor edad.'],
  a7_1: ['art. 7.1', 'El Tribunal Constitucional consta de dos Salas. Cada Sala está compuesta por seis Magistrados nombrados por el Tribunal en Pleno.'],
  a7_2: ['art. 7.2', 'El Presidente del Tribunal lo es también de la Sala Primera, que presidirá en su defecto, el Magistrado más antiguo y, en caso de igual antigüedad, el de mayor edad.'],
  a7: ['art. 7', 'El Tribunal Constitucional consta de dos Salas. Cada Sala está compuesta por seis Magistrados nombrados por el Tribunal en Pleno. Dos. El Presidente del Tribunal lo es también de la Sala Primera, que presidirá en su defecto, el Magistrado más antiguo y, en caso de igual antigüedad, el de mayor edad. Tres. El Vicepresidente del Tribunal presidirá en la Sala Segunda y, en su defecto, el Magistrado más antiguo y, en caso de igual antigüedad, el de mayor edad.'],
  a8_1: ['art. 8.1', 'el Pleno y las Salas constituirán Secciones compuestas por el respectivo Presidente o quien le sustituya y dos Magistrados.'],
  a8_2: ['art. 8.2', 'En el caso de admisión, el Pleno podrá deferir a la Sala que corresponda el conocimiento del asunto de que se trate, en los términos previstos en esta ley.'],
  a8_3: ['art. 8.3', 'Podrá corresponder también a las Secciones el conocimiento y resolución de aquellos asuntos de amparo que la Sala correspondiente les defiera en los términos previstos en esta ley.'],
  a9_1: ['art. 9.1', 'El Tribunal en Pleno elige de entre sus miembros por votación secreta a su Presidente y propone al Rey su nombramiento.'],
  a9_3: ['art. 9.3', 'El nombre del elegido se elevará al Rey para su nombramiento por un período de tres años, expirado el cual podrá ser reelegido por una sola vez.'],
  a10_3: ['art. 10.3', 'El Tribunal en Pleno, en ejercicio de su autonomía como órgano constitucional, elabora su presupuesto, que se integra como una sección independiente dentro de los Presupuestos Generales del Estado.'],
  a11: ['art. 11', 'Las Salas del Tribunal Constitucional conocerán de los asuntos que, atribuidos a la justicia constitucional, no sean de la competencia del Pleno. Dos. También conocerán las Salas de aquellas cuestiones que, habiendo sido atribuidas al conocimiento de las Secciones, entiendan que por su importancia deba resolver la propia Sala.'],
  a12: ['art. 12', 'La distribución de asuntos entre las Salas del Tribunal se efectuará según un turno establecido por el Pleno a propuesta de su Presidente.'],
  a13: ['art. 13', 'Cuando una Sala considere necesario apartarse en cualquier punto de la doctrina constitucional precedente sentada por el Tribunal, la cuestión se someterá a la decisión del Pleno.'],
  a14_pleno: ['art. 14', 'El Tribunal en Pleno puede adoptar acuerdos cuando estén presentes, al menos, dos tercios de los miembros que en cada momento lo compongan.'],
  a14_sec: ['art. 14', 'En las Secciones se requerirá la presencia de dos miembros, salvo que haya discrepancia, requiriéndose entonces la de sus tres miembros.'],
  a15: ['art. 15', 'El Presidente del Tribunal Constitucional ejerce la representación del Tribunal, convoca y preside el Tribunal en Pleno y convoca las Salas; adopta las medidas precisas para el funcionamiento del Tribunal, de las Salas y de las Secciones; comunica a las Cámaras, al Gobierno o al Consejo General del Poder Judicial, en cada caso, las vacantes; nombra a los letrados, convoca los concursos para cubrir las plazas de funcionarios y los puestos de personal laboral, y ejerce las potestades administrativas sobre el personal del Tribunal.'],
  a2_1g: ['art. 2.1.g)', 'g) De la verificación de los nombramientos de los Magistrados del Tribunal Constitucional, para juzgar si los mismos reúnen los requisitos requeridos por la Constitución y la presente Ley.'],
  a2_1: ['art. 2.1', 'd) De los conflictos entre los órganos constitucionales del Estado. d) bis. De los conflictos en defensa de la autonomía local. e) De la declaración sobre la constitucionalidad de los tratados internacionales.'],
  a2_2: ['art. 2.2', 'Estos reglamentos, que deberán ser aprobados por el Tribunal en Pleno, se publicarán en el «Boletín Oficial del Estado», autorizados por su Presidente.'],
  a27_2: ['art. 27.2', 'Son susceptibles de declaración de inconstitucionalidad: a) Los Estatutos de Autonomía y las demás Leyes orgánicas. b) Las demás Leyes, disposiciones normativas y actos del Estado con fuerza de Ley.'],
  a29_1: ['art. 29.1', 'La declaración de inconstitucionalidad podrá promoverse mediante: a) El recurso de inconstitucionalidad. b) La cuestión de inconstitucionalidad promovida por Jueces o Tribunales.'],
  a32_1: ['art. 32.1', 'a) El Presidente del Gobierno. b) El Defensor del Pueblo. c) Cincuenta Diputados. d) Cincuenta Senadores.'],
  a39_1: ['art. 39.1', 'Cuando la sentencia declare la inconstitucionalidad, declarará igualmente la nulidad de los preceptos impugnados, así como, en su caso, la de aquellos otros de la misma Ley, disposición o acto con fuerza de Ley a los que deba extenderse por conexión o consecuencia.'],
  a41_1: ['art. 41.1', 'Los derechos y libertades reconocidos en los artículos catorce a veintinueve de la Constitución serán susceptibles de amparo constitucional, en los casos y formas que esta Ley establece, sin perjuicio de su tutela general encomendada a los Tribunales de Justicia. Igual protección será aplicable a la objeción de conciencia reconocida en el artículo treinta de la Constitución.'],
  a42: ['art. 42', 'podrán ser recurridos dentro del plazo de tres meses desde que, con arreglo a las normas internas de las Cámaras o Asambleas, sean firmes.'],
  a44_1bc: ['art. 44.1', 'b) Que la violación del derecho o libertad sea imputable de modo inmediato y directo a una acción u omisión del órgano judicial con independencia de los hechos que dieron lugar al proceso en que aquellas se produjeron, acerca de los que, en ningún caso, entrará a conocer el Tribunal Constitucional. c) Que se haya denunciado formalmente en el proceso, si hubo oportunidad, la vulneración del derecho constitucional tan pronto como, una vez conocida, hubiera lugar para ello.'],
  a44_2: ['art. 44.2', 'El plazo para interponer el recurso de amparo será de 30 días, a partir de la notificación de la resolución recaída en el proceso judicial.'],
  a46_1b: ['art. 46.1.b)', 'En los casos de los artículos cuarenta y tres y cuarenta y cuatro, quienes hayan sido parte en el proceso judicial correspondiente, el Defensor del Pueblo y el Ministerio Fiscal.'],
  a47_1: ['art. 47.1', 'Podrán comparecer en el proceso de amparo constitucional, con el carácter de demandado o con el de coadyuvante, las personas favorecidas por la decisión, acto o hecho en razón del cual se formule el recurso o que ostenten un interés legítimo en el mismo.'],
  a47_2: ['art. 47.2', 'El Ministerio Fiscal intervendrá en todos los procesos de amparo, en defensa de la legalidad, de los derechos de los ciudadanos y del interés público tutelado por la Ley.'],
  a49_1: ['art. 49.1', 'El recurso de amparo constitucional se iniciará mediante demanda en la que se expondrán con claridad y concisión los hechos que la fundamenten, se citarán los preceptos constitucionales que se estimen infringidos y se fijará con precisión el amparo que se solicita para preservar o restablecer el derecho o libertad que se considere vulnerado. En todo caso, la demanda justificará la especial trascendencia constitucional del recurso.'],
  a49_2: ['art. 49.2', 'Con la demanda se acompañarán: a) El documento que acredite la representación del solicitante del amparo. b) En su caso, la copia, traslado o certificación de la resolución recaída en el procedimiento judicial o administrativo.'],
  a50_1: ['art. 50.1', 'La Sección, por unanimidad de sus miembros, acordará mediante providencia la admisión, en todo o en parte, del recurso solamente cuando concurran todos los siguientes requisitos'],
  a50_3: ['art. 50.3', 'Las providencias de inadmisión, adoptadas por las Secciones o las Salas, especificarán el requisito incumplido y se notificarán al demandante y al Ministerio Fiscal. Dichas providencias solamente podrán ser recurridas en súplica por el Ministerio Fiscal en el plazo de tres días. Este recurso se resolverá mediante auto, que no será susceptible de impugnación alguna.'],
  a51_1: ['art. 51.1', 'Admitida la demanda de amparo, la Sala requerirá con carácter urgente al órgano o a la autoridad de que dimane la decisión, el acto o el hecho, o al Juez o Tribunal que conoció del procedimiento precedente para que, en plazo que no podrá exceder de diez días, remita las actuaciones o testimonio de ellas.'],
  a52_1: ['art. 52.1', 'la Sala dará vista de las mismas a quien promovió el amparo, a los personados en el proceso, al Abogado del Estado, si estuviera interesada la Administración Pública, y al Ministerio Fiscal. La vista será por plazo común que no podrá exceder de veinte días, y durante él podrán presentarse las alegaciones procedentes.'],
  a52_2: ['art. 52.2', 'la Sala podrá deferir la resolución del recurso, cuando para su resolución sea aplicable doctrina consolidada del Tribunal Constitucional, a una de sus Secciones'],
  a52_3: ['art. 52.3', 'La Sala, o en su caso la Sección, pronunciará la sentencia que proceda en el plazo de 10 días a partir del día señalado para la vista o deliberación.'],
  a53: ['art. 53', 'La Sala o, en su caso, la Sección, al conocer del fondo del asunto, pronunciará en su sentencia alguno de estos fallos: a) Otorgamiento de amparo. b) Denegación de amparo.'],
  a55_1: ['art. 55.1', 'La sentencia que otorgue el amparo contendrá alguno o algunos de los pronunciamientos siguientes: a) Declaración de nulidad de la decisión, acto o resolución que hayan impedido el pleno ejercicio de los derechos o libertades protegidos, con determinación, en su caso, de la extensión de sus efectos. b) Reconocimiento del derecho o libertad pública, de conformidad con su contenido constitucionalmente declarado. c) Restablecimiento del recurrente en la integridad de su derecho o libertad con la adopción de las medidas apropiadas, en su caso, para su conservación.'],
  a56_12: ['art. 56.1 y 2', '1. La interposición del recurso de amparo no suspenderá los efectos del acto o sentencia impugnados. 2. Ello no obstante, cuando la ejecución del acto o sentencia impugnados produzca un perjuicio al recurrente que pudiera hacer perder al amparo su finalidad, la Sala, o la Sección en el supuesto del artículo 52.2, de oficio o a instancia del recurrente, podrá disponer la suspensión, total o parcial, de sus efectos, siempre y cuando la suspensión no ocasione perturbación grave a un interés constitucionalmente protegido, ni a los derechos fundamentales o libertades de otra persona.'],
  a56_3: ['art. 56.3', 'la Sala o la Sección podrá adoptar cualesquiera medidas cautelares y resoluciones provisionales previstas en el ordenamiento, que, por su naturaleza, puedan aplicarse en el proceso de amparo y tiendan a evitar que el recurso pierda su finalidad.'],
  // Artículos de la LO 1/1982
  h1_1: ['art. 1.1', 'El derecho fundamental al honor, a la intimidad personal y familiar y a la propia imagen, garantizado en el artículo dieciocho de la Constitución, será protegido civilmente frente a todo género de intromisiones ilegítimas, de acuerdo con lo establecido en la presente Ley Orgánica.'],
  h1_2: ['art. 1.2', 'El carácter delictivo de la intromisión no impedirá el recurso al procedimiento de tutela judicial previsto en el artículo 9.º de esta Ley.'],
  h1_3: ['art. 1.3', 'El derecho al honor, a la intimidad personal y familiar y a la propia imagen es irrenunciable, inalienable e imprescriptible.'],
  h2_3: ['art. 2.3', 'El consentimiento a que se refiere el párrafo anterior será revocable en cualquier momento, pero habrán de indemnizarse en su caso, los daños y perjuicios causados, incluyendo en ellos las expectativas justificadas.'],
  h3_1: ['art. 3.1', 'El consentimiento de los menores e incapaces deberá prestarse por ellos mismos si sus condiciones de madurez lo permiten, de acuerdo con la legislación civil.'],
  h3_2: ['art. 3.2', 'En los restantes casos, el consentimiento habrá de otorgarse mediante escrito por su representante legal, quien estará obligado a poner en conocimiento previo del Ministerio Fiscal el consentimiento proyectado. Si en el plazo de ocho días el Ministerio Fiscal se opusiere, resolverá el Juez.'],
  h4_1: ['art. 4.1', 'El ejercicio de las acciones de protección civil del honor, la intimidad o la imagen de una persona fallecida corresponde a quien ésta haya designado a tal efecto en su testamento. La designación puede recaer en una persona jurídica.'],
  h4_2: ['art. 4.2', 'No existiendo designación o habiendo fallecido la persona designada, estarán legitimados para recabar la protección el cónyuge, los descendientes, ascendientes y hermanos de la persona afectada que viviesen al tiempo de su fallecimiento.'],
  h4_3: ['art. 4.3', 'A falta de todos ellos, el ejercicio de las acciones de protección corresponderá al Ministerio Fiscal, que podrá actuar de oficio a instancia de persona interesada, siempre que no hubieren transcurrido más de ochenta años desde el fallecimiento del afectado.'],
  h7: ['art. 7', '4. La revelación de datos privados de una persona o familia conocidos a través de la actividad profesional u oficial de quien los revela. 5. La captación, reproducción o publicación por fotografía, filme, o cualquier otro procedimiento, de la imagen de una persona en lugares o momentos de su vida privada o fuera de ellos, salvo los casos previstos en el artículo octavo, dos. 6. La utilización del nombre, de la voz o de la imagen de una persona para fines publicitarios, comerciales o de naturaleza análoga.'],
  h8_1: ['art. 8.1', 'No se reputará, con carácter general, intromisiones ilegítimas las actuaciones autorizadas o acordadas por la Autoridad competente de acuerdo con la ley, ni cuando predomine un interés histórico, científico o cultural relevante.'],
  h8_2: ['art. 8.2', 'En particular, el derecho a la propia imagen no impedirá: a) Su captación, reproducción o publicación por cualquier medio cuando se trate de personas que ejerzan un cargo público o una profesión de notoriedad o proyección pública y la imagen se capte durante un acto público o en lugares abiertos al público. b) La utilización de la caricatura de dichas personas, de acuerdo con el uso social. c) La información gráfica sobre un suceso o acaecimiento público cuando la imagen de una persona determinada aparezca como meramente accesoria.'],
  h9_2: ['art. 9.2', 'b) Prevenir intromisiones inminentes o ulteriores. c) La indemnización de los daños y perjuicios causados. d) La apropiación por el perjudicado del lucro obtenido con la intromisión ilegítima en sus derechos.'],
  h9_3: ['art. 9.3', 'La existencia de perjuicio se presumirá siempre que se acredite la intromisión ilegítima.'],
  h9_5: ['art. 9.5', 'Las acciones de protección frente a las intromisiones ilegítimas caducarán transcurridos cuatro años desde que el legitimado pudo ejercitarlas.'],
};
// id → clave de cita (+ norma). Las que no figuran aquí ya traían la cita en rojo.
const M = {
  1: 'h1_2', 2: 'h9_5', 6: 'h3_2', 8: 'a44_2', 11: 'a5', 12: 'a51_1', 14: 'a4_1', 15: 'a55_1', 18: 'a7_2', 21: 'a10_3', 22: 'a50_3', 23: 'a7_1', 24: 'a51_1',
  25: 'a44_1bc', 27: 'a9_1', 28: 'a55_1', 29: 'a49_1', 30: 'a56_3', 31: 'a46_1b', 34: 'a32_1', 35: 'h9_3', 37: 'a39_1', 39: 'a29_1', 40: 'a2_2', 42: 'a56_12',
  43: 'h8_2', 44: 'a55_1', 45: 'a6_2', 46: 'h1_1', 47: 'a2_2', 48: 'h2_3', 51: 'a8_2', 53: 'a14_pleno', 54: 'a52_1', 55: 'a50_3', 57: 'a41_1', 58: 'a9_3',
  59: 'a13', 60: 'a7_1', 62: 'h3_2', 63: 'a10_3', 64: 'a53', 65: 'a2_1', 66: 'a2_1', 68: 'a49_2', 69: 'a7_1', 70: 'a6_1', 71: 'h9_2', 73: 'a49_1', 74: 'a2_2',
  75: 'a12', 76: 'a44_1bc', 77: 'a52_1', 79: 'h3_1', 80: 'a15', 81: 'a11', 83: 'a14_pleno', 85: 'a10_3', 86: 'h4_3', 89: 'a52_3', 90: 'h9_5', 91: 'a15', 92: 'h4_1',
  95: 'a50_1', 96: 'a27_2', 97: 'h7', 100: 'h3_2', 102: 'a8_3', 103: 'h3_1', 104: 'a10_3', 105: 'h3_2', 106: 'a6_1', 107: 'h8_2', 108: 'h8_1', 110: 'a55_1',
  111: 'a7', 113: 'a49_2', 114: 'a55_1', 115: 'a7_1', 119: 'h9_2', 121: 'a47_1', 122: 'a41_1', 123: 'h4_3', 124: 'a51_1', 125: 'a49_1', 126: 'a47_2', 127: 'a52_2',
  128: 'h1_3', 129: 'a44_1bc', 130: 'a50_3', 132: 'h4_2', 134: 'h3_2', 137: 'h3_1', 138: 'a8_1', 140: 'a2_1g',
  9: 'h7', 10: 'h9_2', 116: 'a10_3', 135: 'a2_1', 3: 'h4_2', 112: 'h9_2', 55.5: 0
};
// 7-9 y 7-116 y 7-135 llevan cita propia (más abajo); se sobreescriben.
const PROPIA = {
  9: ['art. 7', LH, '1. El emplazamiento en cualquier lugar de aparatos de escucha, de filmación, de dispositivos ópticos o de cualquier otro medio apto para grabar o reproducir la vida íntima de las personas.', 'Los apartados 3 y 4 y el 8 del artículo 7 son también intromisiones ilegítimas; el 3 se refiere a escritos personales de carácter íntimo (no «público»).'],
  116: ['art. 10.1.b)', LT, 'b) De los recursos de inconstitucionalidad contra las leyes y demás disposiciones con valor de ley, excepto los de mera aplicación de doctrina, cuyo conocimiento podrá atribuirse a las Salas en el trámite de admisión.', 'La opción A dice «inclusive» los de mera aplicación de doctrina, cuando la ley los EXCEPTÚA; por eso es la incorrecta.'],
  135: ['art. 3', LT, 'La competencia del Tribunal Constitucional se extiende al conocimiento y decisión de las cuestiones prejudiciales e incidentales no pertenecientes al orden constitucional, directamente relacionadas con la materia de que conoce, a los solos efectos del enjuiciamiento constitucional de ésta.', 'La conjunción literal es «prejudiciales e incidentales» (no «o»).'],
  3: ['art. 4.2', LH, 'estarán legitimados para recabar la protección el cónyuge, los descendientes, ascendientes y hermanos de la persona afectada que viviesen al tiempo de su fallecimiento.'],
  10: ['art. 9.2', LH, 'La tutela judicial comprenderá la adopción de todas las medidas necesarias para poner fin a la intromisión ilegítima de que se trate y, en particular, las necesarias para: a) El restablecimiento del perjudicado en el pleno disfrute de sus derechos'],
  112: ['art. 9.2', LH, 'b) Prevenir intromisiones inminentes o ulteriores.', 'La ley dice «inminentes o ulteriores»: se previenen las dos clases; la opción B, que excluye las ulteriores, es la incorrecta.'],
};
// ---------- correcciones de contenido ----------
const BORRAR = ['7-78', '7-118', '7-133'];   // dudosas: ninguna opción literal / varias correctas / contradice a 7-135
const ED = {
  '7-92': q => { q.correcta = 0; },                                    // «corresponde» → primero el designado en testamento (4.1)
  '7-137': q => { q.correcta = 1; },                                   // B es literal de 3.1
  '7-9': q => { q.opciones[0] = q.opciones[0].replace('carácter público', 'carácter íntimo'); },
  '7-25': q => { q.opciones[2] = 'Que se haya denunciado formalmente en el proceso, si hubo oportunidad, la vulneración del derecho constitucional tan pronto como, una vez conocida, hubiera lugar para ello.'; q.opciones[0] = 'Que la violación del derecho o libertad sea imputable de modo inmediato y directo a una acción u omisión del órgano judicial con independencia de los hechos que dieron lugar al proceso en que aquéllas se produjeron, acerca de los que, en ningún caso, entrará a conocer el Tribunal Constitucional.'; },
  '7-76': q => { q.opciones[1] = 'Que la violación del derecho o la libertad sea imputable de modo inmediato y directo a una acción u omisión del órgano judicial con independencia de los hechos que dieron lugar al proceso en que aquélla se produjo, acerca de los que, en ningún caso, entrará a conocer el Tribunal Constitucional.'; },
  '7-81': q => { q.opciones[3] = 'A y B son correctas.'; q.explicacion = null; },
  '7-35': q => { q.opciones[1] = 'Tendrá la consideración de intromisiones ilegítimas en el ámbito de protección delimitado por el artículo 7 de esta ley, la utilización del delito por el condenado en sentencia penal firme para conseguir notoriedad pública u obtener provecho económico, o la divulgación de datos falsos sobre los hechos delictivos, cuando ello suponga el menoscabo de la dignidad de las víctimas.'; q.opciones[0] = 'La existencia de prejuicio no se presumirá aunque se acredite la intromisión ilegítima.'; },
  '7-48': q => { q.opciones[0] = 'El consentimiento otorgado para la intromisión ilegítima será revocable en cualquier momento, sin que proceda indemnización alguna por las acciones realizadas hasta ese momento.'; q.opciones[3] = q.opciones[3].replace('otro modo', 'otro medio'); },
  '7-40': q => { q.opciones[0] = 'Podrá dictar reglamentos sobre su propio funcionamiento y organización, que podrán ser aprobados por cualquiera de las Salas del Tribunal.'; q.opciones[1] = 'El Presidente del Tribunal lo es también de la Sala Primera, que presidirá en su defecto, el Magistrado más antiguo y, en caso de igual antigüedad, el de mayor edad.'; q.opciones[2] = 'Cuando el Tribunal Constitucional anule un acto o resolución que contravenga la Jurisdicción lo ha de hacer motivadamente y previa audiencia al Ministerio Fiscal y al órgano autor del acto o resolución.'; },
  '7-42': q => { q.opciones[2] = 'No obstante, cuando la ejecución del acto o sentencia impugnados produzca un perjuicio al recurrente que pudiera hacer perder al amparo su finalidad, la Sala, o la Sección en el supuesto del artículo 52.2, de oficio o a instancia del recurrente, podrá disponer la suspensión, total o parcial, de sus efectos, siempre y cuando la suspensión no ocasione perturbación grave a un interés constitucionalmente protegido, ni a los derechos fundamentales o libertades de otra persona.'; },
  '7-116': q => { q.opciones[0] = 'De los recursos de inconstitucionalidad contra las leyes y demás disposiciones con valor de ley, incluidos los de mera aplicación de doctrina.'; q.opciones[1] = 'De las cuestiones de constitucionalidad que reserve para sí; las demás deberán deferirse a las Salas según un turno objetivo.'; },
  '7-119': q => { q.opciones[1] = 'Prevenir intromisiones inminentes o ulteriores.'; q.opciones[0] = 'El restablecimiento del perjudicado en el pleno disfrute de sus derechos, con la declaración de la intromisión sufrida, el cese inmediato de la misma y la reposición del estado anterior.'; },
  '7-135': q => { q.opciones[0] = 'Al conocimiento y decisión de las cuestiones prejudiciales o incidentales no pertenecientes al orden constitucional, directamente relacionadas con la materia de que conoce, a los solos efectos del enjuiciamiento constitucional de ésta.'; q.opciones[1] = 'Al conocimiento y decisión de las cuestiones prejudiciales e incidentales no pertenecientes al orden constitucional, directamente relacionadas con la materia de que conoce, a los solos efectos del enjuiciamiento constitucional de ésta.'; q.opciones[2] = 'Al conocimiento y decisión de las cuestiones no prejudiciales o incidentales pertenecientes al orden constitucional, directamente relacionadas con la materia de que conoce, a los solos efectos del enjuiciamiento inconstitucional de ésta.'; },
};
// 7-81: A y B correctas (la C es el art. 13 → Pleno)
const EXTRA = { 81: 'La opción C es falsa: apartarse de la doctrina constitucional precedente se somete al Pleno (art. 13), no lo resuelve la Sala.', 25: 'La opción C original («sin haber denunciado…») invertía el requisito: hay que haber denunciado formalmente la vulneración.', 76: 'El requisito dice que el TC no entrará a conocer de los hechos «en ningún caso».', 92: 'Solo en defecto de designación testamentaria (o fallecida la persona designada) están legitimados el cónyuge, descendientes, ascendientes y hermanos (art. 4.2).', 137: 'La regla general es que los menores e incapaces con madurez suficiente consienten por sí mismos; el escrito del representante legal es para los restantes casos.', 35: 'La ley dice que el perjuicio se PRESUME siempre que se acredite la intromisión.', 48: 'El consentimiento es revocable en cualquier momento, pero con indemnización de los daños y perjuicios causados (incluidas las expectativas justificadas).', 40: 'Los reglamentos los aprueba el Pleno, no «cualquiera de las Salas».', 42: 'La regla general es que el recurso NO suspende los efectos; la suspensión es excepcional (art. 56.2).', 18: 'El Presidente solo preside la Sala Primera; la Segunda la preside el Vicepresidente (art. 7).', 80: 'El art. 15 no atribuye al Presidente nombrar «secretarios de las Salas»: nombra a los letrados.', 91: 'Todas las funciones indicadas figuran en el art. 15.', 85: 'Es el Pleno quien elabora el presupuesto; el Presidente no lo aprueba.' };
// ---------- ejecución ----------
const clean = s => s.replace(/([A-Za-zÁÉÍÓÚáéíóúñ])\d+(?=[A-Za-zÁÉÍÓÚáéíóúñ])/g, '$1').replace(/([a-záéíóúñ.,;:])\d+(?=[\s.,;:]|$)/g, '$1').replace(/\s+_{3,}\s+/g, ' _______ ');
const rango = (s, id) => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
const oficial = fs.existsSync(TXT) ? nrm(fs.readFileSync(TXT, 'utf8')) : null;
const malas = [];
for (const [k, v] of Object.entries(C)) if (oficial && !oficial.includes(nrm(v[1]))) malas.push(k + ' · ' + v[1].slice(0, 70));
for (const [k, v] of Object.entries(PROPIA)) if (oficial && !oficial.includes(nrm(v[2]))) malas.push('propia ' + k + ' · ' + v[2].slice(0, 70));
if (malas.length) { console.log('✗ CITAS NO LITERALES:\n  ' + malas.join('\n  ')); process.exit(1); }
console.log('✓ citas literales verificadas (' + (Object.keys(C).length + Object.keys(PROPIA).length) + ')');
if (process.argv.includes('--check')) process.exit(0);
let s = fs.readFileSync(F, 'utf8'), n = { borradas: 0, citas: 0, limpias: 0, editadas: 0 };
for (const id of BORRAR) { const r = rango(s, id); if (!r) continue; let [a, b] = r; if (s[b] === ',') b++; else if (s[a - 1] === ',') a--; s = s.slice(0, a) + s.slice(b); n.borradas++; }
const ids = []; { let i = -1; while ((i = s.indexOf('{"id":"7-', i + 1)) >= 0) { const id = s.slice(i + 7, s.indexOf('"', i + 7)); if (/^7-\d+$/.test(id)) ids.push(id); } }
for (const id of ids) {
  const r = rango(s, id); const q = JSON.parse(s.slice(r[0], r[1])); const num = +id.slice(2); const antes = JSON.stringify(q);
  q.pregunta = clean(q.pregunta); q.opciones = q.opciones.map(clean);
  if (ED[id]) { ED[id](q); n.editadas++; }
  const clave = M[num], propia = PROPIA[num];
  if ((clave || propia || ED[id]) && !(clave === 0)) {
    const [ref, norma, cita, extra] = propia ? [propia[0], propia[1], propia[2], propia[3]] : (() => { const c = C[clave]; return [c[0], clave[0] === 'h' ? LH : LT, c[1], c[2]]; })();
    const nombre = norma === LH ? 'LO 1/1982' : 'LOTC';
    const tieneRoja = /ref-concepto/.test(q.explicacion || '');
    if (!tieneRoja || ED[id] || propia || !q.explicacion) {
      const ex = EXTRA[num] || extra || '';
      q.explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${esc(q.opciones[q.correcta].replace(/\.$/, ''))}</mark></span>El <span class="ref-norma">${ref} de la ${nombre}</span> dispone: <span class="ref-concepto">"${esc(cita)}"</span>.${ex ? ' ' + esc(ex) : ''}`;
      n.citas++;
    }
  } else if (q.explicacion) q.explicacion = clean2(q.explicacion);
  if (JSON.stringify(q) !== antes) { s = s.slice(0, r[0]) + JSON.stringify(q) + s.slice(r[1]); n.limpias++; }
}
function clean2(e) { return e; }
fs.writeFileSync(F, s);
console.log(n);
