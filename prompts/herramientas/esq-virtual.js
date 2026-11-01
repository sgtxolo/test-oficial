// Capa de lectura/escritura de esquemas.html para las herramientas.
// En el repositorio, los textos de las leyes (líneas enormes «Tn.x = "…";») viven en esquemas-datos/tN.js y esquemas.html
// solo lleva «Tn.x = window.ESQ_TXT["Tn.x"];». Al hacer require() de este módulo, fs.readFileSync('esquemas.html') devuelve el
// archivo COMPLETO (con los textos puestos en su sitio) y fs.writeFileSync('esquemas.html', …) lo vuelve a separar solo.
// Así las herramientas siguen viendo y editando las mismas líneas de siempre. Uso: require('<ruta>/esq-virtual.js') arriba del todo.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..'), ESQ = path.join(RAIZ, 'esquemas.html'), DAT = path.join(RAIZ, 'esquemas-datos');
const LIMITE = 20000, CAB = /^(\s*(?:\/\*[^*]*\*\/\s*)?)(T\d+\.\w+) = /, REF = /^(\s*(?:\/\*[^*]*\*\/\s*)?)(T\d+\.\w+) = window\.ESQ_TXT\["([^"]+)"\];$/;
// huecos y mapa de preguntas: en el repositorio son archivos aparte; las herramientas los ven en línea, como siempre
const DATOS = [['huecos-temario', 'huecos'], ['mapa-preguntas', 'mapa-preguntas']];
const PRE ='(window.ESQ_TXT=window.ESQ_TXT||{})[';
const rd = fs.readFileSync.bind(fs), wr = fs.writeFileSync.bind(fs), rdl = f => rd(f, 'utf8').replace(/\r\n/g, '\n');   // siempre con saltos de línea LF (Git en Windows los cambia a CRLF)
const temaDe = k => +/^T(\d+)\./.exec(k)[1];

function esLiteral(s) {   // «"…"» con una sola cadena (sin comillas sin escapar por dentro)
  if (s[0] !== '"' || s[s.length - 1] !== '"') return false;
  for (let i = 1; i < s.length - 1; i++) { const c = s[i]; if (c === '\\') i++; else if (c === '"') return false; }
  return true;
}
const cache = {};
function entradas(n) {
  const f = path.join(DAT, 't' + n + '.js'), m = fs.existsSync(f) ? fs.statSync(f).mtimeMs : -1;
  if (cache[n] && cache[n].m === m) return cache[n].e;
  const e = {};
  if (m >= 0) for (const l of rdl(f).split('\n')) {
    if (!l.startsWith(PRE + '"')) continue;
    const i = l.indexOf('"]=', PRE.length + 1); e[l.slice(PRE.length + 1, i)] = l.slice(i + 3, l.length - 1);
  }
  cache[n] = {m, e}; return e;
}
function expandir(h) {
  return h.split('\n').map(l => {
    const d = DATOS.find(x => l === '<script src="esquemas-datos/' + x[1] + '.js"></script>');
    if (d && fs.existsSync(path.join(DAT, d[1] + '.js'))) return '<script id="' + d[0] + '">' + rdl(path.join(DAT, d[1] + '.js')).replace(/\n$/, '') + '</script>';
    if (l.length > 300 || l.indexOf('window.ESQ_TXT["') < 0) return l;
    const m = REF.exec(l); if (!m) return l;
    const lit = entradas(temaDe(m[2]))[m[3]]; if (lit === undefined) throw new Error('Falta ' + m[3] + ' en esquemas-datos');
    return m[1] + m[2] + ' = ' + lit + ';';
  }).join('\n');
}
function partir(h) {
  const por = {}, uso = {};
  const out = h.split('\n').map(l => {
    const dd = l.length >= LIMITE && DATOS.find(x => l.startsWith('<script id="' + x[0] + '">') && l.endsWith('</script>'));
    if (dd) {
      const cu = l.slice(('<script id="' + dd[0] + '">').length, l.length - 9), fz = path.join(DAT, dd[1] + '.js');
      fs.mkdirSync(DAT, {recursive: true}); if (!fs.existsSync(fz) || rdl(fz) !== cu + '\n') wr(fz, cu + '\n');
      return '<script src="esquemas-datos/' + dd[1] + '.js"></script>';
    }
    if (l.length < LIMITE) return l;
    const m = CAB.exec(l.slice(0, 200)); if (!m || !l.endsWith(';')) return l;
    const lit = l.slice(m[0].length, l.length - 1); if (!esLiteral(lit)) return l;
    let k = m[2]; uso[k] = (uso[k] || 0) + 1; if (uso[k] > 1) k += '#' + uso[k];
    (por[temaDe(m[2])] = por[temaDe(m[2])] || []).push(PRE + JSON.stringify(k) + ']=' + lit + ';');
    return m[1] + m[2] + ' = window.ESQ_TXT[' + JSON.stringify(k) + '];';
  });
  fs.mkdirSync(DAT, {recursive: true});
  let res = out.join('\n');
  for (const n of Object.keys(por).sort((a, b) => a - b)) {
    const f = path.join(DAT, 't' + n + '.js'), txt = por[n].join('\n') + '\n';
    if (!fs.existsSync(f) || rdl(f) !== txt) wr(f, txt);
    const tag = '<script src="esquemas-datos/t' + n + '.js"></script>';
    if (!res.includes(tag)) { const anc = '<script src="esquemas-datos/mapa-preguntas.js"></script>'; res = res.replace(anc, () => anc + '\n' + tag); }
  }
  return res;
}
if (!fs.__esqVirtual) {
  fs.__esqVirtual = true;
  const es = p => typeof p === 'string' && path.resolve(p).toLowerCase() === ESQ.toLowerCase();
  fs.readFileSync = function (p, o) {
    if (!es(p)) return rd.apply(fs, arguments);
    const enc = typeof o === 'string' ? o : o && o.encoding, s = expandir(rdl(p));
    return enc ? s : Buffer.from(s);
  };
  fs.writeFileSync = function (p, d, o) { return es(p) ? wr(p, partir(String(d)), 'utf8') : wr.apply(fs, arguments); };
}
module.exports = {expandir, partir};
