// node rep2.js vNN : únicas del vídeo (todas las lecturas) y comparadas con el banco -> u-vNN.json, r-vNN.txt
const fs=require('fs'),L=require('./lib.js');const v=process.argv[2];process.chdir('C:/Users/ruben/Desktop/HTML OFICIAL');
const a=require('./g-'+v+'.json').slice().sort((x,y)=>(y.hi?1:0)-(x.hi?1:0)||y.n-x.n);
const norm=t=>t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
const bg=t=>{const s=new Set(),n=norm(t);for(let i=0;i<n.length-2;i++)s.add(n.slice(i,i+3));return s};
const sim=(x,y)=>{let c=0;for(const e of x)if(y.has(e))c++;return c/Math.max(1,x.size+y.size-c)};
const PREF=[/^Reglamento por el que se establece un c.digo comunitario sobre visados \(C.digo de visados\)\.?/i,/^Reglamento[^()]*\(SIS\)\.?/i,/^Reglamento Europeo[^.]*Eurodac[”"»]?\.?/i,/^Real Decreto sobre [Pp]revenci.n de [Rr]iesgos [Ll]aborales en la Guardia Civil\.?/i,/^Ley Org.nica del C.digo Penal[.:]/i];
const quita=t=>PREF.reduce((s,r)=>s.replace(r,''),t).trim();
const generico=s=>/se[ñn]ale[^.?:]{0,60}\W*$/i.test(s)&&s.length<130;
const U=[];for(const q of a){q.stem=quita(q.en);const e=bg(q.stem),o=bg([...q.op].sort().join(' '));
const w=U.find(x=>{const s=sim(x.e,e),so=sim(x.o,o);return (s>0.9&&(!generico(q.stem)||so>0.75))||(s>0.75&&so>0.85)});if(w)continue;U.push({e,o,q})}
const Q=L.leeConst('test-oficial-conocimiento.html','QUESTIONS');const bank=[].concat(...Object.values(Q)).map(q=>({id:q.id,e:bg(quita(q.pregunta)),o:bg([...q.opciones].sort().join(' ')),q}));
const lista=U.map(x=>x.q).sort((x,y)=>x.f-y.f);let rep=[];const out=[];
lista.forEach((q,i)=>{q.id=i+1;const e=bg(q.stem),o=bg([...q.op].sort().join(' '));
const c=bank.map(b=>({b,s:sim(e,b.e),so:sim(o,b.o)})).filter(c=>c.s>0.9&&(!generico(q.stem)||c.so>0.75));
if(c.length)rep.push(q.id+'='+c[0].b.id);else out.push(q)});
fs.writeFileSync(__dirname+'/u-'+v+'.json',JSON.stringify(out.map(q=>({...q,t:'q',num:q.id})),null,1));
fs.writeFileSync(__dirname+'/r-'+v+'.txt',out.map(q=>'['+q.id+(q.hi?'':' LO')+(q.n<3?' n'+q.n:'')+'] '+q.stem+'\n'+q.op.map((o,i)=>'ABCD'[i]+') '+o).join('\n')).join('\n'));
console.log('lecturas',a.length,'únicas',lista.length,'repetidas con banco',rep.join(' '),'quedan',out.length,fs.statSync(__dirname+'/r-'+v+'.txt').size)
