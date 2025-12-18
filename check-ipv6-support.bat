@echo off
REM Blacklodge IPv6 Support Checker
REM Überprüft, ob die Domain IPv6 unterstützt (wichtig für mobile Netzwerke)

echo ==========================================
echo Blacklodge IPv6 Support Checker
echo ==========================================
echo.

set DOMAIN=blacklodge.ch
set GITHUB_PAGES=blacklodgeswiss.github.io

echo 🔍 Überprüfe DNS-Konfiguration für: %DOMAIN%
echo.

REM Test 1: IPv4 (A-Records)
echo 1️⃣  IPv4 (A-Records) Test:
echo    Befehl: nslookup -type=A %DOMAIN%
echo.
nslookup -type=A %DOMAIN% | findstr /C:"Address:" > nul
if %errorlevel% equ 0 (
    echo    ✅ IPv4-Adressen gefunden:
    nslookup -type=A %DOMAIN% | findstr /C:"Address:"
) else (
    echo    ❌ FEHLER: Keine IPv4-Adressen gefunden!
)
echo.

REM Test 2: IPv6 (AAAA-Records)
echo 2️⃣  IPv6 (AAAA-Records) Test:
echo    Befehl: nslookup -type=AAAA %DOMAIN%
echo.
nslookup -type=AAAA %DOMAIN% | findstr /C:"Address:" > nul
if %errorlevel% equ 0 (
    echo    ✅ IPv6-Adressen gefunden:
    nslookup -type=AAAA %DOMAIN% | findstr /C:"Address:"
    set IPV6_SUPPORTED=true
) else (
    echo    ❌ FEHLER: Keine IPv6-Adressen gefunden!
    echo    ⚠️  PROBLEM: Website funktioniert NICHT auf mobilen Netzwerken (4G/5G)!
    set IPV6_SUPPORTED=false
)
echo.

REM Test 3: GitHub Pages IPv6-Support
echo 3️⃣  GitHub Pages IPv6-Support:
echo    Befehl: nslookup -type=AAAA %GITHUB_PAGES%
echo.
nslookup -type=AAAA %GITHUB_PAGES% | findstr /C:"Address:" > nul
if %errorlevel% equ 0 (
    echo    ✅ GitHub Pages unterstützt IPv6
    nslookup -type=AAAA %GITHUB_PAGES% | findstr /C:"Address:"
) else (
    echo    ⚠️  GitHub Pages hat kein IPv6 (ungewöhnlich)
)
echo.

REM Test 4: Website-Erreichbarkeit
echo 4️⃣  Website-Erreichbarkeit:
echo    Teste: https://%DOMAIN%
echo.
curl -s -o nul -w "%%{http_code}" https://%DOMAIN% > temp_status.txt 2>nul
set /p HTTP_STATUS=<temp_status.txt
del temp_status.txt 2>nul

if "%HTTP_STATUS%"=="200" (
    echo    ✅ Website ist erreichbar (HTTP %HTTP_STATUS%)
) else (
    echo    ❌ Website nicht erreichbar oder curl nicht installiert
    echo    Versuchen Sie manuell: https://%DOMAIN%
)
echo.

REM Zusammenfassung
echo ==========================================
echo 📊 ZUSAMMENFASSUNG
echo ==========================================
echo.

if "%IPV6_SUPPORTED%"=="true" (
    echo ✅ IPv6-Support: AKTIVIERT
    echo ✅ Mobile Netzwerke: FUNKTIONIEREN
    echo ✅ Status: ALLES OK!
    echo.
    echo 🎉 Ihre Website ist auf WLAN UND mobilen Daten erreichbar!
) else (
    echo ❌ IPv6-Support: NICHT AKTIVIERT
    echo ❌ Mobile Netzwerke: FUNKTIONIEREN NICHT
    echo ⚠️  Status: AKTION ERFORDERLICH!
    echo.
    echo 🚨 PROBLEM:
    echo    - Ihre Website funktioniert auf WLAN (IPv4^)
    echo    - Ihre Website funktioniert NICHT auf mobilen Daten (4G/5G^)
    echo.
    echo 💡 LÖSUNG:
    echo    1. DNS-Konfiguration bei Hosttech ändern
    echo    2. A-Records durch ALIAS oder ANAME ersetzen
    echo    3. Siehe: documentation\DNS_IPV6_KONFIGURATION.md
    echo.
    echo 📄 Detaillierte Anleitung:
    echo    type documentation\DNS_IPV6_KONFIGURATION.md
)

echo.
echo ==========================================
echo 🔗 Weitere Tests:
echo ==========================================
echo.
echo Online DNS-Checker:
echo   https://dnschecker.org/#AAAA/%DOMAIN%
echo.
echo What's My DNS:
echo   https://www.whatsmydns.net/#AAAA/%DOMAIN%
echo.
echo Manual Tests (CMD):
echo   nslookup -type=A %DOMAIN%
echo   nslookup -type=AAAA %DOMAIN%
echo   curl https://%DOMAIN%
echo.
echo ==========================================
echo.
pause
