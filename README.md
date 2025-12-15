# Blacklodge Website

Eine moderne, responsive Website für Blacklodge – Mobile Cocktailbar & Event-Services.

## 🚨 WICHTIG: Website nicht erreichbar?

**Falls Ihre Website nur vom Heimnetzwerk aus erreichbar ist:**
- 📄 **[SOLUTION_SUMMARY.md](SOLUTION_SUMMARY.md)** - KRITISCHER BUG WURDE BEHOBEN! Lesen Sie dies zuerst.
- 📄 **[WEBSITE_NICHT_ERREICHBAR.md](WEBSITE_NICHT_ERREICHBAR.md)** - Schnell-Hilfe
- 📄 **[documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md](documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md)** - Detaillierte Anleitung

## 🎯 Überblick

Die Website präsentiert die Event-Services von Blacklodge in einem modernen, minimalistischen Design. Entwickelt nach den Anforderungen aus den Website-Instructions mit Fokus auf Lead-Generierung und Portfolio-Präsentation.

## 🚀 Features

- **Responsive One-Page Design** mit modernem Layout
- **Drei Hauptservices**: Cocktail & Bar Service, 360° Booth & PhotoBooth, Event Entertainment
- **Funktionales Kontaktformular** mit Validierung
- **Instagram Integration** (@_the.black.lodge_)
- **SEO-optimiert** mit Meta-Tags und strukturierten Daten
- **Swiss Legal Compliance** (Impressum & Datenschutz)
- **Mobile-first Approach** mit Tailwind CSS
- **Accessibility Features** und Performance-Optimierung

## 📁 Projektstruktur

```
blacklodge-swiss.github.io/
├── index.html                 # Hauptseite (One-Pager)
├── impressum.html             # Impressum (Swiss Legal)
├── datenschutz.html           # Datenschutzerklärung (Swiss Legal)
├── instrunctions.md           # Ursprüngliche Anforderungen
├── assets/
│   ├── images/
│   │   ├── logo.png          # Blacklodge Logo
│   │   ├── rollupbanner.png  # Marketing Material
│   │   └── catalog.pdf       # Blacklodge Katalog 2025
│   ├── css/
│   │   └── style.css         # Custom CSS & Animationen
│   └── js/
│       └── main.js           # JavaScript Funktionalität
```

## 🎨 Design & Technologie

### Tech Stack
- **HTML5** mit semantischen Elementen
- **Tailwind CSS** für responsives Styling
- **Vanilla JavaScript** für Interaktivität
- **Inter Font** für moderne Typografie

### Design Prinzipien
- **Minimal & Clean**: Viel Weißraum, klare Hierarchie
- **Farbschema**: Schwarz/Anthrazit + Weiß + Amber als Akzentfarbe
- **Typography**: Inter Font Family (300-700 weights)
- **Components**: Rounded corners (2xl), sanfte Schatten, Hover-Effekte
- **Mobile-First**: Optimiert für alle Bildschirmgrößen

## 📱 Sektionen

### 1. Hero Section
- Großes Blacklodge Logo
- Klare Value Proposition
- Zwei CTAs: "Jetzt Anfrage starten" + "Katalog ansehen"

### 2. Services Section
- **Cocktail & Bar Service**: Mobile Bar, Premium-Spirituosen, komplettes Setup
- **360° Booth & PhotoBooth**: Innovative Videotechnologie, Branding, Sofort-Sharing
- **Event Entertainment**: DJs, LED-Screens, Tanzchoreographie

### 3. Katalog Section
- Download des Blacklodge Katalogs 2025 (PDF)

### 4. Instagram Section
- Link zum Instagram Account (@_the.black.lodge_)
- Placeholder für Instagram Feed Integration

### 5. Kontakt Section
- Vollständiges Kontaktformular gemäß Anforderungen
- Direkte Kontaktdaten (Telefon, E-Mail)
- Form-Validierung und Spam-Schutz

## 📋 Kontaktformular Features

### Pflichtfelder
- Vor- und Nachname
- E-Mail
- Datenschutz-Zustimmung

### Optionale Felder
- Telefon
- Anlass (Dropdown: Privat/Geschäftlich/Hochzeit/Sonstiges)
- Services (Checkboxes: alle Services)
- Datum & Ort/PLZ
- Gästezahl & Budgetrahmen
- Nachricht

### Validierung
- E-Mail Format-Validierung
- Pflichtfeld-Prüfung
- Datenschutz-Zustimmung erforderlich
- Loading-State während Submission

## 📄 Legal Compliance (Schweiz)

### Impressum
- Firmendaten (vorbereitet für Anmeldung)
- Vertretungsberechtigte Person
- Haftungsausschluss
- Urheberrechtshinweise

### Datenschutzerklärung
- DSGVO-konforme Datenschutzerklärung
- Detaillierte Aufschlüsselung der Datenverarbeitung
- Betroffenenrechte
- Kontaktinformationen für Datenschutzanfragen

## 🔧 Setup & Development

### Lokale Entwicklung
```bash
# Repository clonen
git clone [repository-url]
cd blacklodge-swiss.github.io

# Mit lokalem Server öffnen (z.B. Live Server in VS Code)
# Oder mit Python
python -m http.server 8000

# Website unter http://localhost:8000 verfügbar
```

### Deployment
Die Website ist für GitHub Pages optimiert und kann direkt deployed werden:

1. Repository auf GitHub pushen
2. GitHub Pages in Repository Settings aktivieren
3. Branch `main` als Quelle wählen
4. Website ist unter `https://[username].github.io/blacklodge-swiss.github.io` verfügbar

## 🔮 Zukünftige Verbesserungen

### Geplante Features
- **Backend Integration**: Kontaktformular mit E-Mail-Versand
- **Instagram API**: Live Instagram Feed Integration  
- **Analytics**: Google Analytics oder alternative Tracking-Lösung
- **Performance**: Bild-Optimierung und Lazy Loading
- **SEO**: Erweiterte Schema.org Markup

### Technische Optimierungen
- **Contact Form Backend**: Node.js/PHP für E-Mail-Versand
- **Instagram Integration**: Instagram Basic Display API
- **Image Optimization**: WebP Format, responsive Images
- **CDN Integration**: Für bessere Performance

## 🆘 Troubleshooting

**Website nicht erreichbar oder nur vom Heimnetzwerk aus?**
- 📄 **[WEBSITE_NICHT_ERREICHBAR.md](WEBSITE_NICHT_ERREICHBAR.md)** - Sofort-Hilfe
- 📄 **[documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md](documentation/GITHUB_PAGES_ZUGANGSPROBLEM.md)** - Detaillierte Anleitung

## 📞 Kontakt & Support

Bei Fragen zur Website-Entwicklung oder technischen Problemen:

**Entwicklung:**
- Dokumentation in diesem README
- Code-Kommentare in den Dateien
- Troubleshooting Guides (siehe oben)

**Blacklodge Business:**
- Telefon: +41 79 778 48 61  
- E-Mail: the.blacklodge@outlook.com
- Instagram: [@_the.black.lodge_](https://www.instagram.com/_the.black.lodge_/)

---

**© 2025 Blacklodge. Alle Rechte vorbehalten.**

*Website entwickelt nach modernen Web-Standards mit Fokus auf Performance, Accessibility und Swiss Legal Compliance.*
