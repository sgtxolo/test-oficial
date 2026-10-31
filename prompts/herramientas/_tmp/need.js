const fs = require('fs'); global.window = {}; require('../../../expres-subrayado/datos-t11.js'); const S = window.EXSUB[11];
const th = fs.readFileSync('test-oficial-conocimiento.html', 'utf8'), i0 = th.indexOf('window.piezaSubrayado = function'), i1 = th.indexOf('\n  };\n', i0);
const hw = {}; new Function('window', th.slice(i0, i1 + 5))(hw);
const RQ = new RegExp('\{"id":"(11-[^"]+)","pregunta":"((?:[^"\\]|\\.)*)","opciones"[\s\S]{0,3000}?"explicacion":"((?:[^"\\]|\\.)*)"', 'g');
const c = {};
for (const m of th.matchAll(RQ)) { const e = m[3].replace(/\\"/g, '"'); if (hw.piezaSubrayado(S, m[1], e)) continue; const t = e.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const mm = t.match(/((?:disposici[óo]n(?:es)? (?:adicional|transitoria|final|derogatoria)[^"]{0,20}?|pre[áa]mbulo[^"]{0,25}?|art(?:ículo|\.)\s*\d+[^"]{0,6}?)(?:\s*\([^)]{0,30}\))?\s+(?:de|del)\s+(?:la |el )?[^"]{3,50}?)(?=\s+(?:dispone|establece|señala|indica|regula|recoge)|[:,."])/i);
  const k = mm ? mm[1].slice(0, 90) : '(sin cita reconocible) ' + t.slice(0, 50); (c[k] = c[k] || []).push(m[1]); }
Object.entries(c).sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => console.log(v.length + ' ' + k + ' | ' + v.slice(0, 2).join(',')));
