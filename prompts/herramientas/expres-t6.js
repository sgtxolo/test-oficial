// ⚡ EXPRÉS del Tema 6. Mismo formato que el Tema 3 (16/10/2026):
// oficial / marca suya (EXAMEN, EXOF, EX, ✱) / R → apartado ENTERO; solo IA → recortado con (…); poco preguntado por IA → título + 🎯;
// por artículo o el literal o el cuadro (el que ocupe menos: MIDE=1 → tema6/sin-cuadro-t6.json); sin RECUERDA final; fuera las preguntas de «solo artículo».
// Tope 25 págs (68 págs de temario): artículos con solo ✱ (sin EX/EXOF/R) → ventana alrededor de cada respuesta (OF_VENT), no entero.
// Uso: MIDE=1 node prompts/herramientas/expres-t6.js && node prompts/herramientas/expres-t6.js   (ajustables: BAJO, CAB, ANT y los de expres-lib)
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, UNO: 0.01, RUN_MIN: 20, GRIS_PLIEGA: 'cifra', OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(6);
const V = require('./tema6/visuales-t6.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 12), CAB: +(process.env.CAB || 2), ANT: +(process.env.ANT || 1) };   // tope 25 págs (tema de 68 págs)
const nivel = (k, p, f) => { const marca = f.ps.some(x => /data-ex=/.test(x.at));
  // OF_VENT (como en T4): artículos con oficiales pero sin marca suya → ventana alrededor de cada respuesta, no el apartado entero
  const fuerte = f.ps.some(x => /data-ex="[^"]*EX|data-r=/.test(x.at));   // EX / EXOF / R (el ✱ solo no cuenta aquí)
  if (process.env.OF_VENT && (p.of || marca) && !fuerte) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.of || marca) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };

// Sin la parte final RECUERDA: las preguntas que el mapa colgaba de las fichas RECUERDA pasan al párrafo de su R en el articulado
const MAPA = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', '..', 'esquemas.html'), 'utf8').match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const kRec = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
const sitioR = {};   // 'R16' → [k, j] del párrafo del articulado con el sello R16
X.fichas.forEach((f, k) => { if (k < kRec) f.ps.forEach((p, j) => { const m = p.at.match(/data-r="([^"]*)"/); if (m) m[1].split(/[ ,·]+/).forEach(r => { if (/^R\d+$/.test(r) && !sitioR[r]) sitioR[r] = [k, j]; }); }); });
let movidas = 0;
if (kRec > 0) Object.entries(MAPA).forEach(([id, v]) => { const m = v.match(/^6-(\d+)-(\d+)/); if (!m || +m[1] < kRec) return;
  const r = (X.fichas[+m[1]].ps[+m[2]].h.match(/<b>(R\d+)<\/b>/) || [])[1]; if (r && sitioR[r]) { X.mueve(id, sitioR[r][0], sitioR[r][1]); movidas++; } });
console.log('preguntas de fichas R llevadas a su párrafo del articulado:', movidas);
const RANGO = [0, (kRec > 0 ? kRec : X.fichas.length) - 1];
// por artículo, el cuadro o el literal: el que ocupe menos (tope de págs). MIDE=1 lo calcula y escribe tema6/sin-cuadro-t6.json
const fs = require('fs'), SINC = require('path').join(__dirname, 'tema6', 'sin-cuadro-t6.json');
const largo = h => h.replace(/<span class="ex-plg-t">[\s\S]*?<\/span>/g, '').replace(/<[^>]+>/g, '').length;
if (process.env.MIDE) {
  const sin = [];
  for (let k = RANGO[0]; k <= RANGO[1]; k++) {
    const c = largo(X.automatico(V, {}, { uno: +process.env.UNO, nivel }, [k, k]));
    const l = largo(X.automatico(V, {}, { uno: +process.env.UNO, nivel, sinCuadro: new Set([k]) }, [k, k]));
    if (l < c) sin.push(k);
  }
  fs.writeFileSync(SINC, JSON.stringify(sin.map(k => X.fichas[k].cab.replace(/<[^>]+>/g, ''))));
  console.log('fichas en las que el literal ocupa menos que el cuadro:', sin.length); process.exit(0);
}
const SIN_CUADRO = new Set(fs.existsSync(SINC) ? JSON.parse(fs.readFileSync(SINC, 'utf8')).map(c => X.fichas.findIndex((f, k) => k < kRec && f.cab.replace(/<[^>]+>/g, '') === c)).filter(k => k >= 0) : []);
const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: +process.env.UNO, nivel, sinCuadro: SIN_CUADRO }, RANGO);
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: +process.env.UNO, nivel, sinCuadro: SIN_CUADRO }, RANGO) + S.html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (visuales)
const k1 = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
if (require.main === module) X.publica(H, [{ nombre: 'Tema 6', k0: 0, k1: (k1 > 0 ? k1 : X.fichas.length) - 1 }]);
