require('../esq-virtual.js');
// Cuadros visuales del Tema 19 (CP Parte Especial): recrean los cuadros de tu temario (PDF 08-08-2026) con su texto. Colores copiados de tu fosforito.
//   p5 homicidio y asesinato (arts. 138-140) · p6 delito de aborto (arts. 144-145) · p8-9 detenciones/secuestro · p10 amenazas y coacciones · p17 agresión sexual · p19 menores de 16 · p22 prostitución · p29-30 calumnias e injurias · p33 socorro · p182 derecho de gentes · p190 piratería · p171 organización/grupo criminal · p157 garantías constitucionales · p163 atentado/resistencia · p134 prevaricación judicial · p140-141 quebrantamiento/evasión · p150 usurpación · p122-123 cohecho · p126 tráfico de influencias · p107 seguridad vial · p117 prevaricación/nombramiento · p42 administración desleal/apropiación indebida · p39 hurtos y robos
// Uso: node prompts/herramientas/tema19/visuales-t19.js (idempotente: sustituye los anteriores marcados <!--VIS19-->). Lo usará expres/t19.js (module.exports = V).
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);

// ───────── p5 · arts. 138-140 · HOMICIDIO Y SUS FORMAS ─────────
v('cp', 'perteneciere a un grupo u organización criminal', cols('HOMICIDIO Y SUS FORMAS (cuadro del temario · arts. 138-140)', [
  { t: 'HOMICIDIO · art. 138', l: [`${D('Matar a otra persona')}.`, `En su forma ${D('agravada')} → ASESINATO.`] },
  { t: 'ASESINATO · arts. 139 y 140', l: [`${D('Alevosía')}.`, `${D('Precio, recompensa o promesa')}.`, `${D('Ensañamiento')}, aumentando deliberada e inhumanamente el dolor del ofendido.`, `Para ${D('facilitar otro delito')} o ${D('evitar que se descubra')}.`] },
  { t: 'PRISIÓN PERMANENTE REVISABLE · art. 140', l: [`Que la víctima sea ${G('menor de dieciséis años')} de edad, o se trate de una persona ${G('especialmente vulnerable')} por razón de su edad, enfermedad o discapacidad.`, `Que el hecho fuera subsiguiente a un delito ${G('contra la libertad sexual')} que el autor hubiera cometido sobre la víctima.`, `Que el delito se hubiera cometido por quien perteneciere a un ${D('grupo u organización criminal')}.`, `${D('Reo de asesinato')} que hubiera sido condenado por la ${D('muerte de más de dos personas')}.`] },
]));

// ───────── p6 · arts. 144-145 · DELITO DE ABORTO ─────────
v('cp', 'consintiere que otra persona se lo cause', tabla('DELITO DE ABORTO · arts. 144 y 145 CP (cuadro del temario)', ['Conducta típica', 'Sujeto activo'], [
  { l: 'Producir el aborto de una mujer SIN su CONSENTIMIENTO', c: 'o', h: [
    { p: 'Sin consentimiento', c: 'o', t: `Habiendo obtenido la anuencia de la mujer ${D('mediante violencia, amenaza o engaño')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Cualquier persona')}.` }] },
  { l: 'Producir el aborto de una mujer CON su CONSENTIMIENTO', c: 'v', h: [
    { p: 'Con consentimiento', c: 'v', t: `${D('Fuera de los casos permitidos por la ley')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Cualquier persona')}.` }] },
  { l: 'Cuando fuera de los casos permitidos por la ley', c: 'c', h: [
    { p: 'La mujer', c: 'c', t: `${D('Produce su propio aborto')}, o ${D('consiente que otra persona se lo cause')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Propia mujer embarazada')}.` }] },
]));


// ───────── p8-9 · arts. 163-165 · DETENCIONES ILEGALES / SECUESTRO ─────────
v('cp', 'o funcionario público en el ejercicio de sus funciones', cols('DETENCIONES ILEGALES · SECUESTRO (cuadro del temario · arts. 163 a 165)', [
  { t: 'DETENCIONES ILEGALES', l: [`TIPO BÁSICO: ${D('El particular')} que ${D('encerrare o detuviere')} a otro, privándole de su libertad.`, `OTROS TIPOS · ATENUADO: si el culpable diera libertad al encerrado o detenido ${P('dentro de los tres primeros días')} de su detención, ${D('sin haber logrado el objeto')} que se había propuesto.`, `OTROS TIPOS · AGRAVADO: si el encierro o detención ha durado ${P('más de quince días')}.`, `El particular que, ${D('fuera de los casos permitidos por las leyes')}, aprehendiere a una persona para presentarla ${D('inmediatamente a la autoridad')}.`] },
  { t: 'SECUESTRO', l: [`TIPO BÁSICO: ${D('Secuestro')} de una persona ${D('exigiendo alguna condición')} para ponerla en libertad.`, `OTROS TIPOS · AGRAVADO: si el secuestro ha durado ${P('más de quince días')}.`, `OTROS TIPOS · ATENUADO: si el culpable diera la libertad al secuestrado dentro de los ${P('tres primeros días')}, ${D('sin haber logrado el objeto')} que se había propuesto.`] },
  { t: 'ART. 165 · MITAD SUPERIOR (ambos)', l: [`Cuando se ha cometido con ${D('simulación de autoridad o función pública')}, o la víctima fuere ${G('menor de edad')} o ${G('persona con discapacidad necesitada de especial protección')}, o ${G('funcionario público en el ejercicio de sus funciones')}.`] },
]));

// ───────── p10 · art. 169 · DELITO DE AMENAZAS ─────────
v('cp', 'o en nombre de entidades o grupos reales o supuestos', flujo('DELITO DE AMENAZAS · art. 169 (cuadro del temario)', [
  { et: 'Conducta', c: 'o', t: `El que ${D('amenazare')} a otro con causarle a él, a su familia o a otras personas con las que esté ${Y('íntimamente vinculado')} un mal que constituya delitos de homicidio, lesiones, aborto, contra la libertad, torturas y contra la integridad moral, la libertad sexual, la intimidad, el honor, el patrimonio y el orden socioeconómico.` },
  { et: 'AMENAZA CONDICIONAL', c: 'v', t: `Si se hubiere hecho la amenaza ${D('exigiendo una cantidad')}, o imponiendo cualquier ${D('otra condición')}, ${K('aunque no sea ilícita')}.` },
  { et: 'MITAD SUPERIOR', c: 'c', t: `Si se hace ${D('por escrito')}, ${D('por teléfono')} o por cualquier medio de comunicación o de reproducción, o ${D('en nombre de entidades o grupos reales o supuestos')}.` },
]));

