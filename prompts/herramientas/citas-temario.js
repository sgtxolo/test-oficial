// Completa lila (norma + artículo) y rojo (literal) de las preguntas que no tienen esquema, buscando en el
// temario oficial limpio (ACTUALIZACIONES\TEMARIO COMPLETO PDF 2026, convertido con pdftotext -enc UTF-8 -layout).
// Uso: node prompts/herramientas/citas-temario.js <carpeta con tN.txt> [temas separados por coma]
// Escribe esquemas-datos/citas-temario.js (se carga después de citas-preguntas.js) y un informe en la carpeta de textos.
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const src = fs.readFileSync(path.join(ROOT, "prompts/herramientas/auditoria-apps.js"), "utf8");
eval(src.slice(src.indexOf("function literal"), src.indexOf("function sintaxis")) + ";global.objeto=objeto;global.arrays=arrays;");
const T = fs.readFileSync(path.join(ROOT, "test-oficial-conocimiento.html"), "utf8");
const Q = objeto(T, "QUESTIONS={");
for (const arr of arrays(T, "const seed=[")) for (const q of arr) { if (!q || !q.id) continue; const t = q.id.split("-")[0]; Q[t] = Q[t] || []; if (!Q[t].some(x => x.id === q.id)) Q[t].push(q); }
const DIR = process.argv[2];
const TEMAS = (process.argv[3] || "15,16,17,19,20,21,22,23,24,25,26,27").split(",");
let previas = {}; try { const s = fs.readFileSync(path.join(ROOT, "esquemas-datos/citas-preguntas.js"), "utf8"); previas = new Function("window", s + ";return window.CITAS_PREG")({}); } catch (e) {}

