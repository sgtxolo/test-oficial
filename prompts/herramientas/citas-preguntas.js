// Genera esquemas-datos/citas-preguntas.js: para cada pregunta enlazada al esquema (MAPA_PREG) guarda
//   [localizador "Art. 15.1" / "Punto 9.1.5", literal del temario, nombre de la norma]
// que el test usa para pintar la explicación (lila = norma + artículo, rojo = literal del temario).
// Uso: node prompts/herramientas/citas-preguntas.js <esq2.jsonl>
//   esq2.jsonl = una línea JSON por pregunta {id,head,ley,sec,p,mark} extraída del DOM de esquemas.html
//   (abrir esquemas.html, ejecutar prepararTodos() y recorrer window.MAPA_PREG; ver documentacion/CITAS-PREGUNTAS.md).
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "../..");
const src = fs.readFileSync(path.join(ROOT, "prompts/herramientas/auditoria-apps.js"), "utf8");
eval(src.slice(src.indexOf("function literal"), src.indexOf("function sintaxis")) + ";global.objeto=objeto;global.arrays=arrays;");
const T = fs.readFileSync(path.join(ROOT, "test-oficial-conocimiento.html"), "utf8");
const Q = objeto(T, "QUESTIONS={");
for (const arr of arrays(T, "const seed=[")) for (const q of arr) { if (!q || !q.id) continue; const t = q.id.split("-")[0]; Q[t] = Q[t] || []; if (!Q[t].some(x => x.id === q.id)) Q[t].push(q); }
const by = {}; for (const t in Q) for (const q of Q[t]) by[q.id] = q;

const plano = s => String(s).replace(/<[^>]+>/g, " ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const palabras = s => new Set((plano(s).match(/[a-zñ0-9]{5,}/g) || []));
const txt = s => String(s || "").replace(/<[^>]+>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const PROPIOS = /\b(secretar[ií]a|ley|real|decreto|org[aá]nica|instrucci[oó]n|constituci[oó]n|c[oó]digo|penal|civil|reglamento|directiva|estatuto|orden|protocolo|convenio|tratado|declaraci[oó]n|resoluci[oó]n|europea|espa[nñ]ola|estado|general|nacional|seguridad|ministerio|interior)\b/g;
function nombreNorma(t) {
  let s = t.replace(/^\d+(\.\d+)?\s*[—–-]\s*/, "").replace(/\s*\(.*$/, "").trim();
  s = s.replace(/,?\s+por (la|el) (que|cual)\b.*$/i, "");
  if (s.length > 130) s = s.slice(0, 130).replace(/\s+\S*$/, "");
  if (!s) return "";
  s = s.toLowerCase();
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s.replace(PROPIOS, w => w.charAt(0).toUpperCase() + w.slice(1)).replace(/\b(de|del|la|las|los|el|y|en|por|para)\b/gi, w => w.toLowerCase()).replace(/^(de|del|la|las|los|el)\b/, w => w.charAt(0).toUpperCase() + w.slice(1));
}
function localizador(head, p) {
  const par = (p.match(/^(\d+(?:\.\d+)*)\.\s/) || [])[1] || "";
  const art = (head.match(/^Art[íi]culo\s+(\d+(?:\s*(?:bis|ter|quater|quinquies))?)/i) || [])[1];
  if (art) {
    if (par && !/\./.test(par)) return "Art. " + art.trim() + "." + par;
    if (par && par.indexOf(art.trim() + ".") === 0) return "Art. " + par;
    return "Art. " + art.trim();
  }
  const num = (head.match(/^(\d+(?:\.\d+)*)\.?\s/) || [])[1];
  if (par && /\./.test(par)) return "Punto " + par;
  if (num) return "Punto " + num + (par && par !== num ? "." + par : "");
  const dis = (head.match(/^(Disposici[oó]n [a-záéíóú]+(?: [a-záéíóú]+)?)/i) || [])[1];
  if (dis) return dis;
  return "";
}
function mejorLiteral(p, mark, q) {
  const cuerpo = p.replace(/^\d+(?:\.\d+)*\.\s+/, "");
  const frases = cuerpo.split(/(?<=[.;:])\s+(?=[A-ZÁÉÍÓÚÑ¿«"“\d]|[a-z]\))/).map(s => s.trim()).filter(Boolean);
  const correcta = q.opciones[q.correcta];
  const A = palabras(correcta), Qp = palabras(q.pregunta);
  const sc = f => { const w = palabras(f); let a = 0, b = 0; A.forEach(x => { if (w.has(x)) a++; }); Qp.forEach(x => { if (w.has(x)) b++; }); return a * 3 + b; };
  let ib = 0, mx = -1;
  frases.forEach((f, i) => { let s = sc(f); if (mark && f.indexOf(mark) >= 0) s += 2; if (s > mx) { mx = s; ib = i; } });
  if (!frases.length) return { lit: "", puntos: 0 };
  let lit = frases[ib];
  if (lit.length < 90 && frases[ib + 1]) lit += " " + frases[ib + 1];
  if (lit.length > 420) lit = lit.slice(0, 420).replace(/\s+\S*$/, "") + "…";
  return { lit, puntos: mx };
}

const res = {}; let con = 0, sin = 0;
for (const l of fs.readFileSync(process.argv[2], "utf8").split("\n")) {
  if (!l.trim()) continue;
  const e = JSON.parse(l), q = by[e.id]; if (!q) continue;
  const ov = (() => { const w = palabras(e.p); let n = 0; palabras(q.opciones[q.correcta] + " " + q.pregunta).forEach(x => { if (w.has(x)) n++; }); return n; })();
  if (ov < 2) { sin++; continue; }
  const ex = q.explicacion || "";
  const tieneArt = /ref-norma">\s*(Art|Disposici|Punto|Apartado)/i.test(ex) || /(Art(?:[íi]culo|s?\.)?|Punto|Disposici[oó]n)\s*[\d\w.]+[^:"«“]{0,70}[:,]\s*["«“]/i.test(ex);
  const tieneLit = /ref-concepto/.test(ex) || /["«“][^"»”]{12,}["»”]/.test(ex.replace(/<[^>]+>/g, ""));
  if (tieneArt && tieneLit) continue;               // ya está completa: no se toca
  const loc = localizador(e.head, e.p);
  const lit = mejorLiteral(e.p, e.mark, q);
  res[e.id] = [loc, lit.lit, nombreNorma(e.ley || e.sec || "")];
  con++;
}
const out = "window.CITAS_PREG=" + JSON.stringify(res) + ";\n";
fs.writeFileSync(path.join(ROOT, "esquemas-datos/citas-preguntas.js"), out);
console.log("preguntas con cita:", con, "· descartadas por poca coincidencia:", sin, "· bytes:", out.length);
