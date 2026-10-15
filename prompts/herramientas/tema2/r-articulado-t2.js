// Fichas RECUERDA (R1-R39) del Tema 2 → su párrafo del ARTICULADO (pauta 15/10/2026: en el Exprés se quita la parte final
// RECUERDA y en el artículo se pone la marca «R n»). Devuelve, sobre las fichas de expres-lib:
//   r:     { 'k-j': ['R1', …] }  párrafo del articulado donde está el apartado de cada R
//   mover: [{ id, k, j }]        preguntas que el mapa colgaba de las fichas RECUERDA, recolocadas en su párrafo del articulado
// Cómo: el temario pone «Rn» justo delante de su apartado (r-temario-t2.js); se buscan ventanas de 6 palabras de ese texto en
// los párrafos de la MISMA norma. Si no, el texto literal de la respuesta / cita; si no, el párrafo con más palabras en común (≥ 55 %).
// Uso: require('./tema2/r-articulado-t2.js')(X)   ·   node prompts/herramientas/tema2/r-articulado-t2.js  (informe)
const fs = require('fs'), path = require('path');
const nrm = s => ' ' + String(s).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, ' ').trim() + ' ';
const VAC = new Set('de la el los las del al y e o u en que se a un una con su sus por para como lo le les sin mas este esta presente ley convencion protocolo convenio estados estado parte partes'.split(' '));
const tok = s => new Set(nrm(s).trim().split(' ').filter(w => w.length > 2 && !VAC.has(w)));
const NORMA = t => /19\/2003|movimientos de capitales/i.test(t) ? 'l19' : /prevenci[oó]n del terrorismo|Varsovia|Convenio/i.test(t) ? 'c196'
  : /10\/2010|blanqueo de capitales/i.test(t) ? 'l10' : /trata de personas/i.test(t) ? 'tra' : /migrantes/i.test(t) ? 'mig' : /armas de fuego/i.test(t) ? 'arm'
  : /Delincuencia Organizada|Palermo/i.test(t) ? 'pal' : null;
