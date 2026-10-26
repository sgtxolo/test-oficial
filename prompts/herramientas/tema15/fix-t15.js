// Tema 15 · correcciones de las preguntas OFICIALES verificadas contra el temario (oficial limpio + OCR de MI PDF subrayado)
// Auditoría 26/10/2026 (`node prompts/herramientas/auditoria-oficiales.js 15`): plazos (24 h, no 48), opciones con texto alterado, respuestas «incorrecta» invertidas…
// Uso: node prompts/herramientas/tema15/fix-t15.js            (aplica sobre test-oficial-conocimiento.html; idempotente)
// Cada entrada: [id, fn(q) → [cita literal del temario, nota opcional]]; la cita se comprueba contra oficial.txt (si no es literal NO se aplica).
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const TD = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema15');
const clean = f => fs.readFileSync(path.join(TD, f), 'utf8').replace(/=====PAG \d+=====|\[\[pag \d+\]\]/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const OF = clean('oficial.txt');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const OFN = nz(OF);
// etiqueta de la norma donde está la cita
const lab = cita => {
  const i = OF.indexOf(cita.slice(0, 60)); if (i < 0) return 'temario oficial';
  const antes = OF.slice(0, i);
  const m = [...antes.matchAll(/Artículo (\d+(?: bis| ter)?)\./g)].pop();
  const pos = (re) => { const r = [...antes.matchAll(re)]; return r.length ? r[r.length - 1].index : -1; };
  const pPul = pos(/PROTOCOLO DE ACTUACIÓN DEL SISTEMA DE SEGUIMIENTO POR MEDIOS TELEM/g), pLO = pos(/Artículo \d+(?: bis| ter)?\. /g), p15 = pos(/INSTRUCCIÓN 1\/2025/g), p521 = pos(/INSTRUCCIÓN 5\/2021/g);
  const mx = Math.max(pPul, pLO, p15, p521);
  if (mx === pPul) return 'Protocolo de actuación del sistema de seguimiento por medios telemáticos';
  if (mx === p15) return 'Instrucción 1/2025 de la SES';
  if (mx === p521) return 'Instrucción 5/2021 de la SES';
  return m ? `art. ${m[1]} de la LO 1/2004` : 'LO 1/2004';
};
const BS = String.fromCharCode(92), L = 'ABCD';
const ex = (q, art, cita, extra) => {
  const em = (q.explicacion.match(/<em style[^>]*>.*?<\/em>\s*$/) || [''])[0];
  return `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>El <span class="ref-norma">${art}</span> dispone: <span class="ref-concepto">"${cita}"</span>.${extra ? ' ' + extra : ''}${em ? ' ' + em : ''}`;
};
const O = (q, k, t) => { q.opciones[k] = t; };
const DLI = 'La colocación del DLI al investigado/ encausado/ condenado se realizará en sede judicial';
const PREV = 'Siempre se facilitará el DLV a la víctima con carácter previo a la instalación del dispositivo para el investigado/ encausado/ condenado';
const OPER = 'El operativo policial de protección se activará siempre que sea necesario, cuando se produzca la rotura del brazalete, la extracción del mismo sin ruptura o la descarga de la batería del DLI';
const F = [
  ['15-1', q => { q.opciones = [
      'En el plazo máximo de 24 horas desde que Cometa reciba la comunicación de la resolución judicial que acuerde la utilización del sistema de detección de proximidad, el personal de la empresa instaladora procederá a la instalación y entrega del correspondiente equipo a la víctima, le explicará su funcionamiento y normas básicas para su mantenimiento, y le entregará la guía de uso y mantenimiento de los equipos.',
      'Siempre se facilitará el DLV a la víctima con carácter previo a la instalación del dispositivo para el investigado/ encausado/ condenado (DLI).',
      'El DLV se entregará preferentemente en las dependencias policiales más próximas a su domicilio.',
      'La colocación del DLI al investigado/ encausado/ condenado se realizará en sede judicial, comisarías de Policía Nacional y/o Autonómicas, o puestos de la Guardia Civil, una vez que haya sido notificada y en el plazo acordado por la autoridad judicial.']; q.correcta = 2;
    return ['El DLV se entregará preferentemente en el domicilio de la víctima', 'No se entrega «prioritariamente en las dependencias policiales»: solo si no fuese posible en el domicilio.']; }],
  ['15-8', q => { O(q, 2, 'El Ministerio Fiscal y las Asociaciones que tengan como objetivo único la defensa de los intereses de la mujer.'); q.correcta = 3;
    return ['La Delegación Especial del Gobierno contra la Violencia sobre la Mujer , el Instituto de la Mujer u órgano equivalente de cada Comunidad Autónoma, el Ministerio Fiscal y las Asociaciones que tengan como objetivo único la defensa de los intereses de la mujer estarán legitimados', 'Los cuatro son titulares de la acción.']; }],
  ['15-10', q => { O(q, 0, 'Resolución del órgano judicial acordando que la prohibición de aproximación impuesta sea controlada por el Sistema.'); O(q, 1, 'Comunicación de la Resolución judicial que acuerde la imposición del dispositivo a las Fuerzas y Cuerpos de Seguridad.'); O(q, 2, 'Comunicación de la Resolución judicial que acuerde la imposición del dispositivo a Cometa.'); q.correcta = 3;
    return ['Comunicación de la Resolución judicial que acuerde la imposición del dispositivo a las Fuerzas y Cuerpos de Seguridad', 'Las tres son actuaciones previas a la instalación (1.1.2, 1.1.3 y 1.1.4); el dispositivo se «impone», no se «incoa» ni se «inscribe».']; }],
  ['15-15', q => { q.pregunta = q.pregunta.replace('siempre que sea necesario y, en todo caso, cuando:', 'siempre que sea necesario, cuando:'); O(q, 0, 'Se produzca la rotura del brazalete.'); O(q, 1, 'Se produzca la extracción del brazalete sin ruptura.'); O(q, 2, 'Se produzca la descarga de la batería del DLI.'); q.correcta = 3; return [OPER, null]; }],
  ['15-50', q => { O(q, 0, 'Separación del brazalete-DLI.'); O(q, 2, 'Batería alta DLV de la víctima.'); q.correcta = 2;
    return ['Estas incidencias incluyen: separación del brazalete-DLI, batería baja del brazalete, batería baja del DLI, llamada perdida de la víctima, batería baja DLV de la víctima', 'La incidencia es «batería baja» del DLV, no «batería alta».']; }],
  ['15-140', q => { O(q, 0, 'El Centro de Control comunicará la incidencia a las Fuerzas y Cuerpos de Seguridad territorialmente competentes.');
    O(q, 1, 'El operativo policial de protección se activará en todo caso, aunque no sea necesario, cuando se produzca la rotura del brazalete, la extracción del mismo sin ruptura o la descarga de la batería del DLI.');
    O(q, 2, 'Cuando la resolución de la incidencia requiera un encuentro con el investigado/ encausado/ condenado, Cometa se pondrá en contacto con las FFCCS competentes para determinar si es necesario que aquél se desplace a una dependencia policial para la solución de la incidencia.');
    O(q, 3, 'Si el investigado/ encausado/ condenado se negara a colaborar en la resolución de la incidencia, las FFCCS lo comunicarán de inmediato al órgano judicial que acordó el seguimiento por medios telemáticos.'); q.correcta = 1;
    return [OPER, 'El operativo se activa «siempre que sea necesario», no «en todo caso»; la comunicación inicial de la incidencia es a las FFCCS, no al órgano judicial.']; }],
  ['15-144', q => { q.pregunta = 'Ley Orgánica 1/2004, de 28 de diciembre, de Medidas de Protección Integral contra la Violencia de Género. Titulares de la acción de cesación y rectificación. ¿Cuál de los siguientes NO es titular de la acción de cesación de publicidad ilícita que utilice la imagen de la mujer con carácter vejatorio o discriminatorio?';
    O(q, 0, 'La Delegación Especial del Gobierno contra la Violencia sobre la Mujer.'); O(q, 2, 'El Ministerio Fiscal.'); q.correcta = 3;
    return ['La Delegación Especial del Gobierno contra la Violencia sobre la Mujer , el Instituto de la Mujer u órgano equivalente de cada Comunidad Autónoma, el Ministerio Fiscal y las Asociaciones que tengan como objetivo único la defensa de los intereses de la mujer estarán legitimados', 'El Defensor del Pueblo no figura entre los titulares.']; }],
  ['15-179', q => { O(q, 0, 'Doce meses de subsidio por desempleo.'); O(q, 1, 'Veinticuatro meses de subsidio por desempleo.'); O(q, 2, 'Dieciocho meses de subsidio por desempleo.'); O(q, 3, 'Treinta meses de subsidio por desempleo.'); q.correcta = 1;
    return ['En el caso de que la víctima tenga responsabilidades familiares, su importe podrá alcanzar el de un período equivalente al de 18 meses de subsidio, o de 24 meses si la víctima o alguno de los familiares que conviven con ella tiene reconocida oficialmente una minusvalía en grado igual o superior al 33', '18 meses es el tope solo con responsabilidades familiares; con discapacidad ≥ 33 % se alcanzan 24 meses.']; }],
  ['15-240', q => { q.correcta = 1; return ['En el plazo máximo de 24 horas desde que Cometa reciba la comunicación de la resolución que acuerde la utilización del sistema', 'El plazo es de 24 horas, no de 48.']; }],
  ['15-260', q => { O(q, 0, 'Se procurará facilitar el DLV a la usuaria con carácter posterior a la instalación del dispositivo para el investigado.'); q.correcta = 0; return [PREV, 'El DLV se facilita con carácter previo (no posterior); la entrega preferente es en el domicilio de la víctima.']; }],
  ['15-279', q => { q.correcta = 0; return ['La Oficina Judicial comunicará la Resolución, con carácter inmediato y dentro del plazo máximo de 24 horas, a las FFCCS territorialmente competentes', 'El plazo máximo es de 24 horas.']; }],
  ...require('./fix-t15-nuevas.js')({ O, ex }),
];
// ---------- aplicación ----------
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const malas = [], imgs = [];
for (const [id, fn] of F) {
  const key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1));
  const [cita, extra, modo] = fn(q);
  if (modo === 'img') imgs.push(id); else if (!OFN.includes(nz(cita))) { malas.push(id); continue; }
  q.explicacion = ex(q, lab(cita), cita, extra);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
if (imgs.length) console.log('(citas verificadas contra la imagen de mi PDF, no literales en oficial.txt):', imgs.join(', '));
if (malas.length) console.log('✗ CITA NO LITERAL (no se aplica):', malas.join(', '));
fs.writeFileSync(FILE, s); console.log('corregidas', n, 'de', F.length);
