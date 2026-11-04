// Cambia el texto de una opción de UNA pregunta concreta del banco de test-oficial-conocimiento.html
// (las opciones se repiten entre preguntas, por eso se acota por id).
// Uso: node prompts/herramientas/reemplaza-opcion-pregunta.js <lista.json> [--aplicar]
//   lista.json = [["13-ia-3","texto exacto de la opción antes","texto nuevo"], ...]
const fs = require('fs'), path = require('path');
const [,, LISTA, ...flags] = process.argv;
const FILE = path.join(__dirname, '..', '..', 'test-oficial-conocimiento.html');
let s = fs.readFileSync(FILE, 'utf8');
const BS = String.fromCharCode(92);
const enc = t => JSON.stringify(t).slice(1, -1);
function span(id) {                       // {"id":"…"} completo, sin ambigüedad
  const key = '{"id":"' + id + '"';
  const i = s.indexOf(key); if (i < 0) return null;
  if (s.indexOf(key, i + 1) >= 0) return 'dup';
  let d = 0, inS = false, esc = false;
  for (let j = i; j < s.length; j++) { const c = s[j];
    if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; }
    if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return [i, j + 1]; } }
  return null;
}
let ok = 0, mal = 0;
for (const [id, a, b] of JSON.parse(fs.readFileSync(LISTA, 'utf8'))) {
  const sp = span(id);
  if (!sp || sp === 'dup') { mal++; console.log(sp === 'dup' ? 'ID DUPLICADO' : 'ID NO ENCONTRADO', id); continue; }
  const obj = s.slice(sp[0], sp[1]), A = '"' + enc(a) + '"';
  const n = obj.split(A).length - 1;
  if (n !== 1) { mal++; console.log('OPCIÓN', n === 0 ? 'NO ENCONTRADA' : 'REPETIDA (' + n + ')', id, a.slice(0, 50)); continue; }
  if (flags.includes('--aplicar')) s = s.slice(0, sp[0]) + obj.replace(A, '"' + enc(b) + '"') + s.slice(sp[1]);
  ok++;
}
if (flags.includes('--aplicar')) fs.writeFileSync(FILE, s);
console.log((flags.includes('--aplicar') ? 'aplicadas ' : 'se aplicarían ') + ok + '; con problema: ' + mal);
