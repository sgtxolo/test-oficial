// ⚡ EXPRÉS del Tema 27 (Deontología profesional: ONU, Resolución 690, Código Europeo, RD 176/2022, Código de Conducta y OG 10/2024). Mismas reglas que el Exprés del T26. Uso: node prompts/herramientas/expres-t27.js
// lo que solo tiene preguntas de IA, en título + 🎯. TODOS los cuadros de tema23/visuales-t23.js pasan al Exprés (pauta 26/10 y 28/10/2026): en los artículos que el cuadro cubre
// por entero SUSTITUYE al artículo (no salen los dos); en los demás salen el cuadro y los apartados que el cuadro no responde.
// La cabecera de cada cuadro se calcula sola (artículo del esquema que contiene su localizador). Tope: ≈56 págs de mi PDF → 20-25 págs de Exprés. Uso: node prompts/herramientas/expres-t23.js
Object.entries({ VEC_MAX: 0, HUECO_MAX: 1, RUN_MIN: 20, UNO: 0, GRIS_PLIEGA: 'todo', ENTERO_MAX: 1500, OF_VENT: 1 }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const fs = require('fs'), path = require('path'), vm = require('vm');
const X = require('./expres-lib.js')(27);
const V27 = require('./tema27/visuales-t27a.js').map(([, l, h]) => [l, h]).concat(require('./tema27/visuales-t27b.js').map(([, l, h]) => [l, h]));
// cabecera de la ficha de cada cuadro = artículo del esquema (esquemas-datos/t23.js) que contiene su localizador
const win = {}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', '..', 'esquemas-datos', 't27.js'), 'utf8'), { window: win });
const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
const ESQ = ['onu', 'pol', 'cee', 'rd', 'cod', 'og'].map(k => win.ESQ_TXT['T27.' + k]).join('').replace(/<!--VIS27[AB]-->[\s\S]*?<!--\/VIS27[AB]-->/g, '');
const ARTS = []; { let pos = 0; for (;;) { const a = ESQ.indexOf('<div class="articulo">', pos); if (a < 0) break; const b = ESQ.indexOf('</div></div></div>', a) + 18; const m = ESQ.slice(a, b).match(/articulo-head">([\s\S]*?)<\/div>/); ARTS.push([m ? m[1].replace(/<[^>]+>/g, '') : '', norm(ESQ.slice(a, b))]); pos = a + 20; } }
const CAB = V27.map(([loc]) => { const f = ARTS.find(([h]) => norm(h) === norm(loc)); if (!f) throw new Error('cabecera sin ficha: ' + loc.slice(0, 50)); return f[0]; });
const Vcab = V27.map(([, h], i) => [CAB[i], h]);
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const N = { BAJO: +(process.env.BAJO || 1e6), CAB: +(process.env.CAB || 2), ANT: +(process.env.ANT || 2) };
const nivel = (k, p, f) => {
  const fuerte = f.ps.some(x => /data-ex="[^"]*(?:EXOF|EX)/.test(x.at)) || /·\s*R\d/.test(f.cab);
  const ast = f.ps.some(x => /data-ex=/.test(x.at));
  if (process.env.OF_VENT && p.of && !fuerte) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.of || fuerte) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (ast) return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };
// fichas que el cuadro sustituye por entero (el literal no sale; sus preguntas siguen enlazadas desde el propio cuadro o su botón 🎯)
const limpia0 = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const limpia = t => t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const UNO = +(process.env.UNO || 0.8);
const SUS_AUTO = (() => {
  const BS = String.fromCharCode(92), app = fs.readFileSync(path.join(__dirname, '..', '..', 'test-oficial-conocimiento.html'), 'utf8');
  const MAPA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'esquemas-datos', 'mapa-preguntas.js'), 'utf8').match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
  const obj = id => { const i = app.indexOf('{"id":"' + id + '"'); let d = 0, s = false, e = false, j = i; for (; j < app.length; j++) { const c = app[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === '{') d++; else if (c === '}') { d--; if (!d) break; } } return JSON.parse(app.slice(i, j + 1)); };
  const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/[^a-z0-9ñ ]/g, ' ').replace(/ +/g, ' ');
  const porFicha = {}; Object.entries(MAPA).forEach(([id, p]) => { const m = p.match(/^27-(\d+)-/); if (m && /^27-/.test(id)) (porFicha[m[1]] = porFicha[m[1]] || []).push(id); });
  const txtC = {}; Vcab.forEach(([c, h]) => { txtC[c] = (txtC[c] || '') + ' ' + nz(h); });
  const out = [];
  X.fichas.forEach((f, k) => { const c = Object.keys(txtC).find(x => limpia0(f.cab) === x || limpia0(f.cab).startsWith(x + ' ')); if (!c) return; const ids = porFicha[k] || []; if (!ids.length) return;
    const dentro = ids.filter(id => { const q = obj(id), w = nz(q.opciones[q.correcta]).split(' ').filter(p => p.length > 2); return !w.length || w.filter(p => txtC[c].includes(p)).length / w.length >= 0.8; });
    if (dentro.length / ids.length >= UNO) out.push(limpia0(f.cab)); });
  return out;
})();
const SUSTITUYE = (process.env.SUSTITUYE || '').split('|').filter(Boolean).concat(SUS_AUTO);
const fichasFuera = new Set(X.fichas.map((f, k) => [k, limpia(f.cab)]).filter(([, c]) => SUSTITUYE.some(s => c === s || c.startsWith(s + ' ') || c.startsWith(s + '○'))).map(([k]) => k));
const OMITIR = { nivel, fichas: fichasFuera, conCuadro: true };
const EXTRAS = {};
const H0 = X.automatico(Vcab, EXTRAS, OMITIR);
const S = X.asignaSueltas(H0);
const H = X.automatico(Vcab, Object.assign(EXTRAS, S.extras), OMITIR) + S.html;
console.log(`Cuadros: ${V27.length} · fichas sustituidas por su cuadro: ${fichasFuera.size} · preguntas sueltas: ${S.n} asignadas a su artículo · ${S.g} en grupos al final`);
module.exports = { visuales: () => [] };
if (require.main === module) X.publica(H, [{ nombre: 'Tema 27', k0: 0, k1: 999 }]);
