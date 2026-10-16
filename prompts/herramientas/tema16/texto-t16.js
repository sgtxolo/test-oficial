// Texto oficial limpio del Tema 16 (prompts/temario-limpio/tema16/oficial.txt) con espacios colapsados + extractor de citas LITERALES.
// lit(ancla, ini, fin): devuelve el tramo literal que empieza en `ini` (buscado a partir de `ancla`) y acaba en `fin` (incluido).
// Si no existe, lanza error: así ninguna cita del banco puede ser inventada.
const fs = require('fs'), path = require('path');
const RAW = fs.readFileSync(path.join(__dirname, '..', '..', 'temario-limpio', 'tema16', 'oficial.txt'), 'utf8');
const T = RAW.replace(/\s+/g, ' ');
const lit = (ancla, ini, fin) => {
  const a = ancla ? T.indexOf(ancla) : 0;
  if (a < 0) throw new Error('ancla no encontrada: ' + ancla);
  const i = T.indexOf(ini, a);
  if (i < 0) throw new Error('inicio no encontrado: ' + ini + ' (ancla ' + ancla + ')');
  if (fin === undefined) return ini;
  const j = T.indexOf(fin, i);
  if (j < 0) throw new Error('fin no encontrado: ' + fin + ' (inicio ' + ini + ')');
  return T.slice(i, j + fin.length);
};
// ancla de un artículo de la LO 3/2007 («Artículo 64. Plan de Igualdad…»)
const art = n => 'Artículo ' + n + '. ';
module.exports = { T, lit, art };
