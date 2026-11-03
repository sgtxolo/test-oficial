// T4, segunda tanda (a mano): solo frases que están TEXTUALMENTE en temario-limpio/tema4/temario.txt.
// El script comprueba que cada literal aparece en el temario (si no, no lo aplica).
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const F = path.join(ROOT, "test-oficial-conocimiento.html");
const pl = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const TEM = pl(fs.readFileSync(path.join(ROOT, "prompts/temario-limpio/tema4/temario.txt"), "utf8").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "").replace(/(\w)-\n(\w)/g, "$1$2"));
const CF = "Código de Fronteras Schengen (Reglamento (UE) 2016/399)", R19 = "Reglamento (UE) 2019/1896 (Guardia Europea de Fronteras y Costas)";
const X = {
"4-63": ["Art. 10.2 · " + CF, "Los beneficiarios del derecho a la libre circulación con arreglo al Derecho de la Unión podrán utilizar las filas marcadas con la señal que figura en el anexo III, parte A («UE, EEE, CH»)."],
"4-58": ["Art. 9 · " + CF, "La flexibilización de las inspecciones será temporal, se adaptará a las circunstancias que la motiven y se aplicará de modo gradual."],
"4-66": ["Art. 30 · " + R19, "A efectos del presente Reglamento, cada Estado miembro dividirá sus fronteras exteriores en secciones de las fronteras exteriores. Estas secciones estarán formadas por secciones de las fronteras terrestres, marítimas y, cuando el Estado miembro así lo decida, aéreas."],
"4-86": ["Art. 40.1 · " + R19, "Cuando un Estado miembro se enfrente a retos migratorios desproporcionados en puntos críticos concretos de sus fronteras exteriores caracterizados por grandes flujos migratorios mixtos de entrada, podrá solicitar el refuerzo técnico y operativo de los equipos de apoyo a la gestión de la migración, compuestos por expertos de los órganos y organismos de la Unión competentes, que actuarán de conformidad con sus respectivos mandatos."],
"4-112": ["Anexo VII, 3.2.7 · " + CF, "No obstante lo dispuesto en los artículos 5 y 8, no se efectuarán inspecciones sistemáticas de la tripulación de los buques dedicados a la pesca de bajura que regresen diariamente, o en el plazo de 36 horas, al puerto en el que esté matriculado el buque o a otro puerto situado en territorio de los Estados miembros sin haber anclado en ningún puerto situado en territorio de un tercer país."],
"4-120": ["Art. 17.2 · Tratado de Prüm", "Los escoltas de seguridad de los vuelos a que se refiere el presente Tratado serán agentes de policía u otros empleados públicos con la formación correspondiente encargados de garantizar la seguridad a bordo de las aeronaves."],
"4-70": ["Anexo IV, 2 · " + CF, "Los códigos de seguridad de los sellos se modificarán a intervalos regulares no superiores a un mes."],
};
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
let t = fs.readFileSync(F, "utf8"), n = 0;
for (const id of Object.keys(X)) {
  const [norma, lit] = X[id];
  if (!TEM.includes(pl(lit))) { console.log("NO está en el temario, no se aplica:", id); continue; }
  const k = t.indexOf('{"id":"' + id + '","pregunta"'); if (k < 0) continue;
  const s = t.indexOf('"explicacion":"', k) + 15; let e = s; while (!(t[e] === '"' && t[e - 1] !== "\\")) e++;
  const old = JSON.parse('"' + t.slice(s, e) + '"'); if (/ref-norma/.test(old)) { console.log("ya tenía cita:", id); continue; }
  const head = (old.match(/^\s*<span class="ex-resp">[\s\S]*?<\/span>/) || [""])[0]; if (!head) continue;
  const resto = old.slice(head.length).replace(/\s*(He analizado|Analizando|Analizamos)[\s\S]*$/i, "").replace(/\s*TEST\s?\d+\b[\s\S]*$/, "").trim();
  const nuevo = head + '<span class="ref-norma">' + esc(norma) + '</span> dispone: <span class="ref-concepto">"' + esc(lit) + '"</span>' + (resto ? " " + resto : "");
  t = t.slice(0, s) + JSON.stringify(nuevo).slice(1, -1) + t.slice(e); n++;
}
fs.writeFileSync(F, t); console.log("reescritas", n, "de", Object.keys(X).length);
