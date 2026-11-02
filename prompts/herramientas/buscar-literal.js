// Busca en prompts/temario-limpio/tN/temario.txt la frase literal que respalda la respuesta correcta de las
// preguntas del test sin cita (sin <span class="ref-norma">) y, si la confianza es alta, reescribe la explicación:
//   Respuesta correcta · <lila>Art. N de <norma></lila> dispone: "literal". nota
// Uso: node buscar-literal.js <temas separados por coma> [apply]     (informe en buscar-literal-informe.txt)
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const F = path.join(ROOT, "test-oficial-conocimiento.html");
const temas = (process.argv[2] || "2").split(",");
const APPLY = process.argv[3] === "apply";
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ ]/g, " ");
const STOP = new Set("para como esta este esos esas sera seran podra podran deberan debera entre sobre desde hasta cuando donde segun cada todo todos toda todas otro otra otros otras puede pueden tendra tendran haya hayan sido ser son del las los una uno unos unas que con por sus sin mas pero cual cuales sera ley art articulo senale indique correcta incorrecta siguientes siguiente respuesta".split(" "));
const toks = s => [...new Set(norm(s).split(/\s+/).filter(w => (w.length >= 4 || /^\d+$/.test(w)) && !STOP.has(w)))];

function cargar(tema) {
  const p = path.join(ROOT, "prompts/temario-limpio/tema" + tema + "/temario.txt");
  if (!fs.existsSync(p)) return null;
  let raw = fs.readFileSync(p, "utf8").replace(/\r/g, "").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\ufffd]/g, "");
  raw = raw.replace(/Todos los derechos reservados[^\n]*\n?/g, "").replace(/\n\s*TEMARIO DE ASCENSO[^\n]*\n/g, "\n");
  raw = raw.replace(/(\w)-\n(\w)/g, "$1$2");           // guiones de fin de línea
  const lineas = raw.split("\n");
  const segs = []; let art = "", ley = "";
  for (const l0 of lineas) {
    const l = l0.trim(); if (!l) continue;
    const mL = l.match(/^(?:«)?(LEY ORGÁNICA|LEY|REAL DECRETO(?:-LEY)?|CONVENIO|CONVENCIÓN|PROTOCOLO|REGLAMENTO|DIRECTIVA|DECISIÓN|CONSTITUCIÓN|TRATADO|ACUERDO|INSTRUCCIÓN|ORDEN)\b.{0,200}/);
    if (mL && l === l.toUpperCase() || (mL && /\d+\/\d{4}/.test(l) && l.length < 220 && !/\.\s+\S/.test(l.slice(0, 150)))) ley = l;
    const mA = l.match(/^(?:«)?\s*art[íi]culo\s+(\d+(?:\s?(?:bis|ter|quater))?)\s*[\.\-–:]?/i);
    if (mA) art = mA[1].replace(/\s+/g, " ");
    segs.push({ t: l, art, ley });
  }
  // frases con su artículo
  const frases = [];
  let buf = "", cur = { art: "", ley: "" };
  for (const s of segs) {
    if (!buf) cur = { art: s.art, ley: s.ley };
    buf += (buf ? " " : "") + s.t;
    if (/[\.;:]$/.test(s.t)) { frases.push({ t: buf, art: cur.art || s.art, ley: s.ley }); buf = ""; }
  }
  if (buf) frases.push({ t: buf, art: cur.art, ley: cur.ley });
  return frases.map(f => ({ ...f, k: new Set(toks(f.t)) }));
}

function preguntas(tema) {
  const t = fs.readFileSync(F, "utf8");
  const re = /\{"id":"(\d+-(?:ia-)?\d+)","pregunta":"((?:[^"\\]|\\.)*)","opciones":\[(.*?)\],"correcta":(\d).*?"explicacion":"((?:[^"\\]|\\.)*)","apartado":"((?:[^"\\]|\\.)*)"/g;
  const out = []; let m;
  while ((m = re.exec(t))) {
    if (m[1].split("-")[0] !== tema) continue;
    const e = JSON.parse('"' + m[5] + '"'); if (/ref-norma/.test(e)) continue;
    out.push({ id: m[1], q: JSON.parse('"' + m[2] + '"'), ops: JSON.parse("[" + m[3] + "]"), c: +m[4], e, ap: JSON.parse('"' + m[6] + '"') });
  }
  return out;
}

function limpiar(t) {
  t = t.replace(/(^|[^A-Za-zÁÉÍÓÚáéíóúñ])([A-ZÁÉÍÓÚ])[\s\u00a0\u2009]+(l|a|os|as|in|odo|oda|odos|ada|on|uando|n|s)(?![a-záéíóúñ])/g, (m, p, a, b) => !["El", "La", "Lo", "Los", "Las", "Sin", "Todo", "Toda", "Todos", "Cada", "Con", "Cuando", "En", "Es"].includes(a + b) ? m : p + a + b);
  return t.replace(/^(?:R\d+\s*)+/, "").replace(/ARTÍCULO\s+\d+\.[^.]*\.\s*/, "").replace(/^\s*\d+\.\s+/, "").replace(/\b0\d{5}\b/g, "").replace(/\s+/g, " ").trim();
}
function mejor(q, frases) {
  const letra = "ABCD";
  let ansTxt = q.ops[q.c];
  const vago = /^(todas|ninguna|las opciones|ambas|ninguno)/i.test(ansTxt.replace(/^[a-d]\)\s*/i, ""));
  if (vago) ansTxt = q.ops.filter((o, i) => i !== q.c).join(" ");
  const A = toks(ansTxt), Q = toks(q.q);
  if (A.length < 1) return null;
  let best = null;
  for (let i = 0; i < frases.length; i++) {
    for (const span of [1, 2]) {
      const win = frases.slice(i, i + span);
      const K = new Set(); win.forEach(f => f.k.forEach(x => K.add(x)));
      const a = A.filter(x => K.has(x)).length / A.length;
      const s = Q.length ? Q.filter(x => K.has(x)).length / Q.length : 0;
      const score = a * 0.6 + s * 0.4 - (span - 1) * 0.02;
      if (!best || score > best.score) best = { score, a, s, win, i };
    }
  }
  best.vago = vago;
  return best;
}

