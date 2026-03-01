import { Heart, Shield, Target } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export function AboutSection() {
  return (
    <section id="om-oss" className="py-20 lg:py-28 bg-gradient-to-br from-teal-50 to-warm-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Om oss
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Main Text */}
          <ScrollReveal>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-card">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  HelpingHand – En plats för all hjälp du behöver
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  HelpingHand grundades med en tydlig vision: Att skapa en trygg och pålitlig plats där privatpersoner enkelt kan hitta flera olika tjänster – samlade på ett och samma ställe, till ett rimligt pris.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Vi vet hur vardagen kan se ut. Tiden räcker inte alltid till, och ibland behövs en extra hand. Därför ville vi bygga något mer än bara en tjänst – vi ville skapa en lösning.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Hos HelpingHand kan du hitta hjälp med barnpassning, hemservice, trädgårdsarbete, läxhjälp och mycket mer – utan att behöva vända dig till flera olika företag. En kontakt. En plattform. Flera lösningar.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Values */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Erfarenhet som gör skillnad
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Vi som grundat HelpingHand har själva arbetat inom alla de yrken vi erbjuder och därför vet vi vad som krävs för att leverera kvalitet. Med många års samlad erfarenhet förstår vi både dina behov och det gör att vi kan säkerställa hög standard, trygghet och professionalism varje gång vi hjälper dig.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Vår ambition
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Vårt mål är att göra din vardag enklare. Att bygga långsiktiga relationer och vara det självklara valet när du behöver en extra hand. HelpingHand är inte bara ett företag – alla i vårt team är familj och vänner. Vi har gått ihop för att ge dig en service som är personlig, omtänksam och tillgänglig.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-teal rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8" />
                  <p className="font-heading text-xl font-bold">
                    HelpingHand – Vi samlar hjälpen på ett ställe, så att din vardag blir enklare.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
