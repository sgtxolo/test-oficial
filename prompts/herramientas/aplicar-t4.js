// Aplica a las preguntas del T4 los candidatos de candidatos-t4.json que he revisado a mano (lista ACEPTAR).
// El artículo sale de la cabecera «ARTÍCULO N» del propio temario; la norma, de la frase («presente Decisión/Tratado/Reglamento»).
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const F = path.join(ROOT, "test-oficial-conocimiento.html");
const C = require("./candidatos-t4.json");
const ACEPTAR = "4-16 4-62 4-77 4-99 4-100 4-106 4-114 4-122 4-123 4-128 4-141 4-143 4-145 4-147 4-148 4-154 4-172 4-183 4-186 4-187 4-191 4-204 4-206 4-223 4-232 4-25 4-35 4-61 4-64 4-95 4-103 4-105 4-107 4-110 4-129 4-134 4-136 4-144 4-155 4-156 4-157 4-169 4-174 4-175 4-179 4-181 4-184 4-190 4-193 4-194 4-198 4-207 4-208 4-214 4-220 4-225 4-226".split(" ");
const ART = { "4-25": "Anexo VII, 1.2", "4-134": "Anexo VII, 1.2", "4-114": "Anexo VII, 2.3.4", "4-144": "Anexo VII", "4-198": "Art. 8 quater", "4-214": "Art. 8 quater", "4-107": "Art. 25 bis", "4-129": "Art. 25 bis", "4-110": "Art. 42 bis", "4-194": "Art. 8 bis", "4-208": "Art. 8 bis" };
const pl = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
function limpiarLit(l) {
  return l.replace(/TEMARIO DE ASCENSO A OFICIAL\s*(TOMO 1 T4)?\s*(LA GESTIÓN DE LAS FRONTERAS DE LA UNIÓN EUROPEA)?/g, "").replace(/TOMO 1 T4 LA GESTIÓN DE LAS FRONTERAS DE LA UNIÓN EUROPEA/g, "")
    .replace(/^.*?ART[ÍI]CULO\s+\d+(?:\s?(?:BIS|TER|QUATER))?\.?\s*(?:[A-ZÁÉÍÓÚÑ0-9 ,\.\(\)\/«»-]{6,}?\s)(?=[A-ZÁÉÍÓÚ][a-záéíóúñ])/, "")
    .replace(/^.*?ART[ÍI]CULO\s+\d+\s+(?=[A-ZÁÉÍÓÚ][a-záéíóúñ])/, "").replace(/\s*\d{1,2}$/, "").replace(/\s+/g, " ").trim();
}
let t = fs.readFileSync(F, "utf8"), n = 0;
t = t.split("CAPÍTULO III. DOCUMENTOS AUTÉNTICOS Y FALSOS EN RED (FADO) ARTÍCULO 79 ").join(""); const saltadas = [];
for (const id of ACEPTAR) {
  const c = C.find(x => x.id === id); if (!c) { saltadas.push(id + " (sin candidato)"); continue; }
  let lit = limpiarLit(c.lit);
  const ans0 = pl(c.correcta.replace(/[.;]\s*$/, ""));
  if (lit.length > 520) {
    const fr = lit.split(/(?<=[.;:])\s+(?=[A-ZÁÉÍÓÚ0-9(«])/);
    const i = fr.findIndex(x => pl(x).includes(ans0)) >= 0 ? fr.findIndex(x => pl(x).includes(ans0)) : fr.findIndex(x => ans0.split(" ").filter(w => w.length > 3).every(w => pl(x).includes(w)));
    if (i >= 0) lit = fr[i].length < 60 && fr[i + 1] ? fr[i] + " " + fr[i + 1] : fr[i];
  }
  if (lit.length > 520 || lit.length < 20) { saltadas.push(id + " (longitud " + lit.length + ")"); continue; }
  const ans = pl(c.correcta.replace(/[.;]\s*$/, ""));
  if (!c.vago && !pl(lit).includes(ans) && c.a < 0.95) { saltadas.push(id + " (respuesta no está en la frase)"); continue; }
  let ley = c.ley.replace(/ \(Reglamento.*\)$/, " (Reglamento (UE) 2016/399)");
  if (/presente Decisi[óo]n/i.test(lit)) ley = "Decisión 2008/615/JAI (Prüm)"; else if (/presente Tratado/i.test(lit)) ley = "Tratado de Prüm";
  const artTxt = ART[id] || ("Art. " + c.art.toLowerCase());
  if (!ART[id] && !c.art) { saltadas.push(id + " (sin artículo)"); continue; }
  const k = t.indexOf('{"id":"' + id + '","pregunta"'); if (k < 0) continue;
  const s = t.indexOf('"explicacion":"', k) + 15; let e = s; while (!(t[e] === '"' && t[e - 1] !== "\\")) e++;
  const old = JSON.parse('"' + t.slice(s, e) + '"'); if (/ref-norma/.test(old)) continue;
  const head = (old.match(/^\s*<span class="ex-resp">[\s\S]*?<\/span>/) || [""])[0]; if (!head) continue;
  const resto = old.slice(head.length).replace(/\s*(He analizado|Analizando|Analizamos)[\s\S]*$/i, "").replace(/\s*TEST\s?\d+\b[\s\S]*$/, "").trim();
  const nuevo = head + '<span class="ref-norma">' + esc(artTxt + " · " + ley) + '</span> dispone: <span class="ref-concepto">"' + esc(lit) + '"</span>' + (resto ? " " + resto : "");
  t = t.slice(0, s) + JSON.stringify(nuevo).slice(1, -1) + t.slice(e); n++;
}
fs.writeFileSync(F, t);
console.log("reescritas", n, "de", ACEPTAR.length); if (saltadas.length) console.log("saltadas:", saltadas.join("; "));
