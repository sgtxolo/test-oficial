// Tema 26: preguntas que citan apartados de los protocolos (Resoluciones), anexos, preámbulos y disposiciones.
// Se evalúa ANTES que las reglas de artículo (primero = true): lee la cita «<span class="ref-norma">Tercero.2 · Resolución…</span>» y devuelve la pieza.
(window.EXSUB_MAP = window.EXSUB_MAP || {})[26] = (function () {
  var ORD = { primero: 1, segundo: 2, tercero: 3, cuarto: 4, quinto: 5, sexto: 6, septimo: 7, octavo: 8, noveno: 9, decimo: 10, undecimo: 11, duodecimo: 12,
    decimotercero: 13, decimocuarto: 14, decimoquinto: 15, decimosexto: 16, decimoseptimo: 17, decimoctavo: 18, decimonoveno: 19, vigesimo: 20,
    vigesimoprimero: 21, vigesimosegundo: 22, vigesimotercero: 23, vigesimocuarto: 24, vigesimoquinto: 25 };
  var sa = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  var FIX = { "26-4": "a-11", "26-236": "c-32", "26-ia-1755": "c-13", "26-ia-2024": "c-60" };   // citas que las reglas de artículo del test sitúan mal
  var f = function (tx, raw, id) {
    if (id && FIX[id]) return FIX[id];
    var m = /<span class="ref-norma">([\s\S]*?)<\/span>/.exec(String(raw || ''));
    if (!m) return null;
    var ref = m[1].replace(/<[^>]+>/g, '').replace(/&quot;/g, '"'), p = ref.split(' · ');
    var lab = sa(p.slice(0, -1).join(' · ')).replace(/\s+/g, ' ').trim(), norma = sa(p[p.length - 1]);
    var conc = (/<span class="ref-concepto">([\s\S]*?)<\/span>/.exec(String(raw)) || [, ''])[1].replace(/<[^>]+>/g, '');
    var L = null;
    if (/organica 11\/2007/.test(norma)) L = 'a'; else if (/organica 12\/2007/.test(norma)) L = 'b'; else if (/ley 29\/2014/.test(norma)) L = 'c'; else if (/pre\/1983\/2012/.test(norma)) L = 'd';
    else if (/protocolo de actuacion frente al acoso laboral/.test(norma)) L = 'e'; else if (/protocolo de actuacion frente al acoso sexual/.test(norma)) L = 'f'; else if (/violencia sobre la mujer/.test(norma)) L = 'g';
    if (!L) return null;
    if ('abcd'.indexOf(L) >= 0) {
      if (L === 'c' && /^preambulo/.test(lab)) return /^preambulo v$/.test(lab) ? 'c-pre' : 'c-prea';
      if (/^(preambulo|exposicion de motivos)/.test(lab)) return L + '-pre';
      if (/^(da|dt|dd|df|disposicion)/.test(lab)) return L + '-fin';
      return null;
    }
    if (/^anexo/.test(lab)) return (L === 'g') ? null : L + '-ax';
    if (/^(preambulo|exposicion de motivos)/.test(lab)) return L + '-pre';
    var w = /^(?:apdo\.?|apartado)?\s*([a-z]+)/.exec(lab.replace(/^(apdo\.?|apartado)\s*/, '')), n = null, sub = null;
    if (w && ORD[w[1]]) n = ORD[w[1]];
    var d = /^(?:apdo\.?\s*|apartado\s*)?(\d+)\.(\d+)/.exec(lab); if (!n && d) { n = +d[1]; sub = +d[2]; }
    if (n && lab.indexOf('.') >= 0 && !sub) { var d2 = /[a-z]+\.?\s*(\d+)\.(\d+)/.exec(lab); if (d2) sub = +d2[1] === n ? +d2[2] : null; }
    if (!n) return L + '-pre';
    // las disposiciones de la propia Resolución (aprobación, deroga, faculta, surte efectos) van al bloque inicial
    if ((L === 'e' || L === 'g') && n <= 4 && /aprueba|queda sin efecto|faculta|surtir|instrucciones necesarias|mi autoridad/.test(sa(conc)) && !/protocolo/.test(sa(conc).slice(0, 0))) return L + '-pre';
    if (L === 'e') {
      if (n === 5) return sub === 2 ? 'e-5b' : sub === 3 ? 'e-5c' : 'e-5';
      if (n === 6) return sub === 3 ? 'e-6c' : (sub === 4 || sub === 5) ? 'e-6d' : 'e-6';
      return 'e-' + n;
    }
    if (L === 'f') {
      if (n === 5) return sub === 1 ? 'f-5a' : sub === 2 ? 'f-5b' : sub === 3 ? 'f-5c' : 'f-5';
      if (n === 7) return sub === 2 ? 'f-7b' : sub === 3 ? 'f-7c' : sub === 4 ? 'f-7d' : sub === 5 ? 'f-7e' : 'f-7a';
      return 'f-' + n;
    }
    return 'g-' + n;
  };
  f.primero = true;
  return f;
})();
