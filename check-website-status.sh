#!/bin/bash

# Website Status Checker für blacklodge.ch
# Überprüft ob die Website öffentlich erreichbar ist
# Für IPv6-Support-Test verwenden Sie: ./check-ipv6-support.sh

echo "=================================="
echo "Blacklodge Website Status Checker"
echo "=================================="
echo ""
echo "💡 Tipp: Für IPv6-Test (mobile Netzwerke): ./check-ipv6-support.sh"
echo ""

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Hauptdomain
echo "Test 1: Hauptdomain (blacklodge.ch)"
echo "------------------------------------"
HTTP_CODE=$(curl -I -s -o /dev/null -w "%{http_code}" https://blacklodge.ch 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}✅ blacklodge.ch ist erreichbar (HTTP $HTTP_CODE)${NC}"
elif [ "$HTTP_CODE" = "000" ]; then
    echo -e "${RED}❌ blacklodge.ch ist NICHT erreichbar (Netzwerkfehler)${NC}"
    echo -e "${YELLOW}   Mögliche Ursachen:${NC}"
    echo "   - Keine Internetverbindung"
    echo "   - DNS kann nicht aufgelöst werden"
    echo "   - Firewall blockiert Zugriff"
else
    echo -e "${RED}❌ blacklodge.ch ist NICHT erreichbar (HTTP $HTTP_CODE)${NC}"
    echo -e "${YELLOW}   Mögliche Ursachen:${NC}"
    echo "   - Repository ist auf 'Private' gestellt"
    echo "   - GitHub Pages ist nicht aktiviert"
    echo "   - DNS noch nicht propagiert"
fi
echo ""

# Test 2: WWW Subdomain
echo "Test 2: WWW Subdomain (www.blacklodge.ch)"
echo "------------------------------------"
HTTP_CODE=$(curl -I -s -o /dev/null -w "%{http_code}" https://www.blacklodge.ch 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}✅ www.blacklodge.ch ist erreichbar (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${YELLOW}⚠️  www.blacklodge.ch ist nicht erreichbar${NC}"
    echo "   (Dies ist optional, aber empfohlen)"
fi
echo ""

# Test 3: GitHub Pages URL
echo "Test 3: GitHub Pages URL"
echo "------------------------------------"
HTTP_CODE=$(curl -I -s -o /dev/null -w "%{http_code}" https://blacklodgeswiss.github.io 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}✅ GitHub Pages URL ist erreichbar (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ GitHub Pages URL ist NICHT erreichbar${NC}"
    echo -e "${YELLOW}   KRITISCH: Repository muss auf 'Public' stehen!${NC}"
fi
echo ""

# Test 4: DNS Auflösung
echo "Test 4: DNS Auflösung"
echo "------------------------------------"
if command -v nslookup &> /dev/null; then
    echo "DNS Einträge für blacklodge.ch:"
    nslookup blacklodge.ch | grep -A 5 "Name:\|Address:"
else
    echo -e "${YELLOW}⚠️  nslookup nicht verfügbar${NC}"
fi
echo ""

# Test 5: SSL Zertifikat
echo "Test 5: SSL Zertifikat"
echo "------------------------------------"
if curl -I -s https://blacklodge.ch | grep -q "HTTP/2 200\|HTTP/1.1 200"; then
    echo -e "${GREEN}✅ HTTPS funktioniert korrekt${NC}"
else
    echo -e "${YELLOW}⚠️  HTTPS könnte Probleme haben${NC}"
fi
echo ""

# Zusammenfassung
echo "=================================="
echo "Zusammenfassung"
echo "=================================="
echo ""

# Haupttest
HTTP_CODE=$(curl -I -s -o /dev/null -w "%{http_code}" https://blacklodge.ch 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Website ist ÖFFENTLICH erreichbar!${NC}"
    echo ""
    echo "Ihre Website funktioniert korrekt."
    echo "Falls Sie sie von Ihrem Computer nicht sehen können:"
    echo "  1. Browser-Cache leeren (Ctrl+Shift+Delete)"
    echo "  2. DNS-Cache leeren: 'ipconfig /flushdns' (Windows)"
    echo "  3. Testen Sie mit mobilen Daten (Handy ohne WLAN)"
else
    echo -e "${RED}❌ Website ist NICHT öffentlich erreichbar!${NC}"
    echo ""
    echo "WICHTIGE SCHRITTE:"
    echo "  1. Überprüfen Sie die Repository-Sichtbarkeit:"
    echo "     https://github.com/blacklodgeswiss/blacklodgeswiss.github.io/settings"
    echo "     → Repository MUSS auf 'Public' stehen!"
    echo ""
    echo "  2. Überprüfen Sie GitHub Pages Einstellungen:"
    echo "     Settings → Pages → Source = 'GitHub Actions'"
    echo ""
    echo "  3. Lesen Sie die Troubleshooting-Anleitung:"
    echo "     documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md"
fi
echo ""
echo "=================================="
