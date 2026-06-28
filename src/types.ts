export interface Chalet {
  id: string;
  name: string;
  description: string;
  capacity: string;
  price: string;
  image: string;
  amenities: string[];
}

export interface StructureItem {
  id: string;
  name: string;
  description: string;
  image: string;
  iconName: string; // references lucide icon
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'natureza' | 'lazer' | 'chales' | 'restaurante';
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'bebidas' | 'petiscos' | 'hospedagem';
  tag?: string; // e.g. "Mais Pedido", "Premium", "Refrescante"
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
}

export interface Booking {
  id: string;
  chaletId: string;
  chaletName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
  status: 'Pendente' | 'Confirmado' | 'Cancelado';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  snippet: string;
  content: string[];
  tags: string[];
}
