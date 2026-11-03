// Auditoría de solo lectura de las tres aplicaciones: test de conocimientos, esquemas y Exprés subrayado.
// Uso: node prompts/herramientas/auditoria-apps.js     -> imprime el resumen y escribe documentacion/AUDITORIA-APPS.md
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "../..");
const P = (...a) => path.join(ROOT, ...a);
const rd = f => fs.readFileSync(P(f), "utf8");
const hall = { graves: [], medios: [], info: [] };
const G = m => hall.graves.push(m), M = m => hall.medios.push(m), I = m => hall.info.push(m);

// ---------- utilidades ----------
function literal(src, clave, ab, ce) {                      // extrae el literal {…} o […] que sigue a "clave" con emparejado string-aware
  let i = src.indexOf(clave); if (i < 0) return null; i = src.indexOf(ab, i);
  let d = 0, s = false, e = false, j = i;
  for (; j < src.length; j++) { const c = src[j];
    if (s) { if (e) e = false; else if (c === "\\") e = true; else if (c === '"') s = false; continue; }
    if (c === '"') s = true; else if (c === ab) d++; else if (c === ce) { d--; if (d === 0) break; } }
  return { val: new Function("return " + src.slice(i, j + 1))(), fin: j };
}
const objeto = (src, clave) => { const r = literal(src, clave, "{", "}"); return r && r.val; };
function arrays(src, clave) {                                // todos los [...] que siguen a cada aparición de "clave"
  const res = []; let pos = 0;
  while ((pos = src.indexOf(clave, pos)) >= 0) {
    try { const r = literal(src.slice(pos), clave, "[", "]"); res.push(r.val); pos += r.fin; } catch (x) { G("No se puede leer un bloque «" + clave + "»: " + x.message); pos += clave.length; }
  }
  return res;
}
function sintaxis(nombre, code) { try { new vm.Script(code, { filename: nombre }); return true; } catch (e) { G("Error de sintaxis JS en " + nombre + ": " + e.message); return false; } }

// ---------- 1. sintaxis ----------
const HTMLS = ["test-oficial-conocimiento.html", "esquemas.html", "expres-subrayado.html", "test-oficial-ingles.html"];
let nScripts = 0;
for (const h of HTMLS) {
  if (!fs.existsSync(P(h))) { G("Falta " + h); continue; }
  const t = rd(h); let m; const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  while ((m = re.exec(t))) if (m[1].trim()) { nScripts++; sintaxis(h + " (script inline)", m[1]); }
}
let nJs = 0;
for (const d of ["expres", "esquemas-datos", "expres-subrayado", "."]) for (const f of fs.readdirSync(P(d))) if (/\.js$/.test(f) && (d !== "." || /^(service-worker|estado-temas)\.js$/.test(f))) { nJs++; sintaxis(d + "/" + f, rd(d + "/" + f)); }
I("Sintaxis comprobada: " + nScripts + " scripts inline y " + nJs + " archivos .js");

