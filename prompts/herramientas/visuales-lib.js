// Librería común de esquemas visuales (árboles, flujos, comparaciones y plazos) para cualquier tema.
// Uso desde un script de tema:
//   const L = require('./visuales-lib.js'); const { R, P, D, Y, K, arbol, flujo, cols, plazos } = L;
//   const V = []; const v = (despues, html) => V.push([despues, html]);  ...  L.inserta(12, V);
// El CSS de los componentes lo inserta visuales-t1.js (ya está en esquemas.html).
const fs = require('fs');
const { aplica } = require('./reglas-color.js');

const R = x => `<mark class="m-resp">${x}</mark>`;       // respuesta de un test
const P = x => `<mark class="m-plazo">${x}</mark>`;      // plazos, cifras
const D = x => `<mark class="m-destacable">${x}</mark>`; // conceptos clave
const Y = x => `<mark class="m-personalizado">${x}</mark>`;
const K = x => `<u class="m-clave">${x}</u>`;            // no, salvo, únicamente, en todo caso…
const X = s => aplica(s);

const arbol = (titulo, raiz, ramas) => `<div class="vis"><div class="vis-t"><i>🌳</i>${titulo}</div><div class="vis-arbol"><div class="vis-raiz">${X(raiz)}</div><div class="vis-ramas">${ramas.map(r => typeof r === 'string' ? `<div class="vis-rama">${X(r)}</div>` : `<div class="vis-rama">${X(r.t)}<div class="vis-sub">${r.sub.map(s => `<span>${X(s)}</span>`).join('')}</div></div>`).join('')}</div></div></div>`;
const paso = p => typeof p === 'string' ? `<div class="vis-paso">${X(p)}</div>` : `<div class="vis-paso ${p.c || ''}">${p.et ? `<span class="et">${p.et}</span>` : ''}${X(p.t)}</div>`;
const flujo = (titulo, pasos) => `<div class="vis"><div class="vis-t"><i>➜</i>${titulo}</div><div class="vis-flujo">${pasos.map(p => p && p.bif ? `<div class="vis-bifurca">${p.bif.map(paso).join('')}</div>` : paso(p)).join('<div class="vis-flecha">↓</div>')}</div></div>`;
const cols = (titulo, columnas, medio) => `<div class="vis"><div class="vis-t"><i>⇄</i>${titulo}</div><div class="vis-comp${medio ? ' med' : ''}" style="--n:${columnas.length}">${columnas.map((c, i) => `<div class="vis-col"><h5>${X(c.t)}</h5><ul>${c.l.map(x => `<li>${X(x)}</li>`).join('')}</ul></div>${medio && i === 0 ? `<div class="vis-mid">${medio}</div>` : ''}`).join('')}</div></div>`;
const plazos = (titulo, items) => `<div class="vis"><div class="vis-t"><i>⏱</i>${titulo}</div><div class="vis-plazos">${items.map(([n, t]) => `<div class="vis-plazo"><span class="n">${n}</span>${X(t)}</div>`).join('')}</div></div>`;

// Tabla jerárquica (objeto → subobjeto → plazo y cómputo), como las tablas del temario.
// nodos = [{l:'etiqueta', c:'o|v|c', h:[nodos…]} | {p:'2 meses', c:'o|v|n', t:'texto'}]
const tabla = (titulo, cab, nodos) => {
  const hoja = h => `<div class="vt-hoja"><span class="vt-p ${h.c || ''}">${h.p}</span><div class="vt-t">${X(h.t)}</div></div>`;
  const nodo = n => n.p ? hoja(n) : `<div class="vt-nodo"><div class="vt-et ${n.c || ''}">${X(n.l)}</div><div class="vt-hijos">${n.h.map(nodo).join('')}</div></div>`;
  return `<div class="vis"><div class="vis-t"><i>▦</i>${titulo}</div><div class="vis-tabla"><div class="vt-cab"><span>${cab[0]}</span><span>${cab[1]}</span></div>${nodos.map(nodo).join('')}</div></div>`;
};

// Inserta los diagramas V=[[cabecera de la ficha tras la que van, html]] en el esquema del tema N de esquemas.html.
function inserta(N, V, F = 'esquemas.html') {
  let s = fs.readFileSync(F, 'utf8');
  const ini0 = `const T${N} = {};`, fin0 = `/* T${N}_RECUERDA`;
  const nom = `VIS_T${N}`;
  // 1) limpiar versión anterior
  s = s.replace(new RegExp(`^const ${nom} = \\{[\\s\\S]*?\\n\\};\\n`, 'm'), '');
  { const keep = []; let dentro = false;
    for (const l of s.split('\n')) {
      if (l.startsWith(ini0)) dentro = true; if (l.startsWith(fin0)) dentro = false;
      if (dentro && /^  \+ \/\*VIS\*\//.test(l)) { if (/;\s*$/.test(l)) keep[keep.length - 1] = keep[keep.length - 1].replace(/(\s*)$/, ';$1'); continue; }
      keep.push(l); }
    s = keep.join('\n'); }
  // 2) definiciones
  const defs = V.map(([, h], i) => `  v${i}: ${JSON.stringify(h)}`).join(',\n');
  s = s.replace(ini0, `const ${nom} = {\n${defs}\n};\n${ini0}`);
  // 3) inserciones
  const lines = s.split('\n');
  const ini = lines.findIndex(l => l.startsWith(ini0)), fin = lines.findIndex(l => l.startsWith(fin0));
  const out = []; const usados = new Set();
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    if (i > ini && i < fin && lines[i].startsWith('  + articuloResp("')) {
      const cab = lines[i].slice('  + articuloResp("'.length);
      const idx = V.map((x, k) => [x, k]).filter(([x]) => cab.startsWith(x[0]) || cab.includes(x[0])).map(([, k]) => k).filter(k => !usados.has(k));
      if (!idx.length) continue;
      if (/^  \+ trampa\(/.test(lines[i + 1] || '')) { out.push(lines[i + 1]); i++; }
      let pc = false; const ult = out[out.length - 1];
      if (/;\s*$/.test(ult)) { out[out.length - 1] = ult.replace(/;(\s*)$/, '$1'); pc = true; }
      for (const k of idx) { out.push(`  + /*VIS*/ ${nom}.v${k}`); usados.add(k); }
      if (pc) out[out.length - 1] += ';';
    }
  }
  const faltan = V.map((x, k) => k).filter(k => !usados.has(k));
  if (faltan.length) console.error('SIN COLOCAR:', faltan.map(k => V[k][0]).join(' | '));
  fs.writeFileSync(F, out.join('\n'));
  console.log(`Tema ${N}: diagramas ${V.length}, colocados ${usados.size}`);
}
module.exports = { R, P, D, Y, K, X, arbol, flujo, cols, plazos, tabla, inserta };
