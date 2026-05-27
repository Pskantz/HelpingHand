import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, Check, Calendar, CreditCard, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollReveal } from '@/components/ScrollReveal';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('AGQakIU8erV0lq75x');

const bookingTerms = [
  { icon: Calendar, text: 'Bokning via hemsidan eller telefon' },
  { icon: Check, text: 'Bokning är bindande' },
  { icon: CreditCard, text: 'Betalning via faktura' },
  { icon: Clock, text: 'Avbokning senast 24 timmar före uppdrag' },
  { icon: AlertCircle, text: 'Sen avbokning debiteras' },
];

export function ContactSection() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const medarbetare = params.get('medarbetare') || '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: medarbetare ? `Jag vill boka ${medarbetare} för uppdrag.` : '',
    helpTypes: [] as string[],
  });
  const [sending, setSending] = useState(false);
  // Om medarbetare ändras i URL, uppdatera meddelandet om det är tomt eller matchar förra medarbetaren
  useEffect(() => {
    if (medarbetare) {
      setFormData((prev) => {
        // Endast sätt om meddelandet är tomt eller redan förifyllt med annan medarbetare
        if (!prev.message || prev.message.startsWith('Jag vill boka')) {
          return {
            ...prev,
            message: `Jag vill boka ${medarbetare} för uppdrag.`
          };
        }
        return prev;
      });
    }
  }, [medarbetare]);

  // Ingen automatisk förifyllning av namn längre

  const helpOptions = [
    'Barnvakt',
    'Bartender',
    'Servitris/servitör',
    'Eventpersonal',
    'Hundvakt/kattvakt',
    'Hantverkare',
    'Hemstädning',
    'Bröllop',
    'Annat',
  ];

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const exists = prev.helpTypes.includes(option);
      return {
        ...prev,
        helpTypes: exists
          ? prev.helpTypes.filter((o) => o !== option)
          : [...prev.helpTypes, option],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Fyll i namn, email och meddelande');
      return;
    }

    setSending(true);

    try {
      const result = await emailjs.send('service_deql5wj', 'template_96jxkv9', {
        to_email: 'info@helpinghandsverige.se',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        help_types: formData.helpTypes.join(', '),
      });

      if (result.status === 200) {
        toast.success('Tack för ditt meddelande! Vi hör av oss snart.');
        setFormData({ name: '', email: '', phone: '', message: '', helpTypes: [] });
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Kunde inte skicka meddelandet. Försök igen senare.');
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
                {medarbetare && (
                  <div className="mb-2 p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 font-medium">
                    <span>Du bokar: <b>{medarbetare}</b></span>
                  </div>
                )}
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
                {/* DUBBEL SEKTION BORTTAGEN */}
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
                  <Label className="text-gray-700 font-medium mb-2 block">
                    Vad behöver du hjälp med?
                  </Label>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {helpOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.helpTypes.includes(option)}
                          onChange={() => handleCheckboxChange(option)}
                          className="accent-teal w-5 h-5"
                        />
                        <span className="text-gray-700 text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium mb-2 block">
                    Meddelande
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Skriv ditt meddelande här..."
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
                  className="w-full bg-teal hover:bg-teal-dark text-white py-6 text-base font-semibold rounded-xl transition-all hover:scale-[1.02]"
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
