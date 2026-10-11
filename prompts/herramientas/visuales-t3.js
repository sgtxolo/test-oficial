// Tema 3 · esquemas visuales: recrea los cuadros y diagramas del temario (los que trae el PDF subrayado del usuario) como componentes de visuales-lib.js.
// Cada cuadro se contrasta con el texto del temario oficial (09/09/2025); las marcas a mano del usuario se trasladan como énfasis (R = respuesta de test, K = no/salvo/únicamente, P = cifras y plazos).
// Uso: node prompts/herramientas/visuales-t3.js   (inserta los diagramas en el esquema del Tema 3 de esquemas.html)
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos } = L;
const V = []; const v = (despues, html) => V.push([despues, html]);

// Art. 2 · cuadro «valores de respeto / valores comunes de la sociedad» (pág. 1 del temario; el usuario lo marca EX)
v('Artículo 2 — Valores', cols('Valores de respeto y valores comunes de la sociedad (art. 2 TUE)', [
  { t: 'VALORES DE RESPETO', l: ['Dignidad humana', 'Libertad', 'Democracia', 'Igualdad', 'Estado de Derecho', 'Respeto de los derechos humanos, incluidos los derechos de las personas pertenecientes a minorías'] },
  { t: 'VALORES COMUNES DE LA SOCIEDAD', l: ['Pluralismo', 'No discriminación', 'Tolerancia', 'Justicia', 'Solidaridad', 'Igualdad entre mujeres y hombres'] }], true));

// Art. 5 · delimitación y ejercicio de las competencias (pág. 3; EXAMEN 2020 + EX)
v('Artículo 5 — Principios', arbol('Competencias de la Unión (art. 5 TUE)', 'La ' + D('DELIMITACIÓN') + ' de competencias se rige por el principio de ' + R('ATRIBUCIÓN') + '; el ' + D('EJERCICIO') + ', por ' + R('SUBSIDIARIEDAD y PROPORCIONALIDAD'), [
  R('Atribución') + ': la Unión actúa dentro de los límites de las competencias que le atribuyen los Estados miembros; ' + K('toda competencia no atribuida') + ' corresponde a los Estados miembros',
  R('Subsidiariedad') + ': en los ámbitos que ' + K('no sean de su competencia exclusiva') + ', la Unión interviene sólo si los objetivos ' + K('no pueden alcanzarse de manera suficiente') + ' por los Estados miembros (ni a nivel central ni regional o local) y se alcanzan mejor a escala de la Unión',
  R('Proporcionalidad') + ': el contenido y la forma de la acción de la Unión ' + K('no excederán de lo necesario') + ' para alcanzar los objetivos de los Tratados']));

// Art. 7 · Consejo (riesgo claro) frente a Consejo Europeo (violación grave y persistente) (págs. 5-6; EX/EXOF)
v('Artículo 7 — Riesgo y violación', cols('Procedimiento del art. 7 TUE: riesgo claro frente a violación grave y persistente', [
  { t: 'EL CONSEJO (art. 7.1) · «riesgo claro de violación grave»', l: ['Propuesta motivada de ' + P('1/3 de los Estados miembros') + ', del ' + R('Parlamento Europeo') + ' o de la ' + R('Comisión'), 'Mayoría de ' + P('4/5') + ' de sus miembros', 'Previa ' + R('aprobación del Parlamento Europeo'), 'Oye al Estado miembro y puede dirigirle ' + D('recomendaciones'), 'Comprueba periódicamente si los motivos siguen siendo válidos'] },
  { t: 'EL CONSEJO EUROPEO (art. 7.2) · «violación grave y persistente»', l: [R('Unanimidad'), 'A propuesta de ' + P('1/3 de los Estados miembros') + ' o de la ' + R('Comisión') + ' (' + K('no') + ' del Parlamento Europeo)', 'Previa ' + R('aprobación del Parlamento Europeo'), 'Tras invitar al Estado miembro a presentar sus observaciones', 'Después, el Consejo puede suspender derechos (incluido el voto) por ' + R('mayoría cualificada') + ' (art. 7.3)'] }], true));

// Art. 10 · democracia representativa (pág. 5 del PDF; EX en 10.2 y 10.4)
v('Artículo 10 — Democracia', cols('El funcionamiento de la UE se basa en la democracia representativa (art. 10 TUE)', [
  { t: 'LOS CIUDADANOS', l: ['Representados ' + R('directamente') + ' a través del ' + R('Parlamento Europeo')] },
  { t: 'LOS ESTADOS MIEMBROS', l: ['En el ' + R('Consejo Europeo') + ': por su ' + R('Jefe de Estado o de Gobierno'), 'En el ' + R('Consejo') + ': por sus ' + R('Gobiernos') + ', democráticamente responsables ante sus Parlamentos nacionales o ante sus ciudadanos'] }], true));

