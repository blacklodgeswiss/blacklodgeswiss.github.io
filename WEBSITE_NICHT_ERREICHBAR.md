# ⚠️ Website nur vom Heimnetzwerk erreichbar?

## 🚨 Zwei häufige Probleme

### Problem A: Website funktioniert über WLAN, aber NICHT über mobile Daten (4G/5G)
**Ursache:** IPv6-Unterstützung fehlt (DNS-Konfiguration)
**Lösung:** 📄 **[documentation/DNS_IPV6_KONFIGURATION.md](documentation/DNS_IPV6_KONFIGURATION.md)** - DNS auf ALIAS/ANAME umstellen

### Problem B: Website ist komplett privat (nur für Sie sichtbar)
**Ursache:** Repository ist auf "Private" gestellt
**Lösung:** Siehe unten (Schritt 1)

---

## 🚨 Sofort-Lösung für Problem B (Private Repository)

### Schritt 1: Repository-Sichtbarkeit prüfen
Ihre Website ist nur öffentlich erreichbar, wenn das **Repository auf "Public"** steht!

**So überprüfen Sie es:**
1. Gehen Sie zu: https://github.com/blacklodgeswiss/blacklodgeswiss.github.io
2. Klicken Sie oben rechts auf **"Settings"**
3. Scrollen Sie ganz nach unten zu **"Danger Zone"**
4. Überprüfen Sie die **"Change repository visibility"** Einstellung

**Falls "Private" → MUSS auf "Public" geändert werden!**

### Schritt 2: GitHub Pages aktiviert?
1. Settings → Pages (linke Seitenleiste)
2. **Source** muss auf **"GitHub Actions"** stehen
3. **Custom domain:** `blacklodge.ch` eingetragen
4. **Enforce HTTPS:** aktiviert ✅

### Schritt 3: Testen Sie mit mobilen Daten
Der beste Test, ob die Website öffentlich erreichbar ist:

1. **Handy nehmen**
2. **WLAN ausschalten** (wichtig!)
3. **Mobile Daten aktivieren**
4. **Browser öffnen:** https://blacklodge.ch

**Funktioniert es?**
- ✅ **JA:** Problem war nur lokales Caching oder DNS
- ❌ **NEIN:** Wahrscheinlich IPv6-Problem (siehe unten)

**Falls mobile Daten nicht funktionieren:**
→ 📄 **[documentation/DNS_IPV6_KONFIGURATION.md](documentation/DNS_IPV6_KONFIGURATION.md)** - IPv6-Support aktivieren

## 📖 Detaillierte Anleitung

Für eine komplette Schritt-für-Schritt Anleitung lesen Sie:
📄 **[documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md](documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md)**

## 🎯 Häufigste Ursachen

### 1. IPv6 fehlt - Mobile Netzwerke (40% der Fälle)
→ 📄 **[documentation/DNS_IPV6_KONFIGURATION.md](documentation/DNS_IPV6_KONFIGURATION.md)** - DNS auf ALIAS/ANAME umstellen

### 2. Repository ist "Private" (35% der Fälle)
→ Settings → Danger Zone → Make Public

### 3. DNS nicht propagiert (20% der Fälle)
→ Warten Sie 24-48 Stunden nach DNS-Änderung

### 4. Browser-Cache (5% der Fälle)
→ `Ctrl+Shift+Delete` → Cache leeren

## 🔧 Schnelltest im Terminal/CMD

```bash
# Test 1: Ist die Website online?
curl -I https://blacklodge.ch

# Erwartete Ausgabe: "HTTP/2 200"
# Falls Error 404 oder Connection refused: Problem!
```

```bash
# Test 2: DNS korrekt aufgelöst?
nslookup blacklodge.ch

# Sollte zeigen: blacklodgeswiss.github.io
```

## 📞 Brauchen Sie Hilfe?

- 📄 Detaillierte Anleitung: [documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md](documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md)
- 🌐 GitHub Status: https://www.githubstatus.com/
- 💬 GitHub Community: https://github.community/

---

**Wichtig:** Die meisten Zugriffsprobleme liegen an "Private Repository" oder nicht propagierten DNS-Einstellungen!
