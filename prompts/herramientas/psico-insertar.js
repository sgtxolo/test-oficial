// Siembra el apartado «Psicotécnicos» (T42) en test-oficial-ingles.html a partir de prompts/herramientas/psico/psico-banco.json
// y las imágenes de la carpeta psicotecnicos/. Idempotente: sustituye lo que haya entre /*PSICO-INI*/ y /*PSICO-FIN*/ dentro de QUESTIONS.
// Uso: node prompts/herramientas/psico-insertar.js
const fs = require('fs');
const F = 'test-oficial-ingles.html';
const BS = String.fromCharCode(92);   // barra invertida: en el HTML la plantilla lleva «\n» literal
const bank = JSON.parse(fs.readFileSync('prompts/herramientas/psico/psico-banco.json', 'utf8'));
const objs = bank.map(p => JSON.stringify({ t: 42, q: p.stem || 'Pregunta psicotécnica', opts: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], a: p.a, fb: p.fb, dif: 'media', qid: p.qid, psico: true, img: 'psicotecnicos/' + p.img, ...(p.ex ? { imgfb: 'psicotecnicos/' + p.ex } : {}) }));
const blk = '/*PSICO-INI*/' + objs.join(',') + '/*PSICO-FIN*/';
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('/*PSICO-INI*/');
if (a >= 0) { const b = s.indexOf('/*PSICO-FIN*/', a) + '/*PSICO-FIN*/'.length; s = s.slice(0, a) + blk + s.slice(b); }
else {
  const i = s.indexOf('const QUESTIONS=['); const j = s.indexOf('}];\nconst GENERAL_TESTS', i);
  if (i < 0 || j < 0) throw new Error('no encuentro el final de QUESTIONS');
  s = s.slice(0, j + 1) + ',' + blk + s.slice(j + 1);
}
// Preguntas de inglés de los vídeos de la academia (imágenes en ingles-forma/): van a su tema de gramática o, si no encajan, al apartado «Forma» (t=43)
const fm = JSON.parse(fs.readFileSync('prompts/herramientas/psico/ingles-forma-banco.json', 'utf8'));
const fmObjs = fm.map(p => JSON.stringify({ t: p.t, q: p.stem || 'Pregunta de inglés (ver imagen)', opts: p.opts, a: p.a, fb: p.fb, dif: 'media', qid: p.qid, forma: true, img: p.img }));
const fmBlk = '/*FM-INI*/' + fmObjs.join(',') + '/*FM-FIN*/';
{
  const a2 = s.indexOf('/*FM-INI*/');
  if (a2 >= 0) { const b2 = s.indexOf('/*FM-FIN*/', a2) + '/*FM-FIN*/'.length; s = s.slice(0, a2) + fmBlk + s.slice(b2); }
  else { const p = s.indexOf('/*PSICO-FIN*/') + '/*PSICO-FIN*/'.length; s = s.slice(0, p) + ',' + fmBlk + s.slice(p); }
}
const R = [
  ['TOPIC43', '42:"Psicotécnicos"}', '42:"Psicotécnicos",43:"Forma (vídeos de la academia)"}'],
  ['label43', 'return 42===e?"Psicotécnicos":TOPIC_NAMES', 'return 42===e?"Psicotécnicos":43===e?"Forma":TOPIC_NAMES'],
  ['TOPIC_NAMES', '41:"Un poco de todo 2"}', '41:"Un poco de todo 2",42:"Psicotécnicos"}'],
  ['topicLabel', 'function topicLabel(e){return TOPIC_NAMES[e]?"T"+e+" · "+TOPIC_NAMES[e]:"T"+e}', 'function psicoImgEN(t){return \'<img class="psico-img" src="\'+t.img+\'" alt="Pregunta psicotécnica" loading="lazy" draggable="false">\'}function topicLabel(e){return 42===e?"Psicotécnicos":TOPIC_NAMES[e]?"T"+e+" · "+TOPIC_NAMES[e]:"T"+e}'],
  ['render', '<div class="qtext">${t.q}</div>${t.tr?', '<div class="qtext">${t.img?psicoImgEN(t):t.q}</div>${t.tr?'],
  ['flash', '<div class="qtext">${t.q}</div>' + BS + 'n      <button class="qbtn primary" id="flashRevBtn', '<div class="qtext">${t.img?psicoImgEN(t):t.q}</div>' + BS + 'n      <button class="qbtn primary" id="flashRevBtn'],
  ['todos', '"all"===currentFilter?e:e.filter(', '"all"===currentFilter?e.filter(e=>QUESTIONS[e].t!==42):e.filter('],
  ['css', '.qtext{font-size:15px;', '.psico-img{display:block;max-width:100%;height:auto;margin:4px auto;border-radius:8px;background:#fff}.qfb img{max-width:100%;height:auto;display:block;margin-top:8px;border-radius:8px}.qtext{font-size:15px;'],
];
for (const [n, v, nv] of R) {
  if (s.includes(nv) || (n === 'TOPIC_NAMES' && s.includes('42:"Psicotécnicos"')) || (n === 'topicLabel' && s.includes('function psicoImgEN'))) { console.log('ya aplicado', n); continue; }
  const c = s.split(v).length - 1; if (c !== 1) throw new Error(n + ': ' + c + ' coincidencias');
  s = s.replace(v, () => nv); console.log('aplicado', n);
}
fs.writeFileSync(F, s);
console.log('psicotécnicos sembrados:', bank.length);
