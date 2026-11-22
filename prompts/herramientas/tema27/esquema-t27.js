require('../esq-virtual.js');
// Tema 27 · esquema LITERAL desde prompts/temario-limpio/tema27/oficial.txt:
//   1 ONU (págs. 2-8) · 2 Resolución 690/1979 (9-12) · 3 Código Europeo de Ética (13-19) · 4 RD 176/2022 (20-25) · 5 Código de Conducta (25-33) · 6 OG 10/2024 (38-54)
// Deja /* T27_ONU */ /* T27_POL */ /* T27_CEE */ /* T27_RD */ /* T27_COD */ /* T27_OG */ para aplicar-subrayado-pdf.js. Idempotente.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema27');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let MARCAS = {}; try { MARCAS = require('./marcas-t27.js'); } catch (e) {}
const usadas = new Set();
let ley = 0;
const attrs = (art0, tok, idx, texto, cnt) => {
  const art = ley + ':' + art0, ex = [], r = [];
  const claves = [`${art}|${tok}`, `${art}|${tok}@${cnt}`, `${art}|#${idx}`, ...Object.keys(MARCAS).filter(k => k.startsWith(art + '|~') && texto.startsWith(k.slice(art.length + 2)))];
  for (const k of claves) if (MARCAS[k]) { usadas.add(k); (MARCAS[k].ex || []).forEach(x => !ex.includes(x) && ex.push(x)); (MARCAS[k].r || []).forEach(x => !r.includes(x) && r.push(x)); }
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};
const todas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split('\n');
const pagIni = n => todas.findIndex(l => l.trim() === '=====PAG ' + n + ' =====');
const tramo = (a, b) => todas.slice(pagIni(a) + 1, pagIni(b)).filter(l => !/^=====PAG/.test(l));
const JUNK = [/^\s*À\s*$/, /^\s*\[\d+\]\s*$/, /^\s*\d+\s+COMISIÓN NACIONAL DE LOS DERECHOS HUMANOS\s*$/, /^\s*PRINCIPIOS BÁSICOS SOBRE EL EMPLEO DE LA FUERZA\s+\d+\s*$/, /^\s*TEXTO CONSOLIDADO\s*$/, /^\s*Última modificación/];
const desde = (L, re) => { const i = L.findIndex(l => re.test(l)); return i < 0 ? L : L.slice(i); };
const hasta = (L, re) => { const i = L.findIndex(l => re.test(l)); return i < 0 ? L : L.slice(0, i); };
const quitaNota = L => { const a = L.findIndex(l => /^\s*\* De conformidad con el comentario/.test(l)); if (a < 0) return L; const b = L.findIndex((l, i) => i >= a && /funcionarios de esos servicios\.\s*$/.test(l)); return L.slice(0, a).concat(L.slice(b + 1)); };
// cajas de esquema del libro (OG 10/2024): rachas de ≥4 líneas cortas sin punto final
const quitaCajas = L => { const out = []; let run = []; const flush = () => { if (run.length < 4) out.push(...run); run = []; };
  for (const l of L) { const corta = l.trim().length > 0 && l.length <= 62 && !/^\s*([a-z]\)|\d+\.)/.test(l) && !/\.\s*$/.test(l) || /^\s*•/.test(l); if (corta) run.push(l); else { flush(); out.push(l); } } flush(); return out; };
