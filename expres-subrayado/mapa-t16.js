// Preguntas del Tema 16 que citan el Protocolo (RD 247/2024) por apartado o anexo: devuelve la pieza del subrayado (b-…) donde está.
(window.EXSUB_MAP = window.EXSUB_MAP || {})[16] = function (tx) {
  var m = tx.match(/Anexo\s+(VI|IV|V|III|II|I)\b/i);
  if (m) return { VI: 'b-a6', V: 'b-a5', IV: 'b-a2', III: 'b-a2', II: 'b-a2', I: 'b-a1' }[m[1].toUpperCase()];
  m = tx.match(/(?:apdo\.?|apartado)\s*(\d(?:\.\d){0,2}|[IVX]+)\b/i);
  if (!m) return null;
  var n = m[1].toUpperCase();
  if (n === 'I' || n === '1') return 'b-p1';
  if (n === 'II' || /^2(\.1)?$/.test(n)) return 'b-p21';
  if (/^2\.2/.test(n)) return 'b-p22';
  if (n === '2.3') return 'b-p23';
  if (n === '2.4') return 'b-p24';
  if (n === '2.5' || n === '2.5.1') return 'b-p251';
  if (n === '2.5.2') return 'b-p252';
  if (n === 'III' || /^3/.test(n)) return 'b-p3';
  if (n === 'IV' || n === '4' || /^4\.[12]$/.test(n)) return 'b-p4';
  if (n === '4.3') return 'b-p43';
  if (/^4\.[45]/.test(n)) return 'b-p44';
  if (n === 'V' || n === 'VI' || /^[56]/.test(n)) return 'b-p56';
  return null;
};
