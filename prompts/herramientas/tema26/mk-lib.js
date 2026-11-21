// Genera prompts/herramientas/preguntas-t26r-lib.js y cierre-bloque-t26r.sh a partir de los del Tema 25
const fs = require('fs');
let s = fs.readFileSync('prompts/herramientas/preguntas-t25r-lib.js', 'utf8');
const a = s.indexOf('const NORMAS = {'), b = s.indexOf('};', a) + 2;
const NORMAS = `const NORMAS = {
  lo11: ['Ley Orgánica 11/2007, de 22 de octubre, reguladora de los derechos y deberes de los miembros de la Guardia Civil', 'Ley Orgánica 11/2007, reguladora de los derechos y deberes de los miembros de la Guardia Civil', 'Ley Orgánica 11/2007, de Derechos y Deberes de los miembros de la Guardia Civil'],
  lo12: ['Ley Orgánica 12/2007, de 22 de octubre, del régimen disciplinario de la Guardia Civil', 'Ley Orgánica 12/2007, del régimen disciplinario de la Guardia Civil', 'Ley Orgánica 12/2007, del Régimen Disciplinario de la Guardia Civil'],
  l29: ['Ley 29/2014, de 28 de noviembre, de Régimen del Personal de la Guardia Civil', 'Ley 29/2014, de Régimen del Personal de la Guardia Civil', 'Ley 29/2014, de Régimen del Personal de la Guardia Civil'],
  ord: ['Orden PRE/1983/2012, de 14 de septiembre, por la que se declaran de aplicación a la Guardia Civil diversas normas del ordenamiento militar sobre mando, disciplina y régimen interior', 'Orden PRE/1983/2012, normas militares aplicables a la Guardia Civil', 'Orden PRE/1983/2012, de aplicación a la Guardia Civil de normas militares sobre mando, disciplina y régimen interior'],
  acl: ['Resolución de 22 de julio de 2019, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación frente al acoso laboral en la Guardia Civil', 'Protocolo de actuación frente al acoso laboral en la Guardia Civil', 'Protocolo de actuación frente al acoso laboral en la Guardia Civil'],
  acs: ['Resolución de 22 de julio de 2019, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación frente al acoso sexual y al acoso por razón de sexo, identidad u orientación sexual en la Guardia Civil', 'Protocolo de actuación frente al acoso sexual y por razón de sexo en la Guardia Civil', 'Protocolo de actuación frente al acoso sexual y por razón de sexo en la Guardia Civil'],
  vg: ['Resolución de 6 de julio de 2021, del Director General de la Guardia Civil, por la que se aprueba el Protocolo de actuación ante situaciones de violencia sobre la mujer que afecten a personal de la Guardia Civil', 'Protocolo de actuación ante situaciones de violencia sobre la mujer que afecten a personal de la Guardia Civil', 'Protocolo de actuación ante situaciones de violencia sobre la mujer en la Guardia Civil'],
};`;
s = s.slice(0, a) + NORMAS + s.slice(b);
s = s.replace(/tema25/g, 'tema26').replace(/Tema 25/g, 'Tema 26').replace(/25-ia-/g, '26-ia-')
  .replace(/purga IA tema 25/g, 'purga IA tema 26').replace(/\[25\]/g, '[26]').replace(/\^25-ia/g, '^26-ia').replace(/syncSeedIA\(25,/g, 'syncSeedIA(26,')
  .replace(/Coordinación y Cooperación Policial: LO 2\/1986, Ley 31\/2010, RD 1087\/2010, Reglamento Europol, Estatuto INTERPOL/, 'Estatuto del Personal de la Guardia Civil: LO 11/2007, LO 12/2007, Ley 29/2014, Orden PRE/1983/2012, protocolos de acoso y violencia')
  .replace(/Normas k: loe, l31, rd, eur, int\./, 'Normas k: lo11, lo12, l29, ord, acl, acs, vg.');
// la purga del 26 va antes de la del 25
s = s.replace("indexOf('(function(){/* purga IA tema 23 */')", "indexOf('(function(){/* purga IA tema 25 */')");
fs.writeFileSync('prompts/herramientas/preguntas-t26r-lib.js', s);
let c = fs.readFileSync('prompts/herramientas/cierre-bloque-t25r.sh', 'utf8').replace(/t25r/g, 't26r').replace(/tema25/g, 'tema26').replace(/Tema 25/g, 'Tema 26');
fs.writeFileSync('prompts/herramientas/cierre-bloque-t26r.sh', c);
console.log(s.match(/25/g)?.length, 'restos de 25 en lib');
console.log(s.split('\n').filter(l => /25/.test(l)).map(l => l.slice(0, 160)).join('\n'));
