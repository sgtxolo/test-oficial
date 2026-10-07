// Añade al esquema del Tema 11 los artículos que el usuario marcó en su temario escaneado con un círculo EX / EXOF
// (o el sello EXAMEN 2020) y que aún no estaban en esquemas.html. Texto LITERAL del extracto oficial (prompts/temario-limpio/tema11),
// subrayado con los colores reales de su temario (aplicar-subrayado-pdf.js sobre un html temporal solo con estos artículos).
// Uso: node prompts/herramientas/anadir-ex-t11.js <subrayado.json>      (idempotente: salta los artículos que ya existen)
const fs = require('fs'), path = require('path'), cp = require('child_process');
const F = 'esquemas.html', DIR = 'prompts/temario-limpio/tema11/';
const SUB = process.argv[2];
const NORMAS = {
  l39: { txt: '2-l39.txt', marca: 'T11_L39', pag: '107-194', nombre: 'Ley 39/2015' },
  l40: { txt: '3-l40.txt', marca: 'T11_L40', pag: '195-266', nombre: 'Ley 40/2015' },
  l19: { txt: '4-l19.txt', marca: 'T11_L19', pag: '267-300', nombre: 'Ley 19/2013' },
  rd:  { txt: '5-rd.txt',  marca: 'T11_RD',  pag: '304-316', nombre: 'RD 179/2005' } };
// afterHeading: el artículo pertenece al capítulo cuyo encabezado va justo antes del siguiente artículo ya existente
const NUEVOS = [
  ['l39', '66', { afterHeading: 1 }], ['l39', '76', { heading: 'TÍTULO IV — De las disposiciones sobre el procedimiento administrativo común · CAPÍTULO IV — Instrucción del procedimiento · Sección 1.ª Disposiciones generales', afterHeading: 1 }],
  ['l39', '101'], ['l39', '102'], ['l39', '103'], ['l39', '104'], ['l39', '109'], ['l39', '110'], ['l39', '111'],
  ['l39', '114'], ['l39', '115'], ['l39', '118'], ['l39', '119'], ['l39', '121', { afterHeading: 1 }], ['l39', '123', { afterHeading: 1 }],
  ['l39', '126'], ['l39', '127', { afterHeading: 1 }], ['l39', '131'],
  ['l40', '34'], ['l40', '38', { afterHeading: 1 }], ['l40', '42'], ['l40', '46'], ['l40', '50'], ['l40', '58'], ['l40', '59'], ['l40', '60'], ['l40', '63'],
  ['l40', '65'], ['l40', '66'], ['l40', '70'], ['l40', '73'], ['l40', '75'], ['l40', '78'], ['l40', '79'],
  ['l40', '144'], ['l40', '145'], ['l40', '146'], ['l40', '147'], ['l40', '148'], ['l40', '153'],
  ['l19', '7'], ['l19', '13'], ['l19', '25', { afterHeading: 1 }], ['l19', '26', { afterHeading: 1 }], ['l19', '34'], ['l19', '35'], ['l19', '39'], ['l19', '40'],
  ['rd', '9'], ['rd', '10'], ['rd', '11']];

const esc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
function articuloTxt(norma, n) {
  const L = fs.readFileSync(DIR + NORMAS[norma].txt, 'utf8').split('\n');
  const i = L.findIndex(l => new RegExp('^Artículo ' + n + '\\.\\s').test(l));
  if (i < 0) throw new Error('no está en el extracto: ' + norma + ' art. ' + n);
  const m = /^Artículo (\S+)\.\s*(.*?)\.?\s*$/.exec(L[i]);
  let j = i + 1; while (j < L.length && !/^Artículo \S+\.\s/.test(L[j]) && !/^(Disposición|TÍTULO|CAPÍTULO)/.test(L[j])) j++;
  let tit = m[2], ps = L.slice(i + 1, j).map(x => x.trim()).filter(Boolean);
  const cut = tit.indexOf('. ');   // título y primer párrafo en la misma línea del extracto
  if (cut > 0) { let rest = tit.slice(cut + 2).trim(); tit = tit.slice(0, cut); if (/.$/.test(rest) && ps[0] && /^[a-zñáéíóú]/.test(ps[0])) rest = rest.slice(0, -1) + ' ' + ps.shift(); ps.unshift(rest); }
  const html = ps.map(p => { const k = /^(\d+\.|[a-zñ]\)|\d+\.º)\s+/.exec(p); return k ? `<p><b>${k[1]}</b> ${p.slice(k[0].length)}</p>` : `<p>${p}</p>`; }).join('');
  return { cab: `Artículo ${m[1]} — ${tit}`, html };
}
const num = c => { const m = /^Artículo (\d+)/.exec(c); return m ? +m[1] : null; };

