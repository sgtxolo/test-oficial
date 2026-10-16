// ⚡ EXPRÉS del Tema 1 (Derechos humanos: Estatuto de Roma, LO 18/2003, Carta UE, Consejo de Europa, CEDH, Acuerdo de
// Privilegios de la CPI + historia). Formato LITERAL + CUADROS (pauta del usuario 14/10/2026: «la literalidad del artículo,
// porque es lo que sale en el examen», máximo 25 págs):
//   · por artículo, O el literal O el cuadro del temario (nunca los dos): cuadro solo si contiene la respuesta de ≥80 % de sus
//     preguntas (oficiales e IA); si no, el literal recortado: de cada frase con respuesta se ve su arranque y la respuesta
//     con unas palabras delante; lo demás queda en un (…) que se despliega con el texto literal;
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t1.js
// configuración vigente = la del Tema 2 (16/10/2026, formato definitivo): oficial / marca suya (EXAMEN, EXOF, EX, ✱) / R → apartado
// ENTERO; lo que solo tiene IA → recortado con (…); poco preguntado por IA (≤ BAJO) → solo título + 🎯; parrafadas sin subrayar y
// grises largos en (…); cuadro solo si recoge ≥ 80 % de las respuestas; sin vecinos
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, UNO: 0.8, RUN_MIN: 90, GRIS_PLIEGA: 'cifra' }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(1);
const V = require('./visuales-t1.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 4), CAB: +(process.env.CAB || 6), ANT: +(process.env.ANT || 5) };
const nivel = (k, p, f) => { const marca = f.ps.some(x => /data-ex=/.test(x.at));
  if (p.of || marca) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };

// rangos y fichas por su cabecera (no por índice: cambian al añadir fichas marcadas)
const cab = k => X.fichas[k].cab.replace(/<[^>]+>/g, '');
const ini = re => X.fichas.findIndex((f, k) => re.test(cab(k)));
// preguntas que el mapa no sitúa en un párrafo: { cabecera de la ficha: [ids] } → botón «🎯 … más de este artículo» en su ficha
const EXT = [[/^Artículos 7 y 8 —/, ['1-148']], [/^Artículos 15 y 15 bis/, ['1-ia-1550']], [/^Artículo 19 — Impugnación/, ['1-ia-1565']], [/^Artículos 58 y 59/, ['1-153']],
  [/^Artículos 91 y 92/, ['1-ia-1668', '1-228']], [/^Artículo 93 —/, ['1-ia-1678', '1-ia-1679', '1-ia-1681', '1-ia-1684']], [/^Artículo 12 — De la libertad provisional/, ['1-ia-1032']],
  [/^Artículo 21 — De las personas sujetas/, ['1-ia-1052']], [/^Artículo 45 — Libertad de circulación/, ['1-ia-1155']], [/^Artículos 2, 4 y 5 — Vida/, ['1-ia-1309']],
  [/^Protocolo n.º 7 /, ['1-ia-1422', '1-ia-1430', '1-ia-1432']], [/^Artículo 19 — Testigos/, ['1-ia-1744']], [/^Artículo 23 — Nacionales y residentes/, ['1-ia-1753']]];
const EXTRAS = {}; EXT.forEach(([re, ids]) => { const k = ini(re); if (k >= 0) EXTRAS[k] = (EXTRAS[k] || []).concat(ids); else console.error('sin ficha para', re); });
const H = X.automatico(V, EXTRAS, { uno: +process.env.UNO, nivel });

module.exports = { visuales: () => [] };   // el esquema normal ya tiene sus 71 cuadros (visuales-t1.js)
const CORTES = [['1.5 Estatuto de Roma', /^Artículos 5 y 6 — Crímenes/], ['1.1 LO 18/2003', /^Exposición de motivos/], ['1.2 Carta UE', /^Datos y estructura de la Carta/],
  ['1.3 Consejo de Europa', /^Preámbulo del Estatuto del Consejo|^Artículo 1 — Finalidad/], ['1.4 CEDH', /^Artículos 2, 4 y 5 — Vida/], ['1.6 Acuerdo de Privilegios', /^Artículos 1, 2, 4, 5, 6 y 7 — Términos/],
  ['Anexo historia', /^Antecedentes y declaraciones/]].map(([n, re]) => [n, ini(re)]);
if (require.main === module) X.publica(H, CORTES.map(([nombre, k0], i) => ({ nombre, k0, k1: (CORTES[i + 1] ? CORTES[i + 1][1] : X.fichas.length) - 1 })));
