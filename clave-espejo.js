/* Espejo de las barras fijas del Esquema clave.
   Dentro de expres-subrayado.html el esquema clave va en un iframe tan alto como su contenido (sin scroll propio): una barra «fija» dentro del marco quedaba
   en medio de la página al hacer scroll. Solución: la barra se COPIA a un contenedor fijo de la página padre (siempre pegado al borde inferior de la pantalla)
   y los toques de esa copia se reenvían al marco, que ejecuta la acción (clic en el botón con ese id, cambio de un <select>, clic en la barra de progreso).
   Uso (dentro del marco):  ClaveEspejo.registrar('nar', () => elemento, /#cl-nar\b/, {bar: frac => …});  ClaveEspejo.actualiza('nar');  ClaveEspejo.quita('nar');
   Si la página padre no responde (versión antigua en caché), las barras originales siguen visibles y funcionando como antes. */
(function () {
  'use strict';
  if (window.ClaveEspejo) return;
  var emb = false; try { emb = window.parent !== window; } catch (e) {}
  var L = {}, ok = false, st = null;
  function nada() {}
  if (!emb) { window.ClaveEspejo = { registrar: nada, actualiza: nada, quita: nada, activo: function () { return false; } }; return; }

  st = document.createElement('style'); st.textContent = '.cl-espejado{display:none!important}'; document.head.appendChild(st);

  function selNuevo(s) { return s.replace(/#([A-Za-z][\w-]*)/g, '[data-cid="$1"]'); }
  function cssDe(re) {
    var o = [];
    function regla(r) { return selNuevo(r.selectorText) + '{' + r.style.cssText + '}'; }
    try {
      Array.prototype.forEach.call(document.styleSheets, function (h) {
        var rs; try { rs = h.cssRules; } catch (e) { return; }
        Array.prototype.forEach.call(rs, function (r) {
          if (r.type === 1) { if (re.test(r.selectorText) && !/\bbody\b|\bhtml\b/.test(r.selectorText)) o.push(regla(r)); }
          else if (r.type === 4) {
            var dentro = []; Array.prototype.forEach.call(r.cssRules, function (q) { if (q.type === 1 && re.test(q.selectorText) && !/\bbody\b|\bhtml\b/.test(q.selectorText)) dentro.push(regla(q)); });
            if (dentro.length) o.push('@media ' + r.media.mediaText + '{' + dentro.join('\n') + '}');
          }
        });
      });
    } catch (e) {}
    return o.join('\n');
  }
  function serializa(el) {
    var c = el.cloneNode(true), a = el.tagName === 'SELECT' ? [el] : Array.prototype.slice.call(el.querySelectorAll('select')), b = c.tagName === 'SELECT' ? [c] : Array.prototype.slice.call(c.querySelectorAll('select'));
    a.forEach(function (s, i) { if (!b[i]) return; Array.prototype.forEach.call(b[i].options, function (o, k) { if (k === s.selectedIndex) o.setAttribute('selected', 'selected'); else o.removeAttribute('selected'); }); });
    c.removeAttribute('style'); c.classList.remove('cl-espejado');
    return c.outerHTML.replace(/\sid="([^"]+)"/g, ' data-cid="$1"');
  }
  var pend = {}, raf = 0;
  function envia(n) {
    var d = L[n]; if (!d) return; var el = d.el();
    try {
      var oc = el && el.classList.contains('cl-espejado'); if (oc) el.classList.remove('cl-espejado');
      var vis = !!(el && el.parentNode) && getComputedStyle(el).display !== 'none'; if (oc) el.classList.add('cl-espejado');
      if (!vis) { parent.postMessage({ claveEspejo: { n: n, html: '', css: '' } }, '*'); return; }
      parent.postMessage({ claveEspejo: { n: n, html: serializa(el), css: d.css || (d.css = cssDe(d.re)) } }, '*');
    } catch (e) {}
  }
  function planifica(n) {
    pend[n] = 1; if (raf) return;
    raf = (window.requestAnimationFrame || setTimeout)(function () { raf = 0; var k = Object.keys(pend); pend = {}; k.forEach(envia); });
  }
  function oculta(n, si) { var d = L[n], el = d && d.el(); if (el) el.classList.toggle('cl-espejado', !!si && ok); }
  window.addEventListener('message', function (e) {
    var d = e.data; if (!d) return;
    if (d.claveEspejoOk) { ok = true; Object.keys(L).forEach(function (n) { oculta(n, true); }); return; }
    var a = d.claveAccion; if (!a) return;
    try {
      if (a.bar !== undefined) { var f = L[a.n]; if (f && f.bar) f.bar(a.bar); return; }
      if (a.da !== undefined) { var bt = document.querySelector('[data-a="' + a.da + '"]'); if (bt) bt.click(); return; }
      var el = document.getElementById(a.id); if (!el) return;
      if (a.val !== undefined) { el.value = a.val; el.dispatchEvent(new Event('change', { bubbles: true })); } else el.click();
    } catch (er) {}
  });
  window.ClaveEspejo = {
    registrar: function (n, el, re, op) {
      L[n] = { el: el, re: re, bar: op && op.bar, css: '', mo: null };
      var e0 = el(); if (!e0) return;
      if (window.MutationObserver) { L[n].mo = new MutationObserver(function () { planifica(n); }); L[n].mo.observe(e0, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'value', 'selected'] }); }
      try { parent.postMessage({ claveListo: 1 }, '*'); } catch (e) {}
      oculta(n, true); planifica(n);
    },
    actualiza: function (n) { if (L[n]) planifica(n); },
    quita: function (n) { var d = L[n]; if (!d) return; if (d.mo) d.mo.disconnect(); delete L[n]; try { parent.postMessage({ claveEspejo: { n: n, html: '', css: '' } }, '*'); } catch (e) {} },
    activo: function () { return ok; }
  };
  if (window.MutationObserver) new MutationObserver(function () { Object.keys(L).forEach(planifica); }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('pagehide', function () { Object.keys(L).forEach(function (n) { try { parent.postMessage({ claveEspejo: { n: n, html: '', css: '' } }, '*'); } catch (e) {} }); });
})();
