// Marcas del temario subrayado del usuario en cada pregunta del test (pauta 15/10/2026): si la respuesta de una pregunta está en un
// párrafo del esquema con data-ex (EXOF = círculo EXOF o sello «PREGUNTA EXAMEN»; EX o "1" = círculo EX; * = asterisco de la
// academia), la app de test lo muestra junto a la respuesta correcta: «(EXAMEN OFICIAL)», «(EX)», «(✱ academia)».
// Escribe en test-oficial-conocimiento.html <script id="marcas-preg">window.MARCAS_PREG={"2-90":"EXOF",...}</script>.
// Volver a ejecutarlo tras mapa-preguntas.js. Uso: node prompts/herramientas/marcas-preguntas.js
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..');
const h = fs.readFileSync(path.join(RAIZ, 'esquemas.html'), 'utf8');
const MAPA = JSON.parse(h.match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const temas = [...new Set(Object.values(MAPA).map(s => +s.split('-')[0]))].sort((a, b) => a - b);
const OUT = {};
for (const t of temas) {
  const X = require('./expres-lib.js')(t);
  for (const [id, s] of Object.entries(MAPA)) {
    const [tt, k, j] = s.split('-').map(Number); if (tt !== t || !X.fichas[k] || !X.fichas[k].ps[j]) continue;
    const m = (X.fichas[k].ps[j].at.match(/data-ex="([^"]*)"/) || [])[1]; if (!m) continue;
    const v = m.split(',').map(x => x === '1' ? 'EX' : x).filter(x => ['EXOF', 'EX', '*'].includes(x));
    if (v.length) OUT[id] = [...new Set(v)].join(',');
  }
}
// preguntas nuevas del Tema 2 hechas para una marca concreta: la marca va en su explicación «(marca EXOF…)», «(sello «PREGUNTA EXAMEN»…)»
const test = path.join(RAIZ, 'test-oficial-conocimiento.html'); let s = fs.readFileSync(test, 'utf8');
for (const m of s.matchAll(/\{"id":"(2-(?:ia-)?\d+)"[^\n]*?\((marca EXOF del temario|sello «PREGUNTA EXAMEN» del temario|marca «EX» del temario|asterisco del temario[^)]*)\)/g)) {
  const v = /EXOF|EXAMEN/.test(m[2]) ? 'EXOF' : /«EX»/.test(m[2]) ? 'EX' : '*';
  OUT[m[1]] = [...new Set([v, ...(OUT[m[1]] || '').split(',').filter(Boolean)])].sort((a, b) => ({ EXOF: 0, EX: 1, '*': 2 }[a]) - ({ EXOF: 0, EX: 1, '*': 2 }[b])).join(',');
}
const tag = `<script id="marcas-preg">window.MARCAS_PREG=${JSON.stringify(OUT)};</script>`;
s = s.includes('<script id="marcas-preg">') ? s.replace(/<script id="marcas-preg">[\s\S]*?<\/script>/, () => tag) : s.replace('<script id="esq-temas">', () => tag + '\n<script id="esq-temas">');
fs.writeFileSync(test, s);
const cuenta = {}; Object.entries(OUT).forEach(([id, v]) => { const t = id.split('-')[0]; cuenta[t] = cuenta[t] || { EXOF: 0, EX: 0, '*': 0 }; v.split(',').forEach(x => cuenta[t][x]++); });
console.log('preguntas con marca del temario:', Object.keys(OUT).length, JSON.stringify(cuenta));
