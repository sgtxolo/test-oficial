const [v,re,a,b]=process.argv.slice(2);const J=JSON.parse(require('fs').readFileSync('v/'+v+'.json','utf8').replace(/^﻿/,''));
const R=new RegExp(re,'i');let n=0;for(const f of Object.keys(J).sort()){if(+f<(+a||0)||+f>(+b||1e9))continue;const t=[].concat(J[f]||[]).map(w=>w.t).join(' ');const i=t.search(R);if(i>=0){console.log(f,t.slice(Math.max(0,i-250),i+250));if(++n>3)break}}
