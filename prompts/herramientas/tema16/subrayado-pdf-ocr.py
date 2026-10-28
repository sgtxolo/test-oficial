# Igual que subrayado-pdf.py, pero las palabras salen del OCR de Windows (ocr-windows.ps1) en vez de la capa de texto del PDF:
# útil cuando el PDF escaneado trae recortes pegados cuyo OCR interno es pobre (Tema 16, págs. 23-34).
# Uso: py -I subrayado-pdf-ocr.py <pdf> <carpeta con pNN.json (OCR a 200 ppp)> <salida.json> <pag_ini> <pag_fin>   (páginas de 1 a N)
import sys, json, os
pdf, carpeta, out, a, b = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
S = 200 / 72
ocrw = {}
for pn in range(a - 1, b):
    f = os.path.join(carpeta, 'p%02d.json' % (pn + 1))
    ws = json.load(open(f, encoding='utf-8-sig')) if os.path.exists(f) else []
    ocrw[pn] = [(x / S, y / S, (x + w) / S, (y + h) / S, t) for t, x, y, w, h in ws]
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'subrayado-pdf.py'), encoding='utf8').read()
src = src.replace("for w in p.get_text('words'):", "for w in OCRW.get(pn, []):")
ns = {'__name__': 'subrayado_ocr', 'OCRW': ocrw}
exec(compile(src, 'subrayado-pdf.py', 'exec'), ns)
ns['procesa'](pdf, out, a - 1, b)
