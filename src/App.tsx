import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Chalets from './components/Chalets';
import BookingForm from './components/BookingForm';
import Structure from './components/Structure';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Blog from './components/Blog';
import Location from './components/Location';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020D0D] text-[#E0F2F1] selection:bg-[#0EA5E9] selection:text-white overflow-x-hidden relative font-sans">
      {/* Subtle background radial grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0EA5E9 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      
      {/* Premium Floating Header */}
      <Navbar />

      <main>
        {/* Widescreen Hero Segment */}
        <Hero />

        {/* Informational About Section */}
        <About />

        {/* Accommodation Cabin Cards & Dynamic Inquiry System */}
        <Chalets />

        {/* Interactive Booking & Reservation System */}
        <BookingForm />

        {/* Resort Structure Details */}
        <Structure />

        {/* Responsive Photo Album & Lightbox */}
        <Gallery />

        {/* Customer Feedback Testimonials Grid */}
        <Reviews />

        {/* Editorial Blog & News Section */}
        <Blog />

        {/* Map Guides & Travel Directions Sheet */}
        <Location />
      </main>

      {/* Styled Footer Block */}
      <Footer />
    </div>
  );
}
