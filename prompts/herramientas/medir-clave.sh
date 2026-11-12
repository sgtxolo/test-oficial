#!/bin/bash
# Uso: bash prompts/herramientas/medir-clave.sh N PRESUPUESTO [pesoCuadro]
# Genera el resumen (sin R ni rápidas) y mide las páginas con Chrome headless.
cd "C:/Users/ruben/Desktop/HTML OFICIAL"
N=$1; P=${2:-17000}; V=${3:-1500}
SIN_EXTRA=1 node prompts/herramientas/repaso-hibrido.js $N $P $V | tail -1
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="C:/Users/ruben/Desktop/HTML OFICIAL/_m$N.pdf" "file:///C:/Users/ruben/Desktop/HTML OFICIAL/repaso-t$N-borrador.html" >/dev/null 2>&1
echo "T$N presupuesto $P -> págs: $(py -I -c "import pymupdf;print(len(pymupdf.open(r'_m$N.pdf')))")"
