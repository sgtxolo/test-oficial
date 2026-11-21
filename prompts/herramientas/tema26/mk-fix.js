// Genera tema26/fix-t26.js a partir de tema25/fix-t25.js
const fs = require('fs');
let s = fs.readFileSync('prompts/herramientas/tema25/fix-t25.js', 'utf8');
const a = s.indexOf('const NORMAS = {'), b = s.indexOf('const OFT');
const NUEVO = `const NORMAS = {
  lo11: 'Ley Orgánica 11/2007, de 22 de octubre, reguladora de los derechos y deberes de los miembros de la Guardia Civil',
  lo12: 'Ley Orgánica 12/2007, de 22 de octubre, del régimen disciplinario de la Guardia Civil',
  l29: 'Ley 29/2014, de 28 de noviembre, de Régimen del Personal de la Guardia Civil',
  ord: 'Orden PRE/1983/2012, de 14 de septiembre, por la que se declaran de aplicación a la Guardia Civil diversas normas del ordenamiento militar sobre mando, disciplina y régimen interior',
  acl: 'Resolución de 22 de julio de 2019, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación frente al acoso laboral en la Guardia Civil',
  acs: 'Resolución de 22 de julio de 2019, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación frente al acoso sexual y al acoso por razón de sexo, identidad u orientación sexual en la Guardia Civil',
  vg: 'Resolución de 6 de julio de 2021, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación ante situaciones de violencia sobre la mujer que afecten a personal de la Guardia Civil',
};
const RANGOS = { lo11: [2, 17], lo12: [18, 44], l29: [45, 102], ord: [103, 106] };
// texto por norma (las resoluciones solo están en mi PDF: sin texto oficial; sus citas manuales no se comprueban)
const TXT = {};
{ const pags = RAW.split(/=====PAG (\\d+) ?=====/); const por = {}; for (let i = 1; i < pags.length; i += 2) por[+pags[i]] = pags[i + 1];
  for (const k in RANGOS) { let t = ''; for (let p = RANGOS[k][0]; p <= RANGOS[k][1]; p++) t += (por[p] || '') + '\\n'; TXT[k] = t.replace(/-\\s*\\n\\s*/g, '').replace(/[ \\t]*\\n[ \\t]*/g, ' ').replace(/\\s+/g, ' '); } }
`;
s = s.slice(0, a) + NUEVO + s.slice(b);
s = s.replace(/tema25/g, 'tema26').replace(/Tema 25/g, 'Tema 26').replace(/\(25-1…25-127\)/, '(26-N)');
// ids reales
s = s.replace("for (let k = 1; k <= 127; k++) {\n  const id = '25-' + k,", "const IDS = JSON.parse(fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema26', 'preguntas-actuales.json'), 'utf8')); const LISTA = (Array.isArray(IDS) ? IDS : IDS.preguntas).map(q => q.id).filter(i => /^26-\\d+$/.test(i)).map(i => +i.split('-')[1]);\nfor (const k of LISTA) {\n  const id = '26-' + k,");
// norma por pregunta
const q0 = s.indexOf('const qNorma ='), q1 = s.indexOf('\n', q0);
s = s.slice(0, q0) + `const qNorma = p => { const h = p.slice(0, 260); return /acoso laboral/i.test(h) && /protocolo|resoluci/i.test(h) ? 'acl' : /acoso sexual|raz[oó]n de sexo/i.test(h) && /protocolo|resoluci/i.test(h) ? 'acs' : /violencia sobre la mujer|violencia de g[eé]nero/i.test(h) && /protocolo|resoluci/i.test(h) ? 'vg' : /1983\\/2012/.test(h) ? 'ord' : /29\\/2014|r[eé]gimen del personal/i.test(h) ? 'l29' : /12\\/2007|r[eé]gimen disciplinario/i.test(h) ? 'lo12' : 'lo11'; };` + s.slice(q1);
// SEG solo para normas con texto; mejor() y citas de resoluciones
s = s.replace("const mejor = (k, textos) => {\n  const q = toks", "const mejor = (k, textos) => {\n  if (!SEG[k]) return null;\n  const q = toks");
s = s.replace("for (const id in EDITS) { const c = EDITS[id].cita; if (c &&", "for (const id in EDITS) { const c = EDITS[id].cita; if (c && !/^(acl|acs|vg)$/.test(EDITS[id].k || '') &&");
s = s.replace(/de 127/g, 'de ' + "' + LISTA.length + '");
fs.writeFileSync('prompts/herramientas/tema26/fix-t26.js', s);
fs.mkdirSync('prompts/herramientas/tema26/fix-edits', { recursive: true });
console.log('ok');
