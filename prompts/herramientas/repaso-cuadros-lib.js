// Piezas comunes para rehacer los cuadros del temario con su forma (ver repaso-cuadros-t20.js, repaso-cuadros-t3.js…).
// Colores: y amarillo · d naranja · a verde · p azul · c morado · k subrayado rojo. Estilos CSS: los trae repaso-hibrido.js (CSSESQ).
const y = t => `<mark class="y">${t}</mark>`, d = t => `<mark class="d">${t}</mark>`, a = t => `<mark class="a">${t}</mark>`, p = t => `<mark class="p">${t}</mark>`, c = t => `<mark class="c">${t}</mark>`, k = t => `<mark class="k">${t}</mark>`;
const esq = (tit, sub, inner) => `<div class="esq"><div class="ban">${tit}${sub ? '<small>' + sub + '</small>' : ''}</div><div class="cuerpo">${inner}</div></div>`;
const fl = '<div class="fl">▼</div>';
const bif = (...cols) => `<div class="bif" style="grid-template-columns:repeat(${cols.length},1fr)">${cols.map(x => `<div class="rama">${x}</div>`).join('')}</div>`;
const caja = (t, e = '') => `<div class="caja ${e}">${t}</div>`;
const lista = items => '<ul style="list-style:none;padding-left:8px;margin:3px 0 0">' + items.map(x => '<li>• ' + x + '</li>').join('') + '</ul>';
const tabla2 = (h1, h2, filas) => `<div class="tab2"><div class="th">${h1}</div><div class="th">${h2}</div>${filas.map(([x, z]) => `<div class="td">${x}</div><div class="td">${z}</div>`).join('')}</div>`;
const lineaTiempo = pasos => `<div class="lt">${pasos.map(x => `<div class="lt-i ${x.c || ''}">${x.t}</div>`).join('')}</div>`;
const g2 = (...cols) => `<div class="g2s" style="align-items:start;grid-template-columns:repeat(${cols.length},1fr)">${cols.map(x => `<div>${x}</div>`).join('')}</div>`;
// nota a boli del usuario
const man = t => `<span class="man">${t}</span>`;
module.exports = { y, d, a, p, c, k, esq, fl, bif, caja, lista, tabla2, lineaTiempo, g2, man };
