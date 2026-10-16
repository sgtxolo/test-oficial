// 🎯 PARA EXAMEN del Tema 2: repaso del último mes, en SESIONES de ≈ 30 min y test al final de cada una (pauta 16/10/2026).
//   · Sale la respuesta de TODAS las preguntas del tema (oficiales e IA), literal, con un par de palabras delante para situarla;
//     el resto del artículo queda en «(…)» que se despliega (nunca frases redactadas por mí: solo el texto del temario).
//   · Si una pregunta no tiene su respuesta marcada en el texto, su apartado va entero (sin parrafadas sin subrayar: RUN_MIN).
//   · Sin cuadros (ocupan más que las respuestas sueltas): UNO=2.
//   · Cada sesión (≈ SES págs, cortando por normas / bloques) termina con «📝 Test de la sesión» con sus preguntas; arriba, test del tema.
// Se guarda en esquemas.html (script examen-datos, window.EXAMEN_T) y se ve con el botón «🎯 Para examen».
// Uso: node prompts/herramientas/examen-t2.js        (ENSAYO=1 → solo mide)
const DEF = { CAB: 2, ANT: 2, UMB: 40, UNO: 2, RUN_MIN: 90, PLIEGA_CANT: 1, SES: 8 };
Object.entries(DEF).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const X = require('./expres-lib.js')(2);
const V = require('./visuales-t2.js');
const N = { CAB: +process.env.CAB, ANT: +process.env.ANT, UMB: +process.env.UMB };
const op = { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: N.UMB, sinRespPliega: true, restoEntero: true };
Object.assign(X.opciones, op);
const EXTRAS = { 8: ['2-ia-78'], 12: ['2-17'], 27: ['2-45'] };
const R = require('./tema2/r-articulado-t2.js')(X);
R.mover.forEach(m => X.mueve(m.id, m.k, m.j));
const SIN_CUADRO = new Set(X.fichas.map((f, k) => /Artículos 52 y 55/.test(f.cab) ? k : -1).filter(k => k >= 0));
const H = X.automatico(V, EXTRAS, { uno: +process.env.UNO, nivel: () => op, sinCuadro: SIN_CUADRO }, [0, R.k0 - 1]);

// ---- sesiones de ≈ SES págs (3.000 caracteres visibles = 1 pág), cortando solo en los títulos de bloque ----
const visible = h => { let i; while ((i = h.indexOf('<span class="ex-plg-t">')) >= 0) { const re = /<(\/?)span\b[^>]*>/g; re.lastIndex = i; let d = 0, m;
  while ((m = re.exec(h))) { d += m[1] ? -1 : 1; if (!d) break; } h = h.slice(0, i) + h.slice(re.lastIndex); } return h.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').length; };
const idsDe = h => [...new Set([...h.matchAll(/data-q="([^"]+)"/g)].flatMap(m => m[1].split(',')))];
// trozos = artículos (ficha + sus cuadros / línea 🎯), con el título de bloque pegado al artículo que lo sigue
const trozos = H.split(/(?=<div class="bloque-titulo">|<div class="ex-ficha|<div class="ex-linea)/).filter(Boolean)
  .reduce((a, t) => { const u = a[a.length - 1]; if (u && (/^<div class="bloque-titulo">/.test(u) && !/ex-ficha|ex-linea/.test(u) || /^<div class="vis/.test(t))) a[a.length - 1] = u + t; else a.push(t); return a; }, []);
const total = trozos.reduce((s, t) => s + visible(t), 0), nSes = Math.max(1, Math.round(total / 3000 / +process.env.SES)), meta = total / nSes;
const ses = [[]]; let acc = 0;
trozos.forEach(t => { const v = visible(t); if (acc && acc + v / 2 > meta * ses.length && ses.length < nSes) ses.push([]); ses[ses.length - 1].push(t); acc += v; });
const boton = (ids, txt) => X.botonQ(ids, txt).replace('🎯 ', '📝 ');
const html = `<p class="xm-test">${boton(idsDe(H), `Test de todo el tema (${idsDe(H).length} preguntas)`)}</p>` + ses.map((s, n) => { const h = s.join(''), ids = idsDe(h), p = visible(h) / 3000;
  return `<div class="xm-ses">📘 Sesión ${n + 1} de ${ses.length} · ≈ ${p.toFixed(1)} págs · ${Math.round(p * 3.5)} min</div>${h}<p class="xm-test">${boton(ids, `Test de la sesión ${n + 1} (${ids.length} preguntas)`)}</p>`; }).join('');
ses.forEach((s, n) => console.log(`Sesión ${n + 1}: ${(visible(s.join('')) / 3000).toFixed(1)} págs · ${idsDe(s.join('')).length} preguntas`));

const ini = re => X.fichaBloque.findIndex(t => re.test(t));
const CORTES = [['2.1 Ley 19/2003', /RÉGIMEN GENERAL DE LOS MOVIMIENTOS/], ['2.2 Convenio 196', /^2\.2/], ['2.3 Ley 10/2010', /^2\.3|^CAPÍTULO I\. DISPOSICIONES GENERALES/],
  ['2.4 Palermo', /^2\.4/], ['2.5 Trata', /^2\.5/], ['2.6 Migrantes', /^2\.6/], ['2.7 Armas', /^2\.7/]].map(([n, re]) => [n, ini(re)]);
X.publica(html, CORTES.map(([nombre, k0], i) => ({ nombre, k0, k1: (CORTES[i + 1] ? CORTES[i + 1][1] : R.k0) - 1 })), { dest: 'EXAMEN_T' });
