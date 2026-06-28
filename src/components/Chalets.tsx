import { useState, FormEvent } from 'react';
import { CHALETS_DATA } from '../data';
import { Chalet } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, Tv, Flame, Calendar, Users, Phone, X, Check, Bed, GlassWater, Landmark } from 'lucide-react';

export default function Chalets() {
  const [selectedChalet, setSelectedChalet] = useState<Chalet | null>(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [nights, setNights] = useState(1);
  const [guestsCount, setGuestsCount] = useState(2);
  const [customerName, setCustomerName] = useState('');

  const openBookingModal = (chalet: Chalet) => {
    setSelectedChalet(chalet);
    setCheckInDate(new Date().toISOString().split('T')[0]); // default to today
    setNights(2); // default to 2 nights
    setGuestsCount(chalet.id === 'chale-casal' ? 2 : chalet.id === 'chale-premium' ? 2 : 4);
    setCustomerName('');
  };

  const closeBookingModal = () => {
    setSelectedChalet(null);
  };

  const getAmenityIcon = (amenity: string) => {
    const text = amenity.toLowerCase();
    if (text.includes('wi-fi') || text.includes('starlink')) return <Wifi size={14} className="text-teal-600" />;
    if (text.includes('ar condicionado')) return <Flame size={14} className="text-sky-500 rotate-180" />; // cold flame representation
    if (text.includes('cama')) return <Bed size={14} className="text-amber-600" />;
    if (text.includes('frigobar')) return <GlassWater size={14} className="text-blue-500" />;
    if (text.includes('smart tv') || text.includes('tv')) return <Tv size={14} className="text-purple-500" />;
    return <Check size={14} className="text-emerald-500" />;
  };

  // Safe numerical pricing parsing
  const handleChaletSelect = (chalet: Chalet) => {
    window.dispatchEvent(new CustomEvent('chalet-selected', { detail: chalet.id }));
    const el = document.getElementById('reservas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNumericPrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const handleSendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedChalet) return;

    const priceNum = getNumericPrice(selectedChalet.price);
    const totalPrice = priceNum * nights;

    // Prefill date formatting
    const formattedDate = checkInDate ? checkInDate.split('-').reverse().join('/') : 'Não informada';

    const message = `Olá Aqua Azul Beach! Gostaria de consultar a disponibilidade para reserva de chalé:

🌟 *Acomodação:* ${selectedChalet.name}
👤 *Nome:* ${customerName || 'Cliente'}
📅 *Entrada:* ${formattedDate}
🌙 *Noites:* ${nights} noite(s)
👥 *Hóspedes:* ${guestsCount} pessoas
💰 *Estimativa de Valor:* $${totalPrice} (diária: ${selectedChalet.price})

Aguardo a confirmação de disponibilidade! Muito obrigado(a).`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5978615063?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    closeBookingModal();
  };

  return (
    <section id="chales" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-tropical/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-aqua/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 mb-4"
          >
            <Bed size={14} className="text-gold" />
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-gold">
              Hospedagens Exclusivas
            </span>
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-6">
            Nossos <span className="text-gradient-gold">Chalés de Madeira</span>
          </h2>

          <p className="font-sans text-lg text-slate-300 font-light">
            Vivencie o aconchego rústico com requinte moderno. Nossos chalés são cabanas ecológicas completas construídas com madeiras nobres, oferecendo isolamento e vistas majestosas da floresta e do lago.
          </p>
        </div>

        {/* Chalets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CHALETS_DATA.map((chalet, idx) => {
            const isPremium = chalet.id === 'chale-premium';
            return (
              <motion.div
                key={chalet.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`flex flex-col h-full rounded-3xl overflow-hidden bg-[#041F1F] border card-hover ${
                  isPremium
                    ? 'border-[#D4A017]/45 shadow-lg shadow-[#D4A017]/5'
                    : 'border-[#0F766E]/20'
                }`}
              >
                {/* Image & Price Tag */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={chalet.image}
                    alt={chalet.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020D0D] via-transparent to-transparent" />

                  {/* Rating / Tag */}
                  {isPremium ? (
                    <div className="absolute top-4 left-4 bg-[#D4A017] text-white font-serif text-xs font-bold px-3.5 py-1 rounded-full shadow-lg">
                      Acomodação VIP
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4 bg-[#020D0D]/90 text-[#0EA5E9] font-sans text-[10px] uppercase tracking-widest font-bold px-3.5 py-1 rounded-full border border-[#0F766E]/30">
                      Balneário Resort
                    </div>
                  )}

                  {/* Consultation price tag */}
                  <div className="absolute bottom-4 right-4 bg-[#020D0D]/90 border border-[#0F766E]/30 px-4.5 py-2 rounded-2xl">
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-[#D4A017]">Sob Consulta</span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-2xl text-white">
                        {chalet.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 bg-[#020D0D] border border-[#0F766E]/30 px-2.5 py-1 rounded-lg">
                        <Users size={14} className="text-[#0EA5E9]" />
                        <span className="font-sans text-xs text-gray-300 font-medium">{chalet.capacity}</span>
                      </div>
                    </div>

                    <p className="font-sans text-sm text-gray-300 leading-relaxed min-h-[72px]">
                      {chalet.description}
                    </p>

                    {/* Amenities Checklist */}
                    <div className="pt-4 border-t border-[#0F766E]/20">
                      <h4 className="font-display text-xs font-semibold text-[#D4A017] uppercase tracking-wider mb-3">
                        Comodidades Inclusas
                      </h4>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-2.5">
                        {chalet.amenities.map((amenity, key) => (
                          <div key={key} className="flex items-center space-x-2 text-xs text-gray-300">
                            <span className="w-5 h-5 rounded-md bg-[#020D0D] flex items-center justify-center">
                              {getAmenityIcon(amenity)}
                            </span>
                            <span className="truncate">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Trigger Button */}
                  <div className="mt-8">
                    <button
                      id={`book-btn-${chalet.id}`}
                      onClick={() => handleChaletSelect(chalet)}
                      className={`w-full py-3.5 px-6 rounded-xl font-display text-sm font-bold flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 ${
                        isPremium
                          ? 'bg-[#D4A017] hover:bg-[#B4800F] text-white shadow-lg shadow-[#D4A017]/20'
                          : 'bg-transparent hover:bg-[#0EA5E9]/10 border border-[#0EA5E9]/40 hover:border-[#0EA5E9] text-[#0EA5E9] hover:text-white'
                      }`}
                    >
                      <Calendar size={16} />
                      <span>Reservar Agora</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal (Dialog Overlay) */}
      <AnimatePresence>
        {selectedChalet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBookingModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative w-full max-w-lg bg-[#020D0D] border border-[#0F766E]/40 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                id="close-booking-modal"
                onClick={closeBookingModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-[#041F1F]/60 hover:bg-[#041F1F]"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <div className="mb-6 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4A017]/10 flex items-center justify-center text-[#D4A017]">
                  <Landmark size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-extrabold text-xl text-white">Solicitar Orçamento</h3>
                  <p className="font-sans text-xs text-gray-400">{selectedChalet.name}</p>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                <div>
                  <label className="block font-display text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full bg-[#041F1F] border border-[#0F766E]/30 focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Data de Entrada
                    </label>
                    <input
                      type="date"
                      required
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-[#041F1F] border border-[#0F766E]/30 focus:border-[#D4A017] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Noites de Estadia
                    </label>
                    <div className="flex items-center space-x-2 bg-[#041F1F] border border-[#0F766E]/30 rounded-xl px-2">
                      <button
                        type="button"
                        onClick={() => setNights(Math.max(1, nights - 1))}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-sm font-bold text-white">{nights}</span>
                      <button
                        type="button"
                        onClick={() => setNights(nights + 1)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-display text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Quantidade de Hóspedes
                  </label>
                  <div className="flex items-center space-x-2 bg-[#041F1F] border border-[#0F766E]/30 rounded-xl px-2">
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-bold text-white">{guestsCount}</span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(guestsCount + 1)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    * Capacidade do chalé: {selectedChalet.capacity}
                  </p>
                </div>

                {/* Estimate cost block */}
                <div className="bg-[#041F1F] border border-[#0F766E]/30 p-4 rounded-2xl flex justify-between items-center mt-6">
                  <div>
                    <span className="font-sans text-xs text-gray-400 block">Estimativa total</span>
                    <span className="font-display font-extrabold text-2xl text-[#D4A017]">
                      ${getNumericPrice(selectedChalet.price) * nights}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-xs text-gray-400 block">Formato de diárias</span>
                    <span className="font-sans text-xs text-gray-300 font-medium">
                      {nights} noite(s) x {selectedChalet.price}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="flex-1 py-3 bg-[#041F1F] border border-[#0F766E]/30 hover:bg-[#0F766E]/10 rounded-xl font-display text-xs font-bold text-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    id="submit-booking-modal"
                    type="submit"
                    className="flex-1 py-3 bg-[#D4A017] hover:bg-[#B4800F] text-white rounded-xl font-display text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-[#D4A017]/10"
                  >
                    <Phone size={14} className="text-white" />
                    <span>Solicitar por WhatsApp</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
