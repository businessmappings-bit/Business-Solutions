import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Car, Ship, Plane, Compass, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Location() {
  const [activeRoute, setActiveRoute] = useState<'carro' | 'barco' | 'aereo'>('carro');

  const contacts = [
    {
      icon: <Phone size={20} className="text-tropical" />,
      label: 'WhatsApp Oficial',
      value: '+597 861-5063',
      href: 'https://wa.me/5978615063',
    },
    {
      icon: <MapPin size={20} className="text-aqua" />,
      label: 'Nosso Endereço',
      value: 'Sipaliwini, Suriname',
      href: 'https://maps.google.com/?q=Sipaliwini+Suriname',
    },
    {
      icon: <Mail size={20} className="text-gold" />,
      label: 'E-mail de Atendimento',
      value: 'contato@aquaazulbeach.com',
      href: 'mailto:contato@aquaazulbeach.com',
    },
    {
      icon: <Clock size={20} className="text-tropical" />,
      label: 'Horário de Funcionamento',
      value: 'Todos os dias: 08:00 às 18:00',
      href: null,
    },
  ];

  const routes = {
    carro: {
      title: 'Rota de Carro / Estrada',
      time: 'Aprox. 3h30min de Paramaribo',
      steps: [
        'Siga pela via rápida sentido sul de Paramaribo até a rodovia de Sipaliwini.',
        'Prossiga pelas indicações de estrada pavimentada até o ponto de acesso norte.',
        'Nossa entrada principal possui placas bem sinalizadas com guias locais.',
        'Estacionamento próprio com monitoramento gratuito no local.',
      ],
    },
    barco: {
      title: 'Rota Fluvial / Barco',
      time: 'Aprox. 45min saindo do pier regional',
      steps: [
        'Embarque em lanchas rápidas credenciadas diretamente do Pier Municipal.',
        'Navegação exuberante cercada por mata nativa e pequenos cânions.',
        'Desembarque confortável no pier flutuante privativo do Aqua Azul Beach.',
        'Ideal para quem quer viver uma experiência de chegada mágica.',
      ],
    },
    aereo: {
      title: 'Voo Charter Privado',
      time: 'Aprox. 30min de Paramaribo (Zorg en Hoop)',
      steps: [
        'Voos fretados de pequenas aeronaves autorizadas sob demanda.',
        'Aterrissagem na pista rústica de Sipaliwini homologada.',
        'Nosso receptivo VIP estará aguardando para traslado terrestre de 10 min.',
        'A melhor opção para rapidez, exclusividade e vistas aéreas deslumbrantes.',
      ],
    },
  };

  return (
    <section id="localizacao" className="py-24 bg-white relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-tropical/10 rounded-full px-4 py-1.5 mb-4"
          >
            <Navigation size={14} className="text-tropical" />
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-tropical">
              Como Chegar & Contato
            </span>
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 mb-6">
            Nossa <span className="text-gradient">Localização</span> no Suriname
          </h2>

          <p className="font-sans text-lg text-slate-600 font-light">
            O Aqua Azul Beach está aninhado em uma região paradisíaca de Sipaliwini. Planeje sua viagem ou fale conosco para agendar seu translado terrestre ou fluvial.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Side: Contacts & Transit Guides */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            {/* Contacts list */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center space-x-2">
                <Compass className="text-gold" size={20} />
                <span>Canais de Atendimento</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {contacts.map((contact, idx) => {
                  const CardContent = (
                    <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group h-full">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        {contact.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="block font-sans text-xs text-slate-400 font-semibold">{contact.label}</span>
                        <span className="block font-display font-semibold text-sm text-slate-800 mt-0.5 truncate group-hover:text-tropical transition-colors">
                          {contact.value}
                        </span>
                      </div>
                    </div>
                  );

                  return contact.href ? (
                    <a key={idx} href={contact.href} target="_blank" rel="noreferrer" className="block">
                      {CardContent}
                    </a>
                  ) : (
                    <div key={idx}>{CardContent}</div>
                  );
                })}
              </div>
            </div>

            {/* Travel/Transit Tab Navigator */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <h3 className="font-display font-bold text-lg text-slate-900">Como nos Encontrar</h3>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveRoute('carro')}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      activeRoute === 'carro' ? 'bg-tropical text-white' : 'bg-white hover:bg-slate-200 text-slate-500'
                    }`}
                    title="Estrada"
                  >
                    <Car size={16} />
                  </button>
                  <button
                    onClick={() => setActiveRoute('barco')}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      activeRoute === 'barco' ? 'bg-tropical text-white' : 'bg-white hover:bg-slate-200 text-slate-500'
                    }`}
                    title="Fluvial"
                  >
                    <Ship size={16} />
                  </button>
                  <button
                    onClick={() => setActiveRoute('aereo')}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      activeRoute === 'aereo' ? 'bg-tropical text-white' : 'bg-white hover:bg-slate-200 text-slate-500'
                    }`}
                    title="Aéreo"
                  >
                    <Plane size={16} />
                  </button>
                </div>
              </div>

              {/* Steps display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoute}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900">
                      {routes[activeRoute].title}
                    </h4>
                    <span className="font-sans text-xs font-semibold text-tropical-dark block mt-0.5">
                      Tempo: {routes[activeRoute].time}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {routes[activeRoute].steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start space-x-2.5 text-slate-600 text-sm">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Creative Simulated Interactive Map */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg min-h-[400px] flex flex-col justify-between bg-slate-900 text-white group">
            {/* Interactive map visualization canvas/grid */}
            <div className="absolute inset-0 z-0 opacity-80 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] bg-slate-950 flex items-center justify-center p-8">
              {/* Rivers illustration (svg path overlay) */}
              <svg className="absolute inset-0 w-full h-full text-slate-900 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,100 Q 150,150 200,300 T 400,350 T 600,600" fill="none" stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round" className="opacity-30" />
                <path d="M 120,0 Q 220,120 280,180 T 400,280 T 600,300" fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" className="opacity-20" />
              </svg>

              {/* Animated/Glowing Pin for Aqua Azul Beach */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Ping rings */}
                <div className="absolute w-20 h-20 bg-aqua/20 rounded-full animate-ping pointer-events-none" />
                <div className="absolute w-12 h-12 bg-gold/30 rounded-full animate-pulse pointer-events-none" />
                
                {/* Marker Pin */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-tropical to-aqua flex items-center justify-center shadow-2xl border-2 border-gold cursor-pointer transform hover:scale-110 transition-transform">
                  <MapPin size={20} className="text-gold animate-bounce" />
                </div>

                <div className="bg-slate-900/90 border border-slate-700 backdrop-blur px-3 py-1.5 rounded-xl shadow-2xl mt-3 text-center min-w-[150px]">
                  <span className="block font-display font-black text-xs text-white uppercase tracking-wider">Aqua Azul Beach</span>
                  <span className="block font-mono text-[9px] text-slate-400 mt-0.5">Sipaliwini, Suriname</span>
                  <span className="block font-mono text-[8px] text-gold mt-1">Coord: 3.9782° N, 56.1243° W</span>
                </div>
              </div>

              {/* Surrounding landmarks */}
              <div className="absolute top-12 left-12 bg-slate-900/40 border border-slate-800 px-2.5 py-1 rounded-lg">
                <span className="font-display font-medium text-[10px] text-slate-400">Rio Saramacca</span>
              </div>
              <div className="absolute bottom-16 right-16 bg-slate-900/40 border border-slate-800 px-2.5 py-1 rounded-lg">
                <span className="font-display font-medium text-[10px] text-slate-400">Reserva Natural</span>
              </div>
              <div className="absolute top-1/2 left-8 bg-slate-900/40 border border-slate-800 px-2.5 py-1 rounded-lg">
                <span className="font-display font-medium text-[10px] text-slate-400">Acesso Rodoviário</span>
              </div>
            </div>

            {/* Map Header details */}
            <div className="relative z-10 p-5 bg-gradient-to-b from-slate-950 to-transparent flex justify-between items-center">
              <div>
                <span className="font-display font-extrabold text-sm tracking-wide block uppercase">Mapa de Sipaliwini</span>
                <span className="font-sans text-[10px] text-slate-400">Simulação Interativa de Satélite</span>
              </div>
              <span className="bg-emerald-500 text-slate-950 font-display font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
                Sinal Ativo
              </span>
            </div>

            {/* Map footer overlay navigation */}
            <div className="relative z-10 p-5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-center">
              <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-sm mx-auto mb-4 font-light">
                * Para comodidade, oferecemos guias locais e transporte credenciado que podem ser agendados pelo WhatsApp.
              </p>
              <a
                id="map-navigation-btn"
                href="https://wa.me/5978615063"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-tropical to-aqua hover:from-tropical-dark hover:to-aqua-dark text-white font-display text-xs font-bold px-5 py-2.5 rounded-xl shadow-md"
              >
                <Phone size={14} className="text-gold" />
                <span>Solicitar Guia de Viagem</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
