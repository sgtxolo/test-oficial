// node hueco.js vNN : busca filas del enunciado partidas por un hueco (línea ___ que el OCR no lee)
const fs=require('fs');const v=process.argv[2];const out={};
for(const file of [v+'.json','h'+v+'.json']){if(!fs.existsSync(file))continue;const j=JSON.parse(fs.readFileSync(file,'utf8').replace(/^﻿/,''));
for(const k in j){const rows=[];for(const o of [].concat(j[k]||[]).slice().sort((a,b)=>(a.y+a.h/2)-(b.y+b.h/2))){const c=o.y+o.h/2;let l=rows.find(l=>Math.abs(l.c-c)<7);if(!l){l={c,w:[]};rows.push(l)}l.w.push(o)}
 const sel=rows.filter(r=>r.w.some(w=>/^selecc?ione/i.test(w.t)&&w.x>90&&w.x<330));
 for(const s of sel){const stem=rows.filter(r=>r.c<s.c-12&&s.c-r.c<130);for(const r of stem){const w=r.w.filter(w=>w.x>200&&w.x<1520).sort((a,b)=>a.x-b.x);if(!w.length||w[0].x>245)continue;
  let t=w[0].t,hay=false;for(let i=1;i<w.length;i++){const g=w[i].x-(w[i-1].x+w[i-1].w);if(g>48){t+=' __________';hay=true}t+=' '+w[i].t}
  const corta=w[w.length-1].x+w[w.length-1].w<1100&&r!==stem[stem.length-1]&&!/[.:?)]$/.test(t);
  if(hay){const key=t.toLowerCase().replace(/[^a-z]/g,'').slice(0,50);out[key]=out[key]||{t,k,n:0};out[key].n++}}}}}
console.log(v);Object.values(out).filter(o=>o.n>1).forEach(o=>console.log(' ',o.k,o.n,o.t))
