// Tema 14 · correcciones de oficiales verificadas contra el temario oficial (auditoría 25/10/2026). Idempotente.
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..', '..', '..');
const FILE = path.join(RAIZ, 'test-oficial-conocimiento.html');
const nz = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
const TX = nz(fs.readFileSync(path.join(RAIZ, 'prompts', 'temario-limpio', 'tema14', 'temario.txt'), 'utf8').replace(/-\s*\n\s*/g, ''));
const BS = String.fromCharCode(92), L = 'ABCD';
const O = (q, k, t) => { q.opciones[k] = t; };
const LEY = 'Ley Orgánica 3/1981 del Defensor del Pueblo', REG = 'Reglamento de Organización y Funcionamiento del Defensor del Pueblo';
const F = [
  ['14-19', q => ['Los Diputados y Senadores individualmente, las comisiones de investigación o relacionadas con la defensa general o parcial de los derechos y libertades públicas y, principalmente, la Comisión Mixta Congreso-Senado de relaciones con el Defensor del Pueblo podrán solicitar, mediante escrito motivado, la intervención del Defensor del Pueblo', 'art. 10.Dos de la ' + LEY, 'La autoridad administrativa no figura entre quienes pueden solicitar la intervención por esta vía (art. 10.Tres: «No podrá presentar quejas ante el Defensor del Pueblo ninguna autoridad administrativa en asuntos de su competencia»).']],
  ['14-53', q => { O(q, 2, 'Preparar y elevar al Consejo Asesor el anteproyecto de Presupuesto.'); return ['Preparar y elevar a la Junta de Coordinación y Régimen Interior el anteproyecto de Presupuesto', 'art. 23.1.d) del ' + REG, 'El anteproyecto se eleva a la Junta de Coordinación y Régimen Interior, no al Consejo Asesor.']; }],
  ['14-57', q => { O(q, 3, 'El Adjunto en el que delegue el Defensor del Pueblo.'); return ['que será presidido por el Adjunto en el que el Defensor del Pueblo delegue las funciones previstas en esta disposición', 'disposición final única (apartado segundo) de la ' + LEY, null]; }],
  ['14-93', q => { O(q, 1, 'A estos efectos no podrá negársele el acceso a ningún expediente o documentación administrativa que se encuentre relacionada con la actividad o servicio objeto de la investigación.'); O(q, 2, 'Cuando la queja a investigar afectare a la conducta de las personas al servicio de la Administración, en relación con la función que desempeñan, el Defensor del Pueblo dará cuenta de la misma al afectado y a su inmediato superior u Organismo de quien aquél dependiera.'); q.correcta = 3;
    return ['que en ningún caso será inferior a diez días, pudiendo ser prorrogado, a instancia de parte, por la mitad del concedido', 'art. 20.Dos de la ' + LEY, 'El plazo nunca puede ser inferior a diez días (no «superior»).']; }],
  ['14-204', q => { O(q, 1, 'Por muerte o por incapacidad sobrevenida.'); return ['c) Por muerte o por incapacidad sobrevenida', 'art. 16.1 del ' + REG, 'La A es falsa (delito doloso, mediante sentencia firme) y la C invierte el procedimiento: la propuesta razonada es del Defensor del Pueblo y la aprueba la Comisión Mixta.']; }],
  ['14-162', q => ['Admitida la queja, el Defensor del Pueblo promoverá la oportuna investigación sumaria e informal para el esclarecimiento de los supuestos de la misma. En todo caso dará cuenta del contenido sustancial de la solicitud al Organismo o a la Dependencia administrativa procedente', 'art. 17 de la ' + LEY, null]],
];
let s = fs.readFileSync(FILE, 'utf8'), n = 0; const malas = [];
for (const [id, fn] of F) {
  const key = '{"id":"' + id + '"'; const i = s.indexOf(key); if (i < 0) { console.log('NO ESTÁ', id); continue; }
  let d = 0, inS = false, esc = false, j = i;
  for (; j < s.length; j++) { const c = s[j]; if (inS) { if (esc) esc = false; else if (c === BS) esc = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  const q = JSON.parse(s.slice(i, j + 1));
  const [cita, art, extra] = fn(q);
  if (!TX.includes(nz(cita))) { malas.push(id); continue; }
  q.explicacion = `<span class="ex-resp">Respuesta correcta: <b>${L[q.correcta]}</b> · <mark class="ex-key">${q.opciones[q.correcta].replace(/\.$/, '')}</mark></span>Según el <span class="ref-norma">${art}</span>: <span class="ref-concepto">"${cita}"</span>${extra ? ' ' + extra : ''}`;
  s = s.slice(0, i) + JSON.stringify(q) + s.slice(j + 1); n++;
}
if (malas.length) console.log('✗ CITA NO LITERAL (no se aplica):', malas.join(', '));
fs.writeFileSync(FILE, s); console.log('corregidas', n, 'de', F.length);
