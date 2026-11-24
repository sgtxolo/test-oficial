// Pasa preguntas de contenido de párrafos con ✱ al banco OFICIAL del tema (orden del usuario 24/11/2026: las de asterisco van a oficiales).
// Uso: node prompts/herramientas/anade-oficiales-ast.js <tema> <json con preguntas IA (salida --json de un bloque)> [...más json]
// · Les da el siguiente id oficial (T-N), quita la etiqueta «Pregunta generada por IA», añade «(asterisco ✱ del temario)» y la marca "*" en MARCAS_PREG.
// · Si ese bloque ya estaba insertado como IA (T-ia-NNNN), quita su bloque semilla de test-oficial-conocimiento.html.
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', 'test-oficial-conocimiento.html'); const BS = String.fromCharCode(92);
const [tema, ...jsons] = process.argv.slice(2); if (!tema || !jsons.length) throw new Error('uso: <tema> <json>...');
let s = fs.readFileSync(F, 'utf8');
const fin = i => { let d = 0, inS = false, e = false; for (let j = i; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return j + 1; } } };
const re = new RegExp('\\{"id":"' + tema + '-(\\d+)"', 'g'); let m, mx = 0, ult = -1;
while ((m = re.exec(s))) if (+m[1] >= mx) { mx = +m[1]; ult = m.index; }
if (ult < 0) throw new Error('sin oficiales del tema ' + tema);
const nuevas = []; let n = mx;
jsons.forEach(j => JSON.parse(fs.readFileSync(j, 'utf8')).forEach(q => {
  const ex = q.explicacion.replace(/\s*<em style=\\?"color:var\(--texto-gris\)\\?">\(Pregunta generada por IA\)<\/em>/, '').replace(/\s*<em style="color:var\(--texto-gris\)">\(Pregunta generada por IA\)<\/em>/, '') + ' <i>(asterisco ✱ del temario)</i>';
  if (/generada por IA/.test(ex)) throw new Error('quedó la etiqueta IA en ' + q.id);
  nuevas.push({ id: tema + '-' + (++n), pregunta: q.pregunta, opciones: q.opciones, correcta: q.correcta, explicacion: ex, apartado: q.apartado, _ia: q.id });
}));
// 1) quitar los bloques semilla IA que contenían estas preguntas
let quitados = 0;
nuevas.forEach(q => { const i = s.indexOf('{"id":"' + q._ia + '"'); if (i < 0) return; const a = s.lastIndexOf('(function(){const seed=[', i), cierre = ';syncSeedIA(' + tema + ',seed)})();', b = s.indexOf(cierre, i); if (a >= 0 && b >= 0 && !s.slice(a, b).includes('1-ia-3') ) { s = s.slice(0, a) + s.slice(b + cierre.length); quitados++; } });
// 2) insertar tras el último oficial
const e0 = fin(s.indexOf('{"id":"' + tema + '-' + mx + '"')); if (!e0) throw new Error('no encuentro el fin del último oficial');
s = s.slice(0, e0) + nuevas.map(q => { const o = Object.assign({}, q); delete o._ia; return ',' + JSON.stringify(o); }).join('') + s.slice(e0);
// 3) marcas
const mk = 'window.MARCAS_PREG={'; if (!s.includes(mk)) throw new Error('sin MARCAS_PREG');
s = s.replace(mk, mk + nuevas.map(q => '"' + q.id + '":"*"').join(',') + ',');
fs.writeFileSync(F, s);
console.log('oficiales nuevas', nuevas[0].id, '→', nuevas[nuevas.length - 1].id, '· bloques IA quitados', quitados);
