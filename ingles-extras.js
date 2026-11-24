/* ============================================================================
   INGLÉS · extras portados de la app de conocimientos (24/11/2026)
   - Pantalla «Mi progreso» (gráfica, informe semanal, informe general, historial con revisión)
   - Pantalla «Temas a reforzar» (nota estimada, evolución, racha, flojos, abandonados, las que más cuestan)
   - Tutor IA (chat), «Hoy toca» + «Repasar ahora», acierto por suerte (🎲)
   - Modalidades nuevas: solo no vistas, bloque de temas, simulacro con y sin tiempo
   - Test: pausa, cronómetro, estadísticas de resultado y revisión Acertadas/Falladas
   - Copia automática en GitHub + copia a prueba de actualizaciones (IndexedDB)
   Se carga al final de test-oficial-ingles.html y envuelve funciones existentes.
   ========================================================================== */
(function () {
  "use strict";
  if (typeof stateEN === "undefined" || typeof QUESTIONS === "undefined") return;

  var $ = function (i) { return document.getElementById(i); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fmtMS(s) { s = Math.max(0, Math.round(s)); var m = Math.floor(s / 60), x = s % 60; return (m < 10 ? "0" : "") + m + ":" + (x < 10 ? "0" : "") + x; }
  function clsPct(p) { return p >= 70 ? "xe-good" : p >= 40 ? "xe-mid" : "xe-bad"; }
  function colPct(p) { return p >= 70 ? "var(--green)" : p >= 40 ? "var(--gold)" : "var(--red)"; }
  function hist() { stateEN.history = stateEN.history || []; return stateEN.history; }
  function pctDe(h) { return h.total ? Math.round(h.aciertos / h.total * 100) : 0; }
  function shuf(a) { return typeof shuffleArr === "function" ? shuffleArr(a) : a.slice().sort(function () { return Math.random() - .5; }); }
  function save() { try { saveStateEN(); } catch (e) {} }

  var _qm = null, _ql = -1;
  function qDe(id) {
    if (!_qm || _ql !== QUESTIONS.length) { _qm = {}; QUESTIONS.forEach(function (q) { if (q.qid) _qm[q.qid] = q; }); _ql = QUESTIONS.length; }
    return _qm[id];
  }
  function temasIds() { return todosTemasIdsEN(); }
  function nomTema(t) { return topicLabel(t); }

  /* ---------- estadísticas por tema (acumuladas de todas las respuestas) ---------- */
  function statsTema(t) {
    var v = 0, f = 0, vq = 0, tot = 0, ult = 0;
    QUESTIONS.forEach(function (q) {
      if (q.t !== t) return; tot++;
      var s = statsDeEN(q.qid);
      if (s.vistas > 0) { vq++; v += s.vistas; f += s.falladas; }
      if (s.ultimaVez > ult) ult = s.ultimaVez;
    });
    return { tot: tot, vistasQ: vq, vistas: v, falladas: f, pct: v ? Math.round((v - f) / v * 100) : null, ultima: ult };
  }
  function notaEstimada() {
    var l = temasIds().map(statsTema).filter(function (s) { return s.vistas >= 5; });
    if (!l.length) return null;
    var m = l.reduce(function (a, s) { return a + s.pct; }, 0) / l.length;
    return { nota: Math.round(m) / 10, con: l.length, total: temasIds().length };
  }
  function evolucionTema(t) {
    return hist().filter(function (h) { return (h.detalle || []).some(function (d) { return d.t === t; }); }).map(function (h) {
      var d = h.detalle.filter(function (x) { return x.t === t; }); var ok = d.filter(function (x) { return x.o; }).length;
      return { fecha: h.fecha, pct: Math.round(ok / d.length * 100) };
    });
  }
  function rachaTema(t) {
    var set = {}; hist().forEach(function (h) { if ((h.detalle || []).some(function (d) { return d.t === t; })) set[h.fecha] = 1; });
    var n = 0, d = new Date(); if (!set[todayStrEN(d)]) d.setDate(d.getDate() - 1);
    while (set[todayStrEN(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function semanaISO(f) {
    var d = new Date(f + "T00:00:00Z"); var dia = (d.getUTCDay() + 6) % 7; d.setUTCDate(d.getUTCDate() - dia + 3);
    var y = d.getUTCFullYear(), j4 = new Date(Date.UTC(y, 0, 4));
    var w = 1 + Math.round(((d - j4) / 864e5 - 3 + ((j4.getUTCDay() + 6) % 7)) / 7);
    return y + "-S" + (w < 10 ? "0" : "") + w;
  }

  /* ---------- CSS ---------- */
  var css = document.createElement("style");
  css.textContent =
    ".xe-tabs{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}" +
    ".xe-tab{flex:1;min-width:76px;padding:9px 6px;border-radius:12px;border:1px solid var(--border);background:var(--card);font-weight:800;font-size:12.5px;color:var(--navy);cursor:pointer;font-family:inherit}" +
    ".xe-tab.on{background:var(--navy);color:#fff;border-color:var(--navy)}" +
    ".xe-row{display:flex;align-items:center;gap:10px;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:10px 12px;margin-bottom:8px}" +
    ".xe-row.click{cursor:pointer}.xe-row .mid{flex:1;min-width:0}.xe-row .mid b{display:block;font-size:13.5px;color:var(--text)}.xe-row .mid span{font-size:12px;color:var(--muted)}" +
    ".xe-date{min-width:42px;text-align:center;line-height:1.1}.xe-date b{display:block;font-size:19px;color:var(--navy)}.xe-date span{font-size:10px;color:var(--muted);font-weight:700}" +
    ".xe-pct{font-weight:800;font-size:15px;min-width:46px;text-align:right}" +
    ".xe-good{color:var(--green)}.xe-mid{color:var(--gold)}.xe-bad{color:var(--red)}" +
    ".xe-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}" +
    ".xe-stat{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:10px 4px;text-align:center}" +
    ".xe-stat b{display:block;font-size:19px;color:var(--navy)}.xe-stat span{font-size:11px;color:var(--muted)}" +
    ".xe-bar{height:6px;background:var(--border);border-radius:4px;overflow:hidden;margin-top:5px}.xe-bar i{display:block;height:100%}" +
    ".xe-canvas{width:100%;height:200px;background:var(--card);border:1px solid var(--border);border-radius:14px;margin-bottom:14px;display:block}" +
    ".xe-empty{color:var(--muted);font-size:13px;text-align:center;padding:12px 0}" +
    ".xe-h{font-size:15px;font-weight:800;color:var(--navy);margin:18px 0 8px}" +
    ".xe-mini{border:1px solid var(--border);background:var(--card);border-radius:10px;padding:6px 10px;font-weight:800;font-size:12px;color:var(--navy);cursor:pointer;font-family:inherit}" +
    ".xe-pausa{position:fixed;inset:0;background:rgba(22,63,48,.94);z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#fff;gap:10px;text-align:center}" +
    ".xe-pausa .ico{font-size:54px}.xe-pausa button{margin-top:10px;padding:12px 30px;border-radius:14px;border:none;font-weight:800;font-size:16px;background:#fff;color:var(--navy);cursor:pointer}" +
    ".xe-timer{font-weight:800;font-size:13px;color:var(--muted);padding:8px 10px;border:1px solid var(--border);border-radius:12px;background:var(--card)}" +
    ".xe-rev{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:12px;margin-bottom:10px;text-align:left}" +
    ".xe-tag{display:inline-block;font-size:10.5px;font-weight:800;padding:3px 8px;border-radius:8px;margin-bottom:6px;letter-spacing:.04em}" +
    ".xe-tag.ok{background:#e7efe8;color:var(--green)}.xe-tag.ko{background:#fbe9e6;color:var(--red)}" +
    ".xe-rev .xe-q{display:block;font-size:14px;margin:3px 0 8px}.xe-rev .l{font-size:13px;margin-bottom:3px}.xe-rev .fb{font-size:12.5px;color:var(--muted);margin-top:6px}" +
    ".xe-hoy{background:linear-gradient(135deg,var(--navy),var(--sky));color:#fff;border-radius:18px;padding:14px 16px;margin-bottom:16px}" +
    ".xe-hoy .t{font-size:11px;font-weight:800;letter-spacing:.1em;opacity:.85}.xe-hoy b{display:block;font-size:19px;margin:2px 0}.xe-hoy .s{font-size:12.5px;opacity:.9;margin-bottom:10px}" +
    ".xe-hoy button{background:#fff;color:var(--navy);border:none;border-radius:12px;padding:9px 16px;font-weight:800;cursor:pointer;font-family:inherit}" +
    ".xe-chat{display:flex;flex-direction:column;gap:8px;margin-bottom:12px}" +
    ".xe-msg{padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.45;max-width:92%;white-space:pre-wrap}" +
    ".xe-msg.u{align-self:flex-end;background:var(--navy);color:#fff}.xe-msg.a{align-self:flex-start;background:var(--card);border:1px solid var(--border);color:var(--text)}";
  document.head.appendChild(css);

  /* ---------- paneles nuevos ---------- */
  var content = document.querySelector(".content");
  function nuevoPanel(id, html) { var d = document.createElement("div"); d.className = "panel"; d.id = "panel-" + id; d.innerHTML = html; content.appendChild(d); }
  var back = '<button class="qbtn outline" style="margin-bottom:14px" onclick="xeVolver()">← Volver</button>';
  nuevoPanel("actividad", back + '<div class="ctitle" style="font-size:22px;margin-bottom:12px">📈 Mi progreso</div>' +
    '<div class="xe-tabs" id="xe-act-tabs"><button class="xe-tab on" data-t="grafica" onclick="xeActTab(\'grafica\')">Gráfica</button><button class="xe-tab" data-t="semanal" onclick="xeActTab(\'semanal\')">Semanal</button><button class="xe-tab" data-t="general" onclick="xeActTab(\'general\')">General</button><button class="xe-tab" data-t="historial" onclick="xeActTab(\'historial\')">Historial</button></div>' +
    '<div id="xe-act-body"></div>');
  nuevoPanel("refuerzo", back + '<div class="ctitle" style="font-size:22px;margin-bottom:12px">🎯 Temas a reforzar</div><div id="xe-ref-body"></div>');
  nuevoPanel("tutor", back + '<div class="ctitle" style="font-size:22px;margin-bottom:4px">🤖 Tutor IA</div><div class="nlabel" style="margin-bottom:12px">Resuelve tus dudas de gramática inglesa por chat. Necesita la clave de Gemini (Perfil).</div>' +
    '<div class="xe-chat" id="xe-chat"></div><textarea id="xe-tutor-in" class="evo-input" placeholder="Escribe tu duda… (p. ej. ¿cuándo uso «would» y cuándo «used to»?)" style="min-height:70px;margin-bottom:8px"></textarea>' +
    '<div style="display:flex;gap:8px"><button class="qbtn primary" style="flex:1" id="xe-tutor-send" onclick="xeTutorEnviar()">Enviar</button><button class="qbtn outline" onclick="xeTutorNueva()">Nueva conversación</button></div>');

  var modalRev = document.createElement("div");
  modalRev.className = "modal-ov-en hidden"; modalRev.id = "modal-rev-en";
  modalRev.innerHTML = '<div class="modal-head-en"><h2 style="font-size:19px" id="xe-rev-title">Revisión del test</h2><div style="cursor:pointer;font-size:22px;font-weight:800;color:var(--navy)" onclick="xeCerrarRev()">✕</div></div><div class="modal-body-en" id="xe-rev-body"></div>';
  document.body.appendChild(modalRev);

  /* ---------- navegación ---------- */
  var PROPIOS = { actividad: 1, refuerzo: 1, tutor: 1 }, panelAnterior = "inicio";
  var _sp = showPanel;
  showPanel = function (e) {
    if (!PROPIOS[e]) { /* nada */ } else { var act = document.querySelector(".panel.active"); if (act && act.id) { var p = act.id.replace("panel-", ""); if (!PROPIOS[p]) panelAnterior = p; } }
    _sp(e);
    if (e === "actividad") xeActTab(actTab);
    if (e === "refuerzo") renderRefuerzo();
    if (e === "tutor") renderTutor();
  };
  window.xeVolver = function () { showPanel(panelAnterior || "inicio"); };

  /* ---------- gráfico de línea ---------- */
  function lineChart(cv, vals, vacio) {
    var ctx = cv.getContext("2d"), r = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight || 200;
    cv.width = w * r; cv.height = h * r; ctx.setTransform(r, 0, 0, r, 0, 0); ctx.clearRect(0, 0, w, h);
    if (vals.length < 2) { ctx.fillStyle = "#767a70"; ctx.font = "13px sans-serif"; ctx.textAlign = "center"; ctx.fillText(vacio, w / 2, h / 2); return; }
    var p = 22, pw = w - 2 * p - 14, ph = h - 2 * p;
    ctx.font = "10px sans-serif"; ctx.textAlign = "left"; ctx.lineWidth = 1;
    [50, 70, 100].forEach(function (g) { var y = p + ph * (1 - g / 100); ctx.strokeStyle = "rgba(118,122,112,.3)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(p, y); ctx.lineTo(w - 6, y); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = "#767a70"; ctx.fillText(g + "%", 2, y - 3); });
    var pts = vals.map(function (v, i) { return [p + 14 + i * (pw / (vals.length - 1)), p + ph * (1 - v / 100)]; });
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); pts.forEach(function (q) { ctx.lineTo(q[0], q[1]); });
    ctx.lineTo(pts[pts.length - 1][0], p + ph); ctx.lineTo(pts[0][0], p + ph); ctx.closePath(); ctx.fillStyle = "rgba(47,107,82,.10)"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); pts.forEach(function (q) { ctx.lineTo(q[0], q[1]); });
    ctx.strokeStyle = "#163f30"; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.stroke();
    ctx.fillStyle = "#163f30"; pts.forEach(function (q) { ctx.beginPath(); ctx.arc(q[0], q[1], 3.5, 0, 6.2832); ctx.fill(); });
  }

  /* ---------- MI PROGRESO ---------- */
  var actTab = "grafica";
  window.xeActTab = function (t) {
    actTab = t;
    document.querySelectorAll("#xe-act-tabs .xe-tab").forEach(function (b) { b.classList.toggle("on", b.dataset.t === t); });
    var c = $("xe-act-body"), H = hist();
    if (t === "grafica") {
      var tests = H.length, pregs = H.reduce(function (a, h) { return a + h.total; }, 0), ac = H.reduce(function (a, h) { return a + h.aciertos; }, 0);
      var tt = 0, tc = 0; QUESTIONS.forEach(function (q) { var s = statsDeEN(q.qid); tt += s.tiempoTotalMs || 0; tc += s.tiempoCount || 0; });
      c.innerHTML = '<div class="xe-stats"><div class="xe-stat"><b>' + tests + '</b><span>tests</span></div><div class="xe-stat"><b>' + pregs + '</b><span>preguntas</span></div><div class="xe-stat"><b>' + (pregs ? Math.round(ac / pregs * 100) : 0) + '%</b><span>acierto global</span></div></div>' +
        '<div class="xe-stats"><div class="xe-stat"><b>' + computeStreakEN() + '</b><span>racha (días)</span></div><div class="xe-stat"><b>' + (tc ? Math.round(tt / tc / 1000) + 's' : '--') + '</b><span>media/pregunta</span></div><div class="xe-stat"><b>' + (function () { var n = notaEstimada(); return n ? n.nota.toFixed(1) : "--"; })() + '</b><span>nota estimada /10</span></div></div>' +
        '<div class="xe-h">Tendencia de aciertos</div><canvas class="xe-canvas" id="xe-cv-tend"></canvas>';
      lineChart($("xe-cv-tend"), H.slice(-40).map(pctDe), "Completa al menos 2 tests para ver tu tendencia");
    } else if (t === "semanal") {
      if (!H.length) { c.innerHTML = '<div class="xe-empty">Completa algún test para ver tu informe semanal.</div>'; return; }
      var g = {}; H.forEach(function (h) { var k = semanaISO(h.fecha); g[k] = g[k] || { n: 0, t: 0, a: 0 }; g[k].n++; g[k].t += h.total; g[k].a += h.aciertos; });
      var meta = stateEN.dailyGoal || 20, dias = "";
      for (var i = 6; i >= 0; i--) {
        var d = new Date(); d.setDate(d.getDate() - i); var f = todayStrEN(d), n = H.filter(function (h) { return h.fecha === f; }).reduce(function (a, h) { return a + h.total; }, 0);
        var p = Math.min(100, Math.round(n / meta * 100));
        dias += '<div class="xe-row"><div class="mid"><b>' + ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][d.getDay()] + ' ' + d.getDate() + '</b><div class="xe-bar"><i style="width:' + p + '%;background:' + (n >= meta ? "var(--green)" : "var(--gold)") + '"></i></div></div><div class="xe-pct">' + n + '</div></div>';
      }
      c.innerHTML = '<div class="xe-h" style="margin-top:0">Últimos 7 días (meta ' + meta + ')</div>' + dias + '<div class="xe-h">Por semanas</div>' +
        Object.keys(g).sort().reverse().slice(0, 10).map(function (k) { var o = g[k], p = o.t ? Math.round(o.a / o.t * 100) : 0, pp = k.split("-S"); return '<div class="xe-row"><div class="mid"><b>Semana ' + pp[1] + ' · ' + pp[0] + '</b><span>' + o.n + ' test' + (o.n === 1 ? "" : "s") + ' · ' + o.a + ' de ' + o.t + ' preguntas</span></div><div class="xe-pct ' + clsPct(p) + '">' + p + '%</div></div>'; }).join("");
    } else if (t === "general") {
      var tot = H.reduce(function (a, h) { return a + h.total; }, 0), aci = H.reduce(function (a, h) { return a + h.aciertos; }, 0);
      var porModo = {}; H.forEach(function (h) { var m = h.modo || "test"; porModo[m] = (porModo[m] || 0) + 1; });
      var nm = { test: "Test", flashcards: "Flashcards", simulacro: "Simulacro", examen: "Examen real", "cero-fallos": "Cero fallos" };
      var temas = temasIds().map(function (id) { return { id: id, s: statsTema(id) }; }).filter(function (x) { return x.s.vistas > 0; }).sort(function (a, b) { return a.s.pct - b.s.pct; });
      c.innerHTML = '<div class="xe-stats"><div class="xe-stat"><b>' + H.length + '</b><span>tests</span></div><div class="xe-stat"><b>' + tot + '</b><span>preguntas</span></div><div class="xe-stat"><b>' + (tot ? Math.round(aci / tot * 100) : 0) + '%</b><span>acierto</span></div></div>' +
        (Object.keys(porModo).length ? '<div class="nlabel" style="margin-bottom:6px">' + Object.keys(porModo).map(function (m) { return (nm[m] || m) + ": " + porModo[m]; }).join(" · ") + '</div>' : "") +
        '<div class="xe-h">Por tema (de peor a mejor)</div>' + (temas.length ? temas.map(function (x) { return '<div class="xe-row"><div class="mid"><b>' + esc(nomTema(x.id)) + '</b><span>' + (x.s.vistas - x.s.falladas) + ' de ' + x.s.vistas + ' respuestas · ' + x.s.vistasQ + '/' + x.s.tot + ' preguntas vistas</span><div class="xe-bar"><i style="width:' + x.s.pct + '%;background:' + colPct(x.s.pct) + '"></i></div></div><div class="xe-pct ' + clsPct(x.s.pct) + '">' + x.s.pct + '%</div></div>'; }).join("") : '<div class="xe-empty">Sin datos por tema todavía.</div>');
    } else {
      if (!H.length) { c.innerHTML = '<div class="xe-empty">Aún no has finalizado ningún test.</div>'; return; }
      var mes = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
      var nm2 = { test: "Test", flashcards: "Flashcards", simulacro: "Simulacro", examen: "Examen real", "cero-fallos": "Cero fallos" };
      c.innerHTML = '<div class="nlabel" style="margin-bottom:8px">Toca un test para revisar tus aciertos y fallos.</div>' + H.map(function (h, i) { return i; }).reverse().slice(0, 150).map(function (i) {
        var h = H[i], p = pctDe(h), d = new Date(h.fecha + "T12:00:00"), tiene = h.detalle && h.detalle.length;
        return '<div class="xe-row ' + (tiene ? "click" : "") + '" ' + (tiene ? 'onclick="xeAbrirRev(' + i + ')"' : "") + '><div class="xe-date"><b>' + d.getDate() + '</b><span>' + mes[d.getMonth()] + '</span></div><div class="mid"><b>' + esc(h.temaLabel || nm2[h.modo] || "Test") + '</b><span>' + h.aciertos + ' aciertos de ' + h.total + (h.tiempoSeg ? ' · ' + fmtMS(h.tiempoSeg) : "") + (tiene ? " · revisar ›" : "") + '</span></div><div class="xe-pct ' + clsPct(p) + '">' + p + '%</div></div>';
      }).join("");
    }
  };

  /* ---------- revisión (modal y resultado) ---------- */
  var L4 = ["A", "B", "C", "D"];
  function itemRev(d, i, pref) {
    var q = qDe(d.q); if (!q) return "";
    var idx = QUESTIONS.indexOf(q), ok = !!d.o, fi = pref + i;
    var tu = d.s >= 0 && q.opts[d.s] != null ? '<div class="l" style="color:' + (ok ? "var(--green)" : "var(--red)") + '">Tu respuesta: <b>' + L4[d.s] + ')</b> ' + q.opts[d.s] + '</div>' : '<div class="l" style="color:var(--muted)">Tu respuesta: en blanco</div>';
    var cor = ok ? "" : '<div class="l" style="color:var(--green)">Correcta: <b>' + L4[q.a] + ')</b> ' + q.opts[q.a] + '</div>';
    var btn = ok ? '<button class="xe-mini" style="margin-top:8px" onclick="xeVoleo(\'' + q.qid + '\',this)">' + ((stateEN.voleos || []).indexOf(q.qid) >= 0 ? "🎲 Contada como dudosa (quitar)" : "🎲 La acerté por suerte") + '</button>'
      : (d.s >= 0 ? '<button class="ia-explain-btn-en" id="iaexbtn' + idx + '_' + fi + '" onclick="pedirExplicacionIAEN(' + idx + ',\'' + fi + '\',' + d.s + ')">🤖 Pídele más detalle a la IA</button><div id="iaexbox' + idx + '_' + fi + '"></div>' : "");
    return '<div class="xe-rev" data-ok="' + (ok ? 1 : 0) + '"><span class="xe-tag ' + (ok ? "ok" : "ko") + '">' + (ok ? "ACERTADA" : "FALLADA") + '</span><div class="nlabel">' + topicLabel(q.t) + '</div><b class="xe-q">' + q.q + '</b>' + tu + cor +
      (q.fb ? '<div class="fb">' + q.fb + '</div>' : "") + (d.m != null ? '<div class="fb">⏱️ ' + Math.round(d.m / 1000) + 's' + (function () { var m = tiempoMedioMsEN(q.qid); return m ? " · media histórica: " + Math.round(m / 1000) + "s" : ""; })() + '</div>' : "") + btn + '</div>';
  }
  function revisionHTML(det, pref) {
    var ac = det.filter(function (d) { return d.o; }).length;
    return '<div class="xe-revbox"><div class="xe-tabs"><button class="xe-tab on" onclick="xeFiltrar(this,\'all\')">Todas (' + det.length + ')</button><button class="xe-tab" onclick="xeFiltrar(this,\'1\')">Acertadas (' + ac + ')</button><button class="xe-tab" onclick="xeFiltrar(this,\'0\')">Falladas (' + (det.length - ac) + ')</button></div>' + det.map(function (d, i) { return itemRev(d, i, pref); }).join("") + '</div>';
  }
  window.xeFiltrar = function (btn, f) {
    var box = btn.closest(".xe-revbox");
    box.querySelectorAll(".xe-tab").forEach(function (b) { b.classList.toggle("on", b === btn); });
    box.querySelectorAll(".xe-rev").forEach(function (n) { n.style.display = f === "all" || n.dataset.ok === f ? "" : "none"; });
  };
  window.xeAbrirRev = function (i) {
    var h = hist()[i]; if (!h || !h.detalle) return;
    $("xe-rev-title").textContent = (h.temaLabel || "Test") + " · " + h.fecha;
    $("xe-rev-body").innerHTML = '<div class="xe-stats"><div class="xe-stat"><b style="color:var(--green)">' + h.aciertos + '</b><span>Aciertos</span></div><div class="xe-stat"><b style="color:var(--red)">' + (h.total - h.aciertos) + '</b><span>Fallos</span></div><div class="xe-stat"><b>' + pctDe(h) + '%</b><span>Acierto</span></div></div>' + revisionHTML(h.detalle, "h" + i + "_");
    modalRev.classList.remove("hidden");
  };
  window.xeCerrarRev = function () { modalRev.classList.add("hidden"); };

  window.xeVoleo = function (qid, btn) {
    stateEN.voleos = stateEN.voleos || [];
    var i = stateEN.voleos.indexOf(qid); if (i >= 0) stateEN.voleos.splice(i, 1); else stateEN.voleos.push(qid);
    save(); var on = stateEN.voleos.indexOf(qid) >= 0;
    if (btn) btn.textContent = on ? "🎲 Contada como dudosa (quitar)" : "🎲 La acerté por suerte";
    xeHoy();
  };

  /* ---------- TEMAS A REFORZAR ---------- */
  function renderRefuerzo() {
    var n = notaEstimada(), c = $("xe-ref-body");
    var temas = temasIds().map(function (id) { return { id: id, s: statsTema(id) }; });
    var conDatos = temas.filter(function (x) { return x.s.vistas > 0; }).sort(function (a, b) { return a.s.pct - b.s.pct; });
    var h = '<div class="xe-hoy" style="background:linear-gradient(135deg,var(--navy),var(--sky))"><div class="t">NOTA ESTIMADA</div><b style="font-size:34px">' + (n ? n.nota.toFixed(1) + "/10" : "--") + '</b><div class="s" style="margin:0">' + (n ? "Calculada sobre " + n.con + " de " + n.total + " temas con datos suficientes" : "Responde al menos 5 preguntas de un tema para calcularla") + '</div></div>';
    h += '<div class="xe-h">Evolución por tema</div><select id="xe-evo-sel" class="evo-input" style="margin-bottom:8px" onchange="xeEvo(this.value)">' + (conDatos.length ? conDatos.map(function (x) { return '<option value="' + x.id + '">' + esc(nomTema(x.id)) + ' (' + x.s.pct + '%)</option>'; }).join("") : '<option value="">Sin datos todavía</option>') + '</select><canvas class="xe-canvas" id="xe-cv-evo"></canvas>';
    var rachas = temas.map(function (x) { return { id: x.id, r: rachaTema(x.id) }; }).filter(function (x) { return x.r > 0; }).sort(function (a, b) { return b.r - a.r; }).slice(0, 6);
    h += '<div class="xe-h">Racha por tema</div>' + (rachas.length ? rachas.map(function (x) { return '<div class="xe-row"><span style="font-size:20px">🔥</span><div class="mid"><b>' + esc(nomTema(x.id)) + '</b></div><div class="xe-pct">' + x.r + ' día' + (x.r === 1 ? "" : "s") + '</div></div>'; }).join("") : '<div class="xe-empty">Practica un mismo tema varios días seguidos para generar racha.</div>');
    var flojos = temas.filter(function (x) { return x.s.vistas >= 5; }).sort(function (a, b) { return a.s.pct - b.s.pct; }).slice(0, 8);
    h += '<div class="xe-h">Tus temas más flojos</div>' + (flojos.length ? flojos.map(function (x) { return '<div class="xe-row"><div class="mid"><b>' + esc(nomTema(x.id)) + '</b><span>' + x.s.vistas + ' respuestas</span></div><div class="xe-pct ' + clsPct(x.s.pct) + '">' + x.s.pct + '%</div><button class="xe-mini" onclick="xeRepasarTema(' + x.id + ')">Repasar</button></div>'; }).join("") : '<div class="xe-empty">Responde algunas preguntas de cada tema para detectar tus temas débiles.</div>');
    var aband = temas.filter(function (x) { return x.s.ultima > 0 && Math.floor((Date.now() - x.s.ultima) / 864e5) >= 5; }).map(function (x) { return { id: x.id, d: Math.floor((Date.now() - x.s.ultima) / 864e5) }; }).sort(function (a, b) { return b.d - a.d; }).slice(0, 6);
    h += '<div class="xe-h">Temas abandonados</div>' + (aband.length ? aband.map(function (x) { return '<div class="xe-row"><div class="mid"><b>' + esc(nomTema(x.id)) + '</b><span>Llevas ' + x.d + ' días sin repasarlo</span></div><button class="xe-mini" onclick="xeRepasarTema(' + x.id + ')">Repasar</button></div>'; }).join("") : '<div class="xe-empty">No tienes temas abandonados. ¡Buen ritmo!</div>');
    var duras = QUESTIONS.map(function (q) { var s = statsDeEN(q.qid); return { q: q, s: s, p: s.vistas ? s.falladas / s.vistas : 0 }; }).filter(function (x) { return x.s.vistas >= 2 && x.p > 0; }).sort(function (a, b) { return b.p - a.p || b.s.vistas - a.s.vistas; }).slice(0, 10);
    h += '<div class="xe-h">Preguntas que más te cuestan</div>' + (duras.length ? duras.map(function (x) { var t = String(x.q.q).replace(/<[^>]*>/g, ""); return '<div class="xe-row"><div class="mid"><b>' + esc(nomTema(x.q.t)) + '</b><span>' + esc(t.slice(0, 90)) + (t.length > 90 ? "…" : "") + '</span></div><div class="xe-pct xe-bad">' + Math.round(x.p * 100) + '%</div></div>'; }).join("") : '<div class="xe-empty">Aún no hay suficientes datos para detectar tus preguntas más difíciles.</div>');
    c.innerHTML = h;
    if (conDatos.length) xeEvo(conDatos[0].id);
  }
  window.xeEvo = function (id) {
    var cv = $("xe-cv-evo"); if (!cv) return;
    lineChart(cv, evolucionTema(parseInt(id, 10)).map(function (x) { return x.pct; }), "Completa al menos 2 tests de este tema para ver tu evolución");
  };
  window.xeRepasarTema = function (t) {
    var banco = preguntasDeTemaEN(t); if (!banco.length) return alert("No hay preguntas en este tema.");
    showPanel("test"); iniciarTestPersonalizadoEN(seleccionarPreguntasInteligenteEN(banco, 20), false, true, nomTema(t));
  };

  /* ---------- TUTOR IA ---------- */
  var chat = [];
  function renderTutor() {
    var c = $("xe-chat");
    c.innerHTML = chat.length ? chat.map(function (m) { return '<div class="xe-msg ' + (m.r === "u" ? "u" : "a") + '">' + esc(m.t) + '</div>'; }).join("") : '<div class="xe-empty">Pregúntame lo que quieras: reglas, diferencias entre tiempos verbales, por qué una opción es la correcta…</div>';
  }
  window.xeTutorNueva = function () { chat = []; renderTutor(); };
  window.xeTutorEnviar = async function () {
    var inp = $("xe-tutor-in"), txt = inp.value.trim(); if (!txt) return;
    chat.push({ r: "u", t: txt }); inp.value = ""; chat.push({ r: "a", t: "…" }); renderTutor();
    var btn = $("xe-tutor-send"); btn.disabled = true;
    var ctx = chat.slice(0, -2).slice(-8).map(function (m) { return (m.r === "u" ? "Alumno: " : "Tutor: ") + m.t; }).join("\n");
    var prompt = "Eres un catedrático experto en gramática inglesa que prepara a un opositor a la Escala de Oficiales de la Guardia Civil. Responde en español, claro y pedagógico (máximo 220 palabras), con ejemplos breves en inglés cuando ayuden." + (ctx ? "\n\nConversación previa:\n" + ctx : "") + "\n\nPregunta del alumno: " + txt;
    try { chat[chat.length - 1].t = ((await llamarIA_EN(prompt, 1200)) || "").trim() || "(sin respuesta)"; }
    catch (e) { chat[chat.length - 1].t = e && e.message === "NO_KEY" ? "Configura tu clave de API de Gemini en Perfil para usar el tutor." : "No se pudo contactar con la IA. Inténtalo de nuevo más tarde."; }
    btn.disabled = false; renderTutor();
  };

  /* ---------- INICIO: «Hoy toca» + accesos ---------- */
  function bancoHoy() {
    var l = bancoRepasoEN().concat(bancoFallosEN()), seen = {}, out = [];
    l.forEach(function (q) { if (!seen[q.qid]) { seen[q.qid] = 1; out.push(q); } });
    return out;
  }
  function xeHoy() {
    var d = $("xe-hoy"); if (!d) return;
    var rep = bancoRepasoEN().length, fal = bancoFallosEN().length, vol = (stateEN.voleos || []).length;
    d.innerHTML = '<div class="t">HOY TOCA</div><b>' + (bancoHoy().length ? "Repaso pendiente" : "Todo al día 🎉") + '</b><div class="s">' + rep + ' de repaso · ' + fal + ' falladas · ' + vol + ' aciertos con duda</div><button onclick="xeRepasarAhora()">Repasar ahora</button>';
  }
  window.xeHoy = xeHoy;
  window.xeRepasarAhora = function () {
    var b = bancoHoy(); if (!b.length) return alert("No tienes repasos pendientes ahora mismo. ¡Buen trabajo!");
    showPanel("test"); iniciarTestPersonalizadoEN(shuf(b).slice(0, 30), false, true, "Repaso de hoy");
  };
  var hoyDiv = document.createElement("div"); hoyDiv.id = "xe-hoy"; hoyDiv.className = "xe-hoy";
  var empezar = document.querySelector("#panel-inicio .card[onclick*='startTestDelDiaEN']");
  if (empezar) empezar.parentNode.insertBefore(hoyDiv, empezar);
  var ult = $("inicio-ultimos-en");
  if (ult) ult.insertAdjacentHTML("afterend", '<button class="qbtn outline" style="width:100%;margin:-12px 0 22px" onclick="showPanel(\'actividad\')">Ver todos · Mi progreso →</button>');
  var grid = document.querySelector("#panel-inicio .grid.g2:last-of-type");
  if (grid) grid.insertAdjacentHTML("beforeend",
    '<div class="card info" style="cursor:pointer" onclick="showPanel(\'actividad\')"><div class="ctitle">📈 Mi progreso</div><div class="nlabel">Gráfica, informes e historial</div></div>' +
    '<div class="card danger" style="cursor:pointer" onclick="showPanel(\'refuerzo\')"><div class="ctitle">🎯 Temas a reforzar</div><div class="nlabel">Tus puntos débiles</div></div>' +
    '<div class="card tip" style="cursor:pointer" onclick="showPanel(\'tutor\')"><div class="ctitle">🤖 Tutor IA</div><div class="nlabel">Resuelve tus dudas por chat</div></div>' +
    '<div class="card" style="cursor:pointer" onclick="abrirBuscadorModalEN()"><div class="ctitle">🔎 Buscador</div><div class="nlabel">Busca preguntas por palabra</div></div>');
  var _ri = renderInicioEN;
  renderInicioEN = function () { _ri.apply(this, arguments); try { xeHoy(); } catch (e) {} };

  /* ---------- PERFIL: filas nuevas + copia GitHub ---------- */
  function perfilFilas() {
    var perfil = $("panel-perfil"); if (!perfil || $("xe-perfil-act")) return;
    var sl = Array.prototype.slice.call(perfil.querySelectorAll(".slabel"));
    var marc = sl.filter(function (s) { return /Preguntas marcadas/.test(s.textContent); })[0];
    if (marc) marc.insertAdjacentHTML("beforebegin",
      '<div id="xe-perfil-act"><div class="slabel">Actividad</div>' +
      '<div class="perfil-row" style="cursor:pointer" onclick="xeActTab(\'historial\');showPanel(\'actividad\');xeActTab(\'historial\')"><div><b>🗓️ Historial de tests</b><div class="nlabel">Revisa aciertos y fallos de cada test</div></div><span class="nlabel" id="xe-perfil-hist">0</span></div>' +
      '<div class="perfil-row" style="cursor:pointer" onclick="showPanel(\'actividad\')"><div><b>📈 Mi progreso</b><div class="nlabel">Gráfica, informe semanal y general</div></div></div>' +
      '<div class="perfil-row" style="cursor:pointer" onclick="showPanel(\'refuerzo\')"><div><b>🎯 Temas a reforzar</b><div class="nlabel">Detecta tus puntos débiles</div></div></div>' +
      '<div class="perfil-row" style="cursor:pointer" onclick="showPanel(\'tutor\')"><div><b>🤖 Tutor IA</b><div class="nlabel">Resuelve tus dudas por chat</div></div></div></div>');
    var ia = sl.filter(function (s) { return /Asistente IA/.test(s.textContent); })[0];
    if (ia) ia.insertAdjacentHTML("beforebegin", '<div id="gh-box-en"></div>');
    ghUI();
  }
  var _rp = renderPerfilEN;
  renderPerfilEN = function () { _rp.apply(this, arguments); perfilFilas(); var h = $("xe-perfil-hist"); if (h) h.textContent = hist().length; ghUI(); };

  /* ---------- MODALIDADES NUEVAS ---------- */
  [{ id: "novistas", nombre: "Solo no vistas", desc: "Preguntas que todavía no has respondido nunca" },
   { id: "bloque", nombre: "Bloque de temas", desc: "Test por bloques de temas afines" },
   { id: "simulacro", nombre: "Simulacro de examen", desc: "40 preguntas repartidas por temas, 48 min de cronómetro y nota con penalización" },
   { id: "simulacro-sin", nombre: "Simulacro sin tiempo", desc: "40 preguntas como el examen, sin cronómetro: puedes pararlo cuando quieras" }].forEach(function (m) {
    if (!MODALIDADES_EN.some(function (x) { return x.id === m.id; })) MODALIDADES_EN.push(m);
  });
  var ref = $("bloque-tema-unico-en");
  if (ref) ref.insertAdjacentHTML("afterend", '<div id="xe-bloque-wrap" style="display:none"><div class="ctitle" style="font-size:15px;margin:18px 0 10px">Elige el bloque</div><select id="xe-bloque-sel" class="evo-input" style="margin-bottom:6px">' + BLOQUES_EN.map(function (b) { return '<option value="' + b.id + '">' + b.ic + " " + b.n + " · " + esc(b.nombre) + '</option>'; }).join("") + '</select></div>');
  var _rm = renderModalidadesEN;
  renderModalidadesEN = function () {
    _rm.apply(this, arguments);
    var m = configStateEN.modalidad, w = $("xe-bloque-wrap"); if (w) w.style.display = m === "bloque" ? "block" : "none";
    var n = $("bloque-n-preguntas-en"); if (n) n.style.display = /^simulacro/.test(m) ? "none" : "";
  };
  function bancoOrigen() {
    var seen = {}, out = [];
    temasIds().forEach(function (t) { preguntasPorOrigenEN(t, configStateEN.origen || "todas").forEach(function (q) { if (!seen[q.qid]) { seen[q.qid] = 1; out.push(q); } }); });
    return out;
  }
  var SIM_N = 40, SIM_SEG = 72;
  function bancoSimulacro() {
    var pools = temasIds().filter(function (t) { return t !== 42 && t !== 43; }).map(function (t) { return shuf(preguntasPorOrigenEN(t, configStateEN.origen || "todas")); }).filter(function (p) { return p.length; });
    pools = shuf(pools); var out = [], i = 0, vacias = 0;
    while (out.length < SIM_N && vacias < pools.length) {
      var p = pools[i % pools.length]; if (p.length) { out.push(p.pop()); vacias = 0; } else vacias++;
      i++;
    }
    return shuf(out);
  }
  var xeOpts = {};
  var _lz = lanzarTestEN;
  lanzarTestEN = function () {
    var m = configStateEN.modalidad, titulo, banco;
    if (m === "novistas") { banco = bancoOrigen().filter(function (q) { return statsDeEN(q.qid).vistas === 0; }); titulo = "Solo no vistas"; if (!banco.length) return alert("¡Has visto ya todas las preguntas de esta selección!"); banco = shuf(banco).slice(0, configStateEN.nPreguntas); }
    else if (m === "bloque") { var id = $("xe-bloque-sel").value, set = {}; bancoOrigen().forEach(function (q) { set[q.qid] = 1; }); banco = bancoBloqueEN(id).filter(function (q) { return set[q.qid]; }); titulo = nombreBloqueEN(id); if (!banco.length) return alert("No hay preguntas en este bloque con ese origen."); banco = seleccionarPreguntasInteligenteEN(banco, configStateEN.nPreguntas); }
    else if (m === "simulacro" || m === "simulacro-sin") { banco = bancoSimulacro(); if (!banco.length) return alert("No hay preguntas cargadas."); titulo = m === "simulacro" ? "Simulacro de examen" : "Simulacro sin tiempo"; xeOpts = { simulacro: true, limite: m === "simulacro" ? banco.length * SIM_SEG : null }; closeConfigModalEN(); return iniciarTestPersonalizadoEN(banco, false, false, titulo); }
    else return _lz.apply(this, arguments);
    closeConfigModalEN(); iniciarTestPersonalizadoEN(banco, configStateEN.flashcards, configStateEN.inmediata, titulo);
  };
  var _bre = bancoRepasoEN;
  bancoRepasoEN = function () { var l = _bre(), v = stateEN.voleos || []; QUESTIONS.forEach(function (q) { if (v.indexOf(q.qid) >= 0 && l.indexOf(q) < 0) l.push(q); }); return l; };

  /* ---------- CRONÓMETRO + PAUSA en el test ---------- */
  var T = null;
  function elapsed() { return T ? Math.floor((Date.now() - T.ini - T.pausaMs - (T.pausadoEn ? Date.now() - T.pausadoEn : 0)) / 1000) : 0; }
  function tick() {
    if (!T || T.pausadoEn) return;
    var el = $("xe-timer"), s = elapsed(); if (!el) return;
    if (T.limite) { var r = T.limite - s; el.textContent = "⏱️ " + fmtMS(r); el.style.color = r <= 300 ? "var(--red)" : ""; if (r <= 0) { alert("¡Se ha acabado el tiempo! Se corregirá el test con las preguntas respondidas hasta ahora."); showResult(); } }
    else el.textContent = "⏱️ " + fmtMS(s);
  }
  function pararCrono() { if (T && T.iv) clearInterval(T.iv); var p = $("xe-pausa-ov"); if (p) p.remove(); }
  function barraRunner() {
    var cab = document.querySelector("#test-runner-en > div"); if (!cab || $("xe-timer")) return;
    var t = document.createElement("span"); t.className = "xe-timer"; t.id = "xe-timer"; t.textContent = "⏱️ 00:00";
    var b = document.createElement("button"); b.className = "qbtn outline"; b.id = "xe-pausa-btn"; b.textContent = "⏸ Pausa"; b.onclick = window.xePausa;
    cab.insertBefore(b, cab.children[1] || null); cab.insertBefore(t, b);
  }
  window.xePausa = function () {
    if (!T) return;
    if (T.pausadoEn) {
      var d = Date.now() - T.pausadoEn; T.pausaMs += d; T.pausadoEn = null;
      try { qStartTimeEN += d; } catch (e) {}
      var p = $("xe-pausa-ov"); if (p) p.remove(); tick(); return;
    }
    T.pausadoEn = Date.now();
    try { if ("speechSynthesis" in window) speechSynthesis.cancel(); } catch (e) {}
    var o = document.createElement("div"); o.id = "xe-pausa-ov"; o.className = "xe-pausa";
    o.innerHTML = '<div class="ico">⏸</div><h2>Test en pausa</h2><div>El tiempo está parado.</div><button onclick="xePausa()">Continuar</button>';
    document.body.appendChild(o);
  };
  var _it = iniciarTestPersonalizadoEN;
  iniciarTestPersonalizadoEN = function () {
    pararCrono(); _it.apply(this, arguments);
    T = { ini: Date.now(), pausaMs: 0, pausadoEn: null, limite: xeOpts.limite || null, sim: !!xeOpts.simulacro, nTotal: qOrder.length, iv: null };
    xeOpts = {}; barraRunner(); T.iv = setInterval(tick, 1000); tick();
  };
  var _vl = volverListaTestEN;
  volverListaTestEN = function () { pararCrono(); T = null; _vl.apply(this, arguments); };

  /* ---------- acierto por suerte tras responder ---------- */
  var _an = answer;
  answer = function (e, a, t) {
    var ya = answered.indexOf(t) >= 0; _an.apply(this, arguments);
    if (ya || e !== a || testInmediataEN === false) return;
    var fb = $("fb" + t), q = QUESTIONS[t]; if (!fb || !q || !q.qid) return;
    fb.insertAdjacentHTML("beforeend", '<div><button class="xe-mini" style="margin-top:8px" onclick="xeVoleo(\'' + q.qid + '\',this)">🎲 La acerté por suerte</button></div>');
  };

  /* ---------- RESULTADO: estadísticas + revisión + historial con detalle ---------- */
  var _sr = showResult;
  showResult = function () {
    var det = testDetalleEN.slice(), n0 = hist().length, flash = flashModeEN, sim = T && T.sim, tSeg = T ? elapsed() : 0, nTot = T ? T.nTotal : det.length;
    pararCrono();
    var prev = hist().filter(function (h) { return h.total > 0 && h.modo !== "flashcards"; }).slice(-1)[0];
    _sr.apply(this, arguments);
    if (flash || !det.length) return;
    var compact = det.map(function (d) { var q = QUESTIONS[d.idx] || {}; return { q: q.qid, t: q.t, s: d.sel, o: !!d.ok, m: d.tiempoMs }; }).filter(function (d) { return d.q; });
    var h = hist()[hist().length - 1];
    if (hist().length > n0 && h) {
      h.id = Date.now(); h.detalle = compact; h.tiempoSeg = tSeg;
      h.temaLabel = (($("test-titulo-en") || {}).textContent || "Test").split(" · ")[0];
      if (sim) { h.modo = "simulacro"; h.blancos = Math.max(0, nTot - compact.length); }
      hist().forEach(function (x, i) { if (i < hist().length - 150 && x.detalle) delete x.detalle; });
      save();
    }
    var ok = compact.filter(function (d) { return d.o; }).length, fa = compact.length - ok, p = compact.length ? Math.round(ok / compact.length * 100) : 0;
    var blancos = sim ? Math.max(0, nTot - compact.length) : 0, notaTxt = "";
    if (sim) { var nota = nTot ? Math.max(0, ok - fa / 3) / nTot * 10 : 0; notaTxt = '<div class="bd-row" style="background:linear-gradient(135deg,#fff7e0,#ffeeb8)"><span style="font-size:20px">📝</span><strong>Nota: ' + nota.toFixed(2) + '/10 · ' + ok + ' aciertos, ' + fa + ' fallos, ' + blancos + ' en blanco (3 fallos = −1 acierto)</strong></div>'; }
    var cmp = prev ? (function () { var pa = pctDe(prev), df = p - pa; return '<span style="color:' + (df > 0 ? "var(--green)" : df < 0 ? "var(--red)" : "var(--muted)") + '">' + (df > 0 ? "▲ +" : df < 0 ? "▼ " : "■ ") + df + '%</span>'; })() : '<span style="color:var(--muted)">Primer test</span>';
    var html = notaTxt + '<div class="xe-stats" style="margin-top:12px"><div class="xe-stat"><b>' + fmtMS(tSeg) + '</b><span>Tiempo total</span></div><div class="xe-stat"><b>' + (compact.length ? Math.round(tSeg / compact.length) : 0) + 's</b><span>Media/pregunta</span></div><div class="xe-stat"><b style="font-size:15px">' + cmp + '</b><span>Vs. anterior' + (prev ? " (" + pctDe(prev) + "%)" : "") + '</span></div></div>' +
      '<div class="ctitle" style="margin:14px 0 10px;text-align:left">Revisión del test</div>' + revisionHTML(compact, "r");
    var box = $("rBreakdown"); if (!box) return;
    box.querySelectorAll(".res-item-en").forEach(function (n) { n.remove(); });
    Array.prototype.slice.call(box.querySelectorAll(".ctitle")).forEach(function (n) { if (/Repaso de fallos/.test(n.textContent)) n.remove(); });
    var rb = box.querySelector('button[onclick^="repasarFallidasEN"]');
    if (rb) rb.insertAdjacentHTML("beforebegin", html); else box.insertAdjacentHTML("beforeend", html);
    T = null;
  };

  /* ---------- COPIA A PRUEBA DE ACTUALIZACIONES + GITHUB ---------- */
  var DBN = "inglesBackupDB", SNAP = "inglesSnapshot_v1", GHK = "oficialGhCfg", DIAS = 2;
  function claves() { return [STORAGE_KEY_EN, "deviceModeEN"]; }
  function datosBackup() {
    var d = {}; claves().forEach(function (k) { var v = localStorage.getItem(k); if (v != null) d[k] = v; });
    try { var s = JSON.parse(d[STORAGE_KEY_EN] || "{}"); delete s.iaApiKey; d[STORAGE_KEY_EN] = JSON.stringify(s); } catch (e) {}
    return d;
  }
  function idb() { return new Promise(function (res, rej) { try { var r = indexedDB.open(DBN, 1); r.onupgradeneeded = function () { r.result.createObjectStore("snap"); }; r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; } catch (e) { rej(e); } }); }
  function idbPut(v) { return idb().then(function (d) { return new Promise(function (res, rej) { var t = d.transaction("snap", "readwrite"); t.objectStore("snap").put(v, SNAP); t.oncomplete = res; t.onerror = function () { rej(t.error); }; }); }); }
  function idbGet() { return idb().then(function (d) { return new Promise(function (res, rej) { var q = d.transaction("snap").objectStore("snap").get(SNAP); q.onsuccess = function () { res(q.result); }; q.onerror = function () { rej(q.error); }; }); }); }
  var tmr = null, origSet = Storage.prototype.setItem;
  function programar() { clearTimeout(tmr); tmr = setTimeout(function () { var d = datosBackup(); if (d[STORAGE_KEY_EN]) idbPut({ fecha: Date.now(), datos: d }).catch(function () {}); }, 800); }
  Storage.prototype.setItem = function (k, v) { origSet.call(this, k, v); if (this === localStorage && k === STORAGE_KEY_EN) programar(); };
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  function lenH(o) { try { return (JSON.parse(o[STORAGE_KEY_EN] || "{}").history || []).length; } catch (e) { return 0; } }
  idbGet().then(function (s) {
    if (!s || !s.datos) return programar();
    var act = {}; claves().forEach(function (k) { var v = localStorage.getItem(k); if (v != null) act[k] = v; });
    if (!act[STORAGE_KEY_EN] || lenH(s.datos) > lenH(act)) {
      try { if (sessionStorage.getItem("inglesRestaurado")) return; sessionStorage.setItem("inglesRestaurado", "1"); } catch (e) {}
      var api = ""; try { api = JSON.parse(act[STORAGE_KEY_EN] || "{}").iaApiKey || ""; } catch (e) {}
      Object.keys(s.datos).forEach(function (k) { var v = s.datos[k]; if (k === STORAGE_KEY_EN && api) { try { var o = JSON.parse(v); o.iaApiKey = api; v = JSON.stringify(o); } catch (e) {} } origSet.call(localStorage, k, v); });
      location.reload();
    } else programar();
  }).catch(function () {});

  function ghCfg() { try { return JSON.parse(localStorage.getItem(GHK) || "{}"); } catch (e) { return {}; } }
  function ghSet(o) { origSet.call(localStorage, GHK, JSON.stringify(o)); }
  function ghApi(path, opt) { var c = ghCfg(); opt = opt || {}; opt.headers = Object.assign({ Authorization: "Bearer " + c.token, Accept: "application/vnd.github+json" }, opt.headers || {}); return fetch("https://api.github.com/repos/" + c.repo + "/contents/" + path, opt); }
  function b64(s) { return btoa(unescape(encodeURIComponent(s))); }
  function ghMsg(t, ok) { var e = $("gh-status-en"); if (e) { e.textContent = t; e.style.color = ok === false ? "var(--red)" : "var(--green)"; } }
  async function ghPut(path, texto) {
    var sha, g = await ghApi(path); if (g.ok) sha = (await g.json()).sha;
    var body = { message: "Copia de seguridad inglés " + new Date().toISOString(), content: b64(texto) }; if (sha) body.sha = sha;
    var r = await ghApi(path, { method: "PUT", body: JSON.stringify(body) });
    if (!r.ok) throw new Error("GitHub respondió " + r.status + (r.status === 404 ? " (repo o token incorrectos)" : r.status === 401 ? " (token no válido)" : ""));
  }
  async function ghSubir(silencioso) {
    var c = ghCfg(); if (!c.repo || !c.token) { if (!silencioso) ghMsg("Configura repositorio y token primero.", false); return; }
    try {
      if (!silencioso) ghMsg("Subiendo copia…");
      var texto = JSON.stringify({ tipo: "ingles-backup", fecha: new Date().toISOString(), datos: datosBackup() });
      await ghPut("backups-ingles/progreso-" + new Date().toISOString().slice(0, 10) + ".json", texto);
      await ghPut("backups-ingles/latest.json", texto);
      c.lastIngles = Date.now(); ghSet(c); ghMsg("✓ Última copia en GitHub: " + new Date(c.lastIngles).toLocaleString());
    } catch (e) { ghMsg("⚠ " + e.message, false); }
  }
  async function ghRestaurar() {
    var c = ghCfg(); if (!c.repo || !c.token) return ghMsg("Configura repositorio y token primero.", false);
    try {
      var r = await ghApi("backups-ingles"); if (!r.ok) throw new Error("No se pudo leer el repositorio (" + r.status + ")");
      var l = (await r.json()).filter(function (f) { return /^progreso-\d{4}-\d{2}-\d{2}\.json$/.test(f.name); }).map(function (f) { return f.name; }).sort().reverse().slice(0, 10);
      if (!l.length) throw new Error("No hay copias de inglés en el repositorio");
      var n = parseInt(prompt("Elige la copia a restaurar (número):\n" + l.map(function (x, i) { return (i + 1) + ". " + x.replace("progreso-", "").replace(".json", ""); }).join("\n"), "1"), 10);
      if (!n || !l[n - 1]) return;
      if (!confirm("Esto reemplazará tu progreso de inglés actual por el de esa copia. ¿Continuar?")) return;
      var f = await ghApi("backups-ingles/" + l[n - 1], { headers: { Accept: "application/vnd.github.raw+json" } }); if (!f.ok) throw new Error("Error al descargar (" + f.status + ")");
      var j = JSON.parse(await f.text()); if (!j.datos) throw new Error("Copia no válida");
      var api = ""; try { api = JSON.parse(localStorage.getItem(STORAGE_KEY_EN) || "{}").iaApiKey || ""; } catch (e) {}
      Object.keys(j.datos).forEach(function (k) { var v = j.datos[k]; if (k === STORAGE_KEY_EN && api) { try { var o = JSON.parse(v); o.iaApiKey = api; v = JSON.stringify(o); } catch (e) {} } origSet.call(localStorage, k, v); });
      alert("Copia restaurada."); location.reload();
    } catch (e) { ghMsg("⚠ " + e.message, false); }
  }
  window.ghGuardarCfgEN = function () { var c = ghCfg(); c.repo = $("gh-repo-en").value.trim(); var t = $("gh-token-en").value.trim(); if (t) c.token = t; ghSet(c); $("gh-token-en").value = ""; ghMsg("Guardado. Probando…"); ghSubir(false); };
  window.ghSubirEN = function () { ghSubir(false); }; window.ghRestaurarEN = ghRestaurar;
  function ghUI() {
    var b = $("gh-box-en"); if (!b || b.dataset.ok) return; b.dataset.ok = "1";
    var c = ghCfg();
    b.innerHTML = '<div class="slabel">Copia automática en GitHub</div><div class="card" style="margin-bottom:18px"><div class="nlabel" style="margin-bottom:8px">Cada ' + DIAS + ' días la app sube sola una copia de tu progreso de inglés a tu repositorio privado (carpeta backups-ingles). Si ya lo configuraste en la app de conocimientos, aquí se usa el mismo repositorio y token.</div>' +
      '<input id="gh-repo-en" class="evo-input" placeholder="usuario/repositorio-privado" value="' + esc(c.repo || "") + '" style="margin-bottom:8px"><input id="gh-token-en" type="password" class="evo-input" placeholder="' + (c.token ? "Token guardado (déjalo vacío para conservarlo)" : "Token de GitHub (permiso contents)") + '" style="margin-bottom:8px">' +
      '<button class="qbtn primary" style="width:100%;margin-bottom:8px" onclick="ghGuardarCfgEN()">Guardar y subir ahora</button><div style="display:flex;gap:8px"><button class="qbtn outline" style="flex:1" onclick="ghSubirEN()">Subir copia</button><button class="qbtn outline" style="flex:1" onclick="ghRestaurarEN()">Restaurar</button></div><small id="gh-status-en" style="display:block;margin-top:8px;font-weight:700;color:var(--green)">' + (c.lastIngles ? "✓ Última copia: " + new Date(c.lastIngles).toLocaleString() : "") + '</small></div>';
  }
  setTimeout(function () { var c = ghCfg(); if (c.repo && c.token && Date.now() - (c.lastIngles || 0) > DIAS * 864e5) ghSubir(true); }, 4000);

  /* ---------- arranque ---------- */
  perfilFilas();
  try { renderInicioEN(); } catch (e) {}
})();
