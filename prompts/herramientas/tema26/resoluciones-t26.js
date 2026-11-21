// Tema 26 · las TRES Resoluciones que solo están en el PDF escaneado del usuario (págs. 161-220), transcritas a mano de las imágenes.
//   RES1 acoso laboral (págs. 161-180) · RES2 acoso sexual y por razón de sexo (181-204) · RES3 violencia sobre la mujer (205-220).
// Texto en res1-*.txt, res2-*.txt, res3-*.txt: «# » = bloque-titulo, «## » = ficha, líneas = párrafos (sangría de 2 espacios = apartado a), 4 = guion/subapartado), **x** = negrita.
// Criterio de versión (el PDF trae páginas antiguas tachadas/MOD junto a las NUEVAS): RES1 usa 171-172 (vigentes, NUEVO) y descarta 173; RES2 usa 181-182, 188(Sexto nuevo), 191-192 y descarta 183 duplicadas antiguas 185-186,189-190.
const fs = require('fs'), path = require('path');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lee = fs.readFileSync.bind(fs);
const FUENTES = {
  res1: { archivos: ['res1-acoso-laboral.txt', 'res1-b.txt'], suf: 'Protocolo acoso laboral' },
  res2: { archivos: ['res2-a.txt', 'res2-b.txt'], suf: 'Protocolo acoso sexual' },
  res3: { archivos: ['res3-a.txt', 'res3-b.txt', 'res3-c.txt', 'res3-d.txt', 'res3-e.txt'], suf: 'Protocolo violencia sobre la mujer' },
};
const TOK = /^(\d+\.[ªº]|\d+\.|[a-z]{1,2}\)|-)\s+(.*)$/;
const inline = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
function construye(clave) {
  const F = FUENTES[clave];
  const lineas = F.archivos.map(a => lee(path.join(__dirname, a), 'utf8')).join('\n').replace(/\r/g, '').split('\n').filter(l => l.trim());
  let h = '', abierta = false, pars = [];
  const cierra = () => { if (abierta) { h += pars.join('') + '</div></div></div>'; pars = []; abierta = false; } };
  for (const raw of lineas) {
    if (raw.startsWith('# ')) { cierra(); h += `<div class="bloque-titulo">${esc(raw.slice(2))}</div>`; continue; }
    if (raw.startsWith('## ')) { cierra(); h += `<div class="articulo"><div class="articulo-head">${esc(raw.slice(3) + ' · ' + F.suf)}</div><div class="articulo-body"><div class="txt">`; abierta = true; continue; }
    const sg = raw.length - raw.replace(/^\s+/, '').length, l = raw.trim();
    const m = l.match(TOK);
    const mg = sg >= 4 ? 36 : sg >= 2 ? 18 : 0;
    const st = mg ? ` style="margin-left:${mg}px"` : '';
    pars.push(m ? `<p${st}><b>${esc(m[1])}</b> ${inline(m[2])}</p>` : `<p${st}>${inline(l)}</p>`);
  }
  cierra();
  return h;
}
const H = { res1: construye('res1'), res2: construye('res2'), res3: construye('res3') };
module.exports = { H };
if (require.main === module) for (const k in H) console.log(k, 'fichas:', (H[k].match(/class="articulo"/g) || []).length, 'títulos:', (H[k].match(/bloque-titulo/g) || []).length, 'chars:', H[k].length);
