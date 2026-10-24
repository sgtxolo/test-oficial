// Quita el subrayado que el alineado del OCR puede dejar dentro de las cabeceras «Artículo N» del esquema del Tema 10 (deben quedar en texto plano
// para que marcas-lib.js y el Exprés las reconozcan). Uso: node prompts/herramientas/tema10/limpia-cabeceras-t10.js
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const L = require('../literal-lib.js');
let s = fs.readFileSync(F, 'utf8');
let h = L.get(s, 'T10_CC').html, n = 0;
h = h.replace(/(<div class="articulo-head">)([\s\S]*?)(<\/div>)/g, (m, a, b, c) => { const t = b.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); if (t !== b) n++; return a + t + c; });
h = h.replace(/(<div class="bloque-titulo">)([\s\S]*?)(<\/div>)/g, (m, a, b, c) => a + b.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() + c);
fs.writeFileSync(F, L.put(s, 'T10_CC', h));
console.log('cabeceras limpiadas:', n);
