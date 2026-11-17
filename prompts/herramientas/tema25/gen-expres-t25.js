// Genera prompts/herramientas/expres-t25.js a partir de expres-t23.js (una sola vez). Uso: node prompts/herramientas/tema25/gen-expres-t25.js
const fs = require('fs'), path = require('path');
const P = path.join(__dirname, '..');
let s = fs.readFileSync(path.join(P, 'expres-t23.js'), 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('no encuentro: ' + a.slice(0, 60)); s = s.split(a).join(b); };
s = s.replace(/^\/\/ ⚡ EXPRÉS del Tema 23[^\n]*\n/, '// ⚡ EXPRÉS del Tema 25 (Coordinación y cooperación policial: LO 2/1986, Ley 31/2010, RD 1087/2010, Europol, INTERPOL). Mismas reglas que el Exprés del T23. Uso: node prompts/herramientas/expres-t25.js\n');
rep('(23)', '(25)'); rep('V23', 'V25'); rep('Tema 23', 'Tema 25');
rep("require('./tema23/visuales-t23.js')", "require('./tema25/visuales-t25a.js').concat(require('./tema25/visuales-t25b.js').map(([n, l, h]) => [5, l, h]))");
rep("'t23.js'", "'t25.js'");
rep("win.ESQ_TXT['T23.lsp'].replace(", "['loe', 'l31', 'rd', 'eur', 'int'].map(k => win.ESQ_TXT['T25.' + k]).join('').replace(");
rep('<!--VIS23-->[\\s\\S]*?<!--\\/VIS23-->', '<!--VIS25[AB]-->[\\s\\S]*?<!--\\/VIS25[AB]-->');
fs.writeFileSync(path.join(P, 'expres-t25.js'), s); console.log('ok');
