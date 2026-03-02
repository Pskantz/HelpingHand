import { Check } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const services = [
  'Barnpassning',
  'Hämtning från förskola eller skola',
  'Städning, disk och tvätt',
  'Matinköp',
  'Matlagning',
  'Läxhjälp',
  'Trädgårdshjälp',
  'Montering av möbler',
  'Byte av bildäck',
  'Eventpersonal',
  'Katt & hundvakt',
];

export function ServicesList() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          
        <p className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 max-w-3xl mx-auto">
  Vi erbjuder ett brett utbud av tjänster för att göra din vardag enklare.
</p>
        </ScrollReveal>

        <StaggerContainer 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          staggerDelay={0.05}
        >
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors group cursor-default">
                <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium text-sm">{service}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
