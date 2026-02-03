import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, Check, ChevronLeft, Search, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { verifySerialNumber, getCurrentUser } from '@/lib/store';
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
    name: 'BPC-157 Peptide',
    category: 'Peptide',
    image: wheyImg,
    servings: '5mg/vial',
    goal: 'Recovery',
    highlight: 'Healing',
    tagline: 'Advanced healing peptide for tissue repair and recovery',
    description: 'BPC-157 is a pentadecapeptide composed of 15 amino acids. It has been shown to accelerate the healing of many different wounds, including tendon-to-bone healing and superior healing of damaged ligaments.',
    benefits: ['Accelerates tissue healing', 'Supports tendon and ligament repair', 'Promotes muscle recovery', 'Reduces inflammation', 'Enhances joint health'],
    usage: 'Reconstitute with bacteriostatic water. Consult with a healthcare professional for proper dosing protocol.',
    supplementFacts: {
      servingSize: '1 vial',
      servingsPerContainer: 1,
      nutrients: [
        { name: 'BPC-157 Peptide', amount: '5mg', dv: '*' },
        { name: 'Purity', amount: '99%+', dv: '' },
      ],
    },
    ingredients: 'BPC-157 Peptide (Lyophilized)',
  },
  {
    id: '2',
    name: 'Testosterone Cypionate',
    category: 'Injectable',
    image: bcaaImg,
    servings: '250mg/ml',
    goal: 'Performance',
    highlight: 'TRT',
    tagline: 'Premium testosterone for hormone optimization',
    description: 'Testosterone Cypionate is a long-acting ester of testosterone, commonly used for testosterone replacement therapy. It provides stable testosterone levels with less frequent injections.',
    benefits: ['Supports muscle growth', 'Enhances strength', 'Improves energy levels', 'Optimizes hormone levels', 'Long-acting formula'],
    usage: 'For intramuscular use only. Consult with a healthcare professional for proper dosing protocol.',
    supplementFacts: {
      servingSize: '1ml',
      servingsPerContainer: 10,
      nutrients: [
        { name: 'Testosterone Cypionate', amount: '250mg', dv: '*' },
        { name: 'Carrier Oil', amount: 'GSO', dv: '' },
      ],
    },
    ingredients: 'Testosterone Cypionate, Grape Seed Oil, Benzyl Alcohol, Benzyl Benzoate',
  },
  {
    id: '3',
    name: 'Semaglutide',
    category: 'Fat Loss',
    image: massImg,
    servings: '5mg/vial',
    goal: 'Weight Management',
    highlight: 'GLP-1',
    tagline: 'Advanced weight management peptide',
    description: 'Semaglutide is a GLP-1 receptor agonist that helps regulate appetite and blood sugar levels. It has shown significant results in clinical weight management studies.',
    benefits: ['Supports appetite control', 'Promotes healthy weight loss', 'Regulates blood sugar', 'Reduces cravings', 'Clinically studied'],
    usage: 'Reconstitute with bacteriostatic water. Consult with a healthcare professional for proper dosing protocol.',
    supplementFacts: {
      servingSize: '1 vial',
      servingsPerContainer: 1,
      nutrients: [
        { name: 'Semaglutide', amount: '5mg', dv: '*' },
        { name: 'Purity', amount: '99%+', dv: '' },
      ],
    },
    ingredients: 'Semaglutide (Lyophilized)',
  },
  {
    id: '4',
    name: 'Tamoxifen Citrate',
    category: 'SERMs',
    image: omegaImg,
    servings: '20mg/tab',
    goal: 'PCT',
    highlight: 'Anti-E',
    tagline: 'Selective estrogen receptor modulator for PCT',
    description: 'Tamoxifen is a selective estrogen receptor modulator (SERM) commonly used in post cycle therapy to help restore natural hormone production.',
    benefits: ['Supports hormone balance', 'Blocks estrogen receptors', 'Helps restore natural production', 'Well-researched compound', 'Oral administration'],
    usage: 'Take orally with water. Consult with a healthcare professional for proper dosing protocol.',
    supplementFacts: {
      servingSize: '1 tablet',
      servingsPerContainer: 30,
      nutrients: [
        { name: 'Tamoxifen Citrate', amount: '20mg', dv: '*' },
      ],
    },
    ingredients: 'Tamoxifen Citrate, Microcrystalline Cellulose, Magnesium Stearate',
  },
  { id: '5', name: 'TB-500 Peptide', category: 'Peptide', image: proteinImg, servings: '5mg/vial', goal: 'Recovery', highlight: 'Tissue Repair', tagline: 'Regenerative peptide for tissue repair', description: 'TB-500 is a synthetic version of the naturally occurring peptide Thymosin Beta-4, known for its tissue repair and regeneration properties.', benefits: ['Promotes tissue regeneration', 'Supports flexibility', 'Enhances recovery', 'Reduces inflammation'], usage: 'Reconstitute with bacteriostatic water. Consult with a healthcare professional.', supplementFacts: { servingSize: '1 vial', servingsPerContainer: 1, nutrients: [{ name: 'TB-500', amount: '5mg', dv: '*' }] }, ingredients: 'TB-500 Peptide (Lyophilized)' },
  { id: '6', name: 'Testosterone Enanthate', category: 'Injectable', image: creatineImg, servings: '250mg/ml', goal: 'Performance', highlight: 'Long Ester', tagline: 'Long-acting testosterone ester', description: 'Testosterone Enanthate is a long-acting testosterone ester providing steady hormone levels over extended periods.', benefits: ['Long-acting formula', 'Stable hormone levels', 'Supports muscle growth', 'Less frequent dosing'], usage: 'For intramuscular use only. Consult with a healthcare professional.', supplementFacts: { servingSize: '1ml', servingsPerContainer: 10, nutrients: [{ name: 'Testosterone Enanthate', amount: '250mg', dv: '*' }] }, ingredients: 'Testosterone Enanthate, MCT Oil, Benzyl Alcohol' },
  { id: '7', name: 'Tirzepatide', category: 'Fat Loss', image: preworkoutImg, servings: '10mg/vial', goal: 'Weight Loss', highlight: 'GIP/GLP-1', tagline: 'Dual-action weight management peptide', description: 'Tirzepatide is a dual GIP and GLP-1 receptor agonist that offers enhanced weight management benefits.', benefits: ['Dual mechanism action', 'Superior appetite control', 'Regulates metabolism', 'Clinically proven'], usage: 'Reconstitute with bacteriostatic water. Consult with a healthcare professional.', supplementFacts: { servingSize: '1 vial', servingsPerContainer: 1, nutrients: [{ name: 'Tirzepatide', amount: '10mg', dv: '*' }] }, ingredients: 'Tirzepatide (Lyophilized)' },
  { id: '8', name: 'Clomiphene Citrate', category: 'SERMs', image: vitaminsImg, servings: '50mg/tab', goal: 'PCT', highlight: 'Fertility', tagline: 'SERM for hormone restoration', description: 'Clomiphene is a selective estrogen receptor modulator used to stimulate natural hormone production during PCT.', benefits: ['Stimulates LH/FSH', 'Restores natural production', 'Oral administration', 'Well-studied compound'], usage: 'Take orally with water. Consult with a healthcare professional.', supplementFacts: { servingSize: '1 tablet', servingsPerContainer: 30, nutrients: [{ name: 'Clomiphene Citrate', amount: '50mg', dv: '*' }] }, ingredients: 'Clomiphene Citrate, Lactose, Magnesium Stearate' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const product = allProducts.find((p) => p.id === id) || allProducts[0];
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  // If not enough in same category, fill with other products
  const displayRelated = relatedProducts.length >= 3
    ? relatedProducts
    : [...relatedProducts, ...allProducts.filter((p) => p.id !== product.id && !relatedProducts.includes(p))].slice(0, 3);

  const handleVerifyProduct = () => {
    setVerifyDialogOpen(true);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) {
      toast.error('Please enter a QR code or tracking number');
      return;
    }

    const user = getCurrentUser();
    const result = verifySerialNumber(trackingCode, user?.id);

    if (result.success) {
      toast.success('Product Verified!', {
        description: `${result.product?.name || 'Product'} is authentic and verified.`,
      });
    } else {
      toast.error('Verification Failed', {
        description: 'This code was not found in our system. Please check and try again.',
      });
    }

    setTrackingCode('');
    setVerifyDialogOpen(false);
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

              {/* Servings */}
              <div className="flex items-baseline gap-3">
                <span className="text-muted-foreground">{product.servings}</span>
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

                {/* Verify Product Button */}
                <Button variant="hero" size="xl" className="flex-1" onClick={handleVerifyProduct}>
                  <QrCode className="h-5 w-5 mr-2" />
                  Verify Product
                </Button>
              </div>

              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                <span className="text-primary font-bold">{product.highlight}</span>
                <span className="text-muted-foreground">| {product.goal}</span>
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
            <h3 className="font-display text-2xl text-foreground uppercase tracking-wider mb-6">Product Facts</h3>
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
                * Daily Value not established. Consult with a healthcare professional before use.
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
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span>{relProduct.servings}</span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>{relProduct.goal}</span>
                  </div>
                  <Button variant="default" size="sm" asChild>
                    <span>View Details</span>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verify Product Modal */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase tracking-wider text-center">Verify {product.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground text-center">
              Enter the QR code or tracking number on your product packaging to verify authenticity.
            </p>
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter QR code or tracking number"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="h-12 pl-10 bg-secondary border-border"
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" size="lg">
                <QrCode className="h-4 w-4 mr-2" />
                Verify Now
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center">
              Protect yourself from counterfeit products. Only purchase from authorized retailers.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ProductDetail;
