const fs = require('fs'); const f = __dirname + '/datos-subrayado-t5.js'; let s = fs.readFileSync(f, 'utf8');
if (s.includes('piezas-eur.json')) { console.log('ya parcheado'); process.exit(0); }
const r = (a, b) => { if (!s.includes(a)) throw new Error('falta: ' + a.slice(0, 40)); s = s.replace(a, () => b); };
r("const piezas = JSON.parse(fs.readFileSync(path.join(ROOT, 'expres-subrayado', 'img', 't5', 'piezas.json'), 'utf8'));",
  "const piezas = JSON.parse(fs.readFileSync(path.join(ROOT, 'expres-subrayado', 'img', 't5', 'piezas.json'), 'utf8'));\nconst eur = JSON.parse(fs.readFileSync(path.join(ROOT, 'expres-subrayado', 'img', 't5', 'piezas-eur.json'), 'utf8'));   // Eurodac 2024/1358: páginas subrayadas del PDF PARTE 2");
r("const NOM = {", "const NOM = { eur: 'Eurodac · Rgto. 2024/1358',");
r("img: p.id + '.jpg', wh: p.wh, m: {} })),", "img: p.id + '.jpg', wh: p.wh, m: {} })).concat(eur.map(p => ({ id: p.id, nombre: NOM.eur + ' · pág. ' + p.pag + ' de la parte 2 de tu PDF (subrayada)', img: p.id + '.jpg', wh: p.wh, m: {} }))),");
r("cit: [", "cit: [{ p: 'e', nombre: 'Eurodac', re: '2024/1358|Eurodac|EURODAC', pre: null, pre_re: null, proto: 0 }, ");
r("fs.writeFileSync(path.join(ROOT, 'expres-subrayado', 'datos-t5.js')", "eur.forEach(p => p.qs.forEach(id => { preg[id] = p.id; })); D.cob.e = Object.keys(preg).length; D.cob.q = tot + eur.reduce((a, p) => a + p.qs.length, 0);\nfs.writeFileSync(path.join(ROOT, 'expres-subrayado', 'datos-t5.js')");
fs.writeFileSync(f, s); console.log('parcheado');
