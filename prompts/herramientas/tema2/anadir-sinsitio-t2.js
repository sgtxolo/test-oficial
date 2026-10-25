// Tema 2 · «sin sitio» clase 1 que restaura-sinsitio.js no resuelve solo (hueco a mitad de frase, apartado intermedio ausente, preámbulo).
// Texto LITERAL del temario (temario-limpio/tema2/temario.txt), pintado con los colores del PDF escaneado. Idempotente.
// Uso: node prompts/herramientas/tema2/anadir-sinsitio-t2.js <subrayado-t2.json>
const fs = require('fs'), path = require('path'), cp = require('child_process');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), FIJO = path.join(__dirname, 'mapa-fijo-t2.json');
const SUB = process.argv.find(a => a.endsWith('.json')); if (!SUB) throw new Error('falta el json del subrayado');
const b = t => `<b>${t}</b>`;
const L = fs.readFileSync(path.join(RAIZ, 'prompts/temario-limpio/tema2/temario.txt'), 'utf8').replace(/\r\n?/g, '\n').replace(/[ -​   　\u0007\u0000]/g, ' ').replace(/­/g, '').split('\n');
const arregla = t => t.replace(/-\s+(?=[a-zñáéíóú])/g, '').replace(/(^|[\s(«])([B-DF-NP-TV-XZÁÉÍÓÚÑ]) (?=[a-záéíóúñ])/g, '$1$2').replace(/(^|[\s(«])E (?=[a-záéíóúñ])/g, '$1E').replace(/\s{2,}/g, ' ').replace(/\s+([,.;:])/g, '$1').trim();
L.forEach((l, i) => { L[i] = l.replace(/^\s*000\d{3}\s+/, ''); });   // «000655 ARTÍCULO 34.»: nº de 6 cifras del OCR
// Preámbulo de la Ley 10/2010: líneas 993-1000 del temario (cada línea es un párrafo)
const preambulo = L.slice(990, 1000).filter(l => !/derechos reservados|^TEMARIO DE|^TOMO \d|^T\d+ [A-ZÁÉÍÓÚ]|^A OFICIAL$|^ASCENSO$/i.test(l.trim())).map(arregla).filter(Boolean)
  .flatMap(p => { const fr = p.split(/(?<=\.)\s+(?=[A-ZÁÉÍÓÚ«])/); const out = []; let cur = ''; for (const f of fr) { if (cur && (cur + ' ' + f).length > 650) { out.push(cur); cur = f; } else cur = cur ? cur + ' ' + f : f; } if (cur) out.push(cur); return out; });   // trozos de ~650 caracteres: un párrafo enorme atrae a preguntas de otros artículos
// artículo n de la Ley 10/2010 (desde la línea 990): lista de apartados ya limpios
const PIE = /derechos reservados|^TEMARIO DE|^TOMO \d|^T\d+ [A-ZÁÉÍÓÚ]|^\d+ \|/i;
function apartados(n) {
  const i = L.findIndex((l, k) => k > 990 && new RegExp('^ARTÍCULO ' + n + '\\.').test(l)); if (i < 0) throw new Error('art ' + n);
  let j = i + 1; while (j < L.length && !/^ARTÍCULO \d/.test(L[j])) j++;
  let t = L.slice(i, j).filter(l => l.trim() && !PIE.test(l.trim())).join(' ');
  t = t.replace(/^ARTÍCULO \d+(?: [A-Z]+)?\.\s+(?:[^a-z]*?\.\s+)(?=\d{1,2}\.\s)/, '');
  { const m0 = t.match(/^(\d{1,2})\.\s/); let exp = m0 ? +m0[1] + 1 : null; const cortes = [0]; const re = /\s(?=(\d{1,2})\.\s+[A-ZÁÉÍÓÚ«])/g; let m; while ((m = re.exec(t))) { const n = +m[1]; if (exp === null ? n <= 2 : n === exp) { cortes.push(m.index + 1); exp = n + 1; } }
    return cortes.map((c, i) => arregla(t.slice(c, cortes[i + 1] === undefined ? undefined : cortes[i + 1] - 1))).filter(Boolean); }
}
const fmtAp = (x, pref) => (pref || '') + x.replace(/^(\d{1,2})\.\s+/, (m, a) => b(a + '.') + ' ');
const art32 = apartados(32).map((x, k) => fmtAp(x, k === 0 ? b('Art. 32.') + ' ' : ''));
const art56 = apartados(56).filter(x => /no publicación de la sanción/.test(x)).map(x => fmtAp(x));
const T = {
  trata13: 'expedidos o presuntamente expedidos en su nombre y',
  var143: `${b('3.')} Cada Parte adoptará las medidas necesarias para establecer su competencia con respecto a todo delito tipificado de conformidad con el presente Convenio en los casos en que el presunto autor del delito se encuentre en su territorio y no lo extradite a una Parte cuya jurisdicción se base en una regla de competencia que exista también en la legislación de la Parte requerida.`,
  pal72: `${b('2.')} Los Estados Parte considerarán la posibilidad de aplicar medidas viables para detectar y vigilar el movimiento transfronterizo de efectivo y de títulos negociables pertinentes, con sujeción a salvaguardias que garanticen la debida utilización de la información y sin restringir en modo alguno la circulación de capitales lícitos. Esas medidas podrán incluir la exigencia de que los particulares y las entidades comerciales notifiquen las transferencias transfronterizas de cantidades elevadas de efectivo y de títulos negociables pertinentes.`,
  bis4: `${b('4.')} Todas las personas físicas que tengan la condición de titulares reales conforme a lo dispuesto en el artículo 4, tendrán la obligación de suministrar de forma inmediata, desde el momento en que tengan conocimiento de ese hecho, a las personas relacionadas en el apartado 3, su condición de titulares reales, con inclusión de los siguientes datos de identificación: ${b('a)')} Nombre y apellidos. ${b('b)')} Fecha de nacimiento. ${b('c)')} Tipo y número de documento identificativo (en el caso de nacionales españoles o residentes en España se incluirá siempre el documento expedido en España). ${b('d)')} País de expedición del documento identificativo, en caso de no utilizarse el Documento Nacional de Identidad o la tarjeta de residente en España. ${b('e)')} País de residencia. ${b('f)')} Nacionalidad. ${b('g)')} Criterio que cualifica a esa persona como titular real. ${b('h)')} En caso de titularidades reales por propiedad directa o indirecta de acciones o derechos de voto, porcentaje de participación, con inclusión, en el caso de propiedad indirecta, de la información sobre las personas jurídicas interpuestas y su participación en cada una de ellas. ${b('i)')} Aquellos otros que, mediante norma reglamentaria, puedan determinarse.`,
};
const OPS = [
  { id: 'art32', marca: 'T2_LEY10', tipo: 'ficha', antes: '  + articuloResp("Artículo 32 ter — Sistemas comunes de información"', cab: 'Artículo 32 — Protección de datos de carácter personal', ps: art32 },
  { id: 'art56', marca: 'T2_LEY10', tipo: 'parr', ficha: 'Artículos 56, 57 y 58 — Sanciones', j: 0, txt: art56[0] },
  { id: 'trata13', marca: 'T2_TRATA', tipo: 'inline', ficha: 'Artículos 11, 12 y 13 — Medidas fronterizas', j: 2, n: 0, txt: T.trata13, sep: ' ', ya: 'identidad expedidos o presuntamente expedidos' },
  { id: 'var143', marca: 'T2_VARSOVIA', tipo: 'parr', ficha: 'Artículos 14 y 15 — Competencia', j: 1, txt: T.var143 },
  { id: 'pal72', marca: 'T2_PALERMO', tipo: 'inline', ficha: 'Artículos 6 y 7 — Blanqueo', j: 2, n: 4, txt: T.pal72, sep: ' ' },
  { id: 'bis4', marca: 'T2_LEY10', tipo: 'parr', ficha: 'Artículo 4 bis', j: 1, txt: T.bis4 },
  { id: 'preambulo', marca: 'T2_LEY10', tipo: 'ficha', antes: '  + bloqueTitulo("CAPÍTULO I. DISPOSICIONES GENERALES")', cab: 'Preámbulo de la Ley 10/2010', ps: preambulo },
];
let s = fs.readFileSync(F, 'utf8');
const esc = t => t.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const plano = h => h.replace(/<[^>]+>/g, '').replace(/\\"/g, '"').replace(/\s+/g, ' ');
const ini2 = s.indexOf('/* T2_LEY19 */'), fin2 = s.length;
const fichaLinea = pref => { const i = s.indexOf('  + articuloResp("' + pref, ini2); if (i < 0 || i > fin2) throw new Error('no encuentro ficha ' + pref); return [i, s.indexOf('\n', i)]; };
const yaHecho = o => o.tipo === 'ficha' ? s.includes('articuloResp("' + esc(o.cab) + '"') : (() => { const [a, e] = fichaLinea(o.ficha); return plano(s.slice(a, e)).includes(o.ya || plano(o.txt).trim().slice(0, 80)); })();
const hacer = OPS.filter(o => !yaHecho(o)); console.log('pendientes:', hacer.map(o => o.id).join(', ') || '—'); if (!hacer.length) process.exit(0);
const snip = o => o.tipo === 'ficha' ? o.ps : [o.txt];
const RNG = JSON.parse(fs.readFileSync(path.join(__dirname, 'rangos-pdf.json'), 'utf8'));
const dirT = path.join(process.env.TEMP || '/tmp', 'rs2m'); fs.mkdirSync(dirT, { recursive: true }); const tmpF = path.join(dirT, 'm.html');
let tmp = '/* M_INI */ X = ""\n';
for (const k of Object.keys(RNG)) { const g = hacer.filter(o => o.marca === k); if (!g.length) continue; tmp += `/* ${k} */ X = ` + g.flatMap(o => snip(o).map((t, i) => `articuloResp("${o.id}_${i}", [], "${esc('<p>' + t + '</p>')}", false)`)).join('\n + ') + ';\n'; }
tmp += '/* M_FIN */\n'; fs.writeFileSync(tmpF, tmp);
cp.execSync(`node "${path.join(__dirname, '..', 'aplicar-subrayado-pdf.js')}" "${SUB}" "${tmpF}" "/* M_INI */" "/* M_FIN */" "${Object.entries(RNG).map(([k, v]) => k + ':' + v.join('-')).join(',')}"`, { stdio: 'inherit', env: { ...process.env, UMBRAL: '0.15' } });
const P = {}; for (const m of fs.readFileSync(tmpF, 'utf8').matchAll(/articuloResp\("((?:[^"\\\n]|\\.)*)", \[\], "((?:[^"\\\n]|\\.)*)", false\)/g)) P[m[1]] = m[2].replace(/^<p>/, '').replace(/<\/p>$/, '');
// firmas previas para realinear mapa-fijo-t2.json
const mp = fs.readFileSync(path.join(RAIZ, 'prompts/herramientas/mapa-preguntas.js'), 'utf8');
const firmas = () => { const cwd = process.cwd(); process.chdir(RAIZ); try { return new Function('fs', 'ESQ', 'TEST', mp.slice(mp.indexOf('// ---------- 1.'), mp.indexOf('// ---------- 5.')).replace(/^const /gm, 'var ') + '; return unidades(cargarEsquemas()[1], 2);')(fs, 'esquemas.html', 'test-oficial-conocimiento.html').map(u => ({ pid: u.pid, T: u.T.trim().slice(0, 45) })); } finally { process.chdir(cwd); } };
const antes = firmas();
for (const o of hacer) {
  if (o.tipo === 'ficha') {
    const i = s.indexOf(o.antes, ini2); if (i < 0) throw new Error('no encuentro ' + o.antes);
    s = s.slice(0, i) + `  + articuloResp("${esc(o.cab)}", [], "${o.ps.map((_, k) => '<p>' + P[o.id + '_' + k] + '</p>').join('')}", false)\n` + s.slice(i); console.log('+ ficha', o.cab); continue;
  }
  const [a, e] = fichaLinea(o.ficha); let Ln = s.slice(a, e); const ps = []; const rx = /<p(?: [^>]*)?>[\s\S]*?<\/p>/g; let m; while ((m = rx.exec(Ln))) ps.push([m.index, m.index + m[0].length]);
  const html = P[o.id + '_0']; if (!html) throw new Error('sin pintar ' + o.id);
  if (o.tipo === 'parr') Ln = Ln.slice(0, ps[o.j][1]) + '<p>' + html + '</p>' + Ln.slice(ps[o.j][1]);
  else { let par = Ln.slice(ps[o.j][0], ps[o.j][1]); let k = -1; par = par.replace(/ ?\(…\)/g, mm => (++k === o.n ? (o.sep || '') + html : mm)); if (k < o.n) throw new Error('sin (…) nº ' + o.n + ' en ' + o.id); Ln = Ln.slice(0, ps[o.j][0]) + par + Ln.slice(ps[o.j][1]); }
  s = s.slice(0, a) + Ln + s.slice(e); console.log('+', o.tipo, o.id);
}
fs.writeFileSync(F, s);
if (fs.existsSync(FIJO)) {
  const despues = firmas(); const mpid = {}; let ptr = 0;
  antes.forEach(x => { let f = -1; for (let n = ptr; n < despues.length; n++) if (despues[n].T === x.T) { f = n; break; } if (f < 0) throw new Error('párrafo perdido ' + x.pid); mpid[x.pid] = despues[f].pid; ptr = f + 1; });
  const fj = JSON.parse(fs.readFileSync(FIJO, 'utf8')); const nuevo = {}; Object.entries(fj).forEach(([id, kj]) => { const np = mpid['2-' + kj]; if (!np) throw new Error('sin realineo ' + id); nuevo[id] = np.replace(/^2-/, ''); });
  fs.writeFileSync(FIJO, JSON.stringify(nuevo)); console.log('mapa-fijo-t2 realineado');
}
