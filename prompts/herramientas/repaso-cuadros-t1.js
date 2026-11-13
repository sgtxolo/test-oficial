// Cuadros del Tema 1 rehechos con la forma del temario escaneado («TEMA 1 DERECHOS HUMANOS-08-08-2026.pdf», leído como imagen el 13/11/2026).
// Págs. del PDF: 17 (Roma art. 19.6), 39 (LO 18/2003 art. 4), 51-52 (Carta: títulos), 71 (CoE art. 26), 84 (TEDH arts. 19-23), 84 (art. 26), 88 (art. 35).
// Amarillo y · naranja d · verde a · azul p · lila c · subrayado rojo k. «man» = nota a boli. Los usa repaso-hibrido.js (cuadros propios).
const { colorea, y, d, a, p, c, k, esq, fl, caja, man } = require('./repaso-cuadros-lib.js');
const BD = 'border:1px solid rgba(60,70,80,.35)';
const lab = (t, bg = '#f6ecb8') => `<div style="background:${bg};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;${BD};color:#1f2a33">${t}</div>`;
const cel = t => `<div style="padding:6px 9px;${BD};line-height:1.5">${t}</div>`;
const out = [];
const add = (antes, html) => out.push({ antes, html });

// ───────── LO 18/2003, art. 4 (pág. 39 del PDF: lista enmarcada) ─────────
add(/^Artículo 4 — De las autoridades competentes/, esq('ART. 4 · AUTORIDADES COMPETENTES PARA LA APLICACIÓN DE LA LEY', '', [
  caja(`${a('Autoridades competentes')} para la aplicación de esta ley`, 'cen'), fl,
  `<div style="display:grid;grid-template-columns:34px 1fr">`
  + [['a)', `El ${a('Gobierno')}.`], ['b)', `El ${a('Ministerio de Justicia')}.`],
    ['c)', `El ${a('Ministerio de Asuntos Exteriores')}, en los casos previstos en esta ley y, ${k('en todo caso')}, cuando intervinieran factores de política exterior. ${man('MAE')}`],
    ['d)', `El ${a('Ministerio de Defensa')} y el ${a('Ministerio del Interior')}, ${k('cuando')} el acto de cooperación afecte a sus competencias.`],
    ['e)', `Los ${a('órganos judiciales de la jurisdicción ordinaria')} y, en particular, la ${y('Audiencia Nacional')}.`],
    ['f)', `Los ${a('órganos judiciales militares')} y, en particular, el ${y('Tribunal Militar Central')}.`],
    ['g)', `El ${a('Ministerio Fiscal')}.`]].map(([l, t]) => lab(l, '#f3d5c2') + cel(t)).join('') + '</div>'].join('')));

// ───────── Estatuto de Roma, art. 19.6 (pág. 17: recuadro ANTES / DESPUÉS) ─────────
add(/^Artículo 19 — Impugnación de la competencia de la Corte/, esq('ART. 19.6 · IMPUGNACIÓN DE LA ADMISIBILIDAD DE UNA CAUSA O DE LA COMPETENCIA DE LA CORTE', '', [
  caja(`${y('ANTES DE LA CONFIRMACIÓN DE LOS CARGOS')}<br>La impugnación de la admisibilidad de una causa o de la competencia de la Corte será asignada a la ${a('Sala de Cuestiones Preliminares')} ${man('R24')}`), fl,
  caja(`${y('DESPUÉS DE CONFIRMADOS LOS CARGOS')}<br>Será asignada a la ${a('Sala de Primera Instancia')} ${man('R25')}`), fl,
  caja(`Las decisiones relativas a la competencia o la admisibilidad ${d('podrán ser recurridas')} ante la ${a('Sala de Apelaciones')} (art. 82).`)].join('')));

// ───────── Carta de los Derechos Fundamentales: títulos y artículos (págs. 51-52) ─────────
add(/^Datos y estructura de la Carta/, esq('CARTA DE LOS DERECHOS FUNDAMENTALES DE LA UE · TÍTULOS Y ARTÍCULOS', '', `<div style="display:grid;grid-template-columns:170px 1fr">`
  + [['PREÁMBULO', 'Sin artículos'], ['I · DIGNIDAD', 'Arts. 1 a 5'], ['II · LIBERTADES', 'Arts. 6 a 19'], ['III · IGUALDAD', 'Arts. 20 a 26'],
    ['IV · SOLIDARIDAD', 'Arts. 27 a 38'], ['V · CIUDADANÍA', 'Arts. 39 a 46'], ['VI · JUSTICIA', 'Arts. 47 a 50'], ['VII · DISPOSICIONES GENERALES', 'Arts. 51 a 54']]
    .map(([t, z]) => lab(t, '#d3e8d6') + cel(z)).join('') + '</div>'));

