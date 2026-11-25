/* 🎧 Narrado del temario subrayado: botón «Escuchar» dentro de la vista ampliada (zoom) de expres-subrayado.html.
   No lee la foto: cada recorte sabe qué artículo es, así que narra el texto de ese artículo (el del Exprés), con el estilo del
   Esquema clave: situación, aviso «esto ha caído en examen», apartado por apartado, «repito» con lo preguntado y mini repaso.
   Si se está viendo el artículo «Entero», también lee lo que el Exprés omite. Usa la voz del navegador (sin conexión). */
(function () {
  'use strict';
  var vis = document.getElementById('vis'); if (!vis) return;
  var items = [], pos = 0, jugando = false, gen = 0, clave = '', panel = null, wl = null, actual = null;
  var rate = 1, seguir = false;
  try { rate = +localStorage.getItem('exsub-voz-vel') || 1; seguir = localStorage.getItem('exsub-voz-seg') === '1'; } catch (e) {}

  /* ---------- texto ---------- */
  function limpia(s) {
    return (s || '')
      .replace(/\(\s*(…|\.\.\.)\s*\)|\[\s*(…|\.\.\.)\s*\]|…/g, ' ')
      .replace(/([a-záéíóúñ])- ([a-záéíóúñ])/g, '$1$2')   // palabras partidas al final de línea
      .replace(/\bArts\.\s*/g, 'artículos ').replace(/\bArt\.\s*/g, 'Artículo ').replace(/\barts\.\s*/g, 'artículos ').replace(/\bart\.\s*/g, 'artículo ')
      .replace(/\bn\.º\s*/gi, 'número ').replace(/\bRgto\.\s*/g, 'Reglamento ').replace(/\bpág\.\s*/g, 'página ')
      .replace(/\bLO (?=\d)/g, 'Ley Orgánica ').replace(/\bRD (?=\d)/g, 'Real Decreto ').replace(/(\d+)\/(\d{4})/g, '$1 barra $2')
      .replace(/🎯\s*\d*\s*pregu[a-z]*\.?/g, '').replace(/[✱*➕✂️⏱🎯⚠️📌🔹▪•►▶]/gu, ' ').replace(/\s+([,.;:])/g, '$1').replace(/\s+/g, ' ').trim();
  }
  function conPunto(s) { return /[.!?:;]$/.test(s) ? s : s + '.'; }
  /* «1.» → «Apartado 1.», «a)» → «Letra a:» (al principio o detrás de un signo de puntuación) */
  function apartados(s) {
    return s.replace(/(^|[.:;]\s+)(?:Apartado )?(\d{1,2})\.\s+(?=[A-ZÁÉÍÓÚÑ«“"(¿])/g, '$1Apartado $2. ')
      .replace(/(^|[.:;,]\s*(?:y |o )?)([a-hñj-uw-z]|i{1,3}|iv|vi{0,3}|ix)\)\s*/g, '$1Letra $2: ')
      .replace(/(Artículo \d+(?: (?:bis|ter|quater|quinquies))?\. )(\d{1,2})\. /, '$1Apartado $2. ');
  }
  function unicos(a) { var v = {}; return a.filter(function (x) { var k = x.toLowerCase(); if (!x || v[k]) return false; v[k] = 1; return true; }); }
  function listaDe(a) { return a.map(function (x) { return x.replace(/[.,;:]+$/, ''); }).join('; '); }
  function respuestas(nodo, entero, soloOficial) {
    return unicos([].slice.call(nodo.querySelectorAll('mark.m-resp')).filter(function (m) {
      if (m.classList.contains('ex-q') || (!entero && m.closest('.ex-plg-t'))) return false;
      var ids = (m.getAttribute('data-q') || '').split(',').filter(Boolean);
      return !soloOficial || ids.some(function (i) { return !/-ia-/.test(i); });
    }).map(function (m) { return limpia(m.textContent); }));
  }
  /* excepciones: la frase que empieza por «salvo», «excepto»… es la trampa típica */
  function excepciones(s) { return unicos((s.match(/\b(salvo|excepto|a excepción de|en ningún caso)\b[^.;:]{3,140}/gi) || [])).slice(0, 2); }

  function parrafos(nodo) {
    var ps = [].slice.call(nodo.querySelectorAll('.ex-fb > *'));
    return ps.length ? ps : [].slice.call(nodo.querySelectorAll('.ex-fb'));
  }
  function textoDe(el, entero) {
    var c = el.cloneNode(true);
    [].forEach.call(c.querySelectorAll('.ex-sello,.ex-p,.ex-q,.head-sellos,button,style,script' + (entero ? '' : ',.ex-plg')), function (x) { x.remove(); });
    [].forEach.call(c.querySelectorAll('tr,li,br,div,h4,h5'), function (x) { x.appendChild(document.createTextNode('. ')); });
    [].forEach.call(c.querySelectorAll('td,th'), function (x) { x.appendChild(document.createTextNode(', ')); });
    return limpia(c.textContent).replace(/([.,;:])\s*(?:[.,]\s*)+/g, '$1 ').trim();
  }
  /* ---------- localizar el artículo en el Exprés ---------- */
  var SUF = '(?:\\s?(?:bis|ter|quater|quáter|quinquies|sexies|septies|octies))?';
  var ORD = ['primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo'];
  var ART1 = new RegExp('^\\s*(?:(?:R\\d+|EXOF|EX|✱)\\s*)*Art(?:ículo|\\.)\\s*(\\d+' + SUF + ')', 'i');
  var IDX = {};
  function norma_(n) { return n.replace(/\s/g, '').toLowerCase().replace('quáter', 'quater'); }
  /* números de artículo de un título: «Artículos 11, 12 y 13», «Artículo 8 bis y artículo 9», «Arts. 5 a 9», «Artículo tercero» */
  function numeros(s) {
    var o = [], re = new RegExp('(?:art[íi]culos?|arts?\\.)\\s*((?:\\d+' + SUF + '(?:\\.\\d+)?(?:\\s*(?:,|y|a|e|-|–)\\s*(?=\\d))?)+)', 'gi'), m;
    while ((m = re.exec(s))) {
      var ant = null, a = m[1].split(/\s*(,|\by\b|\be\b|-|–|\ba\b)\s*/);
      for (var i = 0; i < a.length; i++) {
        var n = a[i].match(new RegExp('^\\d+' + SUF, 'i')); if (!n) continue; var v = norma_(n[0]);
        if (ant !== null && /^(a|-|–)$/.test(a[i - 1]) && +v - ant < 40) for (var k = ant + 1; k < +v; k++) o.push(String(k));
        o.push(v); ant = /^\d+$/.test(v) ? +v : null;
      }
    }
    var or = s.match(new RegExp('art[íi]culo\\s+(' + ORD.join('|') + ')', 'i')); if (or) o.push(String(ORD.indexOf(or[1].toLowerCase()) + 1));
    return o;
  }
  /* a qué artículo pertenece cada párrafo («Art. 8.» o, en algunas leyes, «16.1.»); null si no lo dice */
  function marcas(ps) {
    var PUNTO = new RegExp('^\\s*(?:\\(…\\)\\s*)?(\\d+' + SUF + ')\\.\\d+\\.'), txt = ps.map(function (x) { return x.textContent; });
    var punteado = txt.filter(function (x) { return PUNTO.test(x); }).length >= 2;
    return txt.map(function (x) {
      var m = x.match(ART1) || (punteado && (x.match(PUNTO) || x.match(new RegExp('^\\s*(\\d{2,}' + SUF + ')\\.\\s'))));
      return m ? norma_(m[1]) : null;
    });
  }
  function indice(t) {
    if (IDX[t]) return IDX[t]; var html = ((window.EXPRES_T || {})[t] || {}).html; if (!html) return null;
    var fichas = [], cortes = [];
    html.split(/<div class="ex-ficha(?: ex-of)?">/).forEach(function (s, i) {
      if (i) {
        var d = document.createElement('div'); d.innerHTML = fichaExpres(t, { fx: i - 1 }) || '';
        var h = d.querySelector('.ex-fh'), cab = h ? h.textContent : '', ps = marcas([].slice.call(d.querySelectorAll('.ex-fb > p'))).filter(Boolean);
        fichas[i - 1] = { cab: numeros(cab.split('—')[0].split(' · ')[0]), ps: ps };
      }
      (s.match(/<div class="bloque-titulo">[\s\S]*?<\/div>/g) || []).forEach(function (b) { var n = b.replace(/<[^>]+>/g, '').match(/\d+\/\d{4}/); if (n) cortes.push({ fx: i, n: n[0] }); });
    });
    return (IDX[t] = { fichas: fichas, cortes: cortes });
  }
  /* fichas del Exprés que hablan de los artículos de este recorte, buscando solo dentro de su norma */
  function localiza(t, p) {
    var ix = indice(t); if (!ix) return { nums: [], fx: [] };
    var partes = String(p.nombre || '').split(' · '), nums = numeros(partes[partes.length - 1]);
    function tiene(i, n) { var x = ix.fichas[i]; return !!x && (x.cab.indexOf(n) >= 0 || x.ps.indexOf(n) >= 0); }
    var propio = p.fx !== undefined && ix.fichas[p.fx];
    if (!nums.length) return { nums: nums, fx: propio ? [p.fx] : [] };
    if (propio && nums.every(function (n) { return tiene(p.fx, n); })) return { nums: nums, fx: [p.fx] };
    var desde = null, hasta = null, ley = String(p.nombre).match(/\d+\/\d{4}/);
    if (ley) ix.cortes.forEach(function (c, k) {
      if (c.n !== ley[0] || desde !== null) return; desde = c.fx;
      for (var j = k + 1; j < ix.cortes.length; j++) if (ix.cortes[j].n !== ley[0]) { hasta = ix.cortes[j].fx; break; }
      if (hasta === null) hasta = ix.fichas.length;
    });
    if (desde === null || desde >= hasta) {
      var v = D[t].piezas.filter(function (q) { return q.fx !== undefined && q.nombre.split(' · ')[0] === partes[0]; }).map(function (q) { return q.fx; });
      if (v.length) { desde = Math.max(0, Math.min.apply(null, v) - 3); hasta = Math.max.apply(null, v) + 4; }
    }
    var res = [];
    if (desde !== null) nums.forEach(function (n) {
      var c = []; for (var i = desde; i < hasta; i++) if (tiene(i, n)) c.push(i);
      if (p.fx !== undefined) c.sort(function (a, b) { return Math.abs(a - p.fx) - Math.abs(b - p.fx); });
      if (c.length && res.indexOf(c[0]) < 0) res.push(c[0]);
    });
    res.sort(function (a, b) { return a - b; });
    /* ficha enlazada sin números en su título ni en sus párrafos (protocolos, preámbulos…): vale la enlazada */
    if (!res.length && propio && !ix.fichas[p.fx].cab.length && !ix.fichas[p.fx].ps.length) res = [p.fx];
    return { nums: nums, fx: res };
  }
  function guion(t, p, entero) {
    var o = [], m = p.m || {}, partes = String(p.nombre || '').split(' · '), norma = limpia(partes.length > 1 ? partes[0] : ''), art = limpia(partes[partes.length - 1] || '');
    function di(s, lit) { s = limpia(s); if (s) o.push({ t: s, lit: !!lit }); }
    var donde = { nums: [], fx: [] }; try { donde = localiza(t, p); } catch (e) {}
    var fichas = donde.fx.map(function (i) { var d = document.createElement('div'); d.innerHTML = fichaExpres(t, { fx: i }) || ''; return d.firstChild; }).filter(Boolean);
    var cab = fichas.length === 1 && fichas[0].querySelector('.ex-fh'), tit = '';
    if (cab) { var c = cab.cloneNode(true); [].forEach.call(c.querySelectorAll('span'), function (x) { if (/sello|ex-p|head/.test(x.className)) x.remove(); }); var mm = c.textContent.split('—'); if (mm.length > 1) tit = limpia(mm.slice(1).join(', ').replace(/·\s*R\d+/g, '')); }
    di('Situación: ' + (norma ? norma + ', ' : '') + conPunto(art) + (tit ? ' Trata sobre: ' + conPunto(tit) : ''));
    if (m.exof) di('Atención: esto ha caído en examen oficial. Presta máxima atención.');
    else if (m.ex) di('Esto ha caído en preguntas de examen. Presta atención.');
    else if (m.ast) di('Este artículo está marcado como importante.');
    if ((m.r || []).length) di('Además entra en ' + (m.r.length > 1 ? 'las reglas R ' + m.r.join(' y R ') : 'la regla R ' + m.r[0]) + ' del bloque Recuerda.');

    var oficiales = [], todas = [], leido = 0;
    var ps = [];
    fichas.forEach(function (f) {
      var lista = parrafos(f), de = marcas(lista), ahora = null, marcados = lista.map(function (el, i) { if (de[i]) ahora = de[i]; return { el: el, a: ahora }; });
      /* ficha compartida por varios artículos: solo los párrafos de los artículos de este recorte */
      if (donde.nums.length && marcados.some(function (x) { return x.a; })) {
        var cabn = numeros((f.querySelector('.ex-fh') || f).textContent.split('—')[0]);
        marcados = marcados.filter(function (x) { return donde.nums.indexOf(x.a || cabn[0]) >= 0; });
      }
      ps = ps.concat(marcados.map(function (x) { return x.el; }));
    });
    /* si el Exprés lo omite casi todo, se lee el artículo completo */
    if (!entero && ps.map(function (el) { return textoDe(el, false); }).join('').replace(/[^a-záéíóúñ]/gi, '').length < 40) entero = true;
    ps.forEach(function (el) {
      var txt = textoDe(el, entero); if (txt.replace(/[^a-záéíóúñ0-9]/gi, '').length < 3) return;
      var of = respuestas(el, entero, true), ex = (el.getAttribute('data-ex') || '');
      if (of.length || /EXOF/.test(ex)) di('Ojo, esto que viene ha caído en examen.');
      else if (/\*/.test(ex)) di('Esta parte es importante.');
      di(conPunto(apartados(txt)), true); leido++;
      if (of.length) di('Repito, porque lo han preguntado en examen oficial: ' + conPunto(listaDe(of.slice(0, 5))));
      var ec = excepciones(txt); if (ec.length) di('Atención, trampa con la excepción: ' + conPunto(listaDe(ec)));
      oficiales = oficiales.concat(of); todas = todas.concat(respuestas(el, entero, false));
    });
    if (!leido) {
      var cu = []; try { cu = (C[t] || {})[p.id] || []; } catch (e) {}
      if (cu.length) {
        di('De este artículo no tengo el texto en el Exprés, así que te leo su cuadro de esquema.');
        cu.forEach(function (x) { var d = document.createElement('div'); d.innerHTML = x.h; var s = textoDe(d, true); if (s) di(conPunto(s), true); });
      } else di('De este artículo todavía no tengo texto para narrar. Léelo en la imagen.');
    }
    var rep = unicos(oficiales.concat(todas)).slice(0, 6);
    if (rep.length) di('Mini repaso. Quédate con esto: ' + conPunto(listaDe(rep)));
    return o;
  }

  /* ---------- voz ---------- */
  function troceo(t) {
    var fr = t.match(/[^.!?;:,]+[.!?;:,]*\s*/g) || [t], out = [], cur = '';
    fr.forEach(function (x) { if ((cur + x).length > 170 && cur) { out.push(cur); cur = x; } else { cur += x; if (cur.length > 90 && /[.!?;:]\s*$/.test(cur)) { out.push(cur); cur = ''; } } });
    if (cur.trim()) out.push(cur); return out;
  }
  function vozEs() { var v = (speechSynthesis.getVoices() || []).filter(function (x) { return /^es/i.test(x.lang); }); return v.filter(function (x) { return /es[-_]ES/i.test(x.lang); })[0] || v[0] || null; }
  function parar() { gen++; try { speechSynthesis.cancel(); } catch (e) {} }
  function pideWake() { try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (l) { wl = l; }).catch(function () {}); } catch (e) {} }
  function sueltaWake() { try { if (wl) wl.release(); } catch (e) {} wl = null; }
  /* la foto no se puede resaltar: se va desplazando sola al ritmo de la lectura */
  function desplaza(frac) {
    var L = document.getElementById('lienzo'); if (!L) return; var max = L.scrollHeight - L.clientHeight; if (max <= 0) return;
    L.scrollTo({ top: Math.max(0, Math.min(max, frac * L.scrollHeight - L.clientHeight * .35)), behavior: 'smooth' });
  }
  function avance(i, trozo) {
    var tot = 0, ya = 0; items.forEach(function (x, k) { if (!x.lit) return; tot += x.t.length; if (k < i) ya += x.t.length; });
    return tot ? (ya + (items[i].lit ? trozo : 0)) / tot : 0;
  }
  function hablar() {
    parar(); if (!jugando) return pinta();
    if (pos >= items.length) {
      if (seguir && vi < vlista.length - 1) { pos = 0; var sig_ = vis.querySelector('.bar.abajo [data-v=">"]'); if (sig_) { sig_.click(); return; } }
      jugando = false; pos = 0; sueltaWake(); return pinta();
    }
    var mi = gen, partes = troceo(items[pos].t), i = 0, leidos = 0; pinta();
    (function sig() {
      if (mi !== gen) return;
      if (i >= partes.length) { pos++; return hablar(); }
      if (items[pos].lit) desplaza(avance(pos, leidos));
      var u = new SpeechSynthesisUtterance(partes[i]); leidos += partes[i].length; i++;
      u.lang = 'es-ES'; u.rate = rate; var v = vozEs(); if (v) u.voice = v;
      u.onend = function () { if (mi === gen) sig(); }; u.onerror = function (e) { if (mi === gen && e.error !== 'canceled' && e.error !== 'interrupted') sig(); };
      actual = u;   // se guarda la referencia: algunos navegadores pierden el aviso de fin si se libera
      speechSynthesis.speak(u);
    })();
  }

  /* ---------- panel ---------- */
  function prepara() {
    var p = D[tema].piezas.filter(function (x) { return x.id === vlista[vi]; })[0]; if (!p) return false;
    var ent = !p.imgr; try { ent = entera(p) || !!st.vizEnt; } catch (e) {}
    var k = tema + '/' + p.id + '/' + (ent ? 'e' : 'r'); if (k === clave) return false;
    clave = k; items = guion(tema, p, ent && !!p.imgr); pos = 0; return true;
  }
  function pinta() {
    if (!panel) return;
    panel.querySelector('[data-voz="play"]').textContent = jugando ? '⏸ Pausa' : '▶ Escuchar';
    panel.querySelector('.vz-tx').textContent = (jugando || pos) && items[pos] ? items[pos].t : '';
    panel.querySelector('.vz-n').textContent = items.length && (jugando || pos) ? Math.min(pos + 1, items.length) + '/' + items.length : '';
    panel.classList.toggle('on', jugando || pos > 0);
    panel.querySelector('[data-voz="seg"]').classList.toggle('on', seguir);
  }
  function crea() {
    panel = document.createElement('div'); panel.id = 'vz';
    panel.innerHTML = '<div class="vz-tx"></div><div class="vz-b"><button class="vz-play" data-voz="play">▶ Escuchar</button><button data-voz="ant" title="Frase anterior">⏪</button><button data-voz="sig" title="Frase siguiente">⏩</button>'
      + '<button data-voz="ini" title="Empezar este artículo de nuevo">⟲</button><select title="Velocidad">' + [0.85, 1, 1.1, 1.25, 1.4].map(function (v) { return '<option value="' + v + '"' + (v === rate ? ' selected' : '') + '>' + String(v).replace('.', ',') + '×</option>'; }).join('') + '</select>'
      + '<button data-voz="seg" title="Al terminar, pasa al artículo siguiente y sigue narrando">Seguido</button><span class="vz-n"></span></div>';
    panel.addEventListener('click', function (e) {
      e.stopPropagation(); var b = e.target.closest('[data-voz]'); if (!b) return; var x = b.getAttribute('data-voz');
      if (!('speechSynthesis' in window)) { alert('Este navegador no tiene voz.'); return; }
      if (x === 'seg') { seguir = !seguir; try { localStorage.setItem('exsub-voz-seg', seguir ? '1' : '0'); } catch (er) {} return pinta(); }
      prepara();
      if (x === 'play') { jugando = !jugando; if (jugando) { pideWake(); return hablar(); } parar(); sueltaWake(); return pinta(); }
      if (x === 'ant') pos = Math.max(0, pos - 1); if (x === 'sig') pos = Math.min(items.length - 1, pos + 1); if (x === 'ini') pos = 0;
      if (jugando) hablar(); else pinta();
    });
    panel.querySelector('select').onchange = function () { rate = parseFloat(this.value) || 1; try { localStorage.setItem('exsub-voz-vel', rate); } catch (e) {} if (jugando) hablar(); };
    panel.addEventListener('touchstart', function (e) { e.stopPropagation(); }, { passive: true });
    panel.addEventListener('touchend', function (e) { e.stopPropagation(); }, { passive: true });
  }
  /* la vista ampliada se vuelve a pintar entera con cada cambio: se recoloca el panel y, si cambió el artículo, se narra el nuevo */
  function revisa() {
    if (vis.classList.contains('oculto')) { if (jugando || clave) { jugando = false; parar(); sueltaWake(); clave = ''; items = []; pos = 0; } return; }
    var abajo = vis.querySelector('.bar.abajo'); if (!abajo) return;
    if (!panel) crea();
    if (panel.parentNode !== vis) vis.insertBefore(panel, abajo);
    if (clave && prepara() && jugando) hablar(); else pinta();
  }
  new MutationObserver(function (ms) { if (ms.some(function (m) { return !panel || !panel.contains(m.target); })) revisa(); }).observe(vis, { childList: true, attributes: true, attributeFilter: ['class'] });
  window.addEventListener('pagehide', parar);

  var css = document.createElement('style');
  css.textContent = '#vz .vz-b button,#vz .vz-b select{white-space:nowrap}@media (max-width:520px){#vz .vz-b{flex-wrap:nowrap!important;gap:4px!important}#vz button,#vz select{padding:5px 6px!important;font-size:13px!important}#vz .vz-play{min-width:92px!important}#vz .vz-n{display:none}}'
    + '#vz{flex:none;border-top:1px solid var(--borde);background:var(--panel);padding:5px 8px}'
    + '#vz .vz-tx{display:none;font-size:13.5px;line-height:1.35;max-height:56px;overflow:auto;margin:0 0 5px}#vz.on .vz-tx{display:block}'
    + '#vz .vz-b{display:flex;gap:5px;align-items:center;flex-wrap:wrap;justify-content:center}'
    + '#vz button,#vz select{font:inherit;font-size:14px;padding:6px 10px;border-radius:9px;border:1.5px solid var(--borde);background:var(--panel);color:inherit;cursor:pointer}'
    + '#vz .vz-play{background:#14532d;border-color:#14532d;color:#fff;font-weight:700;min-width:112px}#vz button.on{background:#2563eb;border-color:#2563eb;color:#fff}'
    + '#vz .vz-n{font-size:12px;color:var(--gris)}'
    + '@media (orientation:landscape) and (max-height:560px){#vz{padding:2px 6px}#vz.on .vz-tx{display:none}#vz button,#vz select{padding:3px 9px;font-size:13px}}'
    + '@media print{#vz{display:none!important}}';
  document.head.appendChild(css);
  window.VozSub = { guion: guion, localiza: localiza };
  revisa();
})();
