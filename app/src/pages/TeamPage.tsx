import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TeamSection } from '@/sections/TeamSection';

import { useEffect } from 'react';

export function TeamPage() {
  useEffect(() => {
    // ensure we start at top when navigating to this route
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
