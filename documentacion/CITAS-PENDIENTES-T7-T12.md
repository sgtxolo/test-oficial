# Citas pendientes T7–T12

Revisión de las explicaciones (lila: localizador + norma; rojo: literal del temario oficial) de T7–T12.
Hecho: `esquemas-datos/citas-manual-t7.js … t12.js` (generados con `prompts/herramientas/citas-extraer.js`, que copia el literal del texto de `prompts/temario-limpio/` y falla si no lo encuentra). T7: 6, T8: 14, T9: 119, T10: 12 (ya existía, solo se enlaza), T11: 66, T12: 9. No se ha borrado ni cambiado la respuesta de ninguna pregunta.

## Corregidos en sitio (localizador equivocado en la explicación)
| id | antes | después |
|---|---|---|
| 8-81 | Art. 56.1 | Art. 59 (Sala de lo Social del TS) |
| 8-233 | Art. 384.2 | Art. 383.4.º (suspensión por sentencia firme «cuando no procediere la separación») |
| 9-124 | Art. 21.2 | Art. 25 (Guardia Civil coordinada por el Consejo de Defensa Nacional) |
| 9-155 | Art. 6 (y «artículo 7») | Art. 5 (y art. 6.a) |
| 9-196 | Art. 11.2 | Art. 13.1 |
| 9-209 | Art. 15.1 | Art. 11.1 |
| 9-277 | Art. 16.1 | Art. 20.1 |
| 11-158 | Art. 3.1 | Art. 3.3 (L 40/2015) |
| 11-170 | Art. 34.1 | Art. 39.1 (L 39/2015) |

## Sin cita: el literal contradice la respuesta marcada (no se ha cambiado nada)
- **9-60** (LO 5/2005): marcada B «El Ministro de Defensa». El Art. 24 dice «El Gobierno, mediante Real Decreto, regulará las misiones de carácter militar… aplicando las condiciones y el régimen de **consulta** previsto en esta Ley a las misiones que se realicen en el exterior». El enunciado habla de «régimen de personal» y la respuesta natural sería C «El Gobierno».
- **9-150** (LO 5/2005): marcada B «El Jefe del Estado Mayor de la Defensa». El Art. 13.2 dice que los Jefes de Estado Mayor de cada Ejército ejercen el mando «bajo la autoridad del **Ministro de Defensa**»; ninguna opción lo recoge (sería D «Ninguna es correcta»).
- **9-129** (Directiva 2020, directrices): marcada D «Todas son correctas». La opción A dice «preparación del **uso** de las Fuerzas Armadas», pero el punto 4 dice «preparación del **personal** de las Fuerzas Armadas»; B y C sí son literales.
- **9-59** (aviso, sí citada): marcada C «El Ministerio de Asuntos Exteriores…», pero el punto 13 atribuye la promoción a **ambos** ministerios (Exteriores y Defensa); C es la única aceptable pero incompleta.

## Sin cita: no está en el texto disponible en el repositorio
- **8-151, 8-152** (composición y mandato de los Vocales del CGPJ, Arts. 566 y 568 LOPJ): el extracto `tema8/lopj.txt` no incluye el Libro II. Habría que confirmar con el temario oficial/escaneado que están en el programa y copiar el literal.
- **8-191** (juramento o promesa de Jueces y Magistrados «ante la Sala de Gobierno»): el extracto no incluye el artículo (Libro IV, tít. I). Mismo trámite.
- **9-18** (definición de Defensa Nacional «acción del Estado dirigida a proteger la integridad territorial de España y sus intereses» + «a y b»): no aparece en la LO 5/2005 (el Art. 2 es la finalidad de la política de defensa) ni en la Directiva 2020.
- **9-84** («seguridad marítima en el Golfo de Guinea» en la dimensión naval y marítima): no está en `tema9/ddn2020.txt` (puede faltar texto de la Directiva en el extracto; revisar contra el PDF).

## Colas con título de sección (resuelto)
Se sustituyó en T8 (130), T9 (154), T10 (205) y T11 (3) la cola «· De la Política de Defensa» etc. por el nombre de la norma (LOPJ, LO 5/2005, Directiva 2020, Código Civil, Ley 39/2015 o 40/2015). En las de la Directiva se puso también el localizador de `citas-manual-t9.js`.