// ───────── p10 · art. 172.1 · DELITOS DE COACCIONES ─────────
v('cp', 'impedir el legítimo disfrute de la vivienda', cols('DELITOS DE COACCIONES (cuadro del temario · art. 172.1)', [
  { t: 'El que, SIN ESTAR LEGÍTIMAMENTE AUTORIZADO', l: [`${D('Impidiere')} a otro ${D('con violencia')} hacer lo que la ley no prohíbe.`, `${D('Compeliere')} a otro a efectuar lo que no quiere, ${D('sea justo o injusto')}.`] },
  { t: 'PENA EN SU MITAD SUPERIOR', l: [`${D('Impidiere')} a otro el ejercicio de un ${D('derecho fundamental')} (salvo que el hecho tuviera señalada mayor pena en otro precepto de este Código).`, `${D('Impidiere')} a otro el legítimo ${D('disfrute de la vivienda')}.`] },
]));


// ───────── p17 · arts. 178-180 · AGRESIÓN SEXUAL (cuadro impreso sin fosforito: colores por método) ─────────
v('cp', 'anulado la voluntad de la víctima suministrándole fármacos', cols('AGRESIÓN SEXUAL (cuadro del temario · arts. 178, 179 y 180)', [
  { t: 'TIPO BÁSICO · art. 178 · Agresión sexual', l: [`El que realice ${D('cualquier acto que atente contra la libertad sexual')} de otra persona ${K('sin su consentimiento')}.`, `Hay consentimiento cuando se haya manifestado ${D('libremente')} mediante actos que, en atención a las circunstancias del caso, expresen de manera clara la voluntad de la persona.`, `Se consideran en todo caso agresión sexual los actos de contenido sexual que se realicen empleando: ${D('violencia')}, ${D('intimidación')} o ${D('abuso de una situación de superioridad o de vulnerabilidad')} de la víctima; los que se ejecuten sobre personas ${D('privadas de sentido')} o de cuya situación mental se abusare; y los que se realicen cuando la víctima tenga ${D('anulada por cualquier causa su voluntad')}.`] },
  { t: 'TIPO CUALIFICADO · art. 179 · Violación sexual', l: [`Cuando la agresión sexual consista en ${D('acceso carnal por vía vaginal, anal o bucal')}, o en ${D('introducción de miembros corporales u objetos')} por alguna de las dos primeras vías.`] },
  { t: 'SUBTIPOS CUALIFICADOS · art. 180 · Circunstancias', l: [`${D('Actuación conjunta de dos o más personas')}.`, `Agresión sexual precedida o acompañada de ${D('violencia de extrema gravedad')} o de actos con carácter particularmente degradante o vejatorio.`, `Hechos cometidos contra una persona en situación de ${D('especial vulnerabilidad')} por razón de su edad, enfermedad, discapacidad o cualquier otra circunstancia, salvo lo dispuesto en el artículo 181.`, `La víctima sea o haya sido ${G('esposa o mujer ligada por análoga relación de afectividad')}, aun sin convivencia.`, `El responsable se hubiera prevalido de una situación o relación de ${D('convivencia o de parentesco')} o de una relación de ${D('superioridad')} respecto a la víctima.`, `Uso de ${D('armas u otros medios igualmente peligrosos')}, susceptibles de producir la muerte o alguna de las lesiones de los artículos 149 y 150, sin perjuicio del artículo 194 bis.`, `Haber ${D('anulado la voluntad')} de la víctima suministrándole ${D('fármacos, drogas')} o cualquier otra sustancia natural o química idónea.`] },
]));

// ───────── p19 · art. 181 · AGRESIONES SEXUALES A MENORES DE DIECISÉIS AÑOS ─────────
v('cp', 'cuando sea menor de cuatro años', cols('AGRESIONES SEXUALES A MENORES DE DIECISÉIS AÑOS (cuadro del temario · art. 181)', [
  { t: 'ACTOS DE CARÁCTER SEXUAL · art. 181', l: [`El que realizare ${D('actos de carácter sexual con un menor de dieciséis años')}, o los que realice el menor con un tercero o sobre sí mismo a instancia del autor.`, `O el acto sexual consista en ${D('acceso carnal por vía vaginal, anal o bucal')}, o en introducción de miembros corporales u objetos por alguna de las dos primeras vías.`, `Las conductas serán castigadas con la pena de prisión correspondiente en su ${P('mitad superior')} cuando concurra alguna de las siguientes circunstancias:`] },
  { t: 'CIRCUNSTANCIAS (1)', l: [`${D('Actuación conjunta de dos o más personas')}.`, `Agresión sexual precedida o acompañada de ${D('violencia de extrema gravedad')} o de actos particularmente degradantes o vejatorios.`, `Hechos contra persona en situación de ${D('especial vulnerabilidad')} por razón de su edad, enfermedad, discapacidad o cualquier otra circunstancia y, en todo caso, cuando sea ${P('menor de cuatro años')}.`] },
  { t: 'CIRCUNSTANCIAS (2) y (3)', l: [`La víctima sea o haya sido ${G('pareja del autor')}, aun sin convivencia.`, `El responsable se hubiera prevalido de una relación de ${D('convivencia, parentesco o superioridad')}.`, `Uso de ${D('armas u otros medios igualmente peligrosos')} (arts. 149 y 150, sin perjuicio del 194 bis).`, `Haber ${D('anulado la voluntad')} de la víctima suministrándole fármacos, drogas o cualquier otra sustancia idónea.`, `La infracción se haya cometido en el seno de una ${D('organización o grupo criminal')} que se dedicare a la realización de tales actividades.`] },
]));

// ───────── p22 · art. 187 · PROSTITUCIÓN DE MAYORES DE EDAD ─────────
v('cp', 'condiciones gravosas, desproporcionadas o abusivas', cols('PROSTITUCIÓN DE MAYORES DE EDAD (cuadro del temario · art. 187)', [
  { t: 'TIPO BÁSICO · art. 187.1', l: [`El que, empleando ${D('violencia')}, ${D('intimidación')} o ${D('engaño')}, o ${D('abusando de una situación de superioridad, necesidad o vulnerabilidad')}, determine a una persona ${G('mayor de edad')} a ${D('ejercer o mantenerse en la prostitución')}.`, `Quien se ${D('lucre explotando')} la prostitución de otra persona, ${K('aun con el consentimiento')} de la misma. Hay explotación cuando concurra alguna de estas circunstancias: que la víctima se encuentre en situación de ${D('vulnerabilidad personal o económica')}; que se le impongan para su ejercicio ${D('condiciones gravosas, desproporcionadas o abusivas')}.`] },
  { t: 'TIPO CUALIFICADO · art. 187.2 · AGRAVANTE → MITAD SUPERIOR', l: [`${D('Prevalerse de su condición de autoridad, agente de ésta o funcionario público')}.`, `${D('Pertenecer a una organización o grupo criminal')} que se dedicare a la realización de tales actividades.`, `${D('Poner en peligro')}, de forma dolosa o por imprudencia grave, la vida o salud de la víctima.`] },
]));


