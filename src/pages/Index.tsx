import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategoryCards } from '@/components/CategoryCards';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { HowItWorks } from '@/components/HowItWorks';
import { Stats } from '@/components/Stats';
import { TopSellers } from '@/components/TopSellers';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <WhyChooseUs />
      <HowItWorks />
      <Stats />
      <TopSellers />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
