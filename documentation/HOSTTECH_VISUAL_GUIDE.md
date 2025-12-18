# 📸 Hosttech DNS: Visuelle Anleitung basierend auf Ihrem Screenshot

## Ihr aktuelles Setup (wie im Screenshot gezeigt)

### 🔴 Problem: Nur IPv4 (A-Records)

Ihr Screenshot zeigt:

```
┌─────────────────────────────────────────────────────────┐
│ A Records                                               │
├──────────────────┬──────────────────┬──────┬───────────┤
│ Host             │ IP Adresse       │ TTL  │ Aktion    │
├──────────────────┼──────────────────┼──────┼───────────┤
│ blacklodge.ch    │ 185.199.108.153  │ 3600 │ ❌ Löschen │
│ blacklodge.ch    │ 185.199.111.153  │ 3600 │ ❌ Löschen │
│ blacklodge.ch    │ 185.199.109.153  │ 3600 │ ❌ Löschen │
│ blacklodge.ch    │ 185.199.110.153  │ 3600 │ ❌ Löschen │
└──────────────────┴──────────────────┴──────┴───────────┘
```

**Das Problem:**
- ✅ IPv4 funktioniert (WLAN)
- ❌ IPv6 fehlt (mobile Daten)

### ✅ Was funktioniert: CNAME für www

```
┌─────────────────────────────────────────────────────────┐
│ CNAME Records                                           │
├──────────────────┬──────────────────────────┬──────────┤
│ Host             │ Canonical Name           │ TTL      │
├──────────────────┼──────────────────────────┼──────────┤
│ www.blacklodge.ch│ blacklodgeswiss.github.io│ 3600     │
└──────────────────┴──────────────────────────┴──────────┘
```

**Das ist gut!** Der www-Subdomain hat IPv6-Support, weil CNAME auf GitHub Pages zeigt.

---

## 🎯 Was wir ändern müssen

### Schritt 1: Record-Typ-Dropdown überprüfen

In Ihrem Screenshot sehen wir oben:
```
┌──────────────────────────────────────────────┐
│ Record hinzufügen                            │
│                                              │
│ [A        ▼]  Record  [Hinzufügen]          │
│                                              │
└──────────────────────────────────────────────┘
```

**WICHTIG: Klicken Sie auf das Dropdown `[A ▼]`**

### Schritt 2: Was Sie suchen

Öffnen Sie das Dropdown und suchen Sie nach:

#### ✅ Option 1: ALIAS ist verfügbar
```
┌──────────────────┐
│ A                │
│ AAAA             │
│ CNAME            │
│ MX               │
│ TXT              │
│ SPF              │
│ SRV              │
│ ALIAS        ← 👍 │  PERFEKT! Verwenden Sie das!
│ NS               │
└──────────────────┘
```

#### ✅ Option 2: ANAME ist verfügbar
```
┌──────────────────┐
│ A                │
│ AAAA             │
│ ANAME        ← 👍 │  AUCH GUT! Verwenden Sie das!
│ CNAME            │
│ MX               │
│ TXT              │
└──────────────────┘
```

#### ❌ Option 3: Nur Standard-Records
```
┌──────────────────┐
│ A                │
│ AAAA             │
│ CNAME            │
│ MX               │
│ TXT              │
│ NS               │
│ SRV              │
└──────────────────┘
```
PROBLEM: Kein ALIAS/ANAME verfügbar
→ Siehe "Alternative Lösungen" unten

---

## 🔧 Wenn ALIAS/ANAME verfügbar ist

### Die Änderung in Ihrem Hosttech-Interface:

#### VORHER (aktuell - ❌):
```
A Records:
┌──────────────────┬──────────────────┐
│ blacklodge.ch    │ 185.199.108.153  │  ← Löschen
│ blacklodge.ch    │ 185.199.111.153  │  ← Löschen
│ blacklodge.ch    │ 185.199.109.153  │  ← Löschen
│ blacklodge.ch    │ 185.199.110.153  │  ← Löschen
└──────────────────┴──────────────────┘
```

