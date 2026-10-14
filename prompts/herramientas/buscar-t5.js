const fs=require('fs');const [re,n]=[new RegExp(process.argv[2],'gi'),+process.argv[3]||3];
for(const f of ['oficial-paginas','consolidado','escaneado-paginas']){const t=fs.readFileSync(f+'.txt','utf8').replace(/\s+/g,' ');let m,k=0;console.log('== '+f);while((m=re.exec(t))&&k<n){k++;console.log('  …'+t.slice(Math.max(0,m.index-250),m.index+350)+'…')}}
