#!/bin/sh
# Reconstruye el esquema del Tema 16 en esquemas.html (literal + marcas + colores reales de tu PDF). Orden obligatorio:
# 1) esquema literal  2) colores LO (págs. 5-20, capa de texto) + RD (págs. 23-34, OCR de Windows)  3) Método Prefortia solo donde tu PDF no trae el texto  4) unir marcas contiguas
# Requisitos: sub16.json (py subrayado-pdf.py … 5 20) y sub16rd.json (ocr-windows.ps1 + subrayado-pdf-ocr.py … 23 34) ya combinados en $1 (sub16all.json)
set -e
node prompts/herramientas/tema16/esquema-t16.js
node prompts/herramientas/aplicar-subrayado-pdf.js "$1" esquemas.html "/* T16_BEGIN */" "/* T16_END */" "T16_LO:5-20,T16_RDA:23-23,T16_RDB:23-24,T16_RDC:24-25,T16_RDD:25-25,T16_RDE:26-26,T16_RDF:27-27,T16_RDG:28-28,T16_RDH:29-30,T16_RDI:31-31,T16_RDJ:32-32,T16_RDK:33-34"
node prompts/herramientas/tema16/densificar-t16.js T16_RDP T16_RDA T16_RDD T16_RDL
node prompts/herramientas/unir-subrayados.js
node prompts/herramientas/tema16/visuales-t16.js
