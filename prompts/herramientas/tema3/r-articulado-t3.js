// Fichas RECUERDA R1-R29 del Tema 3 → su párrafo del articulado (ficha k de expres-lib + regex del texto del apartado).
// Devuelve { r: {'k-j': ['R1',…]}, falta: [] }. Uso: require('./r-articulado-t3.js')(X)  ·  node r-articulado-t3.js (informe)
const fs = require('fs'), path = require('path');
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
// [R, ficha por cabecera, regex dentro de la ficha]
const R = [
  ['R1', /^Artículo 2 —/, /./], ['R2', /^Artículo 2 —/, /./],
  ['R3', /^Artículo 5 —/, /principio de atribución/], ['R4', /^Artículo 5 —/, /subsidiariedad/],
  ['R5', /^Artículo 10 —/, /democracia representativa/], ['R6', /^Artículo 13 —/, /Comité Económico y Social/],
  ['R7', /^Artículo 16 —/, /rango ministerial/], ['R8', /^Artículo 17 —/, /cinco años/],
  ['R9', /^Artículo 18 —/, /Alto Representante/], ['R10', /^Artículo 19 —/, /Tribunal de Justicia de la Unión Europea/i],
  ['R11', /^Artículo 22 —/, /Consejo Europeo/], ['R12', /^Artículo 29 —/, /./],
  ['R13', /^Artículo 33 —/, /./], ['R14', /^Artículo 46 —/, /abandonar|notificará|toma nota/],
  ['R15', /^Artículo 45 TFUE/, /discriminación/], ['R16', /^Artículos 56 a 62 TFUE/, /industriales|artesanales/],
  ['R17', /^Artículos 67 a 70 TFUE/, /reconocimiento mutuo/], ['R18', /^Artículos 78 a 80 TFUE/, /solidaridad/],
  ['R19', /^Artículo 84 TFUE/, /./], ['R20', /^Artículos 87 a 89 TFUE/, /medidas coercitivas/],
  ['R21', /^Artículos 223 a 225 TFUE/, /estatuto y las condiciones generales/], ['R22', /^Artículos 229 a 234 TFUE/, /segundo martes/],
  ['R23', /^Artículos 237 a 243 TFUE/, /convocatoria de su Presidente/], ['R24', /^Artículos 244 a 250 TFUE/, /(deje de reunir|falta grave)/],
  ['R25', /^Artículos 258 a 261 TFUE/, /competencia jurisdiccional plena/], ['R26', /^Artículos 263 a 267 TFUE/, /(interpretación de los Tratados|carácter prejudicial)/],
  ['R27', /^Artículos 269 a 281 TFUE/, /efecto suspensivo/], ['R28', /^Artículos 301 a 304 TFUE/, /trescientos cincuenta/],
  ['R29', /^Artículos 305 a 307 TFUE/, /trescientos cincuenta/],
];
module.exports = function (X) {
  const r = {}, falta = [];
  R.forEach(([n, rc, rp]) => {
    const k = X.fichas.findIndex(f => rc.test(limpia(f.cab)));
    if (k < 0) return falta.push(n + ':ficha');
    const j = X.fichas[k].ps.findIndex(p => rp.test(limpia(p.h)));
    if (j < 0) return falta.push(n + ':párrafo');
    (r[`${k}-${j}`] = r[`${k}-${j}`] || []).push(n);
  });
  return { r, falta };
};
if (require.main === module) {
  const X = require('../expres-lib.js')(3); const { r, falta } = module.exports(X);
  const h = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'esquemas.html'), 'utf8');
  const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
  Object.entries(r).sort((a, b) => +a[1][0].slice(1) - +b[1][0].slice(1)).forEach(([kj, rs]) => { const [k, j] = kj.split('-').map(Number);
    const ids = Object.entries(MAPA).filter(([, v]) => v === `3-${k}-${j}` || v.startsWith(`3-${k}-${j}-`)).map(([i]) => i);
    console.log(rs.join(',').padEnd(8), kj.padEnd(6), limpia(X.fichas[k].ps[j].h).slice(0, 70).padEnd(72), '| of', ids.filter(i => !/-ia-/.test(i)).join(',') || '—', '| ia', ids.filter(i => /-ia-/.test(i)).length); });
  console.log('sin sitio:', falta.join(' ') || '—');
}
