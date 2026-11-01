// Tema 17 · Exprés subrayado: pregunta → pieza a partir del mapa de Esquemas (MAPA_PREG: «17-k-j») y la ficha k.
// Escribe expres-subrayado/t17-preg-extra.json (lo lee expres-subrayado-datos.js). Uso: node prompts/herramientas/tema17/preg-extra-t17.js
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', '..', '..'); process.chdir(R);
const h = fs.readFileSync('esquemas.html', 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const CAB = JSON.parse(fs.readFileSync(path.join(__dirname, 'cabs-t17.json'), 'utf8'));   // [k, bloque, cab] (se genera con la hoja de fichas del esquema)
const pieza = ([k, bl, cab]) => {
  let m = cab.match(/^Art[íi]culo (\d+)/);
  if (m) return (k >= 34 && k <= 38 ? 'b-' : 'a-') + m[1];
  if (/^Instrucciones/.test(cab)) return 'c-ins';
  m = cab.match(/^(\d+)\.(\d+)\./); if (m) return 'c-' + m[1] + m[2];
  if (/RECUERDA.*LO 5\/2000/.test(cab)) return 'a-rec';
  if (/RECUERDA.*RD 1774/.test(cab)) return 'b-rec';
  if (/RECUERDA.*Instrucción 1\/2017/.test(cab)) return 'c-rec';
  if (/RECUERDA.*14\/2018/.test(cab)) return 'c-rec2';
  return null;
};
const out = {};
for (const [id, v] of Object.entries(MAPA)) { const m = v.match(/^17-(\d+)-/); if (!m || !id.startsWith('17-')) continue; const f = CAB.find(c => c[0] === +m[1]); const p = f && pieza(f); if (p) out[id] = p; }
fs.writeFileSync('expres-subrayado/t17-preg-extra.json', JSON.stringify(out)); console.log(Object.keys(out).length, 'preguntas ancladas a pieza');
