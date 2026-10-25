// Cobertura de cada esquema respecto al temario: cuántos artículos del temario recoge el esquema (los que tienen
// preguntas) y cuántos se quedan fuera. Escribe en esquemas.html:
//   <script id="cobertura-temario">window.COBERTURA={"5":{"temario":300,"esquema":120},...}</script>
// Uso (desde la carpeta del proyecto): node prompts/herramientas/cobertura.js
// Al hacer un tema nuevo, añadir su PDF de TEXTO (no escaneado) a PDFS y volver a ejecutarlo.
const fs = require('fs'), { execFileSync } = require('child_process'), os = require('os'), path = require('path');
const BASE = 'C:/Users/ruben/Desktop/OFICIAL 2026-27/ACTUALIZACIONES/TEMARIO COMPLETO PDF 2026/';
const PDFS = {
  1: ['TEMA 1/2025-09-09-TEMA 1 COMPLETO.pdf'],
  2: ['TEMA 2/2025-09-09-TEMA 2 COMPLETO.pdf'],
  3: ['TEMA 3/2025-09-09-TEMA 3 COMPLETO.pdf'],
  4: ['TEMA 4/2025-09-19-TEMA 4 COMPLETO.pdf'],
  5: ['TEMA 5/TEMA 5 - Bases de Datos Europeas (Normativa completa).pdf'],
  6: ['TEMA 6/Ley Orgánica 4-2000, de 11 de enero, sobre derechos y libertades de los extranjeros en España.pdf', 'TEMA 6/BOE-A-2009-17242-consolidado.pdf'],
  7: ['TEMA 7 - Derechos y Deberes Fundamentales (Normativa).pdf'],
  8: ['TEMA 8- Poder Judicial (LOPJ 6-1985 - Extracto oficial).pdf'],
  10: ['TEMA 10 - Derecho Civil (Codigo Civil - Extracto oficial).pdf'],
  11: ['TEMA 11 - Derecho Administrativo (Extracto oficial).pdf'],
  9: ['TEMA 9 - Defensa Nacional (LO 5-2005 + Directiva Defensa Nacional 2020).pdf'],
  12: ['TEMA 12 - Gobierno y Administracion (Ley 50-1997 - Extracto oficial).pdf'],
  13: ['TEMA 13 - Jurisdiccion Contencioso-Administrativa (Extracto oficial).pdf'],
  14: ['TEMA 14 - El Defensor del Pueblo (Extracto oficial).pdf'],
};
const SUF = 'bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies|terdecies|quaterdecies|quindecies|sexdecies|septdecies|octodecies|novodecies|vicies';

// Artículos del temario: títulos «Artículo N.» del PDF; cada vez que la numeración vuelve atrás empieza otra norma.
// Las tandas de menos de 5 artículos se descartan (suelen ser artículos citados por normas que modifican a otras).

