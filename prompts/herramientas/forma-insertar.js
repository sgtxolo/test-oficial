// Siembra el banco «Forma» (preguntas de la plataforma de la academia, origen aparte de Oficial e IA) en test-oficial-conocimiento.html.
// Datos: prompts/herramientas/forma/forma-banco.json (id «<tema>-forma-<n>», forma:true). Idempotente: sustituye lo que haya entre
// /*FORMA-INI*/ y /*FORMA-FIN*/. Las preguntas se siembran con syncSeedIA (no se guardan en localStorage).
// Uso (desde la carpeta del proyecto):  node prompts/herramientas/forma-insertar.js
const fs = require('fs');
const F = 'test-oficial-conocimiento.html';
const bank = JSON.parse(fs.readFileSync('prompts/herramientas/forma/forma-banco.json', 'utf8'));
const porTema = {};
bank.forEach(q => { (porTema[q.tema] = porTema[q.tema] || []).push({ id: q.id, pregunta: q.pregunta, opciones: q.opciones, correcta: q.correcta, dificultad: q.dificultad || 'media', explicacion: q.explicacion, apartado: q.apartado, forma: true }); });
let blk = '/*FORMA-INI*/';
Object.keys(porTema).map(Number).sort((a, b) => a - b).forEach(t => { blk += '(function(){const seed=' + JSON.stringify(porTema[t]) + ';syncSeedIA(' + t + ',seed)})();'; });
blk += '/*FORMA-FIN*/';
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('/*FORMA-INI*/');
if (a >= 0) { const b = s.indexOf('/*FORMA-FIN*/', a) + '/*FORMA-FIN*/'.length; s = s.slice(0, a) + blk + s.slice(b); }
else { const p = s.indexOf('(function(){/* purga IA tema 1 */'); if (p < 0) throw new Error('sin ancla'); s = s.slice(0, p) + blk + s.slice(p); }
fs.writeFileSync(F, s);
console.log('Forma sembradas:', bank.length, 'en', Object.keys(porTema).length, 'temas');
