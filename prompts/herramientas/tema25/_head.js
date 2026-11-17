const J=JSON.parse(require('fs').readFileSync('prompts/temario-limpio/tema25/subrayado.json','utf8'));
const R={a:[5,36],b:[37,45],c:[47,55],d:[69,133],e:[57,67]};
const miss={a:[5],b:[3],c:[16],d:[1,13,14,16,17,19,32,36,37,49,64,76]};
for(const [k,ns] of Object.entries(miss)) for(const n of ns){
  const out=[];
  for(const p of J){ if(p.pagina<R[k][0]||p.pagina>R[k][1])continue;
    const W=p.palabras;
    for(let i=0;i<W.length-1;i++){ const t=W[i][0]; if(!/^(ART|ARF|LRT|ÁRT|CULO|ARTICULO|ARTÍCULO)/i.test(t)&&!/CULO/i.test(t))continue;
      const nx=W[i+1][0].replace(/\W/g,''); if(nx===String(n)) out.push('p'+p.pagina+' y'+Math.round(W[i][3][1])+' '+t+' '+nx); } }
  console.log(k+'-'+n, out.join(' ; ')||'NO');
}