let s = fs.readFileSync(F, 'utf8');
const porNorma = {};
for (const [nm, n, op] of NUEVOS) {
  (porNorma[nm] = porNorma[nm] || []).push({ n, op: op || {} });
}
// 1) html temporal solo con los artículos nuevos (para pintarlos con el subrayado del usuario)
const bloqueDe = nm => { const a = s.indexOf(`/* ${NORMAS[nm].marca} */`); const b = s.indexOf('/* T11_', a + 10); return [a, b]; };
const pendientes = {};
let tmp = '';
for (const [nm, lista] of Object.entries(porNorma)) {
  const [a, b] = bloqueDe(nm); const bloque = s.slice(a, b);
  pendientes[nm] = lista.filter(x => !new RegExp(`articuloResp\\("Artículo ${x.n} —`).test(bloque)).map(x => ({ ...x, ...articuloTxt(nm, x.n) }));
  if (pendientes[nm].length) tmp += `/* ${NORMAS[nm].marca} */ X = ${pendientes[nm].map(x => `articuloResp("${esc(x.cab)}", [], "${esc(x.html)}", true)`).join('\n + ')};\n`;
}
if (!tmp) { console.log('nada que añadir'); process.exit(0); }
tmp += '/* T11_FIN */\n';
const tmpF = process.env.TEMP + '/t11/nuevos.html'; fs.writeFileSync(tmpF, tmp);
const rangos = Object.entries(NORMAS).map(([k, v]) => `${v.marca}:${v.pag}`).join(',');
const primera = Object.keys(porNorma).find(k => pendientes[k] && pendientes[k].length);
cp.execSync(`node prompts/herramientas/aplicar-subrayado-pdf.js "${SUB}" "${tmpF}" "/* ${NORMAS[primera].marca} */" "/* T11_FIN */" "${rangos}"`, { stdio: 'inherit', env: { ...process.env, UMBRAL: '0.15' } });
const pintado = fs.readFileSync(tmpF, 'utf8');
// 2) leer las fichas pintadas
const fichas = {};
for (const m of pintado.matchAll(/articuloResp\("((?:[^"\\\n]|\\.)*)", \[\], "((?:[^"\\\n]|\\.)*)", true\)/g)) fichas[new Function('return "' + m[1] + '"')()] = m[2];
// 3) insertar en esquemas.html
const marca = h => h.replace(/<p>/g, '<p data-ex=\\"1\\">');
let total = 0;
for (const [nm, lista] of Object.entries(pendientes)) {
  for (const x of lista) {
    const lit = fichas[x.cab]; if (!lit) { console.error('sin ficha pintada:', x.cab); continue; }
    const ficha = `  + articuloResp("${esc(x.cab)}", [], "${marca(lit)}", true)`;
    let [a, b] = bloqueDe(nm); const L = s.slice(0, b).split('\n');
    const ini = s.slice(0, a).split('\n').length - 1;
    // última línea de artículo ya existente con número < n (y si no hay, la cabecera de la norma)
    let prev = -1, sig = -1;
    for (let i = ini; i < L.length; i++) {
      const mm = /^  \+ articuloResp\("Artículo (\d+)[^"]* —/.exec(L[i]) || /^  \+ articuloResp\("Artículo (\d+) —/.exec(L[i]);
      if (!mm) continue; const k = +mm[1];
      if (k < +x.n) prev = i; else if (sig < 0) sig = i;
    }
    if (sig < 0 && nm === 'l19') sig = L.findIndex((l, i) => i > ini && /^  \+ bloqueTitulo\("DISPOSICIONES ADICIONALES/.test(l));
    let pos;
    if (sig >= 0) {
      pos = sig; // justo antes del artículo siguiente…
      const heads = []; while (/^  \+ bloqueTitulo\(/.test(L[pos - 1])) { pos--; heads.push(pos); }
      if (x.op.afterHeading && heads.length) pos = heads[0] + 1; // …después de su encabezado si el artículo abre capítulo
    } else { pos = L.length; while (!/^  \+ /.test(L[pos - 1]) && pos > 0) pos--; }
    const ins = (x.op.heading ? [`  + bloqueTitulo("${esc(x.op.heading)}")`] : []).concat([ficha]);
    const lines = s.split('\n'); lines.splice(pos, 0, ...ins); s = lines.join('\n'); total++;
    console.log(`+ ${NORMAS[nm].nombre} ${x.cab.slice(0, 60)}  (línea ${pos + 1})`);
  }
}
fs.writeFileSync(F, s);
console.log('añadidos:', total);
