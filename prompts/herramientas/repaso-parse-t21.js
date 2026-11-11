// Lee expres/t21.js y devuelve las fichas del Exprés del T21 (cabecera, cuerpo, marcas, nº de oficiales) agrupadas por ley.
const fs = require('fs');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
function fichas() {
  global.window = {}; eval(fs.readFileSync(R + 'expres/t21.js', 'utf8'));
  const h = window.EXPRES_T[21].html;
  const marks = [], re = /<div class="bloque-titulo">|<div class="ex-ficha">/g; let m;
  while ((m = re.exec(h))) marks.push({ i: m.index, t: m[0].includes('bloque') ? 'b' : 'f' });
  const out = [];
  // Las leyes no llevan título propio en el Exprés: se asignan por posición de la ficha (comprobado a mano con las cabeceras).
  const LEYES = [[0, 'LO 6/1984 · Habeas Corpus'], [8, 'LO 2/1989 · Ley Procesal Militar (detención)'], [18, 'LO 19/1994 · Protección de testigos y peritos'], [22, 'LO 3/2003 · Equipos conjuntos de investigación (complementaria)'], [24, 'LO 10/2007 · Base de datos policial de ADN'], [33, 'Ley 4/1985 · Extradición pasiva'], [51, 'Ley 11/2003 · Equipos conjuntos de investigación penal'], [62, 'Ley 25/2007 · Conservación de datos'], [71, 'Ley 23/2014 · Reconocimiento mutuo de resoluciones penales'], [176, 'Ley 4/2015 · Estatuto de la víctima'], [195, 'Instrucción 1/2024 · Procedimiento integral de la detención policial']];
  const leyDe = i => LEYES.filter(l => l[0] <= i).pop()[1];
  const cierra = (s, from) => { let d = 0; const r = /<div\b|<\/div>/g; r.lastIndex = from; let x; while ((x = r.exec(s))) { d += x[0] === '</div>' ? -1 : 1; if (d === 0) return r.lastIndex; } return s.length; };
  marks.forEach(k => {
    const fin = cierra(h, k.i), blk = h.slice(k.i, fin);
    if (k.t === 'b') return;
    const hd = blk.match(/<div class="ex-fh">([\s\S]*?)<\/div><div class="ex-fb">/); if (!hd) return;
    const body = blk.slice(blk.indexOf('<div class="ex-fb">') + 19, blk.length - 12);
    const hdTxt = hd[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const qs = new Set(); [...body.matchAll(/data-q="([^"]+)"/g)].forEach(x => x[1].split(',').forEach(q => qs.add(q)));
    const of = [...qs].filter(q => !/ia/.test(q));
    out.push({ ley: leyDe(out.length), hd: hd[1], hdTxt, body, exof: /EXOF/.test(hd[1]), ast: /✱/.test(hd[1]), r: [...hd[1].matchAll(/>R(\d+)</g)].map(x => +x[1]), of: of.length, ia: qs.size - of.length,
      len: body.replace(/<[^>]+>/g, '').length, tabla: /class="vis|class="et"/.test(body) });
  });
  return out;
}
module.exports = { fichas };
if (require.main === module) {
  const F = fichas(); const L = {}; F.forEach(f => { (L[f.ley] = L[f.ley] || []).push(f); });
  Object.entries(L).forEach(([l, a]) => console.log(l.slice(0, 70), a.length, 'fichas', a.reduce((s, f) => s + f.len, 0), 'car'));
  console.log(F.length, F.filter(f => f.exof).length, 'exof', F.filter(f => f.r.length).length, 'R', F.filter(f => f.of).length, 'conOf');
  console.log('sin ley', F.filter(f => !f.ley).length, 'tablas', F.filter(f => f.tabla).map(f => f.hdTxt).join(','));
}
