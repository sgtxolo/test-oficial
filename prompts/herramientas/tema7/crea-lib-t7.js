// Genera prompts/herramientas/preguntas-t7-lib.js a partir de la librería del Tema 3 (misma mecánica: borra TODAS las IA antiguas, inserta el bloque semilla y deja la purga de localStorage).
const fs = require('fs');
let s = fs.readFileSync('prompts/herramientas/preguntas-t3-lib.js', 'utf8');
s = s.replace(/3-ia-/g, '7-ia-').replace(/syncSeedIA\(3/g, 'syncSeedIA(7').replace(/tema 3/g, 'tema 7').replace(/Tema 3/g, 'Tema 7')
  .replace(/\[3\]/g, '[7]').replace(/preguntas-t3-bNN/g, 'preguntas-t7-bNN').replace('tema3/oficial-paginas.txt', 'tema7/oficial-paginas.txt');
const NORMAS = `const NORMAS = {
  lotc: ['Ley Orgánica 2/1979, de 3 de octubre, del Tribunal Constitucional', 'la LOTC', 'Ley Orgánica 2/1979, de 3 de octubre, del Tribunal Constitucional'],
  lo82: ['Ley Orgánica 1/1982, de 5 de mayo, de protección civil del derecho al honor, a la intimidad personal y familiar y a la propia imagen', 'la LO 1/1982', 'Ley Orgánica 1/1982, de 5 de mayo, de protección civil del derecho al honor, a la intimidad personal y a la'] };`;
s = s.replace(/const NORMAS = \{[\s\S]*?\};/, () => NORMAS);
s = s.replace('const [nom, corta] = NORMAS[q.k];', 'const [nom, corta, apartado] = NORMAS[q.k];').replace('apartado: nom }', 'apartado }');
fs.writeFileSync('prompts/herramientas/preguntas-t7-lib.js', s);
console.log((s.match(/\[3\]|3-ia|tema 3/g) || []).length, 'restos del tema 3');
console.log(s.split('\n').filter(l => /PURGA =|apartado|NORMAS|tema7/.test(l)).join('\n').slice(0, 1200));
