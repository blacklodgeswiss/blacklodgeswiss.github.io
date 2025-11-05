# E-Mail Konfiguration für Kontaktformular

## 📧 Wohin werden die E-Mails gesendet?

Die E-Mails vom Kontaktformular werden über **Formspree** an folgende Adresse gesendet:

**Ziel-E-Mail:** `the.blacklodge@outlook.com`

## ⚙️ Formspree Setup

Das Kontaktformular verwendet Formspree (https://formspree.io) als E-Mail-Service.

**Aktueller Formspree Endpoint:** `https://formspree.io/f/xpwwqbjy`

### Wie funktioniert es?

1. **Benutzer füllt Formular aus** auf der Kontaktseite
2. **Formspree verarbeitet** die Anfrage 
3. **E-Mail wird gesendet** an `the.blacklodge@outlook.com`
4. **Bestätigung** wird dem Benutzer angezeigt

## 🔧 E-Mail-Adresse ändern

### Option 1: Formspree Dashboard (Empfohlen)
1. Gehen Sie zu https://formspree.io
2. Loggen Sie sich ein (oder erstellen Sie einen Account)
3. Finden Sie das Formular mit ID `xpwwqbjy`
4. Ändern Sie die Ziel-E-Mail-Adresse

### Option 2: Konfigurationsdatei ändern
In der Datei `assets/js/config.js`:

```javascript
contact: {
    targetEmail: 'ihre-neue-email@domain.ch',  // <- Hier ändern
    formspreeEndpoint: 'https://formspree.io/f/xpwwqbjy'
}
```

## 📋 Was wird in der E-Mail übertragen?

- **Name:** Vor- und Nachname
- **Kontakt:** E-Mail und Telefon
- **Event Details:** Art, Datum, Ort, Gästeanzahl
- **Services:** Gewünschte Services (Cocktailbar, 360° Booth, Entertainment)
- **Budget:** Budgetrahmen
- **Nachricht:** Zusätzliche Informationen
- **Antwort-E-Mail:** Automatisch gesetzt auf Benutzer-E-Mail

## 🔒 Datenschutz & Sicherheit

- **SSL-verschlüsselt** über HTTPS
- **Formspree** ist GDPR-konform
- **Keine Speicherung** von Daten auf der Website
- **Spam-Schutz** durch Formspree integriert

## 🚨 Troubleshooting

### E-Mails kommen nicht an?
1. **Spam-Ordner** überprüfen
2. **Formspree Status** überprüfen: https://status.formspree.io
3. **E-Mail-Adresse** in config.js überprüfen

### Formular funktioniert nicht?
1. **Browser-Konsole** auf Fehler überprüfen
2. **Internetverbindung** testen
3. **JavaScript** aktiviert?

## 📞 Alternative Kontaktmethoden

Falls das Formular nicht funktioniert, sind folgende Kontaktmöglichkeiten verfügbar:

- **Telefon:** +41 79 778 48 61
- **E-Mail:** the.blacklodge@outlook.com
- **Instagram:** @_the.black.lodge_

---

**Letzte Aktualisierung:** November 2025