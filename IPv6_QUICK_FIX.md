# 🚀 IPv6 Quick Fix - Mobile Netzwerk Support

## 🎯 Schnell-Anleitung (5 Minuten)

### Problem
Website lädt auf **WLAN** ✅, aber nicht auf **mobilen Daten** ❌ (4G/5G)

### Ursache
DNS verwendet statische A-Records (nur IPv4) statt ALIAS/ANAME (IPv4 + IPv6)

### Lösung (3 Schritte)

#### 1. Bei Hosttech anmelden
→ https://www.hosttech.ch/  
→ DNS-Verwaltung für `blacklodge.ch`

#### 2. DNS-Records ändern

**LÖSCHEN:**
```
❌ Typ: A, Name: @, Wert: 185.199.108.153
❌ Typ: A, Name: @, Wert: 185.199.109.153
❌ Typ: A, Name: @, Wert: 185.199.110.153
❌ Typ: A, Name: @, Wert: 185.199.111.153
```

**HINZUFÜGEN:**
```
✅ Typ: ALIAS (oder ANAME)
   Name: @ (oder leer)
   Ziel: blacklodgeswiss.github.io
   TTL: 3600
```

**BEHALTEN (nicht ändern!):**
```
✅ Typ: CNAME
   Name: www
   Ziel: blacklodgeswiss.github.io
```

#### 3. Warten & Testen
- **Wartezeit:** 1-4 Stunden (DNS-Propagierung)
- **Test:** Handy, WLAN AUS, mobile Daten AN
- **URL:** https://blacklodge.ch

---

## 🔧 Alternative: Falls Hosttech kein ALIAS unterstützt

### Fragen Sie zuerst den Support:
- Telefon: +41 61 279 63 63
- E-Mail: support@hosttech.ch

**Frage:** "Unterstützen Sie ALIAS- oder ANAME-Records für meine Apex-Domain?"

### Wenn NEIN → Cloudflare verwenden (kostenlos)

1. **Cloudflare-Account:** https://www.cloudflare.com/
2. **Domain hinzufügen:** blacklodge.ch
3. **Nameserver ändern** bei Hosttech auf Cloudflare
4. **CNAME erstellen** bei Cloudflare:
   - Typ: CNAME
   - Name: @ (Apex)
   - Ziel: blacklodgeswiss.github.io
   - Proxy: ☁️ Proxied (orange)

---

## ✅ Test-Commands

### Nach DNS-Änderung überprüfen:

**Linux/Mac:**
```bash
./check-ipv6-support.sh
```

**Windows:**
```cmd
check-ipv6-support.bat
```

**Manuell:**
```bash
# Sollte IPv6-Adressen zeigen:
nslookup -type=AAAA blacklodge.ch

# Oder mit dig:
dig blacklodge.ch AAAA
```

---

## 📊 Vorher/Nachher

| Aspekt | Vorher (A-Records) | Nachher (ALIAS) |
|--------|-------------------|-----------------|
| **IPv4** | ✅ Funktioniert | ✅ Funktioniert |
| **IPv6** | ❌ Fehlt | ✅ Funktioniert |
| **WLAN** | ✅ Funktioniert | ✅ Funktioniert |
| **Mobile Daten (4G/5G)** | ❌ Fehlt | ✅ Funktioniert |
| **Zukunftssicher** | ⚠️ Nein | ✅ Ja |

---

## 📄 Weitere Dokumentation

**Detaillierte Anleitung:**  
→ [documentation/DNS_IPV6_KONFIGURATION.md](documentation/DNS_IPV6_KONFIGURATION.md)

**Allgemeine Troubleshooting:**  
→ [WEBSITE_NICHT_ERREICHBAR.md](WEBSITE_NICHT_ERREICHBAR.md)

**GitHub Pages Setup:**  
→ [documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md](documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md)

---

## 🆘 Häufige Probleme

### "Hosttech hat kein ALIAS/ANAME"
→ Verwenden Sie CloudFlare (siehe oben) oder fragen Sie den Support

### "Änderung dauert zu lange"
→ DNS-Propagierung kann bis zu 48h dauern (meist 1-4h)  
→ Testen Sie mit: https://dnschecker.org/#AAAA/blacklodge.ch

### "Immer noch kein IPv6"
→ Warten Sie mindestens 1 Stunde  
→ Leeren Sie Browser-Cache (`Ctrl+Shift+Del`)  
→ Testen Sie von einem anderen Gerät

---

**© 2025 Blacklodge - Technische Dokumentation**
