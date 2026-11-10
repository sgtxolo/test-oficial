// ⚡ EXPRÉS del Tema 21 (Derecho Procesal Penal I: LECrim). Formato del Tema 2/10/15/17/18/19: apartados con pregunta OFICIAL, marca suya (EXAMEN/EXOF/EX/✱ → data-ex) o ficha R ENTEROS;
// lo que solo tiene preguntas de IA, en título + 🎯. TODOS los cuadros de tema21/visuales-t21.js pasan al Exprés (pauta 26/10 y 28/10/2026): en los artículos que el cuadro cubre
// por entero SUSTITUYE al artículo (no salen los dos); en los demás salen el cuadro y los apartados que el cuadro no responde.
// La cabecera de cada cuadro se calcula sola (artículo del esquema que contiene su localizador). Tope: 150 págs de mi PDF → 30-35 págs de Exprés. Uso: node prompts/herramientas/expres-t21.js
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, RUN_MIN: 60, GRIS_PLIEGA: 'todo', ENTERO_MAX: 1500, OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const fs = require('fs'), path = require('path'), vm = require('vm');
const X = require('./expres-lib.js')(21);
const V21 = require('./tema21/visuales-t21.js');
// cabecera de la ficha de cada cuadro = artículo del esquema (esquemas-datos/t21.js) que contiene su localizador
const win = {}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', '..', 'esquemas-datos', 't21.js'), 'utf8'), { window: win });
const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
const ESQ = win.ESQ_TXT['T21.leyes'].replace(/<!--VIS21-->[\s\S]*?<!--\/VIS21-->/g, '');
const ARTS = []; { let pos = 0; for (;;) { const a = ESQ.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = ESQ.indexOf('</div></div></div>', a) + 18; const m = ESQ.slice(a, b).match(/articulo-head">([^<]+)</); ARTS.push([m ? m[1] : '', norm(ESQ.slice(a, b))]); pos = a + 20; } }
const CAB = V21.map(([, loc]) => { const k = norm(loc); const f = ARTS.find(([, t]) => t.includes(k)); if (!f) throw new Error('localizador sin artículo: ' + loc.slice(0, 50)); return f[0]; });
const Vcab = V21.map(([, , h], i) => [CAB[i], h]);
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
const SUSTITUYE = (process.env.SUSTITUYE || '').split('|').filter(Boolean);
const fichasFuera = new Set(X.fichas.map((f, k) => [k, limpia(f.cab)]).filter(([, c]) => SUSTITUYE.some(s => c === s || c.startsWith(s + ' ') || c.startsWith(s + '○'))).map(([k]) => k));
const OMITIR = { nivel, fichas: fichasFuera, conCuadro: true };
const EXTRAS = {};
const H0 = X.automatico(Vcab, EXTRAS, OMITIR);
const S = X.asignaSueltas(H0);
const H = X.automatico(Vcab, Object.assign(EXTRAS, S.extras), OMITIR) + S.html;
console.log(`Cuadros: ${V21.length} · fichas sustituidas por su cuadro: ${fichasFuera.size} · preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);
module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 21', k0: 0, k1: 999 }]);
