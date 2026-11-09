// ⚡ EXPRÉS del Tema 19 (Derecho Penal. Parte Especial). Formato del Tema 2/10/15/17/18: apartados con pregunta OFICIAL, marca suya (EXAMEN/EXOF/EX/✱ → data-ex) o ficha R ENTEROS;
// lo que solo tiene preguntas de IA, en título + 🎯. TODOS los cuadros de tema19/visuales-t19.js pasan al Exprés (pauta 26/10 y 28/10/2026): en los artículos que el cuadro cubre
// por entero (16, 97, 98 y 133) SUSTITUYE al artículo (no salen los dos); en los que solo cubre una parte salen el cuadro y los apartados que el cuadro no responde.
// Tope: 196 págs de temario → 35 págs de Exprés (tramo 150-200). Uso: node prompts/herramientas/expres-t19.js
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, RUN_MIN: 60, GRIS_PLIEGA: 'todo', ENTERO_MAX: 1500, OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(19);
const V19 = require('./tema19/visuales-t19.js');
// cabecera de la ficha de cada cuadro, en el MISMO orden que visuales-t18.js
const CAB = ['Artículo 140', 'Artículo 145', 'Artículo 165', 'Artículo 169', 'Artículo 172', 'Artículo 180', 'Artículo 181', 'Artículo 187', 'Artículo 196', 'Artículo 236', 'Artículo 237', 'Artículo 207', 'Artículo 210', 'Artículo 253', 'Artículo 310', 'Artículo 379', 'Artículo 406', 'Artículo 422', 'Artículo 424', 'Artículo 430', 'Artículo 449', 'Artículo 468', 'Artículo 471', 'Artículo 509', 'Artículo 533', 'Artículo 556', 'Artículo 570 ter', 'Artículo 606', 'Artículo 616 ter'];
if (CAB.length !== V19.length) throw new Error(`hay ${V19.length} cuadros y ${CAB.length} cabeceras`);
const Vcab = V19.map(([, , h], i) => [CAB[i], h]);
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 1e6), CAB: +(process.env.CAB || 6), ANT: +(process.env.ANT || 5) };
const nivel = (k, p, f) => {
  const fuerte = f.ps.some(x => /data-ex="[^"]*(?:EXOF|EX)/.test(x.at)) || /·\s*R\d/.test(f.cab);
  const ast = f.ps.some(x => /data-ex=/.test(x.at));
  if (process.env.OF_VENT && p.of && !fuerte) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.of || fuerte) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (ast) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };
// fichas que el cuadro sustituye por entero (el literal no sale; sus preguntas siguen enlazadas desde el propio cuadro o su botón 🎯)
const limpia = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const SUSTITUYE = [];
const fichasFuera = new Set(X.fichas.map((f, k) => [k, limpia(f.cab)]).filter(([, c]) => SUSTITUYE.some(s => c === s || c.startsWith(s + ' ') || c.startsWith(s + '○'))).map(([k]) => k));
const OMITIR = { nivel, fichas: fichasFuera, conCuadro: true };
const EXTRAS = {};
const H0 = X.automatico(Vcab, EXTRAS, OMITIR);
const S = X.asignaSueltas(H0);
const H = X.automatico(Vcab, Object.assign(EXTRAS, S.extras), OMITIR) + S.html;
console.log(`Fichas sustituidas por su cuadro: ${fichasFuera.size} · preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);
module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 19', k0: 0, k1: 999 }]);
