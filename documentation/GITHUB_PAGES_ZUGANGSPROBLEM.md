# GitHub Pages Zugriffsproblem beheben

## 🔴 Zwei häufige Probleme

### Problem 1: Website funktioniert über WLAN, aber NICHT über mobile Daten (4G/5G)
**Ursache:** Fehlende IPv6-Unterstützung  
**Symptome:** Lädt auf WLAN, aber nicht auf mobilem Internet  
**Lösung:** 📄 **[DNS_IPV6_KONFIGURATION.md](DNS_IPV6_KONFIGURATION.md)** - DNS auf ALIAS/ANAME umstellen für IPv6-Support

### Problem 2: Website ist komplett privat (nur für Sie sichtbar)
**Ursache:** Repository auf "Private" oder GitHub Pages nicht aktiviert  
**Symptome:** Niemand außer Sie kann die Website sehen  
**Lösung:** Siehe Schritte unten

---

## ✅ Lösung für Problem 2: Schritt-für-Schritt Anleitung

### Schritt 1: GitHub Pages Einstellungen überprüfen

1. **Öffnen Sie Ihr Repository auf GitHub:**
   ```
   https://github.com/blacklodgeswiss/blacklodgeswiss.github.io
   ```

2. **Gehen Sie zu Settings:**
   - Klicken Sie oben rechts auf **"Settings"**

3. **Überprüfen Sie Pages-Einstellungen:**
   - Scrollen Sie runter zu **"Pages"** (linke Seitenleiste)
   - **Source** muss auf **"GitHub Actions"** stehen
   - **NICHT** auf "Deploy from a branch"

### Schritt 2: Überprüfen Sie die Sichtbarkeit des Repositories

1. **Repository Visibility:**
   - Settings → Danger Zone → Change repository visibility
   - **Muss auf "Public" stehen!**
   - Wenn es auf "Private" steht, ist die Website nur für Sie sichtbar

2. **Falls Private → Public ändern:**
   - Scrollen Sie ganz nach unten in Settings
   - Klicken Sie auf **"Change visibility"**
   - Wählen Sie **"Make public"**
   - Bestätigen Sie die Änderung

### Schritt 3: Custom Domain überprüfen (blacklodge.ch)

Ihre Website sollte unter `https://blacklodge.ch` erreichbar sein.

1. **GitHub Pages Settings:**
   - Settings → Pages
   - **Custom domain:** `blacklodge.ch`
   - **Enforce HTTPS:** aktiviert ✅

2. **DNS-Einstellungen überprüfen:**
   
   Ihre Domain `blacklodge.ch` muss korrekt konfiguriert sein:

   **⚠️ WICHTIG: Für mobile Netzwerke (IPv6-Support):**
   
   **Option A: Mit ALIAS/ANAME (EMPFOHLEN für IPv6-Support):**
   ```
   Typ: ALIAS (oder ANAME)
   Name: @ (Apex-Domain)
   Ziel: blacklodgeswiss.github.io
   TTL: 3600
   ```
   
   **Vorteile:**
   - ✅ Unterstützt IPv4 UND IPv6
   - ✅ Funktioniert auf mobilen Netzwerken (4G/5G)
   - ✅ Automatische IP-Updates durch GitHub
   
   📄 **Detaillierte Anleitung:** [DNS_IPV6_KONFIGURATION.md](DNS_IPV6_KONFIGURATION.md)

   **Option B: Mit A-Records (NUR IPv4, funktioniert NICHT auf mobilen Netzwerken):**
   ```
   Typ: A
   Name: @
   Wert: 185.199.108.153
   
   Typ: A
   Name: @
   Wert: 185.199.109.153
   
   Typ: A
   Name: @
   Wert: 185.199.110.153
   
   Typ: A
   Name: @
   Wert: 185.199.111.153
   ```
   
   **⚠️ Warnung:** A-Records unterstützen kein IPv6!
   - ❌ Website funktioniert NICHT auf mobilen Netzwerken
   - ❌ Keine IPv6-Unterstützung
   - ⚠️ Nur für WLAN/IPv4-Netzwerke

   **Wichtig für www-Subdomain (beide Optionen):**
   ```
   Typ: CNAME
   Name: www
   Ziel: blacklodgeswiss.github.io
   ```

3. **DNS-Propagierung abwarten:**
   - DNS-Änderungen können **1-48 Stunden** dauern
   - Überprüfen Sie den Status mit: https://dnschecker.org/
   - Testen Sie IPv6: `nslookup -type=AAAA blacklodge.ch`

### Schritt 4: GitHub Actions Workflow überprüfen

