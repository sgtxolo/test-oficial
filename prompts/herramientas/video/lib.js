const fs=require('fs');
const BS=String.fromCharCode(92);
exports.leeConst=(file,name)=>{const s=fs.readFileSync(file,'utf8');const m=new RegExp('(?<![A-Za-z_])'+name+' ?= ?(?=[[{])').exec(s);if(!m)return null;let i=m.index+m[0].length;let d=0,str=null,e=false;for(let j=i;j<s.length;j++){const c=s[j];if(str){if(e)e=false;else if(c===BS)e=true;else if(c===str)str=null;continue}if(c==='"'||c==="'"||c==='`')str=c;else if(c==='/'&&s[j+1]==='*'){j=s.indexOf('*/',j+2)+1}else if(c==='{'||c==='[')d++;else if(c==='}'||c===']'){if(!--d)return (0,eval)('('+s.slice(i,j+1)+')')}}};
