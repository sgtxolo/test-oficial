// Preguntas rápidas del ⚡ Exprés: para cada pregunta enlazada en expres/tN.js (data-q) guarda una versión CORTA
// (sin el nombre de la ley ni el epígrafe) y su respuesta correcta → expres/qN.js (window.EXPRES_Q[N]).
// Las usan el «📌 Lo clave» de cada artículo y el bloque final «RECUERDA · preguntas rápidas» del Exprés.
// Uso: node prompts/herramientas/preguntas-rapidas.js          (todos los temas con Exprés)
//      node prompts/herramientas/preguntas-rapidas.js 7 11     (solo esos temas)
// Volver a ejecutarlo cada vez que se regenere un expres/tN.js o se añadan preguntas al test.
const fs = require('fs');
const path = require('path');
const PA = require('./preguntas-articulo.js');
const RAIZ = path.join(__dirname, '..', '..');

const limpia = t => String(t || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const NORMA = /^(?:Ley|Real Decreto|Reglamento|Directiva|Convenio|Convención|Protocolo|Carta|Estatuto|Tratado|Constitución|Orden|Instrucción|LO\b|L\.O\.|Código|Decisión|Acuerdo|Declaración|Pacto|Resolución|Texto refundido|Decreto|Recomendación|Código)/i;
const NEG = /incorrect|falsa|\bno es correct|no se corresponde|señale la que no|no es cierta|no es verdad|no figura|no se encuentra entre|no está entre|no forma parte/i;

function corta(p) {
  let t = limpia(p).replace(/\s*(?:Señale|Indique|Marque) la (?:opción|respuesta) (?:correcta|verdadera)\.?\s*$/i, '');
  // «… Señale la CORRECTA:» (la respuesta es la frase cierta) → «Es correcto»
  const soloCierta = /(?:señale|indique|marque)(?: la)?(?: opción| respuesta| afirmación)? (?:correcta|verdadera|cierta)\s*[.:]?\s*$/i.test(t);
  t = t.replace(/\s*(?:señale|indique|marque)(?: la)?(?: opción| respuesta| afirmación)? (?:correcta|verdadera|cierta)\s*[.:]?\s*$/i, '').replace(/^[.\s]+/, '');
  // «Ley X, de …. Epígrafe. Pregunta» → solo la pregunta
  let seg = t.split(/(?<=[a-záéíóúñ0-9)»"])\.\s+(?=[A-ZÁÉÍÓÚÑ¿«"])/);
  if (seg.length > 1 && NORMA.test(seg[0])) seg = seg.slice(1);
  // epígrafe corto sin verbo («Composición.», «Prescripción de las infracciones y de las sanciones.»)
  if (seg.length > 1 && seg[0].length < 80 && !/[:?_]|\b(?:es|son|será|podrá|corresponde|tendrá|deberá|se\s)\b/i.test(seg[0])) seg = seg.slice(1);
  t = seg.join('. ').trim();
  t = t.replace(/^[.\s]+/, '').replace(/_{3,}/g, '____');
  if (soloCierta && (t.length < 25 || NORMA.test(t))) t = 'Es correcto';
  if (t.length > 200) t = '…' + t.slice(t.length - 199).replace(/^\S*\s/, '');
  return t;
}
function resp(a) {
  let t = limpia(a).replace(/[.;]+$/, '');
  if (t.length > 170) t = t.slice(0, 168).replace(/\s\S*$/, '') + '…';
  return t;
}

function tema(T) {
  const f = path.join(RAIZ, 'expres', 't' + T + '.js');
  if (!fs.existsSync(f)) return null;
  const ex = fs.readFileSync(f, 'utf8');
  const ids = new Set();
  for (const m of ex.matchAll(/data-q=\\"([^\\"]+)\\"/g)) m[1].split(',').forEach(i => i && ids.add(i));
  const Q = {};
  let n = 0, neg = 0;
  for (const q of PA.preguntas(T)) {
    if (!ids.has(q.id)) continue;
    const a = q.opciones && q.opciones[q.correcta]; if (a == null) continue;
    const pr = corta(q.pregunta), r = resp(a); if (!pr || !r) continue;
    const esNeg = NEG.test(q.pregunta) || /\b(?:NO|EXCEPTO|SALVO|INCORRECTA|FALSA)\b/.test(q.pregunta);   // en mayúsculas = pregunta en negativo
    Q[q.id] = [pr, r, (/-ia-/.test(q.id) ? 0 : 1) | (esNeg ? 2 : 0)];
    n++; if (esNeg) neg++;
  }
  // Reescritas a mano en forma de pregunta → respuesta (¿Quién…? ¿Cuándo…? ¿Qué…?): rapidas-reescritas/tN-*.json, {id: [pregunta, respuesta]}
  let reesc = 0;
  const dirR = path.join(__dirname, 'rapidas-reescritas');
  if (fs.existsSync(dirR)) for (const fr of fs.readdirSync(dirR).filter(x => new RegExp('^t' + T + '-.*\\.json$').test(x))) {
    const R = JSON.parse(fs.readFileSync(path.join(dirR, fr), 'utf8'));
    for (const id in R) if (Q[id]) { Q[id][0] = R[id][0]; Q[id][1] = R[id][1]; reesc++; }
  }
  const out = '/* Preguntas rápidas del Exprés del tema ' + T + ' (generado con prompts/herramientas/preguntas-rapidas.js; no editar a mano).\n   id → [pregunta corta, respuesta correcta, banderas: 1 = oficial, 2 = pregunta en negativo («señale la incorrecta»)] */\n'
    + '(window.EXPRES_Q=window.EXPRES_Q||{})[' + T + ']=' + JSON.stringify(Q) + ';\n';
  fs.writeFileSync(path.join(RAIZ, 'expres', 'q' + T + '.js'), out);
  return { T, enlazadas: ids.size, con_texto: n, negativas: neg, reescritas: reesc, kb: Math.round(out.length / 1024) };
}

const pedidos = process.argv.slice(2).map(Number).filter(Boolean);
const temas = pedidos.length ? pedidos : fs.readdirSync(path.join(RAIZ, 'expres')).map(x => (/^t(\d+)\.js$/.exec(x) || [])[1]).filter(Boolean).map(Number).sort((a, b) => a - b);
temas.forEach(T => { const r = tema(T); if (r) console.log(r); });
