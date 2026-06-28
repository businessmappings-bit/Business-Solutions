import { useState } from 'react';
import { STRUCTURE_DATA } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Compass, UtensilsCrossed, Sparkles, CupSoda, Trees, ShieldCheck, Check, Info } from 'lucide-react';

export default function Structure() {
  const [activeItem, setActiveItem] = useState<string | null>(STRUCTURE_DATA[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves size={24} className="text-aqua animate-pulse" />;
      case 'Compass':
        return <Compass size={24} className="text-gold" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed size={24} className="text-tropical" />;
      case 'Sparkles':
        return <Sparkles size={24} className="text-gold" />;
      case 'CupSoda':
        return <CupSoda size={24} className="text-aqua" />;
      case 'Trees':
        return <Trees size={24} className="text-tropical" />;
      case 'ShieldCheck':
        return <ShieldCheck size={24} className="text-emerald-500" />;
      default:
        return <Info size={24} className="text-slate-500" />;
    }
  };

  return (
    <section id="estrutura" className="py-24 bg-white relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-tropical/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-tropical/10 rounded-full px-4 py-1.5 mb-4"
          >
            <Sparkles size={14} className="text-tropical" />
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-tropical">
              Estrutura Completa
            </span>
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 mb-6">
            O que você vai encontrar no <span className="text-gradient">Aqua Azul</span>
          </h2>

          <p className="font-sans text-lg text-slate-600 font-light">
            Desenvolvemos uma infraestrutura de alto nível para garantir o seu absoluto conforto, segurança e entretenimento. Descubra nossas comodidades premium.
          </p>
        </div>

        {/* Layout: Sidebar and Detailed Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Interactive list triggers */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
              Explore os Espaços
            </h3>
            {STRUCTURE_DATA.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  id={`struct-btn-${item.id}`}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center space-x-4 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-slate-800 text-white shadow-lg'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-100 text-slate-800'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-slate-800' : 'bg-white shadow-sm border border-slate-100'
                    }`}
                  >
                    {getIcon(item.iconName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-base sm:text-lg truncate">
                      {item.name}
                    </h4>
                    <p
                      className={`font-sans text-xs line-clamp-1 mt-0.5 ${
                        isActive ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      isActive ? 'bg-gold text-slate-950 font-bold' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isActive ? '✓' : '→'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Rich Image / Information Display */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              {STRUCTURE_DATA.map((item) => {
                if (item.id !== activeItem) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white"
                  >
                    {/* Feature Image */}
                    <div className="relative h-[320px] sm:h-[400px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />

                      <div className="absolute top-4 left-4 bg-slate-950/80 text-white font-display text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-800/80 flex items-center space-x-2">
                        {getIcon(item.iconName)}
                        <span>{item.name}</span>
                      </div>
                    </div>

                    {/* Feature Description */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
                        <span className="font-display text-xs font-bold tracking-widest text-gold uppercase">
                          INFRAESTRUTURA COMPLETA
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                        {item.name}
                      </h3>

                      <p className="font-sans text-slate-300 leading-relaxed font-light text-base">
                        {item.description}
                      </p>

                      {/* Interactive benefits tags inside card */}
                      <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2.5">
                        <span className="bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-1 rounded-lg flex items-center space-x-1.5">
                          <Check size={12} className="text-aqua" />
                          <span>Monitoramento constante</span>
                        </span>
                        <span className="bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-1 rounded-lg flex items-center space-x-1.5">
                          <Check size={12} className="text-gold" />
                          <span>Acesso para cadeirantes</span>
                        </span>
                        <span className="bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-1 rounded-lg flex items-center space-x-1.5">
                          <Check size={12} className="text-aqua" />
                          <span>Preservação de flora</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
