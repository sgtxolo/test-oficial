// Cuadros del Tema 11 (Derecho Administrativo) para el Esquema clave, con la FORMA del temario (tablas con columna de etiquetas, plazos en cuadrícula,
// comparativas en columnas, cadenas de pasos…) y tu fosforito. El texto literal y las marcas vienen de visuales-t11.js (transcrito del PDF escaneado
// «TEMA 11 DERECHO ADEMINISTRATIVO-08-08-2026.pdf», págs. 3 y 6-19); aquí solo se cambia cómo se dibuja. Los usa repaso-hibrido.js (cuadros propios).
// Mismo método que repaso-cuadros-t4.js.
const fs = require('fs');
const { colorea } = require('./repaso-cuadros-lib.js');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const mk = c => t => `<mark class="${c}">${t}</mark>`;
const Y = mk('y'), D = mk('d'), P = mk('p'), K = t => `<mark class="k">${t}</mark>`;
const br = s => String(s).replace(/\n/g, '<br>');
const BD = 'border:1px solid rgba(60,70,80,.35)';
const COL = { o: '#f3d5c2', v: '#d3e8d6', c: '#e3dbf0', n: '#dfe9f5' };
const lab = (t, c) => `<div style="background:${COL[c] || '#d3e8e1'};padding:6px 8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;${BD};color:#1f2a33"><div>${br(t)}</div></div>`;
const cel = t => `<div style="padding:6px 9px;${BD};line-height:1.5">${t}</div>`;
const limpia = t => t.replace(/ · cuadro del temario/g, '').replace(/ · esquema del temario/g, '').replace(/\s*\(cuadro del temario\)/g, '');
const esq = (tit, inner) => `<div class="esq"><div class="ban">${limpia(tit)}</div><div class="cuerpo">${inner}</div></div>`;
const caja = (t, e = '') => `<div class="caja ${e}">${br(t)}</div>`;
const fl = '<div class="fl">▼</div>';
const li = x => `<li style="margin:2px 0">${x}</li>`;

