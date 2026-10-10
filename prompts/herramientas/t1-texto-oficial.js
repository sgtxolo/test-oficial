// Tema 1: extrae el articulado LITERAL del temario oficial (texto del PDF «2025-09-09-TEMA 1 COMPLETO.pdf» volcado con PyMuPDF a texto)
// y lo trocea en artículos → unidades (párrafos numerados, apartados a), i)…). Lo usan anadir-esquema-t1.js y las comprobaciones.
// Uso:  const T = require('./t1-texto-oficial.js')(rutaTexto);  T.articulo('roma', '15 bis') → { num, titulo, unidades:[{etq,txt}] }
const fs = require('fs');
const NORMAS = { lo: [5, 16], carta: [19, 29], coe: [31, 41], cedh: [43, 57], roma: [71, 100], acuerdo: [101, 114] };   // páginas del texto oficial (cedh: solo Convenio, sin protocolos)
const BASURA = /^(DERECHOS HUMANOS|TOMO 1|T1 ?|TEMARIO|DE ASCENSO|A OFICIAL|R\d+|\d{6}|1\.\d\.|NOTAS|Todos los derechos reservados.*|.*academiaprefortia.*)$/;
const ROMANOS = 'i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii|xiii|xiv|xv|xvi|xvii|xviii|xix|xx|xxi|xxii|xxiii|xxiv|xxv|xxvi|xxvii|xxviii|xxix';
module.exports = function (ruta) {
  const raw = fs.readFileSync(ruta, 'utf8').split('\r').join('').split('\x07').join('');
  const pags = {}; const re = /=====P(\d+)=====\n/g; let m;
  const cortes = []; while ((m = re.exec(raw))) cortes.push([+m[1], m.index + m[0].length, m.index]);
  cortes.forEach((c, i) => { pags[c[0]] = raw.slice(c[1], i + 1 < cortes.length ? cortes[i + 1][2] : raw.length); });
  function lineas(a, b) {
    const out = [];
    for (let p = a; p <= b; p++) { (pags[p] || '').split('\n').forEach(l => { if (!BASURA.test(l.trim())) out.push(l); }); out.push('\f'); }
    return out;
  }
  const SH = String.fromCharCode(173);
  function limpia(t) {
    return t.split(SH).join('').replace(/([a-zñáéíóúüA-ZÑÁÉÍÓÚÜ)])(\d{1,2})(?=[\s.,;:)]|$)/g, '$1').replace(/\s+/g, ' ').trim();
  }
  const cache = {};
  const reArt = /^ARTÍCULO (\d+)(?: (BIS|TER))?\.?\s*(.*)$/;
  function parse(norma) {
    if (cache[norma]) return cache[norma];
    const [a, b] = NORMAS[norma]; const L = lineas(a, b);
    const arts = []; let cur = null, skipFoot = false, skipCuadro = false;
    for (let i = 0; i < L.length; i++) {
      const t = L[i].replace(/\s+$/, '');
      if (t === '\f') { skipFoot = false; continue; }
      const ma = reArt.exec(t.trim());
      if (ma && /^[A-ZÁÉÍÓÚÑÜ0-9 ,.:;\/«»()ºª\-]*$/.test(ma[3] || '')) {
        skipCuadro = false; skipFoot = false;
        let tit = ma[3] || ''; let j = i + 1;
        while (j < L.length && /^[A-ZÁÉÍÓÚÑÜ ,.:;\/«»()ºª\-]{3,}$/.test(L[j].trim()) && !reArt.test(L[j].trim()) && !/^(TÍTULO|CAPÍTULO|PARTE|DISPOSICI)/.test(L[j].trim())) { tit += ' ' + L[j].trim(); j++; }
        cur = { num: ma[1] + (ma[2] ? ' ' + ma[2].toLowerCase() : ''), titulo: tit.replace(/\.$/, '').trim(), lin: [] }; arts.push(cur); i = j - 1; continue;
      }
      if (/^(TÍTULO|CAPÍTULO|PARTE|DISPOSICIONES|DISPOSICIÓN|INSTRUMENTO|ESTADOS PARTE)/.test(t.trim())) { cur = null; continue; }
      if (/^\d+\s*\t/.test(t) || /^RECUERDA/.test(t.trim())) { skipFoot = true; continue; }
      if (/^(EL TRIBUNAL|TRANSACCIÓN|En 3 meses cualquier parte|TRIBUNAL EUROPEO DE DERECHOS\s+HUMANOS)\s*/.test(t.trim()) && norma === 'cedh') { skipCuadro = true; continue; }
      if (skipFoot || skipCuadro) continue;
      if (cur) cur.lin.push(t);
    }
    arts.forEach(ar => {
      const un = []; let u = null;
      ar.lin.forEach(l => {
        const t = l.trim(); if (!t) return;
        if (/^\(Remisión/.test(t)) return;
        const mn = /^(\d+)\.\s+(.*)$/.exec(t), ml = /^([a-z])\)\s+(.*)$/.exec(t), mr = new RegExp('^(' + ROMANOS + ')\\)\\s+(.*)$').exec(t);
        if (mn) { u = { etq: mn[1] + '.', lin: [mn[2]] }; un.push(u); }
        else if (mr && u) { u = { etq: mr[1] + ')', lin: [mr[2]] }; un.push(u); }
        else if (ml) { u = { etq: ml[1] + ')', lin: [ml[2]] }; un.push(u); }
        else if (u && !/[.;:]$/.test(u.lin[u.lin.length - 1])) u.lin.push(t);
        else { u = { etq: '', lin: [t.replace(/^•\s*/, '')] }; un.push(u); }
      });
      const une = lin => lin.reduce((acc, l) => acc.endsWith(SH) ? acc.slice(0, -1) + l : (acc ? acc + ' ' : '') + l, '');   // palabra partida con guion blando al final de línea → se une sin espacio
      ar.unidades = un.map(x => ({ etq: x.etq, txt: limpia(une(x.lin)) })).filter(x => x.txt && !/^\d+\.$/.test(x.txt));
    });
    return (cache[norma] = arts);
  }
  // párrafos de un tramo sin artículos (exposición de motivos, preámbulo): desde la línea que casa reDesde hasta la que casa reHasta
  function parrafos(pagA, pagB, reDesde, reHasta) {
    const L = lineas(pagA, pagB).map(l => l.trim()).filter(l => l && l !== '\f');
    const i = L.findIndex(l => reDesde.test(l)); const j = L.findIndex((l, k) => k > i && reHasta.test(l));
    const out = []; let acc = '';
    L.slice(i + 1, j < 0 ? L.length : j).forEach(l => { acc = acc.endsWith(SH) ? acc.slice(0, -1) + l : (acc ? acc + ' ' : '') + l; if (/[.:;]$/.test(l)) { out.push(limpia(acc)); acc = ''; } });
    if (acc) out.push(limpia(acc));
    return out;
  }
  return { articulos: parse, articulo: (norma, num) => parse(norma).find(a => a.num === String(num).toLowerCase()), parrafos, NORMAS };
};
