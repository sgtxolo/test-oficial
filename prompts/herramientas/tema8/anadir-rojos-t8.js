// Tema 8 · añade al esquema (T8.lopj de esquemas.html) las fichas de los artículos de la LOPJ que estaban «en rojo» (articulos-rojos.js 8), con su texto LITERAL de prompts/temario-limpio/tema8/lopj.txt.
// Un <p> por apartado; se colocan en su sitio por número de artículo. Idempotente. Uso: node prompts/herramientas/tema8/anadir-rojos-t8.js [--dry]
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'); const DRY = process.argv.includes('--dry');
const IDS = '13,17,22 ter,22 quinquies,22 sexies,22 septies,22 nonies,27,31,33,34,37,40,41,43,46,48,49,54,61 sexies,68,75,76,79,91,102,380,382,396,401,402,404,404 bis,405,408,549'.split(',');
const lop = fs.readFileSync(path.join(RAIZ, 'prompts/temario-limpio/tema8/lopj.txt'), 'utf8').replace(/\r/g, '').split('\n');
const SUF = ['', 'bis', 'ter', 'quater', 'quáter', 'quinquies', 'sexies', 'septies', 'octies', 'nonies', 'decies'];
const clave = id => { const [n, s] = id.split(' '); return parseInt(n, 10) * 100 + Math.max(0, SUF.indexOf((s || '').toLowerCase())); };
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function literal(id) {
  const i = lop.findIndex(l => l.startsWith('Artículo ' + id + '.')); if (i < 0) return null;
  let j = i + 1; while (j < lop.length && !/^Artículo \d/.test(lop[j])) j++;
  let t = lop.slice(i, j).join(' ').replace(/\s+/g, ' ').trim().replace(/^Artículo [^.]+\.\s*/, '');
  t = t.replace(/\s(TÍTULO|CAPÍTULO|SECCIÓN|LIBRO)\s+[IVXLC0-9ÚA-Z]+\b.*$/, '');   // cabeceras de la norma que se cuelan al final del último artículo del capítulo
  return t.trim();
}
function html(id) {
  const t = literal(id); if (!t) return null;
  // apartados «1. », «2. » y letras «a) »; los ordinales «1.º» (art. 75) también
  const partes = t.split(/\s(?=(?:\d{1,2}\.(?:º)?\s|[a-h]\)\s|\d{1,2}\.ª\s)(?=[A-ZÁÉÍÓÚ0-9a-z]))/).map(s => s.trim()).filter(Boolean);
  const ps = partes.map(p => { const m = p.match(/^(\d{1,2}\.(?:º|ª)?|[a-h]\))\s+(.*)$/); return m ? `<p><b>${m[1]}</b> ${esc(m[2])}</p>` : `<p>${esc(p)}</p>`; }).join('');
  return `<div class="articulo">\n    <div class="articulo-head">Artículo ${id}</div>\n    \n    <div class="articulo-body">\n      <div class="txt">${ps}</div>\n    </div>\n  </div>`;
}
const F = path.join(RAIZ, 'esquemas.html'); let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('/* T8_LOPJ */ T8.lopj = "'); if (a < 0) throw new Error('sin T8.lopj');
let fin = a; { let e = false; for (let k = a + '/* T8_LOPJ */ T8.lopj = "'.length; k < s.length; k++) { const ch = s[k]; if (e) { e = false; continue; } if (ch === '\\') { e = true; continue; } if (ch === '"') { fin = k; break; } } }
let cuerpo = s.slice(a + '/* T8_LOPJ */ T8.lopj = "'.length, fin);
// posiciones de las fichas existentes
const reHead = /<div class=\\"articulo\\">\\n\s*<div class=\\"articulo-head\\">Art[íi]culo ([^<]*?)<\/div>/g; const exist = []; let m;
while ((m = reHead.exec(cuerpo))) exist.push({ i: m.index, id: m[1].trim() });
const antes = exist.slice().sort((x, y) => x.i - y.i).map(x => x.id); const ya = new Set(exist.map(x => x.id)); let n = 0;
for (const id of IDS) {
  if (ya.has(id)) continue; const h = html(id); if (!h) { console.log('NO está en lopj.txt:', id); continue; }
  const lit = JSON.stringify(h).slice(1, -1);   // mismo escapado que el resto de la cadena (\" y \n)
  const sig = exist.filter(x => clave(x.id) > clave(id)).sort((x, y) => clave(x.id) - clave(y.id))[0];
  const pos = sig ? sig.i : cuerpo.length;
  cuerpo = cuerpo.slice(0, pos) + lit + cuerpo.slice(pos); n++;
  exist.forEach(x => { if (x.i >= pos) x.i += lit.length; }); exist.push({ i: pos, id }); ya.add(id);
}
console.log('fichas nuevas:', n);
const despues = exist.slice().sort((x, y) => x.i - y.i).map(x => x.id);
// las anclas de mapa-fijo-t8.json son 'k-j' con k = nº de ficha: se realinean por id de artículo
const FJ = path.join(__dirname, 'mapa-fijo-t8.json'); if (n && !DRY) { const J = JSON.parse(fs.readFileSync(FJ, 'utf8')); for (const [q, kj] of Object.entries(J)) { const [k, j] = kj.split('-'); const id = antes[+k]; const nk = despues.indexOf(id); if (id && nk >= 0) J[q] = nk + '-' + j; } fs.writeFileSync(FJ, JSON.stringify(J, null, 1)); console.log('anclas realineadas'); }
if (!DRY && n) { s = s.slice(0, a + '/* T8_LOPJ */ T8.lopj = "'.length) + cuerpo + s.slice(fin); fs.writeFileSync(F, s); }
