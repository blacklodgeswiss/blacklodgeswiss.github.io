@echo off
REM Website Status Checker für blacklodge.ch (Windows Version)
REM Überprüft ob die Website öffentlich erreichbar ist

echo ==================================
echo Blacklodge Website Status Checker
echo ==================================
echo.

REM Test 1: Hauptdomain
echo Test 1: Hauptdomain (blacklodge.ch)
echo ------------------------------------
curl -I -s -o nul -w "%%{http_code}" https://blacklodge.ch > temp_status.txt 2>nul
set /p STATUS=<temp_status.txt
if "%STATUS%"=="200" (
    echo [OK] blacklodge.ch ist erreichbar
) else (
    echo [FEHLER] blacklodge.ch ist NICHT erreichbar
    echo    Moegliche Ursachen:
    echo    - Repository ist auf 'Private' gestellt
    echo    - GitHub Pages ist nicht aktiviert
    echo    - DNS noch nicht propagiert
)
del temp_status.txt 2>nul
echo.

REM Test 2: WWW Subdomain
echo Test 2: WWW Subdomain (www.blacklodge.ch)
echo ------------------------------------
curl -I -s -o nul -w "%%{http_code}" https://www.blacklodge.ch > temp_status.txt 2>nul
set /p STATUS=<temp_status.txt
if "%STATUS%"=="200" (
    echo [OK] www.blacklodge.ch ist erreichbar
) else (
    echo [WARNUNG] www.blacklodge.ch ist nicht erreichbar
    echo    (Dies ist optional, aber empfohlen^)
)
del temp_status.txt 2>nul
echo.

REM Test 3: GitHub Pages URL
echo Test 3: GitHub Pages URL
echo ------------------------------------
curl -I -s -o nul -w "%%{http_code}" https://blacklodgeswiss.github.io > temp_status.txt 2>nul
set /p STATUS=<temp_status.txt
if "%STATUS%"=="200" (
    echo [OK] GitHub Pages URL ist erreichbar
) else (
    echo [FEHLER] GitHub Pages URL ist NICHT erreichbar
    echo    KRITISCH: Repository muss auf 'Public' stehen!
)
del temp_status.txt 2>nul
echo.

REM Test 4: DNS Auflösung
echo Test 4: DNS Aufloesung
echo ------------------------------------
echo DNS Eintraege fuer blacklodge.ch:
nslookup blacklodge.ch 2>nul | findstr /C:"Name" /C:"Address"
echo.

REM Test 5: SSL Zertifikat
echo Test 5: SSL Zertifikat
echo ------------------------------------
curl -I -s https://blacklodge.ch 2>nul | findstr /C:"HTTP/2 200" /C:"HTTP/1.1 200" >nul
if %errorlevel%==0 (
    echo [OK] HTTPS funktioniert korrekt
) else (
    echo [WARNUNG] HTTPS koennte Probleme haben
)
echo.

REM Zusammenfassung
echo ==================================
echo Zusammenfassung
echo ==================================
echo.

curl -I -s -o nul -w "%%{http_code}" https://blacklodge.ch > temp_status.txt 2>nul
set /p STATUS=<temp_status.txt

if "%STATUS%"=="200" (
    echo [OK] Website ist OEFFENTLICH erreichbar!
    echo.
    echo Ihre Website funktioniert korrekt.
    echo Falls Sie sie von Ihrem Computer nicht sehen koennen:
    echo   1. Browser-Cache leeren (Ctrl+Shift+Delete^)
    echo   2. DNS-Cache leeren: 'ipconfig /flushdns'
    echo   3. Testen Sie mit mobilen Daten (Handy ohne WLAN^)
) else (
    echo [FEHLER] Website ist NICHT oeffentlich erreichbar!
    echo.
    echo WICHTIGE SCHRITTE:
    echo   1. Ueberpruefen Sie die Repository-Sichtbarkeit:
    echo      https://github.com/blacklodgeswiss/blacklodgeswiss.github.io/settings
    echo      - Repository MUSS auf 'Public' stehen!
    echo.
    echo   2. Ueberpruefen Sie GitHub Pages Einstellungen:
    echo      Settings - Pages - Source = 'GitHub Actions'
    echo.
    echo   3. Lesen Sie die Troubleshooting-Anleitung:
    echo      documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md
)

del temp_status.txt 2>nul
echo.
echo ==================================
echo.
pause
