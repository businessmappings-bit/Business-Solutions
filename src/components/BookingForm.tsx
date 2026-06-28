import { useState, useEffect, FormEvent } from 'react';
import { CHALETS_DATA } from '../data';
import { Booking } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  CheckCircle, 
  Download, 
  Send, 
  TrendingUp, 
  Search, 
  Clock, 
  Trash2, 
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function BookingForm() {
  // Booking Form State
  const [chaletId, setChaletId] = useState(CHALETS_DATA[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Validation and UX
  const [error, setError] = useState('');
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);
  
  // Tab State: 'book' | 'admin'
  const activeTab = 'book';
  const setActiveTab = (tab: 'book' | 'admin') => {};
  const [bookingsLog, setBookingsLog] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected Chalet details
  const selectedChalet = CHALETS_DATA.find(c => c.id === chaletId) || CHALETS_DATA[0];

  // Load Bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aqua_azul_bookings');
    if (saved) {
      try {
        setBookingsLog(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved bookings', e);
      }
    }
  }, []);

  // Listen for external chalet-selected custom events
  useEffect(() => {
    const handleSelected = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setChaletId(customEvent.detail);
        setActiveTab('book');
        setSuccessBooking(null); // Clear previous voucher if clicking from card
      }
    };
    window.addEventListener('chalet-selected', handleSelected);
    return () => window.removeEventListener('chalet-selected', handleSelected);
  }, []);

  // Sync capacity with selected chalet
  useEffect(() => {
    const maxCapacity = selectedChalet.id === 'chale-individual' ? 1 : selectedChalet.id === 'chale-casal' ? 2 : 4;
    if (guests > maxCapacity) {
      setGuests(maxCapacity);
    }
  }, [chaletId, selectedChalet]);

  // Compute number of nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = date2.getTime() - date1.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = getNights();
  const chaletPriceNumber = parseInt(selectedChalet.price.replace(/[^0-9]/g, '')) || 120;
  const totalPrice = nights * chaletPriceNumber;

  // Handle Booking submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!checkIn || !checkOut) {
      setError('Por favor, selecione as datas de check-in e check-out.');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    if (inDate < today) {
      setError('A data de check-in não pode ser no passado.');
      return;
    }

    if (outDate <= inDate) {
      setError('A data de check-out deve ser posterior à data de check-in.');
      return;
    }

    if (!name.trim()) {
      setError('Por favor, insira o seu nome.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    if (!phone.trim()) {
      setError('Por favor, insira o seu número de telefone.');
      return;
    }

    // Create Booking Object
    const newBooking: Booking = {
      id: 'AA-' + Math.floor(100000 + Math.random() * 900000),
      chaletId: selectedChalet.id,
      chaletName: selectedChalet.name,
      checkIn,
      checkOut,
      guests,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      totalPrice,
      status: 'Pendente',
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedLog = [newBooking, ...bookingsLog];
    setBookingsLog(updatedLog);
    localStorage.setItem('aqua_azul_bookings', JSON.stringify(updatedLog));

    setSuccessBooking(newBooking);

    // Reset Form fields
    setCheckIn('');
    setCheckOut('');
    setGuests(2);
    setName('');
    setEmail('');
    setPhone('');
  };

  // Delete booking from Admin view
  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Tem certeza de que deseja remover esta reserva?')) {
      const updated = bookingsLog.filter(b => b.id !== id);
      setBookingsLog(updated);
      localStorage.setItem('aqua_azul_bookings', JSON.stringify(updated));
    }
  };

  // Change booking status
  const handleChangeStatus = (id: string, newStatus: 'Pendente' | 'Confirmado' | 'Cancelado') => {
    const updated = bookingsLog.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookingsLog(updated);
    localStorage.setItem('aqua_azul_bookings', JSON.stringify(updated));
  };

  // Generate mailto link
  const getMailtoLink = (booking: Booking) => {
    const subject = encodeURIComponent(`Solicitação de Reserva Aqua Azul Beach - ${booking.id}`);
    const body = encodeURIComponent(
      `Olá, Administração Aqua Azul Beach!\n\n` +
      `Gostaria de formalizar minha solicitação de reserva:\n\n` +
      `-------------------------------------------\n` +
      `CÓDIGO DA RESERVA: ${booking.id}\n` +
      `ACOMODAÇÃO: ${booking.chaletName}\n` +
      `CHECK-IN: ${new Date(booking.checkIn).toLocaleDateString('pt-BR')}\n` +
      `CHECK-OUT: ${new Date(booking.checkOut).toLocaleDateString('pt-BR')}\n` +
      `HÓSPEDES: ${booking.guests} pessoas\n` +
      `DIÁRIAS: ${getNightsForBooking(booking.checkIn, booking.checkOut)} noites\n` +
      `VALOR TOTAL: Sob Consulta\n` +
      `-------------------------------------------\n\n` +
      `DADOS DO CLIENTE:\n` +
      `- Nome: ${booking.customerName}\n` +
      `- E-mail: ${booking.customerEmail}\n` +
      `- Telefone: ${booking.customerPhone}\n\n` +
      `Por favor, aguardo o retorno com as instruções de confirmação para garantir nossa estadia.\n\n` +
      `Atenciosamente,\n${booking.customerName}`
    );
    return `mailto:reservas@aquaazulbeach.com?subject=${subject}&body=${body}`;
  };

  // Helper for nights count in booking log
  const getNightsForBooking = (cin: string, cout: string) => {
    const date1 = new Date(cin);
    const date2 = new Date(cout);
    const diffTime = date2.getTime() - date1.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Generate WhatsApp link
  const getWhatsAppLink = (booking: Booking) => {
    const text = encodeURIComponent(
      `Olá! Fiz uma solicitação de reserva no Aqua Azul Beach.\n\n` +
      `*Código:* ${booking.id}\n` +
      `*Acomodação:* ${booking.chaletName}\n` +
      `*Check-In:* ${new Date(booking.checkIn).toLocaleDateString('pt-BR')}\n` +
      `*Check-Out:* ${new Date(booking.checkOut).toLocaleDateString('pt-BR')}\n` +
      `*Hóspedes:* ${booking.guests} pessoas\n` +
      `*Valor:* Sob Consulta\n\n` +
      `*Nome:* ${booking.customerName}\n` +
      `*E-mail:* ${booking.customerEmail}\n` +
      `*Telefone:* ${booking.customerPhone}`
    );
    return `https://wa.me/5978615063?text=${text}`;
  };

  // Filtered Bookings for Admin List
  const filteredBookings = bookingsLog.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.chaletName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section id="reservas" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-900 overflow-hidden relative">
      {/* Absolute Decorative Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#D4A017]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 mb-4 shadow-sm">
            <Sparkles size={14} className="text-[#D4A017]" />
            <span className="font-display text-[11px] uppercase tracking-[0.2em] text-[#D4A017] font-semibold">
              Planeje Sua Estadia dos Sonhos
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Reserva Premium Online
          </h2>
          <p className="text-slate-400 font-sans font-light text-sm md:text-base leading-relaxed">
            Consulte diárias, escolha seu chalé ideal integrado à floresta tropical de Sipaliwini e envie sua solicitação em poucos cliques.
          </p>
        </div>

        {/* Dynamic Display based on active tab */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* BOOKING TAB */}
            {activeTab === 'book' && (
              <motion.div
                key="booking-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {!successBooking ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-md">
                    
                    {/* Left Column: Chalet Preview & Info */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-800">
                          <img 
                            src={selectedChalet.image} 
                            alt={selectedChalet.name} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute top-3 right-3 bg-slate-950/80 border border-slate-800 backdrop-blur-sm px-3.5 py-1.5 rounded-full">
                            <span className="text-[10px] text-[#D4A017] font-sans font-semibold uppercase tracking-wider">
                              Sob Consulta
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="font-display text-[10px] uppercase tracking-widest text-[#0EA5E9] font-bold">
                            Acomodação Selecionada
                          </span>
                          <h3 className="text-xl font-serif font-bold text-white mt-1">
                            {selectedChalet.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-2 font-sans font-light leading-relaxed">
                            {selectedChalet.description}
                          </p>
                        </div>
                      </div>

                      {/* Amenities List */}
                      <div className="border-t border-slate-800/80 pt-4">
                        <span className="font-display text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-2.5">
                          Incluso nesta acomodação:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedChalet.amenities.slice(0, 4).map((amenity, i) => (
                            <span key={i} className="text-[10px] font-sans text-slate-300 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                          {selectedChalet.amenities.length > 4 && (
                            <span className="text-[10px] font-sans text-[#D4A017] bg-slate-800/40 border border-[#D4A017]/20 px-2.5 py-1 rounded-full font-medium">
                              +{selectedChalet.amenities.length - 4} mais
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary Estimates Box */}
                      <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2">
                        <div className="flex items-center justify-between text-xs font-sans text-slate-400">
                          <span>Diárias selecionadas:</span>
                          <span className="text-white font-medium">
                            {nights > 0 ? `${nights} ${nights === 1 ? 'noite' : 'noites'}` : 'Selecione as datas'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-sans text-slate-400">
                          <span>Capacidade da acomodação:</span>
                          <span className="text-white font-medium">{selectedChalet.capacity}</span>
                        </div>
                        <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between">
                          <span className="text-xs font-display text-slate-300 uppercase tracking-wider font-semibold">Valores Estimados</span>
                          <span className="text-xs font-sans font-bold text-[#D4A017] uppercase tracking-wider">
                            Sob Consulta
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Form Fields */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
                      
                      {/* Chalet Selection */}
                      <div className="space-y-2">
                        <label className="text-xs font-display text-slate-300 uppercase tracking-wider font-bold flex items-center space-x-1.5">
                          <Building size={14} className="text-[#0EA5E9]" />
                          <span>Selecione a Acomodação</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {CHALETS_DATA.map((chalet) => (
                            <button
                              key={chalet.id}
                              type="button"
                              onClick={() => setChaletId(chalet.id)}
                              className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between items-center ${
                                chaletId === chalet.id
                                  ? 'bg-[#0F766E]/20 border-[#0EA5E9] shadow-md shadow-[#0EA5E9]/10'
                                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                              }`}
                            >
                              <span className={`text-[10px] font-display font-bold uppercase tracking-wider ${chaletId === chalet.id ? 'text-white' : 'text-slate-400'}`}>
                                {chalet.name.replace('Chalé ', '')}
                              </span>
                              <span className="text-[10px] font-sans text-[#D4A017] mt-1 font-medium">
                                {chalet.capacity}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-display text-slate-300 uppercase tracking-wider font-bold flex items-center space-x-1.5">
                            <Calendar size={14} className="text-[#0EA5E9]" />
                            <span>Check-In</span>
                          </label>
                          <input
                            type="date"
                            value={checkIn}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full bg-slate-950/80 border border-slate-800 text-white rounded-xl px-4 py-2.5 font-sans text-xs focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9]/30 transition-all [color-scheme:dark]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-display text-slate-300 uppercase tracking-wider font-bold flex items-center space-x-1.5">
                            <Calendar size={14} className="text-[#0EA5E9]" />
                            <span>Check-Out</span>
                          </label>
                          <input
                            type="date"
                            value={checkOut}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full bg-slate-950/80 border border-slate-800 text-white rounded-xl px-4 py-2.5 font-sans text-xs focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9]/30 transition-all [color-scheme:dark]"
                          />
                        </div>
                      </div>

                      {/* Number of Guests */}
                      <div className="space-y-2">
                        <label className="text-xs font-display text-slate-300 uppercase tracking-wider font-bold flex items-center space-x-1.5">
                          <Users size={14} className="text-[#0EA5E9]" />
                          <span>Hóspedes</span>
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="w-full bg-slate-950/80 border border-slate-800 text-white rounded-xl px-4 py-2.5 font-sans text-xs focus:outline-none focus:border-[#0EA5E9] transition-all"
                        >
                          {selectedChalet.id === 'chale-individual' ? (
                            <>
                              <option value={1} className="bg-slate-950">1 Hóspede (Máximo)</option>
                            </>
                          ) : selectedChalet.id === 'chale-casal' ? (
                            <>
                              <option value={1} className="bg-slate-950">1 Hóspede</option>
                              <option value={2} className="bg-slate-950">2 Hóspedes (Máximo)</option>
                            </>
                          ) : (
                            <>
                              <option value={1} className="bg-slate-950">1 Hóspede</option>
                              <option value={2} className="bg-slate-950">2 Hóspedes</option>
                              <option value={3} className="bg-slate-950">3 Hóspedes</option>
                              <option value={4} className="bg-slate-950">4 Hóspedes (Máximo)</option>
                            </>
                          )}
                        </select>
                      </div>

                      {/* Personal Info */}
                      <div className="border-t border-slate-800/80 pt-4 space-y-4">
                        <span className="font-display text-[10px] uppercase tracking-widest text-[#D4A017] font-semibold block">
                          Dados de Contato do Hóspede
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[11px] font-sans text-slate-400 flex items-center space-x-1.5">
                              <User size={12} className="text-slate-500" />
                              <span>Nome Completo</span>
                            </label>
                            <input
                              type="text"
                              value={name}
                              placeholder="ex: João Silva"
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-slate-950/80 border border-slate-800 text-white rounded-xl px-4 py-2.5 font-sans text-xs focus:outline-none focus:border-[#0EA5E9]"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-sans text-slate-400 flex items-center space-x-1.5">
                              <Mail size={12} className="text-slate-500" />
                              <span>Endereço de E-mail</span>
                            </label>
                            <input
                              type="email"
                              value={email}
                              placeholder="ex: j.silva@email.com"
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-slate-950/80 border border-slate-800 text-white rounded-xl px-4 py-2.5 font-sans text-xs focus:outline-none focus:border-[#0EA5E9]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-sans text-slate-400 flex items-center space-x-1.5">
                            <Phone size={12} className="text-slate-500" />
                            <span>Número de Telefone / WhatsApp</span>
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            placeholder="ex: +55 (11) 98765-4321 ou +597 861-5063"
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-950/80 border border-slate-800 text-white rounded-xl px-4 py-2.5 font-sans text-xs focus:outline-none focus:border-[#0EA5E9]"
                          />
                        </div>
                      </div>

                      {/* Error Messages */}
                      {error && (
                        <div className="text-xs bg-red-950/40 border border-red-900/50 text-red-400 p-3 rounded-xl font-sans font-light">
                          ⚠️ {error}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#D4A017] to-[#B4800F] hover:from-[#B4800F] hover:to-[#94600F] text-white font-display text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl shadow-lg shadow-[#D4A017]/15 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <Send size={14} />
                        <span>Solicitar Pré-Reserva</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  /* BOOKING SUCCESS SCREEN (VOUCHER) */
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-2xl mx-auto bg-slate-900 border border-[#D4A017]/40 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden"
                  >
                    {/* Decorative gold lines */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A017] via-[#0EA5E9] to-[#D4A017]" />
                    
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 mb-3">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-white">Solicitação Recebida com Sucesso!</h3>
                      <p className="text-xs text-slate-400 mt-1.5 font-sans font-light">
                        Guarde os detalhes do seu voucher de solicitação abaixo. Nossa equipe entrará em contato em breve.
                      </p>
                    </div>

                    {/* Voucher Details */}
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 relative font-sans">
                      {/* Ticket rip styling */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border-r border-slate-800" />
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border-l border-slate-800" />

                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Código do Voucher</span>
                          <span className="text-sm font-mono font-bold text-[#D4A017]">{successBooking.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Data da Solicitação</span>
                          <span className="text-[11px] text-slate-300 font-medium">{successBooking.createdAt}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Acomodação</span>
                          <span className="text-white font-semibold flex items-center space-x-1">
                            <Building size={12} className="text-[#0EA5E9]" />
                            <span>{successBooking.chaletName}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Hóspedes</span>
                          <span className="text-white font-semibold flex items-center space-x-1">
                            <Users size={12} className="text-[#0EA5E9]" />
                            <span>{successBooking.guests} {successBooking.guests === 1 ? 'pessoa' : 'pessoas'}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Data de Check-In</span>
                          <span className="text-white font-semibold flex items-center space-x-1">
                            <Calendar size={12} className="text-green-400" />
                            <span>{new Date(successBooking.checkIn).toLocaleDateString('pt-BR')}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Data de Check-Out</span>
                          <span className="text-white font-semibold flex items-center space-x-1">
                            <Calendar size={12} className="text-red-400" />
                            <span>{new Date(successBooking.checkOut).toLocaleDateString('pt-BR')}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Titular da Reserva</span>
                          <span className="text-white font-medium block">{successBooking.customerName}</span>
                          <span className="text-slate-400 text-[10px] block mt-0.5">{successBooking.customerEmail}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Telefone / WhatsApp</span>
                          <span className="text-white font-medium block">{successBooking.customerPhone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Status do Pedido</span>
                          <span className="inline-flex items-center space-x-1 mt-1 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] text-amber-400 font-semibold uppercase">
                            <Clock size={10} />
                            <span>{successBooking.status}</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Valores de Estadia</span>
                          <span className="text-xs font-sans font-bold text-[#D4A017] uppercase tracking-wider block mt-1">
                            Sob Consulta
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Submission actions */}
                    <div className="mt-8 space-y-3 font-sans">
                      <p className="text-slate-400 text-xs text-center leading-relaxed font-light mb-2">
                        Selecione um dos canais oficiais abaixo para enviar este voucher diretamente à nossa equipe de atendimento e garantir prioridade:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                          href={getMailtoLink(successBooking)}
                          className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white font-display text-xs uppercase tracking-wider font-bold py-3 rounded-xl transition-all"
                        >
                          <Mail size={14} className="text-[#0EA5E9]" />
                          <span>Enviar por E-mail</span>
                        </a>
                        <a
                          href={getWhatsAppLink(successBooking)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-display text-xs uppercase tracking-wider font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/10 transition-all"
                        >
                          <Phone size={14} className="text-white" />
                          <span>Enviar via WhatsApp</span>
                        </a>
                      </div>

                      <button
                        onClick={() => setSuccessBooking(null)}
                        className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-display text-xs uppercase tracking-wider font-bold py-2.5 rounded-xl transition-all"
                      >
                        Fazer Nova Simulação / Voltar
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
