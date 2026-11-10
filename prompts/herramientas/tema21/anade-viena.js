// Añade (o refresca) los Convenios de Viena al esquema del T21 SIN regenerar las leyes (que ya llevan subrayado/marcas).
// Lee viena61-limpio.txt y viena63-limpio.txt (si existe). Idempotente.  Uso: node prompts/herramientas/tema21/anade-viena.js
require('../esq-virtual.js');
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html'), D = path.join(RAIZ, 'prompts', 'temario-limpio', 'tema21');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const hVIENA = (fich, titulo) => {
  const p = path.join(D, fich); if (!fs.existsSync(p)) return '';
  let out = '<div class="bloque-titulo">' + esc(titulo) + '</div>', abierta = false;
  for (const l0 of fs.readFileSync(p, 'utf8').replace(/\r/g, '').split('\n')) {
    const l = l0.trim(); if (!l) continue;
    if (/^Artículo \d+/.test(l)) { if (abierta) out += '</div></div></div>'; out += '<div class="articulo"><div class="articulo-head">' + esc(l) + '</div><div class="articulo-body"><div class="txt">'; abierta = true; continue; }
    if (!abierta) continue;
    out += '<p' + (/^[a-z]{1,2}\)/.test(l) ? ' style="margin-left:18px"' : '') + '>' + esc(l) + '</p>';
  }
  if (abierta) out += '</div></div></div>'; return out;
};
const h = hVIENA('viena61-limpio.txt', 'CONVENIO DE VIENA DE 18 DE ABRIL DE 1961, SOBRE RELACIONES DIPLOMÁTICAS') + hVIENA('viena63-limpio.txt', 'CONVENIO DE VIENA DE 24 DE ABRIL DE 1963, SOBRE RELACIONES CONSULARES');
let s = fs.readFileSync(F, 'utf8');
const linea = '/* T21_VIE */ T21.viena = ' + JSON.stringify(h) + ';';
if (/^\/\* T21_VIE \*\/.*$/m.test(s)) s = s.replace(/^\/\* T21_VIE \*\/.*$/m, () => linea);
else s = s.replace(/^(\/\* T21_INS \*\/.*)$/m, (m) => m + '\n' + linea);
s = s.replace('+ T21.leyes + T21.instr;', '+ T21.leyes + T21.viena + T21.instr;');
s = s.replace(/Al final, la Instrucción 1\/2024[^"]*"/, 'Después, los Convenios de Viena (texto limpio) y, al final, la Instrucción 1/2024 de la Secretaría de Estado de Seguridad."');
fs.writeFileSync(F, s);
console.log('viena:', h.length, 'caracteres', fs.existsSync(path.join(D, 'viena63-limpio.txt')) ? '(1961+1963)' : '(solo 1961)');
