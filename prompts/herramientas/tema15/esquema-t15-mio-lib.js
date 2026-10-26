// Tema 15 · normas que solo están en MI PDF (transcritas de las imágenes en prompts/temario-limpio/tema15/mio/pNNN-MMM.txt).
// Formato de las líneas: «# » título de norma · «## » apartado (= una ficha) · «### »/«#### » subapartado · «- » viñeta · «-- » / «--- » niveles
// · «> » nota al pie · «@@NOTA …» nota manuscrita o informativa · «@@CUADRO …» (hueco de cuadro, se rellena desde visuales-t15.js) · «[[pag N]]» página.
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', '..', 'temario-limpio', 'tema15', 'mio');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const bloqueTitulo = t => `<div class="bloque-titulo">${esc(t)}</div>`;
const ficha = (cab, cuerpo) => `<div class="articulo"><div class="articulo-head">${esc(cab)}</div><div class="articulo-body"><div class="txt">${cuerpo}</div></div></div>`;
const NUM = /^(\d+\.-|\d+\.º|\d+\.|[IVX]+\.-|[a-z]\)|[IVX]+\.)\s+(.*)$/;
function linea(l) {
  let m;
  if ((m = l.match(/^@@NOTA\s*(.*)$/))) return `<p class="nota-manuscrita" style="font-style:italic;opacity:.85">${esc(m[1])}</p>`;
  if (/^@@/.test(l)) return '';
  if ((m = l.match(/^>\s*(.*)$/))) return `<p class="nota-pie" style="font-size:.85em;opacity:.8">${esc(m[1])}</p>`;
  if ((m = l.match(/^(#{3,4})\s+(.*)$/))) return `<p><b>${esc(m[2])}</b></p>`;
  if ((m = l.match(/^(-{1,3})\s+(.*)$/))) {
    const nivel = m[1].length, pad = 18 * nivel, t = m[2], n = t.match(NUM);
    const cuerpo = n ? `<b>${esc(n[1])}</b> ${esc(n[2])}` : (nivel === 1 ? '• ' : '– ') + esc(t);
    return `<p style="margin-left:${pad}px">${cuerpo}</p>`;
  }
  if ((m = l.match(/^(\d+\.-|\d+\.º|\d+\.)\s+(.*)$/))) return `<p><b>${esc(m[1])}</b> ${esc(m[2])}</p>`;
  return `<p>${esc(l)}</p>`;
}
// Convierte los ficheros indicados (rangos de páginas) en bloques: un bloque-titulo por «# » y una ficha por «## ».
function construye(paginas) {
  const lineas = [];
  for (const f of fs.readdirSync(D).filter(x => /^p\d+-\d+\.txt$/.test(x)).sort()) for (const l of fs.readFileSync(path.join(D, f), 'utf8').replace(/\r/g, '').split('\n')) lineas.push(l);
  let pag = 0, h = '', cab = null, cuerpo = '', sinCab = '';
  const cierra = () => { if (cab !== null) h += ficha(cab, cuerpo); else if (sinCab) h += ficha('', sinCab); cab = null; cuerpo = ''; sinCab = ''; };
  for (const raw of lineas) {
    const l = raw.trim(); if (!l) continue;
    let m;
    if ((m = l.match(/^\[\[pag (\d+)\]\]$/))) { pag = +m[1]; continue; }
    if (pag < paginas[0] || pag > paginas[1]) continue;
    if ((m = l.match(/^#\s+(.*)$/))) { cierra(); h += bloqueTitulo(m[1]); continue; }
    if ((m = l.match(/^##\s+(.*)$/))) { cierra(); cab = m[1]; continue; }
    const t = linea(l); if (!t) continue;
    if (cab !== null) cuerpo += t; else sinCab += t;
  }
  cierra();
  return h;
}
module.exports = {
  rs: construye([27, 47]),     // 15.2 Resolución 28/06/2005 + Anexo I (atestado) + Anexo II (Acuerdo CGPJ 1/2005)
  ntf: construye([127, 160]),  // 15.6 NTF-2/2025 + anexos I-IV
  i1218: construye([161, 164]) // 15.7 Instrucción 12/2018
};
