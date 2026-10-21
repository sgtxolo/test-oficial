// Tema 3 · cuadros visuales: recrean los cuadros del temario OFICIAL (2025-09-09) con su TEXTO LITERAL y con el subrayado del usuario
// (lo leído de su PDF escaneado donde el cuadro coincide: fecha/«Maastricht» en azul, «Igualdad» en naranja, subrayados a lápiz de los
// flujos del art. 7, «cinco años», «Participación»…) y, donde no lo marcó, con su método: lo impreso en negrita → amarillo,
// verbos de acción → naranja, órganos → verde, plazos/cifras → azul, futuros → lila (reglas-color.js). Pauta del 21/10/2026.
// Cuadros propios añadidos (ayudan a estudiar): cómo se nombra la Comisión.
// Uso: node prompts/herramientas/visuales-t3.js   (inserta los diagramas en el esquema del Tema 3 de esquemas.html; los usa expres-t3.js)
const L = require('./visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const U = x => `<u class="m-lapiz">${x}</u>`;
const KY = x => K(Y(x));
const V = []; const v = (despues, html) => V.push([despues, html]);
// nota al pie dentro del cuadro
const pie = (html, txt) => html.replace(/<\/div>$/, `<div class="vis-flujo"><div class="vis-paso">${txt}</div></div></div>`);

// ───────── 3.1 · ficha del Tratado (cuadro de la pág. 1 del temario) ─────────
v('Artículo 1 — Creación de la Unión Europea', plazos('Ficha del Tratado de la Unión Europea (3.1)', [
  ['Creación', `${Y('Tratado de la Unión Europea')}, firmado en ${P('Maastricht, el 7 de febrero de 1992')}.`],
  ['Emisor', `${G('Parlamento Europeo y el Consejo')}.`],
  ['En vigor', `${P('1 de noviembre de 1993')}.`],
  ['España', `Firmado por España: ${P('1 de enero de 1986')}.`],
  ['DOCE', `Publicación: ${P('DOCE. El 15 de noviembre de 1985')}.`],
  ['Reforma', `Última reforma: ${Y('Tratado de Lisboa')} ${P('de 13-12-2007')}.`]]));

// ───────── Art. 2 · valores (cuadro de la pág. 1; el usuario lo marca EXOF) ─────────
v('Artículo 2 — Valores', cols('Valores de respeto y valores comunes de la sociedad (art. 2 TUE)', [
  { t: 'VALORES DE RESPETO', l: ['Dignidad humana.', 'Libertad.', 'Democracia.', D('Igualdad') + '.', 'Estado de Derecho.', 'Respeto de los Derechos Humanos, incluidos los derechos de las personas pertenecientes a las minorías.'] },
  { t: 'VALORES COMUNES DE LA SOCIEDAD', l: ['Pluralismo.', 'No discriminación.', 'Tolerancia.', 'Justicia.', 'Solidaridad.', Y('Igualdad entre mujeres y hombres') + '.'] }], true));

// ───────── Art. 5 · delimitación y ejercicio de las competencias (pág. 3; EXAMEN 2020 + EXOF) ─────────
v('Artículo 5 — Principios', arbol('Competencias de la Unión (art. 5 TUE)', `La ${Y('DELIMITACIÓN')} de COMPETENCIAS se rige por el ${KY('PRINCIPIO de ATRIBUCIÓN')} · El ${Y('EJERCICIO')} de las COMPETENCIAS se rige por el ${KY('PRINCIPIO de SUBSIDIARIEDAD')} y el ${KY('PRINCIPIO de PROPORCIONALIDAD')}`, [
  `${Y('ATRIBUCIÓN')}: La Unión actúa dentro de los límites de las competencias que le atribuyen los Estados Miembros. ${K('Toda competencia no atribuida')} a la Unión en los Tratados corresponde a los Estados Miembros.`,
  `${Y('SUBSIDIARIEDAD')}: En los ámbitos que ${K('no sean de su competencia exclusiva')}, la Unión intervendrá sólo en el caso de que y en la medida en que los objetivos de la acción pretendida ${K('no puedan ser alcanzados de manera suficiente')} por los Estados miembros, ni a nivel central, ni a nivel regional o local, sino que pueden alcanzarse mejor, debido a la dimensión o a los efectos de la acción pretendida, a escala de la Unión.`,
  `${Y('PROPORCIONALIDAD')}: El contenido y la forma de la acción de la Unión ${K('no excederán de lo necesario')} para alcanzar los objetivos de los Tratados.`]));

// ───────── Art. 7 · el Consejo (riesgo claro) y el Consejo Europeo (violación grave y persistente) (págs. 4-5) ─────────
v('Artículo 7 — Riesgo y violación', pie(flujo('Art. 7.1 TUE · EL CONSEJO', [
  { et: 'Propuesta', t: `${U('PREVIA PROPUESTA MOTIVADA')} DE: ${P('1/3 DE LOS ESTADOS MIEMBROS')} O, DEL ${G('PARLAMENTO EUROPEO')} O, DE LA ${G('COMISIÓN')}` },
  { et: 'Mayoría', t: `POR MAYORÍA DE ${P('4/5')} DE LOS MIEMBROS DEL ${G('CONSEJO')} Y PREVIA ${KY('APROBACIÓN DEL PARLAMENTO EUROPEO')}` },
  { et: 'Constata', t: `${D('Podrá constatar')} la existencia de un ${U('riesgo claro')} de ${Y(K('VIOLACIÓN GRAVE'))} por parte de un estado miembro de los ${U('valores del artículo 2')}.` },
  { et: 'Después', t: `${G('Consejo')} ${D('oirá')} al E.M. y ${D('podrá dirigirle')} ${Y('recomendaciones')}. · Comprobación periódica de los motivos que han llevado a tal constatación.` }]),
  `<i>Nota tuya a mano:</i> «El Consejo 4/5 · Proponen 1/3».`));
v('Artículo 7 — Riesgo y violación', pie(flujo('Art. 7.2 TUE · EL CONSEJO EUROPEO', [
  { et: 'Mayoría', t: `${Y(K('POR UNANIMIDAD'))}` },
  { et: 'Propuesta', t: `A PROPUESTA DE ${U('1/3 DE LOS ESTADOS MIEMBROS')} O DE ${U('LA COMISIÓN')}` },
  { et: 'Aprobación', t: `PREVIA APROBACIÓN DEL ${U('PARLAMENTO EUROPEO')}` },
  { et: 'Constata', t: `${D('Constatar')} la ${U('existencia')} de una ${Y(K('VIOLACIÓN GRAVE'))} y persistente por parte de un estado miembro de los valores contemplados en el ${U('artículo 2')}.` }]),
  `<i>Nota tuya a mano:</i> «Consejo Europeo · unanimidad · propuesta 1/3».`));

// ───────── Art. 10 · democracia representativa (pág. 7; EXOF) ─────────
v('Artículo 10 — Democracia', cols('El funcionamiento de la UE se basa en la democracia representativa (art. 10 TUE)', [
  { t: 'LOS CIUDADANOS', l: [`Los ${G('ciudadanos')} están ${Y('DIRECTAMENTE')} representados a través del ${G('parlamento europeo')}.`] },
  { t: 'LOS ESTADOS MIEMBROS', l: [`Los Estados Miembros son representados:`, `En el ${G('Consejo Europeo')}: por el ${G('Jefe de Estado o de Gobierno')}`, `En el ${G('Consejo')}: por sus ${G('Gobiernos')} (responsables ante sus parlamentos nacionales y ante sus ciudadanos).`] }], true));

// ───────── Art. 14 · Parlamento Europeo (págs. 8-10; EXAMEN 2020 + EXOF) ─────────
v('Artículo 14 — Parlamento', arbol('Parlamento Europeo (art. 14 TUE)', `${G('PARLAMENTO EUROPEO')} → ${Y('FUNCIÓN LEGISLATIVA Y FUNCIÓN PRESUPUESTARIA')} junto con el ${G('CONSEJO')}`, [
  { t: `${Y('FUNCIONES')}`, sub: [`${Y('Control Político y Funciones Consultivas')} (según las condiciones de los Tratados).`, `${Y('Elección del Presidente de la Comisión')}.`] },
  { t: `${Y('COMPOSICIÓN')}`, sub: [`${Y('Representantes de los ciudadanos de la Unión')}.`, `${K('No excederá')} de ${P('750')} + el Presidente.`, `La representación decrecientemente proporcional, con un ${KY('mínimo de seis Diputados por Estado miembro')} y un ${KY('máximo de 96 escaños')}.`, `Diputados elegidos por sufragio universal directo, libre y secreto, para un mandato de ${U(P('cinco años'))}.`, `Presidente y Mesa elegidos de entre sus diputados.`] },
  `EL ${U(G('CONSEJO EUROPEO'))} ${D('ADOPTARÁ')} POR ${Y(K('UNANIMIDAD'))}, A INICIATIVA DEL ${G('PARLAMENTO EUROPEO')} Y CON SU APROBACIÓN, UNA DECISIÓN POR LA QUE SE FIJE LA COMPOSICIÓN DEL PARLAMENTO EUROPEO conforme a los principios a que se refiere el párrafo primero.`]));

// ───────── Art. 15 · Consejo Europeo y su Presidente (págs. 9-12; EXAMEN 2020 + EXOF) ─────────
v('Artículo 15 — Consejo Europeo', pie(arbol('EL CONSEJO EUROPEO (art. 15 TUE)', `${G('CONSEJO EUROPEO')}`, [
  { t: `${Y('FUNCIONES')}`, sub: [`${D('Dará')} a la ${G('Unión')} los ${Y('impulsos necesarios')} para su desarrollo.`, `${D('Define')} sus ${Y('orientaciones y sus prioridades políticas generales')}.`, `${U(K('NO FUNCIONES LEGISLATIVAS'))}.`] },
  { t: `${Y('COMPOSICIÓN')}`, sub: [`${G('Jefes de Estado o de Gobierno')}.`, `${G('Presidente del Consejo Europeo')}.`, `${G('Presidente de la Comisión')}.`, `${K('Participación')} del ${G('Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad')}.`] },
  { t: `${Y('REUNIONES')}`, sub: [`${P('2 veces por semestre')} por convocatoria del Presidente.`, `Posibilidad de los miembros del Consejo Europeo de contar con la asistencia de un Ministro (cuando el orden del día lo exija). El Presidente de la Comisión contará con la asistencia de un Miembro de la Comisión.`, `Posibilidad de reunión extraordinaria.`, `Se pronunciará por ${Y('consenso')} salvo disposición contraria en los tratados.`] }]),
  `<i>Presidente del Consejo Europeo</i> (art. 15.5 y 15.6): elegido por ${Y('mayoría cualificada')} para un mandato de ${P('DOS AÑOS Y MEDIO')}, que podrá renovarse ${P('una sola vez')}; ${D('presidirá e impulsará')} los trabajos del Consejo Europeo, ${D('velará')} por su preparación y continuidad, ${D('se esforzará')} por facilitar la cohesión y el consenso, ${D('presentará')} un ${Y('informe al Parlamento Europeo')} al término de cada reunión y ${D('asumirá')} la ${Y('representación exterior')} de la Unión en los asuntos de política exterior y de seguridad común; ${K('no podrá ejercer mandato nacional alguno')}.`));

// ───────── Art. 16 · el Consejo y la mayoría cualificada (págs. 13-14; EXAMEN 2020 + EXOF) ─────────
v('Artículo 16 — El Consejo', pie(arbol('EL CONSEJO (art. 16 TUE)', `${G('EL CONSEJO')}`, [
  { t: `${Y('FUNCIONES')}`, sub: [`${Y('Función legislativa y presupuestaria')} junto con el ${G('Parlamento Europeo')}.`, `${Y('Funciones de definición de políticas y de coordinación')} en las condiciones establecidas en los tratados.`] },
  { t: `${Y('COMPOSICIÓN')}`, sub: [`${P('1')} representante de cada E.M. de ${Y('rango ministerial')} con derecho a voto.`, `Pronunciación del órgano por ${KY('mayoría cualificada')} excepto cuando los tratados dispongan otra cosa.`] }]),
  `Art. 16.5: las disposiciones transitorias de la mayoría cualificada (hasta el ${P('31 de octubre de 2014')} y entre el ${P('1 de noviembre de 2014 y el 31 de marzo de 2017')}) se establecerán en el Protocolo sobre las disposiciones transitorias.`));
v('Artículo 16 — El Consejo', cols('MAYORÍA CUALIFICADA (art. 16.4 TUE y art. 238 TFUE · cuadro del temario)', [
  { t: 'HASTA 2017', l: [`Miembros: ${P('≥ 50 %')}`, `Población: ${P('≥ 62 %')}`, `Votos: ${P('≥ 260/352')}`, `Minoría de bloqueo: ${P('≥ 4 miembros')}`] },
  { t: 'DESDE 01/11/2014 · NORMAL (ART. 16.4 TUE)', l: [`Miembros: ${KY('≥ 55 %')}`, `Población: ${KY('≥ 65 %')}`, `Minoría de bloqueo: ${P('≥ 4 miembros')}`] },
  { t: 'DESDE 01/11/2014 · NO TODOS MIEMBROS', l: [`Miembros: ${P('≥ 55 %')}`, `Población: ${P('≥ 65 %')}`, `Minoría de bloqueo: ≥ EM = (≥ 35 % HAB) + 1`] },
  { t: 'DESDE 01/11/2014 · NO ACTÚE A PROPUESTA COMISIÓN O AREXSEG (TODOS MIEMBROS O NO)', l: [`Miembros: ${KY('≥ 72 %')}`, `Población: ${P('≥ 65 %')}`] }]));

// ───────── Art. 17 · cómo se nombra la Comisión (cuadro propio de estudio; art. 17.7 TUE) ─────────
v('Artículo 17 — La Comisión', flujo('Cómo se nombra la Comisión (art. 17.7 TUE)', [
  { et: 1, t: `El ${G('Consejo Europeo')} propone al PE, por ${Y('mayoría cualificada')}, un candidato a ${D('Presidente')} (teniendo en cuenta las elecciones europeas)` },
  { et: 2, t: `El ${G('Parlamento Europeo')} lo elige por ${Y('mayoría de los miembros que lo componen')} · si no obtiene la mayoría, nuevo candidato en el plazo de ${P('1 mes')}` },
  { et: 3, t: `El ${G('Consejo')}, de común acuerdo con el Presidente electo, adopta la lista de los demás miembros` },
  { et: 4, t: `Presidente, Alto Representante y demás miembros se someten ${D('colegiadamente')} al voto de aprobación del ${G('Parlamento Europeo')}` },
  { et: 5, t: `La Comisión es nombrada por el ${G('Consejo Europeo')}, por ${Y('mayoría cualificada')}` }]));

// ───────── Comparativa oficial: Parlamento Europeo frente a Consejo Europeo (pág. 14 del oficial) ─────────
v('Artículo 15 — Consejo Europeo', cols('Parlamento Europeo frente a Consejo Europeo (arts. 14 y 15 TUE · cuadro del temario)', [
  { t: 'PARLAMENTO EUROPEO', l: [`${Y('Composición')}: representantes de los Ciudadanos de la Unión · no excederá de ${P('750')} + el Presidente · representación decrecientemente proporcional: mínimo ${P('6')} Diputados por Estado Miembro y máximo ${P('96')} escaños · elegido por ${P('5 años')} por sufragio universal directo, libre y secreto · Presidente y mesa elegidos de entre sus diputados.`, `${Y('Funciones')}: Control Político y Funciones Consultivas (según las condiciones de los tratados) · Elección del Presidente de la Comisión · función legislativa y presupuestaria con el Consejo.`] },
  { t: 'CONSEJO EUROPEO', l: [`${Y('Composición')}: Jefes de Estado o de Gobierno · Presidente del Consejo Europeo · Presidente de la Comisión · participación del Alto Representante.`, `${Y('Reuniones')}: ${P('2 veces por semestre')} por convocatoria del Presidente · reunión extraordinaria · se pronunciará por consenso salvo disposición contraria.`, `${Y('Funciones')}: dará a la Unión los impulsos necesarios para su desarrollo · define sus orientaciones y prioridades políticas generales · ${K('no funciones legislativas')}.`] }], true));

module.exports = V;
if (require.main === module) L.inserta(3, V);
