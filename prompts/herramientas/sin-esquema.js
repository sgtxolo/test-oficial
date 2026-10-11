// Lista las fichas del tema N que DEBERÍAN llevar esquema visual debajo y no lo llevan
// (listas a) b) c)…, órganos/competencias, plazos y cifras, procedimientos, clasificaciones).
// Uso: node prompts/herramientas/sin-esquema.js N
const fs = require('fs');
const path = require('path');
const N = +process.argv[2]; if (!N) { console.log('Uso: node prompts/herramientas/sin-esquema.js N'); process.exit(1); }
const h = fs.readFileSync(path.join(__dirname, '..', '..', 'esquemas.html'), 'utf8');
const src = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('temasPrograma'));
const code = src.slice(0, src.search(/\nrender\(\);/)) + ';return esquemas;';
const fake = () => new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? (() => '') : fake(), apply: () => fake(), set: () => true, construct: () => fake() });
const html = new Function('document', 'window', 'localStorage', 'speechSynthesis', code)(fake(), fake(), fake(), fake())[N - 1].html;
// trocear en fichas y lo que va detrás de cada una hasta la siguiente ficha o bloque
const piezas = html.split(/(?=<div class="articulo">|<div class="bloque-titulo">)/);
let total = 0, faltan = [];
piezas.forEach(p => {
  if (!p.startsWith('<div class="articulo">')) return;
  const cab = ((p.match(/<div class="articulo-head">([\s\S]*?)<\/div>/) || [])[1] || '').replace(/<[^>]+>/g, '');
  const txt = (p.match(/<div class="txt">([\s\S]*)/) || [, ''])[1].replace(/<div class="vis[\s\S]*/, '').replace(/<[^>]+>/g, ' ');
  const motivos = [];
  if ((txt.match(/(?:^|\s)[a-hñ]\)\s/g) || []).length >= 3) motivos.push('lista a) b) c)');
  if ((txt.match(/\b(?:\d+|un|uno|dos|tres|cuatro|cinco|seis|diez|quince|veinte|treinta)\s+(?:días|meses|años|horas|semanas)\b/gi) || []).length >= 2) motivos.push('plazos');
  if ((txt.match(/\b(?:corresponder[áa]|competencia|a propuesta de|será competente|órgano)\b/gi) || []).length >= 2) motivos.push('órganos/competencias');
  if (/muy graves?[\s\S]{0,400}graves?[\s\S]{0,400}leves?/i.test(txt)) motivos.push('clasificación M/G/L');
  if ((txt.match(/\b(?:en primer lugar|a continuación|posteriormente|tras|una vez)\b/gi) || []).length >= 2) motivos.push('procedimiento');
  if (!motivos.length) return;
  total++;
  if (!/<div class="vis/.test(p)) faltan.push(`  · ${cab.slice(0, 90)}  →  ${motivos.join(', ')}`);
});
console.log(`Tema ${N}: ${total} fichas piden esquema visual · ${total - faltan.length} lo tienen · ${faltan.length} sin esquema`);
if (faltan.length) console.log(faltan.join('\n'));
