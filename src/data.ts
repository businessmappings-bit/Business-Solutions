import { Chalet, StructureItem, GalleryImage, CatalogItem, Review, BlogPost } from './types';

export const CHALETS_DATA: Chalet[] = [
  {
    id: 'chale-individual',
    name: 'Chalé Individual',
    description: 'Um refúgio acolhedor, privativo e silencioso cercado pela exuberante floresta tropical. Ideal para viajantes individuais que buscam tranquilidade, repouso absoluto e conexão com a natureza pura.',
    capacity: '1 pessoa',
    price: 'Sob Consulta',
    image: '/src/assets/images/chale_premium_real_1782657548478.jpg',
    amenities: ['Cama de Solteiro Confortável', 'Banheiro Privativo', 'Wi-Fi de Alta Velocidade', 'Vista para a Natureza']
  },
  {
    id: 'chale-casal',
    name: 'Chalé Casal',
    description: 'Um refúgio romântico e privativo cercado pela exuberante floresta tropical. Perfeito para casais que buscam tranquilidade, privacidade e uma vista inesquecível da natureza ao amanhecer.',
    capacity: '2 pessoas',
    price: 'Sob Consulta',
    image: '/src/assets/images/chale_casal_real_1782657525912.jpg',
    amenities: ['Cama Queen Size', 'Banheiro Privativo', 'Vista para o Lago', 'Wi-Fi de Alta Velocidade']
  },
  {
    id: 'chale-familia',
    name: 'Chalé Família',
    description: 'Espaçoso, aconchegante e totalmente estruturado para proporcionar momentos maravilhosos em família ou com amigos. Desfrute da paz da floresta com todo o conforto necessário.',
    capacity: 'Até 4 pessoas',
    price: 'Sob Consulta',
    image: '/src/assets/images/chale_familia_real_1782657536025.jpg',
    amenities: ['Quartos Confortáveis', 'Banheiro Privativo', 'Vista para a Floresta', 'Wi-Fi de Alta Velocidade']
  }
];

export const STRUCTURE_DATA: StructureItem[] = [
  {
    id: 'banho',
    name: 'Área de Banho',
    description: 'Águas calmas, cristalinas e perfeitamente refrescantes, preparadas para banhos seguros e revigorantes sob o sol tropical do Suriname. Um ambiente tranquilo em meio à natureza, com águas naturais, área de lazer e um espaço perfeito para relaxar, reunir a família e aproveitar momentos inesquecíveis no Aqua Azul Beach.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
    iconName: 'Waves'
  },
  {
    id: 'restaurante',
    name: 'Restaurante Principal',
    description: 'Gastronomia sofisticada que harmoniza a culinária tradicional do Suriname com sabores internacionais, em um ambiente rústico requintado.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'petiscos',
    name: 'Petiscos Especiais',
    description: 'Porções quentes e petiscos frescos preparados na hora pelos nossos chefs, ideais para petiscar à beira da água.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    iconName: 'Sparkles'
  },
  {
    id: 'bebidas',
    name: 'Bebidas & Cocktails',
    description: 'Drinks tropicais exclusivos da casa, sucos naturais de frutas nativas e uma carta com cervejas nacionais e importadas bem geladas.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    iconName: 'CupSoda'
  },
  {
    id: 'verde',
    name: 'Área Verde Preservada',
    description: 'Desfrute de um ambiente cercado pela natureza, com árvores, sombra e um espaço tranquilo para descansar, relaxar e aproveitar momentos especiais com a família e os amigos.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    iconName: 'Trees'
  },
  {
    id: 'estacionamento',
    name: 'Estacionamento para seu veículo',
    description: 'Conte com um espaço para estacionar seu veículo com praticidade e comodidade, facilitando sua visita ao Aqua Azul Beach.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80',
    iconName: 'ShieldCheck'
  }
];

