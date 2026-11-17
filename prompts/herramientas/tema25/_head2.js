const J=JSON.parse(require('fs').readFileSync('prompts/temario-limpio/tema25/subrayado.json','utf8'));
const out=[];
for(const p of J){ if(p.pagina<69||p.pagina>133)continue; const W=p.palabras;
 for(let i=0;i<W.length-1;i++){ const t=W[i][0]; if(/^[A-ZÁÉÍÓÚ]*C[UÚ]LO\W*$/.test(t)||/^[A-Z]?RT[IÍ]CULO/.test(t)) out.push('p'+p.pagina+':y'+Math.round(W[i][3][1])+':'+W[i+1][0]); } }
console.log(out.join('  '));
