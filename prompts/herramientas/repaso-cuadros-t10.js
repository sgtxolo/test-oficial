// Cuadros del Tema 10 (Derecho Civil · Código Civil) rehechos con la forma del temario escaneado («TEMA 10 DERECHO CIVIL-08-08-2026.pdf», leído como imagen el 13/11/2026).
// Págs. del PDF: 9 (infografía de la vecindad civil), 17, 20, 27, 36, 41 (art. 103), 52. Amarillo y · naranja d · verde a · azul p · lila c · subrayado rojo k. «man» = nota a boli.
// Quedan fuera los recuadros pequeños (listas enmarcadas dentro de los artículos 162, 169-171, 217, 231, 251, 267, 275-276, 295…): su texto ya está en las fichas.
const { colorea, y, d, a, p, c, k, esq, fl, caja, man } = require('./repaso-cuadros-lib.js');
const BD = 'border:1px solid rgba(60,70,80,.35)';
const lab = (t, bg = '#d3e8d6') => `<div style="background:${bg};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;${BD};color:#1f2a33"><div>${t}</div></div>`;
const cel = t => `<div style="padding:6px 9px;${BD};line-height:1.5">${t}</div>`;
const grid = (w, filas) => `<div style="display:grid;grid-template-columns:${w} 1fr">${filas.join('')}</div>`;
const lis = (...x) => x.map(t => `• ${t}`).join('<br>');
const num = (...x) => x.map((t, i) => `<div style="margin:2px 0"><b>${i + 1}.º</b> ${t}</div>`).join('');
const col = (h, x) => `<div class="caja"><div style="font-weight:800;margin:0 0 4px;text-align:center">${h}</div>${x}</div>`;
const out = [];
const add = (antes, html) => out.push({ antes, html });

// ───────── LA VECINDAD CIVIL (pág. 9: infografía, arts. 14 y 15) ─────────
add(/^Artículo 15(?!\d)/, esq('LA VECINDAD CIVIL (ARTS. 14 Y 15 DEL CÓDIGO CIVIL)', 'Determina la sujeción al derecho civil común o al especial o foral', [
  `<div style="font-weight:800;margin:2px 0">ADQUISICIÓN</div>`,
  grid('150px', [
    lab(y('FILIACIÓN / ADOPCIÓN'), '#f6ecb8'), cel(`Tienen vecindad civil en territorio de derecho común, o en uno de los de derecho especial o foral, los ${a('nacidos de padres que tengan tal vecindad')}.<br>Por la adopción, el ${d('adoptado no emancipado')} adquiere la vecindad civil de los adoptantes.<br>Si al nacer el hijo o ser adoptado, los ${y('padres tuvieren distinta vecindad civil')}, se adquiere la del ${d('primero en determinar la filiación')}. En su defecto, tendrá la del ${y('lugar del nacimiento')} y, en último término, la vecindad de ${y('derecho común')}.<br>${p('Si no transcurren 6 meses desde el nacimiento o adopción')}, los padres, o el que de ellos ejerza o le haya sido atribuida la patria potestad, podrán atribuir al hijo la vecindad civil de cualquiera de ellos.`),
    lab(y('POR OPCIÓN'), '#f6ecb8'), cel(`${y('Opción propia del hijo')}: el hijo desde que cumpla ${p('catorce años')} y hasta que ${p('transcurra un año después de su emancipación')} podrá optar bien por la vecindad civil del lugar de su nacimiento, bien por la última vecindad de cualquiera de sus padres. Si no está emancipado, tiene que estar asistido en la opción por el ${a('representante legal')}.<br>${y('Opción por matrimonio')}: cualquiera de los cónyuges no separados, ya sea legalmente o de hecho, podrá, en todo momento, ${d('optar por la vecindad civil del otro')}.<br>${y('Opción extranjeros')}: cuando ${d('adquiera la nacionalidad española')} deberá optar, al inscribir la adquisición de la nacionalidad, por cualquiera de las vecindades siguientes: ${lis('La correspondiente al lugar de residencia.', 'La del lugar del nacimiento.', 'La última vecindad de cualquiera de sus progenitores o adoptantes.', 'La del cónyuge.')}Esta declaración se formulará por el ${d('propio optante')}, solo o con los apoyos que la persona con discapacidad, en su caso, precise, o por representante legal. El extranjero que adquiera la nacionalidad por ${y('carta de naturaleza')} tendrá la vecindad civil que el ${a('Real Decreto')} de concesión determine, teniendo en cuenta la opción del extranjero que adquiera la nacionalidad.`),
    lab(y('RESIDENCIA CONTINUADA'), '#f6ecb8'), cel(lis(`${p('Durante dos años')}, siempre que el interesado manifieste ser esa su voluntad.`, `${p('De diez años')}, sin declaración en contrario durante este plazo.`) + '<br>Declaraciones inscritas en el Registro Civil.')]),
  `<div class="g2s" style="align-items:start;grid-template-columns:repeat(3,1fr);margin-top:6px">`
  + col(y('ALTERACIÓN'), `El ${d('matrimonio no altera')} la vecindad civil.`)
  + col(y('PÉRDIDA'), `La vecindad civil se puede perder por la ${d('pérdida de la nacionalidad')} o bien por ${d('adquisición de otra vecindad')}.`)
  + col(y('RECUPERACIÓN'), `La recuperación de la nacionalidad española ${d('lleva consigo')} la de aquella vecindad civil que ostentara el interesado al tiempo de su pérdida.`) + '</div>'].join('')));

