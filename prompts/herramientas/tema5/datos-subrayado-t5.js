// Genera expres-subrayado/datos-t5.js (Exprés subrayado del Tema 5 = páginas del resumen) a partir de img/t5/piezas.json y de las preguntas de la app.
// Cada pregunta del resumen (SIS, VIS, Código de visados; no las apartadas) se enlaza a la primera pieza que contiene su artículo.
// Uso: node prompts/herramientas/tema5/datos-subrayado-t5.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');
const piezas = JSON.parse(fs.readFileSync(path.join(ROOT, 'expres-subrayado', 'img', 't5', 'piezas.json'), 'utf8'));
const s = fs.readFileSync(path.join(ROOT, 'test-oficial-conocimiento.html'), 'utf8');
const FUERA = JSON.parse(fs.readFileSync(path.join(ROOT, 'esquemas-datos', 'fuera-resumen-t5.js'), 'utf8').match(/=(\{.*\});/)[1]);
const BS = String.fromCharCode(92); const qs = []; const re = /\{"id":"5-[^"]*"/g; let m;
while ((m = re.exec(s))) { let d = 0, inS = false, esc = false, j = m.index;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  try { const q = JSON.parse(s.slice(m.index, j + 1)); if (q.pregunta && q.opciones) qs.push(q); } catch (e) { /* otro objeto */ } }
const strip = t => t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const normaDe = t => /2018\/1861/.test(t) ? 'sis' : /767\/2008/.test(t) ? 'vis' : /810\/2009/.test(t) ? 'cv' : null;
const SUF = 'bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies|undecies|duodecies|terdecies|quaterdecies|quindecies|sexdecies|septdecies|octodecies|novodecies|vicies|unvicies';
const RX = new RegExp('arts?\\.?\\s*(\\d+)(?:\\s+(' + SUF + '))?(?:\\s+(' + SUF + '))?', 'i');
const idx = {}; piezas.forEach(p => p.arts.forEach(a => { const k = p.norma + '|' + a; if (!idx[k]) idx[k] = p.id; }));
const NOM = { sis: 'SIS · Rgto. 2018/1861', vis: 'VIS · Rgto. 767/2008', cv: 'Código de visados · Rgto. 810/2009' };
const preg = {}; const vistos = new Set(); let tot = 0;
qs.forEach(q => { if (vistos.has(q.id) || FUERA[q.id]) return; vistos.add(q.id);
  const mm = q.explicacion.match(/<span class="ref-norma">([\s\S]*?)<\/span>/); const rn = mm ? strip(mm[1]) : '';
  const norma = normaDe(q.apartado || '') || normaDe(rn) || normaDe(q.pregunta); if (!norma) return; tot++;
  const a = RX.exec(rn); if (!a) return; const art = a[1] + (a[2] ? ' ' + a[2].toLowerCase() : '') + (a[3] ? ' ' + a[3].toLowerCase() : '');
  const pid = idx[norma + '|' + art]; if (pid) preg[q.id] = pid; });
const D = { titulo: 'Tema 5 · Bases de datos europeas (tu resumen: SIS, VIS y Código de visados)', dir: 'expres-subrayado/img/t5/',
  piezas: piezas.map(p => ({ id: p.id, nombre: NOM[p.norma] + ' · pág. ' + (p.pag) + ' · Arts. ' + p.arts.join(', '), img: p.id + '.jpg', wh: p.wh, m: {} })),
  preg, cit: [{ p: 's', nombre: 'SIS', re: '2018/1861|Sistema de Información de Schengen', pre: null, pre_re: null, proto: 0 }, { p: 'v', nombre: 'VIS', re: '767/2008|Reglamento VIS|Sistema de Información de Visados', pre: null, pre_re: null, proto: 0 }, { p: 'c', nombre: 'Código de visados', re: '810/2009|Código de visados', pre: null, pre_re: null, proto: 0 }],
  cob: { q: tot, e: Object.keys(preg).length } };
fs.writeFileSync(path.join(ROOT, 'expres-subrayado', 'datos-t5.js'), '(window.EXSUB=window.EXSUB||{})[5]=' + JSON.stringify(D) + ';\n');
console.log('piezas', D.piezas.length, '· preguntas del resumen', tot, '· con botón', D.cob.e);
