# Esquemas: lo que pediste, lo que está hecho y lo que falta (22/10/2026)

> **Estado:** los cambios están en `esquemas.html` del Escritorio, **sin probar en el navegador y sin commit ni push**.
> El archivo está a medias en la parte de la sincronización (ver «Ojo» al final).

## 1. Lo que pediste

1. **Doble carga** al abrir (sale una versión antigua y luego la buena); se nota mucho en el móvil y en la tablet.
2. **«💡 Recordatorio / trampas» del Exprés**: ahora no sirve. Quieres lo importante de cada artículo de un vistazo: plazos, autoridades, colores, cuadros o esquema.
3. **Sincronización Exprés ↔ temario**: ahora se hace con cada subrayado, va lenta y salen avisos («copiado» / «no se pudo copiar»). Quieres que se haga **solo con un botón «Sincronizar» o cada 10 minutos**.
4. **Un solo subrayado**: lo que subrayas en el Exprés debe pasar al temario **sustituyendo** el subrayado o la marca que haya debajo, no ponerse encima.
5. **Botones de ida y vuelta**: desde «📖 Art. completo» poder **volver al Exprés donde estabas**, y al revés (del temario al Exprés).
6. **Cuadrado que salta de línea**: si va del final de una línea al principio de la siguiente, sale un cuadro enorme que coge todo el párrafo.
7. **Cuadrados descolocados** al recargar y al imprimir o descargar el PDF.
8. **Móvil**: se corta la parte izquierda del esquema.
9. **Fuente**: los cuadros/esquemas no usan la misma letra que el resto. Quieres una sola fuente.
10. **RECUERDA con preguntas rápidas** al final del Exprés: 2 o 3 pregunta → respuesta por artículo, en **todos los temas y todos los artículos**.
11. **RECUERDA resumen** (como el del tema 12, con Composición, Presidente, Plazos…) **en todos los temas**.
12. **Repaso**: siempre a los **20 días**, no 7/15/30/45.
13. **Botón «añadir al Exprés»** desde el temario entero, para meter un apartado que falta (ejemplo: art. 29.2, que es R10).

## 2. Lo que está hecho (sin probar)

| # | Qué | Cómo |
|---|-----|------|
| 12 | Repaso a 20 días | Intervalos de repaso = 20 días en la campana 🔔 y en el Panel → Temas; textos actualizados. |
| 6 | Cuadrado/círculo por líneas | Si la selección salta de línea, se dibuja **un cuadro por cada línea**. Vale para la herramienta ▭A/◯A y para el menú «Cambiar este subrayado». |
| 7 (causa) | Marcas corridas | **Causa encontrada:** los botones (📍, «sin marcar / dominada», «💡 Recordatorio») contaban como texto. Al cambiar su rótulo, todas las marcas de detrás se corrían unas letras: salían cosas como «in iciativas» o «Mini sterio», y los cuadros se movían. **Arreglo:** los botones ya no cuentan. Además, un paso único por tema (`script-migra-ui`) recoloca tus marcas antiguas: las deja donde se veían o, si estaban partidas a media palabra, donde encajan con palabras enteras. |
| 4 | Un solo subrayado | Al subrayar (o al copiar entre Exprés y temario) se **quita el subrayado que haya debajo**; si sobresale por un lado, ese trozo se conserva con su color. Lo mismo con resaltar, subrayar y tachar del lápiz. «↶ Deshacer» lo devuelve todo. |
| 3 (parte) | Copia Exprés ↔ temario | Ya **no se copia al momento**: los cambios quedan en una **cola** y se aplican al pulsar **☁ Sincronizar**. El botón muestra cuántos cambios hay pendientes y al final avisa de cuántos se copiaron y cuántos no se encontraron. Clic derecho o pulsación larga en ☁ abre lo del repositorio y el token. |
| 13 (base) | Apartados añadidos al Exprés | Las marcas y el subrayado ya admiten apartados añadidos (`.ex-add`) con sus propias marcas, sin mover las del Exprés. **Falta el botón** (ver abajo). |