// Art. 14 · Parlamento Europeo (págs. 8 y 10 del temario; EXAMEN 2020 + EX)
v('Artículo 14 — Parlamento', arbol('Parlamento Europeo (art. 14 TUE)', 'Ejerce con el ' + R('Consejo') + ' la función ' + D('legislativa y presupuestaria') + ' · control político y funciones consultivas · ' + R('elige al Presidente de la Comisión'), [
  'Composición: representantes de los ciudadanos de la Unión · ' + K('no excederá') + ' de ' + P('750') + ' + el Presidente',
  'Representación decrecientemente proporcional: mínimo ' + P('6') + ' diputados por Estado · máximo ' + P('96') + ' escaños',
  'Diputados elegidos por sufragio universal, directo, libre y secreto · mandato de ' + P('5 años'),
  'Presidente y Mesa elegidos de entre sus diputados',
  'La composición la fija el ' + R('Consejo Europeo') + ' por ' + R('unanimidad') + ', a iniciativa del PE y con su aprobación']));

// Art. 15 · Consejo Europeo y su Presidente (págs. 9-11; EXAMEN 2020 + EX/EXOF)
v('Artículo 15 — Consejo Europeo', arbol('Consejo Europeo (art. 15 TUE)', 'Da a la Unión los ' + D('impulsos necesarios') + ' y define sus orientaciones y prioridades políticas · ' + K('no ejerce función legislativa'), [
  'Composición: ' + R('Jefes de Estado o de Gobierno') + ' + su ' + R('Presidente') + ' + el ' + R('Presidente de la Comisión') + ' · el Alto Representante ' + K('participa en sus trabajos') + ' (no es miembro)',
  'Reuniones: ' + P('2 veces por semestre') + ' por convocatoria del Presidente · reunión extraordinaria cuando la situación lo exija',
  'Cada miembro puede contar con la asistencia de un ministro (y el Presidente de la Comisión, con la de un miembro de la Comisión)',
  'Se pronuncia por ' + R('consenso') + ', excepto cuando los Tratados dispongan otra cosa',
  'Presidente: elegido por ' + R('mayoría cualificada') + ' · mandato de ' + P('2 años y medio') + ', renovable ' + P('una sola vez') + ' · informa al PE al término de cada reunión · ' + K('no puede ejercer mandato nacional')]));

// Art. 16 · el Consejo y la mayoría cualificada (págs. 11-12; EX)
v('Artículo 16 — El Consejo', arbol('El Consejo (art. 16 TUE)', 'Ejerce con el ' + D('Parlamento Europeo') + ' la función legislativa y presupuestaria · funciones de definición de políticas y de coordinación', [
  'Composición: ' + P('1') + ' representante de cada Estado miembro, de ' + R('rango ministerial'),
  'Se pronuncia por ' + R('mayoría cualificada') + ', excepto cuando los Tratados dispongan otra cosa',
  'Mayoría cualificada (desde 1-11-2014): ' + P('55 %') + ' de los miembros (al menos ' + P('15') + ') que representen Estados con al menos el ' + P('65 %') + ' de la población',
  'Minoría de bloqueo: al menos ' + P('4') + ' miembros',
  'Se reúne en público al deliberar y votar un acto legislativo · la presidencia de las formaciones rota de modo ' + D('igual') + ' (excepto Asuntos Exteriores, que preside el Alto Representante)']));

// Art. 17 y 18 · Comisión y Alto Representante (EX)
v('Artículo 17 — La Comisión', flujo('Cómo se nombra la Comisión (art. 17.7 TUE)', [
  { et: 1, t: 'El ' + R('Consejo Europeo') + ' propone al PE, por ' + R('mayoría cualificada') + ', un candidato a ' + D('Presidente') + ' (teniendo en cuenta las elecciones europeas)' },
  { et: 2, t: 'El ' + R('Parlamento Europeo') + ' lo elige por ' + R('mayoría de los miembros que lo componen') + ' · si no obtiene la mayoría, nuevo candidato en el plazo de ' + P('1 mes') },
  { et: 3, t: 'El ' + R('Consejo') + ', de común acuerdo con el Presidente electo, adopta la lista de los demás miembros' },
  { et: 4, t: 'Presidente, Alto Representante y demás miembros se someten ' + D('colegiadamente') + ' al voto de aprobación del ' + R('Parlamento Europeo') },
  { et: 5, t: 'La Comisión es nombrada por el ' + R('Consejo Europeo') + ', por ' + R('mayoría cualificada') }]));

// Comparativa: Parlamento Europeo frente a Consejo Europeo (pág. 10 del temario)
v('Artículo 15 — Consejo Europeo', cols('Parlamento Europeo frente a Consejo Europeo (arts. 14 y 15 TUE)', [
  { t: 'PARLAMENTO EUROPEO', l: ['Representantes de los ciudadanos', P('750') + ' + Presidente · mín. ' + P('6') + ' / máx. ' + P('96') + ' por Estado', 'Sufragio universal directo · ' + P('5 años'), 'Funciones: legislativa y presupuestaria (con el Consejo), control político y consultivas · elige al Presidente de la Comisión'] },
  { t: 'CONSEJO EUROPEO', l: ['Jefes de Estado o de Gobierno + Presidente del CE + Presidente de la Comisión (el Alto Representante participa)', P('2 veces por semestre'), 'Consenso (salvo disposición contraria)', 'Impulsos y orientaciones políticas · ' + K('sin función legislativa')] }], true));

L.inserta(3, V);
