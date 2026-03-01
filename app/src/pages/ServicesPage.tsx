import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServicesList } from '@/sections/ServicesList';
import { ServiceCategories } from '@/sections/ServiceCategories';
import { CTABoxes } from '@/sections/CTABoxes';

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ServiceCategories />
        <ServicesList />
        <CTABoxes />
      </main>
      <Footer />
    </div>
  );
}
