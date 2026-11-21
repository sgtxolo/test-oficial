/* ==================== 🎧 COMPARAR EN VOZ (test de conocimientos) ====================
   Botón pequeño junto a «Ver en el esquema» / «Ver en mi temario subrayado».
   Al pulsarlo lee en voz alta, seguido (pensado para el coche):
     1) la respuesta y la explicación del test,
     2) lo que dice el esquema en el sitio de esa pregunta (primero la respuesta marcada, luego el párrafo literal).
   Así se oyen las dos versiones una detrás de otra para compararlas.
   El temario subrayado son imágenes de tu PDF (no hay texto que leer); el esquema lleva el mismo texto literal. */
(function () {
  var ETIQ = '🎧 Comparar en voz';
  var tok = 0, frame = null;

  function limpiar(t) { return String(t || '').replace(/\s+/g, ' ').trim(); }

  function parar() {
    tok++;
    try { window.speechSynthesis.cancel(); } catch (e) {}
    if (frame) { try { frame.remove(); } catch (e) {} frame = null; }
    document.querySelectorAll('.btn-comparar-voz.hablando').forEach(function (b) { b.classList.remove('hablando'); b.textContent = ETIQ; });
  }

  // otras lecturas (botón ▶ de la explicación, lectura de preguntas) cortan esta
  ['vozExplParar', 'vozCancelar'].forEach(function (n) {
    var o = window[n];
    if (typeof o !== 'function') return;
    window[n] = function () { if (tok >= 0) { tok++; if (frame) { try { frame.remove(); } catch (e) {} frame = null; } document.querySelectorAll('.btn-comparar-voz.hablando').forEach(function (b) { b.classList.remove('hablando'); b.textContent = ETIQ; }); } return o.apply(this, arguments); };
  });

  // trozos de ≤ ~220 caracteres cortados por frases (evita que el navegador se corte)
  function partir(txt) {
    var fr = limpiar(txt).match(/[^.?!;:]+[.?!;:]?/g) || [], out = [], cur = '';
    fr.forEach(function (f) {
      if ((cur + f).length > 220 && cur) { out.push(cur.trim()); cur = ''; }
      while (f.length > 260) { var k = f.lastIndexOf(' ', 220); if (k < 50) k = 220; out.push(f.slice(0, k).trim()); f = f.slice(k); }
      cur += f;
    });
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  function leerEsquema(id, cb) {
    var f = document.createElement('iframe');
    f.style.cssText = 'position:fixed;left:-9999px;top:0;width:900px;height:700px;border:0;visibility:hidden';
    f.src = 'esquemas.html?embed=1#q=' + encodeURIComponent(id);
    document.body.appendChild(f); frame = f;
    var n = 0, iv = setInterval(function () {
      if (frame !== f) return clearInterval(iv);
      n++;
      var d = null; try { d = f.contentDocument; } catch (e) {}
      var el = d && d.querySelector('.flash');
      if (el || n > 50) {
        clearInterval(iv);
        setTimeout(function () {
          if (frame !== f) return;
          var res = { resp: '', par: '' };
          if (d) {
            var li = Array.prototype.slice.call(d.querySelectorAll('.r-lila')).map(function (x) { return limpiar(x.textContent); }).filter(Boolean);
            var e2 = d.querySelector('.flash') || el;
            if (e2) {
              var p = e2.closest ? (e2.closest('p') || e2) : e2;
              res.par = limpiar(p.textContent);
              if (e2.matches && e2.matches('mark')) res.resp = limpiar(e2.textContent);
            }
            if (li.length) res.resp = li.join(' ');
          }
          try { f.remove(); } catch (e) {} if (frame === f) frame = null;
          cb(res);
        }, 500);
      }
    }, 300);
  }

  function hablarLista(lista, miTok, fin) {
    var voz = (typeof mejorVozEspanol === 'function') ? mejorVozEspanol() : null, i = 0;
    var sig = function () {
      if (miTok !== tok) return;
      if (i >= lista.length) return fin();
      var it = lista[i++];
      var u = new SpeechSynthesisUtterance(it.t);
      if (voz) u.voice = voz;
      u.lang = (voz && /^es[-_]ES/i.test(voz.lang)) ? voz.lang : 'es-ES'; u.rate = 0.95; u.pitch = 1;
      var acaba = function () { if (miTok === tok) setTimeout(sig, it.pausa || 150); };
      u.onend = acaba; u.onerror = acaba;
      window.speechSynthesis.speak(u);
    };
    sig();
  }

  window.compararEnVoz = function (btn, id) {
    if (!window.speechSynthesis) return void alert('Tu navegador no soporta lectura en voz alta.');
    if (btn.classList.contains('hablando')) return parar();
    parar();
    var miTok = tok;
    btn.classList.add('hablando'); btn.textContent = '⏹ Parar (cargando esquema…)';

    // 1) respuesta del test
    var caja = btn.closest('.res-item') || btn.parentElement, bv = caja && caja.querySelector('.btn-voz'), lista = [];
    var trozos = []; try { trozos = bv ? trozosExplicacion(bv) : []; } catch (e) {}
    lista.push({ t: 'Respuesta del test.', pausa: 500 });
    trozos.forEach(function (t) { partir(t).forEach(function (x) { lista.push({ t: x }); }); lista.push({ t: '', pausa: 0 }); });
    lista = lista.filter(function (x) { return x.t; });
    if (lista.length) lista[lista.length - 1].pausa = 1500;

    // 2) esquema (se carga en segundo plano mientras se lee la respuesta del test)
    var esq = null, listoLectura = false, hecho = false;
    function terminar() { if (miTok !== tok) return; btn.classList.remove('hablando'); btn.textContent = ETIQ; }
    function leerFinal() {
      if (miTok !== tok || hecho) return; hecho = true;
      btn.textContent = '⏹ Parar';
      var l2 = [];
      if (!esq || (!esq.resp && !esq.par)) l2.push({ t: 'No he encontrado el texto de esta pregunta en el esquema.' });
      else {
        l2.push({ t: 'Ahora, lo que dice el esquema.', pausa: 500 });
        if (esq.resp) { l2.push({ t: 'La respuesta marcada dice:', pausa: 300 }); partir(esq.resp).forEach(function (x) { l2.push({ t: x }); }); l2[l2.length - 1].pausa = 900; }
        if (esq.par && esq.par.replace(/\W/g, '') !== (esq.resp || '').replace(/\W/g, '')) {
          l2.push({ t: esq.resp ? 'El párrafo completo:' : 'El párrafo dice:', pausa: 300 });
          partir(esq.par.slice(0, 1500)).forEach(function (x) { l2.push({ t: x }); });
        }
      }
      hablarLista(l2, miTok, terminar);
    }
    leerEsquema(id, function (r) { esq = r; if (listoLectura) leerFinal(); });
    hablarLista(lista, miTok, function () { listoLectura = true; if (esq) leerFinal(); else btn.textContent = '⏹ Parar (cargando esquema…)'; });
    if (!lista.length) { listoLectura = true; }
  };

  // botón en cada explicación (tema con esquema)
  if (typeof window.explicBoxHTML === 'function') {
    var original = window.explicBoxHTML;
    window.explicBoxHTML = function (e, a) {
      var h = original.apply(this, arguments);
      try {
        var id = e && e.id ? String(e.id) : '', t = (e && e.temaId) || parseInt(id, 10);
        if (id && Array.isArray(window.ESQ_TEMAS) && window.ESQ_TEMAS.indexOf(+t) >= 0)
          h += '<button type="button" class="btn-ver-esquema btn-comparar-voz" onclick="compararEnVoz(this,\'' + id.replace(/'/g, '') + '\')" title="Lee la respuesta del test y después lo que dice el esquema">' + ETIQ + '</button>';
      } catch (err) {}
      return h;
    };
  }
  var st = document.createElement('style');
  st.textContent = '.btn-comparar-voz{margin-left:6px}.btn-comparar-voz.hablando{background:#2563eb;color:#fff;border-color:#2563eb}';
  document.head.appendChild(st);
})();