// ───────── p33 · arts. 195-196 · OMISIÓN DEL DEBER DE SOCORRO ─────────
v('cp', 'riesgo grave para la salud de las personas', tabla('OMISIÓN DEL DEBER DE SOCORRO (cuadro del temario · arts. 195 y 196)', ['Conducta típica', 'Requisitos'], [
  { l: 'Omisión de socorro personal · art. 195.1', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('NO SOCORRER')} cuando pudiere hacerlo ${K('sin riesgo propio ni de terceros')}.` },
    { p: 'Requisitos', c: 'v', t: `Sujeto pasivo: persona que se halle ${D('desamparada')} y en ${D('peligro manifiesto y grave')}.` }] },
  { l: 'Omisión de petición de socorro · art. 195.2', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('NO DEMANDAR con urgencia auxilio ajeno')}.` },
    { p: 'Requisitos', c: 'v', t: `${D('Imposibilidad de prestar socorro')}.` }] },
  { l: 'Omisión de socorro a la víctima del accidente · art. 195.3', c: 'c', h: [
    { p: 'Conducta', c: 'o', t: `${D('OMITIR AUXILIO')} a la víctima del accidente ocasionado.` },
    { p: 'Requisitos', c: 'v', t: `Que el accidente se haya ocasionado de forma ${D('fortuita o imprudente')}.` }] },
  { l: 'Omisión de prestar asistencia sanitaria · art. 196 (pena: MITAD SUPERIOR)', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('DENEGAR ASISTENCIA SANITARIA o ABANDONAR los SERVICIOS SANITARIOS')}.` },
    { p: 'Requisitos', c: 'v', t: `${G('Sujeto activo: profesional obligado a prestar asistencia sanitaria')}. Que la denegación o abandono se derive ${D('riesgo grave para la salud de las personas')}.` }] },
]));

// ───────── p39 · arts. 234-236 · DE LOS HURTOS ─────────
v('cp', 'con perjuicio del mismo o de un tercero', flujo('DE LOS HURTOS · arts. 234 a 236 (cuadro del temario)', [
  { et: 'Art. 234 · Hurto', c: 'o', t: `${D('Ánimo de lucro')}: ${D('tomar cosas muebles ajenas')}, ${K('sin la voluntad de su dueño')}. Según la cuantía de lo sustraído: si excediese de 400 euros → prisión; si NO excediese de 400 euros → multa (salvo que concurra alguna de las circunstancias del art. 235).` },
  { et: 'Mitad superior', c: 'c', t: `Cuando en la comisión del hecho se hubieran ${D('neutralizado, eliminado o inutilizado')} dispositivos de alarma o seguridad instalados en las cosas sustraídas por cualquier medio: mitad superior de las penas anteriores, en sus respectivos casos.` },
  { et: 'Art. 235 · Hurtos agravados', c: 'v', t: `Cuando se produzca ${D('alguna de las circunstancias del art. 235')}.` },
  { et: 'Art. 236 · Hurto de cosa propia', c: 'v', t: `Cuando, siendo ${D('dueño de una cosa mueble')} o actuando con el consentimiento de éste, la sustrajere de quien la tenga ${D('legítimamente en su poder')}, con perjuicio del mismo o de un tercero.` },
]));

// ───────── p39 · art. 237 · DE LOS ROBOS ─────────
v('cp', 'o sobre los que acudiesen en auxilio de la víctima o que le persiguieren', cols('DE LOS ROBOS · art. 237 (cuadro del temario)', [
  { t: 'Apoderarse de cosas muebles ajenas', l: [`${D('Apoderarse')} de cosas muebles ajenas + con ${Y('ánimo de lucro')}.`] },
  { t: 'Empleando FUERZA en las cosas', l: [`${D('Fuerza en las cosas')} para ${D('acceder o abandonar')} el lugar donde éstas se encuentran (robo con fuerza en las cosas: arts. 238 a 240).`] },
  { t: 'Empleando VIOLENCIA o INTIMIDACIÓN', l: [`${D('Violencia o intimidación en las personas')}, ya sea: ${P('al cometer el delito')}, ${P('para proteger la huida')} o ${P('sobre los que acudiesen en auxilio de la víctima o que le persiguieren')}.`] },
]));


// ───────── p29 · arts. 205-207 · DELITO DE CALUMNIAS ─────────
v('cp', 'probando el hecho criminal que hubiere imputado', flujo('DELITO DE CALUMNIAS · arts. 205 a 207 (cuadro del temario)', [
  { et: 'Conducta · art. 205', c: 'o', t: `${D('IMPUTAR un delito')} + con ${Y('conocimiento de su falsedad')}, o con ${Y('temerario desprecio hacia la verdad')}.` },
  { et: '«Exceptio veritatis»', c: 'v', t: `El acusado de calumnia quedará ${K('EXENTO')} de toda pena ${D('probando el hecho criminal que hubiere imputado')}.` },
]));

// ───────── p30 · arts. 208-210 · DELITO DE INJURIAS ─────────
v('cp', 'referidos a la comisión de infracciones administrativas', flujo('DELITO DE INJURIAS · arts. 208 a 210 (cuadro del temario)', [
  { et: 'Conducta · art. 208', c: 'o', t: `${D('Acción o expresión')} que ${D('lesionen la dignidad')} de otra persona, ${D('menoscaben su fama')} o ${D('atenten contra su propia estimación')}. Solo son delito las que, por su naturaleza, efectos y circunstancias, sean tenidas en el concepto público por ${P('graves')}.` },
  { et: '«Exceptio veritatis» · art. 210', c: 'v', t: `El acusado de injuria quedará ${K('EXENTO')} de responsabilidad ${D('probando la verdad de las imputaciones')} cuando éstas se dirijan contra ${G('funcionarios públicos')} sobre hechos concernientes al ejercicio de sus cargos o referidos a la comisión de infracciones administrativas.` },
]));


// ───────── p42 · arts. 252-253 · ADMINISTRACIÓN DESLEAL / APROPIACIÓN INDEBIDA ─────────
v('cp', 'obligación de entregarlos o devolverlos', cols('ADMINISTRACIÓN DESLEAL · APROPIACIÓN INDEBIDA (cuadro del temario · arts. 252 y 253)', [
  { t: 'ADMINISTRACIÓN DESLEAL · art. 252', l: [`${D('Causar un perjuicio al patrimonio administrado')} + ${D('excediéndose en las facultades de administración')}.`, `Tener ${Y('facultades para administrar un patrimonio ajeno')}: emanadas de la ${D('Ley')}; encomendadas por la ${G('autoridad')}; asumidas mediante un ${D('negocio jurídico')}.`] },
  { t: 'APROPIACIÓN INDEBIDA · art. 253', l: [`${D('Apropiarse para sí o para un tercero')} de dinero, efectos, valores o cualquier cosa mueble, o ${D('negar haberlo recibido')}.`, `Haber recibido el dinero, efectos, valores o cosas muebles: en ${D('depósito, comisión o custodia')}, o ${D('confiados')} en virtud de cualquier otro título que produzca la ${P('obligación de entregarlos o devolverlos')}.`] },
]));


// ───────── arts. 305-310 bis · DELITOS CONTRA LA HACIENDA PÚBLICA Y CONTRA LA SEGURIDAD SOCIAL (esquema manuscrito del usuario, p64, ampliado) ─────────
v('cp', 'prohibición para contratar con las Administraciones Públicas', tabla('DELITOS CONTRA LA HACIENDA PÚBLICA Y LA SEGURIDAD SOCIAL · arts. 305 a 310 bis (tu esquema manuscrito, ampliado)', ['Delito · bien jurídico', 'Cuantía, regla y consecuencias'], [
  { l: `HACIENDA PÚBLICA · art. 305 (estatal, autonómica, foral o local)`, c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Defraudar por acción u omisión')}: eludir tributos, retenciones o ingresos a cuenta, obtener devoluciones o disfrutar beneficios fiscales indebidos.` },
    { p: 'Cuantía', c: 'o', t: `Cuota defraudada ${P('más de 120.000 €')}. ${K('La mera presentación')} de declaraciones o autoliquidaciones ${K('no excluye')} la defraudación.` },
    { p: 'Cómputo', c: 'v', t: `Tributos periódicos: lo defraudado en ${P('cada período impositivo o declaración')} (si es inferior a 12 meses, ${P('año natural')}). Resto: cada concepto liquidable. Si hay ${G('organización o grupo criminal')} o sociedades pantalla, es perseguible desde que se alcance la cuantía.` },
    { p: 'Regularización', c: 'c', t: `Se regulariza si se reconoce y paga la deuda antes de que se notifique el inicio de actuaciones de comprobación o, sin ellas, antes de querella, denuncia o diligencias → ${K('no se castiga')}. También si se paga ${D('una vez prescrito')} el derecho de la Administración.` },
    { p: 'Accesoria', c: 'v', t: `${D('Pérdida de subvenciones, ayudas y beneficios fiscales o de la Seguridad Social')}: ${P('3 a 6 años')}.` },
    { p: 'Procedimiento', c: 'c', t: `La Administración puede ${D('liquidar de forma separada')} lo vinculado al delito. El proceso penal ${K('no paraliza')} el cobro, salvo suspensión judicial con ${D('garantía')} (o dispensa excepcional).` },
  ] },
  { l: `HACIENDA PÚBLICA · AGRAVADO · art. 305 bis`, c: 'c', h: [
    { p: 'Cuantía', c: 'o', t: `Cuota defraudada ${P('más de 600.000 €')}.` },
    { p: 'Organización', c: 'v', t: `Defraudación en el seno de ${G('una organización o grupo criminal')}.` },
    { p: 'Ocultación', c: 'v', t: `Uso de ${D('personas o entes interpuestos, negocios fiduciarios, paraísos fiscales')} que oculte o dificulte la identidad del obligado o la cuantía.` },
    { p: 'Accesoria', c: 'c', t: `${D('Pérdida de subvenciones y beneficios')}: ${P('4 a 8 años')}.` },
  ] },
  { l: `HACIENDA DE LA UNIÓN EUROPEA · art. 305.3`, c: 'v', h: [
    { p: 'Cuantía', c: 'o', t: `Más de ${P('100.000 €')} en el plazo de ${P('un año natural')}.` },
    { p: 'Atenuado', c: 'c', t: `No supera 100.000 € pero excede de ${P('10.000 €')} → prisión de ${P('3 meses a 1 año')} o multa del tanto al triplo, y pérdida de subvenciones ${P('6 meses a 2 años')}.` },
  ] },
  { l: `PRESUPUESTOS GENERALES DE LA UE · art. 306`, c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Defraudar a los presupuestos de la UE u otros administrados por ésta')}: eludir pagos, dar a los fondos ${D('aplicación distinta')} u obtenerlos falseando condiciones.` },
    { p: 'Cuantía', c: 'o', t: `Más de ${P('50.000 €')}.` },
    { p: 'Atenuado', c: 'c', t: `No supera 50.000 € pero excede de ${P('4.000 €')} → prisión de ${P('3 meses a 1 año')} o multa del tanto al triplo, y pérdida de subvenciones ${P('6 meses a 2 años')}.` },
    { p: 'Accesoria', c: 'v', t: `${D('Pérdida de subvenciones y beneficios')}: ${P('3 a 6 años')}.` },
  ] },
  { l: `SEGURIDAD SOCIAL · art. 307 (cuotas y conceptos de recaudación conjunta)`, c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Defraudar a la Seguridad Social')}: eludir cuotas, obtener devoluciones o disfrutar deducciones indebidas.` },
    { p: 'Cuantía', c: 'o', t: `Más de ${P('50.000 €')}, computado sobre ${P('cuatro años naturales')}. ${K('La mera presentación')} de documentos de cotización ${K('no excluye')} la defraudación.` },
    { p: 'Regularización', c: 'c', t: `Se regulariza si se reconoce y paga la deuda antes de que se notifiquen actuaciones inspectoras o, sin ellas, antes de querella o denuncia del ${G('Ministerio Fiscal')} o del ${G('Letrado de la Seguridad Social')}, o de diligencias.` },
    { p: 'Pena inferior', c: 'v', t: `${D('Inferior en uno o dos grados')} si, antes de ${P('2 meses')} desde la citación como imputado, satisface la deuda y reconoce los hechos; también a otros partícipes que ${D('colaboren activamente')}.` },
    { p: 'Procedimiento', c: 'c', t: `El proceso penal ${K('no paraliza')} la liquidación y cobro, salvo que el Juez lo acuerde con ${D('garantía')}. Multa y responsabilidad civil: ${D('apremio')} por la Administración de la Seguridad Social.` },
  ] },
  { l: `SEGURIDAD SOCIAL · AGRAVADO · art. 307 bis`, c: 'c', h: [
    { p: 'Cuantía', c: 'o', t: `Más de ${P('120.000 €')}.` },
    { p: 'Organización', c: 'v', t: `${G('Organización o grupo criminal')} u ocultación mediante ${D('interpuestos, fiduciarios, paraísos fiscales')}.` },
    { p: 'Accesoria', c: 'c', t: `${D('Pérdida de subvenciones y beneficios')}: ${P('4 a 8 años')}. Le son aplicables ${D('todas las previsiones del art. 307')}.` },
  ] },
  { l: `FRAUDE EN PRESTACIONES DE LA SEGURIDAD SOCIAL · art. 307 ter`, c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Obtener, prolongar o facilitar a otros')} prestaciones por ${D('error provocado')} mediante simulación, tergiversación u ocultación consciente de hechos, con ${D('perjuicio a la Administración Pública')}.` },
    { p: 'Pena', c: 'o', t: `Prisión de ${P('6 meses a 3 años')}; si no hay especial gravedad, ${D('multa')} del tanto al séxtuplo.` },
    { p: 'Agravado', c: 'v', t: `Prestaciones de ${P('más de 50.000 €')} o circunstancias b) o c) del art. 307 bis.1 → prisión de ${P('2 a 6 años')} y multa del tanto al séxtuplo.` },
    { p: 'Exención', c: 'c', t: `${K('Exento de responsabilidad')} quien reintegre el valor de la prestación con interés, antes de que se le notifique la iniciación de actuaciones o de querella, denuncia o diligencias. El proceso penal ${K('no impide')} el reintegro administrativo.` },
  ] },
  { l: `SUBVENCIONES Y AYUDAS PÚBLICAS · art. 308`, c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `Obtener subvenciones o ayudas de las Administraciones Públicas (incluida la UE) ${D('falseando las condiciones')} u ${D('ocultando las que lo hubieran impedido')}, o aplicarlas a ${D('fines distintos')}.` },
    { p: 'Cuantía', c: 'o', t: `Más de ${P('100.000 €')} → prisión de ${P('1 a 5 años')} y multa del tanto al séxtuplo, ${K('salvo')} reintegro.` },
    { p: 'Atenuado', c: 'c', t: `No supera 100.000 € pero excede de ${P('10.000 €')} → prisión de ${P('3 meses a 1 año')} o multa del tanto al triplo, ${K('salvo')} reintegro.` },
    { p: 'Accesoria', c: 'v', t: `${D('Pérdida de subvenciones y beneficios')}: ${P('3 a 6 años')} (${P('6 meses a 2 años')} en el atenuado).` },
    { p: 'Reintegro', c: 'c', t: `Devolver lo percibido con ${D('interés de demora')} ${P('antes')} de que se notifiquen actuaciones de comprobación o control, o de querella, denuncia o diligencias. Evita perseguir las falsedades instrumentales.` },
    { p: 'Pena inferior', c: 'v', t: `${D('Uno o dos grados')} si, antes de ${P('2 meses')} desde la citación como investigado, reintegra y reconoce los hechos; también a partícipes que colaboren.` },
  ] },
  { l: `SUSPENSIÓN DE LA PENA · art. 308 bis (todo el Título)`, c: 'c', h: [
    { p: 'Requisito', c: 'o', t: `Además del art. 80: haber ${D('abonado la deuda')} o reintegrado la subvención. Se entiende cumplido si ${D('asume el compromiso')} de pagar según su capacidad económica y facilitar el decomiso, y es razonable esperar que lo cumplirá.` },
    { p: 'No se concede', c: 'c', t: `Si ha facilitado ${D('información inexacta o insuficiente')} sobre su patrimonio. Se ${D('revoca')} si incumple el compromiso o la oculta.` },
  ] },
  { l: `ART. 309 · derogado`, c: 'v', h: [
    { t: `${K('Derogado')}: no hay contenido que estudiar.` },
  ] },
  { l: `DELITO CONTABLE · art. 310 (obligado por ley tributaria a llevar contabilidad)`, c: 'o', h: [
    { p: 'Pena', c: 'o', t: `Prisión de ${P('5 a 7 meses')}.` },
    { p: 'a)', c: 'o', t: `${D('Incumplir absolutamente')} la obligación en régimen de ${D('estimación directa')}.` },
    { p: 'b)', c: 'v', t: `Llevar ${D('contabilidades distintas')} que oculten o simulen la verdadera situación de la empresa.` },
    { p: 'c) y d)', c: 'c', t: `No anotar o anotar con ${D('cifras distintas')} operaciones; o practicar ${D('anotaciones ficticias')}. Solo son delito si se omitieron las declaraciones (o reflejan la falsa contabilidad) y la cuantía excede de ${P('240.000 € por ejercicio')}, ${K('sin compensación aritmética')}.` },
  ] },
  { l: `PERSONAS JURÍDICAS · art. 310 bis`, c: 'v', h: [
    { p: 'Multa', c: 'o', t: `Del ${P('tanto al doble')} de lo defraudado (física con prisión de más de 2 años) · del ${P('doble al cuádruple')} (más de 5 años) · de ${P('6 meses a 1 año')} (art. 310).` },
    { p: 'Además', c: 'c', t: `${D('Pérdida de subvenciones y beneficios')} ${P('3 a 6 años')}; podrá imponerse la ${D('prohibición de contratar')} con las Administraciones Públicas y las penas del art. 33.7 b), c), d), e) y g) (art. 66 bis).` },
  ] },
]));

