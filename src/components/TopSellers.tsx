import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame, TrendingUp } from 'lucide-react';
import wheyImg from '@/assets/product-whey.jpg';
import bcaaImg from '@/assets/product-bcaa.jpg';
import massImg from '@/assets/product-mass.jpg';
import omegaImg from '@/assets/product-omega.jpg';
import proteinImg from '@/assets/category-protein.jpg';
import creatineImg from '@/assets/category-creatine.jpg';

const topProducts = [
  {
    id: '1',
    name: 'BPC-157 Peptide',
    category: 'Peptide',
    image: wheyImg,
    price: '₹2,499',
    rating: 4.9,
    reviews: 234,
    trending: true,
    discount: '15% OFF',
  },
  {
    id: '3',
    name: 'Semaglutide',
    category: 'Fat Loss',
    image: massImg,
    price: '₹3,999',
    rating: 4.8,
    reviews: 189,
    trending: true,
    discount: '20% OFF',
  },
  {
    id: '2',
    name: 'Testosterone Cypionate',
    category: 'Injectable',
    image: bcaaImg,
    price: '₹4,999',
    rating: 4.9,
    reviews: 312,
    trending: false,
    discount: 'BESTSELLER',
  },
  {
    id: '5',
    name: 'TB-500 Peptide',
    category: 'Peptide',
    image: proteinImg,
    price: '₹2,799',
    rating: 4.7,
    reviews: 156,
    trending: true,
    discount: '10% OFF',
  },
];

export function TopSellers() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="section-title mb-3">Best Sellers</h2>
            <p className="text-lg text-foreground-muted">
              Most loved and trusted products by our community
            </p>
          </div>
          <Button variant="default" asChild className="hidden sm:flex">
            <Link to="/products">View All</Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Card */}
              <div className="gradient-card rounded-2xl overflow-hidden border border-border card-lift h-full flex flex-col">
                {/* Image Container */}
                <div className="aspect-square overflow-hidden relative img-zoom bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      {product.trending ? (
                        <>
                          <Flame className="h-3 w-3" />
                          TRENDING
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-3 w-3" />
                          {product.discount}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  {/* Category */}
                  <div>
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {product.category}
                    </span>

                    {/* Name */}
                    <h3 className="font-display text-lg text-foreground uppercase tracking-wide mt-2 mb-3">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`h-4 w-4 rounded-full ${
                              i < Math.floor(product.rating) ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-foreground-muted">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Price & Button */}
                  <div>
                    <div className="text-2xl font-bold text-primary mb-4">
                      {product.price}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center sm:hidden">
          <Button variant="default" asChild size="lg">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
