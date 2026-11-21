/* Esquema clave: 🚗 modo coche (lectura en voz alta con pausas) + 🧠 preguntas al final.
   Se carga con <script src="clave-extras.js" defer> en cada repaso-tN-borrador.html.
   Dentro de expres-subrayado.html el repaso va en un iframe alto sin scroll propio: la barra de control se coloca
   con los datos de vista (claveVista) que manda la página padre; suelto, la barra va fija abajo. */
(function () {
  'use strict';
  var emb = window.parent !== window, D = document;
  var KEY = 'clave-coche-' + (location.pathname.split('/').pop() || 'x');
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  var hoja = D.querySelector('.hoja') || D.body;
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); };
  var norm = function (t) { return String(t || '').replace(/\s+/g, ' ').trim(); };
  function hablable(t) {
    return norm(t).replace(/\bEXOF\b/g, 'examen oficial').replace(/\bEX\b/g, 'marcado examen').replace(/✱/g, '').replace(/\bR(\d+)\b/g, 'Recuerda $1')
      .replace(/→/g, ', ').replace(/[\[\]]/g, '').replace(/\bOF\b/g, '').replace(/\bart\./gi, 'artículo').replace(/\s+/g, ' ').trim();
  }

  /* ---------- estilos ---------- */
  var css = D.createElement('style');
  css.textContent =
    '.cq-bar{position:fixed;left:0;right:0;bottom:0;z-index:50;background:#14532d;color:#fff;padding:10px 12px;display:none;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;box-shadow:0 -3px 14px rgba(0,0,0,.3);font:600 14px "Segoe UI",system-ui,sans-serif}' +
    '.cq-bar.on{display:flex}.cq-bar.emb{position:absolute;right:0;bottom:auto}' +
    '.cq-bar button{border:0;border-radius:12px;background:rgba(255,255,255,.18);color:#fff;font:inherit;font-size:20px;min-width:52px;min-height:48px;cursor:pointer;padding:0 12px}' +
    '.cq-bar button.g{background:#fff;color:#14532d;font-size:24px;min-width:76px}.cq-bar small{font-size:12px;opacity:.9}' +
    '.cq-ini{margin:6px 0 12px;display:flex;gap:8px;flex-wrap:wrap}' +
    '.cq-btn{border:1px solid var(--linea,#cfcfcf);border-radius:10px;background:var(--fondo,#fff);color:var(--tx,#1b1b1b);font:600 14px "Segoe UI",system-ui,sans-serif;padding:10px 14px;cursor:pointer}' +
    '.cq-btn.p{background:#14532d;color:#fff;border-color:#14532d}.cq-btn.m{background:#b91c1c;color:#fff;border-color:#b91c1c}' +
    '.cq-leyendo{outline:3px solid #f59e0b;outline-offset:2px;border-radius:6px;background:rgba(245,158,11,.10)}' +
    '.cq-leyendo.ban,.cq-leyendo.ban *,.cq-leyendo .ban,.cq-leyendo .ban *{color:#111!important}.cq-leyendo.ban{background:#f5c518!important}' +
    '.cq-quiz{margin:26px 0 90px;border:2px solid #14532d;border-radius:14px;padding:14px 16px;background:var(--fondo,#fff);color:var(--tx,#1b1b1b)}' +
    '.cq-quiz h2{margin:0 0 6px;background:none!important;color:inherit!important;padding:0!important;font-size:17px}' +
    '.cq-quiz .cq-sub{color:var(--gris,#666);font-size:13px;margin:0 0 10px}' +
    '.cq-quiz .cq-fila{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:8px 0}' +
    '.cq-quiz select{font:inherit;padding:8px;border-radius:8px;border:1px solid var(--linea,#cfcfcf);background:var(--fondo,#fff);color:inherit}' +
    '.cq-art{font-size:12px;color:var(--gris,#666);margin-bottom:6px}.cq-q{font-size:1.2em;font-weight:700;margin:6px 0 12px;line-height:1.35}' +
    '.cq-r{font-size:1.1em;padding:10px 12px;border-left:4px solid #15803d;background:rgba(21,128,61,.12);border-radius:6px;margin:8px 0}' +
    '.cq-prog{height:8px;border-radius:6px;background:var(--linea,#cfcfcf);overflow:hidden;margin:4px 0 10px}.cq-prog i{display:block;height:100%;background:#14532d;width:0}' +
    '.cq-of{display:inline-block;font-size:11px;font-weight:700;color:#fff;background:#1d4ed8;border-radius:5px;padding:0 5px;margin-right:6px}' +
    '.cq-opts{display:flex;flex-direction:column;gap:8px;margin:8px 0}.cq-opt{display:block;text-align:left;border:1px solid var(--linea,#cfcfcf);border-radius:10px;background:var(--fondo,#fff);color:var(--tx,#1b1b1b);font:inherit;padding:10px 12px;line-height:1.35}button.cq-opt{cursor:pointer}.cq-opt.ok{background:rgba(21,128,61,.18);border-color:#15803d}.cq-opt.ko{background:rgba(185,28,28,.15);border-color:#b91c1c}' +
    '.cq-res{font-weight:700;margin:8px 0}.cq-res.ok{color:#15803d}.cq-res.ko{color:#b91c1c}.cq-expl{font-size:.95em;margin:6px 0}.cq-expl .ex-resp{display:block;font-weight:700;color:#15803d;margin:0 0 6px}.cq-expl .ref-norma{display:block;font-weight:700;color:#7e3fb8;margin:0 0 6px}.cq-expl .ref-concepto{display:block;font-weight:600;color:#c62828;margin:0 0 6px}.cq-expl mark{background:rgba(21,128,61,.2);padding:0 2px}' +
    '@media print{.cq-bar,.cq-quiz,.cq-ini{display:none!important}}';
  D.head.appendChild(css);

  /* ---------- voz ---------- */
  var vozElegida = null;
  function elegirVoz() {
    if (vozElegida) return vozElegida;
    var v = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    var es = v.filter(function (x) { return /^es[-_]ES/i.test(x.lang) || /spain|españa|castellano/i.test(x.name); });   // solo voces de España
    if (!es.length) es = v.filter(function (x) { return /^es/i.test(x.lang) && !/es[-_](MX|US|AR|CO|CL|PE|VE|419)|mexic|estados unidos|latino|argentin|colomb/i.test(x.lang + ' ' + x.name); });
    if (!es.length) es = v.filter(function (x) { return /^es/i.test(x.lang); });
    if (!es.length) return null;
    var M = /jorge|pablo|diego|alvaro|álvaro|enrique|carlos|raul|raúl|tomas|tomás|jose|josé|fernando|antonio|miguel|male/i;
    var pool = es.filter(function (x) { return !M.test(x.name); }); if (!pool.length) pool = es;
    var pref = [/neural/i, /natural/i, /online/i, /elvira/i, /helena/i, /laura/i, /lucia|lucía/i, /google/i];
    for (var i = 0; i < pref.length; i++) { var f = pool.filter(function (x) { return pref[i].test(x.name); })[0]; if (f) return (vozElegida = f); }
    return (vozElegida = pool.filter(function (x) { return /es-ES/i.test(x.lang); })[0] || pool[0]);
  }
  if (window.speechSynthesis) speechSynthesis.onvoiceschanged = function () { vozElegida = null; };
  var vel = parseFloat(ls('clave-vel')) || 1;
  var tok = 0;   // se invalida al parar/saltar
  function pausa(ms, t) { return new Promise(function (ok) { setTimeout(ok, ms); }); }
  function decir(texto, t, seg) {   // habla un texto (troceado por frases) y espera a que acabe; false si lo cancelaron
    var trozos = norm(texto).match(/[^.?!;:]+[.?!;:]?/g) || [texto];
    var i = 0, tot = trozos.join('').length || 1, cum = [], ac = 0; trozos.forEach(function (z) { cum.push(ac / tot); ac += z.length; });
    return new Promise(function (ok) {
      (function sig() {
        if (t !== tok) return ok(false);
        var x = (trozos[i++] || '').trim();
        if (i > trozos.length) return ok(true);
        if (!x) return sig();
        if (seg) seg(cum[i - 1] || 0);
        var u = new SpeechSynthesisUtterance(x), v = elegirVoz();
        if (v) u.voice = v; u.lang = (v && /^es[-_]ES/i.test(v.lang)) ? v.lang : 'es-ES'; u.rate = vel; u.pitch = 1;
        var fin = function () { if (t !== tok) return ok(false); setTimeout(sig, 220); };
        u.onend = fin; u.onerror = fin; speechSynthesis.speak(u);
      })();
    });
  }
  function parar() { tok++; try { speechSynthesis.cancel(); } catch (e) {} }

  /* ---------- barra ---------- */
  var bar = D.createElement('div'); bar.className = 'cq-bar' + (emb ? ' emb' : ''); bar.id = 'cq-bar';
  bar.innerHTML = '<button data-a="ant" aria-label="Anterior">⏮</button><button data-a="play" class="g" aria-label="Pausa o seguir">⏸</button><button data-a="sig" aria-label="Siguiente">⏭</button>' +
    '<button data-a="vmenos" aria-label="Más lento">🐢</button><small class="cq-vel"></small><button data-a="vmas" aria-label="Más rápido">🐇</button><small class="cq-info"></small><button data-a="x" aria-label="Cerrar">✕</button>';
  D.body.appendChild(bar);
  var vista = null;
  function colocaBarra() {
    if (!emb || !vista || !bar.classList.contains('on')) { if (emb) bar.style.top = ''; return; }
    var h = bar.offsetHeight || 70, top = vista.top + vista.h - h;
    bar.style.top = Math.max(0, top) + 'px';
  }
  window.addEventListener('message', function (e) { var d = e.data; if (d && d.claveVista) { vista = d.claveVista; colocaBarra(); } });
  try { if (emb) parent.postMessage({claveListo: 1}, '*'); } catch (e) {}
  function pintaVel() { var s = $('.cq-vel', bar); if (s) s.textContent = vel.toFixed(2).replace(/0$/, '') + '×'; }
  function info(t) { var s = $('.cq-info', bar); if (s) s.textContent = t || ''; }
  var wake = null;
  function pantalla(on) { try { if (on && navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { wake = w; }); else if (wake) { wake.release(); wake = null; } } catch (e) {} }

  /* ---------- unidades de lectura del esquema ---------- */
  var unidades = [];
  function recoge() {
    unidades = [];
    var els = hoja.querySelectorAll('h1,h2,.art,.rline,.rq-art,.leyenda,.vis-wrap');
    Array.prototype.forEach.call(els, function (el) {
      if (el.closest('.cq-quiz')) return;
      if (el.tagName === 'H1' || el.tagName === 'H2') { unidades.push({el: el, partes: [hablable(el.textContent)]}); return; }
      if (el.classList.contains('leyenda')) return;
      if (el.classList.contains('vis-wrap')) {   // cuadros y «TUS APUNTES A MANO»: título y luego cada caja
        if (el.closest('.art, .rq-art')) return;
        var ban = el.querySelector('.ban'), hechos = 0; if (ban) unidades.push({el: ban, partes: [hablable(ban.textContent)]});
        Array.prototype.forEach.call(el.querySelectorAll('.caja'), function (c) { if (c.querySelector('.caja')) return; var tc = hablable(c.textContent); if (tc) { unidades.push({el: c, partes: [tc]}); hechos++; } });
        if (!hechos) { var cu = el.querySelector('.cuerpo') || el, tv = hablable(cu.textContent); if (tv) unidades.push({el: cu, partes: [tv]}); }
        return;
      }
      if (el.classList.contains('rline')) { var q = norm(el.textContent).replace(/\[\s*|\s*\]/g, ''); unidades.push({el: el, partes: [hablable(q)]}); return; }
      if (el.classList.contains('rq-art')) {
        var p = [hablable((el.querySelector('.rq-a') || {}).textContent || '')];
        Array.prototype.forEach.call(el.querySelectorAll('li'), function (li) {
          var qq = li.querySelector('.rq-q'), rr = li.querySelector('.rq-r');
          if (qq && rr) { p.push(hablable(qq.textContent)); p.push('@@' + hablable(rr.textContent)); }
        });
        unidades.push({el: el, partes: p}); return;
      }
      var partes = [], pEls = [], h3 = el.querySelector('h3'); if (h3) { partes.push(hablable(h3.textContent)); pEls.push(h3); }
      var cuerpo = el.querySelectorAll('li, p, .lin, td');
      if (cuerpo.length) Array.prototype.forEach.call(cuerpo, function (c) { if (c.querySelector('li, p')) return; var t = hablable(c.textContent); if (t) { partes.push(t); pEls.push(c); } });
      else { var t0 = hablable(el.textContent); if (t0) partes.push(t0); }
      unidades.push({el: el, partes: partes, pEls: pEls});
    });
  }
  var pos = 0, activo = false, leyendoEl = null;
  function VH() { return (emb && vista && vista.h) ? vista.h : window.innerHeight; }
  var mk = null;
  function siguelinea(el, f) {   // sigue la lectura: lleva a la vista el trozo que se está leyendo (en artículos largos va bajando)
    try {
      var r = el.getBoundingClientRect();
      if (r.height < VH() * 0.45) { if (f === 0) el.scrollIntoView({block: 'center', behavior: 'smooth'}); return; }
      if (!mk) { mk = D.createElement('i'); mk.style.cssText = 'position:absolute;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden'; D.body.appendChild(mk); }
      mk.style.top = (r.top + (window.pageYOffset || 0) + r.height * Math.min(0.97, f)) + 'px';
      mk.scrollIntoView({block: 'center', behavior: 'smooth'});
    } catch (e) {}
  }
  function marca(el) { if (leyendoEl) leyendoEl.classList.remove('cq-leyendo'); leyendoEl = el; if (el) { el.classList.add('cq-leyendo'); try { if (el.getBoundingClientRect().height <= VH() * 0.6) el.scrollIntoView({block: 'center', behavior: 'smooth'}); } catch (e) {} } }
  function guardaPos() { ls(KEY, String(pos)); }
  async function leerDesde(i) {
    parar(); var t = tok; pos = Math.max(0, Math.min(unidades.length - 1, i)); activo = true; pantalla(true);
    $('[data-a="play"]', bar).textContent = '⏸'; bar.classList.add('on'); colocaBarra();
    while (activo && t === tok && pos < unidades.length) {
      var u = unidades[pos]; marca(u.el); info((pos + 1) + '/' + unidades.length); guardaPos();
      for (var k = 0; k < u.partes.length; k++) {
        var p = u.partes[k]; if (!p) continue;
        var resp = p.indexOf('@@') === 0; if (resp) { await pausa(2500, t); if (t !== tok) return; p = 'Respuesta. ' + p.slice(2); }
        var pe = u.pEls && u.pEls[k] ? u.pEls[k] : u.el;
        if (!(await decir(p, t, resp ? null : function (f) { siguelinea(pe, f); }))) return;
        await pausa(resp ? 1600 : 700, t); if (t !== tok) return;
      }
      await pausa(900, t); if (t !== tok) return;
      pos++;
    }
    if (t === tok && pos >= unidades.length) { activo = false; marca(null); info('Fin'); $('[data-a="play"]', bar).textContent = '▶'; ls(KEY, '0'); pantalla(false); }
  }
  function detener() { parar(); activo = false; marca(null); bar.classList.remove('on'); pantalla(false); quizAbortar(); }
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return; var a = b.getAttribute('data-a');
    if (modoQuiz) { quizBar(a); return; }
    if (a === 'x') detener();
    else if (a === 'play') { if (activo) { parar(); activo = false; b.textContent = '▶'; } else leerDesde(pos); }
    else if (a === 'sig') leerDesde(pos + 1);
    else if (a === 'ant') leerDesde(pos - 1);
    else if (a === 'vmenos' || a === 'vmas') { vel = Math.max(0.6, Math.min(1.8, vel + (a === 'vmas' ? 0.1 : -0.1))); ls('clave-vel', String(vel)); pintaVel(); if (activo) leerDesde(pos); }
  });
  pintaVel();

  /* ---------- botones de arranque (arriba) ---------- */
  var ini = D.createElement('div'); ini.className = 'cq-ini';
  var guard = parseInt(ls(KEY) || '0', 10) || 0;
  ini.innerHTML = '<button class="cq-btn p" data-i="coche">🚗 Escuchar el esquema clave</button>' +
    (guard > 0 ? '<button class="cq-btn" data-i="seguir">▶ Seguir donde me quedé</button>' : '') +
    '<button class="cq-btn" data-i="pausa">⏸ Pausa / ▶ Seguir</button><button class="cq-btn m" data-i="parar">⏹ Parar</button><button class="cq-btn" data-i="preg">🧠 Hacerme las preguntas</button>';
  if (!window.CLAVE_SOLO_QUIZ) {   // CLAVE_SOLO_QUIZ: el esquema ya trae su propia barra de audio; aquí solo se usa el test (T4 nuevo, 21/11/2026)
    var h1 = $('h1', hoja); if (h1 && h1.parentNode) h1.parentNode.insertBefore(ini, (h1.nextElementSibling && h1.nextElementSibling.classList.contains('sub')) ? h1.nextElementSibling.nextSibling : h1.nextSibling); else hoja.insertBefore(ini, hoja.firstChild);
  }
  ini.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return; var a = b.getAttribute('data-i');
    if (a === 'parar') { detener(); return; }
    if (a === 'pausa') { if (activo) { parar(); activo = false; $('[data-a="play"]', bar).textContent = '▶'; } else if (bar.classList.contains('on')) leerDesde(pos); return; }
    if (a === 'preg') { var q = $('.cq-quiz'); if (q) { q.scrollIntoView({block: 'start', behavior: 'smooth'}); } return; }
    quizAbortar(); recoge();
    leerDesde(a === 'seguir' ? guard : 0);
  });

  /* ---------- preguntas del esquema clave (al final) ---------- */
  var banco = [], bancoTest = [];
  var NT = (location.pathname.match(/repaso-t(\d+)-/) || [])[1];
  function reunir() {
    banco = [];
    Array.prototype.forEach.call(hoja.querySelectorAll('.rq-art'), function (art) {
      var a = norm((art.querySelector('.rq-a') || {}).textContent);
      Array.prototype.forEach.call(art.querySelectorAll('li'), function (li) {
        var q = li.querySelector('.rq-q'), r = li.querySelector('.rq-r'); if (!q || !r) return;
        var of = !!q.querySelector('.rq-of'), qt = norm(q.textContent).replace(/^OF\s*/, '');
        banco.push({a: a, q: qt, r: norm(r.textContent), of: of});
      });
    });
    Array.prototype.forEach.call(hoja.querySelectorAll('.rline'), function (l) {
      var rn = l.querySelector('.rans'), f = l.querySelector('.fl'), n = l.querySelector('.b'); if (!rn || !f) return;
      var t = norm(l.textContent), i = t.indexOf('→'); if (i < 0) return;
      var q = t.slice(0, i).replace(/^R\d+\s*/, '').trim(), r = norm(rn.textContent).replace(/^\[\s*|\s*\]$/g, '');
      if (q && r) banco.push({a: n ? norm(n.textContent) + ' · RECUERDA' : 'RECUERDA', q: q, r: r, of: false});
    });
    reunirTest();
  }
  function reunirTest() {   // preguntas de TEST de los artículos del esquema (datos de clave-tests/tN.js)
    bancoTest = [];
    var arr = (window.CLAVE_TEST || {})[NT] || [];
    arr.forEach(function (g) { g.q.forEach(function (q) { bancoTest.push({t: 1, a: g.a, id: q.i, q: q.p, o: q.o, c: q.c, e: q.e, of: !/-ia-/.test(q.i)}); }); });
  }
  if (NT) {   // carga los datos del tema y rehace el bloque al llegar
    var sc = D.createElement('script'); sc.src = 'clave-tests/t' + NT + '.js';
    sc.onload = function () { reunirTest(); if (quiz && !modoQuiz && !cola.length) pintaInicio(); };
    D.head.appendChild(sc);
  }
  var todoCargado = false;
  if (window.CLAVE_ALCANCE_TEMA && NT) setTimeout(function () { cargaTodo(function () { if (quiz && !modoQuiz && !cola.length) pintaInicio(); }); }, 800);   // carga todas las preguntas del tema para el test
  function cargaTodo(cb) {
    if (todoCargado) return cb(); var x = D.createElement('script'); x.src = 'clave-tests/t' + NT + '-todo.js';
    x.onload = function () { todoCargado = true; ((window.CLAVE_TODO || {})[NT] || []).forEach(function (g) { g.q.forEach(function (q) { bancoTodo.push({t: 1, a: g.a, id: q.i, q: q.p, o: q.o, c: q.c, e: q.e, of: !/-ia-/.test(q.i)}); }); }); cb(); };
    x.onerror = function () { cb(); }; D.head.appendChild(x);
  }
  var bancoTodo = [];
  var quizCtrlClick = null;
  var quiz = null, modoQuiz = false, cola = [], qi = 0, aciertos = 0, falladas = [], mostrada = false, voz = false, espera = parseInt(ls('clave-espera') || '6', 10);
  function crearQuiz() {
    D.addEventListener('click', function (e) { if (quizCtrlClick && quiz && quiz.contains(e.target)) quizCtrlClick(e); });
    reunir(); if (!banco.length && !NT) return;
    quiz = D.createElement('section'); quiz.className = 'cq-quiz'; quiz.id = 'cq-quiz';
    var pie = $('.pie', hoja); if (pie && pie.parentNode === hoja) hoja.insertBefore(quiz, pie); else hoja.appendChild(quiz);
    pintaInicio();
  }
  function pintaInicio() {
    cola = [];
    var BT = window.CLAVE_ALCANCE_TEMA ? bancoTodo : bancoTest;   // CLAVE_ALCANCE_TEMA: el test sale de TODAS las preguntas del tema de la app de conocimientos, no solo de los artículos del esquema
    var nT = BT.length, ofT = BT.filter(function (x) { return x.of; }).length, modo = ls('clave-modo') || 'test';
    if (!nT && modo === 'test') modo = 'rapida';
    quiz.innerHTML = '<h2>🧠 Hazme las preguntas del esquema clave</h2>' +
      '<p class="cq-sub">Elige tipo: <b>preguntas de test</b> de los artículos de este esquema (oficiales + de estudio) o <b>preguntas rápidas</b> (pregunta → respuesta corta).</p>' +
      '<div class="cq-fila"><label>Tipo: <select id="cq-modo"><option value="test"' + (modo === 'test' ? ' selected' : '') + '>📝 Preguntas tipo test (' + (nT || 'cargando…') + ')</option><option value="rapida"' + (modo === 'rapida' ? ' selected' : '') + '>⚡ Preguntas rápidas (' + banco.length + ')</option></select></label></div>' +
      (window.CLAVE_ALCANCE_TEMA ? '<div class="cq-fila"><label>Alcance: <select id="cq-alc"><option value="todo">Todo el tema (app de conocimientos)</option></select></label></div>' : '<div class="cq-fila"><label>Alcance: <select id="cq-alc"><option value="clave">Artículos del esquema clave</option><option value="todo">Todo el tema (incluye el resto de preguntas)</option></select></label></div>') +
      '<div class="cq-fila"><label>Cuántas: <select id="cq-n"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option><option value="0">Todas</option></select></label>' +
      '<label><input type="checkbox" id="cq-of"> Solo oficiales' + (nT ? ' (' + ofT + ' test)' : '') + '</label>' +
      '<label><input type="checkbox" id="cq-voz"' + (ls('clave-quizvoz') === '1' ? ' checked' : '') + '> 🔊 Por voz (modo coche)</label></div>' +
      '<div class="cq-fila"><label>Pausa antes de la respuesta (voz): <select id="cq-esp">' + [3, 5, 6, 8, 10, 15].map(function (s) { return '<option value="' + s + '"' + (s === espera ? ' selected' : '') + '>' + s + ' s</option>'; }).join('') + '</select></label></div>' +
      '<div class="cq-fila"><button class="cq-btn p" id="cq-go">▶ Empezar</button></div>';
    $('#cq-n', quiz).value = '25';
    $('#cq-go', quiz).onclick = empezarQuiz;
  }
  function mezcla(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function empezarQuiz() {
    var n = parseInt($('#cq-n', quiz).value, 10), soloOf = $('#cq-of', quiz).checked, modo = $('#cq-modo', quiz).value;
    voz = $('#cq-voz', quiz).checked; espera = parseInt($('#cq-esp', quiz).value, 10) || 6;
    ls('clave-quizvoz', voz ? '1' : '0'); ls('clave-espera', String(espera)); ls('clave-modo', modo);
    if (modo === 'test' && $('#cq-alc', quiz).value === 'todo' && !todoCargado) { cargaTodo(function () { empezarQuiz(); }); return; }
    var origen = modo === 'test' ? (window.CLAVE_ALCANCE_TEMA ? bancoTodo : (($('#cq-alc', quiz).value === 'todo') ? bancoTest.concat(bancoTodo) : bancoTest)) : banco;
    var base = origen.filter(function (x) { return !soloOf || x.of; }); if (!base.length) base = origen; if (!base.length) return;
    cola = mezcla(base.slice()); if (n > 0) cola = cola.slice(0, n);
    qi = 0; aciertos = 0; falladas = []; parar(); activo = false; marca(null);
    if (voz) { modoQuiz = true; bar.classList.add('on'); pantalla(true); $('[data-a="play"]', bar).textContent = '⏸'; colocaBarra(); quizVoz(); }
    else { modoQuiz = false; bar.classList.remove('on'); pintaPregunta(); }
    try { quiz.scrollIntoView({block: 'start', behavior: 'smooth'}); } catch (e) {}
  }
  function cabecera() { return '<div class="cq-prog"><i style="width:' + Math.round(qi / cola.length * 100) + '%"></i></div><div class="cq-art">' + (qi + 1) + ' de ' + cola.length + ' · ' + esc(cola[qi].a) + '</div>'; }
  var LET = ['A', 'B', 'C', 'D', 'E', 'F'];
  function explPartes(html) {   // «Respuesta correcta» / lila / rojo / resto, por separado (para leerlas con pausas)
    var d = D.createElement('div'); d.innerHTML = html || '';
    var r = [], T = function (x) { return norm(x.textContent); };
    ['.ex-resp', '.ref-norma', '.ref-concepto'].forEach(function (s) { Array.prototype.forEach.call(d.querySelectorAll(s), function (x) { var t = T(x); if (t) r.push(t); x.parentNode.removeChild(x); }); });
    var t = T(d); if (t) r.push(t); return r;
  }
  function cabTest(c) { return '<h2>🧠 Preguntas tipo test del esquema clave</h2>' + cabecera() + '<div class="cq-q">' + (c.of ? '<span class="cq-of">OFICIAL</span>' : '') + c.q + '</div>'; }
  function pintaPregunta() {
    if (qi >= cola.length) return fin();
    var c = cola[qi]; mostrada = false;
    if (c.t) {
      quiz.innerHTML = cabTest(c) + '<div class="cq-opts">' + c.o.map(function (o, i) { return '<button class="cq-opt" data-i="' + i + '"><b>' + LET[i] + '.</b> ' + o + '</button>'; }).join('') + '</div><div class="cq-fila"><button class="cq-btn" id="cq-oir">🔊 Leer pregunta</button><button class="cq-btn" id="cq-sal">Salir</button></div>';
      Array.prototype.forEach.call(quiz.querySelectorAll('.cq-opt'), function (b) { b.onclick = function () { responderTest(+b.getAttribute('data-i')); }; });
      $('#cq-oir', quiz).onclick = function () { parar(); decir(textoTest(c), tok); };
    } else {
      quiz.innerHTML = '<h2>🧠 Preguntas rápidas del esquema clave</h2>' + cabecera() + '<div class="cq-q">' + (c.of ? '<span class="cq-of">OF</span>' : '') + esc(c.q) + '</div><div class="cq-fila"><button class="cq-btn p" id="cq-ver">👁 Ver respuesta</button><button class="cq-btn" id="cq-oir">🔊 Leer pregunta</button><button class="cq-btn" id="cq-sal">Salir</button></div>';
      $('#cq-ver', quiz).onclick = muestraResp; $('#cq-oir', quiz).onclick = function () { parar(); decir(c.q, tok); };
    }
    $('#cq-sal', quiz).onclick = function () { parar(); pintaInicio(); };
  }
  function textoTest(c) { return hablable(c.q.replace(/<[^>]+>/g, ' ')) + '. ' + c.o.map(function (o, i) { return 'Opción ' + LET[i] + ': ' + hablable(o.replace(/<[^>]+>/g, ' ')) + '.'; }).join(' '); }
  function responderTest(i) {
    var c = cola[qi], ok = i === c.c; if (ok) aciertos++; else falladas.push(c); parar();
    var ops = c.o.map(function (o, k) { return '<div class="cq-opt ' + (k === c.c ? 'ok' : (k === i ? 'ko' : '')) + '"><b>' + LET[k] + '.</b> ' + o + '</div>'; }).join('');
    quiz.innerHTML = cabTest(c) + '<div class="cq-opts">' + ops + '</div><div class="cq-res ' + (ok ? 'ok' : 'ko') + '">' + (ok ? '✅ Correcto' : '❌ Incorrecto') + '</div><div class="cq-expl">' + (c.e || '') + '</div><div class="cq-fila"><button class="cq-btn p" id="cq-sig">Siguiente ▶</button><button class="cq-btn" id="cq-oir">🔊 Leer explicación</button></div>';
    $('#cq-sig', quiz).onclick = function () { parar(); qi++; pintaPregunta(); };
    $('#cq-oir', quiz).onclick = async function () { parar(); var t = tok, p = explPartes(c.e); for (var k = 0; k < p.length; k++) { if (!(await decir(p[k], t))) return; await pausa(1000, t); if (t !== tok) return; } };
  }
  function muestraResp() {
    var c = cola[qi]; mostrada = true;
    quiz.innerHTML = '<h2>🧠 Preguntas rápidas del esquema clave</h2>' + cabecera() + '<div class="cq-q">' + (c.of ? '<span class="cq-of">OF</span>' : '') + esc(c.q) + '</div><div class="cq-r">' + esc(c.r) + '</div><div class="cq-fila"><button class="cq-btn p" id="cq-ok">✔ La sabía</button><button class="cq-btn m" id="cq-ko">✖ Repasar</button><button class="cq-btn" id="cq-oir">🔊 Leer respuesta</button></div>';
    $('#cq-ok', quiz).onclick = function () { aciertos++; qi++; parar(); pintaPregunta(); };
    $('#cq-ko', quiz).onclick = function () { falladas.push(c); qi++; parar(); pintaPregunta(); };
    $('#cq-oir', quiz).onclick = function () { parar(); decir(c.r, tok); };
  }
  function fin() {
    parar(); modoQuiz = false; bar.classList.remove('on'); pantalla(false);
    quiz.innerHTML = '<h2>🧠 Terminado</h2><p class="cq-q">' + (voz ? cola.length + ' preguntas repasadas por voz.' : aciertos + ' de ' + cola.length + (cola[0] && cola[0].t ? ' acertadas.' : ' sabidas.')) + '</p><div class="cq-fila">' +
      (!voz && falladas.length ? '<button class="cq-btn m" id="cq-rep">🔁 Repetir las ' + falladas.length + ' falladas</button>' : '') + '<button class="cq-btn p" id="cq-otra">↺ Otra tanda</button></div>';
    var r = $('#cq-rep', quiz); if (r) r.onclick = function () { cola = mezcla(falladas.slice()); qi = 0; aciertos = 0; falladas = []; pintaPregunta(); };
    $('#cq-otra', quiz).onclick = pintaInicio;
  }
  async function quizVoz() {
    parar(); var t = tok;
    while (modoQuiz && t === tok && qi < cola.length) {
      var c = cola[qi]; info((qi + 1) + '/' + cola.length);
      if (c.t) {
        var ops = c.o.map(function (o, k) { return '<div class="cq-opt" data-k="' + k + '"><b>' + LET[k] + '.</b> ' + o + '</div>'; }).join('');
        quiz.innerHTML = cabTest(c) + '<div class="cq-opts">' + ops + '</div><div class="cq-expl"></div>' + ctrlVoz();
        if (!(await decir('Pregunta ' + (qi + 1) + '. ' + textoTest(c), t))) return;
        await pausa(espera * 1000, t); if (t !== tok) return;
        var ok = quiz.querySelector('.cq-opt[data-k="' + c.c + '"]'); if (ok) ok.className += ' ok';
        quiz.querySelector('.cq-expl').innerHTML = c.e || '';
        if (!(await decir('Respuesta correcta: ' + LET[c.c] + '. ' + hablable(c.o[c.c].replace(/<[^>]+>/g, ' ')), t))) return;
        await pausa(1400, t); if (t !== tok) return;
        var pe = explPartes(c.e).filter(function (x) { return !/^Respuesta correcta/i.test(x); });
        for (var k = 0; k < pe.length; k++) { if (!(await decir(hablable(pe[k]), t))) return; await pausa(1200, t); if (t !== tok) return; }
        await pausa(1500, t); if (t !== tok) return;
      } else {
        quiz.innerHTML = '<h2>🔊 Preguntas por voz</h2>' + cabecera() + '<div class="cq-q">' + esc(c.q) + '</div><div class="cq-r" style="visibility:hidden">' + esc(c.r) + '</div>';
        if (!(await decir('Pregunta ' + (qi + 1) + '. ' + hablable(c.q), t))) return;
        await pausa(espera * 1000, t); if (t !== tok) return;
        var rr = quiz.querySelector('.cq-r'); if (rr) rr.style.visibility = 'visible';
        if (!(await decir('Respuesta. ' + hablable(c.r), t))) return;
        await pausa(2200, t); if (t !== tok) return;
      }
      qi++;
    }
    if (t === tok && modoQuiz) fin();
  }
  function ctrlVoz() { return '<div class="cq-fila cq-ctrl"><button class="cq-btn" data-c="ant">⏮</button><button class="cq-btn p" data-c="play">' + (bar.dataset.p ? '▶ Seguir' : '⏸ Pausa') + '</button><button class="cq-btn m" data-c="x">⏹ Parar</button><button class="cq-btn" data-c="sig">⏭</button></div>'; }
  quizCtrlClick = function (e) { var b = e.target.closest('[data-c]'); if (!b || !modoQuiz) return; var a = b.getAttribute('data-c'); quizBar(a); if (a === 'play') b.textContent = bar.dataset.p ? '▶ Seguir' : '⏸ Pausa'; };
  function quizBar(a) {
    if (a === 'x') { quizAbortar(); pintaInicio(); return; }
    if (a === 'play') { if (tok && !bar.dataset.p) { bar.dataset.p = '1'; parar(); $('[data-a="play"]', bar).textContent = '▶'; } else { delete bar.dataset.p; $('[data-a="play"]', bar).textContent = '⏸'; quizVoz(); } return; }
    if (a === 'sig') { qi = Math.min(cola.length, qi + 1); delete bar.dataset.p; quizVoz(); return; }
    if (a === 'ant') { qi = Math.max(0, qi - 1); delete bar.dataset.p; quizVoz(); return; }
    if (a === 'vmenos' || a === 'vmas') { vel = Math.max(0.6, Math.min(1.8, vel + (a === 'vmas' ? 0.1 : -0.1))); ls('clave-vel', String(vel)); pintaVel(); if (!bar.dataset.p) quizVoz(); }
  }
  function quizAbortar() { if (modoQuiz) { modoQuiz = false; parar(); bar.classList.remove('on'); pantalla(false); delete bar.dataset.p; } }

  window.addEventListener('pagehide', function () { parar(); });
  function arranca() { if (D.getElementById('cq-quiz') === null) { }  recoge(); crearQuiz(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', arranca); else arranca();
})();
