# 🌐 DNS IPv6 Konfiguration für Mobile Netzwerke

## 🚨 Problem: Website nicht erreichbar auf mobilen Netzwerken

### Symptome
- ✅ Website funktioniert über **WLAN** (Wi-Fi)
- ❌ Website lädt **nicht** über **mobile Daten** (4G/5G)
- ❌ Fehler: "Diese Website ist nicht erreichbar" oder Timeout

### Ursache
Mobile Netzwerke bevorzugen **IPv6**, während WLAN-Netzwerke oft IPv4 verwenden.

**Aktuelles Problem:**
- `blacklodge.ch` verwendet statische **IPv4 A-Records**
- GitHub Pages liefert **nur IPv6 (AAAA) bei CNAME/ALIAS-Setup**
- Resultat: **Kein IPv6** → Mobile Netzwerke können die Website nicht laden

---

## ✅ Lösung: DNS auf ALIAS/ANAME umstellen

### Warum ALIAS statt A-Records?

| Setup-Typ | IPv4 | IPv6 | Mobile Netzwerke |
|-----------|------|------|------------------|
| **A-Records** (aktuell) | ✅ | ❌ | ❌ Funktioniert nicht |
| **ALIAS/ANAME** (empfohlen) | ✅ | ✅ | ✅ Funktioniert |

**ALIAS-Records:**
- Verhalten sich wie CNAME, funktionieren aber für Apex-Domains (blacklodge.ch)
- GitHub Pages liefert automatisch IPv4 **UND** IPv6
- Mobile Netzwerke können die Website erreichen

---

## 🔧 Schritt-für-Schritt: DNS bei Hosttech konfigurieren

### Schritt 1: Bei Hosttech anmelden

1. Gehen Sie zu: **https://www.hosttech.ch/**
2. Melden Sie sich in Ihrem **Kundenkonto** an
3. Navigieren Sie zu **"DNS-Verwaltung"** oder **"Domains"**

### Schritt 2: Aktuelle A-Records entfernen

**Wichtig:** Notieren Sie zuerst die aktuellen Einstellungen als Backup!

**Aktuelle Konfiguration (zu löschen):**
```
Typ: A
Name: @ (oder blacklodge.ch)
Wert: 185.199.108.153

Typ: A
Name: @ (oder blacklodge.ch)
Wert: 185.199.109.153

Typ: A
Name: @ (oder blacklodge.ch)
Wert: 185.199.110.153

Typ: A
Name: @ (oder blacklodge.ch)
Wert: 185.199.111.153
```

**Löschen Sie alle 4 A-Records für die Apex-Domain `blacklodge.ch`**

### Schritt 3: ALIAS/ANAME-Record erstellen

**Option A: ALIAS-Record (bevorzugt)**

Falls Hosttech **ALIAS** unterstützt:
```
Typ: ALIAS
Name: @ (oder leer für Apex-Domain)
Ziel: blacklodgeswiss.github.io
TTL: 3600 (1 Stunde)
```

**Option B: ANAME-Record (Alternative)**

Falls Hosttech **ANAME** anbietet:
```
Typ: ANAME
Name: @ (oder leer für Apex-Domain)
Ziel: blacklodgeswiss.github.io
TTL: 3600
```

**Option C: CNAME-Flattening (Falls verfügbar)**

Einige DNS-Provider bieten "CNAME Flattening" an:
```
Typ: CNAME (mit Flattening aktiviert)
Name: @ 
Ziel: blacklodgeswiss.github.io
TTL: 3600
```

### Schritt 4: WWW-Subdomain konfigurieren (bleibt unverändert)

**Behalten Sie den CNAME für www bei:**
```
Typ: CNAME
Name: www
Ziel: blacklodgeswiss.github.io
TTL: 3600
```

### Schritt 5: Speichern und warten

1. **Speichern Sie die Änderungen**
2. **DNS-Propagierung:** 1-24 Stunden (meist 1-4 Stunden)
3. **Status überprüfen:** https://dnschecker.org/

---

## ⚠️ Falls Hosttech ALIAS/ANAME nicht unterstützt

### Alternative: CloudFlare DNS (kostenlos)

Falls Hosttech keine ALIAS/ANAME-Records unterstützt, können Sie CloudFlare als DNS-Provider verwenden:

1. **CloudFlare-Account erstellen:** https://www.cloudflare.com/
2. **Domain hinzufügen:** `blacklodge.ch`
3. **Nameserver bei Hosttech ändern** auf CloudFlare-Nameserver
4. **CNAME-Record erstellen** (CloudFlare unterstützt CNAME Flattening automatisch):
   ```
   Typ: CNAME
   Name: @ (Apex)
   Ziel: blacklodgeswiss.github.io
   Proxy-Status: ☁️ Proxied (orange Cloud)
   ```
5. **WWW-Subdomain:**
   ```
   Typ: CNAME
   Name: www
   Ziel: blacklodgeswiss.github.io
   Proxy-Status: ☁️ Proxied
   ```

**Vorteile CloudFlare:**
- ✅ Kostenlos
- ✅ Automatisches IPv6
- ✅ CDN (schnellere Ladezeiten)
- ✅ DDoS-Schutz
- ✅ SSL-Zertifikate

---

## 🧪 Testen der Konfiguration

### Test 1: DNS-Auflösung überprüfen

