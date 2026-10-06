// Correcciones del Tema 13 (Ley 29/1998, LJCA) verificadas contra el extracto oficial.
// Uso: node prompts/herramientas/fix-t13.js test-oficial-conocimiento.html <of13.txt>   (el .txt es el texto del extracto oficial, solo para comprobar que cada cita es literal)
const fs = require('fs');
const FILE = process.argv[2], OF = process.argv[3];
let s = fs.readFileSync(FILE, 'utf8');
const nz = t => t.toLowerCase().replace(/[^0-9a-záéíóúüñ]+/g, ' ').replace(/\s+/g, ' ').trim();
const OFN = OF ? nz(fs.readFileSync(OF, 'utf8')) : null;
const BS = String.fromCharCode(92), L = 'ABCD';
const ex = (q, art, cita, extra) => `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>${extra ? extra + ' ' : ''}Según el <span class="ref-norma">${art} de la Ley 29/1998 (LJCA)</span>: <span class="ref-concepto">"${cita}"</span> (verificado con el texto oficial).`;
const F = [
 [72, 1, 'art. 48.3', 'El expediente deberá ser remitido en el plazo improrrogable de veinte días, a contar desde que la comunicación judicial tenga entrada en el registro general del órgano requerido', 'El plazo es de veinte días, no quince.'],
 [78, 2, 'art. 9.1.e)', 'En primera instancia, de las resoluciones que acuerden la inadmisión de las peticiones de asilo político', 'Lo conocen los Juzgados Centrales, no la Audiencia Nacional.'],
 [42, 3, 'art. 11.1.g)', 'De los recursos contra los actos del Banco de España, de la Comisión Nacional del Mercado de Valores y del FROB adoptados conforme a lo previsto en la Ley 11/2015', 'Los conoce la Sala de la Audiencia Nacional, que no figura entre las opciones.'],
 [123, 2, 'art. 1.3.b)', 'Los actos y disposiciones del Consejo General del Poder Judicial y la actividad administrativa de los órganos de gobierno de los Juzgados y Tribunales', 'Estos actos SÍ corresponden al orden contencioso-administrativo, por eso es la opción incorrecta en una pregunta sobre lo que NO le corresponde.'],
 [180, 0, 'art. 9.1.e)', 'En primera instancia, de las resoluciones que acuerden la inadmisión de las peticiones de asilo político', 'Es solo «en primera instancia»; decir «única o primera» es lo incorrecto.'],
 [181, 2, 'art. 4.1', 'salvo las de carácter constitucional y penal y lo dispuesto en los Tratados internacionales', 'Las cuestiones civiles SÍ las conoce este orden; las excepciones son las constitucionales, las penales y lo dispuesto en los Tratados.'],
 [172, 0, 'art. 14.1', 'Con carácter general, será competente el órgano jurisdiccional en cuya circunscripción tenga su sede el órgano que hubiere dictado la disposición o el acto originario impugnado', 'En materia de personal, responsabilidad patrimonial, propiedades especiales y sanciones es a elección del demandante, y en urbanismo donde radiquen los inmuebles.'],
 [115, 2, 'art. 8.2.b)', 'sanciones administrativas que consistan en multas no superiores a 60.000 euros y en ceses de actividades o privación de ejercicio de derechos que no excedan de seis meses', 'Los Juzgados conocen de multas NO SUPERIORES a 60.000 euros; decir «superiores» es lo incorrecto.'],
];
let n = 0;
for (const [num, idx, art, cita, nota] of F) {
  if (OFN && !OFN.includes(nz(cita))) { console.log('CITA NO LITERAL, se omite', num); continue; }
  const id = '13-' + num, key = '{"id":"' + id + '"';
  const i = s.indexOf(key); if (i < 0) { console.log('NOT FOUND', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break } }
  const q = JSON.parse(s.slice(i, j + 1));
  q.correcta = idx; q.explicacion = ex(q, art, cita, nota);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
fs.writeFileSync(FILE, s); console.log('corregidas', n);
