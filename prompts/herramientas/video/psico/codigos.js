// Ejercicios de claves: cada columna es una operación arriba (op) abajo = resultado; cada signo es una cifra.
// Símbolos: o○ O● t△ T▲ v▽ V▼ s□ S■ r▷ R▶ l◁ L◀ d◇ D◆ ; ? incógnita
const Q = {
23: { k: ['v=5+o'], c: ['+ oT tT vv', '- vs 1T V2', '+ OT Tt s9', '+ 5O 3o 8?'], opt: [6, 5, 7, 4] },
24: { k: ['4-o=s', 'v=7'], c: ['- V v o', '+ s o t', '+ t t V', '- v s ?'], opt: [3, 4, 5, 6] },
25: { k: ['5-o=S', 'S=O+O'], c: ['+ O t 7', '+ S o t', '+ S O T', '- T ? t'], opt: [1, 3, 5, 4] },
26: { k: ['d-v=5', 's=v+v'], c: ['+ o v ?', '+ v r d', '+ r s 9', '- d o s'], opt: [2, 3, 5, 4] },
27: { k: ['t-s=1', 't=5'], c: ['- s 1 S', '- T O s', '+ S O ?', '- T t 1'], opt: [6, 3, 5, 4] },
28: { k: ['t=4-d', 'O=t+t'], c: ['+ t d T', '- O T 2', '+ D d t', '+ D ? 8'], opt: [6, 7, 5, 4] },
29: { k: ['S=1+o'], c: ['- oo vv vv', '+ 7s 21 9?', '+ VS OV o6', '- sS Oo 3V'], opt: [6, 7, 5, 8] },
30: { k: ['O+S=s+s', 't-s=2'], c: ['+ O s t', '- S s o', '+ t o ?', '+ O O S'], opt: [5, 6, 7, 4] },
31: { k: ['s-V=3', 'L=V+V'], c: ['- O R L', '- O s ?', '+ V R s', '+ R 1 L'], opt: [1, 2, 3, 4] },
32: { k: ['T=6'], c: ['+ OT ?s 88', '+ TT sS 91', '- SO to st', '+ os tt 7S'], opt: [4, 5, 6, 1] },
33: { k: ['v-s=2', 'O=t+t', 'V-v=1'], c: ['+ oO TO ?V', '+ To OS vv', '+ tt SO VS', '+ ss tt vv'], opt: [4, 5, 6, 7] },
34: { k: ['S=2'], c: ['- VO O1 Oo', '+ ?4 r3 vt', '+ So Sl Ov', '+ 1o rr lV'], opt: [2, 3, 4, 5] },
35: { k: ['T=6', 'O+o=4'], c: ['+ Oo oO SS', '+ st So TT', '- vV T? s3', '+ tO sO VT'], opt: [3, 4, 5, 6] },
48: { k: ['v=8'], c: ['+ to tt TV', '+ ST ST vS', '- Vo SO s?', '+ tO Ts sv'], opt: [1, 2, 3, 4] },
49: { k: ['6-t=r', 'r-1=v'], c: ['+ v r s', '+ v v O', '- s 2 ?', '+ r t O'], opt: [3, 4, 5, 6] },
50: { k: ['7-r=l'], c: ['- ol Or 11', '+ o? 1v s8', '+ rr lO s8', '+ vv vv ll'], opt: [6, 7, 8, 9] },
51: { k: ['o+2=d'], c: ['- o t t', '+ ? t d', '+ v 4 o', '- d o v'], opt: [3, 4, 6, 5] },
52: { k: ['l=o+o+o', 'v=l-2'], c: ['+ O v ?', '+ O t l', '+ v o l', '+ t t o'], opt: [6, 7, 8, 9] },
53: { k: ['o=1', 'O+t=9'], c: ['- RR tt OO', '+ tv SV v?', '- sV OS oS', '+ Vo So OS'], opt: [8, 9, 7, 6] },
54: { k: ['s=1'], c: ['- SS ss ss', '- vO Ss to', '+ St oO t?', '- Sv ss s6'], opt: [7, 9, 8, 6] },
55: { k: ['o+S=6', 's=S+S+S'], c: ['+ o O t', '- t s 1', '- s o S', '+ O ? 9'], opt: [5, 6, 7, 8] },
56: { k: ['t=6'], c: ['+ SS oo TT', '+ Ds d? v7', '- ot SO 11', '- tT SO Ss'], opt: [4, 5, 6, 7] },
89: { k: ['r+4=L', 'R=6', 'L=T+T+T'], c: ['- r t ?', '+ T T R', '+ T t V', '- L V r'], opt: [3, 4, 5, 6] },
90: { k: ['o=1', 't=O+O', 'S-4=O'], c: ['- d T ?', '+ O t S', '- T o t', '- d S o'], opt: [2, 3, 4, 5] },
91: { k: ['L=6'], c: ['- vL Lr 2o', '+ ss ss LL', '- Sv ?7 1o', '+ OO sO rS'], opt: [1, 2, 3, 4] },
92: { k: ['T+O=7', 's-2=O'], c: ['+ S T ?', '+ S O s', '- t O T', '- t s 2'], opt: [5, 6, 7, 8] }
};
const out = {};
for (const [n, q] of Object.entries(Q)) {
  const cols = q.c.map(s => s.split(' '));
  const syms = [...new Set((q.k.join('') + q.c.join('')).match(/[a-zA-Z?]/g))];
  const cons = [];
  for (const k of q.k) cons.push(k.split('=').map(x => x));
  const tests = [];
  for (const k of q.k) { const vars = [...new Set(k.match(/[a-zA-Z]/g))]; const [a, b] = k.split('='); tests.push({ vars, f: new Function(...vars, `return (${a})===(${b})`) }); }
  for (const [op, a, b, r] of cols) {
    const vars = [...new Set((a + b + r).match(/[a-zA-Z?]/g) || [])];
    const num = w => [...w].map((ch, i) => `${/\d/.test(ch) ? ch : ch === '?' ? 'Q' : ch}*${10 ** (w.length - 1 - i)}`).join('+');
    tests.push({ vars, f: new Function(...vars.map(x => x === '?' ? 'Q' : x), `return (${num(a)})${op}(${num(b)})===(${num(r)})`) });
  }
  // orden de asignación: primero los símbolos de las restricciones más pequeñas
  const order = []; for (const t of [...tests].sort((x, y) => x.vars.length - y.vars.length)) for (const v of t.vars) if (!order.includes(v)) order.push(v);
  const val = {}; const sols = new Set(); let count = 0;
  const rec = i => {
    if (count > 20000) return;
    if (i === order.length) { sols.add(val['?']); count++; return; }
    for (let d = 0; d <= 9; d++) {
      val[order[i]] = d;
      if (tests.every(t => t.vars.some(v => val[v] === undefined) || t.f(...t.vars.map(v => val[v])))) rec(i + 1);
      delete val[order[i]];
    }
  };
  rec(0);
  const match = [...sols].filter(x => q.opt.includes(x));
  out[n] = match.length === 1 ? 'ABCD'[q.opt.indexOf(match[0])] : null;
  console.log(n, 'soluciones ?:', [...sols].join(','), '->', out[n] || 'DUDA', match.join(','));
}
require('fs').writeFileSync(__dirname + '/sol-cod.json', JSON.stringify(out));
