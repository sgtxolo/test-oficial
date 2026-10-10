// Tema 1: recupera las 15 preguntas de la academia eliminadas el 06/10/2026 (commit 390ab6d) y añade las 3 del Word
// «TEST TEMA 1 DERECHO HUMANOS.docx» que nunca entraron (1-132…1-134). Corrige 1-1 (enunciado erróneo) y 1-3 (dos opciones correctas).
// Uso: node prompts/herramientas/recuperar-t1-academia.js <old1.json extraído de 390ab6d^>
const fs = require('fs');
const F = 'test-oficial-conocimiento.html';
const old = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const IDS = ['1-1', '1-3', '1-5', '1-10', '1-14', '1-17', '1-25', '1-26', '1-28', '1-36', '1-40', '1-43', '1-55', '1-60', '1-74'];
const HIST = 'General / Historia de los Derechos Humanos';
const rec = IDS.map(id => { const q = old.find(x => x.id === id); if (!q) throw new Error('falta ' + id); return { id: q.id, pregunta: q.pregunta, opciones: q.opciones, correcta: q.correcta, explicacion: q.explicacion, apartado: q.apartado }; });
const fix = id => rec.find(q => q.id === id);
// 1-1: el ECOSOC no fue «rebautizado»; lo que sustituyó el Consejo de Derechos Humanos (2006) fue la Comisión de Derechos Humanos.
Object.assign(fix('1-1'), {
  pregunta: '¿Qué órgano sustituyó en 2006 a la Comisión de Derechos Humanos, cuya labor supervisaba el Consejo Económico y Social, órgano principal de las Naciones Unidas establecido por la Carta de San Francisco de 1945?',
  opciones: ['Alto Comisionado de las Naciones Unidas.', 'Consejo de Derechos Humanos.', 'Comité de Derechos Económicos y Sociales.', 'Tercera Comisión de la Asamblea General.'], correcta: 1,
  explicacion: '<span class="ex-resp">Respuesta correcta: <b>B</b> · <mark class="ex-key">Consejo de Derechos Humanos</mark></span>Pregunta de la batería de la academia corregida: el Consejo Económico y Social no fue «rebautizado»; en 2006 la Asamblea General creó el Consejo de Derechos Humanos, que sustituyó a la Comisión de Derechos Humanos (órgano que dependía del Consejo Económico y Social). Este contenido de historia general no figura en el temario oficial.' });
// 1-3: «La Liga de las Naciones» es el mismo organismo que la Sociedad de Naciones → había dos opciones correctas.
fix('1-3').opciones[2] = 'La Organización Internacional del Trabajo.';
const nuevas = [
 { id: '1-132', pregunta: 'Según la Declaración Universal de los Derechos Humanos, la libertad de opinión y de expresión se recoge en su artículo:', opciones: ['17.', '18.', '19.', '20.'], correcta: 2,
   explicacion: '<span class="ex-resp">Respuesta correcta: <b>C</b> · <mark class="ex-key">19</mark></span>El artículo 19 de la Declaración Universal de Derechos Humanos reconoce que todo individuo tiene derecho a la libertad de opinión y de expresión (el 17 es la propiedad, el 18 la libertad de pensamiento, conciencia y religión y el 20 la libertad de reunión y asociación). Pregunta de la batería de la academia; la Declaración Universal no figura en el temario oficial.', apartado: HIST },
 { id: '1-133', pregunta: 'Estatuto de Roma de la Corte Penal Internacional, hecho en Roma el 17 de julio de 1998. De la competencia, la admisibilidad y el derecho aplicable. Podrán proponer enmiendas a los Elementos de los crímenes, entre otros:', opciones: ['Cualquier Estado.', 'Los magistrados, por mayoría simple.', 'El fiscal.', 'Los magistrados, por mayoría de dos tercios.'], correcta: 2,
   explicacion: '<span class="ex-resp">Respuesta correcta: <b>C</b> · <mark class="ex-key">El fiscal</mark></span>El <span class="ref-norma">art. 9.2 del Estatuto de Roma</span> dispone: <span class="ref-concepto">"Podrán proponer enmiendas a los Elementos de los crímenes: a) Cualquier Estado Parte; b) Los magistrados, por mayoría absoluta; c) El fiscal"</span>. Por qué fallan las otras: no cualquier Estado, sino cualquier Estado Parte; y los magistrados, por mayoría absoluta (ni simple ni de dos tercios).', apartado: 'Estatuto de Roma de la Corte Penal Internacional' },
 { id: '1-134', pregunta: 'Estatuto de Roma de la Corte Penal Internacional. Informe anual. El informe anual de la Corte, que contendrá un informe de auditoría, se presentará a la Asamblea de los Estados Partes:', opciones: ['Al finalizar el año financiero en curso, si se realiza en los últimos tres meses del año.', 'Al concluir el siguiente año fiscal.', 'Al recibir la notificación por el Secretario General.', 'Al concluir el año financiero en curso, si tuvo lugar en los primeros nueve meses de este año, y al finalizar el año financiero siguiente, si se realizó en los tres últimos meses.'], correcta: 3,
   explicacion: '<span class="ex-resp">Respuesta correcta: <b>D</b> · <mark class="ex-key">Al concluir el año financiero en curso, si tuvo lugar en los primeros nueve meses de este año, y al finalizar el año financiero siguiente, si se realizó en los tres últimos meses</mark></span>Respuesta según la batería de la academia. Ojo: este precepto no aparece en el extracto del Estatuto de Roma del temario oficial ni en tu temario subrayado, así que no se ha podido contrastar con el texto.', apartado: 'Estatuto de Roma de la Corte Penal Internacional' },
];
let s = fs.readFileSync(F, 'utf8');
const BS = '\\';
const fin = i => { let d = 0, inS = false, e = false, j = i; for (; j < s.length; j++) { const c = s[j]; if (inS) { if (e) e = false; else if (c === BS) e = true; else if (c === '"') inS = false; continue; } if (c === '"') inS = true; else if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } } return j + 1; };
let n = 0;
for (const q of rec) {
  if (s.includes(`{"id":"${q.id}"`)) continue;
  const num = +q.id.split('-')[1]; let k = -1;
  for (let m = num + 1; m < 200 && k < 0; m++) k = s.indexOf(`{"id":"1-${m}"`);   // antes de la siguiente oficial existente
  s = s.slice(0, k) + JSON.stringify(q) + ',' + s.slice(k); n++;
}
for (const q of nuevas) { if (s.includes(`{"id":"${q.id}"`)) continue; const i = s.indexOf('{"id":"1-131"'); const j = fin(i); s = s.slice(0, j) + ',' + JSON.stringify(q) + s.slice(j); n++; }
fs.writeFileSync(F, s);
console.log('añadidas', n);
