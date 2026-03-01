import { ArrowRight, HandHeart, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export function CTABoxes() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* CTA Box 1 - Hire */}
          <ScrollReveal delay={0}>
            <a
              href="#tjanster"
              className="block relative overflow-hidden rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-teal to-teal-dark group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <HandHeart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-3">
                  Anlita en hjälpande hand
                </h3>
                <p className="text-white/80 mb-6 max-w-md">
                  Upptäck våra tjänster och hitta den hjälp du behöver.
                </p>
                <span className="inline-flex items-center text-white font-semibold group-hover:gap-2 transition-all">
                  Läs mer
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            </a>
          </ScrollReveal>

          {/* CTA Box 2 - Work With Us */}
          <ScrollReveal delay={0.15}>
            <a
              href="/jobba"
              className="block relative overflow-hidden rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-warm-orange to-amber-600 group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-3">
                  Jobba hos oss
                </h3>
                <p className="text-white/80 mb-6 max-w-md">
                  Vill du bli en del av vårt team? Skicka in din ansökan idag!
                </p>
                <span className="inline-flex items-center text-white font-semibold group-hover:gap-2 transition-all">
                  Ansök nu
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