// ───────── ART. 35: PERSONAS JURÍDICAS (pág. 17) ─────────
add(/^Artículo 35(?!\d)/, esq('ART. 35 · SON PERSONAS JURÍDICAS', '', [
  `<div style="display:grid;grid-template-columns:1fr 1.3fr;gap:10px;align-items:center">`
  + caja(lis(y('corporaciones'), y('asociaciones'), y('fundaciones'))) + caja(`De ${y('interés público')}, ${d('reconocidas por la ley')}.`) + '</div>'].join('')));

// ───────── DE LOS REQUISITOS DEL MATRIMONIO (pág. 20) ─────────
add(/^Artículo 49(?!\d)/, esq('DE LOS REQUISITOS DEL MATRIMONIO', '', [
  caja(`${k('No')} pueden contraer matrimonio:<br>${lis(`Los ${y('menores de edad no emancipados')}.`, `Los que estén ligados con ${y('vínculo matrimonial')}.`)}`),
  caja(`${k('No')} pueden contraer matrimonio ${k('entre sí')}:<br>${lis(`Los parientes en ${y('línea recta')} por consanguinidad o adopción. ${man('NUNCA')}`)}`),
  `<div style="border:2px solid #1d3b5f;border-radius:10px;padding:6px 9px;margin:6px 0"><span style="float:right;background:#1d3b5f;color:#fff;font-weight:800;padding:1px 8px;border-radius:4px;font-size:.75rem">EXCEPCIÓN</span>${lis(`Los ${y('colaterales')} por consanguinidad hasta el ${p('tercer grado')}.`, `Los ${y('condenados')} por haber tenido participación en la ${y('muerte dolosa')} del cónyuge o persona con la que hubiera estado unida por análoga relación de afectividad a la conyugal.`)}</div>`,
  fl,
  caja(`El ${a('Juez')} podrá ${d('dispensar')}, con ${y('justa causa y a instancia de parte')}, mediante resolución previa dictada en expediente de jurisdicción voluntaria, dichos impedimentos.`)].join('')));

