const J=JSON.parse(require('fs').readFileSync('prompts/temario-limpio/tema25/subrayado.json','utf8'));
const pats={14:/^(REUNIONES)/,16:/^(COMETIDOS)/,17:/^(FUENTES)/,19:/^(DETERMINACI|DETERMINACIÓN)/,36:/^(DERECHO)/,37:/^(DERECHO)/};
for(const p of J){ if(p.pagina<69||p.pagina>133)continue; const W=p.palabras;
 for(let i=0;i<W.length-1;i++){ const t=W[i][0]; if(/^(REUNIONES|COMETIDOS|FUENTES|DETERMINACI|SEGURIDAD|DERECHO|RECTIFICACI)/.test(t)&&t===t.toUpperCase()) console.log('p'+p.pagina,'y'+Math.round(W[i][3][1]),t,W[i+1][0],(W[i+2]||[''])[0]); } }