module.exports = function (X) {
  const h = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'esquemas.html'), 'utf8');
  const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
  const PREG = Object.fromEntries(require('../preguntas-articulo.js').preguntas(2).map(q => [q.id, q]));
  const RT = require('./r-temario-t2.js');
  const ini = re => X.fichaBloque.findIndex(t => re.test(t));
  const k0 = ini(/^RECUERDA/);
  const cortes = [['l19', 0], ['c196', ini(/^2\.2/)], ['l10', ini(/^2\.3/)], ['pal', ini(/^2\.4/)], ['tra', ini(/^2\.5/)], ['mig', ini(/^2\.6/)], ['arm', ini(/^2\.7/)], ['rec', k0]];
  const normaDe = k => { let n = null; cortes.forEach(([c, i]) => { if (k >= i) n = c; }); return n; };
  const P = []; X.fichas.forEach((f, k) => { if (k < k0) f.ps.forEach((p, j) => P.push({ k, j, norma: normaDe(k), n: nrm(p.h), t: tok(p.h) })); });
  const busca = (norma, literal, ctx) => {
    const C = P.filter(p => !norma || p.norma === norma), tc = tok(ctx);
    const mejor = c => c.map(p => [p, [...tc].filter(w => p.t.has(w)).length]).sort((a, b) => b[1] - a[1])[0];
    for (const l of literal) { const n = nrm(l); if (n.trim().length < 8) continue; const c = C.filter(p => p.n.includes(n)); if (c.length) return mejor(c)[0]; }
    return null;   // sin búsqueda aproximada: colocaba algunas R en artículos que no eran
  };
  // por número de artículo (y apartado) dentro de la norma: párrafo que abre «Art. N.» o, en fichas de un solo artículo, el apartado
  const porArticulo = (norma, art, ap) => { if (!art) return null;
    // ¿la cabecera de la ficha incluye el artículo? (números sueltos o rangos «16 a 20»)
    const incluye = cab => { const c = cab.replace(/<[^>]+>/g, '').split('—')[0]; const n = parseInt(art, 10);
      if (new RegExp(`(^|\\D)${art.replace(' ', '\\s+')}(\\D|$)`, 'i').test(c) && !/ (bis|ter)$/.test(art) === !new RegExp(`${n}\\s+(bis|ter)`, 'i').test(c)) return true;
      return [...c.matchAll(/(\d+)\s+a\s+(\d+)/g)].some(m => n >= +m[1] && n <= +m[2]); };
    const C = P.filter(p => p.norma === norma && incluye(X.fichas[p.k].cab));
    if (!C.length) return null;
    let cur = null; const conArt = C.map(p => { const t = p.n.trim(); const m = t.match(/^art (\d+(?: bis| ter)?) /); if (m) cur = m[1]; else if (p.j === 0) cur = null; return { p, art: cur, ap: (t.replace(/^art \d+(?: bis| ter)? /, '').match(/^(\d+) /) || [])[1] }; });
    const delArt = conArt.filter(x => x.art === art || (x.art === null && !conArt.some(y => y.art)));
    const L = delArt.length ? delArt : conArt;
    return ((ap && L.find(x => x.ap === ap)) || L[0]).p; };
  const ARTR = { R18: '49', R19: '50' };   // el OCR no recoge el «ARTÍCULO n» anterior a estas dos marcas
  const porVentanas = (norma, txt) => { const W = nrm(String(txt).replace(/- (?=[a-zñáéíóú])/g, '')).trim().split(' ');
    const C = P.filter(p => !norma || p.norma === norma);
    for (let i = 0; i <= 3 && i + 8 <= W.length; i++) { const v = ' ' + W.slice(i, i + 8).join(' ') + ' '; const c = C.filter(p => p.n.includes(v)); if (c.length === 1) return c[0]; }
    return null; };
  const r = {}, mover = [], falta = [], dondeR = {};
  X.fichas.slice(k0).forEach((f, i) => f.ps.forEach((p, j) => { const t = p.h.replace(/<[^>]+>/g, ''); const m = t.match(/^\s*(R\d+)\s*·([\s\S]*?)→([\s\S]*)$/); if (!m) return;
    const resp = m[3].replace(/\.\s*$/, '').trim(), norma = NORMA(m[2]);
    const rt = RT[m[1]] || {};
    const s = (rt.txt && porVentanas(norma, rt.txt)) || porArticulo(norma, ARTR[m[1]] || rt.art, rt.ap) || busca(norma, [resp], '');
    if (s) { (r[`${s.k}-${s.j}`] = r[`${s.k}-${s.j}`] || []).push(m[1]); dondeR[`${k0 + i}-${j}`] = s; } else falta.push(m[1]); }));
  Object.entries(MAPA).forEach(([id, s]) => { const [t, k, j] = s.split('-').map(Number); if (t !== 2 || k < k0) return;
    const q = PREG[id]; if (!q) return; const cita = ((q.explicacion || '').match(/ref-concepto">"?([\s\S]*?)"?<\/span>/) || [])[1] || '';
    const ok = q.opciones[q.correcta].replace(/\.$/, ''), norma = NORMA(q.pregunta) || NORMA(q.apartado || '');
    const p = dondeR[`${k}-${j}`] || porVentanas(norma, cita) || busca(norma, [cita, ok], q.pregunta + ' ' + ok);
    if (p) mover.push({ id, k: p.k, j: p.j }); else falta.push(id); });
  return { r, mover, falta, k0 };
};
if (require.main === module) {
  const X = require('../expres-lib.js')(2); const R = module.exports(X);
  const lim = s => s.replace(/<[^>]+>/g, '');
  Object.entries(R.r).sort((a, b) => +a[1][0].slice(1) - +b[1][0].slice(1)).forEach(([kj, rs]) => { const [k, j] = kj.split('-').map(Number); console.log(rs.join(','), '→', lim(X.fichas[k].cab).slice(0, 45), '|', lim(X.fichas[k].ps[j].h).slice(0, 70)); });
  console.log('R situadas:', Object.values(R.r).flat().length, '· preguntas movidas:', R.mover.length, '· sin sitio:', R.falta.join(' ') || '—');
}
