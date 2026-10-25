// T1 · cobertura REAL por texto literal: de cada artículo del temario (temario.txt, todas las normas y protocolos) busca su primera frase en el esquema (esquemas.html, bloque T1) y en las fichas
// Uso: node prompts/herramientas/tema1/cobertura-literal-t1.js   → lista los artículos cuyo texto no aparece en el esquema.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const L = fs.readFileSync(path.join(RAIZ, 'prompts/temario-limpio/tema1/temario.txt'), 'utf8').replace(/\r/g, '').split('\n').map(l => l.replace(/^\s*000\d{3}\s+/, ''));
const s = fs.readFileSync(path.join(RAIZ, 'esquemas.html'), 'utf8');
const a = s.indexOf('const T1 = {};'), b = s.indexOf('/* T1_RECUERDA'); const seg = s.slice(a, b);
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\\u[0-9a-f]{4}/gi, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/[^a-z0-9ñ]/g, '');
const E = nz(seg);
// tandas de artículos (la numeración vuelve a empezar → otra norma / protocolo)
const tandas = []; let cur = null, prev = 0;
L.forEach((l, i) => { const m = l.match(/^\s*ART[ÍI]CULO\s+(\d{1,3})\b\s*(BIS|TER)?/i); if (!m) return; const v = +m[1]; if (!cur || v < prev - 3) { cur = { ini: i, arts: [] }; tandas.push(cur); } cur.arts.push({ id: m[1], i }); prev = v; });
// nombres de las normas por la línea de cabecera anterior
const nombre = k => { for (let i = tandas[k].ini; i > Math.max(0, tandas[k].ini - 40); i--) if (/^(PROTOCOLO|CONVENIO|CARTA|ESTATUTO|ACUERDO|ESTATUTO DE ROMA|LEY ORG)/i.test(L[i].trim())) return L[i].trim().slice(0, 50); return 'tanda ' + k; };
let tot = 0, falt = 0; const por = {};
tandas.forEach((t, k) => t.arts.forEach((x, n) => {
  if (t.arts.length < 3) return;   // tandas sueltas = citas
  const fin = n + 1 < t.arts.length ? t.arts[n + 1].i : Math.min(L.length, x.i + 15);
  const cuerpo = nz(L.slice(x.i, fin).join(' ').replace(/^\s*ART[ÍI]CULO\s+\d+\.?[^.]*\.\s*/i, '').replace(/\.\d+\s+\d+\s+R ?ECUERDA.*$/, '.').replace(/(^|\s)R\d{1,2}(?=\s)/g, '$1').replace(/\sT1 DERECHOS ?HUMANOS.*$/, ''));
  if (cuerpo.length < 25) return; tot++;
  const clave = cuerpo.slice(0, 40), clave2 = cuerpo.slice(Math.floor(cuerpo.length / 2), Math.floor(cuerpo.length / 2) + 30);
  if (!E.includes(clave) && !E.includes(clave2)) { falt++; (por[nombre(k) + ' (tanda ' + k + ')'] = por[nombre(k) + ' (tanda ' + k + ')'] || []).push(x.id); }
}));
if (process.argv.includes('--json')) { console.log(JSON.stringify({ tot, falt })); process.exit(0); }
console.log(`T1: ${tot} artículos con texto · SIN su texto en el esquema: ${falt}`);
for (const [k, v] of Object.entries(por)) console.log(k + ': ' + v.join(', '));
if (process.argv.includes('--texto')) { tandas.forEach((t, k) => t.arts.forEach((x, n) => { if (t.arts.length < 3) return; const fin = n + 1 < t.arts.length ? t.arts[n + 1].i : Math.min(L.length, x.i + 15); const raw = L.slice(x.i, fin).join(' ').replace(/\s+/g, ' '); const cuerpo = nz(raw.replace(/^\s*ART[ÍI]CULO\s+\d+\.?[^.]*\.\s*/i, '')); if (cuerpo.length < 25) return; const c1 = cuerpo.slice(0, 40), c2 = cuerpo.slice(Math.floor(cuerpo.length / 2), Math.floor(cuerpo.length / 2) + 30); if (!E.includes(c1) && !E.includes(c2)) console.log(`[t${k}] ${raw.slice(0, 170)}`); })); }
