/* Botón «Margen» del Exprés subrayado (18/11/2026).
   · Panel con: Respuesta (A subrayada / B en el margen / A + B / ninguna), estilo del subrayado, distractores, marcas laterales e incluir IA.
   · Datos por tema en expres-subrayado/margen-tN.js (los saca prompts/herramientas/margen-datos.js leyendo las imágenes con OCR). Hoy solo el Tema 7.
   · Al llegar desde el test (#q=…) se subraya en lila la respuesta de esa pregunta, aunque el Margen esté desactivado. */
(function () {
  const KEY = 'exsub-margen', DEF = {on: false, md: 'amb', est: 'v', dis: true, lat: true, ia: true, lm: 'todas'};
  let cfg = Object.assign({}, DEF); try { Object.assign(cfg, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {} };
  const abierto = {}, EXTRA = 250;   // px que se añaden a la derecha de cada artículo para las tarjetas de respuesta
  const MG = () => (window.EXSUB_MARG || {})[tema], pedidos = {};
  const carga = t => { if (pedidos[t]) return; pedidos[t] = 1; const s = document.createElement('script'); s.src = 'expres-subrayado/margen-t' + t + '.js'; s.onload = () => { if (String(tema) === String(t)) aplica(); }; document.head.appendChild(s); };
  const e2 = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const nrm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const css = document.createElement('style');
  css.textContent = `
  .mg{position:absolute;left:0;top:0;height:100%;pointer-events:none;line-height:1.3}
  .mgc{position:absolute;top:0;left:calc(100% - ${EXTRA - 12}px);width:${EXTRA - 20}px;height:100%;line-height:1.3;pointer-events:none}
  body.mg-b .card .imgw{padding-right:${EXTRA}px;box-sizing:border-box}
  body.mg-b main{max-width:calc(var(--ancho) + ${EXTRA}px)}
  body.mg-b .card svg.ov{width:calc(100% - ${EXTRA}px)}
  .mg .br{position:absolute;border:3px solid;width:9px;border-radius:2px}.mg .br.l{border-right:0}.mg .br.r{border-left:0}
  .mg .br.of{color:#8a1c5a}.mg .br.ex{color:#c0392b}.mg .br.ast{color:#1f5fbf}.mg .br.ia{color:#5f6b7a;border-width:3px}
  .mg .bg{position:absolute;display:flex;gap:2px;align-items:center;white-space:nowrap;pointer-events:auto}
  .gk{display:inline-flex;align-items:center;justify-content:center;height:20px;min-width:22px;padding:0 5px;border-radius:11px;border:2px solid;font-size:10px;font-weight:800;background:#fff;cursor:pointer;text-decoration:none;line-height:1}
  .gk.exof{color:#8a1c5a;border-color:#8a1c5a}.gk.ex{color:#c0392b;border-color:#c0392b}.gk.ast{color:#1f5fbf;border-color:#1f5fbf;font-size:13px}.gk.ia{color:#555;border-color:#bbb;font-weight:600;background:#f4f4f4}
  .gk:hover{box-shadow:0 0 0 3px #1f4d3a33}
  .mg .cb{position:absolute;width:7px;border:3px solid currentColor}.mg .cb.l{border-right:0}.mg .cb.r{border-left:0}
  .mg .cb.tr{color:#d12b2b}.mg .cb.tg{color:#1c9a4f}.mg .cb.tb{color:#1f5fbf}
  .mg .hl{position:absolute;border-radius:2px;background:#b06bff40;border-bottom:3px solid #7a2fd0;mix-blend-mode:multiply}
  body.mg-e-a .mg .hl{background:#4aa8ff3d;border-bottom-color:#1668c4}
  body.mg-e-t .mg .hl{background:#00c9c855;border-bottom-color:#008b8b}
  body.mg-e-r .mg .hl{background:none;mix-blend-mode:normal;border:2px dashed #111;border-radius:4px}
  body.mg-e-0 .mg .hl{display:none}
  .mg .mq{position:absolute;border-radius:2px;background:#b06bff55;border-bottom:3px solid #7a2fd0;mix-blend-mode:multiply}
  .mgc .aq{position:absolute;left:0;width:100%;box-sizing:border-box;border-left:4px solid;padding:3px 7px;border-radius:0 7px 7px 0;font-size:12px;color:#222;pointer-events:auto}
  .mgc .aq.w{position:static;margin:0 0 4px}.mgc .box{position:absolute;left:0;width:100%}
  .mgc .tr{border-color:#d12b2b;background:#fdeded}.mgc .tg{border-color:#1c9a4f;background:#eaf7ef}.mgc .tb{border-color:#1f5fbf;background:#e8f0fc}
  .mgc .lb{display:block;font-size:10px;letter-spacing:.04em;text-transform:uppercase}
  .mgc .tr .lb{color:#d12b2b}.mgc .tg .lb{color:#1c9a4f}.mgc .tb .lb{color:#1f5fbf}
  .mgc mark.k{font-weight:700;color:#000;border-radius:2px;padding:0 1px}.mgc .tr mark.k{background:#ffb8b8}.mgc .tg mark.k{background:#a6e6bf}.mgc .tb mark.k{background:#b3cff7}
  .mgc .dis{font-size:10.5px;color:#6b7076;margin-top:4px;line-height:1.25;border-top:1px dashed #0002;padding-top:3px}
  .mgc .iaf{cursor:pointer;font-weight:700;font-size:12px;padding:2px 0;pointer-events:auto;background:none}.mgc .iaf.tg{color:#1c9a4f}.mgc .iaf.tb{color:#1f5fbf}.mgc .iaf:hover{text-decoration:underline}
  .mgp label{display:flex;gap:8px;align-items:center;margin:6px 0;font-size:14.5px}.mgp h3{margin:14px 0 4px;font-size:13px;color:var(--gris);text-transform:uppercase;letter-spacing:.04em}
  .mgp select{font-size:14px;padding:5px 8px;border-radius:8px;border:1.5px solid var(--borde);background:var(--panel);color:var(--texto)}
  @media print{.mg,.mgc{display:none!important}body.mg-b .card .imgw{padding-right:0}}`;
  document.head.appendChild(css);

  function aplica() {
    document.querySelectorAll('.mg,.mgc').forEach(x => x.remove());
    document.querySelectorAll('#m .imgw').forEach(b => { b.style.minHeight = ''; });
    const M = tema && MG(), q = window.QDEST;
    const b = !!(M && cfg.on && (cfg.md === 'mar' || cfg.md === 'amb'));
    document.body.classList.toggle('mg-b', b);
    document.body.className = document.body.className.replace(/\bmg-e-\w\b/g, '').trim() + ' mg-e-' + cfg.est;
    if (!M) { if (tema) carga(tema); return; }
    document.querySelectorAll('#m .card').forEach(card => {
      const im = card.querySelector('.imgw > img[data-z]'); if (!im) return;
      const file = decodeURIComponent(im.getAttribute('src') || '').split('/').pop(), d = M[file]; if (!d) return;
      const box = card.querySelector('.imgw'), mg = document.createElement('div'); mg.className = 'mg'; mg.style.width = b ? 'calc(100% - ' + EXTRA + 'px)' : '100%'; box.appendChild(mg);
      const Wd = mg.clientWidth, H = mg.clientHeight, k = Wd / d.w; if (!Wd) return;
      const rect = (cls, r, ext) => { const z = document.createElement('div'); z.className = cls; z.style.left = (r[0] * k - (ext || 0)) + 'px'; z.style.top = (r[1] * k) + 'px'; z.style.width = (r[2] * k + 2 * (ext || 0)) + 'px'; z.style.height = (r[3] * k) + 'px'; mg.appendChild(z); return z; };
      // 1) respuesta de la pregunta con la que llegas desde el test: lila (siempre)
      if (q && d.qr && d.qr[q]) { const R = d.qr[q], tq = /-ia-/.test(q) ? 'tg' : 'tr', a0 = R[0], z0 = R[R.length - 1]; R.forEach(r => rect('mq', r, 2));
        [['l', a0[0] * k - 8, a0], ['r', (z0[0] + z0[2]) * k + 3, z0]].forEach(([c, x, r]) => { const e = document.createElement('div'); e.className = 'cb ' + c + ' ' + tq; e.style.left = x + 'px'; e.style.top = (r[1] * k - 2) + 'px'; e.style.height = (r[3] * k + 4) + 'px'; mg.appendChild(e); }); }
      if (!cfg.on) return;
      const md = cfg.md, ia = cfg.ia, lat = cfg.lat, tx = d.tx || [0, d.w];
      const ms = d.m.map((x, ix) => { const of = x.of > 0, ast = x.ex.includes('*'), ex = x.ex.some(s => s === 'EX' || s === 'EXAMEN' || s === '1'), exof = x.ex.includes('EXOF'), labs = [];
        if (of || exof) labs.push(['exof', 'EXOF' + (x.of > 1 ? ' ×' + x.of : '')]); if (ex && !exof) labs.push(['ex', 'EX']); if (ast) labs.push(['ast', '✱']); if (x.ia) labs.push(['ia', '🎯 ' + x.ia]);
        return {i: ix, ast, det: x.det || [], a: x.a * k, b: Math.max(x.b * k, x.a * k + 16), labs, cl: (of || exof) ? 'of' : ex ? 'ex' : ast ? 'ast' : 'ia', q: x.q, iaq: x.iaq}; }).filter(x => x.labs.length && (x.cl !== 'ia' || ia || cfg.lm !== 'of'));
      // marcas laterales según «cuáles»: of = EXOF + EX + ✱ · ia = EXOF + 🎯 IA · todas
      const lm = cfg.lm, okL = c => lm === 'todas' || (lm === 'of' ? c !== 'ia' : (c === 'exof' || c === 'ia'));
      ms.forEach(m => { m.labsL = m.labs.filter(l => okL(l[0])); const f = m.labsL[0]; if (f) m.cl = f[0] === 'exof' ? 'of' : f[0]; });
      ms.sort((x, y) => x.a - y.a); const lanes = []; ms.filter(m => m.labsL.length).forEach(m => { let l = 0; while (lanes[l] !== undefined && lanes[l] > m.a - 2) l++; lanes[l] = m.b; m.l = l; });
      const nl = Math.max(1, lanes.length), v = encodeURIComponent(location.pathname.split('/').pop() + '#t=' + tema + '&p=' + card.dataset.id); let prev = -99;
      const key = (m) => tema + '/' + file + '/' + m.i;
      if (lat) ms.filter(m => m.labsL.length).forEach(m => {
        const L = tx[0] * k - 50 - m.l * 11, R = tx[1] * k + 22 + m.l * 11;
        [['l', L], ['r', R]].forEach(([c, x]) => { const z = document.createElement('div'); z.className = 'br ' + c + ' ' + m.cl; z.style.left = x + 'px'; z.style.top = m.a + 'px'; z.style.height = (m.b - m.a) + 'px'; mg.appendChild(z); });
        const y = Math.max(m.a, prev + 22); prev = y; const bg = document.createElement('div'); bg.className = 'bg'; bg.style.top = y + 'px'; bg.style.right = (Wd - (tx[0] * k - 50 - (nl - 1) * 11) + 8) + 'px';
        m.labsL.forEach(([c, t]) => { const s =document.createElement('a'); s.className = 'gk ' + c; s.textContent = t; const ids = c === 'ia' ? m.iaq : (m.q.length ? m.q : m.iaq);
          s.href = 'test-oficial-conocimiento.html#repasar=' + encodeURIComponent(ids.join(',')) + '&v=' + v; s.title = (c === 'ia' ? 'Practicar las preguntas de IA de este párrafo' : 'Abrir en el test: ' + ids.join(', ')); bg.appendChild(s); });
        mg.appendChild(bg); });
      // 2) respuesta: A subrayada con corchetes · B tarjetas en el margen
      const col = document.createElement('div'); col.className = 'mgc'; let prevA = -99, maxB = 0; if (md === 'mar' || md === 'amb') box.appendChild(col);
      const kw = dd => { if (!dd.o) return e2(dd.ans || ''); const ok = dd.o[dd.c], otros = new Set(dd.o.filter((_, n) => n !== dd.c).flatMap(t => nrm(t).match(/[a-z0-9]+/g) || []));
        return e2(ok).replace(/[\p{L}\p{N}]+/gu, w => (w.length > 3 && !otros.has(nrm(w))) ? '<mark class="k">' + w + '</mark>' : w); };
      const dis = dd => (cfg.dis && dd.o) ? '<div class="dis">' + dd.o.map((t, n) => n === dd.c ? '' : '<div>✗ ' + e2(t) + '</div>').join('') + '</div>' : '';
      const fmt = (dd, t) => '<div class="aq w ' + t + '"><b class="lb">Respuesta' + (dd.neg >= 2 ? ' (la incorrecta)' : '') + '</b>' + kw(dd) + dis(dd) + '</div>';
      ms.forEach(m => {
        const tp = dd => dd.ia ? (m.ast ? 'tb' : 'tg') : 'tr', of = m.det.filter(x => !x.ia), iaD = ia ? m.det.filter(x => x.ia) : [], ab = !!abierto[key(m)];
        if (md === 'sub' || md === 'amb') of.concat(ab ? iaD : []).forEach(dd => { if (!dd.rects.length) return; const t = tp(dd), R = dd.rects, a = R[0], z = R[R.length - 1];
          const cb = (c, x, r) => { const e = document.createElement('div'); e.className = 'cb ' + c + ' ' + t; e.style.left = x + 'px'; e.style.top = (r[1] * k - 2) + 'px'; e.style.height = (r[3] * k + 4) + 'px'; mg.appendChild(e); };
          cb('l', a[0] * k - 8, a); cb('r', (z[0] + z[2]) * k + 3, z); R.forEach(r => rect('hl', r, 2)); });
        if ((md === 'mar' || md === 'amb') && (of.length || iaD.length)) {
          const wrap = document.createElement('div'); wrap.className = 'box'; let t = of.map(dd => fmt(dd, 'tr')).join('');
          if (iaD.length) { const tt = m.ast ? 'tb' : 'tg'; t += '<div class="iaf ' + tt + '">🎯 ' + iaD.length + ' de práctica · ' + (ab ? 'ocultar ▴' : 'ver respuestas ▾') + '</div>' + (ab ? iaD.map(dd => fmt(dd, tt)).join('') : ''); }
          wrap.innerHTML = t; col.appendChild(wrap); const f = wrap.querySelector('.iaf'); if (f) f.onclick = () => { abierto[key(m)] = !abierto[key(m)]; aplica(); };
          const y = Math.max(m.a, prevA + 4); wrap.style.top = y + 'px'; prevA = y + wrap.offsetHeight; maxB = Math.max(maxB, prevA); } });
      if (md === 'mar' || md === 'amb') { if (maxB > H) box.style.minHeight = (maxB + 6) + 'px'; }
    });
    if (q && !window.__mgScroll) { const r = document.querySelector('.mg .mq'); if (r) { window.__mgScroll = 1; setTimeout(() => r.scrollIntoView({block: 'center'}), 150); } }
  }
  window.margenAplica = aplica;
  // Lila de la pregunta del test también en el visor ampliado (toque sobre el artículo): en %, así vale con cualquier zoom o recorte de márgenes
  window.margenVisor = function (caja, file) {
    const M = tema && MG(), q = window.QDEST; if (!q) return; if (!M) { if (tema) carga(tema); return; }
    const d = M[file]; if (!d || !d.qr || !d.qr[q] || !d.w || !d.h) return;
    const R = d.qr[q], tq = /-ia-/.test(q) ? 'tg' : 'tr', mg = document.createElement('div'); mg.className = 'mg'; mg.style.width = '100%'; caja.appendChild(mg);
    const pw = v => (v / d.w * 100) + '%', ph = v => (v / d.h * 100) + '%';
    R.forEach(r => { const z = document.createElement('div'); z.className = 'mq'; z.style.left = 'calc(' + pw(r[0]) + ' - 2px)'; z.style.top = ph(r[1]); z.style.width = 'calc(' + pw(r[2]) + ' + 4px)'; z.style.height = ph(r[3]); mg.appendChild(z); });
    const a0 = R[0], z0 = R[R.length - 1];
    [['l', 'calc(' + pw(a0[0]) + ' - 8px)', a0], ['r', 'calc(' + pw(z0[0] + z0[2]) + ' + 3px)', z0]].forEach(([c, x, r]) => { const e = document.createElement('div'); e.className = 'cb ' + c + ' ' + tq; e.style.left = x; e.style.top = 'calc(' + ph(r[1]) + ' - 2px)'; e.style.height = 'calc(' + ph(r[3]) + ' + 4px)'; mg.appendChild(e); });
  };
  // ---- botón y panel
  function panel() {
    const tiene = !!MG(), op = (v, t) => '<label><input type="radio" name="mg-md" value="' + v + '"' + (cfg.md === v ? ' checked' : '') + '> ' + t + '</label>';
    modal('<div class="mgp"><h2 style="margin:0 0 6px">📐 Margen</h2>' + (tiene ? '' : '<p style="color:#b5481d;margin:0 0 8px">Todavía solo está en el Tema 7: este tema no tiene datos de margen.</p>')
      + '<label><input type="checkbox" id="mg-on"' + (cfg.on ? ' checked' : '') + '> <b>Margen activado</b></label>'
      + '<h3>Respuesta</h3>' + op('sub', 'A · subrayada en el temario') + op('mar', 'B · escrita en el margen') + op('amb', 'A + B') + op('no', 'ninguna')
      + '<h3>Subrayado de la respuesta</h3><select id="mg-est">' + [['v', 'violeta'], ['a', 'azul'], ['t', 'turquesa'], ['r', 'recuadro punteado negro'], ['0', 'sin subrayado (solo corchetes)']].map(o => '<option value="' + o[0] + '"' + (cfg.est === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select>'
      + '<h3>Marcas laterales: cuáles</h3>' + [['of', 'oficiales (EXOF) + EX + ✱'], ['ia', 'oficiales + solo las de IA 🎯'], ['todas', 'todas (oficiales, EX, ✱ e IA)']].map(o => '<label><input type="radio" name="mg-lm" value="' + o[0] + '"' + (cfg.lm === o[0] ? ' checked' : '') + '> ' + o[1] + '</label>').join('')
      + '<h3>Otras opciones</h3><label><input type="checkbox" id="mg-dis"' + (cfg.dis ? ' checked' : '') + '> distractores</label><label><input type="checkbox" id="mg-lat"' + (cfg.lat ? ' checked' : '') + '> marcas laterales</label><label><input type="checkbox" id="mg-ia"' + (cfg.ia ? ' checked' : '') + '> incluir IA</label>'
      + '<button class="ebtn" style="width:100%;margin-top:14px" data-cerrar="1">Cerrar</button></div>');
  }
  document.getElementById('mod').addEventListener('change', e => { const t = e.target; if (!t.closest || !t.closest('.mgp')) return;
    if (t.id === 'mg-on') cfg.on = t.checked; else if (t.name === 'mg-md') { cfg.md = t.value; cfg.on = true; } else if (t.name === 'mg-lm') { cfg.lm = t.value; cfg.lat = true; cfg.on = true; } else if (t.id === 'mg-est') { cfg.est = t.value; cfg.on = true; } else if (t.id === 'mg-dis') cfg.dis = t.checked; else if (t.id === 'mg-lat') cfg.lat = t.checked; else if (t.id === 'mg-ia') cfg.ia = t.checked;
    const on = document.getElementById('mg-on'); if (on) on.checked = cfg.on; save(); aplica(); });
  const bt = document.getElementById('b-margen'); if (bt) bt.onclick = () => { if (!localStorage.getItem(KEY)) { cfg.on = true; save(); aplica(); } panel(); };
  let tm; addEventListener('resize', () => { clearTimeout(tm); tm = setTimeout(aplica, 200); });
})();
