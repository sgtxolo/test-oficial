require('../esq-virtual.js');   // esquemas.html con los textos de las leyes en su sitio (ver esq-virtual.js)
// Tema 19 · esquema LITERAL (2/11/2026) a partir del texto limpio (prompts/temario-limpio/tema19/oficial.txt): Código Penal, Título Preliminar y Libro I (arts. 1-137)
// + bloque RECUERDA con las fichas R1-R29 de mi PDF subrayado (r-temario-t19.js). Un artículo = una ficha (.articulo), cada apartado = un <p>.
// Deja el Código Penal como /* T19_CP */ T19.cp = "…" (una línea) para aplicar-subrayado-pdf.js, huecos y Exprés. Idempotente.
// Las marcas a mano (EXOF / EX / EXAMEN / ✱ → data-ex; fichas R → data-r) van en la tabla MARCAS (se rellena al leer las páginas de mi PDF).
// Uso: node prompts/herramientas/tema19/esquema-t19.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema19');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const RR = require('./r-temario-t19.js');

// ---- marcas: clave art|token (token = «1.», «e)», «#1» = primer párrafo). Ej.: '2|2.': { ex: ['EX'], r: ['R1'] }
const MARCAS = require('./marcas-t19.js');
const usadas = new Set();
const attrs = (art, tok, idx, texto, cnt) => {
  const ex = [], r = [];
  // claves: art|tok (todas las apariciones), art|tok@n (n-ésima aparición del token), art|#n (n-ésimo párrafo), art|~texto (párrafo que empieza así)
  const claves = [`${art}|${tok}`, `${art}|${tok}@${cnt}`, `${art}|#${idx}`, ...Object.keys(MARCAS).filter(k => k.startsWith(art + '|~') && texto.startsWith(k.slice(art.length + 2)))];
  for (const k of claves) if (MARCAS[k]) { usadas.add(k); (MARCAS[k].ex || []).forEach(x => !ex.includes(x) && ex.push(x)); (MARCAS[k].r || []).forEach(x => !r.includes(x) && r.push(x)); }
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};

// ---- partir oficial.txt: títulos, capítulos, secciones y artículos
const lineas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split('\n');
const ini = lineas.findIndex(l => /^=====PAG 2 ?=====/.test(l));
const TOK = /^(\d+\.[ªº]|\d+\.|[a-z]{1,2}(?: bis)?\)|Primero\.|Segundo\.|Tercero\.)\s+(.*)$/;
let tokCnt = {}, h = '', abierta = false, art = '', idx = 0, cur = null, cab = [], saltaResumen = false;
const cierraP = () => { if (cur) { h += cur; cur = null; } };
const cierra = () => { cierraP(); if (abierta) { h += '</div></div></div>'; abierta = false; } };
const vuelcaCab = () => { if (cab.length) { cierra(); h += `<div class="bloque-titulo">${esc(cab.join(' · '))}</div>`; cab = []; } };
let ptxt = '', ptok = '';
const abreP = (tok, texto) => { cierraP(); idx++; ptxt = texto; ptok = tok; cur = { tok, texto, idx }; };
let parrafos = [];
const flushP = () => { if (cur) { const sangria = cur.tok ? (/[ªº]\.$/.test(cur.tok) ? ' style="margin-left:36px"' : /\)$/.test(cur.tok) ? ' style="margin-left:18px"' : '') : ''; parrafos.push(`<p${sangria}${attrs(art, cur.tok || '~', cur.idx, cur.texto, cur.cnt)}>${cur.tok ? `<b>${esc(cur.tok)}</b> ${esc(cur.texto)}` : esc(cur.texto)}</p>`); cur = null; } };
const cierraArt = () => { flushP(); if (abierta) { h += parrafos.join('') + '</div></div></div>'; parrafos = []; abierta = false; } };
for (let i = ini; i < lineas.length; i++) {
  const raw = lineas[i], l = raw.trim();
  if (!l || /^=====PAG/.test(raw)) continue;
  const sangria = raw.length - raw.replace(/^\s+/, '').length;
  // resumen de título (columna 0, con « — »): se salta, junto a su posible continuación
  if (/^(TÍTULO|LIBRO)\b.* — /.test(raw)) { saltaResumen = true; continue; }
  if (saltaResumen) { if (sangria === 0 && !/^Artículo /.test(raw)) continue; saltaResumen = false; }
  const m = l.match(/^Artículo (\d+(?: (?:bis|ter|quater|quinquies|sexies|septies|octies))?)\.\s*(.*)$/);
  if (m) { cierraArt(); vuelcaCab(); art = m[1]; idx = 0; tokCnt = {};
    h += `<div class="articulo"><div class="articulo-head">Artículo ${m[1]}</div><div class="articulo-body"><div class="txt">`; abierta = true; continue; }
  if (sangria >= 6 && l[0] !== '(') { cierraArt(); cab.push(l); continue; }          // título / capítulo / sección centrados
  if (!abierta) continue;
  if (sangria >= 2) {                                                  // principio de párrafo
    const n = l.match(TOK);
    flushP(); idx++; const tk = n ? n[1] : ''; tokCnt[tk] = (tokCnt[tk] || 0) + 1; cur = n ? { tok: n[1], texto: n[2], idx, cnt: tokCnt[tk] } : { tok: '', texto: l, idx, cnt: tokCnt[tk] }; continue;
  }
  if (cur) cur.texto += (/-$/.test(cur.texto) ? '' : ' ') + l;         // continuación de renglón
}
cierraArt();
const hCP = h;

