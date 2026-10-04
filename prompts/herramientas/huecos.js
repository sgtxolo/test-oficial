// Texto literal de cada «(…)» de los esquemas: lo busca en el texto limpio del temario y lo guarda en esquemas.html
// para que, al pulsar el (…) (o pasar el ratón), se despliegue en gris lo que falta de ese artículo.
// Uso (desde la carpeta del proyecto):
//   node prompts/herramientas/huecos.js            -> calcula, informa y escribe
//   node prompts/herramientas/huecos.js --ver 5    -> además lista los (…) del tema 5 que no se han encontrado
//                                                     y deja en %TEMP%/huecos-5.txt todos los encontrados para revisarlos
// Escribe en esquemas.html:
//   <script id="huecos-temario">window.HUECOS={"5":{"<clave>":"texto que falta",...}}</script>
//   clave = últimos 40 caracteres (solo letras y números) antes del (…) + "|" + primeros 40 después, dentro del párrafo.
// Textos limpios: prompts/temario-limpio/temaN/*.txt (un párrafo por línea). Al añadir un tema, crear su carpeta.
// Volver a ejecutarlo SIEMPRE que se cambie un esquema.
const fs = require('fs'), path = require('path'), os = require('os');
const ESQ = 'esquemas.html', DIR = 'prompts/temario-limpio';
const VER = process.argv.includes('--ver') ? process.argv[process.argv.indexOf('--ver') + 1] : null;
const ELIP = '(…)';

function cargarEsquemas() {
  const h = fs.readFileSync(ESQ, 'utf8');
  const src = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('temasPrograma'));
  const code = src.slice(0, src.search(/\nrender\(\);/)) + ';return esquemas;';
  const fake = () => new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? (() => '') : fake(), apply: () => fake(), set: () => true, construct: () => fake() });
  return new Function('document', 'window', 'localStorage', 'speechSynthesis', code)(fake(), fake(), fake(), fake());
}