const NORMAS = [
  { ley: 1, clave: 'onu', modo: 'num', pref: 'Principio ', suf: 'Principios básicos ONU', rot: 'PRINCIPIOS BÁSICOS SOBRE EL EMPLEO DE LA FUERZA Y DE ARMAS DE FUEGO POR LOS FUNCIONARIOS ENCARGADOS DE HACER CUMPLIR LA LEY (La Habana, 27 agosto - 7 septiembre 1990)', lineas: quitaNota(desde(tramo(2, 9), /^Considerando que la labor/)), pre: /^(Considerando|Teniendo presente|Los Principios b)/ },
  { ley: 2, clave: 'pol', modo: 'num', pref: 'Punto ', suf: 'Declaración sobre la Policía', rot: 'RESOLUCIÓN 690 DE 1979, DE LA ASAMBLEA PARLAMENTARIA DEL CONSEJO DE EUROPA, DECLARACIÓN SOBRE LA POLICÍA', lineas: desde(tramo(9, 13), /^La Asamblea\./), reset: true },
  { ley: 3, clave: 'cee', modo: 'num', pref: 'Punto ', suf: 'Código Europeo de Ética de la Policía', rot: 'RECOMENDACIÓN REC. (2001) 10 DEL COMITÉ DE MINISTROS A LOS ESTADOS MIEMBROS SOBRE EL CÓDIGO EUROPEO DE ÉTICA DE LA POLICÍA', lineas: desde(tramo(13, 20), /RECOMENDACIÓN Rec\. \(2001\)/) },
  { ley: 4, clave: 'rd', modo: 'art', suf: 'Real Decreto 176/2022', rot: 'REAL DECRETO 176/2022, DE 4 DE MARZO, POR EL QUE SE APRUEBA EL CÓDIGO DE CONDUCTA DEL PERSONAL DE LA GUARDIA CIVIL', lineas: (() => { const L = tramo(20, 26); return hasta(L, /^\s*FELIPE R\./).filter(l => !/^\s*Dado en Madrid/.test(l)); })() },
  { ley: 5, clave: 'cod', modo: 'art', suf: 'Código de Conducta', rot: 'CÓDIGO DE CONDUCTA DEL PERSONAL DE LA GUARDIA CIVIL', lineas: (() => { const L = tramo(25, 34); return desde(L, /^CÓDIGO DE CONDUCTA DEL PERSONAL/).slice(1); })() },
  { ley: 6, clave: 'og', modo: 'art', suf: 'OG 10/2024', rot: 'ORDEN GENERAL NÚMERO 10/2024, DE 31 DE OCTUBRE, POR LA QUE SE REGULA EL SISTEMA DE INTEGRIDAD DE LA GUARDIA CIVIL', lineas: quitaCajas(desde(tramo(38, 55), /^Artículo 1\.?\s/i)), pre0: quitaCajas(hasta(tramo(38, 55).slice(3), /^Artículo 1\.?\s/i)) },
];
const ORD = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo'];
const ES_CAB = l => { const t = l.trim(); return t.length >= 8 && t === t.toUpperCase() && /[A-ZÁÉÍÓÚ]{3}/.test(t) && !/^\d/.test(t) && !/^[A-Z]\)/.test(t); };

