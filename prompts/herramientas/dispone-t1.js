// Reescribe las explicaciones del Tema 1 que no tenían cita: "El <norma> dispone: "literal". nota".
// Uso: node dispone-t1.js   (edita test-oficial-conocimiento.html en la raíz)
const fs = require("fs");
const F = "C:/Users/ruben/Desktop/HTML OFICIAL/test-oficial-conocimiento.html";
const D = "Declaración Universal de Derechos Humanos";
const T = "esquema del Tema 1 (derechos humanos)";
const DD = "Declaración de los Derechos del Hombre y del Ciudadano de 1789";
const CU = "Carta de las Naciones Unidas";
// id: [fuente, literal|null, nota, verbo]
const X = {
"1-1": ["Resolución 60/251 de la Asamblea General de la ONU (2006)", null, "La Asamblea General creó el Consejo de Derechos Humanos, que sustituyó a la Comisión de Derechos Humanos, órgano que dependía del Consejo Económico y Social."],
"1-2": ["Protocolo de Ginebra de 1925", "sobre la prohibición del empleo en la guerra de gases asfixiantes, tóxicos o similares y de medios bacteriológicos", "Italia usó gases tóxicos contra Etiopía en 1935 y la SDN no lo impidió."],
"1-3": ["Historia de las Naciones Unidas", null, "La Sociedad de Naciones (1919) es el precursor de la ONU; fue disuelta y sustituida en 1945."],
"1-4": [T, "Primer antecedente directo: Cilindro de Ciro", "Es el primer antecedente directo del concepto moderno de derechos humanos."],
"1-5": [T, "Primer documento moderno de defensa de los derechos humanos: Carta Magna de 1215", "Limitó el poder absoluto del rey e inició las garantías individuales frente al poder."],
"1-6": [T, "Declaración de los Derechos del Hombre y del Ciudadano: Francia, 1789 (Revolución francesa)", "Fue la que más influyó en la independencia latinoamericana y en los derechos humanos en Europa."],
"1-7": [T, "Carta de las Naciones Unidas: 26 de junio de 1945 (San Francisco)", "Se firmó el 26 de junio de 1945, en San Francisco."],
"1-8": [CU + ", art. 13.1.b", "fomentar la cooperación internacional en materias de carácter económico, social, cultural, educativo y sanitario, y ayudar a hacer efectivos los derechos humanos y las libertades fundamentales de todos, sin hacer distinción por motivos de raza, sexo, idioma o religión", "Es el artículo que da esta función a la Asamblea General."],
"1-9": [CU + ", art. 1.1", "Mantener la paz y la seguridad internacionales", "La Conferencia de San Francisco preparó la organización internacional cuyo fin principal es la paz y la seguridad."],
"1-10": [T, null, "La redacción del primer borrador se encomendó a la Comisión de Derechos Humanos, formada por 18 miembros."],
"1-11": [T, "DUDH: 10 de diciembre de 1948 · resolución 217 A (III)", "La Asamblea General la adoptó y proclamó mediante la resolución 217 A (III)."],
"1-12": [DD, null, "Fue adoptada en 1789 por la Asamblea Nacional Constituyente francesa."],
"1-13": [T, "DUDH: 10 de diciembre de 1948 · resolución 217 A (III)", "Fue proclamada en París el 10 de diciembre de 1948."],
"1-14": [T, "Siglo XIX: surge el concepto de «derechos humanos»", "Los antecedentes son anteriores, pero el concepto aparece en el siglo XIX."],
"1-15": [T, "1.ª · derechos civiles y políticos: el derecho del hombre frente al Estado", "Garantiza la libertad individual frente al poder del Estado."],
"1-16": [CU, null, "Es el primer tratado internacional de ámbito global que incorpora la promoción de los derechos humanos entre sus fines, antes que la DUDH de 1948."],
"1-17": [T, "Carta Internacional: DUDH (1948) · Pacto Internacional de Derechos Civiles y Políticos · Pacto Internacional de Derechos Económicos, Sociales y Culturales · Protocolos facultativos", "Estos cuatro elementos forman la Carta Internacional de Derechos Humanos."],
"1-18": [T, "DUDH (1948): declaración, no vinculante (soft law) · Pacto Internacional de Derechos Civiles y Políticos (PIDCP): vinculante", "El PIDCP es vinculante, por lo que no es derecho blando."],
"1-19": ["Preámbulo del Pacto Internacional de Derechos Civiles y Políticos", "no puede realizarse el ideal del ser humano libre, liberado del temor y de la miseria, a menos que se creen condiciones que permitan a cada persona gozar de sus derechos civiles y políticos, tanto como de sus derechos económicos, sociales y culturales", "Por eso los derechos civiles y políticos se unen a los económicos, sociales y culturales."],
"1-20": [T, "Los dos Pactos: aprobados 1966, en vigor 1976", "Entraron en vigor en 1976."],
"1-21": [DD + ", art. 5", "La Ley no tiene derecho a prohibir más que las acciones nocivas para la sociedad", "Así se protege el interés colectivo y la libertad."],
"1-22": [T, "Declaración de los Derechos del Hombre y del Ciudadano: Francia, 1789 (Revolución francesa)", "Fue el documento fundamental de la Revolución francesa."],
"1-23": [DD + ", art. 6", "La Ley es la expresión de la voluntad general", "La ley emana de la voluntad general."],
"1-24": [T, "DUDH (1948): declaración, no vinculante (soft law)", "Es un ideal común y base interpretativa, por ejemplo del art. 10.2 de la Constitución Española."],
"1-25": [D + ", art. 2", "Toda persona tiene los derechos y libertades proclamados en esta Declaración, sin distinción alguna de raza, color, sexo, idioma, religión, opinión política o de cualquier otra índole, origen nacional o social, posición económica, nacimiento o cualquier otra condición", "Los derechos se tienen sin distinción; no los establece la voluntad general del pueblo, y por eso la D es la incorrecta."],
"1-26": [T, "1776 · Primera manifestación moderna: Declaración de Independencia de los EE. UU.", "Es la primera manifestación moderna de los derechos humanos."],
"1-27": [T, "Carta de las Naciones Unidas: 26 de junio de 1945 (San Francisco)", "Se firmó en 1945."],
"1-28": ["Protocolo de Ginebra de 1925", "sobre la prohibición del empleo en la guerra de gases asfixiantes, tóxicos o similares y de medios bacteriológicos", "La prohibición de gases tóxicos procede del Protocolo de 1925, no de un convenio de 1928."],
"1-29": [T, "2.ª · derechos económicos, sociales y culturales y colectivos (educación, trabajo)", "Son la segunda generación."],
"1-30": [DD + ", art. 6", "La Ley es la expresión de la voluntad general", "La ley emana de la voluntad general."],
"1-31": [T, "Las tres generaciones (Karel Vasak)", "Vasak la formuló en 1979."],
"1-32": [T, "Los dos Pactos: aprobados 1966, en vigor 1976", "Los Pactos se aprobaron en 1966."],
"1-33": [T, "3.ª · paz, solidaridad, medio ambiente sano: no tiene carácter vinculante", "La tercera generación no es vinculante."],
"1-34": [T, "2.ª · derechos económicos, sociales y culturales y colectivos (educación, trabajo)", "El derecho al trabajo es de segunda generación; los demás son de tercera."],
"1-35": [T, "3.ª · paz, solidaridad, medio ambiente sano", "La paz y la solidaridad son de tercera generación."],
"1-36": [T, "2.ª · derechos económicos, sociales y culturales y colectivos (educación, trabajo)", "Los derechos colectivos son de segunda generación."],
"1-37": [T, "1.ª · derechos civiles y políticos: el derecho del hombre frente al Estado", "Los civiles y políticos son la primera generación."],
"1-38": [T, "3.ª · paz, solidaridad, medio ambiente sano", "El medio ambiente sano es de tercera generación."],
"1-39": [T, "2.ª · derechos económicos, sociales y culturales y colectivos (educación, trabajo)", "La educación es de segunda generación; las otras opciones son de primera."],
"1-40": [T, "Los dos Pactos: aprobados 1966, en vigor 1976", "La universalidad se concreta en los Pactos de 1966."],
"1-41": [T, "Progresividad: no pueden ser disminuidos", "Una vez reconocidos, no pueden retroceder."],
"1-42": [T, "No son absolutos", "Admiten limitaciones legítimas y proporcionadas, por lo que es incorrecto decir que son absolutos."],
"1-43": [T, "Inalienabilidad: no se puede disponer de ellos, ni total ni parcialmente", "Son indisponibles."],
"1-44": [T, "Inviolabilidad: no pueden ser lesionados en su goce", "Nadie puede lesionarlos, ni el Estado."],
"1-45": [T, "Universalidad: para todos y en todos los lugares", "Se reconocen a toda persona, sin distinción."],
"1-46": [T, "Irrenunciabilidad: nadie puede desprenderse de ellos, ni por su voluntad", "No se puede renunciar a ellos ni voluntariamente."],
"1-47": [T, "Derecho humano: facultades inherentes a la condición humana", "Corresponden a la persona por el mero hecho de serlo."],
"1-48": [T, "Declaración de los Derechos del Hombre y del Ciudadano: Francia, 1789 (Revolución francesa)", "Se promulgó en Francia."],
"1-49": [T, "1789 · Declaración de los Derechos del Hombre y del Ciudadano", "La aprobó la Asamblea Nacional francesa en 1789."],
"1-50": [T, "1776 · Primera manifestación moderna: Declaración de Independencia de los EE. UU.", "Se aprobó el 4 de julio de 1776."],
"1-51": [CU, null, "La ONU se creó el 24 de octubre de 1945, al entrar en vigor la Carta, como sucesora de la Sociedad de Naciones."],
"1-52": [T, "DUDH: 10 de diciembre de 1948 · resolución 217 A (III)", "Se aprobó en 1948."],
"1-53": [T, "DUDH: 10 de diciembre de 1948 · resolución 217 A (III)", "Se aprobó por la resolución 217 A (III)."],
"1-54": [T, "DUDH: 10 de diciembre de 1948 · resolución 217 A (III)", "El Día de los Derechos Humanos recuerda esa aprobación."],
"1-55": [D + ", preámbulo", "los derechos iguales e inalienables de todos los miembros de la familia humana", "La Declaración parte de que los derechos son inherentes a la persona."],
"1-56": [D + ", art. 1", "Todos los seres humanos nacen libres e iguales en dignidad y derechos y, dotados como están de razón y conciencia, deben comportarse fraternalmente los unos con los otros", ""],
"1-57": [D + ", art. 12", "Nadie será objeto de injerencias arbitrarias en su vida privada, su familia, su domicilio o su correspondencia, ni de ataques a su honra o a su reputación. Toda persona tiene derecho a la protección de la ley contra tales injerencias o ataques", "La opción correcta es la que reúne todos los bienes protegidos."],
"1-58": [D + ", art. 25.1", "Toda persona tiene derecho a un nivel de vida adecuado que le asegure, así como a su familia, la salud y el bienestar, y en especial la alimentación, el vestido, la vivienda, la asistencia médica y los servicios sociales necesarios", "Las tres opciones anteriores están en el artículo, por eso vale «todas»."],
"1-59": [D + ", art. 26.1", "Toda persona tiene derecho a la educación", ""],
"1-60": [D + ", art. 26.1", "La educación debe ser gratuita, al menos en lo concerniente a la instrucción elemental y fundamental. La instrucción elemental será obligatoria", "El texto oficial separa «gratuita» (instrucción elemental y fundamental) y «obligatoria» (instrucción elemental); la respuesta del test las une."],
"1-61": [D + ", art. 16.2", "Sólo mediante libre y pleno consentimiento de los futuros esposos podrá contraerse el matrimonio", ""],
"1-62": [D + ", art. 26.2", "La educación tendrá por objeto el pleno desarrollo de la personalidad humana y el fortalecimiento del respeto a los derechos humanos y a las libertades fundamentales", ""],
"1-63": [D + ", art. 29.1", "Toda persona tiene deberes respecto a la comunidad, puesto que sólo en ella puede desarrollar libre y plenamente su personalidad", "El texto oficial dice «comunidad»; la respuesta del test dice «la sociedad»."],
"1-64": [D + ", art. 21.1", "Toda persona tiene derecho a participar en el gobierno de su país, directamente o por medio de representantes libremente escogidos", ""],
"1-65": [D + ", art. 17.1", "Toda persona tiene derecho a la propiedad, individual y colectivamente", "El derecho a la propiedad es el artículo 17."],
"1-66": [D + ", art. 16.1", "Los hombres y las mujeres, a partir de la edad núbil, tienen derecho, sin restricción alguna por motivos de raza, nacionalidad o religión, a casarse y fundar una familia", ""],
"1-67": [D + ", art. 13.1", "Toda persona tiene derecho a circular libremente y a elegir su residencia en el territorio de un Estado", ""],
"1-68": [D + ", art. 14.1", "En caso de persecución, toda persona tiene derecho a buscar asilo, y a disfrutar de él, en cualquier país", ""],
"1-69": [D + ", art. 23.2", "Toda persona tiene derecho, sin discriminación alguna, a igual salario por trabajo igual", ""],
"1-70": [D + ", art. 28", "Toda persona tiene derecho a que se establezca un orden social e internacional en el que los derechos y libertades proclamados en esta Declaración se hagan plenamente efectivos", ""],
"1-71": [D + ", art. 27.1", "Toda persona tiene derecho a tomar parte libremente en la vida cultural de la comunidad, a gozar de las artes y a participar en el progreso científico y en los beneficios que de él resulten", ""],
"1-72": [D + ", art. 22", "Toda persona, como miembro de la sociedad, tiene derecho a la seguridad social", ""],
"1-73": [D + ", art. 24", "Toda persona tiene derecho al descanso, al disfrute del tiempo libre, a una limitación razonable de la duración del trabajo y a vacaciones periódicas pagadas", ""],
"1-74": [D, null, "Los derechos se recogen en toda la Declaración, en el preámbulo y en el articulado, no solo en una parte; por eso la respuesta del test es «ninguna es correcta»."],
"1-75": [D + ", arts. 23, 25 y 26", "Toda persona tiene derecho a la educación [...] a un nivel de vida adecuado [...] y al trabajo", "Las tres opciones son derechos reconocidos, por eso vale «todas son correctas»."],
"1-132": [D + ", art. 19", "Todo individuo tiene derecho a la libertad de opinión y de expresión", "El 17 es la propiedad, el 18 la libertad de pensamiento, conciencia y religión y el 20 la libertad de reunión y asociación."],
};
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
let t = fs.readFileSync(F, "utf8"), n = 0;
for (const id of Object.keys(X)) {
  const [fuente, lit, nota] = X[id];
  const k = t.indexOf('{"id":"' + id + '","pregunta"');
  if (k < 0) { console.log("no id", id); continue; }
  const s = t.indexOf('"explicacion":"', k) + 15;
  let e = s; while (!(t[e] === '"' && t[e - 1] !== "\\")) e++;
  const old = JSON.parse('"' + t.slice(s, e) + '"');
  const head = (old.match(/^\s*<span class="ex-resp">[\s\S]*?<\/span>/) || [""])[0];
  if (!head) { console.log("sin cabecera", id); continue; }
  let nuevo = head + '<span class="ref-norma">' + esc(fuente) + "</span>";
  nuevo += lit ? ' dispone: <span class="ref-concepto">"' + esc(lit) + '"</span>.' : ".";
  if (nota) nuevo += " " + nota;
  t = t.slice(0, s) + JSON.stringify(nuevo).slice(1, -1) + t.slice(e);
  n++;
}
fs.writeFileSync(F, t);
console.log("reescritas", n, "de", Object.keys(X).length);
