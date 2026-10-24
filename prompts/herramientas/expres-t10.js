// ⚡ EXPRÉS del Tema 10. Mismo formato que el Tema 3 (16/10/2026):
// oficial / marca suya (EXAMEN, EXOF, EX, ✱) / R → apartado ENTERO; solo IA → recortado con (…); poco preguntado por IA → título + 🎯;
// por artículo o el literal o el cuadro (cuadro solo si recoge ≥ 80 % de las respuestas); sin RECUERDA final; fuera las preguntas de «solo artículo».
// Uso: node prompts/herramientas/expres-t10.js     (ajustables: BAJO, CAB, ANT y los de expres-lib)
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, UNO: 0, RUN_MIN: 90, GRIS_PLIEGA: 'cifra' }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(10);
const V = require('./tema10/visuales-t10.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 4), CAB: +(process.env.CAB || 6), ANT: +(process.env.ANT || 5) };
const nivel = (k, p, f) => { const marca = f.ps.some(x => /data-ex=/.test(x.at));
  if (p.of || marca) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };

const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: +process.env.UNO, nivel });
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: +process.env.UNO, nivel }) + S.html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (tema10/visuales-t10.js)
const k1 = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
if (require.main === module) X.publica(H, [{ nombre: 'Tema 10', k0: 0, k1: (k1 > 0 ? k1 : X.fichas.length) - 1 }]);
