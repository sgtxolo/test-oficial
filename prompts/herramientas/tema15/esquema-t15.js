// Tema 15 · esquema LITERAL (26/10/2026) a partir del temario oficial limpio (prompts/temario-limpio/tema15/oficial.txt):
//   15.1 LO 1/2004 (Títulos Preliminar, I, II y III) · 15.3 Instr. 1/2025 · 15.4 Instr. 5/2021 (Protocolo Cero) · 15.5 Protocolo telemático (Anexo).
// Las normas que solo están en MI PDF (Resolución 2005, Acuerdo CGPJ, NTF-2/2025, Instr. 12/2018) se añaden aparte (tema15/esquema-t15-mio.js).
// Deja cada norma como /* T15_X */ T15.x = "…" (una línea) para marcas-lib.js, aplicar-subrayado-pdf.js y el Exprés.
// Uso: node prompts/herramientas/tema15/esquema-t15.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema15');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lineas = fs.readFileSync(path.join(D, 'oficial.txt'), 'utf8').replace(/\r/g, '').split('\n');
const trozo = (a, b) => lineas.slice(a - 1, b - 1);

// ---- limpieza común: sin nº de página aislados, sin restos «À», sin líneas vacías
const basura = l => /^\s*\d{1,3}\s*$/.test(l) || /^\s*[ÀÂ]\s*$/.test(l) || /^\s*-\s*\d+\s*-\s*$/.test(l) || /^[\s.]*$/.test(l);
const limpia = ls => ls.filter(l => !basura(l)).map(l => l.replace(/\s+$/, ''));

// ---- re-fluye líneas partidas por el PDF en párrafos: sangría o numeración/letra al comienzo = párrafo nuevo
const INI = /^\s{3,}\S|^\s*(\d+\.|[a-z]\)|[A-Z]\.|\d+(\.\d+)+\.?)\s+\S/;
function parrafos(ls) {
  const out = []; let cur = '';
  for (const raw of ls) {
    const l = raw.trim(); if (!l) continue;
    const nuevo = INI.test(raw) || (cur && /[.:;]$/.test(cur) && cur.length < 100 && /^[A-ZÁÉÍÓÚ«(]/.test(l));
    if (nuevo && cur) { out.push(cur); cur = ''; }
    cur += (cur && !/-$/.test(cur) ? ' ' : '') + (cur && /-$/.test(cur) ? l : l);
    if (/^[A-ZÁÉÍÓÚ0-9 ,.()/\-–ºª«»:]+$/.test(cur) && cur.length < 140 && /^\S/.test(l)) { out.push(cur); cur = ''; }
  }
  if (cur) out.push(cur);
  return out;
}
const esTitulo = p => /^[A-ZÁÉÍÓÚ0-9 ,.()/\-–ºª«»:]{6,}$/.test(p) && !/^\d+\.\s/.test(p) && !/^[a-z]\)/.test(p);
function pHtml(p) {
  let m;
  if ((m = p.match(/^(\d+\.)\s+(.*)$/))) return `<p><b>${m[1]}</b> ${esc(m[2])}</p>`;
  if ((m = p.match(/^(\d+(?:\.\d+)+\.?)\s+(.*)$/))) return `<p><b>${m[1]}</b> ${esc(m[2])}</p>`;
  if ((m = p.match(/^([a-z]\)|[A-Z]\.)\s+(.*)$/))) return `<p style="margin-left:18px"><b>${m[1]}</b> ${esc(m[2])}</p>`;
  return `<p>${esc(p)}</p>`;
}
const bloqueTitulo = t => `<div class="bloque-titulo">${esc(t)}</div>`;
const ficha = (cab, ps) => `<div class="articulo"><div class="articulo-head">${esc(cab)}</div><div class="articulo-body"><div class="txt">${ps.map(pHtml).join('')}</div></div></div>`;

