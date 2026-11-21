/* 🎧 Oír la respuesta de la pregunta (esquemas.html y expres-subrayado.html).
   El test de conocimientos abre estas páginas con la respuesta en la dirección (#q=ID&r=TEXTO).
   Aquí se lee en voz alta (voz de España) con un botón de cascos: VozResp.toggle().
   En Esquemas aparece además un botón redondo flotante; en el temario subrayado el botón va junto a las tijeras de cada artículo. */
(function () {
  'use strict';
  var m = (location.hash || '').match(/[#&]r=([^&]*)/), texto = '';
  try { texto = m ? decodeURIComponent(m[1]) : ''; } catch (e) {}
  var tok = 0, hablando = false, voz = null;

  function elegirVoz() {
    if (voz) return voz;
    var v = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    var es = v.filter(function (x) { return /^es[-_]ES/i.test(x.lang) || /spain|españa|castellano/i.test(x.name); });
    if (!es.length) es = v.filter(function (x) { return /^es/i.test(x.lang) && !/es[-_](MX|US|AR|CO|CL|PE|VE|419)|mexic|estados unidos|latino|argentin|colomb/i.test(x.lang + ' ' + x.name); });
    if (!es.length) es = v.filter(function (x) { return /^es/i.test(x.lang); });
    if (!es.length) return null;
    var M = /jorge|pablo|diego|alvaro|álvaro|enrique|carlos|raul|raúl|tomas|tomás|jose|josé|fernando|antonio|miguel|male/i;
    var pool = es.filter(function (x) { return !M.test(x.name); }); if (!pool.length) pool = es;
    var pref = [/neural/i, /natural/i, /online/i, /elvira/i, /helena/i, /laura/i, /lucia|lucía/i, /google/i];
    for (var i = 0; i < pref.length; i++) { var f = pool.filter(function (x) { return pref[i].test(x.name); })[0]; if (f) return (voz = f); }
    return (voz = pool.filter(function (x) { return /es-ES/i.test(x.lang); })[0] || pool[0]);
  }
  if (window.speechSynthesis) speechSynthesis.onvoiceschanged = function () { voz = null; };

  function estado() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-vozresp]'), function (b) { b.classList.toggle('hablando', hablando); });
  }
  function parar() { tok++; hablando = false; try { speechSynthesis.cancel(); } catch (e) {} estado(); }

  function leer() {
    var t = ++tok, trozos = (texto.replace(/\s+/g, ' ').trim().match(/[^.?!;:]+[.?!;:]?/g) || []).map(function (x) { return x.trim(); }).filter(Boolean), i = 0;
    try { speechSynthesis.cancel(); } catch (e) {}
    hablando = true; estado();
    (function sig() {
      if (t !== tok) return;
      if (i >= trozos.length) { hablando = false; estado(); return; }
      var u = new SpeechSynthesisUtterance(trozos[i++]), v = elegirVoz();
      if (v) u.voice = v; u.lang = (v && /^es[-_]ES/i.test(v.lang)) ? v.lang : 'es-ES'; u.rate = 0.95; u.pitch = 1;
      var fin = function () { if (t === tok) setTimeout(sig, 200); };
      u.onend = fin; u.onerror = fin; speechSynthesis.speak(u);
    })();
  }

  window.VozResp = {
    hay: function () { return !!texto; },
    toggle: function () {
      if (!window.speechSynthesis) { alert('Tu navegador no soporta lectura en voz alta.'); return; }
      if (hablando) return parar();
      if (!texto) { var msg = 'Abre este artículo desde la pregunta del test (botón «Ver en el esquema» o «Ver en mi temario subrayado») para oír su respuesta.'; if (typeof window.aviso === 'function') window.aviso(msg); else alert(msg); return; }
      leer();
    },
    parar: parar
  };
  window.addEventListener('pagehide', parar);

  var css = document.createElement('style');
  css.textContent = '[data-vozresp].hablando{background:#2563eb!important;color:#fff!important;border-color:#2563eb!important}'
    + '#vozresp-flot{position:fixed;right:14px;bottom:96px;width:54px;height:54px;border-radius:50%;border:0;background:#14532d;color:#fff;font-size:26px;box-shadow:0 6px 18px rgba(0,0,0,.3);z-index:9998;cursor:pointer;line-height:1}'
    + '@media print{#vozresp-flot{display:none!important}}';
  document.head.appendChild(css);

  // en Esquemas: botón flotante de cascos (solo si se llega con la respuesta de una pregunta)
  if (texto && /esquemas\.html/i.test(location.pathname)) {
    var b = document.createElement('button');
    b.id = 'vozresp-flot'; b.type = 'button'; b.setAttribute('data-vozresp', '1'); b.title = 'Oír la respuesta de la pregunta'; b.textContent = '🎧';
    b.onclick = function () { window.VozResp.toggle(); };
    (document.body ? Promise.resolve() : new Promise(function (ok) { document.addEventListener('DOMContentLoaded', ok); })).then(function () { document.body.appendChild(b); });
  }
})();
