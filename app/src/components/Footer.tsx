import { HandHeart, Mail, Phone, Facebook, Instagram } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const serviceLinks = [
  { name: 'Barn & Familj', href: '#barn-familj' },
  { name: 'Hemservice', href: '#hemservice' },
  { name: 'Läxhjälp', href: '#laxhjalp' },
  { name: 'Praktisk hjälp', href: '#praktisk-hjalp' },
  { name: 'Hund- & Kattvakt', href: '#djurpassning' },
  { name: 'Eventpersonal', href: '#event' },
];

const companyLinks = [
  { name: 'Om oss', href: '#om-oss' },
  { name: 'Anlita oss', href: '#tjanster' },
  { name: 'Jobba hos oss', href: '#jobba' },
  { name: 'Kontakt', href: '#kontakt' },
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = (href: string, page?: string) => {
    if (page && location.pathname !== page) {
      navigate(page + href);
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#hem" onClick={(e) => { e.preventDefault(); scrollToSection('#hem'); }} className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                <HandHeart className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">
                HelpingHand
              </span>
            </a>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Vi finns där när du behöver en extra hand. Trygg hjälp, precis när du behöver den.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Våra tjänster</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href, '/tjanster');
                    }}
                    className="text-gray-400 hover:text-teal transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Företaget</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => {
                // Bestäm sida baserat på länkens namn
                let page = '/';
                if (link.name === 'Om oss') page = '/om-oss';
                else if (link.name === 'Anlita oss' || link.name === 'Våra tjänster') page = '/tjanster';
                else if (link.name === 'Jobba hos oss') page = '/jobba';
                else if (link.name === 'Kontakt') page = '/kontakt';
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href, page);
                      }}
                      className="text-gray-400 hover:text-teal transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Kontakta oss</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@helpinghandsverige.se"
                  className="text-gray-400 hover:text-teal transition-colors"
                >
                  info@helpinghandsverige.se
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                <a 
                  href="tel:0720192723"
                  className="text-gray-400 hover:text-teal transition-colors"
                >
                  072-019 27 23
                </a>
              </li>
              {/* social icons under contact info */}
              <li className="flex items-center gap-4 mt-4">
                
                <a
  href="https://www.instagram.com/helpinghandsverige?igsh=czU1djl3bGg1eWtu"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors"
>
  <Instagram className="w-5 h-5" />
  <span className="font-medium">helpinghandsverige</span>
</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HelpingHand. Alla rättigheter förbehållna.
          </p>
          <div className="flex gap-6 items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-teal text-sm transition-colors"
              onClick={() => alert('Integritetspolicy\n\nVi samlar endast in de personuppgifter du själv lämnar via kontaktformuläret (namn, e-post, telefon, meddelande och valda tjänster). Uppgifterna används enbart för att hantera din förfrågan och sparas inte för marknadsföring. Du kan kontakta oss för att få dina uppgifter raderade.')}
            >
              Integritetspolicy
            </button>
            <button
              type="button"
              className="text-gray-500 hover:text-teal text-sm transition-colors"
              onClick={() => alert('Villkor\n\nBokning via hemsidan eller telefon är bindande. Betalning sker via faktura. Avbokning måste ske senast 24 timmar före uppdrag, annars debiteras du.')}
            >
              Villkor
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
