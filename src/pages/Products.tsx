import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Search, Filter, QrCode } from 'lucide-react';
import { getProducts, getCategories, Product, Category } from '@/lib/store';
import { toast } from 'sonner';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, c] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(p);
        setCategories(c);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory || (categories.find(c => c.slug === selectedCategory)?.name === product.category);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="pt-32 pb-16 bg-gradient-to-b from-background-tertiary to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="section-title mb-4">Our Products</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium health supplements crafted for peak performance. Every formula designed for serious athletes.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {loading ? (
          <div className="text-center py-24 text-muted-foreground">Loading products...</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category Filters */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg uppercase tracking-wider">Categories</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      selectedCategory === 'All'
                        ? 'bg-primary text-primary-foreground glow-red-sm'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        selectedCategory === category.slug
                          ? 'bg-primary text-primary-foreground glow-red-sm'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="group gradient-card rounded-2xl overflow-hidden card-lift border border-border opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
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
                      <div className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</div>
                      <div className="flex gap-2">
                        <Button variant="hero" size="sm" className="flex-1" asChild>
                          <Link to={`/product/${product._id}`}>
                            <QrCode className="h-4 w-4 mr-1" />
                            Verify Product
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Products;
