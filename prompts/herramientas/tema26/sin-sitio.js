// Lista las preguntas del T25 sin sitio en el mapa, con el arranque del enunciado. Uso: node prompts/herramientas/tema25/sin-sitio.js
const fs = require('fs');
const MAPA = JSON.parse(fs.readFileSync('esquemas-datos/mapa-preguntas.js', 'utf8').match(/window\.MAPA_PREG=(\{.*?\});window\.TOTAL_PREG/)[1]);
const app = fs.readFileSync('test-oficial-conocimiento.html', 'utf8');
const ids = [...new Set([...app.matchAll(/\{"id":"(26-(?:ia-)?\d+)","pregunta":"([^"]{0,260})/g)].map(m => m[1] + '¦' + m[2]))];
for (const x of ids) { const [id, p] = x.split('¦'); if (!MAPA[id]) console.log(id, '·', p.replace(/^[^.]*\d{4}[^.]*\.\s*/, '').slice(0, 130)); }
