// Artículos limpios del temario. Uso CLI: node temario.js CDF [art...]   (sin artículos: toda la norma)
const fs = require('fs');
const R = 'C:/Users/ruben/Desktop/HTML OFICIAL/prompts/temario-limpio/';
const NORMAS = {
  LOCPI: [1, 55, 344], CDF: [1, 455, 739], ECE: [1, 740, 1070], CEDH: [1, 1071, 1537], P1: [1, 1538, 1560], P4: [1, 1561, 1610], P6: [1, 1611, 1656], P7: [1, 1657, 1715], P12: [1, 1716, 1760], P13: [1, 1761, 1822],
  ER: [1, 1876, 2776], APIC: [1, 2777, 3563], TUE: [3, 43, 883], TFUE: [3, 884, 1937],
};
const BASURA = /^\s*(\d+\s*\|\s*)?(Todos los derechos reservados.*|TOMO \d|T\d [A-ZÁÉÍÓÚÑ ]+|T1 DERECHOS HUMANOS|T3 TRATADOS.*|TEMARIO DE ASCENSO.*|A OFICIAL|\d{6}|\d{1,3}|R\d{1,2})(\s*\|\s*\d+)?\s*$/;
const HEAD = /^\s*(?:R\d+\s+)?(?:ART[ÍI]CULO|Art[íi]culo)\s+(\d+(?:\s+(?:BIS|TER|bis|ter)\b)?)/;
function lineas(n) {
  const [t, a, b] = NORMAS[n];
  return fs.readFileSync(R + 'tema' + t + '/temario.txt', 'utf8').normalize('NFC').split(/\r?\n/).slice(a - 1, b);
}
function limpia(s) {
  return s.replace(/­\s*/g, '').replace(/[\x00-\x08\x0b-\x1f\x7f­]/g, '').replace(/\bR\d{1,2}\b ?/g, '').replace(/([a-záéíóú])R\d{1,2} /g, '$1').replace(/\b000\d{3}\b ?/g, '').replace(/\s+/g, ' ')
    .replace(/([a-záéíóú])- (?=[a-záéíóú])/g, '$1')
    .replace(/(^|[.:;»)] |\b(?:\d+\.|[a-z]\)|[ivx]+\)) )([B-DF-HJ-NP-TV-XZ]|[EAOU](?= [bcdfghjklmnpqrstvwxz]{1,2}[a-záéíóú])) (?=[a-záéíóúñ])/g, '$1$2')
    .replace(/ ([,.;:])/g, '$1').replace(/([a-záéíóúA-ZÁÉÍÓÚ»]{3,}) ?([4-9])(?=[;,.:]| |$)(?! de )/g, (m, a, n) => /^(art|apartado|artículos?|Protocolo)$/i.test(a) ? m : a).replace(/([a-záéíóú»]\.)\d(?= |$)/g, '$1').replace(/\) a(ser|disponer|defenderse|interrogar)\b/g, ') a $1').replace(/\bAnadie\b/g, 'A nadie').replace(/\bApartir\b/g, 'A partir').replace(/\bAmenos\b/g, 'A menos').replace(/\bA l Tribunal/g, 'Al Tribunal').replace(/\bU n juez/g, 'Un juez').replace(/\bodel\b/g, 'o del').replace(/\bono se\b/g, 'o no se').replace(/\by([abc])\) /g, 'y $1) ').replace(/(plazo|Estados|Sala|Tribunal)1[0-9]\b/g, '$1').replace(/\b(34|43),?1[0-9](?= )/g, '$1').replace(/ 1[0-9] constituirán/g, ' constituirán').replace(/7\.11\b/g, '7.').replace(/ 1[0-9](?= (RECUERDA|N o|D ice|Artículo)).*$/, '').replace(/ (EL TRIBUNAL Podrá|TRIBUNAL EUROPEO DE DERECHOS HUMANOS NÚMERO).*$/, '').replace(/ En fe de lo cual, los abajo.*$/, '').replace(/26\.12\b/g, '26.').replace(/ (LA GRAN SALA|SENTENCIAS DEFINITIVAS|SERÁN DEFINITIVAS|La sentencia de la GRAN SALA) .*$/, '').replace(/ En 3 meses cualquier parte del asunto.*$/, '').replace(/\bOla impugnación/g, 'La impugnación').replace(/\bO s erá/g, 'Será').replace(/\bo([bc])\) /g, 'o $1) ').replace(/\bAlos\b/g, 'A los').replace(/ 1\.6\. 1\.6\..*$/, '').replace(/ y([abc])\) /g, ' y $1) ').replace(/\bAfin de/g, 'A fin de').replace(/\bAsolicitud/g, 'A solicitud').replace(/E N PRIMER/g, 'EN PRIMER').replace(/^Remisión por un Estado, proprio motu. /, '').replace(/ T1 DERECHOS ?HUMANOS.*$/, '').replace(/ T3 TRATADOS DELA? UNIÓN EUROPEA\.?(?= (\d+\.|[a-záéíóú]|•|L os))/g, '').replace(/\bL os preparativos/g, 'Los preparativos').replace(/\b1o18\b/g, '18').replace(/Apuerta/g, 'A puerta').replace(/(^|[ .])E (n|l|sta|ste|stos|stas|llo|llos)\b/g, '$1E$2').replace(/(\) )([a-z]) (?=[a-záéíóú])/g, '$1$2').replace(/E l /g, 'El ').trim();
}
function arts(n) {
  const L = lineas(n); const out = {}; let cur = null;
  let nota = false;
  for (const l of L) {
    if (/^\s*\d{1,2}\s+(R ?ECUERDA|El que vota|.Inter|Las reuniones del|Artículo \d|D ?ice|N ?o dice)/.test(l.replace(/[\x00-\x08\x0b-\x1f\x7f]/g, ''))) { nota = true; continue; }
    if (/Todos los derechos reservados/.test(l)) { nota = false; continue; }
    if (BASURA.test(l)) continue;
    if (nota && !HEAD.test(l)) continue;
    nota = false;
    const m = l.match(HEAD);
    if (m) { const k = m[1].toLowerCase().replace(/\s+/g, ' '); cur = out[k] ? null : k; if (cur) out[k] = [l.trim()]; continue; }
    if (/^\s*(CAP[IÍ]TULO|T[IÍ]TULO|SECCI[OÓ]N|PARTE|PROTOCOLO N)/.test(l)) { cur = null; continue; }
    if (cur) out[cur].push(l.trim());
  }
  for (const k in out) {
    const all = out[k].join(' ').replace(/[\x00-\x08\x0b-\x1f\x7f]/g, '').replace(/\s+/g, ' ').trim();
    const h = all.match(/^(?:R\d+ )?(?:ART[ÍI]CULO|Art[íi]culo) \d+(?: (?:BIS|TER|bis|ter)\b)?\.? ?/); const rest = all.slice(h[0].length);
    const b = rest.match(/(?:\d+\. |(?:^| )[a-z]\) |(?:^| )i\) |[A-ZÁÉÍÓÚÑ][a-záéíóúñ]|\b[A-ZÁÉÍÓÚ] (?=[a-záéíóú]))/); const p = b ? b.index : 0;
    out[k] = { cab: limpia(rest.slice(0, p)), txt: limpia(rest.slice(p)) };
  }
  return out;
}
module.exports = { arts, NORMAS, limpia, lineas };
if (require.main === module) {
  const [n, ...ks] = process.argv.slice(2); const A = arts(n);
  for (const k of ks.length ? ks : Object.keys(A)) console.log(`[${k}] ${A[k] ? A[k].cab.replace(/^.*?\d+( bis| ter)?\.? ?/i, '') + ' :: ' + A[k].txt : '(no)'}`);
}
