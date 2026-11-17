// Localiza frases en el oficial del T25 y dice en qué artículo/párrafo caen (para colocar marcas). Uso: node donde.js "frase 1" "frase 2" …
const fs = require('fs');
const L = fs.readFileSync('prompts/temario-limpio/tema25/oficial.txt', 'utf8').replace(/\r/g, '').split('\n');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]+/g, ' ').replace(/\s+/g, ' ').trim();
let pag = 0, art = '', par = '', norma = '';
const idx = [];
L.forEach((l, i) => {
  const m = l.match(/^=====PAG (\d+)/); if (m) { pag = +m[1]; norma = pag <= 29 ? 'LOE' : pag <= 37 ? 'L31' : pag <= 43 ? 'RD' : pag <= 98 ? 'EUR' : 'INT'; return; }
  const a = l.match(/^\s*Art[ií]culo ([\wáéíóúñ ]+?)\.?-?\s*(?:[A-ZÁÉÍÓÚ].*)?$/); if (a && l.trim().length < 80) art = a[1];
  const p = l.match(/^\s*(\d+\.|[a-z]\))\s/); if (p) par = p[1];
  idx.push({ i, pag, norma, art, par, t: nz(l) });
});
for (const q of process.argv.slice(2)) {
  const k = nz(q); const hit = idx.filter((x, j) => x.t.includes(k) || (idx[j + 1] && (x.t + ' ' + idx[j + 1].t).includes(k)));
  console.log('»', q.slice(0, 50), '→', hit.slice(0, 4).map(h => `${h.norma} p${h.pag} art ${h.art} ${h.par}`).join(' | ') || 'NO');
}
