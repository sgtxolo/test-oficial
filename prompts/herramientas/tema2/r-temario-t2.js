// Dónde pone el temario cada marca «Rn» (R1-R39) dentro del articulado del Tema 2:
// { R1: { txt: 'texto que sigue a la marca', art: '4', ap: '3' }, … }  (art = último «ARTÍCULO n» antes de la marca; ap = «3.» si lo hay)
// Uso: node prompts/herramientas/tema2/r-temario-t2.js
const fs = require('fs'), path = require('path');
const T = fs.readFileSync(path.join(__dirname, '..', '..', 'temario-limpio', 'tema2', 'temario.txt'), 'utf8')
  .replace(/\r/g, '').replace(/[\u0007]/g, '').replace(/[ -​ ]/g, ' ');
const corte = T.search(/\nRECUERDA\s*\n/); const ART = corte > 0 ? T.slice(0, corte) : T;
const out = {};
for (let n = 1; n <= 39; n++) {
  const m = new RegExp('(?:^|\\s)R' + n + '(?![0-9])\\s+([\\s\\S]{0,240})').exec(ART); if (!m) continue;
  const antes = ART.slice(0, m.index); const arts = [...antes.matchAll(/ARTÍCULO (\d+(?: BIS| TER)?)\./g)];
  const raw = m[1].replace(/\s+/g, ' ');
  out['R' + n] = { txt: raw.replace(/^(\d+\.)\s*/, '').replace(/(^|\s)([A-ZÁÉÍÓÚÑ]) (?=[a-záéíóúñ])/g, '$1$2').trim(),
    art: arts.length ? arts[arts.length - 1][1].toLowerCase() : '', ap: (raw.match(/^(\d+)\./) || [])[1] || '' };
}
module.exports = out;
if (require.main === module) for (let n = 1; n <= 39; n++) { const x = out['R' + n]; console.log('R' + n, '| art', x && x.art, 'ap', x && x.ap, '|', x ? x.txt.slice(0, 80) : '—'); }
