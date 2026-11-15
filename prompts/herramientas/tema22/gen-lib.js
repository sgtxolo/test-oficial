// Genera preguntas-t22r-lib.js a partir de la del Tema 21 (misma mecánica; cambia norma, ids, carpeta y anclas).
const fs = require('fs');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/prompts/herramientas/';
let s = fs.readFileSync(R + 'preguntas-t21r-lib.js', 'utf8');
const a = s.indexOf('const NORMAS = {'), b = s.indexOf('};', a) + 2;
const NORMAS = `const NORMAS = {
  reunion: ['Ley Orgánica 9/1983, de 15 de julio, reguladora del Derecho de Reunión', 'LO 9/1983 Derecho de Reunión', 'Ley Orgánica 9/1983 del Derecho de Reunión'],
  datos: ['Ley Orgánica 7/2021, de 26 de mayo, de protección de datos personales tratados para fines de prevención, detección, investigación y enjuiciamiento de infracciones penales y de ejecución de sanciones penales', 'LO 7/2021 Protección de datos penal', 'Ley Orgánica 7/2021, de 26 de mayo, de protección de datos personales tratados para fines de prevención,'],
  lopsc: ['Ley Orgánica 4/2015, de 30 de marzo, de protección de la seguridad ciudadana', 'LO 4/2015 Seguridad Ciudadana', 'Ley Orgánica 4/2015, de Protección de la Seguridad Ciudadana'],
  otra: ['Seguridad Ciudadana', 'Seguridad Ciudadana', 'General / Seguridad Ciudadana'],
};`;
s = s.slice(0, a) + NORMAS + s.slice(b);
s = s.replace(/21-ia-/g, '22-ia-').replace(/tema21/g, 'tema22').replace(/syncSeedIA\(21/g, 'syncSeedIA(22').replace(/\[21\]/g, '[22]').replace(/purga IA tema 21/g, 'purga IA tema 22').replace(/purga IA tema 20/g, 'purga IA tema 21').replace(/t21r/g, 't22r').replace(/Tema 21/g, 'Tema 22');
s = s.replace(/\^21-ia-/g, '^22-ia-');
fs.writeFileSync(R + 'preguntas-t22r-lib.js', s);
let c = fs.readFileSync(R + 'cierre-bloque-t21r.sh', 'utf8').replace(/t21r/g, 't22r').replace(/tema21/g, 'tema22').replace(/Tema 21/g, 'Tema 22');
fs.writeFileSync(R + 'cierre-bloque-t22r.sh', c);
console.log(/21/.test(s.replace(/22-ia|2[0-9]{3}/g, '')) ? 'quedan 21 sueltos: ' + (s.match(/.{20}21.{20}/g) || []).slice(0, 6).join(' | ') : 'ok');
