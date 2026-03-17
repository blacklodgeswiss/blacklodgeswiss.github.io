# 🔍 Hosttech DNS: ALIAS/ANAME Support überprüfen

## Basierend auf Ihrem Screenshot

Sie haben uns Ihre aktuelle DNS-Konfiguration bei Hosttech gezeigt. Wir sehen:

✅ **4 A-Records** (IPv4 only):
- 185.199.108.153
- 185.199.111.153
- 185.199.109.153
- 185.199.110.153

✅ **1 CNAME-Record** für www:
- www.blacklodge.ch → blacklodgeswiss.github.io

## ❓ Nächster Schritt: ALIAS/ANAME verfügbar?

Um IPv6 zu aktivieren, müssen wir überprüfen, ob Hosttech **ALIAS** oder **ANAME** Records unterstützt.

### So überprüfen Sie das:

1. **In Ihrer Hosttech DNS-Verwaltung:**
   - Klicken Sie auf das **Dropdown-Menü** bei "Record hinzufügen"
   - Wo aktuell "A" steht (siehe Screenshot)

2. **Suchen Sie nach einem dieser Record-Typen:**
   - ✅ **ALIAS**
   - ✅ **ANAME** 
   - ✅ **CNAME mit Flattening** (für Apex-Domain)
   - ✅ Irgendetwas, das für die Apex-Domain (@) funktioniert und auf einen Hostnamen zeigen kann

3. **Was Sie im Dropdown sehen sollten:**
   ```
   A
   AAAA
   CNAME
   MX
   TXT
   ...
   ALIAS    ← Suchen Sie nach diesem!
   ANAME    ← Oder nach diesem!
   ```

## 📊 Drei mögliche Szenarien

### Szenario 1: ✅ ALIAS/ANAME ist verfügbar

**Das wäre ideal!** 

**Nächste Schritte:**
1. Löschen Sie die 4 A-Records
2. Erstellen Sie einen ALIAS oder ANAME Record:
   ```
   Typ: ALIAS (oder ANAME)
   Host: @ (oder blacklodge.ch)
   Ziel: blacklodgeswiss.github.io
   TTL: 3600
   ```
3. Fertig! ✅

**Anleitung:** Folgen Sie → [DNS_IPV6_KONFIGURATION.md](DNS_IPV6_KONFIGURATION.md)

---

### Szenario 2: ❌ ALIAS/ANAME ist NICHT verfügbar

**Das ist ein Problem, aber lösbar.**

#### Option A: Hosttech Support kontaktieren

**Fragen Sie explizit:**
> "Bietet Hosttech ALIAS-Records oder ANAME-Records für Apex-Domains an? 
> Ich benötige IPv6-Support für meine GitHub Pages Website."

**Kontakt:**
- Telefon: +41 61 279 63 63
- E-Mail: support@hosttech.ch
- Online: https://www.hosttech.ch/support

#### Option B: Zu Cloudflare wechseln (kostenlos)

Cloudflare unterstützt CNAME Flattening automatisch, was das Gleiche wie ALIAS bewirkt.

**Vorteile:**
- ✅ Kostenlos
- ✅ IPv6 automatisch
- ✅ CDN (schneller)
- ✅ DDoS-Schutz
- ✅ Einfaches Setup

**Anleitung:** Siehe Abschnitt "Alternative: Cloudflare DNS" in → [DNS_IPV6_KONFIGURATION.md](DNS_IPV6_KONFIGURATION.md)

---

### Szenario 3: 🤔 Unsicher / Andere Record-Typen

Falls Sie im Dropdown andere Record-Typen sehen, die nicht in unserer Dokumentation erwähnt sind:

**Bitte teilen Sie uns mit:**
- Welche Record-Typen verfügbar sind
- Screenshot vom Dropdown-Menü
- Wir helfen Ihnen dann weiter

## 🚨 WICHTIG: Warum A-Records nicht ausreichen

Ihre aktuellen **4 A-Records** funktionieren nur für IPv4:
- ✅ Website lädt auf **WLAN** (meist IPv4)
- ❌ Website lädt NICHT auf **mobilen Daten** (meist IPv6)

**Das Problem:**
- Mobile Netzwerke (4G/5G) bevorzugen IPv6
- Ihre A-Records liefern kein IPv6 (AAAA)
- → Mobile Nutzer können die Website nicht erreichen

**Die Lösung:**
- ALIAS/ANAME → GitHub Pages liefert automatisch IPv4 + IPv6
- → Website funktioniert auf allen Netzwerken

## 📝 Nächste Schritte

1. **JETZT:** Überprüfen Sie, ob ALIAS/ANAME im Dropdown verfügbar ist
2. **Falls JA:** Folgen Sie der Anleitung in [DNS_IPV6_KONFIGURATION.md](DNS_IPV6_KONFIGURATION.md)
3. **Falls NEIN:** Kontaktieren Sie Hosttech Support oder wechseln Sie zu Cloudflare

## ❓ Fragen?

Falls Sie unsicher sind oder Fragen haben:
- Machen Sie einen Screenshot vom Record-Dropdown
- Teilen Sie uns mit, welche Optionen verfügbar sind
- Wir helfen Ihnen weiter!

---

**© 2025 Blacklodge - Technische Dokumentation**
