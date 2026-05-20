@echo off
cd /d "%~dp0"
echo Installation des dependances...
call npm install
echo.
echo Lancement du serveur de developpement...
echo Le site sera disponible sur http://localhost:3000
echo.
call npm run dev
pause
