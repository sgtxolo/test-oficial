// ⚡ EXPRÉS del Tema 5 (Bases de datos europeas), REHECHO el 2/11/2026 sobre el RESUMEN subrayado del usuario (PDF PARTE 1, págs. 7-37):
// solo entran los artículos y apartados que el usuario tiene en su resumen (SIS 5.1, VIS 5.2 y Código de visados 5.3), cada uno ENTERO y con sus
// colores; más el 5.5 (Rgto. UE 2024/1358, Eurodac) desde el artículo 1, sin considerandos. Fuera: 5.4 (Rgto. 977/2011), 5.6 (Orden AEC), los
// considerandos y todo lo que no está en el resumen.
// La selección de párrafos sale de tema5/seleccion-resumen.js (lista resumen-t5.js + alineado con las páginas del resumen).
// Uso: node prompts/herramientas/expres-t5.js      (ENSAYO=1 mide sin escribir)
Object.entries({ VEC_MAX: 0, HUECO_MAX: 400, RUN_MIN: 90, UNO: 0.8, GRIS_PLIEGA: 'cifra' }).forEach(([k, v]) => { if (process.env[k] === undefined) process.env[k] = String(v); });
const fs = require('fs'), path = require('path');
const X = require('./expres-lib.js')(5);
const V = require('./visuales-t5.js');
const strip = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const SEL = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'prompts', 'temario-limpio', 'tema5', 'seleccion-resumen.json'), 'utf8')).sel;
const sel = {}; Object.entries(SEL).forEach(([k, v]) => { sel[k] = v; });
// 5.5 Eurodac (2024/1358): todos los artículos desde el 1 (la ficha de considerandos no entra), con el formato resumen de los demás temas
Object.assign(X.opciones, { recorte: 'ventana', cabeza: 5, antes: 4, umbral: 80, sinRespPliega: true });
const esEur = k => /2024\/1358/.test(X.fichaBloque[k]);
X.fichas.forEach((f, k) => { if (esEur(k) && !/^Considerandos?/.test(strip(f.cab))) sel[k] = 'auto'; });
const N = { BAJO: +(process.env.BAJO || 12), CAB: +(process.env.CAB || 4), ANT: +(process.env.ANT || 3) };
// oficial / marca del usuario → entero; solo IA → recortado con (…); poco preguntado → título + 🎯 (lo de siempre en los demás temas)
const nivelEur = (k, p, f) => { const marca = f.ps.some(x => /data-ex=|data-r=/.test(x.at));
  if (p.of || marca) return { recorte: 'frases', entero: true, media: { cabeza: N.CAB, antes: N.ANT, umbral: 160 } };
  if (p.ia <= N.BAJO) return 'boton';
  return { recorte: 'ventana', cabeza: N.CAB, antes: N.ANT, umbral: 160 }; };
const nivel = (k, p, f) => esEur(k) ? nivelEur(k, p, f) : { todo: true };
const EXTRAS = {};
const H = X.automatico(V, EXTRAS, { nivel, sel, uno: +process.env.UNO, sinCuadro: { has: k => !esEur(k) } });

module.exports = { visuales: () => [] };   // el esquema normal ya tiene sus cuadros (visuales-t5.js)
// bloques (para la cobertura): las fichas de cada norma que entran
const ks = Object.keys(sel).map(Number).sort((a, b) => a - b);
const NOM = [[/2018\/1861/, '5.1 SIS (Rgto. 2018/1861)'], [/767\/2008/, '5.2 VIS (Rgto. 767/2008)'], [/810\/2009/, '5.3 Código de visados (Rgto. 810/2009)'], [/2024\/1358/, '5.5 Eurodac (Rgto. 2024/1358)']];
const bloques = NOM.map(([re, nombre]) => { const l = ks.filter(k => re.test(X.fichaBloque[k])); return l.length ? { nombre, k0: l[0], k1: l[l.length - 1] } : null; }).filter(Boolean);
if (require.main === module) X.publica(H, bloques);