// Igual que en el navegador (script-huecos): solo letras y números, sin tildes, en minúscula.
const clave = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', nbsp: ' ', laquo: '«', raquo: '»', hellip: '…' };
const textoPlano = h => h.replace(/<[^>]+>/g, '').replace(/&(#\d+|[a-z]+);/g, (m, e) => e[0] === '#' ? String.fromCharCode(+e.slice(1)) : (ENT[e] || m));

// ---------- Texto limpio: quitar cabeceras de página del DOUE, guiones de corte y unir líneas partidas ----------
const BASURA = /^(ES|Diario Oficial de la Unión Europea|L \d+\/\d+|\d{1,2}\.\d{1,2}\.\d{4}|\d+)$/;
const INICIO = /^(Artículo \d|CAPÍTULO|SECCIÓN|TÍTULO|ANEXO|\(\d+\)|\d+\.\s|\d+\s*bis\.|[a-z]\)\s|[ivx]+\)\s|—|–|-\s|•)/;
function cargarFuente(tema, nombres) {
  const d = path.join(DIR, 'tema' + tema); if (!fs.existsSync(d)) return null;
  const lineas = [];
  for (const f of (nombres ? nombres.map(n => n + '.txt') : fs.readdirSync(d).filter(f => f.endsWith('.txt')).sort())) {
    if (!fs.existsSync(path.join(d, f))) continue;
    const raw = fs.readFileSync(path.join(d, f), 'utf8').replace(/\r/g, '').replace(/­\s*/g, '').replace(/[ \t]+/g, ' ');
    let prev = null;
    for (let l of raw.split('\n')) {
      l = l.trim(); if (!l || BASURA.test(l)) continue;
      // línea partida a mitad de frase (PDF): se une a la anterior
      if (prev !== null && !/[.:;]$/.test(lineas[prev]) && /^[a-záéíóúñ(«,]/.test(l) && !INICIO.test(l)) { lineas[prev] += ' ' + l; continue; }
      lineas.push(l); prev = lineas.length - 1;
    }
    lineas.push('');                       // separador entre normas
  }
  const txt = lineas.join('\n');
  // índice normalizado -> posición en el texto original
  let norm = '', pos = [];
  for (let i = 0; i < txt.length; i++) { const k = clave(txt[i]); for (const c of k) { norm += c; pos.push(i); } }
  return { txt, norm, pos };
}

function todas(hay, aguja, desde = 0, hasta = Infinity) {
  const r = []; let i = hay.indexOf(aguja, desde);
  while (i >= 0 && i <= hasta) { r.push(i); i = hay.indexOf(aguja, i + 1); }
  return r;
}
const MAX = 3500;            // caracteres normalizados como máximo entre el antes y el después
// Un hueco que cruza el título de otro artículo o capítulo es una coincidencia falsa: se marca con FALSO y se descarta.
const FALSO = '#FALSO#', MAXHUECO = 1500;
const limpia = s => /\n(Artículo \d|CAPÍTULO|SECCIÓN|TÍTULO|ANEXO)/.test(s) ? FALSO : s.replace(/\s+/g, ' ').trim();

// Devuelve [texto literal que falta entre «antes» y «después», posición] o null si no se encuentra.
// «cur» = posición del último hueco encontrado en el mismo tema: si un ancla sale varias veces, se coge la siguiente.
function hueco(F, antes, despues, cur) {
  const a = clave(antes), d = clave(despues);
  const finLinea = i => { const j = F.txt.indexOf('\n', i); return j < 0 ? F.txt.length : j; };
  const iniLinea = i => F.txt.lastIndexOf('\n', i - 1) + 1;
  const elige = occ => occ.length === 1 ? occ[0] : (occ.find(o => o >= cur) ?? null);
  // 1) antes y después: el par con el hueco más corto
  if (a.length >= 8) {
    for (const la of [60, 40, 25, 15, 8]) {
      const A = a.slice(-la);
      const occA = todas(F.norm, A); if (!occA.length) continue;
      if (d.length >= 6) {
        let mejor = null;
        for (const ld of [60, 40, 25, 15, 6]) {
          const D = d.slice(0, ld);
          for (const ia of occA) {
            const fa = ia + A.length, occD = todas(F.norm, D, fa, fa + MAX);
            if (!occD.length) continue;
            const g = occD[0] - fa, mg = mejor && mejor[1] - mejor[0];
            if (!mejor || g < mg || (g === mg && fa >= cur && mejor[0] < cur)) mejor = [fa, occD[0]];
          }
          if (mejor) break;
        }
        if (mejor) return [mejor[1] === mejor[0] ? '' : limpia(F.txt.slice(F.pos[mejor[0] - 1] + 1, F.pos[mejor[1]])), mejor[1]];
      } else {
        // (…) al final del párrafo: hasta el final de ese párrafo del temario
        const ia = la >= 25 ? (elige(occA) ?? occA[0]) : elige(occA); if (ia === null) continue;
        const ini = F.pos[ia + A.length - 1] + 1;
        let s = F.txt.slice(ini, finLinea(ini));
        if (/^[.;,:]\s*$/.test(despues.trim())) s = s.replace(/[.;,:]\s*$/, '');
        return [/^\s*[.;,:]?\s*$/.test(s) ? '' : limpia(s), ia];
      }
    }
  }
  // 2) (…) al principio del párrafo: desde el principio de ese párrafo del temario hasta el después
  if (d.length >= 12) {
    for (const ld of [60, 40, 25, 12]) {
      const id = elige(todas(F.norm, d.slice(0, ld))); if (id === null) continue;
      const fin = F.pos[id]; let s = F.txt.slice(iniLinea(fin), fin);
      // si el esquema ya pone el número del apartado («4.», «b)») se quita del hueco
      const m = s.match(/^\s*(\(?\d+\s*(bis|ter|quater|quinquies|sexies|septies|octies)?[.)]|\([a-z]\)|[a-z]\)|[ivx]+\))\s*/i);
      if (m && a.endsWith(clave(m[0]))) s = s.slice(m[0].length);
      return [limpia(s), id];
    }
  }
  return null;
}

// Para buscar se quitan las notas propias del esquema: «Art. 36.3.», «[aprehendidos en el cruce…]»
const ancla = s => s.replace(/\[[^\]]*\]/g, ' ')
  .replace(/^\s*(Arts?\.|Artículos?|Considerandos?)\s*[\d.,\sy]+(bis|ter|quater)?\s*(\([^)]*\))?\s*[.:—-]?/, ' ');

