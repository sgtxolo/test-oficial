require('../esq-virtual.js');
// Tema 21 · esquema LITERAL (10/11/2026) desde prompts/temario-limpio/tema21/oficial.txt: leyes consolidadas (Habeas Corpus … Ley 4/2015).
// Viena 1961/1963 e Instrucción 1/2024 NO se incluyen aquí (OCR / doble columna): van en otro paso.
// Deja  /* T21_CP */ T21.leyes = "…"  para aplicar-subrayado-pdf.js, huecos y Exprés. Idempotente.  Uso: node prompts/herramientas/tema21/esquema-t21.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema21');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let MARCAS = {}; try { MARCAS = require('./marcas-t21.js'); } catch (e) {}
const usadas = new Set();
const attrs = (art, tok, idx, texto, cnt) => {
  const ex = [], r = [];
  const claves = [`${art}|${tok}`, `${art}|${tok}@${cnt}`, `${art}|#${idx}`, ...Object.keys(MARCAS).filter(k => k.startsWith(art + '|~') && texto.startsWith(k.slice(art.length + 2)))];
  for (const k of claves) if (MARCAS[k]) { usadas.add(k); (MARCAS[k].ex || []).forEach(x => !ex.includes(x) && ex.push(x)); (MARCAS[k].r || []).forEach(x => !r.includes(x) && r.push(x)); }
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};
const lineas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split('\n');
const ini = lineas.findIndex(l => /^=====PAG 2 ?=====/.test(l));
const fin = lineas.findIndex((l, i) => i > ini && /^MINISTERIO DE ASUNTOS EXTERIORES/.test(l));
const TOK = /^(\d+\.[ªº]|\d+\.|[a-z]{1,2}(?: bis)?\)|Primero\.|Segundo\.|Tercero\.)\s+(.*)$/;
const ORD = { primero: 1, segundo: 2, tercero: 3, cuarto: 4, quinto: 5, sexto: 6, séptimo: 7, octavo: 8, noveno: 9, décimo: 10, undécimo: 11, duodécimo: 12, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, dieciséis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19, veinte: 20, veintiuno: 21, veintidós: 22, veintitrés: 23, veinticuatro: 24, veinticinco: 25, veintiséis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29, treinta: 30, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10 };
let h = '', abierta = false, art = '', idx = 0, cur = null, cab = [], parrafos = [], tokCnt = {}, pre = false, ley = 0;
const flushP = () => { if (cur) { const sg = cur.tok ? (/[ªº]\.$/.test(cur.tok) ? ' style="margin-left:36px"' : /\)$/.test(cur.tok) ? ' style="margin-left:18px"' : '') : ''; parrafos.push(`<p${sg}${attrs(art, cur.tok || '~', cur.idx, cur.texto, cur.cnt)}>${cur.tok ? `<b>${esc(cur.tok)}</b> ${esc(cur.texto)}` : esc(cur.texto)}</p>`); cur = null; } };
const cierraArt = () => { flushP(); if (abierta) { h += parrafos.join('') + '</div></div></div>'; parrafos = []; abierta = false; } };
const vuelcaCab = () => { if (cab.length) { cierraArt(); h += `<div class="bloque-titulo">${esc(cab.join(' · '))}</div>`; cab = []; } };
const abre = (clave, rotulo) => { cierraArt(); vuelcaCab(); art = clave; idx = 0; tokCnt = {}; h += `<div class="articulo"><div class="articulo-head">${esc(rotulo)}</div><div class="articulo-body"><div class="txt">`; abierta = true; };
let tituloLey = [];
const BASURA = /^(TEXTO CONSOLIDADO|Última modificación|JUAN CARLOS I|FELIPE VI|REY DE ESPAÑA|A todos los que|Sabed:|Ley Orgánica:|Ley:|EXPOSICIÓN DE MOTIVOS|PREÁMBULO|Preámbulo|Referencias anteriores|Texto consolidado|«BOE»)/;
for (let i = ini; i < fin; i++) {
  const raw = lineas[i], l = raw.trim();
  if (!l || /^=====PAG/.test(raw)) continue;
  const sangria = raw.length - raw.replace(/^\s+/, '').length;
  // título de ley (columna 0, mayúsculas, empieza LEY)
  if (sangria === 0 && /^LEY( ORGÁNICA)? \d+\/\d{4}/.test(l)) { cierraArt(); vuelcaCab(); tituloLey = [l]; let j = i + 1; while (j < fin && lineas[j].trim() && lineas[j] === lineas[j].toUpperCase() && !/^=====/.test(lineas[j]) && lineas[j].search(/\S/) === 0) { tituloLey.push(lineas[j].trim()); j++; } i = j - 1; h += `<div class="bloque-titulo">${esc(tituloLey.join(' '))}</div>`; pre = true; ley++; continue; }
  if (sangria === 0 && /^LEY ORGÁNICA 2\/1989/.test(l)) continue;
  const em = l.match(/^Artículo (\d+(?: (?:bis|ter|quater|quinquies|sexies|septies|octies))?(?: [a-z])?)\.\s*(.*)$/);
  const ew = !em && l.match(/^Artículo (primero|segundo|tercero|cuarto|quinto|sexto|séptimo|octavo|noveno|décimo|undécimo|duodécimo|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|dieciséis|diecisiete|dieciocho|diecinueve|veinte|veintiuno|veintidós|veintitrés|veinticuatro|veinticinco|veintiséis|veintisiete|veintiocho|veintinueve|treinta|único)\.\s*(.*)$/i);
  const ed = !em && !ew && l.match(/^(Disposición (?:adicional|transitoria|derogatoria|final)(?: \w+)?\.?)\s*(.*)$/);
  if (em || ew || ed) {
    pre = false;
    const clave = em ? em[1] : ew ? 'w' + ew[1].toLowerCase() : ed[1];
    const rot = em ? 'Artículo ' + em[1] : ew ? 'Artículo ' + ew[1].toLowerCase() : ed[1].replace(/\.$/, '');
    abre(clave, rot);
    const resto = em ? em[2] : ew ? ew[2] : ed[2];
    if (resto) { idx++; const n = resto.match(TOK); const tk = n ? n[1] : ''; tokCnt[tk] = 1; cur = n ? { tok: n[1], texto: n[2], idx, cnt: 1 } : { tok: '', texto: resto, idx, cnt: 1 }; }
    continue;
  }
  if (pre) { if (sangria >= 6 && /^(CAPÍTULO|TÍTULO|LIBRO|Capítulo|Título|Sección|SECCIÓN|Libro)/.test(l)) pre = false; else continue; }
  if (BASURA.test(l)) continue;
  if (sangria >= 6 && l[0] !== '(') { if (abierta) cierraArt(); cab.push(l); continue; }
  if (!abierta) continue;
  if (sangria >= 2) { const n = l.match(TOK); flushP(); idx++; const tk = n ? n[1] : ''; tokCnt[tk] = (tokCnt[tk] || 0) + 1; cur = n ? { tok: n[1], texto: n[2], idx, cnt: tokCnt[tk] } : { tok: '', texto: l, idx, cnt: tokCnt[tk] }; continue; }
  if (cur) cur.texto += (/-$/.test(cur.texto) ? '' : ' ') + l;
}
cierraArt(); vuelcaCab();
const hCP = h;
let s = fs.readFileSync(F, 'utf8');
const bloque = `/* T21_BEGIN */
const T21 = {};
/* T21_CP */ T21.leyes = ${JSON.stringify(hCP)};
(function(){
  const t = esquemas[20];
  t.titulo = "21 — Derecho Procesal Penal (II): normas complementarias";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL de las leyes del extracto oficial 2026 (Habeas Corpus, LO 2/1989, LO 19/1994, LO 3/2003, LO 10/2007, Leyes 4/1985, 11/2003, 25/2007, 23/2014 y 4/2015). Los Convenios de Viena y la Instrucción 1/2024 se añaden aparte.")
    + T21.leyes;
})();
/* T21_END */`;
const a = s.indexOf('/* T21_BEGIN */');
if (a >= 0) { const b = s.indexOf('/* T21_END */', a) + '/* T21_END */'.length; s = s.slice(0, a) + bloque + s.slice(b); }
else { const p = s.indexOf('/* T20_END */'); if (p < 0) throw new Error('sin ancla T20_END'); const q = p + '/* T20_END */'.length; s = s.slice(0, q) + '\n' + bloque + s.slice(q); }
fs.writeFileSync(F, s);
const sin = Object.keys(MARCAS).filter(k => !usadas.has(k));
console.log('leyes:', ley, '· fichas:', (hCP.match(/class="articulo"/g) || []).length, '· bloques-titulo:', (hCP.match(/class="bloque-titulo"/g) || []).length, '· marcas', usadas.size, 'de', Object.keys(MARCAS).length);
if (sin.length) console.log('MARCAS SIN COLOCAR:', sin.join(' | '));