const sinAcento = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const toks = s => (sinAcento(s.replace(/<[^>]+>/g, " ")).match(/[a-zñ0-9]{4,}/g) || []);
const STOP = new Set("para como esta este esos esas sera seran podra podran deberan debera entre sobre desde hasta cuando donde segun cada todo todos toda todas otro otra otros otras puede pueden tendra tendran haya haran hara tiene tienen siendo sido sera ser son los las del con por una uno que sus ella ellos".split(" "));
const txt = s => String(s || "").replace(/<[^>]+>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

function nombre(t) {
  let s = t.replace(/\s+/g, " ").trim().toLowerCase();
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s.replace(/\b(ley|real decreto|org[aá]nica|decreto|orden|instrucci[oó]n|c[oó]digo|penal|civil|reglamento|constituci[oó]n|estatuto|directiva|espa[nñ]ola|guardia|estado|seguridad|ministerio|interior)\b/g, w => w.charAt(0).toUpperCase() + w.slice(1)).replace(/^(de|del|la|las|los|el)\b/, w => w.charAt(0).toUpperCase() + w.slice(1));
}
function segmentar(tema) {
  const L = fs.readFileSync(path.join(DIR, "t" + tema + ".txt"), "utf8").split(/\r?\n/).map(l => l.replace(/\f/g, ""));
  const unidades = []; let norma = "", art = "", titArt = "", par = "", buf = [];
  const volcar = () => { const t = buf.join(" ").replace(/\s+/g, " ").replace(/(\w)- (\w)/g, "$1$2").trim(); buf = []; if (t.length > 25 && art) unidades.push({ norma, art, par, t }); };
  for (let i = 0; i < L.length; i++) {
    const l = L[i].trim();
    if (/^TEXTO CONSOLIDADO$/i.test(l)) { // el título de la norma son las líneas en mayúsculas inmediatamente anteriores
      let j = i - 1, tit = []; while (j >= 0 && !L[j].trim()) j--;
      while (j >= 0 && L[j].trim() && L[j].trim() === L[j].trim().toUpperCase() && tit.length < 4) { tit.unshift(L[j].trim()); j--; }
      if (tit.length) norma = nombre(tit.join(" ")); continue;
    }
    const ma = l.match(/^Art[íi]culo\s+(\d+(?:\s*(?:bis|ter|quater|quinquies|sexies))?)\.?\s*(.*)$/);
    if (ma) { volcar(); art = ma[1].replace(/\s+/g, " "); titArt = ma[2]; par = ""; continue; }
    if (/^(Disposici[oó]n (?:adicional|transitoria|derogatoria|final)\s+\S+)\.?/i.test(l) && !buf.length) { volcar(); art = l.match(/^(Disposici[oó]n [a-záéíóú]+\s+\S+)/i)[1]; par = ""; continue; }
    if (!l) { if (buf.length) { volcar(); } continue; }
    const mp = l.match(/^(\d+)\.\s+\S/);
    if (mp && !buf.length) par = mp[1];
    if (/^(\d+\.|[a-z]\))\s/.test(l) && buf.length) volcar();
    buf.push(l);
  }
  volcar();
  if (!unidades.some(u => u.norma)) { const h = L.slice(0, 12).map(x => x.trim()).filter(x => x && x === x.toUpperCase() && !/^TEMA/.test(x))[0] || ""; unidades.forEach(u => u.norma = nombre(h)); }
  else { let ult = ""; unidades.forEach(u => { if (u.norma) ult = u.norma; else u.norma = ult; }); const pr = unidades.find(u => u.norma); if (pr) unidades.forEach(u => { if (!u.norma) u.norma = pr.norma; }); }
  return unidades;
}
function frase(u, q) {
  const cuerpo = u.t.replace(/^(\d+\.|[a-z]\))\s+/, "");
  const fr = cuerpo.split(/(?<=[.;:])\s+(?=[A-ZÁÉÍÓÚÑ¿«"“\d]|[a-z]\))/).map(s => s.trim()).filter(Boolean);
  const A = new Set(toks(q.opciones[q.correcta])), P = new Set(toks(q.pregunta));
  let ib = 0, mx = -1; fr.forEach((f, i) => { const w = new Set(toks(f)); let s = 0; A.forEach(x => { if (w.has(x)) s += 3; }); P.forEach(x => { if (w.has(x)) s++; }); if (s > mx) { mx = s; ib = i; } });
  let lit = fr[ib] || cuerpo; if (lit.length < 90 && fr[ib + 1]) lit += " " + fr[ib + 1];
  if (lit.length > 420) lit = lit.slice(0, 420).replace(/\s+\S*$/, "") + "…";
  return lit;
}
const out = {}; const informe = [];
for (const tema of TEMAS) {
  if (!fs.existsSync(path.join(DIR, "t" + tema + ".txt"))) continue;
  const U = segmentar(tema); const idx = new Map(); // token -> unidades
  U.forEach((u, k) => { u.w = new Set(toks(u.t)); u.w.forEach(w => { if (!idx.has(w)) idx.set(w, []); idx.get(w).push(k); }); });
  const N = U.length; const idf = w => Math.log(1 + N / ((idx.get(w) || []).length || 1));
  let ok = 0, dudosas = 0, falta = 0;
  for (const q of Q[tema] || []) {
    const ex = q.explicacion || "";
    const tieneArt = /ref-norma">\s*(Art|Disposici|Punto|Apartado)/i.test(ex) || /(Art(?:[íi]culo|s?\.)?|Punto|Disposici[oó]n)\s*[\d\w.]+[^:"«“]{0,70}[:,]\s*["«“]/i.test(ex);
    const tieneLit = /ref-concepto/.test(ex) || /["«“][^"»”]{12,}["»”]/.test(ex.replace(/<[^>]+>/g, ""));
    if ((tieneArt && tieneLit) || previas[q.id]) continue;
    falta++;
    const A = [...new Set(toks(q.opciones[q.correcta]))].filter(w => !STOP.has(w)), P = [...new Set(toks(q.pregunta))].filter(w => !STOP.has(w));
    const hint = (txt(ex) + " " + q.pregunta).match(/\bart(?:[íi]culos?|s?\.)\s*(\d+)/i); const hArt = hint && hint[1];
    const pref = q.pregunta.split(/\.\s/)[0].slice(0, 160);
    const num = (pref.match(/\d+\/\d{4}/) || [])[0];
    const cand = new Set(); [...A, ...P].forEach(w => (idx.get(w) || []).slice(0, 400).forEach(k => cand.add(k)));
    let mejor = null, ms = 0, seg = 0;
    cand.forEach(k => { const u = U[k]; if (num && !/\d+\/\d{4}/.test(u.norma + " " + u.t.slice(0,0)) ) {} if (num && u.norma.indexOf(num) < 0 && U.some(x => x.norma.indexOf(num) >= 0)) return; if (!num && /^(Ley|Real|Orden|Convenio|Tratado|Instrucci|Decreto|Reglamento|Directiva)/i.test(u.norma)) { const pt = toks(pref).filter(w => w.length >= 5 && !STOP.has(w)), nt = new Set(toks(u.norma)); if (pt.length >= 2 && pt.filter(w => nt.has(w)).length < 1) return; } let sa = 0, ta = 0, sp = 0, tp = 0;
      A.forEach(w => { const v = idf(w); ta += v; if (u.w.has(w)) sa += v; }); P.forEach(w => { const v = idf(w); tp += v; if (u.w.has(w)) sp += v; });
      let s = (ta ? sa / ta : 0) * 2 + (tp ? sp / tp : 0); if (hArt && u.art === hArt) s += 0.8;
      if (s > ms) { seg = ms; ms = s; mejor = u; mejor.ca = ta ? sa / ta : 0; mejor.cp = tp ? sp / tp : 0; } else if (s > seg) seg = s; });
    if (!mejor || ms < 1.6 || ms - seg < 0.05 || mejor.ca < 0.5 || mejor.cp < 0.25) { dudosas++; continue; }
    let nom = mejor.norma;
    if (!/^(Ley|Real|Orden|C[oó]digo|Instrucci|Decreto|Constituci|Reglamento|Directiva|Convenio|Tratado|Estatuto)/i.test(nom)) nom = pref.replace(/\.$/, "");
    const loc = /^Disposici/i.test(mejor.art) ? mejor.art : "Art. " + mejor.art + (mejor.par ? "." + mejor.par : "");
    out[q.id] = [loc, frase(mejor, q), nom]; ok++;
  }
  informe.push("T" + tema + ": sin cita completa " + falta + " · resueltas " + ok + " · dudosas " + dudosas);
}
fs.writeFileSync(path.join(ROOT, "esquemas-datos/citas-temario.js"), "window.CITAS_PREG=Object.assign(window.CITAS_PREG||{}," + JSON.stringify(out) + ");\n");
console.log(informe.join("\n"), "\ntotal:", Object.keys(out).length);
fs.writeFileSync(path.join(DIR, "informe-citas.txt"), JSON.stringify(out, null, 1));
