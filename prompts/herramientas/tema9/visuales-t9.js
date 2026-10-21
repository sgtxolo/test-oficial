// Cuadros visuales del Tema 9 (LO 5/2005 de la Defensa Nacional): recrean los cuadros del temario subrayado de Prefortia
// (págs. 9, 11, 13, 14 y 18 del PDF escaneado «TEMA 9»; impresas 5, 7, 9, 10 y 14) con el TEXTO LITERAL del cuadro y las MARCAS REALES
// del usuario: colores de fosforito (amarillo = concepto, naranja = verbo/acción, verde = órgano), subrayado rojo, subrayado a lápiz,
// círculos, cuadrados y las «x» rojas del margen (✱). En los cuadros que él no marcó se aplica su método: lo impreso en negrita → amarillo,
// verbos de acción → naranja, órganos → verde (reglas-color.js), futuros → lila y plazos/cifras → azul.
// Se insertan en T9.lo de esquemas.html tras el artículo correspondiente. Tambien los usa expres-t9.js (module.exports = V).
// Uso: node prompts/herramientas/tema9/visuales-t9.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS9-->)
const fs = require('fs');
const L = require('../visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const U = x => `<u class="m-lapiz">${x}</u>`;                // subrayado a lápiz
const CA = x => `<span class="m-caja">${x}</span>`;          // cuadrado azul
const O = x => `<span class="m-circulo">${x}</span>`;        // círculo rojo
const AS = '<span class="m-ast"></span>';                    // asterisco rojo ✱ (la «x» roja de su margen)
const KY = x => K(Y(x));                                     // amarillo + subrayado rojo
const KD = x => K(D(x));                                     // naranja + subrayado rojo
// nota al pie dentro del cuadro (mismo estilo que los pasos de un flujo)
const pie = (html, txt) => html.replace(/<\/div>$/, `<div class="vis-flujo"><div class="vis-paso">${txt}</div></div></div>`);
const V = []; const v = (tras, html) => V.push([tras, html]);

// ───────── Atribuciones de los poderes del Estado (PDF p. 9 = impresa 5; arts. 3 a 7) ─────────
v('Artículo 7', tabla('Atribuciones de los poderes del Estado en materia de defensa (cuadro del temario · arts. 3 a 7)', ['Poder / órgano', 'Atribuciones'], [
  { l: 'La Corona (art. 3)', c: 'o', h: [{ t: `Corresponden al ${G('Rey')} el ${KD(R('mando supremo'))} ${U('de las Fuerzas Armadas')} y las demás funciones que en materia de defensa le confiere la Constitución y el resto del ordenamiento jurídico.` }] },
  { l: 'Las Cortes Generales (art. 4)', c: 'v', h: [
    { t: `${AS} a) ${Y('Otorgar las')} ${KY('autorizaciones previas')} para prestar el consentimiento del Estado a ${Y('obligarse')} por medio de ${Y('los tratados y convenios internacionales')}, así como las restantes autorizaciones previstas en el ${U('artículo 94.1.b) de la Constitución')}.` },
    { t: `b) ${D('Aprobar')} las ${Y('leyes')} relativas a la ${Y('defensa y los créditos presupuestarios')} correspondientes.` },
    { t: `c) ${D('Debatir')} las ${Y('líneas generales de la política de defensa')}. A estos efectos, el ${G('Gobierno')} presentará las iniciativas correspondientes, singularmente los ${Y('planes de reclutamiento y modernización')}.` },
    { t: `d) ${D('Controlar')} la ${Y('acción del Gobierno')} en materia de defensa.` },
    { t: `e) ${D('Acordar')} ${Y('la autorización')} a que se refiere el artículo 63.3 de la Constitución.` },
    { t: `${AS} En particular, al ${G('CONGRESO DE LOS DIPUTADOS')} le corresponde ${KD('autorizar')}, con carácter ${KY('previo')}, ${Y('la participación')} de las Fuerzas Armadas en ${Y('misiones fuera del territorio nacional')}, ${U('de acuerdo con lo establecido en esta Ley')}.` }] },
  { l: 'El Gobierno (art. 5)', c: 'c', h: [
    { t: `• ${D('Determinar')} la ${KY('política de defensa')} y ${D('asegurar')} su ${KY('ejecución')}.` },
    { t: `${AS} • Así como ${D('dirigir')} ${G('la Administración militar')} y ${KD('acordar')} ${Y('la participación')} de las ${G('Fuerzas Armadas')} en ${Y('misiones fuera')} del territorio nacional.` }] },
  { l: 'El Presidente del Gobierno (art. 6)', c: 'o', h: [
    { t: `En el marco de la política de defensa, le corresponde de ${CA('forma específica')}:` },
    { t: `a) ${D('Formular')} ${Y('la Directiva de Defensa Nacional')}, en la que se establecerán las ${Y('líneas generales')} de la ${Y('política de defensa')} ${O('y')} las ${Y('directrices')} para su desarrollo.` },
    { t: `b) ${D('Definir')} ${Y('y aprobar los grandes objetivos y planteamientos estratégicos')}, así como ${D('formular')} ${Y('las directivas para las negociaciones exteriores')} que afecten a la política de defensa.` },
    { t: `c) ${D('Determinar')} ${Y('la aplicación de los objetivos y las líneas básicas de actuación de las')} ${G('Fuerzas Armadas')}, tanto en el ámbito ${D('nacional')} como en el de la participación en las ${Y('organizaciones internacionales')} de las que España forma parte.` },
    { t: `${AS} d) ${KD('Ordenar')} ${KY('las misiones de las')} ${G('Fuerzas Armadas')}.` },
    { t: `e) Ejercer las ${Y('demás')} funciones que le atribuyen las disposiciones legales y reglamentarias.` }] },
  { l: 'El Ministro de Defensa (art. 7)', c: 'v', h: [
    { t: 'De forma específica:' },
    { t: `a) ${D('Asistir')} al ${G('Presidente del Gobierno')} en la ${Y(K('dirección estratégica'))} de las operaciones militares.` },
    { t: `b) ${D('Dirigir')} la ${Y(K('actuación'))} de las ${G('Fuerzas Armadas')} ${Y('bajo la autoridad del')} ${G('Presidente del Gobierno')}.` },
    { t: `${AS} c) ${D('Determinar')} ${KY('y ejecutar')} ${Y('la política militar')}.` },
    { t: `d) ${D('Dirigir')}, como miembro del ${G('Gobierno')}, ${Y('la Administración militar')} ${O('y')} ${D('desarrollar')} ${Y('las directrices y disposiciones reglamentarias')} que adopte el ${G('Consejo de Ministros')}.` },
    { t: `e) Ejercer las ${D('demás')} funciones que le atribuyen las disposiciones legales y reglamentarias.` }] }]));

// ───────── Consejo de Defensa Nacional (PDF p. 11 = impresa 7; art. 8) ─────────
v('Artículo 8', pie(cols('Consejo de Defensa Nacional: composición (cuadro del temario · art. 8) · a iniciativa del Presidente del Gobierno, podrá funcionar en pleno y como consejo ejecutivo', [
  { t: 'EN PLENO (art. 8.5)', l: [
    `a) El ${G('Presidente del Gobierno')}, que lo ${D('presidirá')}.`, `b) Los ${G('Vicepresidentes')} del Gobierno.`,
    `c) Los Ministros de ${G('Defensa, del Interior, de Asuntos Exteriores y de Cooperación y de Economía y Hacienda')}.`,
    `d) El ${G('Jefe de Estado Mayor de la Defensa')}.`, `e) Los ${G('Jefes de Estado Mayor del Ejército de Tierra, de la Armada y del Ejército del Aire')}.`,
    `f) El Secretario de Estado ${G('Director del Centro Nacional de Inteligencia')}.`, `g) El ${G('Director del Gabinete de la Presidencia del Gobierno')}.`] },
  { t: 'CONSEJO EJECUTIVO (art. 8.6)', l: [
    `a) El ${G('Presidente del Gobierno')}, que lo ${D('presidirá')}.`, `b) Los Ministros de ${G('Defensa, del Interior y de Asuntos Exteriores y de Cooperación')}.`,
    `c) El ${G('Jefe de Estado Mayor de la Defensa')}.`, `d) El Secretario de Estado ${G('Director del Centro Nacional de Inteligencia')}.`,
    `e) El ${G('Director del Gabinete de la Presidencia del Gobierno')}.`] }]),
  `El Consejo de Defensa Nacional ${Y('en pleno')} ${D('informará')} al ${G('Rey')}, ${U('a propuesta del Presidente del Gobierno')}. Cuando el ${G('Rey')} asista a las reuniones del Consejo, lo ${D('presidirá')}.`));
v('Artículo 8', pie(arbol('Consejo de Defensa Nacional: funciones (cuadro del temario · art. 8)', `${Y('Órgano colegiado, coordinador, asesor y consultivo')} del ${G('Presidente del Gobierno')} en materia de defensa`, [
  `${D('Asistirá')} al ${G('Presidente del Gobierno')} en ${Y('la dirección de conflictos armados y en la gestión de las situaciones de crisis que afecten a la defensa')} y, de forma general, en las demás funciones previstas en el artículo 6 de esta Ley.`,
  `${D('Emitir informe')} sobre las ${Y('grandes directrices de la política de defensa')} y ofrecer al ${G('Gobierno')} ${Y('propuestas')} sobre asuntos relacionados con la defensa que, afectando a varios ${G('Ministerios')}, exijan una ${Y('propuesta conjunta')}.`]),
  `Para el ejercicio de sus funciones, contará con la ${G('Comisión Interministerial de Defensa')}, adscrita al ${G('Ministerio de Defensa')}, como ${Y(K('órgano de trabajo permanente'))}.`));

// ───────── Organización básica de las Fuerzas Armadas (PDF p. 13 = impresa 9; art. 11) ─────────
v('Artículo 11', cols('Organización básica de las Fuerzas Armadas (cuadro del temario · art. 11)', [
  { t: 'ESTRUCTURA ORGÁNICA', l: [`${Y('Para la preparación de la fuerza')}.`, `El ${G('Ejército de Tierra, la Armada y el Ejército del Aire')} constituyen la estructura orgánica de las FAS y ${Y('aportan las capacidades básicas')} para su estructura operativa.`,
    `${D('Posibilitará')} la ${Y('generación de la estructura operativa')}.`,
    `Se ${D('establecerá')} mediante ${Y('criterios de funcionalidad')} basados en los medios y formas propias de acción del Ejército de Tierra, de la Armada y del Ejército del Aire, y en una ${Y('organización homogénea')} de éstos.`] },
  { t: 'ESTRUCTURA OPERATIVA', l: [`${Y('Para su empleo en las misiones que se le asignen')}.`,
    `${D('Establecida')} para el desarrollo de la ${Y('acción conjunta y combinada')}, se ${D('organizará')} con arreglo al principio de ${Y(P('unidad de mando'))} y a los criterios necesarios para la consecución de la ${Y('máxima capacidad operativa')}.`] }]));

// ───────── Estado Mayor de la Defensa (PDF p. 13, esquema inferior; art. 12) ─────────
v('Artículo 12', arbol('El Estado Mayor de la Defensa (esquema del temario · art. 12)', `${Y('ESTADO MAYOR DE LA DEFENSA')}: ${Y('órgano auxiliar de mando y apoyo')} al ${G('Jefe de Estado Mayor de la Defensa')}`, [
  `${G('MANDO DE OPERACIONES')} subordinado.`, `${G('CUARTEL GENERAL')}.`,
  `El ${G('Jefe de Estado Mayor de la Defensa')} ${D('ejercerá')} el mando del Estado Mayor de la Defensa; cuando cualquier circunstancia le impida ejercer temporalmente el cargo, le ${D('sustituirá')} con carácter ${Y('accidental')} el Jefe de Estado Mayor del Ejército de Tierra, de la Armada o del Ejército del Aire de ${P('más antigüedad')}.`]));

// ───────── Estructura orgánica de las Fuerzas Armadas (PDF p. 14, cuadro inferior; art. 13) ─────────
v('Artículo 13', pie(arbol('Estructura orgánica de las Fuerzas Armadas (cuadro del temario · art. 13)', `${Y('Ejército de Tierra · La Armada · Ejército del Aire')}: ${Y('cada uno de ellos está compuesto por')}`, [
  `${Y('El Cuartel General')}.`, `${Y('La Fuerza')}.`, `${Y('El Apoyo a la Fuerza')}.`]),
  `${AS} <i>Nota tuya a mano:</i> Dir. Estado Mayor de la Defensa → ${G('Cuartel General')} · ${G('Mando de Operaciones')} subordinado.`));

// ───────── La Guardia Civil (PDF p. 18 = impresa 14; art. 23) ─────────
v('Artículo 23', cols('La Guardia Civil depende de… (cuadro del temario · art. 23)', [
  { t: 'MINISTERIO DEL INTERIOR', l: [`En el ${Y('desempeño de las funciones')} que se le atribuyen por la ${P('LO 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad')}.`] },
  { t: 'MINISTERIO DE DEFENSA', l: [`En el cumplimiento de las ${R('misiones de carácter militar')} que se le encomienden.`] }]));

module.exports = V;
if (require.main !== module) return;   // al importarlo desde expres-t9.js solo se exportan los cuadros
// ───────── inserción en T9.lo de esquemas.html ─────────
const F = 'esquemas.html';
const s = fs.readFileSync(F, 'utf8').split('\n');
const k = s.findIndex(l => l.startsWith('/* T9_LO */ T9.lo = "'));
if (k < 0) throw new Error('no se encuentra T9.lo');
let l = s[k];
// limpiar anteriores
l = l.replace(/<!--VIS9-->[\s\S]*?<!--\/VIS9-->/g, '');
const esc = h => JSON.stringify(h).slice(1, -1);
// la cabecera de cada artículo va escapada como \" dentro de la cadena
const pos = [];
V.forEach(([tras, html], i) => {
  // el cuadro va justo antes de la cabecera del siguiente artículo / bloque (tras cerrar el artículo `tras`)
  const heads = [...l.matchAll(/articulo-head[^>]*>(.*?)<\/div>/g)].map(m => [m.index, m[1].replace(/<[^>]+>/g, '')]);
  const hh = heads.find(h => h[1].startsWith(tras + ' —') || h[1].startsWith(tras + ' -')); if (!hh) throw new Error('no encuentro ' + tras);
  const ini = hh[0];
  const sig = [l.indexOf('<div class=\\"articulo\\">', ini), l.indexOf('<div class=\\"bloque-titulo\\">', ini)].filter(x => x > 0).sort((a, b) => a - b)[0];
  pos.push([sig, `<!--VIS9-->${esc(html)}<!--/VIS9-->`, i]);
});
pos.sort((a, b) => b[0] - a[0]).forEach(([p, h]) => { l = l.slice(0, p) + h + l.slice(p); });
s[k] = l;
fs.writeFileSync(F, s.join('\n'));
console.log('cuadros insertados:', V.length);
