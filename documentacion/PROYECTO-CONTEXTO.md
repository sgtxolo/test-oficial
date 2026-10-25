# CONTEXTO — Estudio Oposición Oficial Guardia Civil

Preparo la oposición a Oficial de la Guardia Civil (Materias Profesionales, temas 1-27). Tengo 3 apps HTML de una sola página (sin build, PWA offline) en `Escritorio\HTML OFICIAL`, repo GitHub `sgtxolo/test-oficial` (rama main). Están vinculadas: comparten service worker, manifests, iconos, fuentes y scripts.

## Apps
1. **esquemas.html**: esquemas de repaso por tema, estilo "Método Prefortia" (artículos literales con subrayado denso por colores, sellos EX/EXOF, cajas "Trampa", bloque "Recuerda" R1…Rn, modo Exprés, modo coche, PDF con huecos (…)). Cada tema se monta bajo demanda; Exprés en `expres/tN.js`.
2. **test-oficial-conocimiento.html**: test de conocimientos por tema con preguntas OFICIALES de examen y preguntas IA.
3. **test-oficial-ingles.html**: test de inglés, objetivo 200 preguntas por tema.

## Relación entre ellas
Las marcas de los esquemas (EX, EXOF, ✱, R) salen de las preguntas del test; los esquemas se construyen desde las preguntas.

## Fuentes y estado
- Temario autorizado: PDF escaneado de 08-08-2026 (texto OCR). Los PDF limpios pueden estar desfasados.
- Tengo T1 y T2 como modelo de tema terminado; el resto se lleva igual, un tema cada vez.
- Estado detallado: `documentacion/HANDOFF.md`, `PENDIENTE-*.md`, y la memoria de Claude.
- Prompts en `prompts/` (esquemas, esquema desde preguntas, fotos del temario, examinador, preguntas IA); scripts en `prompts/herramientas/`.
