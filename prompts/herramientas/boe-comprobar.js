/* Comprueba en el BOE si ha cambiado alguna norma catalogada en boe-monitor.json.
   Uso: node prompts/herramientas/boe-comprobar.js          (solo informa)
        node prompts/herramientas/boe-comprobar.js --guardar (además actualiza ultima_fecha_conocida)
   Fuente: API de datos abiertos del BOE (legislación consolidada, metadatos). Solo lee; no modifica nada salvo con --guardar. */
const fs = require('fs'), path = require('path');
const ruta = path.join(__dirname, '..', '..', 'boe-monitor.json');
const cat = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const guardar = process.argv.includes('--guardar');

function ddmmaaaa(s) { s = String(s || ''); const m = s.match(/^(\d{4})(\d{2})(\d{2})/); return m ? m[3] + '/' + m[2] + '/' + m[1] : s; }

async function fechaBOE(id) {
  const r = await fetch('https://www.boe.es/datosabiertos/api/legislacion-consolidada/id/' + id + '/metadatos', { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const j = await r.json();
  const d = (j.data && (Array.isArray(j.data) ? j.data[0] : j.data)) || j;
  return ddmmaaaa(d.fecha_actualizacion || d.fecha_ultima_actualizacion || '');
}

(async () => {
  let cambios = 0;
  for (const n of cat.normas) {
    try {
      const f = await fechaBOE(n.boe_id);
      const distinta = f && f !== n.ultima_fecha_conocida;
      console.log((distinta ? 'CAMBIO  ' : 'igual   ') + 'T' + n.tema + ' · ' + n.nombre.slice(0, 70) + ' · conocida ' + n.ultima_fecha_conocida + ' · BOE ' + (f || '?'));
      if (distinta) { cambios++; if (guardar) n.ultima_fecha_conocida = f; }
    } catch (e) { console.log('ERROR   T' + n.tema + ' ' + n.boe_id + ': ' + e.message); }
  }
  console.log('\nNormas vigiladas: ' + cat.normas.length + ' de 27 temas (pendientes de catalogar: ' + cat.temas_pendientes_de_catalogar.length + ' temas).');
  console.log(cambios ? cambios + ' norma(s) con cambio: revisa el texto del tema afectado.' : 'Sin cambios.');
  if (guardar && cambios) { fs.writeFileSync(ruta, JSON.stringify(cat, null, 2) + '\n'); console.log('boe-monitor.json actualizado.'); }
})();
