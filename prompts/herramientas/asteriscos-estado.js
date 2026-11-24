// Lista los párrafos con ✱ de un tema (Exprés expres/tN.js) y si tienen pregunta OFICIAL enlazada (data-q) o solo IA / ninguna.
// Uso: node prompts/herramientas/asteriscos-estado.js <tema> [--ver]
const fs = require('fs'); const T = process.argv[2] || '1', ver = process.argv.includes('--ver');
global.window = {}; const s = fs.readFileSync(__dirname + '/../../expres/t' + T + '.js', 'utf8'); eval(s);
const nrm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/-s+/g, '').replace(/[^a-z0-9]/g, '');
let LQ = {}; try { global.window = {}; eval(fs.readFileSync(__dirname + '/../../esquemas-datos/lila-t' + T + '.js', 'utf8')); LQ = window.LILA_Q || {}; } catch (e) {}
const ofi = Object.keys(LQ).filter(k => !/-ia-/.test(k));
global.window = {}; eval(s);
const h = window.EXPRES_T[T].html; const re = /<p data-ex="\*"([^>]*)>([\s\S]*?)<\/p>/g; let m, n = 0; const c = { of: 0, ia: 0, ninguna: 0 };
while ((m = re.exec(h))) { n++; const pt = nrm(m[2].replace(/<[^>]+>/g, '')), of = ofi.filter(k => { const l = nrm(LQ[k]); return l.length > 12 && (pt.includes(l.slice(0, 40)) || pt.includes(l.slice(-40))); }), ia = [];
  const k = of.length ? 'of' : ia.length ? 'ia' : 'ninguna'; c[k]++;
  if (ver) console.log(n, k.toUpperCase(), of.join(',') + (ia.length ? ' +' + ia.length + 'IA' : ''), '|', m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').slice(0, 110)); }
console.log('Tema', T, '· párrafos ✱', n, '· con oficial', c.of, '· solo IA', c.ia, '· sin pregunta', c.ninguna);
