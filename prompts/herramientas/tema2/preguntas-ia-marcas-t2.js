// Tema 2 · preguntas IA nuevas (2-ia-347 en adelante) para las marcas de ASTERISCO (*) y «EX» del temario subrayado del usuario
// que no tenían ninguna pregunta (pauta 15/10/2026: van al banco IA, pero son preguntas de la academia Prefortia susceptibles de
// salir). Cita literal comprobada contra prompts/temario-limpio/tema2/temario.txt.
// Uso: node prompts/herramientas/tema2/preguntas-ia-marcas-t2.js [--json salida.json]   (sin argumento inserta tras 2-ia-346)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html'), BS = String.fromCharCode(92), L = 'ABCD';
const NOM = {
  l19: ['Ley 19/2003, sobre régimen jurídico de los movimientos de capitales y de las transacciones económicas con el exterior', 'Ley 19/2003', 'de la Ley 19/2003'],
  c196: ['Convenio del Consejo de Europa para la prevención del terrorismo', 'Convenio del Consejo de Europa para la prevención del terrorismo', 'del Convenio n.º 196 del Consejo de Europa'],
  l10: ['Ley 10/2010, de prevención del blanqueo de capitales y de la financiación del terrorismo', 'Ley 10/2010, de prevención del blanqueo de capitales y de la financiación del terrorismo', 'de la Ley 10/2010'],
  pal: ['Convención de las Naciones Unidas contra la Delincuencia Organizada Transnacional', 'Convención de las Naciones Unidas contra la Delincuencia Organizada Transnacional (Convención de Palermo)', 'de la Convención de Palermo'],
  arm: ['Protocolo contra la fabricación y el tráfico ilícitos de armas de fuego, sus piezas y componentes y municiones', 'Protocolo contra la fabricación y el tráfico ilícitos de armas de fuego (complementario a la Convención de Palermo)', 'del Protocolo contra las armas de fuego'],
};
const q = (k, a, m, r, e, o, cita, p) => ({ k, a, m, r, e, o, cita, p });
const Q = [
q('l19', 'disposición adicional primera', 'EX', 'Modificación de la Ley 19/1993', 'Las personas físicas, actuando por cuenta propia o de terceros, deberán declarar, en los términos que se establezcan reglamentariamente, la salida o entrada en territorio nacional de moneda metálica, billetes de banco y cheques bancarios al portador o cualquier medio físico concebido para ser utilizado como medio de pago, por importe superior a:',
  ['80.500 euros.', '10.000 euros.', '6.000 euros.', '100.000 euros.'],
  'concebido para ser utilizado como medio de pago, por importe superior a 80.500 euros', 'Es el umbral que recoge la modificación de la Ley 19/1993 (no confundir con los 10.000 euros de la Ley 10/2010).'),
q('c196', 'art. 20.2', '*', 'Exclusión de la cláusula de excepción política', 'Cualquier Estado, o la Comunidad Europea, podrá declarar al firmar o depositar su instrumento de ratificación que se reserva el derecho de no aplicar la exclusión de la cláusula de excepción política a la extradición relacionada con los delitos del Convenio. La Parte se compromete a aplicar esta reserva:',
  ['Caso por caso, sobre la base de una decisión debidamente motivada.', 'Con carácter general, previa comunicación al Comité de Ministros.', 'Solo respecto de sus propios nacionales y durante un máximo de tres años.', 'Caso por caso, previo dictamen de la Consulta entre las Partes.'],
  'La Parte se compromete a aplicar esta reserva caso por caso, sobre la base de una decisión debidamente motivada', 'La reserva se aplica caso por caso y con decisión motivada.'),
q('l10', 'art. 4 bis.1', '*', 'Información de titularidad real de personas jurídicas', 'Las personas jurídicas obligadas a declarar su titularidad real conservarán la información de los titulares reales por un plazo de:',
  ['10 años a contar desde el cese de su condición de titular real.', '5 años a contar desde el cese de su condición de titular real.', '10 años a contar desde la constitución de la persona jurídica.', '6 años a contar desde la última actualización de la información.'],
  'La información de los titulares reales se conservará por un plazo de 10 años a contar desde el cese de su condición de titular real', '10 años desde el cese como titular real.'),
q('l10', 'art. 4 bis.3.b', 'EX', 'Información de titularidad real de personas jurídicas', 'En las sociedades con Consejo de Administración, la información actualizada sobre la titularidad real será mantenida por:',
  ['El Consejo de Administración, así como, en particular, el secretario del Consejo de Administración, sea o no consejero.', 'El Consejo de Administración, así como, en particular, el secretario del Consejo, siempre que tenga la condición de consejero.', 'El presidente del Consejo de Administración y el consejero delegado, de forma mancomunada.', 'La junta general de accionistas, a través del secretario del Consejo de Administración, sea o no consejero.'],
  'El Consejo de Administración, así como, en particular, el secretario del Consejo de Administra- ción, sea o no consejero', 'El secretario del Consejo la mantiene tanto si es consejero como si no.'),
q('l10', 'art. 18.3', '*', 'Comunicación por indicio', 'La comunicación por indicio se efectuará por los sujetos obligados en el soporte y con el formato que determine:',
  ['El Servicio Ejecutivo de la Comisión.', 'La Secretaría de la Comisión.', 'El Comité Permanente de la Comisión.', 'El Ministerio de Asuntos Económicos.'],
  'La comunicación por indicio se efectuará por los sujetos obligados en el soporte y con el formato que', 'Soporte y formato los fija el Servicio Ejecutivo (SEPBLAC).'),
q('l10', 'art. 31.2', '*', 'Sucursales y filiales en terceros países', 'Cuando el derecho del tercer país no permita la aplicación de medidas equivalentes a las establecidas por el derecho de la Unión Europea, los sujetos obligados adoptarán medidas adicionales respecto de sus sucursales y filiales e informarán de esta circunstancia al Servicio Ejecutivo de la Comisión en el plazo máximo de:',
  ['Siete días después de identificar al tercer país.', 'Quince días después de identificar al tercer país.', 'Un mes después de identificar al tercer país.', 'Tres días hábiles desde la adopción de las medidas adicionales.'],
  'informarán al Servicio Ejecutivo de la Comisión de esta circunstancia en el plazo máximo de siete días después de identificar al tercer país', 'Plazo de siete días.'),
q('l10', 'art. 32 ter.1', '*', 'Sistemas comunes de información', 'Los sujetos obligados corresponsables deberán comunicar a la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias la intención de constituir sistemas comunes de información para el cumplimiento de las obligaciones de diligencia debida al menos:',
  ['Sesenta días antes de su puesta en funcionamiento.', 'Treinta días antes de su puesta en funcionamiento.', 'Sesenta días después de su puesta en funcionamiento.', 'Seis meses antes de su puesta en funcionamiento.'],
  'sesenta días antes de su puesta en funcionamiento', 'La comunicación es previa: sesenta días antes.'),
q('l10', 'art. 39', '*', 'Fundaciones y asociaciones', 'Velarán para que las fundaciones no sean utilizadas para el blanqueo de capitales o para canalizar fondos o recursos a personas o entidades vinculadas a grupos u organizaciones terroristas:',
  ['El Protectorado y el Patronato, así como el personal con responsabilidades en la gestión de las fundaciones.', 'El Servicio Ejecutivo de la Comisión y la Comisión de Vigilancia de Actividades de Financiación del Terrorismo.', 'El Ministerio de Justicia, a través del Registro de Fundaciones, y el Ministerio del Interior.', 'El Patronato y los fundadores, bajo la supervisión de la Secretaría de la Comisión de Prevención.'],
  'El Protectorado y el Patronato, en ejercicio de las funciones que les atribuye la Ley 50/2002', 'Protectorado, Patronato y personal gestor de la fundación.'),
q('l10', 'art. 44.3', '*', 'Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias', 'La Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias estará presidida por:',
  ['El Secretario de Estado de Economía.', 'El Ministro de Asuntos Económicos.', 'El Gobernador del Banco de España.', 'El Secretario de Estado de Seguridad.'],
  'estará presidida por el Secretario de Estado de Economía', 'La preside el Secretario de Estado de Economía.'),
q('l10', 'art. 46.1', '*', 'Informes de inteligencia financiera', 'Los informes de inteligencia financiera del Servicio Ejecutivo de la Comisión:',
  ['No tendrán valor probatorio y no podrán ser incorporados directamente a las diligencias judiciales o administrativas.', 'Tendrán valor probatorio y podrán incorporarse directamente a las diligencias judiciales o administrativas.', 'Tendrán valor probatorio solo cuando sean ratificados por el funcionario que los haya elaborado.', 'Podrán incorporarse directamente a las diligencias judiciales, pero carecerán de valor probatorio en vía administrativa.'],
  'Los informes de inteligencia financiera no tendrán valor probatorio y no podrán ser incorporados directamente a las diligencias judiciales o administrativas', 'Sin valor probatorio ni incorporación directa (a diferencia del acta de intervención de medios de pago).'),
q('l10', 'art. 48 bis', '*', 'Suspensión de transacciones', 'La suspensión de una transacción a requerimiento de una Unidad de Inteligencia Financiera se acordará bajo la responsabilidad de la Unidad requirente y será efectiva por un periodo máximo de:',
  ['Un mes.', 'Quince días.', 'Tres meses.', 'Diez días hábiles.'],
  'será efectiva por un periodo máximo de un mes', 'Máximo un mes.'),
q('pal', 'art. 29.1', 'EX', 'Capacitación y asistencia técnica', 'Cada Estado Parte, en la medida necesaria, formulará, desarrollará o perfeccionará programas de capacitación específicamente concebidos para el personal de sus servicios encargados de hacer cumplir la ley. Esos programas:',
  ['Podrán incluir adscripciones e intercambios de personal.', 'Deberán ser aprobados por la Conferencia de las Partes.', 'Se financiarán con cargo a la cuenta de las Naciones Unidas.', 'Excluirán a fiscales y jueces de instrucción.'],
  'Esos programas podrán incluir adscripciones e intercambios de personal', 'Incluyen a fiscales, jueces de instrucción y personal de aduanas, y pueden prever adscripciones e intercambios.'),
q('pal', 'art. 32.2', 'EX', 'Conferencia de las Partes en la Convención', 'El Secretario General de las Naciones Unidas convocará la Conferencia de las Partes:',
  ['A más tardar un año después de la entrada en vigor de la Convención.', 'A más tardar seis meses después de la entrada en vigor de la Convención.', 'Una vez depositado el cuadragésimo instrumento de ratificación.', 'A más tardar dos años después de la firma de la Convención.'],
  'convocará la Conferencia de las Partes a más tardar un año después de la entrada en vigor de la presente Convención', 'Un año desde la entrada en vigor.'),
q('pal', 'art. 16.14', '*', 'Extradición', 'Nada de lo dispuesto en la Convención podrá interpretarse como la imposición de una obligación de extraditar si el Estado Parte requerido tiene motivos justificados para presumir que la solicitud se ha presentado con el fin de perseguir o castigar a una persona por razón de (señale la respuesta MÁS completa):',
  ['Su sexo, raza, religión, nacionalidad, origen étnico u opiniones políticas.', 'Su raza, religión u opiniones políticas, exclusivamente.', 'Su nacionalidad u origen étnico, exclusivamente.', 'Su sexo, raza o religión, exclusivamente.'],
  'con el fin de perseguir o castigar a una persona por razón de su sexo, raza, religión, nacionalidad, origen étnico u opiniones políticas', 'Seis motivos: sexo, raza, religión, nacionalidad, origen étnico y opiniones políticas.'),
q('pal', 'art. 36.1', '*', 'Firma, ratificación, aceptación, aprobación y adhesión', 'La Convención estuvo abierta a la firma de todos los Estados del 12 al 15 de diciembre de 2000 en Palermo (Italia) y después de esa fecha en la Sede de las Naciones Unidas en Nueva York:',
  ['Hasta el 12 de diciembre de 2002.', 'Hasta el 15 de noviembre de 2001.', 'Hasta el 31 de diciembre de 2002.', 'Hasta el 12 de diciembre de 2001.'],
  'Sede de las Naciones Unidas en Nueva York hasta el 12 de diciembre de 2002', 'Palermo, 12-15/12/2000; Nueva York, hasta el 12/12/2002.'),
q('arm', 'art. 14', '*', 'Capacitación y asistencia técnica', 'Los Estados Parte cooperarán entre sí y con las organizaciones internacionales pertinentes, según proceda, a fin de que los Estados Parte que lo soliciten reciban:',
  ['La formación y asistencia técnica requeridas para reforzar su capacidad de prevenir, combatir y erradicar la fabricación y el tráfico ilícitos de armas de fuego.', 'La financiación necesaria para destruir las armas de fuego decomisadas y desactivar las que permanezcan bajo custodia estatal.', 'El apoyo material y logístico para establecer los registros nacionales de armas de fuego y de corredores autorizados.', 'Los equipos de marcación y localización necesarios para identificar las armas de fuego importadas en su territorio.'],
  'a fin de que los Estados Parte que lo soliciten reciban la formación y asistencia técnica requeridas para reforzar su capacidad de prevenir, combatir y erradicar la fabricación y el tráfico ilícitos de armas de fuego', 'Formación y asistencia técnica, a petición del Estado.'),
];
const nrm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const uso = [0, 0, 0, 0];
const out = Q.map((x, i) => {
  const ops = x.o.slice(), ok = ops.shift(); const c = [0, 1, 2, 3].sort((a, b) => uso[a] - uso[b] || ((a + i) % 4) - ((b + i) % 4))[0]; ops.splice(c, 0, ok); uso[c]++;
  const marca = x.m === 'EX' ? 'marca «EX» del temario' : 'asterisco del temario: pregunta de la academia';
  const cita = x.cita.replace(/- (?=[a-zñ])/g, '');
  const expl = `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${esc(ok.replace(/\.$/, ''))}</mark></span>Según el <span class="ref-norma">${esc(x.a + ' ' + NOM[x.k][2])}</span>: <span class="ref-concepto">"${esc(cita)}"</span>. ${esc(x.p)} <em style="color:var(--texto-gris)">(Pregunta generada por IA · Dificultad: Media · ${marca})</em>`;
  return { id: '2-ia-' + (347 + i), pregunta: `${NOM[x.k][0]}. ${x.r}. ${x.e}`, opciones: ops, correcta: c, dificultad: 'media', explicacion: expl, apartado: NOM[x.k][1] };
});
const TXT = nrm(fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema2', 'temario.txt'), 'utf8'));
const malas = Q.filter(x => !TXT.includes(nrm(x.cita))).map(x => x.a);
const dup = out.filter(x => new Set(x.opciones.map(nrm)).size < 4).map(x => x.id);
const larga = out.filter(x => { const l = x.opciones.map(o => o.length); return l[x.correcta] === Math.max(...l); }).map(x => x.id);
console.log(out.length, 'IA · letras', JSON.stringify(uso), malas.length ? '✗ citas no literales: ' + malas.join(', ') : '✓ citas literales', dup.length ? '✗ opciones repetidas ' + dup : '', `· correcta la más larga en ${larga.length}/${out.length} (${larga.join(' ')})`);
if (process.argv[2] === '--json') { fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1)); process.exit(0); }
if (malas.length || dup.length) process.exit(1);
let s = fs.readFileSync(FILE, 'utf8');
if (s.includes('{"id":"2-ia-347"')) { console.log('ya insertadas'); process.exit(0); }
const k = '{"id":"2-ia-346"'; const i = s.indexOf(k); if (i < 0) throw new Error('no está 2-ia-346');
let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const ch = s[j]; if (inS) { if (e) e = false; else if (ch === BS) e = true; else if (ch === '"') inS = false; continue; } if (ch === '"') inS = true; else if (ch === '{') d++; else if (ch === '}') { d--; if (d === 0) break; } }
s = s.slice(0, j + 1) + ',\n' + out.map(x => JSON.stringify(x)).join(',\n') + s.slice(j + 1);
fs.writeFileSync(FILE, s); console.log('insertadas', out.length, 'IA nuevas (2-ia-347…2-ia-' + (346 + out.length) + ')');
