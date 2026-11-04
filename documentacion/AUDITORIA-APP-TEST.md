# Auditoría de test-oficial-conocimiento.html (04/11/2026)

Probado con Playwright (Chromium) en móvil 390×844 y 360×740, recorriendo las 15 pantallas y los flujos: configurar y hacer un test, sin corrección inmediata, guardar y reanudar (también tras recargar), tarjetas, simulacro, modo oscuro y offline con service worker. Además, análisis estático del código y del banco (6856 oficiales + 8857 IA = 15 713 preguntas).
No se ha cambiado nada en esta auditoría: solo se informa.

## Lo que está bien
- **Sin errores JavaScript** al cargar ni en ningún flujo. Todos los `<script>` pasan la comprobación de sintaxis.
- **Carga rápida**: 0,8 s y 50 MB de memoria, a pesar de los 20,6 MB del HTML (2,9 MB comprimido).
- **Corrección de respuestas fiable**: va por índice y marca bien ✅/❌. El resultado cuadra (2/5 → 40 %) y queda guardado en el historial.
- **Simulacro**: 105 preguntas con el peso oficial por tema (27 temas). La nota descuenta 1/3 por fallo y **no penaliza las preguntas en blanco**.
- **Guardar y reanudar** funciona, también después de recargar la página (vuelve a la misma pregunta con las respuestas dadas).
- **Tarjetas (flashcards)** funcionan: se revela la respuesta y se registra «Lo sabía» o «No lo sabía».
- **Barajado** seguro: no mueve «Todas son correctas» ni «A y B…», y reescribe la letra de la explicación.
- **Las repetidas se descartan** al montar el test, y si hay oficial e IA iguales queda la oficial.
- **Offline**: el service worker se instala, controla la página y la abre sin red con todo el banco. Todos los ficheros locales que usa la app están en `APP_SHELL`.
- **Explicaciones**: el 100 % lleva «Respuesta correcta: X» y la norma en lila. Todas las preguntas IA llevan el literal en rojo.
- **Privacidad de copias**: la exportación y la copia en GitHub quitan la clave de la IA.
- **Móvil**: no hay desplazamiento horizontal de la página. El modo oscuro se ve bien.

## Fallos

### Graves (afectan al uso diario o a los datos)
1. **pdf.js bloquea el arranque con mala cobertura.** En el `<head>` se carga `pdf.min.js` desde cdnjs sin `defer`. Con la red lenta, la app no se abre hasta que el CDN responde: con 8 s de retraso simulado, tardó 8,6 s en arrancar. Sin red ninguna falla rápido, pero con poca cobertura se queda en blanco. Solución: añadir `defer` o cargarlo solo al importar un PDF.
2. **Sin corrección inmediata, las estadísticas guardan la primera respuesta, no la definitiva.** Si marcas B y luego cambias a C (la correcta), el test la cuenta como acierto, pero `qStats` la guarda como **fallada** y la programa para repaso hoy. Esto contamina «Fallos», «Repaso», «Dominio» y la nota estimada. Está en `seleccionar()`: `if(!yaRespondida)actualizarQStats(...)`.
3. **No hay botón para entregar el test.** El test solo se termina respondiendo la última pregunta («Ver resultado») o cuando se acaba el tiempo. En el simulacro no puedes dejar la última en blanco y entregar, y si quieres acabar antes tienes que ir a la última y contestarla.
4. **«Zona de estudio» → «Estudio para hoy»: la columna del círculo para marcar la tarea queda fuera de la pantalla.** La tabla mide unos 590 px y el contenedor la recorta sin desplazamiento, así que en móvil no se puede tocar el círculo y los textos aparecen cortados.

### Medios
5. **«Gestor IA» pinta las 8857 preguntas IA de golpe**: 347 000 nodos y 2,9 s en un ordenador, así que en el móvil puede tardar mucho más o colgarse. Habría que paginar o buscar antes de pintar.
6. **Riesgo de llenar el almacenamiento.** Cada pregunta vista guarda unos 170 caracteres en `qStats`. Con las 15 713 vistas son unos 2,7 MB, más el historial y los tests guardados (que llevan las preguntas completas con su explicación). El límite del navegador ronda los 5 MB, y si se llena `saveState` solo escribe un aviso en la consola: **el progreso deja de guardarse sin que te enteres**. Solución: avisar en pantalla y guardar en los tests pendientes solo los ids.
7. **El cronómetro del simulacro se retrasa con la pantalla bloqueada.** Resta 1 por cada tic de `setInterval`, y el móvil frena esos tics en segundo plano. Debería calcular el tiempo con la hora real (`Date.now()`).
8. **La pantalla de resultado se sale por los lados en 390 px.** Las tarjetas de estadísticas van de borde a borde y la tercera columna («Vs. anterior test») se corta.
9. **«Vs. anterior test» compara con el último test de cualquier tema y tamaño**, así que la flecha ▲/▼ no significa nada.
10. **El simulacro puede salir con menos de 105 preguntas.** El descarte de repetidas se aplica después de elegir, así que si caen dos iguales se pierde una sin reponerla. Lo mismo pasa con «N preguntas» en los demás modos.

