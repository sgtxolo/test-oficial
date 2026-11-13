// Cuadros del Tema 9 (Defensa Nacional) rehechos con la forma del temario escaneado («TEMA 9 DERECHO CIVIL-08-08-2026.pdf», que en realidad es el T9 Defensa Nacional;
// págs. del PDF 9, 11, 13, 14 y 18, leídas como imagen el 13/11/2026). Amarillo y · naranja d · verde a · azul p · lila c · subrayado rojo k. «man» = nota a boli.
const { colorea, y, d, a, p, c, k, esq, fl, caja, man } = require('./repaso-cuadros-lib.js');
const BD = 'border:1px solid rgba(60,70,80,.35)';
const lab = (t, bg = '#d3e8d6') => `<div style="background:${bg};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;${BD};color:#1f2a33"><div>${t}</div></div>`;
const cel = t => `<div style="padding:6px 9px;${BD};line-height:1.5">${t}</div>`;
const abc = (...x) => x.map((t, i) => `<div style="margin:2px 0"><b>${'abcdefg'[i]})</b> ${t}</div>`).join('');
const lis = (...x) => x.map(t => `• ${t}`).join('<br>');
const grid = (w, filas) => `<div style="display:grid;grid-template-columns:${w} 1fr">${filas.join('')}</div>`;
const out = [];
const add = (antes, html) => out.push({ antes, html });

// ───────── ATRIBUCIONES DE LOS PODERES DEL ESTADO (pág. 9: tabla de 5 filas) ─────────
add(/^Artículo 4 — Las Cortes Generales/, esq('ATRIBUCIONES DE LOS PODERES DEL ESTADO (ARTS. 3 A 7)', '', grid('150px', [
  lab(a('LA CORONA')), cel(`Corresponden al ${a('REY')} el ${y('mando supremo de las Fuerzas Armadas')} y las demás funciones que en materia de defensa le confiere la Constitución y el resto del ordenamiento jurídico.`),
  lab(a('LAS CORTES GENERALES')), cel(abc(
    `${d('Otorgar')} las ${y('autorizaciones previas')} para prestar el consentimiento del Estado a obligarse por medio de los ${y('tratados y convenios internacionales')}, así como las restantes autorizaciones previstas en el artículo 94.1.b) de la Constitución.`,
    `${d('Aprobar')} las ${y('leyes relativas a la defensa y los créditos presupuestarios')} correspondientes.`,
    `${d('Debatir')} las ${y('líneas generales de la política de defensa')}. A estos efectos, el ${a('Gobierno')} presentará las iniciativas correspondientes, singularmente los planes de reclutamiento y modernización.`,
    `${d('Controlar')} la acción del Gobierno en materia de defensa.`,
    `${d('Acordar')} la autorización a que se refiere el artículo 63.3 de la Constitución. ${man('Ordenación… guerra y paz')}`)
    + `<div style="margin-top:4px">En particular, al ${a('CONGRESO DE LOS DIPUTADOS')} le corresponde ${d('autorizar')}, con carácter ${k('previo')}, la participación de las Fuerzas Armadas en ${y('misiones fuera del territorio nacional')}, de acuerdo con lo establecido en esta Ley.</div>`),
  lab(a('GOBIERNO')), cel(lis(`${d('Determinar')} la ${y('política de defensa')} y ${d('asegurar su ejecución')}.`, `Así como ${d('dirigir')} la ${y('Administración militar')} y ${d('acordar')} la participación de las ${a('Fuerzas Armadas')} en misiones fuera del territorio nacional.`)),
  lab(`${a('PRESIDENTE DEL GOBIERNO')}<br><small>(en el marco de la política de defensa, le corresponde de <u>forma específica</u>)</small>`), cel(abc(
    `${d('Formular')} la ${y('Directiva de Defensa Nacional')}, en la que se establecerán las líneas generales de la política de defensa y las directrices para su desarrollo.`,
    `${d('Definir y aprobar')} los ${y('grandes objetivos y planteamientos estratégicos')}, así como formular las directivas para las negociaciones exteriores que afecten a la política de defensa.`,
    `${d('Determinar')} la aplicación de los objetivos y las líneas básicas de actuación de las ${a('Fuerzas Armadas')}, tanto en el ámbito nacional como en el de la participación en las organizaciones internacionales de las que España forma parte.`,
    `${d('Ordenar')} las misiones de las Fuerzas Armadas.`, `Ejercer las demás funciones que le atribuyan las disposiciones legales y reglamentarias.`)),
  lab(`${a('MINISTRO DE DEFENSA')}<br><small>(de forma específica)</small>`), cel(abc(
    `${d('Asistir')} al ${a('Presidente del Gobierno')} en la ${y('dirección estratégica de las operaciones militares')}.`,
    `${d('Dirigir')} la actuación de las ${a('Fuerzas Armadas')} bajo la autoridad del Presidente del Gobierno.`,
    `${d('Determinar y ejecutar')} la ${y('política militar')}.`,
    `${d('Dirigir')}, como miembro del Gobierno, la ${y('Administración militar')} y ${d('desarrollar')} las directrices y disposiciones reglamentarias que adopte el ${a('Consejo de Ministros')}.`,
    `Ejercer las demás funciones que le atribuyan las disposiciones legales y reglamentarias.`))])));

