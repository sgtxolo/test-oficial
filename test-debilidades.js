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
    var dud = 0; try { dud = dudosos().length; } catch (e) {}
    h += '<div class="hist-item"><div class="hist-mid" style="flex:1"><strong>Aciertos con duda</strong><span>' + dud + ' que aciertas pero tardas mucho en responder</span></div>' +
      '<button class="btn-test-rapido" style="margin:0" onclick="debDudosos()"' + (dud ? '' : ' disabled') + '>Repasar</button></div>';
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
    h += ajustesSimHTML();
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

  /* ---- Ajustes del simulacro (tiempo y penalización) ---- */
  function cfgSim() {
    var c = { minutos: 90, pen: '1/3' };
    try { Object.assign(c, JSON.parse(localStorage.getItem('deb-sim-cfg') || '{}')); } catch (e) {}
    return c;
  }
  window.SIM_MIN = function () { var m = parseInt(cfgSim().minutos, 10); return m > 0 && m <= 300 ? m : 90; };
  window.SIM_PEN = function () { var p = cfgSim().pen; return p === '0' ? 0 : p === '1/2' ? 0.5 : p === '1/4' ? 0.25 : 1 / 3; };
  window.SIM_PEN_TXT = function () {
    var p = cfgSim().pen;
    return p === '0' ? 'sin penalización' : p === '1/2' ? '2 fallos = -1 acierto' : p === '1/4' ? '4 fallos = -1 acierto' : '3 fallos = -1 acierto';
  };
  function textoModalSim() {
    document.querySelectorAll('.n-box').forEach(function (b) {
      var s = b.querySelector('span'), v = b.querySelector('.n-val');
      if (s && v && /penalizaci/.test(s.textContent)) { v.textContent = SIM_MIN(); s.textContent = 'Minutos, con cronómetro y corrección con penalización (' + SIM_PEN_TXT() + ')'; }
    });
  }
  window.debGuardarSim = function () {
    var m = document.getElementById('deb-sim-min'), p = document.getElementById('deb-sim-pen');
    var min = parseInt(m && m.value, 10);
    if (!(min > 0 && min <= 300)) { alert('Pon un tiempo entre 1 y 300 minutos.'); return; }
    try { localStorage.setItem('deb-sim-cfg', JSON.stringify({ minutos: min, pen: p ? p.value : '1/3' })); } catch (e) {}
    textoModalSim();
    alert('Simulacro: ' + SIM_MIN() + ' minutos, ' + SIM_PEN_TXT() + '.');
  };
  function ajustesSimHTML() {
    var c = cfgSim();
    function op(v, t) { return '<option value="' + v + '"' + (c.pen === v ? ' selected' : '') + '>' + t + '</option>'; }
    return '<div class="perfil-section-title">Ajustes del simulacro</div>' +
      '<div class="hist-item"><div class="hist-mid" style="flex:1"><strong>Según tu convocatoria</strong>' +
      '<span>Tiempo <input id="deb-sim-min" type="number" min="1" max="300" value="' + SIM_MIN() + '" style="width:64px"> min · cada fallo resta ' +
      '<select id="deb-sim-pen">' + op('1/3', '1/3 de acierto') + op('1/4', '1/4 de acierto') + op('1/2', '1/2 acierto') + op('0', 'nada') + '</select></span></div>' +
      '<button class="btn-test-rapido" style="margin:0" onclick="debGuardarSim()">Guardar</button></div>';
  }

  /* ---- Aciertos con duda: aciertas pero tardas mucho ---- */
  function dudosos() {
    var medias = [], lista = [];
    recorrer(function (t, q, st) { if (st && st.tiempoCount) medias.push(st.tiempoTotalMs / st.tiempoCount); });
    if (medias.length < 20) return [];
    medias.sort(function (a, b) { return a - b; });
    var umbral = Math.max(30000, 1.5 * medias[Math.floor(medias.length / 2)]);
    recorrer(function (t, q, st) {
      if (st && st.ultimaCorrecta === true && st.tiempoCount) {
        var m = st.tiempoTotalMs / st.tiempoCount;
        if (m >= umbral) lista.push({ q: Object.assign({ temaId: t.id }, q), m: m });
      }
    });
    lista.sort(function (a, b) { return b.m - a.m; });
    return lista.map(function (x) { return x.q; });
  }
  window.debDudosos = function () { lanzar(dudosos()); };

  /* ---- Repaso de hoy: vencidas + falladas, sin repetir ---- */
  function poolHoy() {
    var vistos = {}, out = [];
    bancoFallos().concat(bancoRepaso()).forEach(function (q) { if (!vistos[q.id]) { vistos[q.id] = 1; out.push(q); } });
    return out;
  }
  window.debHoy = function () { lanzar(poolHoy()); };

  /* ---- Copia de seguridad: aviso cada 7 días ---- */
  var DIAS_COPIA = 7;
  function diasSinCopia() {
    var t = 0;
    try { t = parseInt(localStorage.getItem('deb-ultimo-backup') || '0', 10); } catch (e) {}
    if (!t) { try { localStorage.setItem('deb-ultimo-backup', String(Date.now())); } catch (e) {} return 0; }
    return Math.floor((Date.now() - t) / 864e5);
  }
  var exportOriginal = window.exportarProgreso;
  if (typeof exportOriginal === 'function') {
    window.exportarProgreso = function () {
      var r = exportOriginal.apply(this, arguments);
      try { localStorage.setItem('deb-ultimo-backup', String(Date.now())); } catch (e) {}
      setTimeout(function () { try { pintarInicio(); } catch (e) {} }, 300);
      return r;
    };
  }

  /* ---- «Hoy toca» en la pantalla de inicio ---- */
  function pintarInicio() {
    var s = document.getElementById('screen-inicio'); if (!s) return;
    var d = document.getElementById('deb-home');
    if (!d) {
      d = document.createElement('div'); d.id = 'deb-home'; d.style.cssText = 'margin:10px 0';
      var sal = s.querySelector('.saludo');
      if (sal && sal.parentNode) sal.parentNode.insertBefore(d, sal.nextSibling); else s.insertBefore(d, s.firstChild);
    }
    var venc = 0, fall = 0, dud = 0, pool = 0;
    try { venc = bancoRepaso().length; fall = bancoFallos().length; dud = dudosos().length; pool = poolHoy().length; } catch (e) {}
    var h = '<div class="hist-item" style="flex-wrap:wrap"><div class="hist-mid" style="flex:1;min-width:200px"><strong>Hoy toca</strong>' +
      '<span>' + venc + ' de repaso · ' + fall + ' falladas · ' + dud + ' aciertos con duda</span></div>' +
      '<button class="btn-test-rapido" style="margin:0"' + (pool ? '' : ' disabled') + ' onclick="debHoy()">Repasar ahora</button></div>';
    var dias = diasSinCopia();
    if (dias >= DIAS_COPIA) {
      h += '<div class="hist-item" style="border-left:4px solid #d1554a"><div class="hist-mid" style="flex:1"><strong>Copia de seguridad</strong>' +
        '<span>Hace ' + dias + ' días que no exportas tu progreso. Si se borra la caché, lo pierdes.</span></div>' +
        '<button class="btn-test-rapido" style="margin:0" onclick="exportarProgreso()">Exportar</button></div>';
    }
    d.innerHTML = h;
  }

  /* ---- Tras un simulacro: qué temas te han hundido la nota ---- */
  function desgloseSimulacro(det) {
    var r = {};
    (det || []).forEach(function (d) {
      var x = r[d.temaId] || (r[d.temaId] = { a: 0, f: 0 });
      if (d.esCorrecta) x.a++; else x.f++;
    });
    var pen = SIM_PEN(), filas = [];
    Object.keys(PESO_TEMAS).forEach(function (k) {
      var peso = PESO_TEMAS[k], x = r[k] || { a: 0, f: 0 };
      var blanco = Math.max(0, peso - x.a - x.f);
      var neto = x.a - x.f * pen;
      filas.push({ id: parseInt(k, 10), peso: peso, a: x.a, f: x.f, b: blanco, perdidos: peso - neto });
    });
    filas.sort(function (p, q) { return q.perdidos - p.perdidos; });
    return filas.filter(function (f) { return f.perdidos > 0.01; }).slice(0, 8);
  }
  var resultadoOriginal = window.mostrarResultado;
  if (typeof resultadoOriginal === 'function') {
    window.mostrarResultado = function (e, a, o, n) {
      var r = resultadoOriginal.apply(this, arguments);
      try {
        var prev = document.getElementById('deb-sim-res'); if (prev) prev.remove();
        if (n) {
          var filas = desgloseSimulacro(e), grid = document.getElementById('res-stats');
          if (grid && filas.length) {
            var d = document.createElement('div'); d.id = 'deb-sim-res'; d.style.cssText = 'margin:12px 0';
            d.innerHTML = '<div class="perfil-section-title">Temas que más puntos te han costado</div>' + filas.map(function (f) {
              var t = TEMARIO.find(function (x) { return x.id === f.id; });
              return '<div class="hist-item"><div class="hist-mid" style="flex:1"><strong>' + esc(corto(t ? temaNombre(t) : 'Tema ' + f.id, 60)) + '</strong>' +
                '<span>' + f.a + ' aciertos · ' + f.f + ' fallos · ' + f.b + ' en blanco (de ' + f.peso + ')</span></div>' +
                '<div class="hist-pct pct-bad">-' + f.perdidos.toFixed(1) + '</div></div>';
            }).join('');
            grid.parentNode.insertBefore(d, grid.nextSibling);
          }
        }
      } catch (err) {}
      return r;
    };
  }

  var renderInicioOriginal = window.renderInicio;
  if (typeof renderInicioOriginal === 'function') {
    window.renderInicio = function () { var r = renderInicioOriginal.apply(this, arguments); try { pintarInicio(); } catch (e) {} return r; };
  }
  try { textoModalSim(); } catch (e) {}
  try { pintarInicio(); } catch (e) {}

  window.debRepaso = function () { lanzar(bancoRepaso()); };
  window.debFallos = function () { lanzar(bancoFallos()); };
  window.debGrupo = lanzarGrupo;
  window.debExpres = expres;

  var original = window.renderRefuerzo;
  if (typeof original === 'function') {
    window.renderRefuerzo = function () { var r = original.apply(this, arguments); pintar(); return r; };
  }
})();
