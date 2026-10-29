// Lila ampliado (29/10/2026) sobre lo ya hecho: a cada <mark class="m-accion"> (solo texto plano) se le suma
//  · «no» / «se» / «ni» (hasta 2) justo delante, si están sin colorear («no se podrán», «se comunicará»)
//  · el verbo en infinitivo que va justo detrás de un futuro/modal («podrán comunicar», «tendrá que comunicar»,
//    «deberá ser comunicado»), y luego une marcas lila contiguas.
// No cambia ni una letra del texto (solo reparte etiquetas), así las marcas del usuario no se mueven.
// Uso: node prompts/herramientas/lila-no-se-verbo.js [--dry]   (esquemas.html y expres/t*.js)
const fs = require('fs');
const dry = process.argv.includes('--dry');
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const INF_NO = new Set(['cualquier', 'mujer', 'lugar', 'militar', 'taller', 'hogar', 'particular', 'regular', 'singular', 'similar', 'popular', 'familiar', 'titular', 'secular', 'consular', 'ejemplar', 'caracter', 'cancer', 'martir', 'mar', 'par', 'pilar', 'azucar']);
const esInf = w => /^[a-zñ]{2,}(ar|er|ir)(se|le|les|lo|los|la|las|me|nos|te)?$/.test(norm(w)) && !INF_NO.has(norm(w));
const esPart = w => /^[a-zñ]{3,}(ado|ada|ados|adas|ido|ida|idos|idas|to|ta|tos|tas|cho|cha|chos|chas|so|sa)$/.test(norm(w));
const MODAL = /^(?:[a-záéíóúüñ]{2,}r(?:á|án)|puede|pueden|debe|deben)$/i;
const NEGA = new Set(['no', 'se', 'ni']);
const reMark = /<mark class=(\\?["']?)m-accion\1>([^<]*)<\/mark>/g;
const reAntes = /(?:^|[>\s("«])((?:(?:no|se|ni)\s+){1,2})$/i;
const reSig = /^(\s+)(que\s+)?([a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+)(?=[\s.,;:)<\\]|$)/;
const reSig2 = /^(\s+)([a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+)(?=[\s.,;:)<\\]|$)/;

function aplica(s) {
  let pre = 0, suf = 0, m, ult = 0;
  const trozos = [];
  reMark.lastIndex = 0;
  while ((m = reMark.exec(s))) {
    const q = m[1], txt = m[2], off = m.index, fin0 = off + m[0].length;
    let ant = '', fin = '';
    const mp = reAntes.exec(s.slice(Math.max(ult, off - 24), off));
    if (mp && mp[1].trim().split(/\s+/).every(w => NEGA.has(w.toLowerCase()))) ant = mp[1];
    const lastW = txt.trim().split(/\s+/).pop() || '';
    if (MODAL.test(lastW)) {
      const despues = s.slice(fin0, fin0 + 60), ms = reSig.exec(despues);
      if (ms && esInf(ms[3])) {
        fin = ms[1] + (ms[2] || '') + ms[3];
        if (/^(ser|estar|haber)$/i.test(ms[3])) { const mq = reSig2.exec(despues.slice(ms[0].length)); if (mq && esPart(mq[2])) fin += mq[1] + mq[2]; }
      }
    }
    if (!ant && !fin) continue;
    if (ant) pre++; if (fin) suf++;
    trozos.push({ ini: off - ant.length, fin: fin0 + fin.length, nuevo: '<mark class=' + q + 'm-accion' + q + '>' + ant + txt + fin + '</mark>' });
    ult = fin0 + fin.length; reMark.lastIndex = ult;
  }
  let out = '', c = 0;
  for (const t of trozos) { out += s.slice(c, t.ini) + t.nuevo; c = t.fin; }
  out += s.slice(c);
  // une marcas lila contiguas separadas solo por espacios
  const un = /<\/mark>([ \t]+)<mark class=(\\?["']?)m-accion\2>/g; let u = 0, n;
  do { n = 0; out = out.replace(un, (mm, sp, q, off, str) => { const pr = str.lastIndexOf('<mark class=', off); if (!/m-accion/.test(str.slice(pr, pr + 40))) return mm; n++; return sp; }); u += n; } while (n);
  return [out, pre, suf, u];
}
const files = ['esquemas.html', ...fs.readdirSync('expres').filter(f => /^t\d+\.js$/.test(f)).map(f => 'expres/' + f)];
const T = [0, 0, 0];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8'), [o, p, x, u] = aplica(s);
  console.log(f, 'delante:', p, 'detrás:', x, 'uniones:', u);
  T[0] += p; T[1] += x; T[2] += u;
  if (!dry && o !== s) fs.writeFileSync(f, o);
}
console.log('TOTAL delante', T[0], 'detrás', T[1], 'uniones', T[2], dry ? '(simulacro)' : '(escrito)');
