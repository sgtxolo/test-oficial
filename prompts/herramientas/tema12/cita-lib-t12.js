// Tema 12 · localiza en la Ley 50/1997 (ley50.txt + exposición de motivos de temario.txt) el párrafo que respalda una pregunta
// y calcula su etiqueta («art. 5.1.b) de la Ley 50/1997, del Gobierno»). Lo usan fix-t12.js y las preguntas nuevas del tema.
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', '..', 'temario-limpio', 'tema12');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, ' ').split(/\s+/).filter(w => w.length > 2);
const NORMA = 'Ley 50/1997, del Gobierno';
const U = [];   // {lab, t}
// exposición de motivos
const raw = fs.readFileSync(path.join(D, 'temario.txt'), 'utf8').replace(/\r/g, '');
raw.slice(raw.indexOf('EXPOSICIÓN DE MOTIVOS') + 21, raw.indexOf('TÍTULO I')).split('\n').map(x => x.trim()).filter(Boolean)
  .reduce((a, l) => { if (/^[a-zà-ú]/.test(l) && a.length) a[a.length - 1] += ' ' + l; else a.push(l); return a; }, [])
  .forEach(t => U.push({ lab: `exposición de motivos de la ${NORMA}`, t }));
let art = '', ap = '', ord = '';
for (const l of fs.readFileSync(path.join(D, 'ley50.txt'), 'utf8').split('\n').filter(Boolean)) {
  let m = l.match(/^Artículo (\d+)\./); if (m) { art = 'art. ' + m[1]; ap = ''; ord = ''; continue; }
  m = l.match(/^(Disposición (?:adicional|transitoria|derogatoria) [a-záéíóú]+)\./); if (m) { art = m[1].replace('Disposición', 'disposición'); ap = ''; ord = ''; continue; }
  let lab = art;
  if ((m = l.match(/^(\d+(?: bis)?)\.\s/))) { ap = m[1]; ord = ''; lab = `${art}.${ap}`; }
  else if ((m = l.match(/^(\d+)\.º\s/))) { ord = m[1] + '.º'; lab = `${art}${ap ? '.' + ap : ''}.${ord}`; }
  else if ((m = l.match(/^([a-z])\)\s/))) lab = `${art}${ap ? '.' + ap : ''}.${m[1]})`;
  else lab = `${art}${ap ? '.' + ap : ''}`;
  U.push({ lab: /^art\./.test(lab) ? `${lab} de la ${NORMA}` : `${lab} de la ${NORMA}`, t: l.replace(/^(\d+(?: bis)?\.|\d+\.º|[a-z]\))\s+/, '') });
}
const G = new Map(U.map((u, i) => [i, new Set(nz(u.t))]));
// mejor párrafo para un texto (solapamiento de palabras ponderado por rareza)
const DF = new Map(); U.forEach((u, i) => G.get(i).forEach(w => DF.set(w, (DF.get(w) || 0) + 1)));
function mejor(txt, excl = []) {
  const w = [...new Set(nz(txt))]; let best = -1, bi = -1;
  U.forEach((u, i) => { if (excl.includes(i)) return; let s = 0; for (const x of w) if (G.get(i).has(x)) s += 1 / Math.log(2 + DF.get(x)); s /= Math.sqrt(1 + G.get(i).size / 25); if (s > best) { best = s; bi = i; } });
  return bi;
}
// cita = la frase del párrafo con más solapamiento (si el párrafo es largo)
function frase(i, txt) {
  const t = U[i].t; if (t.length <= 420) return t;
  const fr = t.split(/(?<=\.)\s+(?=[A-ZÁÉÍÓÚ])/); const w = new Set(nz(txt));
  let best = 0, bi = 0; fr.forEach((f, k) => { const s = nz(f).filter(x => w.has(x)).length; if (s > best) { best = s; bi = k; } });
  return fr[bi];
}
const TODO = U.map(u => u.t).join(' ');
module.exports = { U, mejor, frase, NORMA, TODO, literal: c => TODO.includes(c) };
