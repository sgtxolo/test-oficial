// Aplica el formato "aireado" (tarjeta por artículo, más interlineado, marcas contiguas unidas) a un repaso ya montado.
// Uso: node prompts/herramientas/repaso-formato-aireado.js repaso-t2-borrador.html
const fs = require('fs'), crypto = require('crypto');
const f = process.argv[2]; let s = fs.readFileSync(f, 'utf8');
const CSS = '/*aireado*/.art{margin:0 0 20px;padding:10px 14px 8px;border:1px solid var(--linea);border-left:4px solid var(--linea);border-radius:10px;background:rgba(127,127,127,.05)}.art.of{border-left-color:var(--of)}'
  + '.art p{margin:0 0 14px;line-height:1.8}.art h3{margin:0 0 10px;font-size:1.08em}.art p:last-child{margin-bottom:2px}.art li{margin:0 0 6px;line-height:1.7}h2{margin:32px 0 14px}.vis-wrap{margin:14px 0 20px}'
  + '@media print{.art{margin:0 0 9px;padding:5px 9px}.art p{margin:0 0 5px;line-height:1.45}.art li{margin:0 0 3px;line-height:1.4}h2{margin:12px 0 7px}}';
if (!s.includes('/*aireado*/')) s = s.replace('</style>', CSS + '</style>');
const i = s.indexOf('<div id="rc"'); let head = s.slice(0, i), rc = s.slice(i);
for (let k = 0; k < 4; k++) rc = rc.replace(/<mark class="([a-z]+)">([^<]*)<\/mark>(\s*)<mark class="\1">/g, '<mark class="$1">$2$3');
const ver = crypto.createHash('md5').update(rc.slice(0, rc.indexOf('<p class="pie">'))).digest('hex').slice(0, 8);
rc = rc.replace(/data-ver="[0-9a-f]+"/, 'data-ver="' + ver + '"');
fs.writeFileSync(f, head + rc); console.log('ok', f, ver);
