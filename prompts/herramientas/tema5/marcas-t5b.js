// Tema 5 · marcas de su LIBRO RESUMEN (págs. escaneadas 7-42): ✱ azules a mano → '*', círculos «Ex» azules → 'EX' (leídas 20/10/2026).
// Solo las del SIS, VIS y Código de visados (Reglamento 810/2009). Las del Eurodac del libro (págs. 38-39) son del Rgto. 603/2013 derogado: no se usan.
// Se aplican al párrafo del apartado indicado de la ficha del esquema (k = índice de ficha de expres-lib; sel = nº de apartado al principio del párrafo).
// Idempotente. Uso: node prompts/herramientas/tema5/marcas-t5b.js [--dry]
const fs = require('fs'), path = require('path');
const F = path.join(__dirname, '..', '..', '..', 'esquemas.html');
const X = require('../expres-lib.js')(5);
const limpia = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
// [ficha, selector, tipo(s)]
const M = [
  // SIS (Reglamento 2018/1861)
  [7, '1', '*'], [7, '2', '*'],                    // art. 7.1 y 7.2 oficina N.SIS / Sirene
  [8, '3', '*'],                                   // art. 8.3 «URGENTE» (12 horas)
  [12, '4', 'EX'],                                 // art. 12.4 registros: 3 años
  [38, '2', '*'],                                  // art. 39.2 (revisión 3 años)
  [40, '3', '*'],                                  // art. 41.3 (copias técnicas 48 horas)
  // VIS (Reglamento 767/2008 consolidado)
  [74, '1', '*'],                                  // art. 9 quinquies.2
  [75, '1', '*'],                                  // art. 9 sexies (marcado entero)
  [77, '3', '*'],                                  // art. 9 octies.3 (terrorismo 25 años / delitos graves 15)
  [118, '1', '*'],                                 // art. 23.1 (5 años)
  [129, '1', '*'],                                 // art. 32 bis.1
  [133, '', '*'],                                  // art. 36 sanciones (efectivas, proporcionadas y disuasorias)
  [139, '3', '*'],                                 // art. 41.3 (auditoría cada 4 años)
  // Código de visados (Reglamento 810/2009)
  [154, '1', '*'],                                 // art. 1.1 (no superiores a 90 días)
  [155, '', 'EX'],                                 // art. 2 definiciones
  [157, '1', '*'],                                 // art. 4.1 (consulados)
  [158, '1.b)', 'EX'], [158, '2', '*'], [158, '3.a)', '*'], [158, '3.b)', 'EX'],   // art. 5
  [161, '1', 'EX'],                                // art. 9.1 (plazos de presentación)
  [164, '1', 'EX'], [164, '2', '*'], [164, '6.bis', 'EX,*'], [164, '7', 'EX,*'],   // art. 13
  [169, '1', 'EX,*'], [169, '2.a)', 'EX'],         // art. 24
  [171, '2', '*'], [171, '3', '*'],                // art. 26
  [175, '1', '*'],                                 // art. 29.1
  [177, '1.a)', 'EX'],                           // art. 32.1.a) ii)
  [181, '1', 'EX'], [181, '3 Si', 'EX'],           // art. 35.1 y 35.3
];
// apartados marcados que no estaban en el esquema: se añaden LITERALES (texto de su temario) al final de la ficha
const NUEVOS = [
  ['Artículo 36 — Acceso a los datos del SIS por parte de los equipos', '*', '<b>8.</b> La Agencia Europea de la Guardia de Fronteras y Costas permitirá al Supervisor Europeo de Protección de Datos supervisar y examinar las actividades que realicen los equipos mencionados en el presente artículo en el ejercicio de su derecho a acceder a los datos del SIS y a consultarlos.'],
  ['Artículo 45 — Incidentes de seguridad', '*', '<b>6.</b> La Comisión informará de inmediato al Parlamento Europeo y al Consejo sobre los incidentes graves.'],
  ['Artículo 26 — Gestión operativa', '*', '<b>14.</b> eu-LISA será responsable de la gestión operativa de la PSV de la UE. La gestión operativa de la PSV de la UE consistirá en todas las tareas necesarias para mantener la PSV de la UE en funcionamiento durante las 24 horas del día, 7 días a la semana. Consistirá, en particular, en el trabajo de mantenimiento y de desarrollo técnico necesario para garantizar que la PSV de la UE funcione a un nivel satisfactorio de calidad operativa. Durante la fase de diseño y desarrollo de la PSV de la UE, se establecerá un comité de gestión del programa, compuesto por un máximo de diez miembros. Estará compuesto por siete miembros nombrados por el Consejo de Administración de eu-LISA entre sus miembros o suplentes, el presidente del grupo consultivo VIS, un miembro que represente a eu-LISA nombrado por su director ejecutivo y un miembro nombrado por la Comisión. El comité de gestión del programa se reunirá periódicamente y al menos una vez por trimestre. Garantizará la correcta gestión de la fase de diseño y desarrollo de la PSV de la UE y la coherencia entre el proyecto central y los proyectos nacionales de la PSV de la UE.', 'vis'],
];
const ORD = { EXOF: 0, EX: 1, '*': 2 };
const sitio = (k, sel) => { const f = X.fichas[k]; if (!f) return -1; if (!sel) return 0;
  return f.ps.findIndex(p => { const t = limpia(p.h); return t === sel || t.startsWith(sel + ' ') || (sel.length > 1 && !/^\d+$/.test(sel) && t.startsWith(sel)); }); };