// ---------- Recorrer los esquemas ----------
const esquemas = cargarEsquemas();
// huecos sacados a mano de otras fuentes (p. ej. versión consolidada de EUR-Lex): prompts/temario-limpio/temaN/_extra.json {clave:texto}
const EXTRA = {};
for (let t = 1; t <= 27; t++) { const p = path.join(DIR, 'tema' + t, '_extra.json'); if (fs.existsSync(p)) EXTRA[t] = JSON.parse(fs.readFileSync(p, 'utf8')); }
const HUECOS = {}; let total = 0, hechos = 0;
esquemas.forEach((es, i) => {
  const t = String(i + 1); if (!es.html || !fs.existsSync(path.join(DIR, 'tema' + t))) return;
  const bj = path.join(DIR, 'tema' + t, '_bloques.json'), BLQ = fs.existsSync(bj) ? JSON.parse(fs.readFileSync(bj, 'utf8')) : null;
  const cache = {}, fuente = b => cache[b] || (cache[b] = cargarFuente(t, BLQ && BLQ[b]));
  const titulos = [...es.html.matchAll(/<div class="bloque-titulo">\s*(\d+\.\d+)/g)].map(x => [x.index, x[1]]);
  const ANC = [];
  const res = {}, fallos = [], revisar = []; let n = 0, cur = 0;
  for (const m of es.html.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const txt = textoPlano(m[2]); if (!txt.includes(ELIP)) continue;
    const bq = (titulos.filter(x => x[0] < m.index).pop() || [0, ''])[1], F = fuente(bq); if (!F) continue;
    const partes = txt.split(ELIP);
    for (let k = 0; k < partes.length - 1; k++) {
      n++;
      const antes = partes[k], despues = partes[k + 1];
      const key = clave(antes).slice(-40) + '|' + clave(despues).slice(0, 40);
      const ea = ancla(antes), ed = ancla(despues);
      ANC.push([bq, key, ea, ed]);
      let r = (EXTRA[t] && EXTRA[t][key]) ? [EXTRA[t][key], cur] : hueco(F, ea, ed, cur);
      if (r && (r[0] === FALSO || r[0].length > MAXHUECO)) r = null;
      // si el esquema ya muestra el punto o la coma de unión, no se repite en el hueco
      if (r) {
        r[0] = r[0].replace(/^[.;,:]\s+/, x => /[.;,:]\s*$/.test(antes) ? '' : x).replace(/\s*[.;,:]$/, x => /^\s*[.;,:]/.test(despues) ? '' : x);
        cur = r[1];
        if (r[0]) { res[key] = r[0]; revisar.push(antes.slice(-50) + ' ⟦' + r[0] + '⟧ ' + despues.slice(0, 40)); }
      }
      else fallos.push('… ' + antes.slice(-70) + ' (…) ' + despues.slice(0, 50) + ' …');
    }
  }
  total += n; hechos += Object.keys(res).length;
  HUECOS[t] = res;
  console.log(`Tema ${t}: ${n} (…), ${Object.keys(res).length} con texto, ${fallos.length} sin encontrar`);
  if (process.argv.includes('--anclas') && VER === t) fs.writeFileSync(path.join(os.tmpdir(), 'anclas-' + t + '.json'), JSON.stringify(ANC));
  if (VER === t) {
    fallos.forEach(f => console.log('   ✗ ' + f.replace(/\s+/g, ' ')));
    fs.writeFileSync(path.join(os.tmpdir(), 'huecos-' + t + '.txt'), revisar.map(x => x.replace(/\s+/g, ' ')).join('\n\n'));
  }
});

let h = fs.readFileSync(ESQ, 'utf8');
const tag = '<script id="huecos-temario">window.HUECOS=' + JSON.stringify(HUECOS).replace(/<\//g, '<\\/') + '</script>';
if (h.includes('<script id="huecos-temario">')) h = h.replace(/<script id="huecos-temario">[\s\S]*?<\/script>/, () => tag);
else h = h.replace('<script id="mapa-preguntas">', () => tag + '\n<script id="mapa-preguntas">');
fs.writeFileSync(ESQ, h);
console.log(`Total: ${hechos} de ${total} (…) con su texto literal → esquemas.html`);
