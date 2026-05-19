import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, ChevronDown, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Hem', href: '/' },
  { 
    name: 'Våra tjänster', 
    href: '/tjanster#barnvakt',
    dropdown: [
      { name: 'Barnvakt', href: '/tjanster#barnvakt' },
      { name: 'Bartender', href: '/tjanster#bartender' },
      { name: 'Servitris/servitör', href: '/tjanster#servitris-servitor' },
      { name: 'Eventpersonal', href: '/tjanster#eventpersonal' },
      { name: 'Hundvakt/kattvakt', href: '/tjanster#hundvakt-kattvakt' },
      { name: 'Hantverkare', href: '/tjanster#hantverkare' },
      { name: 'Hemstädning', href: '/tjanster#hemstadning' },
      { name: 'Bröllop', href: '/tjanster#brollop' },
    ]
  },
  { name: 'Om oss', href: '/om-oss' },
  { name: 'Vår personal', href: '/personal' },
  { name: 'Jobba hos oss', href: '/jobba' },
  { name: 'Kontakt', href: '/kontakt' },
];

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const navigateTo = (href: string) => {
    setIsMobileMenuOpen(false);

    // Internal fragment like '#id' on current page
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Path with optional fragment '/path#fragment'
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      // Navigate including the hash so components can read location.hash
      navigate(`${path}#${hash}`);
      // also attempt to scroll to the fragment after navigation
      setTimeout(() => {
        const el = document.querySelector('#' + hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }

    // Normal path
    navigate(href);
  };

  // Sätt annan färg än vit på alla sidor utom Home
  const isHome = location.pathname === '/';
  const headerBg = isHome ? 'bg-white/95' : 'bg-teal-50/95';
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 ${headerBg} backdrop-blur-md shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigateTo('/'); }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
              <HandHeart className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-gray-800">HelpingHand</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.dropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 text-gray-600 hover:text-teal hover:bg-teal-50">
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <a 
                          href={item.href}
                          onClick={(e) => { e.preventDefault(); navigateTo(item.href); }}
                          className="cursor-pointer"
                        >
                          {item.name}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); navigateTo(link.href); }}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-teal hover:bg-teal-50"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => navigateTo('/kontakt')}
              className="bg-teal hover:bg-teal-dark text-white px-6"
            >
              Boka nu
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 rounded-lg text-gray-800">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex flex-col h-full pt-8">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                    <HandHeart className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-heading font-bold text-xl text-gray-800">
                    HelpingHand
                  </span>
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); navigateTo(link.href); }}
                        className="px-4 py-3 text-gray-700 hover:text-teal hover:bg-teal-50 rounded-lg transition-colors font-medium"
                      >
                        {link.name}
                      </a>
                      {link.dropdown && (
                        <div className="ml-4 mt-1 flex flex-col gap-1">
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={(e) => { e.preventDefault(); navigateTo(item.href); }}
                              className="px-4 py-2 text-sm text-gray-600 hover:text-teal hover:bg-teal-50 rounded-lg transition-colors"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                
                <div className="mt-auto pb-8">
                  <Button 
                    onClick={() => scrollToSection('#kontakt')}
                    className="w-full bg-teal hover:bg-teal-dark text-white"
                  >
                    Boka nu
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
