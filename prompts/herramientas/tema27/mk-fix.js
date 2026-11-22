// Genera tema27/fix-t27.js a partir de tema26/fix-t26.js
const fs = require('fs');
let s = fs.readFileSync('prompts/herramientas/tema26/fix-t26.js', 'utf8');
const a = s.indexOf('const NORMAS = {'), b = s.indexOf('// texto por norma');
const NUEVO = `const NORMAS = {
  onu: 'Principios básicos sobre el empleo de la fuerza y de armas de fuego por los funcionarios encargados de hacer cumplir la ley (VIII Congreso de la ONU, La Habana, 1990)',
  pol: 'Resolución 690 de 1979, de la Asamblea Parlamentaria del Consejo de Europa, Declaración sobre la Policía',
  cee: 'Recomendación Rec. (2001) 10 del Comité de Ministros a los Estados miembros sobre el Código Europeo de Ética de la Policía',
  rd: 'Real Decreto 176/2022, de 4 de marzo, por el que se aprueba el Código de Conducta del personal de la Guardia Civil',
  og: 'Orden General número 10/2024, de 31 de octubre, por la que se regula el Sistema de Integridad de la Guardia Civil',
};
const RANGOS = { onu: [2, 8], pol: [9, 12], cee: [13, 19], rd: [20, 33], og: [38, 54] };
`;
s = s.slice(0, a) + NUEVO + s.slice(b);
// marcas de apartado para los textos con párrafos numerados
s = s.replace("marcas.sort((a, b) => a[0] - b[0]);",
  "if (/^(onu|pol|cee)$/.test(k)) { const re3 = /(?:^|\\s)(\\d{1,2})\\.\\s+(?=[A-ZÁÉÍÓÚ«])/g; while ((m = re3.exec(OF))) marcas.push([m.index, (k === 'onu' ? 'Principio ' : 'Punto ') + m[1]]); }\n  marcas.sort((a, b) => a[0] - b[0]);");
const q0 = s.indexOf('const qNorma ='), q1 = s.indexOf('\n', q0);
s = s.slice(0, q0) + "const qNorma = p => { const h = p.slice(0, 300); return /10\\/2024|SINTEGC|Sistema de Integridad/i.test(h) ? 'og' : /176\\/2022|C[oó]digo de Conducta del Personal|Decálogo/i.test(h) ? 'rd' : /C[oó]digo Europeo|Rec\\.? ?\\(2001\\)|2001\\) ?10/i.test(h) ? 'cee' : /690|Declaraci[oó]n sobre la Polic/i.test(h) ? 'pol' : /Principios b[aá]sicos|Octavo Congreso|La Habana|empleo de la fuerza/i.test(h) ? 'onu' : 'cee'; };" + s.slice(q1);
s = s.replace(/tema26/g, 'tema27').replace(/Tema 26/g, 'Tema 27').replace(/'26-'/g, "'27-'").replace(/\^26-/g, '^27-').replace(/\{"id":"26-/g, '{"id":"27-');
s = s.replace(/^\/\/ Tema 27 · correcciones.*\n\/\/ Cinco normas.*\n/m, '// Tema 27 · correcciones de las preguntas OFICIALES (27-N) contra el temario oficial limpio (prompts/temario-limpio/tema27/oficial.txt)\n// Cinco normas: Principios ONU (págs. 2-8 del oficial), Resolución 690/1979 (9-12), Código Europeo de Ética (13-19), RD 176/2022 (20-33), OG 10/2024 (38-54).\n');
fs.writeFileSync('prompts/herramientas/tema27/fix-t27.js', s);
fs.mkdirSync('prompts/herramientas/tema27/fix-edits', { recursive: true });
console.log('ok', (s.match(/26/g) || []).length, 'restos de 26');
