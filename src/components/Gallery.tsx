import { useState } from 'react';
import { GALLERY_DATA } from '../data';
import { GalleryImage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn, Heart } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState<string>('todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { label: 'Todas as Fotos', value: 'todos' },
    { label: 'Natureza', value: 'natureza' },
    { label: 'Áreas de Lazer', value: 'lazer' },
    { label: 'Chalés Nobres', value: 'chales' },
    { label: 'Gastronomia', value: 'restaurante' },
  ];

  // Filter images based on selected tab
  const filteredImages = filter === 'todos'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(img => img.category === filter);

  const openLightbox = (imgId: string) => {
    const idx = GALLERY_DATA.findIndex(img => img.id === imgId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (lightboxIndex === null) return;
    let nextIdx = direction === 'next' ? lightboxIndex + 1 : lightboxIndex - 1;

    // wrapping loop
    if (nextIdx >= GALLERY_DATA.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = GALLERY_DATA.length - 1;

    setLightboxIndex(nextIdx);
  };

  return (
    <section id="galeria" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-tropical/10 rounded-full px-4 py-1.5 mb-4"
          >
            <ImageIcon size={14} className="text-tropical" />
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-tropical">
              Registros Reais
            </span>
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 mb-6">
            Nossa Galeria de <span className="text-gradient">Fotos</span>
          </h2>

          <p className="font-sans text-lg text-slate-600 font-light">
            Dê uma espiada no que espera por você. Imagens reais de nossas acomodações, belezas naturais e deliciosas experiências gastronômicas.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              id={`gallery-filter-${cat.value}`}
              onClick={() => setFilter(cat.value)}
              className={`px-4 sm:px-6 py-2 rounded-full font-display text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                filter === cat.value
                  ? 'bg-tropical text-white shadow-md shadow-tropical/15'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(image.id)}
                className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-slate-100"
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

                {/* Zoom symbol and like action on hover */}
                <div className="absolute top-4 right-4 bg-white/95 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                  <ZoomIn size={16} className="text-tropical" />
                </div>

                {/* Caption / Category badge */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white">
                  <span className="inline-block bg-gold/95 text-slate-950 font-display text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded mb-1.5">
                    {image.category === 'chales' ? 'Chalés' : image.category}
                  </span>
                  <p className="font-sans text-xs text-slate-200 leading-snug line-clamp-2">
                    {image.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal slider overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4">
            {/* Close trigger backdrop */}
            <div className="absolute inset-0" onClick={closeLightbox} />

            {/* Close Button top corner */}
            <button
              id="close-gallery-lightbox"
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-2.5 bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Nav Button */}
            <button
              id="prev-gallery-btn"
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 z-10 p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white rounded-full transition-colors hidden sm:flex"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image display center */}
            <div className="relative max-w-5xl max-h-[75vh] z-10 flex flex-col items-center">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_DATA[lightboxIndex].url}
                alt={GALLERY_DATA[lightboxIndex].caption}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
                referrerPolicy="no-referrer"
              />

              {/* Slider captions and counters */}
              <div className="mt-4 text-center max-w-xl px-4">
                <span className="inline-block bg-gold text-slate-950 font-display text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2">
                  {GALLERY_DATA[lightboxIndex].category}
                </span>
                <p className="font-sans text-sm text-slate-300 leading-relaxed font-light">
                  {GALLERY_DATA[lightboxIndex].caption}
                </p>
                <p className="font-mono text-[10px] text-slate-500 mt-2">
                  Imagem {lightboxIndex + 1} de {GALLERY_DATA.length}
                </p>
              </div>
            </div>

            {/* Right Nav Button */}
            <button
              id="next-gallery-btn"
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 z-10 p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white rounded-full transition-colors hidden sm:flex"
            >
              <ChevronRight size={24} />
            </button>

            {/* Simple Mobile Swipe/Touch hint */}
            <div className="absolute bottom-4 text-center w-full text-[10px] text-slate-500 font-sans sm:hidden">
              Toque nas laterais para navegar
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
