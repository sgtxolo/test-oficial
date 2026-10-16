// ⚡ EXPRÉS del Tema 3 (Tratados de la UE: TUE y TFUE). Formato LITERAL + CUADROS por NIVELES (pautas del usuario 14-15/10/2026):
//   · por artículo, O el literal O el cuadro (nunca los dos; cuadro solo si recoge la respuesta de ≥ 80 % de sus preguntas);
//   · NIVELES: artículo con alguna pregunta oficial o con alguna marca suya (data-ex) → frases con pregunta ENTERAS; muy preguntado
//     por IA (peso 3·oficiales + IA ≥ ALTO) → también enteras; poco (sin oficiales ni marcas y ≤ BAJO IA) → solo título + 🎯;
//     el resto → ventana amplia (arranque de la frase + unas palabras antes de la respuesta);
//   · sin parte final RECUERDA (las R ya llevan su sello «R n» en el párrafo de su apartado: data-r) y sin mapas de artículos;
//   · fuera las preguntas cuya respuesta es solo «el artículo X» (preguntas-articulo.js).
// Uso: node prompts/herramientas/expres-t3.js     (ajustables: ALTO=15 BAJO=4 CAB=10 ANT=8 en el entorno)
const X = require('./expres-lib.js')(3);
const V = require('./visuales-t3.js');
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 10, antes: 8, umbral: 160, sinRespPliega: true });
const N = { ALTO: +(process.env.ALTO || 15), BAJO: +(process.env.BAJO || 4), CAB: +(process.env.CAB || 10), ANT: +(process.env.ANT || 8) };
const nivel = (k, p, f) => { const marca = f.ps.some(x => /data-ex=/.test(x.at)), peso = 3 * p.of + p.ia;
  if (p.of || marca || peso >= N.ALTO) return { recorte: 'frases', media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };

// 1.ª pasada → qué preguntas quedan sueltas; 2.ª: las que tienen artículo seguro van a su ficha (EXTRAS) y las demás a un grupo final
const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: 0.8, nivel });
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: 0.8, nivel }) + S.html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };   // los cuadros ya están en el esquema normal (visuales-t3.js)
const k1 = X.fichaBloque.findIndex(t => /^RECUERDA/.test(t));
if (require.main === module) X.publica(H, [{ nombre: 'Tema 3', k0: 0, k1: (k1 > 0 ? k1 : X.fichas.length) - 1 }]);