**Terminal/CMD:**
```bash
# IPv4 (A-Record)
nslookup -type=A blacklodge.ch

# IPv6 (AAAA-Record)
nslookup -type=AAAA blacklodge.ch
```

**Erwartetes Ergebnis nach ALIAS-Setup:**
- ✅ IPv4-Adressen werden zurückgegeben
- ✅ IPv6-Adressen werden zurückgegeben

### Test 2: Website-Erreichbarkeit

**Von Computer (WLAN):**
```bash
curl -I https://blacklodge.ch
# Sollte: HTTP/2 200 zurückgeben
```

**Von Handy (mobile Daten):**
1. **WLAN ausschalten**
2. **Mobile Daten einschalten**
3. **Browser öffnen:** https://blacklodge.ch
4. **Sollte laden:** Website sichtbar ✅

### Test 3: IPv6-Konnektivität

```bash
# Ping über IPv6
ping -6 blacklodge.ch

# Oder mit curl
curl -6 https://blacklodge.ch
```

### Test 4: Online DNS-Checker

Verwenden Sie Online-Tools zur Überprüfung:
- **DNS Checker:** https://dnschecker.org/
- **What's My DNS:** https://www.whatsmydns.net/
- **MX Toolbox:** https://mxtoolbox.com/SuperTool.aspx

**Überprüfen Sie:**
- ✅ A-Records (IPv4) existieren
- ✅ AAAA-Records (IPv6) existieren
- ✅ CNAME für www funktioniert

---

## 📋 Checkliste

### Vor der Änderung
- [ ] Backup der aktuellen DNS-Einstellungen machen (Screenshot)
- [ ] Bestätigen, dass Hosttech ALIAS/ANAME unterstützt
- [ ] Alternative (CloudFlare) bereitstehen haben

### DNS-Änderungen
- [ ] Alte A-Records für `blacklodge.ch` gelöscht
- [ ] ALIAS/ANAME-Record für `blacklodge.ch` → `blacklodgeswiss.github.io` erstellt
- [ ] CNAME für `www.blacklodge.ch` → `blacklodgeswiss.github.io` überprüft (sollte bereits existieren)
- [ ] Änderungen gespeichert

### Nach der Änderung
- [ ] DNS-Propagierung abwarten (1-24 Stunden)
- [ ] `nslookup -type=AAAA blacklodge.ch` zeigt IPv6-Adressen
- [ ] Website über WLAN erreichbar
- [ ] Website über mobile Daten erreichbar
- [ ] HTTPS funktioniert (Zertifikat gültig)

---

## 🔍 Troubleshooting

### Problem: "Hosttech unterstützt kein ALIAS/ANAME"

**Lösung:**
- Kontaktieren Sie den Hosttech-Support und fragen Sie explizit nach **ALIAS** oder **ANAME**
- Alternativ: Wechseln Sie zu CloudFlare (siehe oben)

### Problem: "DNS-Änderung dauert zu lange"

**Lösung:**
- DNS-Propagierung kann bis zu 48 Stunden dauern
- Leeren Sie den Browser-Cache
- Testen Sie von einem anderen Gerät/Netzwerk
- Verwenden Sie: https://dnschecker.org/ zur Überprüfung

### Problem: "Website zeigt Zertifikatsfehler"

**Lösung:**
- Warten Sie, bis GitHub Pages ein neues SSL-Zertifikat ausstellt (kann bis zu 24h dauern)
- Überprüfen Sie in GitHub: Settings → Pages → "Enforce HTTPS" ist aktiviert
- Falls nach 24h nicht behoben: GitHub Pages Custom Domain neu speichern

### Problem: "IPv6 wird immer noch nicht aufgelöst"

**Lösung:**
1. Bestätigen Sie, dass Sie **ALIAS/ANAME** verwenden (nicht A-Records)
2. Überprüfen Sie mit: `dig AAAA blacklodge.ch`
3. Testen Sie direkt: `curl -6 https://blacklodgeswiss.github.io` (sollte funktionieren)
4. Falls GitHub Pages IPv6 hat, aber Ihre Domain nicht: DNS-Konfiguration nochmals überprüfen

---

## 📞 Support-Kontakte

**Hosttech Support:**
- Website: https://www.hosttech.ch/support
- Telefon: +41 61 279 63 63
- E-Mail: support@hosttech.ch

**Fragen Sie explizit nach:**
> "Ich benötige einen ALIAS- oder ANAME-Record für meine Apex-Domain `blacklodge.ch`, 
> der auf `blacklodgeswiss.github.io` zeigt, um IPv6-Unterstützung zu aktivieren."

**GitHub Pages Support:**
- Dokumentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Community: https://github.community/

---

## 🎯 Zusammenfassung

| Vorher (A-Records) | Nachher (ALIAS) |
|--------------------|-----------------|
| ❌ Nur IPv4 | ✅ IPv4 + IPv6 |
| ❌ Mobil nicht erreichbar | ✅ Mobil erreichbar |
| ❌ Statische IPs | ✅ Dynamische Auflösung |
| ⚠️ Manuelle Updates nötig | ✅ Automatisch aktuell |

**Nach der Umstellung:**
- ✅ Website funktioniert über WLAN (IPv4)
- ✅ Website funktioniert über mobile Daten (IPv6)
- ✅ Zukunftssicher (GitHub kann IPs ändern, ohne Ihre DNS zu beeinflussen)

---

**© 2025 Blacklodge - Technische Dokumentation**
