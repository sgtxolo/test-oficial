// Segundo lote de preguntas OFICIALES del Tema 1 (LO 18/2003): vídeo de pantalla del 26/11/2026 (8 tests de la academia).
// Textos y respuestas en oficiales-seras-t1b.json (resueltas con el temario). Quedan desde 1-499. Idempotente.
// Uso (desde la carpeta del proyecto): node prompts/herramientas/oficiales-seras-t1b.js
const fs = require('fs');
const BS = String.fromCharCode(92);
const NORMA = 'Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional';
const P = 'Ley Orgánica de Cooperación con la Corte Penal Internacional. ';
// clave de artículo → [localizador, literal del temario, párrafo del esquema, pieza del subrayado, apartado del Esquema clave]
const ART = {};
const def = (k, loc, par, pz, sec, lit) => { ART[k] = [loc, lit, par, pz, sec]; };
def('1', 'Art. 1', '36-0', 'l-1', 9, 'El objeto de esta ley orgánica es regular las relaciones de cooperación entre el Estado español y la Corte Penal Internacional en el ejercicio de la jurisdicción y funciones encomendadas a esta institución por el Estatuto de Roma de 17 de julio de 1998');
def('3', 'Art. 3', '38-0', 'l-3', 9, 'Los órganos judiciales y el Ministerio Fiscal podrán dirigir, por conducto del Ministerio de Justicia, solicitudes de cooperación a la Corte que se consideren necesarias en el marco de un proceso que se siguiere en España y en los casos y condiciones que establece el artículo 93.10 del Estatuto.');
def('4', 'Art. 4', '39-0', 'l-4', 9, 'Son autoridades competentes para la aplicación de esta ley: a) El Gobierno. b) El Ministerio de Justicia. c) El Ministerio de Asuntos Exteriores, en los casos previstos en esta ley, y, en todo caso, cuando intervinieran factores de política exterior. d) El Ministerio de Defensa y el Ministerio del Interior, cuando el acto de cooperación afecte a sus competencias. e) Los órganos judiciales de la jurisdicción ordinaria y, en particular, la Audiencia Nacional. f) Los órganos judiciales militares y, en particular, el Tribunal Militar Central. g) El Ministerio Fiscal.');
def('5.1', 'Art. 5.1', '40-0', 'l-5', 9, 'La representación y defensa en juicio de España ante los órganos de la Corte corresponderá a los Abogados del Estado integrados en la Abogacía General del Estado y de acuerdo con las instrucciones impartidas conjuntamente, en cada caso, por el Ministerio de Justicia y el Ministerio de Asuntos Exteriores.');
def('5.2', 'Art. 5.2', '40-1', 'l-5', 9, 'El Gobierno, por motivos excepcionales y oído el Abogado General del Estado, podrá acordar que una persona, especialmente designada al efecto, actúe como agente de España en un determinado procedimiento ante los órganos de la Corte.');
def('6.1', 'Art. 6.1', '41-0', 'l-6', 9, 'El Ministerio de Justicia es el único órgano de relación entre la Corte, por un lado, y los órganos judiciales y Ministerio Fiscal, por otro, sin perjuicio de las competencias del Ministerio de Asuntos Exteriores.');
def('6.2', 'Art. 6.2', '41-3', 'l-6', 9, 'Cuando la consulta incluya, a juicio del Ministerio de Asuntos Exteriores, aspectos de política exterior, será éste el competente, en coordinación con el Ministerio de Justicia y, en su caso, con otros ministerios concernidos.');
def('7.1', 'Art. 7.1', '42-0', 'l-7', 10, 'Corresponde exclusivamente al Gobierno, mediante Acuerdo del Consejo de Ministros, a propuesta conjunta del Ministro de Asuntos Exteriores y del Ministro de Justicia, decidir la presentación de la denuncia de una situación ante el Fiscal de la Corte');
def('7.2', 'Art. 7.2', '42-1', 'l-7', 10, 'dichos órganos se abstendrán de todo procedimiento, limitándose a informar al denunciante, querellante o solicitante de la posibilidad de acudir directamente al Fiscal de la Corte, que podrá, en su caso, iniciar una investigación, sin perjuicio de adoptar, si fuera necesario, las primeras diligencias urgentes para las que pudieran tener competencia.');
def('8.1', 'Art. 8.1', '43-0', 'l-8', 10, 'dicho departamento ministerial solicitará del Fiscal General del Estado información urgente sobre la existencia de actuaciones penales que se sigan o se hayan seguido en relación con los hechos objeto de la investigación, así como sobre si tienen competencia los tribunales españoles.');
def('8.2', 'Art. 8.2', '43-1', 'l-8', 10, 'los Ministros de Justicia y de Asuntos Exteriores, en plazo que no podrá rebasar los veinte días desde la recepción de la notificación del Fiscal de la Corte, elevarán propuesta conjunta al Consejo de Ministros para que resuelva sobre sostener la competencia de las autoridades españolas y, en su caso, pedir la inhibición al Fiscal de la Corte conforme al artículo 18.2 del Estatuto.');
def('8.4', 'Art. 8.4', '43-3', 'l-8', 10, 'El Ministerio de Justicia responderá con carácter urgente a cualquier petición de información del Fiscal de la Corte referida al estado de los procedimientos penales que se siguieren en España y que hubieren sido objeto de petición de inhibición, recabando dicha información del Fiscal General del Estado o directamente del órgano judicial que estuviere conociendo del asunto.');
def('9.1', 'Art. 9.1', '44-0', 'l-9', 10, 'Corresponde exclusivamente al Gobierno, mediante Acuerdo del Consejo de Ministros, a propuesta conjunta del Ministro de Justicia y del Ministro de Asuntos Exteriores, acordar la impugnación de la competencia de la Corte o de la admisibilidad de la causa');
def('9.2', 'Art. 9.2', '44-1', 'l-9', 10, 'Tal impugnación se formalizará a la mayor brevedad posible, antes del inicio del juicio en la Corte y, excepcionalmente, en el momento de su iniciación o en un momento posterior, fundándose en este último caso en el solo motivo de haberse producido ya cosa juzgada en España.');
def('10', 'Art. 10', '45-0', 'l-10', 10, 'la Sala competente de la Corte autoriza al Fiscal a proceder a la investigación o mantiene su competencia, el órgano jurisdiccional español se inhibirá a favor de la Corte y a su solicitud le remitirá lo actuado.');
def('11.1', 'Art. 11.1', '46-0', 'l-11', 11, 'la autoridad que practicare la detención lo comunicará inmediatamente al Ministerio de Justicia y al Juez Central de Instrucción de la Audiencia Nacional, debiendo ser puesta dicha persona a disposición del Juez Central de Instrucción sin demora y, en todo caso, dentro del plazo de setenta y dos horas siguientes a la detención.');
def('11.2', 'Art. 11.2', '46-1', 'l-11', 11, 'El Juez Central de Instrucción oirá a la persona reclamada, asistida de letrado y, en su caso, de intérprete y al Ministerio Fiscal, dentro de las setenta y dos horas siguientes a su puesta a disposición judicial. Después de verificar la identidad del detenido, el contenido de la orden de detención y las circunstancias previstas en el artículo 59.2 del Estatuto informará al detenido del contenido de la orden de detención y de su derecho a solicitar la libertad provisional.');
def('11.3', 'Art. 11.3', '46-2', 'l-11', 11, 'la autoridad penitenciaria competente informará con antelación suficiente sobre la fecha de excarcelación al Juez Central de Instrucción y al Ministerio de Justicia, que informará a la Corte sobre la fecha prevista de excarcelación.');
def('12.1', 'Art. 12.1', '47-0', 'l-12', 11, 'el Juez Central de Instrucción acordará remitir dicha solicitud a la Corte, a través del Ministerio de Justicia, con indicación del plazo para recibir sus recomendaciones, que no será inferior a veinte días.');
def('12.3', 'Art. 12.3', '47-3', 'l-12', 11, 'el Juez Central de Instrucción podrá acordar la libertad provisional y las medidas cautelares adecuadas, que se mantendrán por un tiempo máximo de ciento ochenta días, sin perjuicio de volver a decretar la prisión una vez recibida la documentación de la Corte.');
def('12.4', 'Art. 12.4', '47-4', 'l-12', 11, 'Cuando se acordare la libertad provisional, se informará a la Sala de Cuestiones Preliminares y, posteriormente, cuantas veces ésta lo solicite.');
def('13', 'Art. 13 (apartados 2, 3 y 4)', '48-2', 'l-13', 11, '2. El Juez Central de Instrucción remitirá urgentemente copia del auto al Ministerio de Justicia, que informará de inmediato a la Corte y solicitará indicaciones de ésta, en orden a la realización del traslado. 3. La persona reclamada, aunque se hubiere opuesto a la entrega en la citada comparecencia, podrá dar su consentimiento dentro de los quince días siguientes. 4. En la misma comparecencia se informará al detenido de que el consentimiento, una vez dado, es irrevocable.');
def('13.1', 'Art. 13.1', '48-0', 'l-13', 11, 'se interrogará a la persona reclamada acerca de si consiente en su entrega y, si diere el consentimiento, el Juez Central de Instrucción dictará auto acordando la entrega a la Corte sin más trámites y sin que sea necesario que la Corte remita la documentación prevista en el artículo 91 del Estatuto.');
def('14', 'Art. 14', '49-0', 'l-14', 11, 'el Ministerio de Justicia remitirá la solicitud de la Corte al juez de instrucción del domicilio o residencia de la persona buscada, el cual citará a ésta personalmente');
def('15.1', 'Art. 15.1', '50-0', 'l-15', 11, 'se convocará a una audiencia que tendrá lugar en el plazo máximo de diez días, con citación de la persona reclamada y su defensor y, en su caso, de un intérprete, así como del Ministerio Fiscal. A dicha audiencia podrá asistir e intervenir un delegado del Fiscal de la Corte.');
def('15.3', 'Art. 15.3', '50-3', 'l-15', 11, 'Concluida la vista, el Juzgado Central de Instrucción resolverá sobre la petición de entrega, por medio de auto, en el plazo de tres días.');
def('16', 'Art. 16', '51-0', 'l-16', 11, '1. Cuando concurriere con la solicitud de entrega de la Corte una solicitud de extradición de un Estado, sea o no parte en el Estatuto, o una orden europea de detención y entrega, se notificará este hecho a la Corte y al Estado requirente y se tramitarán conjuntamente ambos procedimientos en el Juzgado Central de Instrucción que estuviere conociendo de la solicitud de entrega. 2. El Juez Central de Instrucción se abstendrá de decidir sobre la entrega, elevando ambos procesos a la Sala de lo Penal de la Audiencia Nacional (…). Cuando no existiere tratado, se dará preferencia a la solicitud de la Corte. 3. El Ministerio de Justicia informará a la Corte cuando, habiendo sido declarada inadmisible la causa por ésta, asimismo se hubiere denegado la extradición al Estado requirente.');
def('16.2', 'Art. 16.2', '51-1', 'l-16', 11, 'El Juez Central de Instrucción se abstendrá de decidir sobre la entrega, elevando ambos procesos a la Sala de lo Penal de la Audiencia Nacional, que resolverá de acuerdo con el Estatuto y, en su caso, de acuerdo con el tratado que existiere con el Estado requirente. Cuando no existiere tratado, se dará preferencia a la solicitud de la Corte.');
def('17.1', 'Art. 17.1', '52-0', 'l-17', 11, 'Contra las resoluciones del Juez Central de Instrucción relativas a la situación personal del reclamado cabe recurso de apelación ante la Sala de lo Penal de la Audiencia Nacional');
def('17.2', 'Art. 17.2', '52-1', 'l-17', 11, 'Contra el auto del Juez Central de Instrucción en el que se resuelve sobre la entrega cabe recurso de apelación ante la Sala de lo Penal de la Audiencia Nacional');
def('17.3', 'Art. 17.3', '52-2', 'l-17', 11, 'Los autos de la Sala de lo Penal de la Audiencia Nacional resolviendo los recursos de los apartados anteriores no serán susceptibles de recurso alguno.');
def('18.2', 'Art. 18.2', '53-1', 'l-18', 11, 'Por el Ministerio de Justicia se transmitirán las informaciones precisas a los órganos judiciales competentes, según los casos, y al Ministerio del Interior, para efectuar el desplazamiento y en su momento el retorno.');
def('20.1', 'Art. 20.1', '55-1', 'l-20', 12, 'El Ministerio de Justicia acusará recibo e informará a la Corte acerca del órgano interno al que se haya transmitido la solicitud.');
def('20.2', 'Art. 20.2', '55-2', 'l-20', 12, 'el Ministerio de Asuntos Exteriores, en coordinación con los Ministerios de Justicia, del Interior y de Defensa u otros Ministerios competentes, efectuará consultas con el Estado u organización de que proceda la información o documentación, informándose a la Corte del resultado de tales consultas.');
def('21.1', 'Art. 21.1', '56-1', 'l-21', 12, 'Si la comparecencia fuere en la sede de la Corte, tendrá carácter voluntario (…). Si la Corte hubiere remitido alguna instrucción sobre la regla relativa a la autoinculpación, se entregará dicho documento al testigo y el órgano judicial se cerciorará de que ha sido debidamente entendido.');
def('22.1', 'Art. 22.1', '57-1', 'l-22', 12, 'Por el Ministerio de Justicia se transmitirán las oportunas informaciones al Ministerio del Interior para la realización del traslado, debiendo comunicarse por las autoridades penitenciarias al juez de vigilancia penitenciaria competente la llegada del recluso, en un plazo de veinticuatro horas.');
def('22.3', 'Art. 22.3', '57-2', 'l-22', 12, 'Los jueces de vigilancia penitenciaria y el Ministerio del Interior prestarán el máximo apoyo a Magistrados y funcionarios de la Corte que se personaren en España para supervisar la ejecución de las penas.');
def('22.5', 'Art. 22.5', '57-4', 'l-22', 12, 'Cuando se celebre una vista en la Sala de Apelaciones acerca de una posible reducción de la pena de quien estuviere cumpliendo condena en España, corresponderá al Ministerio de Justicia determinar la conveniencia de la intervención procesal y los términos en que deba producirse.');
def('22.7', 'Art. 22.7', '57-5', 'l-22', 12, 'Cuando la petición de ejecución de la Corte se refiriese a una multa u orden de decomiso, el Ministerio de Justicia transmitirá la documentación pertinente al Fiscal General del Estado para que inste la ejecución ante el órgano judicial competente');
def('23', 'Art. 23', '58-0', 'l-23', 12, '1. El Ministerio de Justicia, en el plazo indicado por la Corte o, en su caso, en el más breve plazo posible, remitirá observaciones sobre las cuestiones planteadas por la Corte (…). 2. Cuando las observaciones se refiriesen a la atribución del importe de la reparación a una organización intergubernamental o internacional, el Ministerio de Justicia consultará con el Ministerio de Asuntos Exteriores. 3. Cuando para cumplimentar la comunicación de la Corte hubieran de adoptarse medidas de ejecución, se procederá, en lo que sea pertinente, conforme al procedimiento previsto en el apartado 7 del artículo 22 de esta ley.');
def('24', 'Art. 24', '59-0', 'l-24', 12, 'el Ministerio de Justicia consultará con el Ministerio de Asuntos Exteriores para determinar la conveniencia u oportunidad de hacerlo y, en su caso, fijar los términos de dicha participación.');
def('25', 'Art. 25', '60-0', 'l-25', 12, 'el Ministerio de Justicia, previa consulta con los Ministerios de Asuntos Exteriores y del Interior y otras autoridades competentes, comunicará a la Corte la decisión al respecto.');
def('DA3.1', 'Disposición adicional tercera.1', '61-2', 'l-fin', 12, 'Las referencias que esta ley hace al Juzgado Central de Instrucción y a la Sala de lo Penal de la Audiencia Nacional deben entenderse hechas, cuando la cooperación sea de la competencia de la jurisdicción militar, al Juzgado Togado Militar Central Decano y al Tribunal Militar Central, respectivamente. En los mismos casos, las referencias que la ley hace al Ministerio Fiscal y al juzgado de vigilancia penitenciaria deben entenderse hechas al Fiscal Jurídico Militar y al Juez Togado Militar de Vigilancia Penitenciaria.');