export const GALLERY_DATA: GalleryImage[] = [
  {
    id: 'gal-1',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    caption: 'Nosso oásis de piscinas e áreas de descanso sob o sol tropical.',
    category: 'lazer'
  },
  {
    id: 'gal-2',
    url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    caption: 'Decks de relaxamento voltados para a linda paisagem verde.',
    category: 'lazer'
  },
  {
    id: 'gal-3',
    url: '/src/assets/images/chale_premium_real_1782657548478.jpg',
    caption: 'Nosso luxuoso Chalé Premium à beira do lago com deck privativo.',
    category: 'chales'
  },
  {
    id: 'gal-4',
    url: '/src/assets/images/chale_casal_real_1782657525912.jpg',
    caption: 'Design e aconchego de alto padrão no interior do nosso Chalé Casal.',
    category: 'chales'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    caption: 'A frescura e vitalidade das nossas matas e trilhas ecológicas.',
    category: 'natureza'
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    caption: 'Visão panorâmica do lago principal sob o céu do Suriname.',
    category: 'natureza'
  },
  {
    id: 'gal-7',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    caption: 'Mesas integradas à natureza em nosso restaurante tropical.',
    category: 'restaurante'
  },
  {
    id: 'gal-8',
    url: '/src/assets/images/chale_familia_real_1782657536025.jpg',
    caption: 'A exuberância rústica do Chalé Família sob a copa das árvores.',
    category: 'chales'
  }
];