// ───────── Consejo de Europa, art. 26: representantes por Estado (pág. 71) ─────────
const pais = [['Austria', '6'], ['Bélgica', '7'], ['Chipre', '3'], ['Dinamarca', '5'], ['España', '12'], ['Francia', '18'], ['Grecia', '7'], ['Irlanda', '4'], ['Islandia', '3'], ['Italia', '18'], ['Luxemburgo', '3'],
  ['Malta', '3'], ['Noruega', '5'], ['Países Bajos', '7'], ['Portugal', '7'], ['Reino Unido', '18'], ['Rep. Federal de Alemania', '18'], ['Suecia', '8'], ['Suiza', '6'], ['Turquía', '12']];
const pf = ([n, v]) => lab(n, /España/.test(n) ? '#f3c9a8' : (['Francia', 'Italia', 'Reino Unido', 'Rep. Federal de Alemania', 'Turquía'].includes(n) ? '#f6ecb8' : '#eef3f0')) + cel(`<b>${v}</b>`);
add(/^Artículos 26 y 28 — Número de representantes/, esq('ART. 26 · NÚMERO DE REPRESENTANTES DE CADA MIEMBRO EN LA ASAMBLEA CONSULTIVA', '',
  `<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 14px"><div style="display:grid;grid-template-columns:1fr 60px">${pais.slice(0, 11).map(pf).join('')}</div><div style="display:grid;grid-template-columns:1fr 60px">${pais.slice(11).map(pf).join('')}</div></div>`
  + `<div style="margin-top:6px">${y('18')}: Francia, Italia, Reino Unido y Alemania · ${y('12')}: ${d('España')} y Turquía</div>`));

// ───────── TEDH, arts. 20-23 (pág. 84: ELECCIÓN DE LOS JUECES) ─────────
add(/^Artículos 25 y 26 — Pleno/, esq('TRIBUNAL EUROPEO DE DERECHOS HUMANOS · JUECES (ARTS. 20-23)', '', [
  caja(`${y('ELECCIÓN DE LOS JUECES')}<br>La ${a('Asamblea Parlamentaria')}, por ${p('mayoría absoluta de votos')}, de una lista de ${p('tres candidatos')} presentada por esa Alta Parte Contratante.`, 'cen'), fl,
  `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;align-items:start">`
  + caja(`${y('NÚMERO DE JUECES')}<br>Igual al de las Altas Partes Contratantes.`)
  + caja(`${y('DURACIÓN DEL MANDATO')}<br>• Elegidos por un periodo de ${p('9 años')}.<br>• ${k('No')} reelegibles.`)
  + caja(`${y('REVOCACIÓN DEL MANDATO')}<br>• Permanecerán en sus funciones hasta su sustitución. ${k('No obstante')}, continuarán conociendo de los asuntos que tengan ya asignados.<br>• Relevado de sus funciones: decisión de los demás jueces, mayoría de ${p('2/3')}.`)
  + '</div>'].join('')));

// ───────── TEDH, art. 26 (pág. 84: juez único, Comités, Salas y Gran Sala) ─────────
add(/^Artículos 27 y 28 — Competencias del juez único/, esq('ART. 26 · FORMACIONES DEL TRIBUNAL', '', `<div style="display:grid;grid-template-columns:200px 1fr">`
  + [['Juez único', '1'], ['Comités', '3 jueces'], ['Salas', '7 jueces'], ['Gran Sala', '17 jueces']].map(([t, z]) => lab(a(t), '#f3d5c2') + cel(`<b>${p(z)}</b>`)).join('')
  + `</div><div style="margin-top:6px">${man('1 · 3 · 7 · 17')} · Las Salas constituirán los Comités por un ${p('periodo determinado')}. ${man('Reducir a 5 el número de jueces de Sala (art. 26.2)')}</div>`));

// ───────── TEDH, arts. 34-35: demanda individual (pág. 88) ─────────
add(/^Artículos 35 y 36 — Admisibilidad/, esq('ART. 35 · ADMISIBILIDAD DE LAS DEMANDAS INDIVIDUALES · EL TRIBUNAL', '', `<div style="display:grid;grid-template-columns:200px 1fr">`
  + lab(`Podrá ser recurrido después de agotar las vías de recursos internos`) + cel(`Plazo de ${p('4 meses')} a partir de la fecha de la resolución interna definitiva.`)
  + lab(`${k('NO')} ADMITIRÁ demanda individual cuando:`, '#f3d5c2') + cel(`• Sea ${y('anónima')}.<br>• Sea esencialmente la misma que una demanda examinada anteriormente o sometida a otra instancia internacional y no contenga hechos nuevos.`)
  + lab(`Declarará INADMISIBLE cualquier demanda individual si:`, '#f3d5c2') + cel(`• La demanda es incompatible con las disposiciones del Convenio o de sus Protocolos, manifiestamente mal fundada o abusiva.<br>• El demandante no ha sufrido un ${y('perjuicio importante')}, ${k('a menos que')} el respeto de los derechos humanos garantizados por el Convenio y por sus Protocolos exija un examen del fondo de la demanda.`)
  + lab(`RECHAZARÁ cualquier demanda que considere inadmisible`) + cel(`En ${y('cualquier fase del procedimiento')}.`)
  + '</div>'));

module.exports = { soloPropios: true, cuadros: out.map(o => ({ antes: o.antes, html: colorea(o.html) })) };
if (require.main === module) console.log(out.length + ' cuadros');
