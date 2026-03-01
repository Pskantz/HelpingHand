import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JobApplicationForm } from '@/components/JobApplicationForm';

export function JobsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="mb-12">
            <h1 className="font-heading text-4xl font-bold mb-4 text-gray-900">Jobba hos oss</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Vill du bli en del av HelpingHand-team? Vi söker engagerade och omtänksamma medarbetare. Fyll i formuläret nedan för att skicka in din ansökan!
            </p>
          </div>
          <JobApplicationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
