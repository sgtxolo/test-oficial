// Marcas a mano del temario escaneado → esquema (hecho en el Tema 6 el 19/10/2026, reutilizable en cualquier tema).
//   data-ex="EXOF,EX,*" en el PÁRRAFO marcado · data-r="R5" en el apartado de cada ficha RECUERDA · bloque TN.rec con las R.
//   Si el apartado marcado no estaba en el esquema, se añade con el texto LITERAL del temario limpio en su sitio;
//   si faltaba el artículo entero, se crea su ficha. Quita los sellos EX automáticos por ficha. Idempotente.
// Uso (desde un script de tema):
//   require('./marcas-lib.js')({ T: 8, normas: { LOPJ: { txt: 'tema8/lopj.txt', bloque: 'T8_LOPJ', nombre: 'LOPJ' } },
//     marcas: 'tema8/marcas-t8.txt', RS: [[id, norma, enunciado, respuesta, texto que localiza el apartado], …],
//     recTitulo: '…', grupos: [[título, filtro], …], ensamblaje: ['    + T8.lopj\n', '    + T8.lopj + T8.rec\n'] });
// Formato de marcas-tN.txt: líneas «pN: 9.4:EXOF 22bis.1:* L12 8.1:EX ~"texto del párrafo":* …» (prefijo de norma opcional;
// sin prefijo = la primera norma). Artículo + apartado + letra: 23.4k, 35ter.2d, 1.3 ; o ~"texto literal" para localizar el párrafo.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..'), F = path.join(RAIZ, 'esquemas.html');
const L = require('./literal-lib.js');
const clave = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const limpia = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const reEsc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const SUF = { bis: 'bis', ter: 'ter', quater: 'quáter', quinquies: 'quinquies', sexies: 'sexies', septies: 'septies', octies: 'octies', nonies: 'nonies' };
const RE_ART = /^(Artículo (\d+(?: (?:bis|ter|quáter|quinquies|sexies|septies|octies|nonies))?)|Disposición (?:adicional|transitoria|derogatoria|final) [a-zéáíóú]+)\.\s*(.*)$/;

// texto limpio: artículos y sus unidades (apartados / letras), una por línea; las líneas con varias letras se parten
function fuente(rel, tituloEnLinea) {
  const lineas = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', rel), 'utf8').replace(/\r/g, '').split('\n');
  const arts = []; let cur = null;
  for (let l of lineas) {
    l = l.trim(); if (!l) continue;
    const m = l.match(RE_ART);
    if (m) { cur = { id: m[2] || m[1], cab: m[1], titulo: '', us: [] }; arts.push(cur);
      const resto = m[3].trim();
      if (resto) { if (tituloEnLinea && resto.length < 200 && !/^\d+\.\s/.test(resto)) cur.titulo = resto.replace(/\.$/, ''); else l = resto; }
      if (!resto || cur.titulo) continue; }
    if (!cur) continue;
    for (const x of l.split(/\s(?=(?:[a-z]\)|\d+\.º|\d+\.)\s+[A-ZÁÉÍÓÚ«(])/)) cur.us.push(x);
  }
  arts.forEach(a => { let ap = ''; a.u = a.us.map(t => { let m; if ((m = t.match(/^(\d+(?: bis)?)\.\s/))) ap = m[1]; const letra = (m = t.match(/^([a-z])\)\s/)) ? m[1] : (m = t.match(/^(\d+)\.º\s/)) ? m[1] + 'º' : ''; return { t, ap, letra, k: clave(t) }; }); });
  return arts;
}

