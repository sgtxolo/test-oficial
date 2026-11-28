// Vuelca las unidades (párrafos) de los esquemas T1 y T3: pid | texto. Ejecutar desde la carpeta del proyecto.
const fs = require('fs'), path = require('path');
const P = process.cwd() + '/prompts/herramientas/';
require(P + 'esq-virtual.js');
const src = fs.readFileSync(P + 'mapa-preguntas.js', 'utf8');
const cuerpo = src.slice(src.indexOf('const ESQ ='), src.indexOf('// ---------- 6. Ejecutar'));
const F = new Function('fs', 'require', '__dirname', cuerpo + ';return {cargarEsquemas,unidades,norm};')(fs, require, P);
const esq = F.cargarEsquemas();
const plano = s => s.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
for (const t of [1, 3]) {
  const h = esq[t - 1].html;
  const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo">([\s\S]*?<div class="txt">([\s\S]*?)<\/div>\s*(?:<div class="sello-examen">EX<\/div>)?\s*<\/div>\s*<\/div>)/g;
  let m, k = -1; const out = []; const U = {};
  while ((m = re.exec(h))) {
    if (m[1] !== undefined) { out.push('\n##### ' + plano(m[1])); continue; }
    k++;
    const cab = plano((m[2].match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || '');
    out.push('\n== ' + cab);
    const ps = [...m[3].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => x[1]);
    (ps.length ? ps : [m[3]]).forEach((p, j) => { const pid = `${t}-${k}-${ps.length ? j : 'x'}`; U[pid] = { cab, t: plano(p) }; out.push(`[${k}-${ps.length ? j : 'x'}] ${plano(p)}`); });
  }
  fs.writeFileSync(path.join(__dirname, `esq${t}.txt`), out.join('\n'));
  fs.writeFileSync(path.join(__dirname, `esq${t}.json`), JSON.stringify(U));
  console.log(t, k + 1, out.join('\n').length);
}
