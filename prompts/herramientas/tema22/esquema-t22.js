require('../esq-virtual.js');
// Tema 22 · esquema LITERAL (15/11/2026) desde prompts/temario-limpio/tema22/oficial.txt:
//   LO 9/1983 (Derecho de Reunión, íntegra) · LO 7/2021 (Cap. I y II) · LO 4/2015 (Protección de la Seguridad Ciudadana, íntegra).
// Deja  /* T22_CP */ T22.cp = "…"  para aplicar-subrayado-pdf.js, huecos y Exprés. Idempotente.  Uso: node prompts/herramientas/tema22/esquema-t22.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema22');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let MARCAS = {}; try { MARCAS = require('./marcas-t22.js'); } catch (e) {}
const usadas = new Set();
let ley = 0;   // 1 = LO 9/1983 · 2 = LO 7/2021 · 3 = LO 4/2015
const attrs = (art0, tok, idx, texto, cnt) => {
  const art = ley + ':' + art0;
  const ex = [], r = [];
  const claves = [`${art}|${tok}`, `${art}|${tok}@${cnt}`, `${art}|#${idx}`, ...Object.keys(MARCAS).filter(k => k.startsWith(art + '|~') && texto.startsWith(k.slice(art.length + 2)))];
  for (const k of claves) if (MARCAS[k]) { usadas.add(k); (MARCAS[k].ex || []).forEach(x => !ex.includes(x) && ex.push(x)); (MARCAS[k].r || []).forEach(x => !r.includes(x) && r.push(x)); }
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};
const lineas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split('\n');
const TOK = /^(\d+\.[ªº]|\d+\.|[a-z]{1,2}(?: bis)?\)|Primero\.|Segundo\.|Tercero\.)\s+(.*)$/;
const ORD = { primero: 1, segundo: 2, tercero: 3, cuarto: 4, quinto: 5, sexto: 6, séptimo: 7, octavo: 8, noveno: 9, diez: 10, once: 11 };
const ROM = /^(I|II|III|IV|V|VI)$/;
let h = '', abierta = false, art = '', idx = 0, cur = null, cab = [], parrafos = [], tokCnt = {}, nota = false, pre = false;
const flushP = () => {
  if (cur) {
    const sg = cur.tok ? (/[ªº]\.$/.test(cur.tok) ? ' style="margin-left:36px"' : /\)$/.test(cur.tok) ? ' style="margin-left:18px"' : '') : '';
    parrafos.push(`<p${sg}${attrs(art, cur.tok || '~', cur.idx, cur.texto, cur.cnt)}>${cur.tok ? esc(cur.tok) + ' ' : ''}${esc(cur.texto)}</p>`);
    cur = null;
  }
};
const cierraArt = () => { flushP(); if (abierta) { h += parrafos.join('') + '</div></div></div>'; parrafos = []; abierta = false; } };
const vuelcaCab = () => { if (cab.length) { cierraArt(); h += `<div class="bloque-titulo">${esc(cab.join(' · '))}</div>`; cab = []; } };
const SUF = { 1: 'Derecho de Reunión', 2: 'Protección de datos penal', 3: 'Seguridad Ciudadana' };
const abre = (clave, rotulo) => { rotulo = rotulo + ' · ' + SUF[ley]; cierraArt(); vuelcaCab(); art = clave; idx = 0; tokCnt = {}; nota = false; h += `<div class="articulo"><div class="articulo-head">${esc(rotulo)}</div><div class="articulo-body"><div class="txt">`; abierta = true; };
const nuevoP = (texto) => { flushP(); idx++; const n = texto.match(TOK); const tk = n ? n[1] : ''; tokCnt[tk] = (tokCnt[tk] || 0) + 1; cur = n ? { tok: n[1], texto: n[2], idx, cnt: tokCnt[tk] } : { tok: '', texto, idx, cnt: tokCnt[tk] }; };
const TITULO = [
  { re: /^LEY ORGÁNICA 9\/1983/, ley: 1, rot: 'LEY ORGÁNICA 9/1983, DE 15 DE JULIO, REGULADORA DEL DERECHO DE REUNIÓN' },
  { re: /^LEY ORGÁNICA 7\/2021/, ley: 2, rot: 'LEY ORGÁNICA 7/2021, DE 26 DE MAYO, DE PROTECCIÓN DE DATOS PERSONALES TRATADOS PARA FINES DE PREVENCIÓN, DETECCIÓN, INVESTIGACIÓN Y ENJUICIAMIENTO DE INFRACCIONES PENALES Y DE EJECUCIÓN DE SANCIONES PENALES' },
  { re: /^LEY ORGÁNICA 4\/2015/, ley: 3, rot: 'LEY ORGÁNICA 4/2015, DE 30 DE MARZO, DE PROTECCIÓN DE LA SEGURIDAD CIUDADANA' },
];
let i = 0, enTitulo = 0, saltaCol0 = 0;
const FINAL = /^(Por tanto,|Mando a todos|Este texto consolidado|Palacio de la Zarzuela|Sevilla, )/;
let fin = false;
for (i = 0; i < lineas.length; i++) {
  const raw = lineas[i], l = raw.trim();
  if (!l || /^=====PAG/.test(raw)) continue;
  const sg = raw.length - raw.replace(/^\s+/, '').length;
  const t = sg === 0 && TITULO.find(x => x.re.test(l));
  if (t) { cierraArt(); vuelcaCab(); ley = t.ley; fin = false; pre = false; h += `<div class="bloque-titulo">${esc(t.rot)}</div>`; enTitulo = 1; continue; }
  if (!ley) continue;
  if (enTitulo) {   // saltar el título (varias líneas) y la cabecera «TEXTO CONSOLIDADO… Sabed:»
    if (/^(TEXTO CONSOLIDADO|Última modificación|JUAN CARLOS I|FELIPE VI|REY DE ESPAÑA|A todos los que|Sabed:|Ley Orgánica:)/.test(l) || (sg === 0 && l === l.toUpperCase()) || /\(Cap\./.test(l)) continue;
    if (sg >= 30) enTitulo = 0;
    else if (ley === 1 && sg >= 5 && sg < 8) { enTitulo = 0; abre("pre0", "Exposición de motivos"); nuevoP(l); continue; }
    else continue;
  }
  if (FINAL.test(l) || /^FELIPE (R\.|GONZÁLEZ)|^JUAN CARLOS R|^El Presidente del Gobierno|^MARIANO RAJOY/.test(l)) { fin = true; continue; }
  if (fin) continue;
  // cabeceras centradas (CAPÍTULO…, Sección…, PREÁMBULO, DISPOSICIONES…)
  if (sg >= 30 || (sg >= 10 && !abierta)) {
    if (/^PRE[AÁ]MBULO$/.test(l)) { cierraArt(); cab.push('PREÁMBULO'); vuelcaCab(); pre = true; continue; }
    if (/^DISPOSICI[OÓ]N (ADICIONAL|TRANSITORIA)$/.test(l)) { cierraArt(); vuelcaCab(); abre('D' + l, /ADICIONAL/.test(l) ? 'Disposición adicional' : 'Disposición transitoria'); continue; }
    if (ley === 3 && ROM.test(l)) { abre('pre' + l, 'Preámbulo ' + l); continue; }
    if (/^DISPOSICIONES /.test(l)) { cierraArt(); cab.push(l); vuelcaCab(); art = ''; continue; }
    cierraArt(); cab.push(l); continue;
  }
  if (sg >= 5 && sg < 8 && /^(Sección \d\.ª|Actuaciones para el mantenimiento)/.test(l)) { cierraArt(); cab.push(l); continue; }
  const em = l.match(/^Artículo (\d+(?: (?:bis|ter))?)\.\s*(.*)$/);
  const ew = !em && l.match(/^Artículo (primero|segundo|tercero|cuarto|quinto|sexto|séptimo|octavo|noveno|diez|once)\.\s*(.*)$/);
  const ed = !em && !ew && sg === 0 && l.match(/^(Disposición (?:adicional|transitoria|derogatoria|final) (?:primera|segunda|tercera|cuarta|quinta|sexta|séptima|única))\.\s*(.*)$/);
  const eo = !em && !ew && !ed && sg === 0 && l.match(/^(Primera|Segunda)\.$/);
  if (em || ew || ed || eo) {
    pre = false;
    const clave = em ? em[1] : ew ? 'w' + ORD[ew[1]] : ed ? ed[1] : 'DF' + eo[1];
    const rot = em ? 'Artículo ' + em[1] : ew ? 'Artículo ' + ew[1] : ed ? ed[1] : 'Disposición final ' + eo[1].toLowerCase();
    const resto = em ? em[2] : ew ? ew[2] : ed ? ed[2] : '';
    abre(clave, rot);
    if (resto) { idx++; cur = { tok: '', texto: resto, idx, cnt: 1, titulo: true }; }
    continue;
  }
  if (!abierta) {
    // texto tras una cabecera de disposiciones sin ficha (p. ej. DISPOSICIÓN ADICIONAL / TRANSITORIA de la LO 9/1983)
    if (sg === 5) { abre('D' + (idx + 1) + '_' + h.length, 'Disposición'); nuevoP(l); } else if (sg >= 2) cab.push(l);
    continue;
  }
  if (sg >= 8 && /^(Téngase en cuenta|Asimismo, se declara)/.test(l)) { nota = true; continue; }
  if (sg >= 8 && nota) continue;
  if (sg >= 3 && sg < 5 && nota) continue;
  if (sg >= 5 && sg < 8) { nota = false; nuevoP(l); continue; }
  if (nota) { if (sg === 0 && /^[A-Z0-9]/.test(l) && !/^BOE-A/.test(l) && !/^Ref/.test(l) && cur && /\.\s*$/.test(cur.texto)) nota = false; else continue; }
  if (sg >= 3) continue;   // restos de notas
  if (cur) cur.texto += (/-$/.test(cur.texto) ? '' : ' ') + l;
  else if (cab.length === 0) { nuevoP(l); }
}
cierraArt(); vuelcaCab();
const hCP = h;
const partes = hCP.split(/(?=<div class="bloque-titulo">LEY ORGÁNICA)/);
if (partes.length !== 3) throw new Error('se esperaban 3 leyes, hay ' + partes.length);
let s = fs.readFileSync(F, 'utf8');
const bloque = `/* T22_BEGIN */
const T22 = {};
/* T22_RE */ T22.reunion = ${JSON.stringify(partes[0])};
/* T22_DP */ T22.datos = ${JSON.stringify(partes[1])};
/* T22_CP */ T22.cp = ${JSON.stringify(partes[2])};
(function(){
  const t = esquemas[21];
  t.titulo = "22 — Seguridad ciudadana";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL de los textos consolidados oficiales del BOE que recoge el extracto del temario: LO 9/1983 del Derecho de Reunión (íntegra), LO 7/2021 de protección de datos en el ámbito penal (Cap. I y II) y LO 4/2015 de Protección de la Seguridad Ciudadana (íntegra). Con tu subrayado, tus marcas y los cuadros de tu temario.")
    + T22.reunion + T22.datos + T22.cp;
})();
/* T22_END */`;
const a = s.indexOf('/* T22_BEGIN */');
if (a >= 0) { const b = s.indexOf('/* T22_END */', a) + '/* T22_END */'.length; s = s.slice(0, a) + bloque + s.slice(b); }
else { const p = s.indexOf('/* T21_END */'); if (p < 0) throw new Error('sin ancla T21_END'); const q = p + '/* T21_END */'.length; s = s.slice(0, q) + '\n' + bloque + s.slice(q); }
fs.writeFileSync(F, s);
const sin = Object.keys(MARCAS).filter(k => !usadas.has(k));
console.log('fichas:', (hCP.match(/class="articulo"/g) || []).length, '· bloques-titulo:', (hCP.match(/class="bloque-titulo"/g) || []).length, '· marcas', usadas.size, 'de', Object.keys(MARCAS).length);
if (sin.length) console.log('MARCAS SIN COLOCAR:', sin.join(' | '));
module.exports = { hCP };
