// Cuadros del Tema 21 (Ley 4/2015, Estatuto de la víctima) con la forma del temario: arts. 2, 9, 23-25.
const { y, d, a, p, c, k, esq, fl, bif, caja, lista, tabla2, g2, man } = require('./repaso-cuadros-lib.js');
const out = [];

// art. 2 · concepto general de víctima
out.push({ antesH: /^TÍTULO I · Derechos básicos/, html: esq('ARTÍCULO 2 · ÁMBITO SUBJETIVO. CONCEPTO GENERAL DE VÍCTIMA', 'Ley 4/2015 · cuadro del temario', g2(
  caja('<b>a) ' + d('VÍCTIMA DIRECTA') + '</b>: toda ' + a('persona física') + ' que haya sufrido un ' + d('daño o perjuicio') + ' sobre su propia persona o patrimonio; en especial lesiones físicas o psíquicas, daños emocionales o perjuicios económicos directamente causados por la comisión de un delito.'),
  caja('<b>b) ' + d('VÍCTIMA INDIRECTA') + '</b>: en los casos de ' + d('muerte o desaparición') + ' de una persona causada directamente por un delito, ' + k('salvo') + ' que se trate de los responsables de los hechos:' + lista(['<b>1.º</b> ' + a('Cónyuge no separado') + ' legalmente o de hecho e ' + a('hijos') + ' (convivientes) de la víctima o del cónyuge; la persona unida a ella por análoga relación de afectividad y los hijos de ésta que convivieran con ella; sus ' + a('progenitores y parientes') + ' en línea recta o colateral dentro del ' + p('tercer grado') + ' que se encontraren bajo su guarda, y las personas sujetas a su tutela o curatela o bajo su acogimiento familiar.', '<b>2.º</b> En caso de no existir los anteriores: los demás ' + a('parientes en línea recta y sus hermanos') + ', con preferencia, entre ellos, del que ostentara la representación legal de la víctima.'])))
  + caja(k('No serán aplicables') + ' a terceros que hubieran sufrido perjuicios derivados del delito.') ) });

// art. 9 · traducción e interpretación
out.push({ antesH: /^TÍTULO II · Participación de la víctima/, html: esq('DERECHO A LA TRADUCCIÓN E INTERPRETACIÓN', 'art. 9 · cuadro del temario · EXAMEN', `
  ${caja('<b>' + d('DESTINATARIOS') + '</b> · toda víctima que ' + k('no hable') + ' o ' + k('no entienda') + ': el ' + a('castellano') + ', o la ' + a('lengua oficial') + ' que se utilice en la actuación de que se trate.')}
  <div class="cen"><b>' + d('DERECHOS') + '</b></div>
  <div class="g2s" style="grid-template-columns:repeat(3,1fr);align-items:start">
   ${caja('<b>A ser asistido ' + d('gratuitamente') + '</b> por un intérprete que comprenda cuando:' + lista(['Se le reciba la ' + d('declaración en la fase de investigación') + ' por el Juez, Fiscal o funcionarios públicos de policía.', 'Intervenga como testigo en el juicio o en cualquier otra vista oral.']))}
   ${caja('<b>A la ' + d('traducción gratuita') + ' de:</b>' + lista(['Resoluciones del ' + p('art. 7.1') + '.', 'Resoluciones del ' + p('art. 12') + ': incluirá también un ' + d('breve resumen del fundamento') + ' de la resolución (cuando la víctima así lo haya solicitado).', 'Información esencial para el ejercicio de los derechos del Título II (solicitud motivada de la víctima).']))}
   ${caja('<b>A ser ' + d('informada') + ', en una lengua que comprenda, de:</b>' + lista([y('Fecha'), y('Lugar'), y('Hora')]) + 'de celebración del juicio.')}
  </div>
  ${caja('<b>Derecho aplicable también</b> a las personas con: ' + d('limitaciones auditivas') + ' o ' + d('limitaciones de expresión oral') + '.')}
  <div class="g2s" style="align-items:start">
   ${caja('<b>' + d('FORMA') + '</b><br>La asistencia de intérprete se podrá prestar por ' + d('videoconferencia') + ' o cualquier medio de telecomunicación (salvo que se acuerde la presencia física del intérprete).<br>La traducción se realiza de manera ' + d('escrita') + ', pero ' + k('excepcionalmente') + ' podrá ser sustituida por un ' + d('resumen oral') + ' (cuando se garantice suficientemente la equidad del proceso).')}
   ${caja('<b>' + d('RECURSOS') + '</b><br>Actuaciones policiales: la decisión de no facilitar interpretación o traducción podrá ser recurrida ante el ' + a('Juez de Instrucción') + ' (se entiende interpuesto cuando el afectado hubiera expresado su disconformidad en el momento de la denegación).<br>Decisión judicial de no facilitarla: podrá ser recurrida en ' + d('APELACIÓN') + '.')}
  </div>`.replace("<div class=\"cen\"><b>' + d('DERECHOS') + '</b></div>", '<div class="cen"><b>DERECHOS</b></div>')) });

