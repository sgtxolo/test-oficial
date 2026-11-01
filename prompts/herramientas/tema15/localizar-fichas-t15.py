# Localiza en el PDF subrayado del usuario (Tema 15) dónde empieza cada ficha del Exprés (expres/t15.js) para montar el Exprés subrayado.
# Para cada ficha busca (por OCR, difuso y siempre hacia delante) su título o, si no tiene, el arranque de su primer párrafo.
# Uso: py prompts/herramientas/tema15/localizar-fichas-t15.py [fx_desde]  -> escribe tema15/fichas-pdf-t15.json [{fx, pag(0-based), y(0..1), score, clave}]
import sys, re, json, difflib, subprocess, unicodedata, pymupdf
PDF = r'C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/TEMA 15 VIOGEN-2026-08-08.pdf'
d = pymupdf.open(PDF)
js = r'''global.window={};require("./expres/t15.js");const h=window.EXPRES_T[15].html;
const parts=h.split(/(<div class="ex-ficha(?: ex-of)?">)/);const o=[];
for(let i=1;i<parts.length;i+=2){const b=parts[i+1]||'';const t=((b.match(/class="ex-fh">([\s\S]*?)<\/div>/)||[])[1]||'').replace(/<[^>]+>/g,'');
const p=((b.match(/<p\b[^>]*>([\s\S]*?)<\/p>/)||[])[1]||'').replace(/<span class="ex-plg"[\s\S]*?<\/span>/g,' ').replace(/<[^>]+>/g,'');o.push([t,p])}
process.stdout.write(JSON.stringify(o))'''
fich = json.loads(subprocess.run(['node', '-e', js], capture_output=True, text=True, encoding='utf-8', cwd='C:/Users/ruben/Desktop/HTML OFICIAL').stdout)
def nz(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9 ]', ' ', s).split()
def clave(t, p):
    t = re.sub(r'\b(EXOF|EX|R\d+)\b|✱', ' ', t).strip()
    if len(nz(t)) >= 3 and not re.match(r'^(Art[íi]culo|ARTÍCULO)\b', t): return t
    p = re.sub(r'^R\d+\s+', '', p.strip()); return p
# páginas (0-based) donde puede estar cada tramo del temario (el PDF mezcla normas en orden)
lineas = {}
def lin(pg):
    if pg in lineas: return lineas[pg]
    P = d[pg]; H = P.rect.height; out = []
    for b in P.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            t = ''.join(s['text'] for s in l['spans']).strip()
            if t: out.append((l['bbox'][1] / H, nz(t)))
    out.sort(); lineas[pg] = out; return out
def mejor(k, pg, ymin=0.0):
    kw = nz(k)[:11]; L = lin(pg); best = (0, None)
    for i in range(len(L)):
        if L[i][0] < ymin: continue
        w = []
        for j in range(i, min(i + 4, len(L))): w += L[j][1]
        w = w[:len(kw) + 2]
        if not w: continue
        r = difflib.SequenceMatcher(None, ' '.join(kw), ' '.join(w)).ratio()
        if r > best[0]: best = (r, L[i][0])
    return best
desde = int(sys.argv[1]) if len(sys.argv) > 1 else 27
INI = {44: 48, 55: 88, 61: 108, 69: 126, 76: 160}   # primera página (0-based) de cada norma: Instr. 1/2025, 5/2021, protocolo pulseras, NTF-2/2025, Instr. 12/2018
res = []; pg = 26; yy = 0.0
for fx in range(desde, len(fich)):
    t, p = fich[fx]
    if re.match(r'^RECUERDA', t) or fx >= 77: break
    k = clave(t, p); cand = []
    if fx in INI: pg, yy = INI[fx], 0.0
    for q in range(pg, min(pg + (22 if fx >= 44 else 9), 164)):
        r, y = mejor(k, q, yy if q == pg else 0.0)
        if y is not None: cand.append((r - 0.012 * (q - pg), q, y))
    r, q, y = max(cand)
    res.append({'fx': fx, 'pag': q, 'y': round(y, 3), 'score': round(r, 2), 'clave': k[:60]})
    if r >= 0.6: pg, yy = q, y + 0.002
json.dump(res, open('C:/Users/ruben/Desktop/HTML OFICIAL/prompts/herramientas/tema15/fichas-pdf-t15.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
for x in res: print(x['fx'], x['pag'] + 1, x['y'], x['score'], x['clave'][:50])
