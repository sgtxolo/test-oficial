// ⚡ EXPRÉS del Tema 4 (Schengen 2016/399, Frontex 2019/1896, Convenio de Prüm, Decisión 2008/615/JAI, R. 2024/1349 y R. 2021/581).
// Formato definitivo del Tema 2 (16/10/2026): apartados con pregunta OFICIAL, marca suya (EXAMEN / EXOF / EX / ✱ → data-ex) o ficha R ENTEROS;
// lo que solo tiene preguntas de IA, recortado con (…); poco preguntado por IA (≤ BAJO) → título + 🎯; parrafadas sin subrayar y grises largos en (…);
// cuadro en lugar del literal solo si recoge ≥ 80 % de las respuestas. Tope del usuario para este tema: ENTRE 40 Y 50 págs como máximo
// (autorizó quitar preguntas IA propias si hace falta). Mandos por entorno: ASTERISCO=entero|ventana (por defecto ventana: el ✱ sale recortado con su sello), BAJO, ENTERO_MAX, UNO…
// Uso: node prompts/herramientas/expres-t4.js
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, UNO: 0.8, RUN_MIN: 60, GRIS_PLIEGA: 'todo', ENTERO_MAX: 1500, OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(4);
let V = []; try { V = require('./visuales-t4.js'); } catch (e) {}
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 1e6), CAB: +(process.env.CAB || 6), ANT: +(process.env.ANT || 5), AST: process.env.ASTERISCO || 'ventana' };
// niveles (Tema 4, tope 40-50 págs): oficial / EXOF / EX / EXAMEN / ficha R → apartado ENTERO; solo ✱ → «ventana» (arranque + respuestas, el resto en (…)) con su sello;
// solo IA → título + 🎯 (BAJO alto = todas), así las IA no ocupan páginas pero siguen abriéndose desde su botón
const nivel = (k, p, f) => {
  const fuerte = f.ps.some(x => /data-ex=\?"[^"]*(?:EXOF|EX)/.test(x.at)) || /·s*Rd+/.test(f.cab);
  const ast = f.ps.some(x => /data-ex=/.test(x.at));
  if (process.env.OF_VENT && p.of && !fuerte) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.of || fuerte || N.AST === 'entero' && ast) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (ast && N.AST === 'ventana') return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };

// 1.ª pasada → qué preguntas quedan sueltas; 2.ª: las que tienen artículo seguro van a su ficha (EXTRAS) y las demás a un grupo final
const EXTRAS = {};
const H0 = X.automatico(V, EXTRAS, { uno: +process.env.UNO, nivel });
const S = X.asignaSueltas(H0);
const H = X.automatico(V, Object.assign(EXTRAS, S.extras), { uno: +process.env.UNO, nivel }) + S.html;
console.log(`Preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);

module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 4', k0: 0, k1: 999 }]);
