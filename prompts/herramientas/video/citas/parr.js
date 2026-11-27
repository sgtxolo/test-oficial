// Para cada pregunta de los vídeos del 26/11 saca del temario el apartado completo donde está la respuesta.
// Salida: parr.json [{id,t,loc,norma,q,op,c,lit,exp,cita:[párrafos],av:[avisos]}]
const fs = require('fs');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/';
const D = R + 'prompts/temario-limpio/';
const NL = String.fromCharCode(10);
const leer = f => fs.readFileSync(D + f, 'utf8').split(/\r?\n/).map(l => l.replace(/[\u0007\u0000]\s?/g, '').replace(/\u00ad\s*/g, '').replace(/[\u00a0\u2000-\u200b\u202f\u205f\u3000]/g, ' '));
const une = (a, b) => a === '' ? b : /[a-záéíóúñ]-$/.test(a) && /^[a-záéíóúñ]/.test(b) ? a.slice(0, -1) + b : a + ' ' + b;
const arregla = t => t.replace(/(^|[\s(«])([B-DF-NP-TV-XZÑ]) (?=[a-záéíóúñ])/g, '$1$2').replace(/(^|[\s(«])E (?=[ln] )/g, '$1E').replace(/(^|[.:] )E ([ln]) /g, '$1E$2 ').replace(/\s{2,}/g, ' ').replace(/ ([,.;:])/g, '$1').trim();
// devuelve {art: [párrafos]}
function trocea(lineas, esArt, esBasura, esInicio) {
  const O = {}; let art = null, p = null;
  const mete = () => { if (art && p) (O[art] = O[art] || []).push(arregla(p)); p = null; };
  for (const l of lineas) {
    if (esBasura(l)) continue;
    const a = esArt(l, art);
    if (a) { mete(); art = a.art; if (O[art]) O[art] = O[art].length > 2 ? O[art] : []; p = a.resto || null; continue; }
    if (!art || !l.trim()) { continue; }
    if (esInicio(l, p)) { mete(); p = l.trim(); } else p = une(p || '', l.trim());
  }
  mete(); return O;
}
const BAS = /^\s*$|^=====PAG|academiaprefortia|Todos los derechos|^TEMARIO|^TOMO \d|^T\d+ [A-ZÁÉÍÓÚ]|^A OFICIAL$|^ASCENSO$|SUBRAYADO MÉTODO|^\d\.\d\.\s*$|Diario Oficial de la Unión Europea|^L \d+\/\d+$|^ES$|^\d{1,2}\.\d{1,2}\.\d{4}$/i;
const clave = s => s.toLowerCase().replace(/\s+/g, '');
// ---- T2 (por norma, con los mismos tramos que art2.js)
const SEC = { a: [39, 475], b: [477, 986], c: [988, 2496], d: [2498, 3248], e: [3250, 3519], f: [3521, 3817], g: [3819, 4200] };
const L2 = leer('tema2/temario.txt'); const T2 = {};
for (const [k, [a, b]] of Object.entries(SEC)) T2[k] = trocea(L2.slice(a - 1, b - 1),
  l => { const m = l.match(/^ART[ÍI]CULO (\d+(?: (?:BIS|TER))?)\.\s*(.*)$/); if (m) { const r = m[2].match(/^[^a-z]*?\.\s+(\S.*)$/); return { art: clave(m[1]), resto: r ? r[1] : '' }; } if (/^DISPOSICI[ÓO]N /.test(l)) return { art: 'disp' + clave(l).slice(11, 24) }; return null; },
  l => BAS.test(l) || /^\s*(CAP[ÍI]TULO|SECCI[ÓO]N|[IVX]+\. [A-ZÁÉÍÓÚ])/.test(l),
  (l, p) => /^\s*\d{1,2}( ?(bis|ter))?\.\s/.test(l) && (!p || /[.:;»)]$/.test(p)) || /^\s+[a-z]\)\s/.test(l) && /[.:;,]( [yo])?$/.test(p || '') );
