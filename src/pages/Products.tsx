import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import wheyImg from '@/assets/product-whey.jpg';
import bcaaImg from '@/assets/product-bcaa.jpg';
import massImg from '@/assets/product-mass.jpg';
import omegaImg from '@/assets/product-omega.jpg';
import proteinImg from '@/assets/category-protein.jpg';
import creatineImg from '@/assets/category-creatine.jpg';
import preworkoutImg from '@/assets/category-preworkout.jpg';
import vitaminsImg from '@/assets/category-vitamins.jpg';

const allProducts = [
  { id: '1', name: 'Elite Whey Protein', category: 'Protein', price: 59.99, image: wheyImg, servings: '30 Servings', goal: 'Recovery', highlight: '25g Protein' },
  { id: '2', name: 'BCAA Complex', category: 'Amino Acids', price: 39.99, image: bcaaImg, servings: '40 Servings', goal: 'Endurance', highlight: '7g BCAAs' },
  { id: '3', name: 'Mass Gainer Pro', category: 'Mass', price: 74.99, image: massImg, servings: '16 Servings', goal: 'Size', highlight: '1250 Calories' },
  { id: '4', name: 'Omega-3 Premium', category: 'Wellness', price: 29.99, image: omegaImg, servings: '60 Capsules', goal: 'Health', highlight: 'EPA/DHA' },
  { id: '5', name: 'Whey Isolate Gold', category: 'Protein', price: 69.99, image: proteinImg, servings: '28 Servings', goal: 'Lean Muscle', highlight: '27g Protein' },
  { id: '6', name: 'Creatine Monohydrate', category: 'Creatine', price: 34.99, image: creatineImg, servings: '60 Servings', goal: 'Strength', highlight: '5g Pure' },
  { id: '7', name: 'Explosive Pre-Workout', category: 'Pre-Workout', price: 44.99, image: preworkoutImg, servings: '30 Servings', goal: 'Energy', highlight: '300mg Caffeine' },
  { id: '8', name: 'Multivitamin Elite', category: 'Vitamins', price: 24.99, image: vitaminsImg, servings: '90 Capsules', goal: 'Daily Health', highlight: '23 Nutrients' },
];

const categories = ['All', 'Protein', 'Creatine', 'Pre-Workout', 'Vitamins', 'Amino Acids', 'Mass', 'Wellness'];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
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
            Premium sports nutrition crafted for peak performance. Every formula designed for serious athletes.
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
                {categories.map((category) => (
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
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl text-foreground">${product.price}</span>
                      <Button variant="default" size="sm" asChild>
                        <span>View Details</span>
                      </Button>
                    </div>
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
