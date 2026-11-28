// Añade AL FINAL de la ficha del esquema los párrafos literales que faltaban (vídeos 28/11/2026) y enlaza sus preguntas.
// Al ir al final no se mueve ningún enlace. Idempotente. Uso: node prompts/herramientas/oficiales-seras-28-11-parrafos.js <parrafos.json>
// parrafos.json: [{ "ids": ["1-643"], "t": 1, "cab": "Artículos 29 a 35", "p": "<b>Art. 31.</b> … <mark class=\"m-resp\">…</mark>" }]
const P = process.cwd() + '/prompts/herramientas/';
require(P + 'esq-virtual.js');
const fs = require('fs');
const OPS = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const src = fs.readFileSync(P + 'mapa-preguntas.js', 'utf8');
const cuerpo = src.slice(src.indexOf('const ESQ ='), src.indexOf('// ---------- 6. Ejecutar'));
const F = new Function('fs', 'require', '__dirname', cuerpo + ';return {cargarEsquemas,unidades,norm};')(fs, require, P);
const BS = String.fromCharCode(92), NL = String.fromCharCode(10);
const lineas = fs.readFileSync('esquemas.html', 'utf8').split(NL);
for (const o of OPS) {
  const ini = lineas.findIndex(l => l.startsWith('/* T' + o.t + '_'));
  const n = lineas.findIndex((l, i) => i > ini && l.includes('articuloResp("' + o.cab));
  if (ini < 0 || n < 0) throw new Error('sin ficha ' + o.cab);
  const nuevo = '<p>' + o.p.split('"').join(BS + '"') + '</p>';
  if (!lineas[n].includes(nuevo)) { const b = lineas[n].lastIndexOf('</p>') + 4; if (b < 4) throw new Error('sin párrafos ' + o.cab); lineas[n] = lineas[n].slice(0, b) + nuevo + lineas[n].slice(b); }
}
fs.writeFileSync('esquemas.html', lineas.join(NL));
const limpio = x => F.norm(x).replace(/[^a-z0-9]/g, '');
const E = F.cargarEsquemas();
for (const o of OPS) {
  const quiero = limpio(o.p);
  const u = F.unidades(E[o.t - 1], o.t).find(u => limpio(u.T) === quiero);
  if (!u) throw new Error('el párrafo no aparece: ' + o.cab);
  const v = u.pid.slice(String(o.t).length + 1) + (u.marks.length ? '-0' : '');
  const MF = `prompts/herramientas/tema${o.t}/mapa-fijo-t${o.t}.json`; const mf = JSON.parse(fs.readFileSync(MF, 'utf8'));
  const MP = 'esquemas-datos/mapa-preguntas.js'; let mp = fs.readFileSync(MP, 'utf8');
  for (const id of o.ids) {
    mf[id] = v;
    if (mp.includes('"' + id + '":"')) mp = mp.replace(new RegExp('"' + id + '":"[^"]*"'), `"${id}":"${o.t}-${v}"`); else mp = mp.replace('window.MAPA_PREG={', () => `window.MAPA_PREG={"${id}":"${o.t}-${v}",`);
    console.log(id, v);
  }
  fs.writeFileSync(MF, JSON.stringify(mf, null, 1)); fs.writeFileSync(MP, mp);
}
