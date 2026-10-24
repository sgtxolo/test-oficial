// Cuadros visuales del Tema 10 (Código Civil): recrean los tres cuadros impresos de tu temario subrayado de Prefortia
// (págs. 9, 24 y 41 del PDF escaneado «TEMA 10») con el TEXTO LITERAL del cuadro y tus MARCAS: fosforito (amarillo = concepto, naranja = verbo/acción,
// verde = órgano, azul = plazo/cifra), subrayado rojo, cuadrados azules, círculos y las «x» rojas del margen (✱). Se insertan en T10.cc de esquemas.html
// tras el artículo correspondiente (arts. 15, 60 y 103). Los usa también expres-t10.js (module.exports = V).
// Uso: node prompts/herramientas/tema10/visuales-t10.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS10-->)
const fs = require('fs');
const L = require('../visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const U = x => `<u class="m-lapiz">${x}</u>`;
const CA = x => `<span class="m-caja">${x}</span>`;
const O = x => `<span class="m-circulo">${x}</span>`;
const AS = '<span class="m-ast"></span>';
const KY = x => K(Y(x));
const KD = x => K(D(x));
const pie = (html, txt) => html.replace(/<\/div>$/, `<div class="vis-flujo"><div class="vis-paso">${txt}</div></div></div>`);
const V = []; const v = (tras, html) => V.push([tras, html]);

// ───────── La vecindad civil (PDF p. 9, infografía; arts. 14 y 15) ─────────
v('Artículo 15', tabla('La vecindad civil (cuadro del temario · arts. 14 y 15 del Código Civil)', ['Apartado', 'Contenido'], [
  { l: 'Concepto', c: 'o', h: [{ t: `${Y('Determina la sujeción al derecho civil común o al especial o foral.')}` }] },
  { l: 'ADQUISICIÓN · Filiación / adopción', c: 'v', h: [
    { t: `Tienen vecindad civil en territorio de derecho común, o en uno de los de derecho especial o foral, los ${P('nacidos de padres que tengan tal vecindad')}.` },
    { t: `Por la adopción, el ${D('adoptado no emancipado')} adquiere la vecindad civil de los ${P('adoptantes')}.` },
    { t: `Si al nacer el hijo o ser adoptado, los padres tuvieren ${D('distinta vecindad civil')}, se adquiere la del ${KD('primero en determinar la filiación')}. En su defecto, tendrá la del ${Y('lugar del nacimiento')} y, en último término, la ${Y('vecindad de derecho común')}.` },
    { t: `${AS} ${P('Si no transcurren 6 meses desde el nacimiento o adopción')}, los padres, o el que de ellos ejerza o le haya sido atribuida la patria potestad, ${D('podrán')} atribuir al hijo la vecindad civil de cualquiera de ellos.` }] },
  { l: 'ADQUISICIÓN · Por opción', c: 'c', h: [
    { t: `${D('Opción propia del hijo')}: el hijo desde que cumpla ${P('catorce años')} y hasta que transcurra ${P('un año después de su emancipación')} podrá ${D('optar')} bien por la vecindad civil del ${Y('lugar de su nacimiento')}, bien por la ${Y('última vecindad de cualquiera de sus padres')}. Si no está emancipado, tiene que estar ${D('asistido')} en la opción por el ${G('representante legal')}.` },
    { t: `${D('Opción por matrimonio')}: cualquiera de los ${Y('cónyuges no separados')}, ya sea legalmente o de hecho, podrá, en todo momento, ${D('optar')} por la ${Y('vecindad civil del otro')}.` },
    { t: `${D('Opción extranjeros')}: cuando adquiera la nacionalidad española deberá ${D('optar')}, al inscribir la adquisición de la nacionalidad, por cualquiera de las vecindades siguientes: ${Y('la correspondiente al lugar de residencia')} · ${Y('la del lugar del nacimiento')} · ${Y('la última vecindad de cualquiera de sus progenitores o adoptantes')} · ${Y('la del cónyuge')}.` },
    { t: `Esta declaración se formulará por el ${D('propio optante')}, solo o con los apoyos que la persona con discapacidad, en su caso, precise, o por su ${G('representante legal')}.` },
    { t: `El extranjero que adquiera la nacionalidad por ${D('carta de naturaleza')} tendrá la vecindad civil que el ${G('Real Decreto de concesión')} determine, teniendo en cuenta la opción del extranjero que adquiera la nacionalidad.` }] },
  { l: 'ADQUISICIÓN · Residencia continuada', c: 'o', h: [
    { t: `${AS} ${P('Durante dos años')}, siempre que el interesado ${D('manifieste ser esa su voluntad')}.` },
    { t: `${P('De diez años')}, ${KD('sin declaración en contrario')} durante este plazo.` },
    { t: `Declaraciones inscritas en el ${G('Registro Civil')}.` }] },
  { l: 'ALTERACIÓN', c: 'v', h: [{ t: `El ${D('matrimonio')} ${K('no altera')} la vecindad civil.` }] },
  { l: 'PÉRDIDA', c: 'c', h: [{ t: `La vecindad civil se puede perder por la ${D('pérdida de la nacionalidad')} o bien por ${D('adquisición de otra vecindad')}.` }] },
  { l: 'RECUPERACIÓN', c: 'o', h: [{ t: `La ${D('recuperación de la nacionalidad española')} lleva consigo la de aquella vecindad civil que ostentara el interesado al tiempo de su pérdida.` }] }]));

// ───────── Matrimonio en forma religiosa (PDF p. 24, cuadro «Art 60 Código civil»; art. 60) ─────────
v('Artículo 60', pie(arbol('Art. 60 del Código Civil · PRODUCE EFECTOS CIVILES el matrimonio celebrado según (cuadro del temario)', `${Y('PRODUCE EFECTOS CIVILES')}: el ${D('matrimonio celebrado')} según:`, [
  `Las normas del ${KY('DERECHO CANÓNICO')}, o cualquiera de otras formas religiosas previstas en los ${U('acuerdos de cooperación entre el Estado y las confesiones religiosas')}.`,
  `La ${D('forma religiosa')} prevista por las: ${Y('Iglesias')} · ${Y('Confesiones')} · ${Y('Comunidades religiosas')} · ${Y('Federaciones religiosas')}, que ${CA('estén inscritas en el')} ${G('Registro de Entidades Religiosas')} y ${CA('hayan obtenido el reconocimiento de')} ${KY('notorio arraigo')} en España.`]),
  `En este supuesto, el ${D('reconocimiento de efectos civiles')} requerirá el cumplimiento de los siguientes requisitos: ${AS} a) La ${D('tramitación')} de un ${KY('acta o expediente previo')} de capacidad matrimonial con arreglo a la normativa del ${G('Registro Civil')}. b) La libre ${KD('manifestación del consentimiento')} ante un ${G('ministro de culto')} (acreditado mediante ${D('certificación')} expedida por la iglesia, confesión o comunidad religiosa que haya obtenido el reconocimiento de ${KY('notorio arraigo')}) y ${P('dos testigos mayores de edad')}.`));

// ───────── Medidas provisionales por demanda de nulidad, separación o divorcio (PDF p. 41, cuadro «Art 103 Código civil»; art. 103) ─────────
v('Artículo 103', pie(arbol('Art. 103 del Código Civil · ADMITIDA LA DEMANDA (cuadro del temario)', `${KY('ADMITIDA LA DEMANDA')}: a ${KY('falta de acuerdo de ambos cónyuges')} aprobado judicialmente, con ${D('audiencia de los cónyuges')}, el ${G('JUEZ')} ${D('adoptará')} las ${Y('medidas siguientes')}:`, [
  `${AS} <b>1.º ${KD('Determinar')}</b>, en interés de los hijos, con cuál de los cónyuges han de quedar los sujetos a la ${Y('patria potestad')}. ${CA('Excepcionalmente')}, los hijos ${D('podrán')} ser encomendados a los ${G('abuelos, parientes u otras personas')} que así lo consintieren y, de no haberlos, a una ${Y('institución idónea')}. · Cuando exista ${KY('riesgo de sustracción del menor')} por alguno de los cónyuges o por terceras personas, podrán adoptarse las medidas necesarias y, en particular: ${Y('prohibición de salida del territorio nacional')}, ${O('salvo')} autorización judicial previa · ${Y('prohibición de expedición del pasaporte')} al menor o retirada del mismo si ya se hubiere expedido · ${Y('sometimiento a autorización judicial previa de cualquier cambio de domicilio')} del menor.`,
  `<b>2.º ${KD('Determinar')}</b>, teniendo en cuenta el ${Y('interés familiar más necesitado de protección')}: cuál de los cónyuges ha de continuar en el ${Y('uso de la vivienda familiar')} · previo inventario, ${Y('bienes y objetos del ajuar')} que continúan en la vivienda y los que se ha de llevar el otro cónyuge · ${Y('medidas cautelares')} convenientes para conservar el derecho de cada uno.`,
  `<b>3.º ${KD('Fijar')}</b> la ${Y('contribución de cada cónyuge a las cargas del matrimonio')}, ${CA('incluidas si procede')} las «${Y('litis expensas')}», establecer las bases para la actualización de cantidades y disponer las garantías, depósitos, retenciones u otras medidas cautelares convenientes. Se considerará contribución a dichas cargas: el ${Y('trabajo')} que uno de los cónyuges dedicará a la atención de los ${Y('hijos comunes sujetos a patria potestad')}.`,
  `${AS} <b>4.º ${KD('Señalar')}</b>, atendidas las circunstancias: los ${Y('bienes gananciales o comunes')} que, ${CA('previo inventario')}, se hayan de entregar a uno u otro cónyuge · las ${Y('reglas que deban observar en la administración y disposición')}, ${CA('así como')} en la obligatoria ${Y('rendición de cuentas')} sobre los bienes comunes o parte de ellos que reciban y los que adquieran en lo sucesivo.`,
  `<b>5.º ${KD('Determinar')}</b>, ${CA('en su caso')}, el ${Y('régimen de administración y disposición de aquellos bienes privativos')} que por ${Y('capitulaciones o escritura pública')} estuvieran ${Y('especialmente afectados a las cargas del matrimonio')}.`]),
  `${AS} <i>Nota tuya a mano:</i> ✱ en la prohibición de salida del territorio nacional «salvo» autorización judicial previa y en el 4.º (bienes gananciales o comunes).`));


// ───────── Esquemas propios (frases LITERALES y completas del articulado; sin-esquema.js 10 = 0) ─────────
const CC = fs.readFileSync(require('path').join(__dirname, '..', '..', 'temario-limpio', 'tema10', 'cc.txt'), 'utf8').split('\n');
const art = n => { const i = CC.findIndex(l => l.trim() === 'Artículo ' + n + '.'); if (i < 0) throw new Error('art ' + n); const out = []; for (let j = i + 1; j < CC.length && !/^Artículo \d/.test(CC[j]); j++) if (CC[j].trim()) out.push(CC[j].trim()); return out; };
const PROPIOS = [
  ['14', 'La vecindad civil: determinación y adquisición'], ['17', 'Españoles de origen'], ['20', 'Derecho a optar por la nacionalidad española'],
  ['21', 'Adquisición de la nacionalidad por carta de naturaleza o residencia'], ['22', 'Nacionalidad por residencia: plazos y requisitos'],
  ['23', 'Requisitos comunes para la validez de la adquisición'], ['24', 'Pérdida de la nacionalidad'], ['25', 'Pérdida de la nacionalidad (no españoles de origen) y nulidad'],
  ['26', 'Recuperación de la nacionalidad'], ['81', 'Separación judicial: requisitos y plazos'], ['90', 'Contenido del convenio regulador'],
  ['158', 'Medidas judiciales de protección de los hijos'], ['172', 'Desamparo, tutela por ministerio de la ley y guarda provisional'],
  ['173', 'El acogimiento familiar'], ['173 bis', 'Modalidades del acogimiento familiar'], ['175', 'Requisitos de la adopción'],
  ['176 bis', 'Guarda con fines de adopción'], ['177', 'Consentimiento, asentimiento y audiencia en la adopción'], ['179', 'Exclusión de las funciones tuitivas del adoptante'],
  ['232', 'Tutela: rendición final de cuentas'], ['268', 'Revisión de las medidas de apoyo'], ['276', 'Orden legal de nombramiento del curador'], ['292', 'Curatela: rendición final de cuentas'],
];
PROPIOS.forEach(([n, t]) => { const ls = art(n); const raiz = /:\s*$/.test(ls[0]) ? ls[0] : '<b>Artículo ' + n + '</b> · ' + t; const ramas = /:\s*$/.test(ls[0]) ? ls.slice(1) : ls;
  v('Artículo ' + n, arbol('Art. ' + n + ' del Código Civil · ' + t + ' (esquema propio, texto literal)', raiz, ramas)); });

module.exports = V;
if (require.main !== module) return;   // al importarlo desde expres-t10.js solo se exportan los cuadros
// ───────── inserción en T10.cc de esquemas.html ─────────
const F = 'esquemas.html';
const s = fs.readFileSync(F, 'utf8').split('\n');
const k = s.findIndex(l => l.startsWith('/* T10_CC */ T10.cc = "'));
if (k < 0) throw new Error('no se encuentra T10.cc');
let l = s[k];
l = l.replace(/<!--VIS10-->[\s\S]*?<!--\/VIS10-->/g, '');
const esc = h => JSON.stringify(h).slice(1, -1);
const pos = [];
V.forEach(([tras, html], i) => {
  const heads = [...l.matchAll(/articulo-head[^>]*>(.*?)<\/div>/g)].map(m => [m.index, m[1].replace(/<[^>]+>/g, '').trim()]);
  const hh = heads.find(h => h[1] === tras); if (!hh) throw new Error('no encuentro ' + tras);
  const ini = hh[0];
  const sig = [l.indexOf('<div class=\\"articulo\\">', ini), l.indexOf('<div class=\\"bloque-titulo\\">', ini)].filter(x => x > 0).sort((a, b) => a - b)[0];
  pos.push([sig, `<!--VIS10-->${esc(html)}<!--/VIS10-->`, i]);
});
pos.sort((a, b) => b[0] - a[0]).forEach(([p, h]) => { l = l.slice(0, p) + h + l.slice(p); });
s[k] = l;
fs.writeFileSync(F, s.join('\n'));
console.log('cuadros insertados:', V.length);
