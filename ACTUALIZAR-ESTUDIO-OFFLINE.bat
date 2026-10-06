@echo off
rem Actualiza la carpeta ESTUDIO-OFFLINE con la ultima version de los esquemas y los tests.
cd /d "%~dp0"
if not exist ESTUDIO-OFFLINE mkdir ESTUDIO-OFFLINE
copy /Y esquemas.html ESTUDIO-OFFLINE\ >nul
copy /Y test-oficial-conocimiento.html ESTUDIO-OFFLINE\ >nul
copy /Y test-oficial-ingles.html ESTUDIO-OFFLINE\ >nul
echo Carpeta ESTUDIO-OFFLINE actualizada. Copiala al pen.
pause

