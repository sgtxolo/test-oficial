// Corrige confusiones típicas del OCR usando el vocabulario del temario y del banco.
const fs = require('fs');
const BQ = require('./banco.js')();
const voc = new Map();
const mete = t => { for (const w of String(t).toLowerCase().match(/[a-záéíóúüñ]+/g) || []) voc.set(w, (voc.get(w) || 0) + 1); };
for (const t of [1, 3]) mete(fs.readFileSync('C:/Users/ruben/Desktop/HTML OFICIAL/prompts/temario-limpio/tema' + t + '/temario.txt', 'utf8'));
Object.values(BQ).flat().forEach(q => { mete(q.pregunta); q.opciones.forEach(mete); });
const CONF = [['c', 'a'], ['o', 'a'], ['ó', 'á'], ['c', 'e'], ['0', 'o'], ['1', 'l'], ['i', 'l'], ['l', 'i'], ['d', 'á'], ['é', 'á'], ['a', 'o'], ['ü', 'ú'], ['q', 'g'], ['rn', 'm'], ['cl', 'd'], ['c', 'o']];
const f = w => voc.get(w) || 0;
function palabra(w) {
  const low = w.toLowerCase(); if (!/[a-záéíóúüñ]/i.test(w)) return w;
  if (/[a-z]0|0[a-z]|[a-z]1[a-z]/i.test(w) === false && f(low) >= 3) return w;
  let best = low, bf = f(low);
  const prueba = (s, d) => { for (const [a, b] of CONF) { let i = s.indexOf(a); while (i >= 0) { const c = s.slice(0, i) + b + s.slice(i + a.length); if (f(c) > Math.max(bf * 8, 2)) { best = c; bf = f(c); } if (d) prueba(c, d - 1); i = s.indexOf(a, i + 1); } } };
  if (low.length > 2 && low.length < 22) prueba(low, low.length < 14 ? 1 : 0);
  if (best === low) return w;
  return w[0] === w[0].toUpperCase() && /[A-ZÁÉÍÓÚ]/.test(w[0]) ? best[0].toUpperCase() + best.slice(1) : best;
}
module.exports = t => {
  let s = String(t).replace(/„\.?|\.„/g, '...').replace(/•+\.?/g, ':').replace(/\bIOS\b/g, 'los').replace(/\b1c\b|\bIc\b/g, 'la').replace(/\b01\b/g, 'al').replace(/\bc\b(?= )/g, 'a').replace(/\bCI\b/g, 'al').replace(/\bSLI\b/g, 'su').replace(/\bCorta\b/g, 'Carta').replace(/ 0 (?=[a-zjr])/g, ' o ').replace(/\bunc\b/g, 'una');
  s = s.replace(/[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ]+/g, w => /^\d+$/.test(w) ? w : palabra(w));
  s = s.replace(/\b([Tt])od[oa] (persona|limitación)/g, '$1oda $2').replace(/\bTodos las\b/g, 'Todas las').replace(/\bopciones son correctos\b/g, 'opciones son correctas').replace(/\bNinguno de (los|las) opciones es correct[oa]/g, 'Ninguna de las opciones es correcta').replace(/\b([Ll])os opciones/g, '$1as opciones').replace(/\blo (?=(protección|ley|persona|edad|educación|libertad|Unión|presente|igualdad|prohibición|libertad)\b)/g, 'la ').replace(/,$/, '.').replace(/\?[!•]\.?$|\?!$/, '?:');
  return s;
};
