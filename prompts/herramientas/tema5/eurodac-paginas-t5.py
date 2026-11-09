# Averigua qué artículos del Eurodac 2024/1358 hay en cada página de «TEMA 5- BASE DE DATOS PARTE 2.pdf» (págs. 98-149) leyendo las cabeceras «ARTÍCULO N» de la capa de texto (OCR).
# Las referencias cruzadas («artículo 20, apartado 1…») se filtran quedándose con la subsucesión creciente más larga de cabeceras.
# Salida: expres-subrayado/t5-eurodac-paginas.json  {"98":[1],"99":[2,3],…}  (la usa marcas-subrayado-t5.js para poner las marcas a las páginas de Eurodac)
import pymupdf, re, json
B = 'C:/Users/ruben/Desktop/HTML OFICIAL/'
d = pymupdf.open('C:/Users/ruben/Desktop/OFICIAL 2026-27/TEMARIO ESCANEADO 2026-27/TEMA 5- BASE DE DATOS PARTE 2.pdf')
pgs = list(range(98, 107)) + list(range(108, 143)) + list(range(146, 150))
cab = []   # (página, artículo)
for p in pgs:
    for l in d[p - 1].get_text().split('\n'):
        m = re.match(r'^\s*ART.{0,6}CULO\s*(\d{1,3})\s*[\.\-]?\s*(.*)$', l, re.I)
        if m and not re.match(r'^\s*,', m.group(2)) and not re.match(r'^(?:apartado|del|de|y|o)\b', m.group(2).strip(), re.I):
            cab.append((p, int(m.group(1))))
# Las páginas del PDF NO están siempre en el orden del libro (p. ej. la pág. 103 = impresa 220 va antes que la 104 = impresa 219), así que no se exige orden creciente:
# artículos de una página = sus cabeceras + el artículo anterior a la primera (que empieza en la página previa del libro). Sin cabeceras: el último artículo visto.
res = {}; ult = None
for p in range(98, 150):
    if p in (107, 143, 144, 145): continue   # páginas que no están entre las piezas
    hs = [a for q, a in cab if q == p]
    arts = list(hs)
    if hs:
        if hs[0] > 1: arts.append(hs[0] - 1)
        ult = hs[-1]
    elif ult is not None: arts.append(ult)
    res[str(p)] = sorted(set(arts))
res["103"] = sorted(set(res["103"] + [9]))   # la cabecera del art. 9 sale rota en el OCR; se ve en la imagen (pág. impresa 220: arts. 7, 8 y 9)
json.dump(res, open(B + 'expres-subrayado/t5-eurodac-paginas.json', 'w'), ensure_ascii=False)
print(len(cab), 'cabeceras'); print(json.dumps(res))
