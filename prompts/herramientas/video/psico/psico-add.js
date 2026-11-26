const fs = require('fs');
const S = __dirname + '/';
const F = 'prompts/herramientas/psico/psico-banco.json';
const raw = fs.readFileSync(F, 'utf8'); const bank = JSON.parse(raw);
if (bank.some(b => b.fuente && b.fuente.startsWith('seras-psico-26-11'))) throw new Error('ya añadidas');
const q = require('./q-v02.json'); const res = require('./psico-res.json');
let n = 517;
if (bank[bank.length - 1].qid !== 'PSI517') throw new Error('último qid ' + bank[bank.length - 1].qid);
for (const r of res) {
  n++; const img = `ps-${n}.jpg`;
  if (fs.existsSync('psicotecnicos/' + img)) throw new Error('ya existe ' + img);
  fs.copyFileSync(S + `fin/${r.n}.jpg`, 'psicotecnicos/' + img);
  bank.push({ qid: 'PSI' + n, stem: 'Pregunta psicotécnica', a: 'ABCD'.indexOf(r.L), img, ex: null, fb: `Respuesta correcta: <b>${r.L}</b>. ${r.txt}`, fuente: 'seras-psico-26-11_' + String(r.n).padStart(2, '0') });
}
const ind = raw.startsWith('[\n') ? (raw.match(/^\[\n( *)/)[1].length || 0) : 0;
fs.writeFileSync(F, JSON.stringify(bank, null, ind) + (raw.endsWith('\n') ? '\n' : ''));
console.log('banco', bank.length, 'indent', ind);
