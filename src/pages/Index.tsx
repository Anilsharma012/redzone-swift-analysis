import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategoryCards } from '@/components/CategoryCards';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
