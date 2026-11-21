require('../esq-virtual.js');
// Tema 26 · esquema LITERAL desde prompts/temario-limpio/tema26/oficial.txt:
//   LO 11/2007 (págs. 2-17) · LO 12/2007 (18-44) · Ley 29/2014 (45-102) · Orden PRE/1983/2012 (103-106).
// Deja /* T26_LO11 */ /* T26_LO12 */ /* T26_L29 */ /* T26_ORD */ para aplicar-subrayado-pdf.js. Idempotente.
// Las 3 Resoluciones (acoso laboral, acoso sexual, violencia sobre la mujer) salen de resoluciones-t26.js (T26.res1/res2/res3, marcas /* T26_RES1 */…).
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema26');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let MARCAS = {}; try { MARCAS = require('./marcas-t26.js'); } catch (e) {}
const usadas = new Set();
let ley = 0;   // 1 = LO 11/2007 · 2 = LO 12/2007 · 3 = Ley 29/2014 · 4 = Orden PRE/1983/2012
const attrs = (art0, tok, idx, texto, cnt) => {
  const art = ley + ':' + art0;
  const ex = [], r = [];
  const claves = [`${art}|${tok}`, `${art}|${tok}@${cnt}`, `${art}|#${idx}`, ...Object.keys(MARCAS).filter(k => k.startsWith(art + '|~') && texto.startsWith(k.slice(art.length + 2)))];
  for (const k of claves) if (MARCAS[k]) { usadas.add(k); (MARCAS[k].ex || []).forEach(x => !ex.includes(x) && ex.push(x)); (MARCAS[k].r || []).forEach(x => !r.includes(x) && r.push(x)); }
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};
const todas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split('\n');
const pagIni = n => todas.findIndex(l => l.trim() === '=====PAG ' + n + ' =====');
const tramo = (a, b) => todas.slice(pagIni(a), b ? pagIni(b) : todas.length);
const NORMAS = [
  { ley: 1, clave: 'lo11', lineas: tramo(2, 18), rot: 'LEY ORGÁNICA 11/2007, DE 22 DE OCTUBRE, REGULADORA DE LOS DERECHOS Y DEBERES DE LOS MIEMBROS DE LA GUARDIA CIVIL', suf: 'Derechos y deberes' },
  { ley: 2, clave: 'lo12', lineas: tramo(18, 45), rot: 'LEY ORGÁNICA 12/2007, DE 22 DE OCTUBRE, DEL RÉGIMEN DISCIPLINARIO DE LA GUARDIA CIVIL', suf: 'Régimen disciplinario' },
  { ley: 3, clave: 'l29', lineas: tramo(45, 103), rot: 'LEY 29/2014, DE 28 DE NOVIEMBRE, DE RÉGIMEN DEL PERSONAL DE LA GUARDIA CIVIL', suf: 'Régimen del personal' },
  { ley: 4, clave: 'ord', lineas: tramo(103, 0), rot: 'ORDEN PRE/1983/2012, DE 14 DE SEPTIEMBRE, POR LA QUE SE DECLARAN DE APLICACIÓN A LA GUARDIA CIVIL DIVERSAS NORMAS DEL ORDENAMIENTO MILITAR SOBRE MANDO, DISCIPLINA Y RÉGIMEN INTERIOR', suf: 'Orden PRE/1983/2012' },
];
const TOK = /^(\d+\.[ªº]|\d+\.|[a-z]{1,2}(?: bis)?\)|Primero\.|Segundo\.|Tercero\.)\s+(.*)$/;
const ROM = /^[IVX]+$/;
const FINAL = /^(Por tanto,$|Mando a todos|Este texto consolidado|Madrid, (a )?\d+ de|Palacio de la Zarzuela|Dado en )/;
const FIRMA = /^(FELIPE (R\.|VI)|JUAN CARLOS R|El Presidente del Gobierno|JOSÉ LUIS RODRÍGUEZ|MARIANO RAJOY)/;

