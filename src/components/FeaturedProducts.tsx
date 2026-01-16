import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import wheyImg from '@/assets/product-whey.jpg';
import bcaaImg from '@/assets/product-bcaa.jpg';
import massImg from '@/assets/product-mass.jpg';
import omegaImg from '@/assets/product-omega.jpg';

const products = [
  {
    id: '1',
    name: 'Elite Whey Protein',
    category: 'Protein',
    price: 59.99,
    image: wheyImg,
    servings: '30 Servings',
    goal: 'Recovery',
  },
  {
    id: '2',
    name: 'BCAA Complex',
    category: 'Amino Acids',
    price: 39.99,
    image: bcaaImg,
    servings: '40 Servings',
    goal: 'Endurance',
  },
  {
    id: '3',
    name: 'Mass Gainer Pro',
    category: 'Mass',
    price: 74.99,
    image: massImg,
    servings: '16 Servings',
    goal: 'Size',
  },
  {
    id: '4',
    name: 'Omega-3 Premium',
    category: 'Wellness',
    price: 29.99,
    image: omegaImg,
    servings: '60 Capsules',
    goal: 'Health',
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="section-title mb-16">
          Featured Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group gradient-card rounded-2xl overflow-hidden card-lift border border-border opacity-0 animate-fade-in-up block"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden img-zoom">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                  {product.category}
                </span>

                {/* Name */}
                <h3 className="font-display text-xl text-foreground uppercase tracking-wide mt-2 mb-3">
                  {product.name}
                </h3>

                {/* Details */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span>{product.servings}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span>{product.goal}</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-foreground">
                    ${product.price}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <span>View Details</span>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
