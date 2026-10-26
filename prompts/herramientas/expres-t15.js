// ⚡ EXPRÉS del Tema 15 (Violencia de género). Formato del Tema 2/10 (16/10/2026): apartados con pregunta OFICIAL, marca suya (EXOF/EX/✱ → data-ex) o ficha R ENTEROS;
// lo que solo tiene preguntas de IA, en título + 🎯; todos los cuadros de visuales-t15.js (los de fichas con cabecera tras su ficha; los de Instrucciones/Protocolos
// —fichas sin cabecera— juntos al final). Tope 35 págs (tramo 150 págs → 30-35). Uso: node prompts/herramientas/expres-presupuesto.js 15 35
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, UNO: 0.8, RUN_MIN: 60, GRIS_PLIEGA: 'todo', ENTERO_MAX: 1500, OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(15);
const V15 = require('./tema15/visuales-t15.js');
const CAB = { lo: 'Artículo 29' };
const Vcab = V15.filter(([n]) => CAB[n]).map(([n, , h]) => [CAB[n], h]);
const sueltos = V15.filter(([n]) => !CAB[n]).map(([, , h]) => h);
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 1e6), CAB: +(process.env.CAB || 6), ANT: +(process.env.ANT || 5) };
const nivel = (k, p, f) => {
  const fuerte = f.ps.some(x => /data-ex=\?"[^"]*(?:EXOF|EX)/.test(x.at)) || /·s*Rd+/.test(f.cab);
  const ast = f.ps.some(x => /data-ex=/.test(x.at));
  if (process.env.OF_VENT && p.of && !fuerte) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.of || fuerte) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (ast) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };
const EXTRAS = {};
const H0 = X.automatico(Vcab, EXTRAS, { uno: +process.env.UNO, nivel });
const S = X.asignaSueltas(H0);
const H = X.automatico(Vcab, Object.assign(EXTRAS, S.extras), { uno: +process.env.UNO, nivel }) + S.html + X.bloque('CUADROS DEL TEMARIO (Instrucciones y Protocolos)') + sueltos.join('');
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);
module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 15', k0: 0, k1: 999 }]);
