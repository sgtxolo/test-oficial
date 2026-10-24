// Tema 8 · correcciones de las preguntas OFICIALES verificadas contra el temario oficial (LOPJ 6/1985, texto 2026 con Tribunales de Instancia)
// Auditoría 24/10/2026: opciones con texto alterado, respuestas «incorrecta» invertidas (8-174, 8-184), preguntas con la versión antigua (Juzgados de Violencia
// sobre la Mujer → Secciones), explicaciones con artículos inventados («61 quater», «87 ter», «547.2»…) → cita literal del propio texto.
// Uso: node prompts/herramientas/tema8/fix-t8.js            (aplica sobre test-oficial-conocimiento.html; idempotente)
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const clean = f => fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema8', f), 'utf8').replace(/=====PAG \d+=====/g, ' ').replace(/-\s*\n\s*/g, '').replace(/\s+/g, ' ');
const LO = clean('lopj.txt');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const LON = nz(LO);
const lab = cita => {
  const i = LO.indexOf(cita);
  if (i >= 0) { const m = [...LO.slice(0, i).matchAll(/Artículo (\d+(?: (?:bis|ter|quáter|quinquies|sexies|septies))?)\./g)].pop(); return m ? `art. ${m[1]} de la LOPJ` : 'LOPJ'; }
  const k = nz(cita); const j = LON.indexOf(k); if (j < 0) return null;   // cita con otra puntuación: se busca la etiqueta por las 8 primeras palabras
  const ini = cita.split(' ').slice(0, 8).join(' '); const p = LO.indexOf(ini);
  if (p >= 0) { const m = [...LO.slice(0, p).matchAll(/Artículo (\d+(?: (?:bis|ter|quáter|quinquies|sexies|septies))?)\./g)].pop(); return m ? `art. ${m[1]} de la LOPJ` : 'LOPJ'; }
  return 'LOPJ';
};
const BS = String.fromCharCode(92), L = 'ABCD';
const ex = (q, art, cita, extra) => {
  const em = (q.explicacion.match(/<em style[^>]*>.*?<\/em>\s*$/) || [''])[0];
  return `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>${extra ? extra + ' ' : ''}Según el <span class="ref-norma">${art}</span>: <span class="ref-concepto">"${cita}"</span> (verificado con el texto del temario oficial).${em ? ' ' + em : ''}`;
};
const O = (q, k, t) => { q.opciones[k] = t; };
const SALAS = 'El Tribunal Supremo estará integrado por las siguientes Salas: Primera: De lo Civil. Segunda: De lo Penal. Tercera: De lo Contencioso-Administrativo. Cuarta: De lo Social. Quinta: De lo Militar';
const A22 = 'b) Constitución, validez, nulidad o disolución de sociedades o personas jurídicas que tengan su domicilio en territorio español, así como respecto de los acuerdos y decisiones de sus órganos. c) Validez o nulidad de las inscripciones practicadas en un registro español. d) Inscripciones o validez de patentes, marcas, diseños o dibujos y modelos y otros derechos sometidos a depósito o registro, cuando se hubiera solicitado o efectuado en España el depósito o el registro. e) Reconocimiento y ejecución en territorio español de sentencias y demás resoluciones judiciales, decisiones arbitrales y acuerdos de mediación dictados en el extranjero';
const A89_6 = 'Las Secciones de Violencia sobre la Mujer podrán conocer en el orden civil, en todo caso de conformidad con los procedimientos y recursos previstos en la Ley 1/2000, de 7 de enero, de Enjuiciamiento Civil, de los siguientes asuntos: a) Los relativos al matrimonio y a su régimen económico matrimonial y los que tengan por objeto la adopción o modificación de medidas de trascendencia familiar y otras acciones derivadas de la crisis matrimonial o de la unión de hecho. b) Los que versen exclusivamente sobre guarda y custodia de hijos e hijas menores o sobre alimentos reclamados por un progenitor contra el otro en nombre de los hijos e hijas menores. c) Los relativos a modificación de medidas adoptadas en los procesos que versen sobre las materias previstas en las letras anteriores. d) Los que versen sobre maternidad, paternidad, filiación y adopción';
// cada entrada: [id, fn(q) → [cita, nota opcional]] (la etiqueta del apartado se calcula sola)
const F = [
  ['8-6', q => ['De la emisión y la ejecución de los instrumentos de reconocimiento mutuo de resoluciones penales en la Unión Europea que les atribuya la ley']],
  ['8-9', q => ['3.º el delito se haya cometido por cuenta de una persona jurídica con domicilio en España; 4.º la víctima tuviera nacionalidad española en el momento de comisión de los hechos; 5.º el delito haya sido cometido para influir o condicionar de un modo ilícito la actuación de cualquier Autoridad española']],
  ['8-11', q => [A22.slice(A22.indexOf('c) Validez'))]],
  ['8-12', q => ['El Estado se organiza territorialmente, a efectos judiciales, en Municipios, Partidos, Provincias y Comunidades Autónomas']],
  ['8-13', q => ['El Tribunal Superior de Justicia estará integrado por las siguientes Salas: de lo Civil y Penal, de lo Contencioso-Administrativo y de lo Social']],
  ['8-14', q => { O(q, 0, 'De la instrucción de las causas por delito cuyo enjuiciamiento corresponda a las Audiencias Provinciales y a las Secciones de lo Penal de los Tribunales de Instancia, excepto de la instrucción de aquellas causas que sean competencia de las Secciones de Violencia sobre la Mujer o de la Sección de Violencia contra la Infancia y la Adolescencia.'); O(q, 2, 'De los procedimientos de habeas corpus.');
    return ['d) De los procedimientos de habeas corpus']; }],
  ['8-22', q => { O(q, 1, 'De la instrucción por delitos de lesiones y lesiones al feto.');
    return ['a) De la instrucción de los procesos para exigir responsabilidad penal por los delitos recogidos en los Títulos del Código Penal relativos a homicidio, aborto, lesiones, lesiones al feto, delitos contra la libertad, delitos contra la integridad moral, contra la libertad e indemnidad sexual, contra la intimidad y el derecho a la propia imagen, contra el honor o cualquier otro delito cometido con violencia o intimidación']; }],
  ['8-23', q => ['El Estado se organiza territorialmente, a efectos judiciales, en Municipios, Partidos, Provincias y Comunidades Autónomas', 'La Comarca no figura entre ellos.']],
  ['8-42', q => ['La Sala de Apelación de la Audiencia Nacional conocerá de los recursos de esta clase que establezca la ley contra las resoluciones de la Sala de lo Penal', 'Es la Sala de Apelación, que no está entre las tres opciones.']],
  ['8-48', q => { O(q, 0, 'Constitución, validez, nulidad o disolución de sociedades o personas jurídicas que tengan su domicilio en territorio español, así como respecto de los acuerdos y decisiones de sus órganos.'); O(q, 2, 'Inscripciones o validez de patentes, marcas, diseños o dibujos y modelos y otros derechos sometidos a depósito o registro, cuando se hubiera solicitado o efectuado en España el depósito o el registro.');
    return [A22.slice(0, A22.indexOf(' e) Reconocimiento'))]; }],
  ['8-60', q => ['3.º De la instrucción y enjuiciamiento de las causas contra Magistrados de la Audiencia Nacional, de un Tribunal Superior de Justicia o de los Fiscales europeos delegados', 'Las causas contra Magistrados de una Audiencia Provincial no son de la Sala de lo Penal del Tribunal Supremo.']],
  ['8-61', q => [SALAS, 'La Sala Cuarta es la de lo Social; la de lo Militar es la Quinta.']],
  ['8-62', q => [SALAS]],
  ['8-64', q => ['En cada municipio donde no exista Tribunal de Instancia, y con jurisdicción en el término correspondiente, habrá un juez o una jueza de paz']],
  ['8-67', q => { O(q, 3, 'Todas son incorrectas.'); return ['Los Jueces de Paz y sus sustitutos serán elegidos por el Pleno del Ayuntamiento, con el voto favorable de la mayoría absoluta de sus miembros']; }],
  ['8-70', q => { O(q, 0, 'Los que versen sobre maternidad, paternidad, filiación y adopción.'); O(q, 2, 'Los relativos al matrimonio y a su régimen económico matrimonial.'); return ['b) De la instrucción de los procesos para exigir responsabilidad penal por cualquier delito contra las relaciones familiares, cuando la víctima sea alguna de las personas señaladas en la letra anterior', 'Es una competencia penal, no civil.']; }],
  ['8-72', q => { O(q, 0, 'Promover la acción de la Justicia en defensa de la legalidad, de los derechos de los ciudadanos y del interés público tutelado por la ley, de oficio o a petición de los interesados.'); O(q, 1, 'Velar por la independencia de los tribunales y procurar ante éstos la satisfacción del interés social.');
    return ['Sin perjuicio de las funciones encomendadas a otros órganos, el Ministerio Fiscal tiene por misión promover la acción de la Justicia en defensa de la legalidad, de los derechos de los ciudadanos y del interés público tutelado por la ley, de oficio o a petición de los interesados, así como velar por la independencia de los tribunales y procurar ante éstos la satisfacción del interés social', 'Investigar y ejercer la acción penal es de la Fiscalía Europea.']; }],
  ['8-75', q => { O(q, 2, 'Cuando la sensible y continuada diferencia en el volumen de trabajo lo aconseje, los magistrados de esta Sala, con el acuerdo favorable de la Sala de Gobierno, previa propuesta del Presidente del Tribunal, podrán ser adscritos por el Consejo General del Poder Judicial, total o parcialmente, y sin que ello signifique incremento retributivo alguno, a otra Sala de diferente orden.'); O(q, 3, 'Para la adscripción se valorarán la antigüedad en el escalafón y la especialidad o experiencia de los magistrados afectados y, a ser posible, sus preferencias.');
    return ['La Sala de Apelación de la Audiencia Nacional conocerá de los recursos de esta clase que establezca la ley contra las resoluciones de la Sala de lo Penal', 'La Audiencia Nacional no tiene Sala de lo Civil: la apelación es contra las resoluciones de la Sala de lo Penal.']; }],
  ['8-96', q => { O(q, 0, 'Las autoridades judiciales.'); return ['Se establecerán unidades de Policía Judicial que dependerán funcionalmente de las autoridades judiciales y del Ministerio Fiscal en el desempeño de todas las actuaciones que aquéllas les encomienden']; }],
  ['8-103', q => ['Las Audiencias Provinciales, que tendrán su sede en la capital de la provincia, de la que tomarán su nombre, extenderán su jurisdicción a toda ella']],
  ['8-108', q => ['En materia de derechos y obligaciones derivados de contrato de trabajo, cuando los servicios se hayan prestado en España o el contrato se haya celebrado en territorio español']],
  ['8-112', q => ['b) Por pérdida de la nacionalidad española. c) En virtud de sanción disciplinaria de separación de la Carrera Judicial. d) Por la condena a pena privativa de libertad por razón de delito doloso']],
  ['8-120', q => [SALAS, 'La Sala Cuarta es la de lo Social.']],
  ['8-134', q => ['La Audiencia Nacional se compondrá de su Presidente, los Presidentes de Sala y los magistrados que determine la ley para cada una de sus Salas y Secciones']],
  ['8-145', q => { q.pregunta = '(LOPJ) En relación a la competencia civil de las Secciones de Violencia sobre la Mujer, señale la afirmación INCORRECTA:';
    O(q, 0, 'Los que versen sobre maternidad, paternidad, filiación y adopción.'); O(q, 1, 'Los relativos a las relaciones paternofiliales.'); O(q, 2, 'Los relativos al matrimonio y a su régimen económico matrimonial.'); O(q, 3, 'La instrucción de los procesos por delitos de homicidio.'); q.correcta = 3;
    return [A89_6, 'La instrucción de delitos es competencia penal (art. 89.5), no civil.']; }],
  ['8-147', q => { O(q, 2, 'Su composición y plantilla las determina el Ministerio de Justicia, oída la Sala de Gobierno del Tribunal Supremo y previo informe del Consejo General del Poder Judicial.');
    return ['El Ministerio de Justicia, oída la Sala de Gobierno del Tribunal Supremo y previo informe del Consejo General del Poder Judicial e informe favorable del Ministerio de Hacienda y Administraciones Públicas, determinará la composición y plantilla del Gabinete Técnico']; }],
  ['8-148', q => ['La jubilación por edad de los Jueces y Magistrados es forzosa y se decretará con la antelación suficiente para que el cese en la función se produzca efectivamente al cumplir la edad de setenta años. No obstante, podrán solicitar con dos meses de antelación a dicho momento la prolongación de la permanencia en el servicio activo hasta que cumplan como máximo setenta y dos años de edad']],
  ['8-159', q => ['Primero. En única instancia, de los recursos contencioso-administrativos contra actos y disposiciones del Consejo de Ministros, de las Comisiones Delegadas del Gobierno y del Consejo General del Poder Judicial y contra los actos y disposiciones de los órganos competentes del Congreso de los Diputados y del Senado, del Tribunal Constitucional, del Tribunal de Cuentas y del Defensor del Pueblo']],
  ['8-174', q => { q.pregunta = q.pregunta.replace(/ Señale la INCORRECTA\.?$/i, ' Señale la correcta.'); return ['Para la defensa de estos últimos se reconocerá la legitimación de las corporaciones, asociaciones, organizaciones sindicales y grupos que resulten afectados o que estén legalmente habilitados para su defensa y promoción', 'La pregunta pedía la «incorrecta» pero la opción marcada es la literal: se corrige el enunciado.']; }],
  ['8-175', q => { O(q, 2, 'En cada municipio donde no exista Tribunal de Instancia, y con jurisdicción en el término correspondiente, habrá un juez o una jueza de paz.');
    return ['Los Jueces de Paz prestarán juramento ante el Juez de Primera Instancia e Instrucción y tomarán posesión ante quien se hallara ejerciendo la jurisdicción']; }],
  ['8-176', q => ['La función de la Policía Judicial comprende el auxilio a los juzgados y tribunales y al Ministerio Fiscal en la averiguación de los delitos y en el descubrimiento y aseguramiento de los delincuentes', 'La opción B invierte «delitos» y «delincuentes».']],
  ['8-178', q => { q.pregunta = q.pregunta.replace('Los Juzgados de Violencia sobre la Mujer', 'Las Secciones de Violencia sobre la Mujer').replace(/previstos en la Ley de Enjuiciamiento Civil/, 'previstos en la Ley 1/2000, de 7 de enero, de Enjuiciamiento Civil');
    O(q, 0, 'Los que tengan por objeto la adopción o modificación de medidas de trascendencia familiar.'); O(q, 1, 'Los que versen exclusivamente sobre guarda y custodia de hijos e hijas menores o sobre alimentos reclamados por un progenitor contra el otro en nombre de los hijos e hijas menores.'); O(q, 2, 'Los que versen sobre maternidad, paternidad, filiación y adopción.'); O(q, 3, 'La instrucción de los procesos para exigir responsabilidad penal por delitos de homicidio.');
    return [A89_6, 'La instrucción de delitos es competencia penal (art. 89.5), no civil.']; }],
  ['8-184', q => { q.correcta = 0; O(q, 0, 'Los Abogados, Procuradores y Graduados Sociales, una vez iniciado su ejercicio profesional, prestarán juramento o promesa de acatamiento a la Constitución y al resto del ordenamiento jurídico.');
    return ['Los Abogados, Procuradores y Graduados Sociales, antes de iniciar su ejercicio profesional, prestarán juramento o promesa de acatamiento a la Constitución y al resto del ordenamiento jurídico', 'Es «antes de iniciar», no «una vez iniciado».']; }],
  ['8-187', q => ['3.º Cuando se decretare en expediente disciplinario o de incapacidad, ya con carácter provisional, ya definitivo']],
  ['8-190', q => ['Los jueces y juezas, así como los Tribunales, de conformidad con el principio de tutela efectiva consagrado en el artículo 24 de la Constitución, deberán resolver siempre sobre las pretensiones que se les formulen, y solo podrán desestimarlas por motivos formales cuando el defecto fuese insubsanable o no se subsanare por el procedimiento establecido en las leyes', 'El principio es el de tutela efectiva, no el «de efectividad».']],
  ['8-195', q => ['Corresponde en exclusiva la denominación y función de abogado al licenciado en Derecho que ejerza profesionalmente la dirección y defensa de las partes en toda clase de procesos']],
  ['8-210', q => { q.pregunta = q.pregunta.replace('¿Quién resolverá las dudas que se planteen entre los órganos judiciales de un mismo orden jurisdiccional?', '¿Quién resolverá las cuestiones de competencia entre Juzgados y Tribunales de un mismo orden jurisdiccional?'); O(q, 2, 'El órgano inmediato superior común.');
    return ['Las cuestiones de competencia entre Juzgados y Tribunales de un mismo orden jurisdiccional se resolverán por el órgano inmediato superior común']; }],
  ['8-213', q => ['3. Como Sala de lo Penal, corresponde a esta Sala: a) El conocimiento de las causas penales que los Estatutos de Autonomía reservan al conocimiento de los Tribunales Superiores de Justicia. b) La instrucción y el fallo de las causas penales contra jueces, magistrados y miembros del Ministerio Fiscal por delitos o faltas cometidos en el ejercicio de su cargo en la comunidad autónoma, siempre que esta atribución no corresponda al Tribunal Supremo. c) El conocimiento de los recursos de apelación contra las resoluciones dictadas en primera instancia por las Audiencias Provinciales, así como el de todos aquellos previstos por las leyes. d) La decisión de las cuestiones de competencia entre órganos jurisdiccionales del orden penal con sede en la comunidad autónoma que no tengan otro superior común', 'Las cuestiones de cesión de jurisdicción por tratados no figuran entre ellas.']],
  ['8-215', q => ['Se designarán de oficio, con arreglo a lo que en las leyes se establezca, a quien lo solicite o se niegue a nombrarlos, siendo preceptiva su intervención. La defensa o representación de oficio tendrá carácter gratuito para quien acredite insuficiencia de recursos para litigar en los términos que establezca la ley']],
  ['8-222', q => { O(q, 0, 'Los del orden jurisdiccional social.'); return ['Los del orden jurisdiccional social conocerán de las pretensiones que se promuevan dentro de la rama social del derecho, tanto en conflictos individuales como colectivos, así como las reclamaciones en materia de Seguridad Social o contra el Estado cuando le atribuya responsabilidad la legislación laboral']; }],
  ['8-259', q => ['Los Tribunales a los que se atribuye el ejercicio de la potestad jurisdiccional son los siguientes: a) Jueces y juezas de paz. b) Tribunales de Instancia. c) Audiencias Provinciales. d) Tribunales Superiores de Justicia. e) Tribunal Central de Instancia. f) Audiencia Nacional. g) Tribunal Supremo']],
];
// ---------- aplicación ----------
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const malas = [];
for (const [id, fn] of F) {
  const key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1));
  const [cita, extra] = fn(q);
  if (!LON.includes(nz(cita))) { malas.push(id); continue; }
  const art = lab(cita) || 'LOPJ';
  q.explicacion = ex(q, art, cita, extra);
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
if (malas.length) console.log('✗ CITA NO LITERAL (no se aplica):', malas.join(', '));
fs.writeFileSync(FILE, s); console.log('corregidas', n, 'de', F.length);
