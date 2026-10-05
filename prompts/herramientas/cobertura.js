// Cobertura de cada esquema respecto al temario: cuántos artículos del temario recoge el esquema (los que tienen
// preguntas) y cuántos se quedan fuera. Escribe en esquemas.html:
//   <script id="cobertura-temario">window.COBERTURA={"5":{"temario":300,"esquema":120},...}</script>
// Uso (desde la carpeta del proyecto): node prompts/herramientas/cobertura.js
// Al hacer un tema nuevo, añadir su PDF de TEXTO (no escaneado) a PDFS y volver a ejecutarlo.
const fs = require('fs'), { execFileSync } = require('child_process'), os = require('os'), path = require('path');
const BASE = 'C:/Users/ruben/OneDrive/Desktop/OFICIAL 2026-27/ACTUALIZACIONES/TEMARIO COMPLETO PDF 2026/';
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
  9: ['TEMA 9 - Defensa Nacional (LO 5-2005 + Directiva Defensa Nacional 2020).pdf'],
  12: ['TEMA 12 - Gobierno y Administracion (Ley 50-1997 - Extracto oficial).pdf'],
  13: ['TEMA 13 - Jurisdiccion Contencioso-Administrativa (Extracto oficial).pdf'],
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
    execFileSync('pdftotext', ['-enc', 'UTF-8', BASE + rel, out]);
    const seq = [];
    for (const l0 of fs.readFileSync(out, 'utf8').split('\n')) {
      const l = l0.replace(/\r/g, '');
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
const esquemas = new Function('document', 'window', 'localStorage', 'speechSynthesis', src.slice(0, src.search(/\nrender\(\);/)) + ';return esquemas;')(fake(), fake(), fake(), fake());
const COB = {};
esquemas.forEach((e, i) => {
  const n = i + 1; if (!e.html || !e.html.includes('class="articulo"') || !PDFS[n]) return;
  const temario = articulosTemario(n), bruto = articulosEsquema(e.html), esquema = Math.min(bruto, temario); if (bruto > temario) console.log(`  (aviso: el esquema cuenta ${bruto} artículos, más que el PDF; revisar el PDF del tema ${n})`);
  COB[n] = { temario, esquema }; if (bruto > temario) COB[n].aviso = 1;
  console.log(`Tema ${n}: ${esquema} de ${temario} artículos del temario en el esquema (${Math.round(esquema / temario * 100)} %)`);
});
const bloque = `<script id="cobertura-temario">window.COBERTURA=${JSON.stringify(COB)};</script>`;
let h = fs.readFileSync('esquemas.html', 'utf8');
h = /<script id="cobertura-temario">[\s\S]*?<\/script>/.test(h) ? h.replace(/<script id="cobertura-temario">[\s\S]*?<\/script>/, () => bloque) : h.replace('<script id="mapa-preguntas">', () => bloque + '\n<script id="mapa-preguntas">');
fs.writeFileSync('esquemas.html', h);