// ---- 15.1 Ley Orgánica 1/2004: una ficha por artículo, con sus Títulos y Capítulos
function ley(a, b) {
  const ls = limpia(trozo(a, b)); let h = bloqueTitulo('15.1 — LEY ORGÁNICA 1/2004, DE 28 DE DICIEMBRE, DE MEDIDAS DE PROTECCIÓN INTEGRAL CONTRA LA VIOLENCIA DE GÉNERO (Título Preliminar, Título I, Título II y Título III)');
  let cab = null, ps = [], buf = [];
  const cierra = () => { if (buf.length) { ps = ps.concat(parrafos(buf)); buf = []; } if (cab) h += ficha(cab, ps); cab = null; ps = []; };
  for (const raw of ls) {
    const l = raw.trim();
    let m;
    if (/^(LEY ORGÁNICA 1\/2004|PROTECCIÓN INTEGRAL CONTRA LA VIOLENCIA DE GÉNERO \(Título|Preliminar, Título I)/.test(l) || /^\(?Título Preliminar, Título I/.test(l)) continue;
    if ((m = l.match(/^(TÍTULO [IVX]+|TÍTULO PRELIMINAR|CAPÍTULO [IVX]+)$/))) { cierra(); h += `\u0000${m[1]}`; continue; }
    if (/^Artículo \d+/.test(l)) { cierra(); cab = l.replace(/\.$/, ''); continue; }
    if (cab === null && h.endsWith('\u0000') === false && /^\u0000/.test(h.slice(-40))) { }
    if (cab === null) { h += `\u0001${l}`; continue; }
    buf.push(raw);
  }
  cierra();
  // \u0000X = título/capítulo; \u0001texto = subtítulo (se fusiona con el título anterior)
  h = h.replace(/\u0000([^\u0000\u0001<]+)((?:\u0001[^\u0000\u0001<]+)*)/g, (_, t, sub) => bloqueTitulo(t + (sub ? ' — ' + sub.split('\u0001').filter(Boolean).join(' ') : '')));
  return h.replace(/[\u0000\u0001]/g, '');
}

// ---- instrucciones: secciones numeradas / en mayúsculas como títulos de bloque; el resto, párrafos
function instruccion(tit, a, b) {
  const ps = parrafos(limpia(trozo(a, b))); let h = bloqueTitulo(tit);
  for (const p of ps) h += esTitulo(p) ? bloqueTitulo(p) : `<div class="articulo"><div class="articulo-body"><div class="txt">${pHtml(p)}</div></div></div>`;
  return h;
}

const idx = re => lineas.findIndex(l => re.test(l)) + 1;
const iPC = idx(/^INSTRUCCIÓN 5\/2021, DE LA SECRETARÍA DE ESTADO DE SEGURIDAD — /), i125 = idx(/^INSTRUCCIÓN 1\/2025, DE LA SECRETARÍA DE ESTADO DE SEGURIDAD — /), iPul = idx(/^ANEXO\. COMPONENTES DEL SISTEMA/);
const iTel = lineas.findIndex((l, i) => i > i125 + 500 && /^PROTOCOLO DE ACTUACIÓN DEL SISTEMA DE SEGUIMIENTO POR/.test(l)) + 1;
const B = {
  lo: ley(idx(/^LEY ORGÁNICA 1\/2004/), iPC),
  pc: instruccion('15.4 — INSTRUCCIÓN 5/2021, DE LA SECRETARÍA DE ESTADO DE SEGURIDAD: PROTOCOLO DE PRIMER CONTACTO POLICIAL CON VÍCTIMAS DE VIOLENCIA DE GÉNERO EN SITUACIÓN DE DESPROTECCIÓN (PROTOCOLO CERO)', iPC + 4, i125),
  i125: instruccion('15.3 — INSTRUCCIÓN 1/2025, DE LA SECRETARÍA DE ESTADO DE SEGURIDAD: NUEVO PROTOCOLO PARA LA VALORACIÓN Y GESTIÓN POLICIAL DEL NIVEL DE RIESGO DE VIOLENCIA DE GÉNERO Y SEGUIMIENTO DE LOS CASOS A TRAVÉS DEL SISTEMA VIOGÉN-2', i125 + 6, iTel),
  pul: instruccion('15.5 — PROTOCOLO DE ACTUACIÓN DEL SISTEMA DE SEGUIMIENTO POR MEDIOS TELEMÁTICOS DEL CUMPLIMIENTO DE LAS MEDIDAS Y PENAS DE ALEJAMIENTO EN MATERIA DE VIOLENCIA DE GÉNERO — ANEXO: COMPONENTES DEL SISTEMA', iTel, lineas.length + 1),
};
for (const k of Object.keys(B)) console.log(k, (B[k].match(/class="articulo"/g) || []).length, 'fichas');

// ---- inserta en esquemas.html el Tema 15 (esquemas[14]); idempotente
let s = fs.readFileSync(F, 'utf8');
const marca = '/* T15_BEGIN */', fin = '/* T15_END */';
const nuevo = `${marca}
const T15 = {};
/* T15_LO */ T15.lo = ${JSON.stringify(B.lo)};
/* T15_I125 */ T15.i125 = ${JSON.stringify(B.i125)};
/* T15_PC */ T15.pc = ${JSON.stringify(B.pc)};
/* T15_PUL */ T15.pul = ${JSON.stringify(B.pul)};
(function(){
  const t = esquemas[14];
  t.titulo = "15 — Protección Integral contra la Violencia de Género: LO 1/2004, Instrucciones 1/2025 y 5/2021 (Protocolo Cero) y seguimiento telemático";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL de tu temario 2026 (oficial limpio). Las marcas EXOF / EX / ✱ y las fichas R son las de tu temario subrayado; tus colores, los de tu PDF.")
    + T15.lo + T15.i125 + T15.pc + T15.pul;
})();
${fin}
`;
if (s.includes(marca)) { const a = s.indexOf(marca), b = s.indexOf(fin) + fin.length + 1; s = s.slice(0, a) + nuevo + s.slice(b); }
else { const a = s.indexOf('const T10 = {};'); if (a < 0) throw new Error('no encuentro dónde insertar'); s = s.slice(0, a) + nuevo + s.slice(a); }
fs.writeFileSync(F, s);
console.log('Tema 15 insertado en esquemas.html');
