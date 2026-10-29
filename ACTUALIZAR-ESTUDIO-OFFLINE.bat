@echo off
rem Actualiza la carpeta ESTUDIO-OFFLINE con la ultima version de los esquemas, los tests y el Exprés subrayado.
cd /d "%~dp0"
if not exist ESTUDIO-OFFLINE mkdir ESTUDIO-OFFLINE
copy /Y esquemas.html ESTUDIO-OFFLINE\ >nul
copy /Y test-oficial-conocimiento.html ESTUDIO-OFFLINE\ >nul
copy /Y test-oficial-ingles.html ESTUDIO-OFFLINE\ >nul
rem Exprés subrayado: la pagina, sus capturas/datos/cuadros y los Exprés de Esquemas (expres\tN.js) que usa para imprimir
copy /Y expres-subrayado.html ESTUDIO-OFFLINE\ >nul
xcopy /E /I /Y /Q expres-subrayado ESTUDIO-OFFLINE\expres-subrayado >nul
if not exist ESTUDIO-OFFLINE\expres mkdir ESTUDIO-OFFLINE\expres
copy /Y expres\t*.js ESTUDIO-OFFLINE\expres\ >nul
echo Carpeta ESTUDIO-OFFLINE actualizada (esquemas, tests y Expres subrayado). Copiala al pen.
pause
