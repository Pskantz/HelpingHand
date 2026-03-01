import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { ServicesList } from '@/sections/ServicesList';
import { ServiceCategories } from '@/sections/ServiceCategories';
import { CTABoxes } from '@/sections/CTABoxes';
import { AboutSection } from '@/sections/AboutSection';
import { TeamSection } from '@/sections/TeamSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { ContactSection } from '@/sections/ContactSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesList />
        <ServiceCategories />
        <CTABoxes />
        <AboutSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
