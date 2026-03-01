# HelpingHand - Admin Guide

## 🌐 Din hemsida
**Live URL:** https://nrx4gbpha5pja.ok.kimi.link

---

## 🔐 Admin-sidan
**URL:** https://nrx4gbpha5pja.ok.kimi.link/admin

### Logga in
- **Lösenord:** `helpinghand2024`

### Vad du kan göra på admin-sidan:
1. **Lägg till medarbetare**
   - Namn och roll (obligatoriskt)
   - Initialer (valfritt - används om ingen bild laddas upp)
   - Välj färg för profilen
   - Ladda upp bild (valfritt)
   - Beskrivning/bio (valfritt)

2. **Ta bort medarbetare**
   - Klicka på papperskorgen bredvid medarbetaren

3. **Bilder**
   - Klicka på "Välj bild" för att ladda upp från din dator
   - Bilder sparas automatiskt

---

## 📧 Kontaktformulär - Så skickas mail

För närvarande visar kontaktformuläret bara ett meddelande. För att faktiskt skicka mail behöver du:

### Alternativ 1: EmailJS (Rekommenderas - Gratis)
1. Gå till https://www.emailjs.com/
2. Skapa ett konto (gratis)
3. Skapa en "Email Service" (t.ex. Gmail)
4. Skapa en "Email Template"
5. Få din API-nyckel
6. Uppdatera koden i `src/sections/ContactSection.tsx`

### Alternativ 2: Supabase (mer avancerat)
Jag har redan satt upp Supabase-anslutningen. Du kan använda den för att:
- Spara kontaktformulär i databasen
- Skicka mail via Supabase Edge Functions

---

## 🖼️ Så lägger du till bilder

### 1. Hero-bilden (bakgrundsbilden)
- Byt ut filen `/public/hero-bg.jpg`
- Ladda upp en ny bild med samma namn
- Rekommenderad storlek: 1920x1080 px

### 2. Medarbetarbilder
- Gå till admin-sidan: `/admin`
- Klicka på "Lägg till medarbetare"
- Klicka på "Välj bild" och välj en bild från din dator
- Bilden visas automatiskt på hemsidan

### 3. Andra bilder
- Lägg bilder i mappen `/public/`
- Referera till dem med `/bildnamn.jpg` i koden

---

## 💻 Så arbetar du i VS Code

### 1. Klona/ladda ner koden
```bash
# Om du har koden på GitHub:
git clone https://github.com/ditt-namn/helpinghand.git

# Eller kopiera hela mappen från datorn
```

### 2. Installera Node.js
- Gå till https://nodejs.org/
- Ladda ner LTS-versionen
- Installera den

### 3. Installera beroenden
```bash
cd helpinghand  # gå till projektmappen
npm install      # installerar alla paket
```

### 4. Starta utvecklingsservern
```bash
npm run dev
```
- Öppna http://localhost:5173 i webbläsaren
- Nu kan du se ändringar i realtid!

### 5. Gör ändringar
- Redigera filer i VS Code
- Spara (Ctrl+S)
- Sidan uppdateras automatiskt

### 6. Bygga för produktion
```bash
npm run build
```
- Detta skapar en `dist`-mapp med färdiga filer

---

## 🌐 Så publicerar du på din domän

### Alternativ 1: Netlify (Rekommenderas - Gratis)
1. Gå till https://www.netlify.com/
2. Skapa konto (gratis)
3. Dra och släpp din `dist`-mapp
4. Få en gratis domän (t.ex. helpinghand.netlify.app)
5. Eller koppla din egen domän:
   - Gå till "Domain settings"
   - Lägg till din domän
   - Följ instruktionerna för DNS-inställningar

### Alternativ 2: Vercel (Gratis)
1. Gå till https://vercel.com/
2. Skapa konto
3. Importera från GitHub eller dra upp `dist`-mappen
4. Koppla din domän i inställningarna

### Alternativ 3: Traditionell hosting
1. Köp webbhotell (t.ex. Loopia, One.com, Binero)
2. Logga in på cPanel/FTP
3. Ladda upp filerna från `dist`-mappen
4. Peka din domän till webbhotellet

---

## 📝 Sammanfattning av ändringar

### ✅ Gjorda ändringar:
- [x] Telefonnummer: 072-019 27 23
- [x] Adress borttagen
- [x] Bokning via "hemsidan eller telefon" (inte app)
- [x] Betalning via faktura
- [x] Läxhjälp tillagd i tjänster
- [x] Eventpersonal ändrad till "barnpassning vid bröllop eller fest"
- [x] Om oss-sektion tillagd
- [x] Admin-sida skapad för medarbetare
- [x] Footer uppdaterad

---

## 🆘 Behöver du hjälp?

Om något inte fungerar:
1. Kontrollera att du är i rätt mapp (`cd helpinghand`)
2. Kör `npm install` igen
3. Kör `npm run dev` för att se felmeddelanden
4. Kontrollera konsollen i webbläsaren (F12)

---

## 📁 Viktiga filer

| Fil | Beskrivning |
|-----|-------------|
| `src/App.tsx` | Huvudappen med routing |
| `src/pages/HomePage.tsx` | Startsidan |
| `src/pages/AdminPage.tsx` | Admin-sidan |
| `src/sections/` | Alla sektioner på sidan |
| `src/components/` | Återanvändbara komponenter |
| `public/` | Bilder och statiska filer |
| `dist/` | Färdigbyggda filer för publicering |
