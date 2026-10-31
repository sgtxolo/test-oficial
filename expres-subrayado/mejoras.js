// Mejoras «pro» de expres-subrayado.html: tapar el subrayado, memoria con plan diario, predictor, ojo de tribunal, gemelos, nota estimada, dossier, sincronización automática y atajos.
// Se carga antes del script principal y se activa con window.MEJORAS() justo antes de entra(): usa sus variables (st, D, tema, key…) y envuelve sus funciones sin tocar las fotos.
window.MEJORAS = function () {
  "use strict";
  const hoy = () => hoyISO(), yaVisto = id => id, PASOS_M = [2, 5, 12, 30, 60];
  st.mem = st.mem || {}; if (st.tapa === undefined) st.tapa = false; if (MAPAS.indexOf('mem') < 0) MAPAS.push('mem');
  const css = document.createElement('style');
  css.textContent = 'svg.tp{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}svg.tp rect{pointer-events:all;cursor:pointer;stroke:rgba(0,0,0,.35);stroke-width:1.5}svg.tp rect.off{fill-opacity:0;stroke-opacity:0}'
    + 'body.marcando svg.tp{display:none}@media print{svg.tp{display:none!important}.trib{display:none!important}}'
    + '.trib{margin:0;padding:7px 12px;font-size:12.5px;background:#fff7e0;color:#6b4a00;border-top:1px dashed #e0a800;line-height:1.5}.trib b{font-weight:800}.trib span{display:inline-block;background:#ffe9a8;border-radius:6px;padding:0 6px;margin:1px 3px 1px 0}'
    + '.tag.hot{background:#fde1dc;color:#a3281b}.tag.warm{background:#fff0c2;color:#7a5b00}.tag.cold{background:#e3eef8;color:#2a5b86}.tag.toca{background:#e2dafc;color:#4a2f9c}'
    + '#vis .bar.pro{justify-content:center;flex-wrap:wrap;border-bottom:0;border-top:1px solid var(--borde)}#vis .bar.pro small{font-size:11.5px;color:var(--gris);width:100%;text-align:center}'
    + '.pro-r{display:flex;gap:10px;align-items:center;padding:8px 10px;border:1px solid var(--borde);border-radius:10px;margin-top:6px;cursor:pointer;background:var(--panel)}.pro-r b{flex:1;font-size:13.5px}.pro-r small{display:block;font-weight:400;color:var(--gris);font-size:12px;margin-top:2px}'
    + '.nota-big{font-size:38px;font-weight:800;color:var(--verde-med);line-height:1}';
  document.head.appendChild(css);

  // ---------- datos de cada artículo ----------
  const quizS = () => { try { return leerStats(); } catch (e) { return {}; } };
  const ofic = (t, p) => (inv[t][p.id] || []).filter(q => !/-ia-/.test(q)).length;
  const puntos = (t, p) => { const m = p.m || {}; return 3 * !!m.exof + 2 * !!m.ex + 1 * !!m.ast + .5 * (m.r || []).length + 1.5 * Math.min(ofic(t, p), 4); };
  const nivel = (t, p) => { const s = puntos(t, p); return s >= 5 ? 'hot' : s >= 2 ? 'warm' : 'cold'; };
  const NIV = {hot: '🔥 cae mucho', warm: '🟡 puede caer', cold: '❄️ poco probable'};
  const memDe = (t, p) => st.mem[key(t, p.id)];
  const debe = (t, p) => { const m = memDe(t, p); return !!(m && m.d <= hoy()); };
  function dominio(t, p, S) {
    const m = memDe(t, p); if (m) return m.r === 'se' ? Math.min(1, .8 + .04 * (m.n || 1)) : m.r === 'reg' ? .5 : .15;
    const e = estadoDe(t, p, S); return !e ? .3 : e.c === 'ok' ? .9 : e.c === 'dud' ? .5 : e.c === 'mal' ? .15 : .25;
  }
  function valora(k, r) {
    const m = st.mem[k] = st.mem[k] || {n: 0}, dEx = diasHasta(st.examen); let dias;
    if (r === 'no') { m.n = 0; dias = 1; } else if (r === 'reg') { m.n = 1; dias = 3; } else { m.n = (m.n || 0) + 1; dias = PASOS_M[Math.min(m.n - 1, PASOS_M.length - 1)]; }
    if (dEx > 1) dias = Math.min(dias, Math.max(1, Math.floor(dEx / 2)));   // el último repaso cae siempre antes del examen
    m.r = r; m.u = hoy(); m.d = masDias(hoy(), dias); st.vis[k] = 1; guarda(); return dias;
  }
  function notaEst(ts) {
    const S = quizS(); let sw = 0, sd = 0;
    ts.forEach(t => visibles(t).forEach(p => { const w = 1 + puntos(t, p); sw += w; sd += w * dominio(t, p, S); }));
    if (!sw) return null; const d = sd / sw, acc = d + (1 - d) * .25;   // lo que no sabes se acierta al azar entre 4 opciones; cada fallo resta 1/3
    return {pct: Math.round(d * 100), nota: Math.max(0, 10 * (acc - (1 - acc) / 3))};
  }

  // ---------- ojo de tribunal: lo que suelen cambiar en las preguntas ----------
  const TRIB = {};
  const RX = [
    ['cifras', /(?:\b\d+|\b(?:un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|quince|veinte|treinta|cuarenta|cincuenta|sesenta|noventa|cien|ciento))\s+(?:días?(?:\s+(?:hábiles|naturales))?|meses|años?|horas?|semanas?|euros|miembros|votos|por\s+ciento)\b|\b\d+(?:[.,]\d+)?\s*%/gi],
    ['mayorías', /mayor[ií]a\s+(?:absoluta|simple|cualificada|de\s+\w+(?:\s+\w+)?)|tres\s+quintos|dos\s+tercios|unanimidad/gi],
    ['podrá/deberá', /\b(?:no\s+)?(?:podrá|podrán|deberá|deberán|habrá\s+de|estará\s+obligad[oa]s?|queda\s+prohibid[oa])\b/gi],
    ['excepciones', /\b(?:salvo|excepto|sin\s+perjuicio|en\s+todo\s+caso|únicamente|exclusivamente|al\s+menos|como\s+máximo|como\s+mínimo)\b/gi]
  ];
  function textoDe(t, p) { const f = typeof fichaExpres === 'function' ? fichaExpres(t, p) : null; return f ? f.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ') : ''; }
  function trib(t, p) {
    const k = t + '/' + p.id; if (TRIB[k]) return TRIB[k];
    const tx = textoDe(t, p), o = {}; RX.forEach(([n, re]) => { const s = new Set((tx.match(re) || []).map(x => x.toLowerCase().replace(/\s+/g, ' '))); if (s.size) o[n] = [...s].slice(0, 8); });
    return TRIB[k] = {tx, o};
  }
  const tribHTML = (t, p) => { const o = trib(t, p).o, ks = Object.keys(o); return ks.length ? '<div class="trib">⚠ <b>Ojo de tribunal</b> · ' + ks.map(n => '<b>' + n + ':</b> ' + o[n].map(x => '<span>' + esc(x) + '</span>').join('')).join(' ') + '</div>' : ''; };

  // ---------- tapar mi subrayado ----------
  const oscuro = h => { const n = parseInt(h.slice(1), 16); return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v * .8).toString(16).padStart(2, '0')).join(''); };
  function tapaHTML(vk, wh) {
    if (!st.tapa) return ''; const [t, id, md] = vk.split('/'), p = ((D[t] || {}).piezas || []).find(x => x.id === id); if (!p) return '';
    const nom = (md === 'r' ? p.imgr : p.img); if (!nom) return ''; const bs = ((window.EXSUB_TAPA || {})[t] || {})[nom.replace('.jpg', '')]; if (!bs || !bs.length) return '';
    const W = wh ? wh[0] : 1075, H = wh ? wh[1] : 600;
    return '<svg class="tp" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' + bs.map(b => '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '" rx="4" fill="' + oscuro(b[4]) + '"/>').join('') + '</svg>';
  }
  const cm0 = capaMarcas; capaMarcas = function (vk, wh) { return cm0(vk, wh) + tapaHTML(vk, wh); };
  document.addEventListener('click', e => { const r = e.target.closest && e.target.closest('svg.tp rect'); if (r) { r.classList.toggle('off'); e.stopPropagation(); } }, true);
  const destapa = () => { const rs = [...document.querySelectorAll('svg.tp rect')], todo = rs.every(r => r.classList.contains('off')); rs.forEach(r => r.classList.toggle('off', !todo)); };
  const ponTapa = v => { st.tapa = v === undefined ? !st.tapa : v; guarda(); aviso(st.tapa ? '🙈 Subrayado tapado: toca una caja para verla' : 'Subrayado a la vista'); };

  // ---------- filtros nuevos ----------
  const pf0 = pasaFiltro;
  pasaFiltro = function (p) {
    if (filtro === 'toca' || filtro === 'hot') { const f = filtro; filtro = 'todos'; let r; try { r = pf0(p); } finally { filtro = f; } return r && (f === 'toca' ? debe(tema, p) : nivel(tema, p) === 'hot'); }
    return pf0(p);
  };
  const cab0 = cabTema;
  cabTema = function () {
    cab0(); const fila = [...document.querySelectorAll('#herr .in .chips')].pop(); if (!fila) return;
    const n = visibles(tema).filter(p => debe(tema, p)).length;
    fila.insertAdjacentHTML('beforeend', '<button class="chip' + (st.tapa ? ' on' : '') + '" data-px="tapa" title="Tapa tu fosforito: toca la caja para verlo (T en el visor)">🙈 Tapar subrayado</button>'
      + '<button class="chip' + (filtro === 'toca' ? ' on' : '') + '" data-px="toca">🧠 Toca hoy (' + n + ')</button><button class="chip' + (filtro === 'hot' ? ' on' : '') + '" data-px="hot" title="Los que más probabilidad tienen de caer según tus preguntas oficiales y marcas">🔥 Calientes</button>');
  };
  $('#herr').addEventListener('click', e => {
    const b = e.target.closest('[data-px]'); if (!b) return; const x = b.dataset.px;
    if (x === 'tapa') ponTapa(); else filtro = filtro === x ? 'todos' : x;
    cabTema(); pintaLista();
  });

  // ---------- decorado de las tarjetas ----------
  const pl0 = pintaLista;
  pintaLista = function () {
    pl0();
    document.querySelectorAll('#m .card').forEach(c => {
      const p = D[tema].piezas.find(x => x.id === c.dataset.id); if (!p) return; const cab = c.querySelector('.cab'), acc = c.querySelector('.acc'), n = nivel(tema, p), m = memDe(tema, p), no = ofic(tema, p);
      if (cab) { const nm = cab.querySelector('.nom'); const tags = '<span class="tag ' + n + '" title="Probabilidad según preguntas oficiales (' + no + ') y tus marcas EXOF/EX/✱/R">' + NIV[n] + '</span>' + (debe(tema, p) ? '<span class="tag toca">🧠 toca repasar</span>' : m ? '<span class="tag" title="Próximo repaso">🧠 ' + fmtF(m.d).slice(0, 5) + '</span>' : ''); if (nm) nm.insertAdjacentHTML('afterend', tags); }
      if (acc && no) { const q = (inv[tema][p.id] || []).filter(x => !/-ia-/.test(x)).join(','), v = location.pathname.split('/').pop() + '#t=' + tema + '&p=' + p.id; acc.insertAdjacentHTML('beforeend', '<a class="sb" href="test-oficial-conocimiento.html#repasar=' + encodeURIComponent(q) + '&v=' + encodeURIComponent(v) + '" title="Solo las preguntas de examen oficial de este artículo">❓<span class="lb"> Oficiales</span> (' + no + ')</a>'); }
      const t1 = tribHTML(tema, p), w = c.querySelector('.imgw'); if (t1) (w || c.querySelector('.acc') || c).insertAdjacentHTML(w ? 'afterend' : 'beforeend', t1);
    });
  };

  // ---------- visor: valorar, tapar y atajos ----------
  const pv0 = pintaVisor;
  pintaVisor = function () {
    pv0(); const v = $('#vis'), id = vlista[vi], p = D[tema].piezas.find(x => x.id === id), ab = v.querySelector('.bar.abajo'); if (!p || !ab) return;
    const m = memDe(tema, p), n = nivel(tema, p);
    ab.insertAdjacentHTML('beforebegin', '<div class="bar pro"><button class="ib" data-pro="no" title="1">😕 No lo sé</button><button class="ib" data-pro="reg" title="2">🙂 Regular</button><button class="ib" data-pro="se" title="3">😎 Lo sé</button>'
      + '<button class="ib' + (st.tapa ? ' on' : '') + '" data-pro="tapa" title="T">🙈</button><button class="ib" data-pro="dest" title="Espacio">👁</button>'
      + '<small>' + NIV[n] + (m ? ' · último: ' + ({no: 'no lo sabía', reg: 'regular', se: 'lo sabía'}[m.r] || '') + ' · próximo repaso ' + fmtF(m.d) : ' · aún sin valorar') + '</small></div>');
  };
  function valoraVisor(r) { const id = vlista[vi]; if (!id) return; const d = valora(key(tema, id), r); aviso({no: '😕 mañana', reg: '🙂 en 3 días', se: '😎 en ' + d + ' días'}[r]); if (vi < vlista.length - 1) { vi++; zoom = 1; } pintaVisor(); }
  $('#vis').addEventListener('click', e => {
    const b = e.target.closest('[data-pro]'); if (!b) return; const x = b.dataset.pro;
    if (x === 'tapa') { ponTapa(); pintaVisor(); } else if (x === 'dest') destapa(); else valoraVisor(x);
  });
  $('#vis').addEventListener('dblclick', e => { if (e.target.closest('.bar, .ptabs, svg.tp rect')) return; valoraVisor('se'); });   // doble toque = «Lo sé»
  addEventListener('keydown', e => {
    if ($('#vis').classList.contains('oculto') || /INPUT|TEXTAREA|SELECT/.test((e.target || {}).tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase(), id = vlista[vi], kk = key(tema, id);
    if (k === '1') valoraVisor('no'); else if (k === '2') valoraVisor('reg'); else if (k === '3') valoraVisor('se');
    else if (k === 't') { ponTapa(); pintaVisor(); } else if (k === ' ') { e.preventDefault(); destapa(); }
    else if (k === 'v') { st.vis[kk] = st.vis[kk] ? 0 : 1; guarda(); pintaVisor(); } else if (k === 'd') { st.dif[kk] = st.dif[kk] ? 0 : 1; guarda(); pintaVisor(); }
  });

  // ---------- panel pro: nota estimada, calientes, cifras, gemelos, dossier ----------
  const fi = (t, p, ex) => '<div class="pro-r" data-pir2="' + t + '|' + p.id + '"><b>' + esc(p.nombre.replace(/^.* · /, '')) + '<small>' + esc(ex) + '</small></b></div>';
  function gemelos(t) {
    const ps = visibles(t).filter(p => p.fx !== undefined), sh = ps.map(p => { const w = textoDe(t, p).toLowerCase().replace(/[^a-záéíóúñü0-9 ]/g, ' ').split(/\s+/).filter(x => x.length > 2), s = new Set(); for (let i = 0; i + 2 < w.length; i++) s.add(w[i] + ' ' + w[i + 1] + ' ' + w[i + 2]); return s; }), out = [];
    for (let i = 0; i < ps.length; i++) { if (sh[i].size < 8) continue; for (let j = i + 1; j < ps.length; j++) { if (sh[j].size < 8) continue; let c = 0; const [a, b] = sh[i].size < sh[j].size ? [sh[i], sh[j]] : [sh[j], sh[i]]; a.forEach(x => { if (b.has(x)) c++; }); const s = c / (sh[i].size + sh[j].size - c); if (s > .1 && s < .97) out.push([s, ps[i], ps[j]]); } }
    return out.sort((x, y) => y[0] - x[0]).slice(0, 14);
  }
  function panelPro() {
    if (!tema) { aviso('Abre antes un tema'); return; } const t = tema, S = quizS(), ne = notaEst([t]), ng = notaEst(Object.keys(D)), vs = visibles(t);
    const cal = vs.filter(p => nivel(t, p) === 'hot').map(p => [p, puntos(t, p) * (1 - dominio(t, p, S))]).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const cif = vs.map(p => [p, trib(t, p).o]).filter(([, o]) => o['cifras'] || o['mayorías']).slice(0, 60);
    const gm = gemelos(t); const nuevos = Object.keys(D).reduce((s, x) => s + visibles(x).filter(p => !st.vis[key(x, p.id)] && !memDe(x, p)).length, 0), dEx = Math.max(1, diasHasta(st.examen)), porDia = Math.ceil(nuevos / Math.max(1, Math.floor(dEx * .7)));
    let h = '<h2 style="margin:0 0 10px">⚡ Panel pro · Tema ' + t + '</h2>'
      + '<div class="bloque"><h5>📈 Nota estimada si el examen fuera hoy</h5><div class="dias"><div><div class="nota-big">' + (ne ? ne.nota.toFixed(1).replace('.', ',') : '–') + '</div><small>este tema · dominas ' + (ne ? ne.pct : 0) + ' %</small></div><div><div class="nota-big" style="font-size:28px">' + (ng ? ng.nota.toFixed(1).replace('.', ',') : '–') + '</div><small>todos los temas cargados · ' + (ng ? ng.pct : 0) + ' %</small></div></div>'
      + '<p style="font-size:12px;color:var(--gris);margin:8px 0 0">Estimación orientativa: mezcla lo que valoras («Lo sé / Regular / No lo sé») y tus tests, pondera cada artículo por lo probable que es que caiga, supone azar entre 4 opciones en lo que no sabes y resta 1/3 por fallo. Solo cuenta los recortes cargados en esta app.</p></div>'
      + '<div class="bloque"><h5>🗓 Plan de hoy</h5><b>' + vs.filter(p => debe(t, p)).length + '</b> repasos de este tema + unos <b>' + porDia + '</b> artículos nuevos al día para llegar al examen (' + dEx + ' días). <button class="chip on" data-pro2="toca">Ver lo que toca hoy</button></div>'
      + '<div class="bloque"><h5>🔥 Calientes que aún no dominas</h5>' + (cal.length ? cal.map(([p]) => fi(t, p, NIV.hot + ' · ' + ofic(t, p) + ' oficiales' + ((p.m || {}).exof ? ' · EXOF' : ''))).join('') : '<small>Nada urgente: no hay calientes sin dominar.</small>') + '</div>'
      + '<div class="bloque"><h5>🔢 Cifras y mayorías del tema</h5>' + (cif.length ? cif.map(([p, o]) => fi(t, p, [].concat(o['cifras'] || [], o['mayorías'] || []).join(' · '))).join('') : '<small>Sin datos: se leen del texto del Exprés.</small>') + '</div>'
      + '<div class="bloque"><h5>👯 Artículos que se confunden (texto parecido)</h5>' + (gm.length ? gm.map(g => '<div class="pro-r" data-pgem="' + g[1].id + '|' + g[2].id + '"><b>' + esc(g[1].nombre.replace(/^.* · /, '')) + ' ⇄ ' + esc(g[2].nombre.replace(/^.* · /, '')) + '<small>' + Math.round(g[0] * 100) + ' % parecidos · toca para verlos juntos</small></b></div>').join('') : '<small>No he encontrado parejas muy parecidas en este tema.</small>') + '</div>'
      + '<div class="bloque"><h5>📄 Dossier final</h5><p style="font-size:13px;margin:0 0 8px">Selecciona para imprimir los 40 artículos de más riesgo (los que más pueden caer y peor dominas) con tu subrayado recortado. Sustituye la selección de impresión de este tema.</p><button class="chip on" data-pro2="dossier">Preparar dossier</button></div>'
      + '<button class="ebtn" style="width:100%;margin-top:14px" data-cerrar="1">Cerrar</button>';
    modal(h, true);
  }
  function dossier() {
    const t = tema, S = quizS(), top = visibles(t).map(p => [p, (1 + puntos(t, p)) * (1 - dominio(t, p, S))]).sort((a, b) => b[1] - a[1]).slice(0, 40), sel = {};
    top.forEach(([p]) => { sel[p.id] = {s: 1}; }); st.impPrev = st.impPrev || {}; st.impPrev[t] = st.imp[t] || {}; st.imp[t] = sel; guarda(); cierra(); imprimirPanel(); aviso('Dossier preparado: ' + top.length + ' artículos');
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-pir2]'), g = e.target.closest('[data-pgem]'), x = e.target.closest('[data-pro2]');
    if (a) { const [t, id] = a.dataset.pir2.split('|'); cierra(); tema = t; filtro = 'todos'; inst = 'todas'; marca = null; busca = ''; dest = id; destAp = null; verTema(); irA(); }
    else if (g) { const [i, j] = g.dataset.pgem.split('|'); comparar(i, j); }
    else if (x) { if (x.dataset.pro2 === 'dossier') dossier(); else if (x.dataset.pro2 === 'toca') { cierra(); filtro = 'toca'; verTema(); } }
  });
  const bp = document.createElement('button'); bp.className = 'ib'; bp.id = 'b-pro'; bp.title = 'Panel pro: nota estimada, calientes, cifras, gemelos y dossier'; bp.textContent = '⚡'; bp.onclick = panelPro;
  $('#b-herr').parentNode.insertBefore(bp, $('#b-herr'));

  // ---------- inicio: repaso de hoy y nota estimada ----------
  const d0 = dash;
  dash = function () {
    d0(); const ts = Object.keys(D).sort((a, b) => a - b), deb = ts.map(t => [t, visibles(t).filter(p => debe(t, p)).length]).filter(x => x[1]), ng = notaEst(ts), h3 = document.querySelector('#m h3.sec'); if (!h3) return;
    const tot = deb.reduce((s, x) => s + x[1], 0);
    h3.insertAdjacentHTML('beforebegin', '<h3 class="sec">Repaso de hoy</h3><div class="cont" style="margin-top:0"><div><b>🧠 ' + tot + ' recorte' + (tot === 1 ? '' : 's') + ' para repasar hoy</b><span>' + (deb.length ? deb.map(x => 'Tema ' + x[0] + ': ' + x[1]).join(' · ') : 'Nada pendiente. Valora los artículos con 😕 🙂 😎 en el visor y aquí saldrá lo que toca.') + '</span></div>' + (deb[0] ? '<button data-pdash="' + deb[0][0] + '">Repasar →</button>' : '') + '</div>'
      + (ng ? '<div class="cont" style="margin-top:10px;background:var(--verde-suave);border-color:var(--verde-med)"><div><b>📈 Nota estimada: ' + ng.nota.toFixed(1).replace('.', ',') + ' / 10</b><span>si el examen fuera hoy, con lo cargado en esta app (' + ng.pct + ' % dominado). Detalle en ⚡ dentro de un tema.</span></div></div>' : ''));
  };
  $('#m').addEventListener('click', e => { const b = e.target.closest('[data-pdash]'); if (!b) return; tema = b.dataset.pdash; filtro = 'toca'; verTema(); scrollTo(0, 0); setTimeout(() => repaso(), 50); });

  // ---------- sincronización automática: sube al parar (2 min) o al salir; baja al volver ----------
  const sm0 = window.syncMarca; let tAuto = 0;
  const sucio = () => JJ(estadoSync()) !== localStorage.getItem(GH_BASE + '-s');
  window.syncMarca = function () { sm0(); clearTimeout(tAuto); if (hayGh() && !emb) tAuto = setTimeout(() => { if (sucio()) sincronizar(false); }, 120000); };
  document.addEventListener('visibilitychange', () => { if (!hayGh() || emb) return; if (document.visibilityState === 'hidden') { if (sucio()) sincronizar(false); } else sincronizar(false, true); });
};
