// Candidatos de literal para las preguntas del T4 sin cita. Separa las normas por rangos de línea del temario.
// Uso: node candidatos-t4.js   -> escribe candidatos-t4.json y candidatos-t4.txt (para revisar a mano)
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ ]/g, " ");
const STOP = new Set("para como esta este esos esas sera seran podra podran deberan debera entre sobre desde hasta cuando donde segun cada todo todos toda todas otro otra otros otras puede pueden tendra tendran haya hayan sido ser son del las los una uno unos unas que con por sus sin mas pero cual cuales articulo senale indique correcta incorrecta siguientes siguiente respuesta".split(" "));
const toks = s => [...new Set(norm(s).split(/\s+/).filter(w => (w.length >= 4 || /^\d+$/.test(w)) && !STOP.has(w)))];
const LINES = fs.readFileSync(path.join(ROOT, "prompts/temario-limpio/tema4/temario.txt"), "utf8").replace(/\r/g, "").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f�]/g, "").replace(/(\w)-\n(\w)/g, "$1$2").split("\n");
const LEYES = [["Código de Fronteras Schengen (Reglamento (UE) 2016/399)", 34, 1768], ["Reglamento (UE) 2019/1896 (Guardia Europea de Fronteras y Costas)", 1768, 6354], ["Tratado de Prüm", 6354, 6947], ["Decisión 2008/615/JAI (Prüm)", 6947, LINES.length]];
function limpiar(t) {
  t = t.replace(/(^|[^A-Za-zÁÉÍÓÚáéíóúñ])([A-ZÁÉÍÓÚ])[\s ]+(l|a|os|as|in|odo|oda|odos|ada|on|uando|n|s)(?![a-záéíóúñ])/g, (m, p, a, b) => ["El", "La", "Lo", "Los", "Las", "Sin", "Todo", "Toda", "Todos", "Cada", "Con", "Cuando", "En", "Es"].includes(a + b) ? p + a + b : m);
  return t.replace(/^(?:R\d+\s*)+/, "").replace(/\b0\d{5}\b/g, "").replace(/\s+/g, " ").trim();
}
const frases = [];
LEYES.forEach(([nombre, a, b], li) => {
  let art = "", buf = "";
  for (let i = a; i < b; i++) {
    const l = LINES[i].trim(); if (!l || /Todos los derechos reservados/.test(l)) continue;
    const mA = l.match(/^(?:«)?\s*ART[ÍI]CULO\s+(\d+(?:\s?(?:bis|ter))?)\s*[\.\-–:]?/i);
    if (mA) art = mA[1];
    buf += (buf ? " " : "") + l;
    if (/[\.;:]$/.test(l)) { frases.push({ li, art, t: limpiar(buf) }); buf = ""; }
  }
  if (buf) frases.push({ li, art, t: limpiar(buf) });
});
frases.forEach(f => { f.k = new Set(toks(f.t)); });
const F = path.join(ROOT, "test-oficial-conocimiento.html");
const t = fs.readFileSync(F, "utf8");
const re = /\{"id":"(4-(?:ia-)?\d+)","pregunta":"((?:[^"\\]|\\.)*)","opciones":\[(.*?)\],"correcta":(\d).*?"explicacion":"((?:[^"\\]|\\.)*)","apartado":"((?:[^"\\]|\\.)*)"/g;
let m; const out = [], txt = [];
while ((m = re.exec(t))) {
  const e = JSON.parse('"' + m[5] + '"'); if (/ref-norma/.test(e)) continue;
  const q = JSON.parse('"' + m[2] + '"'), ops = JSON.parse("[" + m[3] + "]"), c = +m[4], ap = JSON.parse('"' + m[6] + '"');
  let ans = ops[c]; const vago = /^(todas|ninguna|las opciones|ambas)/i.test(ans);
  if (vago) ans = ops.filter((o, i) => i !== c).join(" ");
  const A = toks(ans), Q = toks(q);
  let li = -1;
  if (/2016\/399/.test(ap)) li = 0; else if (/2019\/1896/.test(ap)) li = 1; else if (/Pr[üu]m|2008\/615/.test(ap)) li = 2.5;
  let best = null;
  for (let i = 0; i < frases.length; i++) {
    const f = frases[i];
    if (li >= 0 && (li === 2.5 ? f.li < 2 : f.li !== li)) continue;
    const a = A.length ? A.filter(x => f.k.has(x)).length / A.length : 0;
    const s = Q.length ? Q.filter(x => f.k.has(x)).length / Q.length : 0;
    const score = a * 0.6 + s * 0.4;
    if (!best || score > best.score) best = { score, a, s, f };
  }
  const lit = best ? best.f.t : "";
  out.push({ id: m[1], correcta: ops[c], ley: best ? LEYES[best.f.li][0] : "", art: best ? best.f.art : "", lit, a: best && +best.a.toFixed(2), s: best && +best.s.toFixed(2), vago, q });
  txt.push(m[1] + " a=" + (best && best.a.toFixed(2)) + " s=" + (best && best.s.toFixed(2)) + " | " + (best ? LEYES[best.f.li][0].slice(0, 22) : "") + " art " + (best && best.f.art) + "\n  Q: " + q.slice(-150) + "\n  R: " + ops[c].slice(0, 110) + "\n  L: " + lit.slice(0, 330));
}
fs.writeFileSync(path.join(__dirname, "candidatos-t4.json"), JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(__dirname, "candidatos-t4.txt"), txt.join("\n"));
console.log(out.length, "candidatos");
