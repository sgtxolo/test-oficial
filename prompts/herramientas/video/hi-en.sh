# hi.sh vNN : re-OCR de hasta 4 fotogramas por pregunta ampliados x2
v=$1; FF=/c/Users/ruben/AppData/Local/DVDVideoSoft/lib/ffmpeg.exe; rm -rf h/$v; mkdir -p h/$v
sed 's/if (!g) { g = { b, bo: q.op.map(bg), items: \[\] }; groups.push(g); }/&/' parse.js >/dev/null
node -e "const q=require('./q-$v.json');const s=new Set();for(const x of q){const m=x.fs;s.add(m[0]);if(m.length>1)s.add(m[Math.floor(m.length/2)]);if(m.length>3)s.add(m[m.length-2])}console.log([...s].map(n=>String(n).padStart(5,'0')).join(String.fromCharCode(10)))" > h/$v.list
while read n; do n=${n%$'\r'}; "$FF" -nostdin -v error -y -i f/$v/p$n.png -vf "scale=2*iw:2*ih:flags=lanczos,format=gray" h/$v/p$n.png; done < h/$v.list
ls h/$v | wc -l
powershell -ExecutionPolicy Bypass -File "C:/Users/ruben/Desktop/HTML OFICIAL/prompts/herramientas/ocr-windows.ps1" "$(cygpath -w $PWD/h/$v)" "$(cygpath -w $PWD/h-$v.json)" >/dev/null
node -e "const fs=require('fs');const j=JSON.parse(fs.readFileSync('h-$v.json','utf8').replace(/^\uFEFF/,''));for(const k in j)for(const w of [].concat(j[k])){w.x/=2;w.y/=2;w.w/=2;w.h/=2}fs.writeFileSync('h${v}.json',JSON.stringify(j))"
node parse-en.js h$v