// ───────── p107 · art. 379 · DELITOS CONTRA LA SEGURIDAD VIAL ─────────
v('cp', 'una tasa de alcohol en sangre superior a 1,2 gramos por litro', cols('DELITOS CONTRA LA SEGURIDAD VIAL (cuadro del temario · art. 379)', [
  { t: 'POR EXCESO DE VELOCIDAD · 379.1', l: [`${D('Conducir')}: vehículo de motor o ciclomotor.`, `+ Velocidad superior a la permitida reglamentariamente: ${P('60 km/h en vía urbana')} · ${P('80 km/h en vía interurbana')}.`] },
  { t: 'BAJO EFECTOS DE ALCOHOL O DROGAS · 379.2', l: [`${D('Conducir')}: vehículo de motor o ciclomotor.`, `Bajo la influencia de ${D('drogas tóxicas, estupefacientes o sustancias psicotrópicas')}.`, `Bajo la influencia de ${D('bebidas alcohólicas')}: tasa de alcohol en aire espirado superior a ${P('0,60 miligramos por litro')}, o tasa de alcohol en sangre superior a ${P('1,2 gramos por litro')}.`] },
]));

// ───────── p117 · arts. 404-406 · PREVARICACIÓN Y NOMBRAMIENTO ILEGAL ─────────
v('cp', 'sabiendo que carece de los requisitos legalmente exigibles', tabla('PREVARICACIÓN · NOMBRAMIENTO ILEGAL (cuadro del temario · arts. 404 a 406)', ['Conducta', 'Sujeto activo'], [
  { l: 'Prevaricación de funcionario público · art. 404', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Dictar')} resolución ${D('ARBITRARIA')} en un asunto administrativo, ${K('a sabiendas')} de su injusticia.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Autoridad o funcionario público')}.` }] },
  { l: 'Nombramiento ilegal · art. 405', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Propusiere, nombrare o diere posesión')} para el ejercicio de un determinado cargo público a cualquier persona sin que concurran los requisitos legalmente establecidos, ${K('a sabiendas')} de su ilegalidad.` },
    { p: 'Sujeto activo', c: 'v', t: `En el ejercicio de sus competencias: ${G('autoridad o funcionario público')}.` }] },
  { l: 'Aceptar nombramiento ilegal · art. 406', c: 'c', h: [
    { p: 'Conducta', c: 'o', t: `${D('Aceptar')} propuesta, nombramiento o toma de posesión, ${K('sabiendo')} que carece de los requisitos legales exigibles.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Cualquier persona')}.` }] },
]));


