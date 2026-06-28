import { useState, MouseEvent } from 'react';
import { BLOG_POSTS_DATA } from '../data';
import { BlogPost } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Heart, 
  Sparkles, 
  BookOpen, 
  Tag 
} from 'lucide-react';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(BLOG_POSTS_DATA.map(p => p.category)))];

  const handleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(item => item !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const handleBookmark = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedPosts.includes(id)) {
      setBookmarkedPosts(bookmarkedPosts.filter(item => item !== id));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, id]);
    }
  };

  const handleShare = (post: BlogPost, e: MouseEvent) => {
    e.stopPropagation();
    const text = `Confira esta postagem incrível do blog do Aqua Azul Beach Resort: "${post.title}" - ${window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Link da postagem copiado para a área de transferência!');
    } else {
      alert(text);
    }
  };

  const filteredPosts = activeCategory === 'all' 
    ? BLOG_POSTS_DATA 
    : BLOG_POSTS_DATA.filter(post => post.category === activeCategory);

  return (
    <section id="blog" className="py-24 bg-slate-50 border-t border-slate-200/60 overflow-hidden relative">
      {/* Light elegant decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4A017]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#0F766E]/10 border border-[#0F766E]/20 rounded-full px-4 py-1.5 mb-4 shadow-sm">
            <BookOpen size={13} className="text-[#0F766E]" />
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[#0F766E] font-semibold">
              Diário do Balneário
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
            Blog & Novidades
          </h2>
          <p className="text-slate-600 font-sans font-light text-sm md:text-base leading-relaxed">
            Mantenha-se informado sobre novidades, eventos culturais, dicas exclusivas de turismo em Sipaliwini e segredos para a melhor estadia.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-1.5 rounded-full text-xs font-display uppercase tracking-widest font-semibold transition-all border ${
                  activeCategory === cat
                    ? 'bg-[#0F766E] border-[#0F766E] text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-[#0F766E] hover:border-[#0F766E]/40'
                }`}
              >
                {cat === 'all' ? 'Ver Todos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => {
            const isLiked = likedPosts.includes(post.id);
            const isBookmarked = bookmarkedPosts.includes(post.id);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                {/* Thumbnail Image Block */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 border border-slate-100 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm z-10">
                    <span className="text-[9px] font-display uppercase tracking-widest text-[#0F766E] font-extrabold">
                      {post.category}
                    </span>
                  </div>

                  {/* Micro Interaction overlays */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1.5 z-10">
                    <button
                      onClick={(e) => handleLike(post.id, e)}
                      className={`p-1.5 rounded-full backdrop-blur-md shadow-sm border transition-all ${
                        isLiked 
                          ? 'bg-rose-550 border-rose-500 text-rose-500' 
                          : 'bg-white/90 hover:bg-white border-slate-200 text-slate-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart size={13} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={(e) => handleBookmark(post.id, e)}
                      className={`p-1.5 rounded-full backdrop-blur-md shadow-sm border transition-all ${
                        isBookmarked 
                          ? 'bg-[#0F766E]/90 border-[#0F766E] text-white' 
                          : 'bg-white/90 hover:bg-white border-slate-200 text-slate-500 hover:text-[#0F766E]'
                      }`}
                    >
                      <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date and Readtime */}
                    <div className="flex items-center space-x-3 text-[11px] font-sans text-slate-400 mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{post.date}</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors line-clamp-2 leading-snug mb-3">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-sans font-light leading-relaxed line-clamp-3 mb-4">
                      {post.snippet}
                    </p>
                  </div>

                  {/* Read More button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-display uppercase tracking-wider font-bold text-[#0F766E] group-hover:text-[#0EA5E9] transition-colors flex items-center">
                      <span>Ler Matéria</span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-1.5 inline-block"
                      >
                        →
                      </motion.span>
                    </span>
                    
                    <button 
                      onClick={(e) => handleShare(post, e)}
                      className="p-1.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-[#0F766E] transition-colors"
                      title="Copiar Link"
                    >
                      <Share2 size={13} />
                    </button>
                  </div>
                </div>

              </motion.article>
            );
          })}
        </div>

      </div>

      {/* DETAILED BLOG POST MODAL / SLIDER OVERLAY */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-200/50"
            >
              
              {/* Image Hero Header */}
              <div className="relative h-64 md:h-80 bg-slate-100 overflow-hidden">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

                {/* Back button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/50 p-2.5 rounded-full text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all group shadow-md"
                  title="Voltar para o blog"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Post details at bottom of image */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block bg-[#0EA5E9] text-white font-display text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full mb-3 shadow-md">
                    {selectedPost.category}
                  </span>
                  
                  <h1 className="text-lg md:text-2xl font-serif font-bold leading-tight mb-2 text-shadow">
                    {selectedPost.title}
                  </h1>

                  <div className="flex items-center space-x-4 text-[10px] md:text-xs text-slate-350 font-sans font-light">
                    <span className="flex items-center space-x-1.5">
                      <Calendar size={13} className="text-[#D4A017]" />
                      <span>{selectedPost.date}</span>
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="flex items-center space-x-1.5">
                      <Clock size={13} className="text-[#D4A017]" />
                      <span>{selectedPost.readTime}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-10 font-sans">
                
                {/* Intro paragraph snippet */}
                <p className="text-sm md:text-base text-[#0F766E] font-medium leading-relaxed mb-6 font-display italic">
                  "{selectedPost.snippet}"
                </p>

                {/* Text paragraphs */}
                <div className="space-y-5 text-xs md:text-sm text-slate-600 font-light leading-relaxed border-b border-slate-100 pb-8">
                  {selectedPost.content.map((p, i) => (
                    <p key={i} className="first-letter:text-xl first-letter:font-serif first-letter:font-bold first-letter:text-[#D4A017] first-letter:mr-1 first-letter:float-left">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Footer and tags */}
                <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag size={12} className="text-slate-400 mr-1 shrink-0" />
                    {selectedPost.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-sans font-medium text-slate-500 bg-slate-100 border border-slate-250 px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions summary */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={(e) => handleLike(selectedPost.id, e)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-[11px] transition-all font-medium ${
                        likedPosts.includes(selectedPost.id)
                          ? 'bg-rose-50 border-rose-200 text-rose-500'
                          : 'bg-white border-slate-200 text-slate-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart size={12} fill={likedPosts.includes(selectedPost.id) ? 'currentColor' : 'none'} />
                      <span>Curtir</span>
                    </button>
                    <button
                      onClick={(e) => handleShare(selectedPost, e)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#0F766E] hover:bg-slate-50 text-[11px] font-medium transition-all"
                    >
                      <Share2 size={12} />
                      <span>Compartilhar</span>
                    </button>
                  </div>

                </div>

                {/* Close box button */}
                <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-2 bg-slate-900 hover:bg-[#0F766E] text-white font-display text-xs uppercase tracking-wider font-bold rounded-xl shadow-md transition-colors"
                  >
                    Fechar Leitura
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
