const [v,a,b,st]=process.argv.slice(2);const J=JSON.parse(require('fs').readFileSync('v/'+v+'.json','utf8').replace(/^﻿/,''));
for(let f=+a;f<=+b;f+=+(st||3)){const w=[].concat(J[String(f).padStart(5,'0')]||[]);console.log('--'+f,w.map(x=>x.t).join(' ').replace(/^.*?restante \S+ /,'').slice(0,900))}
