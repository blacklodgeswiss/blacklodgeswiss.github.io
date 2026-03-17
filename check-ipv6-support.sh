#!/bin/bash

# Blacklodge IPv6 Support Checker
# Überprüft, ob die Domain IPv6 unterstützt (wichtig für mobile Netzwerke)

echo "=========================================="
echo "Blacklodge IPv6 Support Checker"
echo "=========================================="
echo ""

DOMAIN="blacklodge.ch"
GITHUB_PAGES="blacklodgeswiss.github.io"

echo "🔍 Überprüfe DNS-Konfiguration für: $DOMAIN"
echo ""

# Test 1: IPv4 (A-Records)
echo "1️⃣  IPv4 (A-Records) Test:"
echo "   Befehl: nslookup -type=A $DOMAIN"
echo ""
A_RECORDS=$(nslookup -type=A $DOMAIN 2>/dev/null | grep "Address:" | tail -n +2)
if [ -z "$A_RECORDS" ]; then
    echo "   ❌ FEHLER: Keine IPv4-Adressen gefunden!"
else
    echo "$A_RECORDS" | sed 's/^/   ✅ /'
fi
echo ""

# Test 2: IPv6 (AAAA-Records)
echo "2️⃣  IPv6 (AAAA-Records) Test:"
echo "   Befehl: nslookup -type=AAAA $DOMAIN"
echo ""
AAAA_RECORDS=$(nslookup -type=AAAA $DOMAIN 2>/dev/null | grep "Address:" | tail -n +2)
if [ -z "$AAAA_RECORDS" ]; then
    echo "   ❌ FEHLER: Keine IPv6-Adressen gefunden!"
    echo "   ⚠️  PROBLEM: Website funktioniert NICHT auf mobilen Netzwerken (4G/5G)!"
    IPV6_SUPPORTED=false
else
    echo "$AAAA_RECORDS" | sed 's/^/   ✅ /'
    IPV6_SUPPORTED=true
fi
echo ""

# Test 3: DNS-Record-Typ bestimmen
echo "3️⃣  DNS-Konfigurationstyp:"
CNAME_CHECK=$(nslookup -type=CNAME $DOMAIN 2>/dev/null | grep "$GITHUB_PAGES")
if [ ! -z "$CNAME_CHECK" ]; then
    echo "   ✅ ALIAS/ANAME/CNAME erkannt (empfohlene Konfiguration)"
    echo "   → Unterstützt IPv4 + IPv6"
else
    echo "   ⚠️  Statische A-Records erkannt"
    echo "   → Unterstützt nur IPv4 (KEIN IPv6)"
fi
echo ""

# Test 4: GitHub Pages IPv6-Support
echo "4️⃣  GitHub Pages IPv6-Support:"
echo "   Befehl: nslookup -type=AAAA $GITHUB_PAGES"
echo ""
GH_AAAA=$(nslookup -type=AAAA $GITHUB_PAGES 2>/dev/null | grep "Address:" | tail -n +2)
if [ -z "$GH_AAAA" ]; then
    echo "   ⚠️  GitHub Pages hat kein IPv6 (ungewöhnlich)"
else
    echo "$GH_AAAA" | sed 's/^/   ✅ /' | head -n 2
    echo "   ✅ GitHub Pages unterstützt IPv6"
fi
echo ""

# Test 5: Website-Erreichbarkeit
echo "5️⃣  Website-Erreichbarkeit:"
echo "   Teste: https://$DOMAIN"
echo ""
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "   ✅ Website ist erreichbar (HTTP $HTTP_STATUS)"
else
    echo "   ❌ Website nicht erreichbar (HTTP $HTTP_STATUS)"
fi
echo ""

# Zusammenfassung
echo "=========================================="
echo "📊 ZUSAMMENFASSUNG"
echo "=========================================="
echo ""

if [ "$IPV6_SUPPORTED" = true ]; then
    echo "✅ IPv6-Support: AKTIVIERT"
    echo "✅ Mobile Netzwerke: FUNKTIONIEREN"
    echo "✅ Status: ALLES OK!"
    echo ""
    echo "🎉 Ihre Website ist auf WLAN UND mobilen Daten erreichbar!"
else
    echo "❌ IPv6-Support: NICHT AKTIVIERT"
    echo "❌ Mobile Netzwerke: FUNKTIONIEREN NICHT"
    echo "⚠️  Status: AKTION ERFORDERLICH!"
    echo ""
    echo "🚨 PROBLEM:"
    echo "   - Ihre Website funktioniert auf WLAN (IPv4)"
    echo "   - Ihre Website funktioniert NICHT auf mobilen Daten (4G/5G)"
    echo ""
    echo "💡 LÖSUNG:"
    echo "   1. DNS-Konfiguration bei Hosttech ändern"
    echo "   2. A-Records durch ALIAS oder ANAME ersetzen"
    echo "   3. Siehe: documentation/DNS_IPV6_KONFIGURATION.md"
    echo ""
    echo "📄 Detaillierte Anleitung:"
    echo "   cat documentation/DNS_IPV6_KONFIGURATION.md"
fi

echo ""
echo "=========================================="
echo "🔗 Weitere Tests:"
echo "=========================================="
echo ""
echo "Online DNS-Checker:"
echo "  https://dnschecker.org/#AAAA/$DOMAIN"
echo ""
echo "What's My DNS:"
echo "  https://www.whatsmydns.net/#AAAA/$DOMAIN"
echo ""
echo "Manual Tests:"
echo "  dig $DOMAIN A"
echo "  dig $DOMAIN AAAA"
echo "  curl -6 https://$DOMAIN"
echo ""
echo "=========================================="
