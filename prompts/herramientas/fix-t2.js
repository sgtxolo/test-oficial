// Correcciones del Tema 2 verificadas contra el temario oficial (completo 2025-09-09 + actualizaciones 30/03/2026 y 30/09/2026).
// Uso: node prompts/herramientas/fix-t2.js test-oficial-conocimiento.html <of2.txt>   (el .txt es el texto del temario, solo para comprobar que cada cita es literal)
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
const STEM5 = 'Ley 19/2003, art. 4.1. Se entenderá prohibida o limitada, en los términos que señalen las normas comunitarias, la realización de determinados movimientos de capitales y sus correspondientes operaciones de cobro o pago, así como las transferencias de o al exterior o las variaciones en cuentas o posiciones financieras deudoras o acreedoras frente al exterior, respecto de terceros países en relación con los cuales ____, de conformidad con lo establecido en el artículo 59 del Tratado Constitutivo de la Comunidad Europea, haya adoptado medidas de salvaguardia:';
const C5 = 'respecto de terceros países en relación con los cuales el Consejo de la Unión Europea, de conformidad con lo establecido en el artículo 59 del Tratado Constitutivo de la Comunidad Europea, haya adoptado medidas de salvaguardia';
const N5 = 'El enunciado original estaba alterado («centro de terroristas»); el sujeto que adopta las medidas de salvaguardia es el Consejo de la Unión Europea.';
const F = [
 ['2-5', q => { q.pregunta = STEM5; return ['art. 4.1 de la Ley 19/2003', C5, N5]; }],
 ['2-76', q => { q.pregunta = STEM5; return ['art. 4.1 de la Ley 19/2003', C5, N5]; }],
 ['2-22', q => { q.opciones[1] = 'La conducta anterior del infractor en relación con las normas en materia de movimientos de capitales y pagos exteriores, tomando en consideración al efecto las sanciones firmes que le hubieran sido impuestas durante los últimos cinco años.'; q.correcta = 0; return ['art. 10 de la Ley 19/2003', 'La conducta anterior del interesado, en relación con las normas en materia de movimientos de capitales y pagos exteriores, tomando en consideración al efecto las sanciones firmes que le hubieran sido impuestas durante los últimos cinco años', 'Es la incorrecta porque el art. 10.c) habla del tiempo entre la comisión de la infracción y el intento de SUBSANACIÓN, no de su descubrimiento; la opción B (ahora con «cinco años») sí es un criterio legal.']; }],
 ['2-25', q => { q.opciones[1] = 'Todo elemento o elemento de repuesto específicamente concebido para un arma de fuego e indispensable para su funcionamiento, incluidos el cañón, la caja o el cajón, el cerrojo o el tambor, el cierre o el bloqueo del cierre y todo dispositivo concebido o adaptado para disminuir el sonido causado por el disparo de un arma de fuego.'; q.correcta = 1; return ['art. 3.b) del Protocolo contra la fabricación y el tráfico ilícitos de armas de fuego', 'Por “piezas y componentes” se entenderá todo elemento o elemento de repuesto específicamente concebido para un arma de fuego e indispensable para su funcionamiento, incluidos el cañón, la caja o el cajón, el cerrojo o el tambor, el cierre o el bloqueo del cierre y todo dispositivo concebido o adaptado para disminuir el sonido causado por el disparo de un arma de fuego', 'La opción A define las «municiones» y la C el «arma de fuego».']; }],
 ['2-51', q => { q.pregunta = 'Ley 10/2010, de prevención del blanqueo de capitales y de la financiación del terrorismo. El impulso y coordinación de la ejecución de la Ley corresponde a la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias, dependiente de:'; q.opciones[2] = 'La Secretaría de Estado de Economía.'; q.correcta = 2; return ['art. 44.1 de la Ley 10/2010', 'El impulso y coordinación de la ejecución de la presente Ley corresponderá a la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias, dependiente de la Secretaría de Estado de Economía.', 'Pregunta reformulada: el temario no habla de «Ministerio de Economía y Empresa», sino de la Secretaría de Estado de Economía.']; }],
 ['2-ia-73', q => { q.opciones[1] = 'Carece de validez y efectos jurídicos mientras no se produzca su legalización.'; q.correcta = 1; return ['art. 7 bis.5 de la Ley 19/2003', 'Las operaciones de inversión llevadas a cabo sin la preceptiva autorización previa carecerán de validez y efectos jurídicos, en tanto no se produzca su legalización de acuerdo con lo establecido en el artículo 6 de la Ley.', 'El texto no dice «nula de pleno derecho».']; }],
 ['2-ia-265', q => { q.pregunta = 'Protocolo contra la Trata de Personas, art. 16.1. Abierto a la firma en Palermo del 12 al 15 de diciembre de 2000, ¿hasta cuándo puede firmarse después en la Sede de las Naciones Unidas en Nueva York?'; q.opciones[1] = 'Hasta el 12 de diciembre de 2002.'; q.correcta = 1; return ['art. 16.1 del Protocolo contra la Trata de Personas', 'El presente Protocolo estará abierto a la firma de todos los Estados del 12 al 15 de diciembre de 2000 en Palermo (Italia) y después de esa fecha en la Sede de las Naciones Unidas en Nueva York hasta el 12 de diciembre de 2002.', '']; }],
];
let n = 0;
for (const [id, fn] of F) {
  const key = '{"id":"' + id + '"';
  const i = s.indexOf(key); if (i < 0) { console.log('NOT FOUND', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break } }
  const q = JSON.parse(s.slice(i, j + 1));
  const [art, cita, extra] = fn(q);
  if (OFN && !OFN.includes(nz(cita))) { console.log('CITA NO LITERAL, se omite', id); continue; }
  q.explicacion = ex(q, art, cita, extra);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
fs.writeFileSync(FILE, s); console.log('corregidas', n);