// ───────── NULIDAD DEL MATRIMONIO (pág. 27, arts. 73 a 76) ─────────
add(/^Artículo 73(?!\d)/, esq('DE LA NULIDAD DEL MATRIMONIO (ARTS. 73 A 76)', '', grid('130px', [
  lab(`${y('ART. 73')}<br>${k('ES NULO')} cualquiera que sea la forma de su celebración`, '#f3d5c2'), cel(num(
    `El matrimonio celebrado ${k('sin consentimiento matrimonial')}.`,
    `El matrimonio celebrado entre las personas a que se refieren los ${y('artículos 46 y 47')}, ${k('salvo')} los casos de dispensa conforme al artículo 48.`,
    `El que se contraiga ${k('sin la intervención')} del ${a('Alcalde o Concejal, letrado o letrada de la Administración de Justicia, notario o notaria, o personal funcionario')} ante quien deba celebrarse, o sin la de los testigos. ${man('NUEVO')}`,
    `El celebrado por ${y('error en la identidad')} de la persona del otro contrayente o en aquellas cualidades personales que, por su entidad, hubieran sido determinantes de la prestación del consentimiento.`,
    `El contraído por ${y('coacción o miedo grave')}.`)),
  lab(`${y('ART. 74')}<br>LEGITIMACIÓN`), cel(`La ${d('acción para pedir la nulidad')} corresponde a:<br>${lis(`los ${a('cónyuges')}`, `al ${a('Ministerio Fiscal')}`, `a ${a('cualquier persona')} que tenga ${y('interés directo y legítimo')} en ella`)}<br>${k('salvo')} lo dispuesto en los artículos siguientes. ${man('No Defensor del Pueblo')}`),
  lab(`${y('ART. 75')}<br>FALTA DE EDAD`), cel(`Si la causa de nulidad fuere la ${y('falta de edad')}, mientras el contrayente sea menor ${k('sólo')} podrá ejercitar la acción:<br>${lis(`cualquiera de sus ${a('padres, tutores o guardadores')}`, `y, en todo caso, el ${a('Ministerio Fiscal')}`)}<br>Al llegar a la mayoría de edad sólo podrá ejercitar la acción el ${a('contrayente menor')}, ${k('salvo')} que los cónyuges hubieren vivido juntos durante ${p('un año')} después de alcanzada aquélla.`),
  lab(`${y('ART. 76')}<br>ERROR, COACCIÓN O MIEDO GRAVE`), cel(`${lis(y('error'), y('coacción'), y('miedo grave'))}→ ${k('Solamente')} podrá ejercitar la acción de nulidad el ${a('cónyuge que hubiera sufrido el vicio')}.<br>${d('Caduca')} la acción y se convalida el matrimonio si los cónyuges hubieran vivido juntos durante ${p('un año')} después de desvanecido el error o de haber cesado la fuerza o la causa del miedo.`)])));

// ───────── ART. 97: LA PENSIÓN COMPENSATORIA (pág. 36, recuadro) ─────────
add(/^Artículo 98(?!\d)/, esq('ART. 97 · EN LA RESOLUCIÓN JUDICIAL O EN EL CONVENIO REGULADOR SE FIJARÁN', '', caja(
  `En la resolución judicial o en el convenio regulador formalizado ante el ${a('Secretario judicial')} o el ${a('Notario')} se fijarán:<br>${lis(y('la periodicidad'), y('la forma de pago'), `${y('las bases para actualizar')} la pensión`, `${y('la duración')} o el momento de cese`, y('las garantías') + ' para su efectividad')}`)));

// ───────── ART. 101: SE EXTINGUE / NO SE EXTINGUE (pág. 36) ─────────
add(/^Artículo 102(?!\d)/, esq('ART. 101 · EL DERECHO A LA PENSIÓN', '', `<div class="g2s" style="align-items:start;grid-template-columns:1fr 1fr">`
  + col(`${d('SE EXTINGUE')}`, `El derecho a la pensión se extingue:${lis(`por el ${d('cese de la causa')} que lo motivó`, `por ${d('contraer')} el acreedor ${y('nuevo matrimonio')} o`, `por ${y('vivir maritalmente')} con otra persona.`)}`)
  + col(`${k('NO')} ${d('SE EXTINGUE')}`, `El derecho a la pensión ${k('no')} se extingue por el solo hecho de la ${y('muerte del deudor')}.<br>${k('No obstante')}, los ${a('herederos')} de éste podrán solicitar del ${a('Juez')} la reducción o supresión de aquélla, si el caudal hereditario no pudiera satisfacer las necesidades de la deuda o afectara a sus derechos en la legítima.`) + '</div>'));

