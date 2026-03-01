import { Quote } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const testimonials = [
  {
    quote: 'HelpingHand räddade verkligen min vardag. Professionella, punktliga och så omtänksamma. Jag och min dotter kände oss trygga från första stund.',
    name: 'Maria',
    initial: 'M',
    color: 'bg-rose-500',
  },
  {
    quote: 'Barnvakten var underbar med våra barn och allt fungerade jättebra.',
    name: 'Johan & Elin',
    initial: 'J',
    color: 'bg-blue-500',
  },
  {
    quote: 'Vi använde HelpingHand till vårt bröllop – både serveringspersonal och barnpassning var duktiga.',
    name: 'Sara & Amir',
    initial: 'S',
    color: 'bg-purple-500',
  },
  {
    quote: 'Så skönt att kunna lita på ett företag som verkligen bryr sig om djur. Vår hund älskar sin dagmatte!',
    name: 'Linda',
    initial: 'L',
    color: 'bg-green-500',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-teal-50 to-warm-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Fina ord från våra kunder
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Se vad våra nöjda kunder säger om oss. Din tillfredsställelse är vår högsta prioritet.
          </p>
        </ScrollReveal>

        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-teal flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center`}>
                        <span className="text-white font-heading font-bold">
                          {testimonial.initial}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        — {testimonial.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
