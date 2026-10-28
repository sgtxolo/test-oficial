// ⚡ EXPRÉS del Tema 17 (Responsabilidad Penal de los Menores). Formato del Tema 2/10/15: apartados con pregunta OFICIAL, marca suya (EXAMEN/EXOF/EX/✱ → data-ex) o ficha R ENTEROS;
// lo que solo tiene preguntas de IA, en título + 🎯. TODOS los cuadros de visuales-t17.js pasan al Exprés (pauta 26/10 y 28/10/2026): en los artículos que el cuadro cubre por entero
// SUSTITUYE al artículo (no salen los dos); en los que solo cubre una parte (arts. 7, 10, 17, 64) salen el cuadro y los apartados que el cuadro no responde.
// Tope: 63 págs de temario → 20-25 págs de Exprés. Uso: node prompts/herramientas/expres-t17.js   (o expres-presupuesto.js 17 25)
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, RUN_MIN: 60, GRIS_PLIEGA: 'todo', ENTERO_MAX: 1500, OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(17);
const V17 = require('./tema17/visuales-t17.js');
// cabecera de la ficha de cada cuadro, en el MISMO orden que visuales-t17.js
const CAB = ['Artículo 1 — Declaración general', 'Artículo 2 — Competencia de los Jueces', 'Artículo 7 — Definición', 'Artículo 7 — Definición', 'Artículo 10 — Reglas especiales', 'Artículo 10 — Reglas especiales',
  'Artículo 15 — De la prescripción', 'Artículo 17 — Detención', 'Artículo 19 — Sobreseimiento', 'Artículo 20 — Unidad de expediente', 'Artículo 28 — Reglas generales', 'Artículo 28 — Reglas generales',
  'Artículo 61 — Reglas generales', 'Artículo 64 — Reglas de procedimiento', 'Artículo 3 — Modo de llevar a cabo la detención'];
if (CAB.length !== V17.length) throw new Error(`hay ${V17.length} cuadros y ${CAB.length} cabeceras`);
const Vcab = V17.map(([, , h], i) => [CAB[i], h]);
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
// fichas que el cuadro sustituye por entero (el literal no sale; sus preguntas siguen enlazadas desde el propio cuadro o su botón 🎯)
const limpia = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const SUSTITUYE = ['Artículo 1 — Declaración general', 'Artículo 2 — Competencia de los Jueces', 'Artículo 15 — De la prescripción', 'Artículo 19 — Sobreseimiento', 'Artículo 20 — Unidad de expediente', 'Artículo 28 — Reglas generales', 'Artículo 61 — Reglas generales', 'Artículo 3 — Modo de llevar a cabo la detención'];
const fichasFuera = new Set(X.fichas.map((f, k) => [k, limpia(f.cab)]).filter(([, c]) => SUSTITUYE.some(s => c.startsWith(s))).map(([k]) => k));
const OMITIR = { nivel, fichas: fichasFuera, conCuadro: true };
const EXTRAS = {};
const H0 = X.automatico(Vcab, EXTRAS, OMITIR);
const S = X.asignaSueltas(H0);
const H = X.automatico(Vcab, Object.assign(EXTRAS, S.extras), OMITIR) + S.html;
console.log(`Fichas sustituidas por su cuadro: ${fichasFuera.size} · preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);
module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 17', k0: 0, k1: 999 }]);
