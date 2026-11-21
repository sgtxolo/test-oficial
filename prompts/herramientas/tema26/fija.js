const fs=require('fs');const F=__dirname+'/mapa-fijo-t26.json';const m=JSON.parse(fs.readFileSync(F,'utf8'));
Object.assign(m,{'26-6':'335-0','26-33':'214-1','26-175':'59-1','26-ia-1124':'43-1','26-ia-1178':'59-1','26-ia-1821':'188-3','26-ia-2007':'223-1','26-ia-2609':'321-8','26-ia-2704':'333-3'});
fs.writeFileSync(F,JSON.stringify(m,null,1));console.log(Object.keys(m).length);
