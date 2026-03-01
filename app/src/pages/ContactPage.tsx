import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/sections/ContactSection';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
