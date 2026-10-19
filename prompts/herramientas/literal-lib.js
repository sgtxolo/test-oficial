// Lee / escribe la cadena literal de una norma del esquema: /* TN_X */ TN.x = "<html>";  (una sola línea)
const fs=require('fs');
exports.get=(s,k)=>{const i=s.indexOf('/* '+k+' */');const e=s.indexOf('\n',i);const line=s.slice(i,e);const j=line.indexOf('= "')+2;return {i,e,pre:line.slice(0,j),html:JSON.parse(line.slice(j,line.length-1))};};
exports.put=(s,k,html)=>{const g=exports.get(s,k);return s.slice(0,g.i)+g.pre+JSON.stringify(html)+';'+s.slice(g.e);};
exports.lim=t=>t.replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
