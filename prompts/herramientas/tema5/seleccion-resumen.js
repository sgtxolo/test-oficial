// Tema 5 · qué párrafos del esquema van al Exprés: SOLO los que están en el resumen subrayado del usuario (PARTE 1, págs. 7-37).
// Entrada: informe de alineado del esquema contra las páginas del resumen (OCR de Windows + colores):
//   py -I prompts/herramientas/subrayado-pdf-winocr.py "<PARTE 1.pdf>" S/subrayado.json 5 43
//   UMBRAL=0.2 REPORT=S/rep-resumen.json node prompts/herramientas/aplicar-subrayado-pdf.js S/subrayado.json esquemas.html "const T5 = {};" "/* T5_RECUERDA" "T5_SIS:7-14,T5_VIS:15-27,T5_CV:28-37,T5_CV2:28-37" --dry
// Regla: un párrafo entra si su artículo está en resumen-t5.js Y (su apartado está en la lista O el alineado con las páginas del resumen ≥ UMB),
//   o si el alineado es muy alto (≥ FUERTE) aunque la lista no lo recoja (la numeración de apartados del esquema viene de las preguntas y a veces se desplaza).
// Uso: node prompts/herramientas/tema5/seleccion-resumen.js <rep-resumen.json>      → escribe prompts/temario-limpio/tema5/seleccion-resumen.json
process.chdir(require('path').join(__dirname, '..', '..', '..'));
const fs = require('fs'), path = require('path');
const X = require('../expres-lib.js')(5);
const R = require('./resumen-t5.js');
const rep = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const UMB = +(process.env.UMB || 2), FUERTE = +(process.env.FUERTE || 0.65);   // UMB 2 = desactivado: solo cuenta la lista (o un alineado muy alto)
const strip = s => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const normaDeBloque = t => /2018\/1861/.test(t) ? 'sis' : /767\/2008/.test(t) ? 'vis' : /810\/2009/.test(t) ? 'cv' : null;
const idx = {}; X.fichas.forEach((f, k) => { const n = normaDeBloque(X.fichaBloque[k]); if (n) idx[n + '|' + strip(f.cab)] = k; });
const SUF = 'bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies|terdecies|quaterdecies|quindecies|sexdecies|septdecies|octodecies|novodecies|vicies|unvicies';
const sel = {}; const resumen = { dentro: 0, fuera: 0 }; const porArt = {};
rep.forEach(e => {
  const n = e.norma === 'T5_SIS' ? 'sis' : e.norma === 'T5_VIS' ? 'vis' : 'cv'; const cab = strip(e.cab.replace(/\\"/g, '"'));
  const k = idx[n + '|' + cab]; if (k === undefined) return;
  const f = X.fichas[k]; const m = /^Art[ií]culo\s+(\d+(?:\s+[a-z]+)?)\s+—/.exec(strip(f.cab)); const art = m ? m[1] : null;
  const w = art ? R[n][art] : undefined;
  e.paras.forEach((p, j) => {
    const t = strip((f.ps[j] || {}).h || ''); const am = new RegExp('^(\\d+)(?:[.\\s]+(' + SUF + '))?').exec(t);
    const r = p.w ? p.al / p.w : 0; let dentro = false;
    if (w !== undefined) { const enLista = w === '*' || !am || w.map(String).includes(am[1] + (am[2] ? ' ' + am[2] : '')) || w.map(String).includes(am[1]); dentro = enLista || r >= UMB; }
    if (r >= FUERTE && p.w >= 8) dentro = true;
    if (dentro) { (sel[k] = sel[k] || []).push(j); resumen.dentro++; } else resumen.fuera++;
    if (art && dentro) (porArt[n + '|' + art] = porArt[n + '|' + art] || []).push(am ? am[1] + (am[2] ? ' ' + am[2] : '') : '·');
  });
});
// fichas del esquema que el aligner no vio (muy cortas) pero cuyo artículo está en la lista: entran enteras
X.fichas.forEach((f, k) => { const n = normaDeBloque(X.fichaBloque[k]); if (!n || sel[k]) return; const m = /^Art[ií]culo\s+(\d+(?:\s+[a-z]+)?)\s+—/.exec(strip(f.cab)); if (m && R[n][m[1]] !== undefined && !rep.some(e => strip(e.cab.replace(/\\"/g, '"')) === strip(f.cab))) sel[k] = f.ps.map((p, j) => j); });
// huecos de la lista: apartados del resumen sin ningún párrafo seleccionado (posible falta en el esquema)
const gaps = {};
for (const n of ['sis', 'vis', 'cv']) for (const [art, ap] of Object.entries(R[n])) {
  const got = porArt[n + '|' + art] || []; const falta = ap === '*' ? (got.length ? [] : ['*']) : ap.map(String).filter(a => !got.includes(a));
  if (falta.length) (gaps[n] = gaps[n] || {})[art] = falta;
}
// párrafos añadidos a mano desde las fotos del resumen (data-res): entran siempre
X.fichas.forEach((f, k) => { if (!normaDeBloque(X.fichaBloque[k])) return; f.ps.forEach((p, j) => { if (/data-res/.test(p.at)) { sel[k] = sel[k] || []; if (!sel[k].includes(j)) sel[k].push(j); } }); if (sel[k]) sel[k].sort((a, b) => a - b); });
const out = path.join('prompts', 'temario-limpio', 'tema5', 'seleccion-resumen.json');
fs.writeFileSync(out, JSON.stringify({ sel, gaps, umb: UMB, fuerte: FUERTE }));
console.log('párrafos dentro', resumen.dentro, '· fuera', resumen.fuera, '· fichas con algo', Object.keys(sel).length);
for (const [n, g] of Object.entries(gaps)) console.log('SIN párrafo en el esquema (' + n + '):', Object.entries(g).map(([a, l]) => a + '.' + l.join(',')).join(' · '));
