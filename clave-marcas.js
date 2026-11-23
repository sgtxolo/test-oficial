/* Marcas de estudio del ESQUEMA CLAVE (como «🖍 Marcas» de la app Esquemas): resaltar, subrayar, tachar, borrar, deshacer y borrar todo.
   Se carga desde clave-mejoras.js al terminar de montar la página. Se guardan en este navegador (localStorage «clave-marcas:tN»),
   ancladas por posición de texto (ignora botones, cajas de artículos, preguntas rápidas y audio, que son dinámicos). */
(function () {
  'use strict';
  var NT = (location.pathname.match(/repaso-t(\d+)-/) || [])[1]; if (!NT || window.__claveMarcas) return; window.__claveMarcas = 1;
  var KEY = 'clave-marcas:t' + NT, SK = '.cl-artbox,.cl-boxli,.cl-boxtr,.cl-noprint,.cq-bar,.cq-quiz,#aud,#btnQ,#rqbox,#cm-ui,#cm-pop,button,script,style,noscript,textarea,input,select';
  var COLS = [['#bfe3c4', 'Verde · autoridad'], ['#f7c9a8', 'Naranja · destacable'], ['#f7e79a', 'Amarillo · otro dato'], ['#c9b7e0', 'Morado · acción'], ['#a9d3ea', 'Azul · plazo / cifra'], ['#ffb3c1', 'Rosa'], ['#9be7f0', 'Cian'], ['#e5383b', 'Rojo (subrayar / tachar)']];
  var TOOLS = [['hl', '🖍', 'Resaltar'], ['ul', 'U', 'Subrayar'], ['st', 'S', 'Tachar'], ['er', '🧽', 'Borrar una marca (toca encima)']];
  var data = { n: 0, m: [] }, st = { on: false, tool: 'hl', color: COLS[2][0] }, ui, pop;
  try { var g = JSON.parse(localStorage.getItem(KEY) || 'null'); if (g && g.m) data = g; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }
  var rgba = function (h) { var n = parseInt(h.slice(1), 16); return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',.75)'; };

  var css = document.createElement('style'); css.id = 'cm-css';
  css.textContent = '#cm-fab{position:fixed;right:10px;top:10px;z-index:9000;padding:6px 10px;border:2px solid #2a9d6a;border-radius:20px;background:#fff;color:#14532d;font:700 13px system-ui,sans-serif;cursor:pointer;box-shadow:0 1px 6px rgba(0,0,0,.25)}' +
    '#cm-fab.on{background:#1c4d3c;color:#fff}' +
    '#cm-ui{position:fixed;right:10px;top:48px;z-index:9000;display:none;flex-wrap:wrap;gap:4px;max-width:260px;padding:6px;background:#fff;border:2px solid #2a9d6a;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.3);font:13px system-ui,sans-serif;color:#000}' +
    'body.cm-on #cm-ui{display:flex}' +
    '#cm-ui .cm-b{min-width:34px;height:34px;padding:0 6px;border:1px solid #888;border-radius:7px;background:#f4f4f4;color:#000;font-size:15px;cursor:pointer}' +
    '#cm-ui .cm-b.on{background:#14532d;color:#fff;border-color:#14532d}' +
    '#cm-ui .cm-c{width:28px;height:28px;border:2px solid #999;border-radius:50%;cursor:pointer;padding:0}' +
    '#cm-ui .cm-c.on{border:3px solid #000;box-shadow:0 0 0 2px #fff inset}' +
    '#cm-ui .cm-sep{flex-basis:100%;height:0}' +
    '.cm-m{border-radius:2px}.cm-hl{background:var(--cmc)!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
    '.cm-ul{text-decoration:underline!important;text-decoration-color:var(--cmcs);text-decoration-thickness:3px;text-underline-offset:2px}' +
    '.cm-st{text-decoration:line-through!important;text-decoration-color:var(--cmcs);text-decoration-thickness:3px}' +
    'body.cm-er .cm-m{cursor:crosshair;outline:1px dashed rgba(0,0,0,.35)}' +
    '@media print{#cm-fab,#cm-ui{display:none!important}.cm-hl{background:var(--cmc)!important}}';
  document.head.appendChild(css);

  /* ---------- texto: posiciones ---------- */
  function textNodes() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      var p = n.parentElement; return (!p || p.closest(SK) || !n.nodeValue) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } }), a = [], n;
    while ((n = w.nextNode())) a.push(n); return a;
  }
  function offsetOf(nodes, c, o) {
    var pr = document.createRange(); pr.setStart(c, o); pr.collapse(true); var acc = 0;
    for (var k = 0; k < nodes.length; k++) {
      var t = nodes[k], len = t.nodeValue.length;
      if (c === t) return acc + o;
      if (pr.comparePoint(t, len) < 0) acc += len; else return acc;
    }
    return acc;
  }
  function wrap(m) {
    var nodes = textNodes(), acc = 0, jobs = [];
    nodes.forEach(function (t) { var a = acc, b = acc + t.nodeValue.length; acc = b; var f = Math.max(m.s, a) - a, to = Math.min(m.e, b) - a; if (to > f && t.nodeValue.slice(f, to).trim() !== '') jobs.push([t, f, to]); });
    jobs.forEach(function (j) {
      var t = j[0], f = j[1], to = j[2], mid = t; if (f > 0) mid = t.splitText(f); if (to - f < mid.nodeValue.length) mid.splitText(to - f);
      var s = document.createElement('span'); s.className = 'cm-m cm-' + m.k; s.setAttribute('data-cm', m.n);
      s.style.setProperty('--cmc', rgba(m.c)); s.style.setProperty('--cmcs', m.c);
      mid.parentNode.replaceChild(s, mid); s.appendChild(mid);
    });
  }
  function unwrap(n) {
    Array.prototype.slice.call(document.querySelectorAll('.cm-m[data-cm="' + n + '"]')).forEach(function (s) { var p = s.parentNode; while (s.firstChild) p.insertBefore(s.firstChild, s); p.removeChild(s); p.normalize(); });
  }
  function aplicaTodas() { data.m.forEach(wrap); }

  /* ---------- acciones ---------- */
  function marcaSeleccion() {
    var s = window.getSelection(); if (!st.on || st.tool === 'er' || !s || !s.rangeCount || s.isCollapsed) return;
    var r = s.getRangeAt(0); if (!document.body.contains(r.commonAncestorContainer)) return;
    var c = r.commonAncestorContainer; if (c.nodeType === 3) c = c.parentNode; if (c.closest && c.closest('#cm-ui,#cm-pop')) return;
    var nodes = textNodes(), a = offsetOf(nodes, r.startContainer, r.startOffset), b = offsetOf(nodes, r.endContainer, r.endOffset);
    if (a < 0 || b < 0 || b <= a) { s.removeAllRanges(); return; }
    var m = { n: ++data.n, k: st.tool, s: a, e: b, c: st.color };
    // un solo resaltado/subrayado/tachado del mismo tipo por tramo: lo que pise se quita (se conserva lo que quede fuera)
    data.m.slice().forEach(function (x) {
      if (x.k !== m.k || x.e <= a || x.s >= b) return;
      unwrap(x.n); data.m = data.m.filter(function (y) { return y !== x; });
      if (x.s < a) { var l = { n: ++data.n, k: x.k, s: x.s, e: a, c: x.c }; data.m.push(l); }
      if (x.e > b) { var rr = { n: ++data.n, k: x.k, s: b, e: x.e, c: x.c }; data.m.push(rr); }
    });
    s.removeAllRanges();
    data.m.push(m); save(); rehaz();
  }
  function rehaz() { data.m.forEach(function (m) { unwrap(m.n); }); aplicaTodas(); }
  function borra(n) { data.m = data.m.filter(function (x) { return String(x.n) !== String(n); }); unwrap(n); save(); }
  function undo() { var u = data.m.pop(); if (!u) return; unwrap(u.n); save(); }
  function clearAll() { if (!data.m.length || !confirm('¿Borrar TODAS tus marcas de este esquema clave?')) return; data.m.forEach(function (m) { unwrap(m.n); }); data.m = []; save(); }

  /* ---------- barra ---------- */
  var fab = document.createElement('button'); fab.id = 'cm-fab'; fab.type = 'button'; fab.textContent = '🖍 Marcas'; fab.title = 'Activar o quitar las herramientas de marcas (subrayar el esquema clave)';
  ui = document.createElement('div'); ui.id = 'cm-ui';
  document.body.appendChild(fab); document.body.appendChild(ui);
  function build() {
    ui.innerHTML = '';
    var mk = function (html, title, fn, cls) { var b = document.createElement('button'); b.type = 'button'; b.className = cls; b.innerHTML = html; b.title = title; b.onclick = fn; ui.appendChild(b); return b; };
    TOOLS.forEach(function (t) { var b = mk(t[1], t[2], function () { st.tool = t[0]; document.body.classList.toggle('cm-er', t[0] === 'er'); build(); }, 'cm-b' + (st.tool === t[0] ? ' on' : '')); if (t[0] === 'ul') b.style.textDecoration = 'underline'; if (t[0] === 'st') b.style.textDecoration = 'line-through'; });
    mk('↶', 'Deshacer la última marca', undo, 'cm-b'); mk('🗑', 'Borrar todas las marcas', clearAll, 'cm-b');
    var sep = document.createElement('div'); sep.className = 'cm-sep'; ui.appendChild(sep);
    COLS.forEach(function (c) { var b = mk('', c[1], function () { st.color = c[0]; if (st.tool === 'er') { st.tool = 'hl'; document.body.classList.remove('cm-er'); } build(); }, 'cm-c' + (st.color === c[0] ? ' on' : '')); b.style.background = c[0]; });
  }
  fab.onclick = function () { st.on = !st.on; document.body.classList.toggle('cm-on', st.on); if (!st.on) document.body.classList.remove('cm-er'); else if (st.tool === 'er') document.body.classList.add('cm-er'); fab.classList.toggle('on', st.on); };
  build();

  /* ---------- eventos ---------- */
  var tactil = false, tm;
  document.addEventListener('touchstart', function () { tactil = true; }, { passive: true });
  document.addEventListener('mousedown', function () { tactil = false; }, true);
  document.addEventListener('mouseup', function (e) { if (!st.on || tactil || e.target.closest('#cm-ui,#cm-fab')) return; setTimeout(marcaSeleccion, 10); });
  document.addEventListener('selectionchange', function () { if (!st.on || !tactil) return; clearTimeout(tm); tm = setTimeout(marcaSeleccion, 900); });   // en el móvil: al soltar la selección
  document.addEventListener('click', function (e) {
    if (!st.on || st.tool !== 'er') return; var m = e.target.closest && e.target.closest('.cm-m'); if (!m) return;
    e.preventDefault(); e.stopPropagation(); borra(m.getAttribute('data-cm'));
  }, true);

  aplicaTodas();
})();
