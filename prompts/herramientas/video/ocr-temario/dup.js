const Q=require('./banco.js')();const p=t=>t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
const lev=(a,b)=>{const m=a.length,n=b.length;if(Math.abs(m-n)>Math.max(m,n)*0.1)return 999;let q=Array.from({length:n+1},(_,j)=>j);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(q[j]+1,c[j-1]+1,q[j-1]+(a[i-1]===b[j-1]?0:1));q=c}return q[n]};
const st=t=>{let x=t;let a;do{a=x;const r=x.replace(/^[^.¿?:]{0,140}(\.|:)\s*/,'');if(r.length>25)x=r}while(x!==a);return p(x)};
for(const t of ['1','3']){const first=t==='1'?558:510;const all=Q[t].filter(q=>!/-ia|forma/.test(q.id));
 const nuevas=all.filter(q=>+q.id.split('-')[1]>=first);
 for(const n of nuevas){for(const o of all){const num=+o.id.split('-')[1];if(num>=+n.id.split('-')[1])continue;
  const s1=st(n.pregunta),s2=st(o.pregunta);const same=lev(s1,s2)<=Math.floor(s1.length*0.02);if(!same)continue;
  const ops=n.opciones.map(p);const com=o.opciones.map(p).filter(x=>ops.some(y=>lev(x,y)<=2)).length;
  const gen=/se[ñn]ale (la )?(opci[oó]n )?(in)?correcta\W*$/i.test(n.pregunta)&&n.pregunta.length<190;
  if(!gen||com>=4){console.log(n.id,'~',o.id,'ops',com,gen?'GEN':'',n.pregunta.slice(-90));break}}}
}
