// Quita de un bloque preguntas-t19r-bNN.js las preguntas que (a) piden una pena (opción correcta = prisión/multa/inhabilitación/mitad superior/grado…)
// o (b) llevan «artículo N»/«apartado N» en el enunciado. Uso: node prompts/herramientas/tema19/limpiar-bloque.js prompts/herramientas/preguntas-t19r-bNN.js
const fs = require('fs');
const f = process.argv[2];
const s = fs.readFileSync(f, 'utf8');
const ini = s.indexOf('\nq(');
const fin = s.indexOf('\n];', ini);
const cab = s.slice(0, ini + 1), cuerpo = s.slice(ini + 1, fin), pie = s.slice(fin);
const trozos = cuerpo.split(/\n(?=(?:\/\/[^\n]*\n)*q\()/);
const PEN = /\b(prisión|multa|inhabilitación|suspensión|arresto|mitad (superior|inferior)|(superior|inferior)(es)? en (uno o dos )?grados?|pena (superior|inferior|menor|mayor|más)|penas? (superiores|inferiores|más)|más grave|trabajos en beneficio)\b/i;
const quitados = []; let tot = 0;
const RE = new RegExp('q\\("([^"]*)", \\w+, "((?:[^"\\\\]|\\\\.)*)",\\s*\\n?\\s*\\["((?:[^"\\\\]|\\\\.)*)"');
const buenos = trozos.filter(t => {
  const m = t.match(RE);
  if (!m) return true;
  tot++;
  const a = m[1], e = m[2], o1 = m[3];
  const motivo = PEN.test(o1) ? 'pena en la correcta' : /(prisión|multa|inhabilitación( absoluta| especial)?( para [^,.]*)?) (de|por tiempo de) ([a-záéíóú0-9]+ a [a-záéíóú0-9]+ (años|meses)|tres meses|seis meses|doce|veinticuatro)/i.test(e) ? 'cifra de pena en el enunciado' : /art[íi]culos?\s*\d|apartado\s*\d|art\.\s*\d/i.test(e) ? 'nº de artículo en enunciado' : null;
  if (motivo) { quitados.push(a + ' · ' + motivo); return false; }
  return true;
});
fs.writeFileSync(f, cab + buenos.join('\n') + pie);
console.log('preguntas', tot, 'quitadas', quitados.length);
quitados.forEach(x => console.log('  -', x));
