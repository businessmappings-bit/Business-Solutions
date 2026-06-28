import { useState, useMemo } from 'react';
import { CATALOG_DATA } from '../data';
import { CatalogItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Plus, Minus, Trash2, Phone, Sparkles, CupSoda, Utensils, Home, X, Check } from 'lucide-react';

interface CartItem {
  item: CatalogItem;
  quantity: number;
}

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const categories = [
    { label: 'Todos', value: 'todos', icon: <Sparkles size={14} /> },
    { label: 'Bebidas', value: 'bebidas', icon: <CupSoda size={14} /> },
    { label: 'Petiscos', value: 'petiscos', icon: <Utensils size={14} /> },
    { label: 'Hospedagem', value: 'hospedagem', icon: <Home size={14} /> },
  ];

  // Filtering & Searching Catalog
  const filteredCatalog = useMemo(() => {
    return CATALOG_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart operations
  const addToCart = (product: CatalogItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.item.id === product.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.item.id === product.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevCart, { item: product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.item.id === productId);
      if (existing && existing.quantity > 1) {
        return prevCart.map((ci) =>
          ci.item.id === productId ? { ...ci, quantity: ci.quantity - 1 } : ci
        );
      }
      return prevCart.filter((ci) => ci.item.id !== productId);
    });
  };

  const clearItemFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSummary = useMemo(() => {
    const totalCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
    const hasOnlySobConsulta = cart.length > 0 && cart.every((ci) => ci.item.price === 0);
    const totalPrice = cart.reduce((sum, ci) => sum + (ci.item.price * ci.quantity), 0);
    return { totalCount, totalPrice, hasOnlySobConsulta };
  }, [cart]);

  // Generate WhatsApp Message for Cart
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let itemsText = '';
    cart.forEach((ci) => {
      const priceStr = ci.item.price === 0 ? 'Sob Consulta' : `$${(ci.item.price * ci.quantity).toFixed(2)}`;
      itemsText += `• *${ci.quantity}x ${ci.item.name}* - ${priceStr}\n`;
    });

    const totalStr = cartSummary.hasOnlySobConsulta ? 'Sob Consulta' : `$${cartSummary.totalPrice.toFixed(2)}`;

    const message = `Olá Aqua Azul Beach! Montei um pedido/orçamento pelo catálogo do site:

📦 *ITENS SELECIONADOS:*
${itemsText}
💰 *VALOR TOTAL ESTIMADO:* ${totalStr}

Gostaria de verificar a disponibilidade e como faço para prosseguir! Obrigado.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5978615063?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <section id="catalogo" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-aqua/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-tropical/5 rounded-full blur-3xl pointer-events-none" />

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
            <ShoppingBag size={14} className="text-tropical animate-pulse" />
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-tropical">
              Cardápio & Estadias
            </span>
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 mb-6">
            Catálogo <span className="text-gradient">Online</span>
          </h2>

          <p className="font-sans text-lg text-slate-600 font-light">
            Navegue pelas nossas bebidas refrescantes, petiscos saborosos e diárias de chalés. Monte seu pedido e envie diretamente pelo WhatsApp para agilizarmos seu atendimento!
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 bg-slate-50 p-4 rounded-3xl border border-slate-100">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                id={`cat-filter-${cat.value}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl font-display text-xs sm:text-sm font-semibold tracking-wide flex items-center space-x-1.5 transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-tropical to-aqua text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar item..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-tropical focus:ring-1 focus:ring-tropical"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Empty Catalog Notice */}
        {filteredCatalog.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <ShoppingBag size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="font-display font-semibold text-lg text-slate-600">Nenhum item localizado</p>
            <p className="font-sans text-sm text-slate-400 mt-1">Experimente mudar o termo da pesquisa ou trocar de categoria.</p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCatalog.map((product) => {
            const cartItem = cart.find((ci) => ci.item.id === product.id);
            const qty = cartItem ? cartItem.quantity : 0;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent" />

                  {/* Category and custom Tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-slate-950/85 text-white font-display text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-slate-800">
                      {product.category}
                    </span>
                    {product.tag && (
                      <span className="bg-gold text-slate-950 font-display text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 right-3 bg-white/95 text-slate-950 px-2.5 py-1 rounded-xl shadow font-display font-bold text-[11px] sm:text-xs">
                    {product.price === 0 ? 'Sob Consulta' : `$${product.price.toFixed(2)}`}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    <h3 className="font-display font-bold text-lg text-slate-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed line-clamp-3 h-[54px]">
                      {product.description}
                    </p>
                  </div>

                  {/* Dynamic Add / Counter action */}
                  <div className="pt-3 border-t border-slate-200/60">
                    {qty > 0 ? (
                      <div className="flex items-center justify-between bg-slate-200/60 p-1.5 rounded-xl">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 bg-white text-slate-700 hover:text-slate-900 rounded-lg hover:shadow-sm"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-display font-bold text-sm text-slate-800">{qty}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="p-1.5 bg-white text-slate-700 hover:text-slate-900 rounded-lg hover:shadow-sm"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300 rounded-xl font-display text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <Plus size={14} className="text-tropical" />
                        <span>Adicionar</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Inquiry Summary Drawer Button */}
      {cartSummary.totalCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            id="floating-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto bg-slate-900 text-white rounded-full px-6 py-4 flex items-center justify-between space-x-6 shadow-2xl border border-slate-800 w-full max-w-md cursor-pointer hover:bg-slate-950 transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center space-x-3.5">
              <div className="relative bg-tropical text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <ShoppingBag size={18} />
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                  {cartSummary.totalCount}
                </span>
              </div>
              <div className="text-left">
                <p className="font-display font-extrabold text-sm text-white">Ver Orçamento</p>
                <p className="font-sans text-[11px] text-slate-400">Total: ${cartSummary.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <span className="bg-gradient-to-r from-tropical to-aqua text-white text-xs font-bold px-4 py-2 rounded-full shadow-md">
              Montar Pedido →
            </span>
          </motion.button>
        </div>
      )}

      {/* Cart Drawer Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Content drawer */}
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 150 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 text-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/30">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="text-gold" size={20} />
                  <h3 className="font-display font-extrabold text-lg">Seu Pedido Aqua Azul</h3>
                </div>
                <button
                  id="close-cart-btn"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="flex items-center justify-between p-3.5 bg-slate-950/40 rounded-2xl border border-slate-800"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <img
                        src={ci.item.image}
                        alt={ci.item.name}
                        className="w-12 h-12 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="font-display font-bold text-sm text-white truncate">{ci.item.name}</h4>
                        <p className="font-sans text-xs text-slate-400">
                          {ci.item.price === 0 ? 'Sob Consulta' : `$${ci.item.price.toFixed(2)} x ${ci.quantity}`}
                        </p>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-3">
                      <span className="font-display font-extrabold text-sm text-gold">
                        {ci.item.price === 0 ? 'Sob Consulta' : `$${(ci.item.price * ci.quantity).toFixed(2)}`}
                      </span>
                      <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => removeFromCart(ci.item.id)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs font-bold w-4 text-center">{ci.quantity}</span>
                        <button
                          onClick={() => addToCart(ci.item)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => clearItemFromCart(ci.item.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary and Send CTA */}
              <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs text-slate-400">Valor Total Estimado</span>
                  <span className="font-display font-extrabold text-lg sm:text-2xl text-gold">
                    {cartSummary.hasOnlySobConsulta ? 'Sob Consulta' : `$${cartSummary.totalPrice.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-display text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    Esvaziar
                  </button>
                  <button
                    id="cart-checkout-btn"
                    onClick={handleCheckoutWhatsApp}
                    className="flex-1 py-3 bg-gradient-to-r from-tropical to-aqua text-white rounded-xl font-display text-xs font-bold flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Phone size={14} className="text-gold" />
                    <span>Enviar Pedido via WhatsApp</span>
                  </button>
                </div>
                <p className="text-[10px] text-center text-slate-500 font-sans">
                  * Você será redirecionado para o WhatsApp +597 861-5063 para finalizar seu atendimento.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