// ───────── CONSEJO DE DEFENSA NACIONAL (pág. 11: funciones + composición en pleno y ejecutivo) ─────────
const col = (h, x) => `<div class="caja"><div style="font-weight:800;margin:0 0 4px;text-align:center">${h}</div>${x}</div>`;
add(/^Artículo 8 — Consejo de Defensa Nacional/, esq('CONSEJO DE DEFENSA NACIONAL (ART. 8)', '', [
  grid('120px', [lab(`${y('FUNCIONES')}`, '#f6ecb8'), cel(lis(
    `${a('Órgano colegiado, coordinador, asesor y consultivo')} del ${a('Presidente del Gobierno')} en materia de defensa.`,
    `${d('Asistirá')} al Presidente del Gobierno en la ${y('dirección de conflictos armados')} y en la ${y('gestión de las situaciones de crisis')} que afecten a la defensa y, de forma general, en las demás funciones previstas en el artículo 6 de esta Ley.`,
    `${d('Emitir')} ${y('informe')} sobre las grandes directrices de la política de defensa y ofrecer al Gobierno ${y('propuestas')} sobre asuntos relacionados con la defensa que, afectando a varios Ministerios, exijan una propuesta conjunta.`)
    + `<div style="margin-top:4px">Para el ejercicio de sus funciones, contará con la ${a('Comisión Interministerial de Defensa')}, adscrita al ${a('Ministerio de Defensa')}, como ${y('órgano de trabajo permanente')}.</div>`)]),
  `<div style="margin:8px 0 4px;font-weight:800">COMPOSICIÓN <span style="font-weight:400">(a iniciativa del Presidente del Gobierno, podrá funcionar ${y('en pleno')} y como ${y('consejo ejecutivo')})</span></div>`,
  `<div class="g2s" style="align-items:start;grid-template-columns:1fr 1fr">`
  + col('CONSEJO DE DEFENSA NACIONAL EN PLENO', abc(
    `El ${a('Presidente del Gobierno')}, que lo presidirá.`, `Los ${a('Vicepresidentes')} del Gobierno.`, `Los Ministros de ${a('Defensa')}, ${a('Interior')}, ${a('Asuntos Exteriores y de Cooperación')} y ${a('Economía y Hacienda')}.`,
    `El ${a('Jefe de Estado Mayor de la Defensa')}.`, `Los ${a('Jefes de Estado Mayor')} del Ejército de Tierra, de la Armada y del Ejército del Aire.`,
    `El ${a('Secretario de Estado Director del Centro Nacional de Inteligencia')}.`, `El ${a('Director del Gabinete de la Presidencia del Gobierno')}.`))
  + col('CONSEJO EJECUTIVO', abc(
    `El ${a('Presidente del Gobierno')}, que lo presidirá.`, `Los Ministros de ${a('Defensa')}, del ${a('Interior')} y de ${a('Asuntos Exteriores y de Cooperación')}.`,
    `El ${a('Jefe de Estado Mayor de la Defensa')}.`, `El ${a('Secretario de Estado Director del Centro Nacional de Inteligencia')}.`, `El ${a('Director del Gabinete de la Presidencia del Gobierno')}.`))
  + '</div>',
  `<div style="margin-top:6px">El Consejo de Defensa Nacional ${y('en pleno informará al Rey')}, a propuesta del Presidente del Gobierno. Cuando el ${a('Rey')} asista a las reuniones del Consejo, ${k('lo presidirá')}.</div>`].join('')));

