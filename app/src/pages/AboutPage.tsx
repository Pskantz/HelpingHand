import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AboutSection } from '@/sections/AboutSection';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