const informe = []; let aplicar = [];
for (const tema of temas) {
  const frases = cargar(tema);
  if (!frases) { informe.push("T" + tema + ": sin temario.txt"); continue; }
  const lista = preguntas(tema); let ok = 0;
  for (const q of lista) {
    const b = mejor(q, frases);
    const dicho = (q.e.match(/art(?:ículo|\.)\s*(\d+)/i) || [])[1];
    let conf = b && b.a >= 0.8 && b.s >= 0.3 && b.score >= 0.62;
    if (b) b.win.forEach(f => { f.t = limpiar(f.t); });
    const lit0 = b ? b.win.map(f => f.t).join(" ").replace(/\s+/g, " ").trim() : "";
    const art0 = b ? (b.win[0].art || (b.win[1] && b.win[1].art)) : "";
    if (conf && !(dicho && art0 === dicho)) conf = false;
    if (/incorrect|no es cierto|falsa|excepto|no forma parte|no (?:es|son) /i.test(q.q)) conf = false; // el literal no contiene la respuesta
    if (conf && /(^|[\s.:;(])[B-DF-NP-TV-XZ] [a-záéíóúñ]{2,}|ARTÍCULO|TOMO|R\d+\b|\d+ \| /.test(lit0)) conf = false;
    const lit = b ? b.win.map(f => f.t).join(" ").replace(/\s+/g, " ").trim() : "";
    const art = b ? (b.win[0].art || b.win[1] && b.win[1].art) : "";
    informe.push((conf ? "OK  " : "NO  ") + q.id + " a=" + (b && b.a.toFixed(2)) + " s=" + (b && b.s.toFixed(2)) + " art=" + art + " | " + q.ops[q.c].slice(0, 60) + "\n      " + lit.slice(0, 300));
    if (conf && art && lit.length <= 700) { ok++; aplicar.push({ q, lit, art, ley: b.win[0].ley }); }
  }
  informe.push("== T" + tema + ": " + ok + " de " + lista.length + " con confianza alta");
}
fs.writeFileSync(path.join(__dirname, "buscar-literal-informe.txt"), informe.join("\n"));
console.log(informe.filter(x => x.startsWith("==")).join("\n"));

const citar = [];
for (const tema of temas) {
  for (const q of preguntas(tema)) {
    if (aplicar.some(a => a.q.id === q.id)) continue;
    const mm = q.e.match(/art(?:ículo|\.)s?\s*(\d+(?:\.\d+)?(?:\s*(?:bis|ter))?(?:\.?\s*[a-z]\))?)/i);
    if (mm) citar.push({ q, art: mm[1].replace(/\s+/g, " ").trim() });
  }
}
console.log("solo cita de artículo (sin literal):", citar.length);
if (APPLY) {
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  let t = fs.readFileSync(F, "utf8"), n = 0;
  for (const { q, lit, art, ley } of aplicar) {
    const k = t.indexOf('{"id":"' + q.id + '","pregunta"');
    const s = t.indexOf('"explicacion":"', k) + 15; let e = s;
    while (!(t[e] === '"' && t[e - 1] !== "\\")) e++;
    const head = (q.e.match(/^\s*<span class="ex-resp">[\s\S]*?<\/span>/) || [""])[0]; if (!head) continue;
    let resto = q.e.slice(head.length).replace(/\s*He analizado[\s\S]*$/i, "").replace(/\s*(Analizando|Analizamos)[\s\S]*$/i, "").replace(/\s*TEST\s?\d+\b[\s\S]*$/, "").trim();
    const ap = q.ap.replace(/^General\s*\/\s*/, "").replace(/\s*\(.*$/, "");
    const nuevo = head + '<span class="ref-norma">Art. ' + esc(art) + " · " + esc(ap) + '</span> dispone: <span class="ref-concepto">"' + esc(lit) + '"</span>' + (resto ? " " + resto : "");
    t = t.slice(0, s) + JSON.stringify(nuevo).slice(1, -1) + t.slice(e); n++;
  }
  let c = 0;
  for (const { q, art } of citar) {
    const k = t.indexOf('{"id":"' + q.id + '","pregunta"');
    const s2 = t.indexOf('"explicacion":"', k) + 15; let e2 = s2;
    while (!(t[e2] === '"' && t[e2 - 1] !== "\\")) e2++;
    const head = (q.e.match(/^\s*<span class="ex-resp">[\s\S]*?<\/span>/) || [""])[0]; if (!head) continue;
    const resto = q.e.slice(head.length).replace(/\s*He analizado[\s\S]*$/i, "").replace(/\s*(Analizando|Analizamos)[\s\S]*$/i, "").replace(/\s*TEST\s?\d+\b[\s\S]*$/, "").trim();
    const ap = q.ap.replace(/^General\s*\/\s*/, "").replace(/\s*\(.*$/, "");
    const nuevo = head + '<span class="ref-norma">Art. ' + esc(art) + " · " + esc(ap) + "</span>. " + resto;
    t = t.slice(0, s2) + JSON.stringify(nuevo).slice(1, -1) + t.slice(e2); c++;
  }
  fs.writeFileSync(F, t); console.log("literal:", n, "· solo artículo:", c);
}