// Números en letra («Artículo primero», «treinta y uno») del BOE antiguo (p. ej. LO 2/1979 y LO 1/1982)
const ORD = { primero:1, segundo:2, tercero:3, cuarto:4, quinto:5, sexto:6, séptimo:7, octavo:8, noveno:9, décimo:10 };
const UNI = { uno:1, dos:2, tres:3, cuatro:4, cinco:5, seis:6, siete:7, ocho:8, nueve:9, diez:10, once:11, doce:12, trece:13, catorce:14, quince:15, dieciséis:16, diecisiete:17, dieciocho:18, diecinueve:19, veinte:20, veintiuno:21, veintidós:22, veintitrés:23, veinticuatro:24, veinticinco:25, veintiséis:26, veintisiete:27, veintiocho:28, veintinueve:29 };
const DEC = { treinta:30, cuarenta:40, cincuenta:50, sesenta:60, setenta:70, ochenta:80, noventa:90, cien:100 };
function numLetra(s) {
  s = s.toLowerCase().trim();
  if (ORD[s]) return ORD[s]; if (UNI[s]) return UNI[s];
  const m = s.match(/^([a-záéíóú]+)(?: y ([a-záéíóú]+))?$/); if (!m || !DEC[m[1]]) return 0;
  return DEC[m[1]] + (m[2] ? (UNI[m[2]] || 0) : 0);
}
function articulosTemario(n) {
  let total = 0;
  for (const rel of PDFS[n] || []) {
    const out = path.join(os.tmpdir(), 'cob-' + n + '.txt');
    // el PDF puede estar en la carpeta nueva (Escritorio), en su raíz, o solo en la antigua de OneDrive
    const cand = [BASE + rel, BASE + path.basename(rel), BASE.replace('/Desktop/', '/OneDrive/Desktop/') + rel].find(p => fs.existsSync(p));
    execFileSync('pdftotext', ['-enc', 'UTF-8', cand || BASE + rel, out]);
    const seq = [];
    for (const l0 of fs.readFileSync(out, 'utf8').split('\n')) {
      const l = l0.replace(/\r/g, '');
      if (/(\. ){3,}|\.{5,}/.test(l)) continue;   // líneas de índice con puntos guía: no son artículos (la LO 1/1982 contaba 9 de más; 25/10/2026)
      // «ARTÍCULO 58 …» en mayúsculas, o «Artículo 10. Título» / «Artículo 10» solo en la línea (no las citas «artículo 5 del…»)
      const m = l.match(new RegExp('^\\s*ART[ÍI]CULO\\s+(\\d{1,3})\\s*(' + SUF.toUpperCase() + ')?(?![\\dº])', '')) ||
                l.match(new RegExp('^\\s*Art[íi]culo\\s+(\\d{1,3})\\s*(' + SUF + ')?\\s*(?:\\.|$|\\s+[A-ZÁÉÍÓÚ«])', ''));
      const ml = !m && l.match(/^\s*Art[íi]culo\s+([a-záéíóú]+(?: y [a-záéíóú]+)?)\s*(?:\.|$)/i);
      if (ml && numLetra(ml[1])) { seq.push(String(numLetra(ml[1]))); continue; }
      if (m) seq.push(m[1] + (m[2] ? ' ' + m[2].toLowerCase() : ''));
    }
    const tandas = []; let cur = null, prev = 0;
    for (const a of seq) { const v = parseInt(a, 10); if (!cur || v < prev - 3) { cur = new Set(); tandas.push(cur); } cur.add(a); prev = v; }
    const buenas = tandas.length > 1 ? tandas.filter(t => t.size >= 5) : tandas;
    total += buenas.reduce((x, t) => x + t.size, 0);
  }
  return total;
}

// Artículos del esquema: números de las cabeceras de ficha («Artículos 11, 12 y 13», «Artículos 45 a 48») y de los
// «Art. N.» que abren párrafo, contados por separado en cada bloque (norma).
function articulosEsquema(html) {
  let total = 0, actual = new Set();
  const cierra = () => { total += actual.size; actual = new Set(); };
  const nums = txt => {
    const res = []; const t = txt.replace(/<[^>]+>/g, ' ');
    for (const m of t.matchAll(new RegExp('(\\d{1,3})(?:\\s*(' + SUF + '))?(?:\\s*a\\s*(\\d{1,3}))?', 'gi'))) {
      const a = +m[1], b = m[3] ? +m[3] : a;
      if (b >= a && b - a < 40) for (let i = a; i <= b; i++) res.push(i + (m[2] && i === a ? ' ' + m[2].toLowerCase() : ''));
    }
    return res;
  };
  const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo-head">([\s\S]*?)<\/div>|<p>\s*<b>\s*Art\.\s*([^<]*?)<\/b>/g; let m;
  while ((m = re.exec(html))) {
    if (m[1] !== undefined) { if (/^\s*\d+\.\d+|LEY|REGLAMENTO|DECISI|CONVENIO|ESTATUTO|CARTA|TRATADO|ORDEN|DIRECTIVA|PROTOCOLO|ACUERDO|CONVENCI/i.test(m[1])) cierra(); continue; }
    const cab = m[2] !== undefined ? m[2].split('—')[0] : m[3];
    if (m[2] !== undefined && !/Art[íi]culo|Arts?\./i.test(cab)) continue;
    nums(cab.replace(/\.\d+.*$/, '')).forEach(x => actual.add(x));
  }
  cierra();
  return total;
}

