import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  'RUT-avdrag – upp till 50 % rabatt',
  'HLR-utbildad personal',
  'Trygg och personlig service',
  'Flexibla tider – vi finns tillgängliga även kvällar och helger',
];

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="hem" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            {/* Tagline Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium animate-pulse-soft">
                <Sparkles className="w-4 h-4" />
                Din vardag. Vår omtanke.
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Välkommen till{' '}
              <span className="text-teal-300">HelpingHand</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl leading-relaxed"
            >
              Behöver du hjälp i vardagen eller hjälp vid ett event? HelpingHand erbjuder flexibel och professionell hjälp.
              <br />
              Vi finns här för dig när tiden inte räcker till.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => scrollToSection('#tjanster')}
                size="lg"
                className="bg-teal hover:bg-teal-dark text-white px-8 py-6 text-base font-semibold rounded-xl group transition-all hover:scale-[1.02] hover:shadow-glow"
              >
                Anlita en hjälpande hand
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Benefits Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div className="glassmorphism rounded-3xl p-8">
              <h3 className="font-heading text-2xl font-bold text-white mb-6">
                Därför väljer kunder HelpingHand
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Mobile Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="lg:hidden mt-12"
        >
          <div className="glassmorphism rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-white mb-4">
              Därför väljer kunder HelpingHand
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/90 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
