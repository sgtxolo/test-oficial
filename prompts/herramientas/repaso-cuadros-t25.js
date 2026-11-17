// Cuadros del Tema 25 (Coordinación y cooperación policial) REDIBUJADOS en su sitio con la forma de tu temario (cajas, flechas, columnas, tablas, organigramas).
// Los 24 cuadros ya están en el Exprés (expres/t25.js, <div class="vis">, texto literal; origen prompts/herramientas/tema25/visuales-t25a.js y b.js); aquí se convierten a esq/caja/bif/fl/tabla2.
// Págs. del PDF: 8, 10, 12, 15, 16, 27, 28, 49, 55, 58, 60, 62, 70-71, 77, 78, 83, 99, 101, 117, 120, 121, 127. Fosforito = el del método (tu PDF trae los cuadros impresos).
// Los 28 cuadros ya están transcritos en el Exprés (expres/t23.js, <div class="vis">, texto literal de la ley); aquí se rehacen con su forma (esq / caja / flecha / columnas / tabla).
// Fosforito = el de mi método (tu PDF trae estos cuadros IMPRESOS, sin fosforito). Págs. del PDF «TEMA 23 SEGURIDAD PRIVADA-2026-08-08.pdf»: 13-75 (ver cada título).
// Se usa con repaso-hibrido.js (PROP.vis redibuja cada cuadro donde está en el Exprés). Convierte la estructura del cuadro (cols / flujo / árbol / plazos / tabla) a la forma de tu temario.
const { colorea, esq, fl, bif, caja, tabla2 } = require('./repaso-cuadros-lib.js');
const fs = require('fs'), path = require('path');
const txt = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const lis = h => [...h.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1]);
// Cuadros que se dejan fuera del esquema clave por espacio (solo se redibujan los de KEYS)
const KEYS = ["*"];
const MAXLI = +(process.env.INFR_MAX || 99);
// por espacio (≤ 12 págs) quedan fuera del esquema clave los cuadros de infracciones de las empresas y de los usuarios/centros (siguen en el Exprés y en el Exprés subrayado)
// por espacio (≤ 12 págs) quedan fuera del esquema clave estos cuadros (siguen en el Exprés y en el Exprés subrayado)
const DROP = (process.env.DROP !== undefined ? process.env.DROP : "ANEXO I|CÓDIGOS DE EVALUACIÓN|DELITOS CONEXOS").split("|").filter(Boolean);
// ---- convertidor de los cuadros del Exprés (<div class="vis">) a la forma del temario: esq / caja / bif / fl / tabla2 ----
// hijos directos <div class="..."> de un fragmento (parser de profundidad; no usa regex sobre anidados)
function kids(h) {
  const out = []; const re = /<div(?: class="([^"]*)")?[^>]*>|<\/div>/g; let m, d = 0, ini = -1, cls = '', cIni = 0;
  while ((m = re.exec(h))) {
    if (m[0] === '</div>') { d--; if (d === 0) out.push({ cls, inner: h.slice(cIni, m.index), outer: h.slice(ini, re.lastIndex) }); }
    else { if (d === 0) { ini = m.index; cls = m[1] || ''; cIni = re.lastIndex; } d++; }
  }
  return out;
}
const sinEt = h => h.replace(/^<span class="et">[\s\S]*?<\/span>/, '');
const etDe = h => (h.match(/^<span class="et">([\s\S]*?)<\/span>/) || [, ''])[1];
const cajaPaso = k => { const et = etDe(k.inner); return caja((et ? '<b>' + et + '</b> ' : '') + sinEt(k.inner), 'cen'); };
function hojas(h) {   // contenido de un vt-hijos -> html (lista de líneas; los nodos anidados llevan su etiqueta en negrita)
  return kids(h).map(k => {
    if (/vt-nodo/.test(k.cls)) { const kk = kids(k.inner); const et = kk.find(x => /vt-et/.test(x.cls)), hi = kk.find(x => /vt-hijos/.test(x.cls)); return '<div style="margin:5px 0 0"><b>' + (et ? et.inner : '') + '</b>' + (hi ? hojas(hi.inner) : '') + '</div>'; }
    const p = (k.inner.match(/<span class="vt-p[^"]*">([\s\S]*?)<\/span>/) || [, ''])[1]; const t = (k.inner.match(/<div class="vt-t">([\s\S]*)<\/div>/) || [, k.inner])[1];
    return '<div style="margin:3px 0 0">' + (p ? '<b>' + p + '</b> ' : '') + t + '</div>';
  }).join('');
}
function vis(html) {
  const m = html.match(/<div class="vis-t"><i>[^<]*<\/i>([\s\S]*?)<\/div>/); if (!m) return html;
  const tit0 = txt(m[1]); const tit = tit0.replace(/\s*\((?:cuadro|cuadros|organigrama|organigrama del temario|cuadro del temario)[^)]*\)\s*$/, '').trim() || tit0;
  const sub = ((tit0.match(/\((?:cuadro|cuadros|organigrama)[^·)]*· ?([^)]*)\)/) || [])[1] || (tit0.match(/\(([^)]*pág[^)]*)\)/) || [])[1] || '');
  const pie = (html.match(/<div class="vis-pie"[^>]*>([\s\S]*?)<\/div>/) || [, ''])[1];
  const rest = html.slice(html.indexOf(m[0]) + m[0].length);
  if (DROP.some(x => tit.toUpperCase().includes(x))) return "";
  const top = kids(rest).filter(k => !/vis-pie/.test(k.cls))[0]; if (!top) return '';
  let body = '';
  if (/vis-comp/.test(top.cls)) {
    const cols = kids(top.inner).map(c => caja('<b>' + (c.inner.match(/<h5>([\s\S]*?)<\/h5>/) || [, ''])[1] + '</b>' + lis(c.inner.replace(/^[\s\S]*?<\/h5>/, '')).map(x => '<div style="margin:3px 0 0">▪ ' + x + '</div>').join(''), ''));
    body = bif(...cols);
  } else if (/vis-flujo/.test(top.cls)) {
    body = kids(top.inner).map(k => /vis-flecha/.test(k.cls) ? fl : /vis-bifurca/.test(k.cls) ? bif(...kids(k.inner).map(cajaPaso)) : cajaPaso(k)).join('');
  } else if (/vis-arbol/.test(top.cls)) {
    const kk = kids(top.inner); const raiz = kk.find(x => /vis-raiz/.test(x.cls)), ramas = kk.find(x => /vis-ramas/.test(x.cls));
    body = (raiz ? caja(raiz.inner, 'cen') + fl : '') + (ramas ? bif(...kids(ramas.inner).map(r => { const mm = r.inner.match(/^([\s\S]*?)<div class="vis-sub">([\s\S]*)<\/div>$/); const t = mm ? mm[1] : r.inner; const subs = mm ? [...mm[2].matchAll(/<span>([\s\S]*?)<\/span>/g)].map(x => '<div style="margin:3px 0 0">▪ ' + x[1] + '</div>').join('') : ''; return caja('<b>' + t + '</b>' + subs, 'cen'); })) : '');
  } else if (/vis-plazos/.test(top.cls)) {
    body = tabla2('Plazo', 'Supuesto', [...top.inner.matchAll(/<div class="vis-plazo"><span class="n">([\s\S]*?)<\/span>([\s\S]*?)<\/div>/g)].map(p => ['<b>' + p[1] + '</b>', p[2]]));
  } else if (/vis-tabla/.test(top.cls)) {
    const kk = kids(top.inner); const cab = (kk.find(x => /vt-cab/.test(x.cls)) || { inner: '' }).inner; const hs = [...cab.matchAll(/<span>([\s\S]*?)<\/span>/g)].map(x => x[1]);
    const filas = [];
    kk.filter(x => !/vt-cab/.test(x.cls)).forEach(n => {
      if (/vt-nodo/.test(n.cls)) { const q = kids(n.inner); const et = q.find(x => /vt-et/.test(x.cls)), hi = q.find(x => /vt-hijos/.test(x.cls)); filas.push(['<b>' + (et ? et.inner : '') + '</b>', hi ? hojas(hi.inner) : '']); }
      else filas.push(['', hojas(n.outer)]);
    });
    body = tabla2(hs[0] || 'Principio', hs[1] || 'Texto de la ley', filas);
  } else return '';
  if (!body) return '';
  if (pie) body += '<div class="man" style="margin-top:6px;display:block">' + pie.replace(/^✎\s*/, '✎ ') + '</div>';
  const h = colorea(esq(tit, sub, body));
  return body.length > 1400 ? "<!--largo-->" + h.replace("<div class=\"esq\">", "<div class=\"esq largo\">") : h;
}
const RR = require("./tema25/r-temario-t25.js");
module.exports = { soloPropios: true, vis, KEYS, RR };