export const CATALOG_DATA: CatalogItem[] = [
  // Bebidas
  {
    id: 'beb-1',
    name: 'Coquetel Aqua Azul',
    description: 'Nossa assinatura. Rum caribenho, Curaçau Blue, creme de coco fresco e suco puro de abacaxi colhido na região.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
    category: 'bebidas',
    tag: 'Assinatura'
  },
  {
    id: 'beb-2',
    name: 'Caipirinha de Limão Premium',
    description: 'Clássica e irresistível. Cachaça artesanal envelhecida, fatias de limão taiti fresco, gelo picado e um toque de açúcar.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
    category: 'bebidas',
    tag: 'Popular'
  },
  {
    id: 'beb-3',
    name: 'Cerveja Djogo de Litro',
    description: 'A tradicional e favorita cerveja nacional do Suriname, servida estupidamente gelada no balde de gelo.',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=400&q=80',
    category: 'bebidas',
    tag: 'Favorita'
  },
  {
    id: 'beb-4',
    name: 'Suco de Maracujá da Região',
    description: 'Suco 100% natural, extraído diretamente da polpa fresca de maracujás de produtores locais de Sipaliwini.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
    category: 'bebidas',
    tag: 'Natural'
  },
  
  // Petiscos
  {
    id: 'pet-1',
    name: 'Peixe Crocante Aqua Azul',
    description: 'Filés de peixe de água doce fresquinhos da região, empanados em farinha super crocante e servidos com molho tártaro artesanal.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    category: 'petiscos',
    tag: 'Mais Pedido'
  },
  {
    id: 'pet-2',
    name: 'Espetinho Especial de Brasa',
    description: 'Espetinhos de alcatra suculenta e legumes grelhados no fogo de carvão, servidos com farofa crocante de alho e vinagrete fresco.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    category: 'petiscos',
    tag: 'Grelhado'
  },
  {
    id: 'pet-3',
    name: 'Batata Rústica da Floresta',
    description: 'Cunhas de batata fritas com casca, temperadas com sal grosso, dentes de alho confitados e alecrim fresco.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    category: 'petiscos',
    tag: 'Veggie'
  },
  {
    id: 'pet-4',
    name: 'Tábua de Frios e Frutas',
    description: 'Fatias de salame nobre, queijo gouda local, azeitonas marinadas no azeite e pedaços de frutas tropicais frescas do dia.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    category: 'petiscos',
    tag: 'Premium'
  },

  // Hospedagem
  {
    id: 'hosp-1',
    name: 'Diária Chalé Individual',
    description: 'Estadia aconchegante imersiva de 1 dia/noite para 1 pessoa, com café da manhã regional de luxo incluso.',
    price: 0.00,
    image: '/src/assets/images/chale_premium_real_1782657548478.jpg',
    category: 'hospedagem',
    tag: 'Individual'
  },
  {
    id: 'hosp-2',
    name: 'Diária Chalé Casal',
    description: 'Estadia romântica imersiva de 1 dia/noite para 2 pessoas, com café da manhã regional de luxo incluso.',
    price: 0.00,
    image: '/src/assets/images/chale_casal_real_1782657525912.jpg',
    category: 'hospedagem',
    tag: 'Casal'
  },
  {
    id: 'hosp-3',
    name: 'Diária Chalé Família',
    description: 'Estadia confortável para grupos de até 4 pessoas, ideal para aproveitar o fim de semana com toda a privacidade.',
    price: 0.00,
    image: '/src/assets/images/chale_familia_real_1782657536025.jpg',
    category: 'hospedagem',
    tag: 'Até 4 Pessoas'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    name: 'Sarah Jenkins',
    location: 'Paramaribo, Suriname',
    rating: 5,
    text: 'Um verdadeiro paraíso escondido! O Chalé Casal é incrivelmente aconchegante e a vista para o lago ao amanhecer é de tirar o fôlego. O atendimento da equipe nos fez sentir muito bem-vindos.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: '14 de Junho, 2026'
  },
  {
    id: 'rev-2',
    name: 'Johan van de Berg',
    location: 'Amsterdam, Holanda',
    rating: 5,
    text: 'Fomos em família e ficamos no Chalé Família. As crianças amaram a área de banho natural e os passeios de caiaque. O peixe frito do restaurante é o melhor que já comi no Suriname. Com certeza voltaremos!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: '28 de Maio, 2026'
  },
  {
    id: 'rev-3',
    name: 'Devika Ramdin',
    location: 'Nieuw Nickerie, Suriname',
    rating: 5,
    text: 'Aqua Azul Beach superou todas as nossas expectativas. Ambiente extremamente limpo, seguro para as crianças e cercado de uma natureza intocável. O Coquetel Aqua Azul é divino!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: '10 de Abril, 2026'
  },
  {
    id: 'rev-4',
    name: 'Carlos Mendes',
    location: 'Manaus, Brasil',
    rating: 5,
    text: 'A hospitalidade em Sipaliwini é lendária, mas o Aqua Azul Beach eleva isso a outro nível. Ficamos no Chalé Premium com deck sobre o lago, excelente internet Starlink para quando precisei trabalhar, e paz absoluta.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: '02 de Março, 2026'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Descubra a beleza natural de Sipaliwini',
    slug: 'descubra-a-beleza-natural-de-sipaliwini',
    category: 'Natureza',
    readTime: '5 min de leitura',
    date: '28 de Junho, 2026',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    snippet: 'Sipaliwini é o coração verde do Suriname. Descubra as riquezas de sua biodiversidade, rios cristalinos e as paisagens intocadas que cercam o Aqua Azul Beach.',
    content: [
      'Sipaliwini, o maior distrito do Suriname, representa um dos ecossistemas de floresta tropical mais preservados e selvagens do planeta. Composto majoritariamente por florestas primárias intocadas, este território abriga uma riqueza biológica inestimável, rios de águas puras e comunidades tradicionais que vivem em profunda harmonia com a terra.',
      'Ao se hospedar no Aqua Azul Beach, você estará no limiar dessa incrível imensidão verde. Aqui, o despertar não é feito por alarmes artificiais, mas pelo canto dos pássaros tropicais e o som suave do vento nas copas das árvores gigantescas. Caminhadas guiadas pelas trilhas ecológicas locais revelam árvores centenárias, orquídeas raras e uma fauna fascinante, que inclui desde borboletas azuis gigantes (Morpho) até tucanos e macacos saltitando entre os galhos.',
      'O turismo sustentável é o pilar que sustenta todas as nossas atividades em Sipaliwini. Acreditamos que a conservação ambiental anda de mãos dadas com o respeito cultural, proporcionando aos visitantes uma experiência genuína e inesquecível de desconexão do mundo moderno e profunda conexão com a essência da Terra.'
    ],
    tags: ['Sipaliwini', 'Ecoturismo', 'Suriname', 'Biodiversidade']
  },
  {
    id: 'post-2',
    title: 'Eventos de verão no Aqua Azul Beach',
    slug: 'eventos-de-verao-no-aqua-azul-beach',
    category: 'Eventos',
    readTime: '4 min de leitura',
    date: '15 de Junho, 2026',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    snippet: 'A temporada de sol está de volta! Prepare-se para noites de música ao vivo, jantares temáticos à luz de velas no pier e atividades aquáticas exclusivas.',
    content: [
      'O verão no Aqua Azul Beach é sinônimo de alegria, celebração e memórias inesquecíveis à beira do lago. Nossa equipe preparou um calendário especial de eventos e programações especiais para garantir que cada dia da sua estadia seja repleto de magia e entretenimento de alto padrão.',
      'Às sextas-feiras, nosso píer se transforma em um palco intimista com o projeto "Acústico ao Pôr do Sol", onde artistas locais apresentam o melhor do reggae, sranantongo acústico e MPB instrumental enquanto o sol se põe no horizonte d\'água. É a oportunidade perfeita para degustar nosso Coquetel Aqua Azul e relaxar ao som de boa música.',
      'Para os amantes da gastronomia, nossos jantares temáticos de sábado trazem o melhor da culinária fusion do Suriname, combinando ingredientes da floresta com técnicas contemporâneas. Além disso, as manhãs de domingo contam com competições amigáveis de caiaque e stand-up paddle, perfeitas para todas as idades.'
    ],
    tags: ['Verão', 'Música Ao Vivo', 'Gastronomia', 'Lazer']
  },
  {
    id: 'post-3',
    title: 'Dicas para uma estadia relaxante',
    slug: 'dicas-para-uma-estadia-relaxante',
    category: 'Guia de Viagem',
    readTime: '6 min de leitura',
    date: '05 de Junho, 2026',
    image: '/src/assets/images/chale_premium_real_1782657548478.jpg',
    snippet: 'Quer recarregar as energias ao máximo? Siga nosso guia prático para praticar o "digital detox", desfrutar dos nossos banhos naturais e repousar com perfeição.',
    content: [
      'Em um mundo cada vez mais acelerado e ultra-conectado, encontrar momentos de paz absoluta tornou-se um luxo essencial. No Aqua Azul Beach, projetamos cada detalhe do nosso balneário para ser um refúgio de cura e relaxamento. Mas para aproveitar ao máximo, algumas atitudes simples podem transformar sua viagem.',
      'Primeiramente, sugerimos experimentar o "Digital Detox". Embora nossos chalés ofereçam internet Wi-Fi de alta velocidade (incluindo antenas Starlink dedicadas), tente separar pelo menos algumas horas do seu dia para manter o celular desligado ou em modo avião. Permita-se ler um bom livro na varanda de seu chalé ouvindo apenas os sons nativos da mata.',
      'Não deixe de vivenciar o poder terapêutico da água. Nossas piscinas naturais de águas calmas e límpidas são perfeitas para banhos demorados que acalmam a mente e revigoram o corpo. Combine isso com uma caminhada contemplativa ao amanhecer pelas nossas trilhas preservadas e sinta a diferença que a floresta de Sipaliwini pode fazer na sua saúde mental e física.'
    ],
    tags: ['Relaxamento', 'Digital Detox', 'Bem-Estar', 'Saúde Mental']
  }
];

