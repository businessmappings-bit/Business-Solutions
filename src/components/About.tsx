import { motion } from 'motion/react';
import { Shield, Trees, Users, Award, Heart } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Users className="text-[#0EA5E9]" size={24} />,
      title: 'Ambiente Familiar',
      description: 'Espaço planejado com toda a segurança e afeto para receber famílias de todas as gerações, propiciando lazer integrado.',
    },
    {
      icon: <Trees className="text-[#D4A017]" size={24} />,
      title: 'Natureza Intocada',
      description: 'Preservação florestal exemplar em Sipaliwini. Desfrute da mata, da fauna local e do ar mais puro do Suriname.',
    },
    {
      icon: <Shield className="text-[#0EA5E9]" size={24} />,
      title: 'Lazer & Segurança',
      description: 'Área de banho monitorada e vigilância completa para sua total tranquilidade.',
    },
    {
      icon: <Award className="text-[#D4A017]" size={24} />,
      title: 'Conforto de Alto Padrão',
      description: 'Chalés elegantes equipados com camas confortáveis e espaço para sua total privacidade e descanso.',
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-[#020D0D] border-t border-b border-[#0F766E]/20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-[#0F766E]/20 border border-[#0F766E]/30 rounded-full px-4 py-1.5 mb-4"
          >
            <Heart size={14} className="text-[#0EA5E9] animate-pulse" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-[#E0F2F1]">
              Quem Somos
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-6"
          >
            Bem-vindo ao <span className="text-[#D4A017]">Aqua</span> <span className="text-[#0EA5E9] font-sans font-black uppercase">Azul Beach</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-lg text-gray-300 leading-relaxed font-light"
          >
            Localizado no distrito de Sipaliwini, no coração do Suriname, somos um balneário de conceito premium que combina harmonia perfeita entre o lazer tropical e a floresta nativa preservada.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text and Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <h3 className="font-serif font-bold text-2xl text-[#E0F2F1] leading-relaxed italic">
                Uma experiência exclusiva de paz, frescor e conexão com a mata tropical.
              </h3>
              <p className="font-sans text-gray-400 leading-relaxed">
                Nascemos do desejo de criar um santuário de descanso luxuoso e seguro no Suriname. Oferecemos uma estrutura sofisticada que respeita o ecossistema, combinando uma linda área de banho de águas calmas, chalés projetados com carinho, restaurante de alto nível e uma hospitalidade inigualável.
              </p>
              <p className="font-sans text-gray-400 leading-relaxed">
                Seja para passar o dia relaxando nas nossas piscinas e praias de lago ou para desfrutar de uma estadia romântica e inesquecível nos nossos chalés de madeira premium, o Aqua Azul Beach é o destino definitivo para momentos memoráveis.
              </p>
            </motion.div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#041F1F] p-5 rounded-2xl border border-[#0F766E]/20 shadow-sm hover:border-[#0EA5E9]/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#020D0D] flex items-center justify-center mb-4 group-hover:bg-[#0EA5E9]/10 group-hover:scale-105 transition-all">
                    {feat.icon}
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white mb-2">
                    {feat.title}
                  </h4>
                  <p className="font-sans text-sm text-gray-400 leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Premium Stacked Image Showcase */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square max-w-md mx-auto"
            >
              {/* Back Decorative Pattern */}
              <div className="absolute -top-4 -left-4 w-72 h-72 border-4 border-[#D4A017]/30 rounded-3xl -z-10" />

              {/* Main Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border-4 border-[#0F766E]/30">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                  alt="Lazer no Balneário"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping Floating Small Image */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-8 -left-8 w-48 sm:w-56 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0F766E]/30 hidden sm:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80"
                  alt="Drinks no Balneário"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Float Rating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-[#020D0D]/95 text-white rounded-2xl p-4 shadow-2xl border border-[#0F766E]/30"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-[#D4A017] text-lg">★</span>
                  <span className="text-[#D4A017] text-lg">★</span>
                  <span className="text-[#D4A017] text-lg">★</span>
                  <span className="text-[#D4A017] text-lg">★</span>
                  <span className="text-[#D4A017] text-lg">★</span>
                </div>
                <p className="font-serif font-bold text-sm mt-1 text-[#D4A017]">Refúgio Premium</p>
                <p className="font-sans text-[10px] text-gray-400">Distrito de Sipaliwini</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
