# Sätt upp EmailJS för kontaktformuläret

## Steg 1: Skapa EmailJS-konto
1. Gå till https://www.emailjs.com/
2. Klicka "Sign Up" (gratis konto räcker)
3. Verifiera din e-post

## Steg 2: Lägg till Email Service
1. Logga in på EmailJS
2. Gå till "Email Services"
3. Klicka "Add New Service"
4. Välj din e-postleverantör (t.ex. Gmail, Outlook)
5. Följ instruktionerna för att koppla ditt konto
6. Kopiera "Service ID" (du behöver den senare)

## Steg 3: Skapa Email Template
1. Gå till "Email Templates"
2. Klicka "Create New Template"
3. Ge den ett namn (t.ex. "HelpingHand Contact")
4. I "To Email" fältet, skriv: info@helpinghandsverige.se
5. I ämnesraden, skriv: Nytt meddelande från HelpingHand
6. I meddelandet, använd denna mall:

```
Nytt meddelande från HelpingHand hemsida:

Namn: {{name}}
E-post: {{email}}
Telefon: {{phone}}

Meddelande:
{{message}}
```

7. Spara och kopiera "Template ID"

## Steg 4: Hämta Public Key
1. Gå till "Account" → "General"
2. Kopiera "Public Key"

## Steg 5: Uppdatera koden

Öppna filen `src/sections/ContactSection.tsx` och ersätt hela innehållet med:

```tsx
import { useState } from 'react';
import { Mail, Phone, Check, Calendar, CreditCard, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollReveal } from '@/components/ScrollReveal';
import { toast } from 'sonner';

const bookingTerms = [
  { icon: Calendar, text: 'Bokning via hemsidan eller telefon' },
  { icon: Check, text: 'Bokning är bindande' },
  { icon: CreditCard, text: 'Betalning via faktura' },
  { icon: Clock, text: 'Avbokning senast 24 timmar före uppdrag' },
  { icon: AlertCircle, text: 'Sen avbokning debiteras' },
];

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'DITT_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'DITT_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'DIN_PUBLIC_KEY';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Load EmailJS
      const emailjs = await import('@emailjs/browser');
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Ej angivet',
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast.success('Tack för ditt meddelande! Vi hör av oss snart.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Något gick fel. Försök igen eller ring oss.');
      console.error('Email error:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="kontakt" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kontakta oss
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Har du frågor eller vill boka en tjänst? Fyll i formuläret nedan så hör vi av oss så snart som möjligt.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <ScrollReveal>
            <div className="bg-gray-50 rounded-3xl p-6 lg:p-10">
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                Skicka ett meddelande
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium mb-2 block">
                    Namn
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ditt namn"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white border-gray-200 focus:border-teal focus:ring-teal h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                    E-post
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@epost.se"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white border-gray-200 focus:border-teal focus:ring-teal h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium mb-2 block">
                    Telefonnummer
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Ditt telefonnummer"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white border-gray-200 focus:border-teal focus:ring-teal h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium mb-2 block">
                    Meddelande
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Beskriv vad du behöver hjälp med..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-white border-gray-200 focus:border-teal focus:ring-teal resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="w-full bg-teal hover:bg-teal-dark text-white py-6 text-base font-semibold rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {sending ? 'Skickar...' : 'Skicka meddelande'}
                </Button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-gray-50 rounded-3xl p-6 lg:p-10">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                  Kontaktuppgifter
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">E-post</p>
                      <a 
                        href="mailto:info@helpinghandsverige.se"
                        className="text-gray-900 font-medium hover:text-teal transition-colors"
                      >
                        info@helpinghandsverige.se
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Telefon</p>
                      <a 
                        href="tel:0720192723"
                        className="text-gray-900 font-medium hover:text-teal transition-colors"
                      >
                        072-019 27 23
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Terms */}
              <div className="bg-gradient-to-br from-teal-50 to-warm-cream rounded-3xl p-6 lg:p-10">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                  Bokning & villkor
                </h3>
                <ul className="space-y-4">
                  {bookingTerms.map((term, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                        <term.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-gray-700">{term.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

## Steg 6: Installera EmailJS
```bash
npm install @emailjs/browser
```

## Steg 7: Bygg om
```bash
npm run build
```

## Klart! 🎉
Nu skickas mailen faktiskt till info@helpinghandsverige.se när någon fyller i formuläret!