## 3. Lo que queda pendiente

1. **Doble carga (punto 1).** Causa encontrada: al abrir, la sincronización con GitHub baja cambios del otro dispositivo y **recarga la página entera** (`location.reload()` en `script-sync-marcas`). Pasa casi siempre, porque «por dónde ibas» cambia a cada rato. Falta:
   - aplicar lo que llega sin recargar: avisar a los scripts (evento `esq-remoto`, que ya escuchan marcas y subrayado) y volver a pintar solo el tema afectado;
   - que el resto de scripts que guardan datos en memoria (fichas dominadas, sellos) también relean.
2. **Sincronizar cada 10 min y al salir de la app** (punto 3): falta el temporizador de 10 minutos y sincronizar al ocultar la app. Ahora mismo **la copia Exprés ↔ temario solo se hace con el botón ☁**. La sincronización con GitHub sigue saltando a los 4 s de cada cambio: hay que pasarla a 10 min.
3. **Recordatorio / trampas nuevo** (punto 2): cambiar el texto automático por un mini-esquema de cada apartado, con fichas de colores: 👤 Quién (autoridades), ⚙ Qué hace, ⏱ Plazos/cifras/mayorías, 🎯 Respuesta de examen y ⚠ Ojo (salvo, en ningún caso, no podrá…). Sacarlo fuera de la ficha y que se vea sin pulsar (con opción de ocultarlo).
4. **RECUERDA preguntas rápidas** (punto 10): al final de cada Exprés, de 2 a 3 «pregunta → respuesta» por artículo. Se sacan de tus respuestas de test (marcas rojas), primero las oficiales; si un artículo no tiene, salen de los plazos y las autoridades. Respuesta tapada hasta tocarla y botón «mostrar todas». Todos los temas.
5. **RECUERDA resumen en todos los temas** (punto 11): copiar al final del Exprés el RECUERDA del temario entero de cada tema. En los temas que no lo tengan con el formato del T12, hay que hacerlo.
6. **Botones ida y vuelta** (punto 5): un botón flotante «⚡ Volver al Exprés» tras pulsar «📖 Art. completo», que te devuelva a la misma ficha; y un botón «⚡ Exprés» en cada artículo del temario entero.
7. **Botón «⚡+ Añadir al Exprés»** (punto 13): en cada apartado del temario entero que **no** esté en el Exprés. Debe meterlo en la ficha de su artículo (o crear la ficha), guardarlo y sincronizarlo entre dispositivos (clave `esquemas-expres-add-v1`). «⚡✓» para quitarlo.
8. **PDF** (punto 7): que también recoloque los cuadros del Exprés en la copia para imprimir (ahora solo lo hace con los del temario entero).
9. **Fuente única** (punto 9): añadir cuadros (`.vis`), RECUERDA, trampas y recordatorios a la regla de la fuente «Fira Sans Condensed», en pantalla y en el PDF.
10. **Móvil cortado** (punto 8): revisarlo en el navegador a ancho de móvil. En tu foto parece que los botones flotantes (🔴 y 🙈) tapan el texto de la izquierda. Posible arreglo: hacerlos más pequeños o semitransparentes y dejar margen.
11. **Probar todo** en el navegador (temas 12 y 2, Exprés y temario, subrayar, deshacer, sincronizar, PDF y móvil). Luego **commit + push** y subir la versión del service worker.

## Ojo: estado del código ahora mismo

- En `script-sync-marcas` ya está añadido el botón ☁ «Sincronizar» (`sincronizarTodo`, `syncPendiente`) y el campo de los apartados añadidos (`e`) al leer los datos. Pero **no** está hecho lo de no recargar (paró el cambio) ni el envío del campo `e` a GitHub.
- Como la copia Exprés ↔ temario ya no es automática, **si no pulsas ☁ los cambios no pasan de uno a otro** hasta terminar el punto 2 de pendientes.
- Nada está publicado: en el móvil sigue la versión anterior.