### Leves
11. **No se puede ampliar con los dedos**: el viewport lleva `maximum-scale=1, user-scalable=no`, lo que molesta para leer enunciados largos.
12. **El chat del Tutor IA inserta el texto como HTML sin escapar** (mensajes tuyos y de la IA). Basta un `<` en una pregunta para que el texto se rompa.
13. **Claves en `localStorage` en claro**: el token de GitHub y la clave de Gemini. Es aceptable para una app personal, pero cualquiera con acceso al móvil o al navegador las ve.
14. **Código duplicado**: `pintarPregunta`, `seleccionar`, `siguientePregunta`, `finalizarTest`, `cerrarTestConfirm` y `buscarPregunta` están definidas dos veces (vale la última). Las primeras son código muerto que confunde al editar.
15. **El service worker no guarda los iconos de 512 px** (`icon-conocimiento-512.png`, etc.) ni `manifest-ingles.json`. Solo importan al instalar la app sin red.
16. **«de el» en las normas**: 1245 referencias dicen «art. 8.2.a de el Estatuto de Roma» (debería ser «del»). A veces el artículo sale repetido: «Art. 1 · Declaración…, art. 1».
17. **Dependencia de internet**: importar el temario en PDF y la IA (Gemini) no funcionan sin conexión. Es normal, pero la app no lo avisa.

## Calidad del banco frente a las reglas de CLAUDE.md
Las cifras son aproximadas (detección automática) y conviene revisarlas a mano.

| Regla | Oficiales (6856) | IA (8857) |
|---|---|---|
| «Respuesta correcta: X» | ✅ todas | ✅ todas |
| Norma en lila | ✅ todas | ✅ todas |
| Norma sin localizador (sin «Art.», «Punto»…) | ~578 | ~263 |
| Literal en rojo | faltan 293 | ✅ todas |
| Falta la explicación breve (punto 5) | ~1444 | ~1855 |
| La correcta es la opción más larga | — | 166 |
| Número de artículo en el enunciado | — | ~289 (revisar) |
| Pregunta de hueco sin hueco visible | — | ~17 |
| Restos de importación («TEST n»…) | — | 0 |
| Repetidas (mismo enunciado y respuesta) | 211 grupos | 0 |

Temas **sin preguntas IA**: 20, 21, 22, 24, 26 y 27. Con muy pocas: 19 (61), 23 (50) y 25 (50).

## Estado tras las correcciones (CACHE v468)
Corregidos y verificados con Playwright:
- **1** pdf.js ahora carga con `async` (no bloquea): con el CDN a 8 s, la app arranca en 0,85 s.
- **2** si cambias de respuesta sin corrección inmediata, las estadísticas guardan la definitiva (se restaura la foto previa y se recalcula).
- **3** botón «Entregar test» al pie de cada pregunta (pide confirmación y avisa de las que quedan en blanco).
- **4** la tabla de «Estudio para hoy» ya no se recorta en móvil (texto con salto de línea y círculo con más contraste).
- **5** Gestor IA: temas plegados, 50 preguntas cada vez con «Mostrar más» (de 347 000 nodos a 42 al abrir).
- **6** aviso en pantalla cuando el almacenamiento está lleno.
- **7** cronómetro por hora real (no se retrasa con la pantalla bloqueada).
- **8** tarjetas del resultado dentro de los márgenes.
- **9** «Vs. anterior test» compara con el último test del mismo tema.
- **10** simulacro: se descartan las repetidas antes de recortar (siempre 105); igual en el resto de modos.
- **11** se puede ampliar con los dedos.
- **12** el chat del Tutor IA escapa el HTML.
- **14** quitadas las 5 funciones duplicadas (con parser, no a mano).
- **15** iconos de 512 px y `manifest-ingles.json` en la caché del service worker.
- **16** «de el» → «del» y «a el» → «al» en las normas.

No corregidos (decisión o contenido):
- **13** claves en `localStorage`: se queda así (app personal sin servidor; cifrarlas en el propio navegador no aporta seguridad real). Las copias y exportaciones ya las excluyen.
- **Banco** (explicación breve ausente en ~3300 preguntas, 293 literales oficiales, 166 correctas más largas, 6 temas sin IA): requieren el temario/texto legal y redacción verificada pregunta a pregunta (CLAUDE.md: «verificar siempre contra el texto legal»); generarlo sin esa fuente produciría contenido sin verificar. Se hace por tema con el flujo habitual.

## Prioridad recomendada (original)
1. `defer` en pdf.js (una línea, el mayor efecto en móvil).
2. Estadísticas en modo sin corrección inmediata (actualizar `qStats` con la respuesta final).
3. Botón «Entregar test».
4. Tabla de «Estudio para hoy» en móvil.
5. Aviso de almacenamiento lleno y tests guardados más ligeros.
6. Cronómetro con hora real y paginación del Gestor IA.
