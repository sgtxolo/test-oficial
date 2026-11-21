// Quita del subrayado.json las páginas antiguas/duplicadas de las Resoluciones (MOD/X o con la versión NUEVA clónica) -> subrayado-filtrado.json
const fs = require('fs'), path = require('path');
const dir = process.argv[2] || 'prompts/temario-limpio/tema26';
const EXCL = new Set([172, 173, 186, 187, 189, 190]);
const d = JSON.parse(fs.readFileSync(path.join(dir, 'subrayado.json'), 'utf8')).map(p => EXCL.has(p.pagina) ? { ...p, palabras: [] } : p);
fs.writeFileSync(path.join(dir, 'subrayado-filtrado.json'), JSON.stringify(d));
