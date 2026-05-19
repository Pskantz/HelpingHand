import { useState, useEffect } from 'react';
import { Baby, Home, Wrench, PawPrint, PartyPopper, ArrowRight, X, Users, Cake } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const categories = [
  {
    slug: 'barnvakt',
    icon: Baby,
    title: 'Barnvakt',
    description: 'Barnpassning och barnomsorg med trygg, erfaren personal.',
    color: 'bg-pink-100 text-pink-600',
    details: 'Vi erbjuder säker och kärleksfull barnpassning. Vår personal är erfaren, utbildad och älskar barn. Vi kan ta hand om ditt barn hemma, hämta från förskola eller skola, och organisera roliga aktiviteter.',
  },
  {
    slug: 'bartender',
    icon: PartyPopper,
    title: 'Bartender',
    description: 'Professionella bartendrar för fest, event och privata tillställningar.',
    color: 'bg-orange-100 text-orange-600',
    details: 'Våra erfarna bartendrar kan skapa cocktails, drinkar och servera på din fest eller event. De kan både bartendera och socialera med dina gäster.',
  },
  {
    slug: 'servitris-servitor',
    icon: Users,
    title: 'Servitris/servitör',
    description: 'Servispersonal som hjälper till med servering, dukning och service.',
    color: 'bg-blue-100 text-blue-600',
    details: 'Professionell servispersonal som kan hantera allt från dukning till servering och tvätt. Perfekt för middagar, fester och events.',
  },
  {
    slug: 'eventpersonal',
    icon: PartyPopper,
    title: 'Eventpersonal',
    description: 'Allt från eventplanering till stöd för möten och fester.',
    color: 'bg-purple-100 text-purple-600',
    details: 'Vi tillhandahåller eventpersonal för att göra din fest eller möte perfekt. Från barnpassning vid events till fullständig logistik och support.',
  },
  {
    slug: 'hundvakt-kattvakt',
    icon: PawPrint,
    title: 'Hundvakt/kattvakt',
    description: 'Trygg djurpassning hemma hos dig när du är borta.',
    color: 'bg-green-100 text-green-600',
    details: 'Vi älskar djur och kan passa din hund eller katt när du är borta. Vi erbjuder dagvård, promenader och omvårdnad med kärlek.',
  },
  {
    slug: 'hantverkare',
    icon: Wrench,
    title: 'Hantverkare',
    description: 'Praktiska händer för små och stora hantverksjobb i hemmet.',
    color: 'bg-yellow-100 text-yellow-600',
    details: 'Vi kan montera möbler, byta bildäck, underhålla din trädgård och mycket mer. Duktig personal med praktiska färdigheter och erfarenhet.',
  },
  {
    slug: 'hemstadning',
    icon: Home,
    title: 'Hemstädning',
    description: 'Noggrann städning av hemmet efter dina önskemål.',
    color: 'bg-cyan-100 text-cyan-600',
    details: 'Vi hjälper till med städning, disk, tvätt och hemunderhåll för att göra din vardag enklare. Vår personal är noggrann, pålitlig och omtänksam.',
  },
  {
    slug: 'brollop',
    icon: Cake,
    title: 'Bröllop',
    description: 'Servicepersonal och planering för att göra bröllopet perfekt.',
    color: 'bg-rose-100 text-rose-600',
    details: 'Vi tillhandahåller barnpassning, servispersonal och event support för att göra ditt bröllop perfekt. Låt oss hantera detaljerna medan du njuter av dagen.',
  },
];

export function ServiceCategories() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Open modal if there's a hash referring to a category slug
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const found = categories.find((c) => c.slug === hash);
      if (found) setSelectedCategory(found);
    }
  }, [location.hash]);

  // Also check for query param (when navigating from homepage)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categorySlug = params.get('kategori');
    if (categorySlug && location.pathname === '/tjanster') {
      const found = categories.find((c) => c.slug === categorySlug);
      if (found) {
        setSelectedCategory(found);
        // Scroll to modal after a brief delay to ensure it's rendered
        setTimeout(() => {
          const modal = document.querySelector('.fixed.inset-0');
          if (modal) modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        // Clean up the query param
        window.history.replaceState(null, '', '/tjanster');
      }
    }
  }, [location.pathname, location.search]);

  const handleClick = (category: typeof categories[0]) => {
    if (location.pathname === '/tjanster') {
      setSelectedCategory(category);
      return;
    }
    // Navigate to services page with query param to open specific category
    navigate(`/tjanster?kategori=${category.slug}`);
  };

  return (
    <section id="tjanster" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Våra tjänster
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Klicka på en kategori för att läsa mer och få en gratis offert.
          </p>
        </ScrollReveal>

        <StaggerContainer 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {categories.map((category, index) => (
            <StaggerItem key={index}>
              <button
                onClick={() => handleClick(category)}
                className="w-full text-left bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 group h-full"
              >
                <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-teal font-semibold text-sm group-hover:gap-2 transition-all">
                  Läs mer
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl">
              <div className="flex items-start justify-between p-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${selectedCategory.color} flex items-center justify-center flex-shrink-0`}>
                    <selectedCategory.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-gray-900">
                      {selectedCategory.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">{selectedCategory.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedCategory.details}
                </p>

                <div className="bg-teal-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Intresserad?</span> Kontakta oss för att boka eller få mer information.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="flex-1 px-4 py-3 bg-teal text-white rounded-lg font-semibold hover:bg-teal-dark transition-colors"
                  >
                    Stäng
                  </button>
                  <a
                    href="/kontakt"
                    className="flex-1 px-4 py-3 border-2 border-teal text-teal rounded-lg font-semibold hover:bg-teal hover:text-white transition-colors text-center"
                  >
                    Boka nu
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
