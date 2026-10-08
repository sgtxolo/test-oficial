// Mini-DSL → HTML para pasar las fotos del temario al esquema.
//  {o x} naranja(destacable) {v x} verde(autoridad) {m x} morado(acción) {a x} amarillo(personalizado) {z x} azul(plazo)
//  letra extra r = raya roja:  {ar x}  ;  {r x} = solo raya roja
//  [[ x ]] cuadrado azul · [[! x ]] cuadrado rojo · (( x )) círculo rojo · ((~ x )) círculo azul
//  {*} asterisco rojo · {>} flecha · {# texto} nota azul a mano · {#r texto} nota roja a mano
//  @box ... @end → cajita con lista (párrafos dentro)
const CLS = { o: 'm-destacable', v: 'm-autoridad', m: 'm-accion', a: 'm-personalizado', z: 'm-plazo' };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');

function tokenizeParagraph(src) {
  const toks = []; let wid = 0; const wr = []; let pend = false;
  const attrs = { color: null, ul: false };
  function addText(txt, a) {
    const parts = txt.split(/(\s+)/);
    for (const p of parts) {
      if (!p) continue;
      if (/^\s+$/.test(p)) { pend = true; continue; }
      toks.push({ t: p, color: a.color, ul: a.ul, resp: false, wr: wr.slice(), sp: pend });
      pend = false;
    }
  }
  function atom(html, cls) { toks.push({ html, kind: cls, color: null, ul: false, resp: false, wr: wr.slice(), sp: pend }); pend = false; }
  let i = 0, plain = '';
  const flush = () => { if (plain) { addText(plain, { color: null, ul: false }); plain = ''; } };
  while (i < src.length) {
    if (src.startsWith('[[', i)) { flush(); let cls = 'm-caja'; i += 2; if (src[i] === '!') { cls = 'm-caja ro'; i++; } wr.push({ id: ++wid, cls }); continue; }
    if (src.startsWith(']]', i)) { flush(); wr.pop(); i += 2; continue; }
    if (src.startsWith('((', i)) { flush(); let cls = 'm-circulo'; i += 2; if (src[i] === '~') { cls = 'm-circulo az'; i++; } wr.push({ id: ++wid, cls }); continue; }
    if (src.startsWith('))', i)) { flush(); wr.pop(); i += 2; continue; }
    if (src[i] === '{') {
      flush();
      const end = src.indexOf('}', i); if (end < 0) throw new Error('falta } en: ' + src.slice(i, i + 40));
      const body = src.slice(i + 1, end); i = end + 1;
      const sp = body.indexOf(' ');
      const spec = sp < 0 ? body : body.slice(0, sp); const txt = sp < 0 ? '' : body.slice(sp + 1);
      if (spec === '*') { atom('<span class="m-ast"></span>', 'ast'); pend = false; continue; }
      if (spec === '>') { atom('<span class="m-flecha"></span>', 'arrow'); continue; }
      if (spec === '#' || spec === '#r') { atom('<span class="m-nota' + (spec === '#r' ? ' ro' : '') + '">' + esc(txt) + '</span>', 'nota'); continue; }
      const color = [...spec].find(c => CLS[c]) || null; const ul = spec.includes('r');
      if (!color && !ul) throw new Error('spec desconocida {' + spec + '}');
      addText(txt, { color, ul });
      continue;
    }
    plain += src[i]; i++;
  }
  flush();
  return toks;
}

function groupHtml(group) {
  const first = group[0];
  let s = '';
  group.forEach((t, k) => { s += (k && t.sp ? ' ' : '') + (t.html ? t.html : (t.bold ? '<b>' + esc(t.t) + '</b>' : esc(t.t))); });
  if (first.html) return s;
  if (first.resp) return '<mark class="m-resp">' + s + '</mark>';
  if (first.color && first.ul) return '<mark class="' + CLS[first.color] + '"><u class="m-clave">' + s + '</u></mark>';
  if (first.color) return '<mark class="' + CLS[first.color] + '">' + s + '</mark>';
  if (first.ul) return '<u class="m-clave">' + s + '</u>';
  return s;
}
const keyOf = t => t.html ? 'h' + Math.random() : [t.color, t.ul, t.resp].join('|');

function render(toks, depth) {
  let out = '', i = 0, first = true;
  while (i < toks.length) {
    const t = toks[i];
    const w = t.wr[depth];
    if (w) {
      let j = i; while (j < toks.length && toks[j].wr[depth] && toks[j].wr[depth].id === w.id) j++;
      const run = toks.slice(i, j);
      out += (t.sp && !first ? ' ' : '') + '<span class="' + w.cls + '">' + render(run, depth + 1) + '</span>';
      i = j; first = false; continue;
    }
    let j = i + 1;
    if (!t.html) while (j < toks.length && !toks[j].wr[depth] && !toks[j].html && keyOf(toks[j]) === keyOf(t)) j++;
    out += (t.sp && !first ? ' ' : '') + groupHtml(toks.slice(i, j));
    i = j; first = false;
  }
  return out;
}

function buildArticle(dsl, oldResp) {
  const lines = dsl.split('\n').map(l => l.trim()).filter(Boolean);
  const paras = []; let box = null; const allToks = [];
  for (const l of lines) {
    if (l === '@box') { box = []; continue; }
    if (l === '@end') { paras.push({ box }); box = null; continue; }
    const toks = tokenizeParagraph(l);
    if (toks.length && !toks[0].html && /^\d+\.º?$/.test(toks[0].t)) toks[0].bold = true;
    allToks.push(toks);
    const p = { toks };
    if (box) box.push(p); else paras.push(p);
  }
  // sobreponer las respuestas de test (m-resp) del esquema anterior
  const unmatched = [];
  for (const ph of oldResp) {
    const words = ph.split(/\s+/).map(norm).filter(Boolean);
    if (!words.length) continue;
    let hit = false;
    for (const toks of allToks) {
      const idx = []; toks.forEach((t, k) => { if (!t.html && norm(t.t)) idx.push(k); });
      for (let a = 0; a + words.length <= idx.length; a++) {
        let ok = true; for (let b = 0; b < words.length; b++) if (norm(toks[idx[a + b]].t) !== words[b]) { ok = false; break; }
        if (ok) { hit = true; for (let b = 0; b < words.length; b++) { const tk = toks[idx[a + b]]; tk.resp = true; tk.color = null; tk.ul = false; } }
      }
    }
    if (!hit) unmatched.push(ph);
  }
  const rp = p => '<p>' + render(p.toks, 0) + '</p>';
  const html = paras.map(p => p.box
    ? '<div style="border:1.5px solid #3b3f9e;border-radius:10px;padding:4px 14px;margin:4px 0 8px 18px">' + p.box.map(rp).join('') + '</div>'
    : rp(p)).join('');
  return { html, unmatched, text: allToks.map(t => t.map(x => x.t || '').join(' ')).join(' ') };
}
module.exports = { buildArticle, norm };
