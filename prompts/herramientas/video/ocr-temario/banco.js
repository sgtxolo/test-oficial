// Lee QUESTIONS del test de conocimientos. Uso: require('./banco.js')()
const fs = require('fs');
const BS = String.fromCharCode(92);
module.exports = () => {
  const s = fs.readFileSync('C:/Users/ruben/Desktop/HTML OFICIAL/test-oficial-conocimiento.html', 'utf8');
  const i = s.indexOf('QUESTIONS={"1":') + 10;
  let d = 0, str = false, e = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (str) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') str = false; continue; } if (c === '"') str = true; else if (c === '{') d++; else if (c === '}' && !--d) break; }
  return JSON.parse(s.slice(i, j + 1));
};
if (require.main === module) {
  const Q = module.exports();
  for (const t of ['1', '3']) {
    const a = Q[t] || []; const n = a.map(q => +q.id.split('-')[1]).filter(x => !isNaN(x));
    const c = {}; a.forEach(q => c[q.apartado] = (c[q.apartado] || 0) + 1);
    console.log('T' + t, a.length, 'max', Math.max(...n), c);
  }
}
