// Añade al esquema del Tema 4 los apartados que el usuario marcó (✱ / EX / EXAMEN) y cuyo artículo no estaba, con el texto LITERAL
// del temario oficial (prompts/temario-limpio/tema4/temario.txt, PDF del 19/09/2025). Los colores los pone el Exprés con el diccionario de
// subrayado del usuario. Idempotente. Uso: node prompts/herramientas/tema4/anadir-marcados-t4.js [--dry]
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..'), F = path.join(RAIZ, 'esquemas.html');
const DRY = process.argv.includes('--dry');
const L = fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema4', 'temario.txt'), 'utf8').replace(/\r\n?/g, '\n').replace(/[\u0007\u0000]/g, '').replace(/[​ ]/g, ' ').replace(/­/g, '').split('\n');
const RANGO = { RFS: [35, 1766], GEFC: [1770, 6340], PRUM: [6344, 6944], DEC: [6948, 7826] };
const PIE = /derechos reservados|^TEMARIO|^TOMO|^T4\b|^A OFICIAL$|^ASCENSO$|^\d+ \|/i, PIE2 = /^LA GESTI[ÓO]N DE LAS FRONTERAS/;
const arregla = t => t.replace(/\s\d{6}\s+(?=[a-záéíóú])/g, ' ').replace(/-\s+(?=[a-zñáéíóú])/g, '').replace(/\s{2,}/g, ' ').replace(/\s+([,.;:])/g, '$1').trim();
// bloque del artículo `art` (p. ej. '8 TER') de la norma
function articulo(norma, art) {
  const [a, b] = RANGO[norma]; const re = new RegExp('^\\s*ART[ÍI]CULO ' + art.replace(/ /g, '\\s+') + '\\.');
  let i = -1; for (let n = a - 1; n < b; n++) if (re.test(L[n])) { i = n; break; }
  if (i < 0) throw new Error('sin artículo ' + norma + ' ' + art);
  const out = [L[i]]; for (let n = i + 1; n < b; n++) { if (/^\s*(ART[ÍI]CULO\s+\d+|CAP[ÍI]TULO|SECCI[ÓO]N|ANEXO)\b/.test(L[n])) break; if (PIE.test(L[n].trim()) || PIE2.test(L[n].trim()) || !L[n].trim()) continue; out.push(L[n]); }
  return out;
}
// unidades (apartados): empiezan en «1.», «(1)»; el resto es continuación. Devuelve { titulo, u }
function unidades(lineas) {
  const txt = lineas.map(x => x.trim()).join(' ').replace(/^ART[ÍI]CULO\s+[\dA-Z ]+?\.\s*/, '');
  let titulo = '', cuerpo = txt; const k = txt.search(/(?:^|\s)(?:\(1\)|1\.)\s+[A-ZÁÉÍÓÚ«“]/);
  if (k > 0) { titulo = txt.slice(0, k).trim(); cuerpo = txt.slice(k).trim(); }
  else { const m = txt.match(/^((?:[A-ZÁÉÍÓÚÑ0-9 ,;()\-–/«»"]+?)\.)\s+(.*)$/); if (m && m[1].length < 140 && m[1] === m[1].toUpperCase()) { titulo = m[1]; cuerpo = m[2]; } }
  titulo = titulo.replace(/\.$/, '').replace(/\s+R\d+$/, '').trim();
  let u = cuerpo.split(/\s(?=(?:\(\d+\)|\d+\.)\s+[A-ZÁÉÍÓÚ«“(])/).map(arregla).filter(Boolean);
  u = u.filter(x => !/SUBRAYADO P[ÁA]GINA DE EJEMPLO/.test(x)).map(x => x.replace(/^R\d+\s+/, '').replace(/^\d{2,3}\.\s+(?=[A-ZÁÉÍÓÚ])/, ''));
  return { titulo, u };
}
const cap = t => t.charAt(0) + t.slice(1).toLowerCase();
// ficha de un artículo (o de apartados concretos): cab, antes (ficha ANTE la que se inserta), tipo de marca, párrafos [tipo, html-texto]
const art = (norma, num, aps, tipo, antes) => { const { titulo, u } = unidades(articulo(norma, num));
  const sel = aps ? aps.map(n => { const r = u.filter(x => new RegExp('^(\\(' + n + '\\)|' + n + '\\.)\\s').test(x)); if (r.length !== 1) throw new Error(norma + ' ' + num + '.' + n + ' → ' + r.length); return r[0]; }) : u;
  const nombre = num.toLowerCase();
  return { cab: `Artículo ${nombre} — ${cap(titulo || 'Texto marcado')}${aps ? ' (apartado' + (aps.length > 1 ? 's ' : ' ') + aps.join(' y ') + ')' : ''}`, antes, tipo,
    ps: sel.map((x, i) => { const m = x.match(/^(?:\((\d+)\)|(\d+)\.)\s/); const n = m && (m[1] || m[2]); const cuerpo = x.replace(/^(\(\d+\)|\d+\.)\s*/, '');
      return [tipo, (i === 0 ? `Art. ${nombre}.${n ? n + '.' : ''} ` : (n ? n + '. ' : '')) + cuerpo]; }) }; };
const N = [
  art('RFS', '6 BIS', ['1'], '*', 'Artículo 7 — Realización'),
  art('RFS', '8', ['1'], '*', 'Artículo 8 — Inspecciones'),
  art('RFS', '8 TER', ['9'], '*', 'Artículo 9 — Flexibilización'),
  art('RFS', '8 QUINQUIES', ['9'], '*', 'Artículo 9 — Flexibilización'),
  art('RFS', '10', ['3'], '*', 'Artículos 11, 12 y 12 bis'),
  art('RFS', '11', ['1', '3'], '*', 'Artículo 13 — Vigilancia'),
  art('GEFC', '17', null, '*', 'Artículos 20, 21, 23, 25 y 28'),
  art('GEFC', '21', ['3'], '*', 'Artículos 20, 21, 23, 25 y 28'),
  art('GEFC', '24', null, '*', 'Artículos 20, 21, 23, 25 y 28'),
  art('GEFC', '48', ['1'], '*', 'Artículos 49 y 50'),
  art('GEFC', '52', null, '*', 'Artículos 54 y 55'),
  art('GEFC', '71', null, '*', 'Artículos 73 a 77'),
  art('GEFC', '72', null, '*', 'Artículos 73 a 77'),
  art('GEFC', '75', null, '*', 'Artículos 79 y 81'),
  art('GEFC', '78', null, '*', 'Artículos 79 y 81'),
  art('GEFC', '83', null, 'EX', 'Artículos 86 a 92'),
  art('GEFC', '87', null, '*', 'Artículos 93, 95 y 96'),
  art('GEFC', '99', null, '*', 'Artículo 100 — Funciones'),
  art('PRUM', '36', null, '*', 'Artículos 43 a 52'),
  art('PRUM', '38', null, '*', 'Artículos 43 a 52'),
  art('PRUM', '41', null, '*', 'Artículos 43 a 52'),
  art('DEC', '29', null, '*', 'Artículos 33 a 37'),
];
const esc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const par = (t, h) => '<p' + (t ? ` data-ex=\\"${t}\\"` : '') + '>' + h.replace(/^(Art\. [\d a-z]+\.(?:\d+\.)?)\s/, '<b>$1</b> ') + '</p>';
module.exports = { N };
if (require.main === module) {
  if (DRY) { N.forEach(x => { console.log('\n== ' + x.cab + '   [antes de: ' + x.antes + ']'); x.ps.forEach(([t, h]) => console.log(`  [${t}] ${h.slice(0, 200)}${h.length > 200 ? ' …(' + h.length + ')' : ''}`)); }); process.exit(0); }
  let s = fs.readFileSync(F, 'utf8');
  const a0 = s.indexOf('const T4 = {};'); let b0 = s.indexOf('/* T4_RECUERDA + ensamblaje */'); let n = 0;
  for (const x of N) {
    const linea = `  + articuloResp("${esc(x.cab)}"`;
    if (s.slice(a0, b0).includes(linea)) continue;
    const i = s.indexOf(`  + articuloResp("${x.antes}`, a0); if (i < 0 || i > b0) throw new Error('no encuentro dónde insertar ' + x.cab + ' (antes de ' + x.antes + ')');
    const html = x.ps.map(([t, h]) => par(t, h)).join('');
    const ins = `${linea}, [], "${esc(html)}", false)\n`; s = s.slice(0, i) + ins + s.slice(i); b0 += ins.length; n++; console.log('+', x.cab);
  }
  fs.writeFileSync(F, s); console.log('fichas añadidas:', n);
}
