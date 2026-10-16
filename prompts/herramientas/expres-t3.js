// ⚡ EXPRÉS del Tema 3 (Tratados de la UE: TUE y TFUE). Formato LITERAL + CUADROS por NIVELES (pautas del usuario 14-15/10/2026):
//   · por artículo, O el literal O el cuadro (nunca los dos; cuadro solo si recoge la respuesta de ≥ 80 % de sus preguntas);
//   · NIVELES: artículo con alguna pregunta oficial o con alguna marca suya (data-ex) → frases con pregunta ENTERAS; muy preguntado
//     por IA (peso 3·oficiales + IA ≥ ALTO) → también enteras; poco (sin oficiales ni marcas y ≤ BAJO IA) → solo título + 🎯;
//     el resto → ventana amplia (arranque de la frase + unas palabras antes de la respuesta);
//   · sin parte final RECUERDA (las R ya llevan su sello «R n» en el párrafo de su apartado: data-r) y sin mapas de artículos;
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t3.js     (ajustables en el entorno: BAJO=4 CAB=6 ANT=5, y los de expres-lib)
// configuración vigente = la del Tema 2 (16/10/2026, formato definitivo): oficial / marca suya (EXAMEN, EXOF, EX, ✱) / R → apartado
// ENTERO; lo que solo tiene IA → recortado con (…); poco preguntado por IA (≤ BAJO) → solo título + 🎯; parrafadas sin subrayar y
// grises largos en (…); cuadro solo si recoge ≥ 80 % de las respuestas; sin vecinos
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, UNO: 0.8, RUN_MIN: 90, GRIS_PLIEGA: 'cifra' }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(3);
const V = require('./visuales-t3.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 4), CAB: +(process.env.CAB || 6), ANT: +(process.env.ANT || 5) };
const nivel = (k, p, f) => { const marca = f.ps.some(x => /data-ex=/.test(x.at));
  if (p.of || marca) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };

// 1.ª pasada → qué preguntas quedan sueltas; 2.ª: las que tienen artículo seguro van a su ficha (EXTRAS) y las demás a un grupo final
const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: +process.env.UNO, nivel });
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: +process.env.UNO, nivel }) + S.html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (visuales-t3.js)
const k1 = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
if (require.main === module) X.publica(H, [{ nombre: 'Tema 3', k0: 0, k1: (k1 > 0 ? k1 : X.fichas.length) - 1 }]);
