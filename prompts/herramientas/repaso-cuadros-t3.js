// Cuadros del Tema 3 (TUE) rehechos con la forma del temario. Fuente: PDF escaneado del T3, págs. 5, 7, 9, 11, 14, 15, 16, 17.
const { y, d, a, p, c, k, esq, fl, bif, caja, lista, tabla2, g2, man } = require('./repaso-cuadros-lib.js');
const out = [];

// pág. 5 · art. 2
out.push({ antes: /^Artículo 3(?!\d)/, html: esq('ARTÍCULO 2 · VALORES EN QUE SE FUNDAMENTA LA UNIÓN', 'cuadro del temario', g2(
  caja('<div class="cen"><b>' + d('VALORES DE RESPETO') + '</b></div>' + lista([y('Dignidad humana'), y('Libertad'), y('Democracia'), y('Igualdad'), y('Estado de Derecho'), 'Respeto de los ' + d('Derechos Humanos') + ', incluidos los derechos de las personas pertenecientes a las ' + d('minorías')])) + man('EXOF'),
  caja('<div class="cen"><b>' + d('VALORES COMUNES DE LA SOCIEDAD') + '</b></div>' + lista([y('Pluralismo'), k('No discriminación'), y('Tolerancia'), y('Justicia'), y('Solidaridad'), y('Igualdad entre mujeres y hombres')])))) });

// pág. 7 · art. 5
out.push({ antes: /^Artículo 6(?!\d)/, html: esq('ARTÍCULO 5 · PRINCIPIOS QUE DELIMITAN LAS COMPETENCIAS', 'cuadro del temario · pregunta EXAMEN 2020', `
  <div class="g2s" style="align-items:start"><div>${caja('La <b>' + d('DELIMITACIÓN DE COMPETENCIAS') + '</b> se rige por:')}${fl}${caja('<div class="cen"><b>' + d('El PRINCIPIO DE ATRIBUCIÓN') + '</b></div>')}</div>
   <div>${caja('La Unión ' + c('actúa') + ' dentro de los límites de las competencias que le atribuyen los ' + a('Estados Miembros') + '.')}${caja(k('Toda competencia no atribuida') + ' a la Unión en los Tratados corresponde a los ' + a('Estados Miembros') + '.')}</div></div>
  <div class="g2s" style="align-items:start;margin-top:8px"><div>${caja('El <b>' + d('EJERCICIO DE LAS COMPETENCIAS') + '</b> se rige por:')}${fl}${caja('<div class="cen"><b>' + d('El PRINCIPIO DE SUBSIDIARIEDAD') + '</b></div>')}${caja('<div class="cen"><b>' + d('El PRINCIPIO DE PROPORCIONALIDAD') + '</b></div>')}</div>
   <div>${caja('En los ámbitos que ' + k('no sean de su competencia exclusiva') + ', la Unión ' + c('intervendrá') + ' sólo en caso de que, y en la medida en que, los objetivos de la acción pretendida ' + k('no puedan ser alcanzados de manera suficiente') + ' por los ' + a('Estados miembros') + ', ni a nivel central ni a nivel regional o local, sino que puedan alcanzarse mejor, debido a la dimensión o a los efectos de la acción pretendida, a escala de la Unión.')}${caja('El contenido y la forma de la acción de la Unión ' + k('no excederán de lo necesario') + ' para alcanzar los objetivos de los Tratados.')}</div></div>`) });

