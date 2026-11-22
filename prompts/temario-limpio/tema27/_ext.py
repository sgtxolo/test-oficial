import pymupdf,sys
base=r'C:/Users/ruben/Desktop/OFICIAL 2026-27/'
def dump(pdf,out):
    d=pymupdf.open(pdf); s=''
    for i in range(len(d)):
        s+='=====PAG %d =====\n%s\n\n'%(i+1,d[i].get_text())
    open(out,'w',encoding='utf8').write(s)
T=r'C:/Users/ruben/Desktop/HTML OFICIAL/prompts/temario-limpio/tema27/'
dump(base+'ACTUALIZACIONES/TEMARIO COMPLETO PDF 2026/TEMA 27 - Deontologia Profesional (Extracto oficial).pdf',T+'oficial.txt')
dump(base+'TEMARIO ESCANEADO 2026-27/TEMA 27 DEONTOLOGIA PROFESIONAL-2026-08-08.pdf',T+'mio-ocr.txt')