// ───────── p122 · arts. 419-422 · COHECHO PASIVO ─────────
v('cp', 'en consideración a su cargo o función', tabla('COHECHO PASIVO (cuadro del temario · arts. 419 a 422) · cometido por autoridad o funcionario público en provecho propio o de un tercero', ['Conducta', 'Para / finalidad'], [
  { l: 'Cohecho pasivo propio · art. 419', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Recibir o solicitar')} por sí o por persona interpuesta dádiva, favor o retribución de cualquier clase, o ${D('aceptar')} ofrecimiento o promesa.` },
    { p: 'Para', c: 'v', t: `Realizar en el ejercicio de su cargo un ${D('acto CONTRARIO')} a los deberes inherentes al cargo, o ${D('no realizar o retrasar injustificadamente')} actos que deba practicar.` }] },
  { l: 'Cohecho pasivo impropio · art. 420', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Recibir o solicitar')} por sí o por persona interpuesta dádiva, favor o retribución de cualquier clase, o ${D('aceptar')} ofrecimiento o promesa.` },
    { p: 'Para', c: 'v', t: `Realizar un ${D('acto PROPIO')} de su cargo.` }] },
  { l: 'Cohecho pasivo impropio · art. 421', c: 'c', h: [
    { p: 'Conducta', c: 'o', t: `${D('Recibir o solicitar')} por sí o por persona interpuesta dádiva, favor o retribución.` },
    { p: 'Para', c: 'v', t: `${D('RECOMPENSA')} por realizar alguna de las conductas descritas.` }] },
  { l: 'Cohecho pasivo IMPROPIO · art. 422', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Admitir')} por sí o por persona interpuesta dádiva o regalo.` },
    { p: 'Que', c: 'v', t: `Le fueren ofrecidos ${D('en consideración a su cargo o función')}.` }] },
]));

