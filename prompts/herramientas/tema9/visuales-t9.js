// Cuadros visuales del Tema 9 (LO 5/2005 de la Defensa Nacional): recrean los cuadros del temario subrayado de Prefortia
// (págs. 5, 7, 9, 10 y 14 del escaneado «TEMA 9»). Se insertan en T9.lo de esquemas.html tras el artículo correspondiente.
// Uso: node prompts/herramientas/tema9/visuales-t9.js   (idempotente: sustituye los cuadros anteriores marcados con <!--VIS9-->)
const fs = require('fs');
const L = require('../visuales-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = L;
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const V = []; const v = (tras, html) => V.push([tras, html]);

// ───────── Atribuciones de los poderes del Estado (cuadro de la pág. 5 del temario; arts. 3 a 7) ─────────
v('Artículo 7', tabla('Atribuciones de los poderes del Estado en materia de defensa (cuadro del temario · arts. 3 a 7)', ['Poder / órgano', 'Atribuciones'], [
  { l: 'La Corona (art. 3)', c: 'o', h: [{ t: `Corresponden al ${G('Rey')} el ${R('mando supremo de las Fuerzas Armadas')} y las demás funciones que en materia de defensa le confiere la Constitución y el resto del ordenamiento jurídico.` }] },
  { l: 'Las Cortes Generales (art. 4)', c: 'v', h: [
    { t: `a) ${D('Otorgar las autorizaciones previas')} para prestar el consentimiento del Estado a obligarse por medio de los ${D('tratados y convenios internacionales')} (y las del art. 94.1.b de la Constitución).` },
    { t: `b) ${D('Aprobar las leyes')} relativas a la defensa y los ${D('créditos presupuestarios')} correspondientes.` },
    { t: `c) ${D('Debatir las líneas generales')} de la política de defensa (el Gobierno presenta las iniciativas, singularmente los ${D('planes de reclutamiento y modernización')}).` },
    { t: `d) ${D('Controlar')} la acción del Gobierno en materia de defensa.` },
    { t: `e) Acordar la autorización del art. 63.3 de la Constitución.` },
    { t: `En particular, el ${G('Congreso de los Diputados')}: ${R('autorizar con carácter previo')} la participación de las Fuerzas Armadas en ${D('misiones fuera del territorio nacional')}.` }] },
  { l: 'El Gobierno (art. 5)', c: 'c', h: [
    { t: `${D('Determinar la política de defensa')} y asegurar su ejecución.` },
    { t: `${D('Dirigir la Administración militar')}.` },
    { t: `${D('Acordar')} la participación de las Fuerzas Armadas en misiones fuera del territorio nacional.` }] },
  { l: 'El Presidente del Gobierno (art. 6)', c: 'o', h: [
    { t: `${D('Dirección')} de la política de defensa y determinación de sus objetivos · ${D('gestión de las situaciones de crisis')} que afecten a la defensa · ${D('dirección estratégica')} de las operaciones militares en caso de uso de la fuerza.` },
    { t: `${D('Ordenar, coordinar y dirigir')} la actuación de las Fuerzas Armadas y disponer su empleo.` },
    { t: `De forma específica: a) formular la ${R('Directiva de Defensa Nacional')}; b) definir y aprobar los grandes objetivos y planteamientos estratégicos; c) determinar la aplicación de los objetivos y líneas básicas de actuación de las Fuerzas Armadas; d) ${R('ordenar las misiones de las Fuerzas Armadas')}; e) las demás funciones legales y reglamentarias.` }] },
  { l: 'El Ministro de Defensa (art. 7)', c: 'v', h: [
    { t: `${D('Desarrollo y ejecución')} de la política de defensa (además de las competencias de las leyes del Gobierno y de la Administración General del Estado).` },
    { t: `De forma específica: a) ${D('asistir')} al Presidente del Gobierno en la dirección estratégica de las operaciones militares; b) ${D('dirigir la actuación de las Fuerzas Armadas')} bajo la autoridad del Presidente; c) ${D('determinar y ejecutar la política militar')}; d) dirigir la Administración militar y desarrollar las directrices y disposiciones del Consejo de Ministros; e) las demás funciones legales y reglamentarias.` }] }]));

// ───────── Consejo de Defensa Nacional (cuadro de la pág. 7; art. 8) ─────────
v('Artículo 8', cols('Consejo de Defensa Nacional: composición (cuadro del temario · art. 8)', [
  { t: 'EN PLENO (art. 8.5)', l: [
    `El ${G('Presidente del Gobierno')}, que lo presidirá.`, `Los ${G('Vicepresidentes')} del Gobierno.`,
    `Los Ministros de ${G('Defensa, del Interior, de Asuntos Exteriores y de Cooperación y de Economía y Hacienda')}.`,
    `El ${G('Jefe de Estado Mayor de la Defensa')}.`, `Los Jefes de Estado Mayor del ${G('Ejército de Tierra, de la Armada y del Ejército del Aire')}.`,
    `El Secretario de Estado ${G('Director del Centro Nacional de Inteligencia')}.`, `El ${G('Director del Gabinete de la Presidencia del Gobierno')}.`] },
  { t: 'CONSEJO EJECUTIVO (art. 8.6)', l: [
    `El ${G('Presidente del Gobierno')}, que lo presidirá.`, `Los Ministros de ${G('Defensa, del Interior y de Asuntos Exteriores y de Cooperación')}.`,
    `El ${G('Jefe de Estado Mayor de la Defensa')}.`, `El Secretario de Estado ${G('Director del Centro Nacional de Inteligencia')}.`,
    `El ${G('Director del Gabinete de la Presidencia del Gobierno')}.`] }]));
v('Artículo 8', arbol('Consejo de Defensa Nacional: funciones (cuadro del temario · art. 8)', `${R('Órgano colegiado, coordinador, asesor y consultivo')} del Presidente del Gobierno en materia de defensa`, [
  `${D('Asistir')} al Presidente del Gobierno en la dirección de conflictos armados y en la gestión de las situaciones de crisis que afecten a la defensa.`,
  `${D('Emitir informe')} sobre las grandes directrices de la política de defensa y ofrecer al Gobierno propuestas sobre asuntos que, afectando a varios Ministerios, exijan una propuesta conjunta.`,
  `Para el ejercicio de sus funciones contará con la ${G('Comisión Interministerial de Defensa')}, adscrita al Ministerio de Defensa, como ${D('órgano de trabajo permanente')}.`,
  `A iniciativa del Presidente del Gobierno podrá funcionar ${P('en pleno')} y como ${P('consejo ejecutivo')}; el Pleno informará al Rey y, si asiste, lo presidirá.`]));

// ───────── Organización básica de las Fuerzas Armadas (cuadro de la pág. 9; art. 11) ─────────
v('Artículo 11', cols('Organización básica de las Fuerzas Armadas (cuadro del temario · art. 11)', [
  { t: 'ESTRUCTURA ORGÁNICA', l: [`Para la ${R('preparación de la fuerza')}.`, `Posibilita la ${D('generación de la estructura operativa')}.`,
    `Se establece mediante ${D('criterios de funcionalidad')} basados en los medios y formas propias de acción del Ejército de Tierra, de la Armada y del Ejército del Aire, y en una organización homogénea de éstos.`,
    `Está formada por el ${G('Ejército de Tierra, la Armada y el Ejército del Aire')}, que aportan las capacidades básicas para la estructura operativa.`] },
  { t: 'ESTRUCTURA OPERATIVA', l: [`Para su ${R('empleo en las misiones que se le asignen')}.`,
    `Establecida para el desarrollo de la ${D('acción conjunta y combinada')}.`,
    `Se organizará con arreglo al principio de ${P('unidad de mando')} y a los criterios necesarios para la consecución de la máxima capacidad operativa.`] }]));

// ───────── Estado Mayor de la Defensa (cuadro de la pág. 9; art. 12) ─────────
v('Artículo 12', arbol('El Estado Mayor de la Defensa (esquema del temario · art. 12)', `${R('ESTADO MAYOR DE LA DEFENSA')}: órgano auxiliar de mando y apoyo al Jefe de Estado Mayor de la Defensa`, [
  `${G('Cuartel General')}.`, `${G('Mando de Operaciones')} subordinado.`,
  `El ${G('Jefe de Estado Mayor de la Defensa')} ejerce el mando del Estado Mayor; si no puede ejercer temporalmente el cargo, le sustituye con carácter accidental el Jefe de Estado Mayor del Ejército de Tierra, de la Armada o del Ejército del Aire de ${P('más antigüedad')}.`]));

// ───────── Estructura orgánica de las Fuerzas Armadas (cuadro de la pág. 10; art. 13) ─────────
v('Artículo 13', arbol('Estructura orgánica de las Fuerzas Armadas (cuadro del temario · art. 13)', `${R('Ejército de Tierra · La Armada · Ejército del Aire')}: cada uno de ellos está compuesto por`, [
  `${D('El Cuartel General')}: conjunto de órganos que encuadran los medios humanos y materiales necesarios para asistir al Jefe de Estado Mayor en el ejercicio del mando sobre su respectivo Ejército.`,
  `${D('La Fuerza')}: conjunto de medios humanos y materiales que se agrupan y organizan con el cometido principal de ${R('prepararse para la realización de operaciones militares')} (adiestramiento, preparación y evaluación; en tiempo de paz, misiones específicas permanentes).`,
  `${D('El Apoyo a la Fuerza')}: órganos responsables de la dirección, gestión, administración y control de los recursos humanos, materiales y financieros (mantenimiento de la Fuerza y apoyo logístico).`]));

// ───────── La Guardia Civil (cuadro de la pág. 14; art. 23) ─────────
v('Artículo 23', cols('La Guardia Civil depende de… (cuadro del temario · art. 23)', [
  { t: 'MINISTERIO DEL INTERIOR', l: [`En el desempeño de las funciones que se le atribuyen por la ${P('LO 2/1986, de 13 de marzo, de Fuerzas y Cuerpos de Seguridad')}.`] },
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