1. **Workflow-Status checken:**
   - Gehen Sie zu **"Actions"** Tab in Ihrem Repository
   - Überprüfen Sie, ob der letzte Workflow erfolgreich war (grünes Häkchen ✅)
   - Falls rot (❌): Klicken Sie drauf und lesen Sie die Fehlermeldung

2. **Falls Workflow fehlgeschlagen:**
   - Repository → Actions
   - Neuester Workflow → Details ansehen
   - Fehler beheben (meist fehlende Secrets oder falsche Konfiguration)

### Schritt 5: Cache und DNS leeren (auf Ihrem Computer)

**Windows:**
```cmd
ipconfig /flushdns
```

**macOS:**
```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**Linux:**
```bash
sudo systemd-resolve --flush-caches
```

### Schritt 6: Testen Sie die Website

1. **Testen Sie verschiedene URLs:**
   - ✅ `https://blacklodge.ch`
   - ✅ `https://www.blacklodge.ch`
   - ✅ `https://blacklodgeswiss.github.io`

2. **Testen Sie von verschiedenen Geräten:**
   - Handy (ohne WLAN, mit mobilen Daten)
   - Computer eines Freundes
   - Online-Tools: https://www.websiteplanet.com/webtools/down-or-not/

3. **Browser-Cache leeren:**
   - Chrome/Edge: `Ctrl + Shift + Delete`
   - Firefox: `Ctrl + Shift + Delete`
   - Safari: `Cmd + Option + E`

## 🔍 Häufige Ursachen

### 1. IPv6 fehlt - Mobile Netzwerke funktionieren nicht
**Symptom:** Website lädt auf WLAN, aber nicht auf mobilen Daten (4G/5G)
**Lösung:** DNS auf ALIAS/ANAME umstellen (siehe [DNS_IPV6_KONFIGURATION.md](DNS_IPV6_KONFIGURATION.md))
**Test:** `nslookup -type=AAAA blacklodge.ch` sollte IPv6-Adressen zeigen

### 2. Repository ist auf "Private" gestellt
**Symptom:** Website ist nur für Sie sichtbar
**Lösung:** Repository auf "Public" stellen (siehe Schritt 2)

### 3. DNS nicht richtig konfiguriert
**Symptom:** `blacklodge.ch` funktioniert nicht, aber `blacklodgeswiss.github.io` schon
**Lösung:** DNS-Einstellungen beim Domain-Provider korrigieren (siehe Schritt 3)

### 4. GitHub Pages ist deaktiviert
**Symptom:** Website lädt gar nicht
**Lösung:** Settings → Pages → Source auf "GitHub Actions" stellen

### 5. CNAME-Datei fehlt oder falsch
**Symptom:** Custom Domain funktioniert nicht
**Lösung:** CNAME-Datei muss `blacklodge.ch` enthalten (bereits vorhanden ✅)

### 6. Router/Firewall blockiert Zugriff
**Symptom:** Nur von Zuhause erreichbar
**Lösung:** 
- Testen Sie mit mobilen Daten (Handy ohne WLAN)
- Proxy/VPN ausschalten
- Router neu starten

## 🛠️ Technische Überprüfung

### DNS-Status überprüfen (Terminal/CMD):

```bash
# Domain auflösen
nslookup blacklodge.ch

# Sollte zeigen:
# Name: blacklodgeswiss.github.io
# Addresses: 185.199.108.153, ...
```

### SSL-Zertifikat überprüfen:

```bash
curl -I https://blacklodge.ch
```

Sollte `200 OK` zurückgeben.

## 📞 Wenn nichts funktioniert

1. **GitHub Pages Status überprüfen:**
   - https://www.githubstatus.com/

2. **Community fragen:**
   - GitHub Community: https://github.community/

3. **Support kontaktieren:**
   - GitHub Support: https://support.github.com/

## ✅ Checkliste zur Problemlösung

- [ ] Repository auf "Public" gestellt
- [ ] GitHub Pages Source = "GitHub Actions"
- [ ] Custom Domain = `blacklodge.ch`
- [ ] DNS A-Records korrekt konfiguriert
- [ ] DNS-Propagation abgewartet (24-48h)
- [ ] GitHub Action erfolgreich durchgelaufen
- [ ] Von mobilem Gerät (mobile Daten) getestet
- [ ] Browser-Cache geleert
- [ ] DNS-Cache geleert

## 🎯 Schnelltest

**Terminal/CMD:**
```bash
curl https://blacklodge.ch
```

**Sollte HTML-Code der Website zurückgeben.**

**Wenn nicht:** Problem liegt bei DNS oder GitHub Pages Konfiguration.

---

**© 2025 Blacklodge - Technische Dokumentation**
