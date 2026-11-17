require('../esq-virtual.js');
// Tema 25 · esquema LITERAL (parte BOE) desde prompts/temario-limpio/tema25/oficial.txt: LO 2/1986 · Ley 31/2010 · RD 1087/2010 (págs. 1-43 del oficial).
// Deja /* T25_LOE */ /* T25_L31 */ /* T25_RD */ para aplicar-subrayado-pdf.js. Idempotente.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema25');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let MARCAS = {}; try { MARCAS = require('./marcas-t25.js'); } catch (e) {}
const usadas = new Set();
let ley = 0;   // 1 = LO 2/1986 · 2 = Ley 31/2010 · 3 = RD 1087/2010
const attrs = (art0, tok, idx, texto, cnt) => {
  const art = ley + ':' + art0;
  const ex = [], r = [];
  const claves = [`${art}|${tok}`, `${art}|${tok}@${cnt}`, `${art}|#${idx}`, ...Object.keys(MARCAS).filter(k => k.startsWith(art + '|~') && texto.startsWith(k.slice(art.length + 2)))];
  for (const k of claves) if (MARCAS[k]) { usadas.add(k); (MARCAS[k].ex || []).forEach(x => !ex.includes(x) && ex.push(x)); (MARCAS[k].r || []).forEach(x => !r.includes(x) && r.push(x)); }
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};
const lineas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split(/=====PAG 44 =====/)[0].split('\n');
const TOK = /^(\d+\.[ªº]|\d+\.|[a-z]{1,2}(?: bis)?\)|Primero\.|Segundo\.|Tercero\.)\s+(.*)$/;
const ORD = {};
{ const sq = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s-]/g, '').toLowerCase();
  const U = ['', 'primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno'];
  const D = ['', 'décimo', 'vigésimo', 'trigésimo', 'cuadragésimo', 'quincuagésimo', 'sexagésimo'];
  const T = { 10: 'décimo', 11: 'undécimo', 12: 'duodécimo' };
  for (let n = 1; n <= 69; n++) { const d = Math.floor(n / 10), u = n % 10; let nom;
    if (n < 10) nom = U[n]; else if (T[n]) nom = T[n]; else if (n < 20) nom = 'decimo' + U[u]; else if (u === 0) nom = D[d]; else nom = D[d] + ' ' + U[u];
    ORD[sq(nom)] = n; if (n >= 13 && n < 20) ORD[sq('décimo ' + U[u])] = n; }
  const C1 = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
  const CD = { 3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta' };
  for (let n = 1; n <= 69; n++) { const nom = n < 30 ? C1[n] : (n % 10 ? CD[Math.floor(n / 10)] + ' y ' + C1[n % 10] : CD[n / 10]); ORD[sq(nom)] = ORD[sq(nom)] || n; }
  ORD._sq = sq; }
