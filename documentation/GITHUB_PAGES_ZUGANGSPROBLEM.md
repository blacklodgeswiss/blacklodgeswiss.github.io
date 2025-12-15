# GitHub Pages Zugriffsproblem beheben

## 🔴 Problem
Die Website ist nur vom Heimnetzwerk aus erreichbar, aber nicht öffentlich verfügbar.

## ✅ Lösung: Schritt-für-Schritt Anleitung

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

   **Bei Ihrem Domain-Provider (z.B. Hostpoint, Infomaniak, etc.):**
   
   **Option A: Mit CNAME (empfohlen für GitHub Pages):**
   ```
   Typ: CNAME
   Name: @ (oder www)
   Wert: blacklodgeswiss.github.io
   TTL: 3600
   ```

   **Option B: Mit A-Records (wenn CNAME nicht funktioniert):**
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

   **Wichtig für www-Subdomain:**
   ```
   Typ: CNAME
   Name: www
   Wert: blacklodgeswiss.github.io
   ```

3. **DNS-Propagation abwarten:**
   - DNS-Änderungen können **24-48 Stunden** dauern
   - Überprüfen Sie den Status mit: https://dnschecker.org/

### Schritt 4: GitHub Actions Workflow überprüfen

1. **Workflow-Status checken:**
   - Gehen Sie zu **"Actions"** Tab in Ihrem Repository
   - Überprüfen Sie, ob der letzte Workflow erfolgreich war (grünes Häkchen ✅)
   - Falls rot (❌): Klicken Sie drauf und lesen Sie die Fehlermeldung

2. **Falls Workflow fehlgeschlagen:**
   - Repository → Actions
   - Neuester Workflow → Details anschauen
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

### 1. Repository ist auf "Private" gestellt
**Symptom:** Website ist nur für Sie sichtbar
**Lösung:** Repository auf "Public" stellen (siehe Schritt 2)

### 2. DNS nicht richtig konfiguriert
**Symptom:** `blacklodge.ch` funktioniert nicht, aber `blacklodgeswiss.github.io` schon
**Lösung:** DNS-Einstellungen beim Domain-Provider korrigieren (siehe Schritt 3)

### 3. GitHub Pages ist deaktiviert
**Symptom:** Website lädt gar nicht
**Lösung:** Settings → Pages → Source auf "GitHub Actions" stellen

### 4. CNAME-Datei fehlt oder falsch
**Symptom:** Custom Domain funktioniert nicht
**Lösung:** CNAME-Datei muss `blacklodge.ch` enthalten (bereits vorhanden ✅)

### 5. Router/Firewall blockiert Zugriff
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
