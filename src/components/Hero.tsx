import { motion } from 'motion/react';
import { Phone, ArrowDown, MapPin, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020D0D] pt-20"
    >
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80"
          alt="Aqua Azul Beach Resort Background"
          className="w-full h-full object-cover object-center scale-105 animate-[zoom-slow_20s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to darken and enrich colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020D0D] via-[#020D0D]/60 to-[#020D0D]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020D0D]/75 via-transparent to-[#020D0D]/40" />
      </div>

      {/* Decorative Floating light reflections */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0F766E]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#E0F2F1] py-16 sm:py-24">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-[#041F1F]/90 border border-[#0F766E]/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm shadow-md"
        >
          <Sparkles size={14} className="text-[#D4A017] animate-pulse" />
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-slate-100">
            Resort de Natureza Premium
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#0EA5E9]" />
          <span className="font-display text-xs font-medium text-[#0EA5E9] flex items-center space-x-1">
            <MapPin size={12} className="inline mr-0.5 text-[#D4A017]" />
            Sipaliwini, Suriname
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="leading-[1.1] mb-6 flex flex-col items-center"
        >
          <span className="text-5xl sm:text-7xl md:text-8xl font-serif leading-[0.9] italic text-white font-bold">Aqua Azul</span>
          <span className="text-4xl sm:text-6xl md:text-7xl text-[#0EA5E9] not-italic font-sans font-black uppercase tracking-widest mt-1">Beach</span>
          <div className="w-24 h-1 bg-[#D4A017] mt-5"></div>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="max-w-2xl mx-auto font-sans text-base sm:text-xl text-[#E0F2F1]/90 leading-relaxed font-light mb-10 px-2"
        >
          Seu refúgio perfeito para relaxar, aproveitar a natureza e viver momentos inesquecíveis no coração de Suriname.
        </motion.p>

        {/* Dynamic Interactive Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <a
            id="hero-whatsapp-btn"
            href="https://wa.me/5978615063"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center space-x-3 w-full sm:w-auto px-8 py-4 bg-[#D4A017] hover:bg-[#B4800F] text-white font-display text-base font-bold rounded-xl shadow-lg shadow-[#D4A017]/20 hover:shadow-[#D4A017]/40 transition-all transform hover:-translate-y-1"
          >
            <Phone size={20} className="text-white" />
            <span>Reservar via WhatsApp</span>
          </a>

          <a
            id="hero-scroll-btn"
            href="#sobre"
            className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 bg-[#041F1F]/60 hover:bg-[#041F1F] border border-[#0F766E]/30 hover:border-[#0F766E]/60 text-slate-200 hover:text-white font-display text-base font-semibold rounded-xl backdrop-blur-sm transition-all transform hover:-translate-y-1"
          >
            <span>Conhecer Balneário</span>
            <ArrowDown size={18} className="text-[#0EA5E9] animate-bounce" />
          </a>
        </motion.div>

        {/* Extra highlights banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 sm:mt-24 pt-8 border-t border-[#0F766E]/20"
        >
          <div className="flex flex-col items-center p-3 rounded-xl bg-[#041F1F]/40 backdrop-blur-sm border border-[#0F766E]/20">
            <span className="font-display text-xl sm:text-2xl font-bold text-[#0EA5E9]">100%</span>
            <span className="font-sans text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Natureza Preservada</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-[#041F1F]/40 backdrop-blur-sm border border-[#0F766E]/20">
            <span className="font-display text-xl sm:text-2xl font-bold text-[#D4A017]">VIP</span>
            <span className="font-sans text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Chalés Preservado</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-[#041F1F]/40 backdrop-blur-sm border border-[#0F766E]/20">
            <span className="font-display text-xl sm:text-2xl font-bold text-[#0EA5E9]">Refrescante</span>
            <span className="font-sans text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Área de Banho</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-[#041F1F]/40 backdrop-blur-sm border border-[#0F766E]/20">
            <span className="font-display text-xl sm:text-2xl font-bold text-[#D4A017]">Saboroso</span>
            <span className="font-sans text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Petiscos & Drinks</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden leading-none pointer-events-none">
        <svg className="relative block w-full h-[40px] sm:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13,54.77-9.15,108.83-30.82,165.1-33.75,76-3.95,152.12,16.42,220,53.25V0Z" className="fill-[#020D0D]"></path>
        </svg>
      </div>

      <style>{`
        @keyframes zoom-slow {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
