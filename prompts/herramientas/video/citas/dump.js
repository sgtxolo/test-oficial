const fs = require('fs'); const P = require('./parr2.json'); const NL = String.fromCharCode(10);
const vistas = new Map(); let bloques = [], cur = '';
for (const o of P) {
  const cita = o.cita.join(' ¶ ');
  let t = '### ' + o.id + ' ' + o.loc + NL + o.q.replace(/^.{0,400}?(?=¿|Señale|Según|Indique)/, m => m.length > 140 ? m.slice(-100) : m) + NL;
  o.op.forEach((x, i) => t += (i === o.c ? '* ' : '- ') + x + NL);
  if (vistas.has(cita)) t += 'CITA = la de ' + vistas.get(cita) + NL; else { vistas.set(cita, o.id); t += 'CITA: ' + cita + NL; }
  t += 'EXP: ' + o.exp.replace(/<[^>]+>/g, '') + NL;
  if (cur.length + t.length > 28500) { bloques.push(cur); cur = ''; }
  cur += t;
}
bloques.push(cur); bloques.forEach((b, i) => fs.writeFileSync(__dirname + `/rev${String(i).padStart(2, '0')}.txt`, b));
console.log(bloques.length, bloques.reduce((s, b) => s + b.length, 0));
