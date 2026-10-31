const fs = require('fs');
const th = fs.readFileSync('test-oficial-conocimiento.html', 'utf8'), es = fs.readFileSync('esquemas.html', 'utf8');
const ids = [...new Set([...th.matchAll(/\{"id":"(11-[^"]+)","pregunta"/g)].map(m => m[1]))];
const enMapa = ids.filter(id => es.includes('"' + id + '"'));
console.log('preguntas T11 en el banco:', ids.length, '| con sitio en esquemas.html:', enMapa.length);
console.log('sin sitio:', ids.filter(id => !es.includes('"' + id + '"')).slice(0, 40).join(' '));
