import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, Check, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import wheyImg from '@/assets/product-whey.jpg';
import bcaaImg from '@/assets/product-bcaa.jpg';
import massImg from '@/assets/product-mass.jpg';
import omegaImg from '@/assets/product-omega.jpg';
import proteinImg from '@/assets/category-protein.jpg';
import creatineImg from '@/assets/category-creatine.jpg';
import preworkoutImg from '@/assets/category-preworkout.jpg';
import vitaminsImg from '@/assets/category-vitamins.jpg';

const allProducts = [
  {
    id: '1',
    name: 'Elite Whey Protein',
    category: 'Protein',
    price: 59.99,
    image: wheyImg,
    servings: '30 Servings',
    goal: 'Recovery',
    highlight: '25g Protein',
    tagline: 'Premium whey protein isolate for maximum muscle recovery',
    description: 'Our Elite Whey Protein is crafted from the highest quality whey isolate, delivering 25g of pure protein per serving with minimal fat and carbs. Perfect for post-workout recovery or any time you need a protein boost.',
    benefits: ['Supports muscle growth & recovery', 'Fast-absorbing whey isolate', 'Low in fat and carbs', 'Mixes easily with water or milk', 'Great taste with no artificial aftertaste'],
    usage: 'Mix 1 scoop (32g) with 8-10 oz of cold water or milk. Shake well and consume within 30 minutes post-workout for optimal results.',
    supplementFacts: {
      servingSize: '1 scoop (32g)',
      servingsPerContainer: 30,
      nutrients: [
        { name: 'Calories', amount: '120', dv: '' },
        { name: 'Total Fat', amount: '1g', dv: '1%' },
        { name: 'Cholesterol', amount: '30mg', dv: '10%' },
        { name: 'Sodium', amount: '50mg', dv: '2%' },
        { name: 'Total Carbohydrate', amount: '3g', dv: '1%' },
        { name: 'Sugars', amount: '1g', dv: '' },
        { name: 'Protein', amount: '25g', dv: '50%' },
        { name: 'Calcium', amount: '100mg', dv: '8%' },
        { name: 'Iron', amount: '0mg', dv: '0%' },
      ],
    },
    ingredients: 'Whey Protein Isolate, Natural & Artificial Flavors, Lecithin, Salt, Sucralose, Acesulfame Potassium.',
  },
  {
    id: '2',
    name: 'BCAA Complex',
    category: 'Amino Acids',
    price: 39.99,
    image: bcaaImg,
    servings: '40 Servings',
    goal: 'Endurance',
    highlight: '7g BCAAs',
    tagline: 'Essential amino acids for enhanced endurance and recovery',
    description: 'BCAA Complex delivers the perfect 2:1:1 ratio of leucine, isoleucine, and valine to fuel your muscles during intense training and accelerate recovery afterward.',
    benefits: ['Reduces muscle breakdown during exercise', 'Enhances endurance and performance', 'Accelerates post-workout recovery', 'Zero sugar, zero calories', 'Refreshing flavors that mix instantly'],
    usage: 'Mix 1 scoop with 12-16 oz of water. Consume during your workout or throughout the day for continuous amino acid support.',
    supplementFacts: {
      servingSize: '1 scoop (10g)',
      servingsPerContainer: 40,
      nutrients: [
        { name: 'Calories', amount: '0', dv: '' },
        { name: 'L-Leucine', amount: '3.5g', dv: '*' },
        { name: 'L-Isoleucine', amount: '1.75g', dv: '*' },
        { name: 'L-Valine', amount: '1.75g', dv: '*' },
        { name: 'Electrolyte Blend', amount: '500mg', dv: '*' },
      ],
    },
    ingredients: 'L-Leucine, L-Isoleucine, L-Valine, Citric Acid, Natural Flavors, Malic Acid, Sucralose, Potassium Chloride, Sodium Chloride.',
  },
  {
    id: '3',
    name: 'Mass Gainer Pro',
    category: 'Mass',
    price: 74.99,
    image: massImg,
    servings: '16 Servings',
    goal: 'Size',
    highlight: '1250 Calories',
    tagline: 'High-calorie formula for serious mass gains',
    description: 'Mass Gainer Pro packs 1250 calories and 50g of protein per serving, designed for hardgainers who struggle to consume enough calories to build serious muscle mass.',
    benefits: ['1250 calories per serving', '50g of high-quality protein', 'Complex carbs for sustained energy', 'Added creatine for strength', 'Perfect for bulking phases'],
    usage: 'Mix 4 scoops with 16-20 oz of water or milk. Consume 1-2 times daily between meals or post-workout.',
    supplementFacts: {
      servingSize: '4 scoops (334g)',
      servingsPerContainer: 16,
      nutrients: [
        { name: 'Calories', amount: '1250', dv: '' },
        { name: 'Total Fat', amount: '5g', dv: '6%' },
        { name: 'Sodium', amount: '400mg', dv: '17%' },
        { name: 'Total Carbohydrate', amount: '250g', dv: '91%' },
        { name: 'Sugars', amount: '10g', dv: '' },
        { name: 'Protein', amount: '50g', dv: '100%' },
        { name: 'Creatine Monohydrate', amount: '3g', dv: '*' },
      ],
    },
    ingredients: 'Maltodextrin, Whey Protein Concentrate, Whey Protein Isolate, Creatine Monohydrate, Natural & Artificial Flavors, Lecithin, Sucralose.',
  },
  {
    id: '4',
    name: 'Omega-3 Premium',
    category: 'Wellness',
    price: 29.99,
    image: omegaImg,
    servings: '60 Capsules',
    goal: 'Health',
    highlight: 'EPA/DHA',
    tagline: 'Ultra-pure fish oil for heart and brain health',
    description: 'Omega-3 Premium delivers pharmaceutical-grade fish oil with high concentrations of EPA and DHA, supporting cardiovascular health, brain function, and reducing inflammation.',
    benefits: ['Supports heart health', 'Promotes brain function', 'Reduces inflammation', 'Molecularly distilled for purity', 'No fishy aftertaste'],
    usage: 'Take 2 softgels daily with food for optimal absorption.',
    supplementFacts: {
      servingSize: '2 softgels',
      servingsPerContainer: 30,
      nutrients: [
        { name: 'Calories', amount: '20', dv: '' },
        { name: 'Total Fat', amount: '2g', dv: '3%' },
        { name: 'Fish Oil Concentrate', amount: '2000mg', dv: '*' },
        { name: 'EPA (Eicosapentaenoic Acid)', amount: '800mg', dv: '*' },
        { name: 'DHA (Docosahexaenoic Acid)', amount: '600mg', dv: '*' },
      ],
    },
    ingredients: 'Fish Oil Concentrate (Anchovy, Sardine, Mackerel), Softgel Capsule (Gelatin, Glycerin, Purified Water), Mixed Tocopherols.',
  },
  { id: '5', name: 'Whey Isolate Gold', category: 'Protein', price: 69.99, image: proteinImg, servings: '28 Servings', goal: 'Lean Muscle', highlight: '27g Protein', tagline: 'Ultra-pure isolate for lean gains', description: 'Whey Isolate Gold delivers 27g of ultra-filtered whey protein isolate with virtually zero fat and carbs.', benefits: ['27g pure protein per serving', 'Less than 1g carbs', 'Fast absorption', 'Perfect for cutting phases'], usage: 'Mix 1 scoop with 8 oz water. Best consumed post-workout.', supplementFacts: { servingSize: '1 scoop (30g)', servingsPerContainer: 28, nutrients: [{ name: 'Protein', amount: '27g', dv: '54%' }, { name: 'Calories', amount: '110', dv: '' }] }, ingredients: 'Whey Protein Isolate, Natural Flavors, Sucralose.' },
  { id: '6', name: 'Creatine Monohydrate', category: 'Creatine', price: 34.99, image: creatineImg, servings: '60 Servings', goal: 'Strength', highlight: '5g Pure', tagline: 'Micronized creatine for maximum strength', description: 'Pure micronized creatine monohydrate for explosive strength and power.', benefits: ['Increases strength and power', 'Enhances muscle volume', 'Supports ATP production', 'Unflavored and versatile'], usage: 'Mix 1 scoop (5g) with your favorite beverage daily.', supplementFacts: { servingSize: '1 scoop (5g)', servingsPerContainer: 60, nutrients: [{ name: 'Creatine Monohydrate', amount: '5g', dv: '*' }] }, ingredients: 'Micronized Creatine Monohydrate.' },
  { id: '7', name: 'Explosive Pre-Workout', category: 'Pre-Workout', price: 44.99, image: preworkoutImg, servings: '30 Servings', goal: 'Energy', highlight: '300mg Caffeine', tagline: 'Intense energy and focus for crushing workouts', description: 'Explosive Pre-Workout delivers intense energy, laser focus, and skin-splitting pumps.', benefits: ['300mg caffeine for energy', 'Beta-alanine for endurance', 'Citrulline for pumps', 'Enhanced mental focus'], usage: 'Mix 1 scoop with 8-10 oz water 20-30 minutes before training.', supplementFacts: { servingSize: '1 scoop (12g)', servingsPerContainer: 30, nutrients: [{ name: 'Caffeine Anhydrous', amount: '300mg', dv: '*' }, { name: 'Beta-Alanine', amount: '3.2g', dv: '*' }, { name: 'L-Citrulline', amount: '6g', dv: '*' }] }, ingredients: 'L-Citrulline, Beta-Alanine, Caffeine Anhydrous, Natural Flavors, Sucralose.' },
  { id: '8', name: 'Multivitamin Elite', category: 'Vitamins', price: 24.99, image: vitaminsImg, servings: '90 Capsules', goal: 'Daily Health', highlight: '23 Nutrients', tagline: 'Complete daily nutrition for athletes', description: 'Multivitamin Elite provides 23 essential vitamins and minerals optimized for active individuals.', benefits: ['Complete vitamin coverage', 'Supports immune function', 'Enhances energy levels', 'Antioxidant protection'], usage: 'Take 3 capsules daily with food.', supplementFacts: { servingSize: '3 capsules', servingsPerContainer: 30, nutrients: [{ name: 'Vitamin A', amount: '900mcg', dv: '100%' }, { name: 'Vitamin C', amount: '90mg', dv: '100%' }, { name: 'Vitamin D3', amount: '25mcg', dv: '125%' }, { name: 'Vitamin E', amount: '15mg', dv: '100%' }, { name: 'Vitamin B12', amount: '2.4mcg', dv: '100%' }] }, ingredients: 'Vitamin Blend, Mineral Blend, Vegetable Capsule.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find((p) => p.id === id) || allProducts[0];
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  // If not enough in same category, fill with other products
  const displayRelated = relatedProducts.length >= 3 
    ? relatedProducts 
    : [...relatedProducts, ...allProducts.filter((p) => p.id !== product.id && !relatedProducts.includes(p))].slice(0, 3);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity}x ${product.name} to cart!`, {
      description: `$${(product.price * quantity).toFixed(2)} total`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-background">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">Back to Products</span>
          </Link>
        </div>
      </div>

      {/* Product Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="animate-fade-in">
              <div className="gradient-card rounded-2xl border border-border overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-wider">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-lg text-foreground-muted">{product.tagline}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl text-primary">${product.price}</span>
                <span className="text-muted-foreground">/ {product.servings}</span>
              </div>

              {/* Description */}
              <p className="text-foreground-muted leading-relaxed">{product.description}</p>

              {/* Key Benefits */}
              <div className="space-y-3">
                <h3 className="font-display text-xl text-foreground uppercase tracking-wider">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground-muted">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart */}
              <div className="flex items-center gap-4 pt-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 bg-secondary rounded-xl p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-card flex items-center justify-center hover:bg-card-hover transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-display text-xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-card flex items-center justify-center hover:bg-card-hover transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button variant="hero" size="xl" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                <span className="text-primary font-bold">{product.highlight}</span>
                <span className="text-muted-foreground">per serving</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Sections */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* How to Use */}
            <div className="gradient-card rounded-2xl border border-border p-8 animate-fade-in-up">
              <h3 className="font-display text-2xl text-foreground uppercase tracking-wider mb-4">How to Use</h3>
              <p className="text-foreground-muted leading-relaxed">{product.usage}</p>
            </div>

            {/* Ingredients */}
            <div className="gradient-card rounded-2xl border border-border p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-display text-2xl text-foreground uppercase tracking-wider mb-4">Ingredients</h3>
              <p className="text-foreground-muted leading-relaxed text-sm">{product.ingredients}</p>
            </div>
          </div>

          {/* Supplement Facts Table */}
          <div className="mt-8 gradient-card rounded-2xl border border-border p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-display text-2xl text-foreground uppercase tracking-wider mb-6">Supplement Facts</h3>
            <div className="max-w-md">
              <div className="border-b-8 border-foreground pb-1 mb-2">
                <p className="text-sm text-foreground-muted">Serving Size: {product.supplementFacts.servingSize}</p>
                <p className="text-sm text-foreground-muted">Servings Per Container: {product.supplementFacts.servingsPerContainer}</p>
              </div>
              <div className="border-b border-foreground pb-1 mb-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>Amount Per Serving</span>
                  <span>% DV*</span>
                </div>
              </div>
              {product.supplementFacts.nutrients.map((nutrient, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-border text-sm">
                  <span className="text-foreground">{nutrient.name}</span>
                  <div className="flex gap-4">
                    <span className="text-foreground-muted">{nutrient.amount}</span>
                    <span className="w-12 text-right text-foreground-muted">{nutrient.dv || '—'}</span>
                  </div>
                </div>
              ))}
              <p className="mt-4 text-xs text-muted-foreground">
                * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRelated.map((relProduct, index) => (
              <Link
                key={relProduct.id}
                to={`/product/${relProduct.id}`}
                className="group gradient-card rounded-2xl overflow-hidden card-lift border border-border opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="aspect-square overflow-hidden img-zoom">
                  <img src={relProduct.image} alt={relProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">{relProduct.category}</span>
                  <h3 className="font-display text-xl text-foreground uppercase tracking-wide mt-2 mb-3">{relProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-foreground">${relProduct.price}</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ProductDetail;
