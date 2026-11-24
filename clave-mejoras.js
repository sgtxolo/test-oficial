/* Mejoras comunes de los Esquemas clave NUEVOS (repaso-tN-esquema-clave-nuevo.html). Se carga con <script src="clave-mejoras.js" defer></script> al final de la página.
   1) 🖨 Imprimir solo el esquema (sin trampas, preguntas rápidas, test ni audio).
   2) 🎯 Botones «Preguntas de esta parte» en cada título (<h2>/<h3>) -> abre la app de conocimientos con esas preguntas (datos: clave-tests/tN-sec.js).
   3) Subrayado: junta marcas contiguas del mismo color y añade el AMARILLO = importante, pero menos que lo que ha caído en examen (datos: clave-tests/tN-amar.js).
   4) Citas «art. 13», «arts. 5-9»: al pulsarlas se despliega el artículo con su redacción y el subrayado del usuario, como en la app Esquemas (datos: clave-arts/tN.js y tN-f.js).
   5) 🎧 Modo coche NARRADO (~30 min): texto narrativo de todo el esquema (datos: clave-audio/tN.js) con voz del navegador.
   Datos 2-4: node prompts/herramientas/clave-mejoras-datos.js N */
(function () {
  'use strict';
  var NT = (location.pathname.match(/repaso-t(\d+)-/) || [])[1]; if (!NT) return;
  var emb = window.parent !== window, base = location.pathname.replace(/[^/]*$/, '');
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var bq = $('#btnQ');
  function enMain(el) { return !bq || !!(el.compareDocumentPosition(bq) & Node.DOCUMENT_POSITION_FOLLOWING); }
  function cargar(src) {
    return new Promise(function (ok, ko) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = function () { ko(new Error(src)); }; document.head.appendChild(s); });
  }
  function volver() { try { return emb ? (parent.location.pathname.split('/').pop() + '#t=' + NT + '&clave=1') : location.pathname.split('/').pop(); } catch (e) { return location.pathname.split('/').pop(); } }
  function irAlTest(ids) {
    var url = 'test-oficial-conocimiento.html#repasar=' + encodeURIComponent(ids.join(',')) + '&v=' + encodeURIComponent(volver());
    try { (emb ? parent : window).location.href = url; } catch (e) { window.location.href = url; }
  }

  /* ---------- CSS ---------- */
  var css = [
    /* amarillo y subrayado más limpio */
    'b.y{background:rgba(250,204,21,.50);color:#111;font-weight:600}',
    'span.of{color:#1a3fd1 !important;font-weight:800}',
    'b.n,b.o,b.v,b.p,b.y,.tm,.vb{-webkit-box-decoration-break:clone;box-decoration-break:clone;border-radius:.28em;padding:0 .14em}',
    'body,b,mark,.am,.tm,.vb{-webkit-print-color-adjust:exact;print-color-adjust:exact}',
    /* barra superior */
    '.cl-tools{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 6px}',
    '.cl-tools button{font-size:12.5px;font-weight:700;padding:5px 10px;border-radius:7px;border:1.5px solid #17324d;background:#eef3f8;color:#17324d;cursor:pointer}',
    '.cl-tools button.nar{background:#17324d;color:#fff}',
    /* botones de preguntas en los títulos */
    '.cl-qb{margin-left:8px;white-space:nowrap;font-weight:400}',
    '.cl-qb button{font-size:10.5px;font-weight:700;padding:1px 7px;margin-left:3px;border-radius:99px;border:1.5px solid #1d4ed8;background:#e8f0ff;color:#1d3fa8;cursor:pointer;vertical-align:1px}',
    'h2 .cl-qb button{background:#fff;border-color:#fff;color:#17324d}',
    /* citas desplegables */
    '.cl-ref{cursor:pointer;color:#1d4ed8;font-weight:700;border-bottom:1.5px dotted #1d4ed8}',
    '.cl-ref.on{background:#dbe8ff;border-radius:3px}',
    '.cl-artbox{border:2px solid #1d4ed8;background:#f7faff;border-radius:8px;padding:6px 9px;margin:5px 0 7px;font-size:12px;line-height:1.4;font-weight:400;color:#1d2420;list-style:none;display:block}',
    'li.cl-boxli{list-style:none;margin-left:-16px}',
    'tr.cl-boxtr>td{border:0;padding:3px 0}',
    '.cl-artbox .cl-top{display:flex;justify-content:space-between;align-items:center;font-size:10.5px;color:#1d3fa8;font-weight:700;margin-bottom:3px}',
    '.cl-artbox .cl-top button{font-size:11px;border:0;background:#1d4ed8;color:#fff;border-radius:99px;padding:1px 9px;cursor:pointer}',
    '.cl-artbox .cl-fi{margin:0 0 7px}.cl-artbox .cl-fi:last-child{margin-bottom:2px}',
    '.cl-artbox .cl-fh{font-weight:800;color:#17324d;border-bottom:1px solid #9bb4e6;margin-bottom:3px}',
    '.cl-artbox .cl-fn{font-size:10px;color:#666;font-weight:600}',
    '.cl-artbox p{margin:0 0 4px}',
    '.cl-artbox mark.m-destacable{background:#f7c9a8;color:#3a2213;padding:1px 3px;border-radius:3px}',
    '.cl-artbox mark.m-autoridad{background:#bfe3c4;color:#173a1e;padding:1px 3px;border-radius:3px}',
    '.cl-artbox mark.m-accion{background:#c9b7e0;color:#2c1c40;padding:1px 3px;border-radius:3px}',
    '.cl-artbox mark.m-personalizado{background:#f7e79a;color:#463a04;padding:1px 3px;border-radius:3px}',
    '.cl-artbox u.m-clave{text-decoration:underline;text-decoration-color:#d1332a;text-decoration-thickness:2px;text-underline-offset:2px}',
    '.cl-artbox mark.m-resp{background:none;color:#1d4ed8;font-weight:800;padding:0}',
    '.cl-artbox mark.m-resp.r-ia{color:#b3001b}',
    '.cl-artbox .ex-sello{display:inline-block;margin-left:6px;border:2px solid #c0392b;color:#c0392b;border-radius:50%;font-size:9px;font-weight:900;padding:2px 3px;line-height:1;vertical-align:middle}',
    '.cl-artbox .ex-plg{cursor:pointer}.cl-artbox .ex-plg::before{content:"(…)";color:#2f6b52;font-weight:800;padding:0 2px}',
    '.cl-artbox .ex-plg .ex-plg-t{display:none}.cl-artbox .ex-plg.on .ex-plg-t{display:inline}.cl-artbox .ex-plg.on::before{content:none}',
    /* títulos (letra blanca) que se ponen en amarillo al narrarlos o al llegar desde el test: letra NEGRA */
    'h1.cl-leyendo,h2.cl-leyendo,h3.cl-leyendo,h1.cl-flash,h2.cl-flash,h3.cl-flash,h2.cl-leyendo *,h3.cl-leyendo *,h2.cl-flash *,h3.cl-flash *{color:#111!important;-webkit-text-fill-color:#111!important}',
    /* títulos (letra blanca) con amarillo: el amarillo lleva letra NEGRA, si no no se lee */
    'h1 b.y,h2 b.y,h3 b.y,h1 .y,h2 .y,h3 .y,h2 mark,h3 mark{color:#111!important;-webkit-text-fill-color:#111!important}',
    /* preguntas y respuestas de cada apartado (se hacen y se narran cuando quieras) */
    '.cl-qa-b{margin-left:8px;white-space:nowrap;font-weight:400}',
    '.cl-qa-b button{font-size:10.5px;font-weight:700;padding:1px 7px;border-radius:99px;border:1.5px solid #7a2fd0;background:#f3e8ff;color:#5b1fa6;cursor:pointer;vertical-align:1px}',
    'h2 .cl-qa-b button{background:#fff;border-color:#fff;color:#4b1d8a}',
    '.cl-qabox{border:2px solid #7a2fd0;background:#faf5ff;border-radius:8px;padding:7px 10px;margin:6px 0 9px;font-size:13px;line-height:1.4;color:#1d1530;display:block;list-style:none}',
    '.cl-qabox .qa-top{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:5px;font-weight:700;font-size:11.5px;color:#5b1fa6}',
    '.cl-qabox .qa-top span{flex:1;min-width:120px}',
    '.cl-qabox button{font-size:11.5px;border:1.5px solid #7a2fd0;background:#fff;color:#5b1fa6;border-radius:99px;padding:1px 9px;cursor:pointer;font-weight:700}',
    '.cl-qabox .qa{display:flex;gap:6px;align-items:flex-start;padding:4px 0;border-top:1px dashed #d8c3f5}',
    '.cl-qabox .qa .qq{flex:1;cursor:pointer}',
    '.cl-qabox .qa .qr{display:none;margin-top:2px;color:#0b5d2a;font-weight:700}',
    '.cl-qabox .qa.ver .qr,.cl-qabox.todas .qa .qr{display:block}',
    '.cl-qabox .qa .qq::before{content:"❓ ";}',
    '.cl-qabox .qof{display:inline-block;font-size:9px;font-weight:900;border:1.5px solid #c0392b;color:#c0392b;border-radius:99px;padding:0 4px;margin-right:4px;vertical-align:1px}',
    '.cl-qabox .qa.leyendo-qa{background:#fff3b0}',
    '.cl-leyendo{outline:3px solid #f5b400;background:#fff3b0!important;border-radius:4px;scroll-margin-top:90px}',
    '.cl-flash{outline:3px solid #f5b400;background:#fff3b0!important;color:#17324d!important}',
    /* panel narrado */
    '#cl-nar{position:fixed;left:0;right:0;bottom:0;background:#0f2438;color:#fff;padding:8px 10px;z-index:30;box-shadow:0 -3px 12px rgba(0,0,0,.35);font-size:13px}',
    '#cl-nar .t{display:flex;gap:8px;align-items:center;flex-wrap:wrap}',
    '#cl-nar .t b{flex:1;min-width:150px}',
    '#cl-nar button,#cl-nar select{font-size:15px;padding:5px 10px;border-radius:7px;border:0;cursor:pointer}',
    '#cl-nar .tx{margin:6px 0 4px;max-height:76px;overflow:auto;font-size:13.5px;line-height:1.35;opacity:.95}',
    '#cl-nar .bar{height:6px;background:#2d4a66;border-radius:3px;cursor:pointer;margin-top:4px}',
    '#cl-nar .bar i{display:block;height:100%;background:#f5b400;border-radius:3px;width:0}',
    '#cl-nar .est{font-size:11.5px;opacity:.8}',
    'body.cl-narando{padding-bottom:240px!important}',
    '@media screen and (max-width:760px){body.cl-narando{padding-bottom:84px!important}body.cl-narando #aud{display:none!important}#cl-nar{padding:4px 6px}#cl-nar .t{gap:4px;flex-wrap:nowrap}#cl-nar .t b,#cl-nar .tx,#cl-nar .est,#cl-nar #cl-sel{display:none}#cl-nar .sec{flex:1;font-size:11px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#cl-nar .bar{margin-top:3px;height:4px}#cl-nar button,#cl-nar select{font-size:14px;padding:2px 7px}#cl-nar .t[style]{margin-top:3px!important}}',
    /* móvil: letra más grande (solo en pantalla; la impresión no cambia) */
    '@media screen and (max-width:760px) and (orientation:portrait){table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}td,th{min-width:150px}body{font-size:16.5px;line-height:1.5;padding:8px 12px 70px}h1{font-size:21px}.sub{font-size:13px}h2{font-size:17px;padding:5px 9px}h3{font-size:16px}li{margin:3px 0}table{font-size:15px}th,td{padding:4px 6px}.leyenda{font-size:13px}.art{font-size:12.5px}.ex{font-size:11px}.cl-artbox{font-size:15px}.cl-qb button{font-size:12px;padding:3px 9px}.cl-tools button{font-size:14px;padding:8px 12px}.rq-wrap{font-size:15px}.rq-cols{column-count:1}.tr{font-size:15px}#btnQ,#btnT{font-size:16px;padding:10px}.cq-quiz{font-size:15px}}',
    /* impresión: solo el esquema */
    '@media print{.cl-qa-b,.cl-qabox,.cl-tools,.cl-qb,.cl-artbox,#cl-nar,#aud,#btnQ,#rqbox,#btnT,#trampas,.cq-quiz,.cq-ini,.cq-bar,.cl-fuera{display:none!important}.cl-ref{color:inherit;border:0}body{padding:0!important}}'
  ].join('\n');
  var st = document.createElement('style'); st.id = 'cl-mejoras-css'; document.head.appendChild(st);
  function aplicaCss() { var vert = window.parent !== window ? screen.height >= screen.width : innerHeight >= innerWidth; try { if (window.parent !== window) vert = window.parent.innerHeight >= window.parent.innerWidth; } catch (e) {} /* en file:// el navegador no deja leer la ventana padre: se usa la propia */ st.textContent = 'html{-webkit-text-size-adjust:100%;text-size-adjust:100%}' + css.replace(' and (orientation:portrait)', vert ? '' : ' and (min-width:99999px)'); }
  aplicaCss(); window.addEventListener('resize', aplicaCss); try { if (window.parent !== window) window.parent.addEventListener('resize', aplicaCss); } catch (e) {}

  /* ---------- 1) barra con imprimir y narrado ---------- */
  var PARTES = ({ 1: 3, 2: 2, 3: 3, 4: 2, 5: 3, 6: 2, 7: 1, 8: 2, 9: 1, 10: 2, 11: 2, 12: 1, 13: 2, 14: 2, 15: 2, 16: 2, 17: 3, 18: 2, 27: 1 })[NT] || 1, KEY = NT, tools = document.createElement('div'); tools.className = 'cl-tools cl-noprint';
  tools.innerHTML = '<button id="cl-print" title="Imprime solo el esquema: sin trampas, preguntas rápidas, test ni audio">🖨 Imprimir solo el esquema</button>'
    + (PARTES > 1 ? [1, 2, 3].slice(0, PARTES).map(function (p) { return '<button class="nar cl-nbtn" data-p="' + p + '" title="Esquema explicado en forma de narración, para escuchar en el coche">🎧 Narrado parte ' + p + ' de ' + PARTES + ' (≈30 min)</button>'; }).join('') : '<button class="nar cl-nbtn" data-p="1" title="Todo el esquema explicado en forma de narración, para escuchar en el coche">🎧 Modo coche narrado (≈30 min)</button>');
  var ley = $('.leyenda'), h1 = $('h1');
  (ley ? ley : (h1 || document.body.firstChild)).insertAdjacentElement(ley ? 'afterend' : 'afterend', tools);
  $('#cl-print').onclick = function () {
    if (bq) for (var n = bq; n; n = n.nextElementSibling) n.classList.add('cl-fuera');
    window.print();
  };
  window.addEventListener('beforeprint', function () { if (bq) for (var n = bq; n; n = n.nextElementSibling) n.classList.add('cl-fuera'); });

  /* leyenda: amarillo */
  if (ley && !/amarillo/.test(ley.textContent)) ley.insertAdjacentHTML('beforeend', ' · <b class="y">amarillo</b> importante, pero menos que lo que ha caído en examen (sale en preguntas de práctica)');

  /* ---------- 3) subrayado: unir contiguos + amarillo ---------- */
  function unir() {
    $$('b.n,b.o,b.v,b.p,b.y').forEach(function (b) {
      if (!b.parentNode) return;
      for (;;) {
        var n = b.nextSibling, hueco = '';
        if (n && n.nodeType === 3 && /^[\s]+$/.test(n.data)) { hueco = n.data; n = n.nextSibling; }
        if (n && n.nodeType === 1 && n.tagName === 'B' && n.className === b.className && !n.querySelector('*') && !b.querySelector('*')) {
          if (hueco) b.appendChild(document.createTextNode(hueco));
          b.appendChild(document.createTextNode(n.textContent));
          if (b.nextSibling !== n) b.parentNode.removeChild(b.nextSibling);
          n.parentNode.removeChild(n);
        } else break;
      }
    });
  }
  var normW = function (t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  function amarillo(lista) {
    var set = {}; lista.forEach(function (k) { set[k] = 1; });
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      var p = n.parentNode; if (!p || !n.data.trim()) return NodeFilter.FILTER_REJECT;
      if (p.closest('script,style,button,h1,h2,h3,b,mark,u,.am,.vb,.tm,.art,.ex,.as,.leyenda,.cl-tools,.cl-qb,.cl-artbox,#rqbox,#trampas,#aud,#cl-nar,.cq-quiz,.sub,th')) return NodeFilter.FILTER_REJECT;
      return enMain(p) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    } });
    var nodos = [], n; while ((n = w.nextNode())) nodos.push(n);
    nodos.forEach(function (nodo) {
      var s = nodo.data, re = /[A-Za-zÀ-ÿ0-9]+/g, t = [], m;
      while ((m = re.exec(s))) t.push({ a: m.index, b: m.index + m[0].length, k: normW(m[0]) });
      var rangos = [];
      for (var i = 0; i + 2 < t.length; i++) if (set[t[i].k + ' ' + t[i + 1].k + ' ' + t[i + 2].k]) { var r = rangos[rangos.length - 1]; if (r && t[i].a <= r[1] + 3) r[1] = t[i + 2].b; else rangos.push([t[i].a, t[i + 2].b]); }
      if (!rangos.length) return;
      var f = document.createDocumentFragment(), ult = 0;
      rangos.forEach(function (r) { f.appendChild(document.createTextNode(s.slice(ult, r[0]))); var b = document.createElement('b'); b.className = 'y'; b.textContent = s.slice(r[0], r[1]); f.appendChild(b); ult = r[1]; });
      f.appendChild(document.createTextNode(s.slice(ult))); nodo.parentNode.replaceChild(f, nodo);
    });
  }

  /* LETRA AZUL = respuesta de pregunta OFICIAL (datos: clave-tests/tN-of.js, tríos de palabras). Se pinta también dentro de las marcas de color y manda sobre el rojo. */
  function azul(lista) {
    var set = {}; lista.forEach(function (k) { set[k] = 1; });
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      var p = n.parentNode; if (!p || !n.data.trim()) return NodeFilter.FILTER_REJECT;
      if (p.closest('script,style,button,h1,h2,h3,.art,.ex,.as,.leyenda,.cl-tools,.cl-qb,.cl-artbox,#rqbox,#trampas,#aud,#cl-nar,.cq-quiz,.sub,th,span.of')) return NodeFilter.FILTER_REJECT;
      return enMain(p) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    } });
    var nodos = [], n; while ((n = w.nextNode())) nodos.push(n);
    nodos.forEach(function (nodo) {
      var s = nodo.data, re = /[A-Za-zÀ-ÿ0-9]+/g, t = [], m;
      while ((m = re.exec(s))) t.push({ a: m.index, b: m.index + m[0].length, k: normW(m[0]) });
      var rangos = [];
      for (var i = 0; i + 2 < t.length; i++) if (set[t[i].k + ' ' + t[i + 1].k + ' ' + t[i + 2].k]) { var r = rangos[rangos.length - 1]; if (r && t[i].a <= r[1] + 3) r[1] = t[i + 2].b; else rangos.push([t[i].a, t[i + 2].b]); }
      if (!rangos.length) return;
      var f = document.createDocumentFragment(), ult = 0;
      rangos.forEach(function (r) { f.appendChild(document.createTextNode(s.slice(ult, r[0]))); var b = document.createElement('span'); b.className = 'of'; b.textContent = s.slice(r[0], r[1]); f.appendChild(b); ult = r[1]; });
      f.appendChild(document.createTextNode(s.slice(ult))); nodo.parentNode.replaceChild(f, nodo);
    });
  }

  /* ---------- 2) botones de preguntas por parte ---------- */
  function botonesPreguntas() {
    var S = (window.CLAVE_SEC || {})[NT]; if (!S) return;
    var hs = $$('h2,h3').filter(enMain);
    hs.forEach(function (h, i) {
      var ids = S[i] || []; if (!ids.length || $('.cl-qb', h)) return;
      var of = ids.filter(function (x) { return !/-ia-/.test(x); }), sp = document.createElement('span'); sp.className = 'cl-qb cl-noprint';
      var html = '';
      if (of.length) html += '<button data-m="of" title="Practicar en la app de conocimientos las preguntas OFICIALES de esta parte (' + of.length + ')">🎯 Oficiales ' + of.length + '</button>';
      html += '<button data-m="to" title="Practicar en la app de conocimientos todas las preguntas de esta parte (primero las oficiales)">🎯 Todas ' + ids.length + '</button>';
      sp.innerHTML = html;
      sp.onclick = function (e) {
        var b = e.target.closest('button'); if (!b) return; e.stopPropagation();
        irAlTest(b.dataset.m === 'of' ? of.slice(0, 80) : ids.slice(0, 60));
      };
      h.appendChild(sp);
    });
  }

  /* ---------- 4) citas de artículos desplegables ---------- */
  var NUM = '\\d+(?:\\.\\d+)?(?:\\s?(?:bis|ter|quater))?', CONN = '(?:\\s*,\\s*|\\s*[-–]\\s*|\\s+y\\s+|\\s+a\\s+)';
  function expand(s) {
    var out = [];
    s = s.replace(/\.\d+/g, '').replace(/\sy\s/g, ',').replace(/\sa\s/g, '-').replace(/[–—]/g, '-');
    s.split(',').forEach(function (part) {
      part = part.trim();
      var r = part.match(/^(\d+)\s*(bis|ter|quater)?\s*-\s*(\d+)/i);
      if (r) { var a = +r[1], b = +r[3]; if (r[2]) out.push(a + r[2].toLowerCase()); for (var k = a + (r[2] ? 1 : 0); k <= Math.min(b, a + 80); k++) out.push(String(k)); }
      else { var m = part.match(/^(\d+)\s*(bis|ter|quater)?/i); if (m) out.push(m[1] + (m[2] ? m[2].toLowerCase() : '')); }
    });
    return out;
  }
  var IDX = null, h2s = [];
  function gruposDe(gi) { return gi >= 0 ? [gi] : IDX.g.map(function (_, i) { return i; }); }
  function hayArt(gs, k) { return gs.some(function (g) { return IDX.g[g] && IDX.g[g].a[k]; }); }
  function citas() {
    IDX = (window.CLAVE_ART || {})[NT]; if (!IDX) return;
    h2s = $$('h2').filter(enMain);
    var REF = new RegExp('\\b([Aa]rts?\\.\\s*)(' + NUM + '(?:' + CONN + '(?=\\d)' + NUM + ')*)', 'g');
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      var p = n.parentNode; if (!p) return NodeFilter.FILTER_REJECT;
      if (p.closest('script,style,button,.cl-artbox,.cl-qb,.cl-tools,#rqbox,#trampas,#aud,#cl-nar,.cq-quiz,.cl-ref')) return NodeFilter.FILTER_REJECT;
      return enMain(p) && /[Aa]rts?\./.test(n.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    } });
    var nodos = [], n; while ((n = w.nextNode())) nodos.push(n);
    nodos.forEach(function (nodo) {
      var sec = -1; for (var i = 0; i < h2s.length; i++) { if (h2s[i].compareDocumentPosition(nodo) & Node.DOCUMENT_POSITION_FOLLOWING) sec = i; else break; }
      var gs = gruposDe(sec >= 0 ? IDX.h2g[sec] : -1), s = nodo.data, m, ult = 0, f = document.createDocumentFragment(), hubo = false;
      REF.lastIndex = 0;
      while ((m = REF.exec(s))) {
        var ks = expand(m[2]).filter(function (k) { return hayArt(gs, k); });
        if (!ks.length) continue;
        f.appendChild(document.createTextNode(s.slice(ult, m.index)));
        var sp = document.createElement('span'); sp.className = 'cl-ref'; sp.dataset.k = ks.join(','); sp.dataset.g = gs.join(','); sp.textContent = m[0];
        sp.title = 'Pulsa para ver ' + (ks.length > 1 ? 'estos artículos' : 'el artículo') + ' con su redacción y subrayado';
        f.appendChild(sp); ult = m.index + m[0].length; hubo = true;
      }
      if (!hubo) return;
      f.appendChild(document.createTextNode(s.slice(ult))); nodo.parentNode.replaceChild(f, nodo);
    });
  }
  function pintar(ref) {
    var ks = ref.dataset.k.split(','), gs = ref.dataset.g.split(',').map(Number), F = (window.CLAVE_ARTF || {})[NT] || [], vistos = {}, html = '', n = 0;
    ks.forEach(function (k) {
      gs.forEach(function (g) {
        ((IDX.g[g] && IDX.g[g].a[k]) || []).forEach(function (fi) {
          if (vistos[fi] || !F[fi] || n >= 10) return; vistos[fi] = 1; n++;
          var nota = gs.length > 1 && IDX.g[g].t ? '<div class="cl-fn">' + IDX.g[g].t.replace(/</g, '&lt;') + '</div>' : '';
          html += '<div class="cl-fi">' + nota + '<div class="cl-fh">' + F[fi][0] + '</div><div class="cl-fb">' + F[fi][1] + '</div></div>';
        });
      });
    });
    return html || '<i>Este artículo no está desarrollado en el Exprés.</i>';
  }
  function abrirRef(ref) {
    var ya = ref._box; if (ya && ya.parentNode) { ya.parentNode.removeChild(ya); ref._box = null; ref.classList.remove('on'); return null; }
    var cont = ref.closest('li,tr,h3,h2,p,div') || ref.parentNode, box = document.createElement('div'); box.className = 'cl-artbox';
    var cab = '<div class="cl-top"><span>📖 ' + ref.textContent.replace(/</g, '&lt;') + ' · texto del Exprés con tu subrayado (doble clic en azul = sus preguntas)</span><button type="button">✕ cerrar</button></div>';
    box.innerHTML = cab + '<div class="cl-cuerpo">Cargando…</div>';
    var nodo = box, tag = cont.tagName;
    if (tag === 'LI') { nodo = document.createElement('li'); nodo.className = 'cl-boxli'; nodo.appendChild(box); cont.parentNode.insertBefore(nodo, cont.nextSibling); }
    else if (tag === 'TR') { nodo = document.createElement('tr'); nodo.className = 'cl-boxtr'; var td = document.createElement('td'); td.colSpan = 20; td.appendChild(box); nodo.appendChild(td); cont.parentNode.insertBefore(nodo, cont.nextSibling); }
    else if (tag === 'H3' || tag === 'H2') cont.parentNode.insertBefore(box, cont.nextSibling);
    else cont.parentNode.insertBefore(box, cont.nextSibling);
    ref._box = nodo; ref.classList.add('on');
    box.querySelector('.cl-top button').onclick = function () { if (nodo.parentNode) nodo.parentNode.removeChild(nodo); ref._box = null; ref.classList.remove('on'); };
    var listo = function () { var c = box.querySelector('.cl-cuerpo'); if (c) c.innerHTML = pintar(ref); };
    if ((window.CLAVE_ARTF || {})[NT]) listo(); else cargar(base + 'clave-arts/t' + NT + '-f.js').then(listo).catch(function () { var c = box.querySelector('.cl-cuerpo'); if (c) c.textContent = 'No se han podido cargar los artículos (¿sin conexión?).'; });
    return nodo;
  }
  document.addEventListener('click', function (e) {
    var r = e.target.closest && e.target.closest('.cl-ref'); if (r) { e.preventDefault(); abrirRef(r); return; }
    var pl = e.target.closest && e.target.closest('.cl-artbox .ex-plg'); if (pl && e.target === pl) pl.classList.toggle('on');
  });
  document.addEventListener('dblclick', function (e) {
    var m = e.target.closest && e.target.closest('.cl-artbox mark.m-resp[data-q]'); if (!m) return;
    var ids = m.dataset.q.split(',').filter(Boolean); if (ids.length) irAlTest(ids.slice(0, 60));
  });

  /* ---------- 5b) el esquema sigue a la voz: va al artículo que se está narrando, lo resalta y abre su texto ---------- */
  var NU = { cero: 0, un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, dieciseis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19, veinte: 20, veintiun: 21, veintiuno: 21, veintiuna: 21, veintidos: 22, veintitres: 23, veinticuatro: 24, veinticinco: 25, veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29 },
    TE = { treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90 },
    HU = { cien: 100, ciento: 100, doscientos: 200, trescientos: 300, cuatrocientos: 400, quinientos: 500, seiscientos: 600, setecientos: 700, ochocientos: 800, novecientos: 900 };
  function sinAc(t) { return t.toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ü/g, 'u'); }
  function numAt(tk, i) {
    var v = 0, ok = false, w;
    for (; i < tk.length; i++) {
      w = tk[i];
      if (/^\d+$/.test(w) && !ok) { v = +w; ok = true; i++; break; }
      if (HU[w] !== undefined) { v += HU[w]; ok = true; continue; }
      if (TE[w] !== undefined) { v += TE[w]; ok = true; i++; if (tk[i] === 'y' && NU[tk[i + 1]] > 0 && NU[tk[i + 1]] < 10) { v += NU[tk[i + 1]]; i += 2; } break; }
      if (NU[w] !== undefined) { v += NU[w]; ok = true; i++; break; }
      break;
    }
    if (!ok) return null;
    var suf = ''; if (/^(bis|ter|quater)$/.test(tk[i] || '')) { suf = tk[i]; i++; }
    return { v: v, s: suf, i: i };
  }
  /* artículos que se nombran en un texto narrado: «artículo treinta y cinco», «artículos cuatro y cinco», «artículos 5 a 9»… (devuelve claves como «35», «26ter») */
  /* todos los grupos «artículo …» de un texto (cada grupo = lista de claves) con la palabra que sigue al grupo (para descartar «artículo 24 de la Constitución») */
  function grupos(texto) {
    var tk = sinAc(texto).match(/[a-zñ]+|\d+|[,.;:]/g) || [], res = [];
    for (var i = 0; i < tk.length; i++) {
      if (!/^(articulos?|arts?)$/.test(tk[i])) continue;
      var j = i + 1, out = []; if (tk[j] === '.') j++;
      for (;;) {
        var r = numAt(tk, j); if (!r) break;
        out.push(r.v + r.s); j = r.i;
        if ((tk[j] === 'a' || tk[j] === 'al') && !r.s) { var r2 = numAt(tk, j + 1); if (r2 && !r2.s && r2.v > r.v && r2.v - r.v <= 40) { for (var k = r.v + 1; k <= r2.v; k++) out.push(String(k)); j = r2.i; } }
        /* «artículo 8, apartado 2»: la coma que sigue a un número y precede a «apartado» no continúa la lista */
        var w1 = tk[j + 1] || ''; if ((tk[j] === ',' || tk[j] === 'y' || tk[j] === 'e') && (/^\d/.test(w1) || NU[w1] !== undefined || TE[w1] !== undefined || HU[w1] !== undefined)) j++; else break;
      }
      if (out.length) { res.push({ k: out, sig: tk.slice(j, j + 8).join(' ') }); i = Math.max(i, j - 1); }
    }
    return res;
  }
  function numeros(texto) { var g = grupos(texto); return g.length ? g[0].k : []; }
  var sec0 = -2, h2i = -1, autoNodo = null, autoKey = '', leyendo = null, refsCache = null;
  function secDe(el) { var sec = -1; for (var i = 0; i < h2s.length; i++) { if (h2s[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) sec = i; else break; } return sec; }
  function refsDe(h) {
    if (!refsCache) refsCache = $$('.cl-ref').filter(enMain).map(function (r) { return { r: r, h: secDe(r), ks: (r.dataset.k || '').split(',') }; });
    return refsCache.filter(function (x) { return x.h === h; });
  }
  function h3De(el) { var h = null; $$('h3').filter(enMain).forEach(function (t) { if (t.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) h = t; }); return h; }
  function limpiaSync() {
    try { if (autoNodo && autoNodo.parentNode) autoNodo.parentNode.removeChild(autoNodo); } catch (e) {}
    autoNodo = null; autoKey = '';
    if (leyendo) { leyendo.classList.remove('cl-leyendo'); leyendo = null; }
  }
  function marca(el) {
    if (!el) return; if (leyendo && leyendo !== el) leyendo.classList.remove('cl-leyendo');
    el.classList.add('cl-leyendo'); leyendo = el;
    if (emb && !propio) { try { parent.postMessage({ claveScroll: el.getBoundingClientRect().top + (window.pageYOffset || 0) }, '*'); } catch (e) {} return; }
    try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { el.scrollIntoView(); }
  }
  var propio = false; /* true = la página que me incrusta no es la app (p. ej. la muestra de narrado): el scroll lo hago yo */
  window.addEventListener('message', function (e) { /* {claveIrA:{h2:0, arts:[2], titulo:'texto de un título'}} → resalta y lleva a ese artículo (o título) */
    var d = e.data; if (!d || !d.claveIrA) return; propio = true;
    try {
      var a = d.claveIrA, el = null; h2i = a.h2 || 0; refsCache = null; libre = true;
      if (a.arts && a.arts.length) { var an = buscaAncla(a.arts.map(String), false); if (an) el = an.closest('li,tr,h3,h2,p,div') || an; }
      if (!el && a.titulo) el = $$('h2,h3').filter(enMain).filter(function (h) { return h.textContent.indexOf(a.titulo) >= 0; })[0] || null;
      if (el) marca(el);
    } catch (er) {}
  });
  var libre = false; /* true = el usuario ha saltado él mismo (⏮ ⏪ ⏩ ⏭, selector o barra): se permite ir hacia atrás */
  function despues(el, ref) { return !ref || !!(ref.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING); }
  function buscaAncla(nums, adelante) {
    var lista = h2i >= 0 ? refsDe(h2i) : []; if (!lista.length) return null;
    for (var n = 0; n < nums.length; n++) {
      var c = lista.filter(function (x) { return x.ks.indexOf(nums[n]) >= 0 && (!adelante || despues(x.r, leyendo)); });
      var det = c.filter(function (x) { return !x.r.closest('h2,h3'); })[0] || c[0];
      if (det) return det.r;
    }
    return null;
  }
  function sincroniza(texto, it) {
    if (!IDX || !it || !h2s.length) return;
    if (it.s !== sec0) { /* cambio de sección: ir al apartado (por el número «2.3» del título o por el primer artículo que cite) */
      sec0 = it.s; limpiaSync();
      var m = N.secciones[it.s].t.match(/^(\d+\.\d+)/);
      if (m) for (var i = 0; i < h2s.length; i++) if (h2s[i].textContent.replace(/\s+/g, ' ').trim().indexOf(m[1]) === 0) { h2i = i; break; }
      var ns = numeros((N.secciones[it.s].p || []).join(' ')), primero = ns.length ? buscaAncla(ns) : null;
      var objetivo = (primero && (primero.closest('h3') || h3De(primero))) || h2s[h2i] || null;
      /* el narrador solo avanza: si lo que va a marcar queda ANTES de donde ya está, se queda donde está y sigue desde ahí */
      if (objetivo && (libre || !leyendo || despues(objetivo, leyendo))) marca(objetivo);
    }
    var adel = !libre; libre = false;
    var nums = numeros(texto); if (!nums.length) return;
    var an = buscaAncla(nums, adel); if (!an) return;
    var key = nums.join(',') + '@' + secDe(an) + ':' + an.textContent; if (key === autoKey) return;
    autoKey = key; /* solo se resalta y se lleva a la línea; el desplegable lo abre el usuario */
    marca(an.closest('li,tr,h3,h2,p,div') || an);
  }

  /* ---------- 2b) preguntas y respuestas rápidas por apartado: se hacen (toca la pregunta y ves la respuesta) y se narran cuando quieras (🔊) ----------
     Salen del bloque «preguntas y respuestas rápidas» del final de la página, repartidas en el apartado (título) al que pertenece cada artículo. */
  var QAR = null, qgen = 0;
  function leeQA() {
    var rq = $('#rqbox'); if (!rq) return null;
    var runs = [], prev = -1, cur = null;
    $$('.rq-art', rq).forEach(function (a) {
      var t = ($('.rq-a', a) || {}).textContent || '', m = t.match(/Art[íi]culo\s+(\d+)\s*(bis|ter|quater)?/i); if (!m) return;
      var n = +m[1]; if (!cur || n < prev) { cur = { a: {} }; runs.push(cur); } prev = n;
      var k = m[1] + (m[2] ? m[2].toLowerCase() : '');
      var l = $$('li', a).map(function (li) {
        var q = $('.rq-q', li), r = $('.rq-r', li); if (!q || !r) return null;
        var of = !!$('.rq-of', q), qc = q.cloneNode(true); $$('.rq-of', qc).forEach(function (x) { x.remove(); });
        return { q: qc.textContent.replace(/\s+/g, ' ').trim(), r: r.textContent.replace(/\s+/g, ' ').trim(), of: of, k: k };
      }).filter(Boolean);
      (cur.a[k] = cur.a[k] || []).push.apply(cur.a[k], l);
    });
    return runs;
  }
  function qaDe(h) {
    var sp = $('.art', h), claves = [];
    if (sp) claves = expand(sp.textContent.replace(/^\s*arts?\.\s*/i, ''));
    if (!claves.length) $$('.cl-ref', h).forEach(function (r) { claves = claves.concat((r.dataset.k || '').split(',')); });
    if (!claves.length) return [];
    var sec = h.tagName === 'H2' ? h2s.indexOf(h) : secDe(h), gi = (IDX && IDX.h2g && sec >= 0) ? IDX.h2g[sec] : -1, rs = [];
    if (QAR.length === (IDX ? IDX.g.length : -1) && gi >= 0) rs = [QAR[gi]]; else rs = QAR;
    var out = [], vistos = {};
    rs.forEach(function (run) { if (!run) return; claves.forEach(function (k) { (run.a[k] || []).forEach(function (x) { var id = x.q + '|' + x.r; if (!vistos[id]) { vistos[id] = 1; out.push(x); } }); }); });
    return out;
  }
  function irAEl(el) {
    if (emb) { try { parent.postMessage({ claveScroll: el.getBoundingClientRect().top + (window.pageYOffset || 0) }, '*'); } catch (e) {} return; }
    try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { el.scrollIntoView(); }
  }
  function pararQA() { qgen++; try { speechSynthesis.cancel(); } catch (e) {} $$('.leyendo-qa').forEach(function (x) { x.classList.remove('leyendo-qa'); }); }
  function decir(txt, fin, mi) {
    var ps = troceo(txt), i = 0;
    (function sig() {
      if (mi !== qgen) return; if (i >= ps.length) { fin(); return; }
      var u = new SpeechSynthesisUtterance(ps[i++]); u.lang = 'es-ES'; u.rate = rate; var v = vozEs(); if (v) u.voice = v;
      u.onend = function () { if (mi === qgen) sig(); }; u.onerror = function (e) { if (mi === qgen && e.error !== 'canceled' && e.error !== 'interrupted') sig(); };
      speechSynthesis.speak(u);
    })();
  }
  function leerQA(divs) {
    if (!('speechSynthesis' in window)) { alert('Este navegador no tiene voz (speechSynthesis).'); return; }
    if (jugando) { jugando = false; try { pinta(); } catch (e) {} } parar(); try { var bn = $('#bn'); if (bn) bn.click(); } catch (e) {}
    var mi = ++qgen, i = 0;
    (function sig() {
      if (mi !== qgen) return; $$('.leyendo-qa').forEach(function (x) { x.classList.remove('leyendo-qa'); });
      if (i >= divs.length) return;
      var d = divs[i++]; d.classList.add('leyendo-qa'); d.classList.add('ver'); irAEl(d);
      decir('Pregunta. ' + d.dataset.q + ' Respuesta. ' + d.dataset.r, function () { setTimeout(sig, 500); }, mi);
    })();
  }
  function abrirQA(h) {
    var ya = h._qabox; if (ya && ya.parentNode) { pararQA(); ya.parentNode.removeChild(ya); h._qabox = null; return null; }
    var l = h._qa || []; if (!l.length) return null;
    var box = document.createElement('div'); box.className = 'cl-qabox cl-noprint';
    box.innerHTML = '<div class="qa-top"><span>❓ Preguntas y respuestas de esta parte (' + l.length + ') · toca una pregunta para ver su respuesta</span><button data-a="todas">👁 Ver respuestas</button><button data-a="nar">🔊 Narrar todas</button><button data-a="stop">⏹</button><button data-a="x">✕</button></div>'
      + l.map(function (x) { return '<div class="qa" data-q="' + x.q.replace(/"/g, '&quot;') + '" data-r="' + x.r.replace(/"/g, '&quot;') + '"><div class="qq">' + (x.of ? '<span class="qof">OF</span>' : '') + x.q.replace(/</g, '&lt;') + '<div class="qr">→ ' + x.r.replace(/</g, '&lt;') + '</div></div><button data-a="n" title="Narrar esta pregunta y su respuesta">🔊</button></div>'; }).join('');
    h.parentNode.insertBefore(box, h.nextSibling); h._qabox = box;
    box.onclick = function (e) {
      var b = e.target.closest('button'), qa = e.target.closest('.qa');
      if (b) {
        var a = b.dataset.a;
        if (a === 'x') { pararQA(); box.parentNode.removeChild(box); h._qabox = null; }
        else if (a === 'todas') { var on = box.classList.toggle('todas'); b.textContent = on ? '🙈 Ocultar respuestas' : '👁 Ver respuestas'; }
        else if (a === 'nar') leerQA($$('.qa', box));
        else if (a === 'stop') pararQA();
        else if (a === 'n' && qa) leerQA([qa]);
        return;
      }
      if (qa && e.target.closest('.qq')) qa.classList.toggle('ver');
    };
    return box;
  }
  function preguntasPartes() {
    QAR = leeQA(); if (!QAR || !QAR.length || !IDX) return;
    $$('h2,h3').filter(enMain).forEach(function (h) {
      var l = qaDe(h); if (!l.length || $('.cl-qa-b', h)) return; h._qa = l;
      var sp = document.createElement('span'); sp.className = 'cl-qa-b cl-noprint'; sp.innerHTML = '<button title="Haz las preguntas rápidas de esta parte (y escúchalas si quieres)">❓ P&amp;R ' + l.length + '</button>';
      sp.onclick = function (e) { e.stopPropagation(); abrirQA(h); };
      h.appendChild(sp);
    });
  }
  /* botón ❓ del narrador: abre y narra las preguntas del apartado que se está narrando */
  function narrarQADeLaParteActual() {
    var el = leyendo, h = null;
    if (el) h = /^H[23]$/.test(el.tagName) ? el : (h3De(el) || h2s[secDe(el)] || null);
    if (!h && h2i >= 0) h = h2s[h2i];
    var cand = []; if (h) { cand.push(h); if (h.tagName === 'H3') { var s = secDe(h); if (s >= 0) cand.push(h2s[s]); } }
    var ok = cand.filter(function (x) { return x && x._qa && x._qa.length; })[0];
    if (!ok) { alert('Para esta parte no hay preguntas rápidas.'); return; }
    var box = ok._qabox && ok._qabox.parentNode ? ok._qabox : abrirQA(ok); if (!box) return;
    irAEl(box); leerQA($$('.qa', box));
  }

  /* ---------- 5c) resumen de los artículos que se citan de pasada ----------
     En un párrafo cuyo artículo principal es el primero que nombra, si además cita otro (p. ej. «… en relación con el artículo 5, apartado 3»),
     el narrador, al acabar el párrafo, cuenta en pocas palabras qué dice ese otro artículo (primeras frases de su texto en el Exprés). Máx. 2 por párrafo. */
  var RESUMEN_OFF = /^(de la (constitucion|ley|directiva|decision)|del (codigo|tratado|reglamento|convenio|real|acuerdo|protocolo)|ce\b|lo\b|lopj|cp\b)/;
  function textoPlano(html) {
    var d = document.createElement('div'); d.innerHTML = html;
    $$('.ex-sello,.ex-q,script,style,.m-nota,.ex-r,.ex-ast', d).forEach(function (x) { x.remove(); });
    return (d.textContent || '').replace(/\(…\)/g, '').replace(/\s+/g, ' ').trim();
  }
  function corta(t, max) {
    t = t.replace(/^\d+\.\s*/, ''); if (t.length <= max) return t;
    var c = t.slice(0, max), k = Math.max(c.lastIndexOf('. '), c.lastIndexOf('; '), c.lastIndexOf(': '));
    if (k > max * 0.45) return c.slice(0, k + 1);
    k = c.lastIndexOf(' '); return c.slice(0, k > 0 ? k : max) + '…';
  }
  function resumenes(it) {
    var F = (window.CLAVE_ARTF || {})[NT]; if (!IDX || !F || !it || it.tit) return [];
    var gs = grupos(it.t); if (gs.length < 2) return [];
    var princ = {}; gs[0].k.forEach(function (k) { princ[k] = 1; });
    var h = -1; var m = N && N.secciones[it.s] && N.secciones[it.s].t.match(/^(\d+\.\d+)/);
    if (m) for (var i = 0; i < h2s.length; i++) if (h2s[i].textContent.replace(/\s+/g, ' ').trim().indexOf(m[1]) === 0) { h = i; break; }
    var grp = gruposDe(h >= 0 ? IDX.h2g[h] : -1), out = [], vistos = {};
    for (var g = 1; g < gs.length && out.length < 2; g++) {
      if (RESUMEN_OFF.test(gs[g].sig)) continue;
      for (var q = 0; q < gs[g].k.length && out.length < 2; q++) {
        var k = gs[g].k[q]; if (princ[k] || vistos[k]) continue;
        var fi = null; grp.forEach(function (gg) { if (fi === null && IDX.g[gg] && IDX.g[gg].a[k]) fi = IDX.g[gg].a[k][0]; }); if (fi === null || !F[fi]) continue;
        vistos[k] = 1;
        var cab = textoPlano(F[fi][0]).replace(/\s*[—–-]\s*/, ', '), cuerpo = corta(textoPlano(F[fi][1]), 230); if (cuerpo.length < 25) continue;
        out.push('Para recordar qué dice ese artículo. ' + cab + ': ' + cuerpo);
      }
    }
    return out;
  }

  /* ---------- 5) modo coche narrado ---------- */
  var N = null, items = [], pos = 0, jugando = false, gen = 0, rate = 1, wl = null, panel = null;
  function aplanar(d) {
    var o = []; d.secciones.forEach(function (s, si) { o.push({ s: si, t: 'Sección ' + (si + 1) + '. ' + s.t + '.', tit: 1 }); (s.p || []).forEach(function (p) { o.push({ s: si, t: p }); }); });
    return o;
  }
  function palabras(t) { return (t.match(/\S+/g) || []).length; }
  function restante() { var w = 0; for (var i = pos; i < items.length; i++) w += palabras(items[i].t); return Math.round(w / (165 * rate)); }
  function troceo(t) {
    var fr = t.match(/[^.!?;:]+[.!?;:]*\s*/g) || [t], out = [], cur = '';
    fr.forEach(function (x) { if ((cur + x).length > 170 && cur) { out.push(cur); cur = x; } else cur += x; });
    if (cur) out.push(cur); return out;
  }
  function vozEs() { var v = (speechSynthesis.getVoices() || []).filter(function (x) { return /^es/i.test(x.lang); }); return v.filter(function (x) { return /es-ES/i.test(x.lang); })[0] || v[0] || null; }
  /* dentro de la app (iframe a toda altura) el panel fijo quedaría al final de la página: lo colocamos en la parte visible de la pantalla del padre */
  var vista = null;
  function coloca() {
    if (!panel) return;
    var au = $('#aud'), ah = au ? au.offsetHeight : 0;
    if (!emb) { panel.style.bottom = ah + 'px'; return; }
    if (!vista) { try { parent.postMessage({ claveListo: 1 }, '*'); } catch (e) {} return; }
    panel.style.position = 'absolute'; panel.style.bottom = 'auto'; panel.style.top = Math.max(0, vista.top + vista.h - panel.offsetHeight - ah) + 'px';
  }
  window.addEventListener('message', function (e) { var d = e.data; if (d && d.claveVista) { vista = d.claveVista; coloca(); } });
  function pinta() {
    if (!panel) return; var it = items[pos], tot = items.length;
    $('.sec', panel).textContent = (it ? (N.secciones[it.s].t) : 'Fin') + ' · ' + (pos + 1) + '/' + tot + ' · v793';
    $('.tx', panel).textContent = it ? it.t : 'Has terminado el repaso narrado. ¡Ahora, test!';
    $('.bar i', panel).style.width = Math.round(pos / Math.max(1, tot - 1) * 100) + '%';
    $('.est', panel).textContent = '≈ ' + restante() + ' min restantes · velocidad ' + rate + '×';
    $('#cl-play', panel).textContent = jugando ? '⏸' : '▶';
    $('#cl-sel', panel).value = it ? it.s : 0;
    if (!jugando && it) { try { sincroniza(it.t, it); } catch (e) {} }
    try { localStorage.setItem('clave-nar-' + KEY, String(pos)); } catch (e) {}
    try { window.ClaveEspejo && ClaveEspejo.actualiza('nar'); } catch (e) {}
  }
  function parar() { gen++; try { speechSynthesis.cancel(); } catch (e) {} }
  function hablar() {
    parar(); try { var bn = $('#bn'); if (bn && jugando) bn.click(); } catch (e) {} /* el audio del esquema y el narrado no suenan a la vez */ if (!jugando || pos >= items.length) { jugando = false; pinta(); return; }
    var mi = gen, partes = troceo(items[pos].t), nOrig = partes.length, i = 0; pinta();
    try { partes = partes.concat(resumenes(items[pos])); } catch (e) {} /* si el párrafo cita OTRO artículo, tras leerlo se cuenta qué dice */
    (function sig() {
      if (mi !== gen) return;
      if (i >= partes.length) { pos++; setTimeout(function () { if (mi === gen) hablar(); }, items[pos - 1] && items[pos - 1].tit ? 450 : 250); return; }
      if (i < nOrig) try { sincroniza(partes[i], items[pos]); } catch (e) {}
      var u = new SpeechSynthesisUtterance(partes[i++]); u.lang = 'es-ES'; u.rate = rate; var v = vozEs(); if (v) u.voice = v;
      u.onend = function () { if (mi === gen) sig(); }; u.onerror = function (e) { if (mi === gen && e.error !== 'canceled' && e.error !== 'interrupted') sig(); };
      speechSynthesis.speak(u);
    })();
  }
  function pideWake() { try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (l) { wl = l; }).catch(function () {}); } catch (e) {} }
  function salto(d) { libre = true; pos = Math.max(0, Math.min(items.length - 1, pos + d)); if (jugando) hablar(); else pinta(); }
  function saltoSec(d) {
    libre = true; var s = items[Math.min(pos, items.length - 1)].s + d; s = Math.max(0, Math.min(N.secciones.length - 1, s));
    for (var i = 0; i < items.length; i++) if (items[i].s === s) { pos = i; break; } if (jugando) hablar(); else pinta();
  }
  function abrirNarrado() {
    if (panel) { return; }
    document.body.classList.add('cl-narando');
    panel = document.createElement('div'); panel.id = 'cl-nar'; panel.className = 'cl-noprint';
    var opts = N.secciones.map(function (s, i) { return '<option value="' + i + '">' + (i + 1) + '. ' + s.t.replace(/</g, '&lt;').slice(0, 60) + '</option>'; }).join('');
    panel.innerHTML = '<div class="t"><b>🎧 ' + N.titulo + '</b><span class="sec"></span><button id="cl-x" title="Cerrar">✕</button></div>'
      + '<div class="tx"></div><div class="bar"><i></i></div>'
      + '<div class="t" style="margin-top:6px"><button id="cl-ps" title="Sección anterior">⏮</button><button id="cl-pp" title="Párrafo anterior">⏪</button><button id="cl-play" title="Reproducir / pausa">▶</button><button id="cl-np" title="Párrafo siguiente">⏩</button><button id="cl-ns" title="Sección siguiente">⏭</button><button id="cl-qa" title="Preguntas y respuestas de esta parte: te las narro cuando quieras">❓ P&R</button>'
      + '<select id="cl-vel"><option value="0.85">0,85×</option><option value="1" selected>1×</option><option value="1.1">1,1×</option><option value="1.25">1,25×</option><option value="1.4">1,4×</option></select>'
      + '<select id="cl-sel">' + opts + '</select><span class="est"></span></div>';
    document.body.appendChild(panel);
    $('#cl-play', panel).onclick = function () { jugando = !jugando; if (jugando) { pideWake(); hablar(); } else { parar(); pinta(); } };
    $('#cl-pp', panel).onclick = function () { salto(-1); }; $('#cl-np', panel).onclick = function () { salto(1); };
    $('#cl-ps', panel).onclick = function () { saltoSec(-1); }; $('#cl-ns', panel).onclick = function () { saltoSec(1); };
    $('#cl-qa', panel).onclick = function () { narrarQADeLaParteActual(); };
    $('#cl-vel', panel).onchange = function () { rate = parseFloat(this.value) || 1; if (jugando) hablar(); else pinta(); };
    $('#cl-sel', panel).onchange = function () { libre = true; var s = +this.value; for (var i = 0; i < items.length; i++) if (items[i].s === s) { pos = i; break; } if (jugando) hablar(); else pinta(); };
    $('.bar', panel).onclick = function (e) { libre = true; var r = this.getBoundingClientRect(); pos = Math.round((e.clientX - r.left) / r.width * (items.length - 1)); if (jugando) hablar(); else pinta(); };
    $('#cl-x', panel).onclick = function () { jugando = false; parar(); try { window.ClaveEspejo && ClaveEspejo.quita('nar'); } catch (e) {} panel.remove(); panel = null; document.body.classList.remove('cl-narando'); sec0 = -2; limpiaSync(); try { if (wl) wl.release(); } catch (e) {} };
    try { var g = +localStorage.getItem('clave-nar-' + KEY); if (g > 0 && g < items.length) pos = g; } catch (e) {}
    try {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: N.titulo, artist: 'Esquema clave' });
        navigator.mediaSession.setActionHandler('play', function () { $('#cl-play').click(); }); navigator.mediaSession.setActionHandler('pause', function () { $('#cl-play').click(); });
        navigator.mediaSession.setActionHandler('nexttrack', function () { saltoSec(1); }); navigator.mediaSession.setActionHandler('previoustrack', function () { saltoSec(-1); });
      }
    } catch (e) {}
    pinta(); coloca(); if (window.ResizeObserver) new ResizeObserver(coloca).observe(panel); setTimeout(coloca, 400);
    try { window.ClaveEspejo && ClaveEspejo.registrar('nar', function () { return panel; }, /#cl-nar\b/, { bar: function (f) { libre = true; pos = Math.round(f * (items.length - 1)); if (jugando) hablar(); else pinta(); } }); } catch (e) {}
  }
  $$('.cl-nbtn').forEach(function (bt) { bt.onclick = function () {
    if (!('speechSynthesis' in window)) { alert('Este navegador no tiene voz (speechSynthesis).'); return; }
    var p = +bt.dataset.p; if (panel) panel.querySelector('#cl-x').click(); sec0 = -2; h2i = -1;
    KEY = p > 1 ? NT + '-' + p : NT;
    if (!(window.CLAVE_ARTF || {})[NT]) cargar(base + 'clave-arts/t' + NT + '-f.js').catch(function () {}); /* textos de los artículos para los resúmenes de las citas de pasada */
    var go = function () { N = (window.CLAVE_AUDIO || {})[KEY]; if (!N) { alert('La versión narrada de este tema todavía no está hecha.'); return; } items = aplanar(N); pos = 0; abrirNarrado(); };
    if ((window.CLAVE_AUDIO || {})[KEY]) go(); else cargar(base + 'clave-audio/t' + KEY + '.js').then(go).catch(function () { alert('La versión narrada de este tema todavía no está hecha (o no se pudo cargar).'); });
  }; });
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#bp') && jugando) { jugando = false; parar(); pinta(); } }, true);
  window.addEventListener('pagehide', parar);

  /* ---------- arranque ---------- */
  unir();
  Promise.all([cargar(base + 'clave-tests/t' + NT + '-of.js').catch(function () {}), cargar(base + 'clave-tests/t' + NT + '-amar.js').catch(function () {}),cargar(base + 'clave-tests/t' + NT + '-sec.js').catch(function () {}), cargar(base + 'clave-arts/t' + NT + '.js').catch(function () {})]).then(function () {
    var A = (window.CLAVE_AMAR || {})[NT]; if (A && A.length) { amarillo(A); unir(); }
    var OF = (window.CLAVE_OF || {})[NT]; if (OF && OF.length) { try { azul(OF); if (ley && !/letra azul/.test(ley.textContent)) ley.insertAdjacentHTML('beforeend', ' · <span class="of">letra azul</span> = respuesta de pregunta OFICIAL (el rojo, lo que más cae a criterio e IA)'); } catch (e) {} }
    botonesPreguntas(); citas(); try { preguntasPartes(); } catch (e) {}
    cargar(base + 'clave-marcas.js?v=1').catch(function () {});   /* 🖍 Marcas: resaltar, subrayar y tachar como en Esquemas */
    /* barra «Escuchar» del esquema: dentro de la app se copia a la barra fija de la página (así no se queda a mitad al hacer scroll) */
    cargar(base + 'clave-espejo.js?v=1').then(function () { var au = $('#aud'); if (au && window.ClaveEspejo) ClaveEspejo.registrar('aud', function () { return $('#aud'); }, /#(aud|bp|bs|bn|vel|est)\b/); }).catch(function () {});
    var q = decodeURIComponent((location.hash.match(/[#&]q=([^&]+)/) || [])[1] || ''), S = (window.CLAVE_SEC || {})[NT];
    if (q && S) {
      var hs = $$('h2,h3').filter(enMain), hit = -1;
      for (var i = 0; i < hs.length; i++) if (hs[i].tagName === 'H3' && S[i] && S[i].indexOf(q) >= 0) { hit = i; break; }
      if (hit < 0) for (var j = 0; j < hs.length; j++) if (S[j] && S[j].indexOf(q) >= 0) { hit = j; break; }
      if (hit >= 0) setTimeout(function () { hs[hit].scrollIntoView({ block: 'start' }); hs[hit].classList.add('cl-flash'); setTimeout(function () { hs[hit].classList.remove('cl-flash'); }, 3000); }, 300);
    }
  });
})();
