import { Phone, MapPin, Mail, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative Blur BG */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-tropical/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-slate-900 pb-12">
          {/* Brand block */}
          <div className="space-y-4">
            <a href="#hero" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-tropical to-aqua flex items-center justify-center shadow-lg">
                <span className="font-display font-bold text-white text-base">AA</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold tracking-wider text-white text-lg leading-none group-hover:text-aqua transition-colors">
                  AQUA AZUL
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold font-semibold leading-none mt-1">
                  Beach Resort
                </span>
              </div>
            </a>
            <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
              Seu refúgio perfeito em Sipaliwini, Suriname. Viva momentos inesquecíveis integrados com o conforto e a floresta tropical nativa.
            </p>
          </div>

          {/* Quick links block */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gold">Navegação</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#hero" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Sobre o Balneário
                </a>
              </li>
              <li>
                <a href="#chales" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Acomodações / Chalés
                </a>
              </li>
              <li>
                <a href="#reservas" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Reservas Online
                </a>
              </li>
              <li>
                <a href="#estrutura" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Estrutura e Lazer
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links block 2 */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gold">Explorar</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#galeria" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Galeria de Fotos
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Depoimentos de Hóspedes
                </a>
              </li>
              <li>
                <a href="#blog" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Blog / Novidades
                </a>
              </li>
              <li>
                <a href="#localizacao" className="font-sans text-xs text-slate-400 hover:text-white transition-colors">
                  Como Chegar / Mapa
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts info footer block */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gold">Contatos</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-xs text-slate-400">
                <Phone size={14} className="text-aqua shrink-0" />
                <a href="https://wa.me/5978615063" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  +597 861-5063
                </a>
              </li>
              <li className="flex items-center space-x-2 text-xs text-slate-400">
                <MapPin size={14} className="text-aqua shrink-0" />
                <span>Sipaliwini, Suriname</span>
              </li>
              <li className="flex items-center space-x-2 text-xs text-slate-400">
                <Mail size={14} className="text-aqua shrink-0" />
                <a href="mailto:contato@aquaazulbeach.com" className="hover:text-white transition-colors">
                  contato@aquaazulbeach.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copy bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="font-sans text-xs text-slate-500 font-light">
            © {currentYear} <span className="font-semibold text-slate-300">Aqua Azul Beach</span>. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800/80 rounded-full px-3.5 py-1 text-[10px] text-slate-400 font-sans">
            <Sparkles size={10} className="text-gold" />
            <span>Resort Premium em Sipaliwini, Suriname</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
