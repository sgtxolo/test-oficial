# Citas T1–T6: auditoría y pendientes (04/11/2026)

Auditoría hecha ejecutando `normalizarExplicacion` + `CITAS_PREG` sobre las 2.043 preguntas de T1–T6 (lo que ve el alumno), no solo el `ref-norma` en bruto (`comprobar-citas.js` da 0 en T1–T6 salvo T4, que completa `citas-manual-t4.js` en tiempo de ejecución).

## Hecho
- **16 explicaciones reescritas en sitio** (solo su explicación, sin tocar enunciado, opciones ni respuesta) con lila exacto + literal del temario + explicación breve: 1-252, 4-26, 4-47, 4-52, 4-135, 4-168, 4-194, 4-197, 4-208, 4-212, 4-227, 4-228, 4-233, 5-192, 5-193, 5-231.
- **Formato del lila** (`normalizarExplicacion`): ~160 citas que ya llevaban artículo pero salían como «art. 15 bis.2 de el Estatuto…», «art. 15.5 (R21) del…», «anexo IV, 4 de la Código…» o «disposición adicional cuarta de la Ley…» pasan a «Art. 15 bis.2 · Estatuto de Roma…», «Anexo IV, 4 · Código de fronteras Schengen», etc. Se quitan los «(R21)». Comprobado que ninguna cita que ya estaba bien cambia (T1 25, T2 8, T3 4, T4 ~48, T5 ~28, T6 ~63 afectadas).
- Tras esto, solo quedan con lila sin artículo exacto las de abajo.

## Pendientes (no se cambia la respuesta sin evidencia)
| Id | Situación |
|---|---|
| **4-218** | «Reintroducción de los controles… se aplicarán al ___ las siguientes normas» (marcada D: ciudadanos de la Unión y familiares con libre circulación). En el temario, el art. 32 del Reglamento (UE) 2016/399 solo dice que se aplican *mutatis mutandis* las disposiciones del título II; no se encuentra el literal de la respuesta. Queda con lila de norma sin artículo. Revisar contra el texto del Código (versión consolidada). |
| **5-193** | Enunciado «visados caducados y revocados… Todas son correctas». En el temario el art. 18 (frontera) solo autoriza comprobar identidad, autenticidad y condiciones de entrada; «identificar a la persona» es el art. 20. Se cita el art. 18.1, pero la respuesta D no se puede comprobar al 100 %. |
| **5-192 / 5-231** | Duplicadas (mismo enunciado y respuesta). El art. 15.1 VIS dice que se consulta «a efectos de examinar las solicitudes»; el «momento de la presentación» es la lectura más cercana. Si se quiere limpiar, borrar 5-231 (la app ya descarta repetidas). |
| **4-47** | La respuesta D (dos años) sale de sumar 6 meses + 3 prórrogas de 6 (art. 29.1); la opción B (seis meses) es el período inicial. Pregunta ambigua; se deja D. |
| **4-227, 4-228, 4-233** | Importadas con la cabecera «Reglamento (UE) 2019/1896 – T15», pero el texto es del **Tratado de Prüm** (arts. 26.3, 32 y 22). Se citó Prüm. Pendiente decidir si se corrige la cabecera del enunciado. |
| **4-194 / 4-208, 4-197 / 4-212** | Pares repetidos (sin y con prefijo «(Reglamento (UE) 2016/399)»). 4-194/208: la condición está igual en los arts. 8 bis.1.a) y 8 ter.1.a); se cita el 8 bis. |
| **4-211, 4-230, 2-163** | Citadas por «Declaración conjunta III» / «Cláusula final» (no tienen número de artículo); correcto. |

No se ha borrado ninguna pregunta oficial. No se ha revisado literal por literal el resto de preguntas que ya traían artículo y literal (1.800 aprox.); esta pasada cubre las que no tenían localizador exacto o literal.
