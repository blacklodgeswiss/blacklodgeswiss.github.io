Klar, hier sind klare, schlanke **Website-Instructions** für **Blacklodge** – modern, minimal, schnell umzusetzen.

# 1) Ziel & Stil

* **Ziel:** Leads generieren (Buchungsanfragen), Portfolio zeigen (Events, Drinks, 360 Booth, Photo Box).
* **Look & Feel:** Minimal, dunkel auf hell oder umgekehrt; viel Weißraum; max. 2 Akzentfarben; runde Ecken, sanfte Schatten.
* **Ton:** Kurz, selbstbewusst, serviceorientiert. Keine Romane.

# 2) Sitemap (einseitig oder Multi-Page)

**Variante A – One-Pager**

1. Hero
2. Leistungen (Cocktail & Bar / 360 Booth / Photo Box)
3. Katalog (optional)
4. Instagram Feed
5. Referenzen/Logos/Rezensionen
6. Kontaktformular
7. Footer: Impressum, Datenschutz, Social, E-Mail/Telefon

**Variante B – Multi-Page**

* Start
* Leistungen

  * Cocktail & Bar
  * 360 Booth
  * Photo Box
* Katalog (optional)
* Galerie/Instagram
* Kontakt
* Impressum + Datenschutz

# 3) Inhalt & Copy (Kurztexte als Vorlage)

**Hero**

* Headline: „Blacklodge – Mobile Cocktailbar & Event-Services“
* Subline: „Premium Cocktails, 360 Booth und Photo Box – für Privat, Business & Hochzeiten.“
* CTAs: „Anfrage starten“ / „Katalog ansehen“

**Leistungen**

* **Cocktail & Bar Service**
  Kurztext (3–4 Sätze): Anzahl Bartender, mobile Bar, individuelle Karte, alkoholfrei möglich, Abrechnung/Packages.
  Bullets: Gästezahl, Dauer, Anfahrt, inkl. Equipment/Gläser, Cleanup.
* **360 Booth**
  Kurztext: 360°-Videos, Lightning-Setup, Branding-Overlay, Sofort-Sharing (QR/Airdrop/Link).
  Bullets: Aufbauzeit, Fläche, Betreuer:in, Dateien, Branding.
* **Photo Box**
  Kurztext: DSLR oder App-Stabil, Sofortdruck optional, Requisiten, Online-Galerie.
  Bullets: Drucke pro Stunde, Layouts, Hintergrund, Branding.

**Katalog (optional)**

* Download-Button (PDF) + kurze Übersicht: „Signature Drinks“, „Non-Alcoholic“, „Packages“.

**Instagram**

* Einbettung des Feeds von: `https://www.instagram.com/_the.black.lodge_/`

  * Button „Folgen auf Instagram“.

**Referenzen**

* 6–8 Eventfotos (authentisch, keine Stockfotos).
* Logos (falls vorhanden), 1–2 Kundenstimmen (1–2 Sätze).

**Kontakt**

* Kurzer Pitch + Formular (siehe unten).

# 4) Kontaktformular (Felder)

* Vor- und Nachname (Pflicht)
* E-Mail (Pflicht)
* Telefon (optional, aber empfohlen)
* Anlass (Dropdown: Privat / Geschäftlich / Hochzeit / Sonstiges)
* Service (Checkboxen: Cocktail & Bar / 360 Booth / Photo Box)
* Datum/Uhrzeit (Date & Time)
* Ort/PLZ (Text)
* Gästezahl (Zahl)
* Budgetrahmen (Dropdown)
* Nachricht (Freitext)
* Datenschutz-Checkbox + Einwilligung
* Absenden-Button „Unverbindlich anfragen“

**Form-Handling:**

* Server-seitig (z. B. Node/Express, PHP, Cloud Functions) → E-Mail + Speicherung (z. B. Google Sheets / Firebase).
* Spam-Schutz: Honeypot + einfache Rate-Limitierung.