// ───────── p123 · arts. 424 · COHECHO ACTIVO ─────────
v('cp', 'atendiendo la solicitud de la autoridad, funcionario público o persona', tabla('COHECHO ACTIVO (cuadro del temario · art. 424) · cometido por los particulares', ['Conducta', 'Para / finalidad'], [
  { l: 'Art. 424.1', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Ofrecer o entregar')} dádiva o retribución de cualquier clase a: ${G('autoridad')}, ${G('funcionario público')} o ${G('persona que participe en el ejercicio de la función pública')}.` },
    { p: 'Para', c: 'v', t: `Que realice en el ejercicio de su cargo: ${D('acto CONTRARIO')} a los deberes inherentes a su cargo, ${D('acto PROPIO')} de su cargo, o para que ${D('no realice o retrase')} el que debiera practicar; en consideración a su cargo o función.` }] },
  { l: 'Art. 424.2', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Entregar')} la dádiva o retribución.` },
    { p: 'Atendiendo', c: 'v', t: `${D('Atendiendo la solicitud')} de la autoridad, funcionario público o persona que participe en el ejercicio de la función pública.` }] },
]));

// ───────── p126 · arts. 428-430 · TRÁFICO DE INFLUENCIAS ─────────
v('cp', 'solicitaren de terceros dádivas', tabla('TRÁFICO DE INFLUENCIAS (cuadro del temario · arts. 428 a 430; con círculo «Ex»)', ['Conducta · finalidad', 'Sujeto activo'], [
  { l: 'Influencia por funcionario o autoridad · art. 428', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Influenciar')} a funcionario público o autoridad ${K('prevaliéndose')} de: el ejercicio de ${D('facultades de su cargo')}, o situación derivada de su ${D('relación personal o jerárquica')} con éste o con otro funcionario o autoridad.` },
    { p: 'Finalidad', c: 'v', t: `${D('Conseguir')} una resolución que le pueda generar ${D('directa o indirectamente un beneficio económico')} para sí o para un tercero.` },
    { p: 'Sujeto activo', c: 'c', t: `${G('Funcionario público o autoridad')}.` }] },
  { l: 'Influencia por particular · art. 429', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Influenciar')} a funcionario público o autoridad ${K('prevaliéndose')} de situación derivada de su ${D('relación personal')} con éste o con otro funcionario público o autoridad.` },
    { p: 'Finalidad', c: 'v', t: `${D('Conseguir')} una resolución que le pueda generar ${D('directa o indirectamente un beneficio económico')} para sí o para un tercero.` },
    { p: 'Sujeto activo', c: 'c', t: `${G('Particular')}.` }] },
  { l: 'Ofrecimiento de influencias · art. 430', c: 'c', h: [
    { p: 'Finalidad', c: 'v', t: `${D('Solicitaren de terceros dádivas, presentes o cualquier otra remuneración')}, o aceptaren ofrecimiento o promesa.` },
    { p: 'Sujeto activo', c: 'c', t: `${G('Funcionario o autoridad; particular')} (incluye personas jurídicas).` }] },
]));


