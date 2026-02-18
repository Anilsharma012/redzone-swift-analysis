import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import wheyImg from '@/assets/product-whey.jpg';
import bcaaImg from '@/assets/product-bcaa.jpg';
import massImg from '@/assets/product-mass.jpg';
import omegaImg from '@/assets/product-omega.jpg';

const products = [
  { id: '1', name: 'BPC-157 Peptide', category: 'Peptide', image: wheyImg, servings: '5mg/vial', goal: 'Recovery' },
  { id: '2', name: 'Testosterone Cypionate', category: 'Injectable', image: bcaaImg, servings: '250mg/ml', goal: 'Performance' },
  { id: '3', name: 'Semaglutide', category: 'Fat Loss', image: massImg, servings: '5mg/vial', goal: 'Weight Management' },
  { id: '4', name: 'Tamoxifen Citrate', category: 'SERMs', image: omegaImg, servings: '20mg/tab', goal: 'PCT' },
];

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-16">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group gradient-card rounded-2xl overflow-hidden card-lift border border-border opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden img-zoom">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </Link>

              <div className="p-6">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</span>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-display text-xl text-foreground uppercase tracking-wide mt-2 mb-3 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span>{product.servings}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span>{product.goal}</span>
                </div>

                <Button variant="hero" size="sm" className="w-full" asChild>
                  <Link to={`/product/${product.id}`}>
                    <QrCode className="h-4 w-4 mr-1" />
                    Verify Product
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}