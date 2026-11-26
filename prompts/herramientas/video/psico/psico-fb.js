const fs = require('fs');
const S = __dirname + '/';
// valores de los signos (solo los que quedan fijados por las claves y las cuentas)
let src = fs.readFileSync(S + 'codigos.js', 'utf8');
src = src.replace("const val = {}; const sols = new Set(); let count = 0;", "const val = {}; const sols = new Set(); let count = 0; const vistos = {};")
  .replace("sols.add(val['?']); count++;", "sols.add(val['?']); count++; for (const k in val) (vistos[k] = vistos[k] || new Set()).add(val[k]);")
  .replace("out[n] = match.length === 1", "FIJOS[n] = Object.entries(vistos).filter(([k, s]) => k !== '?' && !/\d/.test(k) && s.size === 1).map(([k, s]) => [k, [...s][0]]); VAL[n] = match[0]; completo[n] = count <= 20000;\n  out[n] = match.length === 1")
  .replace("sol-cod.json", "sol-cod2.json");
const FIJOS = {}, VAL = {}, completo = {};
new Function('FIJOS', 'VAL', 'completo', 'require', '__dirname', src)(FIJOS, VAL, completo, require, __dirname);
const SIM = { o: '○', O: '●', t: '△', T: '▲', v: '▽', V: '▼', s: '□', S: '■', r: '▷', R: '▶', l: '◁', L: '◀', d: '◇', D: '◆' };
const cod = require('./sol-cod2.json'), gir = require('./sol-giros.json'), plet = require('./sol-plet.json');
const ops = Function('return ' + fs.readFileSync(S + 'giros.py', 'utf8').match(/ops = (\{[\s\S]*?\})/)[1])();
const N = { VV: 'volteo vertical', HV: 'volteo horizontal', C90: 'giro de 90° en el sentido del reloj', A90: 'giro de 90° contrario al reloj', C45: 'giro de 45° en el sentido del reloj', A45: 'giro de 45° contrario al reloj' };
const GIRO = { id: 'sin girarla', r90: 'girándola 90° en el sentido del reloj', r180: 'girándola 180°', r270: 'girándola 90° en sentido contrario al reloj' };
const PZ = { 57: 'D', 58: 'D', 59: 'C', 60: 'B', 61: 'D', 62: 'C', 63: 'D', 64: 'C', 65: 'C', 66: 'B', 67: 'B', 68: 'D', 69: 'C', 77: 'C', 78: 'B', 79: 'B', 80: 'D', 81: 'D', 82: 'A', 83: 'B', 93: 'D' };
const res = [];
for (let n = 1; n <= 95; n++) {
  let L, txt;
  if (gir[n]) { L = gir[n]; txt = 'Se aplican a la figura de la izquierda, en este orden: ' + ops[n].split(' ').map((o, i) => `${i + 1}) ${N[o]}`).join('; ') + `. El resultado es la figura ${L}.`; }
  else if (cod[n]) { L = cod[n]; txt = 'Cada signo vale una cifra. Con la clave y las cuentas completas ' + (FIJOS[n].length && completo[n] ? 'salen ' + FIJOS[n].map(([k, v]) => `${SIM[k]} = ${v}`).join(', ') + '; ' : '') + `así, el signo «?» vale ${VAL[n]}.`; }
  else if (plet[n]) {
    const z = plet[n].top.filter(x => x[0] === 0 && GIRO[x[2]]);
    const letras = [...new Set(z.map(x => x[1]))]; if (letras.length !== 1) throw new Error('pletina ' + n + ' ' + JSON.stringify(z));
    L = letras[0]; txt = `La pieza ${L}, ${GIRO[z[0][2]]} (sin darle la vuelta), es la única en la que todos los puntos y uniones coinciden con orificios de la pletina.`;
  } else if (PZ[n]) { L = PZ[n]; txt = ([62, 64, 67].includes(n) ? `La pieza ${L} es la única que` : `Las piezas de la opción ${L} son las únicas que`) + (n === 67 ? ', junto con la pieza suelta,' : '') + ' completan el hueco: girándolas sin darles la vuelta coinciden los salientes, los entrantes y los bordes.'; if ([62, 64, 67].includes(n)) txt = `La pieza ${L} es la única que${n === 67 ? ', junto con la pieza suelta,' : ''} completa el hueco: girándola sin darle la vuelta coinciden salientes, entrantes y bordes.`; }
  else throw new Error('sin solución ' + n);
  res.push({ n, L, txt });
}
fs.writeFileSync(S + 'psico-res.json', JSON.stringify(res));
const c = {}; res.forEach(r => c[r.L] = (c[r.L] || 0) + 1); console.log(res.length, c);
for (const n of [1, 11, 23, 52, 57, 67]) console.log(n, res[n - 1].L, res[n - 1].txt);
