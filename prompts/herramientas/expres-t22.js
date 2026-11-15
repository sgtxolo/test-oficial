// ⚡ EXPRÉS del Tema 22 (Seguridad Ciudadana: LO 9/1983, LO 7/2021 y LO 4/2015). Formato del Tema 2/10/15/17/18/19: apartados con pregunta OFICIAL, marca suya (EXAMEN/EXOF/EX/✱ → data-ex) o ficha R ENTEROS;
// lo que solo tiene preguntas de IA, en título + 🎯. TODOS los cuadros de tema22/visuales-t22.js pasan al Exprés (pauta 26/10 y 28/10/2026): en los artículos que el cuadro cubre
// por entero SUSTITUYE al artículo (no salen los dos); en los demás salen el cuadro y los apartados que el cuadro no responde.
// La cabecera de cada cuadro se calcula sola (artículo del esquema que contiene su localizador). Tope: ≈56 págs de mi PDF → 20-25 págs de Exprés. Uso: node prompts/herramientas/expres-t22.js
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, RUN_MIN: 60, GRIS_PLIEGA: 'todo', ENTERO_MAX: 1500, OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const fs = require('fs'), path = require('path'), vm = require('vm');
const X = require('./expres-lib.js')(22);
const V22 = require('./tema22/visuales-t22.js');
// cabecera de la ficha de cada cuadro = artículo del esquema (esquemas-datos/t22.js) que contiene su localizador
const win = {}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', '..', 'esquemas-datos', 't22.js'), 'utf8'), { window: win });
const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
const ESQ = (win.ESQ_TXT['T22.reunion'] + win.ESQ_TXT['T22.datos'] + win.ESQ_TXT['T22.cp']).replace(/<!--VIS22-->[\s\S]*?<!--\/VIS22-->/g, '');
const ARTS = []; { let pos = 0; for (;;) { const a = ESQ.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = ESQ.indexOf('</div></div></div>', a) + 18; const m = ESQ.slice(a, b).match(/articulo-head">([^<]+)</); ARTS.push([m ? m[1] : '', norm(ESQ.slice(a, b))]); pos = a + 20; } }
const CAB = V22.map(([, loc]) => { const k = norm(loc); const f = ARTS.find(([, t]) => t.includes(k)); if (!f) throw new Error('localizador sin artículo: ' + loc.slice(0, 50)); return f[0]; });
const Vcab = V22.map(([, , h], i) => [CAB[i], h]);
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
console.log(`Cuadros: ${V22.length} · fichas sustituidas por su cuadro: ${fichasFuera.size} · preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);
module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 22', k0: 0, k1: 999 }]);
