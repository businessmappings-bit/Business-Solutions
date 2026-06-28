import { useState, FormEvent } from 'react';
import { REVIEWS_DATA } from '../data';
import { Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Star, Quote, PlusCircle, Check } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  
  // Testimonial submission form state
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newName || !newText) return;

    const newReviewItem: Review = {
      id: `custom-rev-${Date.now()}`,
      name: newName,
      location: newLocation || 'Visitante',
      rating: newRating,
      text: newText,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', // generic avatar placeholder
      date: 'Hoje'
    };

    setReviews([newReviewItem, ...reviews]);
    setFormSubmitted(true);
    setTimeout(() => {
      // Reset form states
      setNewName('');
      setNewLocation('');
      setNewRating(5);
      setNewText('');
      setShowAddForm(false);
      setFormSubmitted(false);
    }, 2000);
  };

  return (
    <section id="avaliacoes" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tropical/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-aqua/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 mb-4"
            >
              <MessageSquare size={14} className="text-gold" />
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-gold">
                Opinião de Quem Visita
              </span>
            </motion.div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
              O que dizem nossos <span className="text-gradient-gold">Hóspedes</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-slate-300 font-light mt-4">
              A satisfação dos nossos visitantes é a nossa maior recompensa. Veja a experiência de quem já relaxou e desfrutou do Aqua Azul Beach.
            </p>
          </div>

          <div>
            <button
              id="write-review-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-gradient-to-r from-tropical to-aqua hover:from-tropical-dark hover:to-aqua-dark text-white rounded-xl font-display text-sm font-bold flex items-center space-x-2 shadow-lg shadow-tropical/15 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlusCircle size={16} className="text-gold" />
              <span>Avaliar Minha Visita</span>
            </button>
          </div>
        </div>

        {/* Custom review form drop-down */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 sm:p-8 mb-12 overflow-hidden backdrop-blur-sm max-w-2xl mx-auto"
            >
              {formSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">Avaliação Enviada!</h3>
                  <p className="font-sans text-sm text-slate-300">
                    Agradecemos imensamente o seu depoimento! Ele foi adicionado à nossa lista.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <h3 className="font-display font-extrabold text-xl text-white mb-4">Compartilhe sua Experiência</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Ex: Clara Lima"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-display text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        De onde você é? (Cidade/País)
                      </label>
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Ex: Paramaribo, Suriname"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 py-2">
                    <span className="font-display text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Sua Nota:
                    </span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="text-lg text-yellow-400 focus:outline-none p-1"
                        >
                          {star <= newRating ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-display text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Depoimento / Crítica
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder="Conte um pouco como foi sua estadia, o restaurante, o atendimento ou o lazer..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="py-2.5 px-5 bg-slate-700 hover:bg-slate-600 rounded-xl font-display text-xs font-bold text-slate-300"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="py-2.5 px-6 bg-gradient-to-r from-tropical to-aqua text-white rounded-xl font-display text-xs font-bold"
                    >
                      Enviar Avaliação
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/40 border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm relative group hover:border-slate-700 hover:bg-slate-800/60 transition-all duration-300"
            >
              {/* Card content */}
              <div>
                {/* Quotes decoration icon */}
                <div className="absolute top-6 right-6 text-slate-700 group-hover:text-gold/20 transition-colors">
                  <Quote size={28} className="rotate-180" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                    />
                  ))}
                </div>

                <p className="font-sans text-sm text-slate-200 leading-relaxed font-light mb-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800/60">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="font-display font-bold text-sm text-white truncate">{rev.name}</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5 text-slate-400 text-[11px] font-sans">
                    <span className="truncate">{rev.location}</span>
                    <span className="text-slate-600">•</span>
                    <span className="whitespace-nowrap">{rev.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