// tabla: filas {l, c, h:[{p?, c?, t}]} → etiqueta | contenido (o etiqueta | IMPREVISIBLE | PREVISIBLE si hay h.p)
const tabla = (tit, cab, nodos) => {
  const filas = nodos.map(n => lab(n.l, n.c) + cel(n.h.map(h => h.t).join('<br>'))).join('');
  return esq(tit.replace(/\s*\(cuadro del temario.*$/, ''), `<div style="display:grid;grid-template-columns:150px 1fr">${filas}</div>`);
};
// arbol: raíz + ramas (4 ramas = cuadrícula; resto = lista de cajas)
const arbol = (tit, raiz, ramas) => {
  const caj = r => typeof r === 'string' ? caja(r) : caja(r.t + '<br>' + r.sub.map(s => '<span style="display:block;margin:3px 0 0 10px">' + s + '</span>').join(''));
  const cuerpo = ramas.length === 4 ? `<div class="g2s" style="align-items:start">${ramas.map(caj).join('')}</div>` : ramas.map(caj).join('');
  return esq(tit.replace(/\s*\(cuadro del temario.*$/, ''), caja(raiz, 'cen') + fl + cuerpo);
};
// flujo: pasos {et,t,c,bif} → cajas encadenadas con flechas; bif = ramas lado a lado
const paso = p => typeof p === 'string' ? caja(p) : caja((p.et ? `<b>${p.et}</b> · ` : '') + p.t);
const flujo = (tit, pasos) => esq(tit.replace(/\s*\(cuadro del temario.*$/, ''), pasos.map(p => p && p.bif ? `<div class="g2s" style="align-items:start;grid-template-columns:repeat(${p.bif.length},1fr)">${p.bif.map(paso).join('')}</div>` : paso(p)).join(fl));
const cols = (tit, columnas, medio) => esq(tit.replace(/\s*\(cuadro del temario.*$/, ''), `<div class="g2s" style="align-items:start;grid-template-columns:repeat(${columnas.length},1fr)">${columnas.map(c => `<div class="caja"><div style="font-weight:800;margin:0 0 4px;text-align:center">${c.t}</div><ul style="list-style:none;padding-left:6px;margin:0">${c.l.map(x => li('• ' + x)).join('')}</ul></div>`).join('')}</div>`);
const plazos = (tit, items) => esq(tit.replace(/\s*\(cuadro del temario.*$/, ''), `<div style="display:grid;grid-template-columns:130px 1fr">${items.map(([n, t]) => lab(n, 'o') + cel(t)).join('')}</div>`);

// Se reutiliza la transcripción de visuales-t11.js cambiando solo las funciones de dibujo y las marcas especiales
let src = fs.readFileSync(R + 'prompts/herramientas/visuales-t11.js', 'utf8');
src = src.replace(/const L = require\([^)]*\);/, 'const L = { inserta() {} };')
  .replace(/const \{ R, P, D, Y, K, arbol, flujo, cols, plazos, tabla \} = L;/, '')
  .replace(/const U = .*;/, 'const U = x => `<u style="text-decoration:underline;text-decoration-color:#555">${x}</u>`;')
  .replace(/const CA = .*;/, 'const CA = x => `<span style="border:1.5px solid #1d4ed8;padding:0 2px">${x}</span>`;')
  .replace(/const CR = .*;/, 'const CR = x => `<span style="border:1.5px solid #c0392b;padding:0 2px">${x}</span>`;')
  .replace(/const OA = .*;/, 'const OA = x => `<span style="border:1.5px solid #1d4ed8;border-radius:10px;padding:0 3px">${x}</span>`;')
  .replace(/const O = .*;/, 'const O = x => `<span style="border:1.5px solid #c2185b;border-radius:10px;padding:0 3px">${x}</span>`;')
  .replace(/const F = .*;/, 'const F = \'<span style="color:#1d4ed8;font-weight:900">➜</span>\';')
  .replace(/const AS = .*;/, 'const AS = \'<span style="color:#d32f2f;font-weight:900">✱</span>\';')
  .replace(/const G = .*;/, 'const G = x => `<mark class="a">${x}</mark>`;')
  .replace(/if \(require\.main === module\) L\.inserta\(11, V\);/, '');
const mod = { exports: [] };
new Function('require', 'module', 'R', 'Y', 'P', 'D', 'K', 'tabla', 'arbol', 'flujo', 'cols', 'plazos', src)({ main: null }, mod, x => x, Y, P, D, K, tabla, arbol, flujo, cols, plazos);
const V = mod.exports;   // [[«tras», html]]


// Varias leyes en el mismo Exprés con artículos repetidos: cada cuadro se ancla por nº de artículo DENTRO del rango de fichas de su ley (nº de bloque del Exprés, 1-based).
const RANGOS = { L39: [92, 225], L40: [226, 317], L19: [318, 360], RD: [361, 383] };
const ley = t => /Suplencia|Régimen de los órganos colegiados|Clasificación y composición|Recusación|Estructura de la Administración General|Ordenación jerárquica/.test(t) ? 'L40' : /Prescripción|Órgano competente y procedimiento/.test(t) ? 'L19' : /Órganos de prevención/.test(t) ? 'RD' : 'L39';
// El T11 tiene 40 cuadros del temario y no caben en 12 págs: con CUAD_MAX=n entran los n de más peso para el examen (orden de PRIO; el resto se lista como «dejados fuera»).
const PRIO = [/Silencio/, /Nulidad de pleno/, /— Notificación/, /Cómputo de plazos/, /Artículo 121/, /Artículo 123/, /Artículo 126/, /Artículo 125/, /Suspensión del plazo/, /Tramitación simplificada/,
  /Medios de ejecución/, /revisión de oficio/, /Convalidación/, /Acuerdo de iniciación/, /Tramitación de urgencia/, /Condiciones generales/, /Publicación/, /Representación/, /Lengua/, /Objeto de la Ley/,
  /Estructura de la Administración/, /Ordenación jerárquica/, /Clasificación y composición/, /Recusación/, /Régimen de los órganos colegiados/, /Suplencia/, /Prescripción/, /Órgano competente/, /Participación de los ciudadanos/, /Órganos de prevención/, /Transmisiones de datos/];
const prio = t => { const i = PRIO.findIndex(r => r.test(t)); return i < 0 ? 99 : i; };
let cuad = V.map(([tras, html], i) => ({ tit: tras, i0: i, art: +tras.match(/Artículo (\d+)/)[1], rango: RANGOS[/Transmisiones de datos/.test(tras) ? 'L40' : ley(tras)], antes: /^$/, html: colorea(html), pr: prio(tras) }));
if (process.env.CUAD_MAX) {
  const dejar = cuad.slice().sort((a, b) => a.pr - b.pr || a.i0 - b.i0).slice(+process.env.CUAD_MAX);
  console.log('Cuadros dejados fuera (' + dejar.length + '): ' + dejar.map(c => c.tit).join(' | '));
  cuad = cuad.filter(c => !dejar.includes(c));
}
module.exports = { soloPropios: true, cuadros: cuad };
if (require.main === module) console.log(V.length + ' cuadros', V.map(v => v[0] + ' → ' + ley(v[0])));
