// T1 · artículos del temario (temario-limpio/tema1/temario.txt) que NO tienen ficha en el esquema, por norma (cada bloque T1_X de esquemas.html frente a su tanda de artículos).
// articulos-rojos.js mezclaba bloques en el T1; este script compara norma a norma. Uso: node prompts/herramientas/tema1/rojos-t1.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const L = fs.readFileSync(path.join(RAIZ, 'prompts/temario-limpio/tema1/temario.txt'), 'utf8').replace(/\r/g, '').split('\n').map(l => l.replace(/^\s*000\d{3}\s+/, ''));
// tandas de artículos del temario por rango de líneas (las mismas que dump-rojos-t1.js)
const NORMAS = { T1_CARTA: [467, 711], T1_COE: [752, 1045], T1_CEDH: [1073, 1523], T1_ROMA: [1790, 2762], T1_ACUERDO: [2777, 3149] };
const SUF = 'bis|ter|quater|quinquies|sexies|septies';
function articulosTemario([a, b]) { const res = new Map();
  for (let k = a - 1; k < b; k++) { const m = L[k].match(new RegExp('^\\s*ART[ÍI]CULO\\s+(\\d{1,3})\\b\\s*(' + SUF + ')?\\.?\\s*(.*)$', 'i')); if (m) { const id = m[1] + (m[2] ? ' ' + m[2].toLowerCase() : ''); if (!res.has(id)) res.set(id, (m[3] || (L[k + 1] || '')).trim().slice(0, 80)); } } return res; }
const h = fs.readFileSync(path.join(RAIZ, 'esquemas.html'), 'utf8');
function numsCab(t) { const out = []; const x = t.split('—')[0];
  for (const m of x.matchAll(/(\d{1,3})(?:\s+(bis|ter|quater))?(?:\s*a\s*(\d{1,3}))?/gi)) { const a = +m[1], b = m[3] ? +m[3] : a; if (b >= a && b - a < 60) for (let i = a; i <= b; i++) out.push(String(i) + (m[2] && i === a ? ' ' + m[2].toLowerCase() : '')); } return out; }
const marcas = [...h.matchAll(/^\/\* (T1_\w+) \*\/ T1\.\w+ = /gm)].map(m => ({ n: m[1], i: m.index }));
for (let k = 0; k < marcas.length; k++) { const n = marcas[k].n; if (!NORMAS[n]) continue;
  const fin = k + 1 < marcas.length ? marcas[k + 1].i : h.length; const seg = h.slice(marcas[k].i, fin);
  const tengo = new Set();
  for (const m of seg.matchAll(/^  \+ articuloResp\("([^"]*)"/gm)) { if (/^Arts?\.|^Art[íi]culos?\b/.test(m[1])) numsCab(m[1].replace(/^Art[íi]culos?\s*|^Arts?\.\s*/, '')).forEach(x => tengo.add(x)); }
  for (const m of seg.matchAll(/<b>Art\.\s*(\d{1,3})\.<\/b>/g)) tengo.add(m[1]);
  const tem = articulosTemario(NORMAS[n]); const faltan = [...tem].filter(([id]) => !tengo.has(id));
  console.log(`\n${n}: temario ${tem.size} artículos · en el esquema ${tem.size - faltan.length} · SIN FICHA ${faltan.length}`);
  console.log(faltan.map(([id, t]) => 'Art. ' + id + ' — ' + t).join('\n'));
}