// ---------- 2. service worker ----------
const sw = rd("service-worker.js");
const shell = [...(sw.match(/APP_SHELL\s*=\s*\[([\s\S]*?)\]/) || [, ""])[1].matchAll(/"([^"]+)"/g)].map(m => m[1].replace(/^\.\//, ""));
const faltanDisco = shell.filter(f => f && !fs.existsSync(P(f.split("?")[0])));
if (faltanDisco.length) G("APP_SHELL del service worker lista " + faltanDisco.length + " archivos que no existen: " + faltanDisco.slice(0, 8).join(", "));
I("Caché del service worker: " + (sw.match(/CACHE_NAME\s*=\s*"([^"]+)"/) || [])[1] + " · " + shell.length + " archivos en APP_SHELL");
const sinCachear = [];
for (const d of ["expres", "esquemas-datos"]) for (const f of fs.readdirSync(P(d))) if (/\.js$/.test(f) && !shell.includes(d + "/" + f)) sinCachear.push(d + "/" + f);
for (const f of fs.readdirSync(P("expres-subrayado"))) if (/^(datos|cuadros|cortes|bloques|revision|tapa)-t\d+\.js$/.test(f) && !shell.includes("expres-subrayado/" + f)) sinCachear.push("expres-subrayado/" + f);
if (sinCachear.length) M(sinCachear.length + " archivos de datos no están en APP_SHELL: " + sinCachear.slice(0, 10).join(", ") + (sinCachear.length > 10 ? "…" : ""));

// ---------- 3. recursos estáticos ----------
for (const h of HTMLS) {
  const t = rd(h); const faltan = new Set();
  for (const m of t.matchAll(/(?:src|href)="([^"#?]+)"/g)) {
    const u = m[1];
    if (/^(https?:|data:|mailto:|javascript:|\/\/)/.test(u) || /[$'+{}]/.test(u)) continue;
    if (!fs.existsSync(P(u.replace(/^\.\//, "")))) faltan.add(u);
  }
  if (faltan.size) G(h + " referencia archivos inexistentes: " + [...faltan].slice(0, 8).join(", "));
}

// ---------- 4. test de conocimientos (oficiales en QUESTIONS + IA en los bloques «const seed=[…]») ----------
const T = rd("test-oficial-conocimiento.html");
const Q = objeto(T, "QUESTIONS={");
const MARCAS = objeto(T, "MARCAS_PREG=") || {};
let nSeeds = 0;
for (const arr of arrays(T, "const seed=[")) for (const q of arr) {
  if (!q || !q.id) continue; const tm = q.id.split("-")[0]; Q[tm] = Q[tm] || [];
  if (!Q[tm].some(x => x.id === q.id)) { Q[tm].push(q); nSeeds++; }
}
I("Preguntas IA leídas de los bloques «seed»: " + nSeeds);
const todos = new Map(), porTema = {}; let nQ = 0;
for (const [tema, arr] of Object.entries(Q)) {
  const st = porTema[tema] = { n: 0, of: 0, ia: 0, sinNorma: 0, sinLiteral: 0, junk: 0, dupTexto: 0, err: 0, masLarga: 0 };
  const vistos = new Map();
  for (const q of arr) {
    nQ++; st.n++; const ia = /-ia-/.test(q.id); ia ? st.ia++ : st.of++;
    if (todos.has(q.id)) G("Id de pregunta duplicado: " + q.id); todos.set(q.id, q);
    if (!q.pregunta || !Array.isArray(q.opciones) || q.opciones.length !== 4) { st.err++; G("Pregunta mal formada (opciones != 4): " + q.id); continue; }
    if (!(q.correcta >= 0 && q.correcta <= 3)) { st.err++; G("Índice de respuesta correcta inválido: " + q.id); continue; }
    if (new Set(q.opciones.map(o => String(o).trim().toLowerCase())).size < 4) { st.err++; M("Opciones repetidas dentro de la pregunta " + q.id); }
    if (q.opciones.some(o => !o || !String(o).trim())) { st.err++; G("Opción vacía en " + q.id); }
    const ex = q.explicacion || "";
    const L = (ex.match(/Respuesta correcta:\s*<b>([A-D])<\/b>/) || [])[1];
    if (!ex) { st.sinNorma++; M("Sin explicación: " + q.id); }
    else {
      if (L && "ABCD".indexOf(L) !== q.correcta) G("La letra de la explicación (" + L + ") no coincide con la opción correcta de " + q.id);
      if (!L) M("La explicación no empieza por «Respuesta correcta: X» en " + q.id);
      if (!/ref-norma/.test(ex)) st.sinNorma++;
      if (!/ref-concepto/.test(ex)) st.sinLiteral++;
      if (/TEST\s?\d+\b|He analizado|Analizando las im[aá]genes/.test(ex.replace(/<[^>]+>/g, " "))) st.junk++;
    }
    const k = q.pregunta.replace(/\s+/g, " ").trim().toLowerCase() + "|" + String(q.opciones[q.correcta]).toLowerCase();
    if (vistos.has(k)) st.dupTexto++; else vistos.set(k, q.id);
    const len = q.opciones.map(o => String(o).length), mx = Math.max(...len);
    if (len[q.correcta] === mx && len.filter(x => x === mx).length === 1 && mx > 25 && ia) st.masLarga++;
  }
}
I("Test de conocimientos: " + nQ + " preguntas en " + Object.keys(Q).length + " temas");
const suma = k => Object.values(porTema).reduce((a, s) => a + s[k], 0);
if (suma("junk")) M(suma("junk") + " explicaciones con restos de importación («TEST n», «He analizado…»)");
if (suma("dupTexto")) M(suma("dupTexto") + " preguntas repetidas (mismo enunciado y misma respuesta) dentro de un mismo tema");
if (suma("sinNorma")) M(suma("sinNorma") + " preguntas sin norma en lila (ref-norma) en la explicación (ver tabla por tema)");
if (suma("masLarga")) M(suma("masLarga") + " preguntas IA cuya respuesta correcta es la opción más larga (regla del examinador: no debe serlo)");

// ---------- 5. referencias cruzadas ----------
const ids = src => [...src.matchAll(/data-q=\\?"([^"\\]+)\\?"/g)].flatMap(m => m[1].split(","));
const refs = [];
const mapa = objeto(rd("esquemas-datos/mapa-preguntas.js"), "MAPA_PREG=") || {};
Object.keys(mapa).forEach(id => refs.push(["esquemas-datos/mapa-preguntas.js", id]));
Object.keys(MARCAS).forEach(id => refs.push(["MARCAS_PREG (test)", id]));
for (const f of fs.readdirSync(P("expres"))) if (/\.js$/.test(f)) ids(rd("expres/" + f)).forEach(id => refs.push(["expres/" + f, id]));
ids(rd("esquemas.html")).forEach(id => refs.push(["esquemas.html", id]));
const colgando = {};
for (const [src, id] of refs) if (/^\d+-/.test(id) && !todos.has(id)) (colgando[src] = colgando[src] || new Set()).add(id);
for (const [src, s] of Object.entries(colgando)) M(src + " enlaza " + s.size + " preguntas que ya no existen: " + [...s].slice(0, 8).join(", ") + (s.size > 8 ? "…" : ""));

// ---------- 6. Exprés subrayado ----------
const sub = {};
for (const f of fs.readdirSync(P("expres-subrayado"))) {
  const m = f.match(/^datos-t(\d+)\.js$/); if (!m) continue; const n = m[1];
  const ctx = { window: {} }; try { vm.runInNewContext(rd("expres-subrayado/" + f), ctx); } catch (e) { G("datos-t" + n + ".js no se puede evaluar: " + e.message); continue; }
  const d = (ctx.window.EXSUB || {})[n]; if (!d) { G("datos-t" + n + ".js no define EXSUB[" + n + "]"); continue; }
  const s = sub[n] = { piezas: (d.piezas || []).length, sinImg: 0, idsDup: 0, qFalta: 0, qEnlazadas: new Set() };
  const vis = new Set();
  for (const p of d.piezas || []) {
    if (vis.has(p.id)) s.idsDup++; vis.add(p.id);
    if (p.img && !fs.existsSync(P(d.dir || "", p.img))) s.sinImg++;
    if (p.imgr && !fs.existsSync(P(d.dir || "", p.imgr))) s.sinImg++;
    for (const k of Object.keys(p)) if (/^q\d*$/.test(k) && typeof p[k] === "string") p[k].split(",").forEach(id => { if (!todos.has(id)) s.qFalta++; else s.qEnlazadas.add(id); });
  }
  if (s.sinImg) G("Exprés subrayado T" + n + ": " + s.sinImg + " imágenes de recorte no existen en disco");
  if (s.idsDup) M("Exprés subrayado T" + n + ": " + s.idsDup + " piezas con id repetido");
  if (s.qFalta) M("Exprés subrayado T" + n + ": " + s.qFalta + " enlaces a preguntas que ya no existen");
}

// ---------- 7. tabla por tema ----------
const filas = [];
for (const t of Object.keys(porTema).sort((a, b) => a - b)) {
  const s = porTema[t], sb = sub[t];
  const mapN = [...todos.keys()].filter(id => id.split("-")[0] === t && mapa[id]).length;
  filas.push(`| T${t} | ${s.n} | ${s.of} | ${s.ia} | ${s.sinNorma} | ${s.sinLiteral} | ${s.junk} | ${s.dupTexto} | ${s.n ? Math.round(100 * mapN / s.n) : 0}% | ${fs.existsSync(P("expres/t" + t + ".js")) ? "sí" : "—"} | ${sb ? sb.piezas : "—"} | ${sb ? sb.qEnlazadas.size : "—"} |`);
}
const tabla = "| Tema | Preguntas | Oficiales | IA | Sin norma lila | Sin literal | Restos importación | Repetidas | % en mapa esquema | Exprés | Subrayado (piezas) | Preguntas enlazadas al subrayado |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n" + filas.join("\n");
const md = "# Auditoría de las tres aplicaciones\n\nGenerado por `prompts/herramientas/auditoria-apps.js` (solo lectura).\n\n## Fallos graves\n" + (hall.graves.length ? hall.graves.map(x => "- " + x).join("\n") : "- Ninguno") + "\n\n## Avisos\n" + (hall.medios.length ? hall.medios.map(x => "- " + x).join("\n") : "- Ninguno") + "\n\n## Datos\n" + hall.info.map(x => "- " + x).join("\n") + "\n\n## Por tema\n" + tabla + "\n";
fs.writeFileSync(P("documentacion/AUDITORIA-APPS.md"), md);
console.log(md);
