// Poda del esquema del Tema 5: quita los párrafos que SOLO vienen de preguntas oficiales y que el usuario NO tiene subrayados
// (regla del encargo: solo se trabaja lo subrayado).
// Uso: UMBRAL=0.2 REPORT=rep.json node aplicar-subrayado-pdf.js … --dry   y luego   node podar-t5.js rep.json
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..'); const F = path.join(ROOT, 'esquemas.html');
const rep = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const side = JSON.parse(fs.readFileSync(path.join(ROOT, 'prompts', 'temario-limpio', 'tema5', 't5-parrafos.json'), 'utf8'));
const quitar = {};   // 'norma|cab' -> Set(índices de párrafo)
let nQ = 0;
for (const f of rep) {
  const nm = f.norma === 'T5_CV2' ? 'T5_CV' : f.norma; const sd = side[nm + '|' + f.cab] || [];
  f.paras.forEach((p, i) => { const s = sd[i] || {};
    if (!s.ia && p.w >= 3 && p.al / p.w >= 0.5 && p.col / p.w < 0.03) { (quitar[nm + '|' + f.cab] = quitar[nm + '|' + f.cab] || new Set()).add(i); nQ++; } });
}
const h = fs.readFileSync(F, 'utf8'); const a = h.indexOf('const T5 = {};'), b = h.indexOf('/* T5_RECUERDA');
const lines = h.slice(a, b).split('\n'); let nm = ''; const out = []; let fichasQ = 0, parQ = 0;
const reFicha = /^  \+ articuloResp\(("(?:[^"\\\n]|\\.)*"), (\[.*?\]), ("(?:[^"\\\n]|\\.)*")(, true)?\)(.*)$/;
for (let i = 0; i < lines.length; i++) {
  let l = lines[i]; const mm = /^\/\* (T5_[A-Z0-9]+) \*\//.exec(l); if (mm) nm = mm[1];
  const m = reFicha.exec(l);
  if (m) {
    const cab = JSON.parse(m[1]); const q = quitar[nm + '|' + cab];
    if (q) {
      const html = JSON.parse(m[3]); let k = -1; const ps = [];
      html.replace(/<p>[\s\S]*?<\/p>/g, x => { k++; if (!q.has(k)) ps.push(x); else parQ++; return x; });
      if (!ps.length) {            // ficha vacía: se quita la línea conservando el «;» final y los comentarios de marca
        fichasQ++; const resto = m[5];
        if (/;\s*$/.test(resto) && out.length) out[out.length - 1] = out[out.length - 1].replace(/\s*(\/\*[^*]*\*\/)?\s*$/, (x, c) => ';' + (c ? ' ' + c : ''));
        else if (/\/\*/.test(resto) && out.length) out[out.length - 1] += ' ' + resto.trim();
        continue;
      }
      l = '  + articuloResp(' + m[1] + ', ' + m[2] + ', ' + JSON.stringify(ps.join('')) + (m[4] || '') + ')' + m[5];
    }
  }
  out.push(l);
}
fs.writeFileSync(F, h.slice(0, a) + out.join('\n') + h.slice(b));
console.log('párrafos oficiales sin subrayar quitados:', parQ, '· fichas vacías quitadas:', fichasQ, '(candidatos', nQ + ')');
