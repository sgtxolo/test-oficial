const fs=require('fs');const t=fs.readFileSync('prompts/herramientas/tema25/_sinpieza.txt','utf8');const E={};
for(const m of t.matchAll(/([a-e])-(\d+) \(\d+\)/g)){(E[m[1]]=E[m[1]]||[]).push(+m[2])}
fs.writeFileSync('expres-subrayado/t25-extra.json',JSON.stringify(E));console.log(Object.entries(E).map(([k,v])=>k+':'+v.length).join(' '));
