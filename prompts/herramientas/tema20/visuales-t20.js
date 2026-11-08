require('../esq-virtual.js');
// Cuadros visuales del Tema 20 (LECrim): recrean los cuadros de tu temario (PDF 08-08-2026) con su texto. Colores copiados de tu fosforito.
//   p5 homicidio y asesinato (arts. 138-140) · p6 delito de aborto (arts. 144-145) · p8-9 detenciones/secuestro · p10 amenazas y coacciones · p17 agresión sexual · p19 menores de 16 · p22 prostitución · p29-30 calumnias e injurias · p33 socorro · p182 derecho de gentes · p190 piratería · p171 organización/grupo criminal · p157 garantías constitucionales · p163 atentado/resistencia · p134 prevaricación judicial · p140-141 quebrantamiento/evasión · p150 usurpación · p122-123 cohecho · p126 tráfico de influencias · p107 seguridad vial · p117 prevaricación/nombramiento · p42 administración desleal/apropiación indebida · p39 hurtos y robos
// Uso: node prompts/herramientas/tema20/visuales-t20.js (idempotente: sustituye los anteriores marcados <!--VIS20-->). Lo usará expres/t20.js (module.exports = V).
const fs = require('fs'), path = require('path');
const L = require('../literal-lib.js');
const { R, P, D, Y, K, arbol, flujo, cols, plazos, tabla } = require('../visuales-lib.js');
const G = x => `<mark class="m-autoridad">${x}</mark>`;
const V = []; const v = (norma, loc, html) => V.push([norma, loc, html]);

// ───────── p5 · arts. 138-140 · HOMICIDIO Y SUS FORMAS ─────────
const H = { R, P, D, Y, K, G, arbol, flujo, cols, plazos, tabla };
for (const f of ['a', 'b', 'c', 'd']) { try { require('./visuales-parte-' + f + '.js')(v, H); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; } }
module.exports = V;
if (require.main === module) {
  const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
  let s = fs.readFileSync(F, 'utf8');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
  let h = L.get(s, 'T20_CP').html.replace(/<!--VIS20-->[\s\S]*?<!--\/VIS20-->/g, '');
  const insertos = []; let colocados = 0;
  for (const [, loc, vis] of V) {
    const k = norm(loc); let i = -1, pos = 0;
    for (;;) { const a = h.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = h.indexOf('</div></div></div>', a) + 18; if (norm(h.slice(a, b)).includes(k)) { i = b; break; } pos = a + 20; }
    if (i < 0) { console.error('SIN COLOCAR:', loc.slice(0, 60)); continue; }
    insertos.push([i, vis]);
  }
  const orden = insertos.map((x, idx) => [x[0], idx, x[1]]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  for (const [i, , vis] of orden) { h = h.slice(0, i) + '<!--VIS20-->' + vis + '<!--/VIS20-->' + h.slice(i); colocados++; }
  s = L.put(s, 'T20_CP', h);
  fs.writeFileSync(F, s);
  console.log(`Tema 20: cuadros ${V.length}, colocados ${colocados}`);
}