module.exports = function (C) {
  const DRY = process.argv.includes('--dry');
  const claves = Object.keys(C.normas);
  const SRC = Object.fromEntries(claves.map(k => [k, fuente(C.normas[k].txt, C.normas[k].tituloEnLinea)]));
  // marcas leídas
  const MARCAS = [];
  for (const l of fs.readFileSync(path.join(__dirname, C.marcas), 'utf8').split('\n')) {
    if (!/^p\d+:/.test(l)) continue;
    const re = new RegExp('(?:(' + claves.join('|') + ') )?([\\w.]*)(?:~"([^"]+)")?:(EXOF|EX|\\*|R\\d+)', 'g');
    for (const m of l.slice(l.indexOf(':') + 1).matchAll(re)) MARCAS.push({ norma: m[1] || claves[0], spec: m[2], txt: m[3], tipo: m[4], linea: l.slice(0, 5) });
  }
  function busca(norma, spec, txt) {
    const arts = SRC[norma];
    if (txt) { const k = clave(txt); for (const a of arts) { const i = a.u.findIndex(u => u.k.includes(k)); if (i >= 0) return { a, i }; } return null; }
    const m = spec.match(/^(\d+)(bis|ter|quater|quinquies|sexies|septies|octies|nonies)?(?:\.(\d+))?\.?([a-z]|\d+º)?$/); if (!m) return null;
    const id = m[1] + (m[2] ? ' ' + SUF[m[2]] : ''); const a = arts.find(x => x.id === id); if (!a) return null;
    const [, , , ap, letra] = m; let i;
    // «25.1» puede ser el ordinal 1.º; «65.1a» = letra a) tras el 1.º; artículo de un solo párrafo → ese párrafo
    const ord = ap && !a.u.some(u => u.ap === ap) ? a.u.findIndex(u => u.letra === ap + 'º') : -1;
    if (letra) i = ord >= 0 ? a.u.findIndex((u, n) => n > ord && u.letra === letra) : a.u.findIndex(u => u.letra === letra && (!ap || u.ap === ap));
    else if (ap) { i = ord >= 0 ? ord : a.u.findIndex(u => u.ap === ap && !u.letra); if (i < 0 && a.u.length <= 2) i = 0; }
    else i = 0;
    return i < 0 ? null : { a, i };
  }
  const sitios = [], fallos = [];
  for (const x of MARCAS) { if (/^R/.test(x.tipo)) continue; const r = busca(x.norma, x.spec, x.txt); if (!r) fallos.push(`${x.linea} ${x.norma} ${x.spec}${x.txt ? '~' + x.txt : ''}:${x.tipo}`); else sitios.push({ ...r, norma: x.norma, tipo: x.tipo }); }
  for (const r of C.RS) { const x = busca(r[1], '', r[4]); if (!x) fallos.push('R ' + r[0]); else sitios.push({ ...x, norma: r[1], tipo: r[0] }); }
  console.log(`marcas: ${MARCAS.filter(m => !/^R/.test(m.tipo)).length} · situadas ${sitios.length} (con ${C.RS.length} R) · no encontradas: ${fallos.join(' | ') || 'ninguna'}`);

  let s = fs.readFileSync(F, 'utf8');
  const ORD = { EXOF: 0, EX: 1, '*': 2 };
  let nAttr = 0, nPar = 0, nArt = 0;
  const reHead = cab => new RegExp('<div class="articulo">\\s*<div class="articulo-head">' + reEsc(cab) + '(?=<| —| ·| \\()');
  for (const norma of claves) {
    let h = L.get(s, C.normas[norma].bloque).html;
    h = h.replace(/\s*<div class="sello-examen">EX<\/div>/g, '');
    const porArt = new Map();
    sitios.filter(x => x.norma === norma).forEach(x => { if (!porArt.has(x.a)) porArt.set(x.a, new Map()); const m = porArt.get(x.a); if (!m.has(x.i)) m.set(x.i, new Set()); m.get(x.i).add(x.tipo); });
    for (const [a, marcasArt] of porArt) {
      let ini = h.search(reHead(a.cab));
      if (ini < 0) {
        const arts = SRC[norma]; const pos = arts.indexOf(a); let antes = -1;
        for (let n = pos + 1; n < arts.length && antes < 0; n++) antes = h.search(reHead(arts[n].cab));
        const tit = a.titulo ? ' — ' + esc(a.titulo.charAt(0).toUpperCase() + a.titulo.slice(1)) : '';
        const ficha = `<div class="articulo"><div class="articulo-head">${a.cab}${tit}</div><div class="articulo-body"><div class="txt"></div></div></div>`;
        if (antes < 0) { const fin = h.lastIndexOf('</div>') + 6; h = h.slice(0, fin) + ficha + h.slice(fin); } else h = h.slice(0, antes) + ficha + h.slice(antes);
        ini = h.search(reHead(a.cab)); nArt++;
      }
      const txtI = h.indexOf('<div class="txt">', ini) + 17;
      // cierre del div.txt (cuenta los div anidados, p. ej. cuadros dentro del texto)
      let d = 1, txtF = txtI; const reD = /<(\/?)div\b[^>]*>/g; reD.lastIndex = txtI; let md;
      while ((md = reD.exec(h))) { d += md[1] ? -1 : 1; if (!d) { txtF = md.index; break; } }
      const txt = h.slice(txtI, txtF);
      const ps = [...txt.matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)].map(m => ({ at: m[1], h: m[2], all: m[0], idx: m.index }));
      let desde = 0;
      ps.forEach(p => { const segs = limpia(p.h).split('(…)').map(clave).filter(x => x.length >= 8); p.u = -1; if (!segs.length) return;
        for (let n = desde; n < a.u.length; n++) { let pos = 0, ok = true; for (const sg of segs) { const j = a.u[n].k.indexOf(sg.slice(0, 60), pos); if (j < 0) { ok = false; break; } pos = j; } if (ok) { p.u = n; desde = n; break; } } });
      const nuevos = [];
      for (const [i, tipos] of marcasArt) {
        const ex = [...tipos].filter(t => !/^R/.test(t)).sort((x, y) => ORD[x] - ORD[y]), rr = [...tipos].filter(t => /^R/.test(t)).sort((x, y) => +x.slice(1) - +y.slice(1));
        const p = ps.find(q => q.u === i);
        if (p) {
          let at = p.at;
          const pon = (attr, vals) => { if (!vals.length) return; const re = new RegExp(' ' + attr + '="([^"]*)"'); const prev = (at.match(re) || [])[1]; const v = [...new Set([...(prev ? prev.split(',') : []), ...vals])].join(','); at = prev !== undefined ? at.replace(re, ` ${attr}="${v}"`) : at + ` ${attr}="${v}"`; };
          pon('data-ex', ex); pon('data-r', rr);
          if (at !== p.at) { p.nuevo = '<p' + at + '>' + p.h + '</p>'; nAttr++; }
        } else {
          const u = a.u[i]; const m = u.t.match(/^(\d+(?: bis)?\.|\d+\.º|[a-z]\))\s+(.*)$/);
          const cuerpo = m ? `<b>${m[1]}</b> ${esc(m[2])}` : esc(u.t);
          const at = (m && /\)$/.test(m[1]) ? ' style="margin-left:18px"' : '') + (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (rr.length ? ` data-r="${rr.join(',')}"` : '');
          nuevos.push({ i, html: `<p${at}>${cuerpo}</p>` }); nPar++;
        }
      }
      let out = '', cursor = 0, k = 0; nuevos.sort((x, y) => x.i - y.i);
      for (const p of ps) {
        while (k < nuevos.length && p.u >= 0 && nuevos[k].i < p.u) { out += txt.slice(cursor, p.idx); cursor = p.idx; out += nuevos[k++].html; }
        out += txt.slice(cursor, p.idx) + (p.nuevo || p.all); cursor = p.idx + p.all.length;
      }
      out += txt.slice(cursor); while (k < nuevos.length) out += nuevos[k++].html;
      h = h.slice(0, txtI) + out + h.slice(txtF);
    }
    s = L.put(s, C.normas[norma].bloque, h);
  }
  console.log(`párrafos marcados: ${nAttr} · párrafos añadidos: ${nPar} · fichas nuevas: ${nArt}`);
  // bloque RECUERDA
  if (C.RS.length) {
    const T = C.T;
    const card = r => `<p data-r="${r[0]}"><b>${r[0]}</b> · <i>${C.normas[r[1]].nombre}.</i> ${esc(r[2])} <b>→</b> <mark class="m-resp">${esc(r[3])}</mark></p>`;
    const grupo = (tit, rs) => `<div class="articulo"><div class="articulo-head">RECUERDA del temario · ${tit}</div><div class="articulo-body"><div class="txt">${rs.map(card).join('')}</div></div></div>`;
    const rec = `<div class="bloque-titulo">${C.recTitulo}</div>` + C.grupos.map(([tit, f]) => grupo(tit, C.RS.filter(f))).join('');
    const marca = `/* T${T}_REC */`, linea = `${marca} T${T}.rec = ` + JSON.stringify(rec) + ';';
    if (s.includes(marca)) { const i = s.indexOf(marca); s = s.slice(0, i) + linea + s.slice(s.indexOf('\n', i)); }
    else { const i = s.indexOf(`/* T${T}_RECUERDA + ensamblaje */`); s = s.slice(0, i) + linea + '\n' + s.slice(i); }
    if (!s.includes(C.ensamblaje[1])) { if (!s.includes(C.ensamblaje[0])) throw new Error('no encuentro el ensamblaje ' + JSON.stringify(C.ensamblaje[0])); s = s.replace(C.ensamblaje[0], C.ensamblaje[1]); }
  }
  if (!DRY) fs.writeFileSync(F, s);
  console.log(DRY ? '(dry, sin escribir)' : 'escrito');
};
