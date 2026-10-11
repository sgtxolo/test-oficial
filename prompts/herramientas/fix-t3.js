// Tema 3 · revisión de las preguntas OFICIALES contra el temario oficial (11-12/10/2026).
// Uso: node prompts/herramientas/fix-t3.js <citas.json>   (citas.json sale de citas-t3.js; modifica test-oficial-conocimiento.html)
//  1) corrige respuestas erróneas / opciones ambiguas, limpia restos de notas al pie («Unió6n», «Tratado1s»…)
//  2) pone en TODAS las oficiales la corrección con formato: respuesta · artículo en morado · cita literal en rojo · explicación
const fs = require('fs');
const FILE = 'test-oficial-conocimiento.html', BS = String.fromCharCode(92), L = 'ABCD';
const citas = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const TXT = fs.readFileSync('prompts/temario-limpio/tema3/oficial-paginas.txt', 'utf8');
const nrm = s => s.replace(/=====PAG \d+=====/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-\s*\n\s*/g, '').replace(/[^a-z0-9ñ]/g, '');
const OF = nrm(TXT.replace(/\r\n?/g, '\n'));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// citas revisadas a mano (sustituyen a las automáticas): id → [norma, 'art. X', cita literal del oficial]
const T = 'TUE', F = 'TFUE';
const A257 = [F, 'art. 257', 'El Parlamento Europeo y el Consejo, con arreglo al procedimiento legislativo ordinario, podrán crear tribunales especializados adjuntos al Tribunal General, encargados de conocer en primera instancia de determinadas categorías de recursos interpuestos en materias específicas'];
const A257b = [F, 'art. 257', 'Los miembros de los tribunales especializados serán elegidos entre personas que ofrezcan absolutas garantías de independencia y que posean la capacidad necesaria para el ejercicio de funciones jurisdiccionales. Serán designados por el Consejo por unanimidad'];
const A421 = [T, 'art. 42.3', 'Los Estados miembros pondrán a disposición de la Unión, a efectos de la aplicación de la política común de seguridad y defensa, capacidades civiles y militares para contribuir a los objetivos definidos por el Consejo'];
const A71 = [T, 'art. 7.1', 'A propuesta motivada de un tercio de los Estados miembros, del Parlamento Europeo o de la Comisión, el Consejo, por mayoría de cuatro quintos de sus miembros y previa aprobación del Parlamento Europeo, podrá constatar la existencia de un riesgo claro de violación grave por parte de un Estado miembro de los valores contemplados en el artículo 2'];
const A177 = [T, 'art. 17.7', 'el Consejo Europeo propondrá al Parlamento Europeo, por mayoría cualificada, un candidato al cargo de Presidente de la Comisión. El Parlamento Europeo elegirá al candidato por mayoría de los miembros que lo componen'];
const A2811 = [F, 'art. 228.1', 'El Defensor del Pueblo presentará cada año al Parlamento Europeo un informe sobre el resultado de sus investigaciones'];
const A234 = [F, 'art. 234', 'sólo podrá pronunciarse sobre dicha moción transcurridos tres días como mínimo desde la fecha de su presentación y en votación pública'];
const A861 = [F, 'art. 86.1', 'el Consejo podrá crear, mediante reglamentos adoptados con arreglo a un procedimiento legislativo especial, una Fiscalía Europea a partir de Eurojust'];
const A255 = [F, 'art. 255', 'El comité estará compuesto por siete personalidades elegidas de entre antiguos miembros del Tribunal de Justicia y del Tribunal General, miembros de los órganos jurisdiccionales nacionales superiores y juristas de reconocida competencia, uno de los cuales será propuesto por el Parlamento Europeo'];
const A38 = [T, 'art. 38', 'un Comité Político y de Seguridad seguirá la situación internacional en los ámbitos concernientes a la política exterior y de seguridad común y contribuirá a definir la política mediante la emisión de dictámenes dirigidos al Consejo'];
const A422 = [T, 'art. 42.2', 'La política común de seguridad y defensa incluirá la definición progresiva de una política común de defensa de la Unión. Ésta conducirá a una defensa común una vez que el Consejo Europeo lo haya decidido por unanimidad'];
const A2 = [T, 'art. 2', 'La Unión se fundamenta en los valores de respeto de la dignidad humana, libertad, democracia, igualdad, Estado de Derecho y respeto de los derechos humanos, incluidos los derechos de las personas pertenecientes a minorías'];
const A229 = [F, 'art. 229', 'la mayoría de los miembros que lo componen, del Consejo o de la Comisión'];
const MAN = {
  '3-3': [T, 'art. 13.4', 'El PARLAMENTO EUROPEO, el CONSEJO y la COMISIÓN estarán asistidos por un Comité Económico y Social y por un Comité de las Regiones que ejercerán funciones consultivas'],
  '3-8': A421, '3-85': A421,
  '3-23': [F, 'art. 228.1', 'El Parlamento Europeo elegirá a un Defensor del Pueblo Europeo, que estará facultado para recibir las reclamaciones de cualquier ciudadano de la Unión o de cualquier persona física o jurídica que resida o tenga su domicilio social en un Estado miembro, relativas a casos de mala administración en la acción de las instituciones, órganos u organismos de la Unión, con exclusión del Tribunal de Justicia de la Unión Europea en el ejercicio de sus funciones jurisdiccionales'],
  '3-25': [T, 'art. 38', 'En el marco del presente capítulo, el Comité Político y de Seguridad ejercerá, bajo la responsabilidad del Consejo y del Alto Representante, el control político y la dirección estratégica de las operaciones de gestión de crisis'],
  '3-29': [T, 'art. 3.3', 'La Unión COMBATIRÁ la exclusión social y la discriminación y fomentará la justicia y la protección sociales, la igualdad entre mujeres y hombres, la solidaridad entre las generaciones y la protección de los derechos del niño'],
  '3-32': [T, 'art. 17.7', 'el Consejo Europeo propondrá al Parlamento Europeo, por mayoría cualificada, un candidato al cargo de Presidente de la Comisión'],
  '3-44': [F, 'art. 234', 'Si la moción de censura es aprobada por mayoría de dos tercios de los votos emitidos que representen, a su vez, la mayoría de los diputados que componen el Parlamento Europeo, los miembros de la Comisión deberán dimitir colectivamente de sus cargos'],
  '3-46': [F, 'art. 302.1', 'Los miembros del Comité serán nombrados para un período de cinco años. El Consejo adoptará la lista de miembros establecida de conformidad con las propuestas presentadas por cada Estado miembro. El mandato de los miembros del Comité será renovable'],
  '3-51': A257, '3-204': A257, '3-151': A257b, '3-269': A257b,
  '3-56': [F, 'art. 253', 'El Tribunal de Justicia establecerá su Reglamento de Procedimiento. Dicho reglamento requerirá la aprobación del Consejo'],
  '3-67': A71, '3-169': A71, '3-307': A71,
  '3-68': A177, '3-308': A177,
  '3-71': A2811, '3-310': A2811, '3-290': A2811,
  '3-72': A234, '3-311': A234,
  '3-74': A861, '3-313': A861, '3-157': [F, 'art. 86.1', 'una Fiscalía Europea a partir de Eurojust. El Consejo se pronunciará por unanimidad, previa aprobación del Parlamento Europeo'],
  '3-91': [T, 'art. 24.1', 'La competencia de la Unión en materia de política exterior y de seguridad común abarcará todos los ámbitos de la política exterior y todas las cuestiones relativas a la seguridad de la Unión, incluida la definición progresiva de una política común de defensa que podrá conducir a una defensa común'],
  '3-101': [F, 'art. 263', 'El Tribunal de Justicia de la Unión Europea controlará la legalidad de los actos legislativos, de los actos del Consejo, de la Comisión y del Banco Central Europeo que no sean recomendaciones o dictámenes, y de los actos del Parlamento Europeo y del Consejo Europeo destinados a producir efectos jurídicos frente a terceros. Controlará también la legalidad de los actos de los órganos u organismos de la Unión destinados a producir efectos jurídicos frente a terceros'],
  '3-105': A255, '3-218': A255, '3-330': A255,
  '3-109': [F, 'art. 251', 'El Tribunal de Justicia actuará en Salas o en Gran Sala, de conformidad con las normas establecidas al respecto en el Estatuto del Tribunal de Justicia de la Unión Europea. Cuando el Estatuto así lo disponga, el Tribunal de Justicia también podrá actuar en Pleno'],
  '3-115': [T, 'art. 9', 'Será ciudadano de la Unión toda persona que tenga la nacionalidad de un Estado miembro. La ciudadanía de la Unión se añade a la ciudadanía nacional sin sustituirla'],
  '3-155': [T, 'art. 13.1', 'Las instituciones de la Unión son: El PARLAMENTO EUROPEO, El CONSEJO EUROPEO, El CONSEJO, La COMISIÓN EUROPEA (denominada en lo sucesivo “Comisión”), El TRIBUNAL DE JUSTICIA DE LA UNIÓN EUROPEA, El BANCO CENTRAL EUROPEO, El TRIBUNAL DE CUENTAS'],
  '3-163': [F, 'art. 49', 'La libertad de establecimiento comprenderá el acceso a las actividades no asalariadas y su ejercicio, así como la constitución y gestión de empresas y, especialmente, de sociedades'],
  '3-177': [T, 'art. 45.1', 'La Agencia Europea de Defensa a que se refiere el apartado 3 del artículo 42 estará bajo la autoridad del Consejo y tendrá como misión'],
  '3-188': [T, 'art. 21.1', 'La acción de la Unión en la escena internacional se basará en los principios que han inspirado su creación, desarrollo y ampliación y que pretende fomentar en el resto del mundo: la democracia, el Estado de Derecho, la universalidad e indivisibilidad de los derechos humanos y de las libertades fundamentales, el respeto de la dignidad humana, los principios de igualdad y solidaridad y el respeto de los principios de la Carta de las Naciones Unidas y del Derecho internacional'],
  '3-189': A38, '3-332': A38,
  '3-212': A422, '3-327': A422,
  '3-213': A2, '3-328': A2, '3-228': A2,
  '3-238': [T, 'art. 3.3', 'La Unión FOMENTARÁ la cohesión económica, social y territorial y la solidaridad entre los Estados miembros'],
  '3-267': [F, 'art. 246', 'Aparte de los casos de renovación periódica y fallecimiento, el mandato de los miembros de la Comisión concluirá individualmente por dimisión voluntaria o cese'],
  '3-279': [T, 'art. 36', 'Dos veces al año procederá a un debate sobre los progresos realizados en el desarrollo de la política exterior y de seguridad común, incluida la política común de seguridad y defensa'],
  '3-283': [T, 'art. 32', 'Antes de emprender cualquier actuación en la escena internacional o de asumir cualquier compromiso que pueda afectar a los intereses de la Unión, cada Estado miembro consultará a los demás en el seno del Consejo Europeo o del Consejo'],
  '3-134': A229, '3-156': A229, '3-285': A229,
  '3-294': [T, 'art. 42.3', 'La Agencia en el ámbito del desarrollo de las capacidades de defensa, la investigación, la adquisición y el armamento (en lo sucesivo denominada “Agencia Europea de Defensa”) determinará las necesidades operativas, fomentará medidas para satisfacerlas'],
};
// correcciones de contenido (respuesta mal marcada, opción ambigua, erratas) y nuevo cuerpo de la explicación
const FIX = {
  '3-155': { correcta: 2, cuerpo: 'Solo el Banco Central Europeo es institución de la Unión; el Comité Económico y Social y el Comité de las Regiones son órganos consultivos que asisten al Parlamento Europeo, al Consejo y a la Comisión (art. 13.4). Por tanto «Todas son correctas» es falsa.' },
  '3-298': { correcta: 1, cuerpo: 'Los «delitos contra la vida de las personas» no figuran entre los ámbitos delictivos del art. 83.1; la trata de seres humanos y la explotación sexual de mujeres y niños sí. La INCORRECTA es, por tanto, la B.' },
  '3-163': { op: [3, 'Tanto las asalariadas como las no asalariadas.'], cuerpo: 'Las opciones A y C se refieren a actividades asalariadas (por cuenta ajena), que no son objeto de la libertad de establecimiento, y D mezcla ambas.' },
  '3-115': { txt: [/Seré ciudadano/, 'Será ciudadano'] },
  '3-290': { op: [0, 'Cada año al Parlamento Europeo.'] },
  '3-67': { txt: [/artículo 2\.3/, 'artículo 2.'] },
};
MAN['3-50'] = [T, 'art. 3.2', 'La Unión OFRECERÁ a sus ciudadanos un espacio de libertad, seguridad y justicia sin fronteras interiores, en el que esté garantizada la libre circulación de personas conjuntamente con medidas'];
MAN['3-69'] = [F, 'art. 300.2', 'El Comité Económico y Social estará compuesto por representantes de las organizaciones de empresarios, de trabajadores y de otros sectores representativos de la sociedad civil, en particular en los ámbitos socioeconómico, cívico, profesional y cultural'];
MAN['3-96'] = [T, 'art. 3.1', 'La Unión tiene como FINALIDAD promover la paz, sus valores y el bienestar de sus pueblos'];
MAN['3-207'] = MAN['3-322'] = [T, 'art. 7.3', 'el Consejo podrá decidir, por mayoría cualificada, que se suspendan determinados derechos derivados de la aplicación de los Tratados al Estado miembro de que se trate'];
MAN['3-233'] = [T, 'art. 15.4', 'El Consejo Europeo se pronunciará por consenso, excepto cuando los Tratados dispongan otra cosa'];
MAN['3-236'] = MAN['3-3'];
MAN['3-281'] = [T, 'art. 18.3', 'El Alto Representante presidirá el Consejo de Asuntos Exteriores'];
MAN['3-284'] = [T, 'art. 42.4', 'El Consejo adoptará por unanimidad, a propuesta del Alto Representante de la Unión para Asuntos Exteriores y Política de Seguridad o a iniciativa de un Estado miembro'];
MAN['3-298'] = [F, 'art. 83.1', 'el terrorismo, la trata de seres humanos y la explotación sexual de mujeres y niños, el tráfico ilícito de drogas, el tráfico ilícito de armas, el blanqueo de capitales, la corrupción, la falsificación de medios de pago, la delincuencia informática y la delincuencia organizada'];
const BORRAR = ['3-60'];
// ids que ya tenían cita en rojo antes de esta revisión (explicaciones originales en el 2.º argumento: json de extraer-preguntas.js previo)
const OLDX = {}; const YA = new Set();
if (process.argv[3]) for (const x of JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))) if (!/-ia-/.test(x.id) && /class="ref-concepto"/.test(x.explicacion) && !(FIX[x.id] && (FIX[x.id].correcta !== undefined || FIX[x.id].op || FIX[x.id].cuerpo))) { OLDX[x.id] = x.explicacion; YA.add(x.id); }
// limpieza de números de nota al pie pegados a las palabras
const limpia = t => t.replace(/([A-Za-zÁÉÍÓÚáéíóúñÑ])\d(?=[A-Za-zÁÉÍÓÚáéíóúñÑ])/g, '$1').replace(/([A-Za-zÁÉÍÓÚáéíóúñÑ])\d(?=[ ,:;?])/g, '$1').replace(/([.?])\d$/g, '$1').replace(/(^|[\s(¿])\d(?=[A-Za-záéíóúñ]{3,})/g, '$1').replace(/Seré /, 'Será ');
let s = fs.readFileSync(FILE, 'utf8');
const rango = id => { const k = '{"id":"' + id + '"'; const i = s.indexOf(k); if (i < 0) return null; let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } } return [i, j + 1]; };
let n = 0, sinCita = [], limp = 0;
for (const id of Object.keys(citas)) {
  if (BORRAR.includes(id)) continue;
  const r = rango(id); if (!r) { console.log('NO ENCONTRADA', id); continue; }
  const q = JSON.parse(s.slice(r[0], r[1]));
  const f = FIX[id] || {};
  const antes = JSON.stringify([q.pregunta, q.opciones]);
  q.pregunta = limpia(q.pregunta); q.opciones = q.opciones.map(limpia);
  if (JSON.stringify([q.pregunta, q.opciones]) !== antes) limp++;
  if (f.correcta !== undefined) q.correcta = f.correcta;
  if (f.op) q.opciones[f.op[0]] = f.op[1];
  if (f.txt) { q.pregunta = q.pregunta.replace(f.txt[0], f.txt[1]); q.opciones = q.opciones.map(o => o.replace(f.txt[0], f.txt[1])); }
  // las que ya traían cita en rojo (hechas a mano en revisiones anteriores) se conservan tal cual
  if (YA.has(id)) { const o = OLDX[id]; q.explicacion = limpia(o); s = s.slice(0, r[0]) + JSON.stringify(q) + s.slice(r[1]); n++; continue; }
  // cita
  const c = MAN[id] ? { norma: MAN[id][0], label: MAN[id][1], cita: MAN[id][2] } : citas[id].score >= 0.5 ? { norma: citas[id].norma, label: 'art. ' + citas[id].art + (citas[id].apt ? '.' + citas[id].apt : ''), cita: citas[id].cita } : null;
  const resp = `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${esc(q.opciones[q.correcta].replace(/\.$/, ''))}</mark></span>`;
  // cuerpo propio: el antiguo sin su cabecera ni la frase «La opción correcta es la X.»
  const previo = /class="ref-concepto"/.test(q.explicacion) ? q.explicacion.replace(/^[\s\S]*?<span class="ref-concepto">[\s\S]*?<\/span>\.\s*/, '') : null;
  let cuerpo = f.cuerpo || previo !== null ? (f.cuerpo || previo) : q.explicacion.replace(/^<span class="ex-resp">[\s\S]*?<\/span>/, '').replace(/^\s*La opción correcta es la [A-D]\.\s*/, '').trim();
  cuerpo = limpia(cuerpo);
  if (c && /^[^<]*$/.test(c.cita)) {
    const cita = c.cita.replace(/^[•a-z]\)\s+/, '').replace(/\s+/g, ' ').trim().replace(/[.;:]$/, '');
    if (!OF.includes(nrm(cita))) { sinCita.push(id + ' (cita no literal)'); q.explicacion = resp + (cuerpo ? ' ' + cuerpo : q.explicacion); }
    else q.explicacion = `${resp}El <span class="ref-norma">${c.label} del ${c.norma}</span> dispone: <span class="ref-concepto">"${esc(cita)}"</span>.${cuerpo ? ' ' + esc2(cuerpo) : ''}`;
  } else { sinCita.push(id); q.explicacion = resp + (cuerpo ? ' ' + cuerpo : ''); }
  s = s.slice(0, r[0]) + JSON.stringify(q) + s.slice(r[1]); n++;
}
function esc2(t) { return t; }
fs.writeFileSync(FILE, s);
console.log('oficiales reescritas', n, '· con texto limpiado', limp, '· sin cita:', sinCita.length ? sinCita.join(', ') : 'ninguna');
