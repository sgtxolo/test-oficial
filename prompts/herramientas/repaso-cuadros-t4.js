// Cuadros del Tema 4 para el Esquema clave, rehechos con la FORMA del temario (tablas con columna de etiquetas, IMPREVISIBLE | PREVISIBLE,
// actores en cadena, categorías en cuadrícula…) y con tu fosforito. El texto literal y las marcas vienen de visuales-t4.js (transcrito de las págs.
// 57, 63, 97-100, 150, 168, 173, 186 y 198 del PDF escaneado); aquí solo se cambia cómo se dibuja. Los usa repaso-hibrido.js (cuadros propios).
const fs = require('fs');
const { colorea } = require('./repaso-cuadros-lib.js');   // verde (órganos y personas) y lila (futuros) con las mismas reglas del Exprés
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const mk = c => t => `<mark class="${c}">${t}</mark>`;
const Y = mk('y'), D = mk('d'), P = mk('p'), K = t => `<mark class="k">${t}</mark>`;
const br = s => String(s).replace(/\n/g, '<br>');
const COL = { o: '#f3d5c2', v: '#d3e8d6', c: '#e3dbf0', n: '#dfe9f5' };
const lab = (t, c) => `<div style="background:${COL[c] || '#d3e8e1'};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;border:1px solid rgba(60,70,80,.35);color:#1f2a33">${br(t)}</div>`;
const cel = t => `<div style="padding:6px 9px;border:1px solid rgba(60,70,80,.35);line-height:1.5">${t}</div>`;
const esq = (tit, inner) => `<div class="esq"><div class="ban">${tit}</div><div class="cuerpo">${inner}</div></div>`;
const caja = (t, e = '') => `<div class="caja ${e}">${br(t)}</div>`;
const fl = '<div class="fl">▼</div>';

// tabla: filas {l, c, h:[{p?, c?, t}]} → etiqueta | contenido (EUROSUR) o etiqueta | IMPREVISIBLE | PREVISIBLE (art. 25)
const tabla = (tit, cab, nodos) => {
  const tres = nodos.some(n => (n.h || []).some(h => h.p));
  if (tres) {
    const cabecera = `<div></div><div style="background:#2f7d6d;color:#fff;text-align:center;font-weight:800;padding:5px">IMPREVISIBLE</div><div style="background:#2f7d6d;color:#fff;text-align:center;font-weight:800;padding:5px">PREVISIBLE</div>`;
    const filas = nodos.map(n => { const im = n.h.filter(h => h.p === 'IMPREVISIBLE').map(h => h.t).join('<br>'), pr = n.h.filter(h => h.p === 'PREVISIBLE').map(h => h.t).join('<br>'); return lab(n.l, 'o') + cel(im) + cel(pr); }).join('');
    return esq(tit.replace(/\s*\(cuadro del temario.*$/, ''), `<div style="display:grid;grid-template-columns:110px 1fr 1.25fr">${cabecera}${filas}</div>`);
  }
  const filas = nodos.map(n => lab(n.l, n.c) + cel(n.h.map(h => h.t).join('<br>'))).join('');
  return esq(tit, `<div style="display:grid;grid-template-columns:150px 1fr">${filas}</div>`);
};
// arbol: raíz + ramas (art. 28 = cadena de actores con flechas; 4 ramas = cuadrícula; resto = lista de cajas)
const arbol = (tit, raiz, ramas) => {
  const flujo = /^Art\. 28/.test(tit);
  const caj = r => typeof r === 'string' ? caja(r) : caja(r.t + '<br>' + r.sub.map(s => '<span style="display:block;margin:3px 0 0 10px">' + s + '</span>').join(''));
  const cuerpo = flujo ? ramas.map(caj).join(fl) : ramas.length === 4 ? `<div class="g2s" style="align-items:start">${ramas.map(caj).join('')}</div>` : ramas.map(caj).join('');
  return esq(tit, caja(raiz, 'cen') + fl + cuerpo);
};
const flujo = (tit, pasos) => esq(tit, pasos.map(p => caja(p.t)).join(fl));
const plazos = (tit, items) => esq(tit, `<div style="display:grid;grid-template-columns:130px 1fr">${items.map(([n, t]) => lab(n, 'o') + cel(t)).join('')}</div>`);

// Se reutiliza la transcripción de visuales-t4.js cambiando solo las funciones de dibujo y las marcas especiales
let src = fs.readFileSync(R + 'prompts/herramientas/visuales-t4.js', 'utf8');
src = src.replace(/const L = require\([^)]*\);/, 'const L = { inserta() {} };')
  .replace(/const \{ R, P, D, Y, K, arbol, flujo, cols, plazos, tabla \} = L;/, '')
  .replace(/const U = .*;/, 'const U = x => `<u style="text-decoration:underline;text-decoration-color:#555">${x}</u>`;')
  .replace(/const CA = .*;/, 'const CA = x => `<span style="border:1.5px solid #1d4ed8;padding:0 2px">${x}</span>`;')
  .replace(/const O = .*;/, 'const O = x => `<span style="border:1.5px solid #c2185b;border-radius:10px;padding:0 3px">${x}</span>`;')
  .replace(/const AS = .*;/, 'const AS = \'<span style="color:#d32f2f;font-weight:900">✱</span>\';')
  .replace(/const pie = .*;/, 'const pie = (html, txt) => html.replace(/<\\/div>$/, `<div class="pie nota">${txt}</div></div>`);');
const mod = { exports: [] };
new Function('require', 'module', 'Y', 'P', 'D', 'K', 'tabla', 'arbol', 'flujo', 'plazos', src)({ main: null }, mod, Y, P, D, K, tabla, arbol, flujo, plazos);
const V = mod.exports;   // [[«tras», html]]

// «tras» (ficha del Exprés que precede) → ancla (ficha que lleva el cuadro delante)
const ANCLA = {
  'Artículos 25 y 25 bis': /^Artículos? 25 y 25 bis/, 'Artículos 26 a 28': /^Artículos? 26 a 28/,
  'Artículos 20, 21, 23, 25 y 28': /^Artículos? 20, 21, 23, 25 y 28/, 'Artículos 34 y 35': /^Artículos? 34 y 35/,
  'Artículos 54 y 55': /^Artículos? 54 y 55/, 'Artículos 56 a 58': /^Artículos? 56 a 58/,
  'Artículos 67 a 70': /^Artículos? 67 a 70/, 'Artículos 82, 84 y 85': /^Artículos? 82, 84 y 85/
};
module.exports = { soloPropios: true, cuadros: V.map(([tras, html]) => ({ antes: ANCLA[tras] || new RegExp('^' + tras.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), html: colorea(html) })) };
if (require.main === module) console.log(V.length + ' cuadros', V.map(v => v[0]));
