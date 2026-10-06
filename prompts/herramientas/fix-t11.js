// Correcciones del Tema 11 verificadas contra el texto oficial (extracto 2026). Uso: node prompts/herramientas/fix-t11.js test-oficial-conocimiento.html <oficial.txt>
const fs = require('fs');
const FILE = process.argv[2], OF = process.argv[3];
let s = fs.readFileSync(FILE, 'utf8');
const nz = t => t.toLowerCase().replace(/[^0-9a-záéíóúüñ]+/g, ' ').replace(/\s+/g, ' ').trim();
const OFN = OF ? nz(fs.readFileSync(OF, 'utf8')) : null;
const BS = String.fromCharCode(92), L = 'ABCD';
const ex = (q, art, cita, extra) => {
  const em = (q.explicacion.match(/<em style[^>]*>.*?<\/em>\s*$/) || [''])[0];
  return `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>${extra ? extra + ' ' : ''}Según el <span class="ref-norma">${art}</span>: <span class="ref-concepto">"${cita}"</span> (verificado con el texto del temario oficial).${em ? ' ' + em : ''}`;
};
const F = [
 ['11-9', 2, 'art. 58 de la Ley 39/2015', 'Los procedimientos se iniciarán de oficio por acuerdo del órgano competente, bien por propia iniciativa o como consecuencia de orden superior, a petición razonada de otros órganos o por denuncia', 'La opción A omite la iniciación «por propia iniciativa».'],
 ['11-23', 1, 'art. 27.1 de la LO 3/2018', 'Que el tratamiento se limite a los datos estrictamente necesarios para la finalidad perseguida por aquel', 'La opción A es ininteligible y no figura en el texto, por lo que «A y B son correctas» no es válida.'],
 ['11-24', 1, 'art. 19.4 de la Ley 40/2015', 'se realizarán según lo dispuesto en las normas específicas de cada órgano y, en su defecto, por acuerdo del mismo', ''],
 ['11-32', 3, 'art. 49.1 de la LO 3/2018', 'Un Senador, propuesto por el Senado [...] Un representante designado por el Consejo General del Poder Judicial [...] Un representante de la Administración General del Estado', 'Las tres primeras opciones son miembros del Consejo Consultivo.'],
 ['11-58', 3, 'art. 120.3 de la Ley 39/2015', 'salvo el de audiencia, cuando proceda', 'La opción D es la INCORRECTA: el texto dice «salvo el de audiencia», no «salvo el de reclamación».'],
 ['11-71', 3, 'art. 16 de la Ley 40/2015', 'Secretario que podrá ser un miembro del propio órgano o una persona al servicio de la Administración Pública [...] velar por la legalidad formal y material', 'El Secretario «podrá ser» miembro del órgano o persona al servicio de la Administración (no «será»), y vela por la legalidad formal y material (no «real»).'],
 ['11-77', 1, 'art. 27.1 de la LO 3/2018', 'Que el tratamiento se limite a los datos estrictamente necesarios para la finalidad perseguida por aquel', 'El interés público no figura como requisito del art. 27.1.'],
 ['11-135', 0, 'art. 49.1 de la LO 3/2018', 'Un Diputado, propuesto por el Congreso de los Diputados', 'La INCORRECTA es A: el Consejo Consultivo tiene un Diputado, no dos.'],
];
let n = 0;
for (const [id, corr, art, cita, extra] of F) {
  const key = '{"id":"' + id + '"';
  const i = s.indexOf(key); if (i < 0) { console.log('NOT FOUND', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break } }
  const q = JSON.parse(s.slice(i, j + 1));
  if (OFN) { const bad = cita.split(' [...] ').filter(p => !OFN.includes(nz(p))); if (bad.length) { console.log('CITA NO LITERAL, se omite', id, bad[0].slice(0, 60)); continue; } }
  q.correcta = corr; q.explicacion = ex(q, art, cita, extra);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
fs.writeFileSync(FILE, s); console.log('corregidas', n);