// ───────── p134 · arts. 446-449 · PREVARICACIÓN JUDICIAL ─────────
v('cp', 'finalidad ilegítima', tabla('PREVARICACIÓN JUDICIAL · RETARDO MALICIOSO (cuadro del temario · arts. 446 a 449; con círculo «Ex»)', ['Conducta', 'Sujeto activo'], [
  { l: 'Prevaricación dolosa · art. 446', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Dictar sentencia o resolución INJUSTA')}. «${K('A sabiendas')}» (requiere DOLO).` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Juez o Magistrado')}.` }] },
  { l: 'Prevaricación imprudente · art. 447', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Dictar sentencia o resolución manifiestamente INJUSTA')}, por ${D('imprudencia grave o ignorancia inexcusable')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Juez o Magistrado')}.` }] },
  { l: 'Prevaricación omisiva · art. 448', c: 'c', h: [
    { p: 'Conducta', c: 'o', t: `${D('NEGARSE a juzgar')}, sin alegar causa legal, o so pretexto de oscuridad, insuficiencia o silencio de la ley.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Juez o Magistrado')}.` }] },
  { l: 'Retardo malicioso · art. 449', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Causar retardo MALICIOSO')} en la Administración de Justicia, provocado para conseguir ${D('cualquier finalidad ilegítima')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Juez, Magistrado o Secretario Judicial')}.` }] },
]));

// ───────── p140 · art. 468 · DEL QUEBRANTAMIENTO DE CONDENA ─────────
v('cp', 'para mantener su correcto estado de funcionamiento', cols('DEL QUEBRANTAMIENTO DE CONDENA (cuadro del temario · art. 468)', [
  { t: 'Art. 468.1', l: [`${D('QUEBRANTAR')}: condena, prisión, medida de seguridad, medida cautelar, custodia o conducción.`, `Si estuvieran ${K('privados de libertad')} → una pena; ${D('demás casos')} → otra.`] },
  { t: 'Art. 468.2', l: [`${D('QUEBRANTAR')}: ${D('pena')} de las contempladas en el art. 48 CP; ${D('medida cautelar o de seguridad')} de la misma naturaleza impuesta en procesos criminales en los que el ofendido sea alguna de las personas del art. 173.2 CP; ${D('libertad vigilada')}.`] },
  { t: 'Art. 468.3', l: [`${D('INUTILIZAR o PERTURBAR')} el funcionamiento normal de los ${D('dispositivos técnicos')} dispuestos para controlar el cumplimiento de penas, medidas de seguridad o cautelares.`, `${D('NO LLEVAR CONSIGO')} estos dispositivos de control.`, `${D('OMITIR')} medidas exigibles para mantener su correcto estado de funcionamiento.`] },
]));

// ───────── p141 · arts. 469-471 · QUEBRANTAMIENTO CUALIFICADO / FAVORECIMIENTO DE LA EVASIÓN ─────────
v('cp', 'encargado de la conducción o custodia', tabla('QUEBRANTAMIENTO CUALIFICADO · FAVORECIMIENTO DE LA EVASIÓN (cuadro del temario · arts. 469 a 471)', ['Conducta', 'Sujeto activo'], [
  { l: 'Quebrantamiento cualificado · art. 469', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('FUGARSE')} del lugar en que estén recluidos: haciendo uso de ${D('violencia o intimidación')} en las personas, o de ${D('fuerza en las cosas')}, o ${D('tomando parte en motín')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Sentenciados o presos')}.` }] },
  { l: 'Favorecimiento de la evasión · art. 470', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('PROPORCIONAR la evasión')} de un condenado, preso o detenido: bien del lugar en que esté recluido, o durante su conducción.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Particular')}.` }] },
  { l: 'Favorecimiento de la evasión · art. 471', c: 'c', h: [
    { p: 'Conducta', c: 'o', t: `${D('PROPORCIONAR la evasión')} de un condenado, preso o detenido.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Funcionario público encargado de la conducción o custodia')} de un condenado, preso o detenido.` }] },
]));

// ───────── p150 · arts. 506-509 · USURPACIÓN DE ATRIBUCIONES ─────────
v('cp', 'sin esperar a que se decida el correspondiente conflicto jurisdiccional', tabla('USURPACIÓN DE ATRIBUCIONES (cuadro del temario · arts. 506 a 509; con círculo «Ex»)', ['Conducta', 'Sujeto activo'], [
  { l: 'Art. 506', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Dictar')} una disposición general, o ${D('suspender la ejecución')} de una disposición general, ${D('careciendo de las atribuciones')}.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Autoridad o funcionario público')}.` }] },
  { l: 'Art. 507', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Arrogarse atribuciones administrativas')} de las que careciere, o ${D('impedir su legítimo ejercicio')} por quien las ostentare.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Juez o Magistrado')}.` }] },
  { l: 'Art. 508.1', c: 'c', h: [
    { p: 'Conducta', c: 'o', t: `${D('Arrogarse atribuciones judiciales')}, o ${D('impedir ejecutar una resolución')} dictada por la autoridad judicial competente.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Autoridad o funcionario público')}.` }] },
  { l: 'Art. 508.2', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Atentar contra la independencia')} de los Jueces y Magistrados, garantizada por la Constitución, ${D('dirigiendo instrucción, orden o intimación')} relativas a causas o actuaciones que estén conociendo los Jueces o Magistrados.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Autoridad o funcionario administrativo o militar')}.` }] },
  { l: 'Art. 509', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Continuar procediendo')} sin esperar a que se decida el correspondiente ${D('conflicto jurisdiccional')} (salvo casos permitidos por la ley), estando legalmente requerido de inhibición.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Juez o Magistrado, o autoridad o funcionario público')}.` }] },
]));


// ───────── p157 · arts. 529-533 · DELITOS DE FUNCIONARIOS CONTRA LAS GARANTÍAS CONSTITUCIONALES ─────────
v('cp', 'usare con ellos de un rigor innecesario', tabla('DELITOS DE FUNCIONARIOS CONTRA LA LIBERTAD INDIVIDUAL Y LAS GARANTÍAS (cuadro del temario · arts. 529 a 533)', ['Conducta', 'Sujeto activo'], [
  { l: 'Entrega ilegal de causa criminal · art. 529', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Hacer entrega de')}: causa criminal, o persona detenida, entregando a otra autoridad o funcionario, militar o administrativo, que ${K('ilegalmente')} se la reclame.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Juez o Magistrado')}.` }] },
  { l: 'Detención ilegal · art. 530', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Acordar, practicar o prolongar')} cualquier ${D('PRIVACIÓN DE LIBERTAD')} de un detenido, preso o sentenciado: ${D('mediando causa por delito')}, ${K('violando plazos')} o demás garantías constitucionales o legales.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Autoridad o funcionario público')}.` }] },
  { l: 'Incomunicación ilegal · art. 531', c: 'c', h: [
    { p: 'Conducta', c: 'o', t: `${D('Decretar, practicar o prolongar la INCOMUNICACIÓN')} de un detenido, preso o sentenciado.` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Autoridad o funcionario público')}.` }] },
  { l: 'Excesos cometidos por funcionarios de prisiones · art. 533', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Imponer sanciones o privaciones indebidas')}, o ${D('usare rigor innecesario')}; dirigida a ${P('reclusos o internos')} (no a detenidos).` },
    { p: 'Sujeto activo', c: 'v', t: `${G('Funcionario penitenciario, o de centros de protección o corrección de menores')}.` }] },
]));