// pág. 9 · art. 7
out.push({ antes: /^Artículo 8(?!\d)/, html: esq('ARTÍCULO 7 · RIESGO CLARO Y VIOLACIÓN GRAVE DE LOS VALORES DEL ARTÍCULO 2', 'cuadros del temario: EL CONSEJO y EL CONSEJO EUROPEO', `
  <div class="g2s" style="align-items:start">
   <div><div class="hd">EL CONSEJO <span class="man">7.1</span></div>
    ${caja('<b>PREVIA PROPUESTA MOTIVADA DE</b>' + lista([p('1/3 de los Estados miembros') + ' o,', 'del ' + a('Parlamento Europeo') + ' o,', 'de la ' + a('Comisión')]))}
    ${caja('• Por mayoría de ' + p('4/5') + ' de los miembros del Consejo<br>• y previa aprobación del ' + a('Parlamento Europeo'))}${fl}
    ${caja('Podrá constatar la existencia de un <b>' + d('riesgo claro de VIOLACIÓN GRAVE') + '</b> por parte de un Estado miembro de los valores del artículo 2')}
    ${caja('• El Consejo ' + c('oirá') + ' al Estado miembro y podrá dirigirle ' + d('recomendaciones') + '.<br>• ' + p('Comprobación periódica') + ' de los motivos que han llevado a tal constatación.')}</div>
   <div><div class="hd">EL CONSEJO EUROPEO <span class="man">7.2</span> <span class="ex">EXOF</span></div>
    ${caja('<div class="cen">' + k('POR UNANIMIDAD') + '</div>')}${caja('<div class="cen">A propuesta de ' + p('1/3 de los Estados miembros') + ' o de la ' + a('Comisión') + '</div>')}${caja('<div class="cen">Previa aprobación del ' + a('Parlamento Europeo') + '</div>')}${fl}
    ${caja('Constatar la existencia de una <b>' + d('VIOLACIÓN GRAVE y persistente') + '</b> por parte de un Estado miembro de los valores contemplados en el artículo 2 ' + man('unanimidad + propuesta 1/3'))}</div></div>
  <div style="margin-top:8px">${caja('<b>7.3</b> · Constatada la violación, el ' + a('Consejo') + ' podrá decidir, por ' + p('mayoría cualificada') + ', que se suspendan determinados derechos derivados de la aplicación de los Tratados al Estado miembro, <u>incluidos los derechos de voto</u> del representante del Gobierno de dicho Estado en el Consejo. Las obligaciones del Estado miembro derivadas de los Tratados ' + k('continuarán') + ', siendo vinculantes.<br><b>7.4</b> · El Consejo podrá decidir posteriormente, por ' + p('mayoría cualificada') + ', la modificación o revocación de las medidas adoptadas.')}</div>`) });

// pág. 11 · art. 10
out.push({ antes: /^Artículo 11(?!\d)/, html: esq('EL FUNCIONAMIENTO DE LA UE SE BASA EN LA DEMOCRACIA REPRESENTATIVA', 'art. 10 · cuadro del temario', g2(
  caja('Los ' + a('ciudadanos') + ' están ' + k('DIRECTAMENTE') + ' representados a través del ' + a('Parlamento Europeo') + '.'),
  caja('Los ' + a('Estados Miembros') + ' son representados:' + lista(['En el ' + a('Consejo Europeo') + ': por el ' + a('Jefe de Estado o de Gobierno'), 'En el ' + a('Consejo') + ': por sus ' + a('Gobiernos') + ' (responsables ante sus parlamentos nacionales y ante sus ciudadanos).'])))) });

// pág. 14 · art. 14
out.push({ antes: /^Artículo 15(?!\d)/, html: esq('PARLAMENTO EUROPEO', 'art. 14 · cuadro del temario', `
  <div class="g2s" style="align-items:center"><div class="cen"><span class="pill" style="background:var(--a)"><b>PARLAMENTO EUROPEO</b></span></div><div>${caja('<div class="cen"><b>FUNCIÓN LEGISLATIVA Y FUNCIÓN PRESUPUESTARIA</b></div>')}<div class="cen">▼</div>${caja('<div class="cen"><b>' + a('CONSEJO') + '</b></div>', 'cen')}</div></div>
  ${caja('<b>FUNCIONES:</b>' + lista([d('Control político') + ' y ' + d('funciones consultivas') + ' (según las condiciones de los tratados).', c('Elección') + ' del ' + a('Presidente de la Comisión') + '.']))}
  ${caja('<b>COMPOSICIÓN:</b>' + lista(['Representantes de los ' + a('Ciudadanos de la Unión') + '.', 'No excederá de ' + p('750 + el Presidente') + '.', 'Representación decrecientemente proporcional, con un ' + p('MÍNIMO DE SEIS DIPUTADOS POR ESTADO MIEMBRO') + ' y un ' + p('MÁXIMO DE 96 ESCAÑOS') + '.', 'Diputados elegidos por sufragio universal directo, libre y secreto, para un mandato de ' + p('cinco años') + '.', 'Presidente y mesa elegidos de entre sus diputados.']))}
  ${caja('El ' + a('CONSEJO EUROPEO') + ' adoptará por ' + k('UNANIMIDAD') + ', a iniciativa del ' + a('Parlamento Europeo') + ' y con su aprobación, una decisión por la que se fije la composición del Parlamento Europeo conforme a los principios del párrafo primero.')}`) });