#### NACHHER (gewünscht - ✅):
```
ALIAS Records:
┌──────────────────┬─────────────────────────────┐
│ blacklodge.ch (@)│ blacklodgeswiss.github.io   │  ← Hinzufügen
└──────────────────┴─────────────────────────────┘

CNAME Records (unverändert):
┌──────────────────┬─────────────────────────────┐
│ www.blacklodge.ch│ blacklodgeswiss.github.io   │  ← Behalten
└──────────────────┴─────────────────────────────┘
```

### So sieht das neue Formular aus:

```
┌────────────────────────────────────────────────────────┐
│ Record hinzufügen                                      │
│                                                        │
│ Typ:  [ALIAS      ▼]                                  │
│                                                        │
│ Host: [@         ] oder [blacklodge.ch]               │
│                                                        │
│ Ziel: [blacklodgeswiss.github.io                    ] │
│                                                        │
│ TTL:  [3600      ]                                    │
│                                                        │
│          [Speichern]  [Abbrechen]                     │
└────────────────────────────────────────────────────────┘
```

**Wichtig:**
- **Host:** `@` oder leer (für Apex-Domain blacklodge.ch)
- **Ziel:** `blacklodgeswiss.github.io` (OHNE https://)
- **TTL:** `3600` (1 Stunde)

---

## 🚨 Alternative: Falls ALIAS/ANAME NICHT verfügbar

### Option 1: Hosttech Support fragen

**Kontakt:**
- Tel: +41 61 279 63 63
- E-Mail: support@hosttech.ch

**Fragen Sie:**
> "Guten Tag,
> 
> Ich benötige ALIAS- oder ANAME-Records für meine Apex-Domain blacklodge.ch,
> um IPv6-Support für meine GitHub Pages Website zu aktivieren.
> 
> Bietet Hosttech diese Record-Typen an? Falls ja, wie kann ich sie erstellen?
> 
> Vielen Dank!"

### Option 2: Zu Cloudflare wechseln

Cloudflare ist **kostenlos** und unterstützt CNAME Flattening automatisch.

**Vorteile:**
- ✅ Kostenlos
- ✅ IPv6 automatisch
- ✅ CDN (schnellere Website)
- ✅ DDoS-Schutz
- ✅ Bessere Performance

**Anleitung:** → [DNS_IPV6_KONFIGURATION.md](DNS_IPV6_KONFIGURATION.md) (Abschnitt "Alternative: Cloudflare DNS")

---

## ✅ Nach der Änderung testen

### Test 1: DNS überprüfen (Terminal/CMD)

```bash
# IPv4 sollte funktionieren:
nslookup -type=A blacklodge.ch

# IPv6 sollte jetzt auch funktionieren:
nslookup -type=AAAA blacklodge.ch
```

### Test 2: Mit unseren Tools

```bash
# Linux/Mac:
./check-ipv6-support.sh

# Windows:
check-ipv6-support.bat
```

### Test 3: Auf dem Handy

1. **WLAN ausschalten**
2. **Mobile Daten einschalten** (4G/5G)
3. **Browser öffnen:** https://blacklodge.ch
4. **Sollte laden!** ✅

---

## 📋 Zusammenfassung

| Was                    | Jetzt (Screenshot)        | Gewünscht           |
|------------------------|---------------------------|---------------------|
| **Record-Typ**         | A (statisch, IPv4 only)   | ALIAS (dynamisch)   |
| **IPv4**               | ✅ Funktioniert           | ✅ Funktioniert     |
| **IPv6**               | ❌ Fehlt                  | ✅ Funktioniert     |
| **WLAN**               | ✅ Funktioniert           | ✅ Funktioniert     |
| **Mobile Daten (4G/5G)**| ❌ Funktioniert nicht    | ✅ Funktioniert     |

---

## 🎯 Ihr nächster Schritt

1. **JETZT:** Klicken Sie auf das Dropdown `[A ▼]` in Hosttech
2. **Suchen:** Nach ALIAS oder ANAME
3. **Falls gefunden:** → [DNS_IPV6_KONFIGURATION.md](DNS_IPV6_KONFIGURATION.md)
4. **Falls nicht gefunden:** → Hosttech Support kontaktieren oder Cloudflare verwenden

---

**© 2025 Blacklodge - Technische Dokumentation**
