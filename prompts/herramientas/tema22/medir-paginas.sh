#!/bin/sh
# Uso: sh prompts/herramientas/tema22/medir-paginas.sh <presupuesto>  -> páginas del RESUMEN (sin R ni rápidas) con Chrome headless
cd "C:/Users/ruben/Desktop/HTML OFICIAL"
SIN_EXTRA=1 node prompts/herramientas/repaso-hibrido.js 22 "$1" 0 | tail -1
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="C:/Users/ruben/AppData/Local/Temp/rep22.pdf" "file:///C:/Users/ruben/Desktop/HTML%20OFICIAL/repaso-t22-borrador.html" >/dev/null 2>&1
grep -a -c "/Type /Page$\|/Type /Page[^s]" "C:/Users/ruben/AppData/Local/Temp/rep22.pdf"