// págs. 15-16 · art. 15
out.push({ antes: /^Artículo 16(?!\d)/, html: esq('CONSEJO EUROPEO Y SU PRESIDENTE', 'art. 15 · cuadros del temario · pregunta EXAMEN 2020', g2(
  `<div class="hd">CONSEJO EUROPEO</div>` + caja('<b>FUNCIONES:</b>' + lista(['Dará a la Unión los ' + d('impulsos necesarios') + ' para su desarrollo.', 'Define sus ' + d('orientaciones y prioridades políticas generales') + '.', k('NO FUNCIONES LEGISLATIVAS') + '.'])) + caja('<b>COMPOSICIÓN:</b>' + lista([a('Jefes de Estado o de Gobierno'), 'Presidente del Consejo Europeo', 'Presidente de la Comisión', k('Participación') + ' del ' + a('Alto Representante') + ' de la Unión para Asuntos Exteriores y Política de Seguridad'])) + caja('<b>REUNIONES:</b>' + lista([p('2 veces por semestre') + ' por convocatoria del Presidente.', 'Los miembros pueden contar con la asistencia de un ' + a('Ministro') + ' (el Presidente de la Comisión, con un Miembro de la Comisión).', 'Posibilidad de ' + d('reunión extraordinaria') + '.', 'Se pronunciará por ' + k('consenso') + ' salvo disposición contraria en los tratados.'])),
  `<div class="hd">PRESIDENTE DEL CONSEJO EUROPEO</div>` + caja('Elegido por ' + p('mayoría cualificada') + ' para un mandato de ' + p('DOS AÑOS Y MEDIO') + ', ' + k('renovable una sola vez') + '. En caso de impedimento o falta grave, el Consejo Europeo podrá poner fin a su mandato por el mismo procedimiento.') + caja('<b>FUNCIONES:</b>' + lista([c('Presidirá e impulsará') + ' los trabajos del Consejo Europeo.', c('Velará') + ' por la preparación y continuidad de los trabajos, en cooperación con el ' + a('Presidente de la Comisión') + ' y basándose en los trabajos del Consejo de Asuntos Generales.', 'Facilitará la ' + d('cohesión y el consenso') + '.', 'Al término de cada reunión presentará un ' + d('informe al Parlamento Europeo') + '.', 'Asumirá la ' + d('representación exterior') + ' de la Unión en los asuntos de PESC, sin perjuicio de las atribuciones del Alto Representante.', k('No podrá ejercer mandato nacional alguno') + '.'])))) });

// págs. 16-17 · art. 16
out.push({ antes: /^Artículo 17(?!\d)/, html: esq('EL CONSEJO', 'art. 16 · cuadros del temario', g2(
  caja('<b>FUNCIONES:</b>' + lista(['Función ' + d('legislativa y presupuestaria') + ' junto con el ' + a('Parlamento Europeo') + '.', 'Funciones de ' + d('definición de políticas y de coordinación') + ' en las condiciones establecidas en los tratados.'])) + caja('<b>COMPOSICIÓN:</b>' + lista([p('1 representante') + ' de cada Estado miembro de ' + p('rango ministerial') + ' con derecho a voto.', 'Pronunciación por ' + p('MAYORÍA CUALIFICADA') + ' excepto cuando los tratados dispongan otra cosa.'])),
  caja('<b>' + p('MAYORÍA CUALIFICADA') + ':</b>' + lista(['Mínimo del ' + p('55 %') + ' de miembros (que al menos ' + p('quince') + ' de ellos) y representen a Estados miembros que reúnan como mínimo el ' + p('65 %') + ' de la población de la Unión.', 'Minoría de bloqueo compuesta por al menos ' + p('4 miembros') + ' del Consejo.', 'Otras modalidades de voto por mayoría cualificada: apartado 2 del art. 238 TFUE.'])))) });
module.exports = { cuadros: out, soloPropios: true };