// págs. 180 y 182 · arts. 23-25
out.push({ antesH: /^TÍTULO IV · Disposiciones comunes/, html: esq('MEDIDAS DE PROTECCIÓN · VALORACIÓN Y COMPETENCIA', 'arts. 23 y 24 · cuadro del temario', `
  ${caja('La ' + d('valoración') + ' tendrá especialmente en consideración:', 'cen')}
  <div class="g2s" style="grid-template-columns:repeat(3,1fr);align-items:start">
   ${caja('<b>' + d('LAS CARACTERÍSTICAS Y CIRCUNSTANCIAS PERSONALES') + ' DE LA VÍCTIMA</b>' + lista(['Víctima con ' + d('discapacidad'), 'Relación de ' + d('dependencia') + ' entre víctima y supuesto autor', 'Víctima ' + d('menor de edad'), 'Víctima necesitada de ' + d('especial protección'), 'Factores de ' + d('especial vulnerabilidad')]))}
   ${caja('<b>' + d('NATURALEZA DEL DELITO, GRAVEDAD DE LOS PERJUICIOS Y RIESGO DE REITERACIÓN') + '</b><br>Se valorarán especialmente las necesidades de protección de las víctimas de:' + lista(['Delitos de ' + d('terrorismo'), 'Delitos cometidos por ' + d('organización criminal'), 'Delitos sobre el ' + a('cónyuge') + ' o persona ligada al autor por análoga relación de afectividad; descendientes, ascendientes o hermanos', 'Delitos contra la ' + d('libertad o indemnidad sexual'), 'Delitos de ' + d('trata de seres humanos'), 'Delitos de ' + d('desaparición forzada'), 'Delitos por motivos ' + d('racistas, antisemitas') + ' u otros (ideología, religión, orientación o identidad sexual, discapacidad…)']))}
   ${caja('<b>' + d('CIRCUNSTANCIAS DEL DELITO') + '</b><br>En particular si se trata de ' + d('DELITOS VIOLENTOS') + '.')}
  </div>
  ${caja('<b>COMPETENCIA</b> para valorar las necesidades de la víctima y determinar medidas de protección:', 'cen')}
  ${bif(caja('Durante la <b>' + d('FASE DE INVESTIGACIÓN') + '</b>:<br>• ' + a('JUEZ DE INSTRUCCIÓN') + ', o<br>• ' + a('JUEZ DE VIOLENCIA SOBRE LA MUJER') + ',<br><span class="nota">sin perjuicio de la evaluación y resolución provisionales del Fiscal, en sus diligencias, o de los funcionarios de policía que actúen en la fase inicial.</span>'), caja('Durante la <b>' + d('FASE DE ENJUICIAMIENTO') + '</b>:<br>' + a('JUEZ o TRIBUNAL') + ' a los que correspondería el conocimiento de la causa.'))}
  ${caja('• La valoración ' + d('incluirá siempre') + ' la de las necesidades manifestadas por la víctima con esa finalidad.<br>• Víctimas ' + a('menores de edad o discapacitadas') + ' necesitados de especial protección: se tomará en consideración ' + d('sus opiniones e intereses') + '.')}`) });
out.push({ antesH: /^TÍTULO IV · Disposiciones comunes/, html: esq('MEDIDAS DE PROTECCIÓN · FASES', 'art. 25 · cuadro del temario', `
  <div class="g2s" style="align-items:start">
   <div><div class="hd">FASE DE INVESTIGACIÓN</div>
    ${caja('Que se les reciba ' + d('declaración en dependencias') + ' especialmente concebidas o adaptadas a tal fin.')}
    ${caja('Que se les reciba ' + d('declaración por profesionales') + ' que hayan recibido una formación especial para reducir o limitar perjuicios a la víctima, así como en perspectiva de género, o con su ayuda.')}
    ${caja('Que todas las ' + d('tomas de declaración') + ' a una misma víctima le sean realizadas por la ' + a('misma persona') + ', salvo que ello pueda perjudicar de forma relevante el desarrollo del proceso o deba tomarse la declaración directamente por un Juez o un Fiscal.')}
    ${caja('Víctimas de delitos: sobre el ' + a('cónyuge') + ' o persona con análoga relación de afectividad, descendientes, ascendientes o hermanos; contra la ' + d('libertad o indemnidad sexual') + '; ' + d('trata con fines de explotación sexual') + ': la toma de declaración la lleva a cabo una persona del ' + d('mismo sexo') + ' que la víctima, cuando ésta así lo solicite (salvo que pueda perjudicar de forma relevante el desarrollo del proceso).')}</div>
   <div><div class="hd">FASE DE ENJUICIAMIENTO</div>
    ${caja('Medidas para garantizar que la víctima pueda ser ' + d('oída sin estar presente') + ' en la sala de vistas, mediante tecnologías de la comunicación adecuadas.')}
    ${caja(d('Celebración de la vista oral sin presencia de público') + '. En estos casos, el Juez o el Presidente del Tribunal podrá autorizar, sin embargo, la presencia de personas que acrediten un especial interés en la causa.')}</div></div>
  ${caja('Medidas que ' + d('eviten el contacto visual') + ' entre víctima y supuesto autor, incluso durante la práctica de la prueba (con tecnologías de la comunicación).')}
  ${caja('Medidas para ' + d('evitar preguntas relativas a la vida privada') + ' de la víctima que no tengan relevancia con el hecho delictivo, salvo que el Juez o Tribunal consideren excepcionalmente que deben ser contestadas.')}
  ${caja('También podrán acordarse medidas del ' + p('art. 2 L.O. 19/1994') + ' de protección de testigos y peritos en causas criminales.')}`) });
module.exports = { cuadros: out, soloPropios: true };
