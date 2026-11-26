// node build.js r-xxx  -> monta d-xxx.json. El módulo da: {video, T, apartado, norma, texto(art)->string, pieza(art)->id, R:[[clave,c,art,loc,ini,fin,exp]], fix?}
const fs = require('fs');
const name = process.argv[2];
const M = require('./' + name + '.js');
const Q = require('./u-' + M.video + '.json');
const fix = t => {
  t = t.replace(/\beI\b/g, 'el').replace(/\bEI\b/g, 'El').replace(/\bIOS\b/g, 'los').replace(/\bLOS\b/g, 'Los').replace(/\bm[óé]s\b/g, 'más').replace(/\bAI\b/g, 'Al').replace(/\bIe\b/g, 'le')
    .replace(/ 10 (notificar|dispuesto|que|establecido|contrario|referente)/g, ' lo $1').replace(/ en 10 /g, ' en lo ').replace(/ 0 /g, ' o ').replace(/_$/, '.').replace(/\. (?=[a-záéíóúñ])/g, ', ').replace(/ ([,.:;])/g, '$1');
  for (const [a, b] of M.fix || []) t = t.split(a).join(b);
  return t.trim();
};
const falta = [], out = [];
for (const [k, c, art, loc, ini, fin, exp] of M.R) {
  const q = Q.find(x => x.t + ':' + x.num === k); if (!q) { falta.push(k + ' sin texto'); continue; }
  const t = M.directo ? ini : M.texto(art) || ''; const low = t.toLowerCase();
  const i = low.indexOf(ini.toLowerCase()); let lit = '';
  if (M.directo) lit = ini; else if (i >= 0) { if (fin) { const j = low.indexOf(fin.toLowerCase(), i); if (j >= 0 && j - i < 1100) lit = t.slice(i, j + fin.length); } else { const m = /\.(?= |$)/.exec(t.slice(i + ini.length)); lit = m ? t.slice(i, i + ini.length + m.index + 1) : t.slice(i, i + 400); } }
  if (!lit) falta.push(k + ' ' + art + (i < 0 ? ' inicio' : ' fin') + ' «' + (i < 0 ? ini : fin) + '»');
  lit = lit.replace(/[;,:]$/, '').replace(/"/g, '»').trim();
  out.push({ n: k, en: fix(q.en), op: q.op.map(fix), c, art: M.pieza(art), loc, norma: M.norma, apartado: M.apartado, lit: lit.charAt(0).toUpperCase() + lit.slice(1), exp });
}
const sin = Q.filter(x => !x.dup && !M.R.some(r => r[0] === x.t + ':' + x.num) && !(M.saltar || []).includes(x.t + ':' + x.num)).map(x => x.t + ':' + x.num);
console.log('preguntas', out.length, 'sin resolver', sin.join(','));
console.log(falta.join('\n'));
fs.writeFileSync('d-' + name.slice(2) + '.json', JSON.stringify(out, null, 1));