const ROM = /^(I|II|III|IV|V|VI)$/;
let h = '', abierta = false, art = '', idx = 0, cur = null, cab = [], parrafos = [], tokCnt = {}, nota = false, pre = false;
const flushP = () => {
  if (cur) {
    const sg = cur.tok ? (/[ªº]\.$/.test(cur.tok) ? ' style="margin-left:36px"' : /\)$/.test(cur.tok) ? ' style="margin-left:18px"' : '') : '';
    parrafos.push(`<p${sg}${attrs(art, cur.tok || '~', cur.idx, cur.texto, cur.cnt)}>${cur.tok ? '<b>' + esc(cur.tok) + '</b> ' : ''}${esc(cur.texto)}</p>`);
    cur = null;
  }
};
const cierraArt = () => { flushP(); if (abierta) { h += parrafos.join('') + '</div></div></div>'; parrafos = []; abierta = false; } };
const vuelcaCab = () => { if (cab.length) { cierraArt(); h += `<div class="bloque-titulo">${esc(cab.join(' · '))}</div>`; cab = []; } };
const SUF = { 1: 'Fuerzas y Cuerpos de Seguridad', 2: 'Intercambio de información UE', 3: 'Juntas Locales de Seguridad' };
const abre = (clave, rotulo) => { rotulo = rotulo + ' · ' + SUF[ley]; cierraArt(); vuelcaCab(); art = clave; idx = 0; tokCnt = {}; nota = false; h += `<div class="articulo"><div class="articulo-head">${esc(rotulo)}</div><div class="articulo-body"><div class="txt">`; abierta = true; };
const nuevoP = (texto) => { flushP(); idx++; const n = texto.match(TOK); const tk = n ? n[1] : ''; tokCnt[tk] = (tokCnt[tk] || 0) + 1; cur = n ? { tok: n[1], texto: n[2], idx, cnt: tokCnt[tk] } : { tok: '', texto, idx, cnt: tokCnt[tk] }; };
const TITULO = [
  { re: /^LEY ORGÁNICA 2\/1986/, ley: 1, rot: 'LEY ORGÁNICA 2/1986, DE 13 DE MARZO, DE FUERZAS Y CUERPOS DE SEGURIDAD' },
  { re: /^LEY 31\/2010/, ley: 2, rot: 'LEY 31/2010, DE 27 DE JULIO, SOBRE SIMPLIFICACIÓN DEL INTERCAMBIO DE INFORMACIÓN E INTELIGENCIA ENTRE LOS SERVICIOS DE SEGURIDAD DE LOS ESTADOS MIEMBROS DE LA UNIÓN EUROPEA' },
  { re: /^REAL DECRETO 1087\/2010/, ley: 3, rot: 'REAL DECRETO 1087/2010, DE 3 DE SEPTIEMBRE, POR EL QUE SE APRUEBA EL REGLAMENTO QUE REGULA LAS JUNTAS LOCALES DE SEGURIDAD' },
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
    else if (sg >= 5 && sg < 8) { enTitulo = 0; abre('pre0', 'Preámbulo'); nuevoP(l); continue; }
    else continue;
  }
  if (/^REGLAMENTO POR EL QUE SE REGULAN|^SEGURIDAD$/.test(l)) { if (/^REGLAMENTO/.test(l)) { cierraArt(); fin = false; } continue; }
  if (FINAL.test(l) || /^FELIPE (R\.|GONZÁLEZ)|^JUAN CARLOS R|^El Presidente del Gobierno|^MARIANO RAJOY/.test(l)) { fin = true; continue; }
  if (fin) continue;
  // cabeceras centradas (CAPÍTULO…, Sección…, PREÁMBULO, DISPOSICIONES…)
  if (sg >= 30 || (sg >= 10 && !abierta)) {
    if (/^PRE[AÁ]MBULO$/.test(l)) { cierraArt(); cab.push('PREÁMBULO'); vuelcaCab(); pre = true; continue; }
    if (/^DISPOSICI[OÓ]N (ADICIONAL|TRANSITORIA)$/.test(l)) { cierraArt(); vuelcaCab(); abre('D' + l, /ADICIONAL/.test(l) ? 'Disposición adicional' : 'Disposición transitoria'); continue; }
    if (ROM.test(l)) { abre('pre' + l, 'Preámbulo ' + l); continue; }
    if (/^DISPOSICIONES /.test(l)) { cierraArt(); cab.push(l); vuelcaCab(); art = ''; continue; }
    cierraArt(); cab.push(l); continue;
  }
  if (sg >= 5 && sg < 8 && /^(Sección \d\.ª|Actuaciones para el mantenimiento)/.test(l)) { cierraArt(); cab.push(l); continue; }
  const em = l.match(/^Artículo (\d+(?: (?:bis|ter))?)\.\s*(.*)$/);
  let ew = !em && l.match(/^Artículo ([a-zéáíóúñ]+(?: [a-zéáíóúñ]+){0,2})\.\s*(.*)$/);
  if (ew) { const k = ORD._sq(ew[1]); if (ORD[k]) ew = [ew[0], k, ew[2]]; else ew = null; }
  const ed = !em && !ew && sg === 0 && l.match(/^(Disposición (?:adicional|transitoria|derogatoria|final) (?:primera|segunda|tercera|cuarta|quinta|sexta|séptima|única))\.\s*(.*)$/);
  const eo = !em && !ew && !ed && sg === 0 && l.match(/^(Primera|Segunda)\.$/);
  if (em || ew || ed || eo) {
    pre = false;
    const clave = em ? em[1] : ew ? 'w' + ORD[ew[1]] : ed ? ed[1] : 'DF' + eo[1];
    const rot = em ? 'Artículo ' + em[1] : ew ? 'Artículo ' + ORD[ew[1]] : ed ? ed[1] : 'Disposición final ' + eo[1].toLowerCase();
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
const partes = hCP.split(/(?=<div class="bloque-titulo">(?:LEY ORGÁNICA 2|LEY 31|REAL DECRETO 1087))/);
if (partes.length !== 3) throw new Error('se esperaban 3 leyes, hay ' + partes.length);
let s = fs.readFileSync(F, 'utf8');
const EI = require('./eur-int-t25.js').build(fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8'), (lw, art0, tok, idx, texto, cnt) => { ley = lw; return attrs(art0, tok, idx, texto, cnt); });
const bloque = `/* T25_BEGIN */
const T25 = {};
/* T25_LOE */ T25.loe = ${JSON.stringify(partes[0])};
/* T25_L31 */ T25.l31 = ${JSON.stringify(partes[1])};
/* T25_RD */ T25.rd = ${JSON.stringify(partes[2])};
/* T25_EUR */ T25.eur = ${JSON.stringify(EI.eur)};
/* T25_INT */ T25.int = ${JSON.stringify(EI.int)};
(function(){
  const t = esquemas[24];
  t.titulo = "25 — Coordinación y cooperación policial";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL del extracto oficial del temario: LO 2/1986 de Fuerzas y Cuerpos de Seguridad, Ley 31/2010, RD 1087/2010 de las Juntas Locales de Seguridad, Reglamento (UE) 2016/794 de Europol (texto de 2016: las reformas posteriores que trae tu PDF van como fichas «novedad») y Estatuto de INTERPOL. Con tu subrayado, tus marcas y los cuadros de tu temario.")
    + T25.loe + T25.l31 + T25.rd + T25.eur + T25.int;
})();
/* T25_END */`;
const a = s.indexOf('/* T25_BEGIN */');
if (a >= 0) { const b = s.indexOf('/* T25_END */', a) + '/* T25_END */'.length; s = s.slice(0, a) + bloque + s.slice(b); }
else { const p = s.indexOf('/* T23_END */'); if (p < 0) throw new Error('sin ancla T23_END'); const q = p + '/* T23_END */'.length; s = s.slice(0, q) + '\n' + bloque + s.slice(q); }
fs.writeFileSync(F, s);
const sin = Object.keys(MARCAS).filter(k => !usadas.has(k));
console.log('fichas:', (hCP.match(/class="articulo"/g) || []).length, '· bloques-titulo:', (hCP.match(/class="bloque-titulo"/g) || []).length, '· marcas', usadas.size, 'de', Object.keys(MARCAS).length);
if (sin.length) console.log('MARCAS SIN COLOCAR:', sin.join(' | '));
module.exports = { hCP };