// ---- fichas R (pregunta → respuesta), págs. 191-196 de mi PDF
const gruposR = [['RECUERDA del temario · Código Penal (R1 a R10)', r => r.n <= 10], ['RECUERDA del temario · Código Penal (R11 a R20)', r => r.n > 10 && r.n <= 20], ['RECUERDA del temario · Código Penal (R21 a R29)', r => r.n > 20]];
const fich = r => { const [p1, p2] = r.p.split(' / '), [r1, r2] = r.r.split(' / ');
  return `<p data-r="R${r.n}"><b>R${r.n}</b> · <i>Código Penal.</i> ${esc(p1)} <b>→</b> <mark class="m-resp">${esc(r1)}</mark>${p2 ? ` ${esc(p2)} <b>→</b> <mark class="m-resp">${esc(r2)}</mark>` : ''}</p>`; };
const hREC = `<div class="bloque-titulo">RECUERDA DEL TEMARIO — fichas R1 a R29 (pregunta → respuesta), tal como vienen en las últimas páginas de tu temario</div>`
  + gruposR.map(([t, f]) => `<div class="articulo"><div class="articulo-head">${esc(t)}</div><div class="articulo-body"><div class="txt">${RR.filter(f).map(fich).join('')}</div></div></div>`).join('');

// ---- insertar en esquemas.html entre /* T19_BEGIN */ y /* T19_END */ (tras T17_END)
let s = fs.readFileSync(F, 'utf8');
const bloque = `/* T19_BEGIN */
const T19 = {};
/* T19_CP */ T19.cp = ${JSON.stringify(hCP)};
/* T19_REC */ T19.rec = ${JSON.stringify(hREC)};
(function(){
  const t = esquemas[18];
  t.titulo = "19 — Derecho Penal. Parte Especial: Código Penal (Libro II, arts. 138-616)";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL del Código Penal (Libro II, arts. 138 a 616) tal como viene en tu temario 2026. Las marcas EXOF / EX / ✱ y las fichas R son las de tu temario; al final tienes las fichas R1 a R29.")
    + T19.cp + T19.rec;
})();
/* T19_END */`;
const a = s.indexOf('/* T19_BEGIN */');
if (a >= 0) { const b = s.indexOf('/* T19_END */', a) + '/* T19_END */'.length; s = s.slice(0, a) + bloque + s.slice(b); }
else { const p = s.indexOf('/* T18_END */'); if (p < 0) throw new Error('sin ancla T17_END'); const q = p + '/* T18_END */'.length; s = s.slice(0, q) + '\n' + bloque + s.slice(q); }
fs.writeFileSync(F, s);
const sin = Object.keys(MARCAS).filter(k => !usadas.has(k));
console.log('fichas:', (hCP.match(/class="articulo"/g) || []).length, '· bloques-titulo:', (hCP.match(/class="bloque-titulo"/g) || []).length, '· marcas colocadas', usadas.size, 'de', Object.keys(MARCAS).length);
if (sin.length) console.log('MARCAS SIN COLOCAR:', sin.join(' | '));
