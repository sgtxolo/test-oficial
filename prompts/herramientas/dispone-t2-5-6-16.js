// Rellena a mano las 18 preguntas de T2, T5, T6 y T16 que el buscador (buscar-literal.js) no pudo resolver.
// Literales solo donde están en prompts/temario-limpio (T2); T5, T6 y T16 no tienen temario.txt: fuente + nota de la explicación ya revisada.
const fs = require("fs");
const F = "C:/Users/ruben/Desktop/HTML OFICIAL/test-oficial-conocimiento.html";
const CP = "Convención de las Naciones Unidas contra la Delincuencia Organizada Transnacional";
const C196 = "Convenio n.º 196 del Consejo de Europa para la prevención del terrorismo";
const L10 = "Ley 10/2010";
const RD = "Real Decreto 247/2024 (Protocolo frente al acoso sexual y por razón de sexo)";
// id: [fuente, literal|null, nota]
const X = {
"2-20": [C196 + ", art. 10.2", "la responsabilidad de las personas jurídicas podrá ser de índole penal, civil o administrativa", "Las tres formas valen, por eso la correcta es «todas»."],
"2-89": [C196 + ", art. 10.2", "la responsabilidad de las personas jurídicas podrá ser de índole penal, civil o administrativa", "Las tres formas valen, por eso la correcta es «todas»."],
"2-36": [L10 + ", art. 43", "El Servicio Ejecutivo de la Comisión, como encargado del tratamiento, determinará, con arreglo a lo establecido en la Ley Orgánica 3/2018, de 5 de diciembre, y en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, las características técnicas del fichero, pudiendo aprobar las instrucciones pertinentes", ""],
"2-74": [CP + ", art. 13.5", "Cada Estado Parte proporcionará al Secretario General de las Naciones Unidas una copia de sus leyes y reglamentos destinados a dar aplicación al presente artículo y de cualquier enmienda ulterior que se haga a tales leyes", "Es el artículo sobre cooperación internacional para fines de decomiso."],
"2-75": ["Protocolo contra el tráfico ilícito de migrantes por tierra, mar y aire, art. 19 (cláusula de protección)", null, "La cláusula de protección exige no interferir ni causar menoscabo ni en los derechos y obligaciones de los Estados ribereños conforme al derecho internacional del mar ni en la competencia del Estado del pabellón sobre el buque; por eso valen A y B."],
"2-78": [CP + ", art. 16", "Los Estados Parte no podrán denegar una solicitud de extradición únicamente porque se considere que el delito también entraña cuestiones tributarias", "El artículo añade que se consultará al Estado requirente antes de denegar y que los Estados procurarán celebrar acuerdos de extradición; por eso son correctas las tres."],
"2-84": [CP + ", art. 18.15", "Toda solicitud de asistencia judicial recíproca contendrá lo siguiente: a) La identidad de la autoridad que hace la solicitud; b) El objeto y la índole de las investigaciones, los procesos o las actuaciones judiciales a que se refiere la solicitud", "La lista incluye también la identidad, ubicación y nacionalidad de la persona interesada (de ser posible), la finalidad de la prueba o acción y la descripción de la asistencia solicitada; por eso vale «todas»."],
"2-88": ["Protocolo para prevenir, reprimir y sancionar la trata de personas (artículo de enmienda)", "podrán proponer enmiendas por escrito al Secretario General de las Naciones Unidas, quien a continuación comunicará toda enmienda propuesta a los Estados Parte y a la Conferencia de las Partes en la Convención para que la examinen y decidan al respecto", "Las enmiendas pueden proponerse cuando han pasado cinco años desde la entrada en vigor."],
"5-206": ["Reglamento (CE) n.º 767/2008 (VIS), disposición de modificación", null, "La modificación de la Decisión 2008/633/JAI y del Reglamento VIS se hace mediante un reglamento del Parlamento Europeo y del Consejo."],
"6-244": ["Ley Orgánica 4/2000, disposición final sobre desarrollo reglamentario", null, "El Gobierno aprueba el Reglamento de desarrollo mediante Real Decreto (por ejemplo, el Real Decreto 557/2011)."],
"16-159": ["Ley Orgánica 3/2007, art. 51 (criterios de actuación de las Administraciones públicas)", null, "Las Administraciones deben facilitar la conciliación de la vida personal, familiar y laboral sin menoscabo de la promoción profesional; la opción B dice lo contrario («menoscabando»), y por eso es la incorrecta."],
"16-162": [RD + ", anexo II, apartado 4.4", null, "Si la víctima no está de acuerdo con las conclusiones, dispone de diez días para presentar alegaciones."],
"16-163": [RD + ", principios de actuación", null, "Entre los principios están el sigilo, la no revictimización y la presunción de inocencia; el arbitraje no es un principio ni una fase del procedimiento."],
"16-164": [RD + ", anexo II, apartado 4.2", null, "Entre los supuestos de archivo o finalización están el desistimiento de la víctima, el archivo por falta de objeto o insuficiencia de indicios y la sanción disciplinaria; que el acosador haya sido sancionado antes en el ámbito privado no lo es."],
"16-165": [RD + ", anexo I, apartado 2.1.2 (principios de actuación)", null, "Los principios incluyen respeto y protección, diligencia, celeridad, imparcialidad, audiencia, confidencialidad y sigilo, objetividad y no revictimización; la «mínima intervención» no figura."],
"16-168": [RD + ", definición de acoso sexual", "entorno intimidatorio, hostil, degradante, humillante u ofensivo", "Ese entorno es lo que la doctrina y el ámbito laboral llaman acoso sexual ambiental."],
"16-172": [RD + ", anexo II, apartado 1.4", null, "La representación sindical tiene el deber de sigilo respecto de los hechos que conozca."],
"16-177": [RD + ", anexo I, apartado 2.1.3.c", null, "Es una medida preventiva obligatoria: la identificación de las personas responsables de atender a quienes formulen una queja o denuncia."],
};
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
let t = fs.readFileSync(F, "utf8"), n = 0;
for (const id of Object.keys(X)) {
  const [fuente, lit, nota] = X[id];
  const k = t.indexOf('{"id":"' + id + '","pregunta"'); if (k < 0) { console.log("no id", id); continue; }
  const s = t.indexOf('"explicacion":"', k) + 15; let e = s; while (!(t[e] === '"' && t[e - 1] !== "\\")) e++;
  const old = JSON.parse('"' + t.slice(s, e) + '"');
  const head = (old.match(/^\s*<span class="ex-resp">[\s\S]*?<\/span>/) || [""])[0]; if (!head) { console.log("sin cabecera", id); continue; }
  let nuevo = head + '<span class="ref-norma">' + esc(fuente) + "</span>" + (lit ? ' dispone: <span class="ref-concepto">"' + esc(lit) + '"</span>.' : ".");
  if (nota) nuevo += " " + nota;
  t = t.slice(0, s) + JSON.stringify(nuevo).slice(1, -1) + t.slice(e); n++;
}
fs.writeFileSync(F, t); console.log("reescritas", n, "de", Object.keys(X).length);
