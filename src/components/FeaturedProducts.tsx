import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { getProducts, Product } from '@/lib/store';
import { toast } from 'sonner';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-muted-foreground">Loading featured products...</div>;
  }

  if (products.length === 0) {
    return null; // Or show a message
  }

  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-16">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="group gradient-card rounded-2xl overflow-hidden card-lift border border-border opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <Link to={`/product/${product._id}`}>
                <div className="aspect-square overflow-hidden img-zoom bg-secondary flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground uppercase font-display">No Image</span>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</span>
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-display text-xl text-foreground uppercase tracking-wide mt-2 mb-3 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                <Button variant="hero" size="sm" className="w-full" asChild>
                  <Link to={`/product/${product._id}`}>
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