# 5) Designrichtlinien

* **Typo:** Sans Serif (z. B. Inter/Manrope). H1 48–64, H2 28–32, Body 16–18 px.
* **Farben:** Schwarz/Anthrazit, Weiß, 1 Akzent (Gold/Amber oder Lila).
* **Buttons:** Primär gefüllt, Sekundär Outlined.
* **Cards:** 2xl Rounded, dezente Schatten, viel Padding.
* **Animation:** Leichtes Fade/Slide, keine „Zappeligkeit“.
* **Bilder:** 3:2 oder 4:5, WebP, <= 180 KB pro Bild.

# 6) Technik (schlank & zukunftssicher)

* **Stack:**

  * Statisch: Next.js/Remix oder Nuxt – mit ISR/SSG.
  * Styling: Tailwind CSS.
  * Form: API-Route (Next/Nuxt) + Mailer (z. B. Resend, Nodemailer).
* **Instagram-Integration:**

  * Schnell: LightWidget/Embed-Blocker-freundlicher Feed.
  * Besser: Offizielles Instagram-Basic-Display-API → Cache alle 2–6h (ISR).

# 7) SEO & Performance

* Präzise Seitentitel („Mobile Cocktailbar in [Region] – Blacklodge“)
* Meta-Description (140–160 Zeichen)
* Strukturierte Daten: `LocalBusiness` + `Product` für 360 Booth/Photo Box
* Lighthouse 90+ anstreben (Lazy-Load, Bild-Optimierung, Fonts local)
* OG-Tags (Titel, Beschreibung, Bild 1200×630)

# 8) Rechtliches (Schweiz)

* **Impressum** (Firmenname/Adresse/Kontakt/UID falls vorhanden)
* **Datenschutz** (Kontaktformular, Cookies, eingebettetes Instagram, Auftragsverarbeiter)
* Cookie-Banner nur bei Tracking/Third-Party-Embeds nötig → „Opt-in“ für Marketing.

# 9) Inhalte, die ihr liefern solltet

* 10–15 Eventfotos (vorher/nachher, Bar-Setup, Gäste, Details)
* Logo (SVG, hell/dunkel)
* Katalog-PDF (falls gewünscht)
* 3 kurze Kundenstimmen (1–2 Sätze + Name/Event)
* Preisspannen/Packages (optional)

# 10) Beispiel-Struktur (One-Pager Wireframe)

* **Header:** Logo links, Menü rechts (Leistungen, Katalog, Instagram, Kontakt)
* **Hero:** Headline, Subline, 2 CTAs, Hero-Bild/Video
* **Leistungen:** 3 Cards (Cocktail & Bar, 360 Booth, Photo Box) mit „Mehr Details“
* **Katalog:** Kurztext + Download-Button
* **Instagram:** 6–8 Kacheln + „Folgen“
* **Referenzen:** Logos + 1–2 Zitate
* **Kontakt:** Formular + Direktkontakte (Mail, Telefon, WhatsApp optional)
* **Footer:** Impressum, Datenschutz, Social

# 11) Micro-Copy Vorlagen (kurz & klar)

* CTA Primär: „Jetzt Anfrage starten“
* CTA Sekundär: „Katalog ansehen“
* Kontakt-Intro: „Erzähl uns kurz von deinem Event – wir melden uns schnell zurück.“

# 12) Nächste Schritte

1. Entscheiden: One-Pager oder Multi-Page.
2. Inhalte sammeln (Fotos, Katalog, Testimonials).
3. Farben/Schrift finalisieren.
4. Technische Umsetzung + Formular-Mailing.
5. Go-Live + Checkliste (SEO, Performance, Rechtliches).

Wenn du möchtest, erstelle ich dir darauf basierend direkt eine minimal-schöne Startseite (Next.js + Tailwind) oder schreibe dir „Copy-Texte“ für alle Sektionen, inklusive Impressum/Datenschutz-Skeleton für CH.