// ───────── ORGANIZACIÓN BÁSICA DE LAS FUERZAS ARMADAS (pág. 13) ─────────
add(/^Artículo 11 — Organización básica/, esq('ORGANIZACIÓN BÁSICA DE LAS FUERZAS ARMADAS (ART. 11)', '', [
  `<div class="g2s" style="align-items:start;grid-template-columns:1fr 1fr">`
  + col(`${y('ESTRUCTURA ORGÁNICA')}`, lis(`Para la ${y('preparación de la fuerza')}.`, `El ${a('Ejército de Tierra')}, la ${a('Armada')} y el ${a('Ejército del Aire')} constituyen la estructura orgánica de las FAS y aportan las capacidades básicas para su estructura operativa.`))
  + col(`${y('ESTRUCTURA OPERATIVA')}`, lis(`Para su ${y('empleo')} en las misiones que se le asignen.`)) + '</div>',
  caja(`${y('2. La ESTRUCTURA ORGÁNICA')}: ${d('posibilitará')} la generación de la estructura operativa. Se establecerá mediante ${y('criterios de funcionalidad')} basados en los medios y formas propias de acción del Ejército de Tierra, de la Armada y del Ejército del Aire y en una ${y('organización homogénea')} de éstos.`),
  caja(`${y('3. La ESTRUCTURA OPERATIVA')}: establecida para el desarrollo de la ${y('acción conjunta y combinada')}, se organizará con arreglo al ${y('principio de unidad de mando')} y a los criterios necesarios para la consecución de la ${y('máxima capacidad operativa')}.`)].join('')));

// ───────── ESTADO MAYOR DE LA DEFENSA (pág. 13: esquema de tres óvalos) ─────────
add(/^Artículo 12 — El Estado Mayor de la Defensa/, esq('EL ESTADO MAYOR DE LA DEFENSA (ART. 12.2)', '', `<div style="display:grid;grid-template-columns:1fr 1.3fr 1fr;gap:8px;align-items:center;text-align:center">`
  + caja(`${y('MANDO DE OPERACIONES SUBORDINADO')}`) + caja(`${a('ESTADO MAYOR DE LA DEFENSA')}<br><small>cuenta con un Cuartel General y un Mando de Operaciones subordinado</small>`) + caja(`${y('CUARTEL GENERAL')}`) + '</div>'));

// ───────── ESTRUCTURA ORGÁNICA DE LAS FUERZAS ARMADAS (pág. 14) ─────────
add(/^Artículo 15 — Misiones/, esq('ESTRUCTURA ORGÁNICA DE LAS FUERZAS ARMADAS (ART. 13)', '', [
  `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;text-align:center;font-weight:800">${['EJÉRCITO DE TIERRA', 'LA ARMADA', 'EJÉRCITO DEL AIRE'].map(t => `<div style="background:#d3e8d6;${BD};padding:5px">${a(t)}</div>`).join('')}</div>`,
  `<div style="margin-top:6px">${y('Cada uno de ellos está compuesto por')}:<br>${lis(`El ${y('Cuartel General')}.`, `La ${y('Fuerza')}.`, `El ${y('Apoyo a la Fuerza')}.`)}</div>`].join('')));

// ───────── GUARDIA CIVIL (pág. 18: depende de…) ─────────
add(/^Artículo 24 — Misiones de carácter militar/, esq('ART. 23 · LA GUARDIA CIVIL DEPENDE DE…', '', grid('220px', [
  lab(`${a('MINISTERIO DEL INTERIOR')}`, '#f3d5c2'), cel(`En el desempeño de las funciones que se le atribuyen por la ${y('Ley Orgánica 2/1986, de 13 de marzo')}, de Fuerzas y Cuerpos de Seguridad.`),
  lab(`${a('MINISTERIO DE DEFENSA')}`, '#f3d5c2'), cel(`En el cumplimiento de las ${y('misiones de carácter militar')} que se le encomienden.`)])));

module.exports = { soloPropios: true, cuadros: out.map(o => ({ antes: o.antes, html: colorea(o.html) })) };
if (require.main === module) console.log(out.length + ' cuadros');
