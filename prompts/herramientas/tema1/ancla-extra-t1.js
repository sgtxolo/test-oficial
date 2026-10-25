// Ancla en mapa-fijo-t1.json las preguntas que el mapa no sitúa (25/10/2026): 1-ia-3527 (art. 8 bis/9, párrafo 2) y 1-ia-4182 (CEDH art. 38). Uso: node prompts/herramientas/tema1/ancla-extra-t1.js
const fs = require('fs'), path = require('path');
const s = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'esquemas.html'), 'utf8');
const a = s.indexOf('const T1 = {};'), b = s.indexOf('/* T1_RECUERDA');
const F = [...s.slice(a, b).matchAll(/^  \+ articuloResp\("((?:[^"\\]|\\.)*)"/gm)].map(m => m[1]);
const k = re => { const i = F.findIndex(c => re.test(c)); if (i < 0) throw new Error('sin ficha ' + re); return i; };
const FJ = path.join(__dirname, 'mapa-fijo-t1.json'); const J = JSON.parse(fs.readFileSync(FJ, 'utf8'));
J['1-ia-3527'] = k(/^Artículo 8 bis y artículo 9/) + '-2-0';
J['1-ia-4182'] = k(/^Artículo 38 — Examen del asunto/) + '-0';
fs.writeFileSync(FJ, JSON.stringify(J, null, 1)); console.log(J['1-ia-3527'], J['1-ia-4182']);
