import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { getProducts, getCategories, Product, Category } from '@/lib/store';
import wheyImg from '@/assets/product-whey.jpg';
import bcaaImg from '@/assets/product-bcaa.jpg';
import massImg from '@/assets/product-mass.jpg';
import omegaImg from '@/assets/product-omega.jpg';
import proteinImg from '@/assets/category-protein.jpg';
import creatineImg from '@/assets/category-creatine.jpg';
import preworkoutImg from '@/assets/category-preworkout.jpg';
import vitaminsImg from '@/assets/category-vitamins.jpg';

// Default products with enhanced data (for display purposes)
const defaultProducts = [
  { id: '1', name: 'BPC-157 Peptide', category: 'peptide', image: wheyImg, servings: '5mg/vial', goal: 'Recovery', highlight: 'Healing', description: 'Healing peptide' },
  { id: '2', name: 'Testosterone Cypionate', category: 'injectable', image: bcaaImg, servings: '250mg/ml', goal: 'Performance', highlight: 'TRT', description: 'Injectable testosterone' },
  { id: '3', name: 'Semaglutide', category: 'fat-loss', image: massImg, servings: '5mg/vial', goal: 'Weight Management', highlight: 'GLP-1', description: 'GLP-1 for weight management' },
  { id: '4', name: 'Tamoxifen Citrate', category: 'serms', image: omegaImg, servings: '20mg/tab', goal: 'PCT', highlight: 'Anti-E', description: 'SERM for PCT' },
  { id: '5', name: 'TB-500 Peptide', category: 'peptide', image: proteinImg, servings: '5mg/vial', goal: 'Recovery', highlight: 'Tissue Repair', description: 'Tissue repair peptide' },
  { id: '6', name: 'Testosterone Enanthate', category: 'injectable', image: creatineImg, servings: '250mg/ml', goal: 'Performance', highlight: 'Long Ester', description: 'Long ester testosterone' },
  { id: '7', name: 'Tirzepatide', category: 'fat-loss', image: preworkoutImg, servings: '10mg/vial', goal: 'Weight Loss', highlight: 'GIP/GLP-1', description: 'Dual GLP-1/GIP agonist' },
  { id: '8', name: 'Clomiphene Citrate', category: 'serms', image: vitaminsImg, servings: '50mg/tab', goal: 'PCT', highlight: 'Fertility', description: 'SERM for hormone restoration' },
];

const categoryLabels: Record<string, string> = {
  peptide: 'Peptide',
  injectable: 'Injectable',
  'fat-loss': 'Fat Loss',
  serms: 'SERMs',
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<(Product & { servings?: string; goal?: string; highlight?: string })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch products and categories from store
    const storedProducts = getProducts();
    const storedCategories = getCategories();

    // Use stored products if available, otherwise use defaults
    const productsToDisplay = storedProducts.length > 0
      ? storedProducts.map(p => {
          const defaultProduct = defaultProducts.find(dp => dp.id === p.id);
          return {
            ...p,
            servings: defaultProduct?.servings || p.description,
            goal: defaultProduct?.goal || '',
            highlight: defaultProduct?.highlight || '',
            image: p.image || defaultProduct?.image || wheyImg,
          };
        })
      : defaultProducts;

    setProducts(productsToDisplay);
    setCategories(storedCategories);
  }, []);

  // Get category list for filters
  const categoryOptions = ['All', ...categories.map(c => c.name)];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' ||
      product.category === selectedCategory.toLowerCase().replace(/\s+/g, '-') ||
      categoryLabels[product.category] === selectedCategory;
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
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground glow-red-sm'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group gradient-card rounded-2xl overflow-hidden card-lift border border-border opacity-0 animate-fade-in-up block"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  <div className="aspect-square overflow-hidden img-zoom">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-display text-xl text-foreground uppercase tracking-wide mt-2 mb-3">{product.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span>{product.servings}</span>
                      <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <span>{product.goal}</span>
                    </div>
                    <div className="text-sm text-primary font-semibold mb-4">{product.highlight}</div>
                    <Button variant="default" size="sm" asChild>
                      <span>View Details</span>
                    </Button>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Products;
