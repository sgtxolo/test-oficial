// Segunda tanda de mejoras de expres-subrayado.html: quitar el artículo y dejar el esquema (o ambos), recortar a mano lo que no interesa,
// visor compacto en horizontal (un solo botón que despliega los menús), vista previa e impresión «lo que veo» y portada de impresión.
// Se activa con window.MEJORAS2() justo después de window.MEJORAS().
window.MEJORAS2 = function () {
  "use strict";
  st.cort = st.cort || {}; st.vm = st.vm || {}; st.impPrev = st.impPrev || {};
  ['cort', 'vm'].forEach(k => { if (MAPAS.indexOf(k) < 0) MAPAS.push(k); });
  const css = document.createElement('style');
  css.textContent = '.slc{overflow:hidden;position:relative;line-height:0;background:#fff}'
    + '#vis.compacto>.bar:not(.abajo):not(.pro),#vis.compacto>.ptabs,#vis.compacto>.bar.pro,#vis.compacto>.bar.abajo{display:none}'
    + '#vis.compacto.menu>.bar:not(.abajo):not(.pro){display:flex;position:absolute;top:0;left:0;right:0;z-index:5;background:var(--fondo);box-shadow:0 4px 12px rgba(0,0,0,.2)}'
    + '#vis.compacto.menu>.ptabs{display:flex;position:absolute;top:46px;left:0;right:0;z-index:5;background:var(--fondo)}'
    + '#vis.compacto.menu>.bar.pro{display:flex;position:absolute;bottom:50px;left:0;right:0;z-index:5;background:var(--fondo)}'
    + '#vis.compacto.menu>.bar.abajo{display:flex;position:absolute;bottom:0;left:0;right:0;z-index:5;background:var(--fondo);box-shadow:0 -4px 12px rgba(0,0,0,.2)}'
    + '#vis-mb{display:none;position:absolute;top:50%;right:6px;transform:translateY(-50%);z-index:7;width:42px;height:42px;border-radius:50%;border:1.5px solid var(--borde);background:var(--panel);box-shadow:0 4px 14px rgba(0,0,0,.35);font-size:18px}'
    + '#vis.compacto #vis-mb{display:block}'
    + '#cutEd{position:fixed;inset:0;z-index:120;background:var(--fondo);display:flex;flex-direction:column;padding-top:env(safe-area-inset-top)}#cutEd .bar{display:flex;gap:6px;align-items:center;padding:6px 8px;border-bottom:1px solid var(--borde);flex-wrap:wrap}#cutEd .bar b{flex:1;font-size:14px;color:var(--verde-osc);min-width:120px}'
    + '#cutEd .ce-s{flex:1;overflow:auto;-webkit-overflow-scrolling:touch}#cutEd .ce-b{position:relative;line-height:0;background:#fff}#cutEd .ce-b img{width:100%;display:block}#cutEd svg{position:absolute;left:0;top:0;width:100%;height:100%;touch-action:none;cursor:crosshair}#cutEd.mano svg{touch-action:auto;pointer-events:none}'
    + '.cutsv{position:absolute;left:0;top:0;width:100%;height:100%;z-index:6;touch-action:none;cursor:crosshair}.cutmano .cutsv{touch-action:auto;pointer-events:none}'
    + '.cutbar{position:sticky;top:0;z-index:8;display:flex;gap:6px;align-items:center;flex-wrap:wrap;padding:6px 8px;background:var(--fondo);border:1px solid var(--borde);border-radius:8px;margin:4px 0}.cutbar small{flex-basis:100%;color:var(--gris);font-size:12px;line-height:1.3}'
    + '#cutEd small{padding:6px 10px;color:var(--gris);font-size:12.5px;border-top:1px solid var(--borde)}'
    + '#prevImp{position:fixed;inset:0;z-index:110;background:#8a8f8c;overflow:auto;padding:12px 8px 40px}#prevImp .hoja{background:#fff;color:#000;width:min(820px,100%);margin:0 auto;padding:14px 16px;box-shadow:0 8px 30px rgba(0,0,0,.45);font-family:"Source Sans 3","Segoe UI",Arial,sans-serif;text-align:justify}'
    + '#prevImp .pbox{overflow:hidden;width:calc(var(--zoom,100) * 1%);margin-left:auto;margin-right:auto}#prevImp .pieza{margin:0 0 10px}#prevImp svg.tp{display:none}#prevImp .ex-fb p{font-size:var(--fz,12px)!important;line-height:1.3!important;margin:2px 0!important}#prevImp .ex-fh{color:#c8102e;text-transform:uppercase}'
    + '#prevImp .px{position:sticky;top:0;z-index:3;display:flex;justify-content:flex-end;gap:8px;width:min(820px,100%);margin:0 auto 8px}#prevImp .px button{border:0;border-radius:99px;padding:8px 18px;font-weight:700;background:#c8102e;color:#fff}'
    + '.portada{border:2px solid #163f30;border-radius:10px;padding:14px 18px 12px;margin:0 0 4mm;text-align:center;break-inside:avoid;page-break-inside:avoid;background:#f2f7f3;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
    + '.portada .p-top{font-size:12.5px;letter-spacing:.18em;font-weight:800;color:#2f6b52;text-transform:uppercase}.portada h1{margin:4px 0 2px;font-size:27px;line-height:1.15;color:#163f30;font-family:Georgia,"Times New Roman",serif}'
    + '.portada .p-sub{font-size:14px;color:#1f2a24;font-style:italic}.portada .p-norm{font-size:12px;color:#555;margin:6px 0 8px}.portada .p-datos{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}'
    + '.portada .p-datos span{background:#fff;border:1px solid #bcd3c4;border-radius:99px;padding:3px 12px;font-size:12.5px}.portada .p-datos b{color:#163f30}.portada .p-pie{font-size:11px;color:#777;margin-top:6px}'
    + '@media print{.portada{margin:0 0 4mm}}';
  document.head.appendChild(css);
  const cortesDe = (t, nom) => ((st.cort || {})[t + '/' + nom]) || [];
  const vmDe = (t, p) => { const k = key(t, p.id), cu = ((C[t] || {})[p.id] || []).length; if (!cu) return 'a'; if (st.modoEsq) return 'e'; return st.vm[k] || (st.esq[k] ? 'ae' : 'a'); };
  const refresco = () => { if (!$('#vis').classList.contains('oculto')) pintaVisor(); else { const y = scrollY; verTema(); scrollTo(0, y); } };

  // ---------- trocear una foto sin las franjas que has quitado ----------
  function trocear(caja, t, nom, wh, zoomV) {
    const bs = cortesDe(t, nom); if (!bs.length || !wh) return; const W = wh[0], H = wh[1], ord = bs.slice().sort((a, b) => a[0] - b[0]), keep = []; let y = 0;
    ord.forEach(([a, b]) => { if (a - y >= 2) keep.push([y, a]); y = Math.max(y, b); }); if (H - y >= 2) keep.push([y, H]);
    const wp = zoomV > 1 ? 100 : (parseFloat(caja.style.width) || 100), cont = document.createElement('div'); cont.className = 'slcs'; cont.style.cssText = 'width:' + (zoomV > 1 ? zoomV * 100 : 100) + '%';
    keep.forEach(([a, b]) => {
      const sl = document.createElement('div'), c = caja.cloneNode(true); sl.className = 'slc'; sl.style.aspectRatio = W + ' / ' + ((b - a) * wp / 100);
      if (zoomV > 1) { c.style.width = '100%'; c.style.marginLeft = '0'; } c.style.marginTop = (-(a / W) * wp) + '%'; sl.appendChild(c); cont.appendChild(sl);
    });
    if (!keep.length) cont.innerHTML = '<div style="padding:18px;color:#888;font-size:13px">Has quitado todo este artículo (toca ✂️ para restaurar).</div>';
    caja.replaceWith(cont);
  }
  const nomFoto = (p, md) => (md === 'r' ? p.imgr : p.img);

  // ---------- tarjetas: quitar artículo / esquema / ambos, y cortes ----------
  const pl0 = pintaLista;
  pintaLista = function () {
    pl0();
    document.querySelectorAll('#m .card').forEach(c => {
      const p = D[tema].piezas.find(x => x.id === c.dataset.id); if (!p) return; const k = key(tema, p.id), cu = ((C[tema] || {})[p.id] || []).length;
      const w = c.querySelector(':scope > .imgw'), sv = w && w.querySelector('svg[data-mk]');
      if (sv) { const md = sv.dataset.mk.split('/').pop(), nom = nomFoto(p, md); if (nom && window.CUT_ED !== p.id) trocear(w, tema, nom.replace('.jpg', ''), md === 'r' ? p.whr : p.wh, 1); }
      const acc = c.querySelector('.acc'), vm = vmDe(tema, p);
      if (acc) {
        const e = acc.querySelector('[data-a="esq"]'); if (e) e.remove();
        const nc = cortesDe(tema, claveCorte(p)).length;
        acc.insertAdjacentHTML('beforeend', (cu ? '<span class="seg sbs" title="Qué ver de este artículo: el artículo, solo su esquema, o los dos">' + [['a', '📑', ' Artículo'], ['e', '🧩', ' Solo esquema'], ['ae', '📑🧩', ' Ambos']].map(x => '<button class="' + (vm === x[0] ? 'on' : '') + '" data-px2="vm" data-v="' + x[0] + '">' + x[1] + '<span class="lb">' + x[2] + '</span></button>').join('') + '</span>' : '')
          + '<button class="sb' + (nc || window.CUT_ED === p.id ? ' on' : '') + '" data-px2="cut" title="Dibuja un cuadro sobre lo que no te interesa, aquí mismo, y se quita">✂️<span class="lb"> ' + (window.CUT_ED === p.id ? 'Terminar de quitar' : 'Quitar trozos') + '</span>' + (nc ? ' (' + nc + ')' : '') + '</button>');
      }
      if (window.CUT_ED === p.id && vm !== 'e') cortarEnLinea(c, p);
      if (vm === 'e') c.querySelectorAll(':scope > .imgw, :scope > .slcs, :scope > .trib').forEach(x => { x.style.display = 'none'; });
    });
  };

  // ---------- quitar trozos aquí mismo, sobre lo que ves (recorte del Exprés, con lo añadido, o artículo entero) ----------
  // Foto de la que salen los cortes: la entera si lo que ves la lleva (artículo entero o recorte a medida), la recortada si no
  const compDe = p => !entera(p) && p.imgr && !!(compuesto(p) || compuestoFij(p));
  const claveCorte = p => ((entera(p) || !p.imgr || compDe(p)) ? p.img : p.imgr).replace('.jpg', '');
  function cortarEnLinea(c, p) {
    const w = c.querySelector(':scope > .imgw'); if (!w) return;
    const comp = compDe(p), K = tema + '/' + claveCorte(p), W = ((comp || entera(p) || !p.imgr) ? p.wh : p.whr)[0], H0 = ((comp || entera(p) || !p.imgr) ? p.wh : p.whr)[1], NS = 'http://www.w3.org/2000/svg';
    st.cort[K] = st.cort[K] || []; const pintas = [];
    const fusiona = () => { const o = st.cort[K].slice().sort((a, b) => a[0] - b[0]), r = []; o.forEach(b => { const u = r[r.length - 1]; if (u && b[0] <= u[1] + 2) u[1] = Math.max(u[1], b[1]); else r.push(b.slice()); }); st.cort[K] = r; };
    const bar = document.createElement('div'); bar.className = 'cutbar';
    bar.innerHTML = '<button class="ib on" data-cl="ok">✓ Listo</button><button class="ib" data-cl="mano" title="Mover la página con el dedo sin dibujar">✋</button><button class="ib" data-cl="undo" title="Deshacer el último corte">↶</button><button class="ib" data-cl="todo" title="Devolver todo lo quitado">Restaurar todo</button>'
      + '<small>Arrastra un cuadro sobre lo que no quieres, directamente en el artículo (también en los trozos que has añadido). Toca una franja roja para devolverla.</small>';
    w.parentNode.insertBefore(bar, w);
    const capa = (el, a, b) => {
      const H = b - a, svg = document.createElementNS(NS, 'svg'); let dib = null;
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('class', 'cutsv'); el.style.position = 'relative'; el.appendChild(svg);
      const pinta = () => { svg.innerHTML = st.cort[K].map(([c0, c1]) => { const y0 = Math.max(c0, a) - a, y1 = Math.min(c1, b) - a; return y1 - y0 > 0 ? '<rect x="0" y="' + y0 + '" width="' + W + '" height="' + (y1 - y0) + '" fill="rgba(210,40,40,.38)" stroke="#c0392b" stroke-width="3" stroke-dasharray="14 8"/>' : ''; }).join('')
        + (dib ? '<rect x="' + dib[0] + '" y="' + Math.min(dib[1], dib[3]) + '" width="' + Math.abs(dib[2] - dib[0]) + '" height="' + Math.abs(dib[3] - dib[1]) + '" fill="rgba(30,102,208,.25)" stroke="#1e66d0" stroke-width="3"/>' : ''); };
      svg.addEventListener('pointerdown', e => { if (c.classList.contains('cutmano')) return; const q = ptSvg(e, svg); dib = [q[0], q[1], q[0], q[1]]; svg.setPointerCapture(e.pointerId); e.preventDefault(); pinta(); });
      svg.addEventListener('pointermove', e => { if (!dib) return; const q = ptSvg(e, svg); dib[2] = q[0]; dib[3] = q[1]; pinta(); });
      svg.addEventListener('pointerup', e => {
        if (!dib) return; const q = ptSvg(e, svg), y0 = Math.round(Math.max(0, Math.min(dib[1], q[1]))), y1 = Math.round(Math.min(H, Math.max(dib[1], q[1]))), mov = Math.abs(q[0] - dib[0]) + (y1 - y0); dib = null;
        if (mov < 14) { const i = st.cort[K].findIndex(x => a + q[1] >= x[0] && a + q[1] <= x[1]); if (i >= 0) st.cort[K].splice(i, 1); } else if (y1 - y0 >= 8) { st.cort[K].push([a + y0, a + y1]); fusiona(); }
        guarda(); pintas.forEach(f => f());
      });
      pintas.push(pinta); pinta();
    };
    if (comp) w.querySelectorAll('.cmpb[data-ya]').forEach(el => capa(el, +el.dataset.ya, +el.dataset.yb)); else capa(w, 0, H0);
    bar.addEventListener('click', e => {
      const b = e.target.closest('[data-cl]'); if (!b) return; const x = b.dataset.cl;
      if (x === 'mano') { c.classList.toggle('cutmano'); b.classList.toggle('on', c.classList.contains('cutmano')); }
      if (x === 'undo') { st.cort[K].pop(); guarda(); pintas.forEach(f => f()); }
      if (x === 'todo') { st.cort[K] = []; guarda(); pintas.forEach(f => f()); }
      if (x === 'ok') { if (!st.cort[K].length) delete st.cort[K]; window.CUT_ED = null; guarda(); refresco(); }
    });
  }

  // ---------- editor de cortes: arrastra un cuadro sobre lo que quieres quitar ----------
  function editorCorte(t, id) {
    const p = D[t].piezas.find(x => x.id === id); if (!p) return; const full = entera(p) || st.vizEnt || !p.imgr, nom = (full ? p.img : p.imgr).replace('.jpg', ''), wh = full ? p.wh : p.whr, W = wh[0], H = wh[1], K = t + '/' + nom;
    st.cort[K] = st.cort[K] || []; let dib = null, mano = false;
    const ed = document.createElement('div'); ed.id = 'cutEd';
    ed.innerHTML = '<div class="bar"><button class="ib on" data-ce="ok">✓ Listo</button><b>✂️ ' + esc(p.nombre.replace(/^.* · /, '')) + '</b><button class="ib" data-ce="mano" title="Mover la página con el dedo sin dibujar">✋</button><button class="ib" data-ce="undo" title="Deshacer el último corte">↶</button><button class="ib" data-ce="todo" title="Restaurar todo el artículo">Restaurar todo</button></div>'
      + '<div class="ce-s"><div class="ce-b"><img src="' + D[t].dir + (full ? p.img : p.imgr) + '"><svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"></svg></div></div>'
      + '<small>Arrastra con el botón izquierdo (o el dedo) un cuadro sobre lo que no quieres. Se quita esa franja de arriba abajo (el texto se recoloca, no se puede dejar un hueco por un lado). Toca una franja roja para devolverla. Se aplica también al imprimir.</small>';
    document.body.appendChild(ed); const svg = ed.querySelector('svg');
    const pinta = () => { svg.innerHTML = st.cort[K].map((b, i) => '<g data-i="' + i + '"><rect x="0" y="' + b[0] + '" width="' + W + '" height="' + (b[1] - b[0]) + '" fill="rgba(210,40,40,.38)" stroke="#c0392b" stroke-width="3" stroke-dasharray="14 8"/></g>').join('') + (dib ? '<rect x="' + dib[0] + '" y="' + Math.min(dib[1], dib[3]) + '" width="' + Math.abs(dib[2] - dib[0]) + '" height="' + Math.abs(dib[3] - dib[1]) + '" fill="rgba(30,102,208,.25)" stroke="#1e66d0" stroke-width="3"/>' : ''); };
    const fusiona = () => { const o = st.cort[K].slice().sort((a, b) => a[0] - b[0]), r = []; o.forEach(b => { const u = r[r.length - 1]; if (u && b[0] <= u[1] + 2) u[1] = Math.max(u[1], b[1]); else r.push(b.slice()); }); st.cort[K] = r; };
    svg.addEventListener('pointerdown', e => { if (mano) return; const q = ptSvg(e, svg); dib = [q[0], q[1], q[0], q[1]]; svg.setPointerCapture(e.pointerId); e.preventDefault(); pinta(); });
    svg.addEventListener('pointermove', e => { if (!dib) return; const q = ptSvg(e, svg); dib[2] = q[0]; dib[3] = q[1]; pinta(); });
    svg.addEventListener('pointerup', e => {
      if (!dib) return; const q = ptSvg(e, svg), y0 = Math.round(Math.max(0, Math.min(dib[1], q[1]))), y1 = Math.round(Math.min(H, Math.max(dib[1], q[1]))), mov = Math.abs(q[0] - dib[0]) + (y1 - y0); dib = null;
      if (mov < 14) { const i = st.cort[K].findIndex(b => q[1] >= b[0] && q[1] <= b[1]); if (i >= 0) st.cort[K].splice(i, 1); } else if (y1 - y0 >= 8) { st.cort[K].push([y0, y1]); fusiona(); }
      guarda(); pinta();
    });
    ed.addEventListener('click', e => {
      const b = e.target.closest('[data-ce]'); if (!b) return; const x = b.dataset.ce;
      if (x === 'mano') { mano = !mano; ed.classList.toggle('mano', mano); b.classList.toggle('on', mano); }
      if (x === 'undo') { st.cort[K].pop(); guarda(); pinta(); }
      if (x === 'todo') { st.cort[K] = []; guarda(); pinta(); }
      if (x === 'ok') { if (!st.cort[K].length) delete st.cort[K]; guarda(); ed.remove(); refresco(); }
    });
    pinta();
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-px2]'); if (!b) return; const x = b.dataset.px2, c = b.closest('.card');
    if (x === 'vm' && c) { const id = c.dataset.id, k = key(tema, id), v = b.dataset.v; st.vm[k] = v; st.esq[k] = v === 'a' ? 0 : 1; if (st.modoEsq && v !== 'e') st.modoEsq = false; guarda(); refresco(); }
    if (x === 'cut' && c) { window.CUT_ED = window.CUT_ED === c.dataset.id ? null : c.dataset.id; refresco(); }
  });

  // ---------- visor: botón de cortar y menú plegable en horizontal ----------
  const pv0 = pintaVisor, mq = matchMedia('(max-height:700px) and (orientation:landscape)');
  pintaVisor = function () {
    pv0(); const v = $('#vis'), pro = v.querySelector('.bar.pro');
    if (pro) pro.insertAdjacentHTML('afterbegin', '<button class="ib" data-pro3="cut" title="Quitar trozos de este artículo">✂️</button>');
    const m = mq.matches; v.classList.toggle('compacto', m); if (!m) v.classList.remove('menu');
    v.insertAdjacentHTML('beforeend', '<button id="vis-mb" title="Mostrar / ocultar los menús">' + (v.classList.contains('menu') ? '✕' : '☰') + '</button>');
    const l = v.querySelector('#lienzo'), caja = l && l.querySelector('.lbox > .imgw'), im = caja && caja.querySelector('img'), sv = caja && caja.querySelector('svg[data-mk]');
    if (sv && im) { const md = sv.dataset.mk.split('/').pop(), id = vlista[vi], p = D[tema].piezas.find(z => z.id === id), nom = p && nomFoto(p, md); if (nom && cortesDe(tema, nom.replace('.jpg', '')).length) { const go = () => setTimeout(() => { if (caja.isConnected) trocear(caja, tema, nom.replace('.jpg', ''), md === 'r' ? p.whr : p.wh, zoom); }, 0); im.complete ? go() : im.addEventListener('load', go); } }
  };
  $('#vis').addEventListener('click', e => {
    if (e.target.closest('#vis-mb')) { $('#vis').classList.toggle('menu'); pintaVisor(); return; }
    const b = e.target.closest('[data-pro3]'); if (b && b.dataset.pro3 === 'cut') editorCorte(tema, vlista[vi]);
  });
  mq.addEventListener && mq.addEventListener('change', () => { if (!$('#vis').classList.contains('oculto')) pintaVisor(); });

  // ---------- impresión: portada, cortes, «usar lo que veo» y vista previa ----------
  const rb0 = rebanar;
  rebanar = function (z, t) {
    const X = (window.EXSUB_X = window.EXSUB_X || {}); X[t] = X[t] || {}; const guardado = {}, info = [];
    z.querySelectorAll('.pbox[data-cx]').forEach(pb => {
      const nom = pb.dataset.cx, bs = cortesDe(t, nom), im = pb.querySelector('img'); if (!bs.length || !im || !im.naturalWidth) return;
      const H = im.naturalHeight, orig = X[nom] || [], pts = new Set(orig.filter(y => y > 0 && y < H)); bs.forEach(b => { if (b[0] > 0 && b[0] < H) pts.add(b[0]); if (b[1] > 0 && b[1] < H) pts.add(b[1]); });
      guardado[nom] = X[nom]; X[t][nom] = [...pts].sort((a, b) => a - b); info.push([pb, nom, H, X[t][nom], bs]);
    });
    rb0(z, t);
    info.forEach(([pb, nom, H, cuts, bs]) => {
      const pts = [0, ...cuts, H], hijos = [...pb.children]; hijos.forEach((h, i) => { const a = pts[i], b = pts[i + 1]; if (bs.some(q => a >= q[0] - 1 && b <= q[1] + 1)) h.remove(); });
      if (guardado[nom] === undefined) delete X[t][nom]; else X[t][nom] = guardado[nom];
    });
  };
  const portada = t => {
    const sel = st.imp[t] || {}; let n = 0, nc = 0, pg = 0; D[t].piezas.forEach(p => { const s = sel[p.id]; if (hayAlgo(s)) { n++; pg += estPag(t, p, s); if (s.e) nc += ((C[t] || {})[p.id] || []).length; } });
    const co = D[t].cob || {q: 0, e: 0}, pq = co.q ? Math.round(co.e * 100 / co.q) : 0, normas = (D[t].cit || []).filter(c => c.nombre && D[t].piezas.some(p => p.id.startsWith(c.p + '-'))).map(c => c.nombre), f = new Date();
    return '<div class="portada"><div class="p-top">Tema ' + t + ' · Tu temario subrayado</div><h1>' + esc(NOMBRES[t - 1] || D[t].titulo.replace(/^Tema \d+ · /, '')) + '</h1><div class="p-sub">Versión Exprés: lo esencial, con tu subrayado</div>'
      + (normas.length ? '<div class="p-norm">' + normas.map(esc).join(' · ') + '</div>' : '')
      + '<div class="p-datos"><span><b>' + n + '</b> artículos</span>' + (nc ? '<span><b>' + nc + '</b> cuadros de esquema</span>' : '') + '<span><b>≈ ' + Math.max(1, Math.round(pg)) + '</b> páginas</span><span>cobertura de preguntas <b>' + pq + ' %</b> (' + co.e + ' de ' + co.q + ')</span></div>'
      + '<div class="p-pie">Impreso el ' + f.toLocaleDateString('es-ES') + '</div></div>';
  };
  const print0 = window.print.bind(window); let soloPrev = false;
  window.print = function () {
    const z = $('#zonaImp'); if (z && z.children.length && tema && !z.querySelector('.portada')) z.insertAdjacentHTML('afterbegin', portada(tema));
    if (soloPrev) { soloPrev = false; const o = document.createElement('div'); o.id = 'prevImp'; o.style.setProperty('--fz', (st.impOp.fz || 12) + 'px'); o.style.setProperty('--zoom', st.impOp.zoom || 85);
      o.innerHTML = '<div class="px"><button data-pv="x">✕ Cerrar vista previa</button><button data-pv="p">🖨 Imprimir</button></div><div class="hoja">' + z.innerHTML + '</div>'; document.body.appendChild(o); return; }
    return print0();
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-pv]'); if (!b) return; const o = $('#prevImp'); if (b.dataset.pv === 'x') o.remove(); else { o.remove(); lanzaImp(); }
  });
  function usarLoQueVeo() {
    const t = tema, sel = {}; D[t].piezas.forEach(p => { if (!pasaFiltro(p)) return; const cu = ((C[t] || {})[p.id] || []).length, vm = vmDe(t, p), s = {};
      if (vm !== 'e') { if (p.imgr && entera(p)) s.n = 1; else s.s = 1; } if (cu && vm !== 'a') s.e = 1; sel[p.id] = s; });
    st.impPrev[t] = st.imp[t] || {}; st.imp[t] = sel; guarda(); imprimirPanel(); aviso('Selección = lo que ves en pantalla');
  }
  const ip0 = imprimirPanel;
  imprimirPanel = function () {
    ip0(); const barra = document.querySelector('#mod .imp-bar'), ch = document.querySelector('#mod .chips'); if (!barra) return;
    if (ch) ch.insertAdjacentHTML('afterbegin', '<button class="chip on" data-ip2="veo" title="Marca para imprimir justo lo que estás viendo: artículo, esquema o ambos, con tus cortes">📋 Usar lo que veo en pantalla</button>');
    barra.insertAdjacentHTML('afterbegin', '<button class="ebtn" data-ip2="prev">👁 Vista previa</button>');
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-ip2]'); if (!b) return;
    if (b.dataset.ip2 === 'veo') usarLoQueVeo();
    if (b.dataset.ip2 === "prev") { soloPrev = true; setTimeout(() => { soloPrev = false; }, 2500); lanzaImp(); }
  });
  $('#b-imp').onclick = imprimirPanel;
};