const N0 = 499;
const DATOS = JSON.parse(fs.readFileSync('prompts/herramientas/oficiales-seras-t1b.json', 'utf8'));
// «No repetidas»: se salta la que tenga el mismo enunciado y la misma respuesta que otra oficial anterior del tema
const plano = t => String(t).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
const clave = (p, r) => plano(p) + '|' + plano(r);
const previo = fs.readFileSync('test-oficial-conocimiento.html', 'utf8');
const ya = new Set();
{ const re = /\{"id":"1-(\d+)"/g; let m; while ((m = re.exec(previo))) { if (+m[1] >= N0) continue; let d = 0, str = false, e = false; for (let j = m.index; j < previo.length; j++) { const c = previo[j]; if (str) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}' && !--d) { try { const o = JSON.parse(previo.slice(m.index, j + 1)); ya.add(clave(o.pregunta, o.opciones[o.correcta])); } catch (x) {} break; } } } }
console.log('oficiales previas leídas', ya.size);
const Q = [];
DATOS.forEach(d => { const k = clave(P + d.en, d.op[d.c]); if (ya.has(k)) { console.log('repetida, se salta:', d.en.slice(0, 90)); return; } ya.add(k); if (!ART[d.art]) throw new Error('sin artículo ' + d.art); const [loc, lit, par, pz, sec] = ART[d.art]; Q.push([d.en, d.op, d.c, loc, lit, d.exp, par, pz, sec]); });
const L = 'ABCD';
const nuevas = Q.map(([en, op, c, loc, lit, exp], i) => ({
  id: '1-' + (N0 + i), pregunta: P + en, opciones: op, correcta: c,
  explicacion: `<span class="ex-resp">Respuesta correcta: <b>${L[c]}</b> · <mark class="ex-key">${op[c].replace(/\.$/, '')}</mark></span><span class="ref-norma">${loc} · ${NORMA}</span><span class="ref-concepto">"${lit}"</span>${exp}`,
  apartado: NORMA
}));

// 1) banco de preguntas
const F = 'test-oficial-conocimiento.html';
let s = fs.readFileSync(F, 'utf8');
const fin = i => { let d = 0, inS = false, e = false; for (let j = i; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return j + 1; } } };
let ancla = '1-498';
const pendientes = nuevas.filter(n => !s.includes('{"id":"' + n.id + '"'));
nuevas.forEach(n => {
  const i = s.indexOf('{"id":"' + n.id + '"');
  if (i >= 0) s = s.slice(0, i) + JSON.stringify(n) + s.slice(fin(i));
  else { const a = s.indexOf('{"id":"' + ancla + '"'); if (a < 0) throw new Error('sin ancla ' + ancla); const e = fin(a); s = s.slice(0, e) + ',' + JSON.stringify(n) + s.slice(e); }
  ancla = n.id;
});
fs.writeFileSync(F, s);

// 2) Esquemas: párrafo exacto (mapa fijo para futuras regeneraciones + mapa ya generado, sin tocar el resto)
const MF = 'prompts/herramientas/tema1/mapa-fijo-t1.json';
const mf = JSON.parse(fs.readFileSync(MF, 'utf8'));
Q.forEach((x, i) => { mf['1-' + (N0 + i)] = x[6]; });
fs.writeFileSync(MF, JSON.stringify(mf, null, 1));
const MP = 'esquemas-datos/mapa-preguntas.js';
let mp = fs.readFileSync(MP, 'utf8');
const add = Q.map((x, i) => [String(N0 + i), x[6]]).filter(([n]) => !mp.includes('"1-' + n + '":')).map(([n, p]) => `"1-${n}":"1-${p}",`).join('');
mp = mp.replace('window.MAPA_PREG={', 'window.MAPA_PREG={' + add);
fs.writeFileSync(MP, mp);

// 3) temario subrayado
const PE = 'expres-subrayado/t1-preg-extra.json';
const pe = JSON.parse(fs.readFileSync(PE, 'utf8'));
Q.forEach((x, i) => { pe['1-' + (N0 + i)] = x[7]; });
fs.writeFileSync(PE, JSON.stringify(pe, null, 1));
const DS = 'expres-subrayado/datos-t1.js';
let ds = fs.readFileSync(DS, 'utf8');
const k = ds.indexOf('"preg":{'); if (k < 0) throw new Error('datos-t1 sin preg');
const addS = Q.map((x, i) => [String(N0 + i), x[7]]).filter(([n]) => !ds.includes('"1-' + n + '":')).map(([n, p]) => `"1-${n}":"${p}",`).join('');
ds = ds.slice(0, k + 8) + addS + ds.slice(k + 8);
fs.writeFileSync(DS, ds);
// 4) Esquema clave: cada pregunta a su apartado (repetir si se regeneran clave-tests/t1-*.js; índices = n.º de <h2>/<h3> del esquema)
const porArt = Q.map(x => x[8]);
const lee = f => { const w = {}; new Function('window', fs.readFileSync(f, 'utf8'))(w); return w; };
const FE = 'clave-tests/t1-esq.js', FS = 'clave-tests/t1-sec.js';
const esq = lee(FE).CLAVE_ESQ[1], sec = lee(FS).CLAVE_SEC[1];
nuevas.forEach((n, i) => { if (!esq.includes(n.id)) esq.push(n.id); sec.forEach((a, j) => { if (a) sec[j] = a.filter(x => x !== n.id); }); sec[porArt[i]].push(n.id); });
const pon = (f, v) => { const t = fs.readFileSync(f, 'utf8'), k = t.indexOf('[1]=') + 4; fs.writeFileSync(f, t.slice(0, k) + JSON.stringify(v) + ';' + String.fromCharCode(10)); };
pon(FE, esq); pon(FS, sec);
// 5) Retiradas por orden del usuario (se quitan siempre, sin renumerar las demás). 1-517: mismo enunciado que la 1-491.
for (const id of ['1-517']) {
  let h = fs.readFileSync('test-oficial-conocimiento.html', 'utf8'); const i = h.indexOf('{"id":"' + id + '"');
  if (i >= 0) { let d = 0, str = false, e = false, j = i; for (; j < h.length; j++) { const c = h[j]; if (str) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}' && !--d) break; }
    const a = h[i - 1] === ',' ? i - 1 : i; h = h.slice(0, a) + h.slice(a === i && h[j + 1] === ',' ? j + 2 : j + 1); fs.writeFileSync('test-oficial-conocimiento.html', h); }
  for (const f of [MP, DS]) fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(new RegExp('"' + id + '":"[^"]*",?', 'g'), ''));
  for (const f of [MF, PE]) { const o = JSON.parse(fs.readFileSync(f, 'utf8')); delete o[id]; fs.writeFileSync(f, JSON.stringify(o, null, 1)); }
  const e1 = lee(FE).CLAVE_ESQ[1].filter(x => x !== id), s1 = lee(FS).CLAVE_SEC[1].map(a => a && a.filter(x => x !== id)); pon(FE, e1); pon(FS, s1);
}
console.log('preguntas', nuevas.length, '(nuevas', pendientes.length + ')', nuevas[0].id, '→', nuevas[nuevas.length - 1].id);
