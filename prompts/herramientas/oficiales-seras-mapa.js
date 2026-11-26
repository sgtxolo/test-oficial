// Enlaza con su párrafo del esquema SOLO las preguntas de oficiales-seras-t<T>.json, sin regenerar el mapa entero.
// Uso (desde la carpeta del proyecto): node prompts/herramientas/oficiales-seras-mapa.js <T> [--ver]
// Escribe en temaT/mapa-fijo-tT.json y añade las entradas nuevas a esquemas-datos/mapa-preguntas.js.
// Con --indice deja además preparado en el índice de git el mapa de HEAD + estas entradas (no arrastra cambios sin commitear).
require('./esq-virtual.js');
const fs = require('fs'), cp = require('child_process');
const src = fs.readFileSync(__dirname + '/mapa-preguntas.js', 'utf8');
const cuerpo = src.slice(src.indexOf("const ESQ ="), src.indexOf('// ---------- 6. Ejecutar'));
const F = new Function('fs', cuerpo + ';return {cargarEsquemas,cargarPreguntas,unidades,puntuar,toks,norm};')(fs);
const T = +process.argv[2];
const D = JSON.parse(fs.readFileSync(`prompts/herramientas/oficiales-seras-t${T}.json`, 'utf8'));
const qs = F.cargarPreguntas(T);
const plano = t => String(t).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
const us = F.unidades(F.cargarEsquemas()[T - 1], T);
const nuevo = {}; const flojas = [];
// ya enlazadas, y las descartadas a mano porque su artículo no está en el esquema
const ya = fs.readFileSync('esquemas-datos/mapa-preguntas.js', 'utf8');
const FUERA = ['2-301', '2-312', '2-361', '2-364', '5-376', '5-381', '5-396', '5-437', '5-438', '5-444', '5-450', '5-455', '5-478', '11-250'];
for (const d of D) {
  const q = qs.find(x => plano(x.pregunta) === plano(d.en) && plano(x.opciones.join('')) === plano(d.op.join('')));
  if (!q || ya.includes('"' + q.id + '":') || FUERA.includes(q.id)) continue; // solo las que aún no están en el mapa
  const lit = [...new Set(F.toks(d.lit))]; const art = d.loc.replace(/^Art\.\s*/, '').split('.')[0].toLowerCase();
  let best = null, bs = -1, bf, bl = 0;
  for (const u of us) {
    const r = F.puntuar(q, u);
    const l = lit.length ? lit.filter(w => u.T.includes(' ' + w + ' ')).length / lit.length : 0;
    const normaOk = (d.norma.match(/\d+\/\d{4}/g) || []).some(n => u.normas.has(n));
    const w = F.norm(d.lit).split(' '); let hit = 0, n = 0; for (let i = 0; i + 6 <= w.length || i === 0; i += 3) { n++; if (u.T.includes(' ' + w.slice(i, i + 6).join(' ') + ' ')) hit++; if (i + 6 > w.length) break; }
    const s = r.s + 12 * hit / n + 5 * l + (u.arts.has(art) ? 1.5 : 0) + (normaOk ? 1 : 0);
    if (s > bs) { bs = s; best = u; bf = r; bl = Math.max(l, hit / n); }
  }
  nuevo[q.id] = best.pid.slice(String(T).length + 1) + (bf.mark >= 0 ? '-' + bf.mark : '');
  if (bl < 0.6) flojas.push(`${q.id} ${d.loc} (${bl.toFixed(2)}) → ${best.pid}: ${best.T.slice(0, 90)}`);
  if (process.argv.includes('--ver')) console.log(q.id, d.loc, bl.toFixed(2), best.pid, best.T.slice(0, 80));
}
const MF = `prompts/herramientas/tema${T}/mapa-fijo-t${T}.json`;
const mf = fs.existsSync(MF) ? JSON.parse(fs.readFileSync(MF, 'utf8')) : {};
Object.assign(mf, nuevo); fs.writeFileSync(MF, JSON.stringify(mf, null, 1));
const MP = 'esquemas-datos/mapa-preguntas.js';
const pon = s => s.replace('window.MAPA_PREG={', () => 'window.MAPA_PREG={' + Object.entries(nuevo).filter(([id]) => !s.includes('"' + id + '":"')).map(([id, kj]) => `"${id}":"${T}-${kj}",`).join(''));
fs.writeFileSync(MP, pon(fs.readFileSync(MP, 'utf8')));
if (process.argv.includes('--indice')) {
  const head = cp.execSync('git show HEAD:' + MP, { maxBuffer: 1e8 }).toString();
  const h = cp.execSync('git hash-object -w --stdin', { input: pon(head) }).toString().trim();
  cp.execSync(`git update-index --cacheinfo 100644,${h},${MP}`);
}
console.log('enlazadas', Object.keys(nuevo).length, '· flojas', flojas.length); console.log(flojas.join('\n'));
