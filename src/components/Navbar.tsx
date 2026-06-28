import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active section detection
      const sections = ['hero', 'sobre', 'chales', 'reservas', 'estrutura', 'galeria', 'avaliacoes', 'blog', 'localizacao'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#hero', id: 'hero' },
    { name: 'Sobre', href: '#sobre', id: 'sobre' },
    { name: 'Chalés', href: '#chales', id: 'chales' },
    { name: 'Reservas', href: '#reservas', id: 'reservas' },
    { name: 'Estrutura', href: '#estrutura', id: 'estrutura' },
    { name: 'Galeria', href: '#galeria', id: 'galeria' },
    { name: 'Avaliações', href: '#avaliacoes', id: 'avaliacoes' },
    { name: 'Blog', href: '#blog', id: 'blog' },
    { name: 'Localização', href: '#localizacao', id: 'localizacao' },
  ];

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020D0D]/95 backdrop-blur-md shadow-lg border-b border-[#0F766E]/30 py-3'
          : 'bg-gradient-to-b from-[#020D0D]/95 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0F766E] to-[#0EA5E9] flex items-center justify-center shadow-lg shadow-[#0EA5E9]/20 group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-white text-base">AA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-tight text-[#D4A017] font-bold group-hover:text-white transition-colors">
                AQUA <span className="text-[#0EA5E9]">AZUL</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#0F766E] font-bold leading-none mt-1">
                Resort & Balneário
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full font-display text-xs uppercase tracking-widest font-medium transition-all ${
                  activeSection === link.id
                    ? 'text-[#D4A017] bg-[#0F766E]/20 border border-[#0F766E]/40'
                    : 'text-gray-300 hover:text-[#D4A017] hover:bg-[#0F766E]/10'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden sm:block">
            <a
              id="nav-cta"
              href="#reservas"
              className="inline-flex items-center space-x-2 bg-[#D4A017] hover:bg-[#B4800F] text-white font-display text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-full shadow-lg shadow-[#D4A017]/20 hover:shadow-[#D4A017]/40 transition-all transform hover:-translate-y-0.5"
            >
              <Phone size={14} className="text-white" />
              <span>Reservar Online</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slidedown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#020D0D]/95 border-b border-[#0F766E]/30 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-display text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? 'text-[#D4A017] bg-[#041F1F] border-l-4 border-[#D4A017]'
                      : 'text-gray-300 hover:text-[#D4A017] hover:bg-[#0F766E]/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-[#0F766E]/20 px-4">
                <a
                  id="mobile-nav-cta"
                  href="#reservas"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full bg-[#D4A017] text-white font-display text-sm font-semibold py-3.5 rounded-xl shadow-lg shadow-[#D4A017]/20"
                >
                  <Phone size={18} />
                  <span>Reservar Online</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
