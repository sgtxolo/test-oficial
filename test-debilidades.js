/* Panel «Hoy toca» + «Mis fallos por epígrafe» + «Exprés de mis fallos» para la app de conocimientos.
   Se engancha a renderRefuerzo() (pantalla «Temas a reforzar»). No toca el estado guardado: solo lee state.qStats.
   Agrupa por NORMA + EPÍGRAFE sacados del enunciado («Ley X. Epígrafe. Pregunta…»), que es lo que llevan todas las preguntas. */
(function () {
  'use strict';
  if (window.__debilidadesCargado) return; window.__debilidadesCargado = true;

  var MIN_VISTAS = 3;       // mínimo de respuestas para que un epígrafe cuente en el ranking
  var MAX_FILAS = 12;       // epígrafes que se muestran
  var TANDA = 20;           // preguntas por repaso

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function corto(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  /* Norma y epígrafe a partir del enunciado. */
  function claveDe(q) {
    var t = String(q.pregunta || '').replace(/\s+/g, ' ').trim();
    var partes = t.split(/\.\s+(?=[A-ZÁÉÍÓÚÑ¿«"“])/);
    var norma = corto(partes[0] || t, 110), epi = '';
    if (partes.length > 2 && partes[1].length <= 100 && !/[:?]$/.test(partes[1])) epi = partes[1].replace(/\.$/, '');
    return { norma: norma, epi: epi };
  }

  function recorrer(fn) {
    if (typeof TEMARIO === 'undefined' || typeof todasPreguntasDe !== 'function') return;
    TEMARIO.forEach(function (t) {
      var lista; try { lista = todasPreguntasDe(t.id) || []; } catch (e) { lista = []; }
      lista.forEach(function (q) { fn(t, q, statsDe(q.id)); });
    });
  }

  function agrupar() {
    var g = {};
    recorrer(function (t, q, st) {
      if (!st || !st.vistas) return;
      var c = claveDe(q), k = t.id + '|' + c.norma + '|' + c.epi;
      var o = g[k] || (g[k] = { temaId: t.id, tema: t, norma: c.norma, epi: c.epi, vistas: 0, falladas: 0, qs: [] });
      o.vistas += st.vistas; o.falladas += st.falladas; o.qs.push(Object.assign({ temaId: t.id }, q));
    });
    return Object.keys(g).map(function (k) { return g[k]; });
  }

  function pctAcierto(o) { return o.vistas ? Math.round((o.vistas - o.falladas) / o.vistas * 100) : null; }
  function clasePct(p) { return p >= 70 ? 'pct-good' : p >= 40 ? 'pct-mid' : 'pct-bad'; }

  function lanzar(qs, inmediata) {
    qs = (qs || []).slice(0, TANDA);
    if (!qs.length) { alert('No hay preguntas para repasar ahora.'); return; }
    iniciarTest(shuffle(qs.slice()), inmediata !== false);
  }
  function lanzarGrupo(i) {
    var o = window.__debGrupos && window.__debGrupos[i]; if (!o) return;
    var f = o.qs.filter(function (q) { return statsDe(q.id).ultimaCorrecta === false; });
    var resto = o.qs.filter(function (q) { return statsDe(q.id).ultimaCorrecta !== false; });
    lanzar(f.concat(resto));
  }

  function panelHTML() {
    var h = '';
    var venc = 0, fall = 0;
    try { venc = bancoRepaso().length; fall = bancoFallos().length; } catch (e) {}
    var aband = 0;
    try { TEMARIO.forEach(function (t) { if (temaEstudiado(t.id)) { var d = diasSinTocarTema(t.id); if (d !== null && d >= 5) aband++; } }); } catch (e) {}

    h += '<div class="perfil-section-title">Hoy toca</div>';
    h += '<div class="hist-item"><div class="hist-mid" style="flex:1"><strong>Repaso espaciado vencido</strong><span>' + venc + ' pregunta' + (venc === 1 ? '' : 's') + ' que ya tocan (te saco ' + Math.min(venc, TANDA) + ')</span></div>' +
      '<button class="btn-test-rapido" style="margin:0" onclick="debRepaso()"' + (venc ? '' : ' disabled') + '>Repasar</button></div>';
    h += '<div class="hist-item"><div class="hist-mid" style="flex:1"><strong>Falladas la última vez</strong><span>' + fall + ' pregunta' + (fall === 1 ? '' : 's') + ' sin corregir todavía</span></div>' +
      '<button class="btn-test-rapido" style="margin:0" onclick="debFallos()"' + (fall ? '' : ' disabled') + '>Repasar</button></div>';
    h += '<div class="hist-item"><div class="hist-mid" style="flex:1"><strong>Temas enfriándose</strong><span>' + aband + ' tema' + (aband === 1 ? '' : 's') + ' llevan 5 días o más sin tocarse (lista más abajo)</span></div></div>';
    h += '<div class="hist-item"><div class="hist-mid" style="flex:1"><strong>Exprés de mis fallos</strong><span>Hoja de lectura con las preguntas que tienes falladas y su respuesta</span></div>' +
      '<button class="btn-test-rapido" style="margin:0" onclick="debExpres()"' + (fall ? '' : ' disabled') + '>Abrir</button></div>';

    var grupos = agrupar().filter(function (o) { return o.vistas >= MIN_VISTAS && o.falladas > 0; });
    grupos.sort(function (a, b) { return (a.vistas - a.falladas) / a.vistas - (b.vistas - b.falladas) / b.vistas || b.falladas - a.falladas; });
    grupos = grupos.slice(0, MAX_FILAS);
    window.__debGrupos = grupos;

    h += '<div class="perfil-section-title">Mis fallos por norma y epígrafe</div>';
    if (!grupos.length) {
      h += '<p class="empty-hint">Cuando respondas al menos ' + MIN_VISTAS + ' preguntas de un mismo epígrafe y falles alguna, saldrá aquí.</p>';
    } else {
      h += grupos.map(function (o, i) {
        var p = pctAcierto(o);
        return '<div class="hist-item"><div class="hist-mid" style="flex:1"><strong>' + esc(corto(o.norma, 90)) + (o.epi ? ' · ' + esc(corto(o.epi, 70)) : '') + '</strong>' +
          '<span>' + esc(corto(temaNombre(o.tema), 60)) + ' · ' + o.falladas + ' fallos de ' + o.vistas + ' respuestas</span></div>' +
          '<div class="hist-pct ' + clasePct(p) + '">' + p + '%</div>' +
          '<button class="btn-test-rapido" style="margin:0 0 0 10px" onclick="debGrupo(' + i + ')">Repasar</button></div>';
      }).join('');
    }
    return h;
  }

  function pintar() {
    var s = document.getElementById('screen-refuerzo'); if (!s) return;
    var d = document.getElementById('deb-panel');
    if (!d) {
      d = document.createElement('div'); d.id = 'deb-panel';
      var cab = s.querySelector('.subscreen-head');
      if (cab && cab.nextSibling) s.insertBefore(d, cab.nextSibling); else s.appendChild(d);
    }
    try { d.innerHTML = panelHTML(); } catch (e) { d.innerHTML = '<p class="empty-hint">No se pudo calcular el panel de debilidades.</p>'; }
  }

  /* ---- Exprés de mis fallos ---- */
  function expres() {
    var porTema = {}, n = 0;
    recorrer(function (t, q, st) {
      if (st && st.ultimaCorrecta === false) { (porTema[t.id] = porTema[t.id] || { t: t, qs: [] }).qs.push(q); n++; }
    });
    var L = ['A', 'B', 'C', 'D'];
    var h = '<div style="position:sticky;top:0;background:#fff;padding:10px 14px;border-bottom:1px solid #ddd;display:flex;gap:10px;align-items:center;z-index:2">' +
      '<b style="flex:1">Exprés de mis fallos · ' + n + ' preguntas</b>' +
      '<button class="btn-test-rapido" style="margin:0" onclick="window.print()">🖨 Imprimir</button>' +
      '<button class="btn-test-rapido" style="margin:0" onclick="document.getElementById(\'deb-expres\').remove()">Cerrar</button></div><div style="padding:12px 16px;max-width:900px;margin:0 auto">';
    Object.keys(porTema).forEach(function (k) {
      var x = porTema[k];
      h += '<h3 style="margin:18px 0 6px">' + esc(temaNombre(x.t)) + ' (' + x.qs.length + ')</h3>';
      x.qs.forEach(function (q) {
        var c = typeof q.correcta === 'number' ? q.correcta : -1;
        h += '<div style="border:1px solid #ddd;border-radius:8px;padding:8px 10px;margin:6px 0;break-inside:avoid">' +
          '<div style="font-size:.92em">' + esc(q.pregunta) + '</div>' +
          (c >= 0 && q.opciones ? '<div style="margin-top:4px;color:#1a7a3a"><b>' + L[c] + ')</b> ' + esc(q.opciones[c]) + '</div>' : '') +
          (q.explicacion ? '<div style="margin-top:4px;font-size:.85em;color:#555">' + q.explicacion + '</div>' : '') + '</div>';
      });
    });
    h += '</div>';
    var o = document.getElementById('deb-expres'); if (o) o.remove();
    o = document.createElement('div'); o.id = 'deb-expres';
    o.style.cssText = 'position:fixed;inset:0;background:#fff;color:#222;overflow:auto;z-index:99999';
    o.innerHTML = h; document.body.appendChild(o);
  }

  window.debRepaso = function () { lanzar(bancoRepaso()); };
  window.debFallos = function () { lanzar(bancoFallos()); };
  window.debGrupo = lanzarGrupo;
  window.debExpres = expres;

  var original = window.renderRefuerzo;
  if (typeof original === 'function') {
    window.renderRefuerzo = function () { var r = original.apply(this, arguments); pintar(); return r; };
  }
})();
