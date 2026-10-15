// ⚡ EXPRÉS del Tema 2 (Terrorismo y delincuencia transnacional). Formato LITERAL + CUADROS (pauta del usuario, 14/10/2026), máx. 25 págs:
//   · por artículo, O el literal O el cuadro del temario/esquema (nunca los dos): cuadro solo si recoge la respuesta de ≥ 80 % de las
//     preguntas del artículo (oficiales e IA); si no, el literal recortado: de cada frase con respuesta se ve su arranque y la
//     respuesta con unas palabras delante; lo demás queda en un (…) que se despliega con el texto literal (y se puede subrayar);
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Los cuadros son los de visuales-t2.js (los mismos que el esquema normal; los de la Ley 19/2003, Ley 10/2010, Palermo y Protocolos
// salen de esquemas-t2.js). Uso: node prompts/herramientas/expres-t2.js
const X = require('./expres-lib.js')(2);
const V = require('./visuales-t2.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });

// preguntas que el mapa no sitúa en un párrafo: { k: [ids] } → botón «🎯 … más de este artículo» en su ficha
const EXTRAS = { 8: ['2-ia-78'], 12: ['2-17'], 27: ['2-45'] };   // (índices de ficha a 15/10/2026, tras añadir las fichas marcadas)
// NIVELES (pautas 15/10/2026: «leyendo solo sale la pregunta del examen y no te enteras de nada», pero 1 h-1 h 30 min;
// y lo importante = preguntas OFICIALES de la app + sus marcas del temario EXOF / EXAMEN / EX / asterisco):
//   · artículo con alguna pregunta oficial o con alguna marca suya (data-ex) → frases con pregunta ENTERAS;
//   · muy preguntado por IA (peso 3·oficiales + IA ≥ 15) → también enteras;
//   · poco (sin oficiales ni marcas y ≤ 4 IA) → solo el título del artículo y su 🎯;
//   · el resto → ventana amplia (arranque de la frase + unas palabras antes de la respuesta).
// Y al abrir cada norma, un MAPA con sus artículos y lo que se pregunta de cada uno.
const N = { ALTO: +(process.env.ALTO || 15), BAJO: +(process.env.BAJO || 4), CAB: +(process.env.CAB || 10), ANT: +(process.env.ANT || 8) };
const nivel = (k, p, f) => { const marca = f.ps.some(x => /data-ex=/.test(x.at)), peso = 3 * p.of + p.ia;
  if (p.of || marca || peso >= N.ALTO) return { recorte: 'frases', media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };
const H = X.automatico(V, EXTRAS, { uno: 0.8, nivel, mapa: true });

module.exports = { visuales: () => [] };   // el esquema normal ya tiene sus cuadros (visuales-t2.js)
// rangos de fichas de cada norma, sacados de los títulos de bloque (no a mano: cambian al añadir fichas)
const ini = re => X.fichaBloque.findIndex(t => re.test(t));
const CORTES = [['2.1 Ley 19/2003', /RÉGIMEN GENERAL DE LOS MOVIMIENTOS/], ['2.2 Convenio 196', /^2\.2/], ['2.3 Ley 10/2010', /^2\.3|^CAPÍTULO I\. DISPOSICIONES GENERALES/],
  ['2.4 Palermo', /^2\.4/], ['2.5 Trata', /^2\.5/], ['2.6 Migrantes', /^2\.6/], ['2.7 Armas', /^2\.7/], ['RECUERDA R1-R39', /^RECUERDA/]].map(([n, re]) => [n, ini(re)]);
if (require.main === module) X.publica(H, CORTES.map(([nombre, k0], i) => ({ nombre, k0, k1: (CORTES[i + 1] ? CORTES[i + 1][1] : X.fichas.length) - 1 })));