const h0 = fs.readFileSync('esquemas.html', 'utf8');
const src = [...h0.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('temasPrograma'));
const fake = () => new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? (() => '') : fake(), apply: () => fake(), set: () => true, construct: () => fake() });
const esquemas = new Function('document', 'window', 'localStorage', 'speechSynthesis', 'location', 'matchMedia', 'addEventListener', 'requestAnimationFrame', 'removeEventListener', 'getComputedStyle', src.slice(0, src.search(/\nrender\(\);/)) + ';return esquemas;')(fake(), fake(), fake(), fake(), fake(), fake(), fake(), fake(), fake(), fake());
// ---- Cola de articulos-rojos.js: lista los artículos del PDF del tema que NO están en el esquema (el «rojo» de la cobertura), con su título y el apartado de la norma.
const N = +process.argv[2];
const e = esquemas[N - 1];
function idsEsquema(html) {   // un Set por bloque de norma
  const bloques = []; let actual = new Set(); const cierra = () => { if (actual.size) bloques.push(actual); actual = new Set(); };
  const nums = txt => { const res = []; const t = txt.replace(/<[^>]+>/g, ' ');
    for (const m of t.matchAll(new RegExp('(\\d{1,3})(?:\\s*(' + SUF + '))?(?:\\s*a\\s*(\\d{1,3}))?', 'gi'))) { const a = +m[1], b = m[3] ? +m[3] : a; if (b >= a && b - a < 40) for (let i = a; i <= b; i++) res.push(i + (m[2] && i === a ? ' ' + m[2].toLowerCase() : '')); } return res; };
  const re = /<div class="bloque-titulo">([\s\S]*?)<\/div>|<div class="articulo-head">([\s\S]*?)<\/div>|<p>\s*<b>\s*Art\.\s*([^<]*?)<\/b>/g; let m;
  while ((m = re.exec(html))) {
    if (m[1] !== undefined) { if (/^\s*\d+\.\d+|LEY|REGLAMENTO|DECISI|CONVENIO|ESTATUTO|CARTA|TRATADO|ORDEN|DIRECTIVA|PROTOCOLO|ACUERDO|CONVENCI/i.test(m[1])) cierra(); continue; }
    const cab = m[2] !== undefined ? m[2].split('—')[0] : m[3]; if (m[2] !== undefined && !/Art[íi]culo|Arts?\./i.test(cab)) continue;
    nums(cab.replace(/\.\d+.*$/, '')).forEach(x => actual.add(x)); }
  cierra(); return bloques;
}
const bloques = idsEsquema(e.html);
for (const rel of PDFS[N]) {
  const out = path.join(os.tmpdir(), 'cob-' + N + '.txt');
  const cand = [BASE + rel, BASE + path.basename(rel), BASE.replace('/Desktop/', '/OneDrive/Desktop/') + rel].find(p => fs.existsSync(p));
  execFileSync('pdftotext', ['-enc', 'UTF-8', cand || BASE + rel, out]);
  const L = fs.readFileSync(out, 'utf8').split('\n').map(l => l.replace(/\r/g, '')); const seq = [];
  for (let i = 0; i < L.length; i++) { const l = L[i]; if (/(\. ){3,}|\.{5,}/.test(l)) continue;
    const m = l.match(new RegExp('^\\s*ART[ÍI]CULO\\s+(\\d{1,3})\\s*(' + SUF.toUpperCase() + ')?(?![\\dº])', '')) || l.match(new RegExp('^\\s*Art[íi]culo\\s+(\\d{1,3})\\s*(' + SUF + ')?\\s*(?:\\.|$|\\s+[A-ZÁÉÍÓÚ«])', ''));
    const ml = !m && l.match(/^\s*Art[íi]culo\s+([a-záéíóú]+(?: y [a-záéíóú]+)?)\s*(?:\.|$)/i);
    let id = null; if (ml && numLetra(ml[1])) id = String(numLetra(ml[1])); else if (m) id = m[1] + (m[2] ? ' ' + m[2].toLowerCase() : '');
    if (id) { const t = (l.replace(/^\s*Art[íi]culo\s+\S+( y \S+)?\s*(bis|ter|quater)?\s*\.?/i, '').trim() || (L[i + 1] || '').trim() || (L[i + 2] || '').trim()).slice(0, 90); seq.push({ id, t, i }); } }
  const tandas = []; let cur = null, prev = 0;
  for (const a of seq) { const v = parseInt(a.id, 10); if (!cur || v < prev - 3) { cur = []; tandas.push(cur); } if (!cur.some(x => x.id === a.id)) cur.push(a); prev = v; }
  const buenas = tandas.length > 1 ? tandas.filter(t => t.length >= 5) : tandas;
  buenas.forEach((t, k) => {
    // el bloque del esquema que más artículos comparte con esta tanda
    let mejor = null, mx = -1; for (const b of bloques) { const c = t.filter(x => b.has(x.id)).length; if (c > mx) { mx = c; mejor = b; } }
    const faltan = t.filter(x => !mejor || !mejor.has(x.id));
    console.log(`\nNORMA ${k + 1} del PDF (${t.length} artículos, arts. ${t[0].id}–${t[t.length - 1].id}; en el esquema ${t.length - faltan.length}) · SIN ESQUEMA: ${faltan.length}`);
    // agrupa en rangos consecutivos
    console.log(faltan.map(x => 'Art. ' + x.id + (x.t ? ' — ' + x.t : '')).join('\n'));
  });
}
