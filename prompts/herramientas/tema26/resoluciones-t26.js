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
// Marcas de las Resoluciones (21/11/2026, lectura C págs 155-220). Claves  resN:FICHA|#n (nº de párrafo de la ficha) o |~texto (inicio del párrafo sin numeración).
// R63-R65 (violencia sobre la mujer, págs 208/210/217) NO se colocan: las fichas RECUERDA del PDF acaban en R62.
const MARCAS_RES = {
  'res1:TERCERO|#1': { ex: ['EX'], r: ['R59'] }, 'res1:TERCERO|#2': { r: ['R60'] }, 'res1:TERCERO|~A modo de ejemplo': { ex: ['EXAMEN'] },
  'res2:TERCERO|#1': { ex: ['EXOF'], r: ['R61'] }, 'res2:TERCERO|#2': { ex: ['EXAMEN'] }, 'res2:TERCERO|#3': { r: ['R62'] },
  'res2:QUINTO|~En la Guardia Civil se considera esencial': { ex: ['EXOF'] },
  'res3:PRIMERO|~En el marco del cumplimiento': { ex: ['EX'] }, 'res3:SEXTO|~A efectos del protocolo': { ex: ['EX'] }, 'res3:DECIMOCUARTO|#1': { ex: ['EX'] },
};
const usadasRes = new Set();
const attrsRes = (clave, ficha, idx, texto) => {
  const ex = [], r = [];
  for (const k of Object.keys(MARCAS_RES)) { const [pre, rest] = k.split('|'); if (pre !== clave + ':' + ficha) continue;
    if (rest === '#' + idx || (rest[0] === '~' && texto.startsWith(rest.slice(1)))) { usadasRes.add(k); (MARCAS_RES[k].ex || []).forEach(x => ex.push(x)); (MARCAS_RES[k].r || []).forEach(x => r.push(x)); } }
  return (ex.length ? ` data-ex="${ex.join(',')}"` : '') + (r.length ? ` data-r="${r.join(',')}"` : '');
};
function construye(clave) {
  const F = FUENTES[clave];
  const lineas = F.archivos.map(a => lee(path.join(__dirname, a), 'utf8')).join('\n').replace(/\r/g, '').split('\n').filter(l => l.trim());
  let h = '', abierta = false, pars = [], ficha = '', pidx = 0;
  const cierra = () => { if (abierta) { h += pars.join('') + '</div></div></div>'; pars = []; abierta = false; } };
  for (const raw of lineas) {
    if (raw.startsWith('# ')) { cierra(); h += `<div class="bloque-titulo">${esc(raw.slice(2))}</div>`; continue; }
    if (raw.startsWith('## ')) { cierra(); ficha = raw.slice(3).split(/[.s·]/)[0]; pidx = 0; h += `<div class="articulo"><div class="articulo-head">${esc(raw.slice(3) + ' · ' + F.suf)}</div><div class="articulo-body"><div class="txt">`; abierta = true; continue; }
    const sg = raw.length - raw.replace(/^\s+/, '').length, l = raw.trim();
    const m = l.match(TOK); pidx++; const at = attrsRes(clave, ficha, pidx, m ? m[2] : l);
    const mg = sg >= 4 ? 36 : sg >= 2 ? 18 : 0;
    const st = mg ? ` style="margin-left:${mg}px"` : '';
    pars.push(m ? `<p${st}${at}><b>${esc(m[1])}</b> ${inline(m[2])}</p>` : `<p${st}${at}>${inline(l)}</p>`);
  }
  cierra();
  return h;
}
const H = { res1: construye('res1'), res2: construye('res2'), res3: construye('res3') };
for (const k of Object.keys(MARCAS_RES)) if (!usadasRes.has(k)) console.log('MARCA RES SIN COLOCAR:', k);
module.exports = { H };
if (require.main === module) for (const k in H) console.log(k, 'fichas:', (H[k].match(/class="articulo"/g) || []).length, 'títulos:', (H[k].match(/bloque-titulo/g) || []).length, 'chars:', H[k].length);
