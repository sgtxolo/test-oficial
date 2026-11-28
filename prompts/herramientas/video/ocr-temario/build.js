// node build.js d1 [d2 …] -> lote.json (preguntas listas) + citas.txt para revisar
const fs = require('fs'), path = require('path');
const { arts, lineas, limpia } = require('./temario.js');
const N = {
  CDF: ['Carta de los Derechos Fundamentales de la Unión Europea', 'k', /carta de los derechos fundamentales/],
  ECE: ['Estatuto del Consejo de Europa', 'n', /estatuto del consejo/],
  CEDH: ['Convenio Europeo de Derechos Humanos', 'h', /convenio para la proteccion|convenio europeo/],
  P1: ['Convenio Europeo de Derechos Humanos', 'q', /protocolo/, 'Protocolo Adicional'], P4: ['Convenio Europeo de Derechos Humanos', 'q', /protocolo/, 'Protocolo n.º 4'], P6: ['Convenio Europeo de Derechos Humanos', 'q', /protocolo/, 'Protocolo n.º 6'], P7: ['Convenio Europeo de Derechos Humanos', 'q', /protocolo/, 'Protocolo n.º 7'], P12: ['Convenio Europeo de Derechos Humanos', 'q', /protocolo/, 'Protocolo n.º 12'], P13: ['Convenio Europeo de Derechos Humanos', 'q', /protocolo/, 'Protocolo n.º 13'],
  ER: ['Estatuto de Roma de la Corte Penal Internacional', 'e', /estatuto de roma/],
  APIC: ['Acuerdo sobre Privilegios e Inmunidades de la Corte Penal Internacional', 'p', /privilegios e inmunidades/],
  LOCPI: ['Ley Orgánica 18/2003, de 10 de diciembre, de Cooperación con la Corte Penal Internacional', 'l', /18\/2003|cooperacion con la corte/],
  TUE: ['Tratado de la Unión Europea', 'a', /tratado de la union europea/], TFUE: ['Tratado de Funcionamiento de la Unión Europea', 'b', /funcionamiento/],
};
const PRE = { CDF: ['Los pueblos de Europa, al crear', 'Consciente de su patrimonio', 'La Unión contribuye a defender', 'Para ello es necesario', 'La presente Carta reafirma', 'El disfrute de tales derechos', 'En consecuencia, la Unión'] };
function preambulo(n, k) {
  const L = lineas(n); const i = L.findIndex(l => /^PREÁMBULO/.test(l)); const t = limpia(L.slice(i + 1, i + 60).join(' '));
  const m = PRE[n]; const a = t.indexOf(m[k - 1]), b = k < m.length ? t.indexOf(m[k]) : t.length;
  if (a < 0 || b < 0) throw new Error('preámbulo ' + n + k);
  return t.slice(a, b).trim();
}
const EXTRA = (() => { try { return require('./extra-citas.js'); } catch (e) { return {}; } })();
const cache = {};
function cita(ref) {
  const n = ref.slice(0, ref.indexOf(' ')), a = ref.slice(ref.indexOf(' ') + 1);
  if (EXTRA[ref]) return { n, art: a.split('.')[0], ap: null, txt: EXTRA[ref] };
  if (/^pre/.test(a)) return { n, art: 'pre', txt: preambulo(n, +a.slice(3)) };
  cache[n] = cache[n] || arts(n);
  const [art, ap] = a.replace('_', ' ').split('.');
  const x = cache[n][art]; if (!x) throw new Error('sin artículo ' + ref);
  let t = x.txt;
  if (ap) {
    const marcas = []; let desde = 0;
    for (let k = 1; k < 40; k++) { const re = /^T/.test(n) ? new RegExp('(^| )' + k + '\\. (?=[A-ZÁÉÍÓÚ])', 'g') : new RegExp('(^|[.:;»)] )' + k + '\\. ?(?=\\S)', 'g'); re.lastIndex = desde; const m = re.exec(t); if (!m) break; marcas.push(m.index + m[1].length); desde = m.index + m[0].length; }
    const k = +ap - 1; if (marcas[k] === undefined) throw new Error('sin apartado ' + ref);
    t = t.slice(marcas[k], marcas[k + 1]).trim();
  }
  if (/^T[F]?UE/.test(n)) t = t.replace(/ T3 TRATADOS DELA? UNIÓN EUROPEA\.?(?= [a-záéíóú])/g, '').split(/ (?:T3 TRATADOS|VALORES DE RESPETO|La DELIMITACIÓN de|EL FUNCIONAMIENTO DE|EL CONSEJO PREVIA|EL CONSEJO EUROPEO PRESIDENTE|EL CONSEJO EUROPEO POR |PARLAMENTO EUROPEO FUNCIONES|Parlamento Europeo FUNCIÓN|MAYORÍA CUALIFICADA)/)[0].replace(/\bApetición/g, 'A petición').replace(/\bApropuesta/g, 'A propuesta').replace(/\bAtal fin/g, 'A tal fin').replace(/\bAefectos/g, 'A efectos').replace(/ yserá /g, ' y será ').trim();
  return { n, art, ap: ap || null, txt: t };
}
const arreglaGen = t => t.replace(/(?<=[a-záéíóú,] )S(us?)\b/g, "s$1").replace(/ ?\(\d+\) B a.*$/, "").replace(/ (lo )?x$/, "").replace(/ Sólo podr/g, " sólo podr").replace(/^LOS /, "Los ").replace(/ Son (correctas|incorrectas)/g, " son $1").replace(/ Supong/g, " supong").replace(/\.\.$/, ".").replace(/\bSu (domicilio|causa)/g, "su $1").replace(/\beI\b/g, "el").replace(/\bEI\b/g, "El").replace(/IJni/g, "Uni").replace(/\bIe concierna/g, "le concierna").replace(/\bshs\b/g, "sus").replace(/tenga Su /g, "tenga su ").replace(/indepert[$]iente/g, "independiente").replace(/que Su Causa Sea/g, "que su causa sea").replace(/derecho am señale/g, "derecho a __________. Señale").replace(/salvaguardar y mover/g, "salvaguardar y promover").replace(/(dirigidas)$/, "$1 a...:").replace(/Unidn\b/g, 'Unión').replace(/(P|p)oltti/g, '$1olíti').replace(/(P|p)ol[\[!]ti/g, '$1olíti').replace(/jur[\[ ]dic/g, 'jurídic').replace(/\bfisica/g, 'física').replace(/([a-záéíóú])_(?!_)(?=\W|$)/g, '$1.').replace(/ cl /g, ' al ').replace(/([^.\s])\. (?=[a-záéíóú])/g, '$1, ').replace(/\bperfodo/g, 'período').replace(/\bunion Europea|\bunión Europea/g, 'Unión Europea').replace(/ Objeto/g, ' objeto').replace(/ Oíd([ao])/g, ' oíd$1').replace(/ Como /g, ' como ').replace(/ Otr([ao]s)\b/g, ' otr$1').replace(/ ?\bx$/, '').trim();
const salida = [];
for (const dn of process.argv.slice(2)) {
  const D = require('./' + dn + '.js');
  const R = JSON.parse(fs.readFileSync(path.join(__dirname, D.r + '-fix.json'), 'utf8'));
  for (const [i, letra, refs, exp, fixes] of D.d) {
    const q = R[i]; if (!q) throw new Error(dn + ' sin pregunta ' + i);
    let en = q.en, op = q.op.slice();
    for (const [a, b] of fixes || []) { let n = 0; if (en.includes(a)) { en = en.split(a).join(b); n++; } op = op.map(o => { if (o.includes(a)) { n++; return o.split(a).join(b); } return o; }); if (!n && a !== b) console.log('AVISO fix sin efecto', dn, i, a); }
    en = arreglaGen(en); op = op.map(arreglaGen).map(o => /[.:?;…»")]$/.test(o) ? o : o + '.');
    const cs = refs.split(';').map(cita);
    const norma = N[cs[0].n];
    const loc = cs.map(c => c.art === 'pre' ? 'Preámbulo' : 'Art. ' + c.art.replace(' ', ' ') + (c.ap ? '.' + c.ap : '')).filter((v, k, a) => a.indexOf(v) === k);
    const lila = (norma[3] ? norma[3] + ', ' : '') + loc.join(' y ') + ' · ' + norma[0];
    const guion = x => x.replace(/([a-záéíóú])[-‐‑] (?=[a-záéíóú])/g, '$1');
    const rojo = cs.map((c, k) => (cs.length > 1 && c.art !== 'pre' ? 'Art. ' + c.art + '. ' : '') + guion(c.txt)).filter((v, k, a) => a.indexOf(v) === k).join('<br>');
    const c = 'ABCD'.indexOf(letra);
    salida.push({ lote: dn, i, v: q.v, t: D.t, refs: cs.map(x => ({ n: x.n, art: x.art, ap: x.ap })), pregunta: en, opciones: op, correcta: c, lila, rojo, exp, apartado: norma[0], letra: norma[1] });
  }
}
fs.writeFileSync(path.join(__dirname, 'lote-' + process.argv.slice(2).join('-') + '.json'), JSON.stringify(salida, null, 1));
const vistos = new Set(); let t = '';
for (const s of salida) { t += `\n#${s.i} [${s.lila}]\n P: ${s.pregunta}\n R: ${s.opciones[s.correcta]}\n`; if (!vistos.has(s.rojo)) { t += ' C: ' + s.rojo + '\n'; vistos.add(s.rojo); } }
fs.writeFileSync(path.join(__dirname, 'citas-' + process.argv.slice(2).join('-') + '.txt'), t);
console.log('preguntas', salida.length, 'chars citas', t.length);