// ---- T5 SIS y Eurodac, T11: una línea por párrafo
const porLinea = (f, re) => trocea(leer(f), l => { const m = l.match(re); return m ? { art: clave(m[1]), resto: '' } : null; }, l => BAS.test(l) || /^(CAP[ÍI]TULO|SECCI[ÓO]N)\b/i.test(l), (l, p) => !p || !/[a-záéíóúñ,\-]$/.test(p) || /^(\d+\.|[a-z]\)|\d+\))\s/.test(l));
const SIS = porLinea('tema5/sis.txt', /^\s*Artículo (\d+(?: (?:bis|ter|quater))?)\s*$/);
const EUR = porLinea('tema5/eur.txt', /^\s*Artículo (\d+(?: (?:bis|ter|quater))?)(?:\s+[A-ZÁÉÍÓÚÑ«].*)?$/);
const RD = trocea(leer('tema11/5-rd.txt'), l => { let m = l.match(/^\s*Artículo (\d+)\./); if (m) return { art: m[1] }; m = l.match(/^\s*(Disposición (?:adicional|transitoria|final|derogatoria) \S+?)\./i); return m ? { art: clave(m[1]) } : null; }, l => BAS.test(l) || /^(CAP[ÍI]TULO|SECCI[ÓO]N)\b/i.test(l), () => true);
// ---- T18
const CP = trocea(leer('tema18/oficial.txt'), (l, cur) => { const m = l.match(/^\s{0,3}Art[íi]culo (\d+)( ?(?:bis|ter|quater|quinquies|sexies|septies))?\./); return m ? { art: m[1] + clave(m[2] || '') } : null; },
  l => BAS.test(l) || /^\s*\d+\s*$|BOE-|^TEMA 18|^\s*(T[ÍI]TULO|CAP[ÍI]TULO|Secci[óo]n|LIBRO)\b/.test(l), l => /^ {3,}\S/.test(l));
// ---- Código de visados: escaneado (vigente)
const V = leer('tema5/escaneado-paginas.txt').slice(12642, 15750).filter((l, i) => i !== 13111 - 12642);
const BASV = /^(=====PAG|ser[aá]s oficial|oficial$|T5\.3|.{0,4}Ser[aá]s\. Todos|P[l1]$|\d{1,3}$|.{0,3}$)|Todos (los|¡os) derechos|^Título [IVX]+\.|^T[ÍI]TULO |^CAP[ÍI]TULO /i;
let ult = 0;
const CV = trocea(V, l => { const m = l.match(/^[^A-Za-z]{0,4}(?:Art[íiIÍ]?[íi]?culo|ART[ÍI]CULO)\s*(\d+(?:\s*(?:bis|ter))?)\s*[.,:]/i); if (!m) return null; const n = parseInt(m[1], 10); if (n < ult || n > ult + 6 && ult) return null; ult = n; return { art: clave(m[1]) }; },
  l => BASV.test(l), (l, p) => /^\s*(\d{1,2}|I ?bis|Ibis|Iter|\d ?(bis|ter|quater))\s*\.\s/i.test(l) || /^\s*[a-z]\)\s/.test(l) && /[.:;,]( [yo])?$/.test(p || ''));

