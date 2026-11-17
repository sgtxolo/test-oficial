// Tema 25 · parte «no BOE» del esquema literal: Reglamento (UE) 2016/794 (Europol, págs. 44-98 del oficial) y Estatuto de INTERPOL (págs. 99-106).
// build(oficialTxt, mk) → { eur, int } (HTML de fichas). mk(ley, art, tok, idx, texto, cnt) devuelve el atributo data-ex/data-r de las marcas.
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ORDEN_ART = /^\s*Art[ií]culo (\d+)(?: (bis|ter|quater|quinquies))?\s*$/;
module.exports.build = function (txt, mk) {
  const pags = txt.replace(/\r/g, '').split(/=====PAG (\d+) ?=====/); const por = {};
  for (let i = 1; i < pags.length; i += 2) por[+pags[i]] = pags[i + 1];
  const rango = (a, b) => { let t = ''; for (let p = a; p <= b; p++) t += (por[p] || '') + '\n'; return t.split('\n'); };
  const SUF = { 4: 'Europol', 5: 'INTERPOL' };
  // ---------- generador de fichas
  const nuevo = (ley) => {
    let h = '', abierta = false, art = '', idx = 0, cur = null, parrafos = [], tokCnt = {}, cab = [];
    const TOK = /^(\d+\.|[a-z]{1,2}(?: bis)?\)|[ivx]+\))\s+(.*)$/;
    const flushP = () => { if (cur) { const sg = cur.tok ? (/\)$/.test(cur.tok) ? ' style="margin-left:18px"' : '') : ''; parrafos.push(`<p${sg}${mk(ley, art, cur.tok || '~', cur.idx, cur.texto, cur.cnt)}>${cur.tok ? '<b>' + esc(cur.tok) + '</b> ' : ''}${esc(cur.texto)}</p>`); cur = null; } };
    const cierra = () => { flushP(); if (abierta) { h += parrafos.join('') + '</div></div></div>'; parrafos = []; abierta = false; } };
    const vuelca = () => { if (cab.length) { cierra(); h += `<div class="bloque-titulo">${esc(cab.join(' · '))}</div>`; cab = []; } };
    const abre = (clave, rotulo) => { cierra(); vuelca(); art = clave; idx = 0; tokCnt = {}; h += `<div class="articulo"><div class="articulo-head">${esc(rotulo + ' · ' + SUF[ley])}</div><div class="articulo-body"><div class="txt">`; abierta = true; };
    const parr = (texto, aparte) => { flushP(); idx++; const n = aparte ? null : texto.match(TOK); const tk = n ? n[1] : ''; tokCnt[tk] = (tokCnt[tk] || 0) + 1; cur = n ? { tok: n[1], texto: n[2], idx, cnt: tokCnt[tk] } : { tok: '', texto, idx, cnt: tokCnt[tk] }; };
    const cont = (l) => { if (cur) cur.texto += (/-$/.test(cur.texto) ? '' : ' ') + l; else parr(l); };
    return { abre, parr, cont, cierra, vuelca, titulo: t => { cierra(); h += `<div class="bloque-titulo">${esc(t)}</div>`; }, cab: t => { cierra(); cab.push(t); }, get h() { cierra(); vuelca(); return h; }, get abierta() { return abierta; } };
  };
  // ---------- EUROPOL
  const E = nuevo(4);
  const lin = rango(44, 98);
  const cabeceraPag = /^\s*(\d{1,2}\.\d{1,2}\.\d{4}\s+ES\s+Diario Oficial|L \d+\/\d+\s+Diario Oficial|À|Á)/;
  let modo = 'pre', recital = 0, pie = false;
  E.titulo('REGLAMENTO (UE) 2016/794 DEL PARLAMENTO EUROPEO Y DEL CONSEJO, DE 11 DE MAYO DE 2016, RELATIVO A LA AGENCIA DE LA UNIÓN EUROPEA PARA LA COOPERACIÓN POLICIAL (EUROPOL)');
  let primerRec = true;
  for (let i = 0; i < lin.length; i++) {
    const raw = lin[i], l = raw.trim(); if (!l) continue;
    if (cabeceraPag.test(l)) { pie = false; continue; }
    if (/^HAN ADOPTADO EL PRESENTE REGLAMENTO/.test(l)) { E.cierra(); modo = 'art'; E.titulo('HAN ADOPTADO EL PRESENTE REGLAMENTO'); continue; }
    if (modo === 'pre') {
      const m = l.match(/^\((\d+)\)\s+(.*)$/);
      if (m && +m[1] === recital + 1) { pie = false; recital++; if (primerRec) { E.abre('con', 'Considerandos'); primerRec = false; } E.parr(l, false); continue; }
      if (m) { pie = true; continue; }          // nota al pie
      if (pie) continue;
      if (/^Considerando lo siguiente:?/.test(l)) continue;
      if (primerRec) continue;                  // título, visto, vista…
      E.cont(l); continue;
    }
    // ---- articulado
    const sg = raw.length - raw.replace(/^\s+/, '').length;
    if (pie && sg > 20 && (ORDEN_ART.test(l) || /^(CAPÍTULO [IVX]+|SECCIÓN \d+|ANEXO [IVX]+)/i.test(l))) pie = false;
    if (pie) continue;
    if (/^\(\d{1,2}\)\s/.test(l)) { pie = true; continue; }
    if (/^(CAPÍTULO [IVX]+|SECCIÓN \d+|Sección \d+)\s*$/.test(l)) { E.cab(l + ' '); const nx = (lin[i + 1] || '').trim(); if (nx && nx === nx.toUpperCase() && !ORDEN_ART.test(nx)) { E.cab(nx); i++; } continue; }
    if (/^ANEXO [IVX]+/.test(l)) { E.cierra(); E.abre(l.replace(/\s+/g, ' '), l); const nx = (lin[i + 1] || '').trim(); continue; }
    const ma = l.match(ORDEN_ART);
    if (ma) { const clave = ma[1] + (ma[2] ? ' ' + ma[2] : ''); E.abre(clave, 'Artículo ' + clave); const nx = (lin[i + 1] || '').trim(); if (nx && !/^\d+\.|^[a-z]\)/.test(nx) && nx.length < 140 && sg > 5 || (nx && nx.length < 110 && !/[.:;]$/.test(nx) && !/^\d+\.|^[a-z]\)/.test(nx))) { E.parr(nx, true); i++; } continue; }
    if (!E.abierta) { E.cab(l); continue; }
    if (/^(\d+\.|[a-z]{1,2}\)|[ivx]+\))\s/.test(l)) E.parr(l); else E.cont(l);
  }
  let eur = E.h;
  // ---------- NOVEDADES de MI PDF (reforma del Reglamento: artículos modificados se sustituyen; nuevos «bis/ter…» se insertan tras su base)
  try {
    const NV = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'novedades-europol.json'), 'utf8')).articulos;
    const partes = eur.split('<div class="articulo">'); const cab = partes.shift();
    const head = p => (p.match(/articulo-head">([^<]*)</) || [])[1] || '';
    const claveDe = p => { const m = head(p).match(/^Artículo (\d+(?: \w+)?) · Europol/); return m ? m[1] : (/^ANEXO/.test(head(p)) ? head(p) : ''); };
    const ficha = (a) => { const F = nuevo(4); F.abre(a.clave, a.rotulo || 'Artículo ' + a.clave); if (a.titulo) F.parr(a.titulo, true); for (const t of a.parrafos) F.parr(t); const x = F.h; return x.replace(/^[\s\S]*?<div class="articulo">/, ''); };
    for (const a of NV) {
      const html = ficha(a);
      const i = partes.findIndex(p => claveDe(p) === a.clave);
      if (a.modifica && i >= 0) { partes[i] = html; continue; }
      if (i >= 0) { partes[i] = html; continue; }
      const base = a.clave.split(' ')[0]; let j = -1;
      for (let k = 0; k < partes.length; k++) { const c = claveDe(partes[k]); if (c === base || c.startsWith(base + ' ')) j = k; }
      if (j < 0) { console.error('novedad sin base:', a.clave); continue; }
      partes.splice(j + 1, 0, html);
    }
    eur = cab + partes.map(p => '<div class="articulo">' + p).join('');
  } catch (e) { if (e.code !== 'ENOENT') throw e; }
  // ---------- INTERPOL
  const I = nuevo(5);
  I.titulo('ESTATUTO DE LA ORGANIZACIÓN INTERNACIONAL DE POLICÍA CRIMINAL (INTERPOL)');
  const li = rango(99, 106);
  for (let i = 0; i < li.length; i++) {
    const raw = li[i], l = raw.trim(); if (!l) continue;
    if (/^ESTATUTO DE LA ORGANIZACI|^CRIMINAL \(INTERPOL\)|^ESTATUTO DE LA INTERPOL/.test(l)) continue;
    const ma = l.match(/^Art[ií]culo (\d+)\.?-?\s*(.*)$/);
    if (ma) { I.abre(ma[1], 'Artículo ' + ma[1]); if (ma[2]) I.cont(ma[2]); continue; }
    if (l === l.toUpperCase() && l.length > 3 && !/^[a-z]\)/.test(l) && !/^\d/.test(l)) { I.cab(l); continue; }
    if (!I.abierta) { I.cab(l); continue; }
    if (/^([a-z]{1,2}\)|\d+\.)\s/.test(l)) I.parr(l); else I.cont(l);
  }
  const int = I.h;
  return { eur, int };
};