function construye(N) {
  ley = N.ley;
  const L = N.lineas.filter(l => !JUNK.some(j => j.test(l)));
  let h = `<div class="bloque-titulo">${esc(N.rot)}</div>`, abierta = false, art = '', idx = 0, cur = null, parr = [], cab = [], tokCnt = {}, esp = 1;
  const flushP = () => { if (!cur) return; const sg = cur.tok ? (/\)$/.test(cur.tok) ? ' style="margin-left:18px"' : /^[–-]$/.test(cur.tok) ? ' style="margin-left:18px"' : '') : '';
    parr.push(`<p${sg}${attrs(art, cur.tok || '~', cur.idx, cur.texto, cur.cnt)}>${cur.tok ? '<b>' + esc(cur.tok) + '</b> ' : ''}${esc(cur.texto)}</p>`); cur = null; };
  const cierra = () => { flushP(); if (abierta) { h += parr.join('') + '</div></div></div>'; parr = []; abierta = false; } };
  const vuelcaCab = () => { if (cab.length) { cierra(); h += `<div class="bloque-titulo">${esc(cab.join(' · '))}</div>`; cab = []; } };
  const abre = (clave, rotulo) => { cierra(); vuelcaCab(); art = clave; idx = 0; tokCnt = {}; h += `<div class="articulo"><div class="articulo-head">${esc(rotulo + ' · ' + N.suf)}</div><div class="articulo-body"><div class="txt">`; abierta = true; };
  const nuevoP = (texto, tok) => { flushP(); idx++; const k = tok || ''; tokCnt[k] = (tokCnt[k] || 0) + 1; cur = { tok: tok || '', texto, idx, cnt: tokCnt[k] }; };
  const une = l => { if (!cur) { nuevoP(l.trim()); return; } if (/[a-záéíóúñ]-$/.test(cur.texto)) cur.texto = cur.texto.slice(0, -1) + l.trim(); else cur.texto += ' ' + l.trim(); };
  const desguion = () => { if (cur) cur.texto = cur.texto.replace(/([a-záéíóúñ])-\s(?=[a-záéíóúñ])/g, '$1'); };
  if (N.modo === 'art' && N.pre0 && N.pre0.some(l => l.trim())) { abre('pre0', 'Preámbulo'); let ant = ''; for (const l of N.pre0) { if (!l.trim()) continue; if (/^\s{2,}\S/.test(l) && /[.:;]\s*$/.test(ant) || !cur) nuevoP(l.trim()); else une(l); ant = cur.texto; } }
  if (N.modo === 'art') {
    let pre = !N.pre0, ant = '';
    if (pre && N.clave === 'rd') { abre('pre', 'Preámbulo'); }
    for (const raw of L) {
      const l = raw.trim(); if (!l) continue;
      const em = l.match(/^Art[ií]culo (\d+(?: (?:bis|ter|quater))?)\.\s*(.*)$/), ed = l.match(/^(Disposición (?:adicional|transitoria|derogatoria|final)(?: (?:primera|segunda|tercera|cuarta|quinta|sexta|séptima|octava|novena|décima|única))?)\.\s*(.*)$/), ex = N.clave === 'cod' && l.match(/^(Primero|Segundo|Tercero|Cuarto|Quinto|Sexto|Séptimo|Octavo|Noveno|Décimo)\.\s*(.*)$/);
      if (em || ed || ex) { desguion(); const cl = em ? em[1] : ed ? ed[1] : 'Decálogo ' + ex[1], rot = em ? 'Artículo ' + em[1] : ed ? ed[1] : 'Decálogo · ' + ex[1], rest = em ? em[2] : ed ? ed[2] : ex[2]; abre(cl, rot); pre = false; if (rest) nuevoP(rest); ant = rest || ''; continue; }
      if (/^(ANEXO|Anexo)\b/.test(l) && N.clave === 'cod') { cierra(); cab.push(l); vuelcaCab(); continue; }
      if (ES_CAB(l) && !abierta) { cab.push(l); continue; }
      const num = l.match(/^(\d{1,2})\.\s+(.*)$/), let_ = l.match(/^([a-z])\)\s+(.*)$/);
      if (num && abierta) { desguion(); nuevoP(num[2], num[1] + '.'); }
      else if (let_ && abierta) { desguion(); nuevoP(let_[2], let_[1] + ')'); }
      else if (/^\s{2,}\S/.test(raw) && /[.:;]\s*$/.test(ant) || !cur) { desguion(); nuevoP(l); }
      else une(raw);
      ant = cur ? cur.texto : '';
    }
  } else {
    let sig = 1, prevEnd = true, preamb = true, secActual = ''; abre('pre', 'Preámbulo');
    for (const raw of L) {
      const l = raw.trim(); if (!l) continue;
      const cabR = /^[IVX]+\.\s+[A-ZÁÉÍÓÚ]/.test(l) || /^[A-Z]\.\s+[A-ZÁÉÍÓÚ][a-záéíóú]/.test(l) && l.length < 70 || /^[A-C]\)\s+\S/.test(l) && l.length < 80 && !/\s{4}/.test(raw.slice(0, 5)) && /^[A-C]\) [A-ZÁÉÍÓÚ]/.test(l) && N.clave === 'pol' || (ES_CAB(l) && !/^\d/.test(l));
      if (cabR) { if (!/^[IVX]+\.|^[A-Z]\.|^[A-C]\)/.test(l) && cab.length && ES_CAB(cab[cab.length - 1]) && ES_CAB(l)) cab[cab.length - 1] += ' ' + l; else cab.push(l); if (N.reset && /^[A-C]\)/.test(l)) { sig = 1; secActual = l[0]; } prevEnd = true; continue; }
      const m = l.match(/^(\d{1,2})\s*[.\-–]+\s*(.*)$/);
      if (m && +m[1] === sig) {
        desguion();
        const secLet = N.reset ? secActual : '';
        const clave = (secLet || '') + m[1], rot = N.pref + (secLet ? secLet + '.' : '') + m[1];
        if (preamb && N.reset) { /* considerandos de la resolución: una sola ficha */ }
        if (N.reset && sig <= 9 && !secLet) { if (preamb) { nuevoP(m[2], m[1] + '.-'); sig++; prevEnd = /[.;:]\s*$/.test(m[2]); continue; } }
        preamb = false; abre(clave, rot); nuevoP(m[2]); sig++; prevEnd = /[.;:]\s*$/.test(m[2]); continue;
      }
      const li = l.match(/^([a-z])\)\s+(.*)$/), bu = l.match(/^[-–•]\s*(.*)$/);
      if (li) { desguion(); nuevoP(li[2], li[1] + ')'); }
      else if (bu) { desguion(); nuevoP(bu[1], '–'); }
      else if (preamb && !N.reset && N.pre && N.pre.test(l)) { desguion(); nuevoP(l); }
      else if (/^\s{2,}\S/.test(raw) && /[.:;]\s*$/.test(cur ? cur.texto : '') || !cur) { desguion(); nuevoP(l); }
      else une(raw);
      prevEnd = /[.;:]\s*$/.test(cur.texto);
      if (preamb && /^1\.\s/.test(l) && !N.reset) preamb = false;
    }
  }
  desguion(); cierra(); vuelcaCab();
  return h;
}
const H = {};
for (const N of NORMAS) H[N.clave] = construye(N);
const bloque = `/* T27_BEGIN */
const T27 = {};
/* T27_ONU */ T27.onu = ${JSON.stringify(H.onu)};
/* T27_POL */ T27.pol = ${JSON.stringify(H.pol)};
/* T27_CEE */ T27.cee = ${JSON.stringify(H.cee)};
/* T27_RD */ T27.rd = ${JSON.stringify(H.rd)};
/* T27_COD */ T27.cod = ${JSON.stringify(H.cod)};
/* T27_OG */ T27.og = ${JSON.stringify(H.og)};
(function(){
  const t = esquemas[26];
  t.titulo = "27 — Deontología profesional";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL del extracto oficial del temario: Principios básicos de la ONU sobre el empleo de la fuerza y de armas de fuego (1990), Resolución 690/1979 del Consejo de Europa (Declaración sobre la Policía), Código Europeo de Ética de la Policía (Rec. (2001) 10), Real Decreto 176/2022 con el Código de Conducta del personal de la Guardia Civil y la Orden General 10/2024 del Sistema de Integridad. Lo subrayado sale de tu temario escaneado.")
    + T27.onu + T27.pol + T27.cee + T27.rd + T27.cod + T27.og;
})();
/* T27_END */`;
if (process.argv.includes('--seco')) { for (const N of NORMAS) { const f = H[N.clave].match(/articulo-head">[^<]*/g) || []; console.log(N.clave, 'fichas', f.length, '|', f.slice(0, 4).map(x => x.slice(15)).join(' / '), '… ', f.slice(-2).map(x => x.slice(15)).join(' / ')); } process.exit(0); }
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('/* T27_BEGIN */');
if (a >= 0) { const b = s.indexOf('/* T27_END */', a) + '/* T27_END */'.length; s = s.slice(0, a) + bloque + s.slice(b); }
else { const p = s.indexOf('/* T26_END */'); if (p < 0) throw new Error('sin ancla T26_END'); const q = p + '/* T26_END */'.length; s = s.slice(0, q) + '\n' + bloque + s.slice(q); }
fs.writeFileSync(F, s);
for (const N of NORMAS) console.log(N.clave, 'fichas:', (H[N.clave].match(/class="articulo"/g) || []).length, '· títulos:', (H[N.clave].match(/class="bloque-titulo"/g) || []).length);
const sin = Object.keys(MARCAS).filter(k => !usadas.has(k));
if (sin.length) console.log('MARCAS SIN COLOCAR:', sin.join(' | '));
module.exports = { H };
