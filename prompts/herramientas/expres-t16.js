// ⚡ EXPRÉS del Tema 16 (Igualdad efectiva y acoso). Formato del Tema 2/10/15/17: apartados con pregunta OFICIAL, marca suya (EXAMEN/EXOF/EX/✱ → data-ex) o ficha R ENTEROS;
// lo que solo tiene preguntas de IA, en título + 🎯. TODOS los cuadros de visuales-t16.js pasan al Exprés (pauta 26/10 y 28/10/2026): en los artículos que el cuadro cubre por entero
// SUSTITUYE al artículo (no salen los dos); en los que solo cubre una parte (2.2.2, 2.3, 2.4, arts. 7) salen el cuadro y los apartados que el cuadro no responde.
// Tope: ≈42 págs de temario → 20-25 págs de Exprés. Uso: node prompts/herramientas/expres-t16.js   (o expres-presupuesto.js 16 25)
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, RUN_MIN: 60, GRIS_PLIEGA: 'todo', ENTERO_MAX: 1500, OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(16);
const V16 = require('./tema16/visuales-t16.js');
// cabecera de la ficha de cada cuadro, en el MISMO orden que visuales-t16.js
const CAB = ['Artículo 7 — Acoso sexual y acoso por razón de sexo', 'Artículo 11 — Acciones positivas', 'Artículo 12 — Tutela judicial efectiva', 'Artículo 64 — Plan de Igualdad', 'Artículo 67 — Respeto del principio de igualdad',
  'Artículo 68 — Aplicación de las normas referidas al personal de las administraciones públicas en las Fuerzas y Cuerpos', 'Protocolo · 2.2 Objetivos · 2.2.1', 'Protocolo · 2.2 Objetivos · 2.2.2', 'Protocolo · 2.3 Garantías de actuación', 'Protocolo · 2.4 Definiciones',
  'Protocolo · IV. Procedimiento · 4.1', 'Protocolo · IV. Procedimiento · 4.5', 'Protocolo · VI. Implantación', 'Protocolo · Anexo II', 'Protocolo · Anexo III'];
if (CAB.length !== V16.length) throw new Error(`hay ${V16.length} cuadros y ${CAB.length} cabeceras`);
const Vcab = V16.map(([, , h], i) => [CAB[i], h]);
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 1e6), CAB: +(process.env.CAB || 6), ANT: +(process.env.ANT || 5) };
const nivel = (k, p, f) => {
  const fuerte = f.ps.some(x => /data-ex="[^"]*(?:EXOF|EX)/.test(x.at)) || /·\s*R\d+/.test(f.cab);
  const ast = f.ps.some(x => /data-ex=/.test(x.at));
  if (process.env.OF_VENT && p.of && !fuerte) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.of || fuerte) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (ast) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };
// fichas que el cuadro sustituye por entero (el literal no sale; sus preguntas siguen enlazadas desde el propio cuadro o su botón 🎯)
const limpia = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const SUSTITUYE = ['Artículo 6 —', 'Artículo 11 —', 'Artículo 12 —', 'Artículo 64 —', 'Artículo 65 —', 'Artículo 66 —', 'Artículo 67 —', 'Artículo 68 —', 'Protocolo · 2.2 Objetivos · 2.2.1', 'Protocolo · IV. Procedimiento · 4.1',
  'Protocolo · VI. Implantación', 'Protocolo · Anexo II', 'Protocolo · Anexo III'];
const fichasFuera = new Set(X.fichas.map((f, k) => [k, limpia(f.cab)]).filter(([, c]) => SUSTITUYE.some(s => c.startsWith(s))).map(([k]) => k));
const OMITIR = { nivel, fichas: fichasFuera, conCuadro: true };
const EXTRAS = {};
const H0 = X.automatico(Vcab, EXTRAS, OMITIR);
const S = X.asignaSueltas(H0);
const H = X.automatico(Vcab, Object.assign(EXTRAS, S.extras), OMITIR) + S.html;
console.log(`Fichas sustituidas por su cuadro: ${fichasFuera.size} · preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);
module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 16', k0: 0, k1: 999 }]);