const normaDe = d => /19\/2003/.test(d.norma) ? T2.a : /Consejo de Europa/.test(d.norma) ? T2.b : /10\/2010/.test(d.norma) ? T2.c : /Delincuencia Organizada Transnacional \(Conv/i.test(d.norma) ? T2.d : /trata/i.test(d.norma) ? T2.e : /migrantes/i.test(d.norma) ? T2.f : /armas/i.test(d.norma) ? T2.g : /2018\/1861/.test(d.norma) ? SIS : /810\/2009/.test(d.norma) ? CV : /2024\/1358/.test(d.norma) ? EUR : /179\/2005/.test(d.norma) ? RD : /Código Penal/.test(d.norma) ? CP : null;
const norm = t => String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const cubre = (frag, texto) => { const w = norm(frag).split(' '); const t = ' ' + norm(texto) + ' '; if (w.length < 4) return t.includes(' ' + w.join(' ') + ' ') ? 1 : 0; let h = 0, n = 0; for (let i = 0; i + 4 <= w.length; i++) { n++; if (t.includes(' ' + w.slice(i, i + 4).join(' ') + ' ')) h++; } return h / n; };
const NUM = /^(\d{1,2}|I ?bis|Ibis|Iter|\d ?(bis|ter|quater))\s*\.\s/i;
function grupos(ps) { const g = []; const hayNum = ps.some(p => NUM.test(p)); for (const p of ps) { if (!g.length || hayNum && NUM.test(p)) g.push([p]); else g[g.length - 1].push(p); } return g; }
const GEN = /^(todas|todos|ninguna|ambas|a y b|b y c|a y c|las dos|son correctas)/;

const src = fs.readFileSync(R + 'test-oficial-conocimiento.html', 'utf8'); const BS = String.fromCharCode(92);
function preguntas(t) { const res = []; const re = new RegExp('\\{"id":"' + t + '-\\d+","pregunta"', 'g'); let m; while ((m = re.exec(src))) { let d = 0, s = false, e = false, j = m.index; for (; j < src.length; j++) { const c = src[j]; if (s) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') s = false; continue; } if (c === '"') s = true; else if (c === '{') d++; else if (c === '}') { if (!--d) break; } } res.push(JSON.parse(src.slice(m.index, j + 1))); } return res; }
const plano = t => norm(t).replace(/ /g, '');
if (process.argv.includes("-k")) { console.log("EUR", Object.keys(EUR).join()); console.log("CV", Object.keys(CV).join()); console.log("RD", Object.keys(RD).join()); process.exit(); }
const out = [];
for (const t of [2, 5, 11, 18]) {
  const qs = preguntas(t);
  for (const d of JSON.parse(fs.readFileSync(R + `prompts/herramientas/oficiales-seras-t${t}.json`, 'utf8'))) {
    const q = qs.find(x => plano(x.pregunta) === plano(d.en) && plano(x.opciones.join('')) === plano(d.op.join('')));
    if (!q) { console.log('sin pregunta', t, d.en.slice(0, 60)); continue; }
    const av = []; const N = normaDe(d); if (!N) throw new Error('norma ' + d.norma);
    const m = d.loc.match(/Arts?\.\s*(\d+(?:\s*(?:bis|ter|quater|quinquies|sexies|septies))?)/i);
    const dm = d.loc.match(/Disposici[óo]n \S+ \S+/i);
    let art = m ? clave(m[1]) : dm ? clave(dm[0].replace(/\.$/, '')) : null;
    // si el literal no está en el artículo citado, se busca en toda la norma
    const en = a => N[a] ? cubre(d.lit, N[a].join(' ')) : 0;
    if (en(art) < 0.55) { const best = Object.keys(N).map(a => [en(a), a]).sort((x, y) => y[0] - x[0])[0]; if (best && best[0] > en(art) + 0.15) { av.push('literal en art ' + best[1] + ' (citaba ' + art + ')'); art = best[1]; } }
    let cita = [];
    if (!N[art]) av.push('artículo no hallado ' + art);
    else {
      const G = grupos(N[art]); const sc = G.map(g => cubre(d.lit, g.join(' ')));
      const bi = sc.indexOf(Math.max(...sc)); const sel = new Set([bi]);
      if (sc[bi] < 0.55) av.push('literal flojo ' + sc[bi].toFixed(2));
      for (const o of q.opciones) { if (GEN.test(norm(o)) || norm(o).split(' ').length < 7) continue; const so = G.map(g => cubre(o, g.join(' '))); const k = so.indexOf(Math.max(...so)); if (so[k] >= 0.45) sel.add(k); }
      // el literal puede repartirse en varios apartados
      sc.forEach((v, i) => { if (i !== bi && G[i].join(' ').length > 40 && cubre(G[i].join(' '), d.lit) > 0.6) sel.add(i); });
      cita = [...sel].sort((a, b) => a - b).flatMap(i => G[i]);
      const largo = cita.join(' ').length; if (largo > 3000) av.push('larga ' + largo);
    }
    out.push({ id: q.id, t, loc: d.loc, art, norma: d.norma, q: q.pregunta, op: q.opciones, c: q.correcta, lit: d.lit, exp: q.explicacion.replace(/^[\s\S]*<span class="ref-concepto">[\s\S]*?<\/span>/, ''), cita, av });
  }
}
fs.writeFileSync(__dirname + '/parr.json', JSON.stringify(out));
const av = out.filter(o => o.av.length);
console.log('preguntas', out.length, 'con aviso', av.length, 'caracteres de citas', out.reduce((s, o) => s + o.cita.join(' ').length, 0));
const c = {}; av.forEach(o => o.av.forEach(a => { const k = o.t + ' ' + a.split(' ').slice(0, 2).join(' '); c[k] = (c[k] || 0) + 1; })); console.log(c);
