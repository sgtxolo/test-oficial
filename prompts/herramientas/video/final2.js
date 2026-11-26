// node final2.js v04 : une lecturas normales y ampliadas de la misma pregunta (sin depender del número) -> u-vNN.json
const fs=require('fs');const v=process.argv[2];
const lo=require('./q-'+v+'.json').map(q=>({...q,w:q.n})), hi=require('./q-h'+v+'.json').map(q=>({...q,f:q.f,w:q.n*5,hi:1}));
const clean=t=>t.replace(/\beI\b/g,'el').replace(/\bEI\b/g,'El').replace(/\bIOS\b/g,'los').replace(/\bm[óé]s\b/g,'más').replace(/\bAI\b/g,'Al').replace(/\bIe\b/g,'le').replace(/ ([,.:;])/g,'$1').replace(/\s+/g,' ').trim();
const norm=t=>t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
const bg=t=>{const s=new Set(),n=norm(t);for(let i=0;i<n.length-2;i++)s.add(n.slice(i,i+3));return s};
const sim=(x,y)=>{let c=0;for(const e of x)if(y.has(e))c++;return c/Math.max(1,x.size+y.size-c)};
const G=[];
for(const q0 of [...hi,...lo]){const q={...q0,en:clean(q0.en),op:q0.op.map(clean)};const e=bg(q.en),o=q.op.map(bg);
 let g=G.find(g=>sim(g.e,e)>0.8&&o.every((x,i)=>sim(x,g.o[i])>0.72));
 if(!g){g={e,o,v:[]};G.push(g)}g.v.push(q)}
const vot=vs=>{const c={};vs.forEach(([t,w])=>c[t]=(c[t]||0)+w);return Object.keys(c).sort((a,b)=>c[b]-c[a]||b.length-a.length)[0]};
const out=G.map(g=>{const f=Math.min(...g.v.map(x=>x.f));const nums=g.v.map(x=>x.num).filter(x=>x!=null);return{num:nums.length?+vot(nums.map(n=>[n,1])):null,f,n:g.v.reduce((s,x)=>s+x.n,0),hi:g.v.some(x=>x.hi),en:vot(g.v.map(x=>[x.en,x.w])),op:[0,1,2,3].map(i=>vot(g.v.map(x=>[x.op[i],x.w])))}}).sort((a,b)=>a.f-b.f);
fs.writeFileSync('g-'+v+'.json',JSON.stringify(out,null,1));
// secuencia por test: la numeración vuelve a 1 en cada test
let t=0,prev=99,res=[];for(const q of out){if(q.num!=null){if(q.num<prev-3)t++;prev=q.num}q.t=t;res.push(q.t+':'+q.num+(q.n<2?'?':''))}
fs.writeFileSync('g-'+v+'.json',JSON.stringify(out,null,1));console.log(v,out.length,res.join(' '))
