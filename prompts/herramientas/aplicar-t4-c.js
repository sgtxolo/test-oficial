// T4, tercera tanda (a mano): solo frases que están TEXTUALMENTE en temario-limpio/tema4/temario.txt (se comprueba antes de aplicar).
// "[…]" al principio o al final marca que la cita es un fragmento de la frase.
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const F = path.join(ROOT, "test-oficial-conocimiento.html");
const pl = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const TEM0 = pl(fs.readFileSync(path.join(ROOT, "prompts/temario-limpio/tema4/temario.txt"), "utf8").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "").replace(/(\w)-\n(\w)/g, "$1$2"));
const TEM1 = TEM0.replace(/ \d{1,2} /g, " ");   // sin llamadas de nota al pie
const CF = "Código de Fronteras Schengen (Reglamento (UE) 2016/399)", R19 = "Reglamento (UE) 2019/1896 (Guardia Europea de Fronteras y Costas)", DEC = "Decisión 2008/615/JAI (Prüm)", TP = "Tratado de Prüm";
const L30 = "Cada Estado miembro garantizará que toda transmisión y recepción no automatizadas de datos de carácter personal queden documentadas por el servicio titular del fichero y el servicio que realice la consulta, a fin de comprobar la admisibilidad de la transmisión. La documentación comprenderá los extremos siguientes: a) el motivo de la transmisión; b) los datos transmitidos; c) la fecha de la transmisión, y d) la designación o código de referencia del servicio que realice la consulta y del servicio titular del fichero.";
const L7 = "a) el Estado miembro requirente comunique el fin para el que se requiere; b) el Estado miembro requirente presente una orden o declaración de investigación de la autoridad competente, exigible con arreglo a su Derecho interno, de la que se desprenda que se cumplirían los requisitos para la obtención y análisis de material genético si esa persona concreta se encontrara en el territorio del Estado miembro requirente, y c) se cumplan los requisitos para la obtención y análisis de material genético y para la transmisión del perfil de ADN obtenido con arreglo al Derecho del Estado miembro requerido.";
const L53 = "El director ejecutivo tomará una decisión sobre el plan operativo lo antes posible y, en el caso al que se refiere el apartado 2, en un PLAZO MÁXIMO DE CINCO DÍAS HÁBILES.";
const L2 = "Los índices de referencia que no se atribuyan a ninguna persona (perfiles de ADN no identificados) deberán poder reconocerse como tales.";
const X = {
"4-124": ["Art. 37.4 · " + CF, "Tan pronto como la Comisión adopte un acto delegado, lo notificará simultáneamente al Parlamento Europeo y al Consejo."],
"4-158": ["Art. 33 · " + TP, "por «bloqueo» se entenderá el marcado de los datos almacenados de carácter personal con el fin de limitar su tratamiento en el futuro."],
"4-142": ["Art. 16.3 · " + CF, "Para efectuar de forma eficaz el control fronterizo, todo Estado miembro garantizará una cooperación estrecha y permanente entre sus servicios nacionales responsables del control de las fronteras."],
"4-176": ["Art. 107.3 · " + R19, "El director ejecutivo estará asistido por tres directores ejecutivos adjuntos."],
"4-175": ["Art. 108.2 · " + R19, "La Agencia invitará a participar en el foro consultivo a la EASO, a la FRA, al Alto Comisionado de las Naciones Unidas para los Refugiados y a otras organizaciones pertinentes."],
"4-184": ["Art. 6.1 · " + CF, "Para estancias previstas en el territorio de los Estados miembros de una duración que no exceda de 90 días dentro de cualquier período de 180 días, lo que implica tener en cuenta el período de 180 días que precede a cada día de estancia, las condiciones de entrada para los nacionales de terceros países serán las siguientes:"],
"4-95": ["Art. 21.3 · " + CF, "[…] debe informar sobre la ejecución del plan de acción pertinente en el plazo de tres meses con arreglo a lo dispuesto en el artículo 16, apartado 4, del Reglamento (UE) n.º 1053/2013 […]"],
"4-129": ["Art. 25 bis.4 · " + CF, "Cuando en un Estado miembro sea previsible una amenaza grave para el orden público o la seguridad interior, este se lo notificará al Parlamento Europeo, al Consejo, a la Comisión y a los demás Estados miembros de conformidad con el artículo 27, apartado 1, con al menos cuatro semanas de antelación con respecto al restablecimiento previsto de los controles fronterizos, o lo antes posible si el Estado miembro adquiere conocimiento de las circunstancias que dan lugar a la necesidad de restablecer los controles fronterizos en las fronteras interiores en un plazo inferior a cuatro semanas con respecto a la fecha prevista del restablecimiento."],
"4-173": ["Art. 115.1.c) · " + R19, "financiación de la Unión en forma de convenios de contribución o subvenciones ad hoc de conformidad con las normas financieras de la Agencia contempladas en el artículo 120 y con las disposiciones de los instrumentos pertinentes en que se apoyan las políticas de la Unión;"],
"4-195": ["Art. 35.1 · " + TP, "La Parte Contratante receptora únicamente podrá utilizar los datos de carácter personal para los fines para los que se transmitieron con arreglo al presente Tratado; el tratamiento de los datos para otros fines requerirá la previa autorización de la Parte Contratante titular del fichero y se hará con sujeción al derecho interno de la Parte Contratante receptora."],
"4-192": ["Art. 18 · " + DEC, "Las autoridades competentes de los Estados miembros se prestarán apoyo recíproco, con arreglo a su Derecho interno, en caso de concentraciones masivas y acontecimientos similares, catástrofes y accidentes graves, intentando prevenir la comisión de delitos y mantener la seguridad y el orden públicos de la manera siguiente:"],
"4-196": ["Declaraciones al " + TP + " · España (III)", "El Reino de España declara, por lo que respecta a la primera frase del artículo 45, que considera que al Tratado le resulta de aplicación el «Régimen acordado relativo a las autoridades de Gibraltar en el contexto de los instrumentos de la UE y de la CE y Tratados conexos», de 19 de abril de 2000, en virtud de lo previsto en su artículo 5."],
"4-159": ["Art. 53.4 · " + R19, L53], "4-161": ["Art. 53.4 · " + R19, L53],
"4-103": ["Art. 2.2 · " + DEC, L2], "4-155": ["Art. 2.2 · " + DEC, L2],
"4-137": ["Art. 30.1 · " + DEC, L30], "4-140": ["Art. 30.1 · " + DEC, L30], "4-125": ["Art. 30.1 · " + DEC, L30],
"4-2": ["Art. 7 · " + DEC, L7], "4-178": ["Art. 7 · " + DEC, L7],
"4-35": ["Art. 14.1 · " + DEC, "Para la prevención de delitos y amenazas para la seguridad y el orden públicos en relación con acontecimientos importantes de alcance transfronterizo, en particular en el ámbito del deporte o de las reuniones del Consejo Europeo, los Estados miembros se transmitirán mutuamente, tanto previa petición como por iniciativa propia, datos relativos a personas, cuando la existencia de condenas firmes o de otras circunstancias justifiquen la presunción de que estas personas van a cometer un delito con motivo del acontecimiento de que se trate o suponen una amenaza para la seguridad y el orden públicos, en la medida en que la transmisión de tales datos esté autorizada en virtud del Derecho interno del Estado miembro transmisor."],
"4-174": ["Art. 38.3 · " + R19, "El plan operativo será vinculante para la Agencia, para el Estado miembro de acogida y para los Estados miembros participantes. Abarcará todos los aspectos que se consideren necesarios para la realización de la operación conjunta, incluidos los siguientes elementos:"],
"4-136": ["Art. 20.1 · " + CF, "Las normas específicas de inspección que figuran en el anexo VII se aplicarán en las inspecciones de las siguientes categorías de personas: a) jefes de Estado, jefes de Gobierno y miembros del Gobierno nacional con los cónyuges que los acompañen, y los miembros de su delegación oficial, y soberanos y otros miembros eminentes de una familia real. b) pilotos de aeronaves y otros miembros de la tripulación; c) marinos; d) titulares de pasaportes diplomáticos, oficiales o de servicio y miembros de organizaciones internacionales; e) trabajadores transfronterizos; f) menores; g) servicios de salvamento, policía, cuerpos de bomberos y guardias de fronteras; h) trabajadores offshore."],
};
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
let t = fs.readFileSync(F, "utf8"), n = 0;
for (const id of Object.keys(X)) {
  const [norma, lit] = X[id];
  const core = pl(lit.replace(/\[…\]/g, " "));
  if (!TEM0.includes(core) && !TEM1.includes(core)) { console.log("NO está en el temario, no se aplica:", id); continue; }
  const k = t.indexOf('{"id":"' + id + '","pregunta"'); if (k < 0) continue;
  const s = t.indexOf('"explicacion":"', k) + 15; let e = s; while (!(t[e] === '"' && t[e - 1] !== "\\")) e++;
  const old = JSON.parse('"' + t.slice(s, e) + '"'); if (/ref-norma/.test(old)) { console.log("ya tenía cita:", id); continue; }
  const head = (old.match(/^\s*<span class="ex-resp">[\s\S]*?<\/span>/) || [""])[0]; if (!head) continue;
  const resto = old.slice(head.length).replace(/\s*(He analizado|Analizando|Analizamos)[\s\S]*$/i, "").replace(/\s*TEST\s?\d+\b[\s\S]*$/, "").trim();
  const nuevo = head + '<span class="ref-norma">' + esc(norma) + '</span> dispone: <span class="ref-concepto">"' + esc(lit) + '"</span>' + (resto ? " " + resto : "");
  t = t.slice(0, s) + JSON.stringify(nuevo).slice(1, -1) + t.slice(e); n++;
}
fs.writeFileSync(F, t); console.log("reescritas", n, "de", Object.keys(X).length);