const res = M.map(([k, sel, t]) => ({ k, sel, t, j: sitio(k, sel) }));
const mal = res.filter(r => r.j < 0);
console.log('marcas', res.length, '· sin párrafo:', mal.map(r => r.k + ':' + r.sel).join(' ') || 'ninguna');
if (process.argv.includes('--dry')) { res.forEach(r => console.log(r.t, r.k + '-' + r.j, limpia(X.fichas[r.k].cab).slice(0, 34), '|', r.j >= 0 ? limpia(X.fichas[r.k].ps[r.j].h).slice(0, 60) : '—')); process.exit(0); }
let s = fs.readFileSync(F, 'utf8');
const a = s.indexOf('const T5 = {};'), b = s.indexOf('/* T5_RECUERDA + ensamblaje */');
let seg = s.slice(a, b);
const poner = (k, j, vals) => {
  const p = X.fichas[k].ps[j]; let ini = -1;
  for (const n of [70, 200, 600, 5000]) { const r = JSON.stringify('>' + p.h.slice(0, n)).slice(1, -1); if (seg.split(r).length === 2) { ini = seg.indexOf(r); break; } }
  if (ini < 0) return false;
  const i = seg.lastIndexOf('<p', ini), tag = seg.slice(i, ini);
  const re = new RegExp(' data-ex=\\\\"([^"\\\\]*)\\\\"'); const prev = (tag.match(re) || [])[1];
  const val = [...new Set([...(prev ? prev.split(',') : []), ...vals])].sort((x, y) => ORD[x] - ORD[y]).join(',');
  if (prev === val) return true;
  const nuevo = prev !== undefined ? tag.replace(re, ` data-ex=\\"${val}\\"`) : tag + ` data-ex=\\"${val}\\"`;
  seg = seg.slice(0, i) + nuevo + seg.slice(ini); return true;
};
let ok = 0; const noloc = [];
for (const [cab, tipo, html, norma] of NUEVOS) {
  const ini = norma === 'vis' ? seg.indexOf('T5.vis') : 0;
  const i = seg.indexOf('articuloResp(\"' + cab, Math.max(0, ini)); if (i < 0) { noloc.push('nuevo:' + cab); continue; }
  if (seg.slice(i, i + 30000).includes(html.slice(0, 60))) continue;
  const m = /"(, (?:true|false))?\)[ \t]*\r?\n/.exec(seg.slice(i)); if (!m) { noloc.push('nuevo:' + cab); continue; }
  const pos = i + m.index; seg = seg.slice(0, pos) + '<p data-ex=\\"' + tipo + '\\">' + html + '</p>' + seg.slice(pos); ok++;
}
for (const r of res) { if (r.j < 0) continue; (poner(r.k, r.j, r.t.split(',')) ? ok++ : noloc.push(r.k + '-' + r.j)); }
console.log('párrafos marcados:', ok, '· no localizados en el HTML:', noloc.join(' ') || 'ninguno');
fs.writeFileSync(F, s.slice(0, a) + seg + s.slice(b));
