// Reglas de color del método del usuario, aplicadas SOBRE el subrayado leído del temario:
//  · verbos en futuro (podrá, deberán, será, notificará…: acaban en -á / -án)  -> lila (m-accion), sin rojo subrayado
//  · órganos y autoridades (Corte, Tribunal, Comité de Ministros, Fiscal, Juez, Sala, Estados Partes…) -> verde,
//    aunque en el temario estén en amarillo (errata del subrayado a mano)
//  · palabras de enlace (de, del, la, y…) entre dos palabras verdes -> verde (una sola banda)
// Las respuestas de los tests (m-resp) no se tocan.
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const AUT = new Set(['corte', 'tribunal', 'tribunales', 'comite', 'ministros', 'ministerio', 'ministerios', 'asamblea', 'consejo',
  'secretaria', 'secretario', 'gobierno', 'fiscal', 'fiscales', 'fiscalia', 'juez', 'jueces', 'magistrado', 'magistrados', 'sala', 'salas',
  'presidencia', 'presidente', 'comision', 'parlamento', 'audiencia', 'juzgado', 'abogado', 'abogados', 'registrador', 'defensor',
  'organo', 'organos', 'autoridad', 'autoridades', 'delegado', 'delegados', 'interpol', 'europol', 'oficina']);
const ENLACE = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'o', 'u', 'para', 'en']);
const FUT = /^[a-záéíóúüñ]{2,}r(á|án)$/i;
function parsea(html) {
  const piezas = [], pila = [];
  const re = /<(\/?)(mark|u|span)\b([^>]*)>|<[^>]+>|\s+|[^<\s]+/g; let m;
  while ((m = re.exec(html))) {
    const s = m[0];
    if (m[2]) {
      const cls = (/class=["']?([\w-]+)/.exec(m[3]) || [])[1] || '';
      if (m[2] === 'span') {
        if (m[1]) { const top = pila.pop(); if (top && top.ajeno) piezas.push({ t: 'tag', s }); continue; }
        if (/^m-(caja|circulo)$/.test(cls)) pila.push({ tag: 'span', cls });
        else { pila.push({ tag: 'span', ajeno: true }); piezas.push({ t: 'tag', s }); }
        continue;
      }
      if (m[1]) pila.pop(); else pila.push({ tag: m[2], cls });
      continue;
    }
    if (s[0] === '<') piezas.push({ t: 'tag', s });
    else if (/^\s+$/.test(s)) piezas.push({ t: 'ws', s });
    else {
      const mk = [...pila].reverse().find(x => x.tag === 'mark');
      piezas.push({ t: 'w', s, cls: mk ? mk.cls : null, ru: pila.some(x => x.tag === 'u'), forma: (pila.find(x => x.tag === 'span') || {}).cls || null });
    }
  }
  return piezas;
}
function aplica(html) {
  const piezas = parsea(html);
  const ws = piezas.filter(p => p.t === 'w');
  ws.forEach((p, k) => {
    if (p.cls === 'm-resp') return;
    const limpia = p.s.replace(/&[a-z]+;/g, '').replace(/^[«"“(¿¡]+|[.,;:)»"”?!]+$/g, '');
    if (FUT.test(limpia)) { p.cls = 'm-accion'; p.ru = false; return; }
    const n = norm(limpia), cap = /^[A-ZÁÉÍÓÚÑ]/.test(limpia);
    let aut = AUT.has(n);
    if ((n === 'estado' || n === 'estados') && cap) aut = true;
    if (n === 'partes' && cap && ws[k - 1] && /^estados?$/i.test(norm(ws[k - 1].s))) aut = true;
    if (aut && !p.cls) { p.cls = 'm-autoridad'; return; }
    if (aut && p.cls !== 'm-accion') p.cls = 'm-autoridad';
  });
  // palabras de enlace entre verdes
  for (let k = 1; k < ws.length - 1; k++) {
    const p = ws[k]; if (p.cls === 'm-resp' || p.cls === 'm-accion') continue;
    if (!ENLACE.has(norm(p.s))) continue;
    if (ws[k - 1].cls === 'm-autoridad' && ws[k + 1].cls === 'm-autoridad' && (!p.cls || p.cls === 'm-personalizado')) p.cls = 'm-autoridad';
  }
  const estilo = p => p.cls === 'm-resp' ? 'R' : (p.cls || p.ru || p.forma) ? `${p.cls || ''}|${p.ru ? 1 : 0}|${p.forma || ''}` : '';
  let out = '', i = 0;
  while (i < piezas.length) {
    const p = piezas[i];
    if (p.t !== 'w' || !estilo(p)) { out += p.s; i++; continue; }
    const e = estilo(p); let j = i, buf = '';
    while (j < piezas.length) {
      if (piezas[j].t === 'w' && estilo(piezas[j]) === e) { buf += piezas[j].s; j++; continue; }
      if (piezas[j].t === 'ws') { let k = j; while (k < piezas.length && piezas[k].t === 'ws') k++; if (k < piezas.length && piezas[k].t === 'w' && estilo(piezas[k]) === e) { buf += piezas[j].s; j++; continue; } }
      break;
    }
    if (e === 'R') out += `<mark class="m-resp">${buf}</mark>`;
    else {
      let x = buf;
      if (p.ru) x = `<u class="m-clave">${x}</u>`;
      if (p.cls) x = `<mark class="${p.cls}">${x}</mark>`;
      if (p.forma) x = `<span class="${p.forma}">${x}</span>`;
      out += x;
    }
    i = j;
  }
  return out;
}
module.exports = { aplica };