// ───────── p163 · arts. 550 y 556 · ATENTADO · RESISTENCIA Y DESOBEDIENCIA · FALTAR AL RESPETO ─────────
v('cp', 'faltaren al respeto y consideración debida', tabla('DELITO DE ATENTADO · RESISTENCIA Y DESOBEDIENCIA · FALTAR AL RESPETO (cuadro del temario · arts. 550 y 556)', ['Conducta', 'Sujeto pasivo'], [
  { l: 'Delito de atentado · art. 550', c: 'o', h: [
    { p: 'Conducta', c: 'o', t: `${D('Agredir')}; ${D('oponer resistencia grave')} (con intimidación grave o violencia); ${D('acometer')}. El delito se produce cuando el sujeto pasivo se halle en el ${D('ejercicio de las funciones')} de sus cargos o con ocasión de ellas.` },
    { p: 'Sujeto pasivo', c: 'v', t: `${G('Autoridad, sus agentes o funcionarios públicos')}; funcionarios ${G('docentes')}; funcionarios ${G('sanitarios')}.` }] },
  { l: 'Resistencia y desobediencia · art. 556.1', c: 'v', h: [
    { p: 'Conducta', c: 'o', t: `${D('Resistirse')}; ${D('desobedecer gravemente')} (sin estar comprendido en el art. 550 CP). El sujeto pasivo se halle en el ejercicio de sus funciones o cumpla los requisitos señalados.` },
    { p: 'Sujeto pasivo', c: 'v', t: `${G('Autoridad o sus agentes')}; ${G('personal de seguridad privada')} que cumpla los requisitos: debidamente identificado y que desarrolle actividades de seguridad privada en cooperación y bajo el mando de las Fuerzas y Cuerpos de Seguridad.` }] },
  { l: 'Faltar al respeto · art. 556.2', c: 'c', h: [
    { p: 'Conducta', c: 'o', t: `${D('Faltar al respeto y consideración debida')}. El sujeto pasivo se halle en el ejercicio de sus funciones.` },
    { p: 'Sujeto pasivo', c: 'v', t: `${G('Autoridad')}.` }] },
]));


// ───────── p171 · arts. 570 bis y ter · ORGANIZACIÓN CRIMINAL / GRUPO CRIMINAL (círculo «Exof») ─────────
v('cp', 'perpetración concertada de delitos', tabla('ORGANIZACIÓN CRIMINAL · GRUPO CRIMINAL (cuadro del temario · arts. 570 bis y 570 ter; con círculo «Exof»)', ['Organización criminal · 570 bis', 'Grupo criminal · 570 ter'], [
  { l: 'Concepto', c: 'o', h: [
    { p: '570 bis', c: 'o', t: `${D('Agrupación')} formada por ${P('más de dos personas')}: con carácter ${D('estable')} o por ${D('tiempo indefinido')}; que de manera ${D('concertada y coordinada')} se repartan diversas tareas o funciones con el fin de cometer delitos.` },
    { p: '570 ter', c: 'v', t: `${D('Unión')} de ${P('más de dos personas')}: que ${K('no')} reúnan alguna o algunas de las características de la organización criminal; que tengan por finalidad la ${D('perpetración concertada de delitos')}.` }] },
  { l: 'Conducta', c: 'v', h: [
    { p: '570 bis', c: 'o', t: `${D('Promover, constituir, organizar, coordinar o dirigir')} una organización criminal, o ${D('participar activamente')}, formar parte o cooperar económicamente o de cualquier otro modo.` },
    { p: '570 ter', c: 'v', t: `${D('Constituir, financiar o integrar')} un grupo criminal.` }] },
  { l: 'Finalidad del delito', c: 'c', h: [
    { p: '570 bis', c: 'o', t: `Comisión de ${D('delitos graves')}; demás casos.` },
    { p: '570 ter', c: 'v', t: `Comisión de delitos del art. 570 ter.1 (*delitos del art. 570.3 bis CP*), de ${D('cualquier otro delito grave')}, de ${D('uno o varios delitos menos graves')}, o perpetración ${D('reiterada')} de ${D('delitos leves')}.` }] },
]));


// ───────── p182 · arts. 605-606 · DELITOS CONTRA EL DERECHO DE GENTES ─────────
v('cp', 'violare la inmunidad personal', cols('DELITOS CONTRA EL DERECHO DE GENTES (cuadro del temario · arts. 605 y 606)', [
  { t: 'Delitos contra la vida · 605.1', l: [`${D('Matar')} al Jefe de un Estado extranjero o a otra persona internacionalmente protegida por un Tratado que se halle en España.`] },
  { t: 'Contra la salud e integridad física · 605.2', l: [`${D('Causar lesiones')} de las previstas en el art. 149 o 150.`] },
  { t: 'Otros delitos · 605.3', l: [`${D('Cometer cualquier otro delito contra')}: el ${G('sujeto pasivo')}, o sus ${G('locales oficiales, residencia particular o transporte')}.`] },
  { t: 'Violación de la inmunidad personal · 606.1', l: [`${D('Violar la inmunidad personal')} del Jefe de otro Estado o de otra persona internacionalmente protegida por un Tratado.`] },
]));

// ───────── p190 · arts. 616 ter y quater · DELITO DE PIRATERÍA ─────────
v('cp', 'sin perjuicio de las que correspondan por los delitos cometidos', cols('DELITO DE PIRATERÍA (cuadro del temario · arts. 616 ter y 616 quater)', [
  { t: 'Tipo básico · art. 616 ter', l: [`${D('Apoderarse, dañar o destruir')}: ${Y('aeronave')}, ${Y('buque')} u otro tipo de ${Y('embarcación o plataforma en el mar')}.`, `${D('Atentar contra')}: personas, cargamento o bienes que se hallaren en las mismas.`, `Cometer el delito con: ${D('violencia, intimidación o engaño')}.`] },
  { t: 'Resistencia o desobediencia · art. 616 quater', l: [`Con ocasión de la ${D('prevención o persecución')} de los hechos del art. 616 ter: ${D('resistirse')}, o ${D('desobedecer')}.`, `Se ha de realizar contra: ${G('buque de guerra')} o ${G('aeronave militar')}, u otro buque o aeronave que lleve ${D('signos claros')} y sea identificable como buque o aeronave al servicio del Estado español, y esté ${D('autorizado a tal fin')}.`] },
  { t: 'Disposición común · arts. 616 ter y 616 quater.3', l: [`Las penas previstas en estos artículos se impondrán ${K('sin perjuicio')} de las que correspondan por los delitos cometidos.`] },
]));

module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  let h = L.get(s, 'T19_CP').html.replace(/<!--VIS19-->[\s\S]*?<!--\/VIS19-->/g, '');
  const insertos = []; let colocados = 0;
  for (const [, loc, vis] of V) {
    const k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', loc.slice(0, 60)); continue; }
    insertos.push([i, vis]);
  }
  const orden = insertos.map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS19-->' + vis + '<!--/VIS19-->' + h.slice(i); colocados++; }
  s = L.put(s, 'T19_CP', h);
  fs.writeFileSync(F, s);
  console.log(`Tema 19: cuadros ${V.length}, colocados ${colocados}`);
}
