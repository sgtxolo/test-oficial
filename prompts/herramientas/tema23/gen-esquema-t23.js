// Genera prompts/herramientas/tema23/esquema-t23.js a partir de la plantilla del T22 (una sola ley: Ley 5/2014).
const fs = require('fs'), path = require('path');
const T = path.join(__dirname, '..', 'tema22', 'esquema-t22.js');
let s = fs.readFileSync(T, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('no encuentro: ' + a.slice(0, 70)); s = s.split(a).join(b); };
// cabecera
s = s.replace(/^\/\/ Tema 22[\s\S]*?\n(?=const fs)/m, '// Tema 23 · esquema LITERAL desde prompts/temario-limpio/tema23/oficial.txt: Ley 5/2014, de 4 de abril, de Seguridad Privada (íntegra, texto consolidado).\n// Deja  /* T23_LSP */ T23.lsp = "…"  para aplicar-subrayado-pdf.js, huecos y Exprés. Idempotente.  Uso: node prompts/herramientas/tema23/esquema-t23.js\n');
rep("require('../esq-virtual.js');", "require('../esq-virtual.js');");
rep("'tema22'", "'tema23'");
rep("./marcas-t22.js", "./marcas-t23.js");
rep("let ley = 0;   // 1 = LO 9/1983 · 2 = LO 7/2021 · 3 = LO 4/2015", "let ley = 0;   // 1 = Ley 5/2014");
rep("const SUF = { 1: 'Derecho de Reunión', 2: 'Protección de datos penal', 3: 'Seguridad Ciudadana' };", "const SUF = { 1: '' };");
rep("rotulo = rotulo + ' · ' + SUF[ley];", "if (SUF[ley]) rotulo = rotulo + ' · ' + SUF[ley];");
// títulos
s = s.replace(/const TITULO = \[[\s\S]*?\n\];/, "const TITULO = [\n  { re: /^LEY 5\\/2014, DE 4 DE ABRIL/, ley: 1, rot: 'LEY 5/2014, DE 4 DE ABRIL, DE SEGURIDAD PRIVADA' },\n];");
rep("    else if (ley === 1 && sg >= 5 && sg < 8) { enTitulo = 0; abre(\"pre0\", \"Exposición de motivos\"); nuevoP(l); continue; }\n", "");
rep("if (ley === 3 && ROM.test(l))", "if (ROM.test(l))");
rep("if (/^PRE[AÁ]MBULO$/.test(l)) { cierraArt(); cab.push('PREÁMBULO'); vuelcaCab(); pre = true; continue; }", "if (/^PRE[AÁ]MBULO$/.test(l)) { cierraArt(); cab.push('PREÁMBULO'); vuelcaCab(); pre = true; continue; }");
// bloque final
const a = s.indexOf("const hCP = h;");
const b = s.indexOf("fs.writeFileSync(F, s);");
const nuevo = `const hCP = h;
let s = fs.readFileSync(F, 'utf8');
const bloque = \`/* T23_BEGIN */
const T23 = {};
/* T23_LSP */ T23.lsp = \${JSON.stringify(hCP)};
(function(){
  const t = esquemas[22];
  t.titulo = "23 — Seguridad privada";
  t.html = leyenda()
    + trampa("Cómo está hecho este esquema", "Texto LITERAL del texto consolidado oficial de la Ley 5/2014, de 4 de abril, de Seguridad Privada (íntegra: preámbulo, títulos preliminar, I a VI, disposiciones). Con tu subrayado, tus marcas y los cuadros de tu temario.")
    + T23.lsp;
})();
/* T23_END */\`;
const a0 = s.indexOf('/* T23_BEGIN */');
if (a0 >= 0) { const b0 = s.indexOf('/* T23_END */', a0) + '/* T23_END */'.length; s = s.slice(0, a0) + bloque + s.slice(b0); }
else { const p = s.indexOf('/* T22_END */'); if (p < 0) throw new Error('sin ancla T22_END'); const q = p + '/* T22_END */'.length; s = s.slice(0, q) + '\\n' + bloque + s.slice(q); }
`;
s = s.slice(0, a) + nuevo + s.slice(b);
s = s.replace("console.log('fichas:'", "console.log('fichas:'");
fs.writeFileSync(path.join(__dirname, 'esquema-t23.js'), s);
console.log('ok', s.length);
