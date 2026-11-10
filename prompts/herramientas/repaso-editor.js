// Editor de colores para los repasos (repaso-tN-borrador.html). Se incrusta en el HTML (lo hace repaso-hibrido-tN.js).
// Seleccionas texto (o tocas una palabra ya coloreada) y sale una barra con los 6 colores del Método Prefortia y «quitar».
// Funciona en los párrafos y en los esquemas. Se guarda en este navegador (localStorage); si el repaso cambia de contenido, se descarta y se guarda copia aparte.
(function () {
  var RC = document.getElementById('rc'); if (!RC) return;
  var KEY = 'repaso-edit:' + (RC.getAttribute('data-id') || 't'), VER = RC.getAttribute('data-ver') || '0';
  var pila = [], rangoAct = null;
  function guarda() { try { localStorage.setItem(KEY, JSON.stringify({v: VER, h: RC.innerHTML})); estado('Guardado en este navegador'); } catch (e) { estado('No se pudo guardar aquí'); } }
  function estado(t) { var s = document.getElementById('ed-st'); if (s) { s.textContent = t; clearTimeout(estado.t); estado.t = setTimeout(function () { s.textContent = ''; }, 2500); } }
  try {
    var g = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (g && g.h) { if (g.v === VER) RC.innerHTML = g.h; else { localStorage.setItem(KEY + ':anterior', JSON.stringify(g)); localStorage.removeItem(KEY); } }
  } catch (e) {}

  var COLORES = [['y', 'Amarillo · contenido general'], ['d', 'Naranja · palabra destacable'], ['a', 'Verde · autoridad / órgano'], ['p', 'Azul · plazo / cifra'], ['c', 'Morado · acción'], ['k', 'Rojo · palabra clave']];
  var bar = document.createElement('div'); bar.id = 'ed-bar'; bar.style.display = 'none';
  bar.innerHTML = COLORES.map(function (c) { return '<button type="button" data-c="' + c[0] + '" class="ed-b ed-' + c[0] + '" title="' + c[1] + '">' + (c[0] === 'k' ? '<u>a</u>' : 'A') + '</button>'; }).join('') + '<button type="button" data-c="x" class="ed-b ed-x" title="Quitar el color">✖</button>';
  document.body.appendChild(bar);
  var top = document.querySelector('.ed-top');
  if (top) {
    top.querySelector('#ed-undo').onclick = function () { if (!pila.length) return estado('Nada que deshacer'); RC.innerHTML = pila.pop(); guarda(); };
    top.querySelector('#ed-reset').onclick = function () { if (confirm('¿Volver al repaso original y perder tus cambios de color?')) { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); } };
  }

  function nuevo(cls, txt) { var m = document.createElement('mark'); m.className = cls; m.textContent = txt; return m; }
  function clon(m, txt) { var c = m.cloneNode(false); c.textContent = txt; return c; }
  function trabaja(n, ini, fin, cls) {
    var txt = n.nodeValue, antes = txt.slice(0, ini), medio = txt.slice(ini, fin), desp = txt.slice(fin);
    if (!medio) return;
    var m = n.parentElement && n.parentElement.closest('mark, u.m-clave');
    var padre;
    if (m && RC.contains(m) && m.childNodes.length === 1 && m.firstChild === n) {
      padre = m.parentNode;
      var piezas = [];
      if (antes) piezas.push(clon(m, antes));
      piezas.push(cls === 'x' ? document.createTextNode(medio) : nuevo(cls, medio));
      if (desp) piezas.push(clon(m, desp));
      piezas.forEach(function (p) { padre.insertBefore(p, m); }); padre.removeChild(m);
    } else if (m && RC.contains(m)) {   // marca con varios hijos: se cambia entera
      if (cls === 'x') { padre = m.parentNode; while (m.firstChild) padre.insertBefore(m.firstChild, m); padre.removeChild(m); }
      else if (m.tagName === 'U') { var nm = nuevo(cls, ''); while (m.firstChild) nm.appendChild(m.firstChild); m.parentNode.replaceChild(nm, m); }
      else m.className = cls;
    } else {
      if (cls === 'x') return;
      padre = n.parentNode;
      if (antes) padre.insertBefore(document.createTextNode(antes), n);
      padre.insertBefore(nuevo(cls, medio), n);
      if (desp) padre.insertBefore(document.createTextNode(desp), n);
      padre.removeChild(n);
    }
  }
  function aplica(cls) {
    var r = rangoAct; if (!r) return;
    var raiz = r.commonAncestorContainer; if (raiz.nodeType === 3) raiz = raiz.parentNode;
    var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, null), lista = [], n;
    while ((n = w.nextNode())) {
      if (!RC.contains(n) || !r.intersectsNode(n)) continue;
      var ini = n === r.startContainer ? r.startOffset : 0, fin = n === r.endContainer ? r.endOffset : n.nodeValue.length;
      if (fin > ini) lista.push([n, ini, fin]);
    }
    while (lista.length && !/\S/.test(lista[0][0].nodeValue.slice(lista[0][1], lista[0][2]))) lista.shift();
    while (lista.length && !/\S/.test(lista[lista.length - 1][0].nodeValue.slice(lista[lista.length - 1][1], lista[lista.length - 1][2]))) lista.pop();
    if (!lista.length) return;
    pila.push(RC.innerHTML); if (pila.length > 40) pila.shift();
    lista.forEach(function (x) { trabaja(x[0], x[1], x[2], cls); });
    RC.normalize();
    var s = window.getSelection(); if (s) s.removeAllRanges();
    bar.style.display = 'none'; rangoAct = null; guarda();
  }
  function muestra(r) {
    rangoAct = r.cloneRange();
    var b = r.getBoundingClientRect(), sx = window.pageXOffset, sy = window.pageYOffset;
    bar.style.display = 'flex';
    var ancho = bar.offsetWidth, alto = bar.offsetHeight, dw = document.documentElement.clientWidth;
    var x = Math.max(4, Math.min(b.left + sx, sx + dw - ancho - 4)), y = b.top + sy - alto - 8;
    if (y < sy + 4) y = b.bottom + sy + 8;
    bar.style.left = x + 'px'; bar.style.top = y + 'px';
  }
  function revisa(ev) {
    if (ev && bar.contains(ev.target)) return;
    setTimeout(function () {
      var s = window.getSelection();
      if (s && s.rangeCount && !s.isCollapsed) { var r = s.getRangeAt(0); if (RC.contains(r.commonAncestorContainer) && /\S/.test(r.toString())) return muestra(r); }
      var t = ev && ev.target && ev.target.closest && ev.target.closest('mark, u.m-clave');   // tocar una palabra coloreada: cambiarle el color
      if (t && RC.contains(t) && (!s || s.isCollapsed)) { var rr = document.createRange(); rr.selectNodeContents(t); return muestra(rr); }
      bar.style.display = 'none'; rangoAct = null;
    }, 20);
  }
  document.addEventListener('mouseup', revisa); document.addEventListener('touchend', revisa); document.addEventListener('keyup', function (e) { if (e.key === 'Shift' || /Arrow/.test(e.key)) revisa(e); });
  bar.addEventListener('mousedown', function (e) { e.preventDefault(); });
  bar.addEventListener('touchstart', function (e) { e.preventDefault(); }, {passive: false});
  function pulsa(e) { var b = e.target.closest('[data-c]'); if (b) aplica(b.getAttribute('data-c')); }
  bar.addEventListener('click', pulsa);
  bar.addEventListener('touchend', function (e) { e.preventDefault(); pulsa(e); }, {passive: false});
  window.addEventListener('scroll', function () { /* la barra va anclada al texto; no hace falta moverla */ });
})();
