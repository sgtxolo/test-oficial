// Genera prompts/herramientas/expres-t27.js a partir de expres-t26.js. Uso: node prompts/herramientas/tema27/gen-expres-t27.js
const fs = require('fs'), path = require('path');
const P = path.join(__dirname, '..');
let s = fs.readFileSync(path.join(P, 'expres-t26.js'), 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('no encuentro: ' + a.slice(0, 70)); s = s.split(a).join(b); };
s = s.replace(/^\/\/ ⚡ EXPRÉS del Tema 26[^\n]*\n/, '// ⚡ EXPRÉS del Tema 27 (Deontología profesional: ONU, Resolución 690, Código Europeo, RD 176/2022, Código de Conducta y OG 10/2024). Mismas reglas que el Exprés del T26. Uso: node prompts/herramientas/expres-t27.js\n');
rep('(26)', '(27)'); rep('V26', 'V27'); rep('Tema 26', 'Tema 27');
rep("require('./tema26/visuales-t26a.js').map(([, l, h]) => [l, h]).concat(require('./tema26/visuales-t26b.js')).concat(require('./tema26/visuales-t26c.js').map(([, l, h]) => [l, h]))", "require('./tema27/visuales-t27a.js').map(([, l, h]) => [l, h]).concat(require('./tema27/visuales-t27b.js').map(([, l, h]) => [l, h]))");
rep("'t26.js'", "'t27.js'");
rep("['lo11', 'lo12', 'l29', 'ord', 'res1', 'res2', 'res3'].map(k => win.ESQ_TXT['T26.' + k])", "['onu', 'pol', 'cee', 'rd', 'cod', 'og'].map(k => win.ESQ_TXT['T27.' + k])");
rep('<!--VIS26[ABC]-->[\\s\\S]*?<!--\\/VIS26[ABC]-->', '<!--VIS27[AB]-->[\\s\\S]*?<!--\\/VIS27[AB]-->');
rep('^26-(', '^27-('); rep('/^26-/', '/^27-/');
fs.writeFileSync(path.join(P, 'expres-t27.js'), s);
console.log('ok', (s.match(/26/g) || []).length, 'restos de 26');
