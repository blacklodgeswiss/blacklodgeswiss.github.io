# EmailJS Setup Anleitung für Blacklodge

## 🎯 Warum EmailJS?

EmailJS ist **deutlich spam-resistenter** als Formspree weil:
- ✅ Weniger bekannt → weniger automatische Spam-Bots
- ✅ Direkte Verbindung zu Ihrem E-Mail-Account (kein Zwischendienst)  
- ✅ Eingebaute Rate-Limiting und Spam-Schutz Features
- ✅ Kostenlos bis 200 E-Mails/Monat (mehr als genug)
- ✅ Bessere Kontrolle über E-Mail-Templates

## 🚀 Setup in 5 Minuten

### Schritt 1: EmailJS Account erstellen
1. Gehen Sie zu **https://www.emailjs.com/**
2. Klicken Sie auf **"Sign Up"**
3. Registrieren Sie sich mit **the.blacklodge@outlook.com**
4. Bestätigen Sie Ihre E-Mail-Adresse

### Schritt 2: E-Mail Service hinzufügen
1. In Ihrem EmailJS Dashboard: **"Email Services"** → **"Add New Service"**
2. Wählen Sie **"Outlook"** (da Sie Outlook verwenden)
3. **Service ID eingeben:** `outlook_blacklodge` (merken Sie sich diesen!)
4. **Outlook-Zugangsdaten eingeben:**
   - E-Mail: `the.blacklodge@outlook.com`
   - Passwort: Ihr Outlook-Passwort
5. **"Create Service"** klicken

### Schritt 3: E-Mail Template erstellen
1. **"Email Templates"** → **"Create New Template"**
2. **Template ID:** `contact_form_blacklodge` (merken!)
3. **Subject:** `Neue Kontaktanfrage von {{from_name}}`
4. **Content (HTML):**

```html
<h2>Neue Kontaktanfrage über Website</h2>

<h3>Kontaktdaten:</h3>
<ul>
  <li><strong>Name:</strong> {{from_name}}</li>
  <li><strong>E-Mail:</strong> {{from_email}}</li>
  <li><strong>Telefon:</strong> {{phone}}</li>
</ul>

<h3>Event-Details:</h3>
<ul>
  <li><strong>Event-Art:</strong> {{event_type}}</li>
  <li><strong>Datum:</strong> {{event_date}}</li>
  <li><strong>Ort:</strong> {{location}}</li>
  <li><strong>Gäste:</strong> {{guests}}</li>
  <li><strong>Services:</strong> {{services}}</li>
  <li><strong>Budget:</strong> {{budget}}</li>
</ul>

<h3>Nachricht:</h3>
<p>{{message}}</p>

<hr>
<p><small>Diese E-Mail wurde automatisch über das Kontaktformular auf blacklodge.ch gesendet.</small></p>
```

5. **"Save"** klicken

### Schritt 4: API Keys kopieren
1. Gehen Sie zu **"Integration"**
2. Kopieren Sie diese 3 Werte:

```
Public Key: [Ihr Public Key]
Service ID: outlook_blacklodge  
Template ID: contact_form_blacklodge
```

### Schritt 5: Website konfigurieren
Öffnen Sie `assets/js/emailjs-config.js` und ersetzen Sie:

```javascript
// Ihre EmailJS Public Key (get from EmailJS dashboard)
publicKey: 'HIER_IHR_PUBLIC_KEY', 

// Ihre EmailJS Service ID (email provider)  
serviceId: 'outlook_blacklodge',

// Ihre EmailJS Template ID
templateId: 'contact_form_blacklodge',
```

## 🛡️ Integrierter Spam-Schutz

Ihr neues System hat **mehrschichtige Spam-Abwehr:**

### 1. Honeypot-Falle
- Verstecktes Feld `website_url` 
- Spam-Bots füllen es aus → E-Mail wird blockiert
- Echte Benutzer sehen es nie

### 2. Rate-Limiting  
- Max. 3 E-Mails pro Stunde pro Browser
- 20 Minuten Wartezeit zwischen E-Mails
- Verhindert E-Mail-Bomben

### 3. EmailJS Schutz
- Eingebaute Spam-Filter
- Domain-Whitelist möglich
- Weniger Bot-Angriffe als Formspree

## 🎯 Nach dem Setup

**Das Formular wird automatisch:**
1. ✅ Zuerst EmailJS versuchen (sicherer)
2. ✅ Bei Fehler: Formspree als Fallback
3. ✅ Alle Spam-Schutz-Maßnahmen anwenden
4. ✅ E-Mails direkt an `the.blacklodge@outlook.com` senden

## 🔧 Testen

1. Öffnen Sie Ihre Website
2. Füllen Sie das Kontaktformular aus
3. Senden Sie es ab
4. Prüfen Sie Ihr Outlook-Postfach

## 💡 Vorteile gegenüber Formspree

| Feature | EmailJS | Formspree |
|---------|---------|-----------|
| **Spam-Resistenz** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Kostenlose E-Mails** | 200/Monat | 50/Monat |
| **E-Mail Templates** | ✅ Vollständig | ❌ Begrenzt |
| **Direkte Integration** | ✅ Ihr Outlook | ❌ Zwischendienst |
| **Bot-Schutz** | ✅ Eingebaut | ⚠️ Basis |

## 🆘 Support

Bei Problemen:
1. Prüfen Sie die Browser-Konsole (F12)
2. Testen Sie die EmailJS-Konfiguration
3. Das Formspree-Fallback funktioniert weiterhin

**Viel weniger Spam, bessere Kontrolle! 🎉**