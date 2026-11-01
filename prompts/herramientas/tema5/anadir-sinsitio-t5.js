// Tema 5 · «sin sitio» clase 1 (1/11/2026): el art. 32.1 del VIS (seguridad de los datos) no estaba como párrafo en el esquema (solo en la lista de respuestas).
// Texto literal del consolidado de su PDF (temario-limpio/tema5/consolidado.txt, «Art. 32.1»). Idempotente.
const E = require('../anade-parrafo.js')();
E.inserta({ cab: 'Artículo 32 — Seguridad de los datos', donde: 'ini',
  html: '<p><b>1.</b> El <mark class="m-autoridad">Estado miembro responsable</mark> <mark class="m-accion">garantizará</mark> la seguridad de los datos <mark class="m-resp">antes y durante su transmisión a la interfaz nacional</mark>. Cada Estado miembro garantizará la seguridad de los datos que reciba del VIS.</p>' });
E.guarda();
