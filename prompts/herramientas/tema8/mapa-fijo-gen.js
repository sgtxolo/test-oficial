// Tema 8 · genera tema8/mapa-fijo-t8.json (id → 'k-j') para que mapa-preguntas.js ancle a su párrafo las preguntas
// que el mapa automático dejaba sin sitio: se busca la ficha del artículo que cita la explicación y, dentro de ella,
// el párrafo que mejor casa con la cita literal (o con la respuesta correcta).
// Uso: node prompts/herramientas/tema8/mapa-fijo-gen.js [--ver]   (después: node prompts/herramientas/mapa-preguntas.js)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const X = require('../expres-lib.js')(8);
const OUT = path.join(__dirname, 'mapa-fijo-t8.json');
const F = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const h = fs.readFileSync(path.join(RAIZ, 'esquemas.html'), 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const app = fs.readFileSync(path.join(RAIZ, 'test-oficial-conocimiento.html'), 'utf8'); const BS = String.fromCharCode(92);
const norm = t => (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9ñ]+/g, ' ').trim();
const ORD = ['', 'primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta', 'septima', 'octava', 'novena', 'decima', 'undecima', 'duodecima'];
const cabs = X.fichas.map(f => norm(f.cab));
// número exacto del artículo de cada ficha («articulo 59» ≠ «articulo 59 bis»)
const SUF = '(?: (?:bis|ter|quater|quinquies|sexies))?';
const numCab = c => (c.match(new RegExp('^(articulo \\d+' + SUF + '|disposicion (?:adicional|final|transitoria|derogatoria) \\w+)')) || [])[1] || '';
// texto de los «(…)» (huecos.js): se suma al párrafo que tiene ese hueco
const clave = t => (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/<[^>]+>/g, '').replace(/[^a-z0-9ñ]/g, '');
const HU = Object.entries((JSON.parse(h.match(/window\.HUECOS=(\{.*?\});?<\/script>/)[1])['8']) || {});
const conHuecos = ph => { const c = ph.split('(…)').map(clave).join('|'); return ph + ' ' + HU.filter(([k]) => { const [a, b] = k.split('|'); return (a || b) && c.includes(a + '|' + b); }).map(([, v]) => v).join(' '); };
const k12 = 1e9;
// fichas añadidas a mano cuando la explicación no lleva referencia
const MANO = { '8-29': 'articulo 81', '8-54': 'articulo 18', '8-193': 'articulo 542', '8-211': 'articulo 548', '8-225': 'articulo 548', '8-233': 'articulo 383' };
const seen = new Set(); let n = 0, flojas = [], borrar = [];
for (const m of app.matchAll(/\{"id":"8-[^"]*"/g)) {
  let d = 0, s = false, e = false, j = m.index;
  for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; }
    if (c === '"') s = true; else if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } }
  const q = JSON.parse(app.slice(m.index, j + 1)); if (seen.has(q.id)) continue; seen.add(q.id);
  if (MAPA[q.id] && !F[q.id]) continue;
  const ref = (q.explicacion.match(/ref-norma">([^<]*)/) || [])[1] || '';
  const l12 = false;
  let pre;
  const a = ref.match(/art\. (\d+(?: (?:bis|ter|quáter|quinquies|sexies))?)/), da = ref.match(/disp\. (adic|final|trans)\w*\. (\d+)/);
  if (MANO[q.id]) pre = MANO[q.id];
  else if (a) pre = 'articulo ' + norm(a[1]);
  else if (da) pre = 'disposicion ' + ({ adic: 'adicional', final: 'final', trans: 'transitoria' })[da[1]] + ' ' + ORD[+da[2]];
  else { console.error('sin referencia:', q.id); if (/^8-ia-/.test(q.id)) borrar.push(q.id); continue; }
  const ks = cabs.map((c, k) => [c, k]).filter(([c, k]) => (l12 ? k >= k12 : k < k12) && /^RECUERDA/i.test(c) === false && (MANO[q.id] ? c.startsWith(pre) : numCab(c) === pre)).map(([, k]) => k);
  if (!ks.length) { console.error('sin ficha:', q.id, ref); if (/^8-ia-/.test(q.id)) borrar.push(q.id); continue; }
  const cita = norm((q.explicacion.match(/ref-concepto">"?([\s\S]*?)"?<\/span>/) || [])[1] || q.opciones[q.correcta]);
  const ct = [...new Set(cita.split(' ').filter(w => w.length > 3))];
  let best = null, bs = -1;
  ks.forEach(k => X.fichas[k].ps.forEach((p, jj) => { const t = ' ' + norm(conHuecos(p.h)) + ' '; const sc = ct.filter(w => t.includes(' ' + w + ' ')).length / (ct.length || 1); if (sc > bs) { bs = sc; best = k + '-' + jj; } }));
  // oficial: siempre a su artículo (nunca se borra); IA: solo si su cita está en el esquema, si no, a borrar
  if (/^8-ia-/.test(q.id) && bs < 0.5) { borrar.push(q.id); continue; }
  F[q.id] = best; n++; if (bs < 0.6) flojas.push(q.id + ' ' + best + ' ' + bs.toFixed(2));
  if (process.argv.includes('--ver')) console.log(q.id.padEnd(11), best.padEnd(7), bs.toFixed(2), '|', ref);
}
fs.writeFileSync(OUT, JSON.stringify(F, null, 1));
if (borrar.length) console.log('IA sin sitio en el esquema (borrar con borrar-preguntas.js):', borrar.join(' '));
console.log('mapa-fijo-t8.json:', Object.keys(F).length, 'preguntas ancladas ·', n, 'en esta pasada · flojas:', flojas.join(' · ') || 'ninguna');
