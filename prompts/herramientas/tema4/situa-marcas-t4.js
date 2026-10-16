// Sitúa las marcas a mano del temario subrayado del Tema 4 (marcas-t4.txt, leído página a página el 16/10/2026) en su PÁRRAFO del esquema.
// Cada entrada de MARCAS = 'art[.apartado][letra]' o 'art' (todo el artículo) + tipo: EXAMEN (sello «PREGUNTA EXAMEN»), EX (círculo EX), * (asterisco ✱).
// Normas (ficha → norma): RFS = Código de fronteras Schengen (0-25 y 99) · GEFC = R. 2019/1896 (26-60 y 100-102) · PRUM = Convenio de Prüm (61-71 y 103)
// DEC = Decisión 2008/615/JAI (72-78) · R1349 = R. 2024/1349 (79-83) · R581 = R. de Ejecución 2021/581 (84-98).
// Uso: node prompts/herramientas/tema4/situa-marcas-t4.js     (informe de lo que no encuentra sitio)
const fs = require('fs'), path = require('path');
const X = require('../expres-lib.js')(4);
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
// norma de cada ficha por el título de su bloque (los índices cambian al añadir fichas marcadas); las «AMPLIACIONES» por el prefijo de su cabecera
const NORMA_BLOQUE = [[/^4\.1 —|CFS\.|ANEXOS DEL CÓDIGO|^RESTABLECIMIENTO TEMPORAL/, 'RFS'], [/^4\.2 —|^EUROSUR \(REGLAMENTO|^ANÁLISIS DE RIESGOS|^ACTUACIÓN DE LA AGENCIA|^CAPACIDADES|^COOPERACIÓN$|^MARCO GENERAL/, 'GEFC'], [/^4\.3 —/, 'PRUM'], [/^4\.4 —/, 'DEC'],
  [/^4\.5 —|EXCEPCIONES EN SITUACIONES DE CRISIS/, 'R1349'], [/^4\.6 —|^CAPÍTULO II: MAPAS|^CAPÍTULO III: COMPONENTES/, 'R581']];
const normaDeK = k => { const b = limpia(X.fichaBloque[k] || ''); if (/^AMPLIACIONES/.test(b)) { const c = limpia(X.fichas[k].cab); return /^CFS/.test(c) ? 'RFS' : /^GEFC/.test(c) ? 'GEFC' : /^Prüm/.test(c) ? 'PRUM' : null; }
  const r = NORMA_BLOQUE.find(([re]) => re.test(b)); return r && r[1]; };
// párrafos con norma, artículo, apartado y letra
const P = [];
X.fichas.forEach((f, k) => {
  const n = normaDeK(k); const cab = limpia(f.cab);
  const cab1 = cab.match(/^(?:Art[ií]culo ([0-9]+(?: bis| ter| quater| quinquies)?)|(Anexo [IVX]+)) —/);   // ficha de UN artículo/anexo: los párrafos no repiten «Art. n.»
  const esAnexo = cab1 && cab1[2]; let art = cab1 ? (cab1[1] || cab1[2]) : '', ap = '', letra = '';
  f.ps.forEach((p, j) => {
    const t = limpia(p.h); let m;
    if (esAnexo && (m = t.match(/^(\d+(?:\.\d+)*)\.?\s/))) { ap = m[1]; letra = ''; }
    else if ((m = t.match(/^(?:Art\. )?(\d+(?: bis| ter| quater| quinquies)?)\.\s*(?:(\d+)\.)?/)) && !cab1) { art = m[1]; ap = m[2] || ''; letra = ''; }
    else if (cab1 && (m = t.match(/^(\d+)[.)]\s/))) { ap = m[1]; letra = ''; }
    else if ((m = t.match(/^([a-z])\)\s/))) letra = m[1];
    P.push({ k, j, n, art, ap, letra: /^[a-z]\)/.test(t) ? t[0] : '', ctx: letra, t });
  });
});
// norma → [ 'art[.ap[letra]]:tipo', ... ]   (lo leído en las págs 1-354; ✱ azul/rojo = '*')
const MARCAS = {
  RFS: ['1:*', '2.3:*', '2.5:*', '2.8:EXAMEN', '2.11:EXAMEN', '2.17:*', '2.18:*', '2.19:*', '5.1:*', '6.1:*', '6 bis.1:*', '6 bis.3:*', '7.2:*', '8.3:*', '8.5:*', '8.1:*', '8 ter.9:*', '8 quinquies.9:*',
    '10.1:*', '10.2:*', '10.3:*', '11.1:*', '11.2:*', '11.3:*', '13.1:*', '13.3:*', '14.1:*', '14.3:*', '14.4:*', '14.5:*', '17.2:*', '17.3:*', '20.1:*', '21 bis.3:EX', '22:EX', '23:EX', '25:EX', '25 bis:EX',
    '27:*', '28:EXAMEN', '29:*', '29.1:EX', '29.4:EX', '34:*', '37.2:EX', '37.3:EX', '37.2:*', '37.5:EX', 'Anexo IV:*', 'Anexo VI:*', 'Anexo VII:*'],
  GEFC: ['2.6:*', '3.2:*', '5.2:*', '6:*', '10:*', '11:*', '13.2:EXAMEN', '14:*', '17:*', '18:*', '19:*', '20:*', '21.3:*', '22:*', '23:*', '24:*', '25:*', '26:*', '27:*', '28:*', '29.2:*', '30:*', '31.1:*', '35.1:EX',
    '36:*', '37:*', '38.2:*', '38.3:*', '39:*', '40:*', '41:*', '42:*', '42.5:EX', '43:*', '44:*', '46:*', '47:*', '48.1:*', '50.7:*', '51:*', '52:*', '53:*', '54:EX', '54.4:EX', '55:*', '56:*', '57:*', '58:*',
    '60.3:EX', '60.4:*', '61:*', '63:*', '64:*', '68:*', '69:*', '70:*', '71:*', '72:*', '73:*', '74:*', '75:*', '76:*', '77:*', '78:*', '79:*', '81:*', '82:*', '83:EX', '85:*', '86:*', '87:*', '88:*', '89:*',
    '91:*', '92:*', '93:*', '95:*', '99:*', '100:*', '101:*', '102:*', '103:*', '104:*', '106:*', '107:*', '109:*', '110:*', '111:*', '113:*', '115:*', '121:*'],
  PRUM: ['1:*', '2:*', '3:*', '4:*', '5:*', '6:*', '7:*', '8:*', '9:*', '12:*', '13:*', '14:*', '16:*', '17:*', '18:*', '19:*', '20:*', '21:*', '22:*', '23:*', '24:*', '25:*', '26:*', '27:*', '28:*', '29:*', '30:*',
    '31:*', '33:EXAMEN', '34:*', '35:*', '36:*', '37:*', '38:*', '39:*', '40:*', '41:*', '43:*', '50:*', '52:*'],
  DEC: ['25.2:*', '26:*', '27:*', '28:*', '29:*', '30:*', '31:*', '33:*', '35:*', '36:*', '37:*'],
  R1349: [], R581: []
};
const cuadra = (p, s) => { const [a, rest] = [s.match(/^([A-Za-z0-9 ]+?)(?:\.(\d+)([a-z])?)?$/)]; return a; };
function busca(norma, spec) {
  const m = spec.match(/^(Anexo [IVX]+|\d+(?: bis| ter| quater| quinquies)?)(?:\.(\d+)([a-z])?)?$/); if (!m) return [];
  const [, art, ap, letra] = m; let C = P.filter(p => p.n === norma && p.art === art);
  if (ap) { const c = C.filter(p => p.ap === ap); if (c.length) C = c; else return []; }
  if (letra) { const c = C.filter(p => p.letra === letra); if (c.length) C = c; }
  return C;
}
const marcas = [], sin = [];
Object.entries(MARCAS).forEach(([n, L]) => L.forEach(l => { const [spec, tipo] = l.split(':'); const ps = busca(n, spec);
  if (!ps.length) sin.push(`${n} ${spec} ${tipo}`); else ps.forEach(p => marcas.push({ n, spec, tipo, k: p.k, j: p.j })); }));
module.exports = { marcas, sin, P };
if (require.main === module) {
  const por = {}; marcas.forEach(m => (por[`${m.k}-${m.j}`] = por[`${m.k}-${m.j}`] || new Set()).add(m.tipo));
  console.log('marcas situadas:', marcas.length, '· párrafos:', Object.keys(por).length);
  console.log('SIN SITIO (' + sin.length + '):', sin.join(' · '));
}