// ───────── ART. 103: ADMITIDA LA DEMANDA (págs. 41-42) ─────────
add(/^Artículo 104(?!\d)/, esq('ART. 103 DEL CÓDIGO CIVIL · ADMITIDA LA DEMANDA', '', [
  caja(`${y('A falta de acuerdo')} de ambos cónyuges aprobado judicialmente`, 'cen'), fl,
  caja(`Con audiencia de los cónyuges, el ${a('JUEZ')} adoptará las medidas siguientes:`, 'cen'),
  `<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:8px;align-items:start;margin-top:6px">`
  + caja(`${y('1.º Determinar')}, en interés de los hijos, con cuál de los cónyuges han de quedar los sujetos a la patria potestad.<br>• ${k('Excepcionalmente')}, hijos podrán ser encomendados a los abuelos, parientes u otras personas que así lo consintieren y, de no haberlos, a una institución idónea.`)
  + caja(`Cuando exista ${y('riesgo de sustracción del menor')} por alguno de los cónyuges o por terceras personas, podrán adoptarse las medidas necesarias y, en particular, las siguientes:<br>${lis(`${d('Prohibición de salida')} del territorio nacional, ${k('salvo')} autorización judicial previa.`, `${d('Prohibición de expedición del pasaporte')} al menor o retirada del mismo si ya se hubiere expedido.`, `${d('Sometimiento a autorización judicial previa')} de cualquier cambio de domicilio del menor.`)}`)
  + '</div>',
  caja(`${y('2.º Determinar')}, teniendo en cuenta el interés familiar más necesitado de protección:<br>${lis('Cuál de los cónyuges ha de continuar en el uso de la vivienda familiar.', 'Previo inventario, bienes y objetos del ajuar que continúan en la vivienda y los que ha de llevar el otro cónyuge.', 'Medidas cautelares convenientes para conservar el derecho de cada uno.')}`),
  `<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:8px;align-items:start;margin-top:6px">`
  + caja(`${y('3.º Fijar')} la contribución de cada cónyuge a las ${y('cargas del matrimonio')}, incluidas si procede las «litis expensas», establecer las bases para la actualización de cantidades y disponer las garantías, depósitos, retenciones u otras medidas cautelares convenientes.`)
  + caja(`Se considerará ${y('contribución')} a dichas cargas: el trabajo que uno de los cónyuges dedicará a la atención de los ${a('hijos comunes')} sujetos a patria potestad.`) + '</div>',
  caja(`${y('4.º Señalar')}, atendidas las circunstancias:<br>${lis('los bienes gananciales o comunes que, previo inventario, se hayan de entregar a uno u otro cónyuge', 'las reglas que deban observar en la administración y disposición, así como en la obligatoria rendición de cuentas sobre los bienes comunes o parte de ellos que reciban y los que adquieran.')}`),
  caja(`${y('5.º Determinar')}, en su caso, el régimen de administración y disposición de aquellos ${y('bienes privativos')} que por capitulaciones o escritura pública estuvieran especialmente afectados a las cargas del matrimonio.`)].join('')));

// ───────── PATRIA POTESTAD: EXTINCIÓN (pág. 52, art. 169) ─────────
add(/^Artículo 172 bis/, esq('ART. 169 · LA PATRIA POTESTAD SE ACABA', '', caja(num(
  `Por la ${y('muerte')} o la ${y('declaración de fallecimiento')} de los padres o del hijo.`, `Por la ${y('emancipación')}.`, `Por la ${y('adopción')} del hijo.`))));

module.exports = { soloPropios: true, cuadros: out.map(o => ({ antes: o.antes, html: colorea(o.html) })) };
if (require.main === module) console.log(out.length + ' cuadros');