function construye(N) {
  ley = N.ley;
  const lineas = N.lineas;
  let h = `<div class="bloque-titulo">${esc(N.rot)}</div>`, abierta = false, art = '', idx = 0, cur = null, cab = [], parrafos = [], tokCnt = {}, nota = false;
  const flushP = () => {
    if (cur) {
      const sg = cur.tok ? (/[ªº]\.$/.test(cur.tok) ? ' style="margin-left:36px"' : /\)$/.test(cur.tok) ? ' style="margin-left:18px"' : '') : '';
      parrafos.push(`<p${sg}${attrs(art, cur.tok || '~', cur.idx, cur.texto, cur.cnt)}>${cur.tok ? '<b>' + esc(cur.tok) + '</b> ' : ''}${esc(cur.texto)}</p>`);
      cur = null;
    }
  };
  const cierraArt = () => { flushP(); if (abierta) { h += parrafos.join('') + '</div></div></div>'; parrafos = []; abierta = false; } };
  const vuelcaCab = () => { if (cab.length) { cierraArt(); h += `<div class="bloque-titulo">${esc(cab.join(' · '))}</div>`; cab = []; } };
  const abre = (clave, rotulo) => { rotulo = rotulo + ' · ' + N.suf; cierraArt(); vuelcaCab(); art = clave; idx = 0; tokCnt = {}; nota = false; h += `<div class="articulo"><div class="articulo-head">${esc(rotulo)}</div><div class="articulo-body"><div class="txt">`; abierta = true; };
  const nuevoP = (texto) => { flushP(); idx++; const n = texto.match(TOK); const tk = n ? n[1] : ''; tokCnt[tk] = (tokCnt[tk] || 0) + 1; cur = n ? { tok: n[1], texto: n[2], idx, cnt: tokCnt[tk] } : { tok: '', texto, idx, cnt: tokCnt[tk] }; };
  let enTitulo = 1, fin = false;
  for (let i = 0; i < lineas.length; i++) {
    const raw = lineas[i], l = raw.trim();
    if (!l || /^=====PAG/.test(raw)) continue;
    const sg = raw.length - raw.replace(/^\s+/, '').length;
    if (enTitulo) {   // saltar el título (varias líneas) y la cabecera «TEXTO CONSOLIDADO… Sabed:»
      if (/^(TEXTO CONSOLIDADO|Última modificación|JUAN CARLOS I|FELIPE VI|REY DE ESPAÑA|A todos los que|Sabed:|ley\.|ley orgánica\.|orgánica\.)/.test(l) || (sg === 0 && (l === l.toUpperCase() || /^(GUARDIA CIVIL|APLICACIÓN|MILITAR|con la modificación)/.test(l) || /^(DE LA GUARDIA|Guardia Civil)/.test(l)))) continue;
      if (sg >= 30) enTitulo = 0;
      else if (sg >= 5 && sg < 8) { enTitulo = 0; abre('pre0', 'Preámbulo'); nuevoP(l); continue; }
      else continue;
    }
    if (FINAL.test(l) || FIRMA.test(l)) { fin = true; continue; }
    if (fin) {
      if (sg >= 30 && /^(TÍTULO|CAPÍTULO)/.test(l)) fin = false; else continue;
    }
    // cabeceras centradas (TÍTULO…, CAPÍTULO…, PREÁMBULO, DISPOSICIONES…)
    if (sg >= 30 || (sg >= 10 && !abierta)) {
      if (/^PRE[AÁ]MBULO$/.test(l)) { cierraArt(); cab.push('PREÁMBULO'); vuelcaCab(); continue; }
      if (ROM.test(l)) { abre('pre' + l, 'Preámbulo ' + l); continue; }
      cierraArt(); cab.push(l); continue;
    }
    if (sg >= 5 && sg < 8 && /^(Sección \d\.ª)/.test(l)) { cierraArt(); cab.push(l); continue; }
    const em = l.match(/^Artículo (\d+(?: (?:bis|ter|quater))?)\.\s*(.*)$/);
    const ed = !em && sg === 0 && l.match(/^(Disposición (?:adicional|transitoria|derogatoria|final)(?: (?:primera|segunda|tercera|cuarta|quinta|sexta|séptima|octava|novena|décima|undécima|decimosegunda|decimotercera|decimocuarta|única))?)\.\s*(.*)$/);
    if (em || ed) {
      const clave = em ? em[1] : ed[1];
      const rot = em ? 'Artículo ' + em[1] : ed[1];
      const resto = em ? em[2] : ed[2];
      abre(clave, rot);
      if (resto) { idx++; cur = { tok: '', texto: resto, idx, cnt: 1, titulo: true }; }
      continue;
    }
    if (!abierta) {
      if (sg >= 5) { abre('D' + (idx + 1) + '_' + h.length, 'Texto'); nuevoP(l); } else if (sg >= 2) cab.push(l);
      continue;
    }
    if (sg >= 8 && /^(Téngase en cuenta|Asimismo, se declara)/.test(l)) { nota = true; continue; }
    if (sg >= 8 && nota) continue;
    if (sg >= 3 && sg < 5 && nota) continue;
    if (sg >= 5 && sg < 8) { nota = false; nuevoP(l); continue; }
    if (nota) { if (sg === 0 && /^[A-Z0-9]/.test(l) && !/^BOE-A/.test(l) && !/^Ref/.test(l) && cur && /\.\s*$/.test(cur.texto)) nota = false; else continue; }
    if (sg >= 3) { if (cur) { cur.texto += (/-$/.test(cur.texto) ? '' : ' ') + l; } continue; }   // sangrías raras: se pegan al párrafo (no se pierde texto)
    if (cur) cur.texto += (/-$/.test(cur.texto) ? '' : ' ') + l;
    else nuevoP(l);
  }
  cierraArt(); vuelcaCab();
  return h;
}
const H = {};
for (const N of NORMAS) H[N.clave] = construye(N);
const RES = require('./resoluciones-t26.js').H;   // las 3 Resoluciones del PDF escaneado (texto transcrito de las imágenes)
const bloque = `/* T26_BEGIN */
const T26 = {};
/* T26_LO11 */ T26.lo11 = ${JSON.stringify(H.lo11)};
/* T26_LO12 */ T26.lo12 = ${JSON.stringify(H.lo12)};
/* T26_L29 */ T26.l29 = ${JSON.stringify(H.l29)};
/* T26_ORD */ T26.ord = ${JSON.stringify(H.ord)};
/* T26_RES1 */ T26.res1 = ${JSON.stringify(RES.res1)};
/* T26_RES2 */ T26.res2 = ${JSON.stringify(RES.res2)};
/* T26_RES3 */ T26.res3 = ${JSON.stringify(RES.res3)};
(function(){
  const t = esquemas[25];
  t.titulo = "26 — Estatuto del Personal de la Guardia Civil";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL del extracto oficial del temario: LO 11/2007 (derechos y deberes), LO 12/2007 (régimen disciplinario), Ley 29/2014 (régimen del personal) y Orden PRE/1983/2012 (mando, disciplina y régimen interior). Con tu subrayado y tus marcas. Y las tres Resoluciones que solo están en tu temario escaneado: Protocolo de acoso laboral (2019), Protocolo de acoso sexual y por razón de sexo (2019) y Protocolo de violencia sobre la mujer (2021), en su versión vigente.")
    + T26.lo11 + T26.lo12 + T26.l29 + T26.ord + T26.res1 + T26.res2 + T26.res3;
})();
/* T26_END */`;
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('/* T26_BEGIN */');
if (a >= 0) { const b = s.indexOf('/* T26_END */', a) + '/* T26_END */'.length; s = s.slice(0, a) + bloque + s.slice(b); }
else { const p = s.indexOf('/* T25_END */'); if (p < 0) throw new Error('sin ancla T25_END'); const q = p + '/* T25_END */'.length; s = s.slice(0, q) + '\n' + bloque + s.slice(q); }
fs.writeFileSync(F, s);
for (const k in RES) console.log(k, 'fichas:', (RES[k].match(/class="articulo"/g) || []).length);
for (const N of NORMAS) console.log(N.clave, 'fichas:', (H[N.clave].match(/class="articulo"/g) || []).length, '· arts:', (H[N.clave].match(/articulo-head">Artículo /g) || []).length, '· títulos:', (H[N.clave].match(/class="bloque-titulo"/g) || []).length);
const sin = Object.keys(MARCAS).filter(k => !usadas.has(k));
if (sin.length) console.log('MARCAS SIN COLOCAR:', sin.join(' | '));
module.exports = { H };
