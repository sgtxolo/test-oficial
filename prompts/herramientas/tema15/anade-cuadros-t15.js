// Tema 15 · Exprés subrayado: piezas de página entera para los cuadros impresos de las Instrucciones (q<pág>) y mapa título→pieza de los cuadros.
// Se ejecuta tras montar-manual-t15.js (que conserva las q*). Páginas 0-based. Uso: node prompts/herramientas/tema15/anade-cuadros-t15.js
const fs = require('fs'); process.chdir(require('path').join(__dirname, '..', '..', '..'));
const f = 'expres-subrayado/t15-manual.json', j = JSON.parse(fs.readFileSync(f, 'utf8'));
const add = [['q60', 'Instrucción 1/2025 · cuadro 6.1 niveles de riesgo y plazo VPER', 59], ['q70', 'Instrucción 1/2025 · cuadro 8.E casos de mayor gravedad', 69], ['q75', 'Instrucción 1/2025 · Anexo I pautas de entrevista', 74], ['q76', 'Instrucción 1/2025 · Anexo II medidas por nivel de riesgo', 75], ['q105', 'Instrucción 5/2021 · cuadro Protocolo Cero', 104], ['q115', 'Protocolo telemático · cuadro efectos del Sistema', 114]];
for (const [id, nombre, p] of add) { j.manual = j.manual.filter(x => x.id !== id); j.manual.push({ id, nombre, expres: 1, piezas: [[p, 0.04, 0.97]] }); }
fs.writeFileSync(f, JSON.stringify(j, null, 1)); console.log('cuadros:', add.length);
